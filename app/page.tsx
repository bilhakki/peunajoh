"use client";

import { ChevronDownIcon, DownloadIcon } from "@radix-ui/react-icons";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getParticipantsAction } from "@/lib/actions/participants";
import { mkConfig } from "export-to-csv";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { columns } from "../components/table/columns";

export type TParticipant = {
  id: string;
  gender: string;
  age: number;
  job: string;
  sinceWhenKnowDiabetes: string;
  medicine: string;
  diabetesInfo: string;
  nutritionInfo: string;
  kgds: number;
};

export default function Home() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [participant, setParticipant] = useState<TParticipant[]>([]);

  async function getParticipant() {
    const data = await getParticipantsAction();
    const participant = data.map((d) => {
      const json = JSON.parse(d.data);
      return {
        id: d.id,
        gender: json[0],
        age: json[1],
        job: json[2],
        sinceWhenKnowDiabetes: json[3],
        medicine: json[4],
        diabetesInfo: json[5],
        nutritionInfo: json[6],
        kgds: json[7],
      };
    }) as TParticipant[];

    setParticipant(participant);
  }

  useEffect(() => {
    getParticipant();
  }, []);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "Data Peunajoh", // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  function exportTableToXLSX(tableData: any[], filename: string) {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Hitung panjang maksimum dari setiap kolom untuk auto-fit
    const columnWidths = Object.keys(tableData[0]).map((key, colIndex) => {
      const maxLength = Math.max(
        key.length, // Panjang header
        ...tableData.map((row) => (row[key] ? row[key].toString().length : 0)) // Panjang data di setiap baris
      );
      return { wch: maxLength + 2 }; // +2 untuk menambahkan sedikit ruang
    });

    // Terapkan pengaturan lebar kolom ke worksheet
    worksheet["!cols"] = columnWidths;

    // Ekspor file XLSX
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  const table = useReactTable({
    data: participant,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="container my-8">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <div className="ml-auto space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => {
              function reStruct(participants: any[]) {
                console.log("🚀 ~ participants:", participants);
                const datas: any[] = [];
                participants.forEach((participant) => {
                  datas.push({
                    "Jenis Kelamin": participant.gender,
                    Umur: participant.age,
                    Pekerjaan: participant.job,
                    "Mengetahui Diabetes Sejak":
                      participant.sinceWhenKnowDiabetes,
                    "Obat yang dikonsumsi": participant.medicine,
                    "Pernah Mendapat Informasi Diabetes":
                      participant.diabetesInfo,
                    "Pernah Mendapat Informasi Nutrisi dalam Diabetes":
                      participant.nutritionInfo,
                    "Nilai Kadar Gula Darah Sewaktu (KGDS)": participant.kgds,
                  });
                });

                return datas;
              }

              exportTableToXLSX(
                reStruct(
                  table.getFilteredRowModel().rows.map((row) => row.original)
                ),
                "Data Peunajoh"
              );
            }}
          >
            Export XLSX <DownloadIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
