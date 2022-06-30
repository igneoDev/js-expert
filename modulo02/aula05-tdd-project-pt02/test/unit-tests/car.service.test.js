const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { join } = require('path')
const { CarService } = require('../../src/service')
const { validCar, validCarCategory } = require('../mocks/mocks')
const { expect } = require('chai')
const sinon = require('sinon')

const carsDatabase = join(__dirname, './../../database/cars.database.json')
describe('CarService Suite', () => {
  let carService = new CarService({
    cars: carsDatabase
  })

  let sandbox = sinon.createSandbox()

  before(() => {
    carService = new CarService({
      cars: carsDatabase
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
})
