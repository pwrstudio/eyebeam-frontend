<script>
  // # # # # # # # # # # # # #
  //
  //  PARTICIPANT LIST
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import get from "lodash/get"

  // *** STORES
  // import { localUserAuthenticated } from "../stores"

  // *** CONFIGURATION
  // import { MESSAGING_ENABLED } from "./world.config.js"

  // *** PROPS
  export let participants = {}
  export let messaging = false
  export let isModerators = false
  export let isSeminar = false
</script>

{#if participants && Array.isArray(participants)}
  {#each participants as participant, index}
    <span class="participant" class:seminar={isSeminar}>
      <a href={"/profiles/" + get(participant, "slug.current", "")}>
        {participant.name}
        {#if isModerators}
          &nbsp;(moderator)
        {/if}
      </a>
    </span>
  {/each}
{/if}

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: $COLOR_DARK;
    }

    svg {
      margin-left: $SPACE_XS;
      margin-right: 2px;
      path {
        fill: $COLOR_GREY_2;
      }
      &:hover {
        path {
          fill: $COLOR_DARK;
        }
      }
    }
  }

  .seminar {
    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: $COLOR_LIGHT;
      }

      svg {
        margin-left: $SPACE_XS;
        margin-right: 2px;
        path {
          fill: $COLOR_GREY_2;
        }
        &:hover {
          path {
            fill: $COLOR_LIGHT;
          }
        }
      }
    }
  }

  .participant {
    // word-spacing: -0.2em;

    &::after {
      content: ", ";
    }

    &:last-of-type {
      &::after {
        content: "";
      }
    }
  }
</style>
