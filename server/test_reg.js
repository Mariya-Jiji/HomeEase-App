const FormData = require('form-data');
const fs = require('fs');

async function testRegistration() {
  try {
    const form = new FormData();
    form.append('name', 'Test Prov Registration');
    form.append('email', `regt${Date.now()}@test.com`);
    form.append('password', 'password123');
    form.append('role', 'provider');
    form.append('serviceType', 'electrician');
    form.append('phone', '12345678');
    form.append('location', 'Bangalore');
    form.append('latitude', '12.1234');
    form.append('longitude', '77.5678');
    form.append('idProof', fs.createReadStream('../test.pdf'));

    const res = await fetch('http:///api:5000/api/auth/register', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });

    const data = await res.json();
    console.log("Registration Response:", res.status, data);

    // Verify in DB
    const mongoose = require('mongoose');
    require('dotenv').config();
    await mongoose.connect(process.env.MONGO_URI);
    const User = require('./models/User');
    const user = await User.findById(data.user.id);
    console.log("Saved User coordinates in DB:");
    console.log("Latitude:", user.latitude);
    console.log("Longitude:", user.longitude);
    console.log("Is it fully saved properly?:", user.latitude === 12.1234 && user.longitude === 77.5678);

    await mongoose.disconnect();
  } catch(e) { console.error(e); }
}

testRegistration();
