const { readFile } = require('fs/promises')

class BaseRepository {
  constructor ({ fileName }) {
    this.fileName = fileName
  }

  async find (id) {
    const data = await readFile(this.fileName, 'utf8')
    const json = JSON.parse(data)

    if (!id) return json

    return json.find(item => item.id === id)
  }
}

module.exports = BaseRepository
