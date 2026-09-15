export default function TasksPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Task Management</h1>
      <p className="text-slate-500">Manage your farm operations and schedules here.</p>
      
      <div className="card">
        <div className="card-header border-b">
          <h3 className="card-title text-lg text-slate-800">Pending Tasks</h3>
        </div>
        <div className="card-content p-0">
          <ul className="divide-y divide-gray-100">
            <li className="flex items-center p-4 hover:bg-slate-50 transition-colors">
              <input type="checkbox" className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary mr-4" />
              <div className="flex-1">
                <p className="font-medium text-slate-800">Spray Fungicide on Tomato Plot A</p>
                <p className="text-sm text-red-500">Due Today</p>
              </div>
            </li>
            <li className="flex items-center p-4 hover:bg-slate-50 transition-colors">
              <input type="checkbox" className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary mr-4" />
              <div className="flex-1">
                <p className="font-medium text-slate-800">Irrigate Wheat Field North</p>
                <p className="text-sm text-slate-500">Tomorrow</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
