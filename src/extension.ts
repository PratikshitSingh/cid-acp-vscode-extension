import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext): void {
  // Listen for every terminal command that finishes.
  // Exit code 127 is the POSIX standard for "command not found" (bash & zsh).
  const disposable = vscode.window.onDidEndTerminalShellExecution(
    (event: vscode.TerminalShellExecutionEndEvent) => {
      if (event.exitCode === 127) {
        const config = vscode.workspace.getConfiguration('cidAcp');
        const userPath: string = config.get('audioFilePath', '');

        // Use user override if set, otherwise fall back to bundled media/alert.mp3
        const audioPath = userPath.trim() || path.join(context.extensionPath, 'media', 'alert.mp3');

        const platform = process.platform;
        let cmd: string;
        if (platform === 'darwin') {
          cmd = `afplay "${audioPath}"`;
        } else if (platform === 'win32') {
          cmd = `powershell -c (New-Object Media.SoundPlayer '${audioPath}').PlaySync()`;
        } else {
          cmd = `aplay "${audioPath}"`;
        }

        exec(cmd, (err) => {
          if (err) {
            vscode.window.showWarningMessage(
              `CID-ACP: Could not play audio file. Check Settings > cidAcp.audioFilePath`
            );
          }
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
