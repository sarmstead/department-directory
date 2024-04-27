export default function Contacts({ contacts }) {
	return (
		<>
			{contacts.length > 0 && (
				<section className="department-listing__contact-list">
					<h3>Secondary Contacts</h3>
					<div className="department-listing__contact-list__items">
						{contacts.map((contact) => {
							return (
								<article key={contact.contactName}>
									<p>
										<strong>{contact.contactName}</strong>
									</p>
									<p>{contact.contactPhone}</p>
									<p>{contact.contactEmail}</p>
								</article>
							);
						})}
					</div>
				</section>
			)}
		</>
	);
}
