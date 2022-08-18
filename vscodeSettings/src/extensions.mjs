import { exec } from 'child_process'
import fs from 'fs'
import { logTitle } from './utils.mjs'
// get all filenames in ./extensions directory as promise
function getExtensionFiles () {
  console.log('reading extension files')
  return new Promise((resolve, reject) => {
    fs.readdir('./src/extensions', (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

// import all extension files
async function importExtensionFiles (files) {
  console.log('importing extension files')
  var extensions = {}
  for (var i = 0; i < files.length; i++) {
    console.log('importing ' + files[i])
    var file = files[i]
    var extension = await import('./extensions/' + file)
    extensions[extension.default.extentionName] = extension
  }
  return Promise.all(
    Object.keys(extensions).map(key => {
      return extensions[key]
    })
  )
}

const extensions = () => getExtensionFiles().then(importExtensionFiles)

const settings = () =>
  extensions().then(extentions =>
    extentions.reduce((acc, cur) => {
      return {
        ...acc,
        ...cur.default.settings
      }
    }, {})
  )

const keybindings = () =>
  extensions().then(extentions =>
    extentions.reduce((acc, cur) => {
      return [...acc, ...cur.default.keybindings]
    }, [])
  )

const installExtensions = () =>
  extensions().then(extentions => {
    logTitle('Installing VSCode extensions')
    const install = extentions.reduce(
      (previousPromise, nextExtension) =>
        previousPromise.then(
          () =>
            new Promise((resolve, reject) => {
              exec(
                'code --install-extension ' +
                  nextExtension.default.extentionName,
                (err, stdout, stderr) => {
                  if (err) {
                    console.error(err)
                    reject(err)
                  } else {
                    console.log(
                      'installed ' + nextExtension.default.extentionName
                    )
                    resolve()
                  }
                }
              )
            })
        ),
      Promise.resolve()
    )
    return install
  })

export { settings, installExtensions, keybindings }
