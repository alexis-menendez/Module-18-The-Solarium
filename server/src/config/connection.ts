// Module-18-The-Solarium/server/src/config/connection.ts

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Confirm connection
mongoose.connection.once('open', () => {
    console.log('✅ MongoDB connected at:', mongoose.connection.name);
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

export default mongoose.connection;
