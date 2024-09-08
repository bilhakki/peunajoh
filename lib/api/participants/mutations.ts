import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
  ParticipantId,
  NewParticipantParams,
  UpdateParticipantParams,
  updateParticipantSchema,
  insertParticipantSchema,
  participants,
  participantIdSchema,
} from "@/lib/db/schema/participants";
import { getParticipantById } from "./queries";

export const createParticipant = async (participant: NewParticipantParams) => {
  const newParticipant = insertParticipantSchema.parse(participant);
  try {
    const participantExists = await getParticipantById(participant.visitorId);
    if (participantExists === undefined) {
      await db.insert(participants).values(newParticipant);
    } else {
      await db
        .update(participants)
        .set({ data: newParticipant.data, updatedAt: new Date() })
        .where(eq(participants.id, participantExists.id));
    }
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateParticipant = async (
  id: ParticipantId,
  participant: UpdateParticipantParams
) => {
  const { id: participantId } = participantIdSchema.parse({ id });
  const newParticipant = updateParticipantSchema.parse(participant);
  try {
    await db
      .update(participants)
      .set({ ...newParticipant, updatedAt: new Date() })
      .where(eq(participants.id, participantId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteParticipant = async (id: ParticipantId) => {
  const { id: participantId } = participantIdSchema.parse({ id });
  try {
    await db.delete(participants).where(eq(participants.id, participantId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
