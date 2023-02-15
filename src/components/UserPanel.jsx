import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Auth } from "../firebase/config";

const UserPanel = ({
  setNewEmail,
  newDisplayName,
  setNewDisplayName,
  handleVerify,
  handleChangeDisplayName,
  newEmail,
  handleChangeEmail,
  logout,
}) => {
  const { user } = useContext(AuthContext);

  const [showDNInput, setShowDNInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  return (
    <div className="w-full md:w-1/3 p-5">
      <div className="flex flex-col shadow-slate800Shadow h-full w-full rounded-2xl gap-10 p-5">
        <div className="w-full flex justify-center">
          <div className="border-8 rounded-full h-48 w-48 flex justify-center items-center text-5xl uppercase">
            {user.displayName[0]}
          </div>
        </div>
        {/*  */}
        {/* username row */}
        {/*  */}
        <div>
          <div className="flex gap-5 items-center">
            <p className="uppercase tracking-[5px]">username: </p>
            <p>{user.displayName}</p>
            {}
            <button
              onClick={() => setShowDNInput(!showDNInput)}
              className="text-xs trackng-[5px] text-slate-500"
            >
              {showDNInput ? "cancel" : "change"}
            </button>
          </div>

          {showDNInput && (
            <div className="py-3 flex gap-5">
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="new username"
                className="p-2 bg-slate-700 rounded-lg"
              />
              <button onClick={handleChangeDisplayName} type="submit">
                submit
              </button>
            </div>
          )}
        </div>

        {/*  */}
        {/* email row */}
        {/*  */}
        <div className="flex flex-col">
          <div className="flex gap-5">
            <p className="uppercase tracking-[5px]">email: </p>
            <p>{user.email}</p>
            <button
              className="text-xs trackng-[5px] text-slate-500"
              onClick={() => setShowEmailInput(!showEmailInput)}
            >
              {showEmailInput ? "cancel" : "change"}
            </button>
          </div>
          {showEmailInput && (
            <div className="py-3 flex gap-5">
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new email address"
                className="p-2 bg-slate-700 rounded-lg"
              />
              <button type="submit" onClick={handleChangeEmail}>
                submit
              </button>
            </div>
          )}

          <div className="w-full flex justify-between">
            {user.emailVerified ? (
              <p className="text-green-400 tracking-[5px] text-xs uppercase">
                verified
              </p>
            ) : (
              <button
                onClick={handleVerify}
                className="tracking-[5px] uppercase text-xs text-yellow-400"
              >
                verify
              </button>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full py-3 tracking-[5px] uppercase rounded-xl bg-slate-700 flex gap-5 justify-center items-center"
        >
          <FontAwesomeIcon icon={faSignOut} />
          log out
        </button>
      </div>
    </div>
  );
};
export default UserPanel;
