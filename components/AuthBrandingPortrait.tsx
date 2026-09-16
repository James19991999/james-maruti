import Image from "next/image";
import { images } from "@/lib/site-data";

export default function AuthBrandingPortrait() {
  return (
    <div className="relative w-48 h-60 rounded-lg overflow-hidden border-4 border-white/10 mt-8 shrink-0">
      <Image
        src={images.heroPortrait.src}
        alt={images.heroPortrait.alt}
        fill
        sizes="192px"
        className="object-cover object-top"
        placeholder="blur"
        blurDataURL={images.heroPortrait.blurDataURL}
        priority
      />
    </div>
  );
}
