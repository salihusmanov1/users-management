import { useEffect, useState } from "react";
import { UsersContext } from "./usersContext";
import { getUsers, blockUsers, unblockUsers, deleteUsers } from "@/http/users";
import { useLogout } from "@/hooks/useLogout";
import { useToast } from "@/hooks/use-toast";

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { logout } = useLogout();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await getUsers();
        setUsers(data.users);
      } catch (err) {
        err.response?.status === 403 && logout();
        toast({
          description: err.response?.data?.message || "Something went wrong",
          type: "alert",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockedUsers = async () => {
    setLoading(true);

    try {
      await blockUsers({ ids: selectedUsers });
      toast({
        description: "Users have been successfully blocked",
        type: "success",
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, is_blocked: 1 } : user
        )
      );
    } catch (err) {
      err.response?.status === 403 && logout();
      toast({
        description: err.response?.data?.message || "Something went wrong",
        type: "alert",
      });
    } finally {
      setLoading(false);
    }
    setSelectedUsers([]);
  };

  const handleUnblockedUsers = async () => {
    setLoading(true);
    try {
      await unblockUsers({ ids: selectedUsers });
      toast({
        description: "Users have been successfully unblocked",
        type: "success",
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, is_blocked: 0 } : user
        )
      );
    } catch (err) {
      err.response?.status === 403 && logout();
      toast({
        description: err.response?.data?.message || "Something went wrong",
        type: "alert",
      });
    } finally {
      setLoading(false);
    }
    setSelectedUsers([]);
  };

  const handleDeletedUsers = async () => {
    setLoading(true);
    try {
      await deleteUsers({ ids: selectedUsers });
      toast({
        description: "Users have been successfully deleted",
        type: "success",
      });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user.id))
      );
    } catch (err) {
      err.response?.status === 403 && logout();
      toast({
        description: err.response?.data?.message || "Something went wrong",
        type: "alert",
      });
    } finally {
      setLoading(false);
    }
    setSelectedUsers([]);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        handleBlockedUsers,
        handleUnblockedUsers,
        handleDeletedUsers,
        loading,
        setUsers,
        selectedUsers,
        setSelectedUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
