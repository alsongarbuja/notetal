import Notes from '../../../lib/models/Notes';
import { modalTypes } from '../../../lib/types/custom';

export const checkSlug = async (type: modalTypes, slug: string) => {
    let model;

    console.log(type, slug);    
    
    switch(type) {
        case 'note':
            model = await Notes.find({ slug })
            break;
        default:
            return false;
    }

    console.log(model);

    if(model.length > 0){
        return true;
    }

    return false;
}

export const createSlug = (notAllowed: string[] = []) => {
    let slug = (Math.random() + 1).toString(36).substring(3); 
    if(notAllowed.length === 0) return slug
    
    while(1) {
        if(notAllowed.indexOf(slug) === -1){
            return slug;
        }
        slug = (Math.random() + 1).toString(36).substring(3);
    }
}