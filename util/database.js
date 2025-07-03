import * as SQLite from 'expo-sqlite';

export async function init() {
    try {
        const database = await SQLite.openDatabaseAsync('places.db');
        
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS places(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )
        `);
        
        return database;
    } catch (error) {
        throw error;
    }
}

export async function insertPlace(place) {
    try {
        const database = await SQLite.openDatabaseAsync('places.db');
        
        const result = await database.runAsync(
            'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
            place.title,
            place.imageUri,
            place.address,
            place.location.lat,
            place.location.lng
        );
        
        return result;
    } catch (error) {
        throw error;
    }
}

export async function fetchPlaces() {
    try {
        const database = await SQLite.openDatabaseAsync('places.db');
        
        const places = await database.getAllAsync('SELECT * FROM places');
        
        // Convert database rows back to Place objects
        return places.map(place => ({
            id: place.id.toString(),
            title: place.title,
            imageUri: place.imageUri,
            address: place.address,
            location: {
                lat: place.lat,
                lng: place.lng
            }
        }));
    } catch (error) {
        throw error;
    }
}

export async function fetchPlaceById(id) {
    try {
        const database = await SQLite.openDatabaseAsync('places.db');
        
        const place = await database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]);
        
        if (!place) {
            return null;
        }
        
        // Convert database row back to Place object
        return {
            id: place.id.toString(),
            title: place.title,
            imageUri: place.imageUri,
            address: place.address,
            location: {
                lat: place.lat,
                lng: place.lng
            }
        };
    } catch (error) {
        throw error;
    }
}


        