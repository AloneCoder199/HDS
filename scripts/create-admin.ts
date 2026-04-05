import mongoose from 'mongoose';
import User from '../lib/db/models/User';
import dotenv from 'dotenv';

// .env file load karne ke liye
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://hassandigitalskills:hds1205140@hds.4tc0w3a.mongodb.net/test";

async function createAdmin() {
  try {
    if (!MONGODB_URI) {
      throw new Error("Please define MONGODB_URI in your .env file");
    }

    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully!');

    const adminEmail = 'admin@hassandigitalskills.com';
    const plainPassword = 'admin123'; // <--- Yeh raha aapka plain password

    // 1. Pehle check karein ke admin maujood to nahi
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      console.log('ℹ️ Admin already exists. Updating to PLAIN password...');
      // Yahan humne hash nahi kiya, direct string bhej rahe hain
      await User.updateOne(
        { email: adminEmail }, 
        { password: plainPassword, role: 'ADMIN', isActive: true }
      );
      console.log('✅ Admin plain password updated!');
    } else {
      // 2. Naya Admin Create karein (Bina bcrypt ke)
      const admin = await User.create({
        studentId: 'ADMIN-001',
        email: adminEmail,
        password: plainPassword, // <--- Plain text save ho raha hai
        fullName: 'HDS Administrator',
        phone: '+92-300-1234567',
        role: 'ADMIN',
        courseId: 'admin',
        courseTitle: 'System Admin',
        enrollmentType: 'REGULAR',
        isActive: true,
      });

      console.log('🚀 Admin created successfully with PLAIN password:', admin.email);
    }

  } catch (error) {
    console.error('❌ Error log:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();
