import React from 'react'
import { render, screen } from '@testing-library/react'
import Greet from './Greet'

test('Greet renders correctly', () => {
  render(<Greet />)
  const linkElement = screen.getByText(/Greet/i)
  expect(linkElement).toBeInTheDocument()
})

test('Greet renders with name', () => {
  render(<Greet name="Ranjan" />)
  const linkElement = screen.getByText(/Greet Ranjan/i)
  expect(linkElement).toBeInTheDocument()
})
