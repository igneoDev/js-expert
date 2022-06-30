const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { CarService } = require('../../src/service')
const { Transaction } = require('../../src/entities')
const { validCar, validCarCategory, validCustomer } = require('../mocks/mocks')
const { expect } = require('chai')
const sinon = require('sinon')
describe('CarService Suite', () => {
  let sandbox = sinon.createSandbox()
  const now = new Date(2020, 10, 5)
  sandbox.useFakeTimers(now.getTime())

  let carService = new CarService({
    cars: {}
  })

  before(() => {
    carService = new CarService({
      cars: {}
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })
  it('should retrieve a random position from array', () => {
    const data = [1, 2, 3, 4, 5]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lt(data.length).and.be.gte(0)
  })

  it('should choose the first id from carIds in carCategory', async () => {
    const carCategory = validCarCategory
    const carIdIndex = 0

    sandbox.stub(carService, carService.getRandomPositionFromArray.name).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.equal(true)
    expect(result).to.be.equal(expected)
  })
  it('given a car category it should return an available car', async () => {
    const car = validCar
    const carCategory = Object.create(validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.equal(true)
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.equal(true)
    expect(result).to.be.deep.equal(expected)
  })

  it('should return final amount in BRL', async () => {
    const customer = Object.create(validCustomer)
    customer.age = 50

    const carCategory = Object.create(validCarCategory)
    carCategory.price = 37.6

    const numberOfDays = 5

    sandbox.stub(
      carService,
      'taxesBasedOnAge'
    ).get(() => [
      { from: 40, to: 50, tax: 1.3 }
    ])

    const expected = carService.currencyFormat(244.40)
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )

    expect(result).to.be.equal(expected)
  })

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const car = validCar
    const carCategory = {
      ...validCarCategory,
      price: 37.6,
      carIds: [car.id]
    }

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).returns(car)

    const customer = Object.create(validCustomer)
    customer.age = 20

    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'
    const expectedAmount = carService.currencyFormat(206.8)

    const result = await carService.rent(customer, carCategory, numberOfDays)
    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate
    })

    expect(result).to.be.deep.equal(expected)
  })
})
