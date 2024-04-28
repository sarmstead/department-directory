export default function Tags({tags}) {
  if (!tags) return null

  return (
    <section className="department-listing__tags">
      <h3>Tags</h3>
      <ul>
        {(tags && tags?.length > 0) && (
          tags?.map(tag => (
            <li key={tag}><a href={`/?tag=${tag}`}>{tag}</a></li>
          ))
        )}
      </ul>
    </section>
  )
}
