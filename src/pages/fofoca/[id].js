import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.scss";
import ApiImdb from "../../services/api-imdb";
import { formatDateBR } from "../../helpers/formater";
import { Tabs, Tab } from "../../components/molecules/Tab";

export default function Fofoca({ famous, movies, images, news }) {
  console.log(news);
  return (
    <>
      <Head>
        <title>Home | Barraca da Fofoca</title>
      </Head>
      <div className={styles.container_title}>
        <h1>Famous - {famous?.name}</h1>
      </div>
      <div className={styles.container}>
        <div>
          <div style={{ width: 300, height: "auto" }}>
            <Image
              width={famous?.image.width}
              height={famous?.image.height}
              src={famous?.image.url}
              alt={famous?.name}
            />
          </div>
        </div>
        <div className={styles.container_tabs}>
          <Tabs>
            <Tab label={'Biografia'} className={'tab-custom-class'}>
              <h2>Data de nascimento: {formatDateBR(famous?.birthDate)}</h2>
              <h2>Local de nascimento: {famous?.birthPlace}</h2>
              <p>{famous?.miniBios[0].text}</p>
            </Tab>
            <Tab label={'Filmes'} className={'tab-custom-class'}>
              <div style={{ display: 'flex' }}>
              {movies?.map((movie, k) => {
                return (
                  <div key={k}>
                    <div style={{ width: 150, height: "auto" }}>
                      <Image
                        width={movie?.title.image.width}
                        height={movie?.title.image.height}
                        src={movie?.title.image.url}
                        alt={movie?.title.title}
                      />
                    </div>
                    <p>{movie?.title.title}</p>
                    <h5>Nota: <span>{movie?.imdbRating}</span></h5>
                  </div>
                );
              })}
              </div>
            </Tab>
            <Tab label={'Fotos'} className={'tab-custom-class'}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {images?.resource.images.filter((item, k) => {return k < 6}).map((image, k) => {
                return (
                  <div key={k}>
                    <div style={{ width: 200, height: "auto" }}>
                      <Image
                        width={image?.width}
                        height={image?.height}
                        src={image?.url}
                        alt={image?.caption}
                      />
                    </div>
                  </div>
                );
              })}
              </div>
            </Tab>
            <Tab label={'Fofocas'} className={'tab-custom-class'}>
              <div style={{ display: 'flex' }}>
              {news?.items.filter((item, k) => {return k < 2}).map((fofoca, k) => {
                return (
                  <div key={k} style={{padding: 20}}>
                    <div style={{ width: 100, height: "auto" }}>
                      <Image
                        width={fofoca?.image.width}
                        height={fofoca?.image.height}
                        src={fofoca?.image.url}
                        alt={fofoca?.head}
                      />
                    </div>
                    <h4>{fofoca?.head}</h4>
                    <p>{fofoca?.body}</p>
                    <a href={fofoca?.link} target="_blank" rel="noreferrer">Saiba mais >></a>
                  </div>
                );
              })}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const { data: famous } = await ApiImdb.getFamousInfo(id);
  const { data: movies } = await ApiImdb.getKnownFor(id);
  const { data: news } = await ApiImdb.getAllNews(id);
  const { data: images } = await ApiImdb.getAllImages(id);

  return {
    props: {
      famous,
      movies,
      news,
      images,
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
