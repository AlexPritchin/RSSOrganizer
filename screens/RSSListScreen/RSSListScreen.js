import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const RSSListScreen = props => {
  const [rssList, setRssList] = useState([
    {
      id: '1',
      image: '',
      date: '08.02.2020',
      title: 'Some old stuff',
    },
    {
      id: '2',
      image: '',
      date: '09.02.2020',
      title: 'Something happened today',
    },
    {
      id: '3',
      image: '',
      date: '10.02.2020',
      title: 'Breaking news',
    },
  ]);

  const renderRSSListItem = itemData => {
    return (
      <View style={styles.rssListItem}>
        <Text style={styles.rssListItemDate}>{itemData.item.date}</Text>
        <Text style={styles.rssListItemTitle}>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>RSS Feed</Text>
      </View>
      <FlatList
        data={rssList}
        keyExtractor={item => item.id}
        renderItem={item => renderRSSListItem(item)}
        style={styles.rssList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    height: 90,
    paddingTop: 35,
    backgroundColor: 'cornflowerblue',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  rssList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'aliceblue'
  },
  rssListItem: {
    justifyContent: 'space-evenly',
    height: 60,
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#C3DEF4'
  },
  rssListItemDate: {
    fontSize: 12,
    color: 'dimgray',
  },
  rssListItemTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default RSSListScreen;
