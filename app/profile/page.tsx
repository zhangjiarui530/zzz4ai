'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from 'lucide-react'

export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该调用更新个人信息的API
    console.log('Updating profile...')
  }

  return (
    <Card className="max-w-md mx-auto bg-white border-gray-200">
      <CardHeader className="flex flex-row items-center space-y-0 gap-4">
        <User className="w-8 h-8 text-blue-600" />
        <CardTitle className="text-3xl font-bold text-gray-800">个人中心</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="姓名"
            className="bg-white border-gray-300 text-gray-800"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="邮箱"
            className="bg-white border-gray-300 text-gray-800"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">更新个人信息</Button>
        </form>
        <Button variant="destructive" className="w-full mt-4">删除账户</Button>
      </CardContent>
    </Card>
  )
}

