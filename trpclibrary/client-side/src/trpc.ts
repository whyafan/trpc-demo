import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "server-side";

export const trpc = createTRPCReact<AppRouter>();
