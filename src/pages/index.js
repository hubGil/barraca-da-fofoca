import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import styles from "../assets/styles/index.module.scss";
import ApiImdb from "../services/api-imdb";

export default function Home() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');

  const fetchResults = async () => {
    let result = await ApiImdb.getAutoComplete(search);
    setResults(result.d);
  }

  return (
    <>
      <Head>
        <title>Home | Barraca da Fofoca</title>
      </Head>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className={styles.title}>Barrafa da fofoca</h1>
        <div style={{ display: 'flex' }}>
          <input type={'text'} onChange={(t) => setSearch(t.target.value)} />
          <button onClick={async () => await fetchResults()}>Buscar...</button>
        </div>
        <div style={{ textAlign: 'left' }}>
          {results.filter(item => {
            return item.s.includes('Actor') || item.s.includes('Actress');
          }).map((res, k) => {
            return (
              <a key={k} href={`/fofoca/${res.id}`}>
                <div style={{ display: 'flex', padding: 10, alignItems: 'center' }}>
                  <div style={{ borderRadius: 100, width: 30, height: 30, overflow: 'hidden' }}>
                    <Image
                      src={res.i.imageUrl}
                      alt={res.l}
                      width={res.i.width}
                      height={res.i.height}
                    />
                  </div>
                  <p style={{ color: "#000" }} value={res.id}>{res.l}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
