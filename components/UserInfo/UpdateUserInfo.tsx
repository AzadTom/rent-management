'use client';

import React, { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import ShowModel from '../Dialog/ShowModel';
import { IUserInfo } from '@/types/types';
import { getAllQuestionsInUpdate, getMonthandYear } from '@/utils/utils';
import { sendToGoogleSheet } from '@/services/api';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const UpdateUserInfo = (props: IUserInfo & { username: string }) => {

   const {username}= props; 
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
     {openDialog && (
        <ShowModel
          bg="rgba(0,0,0,0.1)"
          onClick={() => setOpenDialog(true)}
          show={true}
        >
          <div className="w-[320px]">
            <FormContainer
              username={username}
              handleDialog={() => setOpenDialog(false)}
              initialData={props}
            />
          </div>
        </ShowModel>
      )}
        <span onClick={()=> setOpenDialog(true)}>
        <FiEdit/>
        </span>
    </>
  )
}

export default UpdateUserInfo

const FormContainer = ({
  username,
  handleDialog,
  initialData,
}: {
  username: string;
  handleDialog: () => void;
  initialData:IUserInfo & { username: string };
}) => {

  const router = useRouter();
  const _allquestions = getAllQuestionsInUpdate();
  const { month, year } = getMonthandYear();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isloading, setIsloading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    serial: initialData.serial || 0,
    payment: initialData.payment ||0,
    rent: initialData.rent ||0,
    water_bill: initialData.waterbill || 0,
    previous_month_bijli_unit: initialData.previous_month_bijli_unit || 0,
    current_month_bijli_unit: initialData.current_month_bijli_unit || 0,
    bijli_unit_price: initialData.bijli_unit_price ||0,
    due_rent: initialData.due ||0,
    month: initialData.month || "",
    year:initialData.year || 0,
  });

  const handleResponse = (input: string) => {
    if (currentIndex === _allquestions.length - 1) {
      setIsloading(true);
      sendToGoogleSheet(username, {
        serial: userInfo.serial,
        payment: userInfo.payment,
        rent: userInfo.rent,
        waterbill: userInfo.water_bill,
        previous_month_bijli_unit: userInfo.previous_month_bijli_unit,
        current_month_bijli_unit: userInfo.current_month_bijli_unit,
        bijli_unit:
          Number(userInfo.current_month_bijli_unit) -
          Number(userInfo.previous_month_bijli_unit),
        bijli_unit_price: userInfo.bijli_unit_price,
        due: userInfo.due_rent,
        month: userInfo.month,
        year: Number(input),
      })
        .then((res) => {
          if (res?.ok) {
            setIsloading(false);
            handleDialog();
            router.refresh();
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log(userInfo);
          console.log(input);
        });
    } else {
      if (currentIndex === 0) {
        setUserInfo((prev) => ({
          ...prev,
          serial: Number(input),
        }));
      }

      if (currentIndex === 1) {
        setUserInfo((prev) => ({
          ...prev,
          payment: Number(input),
        }));
      }

      if (currentIndex === 2) {
        setUserInfo((prev) => ({
          ...prev,
          rent: Number(input),
        }));
      }

      if (currentIndex === 3) {
        setUserInfo((prev) => ({
          ...prev,
          water_bill: Number(input),
        }));
      }

      if (currentIndex === 4) {
        setUserInfo((prev) => ({
          ...prev,
          previous_month_bijli_unit: Number(input),
        }));
      }

      if (currentIndex === 5) {
        setUserInfo((prev) => ({
          ...prev,
          current_month_bijli_unit: Number(input),
        }));
      }

      if (currentIndex === 6) {
        setUserInfo((prev) => ({
          ...prev,
          bijli_unit_price: Number(input),
        }));
      }

      if (currentIndex === 7) {
        setUserInfo((prev) => ({
          ...prev,
          due_rent: Number(input),
        }));
      }
      if (currentIndex === 8) {
        setUserInfo((prev) => ({
          ...prev,
          month: input,
        }));
      }

      if (currentIndex === 9) {
        setUserInfo((prev) => ({
          ...prev,
          year: Number(input),
        }));
      }

      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl text-black">
      <div className="relative flex justify-center items-center mb-4">
        <span
          className="absolute left-0"
          onClick={() => setCurrentIndex((prev) => prev === 0 ? prev:prev-1)}
        >
          <MdOutlineArrowBackIos />
        </span>
        <span className="text-[18px]">Rent Details for This Month</span>
      </div>
      {_allquestions[currentIndex] && (
        <ShowInput
          key={currentIndex}
          question={_allquestions[currentIndex]}
          currentIndex={currentIndex}
          handleResponse={handleResponse}
          responseQuestion={Object.values(userInfo)[currentIndex].toString()}
          isLast={currentIndex === _allquestions.length - 1 ? true : false}
          isloading={isloading}
        />
      )}
    </div>
  );
};

const ShowInput = ({
  question,
  handleResponse,
  currentIndex,
  isLast,
  responseQuestion,
  isloading,
}: {
  question: string;
  handleResponse: (input: string) => void;
  currentIndex: number;
  isLast: boolean;
  responseQuestion: string;
  isloading: boolean;
}) => {
  const [input, setInput] = useState<string>(
    responseQuestion ? (responseQuestion === "0" ? "" : responseQuestion) : "",
  );
  return (
    <div className="w-full">
      <div className="text-black flex flex-col gap-4">
        <label className="text-[16px]">
          0{currentIndex + 1}.{question}
        </label>
        <input
          type="text"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full outline-none  px-4 py-2 rounded-xl border border-slate-400"
          placeholder={question}
        />
      </div>
      {isloading ? (
        <div className="w-full flex justify-center items-center  bg-teal-600 rounded-full px-4 py-2 mt-4">
          <div
            className="animate-spin  size-6 border-3 border-current border-t-transparent text-white rounded-full"
            role="status"
            aria-label="loading"
          ></div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2 justify-between items-center">
          <button
            onClick={() => handleResponse(input)}
            className="flex-1 border border-[#c4c4c4] rounded-full px-4 py-2"
          >
            SKIP
          </button>
          <button
            disabled={input ? false : true}
            onClick={() => handleResponse(input)}
            className={`flex-1 cursor-pointer font-semibold w-full text-white rounded-full px-4 py-2 ${input ? "bg-teal-600" : "bg-[#c4c4c4]"}`}
          >
            {isLast ? "SUBMIT" : "NEXT"}
          </button>
        </div>
      )}
    </div>
  );
};