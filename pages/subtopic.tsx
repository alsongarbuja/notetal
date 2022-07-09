import Head from "next/head";
import TopicBox from "../components/topic/TopicBox";
import { subTopicType } from "../types/models";

const SubTopic = (props: { subtopics: subTopicType[] }) => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - Sub Topics</title>
        <meta name="description" content="Choose your topics to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {
          props.subtopics?.map(topic => (
            <TopicBox key={topic._id} title={topic.name} href={`/notes/test/1234`} description={topic.description} />
          ))
        }
      </div>
    </div>
  );
};

export default SubTopic;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/subtopic", { method: "GET" });
  const data = await res.json()
  
  return {
    props: {
      subtopics: data.subtopics,
    }
  }
}