"use client"

import { useState, useEffect } from "react"
import GenderSelection from "@/components/quiz/GenderSelection"
import QuizSteps from "@/components/quiz/QuizSteps"
import OfferPage from "@/components/quiz/OfferPage"

export interface QuizData {
  age: string
  gender: string
  diet: string[]
  glutenFreePizza: string
  sourdough: string
  recipeTypes: string[]
  cookingSkills: string
  lowCarbReasons: string[]
  allergies: string[]
  recipeFrequency: string
  prepTime: string
  newRecipes: string
  appliances: string[]
  cookingFrequency: string
  mealPrep: string
  shoppingLists: string
  importantFeatures: string[]
  name: string
  email: string
}

export const initialQuizData: QuizData = {
  age: "",
  gender: "",
  diet: [],
  glutenFreePizza: "",
  sourdough: "",
  recipeTypes: [],
  cookingSkills: "",
  lowCarbReasons: [],
  allergies: [],
  recipeFrequency: "",
  prepTime: "",
  newRecipes: "",
  appliances: [],
  cookingFrequency: "",
  mealPrep: "",
  shoppingLists: "",
  importantFeatures: [],
  name: "",
  email: "",
}

// 📊 Google Analytics Tracking Function
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "FlourCraft_Quiz",
      event_label: "Quiz_Funnel",
      ...parameters,
    })
  }
}

export default function LowCarbQuiz() {
  const [currentPage, setCurrentPage] = useState<"gender" | "quiz" | "offer">("gender")
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData)

  // Track quiz start
  useEffect(() => {
    trackEvent("quiz_started", {
      step: "gender_selection",
      step_number: 0,
    })
  }, [])

  const handleGenderComplete = (gender: string) => {
    setQuizData((prev) => ({ ...prev, gender }))

    // Track gender selection
    trackEvent("gender_selected", {
      gender: gender,
      step: "gender_complete",
      step_number: 1,
    })

    setCurrentPage("quiz")
  }

  const handleQuizComplete = (data: QuizData) => {
    setQuizData(data)

    // Track quiz completion
    trackEvent("quiz_completed", {
      step: "quiz_complete",
      step_number: 30,
      has_email: !!data.email,
      has_name: !!data.name,
    })

    setCurrentPage("offer")
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "gender":
        return <GenderSelection onComplete={handleGenderComplete} />
      case "quiz":
        return <QuizSteps initialData={quizData} onComplete={handleQuizComplete} />
      case "offer":
        return <OfferPage quizData={quizData} />
      default:
        return <GenderSelection onComplete={handleGenderComplete} />
    }
  }

  return renderCurrentPage()
}
