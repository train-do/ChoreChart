import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import ListToDo from "../components/ListToDo";
import axios from "axios";
import Gap from "../components/Gap";
import EncryptedStorage from "react-native-encrypted-storage";
import HeaderHome from "../components/HeaderHome";
import ModalAddEdit from "../components/ModalAddEdit";

export default function Home({ navigation, route }) {
    const token = route.params.token
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingAddEdit, setLoadingAddEdit] = useState(false)
    const [selectedIdx, setSelectedIdx] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [addEdit, setAddEdit] = useState({})
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [errorModal, setErrorModal] = useState("")
    async function profile() {
        const credentials = await EncryptedStorage.getItem("credentials")
        setUsername(JSON.parse(credentials).username)
        setEmail(JSON.parse(credentials).email)
    }
    async function logout() {
        try {
            navigation.replace("Login")
            await EncryptedStorage.clear()
        } catch (error) {
            console.log(error, "logout")
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
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setData(data.data.todos)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(token, "getTodo")
            console.log(error.response.data, "getTodo")
        }
    }
    async function check(item) {
        try {
            setLoading(true)
            // console.log(item, ">>>>>>");
            await axios.put(
                `https://todo-api-omega.vercel.app/api/v1/todos/${item._id}`,
                {
                    "checked": !item.checked
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            getTodo()
        } catch (error) {
            setLoading(false)
            console.log(error.response.data, "check")
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
            // console.log(addEdit.method);
            setLoadingAddEdit(true)
            if (addEdit.method == "add") {
                await axios.post(
                    'https://todo-api-omega.vercel.app/api/v1/todos',
                    {
                        title: title,
                        desc: desc,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } else {
                console.log(addEdit.data._id);
                await axios.put(
                    `https://todo-api-omega.vercel.app/api/v1/todos/${addEdit.data._id}`,
                    {
                        title: title,
                        desc: desc,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            }
            // console.log(data);
            setShowModal(false)
            setLoadingAddEdit(false)
            getTodo()
        } catch (error) {
            setLoadingAddEdit(false)
            console.log(error.response.data, "submitAddEdit")
            setErrorModal(error.response.data.message)
        }
    }
    async function deleteTodo(item) {
        try {
            setLoading(true)
            await axios.delete(
                `https://todo-api-omega.vercel.app/api/v1/todos/${item._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            getTodo()
        } catch (error) {
            setLoading(false)
            console.log(error.response.data, "deleteTodo")
        }
    }
    useEffect(() => {
        profile()
        getTodo()
    }, [])
    return (
        <View style={styles.container}>
            <Background />
            <HeaderHome
                logout={logout}
                username={username}
                email={email}
            />
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
            <ModalAddEdit
                visible={showModal}
                onRequestClose={() => { setShowModal(!showModal); }}
                handleCloseModal={() => setShowModal(false)}
                addEdit={addEdit}
                onChangeTextTitle={(title) => setTitle(title)}
                onChangeTextDesc={(desc) => setDesc(desc)}
                title={title}
                desc={desc}
                errorModal={errorModal}
                submitAddEdit={submitAddEdit}
                loadingAddEdit={loadingAddEdit}
            />
        </View >
    )
}
const styles = StyleSheet.create({
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
    container: {
        flex: 1
    }
})