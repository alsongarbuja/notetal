import React, { useState } from "react";
import { CustomInput, CustomSelect, CustomSwitch } from "@/components/global/customfields";
import Form from "@/layout/Form";

const Create = (props: { notes: {name: string, value: string}[] }) => {
  // TODO: similar to list page of chapters
  const [chapter, setChapter] = useState({
    name: "",
    description: "",
    hasLesson: false,
    noteId: "",
    createdBy: "62aff09d479e0682a353c90f"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "hasLesson"){
      setChapter(prev => ({ ...prev, hasLesson: !prev.hasLesson }));
    }else{
      setChapter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/chapters", {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(chapter),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  return (
    <Form title="Chapters" handleSubmit={handleSubmit}>
      <CustomInput
        hasError={false}
        errorMessage=""
        value={chapter.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of Chapter"
      />
      <CustomSelect
        value={chapter.noteId}
        label="Note"
        name="noteId"
        onChange={handleChange}
        placeholder="Select Note"
        options={props.notes}
      />
      <CustomSwitch
        value={chapter.hasLesson}
        label="Has Lesson"
        name="hasLesson"
        onChange={handleChange}
        id="hasLesson"
      />
      {
        !chapter.hasLesson ? (
          <CustomInput
            errorMessage=""
            hasError={false}
            value={chapter.description}
            label="Description"
            name="description"
            onChange={handleChange}
            isRequired={true}
          />
        ): <></>
      }
    </Form>
  );
};

export default Create;