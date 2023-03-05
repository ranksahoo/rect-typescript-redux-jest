import '@styles/Cars.css'
import CarForm from '@components/car/CarForm'
import CarList from '@components/car/CarList'
import CarSearch from '@components/car/CarSearch'
import CarValue from '@components/car/CarValue'

function Cars() {
  return (
    <div className="container is-fluid">
      <CarForm />
      <CarSearch />
      <CarList />
      <CarValue />
    </div>
  )
}

export default Cars
