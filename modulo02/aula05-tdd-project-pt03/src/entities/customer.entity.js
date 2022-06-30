const Base = require('./base/base.entity')

class Customer extends Base {
  constructor ({ id, name, email, phone, address, cpf, age, cars }) {
    super({ id, name })
    this.email = email
    this.phone = phone
    this.address = address
    this.cpf = cpf
    this.age = age
    this.cars = cars
  }
}

module.exports = Customer
