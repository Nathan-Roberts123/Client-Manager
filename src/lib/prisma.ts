import { PrismaClient } from "@prisma/client";
import { env } from "./env";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (env.NEXT_PUBLIC_NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
