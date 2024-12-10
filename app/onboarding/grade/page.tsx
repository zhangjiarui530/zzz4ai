'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export default function GradeSelectionPage() {
  const router = useRouter()
  const [selectedGrade, setSelectedGrade] = useState<string>('')

  const grades = [
    { id: 'elementary', name: '小学', levels: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'] },
    { id: 'junior', name: '初中', levels: ['初一', '初二', '初三'] },
    { id: 'senior', name: '高中', levels: ['高一', '高二', '高三'] }
  ]

  const handleNext = () => {
    if (selectedGrade) {
      localStorage.setItem('userGrade', selectedGrade)
      router.push('/onboarding/field')
    }
  }

  const handleBack = () => {
    router.push('/onboarding/role')
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">选择年级</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {grades.map(grade => (
              <div key={grade.id} className="space-y-2">
                <h3 className="font-medium text-lg">{grade.name}</h3>
                <RadioGroup
                  value={selectedGrade}
                  onValueChange={setSelectedGrade}
                  className="grid grid-cols-2 gap-2"
                >
                  {grade.levels.map(level => (
                    <Label
                      key={level}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        selectedGrade === level ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <RadioGroupItem
                        value={level}
                        className="sr-only"
                      />
                      <span className="text-sm">{level}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                返回
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!selectedGrade}
              >
                下一步
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 