//=============================================================================
// VisuStella MZ - State Tooltips
// VisuMZ_3_StateTooltips.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StateTooltips = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StateTooltips = VisuMZ.StateTooltips || {};
VisuMZ.StateTooltips.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [StateTooltips]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/State_Tooltips_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a tooltip window in battle (and other scenes) whenever the
 * player's mouse cursor is hovered over specific areas of the screen. The
 * tooltip window will display a list of the states, buffs, and debuffs the
 * hovered battler has along with a description of the entities and their
 * remaining duration.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Tooltip window displays when hovering over battlers and specific windows
 *   to display their states, buffs, and debuffs.
 * * Adjust the text format in which information is displayed inside the
 *   tooltip window.
 * * Modify the descriptions for states, buffs, and debuffs to your liking.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_MessageCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_2_PartySystem
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * These plugins have scenes that also support tooltips if this plugin is also
 * installed while those are active in your game's project.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_ElementStatusCore
 * 
 * The updated Status Menu currently does not contain tooltip support for the
 * "General" pages that may display the actor's states. This is due to the
 * customization aspect for the various Status Menu pages. There will be a
 * future update where we will adapt this feature.
 * 
 * ---
 *
 * VisuMZ_2_DragonbonesUnion
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
 *
 * ---
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
 * === Description-Related Notetags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: State Notetags
 * - Assigns a help description for the state.
 * - Replace 'text' with text you want displayed for the tooltip window.
 * - This best works with one line.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the plugin's Plugin Parameters.
 * - Insert %1 into the help description to show any data that would otherwise
 *   be shown as the state display, such as Absorption Barrier count.
 *
 * ---
 * 
 * <Exclude From Tooltips>
 * 
 * - Used for: State Notetags
 * - Excludes the state from being displayed in the state tooltips.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * General settings for the State Tooltips Window.
 *
 * ---
 *
 * Appearance
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * Vocabulary settings for the State Tooltips Window.
 *
 * ---
 *
 * General
 * 
 *   Default Description:
 *   - This is the default description that appears for a state without a
 *     declared description. %1 - State's Name
 *   - Can use text codes.
 *
 * ---
 *
 * Entries
 * 
 *   State Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color
 * 
 *   Buff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color
 * 
 *   Debuff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * 
 *   Replace Whites?:
 *   - If state, buff, debuff names are white, replace them?
 * 
 *     Replacement Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Action End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Turn End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Passive Text:
 *   - Can use text codes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Choose which windows to enable tooltip support for.
 *
 * ---
 *
 * Settings
 * 
 *   Window_BattleStatus:
 *   Window_ClassStatus:
 *   Window_EquipStatus:
 *   Window_MenuActor:
 *   Window_MenuStatus:
 *   Window_PartyStatus:
 *   Window_SkillStatus:
 *   Window_Status:
 *   - Enable State Tooltips for this window?
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
 * Version 1.06: September 14, 2023
 * * Compatibility Update!
 * ** Added better compatibility with VisuMZ_3_FrontviewBattleUI!
 * 
 * Version 1.05: February 24, 2022
 * * Feature Update!
 * ** When the Choice List Window is hovered over, the State Tooltip window
 *    will hide itself. Update made by Irina.
 * 
 * Version 1.04: October 21, 2021
 * * Documentation Update!
 * ** Added a section for VisuMZ_1_ElementStatusCore in the "VisuStella MZ
 *    Compatibility" section since we received a very good question on it.
 * *** The updated Status Menu currently does not contain tooltip support for
 *     the "General" pages that may display the actor's states. This is due to
 *     the customization aspect for the various Status Menu pages. There will
 *     be a future update where we will adapt this feature.
 * 
 * Version 1.03: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina.
 * *** <Exclude From Tooltips>
 * **** Excludes the state from being displayed in the state tooltips.
 * 
 * Version 1.01: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.00 Official Release Date: February 24, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StateTooltips
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc General settings for the State Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc Vocabulary settings for the State Tooltips Window.
 * @default {"General":"","HelpDescription:json":"\"-\"","Entries":"","StateFmt:str":"\\C[%5]%1%2:\\C[0] %3 %4","BuffFmt:str":"\\C[%5]%1%2:\\C[0] Increases unit's %2 to \\C[%5]%3%\\C[0] %4","DebuffFmt:str":"\\C[%5]%1%2:\\C[0] Decreases unit's %2 to \\C[%5]%3%\\C[0] %4","ReplaceWhite:eval":"true","WhiteReplaceColor:str":"5","Turns":"","ActionsFmt:str":"\\C[6](Actions \\C[%2]%1\\C[6])\\C[0]","TurnsFmt:str":"\\C[5](Turns \\C[%2]%1\\C[5])\\C[0]","PassiveText:str":"\\C[4](Passive)\\C[0]"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Choose which windows to enable tooltip support for.
 * @default {"Window_BattleStatus:eval":"true","Window_ClassStatus:eval":"true","Window_EquipStatus:eval":"true","Window_MenuActor:eval":"true","Window_MenuStatus:eval":"true","Window_PartyStatus:eval":"true","Window_SkillStatus:eval":"true","Window_Status:eval":"true"}
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
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Vocab Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param HelpDescription:json
 * @text Default Description
 * @parent General
 * @type note
 * @desc This is the default description that appears for a state
 * without a declared description. %1 - State's Name
 * @default "-"
 * 
 * @param Entries
 *
 * @param StateFmt:str
 * @text State Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Description, %4 - Duration, %5 - State Color
 * @default \C[%5]%1%2:\C[0] %3 %4
 *
 * @param BuffFmt:str
 * @text Buff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Buff Color
 * @default \C[%5]%1%2:\C[0] Increases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param DebuffFmt:str
 * @text Debuff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * @default \C[%5]%1%2:\C[0] Decreases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param ReplaceWhite:eval
 * @text Replace Whites?
 * @parent Entries
 * @type boolean
 * @on Replace
 * @off Don't Replace
 * @desc If state, buff, debuff names are white, replace them?
 * @default true
 *
 * @param WhiteReplaceColor:str
 * @text Replacement Color
 * @parent ReplaceWhite:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 5
 * 
 * @param Turns
 * @text Turns Remaining
 *
 * @param ActionsFmt:str
 * @text Action End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[6](Actions \C[%2]%1\C[6])\C[0]
 *
 * @param TurnsFmt:str
 * @text Turn End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[5](Turns \C[%2]%1\C[5])\C[0]
 *
 * @param PassiveText:str
 * @text Passive Text
 * @parent Turns
 * @desc Can use text codes.
 * @default \C[4](Passive)\C[0]
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_BattleStatus:eval
 * @text Window_BattleStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_ClassStatus:eval
 * @text Window_ClassStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_EquipStatus:eval
 * @text Window_EquipStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuActor:eval
 * @text Window_MenuActor
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuStatus:eval
 * @text Window_MenuStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_PartyStatus:eval
 * @text Window_PartyStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_SkillStatus:eval
 * @text Window_SkillStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_Status:eval
 * @text Window_Status
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 */
//=============================================================================

const _0x33539d=_0x18a8;(function(_0x3256dd,_0x137157){const _0x179fd7=_0x18a8,_0xb2771a=_0x3256dd();while(!![]){try{const _0x26b7fc=parseInt(_0x179fd7(0x134))/0x1+-parseInt(_0x179fd7(0x105))/0x2+-parseInt(_0x179fd7(0x16f))/0x3+-parseInt(_0x179fd7(0xf7))/0x4+-parseInt(_0x179fd7(0x12a))/0x5*(-parseInt(_0x179fd7(0x1a9))/0x6)+parseInt(_0x179fd7(0x127))/0x7*(-parseInt(_0x179fd7(0x158))/0x8)+parseInt(_0x179fd7(0x168))/0x9*(parseInt(_0x179fd7(0x141))/0xa);if(_0x26b7fc===_0x137157)break;else _0xb2771a['push'](_0xb2771a['shift']());}catch(_0x210714){_0xb2771a['push'](_0xb2771a['shift']());}}}(_0x314d,0xd9f94));var label=_0x33539d(0xf4),tier=tier||0x0,dependencies=[_0x33539d(0x16c)],pluginData=$plugins[_0x33539d(0xf8)](function(_0x155e09){const _0x34e006=_0x33539d;return _0x155e09[_0x34e006(0x128)]&&_0x155e09['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x33539d(0x19e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x33539d(0x155)]=function(_0x2ce0d3,_0x59fd3d){const _0x424c48=_0x33539d;for(const _0x2341a0 in _0x59fd3d){if(_0x2341a0[_0x424c48(0x1aa)](/(.*):(.*)/i)){if(_0x424c48(0x190)===_0x424c48(0x190)){const _0x1faa1c=String(RegExp['$1']),_0x43d6af=String(RegExp['$2'])[_0x424c48(0x10e)]()[_0x424c48(0xf5)]();let _0x2c7aa4,_0x4c6075,_0x53844b;switch(_0x43d6af){case _0x424c48(0x179):_0x2c7aa4=_0x59fd3d[_0x2341a0]!==''?Number(_0x59fd3d[_0x2341a0]):0x0;break;case _0x424c48(0x104):_0x4c6075=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):[],_0x2c7aa4=_0x4c6075[_0x424c48(0x198)](_0x1a651e=>Number(_0x1a651e));break;case _0x424c48(0x196):_0x2c7aa4=_0x59fd3d[_0x2341a0]!==''?eval(_0x59fd3d[_0x2341a0]):null;break;case _0x424c48(0x110):_0x4c6075=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):[],_0x2c7aa4=_0x4c6075[_0x424c48(0x198)](_0x12063a=>eval(_0x12063a));break;case'JSON':_0x2c7aa4=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):'';break;case'ARRAYJSON':_0x4c6075=_0x59fd3d[_0x2341a0]!==''?JSON['parse'](_0x59fd3d[_0x2341a0]):[],_0x2c7aa4=_0x4c6075[_0x424c48(0x198)](_0x421c73=>JSON['parse'](_0x421c73));break;case _0x424c48(0x11d):_0x2c7aa4=_0x59fd3d[_0x2341a0]!==''?new Function(JSON['parse'](_0x59fd3d[_0x2341a0])):new Function('return\x200');break;case _0x424c48(0x10c):_0x4c6075=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):[],_0x2c7aa4=_0x4c6075[_0x424c48(0x198)](_0x24ac36=>new Function(JSON['parse'](_0x24ac36)));break;case _0x424c48(0x11c):_0x2c7aa4=_0x59fd3d[_0x2341a0]!==''?String(_0x59fd3d[_0x2341a0]):'';break;case _0x424c48(0xf0):_0x4c6075=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):[],_0x2c7aa4=_0x4c6075[_0x424c48(0x198)](_0x30c716=>String(_0x30c716));break;case'STRUCT':_0x53844b=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):{},_0x2c7aa4=VisuMZ[_0x424c48(0x155)]({},_0x53844b);break;case _0x424c48(0x182):_0x4c6075=_0x59fd3d[_0x2341a0]!==''?JSON[_0x424c48(0x12c)](_0x59fd3d[_0x2341a0]):[],_0x2c7aa4=_0x4c6075[_0x424c48(0x198)](_0xafb2f8=>VisuMZ[_0x424c48(0x155)]({},JSON[_0x424c48(0x12c)](_0xafb2f8)));break;default:continue;}_0x2ce0d3[_0x1faa1c]=_0x2c7aa4;}else return null;}}return _0x2ce0d3;},(_0x50ab8c=>{const _0x4b0992=_0x33539d,_0x42caed=_0x50ab8c[_0x4b0992(0x106)];for(const _0x35f6f1 of dependencies){if(!Imported[_0x35f6f1]){alert(_0x4b0992(0x116)[_0x4b0992(0x193)](_0x42caed,_0x35f6f1)),SceneManager[_0x4b0992(0x137)]();break;}}const _0x5c4b42=_0x50ab8c['description'];if(_0x5c4b42['match'](/\[Version[ ](.*?)\]/i)){const _0x2cf9a1=Number(RegExp['$1']);_0x2cf9a1!==VisuMZ[label][_0x4b0992(0x11e)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x42caed,_0x2cf9a1)),SceneManager[_0x4b0992(0x137)]());}if(_0x5c4b42[_0x4b0992(0x1aa)](/\[Tier[ ](\d+)\]/i)){const _0x4fddc9=Number(RegExp['$1']);if(_0x4fddc9<tier){if(_0x4b0992(0x1bb)===_0x4b0992(0x1bb))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4b0992(0x193)](_0x42caed,_0x4fddc9,tier)),SceneManager[_0x4b0992(0x137)]();else{const _0x52073c=this[_0x4b0992(0x11a)](),_0x298ae6=this[_0x4b0992(0x187)](_0x52073c);return _0x298ae6;}}else tier=Math[_0x4b0992(0x152)](_0x4fddc9,tier);}VisuMZ[_0x4b0992(0x155)](VisuMZ[label][_0x4b0992(0x19e)],_0x50ab8c[_0x4b0992(0xfa)]);})(pluginData),VisuMZ['StateTooltips'][_0x33539d(0x11b)]={'HelpDescription':/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i,'Exclude':/<EXCLUDE FROM (?:TOOLTIP|TOOLTIPS)>/i},VisuMZ[_0x33539d(0xf4)][_0x33539d(0x185)]=Scene_Boot['prototype'][_0x33539d(0x178)],Scene_Boot[_0x33539d(0x157)]['onDatabaseLoaded']=function(){const _0x443366=_0x33539d;VisuMZ[_0x443366(0xf4)][_0x443366(0x185)]['call'](this),this[_0x443366(0x1b8)]();},Scene_Boot['prototype'][_0x33539d(0x1b8)]=function(){const _0x21bf44=_0x33539d;this[_0x21bf44(0x18a)]();},Scene_Boot[_0x33539d(0x157)][_0x33539d(0x18a)]=function(){const _0x206d78=_0x33539d;if(VisuMZ[_0x206d78(0x171)])return;for(const _0xac88d1 of $dataStates){if(!_0xac88d1)continue;VisuMZ['StateTooltips'][_0x206d78(0x12b)](_0xac88d1);}},VisuMZ[_0x33539d(0xf4)]['ParseStateNotetags']=VisuMZ[_0x33539d(0xee)],VisuMZ['ParseStateNotetags']=function(_0x268508){const _0x242208=_0x33539d;VisuMZ[_0x242208(0xf4)][_0x242208(0xee)][_0x242208(0x133)](this,_0x268508),VisuMZ[_0x242208(0xf4)]['Parse_Notetags_Description'](_0x268508);},VisuMZ[_0x33539d(0xf4)][_0x33539d(0x12b)]=function(_0x2afc96){const _0x57efe3=_0x33539d;_0x2afc96[_0x57efe3(0x140)]=VisuMZ['StateTooltips'][_0x57efe3(0x19e)][_0x57efe3(0x19f)]['HelpDescription'];const _0x2155b6=VisuMZ['StateTooltips'][_0x57efe3(0x11b)],_0x36c8bc=_0x2afc96[_0x57efe3(0x1be)];if(_0x36c8bc['match'](_0x2155b6[_0x57efe3(0xef)])){if(_0x57efe3(0x164)!==_0x57efe3(0x164)){const _0x1186ae=this[_0x57efe3(0x10a)]();_0x1186ae&&_0xd972[_0x57efe3(0x131)]()===_0x1186ae&&_0x31f8ed[_0x57efe3(0x188)](null);}else _0x2afc96[_0x57efe3(0x140)]=String(RegExp['$1'])[_0x57efe3(0xf5)]();}},ColorManager[_0x33539d(0x12f)]=function(_0x1cb0fc){const _0x43d26b=_0x33539d;_0x1cb0fc=String(_0x1cb0fc);if(_0x1cb0fc['match'](/#(.*)/i)){if(_0x43d26b(0x176)!==_0x43d26b(0x146))return _0x43d26b(0x1a7)[_0x43d26b(0x193)](String(RegExp['$1']));else this[_0x43d26b(0xf1)]+=_0x4b2c56+'\x0a';}else return this[_0x43d26b(0x166)](Number(_0x1cb0fc));},SceneManager[_0x33539d(0x1a6)]=function(){const _0x5dc741=_0x33539d;return this[_0x5dc741(0x167)]&&this[_0x5dc741(0x167)][_0x5dc741(0x1b2)]===Scene_Battle;},SceneManager[_0x33539d(0x131)]=function(){const _0x124ca5=_0x33539d,_0x26498b=SceneManager['_scene'][_0x124ca5(0x181)];if(!_0x26498b)return null;return _0x26498b[_0x124ca5(0x159)];},SceneManager['setStateTooltipBattler']=function(_0x2839c8){const _0x3835f0=_0x33539d;if(_0x2839c8&&!_0x2839c8[_0x3835f0(0x1a1)]())return;if(_0x2839c8&&_0x2839c8[_0x3835f0(0x12d)]())return;const _0x226b8e=SceneManager[_0x3835f0(0x167)][_0x3835f0(0x181)];if(!_0x226b8e)return;_0x226b8e[_0x3835f0(0x15d)](_0x2839c8);},SceneManager['refreshStateTooltipBattler']=function(_0x4dbb14){const _0x27444f=_0x33539d;if(_0x4dbb14&&!_0x4dbb14[_0x27444f(0x1a1)]())return;const _0xcf5b7f=SceneManager[_0x27444f(0x167)]['_stateTooltipWindow'];if(!_0xcf5b7f)return;if(_0xcf5b7f[_0x27444f(0x159)]!==_0x4dbb14)return;_0xcf5b7f['requestRefresh']();},VisuMZ[_0x33539d(0xf4)][_0x33539d(0x15c)]=Game_Battler[_0x33539d(0x157)][_0x33539d(0x1bf)],Game_Battler[_0x33539d(0x157)][_0x33539d(0x1bf)]=function(){const _0x4816db=_0x33539d;VisuMZ[_0x4816db(0xf4)][_0x4816db(0x15c)][_0x4816db(0x133)](this),SceneManager[_0x4816db(0x115)](this);},VisuMZ['StateTooltips'][_0x33539d(0x197)]=Scene_Base[_0x33539d(0x157)][_0x33539d(0xfc)],Scene_Base[_0x33539d(0x157)][_0x33539d(0xfc)]=function(){const _0xf5fb0=_0x33539d;VisuMZ[_0xf5fb0(0xf4)]['Scene_Base_createWindowLayer'][_0xf5fb0(0x133)](this),this[_0xf5fb0(0x10b)]();},Scene_Base[_0x33539d(0x157)][_0x33539d(0x10b)]=function(){const _0x5ba2bb=_0x33539d;this['_stateTooltipWindow']=new Window_StateTooltip(),this[_0x5ba2bb(0xfe)](this[_0x5ba2bb(0x181)]);},VisuMZ[_0x33539d(0xf4)]['Sprite_Clickable_onMouseEnter']=Sprite_Clickable[_0x33539d(0x157)][_0x33539d(0x1b1)],Sprite_Clickable[_0x33539d(0x157)][_0x33539d(0x1b1)]=function(){const _0x1ea8af=_0x33539d;VisuMZ['StateTooltips'][_0x1ea8af(0x14c)][_0x1ea8af(0x133)](this),this[_0x1ea8af(0x121)]();},VisuMZ['StateTooltips']['Sprite_Clickable_onMouseExit']=Sprite_Clickable[_0x33539d(0x157)][_0x33539d(0x17c)],Sprite_Clickable['prototype']['onMouseExit']=function(){const _0x7bbdbb=_0x33539d;VisuMZ[_0x7bbdbb(0xf4)][_0x7bbdbb(0x1c2)]['call'](this),this['onMouseExitStateTooltips']();},Sprite_Clickable['prototype'][_0x33539d(0x121)]=function(){this['setStateTooltipBattler']();},Sprite_Clickable[_0x33539d(0x157)]['onMouseExitStateTooltips']=function(){const _0x147c6b=_0x33539d,_0x65fbf4=this[_0x147c6b(0x10a)]();_0x65fbf4&&SceneManager[_0x147c6b(0x131)]()===_0x65fbf4&&SceneManager[_0x147c6b(0x188)](null);},Sprite_Clickable[_0x33539d(0x157)][_0x33539d(0x188)]=function(){const _0x1777ea=_0x33539d,_0x11090c=this[_0x1777ea(0x10a)]();if(_0x11090c){if(_0x1777ea(0x1b5)!==_0x1777ea(0x1b5)){const _0x3c50d5=new _0x457a5f(_0x4d0658['x'],_0xdcd2d5['y']),_0x4e9a28=this['worldTransform'][_0x1777ea(0x125)](_0x3c50d5),_0x506f68=new _0x3c9007(0x0,0x0,this[_0x1777ea(0x194)],this['height']);return _0x506f68['contains'](_0x4e9a28['x'],_0x4e9a28['y']);}else SceneManager[_0x1777ea(0x188)](_0x11090c);}},Sprite_Clickable[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){return null;},VisuMZ[_0x33539d(0xf4)][_0x33539d(0x184)]=Sprite_Battler[_0x33539d(0x157)]['onMouseEnter'],Sprite_Battler[_0x33539d(0x157)]['onMouseEnter']=function(){const _0x334fda=_0x33539d;VisuMZ[_0x334fda(0xf4)][_0x334fda(0x184)]['call'](this),this[_0x334fda(0x188)]();},Sprite_Battler['prototype'][_0x33539d(0x10a)]=function(){const _0x6c69ca=_0x33539d;return this[_0x6c69ca(0x159)];},Window_Base[_0x33539d(0x157)][_0x33539d(0x10d)]=function(){const _0x1a6e74=_0x33539d,_0x1f57ce=new Point(TouchInput['x'],TouchInput['y']),_0x4df970=this[_0x1a6e74(0x107)][_0x1a6e74(0x125)](_0x1f57ce);return this[_0x1a6e74(0xf6)]()[_0x1a6e74(0x156)](_0x4df970['x'],_0x4df970['y']);},Window_Base[_0x33539d(0x157)]['dimensionRect']=function(){const _0x1e896d=_0x33539d;return new Rectangle(0x0,0x0,this[_0x1e896d(0x194)],this[_0x1e896d(0x16d)]);},VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19d)]=Window_Selectable['prototype']['processTouch'],Window_Selectable[_0x33539d(0x157)][_0x33539d(0xf3)]=function(){const _0x5b6052=_0x33539d;VisuMZ[_0x5b6052(0xf4)][_0x5b6052(0x19d)]['call'](this);if(this[_0x5b6052(0x1b2)][_0x5b6052(0x106)]['match'](/Debug/i))return;this['processTouchStateTooltips']();},Window_Selectable[_0x33539d(0x157)]['processTouchStateTooltips']=function(){const _0x14f8de=_0x33539d;if(!this[_0x14f8de(0x139)]())return;this[_0x14f8de(0x18e)]=this[_0x14f8de(0x18e)]||{};if(!this[_0x14f8de(0x12e)]()){this[_0x14f8de(0x18e)][_0x14f8de(0x14f)]&&(_0x14f8de(0xf9)!=='nCCQF'?this['closeTouchStateTooltips']():_0x1fe59e=_0x64c5d7[_0x14f8de(0x152)](_0x547b13,_0xe0ec1d));return;}else'OBdoK'==='qNwJZ'?(this[_0x14f8de(0x181)]=new _0x2aaee8(),this[_0x14f8de(0xfe)](this[_0x14f8de(0x181)])):this['_cache_StateTooltips'][_0x14f8de(0x14f)]=!![];if(!this[_0x14f8de(0x13e)]){if(_0x14f8de(0x1a3)!==_0x14f8de(0x13b)){if(this[_0x14f8de(0x18e)]['visible']){if(_0x14f8de(0x118)!==_0x14f8de(0x118)){const _0x560e0d=this[_0x14f8de(0x13a)]();this[_0x14f8de(0x142)]=this[_0x14f8de(0x1af)]=_0x560e0d;}else this[_0x14f8de(0x144)]();}return;}else{if(this['_battler']===_0x17474b)return;this[_0x14f8de(0x159)]=_0x4c89a2,this[_0x14f8de(0x159)]?this[_0x14f8de(0x1bf)]():this[_0x14f8de(0x148)]();}}else this[_0x14f8de(0x18e)][_0x14f8de(0x13e)]=!![];if(this['_cache_StateTooltips']['x']!==this['x']||this['_cache_StateTooltips']['y']!==this['y']||this[_0x14f8de(0x18e)][_0x14f8de(0x1c3)]!==TouchInput['x']||this[_0x14f8de(0x18e)][_0x14f8de(0x1c3)]!==TouchInput['y']){this[_0x14f8de(0x18e)]['x']=this['x'],this[_0x14f8de(0x18e)]['y']=this['y'],this['_cache_StateTooltips'][_0x14f8de(0x1c3)]=TouchInput['x'],this[_0x14f8de(0x18e)][_0x14f8de(0x113)]=TouchInput['y'];if(this['isStateTooltipTouched']())this['_cache_StateTooltips']['hitTest']=!![],this[_0x14f8de(0x17e)]();else{if('glDcM'===_0x14f8de(0x15f)){if(this[_0x14f8de(0x18e)]['hitTest']){if(_0x14f8de(0x180)===_0x14f8de(0x120)){const _0x479511=this[_0x14f8de(0x10a)]();_0x479511?(this[_0x14f8de(0x18e)][_0x14f8de(0x138)]=_0x479511,_0x18ff7d[_0x14f8de(0x188)](_0x479511)):this[_0x14f8de(0x144)]();}else this[_0x14f8de(0x144)]();}}else this[_0x14f8de(0x144)]();}}},Window_Selectable[_0x33539d(0x157)][_0x33539d(0x139)]=function(){const _0x245689=_0x33539d;return VisuMZ[_0x245689(0xf4)]['Settings'][_0x245689(0x103)][this['constructor'][_0x245689(0x106)]];},Window_Selectable['prototype'][_0x33539d(0x150)]=function(){return this['hitIndex']()>=0x0;},Window_Selectable[_0x33539d(0x157)][_0x33539d(0x1ab)]=function(){const _0x509fa1=_0x33539d,_0x5a900a=new Point(TouchInput['x'],TouchInput['y']),_0x47fb64=this[_0x509fa1(0x107)][_0x509fa1(0x125)](_0x5a900a),_0x184945=new Rectangle(0x0,0x0,this[_0x509fa1(0x194)],this[_0x509fa1(0x16d)]);return _0x184945[_0x509fa1(0x156)](_0x47fb64['x'],_0x47fb64['y']);},Window_Selectable[_0x33539d(0x157)][_0x33539d(0x17e)]=function(){const _0x46d820=_0x33539d,_0x2bd736=this[_0x46d820(0x10a)]();if(_0x2bd736)this[_0x46d820(0x18e)][_0x46d820(0x138)]=_0x2bd736,SceneManager['setStateTooltipBattler'](_0x2bd736);else{if('uGgev'===_0x46d820(0x1b4))this['closeTouchStateTooltips']();else{if(_0x4f63a1&&_0x5b26ca['isOpen']()&&_0x4d0c97[_0x46d820(0x16b)]&&_0x3500b5[_0x46d820(0x10d)]())return 0x0;}}},Window_Selectable[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){return null;},Window_Selectable['prototype'][_0x33539d(0x144)]=function(){const _0x27da6d=_0x33539d;this[_0x27da6d(0x18e)][_0x27da6d(0x14f)]=![],this['_cache_StateTooltips'][_0x27da6d(0x13e)]=![],this[_0x27da6d(0x18e)][_0x27da6d(0x175)]=![],this['_cache_StateTooltips'][_0x27da6d(0x138)]&&(SceneManager[_0x27da6d(0x188)](null),this[_0x27da6d(0x18e)]['battler']=null);},Window_MenuStatus[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){const _0x3ec470=_0x33539d,_0x48268d=this[_0x3ec470(0x11a)](),_0x4b0fba=this[_0x3ec470(0x187)](_0x48268d);return _0x4b0fba;},Window_SkillStatus[_0x33539d(0x157)][_0x33539d(0x150)]=function(){return this['isStateTooltipHovered']();},Window_SkillStatus[_0x33539d(0x157)]['getStateTooltipBattler']=function(){const _0x12d18d=_0x33539d;return this[_0x12d18d(0x1ae)];},Window_EquipStatus[_0x33539d(0x157)][_0x33539d(0x150)]=function(){return this['isStateTooltipHovered']();},Window_EquipStatus[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){return this['_actor'];},Window_Status[_0x33539d(0x157)][_0x33539d(0x150)]=function(){const _0x8a89dd=_0x33539d;return this[_0x8a89dd(0x1ab)]();},Window_Status['prototype']['getStateTooltipBattler']=function(){const _0x500b6c=_0x33539d;return this[_0x500b6c(0x1ae)];},Window_BattleStatus[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){const _0x436df0=_0x33539d,_0x52463b=this[_0x436df0(0x11a)](),_0x11b242=this[_0x436df0(0x187)](_0x52463b);return _0x11b242;},Window_BattleStatus[_0x33539d(0x157)][_0x33539d(0x139)]=function(){const _0x16aeee=_0x33539d;if(Imported[_0x16aeee(0x17f)]&&BattleManager[_0x16aeee(0x1bd)]()){if(VisuMZ[_0x16aeee(0x13c)]['version']<1.09){let _0x4f6451='';_0x4f6451+=_0x16aeee(0x16e),_0x4f6451+=_0x16aeee(0x1c1),alert(_0x4f6451),SceneManager[_0x16aeee(0x137)]();}return![];}return Window_StatusBase['prototype'][_0x16aeee(0x139)][_0x16aeee(0x133)](this);};Imported[_0x33539d(0x130)]&&(Window_ClassStatus[_0x33539d(0x157)][_0x33539d(0x150)]=function(){return this['isStateTooltipHovered']();},Window_ClassStatus[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){const _0x36d42c=_0x33539d;return this[_0x36d42c(0x1ae)];});function _0x18a8(_0xbcf08c,_0x550ec5){const _0x314da6=_0x314d();return _0x18a8=function(_0x18a8f9,_0x52838a){_0x18a8f9=_0x18a8f9-0xee;let _0x33daad=_0x314da6[_0x18a8f9];return _0x33daad;},_0x18a8(_0xbcf08c,_0x550ec5);}function _0x314d(){const _0x39a71a=['EVAL','Scene_Base_createWindowLayer','map','itemPadding','debuffColor','WINDOW_SCALE','updateOpacity','Window_Selectable_processTouch','Settings','Vocab','buffTurns','isAppeared','replaceHexColors','NykNl','paramBuffRate','obtainEscapeString','isSceneBattle','#%1','clampPosition','29790aOlurP','match','isStateTooltipHovered','Exclude','replace','_actor','contentsOpacity','setupText','onMouseEnter','constructor','initialize','uGgev','QySpk','convertMessageKeywords','PASSIVE_TEXT','process_VisuMZ_StateTooltips','isBuffAffected','param','ULVlq','create','isUsingFrontviewUiLayout','note','refresh','update','in\x20order\x20for\x20VisuMZ_3_StateTooltips\x20to\x20work.','Sprite_Clickable_onMouseExit','touchX','WindowSkin','_skillWindow','CqMSZ','WindowOpacity','ParseStateNotetags','HelpDescription','ARRAYSTR','_text','CPKbj','processTouch','StateTooltips','trim','dimensionRect','1208192GdrFOu','filter','toHDF','parameters','includes','createWindowLayer','TURNS_FMT','addChild','createContents','_itemWindow','setupBuffText','states','Window','ARRAYNUM','1459576ocLNvm','name','worldTransform','DebuffFmt','VisuMZ_2_PartySystem','getStateTooltipBattler','createStateTooltipWindow','ARRAYFUNC','isMouseHovered','toUpperCase','processEscapeCharacter','ARRAYEVAL','Sywzw','contents','touchY','setupBuffTurnText','refreshStateTooltipBattler','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','processTouchStateTooltips','IIcZI','WINDOW_SKIN_FILENAME','hitIndex','RegExp','STR','FUNC','version','scale','hKexz','onMouseEnterStateTooltips','\x5cI[%1]','WhiteReplaceColor','OffsetX','applyInverse','ACTIONS_FMT','156737QhlzGa','status','autoRemovalTiming','575coMhTM','Parse_Notetags_Description','parse','isDead','isOpen','getColor','VisuMZ_2_ClassChangeSystem','currentTooltipBattler','TWAgO','call','91516cpgppA','WINDOW_SKIN_OPACITY','MOUSE_OFFSET_Y','exit','battler','isStateTooltipEnabled','targetOpacity','RivWL','FrontviewBattleUI','StateFmt','visible','iconIndex','description','11079090QxTMzv','opacity','updateBackOpacity','closeTouchStateTooltips','\x5cHEXCOLOR<#%1>','eTsYt','updateDeath','hide','length','setupStateTurnText','updatePosition','Sprite_Clickable_onMouseEnter','clamp','REPLACE_WHITE','open','isStateTooltipTouched','GhKZw','max','STATE_FMT','textSizeEx','ConvertParams','contains','prototype','8OvwBYO','_battler','backOpacity','Jbuxq','Game_Battler_refresh','setBattler','Tooltip','glDcM','XTHEe','ReplaceWhite','round','OffsetY','ivSQf','MOUSE_OFFSET_X','textColor','_scene','18fJPZFB','wPxbw','stateColor','active','VisuMZ_1_BattleCore','height','VisuMZ_3_FrontviewBattleUI\x20needs\x20to\x20be\x20updated\x20','2793786mMJnKt','windowskin','ParseAllNotetags','_buffs','BUFF_FMT','NONWHITE_COLOR','hitTest','LFivZ','passiveStates','onDatabaseLoaded','NUM','floor','setupStateText','onMouseExit','getStateDisplay','openTouchStateTooltips','VisuMZ_3_FrontviewBattleUI','KZOMR','_stateTooltipWindow','ARRAYSTRUCT','clear','Sprite_Battler_onMouseEnter','Scene_Boot_onDatabaseLoaded','BuffFmt','actor','setStateTooltipBattler','HEXCOLOR','process_VisuMZ_StateTooltips_Notetags','drawTextEx','buffIconIndex','push','_cache_StateTooltips','_requestRefresh','Mnhpo','ffffff','Scale','format','width','resizeWindow'];_0x314d=function(){return _0x39a71a;};return _0x314d();};Imported[_0x33539d(0x109)]&&(Window_PartyStatus[_0x33539d(0x157)][_0x33539d(0x150)]=function(){const _0x35df7a=_0x33539d;return this[_0x35df7a(0x1ab)]();},Window_PartyStatus[_0x33539d(0x157)][_0x33539d(0x10a)]=function(){return this['_actor'];});;function Window_StateTooltip(){const _0x4b3ec1=_0x33539d;this[_0x4b3ec1(0x1b3)](...arguments);}Window_StateTooltip[_0x33539d(0x157)]=Object[_0x33539d(0x1bc)](Window_Base[_0x33539d(0x157)]),Window_StateTooltip['prototype']['constructor']=Window_StateTooltip,Window_StateTooltip[_0x33539d(0x19b)]=VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19e)][_0x33539d(0x15e)][_0x33539d(0x192)],Window_StateTooltip[_0x33539d(0x119)]=VisuMZ[_0x33539d(0xf4)]['Settings'][_0x33539d(0x15e)][_0x33539d(0x1c4)],Window_StateTooltip[_0x33539d(0x135)]=VisuMZ['StateTooltips']['Settings'][_0x33539d(0x15e)][_0x33539d(0x1c7)],Window_StateTooltip[_0x33539d(0x153)]=VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19e)]['Vocab'][_0x33539d(0x13d)],Window_StateTooltip[_0x33539d(0x173)]=VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19e)][_0x33539d(0x19f)][_0x33539d(0x186)],Window_StateTooltip['DEBUFF_FMT']=VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19e)][_0x33539d(0x19f)][_0x33539d(0x108)],Window_StateTooltip['ACTIONS_FMT']=VisuMZ[_0x33539d(0xf4)]['Settings'][_0x33539d(0x19f)]['ActionsFmt'],Window_StateTooltip[_0x33539d(0xfd)]=VisuMZ['StateTooltips'][_0x33539d(0x19e)][_0x33539d(0x19f)]['TurnsFmt'],Window_StateTooltip[_0x33539d(0x1b7)]=VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19e)]['Vocab']['PassiveText'],Window_StateTooltip[_0x33539d(0x14e)]=VisuMZ['StateTooltips'][_0x33539d(0x19e)][_0x33539d(0x19f)][_0x33539d(0x161)],Window_StateTooltip[_0x33539d(0x174)]=VisuMZ[_0x33539d(0xf4)][_0x33539d(0x19e)][_0x33539d(0x19f)][_0x33539d(0x123)],Window_StateTooltip['MOUSE_OFFSET_X']=VisuMZ['StateTooltips'][_0x33539d(0x19e)][_0x33539d(0x15e)][_0x33539d(0x124)],Window_StateTooltip[_0x33539d(0x136)]=VisuMZ['StateTooltips'][_0x33539d(0x19e)][_0x33539d(0x15e)][_0x33539d(0x163)],Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x1b3)]=function(){const _0x57db78=_0x33539d,_0x1cfcc0=new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x57db78(0x16d)]);Window_Base['prototype']['initialize'][_0x57db78(0x133)](this,_0x1cfcc0),this['scale']['x']=this[_0x57db78(0x11f)]['y']=Window_StateTooltip[_0x57db78(0x19b)],this['hide'](),this[_0x57db78(0x159)]=null;},Window_StateTooltip[_0x33539d(0x157)]['loadWindowskin']=function(){const _0x5c225a=_0x33539d;this[_0x5c225a(0x170)]=ImageManager['loadSystem'](Window_StateTooltip[_0x5c225a(0x119)]);},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x143)]=function(){const _0x283f98=_0x33539d;this[_0x283f98(0x15a)]=Window_StateTooltip[_0x283f98(0x135)];},Window_StateTooltip['prototype'][_0x33539d(0x15d)]=function(_0x46b1ba){const _0x120336=_0x33539d;if(this['_battler']===_0x46b1ba)return;this[_0x120336(0x159)]=_0x46b1ba;if(this[_0x120336(0x159)])this[_0x120336(0x1bf)]();else{if(_0x120336(0x132)!=='YMaFU')this[_0x120336(0x148)]();else{this['_cache_StateTooltips'][_0x120336(0x13e)]&&this[_0x120336(0x144)]();return;}}},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x1bf)]=function(){const _0x4ebbe7=_0x33539d;this[_0x4ebbe7(0x112)][_0x4ebbe7(0x183)](),this[_0x4ebbe7(0x1b0)]();if(this['_text'][_0x4ebbe7(0x149)]>0x0){this[_0x4ebbe7(0x195)]();const _0xfcf02c=this['baseTextRect']();this[_0x4ebbe7(0x18b)](this[_0x4ebbe7(0xf1)],_0xfcf02c['x'],_0xfcf02c['y'],_0xfcf02c[_0x4ebbe7(0x194)]),this['show']();}else this[_0x4ebbe7(0x148)]();},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x1b6)]=function(_0x4f827b){return _0x4f827b;},Window_StateTooltip[_0x33539d(0x157)]['isSupportMessageKeywords']=function(){return![];},Window_StateTooltip[_0x33539d(0x157)]['setupText']=function(){const _0x56ead9=_0x33539d;this['_text']='';if(!this['_battler'])return;this[_0x56ead9(0x17b)](),this[_0x56ead9(0x101)](),this['replaceHexColors'](),this['_text']=this['_text'][_0x56ead9(0xf5)]();},Window_StateTooltip['prototype'][_0x33539d(0x17b)]=function(){const _0x534ceb=_0x33539d,_0x2e5d86=Window_StateTooltip[_0x534ceb(0x153)],_0x18c4ee=this[_0x534ceb(0x159)][_0x534ceb(0x102)]();for(const _0x18d9db of _0x18c4ee){if('JWxWj'===_0x534ceb(0x15b))this[_0x534ceb(0x188)]();else{if(!_0x18d9db)continue;if(!_0x18d9db[_0x534ceb(0x106)]['trim']())continue;if(_0x18d9db[_0x534ceb(0x106)]['match'](/-----/i))continue;if(_0x18d9db[_0x534ceb(0x13f)]<=0x0)continue;const _0x47e3e3=VisuMZ[_0x534ceb(0xf4)][_0x534ceb(0x11b)];if(_0x18d9db[_0x534ceb(0x1be)][_0x534ceb(0x1aa)](_0x47e3e3[_0x534ceb(0x1ac)]))continue;const _0x56d160=_0x534ceb(0x122)[_0x534ceb(0x193)](_0x18d9db[_0x534ceb(0x13f)]),_0x175e0d=_0x18d9db[_0x534ceb(0x106)]['trim'](),_0x14f382=_0x18d9db[_0x534ceb(0x140)][_0x534ceb(0x193)](this[_0x534ceb(0x159)][_0x534ceb(0x17d)](_0x18d9db['id'])),_0x284d1d=this[_0x534ceb(0x14a)](_0x18d9db),_0x207f80=ColorManager[_0x534ceb(0x16a)](_0x18d9db),_0x1d10e2=_0x2e5d86[_0x534ceb(0x193)](_0x56d160,_0x175e0d,_0x14f382,_0x284d1d,_0x207f80)[_0x534ceb(0xf5)]();_0x1d10e2&&(this[_0x534ceb(0xf1)]+=_0x1d10e2+'\x0a');}}},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x14a)]=function(_0x3bd71f){const _0x3272a3=_0x33539d;if(_0x3bd71f[_0x3272a3(0x129)]===0x0)return'';if(this[_0x3272a3(0x159)][_0x3272a3(0x177)]()[_0x3272a3(0xfb)](_0x3bd71f))return Window_StateTooltip[_0x3272a3(0x1b7)];let _0x352f01=_0x3bd71f[_0x3272a3(0x129)]===0x1?Window_StateTooltip[_0x3272a3(0x126)]:Window_StateTooltip[_0x3272a3(0xfd)];const _0x4555ca=this[_0x3272a3(0x159)]['stateTurns'](_0x3bd71f['id'])||0x0,_0x292dc3=ColorManager[_0x3272a3(0x16a)](_0x3bd71f);return _0x352f01[_0x3272a3(0x193)](_0x4555ca,_0x292dc3)[_0x3272a3(0xf5)]();},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x101)]=function(){const _0x4c41f1=_0x33539d,_0x4378c5=Window_StateTooltip[_0x4c41f1(0x173)],_0x435ee9=Window_StateTooltip['DEBUFF_FMT'];for(let _0x16fe6d=0x0;_0x16fe6d<0x8;_0x16fe6d++){if(!this[_0x4c41f1(0x159)]['isBuffOrDebuffAffected'](_0x16fe6d))continue;const _0x3c207a=this[_0x4c41f1(0x159)]['isBuffAffected'](_0x16fe6d),_0x53ae62=_0x3c207a?_0x4378c5:_0x435ee9,_0x594933=this['_battler'][_0x4c41f1(0x18c)](this[_0x4c41f1(0x159)][_0x4c41f1(0x172)][_0x16fe6d],_0x16fe6d),_0x4945c2=_0x4c41f1(0x122)[_0x4c41f1(0x193)](_0x594933),_0x1df3f1=TextManager[_0x4c41f1(0x1ba)](_0x16fe6d),_0x5a85dd=Math[_0x4c41f1(0x17a)](this['_battler'][_0x4c41f1(0x1a4)](_0x16fe6d)*0x64),_0x2ea4a7=this['setupBuffTurnText'](_0x16fe6d),_0x2d03f5=_0x3c207a?ColorManager['buffColor']():ColorManager['debuffColor'](),_0x344994=_0x53ae62['format'](_0x4945c2,_0x1df3f1,_0x5a85dd,_0x2ea4a7,_0x2d03f5)['trim']();_0x344994&&(this[_0x4c41f1(0xf1)]+=_0x344994+'\x0a');}},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x114)]=function(_0x1ef63e){const _0xd5b7a8=_0x33539d,_0x4ee230=Window_StateTooltip[_0xd5b7a8(0xfd)],_0xdb0fa2=this[_0xd5b7a8(0x159)][_0xd5b7a8(0x1a0)](_0x1ef63e),_0x4ae80d=this[_0xd5b7a8(0x159)][_0xd5b7a8(0x1b9)](_0x1ef63e),_0x138a4f=_0x4ae80d?ColorManager['buffColor']():ColorManager[_0xd5b7a8(0x19a)]();return _0x4ee230[_0xd5b7a8(0x193)](_0xdb0fa2,_0x138a4f)['trim']();},Window_StateTooltip['prototype'][_0x33539d(0x1a2)]=function(){const _0x5b1cde=_0x33539d,_0x4d04c2=/\\C\[#(.*?)\]/g;this[_0x5b1cde(0xf1)]=this['_text'][_0x5b1cde(0x1ad)](_0x4d04c2,(_0x36dd67,_0x277feb)=>{const _0x15b339=_0x5b1cde;if(_0x15b339(0x111)!==_0x15b339(0x169)){if(_0x277feb===_0x15b339(0x191)){const _0x5f2b2a=ColorManager[_0x15b339(0x12f)](Window_StateTooltip[_0x15b339(0x174)]);_0x277feb=_0x5f2b2a[_0x15b339(0x1ad)](/#/g,'');}return _0x15b339(0x145)['format'](_0x277feb);}else{if(_0x5bf1fd===_0x15b339(0x191)){const _0x11f2bf=_0x11d5dd['getColor'](_0x23dc08['NONWHITE_COLOR']);_0x212fef=_0x11f2bf[_0x15b339(0x1ad)](/#/g,'');}return _0x15b339(0x145)['format'](_0x2cf1a9);}});},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x10f)]=function(_0x1f3255,_0x553012){const _0x40a5a9=_0x33539d;switch(_0x1f3255){case _0x40a5a9(0x189):const _0x452a9e=this[_0x40a5a9(0x1a5)](_0x553012);!this['isColorLocked']()&&_0x553012['drawing']&&('jYvQa'===_0x40a5a9(0x151)?(_0x205970['prototype'][_0x40a5a9(0x150)]=function(){const _0x1faf2a=_0x40a5a9;return this[_0x1faf2a(0x1ab)]();},_0x515501['prototype'][_0x40a5a9(0x10a)]=function(){return this['_actor'];}):this['changeTextColor'](_0x452a9e));break;default:Window_Base[_0x40a5a9(0x157)][_0x40a5a9(0x10f)][_0x40a5a9(0x133)](this,_0x1f3255,_0x553012);}},Window_StateTooltip[_0x33539d(0x157)]['resizeWindow']=function(){const _0x153735=_0x33539d,_0x46d1f5=this[_0x153735(0x154)](this['_text']);this[_0x153735(0x194)]=_0x46d1f5[_0x153735(0x194)]+(this[_0x153735(0x199)]()+this['padding'])*0x2,this['height']=_0x46d1f5[_0x153735(0x16d)]+this['padding']*0x2,this[_0x153735(0xff)](),this['resetFontSettings']();},Window_StateTooltip['prototype'][_0x33539d(0x1c0)]=function(){const _0x34df91=_0x33539d;Window_Base[_0x34df91(0x157)][_0x34df91(0x1c0)][_0x34df91(0x133)](this),this[_0x34df91(0x18f)]&&(this[_0x34df91(0x18f)]=![],this[_0x34df91(0x1bf)]()),this[_0x34df91(0x14b)](),this[_0x34df91(0x147)](),this['updateOpacity']();},Window_StateTooltip[_0x33539d(0x157)]['requestRefresh']=function(){const _0x1155b4=_0x33539d;this[_0x1155b4(0x18f)]=!![];},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x14b)]=function(){const _0x3ae24f=_0x33539d;if(!this[_0x3ae24f(0x13e)])return;this['x']=TouchInput['x']+Window_StateTooltip[_0x3ae24f(0x165)],this['y']=TouchInput['y']+Window_StateTooltip[_0x3ae24f(0x136)],this[_0x3ae24f(0x1a8)]();},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x1a8)]=function(){const _0x17d447=_0x33539d,_0x4be0ba=this[_0x17d447(0x194)]*(Window_StateTooltip['WINDOW_SCALE']||0.01),_0x5a4375=this[_0x17d447(0x16d)]*(Window_StateTooltip[_0x17d447(0x19b)]||0.01);this['x']=Math['round'](this['x'][_0x17d447(0x14d)](0x0,Graphics['width']-_0x4be0ba)),this['y']=Math[_0x17d447(0x162)](this['y'][_0x17d447(0x14d)](0x0,Graphics['height']-_0x5a4375));},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x147)]=function(){const _0x14851b=_0x33539d;this['_battler']&&this[_0x14851b(0x159)][_0x14851b(0x12d)]()&&this[_0x14851b(0x15d)](null);},Window_StateTooltip[_0x33539d(0x157)][_0x33539d(0x19c)]=function(){const _0x40266c=_0x33539d,_0x337718=this['targetOpacity']();this[_0x40266c(0x142)]=this[_0x40266c(0x1af)]=_0x337718;},Window_StateTooltip[_0x33539d(0x157)]['targetOpacity']=function(){const _0x2e6d33=_0x33539d;if(SceneManager[_0x2e6d33(0x1a6)]()){if('CPKbj'===_0x2e6d33(0xf2)){const _0x1effe7=[];_0x1effe7[_0x2e6d33(0x18d)](SceneManager[_0x2e6d33(0x167)]['_actorCommandWindow']),_0x1effe7[_0x2e6d33(0x18d)](SceneManager[_0x2e6d33(0x167)][_0x2e6d33(0x100)]),_0x1effe7[_0x2e6d33(0x18d)](SceneManager[_0x2e6d33(0x167)][_0x2e6d33(0x1c5)]),_0x1effe7[_0x2e6d33(0x18d)](SceneManager[_0x2e6d33(0x167)]['_choiceListWindow']);for(const _0x4fbb53 of _0x1effe7){if(_0x2e6d33(0x160)===_0x2e6d33(0x1c6)){if(_0x5d4d28[_0x2e6d33(0x129)]===0x0)return'';if(this[_0x2e6d33(0x159)][_0x2e6d33(0x177)]()['includes'](_0x5e8193))return _0x32b434[_0x2e6d33(0x1b7)];let _0x501328=_0x38467d['autoRemovalTiming']===0x1?_0x1780ca['ACTIONS_FMT']:_0x1213e1[_0x2e6d33(0xfd)];const _0x9b3db0=this[_0x2e6d33(0x159)]['stateTurns'](_0x2e8d80['id'])||0x0,_0x273bbb=_0x46e7cd[_0x2e6d33(0x16a)](_0x1f2c9a);return _0x501328['format'](_0x9b3db0,_0x273bbb)['trim']();}else{if(_0x4fbb53&&_0x4fbb53[_0x2e6d33(0x12e)]()&&_0x4fbb53[_0x2e6d33(0x16b)]&&_0x4fbb53[_0x2e6d33(0x10d)]())return 0x0;}}}else{_0xdf05aa[_0x2e6d33(0xf4)][_0x2e6d33(0x19d)][_0x2e6d33(0x133)](this);if(this[_0x2e6d33(0x1b2)]['name'][_0x2e6d33(0x1aa)](/Debug/i))return;this[_0x2e6d33(0x117)]();}}return 0xff;};