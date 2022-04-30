import {App, Notice, PluginSettingTab, Setting} from "obsidian";
import ObsidianSB from "./main";


export interface SBSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: SBSettings = {
	mySetting: 'default'
}

export class SBSettingTab extends PluginSettingTab {
	plugin: ObsidianSB;

	constructor(app: App, plugin: ObsidianSB) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Site Builder settings.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
