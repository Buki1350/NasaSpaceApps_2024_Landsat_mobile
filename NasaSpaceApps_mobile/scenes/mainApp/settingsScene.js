import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {Checkbox} from "../../components/Checkbox";
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';

const { width , height} = Dimensions.get('window');

export function SettingsScene({setCurrentViewIndex}) {
    const [sateliteCheck, setSateliteCheck] = useState(false);
    const [cloudsTreshold, setCloudsTreshold] = useState(0);
    const [newestDataCheck, setNewestDataCheck] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
    const [shouldShowCalendar, setShouldShowCalendar] = useState(false);

    const ShouldShowCalendarChange = () => {
        setShouldShowCalendar(!shouldShowCalendar);
    };

    const GoToMapScene = () => {
        setCurrentViewIndex(1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Checkbox size={1.5} onPressChange={setSateliteCheck}/>
                <Text style={styles.checkboxText}>Show landsat satellites on map</Text>
            </View>

            <View style={styles.sectionVertical}>
                <Text style={styles.sliderText}>Cloud coverage threshold</Text>
                <View style={{flexDirection: 'row'}}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        onValueChange={setCloudsTreshold}
                        width={'90%'}
                    />
                    <Text>{cloudsTreshold}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Checkbox
                    size={1.5}
                    onPressChange={setNewestDataCheck}
                    initValue={true}
                />
                {newestDataCheck ? (
                    <Text style={styles.checkboxText}>Download the latest Landsat data</Text>
                ) : (
                    <View style={{flex: 1, flexDirection: 'column', height: height/4, alignItems: "center"}}>
                        <Text style={[styles.checkboxText, { color: 'darkgray' }]}>Download the latest Landsat data</Text>
                        <TouchableOpacity onPress={ShouldShowCalendarChange} style={styles.additionalSection}>
                            <Text style={[styles.checkboxText, {textAlign: 'center'}]}>Set date</Text>
                        </TouchableOpacity>
                        <Text style={styles.checkboxText}>
                            {selectedDate.getDate()}/
                            {selectedDate.getMonth() + 1}/
                            {selectedDate.getFullYear()}
                        </Text>
                        {shouldShowCalendar && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={(event, date) => {
                                    if (date) {
                                        setSelectedDate(date);
                                    }
                                    ShouldShowCalendarChange(); // Close the calendar after selecting or dismissing
                                }}
                            />
                        )}
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={GoToMapScene}>
                <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width
    },
    button: {
        marginTop: '10%',
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    checkboxText: {
        fontSize: 24,
        flex: 1,
        flexWrap: 'wrap',
    },
    slider: {
        width: '90%'
    },
    sliderText: {
        fontSize: 24,
        marginBottom: '5%'
    },
    section: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: 'lightgray',
        padding: '5%',
        alignItems: "center",
        borderRadius: 10,
        width: width * 0.8,
        marginVertical: '2.5%',
    },
    additionalSection: {
        backgroundColor: 'darkgray',
        borderRadius: 10,
        height: '20%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    sectionVertical: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: 'lightgray',
        padding: '5%',
        alignItems: "center",
        borderRadius: 10,
        width: width * 0.8,
        marginVertical: '2.5%',
    }
});
