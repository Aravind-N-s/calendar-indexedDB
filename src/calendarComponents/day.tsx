import {useEffect, useState} from "react";
import { format, addDays } from "date-fns";
import {DateArray, TimeArray, currentDate, dateFormat, dayFormat, CalenderArray} from "../utils/enum";

import {getAll} from "../indexedDB";

const dateArray = (index= 0): { array: DateArray; month: string } => {
	const days: DateArray = [{ date: "", day: "Time", current: false, fullFormat: new Date() }];
	for (let i = 0; i < 7; i++) {
		const viewButtonStatus = i + index * 7;
		const isCurrent = currentDate.toISOString() === addDays(currentDate, viewButtonStatus).toISOString();
		days.push({
			current: isCurrent,
			date: isCurrent? "Today": format(addDays(currentDate, viewButtonStatus), dateFormat),
			day: format(addDays(currentDate, viewButtonStatus), dayFormat),
			fullFormat:  addDays(currentDate, viewButtonStatus)
		});
	}
	return {array: days, month: format(days[1].fullFormat, "MMMM yyy")};
};

const timeArray = (array: any): TimeArray => {
	const [getData, setData] = useState<any>([]);
	const [getTime, setTime] = useState<any>([]);


	useEffect(() => {
		if (!("indexedDB" in window)) {
			alert("This browser doesn't support IndexedDB");
			return;
		}
		
		const fetchData = async () => {
			try{
				const data = await getAll();
				setData(data);
			}
			catch(e){
				console.log(e);
			}
		};

		fetchData();
	},[]);

	useEffect(() => {
		const time: { index: number; value: string; row1: string; row2: string; row3: string; row4: string; row5: string; row6: string; row7: string;}[] = [];
		for (let i = 1; i <= 23; i++){
			time.push({index: i, value: `${i}:00`,  row1: "", row2: "", row3: "", row4: "", row5: "", row6: "", row7: ""});
		}
		array.map((arr: any, idx: number) => {
			getData.map((data:CalenderArray) => {
				if(format(arr.fullFormat,"PP") === format(data.date, "PP") ){
					// @ts-ignore
					time[data.duration - 1][`row${idx}`] = data.title;
				}
			});
		});

		setTime([...time]);
	},[array]);

	return getTime;
};
export {dateArray, timeArray};
