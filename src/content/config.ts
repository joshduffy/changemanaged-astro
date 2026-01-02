import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    dateISO: z.string().optional(), // ISO 8601 format for schema markup
    readTime: z.string(),
    excerpt: z.string(),
    ogImage: z.string().optional(), // Optional per-post social image
  }),
});

export const collections = { insights };
