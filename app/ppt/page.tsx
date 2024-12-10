'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { SelectTextbook } from "./components/select-textbook"
import { PreviewPages } from "./components/preview-pages"
import { CourseInfo } from "./components/course-info"
import { PPTProcess } from "./components/ppt-process"
import { PPTTemplate } from "./components/ppt-template"
import { PPTEditor } from "./components/ppt-editor"

export default function PPTPage() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const steps = [
    { id: 1, title: "课程信息" },
    { id: 2, title: "上传教材" },
    { id: 3, title: "预览选择" },
    { id: 4, title: "生成大纲" },
    { id: 5, title: "选择模板" },
    { id: 6, title: "编辑PPT" }
  ]

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>生成教学PPT</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={currentStep} />
          
          {currentStep === 1 && <CourseInfo setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <SelectTextbook setCurrentStep={setCurrentStep} />}
          {currentStep === 3 && <PreviewPages setCurrentStep={setCurrentStep} />}
          {currentStep === 4 && <PPTProcess setCurrentStep={setCurrentStep} />}
          {currentStep === 5 && <PPTTemplate setCurrentStep={setCurrentStep} />}
          {currentStep === 6 && <PPTEditor setCurrentStep={setCurrentStep} />}
        </CardContent>
      </Card>
    </div>
  )
}
