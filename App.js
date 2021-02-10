import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RSSListScreen from "./screens/RSSListScreen/RSSListScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RSSListScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
