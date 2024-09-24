/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'], // Allow images from Cloudinary
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                crypto: false,
            };
        }
        return config;
    },
    env: {
        PAYU_KEY: 'e3ks2w',
        PAYU_SALT: 'Pm3xvJxIOI8npXyxWJgwFwIIwEQKsVAm',
    },
    pageExtensions: ['js', 'jsx'],
};

export default nextConfig;
