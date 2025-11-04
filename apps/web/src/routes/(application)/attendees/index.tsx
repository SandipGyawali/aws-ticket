import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(application)/attendees/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(application)/attendees/"!</div>
}
