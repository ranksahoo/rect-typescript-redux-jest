import { useAppDispatch, useAppSelector, addCar, changeCost, changeName } from '../../store'

function CarForm() {
  const dispatch = useAppDispatch()
  const { name, cost } = useAppSelector((state) => {
    return state.form
  })
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeName(event.target.value))
  }
  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const carCost = parseInt(event.target.value) || 0
    dispatch(changeCost(carCost))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(addCar({ name, cost }))
  }
  return (
    <div className='car-form panel'>
      <h4 className='subtitle is-3'>Add Car</h4>
      <form onSubmit={handleSubmit}>
        <div className='field-group'>
          <div className='field'>
            <label className='label' htmlFor='name'>
              Name
            </label>
            <input
              className='input is-expanded'
              value={name}
              onChange={handleNameChange}
              name='name'
            />
          </div>
          <div className='field'>
            <label className='label' htmlFor='cost'>
              Cost
            </label>
            <input
              className='input is-expanded'
              value={cost || ''}
              onChange={handleCostChange}
              type='number'
              name='cost'
            />
          </div>
          <div className='field'>
            <button className='button '>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default CarForm
