<script>
  // # # # # # # # # # # # # #
  //
  //  CARD
  //
  // # # # # # # # # # # # # #

  // *** IMPORT
  import { renderBlockText } from "./sanity.js"
  import get from "lodash/get"
  import { fade } from "svelte/transition"
  import { links } from "svelte-routing"

  // *** PROPS
  export let card = {}

  // *** VARIABLES
  let currentIndex = 0
</script>

<div class="card" use:links>
  {#each card.slides as slide, index (slide._key)}
    {#if Array.isArray(get(slide, "content", false)) && currentIndex === index}
      <div class="slide" in:fade|local>
        {@html renderBlockText(get(slide, "content", []))}
      </div>
    {/if}
  {/each}
  {#if card.slides && card.slides.length > 1}
    <div class="navigation">
      <div
        class="nav-button back"
        aria-label="Previous card"
        role="button"
        tabindex="0"
        class:disabled={currentIndex === 0}
        on:click={e => {
          currentIndex -= 1
        }}
      >
        Back
      </div>
      <div
        class="nav-button next"
        aria-label="Next card"
        role="button"
        tabindex="0"
        class:disabled={currentIndex === card.slides.length - 1}
        on:click={e => {
          currentIndex += 1
        }}
      >
        Next
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "./responsive.scss";
  @import "./world.theme.scss";

  .card {
    padding: $SPACE_S;
    padding-top: $SPACE_L;

    .navigation {
      display: flex;
      justify-content: center;

      .nav-button {
        padding: 10px;
        background: $COLOR_GREY_1;

        border-radius: $BORDER_RADIUS;
        cursor: pointer;
        user-select: none;

        &:hover {
          background: $COLOR_GREY_15;
        }

        &.back {
          margin-right: 10px;
        }
        &.disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }
  }
</style>
