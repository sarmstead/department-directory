import { useBlockProps } from "@wordpress/block-editor";

import Status from "./components/Status";
import Campuses from "./components/Campuses";
import Contacts from "./components/Contacts";
import Notes from "./components/Notes";

export default function save({ attributes }) {
	const { campuses, contacts, isActive, notes, showNotes } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<Status isActive={isActive} />
			<Campuses campuses={campuses} />
			<Contacts contacts={contacts} />
			{showNotes && <Notes notes={notes} context="save" />}
		</div>
	);
}
