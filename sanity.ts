import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

// Retrieve environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

// Define the configuration object for both client and image URL builder
export const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for production; set to false for development
};

// Create Sanity client
export const sanityClient = createClient(config);

// Create a helper function for generating image URLs
export const urlFor = (source: any) =>
  createImageUrlBuilder({
    projectId,
    dataset,
  }).image(source);
