'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'oficio' | 'cliente'>('oficio')

  const pasosOficio = [
    ['01', 'Registra tu perfil', 'Nombre, zona, sistema que trabajas, fotos de obra, disponibilidad.'],
    ['02', 'Carga tu trabajo', 'Portfolio real. Sin filtros. Lo que hiciste habla por vos.'],
    ['03', 'Te encuentran', 'Clientes verificados llegan a tu perfil cuando buscan lo que haces.'],
  ]
  const pasosCliente = [
    ['01', 'Describe tu proyecto', 'Zona, sistema, superficie, presupuesto orientativo.'],
    ['02', 'El sistema te orienta', 'Comparamos opciones constructivas segun tu caso real.'],
    ['03', 'Te conectamos', 'Ejecutores verificados en tu zona, con historial real.'],
  ]
  const pasos = activeTab === 'oficio' ? pasosOficio : pasosCliente

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#e8e4dc]">

      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16">
        <div className="max-w-5xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[#8a7a6a] uppercase mb-8">
            General Roca - Patagonia - Argentina - Plataforma global
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 text-[#e8e4dc]">
            En la era de la IA,<br />
            <em className="not-italic text-[#c17a4a]">el oficio vuelve.</em>
          </h1>
          <p className="font-mono text-sm md:text-base text-[#8a7a6a] max-w-xl mb-12 leading-relaxed">
            Conectamos a quienes saben construir con quienes quieren construir bien.
          </p>
          <a href="#bifurcacion" className="inline-block font-mono text-sm tracking-widest uppercase border border-[#c17a4a] text-[#c17a4a] px-8 py-4 hover:bg-[#c17a4a] hover:text-[#0e0e0e] transition-colors duration-200">Entrar</a>
        </div>
      </section>

      <section id="bifurcacion" className="px-6 md:px-16 lg:px-24 py-24 border-t border-[#1e1e1e]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e] max-w-5xl">
          <div className="bg-[#0e0e0e] p-10 md:p-14 flex flex-col justify-between min-h-[360px] hover:bg-[#121212] transition-colors">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-[#c17a4a] uppercase mb-6">Tenes oficio</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#e8e4dc] mb-6 leading-tight">
                Sabes construir.<br />Que te encuentren<br />quienes lo necesitan.
              </h2>
              <p className="font-mono text-sm text-[#8a7a6a] leading-relaxed">
                Registra tu perfil, carga tu trabajo, recibe consultas verificadas.
              </p>
            </div>
            <Link href="/registro-oficio" className="mt-10 font-mono text-sm tracking-widest uppercase border border-[#c17a4a] text-[#c17a4a] px-6 py-3 self-start hover:bg-[#c17a4a] hover:text-[#0e0e0e] transition-colors duration-200">Registrar mi oficio</Link>
          </div>
          <div className="bg-[#0e0e0e] p-10 md:p-14 flex flex-col justify-between min-h-[360px] hover:bg-[#121212] transition-colors">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-[#8a7a6a] uppercase mb-6">Necesitas oficio</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#e8e4dc] mb-6 leading-tight">
                Queres construir bien.<br />No sabes por<br />donde empezar.
              </h2>
              <p className="font-mono text-sm text-[#8a7a6a] leading-relaxed">
                Te orientamos y conectamos con quien sabe hacerlo.
              </p>
            </div>
            <Link href="/quiero-construir" className="mt-10 font-mono text-sm tracking-widest uppercase border border-[#5a7a6a] text-[#5a7a6a] px-6 py-3 self-start hover:bg-[#5a7a6a] hover:text-[#0e0e0e] transition-colors duration-200">Empezar mi proyecto</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-[#1e1e1e]">
        <div className="max-w-5xl space-y-16">
          {[
            'La IA automatiza lo que se hace en una pantalla. No lo que se hace con las manos y el criterio.',
            'Un ejecutor con oficio real es el activo mas escaso de cualquier obra.',
            'MeinHaus lo documenta, lo evalua y lo conecta con quien lo necesita.',
          ].map((text, i) => (
            <div key={i} className="flex gap-8 items-start">
              <span className="font-mono text-xs text-[#3a3a3a] pt-1 select-none">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-serif text-2xl md:text-3xl text-[#c8c4bc] leading-relaxed max-w-2xl">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-[#1e1e1e]">
        <div className="max-w-5xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[#8a7a6a] uppercase mb-12">Como funciona</p>
          <div className="flex gap-0 mb-14 border border-[#1e1e1e] w-fit">
            <button onClick={() => setActiveTab('oficio')} className={`font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors ${activeTab === 'oficio' ? 'bg-[#c17a4a] text-[#0e0e0e]' : 'text-[#8a7a6a] hover:text-[#e8e4dc]'}`}>Para oficio</button>
            <button onClick={() => setActiveTab('cliente')} className={`font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors ${activeTab === 'cliente' ? 'bg-[#5a7a6a] text-[#0e0e0e]' : 'text-[#8a7a6a] hover:text-[#e8e4dc]'}`}>Para cliente</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
            {pasos.map(([num, title, desc]) => (
              <div key={num} className="bg-[#0e0e0e] p-8 md:p-10">
                <p className="font-mono text-xs text-[#3a3a3a] mb-4">{num}</p>
                <h3 className="font-serif text-xl text-[#e8e4dc] mb-3">{title}</h3>
                <p className="font-mono text-sm text-[#8a7a6a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-[#1e1e1e]">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[#8a7a6a] uppercase mb-6">Estado</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#e8e4dc] mb-4 leading-tight">
            La plataforma esta<br />en construccion.<br />
            <span className="text-[#8a7a6a]">Literalmente.</span>
          </h2>
          <p className="font-mono text-sm text-[#8a7a6a] mb-10 leading-relaxed">Registrate y vas a ser parte de los primeros.</p>
          <Link href="/sumate" className="inline-block font-mono text-sm tracking-widest uppercase border border-[#c17a4a] text-[#c17a4a] px-8 py-4 hover:bg-[#c17a4a] hover:text-[#0e0e0e] transition-colors duration-200">Sumate</Link>
        </div>
      </section>

      <footer className="px-6 md:px-16 lg:px-24 py-10 border-t border-[#1e1e1e]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs text-[#3a3a3a]">MeinHaus - General Roca, Patagonia</p>
          <p className="font-mono text-xs text-[#3a3a3a]">meinhaus.com.ar</p>
        </div>
      </footer>

    </main>
  )
}