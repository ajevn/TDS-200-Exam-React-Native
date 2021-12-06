import {PlayableCharacter, PlayableStarship} from "../types";

export const tabBarIconSize = 22
export const levelRequiredExp = 1000
export const defaultCharacter: PlayableCharacter = {
    id: "10",
    category: "people",
    name: "Obi-Wan Kenobi",
    height: "182",
    gender: "male",
}
export const defaultShip: PlayableStarship = {
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