import Image from "next/image"
import Link from "next/link"
import { site } from "@/lib/site"

export function Logo({
  showText = true,
  className = "",
}: {
  showText?: boolean
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-xl bg-paper">
        <Image
          src="/images/tbm-logo.png"
          alt=""
          width={40}
          height={40}
          className="h-full w-full scale-[1.55] object-cover"
          priority
        />
      </span>
      {showText && (
        <span className="text-[15px] font-extrabold leading-none tracking-tight">
          The Backstage
          <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
            Marketing
          </span>
        </span>
      )}
    </Link>
  )
}
