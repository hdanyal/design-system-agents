import { Button } from "@/components/ui/button"
import { PageHeader } from "@/registry/blocks/page-header/page-header"

export function InvoicesWorkspace() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-6">
      <PageHeader
        eyebrow="Billing"
        title="Invoices"
        description="Synthetic invoice records for the current period. No customer data."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>Create invoice</Button>
          </>
        }
      />
      <section aria-label="Invoice list placeholder" className="border border-dashed border-border p-6">
        <p className="text-sm text-muted-foreground">
          Placeholder workspace content. Promote only the page-header composition, not this local region.
        </p>
      </section>
    </div>
  )
}
