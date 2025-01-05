import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ChatGPTAnalysis = () => {
  return (
    <div className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>ChatGPT Analysis of CLT Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">Key Predictions</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Distribution of sample means should be approximately normal</li>
                <li>Mean of sampling distribution should equal population mean (2)</li>
                <li>Standard error should be σ/√n ≈ 2.002/√50 ≈ 0.283</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-600">Empirical Results</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sample means mean: 1.999 (matches prediction of 2)</li>
                <li>Sample means SD: 0.282 (matches predicted 0.283)</li>
                <li>Distribution shape: Normal (confirmed by histogram)</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-600">ChatGPT's Insights</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Correctly explained why chi-square(2) is a good test case</li>
                <li>Accurately predicted theoretical values</li>
                <li>Provided clear interpretation of results</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatGPTAnalysis;