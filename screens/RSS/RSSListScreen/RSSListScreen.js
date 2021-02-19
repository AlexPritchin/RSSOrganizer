import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import { Colors } from '../../../constants/Colors';

const RSSListScreen = props => {
  const [rssList, setRssList] = useState([
    {
      id: '1',
      publicationDate: 'Fri, 19 Feb 2021 16:09:34 +0000',
      title:
        'Von Trapped: The Family Is Stuck Inside, So Why Not Sing Parodies?',
      description:
        'The Marshes, an ordinary English family, have gained extraordinary fame for their musical spoofs of lockdown life. And no, they are not trying to be the von Trapps.',
      creator: 'Isabella Kwai',
      link:
        'https://www.nytimes.com/2021/02/19/world/europe/virus-YouTube-Marsh-family.html',
      imageLink:
        'https://static01.nyt.com/images/2021/02/18/world/18marsh/18marsh-moth.jpg',
    },
    {
      id: '2',
      publicationDate: 'Fri, 19 Feb 2021 15:47:44 +0000',
      title:
        'Russia Is Offering to Export Hundreds of Millions of Vaccine Doses, but Can It Deliver?',
      description:
        'The Kremlin has scored propaganda points and bolstered several longstanding foreign policy goals by offering its Sputnik V vaccine around the world. But it has limited production capacity.',
      creator: 'Andrew E. Kramer',
      link:
        'https://www.nytimes.com/2021/02/19/world/europe/russia-coronavirus-vaccine-soft-power.html',
      imageLink:
        'https://static01.nyt.com/images/2021/02/18/world/00virus-russia1/merlin_183917829_3260652d-efa6-4272-99ed-d9d599eddf94-moth.jpg',
    },
    {
      id: '3',
      publicationDate: 'Fri, 19 Feb 2021 15:48:29 +0000',
      title: 'Don Letts, Mad Professor Team With Times on Carnival Story ',
      description:
        'The pandemic has dampened the celebrations worldwide. But a Times special project, which includes an interactive music mixing feature, lets readers get into a party mood.',
      creator: 'Adam Sternbergh',
      link:
        'https://www.nytimes.com/2021/02/19/insider/carnival-music-mix.html',
      imageLink:
        'https://static01.nyt.com/images/2021/02/19/insider/19insider-carnival/19insider-carnival-moth.jpg',
    },
  ]);

  const renderRSSListItem = (itemData) => {
    return (
      <TouchableOpacity onPress={() => {}}>
      <View style={styles.rssListItemContainer}>
        <Image
          style={styles.rssListItemImage}
          source={{ uri: itemData.item.imageLink }}
        />
        <View style={styles.rssListItemTextContainer}>
          <Text style={styles.rssListItemDate} numberOfLines={1}>
            {itemData.item.publicationDate}
          </Text>
          <Text style={styles.rssListItemTitle} numberOfLines={2}>{itemData.item.title}</Text>
        </View>
      </View>
      </TouchableOpacity>
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
  rssList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.backgroundScreenColor,
  },
  rssListItemContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundListItemColor,
  },
  rssListItemImage: {
    flexBasis: 60,
    resizeMode: 'contain'
  },
  rssListItemTextContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
    marginLeft: 10,
  },
  rssListItemDate: {
    fontSize: 12,
    color: Colors.listItemTitleColor,
    paddingBottom: 2
  },
  rssListItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 2
  },
});

export default RSSListScreen;
