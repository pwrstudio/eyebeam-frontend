<script>
  // # # # # # # # # # # # # #
  //
  //  CHAT MESSAGE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import anchorme from "anchorme"

  // *** GLOBALS
  import { formattedChatDate } from "../global.js"

  // *** PROPS
  export let message = {}

  // *** STORES
  import { localUserName } from "../stores"
</script>

<div class="chat-message" transition:fade|local>
  <div class="meta">
    <span class="name">{message.name}</span>
    <span class="date">{formattedChatDate(message.timestamp)}</span>
  </div>
  <p class="body">
    {@html anchorme({
      input: message.text,
      options: {
        attributes: {
          target: "_blank",
        },
      },
    })}
  </p>
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .chat-message {
    margin-bottom: $SPACE_XS;
    padding-bottom: $SPACE_XS;
    padding-left: $SPACE_S;
    padding-right: $SPACE_S;
    color: $COLOR_LIGHT;
    font-size: $FONT_SIZE_SMALL;
    user-select: none;

    .meta {
      width: 100%;
      display: inline-block;
      color: $COLOR_GREY_2;

      .name {
        float: left;
        svg {
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

      .date {
        font-family: $SANS_STACK;
        font-weight: normal;
        float: right;
      }
    }

    .body {
      display: block;
      border-left: 1px solid $COLOR_GREY_2;
      padding-left: $SPACE_S;
      padding-right: $SPACE_XS;
      margin: 0;
    }

    &.broadcast {
      .body {
        color: yellow;
      }
    }

    &.narrowcast {
      .body {
        color: green;
      }
    }
  }
</style>
