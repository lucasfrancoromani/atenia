'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LayoutDashboard, Users, CalendarCheck, TrendingUp, Save, CheckCircle2, ServerCrash, Plus, Trash2, XCircle, Clock, Sun, Moon, Map } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type MesaFisica = { id: number; capacidad: number; };
type ZonaConfig = { id: string; nombre: string; color: string; mesas: MesaFisica[]; };
type Reserva = {
  id: number | string;
  fecha: string;
  hora_inicio: string;
  hora_fin?: string;
  personas: number;
  estado: string;
  nombre?: string;
  mesa_id?: number;
  zona_id?: string;
};

const HORAS = {
  mediodia: ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  noche: ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00']
};
const ZONA_COLORS = ['#534AB7', '#1D9E75', '#D85A30', '#BA7517', '#185FA5', '#993556', '#3B6D11', '#5F5E5A'];

export default function AdminPanel() {
  const [zonas, setZonas] = useState<ZonaConfig[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estado para la fecha seleccionada (Por defecto: Hoy)
  const [fechaFiltro, setFechaFiltro] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // Estados Operativos
  const [activeTab, setActiveTab] = useState<'turnos' | 'mesas' | 'estadisticas' | 'historial'>('turnos');
  const [turno, setTurno] = useState<'mediodia' | 'noche'>('noche');
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [zonaFiltro, setZonaFiltro] = useState<string>('todas');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Estados Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZonaPredef, setModalZonaPredef] = useState<string | null>(null);
  const [modalForm, setModalForm] = useState({ nombre: '', personas: 2, hora_inicio: '20:00', mesa_id: null as number | null });
  const [isSubmittingReserva, setIsSubmittingReserva] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock
  const mockDataGrafico = [
    { dia: 'Lun', reservas: 12, pax: 32 }, { dia: 'Mar', reservas: 18, pax: 45 },
    { dia: 'Mié', reservas: 15, pax: 38 }, { dia: 'Jue', reservas: 25, pax: 60 },
    { dia: 'Vie', reservas: 48, pax: 130 }, { dia: 'Sáb', reservas: 65, pax: 180 },
    { dia: 'Dom', reservas: 50, pax: 140 },
  ];

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      // Configuracion
      const { data: configData } = await supabase.from('configuracion').select('inventario').single();
      if (configData && configData.inventario) {
        const inv = configData.inventario;
        // Migrar viejo inventario a "Zonas" si es necesario
        if (inv.length > 0 && typeof inv[0].cantidad !== 'undefined') {
          const mesasMigradas: MesaFisica[] = [];
          let mId = 1;
          inv.forEach((item: any) => {
            for (let i = 0; i < item.cantidad; i++) mesasMigradas.push({ id: mId++, capacidad: item.capacidad });
          });
          setZonas([{ id: 'z_principal', nombre: 'Salón Principal', color: '#534AB7', mesas: mesasMigradas }]);
        } else {
          setZonas(inv); // Formato zonas correcto
        }
      } else {
        setZonas([
          { id: 'z1', nombre: 'Salón Principal', color: '#534AB7', mesas: [{ id: 1, capacidad: 2 }, { id: 2, capacidad: 4 }] },
          { id: 'z2', nombre: 'Terraza', color: '#1D9E75', mesas: [{ id: 3, capacidad: 2 }] }
        ]);
      }

      // Reservas
      const { data: reservasData } = await supabase.from('reservas').select('*');
      if (reservasData) setReservas(reservasData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Fetch historial de reservas expiradas
  const [historial, setHistorial] = useState<Reserva[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(true);
  useEffect(() => {
    async function fetchHistorial() {
      const { data, error } = await supabase.from('reservas_historial').select('*');
      if (error) console.error('Error fetching historial:', error);
      else setHistorial(data || []);
      setLoadingHistorial(false);
    }
    fetchHistorial();
  }, []);

  // Helper de Mesas All
  const mesasVisuales = zonas.flatMap(z => z.mesas.map(m => ({ ...m, zona: z })));
  const getZonaDeMesa = (resId: number) => mesasVisuales.find(m => m.id === resId)?.zona;

  const isMediodia = (hora: string) => parseInt(hora.split(':')[0]) >= 11 && parseInt(hora.split(':')[0]) < 18;

  const reservasDelTurno = reservas
    .filter(r => r.estado === 'confirmada' || r.estado === 'pendiente')
    // MAGIA: Filtramos para que solo muestre las del día seleccionado
    .filter(r => r.fecha === fechaFiltro)
    .filter(r => turno === 'mediodia' ? isMediodia(r.hora_inicio) : !isMediodia(r.hora_inicio));

  // Asignación Dinámica Multimesa (UX Frontend Tetris)
  let cloneVisuales = [...mesasVisuales];
  const mapeoReservas: { res: Reserva, mesaIds: number[] }[] = [];

  reservasDelTurno.forEach(res => {
    let pRes = res.personas;
    let asignadas: number[] = [];

    // Priorizamos mesa_id original si existe
    if (res.mesa_id) {
      asignadas.push(res.mesa_id);
      let mCap = mesasVisuales.find(m => m.id === res.mesa_id)?.capacidad || 0;
      pRes -= mCap;
      cloneVisuales = cloneVisuales.filter(m => m.id !== res.mesa_id);
    }

    // Si aún sobran personas (grupo grande o IA no asignó mesa_id)
    while (pRes > 0 && cloneVisuales.length > 0) {
      const zIdTarget = res.zona_id || (res.mesa_id ? mesasVisuales.find(m => m.id === res.mesa_id)?.zona.id : null);
      let candidatas = cloneVisuales.filter(m => !zIdTarget || m.zona.id === zIdTarget);
      if (candidatas.length === 0) candidatas = cloneVisuales;

      candidatas.sort((a, b) => a.capacidad - b.capacidad);
      let elegida = candidatas.find(m => m.capacidad >= pRes) || candidatas[candidatas.length - 1];

      if (elegida) {
        asignadas.push(elegida.id);
        pRes -= elegida.capacidad;
        cloneVisuales = cloneVisuales.filter(m => m.id !== elegida.id);
      } else {
        break;
      }
    }

    // Solo asignamos mesa si realmente se procesó
    const fallbackId = asignadas.length > 0 ? asignadas[0] : (mesasVisuales[0]?.id || 1);
    mapeoReservas.push({ res: { ...res, mesa_id: res.mesa_id || fallbackId }, mesaIds: asignadas });
  });

  const reservasAsignadas = mapeoReservas.map(m => m.res);

  const getReservasEnMesa = (resId: number) => {
    return mapeoReservas.filter(m => m.mesaIds.includes(resId)).map(m => m.res);
  };

  // Stats
  const mesasOcupadasIds = new Set(mapeoReservas.flatMap(m => m.mesaIds));
  const paxDelTurno = reservasDelTurno.reduce((sum, r) => sum + (r.personas || 0), 0);
  const totalMesas = mesasVisuales.length;
  const ocupadas = mesasOcupadasIds.size;
  const libres = totalMesas - ocupadas;
  const pctOcupacion = totalMesas > 0 ? Math.round((ocupadas / totalMesas) * 100) : 0;

  // Acciones Toast & Modal
  const showToast = (msg: string) => {
    setToastMessage(msg); setTimeout(() => setToastMessage(null), 3500);
  };

  const openModal = (mesaId: number | null = null, zonaPredef: string | null = null) => {
    setModalForm({ nombre: '', personas: 2, hora_inicio: HORAS[turno][0], mesa_id: mesaId });
    setModalZonaPredef(zonaPredef);
    setIsModalOpen(true);
  };

  const handleCreateReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.nombre || !modalForm.mesa_id) return;
    setIsSubmittingReserva(true);

    const [h, m] = modalForm.hora_inicio.split(':');
    let endH = parseInt(h) + 2;
    const hora_fin = endH >= 24 ? "23:59" : `${endH.toString().padStart(2, '0')}:${m}`;

    const zonaIdCorrecta = getZonaDeMesa(modalForm.mesa_id)?.id || 'z1';

    const nuevaReserva = {
      nombre: modalForm.nombre,
      personas: modalForm.personas,
      hora_inicio: modalForm.hora_inicio,
      hora_fin: hora_fin,
      fecha: fechaFiltro,
      estado: 'confirmada',
      mesa_id: modalForm.mesa_id,
      zona_id: zonaIdCorrecta
    };

    const { data: inserted, error } = await supabase.from('reservas').insert([nuevaReserva]).select('*');
    setIsSubmittingReserva(false);

    if (error) alert("Error: " + error.message);
    else if (inserted && inserted.length > 0) {
      setReservas([...reservas, inserted[0]]);
      
      // Auto-cambio de pestaña según el horario de la reserva
      const newTurno = isMediodia(nuevaReserva.hora_inicio) ? 'mediodia' : 'noche';
      setTurno(newTurno);
      
      showToast(`Reserva confirmada: ${modalForm.nombre} en Mesa ${nuevaReserva.mesa_id}`);
      setIsModalOpen(false);
    }
  };

  const handleDeleteReserva = async (id: number | string) => {
    if (!confirm("¿Seguro que deseas cancelar esta reserva?")) return;
    const { error } = await supabase.from('reservas').delete().eq('id', id);
    if (!error) {
      setReservas(reservas.filter(r => r.id !== id));
      showToast('Reserva cancelada correctamente');
    } else alert("Error: " + error.message);
  };

  // Delete historial entry
  const handleDeleteHistorial = async (id: number | string) => {
    if (!confirm('¿Eliminar este registro del historial?')) return;
    const { error } = await supabase.from('reservas_historial').delete().eq('id', id);
    if (!error) {
      setHistorial(historial.filter(r => r.id !== id));
      showToast('Registro del historial eliminado');
    } else alert('Error: ' + error.message);
  };

  // UI Helpers Sillas
  const renderHorizontalChairs = (count: number, position: 'top' | 'bottom', sillaHex: string) => {
    if (count <= 0) return null;
    return (
      <div className={`absolute ${position === 'top' ? '-top-1.5' : '-bottom-1.5'} left-0 w-full flex justify-evenly px-2`}>
        {Array.from({ length: count }).map((_, i) => <div key={i} className={`w-4 h-1.5 rounded-full transition-colors`} style={{ backgroundColor: sillaHex }}></div>)}
      </div>
    );
  };

  const renderVerticalChairs = (count: number, position: 'left' | 'right', sillaHex: string) => {
    if (count <= 0) return null;
    return (
      <div className={`absolute ${position === 'left' ? '-left-1.5' : '-right-1.5'} top-0 h-full flex flex-col justify-evenly py-2`}>
        {Array.from({ length: count }).map((_, i) => <div key={i} className={`w-1.5 h-4 rounded-full transition-colors`} style={{ backgroundColor: sillaHex }}></div>)}
      </div>
    );
  };

  const getMesaColors = (mesaId: number, baseColor: string) => {
    if (selectedTableId === mesaId) return { bg: 'bg-[#EEEDFE]', borderClass: '', textClass: 'text-[#534AB7]', borderHex: '#534AB7', sillaHex: '#534AB7' };
    if (mesasOcupadasIds.has(mesaId)) return { bg: 'bg-[#FCEBEB]', borderClass: 'border-[#F09595]', textClass: 'text-[#A32D2D]', labelText: 'text-[#D85A30]', sillaHex: '#F09595' };
    return { bg: 'bg-white', borderClass: '', textClass: 'text-gray-800', borderHex: baseColor, sillaHex: baseColor };
  };

  // Config Zonas
  const handleSaveZonas = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const { error } = await supabase.from('configuracion').update({ inventario: zonas }).eq('id', 1);
    setSaving(false);
    if (!error) showToast("Inventario de Zonas guardado en Supabase");
    else alert(error.message);
  };

  const addZona = () => {
    const newId = `z_${Date.now()}`;
    const nextColor = ZONA_COLORS[zonas.length % ZONA_COLORS.length];
    setZonas([...zonas, { id: newId, nombre: `Nueva Zona ${zonas.length + 1}`, color: nextColor, mesas: [] }]);
  };
  const deleteZona = (zInd: number) => setZonas(zonas.filter((_, i) => i !== zInd));
  const updateZona = (zInd: number, key: keyof ZonaConfig, val: string) => {
    const zs = [...zonas]; zs[zInd] = { ...zs[zInd], [key]: val }; setZonas(zs);
  };
  const addMesaToZona = (zInd: number) => {
    const zs = [...zonas];
    const maxId = zs.flatMap(z => z.mesas.map(m => m.id)).reduce((max, id) => Math.max(max, id), 0);
    zs[zInd].mesas.push({ id: maxId + 1, capacidad: 2 });
    setZonas(zs);
  };
  const updateMesaCap = (zInd: number, mInd: number, cap: number) => {
    const zs = [...zonas]; zs[zInd].mesas[mInd].capacidad = cap; setZonas(zs);
  };
  const deleteMesaFromZona = (zInd: number, mInd: number) => {
    const zs = [...zonas]; zs[zInd].mesas.splice(mInd, 1); setZonas(zs);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex items-center gap-3">
          <div className="text-[#3e1b55] font-bold text-xl tracking-tight">Cargando Atenia OS...</div>
        </div>
      </div>
    );
  }

  const zonasFiltradas = zonaFiltro === 'todas' ? zonas : zonas.filter(z => z.id === zonaFiltro);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      <header className="bg-white px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 sticky top-0 z-50 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-1.5 shrink-0">
            <object data="/images/logo-atenia.png" type="image/png" className="w-full h-full object-contain">
              <div className="w-full h-full bg-[#3e1b55] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-inner">a.</div>
            </object>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Atenia · Panel de control</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Gestión Inteligente Multisala</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-600 self-start md:self-auto">
          <Clock size={14} className="text-[#534AB7]" />
          {currentTime ? currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-4 md:px-6 flex space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button onClick={() => { setActiveTab('turnos'); setSelectedTableId(null); }} className={`py-3 px-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'turnos' ? 'border-[#534AB7] text-[#534AB7]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}><LayoutDashboard size={16} /> Operativos de Salón</button>
        <button onClick={() => setActiveTab('mesas')} className={`py-3 px-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'mesas' ? 'border-[#534AB7] text-[#534AB7]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}><Map size={16} /> Configuración de Zonas</button>
        <button onClick={() => setActiveTab('estadisticas')} className={`py-3 px-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'estadisticas' ? 'border-[#534AB7] text-[#534AB7]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}><TrendingUp size={16} /> Analíticas</button>
          <button onClick={() => setActiveTab('historial')} className={`py-3 px-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'historial' ? 'border-[#534AB7] text-[#534AB7]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}><Clock size={16} /> Historial</button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'turnos' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300">

            {/* ESTE ES EL BLOQUE QUE CAMBIA: */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex items-center gap-3">

                {/* BOTONES DE TURNO */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                  <button onClick={() => { setTurno('mediodia'); setSelectedTableId(null); }} className={`py-1.5 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${turno === 'mediodia' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Sun size={14} className={turno === 'mediodia' ? 'text-yellow-500' : ''} /> Mediodía</button>
                  <button onClick={() => { setTurno('noche'); setSelectedTableId(null); }} className={`py-1.5 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${turno === 'noche' ? 'bg-[#534AB7] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Moon size={14} className={turno === 'noche' ? 'text-indigo-200' : ''} /> Noche</button>
                </div>

                <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>

                {/* NUEVO: SELECTOR DE FECHA */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#534AB7] transition-all">
                  <CalendarCheck size={16} className="text-[#534AB7]" />
                  <input
                    type="date"
                    value={fechaFiltro}
                    onChange={(e) => { setFechaFiltro(e.target.value); setSelectedTableId(null); }}
                    className="text-sm font-bold text-gray-700 bg-transparent outline-none cursor-pointer"
                  />
                </div>

              </div>

              <button onClick={() => openModal()} className="py-2.5 px-5 rounded-xl text-sm font-bold bg-[#534AB7] text-white hover:bg-[#3C3489] hover:shadow-md transition-all flex items-center gap-2">
                <Plus size={16} /> Nueva Reserva
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="w-full lg:w-[320px] shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-4 md:p-5 flex flex-col gap-6 overflow-y-auto lg:h-full max-h-[45vh] lg:max-h-full">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-2xl font-semibold text-[#534AB7]">{totalMesas}</p><p className="text-[11px] text-gray-500 uppercase mt-1">Total Mesas</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-2xl font-semibold text-amber-600">{paxDelTurno}</p><p className="text-[11px] text-gray-500 uppercase mt-1">Pax Turno</p>
                  </div>
                  <div className="bg-[#EAF3DE] rounded-xl p-3 text-center border border-[#d2e8b8]">
                    <p className="text-2xl font-semibold text-[#27500A]">{libres}</p><p className="text-[11px] text-[#3B6D11] uppercase mt-1">Libres</p>
                  </div>
                  <div className="bg-[#FCEBEB] rounded-xl p-3 text-center border border-[#f7cdcd]">
                    <p className="text-2xl font-semibold text-[#A32D2D]">{ocupadas}</p><p className="text-[11px] text-[#C04949] uppercase mt-1">Ocupadas</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-600 uppercase">Ocupación General</span><span className="text-sm font-bold text-gray-900">{pctOcupacion}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 rounded-full ${pctOcupacion >= 80 ? 'bg-[#D85A30]' : pctOcupacion >= 50 ? 'bg-amber-500' : 'bg-[#534AB7]'}`} style={{ width: `${pctOcupacion}%` }} />
                  </div>
                </div>

                <div className="border-b border-gray-100 pb-2">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Filtro de Zona</h3>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setZonaFiltro('todas')} className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${zonaFiltro === 'todas' ? 'bg-gray-900 text-white border-gray-900 font-bold' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                      Todas
                    </button>
                    {zonas.map(z => (
                      <button key={z.id} onClick={() => setZonaFiltro(z.id)} className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 border ${zonaFiltro === z.id ? 'bg-[#EEEDFE] border-[#534AB7] text-[#3e1b55] font-bold' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: z.color }}></div> {z.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">Reservas Activas</h3>
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                    {reservasAsignadas.filter(r => zonaFiltro === 'todas' || getZonaDeMesa(r.mesa_id || 0)?.id === zonaFiltro).length === 0 ? <p className="text-xs text-gray-400 text-center py-6">Sin reservas.</p>
                      : reservasAsignadas.filter(r => zonaFiltro === 'todas' || getZonaDeMesa(r.mesa_id || 0)?.id === zonaFiltro).map(r => {
                        const zona = getZonaDeMesa(r.mesa_id || 0);
                        return (
                          <div key={r.id} onClick={() => setSelectedTableId(r.mesa_id || null)} className={`p-3 rounded-xl cursor-pointer border transition-all flex flex-col gap-1 ${selectedTableId === r.mesa_id ? 'bg-[#EEEDFE] border-[#534AB7]' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-semibold text-gray-900 truncate">{r.nombre}</p>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap opacity-80" style={{ backgroundColor: zona?.color ? `${zona.color}20` : '#e2e8f0', color: zona?.color }}>M {r.mesa_id}</span>
                            </div>
                            <p className="text-[11px] text-gray-500">{r.personas}pax • {r.hora_inicio}-{r.hora_fin?.substring(0,5) || '...'} • {zona?.nombre}</p>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-gray-50 max-h-full">
                <div className="flex-1 overflow-auto p-5 pb-24 content-start">
                  {zonasFiltradas.map(zona => {
                    const ocupadasZ = zona.mesas.filter(m => mesasOcupadasIds.has(m.id)).length;
                    return (
                      <div key={zona.id} className="border bg-white rounded-3xl overflow-hidden mb-8 shadow-sm" style={{ borderColor: `${zona.color}50` }}>
                        <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: `${zona.color}11`, borderBottom: `1px solid ${zona.color}30` }}>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: zona.color }}></div>
                            <span className="font-bold text-gray-900">{zona.nombre}</span>
                            <span className="text-xs text-gray-600 bg-white/50 px-2 py-0.5 rounded-md font-medium">{zona.mesas.length} mesas • {ocupadasZ} ocupadas</span>
                          </div>
                          <button onClick={() => openModal(null, zona.id)} className="text-[11px] font-bold px-3 py-1.5 rounded-lg border bg-white transition-colors" style={{ color: zona.color, borderColor: `${zona.color}50` }}>+ Reservar en Zona</button>
                        </div>
                        <div className="p-6 flex flex-wrap gap-8 items-start">
                          {zona.mesas.map(mesa => {
                            const resMesa = getReservasEnMesa(mesa.id);
                            const estado = getMesaColors(mesa.id, zona.color);
                            const cap = mesa.capacidad;
                            let sillasIzquierda = 0; let sillasDerecha = 0;
                            if (cap > 4) { sillasIzquierda = 1; sillasDerecha = 1; }
                            const restantes = Math.max(0, cap - sillasIzquierda - sillasDerecha);
                            const sillasArriba = Math.ceil(restantes / 2); const sillasAbajo = Math.floor(restantes / 2);
                            const mesaAnchoRem = Math.max(4.5, 3.5 + (Math.max(sillasArriba, sillasAbajo) * 1.5));

                            return (
                              <div key={mesa.id} onClick={() => setSelectedTableId(selectedTableId === mesa.id ? null : mesa.id)} className={`relative z-10 hover:z-40 h-20 border-[2.5px] rounded-2xl flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:scale-[1.03] transition-all cursor-pointer ${estado.bg} ${estado.borderClass} hover:shadow-xl select-none`} style={{ width: `${mesaAnchoRem}rem`, borderColor: estado.borderHex }}>
                                <span className={`font-bold text-xl leading-none ${estado.textClass}`} style={{ color: estado.textClass === 'text-gray-800' ? '#333' : undefined }}>{mesa.id}</span>
                                <span className={`font-medium text-[10px] leading-tight opacity-70 mt-0.5 ${estado.textClass}`} style={{ color: estado.textClass === 'text-gray-800' ? '#444' : undefined }}>{cap} pax</span>

                                {resMesa.length > 0 && selectedTableId !== mesa.id && <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse z-10" />}

                                {renderHorizontalChairs(sillasArriba, 'top', estado.sillaHex)}
                                {renderHorizontalChairs(sillasAbajo, 'bottom', estado.sillaHex)}
                                {renderVerticalChairs(sillasIzquierda, 'left', estado.sillaHex)}
                                {renderVerticalChairs(sillasDerecha, 'right', estado.sillaHex)}

                                {resMesa.length > 0 && (
                                  <div
                                    onClick={(e) => { e.stopPropagation(); setSelectedTableId(mesa.id); }}
                                    className={`group absolute -bottom-7 left-1/2 -translate-x-1/2 w-[140%] max-w-[110px] text-center ${estado.labelText || estado.textClass} text-[10px] font-bold bg-white shadow-sm border border-gray-200 rounded-md px-1.5 py-0.5 z-20 cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-50`}
                                  >
                                    <span className="truncate w-full pointer-events-none">{resMesa[0].nombre} • {resMesa[0].hora_inicio}</span>
                                    {/* Tooltip */}
                                    <div className="hidden group-hover:flex absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-max max-w-[200px] flex-col items-center px-2.5 py-1.5 bg-gray-900 text-white text-[11px] rounded shadow-xl z-[100] pointer-events-none whitespace-normal leading-tight">
                                      {resMesa[0].nombre} • {resMesa[0].hora_inicio}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Panel bottom removed and replaced by modal */}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mesas' && (
          <div className="flex-1 flex flex-col overflow-y-auto p-4 md:p-6 lg:p-10 gap-6 animate-in fade-in bg-white max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestor de Zonas del Salón</h2>
                <p className="text-gray-500 mt-1">Crea zonas, asígnale mesas, y ubica todas en tu plano.</p>
              </div>
              <button disabled={saving} onClick={handleSaveZonas} className="bg-[#3e1b55] hover:bg-[#2c133d] text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50">
                <Save size={18} /> {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>

            <div className="space-y-6">
              {zonas.map((zona, zInd) => (
                <div key={zona.id} className="border-2 rounded-2xl overflow-hidden shadow-sm" style={{ borderColor: `${zona.color}30` }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 border-b gap-4" style={{ borderColor: `${zona.color}30` }}>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <select value={zona.color} onChange={(e) => updateZona(zInd, 'color', e.target.value)} className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer appearance-none" style={{ backgroundColor: zona.color, color: 'transparent' }}>
                        {ZONA_COLORS.map(c => <option key={c} value={c} style={{ background: c }}>{c}</option>)}
                      </select>
                      <input value={zona.nombre} onChange={(e) => updateZona(zInd, 'nombre', e.target.value)} className="font-bold text-lg md:text-xl bg-transparent border-b-2 border-transparent outline-none focus:border-gray-300 px-1 w-full md:w-auto" placeholder="Nombre Zona" />
                    </div>
                    <button onClick={() => deleteZona(zInd)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 self-end md:self-auto"><Trash2 size={16} /> Eliminar Zona</button>
                  </div>

                  <div className="p-5 flex flex-wrap gap-4 items-stretch bg-white">
                    {zona.mesas.map((m, mInd) => (
                      <div key={m.id} className="border rounded-xl p-3 flex flex-col items-center gap-2 relative shadow-sm min-w-[90px] w-[100px]" style={{ borderColor: `${zona.color}40`, backgroundColor: `${zona.color}05` }}>
                        <span className="text-[10px] font-bold absolute top-1.5 left-2 uppercase opacity-60" style={{ color: zona.color }}>Mesa</span>
                        <span className="font-bold text-gray-900 absolute top-1.5 right-2 text-xs">#{m.id}</span>
                        <div className="mt-5 flex flex-col items-center gap-1 w-full">
                          <input type="number" min="1" value={m.capacidad} onChange={(e) => updateMesaCap(zInd, mInd, Number(e.target.value))} className="w-12 border bg-white rounded-lg p-1.5 text-center font-bold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-100" />
                          <span className="text-[10px] text-gray-500 font-semibold uppercase">Pax</span>
                        </div>
                        <button onClick={() => deleteMesaFromZona(zInd, mInd)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-red-400 shadow-sm border border-gray-200 hover:text-red-600 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100 focus:opacity-100"><XCircle size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => addMesaToZona(zInd)} className="border-2 border-dashed border-gray-300 rounded-xl px-4 flex flex-col items-center justify-center min-h-[90px] text-gray-400 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 font-semibold text-xs gap-1 transition-colors">
                      <Plus size={18} /><span>Añadir Mesa</span>
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-4 flex justify-between">
                <button onClick={addZona} className="bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-sm transition-colors text-sm">
                  <Plus size={18} /> Crear Nueva Zona
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analiticas */}
        {activeTab === 'estadisticas' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 animate-in fade-in bg-white max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"><p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Reservas Totales</p><p className="text-4xl font-black mt-2 text-[#3e1b55]">342</p></div>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"><p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Comensales Atendidos</p><p className="text-4xl font-black mt-2 text-indigo-600">830</p></div>
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"><p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Cancelaciones</p><p className="text-4xl font-black mt-2 text-red-500">22</p></div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 h-[400px] flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actividad de la Semana Actual</h2>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockDataGrafico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                    <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="reservas" fill="#534AB7" radius={[6, 6, 0, 0]} name="Reservas" />
                    <Bar dataKey="pax" fill="#E5E7EB" radius={[6, 6, 0, 0]} name="Personas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Historial */}
        {activeTab === 'historial' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 animate-in fade-in bg-white max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Historial de Reservas</h2>
                <p className="text-gray-500 mt-1">Consulta y gestiona las reservas que ya han finalizado.</p>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-sm">
                  <CalendarCheck size={16} className="text-[#534AB7]" />
                  <input
                    type="date"
                    value={fechaFiltro}
                    onChange={(e) => setFechaFiltro(e.target.value)}
                    className="text-sm font-bold text-gray-700 bg-transparent outline-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Archivadas</span>
                <span className="text-2xl font-black text-[#534AB7]">{historial.length}</span>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pax Histórico</span>
                <span className="text-2xl font-black text-amber-600">{historial.reduce((sum, r) => sum + (r.personas || 0), 0)}</span>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Filtradas por Fecha</span>
                <span className="text-2xl font-black text-indigo-600">{historial.filter(r => r.fecha === fechaFiltro).length}</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto whitespace-nowrap">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Cliente</th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Fecha</th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Horario</th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Pax</th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Mesa / Zona</th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loadingHistorial ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                           <div className="flex flex-col items-center gap-2">
                             <div className="w-6 h-6 border-2 border-[#534AB7]/20 border-t-[#534AB7] rounded-full animate-spin" />
                             <p className="text-sm text-gray-400 font-medium italic">Cargando historial...</p>
                           </div>
                        </td>
                      </tr>
                    ) : historial.filter(r => r.fecha === fechaFiltro).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic font-medium">Sin registros archivados para esta fecha.</td>
                      </tr>
                    ) : (
                      historial
                        .filter(r => r.fecha === fechaFiltro)
                        .sort((a, b) => b.hora_inicio.localeCompare(a.hora_inicio))
                        .map((r) => {
                          const zona = getZonaDeMesa(r.mesa_id || 0);
                          return (
                            <tr key={r.id} className="hover:bg-gray-50/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-gray-900 text-sm">{r.nombre || 'Sin nombre'}</span>
                                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Reserva #{r.id}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-sm font-semibold text-gray-600">{r.fecha}</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50">
                                  {r.hora_inicio} - {r.hora_fin || '—'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-sm font-bold text-gray-700">{r.personas}p</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-xs font-black text-gray-900">M{r.mesa_id}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-black uppercase tracking-tight">{zona?.nombre || 'General'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteHistorial(r.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                  title="Eliminar permanentemente"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">Nueva reserva</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-1 uppercase tracking-wide">Turno {turno === 'mediodia' ? 'Mediodía' : 'Noche'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 bg-white shadow-sm p-1.5 rounded-full border border-gray-200"><XCircle size={20} /></button>
            </div>

            <form onSubmit={handleCreateReserva} className="p-5 md:p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">Nombre <span className="text-red-400">*</span></label>
                  <input required placeholder="Ej. Juan Pérez" value={modalForm.nombre} onChange={(e) => setModalForm({ ...modalForm, nombre: e.target.value })} className="w-full text-sm font-medium p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#534AB7] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Personas</label>
                  <input type="number" min="1" max="20" required value={modalForm.personas} onChange={(e) => setModalForm({ ...modalForm, personas: Number(e.target.value) })} className="w-full text-sm font-medium p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#534AB7] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Hora</label>
                <input 
                  type="time" 
                  value={modalForm.hora_inicio} 
                  onChange={(e) => setModalForm({ ...modalForm, hora_inicio: e.target.value })} 
                  className="w-full text-sm font-medium p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#534AB7] focus:outline-none bg-white font-sans"
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="block text-[11px] font-bold text-[#3e1b55] uppercase tracking-widest mb-3">Mesa y Zona</label>
                <div className="flex flex-wrap gap-2">
                  {mesasVisuales.filter(m => m.capacidad >= modalForm.personas && (!modalZonaPredef || m.zona.id === modalZonaPredef)).length === 0 ? (
                    <p className="text-xs text-red-500 font-medium py-2 px-3 bg-red-50 rounded-lg w-full">⚠️ No hay mesas {modalZonaPredef ? 'en esta zona ' : ''}con capacidad para {modalForm.personas} pax.</p>
                  ) : (
                    mesasVisuales.filter(m => m.capacidad >= modalForm.personas && (!modalZonaPredef || m.zona.id === modalZonaPredef)).map(m => {
                      const estaOcupada = mesasOcupadasIds.has(m.id);
                      const isSelected = modalForm.mesa_id === m.id;
                      return (
                        <button
                          key={m.id} type="button" disabled={estaOcupada}
                          onClick={() => setModalForm({ ...modalForm, mesa_id: m.id })}
                          className={`px-3 py-2 rounded-xl border text-sm transition-all text-left flex gap-1.5 items-center
                            ${estaOcupada ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-500'
                              : isSelected ? 'bg-indigo-50 border-[#534AB7] text-[#3e1b55] font-bold shadow-sm ring-1 ring-[#534AB7]'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
                        >
                          <div className={`w-2 h-2 rounded-full ${estaOcupada ? 'opacity-50' : ''}`} style={{ backgroundColor: m.zona.color }}></div>
                          <strong className={estaOcupada ? 'line-through' : ''}>M{m.id}</strong>
                          <span className={`${estaOcupada ? 'line-through' : ''} text-xs font-normal opacity-70`}>{m.capacidad}p</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Cancelar</button>
                <button type="submit" disabled={!modalForm.mesa_id || isSubmittingReserva} className="flex-[2] py-3 text-sm font-bold text-white bg-[#534AB7] border border-transparent rounded-xl hover:bg-[#3C3489] shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                  {isSubmittingReserva ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 size={16} />} Confirma{isSubmittingReserva ? 'ndo' : 'r'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Nuevo Modal de Detalles de Mesa */}
      {selectedTableId !== null && activeTab === 'turnos' && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col relative">
            <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">Mesa {selectedTableId}</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-1 uppercase tracking-wide">
                  {getZonaDeMesa(selectedTableId)?.nombre || 'Sin Zona'} • Capacidad {mesasVisuales.find(m => m.id === selectedTableId)?.capacidad}pax
                </p>
              </div>
              <button onClick={() => setSelectedTableId(null)} className="text-gray-400 hover:text-gray-700 bg-white shadow-sm p-1.5 rounded-full border border-gray-200 transition-colors hover:bg-gray-100"><XCircle size={20} /></button>
            </div>

            <div className="p-6 md:p-7 max-h-[70vh] overflow-y-auto bg-white">
              {getReservasEnMesa(selectedTableId).length === 0 ? (
                <div className="flex flex-col gap-4 text-center items-center py-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-1">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg">Mesa libre</h4>
                    <p className="text-gray-500 text-sm mt-1">Disponible para el turno actual</p>
                  </div>
                  <button onClick={() => { setSelectedTableId(null); openModal(selectedTableId); }} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                    <Plus size={18} /> Asignar Reserva
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Reservas Asignadas</h4>
                  {getReservasEnMesa(selectedTableId).map(r => (
                    <div key={r.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: getZonaDeMesa(r.mesa_id || 0)?.color }}></div>
                      <div className="flex justify-between items-start ml-2">
                        <div>
                          <p className="font-bold text-gray-900 text-lg leading-tight">{r.nombre}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-md">{r.personas} pax</span>
                            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md">{r.hora_inicio} - {r.hora_fin?.substring(0,5)} hs</span>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Confirmada</span>
                      </div>
                      <div className="mt-5 ml-2 border-t border-gray-200 pt-4 flex">
                        <button onClick={() => { handleDeleteReserva(r.id); setSelectedTableId(null); }} className="w-full text-xs text-red-600 hover:text-white hover:bg-red-500 hover:border-red-500 font-bold px-4 py-2.5 rounded-xl border border-red-200 transition-all flex items-center justify-center gap-2">
                          <Trash2 size={14} /> Liberar Mesa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed top-6 right-6 md:top-auto md:bottom-10 md:right-10 px-5 py-3.5 bg-green-600 text-white font-semibold rounded-2xl shadow-xl z-50 animate-in slide-in-from-top-4 md:slide-in-from-bottom-4 fade-in duration-300 flex items-center gap-3">
          <CheckCircle2 size={18} /> <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}