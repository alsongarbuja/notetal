import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
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
    subNotesId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'SubNotes',
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

PageSchema.pre('save', async function (next) {
    const page = this;
    page.slug = page.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema)