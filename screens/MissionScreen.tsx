import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Mission, PlayableStarship} from '../types';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
import Colors from "../constants/Colors";
import EnemyStarshipCard from "../components/Cards/EnemyStarshipCard";
import {addExp, addMissionToPlayerStats, handleMissionOutcome} from "../store/gameState";
import MissionModal from '../components/UI/Modal/MisisonModal';
import CombatAnimator from "../components/UI/CombatAnimator/CombatAnimator";

export default function MissionScreen() {
    const playerShip = useAppSelector((state) => state.gameState.playerShip)
    const dispatch = useAppDispatch();

    const [starshipList, setStarshipList] = useState();
    const [loading, setLoading] = useState<Boolean>(true);
    const [combatActive, setCombatActive] = useState<Boolean>(false);
    const [selectedStarship, setSelectedStarship] = useState<PlayableStarship>();
    const [missionModalVisible, setMissionModalVisible] = useState(false);
    const [missionSuccess, setMissionSuccess] = useState(false);

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
        setCombatActive(true)
    }
    const createMissionDetails = (expGain: number, didWin: boolean) => {
        const mission: Mission = {
            enemyShip: selectedStarship,
            expGained: expGain,
            winProbability: (parseFloat(playerShip!.hyperdriveRating) / parseFloat(selectedStarship!.hyperdriveRating)),
            didWin: didWin,
        }
        return mission;
    }
    const handleMissionSuccess = () => {
        setCombatActive(false)
        dispatch(handleMissionOutcome(true))
        dispatch(addExp(300))
        let missionStats = createMissionDetails(300, true)
        dispatch(addMissionToPlayerStats(missionStats))
        setMissionSuccess(true)
        setMissionModalVisible(true)
    }
    const handleMissionFailure = () => {
        setCombatActive(false)
        dispatch(handleMissionOutcome(false))
        dispatch(addExp(150))
        let missionStats = createMissionDetails(150, false)
        dispatch(addMissionToPlayerStats(missionStats))
        setMissionSuccess(false)
        setMissionModalVisible(true)
    }
    const handleCloseModal = () => {
        setMissionModalVisible(false)
    }
    const updateSelectedStarship = (starShip: PlayableStarship) => {
        setSelectedStarship(starShip);
    }

    return (
            <ImageBackground style={ styles.container } source={require('../assets/images/background_missionScreen.jpg')}>
                <SafeAreaView style={{flex: 1,}}>
                <HeaderInfoStats />
                <View style={styles.combatContainer}>
                    {loading ?
                        <View style={[styles.spinnerContainer, styles.spinnerHorizontal]}>
                            <ActivityIndicator size="large" animating={true} color={Colors.global.textYellow} />
                        </View>
                        :
                        <View>
                            <Text style={styles.headerText}>Select Opponent</Text>
                            <FlatList
                                data={starshipList}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.url}
                                renderItem={({item}) =>
                                    <EnemyStarshipCard
                                        url={item.url}
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
                            <Pressable disabled={!selectedStarship} style={styles.button} onPress={handlePressFight}>
                                <Text style={styles.buttonText} >Fight!</Text>
                            </Pressable>
                        </View>
                    }
                    {combatActive
                        ?
                        <CombatAnimator combatActive={setCombatActive} missionSuccess={handleMissionSuccess} missionFailure={handleMissionFailure} selectedStarship={selectedStarship}/>
                        :
                        null
                    }
                </View>
                <View>
                    {missionModalVisible ? <MissionModal visible={missionModalVisible} missionSuccess={missionSuccess} expGain={"300"} onTapClose={handleCloseModal}/> : null}
                </View>
                </SafeAreaView>
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
    combatContainer: {
        marginVertical: 10,
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
    button: {
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 2,
        backgroundColor: Colors.global.backgroundDarkGray,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonText: {
        fontSize: 30,
        fontFamily: "odibee-sans",
        color: Colors.global.textYellow,
        alignSelf: 'center',
    },
    headerText: {
        fontSize: 40,
        fontFamily: "odibee-sans",
        color: Colors.global.textYellow,
        alignSelf: 'center',
        marginBottom: 50,
    }
});
