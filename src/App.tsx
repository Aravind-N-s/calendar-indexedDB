import React, {useEffect, useState} from "react";
import "./App.css";
import {AppBar, Box} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Calendar from "./calendarComponents";
import {keys} from "./indexedDB";
import {dateArray, timeArray} from "./calendarComponents/day";

const App = (): JSX.Element => {

	const [isWeek, setWeek] = useState<number>(0);

	const {array, month} = dateArray(isWeek);
	const time = timeArray(array);

	const onClickHandler = (value: number): void =>	setWeek(isWeek + value);

	useEffect(() => {
		if (!("indexedDB" in window)) {
			alert("This browser doesn't support IndexedDB");
			return;
		}
		keys().catch(err => {alert(err);});
	},[]);

	return (
		<div className="App">
			<AppBar position="static">
				<Box component={Toolbar} justifyContent={"space-between"}>
					<Typography variant="h6">Calendar</Typography>
					<Typography variant="h6">{month}</Typography>
				</Box>
			</AppBar>
			<div style={{textAlign: "right",margin: "20px 50px 0px 0px"}}>
				<ButtonGroup  variant="text" color="primary" aria-label="text primary button group">
					<Button onClick={() => onClickHandler(-1)}>Previous Week</Button>
					<Button onClick={() => onClickHandler(1)}>Next Week</Button>
				</ButtonGroup>
			</div>
			<Calendar columns={array} rows={time}/>
		</div>
	);
};

export default App;
