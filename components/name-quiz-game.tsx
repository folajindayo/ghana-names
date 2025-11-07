'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, CheckCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'What does the name "Kwame" mean?',
    options: ['Born on Saturday', 'Born on Sunday', 'Born on Friday', 'Born on Monday'],
    correctAnswer: 0,
    explanation: 'Kwame is the Akan name for boys born on Saturday.',
  },
  {
    question: 'Which day name is "Akosua" associated with?',
    options: ['Monday', 'Wednesday', 'Sunday', 'Friday'],
    correctAnswer: 2,
    explanation: 'Akosua is the Akan name for girls born on Sunday.',
  },
  {
    question: 'What is the male equivalent of "Ama"?',
    options: ['Kwame', 'Kofi', 'Kojo', 'Kwaku'],
    correctAnswer: 0,
    explanation: 'Both Ama and Kwame are names for Saturday-born children, with Ama being female and Kwame being male.',
  },
  {
    question: 'Which tribe is known for day names?',
    options: ['Ewe', 'Akan', 'Ga', 'Dagomba'],
    correctAnswer: 1,
    explanation: 'The Akan people of Ghana have a traditional naming system based on the day of the week a child is born.',
  },
  {
    question: 'What does "Kofi" mean?',
    options: ['Born on Thursday', 'Born on Friday', 'Born on Tuesday', 'Born on Wednesday'],
    correctAnswer: 1,
    explanation: 'Kofi is the Akan name for boys born on Friday.',
  },
]

export function NameQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnsweredQuestions(new Set())
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Already answered

    setSelectedAnswer(answerIndex)
    const question = quizQuestions[currentQuestion]
    const isCorrect = answerIndex === question.correctAnswer

    if (isCorrect) {
      setScore((prev) => prev + 1)
      toast({
        title: "Correct!",
        description: question.explanation,
      })
    } else {
      toast({
        title: "Incorrect",
        description: question.explanation,
        variant: "destructive",
      })
    }

    setAnsweredQuestions((prev) => new Set([...prev, currentQuestion]))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    startQuiz()
  }

  const getScoreBadge = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) return { text: 'Perfect!', color: 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50' }
    if (percentage >= 80) return { text: 'Excellent!', color: 'bg-green-500/40 text-green-100 border-green-400/50' }
    if (percentage >= 60) return { text: 'Good!', color: 'bg-blue-500/40 text-blue-100 border-blue-400/50' }
    return { text: 'Keep Learning!', color: 'bg-orange-500/40 text-orange-100 border-orange-400/50' }
  }

  if (!quizStarted) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Name Quiz Game
          </CardTitle>
          <CardDescription className="text-white/70">
            Test your knowledge of Ghanaian names
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center">
            <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ghanaian Names Quiz</h3>
            <p className="text-white/70 text-sm mb-4">
              Answer {quizQuestions.length} questions about Ghanaian naming traditions and meanings.
            </p>
            <Button
              onClick={startQuiz}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResult) {
    const badge = getScoreBadge()
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <Badge variant="secondary" className={`${badge.color} text-lg px-4 py-2 mb-4`}>
              {badge.text}
            </Badge>
            <h3 className="text-3xl font-bold text-white mb-2">
              {score} / {quizQuestions.length}
            </h3>
            <p className="text-white/70 text-sm mb-6">
              You scored {Math.round((score / quizQuestions.length) * 100)}%
            </p>
            <Button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]
  const isAnswered = selectedAnswer !== null
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Question {currentQuestion + 1} of {quizQuestions.length}
        </CardTitle>
        <CardDescription className="text-white/70">
          Score: {score} / {quizQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectOption = index === question.correctAnswer
              let buttonClass = 'bg-white/10 border-white/20 text-white hover:bg-white/20'

              if (isAnswered) {
                if (isCorrectOption) {
                  buttonClass = 'bg-green-500/40 border-green-400/50 text-green-100'
                } else if (isSelected && !isCorrectOption) {
                  buttonClass = 'bg-red-500/40 border-red-400/50 text-red-100'
                }
              } else if (isSelected) {
                buttonClass = 'bg-blue-500/40 border-blue-400/50 text-blue-100'
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start ${buttonClass} ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center gap-3 w-full">
                    {isAnswered && isCorrectOption && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <span className="flex-1 text-left">{option}</span>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {isAnswered && (
          <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
            <p className="text-white/80 text-sm">{question.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <Button
            onClick={nextQuestion}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

