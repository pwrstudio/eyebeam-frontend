<script>
  // # # # # # # # # # # # # #
  //
  //  Single Event
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import get from "lodash/get"
  import { fade } from "svelte/transition"
  import { renderBlockText, loadData } from "../../sanity.js"
  import { links } from "svelte-routing"

  // *** COMPONENTS
  import ParticipantList from "../../lists/ParticipantList.svelte"
  import ProjectList from "../../lists/ProjectList.svelte"
  import VideoPlayer from "./VideoPlayer.svelte"

  // *** GLOBAL
  import { QUERY } from "../../global.js"

  // *** PROPS
  export let event = {}
  export let url = ""

  let expanded = false
  let showVideo = true
  let connectedProjects = []

  if (event._id) {
    connectedProjects = loadData(QUERY.CONNECTED_PROJECTS, {
      id: event._id,
    }).catch(err => {
      console.dir(err)
    })
  }
</script>

<div class="event-single" in:fade use:links>
  {#if showVideo}
    <VideoPlayer streamUrl={url} />
  {/if}

  {#if event.title}
    <!-- HEADER -->
    <div class="main-header">
      <!-- TITLE -->
      <div class="title">{event.title}</div>
      <!-- ARROW DOWN -->
      <div
        class="expand"
        aria-label="Toggle information"
        role="button"
        tabindex="0"
        on:click={() => {
          expanded = !expanded
        }}
      >
        {#if expanded}
          <svg
            role="presentation"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4056 13.3681L8.20558 23.4681C7.90558 23.7681 7.90558 24.2681 8.20558 24.6681C8.50558 25.0681 9.00558 24.9681 9.40558 24.6681L20.0056 15.0681L30.6056 24.6681C30.9056 24.9681 31.5056 24.9681 31.8056 24.5681C32.1056 24.2681 32.1056 23.6681 31.7056 23.3681L20.5056 13.2681C20.4056 13.1681 20.2056 13.0681 20.0056 13.0681C19.7056 13.1681 19.5056 13.1681 19.4056 13.3681Z"
            />
          </svg>
        {:else}
          <svg
            role="presentation"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0556 25.9125C20.2556 25.9125 20.4556 25.8125 20.5556 25.7125L31.7556 15.6125C32.1556 15.3125 32.1556 14.8125 31.8556 14.4125C31.5556 14.0125 31.0556 14.0125 30.6556 14.3125L19.9556 23.9125L9.35558 14.3125C9.05558 14.0125 8.45558 14.0125 8.15558 14.3125C7.85558 14.6125 7.85558 15.2125 8.15558 15.5125L19.3556 25.6125C19.5556 25.8125 19.7556 25.9125 20.0556 25.9125Z"
            />
          </svg>
        {/if}
      </div>
      <!-- TOGGLE VIDEO -->
      <div
        class="toggleVideo"
        aria-label="Toggle video"
        role="button"
        tabindex="0"
        on:click={() => {
          showVideo = !showVideo
        }}
      >
        {#if showVideo}
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
          </svg>
        {:else}
          <svg
            role="presentation"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.7904 19.15H20.8904V10.25C20.8904 9.85 20.4904 9.45 20.0904 9.45C19.5904 9.45 19.2904 9.85 19.2904 10.25V19.15H10.2904C9.89042 19.15 9.49042 19.55 9.49042 20.05C9.49042 20.55 9.89042 20.85 10.2904 20.85H19.1904V29.75C19.1904 30.25 19.5904 30.55 19.9904 30.55C20.4904 30.55 20.7904 30.15 20.7904 29.75V20.85H29.6904C30.1904 20.85 30.4904 20.45 30.4904 20.05C30.5904 19.55 30.2904 19.15 29.7904 19.15Z"
            />
          </svg>
        {/if}
      </div>

      <!-- PARTICIPANTS -->
      <div class="participants">
        {#if get(event, "moderators", false) && Array.isArray(event.moderators)}
          <ParticipantList
            participants={event.moderators}
            messaging={true}
            isModerators
          />
        {/if}
        {#if get(event, "participants", false) && Array.isArray(event.participants)}
          <ParticipantList participants={event.participants} messaging={true} />
        {/if}
      </div>
    </div>
    <div class="divider" />

    {#if expanded}
      <!-- TEXT -->
      {#if Array.isArray(get(event, "content.content", false)) && event.content.content.length > 0}
        <div class="text">
          {@html renderBlockText(event.content.content)}
        </div>
        <div class="divider" />
      {/if}

      <!-- CONNECTED CASE STUDIES -->
      <div class="connected-projects">
        {#if Array.isArray(get(event, "connectedProjects")) && event.connectedProjects.length > 0}
          <ProjectList projects={event.connectedProjects} related={true} />
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  @import "../../responsive.scss";
  @import "../../world.theme.scss";

  .event-single {
    .main-header {
      padding: $SPACE_M;
      position: relative;
      user-select: none;

      .title {
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_LARGE;
        font-weight: bold;
        max-width: calc(100% - 40px);
      }

      .expand {
        position: absolute;
        top: 8px;
        right: 40px + $SPACE_XS;
        color: $COLOR_GREY_2;
        opacity: 0.4;
        cursor: pointer;
        transition: opacity 0.3s $STANDARD_TRANSITION;

        &:hover {
          opacity: 0.7;
        }
      }

      .toggleVideo {
        position: absolute;
        top: 8px;
        right: $SPACE_XS;
        color: #000000;
        opacity: 0.4;
        cursor: pointer;
        transition: opacity 0.3s $STANDARD_TRANSITION;
        // font-size: 36px;
        // -webkit-text-stroke: 1px;

        &:hover {
          opacity: 0.7;
        }
      }

      .participants {
        font-family: $SANS_STACK;
        font-weight: normal;

        margin-top: $SPACE_XS;
        color: $COLOR_GREY_3;
        font-size: $FONT_SIZE_SMALL;
        display: inline-block;
      }
    }

    .divider {
      border-bottom: 1px dotted $COLOR_GREY_1;
      width: 100%;
    }

    .date {
      padding: $SPACE_M;
      text-align: center;
      font-weight: bold;
      font-family: $SANS_STACK;
    }

    .image {
      width: 100%;
      padding-top: $SPACE_M;
      padding-bottom: $SPACE_M;

      img {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
      }
    }

    @include text;

    .connected-projects {
      padding: $SPACE_M;
    }
  }
</style>
