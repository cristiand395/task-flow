import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSideBar from "./mobileSidebar";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 w-full px-4 h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSideBar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
          Create
        </Button>
        <Button size="sm" className="rounded-sm block md:block">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:slug"
          afterSelectOrganizationUrl="/organization/:slug"
          afterLeaveOrganizationUrl="/select-org" />
      </div>
      <UserButton
        afterSignOutUrl="/"
      />
    </nav>
  );
}