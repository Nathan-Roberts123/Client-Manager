export { default } from "next-auth/middleware";

export const config = { matcher: ["/clients"] };

// import { withAuth } from "next-auth/middleware";
//
// export default withAuth({
//   // Matches the pages config in `[...nextauth]`
//   pages: {
//     signIn: "/auth/sign-in",
//     signOut: "/auth/sign-in",
//     error: "/auth/sign-in",
//     newUser: "/auth/sign-up",
//   },
// });
