import React from "react";
import laptop from "@/public/laptop-view.png";
import Image from "next/image";
import Search from "./Search";
import { isWebGLAvailable } from "../userdashboard/components/common";
import MackBookContainer from "./MackBookContainer";
import Downloadapp from "./Downloadapp";
import { viewurl } from "../config";
import { ArrowRight, Sparkles } from "lucide-react";
import { QuizPreview } from "@/components/quiz-preview";
import { Button } from "@/components/ui/button";
const BannerSection = () => {
  const webGLAvailable = isWebGLAvailable();
  const redirect = ()=> {
  window.location.href = '#'
}

const howToStart = () => {
  window.location.href = '/blogs/static/how-to-create-an-account-in-eduplusplus'
}
  return (
    <div className="relative md:mt-10">
      <section className="relative container mx-auto overflow-hidden p-6 md:p-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="relative grid lg:grid-cols-2 md:gap-5">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-6">
              <h1 className="font-sans text-2xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
                <span className="animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                  Share knowledge through
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                  Interactive quizzes
                </span>
                <br />
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground text-pretty leading-relaxed max-w-xl animate-in fade-in slide-in-from-left-4 duration-700 delay-400">
                Create, share, and discover multiple choice questions. Build engaging quizzes for education, training, or fun. Join the largest MCQ based eduplusplus community
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
              <Button onClick={howToStart}
                size="lg"
                className="text-white bg-gradient-to-r from-[#f720b0]/50 via-blue-600 to-cyan-500 text-lg px-8 py-6 hover:scale-105 hover:shadow-xl transition-all duration-300 group"
              >
                How to start
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick ={redirect}
                size="lg"
                variant="outline"
                className="text-white bg-gradient-to-r from-[#f720b0]/50 via-blue-600 to-cyan-500 text-lg px-8 py-6 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
               Download App (android)
              </Button>
            </div>

            <div className="hidden items-center gap-8 pt-4 text-sm animate-in fade-in slide-in-from-left-4 duration-700 delay-600">
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  50K+
                </div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  100K+
                </div>
                <div className="text-muted-foreground">Quizzes Created</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  1M+
                </div>
                <div className="text-muted-foreground">Quiz Responses</div>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="animate-float mt-10 md:mt-0">
              <QuizPreview />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerSection;
