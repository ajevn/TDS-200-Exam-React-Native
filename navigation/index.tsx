import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { RootStackParamList, RootTabParamList } from '../types';
import CharacterSelectScreen from '../screens/CharacterSelectScreen';
import ShipSelectScreen from '../screens/ShipSelectScreen';
import LandingPageScreen from '../screens/LandingPageScreen';
import Colors from '../constants/Colors';
import GameModeSelect from '../screens/GameModeSelect';
import {tabBarIconSize} from "../constants/Variables";
import MissionScreen from "../screens/MissionScreen";
import ShipStoreScreen from '../screens/ShipStoreScreen';

export default function Navigation() {
  const gameIsActive = useAppSelector((state) => state.gameState.createdGame)

  return (
    <SafeAreaProvider>
      {gameIsActive == true ? 
        <RootNavigator /> 
      :
        <RootNewGameNavigator />
      }
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function RootNewGameNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={NewGameCreatorNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const GameCreationStack = createNativeStackNavigator();

function NewGameCreatorNavigator() {
  return (
    <GameCreationStack.Navigator>
      <GameCreationStack.Screen name="GameSelect" component={GameModeSelect} options={{headerShown: false}}/>
      <GameCreationStack.Screen name="CharacterSelect" component={CharacterSelectScreen} options={{headerShown: false}} />
      <GameCreationStack.Screen name="ShipSelect" component={ShipSelectScreen} options={{headerShown: false}} />
    </GameCreationStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="LandingTab"
      screenOptions={{
          tabBarActiveTintColor: Colors.global.textYellow,
          tabBarInactiveTintColor: Colors.global.lightGray,
          tabBarStyle: { backgroundColor: Colors.global.backgroundGray},
          headerShown: false
      }} >
        <BottomTab.Screen
            name="LandingTab"
            component={LandingPageScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({color}) => <FontAwesome name="home" color={color} size={tabBarIconSize}/>,
            }}
        />
        <BottomTab.Screen
            name="MissionTab"
            component={MissionScreen}
            options={{
                title: 'Missions',
                tabBarIcon: ({color}) => <FontAwesome name="list" color={color} size={tabBarIconSize}/>,
            }}
        />
        <BottomTab.Screen
            name="ShipStoreTab"
            component={ShipStoreScreen}
            options={{
                title: 'Store',
                tabBarIcon: ({color}) => <FontAwesome name="shopping-bag" color={color} size={tabBarIconSize}/>,
            }}
        />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
