const Base = require('./base/base.entity')

class CarCategory extends Base {
  constructor ({ id, name, carIds, price }) {
    super({ id, name })
    this.carIds = carIds
    this.price = price
  }
}

module.exports = CarCategory
