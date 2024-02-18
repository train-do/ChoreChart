import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Gap from "./Gap";
import CheckBox from '@react-native-community/checkbox';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function ListToDo({ props, indeks, expand, selectedIdx, check, edit, deleteTodo }) {
    // console.log(props, ">>>>>>>");
    return (
        <>
            <Gap height={10} />
            <TouchableOpacity onPress={expand}
                style={styles.container}>
                <Icon
                    style={styles.expand}
                    name={indeks == selectedIdx ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={"white"}
                />
                <View style={styles.wrapper}>
                    <CheckBox
                        style={styles.checked}
                        value={props.checked}
                        onValueChange={check}
                        tintColors={{ true: "white", false: "white" }}
                    />
                    <View style={{ ...styles.garis, height: "40%" }} />
                    <View style={styles.content}>
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            textDecorationLine: props.checked ? "line-through" : "none"
                        }}>{props.title}</Text>
                        <Gap height={5} />
                        {indeks == selectedIdx && (<Text style={{
                            color: "white", paddingBottom: 10
                        }}>{props.desc}</Text>)}

                    </View>
                    <View style={styles.garis} />
                    <View style={styles.icons}>
                        <TouchableOpacity
                            disabled={props.checked}
                            onPress={edit}>
                            <Icon style={{ ...styles.icon, backgroundColor: "#862772" }}
                                name={"pencil"}
                                size={15}
                                color={"white"} />
                            <Gap height={5} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteTodo}>
                            <Icon style={styles.icon}
                                name={"delete"}
                                size={15}
                                color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    garis: {
        backgroundColor: "white",
        height: "80%",
        width: 2,
        marginHorizontal: 10
    },
    expand: {
        // backgroundColor: "red",
        position: "absolute",
        alignSelf: "center",
        bottom: 0
    },
    icon: {
        backgroundColor: "#402E6E",
        padding: 5,
        borderRadius: 5,
        elevation: 10,
        // shadowRadius: 1,
        // shadowColor: "black"
    },
    icons: {
        // backgroundColor: "aqua"
    },
    checkBox: {
        // borderRightWidth: 1,
        // backgroundColor: "red"
    },
    content: {
        flex: 1,
        // backgroundColor: "green",
        justifyContent: "center",
        // borderRightWidth: 2
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "blue"
    },
    container: {
        marginHorizontal: 40,
        borderRadius: 15,
        backgroundColor: "#FFFFFF25",
        padding: 10,
        gap: 10,
    }
})