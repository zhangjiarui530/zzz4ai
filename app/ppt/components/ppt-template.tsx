"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image'

interface PPTTemplateProps {
  setCurrentStep: (step: number) => void
}

interface Template {
  id: string
  name: string
  description: string
  preview: string
  style: {
    titleFont: string
    contentFont: string
    primaryColor: string
    secondaryColor: string
  }
}

export function PPTTemplate({ setCurrentStep }: PPTTemplateProps): React.ReactElement {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const templates: Template[] = [
    {
      id: 'simple',
      name: '简约风格',
      description: '清晰简洁的设计，适合正式课程',
      preview: '/templates/simple.png',
      style: {
        titleFont: 'Microsoft YaHei',
        contentFont: 'SimSun',
        primaryColor: '#2563eb',
        secondaryColor: '#e2e8f0'
      }
    },
    {
      id: 'modern',
      name: '现代风格',
      description: '时尚现代的设计，适合互动教学',
      preview: '/templates/modern.png',
      style: {
        titleFont: 'Arial',
        contentFont: 'Helvetica',
        primaryColor: '#10b981',
        secondaryColor: '#f1f5f9'
      }
    }
  ]

  const handleGeneratePPT = async () => {
    if (!selectedTemplate) return

    setIsGenerating(true)
    try {
      // 保存模板选择
      localStorage.setItem('selectedTemplate', selectedTemplate)
      
      // 模拟生成PPT的过程
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 进入编辑页面
      setCurrentStep(6)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>选择PPT模板</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
            className="grid grid-cols-2 gap-4"
          >
            {templates.map((template) => (
              <Label
                key={template.id}
                className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <RadioGroupItem
                  value={template.id}
                  className="sr-only"
                />
                <div className="w-full aspect-video relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(4)}>
          上一步
        </Button>
        <Button 
          onClick={handleGeneratePPT}
          disabled={!selectedTemplate || isGenerating}
        >
          {isGenerating ? '生成中...' : '生成PPT'}
        </Button>
      </div>
    </div>
  )
} 