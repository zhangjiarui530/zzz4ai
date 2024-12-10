'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus } from 'lucide-react'

interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 表单验证
    if (!formData.email || !formData.password || !formData.name || !formData.phone) {
      setError('请填写所有必填项')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (formData.password.length < 6) {
      setError('密码长度至少6位')
      return
    }

    try {
      // 这里应该调用注册API
      console.log('Register attempt:', formData)
      
      // 模拟注册成功
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/onboarding/role')
    } catch (err) {
      setError('注册失败，请重试')
    }
  }

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <UserPlus className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">创建新账号</CardTitle>
          <p className="text-center text-sm text-gray-500">
            填写以下信息以创建您的账号
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱地址"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                type="text"
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">手机号码</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号码"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  phone: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请设置密码（至少6位）"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full">
              注册
            </Button>

            <p className="text-center text-sm text-gray-500">
              已有账号？
              <Link 
                href="/login" 
                className="text-primary hover:underline ml-1"
              >
                立即登录
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

