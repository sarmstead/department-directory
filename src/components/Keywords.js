export default function Keywords({tags, postType}) {
  if (!tags) return null

  return (
    <section className="department-listing__keywords">
      <h3>Keywords</h3>
      <ul className="department-listing__keywords__list">
        {(tags && tags?.length > 0) && (
          tags?.map(tag => (
            <li key={tag} className="department-listing__keywords__list__item">{tag}</li>
          ))
        )}
      </ul>
    </section>
  )
}
