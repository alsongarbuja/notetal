import Notes from "%/models/Notes";
import dbConnect from "%/server"
import { dynamicObject } from "%/types/custom";
import { notesType } from "%/types/models";
import mongoose from "mongoose";

export const getNotes = async (query?: dynamicObject) => {
  await dbConnect();
  const notes: notesType[] = query?.createrId ? await Notes.find({ createdBy: new mongoose.Types.ObjectId(query?.createrId) }) : await Notes.find({ });
  return query?.hasSubNotes ? notes.filter(n => n.hasSubNotes) : notes;
}

export const addNotes = async (notes: notesType) => {
  await dbConnect();
  const note = await Notes.create(notes);
  return note;
}

export const getSingleNotes = async (noteId: string) => {
  await dbConnect();
  const notesId = new mongoose.Types.ObjectId(noteId)                
  const note = await Notes.findById(notesId)
  return note;
}

export const updateNotes = async (noteId: string, notes: notesType) => {                
  const note = await getSingleNotes(noteId);
  Object.assign(note, notes);
  note.save();
  return note;
}

export const deleteNotes = async (noteId: string) => {
  const note = await getSingleNotes(noteId);
  note.delete();
  return { status: "success" };
}