import { Alert, AlertButton } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export const displaySuccessAlert = (
  title: string,
  description: string,
  actions?: AlertButton[]
) => {
  Alert.alert(title, description, actions ?? [{ text: 'OK' }]);
  trigger('notificationSuccess', options);
};

export const displayErrorAlert = (
  title: string,
  description: string,
  actions?: AlertButton[]
) => {
  Alert.alert(title, description, actions ?? [{ text: 'OK' }]);
  trigger('notificationError', options);
};
