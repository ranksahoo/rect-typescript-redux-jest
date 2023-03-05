import { useAppDispatch, useAppSelector, removeCar } from '@store/index'
import { Car } from '@store/slices/carsSlice'

function CarList() {
  const dispatch = useAppDispatch()
  const { cars, name } = useAppSelector(({ form, cars: { data, searchTerm } }) => {
    const filteredCars = data.filter((car: Car) => {
      return car.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    return {
      cars: filteredCars,
      name: form.name,
    }
  })

  const handleCarDelete = (car: Car) => {
    if (car.id) dispatch(removeCar(car.id))
  }
  const renderedCars = cars.map((car: Car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase())
    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button className="button is-danger" onClick={() => handleCarDelete(car)}>
          Delete
        </button>
      </div>
    )
  })
  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  )
}
export default CarList
