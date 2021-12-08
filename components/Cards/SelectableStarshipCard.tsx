import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import {PlayableStarship} from "../../types";

interface SelectableStarshipProps{
    id: string,
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
//Selectable starships player can choose. Need to be a subset of available starships to allow for linking with portrait image locally. This is because API does not have image resources for starships.
const SelectableStarshipCard = ({category, selectedStarship, changeSelectedStarship, id, name, model, costInCredits, crew, hyperdriveRating, starshipClass, pilots} : SelectableStarshipProps) => {
    //Need to require all images at runtime to allow for dynamic image selection based on character ID as dynamic import is not possible
    const fetchImageUrl = () => {
        switch(id){
            case "10":
                return <Image style={styles.portraitImage} source={require('../../assets/images/starship_10_portrait.jpeg')} />
            case "11":
                return <Image style={styles.portraitImage} source={require('../../assets/images/starship_11_portrait.jpeg')} />
        }
    }
    let portraitImage = fetchImageUrl();

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
    return (
        <View style={ selectedStarship && selectedStarship.id == id ? styles.containerSelected : styles.container } onTouchEnd={handleClick}>
            <View style={styles.portraitImage}>
                {portraitImage}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>Class: {starshipClass}</Text>
                <Text style={styles.text}>HyperRating: {hyperdriveRating}</Text>
            </View>
        </View>
    )
}

export default SelectableStarshipCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        marginHorizontal: 100,
        alignContent: 'center',
    },
    containerSelected: {
        flex: 1,
        marginBottom: 60,
        marginHorizontal: 100,
        alignContent: 'center',
        backgroundColor: Colors.global.lightGray,
    },
    detailsContainer: {
        alignContent: 'center',
        marginBottom: 20,
    },
    portraitImage: {
        flex: 1,
        marginTop: 10,
        width: 150,
        height: 150,
        borderRadius: 20,
        alignSelf: 'center',
    },
    text: {
        marginTop: 5,
        fontSize: 20,
        color: Colors.global.textYellow,
        alignSelf: 'center',
    },
})
