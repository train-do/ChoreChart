import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Background from "../components/Background";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import EncryptedStorage from "react-native-encrypted-storage/";
import axios from "axios";

export default function SplashScreen({ navigation }) {
    async function validasi() {
        try {
            // const email = await EncryptedStorage.getItem("email")
            // const password = await EncryptedStorage.getItem("password")
            const credentials = await EncryptedStorage.getItem("credentials")
            if (credentials) {
                // console.log(email);
                const formData = JSON.parse(credentials)
                const { data } = await axios.post(
                    `https://todo-api-omega.vercel.app/api/v1/auth/login`,
                    {
                        email: formData.email,
                        password: formData.password
                    }
                )
                navigation.replace("Home", { token: data.user.token })
            } else {
                navigation.replace("Login")
            }
        } catch (error) {
            console.log(error, "SPLASHHHHH");
        }
    }
    useEffect(() => {
        validasi()
    }, [])
    return (
        <View style={styles.container}>
            <Background />
            <Icon name={"checkbox-marked-circle-plus-outline"}
                size={100}
                color={"white"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})