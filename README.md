# CID-ACP

Plays a bundled audio alert whenever you type an unknown command in the VS Code integrated terminal. No configuration needed — it works out of the box.

## Features

- Detects **exit code 127** (POSIX standard for "command not found") via the VS Code Shell Integration API.
- Plays any audio file you choose via a simple setting.
- Falls back to a notification message if no audio file is configured.
- Cross-platform playback: `afplay` (macOS), `aplay` (Linux), PowerShell `SoundPlayer` (Windows).

## Requirements

- VS Code **1.93.0** or newer (Shell Integration API).
- Shell Integration must be enabled (it is by default for bash, zsh, fish, and PowerShell).

## Extension Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| `faahExtension.audioFilePath` | `string` | `""` | Absolute path to the audio file to play on unknown command. Leave empty to show a notification instead. |

**Example** (in `settings.json`):
```json
"faahExtension.audioFilePath": "/Users/you/sounds/mySound.mp3"
```

## How to use

1. Install the extension.
2. Open **Settings** (`Cmd+,`) and search for `faahExtension`.
3. Set `Audio File Path` to the absolute path of your audio file.
4. Open a terminal and type any garbage command — your sound will play!

## Known Limitations

- Audio playback relies on system-level CLI tools (`afplay`, `aplay`, `powershell`). These are pre-installed on their respective platforms but require a working audio device.
- Shell Integration must be active for exit codes to be detected. If it's disabled, the extension will not fire.

## License

MIT
