import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import React from "react";

const { width , height} = Dimensions.get('window');
export function SettingsScene({setCurrentViewIndex}) {
    const GoToMapScene = () => {
        setCurrentViewIndex(1);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={GoToMapScene}>
                <Text styles={styles.buttonText}>Chuj</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: height,
        
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontsize: 16,
    }
})