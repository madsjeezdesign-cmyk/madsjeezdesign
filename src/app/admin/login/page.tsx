import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { requireAdminSession } from "@/lib/admin-api";

export default async function AdminLoginPage() {
  const session = await requireAdminSession();
  if (session) redirect("/admin");
  return <AdminLoginForm />;
}
