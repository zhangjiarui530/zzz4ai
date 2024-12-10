"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book } from 'lucide-react'

interface Textbook {
  id: string
  title: string
  publisher: string
  grade: string
  subject: string
  term: string
}

interface TextbookListProps {
  textbooks: Textbook[]
  onSelect: (textbook: Textbook) => void
}

export function TextbookList({ textbooks, onSelect }: TextbookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {textbooks.map((textbook) => (
        <Card key={textbook.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Book className="h-8 w-8 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-medium">{textbook.title}</h3>
                <p className="text-sm text-muted-foreground">{textbook.publisher}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    {textbook.grade}
                  </span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    {textbook.term}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => onSelect(textbook)}
                >
                  选择此教材
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 