"use client";

import React, { useState } from 'react';
import { TrendingDown, Clock, Moon, Mic, ShieldAlert, Handshake, CheckCircle2, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-violet-600 selection:text-white">
      {/* 1. Header/Nav */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20 relative">
            {/* Logo de Atenia (Imagen) */}
            <a href="#" className="flex-shrink-0 flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/images/logo-atenia.png"
                alt="Logo Atenia"
                className="h-16 w-auto object-contain"
              />
            </a>

            {/* Menú de Navegación (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <a href="#problema" className="text-sm font-bold text-slate-500 hover:text-violet-600 uppercase tracking-widest transition-colors duration-300">El Problema</a>
              <a href="#solucion" className="text-sm font-bold text-slate-500 hover:text-violet-600 uppercase tracking-widest transition-colors duration-300">La Solución</a>
              <a href="#casos" className="text-sm font-bold text-slate-500 hover:text-violet-600 uppercase tracking-widest transition-colors duration-300">Casos reales</a>
              <a href="#planes" className="text-sm font-bold text-slate-500 hover:text-violet-600 uppercase tracking-widest transition-colors duration-300">Planes</a>
            </nav>

            {/* Botón CTA y Hamburguesa */}
            <div className="ml-auto z-10 flex items-center gap-4">
              <a
                href="#"
                className="hidden sm:inline-flex items-center justify-center px-8 py-3 text-sm md:text-base font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors duration-300 shadow-md hover:shadow-xl"
              >
                Probar Demo
              </a>

              {/* Botón Hamburguesa (Solo visible en móviles) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-900 hover:text-violet-600 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Desplegable (Mobile) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-2xl py-8 px-6 flex flex-col gap-6 z-40">
            <a href="#problema" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-violet-600 uppercase tracking-widest border-b border-gray-50 pb-4">El Problema</a>
            <a href="#solucion" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-violet-600 uppercase tracking-widest border-b border-gray-50 pb-4">La Solución</a>
            <a href="#casos" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-violet-600 uppercase tracking-widest border-b border-gray-50 pb-4">Casos reales</a>
            <a href="#planes" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-violet-600 uppercase tracking-widest border-b border-gray-50 pb-4">Planes</a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors duration-300 shadow-md mt-2"
            >
              Probar Demo
            </a>
          </div>
        )}
      </header>

      <main>
        {/* 2. Sección Hero */}
        <section className="relative bg-gray-50 pt-32 pb-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-10 leading-[1.1]">
                Tu WhatsApp tomando reservas automáticamente.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-14 leading-relaxed max-w-3xl mx-auto font-medium">
                <span className="font-bold text-slate-900 block mb-2">Cada reserva que no contestas termina en el restaurante de enfrente.</span>
                Atenia responde a tus clientes en menos de 2 segundos y agenda mesas mientras tú te concentras en el salón.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative">
                  {/* Efecto de resplandor (Glow) animado detrás del botón */}
                  <div className="absolute inset-0 bg-violet-600 rounded-lg blur-xl opacity-40 animate-pulse"></div>
                  <a
                    href="#"
                    className="relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all duration-300 shadow-xl hover:-translate-y-1"
                  >
                    Probar la demo en vivo por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Logo gigante de fondo asomándose por la derecha */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 md:translate-x-1/4 w-[500px] md:w-[800px] opacity-[0.06] pointer-events-none z-0">
            {/* Usamos el icono 'A' */}
            <img src="/images/icono-A.png" alt="Atenia Watermark" className="w-full h-full object-contain" />
          </div>

          {/* Elementos decorativos asimétricos estilo Electric AI (Mantenemos los brillos para que le den color al fondo) */}
          <div className="absolute top-0 right-0 -translate-y-20 translate-x-1/3 opacity-20 pointer-events-none z-0">
            <div className="w-[40rem] h-[40rem] bg-violet-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-10 pointer-events-none z-0">
            <div className="w-[30rem] h-[30rem] bg-indigo-600 rounded-full blur-[100px]"></div>
          </div>
        </section>

        {/* 3. Sección "Agitación del Dolor" - Diseño Innovador "Línea del Caos" */}
        <section id="problema" className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight max-w-3xl mx-auto">
                El caos de WhatsApp te está costando mesas (y salud mental).
              </h2>
            </div>

            {/* Contenedor de la línea de tiempo asimétrica */}
            <div className="relative border-l-4 border-violet-100 ml-4 md:ml-0 md:border-none space-y-20 md:space-y-32">

              {/* Elemento 1 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group pl-8 md:pl-0">
                {/* Punto central (solo visible en desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.5)] z-20 group-hover:scale-150 transition-transform duration-300"></div>
                {/* Línea vertical central (solo desktop) */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-[-130px] w-1 bg-gradient-to-b from-violet-600/20 to-transparent z-10"></div>

                <div className="md:w-[45%] md:text-right pr-0 md:pr-12 relative">
                  {/* Punto móvil */}
                  <div className="md:hidden absolute -left-[38px] top-6 w-4 h-4 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20"></div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 flex items-center md:justify-end gap-3">
                    <TrendingDown className="w-8 h-8 text-violet-600 md:order-last" />
                    El Viernes a las 21:00hs
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    El salón está lleno, los camareros corren. El móvil vibra 15 veces. Nadie puede contestar. <strong> Son 15 reservas perdidas</strong>.
                  </p>
                </div>
                {/* NÚMERO 01 CON EFECTO 3D */}
                <div className="md:w-[45%] hidden md:block">
                  <span className="inline-block text-8xl font-black text-violet-600/10 transition-all duration-500 ease-out group-hover:text-violet-600 group-hover:scale-125 group-hover:-translate-y-6 group-hover:rotate-6 group-hover:drop-shadow-[0_20px_30px_rgba(124,58,237,0.4)]">01</span>
                </div>
              </div>

              {/* Elemento 2 */}
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group pl-8 md:pl-0">
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.5)] z-20 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-[-130px] w-1 bg-gradient-to-b from-violet-600/20 to-transparent z-10"></div>

                <div className="md:w-[45%] md:text-left pl-0 md:pl-12 relative">
                  <div className="md:hidden absolute -left-[38px] top-6 w-4 h-4 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20"></div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-violet-600" />
                    El Tiempo Muerto
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    ¿Cuánto le pagas a tu encargado por hora? ¿Y cuánto de ese tiempo lo pasa tecleando "Sí, tenemos sitio" o "La carta está en el perfil"? Es <strong>dinero que se escurre</strong> en tareas mecánicas.
                  </p>
                </div>
                {/* NÚMERO 02 CON EFECTO 3D (Rotación inversa) */}
                <div className="md:w-[45%] text-right hidden md:block">
                  <span className="inline-block text-8xl font-black text-violet-600/10 transition-all duration-500 ease-out group-hover:text-violet-600 group-hover:scale-125 group-hover:-translate-y-6 group-hover:-rotate-6 group-hover:drop-shadow-[0_20px_30px_rgba(124,58,237,0.4)]">02</span>
                </div>
              </div>

              {/* Elemento 3 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group pl-8 md:pl-0">
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.5)] z-20 group-hover:scale-150 transition-transform duration-300"></div>

                <div className="md:w-[45%] md:text-right pr-0 md:pr-12 relative">
                  <div className="md:hidden absolute -left-[38px] top-6 w-4 h-4 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20"></div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 flex items-center md:justify-end gap-3">
                    <Moon className="w-8 h-8 text-violet-600 md:order-last" />
                    Las 3 de la Mañana
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    El cliente moderno quiere reservar cuando se acuerda, no en tu horario de atención. Si no le das una respuesta inmediata, <strong>busca otro lugar en Google Maps</strong>.
                  </p>
                </div>
                {/* NÚMERO 03 CON EFECTO 3D */}
                <div className="md:w-[45%] hidden md:block">
                  <span className="inline-block text-8xl font-black text-violet-600/10 transition-all duration-500 ease-out group-hover:text-violet-600 group-hover:scale-125 group-hover:-translate-y-6 group-hover:rotate-6 group-hover:drop-shadow-[0_20px_30px_rgba(124,58,237,0.4)]">03</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Sección "La Solución" */}
        <section id="solucion" className="py-32 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 leading-tight">
                  Delega tu WhatsApp en el recepcionista perfecto.
                </h2>

                <div className="space-y-12">

                  {/* Beneficio 1: Entiende como un humano (Icono A) */}
                  <div className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 relative">
                      {/* Contenedor del ícono flotante */}
                      <div className="w-20 h-20 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 relative">
                        {/* Aura de luz trasera sutil */}
                        <div className="absolute inset-0 bg-violet-400/20 blur-xl rounded-full"></div>
                        <img
                          src="/images/icono-A.png"
                          alt="Entiende mensajes"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_15px_rgba(124,58,237,0.3)]"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                        Entiende mensajes como un humano
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Atenia procesa audios y texto natural. Olvídate de los menús numéricos rígidos.
                      </p>
                    </div>
                  </div>

                  {/* Beneficio 2: Filtro Inteligente (Icono Escudo) */}
                  <div className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 relative">
                      <div className="w-20 h-20 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 relative">
                        <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
                        <img
                          src="/images/icono-escudo.png"
                          alt="Filtro de contactos"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_15px_rgba(99,102,241,0.3)]"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
                        Reconocimiento de Contactos
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Atenia solo interactúa con tus clientes. Reconoce automáticamente a los proveedores y empleados de tu agenda para que hablen directamente contigo sin interrupciones.
                      </p>
                    </div>
                  </div>

                  {/* Beneficio 3: Trabajo en equipo (Icono Manos) */}
                  <div className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 relative">
                      <div className="w-20 h-20 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 relative">
                        <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
                        <img
                          src="/images/icono-manos.png"
                          alt="Trabajo en equipo"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_15px_rgba(99,102,241,0.3)]"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300">
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
                {/* Aura de luz trasera gigante */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-600/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>

                {/* Interfaz de Chat Real simulada */}
                <div className="relative z-10 w-full max-w-lg mx-auto aspect-[4/5] bg-[#EFEAE2] rounded-3xl shadow-2xl shadow-violet-900/40 border border-violet-100 overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.02]">
                  {/* Header del Chat */}
                  <div className="h-16 bg-[#075E54] flex items-center px-6 shadow-md z-10 relative">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm overflow-hidden border border-white/20">
                      <img src="/images/logo-atenia-solo.png" alt="Atenia" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg leading-tight">Atenia Asistente</span>
                      <span className="text-white/80 text-xs">en línea</span>
                    </div>
                  </div>
                  {/* Cuerpo del Chat (Mensajes) */}
                  <div className="flex-1 p-6 space-y-4 overflow-hidden relative">
                    {/* Fondo clásico de WhatsApp con opacidad */}
                    <div className="absolute inset-0 opacity-5 bg-[url('https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover mix-blend-multiply pointer-events-none"></div>

                    {/* Mensaje Cliente */}
                    <div className="flex justify-end relative z-10">
                      <div className="bg-[#DCF8C6] text-slate-800 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%] shadow-sm text-[15px] leading-snug">
                        Hola, quería ver si tienen lugar para cenar 2 personas esta noche.
                        <span className="text-[10px] text-slate-500 float-right mt-2 ml-3">20:14</span>
                      </div>
                    </div>

                    {/* Mensaje Atenia */}
                    <div className="flex justify-start relative z-10">
                      <div className="bg-white text-slate-800 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] shadow-sm border border-gray-100 text-[15px] leading-snug">
                        ¡Hola! Qué gusto saludarte. 👋 Sí, tenemos disponibilidad. ¿A qué hora les gustaría venir?
                        <span className="text-[10px] text-slate-500 float-right mt-2 ml-3">20:14</span>
                      </div>
                    </div>

                    {/* Mensaje Cliente */}
                    <div className="flex justify-end relative z-10">
                      <div className="bg-[#DCF8C6] text-slate-800 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%] shadow-sm text-[15px] leading-snug">
                        A las 21:30 está bien. A nombre de Lucas.
                        <span className="text-[10px] text-slate-500 float-right mt-2 ml-3">20:15</span>
                      </div>
                    </div>

                    {/* Mensaje Atenia */}
                    <div className="flex justify-start relative z-10">
                      <div className="bg-white text-slate-800 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] shadow-sm border border-gray-100 text-[15px] leading-snug">
                        ¡Excelente Lucas! 🥂 Tu reserva para 2 personas hoy a las 21:30 está confirmada. ¡Los esperamos en La Playa!
                        <span className="text-[10px] text-slate-500 float-right mt-2 ml-3">20:15</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 w-[30rem] h-[30rem] bg-violet-400/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 4.5 Sección "Social Proof / Casos de Éxito" */}
        <section id="casos" className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Restaurantes que ya duermen tranquilos.
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Únete a los locales de la Comunidad Valenciana que ya han delegado su WhatsApp en nuestro Asistente Inteligente.
              </p>
            </div>

            {/* Estadísticas de rendimiento (Reemplazamos clientes falsos por métricas del sistema) */}
            {/* La Matemática del ROI (Reemplaza a los cuadraditos de estadísticas) */}
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-20 shadow-2xl border border-slate-800 text-white relative overflow-hidden group">
              {/* Fondo decorativo */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-violet-600 rounded-full blur-[100px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>

              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
                {/* Columna Izquierda: El Dolor (La pérdida) */}
                <div className="flex-1 w-full space-y-6">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    La matemática de las reservas perdidas:
                  </h3>
                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-slate-400 font-medium">Pierdes 3 mesas a la semana</span>
                      <span className="font-bold text-slate-200">12 mesas / mes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-slate-400 font-medium">Ticket prom. (ej. 2-3 pers.)</span>
                      <span className="font-bold text-slate-200">60€</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xl font-bold text-white">Dinero que dejas en la mesa</span>
                      <span className="text-3xl font-black text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]">-720€ / mes</span>
                    </div>
                  </div>
                </div>

                {/* separador invisible para mantener layout */}
                <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
                <div className="block md:hidden w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

                {/* Columna Derecha: El Alivio (El ROI) */}
                <div className="flex-1 w-full">
                  {/* Tarjeta oscura con el borde superior iluminado estilo app premium */}
                  <div className="bg-[#1a103c] rounded-2xl p-8 border border-violet-500/20 shadow-[inset_0_2px_0_rgba(139,92,246,0.4)] relative">

                    {/* Header: Icono + Título alineados */}
                    <div className="flex items-center gap-4 mb-5">
                      {/* Contenedor del ícono con resplandor dorado (tamaño ajustado para no agrandar la card) */}
                      <div className="relative w-16 h-16 shrink-0">
                        {/* Aura de luz trasera AMARILLA/ORO */}
                        <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full"></div>
                        {/* Imagen */}
                        <img
                          src="/images/inversion.png"
                          alt="Icono Inversión Oro"
                          className="w-full h-full object-contain relative z-10 drop-shadow-[0_5px_15px_rgba(251,191,36,0.4)]"
                        />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white">
                        Se paga sola
                      </h4>
                    </div>

                    {/* Texto con el resaltador violeta (Badge) */}
                    <p className="text-slate-300 leading-relaxed font-medium text-lg">
                      Atenia cuesta una fracción de lo que pierdes en el caos. Con que el Asistente Inteligente te recupere{' '}
                      <span className="text-white bg-[#8B5CF6] px-3 py-1 rounded-lg font-bold inline-block mx-1 my-1 shadow-md">
                        1 sola mesa al mes
                      </span>{' '}
                      que se iba a ir a la competencia, el sistema ya te está generando ganancia pura.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonios Anónimos / Casos de Estudio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonio 1 */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-slate-200/50 relative">
                <div className="text-violet-600 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-lg text-slate-700 font-medium italic mb-8 leading-relaxed">
                  "Antes los viernes eran una locura, el móvil no paraba de sonar en pleno servicio y terminábamos perdiendo mesas porque no dábamos abasto para contestar. Desde que pusimos a Atenia, nos olvidamos. Las reservas entran solas mientras nosotros atendemos el salón."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Carlos M.</h4>
                    <p className="text-sm text-slate-500">Arrocería en Valencia <span className="block text-xs text-slate-400 mt-0.5">(Identidad reservada por privacidad)</span></p>
                  </div>
                </div>
              </div>

              {/* Testimonio 2 */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-slate-200/50 relative">
                <div className="text-violet-600 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-lg text-slate-700 font-medium italic mb-8 leading-relaxed">
                  "Al principio dudaba porque no quería que mis clientes hablaran con una máquina. Pero la sorpresa es que entiende el lenguaje súper natural, audios incluidos. Y lo mejor: sabe diferenciar cuando me habla el proveedor de la carne para que le conteste yo."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-700 font-bold text-xl">
                    L
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Laura F.</h4>
                    <p className="text-sm text-slate-500">Asador en Gandia <span className="block text-xs text-slate-400 mt-0.5">(Identidad reservada por privacidad)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sección "Credibilidad" */}
        <section className="py-32 bg-slate-900 border-y border-slate-800 relative overflow-hidden">

          {/* Logo gigante de fondo asomándose por la izquierda */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 md:-translate-x-1/4 w-[400px] md:w-[600px] opacity-5 pointer-events-none z-0">
            {/* Usamos el mismo icono 'A' transparente */}
            <img src="/images/logo-atenia-solo.png" alt="Atenia Watermark" className="w-full h-full object-contain" />
          </div>

          <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              Tecnología de primer nivel. Soporte técnico de acá.
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
              Desarrollado y con soporte presencial en la Comunidad Valenciana. Sin call centers lejanos. Instalamos a Atenia en 48 horas, directamente en tu local y usando tu mismo número de siempre.
            </p>
          </div>
        </section>

        {/* 6. Sección "Niveles de Servicio" (Ex Pricing) */}
        <section id="planes" className="py-32 bg-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Una solución a medida para cada restaurante.
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Sin comisiones por reserva. Evaluamos el volumen de tu local, configuramos a Atenia y pagas un mantenimiento fijo mensual.
              </p>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">

                {/* Nivel 1: Esencial */}
                <div className="p-10 hover:bg-slate-50 transition-colors duration-300 relative overflow-hidden group">
                  {/* Icono 3D Flotante a la Derecha */}
                  <div className="absolute top-6 right-4 w-28 h-28 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* Aura de luz trasera */}
                    <div className="absolute inset-0 bg-violet-400/30 blur-2xl rounded-full"></div>
                    {/* Imagen con sombra brillante proyectada */}
                    <img src="/images/reloj.png" alt="Icono Reloj" className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(124,58,237,0.4)]" />
                  </div>

                  <div className="relative z-20 pr-20">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Esencial</h3>
                    <p className="text-slate-500 font-medium mb-8 min-h-[48px]">Para locales pequeños que buscan no perder ninguna reserva.</p>
                  </div>

                  <ul className="space-y-4 mb-8 relative z-20">
                    <li className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 shrink-0" />
                      <span>Gestión de reservas 24/7</span>
                    </li>
                    <li className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 shrink-0" />
                      <span>Notificaciones en tiempo real</span>
                    </li>
                  </ul>
                </div>

                {/* Nivel 2: Avanzado (Destacado sutil) */}
                <div className="p-10 bg-violet-50/50 relative overflow-hidden group">
                  <div className="absolute top-0 inset-x-0 h-1 bg-violet-600 z-30"></div>

                  {/* Icono 3D Flotante a la Derecha (Más grande y más brillante) */}
                  <div className="absolute top-6 right-2 w-32 h-32 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* Aura de luz trasera más potente */}
                    <div className="absolute inset-0 bg-violet-500/40 blur-3xl rounded-full"></div>
                    {/* Imagen con sombra brillante proyectada */}
                    <img src="/images/cerebro.png" alt="Icono Cerebro" className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(124,58,237,0.6)]" />
                  </div>

                  <div className="relative z-20 pr-20">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Avanzado</h3>
                    <p className="text-slate-600 font-medium mb-8 min-h-[48px]">El sistema completo para restaurantes con alto volumen.</p>
                  </div>

                  <ul className="space-y-4 mb-8 relative z-20">
                    <li className="flex items-start text-slate-900 font-bold">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 mr-3 shrink-0" />
                      <span>Todo lo del plan Esencial</span>
                    </li>
                    <li className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 shrink-0" />
                      <span>Filtro de contactos y proveedores</span>
                    </li>
                    <li className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 shrink-0" />
                      <span>Respuestas sobre la carta/menú</span>
                    </li>
                  </ul>
                </div>

                {/* Nivel 3: Grupos */}
                <div className="p-10 hover:bg-slate-50 transition-colors duration-300 relative overflow-hidden group">
                  {/* Icono 3D Flotante a la Derecha */}
                  <div className="absolute top-6 right-4 w-28 h-28 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* Aura de luz trasera sutil */}
                    <div className="absolute inset-0 bg-slate-400/20 blur-2xl rounded-full"></div>
                    {/* Imagen con sombra brillante proyectada */}
                    <img src="/images/grupo.png" alt="Icono Grupo" className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(148,163,184,0.4)]" />
                  </div>

                  <div className="relative z-20 pr-20">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Grupos</h3>
                    <p className="text-slate-500 font-medium mb-8 min-h-[48px]">Para locales con múltiples sucursales o reglas complejas.</p>
                  </div>

                  <ul className="space-y-4 mb-8 relative z-20">
                    <li className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                      <span>Reglas de IA multicursales</span>
                    </li>
                    <li className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                      <span>Soporte técnico dedicado</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Banner de Acción Integrado */}
              <div className="bg-slate-900 p-8 md:p-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                  <h4 className="text-2xl font-extrabold text-white mb-2">Setup Inicial a Medida</h4>
                  <p className="text-violet-300 font-medium">Configuramos el "cerebro" de Atenia presencialmente en tu local.</p>
                </div>
                <a
                  href="https://wa.me/34XXXXXXXXX?text=Hola%20Atenia,%20quiero%20coordinar%20una%20visita%20para%20presupuesto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-8 py-4 text-lg font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-600/40 hover:-translate-y-1 whitespace-nowrap"
                >
                  Solicitar Presupuesto
                </a>
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
              Hablar con Atenia ahora
            </a>

            <div className="w-full max-w-4xl border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-base text-slate-500 font-medium">
              <p>&copy; {new Date().getFullYear()} Atenia. Todos los derechos reservados.</p>
              <div className="flex space-x-8">
                <a href="/privacidad" className="hover:text-violet-600 transition-colors">Privacidad</a>
                <a href="/terminos" className="hover:text-violet-600 transition-colors">Términos</a>
                <a href="/cookies" className="hover:text-violet-600 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
