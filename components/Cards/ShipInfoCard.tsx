import * as React from 'react';
import {Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {useAppSelector} from "../../hooks/hooks";

export default function ShipInfoCard() {
    const screen = Dimensions.get("screen")
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    const playerShipPowerLevel = useAppSelector((state) => state.gameState.playerShipPower)

    const fetchShipImageUrl = () => {
        switch(playerShip!.id){
            case "10":
                return <Image style={styles.portraitImage} source={require('../../assets/images/starship_10_portrait.jpeg')} />
            case "11":
                return <Image style={styles.portraitImage} source={require('../../assets/images/starship_11_portrait.jpeg')} />
        }
    }

    let shipPortraitImage = fetchShipImageUrl();

    return (
        <View style={styles.detailsContainer}>
            {shipPortraitImage}
            <View style={styles.levelContainer}>
                <Text style={styles.title}>{playerShip!.name}</Text>
                <Text style={styles.text}>Power: {playerShipPowerLevel}</Text>
                <ProgressBar style={styles.progressBar} progress={playerShipPowerLevel / 1000} width={150}  color={Colors.global.teal} unfilledColor={Colors.global.backgroundGray} />
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
        marginTop: 2,
    },
    title: {
        fontSize: 25,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
});
