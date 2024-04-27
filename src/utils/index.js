export const formatPhone = (phone) => {
	if (phone === "N/A") return { value: phone, code: "SUCCESS", error: false }

	const strippedNumber = phone
		.replaceAll("(", "")
		.replaceAll(")", "")
		.replaceAll(" ", "")
		.replaceAll("-", "")
		.replaceAll("+1", "");

	if (strippedNumber.length !== 10) {
		return {
			value: "",
			code: "ERROR: PHONE NUMBER MUST BE 10 DIGITS.",
			error: true,
		};
	}

	const areaCode = strippedNumber.slice(0, 3);
	const exchangeCode = strippedNumber.slice(3, 6);
	const stationNumber = strippedNumber.slice(6);
	const formattedNumber = `(${areaCode}) ${exchangeCode}-${stationNumber}`;

	return { value: formattedNumber, code: "SUCCESS", error: false };
};
