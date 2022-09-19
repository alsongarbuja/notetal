import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
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
    chapterId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chapters',
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

LessonSchema.pre('save', async function (next) {
    const lesson = this;
    lesson.slug = lesson.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.Lessons || mongoose.model('Lessons', LessonSchema)