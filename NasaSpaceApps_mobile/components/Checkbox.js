import CheckIcon from '../images/simpleIcons/check-svgrepo-com.png';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get('window');

export function Checkbox({ size = 1, onPressChange, initValue = false }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        console.log(initValue);
        if (initValue === true) {
            setChecked(initValue);
        }
    }, [initValue]);

    const changeHandler = () => {
        setChecked(!checked);
        if (onPressChange) {
            onPressChange(!checked);
        }
    };

    return (
        <TouchableOpacity onPress={changeHandler} style={[
            styles.container,
            { marginRight: width * 0.03 * size }
        ]}>
            <View style={[
                styles.imageContainer,
                { width: width * 0.05 * size, height: width * 0.05 * size }
            ]}>
                {checked ? (
                    <Image source={CheckIcon} style={styles.image} />
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: 'white',
        borderRadius: 3,
    }
});
