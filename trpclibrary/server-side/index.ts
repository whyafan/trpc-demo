import express from "express";

import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;

const trpc = initTRPC.context<Context>().create();

import zod from "zod";

const appRouter = trpc.router({
  hello: trpc.procedure
    .input(
      zod.object({
        name: zod.string(),
      })
    )
    .query(({ input }) => {
      return {
        name: input.name,
      };
    }),
});

export type AppRouter = typeof appRouter;

const app = express();

import cors from "cors";
app.use(cors());

const port = 3005;

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from server-side");
});

app.listen(port, () => {
  console.log(`server-side listening at http://localhost:${port}`);
});
