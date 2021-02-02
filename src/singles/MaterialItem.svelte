<script>
  // # # # # # # # # # # # # #
  //
  //  Material Item
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import get from "lodash/get"
  import { urlFor } from "../sanity.js"

  // *** COMPONENTS
  import InlineSiteOverlay from "../overlays/InlineSiteOverlay.svelte"

  // *** GLOBAL
  import { FORMATMAP } from "../global.js"

  // *** PROPS
  export let item = {}

  // *** VARIABLES
  let url = ""
  let inlineSiteActive = false

  const makeUrl = ref =>
    "https://cdn.sanity.io/files/1hwmqt2a/production/" +
    ref.substring(5).replace("-", ".")

  switch (item._type) {
    case "imageBlock":
      url = urlFor(get(item, "image.asset", {})).url()
      break
    case "audioBlock":
      url = makeUrl(get(item, "audioFile.asset._ref", ""))
      break
    case "fileBlock":
      url = makeUrl(get(item, "file.asset._ref", ""))
      break
    case "pdfBlock":
      url = makeUrl(get(item, "pdfFile.asset._ref", ""))
      break
    case "videoBlock":
      url = makeUrl(get(item, "videoFile.asset._ref", ""))
      break
    case "inlineSiteBlock":
      url = get(item, "url", "")
      break
    case "linkBlock":
      url = get(item, "url", "")
      break
  }
</script>

{#if item._type == "inlineSiteBlock"}
  <div
    aria-label={item.title + ", open site in popup window"}
    class="material-item"
    role="button"
    tabindex="0"
    on:click={e => {
      inlineSiteActive = true
    }}
  >
    <div class="row">
      <h2 class="title">{item.title}</h2>
      <div class="elips" role="presentation">
        ....................................................................
      </div>
      <div class="format">
        {item._type === "fileBlock" || item._type === "linkBlock"
          ? item.fileType
          : FORMATMAP[item._type]}
      </div>
    </div>
  </div>
{:else}
  <a
    href={url}
    target="_blank"
    download
    aria-label={item.title}
    class="material-item"
  >
    <div class="row">
      <h2 class="title">{item.title}</h2>
      <div class="elips" role="presentation">
        ....................................................................
      </div>
      <div class="format">
        {item._type === "fileBlock" || item._type === "linkBlock"
          ? item.fileType
          : FORMATMAP[item._type]}
      </div>
    </div>
  </a>
{/if}

{#if inlineSiteActive}
  <InlineSiteOverlay
    {url}
    on:close={e => {
      inlineSiteActive = false
    }}
  />
{/if}

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .material-item {
    width: 100%;
    background: $COLOR_LIGHT;
    color: $COLOR_DARK;
    display: block;
    text-decoration: none;
    user-select: none;
    padding-top: $SPACE_XS;
    padding-bottom: $SPACE_XS;
    font-size: $FONT_SIZE_SMALL;

    &:first-of-type {
      margin-top: $SPACE_XS;
    }

    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title {
        font-family: $SANS_STACK;
        font-weight: 600;
        white-space: nowrap;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .elips {
        margin-left: $SPACE_XS;
        margin-right: $SPACE_XS;
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        flex-shrink: 99999;
        color: $COLOR_GREY_2;
      }

      .format {
        white-space: nowrap;
        color: $COLOR_GREY_2;
      }
    }

    cursor: pointer;

    // transition: background 0.5s $STANDARD_TRANSITION;

    &:hover {
      background: $COLOR_GREY_1;
    }

    &.header {
      border-bottom: 1px dotted $COLOR_GREY_1;
      cursor: default;

      .archive-link {
        color: $COLOR_GREY_2;
        text-decoration: underline;
      }

      &:hover {
        background: unset;
      }
    }
  }
</style>
