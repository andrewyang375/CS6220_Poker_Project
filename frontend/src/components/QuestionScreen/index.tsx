import { FC, useEffect, useMemo, useState } from 'react'
import { CheckIcon, Next } from '../../config/icons'
import PageCenter from '../ui/PageCenter'
import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import QuizHeader from './QuizHeader'
import Question from './Question'
import ExplanationModal from '../ExplanationModal'
import { api, RandomQuestion } from '../../lib/api'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

type LocalQuestion = {
  id: string
  question: string
  type: 'MCQs' | 'boolean' | 'MAQs'
  choices: string[]
  correctAnswers: string[]
  code?: string
  image?: string
}

const toLocal = (rq: RandomQuestion): LocalQuestion => ({
  id: rq.id,
  question: rq.instruction,
  type: 'MCQs',
  choices: rq.choices,
  correctAnswers: [rq.correctAnswer],
})

const QuestionScreen: FC = () => {
  const { quizDetails, setCurrentScreen, result, setResult } = useQuiz()

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0)
  const [current, setCurrent] = useState<LocalQuestion | null>(null)

  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [showResultModal, setShowResultModal] = useState<boolean>(false)
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false)
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<string>('')

  const [explanationsMap, setExplanationsMap] = useState<Record<string, string>>({})

  const totalQuestions = useMemo(
    () => quizDetails?.totalQuestions ?? 10,
    [quizDetails?.totalQuestions]
  )

  const fetchNext = async () => {
    setLoading(true)
    setError('')
    try {
      // optionally pass stage: 'preflop' | 'postflop'
      const rq = await api.randomQuestion()
      setCurrent(toLocal(rq))
      setSelectedAnswer([])
    } catch (e: any) {
      setError(e?.message || 'Failed to load question')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!current) return
    const { name, checked } = e.target
    if (current.type === 'MAQs') {
      setSelectedAnswer((prev) =>
        prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
      )
    } else {
      if (checked) setSelectedAnswer([name])
    }
  }

  const proceedToNext = async () => {
    if (!current) return
    const isMatch =
      selectedAnswer.length === current.correctAnswers.length &&
      selectedAnswer.every((ans) => current.correctAnswers.includes(ans))

    setResult([
      ...result,
      {
        ...current,
        selectedAnswer,
        isMatch,
      },
    ])

    setShowExplanationModal(false)
    setExplanationsMap({})
    setCurrentSelectedAnswer('')

    const last = activeQuestionIdx >= totalQuestions - 1
    if (last) {
      setShowResultModal(true)
    } else {
      setActiveQuestionIdx((p) => p + 1)
      await fetchNext()
    }
  }

  const onClickNext = async () => {
    if (!current || selectedAnswer.length === 0) return
    const selected = selectedAnswer[0]
    const correct = current.correctAnswers[0]
    setCurrentSelectedAnswer(selected)

    try {
      const { explanation } = await api.explain(current.question, selected, correct)
      setExplanationsMap({
        [selected]: explanation,
        [correct]: explanation,
      })
      setShowExplanationModal(true)
    } catch (e: any) {
      const fallback =
        selected === correct
          ? `Correct — ${correct} fits optimal play given the action flow and board texture.`
          : `${correct} is better in this spot; ${selected} either over- or under-realizes equity given typical ranges here.`
      setExplanationsMap({
        [selected]: fallback,
        [correct]: fallback,
      })
      setShowExplanationModal(true)
    }
  }

  const handleResultModalClose = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  return (
    <PageCenter>
      <div className="mt-3 mb-5 text-center md:my-12">
        <div className="text-4xl font-bold text-theme-color">🃏</div>
      </div>

      <div className="bg-card-bg relative mb-18 min-h-[500px] w-full rounded-sm p-4 pb-20 md:w-[900px] md:px-14 md:pt-8">
        <QuizHeader activeQuestion={activeQuestionIdx} totalQuestions={totalQuestions} />

        {loading && (
          <div className="py-12 text-center text-lg">Loading a great spot for you…</div>
        )}
        {error && (
          <div className="py-12 text-center text-red-500">
            {error}{' '}
            <button className="underline" onClick={fetchNext}>
              Try again
            </button>
          </div>
        )}
        {!loading && !error && current && (
          <Question
            question={current.question}
            code={current.code}
            image={current.image}
            type={current.type}
            choices={current.choices}
            selectedAnswer={selectedAnswer}
            handleAnswerSelection={handleAnswerSelection}
          />
        )}

        <div className="absolute right-4 bottom-8 flex w-[90%] justify-end gap-5 md:right-15 md:w-auto md:justify-normal">
          <Button
            text={activeQuestionIdx === totalQuestions - 1 ? 'Finish' : 'Next'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={!current || selectedAnswer.length === 0 || loading || !!error}
          />
        </div>
      </div>

      {showExplanationModal && current && (
        <ExplanationModal
          isOpen={showExplanationModal}
          onClose={proceedToNext}
          selectedAnswer={currentSelectedAnswer}
          correctAnswer={current.correctAnswers[0]}
          explanations={explanationsMap}
        />
      )}

      {showResultModal && (
        <ModalWrapper
          title="Done!"
          subtitle={`You have attempted ${result.length} questions in total.`}
          onClick={handleResultModalClose}
          icon={<CheckIcon />}
          buttonTitle="SHOW RESULT"
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
