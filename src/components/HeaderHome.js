import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
export default function HeaderHome({ logout, username, email }) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={logout}>
                <Icon style={{ transform: [{ rotate: "180deg" }] }}
                    name={"logout"}
                    size={35}
                    color={"white"} />
            </TouchableOpacity>
            <View style={styles.userProfile}>
                <Text style={{
                    color: "#FFFFFF",
                    fontSize: 20,
                    fontWeight: "bold"
                }}>{username}</Text>
                <Text style={{
                    color: "#8F8F8F"
                }}>{email}</Text>
            </View>
            <Icon name={"account-circle"}
                size={50}
                color={"white"} />
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight + 20,
        flexDirection: "row",
        paddingHorizontal: 30,
        alignItems: "center"
    },
    userProfile: {
        flex: 1,
        paddingHorizontal: 20
    },
})