import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [ pins, setPins] = useState(null)
  const {categoryId} = useParams();

  const fetchFeed = async (query) => {
    const data = await client.fetch(query)
    setPins(data)
    setLoading(false)
  }

  useEffect(()=>{
    setLoading(true);
    const query = categoryId ? searchQuery(categoryId) : feedQuery;
    fetchFeed(query);
    // if(categoryId){
    //   const query = searchQuery(categoryId)
    //   client.fetch(query)
    //     .then((data) => {
    //       setPins(data)
    //       setLoading(false)
    //     })
    // }else{
    //   // async() => {
    //   //   const data = await client.fetch(feedQuery)
    //   //   setPins(data)
    //   //   setLoading(false)
    //   // }

    //   client.fetch(feedQuery)
    //   .then((data) => {
    //     setPins(data)
    //     setLoading(false)
    //   })
    //  }
  }, [categoryId]);


  if(loading) return (<Spinner message="We are adding new ideas" />)
  return (
    <div>
      <button onClick={()=>fetchFeed(feedQuery)}>Click</button>
      {pins?.length? 
        (<MasonryLayout pins={pins} setPins={setPins} />):
        (<h2>No Pins available</h2>)
      }
    </div>
  )
}

export default Feed