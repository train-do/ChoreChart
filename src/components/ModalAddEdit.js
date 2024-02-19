import React from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FormInput from "./FormInput";
import Gap from "./Gap";
import Button from "./Button";

export default function ModalAddEdit({
    visible,
    onRequestClose,
    handleCloseModal,
    addEdit,
    onChangeTextTitle,
    onChangeTextDesc,
    title,
    desc,
    errorModal,
    submitAddEdit,
    loadingAddEdit
}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View style={styles.modal}>
                <Pressable style={styles.modalClose}
                    onPress={handleCloseModal} />
                <View style={styles.containerModal}>
                    <View style={styles.headerModal}>
                        <Icon name={"checkbox-marked-circle-plus-outline"}
                            size={20}
                            color={"white"} />
                        <Text style={styles.textModal}>{addEdit.title}</Text>
                        <TouchableOpacity onPress={handleCloseModal}>
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
                            onChangeText={onChangeTextTitle} />
                        <Gap height={10} />
                        <FormInput Title={"Deskripsi Tugas"}
                            iconName={"view-headline"}
                            placeHolder={"Masukan deskripsi"}
                            value={desc}
                            onChangeText={onChangeTextDesc} />
                        {errorModal && <View style={{ alignItems: "center" }}>
                            <Gap height={10} />
                            <Text style={{ color: "red" }}>{errorModal}</Text>
                        </View>}
                        <Gap height={20} />
                        <Button
                            onPress={submitAddEdit}
                            Title={loadingAddEdit ? "Memuat..." : addEdit.button}
                            width={150} />
                    </View>
                </View>
            </View>
        </Modal>
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
})