import { Text, Button } from "@chakra-ui/react";

function PrimaryButton({ title, ...children }) {
	return (
		<Button
			{...children}
			_hover={{
				border: "1px",
				borderStyle: "solid",
			}}
			_loading={{
				color: "#BDBDBD",
			}}
			style={{
				border: "1px",
				borderStyle: "solid",
				borderRadius: "10px",
				backgroundColor: "#0B0B0B",
			}}
		>
			<Text color="#FDFDFD">{title}</Text>
		</Button>
	);
}

export default PrimaryButton;
