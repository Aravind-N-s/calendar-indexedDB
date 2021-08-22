import React, {useState} from "react";
import "./App.css";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const App = (): JSX.Element => {

	const [isWeek, setWeek] = useState<number>(0);

	const onClickHandler = (value: number): void =>	setWeek(isWeek + value);

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<Typography align="right" variant="h6">August</Typography>
				</Toolbar>
			</AppBar>
			<div style={{textAlign: "right",margin: "20px 50px 0px 0px"}}>
				<ButtonGroup  variant="text" color="primary" aria-label="text primary button group">
					<Button onClick={() => onClickHandler(-1)}>Previous Week</Button>
					<Button onClick={() => onClickHandler(1)}>Next Week</Button>
				</ButtonGroup>
			</div>
			<h2>Test</h2>
		</div>
	);
};

export default App;
