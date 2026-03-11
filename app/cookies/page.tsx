import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 font-sans text-slate-900 selection:bg-violet-600 selection:text-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a inicio
        </Link>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Política de Cookies</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. ¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en su ordenador o dispositivo móvil. Su objetivo es ayudar al sitio web a memorizar información sobre su visita, mejorando la experiencia de navegación en accesos futuros.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Cómo usamos las cookies en Atenia</h2>
          <p>Utilizamos cookies esenciales para el funcionamiento básico de nuestro sitio, así como cookies analíticas para entender cómo interactúan los usuarios con nuestra plataforma, de modo que podamos mejorar nuestros servicios continuamente.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Tipos de cookies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies técnicas (esenciales):</strong> Son estrictamente necesarias para la navegación y el buen funcionamiento del sitio web.</li>
            <li><strong>Cookies de análisis:</strong> Permiten cuantificar el número de usuarios y realizar mediciones estadísticas sobre cómo se utiliza nuestra página web.</li>
            <li><strong>Cookies de personalización:</strong> Permiten recordar preferencias de los usuarios, como el idioma o la región.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Gestión y eliminación de cookies</h2>
          <p>Puede permitir, bloquear o eliminarlas cookies instaladas en su equipo mediante la configuración de las opciones de su navegador de Internet. Tenga en cuenta que si desactiva las cookies, es posible que algunas funcionalidades dejen de funcionar correctamente.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Cambios en esta política</h2>
          <p>Es posible que actualicemos la Política de Cookies de nuestro sitio web, por ello le recomendamos revisar esta política cada vez que nos visite para estar adecuadamente informado sobre cómo y para qué usamos las cookies.</p>
        </div>
      </div>
    </div>
  );
}
