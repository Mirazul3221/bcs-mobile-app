'use client'
import React from 'react'
import Section_02 from './Section_02'

const Feacherd = () => {
  return (
    <section id="features" className="relative container mx-auto py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative">
        <div className="text-center space-y-4 mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">FEATURES</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
            Everything You Need,
            <br />
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              Nothing You Don't
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Powerful features designed to make quiz creation effortless and engaging
          </p>
        </div>

    <Section_02 />
      </div>
    </section>
  )
}

export default Feacherd