//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.21] [MainMenuCore]
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
 * Version 1.21: April 13, 2023
 * * Bug Fixes!
 * ** Multiple subcategories should now work properly. Fix made by Arisu.
 * 
 * Version 1.20: March 16, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Bestiary' command.
 * *** This is for the upcoming VisuStella MZ plugins.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'bestiary' option(s) and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.19: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'CG Gallery', 'Credits Page', and 'Patch Notes' command.
 * *** This is for the upcoming VisuStella MZ plugins.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'cgGallery', 'creditsPage', or
 *      'patchNotes' option(s) and click copy. Go to the target project's Main
 *      Menu Core's 'Command Window List' plugin parameter. Paste the command
 *      where you want it to go.
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
 * @parent General:struct
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments[1]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments[0];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"bestiary\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"10\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BestiaryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_Bestiary &&\\\\n    this.isBestiaryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBestiaryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBestiary();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"cgGallery\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"311\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.cgGalleryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CGGallery &&\\\\n    this.isCgGalleryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCgGalleryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCgGallery();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"creditsPage\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.CreditsPageMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CreditsPage &&\\\\n    this.isCreditsPageCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCreditsPageCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCreditsPage();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"patchNotes\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.PatchNotesMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_PatchNotes &&\\\\n    this.isPatchNotesCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isPatchNotesCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPatchNotes();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
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

const _0x5b52fc=_0x36d0;function _0x1443(){const _0x543262=['_commandWindow','General','addGameEndCommand','ARRAYNUM','hasStaticSvBattler','loadOtherActorImages','createActorMenuBackgroundImageSprite','ChangeActorMenuImageGroup','setHandler','FontSize','currentExt','addLoadListener','onBitmapLoad','_mainMenuCore','calcWindowHeight','forceHideMainMenuCommand','EnableJS','goldWindowRectTopStyle','characterIndex','_actorMenuBgSprite','save','MenuCommandForceShow','updateOpacity','forceHide','registerCommand','5sDTytY','ShowReserve','toUpperCase','drawItemStyleIcon','itemHeight','reserveCommonEvent','addWindow','commandName','commandNameWindowDrawText','MenuCommandForceDisable','forceShow','commandWindowRect','forceShowMainMenuCommand','SUBCATEGORY_LIST','statusWindowRectMobileStyle','windowPadding','push','6776340RnUdmp','parse','variableWindowRect','removeSubcategory','shift','Scene_Menu_commandPersonal','Window_StatusBase_loadFaceImages','Scene_MenuBase_createBackground','_subcategory','actor','addChild','ExtJS','changeTextColor','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ceil','boxHeight','clear','graphicType','ARRAYSTRUCT','variableWindowRectTopStyle','innerHeight','drawItemStatusSoloStyleOnLoad','findExt','update','drawItemBackground','height','version','ARRAYEVAL','listStyle','playtimeWindowRect','Scene_Menu_commandWindowRect','playtimeText','createVariableWindow','constructor','Game_Actor_setup','iconText','thinBottom','colSpacing','ARRAYJSON','resetTextColor','maxItems','svActorHorzCells','SoloStyle','adjustDefaultCommandWindowRect','Cols','MenuCommandClear','statusWindowRect','initialize','7sUNdIz','fittingHeight','_variableWindow','Game_System_initialize','prototype','50444lUmjLk','options','drawText','Scene_Menu_statusWindowRect','initMainMenuCore','Window_MenuCommand_initialize','description','drawItemStatusSoloStyle','status','variableWindowRectBottomStyle','ListStyles','Scene_MenuBase_updateActor','canCreatePlaytimeWindow','Time','call','isMainMenuCommandEnabled','trim','boxWidth','maxCols','commandFormation','_commandNameWindow','itemLineRect','open','canCreateVariableWindow','create','TextJS','drawPendingItemBackground','vertical','drawItemActorFace','drawItemStyleIconText','drawSvActor','goldWindowRectBottomStyle','variables','drawTimeLabel','Enable','commandNameWindowDrawBackground','thinTop','drawItemActorSprite','mainAreaHeight','commandWindowStyle','smoothSelect','mainCommandWidth','Settings','concat','resetFontSettings','blt','7576552atbyGo','currentSymbol','min','commandWindowRectBottomStyle','isCommandEnabled','updateDuration','statusWindowRectBottomStyle','drawItemStatus','isSubcategoryVisible','addMainCommands','createCommandWindow','characterName','match','makeMainMenuCoreCommandList','getMenuImageOffsetX','popScene','return\x200','Step1','max','name','right','JSON','_commandList','loadPicture','needsDummyWindow','forceDisableMainMenuCommand','setMenuImage','auto','commandWindowRectThinBottomStyle','value','activate','Step2','opacity','bind','ThinGoldWindow','formation','VarList','faceHeight','changePaintOpacity','round','mobile','_playtimeWindow','drawTextEx','PixelateImageRendering','item','Rows','commandStyleCheck','MenuCommandForceHide','solo','portrait','innerWidth','width','drawAllItems','isArray','Variable','156470FLLYkq','TextStr','PersonalHandlerJS','map','BgType','_actor','Window_MenuStatus_itemHeight','setBackgroundType','drawItemImage','commandWindowRectTopStyle','Step1End','MainMenuCore','applyThinnerGoldWindowRect','forceDisable','mainAreaTop','setTopRow','_menuImage','Symbol','commandPersonal','svActorVertCells','loadFaceImages','default','HideMainMenuOnly','members','adjustStatusWindowMobile','systemColor','format','thin','CoreEngine','getMainMenuSymbolState','createDummyWindow','getMenuImage','StatusSelectLast','_goldWindow','loadCharacter','drawItemActorMenuImage','WindowRect','commandNameWindowCenter','mainAreaBottom','clearShowMainMenuCommand','_statusWindow','subcategory','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','bitmap','refresh','remove','onPersonalCancel','mainMenuCoreSettings','12xIbZRk','callUpdateHelp','commandWindowRectMobileStyle','playtimeWindowRectBottomStyle','addCommand','Scene_Menu_createStatusWindow','CallHandlerJS','STR','drawItem','_scene','updateCommandNameWindow','_dummyWindow','createBackground','loadBitmap','setSubcategory','NUM','filter','includes','drawActorFace','sprite','Scene_Menu_onFormationCancel','_targetY','CommandWindowStyle','20158030cqJvMm','adjustCommandHeightByVariable','TextAlign','FUNC','Icon','left','ActorBgMenuJS','Window_MenuStatus_drawItemImage','_timer','isIncludedInSubcategory','addSymbolBridge','faceWidth','icon','addFormationCommand','isDisplayActorMenuBackgroundImage','Scene_Menu_goldWindowRect','EVAL','showOnlyBattleMembers','select','itemRect','updatePosition','ActorBgMenus','STRUCT','bottom','text','floor','isExpGaugeDrawn','isBattleMember','commandCommonEvent','doesSubcategoryExist','ConvertParams','thinGoldWindow','StatusListStyle','894047pKUDTf','\x5cI[%1]%2','CommandList','createStatusWindow','isMainMenuCommandVisible','isSoloQuickMode','forceEnable','top','svbattler','updateActor','_playtimeText','close','drawItemActorSvBattler','center','getMenuImageOffsetY','exit','goldWindowRect','index','PortraitStyle','cancel','numVisibleRows','AdjustCommandHeight','drawItemStatusThinStyle','_bitmapReady','QoL','addSaveCommand','selectLast','forceEnableMainMenuCommand','12110949IdbYXX','none','ChangeActorMenuImageRange','itemTextAlign','adjustCommandHeightByPlaytime','initMenuImage','setActor','iconWidth','drawItemStatusPortraitStyle','updateTimer','_data','addOptionsCommand','thicker','drawItemStatusPortraitStyleOnLoad','commandCancel','Symbols','Playtime','Scene_Menu_commandFormation','Subcategory','Step1Start','_duration','drawIcon','statusWindowRectTopStyle','drawItemStatusDefaultStyle','currentSubcategory','VerticalStyle','iconHeight','Style','fill','fontSize','playtimeWindowRectTopStyle','StatusGraphic','onFormationCancel','ThickerStyle','length','battlerName','contents','CustomCmdWin','makeCommandList','note','Scene_Menu_onPersonalCancel','maxBattleMembers','textSizeEx','drawTimeIcon','lineHeight','createGoldWindow','maxVisibleItems','MobileThickness','setup','replace','addOriginalCommands','Window_MenuStatus_selectLast','Window_MenuStatus_maxItems','loadSvActor'];_0x1443=function(){return _0x543262;};return _0x1443();}(function(_0x150df3,_0x4d9d12){const _0x55e297=_0x36d0,_0x2519c9=_0x150df3();while(!![]){try{const _0x527a77=-parseInt(_0x55e297(0x196))/0x1+parseInt(_0x55e297(0x12e))/0x2*(parseInt(_0x55e297(0x15e))/0x3)+parseInt(_0x55e297(0xc9))/0x4+parseInt(_0x55e297(0x201))/0x5*(-parseInt(_0x55e297(0x212))/0x6)+parseInt(_0x55e297(0xc4))/0x7*(-parseInt(_0x55e297(0xf7))/0x8)+parseInt(_0x55e297(0x1b2))/0x9+parseInt(_0x55e297(0x175))/0xa;if(_0x527a77===_0x4d9d12)break;else _0x2519c9['push'](_0x2519c9['shift']());}catch(_0x3db3fd){_0x2519c9['push'](_0x2519c9['shift']());}}}(_0x1443,0xaeedd));var label=_0x5b52fc(0x139),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5b52fc(0x16e)](function(_0x3dbd19){const _0xeb19e9=_0x5b52fc;return _0x3dbd19[_0xeb19e9(0xd1)]&&_0x3dbd19[_0xeb19e9(0xcf)][_0xeb19e9(0x16f)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5b52fc(0xf3)]||{},VisuMZ['ConvertParams']=function(_0x54a880,_0x352a5c){const _0x5d7c59=_0x5b52fc;for(const _0x1991a3 in _0x352a5c){if(_0x1991a3[_0x5d7c59(0x103)](/(.*):(.*)/i)){const _0x17e71c=String(RegExp['$1']),_0x4fbe2c=String(RegExp['$2'])[_0x5d7c59(0x203)]()['trim']();let _0x44ef89,_0x5e2e85,_0x44513b;switch(_0x4fbe2c){case _0x5d7c59(0x16d):_0x44ef89=_0x352a5c[_0x1991a3]!==''?Number(_0x352a5c[_0x1991a3]):0x0;break;case _0x5d7c59(0x1eb):_0x5e2e85=_0x352a5c[_0x1991a3]!==''?JSON['parse'](_0x352a5c[_0x1991a3]):[],_0x44ef89=_0x5e2e85[_0x5d7c59(0x131)](_0x3a1a6d=>Number(_0x3a1a6d));break;case _0x5d7c59(0x185):_0x44ef89=_0x352a5c[_0x1991a3]!==''?eval(_0x352a5c[_0x1991a3]):null;break;case _0x5d7c59(0xaf):_0x5e2e85=_0x352a5c[_0x1991a3]!==''?JSON['parse'](_0x352a5c[_0x1991a3]):[],_0x44ef89=_0x5e2e85[_0x5d7c59(0x131)](_0xceb4ce=>eval(_0xceb4ce));break;case _0x5d7c59(0x10c):_0x44ef89=_0x352a5c[_0x1991a3]!==''?JSON[_0x5d7c59(0x213)](_0x352a5c[_0x1991a3]):'';break;case _0x5d7c59(0xba):_0x5e2e85=_0x352a5c[_0x1991a3]!==''?JSON['parse'](_0x352a5c[_0x1991a3]):[],_0x44ef89=_0x5e2e85[_0x5d7c59(0x131)](_0x1c723f=>JSON['parse'](_0x1c723f));break;case _0x5d7c59(0x178):_0x44ef89=_0x352a5c[_0x1991a3]!==''?new Function(JSON[_0x5d7c59(0x213)](_0x352a5c[_0x1991a3])):new Function(_0x5d7c59(0x107));break;case'ARRAYFUNC':_0x5e2e85=_0x352a5c[_0x1991a3]!==''?JSON[_0x5d7c59(0x213)](_0x352a5c[_0x1991a3]):[],_0x44ef89=_0x5e2e85['map'](_0x141d76=>new Function(JSON[_0x5d7c59(0x213)](_0x141d76)));break;case _0x5d7c59(0x165):_0x44ef89=_0x352a5c[_0x1991a3]!==''?String(_0x352a5c[_0x1991a3]):'';break;case'ARRAYSTR':_0x5e2e85=_0x352a5c[_0x1991a3]!==''?JSON[_0x5d7c59(0x213)](_0x352a5c[_0x1991a3]):[],_0x44ef89=_0x5e2e85[_0x5d7c59(0x131)](_0x2fb6b3=>String(_0x2fb6b3));break;case _0x5d7c59(0x18b):_0x44513b=_0x352a5c[_0x1991a3]!==''?JSON[_0x5d7c59(0x213)](_0x352a5c[_0x1991a3]):{},_0x54a880[_0x17e71c]={},VisuMZ['ConvertParams'](_0x54a880[_0x17e71c],_0x44513b);continue;case _0x5d7c59(0x224):_0x5e2e85=_0x352a5c[_0x1991a3]!==''?JSON[_0x5d7c59(0x213)](_0x352a5c[_0x1991a3]):[],_0x44ef89=_0x5e2e85[_0x5d7c59(0x131)](_0x281745=>VisuMZ[_0x5d7c59(0x193)]({},JSON[_0x5d7c59(0x213)](_0x281745)));break;default:continue;}_0x54a880[_0x17e71c]=_0x44ef89;}}return _0x54a880;},(_0x962501=>{const _0x32f1b1=_0x5b52fc,_0x40199d=_0x962501['name'];for(const _0x21dcc8 of dependencies){if(!Imported[_0x21dcc8]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x32f1b1(0x148)](_0x40199d,_0x21dcc8)),SceneManager['exit']();break;}}const _0x393376=_0x962501[_0x32f1b1(0xcf)];if(_0x393376[_0x32f1b1(0x103)](/\[Version[ ](.*?)\]/i)){const _0x24ac5b=Number(RegExp['$1']);_0x24ac5b!==VisuMZ[label][_0x32f1b1(0xae)]&&(alert(_0x32f1b1(0x21f)[_0x32f1b1(0x148)](_0x40199d,_0x24ac5b)),SceneManager[_0x32f1b1(0x1a5)]());}if(_0x393376[_0x32f1b1(0x103)](/\[Tier[ ](\d+)\]/i)){const _0x4d5d95=Number(RegExp['$1']);_0x4d5d95<tier?(alert(_0x32f1b1(0x158)[_0x32f1b1(0x148)](_0x40199d,_0x4d5d95,tier)),SceneManager[_0x32f1b1(0x1a5)]()):tier=Math[_0x32f1b1(0x109)](_0x4d5d95,tier);}VisuMZ[_0x32f1b1(0x193)](VisuMZ[label][_0x32f1b1(0xf3)],_0x962501['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x5b52fc(0x1ef),_0x3232c9=>{const _0xb60268=_0x5b52fc;VisuMZ[_0xb60268(0x193)](_0x3232c9,_0x3232c9);const _0x190edf=_0x3232c9[_0xb60268(0x108)],_0x38b4df=_0x3232c9[_0xb60268(0x116)];for(let _0xebaa93 of _0x190edf){_0xebaa93=parseInt(_0xebaa93)||0x0;if(_0xebaa93<=0x0)continue;const _0x4b7fc4=$gameActors['actor'](_0xebaa93);if(!_0x4b7fc4)continue;_0x4b7fc4[_0xb60268(0x111)](_0x38b4df);}}),PluginManager[_0x5b52fc(0x200)](pluginData[_0x5b52fc(0x10a)],_0x5b52fc(0x1b4),_0x5165f7=>{const _0x24dec0=_0x5b52fc;VisuMZ[_0x24dec0(0x193)](_0x5165f7,_0x5165f7);const _0x5b859a=_0x5165f7[_0x24dec0(0x138)]>=_0x5165f7[_0x24dec0(0x1c5)]?_0x5165f7[_0x24dec0(0x1c5)]:_0x5165f7[_0x24dec0(0x138)],_0x317d62=_0x5165f7[_0x24dec0(0x138)]>=_0x5165f7[_0x24dec0(0x1c5)]?_0x5165f7['Step1End']:_0x5165f7['Step1Start'],_0x5d8400=Array(_0x317d62-_0x5b859a+0x1)[_0x24dec0(0x1ce)]()[_0x24dec0(0x131)]((_0x472098,_0x4fa99a)=>_0x5b859a+_0x4fa99a),_0x3243b2=_0x5165f7[_0x24dec0(0x116)];for(let _0x38b47a of _0x5d8400){_0x38b47a=parseInt(_0x38b47a)||0x0;if(_0x38b47a<=0x0)continue;const _0xd6751f=$gameActors[_0x24dec0(0x21b)](_0x38b47a);if(!_0xd6751f)continue;_0xd6751f['setMenuImage'](_0x3243b2);}}),PluginManager[_0x5b52fc(0x200)](pluginData[_0x5b52fc(0x10a)],'ChangeActorMenuImageJS',_0x10fb8c=>{const _0x5e2b71=_0x5b52fc;VisuMZ[_0x5e2b71(0x193)](_0x10fb8c,_0x10fb8c);const _0x39f3e3=_0x10fb8c[_0x5e2b71(0x108)];let _0xc3e2f8=[];while(_0x39f3e3['length']>0x0){const _0x1ec153=_0x39f3e3[_0x5e2b71(0x216)]();Array[_0x5e2b71(0x12c)](_0x1ec153)?_0xc3e2f8=_0xc3e2f8[_0x5e2b71(0xf4)](_0x1ec153):_0xc3e2f8['push'](_0x1ec153);}const _0x447e9a=_0x10fb8c['Step2'];for(let _0x358c9b of _0xc3e2f8){_0x358c9b=parseInt(_0x358c9b)||0x0;if(_0x358c9b<=0x0)continue;const _0x777960=$gameActors[_0x5e2b71(0x21b)](_0x358c9b);if(!_0x777960)continue;_0x777960[_0x5e2b71(0x111)](_0x447e9a);}}),PluginManager[_0x5b52fc(0x200)](pluginData[_0x5b52fc(0x10a)],_0x5b52fc(0xc1),_0x50b507=>{const _0x31690c=_0x5b52fc;VisuMZ[_0x31690c(0x193)](_0x50b507,_0x50b507);const _0x4bff2a=_0x50b507['Symbols']||[];for(const _0x5e6fb8 of _0x4bff2a){$gameSystem[_0x31690c(0x155)](_0x5e6fb8);}}),PluginManager[_0x5b52fc(0x200)](pluginData[_0x5b52fc(0x10a)],'MenuCommandForceEnable',_0x58a500=>{const _0x39a11f=_0x5b52fc;VisuMZ['ConvertParams'](_0x58a500,_0x58a500);const _0x1fcb8e=_0x58a500[_0x39a11f(0x1c1)]||[];for(const _0x13b4b9 of _0x1fcb8e){$gameSystem[_0x39a11f(0x1b1)](_0x13b4b9);}}),PluginManager[_0x5b52fc(0x200)](pluginData['name'],_0x5b52fc(0x20a),_0x202209=>{const _0x22363b=_0x5b52fc;VisuMZ[_0x22363b(0x193)](_0x202209,_0x202209);const _0x15263d=_0x202209[_0x22363b(0x1c1)]||[];for(const _0x56ed0f of _0x15263d){$gameSystem[_0x22363b(0x110)](_0x56ed0f);}}),PluginManager[_0x5b52fc(0x200)](pluginData[_0x5b52fc(0x10a)],_0x5b52fc(0x126),_0x268799=>{const _0x206997=_0x5b52fc;VisuMZ[_0x206997(0x193)](_0x268799,_0x268799);const _0x49ee65=_0x268799[_0x206997(0x1c1)]||[];for(const _0x12137c of _0x49ee65){$gameSystem[_0x206997(0x1f7)](_0x12137c);}}),PluginManager[_0x5b52fc(0x200)](pluginData[_0x5b52fc(0x10a)],_0x5b52fc(0x1fd),_0x439dfa=>{const _0x923380=_0x5b52fc;VisuMZ[_0x923380(0x193)](_0x439dfa,_0x439dfa);const _0x282f16=_0x439dfa['Symbols']||[];for(const _0x5b9a6d of _0x282f16){$gameSystem[_0x923380(0x20d)](_0x5b9a6d);}}),VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0xc7)]=Game_System[_0x5b52fc(0xc8)][_0x5b52fc(0xc3)],Game_System['prototype'][_0x5b52fc(0xc3)]=function(){const _0x180e1c=_0x5b52fc;VisuMZ[_0x180e1c(0x139)]['Game_System_initialize'][_0x180e1c(0xd7)](this),this[_0x180e1c(0xcd)]();},Game_System[_0x5b52fc(0xc8)][_0x5b52fc(0xcd)]=function(){const _0x126f14=_0x5b52fc;this[_0x126f14(0x1f5)]=this[_0x126f14(0x1f5)]||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x5b52fc(0xc8)]['mainMenuCoreSettings']=function(){const _0x3dc6a0=_0x5b52fc;if(this['_mainMenuCore']===undefined)this[_0x3dc6a0(0xcd)]();const _0x4323ed=['forceShow',_0x3dc6a0(0x1ff),_0x3dc6a0(0x19c),'forceDisable'];for(const _0xf6871b of _0x4323ed){this[_0x3dc6a0(0x1f5)][_0xf6871b]=this[_0x3dc6a0(0x1f5)][_0xf6871b]||[];}return this[_0x3dc6a0(0x1f5)];},Game_System['prototype'][_0x5b52fc(0x14b)]=function(_0x1acaa6,_0x29a3a3){const _0x513ba3=_0x5b52fc,_0x3b140b=this[_0x513ba3(0x15d)]();if(!_0x3b140b[_0x29a3a3])return![];return _0x3b140b[_0x29a3a3][_0x513ba3(0x16f)](_0x1acaa6);},Game_System[_0x5b52fc(0xc8)]['clearShowMainMenuCommand']=function(_0x3ffeff){const _0x28c869=_0x5b52fc,_0x2341bf=this[_0x28c869(0x15d)](),_0x40f39a=[_0x28c869(0x20b),_0x28c869(0x1ff),_0x28c869(0x19c),_0x28c869(0x13b)];for(const _0x1ffca3 of _0x40f39a){_0x2341bf[_0x1ffca3][_0x28c869(0x15b)](_0x3ffeff);}},Game_System[_0x5b52fc(0xc8)][_0x5b52fc(0x20d)]=function(_0x42cecf){const _0xe88834=_0x5b52fc,_0x2f040d=this[_0xe88834(0x15d)]();!_0x2f040d[_0xe88834(0x20b)][_0xe88834(0x16f)](_0x42cecf)&&_0x2f040d['forceShow'][_0xe88834(0x211)](_0x42cecf),_0x2f040d['forceHide'][_0xe88834(0x15b)](_0x42cecf);},Game_System['prototype'][_0x5b52fc(0x1f7)]=function(_0x340705){const _0x154d2b=_0x5b52fc,_0x1611a1=this[_0x154d2b(0x15d)]();!_0x1611a1[_0x154d2b(0x1ff)][_0x154d2b(0x16f)](_0x340705)&&_0x1611a1[_0x154d2b(0x1ff)][_0x154d2b(0x211)](_0x340705),_0x1611a1[_0x154d2b(0x20b)]['remove'](_0x340705);},Game_System[_0x5b52fc(0xc8)]['forceEnableMainMenuCommand']=function(_0x3a61dd){const _0x2500e6=_0x5b52fc,_0x3a567a=this[_0x2500e6(0x15d)]();!_0x3a567a['forceEnable']['includes'](_0x3a61dd)&&_0x3a567a['forceEnable']['push'](_0x3a61dd),_0x3a567a[_0x2500e6(0x13b)][_0x2500e6(0x15b)](_0x3a61dd);},Game_System[_0x5b52fc(0xc8)]['forceDisableMainMenuCommand']=function(_0x10d0be){const _0x38b1fc=_0x5b52fc,_0x2c36e8=this[_0x38b1fc(0x15d)]();!_0x2c36e8[_0x38b1fc(0x13b)][_0x38b1fc(0x16f)](_0x10d0be)&&_0x2c36e8[_0x38b1fc(0x13b)][_0x38b1fc(0x211)](_0x10d0be),_0x2c36e8[_0x38b1fc(0x19c)][_0x38b1fc(0x15b)](_0x10d0be);},VisuMZ[_0x5b52fc(0x139)]['Game_Actor_setup']=Game_Actor[_0x5b52fc(0xc8)]['setup'],Game_Actor[_0x5b52fc(0xc8)][_0x5b52fc(0x1e2)]=function(_0x379c0f){const _0x529b89=_0x5b52fc;VisuMZ[_0x529b89(0x139)][_0x529b89(0xb6)]['call'](this,_0x379c0f),this[_0x529b89(0x1b7)]();},Game_Actor[_0x5b52fc(0xc8)][_0x5b52fc(0x1b7)]=function(){const _0x3511e2=_0x5b52fc;this[_0x3511e2(0x13e)]='',this[_0x3511e2(0x21b)]()&&this[_0x3511e2(0x21b)]()[_0x3511e2(0x1d9)]['match'](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x3511e2(0x13e)]=String(RegExp['$1']));},Game_Actor[_0x5b52fc(0xc8)][_0x5b52fc(0x14d)]=function(){const _0x2ed85c=_0x5b52fc;if(this[_0x2ed85c(0x13e)]===undefined)this[_0x2ed85c(0x1b7)]();return this['_menuImage'];},Game_Actor[_0x5b52fc(0xc8)]['setMenuImage']=function(_0x4ebf04){const _0x1cc6be=_0x5b52fc;if(this['_menuImage']===undefined)this[_0x1cc6be(0x1b7)]();this[_0x1cc6be(0x13e)]=_0x4ebf04;},Game_Actor['prototype'][_0x5b52fc(0x105)]=function(){const _0x22ec34=_0x5b52fc;if(this[_0x22ec34(0x21b)]()[_0x22ec34(0x1d9)][_0x22ec34(0x103)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()[_0x22ec34(0x1d9)][_0x22ec34(0x103)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x5b52fc(0xc8)][_0x5b52fc(0x1a4)]=function(){const _0xb74080=_0x5b52fc;if(this[_0xb74080(0x21b)]()[_0xb74080(0x1d9)][_0xb74080(0x103)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0xb74080(0x21b)]()[_0xb74080(0x1d9)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x5b52fc(0xc8)][_0x5b52fc(0x183)]=function(){const _0x360891=_0x5b52fc;return VisuMZ['MainMenuCore']['Settings'][_0x360891(0x1e9)][_0x360891(0x18a)][_0x360891(0x16f)](this[_0x360891(0xb5)][_0x360891(0x10a)]);},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x219)]=Scene_MenuBase[_0x5b52fc(0xc8)][_0x5b52fc(0x16a)],Scene_MenuBase[_0x5b52fc(0xc8)][_0x5b52fc(0x16a)]=function(){const _0x3846fb=_0x5b52fc;VisuMZ['MainMenuCore']['Scene_MenuBase_createBackground'][_0x3846fb(0xd7)](this),this[_0x3846fb(0x1ee)]();},Scene_MenuBase[_0x5b52fc(0xc8)][_0x5b52fc(0x1ee)]=function(){const _0x1367e7=_0x5b52fc;this[_0x1367e7(0x1fb)]=new Sprite_MenuBackgroundActor(),this[_0x1367e7(0x21c)](this[_0x1367e7(0x1fb)]);},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0xd4)]=Scene_MenuBase[_0x5b52fc(0xc8)]['updateActor'],Scene_MenuBase[_0x5b52fc(0xc8)][_0x5b52fc(0x19f)]=function(){const _0x1f10b8=_0x5b52fc;VisuMZ[_0x1f10b8(0x139)]['Scene_MenuBase_updateActor'][_0x1f10b8(0xd7)](this),this[_0x1f10b8(0x183)]()&&this[_0x1f10b8(0x1fb)]&&this[_0x1f10b8(0x1fb)][_0x1f10b8(0x1b8)](this['_actor']);},VisuMZ[_0x5b52fc(0x139)]['Scene_Menu_create']=Scene_Menu[_0x5b52fc(0xc8)]['create'],Scene_Menu[_0x5b52fc(0xc8)]['create']=function(){const _0x40fb09=_0x5b52fc;VisuMZ['MainMenuCore']['Scene_Menu_create']['call'](this),this['createPlaytimeWindow'](),this[_0x40fb09(0xb4)](),this[_0x40fb09(0x14c)]();},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x101)]=function(){const _0x368f1f=_0x5b52fc,_0x2073dd=this[_0x368f1f(0x20c)](),_0x907961=new Window_MenuCommand(_0x2073dd);_0x907961[_0x368f1f(0x1f0)](_0x368f1f(0x1a9),this[_0x368f1f(0x1c0)][_0x368f1f(0x118)](this)),this[_0x368f1f(0x207)](_0x907961),this[_0x368f1f(0x1e8)]=_0x907961;},VisuMZ['MainMenuCore'][_0x5b52fc(0xb2)]=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x20c)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x20c)]=function(){const _0x583439=_0x5b52fc,_0x285964=this[_0x583439(0xf0)]();if(_0x285964===_0x583439(0x19d))return this[_0x583439(0x137)]();else{if(_0x285964==='thinTop')return this['commandWindowRectThinTopStyle']();else{if(_0x285964===_0x583439(0x18c))return this[_0x583439(0xfa)]();else{if(_0x285964==='thinBottom')return this[_0x583439(0x113)]();else{if(_0x285964===_0x583439(0x11f))return this[_0x583439(0x160)]();else{const _0x47d681=VisuMZ[_0x583439(0x139)][_0x583439(0xb2)][_0x583439(0xd7)](this);return this[_0x583439(0xbf)](_0x47d681),_0x47d681;}}}}}},Scene_Menu[_0x5b52fc(0xc8)]['adjustDefaultCommandWindowRect']=function(_0x21803c){const _0x1f0fbd=_0x5b52fc;this['adjustCommandHeightByPlaytime']()&&(_0x21803c[_0x1f0fbd(0xad)]-=this[_0x1f0fbd(0xb1)]()['height']),this[_0x1f0fbd(0x176)]()&&(_0x21803c[_0x1f0fbd(0xad)]-=this[_0x1f0fbd(0x214)]()['height']);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x137)]=function(){const _0x28fccd=_0x5b52fc,_0xa92217=VisuMZ[_0x28fccd(0x139)][_0x28fccd(0xf3)]['CustomCmdWin'][_0x28fccd(0x124)],_0x269d62=Graphics[_0x28fccd(0xda)],_0x5b76de=this[_0x28fccd(0x1f6)](_0xa92217,!![]),_0x269690=0x0,_0x2e7729=this['mainAreaTop']();return new Rectangle(_0x269690,_0x2e7729,_0x269d62,_0x5b76de);},Scene_Menu[_0x5b52fc(0xc8)]['commandWindowRectThinTopStyle']=function(){const _0x3916f4=_0x5b52fc,_0x3841e8=VisuMZ[_0x3916f4(0x139)][_0x3916f4(0xf3)][_0x3916f4(0x1d7)][_0x3916f4(0x124)],_0x434ba3=Graphics[_0x3916f4(0xda)],_0x424210=this[_0x3916f4(0x1f6)](0x1,!![]),_0x578851=0x0,_0x5ed6a3=this[_0x3916f4(0x13c)]();return new Rectangle(_0x578851,_0x5ed6a3,_0x434ba3,_0x424210);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xfa)]=function(){const _0x4dc4a6=_0x5b52fc,_0x458b85=VisuMZ['MainMenuCore'][_0x4dc4a6(0xf3)]['CustomCmdWin'][_0x4dc4a6(0x124)],_0x487b39=Graphics[_0x4dc4a6(0xda)],_0x12665b=this['calcWindowHeight'](_0x458b85,!![]),_0x595dd4=0x0,_0x48f80c=this[_0x4dc4a6(0x154)]()-_0x12665b;return new Rectangle(_0x595dd4,_0x48f80c,_0x487b39,_0x12665b);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x113)]=function(){const _0x160bc3=_0x5b52fc,_0x2b4c79=VisuMZ[_0x160bc3(0x139)][_0x160bc3(0xf3)][_0x160bc3(0x1d7)]['Rows'],_0xbbdcb2=Graphics[_0x160bc3(0xda)],_0x1fb562=this[_0x160bc3(0x1f6)](0x1,!![]),_0x530efc=0x0,_0x54bb12=this['mainAreaBottom']()-_0x1fb562;return new Rectangle(_0x530efc,_0x54bb12,_0xbbdcb2,_0x1fb562);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x160)]=function(){const _0x353055=_0x5b52fc,_0x57bcf1=VisuMZ['MainMenuCore'][_0x353055(0xf3)]['CustomCmdWin'][_0x353055(0x124)],_0x32908d=Graphics['boxWidth'],_0x124ef2=Window_MenuCommand['prototype'][_0x353055(0xc5)](_0x57bcf1),_0x2f1977=0x0,_0x5b3515=Math['round']((Graphics[_0x353055(0x221)]-_0x124ef2)/0x2);return new Rectangle(_0x2f1977,_0x5b3515,_0x32908d,_0x124ef2);},Scene_Menu['prototype'][_0x5b52fc(0xf0)]=function(){const _0x624cbd=_0x5b52fc;return VisuMZ['MainMenuCore'][_0x624cbd(0xf3)][_0x624cbd(0x174)];},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x194)]=function(){const _0x1f7281=_0x5b52fc;if(this[_0x1f7281(0xf0)]()!==_0x1f7281(0x143))return!![];return VisuMZ[_0x1f7281(0x139)][_0x1f7281(0xf3)][_0x1f7281(0x1e9)][_0x1f7281(0x119)];},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1df)]=function(){const _0x23f13c=_0x5b52fc,_0x3365fe=this[_0x23f13c(0x1a6)]();this[_0x23f13c(0x14f)]=this[_0x23f13c(0x194)]()?new Window_ThinGold(_0x3365fe):new Window_Gold(_0x3365fe),this[_0x23f13c(0x207)](this[_0x23f13c(0x14f)]);},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x184)]=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1a6)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1a6)]=function(){const _0xe61cf8=_0x5b52fc,_0x147e1b=this['commandWindowStyle']();if(['top','thinTop',_0xe61cf8(0x11f)]['includes'](_0x147e1b))return this[_0xe61cf8(0x1f9)]();else{if([_0xe61cf8(0x18c),_0xe61cf8(0xb8)]['includes'](_0x147e1b))return this[_0xe61cf8(0xe8)]();else{const _0x5dd7e=VisuMZ[_0xe61cf8(0x139)][_0xe61cf8(0x184)][_0xe61cf8(0xd7)](this);return this[_0xe61cf8(0x13a)](_0x5dd7e),_0x5dd7e;}}},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x13a)]=function(_0x4de9c3){const _0x7d9577=_0x5b52fc;if(this[_0x7d9577(0x194)]()){if(VisuMZ[_0x7d9577(0x139)]['Settings']['General']['AutoGoldY']){const _0x40976b=_0x4de9c3[_0x7d9577(0xad)]-this[_0x7d9577(0x1f6)](0x1,![]);_0x4de9c3['y']+=_0x40976b;}VisuMZ[_0x7d9577(0x139)][_0x7d9577(0xf3)]['General']['AutoGoldHeight']&&(_0x4de9c3[_0x7d9577(0xad)]=this['calcWindowHeight'](0x1,![]));}},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1f9)]=function(){const _0x523365=_0x5b52fc,_0x142df5=this[_0x523365(0xf2)](),_0x5b8ba0=this[_0x523365(0x1f6)](0x1,![]),_0x28d1da=Graphics[_0x523365(0xda)]-_0x142df5,_0x59e982=this['mainAreaBottom']()-_0x5b8ba0;return new Rectangle(_0x28d1da,_0x59e982,_0x142df5,_0x5b8ba0);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xe8)]=function(){const _0x3a9108=_0x5b52fc,_0x7d396c=this[_0x3a9108(0xf2)](),_0x5dc2aa=this[_0x3a9108(0x1f6)](0x1,![]),_0x1a174f=Graphics['boxWidth']-_0x7d396c,_0x36b91c=this[_0x3a9108(0x13c)]();return new Rectangle(_0x1a174f,_0x36b91c,_0x7d396c,_0x5dc2aa);},VisuMZ[_0x5b52fc(0x139)]['Scene_Menu_createStatusWindow']=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x199)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x199)]=function(){const _0x4ead3d=_0x5b52fc;VisuMZ[_0x4ead3d(0x139)][_0x4ead3d(0x163)][_0x4ead3d(0xd7)](this),this[_0x4ead3d(0x146)]();},Scene_Menu[_0x5b52fc(0xc8)]['adjustStatusWindowMobile']=function(){const _0x590ad0=_0x5b52fc;this[_0x590ad0(0xf0)]()==='mobile'&&(this[_0x590ad0(0x156)]['openness']=0x0);},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0xcc)]=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xc2)],Scene_Menu['prototype'][_0x5b52fc(0xc2)]=function(){const _0xb052a4=_0x5b52fc,_0xdbbe29=this[_0xb052a4(0xf0)]();if([_0xb052a4(0x19d),_0xb052a4(0xed)]['includes'](_0xdbbe29))return this[_0xb052a4(0x1c8)]();else{if([_0xb052a4(0x18c),_0xb052a4(0xb8)]['includes'](_0xdbbe29))return this[_0xb052a4(0xfd)]();else return _0xdbbe29===_0xb052a4(0x11f)?this['statusWindowRectMobileStyle']():VisuMZ['MainMenuCore'][_0xb052a4(0xcc)][_0xb052a4(0xd7)](this);}},Scene_Menu[_0x5b52fc(0xc8)]['statusWindowRectTopStyle']=function(){const _0x2aeac9=_0x5b52fc,_0x1d33f0=Graphics['boxWidth'],_0x4953db=this[_0x2aeac9(0xef)]()-this[_0x2aeac9(0x1e8)][_0x2aeac9(0xad)]-this[_0x2aeac9(0x14f)][_0x2aeac9(0xad)],_0x212a14=0x0,_0x2f8114=this[_0x2aeac9(0x1e8)]['y']+this['_commandWindow'][_0x2aeac9(0xad)];return new Rectangle(_0x212a14,_0x2f8114,_0x1d33f0,_0x4953db);},Scene_Menu['prototype']['statusWindowRectBottomStyle']=function(){const _0x1fb92b=_0x5b52fc,_0x162d48=Graphics[_0x1fb92b(0xda)],_0x34fd5d=this[_0x1fb92b(0xef)]()-this[_0x1fb92b(0x1e8)][_0x1fb92b(0xad)]-this['_goldWindow']['height'],_0x5bd264=0x0,_0x4b3350=this[_0x1fb92b(0x14f)]['y']+this['_goldWindow']['height'];return new Rectangle(_0x5bd264,_0x4b3350,_0x162d48,_0x34fd5d);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x20f)]=function(){const _0x1e1653=_0x5b52fc,_0xc1bc9b=Graphics['boxWidth'],_0x347a00=this[_0x1e1653(0xef)]()-this[_0x1e1653(0x14f)][_0x1e1653(0xad)],_0x3d015c=0x0,_0x466a51=this['mainAreaBottom']()-this[_0x1e1653(0x14f)][_0x1e1653(0xad)]-_0x347a00;return new Rectangle(_0x3d015c,_0x466a51,_0xc1bc9b,_0x347a00);},Scene_Menu[_0x5b52fc(0xc8)]['createPlaytimeWindow']=function(){const _0x38862d=_0x5b52fc;if(!this[_0x38862d(0xd5)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x1783b7=this[_0x38862d(0xb1)]();this[_0x38862d(0x120)]=new Window_Playtime(_0x1783b7),this[_0x38862d(0x120)][_0x38862d(0x135)](VisuMZ[_0x38862d(0x139)][_0x38862d(0xf3)][_0x38862d(0x1c2)]['BgType']),this['addWindow'](this[_0x38862d(0x120)]);},Scene_Menu['prototype'][_0x5b52fc(0xd5)]=function(){const _0x296397=_0x5b52fc;return VisuMZ[_0x296397(0x139)][_0x296397(0xf3)]['Playtime'][_0x296397(0xeb)];},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1b6)]=function(){const _0x5b3bb3=_0x5b52fc;return this['canCreatePlaytimeWindow']()&&(VisuMZ['MainMenuCore'][_0x5b3bb3(0xf3)][_0x5b3bb3(0x1c2)][_0x5b3bb3(0x1ab)]??!![]);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xb1)]=function(){const _0x595998=_0x5b52fc,_0x3983d0=this['commandWindowStyle']();if(['top',_0x595998(0xed),'mobile'][_0x595998(0x16f)](_0x3983d0))return this[_0x595998(0x1d0)]();else return[_0x595998(0x18c),_0x595998(0xb8)][_0x595998(0x16f)](_0x3983d0)?this[_0x595998(0x161)]():VisuMZ[_0x595998(0x139)][_0x595998(0xf3)][_0x595998(0x1c2)][_0x595998(0x152)][_0x595998(0xd7)](this);},Scene_Menu[_0x5b52fc(0xc8)]['playtimeWindowRectTopStyle']=function(){const _0x5219f6=_0x5b52fc,_0x15f0d9=this[_0x5219f6(0xf2)](),_0x370efe=this[_0x5219f6(0x1f6)](0x1,![]),_0x56988a=0x0,_0x35f08d=this[_0x5219f6(0x154)]()-_0x370efe;return new Rectangle(_0x56988a,_0x35f08d,_0x15f0d9,_0x370efe);},Scene_Menu[_0x5b52fc(0xc8)]['playtimeWindowRectBottomStyle']=function(){const _0x3a73bc=_0x5b52fc,_0x9253a1=this[_0x3a73bc(0xf2)](),_0x1666be=this['calcWindowHeight'](0x1,![]),_0x3c8f69=0x0,_0x56d11e=this[_0x3a73bc(0x13c)]();return new Rectangle(_0x3c8f69,_0x56d11e,_0x9253a1,_0x1666be);},Scene_Menu['prototype'][_0x5b52fc(0xb4)]=function(){const _0x23c2e6=_0x5b52fc;if(!this[_0x23c2e6(0xe0)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x224bb1=this[_0x23c2e6(0x214)]();this[_0x23c2e6(0xc6)]=new Window_MenuVariables(_0x224bb1),this[_0x23c2e6(0xc6)][_0x23c2e6(0x135)](VisuMZ[_0x23c2e6(0x139)][_0x23c2e6(0xf3)][_0x23c2e6(0x12d)]['BgType']),this[_0x23c2e6(0x207)](this['_variableWindow']);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xe0)]=function(){const _0x23c603=_0x5b52fc;return VisuMZ[_0x23c603(0x139)][_0x23c603(0xf3)][_0x23c603(0x12d)][_0x23c603(0xeb)];},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x176)]=function(){const _0x1c1248=_0x5b52fc;return this[_0x1c1248(0xe0)]()&&(VisuMZ[_0x1c1248(0x139)][_0x1c1248(0xf3)]['Variable']['AdjustCommandHeight']??!![]);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x214)]=function(){const _0x507c88=_0x5b52fc,_0xc60c99=this[_0x507c88(0xf0)]();if([_0x507c88(0x19d),'thinTop',_0x507c88(0x11f)][_0x507c88(0x16f)](_0xc60c99))return this[_0x507c88(0x225)]();else return[_0x507c88(0x18c),'thinBottom'][_0x507c88(0x16f)](_0xc60c99)?this[_0x507c88(0xd2)]():VisuMZ[_0x507c88(0x139)]['Settings'][_0x507c88(0x12d)][_0x507c88(0x152)][_0x507c88(0xd7)](this);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x225)]=function(){const _0x4e888c=_0x5b52fc,_0x23fc82=Graphics[_0x4e888c(0xda)]-this[_0x4e888c(0x14f)][_0x4e888c(0x12a)]-(this[_0x4e888c(0x120)]?this[_0x4e888c(0x120)][_0x4e888c(0x12a)]:0x0),_0x40bdb5=this[_0x4e888c(0x1f6)](0x1,![]),_0x13d928=this['_goldWindow']['x']-_0x23fc82,_0x24e95b=this[_0x4e888c(0x154)]()-_0x40bdb5;return new Rectangle(_0x13d928,_0x24e95b,_0x23fc82,_0x40bdb5);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xd2)]=function(){const _0x3779c2=_0x5b52fc,_0x190d29=Graphics['boxWidth']-this[_0x3779c2(0x14f)][_0x3779c2(0x12a)]-(this[_0x3779c2(0x120)]?this[_0x3779c2(0x120)]['width']:0x0),_0x2811fc=this[_0x3779c2(0x1f6)](0x1,![]),_0x42b234=this[_0x3779c2(0x14f)]['x']-_0x190d29,_0x3f7765=this[_0x3779c2(0x13c)]();return new Rectangle(_0x42b234,_0x3f7765,_0x190d29,_0x2811fc);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x14c)]=function(){const _0x5efc89=_0x5b52fc;if(!this[_0x5efc89(0x10f)]())return;const _0x27ae03=this[_0x5efc89(0x214)]();this[_0x5efc89(0x169)]=new Window_Base(_0x27ae03),this[_0x5efc89(0x169)][_0x5efc89(0x135)](VisuMZ[_0x5efc89(0x139)][_0x5efc89(0xf3)][_0x5efc89(0x12d)][_0x5efc89(0x132)]),this[_0x5efc89(0x207)](this[_0x5efc89(0x169)]);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x10f)]=function(){const _0x2ec568=_0x5b52fc;if(['default',_0x2ec568(0x11f)]['includes'](this['commandWindowStyle']()))return![];if(this[_0x2ec568(0xc6)])return![];return!![];},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x217)]=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x140)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x140)]=function(){const _0x3cdec5=_0x5b52fc;if(this[_0x3cdec5(0x19b)]()&&this[_0x3cdec5(0x156)])$gameParty['setTargetActor']($gameParty[_0x3cdec5(0x145)]()[0x0]),this['onPersonalOk']();else{if(this[_0x3cdec5(0xf0)]()===_0x3cdec5(0x11f))this['_statusWindow']['open']();VisuMZ[_0x3cdec5(0x139)][_0x3cdec5(0x217)][_0x3cdec5(0xd7)](this);}},Scene_Menu[_0x5b52fc(0xc8)]['isSoloQuickMode']=function(){const _0x7ca02c=_0x5b52fc;return VisuMZ[_0x7ca02c(0x139)][_0x7ca02c(0xf3)][_0x7ca02c(0x1e9)]['SoloQuick']&&$gameParty['members']()['length']<=0x1;},Scene_Menu[_0x5b52fc(0xc8)]['onPersonalOk']=function(){const _0x132ab0=_0x5b52fc,_0x149da5=this[_0x132ab0(0x1e8)][_0x132ab0(0xf8)](),_0x2b7e83=this[_0x132ab0(0x1e8)][_0x132ab0(0x1f2)]();for(const _0x4dd0b9 of Window_MenuCommand[_0x132ab0(0x10d)]){if(_0x4dd0b9['Symbol']===_0x149da5){_0x4dd0b9[_0x132ab0(0x130)][_0x132ab0(0xd7)](this,_0x2b7e83);return;}}},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x1da)]=Scene_Menu['prototype'][_0x5b52fc(0x15c)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x15c)]=function(){const _0x51e92e=_0x5b52fc;VisuMZ[_0x51e92e(0x139)][_0x51e92e(0x1da)][_0x51e92e(0xd7)](this);if(this[_0x51e92e(0xf0)]()==='mobile')this[_0x51e92e(0x156)][_0x51e92e(0x1a1)]();},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x191)]=function(){const _0x55dcb5=_0x5b52fc,_0x1a919f=parseInt(this[_0x55dcb5(0x1e8)][_0x55dcb5(0x1f2)]());_0x1a919f?($gameTemp[_0x55dcb5(0x206)](_0x1a919f),this[_0x55dcb5(0x106)]()):this['_commandWindow']['activate']();},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x1c3)]=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xdc)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0xdc)]=function(){const _0x53095a=_0x5b52fc;VisuMZ[_0x53095a(0x139)][_0x53095a(0x1c3)]['call'](this);if(this[_0x53095a(0xf0)]()===_0x53095a(0x11f))this[_0x53095a(0x156)][_0x53095a(0xdf)]();},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x172)]=Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1d2)],Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1d2)]=function(){const _0x51d512=_0x5b52fc;VisuMZ['MainMenuCore']['Scene_Menu_onFormationCancel'][_0x51d512(0xd7)](this);if(this['commandWindowStyle']()===_0x51d512(0x11f))this[_0x51d512(0x156)]['close']();},Scene_Menu[_0x5b52fc(0xc8)]['commandLoad']=function(){const _0x24e3a7=_0x5b52fc;SceneManager[_0x24e3a7(0x211)](Scene_Load);},Scene_Menu[_0x5b52fc(0xc8)][_0x5b52fc(0x1c0)]=function(){const _0x417419=_0x5b52fc;this[_0x417419(0x1e8)][_0x417419(0x1ca)]()!==''?this[_0x417419(0x1e8)][_0x417419(0x215)]():this[_0x417419(0x106)]();};function Sprite_MenuBackgroundActor(){const _0xa44fbb=_0x5b52fc;this[_0xa44fbb(0xc3)](...arguments);}Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)]=Object['create'](Sprite[_0x5b52fc(0xc8)]),Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0xb5)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0xc3)]=function(){const _0x502bc4=_0x5b52fc;this[_0x502bc4(0x133)]=null,this[_0x502bc4(0x1ad)]=![],Sprite[_0x502bc4(0xc8)]['initialize'][_0x502bc4(0xd7)](this),this['x']=Graphics[_0x502bc4(0x12a)];},Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0x1b8)]=function(_0x74f4b5){const _0x422486=_0x5b52fc;this['_actor']!==_0x74f4b5&&(this['_actor']=_0x74f4b5,this[_0x422486(0x16b)]());},Sprite_MenuBackgroundActor['prototype'][_0x5b52fc(0x16b)]=function(){const _0x55a695=_0x5b52fc;this[_0x55a695(0x1ad)]=![],this[_0x55a695(0x133)]?(this[_0x55a695(0x159)]=ImageManager[_0x55a695(0x10e)](this[_0x55a695(0x133)]['getMenuImage']()),this[_0x55a695(0x159)][_0x55a695(0x1f3)](this[_0x55a695(0x1f4)][_0x55a695(0x118)](this))):this['bitmap']=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0x1f4)]=function(){const _0x22558c=_0x5b52fc;this[_0x22558c(0x1ad)]=!![],VisuMZ[_0x22558c(0x139)]['Settings'][_0x22558c(0x1e9)][_0x22558c(0x17b)][_0x22558c(0xd7)](this);},Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0xab)]=function(){const _0x453d6d=_0x5b52fc;Sprite[_0x453d6d(0xc8)][_0x453d6d(0xab)][_0x453d6d(0xd7)](this),this[_0x453d6d(0x1ad)]&&(this[_0x453d6d(0x1fe)](),this[_0x453d6d(0x189)](),this[_0x453d6d(0xfc)]());},Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0x1fe)]=function(){const _0x5ce82f=_0x5b52fc;if(this[_0x5ce82f(0x1c6)]>0x0){const _0x319798=this[_0x5ce82f(0x1c6)];this[_0x5ce82f(0x117)]=(this['opacity']*(_0x319798-0x1)+0xff)/_0x319798;}},Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)][_0x5b52fc(0x189)]=function(){const _0x70caad=_0x5b52fc;if(this[_0x70caad(0x1c6)]>0x0){const _0x3d5e3f=this['_duration'];this['x']=(this['x']*(_0x3d5e3f-0x1)+this['_targetX'])/_0x3d5e3f,this['y']=(this['y']*(_0x3d5e3f-0x1)+this[_0x70caad(0x173)])/_0x3d5e3f;}},Sprite_MenuBackgroundActor[_0x5b52fc(0xc8)]['updateDuration']=function(){const _0x3fbd90=_0x5b52fc;if(this[_0x3fbd90(0x1c6)]>0x0)this[_0x3fbd90(0x1c6)]--;},ImageManager[_0x5b52fc(0xbd)]=ImageManager[_0x5b52fc(0xbd)]||0x9,ImageManager[_0x5b52fc(0x141)]=ImageManager['svActorVertCells']||0x6,Window_Base[_0x5b52fc(0xc8)][_0x5b52fc(0xe7)]=function(_0x193495,_0x28e56c,_0x99acff){const _0x2df0ba=_0x5b52fc,_0x5b03f7=_0x193495[_0x2df0ba(0x103)](/\$/i),_0x3bbb4a=ImageManager[_0x2df0ba(0x1e7)](_0x193495),_0x385e44=_0x3bbb4a[_0x2df0ba(0x12a)]/(_0x5b03f7?0x1:ImageManager[_0x2df0ba(0xbd)]),_0xce9b7f=_0x3bbb4a[_0x2df0ba(0xad)]/(_0x5b03f7?0x1:ImageManager['svActorVertCells']),_0x2c4beb=0x0,_0x590c58=0x0;this['contents'][_0x2df0ba(0xf6)](_0x3bbb4a,_0x2c4beb,_0x590c58,_0x385e44,_0xce9b7f,_0x28e56c-_0x385e44/0x2,_0x99acff-_0xce9b7f);},Window_MenuCommand[_0x5b52fc(0x10d)]=VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0xf3)][_0x5b52fc(0x198)],Window_MenuCommand[_0x5b52fc(0x20e)]=undefined,VisuMZ[_0x5b52fc(0x139)]['Window_MenuCommand_initialize']=Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0xc3)],Window_MenuCommand[_0x5b52fc(0xc8)]['initialize']=function(_0xfe97e1){const _0x47b0a1=_0x5b52fc;this[_0x47b0a1(0x21a)]='',VisuMZ[_0x47b0a1(0x139)][_0x47b0a1(0xce)]['call'](this,_0xfe97e1),this['createCommandNameWindow'](_0xfe97e1);},Window_MenuCommand[_0x5b52fc(0xc8)]['createCommandNameWindow']=function(_0x1d2934){const _0x417085=_0x5b52fc,_0x4e5c54=new Rectangle(0x0,0x0,_0x1d2934[_0x417085(0x12a)],_0x1d2934[_0x417085(0xad)]);this['_commandNameWindow']=new Window_Base(_0x4e5c54),this[_0x417085(0xdd)][_0x417085(0x117)]=0x0,this['addChild'](this['_commandNameWindow']),this[_0x417085(0x168)]();},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x15f)]=function(){const _0xa5e1a5=_0x5b52fc;Window_HorzCommand[_0xa5e1a5(0xc8)]['callUpdateHelp'][_0xa5e1a5(0xd7)](this);if(this[_0xa5e1a5(0xdd)])this['updateCommandNameWindow']();},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x168)]=function(){const _0x15c2ab=_0x5b52fc,_0x308afd=this[_0x15c2ab(0xdd)];_0x308afd[_0x15c2ab(0x1d6)][_0x15c2ab(0x222)]();const _0x4b77b4=this[_0x15c2ab(0x125)](this[_0x15c2ab(0x1a7)]());if(_0x4b77b4===_0x15c2ab(0x181)){const _0xa50196=this[_0x15c2ab(0xde)](this['index']());let _0x87d5ae=this[_0x15c2ab(0x208)](this[_0x15c2ab(0x1a7)]());_0x87d5ae=_0x87d5ae['replace'](/\\I\[(\d+)\]/gi,''),_0x308afd[_0x15c2ab(0xf5)](),this[_0x15c2ab(0xec)](_0x87d5ae,_0xa50196),this['commandNameWindowDrawText'](_0x87d5ae,_0xa50196),this['commandNameWindowCenter'](_0x87d5ae,_0xa50196);}},Window_MenuCommand['prototype'][_0x5b52fc(0xec)]=function(_0x58f44d,_0x35e7b7){},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x209)]=function(_0x3cde10,_0x322bf8){const _0x557101=_0x5b52fc,_0x1551fc=this['_commandNameWindow'];_0x1551fc['drawText'](_0x3cde10,0x0,_0x322bf8['y'],_0x1551fc[_0x557101(0x129)],_0x557101(0x1a3));},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x153)]=function(_0x4e1a2b,_0x50aba0){const _0x45a7a0=_0x5b52fc,_0x308df2=this[_0x45a7a0(0xdd)],_0x3a4ade=$gameSystem[_0x45a7a0(0x210)](),_0x261656=_0x50aba0['x']+Math[_0x45a7a0(0x18e)](_0x50aba0[_0x45a7a0(0x12a)]/0x2)+_0x3a4ade;_0x308df2['x']=_0x308df2[_0x45a7a0(0x12a)]/-0x2+_0x261656,_0x308df2['y']=Math['floor'](_0x50aba0[_0x45a7a0(0xad)]/0x4);},Window_MenuCommand['prototype']['itemHeight']=function(){const _0x180c69=_0x5b52fc,_0xa76988=SceneManager['_scene'][_0x180c69(0xf0)]();if(_0xa76988===_0x180c69(0x11f)){const _0x5b2746=VisuMZ[_0x180c69(0x139)][_0x180c69(0xf3)][_0x180c69(0x1d7)][_0x180c69(0x1e1)];return this[_0x180c69(0x1de)]()*_0x5b2746+0x8;}else return Window_Command[_0x180c69(0xc8)][_0x180c69(0x205)]['call'](this);},Window_MenuCommand['prototype'][_0x5b52fc(0x1d8)]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x104)]=function(){const _0x44d4b7=_0x5b52fc;let _0x50dce2=0x0;for(const _0x1c2b21 of Window_MenuCommand[_0x44d4b7(0x10d)]){let _0x740ddc=_0x1c2b21['Symbol'];if(this[_0x44d4b7(0x19a)](_0x740ddc,_0x1c2b21)){let _0x27a02c=_0x1c2b21[_0x44d4b7(0x12f)];if(['','Untitled'][_0x44d4b7(0x16f)](_0x27a02c))_0x27a02c=_0x1c2b21[_0x44d4b7(0xe2)][_0x44d4b7(0xd7)](this);const _0x1d92a4=_0x1c2b21[_0x44d4b7(0x179)];_0x1d92a4>0x0&&this['commandStyle']()!=='text'&&(_0x27a02c=_0x44d4b7(0x197)[_0x44d4b7(0x148)](_0x1d92a4,_0x27a02c));const _0x400a1d=this[_0x44d4b7(0xd8)](_0x740ddc,_0x1c2b21),_0x8037c7=_0x1c2b21[_0x44d4b7(0x21d)][_0x44d4b7(0xd7)](this);_0x740ddc===_0x44d4b7(0x157)&&(_0x50dce2++,_0x740ddc+=_0x50dce2),this[_0x44d4b7(0x162)](_0x27a02c,_0x740ddc,_0x400a1d,_0x8037c7),this[_0x44d4b7(0x1f0)](_0x740ddc,_0x1c2b21[_0x44d4b7(0x164)]['bind'](this,_0x8037c7));}this[_0x44d4b7(0x17f)](_0x740ddc);}},Window_MenuCommand[_0x5b52fc(0xc8)]['isMainMenuCommandVisible']=function(_0x5da7b5,_0x4b7db0,_0x100e79){const _0x455a34=_0x5b52fc;if(!_0x100e79){if(!this[_0x455a34(0x17e)](_0x5da7b5,_0x4b7db0))return![];}if($gameSystem[_0x455a34(0x14b)](_0x5da7b5,_0x455a34(0x20b)))return!![];if($gameSystem[_0x455a34(0x14b)](_0x5da7b5,_0x455a34(0x1ff)))return![];return _0x4b7db0['ShowJS'][_0x455a34(0xd7)](this,_0x5da7b5,_0x4b7db0);},Window_MenuCommand['prototype'][_0x5b52fc(0xd8)]=function(_0x10d23b,_0x83d183){const _0x1b83cb=_0x5b52fc;if($gameSystem[_0x1b83cb(0x14b)](_0x10d23b,_0x1b83cb(0x19c)))return!![];if($gameSystem[_0x1b83cb(0x14b)](_0x10d23b,_0x1b83cb(0x13b)))return![];return _0x83d183[_0x1b83cb(0x1f8)][_0x1b83cb(0xd7)](this,_0x10d23b,_0x83d183);},Window_MenuCommand[_0x5b52fc(0xc8)]['addSymbolBridge']=function(_0x41d63c){const _0x59889c=_0x5b52fc;switch(_0x41d63c){case _0x59889c(0x123):this[_0x59889c(0x100)]();break;case _0x59889c(0x11a):this['addFormationCommand'](),this[_0x59889c(0x1e4)]();break;case _0x59889c(0xca):this[_0x59889c(0x1bd)]();break;case _0x59889c(0x1fc):this[_0x59889c(0x1af)]();break;case'gameEnd':this[_0x59889c(0x1ea)]();break;}},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x100)]=function(){},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x182)]=function(){},Window_MenuCommand[_0x5b52fc(0xc8)]['addOriginalCommands']=function(){},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x1bd)]=function(){},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x1af)]=function(){},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x1ea)]=function(){},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0xdb)]=function(){const _0x1d85d6=_0x5b52fc,_0x136338=SceneManager[_0x1d85d6(0x167)]['commandWindowStyle']();if(['thinTop',_0x1d85d6(0xb8)]['includes'](_0x136338))return this['_list']?this[_0x1d85d6(0xbc)]():0x4;else return _0x136338!=='default'?VisuMZ[_0x1d85d6(0x139)][_0x1d85d6(0xf3)]['CustomCmdWin'][_0x1d85d6(0xc0)]:Window_Command[_0x1d85d6(0xc8)][_0x1d85d6(0xdb)][_0x1d85d6(0xd7)](this);},Window_MenuCommand['prototype'][_0x5b52fc(0x1ca)]=function(){const _0x4d2f10=_0x5b52fc;return this[_0x4d2f10(0x21a)]||'';},Window_MenuCommand['prototype'][_0x5b52fc(0x17e)]=function(_0x70b87e,_0x5429a1){const _0x2053e1=_0x5b52fc,_0x16e319=_0x5429a1['Subcategory']||'';if(!this[_0x2053e1(0x192)](_0x16e319)&&this[_0x2053e1(0x1ca)]()==='')return!![];return _0x16e319===this['currentSubcategory']();},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x192)]=function(_0x1916ef){const _0x4dabc6=_0x5b52fc;return this['getSubcategoryList']()[_0x4dabc6(0x16f)](_0x1916ef);},Window_MenuCommand['prototype']['getSubcategoryList']=function(){const _0x46e339=_0x5b52fc;if(Window_MenuCommand[_0x46e339(0x20e)]!==undefined)return Window_MenuCommand[_0x46e339(0x20e)];Window_MenuCommand['SUBCATEGORY_LIST']=[];for(const _0x393c80 of Window_MenuCommand[_0x46e339(0x10d)]){const _0x45a01b=_0x393c80[_0x46e339(0x13f)];if(_0x45a01b!==_0x46e339(0x157))continue;const _0x2548d7=_0x393c80[_0x46e339(0x21d)]['call'](this);Window_MenuCommand[_0x46e339(0x20e)][_0x46e339(0x211)](_0x2548d7);}return Window_MenuCommand[_0x46e339(0x20e)];},Window_MenuCommand['prototype'][_0x5b52fc(0xff)]=function(_0x458ac4){const _0x46ad75=_0x5b52fc;if(!_0x458ac4)return!![];const _0x1952c1=_0x458ac4[_0x46ad75(0x21d)][_0x46ad75(0xd7)](this);for(const _0x3f0193 of Window_MenuCommand['_commandList']){if(_0x3f0193===_0x458ac4)continue;const _0x1703df=_0x3f0193[_0x46ad75(0x1c4)]||'';if(_0x1703df!==_0x1952c1)continue;const _0x48e954=_0x3f0193[_0x46ad75(0x13f)];if(this[_0x46ad75(0x19a)](_0x48e954,_0x3f0193,!![]))return!![];}return![];},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x16c)]=function(_0x340e95){const _0x307a33=_0x5b52fc;_0x340e95=_0x340e95;if(this[_0x307a33(0x1ca)]()===_0x340e95)return;this[_0x307a33(0x21a)]=_0x340e95,this[_0x307a33(0x15a)](),this[_0x307a33(0x187)](0x0),this[_0x307a33(0x13d)](0x0),this[_0x307a33(0x115)]();},Window_MenuCommand[_0x5b52fc(0xc8)]['removeSubcategory']=function(){const _0x49040f=_0x5b52fc,_0x2c0ae1=this[_0x49040f(0x1ca)]();this[_0x49040f(0x21a)]='',this[_0x49040f(0x15a)](),this[_0x49040f(0x13d)](0x0);this['_scrollDuration']>0x1&&(this['_scrollDuration']=0x1,this['updateSmoothScroll']());const _0x13c976=Math[_0x49040f(0x109)](this[_0x49040f(0xaa)](_0x2c0ae1),0x0);this['smoothSelect'](_0x13c976),this[_0x49040f(0x115)]();},Window_MenuCommand['prototype'][_0x5b52fc(0x1b5)]=function(){const _0x1e9e57=_0x5b52fc;return VisuMZ[_0x1e9e57(0x139)][_0x1e9e57(0xf3)][_0x1e9e57(0x1d7)][_0x1e9e57(0x177)];},Window_MenuCommand['prototype'][_0x5b52fc(0x166)]=function(_0xb0f697){const _0x2cf507=_0x5b52fc,_0x1f5b26=this['commandStyleCheck'](_0xb0f697);if(_0x1f5b26===_0x2cf507(0xb7))this[_0x2cf507(0xe6)](_0xb0f697);else _0x1f5b26===_0x2cf507(0x181)?this[_0x2cf507(0x204)](_0xb0f697):Window_Command[_0x2cf507(0xc8)]['drawItem']['call'](this,_0xb0f697);},Window_MenuCommand[_0x5b52fc(0xc8)]['commandStyle']=function(){const _0xf2e496=_0x5b52fc;return VisuMZ['MainMenuCore'][_0xf2e496(0xf3)]['CustomCmdWin'][_0xf2e496(0x1cd)];},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x125)]=function(_0x38bf72){const _0x51babf=_0x5b52fc,_0x28f787=this['commandStyle']();if(_0x28f787!==_0x51babf(0x112))return _0x28f787;else{const _0x5decc7=this[_0x51babf(0x208)](_0x38bf72);if(_0x5decc7[_0x51babf(0x103)](/\\I\[(\d+)\]/i)){const _0x498b8a=this[_0x51babf(0xde)](_0x38bf72),_0x7b1d5c=this['textSizeEx'](_0x5decc7)['width'];return _0x7b1d5c<=_0x498b8a['width']?'iconText':_0x51babf(0x181);}else return _0x51babf(0x18d);}},Window_MenuCommand['prototype'][_0x5b52fc(0xe6)]=function(_0x44573a){const _0x5ed882=_0x5b52fc,_0x1541c6=this[_0x5ed882(0xde)](_0x44573a),_0x48cf19=this[_0x5ed882(0x208)](_0x44573a),_0x1fe58d=this[_0x5ed882(0x1dc)](_0x48cf19)[_0x5ed882(0x12a)];this[_0x5ed882(0x11d)](this[_0x5ed882(0xfb)](_0x44573a));let _0x2e7fbe=this[_0x5ed882(0x1b5)]();if(_0x2e7fbe===_0x5ed882(0x10b))this[_0x5ed882(0x121)](_0x48cf19,_0x1541c6['x']+_0x1541c6[_0x5ed882(0x12a)]-_0x1fe58d,_0x1541c6['y'],_0x1fe58d);else{if(_0x2e7fbe===_0x5ed882(0x1a3)){const _0x17abc3=_0x1541c6['x']+Math['floor']((_0x1541c6['width']-_0x1fe58d)/0x2);this['drawTextEx'](_0x48cf19,_0x17abc3,_0x1541c6['y'],_0x1fe58d);}else this[_0x5ed882(0x121)](_0x48cf19,_0x1541c6['x'],_0x1541c6['y'],_0x1fe58d);}},Window_MenuCommand[_0x5b52fc(0xc8)][_0x5b52fc(0x204)]=function(_0x5003bf){const _0xbac9e6=_0x5b52fc;this['commandName'](_0x5003bf)[_0xbac9e6(0x103)](/\\I\[(\d+)\]/i);const _0x3d0aab=Number(RegExp['$1']),_0x27dd10=this[_0xbac9e6(0xde)](_0x5003bf),_0x1388fd=_0x27dd10['x']+Math[_0xbac9e6(0x18e)]((_0x27dd10[_0xbac9e6(0x12a)]-ImageManager[_0xbac9e6(0x1b9)])/0x2),_0x42d20d=_0x27dd10['y']+(_0x27dd10[_0xbac9e6(0xad)]-ImageManager[_0xbac9e6(0x1cc)])/0x2;this['drawIcon'](_0x3d0aab,_0x1388fd,_0x42d20d);},VisuMZ[_0x5b52fc(0x139)]['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0x5b52fc(0xc8)][_0x5b52fc(0x142)],Window_StatusBase['prototype'][_0x5b52fc(0x142)]=function(){const _0x496c0a=_0x5b52fc;VisuMZ[_0x496c0a(0x139)][_0x496c0a(0x218)][_0x496c0a(0xd7)](this),this['loadOtherActorImages']();},Window_StatusBase[_0x5b52fc(0xc8)][_0x5b52fc(0x1ed)]=function(){const _0x3bb5bd=_0x5b52fc;for(const _0x151476 of $gameParty[_0x3bb5bd(0x145)]()){if(!_0x151476)continue;_0x151476[_0x3bb5bd(0x102)]()&&ImageManager[_0x3bb5bd(0x150)](_0x151476[_0x3bb5bd(0x102)]()),_0x151476[_0x3bb5bd(0x1d5)]()&&ImageManager[_0x3bb5bd(0x1e7)](_0x151476[_0x3bb5bd(0x1d5)]()),_0x151476[_0x3bb5bd(0x14d)]()&&ImageManager[_0x3bb5bd(0x10e)](_0x151476[_0x3bb5bd(0x14d)]());}},Window_StatusBase['prototype'][_0x5b52fc(0x223)]=function(){const _0x5c3a69=_0x5b52fc;return VisuMZ[_0x5c3a69(0x139)]['Settings'][_0x5c3a69(0x1d1)];},Window_StatusBase['prototype'][_0x5b52fc(0xe5)]=function(_0x3aebe3,_0x2afca6,_0x285167,_0x59729d,_0x32893e){const _0xc531c3=_0x5b52fc;_0x59729d=_0x59729d||ImageManager['faceWidth'],_0x32893e=_0x32893e||ImageManager[_0xc531c3(0x11c)];const _0x55b6df=ImageManager[_0xc531c3(0x180)],_0x4f3a78=_0x32893e-0x2,_0x5313ec=_0x2afca6+Math[_0xc531c3(0x18e)]((_0x59729d-_0x55b6df)/0x2);this[_0xc531c3(0xb5)]===Window_MenuStatus&&this[_0xc531c3(0x11d)](_0x3aebe3[_0xc531c3(0x190)]()),this['drawActorFace'](_0x3aebe3,_0x5313ec,_0x285167,_0x55b6df,_0x4f3a78),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype']['drawItemActorSprite']=function(_0x33d084,_0x4aaf25,_0x1bf51c,_0x346de5,_0x27d198){const _0x249421=_0x5b52fc;_0x346de5=_0x346de5||ImageManager[_0x249421(0x180)],_0x27d198=_0x27d198||ImageManager[_0x249421(0x11c)];const _0x33b885=_0x33d084[_0x249421(0x102)](),_0x4c5542=_0x33d084[_0x249421(0x1fa)](),_0x57d044=ImageManager[_0x249421(0x150)](_0x33b885),_0x385ecd=ImageManager['isBigCharacter'](_0x33b885),_0x3d8b9c=_0x57d044[_0x249421(0x12a)]/(_0x385ecd?0x3:0xc),_0x9ae081=_0x57d044[_0x249421(0xad)]/(_0x385ecd?0x4:0x8),_0x5472a5=_0x346de5,_0x44b40d=_0x27d198-0x2,_0x344ac0=_0x4aaf25+Math[_0x249421(0x18e)](_0x5472a5/0x2),_0x1ce024=_0x1bf51c+Math[_0x249421(0x220)]((_0x27d198+_0x9ae081)/0x2);this[_0x249421(0xb5)]===Window_MenuStatus&&this['changePaintOpacity'](_0x33d084[_0x249421(0x190)]());const _0x43eef1=Math[_0x249421(0xf9)](_0x346de5,_0x3d8b9c),_0x1b97de=Math['min'](_0x27d198,_0x9ae081),_0x2fd17f=Math[_0x249421(0x18e)](_0x4aaf25+Math[_0x249421(0x109)](_0x346de5-_0x3d8b9c,0x0)/0x2),_0x4d7f48=Math[_0x249421(0x18e)](_0x1bf51c+Math['max'](_0x27d198-_0x9ae081,0x0)/0x2),_0x235026=_0x385ecd?0x0:_0x4c5542,_0x3a91b7=(_0x235026%0x4*0x3+0x1)*_0x3d8b9c,_0x5a8072=Math[_0x249421(0x18e)](_0x235026/0x4)*0x4*_0x9ae081;this['contents']['blt'](_0x57d044,_0x3a91b7,_0x5a8072,_0x43eef1,_0x1b97de,_0x2fd17f,_0x4d7f48),this[_0x249421(0x11d)](!![]);},Window_StatusBase[_0x5b52fc(0xc8)][_0x5b52fc(0x1a2)]=function(_0x404476,_0x49e98b,_0x32f35f,_0xb5259e,_0x212a66){const _0x1093d6=_0x5b52fc;_0xb5259e=_0xb5259e||ImageManager[_0x1093d6(0x180)],_0x212a66=_0x212a66||ImageManager[_0x1093d6(0x11c)];const _0x1bf69a=ImageManager[_0x1093d6(0x1e7)](_0x404476[_0x1093d6(0x1d5)]()),_0x210a53=_0x1bf69a[_0x1093d6(0x12a)]/ImageManager[_0x1093d6(0xbd)],_0x566a2c=_0x1bf69a[_0x1093d6(0xad)]/ImageManager['svActorVertCells'],_0x3ed58d=_0xb5259e,_0x237c7d=_0x212a66-0x2,_0x3c7dde=_0x49e98b+Math[_0x1093d6(0x18e)](_0x3ed58d/0x2),_0x39ff9a=_0x32f35f+Math[_0x1093d6(0x220)]((_0x212a66+_0x566a2c)/0x2);this['constructor']===Window_MenuStatus&&this['changePaintOpacity'](_0x404476[_0x1093d6(0x190)]());const _0x4440a1=_0x404476[_0x1093d6(0x1ec)]&&_0x404476[_0x1093d6(0x1ec)](),_0x4a92cf=0x0,_0x35bcc6=0x0,_0x4fa3c3=_0x4440a1?_0x1bf69a[_0x1093d6(0x12a)]:_0x210a53,_0x22ce0e=_0x4440a1?_0x1bf69a['height']:_0x566a2c,_0x26d9d6=Math[_0x1093d6(0xf9)](0x1,_0xb5259e/_0x4fa3c3,_0x212a66/_0x22ce0e),_0x427d4f=_0x26d9d6*_0x4fa3c3,_0x7f27aa=_0x26d9d6*_0x22ce0e,_0x3c3ad9=Math[_0x1093d6(0x18e)](_0x49e98b+Math['max'](_0xb5259e-_0x427d4f,0x0)/0x2),_0x43ae61=Math['floor'](_0x32f35f+Math[_0x1093d6(0x109)](_0x212a66-_0x7f27aa,0x0)/0x2);this['contents']['blt'](_0x1bf69a,_0x4a92cf,_0x35bcc6,_0x4fa3c3,_0x22ce0e,_0x3c3ad9,_0x43ae61,_0x427d4f,_0x7f27aa),this[_0x1093d6(0x11d)](!![]);},Window_StatusBase[_0x5b52fc(0xc8)][_0x5b52fc(0x151)]=function(_0xc5b814,_0xf14a0a,_0x58f58e,_0x30ef2b,_0x1b1dbf){const _0x4f6814=_0x5b52fc,_0x4b178a=ImageManager['loadPicture'](_0xc5b814[_0x4f6814(0x14d)]());_0x30ef2b=(_0x30ef2b||ImageManager['faceWidth'])-0x2,_0x1b1dbf=(_0x1b1dbf||ImageManager['faceHeight'])-0x2;const _0x5d9534=_0x4b178a[_0x4f6814(0x12a)],_0x5e11e9=_0x4b178a[_0x4f6814(0xad)],_0x4f8569=_0x30ef2b,_0x539a61=_0x1b1dbf-0x2,_0xc841eb=_0xf14a0a+Math[_0x4f6814(0x18e)](_0x4f8569/0x2),_0x2a36e9=_0x58f58e+Math[_0x4f6814(0x220)]((_0x1b1dbf+_0x5e11e9)/0x2);this[_0x4f6814(0xb5)]===Window_MenuStatus&&this['changePaintOpacity'](_0xc5b814[_0x4f6814(0x190)]());const _0x26a513=Math[_0x4f6814(0xf9)](_0x30ef2b,_0x5d9534),_0x4ca8c4=Math['min'](_0x1b1dbf,_0x5e11e9),_0x1e8ef1=_0xf14a0a+0x1,_0x231f6f=Math[_0x4f6814(0x109)](_0x58f58e+0x1,_0x58f58e+_0x539a61-_0x5e11e9+0x3);let _0x4b2180=Math[_0x4f6814(0x11e)]((_0x5d9534-_0x26a513)/0x2),_0x36c91a=Math['round']((_0x5e11e9-_0x4ca8c4)/0x2);_0x4b2180-=_0xc5b814[_0x4f6814(0x105)](),_0x36c91a-=_0xc5b814[_0x4f6814(0x1a4)]();if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ[_0x4f6814(0x14a)][_0x4f6814(0xf3)][_0x4f6814(0x1ae)][_0x4f6814(0x122)]){}}this[_0x4f6814(0x1d6)][_0x4f6814(0xf6)](_0x4b178a,_0x4b2180,_0x36c91a,_0x26a513,_0x4ca8c4,_0x1e8ef1,_0x231f6f),this[_0x4f6814(0x11d)](!![]);},Window_Status[_0x5b52fc(0xc8)]['drawActorFace']=function(_0x2248b7,_0x32c35a,_0x374b30,_0x4a826c,_0x3f5259){const _0x506e42=_0x5b52fc;switch(this[_0x506e42(0x223)]()){case'none':break;case _0x506e42(0x171):this[_0x506e42(0xee)](_0x2248b7,_0x32c35a,_0x374b30,_0x4a826c,_0x3f5259);break;case'svbattler':this[_0x506e42(0x1a2)](_0x2248b7,_0x32c35a,_0x374b30,_0x4a826c,_0x3f5259);break;default:Window_StatusBase[_0x506e42(0xc8)][_0x506e42(0x170)][_0x506e42(0xd7)](this,_0x2248b7,_0x32c35a,_0x374b30,_0x4a826c,_0x3f5259);break;}},VisuMZ['MainMenuCore'][_0x5b52fc(0x1e5)]=Window_MenuStatus[_0x5b52fc(0xc8)]['selectLast'],Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x1b0)]=function(){const _0x45fb50=_0x5b52fc;VisuMZ[_0x45fb50(0x139)][_0x45fb50(0xf3)][_0x45fb50(0x1e9)][_0x45fb50(0x14e)]?VisuMZ[_0x45fb50(0x139)]['Window_MenuStatus_selectLast'][_0x45fb50(0xd7)](this):this[_0x45fb50(0xf1)](0x0);},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x1e6)]=Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0xbc)],Window_MenuStatus['prototype'][_0x5b52fc(0xbc)]=function(){const _0x23a20c=_0x5b52fc;return this[_0x23a20c(0x186)]()?$gameParty['battleMembers']()['length']:VisuMZ['MainMenuCore'][_0x23a20c(0x1e6)][_0x23a20c(0xd7)](this);},Window_MenuStatus[_0x5b52fc(0xc8)]['showOnlyBattleMembers']=function(){const _0x4895a6=_0x5b52fc,_0x1d12be=VisuMZ[_0x4895a6(0x139)][_0x4895a6(0xf3)][_0x4895a6(0x1e9)];if(_0x1d12be[_0x4895a6(0x202)]===undefined)_0x1d12be[_0x4895a6(0x202)]=!![];const _0x1ac4b6=SceneManager['_scene'];if(!_0x1d12be[_0x4895a6(0x202)]){if(_0x1d12be[_0x4895a6(0x144)])return _0x1ac4b6[_0x4895a6(0xb5)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x5b52fc(0xc8)]['listStyle']=function(){const _0x4e92ff=_0x5b52fc,_0x411a97=SceneManager[_0x4e92ff(0x167)][_0x4e92ff(0xb5)];return _0x411a97===Scene_Menu?VisuMZ['MainMenuCore'][_0x4e92ff(0xf3)][_0x4e92ff(0x195)]:VisuMZ[_0x4e92ff(0x139)][_0x4e92ff(0xf3)]['InnerMenuListStyle'];},Window_MenuStatus['prototype'][_0x5b52fc(0x1aa)]=function(){const _0xa9c06d=_0x5b52fc,_0x67b19c=this[_0xa9c06d(0xb0)]();switch(_0x67b19c){case _0xa9c06d(0xe4):case _0xa9c06d(0x128):return 0x1;case _0xa9c06d(0x127):return 0x1;default:return $gameParty[_0xa9c06d(0x1db)]();}},Window_MenuStatus['prototype'][_0x5b52fc(0xdb)]=function(){const _0x58498f=_0x5b52fc,_0x340f83=this[_0x58498f(0xb0)]();switch(_0x340f83){case _0x58498f(0xe4):case _0x58498f(0x128):return $gameParty[_0x58498f(0x1db)]();default:return 0x1;}},VisuMZ[_0x5b52fc(0x139)]['Window_MenuStatus_itemHeight']=Window_MenuStatus['prototype'][_0x5b52fc(0x205)],Window_MenuStatus[_0x5b52fc(0xc8)]['itemHeight']=function(){const _0x4e219f=_0x5b52fc,_0x14d573=this[_0x4e219f(0xb0)]();switch(_0x14d573){case'vertical':case _0x4e219f(0x128):case _0x4e219f(0x127):return this[_0x4e219f(0x226)];case _0x4e219f(0x149):return Window_Selectable[_0x4e219f(0xc8)][_0x4e219f(0x205)][_0x4e219f(0xd7)](this);case _0x4e219f(0x1be):return this[_0x4e219f(0x1de)]()*0x2+0x8;default:return VisuMZ['MainMenuCore'][_0x4e219f(0x134)]['call'](this);}},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x166)]=function(_0x560a92){const _0x21e906=_0x5b52fc;this[_0x21e906(0xe3)](_0x560a92),this[_0x21e906(0xfe)](_0x560a92);},VisuMZ[_0x5b52fc(0x139)][_0x5b52fc(0x17c)]=Window_MenuStatus['prototype'][_0x5b52fc(0x136)],Window_MenuStatus['prototype']['drawActorGraphic']=function(_0x2dc5fd,_0x805cac,_0x56bf85,_0x181275,_0x17752a){const _0x442589=_0x5b52fc;switch(this[_0x442589(0x223)]()){case _0x442589(0x1b3):break;case _0x442589(0x171):this[_0x442589(0xee)](_0x2dc5fd,_0x805cac,_0x56bf85+0x1,_0x181275,_0x17752a-0x2);break;case _0x442589(0x19e):this['drawItemActorSvBattler'](_0x2dc5fd,_0x805cac,_0x56bf85+0x1,_0x181275,_0x17752a-0x2);break;default:this[_0x442589(0xe5)](_0x2dc5fd,_0x805cac,_0x56bf85,_0x181275,_0x17752a);break;}},Window_MenuStatus['prototype']['drawItemStatus']=function(_0x43d6f2){const _0xfa2bb3=_0x5b52fc;this['resetFontSettings']();const _0x229422=this[_0xfa2bb3(0x21b)](_0x43d6f2),_0x477628=this[_0xfa2bb3(0x188)](_0x43d6f2),_0x1ac8d1=this[_0xfa2bb3(0xb0)]();switch(_0x1ac8d1){case _0xfa2bb3(0xe4):this['drawItemStatusVerticalStyle'](_0x229422,_0x477628);break;case _0xfa2bb3(0x128):this[_0xfa2bb3(0x1ba)](_0x229422,_0x477628);break;case'solo':this['drawItemStatusSoloStyle'](_0x229422,_0x477628);break;case _0xfa2bb3(0x149):this[_0xfa2bb3(0x1ac)](_0x229422,_0x477628);break;case _0xfa2bb3(0x1be):this['drawItemStatusThickerStyle'](_0x229422,_0x477628);break;default:this[_0xfa2bb3(0x1c9)](_0x229422,_0x477628);break;}},Window_MenuStatus[_0x5b52fc(0xc8)]['drawItemStatusVerticalStyle']=function(_0x4a66e4,_0x2f19cd){const _0x255a31=_0x5b52fc;VisuMZ[_0x255a31(0x139)][_0x255a31(0xf3)]['ListStyles'][_0x255a31(0x1cb)][_0x255a31(0xd7)](this,_0x4a66e4,_0x2f19cd);},Window_MenuStatus[_0x5b52fc(0xc8)]['drawItemStatusPortraitStyle']=function(_0x56eb72,_0x4426e4){const _0x43dd9a=_0x5b52fc;if(_0x56eb72[_0x43dd9a(0x14d)]()!==''){const _0x2cd5f9=ImageManager[_0x43dd9a(0x10e)](_0x56eb72[_0x43dd9a(0x14d)]());_0x2cd5f9[_0x43dd9a(0x1f3)](this[_0x43dd9a(0x1bf)]['bind'](this,_0x56eb72,_0x4426e4));}else this['drawItemStatusVerticalStyle'](_0x56eb72,_0x4426e4);},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x1bf)]=function(_0x41a33d,_0x46c461){const _0x3811ef=_0x5b52fc;VisuMZ[_0x3811ef(0x139)][_0x3811ef(0xf3)][_0x3811ef(0xd3)][_0x3811ef(0x1a8)]['call'](this,_0x41a33d,_0x46c461);},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0xd0)]=function(_0x3e9e1b,_0x159aee){const _0x48762a=_0x5b52fc,_0x1ab3d0=ImageManager[_0x48762a(0x10e)](_0x3e9e1b[_0x48762a(0x14d)]());_0x1ab3d0[_0x48762a(0x1f3)](this[_0x48762a(0xa9)][_0x48762a(0x118)](this,_0x3e9e1b,_0x159aee));},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0xa9)]=function(_0x33298,_0x39c3fe){const _0x5c0f38=_0x5b52fc;VisuMZ[_0x5c0f38(0x139)][_0x5c0f38(0xf3)]['ListStyles'][_0x5c0f38(0xbe)]['call'](this,_0x33298,_0x39c3fe);},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x1ac)]=function(_0x524a20,_0x4deb15){const _0x6e2f9=_0x5b52fc;VisuMZ[_0x6e2f9(0x139)][_0x6e2f9(0xf3)][_0x6e2f9(0xd3)]['ThinStyle']['call'](this,_0x524a20,_0x4deb15);},Window_MenuStatus['prototype']['drawItemStatusThickerStyle']=function(_0x2da2cf,_0x27fb4a){const _0x27e8f2=_0x5b52fc;VisuMZ[_0x27e8f2(0x139)][_0x27e8f2(0xf3)][_0x27e8f2(0xd3)][_0x27e8f2(0x1d3)][_0x27e8f2(0xd7)](this,_0x2da2cf,_0x27fb4a);},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x18f)]=function(){const _0x83800=_0x5b52fc,_0xea282e=this[_0x83800(0xb0)]();if([_0x83800(0x149),_0x83800(0x1be)][_0x83800(0x16f)](_0xea282e))return![];return Window_StatusBase[_0x83800(0xc8)][_0x83800(0x18f)][_0x83800(0xd7)](this);},Window_MenuStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x1c9)]=function(_0x540fc1,_0x578a37){const _0x1070c4=_0x5b52fc;VisuMZ[_0x1070c4(0x139)]['Settings'][_0x1070c4(0xd3)]['DefaultStyle'][_0x1070c4(0xd7)](this,_0x540fc1,_0x578a37);},Window_SkillStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x170)]=function(_0x12b6e4,_0x2e710c,_0x25b110,_0x25287d,_0x4818d0){const _0x186ce8=_0x5b52fc;switch(this[_0x186ce8(0x223)]()){case _0x186ce8(0x1b3):break;case _0x186ce8(0x171):this[_0x186ce8(0xee)](_0x12b6e4,_0x2e710c,_0x25b110,_0x25287d,_0x4818d0);break;case _0x186ce8(0x19e):this['drawItemActorSvBattler'](_0x12b6e4,_0x2e710c,_0x25b110,_0x25287d,_0x4818d0);break;default:Window_StatusBase[_0x186ce8(0xc8)][_0x186ce8(0x170)]['call'](this,_0x12b6e4,_0x2e710c,_0x25b110,_0x25287d,_0x4818d0);break;}},Window_EquipStatus[_0x5b52fc(0xc8)][_0x5b52fc(0x170)]=function(_0x1a6793,_0x480b69,_0x23b57f,_0x49cf70,_0x422dda){const _0x12b002=_0x5b52fc;switch(this[_0x12b002(0x223)]()){case _0x12b002(0x1b3):break;case'sprite':this[_0x12b002(0xee)](_0x1a6793,_0x480b69,_0x23b57f,_0x49cf70,_0x422dda);break;case'svbattler':this[_0x12b002(0x1a2)](_0x1a6793,_0x480b69,_0x23b57f,_0x49cf70,_0x422dda);break;default:Window_StatusBase[_0x12b002(0xc8)][_0x12b002(0x170)][_0x12b002(0xd7)](this,_0x1a6793,_0x480b69,_0x23b57f,_0x49cf70,_0x422dda);break;}};function Window_ThinGold(){const _0x2cc211=_0x5b52fc;this[_0x2cc211(0xc3)](...arguments);}Window_ThinGold[_0x5b52fc(0xc8)]=Object['create'](Window_Gold[_0x5b52fc(0xc8)]),Window_ThinGold[_0x5b52fc(0xc8)][_0x5b52fc(0xb5)]=Window_ThinGold,Window_ThinGold[_0x5b52fc(0xc8)][_0x5b52fc(0x205)]=function(){const _0x353d98=_0x5b52fc;return this[_0x353d98(0x1de)]();},Window_ThinGold[_0x5b52fc(0xc8)][_0x5b52fc(0xb9)]=function(){const _0x149b49=_0x5b52fc;return Window_Selectable[_0x149b49(0xc8)][_0x149b49(0xb9)][_0x149b49(0xd7)](this);};function Window_Playtime(){const _0x289800=_0x5b52fc;this[_0x289800(0xc3)](...arguments);}Window_Playtime[_0x5b52fc(0xc8)]=Object[_0x5b52fc(0xe1)](Window_Selectable[_0x5b52fc(0xc8)]),Window_Playtime['prototype'][_0x5b52fc(0xb5)]=Window_Playtime,Window_Playtime[_0x5b52fc(0xc8)][_0x5b52fc(0xc3)]=function(_0xe31539){const _0x19c123=_0x5b52fc;this[_0x19c123(0x1a0)]=$gameSystem[_0x19c123(0xb3)](),this[_0x19c123(0x17d)]=0x3c,Window_Selectable[_0x19c123(0xc8)][_0x19c123(0xc3)]['call'](this,_0xe31539),this[_0x19c123(0x15a)]();},Window_Playtime[_0x5b52fc(0xc8)]['itemHeight']=function(){return this['lineHeight']();},Window_Playtime['prototype'][_0x5b52fc(0xab)]=function(){const _0x401523=_0x5b52fc;Window_Selectable[_0x401523(0xc8)][_0x401523(0xab)][_0x401523(0xd7)](this),this[_0x401523(0x1bb)]();},Window_Playtime[_0x5b52fc(0xc8)][_0x5b52fc(0x1bb)]=function(){const _0x4b0f3e=_0x5b52fc;if(this[_0x4b0f3e(0x17d)]-->0x0){if(this[_0x4b0f3e(0x17d)]<=0x0)this[_0x4b0f3e(0x15a)]();}},Window_Playtime[_0x5b52fc(0xc8)][_0x5b52fc(0x15a)]=function(){const _0x3a6f2b=_0x5b52fc;this['_timer']=0x3c;const _0x29da2a=this[_0x3a6f2b(0xde)](0x0),_0x4e8f3b=_0x29da2a['x'],_0x7d9b01=_0x29da2a['y'],_0x36247c=_0x29da2a[_0x3a6f2b(0x12a)];this[_0x3a6f2b(0x1d6)]['clear'](),this[_0x3a6f2b(0x1dd)](_0x29da2a),this[_0x3a6f2b(0xea)](_0x29da2a),this['drawPlaytime'](_0x29da2a);},Window_Playtime[_0x5b52fc(0xc8)][_0x5b52fc(0xf5)]=function(){const _0x3bcdb5=_0x5b52fc;Window_Selectable[_0x3bcdb5(0xc8)]['resetFontSettings'][_0x3bcdb5(0xd7)](this),this[_0x3bcdb5(0x1d6)][_0x3bcdb5(0x1cf)]=VisuMZ[_0x3bcdb5(0x139)][_0x3bcdb5(0xf3)][_0x3bcdb5(0x1c2)][_0x3bcdb5(0x1f1)];},Window_Playtime[_0x5b52fc(0xc8)][_0x5b52fc(0x1dd)]=function(_0x21854b){const _0x1c8f2f=_0x5b52fc;if(VisuMZ[_0x1c8f2f(0x139)][_0x1c8f2f(0xf3)][_0x1c8f2f(0x1c2)][_0x1c8f2f(0x179)]>0x0){const _0x5ef2e6=VisuMZ[_0x1c8f2f(0x139)]['Settings'][_0x1c8f2f(0x1c2)][_0x1c8f2f(0x179)],_0x32c602=_0x21854b['y']+(this[_0x1c8f2f(0x1de)]()-ImageManager['iconHeight'])/0x2;this[_0x1c8f2f(0x1c7)](_0x5ef2e6,_0x21854b['x'],_0x32c602);const _0x586783=ImageManager[_0x1c8f2f(0x1b9)]+0x4;_0x21854b['x']+=_0x586783,_0x21854b['width']-=_0x586783;}},Window_Playtime['prototype'][_0x5b52fc(0xea)]=function(_0x42bb2c){const _0x333eef=_0x5b52fc;this[_0x333eef(0xf5)](),this['changeTextColor'](ColorManager[_0x333eef(0x147)]());const _0x4765cc=VisuMZ[_0x333eef(0x139)][_0x333eef(0xf3)][_0x333eef(0x1c2)][_0x333eef(0xd6)];this[_0x333eef(0xcb)](_0x4765cc,_0x42bb2c['x'],_0x42bb2c['y'],_0x42bb2c['width'],_0x333eef(0x17a)),this[_0x333eef(0xbb)]();},Window_Playtime['prototype']['drawPlaytime']=function(_0x5dfa2d){const _0xd75a35=_0x5b52fc,_0x254578=$gameSystem[_0xd75a35(0xb3)]();this['drawText'](_0x254578,_0x5dfa2d['x'],_0x5dfa2d['y'],_0x5dfa2d[_0xd75a35(0x12a)],_0xd75a35(0x10b));};function _0x36d0(_0x50acee,_0x31dda0){const _0x144301=_0x1443();return _0x36d0=function(_0x36d0ee,_0x463e98){_0x36d0ee=_0x36d0ee-0xa9;let _0x12eb61=_0x144301[_0x36d0ee];return _0x12eb61;},_0x36d0(_0x50acee,_0x31dda0);}function Window_MenuVariables(){const _0x5a0cc8=_0x5b52fc;this[_0x5a0cc8(0xc3)](...arguments);}Window_MenuVariables[_0x5b52fc(0xc8)]=Object[_0x5b52fc(0xe1)](Window_Selectable['prototype']),Window_MenuVariables['prototype'][_0x5b52fc(0xb5)]=Window_MenuVariables,Window_MenuVariables['prototype'][_0x5b52fc(0xc3)]=function(_0x9f7e98){const _0x4f208b=_0x5b52fc;Window_Selectable[_0x4f208b(0xc8)][_0x4f208b(0xc3)][_0x4f208b(0xd7)](this,_0x9f7e98),this[_0x4f208b(0x1bc)]=VisuMZ['MainMenuCore'][_0x4f208b(0xf3)][_0x4f208b(0x12d)]['VarList'],this['refresh']();},Window_MenuVariables['prototype'][_0x5b52fc(0x205)]=function(){return this['lineHeight']();},Window_MenuVariables[_0x5b52fc(0xc8)][_0x5b52fc(0xdb)]=function(){const _0x54fd3f=_0x5b52fc,_0x115556=SceneManager[_0x54fd3f(0x167)]['commandWindowStyle']();return _0x115556==='default'?0x1:VisuMZ[_0x54fd3f(0x139)]['Settings'][_0x54fd3f(0x12d)][_0x54fd3f(0x11b)][_0x54fd3f(0x1d4)];},Window_MenuVariables[_0x5b52fc(0xc8)][_0x5b52fc(0xf5)]=function(){const _0x226750=_0x5b52fc;Window_Selectable[_0x226750(0xc8)][_0x226750(0xf5)]['call'](this),this[_0x226750(0x1d6)][_0x226750(0x1cf)]=VisuMZ[_0x226750(0x139)]['Settings'][_0x226750(0x12d)][_0x226750(0x1f1)],this[_0x226750(0x21e)](ColorManager[_0x226750(0x147)]());},Window_MenuVariables[_0x5b52fc(0xc8)]['maxItems']=function(){const _0x59af2e=_0x5b52fc;return this[_0x59af2e(0x1bc)][_0x59af2e(0x1d4)];},Window_MenuVariables[_0x5b52fc(0xc8)][_0x5b52fc(0x12b)]=function(){const _0x298a91=_0x5b52fc,_0x53d899=this['topIndex']();for(let _0x5d9031=0x0;_0x5d9031<this[_0x298a91(0x1e0)]();_0x5d9031++){const _0x5c456f=_0x53d899+_0x5d9031;_0x5c456f<this[_0x298a91(0xbc)]()&&(this[_0x298a91(0xac)](_0x5c456f),this['drawItem'](_0x5c456f));}},Window_MenuVariables[_0x5b52fc(0xc8)]['drawItemBackground']=function(_0x31bcd2){},Window_MenuVariables[_0x5b52fc(0xc8)][_0x5b52fc(0x166)]=function(_0x5bae37){const _0x3d7f98=_0x5b52fc,_0x2f205e=this[_0x3d7f98(0x1bc)][_0x5bae37];if(_0x2f205e<=0x0)return;if(!$dataSystem[_0x3d7f98(0xe9)][_0x2f205e])return;const _0x369a53=this[_0x3d7f98(0xde)](_0x5bae37);this[_0x3d7f98(0xf5)]();let _0x3d74f2=0x0,_0x16f0e9=$dataSystem[_0x3d7f98(0xe9)][_0x2f205e][_0x3d7f98(0xd9)]();_0x16f0e9[_0x3d7f98(0x103)](/\\I\[(\d+)\]/i)&&(_0x3d74f2=Number(RegExp['$1']),_0x16f0e9=_0x16f0e9[_0x3d7f98(0x1e3)](/\\I\[(\d+)\]/i,'')[_0x3d7f98(0xd9)]());if(_0x3d74f2>0x0){const _0x2d0468=_0x369a53['y']+(this[_0x3d7f98(0x1de)]()-ImageManager['iconHeight'])/0x2;this[_0x3d7f98(0x1c7)](_0x3d74f2,_0x369a53['x'],_0x2d0468);const _0x326e88=ImageManager[_0x3d7f98(0x1b9)]+0x4;_0x369a53['x']+=_0x326e88,_0x369a53[_0x3d7f98(0x12a)]-=_0x326e88;}this[_0x3d7f98(0xcb)](_0x16f0e9,_0x369a53['x'],_0x369a53['y'],_0x369a53['width'],_0x3d7f98(0x17a)),this[_0x3d7f98(0x21e)](ColorManager['normalColor']()),this[_0x3d7f98(0xcb)]($gameVariables[_0x3d7f98(0x114)](_0x2f205e),_0x369a53['x'],_0x369a53['y'],_0x369a53[_0x3d7f98(0x12a)],_0x3d7f98(0x10b));};