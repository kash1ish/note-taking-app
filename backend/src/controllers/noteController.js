import Note from "../models/Note.js"

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json({notes})
    }catch(error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({msg : "internal serval error"})
    }
}

export async function getNoteById(req, res){
    try{
        const id = req.params.id;
        const note = await Note.findById(id);
        res.status(200).json(note);
    }catch(error){
        console.error("Error in getNoteById controller", error);
        res.status(500).json({msg : "internal serval error"})
    }
}

export async function createNote(req,res){
    try{
       const {title, content} = req.body;
       const newNote = new Note({ title, content})

       const savedNote = await newNote.save();
       res.status(201).json(savedNote)
    }
    catch(error){
        console.error("Error in createNote controller", error);
        res.status(500).json({msg : "internal serval error"})
    }
}

export async function updateNote(req,res){
    try{
        const {title, content} = req.body;
        const id = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content})


        res.status(201).json(updatedNote);
    }
    catch(error){
        console.error("Error in updateNote controller", error);
        res.status(500).json({msg : "internal serval error"})
    }
}

export async function deleteNote(req,res){
    try{
        const id = req.params.id;
        await Note.findByIdAndDelete(id);
        res.status(201).json({msg: "Note deleted successfully"});
    }
    catch(error){
        console.error("Error in deleteNote controller", error);
        res.status(500).json({msg : "internal serval error"})
    }
}