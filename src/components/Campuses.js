export default function Campuses({ campuses }) {
	const stylePhone = (number, isExtension = false) => {
		const beforeExtension = number.slice(0, 10);
		const extension = number.slice(10);

		if (isExtension) {
			return extension;
		}

		return beforeExtension;
	};

	const findCampus = (id) => campuses.find(({campusName}) => campusName === id)
	const florham = findCampus("Florham")
	const metropolitan = findCampus("Metropolitan")
	const vancouver = findCampus("Vancouver")
	const wroxton = findCampus("Wroxton")
	return (
		<>
			<div className="department-listing__campus-list">
				<h3>Campus Directory</h3>
				<table>
					<thead>
						<tr>
							<td>Name</td>
							<td>Phone</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Florham</td>
							<td>
								{florham.campusPhone.length >= 15 ? (
									<>{florham.campusPhone}</>
								) : (
									<>
										{stylePhone(florham.campusPhone)}
										<strong>
											{stylePhone(florham.campusPhone, true)}
										</strong>
									</>
								)}
							</td>
						</tr>
						<tr>
							<td>Metropolitan</td>
							<td>
								{metropolitan.campusPhone.length >= 15 ? (
									<>{metropolitan.campusPhone}</>
								) : (
									<>
										{stylePhone(metropolitan.campusPhone)}
										<strong>
											{stylePhone(metropolitan.campusPhone, true)}
										</strong>
									</>
								)}
							</td>
						</tr>
						<tr>
							<td>Vancouver</td>
							<td>
								{vancouver.campusPhone.length >= 15 ? (
									<>{vancouver.campusPhone}</>
								) : (
									<>
										{stylePhone(vancouver.campusPhone)}
										<strong>
											{stylePhone(vancouver.campusPhone, true)}
										</strong>
									</>
								)}
							</td>
						</tr>
						<tr>
							<td>Wroxton</td>
							<td>
								{wroxton.campusPhone.length >= 15 ? (
									<>{wroxton.campusPhone}</>
								) : (
									<>
										{stylePhone(wroxton.campusPhone)}
										<strong>
											{stylePhone(wroxton.campusPhone, true)}
										</strong>
									</>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
