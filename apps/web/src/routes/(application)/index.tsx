import { createFileRoute } from '@tanstack/react-router'
import ProductTableDemo from '@/components/data-table'

export const Route = createFileRoute('/(application)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ProductTableDemo />
    </div>
  )
}
