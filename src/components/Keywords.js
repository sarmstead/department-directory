export default function Keywords({tags}) {
  if (!tags) return null

  return (
    <section className="department-listing__keywords">
      <h3>Keywords</h3>
      <ul className="department-listing__keywords__list">
        {(tags && tags?.length > 0) && (
          tags?.map(tag => (
            <li key={tag} className="department-listing__keywords__list__item"><a href={`/?tag=${tag}`} className="department-listing__keywords__list__link">{tag}</a></li>
          ))
        )}
      </ul>
    </section>
  )
}
