import QRCode from "qrcode";
import { buildVCard } from "@/lib/vcard";

/** Generates the QR code SVG markup. Called by the (async) page, not by the component itself. */
export async function generateContactQrSvg(): Promise<string> {
  return QRCode.toString(buildVCard(), {
    type: "svg",
    margin: 1,
    color: { dark: "#00113A", light: "#FCF9F8" },
  });
}

export default function ContactQrCode({ svg }: { svg: string }) {
  return (
    <div
      className="w-40 h-40 [&_svg]:w-full [&_svg]:h-full"
      role="img"
      aria-label="QR code — scan to save James Maruti's contact details directly to your phone"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
