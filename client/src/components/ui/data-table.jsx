"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useUsersContext } from "@/hooks/useUsersContext";

export function DataTable({ columns }) {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const {
    users: data,
    loading,
    handleBlockedUsers,
    handleUnblockedUsers,
    handleDeletedUsers,
    selectedUsers,
    setSelectedUsers,
  } = useUsersContext();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    setSelectedUsers(
      table.getSelectedRowModel().rows.map((el) => el.original.id)
    );
  }, [table.getSelectedRowModel().rows]);

  const block = async () => {
    await handleBlockedUsers();
    setRowSelection({});
  };

  const unblock = async () => {
    await handleUnblockedUsers();
    setRowSelection({});
  };

  const remove = async () => {
    await handleDeletedUsers();
    setRowSelection({});
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between my-2">
        <div className="flex items-center space-x-2 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="text-white bg-indigo-500 hover:bg-indigo-400"
                  onClick={block}
                  disabled={!selectedUsers.length}
                >
                  <Icon icon="lucide:lock" />
                  Block
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Block</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="text-white bg-indigo-500 hover:bg-indigo-400"
                  onClick={unblock}
                  disabled={!selectedUsers.length}
                >
                  <Icon icon="lucide:lock-open" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Unblock</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="text-white bg-red-500 hover:bg-red-400"
                  disabled={!selectedUsers.length}
                  onClick={remove}
                >
                  <Icon icon="lucide:trash" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mt-2 sm:mt-0"
        />
      </div>
      <div className="border border-solid rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <Icon
                      icon="lucide:loader-2"
                      className="animate-spin text-indigo-400"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length && !loading ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex-1 text-sm text-muted-foreground text-end m-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
