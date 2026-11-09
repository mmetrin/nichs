import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

async function checkDirectory(directory) {
  let checked = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      checked += await checkDirectory(path)
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8')
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ''
      const robots = head.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1]
      if (!robots?.split(',').some(value => value.trim().toLowerCase() === 'noindex')) {
        throw new Error(`Publication blocked: ${path} is missing robots noindex`)
      }
      checked += 1
    }
  }
  return checked
}

const checked = await checkDirectory('dist')
if (!checked) throw new Error('No built HTML pages found')
console.log(`Verified noindex in ${checked} built HTML pages`)
