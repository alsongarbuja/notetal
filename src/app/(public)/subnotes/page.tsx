import { getSubNotes } from '%/controller/subnote.controller'
import { subNotesType } from '%/types/models';
import NoteBox from '@/components/notes/NoteBox';

const SubNotePage = async () => {
  const subnotes = await getSubNotes();

  return (
    <div className="min-h-screen py-5">
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {
          subnotes?.map((subnote: subNotesType) => (
            <NoteBox key={subnote._id} title={subnote.name} href={subnote.hasPage?`/page?subNotesId=${subnote._id}`:`/read/test/1234`} description={subnote.description} />
          ))
        }
      </div>
    </div>
  )
}

export default SubNotePage