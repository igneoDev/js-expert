export class User {
  constructor ({ name, id, profession, age }) {
    this.name = name
    this.id = parseInt(id)
    this.profession = profession
    this.birthDay = age ? parseInt(new Date().getFullYear()) - parseInt(age) : ''
  }
}
