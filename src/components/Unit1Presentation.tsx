'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideProps {
  children: React.ReactNode;
  title: string;
}

const PresentationSlide = ({ children, title }: SlideProps) => (
  <Card className="w-full h-full bg-gray-900 text-white border-gray-700">
    <CardHeader className="border-b border-gray-700">
      <CardTitle className="text-2xl text-blue-400">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
);

const Unit1Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Doing Data Science - Unit 1",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h1 className="text-4xl font-bold text-blue-400">DDS 6306: Unit 1 Analysis</h1>
          <h2 className="text-2xl text-gray-300">For Live Session Presentation</h2>
          <div className="text-gray-400 text-center space-y-2">
            <p>Master of Science in Data Science</p>
            <p>Southern Methodist University</p>
            <p>January 2025</p>
          </div>
        </div>
      )
    },
    {
      title: "Key Takeaways & Future Directions",
      content: (
        <div className="grid grid-cols-2 gap-6 h-full">
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Core Insights</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  CLT applies robustly even to heavily skewed distributions
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  Statistical theory directly informs practical analysis
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">→</span>
                  Data science requires integrated toolset mastery
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-green-400 mb-4">Growth Areas</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  Advanced statistical modeling techniques
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  Integration of multiple data science tools
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">→</span>
                  Real-world application strategies
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Questions for Discussion</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">?</span>
                  How do CLT applications vary across industries?
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">?</span>
                  What are best practices for reproducible research?
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">?</span>
                  How can we optimize team collaboration workflows?
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-red-400 mb-4">Next Steps</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">→</span>
                  Explore advanced GitHub features
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">→</span>
                  Deepen statistical foundations
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">→</span>
                  Build comprehensive analysis portfolio
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Thank You",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h2 className="text-3xl font-bold text-blue-400">Questions & Discussion</h2>
          <p className="text-xl text-gray-300">Thank you for your attention</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative h-96">
        <PresentationSlide title={slides[currentSlide].title}>
          {slides[currentSlide].content}
        </PresentationSlide>
      </div>
      
      <div className="flex justify-between items-center px-4 text-white">
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-2 rounded-full hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-2 rounded-full hover:bg-gray-800"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Unit1Presentation;
