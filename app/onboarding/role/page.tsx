'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export default function RoleSelectionPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>('')

  const roles = [
    { id: 'teacher', name: '教师', description: '我是一名教师，需要备课和教学辅助' },
    { id: 'student', name: '学生', description: '我是一名学生，需要学习辅助' },
    { id: 'parent', name: '家长', description: '我是一名家长，需要辅导孩子学习' }
  ]

  const handleNext = () => {
    if (selectedRole) {
      localStorage.setItem('userRole', selectedRole)
      router.push('/onboarding/grade')
    }
  }

  const handleBack = () => {
    router.back() // 返回上一页
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">选择您的角色</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RadioGroup
              value={selectedRole}
              onValueChange={setSelectedRole}
              className="space-y-4"
            >
              {roles.map(role => (
                <Label
                  key={role.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedRole === role.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <RadioGroupItem
                    value={role.id}
                    className="sr-only"
                  />
                  <div>
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                返回
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!selectedRole}
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