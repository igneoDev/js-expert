
module.exports = {
  validCar: {
    id: '62750e79-3fe2-4494-bd2f-d4a0983f77eb',
    name: 'Mustang',
    releaseYear: 2022,
    available: true,
    gasAvailable: true
  },
  validCarCategory: {
    id: '6c56592c-c327-4649-b00e-f283f51e60ec',
    name: 'Sports',
    carIds: [
      'f7f78db7-3f9e-44f4-b884-a8b805b261fa',
      '7a84ff30-d932-4f7a-a7cf-55e4ae93a221',
      '62750e79-3fe2-4494-bd2f-d4a0983f77eb'
    ],
    price: '121.00'
  },
  validCustomer: {
    id: '746c9eb0-2867-41d2-b4d2-09963547bef9',
    name: 'Maryjane Kihn',
    email: 'Maryjane96@yahoo.com',
    phone: '+55 (78) 9 2952-0056',
    address: '9285 Wisoky Overpass',
    cpf: 15721700084,
    age: 38,
    cars: []
  }
}
