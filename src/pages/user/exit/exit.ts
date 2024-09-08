import { useUserStore } from "@/store/auth/use-store";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Exit: FC = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const history = useHistory();

  useEffect(() => {
    clearUser();
    history.push("/home");
    window.location.reload();
  }, [clearUser, history]);

  return null;
};

export default Exit;
