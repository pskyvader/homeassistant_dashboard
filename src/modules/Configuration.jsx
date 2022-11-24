import { useContext, useReducer } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
	// Auth,
	createConnection,
	// subscribeEntities,
	createLongLivedTokenAuth,
} from "home-assistant-js-websocket";

import ModuleCard from "../components/ModuleCard";
import { HomeassistantContext } from "../context/HomeassistantContextProvider";

const Configuration = () => {
	const { configuration, setConfiguration, setCookie, cookies } =
		useContext(HomeassistantContext);
	const [formInput, setFormInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			url: cookies.hass_configuration
				? cookies.hass_configuration.url
				: "http://192.168.0.100:8123",
			token: cookies.hass_configuration
				? cookies.hass_configuration.token
				: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxNjA1NTA3ODAzMzQ0MTY4YTk4YjljM2NmYTlkOTcyZCIsImlhdCI6MTY2ODk5MDM0MiwiZXhwIjoxOTg0MzUwMzQyfQ.9f3Y1RSrvXwuCC5XLPY0vFxs15WwwTCnIa2YUGeDo7Y",
		}
	);

	const handleInput = (evt) => {
		const name = evt.target.name;
		const newValue = evt.target.value;
		setFormInput({ [name]: newValue });
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const auth = createLongLivedTokenAuth(formInput.url, formInput.token);

		createConnection({ auth })
			.then((connection) => {
				setCookie("hass_configuration", JSON.stringify(formInput));
				setConfiguration(formInput);
				//save in cookie
				// save in config
				//set connection in context?

				// subscribeEntities(connection, (entities) =>
				// 	console.log(entities)
				// );
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	if (!configuration || !configuration.token) {
		return (
			<ModuleCard sizes={{ md: 2 }}>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<Typography variant="h6">HASS configuration</Typography>
					<TextField
						// error
						id="url"
						name="url"
						label="URL"
						defaultValue={formInput.url}
						helperText="ie: http://IP_ADDRESS:8123/"
						variant="outlined"
						onChange={handleInput}
					/>
					<TextField
						// error
						id="token"
						name="token"
						label="token"
						defaultValue={formInput.token}
						helperText=" "
						variant="outlined"
						onChange={handleInput}
					/>
					<Button type="submit" variant="contained" color="primary">
						Test and Save
					</Button>
				</Box>
			</ModuleCard>
		);
	}
	return null;
};

export default Configuration;
