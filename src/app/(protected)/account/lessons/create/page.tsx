import React, { useState } from "react";
import { CustomInput, CustomSelect } from "@/components/global/customfields";
import Form from "@/layout/Form";

const Create = (props: { chapters: {name: string, value: string}[] }) => {
  // TODO: similar to create page of chapters
  const [lesson, setLesson] = useState({
    name: "",
    description: "",
    chapterId: "",
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLesson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/lessons", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  return (
    <Form title="Lessons" handleSubmit={handleSubmit}>
      <CustomInput
        hasError={false}
        errorMessage=""
        value={lesson.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of Lesson"
      />
      <CustomSelect
        value={lesson.chapterId}
        label="Chapter"
        name="chapterId"
        onChange={handleChange}
        placeholder="Select Chapter"
        options={props.chapters}
      />
      <CustomInput
        hasError={false}
        errorMessage=""
        value={lesson.description}
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired={true}
      />
    </Form>
  );
};

export default Create;