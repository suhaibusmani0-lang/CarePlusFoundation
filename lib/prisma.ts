import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () => {
  return new PrismaClient({
    // Fallback URL added to bypass Cloudflare build-time undefined variables
    accelerateUrl: process.env.DATABASE_URL || "prisma://accelerate.prisma-data.net/?api_key=build_bypass_key"
  }).$extends(withAccelerate())
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma