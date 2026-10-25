import { useState } from 'react';
import { LayoutDashboard, Users, CalendarDays, Stethoscope, Receipt, Settings, Menu, X, Bell, Search, TrendingUp, Clock, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Plus } from 'lucide-react';

type View = 'dashboard' | 'patients' | 'appointments' | 'treatments' | 'invoices' | 'settings';

interface Patient {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  status: 'active' | 'inactive';
}

interface Appointment {
  id: number;
  patient: string;
  time: string;
  treatment: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const patients: Patient[] = [
  { id: 1, name: 'أحمد محمد علي', phone: '0501234567', lastVisit: '2026-10-20', status: 'active' },
  { id: 2, name: 'فاطمة سعيد الزهراني', phone: '0559876543', lastVisit: '2026-10-18', status: 'active' },
  { id: 3, name: 'خالد عبدالله القحطاني', phone: '0533456789', lastVisit: '2026-09-30', status: 'inactive' },
  { id: 4, name: 'نورة إبراهيم العتيبي', phone: '0567891234', lastVisit: '2026-10-22', status: 'active' },
  { id: 5, name: 'سارة محمد الدوسري', phone: '0544556677', lastVisit: '2026-10-15', status: 'active' },
];

const appointments: Appointment[] = [
  { id: 1, patient: 'أحمد محمد علي', time: '09:00 ص', treatment: 'تنظيف الأسنان', status: 'confirmed' },
  { id: 2, patient: 'نورة إبراهيم العتيبي', time: '10:30 ص', treatment: 'حشو عصب', status: 'confirmed' },
  { id: 3, patient: 'سارة محمد الدوسري', time: '12:00 م', treatment: 'تقويم - متابعة', status: 'pending' },
  { id: 4, patient: 'فاطمة سعيد الزهراني', time: '02:00 م', treatment: 'خلع ضرس', status: 'confirmed' },
  { id: 5, patient: 'خالد عبدالله القحطاني', time: '04:00 م', treatment: 'فحص دوري', status: 'completed' },
];

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { id: 'patients', label: 'المرضى', icon: Users },
  { id: 'appointments', label: 'المواعيد', icon: CalendarDays },
  { id: 'treatments', label: 'العلاجات', icon: Stethoscope },
  { id: 'invoices', label: 'الفواتير', icon: Receipt },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

const statusStyles: Record<Appointment['status'], { label: string; className: string }> = {
  confirmed: { label: 'مؤكد', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  pending: { label: 'قيد الانتظار', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  completed: { label: 'مكتمل', className: 'bg-sky-50 text-sky-700 ring-sky-600/20' },
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-white border-l border-slate-200 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">عيادة الابتسامة</h1>
              <p className="text-xs text-slate-500">إدارة عيادة الأسنان</p>
            </div>
          </div>
          <button
            className="lg:hidden text-slate-500 hover:text-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pr-72">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 backdrop-blur px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-bold text-slate-900">
              {navItems.find((n) => n.id === view)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-slate-500">
              <Search className="h-4 w-4" />
              <input
                type="text"
                placeholder="بحث..."
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-48"
              />
            </div>
            <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white text-sm font-bold">
              د
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {view === 'dashboard' && <Dashboard />}
          {view === 'patients' && <Patients />}
          {view === 'appointments' && <Appointments />}
          {view === 'treatments' && <Treatments />}
          {view === 'invoices' && <Invoices />}
          {view === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { label: 'المرضى اليوم', value: '12', change: '+3', icon: Users, color: 'bg-teal-50 text-teal-600' },
    { label: 'المواعيد القادمة', value: '8', change: '+2', icon: CalendarDays, color: 'bg-sky-50 text-sky-600' },
    { label: 'الإيرادات الشهرية', value: '45,200 ر.س', change: '+12%', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'العلاجات المكتملة', value: '156', change: '+8', icon: CheckCircle2, color: 'bg-violet-50 text-violet-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-600">{s.change}</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">مواعيد اليوم</h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">عرض الكل</button>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 5).map((a) => {
              const st = statusStyles[a.status];
              return (
                <div key={a.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{a.patient}</p>
                      <p className="text-sm text-slate-500">{a.treatment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">{a.time}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${st.className}`}>
                      {st.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-bold text-slate-900 mb-4">نشاط العيادة</h3>
          <div className="space-y-4">
            <ActivityItem icon={CheckCircle2} color="text-emerald-600 bg-emerald-50" title="اكتمل علاج حشو عصب" time="قبل 10 دقائق" />
            <ActivityItem icon={CalendarDays} color="text-sky-600 bg-sky-50" title="حجز موعد جديد" time="قبل 30 دقيقة" />
            <ActivityItem icon={Users} color="text-teal-600 bg-teal-50" title="تسجيل مريض جديد" time="قبل ساعة" />
            <ActivityItem icon={Receipt} color="text-violet-600 bg-violet-50" title="دفع فاتورة بقيمة 800 ر.س" time="قبل ساعتين" />
            <ActivityItem icon={AlertCircle} color="text-amber-600 bg-amber-50" title="إلغاء موعد" time="قبل 3 ساعات" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, color, title, time }: { icon: typeof Bell; color: string; title: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function Patients() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900">قائمة المرضى</h3>
          <p className="text-sm text-slate-500 mt-1">{patients.length} مريض مسجل</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors">
          <Plus className="h-4 w-4" />
          مريض جديد
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">المريض</th>
              <th className="px-6 py-3 font-medium">رقم الهاتف</th>
              <th className="px-6 py-3 font-medium">آخر زيارة</th>
              <th className="px-6 py-3 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-sm font-bold">
                      {p.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{p.phone}</td>
                <td className="px-6 py-4 text-slate-600">{p.lastVisit}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                    p.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                      : 'bg-slate-100 text-slate-600 ring-slate-500/20'
                  }`}>
                    {p.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Appointments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-600">جدول مواعيد اليوم — الأحد 25 أكتوبر 2026</p>
        <button className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors">
          <Plus className="h-4 w-4" />
          حجز موعد
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
        {appointments.map((a) => {
          const st = statusStyles[a.status];
          return (
            <div key={a.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-teal-50 text-teal-700">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs font-semibold mt-1">{a.time.split(' ')[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{a.patient}</p>
                  <p className="text-sm text-slate-500">{a.treatment}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${st.className}`}>
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Treatments() {
  const treatments = [
    { name: 'تنظيف وتلميع الأسنان', count: 48, revenue: '24,000 ر.س' },
    { name: 'حشو العصب', count: 32, revenue: '48,000 ر.س' },
    { name: 'تقويم الأسنان', count: 18, revenue: '90,000 ر.س' },
    { name: 'خلع الأسنان', count: 27, revenue: '13,500 ر.س' },
    { name: 'زراعة الأسنان', count: 9, revenue: '72,000 ر.س' },
    { name: 'تبييض الأسنان', count: 22, revenue: '22,000 ر.س' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {treatments.map((t) => (
        <div key={t.name} className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-sm transition-shadow">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Stethoscope className="h-6 w-6" />
          </div>
          <h4 className="mt-4 font-bold text-slate-900">{t.name}</h4>
          <p className="text-sm text-slate-500 mt-1">{t.count} حالة هذا العام</p>
          <p className="mt-4 text-lg font-bold text-emerald-600">{t.revenue}</p>
        </div>
      ))}
    </div>
  );
}

function Invoices() {
  const invoices = [
    { id: 'INV-1024', patient: 'أحمد محمد علي', amount: '800 ر.س', date: '2026-10-22', status: 'مدفوعة' },
    { id: 'INV-1023', patient: 'نورة إبراهيم العتيبي', amount: '1,200 ر.س', date: '2026-10-21', status: 'مدفوعة' },
    { id: 'INV-1022', patient: 'سارة محمد الدوسري', amount: '5,000 ر.س', date: '2026-10-15', status: 'معلقة' },
    { id: 'INV-1021', patient: 'خالد عبدالله القحطاني', amount: '350 ر.س', date: '2026-10-12', status: 'مدفوعة' },
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="font-bold text-slate-900">الفواتير الأخيرة</h3>
        <p className="text-sm text-slate-500 mt-1">إجمالي: 7,350 ر.س</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">رقم الفاتورة</th>
              <th className="px-6 py-3 font-medium">المريض</th>
              <th className="px-6 py-3 font-medium">المبلغ</th>
              <th className="px-6 py-3 font-medium">التاريخ</th>
              <th className="px-6 py-3 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{inv.id}</td>
                <td className="px-6 py-4 text-slate-600">{inv.patient}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{inv.amount}</td>
                <td className="px-6 py-4 text-slate-600">{inv.date}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                    inv.status === 'مدفوعة'
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                      : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                  }`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 space-y-6">
      <div>
        <h3 className="font-bold text-slate-900">إعدادات العيادة</h3>
        <p className="text-sm text-slate-500 mt-1">معلومات أساسية عن العيادة</p>
      </div>
      <div className="space-y-4">
        <Field label="اسم العيادة" value="عيادة الابتسامة" />
        <Field label="رقم الهاتف" value="0112345678" />
        <Field label="العنوان" value="الرياض، حي العليا، طريق الملك فهد" />
        <Field label="ساعات العمل" value="9:00 ص - 9:00 م" />
      </div>
      <button className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors">
        حفظ التغييرات
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
      />
    </div>
  );
}
