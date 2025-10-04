function Favorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

  if (favorites.length === 0)
    return <p className="text-center text-gray-600 mt-10">No favorite sites yet.</p>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Favorite Sites</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((site: any) => (
          <div
            key={site.id}
            className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition"
          >
            <img
              src={site.image}
              alt={site.name}
              className="rounded-xl mb-2 h-40 w-full object-cover"
            />
            <h3 className="font-semibold">{site.name}</h3>
            <p className="text-sm text-gray-600">{site.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
