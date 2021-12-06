import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Colors from "../../../constants/Colors";

interface PurchaseStarshipModal {
    title: string,
    handleTapConfirmation: Function,
    visible: boolean,
    shipName: string,
    purchaseAmount: string,
}

export default function PurchaseStarshipModal({shipName, purchaseAmount, visible, handleTapConfirmation}: PurchaseStarshipModal) {
    const handlePurchaseAccept = () => {
        handleTapConfirmation(true)
    }
    const handlePurchaseDecline = () => {
        handleTapConfirmation(false)
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    handleTapConfirmation()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeader}>Purchase</Text>
                        <Text style={styles.modalDetailsText}>Ship: {shipName}</Text>
                        <Text style={styles.modalDetailsText}>Amount: {parseInt(purchaseAmount).toLocaleString()}</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonAccept]}
                                onPress={handlePurchaseAccept}
                            >
                                <Text style={styles.textStyle}>Accept</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonDecline]}
                                onPress={handlePurchaseDecline}
                            >
                                <Text style={styles.textStyle}>Decline</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.global.backgroundDarkGray,
        borderRadius: 20,
        paddingHorizontal: 55,
        paddingVertical: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonContainer: {
      flexDirection: "row",
    },
    button: {
        borderRadius: 20,
        padding: 15,
        elevation: 2
    },
    buttonAccept: {
        backgroundColor: "green",
        marginRight: 20,
    },
    buttonDecline: {
        backgroundColor: "red",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeader: {
        color: Colors.global.textYellow,
        marginBottom: 15,
        fontSize: 40,
        fontFamily: "odibee-sans",
        textAlign: "center"
    },
    modalDetailsText: {
        color: Colors.global.textYellow,
        marginBottom: 15,
        fontSize: 30,
        fontFamily: "odibee-sans",
        textAlign: "center"
    },
    modalHeaderDefeat: {
        color: 'red',
        marginBottom: 15,
        fontSize: 40,
        fontFamily: "odibee-sans",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        color: Colors.global.goldenYellow,
        fontSize: 30,
        fontFamily: "odibee-sans",
        textAlign: "center"
    }
});

