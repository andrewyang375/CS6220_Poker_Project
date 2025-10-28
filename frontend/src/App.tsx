import { useEffect, useState } from 'react'
import Main from './components/Main'
import ToggleTheme from './components/ui/ToggleTheme'
import QuizProvider from './context/QuizProvider'
import { api } from './lib/api'

function App() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [apiStatus, setApiStatus] = useState('')
  const [randomHand, setRandomHand] = useState<any>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setCurrentTheme(savedTheme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  useEffect(() => {
    async function checkBackend() {
      try {
        const health = await api.health()
        setApiStatus(health.ok ? 'Connected to Flask API' : ' API unreachable')
        const hand = await api.randomHand()
        setRandomHand(hand)
      } catch (e: any) {
        setApiStatus(e.message)
      }
    }
    checkBackend()
  }, [])

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentTheme(checked ? 'dark' : 'light')
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }

  return (
    <QuizProvider>
      <ToggleTheme
        onChange={toggleTheme}
        currentTheme={currentTheme}
        checked={currentTheme === 'dark'}
        id="toggleTheme"
        value="theme"
      />

      {}
      <div className="fixed bottom-2 right-2 text-xs opacity-70 text-gray-500 dark:text-gray-300">
        {apiStatus}
      </div>

      {randomHand && (
        <pre className="fixed bottom-8 right-2 bg-gray-100 dark:bg-gray-800 text-xs p-2 rounded shadow max-w-[300px] max-h-[200px] overflow-auto">
          {JSON.stringify(randomHand, null, 2)}
        </pre>
      )}

      <Main />
    </QuizProvider>
  )
}

export default App
