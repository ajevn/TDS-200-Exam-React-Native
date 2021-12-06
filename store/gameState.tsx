import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {PlayableCharacter, PlayableStarship} from "../types";
import {levelRequiredExp} from "../constants/Variables"

const defaultCharacter: PlayableCharacter = {
    id: "10",
    category: "people",
    name: "Obi-Wan Kenobi",
    height: "182",
    gender: "male",
}
const defaultShip: PlayableStarship = {
    id: "10",
    category: "starships",
    name: "Millennium Falcon",
    model: "YT-1300 light freighter",
    costInCredits: "100000",
    crew: "4",
    hyperdriveRating: "0.5",
    starshipClass: "Light Freighter",
    pilots: [
        "https://swapi.dev/api/people/13/",
        "https://swapi.dev/api/people/14/",
        "https://swapi.dev/api/people/25/",
        "https://swapi.dev/api/people/31/",
    ],
}

interface GameState {
    createdGame: boolean,
    availableCharacterIds: ["10", "11", "14", "20"],
    availableShipIds: ["10", "11"],
    playerCharacter: PlayableCharacter | null,
    playerShip: PlayableStarship | null,
    playerFunds: number,
    playerLevel: number,
    playerExp: number,
}

const initialState: GameState = {
    createdGame: true,
    availableCharacterIds: ["10", "11", "14", "20"],
    availableShipIds: ["10", "11"],
    playerCharacter: defaultCharacter,
    playerShip: defaultShip,
    playerFunds: 100000,
    playerLevel: 1,
    playerExp: 0,
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changePlayerCharacter: (state, action: PayloadAction<PlayableCharacter>) => {
      state.playerCharacter = action.payload
    },
    changePlayerShip: (state, action: PayloadAction<PlayableStarship>) => {
        state.playerShip = action.payload
    },
  addExp: (state, action: PayloadAction<number>) => {
      let currentExp = state.playerExp;
      const diffToNewLevel = levelRequiredExp - currentExp;
        //Handle level up
      if(action.payload > diffToNewLevel){
          const overflowAmount = currentExp - levelRequiredExp;
          state.playerLevel++
          state.playerExp = overflowAmount
      } else {
          state.playerExp += action.payload
      }
  },
  handlePlayerShipPurchase: (state, action: PayloadAction<PlayableStarship>) => {
      state.playerShip = action.payload
      state.playerFunds -= parseInt(action.payload.costInCredits);
  },
  handleMissionOutcome: (state, action: PayloadAction<boolean>) => {
      if(action.payload ){
          state.playerFunds += 10000
      } else {
          state.playerFunds -= 10000
      }
  },
    setCreatedGame: (state, action: PayloadAction<boolean>) => {
      state.createdGame = action.payload
    },
  },
})

export const { changePlayerCharacter, handlePlayerShipPurchase, changePlayerShip, setCreatedGame, addExp, handleMissionOutcome } = gameStateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getPlayerCharacter = (state: RootState) => state.gameState.playerCharacter
export const getPlayerShip = (state: RootState) => state.gameState.playerShip
export const getPlayerFunds = (state: RootState) => state.gameState.playerFunds
export const getAvailableCharacterIds = (state: RootState) => state.gameState.availableCharacterIds
export const getAvailableShipIds = (state: RootState) => state.gameState.availableShipIds
export const getPlayerLevel = (state: RootState) => state.gameState.playerLevel
export const getPlayerExp = (state: RootState) => state.gameState.playerExp

export default gameStateSlice.reducer