import axios from "axios";
import { useEffect, useState } from "react";

const AutoComplete = () => {
  const [users, setusers] = useState<any>(null);
  const [gotUser, setgotUser] = useState<boolean>(false);
  const [userName, setuserName] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();

    if(inputValue === userName){
      setuserName(e.target.value);
      return;
    }
    
      setgotUser(false);
      setuserName(e.target.value);
    
  };

  const fetchUsers = () => {
    axios
      .get("https://dummyjson.com/users?limit=208")
      .then((result) => {
        console.log(result.data.users);
        setusers(result.data.users);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-screen h-screen bg-teal-500 flex justify-center items-center">
      <div className="w-10/12 h-fit flex flex-col gap-4 ">

       <h1 className="text-5xl font-bold text-white mx-auto mb-10">Search AutoComplete</h1>

        <input
          type="text"
          placeholder="Enter UserName..."
          className="px-3 py-2 text-white placeholder:text-white bg-emerald-600 w-[40%] mx-auto"
          value={userName}
          onChange={changeHandler}
        />

        <div className="flex flex-wrap gap-1 h-[70%] ">
        {users?.length &&
          !gotUser &&
          userName.length &&
          users
            .filter(
              (user: any) =>
                userName.toLowerCase() === user.firstName.substring(0, userName.length).toLowerCase()
            )
            .map((filteredUser: any, index: number) => (
              <div
                key={filteredUser.id}
                className={`px-3 py-2 w-[40%] mx-auto rounded-md ${
                  index % 2 === 0 ? "bg-slate-200 " : "bg-slate-400"
                } text-center cursor-pointer hover:scale-105 hover:shadow-lg `}
                onClick={() => {
                  setuserName(filteredUser.firstName);
                  setgotUser(true);
                }}
              >
                {filteredUser.firstName}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
