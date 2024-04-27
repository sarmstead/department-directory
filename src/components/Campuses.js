import { findCampus } from "../utils";

export default function Campuses({ campuses }) {
	const stylePhone = (number, isExtension = false) => {
		const beforeExtension = number.slice(0, 10);
		const extension = number.slice(10);

		if (isExtension) {
			return extension;
		}

		return beforeExtension;
	};

	const florham = findCampus(campuses, "Florham")
	const metropolitan = findCampus(campuses, "Metropolitan")
	const vancouver = findCampus(campuses, "Vancouver")
	const wroxton = findCampus(campuses, "Wroxton")
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
