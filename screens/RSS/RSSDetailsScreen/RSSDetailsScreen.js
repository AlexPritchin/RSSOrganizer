import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../constants/Colors';

const RSSDetailsScreen = props => {
  const articleItem = props.navigation.getParam('articleItem');

  return (
    <View style={styles.articleContainer}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.articleTitle}>{articleItem.title}</Text>
      <Image style={styles.articleImage} source={{uri: articleItem.imageLink}} />
      <Text style={styles.articleDescription}>{articleItem.description}</Text>
      <Text style={styles.articleCreator}>{articleItem.creator}</Text>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.articleLinkContainer}>
        <Text style={styles.articleLinkText}>Open in browser</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    paddingHorizontal: 20
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  articleImage: {
    height: Dimensions.get('window').width - 120,
    width: Dimensions.get('window').width - 120,
    alignSelf: 'center',
    marginVertical: 30
  },
  articleDescription: {
    textAlign: 'justify',
    fontSize: 16
  },
  articleCreator: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 14
  },
  articleLinkContainer: {
    justifyContent: 'center',
    backgroundColor: Colors.backgroundHeaderColor,
    borderRadius: 5,
    height: 40,
    marginTop: 40,
    marginBottom: 20
  },
  articleLinkText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default RSSDetailsScreen;