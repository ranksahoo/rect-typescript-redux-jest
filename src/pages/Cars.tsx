// import './styles.css'
// import Image from './assets/images/images.png'
// import Logo from './assets/images/logo.svg'
// import { ClickCounter } from './ClickCounter'
// export const App = () => {
//   return (
//     <>
//       <h1>React typescript app</h1>
//       <img src={Image} alt="logo pic" width="300" height="200" />
//       <img src={Logo} alt="logo pic" width="300" height="200" />
//       <ClickCounter />
//     </>
//   )
// }
import '../styles/Cars.css'
import CarForm from '../components/CarForm'
import CarList from '../components/CarList'
import CarSearch from '../components/CarSearch'
import CarValue from '../components/CarValue'

function Cars() {
  return (
    <div className="containe is-fluid">
      <CarForm />
      <CarSearch />
      <CarList />
      <CarValue />
    </div>
  )
}

export default Cars
