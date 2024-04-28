import { useBlockProps } from "@wordpress/block-editor";

import Status from "./components/Status";
import Campuses from "./components/Campuses";
import Contacts from "./components/Contacts";
import Notes from "./components/Notes";
import Tags from "./components/Tags";

export default function save({ attributes }) {
	const { campuses, contacts, isActive, notes, showNotes, tags } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<Status isActive={isActive} />
			<Campuses campuses={campuses} />
			<Contacts contacts={contacts} />
			{showNotes && <Notes notes={notes} context="save" />}

			{tags.length > 0 && (
				<Tags tags={tags} />
			)}

		</div>
	);
}
