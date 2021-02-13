<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE PROJECT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import get from "lodash/get"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"
  import { links } from "svelte-routing"
  import { createEventDispatcher } from "svelte"

  // *** COMPONENTS
  import ParticipantList from "../lists/ParticipantList.svelte"
  import EventList from "../lists/EventList.svelte"
  import MaterialItem from "./MaterialItem.svelte"
  import MetaData from "../MetaData.svelte"

  // *** PROPS
  export let project = {}

  const dispatch = createEventDispatcher()

</script>

<!-- METADATA -->
<MetaData post={project} />

<div class="project-single" in:fade use:links>
  <!-- HEADER -->

  {#if project.title}
    <!-- BACK LINK -->
    <div
      class="go-back"
      aria-label="Go back"
      role="button"
      tabindex="0"
      on:click={e => {
        window.history.back()
      }}
    >
      <svg
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        ><path
          d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
        /></svg
      >
    </div>
    <div class="main-header">
      <!-- COLOR CODE  -->
      <div class="color-icon {project.category}" role="presentation" />
      <!-- TITLE -->
      <h2 class="title">{project.title}</h2>
      <!-- PARTICIPANTS -->
      {#if get(project, "participants", false) && Array.isArray(project.participants)}
        <div class="participants">
          <ParticipantList
            participants={project.participants}
            messaging={true}
          />
        </div>
      {/if}
      <!-- GO TO PROJECT-->
      <div class="go-to-project">
        <div 
          class='go-to-project-inner'
          aria-label="Go to project location on map"
          role="button"
          tabindex="0"
          on:click={e => {
            dispatch("goToProject", {x: project.x, y: project.y})
          }}>
          <span>Go to project location on map</span>
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-map-pin">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </div>
    </div>
    <div class="divider" />
  {/if}

  <!-- TEXT -->
  {#if Array.isArray(get(project, "content.content", false))}
    <div class="text">
      {@html renderBlockText(project.content.content)}
    </div>
    <div class="divider" />
  {/if}

  <!-- MATERIAL -->
  {#if Array.isArray(project.material)}
    <div class="material">
      <div class="material-item header">
        <div class="row">
          <h2 class="title">Artist Media</h2>
          <div class="format">Type</div>
        </div>
      </div>
      {#each project.material as item (item._key)}
        <MaterialItem {item} />
      {/each}
    </div>
    <div class="divider" />
  {/if}

  <!-- RELATED EVENTS -->
  {#if Array.isArray(get(project, "connectedEvents", false))}
    <div class="related-events">
      <EventList events={project.connectedEvents} related={true} />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .project-single {
    .go-back {
      padding-top: $SPACE_XS;
      padding-left: $SPACE_S;
      cursor: pointer;
      svg {
        path {
          fill: $COLOR_GREY_2;
          transition: fill 0.3s $STANDARD_TRANSITION;
        }
      }
      &:hover {
        svg {
          path {
            fill: $COLOR_GREY_3;
          }
        }
      }
    }

    .go-to-project {
      display: inline-block;
      width: 100%;

      .go-to-project-inner {
        cursor: pointer;
        float: right;
        font-size: $FONT_SIZE_XSMALL;
        color: $COLOR_GREY_2;
        transition: color 0.3s $STANDARD_TRANSITION;
        svg {
          width: 16px;
          height: 16px;
          position: relative;
          top: 2px;
          path, circle {
            stroke: $COLOR_GREY_2;
            transition: stroke 0.3s $STANDARD_TRANSITION;
          }
        }
        &:hover {
          color: $COLOR_GREY_3;
          svg {
            path, circle {
              stroke: $COLOR_GREY_3;
            }
          }
        }
      }
    }

    .main-header {
      padding: $SPACE_M;
      padding-top: $SPACE_XS;

      .color-icon {
        display: none;
        height: 20px;
        width: 20px;
        margin-right: $SPACE_M;
        float: left;
        background: $COLOR_EXHIBITION;

        &.communication {
          background: $COLOR_COMMUNICATION;
        }
        &.consensus-building {
          background: $COLOR_CONSENSUS_BUILDING;
        }
        &.sensing {
          background: $COLOR_SENSING;
        }
        &.archiving {
          background: $COLOR_ARCHIVING;
        }
      }

      .title {
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_LARGE;
        font-weight: 600;
      }

      .participants {
        margin-top: $SPACE_XS;
        color: $COLOR_GREY_3;
        font-family: $MONO_STACK;
        font-size: $FONT_SIZE_SMALL;
        display: inline-block;
      }
    }

    .divider {
      border-bottom: 1px dotted $COLOR_GREY_1;
      width: 100%;
    }

    .material {
      padding: $SPACE_M;
    }

    @include text;

    .related-events {
      padding: $SPACE_M;
    }
  }

  .material-item {
    width: 100%;
    background: $COLOR_LIGHT;
    color: $COLOR_DARK;
    display: block;
    text-decoration: none;
    user-select: none;
    padding-top: $SPACE_XS;
    padding-bottom: $SPACE_XS;

    .row {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title {
        font-family: $SANS_STACK;
        font-weight: 600;
        white-space: nowrap;
      }

      .elips {
        margin-left: $SPACE_XS;
        margin-right: $SPACE_XS;
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        flex-shrink: 4;
        color: $COLOR_GREY_2;
      }

      .format {
        white-space: nowrap;
        color: $COLOR_GREY_2;
      }
    }

    cursor: pointer;

    &:hover {
      background: $COLOR_GREY_1;
    }

    &.header {
      padding-top: 0px;
      border-bottom: 1px dotted $COLOR_GREY_1;
      cursor: default;

      .archive-link {
        color: $COLOR_GREY_2;
        text-decoration: underline;
      }

      &:hover {
        background: unset;
      }
    }
  }
</style>
