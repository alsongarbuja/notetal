import mongoose from "mongoose";

const SubNotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    hasPage: {
        type: Boolean,
        default: false,
    },
    notesId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Notes',
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

SubNotesSchema.pre('save', async function (next) {
    const subNotes = this;
    subNotes.slug = subNotes.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.SubNotes || mongoose.model('SubNotes', SubNotesSchema)