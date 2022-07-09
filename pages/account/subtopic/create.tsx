import React, { useState } from "react";
import { CustomInput, CustomSelect } from "../../../components/global/customfields";
import Form from "../../../layout/Form";
import { topicType } from "../../../types/models";

const Create = (props: { topics: {name: string, value: string}[] }) => {
  const [subtopic, setSubtopic] = useState({
    name: "",
    description: "",
    topicId: "",
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubtopic((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/subtopic", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subtopic),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
}

  return (
    <Form title="Sub Topic" handleSubmit={handleSubmit}>
      <CustomInput
        value={subtopic.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of Sub topic, ex: 1st semester, etc"
      />
      <CustomSelect
        value={subtopic.topicId}
        label="topic"
        name="topicId"
        onChange={handleChange}
        placeholder="Select Topic"
        options={props.topics}
      />
      <CustomInput
        value={subtopic.description}
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired={false}
      />
    </Form>
  );
};

export default Create;

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