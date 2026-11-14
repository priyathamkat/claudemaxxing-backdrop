# claudemaxxing-backdrop

An animated backdrop for the Claude desktop app: programming and AI words drift across the
window while "Claudemaxxing..." is generated one token at a time.

[![Demo of the backdrop: words drifting behind a chat window while a phrase is generated token by token](assets/demo.gif)](assets/demo.mp4)

## What you see

- **A sea of words** drifts slowly from the top-left corner toward the bottom-right, in two
  layers: programming (`map`, `null`, `rustc`, `async`, `grep`, …) and AI (`attention`,
  `Anthropic`, `token`, `softmax`, `logits`, …).
- **Three diagonal lanes** each generate the phrase one token at a time
  (`Cl` · `aude` · `max` · `x` · `ing` · `...`), starting six seconds apart.
- **At every step** a few candidates appear in grey, one is chosen and lights up, and a line
  runs on to the next position.
- **The finished phrase** holds for a moment, fades, and starts again. One phrase takes about
  18 seconds.

It fills the whole window, so it does not depend on where the sidebar or other panels are.
The ground is transparent, with grey text and one orange accent, so it sits on top of
whatever theme you already use.

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
- **Behind the panels.** The app frosts its panels over the backdrop, so the scene is blurred
  behind the chat column and the sidebar and sharp in the gaps around them.
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
