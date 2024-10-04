import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions, Button, TouchableOpacity, Image} from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';
import GearIcon from '../../images/simpleIcons/gear-svgrepo-com.png'
import ManualLocalisationChangeIcon from '../../images/simpleIcons/map-location-pin-svgrepo-com.png'
import GetYourLocalisationIcon from '../../images/simpleIcons/location-crosshairs-svgrepo-com.png'
import MapTypeChangeIcon from '../../images/simpleIcons/globe-svgrepo-com.png'

const { width, height } = Dimensions.get('window');

const fetchLandsatData = async (lat, lon, gridSize) => {
    return Array(gridSize * gridSize).fill().map(() =>
        `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`
    );
};

export function MapScene({setCurrentViewIndex}) {
    const [location, setLocation] = useState(null);
    const [gridCoordinates, setGridCoordinates] = useState([]);
    const [gridSize, setGridSize] = useState(3);
    const [landsatColors, setLandsatColors] = useState([]);
    const [mapRegion, setMapRegion] = useState(null);
    const [mapType, setMapType] = useState('standard');

    const CELL_SIZE = 0.001; // Stały rozmiar komórki, około 100m

    useEffect(() => {
        getCurrentLocation();
    }, []);
    useEffect(() => {
        if (location) {
            generateGrid(location.latitude, location.longitude);
            setMapRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: CELL_SIZE * (gridSize + 2),
                longitudeDelta: CELL_SIZE * (gridSize + 2),
            });
        }
    }, [location, gridSize]);
    
    const GoToSetLocalisationScene = () => {
        setCurrentViewIndex(0);
    }
    const GoToSettingsScene = () => {
        setCurrentViewIndex(2);
    }

    const toggleMapType = () => {
        setMapType(prevType => prevType === 'standard' ? 'satellite' : 'standard');
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    const generateGrid = async (lat, lon) => {
        const grid = [];
        const offset = Math.floor(gridSize / 2);
        
        let centerOffset = CELL_SIZE/2;
        if (gridSize%2 === 0) {centerOffset = 0}

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cellCoords = [
                    { latitude: lat + (i - offset) * CELL_SIZE - centerOffset, longitude: lon + (j - offset) * CELL_SIZE - centerOffset },
                    { latitude: lat + (i - offset) * CELL_SIZE - centerOffset, longitude: lon + (j - offset + 1) * CELL_SIZE - centerOffset },
                    { latitude: lat + (i - offset + 1) * CELL_SIZE - centerOffset, longitude: lon + (j - offset + 1) * CELL_SIZE - centerOffset },
                    { latitude: lat + (i - offset + 1) * CELL_SIZE - centerOffset, longitude: lon + (j - offset) * CELL_SIZE - centerOffset },
                ];
                grid.push(cellCoords);
            }
        }

        setGridCoordinates(grid);

        const colors = await fetchLandsatData(lat, lon, gridSize);
        setLandsatColors(colors);
    };

    if (!location || !mapRegion) {
        return (<View style={styles.container}>
                    <Text style = {styles.loadingText}>Ładowanie mapy...</Text>
                </View>);
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapRegion}
                showsUserLocation={true}
                mapType={mapType}
            >
                {gridCoordinates.map((cellCoords, index) => (
                    <Polygon
                        key={index}
                        coordinates={cellCoords}
                        fillColor={landsatColors[index] || "rgba(0,0,255,0.5)"}
                        strokeColor="rgba(0,0,0,0.5)"
                        strokeWidth={1}
                    />
                ))}
            </MapView>
            <View style={styles.controls}>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
                        <Image source={GetYourLocalisationIcon} style={styles.icons}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={GoToSetLocalisationScene}>
                        <Image source={ManualLocalisationChangeIcon} style={styles.icons}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.button} onPress={GoToSettingsScene}>
                            <Image source={GearIcon} style={styles.icons}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleMapType}>
                            <Image source={MapTypeChangeIcon} style={styles.icons}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={11}
                        step={1}
                        value={gridSize}
                        onValueChange={setGridSize}
                        width={width/2}
                    />
                    <Text style={styles.buttonText}>{gridSize}x{gridSize}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    controls: {
        padding: 10,
        alignItems: 'center',
        position: "absolute",
        left: 0,
        top: height - height/3.5,
        width: width,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between"
        
    },
    buttons: {
        flexDirection: "column",
        justifyContent: "center",

    },
    button : {
        alignSelf: "baseline",
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        margin: 5
    },
    loadingText: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10
    },
    icons: {
        width: width/6,
        height: width/6,
    },
    sliderContainer : {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 5,
        paddingTop: '2%',
        position: "absolute",
        top: '80%',
        left: '50%'
    },
    slider: {
        
    }
});