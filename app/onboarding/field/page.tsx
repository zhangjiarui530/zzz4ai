'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { BookOpen, Calculator, Globe, Dna, Music, Palette } from 'lucide-react'

interface Field {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export default function FieldSelectionPage() {
  const router = useRouter()
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const fields: Field[] = [
    {
      id: 'language',
      name: '语文',
      description: '包括阅读理解、写作等',
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'math',
      name: '数学',
      description: '包括代数、几何等',
      icon: <Calculator className="w-6 h-6 text-green-500" />
    },
    {
      id: 'english',
      name: '英语',
      description: '包括听说读写等',
      icon: <Globe className="w-6 h-6 text-purple-500" />
    },
    {
      id: 'science',
      name: '科学',
      description: '包括物理、化学、生物等',
      icon: <Dna className="w-6 h-6 text-red-500" />
    },
    {
      id: 'music',
      name: '音乐',
      description: '包括乐理、演唱等',
      icon: <Music className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 'art',
      name: '美术',
      description: '包括绘画、设计等',
      icon: <Palette className="w-6 h-6 text-pink-500" />
    }
  ]

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev => {
      if (prev.includes(fieldId)) {
        return prev.filter(id => id !== fieldId)
      }
      // 最多选择3个领域
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, fieldId]
    })
  }

  const handleNext = () => {
    if (selectedFields.length > 0) {
      localStorage.setItem('userFields', JSON.stringify(selectedFields))
      router.push('/dashboard')
    }
  }

  const handleBack = () => {
    router.push('/onboarding/grade') // 返回年级选择页面
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">选择您感兴趣的领域</CardTitle>
          <p className="text-center text-sm text-gray-500 mt-2">
            最多可以选择3个领域
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(field => (
                <div
                  key={field.id}
                  onClick={() => toggleField(field.id)}
                  className={`
                    flex items-center p-4 border rounded-lg cursor-pointer
                    hover:bg-gray-50 transition-colors
                    ${selectedFields.includes(field.id) ? 'ring-2 ring-primary bg-primary/5' : ''}
                  `}
                >
                  <div className="mr-4">
                    {field.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{field.name}</h3>
                    <p className="text-sm text-gray-500">{field.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                返回
              </Button>
              <Button 
                onClick={handleNext}
                disabled={selectedFields.length === 0}
              >
                完成设置
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 