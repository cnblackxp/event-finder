import React, { useState, useRef, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet
  } from 'react-native';

const Tile = ({item, index, onPressTile}) => {
    const [ imageMeasurments, setImageMeasurments ] = useState(undefined);
    const imageRef = useRef(undefined);

    useEffect(() => {
        if (imageRef.current !== undefined) {
            imageRef.current.measure((x, y, width, height, pageX, pageY) => {
                setImageMeasurments({
                    x, y, width, height, pageX, pageY
                });
            })
        }
    }, [index]);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressTile(item, imageMeasurments)}>
            <View style={[styles.tileContainer, index % 2 === 0 && { backgroundColor: '#2c3e50' }]}>
                <Image
                    ref={imageRef}
                    source={{ uri: item.imageURL }} 
                    style={styles.tileImage} 
                    resizeMode='cover'
                    onLayout={(nativeEvent) => {
                        imageRef.current.measure((x, y, width, height, pageX, pageY) => {
                            setImageMeasurments({
                                x, y, width, height, pageX, pageY
                            });
                        })
                    }}
                />
                <Text style={styles.tileTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tileContainer: { 
        position: 'relative', 
        flexDirection: 'row', 
        justifyContent:'center', 
        paddingVertical: 20,
    },
    tileImage: {
        height: 200,
        width: '90%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    tileTitle: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    }
});

export default Tile;