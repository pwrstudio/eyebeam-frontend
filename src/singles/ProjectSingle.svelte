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
        <svg
          aria-label="Go to project loaction on map"
          role="button"
          on:click={e => {
            dispatch("goToProject", {x: project.x, y: project.y})
          }}
          xmlns="http://www.w3.org/2000/svg" 
          enable-background="new 0 0 24 24" 
          height="24" 
          viewBox="0 0 24 24" 
          width="24">
            <rect fill="none" height="24" width="24"/><path d="M20,9.42V12h2V6h-6v2h2.58l-4.46,4.46c-0.39,0.39-1.02,0.39-1.41,0l-1.17-1.17c-1.17-1.17-3.07-1.17-4.24,0L2,16.59L3.41,18 l5.29-5.29c0.39-0.39,1.02-0.39,1.41,0l1.17,1.17c1.17,1.17,3.07,1.17,4.24,0L20,9.42z"/>
          </svg>  
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
      padding-top: $SPACE_S;
      padding-left: $SPACE_S;
      float: right;
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
