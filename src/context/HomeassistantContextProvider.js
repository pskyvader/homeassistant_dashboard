import { createContext, useMemo, useReducer, useEffect } from "react";
import { useCookies } from "react-cookie";

import {
	// Auth,
	createConnection,
	subscribeEntities,
	createLongLivedTokenAuth,
} from "home-assistant-js-websocket";

export const HomeassistantContext = createContext({});

const HomeassistantContextProvider = (props) => {
	const [cookies, setCookie] = useCookies(["hass_configuration"]);
	const [configuration, setConfiguration] = useReducer(
		(_currentConfiguration, newConfiguration) => newConfiguration,
		cookies.hass_configuration
	);
	const [apiData, setApiData] = useReducer((currentData, newData) => {
		return { ...currentData, ...newData };
	}, null);

	const provider = useMemo(
		() => ({
			configuration,
			setConfiguration,
			cookies,
			setCookie,
			apiData,
			setApiData,
		}),
		[configuration, cookies, setCookie, apiData]
	);

	useEffect(() => {
		if (configuration && configuration.token && !apiData) {
			const auth = createLongLivedTokenAuth(
				configuration.url,
				configuration.token
			);

			createConnection({ auth })
				.then((connection) => {
					subscribeEntities(connection, (entities) => {
						console.log("new update");
						setApiData(entities);
					});
				})
				.catch((error) => {
					console.log("error", error);
					setConfiguration(null);
					setCookie("hass_configuration", null);
				});
		}
	}, [configuration, setCookie, apiData]);

	return (
		<HomeassistantContext.Provider value={provider}>
			{props.children}
		</HomeassistantContext.Provider>
	);
};

export default HomeassistantContextProvider;
