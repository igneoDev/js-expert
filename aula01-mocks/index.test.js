import { error } from './src/constants.js'
import { File } from './src/file.js'
import { rejects, deepStrictEqual } from 'assert'
;
(async () => {
  {
    const filePath = './mocks/emptyfile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/4items-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/3items-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = JSON.parse(`[
      {
        "name": "Erick Wendel",
        "id": 123,
        "profession": "Javascript Instructor",
        "birthDay": 1997
      },
      {
        "name": "Xuxa da Silva",
        "id": 321,
        "profession": "Javascript Specialist",
        "birthDay": 1942
      },
      {
        "name": "Joaozinho",
        "id": 213,
        "profession": "Java Developer",
        "birthDay": 1992
      }
    ]`)

    await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
