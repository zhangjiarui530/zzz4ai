'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Network, Presentation } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  name: string
  email: string
  role: string
  grade: string
  fields: string[]
}

export default function DashboardPage() {
  const [profile] = useState<UserProfile>({
    name: '张三',
    email: 'zhangsan@example.com',
    role: '教师',
    grade: '高一',
    fields: ['语文', '英语']
  })

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
      title: '生成教案',
      description: '快速创建个性化教案，提高教学效率和质量。',
      href: '/lesson-plan'
    },
    {
      icon: <FileText className="w-10 h-10 text-green-600" />,
      title: '生成教学大纲',
      description: '轻松制定结构化的教学大纲，优化课程规划。',
      href: '/syllabus'
    },
    {
      icon: <Network className="w-10 h-10 text-purple-600" />,
      title: '生成思维导图',
      description: '创建直观的思维导图，促进学生理解和记忆。',
      href: '/mindmap'
    },
    {
      icon: <Presentation className="w-10 h-10 text-orange-600" />,
      title: '生成教学PPT',
      description: '自动生成吸引人的教学幻灯片，增强课堂互动。',
      href: '/ppt'
    }
  ]

  return (
    <div className="container mx-auto py-8">
      {/* 欢迎信息 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">欢迎回来，{profile.name}</h1>
        <p className="text-gray-500">
          {profile.role} · {profile.grade} · {profile.fields.join('/')}
        </p>
      </div>

      {/* 功能卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                {feature.icon}
                <Link 
                  href={feature.href} 
                  className="text-xl font-semibold text-gray-800 hover:text-blue-600 ml-4"
                >
                  {feature.title}
                </Link>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 最近使用 */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">最近使用</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">高一语文课程</h3>
                  <p className="text-sm text-gray-500">生成教案 · 2024-03-20</p>
                </div>
                <Button variant="outline" size="sm">查看</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">英语口语训练</h3>
                  <p className="text-sm text-gray-500">生成PPT · 2024-03-19</p>
                </div>
                <Button variant="outline" size="sm">查看</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 