import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RSSDetailsScreen = props => {
  const articleItem = props.navigation.getParam('articleItem');

  return (
    <View>
      <Text>{articleItem.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default RSSDetailsScreen;