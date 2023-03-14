import { render } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('renders', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<Button text="hello" onClick={() => {}} />)
  })
})
