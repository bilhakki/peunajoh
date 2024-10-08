"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import tentangSaya, { Question } from "@/const/tentang-saya";
import { useFingerprint } from "@/hooks/useFingerprint";
import { usePage } from "@/hooks/usePage";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import config from "@/const/config";

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
  const visitorId = useFingerprint((state) => state.visitorId);

  const [form, setForm] = useState<(string | null)[]>(defaultFormValues);
  const [debouncedForm] = useDebounce(form, 1000);

  useEffect(() => {
    const tetangSayaLS = localStorage.getItem("tentang-saya");
    if (tetangSayaLS) {
      setForm(JSON.parse(tetangSayaLS));
    }
  }, []);

  function onFormChange(newValue: string, index: number) {
    const newForm = [...form];
    newForm[index] = newValue;
    localStorage.setItem("tentang-saya", JSON.stringify(newForm));
    setForm(newForm);
  }

  useEffect(() => {
    if (debouncedForm) {
      updateDatabaseData({ data: debouncedForm });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedForm]);

  async function updateDatabaseData({ data }: { data: (string | null)[] }) {
    if (visitorId) {
      await fetch(`${config.PUBLIC_API_URL}/api/participants`, {
        method: "POST",
        body: JSON.stringify({
          id: visitorId,
          visitorId: visitorId,
          data: JSON.stringify(data),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 pb-0">
      <div className="bg-white flex-1 rounded-lg text-sm p-4 pb-0 overflow-y-auto">
        <ol className="list-decimal pl-4 space-y-4 pb-6">
          {tentangSaya.map((item, index) => {
            const elKey = `input-${index}`;
            return (
              <li key={elKey}>
                <GetForm
                  item={item}
                  elKey={elKey}
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
  elKey,
  index,
  defaultValue,
  onFormChange,
}: {
  item: Question;
  elKey: string;
  index: number;
  defaultValue: string | null;
  onFormChange: (newValue: string, index: number) => void;
}) {
  if (item.inputType === "number" || item.inputType === "string") {
    return (
      <>
        <Label htmlFor={elKey}>{item.question}</Label>
        <Input
          className="border-neutral-500"
          type={item.inputType}
          id={elKey}
          onChange={(e) => onFormChange(e.target.value, index)}
          defaultValue={defaultValue || item.defaultValue}
        />
      </>
    );
  } else if (item.inputType === "option") {
    return (
      <>
        <Label htmlFor={elKey}>{item.question}</Label>
        <Select onValueChange={(value) => onFormChange(value, index)}>
          <SelectTrigger id={elKey}>
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
