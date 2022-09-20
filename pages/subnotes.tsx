import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import NoteBox from "../components/notes/NoteBox";
import { subNotesType } from "../types/models";

// TODO: Use of slug instead of ID
const SubNotes = (props: { subnotes: subNotesType[] }) => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - Sub Notes</title>
        <meta name="description" content="Choose your notes to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {
          props.subnotes?.map(subnote => (
            <NoteBox key={subnote._id} title={subnote.name} href={subnote.hasPage?`/page?subNotesId=${subnote._id}`:`/read/test/1234`} description={subnote.description} />
          ))
        }
      </div>
    </div>
  );
};

export default SubNotes;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`http://localhost:3000/api/subnotes?notesId=${context.query.notesId}`, { method: "GET" });
  const data = await res.json()
  
  return {
    props: {
      subnotes: data.subnotes,
    }
  }
}