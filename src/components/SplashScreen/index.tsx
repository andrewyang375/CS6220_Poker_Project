import { useEffect, useState } from 'react'
import PageCenter from '../ui/PageCenter'

const SplashScreen = () => {
  const [logoSize, setLogoSize] = useState(0.25)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setLogoSize(0.75)
      } else {
        setLogoSize(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PageCenter justifyCenter>
      <div className="text-center">
        <div 
          className="text-theme-color transition-all duration-1000 mb-4"
          style={{ 
            scale: logoSize,
            fontSize: '8rem'
          }}
        >
          🃏
        </div>
        <h1 className="text-4xl font-bold text-theme-color mb-2">
          Poker Theory Practice
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Master poker strategy with interactive flashcards
        </p>
      </div>
    </PageCenter>
  )
}

export default SplashScreen
