import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import { GetServerSideProps, NextApiRequest } from "next";

interface PrismicContext {
  req?: NextApiRequest;
  previewData: GetServerSideProps;
}

// todo need refactory
interface PrismicResolver {
  [key: string]: any;
}


export const repositoryName = prismic.getRepositoryName(process.env.PRISMIC_ENDPOINT);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc: PrismicResolver) {
  switch (doc.type) {
    case "posts":
      return `/${doc.uid}`;
    default:
      return null;
  }
}

// This factory function allows smooth preview setup
export async function getServerSideProps({ previewData }) {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT,  { ...previewData });

  const response = await client.getAllByType("posts", {
    pageSize: 100,
  });

  const posts = response?.map((post: any) => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: post.data.content.find(
        (content: any) => content.type === "paragraph"
      )?.text,
      updated_at: new Date(post.last_publication_date).toLocaleDateString(
        "pt-PT",
        {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }
      ),
    };
  });

  return {
    props: { posts }, // Will be passed to the page component as props
  };
}

