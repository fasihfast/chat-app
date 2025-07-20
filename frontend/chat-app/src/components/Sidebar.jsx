import { useEffect, useState } from "react";
import { useChathook } from "../hooks/useChathook";
import  useAuthhook  from "../hooks/useAuthhook";
import SidebarSkeleton from "./skeleton/SidebarSkele";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUserForSideBar, users, selectedUser,setSelectedUser , isUsersLoading } = useChathook();

  const { onlineUsers,authUser } = useAuthhook();
const [showOnlineOnly, setShowOnlineOnly] = useState(false);


  useEffect(() => {
    getUserForSideBar();
  }, [getUserForSideBar]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

  <div className="overflow-y-auto w-full py-3">
  {filteredUsers
    .filter((user) => {
      const agentNames = ["Technical Support", "Pre-Sales Consultation", "Sales And Billing"];
      const isCurrentUserAgent = agentNames.includes(authUser.fullName);

      if (isCurrentUserAgent) {
        // Show only non-agents and not yourself
        return !agentNames.includes(user.fullName) && user._id !== authUser._id;
      } else {
        // Normal user: show only agents
        return agentNames.includes(user.fullName);
      }
    })
    .map((user) => (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
          selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
        }`}
      >
        <div className="relative mx-auto lg:mx-0">
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.fullName}
            className="size-12 object-cover rounded-full"
          />
          {onlineUsers.includes(user._id) && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold text-left">{user.fullName}</p>
          <p className="text-xs text-zinc-500 truncate max-w-[150px]">
            {user.email}
          </p>
        </div>
      </button>
    ))}
</div>


    </aside>
  );
};
export default Sidebar;


