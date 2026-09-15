import type { Metadata } from "next";
import InquiriesView from "@/components/InquiriesView";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export default function DashboardInquiriesPage() {
  return <InquiriesView />;
}
