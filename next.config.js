/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["magic-marker.s3.sa-east-1.amazonaws.com"],
	},
}

module.exports = nextConfig
