import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
      fontSize: Platform.OS === 'android' ? 16 : 17,
  },
});

export default styles;