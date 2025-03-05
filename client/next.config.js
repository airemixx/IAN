/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
    domains: ['localhost'],
  },
  // output: 'export', // don't use with `next start` or api route
  // distDir: 'dist',
  // avoid cors with proxy
  async rewrites() {
    return [
      {
        // 所有 API 請求轉發到後端
        source: '/api/:path*',
        // 排除 froala-upload 路徑
        destination: 'http://localhost:8000/api/:path*',
        has: [
          {
            type: 'query',
            key: 'path',
            value: '(?!froala-upload)',
          }
        ]
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    });

    return config;
  },
}

module.exports = nextConfig
