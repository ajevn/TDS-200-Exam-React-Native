import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {Mission, PlayableCharacter, PlayableStarship, PlayerStatistics} from "../types";
import {levelRequiredExp, defaultCharacter, defaultShip} from "../constants/Variables"

//Game state interface, as well as initial state. Available characterIds and shipIds are hard-coded to allow for local portrait image-url linking
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
    createdGame: false,
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
//Reducers for gameState handling state update and business-logic. These functions does not check logic, as this is done in game components.
//They serve only as Setter/Getters, with minimal logical checks.
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
    //Handles exp gain from missions etc. Will account for level-up if exp exceeds "levelRequiredExp" from constant variables.
    addExp: (state, action: PayloadAction<number>) => {
        let currentExp = state.playerExp;
        const diffToNewLevel = levelRequiredExp - currentExp;
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
//Exports reducer functions.
export const { changePlayerCharacter, changePlayerShip, handlePlayerShipPurchase, setCreatedGame, addExp, handleMissionOutcome, addMissionToPlayerStats } = gameStateSlice.actions
//Getters where calculation is necessary. All other attribute-getters gets data directly from State.
export const getPlayerStats = (state: RootState) => {
    let playerTotalFunds = 0;
    let playerTotalWins = 0;
    let playerTotalExp = 0;

    state.gameState.playerStatistics.missions.forEach(mission => {
        if(mission.didWin){
            playerTotalFunds += 10000
            playerTotalWins += 1
            playerTotalExp += 300
        } else {
            playerTotalFunds =- 10000;
            playerTotalExp += 150;
        }
    })

    return {
        totalFunds: playerTotalFunds,
        totalExp: playerTotalExp,
        totalWins: playerTotalWins,
        winPercentage: playerTotalWins / state.gameState.playerStatistics.missions.length
    }
}

export default gameStateSlice.reducer