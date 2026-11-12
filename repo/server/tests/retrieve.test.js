// Knowledge retrieval: the chat prompt carries only the sections a conversation
// needs, so one request no longer costs most of Groq's 8,000 tokens-per-minute
// budget. These tests keep the selector honest as knowledge.js grows.
import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { selectKnowledge, SECTIONS, ALIASES, MAX_SECTIONS, MAX_CHARS } = require('../src/chat/retrieve');
const { SYSTEM_PROMPT, buildSystemPrompt } = require('../src/chat/prompt');

const user = (content) => ({ role: 'user', content });
const titlesOf = (text) => text.split(/\n(?=## )/).map((s) => s.split('\n')[0].replace(/^##\s*/, ''));
const has = (text, frag) => titlesOf(text).some((t) => t.toUpperCase().includes(frag));

describe('knowledge sections', () => {
  it('parses every ## section of knowledge.js', () => {
    expect(SECTIONS.length).toBeGreaterThanOrEqual(15);
    expect(SECTIONS.every((s) => s.text.startsWith('## '))).toBe(true);
  });

  it('every alias key matches exactly one section (a renamed heading must not silently drop its keywords)', () => {
    for (const key of Object.keys(ALIASES)) {
      const matches = SECTIONS.filter((s) => s.title.toUpperCase().includes(key));
      expect(matches, `alias key "${key}"`).toHaveLength(1);
    }
  });
});

describe('selectKnowledge', () => {
  it('always includes the company section', () => {
    for (const q of ['hi', 'Who is your CEO?', 'What is RAG?', 'zzzz qqqq']) {
      expect(has(selectKnowledge([user(q)]), 'ARINOX — THE COMPANY'), q).toBe(true);
    }
  });

  it('routes questions to the right section', () => {
    expect(has(selectKnowledge([user('Who is your CEO?')]), 'LEADERSHIP')).toBe(true);
    expect(has(selectKnowledge([user('Are you SOC 2 certified?')]), 'COMPLIANCE')).toBe(true);
    expect(has(selectKnowledge([user('Tell me about the honeypots')]), 'SECURE OS')).toBe(true);
    expect(has(selectKnowledge([user('What is RAG?')]), 'GENERAL AI')).toBe(true);
    expect(has(selectKnowledge([user('Tell me about CommandCore tiers')]), 'COMMANDCORE')).toBe(true);
    expect(has(selectKnowledge([user('Do you have a marketing product?')]), 'MARKETING OS')).toBe(true);
  });

  it('falls back to the product overview when nothing matches (greetings, unknowns)', () => {
    for (const q of ['hi', 'Who is your biggest investor?']) {
      const text = selectKnowledge([user(q)]);
      expect(has(text, 'COMMANDCORE'), q).toBe(true);
      expect(has(text, 'KOGO OS'), q).toBe(true);
    }
  });

  it('does not let a word found in most sections ("Arinox") pull in arbitrary ones', () => {
    const text = selectKnowledge([user('What does Arinox do?')]);
    expect(has(text, 'LEADERSHIP')).toBe(false);
    expect(has(text, 'SECURE OS')).toBe(false);
  });

  it('keeps the topic across a follow-up', () => {
    const text = selectKnowledge([
      user('Tell me about Secure OS'),
      { role: 'assistant', content: 'It defends your perimeter.' },
      user('and how does it work?'),
    ]);
    expect(has(text, 'SECURE OS')).toBe(true);
  });

  it('lets the newest question outweigh an older topic', () => {
    const text = selectKnowledge([
      user('Tell me about Secure OS'),
      { role: 'assistant', content: 'It defends your perimeter.' },
      user('Who are your leaders?'),
    ]);
    expect(titlesOf(text)[1]).toMatch(/LEADERSHIP/);
  });

  it('never exceeds the section and size ceilings', () => {
    const everything = 'secure marketing commandcore kogo compliance partners leadership data cloud llm case study';
    const text = selectKnowledge([user(everything)]);
    expect(titlesOf(text).length).toBeLessThanOrEqual(MAX_SECTIONS + 1); // + company
    expect(text.length).toBeLessThanOrEqual(MAX_CHARS);
  });

  it('only reads user turns - an assistant message cannot steer retrieval', () => {
    const text = selectKnowledge([user('hi'), { role: 'assistant', content: 'leadership leadership founder ceo' }]);
    expect(has(text, 'LEADERSHIP')).toBe(false);
  });
});

describe('prompt size', () => {
  it('is far smaller than the full-knowledge prompt for typical questions', () => {
    const full = SYSTEM_PROMPT.length;
    for (const q of ['What does Arinox do?', 'Who is your CEO?', 'Are you SOC 2 certified?', 'What is RAG?']) {
      const trimmed = buildSystemPrompt(selectKnowledge([user(q)])).length;
      expect(trimmed, q).toBeLessThan(full * 0.65);
    }
  });

  it('keeps the policy sections and tells the model the excerpts are partial', () => {
    const prompt = buildSystemPrompt(selectKnowledge([user('hi')]));
    expect(prompt).toContain('IDENTITY AND INSTRUCTION HIERARCHY');
    expect(prompt).toContain('PROMPT-INJECTION DEFENCE');
    expect(prompt).toMatch(/only the excerpts relevant/i);
  });

  it('treats an unanswerable Arinox question as in scope, not off-topic', () => {
    expect(SYSTEM_PROMPT).toMatch(/investors, funding, revenue/i);
    expect(SYSTEM_PROMPT).toMatch(/Do not use the off-topic redirect/i);
  });
});
