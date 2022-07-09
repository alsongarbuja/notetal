import Head from "next/head";
import TopicBox from "../components/topic/TopicBox";
import { topicType } from "../types/models";

const Topic = (props: { topics: topicType[] }) => {
  return (
    <div className="py-5 min-h-screen">
      <Head>
        <title>Notetal - Topics</title>
        <meta name="description" content="Choose your topic to start reading notes from notetal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-center">Choose note to read</h3>
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {
          props.topics?.map(topic => (
            <TopicBox key={topic._id} title={topic.name} href={topic.topicHeight===2?`/notes/test/1234`:'/subtopic'} description={topic.description} />
          ))
        }
      </div>
    </div>
  );
};

export default Topic;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/topic", { method: "GET" });
  const data = await res.json()
  
  return {
    props: {
      topics: data.topics,
    }
  }
}