import { UsersContextProvider } from "@/context/usersContextProvider";
import { columns } from "../ui/columns";
import { DataTable } from "../ui/data-table";
const Users = () => {
  return (
    <div className="h-full">
      <UsersContextProvider>
        <DataTable columns={columns} />
      </UsersContextProvider>
    </div>
  );
};

export default Users;
