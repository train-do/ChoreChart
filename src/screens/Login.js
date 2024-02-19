import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Gap from "../components/Gap";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState("")
    async function login() {
        try {
            setLoading(true)
            const { data: login } = await axios.post(
                `https://todo-api-omega.vercel.app/api/v1/auth/login`,
                {
                    email: email,
                    password: password
                }
            )
            const { data: profile } = await axios.get(
                `https://todo-api-omega.vercel.app/api/v1/profile`,
                { headers: { Authorization: `Bearer ${login.user.token}` } }
            )
            // console.log(profile);
            // await EncryptedStorage.setItem("username", profile.user.username)
            // await EncryptedStorage.setItem("password", password)
            // await EncryptedStorage.setItem("email", profile.user.email)
            await EncryptedStorage.setItem("credentials", JSON.stringify({ email, password, username: profile.user.username }))
            // await EncryptedStorage.setItem("token", login.user.token)
            setLoading(false)
            navigation.replace("Home", { token: login.user.token })
        } catch (error) {
            setLoading(false)
            setFail(error.response.data.message)
            console.log(error.response.data, "DARI LOGIN SCREEN");
        }
    }
    function register() {
        navigation.navigate("Register")
    }
    return (
        <View style={styles.Container}>
            <Background />
            <Text style={styles.loginText}>Login</Text>
            <Gap height={10} />
            <View style={styles.Wrapper}>
                <FormInput Title={"Email"}
                    placeHolder={"contoh@mail.com"}
                    iconName={"email"}
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <Gap height={20} />
                <FormInput Title={"Password"}
                    placeHolder={"Kata Sandi..."}
                    iconName={"lock"}
                    password={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                {
                    fail && (
                        <View style={{ justifyContent: 'center', alignItems: "center" }}>
                            <Gap height={10} />
                            <Text style={{ color: "red", fontWeight: 'bold' }}>{fail}</Text>
                        </View>
                    )
                }
                <Gap height={20} />
                <Button
                    onPress={login}
                    Title={loading ? "Memuat..." : "Masuk"} />
                <Gap height={20} />
                <Button
                    onPress={register}
                    Title={"Daftar"}
                    bgColor={"#402E6E"}
                    width={150} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    Wrapper: {
        borderRadius: 30,
        backgroundColor: "#8F8F8F6e",
        width: 300,
        padding: 20,
    }
})