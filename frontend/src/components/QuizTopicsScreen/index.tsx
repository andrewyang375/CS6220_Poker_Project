import { useQuiz } from '../../context/QuizContext'
import { quizTopics } from '../../data/quizTopics'
import { ScreenTypes } from '../../types'

import cn from 'classnames'
import Button from '../ui/Button'
import CenterCardContainer from '../ui/CenterCardContainer'
import HighlightedText from '../ui/HighlightedText'
import PageCenter from '../ui/PageCenter'

const QuizTopicsScreen: React.FC = () => {
  const { quizTopic, selectQuizTopic, setCurrentScreen } = useQuiz()

  const goToQuizDetailsScreen = () => {
    setCurrentScreen(ScreenTypes.QuizDetailsScreen)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <div className="mb-8 text-center md:mb-12">
          <div className="text-6xl font-bold text-theme-color">🃏</div>
        </div>
        <h2 className="mb-5 text-center text-3xl font-bold">
          WELCOME TO <HighlightedText> POKER THEORY PRACTICE</HighlightedText>
        </h2>
        <p className="text-center text-xl leading-7 font-medium">
          Master poker strategy with interactive flashcards and AI explanations.
        </p>
        <div className="mt-10 mb-11 flex max-w-full flex-wrap justify-center gap-5 md:max-w-[60%] md:gap-7">
          {quizTopics.map(({ title, icon, disabled }) => (
            <div
              key={title}
              onClick={() => !disabled && selectQuizTopic(title)}
              className={cn(
                'flex items-center rounded-xl p-3 transition-colors duration-500 ease-out [-webkit-tap-highlight-color:_transparent] [tap-highlight-color:_transparent] md:px-3 md:py-4',
                disabled
                  ? 'bg-disabled-card cursor-not-allowed'
                  : 'bg-select-topic-bg cursor-pointer',
                quizTopic === title
                  ? `border-theme-color border-2`
                  : `border-disabled-button border`
              )}
            >
              {icon}
              <span className="ml-3 text-base font-medium md:text-lg md:font-semibold">
                {title}
              </span>
            </div>
          ))}
        </div>

        <Button text="Continue" onClick={goToQuizDetailsScreen} bold />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizTopicsScreen
