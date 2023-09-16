//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.10] [SaveCore]
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

const _0x4c1dc3=_0x4ec7;(function(_0x2625cd,_0x2e61de){const _0x2399a7=_0x4ec7,_0x52e3fa=_0x2625cd();while(!![]){try{const _0x4ffbf3=-parseInt(_0x2399a7(0xc3))/0x1+-parseInt(_0x2399a7(0xf8))/0x2*(parseInt(_0x2399a7(0xbb))/0x3)+-parseInt(_0x2399a7(0x105))/0x4*(parseInt(_0x2399a7(0xf4))/0x5)+-parseInt(_0x2399a7(0x177))/0x6+-parseInt(_0x2399a7(0x118))/0x7*(-parseInt(_0x2399a7(0x102))/0x8)+parseInt(_0x2399a7(0x23d))/0x9+parseInt(_0x2399a7(0x1ac))/0xa;if(_0x4ffbf3===_0x2e61de)break;else _0x52e3fa['push'](_0x52e3fa['shift']());}catch(_0x2c3a32){_0x52e3fa['push'](_0x52e3fa['shift']());}}}(_0x1ffe,0xa3d5c));function _0x4ec7(_0x5cd062,_0x4f9b44){const _0x1ffe56=_0x1ffe();return _0x4ec7=function(_0x4ec707,_0x56e512){_0x4ec707=_0x4ec707-0xa7;let _0x377899=_0x1ffe56[_0x4ec707];return _0x377899;},_0x4ec7(_0x5cd062,_0x4f9b44);}var label=_0x4c1dc3(0x246),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x596743){const _0x19fe83=_0x4c1dc3;return _0x596743['status']&&_0x596743[_0x19fe83(0x115)]['includes']('['+label+']');})[0x0];function _0x1ffe(){const _0x505312=['isAutosaveConfirmWindowEnabled','Scene_Options_maxCommands','value','trim','inBattle','Scene_Save_onSaveFailure','drawTextEx','changeTextColor','getHours','dimColor1','vertical','Scene_Save_helpWindowText','globalValue','variables','openSaveConfirmationWindow','ceil','17349970UOaaIX','addGeneralOptions','svbattlersForSaveFile','autosaveType','innerWidth','innerHeight','_bypassAutosave','parameters','Game_Switches_value','jhpPd','maxCommands','saveSuccess','requestAutosave','onAutosaveFailure','jquII','LocalMode','Game_Switches_setValue','onSaveFailure','_autosaveConfirmWindow','callMenu','onAfterLoad','edmdg','yNvBI','MAX_BATTLE_MEMBERS','Scene_Title_terminate','setSaveDescription','drawLargeStyleContents','fnMfI','onSaveCoreSaveSuccess','drawActorFaces','resetFontSettings','shouldAutosave','initialize','Scene_Map_onTransferEnd','ParseTextCodes','SaveConfirm','refresh','jXfMS','filePath','itemRect','forageTestKey','globalVariables','loadFailureConfirmationWindow','maxSavefiles','_saveCorePluginCommandSave','exit','_saveConfirmWindow','UpOjJ','LatestColor','getTimestamp','OnAutosaveSuccessJS','large','isGlobal','addLoadListener','yTIvA','maxBattleMembers','AutosaveExecute','drawItem','isAutosaveEnabled','QFTbR','SaveMenu','onTransferEnd','EVAL','onBeforeSave','KJsdw','right','AfterMenuCall','single','kWdNQ','drawCenteredPicture','addChild','autosave','JSON','onMapLoaded','updateFade','drawTimestamp','fileDirectoryPath','onDatabaseLoaded','Gxtjw','wOrro','ElHjP','GlobalVariables','terminate','onSaveCoreLoadSuccess','TVcJu','SaveDescription','qXnFU','clear','initSaveCore','MaxSaveFiles','Scene_Map_onMapLoaded','isLocalMode','FAVAg','addSaveCoreAutosaveCommand','SaveStyle','popScene','oXCGr','autosaveOption','vOApR','ConfigManager_applyData','file0','width','Autosave','drawBoxStyleContents','gcLNd','VisuMZ_1_MainMenuCore','fadeOut','sIrxE','VocabLockedSaveSlot','VisuMZ_1_MessageCore','optAutosave','STR','blt','isBattleTest','BoxFileDataJS','padStart','helpWindowText','createContents','DataManager_makeSavefileInfo','vLSga','push','left','Save','getFullYear','SvBattlerWidth','save','ARRAYSTR','_success','NUM','center','setSavefileId','picture','toUpperCase','Default','FilenameFmt','drawFileData','saveGame','version','OnSaveSuccessJS','openAutosaveConfirmationWindow','OnLoadFailureJS','drawPlaytime','playLoad','advanced','activate','4875039rkkooP','RequestsRequireSaveEnable','svbattlers','Scene_Title_initialize','saveMenuSpriteWidth','AutosaveConfirm','RemoveSaveCoreCache','current','characters','SaveCore','SaveMenuStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','menuStyle','closeSaveConfirmationWindow','includes','resetWordWrap','XNqvE','call','VocabSaveSuccess','createAutosaveConfirmationWindow','ARRAYFUNC','ConfigManager_makeData','EOWWC','createGameObjects','selectSavefile','startNewGameLockedSave','makeSavename','svbattler','forceAutosave','calcWindowHeight','switches','sprite','Game_Variables_setValue','isAutosaveCompatible','Scene_Base_onAutosaveFailure','prototype','GlobalSwitches','onSaveSuccess','getSaveDescription','_SaveCoreSettings','ListRows','VertFileDataJS','textColor','useDigitGrouping','setGlobalValue','405grIzwW','contents','max','drawSvBattlerSprites','activateListWindow','AfterExitMenu','changePaintOpacity','actorName','915817NMixSM','pickLockedSaveSlot','isSaveConfirmWindowEnabled','saveStyle','ConvertParams','Window_Options_addGeneralOptions','autosaveSuccess','globalSwitches','OnAutosaveFailureJS','saveConfirmationWindowRect','setFadeSpeed','getScreenPosition','round','windowPadding','makeData','PrGJJ','latestSave','AfterTransfer','fadeOutAll','playtime','Scene_Title_commandNewGame','drawBackground','saveDescription','onSaveCoreSaveFailure','commandContinueSaveCoreSingle','KjRKC','MakeSavefileInfoJS','smoothSelect','_savefileId','update','{{%1}}','Scene_Base_onAutosaveSuccess','drawCharacter','Game_System_initialize','contentsOpacity','AutosaveMaxCount','savefileId','Name','Game_Variables_value','addSaveCoreCommands','drawVerticalStyleFileData','commandSave','constructor','reloadMapIfUpdated','_colorCache','_scene','Scene_Boot_onDatabaseLoaded','faces','map','2585yzvIlM','length','contentsBack','drawSvActor','4194ChcNar','getMonth','SaveCurrentSlot','_active','close','iabMh','ConfirmRect','locked','KeyFmt','ARRAYEVAL','30232zTIhUf','getSeconds','drawLatestMarker','5132jfaxJE','AutosaveType','BoxRows','setValue','drawFace','maxCols','LatestText','setWordWrap','playBuzzer','return\x200','number','saveFailure','SpriteWidth','ScreenPosition','DataManager_createGameObjects','QyUMe','description','isSaveEnabled','Scene_Menu_commandSave','2149WeUBHu','file','openness','process_VisuMZ_SaveCore_Settings','replace','jvsNK','name','drawListStyleContents','createSaveConfirmationWindow','loadFailure','commandSaveLocked','parse','gold','enableAutosave','textSizeEx','makeSavefileInfo','exitMenu','format','Duration','applyData','_commandWindow','numVisibleRows','drawText','removeChild','onLoadFailure','dimColor2','AfterBattle','timestamp','ARRAYJSON','Scene_Save_executeSave','XTIPy','box','isEventTest','Settings','registerCommand','_loadSuccess','drawCurrencyValue','executeSave','Scene_Base_requestAutosave','Enable','mainCommandWidth','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','drawActorSprites','determineAutosaveBypass','playSave','VertRows','open','catch','then','both','setSetSuccess','getDate','transfer','commandContinue','itemPadding','dtsTL','executeAutosave','drawDescription','process_VisuMZ_SaveCore_Switches_Variables','addCommand','ETgOj','_stored_latestSavefile','xiMkF','savePicture','AddOption','updatePosition','tNowe','saveCurrentSlot','drawContentsLoaded','saveMenuSvBattlerWidth','getColorDataFromPluginParameters','setSavePicture','closeAutosaveConfirmationWindow','svActorHorzCells','OnSaveFailureJS','drawBoxStyleFileData','_fadeSpeed','min','autosaveEnabled','bind','ActorGraphic','svActorVertCells','ARRAYSTRUCT','VertContentsJS','_processingAutosave','actorStyle','join','fadeIn','create','Game_System_savefileId','AutosaveOption','Scene_Load_onLoadSuccess','drawTitle','setupNewGame','onLoadSuccess','5421180DZglyT','LargeRows','Kuczp','VocabLoadFailure','autosaveFailure','AdjustRect','autosaveConfirmationWindowRect','OnLoadSuccessJS','STRUCT','drawActors','goto','BYSnP','Scene_Title_commandContinue','Game_System_onAfterLoad','Scene_Menu_create','loadGame','isPreviousScene','latestSavefileId','_pickLockedSaveSlot','LargeContentsJS','drawContents','AutosaveRequest','gradientFillRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','LargeFileDataJS','onAutosaveSuccess','AutosaveEnable','height','match','drawVerticalStyleContents','VisuMZ_0_CoreEngine','orxSd','faceWidth','setMode','ExtensionFmt','VocabAutosaveSuccess','floor'];_0x1ffe=function(){return _0x505312;};return _0x1ffe();}VisuMZ[label][_0x4c1dc3(0x139)]=VisuMZ[label][_0x4c1dc3(0x139)]||{},VisuMZ[_0x4c1dc3(0xc7)]=function(_0x58e985,_0x2f60b1){const _0x13c83a=_0x4c1dc3;for(const _0x1ce9c0 in _0x2f60b1){if(_0x1ce9c0[_0x13c83a(0x193)](/(.*):(.*)/i)){const _0x5828f6=String(RegExp['$1']),_0x26d0bf=String(RegExp['$2'])[_0x13c83a(0x230)]()[_0x13c83a(0x19f)]();let _0x2eecbe,_0x4e6031,_0x5f1266;switch(_0x26d0bf){case _0x13c83a(0x22c):_0x2eecbe=_0x2f60b1[_0x1ce9c0]!==''?Number(_0x2f60b1[_0x1ce9c0]):0x0;break;case'ARRAYNUM':_0x4e6031=_0x2f60b1[_0x1ce9c0]!==''?JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0]):[],_0x2eecbe=_0x4e6031[_0x13c83a(0xf3)](_0x3fb240=>Number(_0x3fb240));break;case _0x13c83a(0x1ea):_0x2eecbe=_0x2f60b1[_0x1ce9c0]!==''?eval(_0x2f60b1[_0x1ce9c0]):null;break;case _0x13c83a(0x101):_0x4e6031=_0x2f60b1[_0x1ce9c0]!==''?JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0]):[],_0x2eecbe=_0x4e6031[_0x13c83a(0xf3)](_0x4fe5d6=>eval(_0x4fe5d6));break;case _0x13c83a(0x1f4):_0x2eecbe=_0x2f60b1[_0x1ce9c0]!==''?JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0]):'';break;case _0x13c83a(0x134):_0x4e6031=_0x2f60b1[_0x1ce9c0]!==''?JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0]):[],_0x2eecbe=_0x4e6031['map'](_0x168cfd=>JSON[_0x13c83a(0x123)](_0x168cfd));break;case'FUNC':_0x2eecbe=_0x2f60b1[_0x1ce9c0]!==''?new Function(JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0])):new Function(_0x13c83a(0x10e));break;case _0x13c83a(0x251):_0x4e6031=_0x2f60b1[_0x1ce9c0]!==''?JSON['parse'](_0x2f60b1[_0x1ce9c0]):[],_0x2eecbe=_0x4e6031[_0x13c83a(0xf3)](_0x37dfdf=>new Function(JSON[_0x13c83a(0x123)](_0x37dfdf)));break;case _0x13c83a(0x21b):_0x2eecbe=_0x2f60b1[_0x1ce9c0]!==''?String(_0x2f60b1[_0x1ce9c0]):'';break;case _0x13c83a(0x22a):_0x4e6031=_0x2f60b1[_0x1ce9c0]!==''?JSON['parse'](_0x2f60b1[_0x1ce9c0]):[],_0x2eecbe=_0x4e6031[_0x13c83a(0xf3)](_0x26d5ec=>String(_0x26d5ec));break;case _0x13c83a(0x17f):_0x5f1266=_0x2f60b1[_0x1ce9c0]!==''?JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0]):{},_0x58e985[_0x5828f6]={},VisuMZ[_0x13c83a(0xc7)](_0x58e985[_0x5828f6],_0x5f1266);continue;case _0x13c83a(0x16a):_0x4e6031=_0x2f60b1[_0x1ce9c0]!==''?JSON[_0x13c83a(0x123)](_0x2f60b1[_0x1ce9c0]):[],_0x2eecbe=_0x4e6031[_0x13c83a(0xf3)](_0x59f471=>VisuMZ[_0x13c83a(0xc7)]({},JSON['parse'](_0x59f471)));break;default:continue;}_0x58e985[_0x5828f6]=_0x2eecbe;}}return _0x58e985;},(_0x2c0ddf=>{const _0x80ebbb=_0x4c1dc3,_0x2e9c10=_0x2c0ddf[_0x80ebbb(0x11e)];for(const _0x202497 of dependencies){if(_0x80ebbb(0x1fb)===_0x80ebbb(0xd2)){_0x2492c9=_0x408910||'left';let _0x4c6fdc=this[_0x80ebbb(0x1dd)](_0x12f3b3);_0xff0786[_0x80ebbb(0x195)]&&this['useDigitGrouping']()&&(_0x4c6fdc=_0x80ebbb(0xe1)['format'](_0x4c6fdc)),this[_0x80ebbb(0x12e)](_0x4c6fdc,_0x24c682,_0x5560e8,_0x4aa2b3,_0x466024);}else{if(!Imported[_0x202497]){if(_0x80ebbb(0x1f0)===_0x80ebbb(0x1f0)){alert(_0x80ebbb(0x18e)[_0x80ebbb(0x129)](_0x2e9c10,_0x202497)),SceneManager['exit']();break;}else _0x90fd57['SaveCore'][_0x80ebbb(0x139)][_0x80ebbb(0x1e8)][_0x80ebbb(0x16b)][_0x80ebbb(0x24e)](this,_0x3fc8ac,_0x130faa);}}}const _0x2418c0=_0x2c0ddf[_0x80ebbb(0x115)];if(_0x2418c0[_0x80ebbb(0x193)](/\[Version[ ](.*?)\]/i)){const _0x483114=Number(RegExp['$1']);_0x483114!==VisuMZ[label][_0x80ebbb(0x235)]&&(_0x80ebbb(0x1db)!==_0x80ebbb(0x1db)?(this[_0x80ebbb(0x143)](_0x80ebbb(0x1bf)),this[_0x80ebbb(0x1b8)]()):(alert(_0x80ebbb(0x248)[_0x80ebbb(0x129)](_0x2e9c10,_0x483114)),SceneManager['exit']()));}if(_0x2418c0[_0x80ebbb(0x193)](/\[Tier[ ](\d+)\]/i)){const _0x5080fe=Number(RegExp['$1']);if(_0x5080fe<tier){if('KzqfJ'!==_0x80ebbb(0x1ec))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x80ebbb(0x129)](_0x2e9c10,_0x5080fe,tier)),SceneManager[_0x80ebbb(0x1d9)]();else{const _0x3e07a6=_0x441f65[_0x80ebbb(0x246)][_0x80ebbb(0x252)][_0x80ebbb(0x24e)](this);return _0x3e07a6['autosave']=this['autosave']||_0x4cb37d[_0x80ebbb(0x246)][_0x80ebbb(0x139)][_0x80ebbb(0x172)][_0x80ebbb(0x231)],_0x3e07a6['globalSwitches']=this['globalSwitches']||[],_0x3e07a6[_0x80ebbb(0x1d5)]=this[_0x80ebbb(0x1d5)]||[],_0x3e07a6;}}else tier=Math[_0x80ebbb(0xbd)](_0x5080fe,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x80ebbb(0x139)],_0x2c0ddf[_0x80ebbb(0x1b3)]);})(pluginData),PluginManager[_0x4c1dc3(0x13a)](pluginData[_0x4c1dc3(0x11e)],_0x4c1dc3(0x191),_0x561da7=>{const _0x498370=_0x4c1dc3;if(!DataManager[_0x498370(0xaf)]())return;VisuMZ[_0x498370(0xc7)](_0x561da7,_0x561da7);if($gameSystem)$gameSystem[_0x498370(0x125)](_0x561da7[_0x498370(0x13f)]);}),PluginManager[_0x4c1dc3(0x13a)](pluginData['name'],_0x4c1dc3(0x18c),_0x52dddc=>{const _0x206cf5=_0x4c1dc3;if(!DataManager[_0x206cf5(0xaf)]()||$gameParty[_0x206cf5(0x1a0)]())return;SceneManager[_0x206cf5(0xf0)][_0x206cf5(0x1b8)]();}),PluginManager['registerCommand'](pluginData['name'],_0x4c1dc3(0x1e4),_0x47353f=>{const _0x524f5f=_0x4c1dc3;if(!DataManager[_0x524f5f(0xaf)]()||$gameParty[_0x524f5f(0x1a0)]())return;SceneManager[_0x524f5f(0xf0)]['executeAutosave']();}),PluginManager['registerCommand'](pluginData[_0x4c1dc3(0x11e)],'AutosaveForce',_0x19cc7e=>{const _0x1251c0=_0x4c1dc3;if(!DataManager[_0x1251c0(0xaf)]()||$gameParty[_0x1251c0(0x1a0)]())return;SceneManager['_scene'][_0x1251c0(0xaa)]();}),PluginManager[_0x4c1dc3(0x13a)](pluginData[_0x4c1dc3(0x11e)],_0x4c1dc3(0xfa),_0xdb00b1=>{const _0x5b8af2=_0x4c1dc3;SceneManager[_0x5b8af2(0xf0)][_0x5b8af2(0x15b)]();}),PluginManager[_0x4c1dc3(0x13a)](pluginData[_0x4c1dc3(0x11e)],_0x4c1dc3(0x201),_0x4e7d5f=>{const _0x293e4c=_0x4c1dc3;VisuMZ[_0x293e4c(0xc7)](_0x4e7d5f,_0x4e7d5f);if($gameSystem)$gameSystem['setSaveDescription'](_0x4e7d5f['Text']);}),PluginManager[_0x4c1dc3(0x13a)](pluginData[_0x4c1dc3(0x11e)],'SavePicture',_0x48ac5c=>{const _0x42950f=_0x4c1dc3;VisuMZ[_0x42950f(0xc7)](_0x48ac5c,_0x48ac5c);if($gameSystem)$gameSystem[_0x42950f(0x15f)](_0x48ac5c['Filename']);}),VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0xf1)]=Scene_Boot[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1f9)],Scene_Boot[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1f9)]=function(){const _0x295e63=_0x4c1dc3;VisuMZ['SaveCore'][_0x295e63(0xf1)]['call'](this),this[_0x295e63(0x11b)](),this[_0x295e63(0x152)]();},Scene_Boot[_0x4c1dc3(0xb1)][_0x4c1dc3(0x11b)]=function(){const _0x2b9354=_0x4c1dc3;if(StorageManager[_0x2b9354(0xc6)]()===_0x2b9354(0x1ef)){if('Gxtjw'!==_0x2b9354(0x1fa)){for(let _0x1b678b=0x1;_0x1b678b<_0x3874e0[_0x2b9354(0xac)]['length'];_0x1b678b++){if(_0x2f7cc0[_0x2b9354(0xac)][_0x1b678b][_0x2b9354(0x193)](/<GLOBAL>/i))_0x42dacb[_0x2b9354(0xb2)][_0x2b9354(0x224)](_0x1b678b);}for(let _0x492129=0x1;_0x492129<_0x15cedf[_0x2b9354(0x1a9)][_0x2b9354(0xf5)];_0x492129++){if(_0x459b97[_0x2b9354(0x1a9)][_0x492129]['match'](/<GLOBAL>/i))_0x34bca4[_0x2b9354(0x1fd)][_0x2b9354(0x224)](_0x492129);}}else $dataSystem['optAutosave']=!![];}},VisuMZ[_0x4c1dc3(0xb2)]=[],VisuMZ[_0x4c1dc3(0x1fd)]=[],Scene_Boot[_0x4c1dc3(0xb1)]['process_VisuMZ_SaveCore_Switches_Variables']=function(){const _0x4f4815=_0x4c1dc3;for(let _0x2f202f=0x1;_0x2f202f<$dataSystem['switches']['length'];_0x2f202f++){if($dataSystem[_0x4f4815(0xac)][_0x2f202f]['match'](/<GLOBAL>/i))VisuMZ[_0x4f4815(0xb2)]['push'](_0x2f202f);}for(let _0x5b291c=0x1;_0x5b291c<$dataSystem[_0x4f4815(0x1a9)][_0x4f4815(0xf5)];_0x5b291c++){if($dataSystem['variables'][_0x5b291c][_0x4f4815(0x193)](/<GLOBAL>/i))VisuMZ[_0x4f4815(0x1fd)][_0x4f4815(0x224)](_0x5b291c);}},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x113)]=DataManager[_0x4c1dc3(0x254)],DataManager[_0x4c1dc3(0x254)]=function(){const _0x1fa1df=_0x4c1dc3;VisuMZ[_0x1fa1df(0x246)][_0x1fa1df(0x113)][_0x1fa1df(0x24e)](this),Scene_File[_0x1fa1df(0x1c3)]=$gameParty[_0x1fa1df(0x1e3)]();},DataManager[_0x4c1dc3(0xaf)]=function(){const _0x206a8d=_0x4c1dc3;return!DataManager['isBattleTest']()&&!DataManager[_0x206a8d(0x138)]()&&$dataSystem[_0x206a8d(0x21a)];},DataManager[_0x4c1dc3(0x1d7)]=function(){const _0x421795=_0x4c1dc3;if(StorageManager[_0x421795(0xc6)]()===_0x421795(0x1ef))return 0x1;let _0x4440c4=VisuMZ['SaveCore'][_0x421795(0x139)][_0x421795(0x226)][_0x421795(0xe6)]?0x0:0x1;return VisuMZ['SaveCore']['Settings']['Save'][_0x421795(0x205)]+_0x4440c4;},DataManager[_0x4c1dc3(0xa8)]=function(_0x5f8d8a){const _0x188f12=_0x4c1dc3,_0x96fb14=VisuMZ[_0x188f12(0x246)][_0x188f12(0x139)][_0x188f12(0x226)][_0x188f12(0x232)];return _0x96fb14[_0x188f12(0x129)](_0x5f8d8a);},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x222)]=DataManager[_0x4c1dc3(0x127)],DataManager[_0x4c1dc3(0x127)]=function(){const _0x34e0a8=_0x4c1dc3,_0x2d2463=VisuMZ['SaveCore'][_0x34e0a8(0x222)][_0x34e0a8(0x24e)](this);return VisuMZ[_0x34e0a8(0x246)]['Settings']['SaveMenu'][_0x34e0a8(0xdd)][_0x34e0a8(0x24e)](this,_0x2d2463);},ConfigManager[_0x4c1dc3(0x1f3)]=VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x139)][_0x4c1dc3(0x172)]['Default'],ConfigManager[_0x4c1dc3(0xca)]=[],ConfigManager[_0x4c1dc3(0x1d5)]=[],VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x252)]=ConfigManager[_0x4c1dc3(0xd1)],ConfigManager[_0x4c1dc3(0xd1)]=function(){const _0x1a1242=_0x4c1dc3,_0x10972e=VisuMZ['SaveCore'][_0x1a1242(0x252)][_0x1a1242(0x24e)](this);return _0x10972e[_0x1a1242(0x1f3)]=this[_0x1a1242(0x1f3)]||VisuMZ[_0x1a1242(0x246)]['Settings']['AutosaveOption'][_0x1a1242(0x231)],_0x10972e[_0x1a1242(0xca)]=this[_0x1a1242(0xca)]||[],_0x10972e[_0x1a1242(0x1d5)]=this[_0x1a1242(0x1d5)]||[],_0x10972e;},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x20f)]=ConfigManager[_0x4c1dc3(0x12b)],ConfigManager[_0x4c1dc3(0x12b)]=function(_0x5ea0a6){const _0x581753=_0x4c1dc3;VisuMZ[_0x581753(0x246)]['ConfigManager_applyData'][_0x581753(0x24e)](this,_0x5ea0a6),this[_0x581753(0x1f3)]=_0x5ea0a6['autosave']!==undefined?_0x5ea0a6[_0x581753(0x1f3)]:VisuMZ['SaveCore'][_0x581753(0x139)][_0x581753(0x172)][_0x581753(0x231)],this['globalSwitches']=_0x5ea0a6[_0x581753(0xca)]||[],this['globalVariables']=_0x5ea0a6[_0x581753(0x1d5)]||[];},StorageManager[_0x4c1dc3(0x207)]=function(){const _0x2b4c29=_0x4c1dc3;if(Utils['isNwjs']())return _0x2b4c29(0xdc)!==_0x2b4c29(0xdc)?_0x3f9de3[_0x2b4c29(0xb1)]['setWordWrap'][_0x2b4c29(0x24e)](this,_0x5c245a):VisuMZ['SaveCore'][_0x2b4c29(0x139)][_0x2b4c29(0x226)][_0x2b4c29(0x1bb)];else{if(_0x2b4c29(0x1c7)!==_0x2b4c29(0x1c7)){if(!_0x2613fe[_0x2b4c29(0xaf)]()||_0x4c9225[_0x2b4c29(0x1a0)]())return;_0x354333['_scene'][_0x2b4c29(0x1b8)]();}else return![];}},StorageManager[_0x4c1dc3(0x1d2)]=function(_0xb3c93c){const _0x52cad1=_0x4c1dc3,_0x3d4c18=this[_0x52cad1(0x1f8)](),_0x52b89c=VisuMZ['SaveCore'][_0x52cad1(0x139)]['Save'][_0x52cad1(0x199)];return _0x3d4c18+_0x52b89c[_0x52cad1(0x129)](_0xb3c93c);},StorageManager['forageKey']=function(_0x1f1345){const _0x394761=_0x4c1dc3,_0x47fbed=$dataSystem[_0x394761(0x23b)]['gameId'],_0x504595=VisuMZ[_0x394761(0x246)][_0x394761(0x139)][_0x394761(0x226)][_0x394761(0x100)];return _0x504595['format'](_0x47fbed,_0x1f1345);},StorageManager[_0x4c1dc3(0x1d4)]=function(){const _0x19fb7c=_0x4c1dc3;return VisuMZ[_0x19fb7c(0x246)]['Settings'][_0x19fb7c(0x226)]['TestKey'];},StorageManager[_0x4c1dc3(0xc6)]=function(){const _0x15d753=_0x4c1dc3;return VisuMZ[_0x15d753(0x246)]['Settings']['Save'][_0x15d753(0x20a)];},StorageManager[_0x4c1dc3(0x1af)]=function(){const _0x1646a1=_0x4c1dc3;return this['saveStyle']()===_0x1646a1(0x1ef)?_0x1646a1(0x210):VisuMZ[_0x1646a1(0x246)][_0x1646a1(0x139)][_0x1646a1(0x212)][_0x1646a1(0x106)];},TextManager[_0x4c1dc3(0xc4)]=VisuMZ[_0x4c1dc3(0x246)]['Settings'][_0x4c1dc3(0x226)][_0x4c1dc3(0x218)],TextManager[_0x4c1dc3(0x1b7)]=VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x139)][_0x4c1dc3(0x1cf)][_0x4c1dc3(0x24f)],TextManager['saveFailure']=VisuMZ['SaveCore']['Settings'][_0x4c1dc3(0x1cf)]['VocabSaveFailure'],TextManager[_0x4c1dc3(0x121)]=VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x139)][_0x4c1dc3(0x1cf)][_0x4c1dc3(0x17a)],TextManager[_0x4c1dc3(0x20d)]=VisuMZ[_0x4c1dc3(0x246)]['Settings']['AutosaveOption'][_0x4c1dc3(0xe8)],TextManager[_0x4c1dc3(0xc9)]=VisuMZ['SaveCore'][_0x4c1dc3(0x139)][_0x4c1dc3(0x242)][_0x4c1dc3(0x19a)],TextManager['autosaveFailure']=VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x139)][_0x4c1dc3(0x242)]['VocabAutosaveFailure'],TextManager['latestSave']=VisuMZ[_0x4c1dc3(0x246)]['Settings'][_0x4c1dc3(0x1e8)][_0x4c1dc3(0x10b)],ColorManager['latestSavefile']=function(){const _0x5c208b=_0x4c1dc3,_0x6dbb8d=_0x5c208b(0x155);this[_0x5c208b(0xef)]=this[_0x5c208b(0xef)]||{};if(this[_0x5c208b(0xef)][_0x6dbb8d])return this[_0x5c208b(0xef)][_0x6dbb8d];const _0x497bf4=VisuMZ[_0x5c208b(0x246)][_0x5c208b(0x139)][_0x5c208b(0x1e8)][_0x5c208b(0x1dc)];return this[_0x5c208b(0x15e)](_0x6dbb8d,_0x497bf4);},ColorManager['getColorDataFromPluginParameters']=function(_0x78d3ac,_0x233f29){const _0x47f5a4=_0x4c1dc3;return _0x233f29=String(_0x233f29),this[_0x47f5a4(0xef)]=this[_0x47f5a4(0xef)]||{},_0x233f29[_0x47f5a4(0x193)](/#(.*)/i)?this[_0x47f5a4(0xef)][_0x78d3ac]='#%1'[_0x47f5a4(0x129)](String(RegExp['$1'])):this[_0x47f5a4(0xef)][_0x78d3ac]=this[_0x47f5a4(0xb8)](Number(_0x233f29)),this[_0x47f5a4(0xef)][_0x78d3ac];},VisuMZ['SaveCore'][_0x4c1dc3(0xe4)]=Game_System[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1cc)],Game_System['prototype']['initialize']=function(){const _0x592d6e=_0x4c1dc3;VisuMZ['SaveCore'][_0x592d6e(0xe4)][_0x592d6e(0x24e)](this),this[_0x592d6e(0x204)]();},Game_System[_0x4c1dc3(0xb1)][_0x4c1dc3(0x204)]=function(){const _0x189c62=_0x4c1dc3;this[_0x189c62(0xb5)]={'autosaveEnabled':!![],'saveDescription':'','savePicture':''};},Game_System['prototype']['isAutosaveEnabled']=function(){const _0x495745=_0x4c1dc3;if(!$dataSystem['optAutosave'])return![];if(this[_0x495745(0xb5)]===undefined)this[_0x495745(0x204)]();if(this[_0x495745(0xb5)]['autosaveEnabled']===undefined)this['initSaveCore']();return this[_0x495745(0xb5)][_0x495745(0x166)];},Game_System[_0x4c1dc3(0xb1)]['enableAutosave']=function(_0x48a7b4){const _0x3342b8=_0x4c1dc3;if(!$dataSystem['optAutosave'])return;if(this[_0x3342b8(0xb5)]===undefined)this[_0x3342b8(0x204)]();if(this[_0x3342b8(0xb5)]['autosaveEnabled']===undefined)this[_0x3342b8(0x204)]();this['_SaveCoreSettings'][_0x3342b8(0x166)]=_0x48a7b4;},Game_System['prototype'][_0x4c1dc3(0xb4)]=function(){const _0x5c38fe=_0x4c1dc3;if(this[_0x5c38fe(0xb5)]===undefined)this[_0x5c38fe(0x204)]();if(this[_0x5c38fe(0xb5)][_0x5c38fe(0xd9)]===undefined)this['initSaveCore']();return this['_SaveCoreSettings'][_0x5c38fe(0xd9)];},Game_System[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1c5)]=function(_0x1e4664){const _0x49f086=_0x4c1dc3;if(this[_0x49f086(0xb5)]===undefined)this['initSaveCore']();if(this[_0x49f086(0xb5)][_0x49f086(0xd9)]===undefined)this[_0x49f086(0x204)]();this[_0x49f086(0xb5)]['saveDescription']=VisuMZ[_0x49f086(0x246)]['ParseTextCodes'](_0x1e4664);},VisuMZ['SaveCore'][_0x4c1dc3(0x1ce)]=function(_0x261c6e){const _0x243cfa=_0x4c1dc3;while(_0x261c6e[_0x243cfa(0x193)](/\\V\[(\d+)\]/gi)){if(_0x243cfa(0x1e7)!==_0x243cfa(0x200))_0x261c6e=_0x261c6e[_0x243cfa(0x11c)](/\\V\[(\d+)\]/gi,(_0x54ffe6,_0x514064)=>$gameVariables[_0x243cfa(0x19e)](parseInt(_0x514064)));else{if(!_0x344f2d[_0x243cfa(0xaf)]())return;_0x1be47f['ConvertParams'](_0x255784,_0xf4c031);if(_0x5e781b)_0x50c743['enableAutosave'](_0x171fd7[_0x243cfa(0x13f)]);}}while(_0x261c6e[_0x243cfa(0x193)](/\\N\[(\d+)\]/gi)){_0x261c6e=_0x261c6e[_0x243cfa(0x11c)](/\\N\[(\d+)\]/gi,(_0x22aeca,_0xd1108b)=>Window_Base['prototype'][_0x243cfa(0xc2)](parseInt(_0xd1108b)));}while(_0x261c6e[_0x243cfa(0x193)](/\\P\[(\d+)\]/gi)){_0x261c6e=_0x261c6e['replace'](/\\P\[(\d+)\]/gi,(_0xfabddc,_0x200aaa)=>Window_Base[_0x243cfa(0xb1)]['partyMemberName'](parseInt(_0x200aaa)));}return _0x261c6e;},Game_System[_0x4c1dc3(0xb1)]['getSavePicture']=function(){const _0x92fe1c=_0x4c1dc3;if(this[_0x92fe1c(0xb5)]===undefined)this[_0x92fe1c(0x204)]();if(this[_0x92fe1c(0xb5)][_0x92fe1c(0x157)]===undefined)this['initSaveCore']();return this['_SaveCoreSettings'][_0x92fe1c(0x157)];},Game_System[_0x4c1dc3(0xb1)]['setSavePicture']=function(_0x2535bd){const _0x29ec8c=_0x4c1dc3;if(this['_SaveCoreSettings']===undefined)this['initSaveCore']();if(this[_0x29ec8c(0xb5)][_0x29ec8c(0x157)]===undefined)this['initSaveCore']();this['_SaveCoreSettings'][_0x29ec8c(0x157)]=_0x2535bd;},VisuMZ[_0x4c1dc3(0x246)]['Game_System_savefileId']=Game_System[_0x4c1dc3(0xb1)][_0x4c1dc3(0xe7)],Game_System[_0x4c1dc3(0xb1)][_0x4c1dc3(0xe7)]=function(){const _0x5e294f=_0x4c1dc3,_0xb6fc09=StorageManager[_0x5e294f(0xc6)]();switch(_0xb6fc09){case _0x5e294f(0xff):return VisuMZ[_0x5e294f(0x246)][_0x5e294f(0x171)]['call'](this)||0x1;break;case _0x5e294f(0x1ef):return 0x0;break;default:return VisuMZ[_0x5e294f(0x246)][_0x5e294f(0x171)][_0x5e294f(0x24e)](this);break;}},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x184)]=Game_System['prototype'][_0x4c1dc3(0x1c0)],Game_System[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1c0)]=function(){const _0x13f02b=_0x4c1dc3;VisuMZ[_0x13f02b(0x246)]['Game_System_onAfterLoad'][_0x13f02b(0x24e)](this);const _0x1d75b9=VisuMZ[_0x13f02b(0x246)]['Settings'][_0x13f02b(0x1cf)][_0x13f02b(0x12a)];setTimeout(VisuMZ['SaveCore']['RemoveSaveCoreCache'][_0x13f02b(0x167)](this),_0x1d75b9+0xa);},Game_Switches['prototype']['isGlobal']=function(_0x2e92e0){const _0x4c96c2=_0x4c1dc3;return $dataSystem[_0x4c96c2(0xac)][_0x2e92e0]&&VisuMZ['GlobalSwitches']['includes'](_0x2e92e0);},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x1b4)]=Game_Switches[_0x4c1dc3(0xb1)]['value'],Game_Switches[_0x4c1dc3(0xb1)][_0x4c1dc3(0x19e)]=function(_0x5c4465){const _0xcd4333=_0x4c1dc3;return this[_0xcd4333(0x1e0)](_0x5c4465)?this['globalValue'](_0x5c4465):VisuMZ['SaveCore'][_0xcd4333(0x1b4)][_0xcd4333(0x24e)](this,_0x5c4465);},Game_Switches['prototype']['globalValue']=function(_0x594d7e){const _0x2cff12=_0x4c1dc3;return ConfigManager[_0x2cff12(0xca)]=ConfigManager[_0x2cff12(0xca)]||[],!!ConfigManager[_0x2cff12(0xca)][_0x594d7e];},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x1bc)]=Game_Switches[_0x4c1dc3(0xb1)]['setValue'],Game_Switches['prototype'][_0x4c1dc3(0x108)]=function(_0x40a95b,_0x14d346){const _0x4bf40e=_0x4c1dc3;if(this[_0x4bf40e(0x1e0)](_0x40a95b))this[_0x4bf40e(0xba)](_0x40a95b,_0x14d346);VisuMZ[_0x4bf40e(0x246)]['Game_Switches_setValue'][_0x4bf40e(0x24e)](this,_0x40a95b,_0x14d346);},Game_Switches[_0x4c1dc3(0xb1)]['setGlobalValue']=function(_0x4031d0,_0x77c2bd){const _0x850e37=_0x4c1dc3;_0x4031d0>0x0&&_0x4031d0<$dataSystem[_0x850e37(0xac)][_0x850e37(0xf5)]&&(ConfigManager[_0x850e37(0xca)]=ConfigManager[_0x850e37(0xca)]||[],ConfigManager[_0x850e37(0xca)][_0x4031d0]=_0x77c2bd,ConfigManager[_0x850e37(0x229)]());},Game_Variables[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1e0)]=function(_0x3f4f6e){const _0x5c9503=_0x4c1dc3;return $dataSystem[_0x5c9503(0x1a9)][_0x3f4f6e]&&VisuMZ[_0x5c9503(0x1fd)][_0x5c9503(0x24b)](_0x3f4f6e);},VisuMZ[_0x4c1dc3(0x246)]['Game_Variables_value']=Game_Variables[_0x4c1dc3(0xb1)][_0x4c1dc3(0x19e)],Game_Variables['prototype'][_0x4c1dc3(0x19e)]=function(_0x376900){const _0x15673d=_0x4c1dc3;return this[_0x15673d(0x1e0)](_0x376900)?this[_0x15673d(0x1a8)](_0x376900):VisuMZ['SaveCore'][_0x15673d(0xe9)][_0x15673d(0x24e)](this,_0x376900);},Game_Variables[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1a8)]=function(_0x273e97){const _0x1ff9b5=_0x4c1dc3;ConfigManager[_0x1ff9b5(0x1d5)]=ConfigManager[_0x1ff9b5(0x1d5)]||[];if(ConfigManager['globalVariables'][_0x273e97]===undefined){if(_0x1ff9b5(0x1b5)!=='gTKhM')ConfigManager[_0x1ff9b5(0x1d5)][_0x273e97]=0x0;else return _0x309cdd[_0x1ff9b5(0x246)][_0x1ff9b5(0x139)][_0x1ff9b5(0x247)];}return ConfigManager[_0x1ff9b5(0x1d5)][_0x273e97];},VisuMZ['SaveCore'][_0x4c1dc3(0xae)]=Game_Variables[_0x4c1dc3(0xb1)][_0x4c1dc3(0x108)],Game_Variables['prototype'][_0x4c1dc3(0x108)]=function(_0x3f4f4a,_0x5a0ebd){const _0x1dd230=_0x4c1dc3;if(this['isGlobal'](_0x3f4f4a))this[_0x1dd230(0xba)](_0x3f4f4a,_0x5a0ebd);VisuMZ['SaveCore'][_0x1dd230(0xae)][_0x1dd230(0x24e)](this,_0x3f4f4a,_0x5a0ebd);},Game_Variables['prototype'][_0x4c1dc3(0xba)]=function(_0x53cee3,_0x717326){const _0x281975=_0x4c1dc3;if(_0x53cee3>0x0&&_0x53cee3<$dataSystem[_0x281975(0x1a9)][_0x281975(0xf5)]){if(_0x281975(0xfd)===_0x281975(0xfd)){ConfigManager[_0x281975(0x1d5)]=ConfigManager['globalVariables']||[];if(typeof _0x717326===_0x281975(0x10f))_0x717326=Math[_0x281975(0x19b)](_0x717326);ConfigManager['globalVariables'][_0x53cee3]=_0x717326,ConfigManager[_0x281975(0x229)]();}else _0x1aae4e=_0x385a06[_0x281975(0x121)];}},Game_Party[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1ae)]=function(){const _0x38a96b=_0x4c1dc3;return this['battleMembers']()[_0x38a96b(0xf3)](_0xb1e460=>_0xb1e460['battlerName']());},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x143)]=function(_0x9e3b3c){const _0x1f6eb0=_0x4c1dc3,_0x9ddbd6=VisuMZ[_0x1f6eb0(0x246)][_0x1f6eb0(0x139)][_0x1f6eb0(0x212)];switch(_0x9e3b3c){case'battle':this[_0x1f6eb0(0x1b2)]=!_0x9ddbd6[_0x1f6eb0(0x132)];break;case'transfer':if(!this[_0x1f6eb0(0x1cb)]())return;this[_0x1f6eb0(0x1b2)]=!_0x9ddbd6[_0x1f6eb0(0xd4)];break;case _0x1f6eb0(0x1bf):this[_0x1f6eb0(0x1b2)]=!_0x9ddbd6[_0x1f6eb0(0x1ee)];break;case _0x1f6eb0(0x128):this[_0x1f6eb0(0x1b2)]=!_0x9ddbd6[_0x1f6eb0(0xc0)];break;}},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x13e)]=Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1b8)],Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1b8)]=function(){const _0x5d1c57=_0x4c1dc3;if(!this[_0x5d1c57(0x1b2)]){if(_0x5d1c57(0x253)===_0x5d1c57(0x1fc)){if(_0x2c41bc['timestamp']){_0x4835c4=_0xf4d9a8||_0x5d1c57(0x225);let _0x514576=this[_0x5d1c57(0x1dd)](_0x2e9027);_0x1a780e[_0x5d1c57(0x195)]&&this[_0x5d1c57(0xb9)]()&&(_0x514576='{{%1}}'[_0x5d1c57(0x129)](_0x514576)),this[_0x5d1c57(0x12e)](_0x514576,_0xae6f60,_0xafb1,_0x4640d8,_0x53f127);}}else VisuMZ[_0x5d1c57(0x246)][_0x5d1c57(0x13e)][_0x5d1c57(0x24e)](this);}this[_0x5d1c57(0x1b2)]=![];},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1e6)]=function(){const _0x19cedd=_0x4c1dc3;return!DataManager[_0x19cedd(0x21d)]()&&!DataManager['isEventTest']()&&$gameSystem[_0x19cedd(0x1e6)]()&&(VisuMZ[_0x19cedd(0x246)]['Settings'][_0x19cedd(0x212)][_0x19cedd(0x23e)]?$gameSystem[_0x19cedd(0x116)]():!![]);},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x150)]=function(){const _0x468aba=_0x4c1dc3;if(!ConfigManager[_0x468aba(0x1f3)])return;this['forceAutosave']();},Scene_Base['prototype'][_0x4c1dc3(0xaa)]=function(){const _0x46595f=_0x4c1dc3;$gameSystem['onBeforeSave'](),this['_processingAutosave']=![];const _0xafb7bb=StorageManager[_0x46595f(0x1af)]();if([_0x46595f(0x210),'both'][_0x46595f(0x24b)](_0xafb7bb)){if(_0x46595f(0x217)!==_0x46595f(0x217)){_0x43fcc7[_0x46595f(0xb1)]['update'][_0x46595f(0x24e)](this);if(this['_fadeSpeed']!==0x0)this['updateFade']();}else DataManager[_0x46595f(0x234)](0x0)['then'](()=>this[_0x46595f(0x190)]())[_0x46595f(0x147)](()=>this['onAutosaveFailure']());}if([_0x46595f(0x244),_0x46595f(0x149)][_0x46595f(0x24b)](_0xafb7bb)){const _0xab1e91=$gameSystem[_0x46595f(0xe7)]();if(_0xab1e91>0x0){if(_0x46595f(0x182)!==_0x46595f(0x15a))DataManager['saveGame'](_0xab1e91)[_0x46595f(0x148)](()=>this[_0x46595f(0x190)]())[_0x46595f(0x147)](()=>this[_0x46595f(0x1b9)]());else{const _0x4679ac=_0xb3b970['SaveCore'][_0x46595f(0x222)]['call'](this);return _0x53ef92[_0x46595f(0x246)][_0x46595f(0x139)][_0x46595f(0x1e8)][_0x46595f(0xdd)][_0x46595f(0x24e)](this,_0x4679ac);}}}this[_0x46595f(0x16c)]=![];},VisuMZ['SaveCore'][_0x4c1dc3(0xe2)]=Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x190)],Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x190)]=function(){const _0x2d9bcf=_0x4c1dc3;if(this['_processingAutosave'])return;VisuMZ[_0x2d9bcf(0x246)][_0x2d9bcf(0xe2)][_0x2d9bcf(0x24e)](this),VisuMZ[_0x2d9bcf(0x246)][_0x2d9bcf(0x139)]['Autosave'][_0x2d9bcf(0x1de)]['call'](this),this[_0x2d9bcf(0x237)](!![]),this[_0x2d9bcf(0x16c)]=!![];},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0xb0)]=Scene_Base['prototype'][_0x4c1dc3(0x1b9)],Scene_Base[_0x4c1dc3(0xb1)]['onAutosaveFailure']=function(){const _0x538c93=_0x4c1dc3;if(this[_0x538c93(0x16c)])return;VisuMZ[_0x538c93(0x246)][_0x538c93(0xb0)][_0x538c93(0x24e)](this),VisuMZ[_0x538c93(0x246)]['Settings'][_0x538c93(0x212)][_0x538c93(0xcb)][_0x538c93(0x24e)](this),this['openAutosaveConfirmationWindow'](![]);},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x120)]=function(){const _0x15c94c=_0x4c1dc3;if(this['_saveConfirmWindow'])return;const _0x58dd03=this['saveConfirmationWindowRect']();this[_0x15c94c(0x1da)]=new Window_Base(_0x58dd03),this[_0x15c94c(0x1da)][_0x15c94c(0x11a)]=0x0;},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0xcc)]=function(){const _0x171910=_0x4c1dc3;return VisuMZ[_0x171910(0x246)][_0x171910(0x139)][_0x171910(0x1cf)][_0x171910(0xfe)][_0x171910(0x24e)](this);},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0xc5)]=function(){const _0x1cfab2=_0x4c1dc3;return VisuMZ[_0x1cfab2(0x246)][_0x1cfab2(0x139)][_0x1cfab2(0x1cf)]['Enable'];},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1aa)]=function(_0x126062,_0x4230e0){const _0x376faa=_0x4c1dc3;if(!this[_0x376faa(0xc5)]())return this[_0x376faa(0x24a)](_0x126062);if(!this[_0x376faa(0x1da)])this[_0x376faa(0x120)]();const _0x63159e=this[_0x376faa(0x1da)];this[_0x376faa(0x12f)](_0x63159e),this[_0x376faa(0x1f2)](_0x63159e),_0x63159e[_0x376faa(0x146)](),_0x63159e[_0x376faa(0x1ca)](),_0x63159e[_0x376faa(0xbc)][_0x376faa(0x203)]();let _0x28bc64='';_0x4230e0?_0x28bc64=TextManager[_0x376faa(0x121)]:_0x28bc64=_0x126062?TextManager['saveSuccess']:TextManager[_0x376faa(0x110)];const _0x3d8794=_0x63159e[_0x376faa(0x126)](_0x28bc64)['width'],_0x1a5170=(_0x63159e[_0x376faa(0x1b0)]-_0x3d8794)/0x2;_0x63159e[_0x376faa(0x1a2)](_0x28bc64,_0x1a5170,0x0,_0x3d8794);const _0xa3848d=VisuMZ[_0x376faa(0x246)][_0x376faa(0x139)][_0x376faa(0x1cf)]['Duration'];setTimeout(this['closeSaveConfirmationWindow'][_0x376faa(0x167)](this,_0x126062),_0xa3848d);},Scene_Base['prototype'][_0x4c1dc3(0x1d6)]=function(){this['openSaveConfirmationWindow'](![],!![]);},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x24a)]=function(_0x3dc3c3){const _0x2d8294=_0x4c1dc3;if(this[_0x2d8294(0x1da)])this[_0x2d8294(0x1da)][_0x2d8294(0xfc)]();},Scene_Base['prototype'][_0x4c1dc3(0x250)]=function(){const _0x361e67=_0x4c1dc3;if(this[_0x361e67(0x1be)])return;const _0x2e3a2a=this[_0x361e67(0x17d)]();this[_0x361e67(0x1be)]=new Window_AutosaveConfirm(_0x2e3a2a);},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x17d)]=function(){const _0x123a7c=_0x4c1dc3,_0x33818a=this[_0x123a7c(0x140)](),_0x1fe5d6=this[_0x123a7c(0xab)](0x1,![]),_0x1f0e29=Graphics['width']-_0x33818a,_0x465d0d=Graphics[_0x123a7c(0x192)]-_0x1fe5d6;return new Rectangle(_0x1f0e29,_0x465d0d,_0x33818a,_0x1fe5d6);},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x19c)]=function(){const _0x3adf3c=_0x4c1dc3;return VisuMZ[_0x3adf3c(0x246)][_0x3adf3c(0x139)][_0x3adf3c(0x242)][_0x3adf3c(0x13f)];},Scene_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0x237)]=function(_0x4bbee3){const _0x2029d1=_0x4c1dc3;if(!this['isAutosaveConfirmWindowEnabled']())return this[_0x2029d1(0x160)](_0x4bbee3);if(!this[_0x2029d1(0x1be)])this[_0x2029d1(0x250)]();const _0x56835f=this[_0x2029d1(0x1be)];this[_0x2029d1(0x12f)](_0x56835f),this[_0x2029d1(0x1f2)](_0x56835f),_0x56835f[_0x2029d1(0x14a)](_0x4bbee3),_0x56835f[_0x2029d1(0x16f)]();const _0x131fef=VisuMZ['SaveCore']['Settings'][_0x2029d1(0x1cf)][_0x2029d1(0x12a)];setTimeout(this[_0x2029d1(0x160)]['bind'](this,_0x4bbee3),_0x131fef);},Scene_Base[_0x4c1dc3(0xb1)]['closeAutosaveConfirmationWindow']=function(_0x3bf3be){const _0x491826=_0x4c1dc3;if(this['_autosaveConfirmWindow'])this[_0x491826(0x1be)][_0x491826(0x216)]();},Scene_Base['prototype']['saveCurrentSlot']=function(){},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x240)]=Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1cc)],Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1cc)]=function(){const _0x43b640=_0x4c1dc3;VisuMZ[_0x43b640(0x246)][_0x43b640(0x240)][_0x43b640(0x24e)](this),this[_0x43b640(0x13b)]=![];},VisuMZ[_0x4c1dc3(0x246)]['Scene_Title_terminate']=Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1fe)],Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1fe)]=function(){const _0x5beced=_0x4c1dc3;VisuMZ[_0x5beced(0x246)][_0x5beced(0x1c4)][_0x5beced(0x24e)](this);if(this[_0x5beced(0x13b)])$gameSystem['onAfterLoad']();},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0xd7)]=Scene_Title['prototype']['commandNewGame'],Scene_Title['prototype']['commandNewGame']=function(){const _0x26e8b0=_0x4c1dc3;StorageManager['saveStyle']()===_0x26e8b0(0xff)?this['commandNewGameSaveCoreLocked']():'JoLny'!==_0x26e8b0(0x1c1)?VisuMZ[_0x26e8b0(0x246)][_0x26e8b0(0xd7)][_0x26e8b0(0x24e)](this):_0x56009b['_pickLockedSaveSlot']?this[_0x26e8b0(0xa7)](_0x1aa6d3):_0x32480a[_0x26e8b0(0x246)]['Scene_Save_executeSave'][_0x26e8b0(0x24e)](this,_0x3efc2c);},Scene_Title['prototype']['commandNewGameSaveCoreLocked']=function(){const _0xcb80dd=_0x4c1dc3;DataManager[_0xcb80dd(0x175)](),$gameTemp['_pickLockedSaveSlot']=!![],this[_0xcb80dd(0x12c)][_0xcb80dd(0xfc)](),SceneManager[_0xcb80dd(0x224)](Scene_Save);},VisuMZ['SaveCore'][_0x4c1dc3(0x183)]=Scene_Title['prototype']['commandContinue'],Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x14d)]=function(){const _0x1938fa=_0x4c1dc3;StorageManager[_0x1938fa(0xc6)]()===_0x1938fa(0x1ef)?this['commandContinueSaveCoreSingle']():VisuMZ[_0x1938fa(0x246)][_0x1938fa(0x183)]['call'](this);},Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0xdb)]=function(){const _0x4e8888=_0x4c1dc3;DataManager[_0x4e8888(0x186)](0x0)['then'](()=>this[_0x4e8888(0x1ff)]())['catch'](()=>this['onSaveCoreLoadFailure']());},Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1ff)]=function(){const _0x14bc44=_0x4c1dc3;this[_0x14bc44(0x12c)][_0x14bc44(0xfc)](),SoundManager[_0x14bc44(0x23a)](),this[_0x14bc44(0xd5)](),Scene_Load[_0x14bc44(0xb1)][_0x14bc44(0xee)](),SceneManager[_0x14bc44(0x181)](Scene_Map),this[_0x14bc44(0x13b)]=!![],VisuMZ[_0x14bc44(0x246)][_0x14bc44(0x139)][_0x14bc44(0x226)][_0x14bc44(0x17e)][_0x14bc44(0x24e)](this);},Scene_Title[_0x4c1dc3(0xb1)]['onSaveCoreLoadFailure']=function(){const _0x93d0c1=_0x4c1dc3;SoundManager[_0x93d0c1(0x10d)](),VisuMZ[_0x93d0c1(0x246)][_0x93d0c1(0x139)][_0x93d0c1(0x226)][_0x93d0c1(0x238)][_0x93d0c1(0x24e)](this),this['loadFailureConfirmationWindow']();},Scene_Title[_0x4c1dc3(0xb1)][_0x4c1dc3(0x24a)]=function(_0xdaa3b4){const _0x1ec468=_0x4c1dc3;Scene_Base[_0x1ec468(0xb1)][_0x1ec468(0x24a)][_0x1ec468(0x24e)](this,_0xdaa3b4),this['_commandWindow'][_0x1ec468(0x146)](),this['_commandWindow'][_0x1ec468(0x23c)]();},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x206)]=Scene_Map[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1f5)],Scene_Map[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1f5)]=function(){const _0x2554a6=_0x4c1dc3;VisuMZ[_0x2554a6(0x246)][_0x2554a6(0x206)][_0x2554a6(0x24e)](this);if(SceneManager[_0x2554a6(0x187)](Scene_Menu))_0x2554a6(0x1e2)===_0x2554a6(0x20c)?this[_0x2554a6(0x12e)](_0x144bd2[_0x2554a6(0x119)]+'\x20'+_0xfdf73a,_0x22e058,_0x167138,0xb4):(this['determineAutosaveBypass'](_0x2554a6(0x128)),this[_0x2554a6(0x1b8)]());else{if(SceneManager[_0x2554a6(0x187)](Scene_Battle)){if(_0x2554a6(0x179)===_0x2554a6(0x114)){_0x53d0e6[_0x2554a6(0x1eb)](),this[_0x2554a6(0x16c)]=![];const _0x31fd59=_0x105e20[_0x2554a6(0x1af)]();[_0x2554a6(0x210),_0x2554a6(0x149)]['includes'](_0x31fd59)&&_0x4b4bc5[_0x2554a6(0x234)](0x0)['then'](()=>this[_0x2554a6(0x190)]())[_0x2554a6(0x147)](()=>this[_0x2554a6(0x1b9)]());if([_0x2554a6(0x244),_0x2554a6(0x149)][_0x2554a6(0x24b)](_0x31fd59)){const _0x12927d=_0x2820f3[_0x2554a6(0xe7)]();_0x12927d>0x0&&_0x20a615[_0x2554a6(0x234)](_0x12927d)[_0x2554a6(0x148)](()=>this['onAutosaveSuccess']())[_0x2554a6(0x147)](()=>this['onAutosaveFailure']());}this['_processingAutosave']=![];}else this['determineAutosaveBypass']('battle'),this[_0x2554a6(0x1b8)]();}}},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x1cd)]=Scene_Map[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1e9)],Scene_Map['prototype'][_0x4c1dc3(0x1e9)]=function(){const _0x3b0719=_0x4c1dc3;this[_0x3b0719(0x1cb)]()&&(_0x3b0719(0x214)===_0x3b0719(0x156)?(_0x1c4bc4['setupNewGame'](),_0x201315[_0x3b0719(0x189)]=!![],this[_0x3b0719(0x12c)][_0x3b0719(0xfc)](),_0x2ec43a[_0x3b0719(0x224)](_0xafc174)):this[_0x3b0719(0x143)](_0x3b0719(0x14c))),VisuMZ[_0x3b0719(0x246)]['Scene_Map_onTransferEnd'][_0x3b0719(0x24e)](this);},Scene_Map[_0x4c1dc3(0xb1)]['saveCurrentSlot']=function(){const _0x4a2cf1=_0x4c1dc3;if($gameSystem['_saveCorePluginCommandSave'])return;const _0x54a860=$gameSystem[_0x4a2cf1(0xe7)]();if(StorageManager[_0x4a2cf1(0xc6)]()!=='single'&&_0x54a860<=0x0)return;this[_0x4a2cf1(0xfb)]=![],$gameSystem[_0x4a2cf1(0x22e)](_0x54a860),$gameSystem[_0x4a2cf1(0x1eb)](),$gameSystem[_0x4a2cf1(0x1d8)]=!![],DataManager['saveGame'](_0x54a860)[_0x4a2cf1(0x148)](()=>this[_0x4a2cf1(0xb3)]())['catch'](()=>this[_0x4a2cf1(0x1bd)]()),$gameSystem[_0x4a2cf1(0x1d8)]=undefined;},Scene_Map[_0x4c1dc3(0xb1)][_0x4c1dc3(0xb3)]=function(){const _0x5841c4=_0x4c1dc3;SoundManager[_0x5841c4(0x144)](),VisuMZ[_0x5841c4(0x246)][_0x5841c4(0x139)]['Save'][_0x5841c4(0x236)][_0x5841c4(0x24e)](this),this[_0x5841c4(0x1aa)](!![]);},Scene_Map[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1bd)]=function(){const _0x5e1a1e=_0x4c1dc3;SoundManager['playBuzzer'](),VisuMZ[_0x5e1a1e(0x246)]['Settings'][_0x5e1a1e(0x226)][_0x5e1a1e(0x162)][_0x5e1a1e(0x24e)](this),this[_0x5e1a1e(0x1aa)](![]);},Scene_Map['prototype'][_0x4c1dc3(0x24a)]=function(_0x1d42f5){const _0x3a25ff=_0x4c1dc3;Scene_Message[_0x3a25ff(0xb1)]['closeSaveConfirmationWindow'][_0x3a25ff(0x24e)](this,_0x1d42f5),this[_0x3a25ff(0xfb)]=!![];},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x185)]=Scene_Menu[_0x4c1dc3(0xb1)][_0x4c1dc3(0x170)],Scene_Menu[_0x4c1dc3(0xb1)][_0x4c1dc3(0x170)]=function(){const _0x193c92=_0x4c1dc3;VisuMZ[_0x193c92(0x246)][_0x193c92(0x185)]['call'](this);if(SceneManager[_0x193c92(0x187)](Scene_Map)){if('dtsTL'===_0x193c92(0x14f))this['determineAutosaveBypass'](_0x193c92(0x1bf)),this[_0x193c92(0x1b8)]();else{const _0x195471=_0x181527[_0x193c92(0x20d)],_0x3ca67b=_0x193c92(0x1f3);this[_0x193c92(0x153)](_0x195471,_0x3ca67b);}}},VisuMZ[_0x4c1dc3(0x246)]['Scene_Menu_commandSave']=Scene_Menu[_0x4c1dc3(0xb1)][_0x4c1dc3(0xec)],Scene_Menu[_0x4c1dc3(0xb1)]['commandSave']=function(){const _0x198e00=_0x4c1dc3,_0x6d78d5=StorageManager['saveStyle']();switch(_0x6d78d5){case _0x198e00(0xff):case _0x198e00(0x1ef):this[_0x198e00(0x122)]();break;default:VisuMZ[_0x198e00(0x246)][_0x198e00(0x117)]['call'](this);break;}},Scene_Menu[_0x4c1dc3(0xb1)][_0x4c1dc3(0x122)]=function(){const _0x2f68bc=_0x4c1dc3,_0x4489bb=$gameSystem['savefileId']();$gameSystem[_0x2f68bc(0x22e)](_0x4489bb),$gameSystem[_0x2f68bc(0x1eb)](),DataManager[_0x2f68bc(0x234)](_0x4489bb)[_0x2f68bc(0x148)](()=>this['onSaveCoreSaveSuccess']())[_0x2f68bc(0x147)](()=>this['onSaveCoreSaveFailure']());},Scene_Menu[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1c8)]=function(){const _0x23a6af=_0x4c1dc3;SoundManager[_0x23a6af(0x144)](),VisuMZ['SaveCore']['Settings'][_0x23a6af(0x226)][_0x23a6af(0x236)][_0x23a6af(0x24e)](this),this['openSaveConfirmationWindow'](!![]);},Scene_Menu[_0x4c1dc3(0xb1)][_0x4c1dc3(0xda)]=function(){const _0x5f38ff=_0x4c1dc3;SoundManager[_0x5f38ff(0x10d)](),VisuMZ['SaveCore'][_0x5f38ff(0x139)][_0x5f38ff(0x226)]['OnSaveFailureJS'][_0x5f38ff(0x24e)](this),this[_0x5f38ff(0x1aa)](![]);},Scene_Menu[_0x4c1dc3(0xb1)]['closeSaveConfirmationWindow']=function(_0x282075){const _0x326659=_0x4c1dc3;Scene_MenuBase[_0x326659(0xb1)][_0x326659(0x24a)][_0x326659(0x24e)](this,_0x282075),this[_0x326659(0x12c)]['activate']();},Scene_Battle[_0x4c1dc3(0xb1)]['requestAutosave']=function(){},VisuMZ[_0x4c1dc3(0x246)]['Scene_Options_maxCommands']=Scene_Options[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1b6)],Scene_Options[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1b6)]=function(){const _0x29bbf7=_0x4c1dc3;let _0x37fd8a=VisuMZ[_0x29bbf7(0x246)][_0x29bbf7(0x19d)]['call'](this);const _0x2fab8e=VisuMZ['SaveCore']['Settings'];if(_0x2fab8e[_0x29bbf7(0x172)][_0x29bbf7(0x158)]&&_0x2fab8e[_0x29bbf7(0x172)][_0x29bbf7(0x17c)])_0x37fd8a++;return _0x37fd8a;},Scene_Save[_0x4c1dc3(0xb1)][_0x4c1dc3(0xb3)]=function(){const _0x297efd=_0x4c1dc3;SoundManager[_0x297efd(0x144)](),VisuMZ[_0x297efd(0x246)][_0x297efd(0x139)][_0x297efd(0x226)][_0x297efd(0x236)][_0x297efd(0x24e)](this),this['_listWindow'][_0x297efd(0x1d0)](),this['openSaveConfirmationWindow'](!![]);},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x1a1)]=Scene_Save[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1bd)],Scene_Save[_0x4c1dc3(0xb1)]['onSaveFailure']=function(){const _0x51f032=_0x4c1dc3;SoundManager[_0x51f032(0x10d)](),VisuMZ[_0x51f032(0x246)][_0x51f032(0x139)][_0x51f032(0x226)]['OnSaveFailureJS'][_0x51f032(0x24e)](this),this[_0x51f032(0x1aa)](![]);},Scene_Save[_0x4c1dc3(0xb1)]['closeSaveConfirmationWindow']=function(_0x14ac28){const _0x3a6ae8=_0x4c1dc3;Scene_File[_0x3a6ae8(0xb1)]['closeSaveConfirmationWindow'][_0x3a6ae8(0x24e)](this,_0x14ac28),_0x14ac28?this[_0x3a6ae8(0xbf)]():this[_0x3a6ae8(0xbf)]();},Scene_Save[_0x4c1dc3(0xb1)][_0x4c1dc3(0x20b)]=function(){const _0x1d4950=_0x4c1dc3;$gameTemp['_pickLockedSaveSlot']=![],Scene_File['prototype'][_0x1d4950(0x20b)][_0x1d4950(0x24e)](this);},VisuMZ[_0x4c1dc3(0x246)]['Scene_Save_helpWindowText']=Scene_Save['prototype']['helpWindowText'],Scene_Save[_0x4c1dc3(0xb1)][_0x4c1dc3(0x220)]=function(){const _0x1a5f37=_0x4c1dc3;return $gameTemp['_pickLockedSaveSlot']?'DZdsY'!==_0x1a5f37(0x223)?TextManager[_0x1a5f37(0xc4)]:'':VisuMZ[_0x1a5f37(0x246)][_0x1a5f37(0x1a7)][_0x1a5f37(0x24e)](this);},VisuMZ[_0x4c1dc3(0x246)]['Scene_Save_executeSave']=Scene_Save[_0x4c1dc3(0xb1)][_0x4c1dc3(0x13d)],Scene_Save['prototype'][_0x4c1dc3(0x13d)]=function(_0x54b382){const _0xa5486f=_0x4c1dc3;$gameTemp['_pickLockedSaveSlot']?this[_0xa5486f(0xa7)](_0x54b382):VisuMZ['SaveCore'][_0xa5486f(0x135)]['call'](this,_0x54b382);},Scene_Save['prototype'][_0x4c1dc3(0xa7)]=function(_0x2ee94e){const _0x1edf66=_0x4c1dc3;$gameTemp['_pickLockedSaveSlot']=![],SoundManager[_0x1edf66(0x23a)](),$gameSystem['setSavefileId'](_0x2ee94e),this[_0x1edf66(0xd5)](),SceneManager[_0x1edf66(0x181)](Scene_Map);},VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x173)]=Scene_Load[_0x4c1dc3(0xb1)][_0x4c1dc3(0x176)],Scene_Load[_0x4c1dc3(0xb1)][_0x4c1dc3(0x176)]=function(){const _0x141acc=_0x4c1dc3;VisuMZ[_0x141acc(0x246)][_0x141acc(0x173)][_0x141acc(0x24e)](this),VisuMZ['SaveCore'][_0x141acc(0x139)]['Save']['OnLoadSuccessJS']['call'](this),setTimeout(VisuMZ[_0x141acc(0x246)][_0x141acc(0x243)]['bind'](this),0x3e8);},Scene_Load[_0x4c1dc3(0xb1)][_0x4c1dc3(0x130)]=function(){const _0x15c3a1=_0x4c1dc3;SoundManager[_0x15c3a1(0x10d)](),VisuMZ[_0x15c3a1(0x246)][_0x15c3a1(0x139)][_0x15c3a1(0x226)][_0x15c3a1(0x238)][_0x15c3a1(0x24e)](this),this[_0x15c3a1(0x1d6)]();},Scene_Load[_0x4c1dc3(0xb1)]['closeSaveConfirmationWindow']=function(_0x4b5ae3){const _0x331f3a=_0x4c1dc3;Scene_File[_0x331f3a(0xb1)][_0x331f3a(0x24a)]['call'](this,_0x4b5ae3),this[_0x331f3a(0xbf)]();},VisuMZ['SaveCore'][_0x4c1dc3(0x243)]=function(){const _0x4598a2=_0x4c1dc3;$gameSystem[_0x4598a2(0x1d8)]=undefined;},ImageManager[_0x4c1dc3(0x161)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x4c1dc3(0x169)]=ImageManager[_0x4c1dc3(0x169)]||0x6;!Imported[_0x4c1dc3(0x215)]&&(Window_Base[_0x4c1dc3(0xb1)][_0x4c1dc3(0xf7)]=function(_0x25ec06,_0x22dbca,_0x27d5a4){const _0x9ca530=_0x4c1dc3,_0x22a57d=_0x25ec06[_0x9ca530(0x193)](/\$/i),_0x3c39c8=ImageManager['loadSvActor'](_0x25ec06),_0x2ac495=_0x3c39c8[_0x9ca530(0x211)]/(_0x22a57d?0x1:ImageManager[_0x9ca530(0x161)]),_0x41fbbb=_0x3c39c8[_0x9ca530(0x192)]/(_0x22a57d?0x1:ImageManager[_0x9ca530(0x169)]),_0x45c36=0x0,_0x4b6a5c=0x0;this[_0x9ca530(0xbc)][_0x9ca530(0x21c)](_0x3c39c8,_0x45c36,_0x4b6a5c,_0x2ac495,_0x41fbbb,_0x22dbca-_0x2ac495/0x2,_0x27d5a4-_0x41fbbb);});;VisuMZ['SaveCore']['Window_Options_addGeneralOptions']=Window_Options[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1ad)],Window_Options[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1ad)]=function(){const _0x17760b=_0x4c1dc3;VisuMZ[_0x17760b(0x246)][_0x17760b(0xc8)][_0x17760b(0x24e)](this),this[_0x17760b(0xea)]();},Window_Options[_0x4c1dc3(0xb1)]['addSaveCoreCommands']=function(){const _0x432809=_0x4c1dc3;VisuMZ[_0x432809(0x246)]['Settings'][_0x432809(0x172)][_0x432809(0x158)]&&this[_0x432809(0x209)]();},Window_Options[_0x4c1dc3(0xb1)]['addSaveCoreAutosaveCommand']=function(){const _0x56b2ff=_0x4c1dc3,_0x30f015=TextManager[_0x56b2ff(0x20d)],_0x69719b=_0x56b2ff(0x1f3);this['addCommand'](_0x30f015,_0x69719b);};function Window_AutosaveConfirm(){const _0x4ab4a7=_0x4c1dc3;this[_0x4ab4a7(0x1cc)](...arguments);}Window_AutosaveConfirm[_0x4c1dc3(0xb1)]=Object[_0x4c1dc3(0x170)](Window_Base[_0x4c1dc3(0xb1)]),Window_AutosaveConfirm['prototype'][_0x4c1dc3(0xed)]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x4c1dc3(0xb1)]['initialize']=function(_0x1701c2){const _0xd3ec21=_0x4c1dc3;this[_0xd3ec21(0x164)]=0x0,Window_Base['prototype'][_0xd3ec21(0x1cc)][_0xd3ec21(0x24e)](this,_0x1701c2),this['opacity']=0x0,this[_0xd3ec21(0xe5)]=0x0;},Window_AutosaveConfirm[_0x4c1dc3(0xb1)][_0x4c1dc3(0xd8)]=function(){const _0x1092ef=_0x4c1dc3,_0xc0c54a=0x0,_0x57d036=0x0,_0x3b2263=this['innerWidth'],_0x54c522=this['innerHeight'],_0x534889=ColorManager[_0x1092ef(0x1a5)](),_0x1603d6=ColorManager[_0x1092ef(0x131)](),_0x1dc742=_0x3b2263/0x2;this['contents'][_0x1092ef(0x18d)](_0xc0c54a,_0x57d036,_0x1dc742,_0x54c522,_0x1603d6,_0x534889),this['contents'][_0x1092ef(0x18d)](_0xc0c54a+_0x1dc742,_0x57d036,_0x1dc742,_0x54c522,_0x534889,_0x1603d6);},Window_AutosaveConfirm[_0x4c1dc3(0xb1)]['setSetSuccess']=function(_0x365cbd){const _0x418052=_0x4c1dc3;this[_0x418052(0x22b)]=_0x365cbd,this['refresh']();},Window_AutosaveConfirm['prototype'][_0x4c1dc3(0x1d0)]=function(){const _0x460894=_0x4c1dc3;this[_0x460894(0xbc)][_0x460894(0x203)]();const _0x1a96ac=this['_success']?TextManager[_0x460894(0xc9)]:TextManager[_0x460894(0x17b)],_0x39d62e=Math[_0x460894(0x1ab)](this[_0x460894(0x126)](_0x1a96ac)['width']);this[_0x460894(0x211)]=_0x39d62e+($gameSystem[_0x460894(0xd0)]()+this[_0x460894(0x14e)]())*0x2,this[_0x460894(0x159)](),this[_0x460894(0x221)]();const _0x3d098f=Math[_0x460894(0x19b)]((this[_0x460894(0x1b0)]-_0x39d62e)/0x2);this[_0x460894(0xd8)](),this[_0x460894(0x1a2)](_0x1a96ac,_0x3d098f,0x0,_0x39d62e);},Window_AutosaveConfirm[_0x4c1dc3(0xb1)][_0x4c1dc3(0xce)]=function(){const _0x137f4a=_0x4c1dc3;return VisuMZ[_0x137f4a(0x246)]['Settings'][_0x137f4a(0x242)][_0x137f4a(0x112)];},Window_AutosaveConfirm[_0x4c1dc3(0xb1)]['updatePosition']=function(){const _0x36297a=_0x4c1dc3,_0x33e818=this['getScreenPosition']();if(_0x33e818[_0x36297a(0x193)](/upper/i))this['y']=-0x1*$gameSystem['windowPadding']();else _0x33e818[_0x36297a(0x193)](/lower/i)?'aJOgB'===_0x36297a(0x11d)?(_0xd0af7c[_0x36297a(0x189)]=![],_0x384c4d[_0x36297a(0x23a)](),_0x54b71e['setSavefileId'](_0x53a216),this[_0x36297a(0xd5)](),_0x1eca74[_0x36297a(0x181)](_0x4e3b7e)):this['y']=Graphics[_0x36297a(0x192)]-this[_0x36297a(0x192)]+$gameSystem[_0x36297a(0xd0)]():this['y']=(Graphics['height']-this[_0x36297a(0x192)])/0x2;if(_0x33e818[_0x36297a(0x193)](/left/i)){if(_0x36297a(0x202)===_0x36297a(0x202))this['x']=-0x1*$gameSystem['windowPadding']();else{const _0x12a75b=_0x36297a(0x155);this[_0x36297a(0xef)]=this['_colorCache']||{};if(this[_0x36297a(0xef)][_0x12a75b])return this[_0x36297a(0xef)][_0x12a75b];const _0x9f8ca0=_0x2de569[_0x36297a(0x246)][_0x36297a(0x139)][_0x36297a(0x1e8)][_0x36297a(0x1dc)];return this['getColorDataFromPluginParameters'](_0x12a75b,_0x9f8ca0);}}else{if(_0x33e818[_0x36297a(0x193)](/right/i))this['x']=Graphics[_0x36297a(0x211)]-this[_0x36297a(0x211)]+$gameSystem[_0x36297a(0xd0)]();else{if(_0x36297a(0x208)===_0x36297a(0x1ba)){const _0x3247f5=0x0,_0x15948f=0x0,_0x27040d=this[_0x36297a(0x1b0)],_0xd03330=this[_0x36297a(0x1b1)],_0x304435=_0x481bed[_0x36297a(0x1a5)](),_0x10d571=_0x84e13f[_0x36297a(0x131)](),_0x20c7fb=_0x27040d/0x2;this['contents']['gradientFillRect'](_0x3247f5,_0x15948f,_0x20c7fb,_0xd03330,_0x10d571,_0x304435),this[_0x36297a(0xbc)][_0x36297a(0x18d)](_0x3247f5+_0x20c7fb,_0x15948f,_0x20c7fb,_0xd03330,_0x304435,_0x10d571);}else this['x']=(Graphics[_0x36297a(0x211)]-this[_0x36297a(0x211)])/0x2;}}this['x']=Math['round'](this['x']),this['y']=Math[_0x36297a(0xcf)](this['y']);},Window_AutosaveConfirm[_0x4c1dc3(0xb1)][_0x4c1dc3(0xe0)]=function(){const _0x2d83c2=_0x4c1dc3;Window_Base[_0x2d83c2(0xb1)]['update'][_0x2d83c2(0x24e)](this);if(this[_0x2d83c2(0x164)]!==0x0)this[_0x2d83c2(0x1f6)]();},Window_AutosaveConfirm[_0x4c1dc3(0xb1)]['updateFade']=function(){const _0x5707c2=_0x4c1dc3;this[_0x5707c2(0xe5)]+=this['_fadeSpeed'];if(this[_0x5707c2(0xe5)]>=0xff||this[_0x5707c2(0xe5)]<=0x0)this[_0x5707c2(0xcd)](0x0);},Window_AutosaveConfirm[_0x4c1dc3(0xb1)]['setFadeSpeed']=function(_0x48806e){this['_fadeSpeed']=_0x48806e;},Window_AutosaveConfirm[_0x4c1dc3(0xb1)][_0x4c1dc3(0x16f)]=function(){const _0xf3c720=_0x4c1dc3;this[_0xf3c720(0xcd)](0x10);},Window_AutosaveConfirm[_0x4c1dc3(0xb1)]['fadeOut']=function(){const _0x211cbf=_0x4c1dc3;this[_0x211cbf(0xcd)](-0x10);},VisuMZ['SaveCore']['Window_SavefileList_setMode']=Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x198)],Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x198)]=function(_0x3fff4a,_0x3d8984){const _0x510a7f=_0x4c1dc3;if(StorageManager[_0x510a7f(0x1af)]()===_0x510a7f(0x244))_0x3d8984=![];if($gameTemp['_pickLockedSaveSlot'])_0x3d8984=![];VisuMZ['SaveCore']['Window_SavefileList_setMode'][_0x510a7f(0x24e)](this,_0x3fff4a,_0x3d8984);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x12d)]=function(){const _0x3462e1=_0x4c1dc3,_0x4f8182=VisuMZ[_0x3462e1(0x246)][_0x3462e1(0x139)][_0x3462e1(0x1e8)],_0x5dbd1f=this[_0x3462e1(0x249)]();switch(_0x5dbd1f){case _0x3462e1(0x1a6):return _0x4f8182[_0x3462e1(0x145)];break;case _0x3462e1(0x137):return _0x4f8182[_0x3462e1(0x107)];break;case _0x3462e1(0x1df):return _0x4f8182[_0x3462e1(0x178)];break;default:return _0x4f8182[_0x3462e1(0xb6)];break;}},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x10a)]=function(){const _0x4f4fd8=_0x4c1dc3,_0x3ac43f=VisuMZ[_0x4f4fd8(0x246)][_0x4f4fd8(0x139)]['SaveMenu'],_0x15dd30=this[_0x4f4fd8(0x249)]();switch(_0x15dd30){case _0x4f4fd8(0x1a6):return _0x3ac43f['VertCols'];break;case'box':return _0x3ac43f['BoxCols'];break;case'large':return _0x3ac43f['LargeCols'];break;default:return _0x3ac43f['ListCols'];break;}},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x24c)]=function(){const _0x23ee23=_0x4c1dc3;Imported[_0x23ee23(0x219)]&&Window_Selectable[_0x23ee23(0xb1)][_0x23ee23(0x24c)][_0x23ee23(0x24e)](this);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x10c)]=function(_0x1c2428){const _0x1484c8=_0x4c1dc3;return Imported[_0x1484c8(0x219)]?Window_Selectable[_0x1484c8(0xb1)][_0x1484c8(0x10c)]['call'](this,_0x1c2428):'';},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x16d)]=function(){const _0x5acc06=_0x4c1dc3;return VisuMZ[_0x5acc06(0x246)][_0x5acc06(0x139)][_0x5acc06(0x168)];},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x249)]=function(){const _0x3393de=_0x4c1dc3;return VisuMZ[_0x3393de(0x246)][_0x3393de(0x139)][_0x3393de(0x247)];},Window_SavefileList['prototype'][_0x4c1dc3(0x255)]=function(_0xebf619){const _0x193dfe=_0x4c1dc3,_0x174bcc=Math[_0x193dfe(0xbd)](0x0,this['savefileIdToIndex'](_0xebf619));this[_0x193dfe(0xde)](_0x174bcc);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1e5)]=function(_0x1d33ef){const _0x2006b0=_0x4c1dc3,_0x2d1bf2=this['indexToSavefileId'](_0x1d33ef),_0x35638a=DataManager['savefileInfo'](_0x2d1bf2);if(_0x35638a)_0x35638a[_0x2006b0(0xe7)]=_0x2d1bf2;this[_0x2006b0(0xdf)]=_0x2d1bf2;const _0x375a56=this[_0x2006b0(0x1d3)](_0x1d33ef);this[_0x2006b0(0x1ca)](),this[_0x2006b0(0xc1)](this['isEnabled'](_0x2d1bf2)),this['drawContents'](_0x35638a,_0x375a56);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x174)]=function(_0x215894,_0x57ff14,_0x3dcf02){const _0x3df36c=_0x4c1dc3;_0x215894===0x0?this['drawText'](TextManager[_0x3df36c(0x1f3)],_0x57ff14,_0x3dcf02,0xb4):_0x3df36c(0x1c2)!==_0x3df36c(0x196)?this[_0x3df36c(0x12e)](TextManager['file']+'\x20'+_0x215894,_0x57ff14,_0x3dcf02,0xb4):(_0x1829dd['playBuzzer'](),_0x6265ae[_0x3df36c(0x246)][_0x3df36c(0x139)][_0x3df36c(0x226)][_0x3df36c(0x238)][_0x3df36c(0x24e)](this),this[_0x3df36c(0x1d6)]());},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x104)]=function(_0x57c678,_0x1117d5,_0x29dafc){const _0x531aaf=_0x4c1dc3;if(_0x57c678===0x0||DataManager[_0x531aaf(0x188)]()!==_0x57c678)return;const _0x114add=TextManager[_0x531aaf(0xd3)];this[_0x531aaf(0x1a3)](ColorManager['latestSavefile']()),this[_0x531aaf(0x12e)](_0x114add,_0x1117d5,_0x29dafc,0xb4);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x180)]=function(_0x23e786,_0x41359f,_0x3b1849,_0x587d8e,_0x11733e){const _0xc229=_0x4c1dc3;if(!_0x23e786['characters'])return;const _0x3db41c=this['actorStyle']();switch(_0x3db41c){case'face':this[_0xc229(0x1c9)](_0x23e786,_0x41359f,_0x3b1849,_0x587d8e,_0x11733e);break;case _0xc229(0xad):this[_0xc229(0x142)](_0x23e786,_0x41359f,_0x3b1849,_0x587d8e,_0x11733e);break;case _0xc229(0xa9):this[_0xc229(0xbe)](_0x23e786,_0x41359f,_0x3b1849,_0x587d8e,_0x11733e);break;default:break;}},Window_SavefileList['prototype'][_0x4c1dc3(0x1c9)]=function(_0x58fb86,_0xbf7903,_0x3f745d,_0x4cbca6,_0x280544){const _0x5b3e04=_0x4c1dc3;let _0x2c2ed9=Math[_0x5b3e04(0xbd)](_0x58fb86[_0x5b3e04(0xf2)]['length'],Scene_File[_0x5b3e04(0x1c3)]);const _0x1fa49c=Math[_0x5b3e04(0x165)](ImageManager[_0x5b3e04(0x197)],Math['floor'](_0x4cbca6/_0x2c2ed9));_0xbf7903=_0xbf7903+Math[_0x5b3e04(0xcf)]((_0x4cbca6-_0x2c2ed9*_0x1fa49c)/0x2);for(const _0x372d4b of _0x58fb86[_0x5b3e04(0xf2)]){this[_0x5b3e04(0x109)](_0x372d4b[0x0],_0x372d4b[0x1],_0xbf7903,_0x3f745d+0x1,_0x1fa49c,_0x280544-0x2),_0xbf7903+=_0x1fa49c;}},ImageManager[_0x4c1dc3(0x241)]=VisuMZ[_0x4c1dc3(0x246)][_0x4c1dc3(0x139)][_0x4c1dc3(0x1e8)][_0x4c1dc3(0x111)],ImageManager[_0x4c1dc3(0x15d)]=VisuMZ[_0x4c1dc3(0x246)]['Settings'][_0x4c1dc3(0x1e8)][_0x4c1dc3(0x228)],Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x142)]=function(_0xa286ea,_0x381007,_0x3f46ad,_0x17b993,_0x2a61f2){const _0x5b5356=_0x4c1dc3;let _0x1cefa8=Math[_0x5b5356(0xbd)](_0xa286ea['characters']['length'],Scene_File[_0x5b5356(0x1c3)]);const _0x54f857=ImageManager[_0x5b5356(0x241)];_0x381007=_0x381007+Math['round']((_0x17b993-_0x1cefa8*_0x54f857)/0x2)+_0x54f857/0x2,_0x3f46ad=_0x3f46ad+_0x2a61f2-0x8;for(const _0x10fd5f of _0xa286ea[_0x5b5356(0x245)]){this[_0x5b5356(0xe3)](_0x10fd5f[0x0],_0x10fd5f[0x1],_0x381007,_0x3f46ad),_0x381007+=_0x54f857;}},Window_SavefileList['prototype'][_0x4c1dc3(0xbe)]=function(_0x4c6ed5,_0x3e94fe,_0x5a9e2a,_0x5f1f70,_0x2fc35f){const _0x2b3639=_0x4c1dc3;if(!_0x4c6ed5[_0x2b3639(0x23f)])return this[_0x2b3639(0x142)](_0x4c6ed5,_0x3e94fe,_0x5a9e2a,_0x5f1f70,_0x2fc35f);let _0x31a106=Math[_0x2b3639(0xbd)](_0x4c6ed5['svbattlers']['length'],Scene_File['MAX_BATTLE_MEMBERS']);const _0x21e4cd=ImageManager[_0x2b3639(0x15d)];_0x3e94fe=_0x3e94fe+Math[_0x2b3639(0xcf)]((_0x5f1f70-_0x31a106*_0x21e4cd)/0x2)+_0x21e4cd/0x2,_0x5a9e2a=_0x5a9e2a+_0x2fc35f-0x8;for(const _0x252ecb of _0x4c6ed5[_0x2b3639(0x23f)]){this[_0x2b3639(0xf7)](_0x252ecb,_0x3e94fe,_0x5a9e2a),_0x3e94fe+=_0x21e4cd;}},Window_SavefileList[_0x4c1dc3(0xb1)]['drawPicture']=function(_0x34fb26,_0x3b3d71,_0x5dcef8,_0x4bab1e,_0x5e04f7,_0x2b6378){const _0x2feed8=_0x4c1dc3;if(_0x34fb26==='')return;_0x3b3d71+=0x2,_0x5dcef8+=0x2,_0x4bab1e-=0x4,_0x5e04f7-=0x4;const _0x9ec6a0=ImageManager['loadPicture'](_0x34fb26),_0x3ccb1e=_0x9ec6a0[_0x2feed8(0x211)],_0x2f4452=_0x9ec6a0[_0x2feed8(0x192)],_0x3e2356=Math[_0x2feed8(0x165)](_0x4bab1e/_0x3ccb1e,_0x5e04f7/_0x2f4452,_0x2b6378?0x1:0x3e8),_0x37474a=Math[_0x2feed8(0x1ab)](_0x9ec6a0[_0x2feed8(0x211)]*_0x3e2356),_0x1fb0b0=Math[_0x2feed8(0x1ab)](_0x9ec6a0['height']*_0x3e2356);this[_0x2feed8(0xf6)][_0x2feed8(0x21c)](_0x9ec6a0,0x0,0x0,_0x3ccb1e,_0x2f4452,_0x3b3d71,_0x5dcef8,_0x37474a,_0x1fb0b0);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1f1)]=function(_0x3b1036,_0x1a35cc,_0x4413e2,_0x4c2ddb,_0x45ba9b,_0x3e270d){const _0x2f807a=_0x4c1dc3;if(_0x3b1036==='')return;_0x1a35cc+=0x2,_0x4413e2+=0x2,_0x4c2ddb-=0x4,_0x45ba9b-=0x4;const _0x21c32a=ImageManager['loadPicture'](_0x3b1036),_0x414f14=_0x21c32a[_0x2f807a(0x211)],_0x2fdbfd=_0x21c32a[_0x2f807a(0x192)],_0x1741ae=Math[_0x2f807a(0x165)](_0x4c2ddb/_0x414f14,_0x45ba9b/_0x2fdbfd,_0x3e270d?0x1:0x3e8),_0x5bfb7b=Math[_0x2f807a(0x1ab)](_0x21c32a[_0x2f807a(0x211)]*_0x1741ae),_0x3d4f6d=Math['ceil'](_0x21c32a[_0x2f807a(0x192)]*_0x1741ae);_0x1a35cc+=(_0x4c2ddb-_0x5bfb7b)/0x2,_0x4413e2+=(_0x45ba9b-_0x3d4f6d)/0x2,this[_0x2f807a(0xf6)][_0x2f807a(0x21c)](_0x21c32a,0x0,0x0,_0x414f14,_0x2fdbfd,_0x1a35cc,_0x4413e2,_0x5bfb7b,_0x3d4f6d);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x239)]=function(_0x25a61d,_0x12931f,_0x2b791a,_0x156e7b,_0x5eb964){const _0x1e03bc=_0x4c1dc3;_0x25a61d['playtime']&&(_0x5eb964=_0x5eb964||_0x1e03bc(0x225),this[_0x1e03bc(0x12e)](_0x25a61d[_0x1e03bc(0xd6)],_0x12931f,_0x2b791a,_0x156e7b,_0x5eb964));},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1f7)]=function(_0x67c42b,_0xa4bb82,_0x598c1f,_0x1f96ee,_0x5d5020){const _0x5836df=_0x4c1dc3;if(_0x67c42b['timestamp']){if(_0x5836df(0x20e)==='OWLEm')_0x62b0ff===0x0?this['drawText'](_0x2a43f4[_0x5836df(0x1f3)],_0x31a092,_0x500ae7,0xb4):this[_0x5836df(0x12e)](_0x5c3a79[_0x5836df(0x119)]+'\x20'+_0x1e248b,_0x1d4b60,_0x11c55d,0xb4);else{_0x5d5020=_0x5d5020||_0x5836df(0x225);let _0x167f8b=this['getTimestamp'](_0x67c42b);Imported[_0x5836df(0x195)]&&this['useDigitGrouping']()&&(_0x167f8b=_0x5836df(0xe1)[_0x5836df(0x129)](_0x167f8b)),this[_0x5836df(0x12e)](_0x167f8b,_0xa4bb82,_0x598c1f,_0x1f96ee,_0x5d5020);}}},Window_SavefileList['prototype']['getTimestamp']=function(_0x36a628){const _0x340131=_0x4c1dc3,_0x434c8e=_0x36a628[_0x340131(0x133)],_0x2eb76b=new Date(_0x434c8e);let _0x348a47=_0x340131(0x141);_0x348a47=_0x348a47[_0x340131(0x11c)](/\[YEAR\]/gi,'%1'),_0x348a47=_0x348a47[_0x340131(0x11c)](/\[MONTH\]/gi,'%2'),_0x348a47=_0x348a47[_0x340131(0x11c)](/\[DATE\]/gi,'%3'),_0x348a47=_0x348a47['replace'](/\[HOUR\]/gi,'%4'),_0x348a47=_0x348a47[_0x340131(0x11c)](/\[MINUTE\]/gi,'%5'),_0x348a47=_0x348a47[_0x340131(0x11c)](/\[SECOND\]/gi,'%6');let _0xd3e181=String(_0x2eb76b[_0x340131(0x227)]())['split']('')[_0x340131(0x16e)]('​'),_0x29fc82=String(_0x2eb76b[_0x340131(0xf9)]()+0x1),_0x16fb5f=String(_0x2eb76b[_0x340131(0x14b)]())['padStart'](0x2,'0'),_0x42e502=String(_0x2eb76b[_0x340131(0x1a4)]())[_0x340131(0x21f)](0x2,'0'),_0x221452=String(_0x2eb76b['getMinutes']())[_0x340131(0x21f)](0x2,'0'),_0x44cf89=String(_0x2eb76b[_0x340131(0x103)]())[_0x340131(0x21f)](0x2,'0'),_0x46ad73=_0x348a47[_0x340131(0x129)](_0xd3e181,_0x29fc82,_0x16fb5f,_0x42e502,_0x221452,_0x44cf89);return _0x46ad73;},Window_SavefileList['prototype']['drawCurrency']=function(_0x2fff07,_0x369a36,_0x5d4142,_0x3de8b2){const _0x1a6973=_0x4c1dc3;if(_0x2fff07[_0x1a6973(0x124)]===undefined)return;const _0x11c4fa=_0x2fff07[_0x1a6973(0x124)],_0x42ba9a=TextManager['currencyUnit'];Window_SavefileList[_0x1a6973(0xb1)][_0x1a6973(0x13c)]['call'](this,_0x11c4fa,_0x42ba9a,_0x369a36,_0x5d4142,_0x3de8b2);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x151)]=function(_0x38d09a,_0x57d784,_0x1e038a,_0x1804b7,_0x514525){const _0xb565c0=_0x4c1dc3;if(_0x38d09a[_0xb565c0(0x115)]){const _0x36f993=this['textSizeEx'](_0x38d09a[_0xb565c0(0x115)])[_0xb565c0(0x211)];_0x514525=_0x514525||_0xb565c0(0x225);if(_0x514525===_0xb565c0(0x1ed))_0x57d784=_0x57d784+_0x1804b7-_0x36f993;else _0x514525===_0xb565c0(0x22d)&&(_0xb565c0(0x136)!=='XTIPy'?_0x4048dc=_0x26a836[_0xb565c0(0x11c)](/\\N\[(\d+)\]/gi,(_0x3ae7f3,_0x26fe3b)=>_0x3f0906[_0xb565c0(0xb1)][_0xb565c0(0xc2)](_0x4633f9(_0x26fe3b))):_0x57d784=_0x57d784+(_0x1804b7-_0x36f993)/0x2);this[_0xb565c0(0x1a2)](_0x38d09a['description'],_0x57d784,_0x1e038a,_0x1804b7);}},Window_SavefileList['prototype'][_0x4c1dc3(0x18b)]=function(_0x365178,_0x5dfb45){const _0x4f574e=_0x4c1dc3;if(_0x365178){if('FjKfB'!==_0x4f574e(0x154)){const _0x40beb7=ImageManager['loadPicture'](_0x365178[_0x4f574e(0x22f)]||'');_0x40beb7[_0x4f574e(0x1e1)](this['drawContentsLoaded'][_0x4f574e(0x167)](this,_0x365178,_0x5dfb45));}else _0x407a1c[_0x4f574e(0xb1)][_0x4f574e(0xf7)]=function(_0x2b18ba,_0x38fcb8,_0x470c33){const _0x37aa55=_0x4f574e,_0x38d365=_0x2b18ba[_0x37aa55(0x193)](/\$/i),_0x307134=_0x2644c6['loadSvActor'](_0x2b18ba),_0x431c37=_0x307134[_0x37aa55(0x211)]/(_0x38d365?0x1:_0x152b68[_0x37aa55(0x161)]),_0x865de0=_0x307134[_0x37aa55(0x192)]/(_0x38d365?0x1:_0x5a492a[_0x37aa55(0x169)]),_0x2c9fba=0x0,_0x351262=0x0;this[_0x37aa55(0xbc)][_0x37aa55(0x21c)](_0x307134,_0x2c9fba,_0x351262,_0x431c37,_0x865de0,_0x38fcb8-_0x431c37/0x2,_0x470c33-_0x865de0);};}else{if(_0x4f574e(0x24d)===_0x4f574e(0x1d1))return _0x4a7731[_0x4f574e(0x246)][_0x4f574e(0x139)][_0x4f574e(0x1cf)][_0x4f574e(0xfe)][_0x4f574e(0x24e)](this);else this[_0x4f574e(0x233)](this['_savefileId'],_0x5dfb45);}},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x15c)]=function(_0x39b6ba,_0x5dd416){const _0x45cd9a=_0x4c1dc3,_0x2679e7=this[_0x45cd9a(0x249)]();switch(_0x2679e7){case _0x45cd9a(0x1a6):this[_0x45cd9a(0x194)](_0x39b6ba,_0x5dd416);break;case _0x45cd9a(0x137):this[_0x45cd9a(0x213)](_0x39b6ba,_0x5dd416);break;case'large':this['drawLargeStyleContents'](_0x39b6ba,_0x5dd416);break;default:this[_0x45cd9a(0x11f)](_0x39b6ba,_0x5dd416);break;}this[_0x45cd9a(0x1ca)]();const _0x45379b=_0x39b6ba[_0x45cd9a(0xe7)];this[_0x45cd9a(0x233)](_0x45379b,_0x5dd416);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x233)]=function(_0x42dd25,_0x3a5c9e){const _0xed59ad=_0x4c1dc3,_0xb21053=this[_0xed59ad(0x249)]();switch(_0xb21053){case _0xed59ad(0x1a6):this['drawVerticalStyleFileData'](_0x42dd25,_0x3a5c9e);break;case _0xed59ad(0x137):this[_0xed59ad(0x163)](_0x42dd25,_0x3a5c9e);break;case _0xed59ad(0x1df):this['drawLargeStyleFileData'](_0x42dd25,_0x3a5c9e);break;default:this['drawListStyleFileData'](_0x42dd25,_0x3a5c9e);break;}},Window_SavefileList['prototype'][_0x4c1dc3(0x11f)]=function(_0x32f02f,_0x359864){const _0x18b446=_0x4c1dc3;VisuMZ[_0x18b446(0x246)]['Settings']['SaveMenu']['ListContentsJS'][_0x18b446(0x24e)](this,_0x32f02f,_0x359864);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x194)]=function(_0x104fde,_0x287e8f){const _0x47788b=_0x4c1dc3;VisuMZ[_0x47788b(0x246)][_0x47788b(0x139)][_0x47788b(0x1e8)][_0x47788b(0x16b)][_0x47788b(0x24e)](this,_0x104fde,_0x287e8f);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x213)]=function(_0x4919d9,_0x5f6d77){const _0x4f2d39=_0x4c1dc3;VisuMZ[_0x4f2d39(0x246)]['Settings'][_0x4f2d39(0x1e8)]['BoxContentsJS'][_0x4f2d39(0x24e)](this,_0x4919d9,_0x5f6d77);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0x1c6)]=function(_0x26b0f2,_0x18f295){const _0x3f0fd9=_0x4c1dc3;VisuMZ[_0x3f0fd9(0x246)][_0x3f0fd9(0x139)]['SaveMenu'][_0x3f0fd9(0x18a)]['call'](this,_0x26b0f2,_0x18f295);},Window_SavefileList[_0x4c1dc3(0xb1)]['drawListStyleFileData']=function(_0x13b5ee,_0x1ff1c7){const _0x202010=_0x4c1dc3;VisuMZ[_0x202010(0x246)][_0x202010(0x139)][_0x202010(0x1e8)]['ListFileDataJS'][_0x202010(0x24e)](this,_0x13b5ee,_0x1ff1c7);},Window_SavefileList[_0x4c1dc3(0xb1)][_0x4c1dc3(0xeb)]=function(_0x315039,_0x58fa65){const _0x280bf7=_0x4c1dc3;VisuMZ[_0x280bf7(0x246)]['Settings']['SaveMenu'][_0x280bf7(0xb7)][_0x280bf7(0x24e)](this,_0x315039,_0x58fa65);},Window_SavefileList['prototype'][_0x4c1dc3(0x163)]=function(_0x37dcdb,_0x40170c){const _0x16432a=_0x4c1dc3;VisuMZ[_0x16432a(0x246)][_0x16432a(0x139)][_0x16432a(0x1e8)][_0x16432a(0x21e)]['call'](this,_0x37dcdb,_0x40170c);},Window_SavefileList[_0x4c1dc3(0xb1)]['drawLargeStyleFileData']=function(_0x440c73,_0x3acd7a){const _0x2c0496=_0x4c1dc3;VisuMZ['SaveCore'][_0x2c0496(0x139)]['SaveMenu'][_0x2c0496(0x18f)][_0x2c0496(0x24e)](this,_0x440c73,_0x3acd7a);};