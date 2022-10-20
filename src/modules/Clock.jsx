import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ModuleCard from "../components/ModuleCard";
import addZero from "../utils/addZero";

const getCurrentTime = () => {
	const currentTime = new Date();
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return {
		hours: addZero(currentTime.getHours()),
		minutes: addZero(currentTime.getMinutes()),
		seconds: addZero(currentTime.getSeconds()),
		date: currentTime.toLocaleDateString(undefined, options),
	};
};

const Clock = () => {
	const [time, setTime] = useState(getCurrentTime);
	useEffect(() => {
		const clockInterval = setInterval(() => {
			const currentTime = getCurrentTime();
			if (currentTime.seconds !== time.seconds) {
				setTime(getCurrentTime());
			}
		}, 1000);
		return () => {
			clearInterval(clockInterval);
		};
	}, [time, setTime]);

	return (
		<ModuleCard sizes={{ md: 4 }}>
			<div
				style={{
					textAlign: "center",
					width: "100%",
				}}
			>
				<Typography
					variant="h1"
					color="textPrimary"
					sx={{ display: "inline-flex" }}
				>
					{`${time.hours}:${time.minutes}`}
				</Typography>
				<Typography
					variant="h2"
					color="textPrimary"
					pl={2}
					// align="right"
					sx={{ display: "inline-flex" }}
				>
					{`${time.seconds}`}
				</Typography>
				<Typography variant="h4" color="textPrimary">
					{`${time.date}`}
				</Typography>
			</div>
		</ModuleCard>
	);
};

export default Clock;
