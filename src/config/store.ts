export type StoreStatus = 'coming_soon' | 'live'

export interface StoreConfig {
  readonly STORE_URL: string
  readonly STORE_STATUS: StoreStatus
  readonly PRODUCT_VERSION: string
}

/**
 * Centralized Microsoft Store release configuration.
 * Once Microsoft Store certification completes:
 * 1. Set STORE_URL to the official apps.microsoft.com product listing URL.
 * 2. Change STORE_STATUS from 'coming_soon' to 'live'.
 */
export const STORE_CONFIG: StoreConfig = {
  STORE_URL: '',
  STORE_STATUS: 'coming_soon',
  PRODUCT_VERSION: '1.0.0',
}

export function isStoreLive(): boolean {
  return STORE_CONFIG.STORE_STATUS === 'live' && STORE_CONFIG.STORE_URL.trim().length > 0
}

export function getStoreBadgeLabel(): string {
  return isStoreLive() ? 'Available on Microsoft Store' : 'Coming soon to Microsoft Store'
}
