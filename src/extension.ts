// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Executable
} from 'vscode-languageclient/node';

let client: LanguageClient;
const config = vscode.workspace.getConfiguration('LLVMLanguageServer');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel('LLVM Language Server');
	context.subscriptions.push(outputChannel);

	console.log('Congratulations, your extension "llvm-assembly-language-client" is now active!');

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the client for *.ll documents
		documentSelector: [{ scheme: 'file', language: 'llvm' }, { pattern: '**/*.ll' }],
		outputChannel: outputChannel
	};

	const serverExe: Executable = {
		command: config.lllsPath
	};

	const serverDebugExe: Executable = {
		command: config.lllsPath,
		args: ['-debug-only=llls-lsp-transport']
	};

	const serverOptions = {
		run: serverExe,
		debug: serverDebugExe
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'llls',
		'LLVM Language Server',
		serverOptions,
		clientOptions,
		true
	);

	client.start();
}

// this method is called when your extension is deactivated
export function deactivate() {}
