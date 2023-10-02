import NoteBox from "@/components/notes/NoteBox";
import { notesType } from "%/types/models";
import { getNotes } from "%/controller/notes.controller";

// TODO: Use of slug instead of ID
const Note = async () => {
  const notes = await getNotes();

  return (
    <div className="min-h-screen py-5">
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {
          notes.map((note: notesType) => (
            <NoteBox key={note._id} title={note.name} href={note.hasSubNotes?`/subnotes?notesId=${note._id}`:`/read/test/1234`} description={note.description} />
          ))
        }
      </div>
    </div>
  );
};

export default Note;