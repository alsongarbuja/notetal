import SubNotes from "%/models/SubNotes";
import dbConnect from "%/server"
import { dynamicObject } from "%/types/custom";
import { subNotesType } from "%/types/models";
import mongoose from "mongoose";

export const getSubNotes = async (query?: dynamicObject) => {
  await dbConnect();
  let subnotes: subNotesType[] = query?.createrId ? await SubNotes.find({ createdBy: new mongoose.Types.ObjectId(query?.createrId) }) : await SubNotes.find({ });
  if(query?.notesId){
    subnotes = subnotes.filter((subnote) => subnote.notesId.toString() === query.notesId);
  }
  if(query?.hasPage){
    subnotes = subnotes.filter((subnote) => subnote.hasPage);
  }
  return subnotes;
}

export const addSubNotes = async (subnotes: subNotesType) => {
  await dbConnect();
  const subnote = await SubNotes.create(subnotes);
  return subnote;
}

export const getSingleSubNotes = async (subnoteId: string) => {
  await dbConnect();
  const subnotesId = new mongoose.Types.ObjectId(subnoteId)                
  const subnote = await SubNotes.findById(subnotesId)
  return subnote;
}

export const updateSubNotes = async (subnoteId: string, subnotes: subNotesType) => {                
  const subnote = await getSingleSubNotes(subnoteId);
  Object.assign(subnote, subnotes);
  subnote.save();
  return subnote;
}

export const deleteSubNotes = async (subnoteId: string) => {
  const subnote = await getSingleSubNotes(subnoteId);
  subnote.delete();
  return { status: "success" };
}