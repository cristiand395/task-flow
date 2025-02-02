"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  CreditCard,
  Layout,
  Settings
} from "lucide-react"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  name: string;
  slug: string | null;
  imageUrl: string | StaticImport;
};

interface NavbarItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export function NavbarItem({
  isExpanded,
  isActive,
  organization,
  onExpand
}: NavbarItemProps) {
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.slug}`
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.slug}/activity`
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.slug}/billing`
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.slug}/settings`
    }
  ]

  return (
    <Accordion
      className="w-full"
      type="single"
      collapsible>
      <AccordionItem
        value={organization.id}
        className="border-none">
        <AccordionTrigger
          onClick={() => onExpand(organization.id)}
          className={cn(
            "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
            isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
          )}
        >
          <div className="flex items-center gap-x-2">
            <div className="w-7 h-7 relative">
              <Image
                fill
                src={organization.imageUrl}
                alt="Organization"
                className="rounded-sm object-cover"
              />
            </div>
            <span className="font-medium text-sm">
              {organization.name}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-neutral-700">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}>
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "w-full font-normal justify-start pl-10 mb-1",
                  pathname === route.href && "bg-sky-500/10 text-sky-700"
                )}
              >
                {route.icon}
                {route.label}
              </Button>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

NavbarItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}