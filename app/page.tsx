import AllUser from "@/components/AllUser/AllUser";
import { fetchAllUsers } from "@/services/api";

const home = async () => {
  const allUsers = await fetchAllUsers();
  return (
    <main>
      {allUsers && <AllUser allUsers={allUsers} />}
    </main>
  );
};

export default home;
