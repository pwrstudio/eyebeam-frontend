<script>
  // # # # # # # # # # # # # #
  //
  //  CLOCK
  //
  // # # # # # # # # # # # # #

  const berlinTime = () => {
    const d = new Date()
    const cet = new Intl.DateTimeFormat("de-DE", {
      timeZone: "CET",
      hour: "numeric",
      minute: "numeric",
    }).format(d)
    return cet
  }

  const newYorkTime = () => {
    const d = new Date()
    const est = new Intl.DateTimeFormat("en-US", {
      timeZone: "EST",
      hour: "numeric",
      minute: "numeric",
    }).format(d)
    return est
  }

  let time = newYorkTime()

  window.setInterval(() => {
    time = newYorkTime()
  }, 10000)
</script>

<!-- 
<div class="clock-berlin">
  {time}&nbsp;CET
</div> -->
<div class="clock-new-york" aria-label="Current time" aria-hidden="true">
  <span>{time}</span>EST
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .clock-new-york {
    font-family: $SANS_STACK;
    font-size: $FONT_SIZE_SMALL;
    background: $COLOR_DARK_TRANSPARENT;
    color: $COLOR_LIGHT;
    z-index: 1001;
    position: absolute;
    top: 0;
    right: 0;
    padding: $SPACE_XS;
    word-spacing: -0.3em;

    a {
      color: white;
      text-decoration: none;
    }

    span {
      margin-right: 3px;
    }

    @include screen-size("small") {
      top: 80px;
      z-index: 1;
    }
  }
</style>
