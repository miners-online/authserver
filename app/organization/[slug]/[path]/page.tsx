import { OrganizationView } from "@daveyplate/better-auth-ui"

export default async function OrganizationPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params

  return (
    <main className="container p-4 md:p-6">
      <OrganizationView path={path} />
    </main>
  )
}