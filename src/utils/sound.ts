import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const assetPath = '../assets/';

const ah = new Sound(require(assetPath + 'ah.mp3'), console.log);
const antoine_daniel_tg = new Sound(require(assetPath + 'antoine_daniel_tg.mp3'), console.log);
const cependant = new Sound(require(assetPath + 'cependant.mp3'), console.log);
const cheh = new Sound(require(assetPath + 'cheh.mp3'), console.log);
const cest_non = new Sound(require(assetPath + 'cest_non.mp3'), console.log);
const coucou_miss = new Sound(require(assetPath + 'coucou_miss.mp3'), console.log);
const coucou = new Sound(require(assetPath + 'coucou.mp3'), console.log);
const david_goodenough = new Sound(require(assetPath + 'david_goodenough.mp3'), console.log);
const deja_vu = new Sound(require(assetPath + 'deja_vu.mp3'), console.log);
const enorme = new Sound(require(assetPath + 'enorme.mp3'), console.log);
const etchebest = new Sound(require(assetPath + 'etchebest.mp3'), console.log);
const feur = new Sound(require(assetPath + 'feur.mp3'), console.log);
const harry_potter = new Sound(require(assetPath + 'harry_potter.mp3'), console.log);
const helicopter = new Sound(require(assetPath + 'helicopter.mp3'), console.log);
const honteux = new Sound(require(assetPath + 'honteux.mp3'), console.log);
const joyeux_noel_encule = new Sound(require(assetPath + 'joyeux_noel_encule.mp3'), console.log);
const koba_la_D = new Sound(require(assetPath + 'koba_la_D.mp3'), console.log);
const mechant = new Sound(require(assetPath + 'mechant.mp3'), console.log);
const minecraft_hurt = new Sound(require(assetPath + 'minecraft_hurt.mp3'), console.log);
const motus = new Sound(require(assetPath + 'motus.mp3'), console.log);
const ouais_mais_cest_pas_toi_qui_decide = new Sound(require(assetPath + 'ouais_mais_cest_pas_toi_qui_decide.mp3'), console.log);
const pauvres = new Sound(require(assetPath + 'pauvres.mp3'), console.log);
const pornhub = new Sound(require(assetPath + 'pornhub.mp3'), console.log);
const prout_reverb = new Sound(require(assetPath + 'prout_reverb.mp3'), console.log);
const prout = new Sound(require(assetPath + 'prout.mp3'), console.log);
const rire_de_droite = new Sound(require(assetPath + 'rire_de_droite.mp3'), console.log);
const sarkozy = new Sound(require(assetPath + 'sarkozy.mp3'), console.log);
const ta_gueule = new Sound(require(assetPath + 'ta_gueule.mp3'), console.log);
const tut_tut_fils_de_pute = new Sound(require(assetPath + 'tut_tut_fils_de_pute.mp3'), console.log);
const tut_tut_grosse_pute = new Sound(require(assetPath + 'tut_tut_grosse_pute.mp3'), console.log);
const wingardium_leviosa = new Sound(require(assetPath + 'wingardium_leviosa.mp3'), console.log);
const wow = new Sound(require(assetPath + 'wow.mp3'), console.log);

export const initializeSounds = () => null;

export const mappedSounds: Record<string, any> = {
    ah,
    antoine_daniel_tg,
    cependant,
    cest_non,
    cheh,
    coucou_miss,
    coucou,
    david_goodenough,
    deja_vu,
    enorme,
    etchebest,
    feur,
    harry_potter,
    helicopter,
    honteux,
    joyeux_noel_encule,
    koba_la_D,
    mechant,
    minecraft_hurt,
    motus,
    ouais_mais_cest_pas_toi_qui_decide,
    pauvres,
    pornhub,
    prout_reverb,
    prout,
    rire_de_droite,
    sarkozy,
    ta_gueule,
    tut_tut_fils_de_pute,
    tut_tut_grosse_pute,
    wingardium_leviosa,
    wow,
}