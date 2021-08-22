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

const dbPromise = openDB<CalendarDB>('Calender', 1, {
	upgrade(db) {
		const calendarStore = db.createObjectStore('calendar', {keyPath: "id", autoIncrement: true,});
		calendarStore.createIndex('by-date', 'date');
	},
});

(async () => {
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

export async function get(key:string) {
	return (await dbPromise).get("calendar", key);
}

export async function getAll() {
	return (await dbPromise).getAll("calendar");
}

export async function set(key:string, val:string) {
	return (await dbPromise).put("calendar", val, key);
}

export async function del(key:string) {
	return (await dbPromise).delete("calendar", key);
}

export async function clear() {
	return (await dbPromise).clear("calendar");
}

export async function keys() {
	return (await dbPromise).getAllKeys("calendar");
}
