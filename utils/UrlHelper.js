import { Linking } from 'react-native';

const openURL = async URLToOpen => {
  const openUrlPossible = await Linking.canOpenURL(URLToOpen);
  if (openUrlPossible) {
    Linking.openURL(URLToOpen);
    return true;
  }
  return false;
};

export { openURL };