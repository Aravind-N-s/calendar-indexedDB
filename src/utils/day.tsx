import React, {useEffect, useState} from "react";
import { format, addDays } from "date-fns";
import {DateArray, TimeArray, currentDate, dateFormat, dayFormat} from "./enum";

import {getAll} from "../indexedDB/index";

const dateArray = (index=0): { array: DateArray; month: string } => {
	const days: DateArray = [{ date: "", day: "Time", current: false, fullFormat: new Date() }];
	for (let i = 0; i < 7; i++) {
		const viewButtonStatus = i + index * 7;
		const isCurrent = format(currentDate, dateFormat) === format(addDays(currentDate, viewButtonStatus), dateFormat);
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
	const time = [];
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		if (!("indexedDB" in window)) {
			alert("This browser doesn't support IndexedDB");
			return;
		}
		const fetchData = async () => {
			try{
				const data = await getAll();
				// @ts-ignore
				console.log("::::", {array, data, lol: data[0].date.toISOString()});
				setData(data);
			}
			catch(e){
				console.log(":::::", {e});
			}
		};
		fetchData();
	},[]);

	for (let i = 1; i <= 23; i++){
		time.push({value: `${i}:00`, index: i});
	}
	return time;
};
export {dateArray, timeArray};
