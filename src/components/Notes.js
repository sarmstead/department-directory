import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

export default function Notes({ notes, context = "edit", setAttributes }) {
	if (context.toLowerCase() === "save") {
		return (
			<section className="department-listing__notes">
				<h3>Notes</h3>
				<section className="department-listing__notes__rich-text">
					<RichText.Content value={notes} />
				</section>
			</section>
		);
	}

	return (
		<section className="department-listing__notes">
			<h3>Notes</h3>
			<section className="department-listing__notes__rich-text">
				<RichText
					value={notes}
					allowedFormats={["core/bold", "core/italic", "core/link"]}
					onChange={(notes) => setAttributes({ notes })}
					placeholder={__("Add some notes...")}
					multiline="p"
				/>
			</section>
		</section>
	);
}
