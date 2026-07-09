import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { UserCheck, UserX, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axiosInstance';
import { User } from '../../types/user.types';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

export default function ManageStudentsPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    api.get<User[]>('/admin/students')
      .then((res) => setStudents(res.data))
      .finally(() => setLoading(false));
  }, []);

  const approve = async (id: string) => {
    setActionId(id);
    try {
      await api.patch(`/admin/students/${id}/approve`);
      setStudents((prev) => prev.map((s) => s.id === id ? { ...s, isApproved: true } : s));
      toast.success('Student approved');
    } catch { toast.error('Failed'); } finally { setActionId(null); }
  };

  const suspend = async (id: string) => {
    setActionId(id);
    try {
      await api.patch(`/admin/students/${id}/suspend`);
      setStudents((prev) => prev.map((s) => s.id === id ? { ...s, isApproved: false } : s));
      toast.success('Student suspended');
    } catch { toast.error('Failed'); } finally { setActionId(null); }
  };

  const remove = async (id: string) => {
    if (!confirm('Remove this student permanently?')) return;
    setActionId(id);
    try {
      await api.delete(`/admin/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast.success('Student removed');
    } catch { toast.error('Failed'); } finally { setActionId(null); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
        <p className="text-gray-500 text-sm mt-1">{students.length} students registered</p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center"><Spinner /></div>
      ) : students.length === 0 ? (
        <div className="text-center py-16">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No students yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {['Student', 'Email', 'Phone', 'Registered', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                          {s.name[0]}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{s.email}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{s.phone || '—'}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {s.createdAt ? format(new Date(s.createdAt), 'dd MMM yyyy') : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={s.isApproved ? 'green' : 'yellow'}>
                        {s.isApproved ? 'Approved' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {!s.isApproved ? (
                          <Button size="sm" loading={actionId === s.id} onClick={() => approve(s.id)}>
                            <UserCheck className="h-3.5 w-3.5" /> Approve
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary" loading={actionId === s.id} onClick={() => suspend(s.id)}>
                            <UserX className="h-3.5 w-3.5" /> Suspend
                          </Button>
                        )}
                        <Button size="sm" variant="danger" loading={actionId === s.id} onClick={() => remove(s.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
