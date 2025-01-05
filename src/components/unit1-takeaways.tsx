import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Unit1Takeaways = () => {
  return (
    <div className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Unit 1: Key Takeaways and Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">Key Takeaways</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li className="py-1">
                  <span className="font-semibold">Data Science Integration:</span> Understanding how statistics, 
                  programming, and domain knowledge work together in data science
                </li>
                <li className="py-1">
                  <span className="font-semibold">Statistical Foundations:</span> The importance of CLT 
                  and hypothesis testing as fundamental tools
                </li>
                <li className="py-1">
                  <span className="font-semibold">Tool Proficiency:</span> Learning to use R, RStudio, 
                  and GitHub for reproducible research
                </li>
                <li className="py-1">
                  <span className="font-semibold">Professional Development:</span> Insights into data 
                  science profiles and team dynamics
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-600">Questions for Discussion</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li className="py-1">
                  How do we determine appropriate sample sizes when applying CLT in real-world scenarios?
                </li>
                <li className="py-1">
                  What are best practices for organizing reproducible research projects in GitHub?
                </li>
                <li className="py-1">
                  How do we balance technical expertise with domain knowledge in data science teams?
                </li>
                <li className="py-1">
                  What are some practical examples of CLT application in business settings?
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-600">Areas for Further Exploration</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li className="py-1">
                  Advanced GitHub workflows for team collaboration
                </li>
                <li className="py-1">
                  Integration of R with other data science tools
                </li>
                <li className="py-1">
                  Real-world applications of hypothesis testing in digital marketing
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unit1Takeaways;
