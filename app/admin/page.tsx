"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Settings, Users, Save, CheckCircle2 } from 'lucide-react'

export default function AdminDashboard() {
  const [mesas2, setMesas2] = useState<number>(0)
  const [mesas4, setMesas4] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  async function fetchConfig() {
    const { data, error } = await supabase.from('configuracion').select('*').single()
    if (data) {
      setMesas2(data.mesas_de_2)
      setMesas4(data.mesas_de_4)
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase
      .from('configuracion')
      .update({ mesas_de_2: mesas2, mesas_de_4: mesas4 })
      .eq('id', 1)
    
    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-pulse flex items-center gap-2"><div className="w-4 h-4 bg-blue-600 rounded-full"></div> Cargando...</div></div>
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Atenia Admin</h1>
            <p className="text-sm text-slate-500 mt-1">Gestión de Capacidad y Mesas en Tiempo Real</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Config Card */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" /> 
                Configuración del Local
              </h2>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-6">
                
                {/* Mesa 2 input */}
                <div>
                  <label htmlFor="mesas2" className="block text-sm font-medium leading-6 text-slate-700">
                    Mesas de 2 Personas
                  </label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="mesas2"
                      id="mesas2"
                      min="0"
                      value={mesas2}
                      onChange={(e) => setMesas2(parseInt(e.target.value) || 0)}
                      className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Stock físico total de mesas pequeñas.</p>
                </div>

                {/* Mesa 4 input */}
                <div>
                  <label htmlFor="mesas4" className="block text-sm font-medium leading-6 text-slate-700">
                    Mesas de 4 Personas
                  </label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="mesas4"
                      id="mesas4"
                      min="0"
                      value={mesas4}
                      onChange={(e) => setMesas4(parseInt(e.target.value) || 0)}
                      className="block w-full rounded-lg border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Stock físico total de mesas medianas/grandes.</p>
                </div>

              </div>

              <div className="mt-8 flex items-center justify-end gap-4">
                {saved && (
                  <span className="text-green-600 flex items-center gap-1 text-sm font-medium animate-pulse">
                    <CheckCircle2 className="w-5 h-5" /> ¡Guardado!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-all"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Conexión con la IA</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Los cambios que realices aquí impactan <strong>inmediatamente</strong> en el bot de WhatsApp. 
                Si bajas el stock de mesas a 0, la IA comenzará a rechazar reservas en el acto.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Estado del bot</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> En línea
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
