'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MainAttribute, StatusAttribute } from '@/payload-types'

interface AttributeListProps {
  title: string
  attributes: (MainAttribute | StatusAttribute | string)[] | null | undefined
  emptyText: string
}

export function AttributeList({ title, attributes, emptyText }: AttributeListProps) {
  const hasAttributes = attributes && attributes.length > 0

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        {title}
      </h2>
      <Card>
        <CardContent className="pt-6">
          {hasAttributes ? (
            <div className="grid gap-2">
              {attributes.map((attr) => {
                if (typeof attr === 'string') return null
                return (
                  <div key={attr.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{attr.emoji}</span>
                      <span className="font-medium">{attr.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground italic text-sm">{emptyText}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
