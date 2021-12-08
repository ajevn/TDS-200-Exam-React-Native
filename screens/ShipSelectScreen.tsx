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
import SelectableStarshipCard from '../components/Cards/SelectableStarshipCard'
import Colors from '../constants/Colors'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { changePlayerShip, setCreatedGame } from '../store/gameState'
import { PlayableStarship } from '../types'

//Main screen for selecting player ship
const ShipSelectScreen = () => {
    const availableShipIds = useAppSelector((state) => state.gameState.availableShipIds)
    const dispatch = useAppDispatch();

    const [starshipList, setStarshipList] = useState<PlayableStarship[]>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectedStarship, setSelectedStarship] = useState<PlayableStarship>();

    useEffect(() => {
        getAllStarship();
    }, []);
    //Fetching ship info of the ships the player can select in availableShipIds. Only offering 2 playable starships as these need
    //local portrait images which are not offered by API.
    async function getAllStarship() {
        setLoading(true);
        let results: PlayableStarship[] = [];
            for(let id of availableShipIds){
                const response = await fetch('https://swapi.dev/api/starships/' + id + '/')
                const body = await response.json()
                let starship: PlayableStarship = {
                    id: id,
                    category: 'starships',
                    name: body.name,
                    model: body.model,
                    costInCredits: body.cost_in_credits,
                    crew: body.crew,
                    hyperdriveRating: body.hyperdrive_rating,
                    starshipClass: body.starship_class,
                    pilots: body.pilots,
                }
                results.push(starship)
            }
        setStarshipList(results)
        setLoading(false);
    }
    const handlePressFinish = () => {
        dispatch(setCreatedGame(true))
    }
    const updateSelectedStarship = (starShip: PlayableStarship) => {
        dispatch(changePlayerShip(starShip))
        setSelectedStarship(starShip);
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1,}}>
                <Text style={styles.headerText}>Choose your ship</Text>
                {loading ?
                    <View style={[styles.spinnerContainer, styles.spinnerHorizontal]}>
                        <ActivityIndicator size="large" animating={true} color={Colors.global.textYellow} />
                    </View>
                    :
                    <FlatList
                    data={starshipList}
                    renderItem={({item}) => <SelectableStarshipCard id={item.id}
                    category={item.category}
                    selectedStarship={selectedStarship}
                    changeSelectedStarship={updateSelectedStarship}
                    name={item.name}
                    model={item.model}
                    costInCredits={item.costInCredits}
                    crew={item.crew}
                    hyperdriveRating={item.hyperdriveRating}
                    starshipClass={item.starshipClass}
                    pilots={item.pilots}
                    />}
                    />
                }
                <Button title={'Finish'} onPress={handlePressFinish}/>
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

export default ShipSelectScreen;
