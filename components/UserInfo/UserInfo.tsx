import { IUserInfo, IUserResponse } from "@/types/types";
import InsertUserInfo from "./InsertUserInfo";
import UpdateUserInfo from "./UpdateUserInfo";
import UserInfoWrapper from "./UserInfoWrapper";


const UserInfo = ({
  userInfo,
  username,
}: {
  userInfo: IUserResponse;
  username: string;
}) => {
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 mx-4 mt-8 mb-4">
      {userInfo.data.map((item) => (
        <InfoCard key={item.serial} {...item} username={username} />
      ))}
      <InsertUserInfo username={username} />
    </div>
  );
};

export default UserInfo;

const InfoCard = (props: IUserInfo & { username: string }) => {

  const {
    username,
    serial,
    payment,
    rent,
    previous_month_bijli_unit,
    current_month_bijli_unit,
    bijli_unit_price,
    waterbill,
    due,
    month,
    year,
  } = props;

  const _bijli_unit = Number(current_month_bijli_unit) - Number(previous_month_bijli_unit);
  const _totalBijliBill = Number(_bijli_unit) * Number(bijli_unit_price);
  const _totalRent = Number(rent) + Number(waterbill) + Number(_totalBijliBill) + Number(due);
  const _nowDue = Number(_totalRent) - Number(payment);




  return (
    <div>
      <div className="bg-white text-black rounded-xl p-5 mb-4 text-base">
        <p className="flex justify-between">
          <span>Previous Bijli Unit:</span>
          <span className="font-bold">{previous_month_bijli_unit}</span>
        </p>
        <p className="flex justify-between">
          <span>Current Bijli Unit:</span>
          <span className="font-bold">{current_month_bijli_unit}</span>
        </p>
      </div>
      <UserInfoWrapper serial={serial} username={username}>
        <div
          key={serial}
          className="bg-white p-5 rounded-xl text-black shadow-md max-w-md mx-auto font-medium space-y-1"
        >
          <p className="flex justify-between">
            <span className="bg-black p-2 text-white rounded-full px-2 py-1 text-xs">show no.{serial}</span>
            <span><UpdateUserInfo {...props} /></span>
          </p>
          <h2 className="text-center text-2xl font-bold mb-4">
            {username}, {month} {year}
          </h2>

          <div className="text-base space-y-1">
            <p className="flex justify-between">
              <span>Rent:</span>
              <span>₹{rent}</span>
            </p>
            {waterbill ? (
              <p className="flex justify-between">
                <span>Water Bill:</span>
                <span>₹{waterbill}</span>
              </p>
            ) : (null)}
            {bijli_unit_price ? (
              <p className="flex justify-between">
                <span>Bijli Unit:</span>
                <span>
                  {_bijli_unit} × ₹{bijli_unit_price} = ₹{_totalBijliBill}
                </span>
              </p>
            ) : (null)}
            {due ? (
              <p className="flex justify-between">
                <span>Previous Due:</span>
                <span>₹{due}</span>
              </p>
            ) : (null)}

            <hr className="my-2" />

            <p className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{_totalRent}</span>
            </p>
            {payment ? (
              <p className="flex justify-between text-green-700">
                <span>Payment:</span>
                <span>₹{payment}</span>
              </p>
            ) : null}
            {payment ? (
              <p className="flex justify-between text-red-600 font-bold text-lg">
                <span>Now Due:</span>
                <span>₹{_nowDue}</span>
              </p>
            ) : null}
          </div>
        </div>
      </UserInfoWrapper>
    </div>
  );
};
