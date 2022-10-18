import { useTheme } from "@mui/material/styles";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const ModuleCard = () => {
	const theme = useTheme();
	return (
		<Grid
			item
			xs
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Card
				raised
				sx={{
					backgroundColor:
						theme.palette.mode === "light"
							? "rgba(255,255,255,0.5)"
							: "rgba(0,0,0,0.5)",
					backdropFilter: "blur(4px)",
				}}
			>
				<CardContent sx={{ minWidth: 200, minHeight: 200 }}>
					uwu
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ModuleCard;
