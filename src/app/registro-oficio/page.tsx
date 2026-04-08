"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase, ROL_CATEGORIAS, SISTEMAS_TRABAJO, PROVINCIAS_AR, type Rol } from "@/lib/supabase"

export default function RegistroOficioPage() {
  const [step, setStep] = useState<"form" | "done">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [provincia, setProvincia] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [rol, setRol] = useState<Rol>("albanil")
  const [sistemas, setSistemas] = useState<string[]>([])
  const [descripcion, setDescripcion] = useState("")

  const toggleSistema = (s: string) =>
    setSistemas(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre || !telefono || !provincia || !ciudad) {
      setError("Completa los campos obligatorios")
      return
    }
    setLoading(true)
    setError("")
    try {
      const { error: err } = await supabase
        .from("profiles")
        .insert({
          nombre, email, telefono, rol,
          provincia, ciudad,
          sistemas_que_trabaja: sistemas,
          descripcion,
          visible_publicamente: true,
          badge: "gris",
        })
      if (err) throw err
      setStep("done")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar. Intentalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-transparent border border-[#2a2a2a] text-[#e8e4dc] font-mono text-sm px-4 py-3 focus:outline-none focus:border-[#c17a4a] transition-colors"
  const labelClass = "font-mono text-xs tracking-[0.2em] text-[#8a7a6a] uppercase mb-2 block"

  if (step === "done") {
    return (
      <main className="min-h-screen bg-[#0e0e0e] text-[#e8e4dc] flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-[#c17a4a] uppercase mb-8">Registro recibido</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            Bienvenido a MeinHaus.
          </h1>
          <p className="font-mono text-sm text-[#8a7a6a] leading-relaxed mb-12">
            Tu perfil ya esta en el sistema. En las proximas horas lo revisamos y te confirmamos por WhatsApp.
          </p>
          <Link href="/" className="font-mono text-xs text-[#3a3a3a] hover:text-[#8a7a6a] transition-colors">
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#e8e4dc] px-6 md:px-16 lg:px-24 pt-24 pb-16">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-[#c17a4a] uppercase mb-8">
          Registro de oficio
        </p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
          Tu oficio, visible donde importa.
        </h1>
        <p className="font-mono text-sm text-[#8a7a6a] mb-12 leading-relaxed">
          Gratis. Sin intermediarios. Los clientes que buscan lo que haces te van a encontrar.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Nombre completo *</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Juan Perez"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp *</label>
              <input
                type="tel"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder="+54 9 11 xxxx xxxx"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Provincia *</label>
              <select
                value={provincia}
                onChange={e => setProvincia(e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                <option value="">Selecciona...</option>
                {PROVINCIAS_AR.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Ciudad / Localidad *</label>
              <input
                type="text"
                value={ciudad}
                onChange={e => setCiudad(e.target.value)}
                placeholder="General Roca"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tu oficio principal *</label>
            <select
              value={rol}
              onChange={e => setRol(e.target.value as Rol)}
              className={inputClass + " cursor-pointer"}
            >
              {ROL_CATEGORIAS.map(cat => (
                <optgroup key={cat.label} label={cat.label}>
                  {cat.roles.map(r => (
                    <option key={r} value={r}>{r.replace(/_/g, " ")}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Sistemas con los que trabajas</label>
            <div className="grid grid-cols-2 gap-3">
              {SISTEMAS_TRABAJO.map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={sistemas.includes(s)}
                    onChange={() => toggleSistema(s)}
                    className="accent-[#c17a4a]"
                  />
                  <span className="font-mono text-xs text-[#8a7a6a] group-hover:text-[#e8e4dc] transition-colors">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Contanos que haces</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Experiencia, zona donde trabajas, tipo de obras..."
              rows={4}
              className={inputClass + " resize-none"}
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-red-400 border border-red-400/20 px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-mono text-sm tracking-widest uppercase bg-[#c17a4a] text-[#0e0e0e] px-8 py-4 hover:bg-[#d4894f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Registrar mi oficio"}
          </button>

          <p className="font-mono text-xs text-[#3a3a3a] leading-relaxed">
            Gratis. Sin spam. Te contactamos solo para confirmar tu perfil.
          </p>
        </form>

        <div className="mt-8">
          <Link href="/" className="font-mono text-xs text-[#3a3a3a] hover:text-[#8a7a6a] transition-colors">
            Volver
          </Link>
        </div>
      </div>
    </main>
  )
}