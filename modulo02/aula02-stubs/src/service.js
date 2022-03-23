import https from 'https'

export class Service {
  async makeRequest (url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        res.on('data', (data) => resolve(JSON.parse(data)))
        res.on('error', (err) => reject(err))
      })
    })
  }

  async getPlanets (url) {
    const result = await this.makeRequest(url)

    return {
      name: result.name,
      surfaceWater: result.surface_water,
      appearedIn: result.films.length
    }
  }
}
