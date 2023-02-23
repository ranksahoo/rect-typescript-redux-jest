import React from 'react'
interface GreetProps {
  name?: string
}
function Greet({ name }: GreetProps) {
  return <div>Greet {name}</div>
}

export default Greet
