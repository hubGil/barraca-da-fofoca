import Head from "next/head";
import styles from "../index.module.scss";
import { formatDateBR } from "../../helpers/formater";
import ApiTvmaze from "../../services/api-tvmaze";


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
  const dataFinal = {...res, id : JSON.stringify(res.id)};
  return {
    props: {
      dataFinal,
    }, // will be passed to the page component as props
  }
}


export default function Artist( {dataFinal} ) {
  return (
    <>
      <Head>
        <title>Home | Barraca da Fofoca</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.column}>
          <h1>Artist - {dataFinal?.name}</h1>
          <div style={{ display: "block", position: "relative" }}>
            <img
              className={styles.noResize}
              src={dataFinal?.image.medium}
              alt={dataFinal?.name}
            />
          </div>
        </div>
        <div>
          <h2>Data de nascimento: {formatDateBR(dataFinal?.birthday)}</h2>
          <h2>Local de nascimento: {dataFinal?.country?.name}</h2>
        </div>
      </div>
    </>
  );
}
