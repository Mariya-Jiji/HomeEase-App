const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testSorting() {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing mechanics
  await User.deleteMany({ serviceType: 'mechanic' });

  // Create test providers directly in DB to test sorting logic
  // Provider A is 10km away, rating 4
  // Provider B is 5km away, rating 4
  // Provider C is 5km away, rating 5

  const proA = new User({
    name: "Provider A (10km)", email: "a@test.com", password: "pwd", role: "provider",
    serviceType: "mechanic", isApproved: true, rating: 4, reviewCount: 10,
    latitude: 12.8716, longitude: 77.5946 // ~11km from 12.9716
  });

  const proB = new User({
    name: "Provider B (5km, 4*)", email: "b@test.com", password: "pwd", role: "provider",
    serviceType: "mechanic", isApproved: true, rating: 4, reviewCount: 5,
    latitude: 12.9216, longitude: 77.5946 // ~5.5km from 12.9716
  });

  const proC = new User({
    name: "Provider C (5km, 5*)", email: "c@test.com", password: "pwd", role: "provider",
    serviceType: "mechanic", isApproved: true, rating: 5, reviewCount: 20,
    latitude: 12.9216, longitude: 77.5946 // ~5.5km
  });

  await User.insertMany([proA, proB, proC]);

  // Test API endpoint for sorting
  // User is at 12.9716, 77.5946
  const res = await fetch('http:///api:5000/api/providers/mechanic?lat=12.9716&lng=77.5946&radius=50');
  const data = await res.json();
  
  console.log("Returned Providers from API:");
  console.log(JSON.stringify(data.map(p => ({name: p.name, distanceKm: p.distanceKm, rating: p.rating})), null, 2));

  await mongoose.disconnect();
}

testSorting().catch(console.error);
