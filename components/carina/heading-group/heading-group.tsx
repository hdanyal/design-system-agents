import { cn } from "@/lib/utils"

export type HeadingGroupAlign = "start" | "center"

export type HeadingGroupProps = {
  title: string
  description?: string
  eyebrow?: string
  align?: HeadingGroupAlign
  className?: string
}

export function HeadingGroup({
  title,
  description,
  eyebrow,
  align = "start",
  className,
}: HeadingGroupProps) {
  return (
    <div
      data-slot="heading-group"
      className={cn(
        "flex max-w-3xl flex-col gap-2 text-start",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm/relaxed text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
