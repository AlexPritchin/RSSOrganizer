import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  articleContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.headerTextColor
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: Colors.textInputsSelectionColor
  },
  articleImage: {
    height: Dimensions.get('window').width - 120,
    width: Dimensions.get('window').width - 120,
    alignSelf: 'center',
    marginVertical: 30,
  },
  articleDescription: {
    textAlign: 'justify',
    fontSize: 16,
    color: Colors.textInputsSelectionColor
  },
  articleCreator: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 14,
    color: Colors.textInputsSelectionColor
  },
  articleLinkButton: {
    marginBottom: 20,
  },
});

export default styles;