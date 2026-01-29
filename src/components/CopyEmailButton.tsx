"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyEmailButtonProps = {
  email: string;
  label?: string;
  className?: string;
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

export function CopyEmailButton({
  email,
  label = "Copy email",
  className,
  variant = "secondary",
  size = "sm",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!ok) {
          throw new Error("copy-failed");
        }
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      try {
        window.prompt("Copy email:", email);
      } catch {
        // ignore prompt failures
      }
      setCopied(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(className)}
    >
      {copied ? "Copied" : label}
    </Button>
  );
}
