"use client";

import Link from 'next/link';
import { Button } from "./ui/button";

export default function FocusBtn() {
  const handleClick = () => {
    
  };

  return (
    <Button onClick={handleClick} variant="outline" className="flex gap-2">
      <Link href="/chat">Chat</Link>
      <Chat />
    </Button>
  );
}

function Chat() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      className="lucide lucide-bot"
    >
      <path d="M12 8V4H8"/>
      <rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2"/><path d="M20 14h2"/>
      <path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
  );
}
