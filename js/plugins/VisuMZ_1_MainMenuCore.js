//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.18] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
 * 
 * ---
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Actor ID:
 *   - Select which ID(s) to affect.
 *
 *   Filename:
 *   - Selected actor(s) will have their menu images changed to this.
 *
 * ---
 * 
 * === Menu Command Plugin Commands ===
 * 
 * ---
 * 
 * Menu Command: Clear Forced Settings
 * - Clear any forced settings for the menu command symbols.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Disable
 * - Forcefully disable specific menu commands via their symbols.
 * - Matching forced enabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Enable
 * - Forcefully enable specific menu commands via their symbols.
 * - Matching forced disabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Hide
 * - Forcefully hide specific menu commands via their symbols.
 * - Matching forced shown symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Show
 * - Forcefully show specific menu commands via their symbols.
 * - Matching forced hidden symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 *   - Only applies to the Command Window style: Default Vertical.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   Subcategory:
 *   - The subcategory used for this command.
 *   - Leave empty for no subcategory.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 * 
 * ==== Subcategories ====
 * 
 * Subcategories are a new addition to the Main Menu Core version 1.18. When a
 * subcategory is set, it will only display Command Window items that belong
 * to that subcategory. Those Command Window items do not appear when there is
 * no subcategory active or if it's a different subcategory.
 * 
 * ---
 * 
 * To create a subcategory, a few things must be done:
 * 
 * 1. The subcategory symbol must be "subcategory".
 * 
 * 2. The string returned by JS: Ext determines the subcategory. In the default
 *    Plugin Parameters, 'datalog' is returned as the subcategory. This becomes
 *    the subcategory when picked.
 * 
 * 3. For the JS: Run Code, have the following code somewhere in it:
 * 
 *    const ext = arguments[0];
 *    this.setSubcategory(ext);
 * 
 * ---
 * 
 * To make a Command Window item be a part of a subcategory do the following:
 * 
 * 1. Take the JS: Ext string value (case sensitive).
 * 
 * 2. Set it as the target Command Window item's "Subcategory" value.
 * 
 * 3. If the subcategory doesn't exist, then this Command Window item will
 *    appear normally.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.18: October 27, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added a new section into Plugin Parameters: Command Window List for
 *    "Subcategories" and adding info on how they are handled.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Tutorial List' command.
 * *** This is for the upcoming VisuMZ_2_TutorialPanelSys plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'tutorialList' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * ** Subcategory called "Datalog" is now added.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'subcategory' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Existing entries for Quest, Message Log, and Combat Log are now added
 *      to the Datalog subcategory.
 * * New Features!
 * ** Subcategory support is now added for the Main Menu Command Window.
 * *** Subcategories allow you to make some Command Window items invisible
 *     until a subcategory is selected. This helps reduce clutter and save room
 *     on the Command Window command list.
 * 
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Changed actor graphics now reflect properly for those using the default
 *    status menu. Fix made by Irina.
 * 
 * Version 1.16: April 21, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Menu Command: Clear Forced Settings
 * *** Menu Command: Force Disable
 * *** Menu Command: Force Enable
 * *** Menu Command: Force Hide
 * *** Menu Command: Force Show
 * **** These new Plugin Commands allow you to forcefully show, hide, enable,
 *      or disable Plugin Commands regardless of their required settings.
 * **** We are not responsible for errors that occur by accessing menus that
 *      should otherwise be disabled or hidden.
 * 
 * Version 1.15: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: October 25, 2021
 * * Bug Fixes!
 * ** Plugin Parameter settings for automatic Command Window height adjustment
 *    should now work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Added a note for the Help File: Gold Window > Thinner Gold Window
 * *** Only applies to the Command Window style: Default Vertical.
 * 
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Actor ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Actor ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MenuCommand
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandClear
 * @text Menu Command: Clear Forced Settings
 * @desc Clear any forced settings for the menu command symbols.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceDisable
 * @text Menu Command: Force Disable
 * @desc Forcefully disable specific menu commands via their symbols.
 * Matching forced enabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceEnable
 * @text Menu Command: Force Enable
 * @desc Forcefully enable specific menu commands via their symbols.
 * Matching forced disabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceHide
 * @text Menu Command: Force Hide
 * @desc Forcefully hide specific menu commands via their symbols.
 * Matching forced shown symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceShow
 * @text Menu Command: Force Show
 * @desc Forcefully show specific menu commands via their symbols.
 * Matching forced hidden symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments[1]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments[0];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Subcategory:str
 * @text Subcategory
 * @desc The subcategory used for this command.
 * Leave empty for no subcategory.
 * @default 
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x10bfc3=_0x20b2;(function(_0x1c9c4b,_0x20d258){const _0x1b0ec9=_0x20b2,_0x5ca313=_0x1c9c4b();while(!![]){try{const _0x1490e0=parseInt(_0x1b0ec9(0x2cf))/0x1+parseInt(_0x1b0ec9(0x244))/0x2+-parseInt(_0x1b0ec9(0x252))/0x3*(-parseInt(_0x1b0ec9(0x1eb))/0x4)+parseInt(_0x1b0ec9(0x240))/0x5+-parseInt(_0x1b0ec9(0x2e2))/0x6*(parseInt(_0x1b0ec9(0x21f))/0x7)+-parseInt(_0x1b0ec9(0x1af))/0x8*(-parseInt(_0x1b0ec9(0x2a5))/0x9)+parseInt(_0x1b0ec9(0x2ef))/0xa*(-parseInt(_0x1b0ec9(0x2db))/0xb);if(_0x1490e0===_0x20d258)break;else _0x5ca313['push'](_0x5ca313['shift']());}catch(_0xb44495){_0x5ca313['push'](_0x5ca313['shift']());}}}(_0x1460,0x8d4ce));function _0x1460(){const _0x5efb33=['ChangeActorMenuImageJS','btxXC','SoloStyle','_targetX','drawItemStatusSoloStyleOnLoad','isMainMenuCommandVisible','Step1End','adjustCommandHeightByVariable','commandCommonEvent','addSaveCommand','AdjustCommandHeight','normalColor','text','PortraitStyle','bottom','drawItemStatusDefaultStyle','FJqvO','fBjcy','characterName','ListStyles','forceDisable','Scene_Menu_goldWindowRect','drawItem','commandNameWindowDrawText','Scene_Menu_createStatusWindow','Window_MenuStatus_maxItems','forceShowMainMenuCommand','index','createGoldWindow','addMainCommands','svActorVertCells','commandPersonal','Game_System_initialize','Scene_Menu_create','isIncludedInSubcategory','playtimeWindowRectTopStyle','characterIndex','faceWidth','_targetY','isArray','changeTextColor','addOriginalCommands','HideMainMenuOnly','toUpperCase','getMenuImage','7TsvrFX','XRnnw','Rows','VisuMZ_0_CoreEngine','commandNameWindowCenter','map','systemColor','EVAL','adjustDefaultCommandWindowRect','AutoGoldY','commandWindowRectThinBottomStyle','updatePosition','makeCommandList','commandWindowRectMobileStyle','currentSymbol','createPlaytimeWindow','initMainMenuCore','setTopRow','LPHmP','isBattleMember','cLgqj','Game_Actor_setup','VgXll','none','currentSubcategory','LfyaA','Subcategory','ExtJS','drawSvActor','fill','statusWindowRect','jycNl','_commandWindow','442655LvdCzp','SUBCATEGORY_LIST','TextJS','height','333882sbpEvs','Scene_Menu_onPersonalCancel','resetFontSettings','drawAllItems','mVjoW','Icon','item','setTargetActor','drawItemActorSvBattler','isCommandEnabled','_mainMenuCore','StatusListStyle','setup','trim','3AANHhN','loadCharacter','MenuCommandForceEnable','DrPuV','Step1','adjustStatusWindowMobile','WCKUw','battleMembers','forceEnableMainMenuCommand','setSubcategory','VarList','_playtimeText','right','popScene','MenuCommandForceHide','_actor','isDisplayActorMenuBackgroundImage','NWWCz','loadFaceImages','onPersonalCancel','Window_MenuStatus_itemHeight','canCreateVariableWindow','updateOpacity','Scene_Menu_commandPersonal','Step2','top','includes','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ceil','EetLm','commandWindowRectThinTopStyle','innerHeight','Symbols','variableWindowRect','CallHandlerJS','_scene','push','hgOws','_statusWindow','fontSize','addLoadListener','auto','Window_MenuStatus_selectLast','ARRAYSTRUCT','ActorBgMenuJS','Scene_Menu_commandFormation','prototype','Playtime','CoreEngine','\x5cI[%1]%2','IYgWY','innerWidth','vtZlR','ThickerStyle','commandStyle','opacity','ShowReserve','variables','isSoloQuickMode','STRUCT','thin','icon','StatusGraphic','drawItemStatusPortraitStyle','ARRAYJSON','jDaGy','shift','graphicType','INfRT','replace','commandWindowStyle','VerticalStyle','ChangeActorMenuImageGroup','MenuCommandForceShow','commandFormation','createVariableWindow','AKVBX','statusWindowRectTopStyle','openness','forceDisableMainMenuCommand','commandName','ShowJS','calcWindowHeight','99uhArGo','addGameEndCommand','CommandList','mainAreaHeight','version','commandStyleCheck','listStyle','CommandWindowStyle','portrait','wJDBi','clear','updateTimer','members','gameEnd','maxVisibleItems','left','default','clearShowMainMenuCommand','commandWindowRectBottomStyle','Scene_Menu_commandWindowRect','HnAQd','thinTop','loadSvActor','round','sLoGh','thinBottom','length','ThinStyle','MhCuC','callUpdateHelp','InnerMenuListStyle','commandLoad','drawItemBackground','statusWindowRectMobileStyle','itemLineRect','_commandNameWindow','drawPendingItemBackground','bind','UHNbI','StatusSelectLast','faceHeight','setActor','722856tSBWtI','drawText','maxBattleMembers','makeMainMenuCoreCommandList','_data','thinGoldWindow','STR','parse','_scrollDuration','_menuImage','center','drawItemStyleIcon','657151mKuNDc','refresh','mCtAT','mobile','Style','TenfG','addSymbolBridge','947706AHElnU','create','addOptionsCommand','commandWindowRect','svbattler','General','OmJAl','doesSubcategoryExist','GwgUM','initMenuImage','_dummyWindow','ActorBgMenus','registerCommand','230KUBhJU','MUnej','drawItemActorSprite','vxHLB','colSpacing','playtimeWindowRect','Enable','commandNameWindowDrawBackground','Time','CjPGR','WindowRect','textSizeEx','ARRAYEVAL','TOEbf','addChild','statusWindowRectBottomStyle','solo','Scene_Menu_statusWindowRect','drawIcon','goldWindowRectTopStyle','CustomCmdWin','onPersonalOk','GyHHP','Untitled','drawItemStatusThinStyle','HBlef','ChangeActorMenuImageRange','Variable','boxWidth','LmHfs','gZyTq','drawTimeLabel','commandCancel','fittingHeight','contents','status','subcategory','updateActor','parameters','FontSize','drawActorGraphic','sprite','_variableWindow','updateSmoothScroll','updateDuration','battlerName','mainAreaBottom','drawTextEx','goldWindowRect','value','ConvertParams','TextAlign','forceEnable','createCommandNameWindow','forceShow','playtimeText','cpyup','Symbol','WBHQD','Settings','YVJft','mainCommandWidth','AyKyk','activate','isExpGaugeDrawn','NUM','drawItemStatusPortraitStyleOnLoad','mainMenuCoreSettings','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','blt','commandWindowRectTopStyle','vertical','createActorMenuBackgroundImageSprite','mainAreaTop','FUNC','currentExt','setBackgroundType','drawActorFace','playtimeWindowRectBottomStyle','iconText','Window_MenuStatus_drawItemImage','drawItemStyleIconText','QOhuZ','smoothSelect','MenuCommandClear','boxHeight','maxItems','drawPlaytime','width','BgType','setHandler','tFlsg','uaviT','gOlYL','variableWindowRectBottomStyle','setMenuImage','itemHeight','adjustCommandHeightByPlaytime','AutoGoldHeight','selectLast','isBigCharacter','thicker','onFormationCancel','addFormationCommand','_actorMenuBgSprite','_playtimeWindow','hasStaticSvBattler','itemTextAlign','MainMenuCore','createStatusWindow','Window_StatusBase_loadFaceImages','Step1Start','name','filter','createCommandWindow','update','removeSubcategory','lineHeight','IiZIA','isSubcategoryVisible','nroVa','exit','initialize','_duration','findExt','getMenuImageOffsetY','DefaultStyle','description','NIdwC','return\x200','_list','PEGTg','updateCommandNameWindow','remove','format','Cols','314872IvxPnw','addWindow','ygoVZ','TextStr','drawItemStatusVerticalStyle','drawTimeIcon','svActorHorzCells','Scene_Menu_onFormationCancel','max','ARRAYFUNC','forceHide','nMUca','createBackground','getSubcategoryList','close','select','isMainMenuCommandEnabled','open','getMenuImageOffsetX','Scene_MenuBase_createBackground','_commandList','okqYf','addCommand','maxCols','drawItemStatus','bitmap','drawItemStatusSoloStyle','min','_subcategory','fMBkD','_timer','_bitmapReady','floor','WwlEM','UECHT','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','constructor','loadPicture','MenuCommandForceDisable','_goldWindow','loadBitmap','goldWindowRectBottomStyle','iaRmS','htMqy','xMJAp','note','createDummyWindow','call','changePaintOpacity','iconWidth','drawItemActorFace','getMainMenuSymbolState','iconHeight','formation','forceHideMainMenuCommand','RDWOl','XIOxs','variableWindowRectTopStyle','actor','PixelateImageRendering','2797932VgkQhq','needsDummyWindow','match','xeQGk','canCreatePlaytimeWindow','loadOtherActorImages','applyThinnerGoldWindowRect'];_0x1460=function(){return _0x5efb33;};return _0x1460();}var label=_0x10bfc3(0x193),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x10bfc3(0x198)](function(_0x56b4a4){const _0x351c96=_0x10bfc3;return _0x56b4a4[_0x351c96(0x312)]&&_0x56b4a4[_0x351c96(0x1a6)][_0x351c96(0x26c)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x10bfc3(0x159)]=function(_0x547ee6,_0x1641d7){const _0x1daa06=_0x10bfc3;for(const _0x6e89cd in _0x1641d7){if(_0x6e89cd[_0x1daa06(0x1ed)](/(.*):(.*)/i)){const _0x535175=String(RegExp['$1']),_0x12aa8a=String(RegExp['$2'])[_0x1daa06(0x21d)]()['trim']();let _0x610cf6,_0x4e7232,_0x2d63e2;switch(_0x12aa8a){case _0x1daa06(0x168):_0x610cf6=_0x1641d7[_0x6e89cd]!==''?Number(_0x1641d7[_0x6e89cd]):0x0;break;case'ARRAYNUM':_0x4e7232=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):[],_0x610cf6=_0x4e7232[_0x1daa06(0x224)](_0xe983fc=>Number(_0xe983fc));break;case _0x1daa06(0x226):_0x610cf6=_0x1641d7[_0x6e89cd]!==''?eval(_0x1641d7[_0x6e89cd]):null;break;case _0x1daa06(0x2fb):_0x4e7232=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):[],_0x610cf6=_0x4e7232[_0x1daa06(0x224)](_0x3e328f=>eval(_0x3e328f));break;case'JSON':_0x610cf6=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):'';break;case _0x1daa06(0x292):_0x4e7232=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):[],_0x610cf6=_0x4e7232[_0x1daa06(0x224)](_0x4cecad=>JSON[_0x1daa06(0x2d6)](_0x4cecad));break;case _0x1daa06(0x171):_0x610cf6=_0x1641d7[_0x6e89cd]!==''?new Function(JSON['parse'](_0x1641d7[_0x6e89cd])):new Function(_0x1daa06(0x1a8));break;case _0x1daa06(0x1b8):_0x4e7232=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):[],_0x610cf6=_0x4e7232[_0x1daa06(0x224)](_0x58b70c=>new Function(JSON[_0x1daa06(0x2d6)](_0x58b70c)));break;case _0x1daa06(0x2d5):_0x610cf6=_0x1641d7[_0x6e89cd]!==''?String(_0x1641d7[_0x6e89cd]):'';break;case'ARRAYSTR':_0x4e7232=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):[],_0x610cf6=_0x4e7232[_0x1daa06(0x224)](_0x37806b=>String(_0x37806b));break;case _0x1daa06(0x28d):_0x2d63e2=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):{},_0x547ee6[_0x535175]={},VisuMZ[_0x1daa06(0x159)](_0x547ee6[_0x535175],_0x2d63e2);continue;case _0x1daa06(0x27d):_0x4e7232=_0x1641d7[_0x6e89cd]!==''?JSON[_0x1daa06(0x2d6)](_0x1641d7[_0x6e89cd]):[],_0x610cf6=_0x4e7232[_0x1daa06(0x224)](_0x43dd07=>VisuMZ[_0x1daa06(0x159)]({},JSON['parse'](_0x43dd07)));break;default:continue;}_0x547ee6[_0x535175]=_0x610cf6;}}return _0x547ee6;},(_0x1b5fb7=>{const _0x206f0e=_0x10bfc3,_0x5b9b05=_0x1b5fb7[_0x206f0e(0x197)];for(const _0x34d412 of dependencies){if(!Imported[_0x34d412]){if(_0x206f0e(0x30c)===_0x206f0e(0x30c)){alert(_0x206f0e(0x16b)[_0x206f0e(0x1ad)](_0x5b9b05,_0x34d412)),SceneManager[_0x206f0e(0x1a0)]();break;}else return _0x578c6a(_0x367a75['$1']);}}const _0x493afe=_0x1b5fb7[_0x206f0e(0x1a6)];if(_0x493afe[_0x206f0e(0x1ed)](/\[Version[ ](.*?)\]/i)){if(_0x206f0e(0x1b1)===_0x206f0e(0x183))this[_0x206f0e(0x17a)](0x0);else{const _0xef596=Number(RegExp['$1']);_0xef596!==VisuMZ[label][_0x206f0e(0x2a9)]&&(alert(_0x206f0e(0x26d)['format'](_0x5b9b05,_0xef596)),SceneManager[_0x206f0e(0x1a0)]());}}if(_0x493afe[_0x206f0e(0x1ed)](/\[Tier[ ](\d+)\]/i)){const _0x1fc37d=Number(RegExp['$1']);_0x1fc37d<tier?_0x206f0e(0x2f8)==='CjPGR'?(alert(_0x206f0e(0x1d2)[_0x206f0e(0x1ad)](_0x5b9b05,_0x1fc37d,tier)),SceneManager[_0x206f0e(0x1a0)]()):(_0x35f02d[_0x206f0e(0x280)][_0x206f0e(0x246)][_0x206f0e(0x1de)](this),this[_0x206f0e(0x311)][_0x206f0e(0x279)]=_0x2ccc8e[_0x206f0e(0x193)][_0x206f0e(0x162)][_0x206f0e(0x281)][_0x206f0e(0x14e)]):tier=Math[_0x206f0e(0x1b7)](_0x1fc37d,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x206f0e(0x162)],_0x1b5fb7[_0x206f0e(0x315)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x10bfc3(0x197)],_0x10bfc3(0x29a),_0x2f32d7=>{const _0x22eb68=_0x10bfc3;VisuMZ[_0x22eb68(0x159)](_0x2f32d7,_0x2f32d7);const _0x86a53d=_0x2f32d7[_0x22eb68(0x256)],_0x51896e=_0x2f32d7[_0x22eb68(0x26a)];for(let _0x28d4dd of _0x86a53d){if(_0x22eb68(0x2e0)!==_0x22eb68(0x248)){_0x28d4dd=parseInt(_0x28d4dd)||0x0;if(_0x28d4dd<=0x0)continue;const _0x2120e5=$gameActors[_0x22eb68(0x1e9)](_0x28d4dd);if(!_0x2120e5)continue;_0x2120e5[_0x22eb68(0x186)](_0x51896e);}else for(const _0x51c484 of _0x11384e['_commandList']){const _0x47008c=_0x51c484['Symbol'];if(this[_0x22eb68(0x1f7)](_0x47008c,_0x51c484)){let _0x452a1b=_0x51c484[_0x22eb68(0x1b2)];if(['',_0x22eb68(0x306)]['includes'](_0x452a1b))_0x452a1b=_0x51c484[_0x22eb68(0x242)][_0x22eb68(0x1de)](this);const _0x265c91=_0x51c484[_0x22eb68(0x249)];_0x265c91>0x0&&this[_0x22eb68(0x288)]()!==_0x22eb68(0x1fe)&&(_0x452a1b=_0x22eb68(0x283)[_0x22eb68(0x1ad)](_0x265c91,_0x452a1b));const _0x219af9=this['isMainMenuCommandEnabled'](_0x47008c,_0x51c484),_0x4c9451=_0x51c484[_0x22eb68(0x23a)][_0x22eb68(0x1de)](this);this[_0x22eb68(0x1c5)](_0x452a1b,_0x47008c,_0x219af9,_0x4c9451),this[_0x22eb68(0x181)](_0x47008c,_0x51c484[_0x22eb68(0x274)][_0x22eb68(0x2ca)](this,_0x4c9451));}this[_0x22eb68(0x2e1)](_0x47008c);}}}),PluginManager['registerCommand'](pluginData[_0x10bfc3(0x197)],_0x10bfc3(0x309),_0x4d76f4=>{const _0x22328f=_0x10bfc3;VisuMZ[_0x22328f(0x159)](_0x4d76f4,_0x4d76f4);const _0x5f1ab1=_0x4d76f4[_0x22328f(0x1f8)]>=_0x4d76f4[_0x22328f(0x196)]?_0x4d76f4[_0x22328f(0x196)]:_0x4d76f4[_0x22328f(0x1f8)],_0x3b3a8d=_0x4d76f4[_0x22328f(0x1f8)]>=_0x4d76f4[_0x22328f(0x196)]?_0x4d76f4[_0x22328f(0x1f8)]:_0x4d76f4['Step1Start'],_0x3c22f4=Array(_0x3b3a8d-_0x5f1ab1+0x1)[_0x22328f(0x23c)]()[_0x22328f(0x224)]((_0x54bffd,_0x4ce84f)=>_0x5f1ab1+_0x4ce84f),_0x1c7e79=_0x4d76f4[_0x22328f(0x26a)];for(let _0xd048dc of _0x3c22f4){if(_0x22328f(0x26f)!==_0x22328f(0x1d0)){_0xd048dc=parseInt(_0xd048dc)||0x0;if(_0xd048dc<=0x0)continue;const _0x427e61=$gameActors[_0x22328f(0x1e9)](_0xd048dc);if(!_0x427e61)continue;_0x427e61[_0x22328f(0x186)](_0x1c7e79);}else this['_commandWindow'][_0x22328f(0x166)]();}}),PluginManager[_0x10bfc3(0x2ee)](pluginData['name'],_0x10bfc3(0x1f2),_0x448b1f=>{const _0x578bf7=_0x10bfc3;VisuMZ['ConvertParams'](_0x448b1f,_0x448b1f);const _0x24ef22=_0x448b1f[_0x578bf7(0x256)];let _0xb99e52=[];while(_0x24ef22['length']>0x0){if('SeGAE'!==_0x578bf7(0x1cc)){const _0x1aa7f5=_0x24ef22[_0x578bf7(0x294)]();if(Array[_0x578bf7(0x219)](_0x1aa7f5))'yMifp'!=='yMifp'?this[_0x578bf7(0x25f)]():_0xb99e52=_0xb99e52['concat'](_0x1aa7f5);else{if(_0x578bf7(0x2cb)!==_0x578bf7(0x1e6))_0xb99e52['push'](_0x1aa7f5);else{const _0x2c53b2=_0x5196ab['MainMenuCore'][_0x578bf7(0x162)][_0x578bf7(0x303)][_0x578bf7(0x221)],_0x30b6b1=_0x4d6cf1['boxWidth'],_0x553cf3=this['calcWindowHeight'](_0x2c53b2,!![]),_0x57f657=0x0,_0x4874ee=this[_0x578bf7(0x170)]();return new _0x15691a(_0x57f657,_0x4874ee,_0x30b6b1,_0x553cf3);}}}else{const _0x5c8778=this['mainMenuCoreSettings']();if(!_0x5c8778[_0x5af6d1])return![];return _0x5c8778[_0x3901d9][_0x578bf7(0x26c)](_0x46689a);}}const _0x5be04e=_0x448b1f['Step2'];for(let _0x3c5f37 of _0xb99e52){if(_0x578bf7(0x163)===_0x578bf7(0x163)){_0x3c5f37=parseInt(_0x3c5f37)||0x0;if(_0x3c5f37<=0x0)continue;const _0x56da7a=$gameActors[_0x578bf7(0x1e9)](_0x3c5f37);if(!_0x56da7a)continue;_0x56da7a['setMenuImage'](_0x5be04e);}else{let _0x2c2c37=_0x1f2d0d['TextStr'];if(['','Untitled']['includes'](_0x2c2c37))_0x2c2c37=_0x57325c['TextJS'][_0x578bf7(0x1de)](this);const _0x1d639d=_0x55a39c[_0x578bf7(0x249)];_0x1d639d>0x0&&this[_0x578bf7(0x288)]()!==_0x578bf7(0x1fe)&&(_0x2c2c37=_0x578bf7(0x283)[_0x578bf7(0x1ad)](_0x1d639d,_0x2c2c37));const _0xa52cab=this['isMainMenuCommandEnabled'](_0x505c32,_0x4bfd0a),_0x5492bb=_0x4b0e62[_0x578bf7(0x23a)][_0x578bf7(0x1de)](this);this['addCommand'](_0x2c2c37,_0x529383,_0xa52cab,_0x5492bb),this[_0x578bf7(0x181)](_0x2a12f8,_0x116832[_0x578bf7(0x274)][_0x578bf7(0x2ca)](this,_0x5492bb));}}}),PluginManager[_0x10bfc3(0x2ee)](pluginData['name'],_0x10bfc3(0x17b),_0x28e633=>{const _0x4533ac=_0x10bfc3;VisuMZ['ConvertParams'](_0x28e633,_0x28e633);const _0x270a1e=_0x28e633['Symbols']||[];for(const _0x440953 of _0x270a1e){_0x4533ac(0x235)==='QtVAZ'?_0x787d7c[_0x4533ac(0x276)](_0x3f7008):$gameSystem['clearShowMainMenuCommand'](_0x440953);}}),PluginManager[_0x10bfc3(0x2ee)](pluginData[_0x10bfc3(0x197)],_0x10bfc3(0x254),_0x3f1e82=>{const _0x47baee=_0x10bfc3;VisuMZ['ConvertParams'](_0x3f1e82,_0x3f1e82);const _0x2e4b54=_0x3f1e82[_0x47baee(0x272)]||[];for(const _0x3f8ef8 of _0x2e4b54){if(_0x47baee(0x296)===_0x47baee(0x2e8))return this['showOnlyBattleMembers']()?_0x471268[_0x47baee(0x259)]()['length']:_0x3f1407['MainMenuCore'][_0x47baee(0x20b)][_0x47baee(0x1de)](this);else $gameSystem[_0x47baee(0x25a)](_0x3f8ef8);}}),PluginManager[_0x10bfc3(0x2ee)](pluginData[_0x10bfc3(0x197)],_0x10bfc3(0x1d5),_0x765f40=>{const _0x422857=_0x10bfc3;VisuMZ[_0x422857(0x159)](_0x765f40,_0x765f40);const _0x1274a6=_0x765f40['Symbols']||[];for(const _0x582d80 of _0x1274a6){if('tFlsg'!==_0x422857(0x182)){const _0x10db85=this[_0x422857(0x2ab)]();switch(_0x10db85){case _0x422857(0x16e):case _0x422857(0x2ad):return _0x1733e9['maxBattleMembers']();default:return 0x1;}}else $gameSystem[_0x422857(0x2a1)](_0x582d80);}}),PluginManager['registerCommand'](pluginData[_0x10bfc3(0x197)],_0x10bfc3(0x260),_0x235335=>{const _0x4f0bce=_0x10bfc3;VisuMZ['ConvertParams'](_0x235335,_0x235335);const _0x14ba62=_0x235335[_0x4f0bce(0x272)]||[];for(const _0x42a8e2 of _0x14ba62){$gameSystem[_0x4f0bce(0x1e5)](_0x42a8e2);}}),PluginManager[_0x10bfc3(0x2ee)](pluginData['name'],_0x10bfc3(0x29b),_0x47e028=>{const _0x3b3c04=_0x10bfc3;VisuMZ[_0x3b3c04(0x159)](_0x47e028,_0x47e028);const _0x58b9f4=_0x47e028[_0x3b3c04(0x272)]||[];for(const _0x2a09e9 of _0x58b9f4){if(_0x3b3c04(0x2b9)!==_0x3b3c04(0x2b9))return this['variableWindowRectBottomStyle']();else $gameSystem['forceShowMainMenuCommand'](_0x2a09e9);}}),VisuMZ['MainMenuCore'][_0x10bfc3(0x212)]=Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x1a1)],Game_System['prototype'][_0x10bfc3(0x1a1)]=function(){const _0x1e19b9=_0x10bfc3;VisuMZ[_0x1e19b9(0x193)][_0x1e19b9(0x212)][_0x1e19b9(0x1de)](this),this['initMainMenuCore']();},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x22f)]=function(){const _0x188a83=_0x10bfc3;this[_0x188a83(0x24e)]=this[_0x188a83(0x24e)]||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x16a)]=function(){const _0x22edfd=_0x10bfc3;if(this[_0x22edfd(0x24e)]===undefined)this['initMainMenuCore']();const _0x17b7b6=[_0x22edfd(0x15d),_0x22edfd(0x1b9),_0x22edfd(0x15b),_0x22edfd(0x206)];for(const _0x355a80 of _0x17b7b6){if(_0x22edfd(0x233)===_0x22edfd(0x233))this[_0x22edfd(0x24e)][_0x355a80]=this[_0x22edfd(0x24e)][_0x355a80]||[];else return _0x529faa(_0x55ebcc['$2']);}return this['_mainMenuCore'];},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x1e2)]=function(_0x4b344b,_0x3be1b8){const _0x51f5b4=_0x10bfc3,_0x467552=this[_0x51f5b4(0x16a)]();if(!_0x467552[_0x3be1b8])return![];return _0x467552[_0x3be1b8][_0x51f5b4(0x26c)](_0x4b344b);},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x2b6)]=function(_0x69c2b3){const _0x217408=_0x10bfc3,_0xced790=this[_0x217408(0x16a)](),_0x541cf8=[_0x217408(0x15d),_0x217408(0x1b9),_0x217408(0x15b),'forceDisable'];for(const _0x342fc1 of _0x541cf8){_0xced790[_0x342fc1][_0x217408(0x1ac)](_0x69c2b3);}},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x20c)]=function(_0x388813){const _0x520aaa=_0x10bfc3,_0x2ad852=this[_0x520aaa(0x16a)]();!_0x2ad852['forceShow'][_0x520aaa(0x26c)](_0x388813)&&_0x2ad852[_0x520aaa(0x15d)][_0x520aaa(0x276)](_0x388813),_0x2ad852[_0x520aaa(0x1b9)][_0x520aaa(0x1ac)](_0x388813);},Game_System['prototype'][_0x10bfc3(0x1e5)]=function(_0x43ae63){const _0x45c85a=_0x10bfc3,_0x3dfacf=this[_0x45c85a(0x16a)]();if(!_0x3dfacf[_0x45c85a(0x1b9)][_0x45c85a(0x26c)](_0x43ae63)){if('GyHHP'!==_0x45c85a(0x305)){if(this[_0x45c85a(0x2d8)]===_0x5ea388)this[_0x45c85a(0x2eb)]();this[_0x45c85a(0x2d8)]=_0x1af74e;}else _0x3dfacf[_0x45c85a(0x1b9)][_0x45c85a(0x276)](_0x43ae63);}_0x3dfacf[_0x45c85a(0x15d)][_0x45c85a(0x1ac)](_0x43ae63);},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x25a)]=function(_0x4ade62){const _0x264bc0=_0x10bfc3,_0x26978e=this[_0x264bc0(0x16a)]();!_0x26978e['forceEnable']['includes'](_0x4ade62)&&_0x26978e['forceEnable'][_0x264bc0(0x276)](_0x4ade62),_0x26978e[_0x264bc0(0x206)][_0x264bc0(0x1ac)](_0x4ade62);},Game_System[_0x10bfc3(0x280)][_0x10bfc3(0x2a1)]=function(_0x10d612){const _0x3c4ac2=_0x10bfc3,_0x2e537e=this[_0x3c4ac2(0x16a)]();!_0x2e537e[_0x3c4ac2(0x206)][_0x3c4ac2(0x26c)](_0x10d612)&&_0x2e537e[_0x3c4ac2(0x206)]['push'](_0x10d612),_0x2e537e['forceEnable'][_0x3c4ac2(0x1ac)](_0x10d612);},VisuMZ['MainMenuCore'][_0x10bfc3(0x234)]=Game_Actor[_0x10bfc3(0x280)][_0x10bfc3(0x250)],Game_Actor[_0x10bfc3(0x280)][_0x10bfc3(0x250)]=function(_0x40c314){const _0x132893=_0x10bfc3;VisuMZ[_0x132893(0x193)][_0x132893(0x234)]['call'](this,_0x40c314),this[_0x132893(0x2eb)]();},Game_Actor['prototype'][_0x10bfc3(0x2eb)]=function(){const _0x32954b=_0x10bfc3;this[_0x32954b(0x2d8)]='',this[_0x32954b(0x1e9)]()&&this[_0x32954b(0x1e9)]()[_0x32954b(0x1dc)][_0x32954b(0x1ed)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(_0x32954b(0x19d)===_0x32954b(0x2bd)?this[_0x32954b(0x2da)](_0x130e90):this[_0x32954b(0x2d8)]=String(RegExp['$1']));},Game_Actor[_0x10bfc3(0x280)][_0x10bfc3(0x21e)]=function(){const _0x2a1e74=_0x10bfc3;if(this[_0x2a1e74(0x2d8)]===undefined)this[_0x2a1e74(0x2eb)]();return this[_0x2a1e74(0x2d8)];},Game_Actor[_0x10bfc3(0x280)][_0x10bfc3(0x186)]=function(_0xc1de69){const _0x34584a=_0x10bfc3;if(this['_menuImage']===undefined)this[_0x34584a(0x2eb)]();this[_0x34584a(0x2d8)]=_0xc1de69;},Game_Actor[_0x10bfc3(0x280)][_0x10bfc3(0x1c1)]=function(){const _0x4ff44b=_0x10bfc3;if(this['actor']()['note']['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()[_0x4ff44b(0x1dc)][_0x4ff44b(0x1ed)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x10bfc3(0x280)][_0x10bfc3(0x1a4)]=function(){const _0x587c0f=_0x10bfc3;if(this[_0x587c0f(0x1e9)]()['note'][_0x587c0f(0x1ed)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x587c0f(0x1e9)]()[_0x587c0f(0x1dc)][_0x587c0f(0x1ed)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x587c0f(0x231)===_0x587c0f(0x255)){const _0x54c7b7=_0x508681[_0x587c0f(0x30b)],_0x218598=this[_0x587c0f(0x2a8)]()-this[_0x587c0f(0x23f)]['height']-this[_0x587c0f(0x1d6)][_0x587c0f(0x243)],_0x39abb7=0x0,_0xa6aed1=this[_0x587c0f(0x23f)]['y']+this[_0x587c0f(0x23f)][_0x587c0f(0x243)];return new _0x59c352(_0x39abb7,_0xa6aed1,_0x54c7b7,_0x218598);}else return Number(RegExp['$2']);}}return 0x0;},Scene_MenuBase[_0x10bfc3(0x280)][_0x10bfc3(0x262)]=function(){const _0x5ef0b3=_0x10bfc3;return VisuMZ[_0x5ef0b3(0x193)][_0x5ef0b3(0x162)][_0x5ef0b3(0x2e7)][_0x5ef0b3(0x2ed)][_0x5ef0b3(0x26c)](this[_0x5ef0b3(0x1d3)][_0x5ef0b3(0x197)]);},VisuMZ['MainMenuCore'][_0x10bfc3(0x1c2)]=Scene_MenuBase[_0x10bfc3(0x280)][_0x10bfc3(0x1bb)],Scene_MenuBase['prototype']['createBackground']=function(){const _0x65fd85=_0x10bfc3;VisuMZ[_0x65fd85(0x193)][_0x65fd85(0x1c2)][_0x65fd85(0x1de)](this),this[_0x65fd85(0x16f)]();},Scene_MenuBase[_0x10bfc3(0x280)][_0x10bfc3(0x16f)]=function(){const _0x54cf70=_0x10bfc3;this[_0x54cf70(0x18f)]=new Sprite_MenuBackgroundActor(),this[_0x54cf70(0x2fd)](this[_0x54cf70(0x18f)]);},VisuMZ['MainMenuCore']['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x10bfc3(0x280)][_0x10bfc3(0x314)],Scene_MenuBase[_0x10bfc3(0x280)][_0x10bfc3(0x314)]=function(){const _0x39f9ae=_0x10bfc3;VisuMZ[_0x39f9ae(0x193)]['Scene_MenuBase_updateActor'][_0x39f9ae(0x1de)](this),this[_0x39f9ae(0x262)]()&&this['_actorMenuBgSprite']&&('nroVa'===_0x39f9ae(0x19f)?this[_0x39f9ae(0x18f)]['setActor'](this[_0x39f9ae(0x261)]):(_0x53be15[_0x39f9ae(0x193)][_0x39f9ae(0x234)][_0x39f9ae(0x1de)](this,_0x1ca686),this[_0x39f9ae(0x2eb)]()));},VisuMZ[_0x10bfc3(0x193)][_0x10bfc3(0x213)]=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2e3)],Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2e3)]=function(){const _0x161cf9=_0x10bfc3;VisuMZ['MainMenuCore']['Scene_Menu_create'][_0x161cf9(0x1de)](this),this['createPlaytimeWindow'](),this[_0x161cf9(0x29d)](),this[_0x161cf9(0x1dd)]();},Scene_Menu['prototype'][_0x10bfc3(0x199)]=function(){const _0x191e7d=_0x10bfc3,_0x1ddbc6=this['commandWindowRect'](),_0x39f1bd=new Window_MenuCommand(_0x1ddbc6);_0x39f1bd['setHandler']('cancel',this['commandCancel'][_0x191e7d(0x2ca)](this)),this[_0x191e7d(0x1b0)](_0x39f1bd),this['_commandWindow']=_0x39f1bd;},VisuMZ['MainMenuCore'][_0x10bfc3(0x2b8)]=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2e5)],Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2e5)]=function(){const _0x5d5225=_0x10bfc3,_0x1aec2f=this[_0x5d5225(0x298)]();if(_0x1aec2f===_0x5d5225(0x26b))return this[_0x5d5225(0x16d)]();else{if(_0x1aec2f==='thinTop')return this[_0x5d5225(0x270)]();else{if(_0x1aec2f===_0x5d5225(0x200)){if('vxHLB'===_0x5d5225(0x2f2))return this[_0x5d5225(0x2b7)]();else{if(this[_0x5d5225(0x2d4)]()){if(_0x1aeb71[_0x5d5225(0x193)][_0x5d5225(0x162)][_0x5d5225(0x2e7)][_0x5d5225(0x228)]){const _0x3a6b13=_0x1a24fc['height']-this['calcWindowHeight'](0x1,![]);_0x197e8e['y']+=_0x3a6b13;}_0x481c17['MainMenuCore'][_0x5d5225(0x162)][_0x5d5225(0x2e7)][_0x5d5225(0x189)]&&(_0x4df762[_0x5d5225(0x243)]=this['calcWindowHeight'](0x1,![]));}}}else{if(_0x1aec2f===_0x5d5225(0x2be))return this[_0x5d5225(0x229)]();else{if(_0x1aec2f===_0x5d5225(0x2de)){if(_0x5d5225(0x203)==='IEGoF'){const _0x4568a2=this[_0x5d5225(0x2d3)][_0x4006b8];if(_0x4568a2<=0x0)return;if(!_0x465c9e[_0x5d5225(0x28b)][_0x4568a2])return;const _0x54df66=this['itemLineRect'](_0x11c007);this[_0x5d5225(0x246)]();let _0x6c7c3b=0x0,_0x51d0db=_0x3e2217[_0x5d5225(0x28b)][_0x4568a2]['trim']();_0x51d0db[_0x5d5225(0x1ed)](/\\I\[(\d+)\]/i)&&(_0x6c7c3b=_0x160fe8(_0x5a0620['$1']),_0x51d0db=_0x51d0db[_0x5d5225(0x297)](/\\I\[(\d+)\]/i,'')[_0x5d5225(0x251)]());if(_0x6c7c3b>0x0){const _0x4265b5=_0x54df66['y']+(this[_0x5d5225(0x19c)]()-_0x31c0f8[_0x5d5225(0x1e3)])/0x2;this['drawIcon'](_0x6c7c3b,_0x54df66['x'],_0x4265b5);const _0x582fb4=_0x11fdd9[_0x5d5225(0x1e0)]+0x4;_0x54df66['x']+=_0x582fb4,_0x54df66[_0x5d5225(0x17f)]-=_0x582fb4;}this[_0x5d5225(0x2d0)](_0x51d0db,_0x54df66['x'],_0x54df66['y'],_0x54df66['width'],_0x5d5225(0x2b4)),this[_0x5d5225(0x21a)](_0x5985d9[_0x5d5225(0x1fd)]()),this[_0x5d5225(0x2d0)](_0x4324d2['value'](_0x4568a2),_0x54df66['x'],_0x54df66['y'],_0x54df66['width'],'right');}else return this[_0x5d5225(0x22c)]();}else{if(_0x5d5225(0x1c4)!=='pDJYW'){const _0x4448c5=VisuMZ['MainMenuCore'][_0x5d5225(0x2b8)][_0x5d5225(0x1de)](this);return this[_0x5d5225(0x227)](_0x4448c5),_0x4448c5;}else return this['lineHeight']();}}}}}},Scene_Menu[_0x10bfc3(0x280)]['adjustDefaultCommandWindowRect']=function(_0x351041){const _0xf9c8e0=_0x10bfc3;this['adjustCommandHeightByPlaytime']()&&(_0x351041[_0xf9c8e0(0x243)]-=this[_0xf9c8e0(0x2f4)]()[_0xf9c8e0(0x243)]),this[_0xf9c8e0(0x1f9)]()&&(_0x351041['height']-=this['variableWindowRect']()[_0xf9c8e0(0x243)]);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x16d)]=function(){const _0x2b32f9=_0x10bfc3,_0x57fa98=VisuMZ[_0x2b32f9(0x193)][_0x2b32f9(0x162)]['CustomCmdWin']['Rows'],_0x4f2c2d=Graphics[_0x2b32f9(0x30b)],_0x5ce804=this[_0x2b32f9(0x2a4)](_0x57fa98,!![]),_0x58f0a0=0x0,_0x328445=this[_0x2b32f9(0x170)]();return new Rectangle(_0x58f0a0,_0x328445,_0x4f2c2d,_0x5ce804);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x270)]=function(){const _0x948661=_0x10bfc3,_0x290988=VisuMZ[_0x948661(0x193)][_0x948661(0x162)][_0x948661(0x303)]['Rows'],_0x4d4746=Graphics[_0x948661(0x30b)],_0x529b5d=this[_0x948661(0x2a4)](0x1,!![]),_0x1630d6=0x0,_0x7f4874=this['mainAreaTop']();return new Rectangle(_0x1630d6,_0x7f4874,_0x4d4746,_0x529b5d);},Scene_Menu[_0x10bfc3(0x280)]['commandWindowRectBottomStyle']=function(){const _0x436fe0=_0x10bfc3,_0x23b9a1=VisuMZ[_0x436fe0(0x193)][_0x436fe0(0x162)][_0x436fe0(0x303)][_0x436fe0(0x221)],_0x3fbb81=Graphics['boxWidth'],_0x3900f1=this['calcWindowHeight'](_0x23b9a1,!![]),_0x5e90a2=0x0,_0x2258b8=this[_0x436fe0(0x155)]()-_0x3900f1;return new Rectangle(_0x5e90a2,_0x2258b8,_0x3fbb81,_0x3900f1);},Scene_Menu[_0x10bfc3(0x280)]['commandWindowRectThinBottomStyle']=function(){const _0x22ebde=_0x10bfc3,_0x290e96=VisuMZ[_0x22ebde(0x193)][_0x22ebde(0x162)][_0x22ebde(0x303)]['Rows'],_0x5957b3=Graphics['boxWidth'],_0x304720=this[_0x22ebde(0x2a4)](0x1,!![]),_0x10f527=0x0,_0x439263=this['mainAreaBottom']()-_0x304720;return new Rectangle(_0x10f527,_0x439263,_0x5957b3,_0x304720);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x22c)]=function(){const _0x285168=_0x10bfc3,_0x218b12=VisuMZ[_0x285168(0x193)]['Settings'][_0x285168(0x303)][_0x285168(0x221)],_0x3afce9=Graphics[_0x285168(0x30b)],_0x24660e=Window_MenuCommand['prototype'][_0x285168(0x310)](_0x218b12),_0x5c8d06=0x0,_0x467e40=Math[_0x285168(0x2bc)]((Graphics['boxHeight']-_0x24660e)/0x2);return new Rectangle(_0x5c8d06,_0x467e40,_0x3afce9,_0x24660e);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x298)]=function(){const _0x5691ac=_0x10bfc3;return VisuMZ[_0x5691ac(0x193)][_0x5691ac(0x162)][_0x5691ac(0x2ac)];},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2d4)]=function(){const _0x364947=_0x10bfc3;if(this[_0x364947(0x298)]()!==_0x364947(0x2b5))return!![];return VisuMZ[_0x364947(0x193)][_0x364947(0x162)][_0x364947(0x2e7)]['ThinGoldWindow'];},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x20e)]=function(){const _0x39e6dd=_0x10bfc3,_0x3505b9=this[_0x39e6dd(0x157)]();this[_0x39e6dd(0x1d6)]=this[_0x39e6dd(0x2d4)]()?new Window_ThinGold(_0x3505b9):new Window_Gold(_0x3505b9),this[_0x39e6dd(0x1b0)](this[_0x39e6dd(0x1d6)]);},VisuMZ[_0x10bfc3(0x193)][_0x10bfc3(0x207)]=Scene_Menu['prototype'][_0x10bfc3(0x157)],Scene_Menu['prototype'][_0x10bfc3(0x157)]=function(){const _0x47cdfc=_0x10bfc3,_0x4019bb=this[_0x47cdfc(0x298)]();if([_0x47cdfc(0x26b),_0x47cdfc(0x2ba),_0x47cdfc(0x2de)][_0x47cdfc(0x26c)](_0x4019bb))return this[_0x47cdfc(0x302)]();else{if([_0x47cdfc(0x200),'thinBottom'][_0x47cdfc(0x26c)](_0x4019bb))return this[_0x47cdfc(0x1d8)]();else{const _0x1fd74b=VisuMZ[_0x47cdfc(0x193)][_0x47cdfc(0x207)][_0x47cdfc(0x1de)](this);return this[_0x47cdfc(0x1f1)](_0x1fd74b),_0x1fd74b;}}},Scene_Menu[_0x10bfc3(0x280)]['applyThinnerGoldWindowRect']=function(_0x263327){const _0x26126e=_0x10bfc3;if(this[_0x26126e(0x2d4)]()){if('nrJRE'!=='nrJRE'){const _0x449275=this['mainCommandWidth'](),_0xb361c8=this[_0x26126e(0x2a4)](0x1,![]),_0x16786e=_0x888110[_0x26126e(0x30b)]-_0x449275,_0x1076c5=this[_0x26126e(0x170)]();return new _0xa0fa58(_0x16786e,_0x1076c5,_0x449275,_0xb361c8);}else{if(VisuMZ[_0x26126e(0x193)][_0x26126e(0x162)]['General'][_0x26126e(0x228)]){const _0x5e0619=_0x263327[_0x26126e(0x243)]-this[_0x26126e(0x2a4)](0x1,![]);_0x263327['y']+=_0x5e0619;}if(VisuMZ[_0x26126e(0x193)][_0x26126e(0x162)][_0x26126e(0x2e7)][_0x26126e(0x189)]){if(_0x26126e(0x293)==='PWenL'){if(_0x3d90ca['MainMenuCore'][_0x26126e(0x162)][_0x26126e(0x2e7)][_0x26126e(0x228)]){const _0x1019c5=_0x72d790['height']-this[_0x26126e(0x2a4)](0x1,![]);_0x550784['y']+=_0x1019c5;}_0x4e8470[_0x26126e(0x193)][_0x26126e(0x162)]['General'][_0x26126e(0x189)]&&(_0x49dd4d['height']=this[_0x26126e(0x2a4)](0x1,![]));}else _0x263327['height']=this[_0x26126e(0x2a4)](0x1,![]);}}}},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x302)]=function(){const _0x2915a6=_0x10bfc3,_0x23ba79=this['mainCommandWidth'](),_0x49d4ea=this[_0x2915a6(0x2a4)](0x1,![]),_0x40953e=Graphics[_0x2915a6(0x30b)]-_0x23ba79,_0x4a3718=this[_0x2915a6(0x155)]()-_0x49d4ea;return new Rectangle(_0x40953e,_0x4a3718,_0x23ba79,_0x49d4ea);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x1d8)]=function(){const _0x20af7c=_0x10bfc3,_0x47068b=this['mainCommandWidth'](),_0x1c5d85=this[_0x20af7c(0x2a4)](0x1,![]),_0x4f6b33=Graphics['boxWidth']-_0x47068b,_0x2fc208=this[_0x20af7c(0x170)]();return new Rectangle(_0x4f6b33,_0x2fc208,_0x47068b,_0x1c5d85);},VisuMZ['MainMenuCore']['Scene_Menu_createStatusWindow']=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x194)],Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x194)]=function(){const _0x85a0f5=_0x10bfc3;VisuMZ[_0x85a0f5(0x193)][_0x85a0f5(0x20a)][_0x85a0f5(0x1de)](this),this[_0x85a0f5(0x257)]();},Scene_Menu['prototype'][_0x10bfc3(0x257)]=function(){const _0x5da18e=_0x10bfc3;this[_0x5da18e(0x298)]()==='mobile'&&(this['_statusWindow'][_0x5da18e(0x2a0)]=0x0);},VisuMZ['MainMenuCore']['Scene_Menu_statusWindowRect']=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x23d)],Scene_Menu['prototype'][_0x10bfc3(0x23d)]=function(){const _0xeac8f7=_0x10bfc3,_0x4310f8=this['commandWindowStyle']();if(['top',_0xeac8f7(0x2ba)]['includes'](_0x4310f8))return _0xeac8f7(0x1ba)==='nMUca'?this['statusWindowRectTopStyle']():this['lineHeight']();else{if([_0xeac8f7(0x200),'thinBottom']['includes'](_0x4310f8)){if('GBiEL'==='GBiEL')return this[_0xeac8f7(0x2fe)]();else{_0x1961b0[_0xeac8f7(0x193)][_0xeac8f7(0x27f)][_0xeac8f7(0x1de)](this);if(this[_0xeac8f7(0x298)]()===_0xeac8f7(0x2de))this['_statusWindow'][_0xeac8f7(0x1c0)]();}}else return _0x4310f8===_0xeac8f7(0x2de)?this[_0xeac8f7(0x2c6)]():VisuMZ[_0xeac8f7(0x193)][_0xeac8f7(0x300)]['call'](this);}},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x29f)]=function(){const _0x453629=_0x10bfc3,_0x4ddd8d=Graphics['boxWidth'],_0x2b6773=this[_0x453629(0x2a8)]()-this[_0x453629(0x23f)][_0x453629(0x243)]-this[_0x453629(0x1d6)][_0x453629(0x243)],_0x1d4f1d=0x0,_0x6c4ee5=this['_commandWindow']['y']+this['_commandWindow']['height'];return new Rectangle(_0x1d4f1d,_0x6c4ee5,_0x4ddd8d,_0x2b6773);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2fe)]=function(){const _0x6d498e=_0x10bfc3,_0x5243a0=Graphics[_0x6d498e(0x30b)],_0x442bc4=this[_0x6d498e(0x2a8)]()-this['_commandWindow'][_0x6d498e(0x243)]-this['_goldWindow'][_0x6d498e(0x243)],_0x1d1b17=0x0,_0x4bb75d=this[_0x6d498e(0x1d6)]['y']+this[_0x6d498e(0x1d6)][_0x6d498e(0x243)];return new Rectangle(_0x1d1b17,_0x4bb75d,_0x5243a0,_0x442bc4);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2c6)]=function(){const _0x241877=_0x10bfc3,_0x754d74=Graphics['boxWidth'],_0x4a800=this[_0x241877(0x2a8)]()-this[_0x241877(0x1d6)][_0x241877(0x243)],_0x424304=0x0,_0x597e5c=this[_0x241877(0x155)]()-this[_0x241877(0x1d6)]['height']-_0x4a800;return new Rectangle(_0x424304,_0x597e5c,_0x754d74,_0x4a800);},Scene_Menu['prototype'][_0x10bfc3(0x22e)]=function(){const _0x5b8604=_0x10bfc3;if(!this[_0x5b8604(0x1ef)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x526965=this[_0x5b8604(0x2f4)]();this[_0x5b8604(0x190)]=new Window_Playtime(_0x526965),this[_0x5b8604(0x190)][_0x5b8604(0x173)](VisuMZ[_0x5b8604(0x193)][_0x5b8604(0x162)][_0x5b8604(0x281)][_0x5b8604(0x180)]),this[_0x5b8604(0x1b0)](this[_0x5b8604(0x190)]);},Scene_Menu['prototype']['canCreatePlaytimeWindow']=function(){const _0x1cb465=_0x10bfc3;return VisuMZ[_0x1cb465(0x193)][_0x1cb465(0x162)][_0x1cb465(0x281)][_0x1cb465(0x2f5)];},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x188)]=function(){const _0x4559ea=_0x10bfc3;return this[_0x4559ea(0x1ef)]()&&(VisuMZ[_0x4559ea(0x193)][_0x4559ea(0x162)][_0x4559ea(0x281)][_0x4559ea(0x1fc)]??!![]);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2f4)]=function(){const _0x9c4b71=_0x10bfc3,_0x26450e=this[_0x9c4b71(0x298)]();if([_0x9c4b71(0x26b),_0x9c4b71(0x2ba),_0x9c4b71(0x2de)][_0x9c4b71(0x26c)](_0x26450e)){if('MUnej'!==_0x9c4b71(0x2f0))_0x5940fc[_0x9c4b71(0x193)][_0x9c4b71(0x20a)][_0x9c4b71(0x1de)](this),this['adjustStatusWindowMobile']();else return this[_0x9c4b71(0x215)]();}else{if([_0x9c4b71(0x200),'thinBottom']['includes'](_0x26450e))return this[_0x9c4b71(0x175)]();else{if(_0x9c4b71(0x1aa)!==_0x9c4b71(0x1aa))_0x46cd36[_0x9c4b71(0x15d)][_0x9c4b71(0x276)](_0x5bed5d);else return VisuMZ[_0x9c4b71(0x193)][_0x9c4b71(0x162)][_0x9c4b71(0x281)][_0x9c4b71(0x2f9)][_0x9c4b71(0x1de)](this);}}},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x215)]=function(){const _0x37f178=_0x10bfc3,_0x9dee88=this[_0x37f178(0x164)](),_0x4de789=this[_0x37f178(0x2a4)](0x1,![]),_0x1b7353=0x0,_0x4ca570=this['mainAreaBottom']()-_0x4de789;return new Rectangle(_0x1b7353,_0x4ca570,_0x9dee88,_0x4de789);},Scene_Menu['prototype']['playtimeWindowRectBottomStyle']=function(){const _0x1a22bc=_0x10bfc3,_0x4f3e50=this[_0x1a22bc(0x164)](),_0x33ba37=this[_0x1a22bc(0x2a4)](0x1,![]),_0x14eb4b=0x0,_0x34fe5b=this['mainAreaTop']();return new Rectangle(_0x14eb4b,_0x34fe5b,_0x4f3e50,_0x33ba37);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x29d)]=function(){const _0x4b5411=_0x10bfc3;if(!this['canCreateVariableWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x56b9bf=this[_0x4b5411(0x273)]();this[_0x4b5411(0x151)]=new Window_MenuVariables(_0x56b9bf),this[_0x4b5411(0x151)]['setBackgroundType'](VisuMZ[_0x4b5411(0x193)][_0x4b5411(0x162)][_0x4b5411(0x30a)][_0x4b5411(0x180)]),this['addWindow'](this['_variableWindow']);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x267)]=function(){const _0x23a36f=_0x10bfc3;return VisuMZ['MainMenuCore'][_0x23a36f(0x162)][_0x23a36f(0x30a)][_0x23a36f(0x2f5)];},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x1f9)]=function(){const _0x35da90=_0x10bfc3;return this[_0x35da90(0x267)]()&&(VisuMZ['MainMenuCore']['Settings'][_0x35da90(0x30a)]['AdjustCommandHeight']??!![]);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x273)]=function(){const _0xe6a88a=_0x10bfc3,_0x53f118=this['commandWindowStyle']();if(['top',_0xe6a88a(0x2ba),_0xe6a88a(0x2de)][_0xe6a88a(0x26c)](_0x53f118))return this[_0xe6a88a(0x1e8)]();else return[_0xe6a88a(0x200),_0xe6a88a(0x2be)][_0xe6a88a(0x26c)](_0x53f118)?this[_0xe6a88a(0x185)]():VisuMZ['MainMenuCore'][_0xe6a88a(0x162)][_0xe6a88a(0x30a)][_0xe6a88a(0x2f9)][_0xe6a88a(0x1de)](this);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x1e8)]=function(){const _0x4a21ae=_0x10bfc3,_0x141b97=Graphics[_0x4a21ae(0x30b)]-this['_goldWindow'][_0x4a21ae(0x17f)]-(this[_0x4a21ae(0x190)]?this[_0x4a21ae(0x190)][_0x4a21ae(0x17f)]:0x0),_0x25b1a0=this[_0x4a21ae(0x2a4)](0x1,![]),_0x2e58cb=this[_0x4a21ae(0x1d6)]['x']-_0x141b97,_0x5d150c=this[_0x4a21ae(0x155)]()-_0x25b1a0;return new Rectangle(_0x2e58cb,_0x5d150c,_0x141b97,_0x25b1a0);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x185)]=function(){const _0x815cce=_0x10bfc3,_0x2ed2b5=Graphics['boxWidth']-this[_0x815cce(0x1d6)][_0x815cce(0x17f)]-(this['_playtimeWindow']?this[_0x815cce(0x190)][_0x815cce(0x17f)]:0x0),_0x21681a=this['calcWindowHeight'](0x1,![]),_0x5f0b87=this[_0x815cce(0x1d6)]['x']-_0x2ed2b5,_0x4c1817=this[_0x815cce(0x170)]();return new Rectangle(_0x5f0b87,_0x4c1817,_0x2ed2b5,_0x21681a);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x1dd)]=function(){const _0xca6a1c=_0x10bfc3;if(!this[_0xca6a1c(0x1ec)]())return;const _0xec30b7=this[_0xca6a1c(0x273)]();this[_0xca6a1c(0x2ec)]=new Window_Base(_0xec30b7),this[_0xca6a1c(0x2ec)][_0xca6a1c(0x173)](VisuMZ[_0xca6a1c(0x193)][_0xca6a1c(0x162)][_0xca6a1c(0x30a)][_0xca6a1c(0x180)]),this[_0xca6a1c(0x1b0)](this['_dummyWindow']);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x1ec)]=function(){const _0x9b3d5=_0x10bfc3;if([_0x9b3d5(0x2b5),_0x9b3d5(0x2de)]['includes'](this[_0x9b3d5(0x298)]()))return![];if(this[_0x9b3d5(0x151)])return![];return!![];},VisuMZ[_0x10bfc3(0x193)]['Scene_Menu_commandPersonal']=Scene_Menu[_0x10bfc3(0x280)]['commandPersonal'],Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x211)]=function(){const _0x3fc330=_0x10bfc3;if(this[_0x3fc330(0x28c)]()&&this[_0x3fc330(0x278)])$gameParty[_0x3fc330(0x24b)]($gameParty[_0x3fc330(0x2b1)]()[0x0]),this[_0x3fc330(0x304)]();else{if(_0x3fc330(0x308)===_0x3fc330(0x258))this[_0x3fc330(0x188)]()&&(_0x1367bb[_0x3fc330(0x243)]-=this[_0x3fc330(0x2f4)]()[_0x3fc330(0x243)]),this[_0x3fc330(0x1f9)]()&&(_0x1c01b3['height']-=this[_0x3fc330(0x273)]()[_0x3fc330(0x243)]);else{if(this['commandWindowStyle']()===_0x3fc330(0x2de))this[_0x3fc330(0x278)][_0x3fc330(0x1c0)]();VisuMZ[_0x3fc330(0x193)][_0x3fc330(0x269)][_0x3fc330(0x1de)](this);}}},Scene_Menu['prototype']['isSoloQuickMode']=function(){const _0xb511ea=_0x10bfc3;return VisuMZ['MainMenuCore'][_0xb511ea(0x162)]['General']['SoloQuick']&&$gameParty[_0xb511ea(0x2b1)]()[_0xb511ea(0x2bf)]<=0x1;},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x304)]=function(){const _0x7e2588=_0x10bfc3,_0x249e5e=this['_commandWindow'][_0x7e2588(0x22d)](),_0x8eeb42=this[_0x7e2588(0x23f)][_0x7e2588(0x172)]();for(const _0x416ac4 of Window_MenuCommand[_0x7e2588(0x1c3)]){if(_0x416ac4[_0x7e2588(0x160)]===_0x249e5e){_0x416ac4['PersonalHandlerJS'][_0x7e2588(0x1de)](this,_0x8eeb42);return;}}},VisuMZ['MainMenuCore'][_0x10bfc3(0x245)]=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x265)],Scene_Menu[_0x10bfc3(0x280)]['onPersonalCancel']=function(){const _0x3db14f=_0x10bfc3;VisuMZ[_0x3db14f(0x193)][_0x3db14f(0x245)][_0x3db14f(0x1de)](this);if(this[_0x3db14f(0x298)]()==='mobile')this[_0x3db14f(0x278)][_0x3db14f(0x1bd)]();},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x1fa)]=function(){const _0x5ca9ea=_0x10bfc3,_0x2b7387=parseInt(this[_0x5ca9ea(0x23f)]['currentExt']());if(_0x2b7387)$gameTemp['reserveCommonEvent'](_0x2b7387),this['popScene']();else{if('xeQGk'!==_0x5ca9ea(0x1ee)){if(_0x45a601[_0x5ca9ea(0x1e2)](_0x187408,_0x5ca9ea(0x15b)))return!![];if(_0xb0443b['getMainMenuSymbolState'](_0x1678ba,_0x5ca9ea(0x206)))return![];return _0x35fcbe['EnableJS'][_0x5ca9ea(0x1de)](this,_0x429844,_0x13ec4d);}else this[_0x5ca9ea(0x23f)][_0x5ca9ea(0x166)]();}},VisuMZ[_0x10bfc3(0x193)][_0x10bfc3(0x27f)]=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x29c)],Scene_Menu['prototype'][_0x10bfc3(0x29c)]=function(){const _0x1ef9a4=_0x10bfc3;VisuMZ[_0x1ef9a4(0x193)][_0x1ef9a4(0x27f)][_0x1ef9a4(0x1de)](this);if(this['commandWindowStyle']()==='mobile')this[_0x1ef9a4(0x278)][_0x1ef9a4(0x1c0)]();},VisuMZ['MainMenuCore'][_0x10bfc3(0x1b6)]=Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x18d)],Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x18d)]=function(){const _0x5b18a3=_0x10bfc3;VisuMZ[_0x5b18a3(0x193)][_0x5b18a3(0x1b6)][_0x5b18a3(0x1de)](this);if(this[_0x5b18a3(0x298)]()==='mobile')this[_0x5b18a3(0x278)][_0x5b18a3(0x1bd)]();},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x2c4)]=function(){SceneManager['push'](Scene_Load);},Scene_Menu[_0x10bfc3(0x280)][_0x10bfc3(0x30f)]=function(){const _0x2e1663=_0x10bfc3;if(this[_0x2e1663(0x23f)][_0x2e1663(0x237)]()!==''){if(_0x2e1663(0x184)==='gOlYL')this[_0x2e1663(0x23f)][_0x2e1663(0x19b)]();else{if(_0x550c51[_0x2e1663(0x21c)])return _0x248fad[_0x2e1663(0x1d3)]===_0x239ee1;return!![];}}else this['popScene']();};function _0x20b2(_0x285384,_0x19dd32){const _0x1460d4=_0x1460();return _0x20b2=function(_0x20b200,_0xcb58e6){_0x20b200=_0x20b200-0x14e;let _0x2d47a1=_0x1460d4[_0x20b200];return _0x2d47a1;},_0x20b2(_0x285384,_0x19dd32);}function Sprite_MenuBackgroundActor(){const _0x7610e4=_0x10bfc3;this[_0x7610e4(0x1a1)](...arguments);}Sprite_MenuBackgroundActor[_0x10bfc3(0x280)]=Object[_0x10bfc3(0x2e3)](Sprite[_0x10bfc3(0x280)]),Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x1d3)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x1a1)]=function(){const _0x533e1e=_0x10bfc3;this[_0x533e1e(0x261)]=null,this[_0x533e1e(0x1ce)]=![],Sprite['prototype'][_0x533e1e(0x1a1)][_0x533e1e(0x1de)](this),this['x']=Graphics[_0x533e1e(0x17f)];},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x2ce)]=function(_0x246ad5){const _0x385f2e=_0x10bfc3;this[_0x385f2e(0x261)]!==_0x246ad5&&(this[_0x385f2e(0x261)]=_0x246ad5,this[_0x385f2e(0x1d7)]());},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x1d7)]=function(){const _0xc5f2f8=_0x10bfc3;this[_0xc5f2f8(0x1ce)]=![];if(this[_0xc5f2f8(0x261)]){if(_0xc5f2f8(0x161)===_0xc5f2f8(0x1d1)){const _0x38183c=this['mainMenuCoreSettings']();!_0x38183c[_0xc5f2f8(0x1b9)][_0xc5f2f8(0x26c)](_0x52e9b8)&&_0x38183c[_0xc5f2f8(0x1b9)][_0xc5f2f8(0x276)](_0x5bc1bc),_0x38183c[_0xc5f2f8(0x15d)][_0xc5f2f8(0x1ac)](_0x47681a);}else this[_0xc5f2f8(0x1c8)]=ImageManager['loadPicture'](this[_0xc5f2f8(0x261)][_0xc5f2f8(0x21e)]()),this[_0xc5f2f8(0x1c8)][_0xc5f2f8(0x27a)](this['onBitmapLoad'][_0xc5f2f8(0x2ca)](this));}else this[_0xc5f2f8(0x1c8)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)]['onBitmapLoad']=function(){const _0x2c4026=_0x10bfc3;this[_0x2c4026(0x1ce)]=!![],VisuMZ['MainMenuCore']['Settings'][_0x2c4026(0x2e7)][_0x2c4026(0x27e)][_0x2c4026(0x1de)](this);},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x19a)]=function(){const _0x2fbf94=_0x10bfc3;Sprite['prototype'][_0x2fbf94(0x19a)][_0x2fbf94(0x1de)](this);if(this[_0x2fbf94(0x1ce)]){if(_0x2fbf94(0x2ae)===_0x2fbf94(0x2ae))this[_0x2fbf94(0x268)](),this[_0x2fbf94(0x22a)](),this['updateDuration']();else{if(this[_0x2fbf94(0x1cd)]-->0x0){if(this[_0x2fbf94(0x1cd)]<=0x0)this['refresh']();}}}},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x268)]=function(){const _0xcbaa2b=_0x10bfc3;if(this[_0xcbaa2b(0x1a2)]>0x0){if('Magtc'!==_0xcbaa2b(0x202)){const _0xe13b82=this[_0xcbaa2b(0x1a2)];this[_0xcbaa2b(0x289)]=(this[_0xcbaa2b(0x289)]*(_0xe13b82-0x1)+0xff)/_0xe13b82;}else _0x3f4cfd[_0xcbaa2b(0x276)](_0x1e5861);}},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x22a)]=function(){const _0x461439=_0x10bfc3;if(this[_0x461439(0x1a2)]>0x0){const _0x55df2a=this[_0x461439(0x1a2)];this['x']=(this['x']*(_0x55df2a-0x1)+this[_0x461439(0x1f5)])/_0x55df2a,this['y']=(this['y']*(_0x55df2a-0x1)+this[_0x461439(0x218)])/_0x55df2a;}},Sprite_MenuBackgroundActor[_0x10bfc3(0x280)][_0x10bfc3(0x153)]=function(){const _0x284ab1=_0x10bfc3;if(this['_duration']>0x0)this[_0x284ab1(0x1a2)]--;},ImageManager[_0x10bfc3(0x1b5)]=ImageManager[_0x10bfc3(0x1b5)]||0x9,ImageManager[_0x10bfc3(0x210)]=ImageManager['svActorVertCells']||0x6,Window_Base[_0x10bfc3(0x280)][_0x10bfc3(0x23b)]=function(_0x302856,_0x398070,_0x2a0c70){const _0x13be6f=_0x10bfc3,_0x1249ae=_0x302856[_0x13be6f(0x1ed)](/\$/i),_0x26eb52=ImageManager['loadSvActor'](_0x302856),_0x289b8a=_0x26eb52[_0x13be6f(0x17f)]/(_0x1249ae?0x1:ImageManager[_0x13be6f(0x1b5)]),_0xe0149c=_0x26eb52[_0x13be6f(0x243)]/(_0x1249ae?0x1:ImageManager['svActorVertCells']),_0x4699da=0x0,_0x202520=0x0;this[_0x13be6f(0x311)]['blt'](_0x26eb52,_0x4699da,_0x202520,_0x289b8a,_0xe0149c,_0x398070-_0x289b8a/0x2,_0x2a0c70-_0xe0149c);},Window_MenuCommand[_0x10bfc3(0x1c3)]=VisuMZ[_0x10bfc3(0x193)][_0x10bfc3(0x162)][_0x10bfc3(0x2a7)],Window_MenuCommand['SUBCATEGORY_LIST']=undefined,VisuMZ[_0x10bfc3(0x193)]['Window_MenuCommand_initialize']=Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x1a1)],Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x1a1)]=function(_0x80ef5a){const _0x27970f=_0x10bfc3;this[_0x27970f(0x1cb)]='',VisuMZ[_0x27970f(0x193)]['Window_MenuCommand_initialize'][_0x27970f(0x1de)](this,_0x80ef5a),this[_0x27970f(0x15c)](_0x80ef5a);},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x15c)]=function(_0x527c91){const _0x31d328=_0x10bfc3,_0x42ca50=new Rectangle(0x0,0x0,_0x527c91[_0x31d328(0x17f)],_0x527c91[_0x31d328(0x243)]);this[_0x31d328(0x2c8)]=new Window_Base(_0x42ca50),this[_0x31d328(0x2c8)][_0x31d328(0x289)]=0x0,this[_0x31d328(0x2fd)](this['_commandNameWindow']),this[_0x31d328(0x1ab)]();},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x2c2)]=function(){const _0x4c24dc=_0x10bfc3;Window_HorzCommand[_0x4c24dc(0x280)][_0x4c24dc(0x2c2)]['call'](this);if(this[_0x4c24dc(0x2c8)])this[_0x4c24dc(0x1ab)]();},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x1ab)]=function(){const _0x25176a=_0x10bfc3,_0x2fddd2=this[_0x25176a(0x2c8)];_0x2fddd2[_0x25176a(0x311)]['clear']();const _0x3fc52e=this[_0x25176a(0x2aa)](this[_0x25176a(0x20d)]());if(_0x3fc52e===_0x25176a(0x28f)){if(_0x25176a(0x238)===_0x25176a(0x30d)){const _0x2e2fb6=this['listStyle']();if([_0x25176a(0x28e),_0x25176a(0x18c)][_0x25176a(0x26c)](_0x2e2fb6))return![];return _0x509097['prototype'][_0x25176a(0x167)][_0x25176a(0x1de)](this);}else{const _0xace144=this['itemLineRect'](this[_0x25176a(0x20d)]());let _0x48c6c9=this['commandName'](this[_0x25176a(0x20d)]());_0x48c6c9=_0x48c6c9[_0x25176a(0x297)](/\\I\[(\d+)\]/gi,''),_0x2fddd2[_0x25176a(0x246)](),this[_0x25176a(0x2f6)](_0x48c6c9,_0xace144),this[_0x25176a(0x209)](_0x48c6c9,_0xace144),this[_0x25176a(0x223)](_0x48c6c9,_0xace144);}}},Window_MenuCommand['prototype'][_0x10bfc3(0x2f6)]=function(_0x516e7e,_0x54d9d1){},Window_MenuCommand[_0x10bfc3(0x280)]['commandNameWindowDrawText']=function(_0x9590b4,_0x2ce95f){const _0x241916=_0x10bfc3,_0x7b6b72=this[_0x241916(0x2c8)];_0x7b6b72['drawText'](_0x9590b4,0x0,_0x2ce95f['y'],_0x7b6b72[_0x241916(0x285)],_0x241916(0x2d9));},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x223)]=function(_0x5d5033,_0x325135){const _0x1f247a=_0x10bfc3,_0x47490f=this['_commandNameWindow'],_0x38cb8b=$gameSystem['windowPadding'](),_0x2e4e94=_0x325135['x']+Math['floor'](_0x325135[_0x1f247a(0x17f)]/0x2)+_0x38cb8b;_0x47490f['x']=_0x47490f[_0x1f247a(0x17f)]/-0x2+_0x2e4e94,_0x47490f['y']=Math['floor'](_0x325135[_0x1f247a(0x243)]/0x4);},Window_MenuCommand[_0x10bfc3(0x280)]['itemHeight']=function(){const _0x16eaf8=_0x10bfc3,_0x31b742=SceneManager['_scene'][_0x16eaf8(0x298)]();if(_0x31b742==='mobile'){const _0x244684=VisuMZ['MainMenuCore']['Settings']['CustomCmdWin']['MobileThickness'];return this[_0x16eaf8(0x19c)]()*_0x244684+0x8;}else{if(_0x16eaf8(0x1a7)!==_0x16eaf8(0x179))return Window_Command[_0x16eaf8(0x280)]['itemHeight'][_0x16eaf8(0x1de)](this);else _0x1ab7e9=_0xa2ce4[_0x16eaf8(0x1b7)](_0x4b5b55,_0x1ba97a);}},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x22b)]=function(){const _0x332588=_0x10bfc3;this[_0x332588(0x2d2)]();},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x2d2)]=function(){const _0x5178c1=_0x10bfc3;for(const _0x4e4d8c of Window_MenuCommand['_commandList']){if('glvNq'==='glvNq'){const _0x417d58=_0x4e4d8c[_0x5178c1(0x160)];if(this[_0x5178c1(0x1f7)](_0x417d58,_0x4e4d8c)){if('brcUF'!==_0x5178c1(0x2c1)){let _0x1994f6=_0x4e4d8c[_0x5178c1(0x1b2)];if(['',_0x5178c1(0x306)]['includes'](_0x1994f6))_0x1994f6=_0x4e4d8c[_0x5178c1(0x242)][_0x5178c1(0x1de)](this);const _0x5bc4a1=_0x4e4d8c[_0x5178c1(0x249)];if(_0x5bc4a1>0x0&&this[_0x5178c1(0x288)]()!==_0x5178c1(0x1fe)){if(_0x5178c1(0x1f3)==='sxlCW'){const _0x1f1680=_0x1dc5a7[_0x5178c1(0x193)][_0x5178c1(0x207)][_0x5178c1(0x1de)](this);return this[_0x5178c1(0x1f1)](_0x1f1680),_0x1f1680;}else _0x1994f6=_0x5178c1(0x283)[_0x5178c1(0x1ad)](_0x5bc4a1,_0x1994f6);}const _0x6c0c3a=this[_0x5178c1(0x1bf)](_0x417d58,_0x4e4d8c),_0x2dc94d=_0x4e4d8c['ExtJS'][_0x5178c1(0x1de)](this);this[_0x5178c1(0x1c5)](_0x1994f6,_0x417d58,_0x6c0c3a,_0x2dc94d),this[_0x5178c1(0x181)](_0x417d58,_0x4e4d8c['CallHandlerJS'][_0x5178c1(0x2ca)](this,_0x2dc94d));}else{if(this[_0x5178c1(0x1e9)]()['note'][_0x5178c1(0x1ed)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return _0x5bd871(_0x3cc6b4['$1']);else{if(this[_0x5178c1(0x1e9)]()[_0x5178c1(0x1dc)][_0x5178c1(0x1ed)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return _0x4b6ae6(_0xe7862f['$1']);}return 0x0;}}this[_0x5178c1(0x2e1)](_0x417d58);}else{const _0xa215b2=_0x4f1bc3[_0x5178c1(0x30b)]-this[_0x5178c1(0x1d6)][_0x5178c1(0x17f)]-(this[_0x5178c1(0x190)]?this[_0x5178c1(0x190)]['width']:0x0),_0x5df4e1=this['calcWindowHeight'](0x1,![]),_0x117529=this['_goldWindow']['x']-_0xa215b2,_0x11785a=this[_0x5178c1(0x170)]();return new _0xc9682b(_0x117529,_0x11785a,_0xa215b2,_0x5df4e1);}}},Window_MenuCommand['prototype'][_0x10bfc3(0x1f7)]=function(_0xa8a1a6,_0x258df3,_0x30d881){const _0xe0d31f=_0x10bfc3;if(!_0x30d881){if(!this[_0xe0d31f(0x214)](_0xa8a1a6,_0x258df3))return![];}if($gameSystem['getMainMenuSymbolState'](_0xa8a1a6,_0xe0d31f(0x15d)))return!![];if($gameSystem[_0xe0d31f(0x1e2)](_0xa8a1a6,_0xe0d31f(0x1b9)))return![];return _0x258df3[_0xe0d31f(0x2a3)][_0xe0d31f(0x1de)](this,_0xa8a1a6,_0x258df3);},Window_MenuCommand['prototype'][_0x10bfc3(0x1bf)]=function(_0x18df61,_0x2a794b){const _0x21bb76=_0x10bfc3;if($gameSystem['getMainMenuSymbolState'](_0x18df61,_0x21bb76(0x15b)))return!![];if($gameSystem['getMainMenuSymbolState'](_0x18df61,'forceDisable'))return![];return _0x2a794b['EnableJS']['call'](this,_0x18df61,_0x2a794b);},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x2e1)]=function(_0x334e15){const _0x16e57c=_0x10bfc3;switch(_0x334e15){case _0x16e57c(0x24a):this[_0x16e57c(0x20f)]();break;case _0x16e57c(0x1e4):this['addFormationCommand'](),this[_0x16e57c(0x21b)]();break;case'options':this['addOptionsCommand']();break;case'save':this[_0x16e57c(0x1fb)]();break;case _0x16e57c(0x2b2):this[_0x16e57c(0x2a6)]();break;}},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x20f)]=function(){},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x18e)]=function(){},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x21b)]=function(){},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x2e4)]=function(){},Window_MenuCommand['prototype'][_0x10bfc3(0x1fb)]=function(){},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x2a6)]=function(){},Window_MenuCommand[_0x10bfc3(0x280)]['maxCols']=function(){const _0x539fe3=_0x10bfc3,_0x1bacae=SceneManager[_0x539fe3(0x275)][_0x539fe3(0x298)]();if([_0x539fe3(0x2ba),_0x539fe3(0x2be)][_0x539fe3(0x26c)](_0x1bacae))return this[_0x539fe3(0x1a9)]?this['maxItems']():0x4;else return _0x1bacae!==_0x539fe3(0x2b5)?VisuMZ['MainMenuCore'][_0x539fe3(0x162)][_0x539fe3(0x303)][_0x539fe3(0x1ae)]:Window_Command[_0x539fe3(0x280)][_0x539fe3(0x1c6)]['call'](this);},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x237)]=function(){const _0x34aa8b=_0x10bfc3;return this[_0x34aa8b(0x1cb)]||'';},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x214)]=function(_0x32ec59,_0x388239){const _0x235061=_0x10bfc3,_0x3914c7=_0x388239[_0x235061(0x239)]||'';if(!this[_0x235061(0x2e9)](_0x3914c7)&&this[_0x235061(0x237)]()==='')return _0x235061(0x1da)==='htMqy'?!![]:_0x11de6f(_0x3c9471['$1']);return _0x3914c7===this[_0x235061(0x237)]();},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x2e9)]=function(_0x364df9){const _0x59cfde=_0x10bfc3;return this[_0x59cfde(0x1bc)]()['includes'](_0x364df9);},Window_MenuCommand[_0x10bfc3(0x280)]['getSubcategoryList']=function(){const _0x1177d9=_0x10bfc3;if(Window_MenuCommand[_0x1177d9(0x241)]!==undefined)return Window_MenuCommand[_0x1177d9(0x241)];Window_MenuCommand[_0x1177d9(0x241)]=[];for(const _0x2993b7 of Window_MenuCommand[_0x1177d9(0x1c3)]){if('IEYkM'===_0x1177d9(0x1d9))return this['commandWindowRectThinBottomStyle']();else{const _0x3791aa=_0x2993b7[_0x1177d9(0x160)];if(_0x3791aa!==_0x1177d9(0x313))continue;const _0x43c21e=_0x2993b7[_0x1177d9(0x23a)][_0x1177d9(0x1de)](this);Window_MenuCommand[_0x1177d9(0x241)][_0x1177d9(0x276)](_0x43c21e);}}return Window_MenuCommand[_0x1177d9(0x241)];},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x19e)]=function(_0x465e5a){const _0x2f057d=_0x10bfc3;if(!_0x465e5a)return!![];const _0x175339=_0x465e5a['ExtJS'][_0x2f057d(0x1de)](this);for(const _0x583a67 of Window_MenuCommand[_0x2f057d(0x1c3)]){if(_0x583a67===_0x465e5a)continue;const _0x201e97=_0x583a67[_0x2f057d(0x239)]||'';if(_0x201e97!==_0x175339)continue;const _0x4b4610=_0x583a67[_0x2f057d(0x160)];if(this['isMainMenuCommandVisible'](_0x4b4610,_0x583a67,!![])){if(_0x2f057d(0x29e)!=='AKVBX'){const _0x215019=this[_0x2f057d(0x2e5)](),_0x3f0baa=new _0x1cc11d(_0x215019);_0x3f0baa[_0x2f057d(0x181)]('cancel',this[_0x2f057d(0x30f)][_0x2f057d(0x2ca)](this)),this[_0x2f057d(0x1b0)](_0x3f0baa),this['_commandWindow']=_0x3f0baa;}else return!![];}}return![];},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x25b)]=function(_0x4595d5){const _0x2e9b36=_0x10bfc3;_0x4595d5=_0x4595d5;if(this[_0x2e9b36(0x237)]()===_0x4595d5)return;this['_subcategory']=_0x4595d5,this[_0x2e9b36(0x2dc)](),this[_0x2e9b36(0x1be)](0x0),this['setTopRow'](0x0),this['activate']();},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x19b)]=function(){const _0x5c29c9=_0x10bfc3,_0x6e4a09=this[_0x5c29c9(0x237)]();this['_subcategory']='',this[_0x5c29c9(0x2dc)](),this[_0x5c29c9(0x230)](0x0);this[_0x5c29c9(0x2d7)]>0x1&&(this[_0x5c29c9(0x2d7)]=0x1,this[_0x5c29c9(0x152)]());const _0x585922=Math[_0x5c29c9(0x1b7)](this[_0x5c29c9(0x1a3)](_0x6e4a09),0x0);this[_0x5c29c9(0x17a)](_0x585922),this[_0x5c29c9(0x166)]();},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x192)]=function(){const _0x3dbe4f=_0x10bfc3;return VisuMZ['MainMenuCore'][_0x3dbe4f(0x162)][_0x3dbe4f(0x303)][_0x3dbe4f(0x15a)];},Window_MenuCommand[_0x10bfc3(0x280)][_0x10bfc3(0x208)]=function(_0x116da8){const _0x4df58a=_0x10bfc3,_0x117e36=this[_0x4df58a(0x2aa)](_0x116da8);if(_0x117e36===_0x4df58a(0x176))this[_0x4df58a(0x178)](_0x116da8);else _0x117e36==='icon'?this[_0x4df58a(0x2da)](_0x116da8):Window_Command[_0x4df58a(0x280)]['drawItem'][_0x4df58a(0x1de)](this,_0x116da8);},Window_MenuCommand[_0x10bfc3(0x280)]['commandStyle']=function(){const _0x1cb251=_0x10bfc3;return VisuMZ['MainMenuCore']['Settings'][_0x1cb251(0x303)][_0x1cb251(0x2df)];},Window_MenuCommand[_0x10bfc3(0x280)]['commandStyleCheck']=function(_0x184a92){const _0x468e9b=_0x10bfc3,_0x3945a0=this[_0x468e9b(0x288)]();if(_0x3945a0!==_0x468e9b(0x27b)){if(_0x468e9b(0x277)!==_0x468e9b(0x277))this['makeMainMenuCoreCommandList']();else return _0x3945a0;}else{if(_0x468e9b(0x2dd)===_0x468e9b(0x2dd)){const _0x4f11ed=this['commandName'](_0x184a92);if(_0x4f11ed[_0x468e9b(0x1ed)](/\\I\[(\d+)\]/i)){if('lglGt'===_0x468e9b(0x2ea)){const _0x581a9d=_0x339f0b(_0x477ef7['$1']);_0x581a9d<_0x3be8ce?(_0x1b5f0d('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x732d5c,_0x581a9d,_0x50aae7)),_0x42ade5[_0x468e9b(0x1a0)]()):_0x5508de=_0x4aac9[_0x468e9b(0x1b7)](_0x581a9d,_0x4956c5);}else{const _0x18e0a3=this[_0x468e9b(0x2c7)](_0x184a92),_0x3700ce=this[_0x468e9b(0x2fa)](_0x4f11ed)[_0x468e9b(0x17f)];if(_0x3700ce<=_0x18e0a3['width']){if(_0x468e9b(0x23e)===_0x468e9b(0x23e))return _0x468e9b(0x176);else{const _0x146ebd=this[_0x468e9b(0x157)]();this[_0x468e9b(0x1d6)]=this[_0x468e9b(0x2d4)]()?new _0xdcfc82(_0x146ebd):new _0x369d73(_0x146ebd),this[_0x468e9b(0x1b0)](this[_0x468e9b(0x1d6)]);}}else return'icon';}}else return'text';}else{if(this['_duration']>0x0){const _0x25ce24=this['_duration'];this['x']=(this['x']*(_0x25ce24-0x1)+this[_0x468e9b(0x1f5)])/_0x25ce24,this['y']=(this['y']*(_0x25ce24-0x1)+this[_0x468e9b(0x218)])/_0x25ce24;}}}},Window_MenuCommand['prototype'][_0x10bfc3(0x178)]=function(_0x359eb2){const _0x169c2c=_0x10bfc3,_0x329c86=this[_0x169c2c(0x2c7)](_0x359eb2),_0x3a45df=this[_0x169c2c(0x2a2)](_0x359eb2),_0x334b7=this['textSizeEx'](_0x3a45df)['width'];this[_0x169c2c(0x1df)](this[_0x169c2c(0x24d)](_0x359eb2));let _0x499c39=this[_0x169c2c(0x192)]();if(_0x499c39==='right')this['drawTextEx'](_0x3a45df,_0x329c86['x']+_0x329c86[_0x169c2c(0x17f)]-_0x334b7,_0x329c86['y'],_0x334b7);else{if(_0x499c39==='center'){if(_0x169c2c(0x15f)===_0x169c2c(0x286))return _0x30331e[_0x169c2c(0x193)][_0x169c2c(0x20b)]['call'](this);else{const _0x4eee35=_0x329c86['x']+Math[_0x169c2c(0x1cf)]((_0x329c86[_0x169c2c(0x17f)]-_0x334b7)/0x2);this['drawTextEx'](_0x3a45df,_0x4eee35,_0x329c86['y'],_0x334b7);}}else this[_0x169c2c(0x156)](_0x3a45df,_0x329c86['x'],_0x329c86['y'],_0x334b7);}},Window_MenuCommand[_0x10bfc3(0x280)]['drawItemStyleIcon']=function(_0x5b996e){const _0x1be514=_0x10bfc3;this[_0x1be514(0x2a2)](_0x5b996e)[_0x1be514(0x1ed)](/\\I\[(\d+)\]/i);const _0x1af9ec=Number(RegExp['$1']),_0x1ee939=this[_0x1be514(0x2c7)](_0x5b996e),_0x52a93e=_0x1ee939['x']+Math[_0x1be514(0x1cf)]((_0x1ee939['width']-ImageManager[_0x1be514(0x1e0)])/0x2),_0x50c6a7=_0x1ee939['y']+(_0x1ee939[_0x1be514(0x243)]-ImageManager[_0x1be514(0x1e3)])/0x2;this[_0x1be514(0x301)](_0x1af9ec,_0x52a93e,_0x50c6a7);},VisuMZ['MainMenuCore']['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0x10bfc3(0x280)][_0x10bfc3(0x264)],Window_StatusBase[_0x10bfc3(0x280)]['loadFaceImages']=function(){const _0x30571b=_0x10bfc3;VisuMZ[_0x30571b(0x193)][_0x30571b(0x195)][_0x30571b(0x1de)](this),this[_0x30571b(0x1f0)]();},Window_StatusBase[_0x10bfc3(0x280)][_0x10bfc3(0x1f0)]=function(){const _0x3bbf50=_0x10bfc3;for(const _0x1f094b of $gameParty['members']()){if(_0x3bbf50(0x1db)!=='kyuvn'){if(!_0x1f094b)continue;_0x1f094b[_0x3bbf50(0x204)]()&&ImageManager[_0x3bbf50(0x253)](_0x1f094b[_0x3bbf50(0x204)]()),_0x1f094b[_0x3bbf50(0x154)]()&&ImageManager['loadSvActor'](_0x1f094b['battlerName']()),_0x1f094b[_0x3bbf50(0x21e)]()&&ImageManager['loadPicture'](_0x1f094b['getMenuImage']());}else return'icon';}},Window_StatusBase[_0x10bfc3(0x280)]['graphicType']=function(){const _0x29c857=_0x10bfc3;return VisuMZ[_0x29c857(0x193)][_0x29c857(0x162)][_0x29c857(0x290)];},Window_StatusBase[_0x10bfc3(0x280)][_0x10bfc3(0x1e1)]=function(_0x3d476b,_0x312b4d,_0x45d71c,_0x3ebfec,_0x38ac19){const _0x46ae1f=_0x10bfc3;_0x3ebfec=_0x3ebfec||ImageManager[_0x46ae1f(0x217)],_0x38ac19=_0x38ac19||ImageManager['faceHeight'];const _0x5c8aa9=ImageManager[_0x46ae1f(0x217)],_0x17b693=_0x38ac19-0x2,_0x3a09bf=_0x312b4d+Math[_0x46ae1f(0x1cf)]((_0x3ebfec-_0x5c8aa9)/0x2);this['constructor']===Window_MenuStatus&&(_0x46ae1f(0x1e7)!==_0x46ae1f(0x1e7)?(_0x23ee59=_0x143da8(_0x455e0b['$1']),_0x55871d=_0x10d494[_0x46ae1f(0x297)](/\\I\[(\d+)\]/i,'')[_0x46ae1f(0x251)]()):this[_0x46ae1f(0x1df)](_0x3d476b['isBattleMember']())),this[_0x46ae1f(0x174)](_0x3d476b,_0x3a09bf,_0x45d71c,_0x5c8aa9,_0x17b693),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x10bfc3(0x280)][_0x10bfc3(0x2f1)]=function(_0x2ebdfd,_0x451668,_0x3d5001,_0x1baa02,_0x531630){const _0x327b28=_0x10bfc3;_0x1baa02=_0x1baa02||ImageManager[_0x327b28(0x217)],_0x531630=_0x531630||ImageManager[_0x327b28(0x2cd)];const _0x15c2db=_0x2ebdfd[_0x327b28(0x204)](),_0x1c1165=_0x2ebdfd[_0x327b28(0x216)](),_0x461983=ImageManager[_0x327b28(0x253)](_0x15c2db),_0x2be2c5=ImageManager[_0x327b28(0x18b)](_0x15c2db),_0x2746e5=_0x461983[_0x327b28(0x17f)]/(_0x2be2c5?0x3:0xc),_0x3ca363=_0x461983['height']/(_0x2be2c5?0x4:0x8),_0x551069=_0x1baa02,_0x310c36=_0x531630-0x2,_0x5260e9=_0x451668+Math[_0x327b28(0x1cf)](_0x551069/0x2),_0x2c3cd3=_0x3d5001+Math['ceil']((_0x531630+_0x3ca363)/0x2);this[_0x327b28(0x1d3)]===Window_MenuStatus&&this[_0x327b28(0x1df)](_0x2ebdfd[_0x327b28(0x232)]());const _0x4261f9=Math[_0x327b28(0x1ca)](_0x1baa02,_0x2746e5),_0x4331f0=Math[_0x327b28(0x1ca)](_0x531630,_0x3ca363),_0x5f37a8=Math[_0x327b28(0x1cf)](_0x451668+Math['max'](_0x1baa02-_0x2746e5,0x0)/0x2),_0x46b615=Math[_0x327b28(0x1cf)](_0x3d5001+Math[_0x327b28(0x1b7)](_0x531630-_0x3ca363,0x0)/0x2),_0x5d6363=_0x2be2c5?0x0:_0x1c1165,_0x39d6a2=(_0x5d6363%0x4*0x3+0x1)*_0x2746e5,_0x2ca73f=Math[_0x327b28(0x1cf)](_0x5d6363/0x4)*0x4*_0x3ca363;this[_0x327b28(0x311)][_0x327b28(0x16c)](_0x461983,_0x39d6a2,_0x2ca73f,_0x4261f9,_0x4331f0,_0x5f37a8,_0x46b615),this[_0x327b28(0x1df)](!![]);},Window_StatusBase[_0x10bfc3(0x280)][_0x10bfc3(0x24c)]=function(_0x2643a1,_0x39962b,_0x171ef3,_0x11a503,_0x7bc590){const _0x2b8598=_0x10bfc3;_0x11a503=_0x11a503||ImageManager[_0x2b8598(0x217)],_0x7bc590=_0x7bc590||ImageManager[_0x2b8598(0x2cd)];const _0x397014=ImageManager[_0x2b8598(0x2bb)](_0x2643a1[_0x2b8598(0x154)]()),_0x3e4c5c=_0x397014[_0x2b8598(0x17f)]/ImageManager[_0x2b8598(0x1b5)],_0x4540a6=_0x397014[_0x2b8598(0x243)]/ImageManager['svActorVertCells'],_0x469123=_0x11a503,_0x369b32=_0x7bc590-0x2,_0x3eee75=_0x39962b+Math['floor'](_0x469123/0x2),_0x4877df=_0x171ef3+Math[_0x2b8598(0x26e)]((_0x7bc590+_0x4540a6)/0x2);this[_0x2b8598(0x1d3)]===Window_MenuStatus&&this[_0x2b8598(0x1df)](_0x2643a1['isBattleMember']());const _0x36c460=_0x2643a1[_0x2b8598(0x191)]&&_0x2643a1[_0x2b8598(0x191)](),_0x548849=0x0,_0x2a5cc3=0x0,_0x367ca8=_0x36c460?_0x397014[_0x2b8598(0x17f)]:_0x3e4c5c,_0x2172ac=_0x36c460?_0x397014['height']:_0x4540a6,_0x53ff47=Math[_0x2b8598(0x1ca)](0x1,_0x11a503/_0x367ca8,_0x7bc590/_0x2172ac),_0x439308=_0x53ff47*_0x367ca8,_0x2e95e4=_0x53ff47*_0x2172ac,_0x535018=Math[_0x2b8598(0x1cf)](_0x39962b+Math['max'](_0x11a503-_0x439308,0x0)/0x2),_0x5b58e5=Math[_0x2b8598(0x1cf)](_0x171ef3+Math[_0x2b8598(0x1b7)](_0x7bc590-_0x2e95e4,0x0)/0x2);this[_0x2b8598(0x311)][_0x2b8598(0x16c)](_0x397014,_0x548849,_0x2a5cc3,_0x367ca8,_0x2172ac,_0x535018,_0x5b58e5,_0x439308,_0x2e95e4),this[_0x2b8598(0x1df)](!![]);},Window_StatusBase[_0x10bfc3(0x280)]['drawItemActorMenuImage']=function(_0xce078b,_0x45a9d6,_0x3535ad,_0x18ed67,_0x29b3ba){const _0x2229a3=_0x10bfc3,_0x308bfa=ImageManager['loadPicture'](_0xce078b[_0x2229a3(0x21e)]());_0x18ed67=(_0x18ed67||ImageManager['faceWidth'])-0x2,_0x29b3ba=(_0x29b3ba||ImageManager['faceHeight'])-0x2;const _0x1370a8=_0x308bfa[_0x2229a3(0x17f)],_0x17f4e1=_0x308bfa[_0x2229a3(0x243)],_0x355ef4=_0x18ed67,_0x55d685=_0x29b3ba-0x2,_0x44ef03=_0x45a9d6+Math[_0x2229a3(0x1cf)](_0x355ef4/0x2),_0x29d2d6=_0x3535ad+Math['ceil']((_0x29b3ba+_0x17f4e1)/0x2);if(this[_0x2229a3(0x1d3)]===Window_MenuStatus){if('lFbRD'==='lFbRD')this[_0x2229a3(0x1df)](_0xce078b['isBattleMember']());else{const _0x4b1bbd=this[_0x2229a3(0x164)](),_0x5e922f=this[_0x2229a3(0x2a4)](0x1,![]),_0x337685=_0x3e675d[_0x2229a3(0x30b)]-_0x4b1bbd,_0x7273d=this[_0x2229a3(0x155)]()-_0x5e922f;return new _0x2828f0(_0x337685,_0x7273d,_0x4b1bbd,_0x5e922f);}}const _0x2e66a1=Math[_0x2229a3(0x1ca)](_0x18ed67,_0x1370a8),_0xef138=Math[_0x2229a3(0x1ca)](_0x29b3ba,_0x17f4e1),_0x3e026d=_0x45a9d6+0x1,_0x166780=Math['max'](_0x3535ad+0x1,_0x3535ad+_0x55d685-_0x17f4e1+0x3);let _0x37d561=Math[_0x2229a3(0x2bc)]((_0x1370a8-_0x2e66a1)/0x2),_0x3be0ad=Math[_0x2229a3(0x2bc)]((_0x17f4e1-_0xef138)/0x2);_0x37d561-=_0xce078b[_0x2229a3(0x1c1)](),_0x3be0ad-=_0xce078b[_0x2229a3(0x1a4)]();if(Imported[_0x2229a3(0x222)]){if(VisuMZ[_0x2229a3(0x282)][_0x2229a3(0x162)]['QoL'][_0x2229a3(0x1ea)]){}}this[_0x2229a3(0x311)][_0x2229a3(0x16c)](_0x308bfa,_0x37d561,_0x3be0ad,_0x2e66a1,_0xef138,_0x3e026d,_0x166780),this[_0x2229a3(0x1df)](!![]);},Window_Status[_0x10bfc3(0x280)][_0x10bfc3(0x174)]=function(_0x9d705e,_0x916d5,_0x293ff3,_0x10b65c,_0x77ecf4){const _0x437397=_0x10bfc3;switch(this[_0x437397(0x295)]()){case _0x437397(0x236):break;case _0x437397(0x150):this[_0x437397(0x2f1)](_0x9d705e,_0x916d5,_0x293ff3,_0x10b65c,_0x77ecf4);break;case'svbattler':this['drawItemActorSvBattler'](_0x9d705e,_0x916d5,_0x293ff3,_0x10b65c,_0x77ecf4);break;default:Window_StatusBase['prototype'][_0x437397(0x174)][_0x437397(0x1de)](this,_0x9d705e,_0x916d5,_0x293ff3,_0x10b65c,_0x77ecf4);break;}},VisuMZ[_0x10bfc3(0x193)][_0x10bfc3(0x27c)]=Window_MenuStatus['prototype'][_0x10bfc3(0x18a)],Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x18a)]=function(){const _0xc1719=_0x10bfc3;VisuMZ[_0xc1719(0x193)]['Settings']['General'][_0xc1719(0x2cc)]?VisuMZ[_0xc1719(0x193)][_0xc1719(0x27c)]['call'](this):this[_0xc1719(0x17a)](0x0);},VisuMZ[_0x10bfc3(0x193)]['Window_MenuStatus_maxItems']=Window_MenuStatus['prototype'][_0x10bfc3(0x17d)],Window_MenuStatus['prototype'][_0x10bfc3(0x17d)]=function(){const _0x8b3007=_0x10bfc3;return this['showOnlyBattleMembers']()?$gameParty[_0x8b3007(0x259)]()[_0x8b3007(0x2bf)]:VisuMZ[_0x8b3007(0x193)][_0x8b3007(0x20b)][_0x8b3007(0x1de)](this);},Window_MenuStatus[_0x10bfc3(0x280)]['showOnlyBattleMembers']=function(){const _0x21f9ae=_0x10bfc3,_0x303881=VisuMZ[_0x21f9ae(0x193)][_0x21f9ae(0x162)]['General'];if(_0x303881['ShowReserve']===undefined)_0x303881[_0x21f9ae(0x28a)]=!![];const _0x55de57=SceneManager[_0x21f9ae(0x275)];if(!_0x303881[_0x21f9ae(0x28a)]){if(_0x303881[_0x21f9ae(0x21c)])return _0x55de57[_0x21f9ae(0x1d3)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x2ab)]=function(){const _0x5d34c8=_0x10bfc3,_0x4ea80c=SceneManager[_0x5d34c8(0x275)][_0x5d34c8(0x1d3)];if(_0x4ea80c===Scene_Menu){if(_0x5d34c8(0x263)!=='NWWCz'){const _0x280379=_0xd46f66[_0x5d34c8(0x193)]['Settings'][_0x5d34c8(0x303)][_0x5d34c8(0x221)],_0x1b4d98=_0x5dc77f[_0x5d34c8(0x30b)],_0x5487e7=_0x194219[_0x5d34c8(0x280)]['fittingHeight'](_0x280379),_0x27268d=0x0,_0x34fe09=_0x2507c6[_0x5d34c8(0x2bc)]((_0x30ab39[_0x5d34c8(0x17c)]-_0x5487e7)/0x2);return new _0xe912d3(_0x27268d,_0x34fe09,_0x1b4d98,_0x5487e7);}else return VisuMZ[_0x5d34c8(0x193)][_0x5d34c8(0x162)][_0x5d34c8(0x24f)];}else return VisuMZ[_0x5d34c8(0x193)][_0x5d34c8(0x162)][_0x5d34c8(0x2c3)];},Window_MenuStatus['prototype']['numVisibleRows']=function(){const _0x2041b9=_0x10bfc3,_0x17ec2d=this[_0x2041b9(0x2ab)]();switch(_0x17ec2d){case _0x2041b9(0x16e):case'portrait':return 0x1;case _0x2041b9(0x2ff):return 0x1;default:return $gameParty[_0x2041b9(0x2d1)]();}},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x1c6)]=function(){const _0x16d22b=_0x10bfc3,_0x369709=this[_0x16d22b(0x2ab)]();switch(_0x369709){case _0x16d22b(0x16e):case _0x16d22b(0x2ad):return $gameParty[_0x16d22b(0x2d1)]();default:return 0x1;}},VisuMZ[_0x10bfc3(0x193)]['Window_MenuStatus_itemHeight']=Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x187)],Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x187)]=function(){const _0x153a6d=_0x10bfc3,_0x4cc8aa=this[_0x153a6d(0x2ab)]();switch(_0x4cc8aa){case _0x153a6d(0x16e):case'portrait':case _0x153a6d(0x2ff):return this[_0x153a6d(0x271)];case'thin':return Window_Selectable[_0x153a6d(0x280)]['itemHeight'][_0x153a6d(0x1de)](this);case'thicker':return this['lineHeight']()*0x2+0x8;default:return VisuMZ[_0x153a6d(0x193)][_0x153a6d(0x266)][_0x153a6d(0x1de)](this);}},Window_MenuStatus['prototype'][_0x10bfc3(0x208)]=function(_0x461c44){const _0x5c7f5b=_0x10bfc3;this[_0x5c7f5b(0x2c9)](_0x461c44),this[_0x5c7f5b(0x1c7)](_0x461c44);},VisuMZ[_0x10bfc3(0x193)][_0x10bfc3(0x177)]=Window_MenuStatus['prototype']['drawItemImage'],Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x14f)]=function(_0x4a6f16,_0x4d3b32,_0x2f2265,_0x1cabf9,_0x5466f9){const _0x1cda62=_0x10bfc3;switch(this[_0x1cda62(0x295)]()){case _0x1cda62(0x236):break;case _0x1cda62(0x150):this['drawItemActorSprite'](_0x4a6f16,_0x4d3b32,_0x2f2265+0x1,_0x1cabf9,_0x5466f9-0x2);break;case _0x1cda62(0x2e6):this['drawItemActorSvBattler'](_0x4a6f16,_0x4d3b32,_0x2f2265+0x1,_0x1cabf9,_0x5466f9-0x2);break;default:this[_0x1cda62(0x1e1)](_0x4a6f16,_0x4d3b32,_0x2f2265,_0x1cabf9,_0x5466f9);break;}},Window_MenuStatus[_0x10bfc3(0x280)]['drawItemStatus']=function(_0x43a2f4){const _0x1fc777=_0x10bfc3;this[_0x1fc777(0x246)]();const _0x521bf4=this[_0x1fc777(0x1e9)](_0x43a2f4),_0x197166=this['itemRect'](_0x43a2f4),_0x42cd19=this['listStyle']();switch(_0x42cd19){case'vertical':this[_0x1fc777(0x1b3)](_0x521bf4,_0x197166);break;case _0x1fc777(0x2ad):this[_0x1fc777(0x291)](_0x521bf4,_0x197166);break;case _0x1fc777(0x2ff):this[_0x1fc777(0x1c9)](_0x521bf4,_0x197166);break;case _0x1fc777(0x28e):this[_0x1fc777(0x307)](_0x521bf4,_0x197166);break;case _0x1fc777(0x18c):this['drawItemStatusThickerStyle'](_0x521bf4,_0x197166);break;default:this[_0x1fc777(0x201)](_0x521bf4,_0x197166);break;}},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x1b3)]=function(_0x75c16,_0x50f380){const _0x32bd3b=_0x10bfc3;VisuMZ['MainMenuCore'][_0x32bd3b(0x162)][_0x32bd3b(0x205)][_0x32bd3b(0x299)]['call'](this,_0x75c16,_0x50f380);},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x291)]=function(_0x161fee,_0x2f4d07){const _0xa93bbf=_0x10bfc3;if(_0x161fee[_0xa93bbf(0x21e)]()!==''){const _0x2c18ac=ImageManager[_0xa93bbf(0x1d4)](_0x161fee['getMenuImage']());_0x2c18ac[_0xa93bbf(0x27a)](this[_0xa93bbf(0x169)][_0xa93bbf(0x2ca)](this,_0x161fee,_0x2f4d07));}else this[_0xa93bbf(0x1b3)](_0x161fee,_0x2f4d07);},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x169)]=function(_0x2e898a,_0x433061){const _0x3504d7=_0x10bfc3;VisuMZ['MainMenuCore'][_0x3504d7(0x162)][_0x3504d7(0x205)][_0x3504d7(0x1ff)]['call'](this,_0x2e898a,_0x433061);},Window_MenuStatus['prototype'][_0x10bfc3(0x1c9)]=function(_0x55ce89,_0x3b9736){const _0x59ef90=_0x10bfc3,_0x227fee=ImageManager[_0x59ef90(0x1d4)](_0x55ce89[_0x59ef90(0x21e)]());_0x227fee[_0x59ef90(0x27a)](this[_0x59ef90(0x1f6)][_0x59ef90(0x2ca)](this,_0x55ce89,_0x3b9736));},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x1f6)]=function(_0xe79fe1,_0xe419c2){const _0x3a6eea=_0x10bfc3;VisuMZ[_0x3a6eea(0x193)][_0x3a6eea(0x162)][_0x3a6eea(0x205)][_0x3a6eea(0x1f4)]['call'](this,_0xe79fe1,_0xe419c2);},Window_MenuStatus['prototype']['drawItemStatusThinStyle']=function(_0x4ca72b,_0x78e974){const _0x22597c=_0x10bfc3;VisuMZ[_0x22597c(0x193)][_0x22597c(0x162)][_0x22597c(0x205)][_0x22597c(0x2c0)][_0x22597c(0x1de)](this,_0x4ca72b,_0x78e974);},Window_MenuStatus[_0x10bfc3(0x280)]['drawItemStatusThickerStyle']=function(_0x387836,_0x6c9543){const _0x4e0877=_0x10bfc3;VisuMZ[_0x4e0877(0x193)][_0x4e0877(0x162)][_0x4e0877(0x205)][_0x4e0877(0x287)][_0x4e0877(0x1de)](this,_0x387836,_0x6c9543);},Window_MenuStatus['prototype'][_0x10bfc3(0x167)]=function(){const _0x4e158d=_0x10bfc3,_0x2bbc29=this[_0x4e158d(0x2ab)]();if(['thin',_0x4e158d(0x18c)]['includes'](_0x2bbc29))return![];return Window_StatusBase[_0x4e158d(0x280)]['isExpGaugeDrawn']['call'](this);},Window_MenuStatus[_0x10bfc3(0x280)][_0x10bfc3(0x201)]=function(_0x47afa1,_0x233d65){const _0x250737=_0x10bfc3;VisuMZ['MainMenuCore']['Settings'][_0x250737(0x205)][_0x250737(0x1a5)][_0x250737(0x1de)](this,_0x47afa1,_0x233d65);},Window_SkillStatus[_0x10bfc3(0x280)]['drawActorFace']=function(_0x1b676c,_0x14d435,_0x10de4c,_0x2ece65,_0x568320){const _0x9cc47b=_0x10bfc3;switch(this[_0x9cc47b(0x295)]()){case'none':break;case _0x9cc47b(0x150):this[_0x9cc47b(0x2f1)](_0x1b676c,_0x14d435,_0x10de4c,_0x2ece65,_0x568320);break;case _0x9cc47b(0x2e6):this[_0x9cc47b(0x24c)](_0x1b676c,_0x14d435,_0x10de4c,_0x2ece65,_0x568320);break;default:Window_StatusBase[_0x9cc47b(0x280)][_0x9cc47b(0x174)]['call'](this,_0x1b676c,_0x14d435,_0x10de4c,_0x2ece65,_0x568320);break;}},Window_EquipStatus[_0x10bfc3(0x280)][_0x10bfc3(0x174)]=function(_0x992428,_0x49a46b,_0x3490ab,_0x40aa98,_0x2b3fd9){const _0x4261ed=_0x10bfc3;switch(this[_0x4261ed(0x295)]()){case'none':break;case _0x4261ed(0x150):this['drawItemActorSprite'](_0x992428,_0x49a46b,_0x3490ab,_0x40aa98,_0x2b3fd9);break;case _0x4261ed(0x2e6):this['drawItemActorSvBattler'](_0x992428,_0x49a46b,_0x3490ab,_0x40aa98,_0x2b3fd9);break;default:Window_StatusBase[_0x4261ed(0x280)][_0x4261ed(0x174)]['call'](this,_0x992428,_0x49a46b,_0x3490ab,_0x40aa98,_0x2b3fd9);break;}};function Window_ThinGold(){const _0x1711d5=_0x10bfc3;this[_0x1711d5(0x1a1)](...arguments);}Window_ThinGold['prototype']=Object[_0x10bfc3(0x2e3)](Window_Gold[_0x10bfc3(0x280)]),Window_ThinGold[_0x10bfc3(0x280)][_0x10bfc3(0x1d3)]=Window_ThinGold,Window_ThinGold[_0x10bfc3(0x280)][_0x10bfc3(0x187)]=function(){const _0x250475=_0x10bfc3;return this[_0x250475(0x19c)]();},Window_ThinGold[_0x10bfc3(0x280)][_0x10bfc3(0x2f3)]=function(){const _0x286f1a=_0x10bfc3;return Window_Selectable[_0x286f1a(0x280)]['colSpacing'][_0x286f1a(0x1de)](this);};function Window_Playtime(){const _0x2b7f3a=_0x10bfc3;this[_0x2b7f3a(0x1a1)](...arguments);}Window_Playtime[_0x10bfc3(0x280)]=Object[_0x10bfc3(0x2e3)](Window_Selectable[_0x10bfc3(0x280)]),Window_Playtime[_0x10bfc3(0x280)][_0x10bfc3(0x1d3)]=Window_Playtime,Window_Playtime['prototype'][_0x10bfc3(0x1a1)]=function(_0x467663){const _0x272d3a=_0x10bfc3;this[_0x272d3a(0x25d)]=$gameSystem[_0x272d3a(0x15e)](),this[_0x272d3a(0x1cd)]=0x3c,Window_Selectable['prototype']['initialize'][_0x272d3a(0x1de)](this,_0x467663),this[_0x272d3a(0x2dc)]();},Window_Playtime[_0x10bfc3(0x280)]['itemHeight']=function(){const _0x5453fa=_0x10bfc3;return this[_0x5453fa(0x19c)]();},Window_Playtime[_0x10bfc3(0x280)][_0x10bfc3(0x19a)]=function(){const _0x5354eb=_0x10bfc3;Window_Selectable[_0x5354eb(0x280)][_0x5354eb(0x19a)][_0x5354eb(0x1de)](this),this[_0x5354eb(0x2b0)]();},Window_Playtime[_0x10bfc3(0x280)][_0x10bfc3(0x2b0)]=function(){const _0x4309e2=_0x10bfc3;if(this['_timer']-->0x0){if(this['_timer']<=0x0)this[_0x4309e2(0x2dc)]();}},Window_Playtime[_0x10bfc3(0x280)][_0x10bfc3(0x2dc)]=function(){const _0x4db1ae=_0x10bfc3;this[_0x4db1ae(0x1cd)]=0x3c;const _0x472b7c=this['itemLineRect'](0x0),_0x5bed5c=_0x472b7c['x'],_0x4fe633=_0x472b7c['y'],_0x2b6333=_0x472b7c['width'];this[_0x4db1ae(0x311)][_0x4db1ae(0x2af)](),this['drawTimeIcon'](_0x472b7c),this['drawTimeLabel'](_0x472b7c),this['drawPlaytime'](_0x472b7c);},Window_Playtime[_0x10bfc3(0x280)][_0x10bfc3(0x246)]=function(){const _0x12afa8=_0x10bfc3;Window_Selectable[_0x12afa8(0x280)][_0x12afa8(0x246)][_0x12afa8(0x1de)](this),this[_0x12afa8(0x311)][_0x12afa8(0x279)]=VisuMZ[_0x12afa8(0x193)][_0x12afa8(0x162)][_0x12afa8(0x281)][_0x12afa8(0x14e)];},Window_Playtime['prototype'][_0x10bfc3(0x1b4)]=function(_0x5546c5){const _0x16ce0f=_0x10bfc3;if(VisuMZ[_0x16ce0f(0x193)][_0x16ce0f(0x162)]['Playtime'][_0x16ce0f(0x249)]>0x0){const _0x2ad947=VisuMZ['MainMenuCore'][_0x16ce0f(0x162)][_0x16ce0f(0x281)][_0x16ce0f(0x249)],_0x258adb=_0x5546c5['y']+(this[_0x16ce0f(0x19c)]()-ImageManager[_0x16ce0f(0x1e3)])/0x2;this[_0x16ce0f(0x301)](_0x2ad947,_0x5546c5['x'],_0x258adb);const _0x3cafd7=ImageManager[_0x16ce0f(0x1e0)]+0x4;_0x5546c5['x']+=_0x3cafd7,_0x5546c5[_0x16ce0f(0x17f)]-=_0x3cafd7;}},Window_Playtime[_0x10bfc3(0x280)][_0x10bfc3(0x30e)]=function(_0x5419bb){const _0x44bb79=_0x10bfc3;this[_0x44bb79(0x246)](),this[_0x44bb79(0x21a)](ColorManager[_0x44bb79(0x225)]());const _0x121177=VisuMZ[_0x44bb79(0x193)][_0x44bb79(0x162)][_0x44bb79(0x281)][_0x44bb79(0x2f7)];this[_0x44bb79(0x2d0)](_0x121177,_0x5419bb['x'],_0x5419bb['y'],_0x5419bb[_0x44bb79(0x17f)],'left'),this['resetTextColor']();},Window_Playtime['prototype'][_0x10bfc3(0x17e)]=function(_0x24c67f){const _0x51b271=_0x10bfc3,_0x5d63b2=$gameSystem[_0x51b271(0x15e)]();this[_0x51b271(0x2d0)](_0x5d63b2,_0x24c67f['x'],_0x24c67f['y'],_0x24c67f['width'],'right');};function Window_MenuVariables(){const _0x4d4913=_0x10bfc3;this[_0x4d4913(0x1a1)](...arguments);}Window_MenuVariables['prototype']=Object[_0x10bfc3(0x2e3)](Window_Selectable[_0x10bfc3(0x280)]),Window_MenuVariables[_0x10bfc3(0x280)][_0x10bfc3(0x1d3)]=Window_MenuVariables,Window_MenuVariables['prototype'][_0x10bfc3(0x1a1)]=function(_0x33f555){const _0x52d115=_0x10bfc3;Window_Selectable[_0x52d115(0x280)]['initialize'][_0x52d115(0x1de)](this,_0x33f555),this[_0x52d115(0x2d3)]=VisuMZ[_0x52d115(0x193)][_0x52d115(0x162)][_0x52d115(0x30a)][_0x52d115(0x25c)],this['refresh']();},Window_MenuVariables[_0x10bfc3(0x280)][_0x10bfc3(0x187)]=function(){const _0x1aa24a=_0x10bfc3;return this[_0x1aa24a(0x19c)]();},Window_MenuVariables['prototype'][_0x10bfc3(0x1c6)]=function(){const _0x26418e=_0x10bfc3,_0x2fe810=SceneManager[_0x26418e(0x275)][_0x26418e(0x298)]();if(_0x2fe810===_0x26418e(0x2b5))return 0x1;else{if(_0x26418e(0x2fc)!=='RXJbK')return VisuMZ[_0x26418e(0x193)][_0x26418e(0x162)][_0x26418e(0x30a)][_0x26418e(0x25c)][_0x26418e(0x2bf)];else{const _0x39318e=this[_0x26418e(0x237)]();this[_0x26418e(0x1cb)]='',this[_0x26418e(0x2dc)](),this[_0x26418e(0x230)](0x0);this['_scrollDuration']>0x1&&(this['_scrollDuration']=0x1,this['updateSmoothScroll']());const _0x1c6c0d=_0x30929a[_0x26418e(0x1b7)](this[_0x26418e(0x1a3)](_0x39318e),0x0);this[_0x26418e(0x17a)](_0x1c6c0d),this['activate']();}}},Window_MenuVariables['prototype'][_0x10bfc3(0x246)]=function(){const _0xa90c3b=_0x10bfc3;Window_Selectable[_0xa90c3b(0x280)][_0xa90c3b(0x246)][_0xa90c3b(0x1de)](this),this[_0xa90c3b(0x311)][_0xa90c3b(0x279)]=VisuMZ[_0xa90c3b(0x193)][_0xa90c3b(0x162)][_0xa90c3b(0x30a)]['FontSize'],this[_0xa90c3b(0x21a)](ColorManager['systemColor']());},Window_MenuVariables[_0x10bfc3(0x280)]['maxItems']=function(){const _0x54d37c=_0x10bfc3;return this['_data'][_0x54d37c(0x2bf)];},Window_MenuVariables[_0x10bfc3(0x280)][_0x10bfc3(0x247)]=function(){const _0x59999d=_0x10bfc3,_0x5406d5=this['topIndex']();for(let _0x5d7d65=0x0;_0x5d7d65<this[_0x59999d(0x2b3)]();_0x5d7d65++){if(_0x59999d(0x284)!==_0x59999d(0x220)){const _0xa4c23c=_0x5406d5+_0x5d7d65;_0xa4c23c<this['maxItems']()&&(this['drawItemBackground'](_0xa4c23c),this[_0x59999d(0x208)](_0xa4c23c));}else this[_0x59999d(0x1a1)](...arguments);}},Window_MenuVariables[_0x10bfc3(0x280)][_0x10bfc3(0x2c5)]=function(_0x4f619d){},Window_MenuVariables[_0x10bfc3(0x280)][_0x10bfc3(0x208)]=function(_0x29269e){const _0x50323b=_0x10bfc3,_0x7197ae=this['_data'][_0x29269e];if(_0x7197ae<=0x0)return;if(!$dataSystem['variables'][_0x7197ae])return;const _0x228a39=this[_0x50323b(0x2c7)](_0x29269e);this['resetFontSettings']();let _0x646d95=0x0,_0x6be55c=$dataSystem[_0x50323b(0x28b)][_0x7197ae]['trim']();_0x6be55c[_0x50323b(0x1ed)](/\\I\[(\d+)\]/i)&&(_0x646d95=Number(RegExp['$1']),_0x6be55c=_0x6be55c[_0x50323b(0x297)](/\\I\[(\d+)\]/i,'')[_0x50323b(0x251)]());if(_0x646d95>0x0){if(_0x50323b(0x165)==='rTkwM'){const _0x3f42a1=this['topIndex']();for(let _0x34dfe3=0x0;_0x34dfe3<this[_0x50323b(0x2b3)]();_0x34dfe3++){const _0x10a44b=_0x3f42a1+_0x34dfe3;_0x10a44b<this['maxItems']()&&(this[_0x50323b(0x2c5)](_0x10a44b),this[_0x50323b(0x208)](_0x10a44b));}}else{const _0x3a7deb=_0x228a39['y']+(this[_0x50323b(0x19c)]()-ImageManager[_0x50323b(0x1e3)])/0x2;this[_0x50323b(0x301)](_0x646d95,_0x228a39['x'],_0x3a7deb);const _0x492c47=ImageManager['iconWidth']+0x4;_0x228a39['x']+=_0x492c47,_0x228a39[_0x50323b(0x17f)]-=_0x492c47;}}this['drawText'](_0x6be55c,_0x228a39['x'],_0x228a39['y'],_0x228a39[_0x50323b(0x17f)],_0x50323b(0x2b4)),this['changeTextColor'](ColorManager[_0x50323b(0x1fd)]()),this['drawText']($gameVariables[_0x50323b(0x158)](_0x7197ae),_0x228a39['x'],_0x228a39['y'],_0x228a39[_0x50323b(0x17f)],_0x50323b(0x25e));};