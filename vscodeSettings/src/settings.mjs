import * as extensions from './extensions.mjs'
import { logTitle, saveFile } from './utils.mjs'

const generalSettingsGrouped = {
  font: {
    'editor.fontFamily': 'Liberation Mono',
    'editor.fontWeight': '300',
    'editor.fontSize': 12,
    'editor.fontLigatures': true
  },

  editor: {
    'editor.lineNumbers': 'relative',
    'editor.minimap.enabled': false,
    'editor.renderWhitespace': 'none',
    'files.autoSave': 'onFocusChange',
    'editor.wordWrap': 'wordWrapColumn'
  },

  formatter: {
    'editor.formatOnSave': true,
    'editor.formatOnSaveMode': 'file',
    'editor.formatOnType': true,
    'files.trimTrailingWhitespace': true
  },

  terminal: {
    'terminal.integrated.fontFamily': 'Liberation Mono',
    'terminal.integrated.fontSize': 13,
    'terminal.integrated.fontWeight': '300',
    'terminal.integrated.defaultProfile.windows': 'Git Bash',
    'terminal.integrated.defaultProfile.linux': 'fish'
  },

  git: {
    'git.autofetch': true, // Automatically get branches
    'git.confirmSync': false, // Sync without confirmation
    'git.enableSmartCommit': true, // Auto-stage when no files staged
    'git.postCommitCommand': 'push', // After commit, push to remote automatically
    'git.autoStash': true, // Make pulling easier by stashing, pulling, unstashing automatically
    'git.useCommitInputAsStashMessage': true // Use the commit message as stash message
  },

  explorer: {
    'explorer.compactFolders': false,
    'files.simpleDialog.enable': true
  },

  search: {
    'search.mode': 'reuseEditor'
  },

  import: {
    'javascript.updateImportsOnFileMove.enabled': 'always' // Auto-changes to files imports when moved
  },

  sshAndSecurity: {
    'remote.SSH.remotePlatform': {
      Ultrabox: 'linux',
      'Laptop-Server': 'linux'
    },
    'security.workspace.trust.untrustedFiles': 'open',
    'security.workspace.trust.banner': 'never',
    'remote.SSH.connectTimeout': 120,
    'security.workspace.trust.enabled': false
  },

  colorAndThemes: {
    'workbench.colorCustomizations': {
      'editorUnnecessaryCode.border': '#ff7b00',
      'editorUnnecessaryCode.opacity': '#000f',
      'editorInlayHint.foreground': '#ffffff34',
      'editorInlayHint.background': '#ffffff00'
    },
    'workbench.colorTheme': "SynthWave '84",
    'workbench.iconTheme': 'material-icon-theme'
  },

  trim: {
    'workbench.editor.closeEmptyGroups': false,
    'workbench.startupEditor': 'none',
    'window.menuBarVisibility': 'toggle',
    'workbench.sideBar.location': 'right'
  },

  intellisenseAndCompletion: {
    'editor.inlineSuggest.enabled': true,
    'editor.inlayHints.fontFamily': 'Liberation Mono',
    'typescript.updateImportsOnFileMove.enabled': 'always',
    'typescript.inlayHints.parameterNames.enabled': 'all',
    'typescript.inlayHints.propertyDeclarationTypes.enabled': true,
    'typescript.inlayHints.variableTypes.enabled': true,
    'emmet.showAbbreviationSuggestions': false,
    'emmet.showExpandedAbbreviation': 'never',
    '[typescript, json, jsonc, typescriptreact, javascript, css]': {
      'editor.defaultFormatter': 'numso.prettier-standard-vscode'
    }
  }
}

const generalSettings = new Promise(resolve =>
  resolve(
    Object.keys(generalSettingsGrouped).reduce((acc, key) => {
      Object.keys(generalSettingsGrouped[key]).forEach(k => {
        acc[k] = generalSettingsGrouped[key][k]
      })
      return acc
    }, {})
  )
)

const createSettingsFile = saveLocation => {
  logTitle('Settings.JSON file')
  return Promise.all([generalSettings, extensions.settings()])
    .then(([general, extensions]) => ({
      ...general,
      ...extensions
    }))
    .then(settings => saveFile(settings, saveLocation))
}

export default createSettingsFile
