import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/organization(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, orgSlug, redirectToSignIn } = await auth();
  console.log('userId', userId)
  console.log('orgId', orgId)
  console.log('orgSlug', orgSlug)
  if (isProtectedRoute(req)) {
    if (userId) {
      if (orgId && (req.nextUrl.pathname !== '/select-org' || )) {
        const orgUrl = new URL(`/organization/${orgSlug}`, req.url)
        return NextResponse.redirect(orgUrl);
      }
      
    }
    else if (userId) {

    }
    else {
      return redirectToSignIn();
    }
  }
  if (isProtectedRoute(req) && userId && !orgId && req.nextUrl.pathname !== '/select-org') {
    const orgSelection = new URL('/select-org', req.url)
    return NextResponse.redirect(orgSelection);
  }
  else if (isProtectedRoute(req) && userId && orgId) {
    const orgUrl = new URL(`/organization/${orgSlug}`, req.url)
    return NextResponse.redirect(orgUrl);
  }
  else if (!isProtectedRoute(req)) {
    console.log(`${req.url} Es una ruta pública`)
  }
  else {
    console.log('No cumple ninguna condición')
  }
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};