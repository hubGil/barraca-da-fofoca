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
    } catch (e) {
      console.log(e);
    }
  }

export default function Fofoca({ about }) {
  return (
      <div className={styles.container}>
        <div>
          <h1>About - {about?.name}</h1>
          <div style={{ width: 300, height: "auto" }}>
            <Image
              width={about?.image.width}
              height={about?.image.height}
              src={about?.image.url}
              alt={about?.name}
            />
          </div>
        </div>
        <div className={styles.contant}>
          <h2>Data de nascimento: {formatDateBR(about?.birthDate)}</h2>
          <h2>Local de nascimento: {about?.birthPlace}</h2>
          <button>+ Bofe</button>
        </div>
      </div>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const { data: about } = await ApiImdb.getAboutInfo(id);

  return {
    props: {
      about,
      id
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