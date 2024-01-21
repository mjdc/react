import React, {useEffect, useState} from 'react'
import { client } from '../client'
import { searchQuery, feedQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
const Search = ({searchTerm}) => {
  const [pins, setPins] = useState(null);

  useEffect(()=>{
    const query = searchTerm.length ? searchQuery(searchTerm) : feedQuery
    if(query){
      client.fetch(query)
      .then((data)=>{
        setPins(data)
      })
    }
  },[searchTerm] )
  
  return (
    <div>
      {(!pins) ? (<Spinner message="We are adding new ideas" />) :
      pins.length? 
        (<MasonryLayout pins={pins} />):
        (<h2>No Pins available</h2>)
      }
    </div>
  )
}

export default Search