'use client'

import * as React from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { World, MainAttribute, StatusAttribute } from '@/payload-types'
import { getCollectionApi } from '@/lib/api/payload'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AsyncSelect } from '@/components/ui/async-select'
import { Label } from '@/components/ui/label'
import { useWorldStore } from './store'

interface WorldFormProps {
  initialData?: World | null
  onSuccess: (data: World) => void
  onCancel: () => void
}

export function WorldForm({ initialData, onSuccess, onCancel }: WorldFormProps) {
  const t = useTranslations('WorldForm')
  const tCommon = useTranslations('Common')

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      mainAttributes: (initialData?.mainAttributes as MainAttribute[]) || [],
      statusAttributes: (initialData?.statusAttributes as StatusAttribute[]) || [],
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    try {
      const api = getCollectionApi('worlds')
      const payload = {
        ...data,
        mainAttributes: data.mainAttributes?.map((attr) => attr.id),
        statusAttributes: data.statusAttributes?.map((attr) => attr.id),
      }

      let response
      if (initialData) {
        response = await api.update(initialData.id, payload)
      } else {
        response = await api.create(payload)
      }

      if (response.data) {
        onSuccess(response.data)
      }
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Failed to save world')
    } finally {
      setLoading(false)
    }
  }

  const fetchMainAttributes = async (query: string) => {
    const api = getCollectionApi('main-attributes')
    const res = await api.getList({
      limit: 99,
      page: 1,
      sort: 'name',
      where: query
        ? {
            name: {
              contains: query,
            },
          }
        : undefined,
    })
    return res.data.docs as MainAttribute[]
  }

  const fetchStatusAttributes = async (query: string) => {
    const api = getCollectionApi('status-attributes')
    const res = await api.getList({
      limit: 99,
      page: 1,
      sort: 'name',
      where: query
        ? {
            name: {
              contains: query,
            },
          }
        : undefined,
    })
    return res.data.docs as StatusAttribute[]
  }

  return (
    <div className="h-full flex flex-col bg-background/50">
      <div className="flex items-center justify-between p-6 border-b bg-background">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {initialData ? t('editTitle') : t('createTitle')}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {initialData ? t('editSubtitle') : t('createSubtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {tCommon('cancel')}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {tCommon('save')}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Card>
            <CardHeader>
              <CardTitle>{t('basicInfo')}</CardTitle>
              <CardDescription>{t('basicInfoDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-base">
                  {t('nameLabel')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder={t('namePlaceholder')}
                  className="max-w-md"
                />
                {errors.name && <p className="text-sm text-destructive">{t('nameRequired')}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-base">
                  {t('descriptionLabel')}
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  className="min-h-[150px] font-mono text-sm"
                  placeholder={t('descPlaceholder')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('gameSystem')}</CardTitle>
              <CardDescription>{t('gameSystemDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base">{t('mainAttributes')}</Label>
                  <p className="text-sm text-muted-foreground mb-2">{t('mainAttributesDesc')}</p>
                  <Controller
                    control={control}
                    name="mainAttributes"
                    render={({ field }) => (
                      <AsyncSelect<MainAttribute>
                        fetcher={fetchMainAttributes}
                        renderOption={(option) => (
                          <div className="flex items-center gap-2">
                            <span>{option.emoji}</span>
                            <span>{option.name}</span>
                          </div>
                        )}
                        getOptionValue={(option) => option.id}
                        getOptionLabel={(option) => `${option.emoji || ''} ${option.name}`}
                        value={field.value}
                        onChange={field.onChange}
                        multiple
                        placeholder={t('selectMainAttributes')}
                      />
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base">{t('statusAttributes')}</Label>
                  <p className="text-sm text-muted-foreground mb-2">{t('statusAttributesDesc')}</p>
                  <Controller
                    control={control}
                    name="statusAttributes"
                    render={({ field }) => (
                      <AsyncSelect<StatusAttribute>
                        fetcher={fetchStatusAttributes}
                        renderOption={(option) => (
                          <div className="flex items-center gap-2">
                            <span>{option.emoji}</span>
                            <span>{option.name}</span>
                          </div>
                        )}
                        getOptionValue={(option) => option.id}
                        getOptionLabel={(option) => `${option.emoji || ''} ${option.name}`}
                        value={field.value}
                        onChange={field.onChange}
                        multiple
                        placeholder={t('selectStatusAttributes')}
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const formSchema = z.object({
  name: z.string().min(1, 'required'),
  description: z.string().optional(),
  mainAttributes: z.array(z.custom<MainAttribute>()).optional(),
  statusAttributes: z.array(z.custom<StatusAttribute>()).optional(),
})

type FormData = z.infer<typeof formSchema>
