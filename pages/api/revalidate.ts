import { NextApiRequest, NextApiResponse } from "next"
import { getStaticPaths } from "../productos/page/[page]"  
import { revalidatePath } from 'next/cache'
import glob from 'fast-glob'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let slug = request.query.slug as string
  const secret = request.query.secret as string

  // Validate secret.
  if (secret !== process.env.DRUPAL_REVALIDATE_SECRET) {
    return response.status(401).json({ message: "Invalid secret." })
  }

  // Validate slug.
  if (!slug) {
    return response.status(400).json({ message: "Invalid slug." })
  }

  if(slug === '/productos') {
    const files = await glob(`../productos/*.html`);
    const paths = files.map((file) => `/${file.replace('.html', '')}`);
    await Promise.all(paths.map(path => response.revalidate(path)));
  }

  try {
    await response.revalidate(slug)

    return response.json({})
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    })
  }
}
