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

  let time = berlinTime()

  window.setInterval(() => {
    time = berlinTime()
  }, 10000)
</script>

<div class="clock-berlin">
  {time}&nbsp;CET
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .clock-berlin {
    font-family: $MONO_STACK;
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

    @include screen-size("small") {
      top: 80px;
      z-index: 1;
    }
  }
</style>
