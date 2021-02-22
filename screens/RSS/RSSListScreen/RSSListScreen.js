import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { RSSScreensNames } from '../../../constants/ScreensNames';

import RSSListItem from '../../../components/RSS/RSSListItem/RSSListItem';

import styles from './RSSListScreenStyles';

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

  const listItemPressCallback = (navigation, articleItemToPassToDetails) => {
    navigation.push(RSSScreensNames.RSSDetails, {
      articleItem: articleItemToPassToDetails
    });
  };

  const renderRSSListItem = (itemData) => {
    return <RSSListItem articleItem={itemData.item} onListItemPress={() => {
      listItemPressCallback(props.navigation, itemData.item);
    }} />;
  };

  return (
    <FlatList
      data={rssList}
      renderItem={item => renderRSSListItem(item, props.navigation)}
      style={styles.rssList}
    />
  );
};

export default RSSListScreen;