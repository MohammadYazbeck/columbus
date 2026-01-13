import {getAdminContactRequests} from '@/src/lib/admin-data';

export default async function ContactRequestsPage() {
  const requests = await getAdminContactRequests();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Contact Submissions</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t">
                <td className="px-4 py-3">{request.name}</td>
                <td className="px-4 py-3">{request.email}</td>
                <td className="px-4 py-3">{request.title}</td>
                <td className="px-4 py-3">{request.message}</td>
                <td className="px-4 py-3">{new Date(request.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
