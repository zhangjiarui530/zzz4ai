"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Download, Save } from 'lucide-react'

interface PPTEditorProps {
  setCurrentStep: (step: number) => void
}

interface Slide {
  id: string
  type: 'title' | 'content' | 'image'
  title: string
  content: string[]
}

export function PPTEditor({ setCurrentStep }: PPTEditorProps): React.ReactElement {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // 从localStorage加载PPT大纲
    const data = JSON.parse(localStorage.getItem('pptOutline') || '{"outline": []}')
    const outline = data.outline || []
    
    const initialSlides = outline.flatMap((section: any) => [
      {
        id: `${section.title}-title`,
        type: 'title',
        title: section.title,
        content: []
      },
      ...section.content.map((item: string, index: number) => ({
        id: `${section.title}-content-${index}`,
        type: 'content',
        title: item,
        content: ['具体内容待补充']
      }))
    ])
    setSlides(initialSlides)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem('pptSlides', JSON.stringify(slides))
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    // 这里应该实现实际的PPT下载逻辑
    const blob = new Blob([JSON.stringify(slides, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'presentation.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>编辑PPT</CardTitle>
          <div className="space-x-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? '保存中...' : '保存'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              下载PPT
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {slides[currentSlide] && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>标题</Label>
                  <Input
                    value={slides[currentSlide].title}
                    onChange={(e) => {
                      const newSlides = [...slides]
                      newSlides[currentSlide].title = e.target.value
                      setSlides(newSlides)
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>内容</Label>
                  <Textarea
                    value={slides[currentSlide].content.join('\n')}
                    onChange={(e) => {
                      const newSlides = [...slides]
                      newSlides[currentSlide].content = e.target.value.split('\n')
                      setSlides(newSlides)
                    }}
                    rows={6}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                上一页
              </Button>
              <span className="text-sm text-gray-500">
                第 {currentSlide + 1} 页，共 {slides.length} 页
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                disabled={currentSlide === slides.length - 1}
              >
                下一页
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(5)}>
          返回模板选择
        </Button>
      </div>
    </div>
  )
} 