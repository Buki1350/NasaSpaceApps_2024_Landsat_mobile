import React, { useRef, useState, useCallback, useEffect } from "react";
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Background1 } from "../../components/background1";
import { SettingsScene } from "./settingsScene";
import {SetLocalisationScene} from "./SetLocalisationScene";
import {MapScene} from "./mapScene";

const { width } = Dimensions.get('window');
const iconsSizeFactor = 0.12;


export function MainApp() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [shouldAnimateIndex, setIndexToAnimate] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;
    const data = [
        { id: '0', component: SetLocalisationScene },
        { id: '1', component: MapScene},
        { id: '2', component: SettingsScene },
    ];

    useEffect(() => {
        Animated.timing(animation, {
            toValue: currentIndex,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [currentIndex]);

    const changeView = useCallback((index) => {
        setCurrentIndex(index);
        setIndexToAnimate(index);
    }, []);

    return (
        <Background1>
            <View style={styles.sceneContainer}>
                {data.map((item, index) => {
                    const translateX = animation.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [width, 0, -width],
                    });
                    

                    return (
                        <Animated.View
                            key={item.id}
                            style={[
                                StyleSheet.absoluteFill,
                                { transform: [{ translateX }] },
                            ]}
                        >
                            <item.component setCurrentViewIndex={setCurrentIndex} />
                        </Animated.View>
                    );
                })}
            </View>
        </Background1>
    );
}

const styles = StyleSheet.create({
    sceneContainer: {
        flex: 1,
        width: '100%',
    },
    navigatorContainer: {
        backgroundColor: 'white',
        width: width * 0.9,
        paddingVertical: width * 0.02,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: width * 0.04,
    },
    navigatorIconContainer: {
        backgroundColor: 'lightgrey',
        borderRadius: 15,
        padding: width * 0.01,
    },
    navigatorIconContainerSelected: {
        backgroundColor: 'orange',
        borderRadius: 15,
        padding: width * 0.01,
    },
    navigatorIcon: {
        width: width * iconsSizeFactor,
        height: width * iconsSizeFactor,
    },
});