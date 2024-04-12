import { useBlockProps } from "@wordpress/block-editor";

import Status from "./components/Status";

export default function save({ attributes }) {
	const { isActive } = attributes;
	return (
		<div {...useBlockProps.save()}>
			<Status isActive={isActive} />
		</div>
	);
}
