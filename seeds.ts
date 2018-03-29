var seeder = require('mongoose-seed');
var faker = require('faker');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/eva-test', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './src/modules/auth/auth-model.ts'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Auth'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});

var docs = [];

for(var i=0; i<10; i++) {
    docs.push({
        'email': faker.internet.email(),
        'password': 'password123'
    })
}
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Auth',
        'documents': docs
    }
];