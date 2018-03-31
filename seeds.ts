var seeder = require('mongoose-seed');
var faker = require('faker');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/eva-dev', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './src/modules/estate/estate-model.ts'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Estate'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});

var docs = [];

for(var i=0; i<100; i++) {
    docs.push({
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      streetName: faker.address.streetName(),
      streetNumber: faker.random.number(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      price: faker.random.number(),
      description: faker.lorem.paragraph(),
    })
}
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Estate',
        'documents': docs
    }
];