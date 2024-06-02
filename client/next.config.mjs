/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['*'], // Allow any hostname
        remotePatterns: [
            {
              hostname: '**', // Use a wildcard for the hostname
              pathname: 'D:/terra-images/user-images/**',
            },
        ],
    }
};

export default nextConfig;
