//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.12] [SaveCore]
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
 * - Enables/disables Autosave on a local (lowest) level.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This does NOT mean it will change autosaving for other loaded game saves
 *   or new game sessions.
 * - This ONLY applies to the local session for the dev to control whether or
 *   not autosaving will occur at its usual conditions and scenarios.
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
 * Version 1.12: December 14, 2023
 * * Documentation Update!
 * ** Updated Plugin Command "Autosave: Enable/Disable" description for clarity
 * *** Enables/disables Autosave on a local (lowest) level.
 * ** Added extra text in the Plugin Commands help section for the Command:
 *    "Autosave: Enable/Disable":
 * *** This does NOT mean it will change autosaving for other loaded game saves
 *     or new game sessions.
 * *** This ONLY applies to the local session for the dev to control whether or
 *     not autosaving will occur at its usual conditions and scenarios.
 * 
 * Version 1.11: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where there is not a soft fade in after using the single slot
 *    loading screen from the VisuMZ Save Core. Fix made by Olivia.
 * 
 * Version 1.10: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a rare bug that prevents plugin commands from saving in the current
 *    save slot upon certain types of loading. Fix made by Arisu.
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Requires Enables/disables Autosave on a local (lowest) level.
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
 * @command Separator_Save
 * @text -
 * @desc -
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
 * @command Separator_End
 * @text -
 * @desc -
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

const _0x21ae0c=_0x318d;(function(_0x584cc3,_0x235422){const _0x30f385=_0x318d,_0x244c96=_0x584cc3();while(!![]){try{const _0x405377=parseInt(_0x30f385(0x270))/0x1+-parseInt(_0x30f385(0x2d1))/0x2+parseInt(_0x30f385(0x21b))/0x3*(-parseInt(_0x30f385(0x392))/0x4)+parseInt(_0x30f385(0x240))/0x5+parseInt(_0x30f385(0x25d))/0x6+parseInt(_0x30f385(0x2ac))/0x7+-parseInt(_0x30f385(0x210))/0x8;if(_0x405377===_0x235422)break;else _0x244c96['push'](_0x244c96['shift']());}catch(_0x11c905){_0x244c96['push'](_0x244c96['shift']());}}}(_0x4073,0x7c74b));var label=_0x21ae0c(0x262),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21ae0c(0x247)](function(_0x39f0d9){const _0x5920da=_0x21ae0c;return _0x39f0d9['status']&&_0x39f0d9['description'][_0x5920da(0x2cc)]('['+label+']');})[0x0];function _0x318d(_0x2a0b96,_0x266178){const _0x4073b6=_0x4073();return _0x318d=function(_0x318da3,_0x8bf9eb){_0x318da3=_0x318da3-0x1ea;let _0xfc7538=_0x4073b6[_0x318da3];return _0xfc7538;},_0x318d(_0x2a0b96,_0x266178);}VisuMZ[label][_0x21ae0c(0x343)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x21ae0c(0x339)]=function(_0x20dcb6,_0x2d5eb1){const _0x1ab4ed=_0x21ae0c;for(const _0x26d9c5 in _0x2d5eb1){if(_0x1ab4ed(0x30a)===_0x1ab4ed(0x30a)){if(_0x26d9c5[_0x1ab4ed(0x31c)](/(.*):(.*)/i)){const _0x3a306d=String(RegExp['$1']),_0x31733e=String(RegExp['$2'])[_0x1ab4ed(0x282)]()['trim']();let _0x347966,_0x4a2746,_0x436bb2;switch(_0x31733e){case _0x1ab4ed(0x29f):_0x347966=_0x2d5eb1[_0x26d9c5]!==''?Number(_0x2d5eb1[_0x26d9c5]):0x0;break;case'ARRAYNUM':_0x4a2746=_0x2d5eb1[_0x26d9c5]!==''?JSON[_0x1ab4ed(0x306)](_0x2d5eb1[_0x26d9c5]):[],_0x347966=_0x4a2746[_0x1ab4ed(0x1f2)](_0x3acb63=>Number(_0x3acb63));break;case _0x1ab4ed(0x351):_0x347966=_0x2d5eb1[_0x26d9c5]!==''?eval(_0x2d5eb1[_0x26d9c5]):null;break;case'ARRAYEVAL':_0x4a2746=_0x2d5eb1[_0x26d9c5]!==''?JSON['parse'](_0x2d5eb1[_0x26d9c5]):[],_0x347966=_0x4a2746[_0x1ab4ed(0x1f2)](_0x4371f4=>eval(_0x4371f4));break;case _0x1ab4ed(0x203):_0x347966=_0x2d5eb1[_0x26d9c5]!==''?JSON[_0x1ab4ed(0x306)](_0x2d5eb1[_0x26d9c5]):'';break;case'ARRAYJSON':_0x4a2746=_0x2d5eb1[_0x26d9c5]!==''?JSON['parse'](_0x2d5eb1[_0x26d9c5]):[],_0x347966=_0x4a2746['map'](_0x316a2b=>JSON[_0x1ab4ed(0x306)](_0x316a2b));break;case'FUNC':_0x347966=_0x2d5eb1[_0x26d9c5]!==''?new Function(JSON['parse'](_0x2d5eb1[_0x26d9c5])):new Function('return\x200');break;case'ARRAYFUNC':_0x4a2746=_0x2d5eb1[_0x26d9c5]!==''?JSON[_0x1ab4ed(0x306)](_0x2d5eb1[_0x26d9c5]):[],_0x347966=_0x4a2746[_0x1ab4ed(0x1f2)](_0x58a56b=>new Function(JSON['parse'](_0x58a56b)));break;case _0x1ab4ed(0x2e3):_0x347966=_0x2d5eb1[_0x26d9c5]!==''?String(_0x2d5eb1[_0x26d9c5]):'';break;case _0x1ab4ed(0x215):_0x4a2746=_0x2d5eb1[_0x26d9c5]!==''?JSON[_0x1ab4ed(0x306)](_0x2d5eb1[_0x26d9c5]):[],_0x347966=_0x4a2746['map'](_0x45809a=>String(_0x45809a));break;case _0x1ab4ed(0x369):_0x436bb2=_0x2d5eb1[_0x26d9c5]!==''?JSON[_0x1ab4ed(0x306)](_0x2d5eb1[_0x26d9c5]):{},_0x20dcb6[_0x3a306d]={},VisuMZ['ConvertParams'](_0x20dcb6[_0x3a306d],_0x436bb2);continue;case _0x1ab4ed(0x33d):_0x4a2746=_0x2d5eb1[_0x26d9c5]!==''?JSON['parse'](_0x2d5eb1[_0x26d9c5]):[],_0x347966=_0x4a2746['map'](_0x5e3a7=>VisuMZ[_0x1ab4ed(0x339)]({},JSON[_0x1ab4ed(0x306)](_0x5e3a7)));break;default:continue;}_0x20dcb6[_0x3a306d]=_0x347966;}}else{if(!this[_0x1ab4ed(0x33f)]())return this[_0x1ab4ed(0x2dd)](_0x259462);if(!this[_0x1ab4ed(0x25e)])this[_0x1ab4ed(0x281)]();const _0x4017ae=this['_autosaveConfirmWindow'];this['removeChild'](_0x4017ae),this[_0x1ab4ed(0x2dc)](_0x4017ae),_0x4017ae[_0x1ab4ed(0x242)](_0x2b125d),_0x4017ae['fadeIn']();const _0x320445=_0x873e33[_0x1ab4ed(0x262)][_0x1ab4ed(0x343)][_0x1ab4ed(0x345)][_0x1ab4ed(0x2b8)];_0x4be4b5(this[_0x1ab4ed(0x2dd)][_0x1ab4ed(0x2de)](this,_0x2d0121),_0x320445);}}return _0x20dcb6;},(_0x4da7e4=>{const _0x12521c=_0x21ae0c,_0x132889=_0x4da7e4[_0x12521c(0x2c2)];for(const _0x3246be of dependencies){if('IjVXh'===_0x12521c(0x235)){if(!Imported[_0x3246be]){if(_0x12521c(0x1eb)!==_0x12521c(0x35d)){alert(_0x12521c(0x398)[_0x12521c(0x2d5)](_0x132889,_0x3246be)),SceneManager[_0x12521c(0x2b2)]();break;}else _0x594d89===0x0?this[_0x12521c(0x295)](_0x315a33[_0x12521c(0x307)],_0x28d9c7,_0x3e22e3,0xb4):this[_0x12521c(0x295)](_0x16a4dc[_0x12521c(0x299)]+'\x20'+_0x285bc0,_0x563f32,_0x38115f,0xb4);}}else{const _0x40e52c=_0x46ce73(_0x8134fb['$1']);_0x40e52c<_0x73a2fe?(_0x2a0147(_0x12521c(0x261)[_0x12521c(0x2d5)](_0x19e348,_0x40e52c,_0xd65833)),_0x304d6d[_0x12521c(0x2b2)]()):_0x1d4c8e=_0x57c3e6[_0x12521c(0x27e)](_0x40e52c,_0x2daa89);}}const _0x19239c=_0x4da7e4[_0x12521c(0x284)];if(_0x19239c[_0x12521c(0x31c)](/\[Version[ ](.*?)\]/i)){if(_0x12521c(0x279)===_0x12521c(0x249))return'file0';else{const _0x4fc8af=Number(RegExp['$1']);_0x4fc8af!==VisuMZ[label][_0x12521c(0x32b)]&&(alert(_0x12521c(0x216)[_0x12521c(0x2d5)](_0x132889,_0x4fc8af)),SceneManager['exit']());}}if(_0x19239c[_0x12521c(0x31c)](/\[Tier[ ](\d+)\]/i)){if(_0x12521c(0x1fd)!==_0x12521c(0x259)){const _0x38891d=Number(RegExp['$1']);_0x38891d<tier?(alert(_0x12521c(0x261)['format'](_0x132889,_0x38891d,tier)),SceneManager[_0x12521c(0x2b2)]()):_0x12521c(0x220)===_0x12521c(0x220)?tier=Math[_0x12521c(0x27e)](_0x38891d,tier):_0x25d6c6[_0x12521c(0x262)][_0x12521c(0x343)]['SaveMenu'][_0x12521c(0x2ce)][_0x12521c(0x33b)](this,_0x18d302,_0x339546);}else{let _0x22f606=_0x4f86d5[_0x12521c(0x262)][_0x12521c(0x283)]['call'](this);const _0x7831be=_0x44fa5b['SaveCore'][_0x12521c(0x343)];if(_0x7831be[_0x12521c(0x2f5)][_0x12521c(0x28e)]&&_0x7831be[_0x12521c(0x2f5)][_0x12521c(0x39a)])_0x22f606++;return _0x22f606;}}VisuMZ[_0x12521c(0x339)](VisuMZ[label]['Settings'],_0x4da7e4[_0x12521c(0x313)]);})(pluginData),PluginManager[_0x21ae0c(0x355)](pluginData['name'],'AutosaveEnable',_0x4d47e1=>{const _0x2727e7=_0x21ae0c;if(!DataManager[_0x2727e7(0x208)]())return;VisuMZ['ConvertParams'](_0x4d47e1,_0x4d47e1);if($gameSystem)$gameSystem[_0x2727e7(0x2a7)](_0x4d47e1[_0x2727e7(0x26d)]);}),PluginManager[_0x21ae0c(0x355)](pluginData[_0x21ae0c(0x2c2)],'AutosaveRequest',_0x558d00=>{const _0x3af179=_0x21ae0c;if(!DataManager[_0x3af179(0x208)]()||$gameParty[_0x3af179(0x25b)]())return;SceneManager[_0x3af179(0x273)][_0x3af179(0x368)]();}),PluginManager[_0x21ae0c(0x355)](pluginData[_0x21ae0c(0x2c2)],_0x21ae0c(0x24d),_0x58cfcf=>{const _0x1b049a=_0x21ae0c;if(!DataManager[_0x1b049a(0x208)]()||$gameParty[_0x1b049a(0x25b)]())return;SceneManager[_0x1b049a(0x273)][_0x1b049a(0x2f7)]();}),PluginManager['registerCommand'](pluginData[_0x21ae0c(0x2c2)],_0x21ae0c(0x287),_0x3ca27c=>{const _0x1423b7=_0x21ae0c;if(!DataManager[_0x1423b7(0x208)]()||$gameParty['inBattle']())return;SceneManager['_scene'][_0x1423b7(0x256)]();}),PluginManager[_0x21ae0c(0x355)](pluginData[_0x21ae0c(0x2c2)],_0x21ae0c(0x228),_0xc7f9c5=>{const _0x545013=_0x21ae0c;SceneManager[_0x545013(0x273)]['saveCurrentSlot']();}),PluginManager[_0x21ae0c(0x355)](pluginData['name'],_0x21ae0c(0x2ae),_0x288efe=>{const _0x4abfa2=_0x21ae0c;VisuMZ[_0x4abfa2(0x339)](_0x288efe,_0x288efe);if($gameSystem)$gameSystem[_0x4abfa2(0x376)](_0x288efe['Text']);}),PluginManager['registerCommand'](pluginData[_0x21ae0c(0x2c2)],'SavePicture',_0x3eeafe=>{const _0x3fffc9=_0x21ae0c;VisuMZ[_0x3fffc9(0x339)](_0x3eeafe,_0x3eeafe);if($gameSystem)$gameSystem[_0x3fffc9(0x268)](_0x3eeafe['Filename']);}),VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x2b1)]=Scene_Boot[_0x21ae0c(0x300)]['onDatabaseLoaded'],Scene_Boot[_0x21ae0c(0x300)]['onDatabaseLoaded']=function(){const _0x2217af=_0x21ae0c;VisuMZ[_0x2217af(0x262)][_0x2217af(0x2b1)][_0x2217af(0x33b)](this),this[_0x2217af(0x2bb)](),this[_0x2217af(0x310)]();},Scene_Boot[_0x21ae0c(0x300)]['process_VisuMZ_SaveCore_Settings']=function(){const _0x3d7d53=_0x21ae0c;if(StorageManager[_0x3d7d53(0x1f0)]()===_0x3d7d53(0x2d2)){if(_0x3d7d53(0x370)!==_0x3d7d53(0x1fb))$dataSystem[_0x3d7d53(0x2fc)]=!![];else{if(this['_saveConfirmWindow'])this[_0x3d7d53(0x26b)][_0x3d7d53(0x23e)]();}}},VisuMZ['GlobalSwitches']=[],VisuMZ['GlobalVariables']=[],Scene_Boot[_0x21ae0c(0x300)]['process_VisuMZ_SaveCore_Switches_Variables']=function(){const _0x106e79=_0x21ae0c;for(let _0x35fc9e=0x1;_0x35fc9e<$dataSystem[_0x106e79(0x365)][_0x106e79(0x326)];_0x35fc9e++){if($dataSystem[_0x106e79(0x365)][_0x35fc9e][_0x106e79(0x31c)](/<GLOBAL>/i))VisuMZ[_0x106e79(0x314)]['push'](_0x35fc9e);}for(let _0x5528f9=0x1;_0x5528f9<$dataSystem['variables']['length'];_0x5528f9++){if(_0x106e79(0x352)===_0x106e79(0x352)){if($dataSystem[_0x106e79(0x382)][_0x5528f9]['match'](/<GLOBAL>/i))VisuMZ[_0x106e79(0x238)][_0x106e79(0x219)](_0x5528f9);}else return this['saveStyle']()===_0x106e79(0x2d2)?_0x106e79(0x266):_0x5e7142[_0x106e79(0x262)]['Settings']['Autosave'][_0x106e79(0x217)];}},VisuMZ['SaveCore'][_0x21ae0c(0x245)]=DataManager[_0x21ae0c(0x34d)],DataManager[_0x21ae0c(0x34d)]=function(){const _0x530e16=_0x21ae0c;VisuMZ[_0x530e16(0x262)][_0x530e16(0x245)][_0x530e16(0x33b)](this),Scene_File['MAX_BATTLE_MEMBERS']=$gameParty[_0x530e16(0x20a)]();},DataManager[_0x21ae0c(0x208)]=function(){const _0x4b1a5a=_0x21ae0c;return!DataManager['isBattleTest']()&&!DataManager[_0x4b1a5a(0x23f)]()&&$dataSystem[_0x4b1a5a(0x2fc)];},DataManager[_0x21ae0c(0x22f)]=function(){const _0x45e085=_0x21ae0c;if(StorageManager[_0x45e085(0x1f0)]()===_0x45e085(0x2d2))return 0x1;let _0x5222b3=VisuMZ[_0x45e085(0x262)][_0x45e085(0x343)][_0x45e085(0x37a)][_0x45e085(0x297)]?0x0:0x1;return VisuMZ['SaveCore']['Settings']['Save'][_0x45e085(0x34f)]+_0x5222b3;},DataManager[_0x21ae0c(0x2d7)]=function(_0x58d52c){const _0x2c13f1=_0x21ae0c,_0x3f669c=VisuMZ[_0x2c13f1(0x262)]['Settings'][_0x2c13f1(0x37a)][_0x2c13f1(0x340)];return _0x3f669c[_0x2c13f1(0x2d5)](_0x58d52c);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x28c)]=DataManager[_0x21ae0c(0x2b6)],DataManager[_0x21ae0c(0x2b6)]=function(){const _0x5e54e8=_0x21ae0c,_0xb175e3=VisuMZ['SaveCore'][_0x5e54e8(0x28c)]['call'](this);return VisuMZ['SaveCore'][_0x5e54e8(0x343)][_0x5e54e8(0x200)][_0x5e54e8(0x2ab)][_0x5e54e8(0x33b)](this,_0xb175e3);},ConfigManager[_0x21ae0c(0x307)]=VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x343)][_0x21ae0c(0x2f5)]['Default'],ConfigManager[_0x21ae0c(0x223)]=[],ConfigManager[_0x21ae0c(0x37e)]=[],VisuMZ[_0x21ae0c(0x262)]['ConfigManager_makeData']=ConfigManager[_0x21ae0c(0x2b0)],ConfigManager[_0x21ae0c(0x2b0)]=function(){const _0xe5ec78=_0x21ae0c,_0x3924d9=VisuMZ[_0xe5ec78(0x262)]['ConfigManager_makeData'][_0xe5ec78(0x33b)](this);return _0x3924d9[_0xe5ec78(0x307)]=this[_0xe5ec78(0x307)]||VisuMZ[_0xe5ec78(0x262)][_0xe5ec78(0x343)][_0xe5ec78(0x2f5)][_0xe5ec78(0x227)],_0x3924d9[_0xe5ec78(0x223)]=this['globalSwitches']||[],_0x3924d9['globalVariables']=this['globalVariables']||[],_0x3924d9;},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x246)]=ConfigManager[_0x21ae0c(0x362)],ConfigManager[_0x21ae0c(0x362)]=function(_0x4988b3){const _0x379877=_0x21ae0c;VisuMZ['SaveCore'][_0x379877(0x246)][_0x379877(0x33b)](this,_0x4988b3),this['autosave']=_0x4988b3[_0x379877(0x307)]!==undefined?_0x4988b3['autosave']:VisuMZ[_0x379877(0x262)][_0x379877(0x343)][_0x379877(0x2f5)]['Default'],this[_0x379877(0x223)]=_0x4988b3[_0x379877(0x223)]||[],this[_0x379877(0x37e)]=_0x4988b3[_0x379877(0x37e)]||[];},StorageManager['isLocalMode']=function(){const _0xb67e07=_0x21ae0c;if(Utils['isNwjs']())return'Uofgd'!==_0xb67e07(0x38c)?VisuMZ[_0xb67e07(0x262)][_0xb67e07(0x343)][_0xb67e07(0x37a)][_0xb67e07(0x2b4)]:_0x423ef9[_0xb67e07(0x262)]['Scene_Map_needsFadeIn']['call'](this)||_0x26aa5d[_0xb67e07(0x1ed)](_0x1d9c3d);else{if('yhciC'===_0xb67e07(0x344))return![];else _0x53e09b['playSave'](),_0x41602e['SaveCore'][_0xb67e07(0x343)]['Save'][_0xb67e07(0x388)][_0xb67e07(0x33b)](this),this[_0xb67e07(0x33e)](!![]);}},StorageManager['filePath']=function(_0x290d4c){const _0x11ea5c=_0x21ae0c,_0x447b35=this[_0x11ea5c(0x272)](),_0x5bae76=VisuMZ[_0x11ea5c(0x262)]['Settings'][_0x11ea5c(0x37a)][_0x11ea5c(0x353)];return _0x447b35+_0x5bae76[_0x11ea5c(0x2d5)](_0x290d4c);},StorageManager[_0x21ae0c(0x373)]=function(_0x1d3f93){const _0x27fb77=_0x21ae0c,_0x559a1e=$dataSystem[_0x27fb77(0x315)]['gameId'],_0x64f78b=VisuMZ[_0x27fb77(0x262)][_0x27fb77(0x343)][_0x27fb77(0x37a)][_0x27fb77(0x28a)];return _0x64f78b[_0x27fb77(0x2d5)](_0x559a1e,_0x1d3f93);},StorageManager[_0x21ae0c(0x26a)]=function(){const _0x5bc9c5=_0x21ae0c;return VisuMZ[_0x5bc9c5(0x262)]['Settings']['Save'][_0x5bc9c5(0x29e)];},StorageManager['saveStyle']=function(){const _0x5e5940=_0x21ae0c;return VisuMZ['SaveCore'][_0x5e5940(0x343)]['Save']['SaveStyle'];},StorageManager[_0x21ae0c(0x2c3)]=function(){const _0x33ca1c=_0x21ae0c;return this[_0x33ca1c(0x1f0)]()==='single'?'file0':VisuMZ[_0x33ca1c(0x262)][_0x33ca1c(0x343)]['Autosave'][_0x33ca1c(0x217)];},TextManager[_0x21ae0c(0x2bc)]=VisuMZ[_0x21ae0c(0x262)]['Settings'][_0x21ae0c(0x37a)]['VocabLockedSaveSlot'],TextManager['saveSuccess']=VisuMZ[_0x21ae0c(0x262)]['Settings'][_0x21ae0c(0x345)][_0x21ae0c(0x1f3)],TextManager[_0x21ae0c(0x22d)]=VisuMZ[_0x21ae0c(0x262)]['Settings'][_0x21ae0c(0x345)][_0x21ae0c(0x338)],TextManager[_0x21ae0c(0x296)]=VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x343)]['SaveConfirm'][_0x21ae0c(0x1f1)],TextManager[_0x21ae0c(0x32f)]=VisuMZ['SaveCore'][_0x21ae0c(0x343)][_0x21ae0c(0x2f5)]['Name'],TextManager[_0x21ae0c(0x319)]=VisuMZ[_0x21ae0c(0x262)]['Settings'][_0x21ae0c(0x36b)]['VocabAutosaveSuccess'],TextManager[_0x21ae0c(0x288)]=VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x343)]['AutosaveConfirm'][_0x21ae0c(0x31d)],TextManager[_0x21ae0c(0x2d8)]=VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x343)][_0x21ae0c(0x200)][_0x21ae0c(0x36e)],ColorManager['latestSavefile']=function(){const _0x893332=_0x21ae0c,_0x5d4f93='_stored_latestSavefile';this[_0x893332(0x328)]=this[_0x893332(0x328)]||{};if(this[_0x893332(0x328)][_0x5d4f93])return this[_0x893332(0x328)][_0x5d4f93];const _0x54f4d4=VisuMZ[_0x893332(0x262)][_0x893332(0x343)]['SaveMenu'][_0x893332(0x38f)];return this[_0x893332(0x22c)](_0x5d4f93,_0x54f4d4);},ColorManager['getColorDataFromPluginParameters']=function(_0x5637bc,_0x250660){const _0x2bf32e=_0x21ae0c;_0x250660=String(_0x250660),this[_0x2bf32e(0x328)]=this[_0x2bf32e(0x328)]||{};if(_0x250660[_0x2bf32e(0x31c)](/#(.*)/i)){if('tsEFS'!==_0x2bf32e(0x2eb)){if(_0x26d903[_0x2bf32e(0x2c3)]()===_0x2bf32e(0x2a0))_0x726609=![];if(_0x5ef04d[_0x2bf32e(0x21f)])_0x253a88=![];_0x1f23c1[_0x2bf32e(0x262)][_0x2bf32e(0x385)]['call'](this,_0x505103,_0x1f43f7);}else this[_0x2bf32e(0x328)][_0x5637bc]=_0x2bf32e(0x301)['format'](String(RegExp['$1']));}else _0x2bf32e(0x2a3)!==_0x2bf32e(0x2a3)?this[_0x2bf32e(0x23a)]={'autosaveEnabled':!![],'saveDescription':'','savePicture':''}:this[_0x2bf32e(0x328)][_0x5637bc]=this[_0x2bf32e(0x367)](Number(_0x250660));return this[_0x2bf32e(0x328)][_0x5637bc];},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x2e4)]=Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x36a)],Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x36a)]=function(){const _0x4bbf5f=_0x21ae0c;VisuMZ['SaveCore'][_0x4bbf5f(0x2e4)][_0x4bbf5f(0x33b)](this),this['initSaveCore']();},Game_System[_0x21ae0c(0x300)]['initSaveCore']=function(){const _0x54a4e0=_0x21ae0c;this[_0x54a4e0(0x23a)]={'autosaveEnabled':!![],'saveDescription':'','savePicture':''};},Game_System[_0x21ae0c(0x300)]['isAutosaveEnabled']=function(){const _0x2a3739=_0x21ae0c;if(!$dataSystem[_0x2a3739(0x2fc)])return![];if(this['_SaveCoreSettings']===undefined)this[_0x2a3739(0x2b7)]();if(this[_0x2a3739(0x23a)][_0x2a3739(0x2c9)]===undefined)this['initSaveCore']();return this[_0x2a3739(0x23a)][_0x2a3739(0x2c9)];},Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x2a7)]=function(_0x57cdcb){const _0x247f95=_0x21ae0c;if(!$dataSystem[_0x247f95(0x2fc)])return;if(this[_0x247f95(0x23a)]===undefined)this[_0x247f95(0x2b7)]();if(this[_0x247f95(0x23a)][_0x247f95(0x2c9)]===undefined)this[_0x247f95(0x2b7)]();this[_0x247f95(0x23a)][_0x247f95(0x2c9)]=_0x57cdcb;},Game_System['prototype'][_0x21ae0c(0x30f)]=function(){const _0x2808bc=_0x21ae0c;if(this[_0x2808bc(0x23a)]===undefined)this[_0x2808bc(0x2b7)]();if(this[_0x2808bc(0x23a)]['saveDescription']===undefined)this[_0x2808bc(0x2b7)]();return this[_0x2808bc(0x23a)]['saveDescription'];},Game_System['prototype']['setSaveDescription']=function(_0x2b4777){const _0x5e8284=_0x21ae0c;if(this[_0x5e8284(0x23a)]===undefined)this[_0x5e8284(0x2b7)]();if(this['_SaveCoreSettings'][_0x5e8284(0x27f)]===undefined)this[_0x5e8284(0x2b7)]();this[_0x5e8284(0x23a)]['saveDescription']=VisuMZ['SaveCore']['ParseTextCodes'](_0x2b4777);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x251)]=function(_0x4e2a34){const _0x1799b1=_0x21ae0c;while(_0x4e2a34[_0x1799b1(0x31c)](/\\V\[(\d+)\]/gi)){'LgKMz'===_0x1799b1(0x2da)?this[_0x1799b1(0x26f)]():_0x4e2a34=_0x4e2a34[_0x1799b1(0x205)](/\\V\[(\d+)\]/gi,(_0x16be4b,_0x27fb2d)=>$gameVariables['value'](parseInt(_0x27fb2d)));}while(_0x4e2a34['match'](/\\N\[(\d+)\]/gi)){if(_0x1799b1(0x204)!==_0x1799b1(0x204)){this['contentsOpacity']+=this['_fadeSpeed'];if(this[_0x1799b1(0x24c)]>=0xff||this[_0x1799b1(0x24c)]<=0x0)this[_0x1799b1(0x277)](0x0);}else _0x4e2a34=_0x4e2a34[_0x1799b1(0x205)](/\\N\[(\d+)\]/gi,(_0x3fa411,_0x34d9f6)=>Window_Base['prototype'][_0x1799b1(0x231)](parseInt(_0x34d9f6)));}while(_0x4e2a34['match'](/\\P\[(\d+)\]/gi)){_0x4e2a34=_0x4e2a34[_0x1799b1(0x205)](/\\P\[(\d+)\]/gi,(_0x4b5f31,_0x2cd3ca)=>Window_Base[_0x1799b1(0x300)][_0x1799b1(0x280)](parseInt(_0x2cd3ca)));}return _0x4e2a34;},Game_System[_0x21ae0c(0x300)]['getSavePicture']=function(){const _0x19c227=_0x21ae0c;if(this['_SaveCoreSettings']===undefined)this[_0x19c227(0x2b7)]();if(this[_0x19c227(0x23a)][_0x19c227(0x2aa)]===undefined)this[_0x19c227(0x2b7)]();return this[_0x19c227(0x23a)][_0x19c227(0x2aa)];},Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x268)]=function(_0x1a1cf1){const _0x5275e3=_0x21ae0c;if(this[_0x5275e3(0x23a)]===undefined)this[_0x5275e3(0x2b7)]();if(this['_SaveCoreSettings'][_0x5275e3(0x2aa)]===undefined)this[_0x5275e3(0x2b7)]();this[_0x5275e3(0x23a)]['savePicture']=_0x1a1cf1;},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x2db)]=Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x226)],Game_System['prototype'][_0x21ae0c(0x226)]=function(){const _0x1e0f6a=_0x21ae0c,_0x3fe6eb=StorageManager[_0x1e0f6a(0x1f0)]();switch(_0x3fe6eb){case'locked':return VisuMZ['SaveCore'][_0x1e0f6a(0x2db)]['call'](this)||0x1;break;case'single':return 0x0;break;default:return VisuMZ[_0x1e0f6a(0x262)][_0x1e0f6a(0x2db)][_0x1e0f6a(0x33b)](this);break;}},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x361)]=Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x2e9)],Game_System[_0x21ae0c(0x300)][_0x21ae0c(0x2e9)]=function(){const _0x549e42=_0x21ae0c;VisuMZ[_0x549e42(0x262)]['Game_System_onAfterLoad'][_0x549e42(0x33b)](this);const _0x841488=VisuMZ['SaveCore'][_0x549e42(0x343)][_0x549e42(0x345)][_0x549e42(0x2b8)];setTimeout(VisuMZ['SaveCore'][_0x549e42(0x34e)][_0x549e42(0x2de)](this),_0x841488+0xa);},Game_Switches[_0x21ae0c(0x300)][_0x21ae0c(0x265)]=function(_0x16e839){const _0x2da218=_0x21ae0c;return $dataSystem['switches'][_0x16e839]&&VisuMZ[_0x2da218(0x314)][_0x2da218(0x2cc)](_0x16e839);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x391)]=Game_Switches[_0x21ae0c(0x300)][_0x21ae0c(0x23d)],Game_Switches['prototype']['value']=function(_0x316e19){const _0x5ccb50=_0x21ae0c;if(this['isGlobal'](_0x316e19)){if(_0x5ccb50(0x30c)===_0x5ccb50(0x30c))return this['globalValue'](_0x316e19);else{const _0xfbd11=this['mainCommandWidth'](),_0x554a74=this[_0x5ccb50(0x285)](0x1,![]),_0x325e7d=_0x106f2c[_0x5ccb50(0x2ba)]-_0xfbd11,_0x2887ab=_0x3f6ce8['height']-_0x554a74;return new _0x263cf0(_0x325e7d,_0x2887ab,_0xfbd11,_0x554a74);}}else return VisuMZ[_0x5ccb50(0x262)][_0x5ccb50(0x391)][_0x5ccb50(0x33b)](this,_0x316e19);},Game_Switches[_0x21ae0c(0x300)][_0x21ae0c(0x38d)]=function(_0x880070){const _0x3bbd86=_0x21ae0c;return ConfigManager[_0x3bbd86(0x223)]=ConfigManager[_0x3bbd86(0x223)]||[],!!ConfigManager[_0x3bbd86(0x223)][_0x880070];},VisuMZ['SaveCore']['Game_Switches_setValue']=Game_Switches['prototype'][_0x21ae0c(0x2a6)],Game_Switches[_0x21ae0c(0x300)]['setValue']=function(_0x223d4d,_0x334a3b){const _0x13b7ff=_0x21ae0c;if(this['isGlobal'](_0x223d4d))this[_0x13b7ff(0x233)](_0x223d4d,_0x334a3b);VisuMZ['SaveCore'][_0x13b7ff(0x1f5)][_0x13b7ff(0x33b)](this,_0x223d4d,_0x334a3b);},Game_Switches[_0x21ae0c(0x300)][_0x21ae0c(0x233)]=function(_0x41442f,_0x4053bd){const _0x4f8119=_0x21ae0c;_0x41442f>0x0&&_0x41442f<$dataSystem[_0x4f8119(0x365)][_0x4f8119(0x326)]&&('BFTZK'!==_0x4f8119(0x321)?(ConfigManager['globalSwitches']=ConfigManager['globalSwitches']||[],ConfigManager[_0x4f8119(0x223)][_0x41442f]=_0x4053bd,ConfigManager[_0x4f8119(0x28b)]()):_0x483891['SaveCore'][_0x4f8119(0x2cf)]['call'](this));},Game_Variables[_0x21ae0c(0x300)]['isGlobal']=function(_0x3a8d60){return $dataSystem['variables'][_0x3a8d60]&&VisuMZ['GlobalVariables']['includes'](_0x3a8d60);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x2ff)]=Game_Variables[_0x21ae0c(0x300)][_0x21ae0c(0x23d)],Game_Variables[_0x21ae0c(0x300)][_0x21ae0c(0x23d)]=function(_0xf1fbae){const _0x2817ef=_0x21ae0c;if(this[_0x2817ef(0x265)](_0xf1fbae))return this[_0x2817ef(0x38d)](_0xf1fbae);else{if(_0x2817ef(0x302)===_0x2817ef(0x302))return VisuMZ['SaveCore'][_0x2817ef(0x2ff)][_0x2817ef(0x33b)](this,_0xf1fbae);else _0x1f6283['prototype'][_0x2817ef(0x2e8)]=function(_0xf2520b,_0x24e7d6,_0x8bf69a){const _0x136432=_0x2817ef,_0x50af1b=_0xf2520b[_0x136432(0x31c)](/\$/i),_0x34f650=_0x28bfa8['loadSvActor'](_0xf2520b),_0x9e413c=_0x34f650[_0x136432(0x2ba)]/(_0x50af1b?0x1:_0x37dd9b['svActorHorzCells']),_0x5de4e8=_0x34f650[_0x136432(0x24a)]/(_0x50af1b?0x1:_0x22abca[_0x136432(0x36d)]),_0x52a840=0x0,_0x1c50ab=0x0;this['contents'][_0x136432(0x1ff)](_0x34f650,_0x52a840,_0x1c50ab,_0x9e413c,_0x5de4e8,_0x24e7d6-_0x9e413c/0x2,_0x8bf69a-_0x5de4e8);};}},Game_Variables['prototype'][_0x21ae0c(0x38d)]=function(_0x2b0030){const _0x19fa84=_0x21ae0c;return ConfigManager[_0x19fa84(0x37e)]=ConfigManager[_0x19fa84(0x37e)]||[],ConfigManager[_0x19fa84(0x37e)][_0x2b0030]===undefined&&(ConfigManager[_0x19fa84(0x37e)][_0x2b0030]=0x0),ConfigManager[_0x19fa84(0x37e)][_0x2b0030];},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x358)]=Game_Variables['prototype'][_0x21ae0c(0x2a6)],Game_Variables[_0x21ae0c(0x300)][_0x21ae0c(0x2a6)]=function(_0x57d97d,_0x231346){const _0x46e1e3=_0x21ae0c;if(this[_0x46e1e3(0x265)](_0x57d97d))this['setGlobalValue'](_0x57d97d,_0x231346);VisuMZ[_0x46e1e3(0x262)]['Game_Variables_setValue']['call'](this,_0x57d97d,_0x231346);},Game_Variables['prototype'][_0x21ae0c(0x233)]=function(_0x36ab3e,_0x5de5fd){const _0x52814a=_0x21ae0c;if(_0x36ab3e>0x0&&_0x36ab3e<$dataSystem['variables'][_0x52814a(0x326)]){ConfigManager[_0x52814a(0x37e)]=ConfigManager[_0x52814a(0x37e)]||[];if(typeof _0x5de5fd===_0x52814a(0x2c0))_0x5de5fd=Math[_0x52814a(0x309)](_0x5de5fd);ConfigManager['globalVariables'][_0x36ab3e]=_0x5de5fd,ConfigManager[_0x52814a(0x28b)]();}},Game_Party[_0x21ae0c(0x300)][_0x21ae0c(0x2a5)]=function(){const _0x4734f2=_0x21ae0c;return this['battleMembers']()[_0x4734f2(0x1f2)](_0x5d5e82=>_0x5d5e82[_0x4734f2(0x394)]());},Scene_Base[_0x21ae0c(0x300)]['determineAutosaveBypass']=function(_0x4209d7){const _0x499494=_0x21ae0c,_0x711237=VisuMZ[_0x499494(0x262)]['Settings'][_0x499494(0x1ef)];switch(_0x4209d7){case'battle':this[_0x499494(0x2d4)]=!_0x711237['AfterBattle'];break;case _0x499494(0x239):if(!this['shouldAutosave']())return;this[_0x499494(0x2d4)]=!_0x711237[_0x499494(0x372)];break;case _0x499494(0x329):this[_0x499494(0x2d4)]=!_0x711237['AfterMenuCall'];break;case'exitMenu':this[_0x499494(0x2d4)]=!_0x711237[_0x499494(0x2d3)];break;}},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x202)]=Scene_Base[_0x21ae0c(0x300)]['requestAutosave'],Scene_Base['prototype'][_0x21ae0c(0x368)]=function(){const _0x333c80=_0x21ae0c;!this[_0x333c80(0x2d4)]&&(_0x333c80(0x342)===_0x333c80(0x342)?VisuMZ[_0x333c80(0x262)][_0x333c80(0x202)][_0x333c80(0x33b)](this):_0x1293cf=_0x3e88cf[_0x333c80(0x205)](/\\N\[(\d+)\]/gi,(_0x186a3f,_0x4dd603)=>_0x115155['prototype'][_0x333c80(0x231)](_0x3849c9(_0x4dd603)))),this[_0x333c80(0x2d4)]=![];},Scene_Base['prototype']['isAutosaveEnabled']=function(){const _0xbef52a=_0x21ae0c;return!DataManager[_0xbef52a(0x356)]()&&!DataManager[_0xbef52a(0x23f)]()&&$gameSystem[_0xbef52a(0x334)]()&&(VisuMZ[_0xbef52a(0x262)][_0xbef52a(0x343)][_0xbef52a(0x1ef)][_0xbef52a(0x316)]?$gameSystem[_0xbef52a(0x289)]():!![]);},Scene_Base[_0x21ae0c(0x300)]['executeAutosave']=function(){const _0x28b965=_0x21ae0c;if(!ConfigManager[_0x28b965(0x307)])return;this[_0x28b965(0x256)]();},Scene_Base[_0x21ae0c(0x300)]['forceAutosave']=function(){const _0x4a0c58=_0x21ae0c;$gameSystem['onBeforeSave'](),this[_0x4a0c58(0x294)]=![];const _0x502b21=StorageManager[_0x4a0c58(0x2c3)]();if([_0x4a0c58(0x266),_0x4a0c58(0x291)][_0x4a0c58(0x2cc)](_0x502b21)){if(_0x4a0c58(0x363)==='hkviU')return this['isGlobal'](_0x5ae01f)?this[_0x4a0c58(0x38d)](_0x213fd6):_0x3d433e[_0x4a0c58(0x262)][_0x4a0c58(0x391)][_0x4a0c58(0x33b)](this,_0x4e153f);else DataManager[_0x4a0c58(0x29d)](0x0)[_0x4a0c58(0x260)](()=>this[_0x4a0c58(0x293)]())[_0x4a0c58(0x397)](()=>this['onAutosaveFailure']());}if([_0x4a0c58(0x2a0),_0x4a0c58(0x291)][_0x4a0c58(0x2cc)](_0x502b21)){if(_0x4a0c58(0x393)!==_0x4a0c58(0x393)){if(this[_0x4a0c58(0x25e)])return;const _0x4f7141=this['autosaveConfirmationWindowRect']();this['_autosaveConfirmWindow']=new _0x5b3323(_0x4f7141);}else{const _0x517621=$gameSystem[_0x4a0c58(0x226)]();_0x517621>0x0&&DataManager[_0x4a0c58(0x29d)](_0x517621)['then'](()=>this[_0x4a0c58(0x293)]())[_0x4a0c58(0x397)](()=>this[_0x4a0c58(0x332)]());}}this['_processingAutosave']=![];},VisuMZ[_0x21ae0c(0x262)]['Scene_Base_onAutosaveSuccess']=Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x293)],Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x293)]=function(){const _0x539aca=_0x21ae0c;if(this[_0x539aca(0x294)])return;VisuMZ[_0x539aca(0x262)][_0x539aca(0x2a1)]['call'](this),VisuMZ[_0x539aca(0x262)][_0x539aca(0x343)][_0x539aca(0x1ef)][_0x539aca(0x2af)][_0x539aca(0x33b)](this),this[_0x539aca(0x258)](!![]),this['_processingAutosave']=!![];},VisuMZ['SaveCore'][_0x21ae0c(0x25c)]=Scene_Base['prototype'][_0x21ae0c(0x332)],Scene_Base['prototype'][_0x21ae0c(0x332)]=function(){const _0x54b44e=_0x21ae0c;if(this[_0x54b44e(0x294)])return;VisuMZ[_0x54b44e(0x262)]['Scene_Base_onAutosaveFailure'][_0x54b44e(0x33b)](this),VisuMZ['SaveCore'][_0x54b44e(0x343)][_0x54b44e(0x1ef)][_0x54b44e(0x2bd)][_0x54b44e(0x33b)](this),this[_0x54b44e(0x258)](![]);},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x218)]=function(){const _0x5dd7ee=_0x21ae0c;if(this[_0x5dd7ee(0x26b)])return;const _0x246307=this[_0x5dd7ee(0x320)]();this[_0x5dd7ee(0x26b)]=new Window_Base(_0x246307),this[_0x5dd7ee(0x26b)][_0x5dd7ee(0x395)]=0x0;},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x320)]=function(){const _0x315097=_0x21ae0c;return VisuMZ['SaveCore']['Settings'][_0x315097(0x345)][_0x315097(0x32d)]['call'](this);},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x31a)]=function(){const _0x1f344f=_0x21ae0c;return VisuMZ[_0x1f344f(0x262)]['Settings']['SaveConfirm'][_0x1f344f(0x26d)];},Scene_Base[_0x21ae0c(0x300)]['openSaveConfirmationWindow']=function(_0x4d25a0,_0xf77c67){const _0xbfc965=_0x21ae0c;if(!this[_0xbfc965(0x31a)]())return this['closeSaveConfirmationWindow'](_0x4d25a0);if(!this[_0xbfc965(0x26b)])this[_0xbfc965(0x218)]();const _0x3fe608=this[_0xbfc965(0x26b)];this[_0xbfc965(0x38a)](_0x3fe608),this[_0xbfc965(0x2dc)](_0x3fe608),_0x3fe608['open'](),_0x3fe608['resetFontSettings'](),_0x3fe608[_0xbfc965(0x37f)][_0xbfc965(0x364)]();let _0x423f1d='';_0xf77c67?_0x423f1d=TextManager[_0xbfc965(0x296)]:_0x423f1d=_0x4d25a0?TextManager[_0xbfc965(0x303)]:TextManager[_0xbfc965(0x22d)];const _0x335962=_0x3fe608[_0xbfc965(0x21a)](_0x423f1d)[_0xbfc965(0x2ba)],_0x355fd3=(_0x3fe608['innerWidth']-_0x335962)/0x2;_0x3fe608[_0xbfc965(0x380)](_0x423f1d,_0x355fd3,0x0,_0x335962);const _0x4863ba=VisuMZ[_0xbfc965(0x262)]['Settings'][_0xbfc965(0x345)]['Duration'];setTimeout(this[_0xbfc965(0x2e1)]['bind'](this,_0x4d25a0),_0x4863ba);},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x221)]=function(){const _0x4bf128=_0x21ae0c;this[_0x4bf128(0x33e)](![],!![]);},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x2e1)]=function(_0x7bade1){const _0x314eb4=_0x21ae0c;if(this[_0x314eb4(0x26b)])this[_0x314eb4(0x26b)][_0x314eb4(0x23e)]();},Scene_Base['prototype'][_0x21ae0c(0x281)]=function(){const _0x5b1426=_0x21ae0c;if(this[_0x5b1426(0x25e)])return;const _0x580db7=this[_0x5b1426(0x209)]();this['_autosaveConfirmWindow']=new Window_AutosaveConfirm(_0x580db7);},Scene_Base['prototype'][_0x21ae0c(0x209)]=function(){const _0x12067a=_0x21ae0c,_0x503468=this[_0x12067a(0x29c)](),_0x38e7e7=this[_0x12067a(0x285)](0x1,![]),_0x1cd593=Graphics[_0x12067a(0x2ba)]-_0x503468,_0x5d5c1f=Graphics[_0x12067a(0x24a)]-_0x38e7e7;return new Rectangle(_0x1cd593,_0x5d5c1f,_0x503468,_0x38e7e7);},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x33f)]=function(){const _0x18ce72=_0x21ae0c;return VisuMZ['SaveCore'][_0x18ce72(0x343)]['AutosaveConfirm'][_0x18ce72(0x26d)];},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x258)]=function(_0x51756c){const _0x5bd4a5=_0x21ae0c;if(!this['isAutosaveConfirmWindowEnabled']())return this[_0x5bd4a5(0x2dd)](_0x51756c);if(!this[_0x5bd4a5(0x25e)])this[_0x5bd4a5(0x281)]();const _0x2591cf=this[_0x5bd4a5(0x25e)];this[_0x5bd4a5(0x38a)](_0x2591cf),this[_0x5bd4a5(0x2dc)](_0x2591cf),_0x2591cf[_0x5bd4a5(0x242)](_0x51756c),_0x2591cf['fadeIn']();const _0xccd51d=VisuMZ['SaveCore']['Settings'][_0x5bd4a5(0x345)][_0x5bd4a5(0x2b8)];setTimeout(this[_0x5bd4a5(0x2dd)]['bind'](this,_0x51756c),_0xccd51d);},Scene_Base[_0x21ae0c(0x300)][_0x21ae0c(0x2dd)]=function(_0xf6949a){const _0x2e21a2=_0x21ae0c;if(this[_0x2e21a2(0x25e)])this[_0x2e21a2(0x25e)][_0x2e21a2(0x32c)]();},Scene_Base['prototype'][_0x21ae0c(0x30d)]=function(){},VisuMZ[_0x21ae0c(0x262)]['Scene_Title_initialize']=Scene_Title[_0x21ae0c(0x300)]['initialize'],Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x36a)]=function(){const _0x24a6d7=_0x21ae0c;VisuMZ[_0x24a6d7(0x262)][_0x24a6d7(0x396)][_0x24a6d7(0x33b)](this),this[_0x24a6d7(0x30b)]=![];},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x387)]=Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x31e)],Scene_Title[_0x21ae0c(0x300)]['terminate']=function(){const _0x2a2335=_0x21ae0c;VisuMZ['SaveCore'][_0x2a2335(0x387)][_0x2a2335(0x33b)](this);if(this['_loadSuccess'])$gameSystem[_0x2a2335(0x2e9)]();},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x390)]=Scene_Title['prototype'][_0x21ae0c(0x324)],Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x324)]=function(){const _0x353014=_0x21ae0c;StorageManager[_0x353014(0x1f0)]()==='locked'?this['commandNewGameSaveCoreLocked']():VisuMZ[_0x353014(0x262)]['Scene_Title_commandNewGame']['call'](this);},Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x2e0)]=function(){const _0x35c574=_0x21ae0c;DataManager[_0x35c574(0x2df)](),$gameTemp[_0x35c574(0x21f)]=!![],this[_0x35c574(0x389)][_0x35c574(0x23e)](),SceneManager[_0x35c574(0x219)](Scene_Save);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x2cf)]=Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x349)],Scene_Title[_0x21ae0c(0x300)]['commandContinue']=function(){const _0xe799b6=_0x21ae0c;if(StorageManager[_0xe799b6(0x1f0)]()===_0xe799b6(0x2d2)){if('pMMZo'===_0xe799b6(0x2ea))this[_0xe799b6(0x1f7)]();else return _0x3cf20d[_0xe799b6(0x262)][_0xe799b6(0x343)][_0xe799b6(0x345)][_0xe799b6(0x26d)];}else VisuMZ[_0xe799b6(0x262)]['Scene_Title_commandContinue'][_0xe799b6(0x33b)](this);},Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x1f7)]=function(){const _0x481bef=_0x21ae0c;DataManager['loadGame'](0x0)['then'](()=>this[_0x481bef(0x2a8)]())[_0x481bef(0x397)](()=>this['onSaveCoreLoadFailure']());},Scene_Title[_0x21ae0c(0x300)]['onSaveCoreLoadSuccess']=function(){const _0x305680=_0x21ae0c;this[_0x305680(0x389)][_0x305680(0x23e)](),SoundManager[_0x305680(0x201)](),this[_0x305680(0x2fb)](),Scene_Load['prototype'][_0x305680(0x27a)](),SceneManager[_0x305680(0x27d)](Scene_Map),this[_0x305680(0x30b)]=!![],VisuMZ[_0x305680(0x262)][_0x305680(0x343)]['Save'][_0x305680(0x35b)][_0x305680(0x33b)](this);},Scene_Title[_0x21ae0c(0x300)]['onSaveCoreLoadFailure']=function(){const _0x15cdc3=_0x21ae0c;SoundManager['playBuzzer'](),VisuMZ['SaveCore']['Settings'][_0x15cdc3(0x37a)][_0x15cdc3(0x20d)][_0x15cdc3(0x33b)](this),this[_0x15cdc3(0x221)]();},Scene_Title[_0x21ae0c(0x300)][_0x21ae0c(0x2e1)]=function(_0x4ed547){const _0x2918e0=_0x21ae0c;Scene_Base[_0x2918e0(0x300)][_0x2918e0(0x2e1)][_0x2918e0(0x33b)](this,_0x4ed547),this[_0x2918e0(0x389)]['open'](),this[_0x2918e0(0x389)]['activate']();},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x34a)]=Scene_Map[_0x21ae0c(0x300)][_0x21ae0c(0x28f)],Scene_Map['prototype'][_0x21ae0c(0x28f)]=function(){const _0x5c73ca=_0x21ae0c;VisuMZ[_0x5c73ca(0x262)][_0x5c73ca(0x34a)][_0x5c73ca(0x33b)](this);if(SceneManager['isPreviousScene'](Scene_Menu))this[_0x5c73ca(0x2b3)](_0x5c73ca(0x274)),this[_0x5c73ca(0x368)]();else SceneManager['isPreviousScene'](Scene_Battle)&&(this['determineAutosaveBypass']('battle'),this[_0x5c73ca(0x368)]());},VisuMZ[_0x21ae0c(0x262)]['Scene_Map_onTransferEnd']=Scene_Map[_0x21ae0c(0x300)][_0x21ae0c(0x243)],Scene_Map[_0x21ae0c(0x300)]['onTransferEnd']=function(){const _0x5515a5=_0x21ae0c;this[_0x5515a5(0x2ed)]()&&(_0x5515a5(0x2d0)===_0x5515a5(0x2d0)?this[_0x5515a5(0x2b3)]('transfer'):(_0x511e16['prototype'][_0x5515a5(0x2e1)][_0x5515a5(0x33b)](this,_0x3fea68),this[_0x5515a5(0x2cb)]=!![])),VisuMZ[_0x5515a5(0x262)][_0x5515a5(0x311)][_0x5515a5(0x33b)](this);},Scene_Map[_0x21ae0c(0x300)][_0x21ae0c(0x30d)]=function(){const _0x60c68c=_0x21ae0c;if($gameSystem[_0x60c68c(0x322)])return;const _0x42b6f6=$gameSystem[_0x60c68c(0x226)]();if(StorageManager[_0x60c68c(0x1f0)]()!==_0x60c68c(0x2d2)&&_0x42b6f6<=0x0)return;this['_active']=![],$gameSystem[_0x60c68c(0x33a)](_0x42b6f6),$gameSystem[_0x60c68c(0x225)](),$gameSystem[_0x60c68c(0x322)]=!![],DataManager['saveGame'](_0x42b6f6)[_0x60c68c(0x260)](()=>this[_0x60c68c(0x206)]())[_0x60c68c(0x397)](()=>this['onSaveFailure']()),$gameSystem[_0x60c68c(0x322)]=undefined;},Scene_Map[_0x21ae0c(0x300)][_0x21ae0c(0x206)]=function(){const _0x274936=_0x21ae0c;SoundManager[_0x274936(0x278)](),VisuMZ[_0x274936(0x262)][_0x274936(0x343)][_0x274936(0x37a)][_0x274936(0x388)][_0x274936(0x33b)](this),this[_0x274936(0x33e)](!![]);},Scene_Map[_0x21ae0c(0x300)]['onSaveFailure']=function(){const _0x45e5ab=_0x21ae0c;SoundManager[_0x45e5ab(0x35a)](),VisuMZ[_0x45e5ab(0x262)]['Settings'][_0x45e5ab(0x37a)]['OnSaveFailureJS'][_0x45e5ab(0x33b)](this),this[_0x45e5ab(0x33e)](![]);},Scene_Map[_0x21ae0c(0x300)][_0x21ae0c(0x2e1)]=function(_0xadc98c){const _0x124728=_0x21ae0c;Scene_Message[_0x124728(0x300)]['closeSaveConfirmationWindow']['call'](this,_0xadc98c),this[_0x124728(0x2cb)]=!![];},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x2be)]=Scene_Map[_0x21ae0c(0x300)][_0x21ae0c(0x1ea)],Scene_Map['prototype']['needsFadeIn']=function(){const _0x193e54=_0x21ae0c;return VisuMZ[_0x193e54(0x262)][_0x193e54(0x2be)][_0x193e54(0x33b)](this)||SceneManager[_0x193e54(0x1ed)](Scene_Title);},VisuMZ['SaveCore'][_0x21ae0c(0x2e5)]=Scene_Menu[_0x21ae0c(0x300)][_0x21ae0c(0x2f9)],Scene_Menu[_0x21ae0c(0x300)]['create']=function(){const _0x16324e=_0x21ae0c;VisuMZ[_0x16324e(0x262)][_0x16324e(0x2e5)][_0x16324e(0x33b)](this),SceneManager['isPreviousScene'](Scene_Map)&&('UdfzV'===_0x16324e(0x24f)?(_0x2e607a(_0x16324e(0x216)['format'](_0x4b6e4a,_0x44daa8)),_0x575f43[_0x16324e(0x2b2)]()):(this[_0x16324e(0x2b3)](_0x16324e(0x329)),this[_0x16324e(0x368)]()));},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x290)]=Scene_Menu[_0x21ae0c(0x300)][_0x21ae0c(0x244)],Scene_Menu[_0x21ae0c(0x300)][_0x21ae0c(0x244)]=function(){const _0x4a4dae=_0x21ae0c,_0x3c7117=StorageManager['saveStyle']();switch(_0x3c7117){case _0x4a4dae(0x21d):case'single':this[_0x4a4dae(0x2c4)]();break;default:VisuMZ[_0x4a4dae(0x262)][_0x4a4dae(0x290)]['call'](this);break;}},Scene_Menu['prototype'][_0x21ae0c(0x2c4)]=function(){const _0x1d733c=_0x21ae0c,_0x43fccb=$gameSystem[_0x1d733c(0x226)]();$gameSystem['setSavefileId'](_0x43fccb),$gameSystem[_0x1d733c(0x225)](),DataManager[_0x1d733c(0x29d)](_0x43fccb)['then'](()=>this['onSaveCoreSaveSuccess']())[_0x1d733c(0x397)](()=>this['onSaveCoreSaveFailure']());},Scene_Menu['prototype'][_0x21ae0c(0x253)]=function(){const _0x596af0=_0x21ae0c;SoundManager[_0x596af0(0x278)](),VisuMZ[_0x596af0(0x262)][_0x596af0(0x343)][_0x596af0(0x37a)][_0x596af0(0x388)][_0x596af0(0x33b)](this),this[_0x596af0(0x33e)](!![]);},Scene_Menu[_0x21ae0c(0x300)][_0x21ae0c(0x366)]=function(){const _0x3a17a5=_0x21ae0c;SoundManager[_0x3a17a5(0x35a)](),VisuMZ[_0x3a17a5(0x262)][_0x3a17a5(0x343)][_0x3a17a5(0x37a)][_0x3a17a5(0x2ad)]['call'](this),this['openSaveConfirmationWindow'](![]);},Scene_Menu[_0x21ae0c(0x300)][_0x21ae0c(0x2e1)]=function(_0x138fde){const _0x17629d=_0x21ae0c;Scene_MenuBase[_0x17629d(0x300)][_0x17629d(0x2e1)][_0x17629d(0x33b)](this,_0x138fde),this['_commandWindow'][_0x17629d(0x2fd)]();},Scene_Battle[_0x21ae0c(0x300)][_0x21ae0c(0x368)]=function(){},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x283)]=Scene_Options[_0x21ae0c(0x300)][_0x21ae0c(0x224)],Scene_Options[_0x21ae0c(0x300)]['maxCommands']=function(){const _0x21dd6c=_0x21ae0c;let _0x5bbfd0=VisuMZ[_0x21dd6c(0x262)][_0x21dd6c(0x283)][_0x21dd6c(0x33b)](this);const _0x1cf3b5=VisuMZ[_0x21dd6c(0x262)][_0x21dd6c(0x343)];if(_0x1cf3b5['AutosaveOption'][_0x21dd6c(0x28e)]&&_0x1cf3b5['AutosaveOption']['AdjustRect'])_0x5bbfd0++;return _0x5bbfd0;},Scene_Save[_0x21ae0c(0x300)]['onSaveSuccess']=function(){const _0xe5d9c4=_0x21ae0c;SoundManager[_0xe5d9c4(0x278)](),VisuMZ[_0xe5d9c4(0x262)][_0xe5d9c4(0x343)][_0xe5d9c4(0x37a)][_0xe5d9c4(0x388)]['call'](this),this[_0xe5d9c4(0x2e6)][_0xe5d9c4(0x333)](),this[_0xe5d9c4(0x33e)](!![]);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x250)]=Scene_Save[_0x21ae0c(0x300)][_0x21ae0c(0x36f)],Scene_Save[_0x21ae0c(0x300)]['onSaveFailure']=function(){const _0x55f428=_0x21ae0c;SoundManager['playBuzzer'](),VisuMZ[_0x55f428(0x262)][_0x55f428(0x343)]['Save'][_0x55f428(0x2ad)][_0x55f428(0x33b)](this),this[_0x55f428(0x33e)](![]);},Scene_Save[_0x21ae0c(0x300)][_0x21ae0c(0x2e1)]=function(_0x6c8df7){const _0x26d013=_0x21ae0c;Scene_File[_0x26d013(0x300)][_0x26d013(0x2e1)][_0x26d013(0x33b)](this,_0x6c8df7),_0x6c8df7?this[_0x26d013(0x26f)]():this[_0x26d013(0x26f)]();},Scene_Save[_0x21ae0c(0x300)][_0x21ae0c(0x271)]=function(){const _0x1fb749=_0x21ae0c;$gameTemp[_0x1fb749(0x21f)]=![],Scene_File[_0x1fb749(0x300)][_0x1fb749(0x271)]['call'](this);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x23b)]=Scene_Save[_0x21ae0c(0x300)]['helpWindowText'],Scene_Save[_0x21ae0c(0x300)][_0x21ae0c(0x360)]=function(){const _0xd4b65b=_0x21ae0c;if($gameTemp[_0xd4b65b(0x21f)])return TextManager[_0xd4b65b(0x2bc)];else{if(_0xd4b65b(0x35f)==='QVkIQ')return VisuMZ[_0xd4b65b(0x262)][_0xd4b65b(0x23b)]['call'](this);else _0x52a8a8[_0xd4b65b(0x262)][_0xd4b65b(0x343)][_0xd4b65b(0x200)][_0xd4b65b(0x2ee)][_0xd4b65b(0x33b)](this,_0x516805,_0xe5a1ec);}},VisuMZ[_0x21ae0c(0x262)]['Scene_Save_executeSave']=Scene_Save[_0x21ae0c(0x300)]['executeSave'],Scene_Save[_0x21ae0c(0x300)]['executeSave']=function(_0x24b8da){const _0x34e8bb=_0x21ae0c;$gameTemp['_pickLockedSaveSlot']?_0x34e8bb(0x257)==='czOoX'?_0x5bf954['optAutosave']=!![]:this[_0x34e8bb(0x28d)](_0x24b8da):VisuMZ[_0x34e8bb(0x262)][_0x34e8bb(0x336)]['call'](this,_0x24b8da);},Scene_Save[_0x21ae0c(0x300)][_0x21ae0c(0x28d)]=function(_0x388a08){const _0x27e7dc=_0x21ae0c;$gameTemp[_0x27e7dc(0x21f)]=![],SoundManager[_0x27e7dc(0x201)](),$gameSystem[_0x27e7dc(0x33a)](_0x388a08),this[_0x27e7dc(0x2fb)](),SceneManager[_0x27e7dc(0x27d)](Scene_Map);},VisuMZ['SaveCore'][_0x21ae0c(0x31f)]=Scene_Load['prototype']['onLoadSuccess'],Scene_Load['prototype']['onLoadSuccess']=function(){const _0x27b535=_0x21ae0c;VisuMZ[_0x27b535(0x262)][_0x27b535(0x31f)][_0x27b535(0x33b)](this),VisuMZ[_0x27b535(0x262)][_0x27b535(0x343)][_0x27b535(0x37a)][_0x27b535(0x35b)][_0x27b535(0x33b)](this),setTimeout(VisuMZ['SaveCore'][_0x27b535(0x34e)][_0x27b535(0x2de)](this),0x3e8);},Scene_Load[_0x21ae0c(0x300)]['onLoadFailure']=function(){const _0x18e097=_0x21ae0c;SoundManager[_0x18e097(0x35a)](),VisuMZ[_0x18e097(0x262)]['Settings'][_0x18e097(0x37a)][_0x18e097(0x20d)][_0x18e097(0x33b)](this),this[_0x18e097(0x221)]();},Scene_Load['prototype'][_0x21ae0c(0x2e1)]=function(_0x592046){const _0x1c54eb=_0x21ae0c;Scene_File[_0x1c54eb(0x300)][_0x1c54eb(0x2e1)][_0x1c54eb(0x33b)](this,_0x592046),this[_0x1c54eb(0x26f)]();},VisuMZ['SaveCore'][_0x21ae0c(0x34e)]=function(){$gameSystem['_saveCorePluginCommandSave']=undefined;},ImageManager['svActorHorzCells']=ImageManager[_0x21ae0c(0x236)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x21ae0c(0x36d)]||0x6;!Imported[_0x21ae0c(0x276)]&&(Window_Base[_0x21ae0c(0x300)][_0x21ae0c(0x2e8)]=function(_0x4afe76,_0x4e203e,_0x18731c){const _0x56f3c5=_0x21ae0c,_0x2eeb41=_0x4afe76[_0x56f3c5(0x31c)](/\$/i),_0x29cfa9=ImageManager[_0x56f3c5(0x212)](_0x4afe76),_0x5a6533=_0x29cfa9[_0x56f3c5(0x2ba)]/(_0x2eeb41?0x1:ImageManager['svActorHorzCells']),_0x2b995b=_0x29cfa9[_0x56f3c5(0x24a)]/(_0x2eeb41?0x1:ImageManager['svActorVertCells']),_0x1d0f41=0x0,_0x4de8f9=0x0;this[_0x56f3c5(0x37f)][_0x56f3c5(0x1ff)](_0x29cfa9,_0x1d0f41,_0x4de8f9,_0x5a6533,_0x2b995b,_0x4e203e-_0x5a6533/0x2,_0x18731c-_0x2b995b);});function _0x4073(){const _0x4c97b7=['GlobalSwitches','advanced','RequestsRequireSaveEnable','createContents','drawContents','autosaveSuccess','isSaveConfirmWindowEnabled','updateFade','match','VocabAutosaveFailure','terminate','Scene_Load_onLoadSuccess','saveConfirmationWindowRect','nTzmM','_saveCorePluginCommandSave','currencyUnit','commandNewGame','itemRect','length','picture','_colorCache','callMenu','{{%1}}','version','fadeOut','ConfirmRect','latestSavefileId','autosaveOption','getFullYear','VertFileDataJS','onAutosaveFailure','refresh','isAutosaveEnabled','getHours','Scene_Save_executeSave','drawCenteredPicture','VocabSaveFailure','ConvertParams','setSavefileId','call','pHgYi','ARRAYSTRUCT','openSaveConfirmationWindow','isAutosaveConfirmWindowEnabled','FilenameFmt','drawSvBattlerSprites','kDgDG','Settings','yhciC','SaveConfirm','drawBoxStyleContents','ceil','large','commandContinue','Scene_Map_onMapLoaded','face','round','createGameObjects','RemoveSaveCoreCache','MaxSaveFiles','resetWordWrap','EVAL','gppZD','ExtensionFmt','innerWidth','registerCommand','isBattleTest','onSaveCoreLoadFailure','Game_Variables_setValue','VertCols','playBuzzer','OnLoadSuccessJS','getDate','FEvpO','drawBoxStyleFileData','QVkIQ','helpWindowText','Game_System_onAfterLoad','applyData','WeWzo','clear','switches','onSaveCoreSaveFailure','textColor','requestAutosave','STRUCT','initialize','AutosaveConfirm','gold','svActorVertCells','LatestText','onSaveFailure','TYApu','ibCSL','AfterTransfer','forageKey','addGeneralOptions','numVisibleRows','setSaveDescription','getScreenPosition','loadGame','VertRows','Save','_fadeSpeed','left','SpriteWidth','globalVariables','contents','drawTextEx','faces','variables','drawLargeStyleContents','padStart','Window_SavefileList_setMode','itemPadding','Scene_Title_terminate','OnSaveSuccessJS','_commandWindow','removeChild','getMinutes','ZKdoE','globalValue','maxCols','LatestColor','Scene_Title_commandNewGame','Game_Switches_value','1852kkiHjP','exteX','battlerName','openness','Scene_Title_initialize','catch','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','changeTextColor','AdjustRect','needsFadeIn','azmYR','ActorGraphic','isPreviousScene','addSaveCoreAutosaveCommand','Autosave','saveStyle','VocabLoadFailure','map','VocabSaveSuccess','VisuMZ_1_MessageCore','Game_Switches_setValue','WAaPZ','commandContinueSaveCoreSingle','min','svbattler','gNCiL','iXiPh','indexToSavefileId','TcMKy','setWordWrap','blt','SaveMenu','playLoad','Scene_Base_requestAutosave','JSON','xQenE','replace','onSaveSuccess','drawTitle','isAutosaveCompatible','autosaveConfirmationWindowRect','maxBattleMembers','latestSavefile','ListRows','OnLoadFailureJS','Window_Options_addGeneralOptions','LargeFileDataJS','6229880qMqCmF','dimColor2','loadSvActor','innerHeight','join','ARRAYSTR','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','AutosaveType','createSaveConfirmationWindow','push','textSizeEx','2157ydYvMT','addSaveCoreCommands','locked','windowPadding','_pickLockedSaveSlot','qqtEh','loadFailureConfirmationWindow','characters','globalSwitches','maxCommands','onBeforeSave','savefileId','Default','SaveCurrentSlot','drawItem','ListFileDataJS','HPwBQ','getColorDataFromPluginParameters','saveFailure','useDigitGrouping','maxSavefiles','SvBattlerWidth','actorName','MAX_BATTLE_MEMBERS','setGlobalValue','update','IjVXh','svActorHorzCells','setMode','GlobalVariables','transfer','_SaveCoreSettings','Scene_Save_helpWindowText','svbattlers','value','close','isEventTest','1956470JhJNST','contentsBack','setSetSuccess','onTransferEnd','commandSave','DataManager_createGameObjects','ConfigManager_applyData','filter','timestamp','VUlLF','height','drawFileData','contentsOpacity','AutosaveExecute','faceWidth','KJSkU','Scene_Save_onSaveFailure','ParseTextCodes','drawCurrency','onSaveCoreSaveSuccess','getSeconds','menuStyle','forceAutosave','bNrhQ','openAutosaveConfirmationWindow','mvQBo','changePaintOpacity','inBattle','Scene_Base_onAutosaveFailure','729360eQWVsR','_autosaveConfirmWindow','constructor','then','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SaveCore','playtime','savefileInfo','isGlobal','file0','drawVerticalStyleFileData','setSavePicture','getMonth','forageTestKey','_saveConfirmWindow','drawLatestMarker','Enable','drawListStyleFileData','activateListWindow','493427MRWOIZ','popScene','fileDirectoryPath','_scene','exitMenu','ScreenPosition','VisuMZ_1_MainMenuCore','setFadeSpeed','playSave','yFiZD','reloadMapIfUpdated','_success','split','goto','max','saveDescription','partyMemberName','createAutosaveConfirmationWindow','toUpperCase','Scene_Options_maxCommands','description','calcWindowHeight','saveMenuSvBattlerWidth','AutosaveForce','autosaveFailure','isSaveEnabled','KeyFmt','save','DataManager_makeSavefileInfo','startNewGameLockedSave','AddOption','onMapLoaded','Scene_Menu_commandSave','both','drawActorSprites','onAutosaveSuccess','_processingAutosave','drawText','loadFailure','AutosaveMaxCount','opacity','file','drawPicture','drawContentsLoaded','mainCommandWidth','saveGame','TestKey','NUM','current','Scene_Base_onAutosaveSuccess','getTimestamp','kCcWu','right','svbattlersForSaveFile','setValue','enableAutosave','onSaveCoreLoadSuccess','resetFontSettings','savePicture','MakeSavefileInfoJS','6539043tFHHXf','OnSaveFailureJS','SaveDescription','OnAutosaveSuccessJS','makeData','Scene_Boot_onDatabaseLoaded','exit','determineAutosaveBypass','LocalMode','drawPlaytime','makeSavefileInfo','initSaveCore','Duration','actorStyle','width','process_VisuMZ_SaveCore_Settings','pickLockedSaveSlot','OnAutosaveFailureJS','Scene_Map_needsFadeIn','drawFace','number','drawActorFaces','name','autosaveType','commandSaveLocked','drawCharacter','HmgHJ','saveMenuSpriteWidth','gradientFillRect','autosaveEnabled','YJshQ','_active','includes','drawTimestamp','ListContentsJS','Scene_Title_commandContinue','FLNRc','638054mVdTeB','single','AfterExitMenu','_bypassAutosave','format','savefileIdToIndex','makeSavename','latestSave','loadPicture','fQZSb','Game_System_savefileId','addChild','closeAutosaveConfirmationWindow','bind','setupNewGame','commandNewGameSaveCoreLocked','closeSaveConfirmationWindow','LargeCols','STR','Game_System_initialize','Scene_Menu_create','_listWindow','drawActors','drawSvActor','onAfterLoad','pMMZo','tsEFS','drawLargeStyleFileData','shouldAutosave','BoxContentsJS','fadeIn','smoothSelect','drawDescription','VertContentsJS','zEREb','drawBackground','AutosaveOption','drawVerticalStyleContents','executeAutosave','vertical','create','dimColor1','fadeOutAll','optAutosave','activate','box','Game_Variables_value','prototype','#%1','grpuX','saveSuccess','drawListStyleContents','sprite','parse','autosave','nwSMB','floor','FGvVY','_loadSuccess','pilAB','saveCurrentSlot','SaveMenuStyle','getSaveDescription','process_VisuMZ_SaveCore_Switches_Variables','Scene_Map_onTransferEnd','LargeRows','parameters'];_0x4073=function(){return _0x4c97b7;};return _0x4073();};VisuMZ[_0x21ae0c(0x262)]['Window_Options_addGeneralOptions']=Window_Options['prototype'][_0x21ae0c(0x374)],Window_Options[_0x21ae0c(0x300)]['addGeneralOptions']=function(){const _0x3fb5d6=_0x21ae0c;VisuMZ[_0x3fb5d6(0x262)][_0x3fb5d6(0x20e)][_0x3fb5d6(0x33b)](this),this[_0x3fb5d6(0x21c)]();},Window_Options['prototype']['addSaveCoreCommands']=function(){const _0x1e4a2f=_0x21ae0c;VisuMZ[_0x1e4a2f(0x262)][_0x1e4a2f(0x343)][_0x1e4a2f(0x2f5)][_0x1e4a2f(0x28e)]&&(_0x1e4a2f(0x2c6)!==_0x1e4a2f(0x2ca)?this[_0x1e4a2f(0x1ee)]():_0x2db838['SaveCore']['Scene_Base_requestAutosave'][_0x1e4a2f(0x33b)](this));},Window_Options[_0x21ae0c(0x300)]['addSaveCoreAutosaveCommand']=function(){const _0x2df2be=_0x21ae0c,_0x5e2170=TextManager[_0x2df2be(0x32f)],_0x5afc0c=_0x2df2be(0x307);this['addCommand'](_0x5e2170,_0x5afc0c);};function Window_AutosaveConfirm(){const _0x36c31c=_0x21ae0c;this[_0x36c31c(0x36a)](...arguments);}Window_AutosaveConfirm[_0x21ae0c(0x300)]=Object[_0x21ae0c(0x2f9)](Window_Base[_0x21ae0c(0x300)]),Window_AutosaveConfirm[_0x21ae0c(0x300)][_0x21ae0c(0x25f)]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x21ae0c(0x300)]['initialize']=function(_0x4cc86c){const _0x38d991=_0x21ae0c;this['_fadeSpeed']=0x0,Window_Base[_0x38d991(0x300)]['initialize'][_0x38d991(0x33b)](this,_0x4cc86c),this[_0x38d991(0x298)]=0x0,this[_0x38d991(0x24c)]=0x0;},Window_AutosaveConfirm['prototype'][_0x21ae0c(0x2f4)]=function(){const _0x1ec37d=_0x21ae0c,_0x3210f2=0x0,_0x44a8e3=0x0,_0x596db6=this[_0x1ec37d(0x354)],_0x597023=this[_0x1ec37d(0x213)],_0x4db227=ColorManager[_0x1ec37d(0x2fa)](),_0xdfe618=ColorManager[_0x1ec37d(0x211)](),_0xce6db9=_0x596db6/0x2;this[_0x1ec37d(0x37f)][_0x1ec37d(0x2c8)](_0x3210f2,_0x44a8e3,_0xce6db9,_0x597023,_0xdfe618,_0x4db227),this[_0x1ec37d(0x37f)][_0x1ec37d(0x2c8)](_0x3210f2+_0xce6db9,_0x44a8e3,_0xce6db9,_0x597023,_0x4db227,_0xdfe618);},Window_AutosaveConfirm[_0x21ae0c(0x300)][_0x21ae0c(0x242)]=function(_0x555d73){const _0x1de7c0=_0x21ae0c;this[_0x1de7c0(0x27b)]=_0x555d73,this[_0x1de7c0(0x333)]();},Window_AutosaveConfirm[_0x21ae0c(0x300)][_0x21ae0c(0x333)]=function(){const _0x9cf259=_0x21ae0c;this[_0x9cf259(0x37f)][_0x9cf259(0x364)]();const _0x350766=this[_0x9cf259(0x27b)]?TextManager['autosaveSuccess']:TextManager['autosaveFailure'],_0x4dc79a=Math[_0x9cf259(0x347)](this[_0x9cf259(0x21a)](_0x350766)['width']);this[_0x9cf259(0x2ba)]=_0x4dc79a+($gameSystem['windowPadding']()+this[_0x9cf259(0x386)]())*0x2,this['updatePosition'](),this[_0x9cf259(0x317)]();const _0x3ad9bb=Math[_0x9cf259(0x309)]((this[_0x9cf259(0x354)]-_0x4dc79a)/0x2);this[_0x9cf259(0x2f4)](),this[_0x9cf259(0x380)](_0x350766,_0x3ad9bb,0x0,_0x4dc79a);},Window_AutosaveConfirm[_0x21ae0c(0x300)][_0x21ae0c(0x377)]=function(){const _0x32451e=_0x21ae0c;return VisuMZ[_0x32451e(0x262)][_0x32451e(0x343)][_0x32451e(0x36b)][_0x32451e(0x275)];},Window_AutosaveConfirm[_0x21ae0c(0x300)]['updatePosition']=function(){const _0x3f689d=_0x21ae0c,_0x34a289=this[_0x3f689d(0x377)]();if(_0x34a289['match'](/upper/i))this['y']=-0x1*$gameSystem[_0x3f689d(0x21e)]();else _0x34a289['match'](/lower/i)?this['y']=Graphics[_0x3f689d(0x24a)]-this['height']+$gameSystem[_0x3f689d(0x21e)]():this['y']=(Graphics[_0x3f689d(0x24a)]-this[_0x3f689d(0x24a)])/0x2;if(_0x34a289[_0x3f689d(0x31c)](/left/i))this['x']=-0x1*$gameSystem[_0x3f689d(0x21e)]();else _0x34a289[_0x3f689d(0x31c)](/right/i)?this['x']=Graphics[_0x3f689d(0x2ba)]-this[_0x3f689d(0x2ba)]+$gameSystem['windowPadding']():_0x3f689d(0x1f6)!=='FGABr'?this['x']=(Graphics[_0x3f689d(0x2ba)]-this[_0x3f689d(0x2ba)])/0x2:(this['_commandWindow'][_0x3f689d(0x23e)](),_0x1c3a0a[_0x3f689d(0x201)](),this['fadeOutAll'](),_0x367c6f[_0x3f689d(0x300)][_0x3f689d(0x27a)](),_0x3f0388[_0x3f689d(0x27d)](_0x4cedeb),this[_0x3f689d(0x30b)]=!![],_0x36b786[_0x3f689d(0x262)][_0x3f689d(0x343)][_0x3f689d(0x37a)][_0x3f689d(0x35b)]['call'](this));this['x']=Math[_0x3f689d(0x34c)](this['x']),this['y']=Math[_0x3f689d(0x34c)](this['y']);},Window_AutosaveConfirm['prototype'][_0x21ae0c(0x234)]=function(){const _0x3bcabb=_0x21ae0c;Window_Base[_0x3bcabb(0x300)][_0x3bcabb(0x234)][_0x3bcabb(0x33b)](this);if(this[_0x3bcabb(0x37b)]!==0x0)this[_0x3bcabb(0x31b)]();},Window_AutosaveConfirm['prototype'][_0x21ae0c(0x31b)]=function(){const _0x45b517=_0x21ae0c;this[_0x45b517(0x24c)]+=this[_0x45b517(0x37b)];if(this['contentsOpacity']>=0xff||this[_0x45b517(0x24c)]<=0x0)this[_0x45b517(0x277)](0x0);},Window_AutosaveConfirm[_0x21ae0c(0x300)]['setFadeSpeed']=function(_0x3ff494){const _0x31df76=_0x21ae0c;this[_0x31df76(0x37b)]=_0x3ff494;},Window_AutosaveConfirm[_0x21ae0c(0x300)][_0x21ae0c(0x2ef)]=function(){this['setFadeSpeed'](0x10);},Window_AutosaveConfirm['prototype'][_0x21ae0c(0x32c)]=function(){const _0x44cd05=_0x21ae0c;this[_0x44cd05(0x277)](-0x10);},VisuMZ[_0x21ae0c(0x262)][_0x21ae0c(0x385)]=Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x237)],Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x237)]=function(_0x10d7cf,_0x4b0290){const _0x596f47=_0x21ae0c;if(StorageManager[_0x596f47(0x2c3)]()===_0x596f47(0x2a0))_0x4b0290=![];if($gameTemp[_0x596f47(0x21f)])_0x4b0290=![];VisuMZ[_0x596f47(0x262)]['Window_SavefileList_setMode'][_0x596f47(0x33b)](this,_0x10d7cf,_0x4b0290);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x375)]=function(){const _0xed551d=_0x21ae0c,_0xcc146b=VisuMZ[_0xed551d(0x262)][_0xed551d(0x343)][_0xed551d(0x200)],_0x40a15c=this[_0xed551d(0x255)]();switch(_0x40a15c){case _0xed551d(0x2f8):return _0xcc146b[_0xed551d(0x379)];break;case _0xed551d(0x2fe):return _0xcc146b['BoxRows'];break;case'large':return _0xcc146b[_0xed551d(0x312)];break;default:return _0xcc146b[_0xed551d(0x20c)];break;}},Window_SavefileList['prototype'][_0x21ae0c(0x38e)]=function(){const _0x199e6f=_0x21ae0c,_0x30e8eb=VisuMZ['SaveCore'][_0x199e6f(0x343)]['SaveMenu'],_0x2690da=this['menuStyle']();switch(_0x2690da){case _0x199e6f(0x2f8):return _0x30e8eb[_0x199e6f(0x359)];break;case _0x199e6f(0x2fe):return _0x30e8eb['BoxCols'];break;case _0x199e6f(0x348):return _0x30e8eb[_0x199e6f(0x2e2)];break;default:return _0x30e8eb['ListCols'];break;}},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x350)]=function(){const _0x3f990a=_0x21ae0c;Imported[_0x3f990a(0x1f4)]&&(_0x3f990a(0x1fa)!==_0x3f990a(0x2f3)?Window_Selectable[_0x3f990a(0x300)][_0x3f990a(0x350)][_0x3f990a(0x33b)](this):_0x50e39d[_0x3f990a(0x1f0)]()===_0x3f990a(0x2d2)?this[_0x3f990a(0x1f7)]():_0x1af73d[_0x3f990a(0x262)][_0x3f990a(0x2cf)][_0x3f990a(0x33b)](this));},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x1fe)]=function(_0x575cf0){const _0x22bec0=_0x21ae0c;if(Imported[_0x22bec0(0x1f4)]){if(_0x22bec0(0x22b)==='nAcHV')_0x4cf994['_pickLockedSaveSlot']?this[_0x22bec0(0x28d)](_0x300b05):_0x8ba6ec['SaveCore'][_0x22bec0(0x336)][_0x22bec0(0x33b)](this,_0xda8fd8);else return Window_Selectable[_0x22bec0(0x300)][_0x22bec0(0x1fe)]['call'](this,_0x575cf0);}else return _0x22bec0(0x308)!=='nwSMB'?_0x594496['switches'][_0x53d919]&&_0x4a1895[_0x22bec0(0x314)]['includes'](_0x251814):'';},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x2b9)]=function(){const _0x7883a1=_0x21ae0c;return VisuMZ[_0x7883a1(0x262)][_0x7883a1(0x343)][_0x7883a1(0x1ec)];},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x255)]=function(){const _0x1ed6e5=_0x21ae0c;return VisuMZ['SaveCore'][_0x1ed6e5(0x343)][_0x1ed6e5(0x30e)];},Window_SavefileList[_0x21ae0c(0x300)]['selectSavefile']=function(_0x5c03bb){const _0x412792=_0x21ae0c,_0x2db803=Math[_0x412792(0x27e)](0x0,this[_0x412792(0x2d6)](_0x5c03bb));this[_0x412792(0x2f0)](_0x2db803);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x229)]=function(_0x281c74){const _0x18044c=_0x21ae0c,_0x5c7c83=this[_0x18044c(0x1fc)](_0x281c74),_0x172072=DataManager[_0x18044c(0x264)](_0x5c7c83);if(_0x172072)_0x172072[_0x18044c(0x226)]=_0x5c7c83;this['_savefileId']=_0x5c7c83;const _0x10738d=this[_0x18044c(0x325)](_0x281c74);this[_0x18044c(0x2a9)](),this[_0x18044c(0x25a)](this['isEnabled'](_0x5c7c83)),this[_0x18044c(0x318)](_0x172072,_0x10738d);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x207)]=function(_0x133de1,_0x1234f8,_0x410ba8){const _0x26db2b=_0x21ae0c;_0x133de1===0x0?'ORXcR'!=='ORXcR'?_0x5ad0ba[_0x26db2b(0x378)](0x0)[_0x26db2b(0x260)](()=>this['onSaveCoreLoadSuccess']())[_0x26db2b(0x397)](()=>this[_0x26db2b(0x357)]()):this[_0x26db2b(0x295)](TextManager[_0x26db2b(0x307)],_0x1234f8,_0x410ba8,0xb4):this[_0x26db2b(0x295)](TextManager[_0x26db2b(0x299)]+'\x20'+_0x133de1,_0x1234f8,_0x410ba8,0xb4);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x26c)]=function(_0x2ed773,_0x595402,_0xc9102a){const _0x476186=_0x21ae0c;if(_0x2ed773===0x0||DataManager[_0x476186(0x32e)]()!==_0x2ed773)return;const _0x316a42=TextManager[_0x476186(0x2d8)];this[_0x476186(0x399)](ColorManager[_0x476186(0x20b)]()),this[_0x476186(0x295)](_0x316a42,_0x595402,_0xc9102a,0xb4);},Window_SavefileList['prototype'][_0x21ae0c(0x2e7)]=function(_0x34e6f0,_0x5d40b7,_0x311bff,_0x86bf13,_0x592117){const _0x4c198e=_0x21ae0c;if(!_0x34e6f0['characters'])return;const _0x4870bf=this[_0x4c198e(0x2b9)]();switch(_0x4870bf){case _0x4c198e(0x34b):this[_0x4c198e(0x2c1)](_0x34e6f0,_0x5d40b7,_0x311bff,_0x86bf13,_0x592117);break;case _0x4c198e(0x305):this['drawActorSprites'](_0x34e6f0,_0x5d40b7,_0x311bff,_0x86bf13,_0x592117);break;case _0x4c198e(0x1f9):this['drawSvBattlerSprites'](_0x34e6f0,_0x5d40b7,_0x311bff,_0x86bf13,_0x592117);break;default:break;}},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x2c1)]=function(_0x11b54e,_0x4e5641,_0x291424,_0x5ac5a4,_0x63acb8){const _0xf072cd=_0x21ae0c;let _0x4e86fe=Math[_0xf072cd(0x27e)](_0x11b54e[_0xf072cd(0x381)][_0xf072cd(0x326)],Scene_File[_0xf072cd(0x232)]);const _0xb8dc32=Math[_0xf072cd(0x1f8)](ImageManager[_0xf072cd(0x24e)],Math[_0xf072cd(0x309)](_0x5ac5a4/_0x4e86fe));_0x4e5641=_0x4e5641+Math['round']((_0x5ac5a4-_0x4e86fe*_0xb8dc32)/0x2);for(const _0x8037bc of _0x11b54e[_0xf072cd(0x381)]){this[_0xf072cd(0x2bf)](_0x8037bc[0x0],_0x8037bc[0x1],_0x4e5641,_0x291424+0x1,_0xb8dc32,_0x63acb8-0x2),_0x4e5641+=_0xb8dc32;}},ImageManager[_0x21ae0c(0x2c7)]=VisuMZ[_0x21ae0c(0x262)]['Settings'][_0x21ae0c(0x200)][_0x21ae0c(0x37d)],ImageManager[_0x21ae0c(0x286)]=VisuMZ[_0x21ae0c(0x262)]['Settings'][_0x21ae0c(0x200)][_0x21ae0c(0x230)],Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x292)]=function(_0xdcbd85,_0x40f504,_0x3e2089,_0x51b743,_0xa35a60){const _0xe7df89=_0x21ae0c;let _0x5679ab=Math[_0xe7df89(0x27e)](_0xdcbd85[_0xe7df89(0x222)][_0xe7df89(0x326)],Scene_File[_0xe7df89(0x232)]);const _0x260c14=ImageManager[_0xe7df89(0x2c7)];_0x40f504=_0x40f504+Math[_0xe7df89(0x34c)]((_0x51b743-_0x5679ab*_0x260c14)/0x2)+_0x260c14/0x2,_0x3e2089=_0x3e2089+_0xa35a60-0x8;for(const _0x6460a5 of _0xdcbd85[_0xe7df89(0x222)]){_0xe7df89(0x33c)===_0xe7df89(0x33c)?(this[_0xe7df89(0x2c5)](_0x6460a5[0x0],_0x6460a5[0x1],_0x40f504,_0x3e2089),_0x40f504+=_0x260c14):this[_0xe7df89(0x37b)]=_0x47bd6f;}},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x341)]=function(_0x59e085,_0x2184a9,_0x30ffc2,_0x41b620,_0x492ebb){const _0x3f5dbd=_0x21ae0c;if(!_0x59e085[_0x3f5dbd(0x23c)])return this[_0x3f5dbd(0x292)](_0x59e085,_0x2184a9,_0x30ffc2,_0x41b620,_0x492ebb);let _0x21d356=Math[_0x3f5dbd(0x27e)](_0x59e085[_0x3f5dbd(0x23c)][_0x3f5dbd(0x326)],Scene_File['MAX_BATTLE_MEMBERS']);const _0x38bd61=ImageManager['saveMenuSvBattlerWidth'];_0x2184a9=_0x2184a9+Math[_0x3f5dbd(0x34c)]((_0x41b620-_0x21d356*_0x38bd61)/0x2)+_0x38bd61/0x2,_0x30ffc2=_0x30ffc2+_0x492ebb-0x8;for(const _0x2ebdab of _0x59e085[_0x3f5dbd(0x23c)]){this[_0x3f5dbd(0x2e8)](_0x2ebdab,_0x2184a9,_0x30ffc2),_0x2184a9+=_0x38bd61;}},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x29a)]=function(_0x22b3c8,_0x552c13,_0x3259dd,_0x42661b,_0x509923,_0x2d6826){const _0x50351c=_0x21ae0c;if(_0x22b3c8==='')return;_0x552c13+=0x2,_0x3259dd+=0x2,_0x42661b-=0x4,_0x509923-=0x4;const _0x5ecf0c=ImageManager[_0x50351c(0x2d9)](_0x22b3c8),_0xdc801a=_0x5ecf0c[_0x50351c(0x2ba)],_0x5b8014=_0x5ecf0c[_0x50351c(0x24a)],_0x57f3e4=Math[_0x50351c(0x1f8)](_0x42661b/_0xdc801a,_0x509923/_0x5b8014,_0x2d6826?0x1:0x3e8),_0x468396=Math['ceil'](_0x5ecf0c[_0x50351c(0x2ba)]*_0x57f3e4),_0x4abb90=Math[_0x50351c(0x347)](_0x5ecf0c[_0x50351c(0x24a)]*_0x57f3e4);this[_0x50351c(0x241)][_0x50351c(0x1ff)](_0x5ecf0c,0x0,0x0,_0xdc801a,_0x5b8014,_0x552c13,_0x3259dd,_0x468396,_0x4abb90);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x337)]=function(_0x3b5593,_0x512f3e,_0x2e1003,_0x468e10,_0x5552a9,_0x2497a3){const _0x1863f1=_0x21ae0c;if(_0x3b5593==='')return;_0x512f3e+=0x2,_0x2e1003+=0x2,_0x468e10-=0x4,_0x5552a9-=0x4;const _0x435185=ImageManager['loadPicture'](_0x3b5593),_0x417b59=_0x435185[_0x1863f1(0x2ba)],_0x1ffafe=_0x435185[_0x1863f1(0x24a)],_0x47d95d=Math['min'](_0x468e10/_0x417b59,_0x5552a9/_0x1ffafe,_0x2497a3?0x1:0x3e8),_0x223873=Math[_0x1863f1(0x347)](_0x435185[_0x1863f1(0x2ba)]*_0x47d95d),_0x546c2a=Math[_0x1863f1(0x347)](_0x435185[_0x1863f1(0x24a)]*_0x47d95d);_0x512f3e+=(_0x468e10-_0x223873)/0x2,_0x2e1003+=(_0x5552a9-_0x546c2a)/0x2,this['contentsBack']['blt'](_0x435185,0x0,0x0,_0x417b59,_0x1ffafe,_0x512f3e,_0x2e1003,_0x223873,_0x546c2a);},Window_SavefileList['prototype'][_0x21ae0c(0x2b5)]=function(_0x27ead7,_0x393c2c,_0x38bd05,_0x67709c,_0x5eb4bf){const _0x57da80=_0x21ae0c;_0x27ead7[_0x57da80(0x263)]&&(_0x5eb4bf=_0x5eb4bf||_0x57da80(0x37c),this['drawText'](_0x27ead7[_0x57da80(0x263)],_0x393c2c,_0x38bd05,_0x67709c,_0x5eb4bf));},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x2cd)]=function(_0x35f79f,_0x4c3977,_0x41aac0,_0x499f51,_0x4e12b4){const _0x5b96dc=_0x21ae0c;if(_0x35f79f[_0x5b96dc(0x248)]){_0x4e12b4=_0x4e12b4||_0x5b96dc(0x37c);let _0x1f80f5=this[_0x5b96dc(0x2a2)](_0x35f79f);Imported['VisuMZ_0_CoreEngine']&&this[_0x5b96dc(0x22e)]()&&(_0x1f80f5=_0x5b96dc(0x32a)['format'](_0x1f80f5)),this[_0x5b96dc(0x295)](_0x1f80f5,_0x4c3977,_0x41aac0,_0x499f51,_0x4e12b4);}},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x2a2)]=function(_0x4573ae){const _0xc86925=_0x21ae0c,_0x2e77eb=_0x4573ae[_0xc86925(0x248)],_0x200b59=new Date(_0x2e77eb);let _0x72998e='[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]';_0x72998e=_0x72998e[_0xc86925(0x205)](/\[YEAR\]/gi,'%1'),_0x72998e=_0x72998e[_0xc86925(0x205)](/\[MONTH\]/gi,'%2'),_0x72998e=_0x72998e['replace'](/\[DATE\]/gi,'%3'),_0x72998e=_0x72998e['replace'](/\[HOUR\]/gi,'%4'),_0x72998e=_0x72998e[_0xc86925(0x205)](/\[MINUTE\]/gi,'%5'),_0x72998e=_0x72998e[_0xc86925(0x205)](/\[SECOND\]/gi,'%6');let _0x275ae9=String(_0x200b59[_0xc86925(0x330)]())[_0xc86925(0x27c)]('')[_0xc86925(0x214)]('​'),_0x4a3b8e=String(_0x200b59[_0xc86925(0x269)]()+0x1),_0x2bb6b4=String(_0x200b59[_0xc86925(0x35c)]())['padStart'](0x2,'0'),_0x425834=String(_0x200b59[_0xc86925(0x335)]())[_0xc86925(0x384)](0x2,'0'),_0xbc229b=String(_0x200b59[_0xc86925(0x38b)]())[_0xc86925(0x384)](0x2,'0'),_0x3efa5d=String(_0x200b59[_0xc86925(0x254)]())[_0xc86925(0x384)](0x2,'0'),_0x18a047=_0x72998e['format'](_0x275ae9,_0x4a3b8e,_0x2bb6b4,_0x425834,_0xbc229b,_0x3efa5d);return _0x18a047;},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x252)]=function(_0x2e9f9f,_0x47ad6f,_0x7e0de3,_0x44379b){const _0x36be38=_0x21ae0c;if(_0x2e9f9f[_0x36be38(0x36c)]===undefined)return;const _0x2e2aa2=_0x2e9f9f['gold'],_0x2a7a52=TextManager[_0x36be38(0x323)];Window_SavefileList['prototype']['drawCurrencyValue'][_0x36be38(0x33b)](this,_0x2e2aa2,_0x2a7a52,_0x47ad6f,_0x7e0de3,_0x44379b);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x2f1)]=function(_0x250543,_0x5e9443,_0x306a6a,_0x1e4fc5,_0x1be04e){const _0x3ea3a7=_0x21ae0c;if(_0x250543[_0x3ea3a7(0x284)]){const _0x53aae0=this['textSizeEx'](_0x250543['description'])['width'];_0x1be04e=_0x1be04e||_0x3ea3a7(0x37c);if(_0x1be04e===_0x3ea3a7(0x2a4))'GspYu'==='GspYu'?_0x5e9443=_0x5e9443+_0x1e4fc5-_0x53aae0:(_0x59e2b9[_0x3ea3a7(0x300)][_0x3ea3a7(0x2e1)][_0x3ea3a7(0x33b)](this,_0x4e0f74),_0x4f4e2f?this['activateListWindow']():this['activateListWindow']());else _0x1be04e==='center'&&(_0x5e9443=_0x5e9443+(_0x1e4fc5-_0x53aae0)/0x2);this[_0x3ea3a7(0x380)](_0x250543[_0x3ea3a7(0x284)],_0x5e9443,_0x306a6a,_0x1e4fc5);}},Window_SavefileList['prototype'][_0x21ae0c(0x318)]=function(_0xbf54c4,_0x2dd161){const _0x34d1d4=_0x21ae0c;if(_0xbf54c4){const _0x47d9f9=ImageManager['loadPicture'](_0xbf54c4[_0x34d1d4(0x327)]||'');_0x47d9f9['addLoadListener'](this['drawContentsLoaded'][_0x34d1d4(0x2de)](this,_0xbf54c4,_0x2dd161));}else{if(_0x34d1d4(0x371)==='ibCSL')this[_0x34d1d4(0x24b)](this['_savefileId'],_0x2dd161);else{if(!_0x23f6e9['optAutosave'])return![];if(this[_0x34d1d4(0x23a)]===_0x1deec2)this[_0x34d1d4(0x2b7)]();if(this[_0x34d1d4(0x23a)][_0x34d1d4(0x2c9)]===_0x3ef6d9)this[_0x34d1d4(0x2b7)]();return this[_0x34d1d4(0x23a)][_0x34d1d4(0x2c9)];}}},Window_SavefileList['prototype'][_0x21ae0c(0x29b)]=function(_0x438fa7,_0x34d9b5){const _0x2a2ae2=_0x21ae0c,_0x211a01=this['menuStyle']();switch(_0x211a01){case _0x2a2ae2(0x2f8):this[_0x2a2ae2(0x2f6)](_0x438fa7,_0x34d9b5);break;case _0x2a2ae2(0x2fe):this[_0x2a2ae2(0x346)](_0x438fa7,_0x34d9b5);break;case _0x2a2ae2(0x348):this[_0x2a2ae2(0x383)](_0x438fa7,_0x34d9b5);break;default:this[_0x2a2ae2(0x304)](_0x438fa7,_0x34d9b5);break;}this[_0x2a2ae2(0x2a9)]();const _0x165220=_0x438fa7[_0x2a2ae2(0x226)];this[_0x2a2ae2(0x24b)](_0x165220,_0x34d9b5);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x24b)]=function(_0xa52b7d,_0x3c7fc4){const _0x2f7a1a=_0x21ae0c,_0x55cd0c=this[_0x2f7a1a(0x255)]();switch(_0x55cd0c){case _0x2f7a1a(0x2f8):this[_0x2f7a1a(0x267)](_0xa52b7d,_0x3c7fc4);break;case _0x2f7a1a(0x2fe):this[_0x2f7a1a(0x35e)](_0xa52b7d,_0x3c7fc4);break;case'large':this[_0x2f7a1a(0x2ec)](_0xa52b7d,_0x3c7fc4);break;default:this[_0x2f7a1a(0x26e)](_0xa52b7d,_0x3c7fc4);break;}},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x304)]=function(_0x36ada7,_0x3925ef){const _0x3490be=_0x21ae0c;VisuMZ[_0x3490be(0x262)][_0x3490be(0x343)][_0x3490be(0x200)]['ListContentsJS']['call'](this,_0x36ada7,_0x3925ef);},Window_SavefileList[_0x21ae0c(0x300)]['drawVerticalStyleContents']=function(_0x3112c1,_0x3df4d0){const _0x4a1759=_0x21ae0c;VisuMZ[_0x4a1759(0x262)][_0x4a1759(0x343)][_0x4a1759(0x200)][_0x4a1759(0x2f2)][_0x4a1759(0x33b)](this,_0x3112c1,_0x3df4d0);},Window_SavefileList['prototype'][_0x21ae0c(0x346)]=function(_0x216416,_0x301963){const _0x4a9d51=_0x21ae0c;VisuMZ[_0x4a9d51(0x262)][_0x4a9d51(0x343)][_0x4a9d51(0x200)][_0x4a9d51(0x2ee)][_0x4a9d51(0x33b)](this,_0x216416,_0x301963);},Window_SavefileList['prototype'][_0x21ae0c(0x383)]=function(_0x258249,_0x5beb2b){const _0x3fd21d=_0x21ae0c;VisuMZ[_0x3fd21d(0x262)]['Settings'][_0x3fd21d(0x200)]['LargeContentsJS'][_0x3fd21d(0x33b)](this,_0x258249,_0x5beb2b);},Window_SavefileList['prototype']['drawListStyleFileData']=function(_0x2bea71,_0x4f866a){const _0x31a529=_0x21ae0c;VisuMZ['SaveCore']['Settings'][_0x31a529(0x200)][_0x31a529(0x22a)][_0x31a529(0x33b)](this,_0x2bea71,_0x4f866a);},Window_SavefileList[_0x21ae0c(0x300)]['drawVerticalStyleFileData']=function(_0x279cfe,_0x5a7762){const _0x4f1af3=_0x21ae0c;VisuMZ[_0x4f1af3(0x262)][_0x4f1af3(0x343)][_0x4f1af3(0x200)][_0x4f1af3(0x331)][_0x4f1af3(0x33b)](this,_0x279cfe,_0x5a7762);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x35e)]=function(_0x3c3b24,_0x59d836){const _0x2ce8a5=_0x21ae0c;VisuMZ[_0x2ce8a5(0x262)][_0x2ce8a5(0x343)][_0x2ce8a5(0x200)]['BoxFileDataJS'][_0x2ce8a5(0x33b)](this,_0x3c3b24,_0x59d836);},Window_SavefileList[_0x21ae0c(0x300)][_0x21ae0c(0x2ec)]=function(_0x44a507,_0x2c2685){const _0xaa26b7=_0x21ae0c;VisuMZ['SaveCore']['Settings']['SaveMenu'][_0xaa26b7(0x20f)][_0xaa26b7(0x33b)](this,_0x44a507,_0x2c2685);};