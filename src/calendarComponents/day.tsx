import {useEffect, useState} from "react";
import { format, addDays } from "date-fns";

// User Imports
import {DateArray, TimeArray, currentDate, dateFormat, dayFormat, CalenderArray} from "../utils/enum";
import {getAll} from "../indexedDB";

const dateArray = (index= 0): { array: DateArray; month: string } => {
	// Save the header data
	const days: DateArray = [{ date: "", day: "Time", current: false, fullFormat: new Date() }];
	for (let i = 0; i < 7; i++) {
		// Previous and Next Button Logic.
		const viewButtonStatus = i + index * 7;
		// Format to check for today as the day.
		const isCurrent = currentDate.toISOString() === addDays(currentDate, viewButtonStatus).toISOString();
		// Header Format with day and date.
		days.push({
			current: isCurrent,
			date: isCurrent? "Today": format(addDays(currentDate, viewButtonStatus), dateFormat),
			day: format(addDays(currentDate, viewButtonStatus), dayFormat),
			fullFormat:  addDays(currentDate, viewButtonStatus)
		});
	}
	// Return header and Month
	return {array: days, month: format(days[1].fullFormat, "MMMM yyy")};
};

const timeArray = (array: any): TimeArray => {
	// Save the indexedDb data.
	const [getData, setData] = useState<any>([]);
	// Save the rows data.
	const [getTime, setTime] = useState<any>([]);


	useEffect(() => {		
		// Fetch all the data in the indexedDB
		const fetchData = async () => {
			try{
				const data = await getAll();
				if(data.length !== 23){
					setTimeout(fetchData, 1000);
				}
				setData(data);
			}
			catch(e){
				console.log(e);
			}
		};

		fetchData();
	},[]);

	useEffect(() => {
		// Populating Row data
		const time: { index: number; value: string; row1: string; row2: string; row3: string; row4: string; row5: string; row6: string; row7: string;}[] = [];
		for (let i = 1; i <= 23; i++){
			// Setting Row's Time duration.
			time.push({index: i, value: `${i}:00`,  row1: "", row2: "", row3: "", row4: "", row5: "", row6: "", row7: ""});
		}
		array.map((arr: any, idx: number) => {
			getData.map((data:CalenderArray) => {
				// Comparing the row and column date.
				if(format(arr.fullFormat,"PP") === format(data.date, "PP") ){
					// Comparing row and column duration.
					// @ts-ignore
					time[data.duration - 1][`row${idx}`] = data.title;
				}
			});
		});

		setTime([...time]);
	},[array]);
	// Returns Row data
	return getTime;
};
export {dateArray, timeArray};
