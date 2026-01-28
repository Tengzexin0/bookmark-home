import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFavicon(domain?: string) {
  const proxyUrl = 'favicon-proxy.tzx.cc.cd';
  if (domain?.includes('mail.google.com') || domain?.includes('gmail.com')) {
    return 'https://icons.duckduckgo.com/ip3/mail.google.com.ico';
  }
  return domain ? `https://${proxyUrl}/?domain=${domain}&sz=64` : '';
}
