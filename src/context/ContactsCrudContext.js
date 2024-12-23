import { createContext,useContext, useState } from "react";
import api from '../api/contacts';
import {v4 as uuid} from 'uuid'; //gives unique id

const contactsCrudContext = createContext();

export default function ContextProvider({children}){
    const[contacts,setContacts]=useState([]);
    const[searchTerm,setSearchTerm]=useState([]);
    const[searchResults,setSearchResults]=useState([]);
    //Retrieve
    const retrieveContacts = async()=>{
        const response = await api.get("/contacts")
        if(response.data)
            setContacts(response.data);
      }
      //Addcontact
      const addContactHandler=async(contact)=>{
        console.log(contact); 
        const request={
            id:uuid(),
            ...contact
        }
        const response = await api.post("\contacts",request);
        console.log(response);
        setContacts([...contacts,{id:uuid(),...contact}]);
      };
      //Update
      const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id } = response.data;
        setContacts(
          contacts.map((contact) => {
            return contact.id === id ? { ...response.data } : contact;
          })
        );
      };
      //DeleteContacts
    const removeHandler=async(id)=>{
        await api.delete(`/contacts/${id}`);
        const newcontacts = contacts.filter((contact)=>
        {
          return contact.id!==id;
        });
        setContacts(newcontacts);
      }

      //Search
      const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
          const newContactList = contacts.filter((contact) => {
            console.log(contact);
            return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
          setSearchResults(newContactList);
        }else {
          setSearchResults(contacts);
        }
      };
    const value={
        searchTerm,
        searchResults,
        searchHandler,
        contacts,
        retrieveContacts,
        removeHandler,
        addContactHandler,
        updateContactHandler
    }
    return (<contactsCrudContext.Provider value={ value } >
                {children}
        </contactsCrudContext.Provider>);
       
    
}
export function useContactsCrud(){
    return useContext(contactsCrudContext);
}