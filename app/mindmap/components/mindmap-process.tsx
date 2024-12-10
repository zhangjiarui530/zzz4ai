"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface MindmapProcessProps {
  setCurrentStep: (step: number) => void
}

interface MindmapNode {
  title: string
  content: string
  children?: MindmapNode[]
}

export function MindmapProcess({ setCurrentStep }: MindmapProcessProps): React.ReactElement {
  const [mindmap, setMindmap] = useState<MindmapNode[]>([])
  const [feedback, setFeedback] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const savedMindmap = localStorage.getItem('generatedMindmap')
    if (savedMindmap) {
      const { mindmap } = JSON.parse(savedMindmap)
      setMindmap(mindmap)
    }
  }, [])

  const handleRegenerate = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMindmap(prev => [...prev, { 
        title: "补充节点", 
        content: feedback,
        children: [
          { title: "子节点1", content: "补充内容1" },
          { title: "子节点2", content: "补充内容2" }
        ]
      }])
      setFeedback('')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    const docContent = `
      # ${localStorage.getItem('courseInfo') ? JSON.parse(localStorage.getItem('courseInfo')!).title : '思维导图'}
      
      ## 课程信息
      ${(() => {
        const courseInfo = localStorage.getItem('courseInfo') ? JSON.parse(localStorage.getItem('courseInfo')!) : null
        if (courseInfo) {
          return `
          - 学科：${courseInfo.subject}
          - 年级：${courseInfo.grade}
          - 学期：${courseInfo.semester}
          - 总课时：${courseInfo.totalHours}
          `
        }
        return ''
      })()}
      
      ## 思维导图内容
      ${mindmap.map(node => `
        ### ${node.title}
        ${node.content}
        
        ${node.children?.map(child => `
          #### ${child.title}
          ${child.content}
        `).join('\n\n') || ''}
      `).join('\n\n')}
    `

    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = '思维导图.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>思维导图预览</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mindmap.map((node, index) => (
            <div key={index} className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">{index + 1}. {node.title}</h3>
                <p className="text-sm text-gray-600">{node.content}</p>
                {node.children && (
                  <div className="mt-4 pl-6 space-y-2">
                    {node.children.map((child, childIndex) => (
                      <div key={childIndex} className="p-3 bg-gray-50 rounded">
                        <h4 className="text-sm font-medium">{child.title}</h4>
                        <p className="text-sm text-gray-600">{child.content}</p>
                      </div>
                    ))}
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
              下载思维导图
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 