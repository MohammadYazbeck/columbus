import {getAdminJobApplications} from '@/src/lib/admin-data';
import {asUploadUrl} from '@/src/lib/media';

export default async function JobRequestsPage() {
  const applications = await getAdminJobApplications();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Job Applications</h1>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Full name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">CV</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="px-4 py-3">{app.fullName}</td>
                <td className="px-4 py-3">
                  {app.careerSlot.translations.find((t) => t.locale === 'en')?.title ??
                    app.careerSlot.translations[0]?.title}
                </td>
                <td className="px-4 py-3">
                  <div>{app.email}</div>
                  <div>{app.phoneNumber}</div>
                </td>
                <td className="px-4 py-3">
                  {app.cvFilePath ? (
                    <a
                      href={asUploadUrl(app.cvFilePath) ?? '#'}
                      className="text-accent underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-4 py-3">{new Date(app.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
