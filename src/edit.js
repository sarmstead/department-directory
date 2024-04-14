import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	Button,
	Card,
	CardBody,
	Icon,
	PanelBody,
	PanelRow,
	Snackbar,
	TextControl,
	ToggleControl,
} from "@wordpress/components";

import Status from "./components/Status";
import Campuses from "./components/Campuses";
import "./editor.scss";
import { formatPhone } from "./utils";

export default function Edit({ attributes, setAttributes }) {
	const [campusName, setCampusName] = useState("");
	const [campusPhone, setCampusPhone] = useState("");
	const [campusToggle, setCampusToggle] = useState(false);
	const [campusSaved, setCampusSaved] = useState(false);
	const errorShape = { campuses: [] };
	const [errors, setError] = useState(errorShape);
	const { campuses, isActive } = attributes;

	useEffect(() => {
		if (campusSaved) {
			setTimeout(() => {
				setCampusSaved(false);
			}, 5000);
		}
	}, [campusSaved]);

	const toggleCampus = () => setCampusToggle(!campusToggle);

	const saveCampus = () => {
		const formattedPhone = formatPhone(campusPhone);

		if (formattedPhone.error) {
			setError((existingErrors) => {
				return {
					...existingErrors,
					campuses: [...existingErrors.campuses, formattedPhone.code],
				};
			});

			setTimeout(() => {
				setError(errorShape);
			}, 5000);

			return;
		}

		toggleCampus();
		setAttributes({
			campuses: [
				...campuses,
				{ campusName, campusPhone: formattedPhone.value },
			],
		});
		setCampusName("");
		setCampusPhone("");
		setCampusSaved(true);
	};

	const removeCampus = (campusForDeletion) => {
		const newList = campuses.filter((campus) => campus !== campusForDeletion);
		setAttributes({ campuses: newList });
		setCampusSaved(true);
	};

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
					{errors.campuses.length > 0 && (
						<>
							{errors.campuses.map((error) => (
								<PanelRow>
									<div className="knight-finder__editor__panel__error with-icon">
										<Icon
											className="knight-finder__icon"
											icon="warning"
											size="14"
										/>
										<span>{error}</span>
									</div>
								</PanelRow>
							))}
						</>
					)}

					{campusSaved && (
						<Snackbar>
							Don't forget to select "Update" on this page as well!
						</Snackbar>
					)}
					{!campusToggle && (
						<PanelRow>
							<Button variant="secondary" onClick={toggleCampus}>
								Add a campus
							</Button>
						</PanelRow>
					)}
					{campusToggle && (
						<CampusForm
							campusName={campusName}
							campusPhone={campusPhone}
							saveCampus={saveCampus}
							setCampusName={setCampusName}
							setCampusPhone={setCampusPhone}
						/>
					)}
					{campuses.length > 0 && (
						<PanelCampusList campuses={campuses} removeCampus={removeCampus} />
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<Status isActive={isActive} />
				<Campuses campuses={campuses} />
			</div>
		</>
	);
}

const CampusForm = ({
	campusName,
	campusPhone,
	saveCampus,
	setCampusName,
	setCampusPhone,
}) => {
	return (
		<PanelRow>
			<Card>
				<CardBody>
					<TextControl
						label={__("Name", "knight-finder")}
						value={campusName}
						onChange={(value) => setCampusName(value)}
						required
					/>
					<TextControl
						label={__("Phone", "knight-finder")}
						value={campusPhone}
						onChange={(value) => setCampusPhone(value)}
						type="tel"
						required
					/>
					<Button
						variant="primary"
						onClick={saveCampus}
						disabled={campusName.length < 1 || campusPhone.length < 1}
					>
						Save Campus
					</Button>
				</CardBody>
			</Card>
		</PanelRow>
	);
};

const PanelCampusList = ({ campuses, removeCampus }) => {
	return (
		<div className="knight-finder__editor__panel__campus-list">
			<h2>Added Campuses</h2>
			<ul>
				{campuses.map((campus) => {
					return (
						<li key={campus.campusName}>
							<div>
								<h3 className="knight-finder__editor__panel__campus-list__attribute">
									{campus.campusName}&nbsp;Campus
								</h3>
								<p className="knight-finder__editor__panel__campus-list__attribute">
									<Icon size="12" icon="smartphone" />
									{campus.campusPhone}
								</p>
							</div>
							<Button
								icon="remove"
								iconSize="14"
								title="Remove campus"
								size="small"
								isDestructive="true"
								onClick={() => removeCampus(campus)}
							></Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
