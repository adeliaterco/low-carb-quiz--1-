"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { QuizData } from "@/app/page"

// 🖼️ IMAGE URLS - EASY TO REPLACE - Just change the URLs below
const QUIZ_IMAGES = {
  // Recipe images
  glutenFreePizza: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/11515a6a-a34d-4cb5-8e84-4192d1058b0e.png",
  sourdoughBread: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a6e46555-106e-49fa-b6e1-df9e34c2c62e.png",
  frenchBaguette: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/19d9acdb-2b59-4e60-a16b-f1a834d14c95.png",
  focaccia: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/5343c40a-6a94-495c-889f-7a6de8af7831.png",
  cheesecake: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/3891df8c-33aa-4861-9dbf-948bfd558a3b.png",
  yogurt: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/9bc4483b-4916-4939-a0e2-f1f0a05dd650.png",
  nutritiousMeals: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/dbe30f49-5192-410f-a294-394e62c55e26.png",
  kitchenSkills: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/8d660fe1-5b34-42ce-a5c5-95eea334bb79.png",
  bloomLearning: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/86fab4ee-c174-4d0d-9e0c-6befd221d166.png",

  // Credibility image
  credibilityImage:
    "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/911999c6-305c-4dd8-b8ff-dadba9edcef5.png",

  // 👥 TESTIMONIAL PEOPLE PHOTOS - EASY TO CHANGE
  testimonials: {
    person1: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/01.png",
    person2: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/02.png",
    person3: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/8db332e349f045c0e1949cb88c6096d4.jpg",
    person4: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/05-fernando.png",
    person5: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/1-DEPOIMENTO.png",
  },

  // 📱 FACEBOOK REVIEWS - Using same photos (repeating some as requested)
  facebookReviews: {
    fbPerson1: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/01.png", // Same as person1
    fbPerson2: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/02.png", // Same as person2
    fbPerson3: "https://nutricaoalimentos.shop/wp-content/uploads/2025/06/8db332e349f045c0e1949cb88c6096d4.jpg", // Same as person3
  },
}

// 🚀 IMAGE OPTIMIZATION COMPONENT
const OptimizedImage = ({
  src,
  alt,
  className,
  fallback = "👤",
  width = 48,
  height = 48,
}: {
  src: string
  alt: string
  className: string
  fallback?: string
  width?: number
  height?: number
}) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.currentTarget.src = `/placeholder.svg?height=${height}&width=${width}&text=${fallback}`
      }}
      style={{
        objectFit: "cover",
        aspectRatio: "1/1",
      }}
    />
  )
}

// 📊 Google Analytics Tracking Function
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "FlourCraft_Quiz",
      event_label: "Quiz_Steps",
      ...parameters,
    })
  }
}

interface QuizStepsProps {
  initialData: QuizData
  onComplete: (data: QuizData) => void
}

export default function QuizSteps({ initialData, onComplete }: QuizStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>(initialData)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const steps = [
    // Step 0: Age (Page 2) - ATUALIZADO
    {
      title: "What's your age?",
      subtitle: "This helps us **customize recipes** that fit your **lifestyle perfectly**",
      type: "single",
      required: true,
      options: ["20s", "30s", "40s", "50s", "60s", "70s", "80s+"],
    },

    // Step 1: Social Proof (Page 3) - ATUALIZADO - NÚMEROS CONSISTENTES
    {
      title: "Join 85,000+ home cooks who transformed their kitchens with FlourCraft",
      subtitle:
        '"FlourCraft makes discovering **amazing gluten free recipes** simple, learning **new techniques** fun, and cooking **complete meals** faster than ever"',
      type: "social",
      buttonText: "Continue",
    },

    // Step 2: Diet (Page 4) - ATUALIZADO
    {
      title: "Are you currently following a **specific eating style**?",
      type: "single",
      options: ["Gluten Free", "Dairy free", "Paleo", "Vegan", "Vegetarian", "Keto", "Low Carb"],
    },

    // Step 3: Gluten Free Reasons (Page 5) - ATUALIZADO
    {
      title: "What drives you to choose **Gluten Free living**?",
      type: "multiple",
      required: true,
      options: [
        "Allergy",
        "Improve heart health",
        "Celiac",
        "Improve digestion",
        "Heal my gut",
        "Autoimmune condition",
        "Lose some weight",
        "Reduce inflammation",
        "Gain more energy",
      ],
    },

    // Step 4: Allergies (Page 6) - ATUALIZADO
    {
      title: "Do you have any **food sensitivities** we should know about?",
      type: "multiple",
      required: true,
      options: [
        "🌾 Gluten/Wheat",
        "🥛 Dairy/Lactose",
        "🫘 Soy",
        "🥚 Eggs",
        "🍅 Nightshades",
        "🥜 Nuts",
        "🌽 Corn",
        "🚫 None",
      ],
    },

    // Step 5: Recipe Types (Page 7) - ATUALIZADO
    {
      title: "Which **gluten free creations** excite you most to **master**?",
      type: "multiple",
      required: true,
      options: ["Pizza", "Bread", "Cookies", "Pasta", "Snacks", "Cakes", "Whole meals"],
    },

    // Step 6: Cooking Skills (Page 8) - ATUALIZADO
    {
      title: "How would you rate your **kitchen confidence** right now?",
      type: "single",
      options: [
        "🍞 Beginner (still burning toast)",
        "🍳 Intermediate (I follow recipes fine)",
        "👨‍🍳 Experienced (I can freestyle and experiment)",
      ],
    },

    // Step 7: Bloom Learning (Page 9) - ATUALIZADO
    {
      title:
        "FlourCraft unlocks your potential to master **incredible Gluten Free Recipes** and create **complete satisfying meals**",
      type: "info",
      image: QUIZ_IMAGES.bloomLearning,
      buttonText: "Continue",
    },

    // Step 8: Sourdough (Page 10) - ATUALIZADO
    {
      title: "Ready to master the art of",
      titleBold: "Perfect Gluten Free Sourdough?",
      type: "yesno",
      image: QUIZ_IMAGES.sourdoughBread,
    },

    // Step 9: Pizza (Page 11) - ATUALIZADO
    {
      title: "What about creating restaurant-quality",
      titleBold: "Gluten Free Pizza at home?",
      type: "yesno",
      image: QUIZ_IMAGES.glutenFreePizza,
    },

    // Step 10: French Baguette (Page 12) - ATUALIZADO
    {
      title: "Imagine baking authentic",
      titleBold: "Gluten Free French Baguettes",
      type: "yesno",
      required: true,
      image: QUIZ_IMAGES.frenchBaguette,
    },

    // Step 11: Focaccia (Page 14) - ATUALIZADO
    {
      title: "Want to create bakery-style",
      titleBold: "Gluten Free Focaccia?",
      type: "yesno",
      image: QUIZ_IMAGES.focaccia,
    },

    // Step 12: Cheesecake (Page 15) - ATUALIZADO
    {
      title: "How about a decadent",
      titleBold: "Gluten & Dairy Free Raspberry Cheesecake?",
      type: "yesno",
      image: QUIZ_IMAGES.cheesecake,
    },

    // Step 13: Yogurt (Page 16) - ATUALIZADO
    {
      title: "Ready to craft creamy",
      titleBold: "Homemade Probiotic Yogurt?",
      type: "yesno",
      image: QUIZ_IMAGES.yogurt,
    },

    // Step 14: New Recipes (Page 17) - ATUALIZADO
    {
      title: "How many **new recipes** would you like to learn in the **next 30 days**?",
      type: "single",
      options: ["5", "10", "20", "30+"],
    },

    // Step 15: Learning Skills (Page 18) - ATUALIZADO
    {
      title: "With FlourCraft, mastering **25+ exciting**",
      titleBold: "Gluten Free Recipes and pro kitchen techniques",
      titleEnd: "every month feels **effortless**!",
      type: "info",
      image: QUIZ_IMAGES.kitchenSkills,
      buttonText: "Continue",
    },

    // Step 16: Cooking Frequency (Page 19) - ATUALIZADO
    {
      title: "How many times a week do you typically **cook at home**?",
      type: "single",
      options: ["🚫 Almost never", "2️⃣ 1-2 times a week", "4️⃣ 3-5 times a week", "7️⃣ Every day"],
    },

    // Step 17: Meal Prep (Page 20) - ATUALIZADO
    {
      title: "Do you **meal-prep** regularly or prefer **daily fresh cooking**?",
      type: "single",
      options: ["📦 Meal-prep (cook in bulk)", "👨‍🍳 Fresh daily cooking", "🔄 A mix of both"],
    },

    // Step 18: Prep Time (Page 21) - ATUALIZADO
    {
      title: "How much **time** are you willing to spend **preparing each meal**?",
      type: "single",
      options: [
        "⏰ 15 minutes or less",
        "⏰ About 30 minutes",
        "⏰ 45 minutes or more",
        "📅 Weekend prep for the whole week",
      ],
    },

    // Step 19: Nutritious Meals (Page 22) - ATUALIZADO
    {
      title: "Discover **150+ Nourishing Meals** that come together in just **25 minutes**",
      subtitle:
        "**Morning energy bowls**, **satisfying snacks**, **comforting mains**, and **flavorful sides** - transform simple ingredients into **gut-loving**, **family-favorite** dishes.",
      type: "info",
      image: QUIZ_IMAGES.nutritiousMeals,
      buttonText: "Continue",
    },

    // Step 20: Appliances (Page 22) - ATUALIZADO
    {
      title: "Which **cooking appliances** do you have at home?",
      subtitle: "Select all that apply",
      type: "multiple",
      options: [
        "🔥 Stove/oven",
        "🍲 Instant Pot or Pressure Cooker",
        "🥤 Blender or Food Processor",
        "🍟 Air Fryer",
        "🍲 Slow Cooker",
      ],
    },

    // Step 21: Recipe Frequency (Page 23) - ATUALIZADO
    {
      title: "How often would you like to receive **new recipes** and **meal ideas**?",
      type: "single",
      options: ["☀️ Every Day", "🌓 Every Week", "🌙 Once a Month"],
    },

    // Step 22: Shopping Lists (Page 24) - ATUALIZADO
    {
      title: "Would you like **personalized shopping lists** created automatically based on your **meal plan**?",
      type: "single",
      options: ["😊 Yes, definitely", "😊 Maybe, sometimes"],
    },

    // Step 23: Credibility (Page 25) - ATUALIZADO
    {
      title: "Crafted by **culinary experts**. Validated by **nutrition science**.",
      type: "credibility",
      buttonText: "Continue",
    },

    // Step 24: Important Features (Page 26) - ATUALIZADO - REMOVIDO "Choose 2"
    {
      title: "What are the most **important features** to you?",
      type: "multiple",
      maxSelections: 2,
      options: [
        "💰 Budget-friendly recipes",
        "🥗 Nutritionist-approved meal ideas",
        "📋 Personalized weekly meal plans",
        "🎥 Step by step video tutorials",
        "🍽️ Large variety of healthy recipes",
        "⏰ Time-saving cooking methods",
        "🎓 Cooking courses",
      ],
    },

    // Step 25: Email Collection (Page 27) - ATUALIZADO
    {
      title: "Enter your **email** to get your **21-day Culinary Transformation Plan**!",
      type: "email",
    },

    // Step 26: Name Collection (Page 28) - ATUALIZADO
    {
      title: "What's your **name**?",
      type: "name",
    },

    // Step 27: Results Page (Page 29) - ATUALIZADO
    {
      title: "Based on your answers, we've designed your **custom roadmap**",
      type: "result",
      buttonText: "Unlock My Plan",
    },

    // Step 28: Goal Page (Page 30) - ATUALIZADO
    {
      title: "Your mission: **Boost your energy** through **incredibly delicious meals**",
      subtitle: "Created by you, with ❤️",
      type: "info",
      buttonText: "Continue",
    },

    // Step 29: Benefits (Page 31) - ATUALIZADO
    {
      title: "Over the next **21 days**, you'll master **25+ amazing recipes**",
      subtitle: "**Fresh inspiration** delivered **weekly**",
      type: "info",
      buttonText: "Continue",
    },

    // Step 30: Final Benefits (Page 32) - ATUALIZADO
    {
      title: "You'll discover **creative ways** to make **incredible Pizza**",
      subtitle: "plus **countless other mouth-watering dishes**...",
      type: "info",
      buttonText: "Download My Plan",
    },
  ]

  const handleNext = () => {
    const step = steps[currentStep]

    // Track step completion with detailed info
    trackEvent("quiz_step_completed", {
      step_number: currentStep + 2, // +2 because we start from gender (1) then age (2)
      step_type: step.type,
      step_title: step.title.substring(0, 50), // First 50 chars
      selected_options: selectedOptions.join(", "),
      total_steps: steps.length + 2, // +2 for gender and offer page
    })

    // Track specific important steps
    if (step.type === "email") {
      trackEvent("email_collected", {
        email: selectedOptions[0],
        step_number: currentStep + 2,
      })
    }

    if (step.type === "name") {
      trackEvent("name_collected", {
        name: selectedOptions[0],
        step_number: currentStep + 2,
      })
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedOptions([])
    } else {
      // Complete quiz
      onComplete(quizData)
    }
  }

  const handleOptionSelect = (option: string) => {
    const step = steps[currentStep]

    if (step.type === "multiple") {
      const maxSelections = step.maxSelections || Number.POSITIVE_INFINITY
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option))
      } else if (selectedOptions.length < maxSelections) {
        setSelectedOptions([...selectedOptions, option])
      }
    } else {
      setSelectedOptions([option])
    }
  }

  // Function to render text with bold formatting
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* FlourCraft Logo */}
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            {/* Background circle with gradient */}
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#F7931E" />
              </linearGradient>
              <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F8F9FA" />
              </linearGradient>
            </defs>

            {/* Main circle background */}
            <circle cx="32" cy="32" r="30" fill="url(#bgGradient)" stroke="#E55A2B" strokeWidth="2" />

            {/* Chef hat */}
            <path
              d="M20 28 Q20 22 26 22 Q28 18 32 18 Q36 18 38 22 Q44 22 44 28 L44 32 Q44 34 42 34 L22 34 Q20 34 20 32 Z"
              fill="url(#hatGradient)"
              stroke="#E55A2B"
              strokeWidth="1"
            />

            {/* Hat band */}
            <rect x="20" y="32" width="24" height="4" fill="#E55A2B" rx="2" />

            {/* Wheat stalks (crossed out for gluten-free) */}
            <g transform="translate(15, 40)">
              <path d="M2 8 L2 2 M0 4 L4 4 M0 6 L4 6" stroke="#4CAF50" strokeWidth="1.5" fill="none" />
              <path d="M6 8 L6 2 M4 4 L8 4 M4 6 L8 6" stroke="#4CAF50" strokeWidth="1.5" fill="none" />
              {/* Cross out line */}
              <line x1="0" y1="2" x2="8" y2="8" stroke="#FF4444" strokeWidth="2" />
            </g>

            {/* Sparkles for attention */}
            <circle cx="48" cy="16" r="2" fill="#FFD700" />
            <path
              d="M48 12 L49 14 L51 14 L49.5 15.5 L50 18 L48 16.5 L46 18 L46.5 15.5 L45 14 L47 14 Z"
              fill="#FFD700"
              transform="scale(0.6) translate(15, -5)"
            />

            <circle cx="16" cy="20" r="1.5" fill="#FFD700" />
            <path
              d="M16 17 L16.5 18.5 L18 18.5 L17 19.5 L17.5 21 L16 20 L14.5 21 L15 19.5 L14 18.5 L15.5 18.5 Z"
              fill="#FFD700"
              transform="scale(0.4) translate(25, 15)"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-1">FlourCraft</h2>
          <p className="text-xs text-gray-600 font-medium">Gluten-Free Mastery</p>
        </div>
      </div>

      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {renderTextWithBold(step.title)}
              {step.titleBold && (
                <>
                  <br />
                  <span className="font-bold">{step.titleBold}</span>
                </>
              )}
              {step.titleEnd && (
                <>
                  <br />
                  {renderTextWithBold(step.titleEnd)}
                </>
              )}
              {step.titleBold2 && (
                <>
                  <br />
                  <span className="font-bold">{step.titleBold2}</span>
                </>
              )}
              {step.required && "*"}
            </h1>
            {step.subtitle && (
              <p className="text-gray-600 text-sm whitespace-pre-line">{renderTextWithBold(step.subtitle)}</p>
            )}
          </div>

          {/* Image - OPTIMIZED */}
          {step.image && (
            <div className="mb-6">
              <OptimizedImage
                src={step.image}
                alt="Recipe"
                className="w-full h-48 object-cover rounded-lg"
                fallback="🍽️"
                width={400}
                height={192}
              />
            </div>
          )}

          {/* Options */}
          {step.type === "single" && step.options && (
            <div className="space-y-3 mb-8">
              {step.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedOptions.includes(option)
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span className="text-gray-700">{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Multiple Selection - REMOVIDO "Choose 2" */}
          {step.type === "multiple" && step.options && (
            <div className="space-y-3 mb-8">
              {step.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedOptions.includes(option)
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span className="text-gray-700">{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Yes/No */}
          {step.type === "yesno" && (
            <div className="space-y-3 mb-8">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedOptions.includes(option)
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span className="text-gray-700">{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Email Input */}
          {step.type === "email" && (
            <div className="mb-8">
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full p-4 text-lg border-gray-300"
                onChange={(e) => setSelectedOptions([e.target.value])}
              />
            </div>
          )}

          {/* Name Input */}
          {step.type === "name" && (
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Type your answer here..."
                className="w-full p-4 text-lg border-gray-300"
                onChange={(e) => setSelectedOptions([e.target.value])}
              />
            </div>
          )}

          {/* Enhanced Social Proof - Matching the image design */}
          {step.type === "social" && (
            <div className="mb-8">
              {/* Main testimonial card */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-4">
                {/* People avatars row - OPTIMIZED */}
                <div className="flex justify-center mb-4 -space-x-2">
                  <OptimizedImage
                    src={QUIZ_IMAGES.testimonials.person1}
                    alt="Customer testimonial 1"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    fallback="👩"
                    width={48}
                    height={48}
                  />
                  <OptimizedImage
                    src={QUIZ_IMAGES.testimonials.person2}
                    alt="Customer testimonial 2"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    fallback="👨"
                    width={48}
                    height={48}
                  />
                  <OptimizedImage
                    src={QUIZ_IMAGES.testimonials.person3}
                    alt="Customer testimonial 3"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    fallback="👩"
                    width={48}
                    height={48}
                  />
                  <OptimizedImage
                    src={QUIZ_IMAGES.testimonials.person4}
                    alt="Customer testimonial 4"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    fallback="👨"
                    width={48}
                    height={48}
                  />
                  <OptimizedImage
                    src={QUIZ_IMAGES.testimonials.person5}
                    alt="Customer testimonial 5"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    fallback="👩"
                    width={48}
                    height={48}
                  />
                </div>

                <h3 className="font-bold text-center mb-4 text-lg">
                  People rave about FlourCraft's Learning Experience
                </h3>

                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Outstanding</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-green-500 text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 font-semibold">4.8/5</span>
                </div>
              </div>

              {/* Facebook reviews card - OPTIMIZED */}
              <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">f</span>
                  </div>

                  <div className="flex -space-x-1 mr-3">
                    <OptimizedImage
                      src={QUIZ_IMAGES.facebookReviews.fbPerson1}
                      alt="Facebook reviewer 1"
                      className="w-8 h-8 rounded-full border border-white object-cover"
                      fallback="👩"
                      width={32}
                      height={32}
                    />
                    <OptimizedImage
                      src={QUIZ_IMAGES.facebookReviews.fbPerson2}
                      alt="Facebook reviewer 2"
                      className="w-8 h-8 rounded-full border border-white object-cover"
                      fallback="👨"
                      width={32}
                      height={32}
                    />
                    <OptimizedImage
                      src={QUIZ_IMAGES.facebookReviews.fbPerson3}
                      alt="Facebook reviewer 3"
                      className="w-8 h-8 rounded-full border border-white object-cover"
                      fallback="👩"
                      width={32}
                      height={32}
                    />
                    <div className="w-8 h-8 bg-gray-300 rounded-full border border-white flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">+235</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">4.9 rating from 312 Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Credibility with image - FIXED CROPPING */}
          {step.type === "credibility" && (
            <div className="mb-8 text-center">
              <div className="space-y-6">
                {/* Text content - ATUALIZADO */}
                <div className="space-y-4">
                  <p className="text-gray-600 text-base">
                    <strong>35 Detailed step-by-step guides</strong>, interactive cookbooks & smart shopping lists
                  </p>
                  <p className="text-gray-600 text-base">
                    <strong>650+ Nutritionist-approved</strong> GF recipes
                  </p>
                </div>

                {/* Credibility Image - FIXED CROPPING - Full width, no constraints */}
                <div className="w-full">
                  <img
                    src={QUIZ_IMAGES.credibilityImage || "/placeholder.svg"}
                    alt="Credibility badges and certifications"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=🏆"
                    }}
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleNext}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-semibold rounded-lg"
            disabled={
              step.type !== "info" &&
              step.type !== "social" &&
              step.type !== "credibility" &&
              step.type !== "result" &&
              selectedOptions.length === 0
            }
          >
            {step.buttonText || "OK"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
