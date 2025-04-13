import UserInfo from "@/components/UserInfo/UserInfo";
import { getAllDataByUser } from "@/services/api";

type Props = {
  params: Promise<{username:string}>;
};

const page = async ({ params }: Props) => {
  const { username } = await params;
  const _username = username
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const userInfo = await getAllDataByUser(_username);
  return (
    <main>
      <h1 className="text-2xl font-bold mx-4 mt-4">{_username}</h1>
      {userInfo && <UserInfo userInfo={userInfo} username={_username} />}
    </main>
  );
};
export default page;
