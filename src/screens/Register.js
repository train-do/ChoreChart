import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Gap from "../components/Gap";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

export default function Register({ navigation }) {
    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [konfirmasiPass, setKonfirmasiPass] = useState("")
    const [loading, setLoading] = useState(false)
    const [fail, setFail] = useState("")
    function kembali() {
        navigation.goBack()
    }
    async function daftar() {
        try {
            setLoading(true)
            // console.log(nama, email, password, konfirmasiPass);
            const { data: register } = await axios.post(
                `https://todo-api-omega.vercel.app/api/v1/auth/register`,
                {
                    "username": nama,
                    "email": email,
                    "password": password,
                    "confirmPassword": konfirmasiPass
                }
            )
            if (register) {
                const { data: profile } = await axios.get(
                    `https://todo-api-omega.vercel.app/api/v1/profile`,
                    { headers: { Authorization: `Bearer ${register.user.token}` } }
                )
                console.log(profile);
                // await EncryptedStorage.setItem("username", profile.user.username)
                // await EncryptedStorage.setItem("password", password)
                // await EncryptedStorage.setItem("email", profile.user.email)
                await EncryptedStorage.setItem("credentials", JSON.stringify({ email, password, username: profile.user.username }))
            }
            // await EncryptedStorage.setItem("token", register.user.token)
            setLoading(false)
            // navigation.reset("Home", { token: register.user.token })
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: 'Home',
                        params: { token: register.user.token }
                    },
                ],
            })
        } catch (error) {
            setLoading(false)
            setFail(error.response.data.message)
            console.log(error.response.data, "REGISTERRRR");
        }
    }
    return (
        <View style={styles.Container}>
            <Background />
            {/* <ScrollView style={{ backgroundColor: "#ff00003b" }}> */}
            {/* <View style={{ backgroundColor: "#00ff1959", justifyContent: "center", alignItems: "center" }}> */}
            <Text style={styles.loginText}>Register</Text>
            <Gap height={10} />
            <View style={styles.Wrapper}>
                <FormInput Title={"Nama"}
                    placeHolder={"Masukkan Nama..."}
                    iconName={"account-circle"}
                    capitalize="words"
                    value={nama}
                    onChangeText={(nama) => setNama(nama)}
                />
                <Gap height={20} />
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
                <Gap height={20} />
                <FormInput Title={"Konfirmasi Password"}
                    placeHolder={"Kata Sandi..."}
                    iconName={"lock"}
                    password={true}
                    value={konfirmasiPass}
                    onChangeText={(konfirmasiPass) => setKonfirmasiPass(konfirmasiPass)}
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
                <Button Title={loading ? "Memuat..." : "Daftar"}
                    onPress={daftar} />
                <Gap height={20} />
                <Button
                    onPress={kembali}
                    Title={"Kembali"}
                    bgColor={"#402E6E"}
                    width={150} />
            </View>
            {/* </View>
            </ScrollView> */}
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
        backgroundColor: "#8F8F8F57",
        width: 300,
        padding: 20,
        // opacity: 0.7
    }
})