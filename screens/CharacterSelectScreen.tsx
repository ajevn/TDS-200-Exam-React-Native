import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import SelectableCharacterCard from '../components/Cards/SelectableCharacterCard'
import Colors from '../constants/Colors'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { changePlayerCharacter } from '../store/gameState'
import {PlayableCharacter} from '../types'

//Main screen for selecting player character
const CharacterSelectScreen = ({ navigation }: any ) => {
    const availableCharacterIds = useAppSelector((state) => state.gameState.availableCharacterIds)
    const dispatch = useAppDispatch();

    const [characterList, setCharacterList] = useState<PlayableCharacter[]>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectedCharacter, setSelectedPlayer] = useState<PlayableCharacter>();

    //Fetching character info of the characters the player can select in availableCharacterIds. Only offering 4 playable characters as these need
    //local portrait images which are not offered by API.
    useEffect(() => {
        getAllCharacters();
    }, []);
    const getAllCharacters = async() => {
        setLoading(true);
        let results: PlayableCharacter[] = [];
            for(let id of availableCharacterIds){
                const response = await fetch('https://swapi.dev/api/people/' + id + '/')
                const body = await response.json()
                let character: PlayableCharacter = {
                    id: id,
                    category: 'people',
                    name: body.name,
                    height: body.height,
                    gender: body.gender,
                }
                results.push(character)
            }
        setCharacterList(results)
        setLoading(false);
    }

    const handlePressNext = () => {
        navigation.navigate('ShipSelect');
    }
    //Dispatching selected character to redux state.
    const updateSelectedCharacter = (character: PlayableCharacter) => {
        dispatch(changePlayerCharacter(character))
        setSelectedPlayer(character);
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1,}}>
                <Text style={styles.headerText}>Choose your character</Text>
                {loading ?
                    <View style={[styles.spinnerContainer, styles.spinnerHorizontal]}>
                        <ActivityIndicator size="large" animating={true} color={Colors.global.textYellow} />
                    </View>
                    :
                    <FlatList
                    data={characterList}
                    renderItem={({item}) => <SelectableCharacterCard id={item.id} selectedCharacterProp={selectedCharacter} updateSelectedCharacter={updateSelectedCharacter} category={'people'} name={item.name} height={item.height} gender={item.gender} />}
                    />
                }
                {
                    selectedCharacter != null ?
                    <Button title={'Next'} onPress={handlePressNext} disabled={false}/>
                    :
                    <Button title={'Next'} onPress={handlePressNext} disabled={true}/>
                }
            </SafeAreaView>
        </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 0,
      paddingVertical: 50,
      backgroundColor: Colors.global.backgroundGray,
    },
      spinnerContainer: {
          flex: 1,
          justifyContent: "center"
      },
      spinnerHorizontal: {
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10
      },
    text: {
      fontSize: 20,
    },
    headerText: {
        fontSize: 40,
        color: Colors.global.textYellow,
        alignSelf: 'center',
    }
  });

export default CharacterSelectScreen;
