import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "slices/user.slice";
import app from "utils/firebase";

interface IAuthProps {
  children: JSX.Element;
}

const Auth: FunctionComponent<IAuthProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid: id, displayName: name, email, photoURL: image } = user;
        dispatch(
          setProfile({
            id,
            name,
            email,
            image,
          })
        );
      } else {
        dispatch(setProfile(null));
      }
    });
  }, []);
  return children;
};

export default Auth;
