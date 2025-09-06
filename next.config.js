/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages를 위한 설정
  distDir: 'out',
  // GitHub Pages에서 index.html이 우선순위를 가지도록 설정
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

module.exports = nextConfig
