import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ 
    Title, 
    bgColor = "#862772", 
    width = 200,
    onPress
}) {
    return (
        <TouchableOpacity onPress={onPress}
        style={{ ...styles.container, backgroundColor: bgColor, width}}>
            <Text style={styles.title}>{Title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: "white"
    },
    container: {
        backgroundColor: "#862772",
        height: 45,
        width: 200,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    }
})