import { TClient } from "../types";
import prisma from "../prisma";

export const getClient = async (id: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    return client;
  } catch (e) {
    throw new Error("Failed to query data from prisma");
  }
};

export const createClient = async (data: TClient, userId: string) => {
  try {
    const client = await prisma.client.create({
      data: {
        ...data,
        User: {
          connect: { id: userId },
        },
      },
    });

    return client;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateClient = async (data: TClient, id: string) => {
  const updateClient = await prisma.client.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  return updateClient;
};

export const getClients = async (userId: string) => {
  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
  });

  return clients;
};
