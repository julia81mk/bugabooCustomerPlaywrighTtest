const { faker } = require('@faker-js/faker');

function createRandomData() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    orderItemNumber: faker.number.int({ min: 1, max: 50 }).toString(),
    description: faker.lorem.paragraphs(5),
    phone: faker.phone.number()
  };
}
module.exports = { createRandomData };
