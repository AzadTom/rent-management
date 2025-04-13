import { IAllUsers } from "@/types/types";
import Link from "next/link";
const AllUser = ({ allUsers }: { allUsers: IAllUsers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 mx-4 mt-8 mb-4">
      {allUsers &&
        allUsers.data.map((item) => <UserCard key={item.id} {...item} />)}
    </div>
  );
};

export default AllUser;

const UserCard = ({ id, name }: { id: number; name: string }) => {
  const image =
    "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJlYXV0aWZ1bCUyMGhvdXNlfGVufDB8fDB8fHww";
  return (
    <div
      key={id}
      className="bg-white drop-shadow-lg p-4 rounded-2xl text-center"
    >
      <div className="relative">
        <img
          src={image}
          alt="image"
          width={300}
          height={300}
          className="w-full h-full rounded-2xl"
        />
      </div>
      <h2 className="text-2xl font-bold capitalize my-4 text-[var(--primaryColor))]">
        {name}
      </h2>
      <Link href={"/userinfo/" + name.split(" ").join("-").toLowerCase()}>
        <button
          className="border border-[var(--primaryColor))] cursor-pointer rounded-full text-[var(--primaryColor))] px-12 py-4  capitalize
          text-[16px] font-semibold"
        >
          View Info
        </button>
      </Link>
    </div>
  );
};
