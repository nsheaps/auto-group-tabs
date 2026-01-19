import { useStorage } from './chrome'

export type ExtensionMode = 'enabled' | 'manual' | 'disabled'
export type ClickAction = 'open-popup' | 'toggle-mode'

/**
 * Get extension mode setting from storage
 * - 'enabled': Fully enabled, always auto-group tabs (default)
 * - 'manual': Only group tabs on idle or focus change
 * - 'disabled': Temporarily disable all grouping
 */
export function useExtensionMode() {
  return useStorage<ExtensionMode>('extensionMode', 'enabled', {
    storage: 'local',
  })
}

/**
 * Get the click action setting from storage
 * - 'open-popup': Open the popup when clicking the extension icon (default)
 * - 'toggle-mode': Toggle between enabled/disabled when clicking
 */
export function useClickAction() {
  return useStorage<ClickAction>('clickAction', 'open-popup', {
    storage: 'local',
  })
}
