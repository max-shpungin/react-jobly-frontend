import { useContext } from "react";
import userContext from "./userContext";

function ProfileForm() {
  const { user } = useContext(userContext);
  console.log("ProfileForm user:", user);

  return ("profile page");
}

export default ProfileForm;