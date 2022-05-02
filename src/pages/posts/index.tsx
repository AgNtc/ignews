import Head from 'next/head';
import styles from './styles.module.scss';
import * as prismic from '@prismicio/client';
// import { GetStaticProps } from 'next';
// import { endpoint } from '../../services/prismic';



export default function Posts(){
    return (
      <>
        <Head>
          <title>Posts | Ignews</title>
        </Head>

        <main className={styles.container}>
          <div className={styles.posts}>
            <a href="">
              <time>12 de março de 2022</time>
              <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
              <p>
                In this guide, you will learn how to create a Monorepo to manage
                multiple packages with a shared build, test, and release
                process.
              </p>
            </a>
            <a href="">
              <time>12 de março de 2022</time>
              <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
              <p>
                In this guide, you will learn how to create a Monorepo to manage
                multiple packages with a shared build, test, and release
                process.
              </p>
            </a>
            <a href="">
              <time>12 de março de 2022</time>
              <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
              <p>
                In this guide, you will learn how to create a Monorepo to manage
                multiple packages with a shared build, test, and release
                process.
              </p>
            </a>
            <a href="">
              <time>12 de março de 2022</time>
              <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
              <p>
                In this guide, you will learn how to create a Monorepo to manage
                multiple packages with a shared build, test, and release
                process.
              </p>
            </a>
          </div>
        </main>
      </>
    );
}

    
export async function getServerSideProps({ previewData }) {
  const client = prismic.createClient(
    process.env.PRISMIC_ENDPOINT,
    (process.env.PRISMIC_ACCESS_TOKEN,
    {
      ...previewData
    })
  );

  const posts = await client.getAllByType("post", {
    pageSize: 100,
  });

  console.log(posts);
  
  return {
    props: { posts },
  };
}