import { StyleSheet } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.headerTextColor
  },
  userEmailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
    marginLeft: 20
  },
  userEmailTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textInputsSelectionColor,
    textAlign: 'left',
    width: '40%'
  },
  userEmailValueText: {
    fontSize: 18,
    color: Colors.textInputsSelectionColor,
    textAlign: 'left',
    width: '60%'
  },
});

export default styles;