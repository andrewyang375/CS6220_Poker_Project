import { FC } from 'react'
import CodeSnippet from '../../ui/CodeSnippet'
import QuizImage from '../../ui/QuizImage'
import Answer from '../Answer'
import FormattedHand from '../FormattedHand'
import { looksLikePokerPrompt } from '../../../utils/pokerFormat'

interface QuestionTypes {
  question: string
  code?: string
  image?: string
  type: string
  choices: string[]
  selectedAnswer: string[]
  handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const Question: FC<QuestionTypes> = ({
  question,
  code,
  image,
  type,
  choices,
  selectedAnswer,
  handleAnswerSelection,
}) => {
  const isPoker = looksLikePokerPrompt(question)
  return (
    <div className="mt-8 mb-10 max-w-full md:max-w-[88%]">
      {isPoker ? (
        <FormattedHand instruction={question} />
      ) : (
        <h2 className="text-primary-text mb-6 text-[18px] leading-[1.3] font-medium sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[28px]">
          {question}
        </h2>
      )}
      {code && <CodeSnippet code={code} language="javascript" />}
      {image && <QuizImage image={image} />}
      <div className="max-w-full md:max-w-[78%]">
        {choices.map((choice, index) => (
          <Answer
            choice={choice}
            index={index}
            key={index}
            onChange={(e) => handleAnswerSelection(e, index)}
            type={type}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </div>
    </div>
  )
}

export default Question
