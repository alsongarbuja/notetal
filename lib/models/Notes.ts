import mongoose from "mongoose";
import { checkSlug, createSlug } from "%/helpers/backend/utils/slug";

const NotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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

NotesSchema.pre('validate', async function (next) {
    const notes = this;
    const slug = notes.name.toLowerCase().split(" ").join("-")
    if(notes.slug && notes.slug !== slug){
        if(await checkSlug('note', slug)){
            notes.slug = createSlug(['note', 'chapter', 'lesson', 'subnotes', 'page', 'user']);
        }else{
            notes.slug = slug;
        }
    }
    next();
});

export default mongoose.models.Notes || mongoose.model('Notes', NotesSchema)