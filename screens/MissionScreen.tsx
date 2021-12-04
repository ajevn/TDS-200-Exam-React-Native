import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';

import {PlayableStarship, RootTabScreenProps} from '../types';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
import Colors from "../constants/Colors";
import EnemyStarshipCard from "../components/Cards/EnemyStarshipCard";
import {addExp, handleMissionOutcome} from "../store/gameState";

export default function MissionScreen({ navigation }: RootTabScreenProps<'LandingTab'>) {
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    const dispatch = useAppDispatch();

    const [starshipList, setStarshipList] = useState();
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectedStarship, setSelectedStarship] = useState<PlayableStarship>();

    useEffect(() => {
        getAllStarship();
    }, []);

    async function getAllStarship() {
        setLoading(true);
        const response = await fetch('https://swapi.dev/api/starships/')
        const body = await response.json()
        setStarshipList(body.results)
        setLoading(false);
    }

    const handlePressFight = () => {
        setLoading(true)
        const percentage = (parseFloat(playerShip!.hyperdriveRating) / parseFloat(selectedStarship!.hyperdriveRating))
        //Returns value between 0-1
        let randomNum = Math.random();
        //Checks if value is smaller than percentage -- Higher percentage chance will increase likelyhood of mission success, smaller will decrease
        //Percentage is calculated based on ship hyperdrive rating.
        setTimeout(() => {
            if(randomNum <= percentage){
                handleMissionSuccess()
            } else {
                handleMissionFailure()
            }
            setLoading(false)
        }, 3000);
    }
    const handleMissionSuccess = () => {
        dispatch(handleMissionOutcome(true))
        dispatch(addExp(300))
    }
    const handleMissionFailure = () => {
        dispatch(handleMissionOutcome(false))
        dispatch(addExp(150))
    }

    const updateSelectedStarship = (starShip: PlayableStarship) => {
        //dispatch(changePlayerShipId(starShip))
        setSelectedStarship(starShip);
    }

    return (
        <ImageBackground style={ styles.container } source={require('../assets/images/background_missionScreen.jpg')}>
            <HeaderInfoStats />
            <View>
                <Text style={styles.headerText}>Select Opponent</Text>
                {loading ?
                    <View style={[styles.spinnerContainer, styles.spinnerHorizontal]}>
                        <ActivityIndicator size="large" animating={true} color={Colors.global.textYellow} />
                    </View>
                    :
                    <FlatList
                        data={starshipList}
                        horizontal={true}
                        keyExtractor={(item) => item.url}
                        renderItem={({item}) => <EnemyStarshipCard url={item.url}
                                                                    category={item.category}
                                                                    selectedStarship={selectedStarship}
                                                                    changeSelectedStarship={updateSelectedStarship}
                                                                    name={item.name}
                                                                    model={item.model}
                                                                    costInCredits={item.cost_in_credits}
                                                                    crew={item.crew}
                                                                    hyperdriveRating={item.hyperdrive_rating}
                                                                    starshipClass={item.starship_class}
                                                                    pilots={item.pilots}
                        />}
                    />
                }
                <Button title={'Fight!'} onPress={handlePressFight}/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontFamily: "odibee-sans",
    },
    headerText: {
        fontSize: 40,
        fontFamily: "odibee-sans",
        color: Colors.global.textYellow,
        alignSelf: 'center',
    }
});
