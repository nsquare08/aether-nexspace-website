interface MicrosoftStoreIconProps {
  className?: string
}

/**
 * Official Microsoft Store (Windows 11 Fluent) Icon
 */
export function MicrosoftStoreIcon({ className = 'h-4 w-4 shrink-0' }: MicrosoftStoreIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="msStoreBg" x1="148.256" y1="66.9537" x2="190.681" y2="225.572" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.7147" stopColor="#EBEBEB" />
          <stop offset="1" stopColor="#DFDFDF" />
        </linearGradient>
        <radialGradient id="msStorePocketL" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(67.8384 43.9353) rotate(134.891) scale(30.7098 32.2922)">
          <stop stopColor="#BFBFBF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="msStorePocketR" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(187.838 43.9353) rotate(134.891) scale(30.7098 32.2922)">
          <stop stopColor="#BFBFBF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="msStoreHandle" x1="187.417" y1="11.2011" x2="187.417" y2="47.502" gradientUnits="userSpaceOnUse">
          <stop stopColor="#30DAFF" />
          <stop offset="1" stopColor="#0194D4" />
        </linearGradient>
        <linearGradient id="msStoreTop" x1="129.115" y1="6.53933" x2="129.115" y2="18.0768" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1FB8FD" />
          <stop offset="1" stopColor="#0591F2" />
        </linearGradient>
      </defs>

      {/* Shopping Bag Canvas */}
      <path
        d="M252 46C252 40.4772 247.523 36 242 36H14C8.47715 36 4 40.4772 4 46V212C4 234.091 21.9086 252 44 252H212C234.091 252 252 234.091 252 212V46Z"
        fill="url(#msStoreBg)"
      />

      {/* Microsoft 4-Color Tiles */}
      <path d="M124 92H76V140H124V92Z" fill="#F25022" />
      <path d="M180 92H132V140H180V92Z" fill="#7FBA00" />
      <path d="M124 148H76V196H124V148Z" fill="#00A4EF" />
      <path d="M180 148H132V196H180V148Z" fill="#FFB900" />

      {/* Bag Pocket Contours */}
      <path
        opacity="0.87"
        d="M115.336 36H20.6637C20.2272 38.6017 20 41.2743 20 44C20 70.5097 41.4903 92 68 92C94.5097 92 116 70.5097 116 44C116 41.2743 115.773 38.6017 115.336 36Z"
        fill="url(#msStorePocketL)"
      />
      <path
        opacity="0.87"
        d="M235.336 36H140.664C140.227 38.6017 140 41.2743 140 44C140 70.5097 161.49 92 188 92C214.51 92 236 70.5097 236 44C236 41.2743 235.773 38.6017 235.336 36Z"
        fill="url(#msStorePocketR)"
      />

      {/* Handle Straps */}
      <path
        d="M60 20C60 11.1634 67.1634 4 76 4H180C188.837 4 196 11.1634 196 20V44C196 48.4183 192.418 52 188 52C183.582 52 180 48.4183 180 44V20H76V44C76 48.4183 72.4183 52 68 52C63.5817 52 60 48.4183 60 44V20Z"
        fill="url(#msStoreHandle)"
      />
      <path d="M180 4H76V20H180V4Z" fill="url(#msStoreTop)" />
    </svg>
  )
}
