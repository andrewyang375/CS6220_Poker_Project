import { Dispatch, SetStateAction } from 'react'
import { Question } from '../data/QuizQuestions'

export enum ScreenTypes {
  SplashScreen,
  QuizTopicsScreen,
  QuizDetailsScreen,
  QuestionScreen,
  ResultScreen,
}

export interface Result extends Question {
  selectedAnswer: string[]
  isMatch: boolean
}

export type QuizContextTypes = {
  currentScreen: ScreenTypes
  setCurrentScreen: Dispatch<SetStateAction<ScreenTypes>>
  quizTopic: string
  selectQuizTopic: (type: string) => void
  questions: Question[]
  setQuestions: Dispatch<SetStateAction<any[]>>
  result: Result[]
  setResult: Dispatch<SetStateAction<any[]>>
  quizDetails: {
    totalQuestions: number
    totalScore: number
    selectedQuizTopic: string
  }
}
