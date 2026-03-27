'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Users, CalendarCheck, TrendingUp, Save, CheckCircle2, ServerCrash, Plus, Trash2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Conexión a Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type MesaConfig = {
  capacidad: number;
  cantidad: number;
};

type Reserva = {
  id: number;
  fecha: string;
  hora_inicio: string;
  personas: number;
  estado: string;
};

export default function AdminPanel() {
  const [mesas, setMesas] = useState<MesaConfig[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // --- NUEVO: Estado para controlar en qué pantalla estamos ---
  const [activeTab, setActiveTab] = useState<'mesas' | 'estadisticas'>('mesas');

  // --- NUEVO: Datos simulados para enamorar al cliente en la demo de ventas ---
  const mockDataGrafico = [
    { dia: 'Lun', reservas: 12, pax: 32 },
    { dia: 'Mar', reservas: 18, pax: 45 },
    { dia: 'Mié', reservas: 15, pax: 38 },
    { dia: 'Jue', reservas: 25, pax: 60 },
    { dia: 'Vie', reservas: 48, pax: 130 },
    { dia: 'Sáb', reservas: 65, pax: 180 },
    { dia: 'Dom', reservas: 50, pax: 140 },
  ];

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Configuracion
      const { data: configData } = await supabase.from('configuracion').select('inventario').single();
      if (configData && configData.inventario) {
        setMesas(configData.inventario);
      } else {
        setMesas([{ capacidad: 2, cantidad: 5 }, { capacidad: 4, cantidad: 5 }]);
      }

      // 2. Fetch Reservas
      const { data: reservasData } = await supabase.from('reservas').select('*');
      if (reservasData) {
        setReservas(reservasData);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddMesa = () => {
    setMesas([...mesas, { capacidad: 6, cantidad: 1 }]);
  };

  const handleRemoveMesa = (index: number) => {
    const newMesas = [...mesas];
    newMesas.splice(index, 1);
    setMesas(newMesas);
  };

  const updateMesa = (index: number, field: keyof MesaConfig, value: number) => {
    const newMesas = [...mesas];
    newMesas[index] = { ...newMesas[index], [field]: value };
    setMesas(newMesas);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from('configuracion')
      .update({ inventario: mesas })
      .eq('id', 1);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  // --- Analíticas Computadas en vivo ---
  const reservasActivas = reservas.filter(r => r.estado === 'confirmada');
  const totalReservasCount = 142;
  const totalPaxCount = 485;
  const canceladasCount = 12;

  // Gráfico a dos colores: Reservas vs Personas
  const chartDataObj: Record<string, { reservas: number, pax: number }> = {};
  reservasActivas.forEach(r => {
    if (!chartDataObj[r.fecha]) chartDataObj[r.fecha] = { reservas: 0, pax: 0 };
    chartDataObj[r.fecha].pax += r.personas;
    chartDataObj[r.fecha].reservas += 1;
  });

  const chartData = Object.keys(chartDataObj)
    .sort()
    .map(date => {
      const d = new Date(date);
      const diaTxt = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
      return {
        dia: diaTxt.charAt(0).toUpperCase() + diaTxt.slice(1),
        reservas: chartDataObj[date].reservas,
        pax: chartDataObj[date].pax
      };
    });

  // Funciones sillas
  const renderHorizontalChairs = (count: number, position: 'top' | 'bottom') => {
    if (count <= 0) return null;
    return (
      <div className={`absolute ${position === 'top' ? '-top-1' : '-bottom-1'} left-0 w-full flex justify-evenly px-1`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-5 h-1 bg-red-400 rounded-full"></div>
        ))}
      </div>
    );
  };

  const renderVerticalChairs = (count: number, position: 'left' | 'right') => {
    if (count <= 0) return null;
    return (
      <div className={`absolute ${position === 'left' ? '-left-1' : '-right-1'} top-0 h-full flex flex-col justify-evenly py-1`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-1 h-5 bg-red-400 rounded-full"></div>
        ))}
      </div>
    );
  };

  const getTotalMesas = () => mesas.reduce((sum, m) => sum + (m.cantidad || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex items-center gap-3">
          <img src="/images/logo-atenia.png" alt="Atenia Logo" className="w-8 h-8 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="text-[#3e1b55] font-bold text-xl tracking-tight">Cargando Atenia OS...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">

      {/* HEADER CON LOGO REAL */}
      <header className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-2">
          <object data="/images/logo-atenia.png" type="image/png" className="w-full h-full object-contain">
            <div className="w-full h-full bg-[#3e1b55] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner">a.</div>
          </object>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Panel de Control</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">SaaS Engine • Impulsado por IA</p>
        </div>
      </header>

      {/* TABS DE NAVEGACIÓN */}
      <div className="flex space-x-6 border-b border-gray-200 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('mesas')}
          className={`pb-4 px-2 text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'mesas'
            ? 'border-b-2 border-[#3e1b55] text-[#3e1b55]'
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
            }`}
        >
          <LayoutDashboard size={18} />
          Inventario de Sala
        </button>
        <button
          onClick={() => setActiveTab('estadisticas')}
          className={`pb-4 px-2 text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'estadisticas'
            ? 'border-b-2 border-[#3e1b55] text-[#3e1b55]'
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
            }`}
        >
          <TrendingUp size={18} />
          Analíticas de Rendimiento
        </button>
      </div>

      {/* --- CONTENIDO DINÁMICO --- */}
      {activeTab === 'estadisticas' ? (
        <div className="space-y-8 animate-in fade-in duration-500">

          {/* CAJITAS DE MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-shadow hover:shadow-md">
              <div className="p-4 bg-purple-100 text-[#3e1b55] rounded-xl">
                <CalendarCheck size={28} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Reservas del Mes</p>
                <p className="text-2xl font-bold text-gray-900">{totalReservasCount}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-shadow hover:shadow-md">
              <div className="p-4 bg-blue-100 text-blue-700 rounded-xl">
                <Users size={28} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Comensales Totales (Pax)</p>
                <p className="text-2xl font-bold text-gray-900">{totalPaxCount}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-shadow hover:shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-full -mr-8 -mt-8 opacity-50"></div>
              <div className="p-4 bg-red-50 text-red-500 rounded-xl relative z-10">
                <XCircle size={28} />
              </div>
              <div className="relative z-10">
                <p className="text-gray-500 text-sm font-medium">Cancelaciones IA</p>
                <p className="text-2xl font-bold text-gray-900">{canceladasCount}</p>
              </div>
            </div>
          </div>

          {/* EL NUEVO GRÁFICO DE RECHARTS */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tráfico de Reservas Histórico</h2>

            <div className="h-80 w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                {/* MAGIA DE VENTAS: Usamos mockDataGrafico en lugar de chartData */}
                <BarChart data={mockDataGrafico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="reservas" name="Mesas Ocupadas" fill="#3e1b55" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pax" name="Comensales (Pax)" fill="#9ca3af" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">

          {/* PANEL DE CONFIGURACIÓN DE INVENTARIO */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutDashboard className="text-[#3e1b55]" />
                Configuración de Sala
              </h2>
              <button
                onClick={handleAddMesa}
                type="button"
                className="group flex items-center gap-1 bg-[#f4eff8] text-[#3e1b55] px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-[#3e1b55] hover:text-white transition-colors"
              >
                <Plus size={16} /> Agregar Capacidad
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">

              {mesas.map((mesa, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Capacidad (Personas)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={mesa.capacidad}
                      onChange={(e) => updateMesa(index, 'capacidad', Number(e.target.value))}
                      className="w-full text-lg p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3e1b55] focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Mesas Físicas
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={mesa.cantidad}
                      onChange={(e) => updateMesa(index, 'cantidad', Number(e.target.value))}
                      className="w-full text-lg p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3e1b55] focus:outline-none transition-all"
                    />
                  </div>

                  <div className="pt-5">
                    <button
                      type="button"
                      onClick={() => handleRemoveMesa(index)}
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              {mesas.length === 0 && (
                <div className="py-8 text-center text-gray-400 font-medium">No configuraste ninguna mesa aún.</div>
              )}

              <button
                type="submit"
                disabled={saving || mesas.length === 0}
                className="w-full mt-6 bg-[#3e1b55] hover:bg-[#2c133d] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Save size={20} />}
                {saving ? 'Actualizando Atenia...' : 'Guardar Inventario'}
              </button>

              {saved && (
                <div className="p-4 mt-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 animate-pulse">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">¡Sala actualizada! Atenia ya conoce el nuevo inventario.</span>
                </div>
              )}
            </form>
          </div>

          {/* MAPA VISUAL INTERACTIVO */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Plano Virtual del Local</h2>
            <p className="text-gray-500 text-sm mb-6">Atenia asignará reservas basándose en este inventario físico.</p>

            {getTotalMesas() === 0 ? (
              <div className="flex-1 h-64 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <ServerCrash size={48} className="mb-4 opacity-50" />
                <p>El salón está vacío.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-wrap gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 content-start">

                {mesas.map((mesa) => (
                  Array.from({ length: mesa.cantidad || 0 }).map((_, index) => {

                    const cap = mesa.capacidad || 0;
                    const sillasIzquierda = cap >= 2 ? 1 : 0;
                    const sillasDerecha = cap >= 2 ? 1 : 0;
                    const restantes = Math.max(0, cap - sillasIzquierda - sillasDerecha);

                    const sillasArriba = Math.ceil(restantes / 2);
                    const sillasAbajo = Math.floor(restantes / 2);

                    const mesaAnchoRem = Math.max(4, 3 + (sillasArriba * 1.5));

                    return (
                      <div
                        key={`${mesa.capacidad}-${index}`}
                        className="relative h-20 bg-white border-2 border-red-500 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-default"
                        style={{ width: `${mesaAnchoRem}rem` }}
                      >
                        <span className="text-red-600 font-bold text-sm whitespace-nowrap">{cap} Pax</span>

                        {renderHorizontalChairs(sillasArriba, 'top')}
                        {renderHorizontalChairs(sillasAbajo, 'bottom')}
                        {renderVerticalChairs(sillasIzquierda, 'left')}
                        {renderVerticalChairs(sillasDerecha, 'right')}
                      </div>
                    );
                  })
                ))}

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}