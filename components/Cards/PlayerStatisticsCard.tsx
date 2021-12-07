import * as React from 'react';
import {Dimensions,StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import {useAppSelector} from "../../hooks/hooks";
import {Mission} from "../../types";

export default function PlayerStatisticsCard() {
    const playerMissions: Array<Mission> = useAppSelector((state) => state.gameState.playerStatistics.missions)

    return (
        <View style={styles.detailsContainer}>
            <View style={styles.levelContainer}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    levelContainer: {
        flex: 1,
        alignSelf: "center",
    },
    detailsContainer: {
        flex: 0.2,
        flexDirection: "row",
        alignContent: 'center',
        marginBottom: 20,
        width: Dimensions.get('screen').width - 20,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    title: {
        fontSize: 40,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    fundText: {
        fontSize: 20,
        color: Colors.global.textYellow,
        marginTop: 10,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
});
