import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // Simply redirect to the programs sub-dashboard
  redirect("/admin/programs");
}
