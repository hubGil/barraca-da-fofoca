import Image from "next/image";
import styles from "../index.module.scss";
import ApiImdb from "../../services/api-imdb";
import { formatDateBR } from "../../helpers/formater";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Fofoca({ famous, id }) {
  const { data: session } = useSession();

  async function addBofe() {
    if (!session) return;

    try {
      const response = await axios.post("/api/bofe", { bofe: id });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Famous - {famous?.name}</h1>
        <div style={{ width: 300, height: "auto" }}>
          <Image
            width={famous?.image.width}
            height={famous?.image.height}
            src={famous?.image.url}
            alt={famous?.name}
          />
        </div>
      </div>
      <div className={styles.contant}>
        <h2>Data de nascimento: {formatDateBR(famous?.birthDate)}</h2>
        <h2>Local de nascimento: {famous?.birthPlace}</h2>
        <button onClick={addBofe}>+ Bofe</button>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const { data: famous } = await ApiImdb.getFamousInfo(id);

  return {
    props: {
      famous,
      id,
    },
    revalidate: 60 * 60 * 24, // Update every 24 hours
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // na grande maioria das vezes é melhor usar "blocking"
  };
}
