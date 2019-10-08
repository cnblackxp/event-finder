import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  TextInput,
  Dimensions
} from 'react-native';

import TileList from './src/components/TileList';


const EVENTS = [
  {
    id: '1',
    imageURL: 'https://zone1-ibizaspotlightsl.netdna-ssl.com/sites/default/files/styles/auto_1500_width/public/article-images/132783/slideshow-1545223229.jpg',
    title: 'Rock Plaza',
    description: 'this is the party of your time, you are gonna love this party.',
    date: '2022/11/15',
    guests: 244,
  },
  {
    id: '2',
    imageURL: 'http://www.eastendfilmfestival.com/wp-content/uploads/2016/05/4-parties.jpg',
    title: 'Lounge Dance',
    description: 'dance your sorrows away at this fancy lounge.',
    date: '2019/12/09',
    guests: 500,
  },
  {
    id: '3',
    imageURL: 'https://jackcolton.com/wp-content/uploads/2019/03/Wet-Republic-1024x683.jpg',
    title: 'Pool Party',
    description: 'the summer is about to be over enjoy it while you can man.',
    date: '2019/10/16',
    guests: 122,
  },
]


const App = () => {
  const [ tile, setTile ] = useState(undefined);
  const [ tileMeasurments, setTileMeasurments ] = useState(undefined);
  const [ searchQuery, setSearchQuery ] = useState(undefined);

  const animated = useRef(new Animated.Value(0)).current;

  let imageWidth, imageHeight, imageX, imageY, backgroundOpacity, detailsY;
  if (tileMeasurments) {
    imageWidth = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [tileMeasurments.width, Dimensions.get('window').width]
    })
    imageHeight = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [tileMeasurments.height, Dimensions.get('window').height/3]
    });
    imageX = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [tileMeasurments.pageX, 0]
    });
    imageY = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [tileMeasurments.pageY, 0]
    });
    backgroundOpacity = animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['#2c3e5000', '#2c3e50cc']
    });
    detailsY = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').height, Dimensions.get('window').height/3]
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 30, backgroundColor: '#2980b9' }}>
        <View style={{ alignItems: 'center' }}> 
          <Text style={{ fontSize: 20, color: '#ecf0f1' }}>Event Finder</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View 
          style={{ 
            padding: 20, 
            backgroundColor: '#3498db',
            shadowColor: 'white',
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowOpacity: 0.2,
            shadowRadius: 10
          }}
        >
          <Text style={{ color: '#ecf0f1', marginBottom: 20 }}>the place to find events near by, choose an event you like and go party like crazy.</Text>
          <TextInput value={searchQuery} onChangeText={(text) => setSearchQuery(text)} placeholder="Press Here For Search! ex: Lounge" />
        </View>
        <TileList
          tiles={EVENTS}
          searchQuery={searchQuery}
          onPressTile={(tile, imageMeasurments) => {
            setTile(tile);
            setTileMeasurments(imageMeasurments);
            Animated.timing(
              animated,
              {
                toValue: 1,
                duration: 300
              }
            ).start();
          }}
        />
      </View>
      {
        tile && (
          <Animated.View style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: backgroundOpacity }}>
              <Animated.Image
                source={{ uri: tile.imageURL }} 
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  position: 'absolute',
                  top: imageY,
                  left: imageX,
                }} 
                resizeMode='cover'
              />
              <Animated.View style={{ position: 'absolute', top: detailsY, left: 0, }}>
                <Text style={[styles.detailsText, { fontSize: 20 }]}>{tile.title}</Text>
                <Text style={styles.detailsText}>{tile.description}</Text>
                <Text style={styles.detailsText}>Date {tile.date}</Text>
                <Text style={styles.detailsText}>Guest {tile.guests}</Text>
              </Animated.View>
              <TouchableOpacity
                activeOpacity={1} 
                onPress={() => {
                  Animated.timing(
                    animated,
                    {
                      toValue: 0,
                      duration: 300
                    }
                  ).start(() => setTile(undefined));
                }}
                style={{ width: '100%', height: '100%' }}
              />
          </Animated.View>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    padding: 20,
    color: '#ecf0f1'
  }
});

export default App;
