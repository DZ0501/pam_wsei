import { useEffect, useState } from "react";
import { User, getUsers } from "./requests";

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>();

  useEffect(()=>{
    getUsers().then((data) => setUsers(data));
  }, []);

  return users;
}
