import styles from "../index.module.scss";
import { formatDateBR } from "../../helpers/formater";
import ApiTvmaze from "../../services/api-tvmaze";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Artist({ dataFinal }) {
  const { data: session } = useSession();

  async function handleAddBofe() {
    if (!session) return;

    try {
      const response = await axios.post("/api/bofe", { bofe: dataFinal.id });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h1>Artist - {dataFinal?.name}</h1>
        <div style={{ display: "block", position: "relative" }}>
          {dataFinal?.image?.medium && (
            <img
              className={styles.noResize}
              src={dataFinal?.image?.medium}
              alt={dataFinal?.name}
            />
          )}
          {!dataFinal?.image?.medium && (
            <img
              className={styles.noResize}
              src="https://via.placeholder.com/210x295.png?text=Sem+Imagem"
              alt={dataFinal?.name}
            />
          )}
        </div>
      </div>
      <div>
        <h2>Data de nascimento: {formatDateBR(dataFinal?.birthday)}</h2>
        <h2>Local de nascimento: {dataFinal?.country?.name}</h2>
        {session && <button onClick={handleAddBofe}>+ bofe</button>}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // na grande maioria das vezes é melhor usar "blocking"
  };
}

export async function getStaticProps(context) {
  const data = await ApiTvmaze.getPersonData(context.params.id);
  const res = await data.data;
  // NextJs doesn't like numbers as ids. Converting to string fix it.
  const dataFinal = { ...res, id: JSON.stringify(res.id) };
  return {
    props: {
      dataFinal,
    }, // will be passed to the page component as props
  };
}
