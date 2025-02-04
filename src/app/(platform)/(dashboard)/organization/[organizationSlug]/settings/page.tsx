import { OrganizationProfile } from '@clerk/nextjs'

export default function SettingsPage() {
  return (
    <div>
      <OrganizationProfile
        appearance={{
          elements: {
            card: {
              boxShadow: 'none'
            }
          }
        }}
        routing='hash'
      />
    </div>
  );
}