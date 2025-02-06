"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type State = {
  message?: string | null;
  errors?: {
    title?: string[]
  },
}

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Min 3 letters"
  })
})

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error?.flatten().fieldErrors,
      message: "Missing fields"
    }
  }

  const { title } = validatedFields.data

  try {
    await db.board.create({
      data: {
        title,
      }
    })

  } catch (error) {
    return {
      message: `Data Error: ${error}`
    }
  }

  revalidatePath("/organization/another-organization")
  redirect("/organization/another-organization")
}