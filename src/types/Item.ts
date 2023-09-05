import Sound from 'react-native-sound';

export interface Item {
  name: string;
  image: string;
  sensitive?: boolean;
  sound?: Sound;
}
