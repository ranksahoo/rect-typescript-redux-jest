import React from 'react'
import { render, screen } from '@testing-library/react'
import Greet from './Greet'

describe.skip('Greet', () => {
  test('Greet renders correctly', () => {
    render(<Greet />)
    const linkElement = screen.getByText(/Greet/i)
    expect(linkElement).toBeInTheDocument()
  })
})
describe.only('Greet2', () => {
  test('Greet renders with name', () => {
    render(<Greet name="Ranjan" />)
    const linkElement = screen.getByText(/Greet Ranjan/i)
    expect(linkElement).toBeInTheDocument()
  })
})

test.skip('Greet renders with other name', () => {
  render(<Greet name="Sahoo" />)
  const linkElement = screen.getByText(/Greet Sahoo/i)
  expect(linkElement).toBeInTheDocument()
})

test.only('Greet renders with other name', () => {
  render(<Greet name="Sahoo" />)
  const linkElement = screen.getByText(/Greet Sahoo/i)
  expect(linkElement).toBeInTheDocument()
})
