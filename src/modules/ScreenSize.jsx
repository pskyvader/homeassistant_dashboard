import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ModuleCard from "../components/ModuleCard";

const ScreenSize = () => {
	const [size, setSize] = useState({
		w: window.innerWidth,
		h: window.innerHeight,
	});
	useEffect(() => {
		const ScreenSizeInterval = setInterval(() => {
			if (window.innerWidth !== size.w || window.innerHeight !== size.h) {
				setSize({
					w: window.innerWidth,
					h: window.innerHeight,
				});
			}
		}, 5000);
		return () => {
			clearInterval(ScreenSizeInterval);
		};
	}, [size, setSize]);

	return (
		<ModuleCard sizes={{  md: 2 }}>
			<Typography variant="h5" color="textPrimary">
				{`Size ${size.w}px x ${size.h}px`}
			</Typography>
		</ModuleCard>
	);
};

export default ScreenSize;
