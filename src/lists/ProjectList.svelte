<script>
  // # # # # # # # # # # # # #
  //
  //  PROJECTS LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import get from "lodash/get"
  import Fuse from "fuse.js"
  import { renderBlockText } from "../sanity.js"

  // COMPONENTS
  import ParticipantList from "./ParticipantList.svelte"

  // *** PROPS
  export let projects = []
  export let related = false

  // *** STORES
  import { globalSettings } from "../stores.js"

  // *** VARIABLES
  let filterTerm = ""
  let filteredProjects = []
  let orderedProjects = {}
  let fuseList = {}
  let sortOrder = "title"

  const titleSort = (a, b) => {
    const textA = a.title ? a.title.toUpperCase() : "Undefined"
    const textB = b.title ? b.title.toUpperCase() : "Undefined"
    return textA < textB ? -1 : textA > textB ? 1 : 0
  }

  const seminarSort = (a, b) => {
    const textA = a.category ? a.category.toUpperCase() : "Undefined"
    const textB = b.category ? b.category.toUpperCase() : "Undefined"
    return textA < textB ? -1 : textA > textB ? 1 : 0
  }

  // Order project based on title or seminar
  orderedProjects["title"] = [...projects].sort(titleSort)
  orderedProjects["seminar"] = [...projects].sort(seminarSort)

  // Options for the search library
  const FUSE_OPTIONS = {
    threshold: 0.2,
    keys: ["title", "category", "participants.name"],
  }

  fuseList["title"] = new Fuse(orderedProjects["title"], FUSE_OPTIONS)
  fuseList["seminar"] = new Fuse(orderedProjects["seminar"], FUSE_OPTIONS)

  // FILTER
  $: {
    if (filterTerm) {
      filteredProjects = fuseList[sortOrder]
        .search(filterTerm)
        .map(hit => hit.item)
    } else {
      filteredProjects = orderedProjects[sortOrder]
    }
  }
</script>

<div class="project-container">
  <!-- HEADER -->
  <div class="project-item header" class:related>
    <div class="inner">
      <div class="row">
        <div>{related ? "Connected Projects" : "Projects"}</div>
      </div>
    </div>
  </div>

  {#if !related}
    <!-- TEXT -->
    {#if Array.isArray(get($globalSettings, "projectOverview.content", false))}
      <div class="description">
        {@html renderBlockText($globalSettings.projectOverview.content)}
      </div>
    {/if}
    <!-- TOOLBAR -->
    <div class="toolbar">
      <div class="sort">
        <div>Sort by:</div>
        <select name="sortOrder" bind:value={sortOrder}>
          <option value="title" selected>Title</option>
          <option value="seminar">Type</option>
        </select>
      </div>
      <div class="filter">
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          ><path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          /></svg
        ><input
          type="[text]"
          role="search"
          aria-label="Search"
          placeholder="Search"
          bind:value={filterTerm}
        />
      </div>
    </div>
  {/if}
  <!-- CASE STUDIES -->
  {#each related ? projects : filteredProjects as project, index (project._id)}
    <a
      class="project-item"
      class:related
      href={"/projects/" + get(project, "slug.current", "")}
    >
      <div class="inner">
        <div class="color-icon {project.category}" />
        <div class="mid-section">
          <div class="title">{project.title}</div>
          <div class="participants">
            {#if get(project, "participants", false) && Array.isArray(project.participants)}
              <ParticipantList participants={project.participants} />
            {/if}
          </div>
        </div>
        <div class="date">
          {#if project.category}{project.category}{/if}
        </div>
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .project-container {
    height: 100%;
    color: $COLOR_DARK;
    font-family: $SANS_STACK;
    font-size: $FONT_SIZE_BASE;
    background: $COLOR_LIGHT;

    .project-item {
      padding: 0px $SPACE_S;
      padding-top: $SPACE_S;
      padding-bottom: $SPACE_S;
      width: 100%;
      background: $COLOR_LIGHT;
      color: $COLOR_DARK;
      display: inline-block;
      text-decoration: none;
      user-select: none;

      .inner {
        width: 100%;

        .color-icon {
          display: none;
          height: 10px;
          width: 10px;
          margin-right: $SPACE_M;
          float: left;
          margin-top: 4px;
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

        .mid-section {
          width: 60%;
          float: left;

          .title {
            font-family: $SANS_STACK;
            font-weight: 600;
          }

          .participants {
            font-family: $SANS_STACK;
            pointer-events: none;
            color: $COLOR_GREY_2;
            font-size: $FONT_SIZE_SMALL;
          }
        }

        .date {
          white-space: nowrap;
          color: $COLOR_GREY_2;
          float: right;
        }
      }

      transition: background 0.5s $STANDARD_TRANSITION;

      &:hover {
        background: $COLOR_GREY_1;
      }

      &.header {
        height: 45px;
        border-bottom: 1px solid $COLOR_GREY_1;
        background-color: white;
        &:hover {
          background: white !important;
        }
        &.related {
          background-color: unset;
          &:hover {
            background: unset !important;
          }
        }
        .archive-link {
          color: $COLOR_GREY_2;
          text-decoration: underline;
        }

        &:hover {
          background: unset;
        }
      }

      &.related {
        padding-left: 0;
        padding-right: 0;

        &.header {
          height: 30px;
          padding-top: 0;
        }
      }
    }

    .description {
      padding: $SPACE_S;
    }

    .toolbar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;
      padding: $SPACE_S;
      font-size: $FONT_SIZE_SMALL;
      border-bottom: 1px dotted $COLOR_GREY_1;
      margin-bottom: $SPACE_S;

      .sort {
        height: 100%;
        display: flex;
        align-items: center;

        select {
          margin-left: $SPACE_XS;
          font-size: $FONT_SIZE_SMALL;
          color: $COLOR_DARK;
          font-family: $SANS_STACK;
          border: none;
          background: $COLOR_LIGHT;
        }
      }

      .filter {
        height: 100%;
        display: flex;
        align-items: center;

        svg {
          margin-right: $SPACE_XS;
          path {
            color: $COLOR_GREY_1;
          }
        }
        input {
          width: 8ch;
          border: none;
          // outline: none;
          font-size: $FONT_SIZE_SMALL;
          color: $COLOR_DARK;
          font-family: $SANS_STACK;
          background: $COLOR_LIGHT;

          input[type="text"] {
            -webkit-appearance: none;
          }

          select {
            -webkit-appearance: none;
          }

          &:focus {
            border-bottom: 1px solid $COLOR_DARK;
            width: 16ch;
          }
        }
      }
    }
  }
</style>
