import Head from "next/head";
import LevelBox from "../components/level/LevelBox";
import { levelType } from "../types/models";

const Level = (props: { levels: levelType[] }) => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - levels</title>
        <meta name="description" content="Choose your level to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {
          props.levels?.map(level => (
            <LevelBox key={level._id} title={level.name} href={level.levelHeight===2?`/notes/test/1234`:'/sublevel'} description={level.description} />
          ))
        }
      </div>
    </div>
  );
};

export default Level;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/level", { method: "GET" });
  const data = await res.json()
  
  return {
    props: {
      levels: data.levels,
    }
  }
}