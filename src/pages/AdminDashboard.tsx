import { useQuery } from "@tanstack/react-query"
import { IconUsers, IconKey, IconWorld, IconMail } from "@tabler/icons-react"
import api from "@/lib/axios"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await api.get("/admin/stats")
      return data.data
    },
  })

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: IconUsers,
      color: "text-primary",
    },
    {
      title: "Active Licenses",
      value: stats?.activeLicenses ?? 0,
      icon: IconKey,
      color: "text-brand-green",
    },
    {
      title: "Total Domains",
      value: stats?.totalDomains ?? 0,
      icon: IconWorld,
      color: "text-brand-orange",
    },
    {
      title: "Active Inboxes",
      value: stats?.activeInboxes ?? 0,
      icon: IconMail,
      color: "text-brand-teal",
    },
  ]

  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-2xl font-semibold text-ink-deep">Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-hairline">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ink-deep">
                {isLoading ? (
                  <div className="h-8 w-16 bg-surface rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {error && (
        <p className="text-error text-sm">Failed to load stats. Make sure backend is running.</p>
      )}
    </div>
  )
}
