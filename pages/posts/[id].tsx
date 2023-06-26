import type { GetStaticProps } from "next";
import Link from "next/link";

type PostIdProps = {
  id?: string;
  test?: string;
};

export default function PostId({ id }: PostIdProps) {
  // const router = useRouter()
  // console.log('> %crouter','color: #218eff',' - ', router);
  console.log("> %cid", "color: #218eff", " - ", id);
  return (
    <p>
      id: {id}
      <Link href="/posts/firstPost">to First Post</Link>
    </p>
  );
}

// export const getStaticProps: GetStaticProps<PostIdProps, PostIdProps> = async (props) => {
//   const id: string | undefined = await new Promise(resolve => setTimeout(resolve, 500, props.params?.id))
//   return {
//     props: {
//       id
//     }
//   }
// }
export const getServerSideProps: GetStaticProps<
  PostIdProps,
  PostIdProps
> = async (props) => {
  const id: string | undefined = await new Promise((resolve) =>
    setTimeout(resolve, 500, props.params?.id)
  );
  return {
    props: {
      id,
    },
  };
};

// export const getStaticPaths = () => {
//   return {
//     paths: [
//       '/posts/1',
//       '/posts/2'
//     ],
//     fallback: false

//   }
// }
