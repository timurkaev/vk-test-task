import React, { type FC } from "react";
import { Cell } from "./components/ui/Cell/Cell";
import { Game } from "./components/screens/Game/Game";

export const App: FC = (): JSX.Element => {
  return (
    <div className="container">
      <Game />
    </div>
  );
};
