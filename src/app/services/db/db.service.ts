import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { Preferences } from '../../types/Preferences';

const preferencesStoreKey = 'preferences-store';
const preferencesKey = 'preferences';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  /**
   * IndexedDB interface
   */
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB('nono', 3, {
      upgrade(db) {
        db.createObjectStore(preferencesStoreKey);
      }
    });
  }

  /**
   * @returns the user's preferences
   */
  public async getPreferences(): Promise<Preferences> {
    return (await this.dbPromise).get(preferencesStoreKey, preferencesKey);
  }

  /**
   * set the user's preferences
   *
   * @param preferences   preferences to be set
   */
  public async setPreferences(preferences: Preferences) {
    return (await this.dbPromise).put(preferencesStoreKey,  preferences, preferencesKey);
  }
}
