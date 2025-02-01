import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedRoutes = ['/organization(.*)', '/settings'];
const isProtectedRoute = createRouteMatcher(protectedRoutes);


export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, orgSlug, redirectToSignIn } = await auth();

  const authURLs = ['/sign-in', '/sign-up']
  if (!isProtectedRoute(req) && userId && orgId && (authURLs.includes(req.nextUrl.pathname))) {
    const orgUrl = new URL(`/organization/${orgSlug}`, req.url)
    return NextResponse.redirect(orgUrl);
  }

  if (isProtectedRoute(req) && userId && !orgId) {
    const orgSelection = new URL('/select-org', req.url)
    return NextResponse.redirect(orgSelection);
  }

  if (isProtectedRoute(req) && !userId && !authURLs.includes(req.nextUrl.pathname)) {
    return redirectToSignIn({
      returnBackUrl: req.url,
    });
  }
});

export const config = {
  matcher: [
    // Excluir archivos estáticos y Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Aplicar middleware a API y TRPC
    '/(api|trpc)(.*)',
  ],
};
