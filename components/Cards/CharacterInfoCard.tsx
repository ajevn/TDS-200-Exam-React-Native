import * as React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {useAppSelector} from "../../hooks/hooks";

export default function CharacterInfoCard() {
    const playerCharacter = useAppSelector((state) => state.gameState.playerCharacter)
    const playerLevel = useAppSelector((state) => state.gameState.playerLevel)
    const playerExp = useAppSelector((state) => state.gameState.playerExp)
    const playerFunds = useAppSelector((state) => state.gameState.playerFunds)

    const fetchCharacterImageUrl = () => {
        switch(playerCharacter!.id){
            case "10":
                return <Image style={styles.portraitImage} source={require('../../assets/images/character_10_portrait.jpeg')} />
            case "11":
                return <Image style={styles.portraitImage} source={require('../../assets/images/character_11_portrait.jpeg')} />

            case "14":
                return <Image style={styles.portraitImage} source={require('../../assets/images/character_14_portrait.jpeg')} />
            case "20":
                return <Image style={styles.portraitImage} source={require('../../assets/images/character_20_portrait.jpeg')} />
        }
    }
    let characterPortraitImage = fetchCharacterImageUrl();
    return (
        <View style={styles.detailsContainer}>
            {characterPortraitImage}
            <View style={styles.levelContainer}>
                <Text style={styles.title}>Level {playerLevel}</Text>
                <ProgressBar style={styles.progressBar} progress={playerExp / 1000} width={150}  color={Colors.global.teal} unfilledColor={Colors.global.backgroundGray} />
                <Text style={styles.fundText}>Balance: {playerFunds}</Text>
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
    portraitImage: {
        flex: 0.6,
        width: 40,
        height: 70,
        borderRadius: 20,
        marginLeft: 30,
        alignSelf: "center",
    },
    progressBar: {
        alignSelf: "center",
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
