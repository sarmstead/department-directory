export default function Campuses({ campuses }) {
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
									<tr>
										<td>{campus.campusName}</td>
										<td>{campus.campusPhone}</td>
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
