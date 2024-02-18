import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ListToDo from "../components/ListToDo";
import axios from "axios";
import FormInput from "../components/FormInput";
import Gap from "../components/Gap";
import Button from "../components/Button";
import EncryptedStorage from "react-native-encrypted-storage";

export default function Home({ navigation }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedIdx, setSelectedIdx] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [addEdit, setAddEdit] = useState({})
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [errorModal, setErrorModal] = useState("")
    async function profile() {
        setUsername(await EncryptedStorage.getItem("username"))
        setEmail(await EncryptedStorage.getItem("email"))
    }
    async function logout() {
        try {
            navigation.replace("Login")
            await EncryptedStorage.clear()
        } catch (error) {
        }
    }
    function expand(idx) {
        if (selectedIdx == idx) {
            setSelectedIdx(null)
        } else {
            setSelectedIdx(idx)
        }
        // console.log(idx, selectedIdx);
    }
    async function getTodo() {
        try {
            setLoading(true)
            const { data } = await axios.get(
                'https://todo-api-omega.vercel.app/api/v1/todos',
                { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMzNzQ0NzRlZDU5NTQ5ZTA3MjU2YmQiLCJ1c2VybmFtZSI6IlRlc3RlciIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MDcxOTc1NjYsImV4cCI6MTcwNzgwMjM2Nn0.j4jR0B_8-1tYY57kDdwhS2B7pzkplCeYfis3D45VB2Q' } }
            )
            setData(data.data.todos)
            setLoading(false)
        } catch (error) {
        }
    }
    async function check(item) {
        try {
            setLoading(true)
            // console.log(item, ">>>>>>");
            const { data } = await axios.put(
                `https://todo-api-omega.vercel.app/api/v1/todos/${item._id}`,
                {
                    "checked": !item.checked
                },
                { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMzNzQ0NzRlZDU5NTQ5ZTA3MjU2YmQiLCJ1c2VybmFtZSI6IlRlc3RlciIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MDcxOTc1NjYsImV4cCI6MTcwNzgwMjM2Nn0.j4jR0B_8-1tYY57kDdwhS2B7pzkplCeYfis3D45VB2Q' } }
            )
            getTodo()
        } catch (error) {

        }
    }
    function addTodo() {
        setShowModal(true)
        setAddEdit({ title: "Tambah Tugas", button: "Tambah", method: "add" })
        setTitle("")
        setDesc("")
        setErrorModal("")
    }
    function editTodo(data) {
        // console.log(data);
        setErrorModal("")
        setShowModal(true)
        setAddEdit({ title: "Edit Tugas", button: "Edit", data, method: "edit" })
        setTitle(data.title)
        setDesc(data.desc)
    }
    async function submitAddEdit(item) {
        try {
            console.log(addEdit.method);
            setLoading(true)
            if (addEdit.method == "add") {
                const { data } = await axios.post(
                    'https://todo-api-omega.vercel.app/api/v1/todos',
                    {
                        title: title,
                        desc: desc,
                    },
                    { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMzNzQ0NzRlZDU5NTQ5ZTA3MjU2YmQiLCJ1c2VybmFtZSI6IlRlc3RlciIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MDcxOTc1NjYsImV4cCI6MTcwNzgwMjM2Nn0.j4jR0B_8-1tYY57kDdwhS2B7pzkplCeYfis3D45VB2Q' } }
                )
            } else {
                console.log(addEdit.data._id);
                const { data } = await axios.put(
                    `https://todo-api-omega.vercel.app/api/v1/todos/${addEdit.data._id}`,
                    {
                        title: title,
                        desc: desc,
                    },
                    { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMzNzQ0NzRlZDU5NTQ5ZTA3MjU2YmQiLCJ1c2VybmFtZSI6IlRlc3RlciIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MDcxOTc1NjYsImV4cCI6MTcwNzgwMjM2Nn0.j4jR0B_8-1tYY57kDdwhS2B7pzkplCeYfis3D45VB2Q' } }
                )
            }
            console.log(data);
            setShowModal(false)
            getTodo()
        } catch (error) {
            // console.log(error.response.data);
            setErrorModal(error.response.data.message)
        }
    }
    async function deleteTodo(item) {
        try {
            setLoading(true)
            const { data } = await axios.delete(
                `https://todo-api-omega.vercel.app/api/v1/todos/${item._id}`,
                { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMzNzQ0NzRlZDU5NTQ5ZTA3MjU2YmQiLCJ1c2VybmFtZSI6IlRlc3RlciIsImVtYWlsIjoidGVzdGluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MDcxOTc1NjYsImV4cCI6MTcwNzgwMjM2Nn0.j4jR0B_8-1tYY57kDdwhS2B7pzkplCeYfis3D45VB2Q' } }
            )
            getTodo()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        profile()
        getTodo()
    }, [])
    return (
        <View style={styles.container}>
            <Background />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={logout}>
                    <Icon style={{ transform: [{ rotate: "180deg" }] }}
                        name={"logout"}
                        size={50}
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
            <FlatList
                refreshing={loading}
                onRefresh={() => getTodo()}
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <ListToDo
                            props={item}
                            indeks={index}
                            selectedIdx={selectedIdx}
                            expand={() => expand(index)}
                            check={() => check(item)}
                            edit={() => editTodo(item)}
                            deleteTodo={() => deleteTodo(item)}
                        />
                    )
                }}
            />
            <Gap height={100} />
            <TouchableOpacity onPress={addTodo}
                style={styles.imageContainer}>
                <Icon name={"checkbox-marked-circle-plus-outline"}
                    size={40}
                    color={"white"} />
            </TouchableOpacity>
            <Modal transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}>
                <View style={styles.modal}>
                    <Pressable style={styles.modalClose}
                        onPress={() => setShowModal(false)} />
                    <View style={styles.containerModal}>
                        <View style={styles.headerModal}>
                            <Icon name={"checkbox-marked-circle-plus-outline"}
                                size={20}
                                color={"white"} />
                            <Text style={styles.textModal}>{addEdit.title}</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Icon name={"close"}
                                    size={20}
                                    color={"white"} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formModal}>
                            <FormInput Title={"Judul Tugas"}
                                iconName={"pencil"}
                                placeHolder={"Masukan judul..."}
                                value={title}
                                onChangeText={(title) => setTitle(title)} />
                            <Gap height={10} />
                            <FormInput Title={"Deskripsi Tugas"}
                                iconName={"view-headline"}
                                placeHolder={"Masukan deskripsi"}
                                value={desc}
                                onChangeText={(desc) => setDesc(desc)} />
                            {errorModal && <View style={{ alignItems: "center" }}>
                                <Gap height={10} />
                                <Text style={{ color: "red" }}>{errorModal}</Text>
                            </View>}
                            <Gap height={20} />
                            <Button
                                onPress={submitAddEdit}
                                Title={addEdit.button}
                                width={150} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    )
}
const styles = StyleSheet.create({
    textModal: {
        color: "white"
    },
    modalClose: {
        position: "absolute",
        height: "100%",
        width: "100%",
        // backgroundColor: "red"
    },
    formModal: {
        marginHorizontal: 20
    },
    headerModal: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between"
    },
    containerModal: {
        backgroundColor: "#402E6E",
        // height: 330,
        paddingBottom: 20,
        width: 270,
        borderRadius: 20
    },
    modal: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#181616b0"
    },
    imageContainer: {
        backgroundColor: "#862772",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 60 / 2,
        position: "absolute",
        bottom: 30,
        right: 30
    },
    addImage: {
        height: 50
    },
    userProfile: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        marginTop: StatusBar.currentHeight + 20,
        flexDirection: "row",
        paddingHorizontal: 30,
        alignItems: "center"
    },
    container: {
        flex: 1
    }
})