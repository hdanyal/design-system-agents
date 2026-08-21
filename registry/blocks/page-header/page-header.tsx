import type { ReactNode } from "react"

import { HeadingGroup } from "@/components/carina/heading-group/heading-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type PageHeaderProps = {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <HeadingGroup title={title} description={description} eyebrow={eyebrow} />
        {actions ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
      <Separator />
    </header>
  )
}
