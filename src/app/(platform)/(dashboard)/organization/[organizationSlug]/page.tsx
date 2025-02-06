
import { db } from "@/lib/db";
import { Form } from "./form";
import { Board } from "./board";

export default async function OrganizationPage() {

  const boards = await db.board.findMany()

  return (
    <div>
      <Form />
      {
        boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))
      }
    </div>
  );
}