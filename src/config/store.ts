export type StoreStatus = 'coming_soon' | 'live'

export interface StoreConfig {
  readonly STORE_URL: string
  readonly STORE_APP_URI: string
  readonly STORE_STATUS: StoreStatus
  readonly PRODUCT_VERSION: string
  readonly PRODUCT_ID: string
}

/**
 * Centralized Microsoft Store release configuration.
 */
export const STORE_CONFIG: StoreConfig = {
  STORE_URL: 'https://apps.microsoft.com/detail/9pmxkc79jqpc',
  STORE_APP_URI: 'ms-windows-store://pdp/?productid=9pmxkc79jqpc',
  STORE_STATUS: 'live',
  PRODUCT_VERSION: '1.0.1',
  PRODUCT_ID: '9PMXKC79JQPC',
}

export function isStoreLive(): boolean {
  return STORE_CONFIG.STORE_STATUS === 'live' && STORE_CONFIG.STORE_URL.trim().length > 0
}

export function getStoreBadgeLabel(): string {
  return isStoreLive() ? 'Available on Microsoft Store' : 'Coming soon to Microsoft Store'
}
