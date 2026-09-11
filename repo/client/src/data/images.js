/* Central image registry — every page references photos by key,
   so swapping/adding photography is a one-file change. */

import commandcoreHero    from '../assets/commandcore.jpg';
import commandcoreWall    from '../assets/severeign-CommandCore-WP.avif';
import commandcoreS       from '../assets/commandcore-s.jpg';
import commandcoreM       from '../assets/commandcore-m.jpg';
import commandcoreXL      from '../assets/commandcore-xl.jpg';
import kogoWall           from '../assets/KOGO-WP.avif';

import ajayImg     from '../assets/Ajay-Kharbanda-CEO-of-Arinox-AI.jpg';
import chytraImg   from '../assets/chytraD.jpeg';
import udayImg     from '../assets/Uday bhaskar.png';
import venuImg     from '../assets/venu.jpg';
import repswalImg  from '../assets/repswal.jpg';
import aniruddhaImg from '../assets/Aniruddha.jpg';

import sovereignLaunchImg   from '../assets/severign_launch.jpeg';
import hitachiShoriImg      from '../assets/Hitachi_shori_2026.JPG';
import hitachi2026Img       from '../assets/Hitachi_2026.jpeg';
import hitachiSystemsImg    from '../assets/Hitachi_systems_event.jpeg';
import aiSummitImg          from '../assets/ai_summit.jpg';
import bharatDigitalImg     from '../assets/Bharat_digital_event.jpeg';
import aksImg               from '../assets/9th Nov- AKS Workshop Global.jpeg';
import ansrImg              from '../assets/4th July - ANSR Tech Workshop_.jpg';

/* Sector photography (/public/industries — plain URLs) */
const bankingImg     = '/industries/banking.jpeg';
const defenceImg     = '/industries/defence.jpeg';
const governmentImg  = '/industries/government.jpeg';
const healthcareImg  = '/industries/healthcare.jpeg';
const legalImg       = '/industries/legal.jpeg';
const technologyImg  = '/industries/technology.jpeg';

export const IMAGES = {
  'commandcore-hero': commandcoreHero,
  'commandcore-wall': commandcoreWall,
  'commandcore-s':    commandcoreS,
  'commandcore-m':    commandcoreM,
  'commandcore-xl':   commandcoreXL,
  'kogo':             kogoWall,

  ajay:      ajayImg,
  chytra:    chytraImg,
  uday:      udayImg,
  venu:      venuImg,
  repswal:   repswalImg,
  aniruddha: aniruddhaImg,

  'sovereign-launch': sovereignLaunchImg,
  'hitachi-shori':    hitachiShoriImg,
  'hitachi-2026':     hitachi2026Img,
  'hitachi-systems':  hitachiSystemsImg,
  'ai-summit':        aiSummitImg,
  'bharat-digital':   bharatDigitalImg,
  'aks-workshop':     aksImg,
  'ansr-workshop':    ansrImg,

  banking:     bankingImg,
  defence:     defenceImg,
  government:  governmentImg,
  healthcare:  healthcareImg,
  legal:       legalImg,
  technology:  technologyImg,
};

export const img = (key) => IMAGES[key] || IMAGES['commandcore-hero'];
