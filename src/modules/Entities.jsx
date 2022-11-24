import { useState, useContext, useEffect, useReducer, useRef } from "react";
import Collapse from "@mui/material/Collapse";
import { purple, grey } from "@mui/material/colors";

import ModuleCard from "../components/ModuleCard";
import { HomeassistantContext } from "../context/HomeassistantContextProvider";

const SingleEntity = ({ entityId }) => {
	const [color, setColor] = useState(null);
	const [active, setActive] = useState(false);
	const { apiData } = useContext(HomeassistantContext);
	const [entity, setEntity] = useReducer((state, newState) => {
		if (
			!state ||
			state.last_updated !== newState.last_updated ||
			state.last_changed !== newState.last_changed
		) {
			setActive(false);
			return newState;
		}
		// console.log(state.last_updated, newState.last_updated);
		return state;
	}, null);

	const ref = useRef(null);

	useEffect(() => {
		setEntity(apiData[entityId]);
		if (!active && entity) {
			// console.log( "%c " + entity.entity_id + "," + entity.last_updated + ", active:" + active, "color: red" );
			ref.current.scrollIntoView();
			setColor(purple[900]);
			setActive(true);
		}
	}, [active, entity, apiData, entityId]);

	if (!entity) return null;
	return (
		<ModuleCard
			reference={ref}
			sx={{
				backgroundColor: color,
				transition: "background-color 1000ms",
			}}
		>
			<Collapse
				in={active}
				timeout={{
					enter: 1000,
					exit: 0,
				}}
				collapsedSize={0}
				addEndListener={(event) => {
					setTimeout(() => {
						setColor(grey[900]);
					}, 5000);
				}}
			>
				<pre
					style={{
						whiteSpace: "pre-wrap",
						overflow: "auto",
						maxHeight: 300,
					}}
				>
					{JSON.stringify(entity, null, 4)}
				</pre>
			</Collapse>
		</ModuleCard>
	);
};

const Entities = () => {
	const { apiData } = useContext(HomeassistantContext);
	if (!apiData) return null;
	const dataArray = [];
	for (const key in apiData) {
		if (Object.hasOwnProperty.call(apiData, key)) {
			dataArray.push(<SingleEntity key={key} entityId={key} />);
		}
	}

	return (
		<>
			{dataArray.map((apiObject) => {
				return apiObject;
			})}
		</>
	);
};

export default Entities;
