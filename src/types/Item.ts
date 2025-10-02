import Sound from 'react-native-sound';

export interface Item {
  id?: string;
  name: string;
  image: string;
  sensitive?: boolean;
  sound?: Sound;
}
