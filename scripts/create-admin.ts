import mongoose from 'mongoose';
import User from '../lib/db/models/User'; // Path check kar lein agar correct hai
import bcrypt from 'bcryptjs';

// 1. Yahan apna MongoDB URL paste kar dein
const MONGODB_URI = "mongodb://localhost:27017/hds";

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // 2. Password Hash karein
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // 3. Admin Data (Check karein model fields match karti hain)
    const adminData = {
      studentId: 'ADMIN-001',
      email: 'admin@hassandigitalskills.com',
      password: hashedPassword,
      fullName: 'HDS Administrator',
      phone: '+92-300-1234567',
      role: 'ADMIN',
      courseId: 'admin',
      courseTitle: 'System Admin',
      enrollmentType: 'REGULAR',
      isActive: true,
    };

    // Pehle check karein ke kahin ye email pehle se toh nahi?
    const existingUser = await User.findOne({ email: adminData.email });
    if (existingUser) {
      console.log('Admin already exists with this email!');
      process.exit(0);
    }

    const admin = await User.create(adminData);
    
    console.log('✅ Admin created successfully:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
