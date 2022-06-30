const { BaseRepository } = require('./../repository')
const { Tax, Transaction } = require('./../entities')

class CarService {
  constructor ({ cars }) {
    this.carRepository = new BaseRepository({ fileName: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
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

  currencyFormat (value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  calculateFinalPrice ({ age }, { price }, numberOfDays) {
    const { tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)
    const finalPrice = (tax * price) * numberOfDays
    return this.currencyFormat(finalPrice)
  }

  async rent (customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)

    const today = new Date()
    today.setDate(new Date().getDate() + numberOfDays)
    const dueDate = today.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })

    console.log({ dueDate })
    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate
    })

    return transaction
  }
}

module.exports = CarService
