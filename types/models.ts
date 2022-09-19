// interface for the notes model
export interface notesType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    hasSubNotes: boolean,
    userId: string,
}

// interface for the subNotes model
export interface subNotesType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    userId: string,
    notesId: string,
    hasPage: boolean,
}

// interface for the page model
export interface pageType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    userId: string,
    subNotesId: string,
}

// interface for the chapter model
export interface chapterType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    hasLesson: boolean,
    userId: string,
    noteId: string,
}

// interface for the lesson model
export interface lessonType {
    _id: string,
    name: string,
    slug: string,
    description: string,
    chapterId: string,
    userId: string,
}