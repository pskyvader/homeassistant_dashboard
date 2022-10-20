import Grid from "@mui/material/Grid";
import Clock from "./modules/Clock";

const MainGrid = () => {
	return (
		<Grid container spacing={2}>
			<Clock />
		</Grid>
	);
};

export default MainGrid;
