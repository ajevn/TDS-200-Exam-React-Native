import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type PlayableCharacter = {
  id: string,
  category: string,
  name: string,
  height: string,
  gender: string,
}

export type PlayerStatistics = {
  numberOfMissions: number,
  missions: Array<Mission>,
}
export type Mission = {
  enemyShip: string,
  winProbability: number,
  expGained: number,
  didWin: boolean,
}

export type PlayableStarship = {
  id: string,
  category: string,
  name: string,
  model: string,
  costInCredits: string,
  crew: string,
  hyperdriveRating: string,
  starshipClass: string,
  pilots: Array<string>,
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type NewGameStackParamList = {
  CharacterID: undefined;
  ShipID: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  LandingTab: undefined;
  MissionTab: undefined;
  ShipStoreTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
