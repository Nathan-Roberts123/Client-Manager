import createJiti from "jiti";
import { fileURLToPath } from "node:url";
/** @type {import('next').NextConfig} */

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/lib/env.ts");

const nextConfig = {};

export default nextConfig;
