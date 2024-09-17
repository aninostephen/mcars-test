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
        protocol: "https",
        hostname: "api.mcars.ph",
        port: "8000",
        pathname: '/storage/**'
      },
      {
        protocol: "https",
        hostname: "api.mcars.ph",
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
        protocol: "https",
        hostname: "api.mcars.ph",
      },
      {
        protocol: "https",
        hostname: "api.mcars.ph",
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
