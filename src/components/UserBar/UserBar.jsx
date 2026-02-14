import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/auth";


export default function UserBar() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (e) {
        console.log("User fetch error", e);
      }
    };

    fetchUser();

  }, []);

  if (!user) return null;

  return (
    <div className="userBar">

      <div className="userAvatar">
        {user.name?.[0]?.toUpperCase()}
      </div>

      <span className="userName">
        {user.name}
      </span>

    </div>
  );
}