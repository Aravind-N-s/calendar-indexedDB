import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {DateArray, TimeArray} from "../utils/enum";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
	table: {
		minWidth: 65,
	},
});

const Calendar = (props: { columns: DateArray; rows: TimeArray; }): JSX.Element => {
	const classes = useStyles();
	const {columns, rows} = props;
	return (
		<div style={{margin: "10px 0px 0px 0px"}}>
			<CssBaseline />
			{/*<CircularProgress color="secondary" />*/}
			<Container maxWidth="lg">
				<Paper elevation={3}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									{columns.map((cols, idx) => (<TableCell key={idx}><>
										<span style={{color: "red"}}>{cols.day}</span>
										<br/><span>{cols.date}</span>
									</></TableCell>))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row, idx) => (
									<TableRow key={idx}>
										<TableCell align="center" component="th" scope="row">
											{row.value}
										</TableCell>
										{/*<TableCell align="right">{row.calories}a</TableCell>*/}
										{/*<TableCell align="right">{row.fat}b</TableCell>*/}
										{/*<TableCell align="right">{row.carbs}c</TableCell>*/}
										{/*<TableCell align="right">{row.protein}d</TableCell>*/}
										{/*<TableCell align="right">{row.protein}e</TableCell>*/}
										{/*<TableCell align="right">{row.protein}f</TableCell>*/}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</div>
	);
};

export default Calendar;