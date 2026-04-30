import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'care-xyz';

const caregivers = [
  {
    name: "Ayesha Rahman",
    experience: "5 Years",
    specialty: "baby-care",
    rating: 4.8,
    bio: "Passionate about child development and early education. I create a safe and fun environment for your little ones.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
  },
  {
    name: "Md. Karim Ullah",
    experience: "8 Years",
    specialty: "elderly-care",
    rating: 4.9,
    bio: "Dedicated elderly caregiver with a compassionate approach. Experienced in handling dementia patients and mobility assistance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  },
  {
    name: "Fatima Begum",
    experience: "3 Years",
    specialty: "sick-people-service",
    rating: 4.6,
    bio: "Certified nurse with experience in post-operative care and daily health monitoring. Ensuring quick recovery with a smile.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
  },
  {
    name: "Sadia Akter",
    experience: "4 Years",
    specialty: "baby-care",
    rating: 4.7,
    bio: "Experienced in handling multiple kids, engaging them in creative play, and ensuring they follow their routine strictly.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?q=80&w=1887&auto=format&fit=crop"
  },
  {
    name: "Hasan Mahmud",
    experience: "6 Years",
    specialty: "sick-people-service",
    rating: 4.8,
    bio: "Professional caregiver specializing in chronic illness management and physical therapy assistance.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
  }
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection('caregivers');
    
    // Clear existing to avoid duplicates if run multiple times
    await col.deleteMany({});
    
    const p = await col.insertMany(caregivers);
    console.log("Inserted caregivers:", p.insertedCount);
  } catch (err) {
    console.error(err.stack);
  } finally {
    await client.close();
  }
}

seed();
