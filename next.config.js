/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: 'export',
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static-cdn.jtvnw.net',
                port: '',
                pathname: '/jtv_user_pictures/**',
            },
            {
                protocol: 'https',
                hostname: 'static-cdn.jtvnw.net',
                port: '',
                pathname: '/jtv_user_pictures/**',
            },
            {
                protocol: 'https',
                hostname: 'data.marcey.xyz',
                port: '',
                pathname: '/strimly/**',
            },
        ],
    }
};

module.exports = nextConfig;
