"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, X } from 'lucide-react'

interface SelectTextbookProps {
  setCurrentStep: (step: number) => void
}

export function SelectTextbook({ setCurrentStep }: SelectTextbookProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.type)
      setUploadedFile(file)
      const arrayBuffer = await file.arrayBuffer()
      console.log('ArrayBuffer created:', arrayBuffer.byteLength, 'bytes')
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      console.log('Base64 created, length:', base64.length)
      localStorage.setItem('uploadedPDF', base64)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    localStorage.removeItem('uploadedPDF')
  }

  const handleSkip = () => {
    localStorage.removeItem('uploadedPDF')
    localStorage.setItem('generatedSyllabus', JSON.stringify({
      outline: [
        { 
          title: "课程目标",
          content: "明确本课程的教学目标和要求",
          analysis: {
            psychology: "从认知发展理论角度分析学习目标的设定",
            pedagogy: "基于教学目标分类理论的目标设计"
          }
        },
        {
          title: "教学内容",
          content: "课程主要知识点和技能要求",
          analysis: {
            psychology: "知识结构的认知心理学分析",
            pedagogy: "教学内容的选择与组织原则"
          }
        }
      ]
    }))
    setCurrentStep(4)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">如果您不需要上传教材，可以直接生成教学大纲</p>
      </div>
      
      {!uploadedFile ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center">
          <label className="cursor-pointer block">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">点击或拖拽文件到此处上传教材</p>
            <p className="text-sm text-gray-500 mt-2">支持 PDF、Word 格式</p>
          </label>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          上一步
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleSkip}
        >
          直接生成大纲
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          disabled={!uploadedFile}
        >
          下一步：预览教材
        </Button>
      </div>
    </div>
  )
} 