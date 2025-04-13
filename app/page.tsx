import AllUser from "@/components/AllUser/AllUser";
import { fetchAllUsers } from "@/services/api";

const home = async () => {
  const allUsers = await fetchAllUsers();
  return (
    <main>
      <div className="max-w-[700px] mx-auto mt-4 sm:mt-8 mb-4 sm:mb-8 px-4">
        <h1 className="text-5xl font-bold text-white uppercase ">
          House Managment Rent
        </h1>
      </div>
      {allUsers && <AllUser allUsers={allUsers} />}
    </main>
  );
};

export default home;
