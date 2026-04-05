import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Ya simple '.env' jo aap use kar rahe hain

async function dropDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to DB...");

    // Poora database drop karne ki command
   if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
    console.log("Success: Database clean ho gaya!");
} else {
    console.log("Error: Database connection nahi mil raha.");
}

    console.log("Success: Cloud Database poora clean ho gaya hai!");
    process.exit(0);
  } catch (error) {
    console.error("Error dropping database:", error);
    process.exit(1);
  }
}

dropDatabase();
