import React, { useRef, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Background1 } from '../components/background1';

const { width } = Dimensions.get('window'); // Pobieramy szerokość ekranu

const data = [
    { id: '0', text: 'Hej!' },
    { id: '1', text: 'Rozumiem' },
    { id: '2', text: 'Wchodzę!' },
];

export function IntroScene() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigation = useNavigation();
    
    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.navigate('LogIn');
        }
    };

    const handleScroll = event => {
        const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <Background1>
                <Animated.FlatList
                    ref={flatListRef}
                    data={data}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false, listener: handleScroll }
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <View style={styles.card}>
                                <Text style={styles.text}></Text>
                            </View>
                        </View>
                    )}
                />

                <View style={styles.pagination}>
                    {data.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, currentIndex === i ? styles.dotActive : styles.dotInactive]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>{data[currentIndex].text}</Text>
                </TouchableOpacity>
            </Background1>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: width, // Szerokość karty dostosowana do ekranu
        height: 300, // Wysokość karty
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '40%', // Ustawiamy pionowy margines
    },
    card: {
        width: '80%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '20%',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        margin: 8,
    },
    dotInactive: {
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: '#494949',
    },
    button: {
        position: 'absolute',
        bottom: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});
