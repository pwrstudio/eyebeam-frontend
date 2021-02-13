<script>
  // # # # # # # # # # # # # #
  //
  //  VIDEO PLAYER
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import getVideoId from "get-video-id"

  // *** PROPS
  export let streamUrl = ""
  export let eventTitle = false
</script>

<div class="embed" in:fade={{ duration: 300, easing: quartOut }}>
  <a class="hidden-link" href="/pages/guide" aria-label="Show The Guide"
    >Show the guide</a>  
  <a class="hidden-link" href="/projects" aria-label="Show All Projects"
    >Show all projects</a>  
  <a class="hidden-link" href="/events" aria-label="Show All Events"
    >Show all events</a>  
  {#if streamUrl.includes("vimeo")}
    <div class="video-container">
      <iframe
        width="720"
        height="480"
        title={eventTitle ? eventTitle : "Livestream"}
        src={"https://player.vimeo.com/video/" +
          getVideoId(streamUrl).id +
          "?autoplay=1"}
        frameborder="no"
        scrolling="no"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen
      />
    </div>
  {:else if streamUrl.includes("youtube") || streamUrl.includes("youtu.be")}
    <div class="video-container">
      <iframe
        width="720"
        height="480"
        title={eventTitle ? eventTitle : "Livestream"}
        src={"https://www.youtube.com/embed/" +
          getVideoId(streamUrl).id +
          "?autoplay=1"}
        frameborder="no"
        allow="autoplay; fullscreen"
        allowfullscreen
      />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../responsive.scss";
  @import "../../world.theme.scss";

  .embed {
    width: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;

    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      width: 720px;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }
</style>
