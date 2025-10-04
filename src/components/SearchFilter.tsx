interface Props {
  onRegionChange: (region: string) => void
}

const regions = ['Cusco', 'Arequipa', 'Puno', 'Lima', 'Iquitos']

function SearchFilter({ onRegionChange }: Props) {
  return (
    <div className="flex justify-center">
      <select
        onChange={(e) => onRegionChange(e.target.value)}
        className="p-2 border rounded-lg shadow"
      >
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SearchFilter
