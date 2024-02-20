//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [MainMenuCore]
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
 * Version 1.23: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Battle Tactics' command.
 * *** This is for the upcoming VisuStella MZ plugins.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'battleGridTactics' option(s)
 *      and click copy. Go to the target project's Main Menu Core's 'Command
 *      Window List' plugin parameter. Paste the command where you want it
 *      to go.
 * 
 * Version 1.22: October 12, 2023
 * * Feature Update!
 * ** Subcategories are now maintained when exiting a scene pushed forward by
 *    a subcategory. Added by Olivia and sponsored by AndyL.
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
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments[1]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments[0];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"bestiary\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"10\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BestiaryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_Bestiary &&\\\\n    this.isBestiaryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBestiaryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBestiary();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"cgGallery\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"311\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.cgGalleryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CGGallery &&\\\\n    this.isCgGalleryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCgGalleryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCgGallery();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"creditsPage\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.CreditsPageMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CreditsPage &&\\\\n    this.isCreditsPageCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCreditsPageCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCreditsPage();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"patchNotes\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.PatchNotesMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_PatchNotes &&\\\\n    this.isPatchNotesCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isPatchNotesCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPatchNotes();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"battleGridTactics\",\"Subcategory:str\":\"\",\"Icon:num\":\"76\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BattleGridTacticsMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_BattleGridSystem &&\\\\n    this.isBattleGridTacticsCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBattleGridTacticsCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBattleGridTactics();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
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

function _0x25ed(){const _0x1d49d2=['drawItemStatusThinStyle','forceDisable','map','lineHeight','_variableWindow','resetTextColor','blt','MIKzF','systemColor','right','update','_mainMenuSubcategory','characterName','drawPlaytime','EnableJS','svActorVertCells','drawItemImage','height','itemHeight','VisuMZ_0_CoreEngine','svActorHorzCells','variables','ytWmX','setHandler','InnerMenuListStyle','maxBattleMembers','_data','commandName','addMainCommands','eINtg','battleMembers','QxMmh','78310mGnahq','isMainMenuCommandVisible','MenuCommandForceDisable','_subcategory','_mainMenuCore','top','adjustDefaultCommandWindowRect','loadOtherActorImages','bxYsk','drawItem','Scene_Menu_statusWindowRect','drawTextEx','VfRAB','loadSvActor','nABYJ','addSaveCommand','drawItemActorSprite','ceil','parse','remove','Window_MenuCommand_initialize','mainMenuCoreSettings','ThinStyle','xTYSN','numVisibleRows','_actor','includes','getMenuImage','faceHeight','mainAreaHeight','bind','ConvertParams','removeSubcategory','goldWindowRectTopStyle','initialize','calcWindowHeight','bitmap','commandWindowRectThinBottomStyle','max','item','vertical','_statusWindow','iconText','thinGoldWindow','floor','1899813JZxBlf','Window_MenuStatus_selectLast','Scene_MenuBase_createBackground','variableWindowRect','STRUCT','commandPersonal','icon','MobileThickness','createCommandNameWindow','Symbols','iconWidth','forceEnable','makeMainMenuCoreCommandList','GaOrp','drawText','iGDmt','actor','popScene','tigLk','isBattleMember','Rows','SceneManager_push','BtVay','resetFontSettings','playtimeWindowRectTopStyle','ListStyles','getMenuImageOffsetX','isSubcategoryVisible','itemLineRect','onPersonalCancel','commandNameWindowDrawText','eEmon','_commandList','initMainMenuCore','currentSymbol','TextAlign','bynyA','_scrollDuration','opacity','thicker','faceWidth','none','windowPadding','ARRAYSTR','maxCols','ChangeActorMenuImageJS','name','commandNameWindowDrawBackground','registerCommand','drawItemStatusVerticalStyle','addSymbolBridge','statusWindowRect','Eoans','default','commandCommonEvent','updateOpacity','pkyPC','DefaultStyle','battlerName','commandNameWindowCenter','bottom','6oWXBqB','Style','commandWindowRectBottomStyle','1075090cjZDWV','formation','Window_MenuStatus_drawItemImage','ChangeActorMenuImageGroup','_targetX','Scene_Menu_commandPersonal','Step2','_list','thinTop','adjustStatusWindowMobile','zaPPc','Untitled','createActorMenuBackgroundImageSprite','VerticalStyle','drawIcon','cancel','maySr','eGHsz','Enable','findExt','save','ShowJS','MenuCommandForceShow','graphicType','AdjustCommandHeight','BgType','options','index','lhNhs','drawItemActorSvBattler','listStyle','text','createPlaytimeWindow','currentExt','setBackgroundType','gVfEV','adjustCommandHeightByVariable','activate','qlWya','SoloQuick','center','Window_MenuStatus_itemHeight','getMainMenuSymbolState','svbattler','subcategory','commandStyle','addWindow','Subcategory','mTQpT','loadBitmap','Playtime','adjustCommandHeightByPlaytime','YgWFp','mainAreaBottom','Game_System_initialize','HbjcP','commandFormation','changePaintOpacity','drawItemActorFace','ARRAYSTRUCT','QLCEF','commandLoad','clear','drawItemStyleIconText','refresh','fontSize','General','openness','onFormationCancel','PersonalHandlerJS','Scene_Menu_onPersonalCancel','selectLast','KnIie','Scene_Menu_commandFormation','Step1','_goldWindow','MainMenuCore','loadFaceImages','statusWindowRectMobileStyle','concat','NUM','SUBCATEGORY_LIST','updateDuration','parameters','StatusSelectLast','ARRAYNUM','solo','YZtHx','itemRect','Scene_Menu_onFormationCancel','drawItemActorMenuImage','forceHideMainMenuCommand','round','updateActor','canCreatePlaytimeWindow','isIncludedInSubcategory','yAZvE','contents','smoothSelect','commandWindowRectTopStyle','addLoadListener','format','open','110joMiug','160GvSHkh','commandWindowRectMobileStyle','_playtimeWindow','isBigCharacter','VxcJY','min','shift','commandWindowRect','drawItemStatusPortraitStyleOnLoad','Symbol','AutoGoldY','statusWindowRectTopStyle','ksMLf','FibfT','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateSmoothScroll','uRwdZ','applyThinnerGoldWindowRect','Step1Start','iIZmE','drawItemStyleIcon','note','HideMainMenuOnly','addChild','_commandWindow','CommandList','ARRAYEVAL','Scene_Menu_goldWindowRect','forceHide','Scene_MenuBase_updateActor','Variable','_playtimeText','Window_MenuStatus_maxItems','ThinGoldWindow','oDvHP','_scene','isMainMenuCommandEnabled','doesSubcategoryExist','2ahHIzj','LBSrs','description','_menuImage','updatePosition','changeTextColor','constructor','_commandNameWindow','yTJNw','addGameEndCommand','drawItemStatus','drawItemStatusPortraitStyle','playtimeText','updateTimer','call','kYuxj','ShowReserve','drawActorGraphic','_timer','callUpdateHelp','playtimeWindowRect','textSizeEx','commandWindowStyle','TextJS','27hnsAZT','KCGby','createStatusWindow','drawItemStatusSoloStyleOnLoad','mainAreaTop','forceShowMainMenuCommand','auto','value','drawTimeLabel','createVariableWindow','width','updateCommandNameWindow','XeHjX','CustomCmdWin','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SoloStyle','VIVZX','variableWindowRectBottomStyle','Cols','createDummyWindow','cxJfA','isCommandEnabled','tLbPr','6694560mIEtjI','create','exit','VEQyS','thin','filter','commandStyleCheck','VarList','commandCancel','_bitmapReady','boxWidth','maxVisibleItems','CommandWindowStyle','fWovg','innerHeight','Icon','RnoDW','mainCommandWidth','isDisplayActorMenuBackgroundImage','setup','initMenuImage','isExpGaugeDrawn','ZupkA','Isngg','TQjDU','ARRAYJSON','101598XDwbvZ','forceEnableMainMenuCommand','MenuCommandForceEnable','members','_actorMenuBgSprite','commandWindowRectThinTopStyle','loadCharacter','setMenuImage','GUbCB','return\x200','HHfWT','CoreEngine','onBitmapLoad','sprite','ARRAYFUNC','MtrkL','isSoloQuickMode','Scene_Menu_create','6228166odrynV','addFormationCommand','FloJz','status','ztgSW','AutoGoldHeight','showOnlyBattleMembers','select','left','currentSubcategory','loadPicture','drawActorFace','addOriginalCommands','forceShow','length','ZrkFh','730248jOOBZg','onPersonalOk','CallHandlerJS','addOptionsCommand','drawItemStatusDefaultStyle','isArray','WindowRect','\x5cI[%1]%2','ChangeActorMenuImageRange','push','drawItemStatusSoloStyle','zpbjO','characterIndex','lPdgz','HsYtY','StatusListStyle','MenuCommandForceHide','thinBottom','addCommand','playtimeWindowRectBottomStyle','Settings','goldWindowRect','prototype','drawItemStatusThickerStyle','maxItems','Scene_Menu_commandWindowRect','QoL','jDeKk','aBGsZ','Step1End','drawItemBackground','ExtJS','yEVqs','PortraitStyle','setActor','statusWindowRectBottomStyle','itemTextAlign','drawTimeIcon','gameEnd','goldWindowRectBottomStyle','forceDisableMainMenuCommand','variableWindowRectTopStyle','match','OAVIn','StatusGraphic','replace','mDUmk','QDNTA','setTopRow','FigtM','needsDummyWindow','yQumK','Scene_Menu_createStatusWindow','getMenuImageOffsetY','innerWidth','EVAL','cBOXe','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Window_StatusBase_loadFaceImages','_dummyWindow','SIUvq','mobile','canCreateVariableWindow','version','fittingHeight','setSubcategory','_duration','drawPendingItemBackground','portrait','iconHeight','VRYKz','lJabe','close','getSubcategoryList','trim','TextStr','colSpacing','STR','JSON','Game_Actor_setup'];_0x25ed=function(){return _0x1d49d2;};return _0x25ed();}const _0x364f2c=_0x3219;(function(_0x205683,_0x56495b){const _0x360296=_0x3219,_0x219cb3=_0x205683();while(!![]){try{const _0x39e473=parseInt(_0x360296(0x156))/0x1+parseInt(_0x360296(0x2e3))/0x2*(-parseInt(_0x360296(0x215))/0x3)+parseInt(_0x360296(0x2bd))/0x4*(parseInt(_0x360296(0x1e8))/0x5)+-parseInt(_0x360296(0x252))/0x6*(parseInt(_0x360296(0x168))/0x7)+-parseInt(_0x360296(0x178))/0x8*(parseInt(_0x360296(0x125))/0x9)+-parseInt(_0x360296(0x255))/0xa*(-parseInt(_0x360296(0x2bc))/0xb)+parseInt(_0x360296(0x13c))/0xc;if(_0x39e473===_0x56495b)break;else _0x219cb3['push'](_0x219cb3['shift']());}catch(_0x148b9a){_0x219cb3['push'](_0x219cb3['shift']());}}}(_0x25ed,0x89be4));var label=_0x364f2c(0x2a1),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x364f2c(0x141)](function(_0x1918a6){const _0x94a083=_0x364f2c;return _0x1918a6[_0x94a083(0x16b)]&&_0x1918a6[_0x94a083(0x2e5)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x364f2c(0x18c)]=VisuMZ[label][_0x364f2c(0x18c)]||{},VisuMZ[_0x364f2c(0x207)]=function(_0x1394b3,_0x43e81b){const _0x4988f6=_0x364f2c;for(const _0x5ed2b3 in _0x43e81b){if(_0x5ed2b3['match'](/(.*):(.*)/i)){if(_0x4988f6(0x1a9)!==_0x4988f6(0x1a7)){const _0x739300=String(RegExp['$1']),_0x4a414f=String(RegExp['$2'])['toUpperCase']()[_0x4988f6(0x1c2)]();let _0x19906f,_0x863a39,_0x113fc7;switch(_0x4a414f){case _0x4988f6(0x2a5):_0x19906f=_0x43e81b[_0x5ed2b3]!==''?Number(_0x43e81b[_0x5ed2b3]):0x0;break;case _0x4988f6(0x2aa):_0x863a39=_0x43e81b[_0x5ed2b3]!==''?JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]):[],_0x19906f=_0x863a39[_0x4988f6(0x1ca)](_0x304b0b=>Number(_0x304b0b));break;case _0x4988f6(0x1af):_0x19906f=_0x43e81b[_0x5ed2b3]!==''?eval(_0x43e81b[_0x5ed2b3]):null;break;case _0x4988f6(0x2d7):_0x863a39=_0x43e81b[_0x5ed2b3]!==''?JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]):[],_0x19906f=_0x863a39[_0x4988f6(0x1ca)](_0x429ba7=>eval(_0x429ba7));break;case _0x4988f6(0x1c6):_0x19906f=_0x43e81b[_0x5ed2b3]!==''?JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]):'';break;case _0x4988f6(0x155):_0x863a39=_0x43e81b[_0x5ed2b3]!==''?JSON['parse'](_0x43e81b[_0x5ed2b3]):[],_0x19906f=_0x863a39[_0x4988f6(0x1ca)](_0x19eccd=>JSON[_0x4988f6(0x1fa)](_0x19eccd));break;case'FUNC':_0x19906f=_0x43e81b[_0x5ed2b3]!==''?new Function(JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3])):new Function(_0x4988f6(0x15f));break;case _0x4988f6(0x164):_0x863a39=_0x43e81b[_0x5ed2b3]!==''?JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]):[],_0x19906f=_0x863a39['map'](_0x172bee=>new Function(JSON['parse'](_0x172bee)));break;case _0x4988f6(0x1c5):_0x19906f=_0x43e81b[_0x5ed2b3]!==''?String(_0x43e81b[_0x5ed2b3]):'';break;case _0x4988f6(0x240):_0x863a39=_0x43e81b[_0x5ed2b3]!==''?JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]):[],_0x19906f=_0x863a39[_0x4988f6(0x1ca)](_0x55859a=>String(_0x55859a));break;case _0x4988f6(0x219):_0x113fc7=_0x43e81b[_0x5ed2b3]!==''?JSON['parse'](_0x43e81b[_0x5ed2b3]):{},_0x1394b3[_0x739300]={},VisuMZ['ConvertParams'](_0x1394b3[_0x739300],_0x113fc7);continue;case _0x4988f6(0x290):_0x863a39=_0x43e81b[_0x5ed2b3]!==''?JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]):[],_0x19906f=_0x863a39[_0x4988f6(0x1ca)](_0x2e19e5=>VisuMZ['ConvertParams']({},JSON['parse'](_0x2e19e5)));break;default:continue;}_0x1394b3[_0x739300]=_0x19906f;}else return _0x2de402(_0x39fd24['$1']);}}return _0x1394b3;},(_0x30f32d=>{const _0x392c4d=_0x364f2c,_0x23e5c9=_0x30f32d[_0x392c4d(0x243)];for(const _0x3a491c of dependencies){if(!Imported[_0x3a491c]){alert(_0x392c4d(0x133)[_0x392c4d(0x2ba)](_0x23e5c9,_0x3a491c)),SceneManager['exit']();break;}}const _0x58fc46=_0x30f32d['description'];if(_0x58fc46['match'](/\[Version[ ](.*?)\]/i)){const _0x45f831=Number(RegExp['$1']);_0x45f831!==VisuMZ[label][_0x392c4d(0x1b7)]&&(alert(_0x392c4d(0x1b1)['format'](_0x23e5c9,_0x45f831)),SceneManager[_0x392c4d(0x13e)]());}if(_0x58fc46[_0x392c4d(0x1a2)](/\[Tier[ ](\d+)\]/i)){if(_0x392c4d(0x291)===_0x392c4d(0x165))return this[_0x392c4d(0x1cb)]();else{const _0xb3bfc3=Number(RegExp['$1']);if(_0xb3bfc3<tier){if(_0x392c4d(0x1a6)===_0x392c4d(0x1a6))alert(_0x392c4d(0x2cb)['format'](_0x23e5c9,_0xb3bfc3,tier)),SceneManager[_0x392c4d(0x13e)]();else{const _0x5c846d=_0x2b9fce[_0x392c4d(0x146)],_0x1fabb9=this[_0x392c4d(0x205)]()-this[_0x392c4d(0x2d5)][_0x392c4d(0x1d9)]-this['_goldWindow'][_0x392c4d(0x1d9)],_0x196b92=0x0,_0x46f25f=this[_0x392c4d(0x2a0)]['y']+this[_0x392c4d(0x2a0)][_0x392c4d(0x1d9)];return new _0x3bbca8(_0x196b92,_0x46f25f,_0x5c846d,_0x1fabb9);}}else tier=Math[_0x392c4d(0x20e)](_0xb3bfc3,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x30f32d[_0x392c4d(0x2a8)]);})(pluginData),PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)],_0x364f2c(0x258),_0x2cc418=>{const _0x48757d=_0x364f2c;VisuMZ[_0x48757d(0x207)](_0x2cc418,_0x2cc418);const _0x65774=_0x2cc418['Step1'],_0x33ab86=_0x2cc418[_0x48757d(0x25b)];for(let _0x16c8f6 of _0x65774){if(_0x48757d(0x115)===_0x48757d(0x115)){_0x16c8f6=parseInt(_0x16c8f6)||0x0;if(_0x16c8f6<=0x0)continue;const _0x27018c=$gameActors[_0x48757d(0x225)](_0x16c8f6);if(!_0x27018c)continue;_0x27018c[_0x48757d(0x15d)](_0x33ab86);}else this[_0x48757d(0x28e)](_0x2cc910[_0x48757d(0x228)]());}}),PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)],_0x364f2c(0x180),_0x568285=>{const _0x224acd=_0x364f2c;VisuMZ[_0x224acd(0x207)](_0x568285,_0x568285);const _0x11deb0=_0x568285[_0x224acd(0x195)]>=_0x568285[_0x224acd(0x2cf)]?_0x568285[_0x224acd(0x2cf)]:_0x568285['Step1End'],_0x4ff187=_0x568285[_0x224acd(0x195)]>=_0x568285[_0x224acd(0x2cf)]?_0x568285['Step1End']:_0x568285[_0x224acd(0x2cf)],_0x4adc98=Array(_0x4ff187-_0x11deb0+0x1)['fill']()[_0x224acd(0x1ca)]((_0x2119f0,_0x323922)=>_0x11deb0+_0x323922),_0x4ec79e=_0x568285[_0x224acd(0x25b)];for(let _0x3e8011 of _0x4adc98){_0x3e8011=parseInt(_0x3e8011)||0x0;if(_0x3e8011<=0x0)continue;const _0x356462=$gameActors[_0x224acd(0x225)](_0x3e8011);if(!_0x356462)continue;_0x356462[_0x224acd(0x15d)](_0x4ec79e);}}),PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)],_0x364f2c(0x242),_0x35c112=>{const _0x1df640=_0x364f2c;VisuMZ[_0x1df640(0x207)](_0x35c112,_0x35c112);const _0x416c4c=_0x35c112[_0x1df640(0x29f)];let _0x12e97d=[];while(_0x416c4c[_0x1df640(0x176)]>0x0){const _0xac12ca=_0x416c4c[_0x1df640(0x2c3)]();if(Array[_0x1df640(0x17d)](_0xac12ca))_0x12e97d=_0x12e97d[_0x1df640(0x2a4)](_0xac12ca);else{if(_0x1df640(0x1e5)!==_0x1df640(0x131))_0x12e97d[_0x1df640(0x181)](_0xac12ca);else return!![];}}const _0x47c50e=_0x35c112[_0x1df640(0x25b)];for(let _0x4dfd50 of _0x12e97d){if(_0x1df640(0x265)===_0x1df640(0x27b))_0x277a6f=_0x43eb87(_0x55e57e['$1']),_0x485d1a=_0x514fab[_0x1df640(0x1a5)](/\\I\[(\d+)\]/i,'')[_0x1df640(0x1c2)]();else{_0x4dfd50=parseInt(_0x4dfd50)||0x0;if(_0x4dfd50<=0x0)continue;const _0x51618f=$gameActors[_0x1df640(0x225)](_0x4dfd50);if(!_0x51618f)continue;_0x51618f['setMenuImage'](_0x47c50e);}}}),PluginManager['registerCommand'](pluginData['name'],'MenuCommandClear',_0x4f3804=>{const _0x9aa619=_0x364f2c;VisuMZ[_0x9aa619(0x207)](_0x4f3804,_0x4f3804);const _0x182c72=_0x4f3804[_0x9aa619(0x21e)]||[];for(const _0x49c933 of _0x182c72){if('mTQpT'!==_0x9aa619(0x285)){const _0x152dec=_0x3effd4[_0x9aa619(0x284)]||'';if(!this[_0x9aa619(0x2e2)](_0x152dec)&&this[_0x9aa619(0x171)]()==='')return!![];return _0x152dec===this[_0x9aa619(0x171)]();}else $gameSystem['clearShowMainMenuCommand'](_0x49c933);}}),PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)],_0x364f2c(0x158),_0x1a7b45=>{const _0x50794a=_0x364f2c;VisuMZ['ConvertParams'](_0x1a7b45,_0x1a7b45);const _0x2b9cd8=_0x1a7b45[_0x50794a(0x21e)]||[];for(const _0x432985 of _0x2b9cd8){if(_0x50794a(0x194)===_0x50794a(0x194))$gameSystem['forceEnableMainMenuCommand'](_0x432985);else return this[_0x50794a(0x254)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x364f2c(0x1ea),_0xa66458=>{const _0x43bbd4=_0x364f2c;VisuMZ[_0x43bbd4(0x207)](_0xa66458,_0xa66458);const _0x2f8086=_0xa66458[_0x43bbd4(0x21e)]||[];for(const _0x1a5cdf of _0x2f8086){if(_0x43bbd4(0x193)!=='jDeKk'){let _0x2d3411=_0x35864f['Symbol'];if(this[_0x43bbd4(0x1e9)](_0x2d3411,_0x3d94d4)){let _0x1ed29d=_0x3d707d['TextStr'];if(['',_0x43bbd4(0x260)][_0x43bbd4(0x202)](_0x1ed29d))_0x1ed29d=_0x4b18f8[_0x43bbd4(0x124)]['call'](this);const _0x201665=_0x1cee39[_0x43bbd4(0x14b)];_0x201665>0x0&&this[_0x43bbd4(0x282)]()!==_0x43bbd4(0x274)&&(_0x1ed29d='\x5cI[%1]%2'[_0x43bbd4(0x2ba)](_0x201665,_0x1ed29d));const _0x44c725=this[_0x43bbd4(0x2e1)](_0x2d3411,_0x58e8f8),_0x48de90=_0x3ddc68[_0x43bbd4(0x197)]['call'](this);_0x2d3411===_0x43bbd4(0x281)&&(_0x4cbd0f++,_0x2d3411+=_0x6cd85e),this['addCommand'](_0x1ed29d,_0x2d3411,_0x44c725,_0x48de90),this[_0x43bbd4(0x1df)](_0x2d3411,_0x4204aa[_0x43bbd4(0x17a)][_0x43bbd4(0x206)](this,_0x48de90));}this[_0x43bbd4(0x247)](_0x2d3411);}else $gameSystem[_0x43bbd4(0x1a0)](_0x1a5cdf);}}),PluginManager['registerCommand'](pluginData[_0x364f2c(0x243)],_0x364f2c(0x188),_0x25cdfb=>{const _0x4aa71b=_0x364f2c;VisuMZ[_0x4aa71b(0x207)](_0x25cdfb,_0x25cdfb);const _0x236299=_0x25cdfb[_0x4aa71b(0x21e)]||[];for(const _0x565cb2 of _0x236299){if(_0x4aa71b(0x227)!==_0x4aa71b(0x227)){_0x434fa3['ConvertParams'](_0x4af4cd,_0x3f65b9);const _0x47e697=_0x2a1d72[_0x4aa71b(0x21e)]||[];for(const _0x2b7ea5 of _0x47e697){_0x18047b[_0x4aa71b(0x2b0)](_0x2b7ea5);}}else $gameSystem['forceHideMainMenuCommand'](_0x565cb2);}}),PluginManager[_0x364f2c(0x245)](pluginData['name'],_0x364f2c(0x26b),_0x31b535=>{const _0x2e067f=_0x364f2c;VisuMZ[_0x2e067f(0x207)](_0x31b535,_0x31b535);const _0x3ea974=_0x31b535[_0x2e067f(0x21e)]||[];for(const _0x57e0c6 of _0x3ea974){$gameSystem['forceShowMainMenuCommand'](_0x57e0c6);}}),VisuMZ['MainMenuCore'][_0x364f2c(0x22a)]=SceneManager[_0x364f2c(0x181)],SceneManager['push']=function(_0x4f9772){const _0x3d4a9c=_0x364f2c;_0x4f9772===Scene_Menu&&($gameTemp[_0x3d4a9c(0x1d3)]=undefined),VisuMZ['MainMenuCore']['SceneManager_push'][_0x3d4a9c(0x11b)](this,_0x4f9772);},VisuMZ['MainMenuCore']['Game_System_initialize']=Game_System[_0x364f2c(0x18e)][_0x364f2c(0x20a)],Game_System['prototype'][_0x364f2c(0x20a)]=function(){const _0x5e5dcb=_0x364f2c;VisuMZ['MainMenuCore'][_0x5e5dcb(0x28b)][_0x5e5dcb(0x11b)](this),this['initMainMenuCore']();},Game_System[_0x364f2c(0x18e)][_0x364f2c(0x236)]=function(){const _0x55c1d3=_0x364f2c;this[_0x55c1d3(0x1ec)]=this[_0x55c1d3(0x1ec)]||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x364f2c(0x18e)][_0x364f2c(0x1fd)]=function(){const _0x18bf54=_0x364f2c;if(this[_0x18bf54(0x1ec)]===undefined)this[_0x18bf54(0x236)]();const _0x495e33=['forceShow',_0x18bf54(0x2d9),_0x18bf54(0x220),'forceDisable'];for(const _0x5d508e of _0x495e33){_0x18bf54(0x154)!==_0x18bf54(0x154)?(this['adjustCommandHeightByPlaytime']()&&(_0x1d80d0[_0x18bf54(0x1d9)]-=this['playtimeWindowRect']()['height']),this[_0x18bf54(0x279)]()&&(_0x27c1a1[_0x18bf54(0x1d9)]-=this['variableWindowRect']()[_0x18bf54(0x1d9)])):this[_0x18bf54(0x1ec)][_0x5d508e]=this[_0x18bf54(0x1ec)][_0x5d508e]||[];}return this['_mainMenuCore'];},Game_System[_0x364f2c(0x18e)][_0x364f2c(0x27f)]=function(_0x31335e,_0x1d0b25){const _0x2a97c4=_0x364f2c,_0x419789=this[_0x2a97c4(0x1fd)]();if(!_0x419789[_0x1d0b25])return![];return _0x419789[_0x1d0b25]['includes'](_0x31335e);},Game_System[_0x364f2c(0x18e)]['clearShowMainMenuCommand']=function(_0x382340){const _0x4cbedc=_0x364f2c,_0x222fa1=this[_0x4cbedc(0x1fd)](),_0x75e505=[_0x4cbedc(0x175),_0x4cbedc(0x2d9),_0x4cbedc(0x220),_0x4cbedc(0x1c9)];for(const _0x370c8c of _0x75e505){if(_0x4cbedc(0x22b)===_0x4cbedc(0x22b))_0x222fa1[_0x370c8c][_0x4cbedc(0x1fb)](_0x382340);else{const _0x231dca=this['currentSubcategory']();this[_0x4cbedc(0x1eb)]='',_0x213c07[_0x4cbedc(0x1d3)]=_0x10cead,this[_0x4cbedc(0x295)](),this[_0x4cbedc(0x1a8)](0x0);this['_scrollDuration']>0x1&&(this[_0x4cbedc(0x23a)]=0x1,this['updateSmoothScroll']());const _0x75299b=_0x58297a[_0x4cbedc(0x20e)](this['findExt'](_0x231dca),0x0);this[_0x4cbedc(0x2b7)](_0x75299b),this[_0x4cbedc(0x27a)]();}}},Game_System[_0x364f2c(0x18e)]['forceShowMainMenuCommand']=function(_0xec14f8){const _0x26b8f0=_0x364f2c,_0x374763=this[_0x26b8f0(0x1fd)]();if(!_0x374763[_0x26b8f0(0x175)][_0x26b8f0(0x202)](_0xec14f8)){if(_0x26b8f0(0x222)!==_0x26b8f0(0x222)){this[_0x26b8f0(0x22c)](),this['changeTextColor'](_0x2b1f09[_0x26b8f0(0x1d0)]());const _0x1ce22b=_0x15f171[_0x26b8f0(0x2a1)][_0x26b8f0(0x18c)]['Playtime']['Time'];this[_0x26b8f0(0x223)](_0x1ce22b,_0x5a926e['x'],_0x59f8b8['y'],_0x284cfe[_0x26b8f0(0x12f)],'left'),this[_0x26b8f0(0x1cd)]();}else _0x374763[_0x26b8f0(0x175)][_0x26b8f0(0x181)](_0xec14f8);}_0x374763[_0x26b8f0(0x2d9)]['remove'](_0xec14f8);},Game_System[_0x364f2c(0x18e)][_0x364f2c(0x2b0)]=function(_0x485679){const _0x39b56d=_0x364f2c,_0x18df78=this['mainMenuCoreSettings']();!_0x18df78[_0x39b56d(0x2d9)][_0x39b56d(0x202)](_0x485679)&&_0x18df78[_0x39b56d(0x2d9)][_0x39b56d(0x181)](_0x485679),_0x18df78['forceShow'][_0x39b56d(0x1fb)](_0x485679);},Game_System[_0x364f2c(0x18e)][_0x364f2c(0x157)]=function(_0x20fa3d){const _0x236565=_0x364f2c,_0x33aec0=this[_0x236565(0x1fd)]();!_0x33aec0[_0x236565(0x220)][_0x236565(0x202)](_0x20fa3d)&&('cBOXe'===_0x236565(0x1b0)?_0x33aec0[_0x236565(0x220)][_0x236565(0x181)](_0x20fa3d):_0xabf0ac[_0x236565(0x15c)](_0xcdd8d3['characterName']())),_0x33aec0['forceDisable']['remove'](_0x20fa3d);},Game_System[_0x364f2c(0x18e)][_0x364f2c(0x1a0)]=function(_0x19fb3e){const _0x1b1cb4=_0x364f2c,_0x5324bb=this[_0x1b1cb4(0x1fd)]();!_0x5324bb[_0x1b1cb4(0x1c9)]['includes'](_0x19fb3e)&&_0x5324bb[_0x1b1cb4(0x1c9)][_0x1b1cb4(0x181)](_0x19fb3e),_0x5324bb[_0x1b1cb4(0x220)][_0x1b1cb4(0x1fb)](_0x19fb3e);},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x1c7)]=Game_Actor['prototype'][_0x364f2c(0x14f)],Game_Actor[_0x364f2c(0x18e)]['setup']=function(_0x4d49bd){const _0xdfadc0=_0x364f2c;VisuMZ[_0xdfadc0(0x2a1)][_0xdfadc0(0x1c7)][_0xdfadc0(0x11b)](this,_0x4d49bd),this['initMenuImage']();},Game_Actor['prototype'][_0x364f2c(0x150)]=function(){const _0x39c2d4=_0x364f2c;this[_0x39c2d4(0x2e6)]='';if(this[_0x39c2d4(0x225)]()&&this[_0x39c2d4(0x225)]()[_0x39c2d4(0x2d2)]['match'](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x39c2d4(0x160)===_0x39c2d4(0x160))this[_0x39c2d4(0x2e6)]=String(RegExp['$1']);else{_0x1d6eb8=_0x55aa8e||_0x50ffe4[_0x39c2d4(0x23d)],_0x3c3559=_0xb5df0a||_0x39176b['faceHeight'];const _0x58759a=_0x10a26a['characterName'](),_0x124422=_0x5acfda[_0x39c2d4(0x184)](),_0x4f0aaa=_0x355d8f[_0x39c2d4(0x15c)](_0x58759a),_0x3dccb9=_0x9965c8[_0x39c2d4(0x2c0)](_0x58759a),_0x1eb847=_0x4f0aaa['width']/(_0x3dccb9?0x3:0xc),_0x6a47dd=_0x4f0aaa[_0x39c2d4(0x1d9)]/(_0x3dccb9?0x4:0x8),_0x5f38bd=_0x4b8974,_0x1901be=_0x4dc391-0x2,_0x2c5dd1=_0x52cecc+_0x19b71e[_0x39c2d4(0x214)](_0x5f38bd/0x2),_0x24e482=_0x5d5171+_0x56ea6e['ceil']((_0x1c684f+_0x6a47dd)/0x2);this[_0x39c2d4(0x2e9)]===_0x420109&&this[_0x39c2d4(0x28e)](_0x5d105a[_0x39c2d4(0x228)]());const _0x5c447a=_0x4563e0[_0x39c2d4(0x2c2)](_0x2f644e,_0x1eb847),_0x144748=_0x16d5a1[_0x39c2d4(0x2c2)](_0x3f7728,_0x6a47dd),_0xe5e7c4=_0x423529['floor'](_0x289f2e+_0x465d9b[_0x39c2d4(0x20e)](_0x289c9c-_0x1eb847,0x0)/0x2),_0x45aabf=_0x5b307d[_0x39c2d4(0x214)](_0x14d5b2+_0x19b60b[_0x39c2d4(0x20e)](_0x2bdc65-_0x6a47dd,0x0)/0x2),_0x1a734c=_0x3dccb9?0x0:_0x124422,_0x12aae9=(_0x1a734c%0x4*0x3+0x1)*_0x1eb847,_0xa00664=_0x219de0[_0x39c2d4(0x214)](_0x1a734c/0x4)*0x4*_0x6a47dd;this['contents'][_0x39c2d4(0x1ce)](_0x4f0aaa,_0x12aae9,_0xa00664,_0x5c447a,_0x144748,_0xe5e7c4,_0x45aabf),this['changePaintOpacity'](!![]);}}},Game_Actor[_0x364f2c(0x18e)][_0x364f2c(0x203)]=function(){const _0x2eca97=_0x364f2c;if(this[_0x2eca97(0x2e6)]===undefined)this[_0x2eca97(0x150)]();return this[_0x2eca97(0x2e6)];},Game_Actor['prototype'][_0x364f2c(0x15d)]=function(_0x47b0cb){const _0x3096a0=_0x364f2c;if(this[_0x3096a0(0x2e6)]===undefined)this['initMenuImage']();this[_0x3096a0(0x2e6)]=_0x47b0cb;},Game_Actor[_0x364f2c(0x18e)][_0x364f2c(0x22f)]=function(){const _0x193005=_0x364f2c;if(this['actor']()[_0x193005(0x2d2)][_0x193005(0x1a2)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x193005(0x225)]()[_0x193005(0x2d2)][_0x193005(0x1a2)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x193005(0x186)!==_0x193005(0x16a))return Number(RegExp['$1']);else this['drawItemStyleIcon'](_0x140ed6);}}return 0x0;},Game_Actor[_0x364f2c(0x18e)][_0x364f2c(0x1ad)]=function(){const _0x37dea2=_0x364f2c;if(this[_0x37dea2(0x225)]()[_0x37dea2(0x2d2)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x37dea2(0x225)]()[_0x37dea2(0x2d2)][_0x37dea2(0x1a2)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return _0x37dea2(0x289)!==_0x37dea2(0x1bf)?Number(RegExp['$2']):this[_0x37dea2(0x20d)]();}return 0x0;},Scene_MenuBase[_0x364f2c(0x18e)][_0x364f2c(0x14e)]=function(){const _0x118b75=_0x364f2c;return VisuMZ[_0x118b75(0x2a1)][_0x118b75(0x18c)][_0x118b75(0x297)]['ActorBgMenus'][_0x118b75(0x202)](this[_0x118b75(0x2e9)][_0x118b75(0x243)]);},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x217)]=Scene_MenuBase[_0x364f2c(0x18e)]['createBackground'],Scene_MenuBase[_0x364f2c(0x18e)]['createBackground']=function(){const _0x49e5b1=_0x364f2c;VisuMZ[_0x49e5b1(0x2a1)]['Scene_MenuBase_createBackground'][_0x49e5b1(0x11b)](this),this[_0x49e5b1(0x261)]();},Scene_MenuBase[_0x364f2c(0x18e)][_0x364f2c(0x261)]=function(){const _0x563888=_0x364f2c;this[_0x563888(0x15a)]=new Sprite_MenuBackgroundActor(),this['addChild'](this['_actorMenuBgSprite']);},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2da)]=Scene_MenuBase[_0x364f2c(0x18e)][_0x364f2c(0x2b2)],Scene_MenuBase['prototype'][_0x364f2c(0x2b2)]=function(){const _0x9965e2=_0x364f2c;VisuMZ[_0x9965e2(0x2a1)][_0x9965e2(0x2da)][_0x9965e2(0x11b)](this),this[_0x9965e2(0x14e)]()&&this[_0x9965e2(0x15a)]&&('gCzHx'===_0x9965e2(0x1f6)?_0x6e5fe2[_0x9965e2(0x2a1)][_0x9965e2(0x18c)]['ListStyles'][_0x9965e2(0x134)][_0x9965e2(0x11b)](this,_0xf1f86a,_0x51cb83):this[_0x9965e2(0x15a)][_0x9965e2(0x19a)](this[_0x9965e2(0x201)]));},VisuMZ['MainMenuCore'][_0x364f2c(0x167)]=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x13d)],Scene_Menu['prototype'][_0x364f2c(0x13d)]=function(){const _0x346733=_0x364f2c;VisuMZ[_0x346733(0x2a1)]['Scene_Menu_create'][_0x346733(0x11b)](this),this[_0x346733(0x275)](),this[_0x346733(0x12e)](),this['createDummyWindow']();},Scene_Menu[_0x364f2c(0x18e)]['createCommandWindow']=function(){const _0x43cd0a=_0x364f2c,_0x488032=this[_0x43cd0a(0x2c4)](),_0x36cae9=new Window_MenuCommand(_0x488032);_0x36cae9[_0x43cd0a(0x1df)](_0x43cd0a(0x264),this[_0x43cd0a(0x144)][_0x43cd0a(0x206)](this)),this[_0x43cd0a(0x283)](_0x36cae9),this['_commandWindow']=_0x36cae9;},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x191)]=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2c4)],Scene_Menu[_0x364f2c(0x18e)]['commandWindowRect']=function(){const _0x15bef4=_0x364f2c,_0x54c5a2=this[_0x15bef4(0x123)]();if(_0x54c5a2==='top')return this[_0x15bef4(0x2b8)]();else{if(_0x54c5a2===_0x15bef4(0x25d)){if(_0x15bef4(0x278)!==_0x15bef4(0x149))return this[_0x15bef4(0x15b)]();else this[_0x15bef4(0x20c)]=new _0x6b67f1(0x1,0x1);}else{if(_0x54c5a2==='bottom'){if(_0x15bef4(0x266)===_0x15bef4(0x266))return this[_0x15bef4(0x254)]();else _0x2e7720[_0x15bef4(0x18e)]['drawItem'][_0x15bef4(0x11b)](this,_0x593b30);}else{if(_0x54c5a2===_0x15bef4(0x189))return this[_0x15bef4(0x20d)]();else{if(_0x54c5a2===_0x15bef4(0x1b5))return this[_0x15bef4(0x2be)]();else{const _0x21c113=VisuMZ[_0x15bef4(0x2a1)][_0x15bef4(0x191)]['call'](this);return this['adjustDefaultCommandWindowRect'](_0x21c113),_0x21c113;}}}}}},Scene_Menu['prototype'][_0x364f2c(0x1ee)]=function(_0x27149e){const _0x46b2bc=_0x364f2c;this[_0x46b2bc(0x288)]()&&(_0x27149e[_0x46b2bc(0x1d9)]-=this[_0x46b2bc(0x121)]()[_0x46b2bc(0x1d9)]),this[_0x46b2bc(0x279)]()&&(_0x27149e['height']-=this['variableWindowRect']()[_0x46b2bc(0x1d9)]);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2b8)]=function(){const _0x360577=_0x364f2c,_0x409a91=VisuMZ[_0x360577(0x2a1)][_0x360577(0x18c)][_0x360577(0x132)]['Rows'],_0x1ae37e=Graphics[_0x360577(0x146)],_0x433053=this[_0x360577(0x20b)](_0x409a91,!![]),_0xf8e671=0x0,_0x5e0801=this[_0x360577(0x129)]();return new Rectangle(_0xf8e671,_0x5e0801,_0x1ae37e,_0x433053);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x15b)]=function(){const _0x32778f=_0x364f2c,_0x15412e=VisuMZ[_0x32778f(0x2a1)][_0x32778f(0x18c)][_0x32778f(0x132)][_0x32778f(0x229)],_0x17428e=Graphics[_0x32778f(0x146)],_0x4e7acb=this[_0x32778f(0x20b)](0x1,!![]),_0x5aae20=0x0,_0x565f83=this[_0x32778f(0x129)]();return new Rectangle(_0x5aae20,_0x565f83,_0x17428e,_0x4e7acb);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x254)]=function(){const _0x4a0287=_0x364f2c,_0x132505=VisuMZ[_0x4a0287(0x2a1)][_0x4a0287(0x18c)][_0x4a0287(0x132)]['Rows'],_0x1954a0=Graphics['boxWidth'],_0x355778=this['calcWindowHeight'](_0x132505,!![]),_0x57a5e5=0x0,_0x3b437f=this['mainAreaBottom']()-_0x355778;return new Rectangle(_0x57a5e5,_0x3b437f,_0x1954a0,_0x355778);},Scene_Menu[_0x364f2c(0x18e)]['commandWindowRectThinBottomStyle']=function(){const _0x2292aa=_0x364f2c,_0x164a8d=VisuMZ[_0x2292aa(0x2a1)]['Settings'][_0x2292aa(0x132)]['Rows'],_0x23d50e=Graphics[_0x2292aa(0x146)],_0x2c4193=this[_0x2292aa(0x20b)](0x1,!![]),_0x46600=0x0,_0x20588b=this[_0x2292aa(0x28a)]()-_0x2c4193;return new Rectangle(_0x46600,_0x20588b,_0x23d50e,_0x2c4193);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2be)]=function(){const _0x513c50=_0x364f2c,_0x448585=VisuMZ[_0x513c50(0x2a1)][_0x513c50(0x18c)][_0x513c50(0x132)][_0x513c50(0x229)],_0x4fe8e2=Graphics[_0x513c50(0x146)],_0x40cd39=Window_MenuCommand['prototype'][_0x513c50(0x1b8)](_0x448585),_0x307810=0x0,_0x577567=Math['round']((Graphics['boxHeight']-_0x40cd39)/0x2);return new Rectangle(_0x307810,_0x577567,_0x4fe8e2,_0x40cd39);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x123)]=function(){const _0x2b7e91=_0x364f2c;return VisuMZ[_0x2b7e91(0x2a1)]['Settings'][_0x2b7e91(0x148)];},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x213)]=function(){const _0x5f4932=_0x364f2c;if(this[_0x5f4932(0x123)]()!==_0x5f4932(0x24a))return!![];return VisuMZ['MainMenuCore'][_0x5f4932(0x18c)]['General'][_0x5f4932(0x2de)];},Scene_Menu['prototype']['createGoldWindow']=function(){const _0x1a3839=_0x364f2c,_0x11b54f=this[_0x1a3839(0x18d)]();this[_0x1a3839(0x2a0)]=this[_0x1a3839(0x213)]()?new Window_ThinGold(_0x11b54f):new Window_Gold(_0x11b54f),this['addWindow'](this['_goldWindow']);},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2d8)]=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x18d)],Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x18d)]=function(){const _0x4121dd=_0x364f2c,_0x42e340=this[_0x4121dd(0x123)]();if(['top',_0x4121dd(0x25d),_0x4121dd(0x1b5)][_0x4121dd(0x202)](_0x42e340))return this[_0x4121dd(0x209)]();else{if([_0x4121dd(0x251),_0x4121dd(0x189)][_0x4121dd(0x202)](_0x42e340))return this[_0x4121dd(0x19f)]();else{if(_0x4121dd(0x1cf)==='TpPhf')_0x590359[_0x4121dd(0x2a1)][_0x4121dd(0x18c)][_0x4121dd(0x297)][_0x4121dd(0x2a9)]?_0x1eb8b5['MainMenuCore'][_0x4121dd(0x216)]['call'](this):this[_0x4121dd(0x2b7)](0x0);else{const _0x315ae0=VisuMZ[_0x4121dd(0x2a1)][_0x4121dd(0x2d8)][_0x4121dd(0x11b)](this);return this[_0x4121dd(0x2ce)](_0x315ae0),_0x315ae0;}}}},Scene_Menu['prototype'][_0x364f2c(0x2ce)]=function(_0x9a88a5){const _0x172b5a=_0x364f2c;if(this['thinGoldWindow']()){if(VisuMZ[_0x172b5a(0x2a1)][_0x172b5a(0x18c)][_0x172b5a(0x297)][_0x172b5a(0x2c7)]){const _0x2b60f4=_0x9a88a5[_0x172b5a(0x1d9)]-this['calcWindowHeight'](0x1,![]);_0x9a88a5['y']+=_0x2b60f4;}if(VisuMZ['MainMenuCore'][_0x172b5a(0x18c)][_0x172b5a(0x297)][_0x172b5a(0x16d)]){if(_0x172b5a(0x1ab)===_0x172b5a(0x2e4)){const _0x5e2c64=this[_0x172b5a(0x1fd)]();!_0x5e2c64['forceHide']['includes'](_0x2911f8)&&_0x5e2c64[_0x172b5a(0x2d9)][_0x172b5a(0x181)](_0x41c5b5),_0x5e2c64[_0x172b5a(0x175)][_0x172b5a(0x1fb)](_0x30da00);}else _0x9a88a5[_0x172b5a(0x1d9)]=this[_0x172b5a(0x20b)](0x1,![]);}}},Scene_Menu[_0x364f2c(0x18e)]['goldWindowRectTopStyle']=function(){const _0x455e7e=_0x364f2c,_0x2cd820=this[_0x455e7e(0x14d)](),_0x3e1ac1=this['calcWindowHeight'](0x1,![]),_0x38eb38=Graphics[_0x455e7e(0x146)]-_0x2cd820,_0x2b0718=this['mainAreaBottom']()-_0x3e1ac1;return new Rectangle(_0x38eb38,_0x2b0718,_0x2cd820,_0x3e1ac1);},Scene_Menu['prototype'][_0x364f2c(0x19f)]=function(){const _0x550f44=_0x364f2c,_0x318131=this[_0x550f44(0x14d)](),_0x15b2f8=this[_0x550f44(0x20b)](0x1,![]),_0x4a184d=Graphics[_0x550f44(0x146)]-_0x318131,_0x50eaed=this['mainAreaTop']();return new Rectangle(_0x4a184d,_0x50eaed,_0x318131,_0x15b2f8);},VisuMZ['MainMenuCore'][_0x364f2c(0x1ac)]=Scene_Menu['prototype'][_0x364f2c(0x127)],Scene_Menu[_0x364f2c(0x18e)]['createStatusWindow']=function(){const _0x35d12b=_0x364f2c;VisuMZ[_0x35d12b(0x2a1)][_0x35d12b(0x1ac)][_0x35d12b(0x11b)](this),this[_0x35d12b(0x25e)]();},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x25e)]=function(){const _0x1576cf=_0x364f2c;this['commandWindowStyle']()===_0x1576cf(0x1b5)&&(this[_0x1576cf(0x211)][_0x1576cf(0x298)]=0x0);},VisuMZ['MainMenuCore']['Scene_Menu_statusWindowRect']=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x248)],Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x248)]=function(){const _0x45bb1e=_0x364f2c,_0x4df499=this[_0x45bb1e(0x123)]();if([_0x45bb1e(0x1ed),'thinTop'][_0x45bb1e(0x202)](_0x4df499)){if(_0x45bb1e(0x1f4)==='ZxCgd')this[_0x45bb1e(0x201)]=_0x4dc607,this[_0x45bb1e(0x286)]();else return this[_0x45bb1e(0x2c8)]();}else{if([_0x45bb1e(0x251),_0x45bb1e(0x189)][_0x45bb1e(0x202)](_0x4df499)){if(_0x45bb1e(0x13f)!==_0x45bb1e(0x29d))return this[_0x45bb1e(0x19b)]();else{const _0x538c30=this[_0x45bb1e(0x2ea)];_0x538c30[_0x45bb1e(0x223)](_0x2e1e3f,0x0,_0x55dc1e['y'],_0x538c30[_0x45bb1e(0x1ae)],_0x45bb1e(0x27d));}}else return _0x4df499===_0x45bb1e(0x1b5)?this[_0x45bb1e(0x2a3)]():VisuMZ[_0x45bb1e(0x2a1)][_0x45bb1e(0x1f2)][_0x45bb1e(0x11b)](this);}},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2c8)]=function(){const _0x4eb9b7=_0x364f2c,_0x55d4b0=Graphics[_0x4eb9b7(0x146)],_0xbb4cc6=this[_0x4eb9b7(0x205)]()-this[_0x4eb9b7(0x2d5)]['height']-this[_0x4eb9b7(0x2a0)][_0x4eb9b7(0x1d9)],_0xb4a32b=0x0,_0x289630=this[_0x4eb9b7(0x2d5)]['y']+this[_0x4eb9b7(0x2d5)][_0x4eb9b7(0x1d9)];return new Rectangle(_0xb4a32b,_0x289630,_0x55d4b0,_0xbb4cc6);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x19b)]=function(){const _0x20f99f=_0x364f2c,_0x539dbe=Graphics[_0x20f99f(0x146)],_0x3b8f6b=this['mainAreaHeight']()-this['_commandWindow'][_0x20f99f(0x1d9)]-this[_0x20f99f(0x2a0)][_0x20f99f(0x1d9)],_0x427b12=0x0,_0x31b3d8=this[_0x20f99f(0x2a0)]['y']+this[_0x20f99f(0x2a0)][_0x20f99f(0x1d9)];return new Rectangle(_0x427b12,_0x31b3d8,_0x539dbe,_0x3b8f6b);},Scene_Menu['prototype'][_0x364f2c(0x2a3)]=function(){const _0xd87ac9=_0x364f2c,_0x17ee04=Graphics['boxWidth'],_0x24fee8=this['mainAreaHeight']()-this[_0xd87ac9(0x2a0)][_0xd87ac9(0x1d9)],_0x4cb90c=0x0,_0x41a332=this[_0xd87ac9(0x28a)]()-this[_0xd87ac9(0x2a0)][_0xd87ac9(0x1d9)]-_0x24fee8;return new Rectangle(_0x4cb90c,_0x41a332,_0x17ee04,_0x24fee8);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x275)]=function(){const _0x1e7588=_0x364f2c;if(!this[_0x1e7588(0x2b3)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x561720=this['playtimeWindowRect']();this[_0x1e7588(0x2bf)]=new Window_Playtime(_0x561720),this[_0x1e7588(0x2bf)]['setBackgroundType'](VisuMZ[_0x1e7588(0x2a1)][_0x1e7588(0x18c)]['Playtime'][_0x1e7588(0x26e)]),this[_0x1e7588(0x283)](this[_0x1e7588(0x2bf)]);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2b3)]=function(){const _0x385653=_0x364f2c;return VisuMZ[_0x385653(0x2a1)][_0x385653(0x18c)][_0x385653(0x287)][_0x385653(0x267)];},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x288)]=function(){const _0x6a69d1=_0x364f2c;return this[_0x6a69d1(0x2b3)]()&&(VisuMZ[_0x6a69d1(0x2a1)]['Settings'][_0x6a69d1(0x287)][_0x6a69d1(0x26d)]??!![]);},Scene_Menu['prototype']['playtimeWindowRect']=function(){const _0x382056=_0x364f2c,_0x47f6d4=this[_0x382056(0x123)]();if([_0x382056(0x1ed),_0x382056(0x25d),_0x382056(0x1b5)]['includes'](_0x47f6d4)){if(_0x382056(0x183)!==_0x382056(0x183)){if(this['_mainMenuCore']===_0x1f82ce)this[_0x382056(0x236)]();const _0x43a335=[_0x382056(0x175),'forceHide',_0x382056(0x220),_0x382056(0x1c9)];for(const _0x292577 of _0x43a335){this[_0x382056(0x1ec)][_0x292577]=this[_0x382056(0x1ec)][_0x292577]||[];}return this[_0x382056(0x1ec)];}else return this[_0x382056(0x22d)]();}else{if(['bottom',_0x382056(0x189)]['includes'](_0x47f6d4)){if(_0x382056(0x1a3)!==_0x382056(0x224))return this[_0x382056(0x18b)]();else{const _0xadf149=new _0x2c571b(0x0,0x0,_0x53e258[_0x382056(0x12f)],_0x4868d5[_0x382056(0x1d9)]);this['_commandNameWindow']=new _0x2439c2(_0xadf149),this[_0x382056(0x2ea)]['opacity']=0x0,this[_0x382056(0x2d4)](this[_0x382056(0x2ea)]),this[_0x382056(0x130)]();}}else return VisuMZ['MainMenuCore']['Settings'][_0x382056(0x287)][_0x382056(0x17e)][_0x382056(0x11b)](this);}},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x22d)]=function(){const _0x5bd203=_0x364f2c,_0x3e15bf=this[_0x5bd203(0x14d)](),_0xefa1e=this['calcWindowHeight'](0x1,![]),_0x8db55d=0x0,_0x57d0e9=this[_0x5bd203(0x28a)]()-_0xefa1e;return new Rectangle(_0x8db55d,_0x57d0e9,_0x3e15bf,_0xefa1e);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x18b)]=function(){const _0x5e5b6c=_0x364f2c,_0x24f00f=this[_0x5e5b6c(0x14d)](),_0x261963=this['calcWindowHeight'](0x1,![]),_0x4a56d5=0x0,_0x509a8c=this[_0x5e5b6c(0x129)]();return new Rectangle(_0x4a56d5,_0x509a8c,_0x24f00f,_0x261963);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x12e)]=function(){const _0x3b2a6a=_0x364f2c;if(!this[_0x3b2a6a(0x1b6)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x7424d1=this['variableWindowRect']();this[_0x3b2a6a(0x1cc)]=new Window_MenuVariables(_0x7424d1),this[_0x3b2a6a(0x1cc)]['setBackgroundType'](VisuMZ[_0x3b2a6a(0x2a1)][_0x3b2a6a(0x18c)][_0x3b2a6a(0x2db)]['BgType']),this[_0x3b2a6a(0x283)](this[_0x3b2a6a(0x1cc)]);},Scene_Menu['prototype']['canCreateVariableWindow']=function(){const _0x4fc14f=_0x364f2c;return VisuMZ[_0x4fc14f(0x2a1)][_0x4fc14f(0x18c)][_0x4fc14f(0x2db)][_0x4fc14f(0x267)];},Scene_Menu['prototype']['adjustCommandHeightByVariable']=function(){const _0x47c38d=_0x364f2c;return this[_0x47c38d(0x1b6)]()&&(VisuMZ[_0x47c38d(0x2a1)]['Settings'][_0x47c38d(0x2db)][_0x47c38d(0x26d)]??!![]);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x218)]=function(){const _0x33fbaa=_0x364f2c,_0x28c7f2=this[_0x33fbaa(0x123)]();if([_0x33fbaa(0x1ed),_0x33fbaa(0x25d),_0x33fbaa(0x1b5)][_0x33fbaa(0x202)](_0x28c7f2))return this[_0x33fbaa(0x1a1)]();else return[_0x33fbaa(0x251),_0x33fbaa(0x189)][_0x33fbaa(0x202)](_0x28c7f2)?this[_0x33fbaa(0x136)]():VisuMZ['MainMenuCore'][_0x33fbaa(0x18c)]['Variable']['WindowRect'][_0x33fbaa(0x11b)](this);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x1a1)]=function(){const _0xed419f=_0x364f2c,_0x13685d=Graphics['boxWidth']-this[_0xed419f(0x2a0)][_0xed419f(0x12f)]-(this['_playtimeWindow']?this[_0xed419f(0x2bf)][_0xed419f(0x12f)]:0x0),_0x2340af=this[_0xed419f(0x20b)](0x1,![]),_0x43550a=this[_0xed419f(0x2a0)]['x']-_0x13685d,_0x1386b7=this[_0xed419f(0x28a)]()-_0x2340af;return new Rectangle(_0x43550a,_0x1386b7,_0x13685d,_0x2340af);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x136)]=function(){const _0x33497b=_0x364f2c,_0x5b9930=Graphics[_0x33497b(0x146)]-this[_0x33497b(0x2a0)][_0x33497b(0x12f)]-(this['_playtimeWindow']?this[_0x33497b(0x2bf)][_0x33497b(0x12f)]:0x0),_0x17a90c=this[_0x33497b(0x20b)](0x1,![]),_0x5e60df=this[_0x33497b(0x2a0)]['x']-_0x5b9930,_0x2f9e57=this[_0x33497b(0x129)]();return new Rectangle(_0x5e60df,_0x2f9e57,_0x5b9930,_0x17a90c);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x138)]=function(){const _0x5d1394=_0x364f2c;if(!this[_0x5d1394(0x1aa)]())return;const _0x435dd7=this[_0x5d1394(0x218)]();this[_0x5d1394(0x1b3)]=new Window_Base(_0x435dd7),this[_0x5d1394(0x1b3)][_0x5d1394(0x277)](VisuMZ[_0x5d1394(0x2a1)]['Settings'][_0x5d1394(0x2db)][_0x5d1394(0x26e)]),this['addWindow'](this[_0x5d1394(0x1b3)]);},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x1aa)]=function(){const _0x1d9a86=_0x364f2c;if([_0x1d9a86(0x24a),_0x1d9a86(0x1b5)][_0x1d9a86(0x202)](this[_0x1d9a86(0x123)]()))return![];if(this[_0x1d9a86(0x1cc)])return![];return!![];},VisuMZ['MainMenuCore'][_0x364f2c(0x25a)]=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x21a)],Scene_Menu[_0x364f2c(0x18e)]['commandPersonal']=function(){const _0x4f5478=_0x364f2c;if(this[_0x4f5478(0x166)]()&&this[_0x4f5478(0x211)])$gameParty['setTargetActor']($gameParty['members']()[0x0]),this[_0x4f5478(0x179)]();else{if(this['commandWindowStyle']()===_0x4f5478(0x1b5))this[_0x4f5478(0x211)]['open']();VisuMZ[_0x4f5478(0x2a1)][_0x4f5478(0x25a)]['call'](this);}},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x166)]=function(){const _0x2155b7=_0x364f2c;return VisuMZ[_0x2155b7(0x2a1)][_0x2155b7(0x18c)]['General'][_0x2155b7(0x27c)]&&$gameParty['members']()[_0x2155b7(0x176)]<=0x1;},Scene_Menu['prototype'][_0x364f2c(0x179)]=function(){const _0x2852a9=_0x364f2c,_0x312cfb=this[_0x2852a9(0x2d5)][_0x2852a9(0x237)](),_0x1dce71=this[_0x2852a9(0x2d5)]['currentExt']();for(const _0x55e6db of Window_MenuCommand[_0x2852a9(0x235)]){if(_0x2852a9(0x2c1)===_0x2852a9(0x2c1)){if(_0x55e6db[_0x2852a9(0x2c6)]===_0x312cfb){if(_0x2852a9(0x25f)!==_0x2852a9(0x25f))_0x5914cd[_0x2852a9(0x1d3)]=_0x152596;else{_0x55e6db[_0x2852a9(0x29a)][_0x2852a9(0x11b)](this,_0x1dce71);return;}}}else return _0x2852a9(0x274);}},VisuMZ['MainMenuCore'][_0x364f2c(0x29b)]=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x232)],Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x232)]=function(){const _0x532e52=_0x364f2c;VisuMZ[_0x532e52(0x2a1)][_0x532e52(0x29b)][_0x532e52(0x11b)](this);if(this[_0x532e52(0x123)]()===_0x532e52(0x1b5))this[_0x532e52(0x211)][_0x532e52(0x1c0)]();},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x24b)]=function(){const _0x512963=_0x364f2c,_0x3a23b8=parseInt(this[_0x512963(0x2d5)][_0x512963(0x276)]());_0x3a23b8?($gameTemp['reserveCommonEvent'](_0x3a23b8),this[_0x512963(0x226)]()):_0x512963(0x1de)===_0x512963(0x1de)?this[_0x512963(0x2d5)][_0x512963(0x27a)]():_0x5de8dc[_0x512963(0x1d9)]-=this[_0x512963(0x218)]()[_0x512963(0x1d9)];},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x29e)]=Scene_Menu['prototype']['commandFormation'],Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x28d)]=function(){const _0x365dc8=_0x364f2c;VisuMZ['MainMenuCore'][_0x365dc8(0x29e)][_0x365dc8(0x11b)](this);if(this['commandWindowStyle']()==='mobile')this[_0x365dc8(0x211)][_0x365dc8(0x2bb)]();},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2ae)]=Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x299)],Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x299)]=function(){const _0x586089=_0x364f2c;VisuMZ[_0x586089(0x2a1)][_0x586089(0x2ae)][_0x586089(0x11b)](this);if(this[_0x586089(0x123)]()===_0x586089(0x1b5))this[_0x586089(0x211)][_0x586089(0x1c0)]();},Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x292)]=function(){const _0x5cf68e=_0x364f2c;SceneManager[_0x5cf68e(0x181)](Scene_Load);},Scene_Menu[_0x364f2c(0x18e)]['commandCancel']=function(){const _0x2c3432=_0x364f2c;if(this[_0x2c3432(0x2d5)][_0x2c3432(0x171)]()!==''){if(_0x2c3432(0x152)!==_0x2c3432(0x271))this['_commandWindow'][_0x2c3432(0x208)]();else return this['goldWindowRectTopStyle']();}else this['popScene']();};function Sprite_MenuBackgroundActor(){const _0x36834e=_0x364f2c;this[_0x36834e(0x20a)](...arguments);}function _0x3219(_0x1334e9,_0x19b6c0){const _0x25ede5=_0x25ed();return _0x3219=function(_0x3219a1,_0x3bbaa3){_0x3219a1=_0x3219a1-0x115;let _0x370ef6=_0x25ede5[_0x3219a1];return _0x370ef6;},_0x3219(_0x1334e9,_0x19b6c0);}Sprite_MenuBackgroundActor[_0x364f2c(0x18e)]=Object['create'](Sprite['prototype']),Sprite_MenuBackgroundActor[_0x364f2c(0x18e)]['constructor']=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x20a)]=function(){const _0x7fc770=_0x364f2c;this[_0x7fc770(0x201)]=null,this['_bitmapReady']=![],Sprite['prototype']['initialize'][_0x7fc770(0x11b)](this),this['x']=Graphics[_0x7fc770(0x12f)];},Sprite_MenuBackgroundActor['prototype']['setActor']=function(_0x15015f){const _0x4b58a8=_0x364f2c;if(this[_0x4b58a8(0x201)]!==_0x15015f){if(_0x4b58a8(0x13b)!==_0x4b58a8(0x13b))return _0x5661c8['MainMenuCore'][_0x4b58a8(0x18c)][_0x4b58a8(0x2db)][_0x4b58a8(0x143)]['length'];else this[_0x4b58a8(0x201)]=_0x15015f,this[_0x4b58a8(0x286)]();}},Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x286)]=function(){const _0x397b39=_0x364f2c;this[_0x397b39(0x145)]=![],this[_0x397b39(0x201)]?(this[_0x397b39(0x20c)]=ImageManager[_0x397b39(0x172)](this[_0x397b39(0x201)][_0x397b39(0x203)]()),this[_0x397b39(0x20c)][_0x397b39(0x2b9)](this[_0x397b39(0x162)][_0x397b39(0x206)](this))):this[_0x397b39(0x20c)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x162)]=function(){const _0x4aec93=_0x364f2c;this[_0x4aec93(0x145)]=!![],VisuMZ[_0x4aec93(0x2a1)][_0x4aec93(0x18c)][_0x4aec93(0x297)]['ActorBgMenuJS'][_0x4aec93(0x11b)](this);},Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x1d2)]=function(){const _0x45ddaf=_0x364f2c;Sprite[_0x45ddaf(0x18e)]['update'][_0x45ddaf(0x11b)](this);if(this[_0x45ddaf(0x145)]){if(_0x45ddaf(0x2ac)!==_0x45ddaf(0x2ac)){_0x8eb7fc=_0x108ff6||_0x5df1f9[_0x45ddaf(0x23d)],_0x3f1893=_0x26bf45||_0x14594a[_0x45ddaf(0x204)];const _0xd29350=_0x4a443e['faceWidth'],_0x3f51c4=_0x27c7c6-0x2,_0x4e4118=_0x574804+_0x20fbad[_0x45ddaf(0x214)]((_0x1ef0ad-_0xd29350)/0x2);this[_0x45ddaf(0x2e9)]===_0x43096f&&this['changePaintOpacity'](_0x331492['isBattleMember']()),this[_0x45ddaf(0x173)](_0x56b781,_0x4e4118,_0x30b8f7,_0xd29350,_0x3f51c4),this[_0x45ddaf(0x28e)](!![]);}else this[_0x45ddaf(0x24c)](),this[_0x45ddaf(0x2e7)](),this[_0x45ddaf(0x2a7)]();}},Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x24c)]=function(){const _0x4a7094=_0x364f2c;if(this[_0x4a7094(0x1ba)]>0x0){if(_0x4a7094(0x24d)!==_0x4a7094(0x24d))_0x4bd3ba++,_0x17f03f+=_0x4879ab;else{const _0x751b82=this['_duration'];this[_0x4a7094(0x23b)]=(this[_0x4a7094(0x23b)]*(_0x751b82-0x1)+0xff)/_0x751b82;}}},Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x2e7)]=function(){const _0x4ad995=_0x364f2c;if(this['_duration']>0x0){const _0x4c298e=this[_0x4ad995(0x1ba)];this['x']=(this['x']*(_0x4c298e-0x1)+this[_0x4ad995(0x259)])/_0x4c298e,this['y']=(this['y']*(_0x4c298e-0x1)+this['_targetY'])/_0x4c298e;}},Sprite_MenuBackgroundActor[_0x364f2c(0x18e)]['updateDuration']=function(){if(this['_duration']>0x0)this['_duration']--;},ImageManager[_0x364f2c(0x1dc)]=ImageManager['svActorHorzCells']||0x9,ImageManager['svActorVertCells']=ImageManager[_0x364f2c(0x1d7)]||0x6,Window_Base[_0x364f2c(0x18e)]['drawSvActor']=function(_0x6f030a,_0x232bb5,_0x1dcc03){const _0x5bafbf=_0x364f2c,_0x35c8f1=_0x6f030a['match'](/\$/i),_0x378b26=ImageManager['loadSvActor'](_0x6f030a),_0x467227=_0x378b26[_0x5bafbf(0x12f)]/(_0x35c8f1?0x1:ImageManager[_0x5bafbf(0x1dc)]),_0x5bc74c=_0x378b26[_0x5bafbf(0x1d9)]/(_0x35c8f1?0x1:ImageManager[_0x5bafbf(0x1d7)]),_0x20482f=0x0,_0x24a16a=0x0;this[_0x5bafbf(0x2b6)][_0x5bafbf(0x1ce)](_0x378b26,_0x20482f,_0x24a16a,_0x467227,_0x5bc74c,_0x232bb5-_0x467227/0x2,_0x1dcc03-_0x5bc74c);},Window_MenuCommand['_commandList']=VisuMZ[_0x364f2c(0x2a1)]['Settings'][_0x364f2c(0x2d6)],Window_MenuCommand[_0x364f2c(0x2a6)]=undefined,VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x1fc)]=Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x20a)],Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x20a)]=function(_0x2adacc){const _0x280432=_0x364f2c;this['_subcategory']=$gameTemp[_0x280432(0x1d3)]||'',VisuMZ[_0x280432(0x2a1)][_0x280432(0x1fc)][_0x280432(0x11b)](this,_0x2adacc),this[_0x280432(0x21d)](_0x2adacc);},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x21d)]=function(_0x136d39){const _0x4627d7=_0x364f2c,_0x121b46=new Rectangle(0x0,0x0,_0x136d39[_0x4627d7(0x12f)],_0x136d39[_0x4627d7(0x1d9)]);this[_0x4627d7(0x2ea)]=new Window_Base(_0x121b46),this['_commandNameWindow']['opacity']=0x0,this['addChild'](this[_0x4627d7(0x2ea)]),this[_0x4627d7(0x130)]();},Window_MenuCommand['prototype'][_0x364f2c(0x120)]=function(){const _0x2a7b91=_0x364f2c;Window_HorzCommand['prototype'][_0x2a7b91(0x120)][_0x2a7b91(0x11b)](this);if(this[_0x2a7b91(0x2ea)])this['updateCommandNameWindow']();},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x130)]=function(){const _0x2bb844=_0x364f2c,_0x1f492a=this['_commandNameWindow'];_0x1f492a[_0x2bb844(0x2b6)][_0x2bb844(0x293)]();const _0x3ff159=this[_0x2bb844(0x142)](this['index']());if(_0x3ff159===_0x2bb844(0x21b)){const _0x25b925=this[_0x2bb844(0x231)](this[_0x2bb844(0x270)]());let _0x38ac87=this[_0x2bb844(0x1e3)](this[_0x2bb844(0x270)]());_0x38ac87=_0x38ac87[_0x2bb844(0x1a5)](/\\I\[(\d+)\]/gi,''),_0x1f492a[_0x2bb844(0x22c)](),this[_0x2bb844(0x244)](_0x38ac87,_0x25b925),this[_0x2bb844(0x233)](_0x38ac87,_0x25b925),this[_0x2bb844(0x250)](_0x38ac87,_0x25b925);}},Window_MenuCommand[_0x364f2c(0x18e)]['commandNameWindowDrawBackground']=function(_0x14da51,_0x37ef40){},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x233)]=function(_0x49218b,_0x156dc0){const _0x2e4555=_0x364f2c,_0x51b9b1=this[_0x2e4555(0x2ea)];_0x51b9b1[_0x2e4555(0x223)](_0x49218b,0x0,_0x156dc0['y'],_0x51b9b1[_0x2e4555(0x1ae)],'center');},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x250)]=function(_0x6719e3,_0x58fa4c){const _0x26d48c=_0x364f2c,_0x561c6d=this[_0x26d48c(0x2ea)],_0x3c36f4=$gameSystem[_0x26d48c(0x23f)](),_0x58f8cd=_0x58fa4c['x']+Math['floor'](_0x58fa4c[_0x26d48c(0x12f)]/0x2)+_0x3c36f4;_0x561c6d['x']=_0x561c6d[_0x26d48c(0x12f)]/-0x2+_0x58f8cd,_0x561c6d['y']=Math[_0x26d48c(0x214)](_0x58fa4c['height']/0x4);},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1da)]=function(){const _0x15c8e3=_0x364f2c,_0x1a03b6=SceneManager[_0x15c8e3(0x2e0)][_0x15c8e3(0x123)]();if(_0x1a03b6===_0x15c8e3(0x1b5)){const _0x5b0fa9=VisuMZ[_0x15c8e3(0x2a1)][_0x15c8e3(0x18c)][_0x15c8e3(0x132)][_0x15c8e3(0x21c)];return this[_0x15c8e3(0x1cb)]()*_0x5b0fa9+0x8;}else return Window_Command[_0x15c8e3(0x18e)][_0x15c8e3(0x1da)]['call'](this);},Window_MenuCommand[_0x364f2c(0x18e)]['makeCommandList']=function(){const _0x505d4e=_0x364f2c;this[_0x505d4e(0x221)]();},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x221)]=function(){const _0x23fe1d=_0x364f2c;let _0xcb6c25=0x0;for(const _0x4ca09f of Window_MenuCommand['_commandList']){if('BpSRA'===_0x23fe1d(0x15e))return this['statusWindowRectBottomStyle']();else{let _0x97bc70=_0x4ca09f[_0x23fe1d(0x2c6)];if(this[_0x23fe1d(0x1e9)](_0x97bc70,_0x4ca09f)){let _0x34f0bb=_0x4ca09f[_0x23fe1d(0x1c3)];if(['',_0x23fe1d(0x260)][_0x23fe1d(0x202)](_0x34f0bb))_0x34f0bb=_0x4ca09f[_0x23fe1d(0x124)][_0x23fe1d(0x11b)](this);const _0xe7fcaf=_0x4ca09f[_0x23fe1d(0x14b)];_0xe7fcaf>0x0&&this[_0x23fe1d(0x282)]()!==_0x23fe1d(0x274)&&(_0x34f0bb=_0x23fe1d(0x17f)[_0x23fe1d(0x2ba)](_0xe7fcaf,_0x34f0bb));const _0x16a0a5=this['isMainMenuCommandEnabled'](_0x97bc70,_0x4ca09f),_0x526245=_0x4ca09f[_0x23fe1d(0x197)][_0x23fe1d(0x11b)](this);if(_0x97bc70==='subcategory'){if(_0x23fe1d(0x234)===_0x23fe1d(0x1ff)){const _0x1a9bd8=_0x3d1868[_0x23fe1d(0x2a1)][_0x23fe1d(0x18c)][_0x23fe1d(0x132)]['Rows'],_0x51ed39=_0x4abee8[_0x23fe1d(0x146)],_0x52cd0a=this[_0x23fe1d(0x20b)](0x1,!![]),_0x25a9ee=0x0,_0x61b0b1=this[_0x23fe1d(0x129)]();return new _0x5d81ee(_0x25a9ee,_0x61b0b1,_0x51ed39,_0x52cd0a);}else _0xcb6c25++,_0x97bc70+=_0xcb6c25;}this[_0x23fe1d(0x18a)](_0x34f0bb,_0x97bc70,_0x16a0a5,_0x526245),this[_0x23fe1d(0x1df)](_0x97bc70,_0x4ca09f[_0x23fe1d(0x17a)][_0x23fe1d(0x206)](this,_0x526245));}this[_0x23fe1d(0x247)](_0x97bc70);}}},Window_MenuCommand['prototype'][_0x364f2c(0x1e9)]=function(_0x2b05c4,_0x318861,_0x1bb310){const _0x42839f=_0x364f2c;if(!_0x1bb310){if(_0x42839f(0x16c)!=='ztgSW')_0x30774a[_0x42839f(0x2a1)][_0x42839f(0x167)][_0x42839f(0x11b)](this),this[_0x42839f(0x275)](),this['createVariableWindow'](),this[_0x42839f(0x138)]();else{if(!this[_0x42839f(0x2b4)](_0x2b05c4,_0x318861))return![];}}if($gameSystem[_0x42839f(0x27f)](_0x2b05c4,'forceShow'))return!![];if($gameSystem[_0x42839f(0x27f)](_0x2b05c4,_0x42839f(0x2d9)))return![];return _0x318861[_0x42839f(0x26a)]['call'](this,_0x2b05c4,_0x318861);},Window_MenuCommand['prototype']['isMainMenuCommandEnabled']=function(_0xd7115e,_0x5a4e5c){const _0x127d4f=_0x364f2c;if($gameSystem['getMainMenuSymbolState'](_0xd7115e,_0x127d4f(0x220)))return!![];if($gameSystem['getMainMenuSymbolState'](_0xd7115e,_0x127d4f(0x1c9)))return![];return _0x5a4e5c[_0x127d4f(0x1d6)]['call'](this,_0xd7115e,_0x5a4e5c);},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x247)]=function(_0x12da4c){const _0x2b5ba6=_0x364f2c;switch(_0x12da4c){case _0x2b5ba6(0x20f):this['addMainCommands']();break;case _0x2b5ba6(0x256):this[_0x2b5ba6(0x169)](),this[_0x2b5ba6(0x174)]();break;case _0x2b5ba6(0x26f):this[_0x2b5ba6(0x17b)]();break;case _0x2b5ba6(0x269):this[_0x2b5ba6(0x1f7)]();break;case _0x2b5ba6(0x19e):this['addGameEndCommand']();break;}},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1e4)]=function(){},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x169)]=function(){},Window_MenuCommand['prototype'][_0x364f2c(0x174)]=function(){},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x17b)]=function(){},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1f7)]=function(){},Window_MenuCommand['prototype'][_0x364f2c(0x116)]=function(){},Window_MenuCommand['prototype']['maxCols']=function(){const _0x1e3ba=_0x364f2c,_0x1b8510=SceneManager[_0x1e3ba(0x2e0)][_0x1e3ba(0x123)]();if([_0x1e3ba(0x25d),_0x1e3ba(0x189)][_0x1e3ba(0x202)](_0x1b8510)){if(_0x1e3ba(0x2df)===_0x1e3ba(0x2df))return this[_0x1e3ba(0x25c)]?this[_0x1e3ba(0x190)]():0x4;else _0x4be8d2['MainMenuCore']['Scene_MenuBase_updateActor'][_0x1e3ba(0x11b)](this),this[_0x1e3ba(0x14e)]()&&this[_0x1e3ba(0x15a)]&&this[_0x1e3ba(0x15a)]['setActor'](this['_actor']);}else return _0x1b8510!=='default'?_0x1e3ba(0x1b4)!=='vDSbL'?VisuMZ[_0x1e3ba(0x2a1)][_0x1e3ba(0x18c)][_0x1e3ba(0x132)][_0x1e3ba(0x137)]:_0x1d8aaa[_0x1e3ba(0x2a1)][_0x1e3ba(0x18c)][_0x1e3ba(0x1a4)]:Window_Command['prototype'][_0x1e3ba(0x241)]['call'](this);},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x171)]=function(){return this['_subcategory']||'';},Window_MenuCommand[_0x364f2c(0x18e)]['isIncludedInSubcategory']=function(_0x3e346d,_0x9db7){const _0x4f5851=_0x364f2c,_0x4fe50a=_0x9db7[_0x4f5851(0x284)]||'';if(!this['doesSubcategoryExist'](_0x4fe50a)&&this['currentSubcategory']()==='')return!![];return _0x4fe50a===this[_0x4f5851(0x171)]();},Window_MenuCommand[_0x364f2c(0x18e)]['doesSubcategoryExist']=function(_0x33f5e8){const _0x5128fb=_0x364f2c;return this[_0x5128fb(0x1c1)]()[_0x5128fb(0x202)](_0x33f5e8);},Window_MenuCommand[_0x364f2c(0x18e)]['getSubcategoryList']=function(){const _0x14a375=_0x364f2c;if(Window_MenuCommand[_0x14a375(0x2a6)]!==undefined){if('Eoans'===_0x14a375(0x249))return Window_MenuCommand['SUBCATEGORY_LIST'];else _0x537d19[_0x14a375(0x12a)](_0x2fa515);}Window_MenuCommand['SUBCATEGORY_LIST']=[];for(const _0x15230e of Window_MenuCommand['_commandList']){if(_0x14a375(0x2d0)!==_0x14a375(0x198)){const _0x362c08=_0x15230e[_0x14a375(0x2c6)];if(_0x362c08!==_0x14a375(0x281))continue;const _0x4a2341=_0x15230e[_0x14a375(0x197)]['call'](this);Window_MenuCommand[_0x14a375(0x2a6)]['push'](_0x4a2341);}else this[_0x14a375(0x20a)](...arguments);}return Window_MenuCommand[_0x14a375(0x2a6)];},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x230)]=function(_0x4e83fd){const _0x45ff88=_0x364f2c;if(!_0x4e83fd)return!![];const _0x443ec4=_0x4e83fd['ExtJS'][_0x45ff88(0x11b)](this);for(const _0x48f6fd of Window_MenuCommand[_0x45ff88(0x235)]){if(_0x48f6fd===_0x4e83fd)continue;const _0x3bfc95=_0x48f6fd[_0x45ff88(0x284)]||'';if(_0x3bfc95!==_0x443ec4)continue;const _0x330119=_0x48f6fd['Symbol'];if(this[_0x45ff88(0x1e9)](_0x330119,_0x48f6fd,!![]))return!![];}return![];},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1b9)]=function(_0x12c683){const _0xc71e57=_0x364f2c;_0x12c683=_0x12c683;if(this['currentSubcategory']()===_0x12c683)return;this[_0xc71e57(0x1eb)]=_0x12c683,$gameTemp[_0xc71e57(0x1d3)]=_0x12c683,this[_0xc71e57(0x295)](),this[_0xc71e57(0x16f)](0x0),this['setTopRow'](0x0),this[_0xc71e57(0x27a)]();},Window_MenuCommand['prototype'][_0x364f2c(0x208)]=function(){const _0x13553f=_0x364f2c,_0x306d70=this[_0x13553f(0x171)]();this[_0x13553f(0x1eb)]='',$gameTemp['_mainMenuSubcategory']=undefined,this[_0x13553f(0x295)](),this[_0x13553f(0x1a8)](0x0);this[_0x13553f(0x23a)]>0x1&&(this[_0x13553f(0x23a)]=0x1,this[_0x13553f(0x2cc)]());const _0x43fd8d=Math[_0x13553f(0x20e)](this[_0x13553f(0x268)](_0x306d70),0x0);this[_0x13553f(0x2b7)](_0x43fd8d),this[_0x13553f(0x27a)]();},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x19c)]=function(){const _0x286f2e=_0x364f2c;return VisuMZ[_0x286f2e(0x2a1)]['Settings']['CustomCmdWin'][_0x286f2e(0x238)];},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1f1)]=function(_0x3d33ca){const _0x31d521=_0x364f2c,_0x42f69b=this[_0x31d521(0x142)](_0x3d33ca);if(_0x42f69b===_0x31d521(0x212))this[_0x31d521(0x294)](_0x3d33ca);else _0x42f69b===_0x31d521(0x21b)?this[_0x31d521(0x2d1)](_0x3d33ca):Window_Command['prototype'][_0x31d521(0x1f1)][_0x31d521(0x11b)](this,_0x3d33ca);},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x282)]=function(){const _0x307680=_0x364f2c;return VisuMZ[_0x307680(0x2a1)]['Settings']['CustomCmdWin'][_0x307680(0x253)];},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x142)]=function(_0x4b86a3){const _0x4b3f87=_0x364f2c,_0x519d19=this[_0x4b3f87(0x282)]();if(_0x519d19!==_0x4b3f87(0x12b))return _0x519d19;else{if('ZrkFh'!==_0x4b3f87(0x177))_0x30d514['forceDisableMainMenuCommand'](_0x2b91fb);else{const _0x2c293b=this['commandName'](_0x4b86a3);if(_0x2c293b[_0x4b3f87(0x1a2)](/\\I\[(\d+)\]/i)){const _0x30618e=this[_0x4b3f87(0x231)](_0x4b86a3),_0x161bdb=this[_0x4b3f87(0x122)](_0x2c293b)[_0x4b3f87(0x12f)];if(_0x161bdb<=_0x30618e['width'])return _0x4b3f87(0x212);else{if(_0x4b3f87(0x135)!==_0x4b3f87(0x135))this[_0x4b3f87(0x28e)](_0x53a647['isBattleMember']());else return _0x4b3f87(0x21b);}}else return _0x4b3f87(0x274);}}},Window_MenuCommand['prototype'][_0x364f2c(0x294)]=function(_0x1b48d4){const _0x2e245e=_0x364f2c,_0x3320b6=this[_0x2e245e(0x231)](_0x1b48d4),_0x5da05e=this[_0x2e245e(0x1e3)](_0x1b48d4),_0x1e14dc=this[_0x2e245e(0x122)](_0x5da05e)[_0x2e245e(0x12f)];this['changePaintOpacity'](this[_0x2e245e(0x13a)](_0x1b48d4));let _0x52fd61=this[_0x2e245e(0x19c)]();if(_0x52fd61===_0x2e245e(0x1d1))_0x2e245e(0x2cd)===_0x2e245e(0x1e7)?this['drawTextEx'](_0x4cf5e3,_0x405c14['x'],_0x3c9b1c['y'],_0x10b357):this[_0x2e245e(0x1f3)](_0x5da05e,_0x3320b6['x']+_0x3320b6[_0x2e245e(0x12f)]-_0x1e14dc,_0x3320b6['y'],_0x1e14dc);else{if(_0x52fd61==='center'){if(_0x2e245e(0x185)!==_0x2e245e(0x1be)){const _0x12fa6b=_0x3320b6['x']+Math[_0x2e245e(0x214)]((_0x3320b6[_0x2e245e(0x12f)]-_0x1e14dc)/0x2);this[_0x2e245e(0x1f3)](_0x5da05e,_0x12fa6b,_0x3320b6['y'],_0x1e14dc);}else return _0x4d9dd8[_0x2e245e(0x2a1)]['Settings'][_0x2e245e(0x2db)][_0x2e245e(0x267)];}else this[_0x2e245e(0x1f3)](_0x5da05e,_0x3320b6['x'],_0x3320b6['y'],_0x1e14dc);}},Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x2d1)]=function(_0x2a5ab7){const _0x3d0ddc=_0x364f2c;this['commandName'](_0x2a5ab7)['match'](/\\I\[(\d+)\]/i);const _0x4a1a60=Number(RegExp['$1']),_0x4df2a3=this[_0x3d0ddc(0x231)](_0x2a5ab7),_0x3f6a44=_0x4df2a3['x']+Math[_0x3d0ddc(0x214)]((_0x4df2a3[_0x3d0ddc(0x12f)]-ImageManager[_0x3d0ddc(0x21f)])/0x2),_0xa3ec83=_0x4df2a3['y']+(_0x4df2a3['height']-ImageManager[_0x3d0ddc(0x1bd)])/0x2;this[_0x3d0ddc(0x263)](_0x4a1a60,_0x3f6a44,_0xa3ec83);},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x1b2)]=Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x2a2)],Window_StatusBase[_0x364f2c(0x18e)]['loadFaceImages']=function(){const _0x1a2c53=_0x364f2c;VisuMZ['MainMenuCore']['Window_StatusBase_loadFaceImages'][_0x1a2c53(0x11b)](this),this[_0x1a2c53(0x1ef)]();},Window_StatusBase['prototype'][_0x364f2c(0x1ef)]=function(){const _0x112b82=_0x364f2c;for(const _0x4b927f of $gameParty[_0x112b82(0x159)]()){if(!_0x4b927f)continue;_0x4b927f['characterName']()&&ImageManager['loadCharacter'](_0x4b927f[_0x112b82(0x1d4)]()),_0x4b927f['battlerName']()&&ImageManager['loadSvActor'](_0x4b927f[_0x112b82(0x24f)]()),_0x4b927f[_0x112b82(0x203)]()&&ImageManager[_0x112b82(0x172)](_0x4b927f[_0x112b82(0x203)]());}},Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x26c)]=function(){const _0x5dd2d1=_0x364f2c;return VisuMZ[_0x5dd2d1(0x2a1)][_0x5dd2d1(0x18c)]['StatusGraphic'];},Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x28f)]=function(_0x570ba9,_0xf13b64,_0x1acc54,_0x513b4a,_0x7b3b07){const _0x11da31=_0x364f2c;_0x513b4a=_0x513b4a||ImageManager[_0x11da31(0x23d)],_0x7b3b07=_0x7b3b07||ImageManager[_0x11da31(0x204)];const _0x5bd7e9=ImageManager[_0x11da31(0x23d)],_0xaacf88=_0x7b3b07-0x2,_0x52c097=_0xf13b64+Math[_0x11da31(0x214)]((_0x513b4a-_0x5bd7e9)/0x2);this[_0x11da31(0x2e9)]===Window_MenuStatus&&this[_0x11da31(0x28e)](_0x570ba9['isBattleMember']()),this[_0x11da31(0x173)](_0x570ba9,_0x52c097,_0x1acc54,_0x5bd7e9,_0xaacf88),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x1f8)]=function(_0x1a9342,_0x3756ab,_0x3cb26a,_0x3fb65b,_0x444487){const _0x404bbd=_0x364f2c;_0x3fb65b=_0x3fb65b||ImageManager['faceWidth'],_0x444487=_0x444487||ImageManager[_0x404bbd(0x204)];const _0x46d058=_0x1a9342['characterName'](),_0x6e24ba=_0x1a9342[_0x404bbd(0x184)](),_0x56b2dc=ImageManager[_0x404bbd(0x15c)](_0x46d058),_0x11c0fd=ImageManager[_0x404bbd(0x2c0)](_0x46d058),_0x453063=_0x56b2dc['width']/(_0x11c0fd?0x3:0xc),_0x445fdb=_0x56b2dc[_0x404bbd(0x1d9)]/(_0x11c0fd?0x4:0x8),_0x1bceae=_0x3fb65b,_0x4c70d5=_0x444487-0x2,_0x2bee5e=_0x3756ab+Math[_0x404bbd(0x214)](_0x1bceae/0x2),_0x4f115e=_0x3cb26a+Math[_0x404bbd(0x1f9)]((_0x444487+_0x445fdb)/0x2);this[_0x404bbd(0x2e9)]===Window_MenuStatus&&('GXufi'==='xnPag'?this[_0x404bbd(0x2d5)][_0x404bbd(0x27a)]():this[_0x404bbd(0x28e)](_0x1a9342[_0x404bbd(0x228)]()));const _0x401bb7=Math['min'](_0x3fb65b,_0x453063),_0x19550e=Math[_0x404bbd(0x2c2)](_0x444487,_0x445fdb),_0x15631c=Math[_0x404bbd(0x214)](_0x3756ab+Math['max'](_0x3fb65b-_0x453063,0x0)/0x2),_0x49afca=Math[_0x404bbd(0x214)](_0x3cb26a+Math[_0x404bbd(0x20e)](_0x444487-_0x445fdb,0x0)/0x2),_0x2b3487=_0x11c0fd?0x0:_0x6e24ba,_0x433da3=(_0x2b3487%0x4*0x3+0x1)*_0x453063,_0x56275f=Math[_0x404bbd(0x214)](_0x2b3487/0x4)*0x4*_0x445fdb;this[_0x404bbd(0x2b6)][_0x404bbd(0x1ce)](_0x56b2dc,_0x433da3,_0x56275f,_0x401bb7,_0x19550e,_0x15631c,_0x49afca),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype'][_0x364f2c(0x272)]=function(_0x35312c,_0x834104,_0x30cfd0,_0x16339e,_0x2e04ef){const _0x1eba91=_0x364f2c;_0x16339e=_0x16339e||ImageManager[_0x1eba91(0x23d)],_0x2e04ef=_0x2e04ef||ImageManager[_0x1eba91(0x204)];const _0x4d6706=ImageManager[_0x1eba91(0x1f5)](_0x35312c[_0x1eba91(0x24f)]()),_0x20ec00=_0x4d6706[_0x1eba91(0x12f)]/ImageManager[_0x1eba91(0x1dc)],_0x401758=_0x4d6706['height']/ImageManager[_0x1eba91(0x1d7)],_0x4b0e66=_0x16339e,_0x580f1e=_0x2e04ef-0x2,_0x24f7ce=_0x834104+Math[_0x1eba91(0x214)](_0x4b0e66/0x2),_0x1ad066=_0x30cfd0+Math[_0x1eba91(0x1f9)]((_0x2e04ef+_0x401758)/0x2);this[_0x1eba91(0x2e9)]===Window_MenuStatus&&this[_0x1eba91(0x28e)](_0x35312c[_0x1eba91(0x228)]());const _0x5cfb02=_0x35312c['hasStaticSvBattler']&&_0x35312c['hasStaticSvBattler'](),_0x21d183=0x0,_0x3b1499=0x0,_0x5ca173=_0x5cfb02?_0x4d6706[_0x1eba91(0x12f)]:_0x20ec00,_0x302c71=_0x5cfb02?_0x4d6706['height']:_0x401758,_0x991f1=Math['min'](0x1,_0x16339e/_0x5ca173,_0x2e04ef/_0x302c71),_0x96d4fd=_0x991f1*_0x5ca173,_0x12b13d=_0x991f1*_0x302c71,_0x2b1dac=Math[_0x1eba91(0x214)](_0x834104+Math[_0x1eba91(0x20e)](_0x16339e-_0x96d4fd,0x0)/0x2),_0x3c69a6=Math[_0x1eba91(0x214)](_0x30cfd0+Math[_0x1eba91(0x20e)](_0x2e04ef-_0x12b13d,0x0)/0x2);this[_0x1eba91(0x2b6)]['blt'](_0x4d6706,_0x21d183,_0x3b1499,_0x5ca173,_0x302c71,_0x2b1dac,_0x3c69a6,_0x96d4fd,_0x12b13d),this[_0x1eba91(0x28e)](!![]);},Window_StatusBase['prototype'][_0x364f2c(0x2af)]=function(_0x19d2f7,_0x57cd17,_0x3d72a8,_0x4dd485,_0x143bc1){const _0x1a8e4f=_0x364f2c,_0x117baa=ImageManager['loadPicture'](_0x19d2f7['getMenuImage']());_0x4dd485=(_0x4dd485||ImageManager['faceWidth'])-0x2,_0x143bc1=(_0x143bc1||ImageManager[_0x1a8e4f(0x204)])-0x2;const _0x17dbdd=_0x117baa['width'],_0xb1cc6=_0x117baa[_0x1a8e4f(0x1d9)],_0x3ac843=_0x4dd485,_0x2b39ee=_0x143bc1-0x2,_0x4d63ad=_0x57cd17+Math[_0x1a8e4f(0x214)](_0x3ac843/0x2),_0x376f40=_0x3d72a8+Math['ceil']((_0x143bc1+_0xb1cc6)/0x2);this[_0x1a8e4f(0x2e9)]===Window_MenuStatus&&this[_0x1a8e4f(0x28e)](_0x19d2f7[_0x1a8e4f(0x228)]());const _0x1c6f80=Math[_0x1a8e4f(0x2c2)](_0x4dd485,_0x17dbdd),_0x1b4776=Math[_0x1a8e4f(0x2c2)](_0x143bc1,_0xb1cc6),_0x9b7e0c=_0x57cd17+0x1,_0x1ca748=Math['max'](_0x3d72a8+0x1,_0x3d72a8+_0x2b39ee-_0xb1cc6+0x3);let _0x5e76dd=Math[_0x1a8e4f(0x2b1)]((_0x17dbdd-_0x1c6f80)/0x2),_0xe68eee=Math[_0x1a8e4f(0x2b1)]((_0xb1cc6-_0x1b4776)/0x2);_0x5e76dd-=_0x19d2f7['getMenuImageOffsetX'](),_0xe68eee-=_0x19d2f7['getMenuImageOffsetY']();if(Imported[_0x1a8e4f(0x1db)]){if('cxJfA'===_0x1a8e4f(0x139)){if(VisuMZ[_0x1a8e4f(0x161)][_0x1a8e4f(0x18c)][_0x1a8e4f(0x192)]['PixelateImageRendering']){}}else this['_mainMenuCore'][_0x5ef28d]=this[_0x1a8e4f(0x1ec)][_0x4a485e]||[];}this[_0x1a8e4f(0x2b6)][_0x1a8e4f(0x1ce)](_0x117baa,_0x5e76dd,_0xe68eee,_0x1c6f80,_0x1b4776,_0x9b7e0c,_0x1ca748),this[_0x1a8e4f(0x28e)](!![]);},Window_Status['prototype'][_0x364f2c(0x173)]=function(_0xcebe33,_0x5c1fae,_0x50e989,_0x1f28b4,_0x380193){const _0x476acd=_0x364f2c;switch(this[_0x476acd(0x26c)]()){case _0x476acd(0x23e):break;case _0x476acd(0x163):this[_0x476acd(0x1f8)](_0xcebe33,_0x5c1fae,_0x50e989,_0x1f28b4,_0x380193);break;case _0x476acd(0x280):this['drawItemActorSvBattler'](_0xcebe33,_0x5c1fae,_0x50e989,_0x1f28b4,_0x380193);break;default:Window_StatusBase[_0x476acd(0x18e)][_0x476acd(0x173)][_0x476acd(0x11b)](this,_0xcebe33,_0x5c1fae,_0x50e989,_0x1f28b4,_0x380193);break;}},VisuMZ['MainMenuCore'][_0x364f2c(0x216)]=Window_MenuStatus['prototype']['selectLast'],Window_MenuStatus['prototype'][_0x364f2c(0x29c)]=function(){const _0x6cb852=_0x364f2c;if(VisuMZ['MainMenuCore'][_0x6cb852(0x18c)]['General']['StatusSelectLast'])VisuMZ[_0x6cb852(0x2a1)][_0x6cb852(0x216)][_0x6cb852(0x11b)](this);else{if(_0x6cb852(0x153)!==_0x6cb852(0x11c))this[_0x6cb852(0x2b7)](0x0);else return _0x2d7b88[_0x6cb852(0x2a1)][_0x6cb852(0x18c)][_0x6cb852(0x297)][_0x6cb852(0x27c)]&&_0x343276[_0x6cb852(0x159)]()[_0x6cb852(0x176)]<=0x1;}},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2dd)]=Window_MenuStatus['prototype']['maxItems'],Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x190)]=function(){const _0x1c882f=_0x364f2c;return this[_0x1c882f(0x16e)]()?$gameParty[_0x1c882f(0x1e6)]()[_0x1c882f(0x176)]:VisuMZ[_0x1c882f(0x2a1)]['Window_MenuStatus_maxItems'][_0x1c882f(0x11b)](this);},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x16e)]=function(){const _0x17be09=_0x364f2c,_0x2b007e=VisuMZ['MainMenuCore']['Settings'][_0x17be09(0x297)];if(_0x2b007e[_0x17be09(0x11d)]===undefined)_0x2b007e[_0x17be09(0x11d)]=!![];const _0x20c3ca=SceneManager[_0x17be09(0x2e0)];if(!_0x2b007e[_0x17be09(0x11d)]){if(_0x17be09(0x2ca)===_0x17be09(0x2ca)){if(_0x2b007e[_0x17be09(0x2d3)])return _0x20c3ca[_0x17be09(0x2e9)]===Scene_Menu;return!![];}else _0x71bf90=_0x475630[_0x17be09(0x2a4)](_0x25e685);}return![];},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x273)]=function(){const _0x1471fb=_0x364f2c,_0x3c000f=SceneManager['_scene']['constructor'];if(_0x3c000f===Scene_Menu){if(_0x1471fb(0x28c)!==_0x1471fb(0x1f0))return VisuMZ['MainMenuCore'][_0x1471fb(0x18c)][_0x1471fb(0x187)];else this[_0x1471fb(0x2d5)][_0x1471fb(0x171)]()!==''?this[_0x1471fb(0x2d5)][_0x1471fb(0x208)]():this['popScene']();}else return VisuMZ[_0x1471fb(0x2a1)]['Settings'][_0x1471fb(0x1e0)];},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x200)]=function(){const _0x1da990=_0x364f2c,_0x376926=this[_0x1da990(0x273)]();switch(_0x376926){case _0x1da990(0x210):case'portrait':return 0x1;case _0x1da990(0x2ab):return 0x1;default:return $gameParty[_0x1da990(0x1e1)]();}},Window_MenuStatus['prototype'][_0x364f2c(0x241)]=function(){const _0x2cab7c=_0x364f2c,_0x1feacf=this['listStyle']();switch(_0x1feacf){case _0x2cab7c(0x210):case'portrait':return $gameParty[_0x2cab7c(0x1e1)]();default:return 0x1;}},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x27e)]=Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1da)],Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1da)]=function(){const _0x152c2a=_0x364f2c,_0x4826c0=this[_0x152c2a(0x273)]();switch(_0x4826c0){case'vertical':case'portrait':case _0x152c2a(0x2ab):return this[_0x152c2a(0x14a)];case _0x152c2a(0x140):return Window_Selectable['prototype'][_0x152c2a(0x1da)][_0x152c2a(0x11b)](this);case'thicker':return this[_0x152c2a(0x1cb)]()*0x2+0x8;default:return VisuMZ[_0x152c2a(0x2a1)][_0x152c2a(0x27e)][_0x152c2a(0x11b)](this);}},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1f1)]=function(_0x354c91){const _0x7ed781=_0x364f2c;this[_0x7ed781(0x1bb)](_0x354c91),this['drawItemStatus'](_0x354c91);},VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x257)]=Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1d8)],Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x11e)]=function(_0x36bf18,_0x3cb787,_0x56aa95,_0xec82a8,_0x5a0b06){const _0x227fb1=_0x364f2c;switch(this[_0x227fb1(0x26c)]()){case _0x227fb1(0x23e):break;case _0x227fb1(0x163):this[_0x227fb1(0x1f8)](_0x36bf18,_0x3cb787,_0x56aa95+0x1,_0xec82a8,_0x5a0b06-0x2);break;case _0x227fb1(0x280):this[_0x227fb1(0x272)](_0x36bf18,_0x3cb787,_0x56aa95+0x1,_0xec82a8,_0x5a0b06-0x2);break;default:this[_0x227fb1(0x28f)](_0x36bf18,_0x3cb787,_0x56aa95,_0xec82a8,_0x5a0b06);break;}},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x117)]=function(_0x296ae6){const _0x281d7e=_0x364f2c;this[_0x281d7e(0x22c)]();const _0x44b8ab=this['actor'](_0x296ae6),_0x1b7f91=this[_0x281d7e(0x2ad)](_0x296ae6),_0x357efd=this[_0x281d7e(0x273)]();switch(_0x357efd){case'vertical':this[_0x281d7e(0x246)](_0x44b8ab,_0x1b7f91);break;case _0x281d7e(0x1bc):this[_0x281d7e(0x118)](_0x44b8ab,_0x1b7f91);break;case _0x281d7e(0x2ab):this[_0x281d7e(0x182)](_0x44b8ab,_0x1b7f91);break;case _0x281d7e(0x140):this[_0x281d7e(0x1c8)](_0x44b8ab,_0x1b7f91);break;case _0x281d7e(0x23c):this[_0x281d7e(0x18f)](_0x44b8ab,_0x1b7f91);break;default:this[_0x281d7e(0x17c)](_0x44b8ab,_0x1b7f91);break;}},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x246)]=function(_0xf53524,_0x2d6e61){const _0x4a3552=_0x364f2c;VisuMZ[_0x4a3552(0x2a1)][_0x4a3552(0x18c)][_0x4a3552(0x22e)][_0x4a3552(0x262)][_0x4a3552(0x11b)](this,_0xf53524,_0x2d6e61);},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x118)]=function(_0x502643,_0x1a7d35){const _0x1133c7=_0x364f2c;if(_0x502643[_0x1133c7(0x203)]()!==''){if(_0x1133c7(0x239)===_0x1133c7(0x126))return _0x3d3797[_0x1133c7(0x18e)][_0x1133c7(0x1da)][_0x1133c7(0x11b)](this);else{const _0x175a05=ImageManager[_0x1133c7(0x172)](_0x502643['getMenuImage']());_0x175a05[_0x1133c7(0x2b9)](this['drawItemStatusPortraitStyleOnLoad'][_0x1133c7(0x206)](this,_0x502643,_0x1a7d35));}}else{if('kjCuj'!==_0x1133c7(0x2b5))this[_0x1133c7(0x246)](_0x502643,_0x1a7d35);else return this[_0x1133c7(0x2b8)]();}},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x2c5)]=function(_0x1ce3b4,_0x27ae31){const _0x430a75=_0x364f2c;VisuMZ[_0x430a75(0x2a1)][_0x430a75(0x18c)]['ListStyles'][_0x430a75(0x199)]['call'](this,_0x1ce3b4,_0x27ae31);},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x182)]=function(_0x5aeb26,_0x5eff15){const _0x22abaa=_0x364f2c,_0x4a0abb=ImageManager[_0x22abaa(0x172)](_0x5aeb26[_0x22abaa(0x203)]());_0x4a0abb[_0x22abaa(0x2b9)](this[_0x22abaa(0x128)][_0x22abaa(0x206)](this,_0x5aeb26,_0x5eff15));},Window_MenuStatus['prototype']['drawItemStatusSoloStyleOnLoad']=function(_0x128468,_0x4a4f54){const _0x35489b=_0x364f2c;VisuMZ[_0x35489b(0x2a1)][_0x35489b(0x18c)]['ListStyles'][_0x35489b(0x134)][_0x35489b(0x11b)](this,_0x128468,_0x4a4f54);},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1c8)]=function(_0x36ae9f,_0x38af92){const _0x2b7d79=_0x364f2c;VisuMZ[_0x2b7d79(0x2a1)][_0x2b7d79(0x18c)][_0x2b7d79(0x22e)][_0x2b7d79(0x1fe)]['call'](this,_0x36ae9f,_0x38af92);},Window_MenuStatus[_0x364f2c(0x18e)]['drawItemStatusThickerStyle']=function(_0x2187a9,_0x5c6c4a){const _0x2ef66e=_0x364f2c;VisuMZ[_0x2ef66e(0x2a1)][_0x2ef66e(0x18c)][_0x2ef66e(0x22e)]['ThickerStyle'][_0x2ef66e(0x11b)](this,_0x2187a9,_0x5c6c4a);},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x151)]=function(){const _0x5387f5=_0x364f2c,_0xeb0794=this[_0x5387f5(0x273)]();if([_0x5387f5(0x140),_0x5387f5(0x23c)][_0x5387f5(0x202)](_0xeb0794))return![];return Window_StatusBase['prototype'][_0x5387f5(0x151)][_0x5387f5(0x11b)](this);},Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x17c)]=function(_0xe3f2c4,_0x591fe1){const _0x482a7f=_0x364f2c;VisuMZ[_0x482a7f(0x2a1)][_0x482a7f(0x18c)]['ListStyles'][_0x482a7f(0x24e)][_0x482a7f(0x11b)](this,_0xe3f2c4,_0x591fe1);},Window_SkillStatus['prototype']['drawActorFace']=function(_0x40333e,_0x3c6fc5,_0x37a06f,_0x12393d,_0x535828){const _0x379439=_0x364f2c;switch(this[_0x379439(0x26c)]()){case _0x379439(0x23e):break;case _0x379439(0x163):this[_0x379439(0x1f8)](_0x40333e,_0x3c6fc5,_0x37a06f,_0x12393d,_0x535828);break;case _0x379439(0x280):this['drawItemActorSvBattler'](_0x40333e,_0x3c6fc5,_0x37a06f,_0x12393d,_0x535828);break;default:Window_StatusBase[_0x379439(0x18e)]['drawActorFace'][_0x379439(0x11b)](this,_0x40333e,_0x3c6fc5,_0x37a06f,_0x12393d,_0x535828);break;}},Window_EquipStatus[_0x364f2c(0x18e)][_0x364f2c(0x173)]=function(_0x9cc4de,_0x3eb1ec,_0x2042ab,_0x5d3a96,_0x5c6aa7){const _0x15e2fc=_0x364f2c;switch(this[_0x15e2fc(0x26c)]()){case'none':break;case _0x15e2fc(0x163):this[_0x15e2fc(0x1f8)](_0x9cc4de,_0x3eb1ec,_0x2042ab,_0x5d3a96,_0x5c6aa7);break;case _0x15e2fc(0x280):this[_0x15e2fc(0x272)](_0x9cc4de,_0x3eb1ec,_0x2042ab,_0x5d3a96,_0x5c6aa7);break;default:Window_StatusBase[_0x15e2fc(0x18e)][_0x15e2fc(0x173)][_0x15e2fc(0x11b)](this,_0x9cc4de,_0x3eb1ec,_0x2042ab,_0x5d3a96,_0x5c6aa7);break;}};function Window_ThinGold(){const _0x31698c=_0x364f2c;this[_0x31698c(0x20a)](...arguments);}Window_ThinGold['prototype']=Object[_0x364f2c(0x13d)](Window_Gold[_0x364f2c(0x18e)]),Window_ThinGold[_0x364f2c(0x18e)][_0x364f2c(0x2e9)]=Window_ThinGold,Window_ThinGold['prototype'][_0x364f2c(0x1da)]=function(){return this['lineHeight']();},Window_ThinGold[_0x364f2c(0x18e)][_0x364f2c(0x1c4)]=function(){const _0x20c7db=_0x364f2c;return Window_Selectable[_0x20c7db(0x18e)][_0x20c7db(0x1c4)][_0x20c7db(0x11b)](this);};function Window_Playtime(){const _0xca645f=_0x364f2c;this[_0xca645f(0x20a)](...arguments);}Window_Playtime[_0x364f2c(0x18e)]=Object['create'](Window_Selectable[_0x364f2c(0x18e)]),Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x2e9)]=Window_Playtime,Window_Playtime[_0x364f2c(0x18e)]['initialize']=function(_0x2edefd){const _0x47926c=_0x364f2c;this[_0x47926c(0x2dc)]=$gameSystem[_0x47926c(0x119)](),this['_timer']=0x3c,Window_Selectable[_0x47926c(0x18e)][_0x47926c(0x20a)][_0x47926c(0x11b)](this,_0x2edefd),this['refresh']();},Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x1da)]=function(){const _0x265fd6=_0x364f2c;return this[_0x265fd6(0x1cb)]();},Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x1d2)]=function(){const _0x95e5ef=_0x364f2c;Window_Selectable['prototype'][_0x95e5ef(0x1d2)][_0x95e5ef(0x11b)](this),this[_0x95e5ef(0x11a)]();},Window_Playtime['prototype'][_0x364f2c(0x11a)]=function(){const _0x3db9b7=_0x364f2c;if(this[_0x3db9b7(0x11f)]-->0x0){if(this['_timer']<=0x0)this[_0x3db9b7(0x295)]();}},Window_Playtime['prototype'][_0x364f2c(0x295)]=function(){const _0x2ffd27=_0x364f2c;this['_timer']=0x3c;const _0x1c128f=this[_0x2ffd27(0x231)](0x0),_0x41ce86=_0x1c128f['x'],_0x31dab8=_0x1c128f['y'],_0x33827b=_0x1c128f[_0x2ffd27(0x12f)];this[_0x2ffd27(0x2b6)][_0x2ffd27(0x293)](),this['drawTimeIcon'](_0x1c128f),this[_0x2ffd27(0x12d)](_0x1c128f),this['drawPlaytime'](_0x1c128f);},Window_Playtime[_0x364f2c(0x18e)]['resetFontSettings']=function(){const _0x1e9903=_0x364f2c;Window_Selectable[_0x1e9903(0x18e)][_0x1e9903(0x22c)][_0x1e9903(0x11b)](this),this[_0x1e9903(0x2b6)][_0x1e9903(0x296)]=VisuMZ[_0x1e9903(0x2a1)][_0x1e9903(0x18c)][_0x1e9903(0x287)]['FontSize'];},Window_Playtime['prototype'][_0x364f2c(0x19d)]=function(_0x2609c3){const _0x12a561=_0x364f2c;if(VisuMZ[_0x12a561(0x2a1)][_0x12a561(0x18c)][_0x12a561(0x287)][_0x12a561(0x14b)]>0x0){const _0x2d3553=VisuMZ[_0x12a561(0x2a1)]['Settings'][_0x12a561(0x287)][_0x12a561(0x14b)],_0x5eb908=_0x2609c3['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x12a561(0x263)](_0x2d3553,_0x2609c3['x'],_0x5eb908);const _0x453a8a=ImageManager[_0x12a561(0x21f)]+0x4;_0x2609c3['x']+=_0x453a8a,_0x2609c3[_0x12a561(0x12f)]-=_0x453a8a;}},Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x12d)]=function(_0x6a7ca0){const _0x3740e4=_0x364f2c;this[_0x3740e4(0x22c)](),this[_0x3740e4(0x2e8)](ColorManager[_0x3740e4(0x1d0)]());const _0x3b8852=VisuMZ['MainMenuCore'][_0x3740e4(0x18c)][_0x3740e4(0x287)]['Time'];this[_0x3740e4(0x223)](_0x3b8852,_0x6a7ca0['x'],_0x6a7ca0['y'],_0x6a7ca0[_0x3740e4(0x12f)],_0x3740e4(0x170)),this[_0x3740e4(0x1cd)]();},Window_Playtime['prototype'][_0x364f2c(0x1d5)]=function(_0x476b65){const _0x44358d=_0x364f2c,_0x4be5f8=$gameSystem['playtimeText']();this['drawText'](_0x4be5f8,_0x476b65['x'],_0x476b65['y'],_0x476b65[_0x44358d(0x12f)],_0x44358d(0x1d1));};function Window_MenuVariables(){const _0x25e015=_0x364f2c;this[_0x25e015(0x20a)](...arguments);}Window_MenuVariables[_0x364f2c(0x18e)]=Object[_0x364f2c(0x13d)](Window_Selectable[_0x364f2c(0x18e)]),Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x2e9)]=Window_MenuVariables,Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x20a)]=function(_0x24c002){const _0x5c6ce3=_0x364f2c;Window_Selectable[_0x5c6ce3(0x18e)]['initialize'][_0x5c6ce3(0x11b)](this,_0x24c002),this[_0x5c6ce3(0x1e2)]=VisuMZ[_0x5c6ce3(0x2a1)][_0x5c6ce3(0x18c)][_0x5c6ce3(0x2db)]['VarList'],this['refresh']();},Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x1da)]=function(){const _0x589a21=_0x364f2c;return this[_0x589a21(0x1cb)]();},Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x241)]=function(){const _0x38eb28=_0x364f2c,_0x169938=SceneManager['_scene'][_0x38eb28(0x123)]();return _0x169938===_0x38eb28(0x24a)?0x1:VisuMZ[_0x38eb28(0x2a1)][_0x38eb28(0x18c)]['Variable'][_0x38eb28(0x143)][_0x38eb28(0x176)];},Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x22c)]=function(){const _0x3cea18=_0x364f2c;Window_Selectable[_0x3cea18(0x18e)]['resetFontSettings'][_0x3cea18(0x11b)](this),this[_0x3cea18(0x2b6)][_0x3cea18(0x296)]=VisuMZ[_0x3cea18(0x2a1)][_0x3cea18(0x18c)][_0x3cea18(0x2db)]['FontSize'],this[_0x3cea18(0x2e8)](ColorManager[_0x3cea18(0x1d0)]());},Window_MenuVariables['prototype'][_0x364f2c(0x190)]=function(){const _0x5afc16=_0x364f2c;return this['_data'][_0x5afc16(0x176)];},Window_MenuVariables[_0x364f2c(0x18e)]['drawAllItems']=function(){const _0xfe6f61=_0x364f2c,_0x318fdc=this['topIndex']();for(let _0x2b68c4=0x0;_0x2b68c4<this[_0xfe6f61(0x147)]();_0x2b68c4++){if(_0xfe6f61(0x2c9)===_0xfe6f61(0x2c9)){const _0x2f91f1=_0x318fdc+_0x2b68c4;_0x2f91f1<this[_0xfe6f61(0x190)]()&&(this['drawItemBackground'](_0x2f91f1),this[_0xfe6f61(0x1f1)](_0x2f91f1));}else{_0x105f49[_0xfe6f61(0x29a)][_0xfe6f61(0x11b)](this,_0x55139f);return;}}},Window_MenuVariables['prototype'][_0x364f2c(0x196)]=function(_0x56fa85){},Window_MenuVariables['prototype']['drawItem']=function(_0x58994d){const _0x42a5d5=_0x364f2c,_0x3e85a6=this[_0x42a5d5(0x1e2)][_0x58994d];if(_0x3e85a6<=0x0)return;if(!$dataSystem[_0x42a5d5(0x1dd)][_0x3e85a6])return;const _0x1428af=this[_0x42a5d5(0x231)](_0x58994d);this[_0x42a5d5(0x22c)]();let _0x5bc398=0x0,_0x5d74db=$dataSystem['variables'][_0x3e85a6][_0x42a5d5(0x1c2)]();if(_0x5d74db[_0x42a5d5(0x1a2)](/\\I\[(\d+)\]/i)){if(_0x42a5d5(0x14c)!=='RnoDW'){_0x38cd91[_0x42a5d5(0x18e)]['callUpdateHelp'][_0x42a5d5(0x11b)](this);if(this['_commandNameWindow'])this[_0x42a5d5(0x130)]();}else _0x5bc398=Number(RegExp['$1']),_0x5d74db=_0x5d74db['replace'](/\\I\[(\d+)\]/i,'')[_0x42a5d5(0x1c2)]();}if(_0x5bc398>0x0){const _0x606540=_0x1428af['y']+(this['lineHeight']()-ImageManager[_0x42a5d5(0x1bd)])/0x2;this['drawIcon'](_0x5bc398,_0x1428af['x'],_0x606540);const _0x55040f=ImageManager[_0x42a5d5(0x21f)]+0x4;_0x1428af['x']+=_0x55040f,_0x1428af[_0x42a5d5(0x12f)]-=_0x55040f;}this['drawText'](_0x5d74db,_0x1428af['x'],_0x1428af['y'],_0x1428af[_0x42a5d5(0x12f)],'left'),this[_0x42a5d5(0x2e8)](ColorManager['normalColor']()),this[_0x42a5d5(0x223)]($gameVariables[_0x42a5d5(0x12c)](_0x3e85a6),_0x1428af['x'],_0x1428af['y'],_0x1428af[_0x42a5d5(0x12f)],_0x42a5d5(0x1d1));};