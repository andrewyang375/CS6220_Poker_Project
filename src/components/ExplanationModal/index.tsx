import { FC, useEffect } from 'react'
import { CheckIcon } from '../../config/icons'
import Button from '../ui/Button'

interface ExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedAnswer: string
  correctAnswer: string
  explanations: Record<string, string>
}

const ExplanationModal: FC<ExplanationModalProps> = ({
  isOpen,
  onClose,
  selectedAnswer,
  correctAnswer,
  explanations
}) => {
  const isCorrect = selectedAnswer === correctAnswer

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-[rgba(0,_0,_0,_0.5)] p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-card-bg flex w-[600px] max-w-[90vw] flex-col items-center rounded-[10px] px-6 py-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            <CheckIcon className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-theme-color text-2xl font-bold mb-4 text-center">
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </h2>

        <div className="space-y-4 w-full">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Your Answer: {selectedAnswer}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {explanations[selectedAnswer] || 'No explanation available.'}
            </p>
          </div>

          {!isCorrect && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Correct Answer: {correctAnswer}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {explanations[correctAnswer] || 'No explanation available.'}
              </p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 Poker Theory Tip
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {isCorrect 
                ? "Great decision! This is a fundamental concept in poker strategy that you've mastered."
                : "Keep studying! Understanding these concepts will improve your poker game significantly."
              }
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button text="Continue" onClick={onClose} bold />
        </div>
      </div>
    </div>
  )
}

export default ExplanationModal
