import * as React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import {useAppSelector} from "../hooks/hooks";
import ShipInfoCard from "../components/Cards/ShipInfoCard";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
import PlayerMissionStatisticsCard from "../components/Cards/PlayerMissionStatisticsCard";
import PlayerBaseStatisticsCard from "../components/Cards/PlayerBaseStatisticsCard";
import {Mission} from "../types";

//Main landing page screen. Showing player character progress, as well as selected ship.
//After completing missions, these will be listed in a mission report section, listing player statistics.
export default function LandingPageScreen() {
    const playerCharacter = useAppSelector((state) => state.gameState.playerCharacter)
    const playerMissions: Array<Mission> = useAppSelector((state) => state.gameState.playerStatistics.missions)
    return (
        <ImageBackground style={ styles.container } source={require('../assets/images/background_landingPage.jpg')}>
            <SafeAreaView style={{flex: 1,}}>
                <HeaderInfoStats />
                <Text style={styles.greetingText}>Greetings {playerCharacter!.name}</Text>
                <ShipInfoCard />
                {playerMissions.length > 0 ?
                    <View style={{flex: 1,}}>
                        <PlayerMissionStatisticsCard />
                        <PlayerBaseStatisticsCard />
                    </View>
                    :
                    null
                }
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
