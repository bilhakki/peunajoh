import React from "react";
import RenderExplanation from "../RenderExplaination";
import rencanaMakan from "@/const/rencana-makan";
import { Button } from "../ui/button";

export default function RencanaMakan() {
  return (
      <RenderExplanation lists={rencanaMakan} />
  );
}
