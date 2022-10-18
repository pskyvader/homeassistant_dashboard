import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Background from "./components/Background";
import ModuleCard from "./components/ModuleCard";
import Grid from "@mui/material/Grid";
const App = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Background>
				<Container maxWidth={false} sx={{ padding: theme.spacing(3) }}>
					{/* <Box sx={{ flexGrow: 1 }}> */}
					<Grid container spacing={2}>
						<ModuleCard />
						<ModuleCard />
						<ModuleCard />
						<ModuleCard />
						<ModuleCard />
						<ModuleCard />
					</Grid>
					{/* </Box> */}
				</Container>
			</Background>
		</ThemeProvider>
	);
};

export default App;
