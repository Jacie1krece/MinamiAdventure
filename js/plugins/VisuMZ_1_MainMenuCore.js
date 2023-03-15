//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.20] [MainMenuCore]
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

const _0x302ee7=_0x560e;(function(_0x215740,_0x1290eb){const _0x15877=_0x560e,_0x38e05c=_0x215740();while(!![]){try{const _0x3e77a6=-parseInt(_0x15877(0x1d2))/0x1*(-parseInt(_0x15877(0x131))/0x2)+parseInt(_0x15877(0x1b8))/0x3*(parseInt(_0x15877(0x183))/0x4)+parseInt(_0x15877(0x238))/0x5*(-parseInt(_0x15877(0x143))/0x6)+parseInt(_0x15877(0x27e))/0x7+-parseInt(_0x15877(0x21e))/0x8+-parseInt(_0x15877(0x241))/0x9+parseInt(_0x15877(0x210))/0xa;if(_0x3e77a6===_0x1290eb)break;else _0x38e05c['push'](_0x38e05c['shift']());}catch(_0x451d22){_0x38e05c['push'](_0x38e05c['shift']());}}}(_0x57f9,0x41d98));var label=_0x302ee7(0x1c8),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x302ee7(0x191)](function(_0x44cd4f){const _0x5bc9dd=_0x302ee7;return _0x44cd4f[_0x5bc9dd(0x250)]&&_0x44cd4f['description'][_0x5bc9dd(0x1e9)]('['+label+']');})[0x0];VisuMZ[label][_0x302ee7(0x292)]=VisuMZ[label][_0x302ee7(0x292)]||{},VisuMZ[_0x302ee7(0x21c)]=function(_0x1b8115,_0x94d168){const _0x5d7647=_0x302ee7;for(const _0x294ed2 in _0x94d168){if(_0x294ed2[_0x5d7647(0x208)](/(.*):(.*)/i)){const _0x337f30=String(RegExp['$1']),_0x14b5de=String(RegExp['$2'])[_0x5d7647(0x259)]()['trim']();let _0x37a646,_0x5775af,_0x539a01;switch(_0x14b5de){case'NUM':_0x37a646=_0x94d168[_0x294ed2]!==''?Number(_0x94d168[_0x294ed2]):0x0;break;case _0x5d7647(0x28d):_0x5775af=_0x94d168[_0x294ed2]!==''?JSON[_0x5d7647(0x29d)](_0x94d168[_0x294ed2]):[],_0x37a646=_0x5775af[_0x5d7647(0x149)](_0x25fff9=>Number(_0x25fff9));break;case _0x5d7647(0x185):_0x37a646=_0x94d168[_0x294ed2]!==''?eval(_0x94d168[_0x294ed2]):null;break;case'ARRAYEVAL':_0x5775af=_0x94d168[_0x294ed2]!==''?JSON[_0x5d7647(0x29d)](_0x94d168[_0x294ed2]):[],_0x37a646=_0x5775af[_0x5d7647(0x149)](_0xd5a4fe=>eval(_0xd5a4fe));break;case _0x5d7647(0x20d):_0x37a646=_0x94d168[_0x294ed2]!==''?JSON[_0x5d7647(0x29d)](_0x94d168[_0x294ed2]):'';break;case'ARRAYJSON':_0x5775af=_0x94d168[_0x294ed2]!==''?JSON['parse'](_0x94d168[_0x294ed2]):[],_0x37a646=_0x5775af[_0x5d7647(0x149)](_0x1d2ca4=>JSON[_0x5d7647(0x29d)](_0x1d2ca4));break;case _0x5d7647(0x1d9):_0x37a646=_0x94d168[_0x294ed2]!==''?new Function(JSON[_0x5d7647(0x29d)](_0x94d168[_0x294ed2])):new Function(_0x5d7647(0x1a2));break;case _0x5d7647(0x21b):_0x5775af=_0x94d168[_0x294ed2]!==''?JSON[_0x5d7647(0x29d)](_0x94d168[_0x294ed2]):[],_0x37a646=_0x5775af[_0x5d7647(0x149)](_0x293aca=>new Function(JSON['parse'](_0x293aca)));break;case _0x5d7647(0x137):_0x37a646=_0x94d168[_0x294ed2]!==''?String(_0x94d168[_0x294ed2]):'';break;case _0x5d7647(0x1a5):_0x5775af=_0x94d168[_0x294ed2]!==''?JSON['parse'](_0x94d168[_0x294ed2]):[],_0x37a646=_0x5775af[_0x5d7647(0x149)](_0x3e7595=>String(_0x3e7595));break;case _0x5d7647(0x1ac):_0x539a01=_0x94d168[_0x294ed2]!==''?JSON[_0x5d7647(0x29d)](_0x94d168[_0x294ed2]):{},_0x1b8115[_0x337f30]={},VisuMZ['ConvertParams'](_0x1b8115[_0x337f30],_0x539a01);continue;case _0x5d7647(0x1df):_0x5775af=_0x94d168[_0x294ed2]!==''?JSON['parse'](_0x94d168[_0x294ed2]):[],_0x37a646=_0x5775af['map'](_0x5e10b6=>VisuMZ['ConvertParams']({},JSON[_0x5d7647(0x29d)](_0x5e10b6)));break;default:continue;}_0x1b8115[_0x337f30]=_0x37a646;}}return _0x1b8115;},(_0x1fa31b=>{const _0x3c03af=_0x302ee7,_0x46c309=_0x1fa31b[_0x3c03af(0x13b)];for(const _0x7b4605 of dependencies){if(!Imported[_0x7b4605]){alert(_0x3c03af(0x243)[_0x3c03af(0x27b)](_0x46c309,_0x7b4605)),SceneManager['exit']();break;}}const _0x10f449=_0x1fa31b[_0x3c03af(0x1aa)];if(_0x10f449[_0x3c03af(0x208)](/\[Version[ ](.*?)\]/i)){const _0x501b12=Number(RegExp['$1']);_0x501b12!==VisuMZ[label][_0x3c03af(0x150)]&&(alert(_0x3c03af(0x287)[_0x3c03af(0x27b)](_0x46c309,_0x501b12)),SceneManager[_0x3c03af(0x1b9)]());}if(_0x10f449[_0x3c03af(0x208)](/\[Tier[ ](\d+)\]/i)){const _0x3b8310=Number(RegExp['$1']);_0x3b8310<tier?(alert(_0x3c03af(0x19c)[_0x3c03af(0x27b)](_0x46c309,_0x3b8310,tier)),SceneManager[_0x3c03af(0x1b9)]()):tier=Math[_0x3c03af(0x1b2)](_0x3b8310,tier);}VisuMZ[_0x3c03af(0x21c)](VisuMZ[label][_0x3c03af(0x292)],_0x1fa31b[_0x3c03af(0x1e8)]);})(pluginData),PluginManager[_0x302ee7(0x153)](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x276),_0x1a6750=>{const _0x560bbf=_0x302ee7;VisuMZ[_0x560bbf(0x21c)](_0x1a6750,_0x1a6750);const _0x53de3=_0x1a6750['Step1'],_0x3b5965=_0x1a6750[_0x560bbf(0x28c)];for(let _0x3e9eaf of _0x53de3){_0x3e9eaf=parseInt(_0x3e9eaf)||0x0;if(_0x3e9eaf<=0x0)continue;const _0x5b0f01=$gameActors[_0x560bbf(0x25e)](_0x3e9eaf);if(!_0x5b0f01)continue;_0x5b0f01[_0x560bbf(0x262)](_0x3b5965);}}),PluginManager['registerCommand'](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x2a1),_0x29ceb3=>{const _0x352461=_0x302ee7;VisuMZ[_0x352461(0x21c)](_0x29ceb3,_0x29ceb3);const _0x529401=_0x29ceb3['Step1End']>=_0x29ceb3[_0x352461(0x1cf)]?_0x29ceb3[_0x352461(0x1cf)]:_0x29ceb3[_0x352461(0x219)],_0x386197=_0x29ceb3['Step1End']>=_0x29ceb3[_0x352461(0x1cf)]?_0x29ceb3['Step1End']:_0x29ceb3['Step1Start'],_0xdb46f9=Array(_0x386197-_0x529401+0x1)[_0x352461(0x249)]()[_0x352461(0x149)]((_0x259596,_0x7d4ca9)=>_0x529401+_0x7d4ca9),_0x363ba9=_0x29ceb3[_0x352461(0x28c)];for(let _0x2aeed2 of _0xdb46f9){_0x2aeed2=parseInt(_0x2aeed2)||0x0;if(_0x2aeed2<=0x0)continue;const _0x1dac79=$gameActors['actor'](_0x2aeed2);if(!_0x1dac79)continue;_0x1dac79[_0x352461(0x262)](_0x363ba9);}}),PluginManager[_0x302ee7(0x153)](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x1bf),_0x1fbc73=>{const _0x3111ab=_0x302ee7;VisuMZ[_0x3111ab(0x21c)](_0x1fbc73,_0x1fbc73);const _0x1fdef5=_0x1fbc73[_0x3111ab(0x23f)];let _0x551a01=[];while(_0x1fdef5[_0x3111ab(0x1a7)]>0x0){const _0x5cb8a3=_0x1fdef5[_0x3111ab(0x192)]();Array['isArray'](_0x5cb8a3)?_0x551a01=_0x551a01['concat'](_0x5cb8a3):_0x551a01[_0x3111ab(0x278)](_0x5cb8a3);}const _0x521140=_0x1fbc73['Step2'];for(let _0x27d17f of _0x551a01){_0x27d17f=parseInt(_0x27d17f)||0x0;if(_0x27d17f<=0x0)continue;const _0x526d30=$gameActors[_0x3111ab(0x25e)](_0x27d17f);if(!_0x526d30)continue;_0x526d30['setMenuImage'](_0x521140);}}),PluginManager[_0x302ee7(0x153)](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x18b),_0x3f3870=>{const _0x9d272c=_0x302ee7;VisuMZ['ConvertParams'](_0x3f3870,_0x3f3870);const _0x33bc7a=_0x3f3870[_0x9d272c(0x286)]||[];for(const _0x72ea56 of _0x33bc7a){$gameSystem[_0x9d272c(0x224)](_0x72ea56);}}),PluginManager['registerCommand'](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x207),_0x1775b7=>{const _0x567bf3=_0x302ee7;VisuMZ['ConvertParams'](_0x1775b7,_0x1775b7);const _0x25d6ff=_0x1775b7[_0x567bf3(0x286)]||[];for(const _0x3f1ae3 of _0x25d6ff){$gameSystem[_0x567bf3(0x22e)](_0x3f1ae3);}}),PluginManager[_0x302ee7(0x153)](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x1f3),_0xd68cf6=>{const _0x2734c0=_0x302ee7;VisuMZ[_0x2734c0(0x21c)](_0xd68cf6,_0xd68cf6);const _0x2ad52b=_0xd68cf6[_0x2734c0(0x286)]||[];for(const _0x44d42e of _0x2ad52b){$gameSystem[_0x2734c0(0x1e3)](_0x44d42e);}}),PluginManager[_0x302ee7(0x153)](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x2a3),_0x1a69eb=>{const _0x3e7779=_0x302ee7;VisuMZ[_0x3e7779(0x21c)](_0x1a69eb,_0x1a69eb);const _0x2184e0=_0x1a69eb['Symbols']||[];for(const _0x4300e6 of _0x2184e0){$gameSystem[_0x3e7779(0x2a5)](_0x4300e6);}}),PluginManager[_0x302ee7(0x153)](pluginData[_0x302ee7(0x13b)],_0x302ee7(0x21a),_0x6a63d9=>{const _0x51e5ec=_0x302ee7;VisuMZ['ConvertParams'](_0x6a63d9,_0x6a63d9);const _0x13e9b0=_0x6a63d9[_0x51e5ec(0x286)]||[];for(const _0x2558d3 of _0x13e9b0){$gameSystem['forceShowMainMenuCommand'](_0x2558d3);}}),VisuMZ['MainMenuCore'][_0x302ee7(0x1ff)]=Game_System[_0x302ee7(0x1bb)][_0x302ee7(0x217)],Game_System[_0x302ee7(0x1bb)]['initialize']=function(){const _0x3ba0f7=_0x302ee7;VisuMZ[_0x3ba0f7(0x1c8)]['Game_System_initialize'][_0x3ba0f7(0x17e)](this),this[_0x3ba0f7(0x23b)]();},Game_System[_0x302ee7(0x1bb)]['initMainMenuCore']=function(){const _0x5bc871=_0x302ee7;this['_mainMenuCore']=this[_0x5bc871(0x1c0)]||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x302ee7(0x1bb)][_0x302ee7(0x231)]=function(){const _0x51069a=_0x302ee7;if(this[_0x51069a(0x1c0)]===undefined)this[_0x51069a(0x23b)]();const _0x1d1fda=['forceShow',_0x51069a(0x1f2),_0x51069a(0x245),_0x51069a(0x230)];for(const _0x1b2270 of _0x1d1fda){this['_mainMenuCore'][_0x1b2270]=this[_0x51069a(0x1c0)][_0x1b2270]||[];}return this['_mainMenuCore'];},Game_System[_0x302ee7(0x1bb)]['getMainMenuSymbolState']=function(_0x3d1771,_0x5cb803){const _0x4307bb=_0x302ee7,_0x3cbac8=this[_0x4307bb(0x231)]();if(!_0x3cbac8[_0x5cb803])return![];return _0x3cbac8[_0x5cb803][_0x4307bb(0x1e9)](_0x3d1771);},Game_System[_0x302ee7(0x1bb)]['clearShowMainMenuCommand']=function(_0x3366fc){const _0x36bb94=_0x302ee7,_0x4c9686=this['mainMenuCoreSettings'](),_0x598312=[_0x36bb94(0x170),_0x36bb94(0x1f2),_0x36bb94(0x245),_0x36bb94(0x230)];for(const _0x1620c2 of _0x598312){_0x4c9686[_0x1620c2][_0x36bb94(0x172)](_0x3366fc);}},Game_System[_0x302ee7(0x1bb)][_0x302ee7(0x14c)]=function(_0x1ab866){const _0x1362ce=_0x302ee7,_0x3a26d0=this[_0x1362ce(0x231)]();!_0x3a26d0[_0x1362ce(0x170)][_0x1362ce(0x1e9)](_0x1ab866)&&_0x3a26d0['forceShow']['push'](_0x1ab866),_0x3a26d0['forceHide'][_0x1362ce(0x172)](_0x1ab866);},Game_System[_0x302ee7(0x1bb)][_0x302ee7(0x2a5)]=function(_0x44c3fc){const _0xee8312=_0x302ee7,_0x347920=this[_0xee8312(0x231)]();!_0x347920['forceHide']['includes'](_0x44c3fc)&&_0x347920[_0xee8312(0x1f2)]['push'](_0x44c3fc),_0x347920[_0xee8312(0x170)][_0xee8312(0x172)](_0x44c3fc);},Game_System['prototype'][_0x302ee7(0x22e)]=function(_0x41ef3f){const _0xbb9e6f=_0x302ee7,_0x449ff6=this[_0xbb9e6f(0x231)]();!_0x449ff6[_0xbb9e6f(0x245)][_0xbb9e6f(0x1e9)](_0x41ef3f)&&_0x449ff6[_0xbb9e6f(0x245)][_0xbb9e6f(0x278)](_0x41ef3f),_0x449ff6[_0xbb9e6f(0x230)][_0xbb9e6f(0x172)](_0x41ef3f);},Game_System['prototype']['forceDisableMainMenuCommand']=function(_0x26e0f8){const _0xb1953b=_0x302ee7,_0x2287e2=this[_0xb1953b(0x231)]();!_0x2287e2['forceDisable']['includes'](_0x26e0f8)&&_0x2287e2[_0xb1953b(0x230)]['push'](_0x26e0f8),_0x2287e2[_0xb1953b(0x245)][_0xb1953b(0x172)](_0x26e0f8);},VisuMZ['MainMenuCore']['Game_Actor_setup']=Game_Actor[_0x302ee7(0x1bb)]['setup'],Game_Actor[_0x302ee7(0x1bb)][_0x302ee7(0x1e4)]=function(_0x4f7847){const _0x3e2658=_0x302ee7;VisuMZ[_0x3e2658(0x1c8)][_0x3e2658(0x1bc)][_0x3e2658(0x17e)](this,_0x4f7847),this[_0x3e2658(0x1b6)]();},Game_Actor['prototype'][_0x302ee7(0x1b6)]=function(){const _0x27a73a=_0x302ee7;this['_menuImage']='',this['actor']()&&this['actor']()[_0x27a73a(0x18d)][_0x27a73a(0x208)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x27a73a(0x25d)]=String(RegExp['$1']));},Game_Actor['prototype'][_0x302ee7(0x189)]=function(){const _0x36ac60=_0x302ee7;if(this[_0x36ac60(0x25d)]===undefined)this['initMenuImage']();return this[_0x36ac60(0x25d)];},Game_Actor['prototype'][_0x302ee7(0x262)]=function(_0x1548fd){const _0x358b42=_0x302ee7;if(this[_0x358b42(0x25d)]===undefined)this[_0x358b42(0x1b6)]();this['_menuImage']=_0x1548fd;},Game_Actor[_0x302ee7(0x1bb)]['getMenuImageOffsetX']=function(){const _0x1b3610=_0x302ee7;if(this[_0x1b3610(0x25e)]()[_0x1b3610(0x18d)][_0x1b3610(0x208)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x1b3610(0x25e)]()['note'][_0x1b3610(0x208)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor['prototype'][_0x302ee7(0x180)]=function(){const _0x4ff4ff=_0x302ee7;if(this[_0x4ff4ff(0x25e)]()[_0x4ff4ff(0x18d)][_0x4ff4ff(0x208)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x4ff4ff(0x25e)]()[_0x4ff4ff(0x18d)][_0x4ff4ff(0x208)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x302ee7(0x1bb)]['isDisplayActorMenuBackgroundImage']=function(){const _0x274eaa=_0x302ee7;return VisuMZ[_0x274eaa(0x1c8)]['Settings'][_0x274eaa(0x1ab)][_0x274eaa(0x296)]['includes'](this[_0x274eaa(0x190)][_0x274eaa(0x13b)]);},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x147)]=Scene_MenuBase[_0x302ee7(0x1bb)]['createBackground'],Scene_MenuBase[_0x302ee7(0x1bb)]['createBackground']=function(){const _0x2c44fc=_0x302ee7;VisuMZ[_0x2c44fc(0x1c8)][_0x2c44fc(0x147)]['call'](this),this['createActorMenuBackgroundImageSprite']();},Scene_MenuBase['prototype'][_0x302ee7(0x214)]=function(){const _0x1b3670=_0x302ee7;this['_actorMenuBgSprite']=new Sprite_MenuBackgroundActor(),this[_0x1b3670(0x1a1)](this[_0x1b3670(0x1a8)]);},VisuMZ[_0x302ee7(0x1c8)]['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x302ee7(0x1bb)]['updateActor'],Scene_MenuBase['prototype'][_0x302ee7(0x1af)]=function(){const _0x788a13=_0x302ee7;VisuMZ[_0x788a13(0x1c8)]['Scene_MenuBase_updateActor']['call'](this),this[_0x788a13(0x261)]()&&this[_0x788a13(0x1a8)]&&this['_actorMenuBgSprite'][_0x788a13(0x188)](this['_actor']);},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x1ea)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x285)],Scene_Menu[_0x302ee7(0x1bb)]['create']=function(){const _0x17a7b5=_0x302ee7;VisuMZ[_0x17a7b5(0x1c8)][_0x17a7b5(0x1ea)][_0x17a7b5(0x17e)](this),this[_0x17a7b5(0x159)](),this['createVariableWindow'](),this['createDummyWindow']();},Scene_Menu['prototype'][_0x302ee7(0x218)]=function(){const _0x3d3beb=_0x302ee7,_0x3971ff=this[_0x3d3beb(0x133)](),_0x2fcef6=new Window_MenuCommand(_0x3971ff);_0x2fcef6['setHandler']('cancel',this['commandCancel']['bind'](this)),this[_0x3d3beb(0x132)](_0x2fcef6),this[_0x3d3beb(0x256)]=_0x2fcef6;},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x1a3)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x133)],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x133)]=function(){const _0x2a9e8f=_0x302ee7,_0x34801c=this[_0x2a9e8f(0x227)]();if(_0x34801c===_0x2a9e8f(0x161))return this[_0x2a9e8f(0x279)]();else{if(_0x34801c===_0x2a9e8f(0x173))return this[_0x2a9e8f(0x1c4)]();else{if(_0x34801c===_0x2a9e8f(0x25b))return this[_0x2a9e8f(0x175)]();else{if(_0x34801c==='thinBottom')return this['commandWindowRectThinBottomStyle']();else{if(_0x34801c===_0x2a9e8f(0x216))return this[_0x2a9e8f(0x29e)]();else{const _0x5e13ea=VisuMZ[_0x2a9e8f(0x1c8)][_0x2a9e8f(0x1a3)][_0x2a9e8f(0x17e)](this);return this[_0x2a9e8f(0x17b)](_0x5e13ea),_0x5e13ea;}}}}}},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x17b)]=function(_0x55ba8b){const _0x14e93b=_0x302ee7;this[_0x14e93b(0x181)]()&&(_0x55ba8b[_0x14e93b(0x25f)]-=this[_0x14e93b(0x1b4)]()['height']),this[_0x14e93b(0x228)]()&&(_0x55ba8b[_0x14e93b(0x25f)]-=this[_0x14e93b(0x1a4)]()[_0x14e93b(0x25f)]);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x279)]=function(){const _0x39dec5=_0x302ee7,_0x3debf3=VisuMZ[_0x39dec5(0x1c8)]['Settings'][_0x39dec5(0x14d)][_0x39dec5(0x18c)],_0x45154b=Graphics[_0x39dec5(0x26f)],_0x17a104=this[_0x39dec5(0x2a6)](_0x3debf3,!![]),_0x23c516=0x0,_0x4993c1=this[_0x39dec5(0x187)]();return new Rectangle(_0x23c516,_0x4993c1,_0x45154b,_0x17a104);},Scene_Menu['prototype'][_0x302ee7(0x1c4)]=function(){const _0x4d402e=_0x302ee7,_0x690758=VisuMZ[_0x4d402e(0x1c8)]['Settings'][_0x4d402e(0x14d)][_0x4d402e(0x18c)],_0x11a4b4=Graphics[_0x4d402e(0x26f)],_0x279faa=this[_0x4d402e(0x2a6)](0x1,!![]),_0x49210e=0x0,_0x2da2b9=this[_0x4d402e(0x187)]();return new Rectangle(_0x49210e,_0x2da2b9,_0x11a4b4,_0x279faa);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x175)]=function(){const _0x1bc18e=_0x302ee7,_0x511f87=VisuMZ[_0x1bc18e(0x1c8)][_0x1bc18e(0x292)][_0x1bc18e(0x14d)][_0x1bc18e(0x18c)],_0x3cbcd5=Graphics[_0x1bc18e(0x26f)],_0x28f2d6=this[_0x1bc18e(0x2a6)](_0x511f87,!![]),_0x2b54fe=0x0,_0x2084a=this['mainAreaBottom']()-_0x28f2d6;return new Rectangle(_0x2b54fe,_0x2084a,_0x3cbcd5,_0x28f2d6);},Scene_Menu['prototype'][_0x302ee7(0x27a)]=function(){const _0x5f2097=_0x302ee7,_0x1b94b3=VisuMZ[_0x5f2097(0x1c8)][_0x5f2097(0x292)][_0x5f2097(0x14d)][_0x5f2097(0x18c)],_0x5aa147=Graphics[_0x5f2097(0x26f)],_0x471230=this[_0x5f2097(0x2a6)](0x1,!![]),_0x33f5b9=0x0,_0x3fbb8b=this['mainAreaBottom']()-_0x471230;return new Rectangle(_0x33f5b9,_0x3fbb8b,_0x5aa147,_0x471230);},Scene_Menu[_0x302ee7(0x1bb)]['commandWindowRectMobileStyle']=function(){const _0x44bced=_0x302ee7,_0x26e897=VisuMZ[_0x44bced(0x1c8)][_0x44bced(0x292)][_0x44bced(0x14d)][_0x44bced(0x18c)],_0x38cae6=Graphics[_0x44bced(0x26f)],_0x4c9366=Window_MenuCommand[_0x44bced(0x1bb)]['fittingHeight'](_0x26e897),_0x27c396=0x0,_0xdcb7f1=Math[_0x44bced(0x201)]((Graphics[_0x44bced(0x12c)]-_0x4c9366)/0x2);return new Rectangle(_0x27c396,_0xdcb7f1,_0x38cae6,_0x4c9366);},Scene_Menu['prototype'][_0x302ee7(0x227)]=function(){const _0x5294f3=_0x302ee7;return VisuMZ['MainMenuCore']['Settings'][_0x5294f3(0x1b1)];},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x151)]=function(){const _0x3b07c1=_0x302ee7;if(this[_0x3b07c1(0x227)]()!=='default')return!![];return VisuMZ[_0x3b07c1(0x1c8)][_0x3b07c1(0x292)][_0x3b07c1(0x1ab)][_0x3b07c1(0x26e)];},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x251)]=function(){const _0x478d84=_0x302ee7,_0x2531c3=this[_0x478d84(0x212)]();this[_0x478d84(0x1d8)]=this[_0x478d84(0x151)]()?new Window_ThinGold(_0x2531c3):new Window_Gold(_0x2531c3),this[_0x478d84(0x132)](this['_goldWindow']);},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x220)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x212)],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x212)]=function(){const _0x53cb3f=_0x302ee7,_0x183ff8=this[_0x53cb3f(0x227)]();if([_0x53cb3f(0x161),_0x53cb3f(0x173),'mobile'][_0x53cb3f(0x1e9)](_0x183ff8))return this[_0x53cb3f(0x225)]();else{if(['bottom','thinBottom'][_0x53cb3f(0x1e9)](_0x183ff8))return this['goldWindowRectBottomStyle']();else{const _0x3b36d5=VisuMZ[_0x53cb3f(0x1c8)][_0x53cb3f(0x220)]['call'](this);return this['applyThinnerGoldWindowRect'](_0x3b36d5),_0x3b36d5;}}},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x136)]=function(_0x20c5fa){const _0x5a37a0=_0x302ee7;if(this['thinGoldWindow']()){if(VisuMZ[_0x5a37a0(0x1c8)][_0x5a37a0(0x292)][_0x5a37a0(0x1ab)]['AutoGoldY']){const _0x198a67=_0x20c5fa['height']-this['calcWindowHeight'](0x1,![]);_0x20c5fa['y']+=_0x198a67;}VisuMZ['MainMenuCore'][_0x5a37a0(0x292)][_0x5a37a0(0x1ab)][_0x5a37a0(0x14a)]&&(_0x20c5fa['height']=this[_0x5a37a0(0x2a6)](0x1,![]));}},Scene_Menu['prototype'][_0x302ee7(0x225)]=function(){const _0x354c5e=_0x302ee7,_0x3335a7=this['mainCommandWidth'](),_0x1d2508=this[_0x354c5e(0x2a6)](0x1,![]),_0x536f42=Graphics['boxWidth']-_0x3335a7,_0x16ffa3=this[_0x354c5e(0x186)]()-_0x1d2508;return new Rectangle(_0x536f42,_0x16ffa3,_0x3335a7,_0x1d2508);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1d0)]=function(){const _0x3d2858=_0x302ee7,_0x478931=this[_0x3d2858(0x24b)](),_0x879d60=this[_0x3d2858(0x2a6)](0x1,![]),_0x44e49d=Graphics['boxWidth']-_0x478931,_0x540e67=this['mainAreaTop']();return new Rectangle(_0x44e49d,_0x540e67,_0x478931,_0x879d60);},VisuMZ['MainMenuCore'][_0x302ee7(0x1ec)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x253)],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x253)]=function(){const _0x4c5082=_0x302ee7;VisuMZ[_0x4c5082(0x1c8)][_0x4c5082(0x1ec)][_0x4c5082(0x17e)](this),this[_0x4c5082(0x273)]();},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x273)]=function(){const _0x6d9e8e=_0x302ee7;this[_0x6d9e8e(0x227)]()===_0x6d9e8e(0x216)&&(this[_0x6d9e8e(0x12f)][_0x6d9e8e(0x291)]=0x0);},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x266)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1cd)],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1cd)]=function(){const _0x3a173e=_0x302ee7,_0x3842a6=this[_0x3a173e(0x227)]();if(['top',_0x3a173e(0x173)]['includes'](_0x3842a6))return this[_0x3a173e(0x16b)]();else{if([_0x3a173e(0x25b),'thinBottom'][_0x3a173e(0x1e9)](_0x3842a6))return this[_0x3a173e(0x196)]();else return _0x3842a6===_0x3a173e(0x216)?this['statusWindowRectMobileStyle']():VisuMZ[_0x3a173e(0x1c8)][_0x3a173e(0x266)][_0x3a173e(0x17e)](this);}},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x16b)]=function(){const _0x2815b9=_0x302ee7,_0x4f0982=Graphics[_0x2815b9(0x26f)],_0x37a710=this['mainAreaHeight']()-this[_0x2815b9(0x256)][_0x2815b9(0x25f)]-this[_0x2815b9(0x1d8)][_0x2815b9(0x25f)],_0x2e5bad=0x0,_0x3ba830=this[_0x2815b9(0x256)]['y']+this[_0x2815b9(0x256)]['height'];return new Rectangle(_0x2e5bad,_0x3ba830,_0x4f0982,_0x37a710);},Scene_Menu[_0x302ee7(0x1bb)]['statusWindowRectBottomStyle']=function(){const _0x19aaa3=_0x302ee7,_0xfc660d=Graphics['boxWidth'],_0x29e02e=this[_0x19aaa3(0x1dd)]()-this[_0x19aaa3(0x256)][_0x19aaa3(0x25f)]-this[_0x19aaa3(0x1d8)][_0x19aaa3(0x25f)],_0x157054=0x0,_0x1a93ed=this[_0x19aaa3(0x1d8)]['y']+this[_0x19aaa3(0x1d8)][_0x19aaa3(0x25f)];return new Rectangle(_0x157054,_0x1a93ed,_0xfc660d,_0x29e02e);},Scene_Menu[_0x302ee7(0x1bb)]['statusWindowRectMobileStyle']=function(){const _0x1e9ca7=_0x302ee7,_0x44c121=Graphics[_0x1e9ca7(0x26f)],_0x28b16f=this['mainAreaHeight']()-this['_goldWindow']['height'],_0x286bfe=0x0,_0x4a4018=this[_0x1e9ca7(0x186)]()-this['_goldWindow'][_0x1e9ca7(0x25f)]-_0x28b16f;return new Rectangle(_0x286bfe,_0x4a4018,_0x44c121,_0x28b16f);},Scene_Menu[_0x302ee7(0x1bb)]['createPlaytimeWindow']=function(){const _0x1ca01e=_0x302ee7;if(!this[_0x1ca01e(0x16e)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x491412=this[_0x1ca01e(0x1b4)]();this[_0x1ca01e(0x1f0)]=new Window_Playtime(_0x491412),this[_0x1ca01e(0x1f0)]['setBackgroundType'](VisuMZ[_0x1ca01e(0x1c8)][_0x1ca01e(0x292)]['Playtime']['BgType']),this[_0x1ca01e(0x132)](this[_0x1ca01e(0x1f0)]);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x16e)]=function(){const _0x13dd3c=_0x302ee7;return VisuMZ[_0x13dd3c(0x1c8)][_0x13dd3c(0x292)][_0x13dd3c(0x28a)][_0x13dd3c(0x134)];},Scene_Menu['prototype'][_0x302ee7(0x181)]=function(){const _0x49f941=_0x302ee7;return this['canCreatePlaytimeWindow']()&&(VisuMZ[_0x49f941(0x1c8)][_0x49f941(0x292)][_0x49f941(0x28a)][_0x49f941(0x248)]??!![]);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1b4)]=function(){const _0x527cb6=_0x302ee7,_0x3d90ff=this[_0x527cb6(0x227)]();if([_0x527cb6(0x161),_0x527cb6(0x173),'mobile']['includes'](_0x3d90ff))return this['playtimeWindowRectTopStyle']();else return[_0x527cb6(0x25b),'thinBottom'][_0x527cb6(0x1e9)](_0x3d90ff)?this['playtimeWindowRectBottomStyle']():VisuMZ[_0x527cb6(0x1c8)][_0x527cb6(0x292)]['Playtime'][_0x527cb6(0x226)][_0x527cb6(0x17e)](this);},Scene_Menu['prototype'][_0x302ee7(0x1cb)]=function(){const _0x480efb=_0x302ee7,_0x3ec18a=this['mainCommandWidth'](),_0x4a8387=this[_0x480efb(0x2a6)](0x1,![]),_0x44b8d7=0x0,_0x18b722=this[_0x480efb(0x186)]()-_0x4a8387;return new Rectangle(_0x44b8d7,_0x18b722,_0x3ec18a,_0x4a8387);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x202)]=function(){const _0x519e80=_0x302ee7,_0x15c071=this[_0x519e80(0x24b)](),_0x553cb9=this[_0x519e80(0x2a6)](0x1,![]),_0x4f05a2=0x0,_0xd66ac2=this[_0x519e80(0x187)]();return new Rectangle(_0x4f05a2,_0xd66ac2,_0x15c071,_0x553cb9);},Scene_Menu['prototype'][_0x302ee7(0x29c)]=function(){const _0x12d846=_0x302ee7;if(!this['canCreateVariableWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x51615d=this[_0x12d846(0x1a4)]();this[_0x12d846(0x182)]=new Window_MenuVariables(_0x51615d),this[_0x12d846(0x182)]['setBackgroundType'](VisuMZ['MainMenuCore'][_0x12d846(0x292)][_0x12d846(0x13d)][_0x12d846(0x157)]),this['addWindow'](this[_0x12d846(0x182)]);},Scene_Menu['prototype'][_0x302ee7(0x22c)]=function(){const _0x597538=_0x302ee7;return VisuMZ[_0x597538(0x1c8)][_0x597538(0x292)]['Variable']['Enable'];},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x228)]=function(){const _0xb69814=_0x302ee7;return this[_0xb69814(0x22c)]()&&(VisuMZ[_0xb69814(0x1c8)][_0xb69814(0x292)][_0xb69814(0x13d)][_0xb69814(0x248)]??!![]);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1a4)]=function(){const _0x23ef55=_0x302ee7,_0x1894ab=this['commandWindowStyle']();if([_0x23ef55(0x161),'thinTop',_0x23ef55(0x216)][_0x23ef55(0x1e9)](_0x1894ab))return this[_0x23ef55(0x195)]();else return[_0x23ef55(0x25b),_0x23ef55(0x20b)][_0x23ef55(0x1e9)](_0x1894ab)?this[_0x23ef55(0x277)]():VisuMZ[_0x23ef55(0x1c8)][_0x23ef55(0x292)][_0x23ef55(0x13d)]['WindowRect'][_0x23ef55(0x17e)](this);},Scene_Menu[_0x302ee7(0x1bb)]['variableWindowRectTopStyle']=function(){const _0x5cc1d7=_0x302ee7,_0xd4b066=Graphics[_0x5cc1d7(0x26f)]-this['_goldWindow'][_0x5cc1d7(0x282)]-(this[_0x5cc1d7(0x1f0)]?this[_0x5cc1d7(0x1f0)]['width']:0x0),_0x2d7806=this[_0x5cc1d7(0x2a6)](0x1,![]),_0x1153f9=this[_0x5cc1d7(0x1d8)]['x']-_0xd4b066,_0x12dc89=this[_0x5cc1d7(0x186)]()-_0x2d7806;return new Rectangle(_0x1153f9,_0x12dc89,_0xd4b066,_0x2d7806);},Scene_Menu['prototype']['variableWindowRectBottomStyle']=function(){const _0x4ac6c0=_0x302ee7,_0x6d9c30=Graphics['boxWidth']-this[_0x4ac6c0(0x1d8)][_0x4ac6c0(0x282)]-(this[_0x4ac6c0(0x1f0)]?this[_0x4ac6c0(0x1f0)]['width']:0x0),_0x2f531b=this[_0x4ac6c0(0x2a6)](0x1,![]),_0x3470df=this['_goldWindow']['x']-_0x6d9c30,_0x8039b=this[_0x4ac6c0(0x187)]();return new Rectangle(_0x3470df,_0x8039b,_0x6d9c30,_0x2f531b);},Scene_Menu['prototype'][_0x302ee7(0x15d)]=function(){const _0x4d2861=_0x302ee7;if(!this[_0x4d2861(0x20e)]())return;const _0x461cec=this[_0x4d2861(0x1a4)]();this['_dummyWindow']=new Window_Base(_0x461cec),this[_0x4d2861(0x294)][_0x4d2861(0x244)](VisuMZ[_0x4d2861(0x1c8)]['Settings'][_0x4d2861(0x13d)][_0x4d2861(0x157)]),this['addWindow'](this[_0x4d2861(0x294)]);},Scene_Menu['prototype'][_0x302ee7(0x20e)]=function(){const _0x501215=_0x302ee7;if([_0x501215(0x135),_0x501215(0x216)][_0x501215(0x1e9)](this[_0x501215(0x227)]()))return![];if(this['_variableWindow'])return![];return!![];},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x272)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1c5)],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1c5)]=function(){const _0x2464ca=_0x302ee7;if(this[_0x2464ca(0x1de)]()&&this['_statusWindow'])$gameParty[_0x2464ca(0x165)]($gameParty[_0x2464ca(0x252)]()[0x0]),this[_0x2464ca(0x233)]();else{if(this[_0x2464ca(0x227)]()==='mobile')this[_0x2464ca(0x12f)][_0x2464ca(0x236)]();VisuMZ[_0x2464ca(0x1c8)]['Scene_Menu_commandPersonal']['call'](this);}},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1de)]=function(){const _0x21b85f=_0x302ee7;return VisuMZ[_0x21b85f(0x1c8)][_0x21b85f(0x292)]['General'][_0x21b85f(0x257)]&&$gameParty[_0x21b85f(0x252)]()[_0x21b85f(0x1a7)]<=0x1;},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x233)]=function(){const _0x1857ad=_0x302ee7,_0x387e95=this[_0x1857ad(0x256)][_0x1857ad(0x14e)](),_0x3f8168=this[_0x1857ad(0x256)][_0x1857ad(0x15e)]();for(const _0x1fdfdc of Window_MenuCommand['_commandList']){if(_0x1fdfdc['Symbol']===_0x387e95){_0x1fdfdc[_0x1857ad(0x13c)][_0x1857ad(0x17e)](this,_0x3f8168);return;}}},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x205)]=Scene_Menu['prototype']['onPersonalCancel'],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x27f)]=function(){const _0x2c8a49=_0x302ee7;VisuMZ[_0x2c8a49(0x1c8)][_0x2c8a49(0x205)][_0x2c8a49(0x17e)](this);if(this[_0x2c8a49(0x227)]()===_0x2c8a49(0x216))this[_0x2c8a49(0x12f)][_0x2c8a49(0x23d)]();},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x2ab)]=function(){const _0x34326a=_0x302ee7,_0x4f2a43=parseInt(this[_0x34326a(0x256)][_0x34326a(0x15e)]());_0x4f2a43?($gameTemp['reserveCommonEvent'](_0x4f2a43),this[_0x34326a(0x1c1)]()):this[_0x34326a(0x256)][_0x34326a(0x242)]();},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x1ca)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1fa)],Scene_Menu['prototype']['commandFormation']=function(){const _0x5b90ad=_0x302ee7;VisuMZ['MainMenuCore'][_0x5b90ad(0x1ca)]['call'](this);if(this[_0x5b90ad(0x227)]()==='mobile')this[_0x5b90ad(0x12f)][_0x5b90ad(0x236)]();},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x12a)]=Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x24d)],Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x24d)]=function(){const _0x20234a=_0x302ee7;VisuMZ[_0x20234a(0x1c8)][_0x20234a(0x12a)][_0x20234a(0x17e)](this);if(this['commandWindowStyle']()===_0x20234a(0x216))this['_statusWindow']['close']();},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1a6)]=function(){const _0x49ea18=_0x302ee7;SceneManager[_0x49ea18(0x278)](Scene_Load);},Scene_Menu[_0x302ee7(0x1bb)][_0x302ee7(0x1d7)]=function(){const _0x3d4e6e=_0x302ee7;this[_0x3d4e6e(0x256)][_0x3d4e6e(0x1f1)]()!==''?this[_0x3d4e6e(0x256)][_0x3d4e6e(0x1e7)]():this[_0x3d4e6e(0x1c1)]();};function Sprite_MenuBackgroundActor(){const _0x19f69b=_0x302ee7;this[_0x19f69b(0x217)](...arguments);}Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)]=Object['create'](Sprite[_0x302ee7(0x1bb)]),Sprite_MenuBackgroundActor['prototype'][_0x302ee7(0x190)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)][_0x302ee7(0x217)]=function(){const _0x22d689=_0x302ee7;this[_0x22d689(0x19b)]=null,this[_0x22d689(0x17d)]=![],Sprite['prototype'][_0x22d689(0x217)][_0x22d689(0x17e)](this),this['x']=Graphics[_0x22d689(0x282)];},Sprite_MenuBackgroundActor['prototype']['setActor']=function(_0x226c79){const _0x5a78ff=_0x302ee7;this[_0x5a78ff(0x19b)]!==_0x226c79&&(this[_0x5a78ff(0x19b)]=_0x226c79,this[_0x5a78ff(0x28f)]());},Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)][_0x302ee7(0x28f)]=function(){const _0x178876=_0x302ee7;this['_bitmapReady']=![],this['_actor']?(this[_0x178876(0x1ef)]=ImageManager[_0x178876(0x166)](this[_0x178876(0x19b)][_0x178876(0x189)]()),this['bitmap'][_0x178876(0x2a9)](this['onBitmapLoad']['bind'](this))):this[_0x178876(0x1ef)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)][_0x302ee7(0x16d)]=function(){const _0x5ad9c7=_0x302ee7;this[_0x5ad9c7(0x17d)]=!![],VisuMZ['MainMenuCore']['Settings'][_0x5ad9c7(0x1ab)][_0x5ad9c7(0x24c)]['call'](this);},Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)]['update']=function(){const _0x17cfdb=_0x302ee7;Sprite['prototype'][_0x17cfdb(0x16f)][_0x17cfdb(0x17e)](this),this[_0x17cfdb(0x17d)]&&(this[_0x17cfdb(0x24a)](),this[_0x17cfdb(0x15a)](),this[_0x17cfdb(0x155)]());},Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)][_0x302ee7(0x24a)]=function(){const _0x8e91d0=_0x302ee7;if(this[_0x8e91d0(0x213)]>0x0){const _0x420b3c=this[_0x8e91d0(0x213)];this[_0x8e91d0(0x12d)]=(this[_0x8e91d0(0x12d)]*(_0x420b3c-0x1)+0xff)/_0x420b3c;}},Sprite_MenuBackgroundActor['prototype']['updatePosition']=function(){const _0x590a0a=_0x302ee7;if(this['_duration']>0x0){const _0x37b7fb=this[_0x590a0a(0x213)];this['x']=(this['x']*(_0x37b7fb-0x1)+this[_0x590a0a(0x163)])/_0x37b7fb,this['y']=(this['y']*(_0x37b7fb-0x1)+this[_0x590a0a(0x1b7)])/_0x37b7fb;}},Sprite_MenuBackgroundActor[_0x302ee7(0x1bb)][_0x302ee7(0x155)]=function(){if(this['_duration']>0x0)this['_duration']--;},ImageManager[_0x302ee7(0x223)]=ImageManager[_0x302ee7(0x223)]||0x9,ImageManager[_0x302ee7(0x13f)]=ImageManager[_0x302ee7(0x13f)]||0x6,Window_Base[_0x302ee7(0x1bb)][_0x302ee7(0x1cc)]=function(_0x5def5c,_0x2c0b86,_0x5262c7){const _0x1b8e55=_0x302ee7,_0x99a012=_0x5def5c['match'](/\$/i),_0x11a8f8=ImageManager[_0x1b8e55(0x198)](_0x5def5c),_0x3755bf=_0x11a8f8['width']/(_0x99a012?0x1:ImageManager[_0x1b8e55(0x223)]),_0x27e585=_0x11a8f8[_0x1b8e55(0x25f)]/(_0x99a012?0x1:ImageManager[_0x1b8e55(0x13f)]),_0x224c84=0x0,_0x1a3e23=0x0;this[_0x1b8e55(0x17c)][_0x1b8e55(0x1c6)](_0x11a8f8,_0x224c84,_0x1a3e23,_0x3755bf,_0x27e585,_0x2c0b86-_0x3755bf/0x2,_0x5262c7-_0x27e585);},Window_MenuCommand[_0x302ee7(0x16a)]=VisuMZ[_0x302ee7(0x1c8)]['Settings'][_0x302ee7(0x24e)],Window_MenuCommand['SUBCATEGORY_LIST']=undefined,VisuMZ[_0x302ee7(0x1c8)]['Window_MenuCommand_initialize']=Window_MenuCommand['prototype']['initialize'],Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x217)]=function(_0x5b8bbe){const _0x155fb2=_0x302ee7;this[_0x155fb2(0x264)]='',VisuMZ['MainMenuCore'][_0x155fb2(0x20a)][_0x155fb2(0x17e)](this,_0x5b8bbe),this[_0x155fb2(0x15f)](_0x5b8bbe);},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x15f)]=function(_0x5ce93c){const _0x2a1b7c=_0x302ee7,_0x19b9e3=new Rectangle(0x0,0x0,_0x5ce93c[_0x2a1b7c(0x282)],_0x5ce93c[_0x2a1b7c(0x25f)]);this[_0x2a1b7c(0x209)]=new Window_Base(_0x19b9e3),this[_0x2a1b7c(0x209)][_0x2a1b7c(0x12d)]=0x0,this[_0x2a1b7c(0x1a1)](this[_0x2a1b7c(0x209)]),this[_0x2a1b7c(0x23e)]();},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x21f)]=function(){const _0x59b265=_0x302ee7;Window_HorzCommand[_0x59b265(0x1bb)][_0x59b265(0x21f)][_0x59b265(0x17e)](this);if(this['_commandNameWindow'])this[_0x59b265(0x23e)]();},Window_MenuCommand['prototype'][_0x302ee7(0x23e)]=function(){const _0x6287b2=_0x302ee7,_0x50ee46=this[_0x6287b2(0x209)];_0x50ee46[_0x6287b2(0x17c)]['clear']();const _0x4cf6d3=this['commandStyleCheck'](this[_0x6287b2(0x298)]());if(_0x4cf6d3==='icon'){const _0x4d2ccf=this[_0x6287b2(0x1f4)](this[_0x6287b2(0x298)]());let _0x33bafb=this[_0x6287b2(0x206)](this[_0x6287b2(0x298)]());_0x33bafb=_0x33bafb[_0x6287b2(0x1b3)](/\\I\[(\d+)\]/gi,''),_0x50ee46[_0x6287b2(0x254)](),this['commandNameWindowDrawBackground'](_0x33bafb,_0x4d2ccf),this[_0x6287b2(0x1d6)](_0x33bafb,_0x4d2ccf),this[_0x6287b2(0x281)](_0x33bafb,_0x4d2ccf);}},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x237)]=function(_0x399f2a,_0x15ee93){},Window_MenuCommand['prototype']['commandNameWindowDrawText']=function(_0x3b95b8,_0x3a73de){const _0x5ea0b5=_0x302ee7,_0x5397cf=this[_0x5ea0b5(0x209)];_0x5397cf['drawText'](_0x3b95b8,0x0,_0x3a73de['y'],_0x5397cf[_0x5ea0b5(0x158)],_0x5ea0b5(0x1ee));},Window_MenuCommand[_0x302ee7(0x1bb)]['commandNameWindowCenter']=function(_0x3bd1c5,_0x33aea7){const _0x312888=_0x302ee7,_0x5cbc5f=this[_0x312888(0x209)],_0x5dd106=$gameSystem['windowPadding'](),_0x4daa67=_0x33aea7['x']+Math[_0x312888(0x26c)](_0x33aea7[_0x312888(0x282)]/0x2)+_0x5dd106;_0x5cbc5f['x']=_0x5cbc5f[_0x312888(0x282)]/-0x2+_0x4daa67,_0x5cbc5f['y']=Math['floor'](_0x33aea7[_0x312888(0x25f)]/0x4);},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x1d1)]=function(){const _0xf40bf4=_0x302ee7,_0x53f73b=SceneManager[_0xf40bf4(0x1ae)][_0xf40bf4(0x227)]();if(_0x53f73b===_0xf40bf4(0x216)){const _0x2fd7ba=VisuMZ[_0xf40bf4(0x1c8)]['Settings'][_0xf40bf4(0x14d)][_0xf40bf4(0x1d4)];return this[_0xf40bf4(0x268)]()*_0x2fd7ba+0x8;}else return Window_Command[_0xf40bf4(0x1bb)]['itemHeight'][_0xf40bf4(0x17e)](this);},Window_MenuCommand[_0x302ee7(0x1bb)]['makeCommandList']=function(){const _0x3362b5=_0x302ee7;this[_0x3362b5(0x19f)]();},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x19f)]=function(){const _0x54a78c=_0x302ee7;for(const _0x299a6d of Window_MenuCommand[_0x54a78c(0x16a)]){const _0xcd3b5f=_0x299a6d[_0x54a78c(0x1e0)];if(this[_0x54a78c(0x215)](_0xcd3b5f,_0x299a6d)){let _0xcbfcaa=_0x299a6d[_0x54a78c(0x144)];if(['',_0x54a78c(0x12b)][_0x54a78c(0x1e9)](_0xcbfcaa))_0xcbfcaa=_0x299a6d[_0x54a78c(0x1f8)][_0x54a78c(0x17e)](this);const _0x45071b=_0x299a6d['Icon'];_0x45071b>0x0&&this[_0x54a78c(0x1f6)]()!==_0x54a78c(0x288)&&(_0xcbfcaa=_0x54a78c(0x274)[_0x54a78c(0x27b)](_0x45071b,_0xcbfcaa));const _0x1b9c94=this['isMainMenuCommandEnabled'](_0xcd3b5f,_0x299a6d),_0x8481eb=_0x299a6d[_0x54a78c(0x203)]['call'](this);this[_0x54a78c(0x146)](_0xcbfcaa,_0xcd3b5f,_0x1b9c94,_0x8481eb),this[_0x54a78c(0x265)](_0xcd3b5f,_0x299a6d[_0x54a78c(0x142)]['bind'](this,_0x8481eb));}this[_0x54a78c(0x1c9)](_0xcd3b5f);}},Window_MenuCommand[_0x302ee7(0x1bb)]['isMainMenuCommandVisible']=function(_0x564ce9,_0x4ec429,_0x2054c1){const _0x3bd59c=_0x302ee7;if(!_0x2054c1){if(!this['isIncludedInSubcategory'](_0x564ce9,_0x4ec429))return![];}if($gameSystem['getMainMenuSymbolState'](_0x564ce9,_0x3bd59c(0x170)))return!![];if($gameSystem[_0x3bd59c(0x2a4)](_0x564ce9,_0x3bd59c(0x1f2)))return![];return _0x4ec429[_0x3bd59c(0x25a)][_0x3bd59c(0x17e)](this,_0x564ce9,_0x4ec429);},Window_MenuCommand['prototype'][_0x302ee7(0x168)]=function(_0x4953ba,_0x292fad){const _0x15dbb0=_0x302ee7;if($gameSystem[_0x15dbb0(0x2a4)](_0x4953ba,_0x15dbb0(0x245)))return!![];if($gameSystem[_0x15dbb0(0x2a4)](_0x4953ba,_0x15dbb0(0x230)))return![];return _0x292fad[_0x15dbb0(0x13e)][_0x15dbb0(0x17e)](this,_0x4953ba,_0x292fad);},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x1c9)]=function(_0x182b1e){const _0x426720=_0x302ee7;switch(_0x182b1e){case _0x426720(0x21d):this[_0x426720(0x14b)]();break;case _0x426720(0x22b):this[_0x426720(0x232)](),this['addOriginalCommands']();break;case _0x426720(0x1b5):this[_0x426720(0x263)]();break;case _0x426720(0x22f):this['addSaveCommand']();break;case _0x426720(0x20c):this[_0x426720(0x1f9)]();break;}},Window_MenuCommand[_0x302ee7(0x1bb)]['addMainCommands']=function(){},Window_MenuCommand[_0x302ee7(0x1bb)]['addFormationCommand']=function(){},Window_MenuCommand['prototype'][_0x302ee7(0x22d)]=function(){},Window_MenuCommand[_0x302ee7(0x1bb)]['addOptionsCommand']=function(){},Window_MenuCommand['prototype'][_0x302ee7(0x1bd)]=function(){},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x1f9)]=function(){},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x283)]=function(){const _0x9b4b84=_0x302ee7,_0x21a399=SceneManager[_0x9b4b84(0x1ae)]['commandWindowStyle']();if([_0x9b4b84(0x173),_0x9b4b84(0x20b)][_0x9b4b84(0x1e9)](_0x21a399))return this[_0x9b4b84(0x229)]?this[_0x9b4b84(0x1a9)]():0x4;else return _0x21a399!==_0x9b4b84(0x135)?VisuMZ[_0x9b4b84(0x1c8)]['Settings'][_0x9b4b84(0x14d)][_0x9b4b84(0x17a)]:Window_Command[_0x9b4b84(0x1bb)][_0x9b4b84(0x283)][_0x9b4b84(0x17e)](this);},Window_MenuCommand[_0x302ee7(0x1bb)]['currentSubcategory']=function(){const _0x47f94c=_0x302ee7;return this[_0x47f94c(0x264)]||'';},Window_MenuCommand[_0x302ee7(0x1bb)]['isIncludedInSubcategory']=function(_0x5d17aa,_0x559961){const _0x4b0a9b=_0x302ee7,_0x1336ab=_0x559961['Subcategory']||'';if(!this[_0x4b0a9b(0x2a0)](_0x1336ab)&&this[_0x4b0a9b(0x1f1)]()==='')return!![];return _0x1336ab===this[_0x4b0a9b(0x1f1)]();},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x2a0)]=function(_0x402b8b){const _0x538ce2=_0x302ee7;return this[_0x538ce2(0x1c3)]()[_0x538ce2(0x1e9)](_0x402b8b);},Window_MenuCommand[_0x302ee7(0x1bb)]['getSubcategoryList']=function(){const _0x5a1cf7=_0x302ee7;if(Window_MenuCommand[_0x5a1cf7(0x2a8)]!==undefined)return Window_MenuCommand[_0x5a1cf7(0x2a8)];Window_MenuCommand[_0x5a1cf7(0x2a8)]=[];for(const _0x1f8553 of Window_MenuCommand[_0x5a1cf7(0x16a)]){const _0xaed3=_0x1f8553[_0x5a1cf7(0x1e0)];if(_0xaed3!==_0x5a1cf7(0x178))continue;const _0x384de9=_0x1f8553[_0x5a1cf7(0x203)][_0x5a1cf7(0x17e)](this);Window_MenuCommand[_0x5a1cf7(0x2a8)]['push'](_0x384de9);}return Window_MenuCommand[_0x5a1cf7(0x2a8)];},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x177)]=function(_0x24e208){const _0x56909f=_0x302ee7;if(!_0x24e208)return!![];const _0x57d1ba=_0x24e208['ExtJS'][_0x56909f(0x17e)](this);for(const _0x549fa4 of Window_MenuCommand[_0x56909f(0x16a)]){if(_0x549fa4===_0x24e208)continue;const _0x287e3f=_0x549fa4[_0x56909f(0x169)]||'';if(_0x287e3f!==_0x57d1ba)continue;const _0x4f2f11=_0x549fa4[_0x56909f(0x1e0)];if(this[_0x56909f(0x215)](_0x4f2f11,_0x549fa4,!![]))return!![];}return![];},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x13a)]=function(_0x4bed21){const _0x5a5aaf=_0x302ee7;_0x4bed21=_0x4bed21;if(this[_0x5a5aaf(0x1f1)]()===_0x4bed21)return;this['_subcategory']=_0x4bed21,this[_0x5a5aaf(0x2aa)](),this[_0x5a5aaf(0x221)](0x0),this[_0x5a5aaf(0x29b)](0x0),this[_0x5a5aaf(0x242)]();},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x1e7)]=function(){const _0x25b1c1=_0x302ee7,_0x543de8=this['currentSubcategory']();this['_subcategory']='',this['refresh'](),this[_0x25b1c1(0x29b)](0x0);this[_0x25b1c1(0x267)]>0x1&&(this[_0x25b1c1(0x267)]=0x1,this[_0x25b1c1(0x1f7)]());const _0x511739=Math[_0x25b1c1(0x1b2)](this['findExt'](_0x543de8),0x0);this[_0x25b1c1(0x1be)](_0x511739),this[_0x25b1c1(0x242)]();},Window_MenuCommand['prototype'][_0x302ee7(0x293)]=function(){const _0x5a54ac=_0x302ee7;return VisuMZ[_0x5a54ac(0x1c8)]['Settings']['CustomCmdWin'][_0x5a54ac(0x1e1)];},Window_MenuCommand['prototype']['drawItem']=function(_0x531e78){const _0x1b8c97=_0x302ee7,_0x98cf79=this[_0x1b8c97(0x199)](_0x531e78);if(_0x98cf79==='iconText')this[_0x1b8c97(0x234)](_0x531e78);else _0x98cf79==='icon'?this[_0x1b8c97(0x255)](_0x531e78):Window_Command[_0x1b8c97(0x1bb)][_0x1b8c97(0x1ba)]['call'](this,_0x531e78);},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x1f6)]=function(){const _0x4722d2=_0x302ee7;return VisuMZ[_0x4722d2(0x1c8)][_0x4722d2(0x292)]['CustomCmdWin'][_0x4722d2(0x141)];},Window_MenuCommand[_0x302ee7(0x1bb)]['commandStyleCheck']=function(_0x5572ff){const _0x125013=_0x302ee7,_0xa07d8=this[_0x125013(0x1f6)]();if(_0xa07d8!==_0x125013(0x1eb))return _0xa07d8;else{const _0x1da5b9=this[_0x125013(0x206)](_0x5572ff);if(_0x1da5b9[_0x125013(0x208)](/\\I\[(\d+)\]/i)){const _0x3ab9df=this[_0x125013(0x1f4)](_0x5572ff),_0x27ddc9=this['textSizeEx'](_0x1da5b9)[_0x125013(0x282)];return _0x27ddc9<=_0x3ab9df['width']?_0x125013(0x17f):_0x125013(0x239);}else return _0x125013(0x288);}},Window_MenuCommand['prototype'][_0x302ee7(0x234)]=function(_0x33fe69){const _0x10f685=_0x302ee7,_0x365bed=this['itemLineRect'](_0x33fe69),_0x38dd72=this[_0x10f685(0x206)](_0x33fe69),_0xe70669=this[_0x10f685(0x167)](_0x38dd72)['width'];this[_0x10f685(0x28b)](this[_0x10f685(0x130)](_0x33fe69));let _0x398162=this[_0x10f685(0x293)]();if(_0x398162===_0x10f685(0x1c7))this[_0x10f685(0x1e2)](_0x38dd72,_0x365bed['x']+_0x365bed['width']-_0xe70669,_0x365bed['y'],_0xe70669);else{if(_0x398162===_0x10f685(0x1ee)){const _0x5c103d=_0x365bed['x']+Math[_0x10f685(0x26c)]((_0x365bed[_0x10f685(0x282)]-_0xe70669)/0x2);this[_0x10f685(0x1e2)](_0x38dd72,_0x5c103d,_0x365bed['y'],_0xe70669);}else this[_0x10f685(0x1e2)](_0x38dd72,_0x365bed['x'],_0x365bed['y'],_0xe70669);}},Window_MenuCommand[_0x302ee7(0x1bb)][_0x302ee7(0x255)]=function(_0x4c075f){const _0x4241a9=_0x302ee7;this[_0x4241a9(0x206)](_0x4c075f)[_0x4241a9(0x208)](/\\I\[(\d+)\]/i);const _0x503485=Number(RegExp['$1']),_0x54fc3d=this['itemLineRect'](_0x4c075f),_0x271202=_0x54fc3d['x']+Math[_0x4241a9(0x26c)]((_0x54fc3d[_0x4241a9(0x282)]-ImageManager['iconWidth'])/0x2),_0xd31683=_0x54fc3d['y']+(_0x54fc3d[_0x4241a9(0x25f)]-ImageManager[_0x4241a9(0x19d)])/0x2;this[_0x4241a9(0x2a7)](_0x503485,_0x271202,_0xd31683);},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x204)]=Window_StatusBase[_0x302ee7(0x1bb)][_0x302ee7(0x1d5)],Window_StatusBase[_0x302ee7(0x1bb)][_0x302ee7(0x1d5)]=function(){const _0x4858d0=_0x302ee7;VisuMZ[_0x4858d0(0x1c8)][_0x4858d0(0x204)][_0x4858d0(0x17e)](this),this[_0x4858d0(0x200)]();},Window_StatusBase['prototype']['loadOtherActorImages']=function(){const _0x59b4a1=_0x302ee7;for(const _0x5abbaa of $gameParty[_0x59b4a1(0x252)]()){if(!_0x5abbaa)continue;_0x5abbaa['characterName']()&&ImageManager[_0x59b4a1(0x15b)](_0x5abbaa['characterName']()),_0x5abbaa[_0x59b4a1(0x25c)]()&&ImageManager[_0x59b4a1(0x198)](_0x5abbaa[_0x59b4a1(0x25c)]()),_0x5abbaa[_0x59b4a1(0x189)]()&&ImageManager[_0x59b4a1(0x166)](_0x5abbaa[_0x59b4a1(0x189)]());}},Window_StatusBase[_0x302ee7(0x1bb)][_0x302ee7(0x26d)]=function(){const _0x8d204e=_0x302ee7;return VisuMZ['MainMenuCore']['Settings'][_0x8d204e(0x27d)];},Window_StatusBase[_0x302ee7(0x1bb)][_0x302ee7(0x235)]=function(_0x398db7,_0xac6a77,_0x351fdf,_0x510353,_0x201d95){const _0x56556a=_0x302ee7;_0x510353=_0x510353||ImageManager[_0x56556a(0x1ad)],_0x201d95=_0x201d95||ImageManager[_0x56556a(0x1fd)];const _0x5ef0bd=ImageManager['faceWidth'],_0x59f83a=_0x201d95-0x2,_0x562149=_0xac6a77+Math[_0x56556a(0x26c)]((_0x510353-_0x5ef0bd)/0x2);this[_0x56556a(0x190)]===Window_MenuStatus&&this[_0x56556a(0x28b)](_0x398db7[_0x56556a(0x295)]()),this[_0x56556a(0x145)](_0x398db7,_0x562149,_0x351fdf,_0x5ef0bd,_0x59f83a),this[_0x56556a(0x28b)](!![]);},Window_StatusBase[_0x302ee7(0x1bb)][_0x302ee7(0x194)]=function(_0x5dce4c,_0x2391db,_0x24f50f,_0x430893,_0x4666a1){const _0x2d5813=_0x302ee7;_0x430893=_0x430893||ImageManager[_0x2d5813(0x1ad)],_0x4666a1=_0x4666a1||ImageManager['faceHeight'];const _0x591c1d=_0x5dce4c['characterName'](),_0x5b6ecd=_0x5dce4c[_0x2d5813(0x284)](),_0x1f1060=ImageManager[_0x2d5813(0x15b)](_0x591c1d),_0x24aeb3=ImageManager[_0x2d5813(0x297)](_0x591c1d),_0x58fded=_0x1f1060[_0x2d5813(0x282)]/(_0x24aeb3?0x3:0xc),_0xfd8f70=_0x1f1060[_0x2d5813(0x25f)]/(_0x24aeb3?0x4:0x8),_0x544e89=_0x430893,_0x516521=_0x4666a1-0x2,_0x51b074=_0x2391db+Math[_0x2d5813(0x26c)](_0x544e89/0x2),_0x44177f=_0x24f50f+Math[_0x2d5813(0x176)]((_0x4666a1+_0xfd8f70)/0x2);this[_0x2d5813(0x190)]===Window_MenuStatus&&this[_0x2d5813(0x28b)](_0x5dce4c[_0x2d5813(0x295)]());const _0x4e2f1b=Math[_0x2d5813(0x18a)](_0x430893,_0x58fded),_0x48df53=Math[_0x2d5813(0x18a)](_0x4666a1,_0xfd8f70),_0x1490dc=Math['floor'](_0x2391db+Math[_0x2d5813(0x1b2)](_0x430893-_0x58fded,0x0)/0x2),_0x39ce28=Math[_0x2d5813(0x26c)](_0x24f50f+Math[_0x2d5813(0x1b2)](_0x4666a1-_0xfd8f70,0x0)/0x2),_0x2e1d1a=_0x24aeb3?0x0:_0x5b6ecd,_0x2d34f2=(_0x2e1d1a%0x4*0x3+0x1)*_0x58fded,_0x61e6e0=Math['floor'](_0x2e1d1a/0x4)*0x4*_0xfd8f70;this[_0x2d5813(0x17c)][_0x2d5813(0x1c6)](_0x1f1060,_0x2d34f2,_0x61e6e0,_0x4e2f1b,_0x48df53,_0x1490dc,_0x39ce28),this[_0x2d5813(0x28b)](!![]);},Window_StatusBase['prototype'][_0x302ee7(0x24f)]=function(_0x3ade18,_0x33547e,_0x25920c,_0x4a50f4,_0x1b79a7){const _0x300d5b=_0x302ee7;_0x4a50f4=_0x4a50f4||ImageManager[_0x300d5b(0x1ad)],_0x1b79a7=_0x1b79a7||ImageManager['faceHeight'];const _0x5b0fb0=ImageManager['loadSvActor'](_0x3ade18[_0x300d5b(0x25c)]()),_0x137e10=_0x5b0fb0[_0x300d5b(0x282)]/ImageManager[_0x300d5b(0x223)],_0x4bfb88=_0x5b0fb0['height']/ImageManager['svActorVertCells'],_0x18d51b=_0x4a50f4,_0x13d849=_0x1b79a7-0x2,_0x3d50be=_0x33547e+Math['floor'](_0x18d51b/0x2),_0x2ba332=_0x25920c+Math['ceil']((_0x1b79a7+_0x4bfb88)/0x2);this['constructor']===Window_MenuStatus&&this[_0x300d5b(0x28b)](_0x3ade18[_0x300d5b(0x295)]());const _0x359ecb=_0x3ade18[_0x300d5b(0x197)]&&_0x3ade18['hasStaticSvBattler'](),_0x56acf6=0x0,_0x5acb93=0x0,_0x5354f6=_0x359ecb?_0x5b0fb0[_0x300d5b(0x282)]:_0x137e10,_0x1d178d=_0x359ecb?_0x5b0fb0[_0x300d5b(0x25f)]:_0x4bfb88,_0xe95c7d=Math[_0x300d5b(0x18a)](0x1,_0x4a50f4/_0x5354f6,_0x1b79a7/_0x1d178d),_0x55b553=_0xe95c7d*_0x5354f6,_0x5ad73d=_0xe95c7d*_0x1d178d,_0x3f72db=Math['floor'](_0x33547e+Math[_0x300d5b(0x1b2)](_0x4a50f4-_0x55b553,0x0)/0x2),_0x1e7265=Math[_0x300d5b(0x26c)](_0x25920c+Math[_0x300d5b(0x1b2)](_0x1b79a7-_0x5ad73d,0x0)/0x2);this[_0x300d5b(0x17c)][_0x300d5b(0x1c6)](_0x5b0fb0,_0x56acf6,_0x5acb93,_0x5354f6,_0x1d178d,_0x3f72db,_0x1e7265,_0x55b553,_0x5ad73d),this[_0x300d5b(0x28b)](!![]);},Window_StatusBase[_0x302ee7(0x1bb)]['drawItemActorMenuImage']=function(_0x18f320,_0x24c53a,_0x1ba747,_0xef9212,_0x427cf7){const _0x3135b0=_0x302ee7,_0x90b331=ImageManager['loadPicture'](_0x18f320['getMenuImage']());_0xef9212=(_0xef9212||ImageManager['faceWidth'])-0x2,_0x427cf7=(_0x427cf7||ImageManager[_0x3135b0(0x1fd)])-0x2;const _0x448d2b=_0x90b331[_0x3135b0(0x282)],_0x235e63=_0x90b331[_0x3135b0(0x25f)],_0x18ca8a=_0xef9212,_0x31e2b8=_0x427cf7-0x2,_0x4ca7f0=_0x24c53a+Math[_0x3135b0(0x26c)](_0x18ca8a/0x2),_0x486f1a=_0x1ba747+Math[_0x3135b0(0x176)]((_0x427cf7+_0x235e63)/0x2);this[_0x3135b0(0x190)]===Window_MenuStatus&&this['changePaintOpacity'](_0x18f320[_0x3135b0(0x295)]());const _0x543448=Math[_0x3135b0(0x18a)](_0xef9212,_0x448d2b),_0x585526=Math[_0x3135b0(0x18a)](_0x427cf7,_0x235e63),_0x442e13=_0x24c53a+0x1,_0x306b02=Math[_0x3135b0(0x1b2)](_0x1ba747+0x1,_0x1ba747+_0x31e2b8-_0x235e63+0x3);let _0x3aa737=Math[_0x3135b0(0x201)]((_0x448d2b-_0x543448)/0x2),_0x3bd65b=Math['round']((_0x235e63-_0x585526)/0x2);_0x3aa737-=_0x18f320['getMenuImageOffsetX'](),_0x3bd65b-=_0x18f320[_0x3135b0(0x180)]();if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ[_0x3135b0(0x156)][_0x3135b0(0x292)][_0x3135b0(0x2a2)]['PixelateImageRendering']){}}this[_0x3135b0(0x17c)]['blt'](_0x90b331,_0x3aa737,_0x3bd65b,_0x543448,_0x585526,_0x442e13,_0x306b02),this[_0x3135b0(0x28b)](!![]);},Window_Status['prototype'][_0x302ee7(0x145)]=function(_0x490cd5,_0x2db1b4,_0x160c48,_0x1f877b,_0x31f2a7){const _0xe032bb=_0x302ee7;switch(this['graphicType']()){case'none':break;case _0xe032bb(0x160):this[_0xe032bb(0x194)](_0x490cd5,_0x2db1b4,_0x160c48,_0x1f877b,_0x31f2a7);break;case _0xe032bb(0x139):this[_0xe032bb(0x24f)](_0x490cd5,_0x2db1b4,_0x160c48,_0x1f877b,_0x31f2a7);break;default:Window_StatusBase[_0xe032bb(0x1bb)][_0xe032bb(0x145)]['call'](this,_0x490cd5,_0x2db1b4,_0x160c48,_0x1f877b,_0x31f2a7);break;}},VisuMZ['MainMenuCore'][_0x302ee7(0x1ce)]=Window_MenuStatus['prototype']['selectLast'],Window_MenuStatus['prototype']['selectLast']=function(){const _0x26c7ee=_0x302ee7;VisuMZ['MainMenuCore'][_0x26c7ee(0x292)][_0x26c7ee(0x1ab)]['StatusSelectLast']?VisuMZ[_0x26c7ee(0x1c8)][_0x26c7ee(0x1ce)][_0x26c7ee(0x17e)](this):this[_0x26c7ee(0x1be)](0x0);},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x29a)]=Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1a9)],Window_MenuStatus[_0x302ee7(0x1bb)]['maxItems']=function(){const _0x282ff5=_0x302ee7;return this['showOnlyBattleMembers']()?$gameParty['battleMembers']()[_0x282ff5(0x1a7)]:VisuMZ[_0x282ff5(0x1c8)]['Window_MenuStatus_maxItems'][_0x282ff5(0x17e)](this);},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x258)]=function(){const _0xf7945b=_0x302ee7,_0x4c2949=VisuMZ[_0xf7945b(0x1c8)][_0xf7945b(0x292)][_0xf7945b(0x1ab)];if(_0x4c2949['ShowReserve']===undefined)_0x4c2949[_0xf7945b(0x193)]=!![];const _0x81d4de=SceneManager['_scene'];if(!_0x4c2949[_0xf7945b(0x193)]){if(_0x4c2949[_0xf7945b(0x18f)])return _0x81d4de[_0xf7945b(0x190)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1dc)]=function(){const _0x10654c=_0x302ee7,_0x447d0c=SceneManager['_scene'][_0x10654c(0x190)];return _0x447d0c===Scene_Menu?VisuMZ['MainMenuCore'][_0x10654c(0x292)][_0x10654c(0x26a)]:VisuMZ[_0x10654c(0x1c8)][_0x10654c(0x292)]['InnerMenuListStyle'];},Window_MenuStatus['prototype'][_0x302ee7(0x12e)]=function(){const _0x298a74=_0x302ee7,_0x2ba7c2=this['listStyle']();switch(_0x2ba7c2){case'vertical':case'portrait':return 0x1;case _0x298a74(0x140):return 0x1;default:return $gameParty[_0x298a74(0x26b)]();}},Window_MenuStatus['prototype'][_0x302ee7(0x283)]=function(){const _0x227d08=_0x302ee7,_0x2942c6=this['listStyle']();switch(_0x2942c6){case _0x227d08(0x260):case _0x227d08(0x174):return $gameParty[_0x227d08(0x26b)]();default:return 0x1;}},VisuMZ[_0x302ee7(0x1c8)][_0x302ee7(0x247)]=Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1d1)],Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1d1)]=function(){const _0x2a3b9d=_0x302ee7,_0x62f0ed=this[_0x2a3b9d(0x1dc)]();switch(_0x62f0ed){case _0x2a3b9d(0x260):case _0x2a3b9d(0x174):case _0x2a3b9d(0x140):return this[_0x2a3b9d(0x20f)];case'thin':return Window_Selectable[_0x2a3b9d(0x1bb)][_0x2a3b9d(0x1d1)]['call'](this);case _0x2a3b9d(0x18e):return this[_0x2a3b9d(0x268)]()*0x2+0x8;default:return VisuMZ[_0x2a3b9d(0x1c8)][_0x2a3b9d(0x247)][_0x2a3b9d(0x17e)](this);}},Window_MenuStatus['prototype']['drawItem']=function(_0x38465c){const _0x2e7270=_0x302ee7;this[_0x2e7270(0x1fc)](_0x38465c),this[_0x2e7270(0x27c)](_0x38465c);},VisuMZ[_0x302ee7(0x1c8)]['Window_MenuStatus_drawItemImage']=Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x184)],Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x28e)]=function(_0x9d9b72,_0x1ded71,_0x5755ed,_0x2eb255,_0x5022ce){const _0x3aa6cb=_0x302ee7;switch(this[_0x3aa6cb(0x26d)]()){case'none':break;case'sprite':this[_0x3aa6cb(0x194)](_0x9d9b72,_0x1ded71,_0x5755ed+0x1,_0x2eb255,_0x5022ce-0x2);break;case _0x3aa6cb(0x139):this[_0x3aa6cb(0x24f)](_0x9d9b72,_0x1ded71,_0x5755ed+0x1,_0x2eb255,_0x5022ce-0x2);break;default:this[_0x3aa6cb(0x235)](_0x9d9b72,_0x1ded71,_0x5755ed,_0x2eb255,_0x5022ce);break;}},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x27c)]=function(_0x182012){const _0x16e54c=_0x302ee7;this[_0x16e54c(0x254)]();const _0x2879c2=this[_0x16e54c(0x25e)](_0x182012),_0x2781b5=this[_0x16e54c(0x15c)](_0x182012),_0x578402=this[_0x16e54c(0x1dc)]();switch(_0x578402){case'vertical':this['drawItemStatusVerticalStyle'](_0x2879c2,_0x2781b5);break;case _0x16e54c(0x174):this[_0x16e54c(0x1db)](_0x2879c2,_0x2781b5);break;case _0x16e54c(0x140):this[_0x16e54c(0x1e6)](_0x2879c2,_0x2781b5);break;case _0x16e54c(0x290):this[_0x16e54c(0x129)](_0x2879c2,_0x2781b5);break;case'thicker':this[_0x16e54c(0x19e)](_0x2879c2,_0x2781b5);break;default:this[_0x16e54c(0x289)](_0x2879c2,_0x2781b5);break;}},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x246)]=function(_0x5be7a8,_0x1337c1){const _0x5d2025=_0x302ee7;VisuMZ[_0x5d2025(0x1c8)][_0x5d2025(0x292)][_0x5d2025(0x1fb)][_0x5d2025(0x1a0)][_0x5d2025(0x17e)](this,_0x5be7a8,_0x1337c1);},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1db)]=function(_0x5cddfb,_0x56a5cc){const _0x770883=_0x302ee7;if(_0x5cddfb['getMenuImage']()!==''){const _0x2abf0f=ImageManager[_0x770883(0x166)](_0x5cddfb[_0x770883(0x189)]());_0x2abf0f[_0x770883(0x2a9)](this[_0x770883(0x171)][_0x770883(0x1e5)](this,_0x5cddfb,_0x56a5cc));}else this[_0x770883(0x246)](_0x5cddfb,_0x56a5cc);},Window_MenuStatus[_0x302ee7(0x1bb)]['drawItemStatusPortraitStyleOnLoad']=function(_0x1f8e97,_0xa0e26f){const _0x556242=_0x302ee7;VisuMZ['MainMenuCore'][_0x556242(0x292)]['ListStyles']['PortraitStyle'][_0x556242(0x17e)](this,_0x1f8e97,_0xa0e26f);},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1e6)]=function(_0x1f1417,_0x2ccb5f){const _0x369f7d=_0x302ee7,_0x279c52=ImageManager[_0x369f7d(0x166)](_0x1f1417[_0x369f7d(0x189)]());_0x279c52[_0x369f7d(0x2a9)](this[_0x369f7d(0x162)][_0x369f7d(0x1e5)](this,_0x1f1417,_0x2ccb5f));},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x162)]=function(_0x24e4b6,_0x4c801f){const _0x1311d1=_0x302ee7;VisuMZ[_0x1311d1(0x1c8)][_0x1311d1(0x292)][_0x1311d1(0x1fb)]['SoloStyle'][_0x1311d1(0x17e)](this,_0x24e4b6,_0x4c801f);},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x129)]=function(_0x1ced60,_0x5dc0ed){const _0x583124=_0x302ee7;VisuMZ[_0x583124(0x1c8)][_0x583124(0x292)][_0x583124(0x1fb)][_0x583124(0x211)][_0x583124(0x17e)](this,_0x1ced60,_0x5dc0ed);},Window_MenuStatus['prototype']['drawItemStatusThickerStyle']=function(_0x5f3d64,_0xa271eb){const _0xe4a939=_0x302ee7;VisuMZ[_0xe4a939(0x1c8)][_0xe4a939(0x292)]['ListStyles']['ThickerStyle']['call'](this,_0x5f3d64,_0xa271eb);},Window_MenuStatus[_0x302ee7(0x1bb)][_0x302ee7(0x1d3)]=function(){const _0x16f985=_0x302ee7,_0x57dd65=this[_0x16f985(0x1dc)]();if(['thin','thicker'][_0x16f985(0x1e9)](_0x57dd65))return![];return Window_StatusBase[_0x16f985(0x1bb)]['isExpGaugeDrawn']['call'](this);},Window_MenuStatus['prototype']['drawItemStatusDefaultStyle']=function(_0x5d51e5,_0x272231){const _0x1bfff5=_0x302ee7;VisuMZ['MainMenuCore'][_0x1bfff5(0x292)]['ListStyles'][_0x1bfff5(0x275)][_0x1bfff5(0x17e)](this,_0x5d51e5,_0x272231);},Window_SkillStatus['prototype'][_0x302ee7(0x145)]=function(_0x30d70f,_0x558392,_0x2d4c1f,_0x5019ee,_0x388074){const _0x316360=_0x302ee7;switch(this['graphicType']()){case _0x316360(0x270):break;case _0x316360(0x160):this[_0x316360(0x194)](_0x30d70f,_0x558392,_0x2d4c1f,_0x5019ee,_0x388074);break;case _0x316360(0x139):this['drawItemActorSvBattler'](_0x30d70f,_0x558392,_0x2d4c1f,_0x5019ee,_0x388074);break;default:Window_StatusBase[_0x316360(0x1bb)][_0x316360(0x145)][_0x316360(0x17e)](this,_0x30d70f,_0x558392,_0x2d4c1f,_0x5019ee,_0x388074);break;}},Window_EquipStatus[_0x302ee7(0x1bb)][_0x302ee7(0x145)]=function(_0x18e960,_0x1dab94,_0x3c5b6e,_0x4b24ec,_0xb578b8){const _0xc9be52=_0x302ee7;switch(this[_0xc9be52(0x26d)]()){case'none':break;case _0xc9be52(0x160):this[_0xc9be52(0x194)](_0x18e960,_0x1dab94,_0x3c5b6e,_0x4b24ec,_0xb578b8);break;case _0xc9be52(0x139):this['drawItemActorSvBattler'](_0x18e960,_0x1dab94,_0x3c5b6e,_0x4b24ec,_0xb578b8);break;default:Window_StatusBase[_0xc9be52(0x1bb)][_0xc9be52(0x145)]['call'](this,_0x18e960,_0x1dab94,_0x3c5b6e,_0x4b24ec,_0xb578b8);break;}};function Window_ThinGold(){this['initialize'](...arguments);}Window_ThinGold[_0x302ee7(0x1bb)]=Object['create'](Window_Gold[_0x302ee7(0x1bb)]),Window_ThinGold[_0x302ee7(0x1bb)]['constructor']=Window_ThinGold,Window_ThinGold[_0x302ee7(0x1bb)][_0x302ee7(0x1d1)]=function(){const _0x5c8f7e=_0x302ee7;return this[_0x5c8f7e(0x268)]();},Window_ThinGold[_0x302ee7(0x1bb)]['colSpacing']=function(){const _0x2b5480=_0x302ee7;return Window_Selectable[_0x2b5480(0x1bb)][_0x2b5480(0x280)][_0x2b5480(0x17e)](this);};function _0x57f9(){const _0x5c4e4c=['changeTextColor','close','updateCommandNameWindow','Step1','normalColor','3901887sZBfxT','activate','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setBackgroundType','forceEnable','drawItemStatusVerticalStyle','Window_MenuStatus_itemHeight','AdjustCommandHeight','fill','updateOpacity','mainCommandWidth','ActorBgMenuJS','onFormationCancel','CommandList','drawItemActorSvBattler','status','createGoldWindow','members','createStatusWindow','resetFontSettings','drawItemStyleIcon','_commandWindow','SoloQuick','showOnlyBattleMembers','toUpperCase','ShowJS','bottom','battlerName','_menuImage','actor','height','vertical','isDisplayActorMenuBackgroundImage','setMenuImage','addOptionsCommand','_subcategory','setHandler','Scene_Menu_statusWindowRect','_scrollDuration','lineHeight','VarList','StatusListStyle','maxBattleMembers','floor','graphicType','ThinGoldWindow','boxWidth','none','systemColor','Scene_Menu_commandPersonal','adjustStatusWindowMobile','\x5cI[%1]%2','DefaultStyle','ChangeActorMenuImageGroup','variableWindowRectBottomStyle','push','commandWindowRectTopStyle','commandWindowRectThinBottomStyle','format','drawItemStatus','StatusGraphic','2870161ZxdPmv','onPersonalCancel','colSpacing','commandNameWindowCenter','width','maxCols','characterIndex','create','Symbols','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','text','drawItemStatusDefaultStyle','Playtime','changePaintOpacity','Step2','ARRAYNUM','drawActorGraphic','loadBitmap','thin','openness','Settings','itemTextAlign','_dummyWindow','isBattleMember','ActorBgMenus','isBigCharacter','index','_timer','Window_MenuStatus_maxItems','setTopRow','createVariableWindow','parse','commandWindowRectMobileStyle','updateTimer','doesSubcategoryExist','ChangeActorMenuImageRange','QoL','MenuCommandForceHide','getMainMenuSymbolState','forceHideMainMenuCommand','calcWindowHeight','drawIcon','SUBCATEGORY_LIST','addLoadListener','refresh','commandCommonEvent','drawItemStatusThinStyle','Scene_Menu_onFormationCancel','Untitled','boxHeight','opacity','numVisibleRows','_statusWindow','isCommandEnabled','6sGAizb','addWindow','commandWindowRect','Enable','default','applyThinnerGoldWindowRect','STR','drawText','svbattler','setSubcategory','name','PersonalHandlerJS','Variable','EnableJS','svActorVertCells','solo','Style','CallHandlerJS','109194lHlLCq','TextStr','drawActorFace','addCommand','Scene_MenuBase_createBackground','drawItemBackground','map','AutoGoldHeight','addMainCommands','forceShowMainMenuCommand','CustomCmdWin','currentSymbol','Icon','version','thinGoldWindow','left','registerCommand','resetTextColor','updateDuration','CoreEngine','BgType','innerWidth','createPlaytimeWindow','updatePosition','loadCharacter','itemRect','createDummyWindow','currentExt','createCommandNameWindow','sprite','top','drawItemStatusSoloStyleOnLoad','_targetX','Time','setTargetActor','loadPicture','textSizeEx','isMainMenuCommandEnabled','Subcategory','_commandList','statusWindowRectTopStyle','value','onBitmapLoad','canCreatePlaytimeWindow','update','forceShow','drawItemStatusPortraitStyleOnLoad','remove','thinTop','portrait','commandWindowRectBottomStyle','ceil','isSubcategoryVisible','subcategory','drawAllItems','Cols','adjustDefaultCommandWindowRect','contents','_bitmapReady','call','iconText','getMenuImageOffsetY','adjustCommandHeightByPlaytime','_variableWindow','4eAXqxN','drawItemImage','EVAL','mainAreaBottom','mainAreaTop','setActor','getMenuImage','min','MenuCommandClear','Rows','note','thicker','HideMainMenuOnly','constructor','filter','shift','ShowReserve','drawItemActorSprite','variableWindowRectTopStyle','statusWindowRectBottomStyle','hasStaticSvBattler','loadSvActor','commandStyleCheck','trim','_actor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','iconHeight','drawItemStatusThickerStyle','makeMainMenuCoreCommandList','VerticalStyle','addChild','return\x200','Scene_Menu_commandWindowRect','variableWindowRect','ARRAYSTR','commandLoad','length','_actorMenuBgSprite','maxItems','description','General','STRUCT','faceWidth','_scene','updateActor','drawPlaytime','CommandWindowStyle','max','replace','playtimeWindowRect','options','initMenuImage','_targetY','709842lBnViQ','exit','drawItem','prototype','Game_Actor_setup','addSaveCommand','smoothSelect','ChangeActorMenuImageJS','_mainMenuCore','popScene','playtimeText','getSubcategoryList','commandWindowRectThinTopStyle','commandPersonal','blt','right','MainMenuCore','addSymbolBridge','Scene_Menu_commandFormation','playtimeWindowRectTopStyle','drawSvActor','statusWindowRect','Window_MenuStatus_selectLast','Step1Start','goldWindowRectBottomStyle','itemHeight','80809pwHJgm','isExpGaugeDrawn','MobileThickness','loadFaceImages','commandNameWindowDrawText','commandCancel','_goldWindow','FUNC','variables','drawItemStatusPortraitStyle','listStyle','mainAreaHeight','isSoloQuickMode','ARRAYSTRUCT','Symbol','TextAlign','drawTextEx','forceDisableMainMenuCommand','setup','bind','drawItemStatusSoloStyle','removeSubcategory','parameters','includes','Scene_Menu_create','auto','Scene_Menu_createStatusWindow','_data','center','bitmap','_playtimeWindow','currentSubcategory','forceHide','MenuCommandForceDisable','itemLineRect','drawTimeIcon','commandStyle','updateSmoothScroll','TextJS','addGameEndCommand','commandFormation','ListStyles','drawPendingItemBackground','faceHeight','drawTimeLabel','Game_System_initialize','loadOtherActorImages','round','playtimeWindowRectBottomStyle','ExtJS','Window_StatusBase_loadFaceImages','Scene_Menu_onPersonalCancel','commandName','MenuCommandForceEnable','match','_commandNameWindow','Window_MenuCommand_initialize','thinBottom','gameEnd','JSON','needsDummyWindow','innerHeight','3306720xaAMGp','ThinStyle','goldWindowRect','_duration','createActorMenuBackgroundImageSprite','isMainMenuCommandVisible','mobile','initialize','createCommandWindow','Step1End','MenuCommandForceShow','ARRAYFUNC','ConvertParams','item','1365536QpEWBU','callUpdateHelp','Scene_Menu_goldWindowRect','select','_playtimeText','svActorHorzCells','clearShowMainMenuCommand','goldWindowRectTopStyle','WindowRect','commandWindowStyle','adjustCommandHeightByVariable','_list','iconWidth','formation','canCreateVariableWindow','addOriginalCommands','forceEnableMainMenuCommand','save','forceDisable','mainMenuCoreSettings','addFormationCommand','onPersonalOk','drawItemStyleIconText','drawItemActorFace','open','commandNameWindowDrawBackground','95nAnDwR','icon','FontSize','initMainMenuCore'];_0x57f9=function(){return _0x5c4e4c;};return _0x57f9();}function Window_Playtime(){const _0xae5650=_0x302ee7;this[_0xae5650(0x217)](...arguments);}function _0x560e(_0x14593d,_0x3e9903){const _0x57f9eb=_0x57f9();return _0x560e=function(_0x560e9c,_0x5d61c1){_0x560e9c=_0x560e9c-0x129;let _0x1392d3=_0x57f9eb[_0x560e9c];return _0x1392d3;},_0x560e(_0x14593d,_0x3e9903);}Window_Playtime[_0x302ee7(0x1bb)]=Object[_0x302ee7(0x285)](Window_Selectable[_0x302ee7(0x1bb)]),Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x190)]=Window_Playtime,Window_Playtime['prototype'][_0x302ee7(0x217)]=function(_0x4bbb30){const _0xd23ed9=_0x302ee7;this[_0xd23ed9(0x222)]=$gameSystem[_0xd23ed9(0x1c2)](),this['_timer']=0x3c,Window_Selectable[_0xd23ed9(0x1bb)][_0xd23ed9(0x217)][_0xd23ed9(0x17e)](this,_0x4bbb30),this[_0xd23ed9(0x2aa)]();},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x1d1)]=function(){const _0x487d4e=_0x302ee7;return this[_0x487d4e(0x268)]();},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x16f)]=function(){const _0x40e469=_0x302ee7;Window_Selectable[_0x40e469(0x1bb)][_0x40e469(0x16f)][_0x40e469(0x17e)](this),this['updateTimer']();},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x29f)]=function(){const _0x4d4716=_0x302ee7;if(this[_0x4d4716(0x299)]-->0x0){if(this['_timer']<=0x0)this[_0x4d4716(0x2aa)]();}},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x2aa)]=function(){const _0xdbb467=_0x302ee7;this['_timer']=0x3c;const _0x1ef2bf=this[_0xdbb467(0x1f4)](0x0),_0x3c69ad=_0x1ef2bf['x'],_0x21e669=_0x1ef2bf['y'],_0x30f947=_0x1ef2bf[_0xdbb467(0x282)];this['contents']['clear'](),this['drawTimeIcon'](_0x1ef2bf),this[_0xdbb467(0x1fe)](_0x1ef2bf),this[_0xdbb467(0x1b0)](_0x1ef2bf);},Window_Playtime['prototype'][_0x302ee7(0x254)]=function(){const _0x335e0d=_0x302ee7;Window_Selectable['prototype']['resetFontSettings'][_0x335e0d(0x17e)](this),this['contents']['fontSize']=VisuMZ[_0x335e0d(0x1c8)]['Settings']['Playtime'][_0x335e0d(0x23a)];},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x1f5)]=function(_0x39171b){const _0x29e05e=_0x302ee7;if(VisuMZ[_0x29e05e(0x1c8)]['Settings'][_0x29e05e(0x28a)][_0x29e05e(0x14f)]>0x0){const _0x1a11d8=VisuMZ['MainMenuCore'][_0x29e05e(0x292)][_0x29e05e(0x28a)]['Icon'],_0x20fd16=_0x39171b['y']+(this[_0x29e05e(0x268)]()-ImageManager[_0x29e05e(0x19d)])/0x2;this[_0x29e05e(0x2a7)](_0x1a11d8,_0x39171b['x'],_0x20fd16);const _0x4a42c5=ImageManager[_0x29e05e(0x22a)]+0x4;_0x39171b['x']+=_0x4a42c5,_0x39171b[_0x29e05e(0x282)]-=_0x4a42c5;}},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x1fe)]=function(_0x4207c8){const _0x33f217=_0x302ee7;this[_0x33f217(0x254)](),this[_0x33f217(0x23c)](ColorManager[_0x33f217(0x271)]());const _0x28596e=VisuMZ[_0x33f217(0x1c8)][_0x33f217(0x292)][_0x33f217(0x28a)][_0x33f217(0x164)];this[_0x33f217(0x138)](_0x28596e,_0x4207c8['x'],_0x4207c8['y'],_0x4207c8[_0x33f217(0x282)],_0x33f217(0x152)),this[_0x33f217(0x154)]();},Window_Playtime[_0x302ee7(0x1bb)][_0x302ee7(0x1b0)]=function(_0x558df7){const _0x271488=_0x302ee7,_0x39bf73=$gameSystem[_0x271488(0x1c2)]();this[_0x271488(0x138)](_0x39bf73,_0x558df7['x'],_0x558df7['y'],_0x558df7[_0x271488(0x282)],_0x271488(0x1c7));};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables[_0x302ee7(0x1bb)]=Object[_0x302ee7(0x285)](Window_Selectable['prototype']),Window_MenuVariables['prototype']['constructor']=Window_MenuVariables,Window_MenuVariables['prototype']['initialize']=function(_0x348866){const _0x29aae0=_0x302ee7;Window_Selectable[_0x29aae0(0x1bb)][_0x29aae0(0x217)][_0x29aae0(0x17e)](this,_0x348866),this[_0x29aae0(0x1ed)]=VisuMZ[_0x29aae0(0x1c8)][_0x29aae0(0x292)][_0x29aae0(0x13d)][_0x29aae0(0x269)],this[_0x29aae0(0x2aa)]();},Window_MenuVariables[_0x302ee7(0x1bb)]['itemHeight']=function(){const _0x56bac1=_0x302ee7;return this[_0x56bac1(0x268)]();},Window_MenuVariables[_0x302ee7(0x1bb)][_0x302ee7(0x283)]=function(){const _0x5aaa43=_0x302ee7,_0xc7aa77=SceneManager[_0x5aaa43(0x1ae)][_0x5aaa43(0x227)]();return _0xc7aa77===_0x5aaa43(0x135)?0x1:VisuMZ[_0x5aaa43(0x1c8)][_0x5aaa43(0x292)][_0x5aaa43(0x13d)][_0x5aaa43(0x269)][_0x5aaa43(0x1a7)];},Window_MenuVariables[_0x302ee7(0x1bb)][_0x302ee7(0x254)]=function(){const _0x50a211=_0x302ee7;Window_Selectable[_0x50a211(0x1bb)][_0x50a211(0x254)]['call'](this),this[_0x50a211(0x17c)]['fontSize']=VisuMZ[_0x50a211(0x1c8)][_0x50a211(0x292)][_0x50a211(0x13d)][_0x50a211(0x23a)],this[_0x50a211(0x23c)](ColorManager[_0x50a211(0x271)]());},Window_MenuVariables['prototype'][_0x302ee7(0x1a9)]=function(){const _0x42ebd7=_0x302ee7;return this[_0x42ebd7(0x1ed)][_0x42ebd7(0x1a7)];},Window_MenuVariables['prototype'][_0x302ee7(0x179)]=function(){const _0x582f81=_0x302ee7,_0x18f642=this['topIndex']();for(let _0x3cd033=0x0;_0x3cd033<this['maxVisibleItems']();_0x3cd033++){const _0x268b4e=_0x18f642+_0x3cd033;_0x268b4e<this['maxItems']()&&(this[_0x582f81(0x148)](_0x268b4e),this['drawItem'](_0x268b4e));}},Window_MenuVariables[_0x302ee7(0x1bb)][_0x302ee7(0x148)]=function(_0x3b6903){},Window_MenuVariables['prototype'][_0x302ee7(0x1ba)]=function(_0x259e6c){const _0x4fb63a=_0x302ee7,_0x1fee6d=this[_0x4fb63a(0x1ed)][_0x259e6c];if(_0x1fee6d<=0x0)return;if(!$dataSystem[_0x4fb63a(0x1da)][_0x1fee6d])return;const _0x4727c4=this[_0x4fb63a(0x1f4)](_0x259e6c);this[_0x4fb63a(0x254)]();let _0x5c8c56=0x0,_0x18bd36=$dataSystem[_0x4fb63a(0x1da)][_0x1fee6d][_0x4fb63a(0x19a)]();_0x18bd36[_0x4fb63a(0x208)](/\\I\[(\d+)\]/i)&&(_0x5c8c56=Number(RegExp['$1']),_0x18bd36=_0x18bd36[_0x4fb63a(0x1b3)](/\\I\[(\d+)\]/i,'')[_0x4fb63a(0x19a)]());if(_0x5c8c56>0x0){const _0x1e6143=_0x4727c4['y']+(this[_0x4fb63a(0x268)]()-ImageManager[_0x4fb63a(0x19d)])/0x2;this[_0x4fb63a(0x2a7)](_0x5c8c56,_0x4727c4['x'],_0x1e6143);const _0x3d8400=ImageManager[_0x4fb63a(0x22a)]+0x4;_0x4727c4['x']+=_0x3d8400,_0x4727c4[_0x4fb63a(0x282)]-=_0x3d8400;}this[_0x4fb63a(0x138)](_0x18bd36,_0x4727c4['x'],_0x4727c4['y'],_0x4727c4[_0x4fb63a(0x282)],'left'),this[_0x4fb63a(0x23c)](ColorManager[_0x4fb63a(0x240)]()),this['drawText']($gameVariables[_0x4fb63a(0x16c)](_0x1fee6d),_0x4727c4['x'],_0x4727c4['y'],_0x4727c4[_0x4fb63a(0x282)],_0x4fb63a(0x1c7));};