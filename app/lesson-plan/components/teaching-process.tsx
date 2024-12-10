"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface TeachingProcessProps {
  setCurrentStep: (step: number) => void
}

interface TeachingStep {
  title: string
  duration: string
  content: string
}

export function TeachingProcess({ setCurrentStep }: TeachingProcessProps): React.ReactElement {
  const [outline, setOutline] = useState<TeachingStep[]>([])
  const [feedback, setFeedback] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // 从 localStorage 加载已生成的教案
    const savedPlan = localStorage.getItem('generatedLessonPlan')
    if (savedPlan) {
      const { outline } = JSON.parse(savedPlan)
      setOutline(outline)
    }
  }, [])

  const handleRegenerate = async () => {
    setIsGenerating(true)
    try {
      // 这里应该调用API重新生成大纲
      console.log('Regenerating with feedback:', feedback)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutline(prev => [...prev, { 
        title: "补充环节", 
        duration: "5", 
        content: feedback 
      }])
      setFeedback('')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    // 直接下载当前教案
    const docContent = `
      # 教案
      ${outline.map(step => `
        ## ${step.title} (${step.duration}分钟)
        ${step.content}
      `).join('\n')}
    `

    const blob = new Blob([docContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = '教案.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>教案预览</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {outline.map((step, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{index + 1}. {step.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {step.duration} 分钟
                </span>
              </div>
              <p className="text-sm text-gray-600">{step.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="feedback">修改建议</Label>
          <Textarea
            id="feedback"
            placeholder="请输入您的修改建议..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(3)}>
            上一步
          </Button>
          <div className="space-x-4">
            <Button 
              variant="outline"
              disabled={!feedback || isGenerating}
              onClick={handleRegenerate}
            >
              {isGenerating ? '生成中...' : '提交并重新生成'}
            </Button>
            <Button onClick={handleDownload}>
              下载教案
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 