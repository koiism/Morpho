import React, { memo } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

const MarkdownImpl = ({ content }: { content: string; className?: string }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}

export const Markdown = memo(MarkdownImpl)

const components: Components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mb-4 mt-6 scroll-m-20 font-extrabold text-3xl tracking-tight first:mt-0 text-foreground',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mb-4 mt-6 scroll-m-20 font-semibold text-2xl tracking-tight first:mt-0 text-foreground',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'mb-4 mt-6 scroll-m-20 font-semibold text-xl tracking-tight first:mt-0 text-foreground',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => <p className={cn('mb-4 leading-7', className)} {...props} />,
  a: ({ className, ...props }) => (
    <a
      className={cn('font-medium text-primary underline underline-offset-4', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-white',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground',
        className,
      )}
      {...props}
    />
  ),
}
