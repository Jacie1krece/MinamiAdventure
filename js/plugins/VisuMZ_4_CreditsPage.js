//=============================================================================
// VisuStella MZ - Credits Page
// VisuMZ_4_CreditsPage.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CreditsPage = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CreditsPage = VisuMZ.CreditsPage || {};
VisuMZ.CreditsPage.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [CreditsPage]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a 'Credits' command to the title screen and Main Menu scene
 * that will bring up a scene with a credits page made the way you want. Both
 * categories and text codes can be used for the credits page to allow for more
 * customization options.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds "Credits" to the Title and/or Main Menu command windows.
 * * Create any number of credits categories to display names in.
 * * Credits pages can use text codes to allow for lots of customization.
 * * Normal scrolling and fast scrolling can be done with the keyboard.
 * * Mouse scrolling is also possible via touch controls.
 * * Access the "Credits" page from the game via Plugin Command.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * === Scene Plugin Commands ===
 * 
 * ---
 *
 * Scene: Open Credits Page
 * - Opens Credits Page.
 * - CANNOT be used inside of battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Credits Page in Menu?
 * - Enables/disables Credits Page inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Credits Page inside the main menu.
 *
 * ---
 *
 * System: Show Credits Page in Menu?
 * - Shows/hides Credits Page inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Credits Page inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Credits Categories Settings
 * ============================================================================
 *
 * Categories used for the various credits displayed.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - The name of this category when displayed.
 * 
 *   Icon:
 *   - Icon used for this category.
 *   - Use 0 for no icon.
 * 
 *   Credits Text:
 *   - Text displayed for this category.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Credits Page' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Credits Page' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Credits Page' option to the Main Menu by default?
 * 
 *   Show in Title Command?:
 *   - Add 'Credits Page' the Title Command Window?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CreditsPage.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * Button Assist Window
 * 
 *   Slow Scroll:
 *   - Text used for slow scrolling.
 * 
 *   Fast Scroll:
 *   - Text used for fast scrolling.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you adjust the windows displayed for this plugin.
 *
 * ---
 *
 * Window_CreditsCategory
 * 
 *   Style:
 *   - How do you wish to draw commands for this window?
 *     - Text Only
 *     - Icon Only
 *     - Icon + Text
 *     - Automatic
 * 
 *   Text Align:
 *   - Text alignment for this window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_CreditsDisplay
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *     Buffers > Top Buffer:
 *     Buffers > Bottom Buffer:
 *     - How many lines should the top/bottom be buffered from?
 * 
 *   Center Width:
 *   - What's the center width for the text?
 *   - Use 0 for the full window width.
 * 
 *     Scrolling > Slow > Scroll Speed:
 *     - What speed will Up/Down scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Scrolling > Slow > Sound Frequency:
 *     - How frequent will Up/Down scrolling make sounds?
 *     - Lower is quicker. Higher is later.
 * 
 *     Scrolling > Fast > Scroll Speed:
 *     - What speed will PageUp/PageDn scroll the window at?
 *     - Lower is slower. Higher is faster.
 * 
 *     Scrolling > Fast > Sound Frequency:
 *     - How frequent will PageUp/PageDn scrolling make sounds?
 *     - Lower is quicker. Higher is later.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.01: February 16, 2023
 * * Feature Update!
 * ** Added arrows to the windows to indicate scrollability. Update by Irina.
 * 
 * Version 1.00 Official Release Date: December 19, 2022
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
 * @command SceneOpenCreditsPage
 * @text Scene: Open Credits Page
 * @desc Opens Credits Page.
 * CANNOT be used inside of battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableCreditsPageMenu
 * @text System: Enable Credits Page in Menu?
 * @desc Enables/disables Credits Page inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Credits Page inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCreditsPageMenu
 * @text System: Show Credits Page in Menu?
 * @desc Shows/hides Credits Page inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Credits Page inside the main menu.
 * @default true
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
 * @param CreditsPage
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Credits:arraystruct
 * @text Credits Categories
 * @type struct<Credits>[]
 * @desc Categories used for the various credits displayed.
 * @default ["{\"Name:str\":\"Production\",\"Icon:num\":\"87\",\"Text:json\":\"\\\"\\\\\\\\c[6]Producer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Scenario Writer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Marketing Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Publisher\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Software Provided By\\\\\\\\c[0]\\\\n\\\\\\\\{Yoji Ojima\\\\\\\\}\\\\n\\\\\\\\{Enterbrain\\\\\\\\}\\\\n\\\\\\\\{Kadokawa\\\\\\\\}\\\\n\\\\\\\\{Gotcha Gotcha Games\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Cast\",\"Icon:num\":\"82\",\"Text:json\":\"\\\"\\\\\\\\c[6]Main Cast\\\\\\\\c[0]\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Supporting Cast\\\\\\\\c[0]\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{\\\\\\\\c[5]CHARACTER NAME\\\\\\\\c[0]\\\\\\\\} \\\\\\\\px[400]\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Graphics\",\"Icon:num\":\"70\",\"Text:json\":\"\\\"\\\\\\\\c[6]Art Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Character Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Map Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Monster Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Pixel Artist\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Background Illustrator\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]UI Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]CG Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]VFX Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Sound\",\"Icon:num\":\"80\",\"Text:json\":\"\\\"\\\\\\\\c[6]Music Composer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Sound Artist\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Audio Design\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Programmers\",\"Icon:num\":\"83\",\"Text:json\":\"\\\"\\\\\\\\c[6]Main Programmer\\\\\\\\c[0]\\\\n\\\\\\\\{Yoji Ojima\\\\\\\\} - RPG Maker MZ\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Gameplay Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Battle Designer\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]UX Director\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[24]VisuStella MZ\\\\\\\\c[0]\\\\n\\\\\\\\{Yanfly\\\\\\\\}\\\\n\\\\\\\\{Arisu\\\\\\\\}\\\\n\\\\\\\\{Olivia\\\\\\\\}\\\\n\\\\\\\\{Irina\\\\\\\\}\\\\n\\\\n\\\\n\\\\n\\\\\\\\c[6]Other Plugins\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}","{\"Name:str\":\"Special\",\"Icon:num\":\"79\",\"Text:json\":\"\\\"\\\\\\\\c[6]Special Thanks\\\\\\\\c[0]\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\\\\\{INSERT NAME\\\\\\\\}\\\\n\\\\n\\\\n\\\"\"}"]
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Credits Page.
 * @default {"Name:str":"Credits","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true","ShowTitleCommand:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_CreditsPage.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"ButtonAssist":"","SlowScroll:str":"Scroll","FastScroll:str":"Fast Scroll"}
 *
 * @param Window:struct
 * @text Windows Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"CategoryWindow":"","CategoryWindow_Style:str":"auto","CategoryWindow_TextAlign:str":"center","CategoryWindow_BgType:num":"0","CategoryWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DisplayWindow":"","DisplayWindow_BgType:num":"0","DisplayWindow_CenterWidth:num":"816","Scrolling":"","Slow":"","SlowScrollSpeed:num":"8","SlowSoundFreq:num":"8","Fast":"","FastScrollSpeed:num":"32","FastSoundFreq:num":"4","DisplayWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","DisplayWindow_Buffers":"","DisplayWindow_BufferTop:num":"1","DisplayWindow_BufferBottom:num":"1"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Credits:
 *
 * @param Name:str
 * @text Category Name
 * @desc The name of this category when displayed.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param Text:json
 * @text Credits Text
 * @type note
 * @desc Text displayed for this category.
 * Text codes allowed.
 * @default "Test1\nTest2\nTest3"
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Credits' option in the Main Menu.
 * @default Credits
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Credits' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Credits' option to the Main Menu by default?
 * @default true
 *
 * @param ShowTitleCommand:eval
 * @text Show in Title Command?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add 'Credits Page' the Title Command Window?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @require 1
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @require 1
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param SlowScroll:str
 * @text Slow Scroll
 * @parent ButtonAssist
 * @desc Text used for slow scrolling.
 * @default Scroll
 *
 * @param FastScroll:str
 * @text Fast Scroll
 * @parent ButtonAssist
 * @desc Text used for fast scrolling.
 * @default Fast Scroll
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CategoryWindow
 * @text Window_CreditsCategory
 *
 * @param CategoryWindow_Style:str
 * @text Style
 * @parent CategoryWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands for this window?
 * @default auto
 *
 * @param CategoryWindow_TextAlign:str
 * @text Text Align
 * @parent CategoryWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for this window?
 * @default center
 *
 * @param CategoryWindow_BgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DisplayWindow
 * @text Window_CreditsDisplay
 *
 * @param DisplayWindow_BgType:num
 * @text Background Type
 * @parent DisplayWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 * 
 * @param DisplayWindow_Buffers
 * @text Buffers
 * @parent DisplayWindow
 *
 * @param DisplayWindow_BufferTop:num
 * @text Top Buffer
 * @parent DisplayWindow_Buffers
 * @type number
 * @desc How many lines should the top be buffered from?
 * @default 1
 *
 * @param DisplayWindow_BufferBottom:num
 * @text Bottom Buffer
 * @parent DisplayWindow_Buffers
 * @type number
 * @desc How many lines should the bottom be buffered from?
 * @default 1
 *
 * @param DisplayWindow_CenterWidth:num
 * @text Center Width
 * @parent DisplayWindow
 * @type number
 * @desc What's the center width for the text?
 * Use 0 for the full window width.
 * @default 816
 *
 * @param Scrolling
 * @parent DisplayWindow
 *
 * @param Slow
 * @parent Scrolling
 *
 * @param SlowScrollSpeed:num
 * @text Scroll Speed
 * @parent Slow
 * @type number
 * @min 1
 * @desc What speed will Up/Down scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 8
 *
 * @param SlowSoundFreq:num
 * @text Sound Frequency
 * @parent Slow
 * @type number
 * @min 1
 * @desc How frequent will Up/Down scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 8
 *
 * @param Fast
 * @parent Scrolling
 *
 * @param FastScrollSpeed:num
 * @text Scroll Speed
 * @parent Fast
 * @type number
 * @min 1
 * @desc What speed will PageUp/PageDn scroll the window at?
 * Lower is slower. Higher is faster.
 * @default 32
 *
 * @param FastSoundFreq:num
 * @text Sound Frequency
 * @parent Fast
 * @type number
 * @min 1
 * @desc How frequent will PageUp/PageDn scrolling make sounds?
 * Lower is quicker. Higher is later.
 * @default 4
 *
 * @param DisplayWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DisplayWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0xb76a9c=_0x4883;function _0x4883(_0x25981f,_0x119e14){const _0xdb4742=_0xdb47();return _0x4883=function(_0x48835b,_0x49a2b8){_0x48835b=_0x48835b-0x76;let _0x251c3d=_0xdb4742[_0x48835b];return _0x251c3d;},_0x4883(_0x25981f,_0x119e14);}(function(_0x1295c3,_0x2d2a7e){const _0xb43da1=_0x4883,_0x112022=_0x1295c3();while(!![]){try{const _0x5f4f48=parseInt(_0xb43da1(0xae))/0x1*(-parseInt(_0xb43da1(0x92))/0x2)+parseInt(_0xb43da1(0x156))/0x3*(-parseInt(_0xb43da1(0x114))/0x4)+-parseInt(_0xb43da1(0x8b))/0x5*(-parseInt(_0xb43da1(0xe4))/0x6)+-parseInt(_0xb43da1(0x176))/0x7+-parseInt(_0xb43da1(0x9a))/0x8+parseInt(_0xb43da1(0xb0))/0x9+parseInt(_0xb43da1(0x10a))/0xa;if(_0x5f4f48===_0x2d2a7e)break;else _0x112022['push'](_0x112022['shift']());}catch(_0x35fcb5){_0x112022['push'](_0x112022['shift']());}}}(_0xdb47,0x8504b));var label=_0xb76a9c(0xc4),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xb76a9c(0x127)](function(_0x4d6572){const _0x2c888d=_0xb76a9c;return _0x4d6572['status']&&_0x4d6572[_0x2c888d(0x169)][_0x2c888d(0x134)]('['+label+']');})[0x0];function _0xdb47(){const _0x71949c=['createContents','DisplayWindow_BgType','commandName','addOriginalCommands','isCommandEnabled','Window','SLOW_SOUND_FREQUENCY','BgFilename2','CreditsPageFastScroll','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','icon','filter','qVuBY','commandStyleCheck','SlowSoundFreq','constructor','shown','TEXT_ALIGN','commandCreditsPage','isTriggered','toUpperCase','_allTextHeight','setDisplayWindow','Credits','includes','wNUoq','_commandNameWindow','initialize','isUseModernControls','origin','addLoadListener','VisuMZ_1_MessageCore','oSeEz','replace','categoryWindowRect','resetFontSettings','CreditsPageScroll','centerSprite','ShowMainMenu','makeCommandList','SlowScroll','enabled','ARRAYFUNC','mainAreaHeight','close','calcWindowHeight','drawMessageText','SlowScrollSpeed','innerWidth','ARRAYJSON','DisplayWindow_BufferBottom','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','maxItems','setScrollAccel','Settings','cancel','createBackground','min','6XbiUYN','getBackgroundOpacity','_categoryWindow','Name','isCreditsPageCommandEnabled','currentExt','maxCols','pageup','ARRAYSTRUCT','_scene','itemTextAlign','parse','version','uOtle','commandNameWindowDrawText','callUpdateHelp','drawTextEx','bind','clear','description','end','VyykM','SLOW_SCROLL_SPEED','createCommandNameWindow','FRRLO','updateOrigin','_textWindow','_category','findSymbol','parameters','downArrowVisible','STRUCT','2722384orIEKp','updateArrows','exit','createTextWindow','SystemShowCreditsPageMenu','_CreditsPage_MainMenu','LaIoi','MainMenu','setBackgroundType','ZaWRu','tNACG','addChild','CategoryWindow_RectJS','setCategory','Game_System_initialize','scrollToBottom','Window_TitleCommand_makeCommandList','CJvit','prototype','_backSprite2','DisplayWindow_BufferTop','drawText','commandNameWindowCenter','5CCaxEl','adjustSprite','SceneOpenCreditsPage','Vocab','CENTER_WIDTH','isMainMenuCreditsPageEnabled','options','4OnRGxJ','iconWidth','addCreditsPageCommandAutomatically','creditsPage','max','ywbDL','Text','addCommand','157952gAKpGm','Window_MenuCommand_addOriginalCommands','BgSettings','processFastScroll','CREDITS_ADD_COMMAND','FAST_SCROLL_SPEED','SystemEnableCreditsPageMenu','map','right','create','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DEymV','qVmAg','\x5cI[%1]%2','scrollToTop','match','STR','pop','FastSoundFreq','BtPwo','68606VWIZsg','lineHeight','4244733bgGyui','ARRAYSTR','width','llBho','CategoryWindow_TextAlign','playCursorSound','COMMAND_STYLE','auto','frameCount','initCreditsPageMainMenu','Scene_Menu_createCommandWindow','EnableMainMenu','helpAreaHeight','Dfpjx','format','createCommandWindow','commandNameWindowDrawBackground','drawAllText','NyWXd','addWindow','CreditsPage','CategoryWindow_BgType','contents','TOP_LINE_BUFFER','_commandWindow','length','_backSprite1','ARRAYEVAL','push','contentsHeight','isSceneBattle','text','drawIcon','floor','activate','UYlgT','FUNC','setHandler','registerCommand','isPressed','innerHeight','_list','commandStyle','bitmap','createCategoryWindow','opacity','getInputMultiButtonStrings','ARRAYNUM','index','tDxPV','addCreditsPageCommand','itemLineRect','1967286zKUAVg','isCreditsPageCommandVisible','buttonAssistKey4','ConvertParams','drawItem','SLkCu','EVAL','call','Enable','clamp','name','textWindowRect','refresh','buttonAssistText3','CreditsPageMenuCommand','buttonAssistKey3','FAST_SOUND_FREQUENCY','setMainMenuCreditsPageVisible','ShowTitleCommand','VisuMZ_1_MainMenuCore','center','loadTitle2','SnapshotOpacity','gOoWm','active','fBiHO','upArrowVisible','changePaintOpacity','playOkSound','calculateTextHeight','home','processSlowScroll','drawItemStyleIcon','windowPadding','Scene_Title_createCommandWindow','pagedown','BG_TYPE','height','10698230CiNVnw','isAutoColorAffected','scaleSprite','setMainMenuCreditsPageEnabled','_displayWindow','drawItemStyleIconText','iconText','textSizeEx','down','updateCommandNameWindow','1557260HXCpby','JSON','smoothScrollBy','splice','BgFilename1','iconHeight','buttonAssistText1','updateDisplayWindow'];_0xdb47=function(){return _0x71949c;};return _0xdb47();}VisuMZ[label][_0xb76a9c(0x152)]=VisuMZ[label][_0xb76a9c(0x152)]||{},VisuMZ[_0xb76a9c(0xe7)]=function(_0x57aa8f,_0x2fe838){const _0x942eb6=_0xb76a9c;for(const _0x16ad07 in _0x2fe838){if(_0x942eb6(0xe9)!==_0x942eb6(0xa6)){if(_0x16ad07[_0x942eb6(0xa9)](/(.*):(.*)/i)){const _0x6c9f80=String(RegExp['$1']),_0x2e9fd7=String(RegExp['$2'])[_0x942eb6(0x130)]()['trim']();let _0x1cf8e9,_0x4f2433,_0x99b965;switch(_0x2e9fd7){case'NUM':_0x1cf8e9=_0x2fe838[_0x16ad07]!==''?Number(_0x2fe838[_0x16ad07]):0x0;break;case _0x942eb6(0xdf):_0x4f2433=_0x2fe838[_0x16ad07]!==''?JSON['parse'](_0x2fe838[_0x16ad07]):[],_0x1cf8e9=_0x4f2433[_0x942eb6(0xa1)](_0x2ec31a=>Number(_0x2ec31a));break;case _0x942eb6(0xea):_0x1cf8e9=_0x2fe838[_0x16ad07]!==''?eval(_0x2fe838[_0x16ad07]):null;break;case _0x942eb6(0xcb):_0x4f2433=_0x2fe838[_0x16ad07]!==''?JSON['parse'](_0x2fe838[_0x16ad07]):[],_0x1cf8e9=_0x4f2433[_0x942eb6(0xa1)](_0x49bf81=>eval(_0x49bf81));break;case _0x942eb6(0x115):_0x1cf8e9=_0x2fe838[_0x16ad07]!==''?JSON[_0x942eb6(0x161)](_0x2fe838[_0x16ad07]):'';break;case _0x942eb6(0x14d):_0x4f2433=_0x2fe838[_0x16ad07]!==''?JSON[_0x942eb6(0x161)](_0x2fe838[_0x16ad07]):[],_0x1cf8e9=_0x4f2433[_0x942eb6(0xa1)](_0x470224=>JSON[_0x942eb6(0x161)](_0x470224));break;case _0x942eb6(0xd4):_0x1cf8e9=_0x2fe838[_0x16ad07]!==''?new Function(JSON['parse'](_0x2fe838[_0x16ad07])):new Function('return\x200');break;case _0x942eb6(0x146):_0x4f2433=_0x2fe838[_0x16ad07]!==''?JSON[_0x942eb6(0x161)](_0x2fe838[_0x16ad07]):[],_0x1cf8e9=_0x4f2433[_0x942eb6(0xa1)](_0x1e6fa9=>new Function(JSON[_0x942eb6(0x161)](_0x1e6fa9)));break;case _0x942eb6(0xaa):_0x1cf8e9=_0x2fe838[_0x16ad07]!==''?String(_0x2fe838[_0x16ad07]):'';break;case _0x942eb6(0xb1):_0x4f2433=_0x2fe838[_0x16ad07]!==''?JSON['parse'](_0x2fe838[_0x16ad07]):[],_0x1cf8e9=_0x4f2433['map'](_0x359eeb=>String(_0x359eeb));break;case _0x942eb6(0x175):_0x99b965=_0x2fe838[_0x16ad07]!==''?JSON[_0x942eb6(0x161)](_0x2fe838[_0x16ad07]):{},_0x1cf8e9=VisuMZ[_0x942eb6(0xe7)]({},_0x99b965);break;case _0x942eb6(0x15e):_0x4f2433=_0x2fe838[_0x16ad07]!==''?JSON[_0x942eb6(0x161)](_0x2fe838[_0x16ad07]):[],_0x1cf8e9=_0x4f2433[_0x942eb6(0xa1)](_0x3e7684=>VisuMZ['ConvertParams']({},JSON['parse'](_0x3e7684)));break;default:continue;}_0x57aa8f[_0x6c9f80]=_0x1cf8e9;}}else this[_0x942eb6(0x103)](![]);}return _0x57aa8f;},(_0x56967b=>{const _0x25160b=_0xb76a9c,_0x28d70c=_0x56967b[_0x25160b(0xee)];for(const _0x264eb3 of dependencies){if(_0x25160b(0xc2)===_0x25160b(0xc2)){if(!Imported[_0x264eb3]){if(_0x25160b(0x7e)===_0x25160b(0x7e)){alert(_0x25160b(0x14f)[_0x25160b(0xbe)](_0x28d70c,_0x264eb3)),SceneManager['exit']();break;}else{let _0x5b81eb=this[_0x25160b(0x139)]['y'];this[_0x25160b(0x139)]['y']+=(_0x1be845?0x1:-0x1)*_0x34d959[_0x25160b(0x16c)];let _0x364a22=_0x94f545['max'](0x0,this['_allTextHeight']-this[_0x25160b(0xd8)]);this[_0x25160b(0x139)]['y']=this[_0x25160b(0x139)]['y'][_0x25160b(0xed)](0x0,_0x364a22);if(_0x5b81eb!==this[_0x25160b(0x139)]['y']&&_0xa6150d[_0x25160b(0xb8)]%_0x16de91['SLOW_SOUND_FREQUENCY']===0x0)this[_0x25160b(0xb5)]();}}}else _0x4c01f5=_0x25160b(0xa7)['format'](_0x3904fa,_0x3ca38b);}const _0x4ccbb4=_0x56967b[_0x25160b(0x169)];if(_0x4ccbb4[_0x25160b(0xa9)](/\[Version[ ](.*?)\]/i)){if(_0x25160b(0xfb)===_0x25160b(0xfb)){const _0x4b97c9=Number(RegExp['$1']);_0x4b97c9!==VisuMZ[label][_0x25160b(0x162)]&&(alert(_0x25160b(0xa4)['format'](_0x28d70c,_0x4b97c9)),SceneManager[_0x25160b(0x76)]());}else{if(_0x1f6969===this[_0x25160b(0x171)])return;this[_0x25160b(0x171)]=_0x36d161,this['refresh']();}}if(_0x4ccbb4[_0x25160b(0xa9)](/\[Tier[ ](\d+)\]/i)){const _0x20a2c1=Number(RegExp['$1']);if(_0x20a2c1<tier){if(_0x25160b(0x13c)===_0x25160b(0x13c))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x25160b(0xbe)](_0x28d70c,_0x20a2c1,tier)),SceneManager[_0x25160b(0x76)]();else{const _0x2bfeec=this['_category'][_0x25160b(0x98)];this[_0x25160b(0x13f)](),this[_0x25160b(0x14a)](_0x2bfeec);if(_0x356ad2[_0x25160b(0x13b)])this['resetWordWrap']();this['scrollToTop']();}}else tier=Math[_0x25160b(0x96)](_0x20a2c1,tier);}VisuMZ[_0x25160b(0xe7)](VisuMZ[label][_0x25160b(0x152)],_0x56967b[_0x25160b(0x173)]);})(pluginData),PluginManager[_0xb76a9c(0xd6)](pluginData['name'],_0xb76a9c(0x8d),_0x3290da=>{const _0x4955dc=_0xb76a9c;if(SceneManager[_0x4955dc(0xce)]())return;SceneManager[_0x4955dc(0xcc)](Scene_CreditsPage);}),PluginManager[_0xb76a9c(0xd6)](pluginData[_0xb76a9c(0xee)],_0xb76a9c(0xa0),_0x4c874e=>{const _0x28cd68=_0xb76a9c;VisuMZ[_0x28cd68(0xe7)](_0x4c874e,_0x4c874e),$gameSystem[_0x28cd68(0x10d)](_0x4c874e[_0x28cd68(0xec)]);}),PluginManager[_0xb76a9c(0xd6)](pluginData[_0xb76a9c(0xee)],_0xb76a9c(0x78),_0x1c7df7=>{const _0x386864=_0xb76a9c;VisuMZ[_0x386864(0xe7)](_0x1c7df7,_0x1c7df7),$gameSystem[_0x386864(0xf5)](_0x1c7df7['Show']);}),TextManager[_0xb76a9c(0xf2)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x7b)]['Name'],TextManager['CreditsPageScroll']=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x8e)][_0xb76a9c(0x144)],TextManager[_0xb76a9c(0x124)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)]['Vocab']['FastScroll'],SceneManager[_0xb76a9c(0xce)]=function(){const _0x13cf38=_0xb76a9c;return this[_0x13cf38(0x15f)]&&this[_0x13cf38(0x15f)][_0x13cf38(0x12b)]===Scene_Battle;},VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x82)]=Game_System[_0xb76a9c(0x86)][_0xb76a9c(0x137)],Game_System[_0xb76a9c(0x86)][_0xb76a9c(0x137)]=function(){const _0x1f727b=_0xb76a9c;VisuMZ[_0x1f727b(0xc4)][_0x1f727b(0x82)]['call'](this),this[_0x1f727b(0xb9)]();},Game_System[_0xb76a9c(0x86)][_0xb76a9c(0xb9)]=function(){const _0x440428=_0xb76a9c;this['_CreditsPage_MainMenu']={'shown':VisuMZ[_0x440428(0xc4)][_0x440428(0x152)][_0x440428(0x7b)][_0x440428(0x142)],'enabled':VisuMZ['CreditsPage'][_0x440428(0x152)][_0x440428(0x7b)][_0x440428(0xbb)]};},Game_System[_0xb76a9c(0x86)]['isMainMenuCreditsPageVisible']=function(){const _0xbda054=_0xb76a9c;if(this[_0xbda054(0x79)]===undefined)this[_0xbda054(0xb9)]();return this[_0xbda054(0x79)][_0xbda054(0x12c)];},Game_System[_0xb76a9c(0x86)][_0xb76a9c(0xf5)]=function(_0x3358bc){const _0x359419=_0xb76a9c;if(this[_0x359419(0x79)]===undefined)this[_0x359419(0xb9)]();this[_0x359419(0x79)]['shown']=_0x3358bc;},Game_System[_0xb76a9c(0x86)]['isMainMenuCreditsPageEnabled']=function(){const _0x102b94=_0xb76a9c;if(this[_0x102b94(0x79)]===undefined)this['initCreditsPageMainMenu']();return this[_0x102b94(0x79)]['enabled'];},Game_System['prototype'][_0xb76a9c(0x10d)]=function(_0x4d215c){const _0x422d33=_0xb76a9c;if(this[_0x422d33(0x79)]===undefined)this[_0x422d33(0xb9)]();this['_CreditsPage_MainMenu'][_0x422d33(0x145)]=_0x4d215c;},VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x106)]=Scene_Title[_0xb76a9c(0x86)][_0xb76a9c(0xbf)],Scene_Title[_0xb76a9c(0x86)]['createCommandWindow']=function(){const _0xc2ee2=_0xb76a9c;VisuMZ[_0xc2ee2(0xc4)][_0xc2ee2(0x106)][_0xc2ee2(0xeb)](this),this['_commandWindow']['setHandler'](_0xc2ee2(0x95),this[_0xc2ee2(0x12e)][_0xc2ee2(0x167)](this));},Scene_Title[_0xb76a9c(0x86)][_0xb76a9c(0x12e)]=function(){const _0x242b43=_0xb76a9c;this['_commandWindow'][_0x242b43(0x148)](),SceneManager[_0x242b43(0xcc)](Scene_CreditsPage);},VisuMZ['CreditsPage'][_0xb76a9c(0xba)]=Scene_Menu[_0xb76a9c(0x86)][_0xb76a9c(0xbf)],Scene_Menu[_0xb76a9c(0x86)][_0xb76a9c(0xbf)]=function(){const _0x36d53e=_0xb76a9c;VisuMZ[_0x36d53e(0xc4)][_0x36d53e(0xba)][_0x36d53e(0xeb)](this);const _0x308bfb=this[_0x36d53e(0xc8)];_0x308bfb[_0x36d53e(0xd5)]('creditsPage',this['commandCreditsPage'][_0x36d53e(0x167)](this));},Scene_Menu['prototype'][_0xb76a9c(0x12e)]=function(){const _0x3e1ed8=_0xb76a9c;SceneManager[_0x3e1ed8(0xcc)](Scene_CreditsPage);};function Scene_CreditsPage(){const _0x1f62db=_0xb76a9c;this[_0x1f62db(0x137)](...arguments);}Scene_CreditsPage[_0xb76a9c(0x86)]=Object[_0xb76a9c(0xa3)](Scene_MenuBase[_0xb76a9c(0x86)]),Scene_CreditsPage[_0xb76a9c(0x86)]['constructor']=Scene_CreditsPage,Scene_CreditsPage[_0xb76a9c(0x86)]['initialize']=function(){const _0x196136=_0xb76a9c;Scene_MenuBase[_0x196136(0x86)][_0x196136(0x137)][_0x196136(0xeb)](this);},Scene_CreditsPage[_0xb76a9c(0x86)][_0xb76a9c(0xbc)]=function(){return 0x0;},Scene_CreditsPage['prototype'][_0xb76a9c(0xa3)]=function(){const _0x3208e6=_0xb76a9c;Scene_MenuBase[_0x3208e6(0x86)]['create'][_0x3208e6(0xeb)](this),this[_0x3208e6(0xdc)](),this[_0x3208e6(0x77)]();},Scene_CreditsPage[_0xb76a9c(0x86)][_0xb76a9c(0xdc)]=function(){const _0x44384d=_0xb76a9c,_0x31e88e=this[_0x44384d(0x13e)](),_0x5b10c3=new Window_CreditsCategory(_0x31e88e);_0x5b10c3[_0x44384d(0xd5)](_0x44384d(0x153),this['popScene']['bind'](this)),this[_0x44384d(0xc3)](_0x5b10c3),this['_categoryWindow']=_0x5b10c3,_0x5b10c3[_0x44384d(0x7c)](Window_CreditsCategory[_0x44384d(0x108)]);},Scene_CreditsPage[_0xb76a9c(0x86)]['categoryWindowRect']=function(){const _0x23d3b5=_0xb76a9c;if(VisuMZ['CreditsPage'][_0x23d3b5(0x152)][_0x23d3b5(0x121)][_0x23d3b5(0x80)])return _0x23d3b5(0x135)!==_0x23d3b5(0x135)?![]:VisuMZ['CreditsPage'][_0x23d3b5(0x152)]['Window'][_0x23d3b5(0x80)][_0x23d3b5(0xeb)](this);const _0x1afb6e=Graphics['boxWidth'],_0xaad4c5=this['calcWindowHeight'](0x1,!![]),_0x47be2a=0x0,_0x1f7b9c=this['mainAreaTop']();return new Rectangle(_0x47be2a,_0x1f7b9c,_0x1afb6e,_0xaad4c5);},Scene_CreditsPage[_0xb76a9c(0x86)]['createTextWindow']=function(){const _0xcb8027=_0xb76a9c,_0x3b25ab=this[_0xcb8027(0xef)](),_0x430ab9=new Window_CreditsDisplay(_0x3b25ab);this[_0xcb8027(0xc3)](_0x430ab9),this[_0xcb8027(0x170)]=_0x430ab9,this[_0xcb8027(0x158)][_0xcb8027(0x132)](_0x430ab9),_0x430ab9[_0xcb8027(0x7c)](Window_CreditsDisplay[_0xcb8027(0x108)]);},Scene_CreditsPage[_0xb76a9c(0x86)]['textWindowRect']=function(){const _0xa1c70a=_0xb76a9c;if(VisuMZ['CreditsPage']['Settings'][_0xa1c70a(0x121)]['DisplayWindow_RectJS']){if('WAbsQ'!==_0xa1c70a(0x7d))return VisuMZ[_0xa1c70a(0xc4)][_0xa1c70a(0x152)][_0xa1c70a(0x121)]['DisplayWindow_RectJS'][_0xa1c70a(0xeb)](this);else{const _0x183dd0=this[_0xa1c70a(0x136)];_0x183dd0[_0xa1c70a(0xc6)][_0xa1c70a(0x168)]();const _0x5ee355=this['commandStyleCheck'](this['index']());if(_0x5ee355===_0xa1c70a(0x126)){const _0x4fd7ad=this[_0xa1c70a(0xe3)](this[_0xa1c70a(0xe0)]());let _0x563f29=this[_0xa1c70a(0x11e)](this['index']());_0x563f29=_0x563f29[_0xa1c70a(0x13d)](/\\I\[(\d+)\]/gi,''),_0x183dd0[_0xa1c70a(0x13f)](),this[_0xa1c70a(0xc0)](_0x563f29,_0x4fd7ad),this[_0xa1c70a(0x164)](_0x563f29,_0x4fd7ad),this['commandNameWindowCenter'](_0x563f29,_0x4fd7ad);}}}const _0x347a13=Graphics['boxWidth'],_0x560fad=this[_0xa1c70a(0x147)]()-this[_0xa1c70a(0x149)](0x1,!![]),_0x8ddb0d=0x0,_0x2d5e24=this['mainAreaTop']()+this[_0xa1c70a(0x149)](0x1,!![]);return new Rectangle(_0x8ddb0d,_0x2d5e24,_0x347a13,_0x560fad);},Scene_CreditsPage[_0xb76a9c(0x86)]['buttonAssistKey1']=function(){const _0x3beeb7=_0xb76a9c;return TextManager['getInputMultiButtonStrings'](_0x3beeb7(0x15d),_0x3beeb7(0x107));},Scene_CreditsPage['prototype'][_0xb76a9c(0xf3)]=function(){const _0x118fed=_0xb76a9c;return TextManager[_0x118fed(0xde)]('up',_0x118fed(0x112));},Scene_CreditsPage[_0xb76a9c(0x86)][_0xb76a9c(0xe6)]=function(){return'';},Scene_CreditsPage[_0xb76a9c(0x86)][_0xb76a9c(0x11a)]=function(){const _0x202627=_0xb76a9c;return TextManager[_0x202627(0x124)];},Scene_CreditsPage[_0xb76a9c(0x86)][_0xb76a9c(0xf1)]=function(){const _0x100794=_0xb76a9c;return TextManager[_0x100794(0x140)];},Scene_CreditsPage['prototype'][_0xb76a9c(0x154)]=function(){const _0x4ed093=_0xb76a9c;Scene_MenuBase['prototype'][_0x4ed093(0x154)][_0x4ed093(0xeb)](this),this['setBackgroundOpacity'](this[_0x4ed093(0x157)]()),this['createCustomBackgroundImages']();},Scene_CreditsPage[_0xb76a9c(0x86)][_0xb76a9c(0x157)]=function(){const _0x495ddc=_0xb76a9c;return VisuMZ['CreditsPage'][_0x495ddc(0x152)][_0x495ddc(0x9c)][_0x495ddc(0xfa)];},Scene_CreditsPage['prototype']['createCustomBackgroundImages']=function(){const _0x1ebe70=_0xb76a9c,_0x21cf5b=VisuMZ[_0x1ebe70(0xc4)][_0x1ebe70(0x152)][_0x1ebe70(0x9c)];_0x21cf5b&&(_0x21cf5b[_0x1ebe70(0x118)]!==''||_0x21cf5b[_0x1ebe70(0x123)]!=='')&&('WodCy'!=='gGkjf'?(this[_0x1ebe70(0xca)]=new Sprite(ImageManager['loadTitle1'](_0x21cf5b['BgFilename1'])),this[_0x1ebe70(0x87)]=new Sprite(ImageManager[_0x1ebe70(0xf9)](_0x21cf5b[_0x1ebe70(0x123)])),this[_0x1ebe70(0x7f)](this[_0x1ebe70(0xca)]),this[_0x1ebe70(0x7f)](this[_0x1ebe70(0x87)]),this[_0x1ebe70(0xca)][_0x1ebe70(0xdb)][_0x1ebe70(0x13a)](this[_0x1ebe70(0x8c)][_0x1ebe70(0x167)](this,this[_0x1ebe70(0xca)])),this[_0x1ebe70(0x87)][_0x1ebe70(0xdb)][_0x1ebe70(0x13a)](this[_0x1ebe70(0x8c)][_0x1ebe70(0x167)](this,this['_backSprite2']))):this[_0x1ebe70(0x79)]={'shown':_0x1aad20[_0x1ebe70(0xc4)]['Settings'][_0x1ebe70(0x7b)][_0x1ebe70(0x142)],'enabled':_0x4f5193[_0x1ebe70(0xc4)][_0x1ebe70(0x152)][_0x1ebe70(0x7b)]['EnableMainMenu']});},Scene_CreditsPage[_0xb76a9c(0x86)]['adjustSprite']=function(_0x38e40d){const _0x3097ff=_0xb76a9c;this[_0x3097ff(0x10c)](_0x38e40d),this[_0x3097ff(0x141)](_0x38e40d);},VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x9b)]=Window_MenuCommand['prototype'][_0xb76a9c(0x11f)],Window_MenuCommand[_0xb76a9c(0x86)]['addOriginalCommands']=function(){const _0x3e0e2d=_0xb76a9c;VisuMZ[_0x3e0e2d(0xc4)]['Window_MenuCommand_addOriginalCommands'][_0x3e0e2d(0xeb)](this),this[_0x3e0e2d(0xe2)]();},Window_MenuCommand['prototype'][_0xb76a9c(0xe2)]=function(){const _0x43c862=_0xb76a9c;if(!this[_0x43c862(0x94)]())return;if(!this[_0x43c862(0xe5)]())return;const _0x2e28ed=TextManager['CreditsPageMenuCommand'],_0x1be968=this['isCreditsPageCommandEnabled']();this[_0x43c862(0x99)](_0x2e28ed,_0x43c862(0x95),_0x1be968);},Window_MenuCommand[_0xb76a9c(0x86)][_0xb76a9c(0x94)]=function(){const _0x1beba7=_0xb76a9c;return Imported[_0x1beba7(0xf7)]?![]:!![];},Window_MenuCommand[_0xb76a9c(0x86)]['isCreditsPageCommandVisible']=function(){return $gameSystem['isMainMenuCreditsPageVisible']();},Window_MenuCommand[_0xb76a9c(0x86)][_0xb76a9c(0x15a)]=function(){const _0x5c39a2=_0xb76a9c;return $gameSystem[_0x5c39a2(0x90)]();},Window_TitleCommand[_0xb76a9c(0x9e)]=VisuMZ[_0xb76a9c(0xc4)]['Settings'][_0xb76a9c(0x7b)][_0xb76a9c(0xf6)],VisuMZ[_0xb76a9c(0xc4)]['Window_TitleCommand_makeCommandList']=Window_TitleCommand['prototype'][_0xb76a9c(0x143)],Window_TitleCommand['prototype'][_0xb76a9c(0x143)]=function(){const _0x29e96b=_0xb76a9c;VisuMZ['CreditsPage'][_0x29e96b(0x84)][_0x29e96b(0xeb)](this),this['addCreditsCommand']();},Window_TitleCommand[_0xb76a9c(0x86)]['addCreditsCommand']=function(){const _0x345c56=_0xb76a9c;if(!Window_TitleCommand[_0x345c56(0x9e)])return;if(this[_0x345c56(0x172)]('creditsPage')>=0x0)return;const _0x2f07a3=TextManager[_0x345c56(0xf2)],_0x178a91=!![];this[_0x345c56(0x99)](_0x2f07a3,_0x345c56(0x95),_0x178a91);const _0x2aa3a9=this[_0x345c56(0x172)](_0x345c56(0x91));if(_0x2aa3a9>0x0){const _0x38e95c=this[_0x345c56(0xd9)][_0x345c56(0xab)]();this[_0x345c56(0xd9)][_0x345c56(0x117)](_0x2aa3a9,0x0,_0x38e95c);}};function Window_CreditsCategory(){const _0x128c70=_0xb76a9c;this[_0x128c70(0x137)](...arguments);}Window_CreditsCategory[_0xb76a9c(0x86)]=Object[_0xb76a9c(0xa3)](Window_HorzCommand[_0xb76a9c(0x86)]),Window_CreditsCategory[_0xb76a9c(0x86)]['constructor']=Window_CreditsCategory,Window_CreditsCategory[_0xb76a9c(0x108)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x121)][_0xb76a9c(0xc5)],Window_CreditsCategory[_0xb76a9c(0x12d)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)]['Window'][_0xb76a9c(0xb4)],Window_CreditsCategory[_0xb76a9c(0xb6)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x121)]['CategoryWindow_Style'],Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x137)]=function(_0x5f27ae){const _0x3544e6=_0xb76a9c;Window_HorzCommand[_0x3544e6(0x86)][_0x3544e6(0x137)][_0x3544e6(0xeb)](this,_0x5f27ae),this[_0x3544e6(0x16d)](_0x5f27ae);},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x165)]=function(){const _0xaf9155=_0xb76a9c;Window_Command[_0xaf9155(0x86)][_0xaf9155(0x165)]['call'](this);if(this[_0xaf9155(0x136)])this[_0xaf9155(0x113)]();if(this['_displayWindow'])this[_0xaf9155(0x11b)]();},Window_CreditsCategory['prototype'][_0xb76a9c(0x15c)]=function(){const _0x25d08b=_0xb76a9c;return VisuMZ[_0x25d08b(0xc4)][_0x25d08b(0x152)][_0x25d08b(0x133)][_0x25d08b(0xc9)];},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x138)]=function(){return![];},Window_CreditsCategory['prototype']['isHoverEnabled']=function(){return![];},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x100)]=function(){},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x132)]=function(_0x2a6d16){const _0x2259fc=_0xb76a9c;this[_0x2259fc(0x10e)]=_0x2a6d16,this['updateDisplayWindow']();},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x11b)]=function(){const _0x19617b=_0xb76a9c;if(!this[_0x19617b(0x10e)])return;this[_0x19617b(0x10e)]['setCategory'](this[_0x19617b(0x15b)]());},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x16d)]=function(_0x3e3b32){const _0x4f7a4d=_0xb76a9c,_0x420ebe=new Rectangle(0x0,0x0,_0x3e3b32[_0x4f7a4d(0xb2)],_0x3e3b32[_0x4f7a4d(0x109)]);this['_commandNameWindow']=new Window_Base(_0x420ebe),this[_0x4f7a4d(0x136)][_0x4f7a4d(0xdd)]=0x0,this[_0x4f7a4d(0x7f)](this[_0x4f7a4d(0x136)]),this[_0x4f7a4d(0x113)]();},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x113)]=function(){const _0x291dd1=_0xb76a9c,_0x35ce70=this[_0x291dd1(0x136)];_0x35ce70['contents']['clear']();const _0x53f73f=this[_0x291dd1(0x129)](this['index']());if(_0x53f73f===_0x291dd1(0x126)){if(_0x291dd1(0xad)!==_0x291dd1(0x97)){const _0x12bfdd=this[_0x291dd1(0xe3)](this[_0x291dd1(0xe0)]());let _0x4f0906=this[_0x291dd1(0x11e)](this[_0x291dd1(0xe0)]());_0x4f0906=_0x4f0906['replace'](/\\I\[(\d+)\]/gi,''),_0x35ce70[_0x291dd1(0x13f)](),this[_0x291dd1(0xc0)](_0x4f0906,_0x12bfdd),this[_0x291dd1(0x164)](_0x4f0906,_0x12bfdd),this[_0x291dd1(0x8a)](_0x4f0906,_0x12bfdd);}else _0x3bd09a[_0x291dd1(0xc4)]['Scene_Title_createCommandWindow']['call'](this),this[_0x291dd1(0xc8)][_0x291dd1(0xd5)](_0x291dd1(0x95),this[_0x291dd1(0x12e)][_0x291dd1(0x167)](this));}},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0xc0)]=function(_0x238ec7,_0x2e6ca9){},Window_CreditsCategory['prototype'][_0xb76a9c(0x164)]=function(_0x40f2fe,_0x27ac8b){const _0x2a9d80=_0xb76a9c,_0x10d157=this[_0x2a9d80(0x136)];_0x10d157[_0x2a9d80(0x89)](_0x40f2fe,0x0,_0x27ac8b['y'],_0x10d157['innerWidth'],_0x2a9d80(0xf8));},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x8a)]=function(_0x1c017a,_0x42ffe9){const _0x5292af=_0xb76a9c,_0x536b3a=this[_0x5292af(0x136)],_0xb0926a=$gameSystem[_0x5292af(0x105)](),_0xc4b312=_0x42ffe9['x']+Math[_0x5292af(0xd1)](_0x42ffe9[_0x5292af(0xb2)]/0x2)+_0xb0926a;_0x536b3a['x']=_0x536b3a[_0x5292af(0xb2)]/-0x2+_0xc4b312,_0x536b3a['y']=Math[_0x5292af(0xd1)](_0x42ffe9[_0x5292af(0x109)]/0x2);},Window_CreditsCategory[_0xb76a9c(0x86)]['makeCommandList']=function(){const _0x2c1696=_0xb76a9c,_0x260c71=VisuMZ[_0x2c1696(0xc4)][_0x2c1696(0x152)]['Credits'];for(const _0x1871df of _0x260c71){const _0x4a8e8f='category',_0x235536=_0x1871df['Icon']||0x0;let _0x59a3b7=_0x1871df[_0x2c1696(0x159)];_0x235536>0x0&&this['commandStyle']()!==_0x2c1696(0xcf)&&(_0x59a3b7=_0x2c1696(0xa7)['format'](_0x235536,_0x59a3b7)),this[_0x2c1696(0x99)](_0x59a3b7,_0x4a8e8f,!![],_0x1871df);}},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x160)]=function(){const _0x402c43=_0xb76a9c;return Window_CreditsCategory[_0x402c43(0x12d)];},Window_CreditsCategory[_0xb76a9c(0x86)]['drawItem']=function(_0xb33907){const _0x53100a=_0xb76a9c,_0x41dda7=this['commandStyleCheck'](_0xb33907);if(_0x41dda7==='iconText'){if(_0x53100a(0x16e)!==_0x53100a(0xfd))this[_0x53100a(0x10f)](_0xb33907);else return _0x1f5bf2['CreditsPageScroll'];}else _0x41dda7===_0x53100a(0x126)?this[_0x53100a(0x104)](_0xb33907):Window_HorzCommand['prototype'][_0x53100a(0xe8)][_0x53100a(0xeb)](this,_0xb33907);},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0xda)]=function(){const _0x19038c=_0xb76a9c;return Window_CreditsCategory[_0x19038c(0xb6)];},Window_CreditsCategory[_0xb76a9c(0x86)][_0xb76a9c(0x129)]=function(_0x2461b0){const _0x392afe=_0xb76a9c;if(_0x2461b0<0x0)return _0x392afe(0xcf);const _0x44e1e9=this[_0x392afe(0xda)]();if(_0x44e1e9!==_0x392afe(0xb7)){if(_0x392afe(0x128)!==_0x392afe(0x128)){const _0x3e91fa=_0x50b6e5(_0x3d1a96['$1']);_0x3e91fa<_0x3463b8?(_0x486340(_0x392afe(0x125)[_0x392afe(0xbe)](_0x407809,_0x3e91fa,_0x29d13e)),_0x40ec95[_0x392afe(0x76)]()):_0x1453d5=_0x106e83[_0x392afe(0x96)](_0x3e91fa,_0x4d3231);}else return _0x44e1e9;}else{if(this[_0x392afe(0x150)]()>0x0){if(_0x392afe(0xe1)===_0x392afe(0x163))_0x5036cb[_0x392afe(0x86)][_0x392afe(0x137)][_0x392afe(0xeb)](this);else{const _0x386fc0=this[_0x392afe(0x11e)](_0x2461b0);if(_0x386fc0['match'](/\\I\[(\d+)\]/i)){const _0x38c2ad=this[_0x392afe(0xe3)](_0x2461b0),_0x2a0259=this['textSizeEx'](_0x386fc0)[_0x392afe(0xb2)];if(_0x2a0259<=_0x38c2ad[_0x392afe(0xb2)]){if('YxsnL'==='YxsnL')return _0x392afe(0x110);else _0x5460f2=_0x26a18a[_0x392afe(0x96)](_0xc8fd52,_0x2e9194);}else return'icon';}}}}return _0x392afe(0xcf);},Window_CreditsCategory[_0xb76a9c(0x86)]['drawItemStyleIconText']=function(_0x332578){const _0x4fbb39=_0xb76a9c,_0x9b3519=this[_0x4fbb39(0xe3)](_0x332578),_0x55ac3a=this[_0x4fbb39(0x11e)](_0x332578),_0x29b7ce=this[_0x4fbb39(0x111)](_0x55ac3a)[_0x4fbb39(0xb2)];this[_0x4fbb39(0xff)](this[_0x4fbb39(0x120)](_0x332578));const _0x309eb5=this[_0x4fbb39(0x160)]();if(_0x309eb5===_0x4fbb39(0xa2))this[_0x4fbb39(0x166)](_0x55ac3a,_0x9b3519['x']+_0x9b3519[_0x4fbb39(0xb2)]-_0x29b7ce,_0x9b3519['y'],_0x29b7ce);else{if(_0x309eb5===_0x4fbb39(0xf8)){const _0x29df33=_0x9b3519['x']+Math[_0x4fbb39(0xd1)]((_0x9b3519[_0x4fbb39(0xb2)]-_0x29b7ce)/0x2);this[_0x4fbb39(0x166)](_0x55ac3a,_0x29df33,_0x9b3519['y'],_0x29b7ce);}else{if(_0x4fbb39(0x16b)===_0x4fbb39(0xa5)){this[_0x4fbb39(0x139)]['y']+=_0x5b8d08;let _0x17fce4=_0x3281b5[_0x4fbb39(0x96)](0x0,this['_allTextHeight']-this[_0x4fbb39(0xd8)]);this['origin']['y']=this[_0x4fbb39(0x139)]['y'][_0x4fbb39(0xed)](0x0,_0x17fce4);}else this[_0x4fbb39(0x166)](_0x55ac3a,_0x9b3519['x'],_0x9b3519['y'],_0x29b7ce);}}},Window_CreditsCategory['prototype'][_0xb76a9c(0x104)]=function(_0x10a958){const _0x1ba595=_0xb76a9c;this['commandName'](_0x10a958)[_0x1ba595(0xa9)](/\\I\[(\d+)\]/i);const _0x42f8fb=Number(RegExp['$1'])||0x0,_0x20dc96=this[_0x1ba595(0xe3)](_0x10a958),_0x41199e=_0x20dc96['x']+Math[_0x1ba595(0xd1)]((_0x20dc96['width']-ImageManager[_0x1ba595(0x93)])/0x2),_0x357da8=_0x20dc96['y']+(_0x20dc96[_0x1ba595(0x109)]-ImageManager[_0x1ba595(0x119)])/0x2;this[_0x1ba595(0xd0)](_0x42f8fb,_0x41199e,_0x357da8);};function Window_CreditsDisplay(){const _0x100f9d=_0xb76a9c;this[_0x100f9d(0x137)](...arguments);}Window_CreditsDisplay[_0xb76a9c(0x86)]=Object['create'](Window_Selectable[_0xb76a9c(0x86)]),Window_CreditsDisplay[_0xb76a9c(0x86)]['constructor']=Window_CreditsDisplay,Window_CreditsDisplay[_0xb76a9c(0x108)]=VisuMZ['CreditsPage'][_0xb76a9c(0x152)]['Window'][_0xb76a9c(0x11d)],Window_CreditsDisplay['TOP_LINE_BUFFER']=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)]['Window'][_0xb76a9c(0x88)]??0x1,Window_CreditsDisplay['BOTTOM_LINE_BUFFER']=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x121)][_0xb76a9c(0x14e)]??0x1,Window_CreditsDisplay['CENTER_WIDTH']=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x121)]['DisplayWindow_CenterWidth']??0x1,Window_CreditsDisplay[_0xb76a9c(0x16c)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)][_0xb76a9c(0x121)][_0xb76a9c(0x14b)]||0x1,Window_CreditsDisplay['FAST_SCROLL_SPEED']=VisuMZ[_0xb76a9c(0xc4)]['Settings'][_0xb76a9c(0x121)]['FastScrollSpeed']||0x1,Window_CreditsDisplay[_0xb76a9c(0x122)]=VisuMZ[_0xb76a9c(0xc4)][_0xb76a9c(0x152)]['Window'][_0xb76a9c(0x12a)]||0x1,Window_CreditsDisplay['FAST_SOUND_FREQUENCY']=VisuMZ['CreditsPage'][_0xb76a9c(0x152)]['Window'][_0xb76a9c(0xac)]||0x1,Window_CreditsDisplay['prototype'][_0xb76a9c(0x137)]=function(_0x338879){const _0x37dd2b=_0xb76a9c;this['_category']=VisuMZ[_0x37dd2b(0xc4)][_0x37dd2b(0x152)][_0x37dd2b(0x133)][0x0],Window_Selectable[_0x37dd2b(0x86)][_0x37dd2b(0x137)][_0x37dd2b(0xeb)](this,_0x338879),this['_allTextHeight']=0x0,this[_0x37dd2b(0xf0)](),this[_0x37dd2b(0xd2)]();},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x10b)]=function(){return![];},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0xf0)]=function(){const _0x2aa35b=_0xb76a9c;this[_0x2aa35b(0x101)](),this[_0x2aa35b(0x11c)](),this[_0x2aa35b(0xc1)]();},Window_CreditsDisplay['prototype']['calculateTextHeight']=function(){const _0x3dec04=_0xb76a9c,_0x4dec1c=this[_0x3dec04(0x171)][_0x3dec04(0x98)];this[_0x3dec04(0x131)]=0x0,this[_0x3dec04(0x131)]=this[_0x3dec04(0x111)](_0x4dec1c)[_0x3dec04(0x109)];const _0x323ec7=this['lineHeight'](),_0x4f00fc=Window_CreditsDisplay['TOP_LINE_BUFFER']*_0x323ec7,_0x5b2415=Window_CreditsDisplay['BOTTOM_LINE_BUFFER']*_0x323ec7;this[_0x3dec04(0x131)]+=_0x4f00fc+_0x5b2415;},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0xcd)]=function(){const _0x546296=_0xb76a9c;return Math[_0x546296(0x96)](this['_allTextHeight'],0x1);},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x81)]=function(_0x3fa876){const _0x11d395=_0xb76a9c;if(_0x3fa876===this[_0x11d395(0x171)])return;this['_category']=_0x3fa876,this['refresh']();},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0xc1)]=function(){const _0x1e36dd=_0xb76a9c,_0x4eaa4f=this[_0x1e36dd(0x171)]['Text'];this[_0x1e36dd(0x13f)](),this[_0x1e36dd(0x14a)](_0x4eaa4f);if(Imported['VisuMZ_1_MessageCore'])this['resetWordWrap']();this[_0x1e36dd(0xa8)]();},Window_CreditsDisplay['prototype'][_0xb76a9c(0x14a)]=function(_0xc08269){const _0x23e082=_0xb76a9c,_0x1ff4ce=Math[_0x23e082(0x155)](this[_0x23e082(0x14c)],Window_CreditsDisplay[_0x23e082(0x8f)]||this[_0x23e082(0x14c)]),_0x1c9746=Math[_0x23e082(0xd1)]((this[_0x23e082(0x14c)]-_0x1ff4ce)/0x2),_0x540b9f=this[_0x23e082(0xaf)]()*Window_CreditsDisplay[_0x23e082(0xc7)];this[_0x23e082(0x166)](_0xc08269,_0x1c9746,_0x540b9f,_0x1ff4ce);},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x16f)]=function(){},Window_CreditsDisplay[_0xb76a9c(0x86)]['processCursorMove']=function(){const _0x2107e6=_0xb76a9c;if(!this[_0x2107e6(0xfc)])return;if(Input[_0x2107e6(0xd7)]('down')){if(_0x2107e6(0xb3)!==_0x2107e6(0xd3))this[_0x2107e6(0x103)](!![]);else return'';}else{if(Input['isPressed']('up'))this[_0x2107e6(0x103)](![]);else{if(Input[_0x2107e6(0xd7)](_0x2107e6(0x107)))this['processFastScroll'](!![]);else{if(Input[_0x2107e6(0xd7)](_0x2107e6(0x15d)))_0x2107e6(0xbd)!==_0x2107e6(0x85)?this[_0x2107e6(0x9d)](![]):this['scrollToBottom'](!![]);else{if(Input[_0x2107e6(0x12f)](_0x2107e6(0x102))){if(_0x2107e6(0x7a)==='LaIoi')this[_0x2107e6(0xa8)](!![]);else{const _0x4fddbc=new _0x318223(0x0,0x0,_0x668d53['width'],_0x24f61e['height']);this[_0x2107e6(0x136)]=new _0x5bebdd(_0x4fddbc),this[_0x2107e6(0x136)]['opacity']=0x0,this[_0x2107e6(0x7f)](this['_commandNameWindow']),this[_0x2107e6(0x113)]();}}else Input[_0x2107e6(0x12f)](_0x2107e6(0x16a))&&this[_0x2107e6(0x83)](!![]);}}}}},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x103)]=function(_0x3b8304){const _0x1d7f36=_0xb76a9c;let _0x2a2884=this[_0x1d7f36(0x139)]['y'];this['origin']['y']+=(_0x3b8304?0x1:-0x1)*Window_CreditsDisplay[_0x1d7f36(0x16c)];let _0x5336c6=Math[_0x1d7f36(0x96)](0x0,this['_allTextHeight']-this[_0x1d7f36(0xd8)]);this[_0x1d7f36(0x139)]['y']=this[_0x1d7f36(0x139)]['y'][_0x1d7f36(0xed)](0x0,_0x5336c6);if(_0x2a2884!==this[_0x1d7f36(0x139)]['y']&&Graphics[_0x1d7f36(0xb8)]%Window_CreditsDisplay[_0x1d7f36(0x122)]===0x0)this[_0x1d7f36(0xb5)]();},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x9d)]=function(_0x40f6fd){const _0x56fabb=_0xb76a9c;let _0xae8b90=this[_0x56fabb(0x139)]['y'];this[_0x56fabb(0x139)]['y']+=(_0x40f6fd?0x1:-0x1)*Window_CreditsDisplay[_0x56fabb(0x9f)];let _0x2aa5f9=Math[_0x56fabb(0x96)](0x0,this[_0x56fabb(0x131)]-this[_0x56fabb(0xd8)]);this[_0x56fabb(0x139)]['y']=this[_0x56fabb(0x139)]['y'][_0x56fabb(0xed)](0x0,_0x2aa5f9);if(_0xae8b90!==this[_0x56fabb(0x139)]['y']&&Graphics[_0x56fabb(0xb8)]%Window_CreditsDisplay[_0x56fabb(0xf4)]===0x0)this['playCursorSound']();},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0xa8)]=function(_0x1d52d7){const _0x8d1294=_0xb76a9c;let _0x4c5c35=this[_0x8d1294(0x139)]['y'];this[_0x8d1294(0x139)]['y']=0x0;if(_0x1d52d7&&_0x4c5c35!==this['origin']['y'])this[_0x8d1294(0xb5)]();},Window_CreditsDisplay['prototype'][_0xb76a9c(0x83)]=function(_0x3431fa){const _0x5b92e3=_0xb76a9c;let _0x4187a2=this[_0x5b92e3(0x139)]['y'],_0x240895=Math[_0x5b92e3(0x96)](0x0,this[_0x5b92e3(0x131)]-this[_0x5b92e3(0xd8)]);this[_0x5b92e3(0x139)]['y']=_0x240895;if(_0x3431fa&&_0x4187a2!==this[_0x5b92e3(0x139)]['y'])this['playCursorSound']();},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x177)]=function(){const _0x152d17=_0xb76a9c;this[_0x152d17(0x174)]=this[_0x152d17(0x139)]['y']<this[_0x152d17(0x131)]-this[_0x152d17(0xd8)],this[_0x152d17(0xfe)]=this[_0x152d17(0x139)]['y']>0x0;},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x116)]=function(_0x492dc7,_0x2fc9ea){const _0x1831e0=_0xb76a9c;this[_0x1831e0(0x139)]['y']+=_0x2fc9ea;let _0x48ed8a=Math[_0x1831e0(0x96)](0x0,this[_0x1831e0(0x131)]-this[_0x1831e0(0xd8)]);this[_0x1831e0(0x139)]['y']=this[_0x1831e0(0x139)]['y'][_0x1831e0(0xed)](0x0,_0x48ed8a);},Window_CreditsDisplay[_0xb76a9c(0x86)][_0xb76a9c(0x151)]=function(_0x291dca,_0x5ab1f9){const _0x4ef2d8=_0xb76a9c;this[_0x4ef2d8(0x139)]['y']+=_0x5ab1f9;let _0x3a600d=Math[_0x4ef2d8(0x96)](0x0,this[_0x4ef2d8(0x131)]-this[_0x4ef2d8(0xd8)]);this['origin']['y']=this['origin']['y'][_0x4ef2d8(0xed)](0x0,_0x3a600d);};