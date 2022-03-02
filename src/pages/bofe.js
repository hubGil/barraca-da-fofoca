import styles from "./index.module.scss";
import { getSession, useSession } from "next-auth/react";
import ApiTvmaze from "../services/api-tvmaze";
import { formatDateBR } from "../helpers/formater";
import { useQuery } from "react-query";
import { useBofe } from "../services/hooks/useBofes";
import { useEffect, useState } from "react";

export default function Bofe({ famous }) {
  return (
    <>
      {famous.map((famou) => (
        <div key={famou.id}>
          <div>
            <img src={famou.image.medium} alt={`Imagem do ${famou.name}`} />
            <h1>{famou?.name}</h1>
            <div style={{ width: 300, height: "auto" }}></div>
          </div>
          <div className={styles.content}>
            <h2>Data de nascimento: {formatDateBR(famou?.birthday)}</h2>
            <h2>Local de nascimento: {famou?.country?.name}</h2>
          </div>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  const { userBofes } = session;

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const famous = await Promise.all(
    userBofes.map(async (bofe) => {
      const { data } = await ApiTvmaze.getPersonData(bofe);
      return data;
    })
  );

  return {
    props: {
      famous,
    },
  };
};
