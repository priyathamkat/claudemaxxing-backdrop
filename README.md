# claudemaxxing-backdrop

An animated backdrop for the Claude desktop app: a small transformer that spells out
"Claudemaxxing..." one token at a time, beside your conversation.

[![Demo of the backdrop: a transformer diagram animating between the sidebar and the chat column](assets/demo.gif)](assets/demo.mp4)

## What you see

One loop takes 18 seconds, three per token (`Cl` · `aude` · `max` · `x` · `ing` · `...`):

1. **The text so far** grows by one token at the top.
2. **A pulse runs down the residual stream**, lighting `attn` and `mlp` in each of four layers.
3. **Next-token candidates settle** under the stream, and the winner lights up.
4. **Attention arcs** draw from the current token back to earlier ones, thicker where the
   attention is stronger.
5. **The token's row of the attention map fills in** below the arcs.

Then the word holds for a moment, fades, and starts again.

Everything is drawn as one slim column in the gutter between the sidebar and the chat
column, so nothing sits behind the text you are reading. The ground is transparent, with
grey hairlines and one orange accent, so it sits on top of whatever theme you already use.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install claudemaxxing-backdrop --marketplace priyathamkat/claudemaxxing-backdrop
```

Answer `y` to add the marketplace, then pick a scope (the user scope loads it in every session).

From a shell:

```bash
claude plugin install claudemaxxing-backdrop --marketplace priyathamkat/claudemaxxing-backdrop
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then
**Plugins**, **Add marketplace** with `priyathamkat/claudemaxxing-backdrop`, then **Add plugin**.

## Good to know

- **Where it draws.** Backdrops are drawn by the Claude desktop and mobile apps. The terminal
  and editor extensions draw nothing. It has been tested on the desktop app in dark mode only.
- **Early-access API.** This is a Claude Code mod (a plugin with a hooks module). The mod API
  is early access and may change between releases; this was built against Claude Code 2.1.325.
- **Window size.** The column needs a gutter of roughly 330 pixels between the sidebar and
  the chat column, which a wide desktop window has. In a narrower window the gutter shrinks
  and the right part of the scene slides under the chat column.
- **Sidebar.** The scene is placed for an open sidebar. With the sidebar closed, the chat
  column moves left and covers part of it.
- **Reduce Motion.** The scene keeps animating when the system's Reduce Motion setting is on.
  If you want it still, remove the mod.
- **One theme at a time.** A session has one theme, the latest set, so this replaces a backdrop
  set by another mod.

## Uninstall

```bash
claude plugin uninstall claudemaxxing-backdrop
```

## License

[MIT](LICENSE). An unofficial community mod, not affiliated with or endorsed by Anthropic.
