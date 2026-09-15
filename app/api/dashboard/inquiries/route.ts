import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, requireAdmin } from "@/lib/firebase-admin";

interface InquiryDoc {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  createdAt: string | null;
}

interface SubscriberDoc {
  id: string;
  email: string;
  subscribedAt: string | null;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  try {
    const db = getAdminDb();

    const [inquiriesSnap, subscribersSnap] = await Promise.all([
      db.collection("inquiries").orderBy("createdAt", "desc").limit(200).get(),
      db.collection("newsletter_subscribers").orderBy("subscribedAt", "desc").limit(200).get(),
    ]);

    const inquiries: InquiryDoc[] = inquiriesSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "",
        email: data.email ?? "",
        inquiryType: data.inquiryType ?? "",
        message: data.message ?? "",
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      };
    });

    const subscribers: SubscriberDoc[] = subscribersSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email ?? "",
        subscribedAt: data.subscribedAt?.toDate?.().toISOString() ?? null,
      };
    });

    return NextResponse.json({ inquiries, subscribers });
  } catch (error) {
    console.error("Failed to load dashboard inquiries:", error);
    return NextResponse.json({ error: "Failed to load inquiries." }, { status: 500 });
  }
}
