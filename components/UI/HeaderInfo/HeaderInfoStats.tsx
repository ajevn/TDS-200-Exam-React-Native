import * as React from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Colors from "../../../constants/Colors";
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {useAppSelector} from "../../../hooks/hooks";
import {tabBarIconSize} from "../../../constants/Variables";
import {FontAwesome} from "@expo/vector-icons";

export default function HeaderInfoStats() {
    const playerCharacter = useAppSelector((state) => state.gameState.playerCharacter)
    const playerLevel = useAppSelector((state) => state.gameState.playerLevel)
    const playerExp = useAppSelector((state) => state.gameState.playerExp)
    const playerFunds = useAppSelector((state) => state.gameState.playerFunds)

    const fetchCharacterImageUrl = () => {
        switch(playerCharacter!.id){
            case "10":
                return <Image style={styles.portraitImage} source={require('../../../assets/images/character_10_portrait.jpeg')} />
            case "11":
                return <Image style={styles.portraitImage} source={require('../../../assets/images/character_11_portrait.jpeg')} />

            case "14":
                return <Image style={styles.portraitImage} source={require('../../../assets/images/character_14_portrait.jpeg')} />
            case "20":
                return <Image style={styles.portraitImage} source={require('../../../assets/images/character_20_portrait.jpeg')} />
        }
    }

    let characterPortraitImage = fetchCharacterImageUrl();
    return (
        <ImageBackground source={require('../../../assets/images/background_header3.jpg')} style={styles.containerBackground}>
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <View style={styles.levelContainer}>
                        <Text style={styles.title}>Level {playerLevel}</Text>
                        <ProgressBar style={styles.progressBar} progress={playerExp / 1000} width={100}  color={Colors.global.teal} unfilledColor={Colors.global.backgroundGray} />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    {characterPortraitImage}
                </View>
                <View style={styles.fundContainer}>
                    <Text style={styles.fundText}>
                        <FontAwesome name="dollar" style={styles.fundIcon} color={Colors.global.textYellow} size={tabBarIconSize}/>
                        {playerFunds.toLocaleString()}
                    </Text>
                </View>
            </View>
        </ImageBackground>

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
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    containerBackground: {
        width: Dimensions.get('screen').width,
    },
    fundContainer: {
        flex: 0.3,
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    imageContainer: {
      flex: 0.3,
        alignSelf: 'center',

    },
    detailsContainer: {
        flex: 0.3,
        alignSelf: "center",
        flexDirection: "row",
    },
    levelContainer: {
        flex: 0.6,
        alignSelf: "center",
    },
    fundText: {
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'flex-end',
    },
    fundIcon: {
      alignSelf: "flex-start",
    },
    progressBar: {
        alignSelf: "center",
    },
    portraitImage: {
        height: 60,
        width: 60,
        borderRadius: 100,
        marginLeft: 5,
        alignSelf: "center",
    },
    title: {
        fontSize: 25,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
});
