import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI não configurada.');
  }

  await mongoose.connect(uri);
  console.log('Conectado ao MongoDB');
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
