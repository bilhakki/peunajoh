import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createParticipant,
  deleteParticipant,
  updateParticipant,
} from "@/lib/api/participants/mutations";
import {
  participantIdSchema,
  insertParticipantParams,
  updateParticipantParams,
} from "@/lib/db/schema/participants";
import { getParticipants } from "@/lib/api/participants/queries";

const revalidateParticipants = () => {
  revalidatePath("/");
  revalidatePath("/participants");
};

export async function GET() {
  const participants = await getParticipants();
  return NextResponse.json(participants);
}

export async function POST(req: Request) {
  try {
    const validatedData = await req.json();
    const { success } = await createParticipant(validatedData);

    revalidatePath("/"); // optional - assumes you will have named route same as entity

    return NextResponse.json(success, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateParticipantParams.parse(await req.json());
    const validatedParams = participantIdSchema.parse({ id });

    const { success } = await updateParticipant(
      validatedParams.id,
      validatedData
    );

    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const request = await req.json();
    const id = request.id;
    const { success } = await deleteParticipant(id || "");
    revalidateParticipants();
    return NextResponse.json(success, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
