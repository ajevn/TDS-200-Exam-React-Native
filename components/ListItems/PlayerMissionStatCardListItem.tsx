import * as React from 'react';
import {Dimensions,StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import {useAppSelector} from "../../hooks/hooks";
interface PlayerStatCardListItemProps {
    item: any,
}
//Rendering list items for mission report list entries
export default function PlayerMissionStatCardListItem({item}: PlayerStatCardListItemProps) {
    return (
        <View style={styles.missionStack}>
            <View style={styles.textArea}>
                <Text style={styles.title}>{item.enemyShip?.name}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={item.didWin ? styles.titleWin : styles.titleLoss}>{item.didWin ? "Victory" : "Defeat"}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={item.didWin ? styles.titleWin : styles.titleLoss}>{item.didWin ? "+10.000" : "-10.000"}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.title}>{item.expGained}</Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.title}>{(item.winProbability * 100)}%</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    detailsContainer: {
        flex: 0.5,
        width: Dimensions.get('screen').width ,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    textArea:{
        width: Dimensions.get("screen").width / 5,
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    titleWin: {
        flex: 1,
        fontSize: 20,
        color: 'green',
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    titleLoss: {
        flex: 1,
        fontSize: 20,
        color: 'red',
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
