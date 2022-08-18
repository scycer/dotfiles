import * as extensions from './extensions.mjs'
import { logTitle, saveFile } from './utils.mjs'

const general = [
  {
    key: 'ctrl+up',
    command: 'cursorMove',
    args: {
      to: 'up',
      by: 'line',
      value: 10
    },
    when: 'editorTextFocus'
  },
  {
    key: 'ctrl+down',
    command: 'cursorMove',
    args: {
      to: 'down',
      by: 'line',
      value: 10
    },
    when: 'editorTextFocus'
  }
]

const createKeybindingsFile = saveLocation => {
  logTitle('Keybindings.json file')
  return Promise.all([general, extensions.keybindings()])
    .then(([general, extensions]) => [...general, ...extensions])
    .then(settings => saveFile(settings, saveLocation))
}

export default createKeybindingsFile
