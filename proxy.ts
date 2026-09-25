import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REDIRECTS } from './src/config/redirects';

export function proxy(request: NextRequest) {
  // Get hostname from request (e.g., github.manojgowda.qzz.io, manojgowda.qzz.io)
  let hostname = request.headers.get('host') || '';
  
  // Remove port if present (e.g. localhost:3000)
  hostname = hostname.split(':')[0];

  // Base domain to match
  const baseDomain = 'manojgowda.qzz.io';
  const defaultDestination = 'https://manojgowda.in/';

  // If exact base domain or www, redirect to root manojgowda.in/
  if (hostname === baseDomain || hostname === `www.${baseDomain}`) {
    return NextResponse.redirect(defaultDestination, 308);
  }

  // If it ends with .manojgowda.qzz.io, extract the subdomain
  if (hostname.endsWith(`.${baseDomain}`)) {
    const subdomain = hostname.replace(`.${baseDomain}`, '');
    
    // Check if subdomain is in our whitelist
    if (subdomain in REDIRECTS) {
      const destination = REDIRECTS[subdomain as keyof typeof REDIRECTS];
      // Use 308 for permanent redirect
      return NextResponse.redirect(destination, 308);
    } else {
      // Unknown subdomains redirect to the main portfolio page
      return NextResponse.redirect(defaultDestination, 308);
    }
  }

  // Fallback for any other unexpected hostnames or local dev
  // In production it might just continue or you might want to redirect
  // For safety, allow next to process it if we didn't redirect
  return NextResponse.next();
}

// Config ensures middleware runs on all paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
