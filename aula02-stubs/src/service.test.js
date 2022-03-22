import { Service } from './service.js'
import sinon from 'sinon'
import { readFileSync } from 'fs'
import { deepStrictEqual } from 'assert'

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

;(async () => {
  const mocks = {
    tatooine: JSON.parse(readFileSync('/home/washington_matos/Documents/Projects/javascript-expert/aula02-stubs/src/mocks/tatooine.json', 'utf8')),
    alderaan: JSON.parse(readFileSync('/home/washington_matos/Documents/Projects/javascript-expert/aula02-stubs/src/mocks/alderaan.json', 'utf8'))
  }
  // {
  //   // vai para internet
  //   const service = new Service()
  //   const withoutStub1 = await service.makeRequest(BASE_URL_1)
  //   console.log(JSON.stringify(withoutStub1))
  //   const withoutStub2 = await service.makeRequest(BASE_URL_2)
  //   console.log(JSON.stringify(withoutStub2))
  // }
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)

  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2
    }
    const results = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(results, expected)
  }
  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearedIn: 5
    }
    const results = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(results, expected)
  }
})()
