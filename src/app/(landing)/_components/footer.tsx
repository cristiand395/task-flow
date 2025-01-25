import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost" asChild>
            <Link
              href="/Privacy">
                Privacy Policy
            </Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link
              href="/Terms">
                Terms of Service
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}