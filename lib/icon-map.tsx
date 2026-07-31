/**
 * Maps the icon string values chosen in Sanity to their lucide-react
 * components. Keep the keys in sync with `sanity/lib/iconOptions.ts`.
 */
import {
  Compass,
  Palette,
  Share2,
  Camera,
  Megaphone,
  Globe,
  LineChart,
  Target,
  Sparkles,
  Lightbulb,
  HeartHandshake,
  PenTool,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

export const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  Palette,
  Share2,
  Camera,
  Megaphone,
  Globe,
  LineChart,
  Target,
  Sparkles,
  Lightbulb,
  HeartHandshake,
  PenTool,
  Rocket,
  TrendingUp,
  Users,
  Zap,
}

/** Resolve an icon name to a component, falling back to Sparkles. */
export function resolveIcon(name?: string | null): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name]
  return Sparkles
}
