import React, { useState } from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput, FlatList, Keyboard} from "react-native";

const { width, height } = Dimensions.get('window');

// List of the biggest cities in Poland
const cities = [
    "Warszawa",
    "Kraków",
    "Łódź",
    "Wrocław",
    "Poznań",
    "Gdańsk",
    "Szczecin",
    "Bydgoszcz",
    "Lublin",
    "Katowice",
    "Rzeszów",
    "Stalowa Wola"
];

export function SetLocalisationScene({ setCurrentViewIndex }) {
    const [inputValue, setInputValue] = useState("");
    const [filteredCities, setFilteredCities] = useState(cities);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const GoToMapScene = () => {
        setCurrentViewIndex(1);
    };

    // Handle when the input value changes
    const handleInputChange = (text) => {
        setInputValue(text);
        if (text.length > 0) {
            // Filter the cities based on input
            const filtered = cities.filter(city =>
                city.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities(cities); // Show all cities if input is empty
        }
        setShowSuggestions(true); // Show suggestions when input is focused/changed
    };

    // Handle when a suggestion is clicked
    const handleCitySelect = (city) => {
        setInputValue(city);
        setShowSuggestions(false); // Hide suggestions after selecting a city
    };

    return (
        
        <View style={styles.container}>
            <TextInput
                style={styles.textInputContainer}
                value={inputValue}
                onChangeText={handleInputChange}
                placeholder="Enter location"
                onSubmitEditing={Keyboard.dismiss}
                onEndEditing={Keyboard.dismiss}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />

            {/* Suggestions List */}
                <FlatList
                    data={filteredCities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleCitySelect(item)}
                        >
                            <Text style={styles.suggestionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionsList}
                />

            <View>
                <TouchableOpacity style={styles.button} onPress={GoToMapScene}>
                    <Text style={styles.suggestionText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        marginTop: 20,
    },
    textInputContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        width: width / 1.5,
        height: height * 0.06,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 20
    },
    suggestionsList: {
        width: width / 1.5,
        maxHeight: height * 0.3, // Limit the height of the suggestions list
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    suggestionText: {
        fontSize: 20,
    },
});
