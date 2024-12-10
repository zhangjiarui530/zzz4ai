'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { SelectTextbook } from "./components/select-textbook"
import { PreviewPages } from "./components/preview-pages"
import { CourseInfo } from "./components/course-info"
import { MindmapProcess } from "./components/mindmap-process"

export default function MindmapPage() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const steps = [
    { id: 1, title: "课程信息" },
    { id: 2, title: "上传教材" },
    { id: 3, title: "预览选择" },
    { id: 4, title: "生成思维导图" }
  ]

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>生成思维导图</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={currentStep} />
          
          {currentStep === 1 && <CourseInfo setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <SelectTextbook setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <PreviewPages setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && <MindmapProcess setCurrentStep={setCurrentStep} />}
        </CardContent>
      </Card>
    </div>
  )
}
