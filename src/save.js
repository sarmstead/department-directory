import { useBlockProps } from "@wordpress/block-editor";

import Status from "./components/Status";
import Campuses from "./components/Campuses";

export default function save({ attributes }) {
	const { campuses, isActive } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<Status isActive={isActive} />
			<Campuses campuses={campuses} />
		</div>
	);
}
