/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // For Local Server
	API_PROD_URL: "https://api.mcars.ph/api/",
    //API_PROD_URL: "http://localhost:8000/api/",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en/dashboard",

        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: '/storage/**'
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: '/frontend/**'
      },
      // {
      //   protocol: "https",
      //   hostname: "laravel.pixelstrap.net",
      //   port: "",
      //   pathname: '/fastkart/**'
      // },
      {
        protocol: "http",
        hostname: "127.0.0.1:8000",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "api.fabteecraft.com",
    //     port: "8000",
    //     pathname: '/storage/**'
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "api.fabteecraft.com",
    //     port: "8000",
    //     pathname: '/frontend/**'
    //   },
    //   // {
    //   //   protocol: "https",
    //   //   hostname: "laravel.pixelstrap.net",
    //   //   port: "",
    //   //   pathname: '/fastkart/**'
    //   // },
    //   {
    //     protocol: "https",
    //     hostname: "api.fabteecraft.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "api.fabteecraft.com",
    //   },
    // ],
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
