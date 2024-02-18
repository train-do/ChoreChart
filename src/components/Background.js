import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function Background (){
    return(
        <Image source={require("../images/background_1.png")} style={styles.imgBckg}/>
    )
}

const styles = StyleSheet.create({
    imgBckg:{
        height: "100%",
        width: "100%",
        position: "absolute"
    }
})