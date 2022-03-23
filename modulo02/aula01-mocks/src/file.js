import { readFile } from 'fs/promises'
// import { join, dirname } from 'path'
// import { fileURLToPath } from 'url'
import { error } from './constants.js'
import { User } from './users.js'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}
export class File {
  static async csvToJson (filepath) {
    const content = await File.getFileContent(filepath)
    const validation = File.isValid(content)
    if (!validation.valid) throw new Error(validation.error)
    return File.parseCSVtoJSON(content)
  }

  static async getFileContent (filepath) {
    // const filename = join(__dirname, filepath)
    return (await readFile(filepath)).toString('utf-8')
  }

  static isValid (csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split('\n')
    const isHeaderValid = header === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLengthValid = (fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines)
    if (!isContentLengthValid) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static parseCSVtoJSON (csvString) {
    const lines = csvString.split('\n')
    const firstLine = lines.shift()
    const header = firstLine.split(',')
    const users = lines.map(line => {
      const values = line.split(',')
      return header.reduce((obj, key, index) => {
        obj[key] = values[index]
        return new User(obj)
      }, {})
    })
    return users
  }
}

// (async () => {
//   const result = await File.csvToJson('./../mocks/3items-valid.csv')
//   // const result = await File.csvToJson('./../mocks/4items-invalid.csv')
//   // const result = await File.csvToJson('./../mocks/invalidheader-invalid.csv')
//   // const result = await File.csvToJson('./../mocks/emptyfile-invalid.csv')
// })()
