import React from 'react';
import { TrendingDown, Clock, Moon, Mic, ShieldAlert, Handshake, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-violet-600 selection:text-white">
      {/* 1. Header/Nav */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                Atenia
              </span>
            </div>
            <div className="ml-auto">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors duration-300 shadow-md hover:shadow-xl"
              >
                Probar Demo
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 2. Sección Hero */}
        <section className="relative bg-gray-50 pt-32 pb-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-10 leading-[1.1]">
                Tu restaurante tomando reservas mientras tú atiendes el salón.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-14 leading-relaxed max-w-3xl mx-auto font-medium">
                Atenia es el primer asistente de Inteligencia Artificial para WhatsApp que contesta en 2 segundos, filtra a los proveedores y agenda mesas 24/7. Cero estrés. Cero comisiones por cubierto.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a
                  href="#"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-all duration-300 shadow-xl hover:shadow-violet-600/40 hover:-translate-y-1"
                >
                  📲 Probar la demo en vivo por WhatsApp
                </a>
              </div>
            </div>
          </div>
          {/* Elementos decorativos asimétricos estilo Electric AI */}
          <div className="absolute top-0 right-0 -translate-y-20 translate-x-1/3 opacity-20 pointer-events-none">
             <div className="w-[40rem] h-[40rem] bg-violet-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-10 pointer-events-none">
             <div className="w-[30rem] h-[30rem] bg-indigo-600 rounded-full blur-[100px]"></div>
          </div>
        </section>

        {/* 3. Sección "Agitación del Dolor" */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                El caos del teléfono te está costando clientes (y tranquilidad).
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Tarjeta 1 */}
              <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-violet-900/5 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-8">
                  <TrendingDown className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Reservas Perdidas</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  ¿Cuántas mesas pierdes a la semana porque nadie pudo mirar el móvil durante el pico del servicio?
                </p>
              </div>

              {/* Tarjeta 2 */}
              <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-violet-900/5 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-8">
                  <Clock className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Tiempo de tu Equipo</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  ¿Tus camareros pierden tiempo valioso tecleando mensajes en lugar de atender el salón?
                </p>
              </div>

              {/* Tarjeta 3 */}
              <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-violet-900/5 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-8">
                  <Moon className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Fuera de Horario</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  ¿Harto de peticiones a las 3 de la mañana o de lidiar con mensajes de proveedores mezclados con clientes?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Sección "La Solución" */}
        <section className="py-32 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 leading-tight">
                  Delega tu WhatsApp en el recepcionista perfecto.
                </h2>
                
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                        <Mic className="w-8 h-8 text-violet-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        Entiende como un humano
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Atenia procesa audios y texto natural. Olvídate de los menús numéricos rígidos.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                        <ShieldAlert className="w-8 h-8 text-violet-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        Filtro Inteligente
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Distingue perfectamente si quien escribe es un comensal pidiendo mesa o el proveedor de bebidas.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                        <Handshake className="w-8 h-8 text-violet-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        Trabaja en equipo contigo
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Si tú tomas el mando del chat, Atenia se silencia al instante para dejarte trabajar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 relative">
                 {/* Rectángulo decorativo eléctrico */}
                 <div className="relative w-full max-w-lg mx-auto aspect-[4/5] bg-white rounded-3xl shadow-2xl shadow-violet-900/10 border border-gray-100 overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-20 bg-slate-900 flex items-center px-8">
                      <div className="w-10 h-10 rounded-full bg-slate-700 mr-4"></div>
                      <div className="space-y-3 flex-1">
                         <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                         <div className="h-3 bg-slate-700 rounded w-1/4"></div>
                      </div>
                    </div>
                    <div className="p-8 pt-32 space-y-6">
                       <div className="flex justify-end">
                          <div className="bg-gray-100 rounded-3xl rounded-tr-md p-5 max-w-[80%]">
                             <div className="h-3 bg-gray-300 rounded w-32 mb-3"></div>
                             <div className="h-3 bg-gray-300 rounded w-40"></div>
                          </div>
                       </div>
                       <div className="flex justify-start">
                          <div className="bg-violet-600 text-white rounded-3xl rounded-tl-md p-5 max-w-[80%] shadow-lg shadow-violet-600/20">
                             <div className="h-3 bg-white/40 rounded w-48 mb-3"></div>
                             <div className="h-3 bg-white/40 rounded w-24"></div>
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <div className="bg-gray-100 rounded-3xl rounded-tr-md p-5 max-w-[80%] flex items-center">
                             <Mic className="w-5 h-5 text-gray-500 mr-3" />
                             <div className="h-1.5 bg-gray-300 rounded w-20 mx-1"></div>
                             <div className="h-3 bg-gray-400 rounded-full w-2.5 mx-1"></div>
                             <div className="h-4 bg-gray-400 rounded-full w-2.5 mx-1"></div>
                             <div className="h-1.5 bg-gray-300 rounded w-10 mx-1"></div>
                          </div>
                       </div>
                       <div className="flex justify-start">
                          <div className="bg-violet-600 text-white rounded-3xl rounded-tl-md p-5 max-w-[80%] shadow-lg shadow-violet-600/20">
                             <div className="h-3 bg-white/40 rounded w-56 mb-3"></div>
                             <div className="h-3 bg-white/40 rounded w-32"></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -z-10 top-1/2 left-1/2 w-[30rem] h-[30rem] bg-violet-400/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sección "Credibilidad" */}
        <section className="py-32 bg-slate-900 border-y border-slate-800">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              Tecnología de primer nivel. Soporte técnico de acá.
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
              Desarrollado y con soporte presencial en la Comunidad Valenciana. Sin call centers lejanos. Instalamos a Atenia en 48 horas, directamente en tu local y usando tu mismo número de siempre.
            </p>
          </div>
        </section>

        {/* 6. Sección "Pricing" */}
        <section className="py-32 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-10 leading-tight">
                Un recepcionista incansable por una fracción de lo que imaginas.
              </h2>
              <div className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-2xl border border-gray-200 shadow-lg">
                <span className="text-lg font-medium text-slate-900">
                  ⚙️ <span className="font-extrabold text-violet-600">Setup e Instalación a Medida:</span> 490€ (Pago único). Incluye configuración de IA, horarios, reglas y visita presencial.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
              {/* Tarjeta 1 (Plan Base) */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl relative top-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Plan Base</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-slate-900">50€</span>
                  <span className="text-lg text-slate-500 ml-2 font-medium">/ mes</span>
                </div>
                <p className="text-lg text-slate-600 mb-10 min-h-[60px] font-medium">
                  Atenia toma reservas directas. Ideal para empezar a delegar.
                </p>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Gestión de reservas 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Notificaciones en tiempo real</span>
                  </li>
                </ul>
              </div>

              {/* Tarjeta 2 (Plan Pro - DESTACADA) */}
              <div className="bg-white rounded-3xl p-10 border-2 border-violet-600 shadow-2xl relative transform lg:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-violet-600/30">
                    Más elegido
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Plan Pro</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-6xl font-extrabold text-slate-900">90€</span>
                  <span className="text-lg text-slate-500 ml-2 font-medium">/ mes</span>
                </div>
                <p className="text-lg text-slate-600 mb-10 min-h-[60px] font-medium">
                  Toma reservas, responde dudas de la carta, indica ubicación, filtro de proveedores y soporte prioritario.
                </p>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-900 font-bold">Todo lo del Plan Base</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Respuestas a dudas de la carta</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Filtro inteligente de proveedores</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Soporte técnico prioritario</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="block w-full py-5 px-6 text-center text-lg text-white bg-violet-600 hover:bg-violet-700 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-violet-600/40 hover:-translate-y-1"
                >
                  Elegir Plan Pro
                </a>
              </div>

              {/* Tarjeta 3 (Plan Élite) */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl relative top-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Plan Élite</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-slate-900">150€</span>
                  <span className="text-lg text-slate-500 ml-2 font-medium">/ mes</span>
                </div>
                <p className="text-lg text-slate-600 mb-10 min-h-[60px] font-medium">
                  Todo lo del Plan Pro + Modificaciones ilimitadas en el menú y reglas personalizadas.
                </p>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-900 font-bold">Todo lo del Plan Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Modificaciones ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-violet-500 mr-4 shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">Reglas de IA avanzadas personalizadas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">
              Deja que Atenia atienda a tu próximo cliente.
            </h3>
            <a
              href="#"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-all duration-300 shadow-xl hover:shadow-violet-600/40 hover:-translate-y-1 mb-16"
            >
              👉 Hablar con Atenia ahora
            </a>
            
            <div className="w-full max-w-4xl border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-base text-slate-500 font-medium">
              <p>&copy; {new Date().getFullYear()} Atenia. Todos los derechos reservados.</p>
              <div className="flex space-x-8">
                <a href="#" className="hover:text-violet-600 transition-colors">Privacidad</a>
                <a href="#" className="hover:text-violet-600 transition-colors">Términos</a>
                <a href="#" className="hover:text-violet-600 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
