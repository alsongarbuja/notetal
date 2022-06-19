import Head from "next/head";
import LevelBox from "../components/level/LevelBox";

const Level = () => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - levels</title>
        <meta name="description" content="Choose your level to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        <LevelBox title="Software Engineering" href="/notes/test/12345" description="Read notes from software engineering syllabus based on PU" />
        <LevelBox title="Civil Engineering" href="/notes/test/12345" />
        <LevelBox title="MBBS" href="/notes/test/12345" />
        <LevelBox title="BBA" href="/notes/test/12345" />
        <LevelBox title="GIT" href="/notes/test/12345" />
        <LevelBox title="LAW" href="/notes/test/12345" />
        <LevelBox title="Lok sewa" href="/notes/test/12345" />
      </div>
    </div>
  );
};

export default Level;