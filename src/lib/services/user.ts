import prisma from "../prisma";
import { exclude, hashText } from "../utils";
import { TUser } from "../types";

export async function loginUserHandler({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TUser> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });
    if (user && user.password === hashText(password)) {
      return exclude(user, ["password"]);
    } else {
      throw new Error("No user with credentials found");
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function createUserHandler(data: any) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new Error("User with the email already exist");
    }

    const user = await prisma.user.create({
      data: { ...data, password: hashText(data.password) },
    });

    return exclude(user, ["password"]);
  } catch (e: any) {
    return new Error(e);
  }
}
