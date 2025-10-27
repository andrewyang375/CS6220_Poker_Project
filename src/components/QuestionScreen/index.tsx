import { FC, useEffect, useState } from 'react'
import { CheckIcon, Next } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import PageCenter from '../ui/PageCenter'
import Question from './Question'
import QuizHeader from './QuizHeader'
import ExplanationModal from '../ExplanationModal'

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [showResultModal, setShowResultModal] = useState<boolean>(false)
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false)
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<string>('')

  const {
    questions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion]

  const { question, type, choices, code, image, correctAnswers, explanations } = currentQuestion

  const onClickNext = () => {
    const isMatch: boolean =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer))

    setCurrentSelectedAnswer(selectedAnswer[0] || '')
    
    if (explanations && Object.keys(explanations).length > 0) {
      setShowExplanationModal(true)
    } else {
      proceedToNext()
    }
  }

  const proceedToNext = () => {
    const isMatch: boolean =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer))

    setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }])

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setShowResultModal(true)
    }
    setSelectedAnswer([])
    setShowExplanationModal(false)
  }

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    if (type === 'MAQs') {
      if (selectedAnswer.includes(name)) {
        setSelectedAnswer((prevSelectedAnswer) =>
          prevSelectedAnswer.filter((element) => element !== name)
        )
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name])
      }
    }

    if (type === 'MCQs' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name])
      }
    }
  }

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    if (showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showResultModal])

  return (
    <PageCenter>
      <div className="mt-3 mb-5 text-center md:my-12">
        <div className="text-4xl font-bold text-theme-color">🃏</div>
      </div>
      <div className="bg-card-bg relative mb-18 min-h-[500px] w-full rounded-sm p-4 pb-20 md:w-[900px] md:px-14 md:pt-8">
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetails.totalQuestions}
        />
        <Question
          question={question}
          code={code}
          image={image}
          choices={choices}
          type={type}
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
        />
        <div className="absolute right-4 bottom-8 flex w-[90%] justify-end gap-5 md:right-15 md:w-auto md:justify-normal">
          <Button
            text={activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={selectedAnswer.length === 0}
          />
        </div>
      </div>

      {showExplanationModal && explanations && (
        <ExplanationModal
          isOpen={showExplanationModal}
          onClose={proceedToNext}
          selectedAnswer={currentSelectedAnswer}
          correctAnswer={correctAnswers[0]}
          explanations={explanations}
        />
      )}
      {showResultModal && (
        <ModalWrapper
          title="Done!"
          subtitle={`You have attempted ${result.length} questions in total.`}
          onClick={handleModal}
          icon={<CheckIcon />}
          buttonTitle="SHOW RESULT"
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
