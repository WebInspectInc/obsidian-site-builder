import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	TAbstractFile
} from 'obsidian';
import {DEFAULT_SETTINGS, SBSettingTab, SBSettings} from "./settings"

// Remember to rename these classes and interfaces!

export default class ObsidianSB extends Plugin {
	settings: SBSettings;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'site-builder-command',
			name: 'Site builder command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SBSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, fileish: TAbstractFile) => {
				if (!(fileish instanceof TFile)) {
					menu.addItem((item) => {
						item
							.setTitle("Publish this folder 🚀")
							.setIcon("document")
							.onClick(async () => {
								new Notice(fileish.path);
							});
					});
				}
			})
		);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

