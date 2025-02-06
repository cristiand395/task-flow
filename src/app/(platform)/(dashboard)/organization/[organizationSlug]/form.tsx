"use client";
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
export function Form() {

  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(create, initialState)

  return (
    <form action={dispatch}>
      <input
        id="title"
        name="title"
        placeholder="Enter a border title"
        className="border-black border p-1"
        required
      />
      <Button>Submit</Button>
    </form>
  )
}