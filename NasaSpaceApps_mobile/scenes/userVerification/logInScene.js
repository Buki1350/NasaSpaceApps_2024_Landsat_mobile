import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get('window');

export function LogInScene({ nextView }) {
    const [emailText, onChangeEmailText] = React.useState('Twój e-mail');
    const [passwordText, onChangePasswordText] = React.useState('Twoje hasło');
    const [number, onChangeNumber] = React.useState('');

    function clearTextOnFocus(currentText, changeTextFunction, placeholder) {
        if (currentText === placeholder) {
            changeTextFunction('');
        }
    }

    function restoreTextOnBlur(currentText, changeTextFunction, placeholder) {
        if (currentText === '') {
            changeTextFunction(placeholder);
        }
    }
    
    function nextButtonHandler() {
        nextView();
    }
    
    return (
            <View style={styles.container}>
                <Text style={styles.text1}>Zaloguj się</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmailText}
                        onFocus={() => clearTextOnFocus(emailText, onChangeEmailText, 'Twój e-mail')}
                        onBlur={() => restoreTextOnBlur(emailText, onChangeEmailText, 'Twój e-mail')}
                        value={emailText}/>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePasswordText}
                        onFocus={() => clearTextOnFocus(passwordText, onChangePasswordText, 'Twoje hasło')}
                        onBlur={() => restoreTextOnBlur(passwordText, onChangePasswordText, 'Twoje hasło')}
                        value={passwordText}/>
                </View>
                <View style={styles.underTextInputContainer}>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.text4}>Nie masz konta?</Text>
                        <TouchableOpacity onPress={nextButtonHandler}>
                            <Text style={styles.text5}>Zarejestruj się!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nextButtonContainer}>
                        <Text style={styles.text2}>Dalej</Text>
                    </View>
                </View>
                <View style={styles.bottomSectionContainer}>
                    <Text style={styles.text2}>Lub za pomocą</Text>
                </View>
                <View style={styles.alternativeSignInContainer}>
                    <View style={styles.alternativeSignIn}>
                        
                    </View>
                    <View style={styles.alternativeSignIn}>

                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: width,
        height: height,
    },
    textInputContainer: {
        backgroundColor: 'white',
        width: '80%',
        height: width * 0.15,
        borderRadius: 35,
        marginVertical: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 1.00,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        fontSize: 20,
        color: 'grey',
        width: '80%',
    },
    text1: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: '5%',
        marginTop: '40%'
    },
    text2: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    text3: {
        
    },
    text4: {
        fontSize: 15
    },
    text5: {
        fontSize: 15,
        fontWeight: "bold"
    },
    underTextInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '3%',
    },
    signUpContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '10%',

    },
    nextButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 35,
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 1.00,
        elevation: 5,
    },
    bottomSectionContainer: {
        marginTop: '30%',
        marginBottom: '5%'
    },
    alternativeSignInContainer: {
        marginVertical: '1.5%',
        borderRadius: 20,
        justifyContent: "center",
        flexDirection: 'row',
    },
    alternativeSignIn: {
        backgroundColor: 'white',
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.1,
        marginHorizontal: '5%',
    }
    
});