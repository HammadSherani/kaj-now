import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoriteProviders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    totalBookings: { type: Number, default: 0 }
}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);