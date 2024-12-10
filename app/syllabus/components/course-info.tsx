"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface CourseInfoProps {
  setCurrentStep: (step: number) => void
}

interface CourseInfoData {
  title: string
  subject: string
  grade: string
  semester: string
  totalHours: string
  objectives: string
  prerequisites: string
  textbook: string
  references: string
}

export function CourseInfo({ setCurrentStep }: CourseInfoProps): React.ReactElement {
  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    title: '',
    subject: '',
    grade: '',
    semester: '',
    totalHours: '',
    objectives: '',
    prerequisites: '',
    textbook: '',
    references: ''
  })

  const handleChange = (field: keyof CourseInfoData, value: string) => {
    setCourseInfo(prev => ({ ...prev, [field]: value }))
    // 保存到 localStorage 以便后续使用
    localStorage.setItem('courseInfo', JSON.stringify({
      ...courseInfo,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">课程名称</Label>
              <Input
                id="title"
                placeholder="请输入课程名称"
                value={courseInfo.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">学科</Label>
                <Select 
                  value={courseInfo.subject}
                  onValueChange={(value) => handleChange('subject', value)}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="选择学科" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">数学</SelectItem>
                    <SelectItem value="chinese">语文</SelectItem>
                    <SelectItem value="english">英语</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="grade">年级</Label>
                <Select 
                  value={courseInfo.grade}
                  onValueChange={(value) => handleChange('grade', value)}
                >
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="选择年级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">一年级</SelectItem>
                    <SelectItem value="2">二年级</SelectItem>
                    <SelectItem value="3">三年级</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="semester">学期</Label>
                <Select 
                  value={courseInfo.semester}
                  onValueChange={(value) => handleChange('semester', value)}
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="选择学期" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">第一学期</SelectItem>
                    <SelectItem value="2">第二学期</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalHours">总课时</Label>
                <Input
                  id="totalHours"
                  type="number"
                  placeholder="输入总课时数"
                  value={courseInfo.totalHours}
                  onChange={(e) => handleChange('totalHours', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="objectives">课程目标</Label>
              <Textarea
                id="objectives"
                placeholder="请输入课程目标"
                value={courseInfo.objectives}
                onChange={(e) => handleChange('objectives', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="prerequisites">先修要求</Label>
              <Textarea
                id="prerequisites"
                placeholder="请输入先修要求"
                value={courseInfo.prerequisites}
                onChange={(e) => handleChange('prerequisites', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="textbook">教材</Label>
              <Textarea
                id="textbook"
                placeholder="请输入使用的教材"
                value={courseInfo.textbook}
                onChange={(e) => handleChange('textbook', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="references">参考资料</Label>
              <Textarea
                id="references"
                placeholder="请输入参考资料"
                value={courseInfo.references}
                onChange={(e) => handleChange('references', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => setCurrentStep(2)}>
          下一步：上传教材
        </Button>
      </div>
    </div>
  )
} 