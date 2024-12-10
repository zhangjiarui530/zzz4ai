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
  duration: string
  difficulty: string
  objectives: string
  requirements: string
  teachingMethods: string
  materials: string
  evaluation: string
}

export function CourseInfo({ setCurrentStep }: CourseInfoProps) {
  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    title: '',
    subject: '',
    grade: '',
    duration: '',
    difficulty: '',
    objectives: '',
    requirements: '',
    teachingMethods: '',
    materials: '',
    evaluation: ''
  })

  const handleChange = (field: keyof CourseInfoData, value: string) => {
    setCourseInfo(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">课程标题</Label>
              <Input
                id="title"
                placeholder="请输入课程标题"
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
                <Label htmlFor="duration">课程时长（分钟）</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="输入课程时长"
                  value={courseInfo.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="difficulty">难度等级</Label>
                <Select 
                  value={courseInfo.difficulty}
                  onValueChange={(value) => handleChange('difficulty', value)}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="选择难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">简单</SelectItem>
                    <SelectItem value="medium">中等</SelectItem>
                    <SelectItem value="hard">困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="objectives">教学目标</Label>
              <Textarea
                id="objectives"
                placeholder="请输入教学目标"
                value={courseInfo.objectives}
                onChange={(e) => handleChange('objectives', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requirements">教学要求</Label>
              <Textarea
                id="requirements"
                placeholder="请输入教学要求"
                value={courseInfo.requirements}
                onChange={(e) => handleChange('requirements', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="teachingMethods">教学方法</Label>
              <Textarea
                id="teachingMethods"
                placeholder="请输入教学方法"
                value={courseInfo.teachingMethods}
                onChange={(e) => handleChange('teachingMethods', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="materials">教学材料</Label>
              <Textarea
                id="materials"
                placeholder="请输入所需教学材料"
                value={courseInfo.materials}
                onChange={(e) => handleChange('materials', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="evaluation">评价方式</Label>
              <Textarea
                id="evaluation"
                placeholder="请输入评价方式"
                value={courseInfo.evaluation}
                onChange={(e) => handleChange('evaluation', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={() => setCurrentStep(2)}
        >
          下一步：上传教材
        </Button>
      </div>
    </div>
  )
} 