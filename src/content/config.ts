import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    readTime: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = { insights };
