//===========================================================================
// Open Digital World - Multi-Language System Plugin v1.0.1
//===========================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.1] - Manage game texts in multiple languages.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-multi-language-system-plugin
 * @orderAfter VisuMZ_1_OptionsCore
 *
 * @help
 *------------------------------------------------------------------------------
 * Open Digital World - Multi-Language System Plugin
 *------------------------------------------------------------------------------
 *
 * This plugin allows you to reference and translate all the texts of the game
 * according to your needs. The texts are simply written in JSON files grouped
 * in specific folders by language. The choice of the active language in the
 * game is done only through the game options.
 *
 * This plugin is a full rewritten and extended version of the "Ignis - Text
 * Database" plugin by Raizen. Also inspired by some features present in the
 * "DKTools Localization" plugin by DK.
 *
 * Original sources:
 *    - https://github.com/comuns-rpgmaker/Ignis-Engine/blob/master/IgnisTextDatabase.js
 *    - https://dk-plugins.ru/mz/system/localization/
 *
 *------------------------------------------------------------------------------
 * How to use it?
 *------------------------------------------------------------------------------
 *
 * 1. Configure your plugin:
 *    - <Languages Option>: The label of the languages option.
 *    - <Languages Folder>: The folder containing all the languages files in
 *      subdirectories per language.
 *    - <Languages>: The list of all the languages used in the game, and for
 *      each:
 *       - <Language Code>: The code of this language, such as the ISO format.
 *       - <Language Label>: The label of this language, in its original
 *         translation.
 *       - <Language Folder>: The folder containing all the files for this
 *         language, put inside <Languages Folder>.
 *       - <Language Files>: The list of all files for this language, in the
 *         form of a list of filenames without the .json extension.
 *       - <Miss Label>: The label of the "Miss" text, in its original
 *         translation.
 *       - <ON Label>: The "ON" wording of the option value, in its original
 *         translation.
 *       - <OFF Label>: The "OFF" wording of the option value, in its original
 *         translation.
 *
 *    The first language in the <Languages> list will be the default language
 *    of the game. You can reorder them as you want in the option box.
 *
 *    About the <Miss Label>, the <ON Label> or the <OFF Label>, they can be a
 *    plain text or a text to translate (see point 5. below on how to do this).
 *    In a future version of RPG Maker MZ, these terms would probably be
 *    integrated into the editor's TextManager (see https://forums.rpgmakerweb
 *    .com/index.php?threads/make-the-miss-text-configurable.140449/).
 *
 * 2. Create a folder in your game project and name it as set in the parameter
 *    <Languages Folder>. The name is case sensitive.
 *
 * 3. In this folder, create a folder for each of your language and name it as
 *    set in the parameter <Languages -> Language Folder>. The name is case
 *    sensitive.
 *
 * 4. In each language folders, create as many language files as you need, and
 *    declare them in the parameter <Languages -> Language Files>. The name is
 *    case sensitive, and the content has to respect the JSON structure.
 *
 * 5. Develop your game and for each text to translate, use the following form:
 *    - In the text field of the RMMZ editor: ${<text code>}
 *    - In the language file: "<text code>": "<text to display in the language>"
 *    Don't forget to double escape your code like this:
 *       - \C[0] -> \\C[0] or \V[1] -> \\V[1]
 *    You can also nest texts together like this:
 *       - "Text1": "My text"
 *       - "Text2": "My text 1 is ${Text1}" -> My text 1 is My text
 *
 * 6. You can also use the following functions as Script Call in your game:
 *    - ODW.MLS.getCurrentIndex()
 *    - ODW.MLS.getCurrentCode()
 *    - ODW.MLS.getCurrentLabel()
 *
 * During a game play, go to the options to change the language by simply press
 * or click on the languages option. The texts will be translated instantly.
 *
 *------------------------------------------------------------------------------
 * You use VisuMZ_1_OptionsCore plugin?
 *------------------------------------------------------------------------------
 *
 * Follow the instructions below to configure the language option in your game.
 * Only the parameters to be changed are shown. The others can remain at their
 * default values.
 *
 * Symbol: languageIndex
 *    - JS Text:
 *       return ODW.MLS.getOption();
 * Functions:
 *    - JS Draw Option:
 *       // Declare Constants
 *       const index = arguments[1];
 *       const title = this.commandName(index);
 *       const rect = this.itemLineRect(index);
 *       const halfWidth = rect.width / 2;
 *       // Draw Command Name
 *       this.resetFontSettings();
 *       this.changePaintOpacity(true);
 *       this.drawTextEx(title, rect.x, rect.y, halfWidth, "left");
 *       // Draw Status Text
 *       this.drawText(this.statusText(index), rect.x + halfWidth, rect.y, halfWidth, "center");
 *    - JS Process OK:
 *       // Perform Actions
 *       this.processOk();
 *    - JS Cursor Right:
 *       // Perform Actions
 *       this.cursorRight();
 *    - JS Cursor Left:
 *       // Perform Actions
 *       this.cursorLeft();
 * Data:
 *    - JS Default Value:
 *       // Declare Constants
 *       const symbol = arguments[1];
 *       // Perform Actions
 *       ConfigManager[symbol] = 0;
 *
 *------------------------------------------------------------------------------
 * Terms of Use - License MIT
 *------------------------------------------------------------------------------
 *
 * Copyright (c) 2021 Open Digital World / Public Productions
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *------------------------------------------------------------------------------
 * Version History
 *------------------------------------------------------------------------------
 *
 * 21.10.2021 v1.0.0 - Initial release.
 * 19.09.2022 v1.0.1 - Fixed a processing bug when the text has the ${} pattern twice or more.
 *
 *------------------------------------------------------------------------------
 * Overrides of core functions
 *------------------------------------------------------------------------------
 *
 * New property:
 *   - ConfigManager.languageIndex
 *
 * New functions:
 *   - DataManager.loadLanguageFile
 *   - DataManager.onXhrLanguageFileLoad
 *   - DataManager.onXhrLanguageFileError
 *   - ConfigManager.readLanguageIndex
 *   - Window_Options.prototype.refreshLanguage
 *
 * Destructive declarations:
 *   - Object.defineProperty( TextManager, 'currencyUnit', {...} )
 *   - Scene_Boot.prototype.updateDocumentTitle
 *   - Sprite_Damage.prototype.createMiss
 *   - Window_Options.prototype.booleanStatusText
 *
 *------------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *------------------------------------------------------------------------------
 *
 * DKTools_Localization: rewrites some of the same core functions.
 *
 *------------------------------------------------------------------------------
 *
 *
 * @param option
 * @text Languages Option
 * @desc The label of the languages option.
 * @type string
 * @default Languages
 *
 * @param folder
 * @text Languages Folder
 * @desc The folder containing all the languages files in subdirectories per language.
 * @type string
 * @default languages
 *
 * @param languages
 * @text Languages
 * @desc The list of all the languages used in the game.
 * @type struct<Language>[]
 *
 */

/*~struct~Language:
 * @param code
 * @text Language Code
 * @desc The code of this language, such as the ISO format.
 * @type string
 * @default en
 *
 * @param label
 * @text Language Label
 * @desc The label of this language, in its original translation.
 * @type string
 * @default English
 *
 * @param folder
 * @text Language Folder
 * @desc The folder containing all the files for this language, put inside <Languages Folder>.
 * @type string
 * @default eng
 *
 * @param files
 * @text Language Files
 * @desc The list of all the files for this language.
 * @type string[]
 * @default ["main"]
 *
 * @param miss
 * @text Miss Label
 * @desc The label of the "Miss" text, in its original translation.
 * @type string
 * @default Miss
 *
 * @param on
 * @text ON Label
 * @desc The "ON" wording of the option value, in its original translation.
 * @type string
 * @default ON
 *
 * @param off
 * @text OFF Label
 * @desc The "OFF" wording of the option value, in its original translation.
 * @type string
 * @default OFF
 *
 */

var Imported = Imported || {};
Imported.ODW_MultiLanguageSystem = true;

var ODW = ODW || {};
ODW.MLS = ODW.MLS || {};
ODW.MLS.pluginName = "ODW_MultiLanguageSystem";
ODW.MLS.pluginVersion = [1, 0, 1];

(($) => {

	'use strict';

	/*
	 *------------------------------------------------------------------------------
	 * PLUGIN SETTINGS
	 *------------------------------------------------------------------------------
	 */

	const pluginParams = PluginManager.parameters(ODW.MLS.pluginName);

	// Declare plugin params.
	$._option = pluginParams.option;
	$._folder = pluginParams.folder;
	$._languages = JSON.parse(pluginParams.languages);

	/*
	 *------------------------------------------------------------------------------
	 * PLUGIN COMPATIBILITY
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Return the compatibility with VisuMZ_1_OptionsCore plugin.
	 *
	 * @return boolean
	 */
	$.isCompatibleWithVisuMZOptionsCore = function() {
		return Imported["VisuMZ_1_OptionsCore"];
	};

	/*
	 *------------------------------------------------------------------------------
	 * OPTION
	 *------------------------------------------------------------------------------
	 */

	/*
 	 * Return the label of the languages option.
 	 *
 	 * @return string
 	 */
 	$.getOption = function() {
 		return this._option;
 	};

	/*
	 *------------------------------------------------------------------------------
	 * FOLDER
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Return the roof folder of the languages files.
	 *
	 * @return string
	 */
	$.getFolder = function() {
		return this._folder;
	};

	/*
	 *------------------------------------------------------------------------------
	 * INDEX
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Return the current language index.
	 *
	 * @return integer
	 */
	$.getCurrentIndex = function() {
		return ConfigManager["languageIndex"];
	};

	/*
	 * Return the previous language index in the list.
	 *
	 * @return integer
	 */
	$.getPrevIndex = function() {
		let newIndex = ConfigManager["languageIndex"] - 1;
		if (newIndex < 0) {
			newIndex = this._languages.length - 1;
		}
		return newIndex;
	};

	/*
	 * Return the next language index in the list.
	 *
	 * @return integer
	 */
	$.getNextIndex = function() {
		let newIndex = ConfigManager["languageIndex"] + 1;
		if (newIndex >= this._languages.length) {
			newIndex = 0;
		}
		return newIndex;
	};

	/*
	 * Update the current language index.
	 *
	 * @param integer The new language index
	 *
	 * @return void
	 */
	$.updateIndex = function(newIndex) {
		if (this._languages.length > 0) {
			if (newIndex < this._levels.length) {
				ConfigManager["languageIndex"] = newIndex;
				ConfigManager.save();
			} else {
				this.logErrorIndex(newIndex, "New index not found in configured languages.");
			}
		} else {
			this.logError("No languages configured.");
		}
	};

	/*
	 *------------------------------------------------------------------------------
	 * CODE
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Return the list of the language codes.
	 *
	 * @return array
	 */
	$.getCodes = function() {
		let languageCodes = [];
		if (this._languages.length > 0) {
			for (let language of this._languages) {
				language = JSON.parse(language);
				languageCodes.push(this.getText(language.code));
			}
		} else {
			this.logError("No languages configured.");
		}
		return languageCodes;
	};

	/*
 	 * Return the language code for a specific language index.
 	 *
 	 * @param integer The language index
 	 *
 	 * @return string
 	 */
 	$.getCode = function(index) {
 		let languageCode = '';
 		if (this._languages.length > 0) {
 			if (index < this._languages.length) {
 				const language = JSON.parse(this._languages[index]);
 				languageCode = this.getText(language.code);
 			} else {
 				this.logErrorIndex(index, "No language code configured for this index.");
 			}
 		} else {
 			this.logError("No languages configured.");
 		}
 		return languageCode;
 	};

	/*
 	 * Return the language code for the current language index.
 	 *
 	 * @return string
 	 */
 	$.getCurrentCode = function() {
 		return this.getCode(this.getCurrentIndex());
 	};

	/*
	 *------------------------------------------------------------------------------
	 * LABEL
	 *------------------------------------------------------------------------------
	 */

 	/*
 	 * Return the list of the language labels.
 	 *
 	 * @return array
 	 */
 	$.getLabels = function() {
 		let languageLabels = [];
 		if (this._languages.length > 0) {
			for (let language of this._languages) {
				language = JSON.parse(language);
 				languageLabels.push(this.getText(language.label));
			}
 		} else {
 			this.logError("No languages configured.");
 		}
 		return languageLabels;
 	};

 	/*
 	 * Return the language label for a specific language index.
 	 *
 	 * @param integer The language index
 	 *
 	 * @return string
 	 */
 	$.getLabel = function(index) {
 		let languageLabel = '';
 		if (this._languages.length > 0) {
 			if (index < this._languages.length) {
 				const language = JSON.parse(this._languages[index]);
 				languageLabel = this.getText(language.label);
 			} else {
 				this.logErrorIndex(index, "No language label configured for this index.");
 			}
 		} else {
 			this.logError("No languages configured.");
 		}
 		return languageLabel;
 	};

	/*
 	 * Return the language label for the current language index.
 	 *
 	 * @return string
 	 */
 	$.getCurrentLabel = function() {
 		return this.getLabel(this.getCurrentIndex());
 	};

	/*
	 *------------------------------------------------------------------------------
	 * DATABASE
	 *------------------------------------------------------------------------------
	 */

	// Declare the language database.
	$._database = {};

	// Declare the language database loading status.
	$._isDatabaseLoaded = false;

	/*
	 * Load the database with the texts of the files corresponding to the current language index.
	 *
	 * @return void
	 */
	$.loadDatabase = function() {
		this._database = {};
		this._isDatabaseLoaded = false;
		const currentIndex = this.getCurrentIndex();
		if (this._languages.length > 0) {
			if (currentIndex < this._languages.length) {
				const language = JSON.parse(this._languages[currentIndex]);
				const languageFiles = JSON.parse(language.files);
				if (languageFiles.length > 0) {
					for (const file of languageFiles) {
						DataManager.loadLanguageFile(currentIndex, this._folder.concat('/') + language.folder.concat( '/' ) + file.concat( '.json'));
					}
					this._isDatabaseLoaded = true;
				} else {
					this.logErrorIndex(currentIndex, "No language files configured for this index.");
				}
			} else {
				this.logErrorIndex(currentIndex, "No languages configured for this index.");
			}
		} else {
			this.logError("No languages configured.");
		}
	};

	/*
	 * Return the status of the database loading process.
	 *
	 * @return boolean
	 */
	$.isDatabaseLoaded = function() {
		return this._isDatabaseLoaded;
	};

	/*
	 *------------------------------------------------------------------------------
	 * TEXT
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Return the text corresponding to the code included in the language files for the current language.
	 *
	 * @param string The text code as set in the editor text field
	 *
	 * @return string
	 */
	$.getText = function(oldText) {
		const regex = /\${([\w|\.]+)}/gm;
		let regexParts;
		let newText = oldText;
		while ((regexParts = regex.exec(oldText)) != null) {
			newText = newText.replace(regexParts[0], this.getTextDatabase(regexParts[1]));
		}
		return newText;
	};

	/*
	 * Return the text found in the databae corresponding to the text code.
	 *
	 * @param string The text code to find in the language file
	 *
	 * @return string
	 */
	$.getTextDatabase = function(textCode) {
		if (this._database.hasOwnProperty(textCode)) {
			return this._database[textCode];
		} else {
			return textCode;
		}
	};

	/*
	 *------------------------------------------------------------------------------
	 * TO REDRAW CORE SCRIPT
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Update the game title.
	 *
	 * @return void
	 */
	$.updateGameTitle = function() {
		document.title = this.getText($dataSystem.gameTitle);
	};

	/*
	 * Return the miss label for the current language index.
	 *
	 * @return string
	 */
	$.getMiss = function() {
		let missLabel = 'Miss';
		const currentIndex = this.getCurrentIndex();
		if (this._languages.length > 0) {
			if (currentIndex < this._languages.length) {
				const language = JSON.parse(this._languages[currentIndex]);
				missLabel = this.getText(language.miss);
			} else {
				this.logErrorIndex(currentIndex, "No languages configured for this index.");
			}
		} else {
			this.logError("No languages configured.");
		}
		return missLabel;
	};

	/*
	 * Return the ON label for the current language index.
	 *
	 * @return string
	 */
	$.getOn = function() {
		let onLabel = 'ON';
		const currentIndex = this.getCurrentIndex();
		if (this._languages.length > 0) {
			if (currentIndex < this._languages.length) {
				const language = JSON.parse(this._languages[currentIndex]);
				onLabel = this.getText(language.on);
			} else {
				this.logErrorIndex(currentIndex, "No languages configured for this index.");
			}
		} else {
			this.logError("No languages configured.");
		}
		return onLabel;
	};

	/*
	 * Return the OFF label for the current language index.
	 *
	 * @return string
	 */
	$.getOff = function() {
		let offLabel = 'OFF';
		const currentIndex = this.getCurrentIndex();
		if (this._languages.length > 0) {
			if (currentIndex < this._languages.length) {
				const language = JSON.parse(this._languages[currentIndex]);
				offLabel = this.getText(language.off);
			} else {
				this.logErrorIndex(currentIndex, "No languages configured for this index.");
			}
		} else {
			this.logError("No languages configured.");
		}
		return offLabel;
	};

	/*
	 *------------------------------------------------------------------------------
	 * LOG
	 *------------------------------------------------------------------------------
	 */

	/*
	 * Log the errors while processing a plugin parameters.
	 *
	 * @param string The error text
	 *
	 * @return void
	 */
	$.logError = function(error) {
		console.log("Plugin: " + this.pluginName + "\nError: " + error);
	};

	/*
	 * Log the errors while processing a language index.
	 *
	 * @param integer The language index that caused the error
	 * @param string  The error text
	 *
	 * @return void
	 */
	$.logErrorIndex = function(index, error) {
		console.log("Plugin: " + this.pluginName + "\nIndex: " + index + "\nError: " + error);
	};

	/*
	 * Log the errors while processing a language file.
	 *
	 * @param string The language file that caused the error
	 * @param string The error text
	 *
	 * @return void
	 */
	$.logErrorFile = function(file, error) {
		console.log("Plugin: " + this.pluginName + "\nFile: " + file + "\nError: " + error);
	};

})(ODW.MLS);

//===========================================================================
// Bitmap
//===========================================================================

const ODW_MLS_Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
	ODW_MLS_Bitmap_drawText.call(this, ODW.MLS.getText(text), x, y, maxWidth, lineHeight, align);
};

//===========================================================================
// DataManager
//===========================================================================

// New function.
DataManager.loadLanguageFile = function(index, src) {
	const xhr = new XMLHttpRequest();
	const url = src;
	xhr.open("GET", url);
	xhr.responseType = 'json';
	xhr.onload = () => this.onXhrLanguageFileLoad(xhr, index, src, url);
	xhr.onerror = () => this.onXhrLanguageFileError(index, src, url, "File not found.");
	xhr.send();
};

// New function.
DataManager.onXhrLanguageFileLoad = function(xhr, index, src, url) {
	if (xhr.status < 400) {
		try {
			const languageDatabase = ODW.MLS._database;
			const languageDatafile = xhr.response;
			if (languageDatafile) {
				ODW.MLS._database = {...languageDatabase, ...languageDatafile};
			} else {
				this.onXhrLanguageFileError(index, src, url, "JSON file structure incorrect.");
			}
		} catch (e) {
			this.onXhrLanguageFileError(index, src, url, e);
		}
	} else {
		this.onXhrLanguageFileError(index, src, url, "Xhr status " + xhr.status);
	}
};

// New function.
DataManager.onXhrLanguageFileError = function(index, src, url, e) {
	ODW.MLS.logErrorFile(src, e);
	const error = {index: index, src: src, url: url};
	this._errors.push(error);
};

//===========================================================================
// ConfigManager
//===========================================================================

// New property.
ConfigManager.languageIndex = 0;

const ODW_MLS_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = ODW_MLS_ConfigManager_makeData.call(this);
	config.languageIndex = this.languageIndex;
    return config;
};

const ODW_MLS_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	ODW_MLS_ConfigManager_applyData.call(this, config);
	this.languageIndex = this.readLanguageIndex(config, "languageIndex", 0);
};

// New function.
ConfigManager.readLanguageIndex = function(config, name, defaultValue) {
    if (name in config) {
        return config[name];
    } else {
        return defaultValue;
    }
}

//===========================================================================
// TextManager
//===========================================================================

const ODW_MLS_TextManager_basic = TextManager.basic;
TextManager.basic = function(basicId) {
	return ODW.MLS.getText(ODW_MLS_TextManager_basic.apply(this, arguments));
};

const ODW_MLS_TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
	return ODW.MLS.getText(ODW_MLS_TextManager_param.apply(this, arguments));
};

const ODW_MLS_TextManager_command = TextManager.command;
TextManager.command = function(commandId) {
	return ODW.MLS.getText(ODW_MLS_TextManager_command.apply(this, arguments));
};

const ODW_MLS_TextManager_message = TextManager.message;
TextManager.message = function(messageId) {
	return ODW.MLS.getText(ODW_MLS_TextManager_message.apply(this, arguments));
};

// Redraw.
Object.defineProperty( TextManager, 'currencyUnit', {
	get: function() {
		return ODW.MLS.getText($dataSystem.currencyUnit);
	},
	configurable: true
});

//===========================================================================
// Game_Message
//===========================================================================

const ODW_MLS_Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
	ODW_MLS_Game_Message_add.call(this, ODW.MLS.getText(text));
};

const ODW_MLS_Game_Message_setChoices = Game_Message.prototype.setChoices;
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
	choices = choices.map(choice => ODW.MLS.getText(choice));
	ODW_MLS_Game_Message_setChoices.call(this, choices, defaultType, cancelType);
};

//===========================================================================
// Scene_Boot
//===========================================================================

const ODW_MLS_Scene_Boot_isPlayerDataLoaded = Scene_Boot.prototype.isPlayerDataLoaded;
Scene_Boot.prototype.isPlayerDataLoaded = function() {
	const isCoreLoaded = ODW_MLS_Scene_Boot_isPlayerDataLoaded.call(this);
	if (isCoreLoaded) {
		if (ODW.MLS.isDatabaseLoaded()) {
			return true;
		} else {
			ODW.MLS.loadDatabase();
		}
	}
	return false;
};

// Redraw.
Scene_Boot.prototype.updateDocumentTitle = function() {
	ODW.MLS.updateGameTitle();
};

//===========================================================================
// Sprite_Damage
//===========================================================================

// Redraw.
Sprite_Damage.prototype.createMiss = function() {
    const h = this.fontSize();
    const w = Math.floor(h * 3.0);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.drawText(ODW.MLS.getMiss(), 0, 0, w, h, "center");
    sprite.dy = 0;
};

//===========================================================================
// Window_Base
//===========================================================================

const ODW_MLS_Window_Base_textWidth = Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
	return ODW_MLS_Window_Base_textWidth.call(this, ODW.MLS.getText(text));
};

const ODW_MLS_Window_Base_createTextState = Window_Base.prototype.createTextState;
Window_Base.prototype.createTextState = function(text, x, y, width) {
	return ODW_MLS_Window_Base_createTextState.call(this, ODW.MLS.getText(text), x, y, width);
};

const ODW_MLS_Window_Base_actorName = Window_Base.prototype.actorName;
Window_Base.prototype.actorName = function(n)  {
	return ODW.MLS.getText(ODW_MLS_Window_Base_actorName.apply(this, arguments));
};

const ODW_MLS_Window_Base_partyMemberName = Window_Base.prototype.partyMemberName;
Window_Base.prototype.partyMemberName = function(n) {
	return ODW.MLS.getText(ODW_MLS_Window_Base_partyMemberName.apply(this, arguments));
};

const ODW_MLS_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	return ODW.MLS.getText(ODW_MLS_Window_Base_convertEscapeCharacters.apply(this, arguments));
};

//===========================================================================
// Window_NameEdit
//===========================================================================

const ODW_MLS_Window_NameEdit_setup = Window_NameEdit.prototype.setup;
Window_NameEdit.prototype.setup = function(actor, maxLength) {
	ODW_MLS_Window_NameEdit_setup.apply(this, arguments);
	this._name = ODW.MLS.getText(this._name).slice(0, this._maxLength);
	this._index = this._name.length;
};

//===========================================================================
// Window_Options
//===========================================================================

// Redraw.
Window_Options.prototype.booleanStatusText = function(value) {
    return value ? ODW.MLS.getOn() : ODW.MLS.getOff();
};

const ODW_MLS_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	this.addCommand(ODW.MLS.getText(ODW.MLS.getOption()), "languageIndex");
	ODW_MLS_Window_Options_addGeneralOptions.call(this);
};

const ODW_MLS_Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);
	if (symbol === "languageIndex") {
		return ODW.MLS.getLabel(value);
	} else {
		return ODW_MLS_Window_Options_statusText.apply(this, arguments);
	}
};

const ODW_MLS_Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	const index = this.index();
    const symbol = this.commandSymbol(index);
	if (symbol === "languageIndex") {
		this.changeValue(symbol, ODW.MLS.getNextIndex());
		this.refreshLanguage();
	} else {
		ODW_MLS_Window_Options_processOk.apply(this);
	}
};

const ODW_MLS_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
	if (symbol === "languageIndex") {
		this.changeValue(symbol, ODW.MLS.getNextIndex());
		this.refreshLanguage();
	} else {
		ODW_MLS_Window_Options_cursorRight.apply(this);
	}
};

const ODW_MLS_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
	if (symbol === "languageIndex") {
		this.changeValue(symbol, ODW.MLS.getPrevIndex());
		this.refreshLanguage();
	} else {
		ODW_MLS_Window_Options_cursorLeft.apply(this);
	}
};

// New function.
Window_Options.prototype.refreshLanguage = function() {
	ODW.MLS.loadDatabase();
	setTimeout(function(){
		ODW.MLS.updateGameTitle();
		if (SceneManager._scene._optionsWindow) {
			SceneManager._scene._optionsWindow.refresh();
		}
		if (ODW.MLS.isCompatibleWithVisuMZOptionsCore()) {
			if (SceneManager._scene._categoryWindow) {
				SceneManager._scene._categoryWindow.refresh();
			}
			if (SceneManager._scene._helpWindow) {
				SceneManager._scene._helpWindow.refresh();
			}
		}
	}, 100);
};
