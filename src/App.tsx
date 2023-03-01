import React, { type FC } from "react";
import { Game } from "./components/screens/Game/Game";

export const App: FC = (): JSX.Element => {
  return (
    <div className="container">
      <Game />
    </div>
  );
};
