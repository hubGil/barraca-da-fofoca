import styles from "../index.module.scss";
import { formatDateBR } from "../../helpers/formater";
import { getSession, useSession } from "next-auth/react";
import ApiTvmaze from "../../services/api-tvmaze";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Artist({ dataFinal, btnVisibility }) {
  const [btnView, setBtnView] = useState(btnVisibility);

  const { data: session } = useSession();

  async function handleAddBofe() {
    if (!session) return;
    try {
      await axios.post("/api/bofe", { bofe: dataFinal.id });
      setBtnView(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveBofe() {
    if (!session) return;
    try {
      await axios.delete("/api/bofe", { data: { bofe: dataFinal.id } });
      setBtnView(true);
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
      <div className={styles.content}>
        <h2>Data de nascimento: {formatDateBR(dataFinal?.birthday)}</h2>
        <h2>Local de nascimento: {dataFinal?.country?.name}</h2>
        {session && btnView && <button onClick={handleAddBofe}>AddBofe</button>}

        {session && !btnView && (
          <button onClick={handleRemoveBofe}>RemoveBofe</button>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });

  const data = await ApiTvmaze.getPersonData(params.id);
  const res = await data.data;
  // NextJs doesn't like numbers as ids. Converting to string fix it.
  const dataFinal = { ...res, id: JSON.stringify(res.id) };

  const btnVisibility =
    session && !session?.userBofes.find((bofe) => bofe === dataFinal.id);

  return {
    props: {
      dataFinal,
      btnVisibility,
    }, // will be passed to the page component as props
  };
}
