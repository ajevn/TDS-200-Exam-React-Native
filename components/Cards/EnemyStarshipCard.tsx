import React, {useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import {PlayableStarship} from "../../types";
import {useAppSelector} from "../../hooks/hooks";

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

const EnemyStarshipCard = ({category, selectedStarship, changeSelectedStarship, url, name, model, costInCredits, crew, hyperdriveRating, starshipClass, pilots} : EnemyStarshipProps) => {

    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    let winProbability = "";

    const urlArray = url.split("/")
    const id = urlArray[urlArray.length-2]
    const handleClick = () => {
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

    const calculateWinProbability = () => {
        const percentage = (parseFloat(playerShip!.hyperdriveRating) / parseFloat(hyperdriveRating))
        winProbability = (percentage * 100).toString() + "%"
    }
    calculateWinProbability()

    const getPercentageWinStyle = () => {
        const probabilityParsed = parseInt(winProbability)
        if(probabilityParsed >= 75) {
            return {
                color: "green"
            }
        } else if(probabilityParsed >= 35 && probabilityParsed < 75) {
            return {
                color: "orange"
            }
        } else {
            return {
                color: "red"
            }
        }
    }
    return (
        <View style={ selectedStarship && selectedStarship.id == id ? styles.containerSelected : styles.container } onTouchEnd={handleClick}>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>Class: {starshipClass}</Text>
                <Text style={styles.text}>HyperRating: {hyperdriveRating}</Text>
                <Text style={[getPercentageWinStyle(), styles.percentageWinText]}>Chance of victory: {winProbability}</Text>
            </View>
        </View>
    )
}

export default EnemyStarshipCard

const styles = StyleSheet.create({
    container: {
        marginBottom: 60,
        marginHorizontal: 30,
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderColor: Colors.global.backgroundDarkGray,
        borderRadius: 5,
        elevation: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    containerSelected: {
        flex: 1,
        marginBottom: 60,
        marginHorizontal: 30,
        alignContent: 'center',
        backgroundColor: 'rgba(34,38,41, 0.8)',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: Colors.global.backgroundDarkGray,
        borderRadius: 2,
        elevation: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    detailsContainer: {
        alignContent: 'center',
        marginBottom: 20,
    },
    text: {
        marginTop: 5,
        fontSize: 20,
        color: Colors.global.textYellow,
        alignSelf: 'center',
    },
    percentageWinText: {
        marginTop: 5,
        fontSize: 20,
        alignSelf: 'center',
    },
})
