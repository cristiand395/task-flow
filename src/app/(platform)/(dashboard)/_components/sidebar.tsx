"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { NavbarItem, Organization } from "./navbar-item";

interface SidebarProps {
  storageKey?: string;
}
export default function Sidebar({
  storageKey = "isSidebarOpen"
}: SidebarProps) {
  const [expandedStorage, setExpandedStorage] = useLocalStorage<Record<string, any>>(storageKey, {});
  const {
    organization: activeOrganization,
    isLoaded: isOrganizationLoaded
  } = useOrganization();

  const {
    userMemberships,
    isLoaded: isOrganizationListLoaded
  } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });


  const defaultAccordionState: string[] = Object.keys(expandedStorage).reduce(
    (acc: string[], key) => {
      if (expandedStorage[key]) {
        acc.push(key);
      }
      return acc;
    }, []);

  const onExpand = (id: string) => {
    setExpandedStorage((current) => ({
      ...current,
      [id]: !current[id]
    }));
  }

  if (!isOrganizationLoaded || !isOrganizationListLoaded || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    )
  }
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-2 text-lg">
          Organizations
        </span>
        <Button
          asChild
          className="ml-auto"
          size="icon"
          type="button"
          variant="ghost"
        >
          <Link
            href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionState}
        className="space-y-2"
      >
        {
          userMemberships.data.map(({ organization }) => (
            <NavbarItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expandedStorage[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          ))
        }
      </Accordion>
    </>
  );
}