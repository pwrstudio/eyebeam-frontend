<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE USER PROFILE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import get from "lodash/get"
  import { fade } from "svelte/transition"
  import { renderBlockText, loadData } from "../sanity.js"
  import { links } from "svelte-routing"

  // *** GLOBALS
  import { QUERY } from "../global.js"

  // COMPONENTS
  import EventList from "../lists/EventList.svelte"
  import ProjectList from "../lists/ProjectList.svelte"
  import MetaData from "../MetaData.svelte"

  // *** STORES
  // import { localUserAuthenticated } from "../stores"

  // *** PROPS
  export let user = {}

  // *** VARIABLES
  let relatedProjects = false
  let relatedEvents = false
  let el = {}

  const relatedContent = loadData(QUERY.CONNECTED_TO_USER, {
    id: user._id,
  }).catch(err => {
    console.log(err)
  })

  relatedContent.then(relatedContent => {
    // __ Filter related content by type
    if (relatedContent && Array.isArray(relatedContent)) {
      relatedEvents = relatedContent.filter(c => c._type == "event")
      relatedProjects = relatedContent.filter(c => c._type == "project")
    }
  })

  // *** ON MOUNT
  onMount(async () => {
    el.querySelector('h2').focus()
  })
</script>

<!-- METADATA -->
<MetaData post={user} />

<div class="user-profile-single" bind:this={el} in:fade use:links>
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
  <!-- HEADER -->
  <div class="main-header">
    <!-- TITLE -->
    <h2 
    tabindex="0"
    class="title">
      {user.name}
    </h2>
  </div>
  <div class="divider" role="presentation" />

  <!-- BIOGRAPHY -->
  {#if Array.isArray(get(user, "biography.content", false))}
    <div class="text">
      {@html renderBlockText(user.biography.content)}
    </div>
    <div class="divider" />
  {/if}

  <!-- RELATED EVENTS -->
  <div class="related-events">
    {#if relatedEvents && Array.isArray(relatedEvents) && relatedEvents.length > 0}
      <EventList events={relatedEvents} related={true} />
    {/if}
  </div>

  <!-- CONNECTED PROJECTS -->
  <div class="connected-projects">
    {#if relatedProjects && Array.isArray(relatedProjects) && relatedProjects.length > 0}
      <ProjectList projects={relatedProjects} related={true} />
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .user-profile-single {
    .go-back {
      padding-top: $SPACE_S;
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

    .user-profile-message {
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

      .title {
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_LARGE;
        font-weight: bold;
      }

      .participants {
        margin-top: $SPACE_XS;
        color: $COLOR_GREY_2;
        font-family: $SANS_STACK;
        font-size: $FONT_SIZE_SMALL;
        display: inline-block;
      }
    }

    .divider {
      border-bottom: 1px dotted $COLOR_GREY_1;
      width: 100%;
    }

    @include text;

    .related-events {
      padding: $SPACE_M;
    }

    .connected-projects {
      padding: $SPACE_M;
      padding-top: 0;
    }
  }
</style>
