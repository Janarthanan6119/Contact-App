// import logo from './logo.svg';
import './App.css';

import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Header from './Header';
import ContactList from './ContactList';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactDetail from './'
import api from '../api/contacts'
import {ContactsCrudContext} from 'contact-app\src\context\ContactsCrudContext.js';
function App() {
  
  const[searchTerm,setSearchTerm]=useState([]);

  // Array of objects
  // const contacts=[
  //   {
  //     id:'1',
  //     name:'Jana',
  //     email:'jana@gmail.com'
  //   },
  //   {
  //     id:'2',
  //     name:'Ram',
  //     email:'ram@gmail.com'
  //   },
  // ]
  
  
  /*
  useEffect(()=>{
    // const retrieve = JSON.parse(localStorage.getItem(local_storage));
    // if(retrieve) setContacts(retrieve);
    const getallcontacts = async()=>{
      const allcontacts = await retrieveContacts();
      if(allcontacts) setContacts(allcontacts);
    }
    getallcontacts();
  },[]);*/

  // useEffect(()=>{
  //   localStorage.setItem(local_storage,JSON.stringify(contacts))
  // },[contacts]);
  return (
    <>
    
    <div className='ui container'>
    <Router>
    <Header />
     <ContactsCrudContext>
    <Routes>
    <Route path="/" exact element={<ContactList />}  />
    <Route path="/add" element={<AddContact/>} />
    <Route path="/edit" element={<EditContact />} />
    <Route path="/contact/:id" element={<ContactDetail />} />
    </Routes>
    </ContactsCrudContext>
    </Router>
    </div>
    </>
  );
}

export default App;
