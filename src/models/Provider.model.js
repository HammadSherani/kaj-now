import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: { type: String, trim: true, default: '' },

    permanentAddress: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    country: { type: String, trim: true, default: '' },

    /** GeoJSON Point: coordinates are [longitude, latitude]. Use lat/lng in API; controller maps them. */
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_say', ''],
      default: '',
    },
    dob: { type: Date },

    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceCategory',
    },
    serviceSubcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceSubcategory',
      },
    ],

    /** Document image/file URLs (upload client-side, then send URLs here). */
    facePhoto: { type: String, trim: true, default: '' },
    idCardFront: { type: String, trim: true, default: '' },
    idCardBack: { type: String, trim: true, default: '' },
    certificates: { type: [String], default: [] },

    isProfileComplete: { type: Boolean, default: false },
    isDocumentCompleted: { type: Boolean, default: false },
    experience: Number,
    rating: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

providerSchema.index({ location: '2dsphere' }, { sparse: true });

function attachLatLng(ret) {
  if (ret.location?.coordinates?.length === 2) {
    const [lng, lat] = ret.location.coordinates;
    ret.location = {
      type: 'Point',
      lat,
      lng,
      coordinates: [lng, lat],
    };
  }
  return ret;
}

providerSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, ret) {
    return attachLatLng(ret);
  },
});
providerSchema.set('toObject', {
  virtuals: true,
  transform(_doc, ret) {
    return attachLatLng(ret);
  },
});

export const Provider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);
