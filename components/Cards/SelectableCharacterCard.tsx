import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import {PlayableCharacter} from "../../types";

interface SelectableICharacterProps{
    category: string;
    selectedCharacterProp: PlayableCharacter | undefined,
    updateSelectedCharacter: Function,
    id: string;
    name: string,
    gender: string,
    height: string,
}
//Selectable characters player can choose. Need to be a subset of available characters to allow for linking with portrait image locally. This is because API does not have image resources for characters.
const SelectableCharacterCard = ({category, selectedCharacterProp, updateSelectedCharacter, id, name, gender, height} : SelectableICharacterProps) => {
    //Need to require all images at runtime to allow for dynamic image selection based on character ID as dynamic import is not possible
    const fetchImageUrl = () => {
        switch(id){
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
    let portraitImage = fetchImageUrl();
    const handleClick = () => {
        const newCharacter: PlayableCharacter = {
            id: id,
            category: category,
            name: name,
            height: height,
            gender: gender,
        }
        updateSelectedCharacter(newCharacter)
    }
    return (
        <View style={ selectedCharacterProp && selectedCharacterProp.id == id ? styles.containerSelected : styles.container } onTouchEnd={handleClick}>
            <View style={styles.portraitImage}>
                {portraitImage}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>Height: {height}</Text>
                <Text style={styles.text}>Gender: {gender}</Text>
            </View>
        </View>
    )
}

export default SelectableCharacterCard

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
