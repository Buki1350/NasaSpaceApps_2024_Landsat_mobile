import React, {useRef, useState, useCallback} from "react";
import {Animated, Dimensions, View} from "react-native";
import {LogInScene} from "./logInScene";
import {SignInScene} from "./signInScene";
import {ConfirmationScene} from "./confirmationScene";
import {Background1} from "../../components/background1";

const { width, height } = Dimensions.get('window');

const data = [
    { id: '0', component: 'login' },
    { id: '1', component: 'signin' },
    { id: '2', component: 'confirmation' },
];

export function UserVerification() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = event => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const changeView = useCallback((index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    }, []);

    const nextView = useCallback(() => {
        const nextIndex = currentIndex + 1;
        console.log(currentIndex);
        if (nextIndex < data.length) {
            setCurrentIndex(nextIndex);
            changeView(nextIndex);
        }
    }, [currentIndex, changeView]);

    const renderItem = ({ item, index }) => {
        switch (item.component) {
            case 'login':
                return <LogInScene nextView={nextView} />;
            case 'signin':
                return <SignInScene nextView={nextView} />;
            case 'confirmation':
                return <ConfirmationScene currentViewIndex={currentIndex} />;
            default:
                return null;
        }
    };

    return (
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
            renderItem={renderItem}
        />
        </Background1>
    );
}