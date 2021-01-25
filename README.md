# Trust environment

Frontend built with the [Svelte](https://svelte.dev) framework, based on [sveltejs/template](https://github.com/sveltejs/template)

Using [pixi.js](https://github.com/pixijs/pixi.js/) for graphics and [colyseus.js](https://github.com/colyseus/colyseus) for networking.

## Development notes

Install the dependencies...

```bash
yarn
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

To create an optimised version of the app:

```bash
yarn build
```

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```
