import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   title: "",
   description: "",
   status: "Progress",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ title: "", description: "", status: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New To Do List</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Title</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Description</label>
         <textarea 
         className="form-control"
         rows = "3"
         id="position"
         value={form.description}
         onChange={(e) => updateForm({ description: e.target.value })}
         >
         </textarea>
         {/* <input
           type="text"
           className="form-control"
           
           id="position"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         /> */}
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="checkbox"
             name="positionOptions"
             id="positionIntern"
             value="done"
             //checked={form.status === "You done with this"}
             onChange={(e) => updateForm({ status: e.target.value })}
             //onChange={(e) => updateForm({ status: e.checked })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Is it done?</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}