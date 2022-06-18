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
        <LevelBox title="Software Engineering" href="/" description="Read notes from software engineering syllabus based on PU" />
        <LevelBox title="Civil Engineering" href="/" />
        <LevelBox title="MBBS" href="/" />
        <LevelBox title="BBA" href="/" />
        <LevelBox title="GIT" href="/" />
        <LevelBox title="LAW" href="/" />
        <LevelBox title="Lok sewa" href="/" />
      </div>
    </div>
  );
};

export default Level;