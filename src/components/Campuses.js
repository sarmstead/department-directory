export default function Campuses({ campuses }) {
	const stylePhone = (number, isExtension = false) => {
		const beforeExtension = number.slice(0, 10);
		const extension = number.slice(10);

		if (isExtension) {
			return extension;
		}

		return beforeExtension;
	};
	return (
		<>
			{campuses.length > 0 && (
				<div className="knight-finder__campus-list">
					<h3>Campus Directory</h3>
					<table>
						<thead>
							<tr>
								<td>Name</td>
								<td>Phone</td>
							</tr>
						</thead>
						<tbody>
							{campuses.map((campus) => {
								return (
									<tr key={campus.campusName}>
										<td>{campus.campusName}</td>
										<td>
											{stylePhone(campus.campusPhone)}
											<strong>{stylePhone(campus.campusPhone, true)}</strong>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
