import React from 'react'
interface GreetProps {
  name?: string
}
function Greet({ name }: GreetProps) {
  const a = 23
  return <div>Greet {name}</div>
}

export default Greet
