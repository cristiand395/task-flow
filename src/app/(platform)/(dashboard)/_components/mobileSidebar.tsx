"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { on } from "events";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetTitle } from "@/components/ui/sheet";
import { SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export default function MobileSideBar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <SheetTitle></SheetTitle>
          <Sidebar
            storageKey="isMobileSidebarOpen"
          />
        </SheetContent>
      </Sheet>
    </>
  );
}