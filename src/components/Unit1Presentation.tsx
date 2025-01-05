'use client';

import React, { useState, Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import components with loading states
const DataScienceProfile = dynamic(() => import('./enhanced-profile'), {
  loading: () => <LoadingState />,
  ssr: false
});

const CLTVisualization = dynamic(() => import('./clt-visualization'), {
  loading: () => <LoadingState />,
  ssr: false
});

const TTestVisualization = dynamic(() => import('./enhanced-ttest'), {
  loading: () => <LoadingState />,
  ssr: false
});

interface SlideProps {
  children: React.ReactNode;
  title: string;
}

// Loading component for visualizations
const LoadingState = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-red-400 text-center">
            <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const PresentationSlide = ({ children, title }: SlideProps) => (
  <Card className="w-full h-full bg-gray-900 border-gray-700">
    <CardHeader className="border-b border-gray-700 py-4">
      <CardTitle className="text-2xl font-bold text-blue-400">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6 overflow-y-auto">
      <ErrorBoundary>
        <Suspense fallback={<LoadingState />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </CardContent>
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
      title: "Data Science Profile",
      content: <DataScienceProfile />
    },
    {
      title: "Central Limit Theorem Analysis",
      content: <CLTVisualization />
    },
    {
      title: "Beach Comber T-Test Analysis",
      content: <TTestVisualization />
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

  const handleSlideChange = (direction: 'next' | 'prev') => {
    setCurrentSlide((prev) => {
      const newSlide = direction === 'next' 
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length;
      return newSlide;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="relative h-[40rem]">
        <PresentationSlide title={slides[currentSlide].title}>
          {slides[currentSlide].content}
        </PresentationSlide>
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900 rounded-lg text-white">
        <button 
          onClick={() => handleSlideChange('prev')}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </span>
        <button 
          onClick={() => handleSlideChange('next')}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Unit1Presentation;
