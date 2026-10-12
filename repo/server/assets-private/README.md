# Private assets — not served by the website

These master files intentionally live outside `client/public/`, so they are
never bundled into the build and never reachable by URL.

| File | Source | Status |
| --- | --- | --- |
| `arinox-implementation-use-cases-MASTER.pdf` | "Arinox AI — Project Implementation and Use Cases" (36 pp, 19 case studies) | **Not approved for public download as-is.** Names confidential client engagements (HPE, Hitachi Systems, Asian Paints, Hindustan Unilever, Jindal Aluminium, RailTel, Tech Mahindra, Bank of Baroda) with production status and savings figures. |
| `arinox-marketing-os-deck-MASTER.pptx` | "Marketing OS" deck v6 (14 slides) | Cleared for use as the `/industries/marketing` page source. A copy ships as a download link in the request auto-reply (`/downloads/marketing-os-deck.pptx`). |

## How each is delivered today

- **Implementation brief** — no website page, by decision. The team sends it
  by email after a request through `/contact` or a direct sales reply. Do not
  add a `/downloads/...` link until a names-cleared public edition is approved.
- **Marketing OS deck** — requested from `/industries/marketing`. The form posts
  to `/api/v1/leads`; the requester's auto-reply now carries a direct download
  link (`/downloads/marketing-os-deck.pptx`, a copy of this file). The team gets
  a compact lead email (Name/Email/Company/Role/Message/Landing page) with no
  direct link needed.

## If you later want direct downloads

Export a names-cleared edition, then drop it in `client/public/downloads/` and
switch the page CTA from the request form to a `Button href=... download`, the
same pattern `/commandcore` uses for `arinox-commandcore-specs.pdf`.

Static files in `client/public/` are served by the build. Supabase storage is
used for database records (blog, careers, applications, leads), not for public
site assets — there is no Supabase bucket path for these files.
