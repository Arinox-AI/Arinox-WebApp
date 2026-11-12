// @vitest-environment jsdom
// VideoEmbed: YouTube must not load until the visitor clicks; the film plays
// in a theatre dialog that Esc / Close dismiss.
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { VideoEmbed } from '../src/components/site/VideoEmbed';
import { digitalTwinSuite } from '../src/data/digitalTwinSuite';

describe('VideoEmbed theatre', () => {
  afterEach(() => cleanup());

  it('loads nothing until play, then opens a privacy-enhanced player in a dialog', async () => {
    render(<VideoEmbed id="f8V6DOHVBAE" title="Arinox Digital Twin++" duration="3:05" />);
    expect(document.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /play video: arinox digital twin\+\+ \(3:05\)/i }));
    const dialog = await screen.findByRole('dialog', { name: 'Arinox Digital Twin++' });
    const frame = dialog.querySelector('iframe');
    expect(frame.getAttribute('src')).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/f8V6DOHVBAE\?autoplay=1/);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('Esc closes the theatre and restores scrolling', async () => {
    render(<VideoEmbed id="f8V6DOHVBAE" title="Arinox Digital Twin++" />);
    fireEvent.click(screen.getByRole('button', { name: /play video/i }));
    await screen.findByRole('dialog');
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.body.style.overflow).toBe('');
  });

  it('Digital Twin++ page data carries the new film', () => {
    expect(digitalTwinSuite.film.youtubeId).toBe('f8V6DOHVBAE');
    expect(digitalTwinSuite.film.duration).toBe('3:05');
  });
});
