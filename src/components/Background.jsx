import { useState, useEffect } from "react";

const getImage = () => {
	const url = "https://dog.ceo/api/breed/terrier/yorkshire/images/random";
	return fetch(url)
		.then((response) => response.json())
		.then((response) => {
			return response.message;
		});
};

const Background = (props) => {
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
		<div>
			<img
				src={image}
				alt="background"
				style={{
					position: "fixed",
					overflow: "hidden",
					width: "100vw",
					height: "100vh",
					// filter: "brightness(0.9)",
				}}
			/>

			<div
				style={{
					position: "relative",
				}}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Background;
