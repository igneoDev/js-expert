const { BaseRepository } = require('./../repository')

class CarService {
  constructor ({ cars }) {
    this.carRepository = new BaseRepository({ fileName: cars })
  }

  getRandomPositionFromArray (array) {
    return Math.floor(Math.random() * array.length)
  }

  chooseRandomCar (carCategory) {
    const carIdIndex = this.getRandomPositionFromArray(carCategory.carIds)
    return carCategory.carIds[carIdIndex]
  }

  async getAvailableCar (carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    return await this.carRepository.find(carId)
  }
}

module.exports = CarService
