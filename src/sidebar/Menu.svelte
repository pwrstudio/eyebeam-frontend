<script>
  // # # # # # # # # # # # # #
  //
  //  MENU
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { createEventDispatcher } from "svelte"
  import MediaQuery from "svelte-media-query"

  // *** CONSTANTS
  const dispatch = createEventDispatcher()
</script>

<div class="menu-container">
  <nav>
    <!-- <a href="/pages/schedule" class="menu-item">Schedule</a> -->
    <a href="/projects" class="menu-item">Artist Projects</a>
    <a href="/pages/schedule" class="menu-item">Schedule</a>
    <a href="/pages/guide" class="menu-item">Guide</a>
    <a href="/pages/about" class="menu-item">About</a>
  </nav>

  <MediaQuery query="(min-width: 768px)" let:matches>
    {#if matches}
    <span
      aria-label="Change your name for interaction"
      role="button"
      tabindex="0"
      on:click={e => {
        dispatch("username")
      }}
      class="menu-item login">Change name</span
    >
  {/if}
</MediaQuery>

</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .menu-container {
    height: 100%;
    color: $COLOR_DARK;
    font-size: $FONT_SIZE_SMALL;
    background: $COLOR_LIGHT;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    padding-left: $SPACE_S;
    padding-right: $SPACE_S;

    .menu-item {
      font-weight: bold;
      padding-right: $SPACE_L;
      float: left;
      cursor: pointer;
      color: $COLOR_DARK;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .login {
      padding-right: 0px;
      justify-self: end;
    }
  }
</style>
