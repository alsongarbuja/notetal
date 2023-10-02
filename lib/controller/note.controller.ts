import Notes from "%/models/Notes";
import Page from "%/models/Page";
import SubNotes from "%/models/SubNotes";
import dbConnect from "%/server";
import { dynamicObject } from "%/types/custom";
import { notesType, pageType, subNotesType } from "%/types/models";
import mongoose from "mongoose";

export const getNotes = async (query?: dynamicObject) => {
  await dbConnect();
  const cId = new mongoose.Types.ObjectId(query?.creatorId as string)
  const notes: notesType[] = await Notes.find({ createdBy: cId, hasSubNotes: false })
  const subnotes: subNotesType[] = await SubNotes.find({ createdBy: cId, hasPage: false })
  const pages: pageType[] = await Page.find({ createdBy: cId })    
  return {
    notes: [
      ...notes,
      ...subnotes,
      ...pages
    ]
  };
}
