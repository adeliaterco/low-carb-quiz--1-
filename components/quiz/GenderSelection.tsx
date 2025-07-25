"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 🖼️ GENDER IMAGES - EASY TO REPLACE
const GENDER_IMAGES = {
  male: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/1746f4d2-f88b-4c83-8ebf-f7906d30fc98.png",
  female: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/069d6867-feab-4523-b018-55c3875690cb.png",
}

// 🚀 OPTIMIZED IMAGE COMPONENT
const OptimizedGenderImage = ({
  src,
  alt,
  className,
  fallback = "👤",
}: {
  src: string
  alt: string
  className: string
  fallback?: string
}) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      width={64}
      height={64}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.currentTarget.src = `/placeholder.svg?height=64&width=64&text=${fallback}`
      }}
      style={{
        objectFit: "cover",
        aspectRatio: "1/1",
      }}
    />
  )
}

interface GenderSelectionProps {
  onComplete: (gender: string) => void
}

export default function GenderSelection({ onComplete }: GenderSelectionProps) {
  const [selectedGender, setSelectedGender] = useState<string>("")

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender)
  }

  const handleNext = () => {
    if (selectedGender) {
      onComplete(selectedGender)
    }
  }

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">21-Day Culinary Transformation Plan*</h1>
            <p className="text-gray-600 text-sm">
              Let's Create a Personalized Plan for Making Delicious & Healthy Meals at Home
            </p>
          </div>

          {/* Gender Selection */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { option: "Female", image: GENDER_IMAGES.female, emoji: "👩" },
                { option: "Male", image: GENDER_IMAGES.male, emoji: "👨" },
              ].map(({ option, image, emoji }) => (
                <button
                  key={option}
                  onClick={() => handleGenderSelect(option)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedGender === option
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
                      <OptimizedGenderImage
                        src={image}
                        alt={`${option} avatar`}
                        className="w-full h-full rounded-full"
                        fallback={emoji}
                      />
                    </div>
                    <span className="text-gray-600 font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleNext}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 text-lg font-semibold rounded-lg"
            disabled={!selectedGender}
          >
            OK
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
