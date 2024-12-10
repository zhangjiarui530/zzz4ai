"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, StopCircle } from 'lucide-react'

interface PPTProcessProps {
  setCurrentStep: (step: number) => void
}

interface PPTOutline {
  title: string
  content: string[]
}

export function PPTProcess({ setCurrentStep }: PPTProcessProps): React.ReactElement {
  const [outline, setOutline] = useState<PPTOutline[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setOutline([
      {
        title: "课程介绍",
        content: ["课程目标", "学习要求", "考核方式"]
      },
      {
        title: "第一章",
        content: ["知识点1", "知识点2", "练习题"]
      },
      {
        title: "课程总结",
        content: ["本节重点", "课后作业", "下节预告"]
      }
    ])

    setIsGenerating(true)
    const timer = setTimeout(() => {
      setIsGenerating(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleStop = () => {
    setIsGenerating(false)
  }

  const handleNext = () => {
    // 保存大纲数据
    localStorage.setItem('pptOutline', JSON.stringify({ outline }))
    // 进入选择模板步骤
    setCurrentStep(5)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>PPT大纲</CardTitle>
          {isGenerating && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStop}
            >
              <StopCircle className="mr-2 h-4 w-4" />
              停止输出
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {outline.map((section, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">{section.title}</h3>
              <ul className="list-disc list-inside space-y-1">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {isGenerating && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          上一步
        </Button>
        <Button 
          onClick={handleNext}
          disabled={isGenerating || outline.length === 0}
        >
          选择PPT模板
        </Button>
      </div>
    </div>
  )
} 