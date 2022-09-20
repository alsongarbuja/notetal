import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import NoteBox from "../components/notes/NoteBox";
import { pageType } from "../types/models";

// TODO: fixing the note part
const Note = (props: { pages: pageType[] }) => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - Pages</title>
        <meta name="description" content="Choose your note to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose page to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {
          props.pages?.map(page => (
            <NoteBox key={page._id} title={page.name} href='/read/test/1234' description={page.description} />
          ))
        }
      </div>
    </div>
  );
};

export default Note;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`http://localhost:3000/api/page?subNotesId=${context.query.subNotesId}`, { method: "GET" });
  const data = await res.json()
  
  return {
    props: {
      pages: data.pages,
    }
  }
}