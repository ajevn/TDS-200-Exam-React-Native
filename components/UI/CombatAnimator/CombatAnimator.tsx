import * as React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Colors from "../../../constants/Colors";
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {useEffect, useState} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import {PlayableStarship} from "../../../types";

interface CombatAnimatorProps {
    combatActive: Function,
    missionSuccess: Function,
    missionFailure: Function,
    selectedStarship: PlayableStarship | undefined,
}
export default function CombatAnimator({combatActive, missionFailure, missionSuccess, selectedStarship}: CombatAnimatorProps) {
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    const percentage = (parseFloat(playerShip!.hyperdriveRating) / parseFloat(selectedStarship!.hyperdriveRating))

    const [playerHp, setPlayerHp] = useState<number>(100);
    const [enemyHp, setEnemyHp] = useState<number>(100);

    useEffect(() => {
        if(enemyHp > 0.0 && playerHp > 0.0) {
            //Returns value between 0-1
            //Checks if value is smaller than percentage -- Higher percentage chance will increase likelyhood of mission success, smaller will decrease
            //Percentage is calculated based on ship hyperdrive rating.
            let randomNum = Math.random();
            setTimeout(() => {
                if(randomNum <= percentage){
                    let randomNum = Math.random() * 4;
                    setEnemyHp(enemyHp - (10 + randomNum))
                } else {
                    let randomNum = Math.random() * 4;
                    setPlayerHp(playerHp - (10 + randomNum))
                }
            }, 500);
        } else if(enemyHp <= 0.0){
            missionSuccess()
        } else {
            missionFailure()
        }
    }, [playerHp, enemyHp]);

    return (
        <View style={styles.container}>
            <View style={styles.fundContainer}>
                <View >
                    <Text style={styles.fundText}>You</Text>
                    <Text style={styles.fundText}>{playerHp > 0 ? (playerHp).toFixed(0) : 0}%</Text>
                    <ProgressBar style={styles.progressBar} progress={playerHp / 100} width={150}  color={Colors.global.teal} unfilledColor={Colors.global.backgroundGray} />
                </View>
            </View>
            <View style={styles.enemyContainer}>
                <View >
                    <Text style={styles.fundText}>Opponent</Text>
                    <Text style={styles.fundText}>{enemyHp > 0 ? (enemyHp).toFixed(0) : 0}%</Text>
                    <ProgressBar style={styles.progressBar} progress={enemyHp / 100} width={150}  color={'red'} unfilledColor={Colors.global.backgroundGray} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        flexDirection: "row",
        alignContent: 'center',
        height: 90,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        marginTop: 20,
    },
    fundContainer: {
        flex: 0.4,
        flexDirection: "column",
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    enemyContainer: {
        flex: 0.4,
        flexDirection: "column",
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    fundText: {
        fontSize: 30,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    progressBar: {
        alignSelf: "center",
    },
});
