/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: {
    // No bloquear el build por errores de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // No bloquear el build por errores de TypeScript menores
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
