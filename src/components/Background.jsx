import { useState, useEffect, Fragment } from "react";
import { useTheme } from "@mui/material/styles";

const getImage = () => {
	// const url = "https://dog.ceo/api/breed/terrier/yorkshire/images/random";
	const url = "https://picsum.photos/1920/1080";
	return fetch(url).then((response) => {
		return response.url;
	});
	// return fetch(url)
	// 	.then((response) => response.json())
	// 	.then((response) => {
	// 		return response.message;
	// 	});
};

const Background = (props) => {
	const theme = useTheme();
	const [image, setImage] = useState("https://picsum.photos/1920/1080");
	const [loading, setLoading] = useState(false);
	const tenMinutes = 1000 * 6;

	useEffect(() => {
		// if (image === null) {
		// getImage().then((newimage) => {
		// 	setImage(newimage);
		// });
		// }
		const backgroundInterval = setInterval(() => {
			setLoading(true);
			getImage().then((newimage) => {
				const img = new Image();
				img.src = newimage;
				img.onload = () => {
					setLoading(false);
					setImage(newimage);
				};
			});
			// if (image === "https://picsum.photos/1920/1080") {
			// 	setImage("https://picsum.photos/3840/2160");
			// } else {
			// 	setImage("https://picsum.photos/1920/1080");
			// }
		}, tenMinutes);
		return () => {
			clearInterval(backgroundInterval);
		};
	}, [image, setImage, tenMinutes, setLoading]);

	// if (image === null) {
	// 	return null;
	// }
	// const image = "https://picsum.photos/1920/1080";

	let filter = "brightness(0.1) blur(10px)";
	if (!loading) {
		filter =
			theme.palette.mode === "light"
				? "brightness(0.95)"
				: "brightness(0.5)";
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
					filter: filter,
					clipPath: loading ? "inset(0)" : "",
					transition: loading
						? "filter cubic-bezier(0, 0, 0, 1) 0.5s"
						: "filter cubic-bezier(1, 0, 0, 0) 0.5s",
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
