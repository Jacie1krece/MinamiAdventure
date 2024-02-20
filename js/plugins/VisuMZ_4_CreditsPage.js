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
 * @url http://www.yanfly.moe/wiki/Credits_Page_VisuStella_MZ
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

const _0x3c0caf=_0x267d;(function(_0x1565b0,_0x1e527b){const _0x35c746=_0x267d,_0x4900b8=_0x1565b0();while(!![]){try{const _0x255547=parseInt(_0x35c746(0x1d6))/0x1+parseInt(_0x35c746(0x210))/0x2+parseInt(_0x35c746(0x242))/0x3+-parseInt(_0x35c746(0x1e4))/0x4+parseInt(_0x35c746(0x264))/0x5+parseInt(_0x35c746(0x22e))/0x6*(-parseInt(_0x35c746(0x1dd))/0x7)+-parseInt(_0x35c746(0x261))/0x8;if(_0x255547===_0x1e527b)break;else _0x4900b8['push'](_0x4900b8['shift']());}catch(_0x185042){_0x4900b8['push'](_0x4900b8['shift']());}}}(_0x5dc9,0x27273));function _0x5dc9(){const _0x486114=['uGBUL','isAutoColorAffected','CreditsPage','iconHeight','372748BALnNW','EnableMainMenu','replace','resetFontSettings','constructor','FRGJg','mainAreaHeight','initialize','calculateTextHeight','ARRAYSTRUCT','DisplayWindow_BgType','updateOrigin','FAST_SOUND_FREQUENCY','scrollToBottom','description','addOriginalCommands','ARRAYJSON','floor','innerHeight','isPressed','GmjMr','frameCount','currentExt','TEXT_ALIGN','center','pop','width','VisuMZ_1_MessageCore','updateCommandNameWindow','push','36okvNlD','buttonAssistText3','xVwlY','SystemShowCreditsPageMenu','index','getBackgroundOpacity','windowPadding','cancel','SlowScroll','BG_TYPE','CreditsPageMenuCommand','drawItemStyleIcon','SceneOpenCreditsPage','DisplayWindow_BufferBottom','qrpDq','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','commandNameWindowCenter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYFUNC','commandStyle','110820UZtUCo','BgFilename1','addWindow','category','SlowSoundFreq','downArrowVisible','Vocab','_commandNameWindow','max','createContents','isHoverEnabled','processFastScroll','drawAllText','name','VmZmH','iconText','addChild','SLOW_SCROLL_SPEED','categoryWindowRect','create','clamp','drawMessageText','scrollToTop','DisplayWindow_CenterWidth','_categoryWindow','textWindowRect','sqhAo','commandCreditsPage','isMainMenuCreditsPageVisible','mainAreaTop','isCreditsPageCommandVisible','34704BwbagI','FUNC','createCategoryWindow','353225VOjfGi','SLOW_SOUND_FREQUENCY','ConvertParams','CategoryWindow_Style','_textWindow','WomZT','setScrollAccel','drawItemStyleIconText','Sszur','setMainMenuCreditsPageVisible','getInputMultiButtonStrings','textSizeEx','SystemEnableCreditsPageMenu','CENTER_WIDTH','right','close','createBackground','match','setMainMenuCreditsPageEnabled','length','\x5cI[%1]%2','isMainMenuCreditsPageEnabled','itemTextAlign','enabled','CREDITS_ADD_COMMAND','BgFilename2','dZPaP','resetWordWrap','isUseModernControls','tVOKa','addCreditsCommand','_commandWindow','DisplayWindow_BufferTop','Text','_list','scaleSprite','loadTitle2','addLoadListener','MainMenu','findSymbol','Window','bind','ShowTitleCommand','drawItem','processSlowScroll','commandNameWindowDrawText','Scene_Menu_createCommandWindow','addCommand','createCustomBackgroundImages','makeCommandList','gxvfD','includes','boxWidth','Icon','VisuMZ_1_MainMenuCore','upArrowVisible','SlowScrollSpeed','icon','registerCommand','BgSettings','Credits','NoFNT','itemLineRect','updateDisplayWindow','setHandler','FastScrollSpeed','isSceneBattle','zWYVH','exit','addCreditsPageCommandAutomatically','NUM','Show','_backSprite2','creditsPage','drawTextEx','ARRAYEVAL','options','refresh','pagedown','isCreditsPageCommandEnabled','_scene','BOTTOM_LINE_BUFFER','lineHeight','setDisplayWindow','SnapshotOpacity','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','processCursorMove','drawText','CategoryWindow_BgType','down','createCommandWindow','CreditsPageFastScroll','_CreditsPage_MainMenu','Enable','TOP_LINE_BUFFER','iconWidth','addCreditsPageCommand','setBackgroundOpacity','return\x200','setCategory','_displayWindow','auto','pageup','276861XehOEb','format','prototype','playOkSound','JSON','_category','CategoryWindow_RectJS','121009mAQPAb','commandNameWindowDrawBackground','version','shown','kgSnc','Name','AQWTr','1209556jJpdxr','smoothScrollBy','DisplayWindow_RectJS','innerWidth','Window_TitleCommand_makeCommandList','initCreditsPageMainMenu','FastSoundFreq','map','callUpdateHelp','updateArrows','isCommandEnabled','calcWindowHeight','height','createCommandNameWindow','AmnGL','commandStyleCheck','FastScroll','ZCoqn','Window_MenuCommand_addOriginalCommands','origin','commandName','parse','createTextWindow','call','setBackgroundType','CreditsPageScroll','Riubk','COMMAND_STYLE','iPDcl','playCursorSound','end','centerSprite','contents','_allTextHeight','loadTitle1','isTriggered','Settings','AWhDi','text','_backSprite1'];_0x5dc9=function(){return _0x486114;};return _0x5dc9();}var label='CreditsPage',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x45f12b){const _0xd6360e=_0x267d;return _0x45f12b['status']&&_0x45f12b['description'][_0xd6360e(0x1a2)]('['+label+']');})[0x0];VisuMZ[label][_0x3c0caf(0x208)]=VisuMZ[label][_0x3c0caf(0x208)]||{},VisuMZ['ConvertParams']=function(_0x4ccf7a,_0x2751b6){const _0x2ea3a5=_0x3c0caf;for(const _0x2c2bc2 in _0x2751b6){if('ZaHAE'!==_0x2ea3a5(0x23c)){if(_0x2c2bc2[_0x2ea3a5(0x275)](/(.*):(.*)/i)){const _0x5cdacc=String(RegExp['$1']),_0x340b25=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x40c6ae,_0x3b4016,_0x1b67bc;switch(_0x340b25){case _0x2ea3a5(0x1b5):_0x40c6ae=_0x2751b6[_0x2c2bc2]!==''?Number(_0x2751b6[_0x2c2bc2]):0x0;break;case'ARRAYNUM':_0x3b4016=_0x2751b6[_0x2c2bc2]!==''?JSON['parse'](_0x2751b6[_0x2c2bc2]):[],_0x40c6ae=_0x3b4016['map'](_0x3784e4=>Number(_0x3784e4));break;case'EVAL':_0x40c6ae=_0x2751b6[_0x2c2bc2]!==''?eval(_0x2751b6[_0x2c2bc2]):null;break;case _0x2ea3a5(0x1ba):_0x3b4016=_0x2751b6[_0x2c2bc2]!==''?JSON['parse'](_0x2751b6[_0x2c2bc2]):[],_0x40c6ae=_0x3b4016[_0x2ea3a5(0x1eb)](_0x35c6a8=>eval(_0x35c6a8));break;case _0x2ea3a5(0x1da):_0x40c6ae=_0x2751b6[_0x2c2bc2]!==''?JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2]):'';break;case _0x2ea3a5(0x220):_0x3b4016=_0x2751b6[_0x2c2bc2]!==''?JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2]):[],_0x40c6ae=_0x3b4016[_0x2ea3a5(0x1eb)](_0x24c654=>JSON[_0x2ea3a5(0x1f9)](_0x24c654));break;case _0x2ea3a5(0x262):_0x40c6ae=_0x2751b6[_0x2c2bc2]!==''?new Function(JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2])):new Function(_0x2ea3a5(0x1d1));break;case _0x2ea3a5(0x240):_0x3b4016=_0x2751b6[_0x2c2bc2]!==''?JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2]):[],_0x40c6ae=_0x3b4016[_0x2ea3a5(0x1eb)](_0x551d4d=>new Function(JSON[_0x2ea3a5(0x1f9)](_0x551d4d)));break;case'STR':_0x40c6ae=_0x2751b6[_0x2c2bc2]!==''?String(_0x2751b6[_0x2c2bc2]):'';break;case'ARRAYSTR':_0x3b4016=_0x2751b6[_0x2c2bc2]!==''?JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2]):[],_0x40c6ae=_0x3b4016[_0x2ea3a5(0x1eb)](_0x8a9aa1=>String(_0x8a9aa1));break;case'STRUCT':_0x1b67bc=_0x2751b6[_0x2c2bc2]!==''?JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2]):{},_0x40c6ae=VisuMZ['ConvertParams']({},_0x1b67bc);break;case _0x2ea3a5(0x219):_0x3b4016=_0x2751b6[_0x2c2bc2]!==''?JSON[_0x2ea3a5(0x1f9)](_0x2751b6[_0x2c2bc2]):[],_0x40c6ae=_0x3b4016[_0x2ea3a5(0x1eb)](_0x5373b1=>VisuMZ[_0x2ea3a5(0x266)]({},JSON['parse'](_0x5373b1)));break;default:continue;}_0x4ccf7a[_0x5cdacc]=_0x40c6ae;}}else return 0x0;}return _0x4ccf7a;},(_0x1d8454=>{const _0x35f925=_0x3c0caf,_0x5840b8=_0x1d8454[_0x35f925(0x24f)];for(const _0x20c606 of dependencies){if(!Imported[_0x20c606]){if(_0x35f925(0x189)==='Ktwwb'){const _0x4428c1=_0x12a60c['x']+_0x2267c6[_0x35f925(0x221)]((_0x3a05af[_0x35f925(0x22a)]-_0x1dfdc0)/0x2);this[_0x35f925(0x1b9)](_0x44f6a6,_0x4428c1,_0x238d83['y'],_0x5396f0);}else{alert(_0x35f925(0x23d)[_0x35f925(0x1d7)](_0x5840b8,_0x20c606)),SceneManager['exit']();break;}}}const _0x4e8503=_0x1d8454[_0x35f925(0x21e)];if(_0x4e8503[_0x35f925(0x275)](/\[Version[ ](.*?)\]/i)){if(_0x35f925(0x1b2)!==_0x35f925(0x1b2))return _0x8ede16[_0x35f925(0x279)]();else{const _0xf32d53=Number(RegExp['$1']);_0xf32d53!==VisuMZ[label][_0x35f925(0x1df)]&&(alert(_0x35f925(0x23f)[_0x35f925(0x1d7)](_0x5840b8,_0xf32d53)),SceneManager[_0x35f925(0x1b3)]());}}if(_0x4e8503[_0x35f925(0x275)](/\[Tier[ ](\d+)\]/i)){const _0x315733=Number(RegExp['$1']);if(_0x315733<tier){if(_0x35f925(0x20c)!=='LXllm')alert(_0x35f925(0x1c4)[_0x35f925(0x1d7)](_0x5840b8,_0x315733,tier)),SceneManager[_0x35f925(0x1b3)]();else{_0x117392['CreditsPage']['Scene_Menu_createCommandWindow'][_0x35f925(0x1fb)](this);const _0x40024a=this[_0x35f925(0x18e)];_0x40024a[_0x35f925(0x1af)](_0x35f925(0x1b8),this[_0x35f925(0x25d)][_0x35f925(0x198)](this));}}else{if(_0x35f925(0x26c)===_0x35f925(0x26c))tier=Math[_0x35f925(0x24a)](_0x315733,tier);else return _0x467888[_0x35f925(0x26e)](_0x35f925(0x1d5),_0x35f925(0x1bd));}}VisuMZ['ConvertParams'](VisuMZ[label][_0x35f925(0x208)],_0x1d8454['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3c0caf(0x24f)],_0x3c0caf(0x23a),_0xcd9e6=>{const _0x418d67=_0x3c0caf;if(SceneManager[_0x418d67(0x1b1)]())return;SceneManager[_0x418d67(0x22d)](Scene_CreditsPage);}),PluginManager[_0x3c0caf(0x1a9)](pluginData['name'],_0x3c0caf(0x270),_0x19d844=>{const _0xf794e5=_0x3c0caf;VisuMZ[_0xf794e5(0x266)](_0x19d844,_0x19d844),$gameSystem[_0xf794e5(0x276)](_0x19d844[_0xf794e5(0x1cc)]);}),PluginManager[_0x3c0caf(0x1a9)](pluginData['name'],_0x3c0caf(0x231),_0x4341df=>{const _0xc27e3c=_0x3c0caf;VisuMZ[_0xc27e3c(0x266)](_0x4341df,_0x4341df),$gameSystem[_0xc27e3c(0x26d)](_0x4341df[_0xc27e3c(0x1b6)]);}),TextManager[_0x3c0caf(0x238)]=VisuMZ['CreditsPage'][_0x3c0caf(0x208)][_0x3c0caf(0x195)][_0x3c0caf(0x1e2)],TextManager[_0x3c0caf(0x1fd)]=VisuMZ[_0x3c0caf(0x20e)]['Settings'][_0x3c0caf(0x248)][_0x3c0caf(0x236)],TextManager[_0x3c0caf(0x1ca)]=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)][_0x3c0caf(0x248)][_0x3c0caf(0x1f4)],SceneManager[_0x3c0caf(0x1b1)]=function(){const _0x65c5ee=_0x3c0caf;return this[_0x65c5ee(0x1bf)]&&this[_0x65c5ee(0x1bf)]['constructor']===Scene_Battle;},VisuMZ[_0x3c0caf(0x20e)]['Game_System_initialize']=Game_System[_0x3c0caf(0x1d8)][_0x3c0caf(0x217)],Game_System[_0x3c0caf(0x1d8)][_0x3c0caf(0x217)]=function(){const _0x3b8525=_0x3c0caf;VisuMZ[_0x3b8525(0x20e)]['Game_System_initialize'][_0x3b8525(0x1fb)](this),this['initCreditsPageMainMenu']();},Game_System['prototype'][_0x3c0caf(0x1e9)]=function(){const _0x24493b=_0x3c0caf;this[_0x24493b(0x1cb)]={'shown':VisuMZ[_0x24493b(0x20e)][_0x24493b(0x208)][_0x24493b(0x195)]['ShowMainMenu'],'enabled':VisuMZ[_0x24493b(0x20e)][_0x24493b(0x208)][_0x24493b(0x195)][_0x24493b(0x211)]};},Game_System[_0x3c0caf(0x1d8)][_0x3c0caf(0x25e)]=function(){const _0x585fdf=_0x3c0caf;if(this['_CreditsPage_MainMenu']===undefined)this[_0x585fdf(0x1e9)]();return this['_CreditsPage_MainMenu'][_0x585fdf(0x1e0)];},Game_System['prototype']['setMainMenuCreditsPageVisible']=function(_0x4fd93c){const _0x31e537=_0x3c0caf;if(this[_0x31e537(0x1cb)]===undefined)this[_0x31e537(0x1e9)]();this[_0x31e537(0x1cb)][_0x31e537(0x1e0)]=_0x4fd93c;},Game_System[_0x3c0caf(0x1d8)]['isMainMenuCreditsPageEnabled']=function(){const _0x50fef4=_0x3c0caf;if(this[_0x50fef4(0x1cb)]===undefined)this[_0x50fef4(0x1e9)]();return this['_CreditsPage_MainMenu']['enabled'];},Game_System['prototype'][_0x3c0caf(0x276)]=function(_0x3d58cf){const _0xfd3464=_0x3c0caf;if(this[_0xfd3464(0x1cb)]===undefined)this[_0xfd3464(0x1e9)]();this[_0xfd3464(0x1cb)][_0xfd3464(0x186)]=_0x3d58cf;},VisuMZ[_0x3c0caf(0x20e)]['Scene_Title_createCommandWindow']=Scene_Title[_0x3c0caf(0x1d8)][_0x3c0caf(0x1c9)],Scene_Title['prototype'][_0x3c0caf(0x1c9)]=function(){const _0x3d7188=_0x3c0caf;VisuMZ['CreditsPage']['Scene_Title_createCommandWindow']['call'](this),this[_0x3d7188(0x18e)][_0x3d7188(0x1af)](_0x3d7188(0x1b8),this[_0x3d7188(0x25d)]['bind'](this));},Scene_Title['prototype'][_0x3c0caf(0x25d)]=function(){const _0x54024e=_0x3c0caf;this[_0x54024e(0x18e)][_0x54024e(0x273)](),SceneManager[_0x54024e(0x22d)](Scene_CreditsPage);},VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x19d)]=Scene_Menu[_0x3c0caf(0x1d8)][_0x3c0caf(0x1c9)],Scene_Menu['prototype']['createCommandWindow']=function(){const _0x5150b9=_0x3c0caf;VisuMZ[_0x5150b9(0x20e)][_0x5150b9(0x19d)][_0x5150b9(0x1fb)](this);const _0x578c85=this[_0x5150b9(0x18e)];_0x578c85['setHandler'](_0x5150b9(0x1b8),this[_0x5150b9(0x25d)][_0x5150b9(0x198)](this));},Scene_Menu[_0x3c0caf(0x1d8)][_0x3c0caf(0x25d)]=function(){SceneManager['push'](Scene_CreditsPage);};function Scene_CreditsPage(){this['initialize'](...arguments);}function _0x267d(_0x2d9454,_0x14b23e){const _0x5dc9e6=_0x5dc9();return _0x267d=function(_0x267d87,_0x115a85){_0x267d87=_0x267d87-0x186;let _0x56eec1=_0x5dc9e6[_0x267d87];return _0x56eec1;},_0x267d(_0x2d9454,_0x14b23e);}Scene_CreditsPage['prototype']=Object['create'](Scene_MenuBase['prototype']),Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x214)]=Scene_CreditsPage,Scene_CreditsPage[_0x3c0caf(0x1d8)]['initialize']=function(){const _0x45e17c=_0x3c0caf;Scene_MenuBase[_0x45e17c(0x1d8)][_0x45e17c(0x217)][_0x45e17c(0x1fb)](this);},Scene_CreditsPage[_0x3c0caf(0x1d8)]['helpAreaHeight']=function(){return 0x0;},Scene_CreditsPage['prototype']['create']=function(){const _0x4f7435=_0x3c0caf;Scene_MenuBase[_0x4f7435(0x1d8)][_0x4f7435(0x255)][_0x4f7435(0x1fb)](this),this[_0x4f7435(0x263)](),this[_0x4f7435(0x1fa)]();},Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x263)]=function(){const _0x379a28=_0x3c0caf,_0x243242=this[_0x379a28(0x254)](),_0x4125dc=new Window_CreditsCategory(_0x243242);_0x4125dc[_0x379a28(0x1af)](_0x379a28(0x235),this['popScene'][_0x379a28(0x198)](this)),this['addWindow'](_0x4125dc),this[_0x379a28(0x25a)]=_0x4125dc,_0x4125dc[_0x379a28(0x1fc)](Window_CreditsCategory[_0x379a28(0x237)]);},Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x254)]=function(){const _0x205773=_0x3c0caf;if(VisuMZ[_0x205773(0x20e)]['Settings'][_0x205773(0x197)][_0x205773(0x1dc)]){if('srecv'==='Udjpm'){this['origin']['y']+=_0x1f11c4;let _0x52780=_0xa3dc4f[_0x205773(0x24a)](0x0,this[_0x205773(0x205)]-this[_0x205773(0x222)]);this[_0x205773(0x1f7)]['y']=this['origin']['y'][_0x205773(0x256)](0x0,_0x52780);}else return VisuMZ[_0x205773(0x20e)][_0x205773(0x208)][_0x205773(0x197)][_0x205773(0x1dc)][_0x205773(0x1fb)](this);}const _0x1f1e1c=Graphics[_0x205773(0x1a3)],_0x4bd39=this['calcWindowHeight'](0x1,!![]),_0x340a90=0x0,_0x2d835f=this[_0x205773(0x25f)]();return new Rectangle(_0x340a90,_0x2d835f,_0x1f1e1c,_0x4bd39);},Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x1fa)]=function(){const _0xb24b87=_0x3c0caf,_0x360ba4=this[_0xb24b87(0x25b)](),_0x466341=new Window_CreditsDisplay(_0x360ba4);this[_0xb24b87(0x244)](_0x466341),this[_0xb24b87(0x268)]=_0x466341,this[_0xb24b87(0x25a)][_0xb24b87(0x1c2)](_0x466341),_0x466341[_0xb24b87(0x1fc)](Window_CreditsDisplay[_0xb24b87(0x237)]);},Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x25b)]=function(){const _0x4dbdfb=_0x3c0caf;if(VisuMZ[_0x4dbdfb(0x20e)][_0x4dbdfb(0x208)][_0x4dbdfb(0x197)][_0x4dbdfb(0x1e6)]){if(_0x4dbdfb(0x250)!=='QZjfq')return VisuMZ[_0x4dbdfb(0x20e)][_0x4dbdfb(0x208)]['Window'][_0x4dbdfb(0x1e6)][_0x4dbdfb(0x1fb)](this);else{if(!this[_0x4dbdfb(0x1b4)]())return;if(!this[_0x4dbdfb(0x260)]())return;const _0x2e2c46=_0x2b9860[_0x4dbdfb(0x238)],_0x49a725=this[_0x4dbdfb(0x1be)]();this[_0x4dbdfb(0x19e)](_0x2e2c46,_0x4dbdfb(0x1b8),_0x49a725);}}const _0x3fb5c4=Graphics[_0x4dbdfb(0x1a3)],_0xa116c6=this[_0x4dbdfb(0x216)]()-this[_0x4dbdfb(0x1ef)](0x1,!![]),_0x1e2345=0x0,_0x2338d1=this[_0x4dbdfb(0x25f)]()+this[_0x4dbdfb(0x1ef)](0x1,!![]);return new Rectangle(_0x1e2345,_0x2338d1,_0x3fb5c4,_0xa116c6);},Scene_CreditsPage[_0x3c0caf(0x1d8)]['buttonAssistKey1']=function(){const _0x3a2f4d=_0x3c0caf;return TextManager[_0x3a2f4d(0x26e)](_0x3a2f4d(0x1d5),'pagedown');},Scene_CreditsPage[_0x3c0caf(0x1d8)]['buttonAssistKey3']=function(){const _0x53c86a=_0x3c0caf;return TextManager[_0x53c86a(0x26e)]('up',_0x53c86a(0x1c8));},Scene_CreditsPage[_0x3c0caf(0x1d8)]['buttonAssistKey4']=function(){return'';},Scene_CreditsPage[_0x3c0caf(0x1d8)]['buttonAssistText1']=function(){const _0x3ea75b=_0x3c0caf;return TextManager[_0x3ea75b(0x1ca)];},Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x22f)]=function(){const _0x48ca17=_0x3c0caf;return TextManager[_0x48ca17(0x1fd)];},Scene_CreditsPage[_0x3c0caf(0x1d8)]['createBackground']=function(){const _0x4f3e70=_0x3c0caf;Scene_MenuBase[_0x4f3e70(0x1d8)][_0x4f3e70(0x274)][_0x4f3e70(0x1fb)](this),this[_0x4f3e70(0x1d0)](this[_0x4f3e70(0x233)]()),this[_0x4f3e70(0x19f)]();},Scene_CreditsPage[_0x3c0caf(0x1d8)][_0x3c0caf(0x233)]=function(){const _0x21caaf=_0x3c0caf;return VisuMZ['CreditsPage']['Settings'][_0x21caaf(0x1aa)][_0x21caaf(0x1c3)];},Scene_CreditsPage['prototype']['createCustomBackgroundImages']=function(){const _0x196892=_0x3c0caf,_0x3382c4=VisuMZ[_0x196892(0x20e)][_0x196892(0x208)]['BgSettings'];if(_0x3382c4&&(_0x3382c4[_0x196892(0x243)]!==''||_0x3382c4['BgFilename2']!=='')){if('hUaQU'!==_0x196892(0x18c))this[_0x196892(0x20b)]=new Sprite(ImageManager[_0x196892(0x206)](_0x3382c4[_0x196892(0x243)])),this[_0x196892(0x1b7)]=new Sprite(ImageManager[_0x196892(0x193)](_0x3382c4[_0x196892(0x188)])),this[_0x196892(0x252)](this['_backSprite1']),this['addChild'](this[_0x196892(0x1b7)]),this[_0x196892(0x20b)]['bitmap'][_0x196892(0x194)](this['adjustSprite'][_0x196892(0x198)](this,this[_0x196892(0x20b)])),this[_0x196892(0x1b7)]['bitmap']['addLoadListener'](this['adjustSprite']['bind'](this,this[_0x196892(0x1b7)]));else{if(_0xfc197a[_0x196892(0x1b1)]())return;_0x41a67b[_0x196892(0x22d)](_0x38ac52);}}},Scene_CreditsPage[_0x3c0caf(0x1d8)]['adjustSprite']=function(_0x231a84){const _0x4f2f22=_0x3c0caf;this[_0x4f2f22(0x192)](_0x231a84),this[_0x4f2f22(0x203)](_0x231a84);},VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x1f6)]=Window_MenuCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x21f)],Window_MenuCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x21f)]=function(){const _0x1f0c50=_0x3c0caf;VisuMZ[_0x1f0c50(0x20e)][_0x1f0c50(0x1f6)][_0x1f0c50(0x1fb)](this),this[_0x1f0c50(0x1cf)]();},Window_MenuCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x1cf)]=function(){const _0x95572b=_0x3c0caf;if(!this[_0x95572b(0x1b4)]())return;if(!this[_0x95572b(0x260)]())return;const _0x31db64=TextManager[_0x95572b(0x238)],_0x202b24=this[_0x95572b(0x1be)]();this['addCommand'](_0x31db64,_0x95572b(0x1b8),_0x202b24);},Window_MenuCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x1b4)]=function(){const _0x54eebd=_0x3c0caf;return Imported[_0x54eebd(0x1a5)]?![]:!![];},Window_MenuCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x260)]=function(){const _0x4a6ccf=_0x3c0caf;return $gameSystem[_0x4a6ccf(0x25e)]();},Window_MenuCommand['prototype'][_0x3c0caf(0x1be)]=function(){const _0x33d252=_0x3c0caf;return $gameSystem[_0x33d252(0x279)]();},Window_TitleCommand['CREDITS_ADD_COMMAND']=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)]['MainMenu'][_0x3c0caf(0x199)],VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x1e8)]=Window_TitleCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x1a0)],Window_TitleCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x1a0)]=function(){const _0x12dd57=_0x3c0caf;VisuMZ[_0x12dd57(0x20e)][_0x12dd57(0x1e8)][_0x12dd57(0x1fb)](this),this['addCreditsCommand']();},Window_TitleCommand[_0x3c0caf(0x1d8)][_0x3c0caf(0x18d)]=function(){const _0x2ebf5f=_0x3c0caf;if(!Window_TitleCommand[_0x2ebf5f(0x187)])return;if(this[_0x2ebf5f(0x196)](_0x2ebf5f(0x1b8))>=0x0)return;const _0x1912c8=TextManager[_0x2ebf5f(0x238)],_0x9e359d=!![];this[_0x2ebf5f(0x19e)](_0x1912c8,_0x2ebf5f(0x1b8),_0x9e359d);const _0x2bc399=this[_0x2ebf5f(0x196)](_0x2ebf5f(0x1bb));if(_0x2bc399>0x0){const _0x2b4bdc=this[_0x2ebf5f(0x191)][_0x2ebf5f(0x229)]();this[_0x2ebf5f(0x191)]['splice'](_0x2bc399,0x0,_0x2b4bdc);}};function Window_CreditsCategory(){const _0x35e9ad=_0x3c0caf;this[_0x35e9ad(0x217)](...arguments);}Window_CreditsCategory['prototype']=Object['create'](Window_HorzCommand[_0x3c0caf(0x1d8)]),Window_CreditsCategory[_0x3c0caf(0x1d8)]['constructor']=Window_CreditsCategory,Window_CreditsCategory['BG_TYPE']=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)][_0x3c0caf(0x197)][_0x3c0caf(0x1c7)],Window_CreditsCategory['TEXT_ALIGN']=VisuMZ['CreditsPage']['Settings'][_0x3c0caf(0x197)]['CategoryWindow_TextAlign'],Window_CreditsCategory[_0x3c0caf(0x1ff)]=VisuMZ[_0x3c0caf(0x20e)]['Settings'][_0x3c0caf(0x197)][_0x3c0caf(0x267)],Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x217)]=function(_0x3bc299){const _0x10a5de=_0x3c0caf;Window_HorzCommand[_0x10a5de(0x1d8)][_0x10a5de(0x217)][_0x10a5de(0x1fb)](this,_0x3bc299),this[_0x10a5de(0x1f1)](_0x3bc299);},Window_CreditsCategory['prototype']['callUpdateHelp']=function(){const _0x42c4bb=_0x3c0caf;Window_Command['prototype']['callUpdateHelp'][_0x42c4bb(0x1fb)](this);if(this[_0x42c4bb(0x249)])this[_0x42c4bb(0x22c)]();if(this[_0x42c4bb(0x1d3)])this['updateDisplayWindow']();},Window_CreditsCategory[_0x3c0caf(0x1d8)]['maxCols']=function(){const _0x19a623=_0x3c0caf;return VisuMZ[_0x19a623(0x20e)][_0x19a623(0x208)][_0x19a623(0x1ab)][_0x19a623(0x277)];},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x18b)]=function(){return![];},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x24c)]=function(){return![];},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x1d9)]=function(){},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x1c2)]=function(_0x5bc4d7){const _0x2f078d=_0x3c0caf;this[_0x2f078d(0x1d3)]=_0x5bc4d7,this[_0x2f078d(0x1ae)]();},Window_CreditsCategory['prototype'][_0x3c0caf(0x1ae)]=function(){const _0x34b23b=_0x3c0caf;if(!this[_0x34b23b(0x1d3)])return;this['_displayWindow'][_0x34b23b(0x1d2)](this[_0x34b23b(0x226)]());},Window_CreditsCategory['prototype']['createCommandNameWindow']=function(_0x20d10e){const _0x630dc1=_0x3c0caf,_0x2d7263=new Rectangle(0x0,0x0,_0x20d10e[_0x630dc1(0x22a)],_0x20d10e[_0x630dc1(0x1f0)]);this[_0x630dc1(0x249)]=new Window_Base(_0x2d7263),this[_0x630dc1(0x249)]['opacity']=0x0,this[_0x630dc1(0x252)](this[_0x630dc1(0x249)]),this[_0x630dc1(0x22c)]();},Window_CreditsCategory[_0x3c0caf(0x1d8)]['updateCommandNameWindow']=function(){const _0x356257=_0x3c0caf,_0x1a2076=this[_0x356257(0x249)];_0x1a2076[_0x356257(0x204)]['clear']();const _0x495283=this[_0x356257(0x1f3)](this['index']());if(_0x495283===_0x356257(0x1a8)){const _0x122624=this[_0x356257(0x1ad)](this[_0x356257(0x232)]());let _0x1d093d=this[_0x356257(0x1f8)](this[_0x356257(0x232)]());_0x1d093d=_0x1d093d[_0x356257(0x212)](/\\I\[(\d+)\]/gi,''),_0x1a2076['resetFontSettings'](),this[_0x356257(0x1de)](_0x1d093d,_0x122624),this[_0x356257(0x19c)](_0x1d093d,_0x122624),this[_0x356257(0x23e)](_0x1d093d,_0x122624);}},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x1de)]=function(_0x2bdf0d,_0x5bbaf7){},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x19c)]=function(_0x2bd2fd,_0x23b9ad){const _0x43c75f=_0x3c0caf,_0x13e8d2=this['_commandNameWindow'];_0x13e8d2[_0x43c75f(0x1c6)](_0x2bd2fd,0x0,_0x23b9ad['y'],_0x13e8d2['innerWidth'],_0x43c75f(0x228));},Window_CreditsCategory[_0x3c0caf(0x1d8)]['commandNameWindowCenter']=function(_0x5316e3,_0x2213a6){const _0x10c777=_0x3c0caf,_0x459833=this[_0x10c777(0x249)],_0x441f18=$gameSystem[_0x10c777(0x234)](),_0x273e62=_0x2213a6['x']+Math[_0x10c777(0x221)](_0x2213a6[_0x10c777(0x22a)]/0x2)+_0x441f18;_0x459833['x']=_0x459833['width']/-0x2+_0x273e62,_0x459833['y']=Math[_0x10c777(0x221)](_0x2213a6['height']/0x2);},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x1a0)]=function(){const _0x4ac186=_0x3c0caf,_0x31b04e=VisuMZ[_0x4ac186(0x20e)][_0x4ac186(0x208)][_0x4ac186(0x1ab)];for(const _0x4e5c4b of _0x31b04e){if(_0x4ac186(0x1e3)===_0x4ac186(0x200))return _0x443a7e[_0x4ac186(0x1fd)];else{const _0x16288f=_0x4ac186(0x245),_0x367e88=_0x4e5c4b[_0x4ac186(0x1a4)]||0x0;let _0x1ba47a=_0x4e5c4b[_0x4ac186(0x1e2)];if(_0x367e88>0x0&&this[_0x4ac186(0x241)]()!==_0x4ac186(0x20a)){if(_0x4ac186(0x1e1)===_0x4ac186(0x230))return _0x2d8aa8[_0x4ac186(0x1ff)];else _0x1ba47a=_0x4ac186(0x278)[_0x4ac186(0x1d7)](_0x367e88,_0x1ba47a);}this[_0x4ac186(0x19e)](_0x1ba47a,_0x16288f,!![],_0x4e5c4b);}}},Window_CreditsCategory['prototype'][_0x3c0caf(0x27a)]=function(){const _0x19c56e=_0x3c0caf;return Window_CreditsCategory[_0x19c56e(0x227)];},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x19a)]=function(_0x99cd49){const _0x47339e=_0x3c0caf,_0x5e00b7=this[_0x47339e(0x1f3)](_0x99cd49);if(_0x5e00b7===_0x47339e(0x251)){if('ZCoqn'===_0x47339e(0x1f5))this[_0x47339e(0x26b)](_0x99cd49);else return'';}else _0x5e00b7===_0x47339e(0x1a8)?this[_0x47339e(0x239)](_0x99cd49):Window_HorzCommand[_0x47339e(0x1d8)][_0x47339e(0x19a)][_0x47339e(0x1fb)](this,_0x99cd49);},Window_CreditsCategory['prototype'][_0x3c0caf(0x241)]=function(){const _0x3de22a=_0x3c0caf;return Window_CreditsCategory[_0x3de22a(0x1ff)];},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x1f3)]=function(_0x20de98){const _0x462f80=_0x3c0caf;if(_0x20de98<0x0)return _0x462f80(0x20a);const _0x4415d9=this['commandStyle']();if(_0x4415d9!==_0x462f80(0x1d4))return _0x4415d9;else{if(this['maxItems']()>0x0){const _0x2d4bb6=this[_0x462f80(0x1f8)](_0x20de98);if(_0x2d4bb6[_0x462f80(0x275)](/\\I\[(\d+)\]/i)){if('NoFNT'===_0x462f80(0x1ac)){const _0x34732c=this[_0x462f80(0x1ad)](_0x20de98),_0x4badce=this['textSizeEx'](_0x2d4bb6)[_0x462f80(0x22a)];if(_0x4badce<=_0x34732c[_0x462f80(0x22a)]){if(_0x462f80(0x1fe)==='Riubk')return _0x462f80(0x251);else this['calculateTextHeight'](),this['createContents'](),this['drawAllText']();}else return _0x462f80(0x1a8);}else _0x520a2a=_0x462f80(0x278)['format'](_0x40e655,_0x5326b8);}}}return _0x462f80(0x20a);},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x26b)]=function(_0x25fbab){const _0x4404cd=_0x3c0caf,_0x3c7712=this[_0x4404cd(0x1ad)](_0x25fbab),_0x41a44d=this['commandName'](_0x25fbab),_0x2d932e=this[_0x4404cd(0x26f)](_0x41a44d)[_0x4404cd(0x22a)];this['changePaintOpacity'](this[_0x4404cd(0x1ee)](_0x25fbab));const _0x576d50=this[_0x4404cd(0x27a)]();if(_0x576d50===_0x4404cd(0x272)){if(_0x4404cd(0x269)===_0x4404cd(0x269))this[_0x4404cd(0x1b9)](_0x41a44d,_0x3c7712['x']+_0x3c7712['width']-_0x2d932e,_0x3c7712['y'],_0x2d932e);else{const _0x25635a=this[_0x4404cd(0x25b)](),_0x837cc6=new _0xa65fb3(_0x25635a);this['addWindow'](_0x837cc6),this[_0x4404cd(0x268)]=_0x837cc6,this[_0x4404cd(0x25a)][_0x4404cd(0x1c2)](_0x837cc6),_0x837cc6['setBackgroundType'](_0x4e1c07[_0x4404cd(0x237)]);}}else{if(_0x576d50===_0x4404cd(0x228)){if(_0x4404cd(0x1f2)===_0x4404cd(0x1f2)){const _0x4d7745=_0x3c7712['x']+Math[_0x4404cd(0x221)]((_0x3c7712[_0x4404cd(0x22a)]-_0x2d932e)/0x2);this[_0x4404cd(0x1b9)](_0x41a44d,_0x4d7745,_0x3c7712['y'],_0x2d932e);}else _0x4e0dd0[_0x4404cd(0x1d8)][_0x4404cd(0x217)][_0x4404cd(0x1fb)](this);}else{if(_0x4404cd(0x209)===_0x4404cd(0x209))this[_0x4404cd(0x1b9)](_0x41a44d,_0x3c7712['x'],_0x3c7712['y'],_0x2d932e);else return _0xdd59b3[_0x4404cd(0x227)];}}},Window_CreditsCategory[_0x3c0caf(0x1d8)][_0x3c0caf(0x239)]=function(_0x2eb5c3){const _0x2193b4=_0x3c0caf;this[_0x2193b4(0x1f8)](_0x2eb5c3)[_0x2193b4(0x275)](/\\I\[(\d+)\]/i);const _0x1f0794=Number(RegExp['$1'])||0x0,_0x489498=this['itemLineRect'](_0x2eb5c3),_0x490fe5=_0x489498['x']+Math[_0x2193b4(0x221)]((_0x489498['width']-ImageManager[_0x2193b4(0x1ce)])/0x2),_0x6e72c6=_0x489498['y']+(_0x489498['height']-ImageManager[_0x2193b4(0x20f)])/0x2;this['drawIcon'](_0x1f0794,_0x490fe5,_0x6e72c6);};function Window_CreditsDisplay(){const _0x113940=_0x3c0caf;this[_0x113940(0x217)](...arguments);}Window_CreditsDisplay[_0x3c0caf(0x1d8)]=Object[_0x3c0caf(0x255)](Window_Selectable['prototype']),Window_CreditsDisplay['prototype']['constructor']=Window_CreditsDisplay,Window_CreditsDisplay[_0x3c0caf(0x237)]=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)][_0x3c0caf(0x197)][_0x3c0caf(0x21a)],Window_CreditsDisplay[_0x3c0caf(0x1cd)]=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)][_0x3c0caf(0x197)][_0x3c0caf(0x18f)]??0x1,Window_CreditsDisplay[_0x3c0caf(0x1c0)]=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)]['Window'][_0x3c0caf(0x23b)]??0x1,Window_CreditsDisplay[_0x3c0caf(0x271)]=VisuMZ[_0x3c0caf(0x20e)][_0x3c0caf(0x208)][_0x3c0caf(0x197)][_0x3c0caf(0x259)]??0x1,Window_CreditsDisplay['SLOW_SCROLL_SPEED']=VisuMZ[_0x3c0caf(0x20e)]['Settings'][_0x3c0caf(0x197)][_0x3c0caf(0x1a7)]||0x1,Window_CreditsDisplay['FAST_SCROLL_SPEED']=VisuMZ['CreditsPage'][_0x3c0caf(0x208)][_0x3c0caf(0x197)][_0x3c0caf(0x1b0)]||0x1,Window_CreditsDisplay[_0x3c0caf(0x265)]=VisuMZ['CreditsPage'][_0x3c0caf(0x208)][_0x3c0caf(0x197)][_0x3c0caf(0x246)]||0x1,Window_CreditsDisplay[_0x3c0caf(0x21c)]=VisuMZ[_0x3c0caf(0x20e)]['Settings'][_0x3c0caf(0x197)][_0x3c0caf(0x1ea)]||0x1,Window_CreditsDisplay['prototype'][_0x3c0caf(0x217)]=function(_0x5a3e27){const _0x156059=_0x3c0caf;this[_0x156059(0x1db)]=VisuMZ[_0x156059(0x20e)][_0x156059(0x208)][_0x156059(0x1ab)][0x0],Window_Selectable[_0x156059(0x1d8)][_0x156059(0x217)][_0x156059(0x1fb)](this,_0x5a3e27),this['_allTextHeight']=0x0,this[_0x156059(0x1bc)](),this['activate']();},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x20d)]=function(){return![];},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x1bc)]=function(){const _0x54d761=_0x3c0caf;this['calculateTextHeight'](),this[_0x54d761(0x24b)](),this[_0x54d761(0x24e)]();},Window_CreditsDisplay['prototype'][_0x3c0caf(0x218)]=function(){const _0x1e605f=_0x3c0caf,_0x29d2e6=this[_0x1e605f(0x1db)][_0x1e605f(0x190)];this['_allTextHeight']=0x0,this[_0x1e605f(0x205)]=this[_0x1e605f(0x26f)](_0x29d2e6)[_0x1e605f(0x1f0)];const _0x1df0bf=this[_0x1e605f(0x1c1)](),_0x10ecfb=Window_CreditsDisplay[_0x1e605f(0x1cd)]*_0x1df0bf,_0xf03cfb=Window_CreditsDisplay['BOTTOM_LINE_BUFFER']*_0x1df0bf;this[_0x1e605f(0x205)]+=_0x10ecfb+_0xf03cfb;},Window_CreditsDisplay[_0x3c0caf(0x1d8)]['contentsHeight']=function(){const _0x34d339=_0x3c0caf;return Math['max'](this[_0x34d339(0x205)],0x1);},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x1d2)]=function(_0x4d8eea){const _0x2af940=_0x3c0caf;if(_0x4d8eea===this['_category'])return;this[_0x2af940(0x1db)]=_0x4d8eea,this[_0x2af940(0x1bc)]();},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x24e)]=function(){const _0x63eb9=_0x3c0caf,_0x66eb6d=this[_0x63eb9(0x1db)][_0x63eb9(0x190)];this[_0x63eb9(0x213)](),this[_0x63eb9(0x257)](_0x66eb6d);if(Imported[_0x63eb9(0x22b)])this[_0x63eb9(0x18a)]();this[_0x63eb9(0x258)]();},Window_CreditsDisplay[_0x3c0caf(0x1d8)]['drawMessageText']=function(_0x3495b8){const _0x1d6900=_0x3c0caf,_0x34cc86=Math['min'](this[_0x1d6900(0x1e7)],Window_CreditsDisplay['CENTER_WIDTH']||this[_0x1d6900(0x1e7)]),_0x5e2600=Math[_0x1d6900(0x221)]((this[_0x1d6900(0x1e7)]-_0x34cc86)/0x2),_0x9ac51a=this[_0x1d6900(0x1c1)]()*Window_CreditsDisplay[_0x1d6900(0x1cd)];this[_0x1d6900(0x1b9)](_0x3495b8,_0x5e2600,_0x9ac51a,_0x34cc86);},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x21b)]=function(){},Window_CreditsDisplay['prototype'][_0x3c0caf(0x1c5)]=function(){const _0x204aec=_0x3c0caf;if(!this['active'])return;if(Input[_0x204aec(0x223)]('down')){if('kHLNX'!==_0x204aec(0x1a1))this['processSlowScroll'](!![]);else return _0x204aec(0x1a8);}else{if(Input[_0x204aec(0x223)]('up')){if(_0x204aec(0x25c)!==_0x204aec(0x224))this[_0x204aec(0x19b)](![]);else{const _0x206cfa=this[_0x204aec(0x1f8)](_0x77689);if(_0x206cfa['match'](/\\I\[(\d+)\]/i)){const _0x8d866d=this[_0x204aec(0x1ad)](_0x2be913),_0x353e1d=this['textSizeEx'](_0x206cfa)['width'];return _0x353e1d<=_0x8d866d['width']?_0x204aec(0x251):_0x204aec(0x1a8);}}}else{if(Input[_0x204aec(0x223)](_0x204aec(0x1bd)))this[_0x204aec(0x24d)](!![]);else{if(Input['isPressed']('pageup'))this[_0x204aec(0x24d)](![]);else{if(Input['isTriggered']('home'))this[_0x204aec(0x258)](!![]);else{if(Input[_0x204aec(0x207)](_0x204aec(0x202))){if(_0x204aec(0x215)!==_0x204aec(0x215)){_0xc9e711[_0x204aec(0x1d8)][_0x204aec(0x1ec)][_0x204aec(0x1fb)](this);if(this['_commandNameWindow'])this[_0x204aec(0x22c)]();if(this[_0x204aec(0x1d3)])this[_0x204aec(0x1ae)]();}else this[_0x204aec(0x21d)](!![]);}}}}}}},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x19b)]=function(_0x3a9784){const _0x227fae=_0x3c0caf;let _0x2363c1=this[_0x227fae(0x1f7)]['y'];this['origin']['y']+=(_0x3a9784?0x1:-0x1)*Window_CreditsDisplay[_0x227fae(0x253)];let _0x5b9776=Math[_0x227fae(0x24a)](0x0,this['_allTextHeight']-this[_0x227fae(0x222)]);this[_0x227fae(0x1f7)]['y']=this[_0x227fae(0x1f7)]['y'][_0x227fae(0x256)](0x0,_0x5b9776);if(_0x2363c1!==this[_0x227fae(0x1f7)]['y']&&Graphics[_0x227fae(0x225)]%Window_CreditsDisplay[_0x227fae(0x265)]===0x0)this[_0x227fae(0x201)]();},Window_CreditsDisplay['prototype']['processFastScroll']=function(_0x30b39d){const _0x5810d5=_0x3c0caf;let _0xff5e59=this['origin']['y'];this[_0x5810d5(0x1f7)]['y']+=(_0x30b39d?0x1:-0x1)*Window_CreditsDisplay['FAST_SCROLL_SPEED'];let _0x2ee7f2=Math[_0x5810d5(0x24a)](0x0,this['_allTextHeight']-this['innerHeight']);this[_0x5810d5(0x1f7)]['y']=this[_0x5810d5(0x1f7)]['y'][_0x5810d5(0x256)](0x0,_0x2ee7f2);if(_0xff5e59!==this[_0x5810d5(0x1f7)]['y']&&Graphics[_0x5810d5(0x225)]%Window_CreditsDisplay['FAST_SOUND_FREQUENCY']===0x0)this[_0x5810d5(0x201)]();},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x258)]=function(_0x2bfbd7){const _0x2ed816=_0x3c0caf;let _0x45a239=this[_0x2ed816(0x1f7)]['y'];this[_0x2ed816(0x1f7)]['y']=0x0;if(_0x2bfbd7&&_0x45a239!==this['origin']['y'])this[_0x2ed816(0x201)]();},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x21d)]=function(_0x118254){const _0x16553e=_0x3c0caf;let _0x2f7416=this[_0x16553e(0x1f7)]['y'],_0x3529d0=Math['max'](0x0,this['_allTextHeight']-this[_0x16553e(0x222)]);this[_0x16553e(0x1f7)]['y']=_0x3529d0;if(_0x118254&&_0x2f7416!==this[_0x16553e(0x1f7)]['y'])this[_0x16553e(0x201)]();},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x1ed)]=function(){const _0x411664=_0x3c0caf;this[_0x411664(0x247)]=this[_0x411664(0x1f7)]['y']<this[_0x411664(0x205)]-this[_0x411664(0x222)],this[_0x411664(0x1a6)]=this[_0x411664(0x1f7)]['y']>0x0;},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x1e5)]=function(_0x1af6a2,_0x2a3fe4){const _0x3f8741=_0x3c0caf;this[_0x3f8741(0x1f7)]['y']+=_0x2a3fe4;let _0x2f279b=Math[_0x3f8741(0x24a)](0x0,this[_0x3f8741(0x205)]-this[_0x3f8741(0x222)]);this['origin']['y']=this['origin']['y']['clamp'](0x0,_0x2f279b);},Window_CreditsDisplay[_0x3c0caf(0x1d8)][_0x3c0caf(0x26a)]=function(_0x1dd78b,_0x41d80f){const _0x2d9c87=_0x3c0caf;this[_0x2d9c87(0x1f7)]['y']+=_0x41d80f;let _0x2d3c04=Math[_0x2d9c87(0x24a)](0x0,this[_0x2d9c87(0x205)]-this['innerHeight']);this[_0x2d9c87(0x1f7)]['y']=this[_0x2d9c87(0x1f7)]['y']['clamp'](0x0,_0x2d3c04);};