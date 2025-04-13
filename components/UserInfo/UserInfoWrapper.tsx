'use client';

import { useLongPress } from '@uidotdev/usehooks';
import React, { ReactNode, useState } from 'react'
import ShowModel from '../Dialog/ShowModel';
import { deleteFromGoogleSheet } from '@/services/api';
import { useRouter } from 'next/navigation';

const UserInfoWrapper = ({ children, serial, username }: { serial: number, children: ReactNode, username: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();
  const attrs = useLongPress(
    () => {
      setIsOpen(true);
    },
    {
      threshold: 500,
    }
  );

  const handleComfirm = () => {

    setIsloading(true);
    deleteFromGoogleSheet(username, {
      delete: true,
      serial: serial
    }).then((res) => {
      if (res?.ok) {
        setIsloading(false);
        setIsOpen(false);
        router.refresh();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      {isOpen && (
        <ShowModel
          bg="rgba(0,0,0,0.1)"
          onClick={() => setIsOpen(true)}
          show={true}
        >
          <div className="w-[320px] bg-white rounded-xl flex flex-col gap-2 px-6 py-6" onClick={(e) => e.stopPropagation()}>
            <h2 className='text-black font-semibold capitalize'>Want to remove this rent info?</h2>
            <button className='text-black text-[16px] px-4 py-4  rounded-full uppercase font-semibold' onClick={() => setIsOpen(false)}>Discard</button>
            <button className='text-white text-[16px] bg-black px-4 py-4 rounded-full uppercase font-semibold' onClick={() => handleComfirm()}>{isloading ? (<div className="w-full flex justify-center items-center  bg-black rounded-full">
              <div
                className="animate-spin  size-6 border-3 border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              ></div>
            </div>) : "Comfirm"}</button>
          </div>
        </ShowModel>
      )}
      <div {...attrs}>
        {children}
      </div>
    </>

  )
}

export default UserInfoWrapper