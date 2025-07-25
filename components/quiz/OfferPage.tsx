"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import type { QuizData } from "@/app/page"

// 📊 Google Analytics Tracking Function
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "FlourCraft_Quiz",
      event_label: "Offer_Page",
      ...parameters,
    })
  }
}

interface OfferPageProps {
  quizData: QuizData
}

export default function OfferPage({ quizData }: OfferPageProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 12,
  })

  useEffect(() => {
    // Track offer page view
    trackEvent("offer_page_viewed", {
      step: "offer_page",
      step_number: 32,
      user_email: quizData.email,
      user_name: quizData.name,
    })

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Reset timer when it reaches 0
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizData.email, quizData.name])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  const handlePurchaseClick = () => {
    // Track purchase button click
    trackEvent("purchase_button_clicked", {
      step: "purchase_attempt",
      step_number: 33,
      user_email: quizData.email,
      user_name: quizData.name,
      price: 17,
      currency: "USD",
    })

    // Redirect to Hotmart
    window.open("https://pay.hotmart.com/M101011389E?off=qduzrp2b", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        {/* Urgent Header - Mobile Optimized with Working Timer */}
        <div className="bg-red-600 text-white text-center py-2 sm:py-3 rounded-t-xl">
          <p className="font-bold text-sm sm:text-base">
            ⚡ FLASH SALE ENDS IN: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
            {formatTime(timeLeft.seconds)} ⚡
          </p>
        </div>

        {/* Main Content - Mobile First */}
        <div className="bg-white rounded-b-xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          {/* Header - Mobile Optimized */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
              🎉 CONGRATULATIONS!
              <br />
              <span className="text-red-600">Your Custom FlourCraft</span>
              <br />
              <span className="text-green-600">21-Day Culinary Transformation</span>
              <br />
              <span className="text-gray-900">Is Ready!</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed px-2">
              Based on your answers, we've crafted a <strong>personalized gluten-free roadmap</strong> that will help
              you reclaim your energy, shed stubborn weight, and finally enjoy meals without fear - all while mastering
              restaurant-quality dishes your entire family will crave!
            </p>
          </div>

          {/* Social Proof Banner - Mobile Optimized - NÚMEROS CONSISTENTES */}
          <div className="bg-green-100 border-l-4 border-green-500 p-3 sm:p-4 mb-6 sm:mb-8 rounded-r-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-xl sm:text-2xl">👥</span>
              <p className="text-green-800 font-semibold text-center sm:text-left text-sm sm:text-base">
                <strong>85,000+ people</strong> started their gluten-free transformation this month!
              </p>
            </div>
          </div>

          {/* Value Stack - Mobile Grid */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-900">
              Here's Everything You Get Today:
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">📚</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">FlourCraft 21-Day Reset System</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      650+ chef-tested recipes, weekly meal blueprints & smart shopping lists that save you 3+ hours
                      weekly
                    </p>
                    <p className="text-blue-600 font-semibold text-sm">Value: $127</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">📋</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">Master Chef Technique Library</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      35+ detailed step-by-step guides with pro secrets from James Beard Award winners
                    </p>
                    <p className="text-purple-600 font-semibold text-sm">Value: $167</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">📖</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">18 Premium Digital Cookbooks</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Instant-download cookbooks for every craving: comfort food, desserts, holiday meals & more
                    </p>
                    <p className="text-green-600 font-semibold text-sm">Value: $97</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">👥</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg">VIP FlourCraft Community</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Join 67,000+ members sharing wins, tips & support - plus monthly live Q&As with nutrition experts
                    </p>
                    <p className="text-orange-600 font-semibold text-sm">Value: $67</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-gray-100 p-3 sm:p-4 rounded-lg">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Total Value: <span className="line-through text-red-500">$458</span>
              </p>
            </div>
          </div>

          {/* Pricing - Mobile Optimized */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">🔥 FLASH SALE EXCLUSIVE 🔥</h2>
              <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">Get EVERYTHING for just:</p>

              <div className="text-center mb-4 sm:mb-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2">$17</div>
                <div className="text-sm sm:text-base lg:text-xl opacity-90">
                  One-time investment • No hidden fees • No subscriptions
                </div>
                <div className="text-sm sm:text-base lg:text-lg opacity-75 line-through">Regular price: $458</div>
              </div>

              <div className="bg-white text-red-600 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="font-bold text-sm sm:text-base lg:text-lg">
                  🎯 That's 96% OFF - But Only For The Next 23 People!
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials with Images - Mobile Stack */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6">
              What FlourCraft Members Are Saying:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/3-DEPOIMENTO.png"
                    alt="Jennifer K."
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold">Jennifer K., Austin TX</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm italic">
                  "Down 18 pounds in 3 weeks and my brain fog is GONE! These recipes are so good, my husband asks for
                  seconds every night."
                </p>
              </div>

              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/05.png"
                    alt="Mark D."
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold">Mark D., Phoenix AZ</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm italic">
                  "Finally! A program that actually works for celiac disease. My stomach issues vanished and I have
                  energy to play with my kids again."
                </p>
              </div>

              <div className="bg-green-50 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-3">
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/2fc1e47b2931f00666611ff2960c9c3f.jpg"
                    alt="Lisa M."
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold">Lisa M., Denver CO</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm italic">
                  "The step-by-step guides are incredible! I went from ordering takeout 5x/week to making bakery-quality
                  bread at home."
                </p>
              </div>
            </div>
          </div>

          {/* CTA Otimizado para Mobile - COM LINK DA HOTMART */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
              🔒 Ready to Reclaim Your Health & Energy?
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Click below to secure your <strong>$17 flash sale price</strong> and start your gluten-free transformation
              today!
            </p>

            <Button
              onClick={handlePurchaseClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 sm:py-4 lg:py-6 px-4 sm:px-6 text-sm sm:text-lg lg:text-xl font-bold rounded-lg mb-3 sm:mb-4 shadow-lg transform hover:scale-105 transition-all h-auto min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] leading-tight"
            >
              <span className="block sm:inline">🚀 YES! Give Me FlourCraft</span>
              <span className="block sm:inline sm:ml-2">For Just $17</span>
            </Button>

            <div className="text-center text-xs sm:text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span>🔒</span>
                <span>Secure Checkout • 60-Day Money Back Guarantee</span>
              </div>
              <p>Your information is 100% secure and will never be shared</p>
            </div>
          </div>

          {/* Guarantee - Mobile Optimized */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-green-100 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-full border-4 border-green-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">60</span>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-black text-green-800 text-base sm:text-lg lg:text-xl">IRON-CLAD GUARANTEE</div>
                <div className="text-green-700 font-semibold text-sm sm:text-base">60-Day Money Back Promise</div>
              </div>
            </div>
            <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base px-2">
              <strong>Try FlourCraft risk-free for 60 days.</strong> If you don't feel more energetic, lose weight, and
              absolutely love the recipes, we'll refund every penny. No questions asked.
            </p>
          </div>

          {/* Scarcity - Mobile Optimized */}
          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-3 sm:p-4 text-center">
            <p className="text-red-800 font-bold text-sm sm:text-base">
              ⚠️ WARNING: This flash sale price is only available for the next 23 people. After that, the price returns
              to $458.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
