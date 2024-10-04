import {StyleSheet, View, Text, Dimensions,
    TouchableOpacity, TextInput} from "react-native";
import React from "react";

const { width, height } = Dimensions.get('window');

export function SignInScene({nextView}) {
    const [emailText, onChangeEmailText] = React.useState('Twój e-mail');
    const [passwordText, onChangePasswordText] = React.useState('Twoje hasło');
    const [confirmPasswordText, onChangeConfirmPasswordText] = React.useState('Powtórz hasło');
    const [number, onChangeNumber] = React.useState('');
    const [isChecked, setChecked] = React.useState(false);

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
    
    const handleButtonNext = () => {
        nextView();
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Zarejestruj się</Text>
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
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePasswordText}
                    onFocus={() => clearTextOnFocus(confirmPasswordText, onChangeConfirmPasswordText, 'Powtórz hasło')}
                    onBlur={() => restoreTextOnBlur(confirmPasswordText, onChangeConfirmPasswordText, 'Powtórz hasło')}
                    value={confirmPasswordText}/>
            </View>
            <View style={styles.underTextInputContainer}>
                <View style={styles.infoText}>
                    <Text>Klikając "Dalej" akceptuje regulamin korzystania z aplikacji</Text>
                </View>
                <View style={styles.nextButtonContainer}>
                    <Text style={styles.text2}>Dalej</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: width,
        height: height
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
    infoText: {
        width: '50%'
    }

});