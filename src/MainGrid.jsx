import Grid from "@mui/material/Grid";
import Clock from "./modules/Clock";
import ScreenSize from "./modules/ScreenSize";
import Configuration from "./modules/Configuration";
import Entities from "./modules/Entities";

const MainGrid = () => {
	return (
		<Grid container spacing={2}>
			<Clock />
			<ScreenSize />
			<Configuration />
		</Grid>
	);
};

export default MainGrid;
