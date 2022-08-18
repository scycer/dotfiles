import fs from 'fs'
import crypto from 'crypto'

function saveFile (fileData, path) {
  var json = JSON.stringify(fileData, null, 4)
  return new Promise((resolve, reject) => {
    fs.writeFile(path, json, 'utf8', err => {
      if (err) {
        reject(err)
      } else {
        console.log('saved ' + path)
        resolve(true)
      }
    })
  })
}

function logTitle (title) {
  console.log('----------------------------------------------------')
  console.log(title)
  console.log('----------------------------------------------------')
}

const hashBackup = (fileLocation, filename) => {
  logTitle(`Hashing ${filename}`)
  const file = fs.readFileSync(fileLocation + '/' + filename)
  const hash = crypto.createHash('md5')
  hash.update(file)
  const hashString = hash.digest('hex')
  const newFilePath = fileLocation + '/' + filename + '-backup-' + hashString
  fs.copyFileSync(fileLocation + '/' + filename, newFilePath)
  console.log(`${filename} has been hashed and saved as ${newFilePath}`)
}

export { saveFile, logTitle, hashBackup }
