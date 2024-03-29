import * as React from 'react';
import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { PlayableStarship } from '../types';
import Colors from "../constants/Colors";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import HeaderInfoStats from "../components/UI/HeaderInfo/HeaderInfoStats";
import { useEffect, useState } from 'react';
import PurchasableStarshipCard from '../components/Cards/PurchasableStarshipCard';
import SearchBar from "../components/UI/SearchBar/SearchBar";
import PurchaseStarshipModal from "../components/UI/Modal/PurchaseStarshipModal";
import {handlePlayerShipPurchase} from "../store/gameState";

//Main screen for ship store. Here the player will be able to purchase ships with higher hyperdrive rating after acquiring more funds from completing missions.
export default function ShipStoreScreen() {
    const dispatch = useAppDispatch();
    const playerShip = useAppSelector((state) => state.gameState.playerShip)

    //Setting different data source for flatList based on if user has an active search value or not.
    const [filteredDataSource, setFilteredDataSource] = useState();
    const [masterDataSource, setMasterDataSource] = useState();

    //Search value set from child SearchBar component. SearchActive state determines which data source will be used in flatList.
    const [search, setSearch] = useState<string>();
    const [searchActive, setSearchActive] = useState<boolean>(false);

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectedStarship, setSelectedStarship] = useState<PlayableStarship>();

    //Fetches all data, or if search is active sets the master data source to the filtered results.
    useEffect(() => {
        if(!searchActive){
            getAllStarship();
        } else {
            setMasterDataSource(filteredDataSource)
        }
    }, [filteredDataSource, searchActive]);

    //Sort available ships based on if the user already uses this ship, else it sorts ship cost in credits.
    const sortOutputList = (unsorted: Array<PlayableStarship>) => {
        // @ts-ignore
        const sorted = unsorted.sort((a, b) => parseInt(a.cost_in_credits) - parseInt(b.cost_in_credits));
        return sorted.filter(item => item.name != playerShip!.name)
    }
    async function getAllStarship() {
        setLoading(true);
        const response = await fetch('https://swapi.dev/api/starships/')
        const body = await response.json()

        let sorted:any = sortOutputList(body.results)
        setMasterDataSource(sorted)
        setLoading(false);
    }
    //Handles search
    const handleSearch = async(searchCriteria: any) => {
        setLoading(true);
        setSearchActive(true)
        setSearch(searchCriteria)

        const response = await fetch('https://swapi.dev/api/starships/?search=' + searchCriteria)
        const body = await response.json()

        let sorted:any = sortOutputList(body.results)
        setFilteredDataSource(sorted)
        setLoading(false);
    }
    //Handles changes if player activates search bar
    const handleSearchToggle = (status: boolean) => {
        if(status){
            setSearchActive(true)
        } else if (!status){
            setSearchActive(false)
            setSearch("")
        }
    }
    const updateSelectedStarship = (starShip: PlayableStarship) => {
        setSelectedStarship(starShip);
        setModalActive(true)
    }
    //Method is called if player accepts modal after clicking a ship purchase button
    const handleTransactionConfirm = (status: boolean) => {
        if(status){
            if(selectedStarship){
                dispatch(handlePlayerShipPurchase(selectedStarship));
            }
            setModalActive(false)
        } else {
            setModalActive(false)
        }
    }

    return (
    <ImageBackground style={ styles.container } source={require('../assets/images/background_store2.jpg')}>
        <SafeAreaView style={{flex: 1,}}>
        <HeaderInfoStats />
        <Text style={styles.greetingText}>Intergalactic</Text>
        <Text style={styles.greetingText}>Starship Dealership</Text>
            <View style={styles.storeContainer}>
                <SearchBar
                    searchValue={search}
                    setSearchValue={handleSearch}
                    setSearchActive={handleSearchToggle}
                />
                {loading ?
                        <View style={[styles.spinnerContainer, styles.spinnerHorizontal]}>
                            <ActivityIndicator size="large" animating={true} color={Colors.global.textYellow} />
                        </View>
                        :
                        <View>
                            <FlatList
                                data={masterDataSource}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.url}
                                renderItem={({item}) =>
                                    <PurchasableStarshipCard
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
                        </View>
                    }
                  {selectedStarship ?
                      <PurchaseStarshipModal title={"Order"} shipName={selectedStarship!.name} purchaseAmount={selectedStarship!.costInCredits} handleTapConfirmation={handleTransactionConfirm} visible={modalActive}/>
                      :
                      <View/>
                  }
              </View>
        </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    storeContainer: {
        flex: 1,
        marginTop: 10,
    },
    title: {
        fontSize: 30,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    greetingText: {
        marginTop: 5,
        fontSize: 40,
        color: Colors.global.textYellow,
        fontFamily: "odibee-sans",
        alignSelf: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
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
    headerText: {
        fontSize: 40,
        fontFamily: "odibee-sans",
        color: Colors.global.textYellow,
        alignSelf: 'center',
    }
});
