"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import tentangSaya, { Question } from "@/const/tentang-saya";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import { usePage } from "@/hooks/usePage";

const defaultFormValues: (string | null)[] = [
  "Laki-laki",
  null,
  "Tidak bekerja",
  "Kurang dari 5 tahun",
  "Tidak minum obat",
  "Pernah",
  "Pernah",
  "0",
];

export default function TentangSaya() {
  const { setPage } = usePage((state) => state);

  const tetangSayaLS = localStorage.getItem("tentang-saya");

  const [form, setForm] = useState<(string | null)[]>(
    tetangSayaLS ? JSON.parse(tetangSayaLS) : defaultFormValues
  );

  function onFormChange(newValue: string, index: number) {
    const newForm = [...form];
    newForm[index] = newValue;
    localStorage.setItem("tentang-saya", JSON.stringify(newForm));
    setForm(newForm);
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 pb-0">
      <div className="bg-white flex-1 rounded-lg text-sm p-4 pb-0 overflow-y-auto">
        <ol className="list-decimal pl-4 space-y-4 pb-6">
          {tentangSaya.map((item, index) => {
            const key = `input-${index}`;
            return (
              <li key={key}>
                <GetForm
                  item={item}
                  key={key}
                  index={index}
                  onFormChange={onFormChange}
                  defaultValue={form[index]}
                />
              </li>
            );
          })}
        </ol>
      </div>

      {form.every((item) => item !== null) && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button onClick={() => setPage("home")}>SELESAI</Button>
        </div>
      )}
    </div>
  );
}

function GetForm({
  item,
  key,
  index,
  defaultValue,
  onFormChange,
}: {
  item: Question;
  key: string;
  index: number;
  defaultValue: string | null;
  onFormChange: (newValue: string, index: number) => void;
}) {
  if (item.inputType === "number" || item.inputType === "string") {
    return (
      <>
        <Label htmlFor={key}>{item.question}</Label>
        <Input
          className="border-neutral-500"
          type={item.inputType}
          id={key}
          onChange={(e) => onFormChange(e.target.value, index)}
          defaultValue={defaultValue || item.defaultValue}
        />
      </>
    );
  } else if (item.inputType === "option") {
    return (
      <>
        <Label htmlFor={key}>{item.question}</Label>
        <Select onValueChange={(value) => onFormChange(value, index)}>
          <SelectTrigger id={key}>
            <SelectValue
              placeholder={item.options.filter((item) => item === defaultValue)}
            />
          </SelectTrigger>
          <SelectContent>
            {item.options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    );
  }
}
