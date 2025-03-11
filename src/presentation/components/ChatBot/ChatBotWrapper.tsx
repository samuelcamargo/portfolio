'use client';

import { usePathname } from 'next/navigation';
import ChatBot from './ChatBot';

export default function ChatBotWrapper() {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  
  if (isDashboardRoute) {
    return null;
  }
  
  return <ChatBot />;
} 