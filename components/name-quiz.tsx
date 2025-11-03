'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, CheckCircle, XCircle, RotateCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { ghanaianNames } from '@/lib/ghanaian-names'

interface QuizQuestion {
  name: string
  meaning: string
  options: string[]
  correctAnswer: string
}

export function NameQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const { toast } = useToast()

  const generateQuestions = () => {
    const selectedNames = [...ghanaianNames]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)

    const newQuestions: QuizQuestion[] = selectedNames.map((nameData) => {
      // Get 3 random wrong answers
      const wrongAnswers = ghanaianNames
        .filter((n) => n.meaning !== nameData.meaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((n) => n.meaning)

      const options = [nameData.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5)

      return {
        name: nameData.name,
        meaning: nameData.meaning,
        options,
        correctAnswer: nameData.meaning,
      }
    })

    setQuestions(newQuestions)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizComplete(false)
    setQuizStarted(true)
  }

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return // Already answered

    setSelectedAnswer(answer)
    const isCorrect = answer === questions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore(score + 1)
      toast({
        title: "Correct!",
        description: "Well done!",
      })
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer is: "${questions[currentQuestion].correctAnswer}"`,
        variant: "destructive",
      })
    }

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setQuizComplete(true)
      }
    }, 1500)
  }

  if (!quizStarted) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Ghanaian Name Quiz
          </CardTitle>
          <CardDescription className="text-white/70">
            Test your knowledge of Ghanaian names and their meanings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={generateQuestions}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-4xl font-bold text-yellow-400">
            {score} / {questions.length}
          </div>
          <p className="text-white/80">
            You got <strong>{percentage}%</strong> correct!
          </p>
          {percentage === 100 && (
            <Badge className="bg-yellow-500/20 text-yellow-300 text-lg px-4 py-2">
              <Trophy className="mr-2 h-5 w-5" />
              Perfect Score!
            </Badge>
          )}
          <Button
            onClick={generateQuestions}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <CardDescription className="text-white/70">
          Score: {score} / {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">{question.name}</h3>
          <p className="text-white/80">What does this name mean?</p>
        </div>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isCorrectOption = option === question.correctAnswer
            let buttonClass = 'bg-white/10 border-white/20 text-white hover:bg-white/20'

            if (selectedAnswer !== null) {
              if (isCorrectOption) {
                buttonClass = 'bg-green-500/30 border-green-500/50 text-white'
              } else if (isSelected && !isCorrectOption) {
                buttonClass = 'bg-red-500/30 border-red-500/50 text-white'
              }
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant="outline"
                disabled={selectedAnswer !== null}
                className={`w-full ${buttonClass} text-left justify-start h-auto py-3`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {selectedAnswer !== null && isCorrectOption && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                  {selectedAnswer !== null && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

