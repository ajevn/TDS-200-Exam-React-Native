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
//Rendering a dynamic combat animator, visualizing player vs opponent combat with Health bars where damage is randomly generated factoring in player chance to win to make more powerful enemies more difficult to beat.
export default function CombatAnimator({combatActive, missionFailure, missionSuccess, selectedStarship}: CombatAnimatorProps) {
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    const percentage = (parseFloat(playerShip!.hyperdriveRating) / parseFloat(selectedStarship!.hyperdriveRating))

    const [playerHp, setPlayerHp] = useState<number>(100);
    const [enemyHp, setEnemyHp] = useState<number>(100);
    //Changes state every 500ms causing re-render, which in turn causes useEffect to re-run damage calculation with timeout.
    useEffect(() => {
        if(enemyHp > 0.0 && playerHp > 0.0) {
            //Returns value between 0-1
            let randomNum = Math.random();
            //Checks if value is smaller than percentage -- Higher percentage chance will increase likelyhood of attack-move success, smaller will decrease
            //Percentage is calculated based on player ship hyperdrive rating compared to opponent.
            setTimeout(() => {
                //If randomNum is below percentage chance to win, player was successful and will attack enemy
                if(randomNum <= percentage){
                    //Random num randomizing number between 0-4 to allow for variation in attack move damage
                    let randomNum = Math.random() * 4;
                    setEnemyHp(enemyHp - (10 + randomNum))
                } else {
                    //If randomNum is above percentage chance to win, enemy was successful and will attack player
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
