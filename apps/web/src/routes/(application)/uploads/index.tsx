import { createFileRoute } from '@tanstack/react-router'
import UploadsTable from '@/components/uploads/uploads-table'

export const Route = createFileRoute('/(application)/uploads/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>

    <UploadsTable />

  </div>
}
