import Head from "next/head";
import NoteBox from "../components/notes/NoteBox";
import { notesType } from "../types/models";

const Note = (props: { notes: notesType[] }) => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - Notes</title>
        <meta name="description" content="Choose your note to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {
          props.notes?.map(note => (
            <NoteBox key={note._id} title={note.name} href={note.hasSubNotes?`/subnotes?notesId=${note._id}`:`/notes/test/1234`} description={note.description} />
          ))
        }
      </div>
    </div>
  );
};

export default Note;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/notes", { method: "GET" });
  const data = await res.json()
  
  return {
    props: {
      notes: data.notes,
    }
  }
}