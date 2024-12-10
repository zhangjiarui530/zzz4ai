"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as pdfjsLib from 'pdfjs-dist'

// 设置 worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
}

interface PreviewPagesProps {
  setCurrentStep: (step: number) => void
}

interface PageSelection {
  pageNumber: number
  selected: boolean
  imageUrl: string
}

export function PreviewPages({ setCurrentStep }: PreviewPagesProps): JSX.Element {
  const [pages, setPages] = useState<PageSelection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    async function loadPDF() {
      try {
        setIsLoading(true)
        setError(null)

        const pdfData = localStorage.getItem('uploadedPDF')
        if (!pdfData) {
          throw new Error('未找到PDF文件')
        }

        const binaryString = atob(pdfData)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }

        const loadingTask = pdfjsLib.getDocument({
          data: bytes,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
          cMapPacked: true,
        })
        const pdf = await loadingTask.promise
        const pagesData: PageSelection[] = []

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 1.5 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          if (!context) {
            throw new Error('无法创建canvas上下文')
          }

          canvas.height = viewport.height
          canvas.width = viewport.width

          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise

          pagesData.push({
            pageNumber: i,
            selected: false,
            imageUrl: canvas.toDataURL('image/jpeg', 0.8)
          })
        }

        setPages(pagesData)
      } catch (err) {
        console.error('PDF加载失败:', err instanceof Error ? err.message : err)
        setError(err instanceof Error ? err.message : '加载PDF时出错')
      } finally {
        setIsLoading(false)
      }
    }

    loadPDF()
  }, [])

  const togglePageSelection = (pageNumber: number) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.pageNumber === pageNumber 
          ? { ...page, selected: !page.selected }
          : page
      )
    )
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
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
    } catch (err) {
      console.error('生成PPT大纲失败:', err)
      alert('生成PPT大纲失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-lg text-gray-600">正在加载PDF预览...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>教材预览（点击选择需要的页面）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pages.map((page) => (
              <div 
                key={page.pageNumber}
                onClick={() => togglePageSelection(page.pageNumber)}
                className={`
                  relative border rounded-lg overflow-hidden cursor-pointer
                  transition-all duration-200 hover:shadow-lg
                  ${page.selected ? 'ring-2 ring-primary' : ''}
                `}
              >
                <div className="aspect-[3/4]">
                  <img 
                    src={page.imageUrl}
                    alt={`第 ${page.pageNumber} 页`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className={`
                  absolute inset-0 flex items-center justify-center
                  ${page.selected ? 'bg-primary/20' : 'hover:bg-black/5'}
                `}>
                  <span className="bg-white px-3 py-1 rounded-full shadow-md">
                    第 {page.pageNumber} 页
                    {page.selected && ' ✓'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          返回上一步
        </Button>
        <div className="space-x-2">
          <span className="text-sm text-gray-500">
            已选择 {pages.filter(p => p.selected).length} 页
          </span>
          <Button 
            onClick={handleGenerate}
            disabled={!pages.some(p => p.selected)}
          >
            {isGenerating ? '生成中...' : '生成PPT大纲'}
          </Button>
        </div>
      </div>
    </div>
  )
} 