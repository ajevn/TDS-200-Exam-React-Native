import React, { useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions} from "react-native";
import Colors from "../../../constants/Colors";

interface MissionModalProps{
    missionSuccess: boolean,
    expGain: string,
    visible: boolean,
    onTapClose: Function,
}

export default function MissionModal({missionSuccess, expGain, visible, onTapClose}: MissionModalProps) {
  const handleTapClose = () => {
      onTapClose()
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          handleTapClose()
        }}
      >
        <View style={styles.centeredView}>
          {missionSuccess ? 
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderVictory}>Victory!</Text>
            <Text style={styles.modalText}>+300 EXP</Text>
            <Text style={styles.modalText}>+10000 Dollar</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleTapClose}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
          :
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderDefeat}>Defeat...</Text>
            <Text style={styles.modalText}>+150 EXP</Text>
            <Text style={styles.modalText}>-10000 Dollar</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleTapClose}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        }
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
    marginTop: Dimensions.get('screen').height / 5,
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
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeaderVictory: {
    color: 'green',
    marginBottom: 15,
    fontSize: 40,
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

