import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileText, Network, Presentation } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 text-center">欢迎使用ZZZ4AI教案生成助手</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <BookOpen className="w-10 h-10 text-blue-600 mr-4" />
              <Link href="/lesson-plan" className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                生成教案
              </Link>
            </div>
            <p className="text-gray-600 text-base">快速创建个性化教案，提高教学效率和质量。</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <FileText className="w-10 h-10 text-green-600 mr-4" />
              <Link href="/syllabus" className="text-xl font-semibold text-gray-800 hover:text-green-600">
                生成教学大纲
              </Link>
            </div>
            <p className="text-gray-600 text-base">轻松制定结构化的教学大纲，优化课程规划。</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Network className="w-10 h-10 text-purple-600 mr-4" />
              <Link href="/mindmap" className="text-xl font-semibold text-gray-800 hover:text-purple-600">
                生成思维导图
              </Link>
            </div>
            <p className="text-gray-600 text-base">创建直观的思维导图，促进学生理解和记忆。</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Presentation className="w-10 h-10 text-orange-600 mr-4" />
              <Link href="/ppt" className="text-xl font-semibold text-gray-800 hover:text-orange-600">
                生成教学PPT
              </Link>
            </div>
            <p className="text-gray-600 text-base">自动生成吸引人的教学幻灯片，增强课堂互动。</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

