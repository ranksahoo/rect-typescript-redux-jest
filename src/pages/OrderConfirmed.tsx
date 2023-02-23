import { useNavigate } from 'react-router-dom'
const OrderConfirmed = () => {
  const navigate = useNavigate()
  const handlerClick = () => {
    navigate(-1)
  }
  return (
    <>
      <div>Order Confirmed Page</div>
      <button onClick={handlerClick}>Back</button>
    </>
  )
}
export default OrderConfirmed
