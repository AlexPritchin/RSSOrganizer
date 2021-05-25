import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.backgroundHeaderColor,
  },
  titleContainer: {
      width: '100%',
      marginTop: -160,
      marginBottom: 130
  },
  titleText: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors.headerTextColor,
  }
});

export default styles;