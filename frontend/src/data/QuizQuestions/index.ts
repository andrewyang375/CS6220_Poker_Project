import { generalKnowledge } from './generalKnowledge'
import { javascript } from './javascript'
import { python } from './python'
import { react } from './react'
import { poker } from './poker'
import { preflop } from './preflop'
import { postflop } from './postflop'
import { tournament } from './tournament'
import { cashgame } from './cashgame'
import { mixed } from './mixed'


type Choice = string
type CorrectAnswers = string[]

export type Question = {
  question: string
  choices: Choice[]
  type: 'MCQs' | 'MAQs' | 'boolean'
  correctAnswers: CorrectAnswers
  score: number
  code?: string
  image?: string
  explanations?: Record<string, string>
}

export type Topic = {
  topic: string
  level: string
  totalQuestions: number
  totalScore: number
  questions: Question[]
}

export const quiz: Record<string, Topic> = {
  JavaScript: javascript,
  React: react,
  Python: python,
  'General Knowledge': generalKnowledge,
  'Poker Strategy': poker,
  'Pre-Flop Strategy': preflop,
  'Post-Flop Play': postflop,
  'Tournament Strategy': tournament,
  'Cash Game Theory': cashgame,
  'Mixed Practice': mixed,
}
