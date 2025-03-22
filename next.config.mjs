// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Adicione outras configurações necessárias
  experimental: {
    esmExternals: "loose", // Importante para compatibilidade
  },
};

export default nextConfig;
