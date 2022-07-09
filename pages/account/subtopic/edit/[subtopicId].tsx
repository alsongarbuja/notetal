import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomInput, CustomSelect } from "../../../../components/global/customfields";
import { topicType } from "../../../../types/models";
import Form from "../../../../layout/Form";

const EditTopic = (props: { topics: { name: string, value: string }[] }) => {
    const router = useRouter();

    const [subtopic, setSubtopic] = useState({
        name: "",
        description: "",
        topicId: "",
        createdBy: "62aff09d479e0682a353c90f",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSubtopic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        const data = await fetch(`/api/subtopic/${router.query.subtopicId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subtopic),
        }).then(res => res.json()).catch(err => console.error(err))
    
        console.log(data);
    }

    useEffect(() => {
        const getSubtopic = async () => {
            const data = await fetch(`/api/subtopic/${router.query.subtopicId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
        
            if(data?.status==='success'){
                setSubtopic(data.subtopic)
            }else{
                console.error(data.message);
            }
        }

        getSubtopic()
    }, [])

  return (
    <Form title="Sub Topic" isEdit={true} handleSubmit={handleSubmit}>
      <CustomInput
        value={subtopic.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of topic, ex: Software Engineering, Git, etc"
      />
      <CustomSelect
        value={subtopic.topicId}
        label="topic"
        name="topicId"
        onChange={handleChange}
        placeholder="Select topic"
        options={props.topics}
      />
      <CustomInput
        value={subtopic.description}
        label="Description"
        name="description"
        onChange={handleChange}
      />
    </Form>
  );
};

export default EditTopic;

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/topic?height=3`, { method: "GET" })
    const data = await res.json()
    const topics: topicType[] = data.topics.map((topic: topicType) => ({ name: topic.name, value: topic._id }))

    return {
        props: {
            topics: topics,
        }
    }
}