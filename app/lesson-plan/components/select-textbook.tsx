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
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">如果您不需要上传教材，可以直接生成教案</p>
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
          onClick={() => {
            // 清除之前可能存在的 PDF 数据
            localStorage.removeItem('uploadedPDF')
            // 存储空的教案数据
            localStorage.setItem('generatedLessonPlan', JSON.stringify({
              outline: [
                { title: "课前准备", duration: "5", content: "准备教学用具" },
                { title: "导入新课", duration: "10", content: "引入课程主题" },
                { title: "讲解新知识", duration: "20", content: "讲解核心知识点" },
                { title: "练习与巩固", duration: "10", content: "课堂练习" },
                { title: "总结与反馈", duration: "5", content: "总结本节课重点" }
              ]
            }))
            // 直接跳到第四步
            setCurrentStep(4)
          }}
        >
          直接生成教案
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