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
import Keywords from "./components/Keywords";
import "./editor.scss";
import { findCampus, findCampusIndex, formatPhone } from "./utils";

export default function Edit({ attributes, context: {postType}, setAttributes }) {
	const { campuses, contacts, isActive, notes, showNotes, tags } = attributes;

	const [campusList, setCampusList] = useState(campuses);

	const [contactName, setContactName] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [contactToggle, setContactToggle] = useState(false);

	const [contactSaved, setContactSaved] = useState(false);
	const [campusSaved, setCampusSaved] = useState(false);

	const [campusErrors, setCampusErrors] = useState([]);

	const reminderMessage = `Don't forget to select "Update" or "Publish" on this page as well!`;

	const tagMeta = postType.includes('epkb') ? {type: 'epkb_post_type_1_tag', slug: 'epkb_post_type_1_tag'} : {type: 'tag', slug: 'post_tag'}
	const tagIds = wp.data.select('core/editor').getEditedPostAttribute(tagMeta.type)
  const tagsData = wp.data.select( 'core' ).getEntityRecords( 'taxonomy', tagMeta.slug, { include: tagIds })

	useEffect(() => {
		if (tagsData) {
			setAttributes({tags: tagsData.map(({name}) => name)})
		}
	}, tagsData)

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

	const updateCampusList = (value, campusName) => {
		const mutatedArr = [...campusList]
		const targetCampusIndex = findCampusIndex(mutatedArr, campusName)
		mutatedArr[targetCampusIndex] = { campusName, campusPhone: value}

		setCampusList(mutatedArr)
	}

	const saveCampus = (id) => {
		const targetCampus = findCampus(campusList, id)
		const phoneIsInternational = targetCampus.campusPhone.length >= 15;
		const formattedPhone = phoneIsInternational
			? { error: false, code: "SUCCESS", value: targetCampus.campusPhone }
			: formatPhone(targetCampus.campusPhone);

		if (formattedPhone.error) {
			setCampusErrors((existingErrors) => {
				return [...existingErrors, formattedPhone.code];
			});

			setTimeout(() => {
				setCampusErrors([]);
			}, 5000);

			return;
		}

		const mutatedArr = [...campuses]
		const targetCampusIndex = findCampusIndex(mutatedArr, id)
		mutatedArr[targetCampusIndex] = { campusName: id, campusPhone: formattedPhone.value}

		setAttributes({ campuses: mutatedArr });
		setCampusSaved(true)
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
					title={__("Campus Phone Numbers", "department-directory")}
					initialOpen={false}
					onToggle={(nextValue) => handlePanelToggle(nextValue, "campus")}
					className="department-listing__editor__panel__campuses"
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

					<CampusForm
						campusList={campusList}
						name="Florham"
						saveCampus={saveCampus}
						updateCampusList={updateCampusList}
					/>

					<CampusForm
						campusList={campusList}
						name="Metropolitan"
						saveCampus={saveCampus}
						updateCampusList={updateCampusList}
					/>

					<CampusForm
						campusList={campusList}
						name="Vancouver"
						saveCampus={saveCampus}
						updateCampusList={updateCampusList}
					/>

					<CampusForm
						campusList={campusList}
						name="Wroxton"
						saveCampus={saveCampus}
						updateCampusList={updateCampusList}
					/>
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
				{tags.length > 0 && (
					<Keywords tags={tags} postType={postType} />
				)}
			</div>
		</>
	);
}

const CampusForm = ({ campusList, name, saveCampus, updateCampusList }) => {
	return (
		<PanelRow>
			<Card>
				<CardBody>
					<TextControl
						label={__(`${name} Campus`, "department-directory")}
						value={findCampus(campusList, name).campusPhone}
						onChange={(value) => updateCampusList(value, name)}
						type="tel"
						required
					/>
					<Button
						variant="primary"
						onClick={() => saveCampus(name)}
					>
						Save Campus
					</Button>
				</CardBody>
			</Card>
		</PanelRow>
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
		<div className="department-listing__editor__panel__contacts">
			<h2>Added Contacts</h2>
			<ul>
				{contacts.map((contact) => {
					return (
						<li key={contact.contactName}>
							<div>
								<h3 className="department-listing__editor__panel__contacts__attribute">
									{contact.contactName}
								</h3>
								<p className="department-listing__editor__panel__contacts__attribute">
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
