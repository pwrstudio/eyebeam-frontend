<script>
  // # # # # # # # # # # # # #
  //
  //  PRIVATE MESSAGE THREAD
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import get from "lodash/get"
  import { slide } from "svelte/transition"

  // *** GLOBAL
  import { formatDate } from "../global.js"

  // COMPONENTS
  import NewPrivateMessage from "./NewPrivateMessage.svelte"
  import { authenticatedUserInformation } from "../stores"

  // *** PROPS
  export let message = {}
  export let own = {}

  // *** VARIABLES
  let expanded = false
</script>

<div class="message-container">
  <div
    class="header"
    class:expanded
    on:click={e => {
      expanded = !expanded
    }}
  >
    <div class="meta">
      <div class="title">{message.title}</div>
      <div class="date">{formatDate(message.last_posted_at)}</div>
    </div>
    <div class="participants">
      {#each get(message, "details.allowed_users", []).filter(p => p.username != get($authenticatedUserInformation, "username", "")) as participant (participant.id)}
        <span>{participant.name}, </span>
      {/each}
    </div>
  </div>
  {#if expanded}
    <div class="thread-container" transition:slide|local>
      {#each get(message, "post_stream.posts", []) as post (post.id)}
        <div class="post">
          <div class="meta">
            <div class="sender">{post.name}</div>
            <div class="date">{formatDate(post.created_at)}</div>
          </div>
          <div class="content">
            {@html post.cooked}
          </div>
        </div>
      {/each}
    </div>
    <NewPrivateMessage
      url={"https://work.anthropocene-curriculum.org/t/" +
        message.slug +
        "/" +
        message.id}
      text="> Go to thread"
    />
  {/if}
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .message-container {
    margin-bottom: $SPACE_XS;
    padding-bottom: $SPACE_XS;
    color: $COLOR_LIGHT;
    font-size: $FONT_SIZE_SMALL;
    user-select: none;
    border-bottom: 1px solid $COLOR_GREY_2;

    .header {
      cursor: pointer;
      border-bottom: 1px solid transparent;
      padding-top: $SPACE_S;
      padding-bottom: $SPACE_M;

      &.expanded {
        border-bottom: 1px solid $COLOR_GREY_2;
      }

      .meta {
        width: 100%;
        display: inline-block;

        .title {
          float: left;
        }

        .date {
          float: right;
          color: $COLOR_GREY_2;
        }
      }

      .participants {
        color: $COLOR_GREY_2;
      }
    }

    .post {
      padding-top: $SPACE_S;
      margin-bottom: $SPACE_XS;

      .meta {
        width: 100%;
        display: inline-block;
        color: $COLOR_GREY_2;
        padding-left: $SPACE_S;
        border-left: 1px solid $COLOR_GREY_2;

        .sender {
          float: left;
        }

        .date {
          float: right;
          color: $COLOR_GREY_2;
        }
      }

      .content {
        border-left: 1px solid $COLOR_GREY_2;
        padding-left: $SPACE_S;
      }
    }

    .body {
    }
  }
</style>
