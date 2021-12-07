import * as React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text} from 'react-native';
import {RootTabScreenProps} from '../types';
import Colors from "../constants/Colors";
import {useAppSelector} from "../hooks/hooks";
import ShipInfoCard from "../components/Cards/ShipInfoCard";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
import PlayerStatisticsCard from "../components/Cards/PlayerStatisticsCard";
export default function LandingPageScreen({ navigation }: RootTabScreenProps<'LandingTab'>) {
    const playerCharacter = useAppSelector((state) => state.gameState.playerCharacter)

    return (
        <ImageBackground style={ styles.container } source={require('../assets/images/background_landingPage.jpg')}>
            <SafeAreaView style={{flex: 1,}}>
                <HeaderInfoStats />
                <Text style={styles.greetingText}>Greetings {playerCharacter!.name}</Text>
                <ShipInfoCard />
                <PlayerStatisticsCard />
            </SafeAreaView>
        </ImageBackground>
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
