"use client"

import Link from "next/link"

export default function RegistroOficioPage() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#e8e4dc] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-[#c17a4a] uppercase mb-8">
          Registrar oficio
        </p>
        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
          Tu oficio, visible donde importa.
        </h1>
        <p className="font-mono text-sm text-[#8a7a6a] max-w-lg mb-12 leading-relaxed">
          Creamos tu perfil verificado en la plataforma. Los clientes que buscan lo que haces te van a encontrar.
        </p>
        <div className="border border-[#1e1e1e] p-8 md:p-12 space-y-6">
          <p className="font-mono text-xs tracking-[0.2em] text-[#8a7a6a] uppercase">
            Registro en construccion
          </p>
          <p className="font-serif text-2xl text-[#e8e4dc]">
            Estamos armando el sistema de registro.
          </p>
          <p className="font-mono text-sm text-[#8a7a6a] leading-relaxed">
            Mientras tanto, escribinos por WhatsApp y te sumamos a los primeros verificados de Patagonia.
          </p>
          <a href="https://wa.me/5491162181345" target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-sm tracking-widest uppercase border border-[#c17a4a] text-[#c17a4a] px-8 py-4 hover:bg-[#c17a4a] hover:text-[#0e0e0e] transition-colors duration-200">Escribinos por WhatsApp</a>
        </div>
        <div className="mt-8">
          <Link href="/" className="font-mono text-xs text-[#3a3a3a] hover:text-[#8a7a6a] transition-colors">Volver</Link>
        </div>
      </div>
    </main>
  )
}