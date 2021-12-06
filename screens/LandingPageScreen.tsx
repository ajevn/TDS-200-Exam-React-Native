import * as React from 'react';
import {Animated, Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import { RootTabScreenProps } from '../types';
import {useRef} from "react";
import Colors from "../constants/Colors";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import CharacterInfoCard from "../components/Cards/CharacterInfoCard";
import {addExp, changePlayerCharacter} from "../store/gameState";
import ShipInfoCard from "../components/Cards/ShipInfoCard";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
export default function LandingPageScreen({ navigation }: RootTabScreenProps<'LandingTab'>) {
    const screen = Dimensions.get("screen")
    const playerCharacter = useAppSelector((state) => state.gameState.playerCharacter)
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    const playerLevel = useAppSelector((state) => state.gameState.playerLevel)

    return (
        <SafeAreaView style={{flex: 1,}}>
            <ImageBackground style={ styles.container } source={require('../assets/images/background_landingPage.jpg')}>
              <HeaderInfoStats />
              <Text style={styles.greetingText}>Greetings {playerCharacter!.name}</Text>
              <ShipInfoCard />
            </ImageBackground>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    title: {
    fontSize: 30,
      color: Colors.global.textYellow,
      fontFamily: "odibee-sans",
      alignSelf: 'center',
    },
    greetingText: {
        marginTop: 5,
        fontSize: 40,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },


});
