<script>
  // # # # # # # # # # # # # #
  //
  //  USERNAME DIALOG
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, createEventDispatcher } from "svelte"
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"

  // *** STORES
  import { localUserName } from "../stores.js"

  // *** CONSTANTS
  const dispatch = createEventDispatcher()

  // *** VARIABLES
  let username = $localUserName ? $localUserName : ""

  // *** DOM REFERENCES
  let inputEl = {}

  onMount(async () => {
    if (inputEl) {
      inputEl.focus()
    }
  })
</script>

<div
  class="username-dialog"
  aria-modal="true"
  role="dialog"
  transition:fade={{ duration: 400, easing: quartOut }}
>
  <div class="box">
    <input
      type="text"
      aria-required="true"
      aria-label="Type in your name to enter"
      bind:this={inputEl}
      bind:value={username}
      placeholder="Type your name to enter..."
      on:keydown={e => {
        if (e.keyCode == 13) dispatch("username", { username: username })
      }}
    />
    <button
      aria-label="Submit username"
      type="submit"
      on:click={e => {
        dispatch("username", { username: username })
      }}>Enter</button
    >
  </div>
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .username-dialog {
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
      font-family: $SANS_STACK;
      padding: 40px;
      font-size: 18px;
      text-align: center;
      user-select: none;
      border-radius: 30px;
      background: $COLOR_LIGHTBLUE;
      display: flex;

      @include screen-size("small") {
        font-size: 12px;
      }

      input {
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_SMALL;
        float: left;
        width: calc(100% - 60px);
        display: block;
        background: transparent;
        border: 1px solid $COLOR_DARK;
        color: $COLOR_DARK;
        border-radius: $BORDER_RADIUS;
        padding: $SPACE_S $SPACE_M;
        // outline: none;
        height: 30px;
        margin-right: $SPACE_L;

        &.smaller {
          width: calc(100% - 110px);
        }

        &:focus {
          border: 1px solid $COLOR_DARK;
          color: $COLOR_DARK !important;
        }

        &::placeholder {
          opacity: 0.8;
        }

        &::-webkit-input-placeholder {
          opacity: 1;
        }

        input[type="text"] {
          -webkit-appearance: none;
          &::placeholder {
            color: $COLOR_DARK !important;
            opacity: 1;
          }
          &::-webkit-input-placeholder {
            color: $COLOR_DARK !important;
            opacity: 1;
          }
        }

        select {
          -webkit-appearance: none;
        }
      }

      div {
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_MEDIUM;
        float: right;
        display: block;
        width: 100px;
        background: transparent;
        color: $COLOR_DARK;
        border-radius: $BORDER_RADIUS;
        // outline: none;
        cursor: pointer;
        height: 30px;
        line-height: 20px;
        margin-right: $SPACE_S;
      }

      button {
        font-family: $SANS_STACK;
        font-size: 90%;
        text-transform: uppercase;
        float: right;
        display: block;
        width: 100px;
        background: transparent;
        border: 1px solid $COLOR_DARK;
        color: $COLOR_DARK;
        border-radius: $BORDER_RADIUS;
        // outline: none;
        cursor: pointer;
        height: 30px;
        line-height: 20px;

        &:hover {
          // color: $COLOR_LIGHT;
          border: 1px solid $COLOR_LIGHT;
        }
      }
    }
  }
</style>
