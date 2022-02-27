import { Append, query as q } from "faunadb";
import { getSession } from "next-auth/react";
import { faunaDBClient } from "../../../services/faunaDB";

const teste = async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    try {
      await faunaDBClient.query(
        q.Update(q.Ref(q.Collection("users"), session.userId), {
          data: { bofes: Append([req.body.bofe], session.userBofes) },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  return res.status(200).json({ message: "suss" });
};

export default teste;
