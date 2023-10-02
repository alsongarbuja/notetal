import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomInput, CustomSelect, CustomSwitch } from "@/components/global/customfields";
import Form from "@/layout/Form";

// TODO: Linking the related page
const EditTopic = (props: { notes: { name: string, value: string }[] }) => {
  // TODO: simlar to create page of chapters
  const router = useRouter();
  const [subNote, setSubNote] = useState({
    name: "",
    description: "",
    hasPage: false,
    notesId: "",
    createdBy: "62aff09d479e0682a353c90f",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'hasPage') {
      setSubNote((prev) => ({ ...prev, hasPage: !prev.hasPage }));
    }else{
      setSubNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch(`/api/subnotes/${router.query.subnotesId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subNote),
    }).then(res => res.json()).catch(err => console.error(err))

    console.log(data);
  }

  useEffect(() => {
    const getSubNote = async () => {
      const data = await fetch(`/api/subnotes/${router.query.subnotesId}`, { method: "GET" }).then(res => res.json()).catch(err => console.error(err))
      if(data?.status==='success'){
        setSubNote(data.subnote)
      }else{
        console.error(data.message);
      }
    }

    getSubNote()
  }, [])

  return (
    <Form title="Sub Note" isEdit={true} handleSubmit={handleSubmit}>
      <CustomInput
        hasError={false}
        errorMessage=""
        value={subNote.name}
        label="Name"
        name="name"
        onChange={handleChange}
        placeholder="Name of Sub notes, ex: 1st semester, etc"
      />
      <CustomSelect
        value={subNote.notesId}
        label="notes"
        name="notesId"
        onChange={handleChange}
        placeholder="Select Note"
        options={props.notes}
      />
      <CustomInput
        hasError={false}
        errorMessage=""
        value={subNote.description}
        label="Description"
        name="description"
        onChange={handleChange}
        isRequired={false}
      />
      <CustomSwitch
        value={subNote.hasPage}
        label="Has Page"
        name="hasPage"
        onChange={handleChange}
        id="hasPage"
      />
    </Form>
  );
};

// TODO: rename component name
export default EditTopic;