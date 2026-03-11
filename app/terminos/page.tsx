import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 font-sans text-slate-900 selection:bg-violet-600 selection:text-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a inicio
        </Link>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Términos de Servicio</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Aceptación de los Términos</h2>
          <p>Al acceder y utilizar los servicios de Atenia, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de los términos, sugerimos que no utilice el servicio.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Descripción del Servicio</h2>
          <p>Atenia proporciona un servicio de asistente inteligente o sistema gestionado diseñado para automatizar la atención al cliente y gestión de reservas a través de WhatsApp, destinado principalmente a restaurantes y negocios de hostelería.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Uso del Servicio</h2>
          <p>Usted se compromete a hacer un uso adecuado y lícito del servicio. Queda prohibido el uso de la plataforma para actividades ilícitas, enviar spam, o transmitir virus u otros códigos maliciosos.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Propiedad Intelectual</h2>
          <p>El servicio, incluyendo su tecnología subyacente, algoritmos, y diseño, es propiedad exclusiva de Atenia. El uso de nuestros servicios no le otorga ningún derecho de propiedad intelectual sobre el mismo.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Limitación de Responsabilidad</h2>
          <p>Atenia se esfuerza por ofrecer un servicio de alta disponibilidad y precisión. Sin embargo, no nos hacemos responsables de interrupciones temporales causadas por fallos técnicos de terceros (como integraciones o conectividad general).</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos Términos en función de la evolución de nuestros servicios. Notificaremos cualquier cambio sustancial con antelación.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Contacto</h2>
          <p>Para cualquier consulta sobre estos Términos de Servicio, puede comunicarse con nosotros por nuestras vías oficiales de soporte.</p>
        </div>
      </div>
    </div>
  );
}
