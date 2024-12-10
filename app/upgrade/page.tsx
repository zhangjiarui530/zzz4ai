'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  highlight?: boolean
}

export default function UpgradePage() {
  const plans: Plan[] = [
    {
      id: 'basic',
      name: '基础版',
      price: 99,
      period: '月',
      features: [
        '每日生成10个教案',
        '基础PPT模板',
        '标准客服支持'
      ]
    },
    {
      id: 'pro',
      name: '专业版',
      price: 199,
      period: '月',
      features: [
        '无限生成教案',
        '高级PPT模板',
        '优先客服支持',
        '自定义模板'
      ],
      highlight: true
    },
    {
      id: 'team',
      name: '团队版',
      price: 499,
      period: '月',
      features: [
        '所有专业版功能',
        '多人协作',
        '团队管理功能',
        '专属客服经理'
      ]
    }
  ]

  const handleUpgrade = (planId: string) => {
    // 这里应该跳转到支付页面
    console.log('Upgrading to plan:', planId)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">升级您的服务</h1>
          <p className="text-gray-500">选择最适合您的方案，提升教学效率</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.highlight ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-full flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    推荐
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="text-xl mb-2">{plan.name}</div>
                  <div className="text-3xl font-bold">
                    ¥{plan.price}
                    <span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  升级到{plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 