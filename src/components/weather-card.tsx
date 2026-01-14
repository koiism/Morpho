
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CloudIcon, DropletsIcon, ThermometerIcon, WindIcon } from "lucide-react"

export interface WeatherCardProps {
  location: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  conditions: string
}

export function WeatherCard({
  location,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  conditions,
}: WeatherCardProps) {
  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-900 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{location}</span>
          <CloudIcon className="h-6 w-6 text-blue-500" />
        </CardTitle>
        <CardDescription className="capitalize">{conditions}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThermometerIcon className="h-5 w-5 text-orange-500" />
            <span className="text-2xl font-bold">{temperature}°C</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Feels like {feelsLike}°C
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DropletsIcon className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Humidity: {humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <WindIcon className="h-4 w-4 text-slate-500" />
            <span className="text-sm">Wind: {windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
