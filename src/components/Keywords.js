export default function Keywords({tags, postType}) {
  if (!tags) return null

  const hrefBase = postType === "epkb_post_type_1" ? "epkb_post_type_1_tag" : "tag"

  return (
    <section className="department-listing__keywords">
      <h3>Keywords</h3>
      <ul className="department-listing__keywords__list">
        {(tags && tags?.length > 0) && (
          tags?.map(tag => (
            <li key={tag} className="department-listing__keywords__list__item"><a href={`/?${hrefBase}=${tag}`} className="department-listing__keywords__list__link">{tag}</a></li>
          ))
        )}
      </ul>
    </section>
  )
}
