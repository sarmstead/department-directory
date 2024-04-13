/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	Button,
	Card,
	CardBody,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import Status from "./components/Status";
import { useState } from "react";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const [campusName, setCampusName] = useState("");
	const [campusToggle, setCampusToggle] = useState(false);
	const { isActive } = attributes;

	const toggleCampus = () => setCampusToggle(!campusToggle);
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Status", "knight-finder")}>
					<PanelRow>
						<ToggleControl
							label={__("Is Active?", "knight-finder")}
							checked={!!isActive}
							onChange={() => setAttributes({ isActive: !isActive })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__("Campuses", "knight-finder")}>
					{!campusToggle && (
						<PanelRow>
							<Button variant="secondary" onClick={toggleCampus}>
								Add a campus
							</Button>
						</PanelRow>
					)}
					{campusToggle && (
						<PanelRow>
							<Card>
								<CardBody>
									<TextControl
										label={__("Name", "knight-finder")}
										value={campusName}
										onChange={(value) => setCampusName(value)}
									/>
									<TextControl
										label={__("Phone", "knight-finder")}
										value={campusName}
										onChange={(value) => setCampusName(value)}
									/>
									<Button variant="primary" onClick={toggleCampus}>
										Save Campus
									</Button>
								</CardBody>
							</Card>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<Status isActive={isActive} />
				<p>Campus: {campusName}</p>
			</div>
		</>
	);
}
