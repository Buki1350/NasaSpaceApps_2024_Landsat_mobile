import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const JumpOnceAnimation = ({ children, duration = 1000, jumpHeight = 20, delay = 0 }) => {
    const jumpAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animationSequence = Animated.sequence([
            Animated.timing(jumpAnim, {
                toValue: 1,
                duration: duration / 2,
                useNativeDriver: true,
            }),
            Animated.timing(jumpAnim, {
                toValue: 0,
                duration: duration / 2,
                useNativeDriver: true,
            }),
        ]);

        Animated.sequence([
            Animated.delay(delay),
            animationSequence
        ]).start();

    }, [duration, jumpHeight, delay]);

    const yOffset = jumpAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -jumpHeight],
    });

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: yOffset }] }]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});