import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RSSListScreen = props => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>RSS Feed</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 90,
        justifyContent: 'center',
        backgroundColor: 'cornflowerblue',
        paddingTop: 35,
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default RSSListScreen;