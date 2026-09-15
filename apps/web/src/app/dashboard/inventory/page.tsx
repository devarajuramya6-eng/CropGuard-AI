export default function InventoryPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Equipment & Chemical Inventory</h1>
      <p className="text-slate-500">Track your farming tools, fertilizers, and pesticides.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-content p-6">
            <h3 className="text-sm font-medium text-slate-500">Tractors</h3>
            <div className="text-3xl font-bold text-slate-800 mt-2">2 Available</div>
          </div>
        </div>
        <div className="card">
          <div className="card-content p-6">
            <h3 className="text-sm font-medium text-slate-500">NPK Fertilizer</h3>
            <div className="text-3xl font-bold text-slate-800 mt-2">450 kg</div>
          </div>
        </div>
        <div className="card border-red-200 bg-red-50">
          <div className="card-content p-6">
            <h3 className="text-sm font-medium text-red-600">Copper Fungicide</h3>
            <div className="text-3xl font-bold text-red-700 mt-2">Low Stock (5L)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
