import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomInput, CustomSelect } from "../../../../components/global/customfields";
import Form from "../../../../layout/Form";
import { chapterType } from "../../../../types/models";

const Create = (props: { chapters: {name: string, value: string}[] }) => {
    const router = useRouter()
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

    const data = await fetch(`/api/lessons/${router.query.lessonId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(lesson),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  useEffect(() => {
    const getLesson = async () => {
        const data = await fetch(`/api/lessons/${router.query.lessonId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
        
        if(data?.status==='success'){            
            setLesson(data.lesson)
        }else{
            console.error(data.message);
        }
    }

    getLesson();
  }, [])

  return (
    <Form title="Lessons" handleSubmit={handleSubmit} isEdit>
      <CustomInput
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

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/chapters?hasLesson=true&creatorId=${process.env.TEST_USER_ID}`, { method: "GET" })
    const data = await res.json()
    const chapters: chapterType[] = data.chapters.map((chapter: chapterType) => ({ name: chapter.name, value: chapter._id }))

    return {
        props: {
            chapters: chapters,
        }
    }
}