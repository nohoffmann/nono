import { Preferences } from '../types/Preferences';

export const generateGridSizeOptions = (preferences: Preferences) => [
      ...Array(preferences.gridSettings.maximum - preferences.gridSettings.minimum + 1).keys()
    ]
      .map(x => x + preferences.gridSettings.minimum)
      .filter(x => preferences.gridSettings.onlyMultiplesOfSupportLineInterval ? x % 5 === 0 : true);
