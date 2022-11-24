import { useTheme } from "@mui/material/styles";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const ModuleCard = (props) => {
	const theme = useTheme();
	const sizes = {
		xs: true,
		// sm: true,
		// md: true,
		// lg: true,
		// xl: true,
		...props.sizes,
	};
	return (
		<Grid
			item
			xs={sizes.xs}
			sm={sizes.sm}
			md={sizes.md}
			lg={sizes.lg}
			xl={sizes.xl}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			ref={props.reference ? props.reference : null}
		>
			<Card
				raised
				sx={{
					// width: "100%",
					backgroundColor:
						theme.palette.mode === "light"
							? "rgba(255,255,255,0.5)"
							: "rgba(0,0,0,0.5)",
					backdropFilter: "blur(4px)",
				}}
			>
				<CardContent
					sx={{
						minWidth: 150,
						minHeight: 150,
						display: "flex",
						...props.sx,
					}}
				>
					{props.children}
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ModuleCard;
