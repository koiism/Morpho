"use client"

import * as React from "react"
import { Check, ChevronDown, Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export interface AsyncSelectProps<T> {
  fetcher: (query: string) => Promise<T[]>
  renderOption: (option: T) => React.ReactNode
  getOptionValue: (option: T) => string
  getOptionLabel: (option: T) => string
  value?: T[]
  onChange?: (value: T[]) => void
  placeholder?: string
  emptyMessage?: string
  multiple?: boolean
  className?: string
}

export function AsyncSelect<T>({
  fetcher,
  renderOption,
  getOptionValue,
  getOptionLabel,
  value = [],
  onChange,
  placeholder = "Select...",
  emptyMessage = "No results found.",
  multiple = false,
  className,
}: AsyncSelectProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [options, setOptions] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      fetcher(query)
        .then(setOptions)
        .catch(console.error)
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query, fetcher])

  const handleSelect = (option: T) => {
    const optionValue = getOptionValue(option)
    const isSelected = value.some((v) => getOptionValue(v) === optionValue)

    let newValue: T[]
    if (multiple) {
      if (isSelected) {
        newValue = value.filter((v) => getOptionValue(v) !== optionValue)
      } else {
        newValue = [...value, option]
      }
    } else {
      newValue = [option]
      setOpen(false)
    }
    onChange?.(newValue)
  }

  const handleRemove = (e: React.MouseEvent, option: T) => {
    e.stopPropagation()
    const optionValue = getOptionValue(option)
    const newValue = value.filter((v) => getOptionValue(v) !== optionValue)
    onChange?.(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between min-h-[40px] h-auto", className)}
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.map((v) => (
                <Badge key={getOptionValue(v)} variant="secondary" className="mr-1">
                  {getOptionLabel(v)}
                  {multiple && (
                    <span
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      onClick={(e) => handleRemove(e, v)}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            {!loading && options.length === 0 && (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}
            {!loading && (
              <CommandGroup>
                {options.map((option) => {
                  const optionValue = getOptionValue(option)
                  const isSelected = value.some((v) => getOptionValue(v) === optionValue)
                  return (
                    <CommandItem
                      key={optionValue}
                      value={optionValue}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {renderOption(option)}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
