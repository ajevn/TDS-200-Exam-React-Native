import * as React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import {useAppSelector} from "../../hooks/hooks";
import {Mission} from "../../types";
import PlayerMissionStatCardListItem from "../ListItems/PlayerMissionStatCardListItem";

//A component rendering header categories in landingPage Mission Report subsection
export default function PlayerMissionStatisticsCard() {
    const playerMissions: Array<Mission> = useAppSelector((state) => state.gameState.playerStatistics.missions)
    return (
        <View style={styles.container}>
            <Text style={styles.greetingTextSecondary}>Mission Report</Text>
            <View style={styles.missionStackHeader}>
                <Text style={styles.fundText}>Opponent</Text>
                <Text style={styles.fundText}>Outcome</Text>
                <Text style={styles.fundText}>Funds Gained</Text>
                <Text style={styles.fundText}>Exp Gained</Text>
                <Text style={styles.fundText}>Win Chance</Text>
            </View>
            {playerMissions.length > 0 ?
                <FlatList
                    data={playerMissions}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key'+index}
                    renderItem={({item}) =>
                        <PlayerMissionStatCardListItem item={item}/>
                    }
                    />
                :
                null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: Dimensions.get('screen').width ,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    missionStack: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    missionStackHeader: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'flex-start',
    },
    greetingTextSecondary: {
        marginTop: 5,
        fontSize: 40,
        color: '#D76A03',
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    fundText: {
        fontSize: 20,
        color: Colors.global.textYellow,
        marginTop: 10,
        marginLeft: 10,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
});
