import Grid from "@mui/material/Grid";
import Clock from "./modules/Clock";
import ScreenSize from "./modules/ScreenSize";

const MainGrid = () => {
	return (
		<Grid container spacing={2}>
			<Clock />
			<ScreenSize />
		</Grid>
	);
};

export default MainGrid;
