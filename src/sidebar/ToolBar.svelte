<script>
  // # # # # # # # # # # # # #
  //
  //  TOOLBAR
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links, navigate } from "svelte-routing"
  import { createEventDispatcher } from "svelte"
  // import get from "lodash/get"
  const dispatch = createEventDispatcher()

  // *** STORES
  // import {
  //   localUserAuthenticated,
  //   authenticatedUserInformation,
  // } from "../stores"

  // *** PROPS
  export let section = ""

  // *** VARIABLES
  let chatInputValue = ""
  let showChatInput = false

  const submitChat = () => {
    dispatch("submit", {
      text: chatInputValue,
    })
    chatInputValue = ""
  }

  const teleport = () => {
    dispatch("teleport")
  }

  let notificationCount = 0

  // const getNotifications = () => {
  //   if (
  //     $localUserAuthenticated &&
  //     get($authenticatedUserInformation, "username", false)
  //   ) {
  //     let username = $authenticatedUserInformation.username
  //     fetch("https://sso.post-rational.org/notifications?user=" + username)
  //       .then(response => response.json())
  //       .then(data => {
  //         // console.log("polling notifications in toolbar", data)
  //         notificationCount = get(
  //           data,
  //           "notifications.notifications",
  //           []
  //         ).filter(n => n.notification_type === 6 && !n.read).length
  //         // console.log("notificationCount", notificationCount)
  //       })
  //       .catch(err => {
  //         console.error(err)
  //       })
  //   }
  // }

  // getNotifications()

  // setInterval(getNotifications, 10000)
</script>

<div class="toolbar" use:links>
  <!-- {#if $localUserAuthenticated && !showChatInput} -->
  <!-- CHAT => open full input -->
  <!-- <div
      class="toolbar-item chat"
      on:click={e => {
        showChatInput = true
        navigate('/')
      }}>
      Chat
    </div> -->
  <!-- SEMINAR -->
  <!-- <a
      href="/seminar"
      class="toolbar-item"
      class:active={section === 'seminar'}>
      Seminar</a> -->
  <!-- MESSAGES -->
  <!-- <a
      href="/messages"
      class="toolbar-item"
      class:active={section === 'messages'}>Messages{#if notificationCount > 0}
        ({notificationCount})
      {/if}</a>
    <div class="toolbar-item" on:click={teleport}>Support</div>
  {:else} -->
  <!-- CHAT -->
  <input
    placeholder="Write a message..."
    type="[text]"
    aria-label="Chat message"
    maxlength="600"
    bind:value={chatInputValue}
    on:keydown={e => {
      if (e.keyCode == 13) submitChat()
    }}
  />
  <button aria-label="Send chat message" type="submit" on:click={submitChat}
    >Send</button
  >
  <!-- {#if $localUserAuthenticated}
      <button
        class="close-chat"
        on:click={e => {
          showChatInput = false
        }}>×</button>
    {/if} -->
  <!-- {/if} -->
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .toolbar {
    width: 100%;
    height: 100%;
    padding-left: 7px;
    padding-right: $SPACE_S;
    display: flex;
    align-items: center;
    user-select: none;

    input {
      font-family: $SANS_STACK;
      font-size: $FONT_SIZE_BASE;
      float: left;
      width: calc(100% - 60px);
      display: block;
      background: transparent;
      border: 1px solid $COLOR_GREY_2;
      color: $COLOR_LIGHT;
      border-radius: $BORDER_RADIUS;
      padding: $SPACE_S;
      // outline: none;
      height: 30px;
      margin-right: $SPACE_S;

      &.smaller {
        width: calc(100% - 110px);
      }

      &:focus {
        border: 1px solid $COLOR_LIGHT;
      }

      input[type="text"] {
        -webkit-appearance: none;
        &::placeholder {
          color: $COLOR_LIGHT;
        }
      }

      select {
        -webkit-appearance: none;
      }
    }

    button {
      font-family: $SANS_STACK;
      font-size: $FONT_SIZE_BASE;
      width: 60px;
      float: right;
      display: block;
      background: transparent;
      border: 1px solid $COLOR_GREY_2;
      color: $COLOR_LIGHT;
      border-radius: $BORDER_RADIUS;
      // outline: none;
      cursor: pointer;
      height: 30px;
      line-height: 20px;

      &:hover {
        border: 1px solid $COLOR_LIGHT;
      }

      &.close-chat {
        width: 40px;
        margin-left: $SPACE_S;
      }
    }

    .toolbar-item {
      font-size: $FONT_SIZE_BASE;
      margin-right: $SPACE_S;
      float: left;
      color: $COLOR_LIGHT;
      cursor: pointer;
      text-decoration: none;
      padding: $SPACE_XS 2px;
      height: 30px;

      &:hover {
        text-decoration: underline;
      }

      &.active {
        text-decoration: underline;
      }

      &.chat {
        border: 1px solid $COLOR_GREY_2;
        border-radius: $BORDER_RADIUS;
        padding: 5px;

        text-decoration: none;
        padding-right: $SPACE_L;
        padding-left: $SPACE_L;

        &:hover {
          border: 1px solid $COLOR_LIGHT;
        }
      }
    }
  }
</style>
