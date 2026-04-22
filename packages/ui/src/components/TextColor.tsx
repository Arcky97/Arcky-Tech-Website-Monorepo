import { ReactNode } from "react";
import { getColorFromTailwindString } from "./../utils"

export function TextColor ({ color = "white", children }: { color:string; children:ReactNode }) {
  const textColor = getColorFromTailwindString(color)
  return (
    <span 
      style={{
        color: textColor,
        fontWeight: "bolder"
      }}
    >
      {children}
    </span>
  )
}