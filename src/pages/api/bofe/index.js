import { Append, query as q } from "faunadb";
import { getSession } from "next-auth/react";
import { faunaDBClient } from "../../../services/faunaDB";

const bofe = async (req, res) => {
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
    return res.status(200).json({ message: "suss" });
  }

  if (req.method === "DELETE") {
    const session = await getSession({ req });
    const { userBofes } = session;

    const bofeIndex = userBofes.indexOf(req.body.bofe);
    userBofes.splice(bofeIndex, 1);

    try {
      await faunaDBClient.query(
        q.Update(q.Ref(q.Collection("users"), session.userId), {
          data: {
            bofes: userBofes,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
    return res.status(200).json({ message: "suss" });
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default bofe;
