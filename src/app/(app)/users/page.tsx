import UserManagement from '@/components/dashboard/user-management';

export default function UsersPage() {
  // This page would typically have a check to ensure only admins can access it.
  return <UserManagement />;
}
