import { ColumnDef } from "@tanstack/react-table";

import { TParticipant } from "@/app/participants/page";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import config from "@/const/config";

export const columns: ColumnDef<TParticipant>[] = [
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Umur",
    cell: ({ row }) => <div className="capitalize">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "job",
    header: "Pekerjaan",
    cell: ({ row }) => <div className="capitalize">{row.getValue("job")}</div>,
  },
  {
    accessorKey: "sinceWhenKnowDiabetes",
    header: "Mengetahui Diabetes Sejak",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sinceWhenKnowDiabetes")}</div>
    ),
  },
  {
    accessorKey: "medicine",
    header: "Obat yang dikonsumsi",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("medicine")}</div>
    ),
  },
  {
    accessorKey: "diabetesInfo",
    header: "Pernah Mendapat Informasi Diabetes",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("diabetesInfo")}</div>
    ),
  },
  {
    accessorKey: "nutritionInfo",
    header: "Pernah Mendapat Informasi Nutrisi dalam Diabetes",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nutritionInfo")}</div>
    ),
  },
  {
    accessorKey: "kgds",
    header: "Nilai Kadar Gula Darah Sewaktu (KGDS)",
    cell: ({ row }) => <div className="capitalize">{row.getValue("kgds")}</div>,
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <CaretSortIcon className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const participant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                const confirmation = confirm(
                  "Are you sure you want to delete?"
                );
                if (confirmation) {
                  console.log("participant.id", participant);
                  try {
                    await fetch(
                      `${config.PUBLIC_API_URL}/api/participants`,
                      {
                        method: "DELETE",
                        body: JSON.stringify({
                          id: participant.id,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    location.reload();
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              Delete
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
