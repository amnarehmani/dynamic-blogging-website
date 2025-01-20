import Banner from '@/Components/Banner';
import { sanityClient, urlFor } from '@/sanity';
import { Post } from '@/typings';
import Image from 'next/image';
import Link from 'next/link';

async function fetchPosts(): Promise<Post[]> {
  const query = `*[_type == "post"]{
    _id,
    title,
    author->{
      name,
      image
    },
    description,
    mainImage,
    slug,
    publishedAt
  }`;

  return await sanityClient.fetch(query);
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <>
      <Banner />
      <div>
        <h1 className="text-center text-4xl font-extrabold p-10 m-8">Explore Our Blogs.</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:translate-y-1 motion-safe:transition-all motion-safe:duration-300"
          >
            <Link href={`/post/${post.slug.current}`}>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-teal-500">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <div className="flex items-center gap-2 mb-2">
                {post.author?.image && (
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <p className="text-sm text-gray-500">{post.author?.name}</p>
              </div>
              <p className="text-sm text-gray-500">
                Published on: {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
