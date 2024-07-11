import React from "react";
import { trpc } from "./trpc";

const AppComponent = () => {
  const userQuery = trpc.hello.useQuery({ name: "Afan" });

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>{JSON.stringify(userQuery.data?.name)}</div>
    </div>
  );
};

export default AppComponent;
