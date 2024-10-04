import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from "react-native";
import { JumpOnceAnimation } from "../../components/jumpOnceAnimation";

const { width } = Dimensions.get('window');

export function ConfirmationScene({ currentViewIndex }) {
    const [shouldAnimate, setShouldAnimate] = React.useState(false);

    React.useEffect(() => {
        if (currentViewIndex === 2) { // Assuming this is the third view (index 2)
            setShouldAnimate(true);
        }
    }, [currentViewIndex]);

    return (
        <View style={styles.container}>
            {shouldAnimate ? (
                <JumpOnceAnimation duration={600} jumpHeight={30} delay={500}>
                    <Image
                        source={require('../../images/simpleIcons/letter.png')}
                        style={styles.image}
                    />
                </JumpOnceAnimation>
            ) : (
                <Image
                    source={require('../../images/simpleIcons/letter.png')}
                    style={styles.image}
                />
            )}
            <Text style={styles.text1_1}>Oczekujemy na</Text>
            <Text style={styles.text1_2}>weryfikację</Text>
            <Text style={styles.text2}>Przesłaliśmy na Twojego maila link weryfikacyjny</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: width * 0.8,
    },
    text1_1: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    text1_2: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: width * 0.1,
    },
    text2: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        resizeMode: 'contain',
        marginBottom: width * 0.1,
    }
});