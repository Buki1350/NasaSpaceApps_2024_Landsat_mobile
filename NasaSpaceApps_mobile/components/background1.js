import {Dimensions, ImageBackground, StyleSheet} from "react-native";
import background from '../images/backgrounds/background1.png';

const { width, height } = Dimensions.get('window');
export function Background1({children}) {
    return (
        <ImageBackground source={background} style={styles.background}>
            {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height * 1.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
});