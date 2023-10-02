import { getPages } from "%/controller/page.controller";
import { pageType } from "%/types/models";
import NoteBox from "@/components/notes/NoteBox";

const Page = async () => {
  const pages = await getPages();
  
  return (
    <div className="min-h-screen py-5">
      <h3 className="text-center">Choose page to read</h3>
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {
          pages?.map((page: pageType) => (
            <NoteBox key={page._id} title={page.name} href='/read/test/1234' description={page.description} />
          ))
        }
      </div>
    </div>
  )
}

export default Page