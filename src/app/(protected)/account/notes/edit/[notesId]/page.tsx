import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomInput, CustomSwitch } from "@/components/global/customfields";
import Form from "@/layout/Form";

// TODO: Linking the related subnotes
const EditNote = () => {
  // TODO: similar to create page of chapters
  const router = useRouter();

  const [note, setNote] = useState({
    name: "",
    description: "",
    hasSubNotes: false,
    createdBy: "62aff09d479e0682a353c90f",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "hasSubNotes") {
      setNote(prev => ({ ...prev, hasSubNotes: !prev.hasSubNotes }));
    }else{
      setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch(`/api/notes/${router.query.notesId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  useEffect(() => {
    const getNote = async () => {
      const data = await fetch(`/api/notes/${router.query.notesId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
  
      if(data?.status==='success'){
        setNote(data.note)
      }else{
        console.error(data.message);
      }
    }

    getNote()
  }, [])

  return (
    <Form title="Note" isEdit={true} handleSubmit={handleSubmit}>
      <CustomInput
        hasError={false}
        errorMessage=""
        value={note.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of note, ex: Software Engineering, Git, etc"
      />
      <CustomSwitch
        value={note.hasSubNotes}
        label="Has Sub Notes"
        name="hasSubNotes"
        onChange={handleChange}
        id="hasSubNotes"
      />
      <CustomInput
        hasError={false}
        errorMessage=""
        value={note.description}
        label="Description"
        name="description"
        onChange={handleChange}
      />
    </Form>
  );
};

export default EditNote;
