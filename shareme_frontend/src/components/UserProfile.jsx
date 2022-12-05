import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none shadow-md'
const notActiveBtnStyles = 'bg-primary text-black font-bold p-2 rounded-full w-20 outline-none shadow-md'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('Created')
  const navigate = useNavigate()
  const { userId } = useParams()
  
  useEffect(() => {
    const query = userQuery(userId)

    client
      .fetch(query)
      .then((data)=>{
        setUser(data[0])
      })
  }, [userId])
  
  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client
        .fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client
        .fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        });
    }
  }, [text, userId]);
  
  const handleLogout =()=>{
    googleLogout()
    localStorage.setItem('user', '{}');
    navigate('/login')
  }

  if(!user){
    return <Spinner message={'Loading Profile...'}/>
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} alt="banner-picture" className='w-full h-370 xl:h-510 shadow-lg object-cover' />
            <img src={user?.image} alt="user-pic" className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'/>
            <h2 className='font-bold text-3xl text-center mt-3'>
              {user?.userName}
            </h2>
            <div className='absolute top-0 z-1 right-1'>
              { userId === user._id && (
                <button 
                  className=' bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={handleLogout}
                >
                  <AiOutlineLogout color='red' fontSize={21}/>
                </button>
              )}
            </div>
          </div>
          <div className='text-center mb-7 mt-3 gap-4 flex justify-center'>
            <div>
              <button
                type='button'
                onClick={()=>{
                  setText('Created')
                  setActiveBtn('Created')
                }}
                className={`${ activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles }`}
              >
                Created
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={()=>{
                  setText('Saved')
                  setActiveBtn('Saved')
                }}
                className={`${ activeBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles }`}
              >
                Saved
              </button>
            </div>
          </div>
            <div className='px-2'>
              {pins && (
                <MasonryLayout pins={pins}/>
              )}
              {!pins && (
                <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
                  {text === 'Created' ? 'Go and create a pin!' : 'Go and save some pins!'}
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile