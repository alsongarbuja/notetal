import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
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
    topicHeight: {
        type: Number,
        enum: [2, 3],
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

TopicSchema.pre('save', async function (next) {
    const topic = this;
    topic.slug = topic.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema)