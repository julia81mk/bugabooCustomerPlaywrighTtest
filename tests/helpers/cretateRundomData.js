const { faker } = require('@faker-js/faker');

function createRandomData() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    order_item_number: faker.number.int({ min: 1, max: 50 }).toString(),
    description: faker.lorem.paragraphs(5),
    phone: faker.phone.number()
  };
}
module.exports = { createRandomData };

