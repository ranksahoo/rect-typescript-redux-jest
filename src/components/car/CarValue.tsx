import { useAppSelector } from '@store/index'
import { Car } from '@store/slices/carsSlice'
function CarValue() {
  // const totalCost = useSelector(({ cars: { data, searchTerm } }: any) => {
  //   const filteredCars = data.filter((car: any) => {
  //     return car.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  //   return filteredCars.reduce((acc: number, car: any) => {
  //     return acc + car.cost;
  //   }, 0);
  // });

  const totalCost = useAppSelector(({ cars: { data, searchTerm } }) =>
    data
      .filter((car: Car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((acc: number, car: Car) => acc + car.cost, 0),
  )

  return <div className='car-value'>Total Cost: ${totalCost}</div>
}
export default CarValue
