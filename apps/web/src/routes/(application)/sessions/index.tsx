import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(application)/sessions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(application)/sessions/"!</div>
}
