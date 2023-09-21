import {
  clearAllShortcuts,
  donateShortcut,
  suggestShortcuts
} from 'react-native-siri-shortcut';
import { displaySuccessAlert } from './alert';
import { Item } from '../types/Item';

export const activityIdentifiers = {
  preferred_sound: 'io.darkweak.Soundboard.preferred_sound',
  do_nothing: 'io.darkweak.Soundboard.do_nothing'
};

export const setShortcuts = (sounds: ReadonlyArray<Item>) => {
  const shortcuts = sounds.map(({ sensitive, sound, ...s }) => ({
    activityType: `${activityIdentifiers.preferred_sound}${s.name}`,
    title: `Run ${s.image} ${s.name} sound`,
    userInfo: s,
    needsSave: true,
    persistentIdentifier: `${activityIdentifiers.preferred_sound}${s.name}`,
    isEligibleForSearch: true,
    isEligibleForHandoff: true,
    isEligibleForPublicIndexing: true,
    isEligibleForPrediction: true
  }));

  suggestShortcuts(shortcuts);
  donateShortcut({
    activityType: activityIdentifiers.do_nothing,
    title: 'Do nothing',
    persistentIdentifier: activityIdentifiers.do_nothing,
    isEligibleForSearch: true,
    isEligibleForHandoff: true,
    isEligibleForPublicIndexing: true,
    isEligibleForPrediction: true
  });
  displaySuccessAlert('Set shortcut', 'Your shortcuts are now available!');
};

export const clearShortcuts = async () => {
  await clearAllShortcuts();
};
