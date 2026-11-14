interface MicrosoftStoreIconProps {
  className?: string
}

/**
 * Official Microsoft 4-Color Squares Logo (Transparent Background)
 * Colors:
 * - Red/Orange: #F25022
 * - Green: #7FBA00
 * - Blue: #00A4EF
 * - Yellow: #FFB900
 */
export function MicrosoftStoreIcon({ className = 'h-5 w-5 shrink-0' }: MicrosoftStoreIconProps) {
  return (
    <svg
      viewBox="0 0 198 198"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top-Left: Red/Orange */}
      <rect x="0" y="0" width="95" height="95" rx="3" fill="#F25022" />
      {/* Top-Right: Green */}
      <rect x="103" y="0" width="95" height="95" rx="3" fill="#7FBA00" />
      {/* Bottom-Left: Blue */}
      <rect x="0" y="103" width="95" height="95" rx="3" fill="#00A4EF" />
      {/* Bottom-Right: Yellow */}
      <rect x="103" y="103" width="95" height="95" rx="3" fill="#FFB900" />
    </svg>
  )
}
