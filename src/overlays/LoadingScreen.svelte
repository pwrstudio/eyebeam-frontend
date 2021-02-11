<script>
  // # # # # # # # # # # # # #
  //
  //  LOADING SCREEN
  //
  // # # # # # # # # # # # # #
</script>

<div class="loading-screen" aria-modal="true" role="dialog">
  <div class="box">
    <img src="/img/loading.gif" alt="Site is loading..." />
  </div>
</div>

<style lang="scss">
  @import "../responsive.scss";
  @import "../world.theme.scss";

  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;

    .box {
      font-family: $SANS_STACK;
      padding: 20px;
      font-size: 18px;
      text-align: center;
      user-select: none;

      @include screen-size("small") {
        font-size: 12px;
      }
    }
  }
</style>
