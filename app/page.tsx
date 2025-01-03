import { client } from '@/sanity/lib/client';

interface MyBlog {
  name: string; 
  subheading: string;
}

export default async function Home() {
  // Fetching data using Sanity client
  const res: MyBlog[] = await client.fetch(`*[_type == 'blog']`);

  return (
    <div>
      {res.map((data, index) => (
        <div key={index}> {/* Adding a unique key */}
          <h1>{data.name}</h1>
          <p>{data.subheading}</p>
        </div>
      ))}
    </div>
  );
}
