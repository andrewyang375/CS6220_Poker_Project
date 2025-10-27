import { ReactNode } from 'react'
import BulbIcon from '../assets/icons/bulb.svg?react'
import CheckIcon from '../assets/icons/check.svg?react'
import TimerIcon from '../assets/icons/timer.svg?react'
import StartIcon from '../assets/icons/start.svg?react'
import RefreshIcon from '../assets/icons/refresh.svg?react'

type QuizTopic = {
  title: string
  icon: ReactNode
  disabled?: boolean
}

export const quizTopics: QuizTopic[] = [
  {
    title: 'Pre-Flop Strategy',
    icon: <StartIcon />,
  },
  {
    title: 'Post-Flop Play',
    icon: <CheckIcon />,
  },
  {
    title: 'Tournament Strategy',
    icon: <TimerIcon />,
  },
  {
    title: 'Cash Game Theory',
    icon: <BulbIcon />,
  },
  {
    title: 'Mixed Practice',
    icon: <RefreshIcon />,
  },
]
