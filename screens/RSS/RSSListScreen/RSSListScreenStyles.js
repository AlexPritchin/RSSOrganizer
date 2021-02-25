import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  loadingIndicatorAndMessageContainer:{
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  messageText: {
    textAlign: 'center'
  },
    rssListContainer: {
        padding: 20,
        backgroundColor: Colors.backgroundScreenColor,
      }
});

export default styles;