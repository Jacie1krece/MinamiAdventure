//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.09] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   - Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 *   - The "NEW!" text will not appear on auto save slots. This is intentional.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: December 16, 2021
 * * Bug Fixes!
 * ** Fixed default Plugin Parameters where the Autosave option was not
 *    properly working without the Options Core. Fix made by Olivia.
 * * Documentation Update!
 * ** Added further documentation on "Plugin Parameters: Style Settings"
 * ** Removal of "Start Enabled?" setting.
 * *** The "NEW!" text will not appear on auto save slots. This is intentional.
 * * Feature Update!
 * ** Plugin Parameter > Auto Save Settings > Start Enabled? is now removed.
 * *** This is due to it going against what RPG Maker MZ is supposed to behave
 *     like, causing potential misunderstandings when other autosave related
 *     features are utilized. Update made by Olivia.
 * 
 * Version 1.07: October 14, 2021
 * * Bug Fixes!
 * ** Fixed bugs caused by Core Engine's digit grouping that would make dates
 *    appear incorrectly. Fix made by Olivia.
 * 
 * Version 1.06: July 16, 2021
 * * Compatibility Update!
 * ** Compatibility update with Party System's max member change to fit a non-
 *    default amount of party members inside of the window. Update by Irina.
 * 
 * Version 1.05: May 14, 2021
 * * Feature Update!
 * ** Confirmation windows now have rounded coordinates to prevent distortions.
 *    Update made by Arisu.
 * 
 * Version 1.04: March 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug where using the Plugin Command to save the current slot would
 *    not reload properly if the audio file BGM was not synched. Fix made by
 *    Arisu.
 * 
 * Version 1.03: November 29, 2020
 * * Bug Fixes!
 * ** Displayed month should now show the correct numeric value.
 *    Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:eval":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x383e57=_0x2333;function _0x2333(_0x27bd89,_0x1ec2a0){const _0x495d1b=_0x495d();return _0x2333=function(_0x2333f6,_0x54941a){_0x2333f6=_0x2333f6-0xc5;let _0x54aa03=_0x495d1b[_0x2333f6];return _0x54aa03;},_0x2333(_0x27bd89,_0x1ec2a0);}(function(_0x3f9785,_0x61c1f8){const _0x6c76dd=_0x2333,_0x5f4ab9=_0x3f9785();while(!![]){try{const _0x20624c=parseInt(_0x6c76dd(0x226))/0x1*(parseInt(_0x6c76dd(0x210))/0x2)+-parseInt(_0x6c76dd(0xf4))/0x3*(-parseInt(_0x6c76dd(0x20f))/0x4)+-parseInt(_0x6c76dd(0x255))/0x5*(-parseInt(_0x6c76dd(0x272))/0x6)+parseInt(_0x6c76dd(0x1d8))/0x7+-parseInt(_0x6c76dd(0x223))/0x8+parseInt(_0x6c76dd(0x1eb))/0x9*(parseInt(_0x6c76dd(0x1b4))/0xa)+-parseInt(_0x6c76dd(0x1c4))/0xb*(parseInt(_0x6c76dd(0x1a9))/0xc);if(_0x20624c===_0x61c1f8)break;else _0x5f4ab9['push'](_0x5f4ab9['shift']());}catch(_0x3bc090){_0x5f4ab9['push'](_0x5f4ab9['shift']());}}}(_0x495d,0x26315));function _0x495d(){const _0x38a8cb=['right','changeTextColor','switches','Game_Switches_value','AutosaveMaxCount','getSaveDescription','saveConfirmationWindowRect','executeAutosave','setSavePicture','VisuMZ_0_CoreEngine','DataManager_makeSavefileInfo','getTimestamp','gameId','okatL','catch','setSavefileId','constructor','openness','ARRAYJSON','drawFileData','VisuMZ_1_MainMenuCore','Scene_Title_initialize','svbattlersForSaveFile','create','openSaveConfirmationWindow','BoxCols','open','_loadSuccess','ARRAYEVAL','ceil','ConfigManager_makeData','drawTimestamp','ListFileDataJS','commandNewGameSaveCoreLocked','SaveStyle','ARRAYSTR','ConfirmRect','VocabSaveFailure','drawLargeStyleFileData','drawListStyleFileData','itemRect','drawTextEx','prototype','YptPz','drawCurrencyValue','bnmml','saveDescription','forageTestKey','Filename','autosaveType','onBeforeSave','RemoveSaveCoreCache','Game_System_initialize','STRUCT','maxCommands','isNwjs','sprite','face','gradientFillRect','AfterMenuCall','autosave','filePath','onAfterLoad','drawTitle','drawVerticalStyleContents','ConvertParams','globalSwitches','Default','_autosaveConfirmWindow','ocyPn','VIdWx','drawBackground','FilenameFmt','menuStyle','onLoadFailure','ocCmd','fEgqo','includes','Game_Variables_value','_saveConfirmWindow','resetFontSettings','trim','svbattlers','filter','pwIIO','drawCharacter','{{%1}}','579924oqqrPz','LatestText','single','Scene_Title_terminate','Window_Options_addGeneralOptions','actorStyle','Enable','box','_listWindow','drawCenteredPicture','ActorGraphic','11850MWaAFM','saveGame','AutosaveRequest','GlobalVariables','globalVariables','reloadMapIfUpdated','bind','drawSvBattlerSprites','DataManager_createGameObjects','Duration','savePicture','Scene_Options_maxCommands','shouldAutosave','selectSavefile','rxrQF','SaveDescription','187zUHESU','AutosaveOption','createSaveConfirmationWindow','_savefileId','SavePicture','commandContinueSaveCoreSingle','globalValue','savefileIdToIndex','executeSave','hBNrR','getColorDataFromPluginParameters','setSaveDescription','initSaveCore','parameters','drawLargeStyleContents','Scene_Menu_create','saveFailure','onAutosaveFailure','advanced','loadFailureConfirmationWindow','2123779ujHyBi','AutosaveConfirm','isEnabled','Window_SavefileList_setMode','contentsBack','MakeSavefileInfoJS','gold','AutosaveEnable','autosaveSuccess','VertCols','BoxFileDataJS','pickLockedSaveSlot','Game_System_savefileId','drawBoxStyleFileData','getDate','AutosaveForce','VertRows','SaveMenuStyle','onSaveCoreLoadFailure','1287UwuxNX','height','Name','ussCn','variables','file','setMode','ARRAYFUNC','Scene_Load_onLoadSuccess','Scene_Save_executeSave','KWFXT','WlSfu','addSaveCoreAutosaveCommand','AuGJj','drawListStyleContents','Settings','ListRows','floor','isAutosaveEnabled','updateFade','process_VisuMZ_SaveCore_Settings','call','dimColor2','Scene_Boot_onDatabaseLoaded','setFadeSpeed','activateListWindow','useDigitGrouping','SaveCurrentSlot','OnSaveSuccessJS','Scene_Map_onTransferEnd','battleMembers','parse','fadeOutAll','changePaintOpacity','drawText','makeData','4qRpHFF','14IJMOVW','RequestsRequireSaveEnable','indexToSavefileId','battle','clear','isSaveEnabled','playLoad','partyMemberName','determineAutosaveBypass','setupNewGame','mNJzH','getHours','drawLatestMarker','onSaveCoreSaveFailure','loadSvActor','commandNewGame','goto','onSaveCoreSaveSuccess','onAutosaveSuccess','783416UEbyqV','exitMenu','AdjustRect','37699wyjOUL','setValue','number','textColor','AutosaveType','Scene_Menu_commandSave','ParseTextCodes','drawFace','terminate','gsAiO','replace','initialize','loadPicture','innerHeight','smoothSelect','latestSavefile','save','_saveCorePluginCommandSave','NyBMB','isSaveConfirmWindowEnabled','process_VisuMZ_SaveCore_Switches_Variables','autosaveConfirmationWindowRect','GlobalSwitches','registerCommand','drawPicture','LargeRows','SaveConfirm','onLoadSuccess','eNpSg','EEMUB','onTransferEnd','svActorHorzCells','blt','SaveMenu','fadeIn','saveMenuSvBattlerWidth','min','length','drawContentsLoaded','BoxRows','onSaveSuccess','hjpXo','drawPlaytime','Text','savefileInfo','commandSaveLocked','forceAutosave','24655LimJyZ','Scene_Title_commandContinue','saveSuccess','drawContents','drawBoxStyleContents','VocabSaveSuccess','VocabLockedSaveSlot','makeSavename','return\x200','savefileId','width','_pickLockedSaveSlot','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','hLjfD','fLaYq','closeAutosaveConfirmationWindow','maxBattleMembers','then','UrEai','_processingAutosave','windowPadding','saveMenuSpriteWidth','ListContentsJS','map','sBePV','LargeCols','ScreenPosition','drawSvActor','both','354pNONyy','enableAutosave','tmiHf','Scene_Base_requestAutosave','value','_fadeSpeed','drawCurrency','exit','close','getSeconds','numVisibleRows','format','addChild','mainCommandWidth','svbattler','setSetSuccess','AutosaveExecute','removeChild','mGgJU','isBattleTest','EfKCQ','BvoJj','VisuMZ_1_MessageCore','popScene','Game_Variables_setValue','timestamp','getMonth','TestKey','onDatabaseLoaded','contentsOpacity','LocalMode','loadFailure','Scene_Base_onAutosaveFailure','lXHTh','locked','faces','RCeRF','SpriteWidth','OnLoadSuccessJS','CVWfX','battlerName','SaveCore','autosaveOption','textSizeEx','onMapLoaded','update','left','setGlobalValue','playtime','#%1','OnAutosaveSuccessJS','AfterTransfer','_commandWindow','match','Scene_Map_onMapLoaded','playSave','ListCols','Save','saveCurrentSlot','ecODT','createGameObjects','isAutosaveCompatible','toxMG','JxYfm','144747NmSoWP','openAutosaveConfirmationWindow','iDJrP','saveStyle','round','large','eKSPF','updatePosition','name','JepvZ','OnLoadFailureJS','requestAutosave','createContents','toUpperCase','max','isPreviousScene','innerWidth','resetWordWrap','fadeOut','status','lnQDL','isGlobal','drawActorFaces','AddOption','characters','ConfigManager_applyData','padStart','Scene_Save_helpWindowText','file0','latestSavefileId','AfterExitMenu','createAutosaveConfirmationWindow','setWordWrap','gqIQt','current','addGeneralOptions','version','_success','LargeFileDataJS','applyData','OnSaveFailureJS','autosaveEnabled','contents','_colorCache','JceaR','latestSave','actorName','commandContinue','getScreenPosition','Scene_Title_commandNewGame','VocabAutosaveSuccess','addSaveCoreCommands','_bypassAutosave','playBuzzer','Scene_Base_onAutosaveSuccess','NUM','maxSavefiles','onSaveCoreLoadSuccess','WZvge','svActorVertCells','center','push','onSaveFailure','description','AfterBattle','autosaveFailure','itemPadding','picture','lwMIp','transfer','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','join','STR','optAutosave','Game_Switches_setValue','drawActorSprites','fileDirectoryPath','_active','EVAL','refresh','commandSave','OnAutosaveFailureJS','callMenu','addLoadListener','_scene','closeSaveConfirmationWindow','Autosave','_SaveCoreSettings','MAX_BATTLE_MEMBERS','vertical','currencyUnit','kXwAb','inBattle','cyPDc'];_0x495d=function(){return _0x38a8cb;};return _0x495d();}var label=_0x383e57(0xdd),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x383e57(0x1a5)](function(_0x368d79){const _0x32944a=_0x383e57;return _0x368d79[_0x32944a(0x107)]&&_0x368d79[_0x32944a(0x133)][_0x32944a(0x19f)]('['+label+']');})[0x0];VisuMZ[label][_0x383e57(0x1fa)]=VisuMZ[label][_0x383e57(0x1fa)]||{},VisuMZ[_0x383e57(0x193)]=function(_0x143fc6,_0x338199){const _0x58154b=_0x383e57;for(const _0x2c20a6 in _0x338199){if('AFnHm'===_0x58154b(0x242))_0x548a77=_0x565063['replace'](/\\P\[(\d+)\]/gi,(_0x29848e,_0x4f8f6d)=>_0x3ceb91[_0x58154b(0x17c)]['partyMemberName'](_0x4b78bd(_0x4f8f6d)));else{if(_0x2c20a6[_0x58154b(0xe9)](/(.*):(.*)/i)){const _0x151081=String(RegExp['$1']),_0x2423af=String(RegExp['$2'])[_0x58154b(0x101)]()[_0x58154b(0x1a3)]();let _0x19f982,_0x5da94f,_0x499480;switch(_0x2423af){case _0x58154b(0x12b):_0x19f982=_0x338199[_0x2c20a6]!==''?Number(_0x338199[_0x2c20a6]):0x0;break;case'ARRAYNUM':_0x5da94f=_0x338199[_0x2c20a6]!==''?JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6]):[],_0x19f982=_0x5da94f['map'](_0x3de524=>Number(_0x3de524));break;case _0x58154b(0x142):_0x19f982=_0x338199[_0x2c20a6]!==''?eval(_0x338199[_0x2c20a6]):null;break;case _0x58154b(0x16e):_0x5da94f=_0x338199[_0x2c20a6]!==''?JSON['parse'](_0x338199[_0x2c20a6]):[],_0x19f982=_0x5da94f[_0x58154b(0x26c)](_0xbdd190=>eval(_0xbdd190));break;case'JSON':_0x19f982=_0x338199[_0x2c20a6]!==''?JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6]):'';break;case _0x58154b(0x164):_0x5da94f=_0x338199[_0x2c20a6]!==''?JSON['parse'](_0x338199[_0x2c20a6]):[],_0x19f982=_0x5da94f[_0x58154b(0x26c)](_0x1dc497=>JSON['parse'](_0x1dc497));break;case'FUNC':_0x19f982=_0x338199[_0x2c20a6]!==''?new Function(JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6])):new Function(_0x58154b(0x25d));break;case _0x58154b(0x1f2):_0x5da94f=_0x338199[_0x2c20a6]!==''?JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6]):[],_0x19f982=_0x5da94f[_0x58154b(0x26c)](_0x4841cd=>new Function(JSON['parse'](_0x4841cd)));break;case _0x58154b(0x13c):_0x19f982=_0x338199[_0x2c20a6]!==''?String(_0x338199[_0x2c20a6]):'';break;case _0x58154b(0x175):_0x5da94f=_0x338199[_0x2c20a6]!==''?JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6]):[],_0x19f982=_0x5da94f['map'](_0x2b7ce5=>String(_0x2b7ce5));break;case _0x58154b(0x187):_0x499480=_0x338199[_0x2c20a6]!==''?JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6]):{},_0x143fc6[_0x151081]={},VisuMZ[_0x58154b(0x193)](_0x143fc6[_0x151081],_0x499480);continue;case'ARRAYSTRUCT':_0x5da94f=_0x338199[_0x2c20a6]!==''?JSON[_0x58154b(0x20a)](_0x338199[_0x2c20a6]):[],_0x19f982=_0x5da94f[_0x58154b(0x26c)](_0x5619ba=>VisuMZ['ConvertParams']({},JSON[_0x58154b(0x20a)](_0x5619ba)));break;default:continue;}_0x143fc6[_0x151081]=_0x19f982;}}}return _0x143fc6;},(_0xd646c7=>{const _0x45ef54=_0x383e57,_0x54ee23=_0xd646c7[_0x45ef54(0xfc)];for(const _0x51010a of dependencies){if(!Imported[_0x51010a]){if(_0x45ef54(0x19d)==='ocCmd'){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x45ef54(0x27d)](_0x54ee23,_0x51010a)),SceneManager[_0x45ef54(0x279)]();break;}else return _0x5ea20b[_0x45ef54(0xdd)]['Settings'][_0x45ef54(0xed)][_0x45ef54(0xd2)];}}const _0x24ef33=_0xd646c7[_0x45ef54(0x133)];if(_0x24ef33['match'](/\[Version[ ](.*?)\]/i)){const _0x3c4029=Number(RegExp['$1']);if(_0x3c4029!==VisuMZ[label][_0x45ef54(0x118)]){if(_0x45ef54(0x115)==='gqIQt')alert(_0x45ef54(0x261)[_0x45ef54(0x27d)](_0x54ee23,_0x3c4029)),SceneManager[_0x45ef54(0x279)]();else{if(!_0x4b2504[_0x45ef54(0xf1)]()||_0x24c2fe['inBattle']())return;_0x19e343[_0x45ef54(0x148)]['executeAutosave']();}}}if(_0x24ef33[_0x45ef54(0xe9)](/\[Tier[ ](\d+)\]/i)){if(_0x45ef54(0xdb)===_0x45ef54(0x108))_0x4f114d=_0x41dba7+_0x52ce08-_0x4138d2;else{const _0x1933aa=Number(RegExp['$1']);_0x1933aa<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x45ef54(0x27d)](_0x54ee23,_0x1933aa,tier)),SceneManager[_0x45ef54(0x279)]()):tier=Math[_0x45ef54(0x102)](_0x1933aa,tier);}}VisuMZ[_0x45ef54(0x193)](VisuMZ[label][_0x45ef54(0x1fa)],_0xd646c7[_0x45ef54(0x1d1)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x383e57(0x1df),_0x80b0d2=>{const _0x565872=_0x383e57;if(!DataManager[_0x565872(0xf1)]())return;VisuMZ['ConvertParams'](_0x80b0d2,_0x80b0d2);if($gameSystem)$gameSystem[_0x565872(0x273)](_0x80b0d2[_0x565872(0x1af)]);}),PluginManager['registerCommand'](pluginData[_0x383e57(0xfc)],_0x383e57(0x1b6),_0x493dda=>{const _0x4ec4d3=_0x383e57;if(!DataManager[_0x4ec4d3(0xf1)]()||$gameParty[_0x4ec4d3(0x150)]())return;SceneManager[_0x4ec4d3(0x148)][_0x4ec4d3(0xff)]();}),PluginManager[_0x383e57(0x23d)](pluginData[_0x383e57(0xfc)],_0x383e57(0x282),_0x58ec67=>{const _0x3fb25a=_0x383e57;if(!DataManager['isAutosaveCompatible']()||$gameParty[_0x3fb25a(0x150)]())return;SceneManager['_scene']['executeAutosave']();}),PluginManager['registerCommand'](pluginData['name'],_0x383e57(0x1e7),_0x41001c=>{const _0x4084dc=_0x383e57;if(!DataManager[_0x4084dc(0xf1)]()||$gameParty['inBattle']())return;SceneManager['_scene'][_0x4084dc(0x254)]();}),PluginManager[_0x383e57(0x23d)](pluginData['name'],_0x383e57(0x206),_0x21ae6c=>{const _0x7cf53d=_0x383e57;SceneManager[_0x7cf53d(0x148)][_0x7cf53d(0xee)]();}),PluginManager['registerCommand'](pluginData['name'],_0x383e57(0x1c3),_0x3b6b9e=>{const _0x4fa34c=_0x383e57;VisuMZ[_0x4fa34c(0x193)](_0x3b6b9e,_0x3b6b9e);if($gameSystem)$gameSystem[_0x4fa34c(0x1cf)](_0x3b6b9e[_0x4fa34c(0x251)]);}),PluginManager[_0x383e57(0x23d)](pluginData[_0x383e57(0xfc)],_0x383e57(0x1c8),_0x16c17c=>{const _0x163084=_0x383e57;VisuMZ[_0x163084(0x193)](_0x16c17c,_0x16c17c);if($gameSystem)$gameSystem[_0x163084(0x15a)](_0x16c17c[_0x163084(0x182)]);}),VisuMZ[_0x383e57(0xdd)][_0x383e57(0x202)]=Scene_Boot[_0x383e57(0x17c)][_0x383e57(0xd0)],Scene_Boot[_0x383e57(0x17c)][_0x383e57(0xd0)]=function(){const _0x40886a=_0x383e57;VisuMZ[_0x40886a(0xdd)]['Scene_Boot_onDatabaseLoaded'][_0x40886a(0x200)](this),this[_0x40886a(0x1ff)](),this['process_VisuMZ_SaveCore_Switches_Variables']();},Scene_Boot[_0x383e57(0x17c)][_0x383e57(0x1ff)]=function(){const _0x1b6a18=_0x383e57;StorageManager[_0x1b6a18(0xf7)]()===_0x1b6a18(0x1ab)&&(_0x1b6a18(0xf3)!==_0x1b6a18(0xf3)?_0x13b473[_0x1b6a18(0xf7)]()===_0x1b6a18(0x1ab)?this[_0x1b6a18(0x1c9)]():_0x462eb2[_0x1b6a18(0xdd)][_0x1b6a18(0x256)][_0x1b6a18(0x200)](this):$dataSystem[_0x1b6a18(0x13d)]=!![]);},VisuMZ[_0x383e57(0x23c)]=[],VisuMZ[_0x383e57(0x1b7)]=[],Scene_Boot['prototype'][_0x383e57(0x23a)]=function(){const _0x22790a=_0x383e57;for(let _0x27c481=0x1;_0x27c481<$dataSystem[_0x22790a(0x154)][_0x22790a(0x24b)];_0x27c481++){if(_0x22790a(0xf6)===_0x22790a(0x238))return this[_0x22790a(0xf7)]()===_0x22790a(0x1ab)?_0x22790a(0x110):_0x1e87cd['SaveCore'][_0x22790a(0x1fa)][_0x22790a(0x14a)][_0x22790a(0x22a)];else{if($dataSystem[_0x22790a(0x154)][_0x27c481][_0x22790a(0xe9)](/<GLOBAL>/i))VisuMZ['GlobalSwitches'][_0x22790a(0x131)](_0x27c481);}}for(let _0x2daaf9=0x1;_0x2daaf9<$dataSystem[_0x22790a(0x1ef)][_0x22790a(0x24b)];_0x2daaf9++){if($dataSystem[_0x22790a(0x1ef)][_0x2daaf9][_0x22790a(0xe9)](/<GLOBAL>/i))VisuMZ[_0x22790a(0x1b7)]['push'](_0x2daaf9);}},VisuMZ['SaveCore'][_0x383e57(0x1bc)]=DataManager['createGameObjects'],DataManager[_0x383e57(0xf0)]=function(){const _0x16036a=_0x383e57;VisuMZ['SaveCore'][_0x16036a(0x1bc)][_0x16036a(0x200)](this),Scene_File['MAX_BATTLE_MEMBERS']=$gameParty[_0x16036a(0x265)]();},DataManager[_0x383e57(0xf1)]=function(){const _0x5702a1=_0x383e57;return!DataManager[_0x5702a1(0xc7)]()&&!DataManager['isEventTest']()&&$dataSystem[_0x5702a1(0x13d)];},DataManager[_0x383e57(0x12c)]=function(){const _0x16fc96=_0x383e57;if(StorageManager[_0x16fc96(0xf7)]()===_0x16fc96(0x1ab))return 0x1;let _0x1650bc=VisuMZ[_0x16fc96(0xdd)]['Settings'][_0x16fc96(0xed)][_0x16fc96(0x156)]?0x0:0x1;return VisuMZ['SaveCore'][_0x16fc96(0x1fa)][_0x16fc96(0xed)]['MaxSaveFiles']+_0x1650bc;},DataManager[_0x383e57(0x25c)]=function(_0x166111){const _0x1a4eff=_0x383e57,_0x10aea2=VisuMZ['SaveCore'][_0x1a4eff(0x1fa)][_0x1a4eff(0xed)][_0x1a4eff(0x19a)];return _0x10aea2[_0x1a4eff(0x27d)](_0x166111);},VisuMZ['SaveCore']['DataManager_makeSavefileInfo']=DataManager['makeSavefileInfo'],DataManager['makeSavefileInfo']=function(){const _0x1fcf2f=_0x383e57,_0x46f6b7=VisuMZ[_0x1fcf2f(0xdd)][_0x1fcf2f(0x15c)]['call'](this);return VisuMZ[_0x1fcf2f(0xdd)][_0x1fcf2f(0x1fa)]['SaveMenu'][_0x1fcf2f(0x1dd)]['call'](this,_0x46f6b7);},ConfigManager[_0x383e57(0x18e)]=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0x1c5)][_0x383e57(0x195)],ConfigManager[_0x383e57(0x194)]=[],ConfigManager[_0x383e57(0x1b8)]=[],VisuMZ['SaveCore'][_0x383e57(0x170)]=ConfigManager[_0x383e57(0x20e)],ConfigManager[_0x383e57(0x20e)]=function(){const _0x4bcf1a=_0x383e57,_0x2bf8a=VisuMZ[_0x4bcf1a(0xdd)][_0x4bcf1a(0x170)]['call'](this);return _0x2bf8a['autosave']=this['autosave']||VisuMZ[_0x4bcf1a(0xdd)]['Settings'][_0x4bcf1a(0x1c5)][_0x4bcf1a(0x195)],_0x2bf8a[_0x4bcf1a(0x194)]=this['globalSwitches']||[],_0x2bf8a[_0x4bcf1a(0x1b8)]=this[_0x4bcf1a(0x1b8)]||[],_0x2bf8a;},VisuMZ['SaveCore']['ConfigManager_applyData']=ConfigManager[_0x383e57(0x11b)],ConfigManager[_0x383e57(0x11b)]=function(_0x470fc3){const _0x2b6913=_0x383e57;VisuMZ[_0x2b6913(0xdd)][_0x2b6913(0x10d)][_0x2b6913(0x200)](this,_0x470fc3),this[_0x2b6913(0x18e)]=_0x470fc3[_0x2b6913(0x18e)]!==undefined?_0x470fc3[_0x2b6913(0x18e)]:VisuMZ['SaveCore']['Settings'][_0x2b6913(0x1c5)]['Default'],this['globalSwitches']=_0x470fc3[_0x2b6913(0x194)]||[],this['globalVariables']=_0x470fc3[_0x2b6913(0x1b8)]||[];},StorageManager['isLocalMode']=function(){const _0x49cf3d=_0x383e57;if(Utils[_0x49cf3d(0x189)]()){if(_0x49cf3d(0x15f)!==_0x49cf3d(0x1f6))return VisuMZ['SaveCore'][_0x49cf3d(0x1fa)][_0x49cf3d(0xed)][_0x49cf3d(0xd2)];else{if(_0x53f0b9[_0x49cf3d(0x237)])return;const _0x533ae1=_0x2aa8e5[_0x49cf3d(0x25e)]();if(_0x45110f[_0x49cf3d(0xf7)]()!==_0x49cf3d(0x1ab)&&_0x533ae1<=0x0)return;this[_0x49cf3d(0x141)]=![],_0x213adc[_0x49cf3d(0x161)](_0x533ae1),_0x4540e8[_0x49cf3d(0x184)](),_0xc0a4fa[_0x49cf3d(0x237)]=!![],_0xf2f1dd[_0x49cf3d(0x1b5)](_0x533ae1)['then'](()=>this[_0x49cf3d(0x24e)]())[_0x49cf3d(0x160)](()=>this[_0x49cf3d(0x132)]()),_0x22d4cd[_0x49cf3d(0x237)]=_0x3bfe0e;}}else{if(_0x49cf3d(0x1ee)===_0x49cf3d(0x24f))_0x223a00[_0x49cf3d(0x129)](),_0x1291d7[_0x49cf3d(0xdd)]['Settings'][_0x49cf3d(0xed)]['OnSaveFailureJS'][_0x49cf3d(0x200)](this),this[_0x49cf3d(0x16a)](![]);else return![];}},StorageManager[_0x383e57(0x18f)]=function(_0x2224d7){const _0x389858=_0x383e57,_0x2ecf1e=this[_0x389858(0x140)](),_0x5c3841=VisuMZ[_0x389858(0xdd)]['Settings'][_0x389858(0xed)]['ExtensionFmt'];return _0x2ecf1e+_0x5c3841['format'](_0x2224d7);},StorageManager['forageKey']=function(_0x592922){const _0xb95a76=_0x383e57,_0x57adc8=$dataSystem[_0xb95a76(0x1d6)][_0xb95a76(0x15e)],_0x4c5f11=VisuMZ[_0xb95a76(0xdd)][_0xb95a76(0x1fa)][_0xb95a76(0xed)]['KeyFmt'];return _0x4c5f11[_0xb95a76(0x27d)](_0x57adc8,_0x592922);},StorageManager[_0x383e57(0x181)]=function(){const _0x2e3574=_0x383e57;return VisuMZ[_0x2e3574(0xdd)][_0x2e3574(0x1fa)][_0x2e3574(0xed)][_0x2e3574(0xcf)];},StorageManager[_0x383e57(0xf7)]=function(){const _0x309bc5=_0x383e57;return VisuMZ[_0x309bc5(0xdd)][_0x309bc5(0x1fa)][_0x309bc5(0xed)][_0x309bc5(0x174)];},StorageManager[_0x383e57(0x183)]=function(){const _0x47bc42=_0x383e57;return this[_0x47bc42(0xf7)]()===_0x47bc42(0x1ab)?_0x47bc42(0x110):VisuMZ[_0x47bc42(0xdd)][_0x47bc42(0x1fa)][_0x47bc42(0x14a)][_0x47bc42(0x22a)];},TextManager[_0x383e57(0x1e3)]=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0xed)][_0x383e57(0x25b)],TextManager['saveSuccess']=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0x240)][_0x383e57(0x25a)],TextManager['saveFailure']=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0x240)][_0x383e57(0x177)],TextManager['loadFailure']=VisuMZ[_0x383e57(0xdd)]['Settings'][_0x383e57(0x240)]['VocabLoadFailure'],TextManager[_0x383e57(0xde)]=VisuMZ[_0x383e57(0xdd)]['Settings']['AutosaveOption'][_0x383e57(0x1ed)],TextManager['autosaveSuccess']=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0x1d9)][_0x383e57(0x126)],TextManager[_0x383e57(0x135)]=VisuMZ['SaveCore']['Settings']['AutosaveConfirm']['VocabAutosaveFailure'],TextManager[_0x383e57(0x121)]=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0x247)][_0x383e57(0x1aa)],ColorManager[_0x383e57(0x235)]=function(){const _0x231940=_0x383e57,_0x331c3d='_stored_latestSavefile';this[_0x231940(0x11f)]=this[_0x231940(0x11f)]||{};if(this[_0x231940(0x11f)][_0x331c3d])return this[_0x231940(0x11f)][_0x331c3d];const _0x3ac8d6=VisuMZ['SaveCore'][_0x231940(0x1fa)][_0x231940(0x247)]['LatestColor'];return this[_0x231940(0x1ce)](_0x331c3d,_0x3ac8d6);},ColorManager[_0x383e57(0x1ce)]=function(_0x50ceda,_0xc1fa96){const _0xd26fe8=_0x383e57;return _0xc1fa96=String(_0xc1fa96),this[_0xd26fe8(0x11f)]=this[_0xd26fe8(0x11f)]||{},_0xc1fa96[_0xd26fe8(0xe9)](/#(.*)/i)?this[_0xd26fe8(0x11f)][_0x50ceda]=_0xd26fe8(0xe5)[_0xd26fe8(0x27d)](String(RegExp['$1'])):this['_colorCache'][_0x50ceda]=this[_0xd26fe8(0x229)](Number(_0xc1fa96)),this[_0xd26fe8(0x11f)][_0x50ceda];},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x186)]=Game_System[_0x383e57(0x17c)]['initialize'],Game_System['prototype'][_0x383e57(0x231)]=function(){const _0x174983=_0x383e57;VisuMZ[_0x174983(0xdd)][_0x174983(0x186)][_0x174983(0x200)](this),this[_0x174983(0x1d0)]();},Game_System['prototype']['initSaveCore']=function(){this['_SaveCoreSettings']={'autosaveEnabled':!![],'saveDescription':'','savePicture':''};},Game_System[_0x383e57(0x17c)][_0x383e57(0x1fd)]=function(){const _0x16c689=_0x383e57;if(!$dataSystem['optAutosave'])return![];if(this['_SaveCoreSettings']===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0x16c689(0x11d)]===undefined)this['initSaveCore']();return this[_0x16c689(0x14b)][_0x16c689(0x11d)];},Game_System[_0x383e57(0x17c)]['enableAutosave']=function(_0x46eb19){const _0x114e8f=_0x383e57;if(!$dataSystem['optAutosave'])return;if(this[_0x114e8f(0x14b)]===undefined)this[_0x114e8f(0x1d0)]();if(this[_0x114e8f(0x14b)]['autosaveEnabled']===undefined)this[_0x114e8f(0x1d0)]();this[_0x114e8f(0x14b)][_0x114e8f(0x11d)]=_0x46eb19;},Game_System[_0x383e57(0x17c)][_0x383e57(0x157)]=function(){const _0x367e0c=_0x383e57;if(this[_0x367e0c(0x14b)]===undefined)this[_0x367e0c(0x1d0)]();if(this[_0x367e0c(0x14b)][_0x367e0c(0x180)]===undefined)this[_0x367e0c(0x1d0)]();return this['_SaveCoreSettings'][_0x367e0c(0x180)];},Game_System[_0x383e57(0x17c)][_0x383e57(0x1cf)]=function(_0x4ebb75){const _0x53a5aa=_0x383e57;if(this[_0x53a5aa(0x14b)]===undefined)this[_0x53a5aa(0x1d0)]();if(this[_0x53a5aa(0x14b)][_0x53a5aa(0x180)]===undefined)this['initSaveCore']();this['_SaveCoreSettings'][_0x53a5aa(0x180)]=VisuMZ[_0x53a5aa(0xdd)][_0x53a5aa(0x22c)](_0x4ebb75);},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x22c)]=function(_0x321d88){const _0x3dec7d=_0x383e57;while(_0x321d88[_0x3dec7d(0xe9)](/\\V\[(\d+)\]/gi)){_0x321d88=_0x321d88[_0x3dec7d(0x230)](/\\V\[(\d+)\]/gi,(_0x35c534,_0x1e7d40)=>$gameVariables[_0x3dec7d(0x276)](parseInt(_0x1e7d40)));}while(_0x321d88[_0x3dec7d(0xe9)](/\\N\[(\d+)\]/gi)){_0x3dec7d(0x243)===_0x3dec7d(0x243)?_0x321d88=_0x321d88['replace'](/\\N\[(\d+)\]/gi,(_0x4465e6,_0x496885)=>Window_Base[_0x3dec7d(0x17c)][_0x3dec7d(0x122)](parseInt(_0x496885))):this[_0x3dec7d(0x204)]();}while(_0x321d88[_0x3dec7d(0xe9)](/\\P\[(\d+)\]/gi)){_0x3dec7d(0x1cd)!==_0x3dec7d(0x198)?_0x321d88=_0x321d88[_0x3dec7d(0x230)](/\\P\[(\d+)\]/gi,(_0x751553,_0x478d8a)=>Window_Base[_0x3dec7d(0x17c)][_0x3dec7d(0x217)](parseInt(_0x478d8a))):(this[_0x3dec7d(0xe8)][_0x3dec7d(0x27a)](),_0x2cfa8c[_0x3dec7d(0x216)](),this[_0x3dec7d(0x20b)](),_0x51819b['prototype'][_0x3dec7d(0x1b9)](),_0x9480b3['goto'](_0x5a96f4),this[_0x3dec7d(0x16d)]=!![],_0x3e4a14[_0x3dec7d(0xdd)][_0x3dec7d(0x1fa)][_0x3dec7d(0xed)][_0x3dec7d(0xda)][_0x3dec7d(0x200)](this));}return _0x321d88;},Game_System['prototype']['getSavePicture']=function(){const _0xf91ca3=_0x383e57;if(this[_0xf91ca3(0x14b)]===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0xf91ca3(0x1be)]===undefined)this[_0xf91ca3(0x1d0)]();return this['_SaveCoreSettings'][_0xf91ca3(0x1be)];},Game_System['prototype'][_0x383e57(0x15a)]=function(_0x2bb836){const _0x5e0913=_0x383e57;if(this[_0x5e0913(0x14b)]===undefined)this[_0x5e0913(0x1d0)]();if(this[_0x5e0913(0x14b)][_0x5e0913(0x1be)]===undefined)this[_0x5e0913(0x1d0)]();this[_0x5e0913(0x14b)][_0x5e0913(0x1be)]=_0x2bb836;},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1e4)]=Game_System['prototype'][_0x383e57(0x25e)],Game_System[_0x383e57(0x17c)][_0x383e57(0x25e)]=function(){const _0x297b46=_0x383e57,_0x266228=StorageManager[_0x297b46(0xf7)]();switch(_0x266228){case _0x297b46(0xd6):return VisuMZ[_0x297b46(0xdd)][_0x297b46(0x1e4)][_0x297b46(0x200)](this)||0x1;break;case _0x297b46(0x1ab):return 0x0;break;default:return VisuMZ[_0x297b46(0xdd)][_0x297b46(0x1e4)]['call'](this);break;}},Game_Switches[_0x383e57(0x17c)][_0x383e57(0x109)]=function(_0x49deb7){const _0x39d15b=_0x383e57;return $dataSystem[_0x39d15b(0x154)][_0x49deb7]&&VisuMZ[_0x39d15b(0x23c)][_0x39d15b(0x19f)](_0x49deb7);},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x155)]=Game_Switches['prototype'][_0x383e57(0x276)],Game_Switches['prototype'][_0x383e57(0x276)]=function(_0x10fe3d){const _0x3835aa=_0x383e57;return this['isGlobal'](_0x10fe3d)?this[_0x3835aa(0x1ca)](_0x10fe3d):'UrEai'===_0x3835aa(0x267)?VisuMZ[_0x3835aa(0xdd)][_0x3835aa(0x155)][_0x3835aa(0x200)](this,_0x10fe3d):!_0x28d40e[_0x3835aa(0xc7)]()&&!_0x4f24ad['isEventTest']()&&_0x13ee27[_0x3835aa(0x13d)];},Game_Switches[_0x383e57(0x17c)][_0x383e57(0x1ca)]=function(_0x526908){const _0x5be7f6=_0x383e57;return ConfigManager[_0x5be7f6(0x194)]=ConfigManager[_0x5be7f6(0x194)]||[],!!ConfigManager['globalSwitches'][_0x526908];},VisuMZ['SaveCore'][_0x383e57(0x13e)]=Game_Switches[_0x383e57(0x17c)][_0x383e57(0x227)],Game_Switches[_0x383e57(0x17c)][_0x383e57(0x227)]=function(_0x419912,_0x488dba){const _0x1a0e94=_0x383e57;if(this[_0x1a0e94(0x109)](_0x419912))this[_0x1a0e94(0xe3)](_0x419912,_0x488dba);VisuMZ[_0x1a0e94(0xdd)]['Game_Switches_setValue']['call'](this,_0x419912,_0x488dba);},Game_Switches[_0x383e57(0x17c)][_0x383e57(0xe3)]=function(_0x3b5c02,_0x5b4085){const _0x2bcf62=_0x383e57;_0x3b5c02>0x0&&_0x3b5c02<$dataSystem[_0x2bcf62(0x154)]['length']&&(ConfigManager[_0x2bcf62(0x194)]=ConfigManager[_0x2bcf62(0x194)]||[],ConfigManager[_0x2bcf62(0x194)][_0x3b5c02]=_0x5b4085,ConfigManager['save']());},Game_Variables[_0x383e57(0x17c)]['isGlobal']=function(_0x1a87d4){const _0x44abc0=_0x383e57;return $dataSystem[_0x44abc0(0x1ef)][_0x1a87d4]&&VisuMZ[_0x44abc0(0x1b7)][_0x44abc0(0x19f)](_0x1a87d4);},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1a0)]=Game_Variables[_0x383e57(0x17c)]['value'],Game_Variables[_0x383e57(0x17c)][_0x383e57(0x276)]=function(_0x28f5a9){const _0x59773b=_0x383e57;if(this[_0x59773b(0x109)](_0x28f5a9))return this['globalValue'](_0x28f5a9);else{if('MQgqh'!=='MQgqh')this[_0x59773b(0x165)](this[_0x59773b(0x1c7)],_0x73d9bf);else return VisuMZ[_0x59773b(0xdd)][_0x59773b(0x1a0)][_0x59773b(0x200)](this,_0x28f5a9);}},Game_Variables[_0x383e57(0x17c)][_0x383e57(0x1ca)]=function(_0x193083){const _0x1ea128=_0x383e57;return ConfigManager['globalVariables']=ConfigManager['globalVariables']||[],ConfigManager[_0x1ea128(0x1b8)][_0x193083]===undefined&&(ConfigManager[_0x1ea128(0x1b8)][_0x193083]=0x0),ConfigManager[_0x1ea128(0x1b8)][_0x193083];},VisuMZ[_0x383e57(0xdd)][_0x383e57(0xcc)]=Game_Variables[_0x383e57(0x17c)][_0x383e57(0x227)],Game_Variables[_0x383e57(0x17c)][_0x383e57(0x227)]=function(_0xed3f92,_0x49c2c8){const _0x2e5674=_0x383e57;if(this[_0x2e5674(0x109)](_0xed3f92))this[_0x2e5674(0xe3)](_0xed3f92,_0x49c2c8);VisuMZ[_0x2e5674(0xdd)][_0x2e5674(0xcc)][_0x2e5674(0x200)](this,_0xed3f92,_0x49c2c8);},Game_Variables['prototype'][_0x383e57(0xe3)]=function(_0x3633b7,_0x1e5bb4){const _0x59df9c=_0x383e57;if(_0x3633b7>0x0&&_0x3633b7<$dataSystem[_0x59df9c(0x1ef)][_0x59df9c(0x24b)]){ConfigManager[_0x59df9c(0x1b8)]=ConfigManager[_0x59df9c(0x1b8)]||[];if(typeof _0x1e5bb4===_0x59df9c(0x228))_0x1e5bb4=Math[_0x59df9c(0x1fc)](_0x1e5bb4);ConfigManager['globalVariables'][_0x3633b7]=_0x1e5bb4,ConfigManager[_0x59df9c(0x236)]();}},Game_Party[_0x383e57(0x17c)][_0x383e57(0x168)]=function(){const _0x6a38d5=_0x383e57;return this[_0x6a38d5(0x209)]()[_0x6a38d5(0x26c)](_0x431025=>_0x431025['battlerName']());},Scene_Base[_0x383e57(0x17c)]['determineAutosaveBypass']=function(_0x4ff84c){const _0x56c598=_0x383e57,_0x1e5668=VisuMZ[_0x56c598(0xdd)][_0x56c598(0x1fa)][_0x56c598(0x14a)];switch(_0x4ff84c){case'battle':this[_0x56c598(0x128)]=!_0x1e5668[_0x56c598(0x134)];break;case _0x56c598(0x139):if(!this[_0x56c598(0x1c0)]())return;this['_bypassAutosave']=!_0x1e5668[_0x56c598(0xe7)];break;case _0x56c598(0x146):this['_bypassAutosave']=!_0x1e5668[_0x56c598(0x18d)];break;case _0x56c598(0x224):this['_bypassAutosave']=!_0x1e5668[_0x56c598(0x112)];break;}},VisuMZ['SaveCore']['Scene_Base_requestAutosave']=Scene_Base[_0x383e57(0x17c)][_0x383e57(0xff)],Scene_Base[_0x383e57(0x17c)][_0x383e57(0xff)]=function(){const _0x59ce23=_0x383e57;if(!this[_0x59ce23(0x128)]){if(_0x59ce23(0x151)!==_0x59ce23(0x151)){let _0x19f3de=_0x590799[_0x59ce23(0xdd)][_0x59ce23(0x1bf)]['call'](this);const _0x5b2559=_0x9b4c9c['SaveCore'][_0x59ce23(0x1fa)];if(_0x5b2559['AutosaveOption']['AddOption']&&_0x5b2559[_0x59ce23(0x1c5)][_0x59ce23(0x225)])_0x19f3de++;return _0x19f3de;}else VisuMZ[_0x59ce23(0xdd)][_0x59ce23(0x275)]['call'](this);}this[_0x59ce23(0x128)]=![];},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x1fd)]=function(){const _0x1a7d21=_0x383e57;return!DataManager[_0x1a7d21(0xc7)]()&&!DataManager['isEventTest']()&&$gameSystem[_0x1a7d21(0x1fd)]()&&(VisuMZ[_0x1a7d21(0xdd)][_0x1a7d21(0x1fa)][_0x1a7d21(0x14a)][_0x1a7d21(0x211)]?$gameSystem[_0x1a7d21(0x215)]():!![]);},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x159)]=function(){const _0x176474=_0x383e57;if(!ConfigManager[_0x176474(0x18e)])return;this['forceAutosave']();},Scene_Base['prototype'][_0x383e57(0x254)]=function(){const _0x45a2a3=_0x383e57;$gameSystem['onBeforeSave'](),this[_0x45a2a3(0x268)]=![];const _0x5be31=StorageManager[_0x45a2a3(0x183)]();['file0',_0x45a2a3(0x271)][_0x45a2a3(0x19f)](_0x5be31)&&(_0x45a2a3(0x138)==='lwMIp'?DataManager['saveGame'](0x0)[_0x45a2a3(0x266)](()=>this['onAutosaveSuccess']())['catch'](()=>this['onAutosaveFailure']()):this[_0x45a2a3(0x20d)](_0x26f871[_0x45a2a3(0x18e)],_0x269dcb,_0x348a75,0xb4));if([_0x45a2a3(0x116),'both'][_0x45a2a3(0x19f)](_0x5be31)){const _0x1a7f82=$gameSystem[_0x45a2a3(0x25e)]();_0x1a7f82>0x0&&DataManager[_0x45a2a3(0x1b5)](_0x1a7f82)[_0x45a2a3(0x266)](()=>this[_0x45a2a3(0x222)]())[_0x45a2a3(0x160)](()=>this[_0x45a2a3(0x1d5)]());}this[_0x45a2a3(0x268)]=![];},VisuMZ['SaveCore'][_0x383e57(0x12a)]=Scene_Base[_0x383e57(0x17c)][_0x383e57(0x222)],Scene_Base[_0x383e57(0x17c)][_0x383e57(0x222)]=function(){const _0x135df8=_0x383e57;if(this[_0x135df8(0x268)])return;VisuMZ[_0x135df8(0xdd)][_0x135df8(0x12a)][_0x135df8(0x200)](this),VisuMZ[_0x135df8(0xdd)][_0x135df8(0x1fa)]['Autosave'][_0x135df8(0xe6)]['call'](this),this[_0x135df8(0xf5)](!![]),this[_0x135df8(0x268)]=!![];},VisuMZ[_0x383e57(0xdd)]['Scene_Base_onAutosaveFailure']=Scene_Base[_0x383e57(0x17c)]['onAutosaveFailure'],Scene_Base[_0x383e57(0x17c)][_0x383e57(0x1d5)]=function(){const _0x2aa730=_0x383e57;if(this[_0x2aa730(0x268)])return;VisuMZ[_0x2aa730(0xdd)][_0x2aa730(0xd4)]['call'](this),VisuMZ['SaveCore']['Settings'][_0x2aa730(0x14a)][_0x2aa730(0x145)][_0x2aa730(0x200)](this),this[_0x2aa730(0xf5)](![]);},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x1c6)]=function(){const _0x4ed205=_0x383e57;if(this[_0x4ed205(0x1a1)])return;const _0x4e26d0=this['saveConfirmationWindowRect']();this['_saveConfirmWindow']=new Window_Base(_0x4e26d0),this['_saveConfirmWindow'][_0x4ed205(0x163)]=0x0;},Scene_Base['prototype'][_0x383e57(0x158)]=function(){const _0x73dbec=_0x383e57;return VisuMZ[_0x73dbec(0xdd)][_0x73dbec(0x1fa)][_0x73dbec(0x240)][_0x73dbec(0x176)][_0x73dbec(0x200)](this);},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x239)]=function(){const _0x2ef563=_0x383e57;return VisuMZ[_0x2ef563(0xdd)][_0x2ef563(0x1fa)][_0x2ef563(0x240)][_0x2ef563(0x1af)];},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x16a)]=function(_0xa47be7,_0x152689){const _0x3409b3=_0x383e57;if(!this[_0x3409b3(0x239)]())return this[_0x3409b3(0x149)](_0xa47be7);if(!this[_0x3409b3(0x1a1)])this[_0x3409b3(0x1c6)]();const _0x345710=this[_0x3409b3(0x1a1)];this[_0x3409b3(0xc5)](_0x345710),this[_0x3409b3(0x27e)](_0x345710),_0x345710[_0x3409b3(0x16c)](),_0x345710[_0x3409b3(0x1a2)](),_0x345710[_0x3409b3(0x11e)][_0x3409b3(0x214)]();let _0x1bac2a='';_0x152689?_0x1bac2a=TextManager[_0x3409b3(0xd3)]:_0x1bac2a=_0xa47be7?TextManager[_0x3409b3(0x257)]:TextManager[_0x3409b3(0x1d4)];const _0x25c50e=_0x345710[_0x3409b3(0xdf)](_0x1bac2a)['width'],_0x1bad86=(_0x345710[_0x3409b3(0x104)]-_0x25c50e)/0x2;_0x345710['drawTextEx'](_0x1bac2a,_0x1bad86,0x0,_0x25c50e);const _0x411c2a=VisuMZ[_0x3409b3(0xdd)]['Settings'][_0x3409b3(0x240)][_0x3409b3(0x1bd)];setTimeout(this[_0x3409b3(0x149)][_0x3409b3(0x1ba)](this,_0xa47be7),_0x411c2a);},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x1d7)]=function(){this['openSaveConfirmationWindow'](![],!![]);},Scene_Base[_0x383e57(0x17c)]['closeSaveConfirmationWindow']=function(_0x2e7548){const _0x7affce=_0x383e57;if(this[_0x7affce(0x1a1)])this[_0x7affce(0x1a1)][_0x7affce(0x27a)]();},Scene_Base[_0x383e57(0x17c)]['createAutosaveConfirmationWindow']=function(){const _0x49d903=_0x383e57;if(this['_autosaveConfirmWindow'])return;const _0x2e5970=this[_0x49d903(0x23b)]();this['_autosaveConfirmWindow']=new Window_AutosaveConfirm(_0x2e5970);},Scene_Base[_0x383e57(0x17c)][_0x383e57(0x23b)]=function(){const _0x11675e=_0x383e57,_0x38eaeb=this[_0x11675e(0x27f)](),_0x38d1c7=this['calcWindowHeight'](0x1,![]),_0x4598c7=Graphics['width']-_0x38eaeb,_0x32acd7=Graphics[_0x11675e(0x1ec)]-_0x38d1c7;return new Rectangle(_0x4598c7,_0x32acd7,_0x38eaeb,_0x38d1c7);},Scene_Base['prototype']['isAutosaveConfirmWindowEnabled']=function(){const _0x2e6431=_0x383e57;return VisuMZ[_0x2e6431(0xdd)][_0x2e6431(0x1fa)][_0x2e6431(0x1d9)][_0x2e6431(0x1af)];},Scene_Base['prototype'][_0x383e57(0xf5)]=function(_0x143d43){const _0x159512=_0x383e57;if(!this['isAutosaveConfirmWindowEnabled']())return this[_0x159512(0x264)](_0x143d43);if(!this[_0x159512(0x196)])this[_0x159512(0x113)]();const _0x278966=this[_0x159512(0x196)];this[_0x159512(0xc5)](_0x278966),this[_0x159512(0x27e)](_0x278966),_0x278966['setSetSuccess'](_0x143d43),_0x278966['fadeIn']();const _0x570500=VisuMZ['SaveCore'][_0x159512(0x1fa)]['SaveConfirm']['Duration'];setTimeout(this[_0x159512(0x264)][_0x159512(0x1ba)](this,_0x143d43),_0x570500);},Scene_Base['prototype'][_0x383e57(0x264)]=function(_0x5bcf94){const _0x249283=_0x383e57;if(this[_0x249283(0x196)])this[_0x249283(0x196)][_0x249283(0x106)]();},Scene_Base[_0x383e57(0x17c)][_0x383e57(0xee)]=function(){},VisuMZ[_0x383e57(0xdd)]['Scene_Title_initialize']=Scene_Title['prototype'][_0x383e57(0x231)],Scene_Title[_0x383e57(0x17c)]['initialize']=function(){const _0x2b9d5f=_0x383e57;VisuMZ[_0x2b9d5f(0xdd)][_0x2b9d5f(0x167)]['call'](this),this[_0x2b9d5f(0x16d)]=![];},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1ac)]=Scene_Title[_0x383e57(0x17c)][_0x383e57(0x22e)],Scene_Title[_0x383e57(0x17c)]['terminate']=function(){const _0x3d7fcf=_0x383e57;VisuMZ[_0x3d7fcf(0xdd)][_0x3d7fcf(0x1ac)][_0x3d7fcf(0x200)](this);if(this[_0x3d7fcf(0x16d)])$gameSystem[_0x3d7fcf(0x190)]();},VisuMZ[_0x383e57(0xdd)]['Scene_Title_commandNewGame']=Scene_Title[_0x383e57(0x17c)][_0x383e57(0x21f)],Scene_Title[_0x383e57(0x17c)]['commandNewGame']=function(){const _0x278caa=_0x383e57;StorageManager[_0x278caa(0xf7)]()===_0x278caa(0xd6)?_0x278caa(0x1f8)!==_0x278caa(0x1f8)?(this['determineAutosaveBypass'](_0x278caa(0x213)),this[_0x278caa(0xff)]()):this['commandNewGameSaveCoreLocked']():VisuMZ[_0x278caa(0xdd)][_0x278caa(0x125)]['call'](this);},Scene_Title[_0x383e57(0x17c)][_0x383e57(0x173)]=function(){const _0x57f1bd=_0x383e57;DataManager[_0x57f1bd(0x219)](),$gameTemp[_0x57f1bd(0x260)]=!![],this['_commandWindow'][_0x57f1bd(0x27a)](),SceneManager[_0x57f1bd(0x131)](Scene_Save);},VisuMZ['SaveCore']['Scene_Title_commandContinue']=Scene_Title[_0x383e57(0x17c)][_0x383e57(0x123)],Scene_Title[_0x383e57(0x17c)][_0x383e57(0x123)]=function(){const _0x68e474=_0x383e57;if(StorageManager[_0x68e474(0xf7)]()==='single')this[_0x68e474(0x1c9)]();else{if(_0x68e474(0xd8)===_0x68e474(0xd8))VisuMZ[_0x68e474(0xdd)]['Scene_Title_commandContinue'][_0x68e474(0x200)](this);else return this['globalValue'](_0x1b7ad1);}},Scene_Title[_0x383e57(0x17c)][_0x383e57(0x1c9)]=function(){const _0x51e4df=_0x383e57;DataManager['loadGame'](0x0)[_0x51e4df(0x266)](()=>this[_0x51e4df(0x12d)]())[_0x51e4df(0x160)](()=>this[_0x51e4df(0x1ea)]());},Scene_Title['prototype'][_0x383e57(0x12d)]=function(){const _0x5178e4=_0x383e57;this['_commandWindow'][_0x5178e4(0x27a)](),SoundManager[_0x5178e4(0x216)](),this['fadeOutAll'](),Scene_Load[_0x5178e4(0x17c)][_0x5178e4(0x1b9)](),SceneManager[_0x5178e4(0x220)](Scene_Map),this[_0x5178e4(0x16d)]=!![],VisuMZ[_0x5178e4(0xdd)][_0x5178e4(0x1fa)]['Save']['OnLoadSuccessJS'][_0x5178e4(0x200)](this);},Scene_Title[_0x383e57(0x17c)][_0x383e57(0x1ea)]=function(){const _0x38f423=_0x383e57;SoundManager[_0x38f423(0x129)](),VisuMZ[_0x38f423(0xdd)]['Settings'][_0x38f423(0xed)][_0x38f423(0xfe)][_0x38f423(0x200)](this),this['loadFailureConfirmationWindow']();},Scene_Title[_0x383e57(0x17c)][_0x383e57(0x149)]=function(_0x4b2737){Scene_Base['prototype']['closeSaveConfirmationWindow']['call'](this,_0x4b2737),this['_commandWindow']['open'](),this['_commandWindow']['activate']();},VisuMZ[_0x383e57(0xdd)][_0x383e57(0xea)]=Scene_Map[_0x383e57(0x17c)][_0x383e57(0xe0)],Scene_Map[_0x383e57(0x17c)][_0x383e57(0xe0)]=function(){const _0x4b64cc=_0x383e57;VisuMZ['SaveCore'][_0x4b64cc(0xea)][_0x4b64cc(0x200)](this);if(SceneManager[_0x4b64cc(0x103)](Scene_Menu)){if(_0x4b64cc(0x14f)===_0x4b64cc(0x21a)){let _0x1d6c40=_0x2f25ef[_0x4b64cc(0x102)](_0x426e0e[_0x4b64cc(0x10c)]['length'],_0xa5f51c[_0x4b64cc(0x14c)]);const _0x3baf66=_0x5b448b[_0x4b64cc(0x26a)];_0x5b6c18=_0x4c2270+_0x385169[_0x4b64cc(0xf8)]((_0x2834f8-_0x1d6c40*_0x3baf66)/0x2)+_0x3baf66/0x2,_0x5f5233=_0x46fde0+_0x4c04e6-0x8;for(const _0xbdb89b of _0x1f8289[_0x4b64cc(0x10c)]){this[_0x4b64cc(0x1a7)](_0xbdb89b[0x0],_0xbdb89b[0x1],_0x1bc7f2,_0x247767),_0x4ec8b3+=_0x3baf66;}}else this[_0x4b64cc(0x218)](_0x4b64cc(0x224)),this[_0x4b64cc(0xff)]();}else SceneManager[_0x4b64cc(0x103)](Scene_Battle)&&(this[_0x4b64cc(0x218)](_0x4b64cc(0x213)),this[_0x4b64cc(0xff)]());},VisuMZ[_0x383e57(0xdd)]['Scene_Map_onTransferEnd']=Scene_Map[_0x383e57(0x17c)][_0x383e57(0x244)],Scene_Map[_0x383e57(0x17c)]['onTransferEnd']=function(){const _0x419c95=_0x383e57;this[_0x419c95(0x1c0)]()&&this[_0x419c95(0x218)](_0x419c95(0x139)),VisuMZ[_0x419c95(0xdd)][_0x419c95(0x208)]['call'](this);},Scene_Map[_0x383e57(0x17c)][_0x383e57(0xee)]=function(){const _0xac0454=_0x383e57;if($gameSystem[_0xac0454(0x237)]){if(_0xac0454(0x1a6)!=='pwIIO')return'';else return;}const _0x403d67=$gameSystem[_0xac0454(0x25e)]();if(StorageManager[_0xac0454(0xf7)]()!==_0xac0454(0x1ab)&&_0x403d67<=0x0)return;this[_0xac0454(0x141)]=![],$gameSystem['setSavefileId'](_0x403d67),$gameSystem[_0xac0454(0x184)](),$gameSystem['_saveCorePluginCommandSave']=!![],DataManager[_0xac0454(0x1b5)](_0x403d67)[_0xac0454(0x266)](()=>this['onSaveSuccess']())[_0xac0454(0x160)](()=>this[_0xac0454(0x132)]()),$gameSystem[_0xac0454(0x237)]=undefined;},Scene_Map[_0x383e57(0x17c)][_0x383e57(0x24e)]=function(){const _0x5d297a=_0x383e57;SoundManager[_0x5d297a(0xeb)](),VisuMZ['SaveCore']['Settings'][_0x5d297a(0xed)][_0x5d297a(0x207)][_0x5d297a(0x200)](this),this['openSaveConfirmationWindow'](!![]);},Scene_Map[_0x383e57(0x17c)][_0x383e57(0x132)]=function(){const _0xacddf7=_0x383e57;SoundManager['playBuzzer'](),VisuMZ['SaveCore']['Settings'][_0xacddf7(0xed)][_0xacddf7(0x11c)][_0xacddf7(0x200)](this),this[_0xacddf7(0x16a)](![]);},Scene_Map[_0x383e57(0x17c)][_0x383e57(0x149)]=function(_0x2cedfb){const _0x3b53a7=_0x383e57;Scene_Message[_0x3b53a7(0x17c)][_0x3b53a7(0x149)][_0x3b53a7(0x200)](this,_0x2cedfb),this[_0x3b53a7(0x141)]=!![];},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1d3)]=Scene_Menu[_0x383e57(0x17c)][_0x383e57(0x169)],Scene_Menu['prototype'][_0x383e57(0x169)]=function(){const _0x558392=_0x383e57;VisuMZ['SaveCore'][_0x558392(0x1d3)][_0x558392(0x200)](this);if(SceneManager['isPreviousScene'](Scene_Map)){if(_0x558392(0xc9)!=='BvoJj')return![];else this['determineAutosaveBypass'](_0x558392(0x146)),this['requestAutosave']();}},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x22b)]=Scene_Menu[_0x383e57(0x17c)][_0x383e57(0x144)],Scene_Menu[_0x383e57(0x17c)][_0x383e57(0x144)]=function(){const _0x17c6cb=_0x383e57,_0x334f40=StorageManager['saveStyle']();switch(_0x334f40){case _0x17c6cb(0xd6):case _0x17c6cb(0x1ab):this[_0x17c6cb(0x253)]();break;default:VisuMZ[_0x17c6cb(0xdd)][_0x17c6cb(0x22b)][_0x17c6cb(0x200)](this);break;}},Scene_Menu[_0x383e57(0x17c)][_0x383e57(0x253)]=function(){const _0x4b541c=_0x383e57,_0x1f6df5=$gameSystem['savefileId']();$gameSystem['setSavefileId'](_0x1f6df5),$gameSystem[_0x4b541c(0x184)](),DataManager['saveGame'](_0x1f6df5)['then'](()=>this[_0x4b541c(0x221)]())[_0x4b541c(0x160)](()=>this[_0x4b541c(0x21d)]());},Scene_Menu[_0x383e57(0x17c)]['onSaveCoreSaveSuccess']=function(){const _0x22ad59=_0x383e57;SoundManager['playSave'](),VisuMZ['SaveCore']['Settings']['Save']['OnSaveSuccessJS'][_0x22ad59(0x200)](this),this[_0x22ad59(0x16a)](!![]);},Scene_Menu[_0x383e57(0x17c)][_0x383e57(0x21d)]=function(){const _0x97b82e=_0x383e57;SoundManager[_0x97b82e(0x129)](),VisuMZ['SaveCore'][_0x97b82e(0x1fa)][_0x97b82e(0xed)]['OnSaveFailureJS'][_0x97b82e(0x200)](this),this['openSaveConfirmationWindow'](![]);},Scene_Menu[_0x383e57(0x17c)][_0x383e57(0x149)]=function(_0x4f48dc){const _0x3e5f82=_0x383e57;Scene_MenuBase[_0x3e5f82(0x17c)][_0x3e5f82(0x149)][_0x3e5f82(0x200)](this,_0x4f48dc),this[_0x3e5f82(0xe8)]['activate']();},Scene_Battle['prototype'][_0x383e57(0xff)]=function(){},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1bf)]=Scene_Options[_0x383e57(0x17c)][_0x383e57(0x188)],Scene_Options[_0x383e57(0x17c)][_0x383e57(0x188)]=function(){const _0x112276=_0x383e57;let _0x1618f7=VisuMZ['SaveCore'][_0x112276(0x1bf)][_0x112276(0x200)](this);const _0x3dcd4b=VisuMZ[_0x112276(0xdd)][_0x112276(0x1fa)];if(_0x3dcd4b[_0x112276(0x1c5)]['AddOption']&&_0x3dcd4b[_0x112276(0x1c5)]['AdjustRect'])_0x1618f7++;return _0x1618f7;},Scene_Save[_0x383e57(0x17c)][_0x383e57(0x24e)]=function(){const _0x3edb6c=_0x383e57;SoundManager[_0x3edb6c(0xeb)](),VisuMZ[_0x3edb6c(0xdd)][_0x3edb6c(0x1fa)][_0x3edb6c(0xed)]['OnSaveSuccessJS'][_0x3edb6c(0x200)](this),this[_0x3edb6c(0x1b1)][_0x3edb6c(0x143)](),this['openSaveConfirmationWindow'](!![]);},VisuMZ['SaveCore']['Scene_Save_onSaveFailure']=Scene_Save[_0x383e57(0x17c)][_0x383e57(0x132)],Scene_Save[_0x383e57(0x17c)][_0x383e57(0x132)]=function(){const _0x60ec76=_0x383e57;SoundManager[_0x60ec76(0x129)](),VisuMZ[_0x60ec76(0xdd)][_0x60ec76(0x1fa)][_0x60ec76(0xed)][_0x60ec76(0x11c)][_0x60ec76(0x200)](this),this[_0x60ec76(0x16a)](![]);},Scene_Save[_0x383e57(0x17c)][_0x383e57(0x149)]=function(_0x458b96){const _0x2150ed=_0x383e57;Scene_File[_0x2150ed(0x17c)][_0x2150ed(0x149)][_0x2150ed(0x200)](this,_0x458b96),_0x458b96?'NHEWB'!==_0x2150ed(0x22f)?this[_0x2150ed(0x204)]():_0x1f9ed7=_0x1c064f[_0x2150ed(0x230)](/\\V\[(\d+)\]/gi,(_0x172ba9,_0x3d11cf)=>_0x27786c[_0x2150ed(0x276)](_0x1f2ee5(_0x3d11cf))):this['activateListWindow']();},Scene_Save[_0x383e57(0x17c)][_0x383e57(0xcb)]=function(){const _0x4d19d7=_0x383e57;$gameTemp[_0x4d19d7(0x260)]=![],Scene_File[_0x4d19d7(0x17c)][_0x4d19d7(0xcb)][_0x4d19d7(0x200)](this);},VisuMZ['SaveCore'][_0x383e57(0x10f)]=Scene_Save[_0x383e57(0x17c)]['helpWindowText'],Scene_Save[_0x383e57(0x17c)]['helpWindowText']=function(){const _0x13788a=_0x383e57;if($gameTemp[_0x13788a(0x260)]){if(_0x13788a(0x197)!==_0x13788a(0x1c2))return TextManager[_0x13788a(0x1e3)];else _0x2190cb=_0x10e20f[_0x13788a(0xd3)];}else return'fEgqo'!==_0x13788a(0x19e)?this[_0x13788a(0x209)]()[_0x13788a(0x26c)](_0x1571db=>_0x1571db[_0x13788a(0xdc)]()):VisuMZ[_0x13788a(0xdd)]['Scene_Save_helpWindowText'][_0x13788a(0x200)](this);},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1f4)]=Scene_Save[_0x383e57(0x17c)]['executeSave'],Scene_Save[_0x383e57(0x17c)][_0x383e57(0x1cc)]=function(_0x282f32){const _0x4f2683=_0x383e57;$gameTemp[_0x4f2683(0x260)]?this['startNewGameLockedSave'](_0x282f32):VisuMZ['SaveCore'][_0x4f2683(0x1f4)][_0x4f2683(0x200)](this,_0x282f32);},Scene_Save[_0x383e57(0x17c)]['startNewGameLockedSave']=function(_0x14efde){const _0x4dd3fc=_0x383e57;$gameTemp[_0x4dd3fc(0x260)]=![],SoundManager[_0x4dd3fc(0x216)](),$gameSystem['setSavefileId'](_0x14efde),this[_0x4dd3fc(0x20b)](),SceneManager[_0x4dd3fc(0x220)](Scene_Map);},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1f3)]=Scene_Load[_0x383e57(0x17c)][_0x383e57(0x241)],Scene_Load['prototype'][_0x383e57(0x241)]=function(){const _0x4a5a52=_0x383e57;VisuMZ[_0x4a5a52(0xdd)]['Scene_Load_onLoadSuccess'][_0x4a5a52(0x200)](this),VisuMZ[_0x4a5a52(0xdd)]['Settings'][_0x4a5a52(0xed)][_0x4a5a52(0xda)][_0x4a5a52(0x200)](this),setTimeout(VisuMZ[_0x4a5a52(0xdd)][_0x4a5a52(0x185)][_0x4a5a52(0x1ba)](this),0x3e8);},Scene_Load['prototype'][_0x383e57(0x19c)]=function(){const _0x2b2149=_0x383e57;SoundManager[_0x2b2149(0x129)](),VisuMZ[_0x2b2149(0xdd)][_0x2b2149(0x1fa)]['Save']['OnLoadFailureJS']['call'](this),this['loadFailureConfirmationWindow']();},Scene_Load[_0x383e57(0x17c)][_0x383e57(0x149)]=function(_0x4e8bc4){const _0x44ebbc=_0x383e57;Scene_File[_0x44ebbc(0x17c)]['closeSaveConfirmationWindow'][_0x44ebbc(0x200)](this,_0x4e8bc4),this[_0x44ebbc(0x204)]();},VisuMZ[_0x383e57(0xdd)][_0x383e57(0x185)]=function(){const _0x2cc3f6=_0x383e57;$gameSystem[_0x2cc3f6(0x237)]=undefined;},ImageManager['svActorHorzCells']=ImageManager[_0x383e57(0x245)]||0x9,ImageManager[_0x383e57(0x12f)]=ImageManager[_0x383e57(0x12f)]||0x6;!Imported[_0x383e57(0x166)]&&(Window_Base[_0x383e57(0x17c)]['drawSvActor']=function(_0x336830,_0x3cd9fb,_0x3df23){const _0x5d87aa=_0x383e57,_0x19a564=_0x336830[_0x5d87aa(0xe9)](/\$/i),_0x295d81=ImageManager[_0x5d87aa(0x21e)](_0x336830),_0x4be154=_0x295d81[_0x5d87aa(0x25f)]/(_0x19a564?0x1:ImageManager[_0x5d87aa(0x245)]),_0x9323b7=_0x295d81[_0x5d87aa(0x1ec)]/(_0x19a564?0x1:ImageManager[_0x5d87aa(0x12f)]),_0x2eaf15=0x0,_0x5b6ecc=0x0;this[_0x5d87aa(0x11e)]['blt'](_0x295d81,_0x2eaf15,_0x5b6ecc,_0x4be154,_0x9323b7,_0x3cd9fb-_0x4be154/0x2,_0x3df23-_0x9323b7);});;VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1ad)]=Window_Options[_0x383e57(0x17c)][_0x383e57(0x117)],Window_Options[_0x383e57(0x17c)][_0x383e57(0x117)]=function(){const _0x5ab84a=_0x383e57;VisuMZ[_0x5ab84a(0xdd)][_0x5ab84a(0x1ad)][_0x5ab84a(0x200)](this),this[_0x5ab84a(0x127)]();},Window_Options['prototype'][_0x383e57(0x127)]=function(){const _0x58c398=_0x383e57;VisuMZ[_0x58c398(0xdd)]['Settings'][_0x58c398(0x1c5)][_0x58c398(0x10b)]&&this['addSaveCoreAutosaveCommand']();},Window_Options[_0x383e57(0x17c)][_0x383e57(0x1f7)]=function(){const _0x11a592=_0x383e57,_0x22040c=TextManager[_0x11a592(0xde)],_0x1f85c6=_0x11a592(0x18e);this['addCommand'](_0x22040c,_0x1f85c6);};function Window_AutosaveConfirm(){const _0x12dd09=_0x383e57;this[_0x12dd09(0x231)](...arguments);}Window_AutosaveConfirm[_0x383e57(0x17c)]=Object[_0x383e57(0x169)](Window_Base[_0x383e57(0x17c)]),Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x162)]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x231)]=function(_0x23001a){const _0x39d502=_0x383e57;this[_0x39d502(0x277)]=0x0,Window_Base[_0x39d502(0x17c)][_0x39d502(0x231)][_0x39d502(0x200)](this,_0x23001a),this['opacity']=0x0,this[_0x39d502(0xd1)]=0x0;},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x199)]=function(){const _0xab4c9b=_0x383e57,_0x3fe4c3=0x0,_0x32dda5=0x0,_0x219e10=this[_0xab4c9b(0x104)],_0x3d0330=this[_0xab4c9b(0x233)],_0x573498=ColorManager['dimColor1'](),_0x2eb4b6=ColorManager[_0xab4c9b(0x201)](),_0x19ba56=_0x219e10/0x2;this['contents'][_0xab4c9b(0x18c)](_0x3fe4c3,_0x32dda5,_0x19ba56,_0x3d0330,_0x2eb4b6,_0x573498),this['contents'][_0xab4c9b(0x18c)](_0x3fe4c3+_0x19ba56,_0x32dda5,_0x19ba56,_0x3d0330,_0x573498,_0x2eb4b6);},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x281)]=function(_0x45553d){const _0x567165=_0x383e57;this[_0x567165(0x119)]=_0x45553d,this[_0x567165(0x143)]();},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x143)]=function(){const _0x14fa48=_0x383e57;this[_0x14fa48(0x11e)][_0x14fa48(0x214)]();const _0x435a88=this[_0x14fa48(0x119)]?TextManager[_0x14fa48(0x1e0)]:TextManager['autosaveFailure'],_0x181502=Math[_0x14fa48(0x16f)](this[_0x14fa48(0xdf)](_0x435a88)[_0x14fa48(0x25f)]);this[_0x14fa48(0x25f)]=_0x181502+($gameSystem[_0x14fa48(0x269)]()+this[_0x14fa48(0x136)]())*0x2,this[_0x14fa48(0xfb)](),this[_0x14fa48(0x100)]();const _0xf53091=Math['floor']((this['innerWidth']-_0x181502)/0x2);this['drawBackground'](),this['drawTextEx'](_0x435a88,_0xf53091,0x0,_0x181502);},Window_AutosaveConfirm['prototype'][_0x383e57(0x124)]=function(){const _0x4daecf=_0x383e57;return VisuMZ[_0x4daecf(0xdd)][_0x4daecf(0x1fa)][_0x4daecf(0x1d9)][_0x4daecf(0x26f)];},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0xfb)]=function(){const _0x483665=_0x383e57,_0x1ff09f=this[_0x483665(0x124)]();if(_0x1ff09f['match'](/upper/i)){if(_0x483665(0x120)===_0x483665(0x120))this['y']=-0x1*$gameSystem[_0x483665(0x269)]();else return _0x54c9da['_pickLockedSaveSlot']?_0x4af8c6[_0x483665(0x1e3)]:_0x1ebf82['SaveCore'][_0x483665(0x10f)][_0x483665(0x200)](this);}else{if(_0x1ff09f[_0x483665(0xe9)](/lower/i)){if(_0x483665(0xd5)!==_0x483665(0xd5))return this[_0x483665(0x109)](_0x3b47ea)?this[_0x483665(0x1ca)](_0x3a3dae):_0x1f6767[_0x483665(0xdd)][_0x483665(0x1a0)][_0x483665(0x200)](this,_0x250a40);else this['y']=Graphics[_0x483665(0x1ec)]-this['height']+$gameSystem[_0x483665(0x269)]();}else{if(_0x483665(0x26d)!==_0x483665(0x26d)){_0x16df41[_0x483665(0x184)](),this['_processingAutosave']=![];const _0x1d8a8c=_0x27fa67[_0x483665(0x183)]();['file0',_0x483665(0x271)]['includes'](_0x1d8a8c)&&_0xf4a54a[_0x483665(0x1b5)](0x0)[_0x483665(0x266)](()=>this[_0x483665(0x222)]())['catch'](()=>this[_0x483665(0x1d5)]());if([_0x483665(0x116),_0x483665(0x271)]['includes'](_0x1d8a8c)){const _0x3c7b62=_0x3de7ba[_0x483665(0x25e)]();_0x3c7b62>0x0&&_0x588343[_0x483665(0x1b5)](_0x3c7b62)['then'](()=>this['onAutosaveSuccess']())[_0x483665(0x160)](()=>this[_0x483665(0x1d5)]());}this[_0x483665(0x268)]=![];}else this['y']=(Graphics[_0x483665(0x1ec)]-this[_0x483665(0x1ec)])/0x2;}}if(_0x1ff09f[_0x483665(0xe9)](/left/i))this['x']=-0x1*$gameSystem[_0x483665(0x269)]();else _0x1ff09f[_0x483665(0xe9)](/right/i)?this['x']=Graphics[_0x483665(0x25f)]-this[_0x483665(0x25f)]+$gameSystem['windowPadding']():this['x']=(Graphics[_0x483665(0x25f)]-this['width'])/0x2;this['x']=Math[_0x483665(0xf8)](this['x']),this['y']=Math[_0x483665(0xf8)](this['y']);},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0xe1)]=function(){const _0x983db1=_0x383e57;Window_Base['prototype'][_0x983db1(0xe1)][_0x983db1(0x200)](this);if(this[_0x983db1(0x277)]!==0x0)this[_0x983db1(0x1fe)]();},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x1fe)]=function(){const _0x58d734=_0x383e57;this['contentsOpacity']+=this[_0x58d734(0x277)];if(this['contentsOpacity']>=0xff||this[_0x58d734(0xd1)]<=0x0)this[_0x58d734(0x203)](0x0);},Window_AutosaveConfirm['prototype'][_0x383e57(0x203)]=function(_0x3ac6ca){const _0x5b879b=_0x383e57;this[_0x5b879b(0x277)]=_0x3ac6ca;},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x248)]=function(){this['setFadeSpeed'](0x10);},Window_AutosaveConfirm[_0x383e57(0x17c)][_0x383e57(0x106)]=function(){const _0x7f0e50=_0x383e57;this[_0x7f0e50(0x203)](-0x10);},VisuMZ[_0x383e57(0xdd)]['Window_SavefileList_setMode']=Window_SavefileList['prototype']['setMode'],Window_SavefileList['prototype'][_0x383e57(0x1f1)]=function(_0x434fee,_0x1e8abf){const _0x70e612=_0x383e57;if(StorageManager[_0x70e612(0x183)]()===_0x70e612(0x116))_0x1e8abf=![];if($gameTemp[_0x70e612(0x260)])_0x1e8abf=![];VisuMZ[_0x70e612(0xdd)][_0x70e612(0x1db)][_0x70e612(0x200)](this,_0x434fee,_0x1e8abf);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x27c)]=function(){const _0x2f846e=_0x383e57,_0xf10f28=VisuMZ[_0x2f846e(0xdd)][_0x2f846e(0x1fa)]['SaveMenu'],_0x4be297=this[_0x2f846e(0x19b)]();switch(_0x4be297){case'vertical':return _0xf10f28[_0x2f846e(0x1e8)];break;case _0x2f846e(0x1b0):return _0xf10f28[_0x2f846e(0x24d)];break;case _0x2f846e(0xf9):return _0xf10f28[_0x2f846e(0x23f)];break;default:return _0xf10f28[_0x2f846e(0x1fb)];break;}},Window_SavefileList[_0x383e57(0x17c)]['maxCols']=function(){const _0x1e8a29=_0x383e57,_0x24d317=VisuMZ['SaveCore'][_0x1e8a29(0x1fa)][_0x1e8a29(0x247)],_0x4a9488=this[_0x1e8a29(0x19b)]();switch(_0x4a9488){case'vertical':return _0x24d317[_0x1e8a29(0x1e1)];break;case _0x1e8a29(0x1b0):return _0x24d317[_0x1e8a29(0x16b)];break;case _0x1e8a29(0xf9):return _0x24d317[_0x1e8a29(0x26e)];break;default:return _0x24d317[_0x1e8a29(0xec)];break;}},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x105)]=function(){const _0x999034=_0x383e57;if(Imported['VisuMZ_1_MessageCore']){if(_0x999034(0x12e)===_0x999034(0x17d)){const _0x54009e=this[_0x999034(0x212)](_0x1cecb4),_0x531024=_0x4da47d[_0x999034(0x252)](_0x54009e);if(_0x531024)_0x531024[_0x999034(0x25e)]=_0x54009e;this[_0x999034(0x1c7)]=_0x54009e;const _0x54d57b=this[_0x999034(0x17a)](_0x204ad9);this[_0x999034(0x1a2)](),this[_0x999034(0x20c)](this[_0x999034(0x1da)](_0x54009e)),this[_0x999034(0x258)](_0x531024,_0x54d57b);}else Window_Selectable[_0x999034(0x17c)][_0x999034(0x105)]['call'](this);}},Window_SavefileList[_0x383e57(0x17c)]['setWordWrap']=function(_0x2b92c2){const _0x33e134=_0x383e57;if(Imported[_0x33e134(0xca)]){if(_0x33e134(0x263)===_0x33e134(0x262)){if(this[_0x33e134(0x268)])return;_0x1c9366[_0x33e134(0xdd)][_0x33e134(0x12a)][_0x33e134(0x200)](this),_0x2dddc4[_0x33e134(0xdd)][_0x33e134(0x1fa)]['Autosave'][_0x33e134(0xe6)][_0x33e134(0x200)](this),this[_0x33e134(0xf5)](!![]),this[_0x33e134(0x268)]=!![];}else return Window_Selectable[_0x33e134(0x17c)][_0x33e134(0x114)][_0x33e134(0x200)](this,_0x2b92c2);}else{if(_0x33e134(0xfd)!=='JepvZ')_0x64815b[_0x33e134(0x17c)][_0x33e134(0x149)][_0x33e134(0x200)](this,_0x423f4a),this[_0x33e134(0xe8)]['activate']();else return'';}},Window_SavefileList['prototype'][_0x383e57(0x1ae)]=function(){const _0x3eadff=_0x383e57;return VisuMZ[_0x3eadff(0xdd)][_0x3eadff(0x1fa)][_0x3eadff(0x1b3)];},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x19b)]=function(){const _0x1fce24=_0x383e57;return VisuMZ[_0x1fce24(0xdd)][_0x1fce24(0x1fa)][_0x1fce24(0x1e9)];},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x1c1)]=function(_0x103104){const _0x1ae554=_0x383e57,_0x875b41=Math[_0x1ae554(0x102)](0x0,this[_0x1ae554(0x1cb)](_0x103104));this[_0x1ae554(0x234)](_0x875b41);},Window_SavefileList[_0x383e57(0x17c)]['drawItem']=function(_0x439e8f){const _0x2f2795=_0x383e57,_0x3df55f=this[_0x2f2795(0x212)](_0x439e8f),_0x8d0554=DataManager['savefileInfo'](_0x3df55f);if(_0x8d0554)_0x8d0554['savefileId']=_0x3df55f;this['_savefileId']=_0x3df55f;const _0x3d44e7=this[_0x2f2795(0x17a)](_0x439e8f);this[_0x2f2795(0x1a2)](),this['changePaintOpacity'](this[_0x2f2795(0x1da)](_0x3df55f)),this['drawContents'](_0x8d0554,_0x3d44e7);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x191)]=function(_0x437e9f,_0x1a208e,_0x26b713){const _0x30749d=_0x383e57;if(_0x437e9f===0x0)_0x30749d(0xef)!==_0x30749d(0xef)?_0x47d3ef=_0x354680[_0x30749d(0x102)](_0x16bf83,_0x1aafe4):this[_0x30749d(0x20d)](TextManager[_0x30749d(0x18e)],_0x1a208e,_0x26b713,0xb4);else{if(_0x30749d(0x17f)===_0x30749d(0x17f))this['drawText'](TextManager[_0x30749d(0x1f0)]+'\x20'+_0x437e9f,_0x1a208e,_0x26b713,0xb4);else{if(_0x35d9fb===0x0||_0x538066[_0x30749d(0x111)]()!==_0x3a465e)return;const _0x736036=_0xc3443f[_0x30749d(0x121)];this[_0x30749d(0x153)](_0x49aa4f[_0x30749d(0x235)]()),this[_0x30749d(0x20d)](_0x736036,_0x4014cd,_0x3fa96a,0xb4);}}},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x21c)]=function(_0x484bd5,_0x1958b3,_0x168448){const _0x55f0ec=_0x383e57;if(_0x484bd5===0x0||DataManager[_0x55f0ec(0x111)]()!==_0x484bd5)return;const _0x106368=TextManager[_0x55f0ec(0x121)];this[_0x55f0ec(0x153)](ColorManager[_0x55f0ec(0x235)]()),this[_0x55f0ec(0x20d)](_0x106368,_0x1958b3,_0x168448,0xb4);},Window_SavefileList[_0x383e57(0x17c)]['drawActors']=function(_0x148303,_0x479ad2,_0x1dacda,_0x4c1f88,_0x72afd9){const _0x3e1ef6=_0x383e57;if(!_0x148303[_0x3e1ef6(0x10c)])return;const _0xe7cbb6=this['actorStyle']();switch(_0xe7cbb6){case _0x3e1ef6(0x18b):this[_0x3e1ef6(0x10a)](_0x148303,_0x479ad2,_0x1dacda,_0x4c1f88,_0x72afd9);break;case _0x3e1ef6(0x18a):this[_0x3e1ef6(0x13f)](_0x148303,_0x479ad2,_0x1dacda,_0x4c1f88,_0x72afd9);break;case _0x3e1ef6(0x280):this[_0x3e1ef6(0x1bb)](_0x148303,_0x479ad2,_0x1dacda,_0x4c1f88,_0x72afd9);break;default:break;}},Window_SavefileList[_0x383e57(0x17c)]['drawActorFaces']=function(_0x29ceea,_0x44114c,_0x3b8761,_0x161a9a,_0x48aa30){const _0x29f8c8=_0x383e57;let _0x22e46b=Math[_0x29f8c8(0x102)](_0x29ceea[_0x29f8c8(0xd7)][_0x29f8c8(0x24b)],Scene_File[_0x29f8c8(0x14c)]);const _0x1e7ea5=Math[_0x29f8c8(0x24a)](ImageManager['faceWidth'],Math[_0x29f8c8(0x1fc)](_0x161a9a/_0x22e46b));_0x44114c=_0x44114c+Math[_0x29f8c8(0xf8)]((_0x161a9a-_0x22e46b*_0x1e7ea5)/0x2);for(const _0x21cade of _0x29ceea[_0x29f8c8(0xd7)]){this[_0x29f8c8(0x22d)](_0x21cade[0x0],_0x21cade[0x1],_0x44114c,_0x3b8761+0x1,_0x1e7ea5,_0x48aa30-0x2),_0x44114c+=_0x1e7ea5;}},ImageManager['saveMenuSpriteWidth']=VisuMZ[_0x383e57(0xdd)][_0x383e57(0x1fa)][_0x383e57(0x247)][_0x383e57(0xd9)],ImageManager[_0x383e57(0x249)]=VisuMZ[_0x383e57(0xdd)]['Settings'][_0x383e57(0x247)]['SvBattlerWidth'],Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x13f)]=function(_0x47fb4a,_0x535042,_0xdc0a32,_0x25a0b2,_0x52c91e){const _0x3ad857=_0x383e57;let _0x27e643=Math[_0x3ad857(0x102)](_0x47fb4a['characters'][_0x3ad857(0x24b)],Scene_File[_0x3ad857(0x14c)]);const _0x2d40f1=ImageManager[_0x3ad857(0x26a)];_0x535042=_0x535042+Math['round']((_0x25a0b2-_0x27e643*_0x2d40f1)/0x2)+_0x2d40f1/0x2,_0xdc0a32=_0xdc0a32+_0x52c91e-0x8;for(const _0x5c9a22 of _0x47fb4a['characters']){this[_0x3ad857(0x1a7)](_0x5c9a22[0x0],_0x5c9a22[0x1],_0x535042,_0xdc0a32),_0x535042+=_0x2d40f1;}},Window_SavefileList['prototype'][_0x383e57(0x1bb)]=function(_0x38ba03,_0x531be0,_0x1bb7d9,_0xe103be,_0xe07418){const _0xb9c37f=_0x383e57;if(!_0x38ba03[_0xb9c37f(0x1a4)])return this[_0xb9c37f(0x13f)](_0x38ba03,_0x531be0,_0x1bb7d9,_0xe103be,_0xe07418);let _0x26bf7b=Math['max'](_0x38ba03['svbattlers']['length'],Scene_File[_0xb9c37f(0x14c)]);const _0x3fc65b=ImageManager[_0xb9c37f(0x249)];_0x531be0=_0x531be0+Math[_0xb9c37f(0xf8)]((_0xe103be-_0x26bf7b*_0x3fc65b)/0x2)+_0x3fc65b/0x2,_0x1bb7d9=_0x1bb7d9+_0xe07418-0x8;for(const _0x5971c8 of _0x38ba03['svbattlers']){if(_0xb9c37f(0xc8)!==_0xb9c37f(0xc8)){if(this[_0xb9c37f(0x14b)]===_0x243f8b)this['initSaveCore']();if(this[_0xb9c37f(0x14b)][_0xb9c37f(0x1be)]===_0x10122c)this[_0xb9c37f(0x1d0)]();return this[_0xb9c37f(0x14b)][_0xb9c37f(0x1be)];}else this[_0xb9c37f(0x270)](_0x5971c8,_0x531be0,_0x1bb7d9),_0x531be0+=_0x3fc65b;}},Window_SavefileList['prototype'][_0x383e57(0x23e)]=function(_0x6ed827,_0x52d86e,_0x3736fc,_0x13fb1d,_0xed605c,_0x27f47b){const _0x545439=_0x383e57;if(_0x6ed827==='')return;_0x52d86e+=0x2,_0x3736fc+=0x2,_0x13fb1d-=0x4,_0xed605c-=0x4;const _0x39a1fa=ImageManager[_0x545439(0x232)](_0x6ed827),_0x2f2853=_0x39a1fa[_0x545439(0x25f)],_0x1220a4=_0x39a1fa[_0x545439(0x1ec)],_0x1bd87e=Math[_0x545439(0x24a)](_0x13fb1d/_0x2f2853,_0xed605c/_0x1220a4,_0x27f47b?0x1:0x3e8),_0x1e8d59=Math[_0x545439(0x16f)](_0x39a1fa['width']*_0x1bd87e),_0x2e4889=Math[_0x545439(0x16f)](_0x39a1fa[_0x545439(0x1ec)]*_0x1bd87e);this[_0x545439(0x1dc)][_0x545439(0x246)](_0x39a1fa,0x0,0x0,_0x2f2853,_0x1220a4,_0x52d86e,_0x3736fc,_0x1e8d59,_0x2e4889);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x1b2)]=function(_0xe00d6,_0x5cdb8c,_0x36c3f6,_0x25ca76,_0x58a6d,_0x33645b){const _0x3227ae=_0x383e57;if(_0xe00d6==='')return;_0x5cdb8c+=0x2,_0x36c3f6+=0x2,_0x25ca76-=0x4,_0x58a6d-=0x4;const _0x44601a=ImageManager['loadPicture'](_0xe00d6),_0x435c9b=_0x44601a[_0x3227ae(0x25f)],_0x11746d=_0x44601a[_0x3227ae(0x1ec)],_0x327a51=Math['min'](_0x25ca76/_0x435c9b,_0x58a6d/_0x11746d,_0x33645b?0x1:0x3e8),_0x8ba2af=Math[_0x3227ae(0x16f)](_0x44601a[_0x3227ae(0x25f)]*_0x327a51),_0x5549b7=Math['ceil'](_0x44601a[_0x3227ae(0x1ec)]*_0x327a51);_0x5cdb8c+=(_0x25ca76-_0x8ba2af)/0x2,_0x36c3f6+=(_0x58a6d-_0x5549b7)/0x2,this['contentsBack'][_0x3227ae(0x246)](_0x44601a,0x0,0x0,_0x435c9b,_0x11746d,_0x5cdb8c,_0x36c3f6,_0x8ba2af,_0x5549b7);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x250)]=function(_0x286c90,_0x4a7833,_0x40de59,_0x1beeb2,_0x46db24){const _0x59bc80=_0x383e57;if(_0x286c90[_0x59bc80(0xe4)]){if(_0x59bc80(0x1f5)===_0x59bc80(0x1f5))_0x46db24=_0x46db24||'left',this['drawText'](_0x286c90['playtime'],_0x4a7833,_0x40de59,_0x1beeb2,_0x46db24);else{if(this['_saveConfirmWindow'])this[_0x59bc80(0x1a1)]['close']();}}},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x171)]=function(_0x675b93,_0x25cb23,_0x2e2aef,_0x3ae212,_0x2f8b45){const _0x332cc1=_0x383e57;if(_0x675b93[_0x332cc1(0xcd)]){if(_0x332cc1(0xfa)!==_0x332cc1(0xc6)){_0x2f8b45=_0x2f8b45||_0x332cc1(0xe2);let _0x365b90=this['getTimestamp'](_0x675b93);Imported[_0x332cc1(0x15b)]&&this[_0x332cc1(0x205)]()&&(_0x365b90=_0x332cc1(0x1a8)[_0x332cc1(0x27d)](_0x365b90)),this[_0x332cc1(0x20d)](_0x365b90,_0x25cb23,_0x2e2aef,_0x3ae212,_0x2f8b45);}else{if(this[_0x332cc1(0x14b)]===_0x7cc4a2)this[_0x332cc1(0x1d0)]();if(this[_0x332cc1(0x14b)]['saveDescription']===_0x142086)this[_0x332cc1(0x1d0)]();this[_0x332cc1(0x14b)]['saveDescription']=_0x587e97['SaveCore']['ParseTextCodes'](_0x440b74);}}},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x15d)]=function(_0x467b0d){const _0xc4c5af=_0x383e57,_0x1efdf1=_0x467b0d[_0xc4c5af(0xcd)],_0xb2c34d=new Date(_0x1efdf1);let _0x1bdd82=_0xc4c5af(0x13a);_0x1bdd82=_0x1bdd82['replace'](/\[YEAR\]/gi,'%1'),_0x1bdd82=_0x1bdd82[_0xc4c5af(0x230)](/\[MONTH\]/gi,'%2'),_0x1bdd82=_0x1bdd82[_0xc4c5af(0x230)](/\[DATE\]/gi,'%3'),_0x1bdd82=_0x1bdd82[_0xc4c5af(0x230)](/\[HOUR\]/gi,'%4'),_0x1bdd82=_0x1bdd82['replace'](/\[MINUTE\]/gi,'%5'),_0x1bdd82=_0x1bdd82[_0xc4c5af(0x230)](/\[SECOND\]/gi,'%6');let _0x1cd3f5=String(_0xb2c34d['getFullYear']())['split']('')[_0xc4c5af(0x13b)]('​'),_0x1ced08=String(_0xb2c34d[_0xc4c5af(0xce)]()+0x1),_0x1ac63f=String(_0xb2c34d[_0xc4c5af(0x1e6)]())[_0xc4c5af(0x10e)](0x2,'0'),_0x20b474=String(_0xb2c34d[_0xc4c5af(0x21b)]())[_0xc4c5af(0x10e)](0x2,'0'),_0x137ad2=String(_0xb2c34d['getMinutes']())[_0xc4c5af(0x10e)](0x2,'0'),_0x1899b6=String(_0xb2c34d[_0xc4c5af(0x27b)]())[_0xc4c5af(0x10e)](0x2,'0'),_0x25e454=_0x1bdd82[_0xc4c5af(0x27d)](_0x1cd3f5,_0x1ced08,_0x1ac63f,_0x20b474,_0x137ad2,_0x1899b6);return _0x25e454;},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x278)]=function(_0xea90c8,_0x221e1c,_0x41e451,_0x59ec63){const _0x37324f=_0x383e57;if(_0xea90c8[_0x37324f(0x1de)]===undefined)return;const _0x4f2725=_0xea90c8[_0x37324f(0x1de)],_0x2c0aef=TextManager[_0x37324f(0x14e)];Window_SavefileList['prototype'][_0x37324f(0x17e)][_0x37324f(0x200)](this,_0x4f2725,_0x2c0aef,_0x221e1c,_0x41e451,_0x59ec63);},Window_SavefileList['prototype']['drawDescription']=function(_0x24fb54,_0xdb9773,_0xd9b3ab,_0x4299bb,_0xc3afe1){const _0x48756e=_0x383e57;if(_0x24fb54[_0x48756e(0x133)]){if(_0x48756e(0xf2)!==_0x48756e(0xf2)){if(_0x3ad5b5[_0x48756e(0x183)]()===_0x48756e(0x116))_0x46d653=![];if(_0x42eef2[_0x48756e(0x260)])_0x21b59e=![];_0x4bf942['SaveCore'][_0x48756e(0x1db)][_0x48756e(0x200)](this,_0x4b775a,_0x567572);}else{const _0x307503=this[_0x48756e(0xdf)](_0x24fb54[_0x48756e(0x133)])[_0x48756e(0x25f)];_0xc3afe1=_0xc3afe1||_0x48756e(0xe2);if(_0xc3afe1===_0x48756e(0x152))_0xdb9773=_0xdb9773+_0x4299bb-_0x307503;else _0xc3afe1===_0x48756e(0x130)&&(_0xdb9773=_0xdb9773+(_0x4299bb-_0x307503)/0x2);this[_0x48756e(0x17b)](_0x24fb54['description'],_0xdb9773,_0xd9b3ab,_0x4299bb);}}},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x258)]=function(_0x2294a6,_0x3b483c){const _0x4498cf=_0x383e57;if(_0x2294a6){const _0x27b5b7=ImageManager[_0x4498cf(0x232)](_0x2294a6[_0x4498cf(0x137)]||'');_0x27b5b7[_0x4498cf(0x147)](this[_0x4498cf(0x24c)]['bind'](this,_0x2294a6,_0x3b483c));}else _0x4498cf(0x274)!=='tmiHf'?(_0x545076['playSave'](),_0x43748f['SaveCore'][_0x4498cf(0x1fa)][_0x4498cf(0xed)][_0x4498cf(0x207)][_0x4498cf(0x200)](this),this['openSaveConfirmationWindow'](!![])):this['drawFileData'](this[_0x4498cf(0x1c7)],_0x3b483c);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x24c)]=function(_0x301d83,_0x57beae){const _0x167081=_0x383e57,_0x13b6c4=this[_0x167081(0x19b)]();switch(_0x13b6c4){case _0x167081(0x14d):this[_0x167081(0x192)](_0x301d83,_0x57beae);break;case _0x167081(0x1b0):this[_0x167081(0x259)](_0x301d83,_0x57beae);break;case'large':this['drawLargeStyleContents'](_0x301d83,_0x57beae);break;default:this[_0x167081(0x1f9)](_0x301d83,_0x57beae);break;}this[_0x167081(0x1a2)]();const _0x36ea64=_0x301d83[_0x167081(0x25e)];this[_0x167081(0x165)](_0x36ea64,_0x57beae);},Window_SavefileList[_0x383e57(0x17c)]['drawFileData']=function(_0x11dcfb,_0x5b45b9){const _0x2b2742=_0x383e57,_0x1d53bc=this['menuStyle']();switch(_0x1d53bc){case _0x2b2742(0x14d):this['drawVerticalStyleFileData'](_0x11dcfb,_0x5b45b9);break;case'box':this[_0x2b2742(0x1e5)](_0x11dcfb,_0x5b45b9);break;case _0x2b2742(0xf9):this[_0x2b2742(0x178)](_0x11dcfb,_0x5b45b9);break;default:this[_0x2b2742(0x179)](_0x11dcfb,_0x5b45b9);break;}},Window_SavefileList['prototype'][_0x383e57(0x1f9)]=function(_0x143f7b,_0xe70c68){const _0x452536=_0x383e57;VisuMZ['SaveCore'][_0x452536(0x1fa)][_0x452536(0x247)][_0x452536(0x26b)][_0x452536(0x200)](this,_0x143f7b,_0xe70c68);},Window_SavefileList[_0x383e57(0x17c)]['drawVerticalStyleContents']=function(_0x30aaf8,_0x457c11){const _0x282d8a=_0x383e57;VisuMZ[_0x282d8a(0xdd)][_0x282d8a(0x1fa)][_0x282d8a(0x247)]['VertContentsJS'][_0x282d8a(0x200)](this,_0x30aaf8,_0x457c11);},Window_SavefileList['prototype']['drawBoxStyleContents']=function(_0x280e6a,_0x5aa8ed){const _0x42be71=_0x383e57;VisuMZ['SaveCore'][_0x42be71(0x1fa)][_0x42be71(0x247)]['BoxContentsJS']['call'](this,_0x280e6a,_0x5aa8ed);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x1d2)]=function(_0x29c2c9,_0x4352de){const _0x257acc=_0x383e57;VisuMZ[_0x257acc(0xdd)]['Settings'][_0x257acc(0x247)]['LargeContentsJS']['call'](this,_0x29c2c9,_0x4352de);},Window_SavefileList[_0x383e57(0x17c)]['drawListStyleFileData']=function(_0x47b320,_0x4fb535){const _0xc74135=_0x383e57;VisuMZ[_0xc74135(0xdd)][_0xc74135(0x1fa)][_0xc74135(0x247)][_0xc74135(0x172)][_0xc74135(0x200)](this,_0x47b320,_0x4fb535);},Window_SavefileList[_0x383e57(0x17c)]['drawVerticalStyleFileData']=function(_0x4e8804,_0x49c790){const _0x56dee0=_0x383e57;VisuMZ[_0x56dee0(0xdd)][_0x56dee0(0x1fa)][_0x56dee0(0x247)]['VertFileDataJS'][_0x56dee0(0x200)](this,_0x4e8804,_0x49c790);},Window_SavefileList[_0x383e57(0x17c)]['drawBoxStyleFileData']=function(_0x35809a,_0x30f72c){const _0x1f909b=_0x383e57;VisuMZ[_0x1f909b(0xdd)][_0x1f909b(0x1fa)][_0x1f909b(0x247)][_0x1f909b(0x1e2)][_0x1f909b(0x200)](this,_0x35809a,_0x30f72c);},Window_SavefileList[_0x383e57(0x17c)][_0x383e57(0x178)]=function(_0xf13770,_0x1783a8){const _0x1234fb=_0x383e57;VisuMZ[_0x1234fb(0xdd)]['Settings']['SaveMenu'][_0x1234fb(0x11a)][_0x1234fb(0x200)](this,_0xf13770,_0x1783a8);};