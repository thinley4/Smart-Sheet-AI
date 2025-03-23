"use client";

import { TypeAnimation } from "react-type-animation";

export function Text() {
  return (
    <>
      <div style={{ fontSize: "1em", fontWeight: "bold" }}>Introducing</div>
      <TypeAnimation
        sequence={[
          "Smart",
          500,
          "Smart Sheet", //  Continuing previous Text
          500,
          "Smart Sheet AI", //  Continuing previous Text
          500,
          "Smart Sheet",
          500,
          "Smart",
          500,
          "",
          500,
        ]}
        style={{ fontSize: "1em", fontWeight: "bold" }}
        repeat={Infinity}
      />
    </>
  );
}
