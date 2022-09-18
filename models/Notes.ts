import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
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
    hasSubNotes: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

NotesSchema.pre('save', async function (next) {
    const notes = this;
    notes.slug = notes.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.Notes || mongoose.model('Notes', NotesSchema)