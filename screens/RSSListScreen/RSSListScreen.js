import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import Colors from '../../constants/Colors';

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
    <FlatList
        data={rssList}
        renderItem={item => renderRSSListItem(item)}
        style={styles.rssList}
      />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    height: '10%',
    paddingTop: Dimensions.get('window').height > 890 ? '9%' : '4%',
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
    backgroundColor: Colors.backgroundScreenColor
  },
  rssListItem: {
    justifyContent: 'space-evenly',
    height: 60,
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundListItemColor
  },
  rssListItemDate: {
    fontSize: 12,
    color: Colors.listItemTitleColor,
  },
  rssListItemTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default RSSListScreen;
