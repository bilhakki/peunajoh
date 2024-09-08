"use server";

import { revalidatePath } from "next/cache";
import {
  createParticipant,
  deleteParticipant,
  updateParticipant,
} from "@/lib/api/participants/mutations";
import {
  ParticipantId,
  NewParticipantParams,
  UpdateParticipantParams,
  participantIdSchema,
  insertParticipantParams,
  updateParticipantParams,
} from "@/lib/db/schema/participants";
import { getParticipants } from "../api/participants/queries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateParticipants = () => {
  revalidatePath("/")
};

export const getParticipantsAction = async () => {
  return await getParticipants();
};
export const createParticipantAction = async (input: NewParticipantParams) => {
  try {
    const payload = insertParticipantParams.parse(input);
    await createParticipant(payload);
    revalidateParticipants();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateParticipantAction = async (
  input: UpdateParticipantParams
) => {
  try {
    const payload = updateParticipantParams.parse(input);
    await updateParticipant(payload.id, payload);
    revalidateParticipants();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteParticipantAction = async (input: ParticipantId) => {
  try {
    const payload = participantIdSchema.parse({ id: input });
    await deleteParticipant(payload.id);
    revalidateParticipants();
  } catch (e) {
    return handleErrors(e);
  }
};
