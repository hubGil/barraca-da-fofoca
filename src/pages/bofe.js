import Fofoca from "./fofoca/[id]";
import styles from "./index.module.scss";
import { faunaDBClient } from "../services/faunaDB";
import { query as q } from "faunadb";
import { getSession } from "next-auth/react";
import apiImdb from "../services/api-imdb";
import { formatDateBR } from "../helpers/formater";
import Image from "next/image";

export default function Bofe({ famous }) {
  return (
    <>
      {famous.map((famou) => (
        <div key={famou.id}>
          <div>
            <h1>Famous - {famou?.name}</h1>
            <div style={{ width: 300, height: "auto" }}>
              <Image
                width={famou?.image.width}
                height={famou?.image.height}
                src={famou?.image.url}
                alt={famou?.name}
              />
            </div>
          </div>
          <div className={styles.contant}>
            <h2>Data de nascimento: {formatDateBR(famou?.birthDate)}</h2>
            <h2>Local de nascimento: {famou?.birthPlace}</h2>
          </div>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await faunaDBClient.query(
    q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
  );

  const famous = await Promise.all(
    user.data.bofes.map(async (bofe) => {
      const { data } = await apiImdb.getFamousInfo(bofe);
      return data;
    })
  );

  return {
    props: {
      famous,
    },
  };
};
