import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Alert, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export function SetLocalisationScene({setCurrentViewIndex}) {
    const GoToMapScene = () => {
        setCurrentViewIndex(1);
    }
    
   return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={GoToMapScene}>
                <Text>Zapisz</Text>
            </TouchableOpacity>
        </View>   
   )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: "center",
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
    },
});
