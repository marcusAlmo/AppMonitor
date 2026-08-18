import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('renders the header correctly', () => {
    render(<App />)
    expect(screen.getByText(/AppMonitor \/\/ Core Output/i)).toBeInTheDocument()
  })

  it('increments the count on button click', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const countDisplay = screen.getByText(/Telemetry Log Volume/i).previousSibling
    const initialText = countDisplay?.textContent
    
    const button = screen.getByRole('button', { name: /Trigger System Log/i })
    await user.click(button)
    
    expect(countDisplay?.textContent).not.toBe(initialText)
  })
})
