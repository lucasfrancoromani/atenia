import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 font-sans text-slate-900 selection:bg-violet-600 selection:text-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a inicio
        </Link>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Política de Privacidad</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Introducción</h2>
          <p>En Atenia, respetamos su privacidad y nos comprometemos a proteger los datos personales de nuestros usuarios. Esta política explica cómo recopilamos, usamos y protegemos su información cuando utiliza nuestros servicios.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Información que recopilamos</h2>
          <p>Podemos recopilar información personal que nos proporciona al contactarnos, solicitar presupuestos o utilizar nuestros servicios. Esto incluye nombre, dirección de correo electrónico, número de teléfono y detalles de su negocio o restaurante.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Uso de la información</h2>
          <p>Utilizamos su información para proveer, mantener y mejorar nuestro Asistente Inteligente, comunicarnos con usted, procesar transacciones y cumplir con nuestras obligaciones legales.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Compartir información</h2>
          <p>No vendemos ni alquilamos su información personal a terceros. Solo podemos compartir su información con proveedores de servicios de confianza que nos asisten en la operación de nuestra plataforma, bajo acuerdos de estricta confidencialidad.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Seguridad de los datos</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas razonables para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Sus derechos</h2>
          <p>De acuerdo con el Reglamento General de Protección de Datos (RGPD) aplicable en España, tiene derecho a acceder, rectificar o eliminar su información personal. Puede ejercer estos derechos contactándonos directamente.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Contacto</h2>
          <p>Si tiene alguna pregunta sobre esta Política de Privacidad, no dude en contactarnos a través de nuestro sitio web o por correo electrónico.</p>
        </div>
      </div>
    </div>
  );
}
