#!/usr/bin/env node

/**
 * refresh.js
 * Run quick reload commands for your configs (tmux, waybar, etc.)
 */

const { exec } = require("child_process");

const commands = {
  tmux: "tmux source-file ~/.tmux.conf",
  waybar: "pkill waybar && waybar -l info -c ~/.config/waybar/config -s ~/.config/waybar/style.css",
};

// pick the command passed as an argument: e.g. `./refresh.js tmux`
const target = process.argv[2];

if (!target || !commands[target]) {
  console.error("Usage: refresh <tmux|waybar>");
  process.exit(1);
}

console.log(`[+] Running: ${commands[target]}`);
exec(commands[target], (error, stdout, stderr) => {
  if (error) {
    console.error(`[x] Error running ${target}:`, error.message);
    return;
  }
  if (stdout.trim()) console.log(stdout.trim());
  if (stderr.trim()) console.error(stderr.trim());
  console.log(`[✓] ${target} refreshed.`);
});
