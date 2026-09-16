import { NextResponse } from "next/server";
import { buildVCard } from "@/lib/vcard";

export async function GET() {
  return new NextResponse(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="james-maruti.vcf"',
    },
  });
}
