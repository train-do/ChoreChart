import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Gap from "./Gap";
export default function FormInput({
    Title,
    placeHolder,
    iconName,
    password = false,
    capitalize = "none",
    value = "",
    onChangeText
}) {
    const [secure, setSecure] = useState(password)
    return (
        <>
            <View style={styles.Container}>
                <Text style={styles.Label}>{Title}</Text>
                <Gap height={5} />
                <View style={styles.inputanContainer}>
                    <Icon style={styles.Icons}
                        name={iconName}
                        size={27}
                        color={"black"} />
                    <TextInput style={styles.inputan}
                        placeholder={placeHolder}
                        secureTextEntry={secure}
                        autoCapitalize={capitalize}
                        value={value}
                        onChangeText={onChangeText}
                        placeholderTextColor={'grey'}
                    />
                    {password &&
                        <TouchableOpacity onPress={() => { setSecure(!secure) }}>
                            <Icon style={styles.Icons}
                                name={secure ? 'eye' : 'eye-off'}
                                size={27}
                                color={"black"} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 5
    },
    inputan: {
        flex: 1,
        paddingHorizontal: 10,
        color: "black"
        // backgroundColor: "blue"
    },
    Icons: {
        // backgroundColor: "red",
    },
    inputanContainer: {
        borderRadius: 30,
        paddingHorizontal: 15,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center"
    },
    Label: {
        color: "white"
    }
})