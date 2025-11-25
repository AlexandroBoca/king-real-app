"use client";

import { useEffect } from "react";

export default function AutofillFix() {
  useEffect(() => {
    const interval = setInterval(() => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        if (input.matches(":-webkit-autofill") || input.matches(":autofill")) {
          input.style.backgroundColor = "white";
          input.style.color = "#111827";
          // Force override webkit autofill
          (input as HTMLElement).style.setProperty("background-color", "white", "important");
          (input as HTMLElement).style.setProperty("color", "#111827", "important");
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
}
