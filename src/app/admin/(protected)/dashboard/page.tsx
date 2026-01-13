import {getAdminDashboardStats} from '@/src/lib/admin-data';
import {Card, CardContent, CardHeader, CardTitle} from '@/src/components/ui/card';

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();
  const cards = [
    {label: 'Products', value: stats.productCount},
    {label: 'Contact Requests', value: stats.contactCount},
    {label: 'Job Applications', value: stats.jobCount}
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader>
            <CardTitle>{card.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{card.value}</CardContent>
        </Card>
      ))}
    </div>
  );
}
