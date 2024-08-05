'use client'
import React, { useEffect, useState } from 'react';
import Layout from './layout';
import { Button } from '@/components/ui/button';
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore"; 
import { db } from '../firebase'






const HomePage = () => {

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'inventory', id));
      setAllItems(allItems.filter(item => item.id !== id));
      retrieveData();
      console.log('Document successfully deleted!');
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }; //This is the delete function


  const [allItems, setAllItems] = useState<any[]>([]);
  
  async function retrieveData() {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })); //because querySnapshot isn't an array so we need to extract it before assign it for setAllItems
    setAllItems(items); 
    console.log(allItems)
    
  }

  useEffect(() => {
    retrieveData();
  },[]);

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form); 

    const { name, quantity, category, description } = Object.fromEntries(formData.entries());

    console.log({ name, quantity, category, description });

 

    // Clear the form fields
    form.reset();

    //add data to firestore

    const addDocument = async () => {
      try {
        const docRef = await addDoc(collection(db, 'inventory'), {
          name,
          quantity, // Ensure quantity is a number
          category,
          description
        });
        console.log('Document written with ID: ', docRef.id);

      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    addDocument();
    retrieveData();
    

  }

  return (
    <Layout>
      <div className='h-screen bg-yellow-50'>
        <h1 className='text-4xl text-green-600 text-center'>Welcome to the Inventory Tracker</h1>        

        <div className='p-10 border items-center justify-between gap-10'>
          <h1 className='text-3xl justify-center text-center text-red-900'>List of items</h1>
          
          {/*Display items in store */}
          {allItems.length > 0 ? allItems.map(({ id, name, quantity, category, description }) => (
            <div key={id} className='flex gap-5 border items-center justify-between p-10 rounded-md'>
              <div className='flex border rounded-lg'>
                <h2 className='text-red-500'>Name of item:</h2>
                <p className=''> {name}</p>
              </div>

              <div className='flex border rounded-lg'>
                <h2 className='text-red-500'>Quantity:</h2>
                <p> {quantity}</p>
              </div>

              <div className='flex border rounded-lg'>
                <h2 className='text-red-500'>Category:</h2>
                <p> {category}</p>
              </div>

              <div className='flex border rounded-lg'>
                <h2 className='text-red-500'>Note:</h2>
                <p> {description}</p>
              </div>

              {/* Remove items button */}

              <div>
                <Button onClick={() => handleDelete(id)}>Remove</Button>
              </div>

            </div>

          
          )) : <p>No items found</p>}


        </div>

        <div className='flex flex-col justify-between items-center'>
          <form onSubmit={handleSubmit} method="post">

            <h1 className='text-center'>ADD YOUR ITEM TO TRACKER</h1>
            <label htmlFor="name">Name of Item</label>
            <input type='text' id="name" name="name" className='border' required />
            
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" className='border' required />
            
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" className='border' required />
            
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" className='border' required />
            
            <Button type='submit'>Add Item</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;