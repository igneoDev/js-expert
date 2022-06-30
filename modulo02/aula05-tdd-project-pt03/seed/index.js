const { faker } = require('@faker-js/faker')
const { writeFile } = require('fs/promises')
const { Customer, Car, CarCategory } = require('../src/entities')

const { join } = require('path')
const seederBaseFolder = join(__dirname, '../', 'database')

const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.commerce.price(20, 100)
})

const cars = []
const customers = []

for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    releaseYear: faker.date.past().getFullYear(),
    available: faker.datatype.boolean(),
    gasAvailable: faker.datatype.boolean()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const name = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: `${name.firstName} ${name.lastName}`,
    email: faker.internet.email(name.firstName, name.lastName),
    phone: faker.phone.number('+55 (##) 9 ####-####'),
    address: faker.address.streetAddress(),
    cpf: faker.datatype.number(99999999999),
    age: faker.datatype.number({ min: 18, max: 50 }),
    cars: []
  })
  customers.push(customer)
}

const saveJSONFile = async (fileName, data) => {
  const filePath = join(seederBaseFolder, fileName)
  await writeFile(filePath, JSON.stringify(data))
}

;(async () => {
  await saveJSONFile('cars.json', cars)
  await saveJSONFile('carCategories.json', [carCategory])
  await saveJSONFile('customers.json', customers)

  console.log({
    cars,
    carCategory,
    customers
  })
})()
