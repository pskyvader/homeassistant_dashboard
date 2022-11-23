import { useContext } from "react";
// import { useState, useEffect, useContext } from "react";
// import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import ModuleCard from "../components/ModuleCard";
import { HomeassistantContext } from "../context/HomeassistantContextProvider";

const Entities = () => {
	const { apiData } = useContext(HomeassistantContext);

	// useEffect(() => {}, [size, setSize]);
	if (!apiData) return null;

	return (
		<ModuleCard sizes={{ md: 2 }}>
			API OBJECTS:
			{apiData.map((apiObject) => {
				return <Card>{JSON.stringify(apiObject)}</Card>;
			})}
		</ModuleCard>
	);
};

export default Entities;
