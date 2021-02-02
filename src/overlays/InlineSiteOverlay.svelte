<script>
  // # # # # # # # # # # # # #
  //
  //  INLINE SITE OVERLAY
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import get from "lodash/get"

  // *** PROPS
  export let url = ""

  // *** CONSTANTS
  const dispatch = createEventDispatcher()
</script>

<div
  class="inline-site-overlay"
  aria-modal="true"
  role="dialog"
  transition:fade={{ duration: 400, easing: quartOut }}
  on:click={e => {
    console.dir(e)
    if (get(e, "target.id", false) !== "box") {
      dispatch("close", {})
    }
  }}
>
  <div class="box" id="box">
    <iframe src={url} />
    <button
      aria-label="Close"
      on:click={e => {
        dispatch("close", {})
      }}
    >
      <svg
        role="presentation"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.9 11.1C28.6 10.8 28.2 10.8 27.9 11.1L20 19L12.1 11.1C11.8 10.8 11.4 10.8 11.1 11.1C10.8 11.4 10.8 11.8 11.1 12.1L19 20L11.1 27.9C10.8 28.2 10.8 28.6 11.1 28.9C11.4 29.2 11.8 29.2 12.1 28.9L20 21L27.9 28.9C28.2 29.2 28.6 29.2 28.9 28.9C29.2 28.6 29.2 28.2 28.9 27.9L21 20L28.9 12.1C29.2 11.8 29.2 11.4 28.9 11.1Z"
        />
      </svg></button
    >
  </div>
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .inline-site-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;

    .box {
      font-family: $MONO_STACK;
      padding: 40px;
      text-align: center;
      background: $COLOR_GREY_1;
      position: relative;

      iframe {
        width: 80vw;
        height: 80vh;
        background: $COLOR_LIGHT;
        border: 0;

        @include screen-size("small") {
          height: 60vh;
        }
      }

      button {
        display: block;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        border: 0;
      }
    }
  }
</style>
