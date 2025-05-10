import Back from "@/components/Back/Back";
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
      <Back content={_username} />
      {userInfo && <UserInfo userInfo={userInfo} username={_username} />}
    </main>
  );
};
export default page;
