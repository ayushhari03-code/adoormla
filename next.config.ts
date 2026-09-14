import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedRevalidateHeaderKeys: undefined,
  },
  // @ts-ignore - Next.js might complain about this, but it's required to allow mobile access
  allowedDevOrigins: ['192.168.1.8', '192.168.1.7', '192.168.*.*', 'localhost:3000'],
};

export default withNextIntl(nextConfig);
