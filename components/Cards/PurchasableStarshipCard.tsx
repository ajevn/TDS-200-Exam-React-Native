import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import {PlayableStarship} from "../../types";
import {useAppSelector} from "../../hooks/hooks";
import {FontAwesome} from "@expo/vector-icons";

interface EnemyStarshipProps{
    url: string,
    category: string,
    selectedStarship: PlayableStarship | undefined,
    changeSelectedStarship: Function,
    name: string,
    model: string,
    costInCredits: string,
    crew: string,
    hyperdriveRating: string,
    starshipClass: string,
    pilots: Array<string>,
}
//A card displaying purchasable starships in starship store.
const PurchasableStarshipCard = ({category, changeSelectedStarship, url, name, model, costInCredits, crew, hyperdriveRating, starshipClass, pilots} : EnemyStarshipProps) => {

    const playerBalance = useAppSelector((state) => state.gameState.playerFunds)
    const urlArray = url.split("/")
    const id = urlArray[urlArray.length-2]
    //Determines if buttons should be enabled/disabled if player balance is sufficient
    const canAfford = () => {
        const costParsed = parseInt(costInCredits)
        return playerBalance >= costParsed;
    }
    //Calls parent method for handling purchase, which in turn calls a method in redux provider to update state.
    const handlePurchase = () => {
        const newStarship: PlayableStarship = {
            id: id,
            category: category,
            name: name,
            model: model,
            costInCredits: costInCredits,
            crew: crew,
            hyperdriveRating: hyperdriveRating,
            starshipClass: starshipClass,
            pilots: pilots,
        }
        changeSelectedStarship(newStarship)
    }
    return (
        <View style={ styles.container }>
            <View style={styles.detailsContainer}>
                <View>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerRowText}>{name}</Text>
                        <Text style={styles.textPrice}>
                            <FontAwesome name="dollar" color={Colors.global.textYellow} size={25}/>
                            {costInCredits != "unknown" ? parseInt(costInCredits).toLocaleString() : " Unknown price"}
                        </Text>
                    </View>
                    <Text style={styles.text}>Class: {starshipClass}</Text>
                    <Text style={styles.text}>HyperRating: {hyperdriveRating}</Text>
                </View>
                <View>
                    <Pressable disabled={!canAfford()} onPress={handlePurchase} style={ canAfford() ? styles.button : styles.buttonDisabled }>
                        <Text style={styles.buttonText} >Purchase</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default PurchasableStarshipCard

const styles = StyleSheet.create({
    container: {
        marginBottom: 60,
        marginHorizontal: 60,
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: '#2D2D34',
        borderColor: Colors.global.backgroundDarkGray,
        borderRadius: 30,
        elevation: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    textPrice: {
        color: Colors.global.textYellow,
        paddingRight: 40,
        fontSize: 25,
        fontFamily: "odibee-sans",
        alignSelf: "flex-start",
    },
    headerRow: {
        alignSelf: 'flex-start',
    },
    headerRowText: {
        color: Colors.global.textYellow,
        paddingRight: 40,
        fontSize: 35,
        fontFamily: "odibee-sans",
        alignSelf: "flex-start",
    },
    detailsContainer: {
        alignContent: 'center',
    },
    button: {
        alignSelf: 'center',
        borderRadius: 20,
        padding: 5,
        marginTop: 15,
        elevation: 2,
        color: Colors.global.textYellow,
        backgroundColor: 'green',
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonDisabled: {
        alignSelf: 'center',
        borderRadius: 20,
        padding: 5,
        marginTop: 15,
        elevation: 2,
        color: 'black',
        backgroundColor: 'gray',
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    text: {
        marginTop: 5,
        fontSize: 20,
        color: Colors.global.textYellow,
        alignSelf: 'flex-start',
    },

})
