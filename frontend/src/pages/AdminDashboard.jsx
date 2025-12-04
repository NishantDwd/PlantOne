import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAdminDonors, getTotalDonations } from '../api/adminApi';

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [donorList, totalAmount] = await Promise.all([
          getAdminDonors(),
          getTotalDonations(),
        ]);
        setDonors(donorList);
        setTotal(totalAmount);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Total donors
          </p>
          <p className="mt-1 text-2xl font-semibold text-forest-100">
            {loading ? '—' : donors.length}
          </p>
        </div>
        <div className="card-surface p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Total contributions
          </p>
          <p className="mt-1 text-2xl font-semibold text-forest-100">
            {loading ? '—' : `₹ ${total}`}
          </p>
        </div>
        <div className="card-surface p-4">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Average per donor
          </p>
          <p className="mt-1 text-2xl font-semibold text-forest-100">
            {loading || donors.length === 0 ? '—' : `₹ ${Math.round(total / donors.length)}`}
          </p>
        </div>
      </section>

      <section className="card-surface p-4 md:p-5">
        <header className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-100">Donors & donations</h2>
          <p className="text-xs text-slate-500">Backend-only summary view</p>
        </header>

        <div className="overflow-x-auto text-xs">
          <table className="min-w-full border-separate border-spacing-y-1">
            <thead className="text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-2 py-1 text-left">Donor</th>
                <th className="px-2 py-1 text-left">Email</th>
                <th className="px-2 py-1 text-left">City</th>
                <th className="px-2 py-1 text-right">Donations</th>
                <th className="px-2 py-1 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-2 py-4 text-center text-slate-500">
                    Loading donors…
                  </td>
                </tr>
              )}
              {!loading && donors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-2 py-4 text-center text-slate-500">
                    No donors yet. Once people start giving, this table will fill
                    automatically.
                  </td>
                </tr>
              )}
              {!loading &&
                donors.map((donor) => (
                  <tr key={donor.donorId} className="card-surface">
                    <td className="px-2 py-2 text-slate-100">
                      <div className="font-medium">{donor.name}</div>
                      <div className="text-[11px] text-slate-500">ID #{donor.donorId}</div>
                    </td>
                    <td className="px-2 py-2 text-slate-300">{donor.email}</td>
                    <td className="px-2 py-2 text-slate-300">{donor.city}</td>
                    <td className="px-2 py-2 text-right text-slate-300">
                      {donor.donations?.length || 0}
                    </td>
                    <td className="px-2 py-2 text-right font-semibold text-forest-100">
                      {donor.totalAmount}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
