import React, { Fragment } from 'react';
interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}
const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep
}) => {
  return <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => <Fragment key={index}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index < currentStep ? 'bg-[#10B981] text-white' : index === currentStep ? 'bg-[#008EA8] text-white' : 'bg-[#F5F7F9] text-[#8E9BAA]'}`}>
                {index < currentStep ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg> : <span>{index + 1}</span>}
              </div>
              <span className={`mt-2 text-xs ${index <= currentStep ? 'text-[#394B59]' : 'text-[#8E9BAA]'}`}>
                {step}
              </span>
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-[#10B981]' : 'bg-[#F5F7F9]'}`}></div>}
          </Fragment>)}
      </div>
    </div>;
};
export default ProgressSteps;