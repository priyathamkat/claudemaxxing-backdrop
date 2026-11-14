# claudemaxxing-backdrop

An animated backdrop for the Claude desktop app: a small transformer that spells out
"Claudemaxxing..." one token at a time, behind your conversation.

[![Demo of the backdrop: a transformer diagram animating either side of a chat column](assets/demo.gif)](assets/demo.mp4)

## What you see

One loop takes 18 seconds, three per token (`Cl` · `aude` · `max` · `x` · `ing` · `...`):

1. **The text so far** grows by one token at the top left.
2. **Attention arcs** draw from the current token back to earlier ones, thicker where the
   attention is stronger.
3. **A pulse runs down the residual stream**, lighting `attn` and `mlp` in each of four layers.
4. **Next-token candidates settle** under the stream, and the winner lights up.
5. **The token's row of the attention map fills in** on the right.

Then the word holds for a moment, fades, and starts again.

Everything is drawn in the gutters either side of the chat column, so nothing sits behind
the text you are reading. The ground is transparent, with grey hairlines and one orange
accent, so it sits on top of whatever theme you already use.

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
- **Window size.** The layout is fitted to a wide desktop window. In a narrow window the
  gutters shrink and parts of the scene slide under the chat column.
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
