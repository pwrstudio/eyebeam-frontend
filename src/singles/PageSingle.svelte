<script>
  // # # # # # # # # # # # # #
  //
  //  Single Page
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import get from "lodash/get"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"
  import { links } from "svelte-routing"

  // *** COMPONENTS
  import MetaData from "../MetaData.svelte"

  // *** PROPS
  export let page = {}

  // *** VARIABLES
  let el = {}

  // *** ON MOUNT
  onMount(async () => {
    el.querySelector('h2').focus()
  })
</script>

<!-- METADATA -->
<MetaData post={page} />

<div class="page-single" bind:this={el} in:fade use:links>
  <!-- HEADER -->
  <div class="main-header">
    <!-- TITLE -->
    <h2 
    class="title"
    tabindex="0"
    >{page.title}</h2>
  </div>
  <div class="divider" />

  <!-- TEXT -->
  {#if Array.isArray(get(page, "content.content", false))}
    <div class="text">
      {@html renderBlockText(page.content.content)}
    </div>
    <div class="divider" />
  {/if}
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .page-single {
    .main-header {
      padding: $SPACE_M;

      .title {
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_LARGE;
        font-weight: 600;
      }

      .participants {
        margin-top: $SPACE_XS;
        color: $COLOR_GREY_2;
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_SMALL;
        display: inline-block;
      }
    }

    .divider {
      border-bottom: 1px dotted $COLOR_GREY_1;
      width: 100%;
    }

    @include text;

    .related-events {
      padding: $SPACE_M;
    }
  }
</style>
