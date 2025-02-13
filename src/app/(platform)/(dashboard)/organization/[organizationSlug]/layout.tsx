import OrgControl from "./_components/org-control";

export default function OrganizationSlugLayout({
  children
} : {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}