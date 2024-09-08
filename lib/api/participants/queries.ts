import { db } from "@/lib/db/index";
import { desc, eq } from "drizzle-orm";
import {
  Participant,
  type ParticipantId,
  participantIdSchema,
  participants,
} from "@/lib/db/schema/participants";

export const getParticipants = async () => {
  const rows = await db
    .select()
    .from(participants)
    .orderBy(desc(participants.createdAt));
  return rows;
};

export const getParticipantById = async (
  id: ParticipantId
): Promise<Participant | undefined> => {
  const { id: participantId } = participantIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(participants)
    .where(eq(participants.id, participantId));
  if (row === undefined) return undefined;
  return row;
};
