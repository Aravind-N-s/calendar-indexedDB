import { openDB, DBSchema } from 'idb';
import { addDays } from "date-fns";
import {currentDate, random, duration} from "../utils/enum";
// @ts-ignore
import faker from "faker";

interface CalendarDB extends DBSchema {
	// @ts-ignore
	calendar: {
		id: number;
		title: string;
		date: any;
		duration: number;
		indexes: { 'by-date': string };
	};
}

// Initializing the calendar DB.
const dbPromise = openDB<CalendarDB>('Calender', 1, {
	upgrade(db) {
		const calendarStore = db.createObjectStore('calendar', {keyPath: "id", autoIncrement: true,});
		calendarStore.createIndex('by-date', 'date');
	},
});

(async () => {
	// seeding the DB with 23 records.
	try{
		const resp = await (await dbPromise).getAll("calendar")
		if(resp.length) return;
		for (let i = 0; i < 23; i++) {
			const data = {
				title: faker.commerce.productName(),
				date: addDays(currentDate, Math.ceil(Math.random() * duration[i])),
				duration: Math.ceil(Math.random() * duration[i]),
			};
			await (await dbPromise).add('calendar', data)
		}
	}
	catch(e){
		alert(e)
	}
})();

// get all the records to populate on calendar
export async function getAll() {
	return (await dbPromise).getAll("calendar");
}

// get all keys - used to initialize db and check for errors
export async function keys() {
	return (await dbPromise).getAllKeys("calendar");
}
