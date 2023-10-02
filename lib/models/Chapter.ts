import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
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
    hasLesson: {
        type: Boolean,
        default: false,
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

ChapterSchema.pre('save', async function (next) {
    const chapters = this;
    chapters.slug = chapters.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.Chapters || mongoose.model('Chapters', ChapterSchema)