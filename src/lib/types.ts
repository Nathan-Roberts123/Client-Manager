import { z } from "zod";

export const ZSignUp = z
  .object({
    username: z.string().max(20, {
      message: "Username be less than 20 characters.",
    }),
    email: z.string().email({
      message: "Email must be valid.",
    }),
    password: z.string().min(8, {
      message: "Password must be more than 8",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

export type TSignUp = z.infer<typeof ZSignUp>;

export const ZSignIn = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string(),
});

export type TSignIn = z.infer<typeof ZSignIn>;

const ZAddress = z.object({
  country: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const ZClient = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email({
    message: "Email must be valid e.g name@gmail.com",
  }),
  phoneNumber: z.string().optional(),
  company: z.string().optional(),
  address: ZAddress.optional(),
  note: z.string().optional(),
});

export type TClient = z.infer<typeof ZClient>;

export const ZUser = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  clients: z.array(ZClient).optional(),
});

export type TUser = z.infer<typeof ZUser>;
