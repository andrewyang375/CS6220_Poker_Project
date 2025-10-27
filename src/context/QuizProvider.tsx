import { ReactNode, useEffect, useState } from 'react'
import { quiz } from '../data/QuizQuestions'
import { QuizContextTypes, Result, ScreenTypes } from '../types'
import { QuizContext, initialState } from './QuizContext'

type QuizProviderProps = {
  children: ReactNode
}

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
  const [result, setResult] = useState<Result[]>(initialState.result)
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
    initialState.currentScreen
  )

  const [questions, setQuestions] = useState(quiz[initialState.quizTopic].questions)

  const {
    questions: quizQuestions,
    totalQuestions,
    totalScore,
  } = quiz[quizTopic]

  const selectQuizTopic = (topic: string) => {
    setQuizTopic(topic)
  }

  useEffect(() => {
    setQuestions(quizQuestions)
  }, [quizTopic])

  const quizDetails = {
    totalQuestions,
    totalScore,
    selectedQuizTopic: quizTopic,
  }

  const quizContextValue: QuizContextTypes = {
    currentScreen,
    setCurrentScreen,
    quizTopic,
    selectQuizTopic,
    questions,
    setQuestions,
    result,
    setResult,
    quizDetails,
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}

export default QuizProvider
