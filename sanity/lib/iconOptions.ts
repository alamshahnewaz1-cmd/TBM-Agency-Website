/**
 * The set of icons an editor can pick for a Service (and other icon fields).
 * Keep this list in sync with `lib/icon-map.tsx`, which maps each name to the
 * matching lucide-react component used on the site.
 */
export const ICON_OPTIONS: { title: string; value: string }[] = [
  { title: "Compass (Strategy)", value: "Compass" },
  { title: "Palette (Identity)", value: "Palette" },
  { title: "Share (Social)", value: "Share2" },
  { title: "Camera (Content)", value: "Camera" },
  { title: "Megaphone (Campaigns)", value: "Megaphone" },
  { title: "Globe (Website)", value: "Globe" },
  { title: "Line Chart (Performance)", value: "LineChart" },
  { title: "Target", value: "Target" },
  { title: "Sparkles", value: "Sparkles" },
  { title: "Lightbulb", value: "Lightbulb" },
  { title: "Handshake", value: "HeartHandshake" },
  { title: "Pen / Edit", value: "PenTool" },
  { title: "Rocket", value: "Rocket" },
  { title: "Trending Up", value: "TrendingUp" },
  { title: "Users", value: "Users" },
  { title: "Zap", value: "Zap" },
]

export const ICON_VALUES = ICON_OPTIONS.map((o) => o.value)
