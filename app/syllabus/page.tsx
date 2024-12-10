'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { SelectTextbook } from "./components/select-textbook"
import { PreviewPages } from "./components/preview-pages"
import { CourseInfo } from "./components/course-info"
import { OutlineProcess } from "./components/outline-process"

export default function SyllabusPage() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const steps = [
    { id: 1, title: "课程信息" },
    { id: 2, title: "上传教材" },
    { id: 3, title: "预览选择" },
    { id: 4, title: "生成大纲" }
  ]

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>生成教学大纲</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={currentStep} />
          
          {currentStep === 1 && <CourseInfo setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <SelectTextbook setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <PreviewPages setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && <OutlineProcess setCurrentStep={setCurrentStep} />}
        </CardContent>
      </Card>
    </div>
  )
} 