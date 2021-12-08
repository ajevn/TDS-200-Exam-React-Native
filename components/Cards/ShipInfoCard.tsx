import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from "../../constants/Colors";
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import {useAppSelector} from "../../hooks/hooks";

//Component card rendering information about player ship, as well as hyperdrive rating
export default function ShipInfoCard() {
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    //Need to require all images at runtime to allow for dynamic image selection based on character ID as dynamic import is not possible
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
                <Text style={styles.text}>Hyperdrive Rating: {playerShip!.hyperdriveRating}</Text>
                <ProgressBar style={styles.progressBar} progress={parseFloat(playerShip!.hyperdriveRating) / 4.0} width={150}  color={Colors.global.teal} unfilledColor={Colors.global.backgroundGray} />
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
        flex: 0.3,
        flexDirection: "row",
        alignContent: 'center',
        marginHorizontal: 5,
        justifyContent: 'center',
        borderRadius: 20,
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
