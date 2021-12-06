import React from 'react'
import {ImageBackground, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import Colors from '../constants/Colors'
import { useAppSelector } from '../hooks/hooks'

const GameModeSelect = ({ navigation }: any ) => {
    const gameIsActive = useAppSelector((state) => state.gameState.createdGame)
    let backgroundImage = '../assets/images/star_background.jpg'

    const onPress = () => {
        navigation.navigate('CharacterSelect');
    };

    return (
        <View style={styles.container}>
          <ImageBackground source={require(backgroundImage)} resizeMode="cover" style={styles.backgroundImage}>
            <TouchableHighlight onPress={onPress}>
              <View style={styles.button}>
                <Text style={styles.text}>New Game</Text>
              </View>
            </TouchableHighlight>
            {gameIsActive == true ? 
                <TouchableHighlight onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.text}>Continue</Text>
                </View>
                </TouchableHighlight>
                :
                <View />
            }
          </ImageBackground>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: Colors.global.backgroundGray,
    },
    button: {
      alignItems: "center",
      backgroundColor: Colors.global.textYellow,
      paddingHorizontal: 100,
      padding: 10,
      marginBottom: 20,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      fontSize: 20,
    }
  });

export default GameModeSelect;
