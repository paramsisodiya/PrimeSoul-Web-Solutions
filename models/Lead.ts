/**
 * Lead Model — MongoDB / Mongoose
 *
 * Uncomment and use when MongoDB is connected.
 * Install: npm install mongoose
 * Add to .env.local: MONGODB_URI=your_connection_string
 */

/*
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILead extends Document {
  name: string
  email: string
  phone?: string
  service: string
  budget?: string
  message: string
  source: string
  status: 'new' | 'contacted' | 'in_progress' | 'closed' | 'rejected'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    service: { type: String, required: true },
    budget: { type: String },
    message: { type: String, required: true },
    source: { type: String, default: 'website_contact_form' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'closed', 'rejected'],
      default: 'new',
    },
    notes: { type: String },
  },
  { timestamps: true }
)

// Prevent model re-registration in Next.js dev mode
const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)

export default Lead
*/

// Placeholder export for TypeScript
export {}
