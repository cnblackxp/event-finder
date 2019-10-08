import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet
  } from 'react-native';
import Tile from './Tile';

const TileList = ({ tiles, onPressTile, searchQuery }) => {
    const [ scroll, setScroll ] = useState(0);
    return (
        <FlatList
            data={tiles.filter((tile => {
                if (!searchQuery || searchQuery.trim() === '') {
                    return true;
                }
                return (tile.title.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
            }))}
            keyExtractor={(_, index) => `KEY_${index}`}
            style={styles.list}
            onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
            renderItem={({ item, index }) => (
                <Tile item={item} index={index} onPressTile={(item, imageMeasurments) => {
                    onPressTile(item, { ...imageMeasurments, pageY: imageMeasurments.pageY - scroll })
                }}  />
            )}
        />
    )
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#34495e', flex: 1,
    },
})


export default TileList;