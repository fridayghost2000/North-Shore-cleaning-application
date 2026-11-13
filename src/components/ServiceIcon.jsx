import {
  Home,
  Building2,
  Sparkles,
  Truck,
  Armchair,
  HardHat,
  Wrench,
} from 'lucide-react'

const iconMap = {
  'home':       Home,
  'building2':  Building2,
  'sparkles':   Sparkles,
  'truck':      Truck,
  'armchair':   Armchair,
  'hard-hat':   HardHat,
  'wrench':     Wrench,
}

/**
 * Renders a service icon inside a coloured pill background.
 * @param {string}  iconName  - key from iconMap
 * @param {string}  iconColor - stroke colour for the icon
 * @param {string}  iconBg    - background fill colour
 * @param {number}  size      - outer box size in px (default 44)
 * @param {number}  iconSize  - icon stroke size in px (default 20)
 * @param {number}  radius    - border radius in px (default 12)
 */
export default function ServiceIcon({
  iconName,
  iconColor = '#2196C9',
  iconBg = '#EBF5FB',
  size = 44,
  iconSize = 20,
  radius = 12,
  style = {},
}) {
  const Icon = iconMap[iconName] || Wrench

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: radius,
        background: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      <Icon size={iconSize} color={iconColor} strokeWidth={1.8} />
    </div>
  )
}
