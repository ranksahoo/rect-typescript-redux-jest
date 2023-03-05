import { useAppDispatch, useAppSelector, changeSearchTerm } from '@store/index'

function CarSearch() {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector((state) => {
    return state.cars.searchTerm
  })
  const handleSearchTermChange = (event) => {
    dispatch(changeSearchTerm(event.target.value))
  }
  return (
    <div className="list-header">
      <h3 className="title is-3">My Cars</h3>
      <div className="search field is-horizontal">
        <label className="label" htmlFor="searchTerm">
          Search
        </label>
        <input
          className="input"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
    </div>
  )
}
export default CarSearch
