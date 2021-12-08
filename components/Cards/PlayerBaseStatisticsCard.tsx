import * as React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import {useAppSelector} from "../../hooks/hooks";
import {Mission} from "../../types";
import {getPlayerStats} from "../../store/gameState";

export default function PlayerBaseStatisticsCard() {
    const playerMissions: Array<Mission> = useAppSelector((state) => state.gameState.playerStatistics.missions)
    const playerStats = useAppSelector((state) => getPlayerStats(state));
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.missionStackHeader}>
                <Text style={styles.fundText}>Win Ratio</Text>
                <Text style={styles.fundText}>Total Funds Gained</Text>
                <Text style={styles.fundText}>Total Exp Gained</Text>
            </View>
            {playerMissions.length > 0 ?
                <View style={styles.missionStack}>
                    <View >
                        <Text style={styles.title}>{((playerStats.totalWins / playerMissions.length) * 100).toFixed(0)}%</Text>
                    </View>
                    <View >
                        <Text style={styles.title}>{(playerStats.totalFunds).toLocaleString()}</Text>
                    </View>
                    <View >
                        <Text style={styles.title}>{playerStats.totalExp}</Text>
                    </View>
                </View>
                :
                null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    missionStack: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 5,
    },
    missionStackHeader: {
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailsContainer: {
        flex: 0.5,
        height: 20,
        justifyContent: "flex-start",
        width: Dimensions.get('screen').width ,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderTopWidth: 3,
        borderStyle: "solid",
        borderTopColor: Colors.global.backgroundDarkGray,
        elevation: 1,
        shadowColor: "#000000",
    },
    title: {
        flex: 0.8,
        fontSize: 25,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    fundText: {
        fontSize: 20,
        color: Colors.global.textYellow,
        marginLeft: 10,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
});
