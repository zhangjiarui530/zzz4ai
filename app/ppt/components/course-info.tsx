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
  chapter: string
  lecturer: string
  objectives: string
  keyPoints: string
  audience: string
  duration: string
}

export function CourseInfo({ setCurrentStep }: CourseInfoProps): React.ReactElement {
  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
    title: '',
    subject: '',
    grade: '',
    chapter: '',
    lecturer: '',
    objectives: '',
    keyPoints: '',
    audience: '',
    duration: ''
  })

  const handleChange = (field: keyof CourseInfoData, value: string) => {
    setCourseInfo(prev => ({ ...prev, [field]: value }))
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
                <Label htmlFor="chapter">章节</Label>
                <Input
                  id="chapter"
                  placeholder="输入章节名称"
                  value={courseInfo.chapter}
                  onChange={(e) => handleChange('chapter', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lecturer">讲师姓名</Label>
                <Input
                  id="lecturer"
                  placeholder="输入讲师姓名"
                  value={courseInfo.lecturer}
                  onChange={(e) => handleChange('lecturer', e.target.value)}
                />
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
              <Label htmlFor="keyPoints">重点难点</Label>
              <Textarea
                id="keyPoints"
                placeholder="请输入教学重点和难点"
                value={courseInfo.keyPoints}
                onChange={(e) => handleChange('keyPoints', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="audience">授课对象</Label>
                <Input
                  id="audience"
                  placeholder="输入授课对象"
                  value={courseInfo.audience}
                  onChange={(e) => handleChange('audience', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">课程时长</Label>
                <Input
                  id="duration"
                  type="text"
                  placeholder="如：45分钟"
                  value={courseInfo.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                />
              </div>
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