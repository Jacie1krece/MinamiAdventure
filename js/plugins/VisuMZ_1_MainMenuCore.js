//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.22] [MainMenuCore]
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

const _0x2f5488=_0x3a0e;(function(_0x6dce4d,_0x3a3095){const _0x4d87c2=_0x3a0e,_0x563a26=_0x6dce4d();while(!![]){try{const _0x5b20ae=-parseInt(_0x4d87c2(0x121))/0x1*(-parseInt(_0x4d87c2(0x23e))/0x2)+-parseInt(_0x4d87c2(0x25a))/0x3+parseInt(_0x4d87c2(0x165))/0x4*(-parseInt(_0x4d87c2(0x249))/0x5)+parseInt(_0x4d87c2(0x1b6))/0x6+-parseInt(_0x4d87c2(0x130))/0x7+parseInt(_0x4d87c2(0x152))/0x8+parseInt(_0x4d87c2(0xf0))/0x9*(parseInt(_0x4d87c2(0xbf))/0xa);if(_0x5b20ae===_0x3a3095)break;else _0x563a26['push'](_0x563a26['shift']());}catch(_0x3d207e){_0x563a26['push'](_0x563a26['shift']());}}}(_0x9f24,0x60607));function _0x3a0e(_0x1aa2df,_0x563f44){const _0x9f24f9=_0x9f24();return _0x3a0e=function(_0x3a0e2b,_0x313d2f){_0x3a0e2b=_0x3a0e2b-0xad;let _0x30dc94=_0x9f24f9[_0x3a0e2b];return _0x30dc94;},_0x3a0e(_0x1aa2df,_0x563f44);}var label=_0x2f5488(0x102),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x43afc8){const _0x2f22ef=_0x2f5488;return _0x43afc8['status']&&_0x43afc8[_0x2f22ef(0x196)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2f5488(0x1f4)]=VisuMZ[label][_0x2f5488(0x1f4)]||{},VisuMZ[_0x2f5488(0x166)]=function(_0xcd1021,_0x5b33a4){const _0x4fa269=_0x2f5488;for(const _0x14ed24 in _0x5b33a4){if(_0x14ed24['match'](/(.*):(.*)/i)){if(_0x4fa269(0x20c)!==_0x4fa269(0x132)){const _0x4b02b9=String(RegExp['$1']),_0x5a1652=String(RegExp['$2'])[_0x4fa269(0x117)]()['trim']();let _0x417417,_0x4c8eba,_0x1da413;switch(_0x5a1652){case'NUM':_0x417417=_0x5b33a4[_0x14ed24]!==''?Number(_0x5b33a4[_0x14ed24]):0x0;break;case _0x4fa269(0xcc):_0x4c8eba=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):[],_0x417417=_0x4c8eba['map'](_0xc2729d=>Number(_0xc2729d));break;case _0x4fa269(0x17b):_0x417417=_0x5b33a4[_0x14ed24]!==''?eval(_0x5b33a4[_0x14ed24]):null;break;case _0x4fa269(0x15b):_0x4c8eba=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):[],_0x417417=_0x4c8eba[_0x4fa269(0x22d)](_0x323b6c=>eval(_0x323b6c));break;case _0x4fa269(0x11f):_0x417417=_0x5b33a4[_0x14ed24]!==''?JSON['parse'](_0x5b33a4[_0x14ed24]):'';break;case _0x4fa269(0xcd):_0x4c8eba=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):[],_0x417417=_0x4c8eba[_0x4fa269(0x22d)](_0x113746=>JSON[_0x4fa269(0xbb)](_0x113746));break;case _0x4fa269(0xb1):_0x417417=_0x5b33a4[_0x14ed24]!==''?new Function(JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24])):new Function(_0x4fa269(0x1ed));break;case'ARRAYFUNC':_0x4c8eba=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):[],_0x417417=_0x4c8eba[_0x4fa269(0x22d)](_0x34b683=>new Function(JSON['parse'](_0x34b683)));break;case _0x4fa269(0x1d0):_0x417417=_0x5b33a4[_0x14ed24]!==''?String(_0x5b33a4[_0x14ed24]):'';break;case'ARRAYSTR':_0x4c8eba=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):[],_0x417417=_0x4c8eba[_0x4fa269(0x22d)](_0x286ec9=>String(_0x286ec9));break;case'STRUCT':_0x1da413=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):{},_0xcd1021[_0x4b02b9]={},VisuMZ[_0x4fa269(0x166)](_0xcd1021[_0x4b02b9],_0x1da413);continue;case _0x4fa269(0x14c):_0x4c8eba=_0x5b33a4[_0x14ed24]!==''?JSON[_0x4fa269(0xbb)](_0x5b33a4[_0x14ed24]):[],_0x417417=_0x4c8eba[_0x4fa269(0x22d)](_0x31a236=>VisuMZ['ConvertParams']({},JSON[_0x4fa269(0xbb)](_0x31a236)));break;default:continue;}_0xcd1021[_0x4b02b9]=_0x417417;}else{const _0x57d7b1=this['listStyle']();if([_0x4fa269(0xc5),'thicker'][_0x4fa269(0x1cf)](_0x57d7b1))return![];return _0x5f21a8[_0x4fa269(0x21a)][_0x4fa269(0x1e0)]['call'](this);}}}return _0xcd1021;},(_0x438b0d=>{const _0xafd921=_0x2f5488,_0x54a12e=_0x438b0d[_0xafd921(0x1b5)];for(const _0x38a0e6 of dependencies){if(!Imported[_0x38a0e6]){if(_0xafd921(0x178)===_0xafd921(0x178)){alert(_0xafd921(0x142)[_0xafd921(0x214)](_0x54a12e,_0x38a0e6)),SceneManager[_0xafd921(0x16c)]();break;}else _0x50ac7b=_0x2bdd29(_0x3c15c7['$1']),_0x567ffc=_0x99895f['replace'](/\\I\[(\d+)\]/i,'')['trim']();}}const _0x5b3a4c=_0x438b0d[_0xafd921(0x196)];if(_0x5b3a4c[_0xafd921(0x1fc)](/\[Version[ ](.*?)\]/i)){if(_0xafd921(0xc4)!==_0xafd921(0x167)){const _0x2925db=Number(RegExp['$1']);_0x2925db!==VisuMZ[label]['version']&&(alert(_0xafd921(0x1f0)[_0xafd921(0x214)](_0x54a12e,_0x2925db)),SceneManager[_0xafd921(0x16c)]());}else this[_0xafd921(0x146)]='',this[_0xafd921(0x11a)]()&&this['actor']()[_0xafd921(0x25f)][_0xafd921(0x1fc)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0xafd921(0x146)]=_0x32ae11(_0x223ffe['$1']));}if(_0x5b3a4c[_0xafd921(0x1fc)](/\[Tier[ ](\d+)\]/i)){if(_0xafd921(0xdf)!==_0xafd921(0xb4)){const _0xab5985=Number(RegExp['$1']);if(_0xab5985<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xafd921(0x214)](_0x54a12e,_0xab5985,tier)),SceneManager[_0xafd921(0x16c)]();else{if(_0xafd921(0x18b)!==_0xafd921(0x18b))return this[_0xafd921(0x20e)]?this[_0xafd921(0x24a)]():0x4;else tier=Math[_0xafd921(0xfc)](_0xab5985,tier);}}else{const _0x54e706=this[_0xafd921(0x235)]();if(['top',_0xafd921(0x131),_0xafd921(0x177)][_0xafd921(0x1cf)](_0x54e706))return this[_0xafd921(0x198)]();else return[_0xafd921(0xd2),'thinBottom'][_0xafd921(0x1cf)](_0x54e706)?this[_0xafd921(0x1b0)]():_0x7f816e[_0xafd921(0x102)][_0xafd921(0x1f4)][_0xafd921(0x259)][_0xafd921(0x122)][_0xafd921(0x129)](this);}}VisuMZ[_0xafd921(0x166)](VisuMZ[label]['Settings'],_0x438b0d[_0xafd921(0x13e)]);})(pluginData),PluginManager[_0x2f5488(0xf2)](pluginData['name'],'ChangeActorMenuImageGroup',_0x1f017d=>{const _0x25682e=_0x2f5488;VisuMZ[_0x25682e(0x166)](_0x1f017d,_0x1f017d);const _0x21aedf=_0x1f017d[_0x25682e(0x1cd)],_0x5927cd=_0x1f017d[_0x25682e(0x1f8)];for(let _0x3d37ff of _0x21aedf){if(_0x25682e(0x123)!==_0x25682e(0x183)){_0x3d37ff=parseInt(_0x3d37ff)||0x0;if(_0x3d37ff<=0x0)continue;const _0x5bcb85=$gameActors[_0x25682e(0x11a)](_0x3d37ff);if(!_0x5bcb85)continue;_0x5bcb85[_0x25682e(0x1e3)](_0x5927cd);}else this[_0x25682e(0xcf)](...arguments);}}),PluginManager[_0x2f5488(0xf2)](pluginData[_0x2f5488(0x1b5)],_0x2f5488(0x14e),_0x51a311=>{const _0x15647d=_0x2f5488;VisuMZ[_0x15647d(0x166)](_0x51a311,_0x51a311);const _0x547eba=_0x51a311[_0x15647d(0x147)]>=_0x51a311['Step1Start']?_0x51a311[_0x15647d(0x109)]:_0x51a311[_0x15647d(0x147)],_0x2c742c=_0x51a311[_0x15647d(0x147)]>=_0x51a311[_0x15647d(0x109)]?_0x51a311['Step1End']:_0x51a311[_0x15647d(0x109)],_0x54be59=Array(_0x2c742c-_0x547eba+0x1)['fill']()[_0x15647d(0x22d)]((_0xebf6be,_0x1c819e)=>_0x547eba+_0x1c819e),_0x512a02=_0x51a311[_0x15647d(0x1f8)];for(let _0x3f4a50 of _0x54be59){if(_0x15647d(0xf1)!==_0x15647d(0x1fa)){_0x3f4a50=parseInt(_0x3f4a50)||0x0;if(_0x3f4a50<=0x0)continue;const _0x3bbf39=$gameActors[_0x15647d(0x11a)](_0x3f4a50);if(!_0x3bbf39)continue;_0x3bbf39['setMenuImage'](_0x512a02);}else return _0x472e22[_0x15647d(0x21a)][_0x15647d(0xf5)][_0x15647d(0x129)](this);}}),PluginManager[_0x2f5488(0xf2)](pluginData[_0x2f5488(0x1b5)],_0x2f5488(0xba),_0x2744bf=>{const _0x28c68a=_0x2f5488;VisuMZ[_0x28c68a(0x166)](_0x2744bf,_0x2744bf);const _0x2f9d95=_0x2744bf[_0x28c68a(0x1cd)];let _0x28c806=[];while(_0x2f9d95[_0x28c68a(0x23a)]>0x0){if('vniiG'!==_0x28c68a(0xf7)){const _0x538027=_0x2f9d95[_0x28c68a(0xd3)]();if(Array['isArray'](_0x538027)){if(_0x28c68a(0x21d)!=='TUnir')_0x28c806=_0x28c806[_0x28c68a(0xad)](_0x538027);else{const _0x537d11=this[_0x28c68a(0x204)](_0x311039),_0x1506c2=this[_0x28c68a(0x24e)](_0x3d8edf)['width'];return _0x1506c2<=_0x537d11[_0x28c68a(0xfd)]?_0x28c68a(0xb0):_0x28c68a(0x159);}}else _0x28c806[_0x28c68a(0x213)](_0x538027);}else return this[_0x28c68a(0x1ba)]();}const _0x3195af=_0x2744bf[_0x28c68a(0x1f8)];for(let _0xd64620 of _0x28c806){_0xd64620=parseInt(_0xd64620)||0x0;if(_0xd64620<=0x0)continue;const _0x12c3c2=$gameActors[_0x28c68a(0x11a)](_0xd64620);if(!_0x12c3c2)continue;_0x12c3c2['setMenuImage'](_0x3195af);}}),PluginManager[_0x2f5488(0xf2)](pluginData[_0x2f5488(0x1b5)],_0x2f5488(0x1de),_0x348c18=>{const _0x3b39ae=_0x2f5488;VisuMZ[_0x3b39ae(0x166)](_0x348c18,_0x348c18);const _0x18a9ed=_0x348c18[_0x3b39ae(0x140)]||[];for(const _0x5d2409 of _0x18a9ed){$gameSystem[_0x3b39ae(0x1e8)](_0x5d2409);}}),PluginManager[_0x2f5488(0xf2)](pluginData['name'],_0x2f5488(0xe9),_0x453133=>{const _0x53187b=_0x2f5488;VisuMZ['ConvertParams'](_0x453133,_0x453133);const _0x1bb245=_0x453133[_0x53187b(0x140)]||[];for(const _0x2d6dba of _0x1bb245){$gameSystem[_0x53187b(0x128)](_0x2d6dba);}}),PluginManager['registerCommand'](pluginData[_0x2f5488(0x1b5)],_0x2f5488(0x1ce),_0x531795=>{const _0x346eef=_0x2f5488;VisuMZ[_0x346eef(0x166)](_0x531795,_0x531795);const _0x3beedc=_0x531795[_0x346eef(0x140)]||[];for(const _0x567d66 of _0x3beedc){if('hfRld'!==_0x346eef(0x157))$gameSystem['forceDisableMainMenuCommand'](_0x567d66);else{let _0x1ca06c=_0x4f6055['TextStr'];if(['',_0x346eef(0x1dd)][_0x346eef(0x1cf)](_0x1ca06c))_0x1ca06c=_0x13aeda['TextJS'][_0x346eef(0x129)](this);const _0x32d9fa=_0x539fca[_0x346eef(0x120)];_0x32d9fa>0x0&&this[_0x346eef(0x107)]()!=='text'&&(_0x1ca06c='\x5cI[%1]%2'[_0x346eef(0x214)](_0x32d9fa,_0x1ca06c));const _0x34a732=this[_0x346eef(0x1bc)](_0x7ee262,_0x53c6fb),_0xba839b=_0x498116[_0x346eef(0x135)]['call'](this);_0x4efa73==='subcategory'&&(_0x4163a1++,_0x1d0514+=_0x102f08),this[_0x346eef(0xf8)](_0x1ca06c,_0x2e90ee,_0x34a732,_0xba839b),this[_0x346eef(0x1c2)](_0x4fae8f,_0x4236cb['CallHandlerJS'][_0x346eef(0x15e)](this,_0xba839b));}}}),PluginManager['registerCommand'](pluginData[_0x2f5488(0x1b5)],_0x2f5488(0xae),_0x2740a6=>{const _0xce3443=_0x2f5488;VisuMZ[_0xce3443(0x166)](_0x2740a6,_0x2740a6);const _0x399b1b=_0x2740a6[_0xce3443(0x140)]||[];for(const _0x5e93bb of _0x399b1b){if('nQgxx'===_0xce3443(0x11c))$gameSystem[_0xce3443(0x17c)](_0x5e93bb);else{const _0x3fce92=_0x421eac[_0xce3443(0x102)][_0xce3443(0x1f4)][_0xce3443(0xc7)]['Rows'],_0x43f885=_0x2ca5a3[_0xce3443(0x1b7)],_0x1ee173=this[_0xce3443(0x17d)](_0x3fce92,!![]),_0x45b057=0x0,_0x1927eb=this[_0xce3443(0xe5)]();return new _0x510842(_0x45b057,_0x1927eb,_0x43f885,_0x1ee173);}}}),PluginManager['registerCommand'](pluginData[_0x2f5488(0x1b5)],_0x2f5488(0x1b2),_0x20729f=>{const _0x320b18=_0x2f5488;VisuMZ[_0x320b18(0x166)](_0x20729f,_0x20729f);const _0x3a998c=_0x20729f[_0x320b18(0x140)]||[];for(const _0x507c23 of _0x3a998c){$gameSystem[_0x320b18(0x1f2)](_0x507c23);}}),VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x134)]=SceneManager[_0x2f5488(0x213)],SceneManager[_0x2f5488(0x213)]=function(_0x597226){const _0x5cb472=_0x2f5488;_0x597226===Scene_Menu&&($gameTemp[_0x5cb472(0x18c)]=undefined),VisuMZ[_0x5cb472(0x102)][_0x5cb472(0x134)][_0x5cb472(0x129)](this,_0x597226);},VisuMZ['MainMenuCore'][_0x2f5488(0x174)]=Game_System[_0x2f5488(0x21a)][_0x2f5488(0xcf)],Game_System['prototype'][_0x2f5488(0xcf)]=function(){const _0x167347=_0x2f5488;VisuMZ['MainMenuCore'][_0x167347(0x174)]['call'](this),this[_0x167347(0x1e5)]();},Game_System[_0x2f5488(0x21a)][_0x2f5488(0x1e5)]=function(){const _0x9fdbfa=_0x2f5488;this[_0x9fdbfa(0x1ac)]=this['_mainMenuCore']||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x2f5488(0x21a)]['mainMenuCoreSettings']=function(){const _0x35e5b1=_0x2f5488;if(this['_mainMenuCore']===undefined)this[_0x35e5b1(0x1e5)]();const _0x2de69d=[_0x35e5b1(0x145),_0x35e5b1(0x238),'forceEnable',_0x35e5b1(0x175)];for(const _0x3dd517 of _0x2de69d){if(_0x35e5b1(0xeb)!==_0x35e5b1(0x194))this['_mainMenuCore'][_0x3dd517]=this[_0x35e5b1(0x1ac)][_0x3dd517]||[];else return this[_0x35e5b1(0xd7)]()?_0x11df86['battleMembers']()[_0x35e5b1(0x23a)]:_0x33163f[_0x35e5b1(0x102)][_0x35e5b1(0x223)][_0x35e5b1(0x129)](this);}return this[_0x35e5b1(0x1ac)];},Game_System[_0x2f5488(0x21a)]['getMainMenuSymbolState']=function(_0x2def34,_0x2e7bac){const _0x1f06be=_0x2f5488,_0x1bb4ff=this[_0x1f06be(0xb5)]();if(!_0x1bb4ff[_0x2e7bac])return![];return _0x1bb4ff[_0x2e7bac][_0x1f06be(0x1cf)](_0x2def34);},Game_System[_0x2f5488(0x21a)]['clearShowMainMenuCommand']=function(_0xef8304){const _0x9823ea=_0x2f5488,_0x5cd1d7=this['mainMenuCoreSettings'](),_0xa97d0e=['forceShow',_0x9823ea(0x238),_0x9823ea(0x164),_0x9823ea(0x175)];for(const _0x39e28a of _0xa97d0e){_0x5cd1d7[_0x39e28a][_0x9823ea(0x160)](_0xef8304);}},Game_System['prototype'][_0x2f5488(0x1f2)]=function(_0x379d8e){const _0x4dd6f2=_0x2f5488,_0xa463a=this[_0x4dd6f2(0xb5)]();!_0xa463a[_0x4dd6f2(0x145)][_0x4dd6f2(0x1cf)](_0x379d8e)&&_0xa463a[_0x4dd6f2(0x145)][_0x4dd6f2(0x213)](_0x379d8e),_0xa463a['forceHide'][_0x4dd6f2(0x160)](_0x379d8e);},Game_System[_0x2f5488(0x21a)][_0x2f5488(0x17c)]=function(_0x5ed8a7){const _0x3ba844=_0x2f5488,_0x312025=this[_0x3ba844(0xb5)]();!_0x312025[_0x3ba844(0x238)][_0x3ba844(0x1cf)](_0x5ed8a7)&&_0x312025['forceHide'][_0x3ba844(0x213)](_0x5ed8a7),_0x312025['forceShow']['remove'](_0x5ed8a7);},Game_System[_0x2f5488(0x21a)][_0x2f5488(0x128)]=function(_0xa18613){const _0x36439b=_0x2f5488,_0x2d5432=this[_0x36439b(0xb5)]();!_0x2d5432[_0x36439b(0x164)][_0x36439b(0x1cf)](_0xa18613)&&(_0x36439b(0x21f)!==_0x36439b(0x11b)?_0x2d5432[_0x36439b(0x164)][_0x36439b(0x213)](_0xa18613):_0x1d8dd7[_0x36439b(0x145)]['push'](_0x12e42e)),_0x2d5432['forceDisable']['remove'](_0xa18613);},Game_System[_0x2f5488(0x21a)]['forceDisableMainMenuCommand']=function(_0x14376f){const _0x28cf9b=_0x2f5488,_0x488643=this[_0x28cf9b(0xb5)]();!_0x488643[_0x28cf9b(0x175)][_0x28cf9b(0x1cf)](_0x14376f)&&(_0x28cf9b(0x141)===_0x28cf9b(0x141)?_0x488643[_0x28cf9b(0x175)][_0x28cf9b(0x213)](_0x14376f):(_0x6e2c17[_0x28cf9b(0x102)][_0x28cf9b(0x180)][_0x28cf9b(0x129)](this),this[_0x28cf9b(0x143)]()&&this[_0x28cf9b(0x1cb)]&&this[_0x28cf9b(0x1cb)]['setActor'](this[_0x28cf9b(0x154)]))),_0x488643['forceEnable'][_0x28cf9b(0x160)](_0x14376f);},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x1a5)]=Game_Actor['prototype']['setup'],Game_Actor[_0x2f5488(0x21a)]['setup']=function(_0x36151b){const _0x2973d2=_0x2f5488;VisuMZ['MainMenuCore'][_0x2973d2(0x1a5)][_0x2973d2(0x129)](this,_0x36151b),this[_0x2973d2(0x21c)]();},Game_Actor[_0x2f5488(0x21a)][_0x2f5488(0x21c)]=function(){const _0x783c4b=_0x2f5488;this[_0x783c4b(0x146)]='',this['actor']()&&this[_0x783c4b(0x11a)]()[_0x783c4b(0x25f)][_0x783c4b(0x1fc)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x783c4b(0x146)]=String(RegExp['$1']));},Game_Actor[_0x2f5488(0x21a)][_0x2f5488(0xf9)]=function(){const _0x23da2a=_0x2f5488;if(this[_0x23da2a(0x146)]===undefined)this[_0x23da2a(0x21c)]();return this[_0x23da2a(0x146)];},Game_Actor[_0x2f5488(0x21a)][_0x2f5488(0x1e3)]=function(_0xc6b002){const _0x5d6982=_0x2f5488;if(this[_0x5d6982(0x146)]===undefined)this['initMenuImage']();this[_0x5d6982(0x146)]=_0xc6b002;},Game_Actor[_0x2f5488(0x21a)]['getMenuImageOffsetX']=function(){const _0x2e13e1=_0x2f5488;if(this[_0x2e13e1(0x11a)]()[_0x2e13e1(0x25f)][_0x2e13e1(0x1fc)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x2e13e1(0x11a)]()[_0x2e13e1(0x25f)][_0x2e13e1(0x1fc)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('vchkF'!==_0x2e13e1(0x16b))this['changePaintOpacity'](_0x5dc9b3[_0x2e13e1(0x10c)]());else return Number(RegExp['$1']);}}return 0x0;},Game_Actor[_0x2f5488(0x21a)][_0x2f5488(0x237)]=function(){const _0x26a21c=_0x2f5488;if(this[_0x26a21c(0x11a)]()[_0x26a21c(0x25f)][_0x26a21c(0x1fc)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()[_0x26a21c(0x25f)][_0x26a21c(0x1fc)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return _0x26a21c(0x158)===_0x26a21c(0x1a3)?this[_0x26a21c(0x10a)]():Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x2f5488(0x21a)][_0x2f5488(0x143)]=function(){const _0x59db9f=_0x2f5488;return VisuMZ[_0x59db9f(0x102)]['Settings'][_0x59db9f(0x163)]['ActorBgMenus'][_0x59db9f(0x1cf)](this[_0x59db9f(0x1b1)][_0x59db9f(0x1b5)]);},VisuMZ['MainMenuCore'][_0x2f5488(0x251)]=Scene_MenuBase[_0x2f5488(0x21a)][_0x2f5488(0x219)],Scene_MenuBase[_0x2f5488(0x21a)]['createBackground']=function(){const _0x463d8e=_0x2f5488;VisuMZ[_0x463d8e(0x102)][_0x463d8e(0x251)]['call'](this),this[_0x463d8e(0x136)]();},Scene_MenuBase['prototype']['createActorMenuBackgroundImageSprite']=function(){const _0x4026bc=_0x2f5488;this[_0x4026bc(0x1cb)]=new Sprite_MenuBackgroundActor(),this[_0x4026bc(0xf3)](this[_0x4026bc(0x1cb)]);},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x180)]=Scene_MenuBase[_0x2f5488(0x21a)]['updateActor'],Scene_MenuBase[_0x2f5488(0x21a)][_0x2f5488(0x153)]=function(){const _0x4d1b0c=_0x2f5488;VisuMZ[_0x4d1b0c(0x102)]['Scene_MenuBase_updateActor'][_0x4d1b0c(0x129)](this),this[_0x4d1b0c(0x143)]()&&this[_0x4d1b0c(0x1cb)]&&this[_0x4d1b0c(0x1cb)][_0x4d1b0c(0x22a)](this[_0x4d1b0c(0x154)]);},VisuMZ[_0x2f5488(0x102)]['Scene_Menu_create']=Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x10f)],Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x10f)]=function(){const _0x195daa=_0x2f5488;VisuMZ[_0x195daa(0x102)][_0x195daa(0x139)]['call'](this),this['createPlaytimeWindow'](),this[_0x195daa(0xec)](),this[_0x195daa(0x148)]();},Scene_Menu['prototype'][_0x2f5488(0x101)]=function(){const _0x7cd256=_0x2f5488,_0x1e72df=this[_0x7cd256(0x22b)](),_0x365faa=new Window_MenuCommand(_0x1e72df);_0x365faa[_0x7cd256(0x1c2)](_0x7cd256(0x209),this[_0x7cd256(0x22f)][_0x7cd256(0x15e)](this)),this['addWindow'](_0x365faa),this[_0x7cd256(0x179)]=_0x365faa;},VisuMZ[_0x2f5488(0x102)]['Scene_Menu_commandWindowRect']=Scene_Menu['prototype'][_0x2f5488(0x22b)],Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x22b)]=function(){const _0x34d239=_0x2f5488,_0x108640=this[_0x34d239(0x235)]();if(_0x108640===_0x34d239(0x1f9))return this['commandWindowRectTopStyle']();else{if(_0x108640==='thinTop')return this[_0x34d239(0x17f)]();else{if(_0x108640===_0x34d239(0xd2))return this[_0x34d239(0x10a)]();else{if(_0x108640==='thinBottom')return this[_0x34d239(0x207)]();else{if(_0x108640==='mobile'){if(_0x34d239(0x24c)===_0x34d239(0x24c))return this[_0x34d239(0x1ba)]();else this[_0x34d239(0x208)](),this[_0x34d239(0x1bf)](),this[_0x34d239(0x1c6)]();}else{const _0x4f26b3=VisuMZ['MainMenuCore'][_0x34d239(0x1ff)]['call'](this);return this['adjustDefaultCommandWindowRect'](_0x4f26b3),_0x4f26b3;}}}}}},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x256)]=function(_0x4ffe00){const _0x13353e=_0x2f5488;if(this[_0x13353e(0x21e)]()){if(_0x13353e(0xb8)!=='hBwRu'){if(this['_duration']>0x0){const _0x25fcc3=this[_0x13353e(0x168)];this['x']=(this['x']*(_0x25fcc3-0x1)+this[_0x13353e(0xbd)])/_0x25fcc3,this['y']=(this['y']*(_0x25fcc3-0x1)+this[_0x13353e(0xfa)])/_0x25fcc3;}}else _0x4ffe00['height']-=this['playtimeWindowRect']()[_0x13353e(0x176)];}this[_0x13353e(0xc1)]()&&(_0x4ffe00[_0x13353e(0x176)]-=this[_0x13353e(0x233)]()[_0x13353e(0x176)]);},Scene_Menu['prototype'][_0x2f5488(0x156)]=function(){const _0x1fde31=_0x2f5488,_0x17cb64=VisuMZ[_0x1fde31(0x102)][_0x1fde31(0x1f4)][_0x1fde31(0xc7)][_0x1fde31(0x1d3)],_0x12c9cd=Graphics[_0x1fde31(0x1b7)],_0x3c4154=this['calcWindowHeight'](_0x17cb64,!![]),_0x1105b3=0x0,_0x20ac66=this[_0x1fde31(0xe5)]();return new Rectangle(_0x1105b3,_0x20ac66,_0x12c9cd,_0x3c4154);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x17f)]=function(){const _0x197aa1=_0x2f5488,_0x42d697=VisuMZ[_0x197aa1(0x102)][_0x197aa1(0x1f4)][_0x197aa1(0xc7)][_0x197aa1(0x1d3)],_0x4c7850=Graphics['boxWidth'],_0x7ec076=this[_0x197aa1(0x17d)](0x1,!![]),_0x407ee2=0x0,_0x2412cd=this['mainAreaTop']();return new Rectangle(_0x407ee2,_0x2412cd,_0x4c7850,_0x7ec076);},Scene_Menu[_0x2f5488(0x21a)]['commandWindowRectBottomStyle']=function(){const _0x5d9f77=_0x2f5488,_0x593ee1=VisuMZ[_0x5d9f77(0x102)][_0x5d9f77(0x1f4)][_0x5d9f77(0xc7)]['Rows'],_0x17408a=Graphics[_0x5d9f77(0x1b7)],_0x1aaa10=this['calcWindowHeight'](_0x593ee1,!![]),_0x22f70b=0x0,_0x2284c6=this[_0x5d9f77(0x1e6)]()-_0x1aaa10;return new Rectangle(_0x22f70b,_0x2284c6,_0x17408a,_0x1aaa10);},Scene_Menu['prototype'][_0x2f5488(0x207)]=function(){const _0x2ca6c2=_0x2f5488,_0x231c09=VisuMZ[_0x2ca6c2(0x102)][_0x2ca6c2(0x1f4)]['CustomCmdWin']['Rows'],_0x538778=Graphics[_0x2ca6c2(0x1b7)],_0x5410f6=this[_0x2ca6c2(0x17d)](0x1,!![]),_0x2f5bf7=0x0,_0x4d2c6f=this[_0x2ca6c2(0x1e6)]()-_0x5410f6;return new Rectangle(_0x2f5bf7,_0x4d2c6f,_0x538778,_0x5410f6);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x1ba)]=function(){const _0x546247=_0x2f5488,_0x4f908c=VisuMZ[_0x546247(0x102)][_0x546247(0x1f4)][_0x546247(0xc7)][_0x546247(0x1d3)],_0x5d2db0=Graphics[_0x546247(0x1b7)],_0x1c3990=Window_MenuCommand['prototype'][_0x546247(0x119)](_0x4f908c),_0x5e6f70=0x0,_0x1a1240=Math[_0x546247(0x232)]((Graphics[_0x546247(0x104)]-_0x1c3990)/0x2);return new Rectangle(_0x5e6f70,_0x1a1240,_0x5d2db0,_0x1c3990);},Scene_Menu['prototype']['commandWindowStyle']=function(){const _0x492190=_0x2f5488;return VisuMZ[_0x492190(0x102)]['Settings']['CommandWindowStyle'];},Scene_Menu[_0x2f5488(0x21a)]['thinGoldWindow']=function(){const _0x4c9768=_0x2f5488;if(this[_0x4c9768(0x235)]()!==_0x4c9768(0x19a))return!![];return VisuMZ['MainMenuCore'][_0x4c9768(0x1f4)][_0x4c9768(0x163)][_0x4c9768(0x1b4)];},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x216)]=function(){const _0x48b4b3=_0x2f5488,_0x4c178a=this[_0x48b4b3(0x133)]();this['_goldWindow']=this[_0x48b4b3(0x211)]()?new Window_ThinGold(_0x4c178a):new Window_Gold(_0x4c178a),this[_0x48b4b3(0x150)](this[_0x48b4b3(0x13b)]);},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x229)]=Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x133)],Scene_Menu['prototype']['goldWindowRect']=function(){const _0x49b9cd=_0x2f5488,_0x218798=this[_0x49b9cd(0x235)]();if(['top','thinTop','mobile'][_0x49b9cd(0x1cf)](_0x218798)){if(_0x49b9cd(0x1c3)===_0x49b9cd(0x1e2))_0x156bdc[_0x49b9cd(0x1e8)](_0x51ae78);else return this[_0x49b9cd(0x1ae)]();}else{if([_0x49b9cd(0xd2),_0x49b9cd(0x11e)]['includes'](_0x218798))return this[_0x49b9cd(0x1fd)]();else{const _0x110659=VisuMZ[_0x49b9cd(0x102)][_0x49b9cd(0x229)][_0x49b9cd(0x129)](this);return this[_0x49b9cd(0xfb)](_0x110659),_0x110659;}}},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0xfb)]=function(_0x4b1d66){const _0x34d540=_0x2f5488;if(this[_0x34d540(0x211)]()){if(_0x34d540(0x23d)!=='cZkFP')this[_0x34d540(0xcf)](...arguments);else{if(VisuMZ[_0x34d540(0x102)][_0x34d540(0x1f4)][_0x34d540(0x163)][_0x34d540(0xc6)]){const _0x3a4950=_0x4b1d66['height']-this[_0x34d540(0x17d)](0x1,![]);_0x4b1d66['y']+=_0x3a4950;}VisuMZ[_0x34d540(0x102)][_0x34d540(0x1f4)][_0x34d540(0x163)]['AutoGoldHeight']&&(_0x4b1d66[_0x34d540(0x176)]=this[_0x34d540(0x17d)](0x1,![]));}}},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x1ae)]=function(){const _0x9ccf36=_0x2f5488,_0x265fc1=this['mainCommandWidth'](),_0x10294f=this['calcWindowHeight'](0x1,![]),_0x379c52=Graphics['boxWidth']-_0x265fc1,_0x524c9d=this[_0x9ccf36(0x1e6)]()-_0x10294f;return new Rectangle(_0x379c52,_0x524c9d,_0x265fc1,_0x10294f);},Scene_Menu[_0x2f5488(0x21a)]['goldWindowRectBottomStyle']=function(){const _0x1a2ebc=_0x2f5488,_0x13c473=this[_0x1a2ebc(0x1d5)](),_0x56e43a=this[_0x1a2ebc(0x17d)](0x1,![]),_0x185501=Graphics[_0x1a2ebc(0x1b7)]-_0x13c473,_0x2cc95f=this[_0x1a2ebc(0xe5)]();return new Rectangle(_0x185501,_0x2cc95f,_0x13c473,_0x56e43a);},VisuMZ['MainMenuCore'][_0x2f5488(0x137)]=Scene_Menu['prototype'][_0x2f5488(0x22c)],Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x22c)]=function(){const _0x100bf0=_0x2f5488;VisuMZ['MainMenuCore'][_0x100bf0(0x137)][_0x100bf0(0x129)](this),this['adjustStatusWindowMobile']();},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x18a)]=function(){const _0x1eea98=_0x2f5488;if(this[_0x1eea98(0x235)]()==='mobile'){if('SJzWO'===_0x1eea98(0x115)){const _0x2b0ed8=this[_0x1eea98(0x168)];this['x']=(this['x']*(_0x2b0ed8-0x1)+this['_targetX'])/_0x2b0ed8,this['y']=(this['y']*(_0x2b0ed8-0x1)+this['_targetY'])/_0x2b0ed8;}else this['_statusWindow'][_0x1eea98(0x106)]=0x0;}},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x17a)]=Scene_Menu['prototype'][_0x2f5488(0x118)],Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x118)]=function(){const _0xd79c9=_0x2f5488,_0x420d94=this[_0xd79c9(0x235)]();if(['top',_0xd79c9(0x131)][_0xd79c9(0x1cf)](_0x420d94))return this[_0xd79c9(0x1e7)]();else{if(['bottom',_0xd79c9(0x11e)][_0xd79c9(0x1cf)](_0x420d94))return this[_0xd79c9(0x170)]();else{if(_0x420d94===_0xd79c9(0x177))return'wckWB'===_0xd79c9(0x1e4)?_0x3b1c70(_0x32fa38['$1']):this[_0xd79c9(0x202)]();else{if('yKIJZ'!==_0xd79c9(0x18e)){if(!this[_0xd79c9(0x161)]())return new _0x4ba5ef(0x0,0x0,0x0,0x0);const _0x437303=this['playtimeWindowRect']();this[_0xd79c9(0x1ca)]=new _0x44f70b(_0x437303),this[_0xd79c9(0x1ca)][_0xd79c9(0x14b)](_0xae07da[_0xd79c9(0x102)][_0xd79c9(0x1f4)][_0xd79c9(0x1a9)][_0xd79c9(0x1bd)]),this['addWindow'](this[_0xd79c9(0x1ca)]);}else return VisuMZ[_0xd79c9(0x102)]['Scene_Menu_statusWindowRect']['call'](this);}}}},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x1e7)]=function(){const _0x58de05=_0x2f5488,_0x4c0989=Graphics[_0x58de05(0x1b7)],_0x41fb0d=this['mainAreaHeight']()-this['_commandWindow'][_0x58de05(0x176)]-this[_0x58de05(0x13b)][_0x58de05(0x176)],_0x3bcc7a=0x0,_0x4fc27a=this[_0x58de05(0x179)]['y']+this['_commandWindow'][_0x58de05(0x176)];return new Rectangle(_0x3bcc7a,_0x4fc27a,_0x4c0989,_0x41fb0d);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x170)]=function(){const _0x3d9898=_0x2f5488,_0x2700d2=Graphics[_0x3d9898(0x1b7)],_0x1f7b3c=this[_0x3d9898(0x12e)]()-this[_0x3d9898(0x179)][_0x3d9898(0x176)]-this[_0x3d9898(0x13b)]['height'],_0x37383c=0x0,_0xfffca5=this[_0x3d9898(0x13b)]['y']+this[_0x3d9898(0x13b)][_0x3d9898(0x176)];return new Rectangle(_0x37383c,_0xfffca5,_0x2700d2,_0x1f7b3c);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x202)]=function(){const _0x7dba4a=_0x2f5488,_0x31b995=Graphics[_0x7dba4a(0x1b7)],_0x16d3f9=this[_0x7dba4a(0x12e)]()-this[_0x7dba4a(0x13b)]['height'],_0x4d7742=0x0,_0x42cc6a=this[_0x7dba4a(0x1e6)]()-this[_0x7dba4a(0x13b)][_0x7dba4a(0x176)]-_0x16d3f9;return new Rectangle(_0x4d7742,_0x42cc6a,_0x31b995,_0x16d3f9);},Scene_Menu[_0x2f5488(0x21a)]['createPlaytimeWindow']=function(){const _0x3c7b2c=_0x2f5488;if(!this[_0x3c7b2c(0x161)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x55e99a=this[_0x3c7b2c(0x221)]();this[_0x3c7b2c(0x1ca)]=new Window_Playtime(_0x55e99a),this[_0x3c7b2c(0x1ca)][_0x3c7b2c(0x14b)](VisuMZ[_0x3c7b2c(0x102)][_0x3c7b2c(0x1f4)][_0x3c7b2c(0x1a9)][_0x3c7b2c(0x1bd)]),this[_0x3c7b2c(0x150)](this[_0x3c7b2c(0x1ca)]);},Scene_Menu['prototype'][_0x2f5488(0x161)]=function(){const _0x5e0201=_0x2f5488;return VisuMZ[_0x5e0201(0x102)][_0x5e0201(0x1f4)][_0x5e0201(0x1a9)][_0x5e0201(0x14f)];},Scene_Menu['prototype'][_0x2f5488(0x21e)]=function(){const _0x28d5d5=_0x2f5488;return this[_0x28d5d5(0x161)]()&&(VisuMZ[_0x28d5d5(0x102)][_0x28d5d5(0x1f4)][_0x28d5d5(0x1a9)]['AdjustCommandHeight']??!![]);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x221)]=function(){const _0x21f9e2=_0x2f5488,_0x32d327=this[_0x21f9e2(0x235)]();if(['top',_0x21f9e2(0x131),'mobile'][_0x21f9e2(0x1cf)](_0x32d327)){if('qIAfJ'==='qIAfJ')return this[_0x21f9e2(0x111)]();else _0x559aae=_0x21f9e2(0x16f)['format'](_0x4a0eea,_0x59c215);}else{if([_0x21f9e2(0xd2),_0x21f9e2(0x11e)][_0x21f9e2(0x1cf)](_0x32d327)){if('rFGAH'===_0x21f9e2(0x1b9))_0x5e885a[_0x21f9e2(0x102)][_0x21f9e2(0x1a5)][_0x21f9e2(0x129)](this,_0x39c4d1),this[_0x21f9e2(0x21c)]();else return this[_0x21f9e2(0x149)]();}else return VisuMZ[_0x21f9e2(0x102)][_0x21f9e2(0x1f4)][_0x21f9e2(0x1a9)][_0x21f9e2(0x122)][_0x21f9e2(0x129)](this);}},Scene_Menu['prototype'][_0x2f5488(0x111)]=function(){const _0x4ff7c1=_0x2f5488,_0x54c0bc=this[_0x4ff7c1(0x1d5)](),_0x1a438e=this['calcWindowHeight'](0x1,![]),_0xa2fd73=0x0,_0x3104a9=this[_0x4ff7c1(0x1e6)]()-_0x1a438e;return new Rectangle(_0xa2fd73,_0x3104a9,_0x54c0bc,_0x1a438e);},Scene_Menu[_0x2f5488(0x21a)]['playtimeWindowRectBottomStyle']=function(){const _0x4ea2ed=_0x2f5488,_0xe4bc7a=this['mainCommandWidth'](),_0xed54bb=this[_0x4ea2ed(0x17d)](0x1,![]),_0x1cdfa9=0x0,_0x22ce9f=this['mainAreaTop']();return new Rectangle(_0x1cdfa9,_0x22ce9f,_0xe4bc7a,_0xed54bb);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0xec)]=function(){const _0x5a82cf=_0x2f5488;if(!this[_0x5a82cf(0x192)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x48f54f=this[_0x5a82cf(0x233)]();this[_0x5a82cf(0xd5)]=new Window_MenuVariables(_0x48f54f),this[_0x5a82cf(0xd5)]['setBackgroundType'](VisuMZ[_0x5a82cf(0x102)][_0x5a82cf(0x1f4)][_0x5a82cf(0x259)]['BgType']),this[_0x5a82cf(0x150)](this[_0x5a82cf(0xd5)]);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x192)]=function(){const _0x240361=_0x2f5488;return VisuMZ[_0x240361(0x102)][_0x240361(0x1f4)][_0x240361(0x259)][_0x240361(0x14f)];},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0xc1)]=function(){const _0x37b6aa=_0x2f5488;return this[_0x37b6aa(0x192)]()&&(VisuMZ[_0x37b6aa(0x102)]['Settings'][_0x37b6aa(0x259)][_0x37b6aa(0x125)]??!![]);},Scene_Menu['prototype'][_0x2f5488(0x233)]=function(){const _0x37ac4c=_0x2f5488,_0x216d27=this['commandWindowStyle']();if(['top',_0x37ac4c(0x131),_0x37ac4c(0x177)][_0x37ac4c(0x1cf)](_0x216d27))return this[_0x37ac4c(0x198)]();else{if([_0x37ac4c(0xd2),_0x37ac4c(0x11e)][_0x37ac4c(0x1cf)](_0x216d27))return this[_0x37ac4c(0x1b0)]();else{if(_0x37ac4c(0x124)!==_0x37ac4c(0x124)){_0x4c3130['MainMenuCore'][_0x37ac4c(0xdd)][_0x37ac4c(0x129)](this);if(this['commandWindowStyle']()===_0x37ac4c(0x177))this[_0x37ac4c(0x197)][_0x37ac4c(0x18f)]();}else return VisuMZ[_0x37ac4c(0x102)][_0x37ac4c(0x1f4)]['Variable'][_0x37ac4c(0x122)]['call'](this);}}},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x198)]=function(){const _0x3468d6=_0x2f5488,_0x48c965=Graphics[_0x3468d6(0x1b7)]-this[_0x3468d6(0x13b)][_0x3468d6(0xfd)]-(this[_0x3468d6(0x1ca)]?this[_0x3468d6(0x1ca)][_0x3468d6(0xfd)]:0x0),_0x4a0f61=this[_0x3468d6(0x17d)](0x1,![]),_0x32c52a=this['_goldWindow']['x']-_0x48c965,_0x4b5f38=this[_0x3468d6(0x1e6)]()-_0x4a0f61;return new Rectangle(_0x32c52a,_0x4b5f38,_0x48c965,_0x4a0f61);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x1b0)]=function(){const _0x5b4adb=_0x2f5488,_0x2f0c6b=Graphics[_0x5b4adb(0x1b7)]-this['_goldWindow'][_0x5b4adb(0xfd)]-(this['_playtimeWindow']?this['_playtimeWindow'][_0x5b4adb(0xfd)]:0x0),_0x58f230=this['calcWindowHeight'](0x1,![]),_0x141d15=this[_0x5b4adb(0x13b)]['x']-_0x2f0c6b,_0x2dd48a=this[_0x5b4adb(0xe5)]();return new Rectangle(_0x141d15,_0x2dd48a,_0x2f0c6b,_0x58f230);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x148)]=function(){const _0xea1688=_0x2f5488;if(!this[_0xea1688(0xe3)]())return;const _0x550228=this[_0xea1688(0x233)]();this[_0xea1688(0x190)]=new Window_Base(_0x550228),this[_0xea1688(0x190)][_0xea1688(0x14b)](VisuMZ[_0xea1688(0x102)][_0xea1688(0x1f4)]['Variable'][_0xea1688(0x1bd)]),this['addWindow'](this[_0xea1688(0x190)]);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0xe3)]=function(){const _0x391de9=_0x2f5488;if([_0x391de9(0x19a),_0x391de9(0x177)][_0x391de9(0x1cf)](this[_0x391de9(0x235)]()))return![];if(this['_variableWindow'])return![];return!![];},VisuMZ['MainMenuCore'][_0x2f5488(0x1cc)]=Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0xcb)],Scene_Menu['prototype'][_0x2f5488(0xcb)]=function(){const _0x4f6e6=_0x2f5488;if(this[_0x4f6e6(0x234)]()&&this[_0x4f6e6(0x197)])$gameParty['setTargetActor']($gameParty[_0x4f6e6(0x1a8)]()[0x0]),this[_0x4f6e6(0xfe)]();else{if(this[_0x4f6e6(0x235)]()==='mobile')this['_statusWindow']['open']();VisuMZ[_0x4f6e6(0x102)][_0x4f6e6(0x1cc)][_0x4f6e6(0x129)](this);}},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x234)]=function(){const _0x18b279=_0x2f5488;return VisuMZ[_0x18b279(0x102)][_0x18b279(0x1f4)][_0x18b279(0x163)][_0x18b279(0xc0)]&&$gameParty['members']()[_0x18b279(0x23a)]<=0x1;},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0xfe)]=function(){const _0x2fc9d1=_0x2f5488,_0x2a07a7=this['_commandWindow'][_0x2fc9d1(0x187)](),_0x358f41=this[_0x2fc9d1(0x179)]['currentExt']();for(const _0x52bc19 of Window_MenuCommand[_0x2fc9d1(0xd4)]){if(_0x52bc19['Symbol']===_0x2a07a7){_0x52bc19[_0x2fc9d1(0xc3)][_0x2fc9d1(0x129)](this,_0x358f41);return;}}},VisuMZ[_0x2f5488(0x102)]['Scene_Menu_onPersonalCancel']=Scene_Menu['prototype'][_0x2f5488(0x13f)],Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x13f)]=function(){const _0xa320a2=_0x2f5488;VisuMZ[_0xa320a2(0x102)]['Scene_Menu_onPersonalCancel'][_0xa320a2(0x129)](this);if(this[_0xa320a2(0x235)]()===_0xa320a2(0x177))this[_0xa320a2(0x197)]['close']();},Scene_Menu[_0x2f5488(0x21a)]['commandCommonEvent']=function(){const _0x3a5349=_0x2f5488,_0x312009=parseInt(this['_commandWindow'][_0x3a5349(0x1e1)]());if(_0x312009){if('YoIYu'!==_0x3a5349(0x23b))$gameTemp[_0x3a5349(0x1eb)](_0x312009),this[_0x3a5349(0x15c)]();else return _0x564df9[_0x3a5349(0x102)][_0x3a5349(0x1f4)][_0x3a5349(0x259)][_0x3a5349(0x122)][_0x3a5349(0x129)](this);}else this[_0x3a5349(0x179)]['activate']();},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x191)]=Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x1ef)],Scene_Menu[_0x2f5488(0x21a)]['commandFormation']=function(){const _0x10f176=_0x2f5488;VisuMZ[_0x10f176(0x102)]['Scene_Menu_commandFormation'][_0x10f176(0x129)](this);if(this[_0x10f176(0x235)]()==='mobile')this[_0x10f176(0x197)][_0x10f176(0x15f)]();},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0xdd)]=Scene_Menu[_0x2f5488(0x21a)]['onFormationCancel'],Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x22e)]=function(){const _0x294357=_0x2f5488;VisuMZ[_0x294357(0x102)]['Scene_Menu_onFormationCancel'][_0x294357(0x129)](this);if(this[_0x294357(0x235)]()==='mobile')this[_0x294357(0x197)]['close']();},Scene_Menu[_0x2f5488(0x21a)]['commandLoad']=function(){const _0x579552=_0x2f5488;SceneManager[_0x579552(0x213)](Scene_Load);},Scene_Menu[_0x2f5488(0x21a)][_0x2f5488(0x22f)]=function(){const _0x4ceff9=_0x2f5488;if(this[_0x4ceff9(0x179)]['currentSubcategory']()!==''){if(_0x4ceff9(0x113)===_0x4ceff9(0x113))this[_0x4ceff9(0x179)][_0x4ceff9(0x25d)]();else{const _0x3e49bf=_0x4e9870(_0x1cadd5['$1']);_0x3e49bf!==_0x238ebc[_0x4a2d93]['version']&&(_0x222e67(_0x4ceff9(0x1f0)['format'](_0x5d016d,_0x3e49bf)),_0x192db1[_0x4ceff9(0x16c)]());}}else _0x4ceff9(0x108)!==_0x4ceff9(0x1d8)?this['popScene']():_0x36acd9[_0x4ceff9(0x102)][_0x4ceff9(0x1f4)]['ListStyles'][_0x4ceff9(0x15d)][_0x4ceff9(0x129)](this,_0x41bc93,_0x4eca1b);};function Sprite_MenuBackgroundActor(){const _0xc4f39b=_0x2f5488;this[_0xc4f39b(0xcf)](...arguments);}Sprite_MenuBackgroundActor['prototype']=Object[_0x2f5488(0x10f)](Sprite['prototype']),Sprite_MenuBackgroundActor[_0x2f5488(0x21a)]['constructor']=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x2f5488(0x21a)][_0x2f5488(0xcf)]=function(){const _0x3e4544=_0x2f5488;this['_actor']=null,this['_bitmapReady']=![],Sprite[_0x3e4544(0x21a)][_0x3e4544(0xcf)][_0x3e4544(0x129)](this),this['x']=Graphics['width'];},Sprite_MenuBackgroundActor[_0x2f5488(0x21a)][_0x2f5488(0x22a)]=function(_0x472786){const _0x3c9b53=_0x2f5488;this[_0x3c9b53(0x154)]!==_0x472786&&(this['_actor']=_0x472786,this[_0x3c9b53(0xe4)]());},Sprite_MenuBackgroundActor['prototype'][_0x2f5488(0xe4)]=function(){const _0x13b5a7=_0x2f5488;this['_bitmapReady']=![];if(this[_0x13b5a7(0x154)])this[_0x13b5a7(0x246)]=ImageManager[_0x13b5a7(0x116)](this['_actor'][_0x13b5a7(0xf9)]()),this[_0x13b5a7(0x246)][_0x13b5a7(0xf6)](this[_0x13b5a7(0x12b)][_0x13b5a7(0x15e)](this));else{if(_0x13b5a7(0x1d6)==='HlNVQ')this['bitmap']=new Bitmap(0x1,0x1);else return _0x40d5b0[_0x13b5a7(0x13a)]()[_0x13b5a7(0x23a)];}},Sprite_MenuBackgroundActor[_0x2f5488(0x21a)][_0x2f5488(0x12b)]=function(){const _0x376211=_0x2f5488;this[_0x376211(0xf4)]=!![],VisuMZ[_0x376211(0x102)][_0x376211(0x1f4)]['General'][_0x376211(0x19b)]['call'](this);},Sprite_MenuBackgroundActor[_0x2f5488(0x21a)][_0x2f5488(0x169)]=function(){const _0x31fc88=_0x2f5488;Sprite[_0x31fc88(0x21a)][_0x31fc88(0x169)]['call'](this),this[_0x31fc88(0xf4)]&&(_0x31fc88(0x20a)!==_0x31fc88(0x240)?(this['updateOpacity'](),this[_0x31fc88(0x1bf)](),this[_0x31fc88(0x1c6)]()):this[_0x31fc88(0x179)][_0x31fc88(0x25d)]());},Sprite_MenuBackgroundActor[_0x2f5488(0x21a)]['updateOpacity']=function(){const _0x199183=_0x2f5488;if(this[_0x199183(0x168)]>0x0){if(_0x199183(0x1c1)===_0x199183(0x13d))this['_actorMenuBgSprite']=new _0x3958f5(),this['addChild'](this[_0x199183(0x1cb)]);else{const _0x31530d=this['_duration'];this[_0x199183(0x254)]=(this[_0x199183(0x254)]*(_0x31530d-0x1)+0xff)/_0x31530d;}}},Sprite_MenuBackgroundActor[_0x2f5488(0x21a)][_0x2f5488(0x1bf)]=function(){const _0x27b52f=_0x2f5488;if(this[_0x27b52f(0x168)]>0x0){if(_0x27b52f(0x17e)==='KOJnw'){const _0x344715=this[_0x27b52f(0x168)];this['x']=(this['x']*(_0x344715-0x1)+this[_0x27b52f(0xbd)])/_0x344715,this['y']=(this['y']*(_0x344715-0x1)+this[_0x27b52f(0xfa)])/_0x344715;}else{const _0x3f608e=_0x2c85ee['MainMenuCore']['Settings'][_0x27b52f(0xc7)]['Rows'],_0x55dbf3=_0x1357b4[_0x27b52f(0x1b7)],_0x2e15f7=this[_0x27b52f(0x17d)](0x1,!![]),_0x3aeca1=0x0,_0x2481e0=this[_0x27b52f(0x1e6)]()-_0x2e15f7;return new _0x32f547(_0x3aeca1,_0x2481e0,_0x55dbf3,_0x2e15f7);}}},Sprite_MenuBackgroundActor[_0x2f5488(0x21a)][_0x2f5488(0x1c6)]=function(){const _0x3a1500=_0x2f5488;if(this[_0x3a1500(0x168)]>0x0)this[_0x3a1500(0x168)]--;},ImageManager[_0x2f5488(0xe0)]=ImageManager['svActorHorzCells']||0x9,ImageManager['svActorVertCells']=ImageManager[_0x2f5488(0x15a)]||0x6,Window_Base['prototype']['drawSvActor']=function(_0x4dca2c,_0x19a2ef,_0x2e7294){const _0x2fe37e=_0x2f5488,_0x3e5353=_0x4dca2c[_0x2fe37e(0x1fc)](/\$/i),_0x187dde=ImageManager['loadSvActor'](_0x4dca2c),_0xa461fa=_0x187dde[_0x2fe37e(0xfd)]/(_0x3e5353?0x1:ImageManager[_0x2fe37e(0xe0)]),_0xae46bf=_0x187dde['height']/(_0x3e5353?0x1:ImageManager[_0x2fe37e(0x15a)]),_0x25f72f=0x0,_0x1d1ec3=0x0;this[_0x2fe37e(0xea)]['blt'](_0x187dde,_0x25f72f,_0x1d1ec3,_0xa461fa,_0xae46bf,_0x19a2ef-_0xa461fa/0x2,_0x2e7294-_0xae46bf);},Window_MenuCommand[_0x2f5488(0xd4)]=VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x1f4)][_0x2f5488(0x1d7)],Window_MenuCommand['SUBCATEGORY_LIST']=undefined,VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x199)]=Window_MenuCommand['prototype'][_0x2f5488(0xcf)],Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0xcf)]=function(_0x529a52){const _0x152545=_0x2f5488;this['_subcategory']=$gameTemp[_0x152545(0x18c)]||'',VisuMZ[_0x152545(0x102)][_0x152545(0x199)][_0x152545(0x129)](this,_0x529a52),this[_0x152545(0x248)](_0x529a52);},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x248)]=function(_0x526a52){const _0x411bcd=_0x2f5488,_0x4ba864=new Rectangle(0x0,0x0,_0x526a52['width'],_0x526a52['height']);this[_0x411bcd(0xe7)]=new Window_Base(_0x4ba864),this[_0x411bcd(0xe7)][_0x411bcd(0x254)]=0x0,this['addChild'](this[_0x411bcd(0xe7)]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0xbe)]=function(){const _0x296f98=_0x2f5488;Window_HorzCommand[_0x296f98(0x21a)]['callUpdateHelp']['call'](this);if(this[_0x296f98(0xe7)])this[_0x296f98(0x16a)]();},Window_MenuCommand['prototype'][_0x2f5488(0x16a)]=function(){const _0x2bd297=_0x2f5488,_0x6fb545=this[_0x2bd297(0xe7)];_0x6fb545[_0x2bd297(0xea)][_0x2bd297(0x236)]();const _0x443d0e=this[_0x2bd297(0x1c5)](this[_0x2bd297(0xb7)]());if(_0x443d0e==='icon'){const _0x4c88b2=this['itemLineRect'](this[_0x2bd297(0xb7)]());let _0x23ba27=this[_0x2bd297(0x105)](this['index']());_0x23ba27=_0x23ba27['replace'](/\\I\[(\d+)\]/gi,''),_0x6fb545[_0x2bd297(0x172)](),this['commandNameWindowDrawBackground'](_0x23ba27,_0x4c88b2),this[_0x2bd297(0x203)](_0x23ba27,_0x4c88b2),this['commandNameWindowCenter'](_0x23ba27,_0x4c88b2);}},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0xc9)]=function(_0x42256b,_0x3ce5c3){},Window_MenuCommand['prototype'][_0x2f5488(0x203)]=function(_0x875fcc,_0x3bfc3a){const _0x2d16e3=_0x2f5488,_0x19e63b=this[_0x2d16e3(0xe7)];_0x19e63b[_0x2d16e3(0x12c)](_0x875fcc,0x0,_0x3bfc3a['y'],_0x19e63b['innerWidth'],_0x2d16e3(0xde));},Window_MenuCommand['prototype']['commandNameWindowCenter']=function(_0x3e9e67,_0x48a512){const _0x1bfedd=_0x2f5488,_0x24810f=this[_0x1bfedd(0xe7)],_0x36fb4b=$gameSystem['windowPadding'](),_0x149237=_0x48a512['x']+Math[_0x1bfedd(0x1a2)](_0x48a512[_0x1bfedd(0xfd)]/0x2)+_0x36fb4b;_0x24810f['x']=_0x24810f[_0x1bfedd(0xfd)]/-0x2+_0x149237,_0x24810f['y']=Math[_0x1bfedd(0x1a2)](_0x48a512[_0x1bfedd(0x176)]/0x4);},Window_MenuCommand['prototype'][_0x2f5488(0x1f1)]=function(){const _0x1274e0=_0x2f5488,_0xe9789f=SceneManager[_0x1274e0(0x127)][_0x1274e0(0x235)]();if(_0xe9789f===_0x1274e0(0x177)){if(_0x1274e0(0x260)!==_0x1274e0(0x260)){const _0x149b98=this[_0x1274e0(0x168)];this[_0x1274e0(0x254)]=(this[_0x1274e0(0x254)]*(_0x149b98-0x1)+0xff)/_0x149b98;}else{const _0x1c627d=VisuMZ[_0x1274e0(0x102)][_0x1274e0(0x1f4)][_0x1274e0(0xc7)]['MobileThickness'];return this[_0x1274e0(0x10b)]()*_0x1c627d+0x8;}}else return Window_Command[_0x1274e0(0x21a)]['itemHeight'][_0x1274e0(0x129)](this);},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x222)]=function(){const _0x25f314=_0x2f5488;this[_0x25f314(0x12f)]();},Window_MenuCommand[_0x2f5488(0x21a)]['makeMainMenuCoreCommandList']=function(){const _0x3bbac0=_0x2f5488;let _0xd2b52a=0x0;for(const _0x8f95cc of Window_MenuCommand['_commandList']){let _0x2dd23f=_0x8f95cc[_0x3bbac0(0x1ad)];if(this['isMainMenuCommandVisible'](_0x2dd23f,_0x8f95cc)){let _0x1ccdd4=_0x8f95cc['TextStr'];if(['',_0x3bbac0(0x1dd)][_0x3bbac0(0x1cf)](_0x1ccdd4))_0x1ccdd4=_0x8f95cc[_0x3bbac0(0x1a7)]['call'](this);const _0x308275=_0x8f95cc[_0x3bbac0(0x120)];if(_0x308275>0x0&&this[_0x3bbac0(0x107)]()!==_0x3bbac0(0x126)){if(_0x3bbac0(0x1e9)===_0x3bbac0(0x1e9))_0x1ccdd4='\x5cI[%1]%2'['format'](_0x308275,_0x1ccdd4);else return this[_0x3bbac0(0x10b)]();}const _0x105736=this[_0x3bbac0(0x1bc)](_0x2dd23f,_0x8f95cc),_0x18151b=_0x8f95cc[_0x3bbac0(0x135)][_0x3bbac0(0x129)](this);_0x2dd23f===_0x3bbac0(0xaf)&&(_0x3bbac0(0x19e)===_0x3bbac0(0x19e)?(_0xd2b52a++,_0x2dd23f+=_0xd2b52a):(_0x5efac4[_0x3bbac0(0x102)][_0x3bbac0(0x174)][_0x3bbac0(0x129)](this),this[_0x3bbac0(0x1e5)]())),this[_0x3bbac0(0xf8)](_0x1ccdd4,_0x2dd23f,_0x105736,_0x18151b),this['setHandler'](_0x2dd23f,_0x8f95cc[_0x3bbac0(0x10d)][_0x3bbac0(0x15e)](this,_0x18151b));}this[_0x3bbac0(0x1f7)](_0x2dd23f);}},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x212)]=function(_0x20b44f,_0x1b53ce,_0xc1b2e2){const _0x2bd556=_0x2f5488;if(!_0xc1b2e2){if(_0x2bd556(0x10e)==='rCXFv')_0x2989b5[_0x2bd556(0x1eb)](_0x5114b4),this[_0x2bd556(0x15c)]();else{if(!this[_0x2bd556(0x14d)](_0x20b44f,_0x1b53ce))return![];}}if($gameSystem['getMainMenuSymbolState'](_0x20b44f,_0x2bd556(0x145)))return!![];if($gameSystem['getMainMenuSymbolState'](_0x20b44f,_0x2bd556(0x238)))return![];return _0x1b53ce[_0x2bd556(0x13c)][_0x2bd556(0x129)](this,_0x20b44f,_0x1b53ce);},Window_MenuCommand['prototype'][_0x2f5488(0x1bc)]=function(_0xae5734,_0x215097){const _0x5f50dd=_0x2f5488;if($gameSystem[_0x5f50dd(0xef)](_0xae5734,_0x5f50dd(0x164)))return!![];if($gameSystem[_0x5f50dd(0xef)](_0xae5734,_0x5f50dd(0x175)))return![];return _0x215097['EnableJS'][_0x5f50dd(0x129)](this,_0xae5734,_0x215097);},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x1f7)]=function(_0x468553){const _0x3f1c30=_0x2f5488;switch(_0x468553){case _0x3f1c30(0x201):this['addMainCommands']();break;case'formation':this[_0x3f1c30(0x1af)](),this[_0x3f1c30(0xdb)]();break;case _0x3f1c30(0x25e):this[_0x3f1c30(0x162)]();break;case _0x3f1c30(0x262):this[_0x3f1c30(0x173)]();break;case _0x3f1c30(0x1ab):this[_0x3f1c30(0x184)]();break;}},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x14a)]=function(){},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x1af)]=function(){},Window_MenuCommand[_0x2f5488(0x21a)]['addOriginalCommands']=function(){},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x162)]=function(){},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x173)]=function(){},Window_MenuCommand[_0x2f5488(0x21a)]['addGameEndCommand']=function(){},Window_MenuCommand['prototype']['maxCols']=function(){const _0x1ccca6=_0x2f5488,_0x48ebfc=SceneManager[_0x1ccca6(0x127)][_0x1ccca6(0x235)]();if([_0x1ccca6(0x131),'thinBottom'][_0x1ccca6(0x1cf)](_0x48ebfc))return this[_0x1ccca6(0x20e)]?this[_0x1ccca6(0x24a)]():0x4;else return _0x48ebfc!=='default'?VisuMZ[_0x1ccca6(0x102)][_0x1ccca6(0x1f4)][_0x1ccca6(0xc7)][_0x1ccca6(0x1ea)]:Window_Command['prototype'][_0x1ccca6(0xf5)]['call'](this);},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x186)]=function(){const _0x4be53c=_0x2f5488;return this[_0x4be53c(0x261)]||'';},Window_MenuCommand['prototype'][_0x2f5488(0x14d)]=function(_0x2201c7,_0x1dfdc5){const _0x7f57b6=_0x2f5488,_0x37fd2f=_0x1dfdc5[_0x7f57b6(0x100)]||'';if(!this[_0x7f57b6(0x250)](_0x37fd2f)&&this['currentSubcategory']()===''){if(_0x7f57b6(0xce)===_0x7f57b6(0x1f3)){if(!this[_0x7f57b6(0xe3)]())return;const _0x127fb9=this[_0x7f57b6(0x233)]();this[_0x7f57b6(0x190)]=new _0xa530a4(_0x127fb9),this[_0x7f57b6(0x190)][_0x7f57b6(0x14b)](_0x7b8e44['MainMenuCore']['Settings'][_0x7f57b6(0x259)][_0x7f57b6(0x1bd)]),this[_0x7f57b6(0x150)](this['_dummyWindow']);}else return!![];}return _0x37fd2f===this[_0x7f57b6(0x186)]();},Window_MenuCommand[_0x2f5488(0x21a)]['doesSubcategoryExist']=function(_0x2ede78){const _0x9c6065=_0x2f5488;return this['getSubcategoryList']()[_0x9c6065(0x1cf)](_0x2ede78);},Window_MenuCommand[_0x2f5488(0x21a)]['getSubcategoryList']=function(){const _0x2e9ba9=_0x2f5488;if(Window_MenuCommand['SUBCATEGORY_LIST']!==undefined)return Window_MenuCommand['SUBCATEGORY_LIST'];Window_MenuCommand[_0x2e9ba9(0xff)]=[];for(const _0x50415a of Window_MenuCommand['_commandList']){const _0x54bd67=_0x50415a[_0x2e9ba9(0x1ad)];if(_0x54bd67!=='subcategory')continue;const _0x52c0c9=_0x50415a[_0x2e9ba9(0x135)][_0x2e9ba9(0x129)](this);Window_MenuCommand[_0x2e9ba9(0xff)]['push'](_0x52c0c9);}return Window_MenuCommand[_0x2e9ba9(0xff)];},Window_MenuCommand[_0x2f5488(0x21a)]['isSubcategoryVisible']=function(_0x22ad83){const _0x15814d=_0x2f5488;if(!_0x22ad83)return!![];const _0x94755a=_0x22ad83[_0x15814d(0x135)][_0x15814d(0x129)](this);for(const _0x34da54 of Window_MenuCommand[_0x15814d(0xd4)]){if(_0x15814d(0x224)==='ymSbi'){const _0x395f09=this['itemLineRect'](_0x3081b8),_0x8be3c0=this[_0x15814d(0x105)](_0x25e586),_0x93fd48=this['textSizeEx'](_0x8be3c0)['width'];this['changePaintOpacity'](this[_0x15814d(0xd0)](_0x55dbd6));let _0x46ccd0=this[_0x15814d(0x24d)]();if(_0x46ccd0===_0x15814d(0x16e))this[_0x15814d(0x242)](_0x8be3c0,_0x395f09['x']+_0x395f09[_0x15814d(0xfd)]-_0x93fd48,_0x395f09['y'],_0x93fd48);else{if(_0x46ccd0===_0x15814d(0xde)){const _0x530579=_0x395f09['x']+_0x9ad29d[_0x15814d(0x1a2)]((_0x395f09['width']-_0x93fd48)/0x2);this['drawTextEx'](_0x8be3c0,_0x530579,_0x395f09['y'],_0x93fd48);}else this[_0x15814d(0x242)](_0x8be3c0,_0x395f09['x'],_0x395f09['y'],_0x93fd48);}}else{if(_0x34da54===_0x22ad83)continue;const _0x5d52c0=_0x34da54[_0x15814d(0x100)]||'';if(_0x5d52c0!==_0x94755a)continue;const _0x3752be=_0x34da54[_0x15814d(0x1ad)];if(this[_0x15814d(0x212)](_0x3752be,_0x34da54,!![]))return!![];}}return![];},Window_MenuCommand[_0x2f5488(0x21a)]['setSubcategory']=function(_0x3bd5b5){const _0x44ff5e=_0x2f5488;_0x3bd5b5=_0x3bd5b5;if(this[_0x44ff5e(0x186)]()===_0x3bd5b5)return;this[_0x44ff5e(0x261)]=_0x3bd5b5,$gameTemp[_0x44ff5e(0x18c)]=_0x3bd5b5,this[_0x44ff5e(0x1b8)](),this[_0x44ff5e(0xb2)](0x0),this[_0x44ff5e(0x23c)](0x0),this[_0x44ff5e(0x245)]();},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x25d)]=function(){const _0x3dd796=_0x2f5488,_0xb6d05=this[_0x3dd796(0x186)]();this[_0x3dd796(0x261)]='',$gameTemp[_0x3dd796(0x18c)]=undefined,this[_0x3dd796(0x1b8)](),this[_0x3dd796(0x23c)](0x0);this[_0x3dd796(0x193)]>0x1&&(this[_0x3dd796(0x193)]=0x1,this[_0x3dd796(0x112)]());const _0x5d8669=Math[_0x3dd796(0xfc)](this[_0x3dd796(0x210)](_0xb6d05),0x0);this[_0x3dd796(0x1c0)](_0x5d8669),this['activate']();},Window_MenuCommand[_0x2f5488(0x21a)]['itemTextAlign']=function(){const _0x31b189=_0x2f5488;return VisuMZ[_0x31b189(0x102)][_0x31b189(0x1f4)]['CustomCmdWin']['TextAlign'];},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x18d)]=function(_0x12a777){const _0xff4f70=_0x2f5488,_0x4c594c=this[_0xff4f70(0x1c5)](_0x12a777);if(_0x4c594c===_0xff4f70(0xb0))this[_0xff4f70(0x24b)](_0x12a777);else _0x4c594c==='icon'?'ZtBHX'!==_0xff4f70(0x1f6)?this[_0xff4f70(0x1a4)](_0x12a777):(this['adjustCommandHeightByPlaytime']()&&(_0x5309f1[_0xff4f70(0x176)]-=this['playtimeWindowRect']()[_0xff4f70(0x176)]),this[_0xff4f70(0xc1)]()&&(_0x29a474[_0xff4f70(0x176)]-=this[_0xff4f70(0x233)]()['height'])):Window_Command['prototype'][_0xff4f70(0x18d)][_0xff4f70(0x129)](this,_0x12a777);},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x107)]=function(){const _0x57f2f4=_0x2f5488;return VisuMZ['MainMenuCore']['Settings'][_0x57f2f4(0xc7)]['Style'];},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x1c5)]=function(_0x85fb57){const _0x4e4519=_0x2f5488,_0x336903=this[_0x4e4519(0x107)]();if(_0x336903!=='auto')return _0x336903;else{if('eZJxv'!==_0x4e4519(0x1a6)){_0x411e71[_0x4e4519(0xc3)][_0x4e4519(0x129)](this,_0x32e9af);return;}else{const _0x57a1cb=this[_0x4e4519(0x105)](_0x85fb57);if(_0x57a1cb['match'](/\\I\[(\d+)\]/i)){if(_0x4e4519(0x206)!==_0x4e4519(0x206))return this[_0x4e4519(0x1dc)]()[_0x4e4519(0x1cf)](_0x263ee6);else{const _0x507386=this[_0x4e4519(0x204)](_0x85fb57),_0x590bd9=this[_0x4e4519(0x24e)](_0x57a1cb)[_0x4e4519(0xfd)];if(_0x590bd9<=_0x507386[_0x4e4519(0xfd)])return _0x4e4519(0xb0);else{if(_0x4e4519(0xb3)==='WUqDX')return _0x4e4519(0x159);else _0x1c2f34[_0x4e4519(0x1c8)](_0x472d7f);}}}else return _0x4e4519(0x126);}}},Window_MenuCommand[_0x2f5488(0x21a)][_0x2f5488(0x24b)]=function(_0x52c93f){const _0x27d9ae=_0x2f5488,_0x92c64d=this[_0x27d9ae(0x204)](_0x52c93f),_0x2fc611=this[_0x27d9ae(0x105)](_0x52c93f),_0xf377db=this[_0x27d9ae(0x24e)](_0x2fc611)[_0x27d9ae(0xfd)];this['changePaintOpacity'](this['isCommandEnabled'](_0x52c93f));let _0x1ac68f=this[_0x27d9ae(0x24d)]();if(_0x1ac68f===_0x27d9ae(0x16e))this[_0x27d9ae(0x242)](_0x2fc611,_0x92c64d['x']+_0x92c64d[_0x27d9ae(0xfd)]-_0xf377db,_0x92c64d['y'],_0xf377db);else{if(_0x1ac68f===_0x27d9ae(0xde)){if(_0x27d9ae(0x1fe)!==_0x27d9ae(0x1fe)){const _0x3cded3=_0x382558+_0x219b8b;_0x3cded3<this[_0x27d9ae(0x24a)]()&&(this[_0x27d9ae(0x1ee)](_0x3cded3),this[_0x27d9ae(0x18d)](_0x3cded3));}else{const _0x32c13f=_0x92c64d['x']+Math[_0x27d9ae(0x1a2)]((_0x92c64d[_0x27d9ae(0xfd)]-_0xf377db)/0x2);this['drawTextEx'](_0x2fc611,_0x32c13f,_0x92c64d['y'],_0xf377db);}}else this[_0x27d9ae(0x242)](_0x2fc611,_0x92c64d['x'],_0x92c64d['y'],_0xf377db);}},Window_MenuCommand['prototype'][_0x2f5488(0x1a4)]=function(_0x3a98d6){const _0x51ba6e=_0x2f5488;this[_0x51ba6e(0x105)](_0x3a98d6)['match'](/\\I\[(\d+)\]/i);const _0x3c1c4c=Number(RegExp['$1']),_0x43d0a3=this[_0x51ba6e(0x204)](_0x3a98d6),_0x2d2efb=_0x43d0a3['x']+Math[_0x51ba6e(0x1a2)]((_0x43d0a3[_0x51ba6e(0xfd)]-ImageManager[_0x51ba6e(0x1b3)])/0x2),_0x20283a=_0x43d0a3['y']+(_0x43d0a3[_0x51ba6e(0x176)]-ImageManager[_0x51ba6e(0x1c7)])/0x2;this['drawIcon'](_0x3c1c4c,_0x2d2efb,_0x20283a);},VisuMZ[_0x2f5488(0x102)][_0x2f5488(0x1ec)]=Window_StatusBase[_0x2f5488(0x21a)]['loadFaceImages'],Window_StatusBase[_0x2f5488(0x21a)]['loadFaceImages']=function(){const _0x28fcfe=_0x2f5488;VisuMZ[_0x28fcfe(0x102)][_0x28fcfe(0x1ec)][_0x28fcfe(0x129)](this),this[_0x28fcfe(0x230)]();},Window_StatusBase['prototype'][_0x2f5488(0x230)]=function(){const _0x5e4497=_0x2f5488;for(const _0xcdeb75 of $gameParty['members']()){if(!_0xcdeb75)continue;_0xcdeb75[_0x5e4497(0x252)]()&&ImageManager[_0x5e4497(0x226)](_0xcdeb75['characterName']()),_0xcdeb75[_0x5e4497(0xc2)]()&&ImageManager[_0x5e4497(0x1d2)](_0xcdeb75[_0x5e4497(0xc2)]()),_0xcdeb75[_0x5e4497(0xf9)]()&&ImageManager['loadPicture'](_0xcdeb75[_0x5e4497(0xf9)]());}},Window_StatusBase[_0x2f5488(0x21a)][_0x2f5488(0x1db)]=function(){const _0x310f98=_0x2f5488;return VisuMZ[_0x310f98(0x102)]['Settings']['StatusGraphic'];},Window_StatusBase['prototype'][_0x2f5488(0x195)]=function(_0x3f4384,_0x2a719c,_0x432885,_0xdb3e5a,_0x1ece4e){const _0x5d33fe=_0x2f5488;_0xdb3e5a=_0xdb3e5a||ImageManager[_0x5d33fe(0x171)],_0x1ece4e=_0x1ece4e||ImageManager[_0x5d33fe(0xe8)];const _0x4ae427=ImageManager[_0x5d33fe(0x171)],_0x21dd28=_0x1ece4e-0x2,_0x1068bf=_0x2a719c+Math[_0x5d33fe(0x1a2)]((_0xdb3e5a-_0x4ae427)/0x2);if(this[_0x5d33fe(0x1b1)]===Window_MenuStatus){if(_0x5d33fe(0x20f)!==_0x5d33fe(0xd6))this[_0x5d33fe(0x1da)](_0x3f4384[_0x5d33fe(0x10c)]());else{this[_0x5d33fe(0x105)](_0x45ce51)[_0x5d33fe(0x1fc)](/\\I\[(\d+)\]/i);const _0x51666a=_0x7a05f4(_0x2b04b7['$1']),_0x42dc40=this[_0x5d33fe(0x204)](_0x28b72b),_0x198fcd=_0x42dc40['x']+_0x2474e0[_0x5d33fe(0x1a2)]((_0x42dc40[_0x5d33fe(0xfd)]-_0x2b4863[_0x5d33fe(0x1b3)])/0x2),_0x3c0c62=_0x42dc40['y']+(_0x42dc40[_0x5d33fe(0x176)]-_0x515c97[_0x5d33fe(0x1c7)])/0x2;this['drawIcon'](_0x51666a,_0x198fcd,_0x3c0c62);}}this[_0x5d33fe(0xd1)](_0x3f4384,_0x1068bf,_0x432885,_0x4ae427,_0x21dd28),this[_0x5d33fe(0x1da)](!![]);},Window_StatusBase[_0x2f5488(0x21a)][_0x2f5488(0x257)]=function(_0x3bb7b4,_0x55f344,_0xe4dd0e,_0x4afd00,_0x2fdf43){const _0x1d8520=_0x2f5488;_0x4afd00=_0x4afd00||ImageManager[_0x1d8520(0x171)],_0x2fdf43=_0x2fdf43||ImageManager[_0x1d8520(0xe8)];const _0x526d05=_0x3bb7b4['characterName'](),_0x395c53=_0x3bb7b4[_0x1d8520(0x1d1)](),_0x23db4b=ImageManager[_0x1d8520(0x226)](_0x526d05),_0x523c60=ImageManager['isBigCharacter'](_0x526d05),_0x11bcbd=_0x23db4b[_0x1d8520(0xfd)]/(_0x523c60?0x3:0xc),_0x7ae16e=_0x23db4b[_0x1d8520(0x176)]/(_0x523c60?0x4:0x8),_0x1e300f=_0x4afd00,_0x52d40e=_0x2fdf43-0x2,_0x5c4469=_0x55f344+Math[_0x1d8520(0x1a2)](_0x1e300f/0x2),_0x29ecec=_0xe4dd0e+Math['ceil']((_0x2fdf43+_0x7ae16e)/0x2);this['constructor']===Window_MenuStatus&&this[_0x1d8520(0x1da)](_0x3bb7b4['isBattleMember']());const _0x186cd7=Math['min'](_0x4afd00,_0x11bcbd),_0x43b5af=Math[_0x1d8520(0xe1)](_0x2fdf43,_0x7ae16e),_0x3d1272=Math[_0x1d8520(0x1a2)](_0x55f344+Math[_0x1d8520(0xfc)](_0x4afd00-_0x11bcbd,0x0)/0x2),_0x5bb448=Math[_0x1d8520(0x1a2)](_0xe4dd0e+Math[_0x1d8520(0xfc)](_0x2fdf43-_0x7ae16e,0x0)/0x2),_0x4afbdb=_0x523c60?0x0:_0x395c53,_0x25f76c=(_0x4afbdb%0x4*0x3+0x1)*_0x11bcbd,_0x4da4b1=Math[_0x1d8520(0x1a2)](_0x4afbdb/0x4)*0x4*_0x7ae16e;this[_0x1d8520(0xea)][_0x1d8520(0x1fb)](_0x23db4b,_0x25f76c,_0x4da4b1,_0x186cd7,_0x43b5af,_0x3d1272,_0x5bb448),this[_0x1d8520(0x1da)](!![]);},Window_StatusBase[_0x2f5488(0x21a)][_0x2f5488(0x24f)]=function(_0xacff87,_0x129447,_0x58633a,_0x3d59e7,_0x681f2e){const _0x353731=_0x2f5488;_0x3d59e7=_0x3d59e7||ImageManager[_0x353731(0x171)],_0x681f2e=_0x681f2e||ImageManager[_0x353731(0xe8)];const _0x5470e8=ImageManager[_0x353731(0x1d2)](_0xacff87['battlerName']()),_0x9ca7dc=_0x5470e8['width']/ImageManager[_0x353731(0xe0)],_0x4025fd=_0x5470e8[_0x353731(0x176)]/ImageManager['svActorVertCells'],_0x918fcc=_0x3d59e7,_0x23a866=_0x681f2e-0x2,_0x4f06cf=_0x129447+Math[_0x353731(0x1a2)](_0x918fcc/0x2),_0x26294d=_0x58633a+Math['ceil']((_0x681f2e+_0x4025fd)/0x2);this[_0x353731(0x1b1)]===Window_MenuStatus&&this[_0x353731(0x1da)](_0xacff87[_0x353731(0x10c)]());const _0x4ee7a0=_0xacff87[_0x353731(0x1d4)]&&_0xacff87[_0x353731(0x1d4)](),_0xb9cfc6=0x0,_0x48c9eb=0x0,_0x22a8b2=_0x4ee7a0?_0x5470e8[_0x353731(0xfd)]:_0x9ca7dc,_0x3c0c82=_0x4ee7a0?_0x5470e8[_0x353731(0x176)]:_0x4025fd,_0x7a71e6=Math[_0x353731(0xe1)](0x1,_0x3d59e7/_0x22a8b2,_0x681f2e/_0x3c0c82),_0x13188f=_0x7a71e6*_0x22a8b2,_0x4484b7=_0x7a71e6*_0x3c0c82,_0x44bb76=Math[_0x353731(0x1a2)](_0x129447+Math[_0x353731(0xfc)](_0x3d59e7-_0x13188f,0x0)/0x2),_0x223dd1=Math[_0x353731(0x1a2)](_0x58633a+Math[_0x353731(0xfc)](_0x681f2e-_0x4484b7,0x0)/0x2);this[_0x353731(0xea)][_0x353731(0x1fb)](_0x5470e8,_0xb9cfc6,_0x48c9eb,_0x22a8b2,_0x3c0c82,_0x44bb76,_0x223dd1,_0x13188f,_0x4484b7),this[_0x353731(0x1da)](!![]);},Window_StatusBase[_0x2f5488(0x21a)][_0x2f5488(0x225)]=function(_0x8d13ef,_0x2a1b90,_0x3b9211,_0x19490f,_0x240050){const _0x251342=_0x2f5488,_0x4806e7=ImageManager[_0x251342(0x116)](_0x8d13ef['getMenuImage']());_0x19490f=(_0x19490f||ImageManager[_0x251342(0x171)])-0x2,_0x240050=(_0x240050||ImageManager[_0x251342(0xe8)])-0x2;const _0x28b87d=_0x4806e7[_0x251342(0xfd)],_0x47af63=_0x4806e7[_0x251342(0x176)],_0x1f9527=_0x19490f,_0xedf523=_0x240050-0x2,_0x35d9e4=_0x2a1b90+Math['floor'](_0x1f9527/0x2),_0x1d1422=_0x3b9211+Math['ceil']((_0x240050+_0x47af63)/0x2);this[_0x251342(0x1b1)]===Window_MenuStatus&&this[_0x251342(0x1da)](_0x8d13ef[_0x251342(0x10c)]());const _0xa20d2c=Math['min'](_0x19490f,_0x28b87d),_0x1ef513=Math[_0x251342(0xe1)](_0x240050,_0x47af63),_0x1c5cbb=_0x2a1b90+0x1,_0x30e60d=Math[_0x251342(0xfc)](_0x3b9211+0x1,_0x3b9211+_0xedf523-_0x47af63+0x3);let _0x1f82b8=Math[_0x251342(0x232)]((_0x28b87d-_0xa20d2c)/0x2),_0x1e7bc5=Math[_0x251342(0x232)]((_0x47af63-_0x1ef513)/0x2);_0x1f82b8-=_0x8d13ef[_0x251342(0xd8)](),_0x1e7bc5-=_0x8d13ef['getMenuImageOffsetY']();if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ['CoreEngine'][_0x251342(0x1f4)]['QoL']['PixelateImageRendering']){}}this[_0x251342(0xea)][_0x251342(0x1fb)](_0x4806e7,_0x1f82b8,_0x1e7bc5,_0xa20d2c,_0x1ef513,_0x1c5cbb,_0x30e60d),this[_0x251342(0x1da)](!![]);},Window_Status[_0x2f5488(0x21a)][_0x2f5488(0xd1)]=function(_0x40176f,_0x284eba,_0x42c2bb,_0x1c28c0,_0x40ae96){const _0x4d2217=_0x2f5488;switch(this[_0x4d2217(0x1db)]()){case _0x4d2217(0x1a1):break;case _0x4d2217(0xb9):this['drawItemActorSprite'](_0x40176f,_0x284eba,_0x42c2bb,_0x1c28c0,_0x40ae96);break;case _0x4d2217(0x21b):this[_0x4d2217(0x24f)](_0x40176f,_0x284eba,_0x42c2bb,_0x1c28c0,_0x40ae96);break;default:Window_StatusBase['prototype']['drawActorFace']['call'](this,_0x40176f,_0x284eba,_0x42c2bb,_0x1c28c0,_0x40ae96);break;}},VisuMZ['MainMenuCore'][_0x2f5488(0x114)]=Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x1a0)],Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x1a0)]=function(){const _0x3eb3e4=_0x2f5488;VisuMZ['MainMenuCore']['Settings'][_0x3eb3e4(0x163)][_0x3eb3e4(0x25c)]?VisuMZ[_0x3eb3e4(0x102)][_0x3eb3e4(0x114)][_0x3eb3e4(0x129)](this):this[_0x3eb3e4(0x1c0)](0x0);},VisuMZ['MainMenuCore']['Window_MenuStatus_maxItems']=Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x24a)],Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x24a)]=function(){const _0x4e8658=_0x2f5488;if(this[_0x4e8658(0xd7)]())return $gameParty[_0x4e8658(0x13a)]()['length'];else{if(_0x4e8658(0x200)===_0x4e8658(0x200))return VisuMZ[_0x4e8658(0x102)]['Window_MenuStatus_maxItems'][_0x4e8658(0x129)](this);else{const _0x2a804e=_0x515772['x']+_0x2812d4['floor']((_0x22adba['width']-_0x610542)/0x2);this[_0x4e8658(0x242)](_0x21efa9,_0x2a804e,_0x345a55['y'],_0x2ddb5c);}}},Window_MenuStatus['prototype'][_0x2f5488(0xd7)]=function(){const _0x55a063=_0x2f5488,_0x50b0ed=VisuMZ[_0x55a063(0x102)][_0x55a063(0x1f4)][_0x55a063(0x163)];if(_0x50b0ed[_0x55a063(0x217)]===undefined)_0x50b0ed[_0x55a063(0x217)]=!![];const _0x304cdd=SceneManager['_scene'];if(!_0x50b0ed['ShowReserve']){if(_0x50b0ed[_0x55a063(0x151)])return _0x304cdd[_0x55a063(0x1b1)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x2f5488(0x21a)]['listStyle']=function(){const _0x4f7bfb=_0x2f5488,_0x153448=SceneManager['_scene'][_0x4f7bfb(0x1b1)];return _0x153448===Scene_Menu?VisuMZ[_0x4f7bfb(0x102)][_0x4f7bfb(0x1f4)][_0x4f7bfb(0x1f5)]:VisuMZ[_0x4f7bfb(0x102)][_0x4f7bfb(0x1f4)][_0x4f7bfb(0xed)];},Window_MenuStatus[_0x2f5488(0x21a)]['numVisibleRows']=function(){const _0x5badf9=_0x2f5488,_0x4bb9c9=this['listStyle']();switch(_0x4bb9c9){case _0x5badf9(0x20d):case _0x5badf9(0xca):return 0x1;case _0x5badf9(0xd9):return 0x1;default:return $gameParty[_0x5badf9(0xdc)]();}},Window_MenuStatus['prototype']['maxCols']=function(){const _0x483340=_0x2f5488,_0x1bad70=this[_0x483340(0x253)]();switch(_0x1bad70){case _0x483340(0x20d):case _0x483340(0xca):return $gameParty[_0x483340(0xdc)]();default:return 0x1;}},VisuMZ[_0x2f5488(0x102)]['Window_MenuStatus_itemHeight']=Window_MenuStatus[_0x2f5488(0x21a)]['itemHeight'],Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x1f1)]=function(){const _0x25e42a=_0x2f5488,_0x7c7ff7=this[_0x25e42a(0x253)]();switch(_0x7c7ff7){case _0x25e42a(0x20d):case _0x25e42a(0xca):case _0x25e42a(0xd9):return this[_0x25e42a(0x227)];case _0x25e42a(0xc5):return Window_Selectable[_0x25e42a(0x21a)][_0x25e42a(0x1f1)][_0x25e42a(0x129)](this);case _0x25e42a(0x16d):return this[_0x25e42a(0x10b)]()*0x2+0x8;default:return VisuMZ['MainMenuCore']['Window_MenuStatus_itemHeight'][_0x25e42a(0x129)](this);}},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x18d)]=function(_0x374e6b){const _0x2e2889=_0x2f5488;this[_0x2e2889(0x220)](_0x374e6b),this['drawItemStatus'](_0x374e6b);},VisuMZ[_0x2f5488(0x102)]['Window_MenuStatus_drawItemImage']=Window_MenuStatus[_0x2f5488(0x21a)]['drawItemImage'],Window_MenuStatus['prototype'][_0x2f5488(0x205)]=function(_0x38d9f3,_0x176443,_0x48b1fd,_0x43cc76,_0x2bd8f3){const _0x56a5b9=_0x2f5488;switch(this[_0x56a5b9(0x1db)]()){case _0x56a5b9(0x1a1):break;case _0x56a5b9(0xb9):this[_0x56a5b9(0x257)](_0x38d9f3,_0x176443,_0x48b1fd+0x1,_0x43cc76,_0x2bd8f3-0x2);break;case _0x56a5b9(0x21b):this['drawItemActorSvBattler'](_0x38d9f3,_0x176443,_0x48b1fd+0x1,_0x43cc76,_0x2bd8f3-0x2);break;default:this[_0x56a5b9(0x195)](_0x38d9f3,_0x176443,_0x48b1fd,_0x43cc76,_0x2bd8f3);break;}},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x255)]=function(_0x402cd1){const _0x10d611=_0x2f5488;this[_0x10d611(0x172)]();const _0x50c221=this[_0x10d611(0x11a)](_0x402cd1),_0x44a1cf=this[_0x10d611(0x1bb)](_0x402cd1),_0x172f89=this[_0x10d611(0x253)]();switch(_0x172f89){case _0x10d611(0x20d):this[_0x10d611(0x11d)](_0x50c221,_0x44a1cf);break;case'portrait':this['drawItemStatusPortraitStyle'](_0x50c221,_0x44a1cf);break;case _0x10d611(0xd9):this[_0x10d611(0x182)](_0x50c221,_0x44a1cf);break;case _0x10d611(0xc5):this[_0x10d611(0x1c9)](_0x50c221,_0x44a1cf);break;case'thicker':this['drawItemStatusThickerStyle'](_0x50c221,_0x44a1cf);break;default:this[_0x10d611(0x110)](_0x50c221,_0x44a1cf);break;}},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x11d)]=function(_0x3a63d2,_0x5953fe){const _0x44821e=_0x2f5488;VisuMZ[_0x44821e(0x102)][_0x44821e(0x1f4)][_0x44821e(0xe6)][_0x44821e(0x231)][_0x44821e(0x129)](this,_0x3a63d2,_0x5953fe);},Window_MenuStatus['prototype'][_0x2f5488(0xc8)]=function(_0x56dfa6,_0x1f557e){const _0xff7c77=_0x2f5488;if(_0x56dfa6[_0xff7c77(0xf9)]()!==''){if('OugCj'!==_0xff7c77(0xbc)){const _0x475664=ImageManager[_0xff7c77(0x116)](_0x56dfa6[_0xff7c77(0xf9)]());_0x475664[_0xff7c77(0xf6)](this[_0xff7c77(0x20b)][_0xff7c77(0x15e)](this,_0x56dfa6,_0x1f557e));}else{const _0x97c016=_0x5a2d8a[_0xff7c77(0x116)](_0x29cdae[_0xff7c77(0xf9)]());_0x97c016[_0xff7c77(0xf6)](this[_0xff7c77(0x20b)]['bind'](this,_0x308b72,_0xc487f3));}}else this[_0xff7c77(0x11d)](_0x56dfa6,_0x1f557e);},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x20b)]=function(_0x58adb3,_0x551409){const _0x5808b6=_0x2f5488;VisuMZ[_0x5808b6(0x102)][_0x5808b6(0x1f4)]['ListStyles']['PortraitStyle']['call'](this,_0x58adb3,_0x551409);},Window_MenuStatus[_0x2f5488(0x21a)]['drawItemStatusSoloStyle']=function(_0x38506a,_0x2b80ec){const _0x33343c=_0x2f5488,_0x202549=ImageManager[_0x33343c(0x116)](_0x38506a[_0x33343c(0xf9)]());_0x202549[_0x33343c(0xf6)](this[_0x33343c(0x1be)][_0x33343c(0x15e)](this,_0x38506a,_0x2b80ec));},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x1be)]=function(_0x764160,_0x347717){const _0x193317=_0x2f5488;VisuMZ[_0x193317(0x102)][_0x193317(0x1f4)][_0x193317(0xe6)]['SoloStyle'][_0x193317(0x129)](this,_0x764160,_0x347717);},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x1c9)]=function(_0x2afc8c,_0x53043a){const _0x5bbdf1=_0x2f5488;VisuMZ[_0x5bbdf1(0x102)][_0x5bbdf1(0x1f4)]['ListStyles'][_0x5bbdf1(0x243)][_0x5bbdf1(0x129)](this,_0x2afc8c,_0x53043a);},Window_MenuStatus[_0x2f5488(0x21a)]['drawItemStatusThickerStyle']=function(_0x432671,_0x3e0cdb){const _0x1b8e7b=_0x2f5488;VisuMZ[_0x1b8e7b(0x102)][_0x1b8e7b(0x1f4)][_0x1b8e7b(0xe6)][_0x1b8e7b(0x188)][_0x1b8e7b(0x129)](this,_0x432671,_0x3e0cdb);},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x1e0)]=function(){const _0x3366fb=_0x2f5488,_0x5e629b=this[_0x3366fb(0x253)]();if([_0x3366fb(0xc5),_0x3366fb(0x16d)][_0x3366fb(0x1cf)](_0x5e629b))return![];return Window_StatusBase[_0x3366fb(0x21a)][_0x3366fb(0x1e0)][_0x3366fb(0x129)](this);},Window_MenuStatus[_0x2f5488(0x21a)][_0x2f5488(0x110)]=function(_0x5e8275,_0x4672fe){const _0x355075=_0x2f5488;VisuMZ[_0x355075(0x102)][_0x355075(0x1f4)]['ListStyles'][_0x355075(0x15d)][_0x355075(0x129)](this,_0x5e8275,_0x4672fe);},Window_SkillStatus[_0x2f5488(0x21a)][_0x2f5488(0xd1)]=function(_0x310feb,_0x4fe58e,_0xa51a92,_0x46da0b,_0x36db6d){const _0x4f2397=_0x2f5488;switch(this[_0x4f2397(0x1db)]()){case _0x4f2397(0x1a1):break;case _0x4f2397(0xb9):this[_0x4f2397(0x257)](_0x310feb,_0x4fe58e,_0xa51a92,_0x46da0b,_0x36db6d);break;case _0x4f2397(0x21b):this[_0x4f2397(0x24f)](_0x310feb,_0x4fe58e,_0xa51a92,_0x46da0b,_0x36db6d);break;default:Window_StatusBase[_0x4f2397(0x21a)][_0x4f2397(0xd1)]['call'](this,_0x310feb,_0x4fe58e,_0xa51a92,_0x46da0b,_0x36db6d);break;}},Window_EquipStatus['prototype'][_0x2f5488(0xd1)]=function(_0x5b542c,_0x4a4cd0,_0x419669,_0x5b37cb,_0x3c6a63){const _0x5baa69=_0x2f5488;switch(this[_0x5baa69(0x1db)]()){case _0x5baa69(0x1a1):break;case'sprite':this[_0x5baa69(0x257)](_0x5b542c,_0x4a4cd0,_0x419669,_0x5b37cb,_0x3c6a63);break;case'svbattler':this['drawItemActorSvBattler'](_0x5b542c,_0x4a4cd0,_0x419669,_0x5b37cb,_0x3c6a63);break;default:Window_StatusBase[_0x5baa69(0x21a)]['drawActorFace'][_0x5baa69(0x129)](this,_0x5b542c,_0x4a4cd0,_0x419669,_0x5b37cb,_0x3c6a63);break;}};function Window_ThinGold(){const _0x58b1ce=_0x2f5488;this[_0x58b1ce(0xcf)](...arguments);}Window_ThinGold['prototype']=Object[_0x2f5488(0x10f)](Window_Gold['prototype']),Window_ThinGold[_0x2f5488(0x21a)]['constructor']=Window_ThinGold,Window_ThinGold[_0x2f5488(0x21a)]['itemHeight']=function(){return this['lineHeight']();},Window_ThinGold[_0x2f5488(0x21a)]['colSpacing']=function(){const _0x443a26=_0x2f5488;return Window_Selectable[_0x443a26(0x21a)]['colSpacing'][_0x443a26(0x129)](this);};function Window_Playtime(){const _0x191b55=_0x2f5488;this[_0x191b55(0xcf)](...arguments);}Window_Playtime[_0x2f5488(0x21a)]=Object['create'](Window_Selectable[_0x2f5488(0x21a)]),Window_Playtime[_0x2f5488(0x21a)][_0x2f5488(0x1b1)]=Window_Playtime,Window_Playtime[_0x2f5488(0x21a)]['initialize']=function(_0x71bed5){const _0x57523d=_0x2f5488;this[_0x57523d(0x258)]=$gameSystem[_0x57523d(0x19d)](),this[_0x57523d(0x241)]=0x3c,Window_Selectable[_0x57523d(0x21a)]['initialize'][_0x57523d(0x129)](this,_0x71bed5),this['refresh']();},Window_Playtime['prototype']['itemHeight']=function(){const _0x192470=_0x2f5488;return this[_0x192470(0x10b)]();},Window_Playtime[_0x2f5488(0x21a)][_0x2f5488(0x169)]=function(){const _0x25fcf6=_0x2f5488;Window_Selectable['prototype']['update'][_0x25fcf6(0x129)](this),this[_0x25fcf6(0x12a)]();},Window_Playtime['prototype']['updateTimer']=function(){const _0x5b9018=_0x2f5488;if(this[_0x5b9018(0x241)]-->0x0){if(this['_timer']<=0x0)this[_0x5b9018(0x1b8)]();}},Window_Playtime[_0x2f5488(0x21a)][_0x2f5488(0x1b8)]=function(){const _0x359ce8=_0x2f5488;this[_0x359ce8(0x241)]=0x3c;const _0x35c62f=this[_0x359ce8(0x204)](0x0),_0x42b20b=_0x35c62f['x'],_0x1107db=_0x35c62f['y'],_0x503d4f=_0x35c62f['width'];this[_0x359ce8(0xea)][_0x359ce8(0x236)](),this['drawTimeIcon'](_0x35c62f),this['drawTimeLabel'](_0x35c62f),this[_0x359ce8(0x12d)](_0x35c62f);},Window_Playtime[_0x2f5488(0x21a)][_0x2f5488(0x172)]=function(){const _0x2c843b=_0x2f5488;Window_Selectable[_0x2c843b(0x21a)][_0x2c843b(0x172)][_0x2c843b(0x129)](this),this[_0x2c843b(0xea)][_0x2c843b(0x144)]=VisuMZ['MainMenuCore'][_0x2c843b(0x1f4)][_0x2c843b(0x1a9)][_0x2c843b(0x215)];},Window_Playtime[_0x2f5488(0x21a)]['drawTimeIcon']=function(_0x547aac){const _0x31f4c9=_0x2f5488;if(VisuMZ[_0x31f4c9(0x102)][_0x31f4c9(0x1f4)]['Playtime'][_0x31f4c9(0x120)]>0x0){const _0x37ade1=VisuMZ[_0x31f4c9(0x102)]['Settings'][_0x31f4c9(0x1a9)][_0x31f4c9(0x120)],_0x301bb4=_0x547aac['y']+(this[_0x31f4c9(0x10b)]()-ImageManager[_0x31f4c9(0x1c7)])/0x2;this[_0x31f4c9(0x247)](_0x37ade1,_0x547aac['x'],_0x301bb4);const _0x1c63f3=ImageManager[_0x31f4c9(0x1b3)]+0x4;_0x547aac['x']+=_0x1c63f3,_0x547aac[_0x31f4c9(0xfd)]-=_0x1c63f3;}},Window_Playtime['prototype'][_0x2f5488(0x185)]=function(_0x55b7de){const _0x81b0d2=_0x2f5488;this['resetFontSettings'](),this[_0x81b0d2(0xb6)](ColorManager[_0x81b0d2(0x155)]());const _0x22510f=VisuMZ[_0x81b0d2(0x102)][_0x81b0d2(0x1f4)]['Playtime'][_0x81b0d2(0xee)];this[_0x81b0d2(0x12c)](_0x22510f,_0x55b7de['x'],_0x55b7de['y'],_0x55b7de['width'],_0x81b0d2(0x181)),this[_0x81b0d2(0xe2)]();},Window_Playtime['prototype'][_0x2f5488(0x12d)]=function(_0x372417){const _0x57b9ff=_0x2f5488,_0xfe24d6=$gameSystem[_0x57b9ff(0x19d)]();this[_0x57b9ff(0x12c)](_0xfe24d6,_0x372417['x'],_0x372417['y'],_0x372417[_0x57b9ff(0xfd)],_0x57b9ff(0x16e));};function Window_MenuVariables(){const _0x449dc1=_0x2f5488;this[_0x449dc1(0xcf)](...arguments);}Window_MenuVariables[_0x2f5488(0x21a)]=Object[_0x2f5488(0x10f)](Window_Selectable['prototype']),Window_MenuVariables[_0x2f5488(0x21a)]['constructor']=Window_MenuVariables,Window_MenuVariables['prototype']['initialize']=function(_0x4cd7f4){const _0x31c6a4=_0x2f5488;Window_Selectable['prototype'][_0x31c6a4(0xcf)][_0x31c6a4(0x129)](this,_0x4cd7f4),this[_0x31c6a4(0x1aa)]=VisuMZ[_0x31c6a4(0x102)]['Settings']['Variable'][_0x31c6a4(0x103)],this[_0x31c6a4(0x1b8)]();},Window_MenuVariables[_0x2f5488(0x21a)][_0x2f5488(0x1f1)]=function(){const _0x11a583=_0x2f5488;return this[_0x11a583(0x10b)]();},Window_MenuVariables[_0x2f5488(0x21a)][_0x2f5488(0xf5)]=function(){const _0x2376fc=_0x2f5488,_0x6e26e6=SceneManager[_0x2376fc(0x127)][_0x2376fc(0x235)]();if(_0x6e26e6==='default'){if(_0x2376fc(0x138)!==_0x2376fc(0x138)){_0x42d1f0[_0x2376fc(0x166)](_0x4f828b,_0x5bf308);const _0x2dcbbd=_0x23573f[_0x2376fc(0x140)]||[];for(const _0x5a5b36 of _0x2dcbbd){_0x5646a9['forceHideMainMenuCommand'](_0x5a5b36);}}else return 0x1;}else{if(_0x2376fc(0x244)!=='KyDtn'){const _0x17184e=this['_commandWindow'][_0x2376fc(0x187)](),_0x48ad37=this[_0x2376fc(0x179)]['currentExt']();for(const _0x49b3a5 of _0xce1466[_0x2376fc(0xd4)]){if(_0x49b3a5['Symbol']===_0x17184e){_0x49b3a5[_0x2376fc(0xc3)][_0x2376fc(0x129)](this,_0x48ad37);return;}}}else return VisuMZ[_0x2376fc(0x102)]['Settings'][_0x2376fc(0x259)]['VarList'][_0x2376fc(0x23a)];}},Window_MenuVariables[_0x2f5488(0x21a)][_0x2f5488(0x172)]=function(){const _0x2c4092=_0x2f5488;Window_Selectable['prototype'][_0x2c4092(0x172)][_0x2c4092(0x129)](this),this[_0x2c4092(0xea)][_0x2c4092(0x144)]=VisuMZ[_0x2c4092(0x102)][_0x2c4092(0x1f4)][_0x2c4092(0x259)][_0x2c4092(0x215)],this['changeTextColor'](ColorManager[_0x2c4092(0x155)]());},Window_MenuVariables[_0x2f5488(0x21a)][_0x2f5488(0x24a)]=function(){const _0x5b47b9=_0x2f5488;return this['_data'][_0x5b47b9(0x23a)];},Window_MenuVariables[_0x2f5488(0x21a)][_0x2f5488(0x239)]=function(){const _0x1fc9cb=_0x2f5488,_0x2efe40=this[_0x1fc9cb(0x218)]();for(let _0x5da6f5=0x0;_0x5da6f5<this[_0x1fc9cb(0x19c)]();_0x5da6f5++){if(_0x1fc9cb(0x23f)!==_0x1fc9cb(0x25b)){const _0x5affb0=_0x2efe40+_0x5da6f5;if(_0x5affb0<this['maxItems']()){if(_0x1fc9cb(0x19f)===_0x1fc9cb(0x19f))this[_0x1fc9cb(0x1ee)](_0x5affb0),this[_0x1fc9cb(0x18d)](_0x5affb0);else{const _0x2f6264=this[_0x1fc9cb(0x1c5)](_0x28b29a);if(_0x2f6264===_0x1fc9cb(0xb0))this[_0x1fc9cb(0x24b)](_0x3ba7e1);else _0x2f6264===_0x1fc9cb(0x159)?this['drawItemStyleIcon'](_0x32e9fd):_0x598429[_0x1fc9cb(0x21a)]['drawItem'][_0x1fc9cb(0x129)](this,_0x559992);}}}else this[_0x1fc9cb(0x1da)](_0x5028e9['isBattleMember']());}},Window_MenuVariables[_0x2f5488(0x21a)]['drawItemBackground']=function(_0x35947b){},Window_MenuVariables[_0x2f5488(0x21a)][_0x2f5488(0x18d)]=function(_0x239f83){const _0x30a8c2=_0x2f5488,_0x48b64a=this[_0x30a8c2(0x1aa)][_0x239f83];if(_0x48b64a<=0x0)return;if(!$dataSystem[_0x30a8c2(0x1df)][_0x48b64a])return;const _0xec808c=this['itemLineRect'](_0x239f83);this[_0x30a8c2(0x172)]();let _0x30fae1=0x0,_0x792e3e=$dataSystem[_0x30a8c2(0x1df)][_0x48b64a]['trim']();_0x792e3e['match'](/\\I\[(\d+)\]/i)&&(_0x30fae1=Number(RegExp['$1']),_0x792e3e=_0x792e3e[_0x30a8c2(0x189)](/\\I\[(\d+)\]/i,'')['trim']());if(_0x30fae1>0x0){if(_0x30a8c2(0xda)===_0x30a8c2(0x1c4)){const _0x2fb005=this[_0x30a8c2(0xe7)];_0x2fb005['contents'][_0x30a8c2(0x236)]();const _0x410cbe=this[_0x30a8c2(0x1c5)](this[_0x30a8c2(0xb7)]());if(_0x410cbe===_0x30a8c2(0x159)){const _0x16ff74=this[_0x30a8c2(0x204)](this[_0x30a8c2(0xb7)]());let _0x396f8b=this[_0x30a8c2(0x105)](this[_0x30a8c2(0xb7)]());_0x396f8b=_0x396f8b[_0x30a8c2(0x189)](/\\I\[(\d+)\]/gi,''),_0x2fb005[_0x30a8c2(0x172)](),this[_0x30a8c2(0xc9)](_0x396f8b,_0x16ff74),this[_0x30a8c2(0x203)](_0x396f8b,_0x16ff74),this[_0x30a8c2(0x1d9)](_0x396f8b,_0x16ff74);}}else{const _0x4838d4=_0xec808c['y']+(this[_0x30a8c2(0x10b)]()-ImageManager[_0x30a8c2(0x1c7)])/0x2;this['drawIcon'](_0x30fae1,_0xec808c['x'],_0x4838d4);const _0x22188a=ImageManager[_0x30a8c2(0x1b3)]+0x4;_0xec808c['x']+=_0x22188a,_0xec808c[_0x30a8c2(0xfd)]-=_0x22188a;}}this[_0x30a8c2(0x12c)](_0x792e3e,_0xec808c['x'],_0xec808c['y'],_0xec808c[_0x30a8c2(0xfd)],'left'),this[_0x30a8c2(0xb6)](ColorManager[_0x30a8c2(0x228)]()),this[_0x30a8c2(0x12c)]($gameVariables['value'](_0x48b64a),_0xec808c['x'],_0xec808c['y'],_0xec808c[_0x30a8c2(0xfd)],_0x30a8c2(0x16e));};function _0x9f24(){const _0x2db302=['variableWindowRect','isSoloQuickMode','commandWindowStyle','clear','getMenuImageOffsetY','forceHide','drawAllItems','length','jxyTe','setTopRow','cZkFP','74362yoIFRW','hiTty','AXGrk','_timer','drawTextEx','ThinStyle','KyDtn','activate','bitmap','drawIcon','createCommandNameWindow','97660axUEDu','maxItems','drawItemStyleIconText','dlUDb','itemTextAlign','textSizeEx','drawItemActorSvBattler','doesSubcategoryExist','Scene_MenuBase_createBackground','characterName','listStyle','opacity','drawItemStatus','adjustDefaultCommandWindowRect','drawItemActorSprite','_playtimeText','Variable','662598TRGcxf','HyZDr','StatusSelectLast','removeSubcategory','options','note','jFZZm','_subcategory','save','concat','MenuCommandForceHide','subcategory','iconText','FUNC','select','WUqDX','GUkeq','mainMenuCoreSettings','changeTextColor','index','hBwRu','sprite','ChangeActorMenuImageJS','parse','fqEEW','_targetX','callUpdateHelp','10gVQdJE','SoloQuick','adjustCommandHeightByVariable','battlerName','PersonalHandlerJS','APoJo','thin','AutoGoldY','CustomCmdWin','drawItemStatusPortraitStyle','commandNameWindowDrawBackground','portrait','commandPersonal','ARRAYNUM','ARRAYJSON','dFPff','initialize','isCommandEnabled','drawActorFace','bottom','shift','_commandList','_variableWindow','SHXIp','showOnlyBattleMembers','getMenuImageOffsetX','solo','uafjO','addOriginalCommands','maxBattleMembers','Scene_Menu_onFormationCancel','center','ntbtG','svActorHorzCells','min','resetTextColor','needsDummyWindow','loadBitmap','mainAreaTop','ListStyles','_commandNameWindow','faceHeight','MenuCommandForceEnable','contents','JdxfP','createVariableWindow','InnerMenuListStyle','Time','getMainMenuSymbolState','5414058buRjHe','LfszU','registerCommand','addChild','_bitmapReady','maxCols','addLoadListener','dIcOd','addCommand','getMenuImage','_targetY','applyThinnerGoldWindowRect','max','width','onPersonalOk','SUBCATEGORY_LIST','Subcategory','createCommandWindow','MainMenuCore','VarList','boxHeight','commandName','openness','commandStyle','JOvxf','Step1Start','commandWindowRectBottomStyle','lineHeight','isBattleMember','CallHandlerJS','UFBWJ','create','drawItemStatusDefaultStyle','playtimeWindowRectTopStyle','updateSmoothScroll','liFBA','Window_MenuStatus_selectLast','hJwsB','loadPicture','toUpperCase','statusWindowRect','fittingHeight','actor','CDcfp','nQgxx','drawItemStatusVerticalStyle','thinBottom','JSON','Icon','10GzWAPM','WindowRect','TKTVx','RzECn','AdjustCommandHeight','text','_scene','forceEnableMainMenuCommand','call','updateTimer','onBitmapLoad','drawText','drawPlaytime','mainAreaHeight','makeMainMenuCoreCommandList','3500665CEtMdy','thinTop','lLEHY','goldWindowRect','SceneManager_push','ExtJS','createActorMenuBackgroundImageSprite','Scene_Menu_createStatusWindow','OUhPX','Scene_Menu_create','battleMembers','_goldWindow','ShowJS','ruoPh','parameters','onPersonalCancel','Symbols','OQlrq','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isDisplayActorMenuBackgroundImage','fontSize','forceShow','_menuImage','Step1End','createDummyWindow','playtimeWindowRectBottomStyle','addMainCommands','setBackgroundType','ARRAYSTRUCT','isIncludedInSubcategory','ChangeActorMenuImageRange','Enable','addWindow','HideMainMenuOnly','2146624VlCJEh','updateActor','_actor','systemColor','commandWindowRectTopStyle','NLwLt','DtkbS','icon','svActorVertCells','ARRAYEVAL','popScene','DefaultStyle','bind','open','remove','canCreatePlaytimeWindow','addOptionsCommand','General','forceEnable','28NywgcV','ConvertParams','UBSQS','_duration','update','updateCommandNameWindow','vchkF','exit','thicker','right','\x5cI[%1]%2','statusWindowRectBottomStyle','faceWidth','resetFontSettings','addSaveCommand','Game_System_initialize','forceDisable','height','mobile','FCYhG','_commandWindow','Scene_Menu_statusWindowRect','EVAL','forceHideMainMenuCommand','calcWindowHeight','KOJnw','commandWindowRectThinTopStyle','Scene_MenuBase_updateActor','left','drawItemStatusSoloStyle','ddyuK','addGameEndCommand','drawTimeLabel','currentSubcategory','currentSymbol','ThickerStyle','replace','adjustStatusWindowMobile','DkSAX','_mainMenuSubcategory','drawItem','yKIJZ','close','_dummyWindow','Scene_Menu_commandFormation','canCreateVariableWindow','_scrollDuration','jFRwW','drawItemActorFace','description','_statusWindow','variableWindowRectTopStyle','Window_MenuCommand_initialize','default','ActorBgMenuJS','maxVisibleItems','playtimeText','hZVnr','eoJxT','selectLast','none','floor','zxVyF','drawItemStyleIcon','Game_Actor_setup','eZJxv','TextJS','members','Playtime','_data','gameEnd','_mainMenuCore','Symbol','goldWindowRectTopStyle','addFormationCommand','variableWindowRectBottomStyle','constructor','MenuCommandForceShow','iconWidth','ThinGoldWindow','name','64464uDlyTZ','boxWidth','refresh','nBnRI','commandWindowRectMobileStyle','itemRect','isMainMenuCommandEnabled','BgType','drawItemStatusSoloStyleOnLoad','updatePosition','smoothSelect','iYGMw','setHandler','cQzaK','cPhsb','commandStyleCheck','updateDuration','iconHeight','forceDisableMainMenuCommand','drawItemStatusThinStyle','_playtimeWindow','_actorMenuBgSprite','Scene_Menu_commandPersonal','Step1','MenuCommandForceDisable','includes','STR','characterIndex','loadSvActor','Rows','hasStaticSvBattler','mainCommandWidth','HlNVQ','CommandList','CmNGf','commandNameWindowCenter','changePaintOpacity','graphicType','getSubcategoryList','Untitled','MenuCommandClear','variables','isExpGaugeDrawn','currentExt','QIPQf','setMenuImage','CtVMB','initMainMenuCore','mainAreaBottom','statusWindowRectTopStyle','clearShowMainMenuCommand','ZQUGt','Cols','reserveCommonEvent','Window_StatusBase_loadFaceImages','return\x200','drawItemBackground','commandFormation','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','itemHeight','forceShowMainMenuCommand','xjhUm','Settings','StatusListStyle','DfvXM','addSymbolBridge','Step2','top','dqaVW','blt','match','goldWindowRectBottomStyle','GpUdW','Scene_Menu_commandWindowRect','QNIpt','item','statusWindowRectMobileStyle','commandNameWindowDrawText','itemLineRect','drawActorGraphic','WKxNl','commandWindowRectThinBottomStyle','updateOpacity','cancel','xEHeR','drawItemStatusPortraitStyleOnLoad','RgjTc','vertical','_list','odPYV','findExt','thinGoldWindow','isMainMenuCommandVisible','push','format','FontSize','createGoldWindow','ShowReserve','topIndex','createBackground','prototype','svbattler','initMenuImage','PjGoi','adjustCommandHeightByPlaytime','jPkkJ','drawPendingItemBackground','playtimeWindowRect','makeCommandList','Window_MenuStatus_maxItems','WGLBm','drawItemActorMenuImage','loadCharacter','innerHeight','normalColor','Scene_Menu_goldWindowRect','setActor','commandWindowRect','createStatusWindow','map','onFormationCancel','commandCancel','loadOtherActorImages','VerticalStyle','round'];_0x9f24=function(){return _0x2db302;};return _0x9f24();}