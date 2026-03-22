import { useCursor } from "../hooks/useCursor";

export function CustomCursor() {
  useCursor();

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
    </>
  );
}
