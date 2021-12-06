import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button, Dimensions,
    FlatList,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {PlayableStarship, RootTabScreenProps} from '../types';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
import Colors from "../constants/Colors";
import EnemyStarshipCard from "../components/Cards/EnemyStarshipCard";
import {addExp, handleMissionOutcome} from "../store/gameState";
import MissionModal from '../components/UI/Modal/MisisonModal';

export default function MissionScreen({ navigation }: RootTabScreenProps<'LandingTab'>) {
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
            setCombatActive(false)
        }, 3000);
    }
    const handleMissionSuccess = () => {
        dispatch(handleMissionOutcome(true))
        dispatch(addExp(300))
        setMissionSuccess(true)
        setMissionModalVisible(true)
    }
    const handleMissionFailure = () => {
        dispatch(handleMissionOutcome(false))
        dispatch(addExp(150))
        setMissionSuccess(false)
        setMissionModalVisible(true)
    }
    const handleCloseModal = () => {
        setMissionModalVisible(false)
    }
    const updateSelectedStarship = (starShip: PlayableStarship) => {
        //dispatch(changePlayerShipId(starShip))
        setSelectedStarship(starShip);
    }

    return (
        <SafeAreaView style={{flex: 1,}}>
            <ImageBackground style={ styles.container } source={require('../assets/images/background_missionScreen.jpg')}>
                <HeaderInfoStats />
                <View style={styles.combatContainer}>
                    {loading || combatActive ?
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
                            <Pressable style={styles.button} onPress={handlePressFight}>
                                <Text style={styles.headerText} >Fight!</Text>
                            </Pressable>
                        </View>
                    }

                </View>
                <View>
                    {missionModalVisible ? <MissionModal visible={missionModalVisible} missionSuccess={missionSuccess} expGain={"300"} onTapClose={handleCloseModal}/> : null}
                </View>
            </ImageBackground>
        </SafeAreaView>
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
        marginVertical: Dimensions.get('screen').height / 9,
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
        padding: 5,
        elevation: 2,
        backgroundColor: Colors.global.backgroundDarkGray,
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
    buttonClose: {
    backgroundColor: "#2196F3",
    },
    headerText: {
        fontSize: 40,
        fontFamily: "odibee-sans",
        color: Colors.global.textYellow,
        alignSelf: 'center',
        marginBottom: 50,
    }
});
