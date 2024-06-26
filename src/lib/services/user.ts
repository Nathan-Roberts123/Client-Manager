import prisma from "../prisma";
import { exclude, hashText } from "../utils";
import { TIdentityProvider, TUser } from "../types";

export async function getUser(
  email: string,
  identityProvider: TIdentityProvider
) {
  const user = await prisma.user.findUnique({
    where: { email, identityProvider },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
    },
  });

  return user;
}

export async function loginUserHandler({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TUser> {
  try {
    const user = await getUser(email, "email");
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
      where: { email: data.email, identityProvider: "email" },
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
