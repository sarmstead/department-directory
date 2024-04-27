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
import Contacts from "./components/Contacts";
import Notes from "./components/Notes";
import "./editor.scss";
import { formatPhone } from "./utils";

export default function Edit({ attributes, setAttributes }) {
	const [campusName, setCampusName] = useState("");
	const [campusPhone, setCampusPhone] = useState("");
	const [campusToggle, setCampusToggle] = useState(false);
	const [campusSaved, setCampusSaved] = useState(false);

	const [contactName, setContactName] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [contactToggle, setContactToggle] = useState(false);
	const [contactSaved, setContactSaved] = useState(false);

	const [campusErrors, setCampusErrors] = useState([]);

	const { campuses, contacts, isActive, notes, showNotes } = attributes;

	const reminderMessage = `Don't forget to select "Update" or "Publish" on this page as well!`;

	useEffect(() => {
		if (campusSaved) {
			setTimeout(() => {
				setCampusSaved(false);
			}, 5000);
		}
	}, [campusSaved]);

	useEffect(() => {
		if (contactSaved) {
			setTimeout(() => {
				setContactSaved(false);
			}, 5000);
		}
	}, [contactSaved]);

	const toggleCampus = () => setCampusToggle(!campusToggle);

	const saveCampus = () => {
		const phoneIsInternational = campusPhone.length >= 15;
		const formattedPhone = phoneIsInternational
			? { error: false, code: "SUCCESS", value: campusPhone }
			: formatPhone(campusPhone);

		if (formattedPhone.error) {
			setCampusErrors((existingErrors) => {
				return [...existingErrors, formattedPhone.code];
			});

			setTimeout(() => {
				setCampusErrors([]);
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

	const toggleContact = () => setContactToggle(!contactToggle);

	const saveContact = () => {
		toggleContact();
		setAttributes({
			contacts: [
				...contacts,
				{ contactName, contactEmail },
			],
		});
		setContactName("");
		setContactEmail("");
		setContactSaved(true);
	};

	const removeContact = (contactForDeletion) => {
		const newList = contacts.filter(
			(contact) => contact !== contactForDeletion,
		);
		setAttributes({ contacts: newList });
		setContactSaved(true);
	};

	const clearForm = (context) => {
		switch (context.toLowerCase()) {
			case "campus":
				setCampusToggle(false);
				setCampusName("");
				setCampusPhone("");
				break;
			case "contact":
				setContactToggle(false);
				setContactName("");
				setContactEmail("");
				break;
		}
	};

	const handlePanelToggle = (nextValue, context) => {
		if (!nextValue) {
			clearForm(context);
		}
		return;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "department-directory")}>
					<PanelRow>
						<ToggleControl
							label={__(`${isActive ? "Active" : "Inactive"}`, "department-directory")}
							checked={!!isActive}
							onChange={() => setAttributes({ isActive: !isActive })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__("Notes", "department-directory")}
							checked={!!showNotes}
							onChange={() => setAttributes({ showNotes: !showNotes })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={__("Campuses", "department-directory")}
					initialOpen={false}
					onToggle={(nextValue) => handlePanelToggle(nextValue, "campus")}
				>
					{campusErrors.length > 0 && (
						<>
							{campusErrors.map((error) => (
								<PanelRow>
									<div className="department-listing__editor__panel__error with-icon">
										<Icon
											className="department-listing__icon"
											icon="warning"
											size="14"
										/>
										<span>{error}</span>
									</div>
								</PanelRow>
							))}
						</>
					)}

					{campusSaved && <Snackbar>{reminderMessage}</Snackbar>}

					{!campusToggle && (
						<PanelRow>
							<Button variant="secondary" onClick={toggleCampus}>
								Add Campus
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
							clearForm={clearForm}
						/>
					)}

					{campuses.length > 0 && (
						<PanelCampusList campuses={campuses} removeCampus={removeCampus} />
					)}
				</PanelBody>
				<PanelBody
					title={__("Supervisory Contacts", "department-directory")}
					initialOpen={false}
					onToggle={(nextValue) => handlePanelToggle(nextValue, "contact")}
				>
					{contactSaved && <Snackbar>{reminderMessage}</Snackbar>}

					{!contactToggle && (
						<PanelRow>
							<Button variant="secondary" onClick={toggleContact}>
								Add Contact
							</Button>
						</PanelRow>
					)}

					{contactToggle && (
						<ContactsForm
							contactEmail={contactEmail}
							contactName={contactName}
							saveContact={saveContact}
							setContactEmail={setContactEmail}
							setContactName={setContactName}
							clearForm={clearForm}
						/>
					)}

					{contacts.length > 0 && (
						<PanelContactList
							contacts={contacts}
							removeContact={removeContact}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<Status isActive={isActive} />
				<Campuses campuses={campuses} />
				<Contacts contacts={contacts} />
				{showNotes && (
					<Notes setAttributes={setAttributes} notes={notes} context="edit" />
				)}
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
	clearForm,
}) => {
	return (
		<PanelRow>
			<Card>
				<CardBody>
					<TextControl
						label={__("Name", "department-directory")}
						value={campusName}
						onChange={(value) => setCampusName(value)}
						required
					/>
					<TextControl
						label={__("Phone", "department-directory")}
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
					<Button onClick={() => clearForm("campus")} isDestructive={true}>
						Cancel
					</Button>
				</CardBody>
			</Card>
		</PanelRow>
	);
};

const PanelCampusList = ({ campuses, removeCampus }) => {
	return (
		<div className="department-listing__editor__panel__record-list">
			<h2>Added Campuses</h2>
			<ul>
				{campuses.map((campus) => {
					return (
						<li key={campus.campusName}>
							<div>
								<h3 className="department-listing__editor__panel__record-list__attribute">
									{campus.campusName}&nbsp;Campus
								</h3>
								<p className="department-listing__editor__panel__record-list__attribute">
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

const ContactsForm = ({
	contactEmail,
	contactName,
	saveContact,
	setContactEmail,
	setContactName,
	clearForm,
}) => {
	return (
		<PanelRow>
			<Card>
				<CardBody>
					<TextControl
						label={__("Name", "department-directory")}
						value={contactName}
						onChange={(value) => setContactName(value)}
						required
					/>

					<TextControl
						label={__("Email", "department-directory")}
						value={contactEmail}
						onChange={(value) => setContactEmail(value)}
						required
					/>
					<Button
						variant="primary"
						onClick={saveContact}
						disabled={contactName.length < 1}
					>
						Save Contact
					</Button>
					<Button onClick={() => clearForm("contact")} isDestructive={true}>
						Cancel
					</Button>
				</CardBody>
			</Card>
		</PanelRow>
	);
};

const PanelContactList = ({ contacts, removeContact }) => {
	return (
		<div className="department-listing__editor__panel__record-list">
			<h2>Added Contacts</h2>
			<ul>
				{contacts.map((contact) => {
					return (
						<li key={contact.contactName}>
							<div>
								<h3 className="department-listing__editor__panel__record-list__attribute">
									{contact.contactName}
								</h3>
								<p className="department-listing__editor__panel__record-list__attribute">
									<Icon size="12" icon="email" />
									{contact.contactEmail}
								</p>
							</div>
							<Button
								icon="remove"
								iconSize="14"
								title="Remove contact"
								size="small"
								isDestructive="true"
								onClick={() => removeContact(contact)}
							></Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
