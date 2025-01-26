import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/organization(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    return redirectToSignIn();
  } 
  else if (userId && !orgId && isProtectedRoute(req) && req.nextUrl.pathname !== '/select-org') {
    return NextResponse.redirect('/select-org');
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