import { GameSettings } from './GameSettings';

export interface Preferences {
    defaultGameSettings: GameSettings;
    /**
     * number between 0 and 100 (representing percentage)
     */
    volume: number;

    /**
     * css color
     */
    accentColor: string;

    gridSettings: {
        supportLineInterval: number;
        onlyMultiplesOfSupportLineInterval: boolean;
        minimum: number;
        maximum: number;
    };
};
