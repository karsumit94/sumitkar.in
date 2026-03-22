import { redirect } from "react-router";

export function loader() {
  return redirect("/#about");
}

export default function AboutRedirect() {
  return null;
}
