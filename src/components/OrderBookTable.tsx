import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface bidInterface {
	asks: [number, number][];
	bids: [number, number][];
	lastUpdateId: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 19,
		fontWeight: "900",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
		fontWeight: "700",
	},
}));

const StyledTableRowSell = styled(TableRow)(({ theme }) => ({
	backgroundColor: theme.palette.error.light,
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
const StyledTableRowBuy = styled(TableRow)(({ theme }) => ({
	backgroundColor: theme.palette.success.light,
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export const OrderBookTable = ({ orders }: { orders?: bidInterface }) => (
	<TableContainer component={Paper} sx={{ width: "90%", margin: "40px auto" }}>
		<Table aria-label="orders book table">
			<TableHead>
				<TableRow>
					<StyledTableCell>Price</StyledTableCell>
					<StyledTableCell align="right">Amount</StyledTableCell>
					<StyledTableCell align="right">Total</StyledTableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{orders?.asks?.map((ask) => (
					<StyledTableRowSell
						key={Math.random()}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<StyledTableCell component="th" scope="row">
							{ask[0]}
						</StyledTableCell>
						<StyledTableCell align="right">{ask[1]}</StyledTableCell>
						<StyledTableCell align="right">{ask[0] * ask[1]}</StyledTableCell>
					</StyledTableRowSell>
				))}
				{orders?.bids?.map((bid) => (
					<StyledTableRowBuy
						key={Math.random()}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<StyledTableCell component="th" scope="row">
							{bid[0]}
						</StyledTableCell>
						<StyledTableCell align="right">{bid[1]}</StyledTableCell>
						<StyledTableCell align="right">{bid[0] * bid[1]}</StyledTableCell>
					</StyledTableRowBuy>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);
