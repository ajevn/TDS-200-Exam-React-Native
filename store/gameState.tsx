import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {Mission, PlayableCharacter, PlayableStarship, PlayerStatistics} from "../types";
import {levelRequiredExp, defaultCharacter, defaultShip} from "../constants/Variables"

interface GameState {
    createdGame: boolean,
    availableCharacterIds: ["10", "11", "14", "20"],
    availableShipIds: ["10", "11"],
    playerCharacter: PlayableCharacter | null,
    playerShip: PlayableStarship | null,
    playerFunds: number,
    playerLevel: number,
    playerExp: number,
    playerStatistics: PlayerStatistics,
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
    playerStatistics: {
        missions: [],
    },
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
    reducers: {
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
    addMissionToPlayerStats: (state, action: PayloadAction<Mission>) => {
        console.log(action.payload)
        state.playerStatistics.missions.push(action.payload)
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

export const { changePlayerCharacter, changePlayerShip, handlePlayerShipPurchase, setCreatedGame, addExp, handleMissionOutcome, addMissionToPlayerStats } = gameStateSlice.actions

export const getPlayerCharacter = (state: RootState) => state.gameState.playerCharacter
export const getPlayerShip = (state: RootState) => state.gameState.playerShip
export const getPlayerFunds = (state: RootState) => state.gameState.playerFunds
export const getAvailableCharacterIds = (state: RootState) => state.gameState.availableCharacterIds
export const getAvailableShipIds = (state: RootState) => state.gameState.availableShipIds
export const getPlayerLevel = (state: RootState) => state.gameState.playerLevel
export const getPlayerExp = (state: RootState) => state.gameState.playerExp

export default gameStateSlice.reducer