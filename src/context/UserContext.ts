import { createContext, useContext } from "react";
import type { UserType } from "../../lib/type";

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("This element must be used inside the UserContextProvider");
  }
  return context;
}
