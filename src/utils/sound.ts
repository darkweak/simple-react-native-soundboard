/* eslint-disable @typescript-eslint/no-var-requires */
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const assetPath = '../assets/';

const importSound = (req: NodeRequire): Sound => {
  return new Sound(req);
};

const ah = importSound(require(assetPath + 'ah.mp3'));
const antoine_daniel_tg = importSound(
  require(assetPath + 'antoine_daniel_tg.mp3')
);
const ca_va_peter = importSound(require(assetPath + 'ca_va_peter.mp3'));
const cependant = importSound(require(assetPath + 'cependant.mp3'));
const cheh = importSound(require(assetPath + 'cheh.mp3'));
const cest_non = importSound(require(assetPath + 'cest_non.mp3'));
const coucou_miss = importSound(require(assetPath + 'coucou_miss.mp3'));
const coucou = importSound(require(assetPath + 'coucou.mp3'));
const couisine = importSound(require(assetPath + 'couisine.mp3'));
const david_goodenough = importSound(
  require(assetPath + 'david_goodenough.mp3')
);
const deja_vu = importSound(require(assetPath + 'deja_vu.mp3'));
const enorme = importSound(require(assetPath + 'enorme.mp3'));
const etchebest = importSound(require(assetPath + 'etchebest.mp3'));
const feur = importSound(require(assetPath + 'feur.mp3'));
const harry_potter = importSound(require(assetPath + 'harry_potter.mp3'));
const helicopter = importSound(require(assetPath + 'helicopter.mp3'));
const honteux = importSound(require(assetPath + 'honteux.mp3'));
const john_cena = importSound(require(assetPath + 'john_cena.mp3'));
const joyeux_noel_encule = importSound(
  require(assetPath + 'joyeux_noel_encule.mp3')
);
const koba_la_D = importSound(require(assetPath + 'koba_la_D.mp3'));
const mechant = importSound(require(assetPath + 'mechant.mp3'));
const minecraft_hurt = importSound(require(assetPath + 'minecraft_hurt.mp3'));
const motus = importSound(require(assetPath + 'motus.mp3'));
const ouais_mais_cest_pas_toi_qui_decide = importSound(
  require(assetPath + 'ouais_mais_cest_pas_toi_qui_decide.mp3')
);
const pauvres = importSound(require(assetPath + 'pauvres.mp3'));
const plein_le_cul = importSound(require(assetPath + 'plein_le_cul.mp3'));
const pornhub = importSound(require(assetPath + 'pornhub.mp3'));
const prout_reverb = importSound(require(assetPath + 'prout_reverb.mp3'));
const prout = importSound(require(assetPath + 'prout.mp3'));
const rire_de_droite = importSound(require(assetPath + 'rire_de_droite.mp3'));
const sarkozy = importSound(require(assetPath + 'sarkozy.mp3'));
const ta_gueule = importSound(require(assetPath + 'ta_gueule.mp3'));
const tut_tut_fils_de_pute = importSound(
  require(assetPath + 'tut_tut_fils_de_pute.mp3')
);
const tut_tut_grosse_pute = importSound(
  require(assetPath + 'tut_tut_grosse_pute.mp3')
);
const violons = importSound(require(assetPath + 'violons.mp3'));
const wingardium_leviosa = importSound(
  require(assetPath + 'wingardium_leviosa.mp3')
);
const wow = importSound(require(assetPath + 'wow.mp3'));

export const initializeSounds = () => null;

export const mappedSounds: Record<string, Sound> = {
  ah,
  antoine_daniel_tg,
  ca_va_peter,
  cependant,
  cest_non,
  cheh,
  coucou_miss,
  coucou,
  couisine,
  david_goodenough,
  deja_vu,
  enorme,
  etchebest,
  feur,
  harry_potter,
  helicopter,
  honteux,
  john_cena,
  joyeux_noel_encule,
  koba_la_D,
  mechant,
  minecraft_hurt,
  motus,
  ouais_mais_cest_pas_toi_qui_decide,
  pauvres,
  plein_le_cul,
  pornhub,
  prout_reverb,
  prout,
  rire_de_droite,
  sarkozy,
  ta_gueule,
  tut_tut_fils_de_pute,
  tut_tut_grosse_pute,
  violons,
  wingardium_leviosa,
  wow
};
