import { createFileRoute } from '@tanstack/react-router'
import { RootLayout } from '@/Layout/RootLayout'

export const Route = createFileRoute('/(application)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RootLayout />
}
