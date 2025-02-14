/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn-pika-production-cdn-bucket.s3.eu-central-1.amazonaws.com',
      'cloudinary.pikakasino.com'
    ],
  }
}

module.exports = nextConfig