import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('renders the header correctly', () => {
    render(<App />)
    expect(screen.getByText(/Get started/i)).toBeInTheDocument()
  })

  it('increments the count on button click', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const button = screen.getByRole('button', { name: /Count is/i })
    const initialText = button.textContent
    
    await user.click(button)
    expect(button.textContent).not.toBe(initialText)
  })
})
