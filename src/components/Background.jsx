import { useState, useEffect, Fragment } from "react";
import { useTheme } from "@mui/material/styles";

const getImage = () => {
	const url = "https://dog.ceo/api/breed/terrier/yorkshire/images/random";
	return fetch(url)
		.then((response) => response.json())
		.then((response) => {
			return response.message;
		});
};

const Background = (props) => {
	const theme = useTheme();
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (image === null) {
			getImage().then((newimage) => {
				setImage(newimage);
			});
		}
	}, [image, setImage]);

	if (image === null) {
		return null;
	}

	return (
		<Fragment>
			<img
				src={image}
				alt="background"
				style={{
					position: "fixed",
					overflow: "hidden",
					width: "100vw",
					height: "100vh",
					filter:
						theme.palette.mode === "light"
							? "brightness(0.95)"
							: "brightness(0.5)",
				}}
			/>

			<div
				style={{
					position: "relative",
				}}
			>
				{props.children}
			</div>
		</Fragment>
	);
};

export default Background;
