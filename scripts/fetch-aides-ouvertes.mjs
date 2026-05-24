const archiveUrl = 'https://www.monprojetmusique.fr/aides/'

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeHtml(value) {
  return value
    .replace(/&#8211;|&#8212;/g, '–')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

async function main() {
  const response = await fetch(archiveUrl, {
    headers: {
      'user-agent': 'DossierStudioBot/1.0 (+https://dossier-studio.fr)',
      accept: 'text/html,application/xhtml+xml',
    },
  })

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`)
  }

  const html = await response.text()
  const links = new Map()
  const regex = /<a[^>]+href=["']([^"']*\/aides\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  let match

  while ((match = regex.exec(html))) {
    const href = decodeHtml(match[1])
    const title = decodeHtml(stripTags(match[2]))
    if (!title || title.length < 5) continue
    if (href.replace(/\/$/, '') === archiveUrl.replace(/\/$/, '')) continue
    links.set(href, title)
  }

  console.log(
    JSON.stringify(
      {
        source: archiveUrl,
        count: links.size,
        sample: Array.from(links.entries())
          .slice(0, 10)
          .map(([sourceUrl, title]) => ({ title, sourceUrl })),
      },
      null,
      2
    )
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
