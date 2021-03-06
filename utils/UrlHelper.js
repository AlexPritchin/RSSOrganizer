import * as Linking from 'expo-linking';

const openURL = async URLToOpen => {
  const openUrlPossible = await Linking.canOpenURL(URLToOpen);
  if (openUrlPossible) {
    Linking.openURL(URLToOpen);
  }
};

export { openURL };