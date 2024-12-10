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
      setUploadedFile(file)
      const arrayBuffer = await file.arrayBuffer()
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      localStorage.setItem('uploadedPDF', base64)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    localStorage.removeItem('uploadedPDF')
  }

  const handleSkip = () => {
    localStorage.removeItem('uploadedPDF')
    localStorage.setItem('pptOutline', JSON.stringify({
      outline: [
        { 
          title: "课程介绍",
          content: ["课程目标", "学习要求", "考核方式"]
        },
        {
          title: "第一章",
          content: ["知识点1", "知识点2", "练习题"]
        }
      ]
    }))
    setCurrentStep(4)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">如果您不需要上传教材，可以直接生成PPT</p>
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
          直接生成PPT
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