"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface OutlineProcessProps {
  setCurrentStep: (step: number) => void
}

interface OutlineSection {
  title: string
  content: string
  analysis?: {
    psychology: string
    pedagogy: string
  }
}

export function OutlineProcess({ setCurrentStep }: OutlineProcessProps): React.ReactElement {
  const [outline, setOutline] = useState<OutlineSection[]>([])
  const [feedback, setFeedback] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const savedOutline = localStorage.getItem('generatedSyllabus')
    if (savedOutline) {
      const { outline } = JSON.parse(savedOutline)
      setOutline(outline)
    }
  }, [])

  const handleRegenerate = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutline(prev => [...prev, { 
        title: "补充章节", 
        content: feedback,
        analysis: {
          psychology: "补充的心理学分析",
          pedagogy: "补充的教育学分析"
        }
      }])
      setFeedback('')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    const docContent = `
      # ${localStorage.getItem('courseInfo') ? JSON.parse(localStorage.getItem('courseInfo')!).title : '教学大纲'}
      
      ## 课程信息
      ${(() => {
        const courseInfo = localStorage.getItem('courseInfo') ? JSON.parse(localStorage.getItem('courseInfo')!) : null
        if (courseInfo) {
          return `
          - 学科：${courseInfo.subject}
          - 年级：${courseInfo.grade}
          - 学期：${courseInfo.semester}
          - 总课时：${courseInfo.totalHours}
          - 课程目标：${courseInfo.objectives}
          - 先修要求：${courseInfo.prerequisites}
          - 教材：${courseInfo.textbook}
          - 参考资料：${courseInfo.references}
          `
        }
        return ''
      })()}
      
      ## 教学大纲内容
      ${outline.map(section => `
        ### ${section.title}
        ${section.content}
        
        #### 教育心理学解析
        ${section.analysis?.psychology || ''}
        
        #### 教育学原理解析
        ${section.analysis?.pedagogy || ''}
      `).join('\n\n')}
    `

    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = '教学大纲.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>大纲预览</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {outline.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">{index + 1}. {section.title}</h3>
                <p className="text-sm text-gray-600">{section.content}</p>
                {section.analysis && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm">
                      <span className="text-blue-600 font-medium">教育心理学解析：</span>
                      <p className="text-gray-600">{section.analysis.psychology}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">教育学原理解析：</span>
                      <p className="text-gray-600">{section.analysis.pedagogy}</p>
                    </div>
                  </div>
                )}
              </div>
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
              下载教学大纲
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 