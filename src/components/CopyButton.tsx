'use client'
import { ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const CopyButton = () => {
  const [copied, setCopied] = useState(false);
  const text=window.location.href
  console.log(text)  
  const handleClick = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Button
    variant={"outline"}
    disabled={copied}
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1 border rounded text-sm hover:bg-gray-100"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};
