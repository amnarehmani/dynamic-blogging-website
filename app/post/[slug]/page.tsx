import { sanityClient } from '@/sanity';
import { PortableText } from '@portabletext/react';
import React from 'react';
import { Post } from "@/typings";
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';

interface PostPageProps {
  post: Post;
}

// Create the builder for image URLs
const builder = imageUrlBuilder(sanityClient);

// Function to get the image URL
function urlFor(source: any) {
  return builder.image(source);
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    description,
    author->{
      name,
      image
    },
    mainImage,
    body,
    publishedAt
  }`;

  const post = await sanityClient.fetch(query, { slug: params.slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">{post.title}</h1>

      {/* Author Image and Name */}
      <div className="flex items-center mb-6">
        {post.author?.image && (
          <Image
            src={urlFor(post.author.image).width(300).height(300).url() || ''} // Generate correct image URL
            alt={post.author.name}
            className="w-12 h-12 rounded-full mr-4"
            width={300}
            height={300}
          />
        )}
        <span className="text-lg font-medium text-gray-700">{post.author.name}</span>
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(500).height(500).url() || ''} // Generate correct image URL
          alt={post.title}
          className="w-full h-auto mb-6 object-cover"
          width={500}
          height={500}
        />
      )}

      <p className="text-xl text-gray-600 mb-6">{post.description}</p>

      {/* Render Portable Text for post body */}
      <div className="text-base text-gray-800 leading-relaxed">
        <PortableText value={post.body} />
      </div>
    </div>
  );
};

export default Page;

export const generateStaticParams = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
};
