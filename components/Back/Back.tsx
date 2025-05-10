'use client';
import { useRouter } from "next/navigation";
import { IoChevronBackSharp } from "react-icons/io5";

const Back = ({ content }: { content: string }) => {

    const router = useRouter();
    return (
        <div className="mx-4 flex gap-2 items-center text-xl font-bold  mt-4 uppercase" onClick={() => router.back()}>
            <IoChevronBackSharp />
            <h2>{content}</h2>
        </div>
    )
}

export default Back