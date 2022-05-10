---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Remix Presentation
# persist drawings in exports and build
drawings:
  persist: false
---

# Intro to Remix

Kevin Cunningham

---
layout: quote
---

# They say everyday a new JavaScript framework is born.

---

# The Story of Remix

<v-clicks>

- Ryan Florence and Michael Jackson
- React Training and React Router
- Remix was a closed source, licenced software
- Remix became open source in November 2021
- Kent C. Dodds joined the team around that time 
- Lots of great things being built and created.


</v-clicks>

---
layout: two-cols
clicks: 10
---

# The Philosophy of Remix

<p></p>

<p v-click="1">

- Embrace the server/client model

</p>

<p v-click="3">

- Work with, not against, the foundations of the web: Browsers, HTTP, and HTML. It’s always been good and it's gotten really good in the last few years.

</p>  

<p v-click="4">

- Use JavaScript to augment the user experience by emulating browser behavior.

</p>


:: right ::

<div v-if="$slidev.nav.clicks === 2">

```js
export default function Gists() {
  const gists = useSomeFetchWrapper(
    "https://api.github.com/gists"
  );
  if (!gists) {
    return <Skeleton />;
  }
  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.id}>
          <a href={gist.html_url}>
            {gist.description}, {gist.owner.login}
          </a>
          <ul>
            {Object.keys(gist.files).map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
```

</div>

<div v-if="$slidev.nav.clicks === 3">

```js
import { json } from "@remix-run/{runtime}";

export async function loader() {
  const res = await fetch("https://api.github.com/gists");
  const gists = await res.json();
  return json(
    gists.map((gist) => {
      return {
        description: gist.description,
        url: gist.html_url,
        files: Object.keys(gist.files),
        owner: gist.owner.login,
      };
    })
  );
}
```

</div>

---

# What exactly is Remix?

<v-clicks>

- A compiler
- HTTP Handler and Adapters
- Server framework
- Browser framework

</v-clicks>

---

# Remix vs Next.js

<v-clicks>

- Both are great!
- Remix is as fast or fasts than Next at serving static content
- Remix is faster than Next.js at serving dynamic content
- Remix enables fast user experiences even on slow networks
- Remix handles the fetching and the mutation of data

</v-clicks>

---

# A form example
