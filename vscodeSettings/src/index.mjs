// This is a Node script to generate all my docs and files for a VSCode setup.

// Settings file
import createSettingsFile from './settings.mjs'
import { installExtensions } from './extensions.mjs'
import createKeybindingsFile from './keybindings.mjs'
import { hashBackup } from './utils.mjs'

// ########################################
// Settings and Keybindings
// ########################################
hashBackup('/home/danhoek/.config/Code/User', 'settings.json')
await createSettingsFile('/home/danhoek/.config/Code/User/settings.json')

hashBackup('/home/danhoek/.config/Code/User', 'keybindings.json')
await createKeybindingsFile('/home/danhoek/.config/Code/User/keybindings.json')

// ########################################
// Extensions - Listing, adding and removing
// ########################################
await installExtensions()
