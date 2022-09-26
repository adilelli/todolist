import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   title: "",
   description: "",
   status: "Progress",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.


 function updateForm(value) {
    return setForm((prev) => {
        return { ...prev, ...value };
    });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     title: form.title,
     description: form.description,
     status: form.status,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
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
             
            //  checked={() => {if(form.status === "Progress"){
            //     checked = "false";
            //  }else if(form.status === "done" && checkbox.checked == true){
            //     checked = "true";
            //  }&& checkbox.checked !== true
            // }}
             onChange={(checkbox) => {
                if(form.status === "Progress" ){
                    updateForm({ status: "done" })
                }else if(form.status === "done" ){
                    updateForm({ status: "Progress" })
                }
             } }
            // onchange="handleChange(this);"
           />
           <label htmlFor="positionIntern" className="form-check-label">Change Status? </label>
         </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 ); 
//  function handleChange(checkbox){          
//     if(form.status === "Progress" && checkbox.checked == true){
//         updateForm({ status: "done" })
//     }else if(form.status === "done" && checkbox.checked == false){
//         updateForm({ status: "Progress" })
//  }}
}