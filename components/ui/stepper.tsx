interface StepperProps {
  steps: { id: number; title: string }[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between mb-8 gap-2 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center min-w-[150px] md:min-w-0 md:flex-1">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
            step.id <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
          }`}>
            {step.id}
          </div>
          <div className="ml-2 text-sm md:text-base whitespace-nowrap">{step.title}</div>
          {index < steps.length - 1 && (
            <div className={`hidden md:block h-0.5 flex-1 mx-4 ${
              step.id < currentStep ? 'bg-primary' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
} 