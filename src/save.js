import { useBlockProps } from "@wordpress/block-editor";

import Status from "./components/Status";
import Campuses from "./components/Campuses";
import Contacts from "./components/Contacts";

export default function save({ attributes }) {
	const { campuses, contacts, isActive } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<Status isActive={isActive} />
			<Campuses campuses={campuses} />
			<Contacts contacts={contacts} />
		</div>
	);
}
