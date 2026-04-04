import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    skills: [String],
    experience: Number,
    rating: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export const Provider = mongoose.model('Provider', providerSchema);