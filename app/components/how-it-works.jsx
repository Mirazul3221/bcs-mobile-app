'use client'
import { Card } from "@/components/ui/card"
import { PenTool, Link2, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: PenTool,
    title: "Design Your Quiz",
    description:
      "Choose from templates or start from scratch. Add questions with 4 multiple-choice options and customize the look.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Share Instantly",
    description:
      "Get a unique shareable link in seconds. Distribute via social media, email, or embed directly on your website.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Analyze Results",
    description:
      "Monitor responses in real-time with comprehensive analytics. Export data and gain insights into participant performance.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-secondary/30"
    >
      <div className="relative">
        <div className="text-center space-y-4 mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">HOW IT WORKS</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
            Three Simple Steps to
            <br />
            <span className="bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500 bg-clip-text text-transparent">Quiz Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            From creation to insights in minutes, not hours
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              <Card
                className="p-8 h-full hover:shadow-2xl duration-500 transition-all hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 border-2 hover:border-cyan-500/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon className="h-8 w-8 text-violet-500 group-hover:text-accent transition-colors" />
                  </div>

                  <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-bold text-primary">STEP {step.number}</span>
                  </div>

                  <h3 className="font-bold text-2xl group-hover:text-cyan-500 transition-colors duration-300">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                </div>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent group-hover:from-primary transition-colors" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
