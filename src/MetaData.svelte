<script>
  // # # # # # # # # # # # # # # # # # #
  //
  //  METADATA
  //
  //  Sets page metadata dynamically based
  //  on current post. For this to work
  //  properly the site needs to be
  //  prerendered for social-media bots
  //  (eg. with prerender.io)
  //
  // # # # # # # # # # # # # # # # # # #

  // *** IMPORTS
  import has from "lodash/has"
  import isArray from "lodash/isArray"
  import isEmpty from "lodash/isEmpty"
  import truncate from "lodash/truncate"

  // *** SANITY
  import { toPlainText, urlFor } from "./sanity.js"

  // *** STORES
  import { globalSettings } from "./stores.js"

  // *** PROPS
  export let post = {}

  // *** VARIABLES
  let title = "EYEBEAM: From the Rupture"
  let description = "Eyebeam presents a 4-day, multi-venue arts & ideas festival that is free and open to all, featuring today's most radical artists and thinkers."
  let image = "/img/from-the-rupture.png"
  let url = window.location

  const stripHtml = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  // Set title
  $: {
    if (has(post, "name") && !isEmpty(post.name)) {
      title = stripHtml(post.name) + " | " + $globalSettings.title
    } else if (has(post, "title") && !isEmpty(post.title)) {
      title = stripHtml(post.title) + " | " + $globalSettings.title
    } else if ($globalSettings.title) {
      title = $globalSettings.title
    } else {
      title = "EYEBEAM: From the Rupture"
    }
  }

  // Set description
  $: {
    if (has(post, "description") && post.description.length > 0) {
      description = truncate(post.description, {
        length: 260,
        separator: /.? +/,
      })
    } else if (
      has(post, "biography.content") &&
      isArray(post.biography.content) &&
      !isEmpty(post.biography.content)
    ) {
      description = truncate(toPlainText(post.biography.content), {
        length: 260,
        separator: /.? +/,
      })
    } else if (
      has(post, "content.content") &&
      isArray(post.content.content) &&
      !isEmpty(post.content.content)
    ) {
      description = truncate(toPlainText(post.content.content), {
        length: 260,
        separator: /.? +/,
      })
    } else {
      description = $globalSettings.siteDescription
    }
  }

  // Set sharing image
  $: {
    image =
      has(post, "mainImage") && post.mainImage
        ? urlFor(post.mainImage).quality(80).height(800).width(1200).url()
        : urlFor($globalSettings.metaImage)
            .quality(80)
            .height(800)
            .width(1200)
            .url()
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="postrational.foundation" />
</svelte:head>
