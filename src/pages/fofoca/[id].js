import Head from "next/head";
import Image from "next/image";
import styles from "../index.module.scss";
import ApiImdb from "../../services/api-imdb";
import { formatDateBR } from "../../helpers/formater";

export default function Fofoca({ famous }) {
    console.log(famous);

    return (
        <><Head>
            <title>Home | Barraca da Fofoca</title>
        </Head>
            <div className={styles.container}>
                <div>
                    <h1>Famous  - {famous?.name}</h1>
                    <div style={{ width: 300, height: 'auto' }}>
                        <Image width={famous?.image.width} height={famous?.image.height} src={famous?.image.url} alt={famous?.name} />
                    </div>
                </div>
                <div>
                    <h2>Data de nascimento: {formatDateBR(famous?.birthDate)}</h2>
                    <h2>Local de nascimento: {famous?.birthPlace}</h2>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps(context) {
    const response = await ApiImdb.getFamousInfo(context.params.id);
    const famous = await response.data;

    return {
        props: { famous, revalidate: 10 },
    };
};

export async function getStaticPaths() {

    return {
        paths: [
            { params: { id: 'nm4043618' } },
        ],
        fallback: true,
    }
}