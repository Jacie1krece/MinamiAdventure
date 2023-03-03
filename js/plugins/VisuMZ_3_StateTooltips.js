//=============================================================================
// VisuStella MZ - State Tooltips
// VisuMZ_3_StateTooltips.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StateTooltips = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StateTooltips = VisuMZ.StateTooltips || {};
VisuMZ.StateTooltips.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [StateTooltips]
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

const _0x2b65d2=_0x1fa8;(function(_0x3c8bdd,_0x47900c){const _0x10376e=_0x1fa8,_0x2386fa=_0x3c8bdd();while(!![]){try{const _0x5ed67b=parseInt(_0x10376e(0xea))/0x1*(parseInt(_0x10376e(0x6d))/0x2)+-parseInt(_0x10376e(0x7f))/0x3+-parseInt(_0x10376e(0xe9))/0x4*(-parseInt(_0x10376e(0xa6))/0x5)+-parseInt(_0x10376e(0xbe))/0x6*(-parseInt(_0x10376e(0x95))/0x7)+-parseInt(_0x10376e(0x116))/0x8*(parseInt(_0x10376e(0x145))/0x9)+parseInt(_0x10376e(0xce))/0xa*(-parseInt(_0x10376e(0x147))/0xb)+parseInt(_0x10376e(0x8e))/0xc;if(_0x5ed67b===_0x47900c)break;else _0x2386fa['push'](_0x2386fa['shift']());}catch(_0x600673){_0x2386fa['push'](_0x2386fa['shift']());}}}(_0xdf39,0x227e3));var label='StateTooltips',tier=tier||0x0,dependencies=[_0x2b65d2(0x128)],pluginData=$plugins[_0x2b65d2(0xec)](function(_0x450d6d){const _0x4f619e=_0x2b65d2;return _0x450d6d[_0x4f619e(0xfa)]&&_0x450d6d[_0x4f619e(0x117)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x2b65d2(0xe7)]=function(_0x4b04bd,_0x502ff3){const _0x4436bb=_0x2b65d2;for(const _0x5719a1 in _0x502ff3){if(_0x5719a1[_0x4436bb(0xf5)](/(.*):(.*)/i)){const _0x4bd40a=String(RegExp['$1']),_0x4285f9=String(RegExp['$2'])[_0x4436bb(0xc4)]()[_0x4436bb(0x132)]();let _0x159630,_0x52a589,_0x3bd346;switch(_0x4285f9){case _0x4436bb(0x9c):_0x159630=_0x502ff3[_0x5719a1]!==''?Number(_0x502ff3[_0x5719a1]):0x0;break;case _0x4436bb(0xaf):_0x52a589=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):[],_0x159630=_0x52a589['map'](_0xce991f=>Number(_0xce991f));break;case _0x4436bb(0xb9):_0x159630=_0x502ff3[_0x5719a1]!==''?eval(_0x502ff3[_0x5719a1]):null;break;case'ARRAYEVAL':_0x52a589=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):[],_0x159630=_0x52a589[_0x4436bb(0xf1)](_0x54ecd3=>eval(_0x54ecd3));break;case'JSON':_0x159630=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):'';break;case _0x4436bb(0xba):_0x52a589=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):[],_0x159630=_0x52a589[_0x4436bb(0xf1)](_0x4f100d=>JSON[_0x4436bb(0xb3)](_0x4f100d));break;case _0x4436bb(0x7a):_0x159630=_0x502ff3[_0x5719a1]!==''?new Function(JSON['parse'](_0x502ff3[_0x5719a1])):new Function(_0x4436bb(0x79));break;case'ARRAYFUNC':_0x52a589=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):[],_0x159630=_0x52a589['map'](_0x5d09da=>new Function(JSON['parse'](_0x5d09da)));break;case _0x4436bb(0xa1):_0x159630=_0x502ff3[_0x5719a1]!==''?String(_0x502ff3[_0x5719a1]):'';break;case'ARRAYSTR':_0x52a589=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):[],_0x159630=_0x52a589[_0x4436bb(0xf1)](_0x618b9c=>String(_0x618b9c));break;case'STRUCT':_0x3bd346=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):{},_0x159630=VisuMZ[_0x4436bb(0xe7)]({},_0x3bd346);break;case'ARRAYSTRUCT':_0x52a589=_0x502ff3[_0x5719a1]!==''?JSON[_0x4436bb(0xb3)](_0x502ff3[_0x5719a1]):[],_0x159630=_0x52a589['map'](_0x5aff6a=>VisuMZ[_0x4436bb(0xe7)]({},JSON[_0x4436bb(0xb3)](_0x5aff6a)));break;default:continue;}_0x4b04bd[_0x4bd40a]=_0x159630;}}return _0x4b04bd;},(_0x56ccde=>{const _0x2c6b28=_0x2b65d2,_0x4046ff=_0x56ccde[_0x2c6b28(0xe2)];for(const _0x249a94 of dependencies){if(_0x2c6b28(0xb4)===_0x2c6b28(0x9e))this[_0x2c6b28(0x91)]+=_0x396e2f+'\x0a';else{if(!Imported[_0x249a94]){if('GBDWW'!==_0x2c6b28(0x126)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2c6b28(0xe1)](_0x4046ff,_0x249a94)),SceneManager[_0x2c6b28(0x96)]();break;}else _0x2f7d6c[_0x2c6b28(0x81)]['Sprite_Clickable_onMouseExit'][_0x2c6b28(0x98)](this),this['onMouseExitStateTooltips']();}}}const _0x2fcc5c=_0x56ccde['description'];if(_0x2fcc5c[_0x2c6b28(0xf5)](/\[Version[ ](.*?)\]/i)){if(_0x2c6b28(0x130)===_0x2c6b28(0x137))return this[_0x2c6b28(0xdf)];else{const _0x2a5453=Number(RegExp['$1']);if(_0x2a5453!==VisuMZ[label][_0x2c6b28(0x148)]){if(_0x2c6b28(0x94)===_0x2c6b28(0x136))return this['_actor'];else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2c6b28(0xe1)](_0x4046ff,_0x2a5453)),SceneManager[_0x2c6b28(0x96)]();}}}if(_0x2fcc5c[_0x2c6b28(0xf5)](/\[Tier[ ](\d+)\]/i)){const _0x35e0b5=Number(RegExp['$1']);_0x35e0b5<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2c6b28(0xe1)](_0x4046ff,_0x35e0b5,tier)),SceneManager[_0x2c6b28(0x96)]()):tier=Math['max'](_0x35e0b5,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2c6b28(0x8a)],_0x56ccde[_0x2c6b28(0x7d)]);})(pluginData),VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0xf4)]={'HelpDescription':/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i,'Exclude':/<EXCLUDE FROM (?:TOOLTIP|TOOLTIPS)>/i},VisuMZ['StateTooltips'][_0x2b65d2(0xaa)]=Scene_Boot['prototype'][_0x2b65d2(0x11e)],Scene_Boot[_0x2b65d2(0x10d)][_0x2b65d2(0x11e)]=function(){const _0x11a3e2=_0x2b65d2;VisuMZ[_0x11a3e2(0x81)]['Scene_Boot_onDatabaseLoaded'][_0x11a3e2(0x98)](this),this[_0x11a3e2(0xb8)]();},Scene_Boot['prototype'][_0x2b65d2(0xb8)]=function(){const _0x345f45=_0x2b65d2;this[_0x345f45(0x89)]();},Scene_Boot[_0x2b65d2(0x10d)]['process_VisuMZ_StateTooltips_Notetags']=function(){const _0x558a32=_0x2b65d2;if(VisuMZ[_0x558a32(0x120)])return;for(const _0xaf38bd of $dataStates){if(!_0xaf38bd)continue;VisuMZ[_0x558a32(0x81)]['Parse_Notetags_Description'](_0xaf38bd);}},VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x12f)]=VisuMZ[_0x2b65d2(0x12f)],VisuMZ[_0x2b65d2(0x12f)]=function(_0x3e54c1){const _0x45a14b=_0x2b65d2;VisuMZ[_0x45a14b(0x81)][_0x45a14b(0x12f)][_0x45a14b(0x98)](this,_0x3e54c1),VisuMZ[_0x45a14b(0x81)][_0x45a14b(0x78)](_0x3e54c1);},VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x78)]=function(_0x4b47e3){const _0x29ae34=_0x2b65d2;_0x4b47e3[_0x29ae34(0x117)]=VisuMZ[_0x29ae34(0x81)][_0x29ae34(0x8a)]['Vocab'][_0x29ae34(0x10f)];const _0x30c35e=VisuMZ[_0x29ae34(0x81)][_0x29ae34(0xf4)],_0xae5408=_0x4b47e3[_0x29ae34(0x9d)];_0xae5408['match'](_0x30c35e[_0x29ae34(0x10f)])&&(_0x4b47e3['description']=String(RegExp['$1'])[_0x29ae34(0x132)]());},ColorManager[_0x2b65d2(0x92)]=function(_0x1ad150){const _0x4ff9f8=_0x2b65d2;return _0x1ad150=String(_0x1ad150),_0x1ad150[_0x4ff9f8(0xf5)](/#(.*)/i)?_0x4ff9f8(0xc3)[_0x4ff9f8(0xe1)](String(RegExp['$1'])):this[_0x4ff9f8(0x8d)](Number(_0x1ad150));},SceneManager[_0x2b65d2(0x65)]=function(){const _0x369d09=_0x2b65d2;return this[_0x369d09(0x10c)]&&this[_0x369d09(0x10c)][_0x369d09(0x72)]===Scene_Battle;},SceneManager[_0x2b65d2(0xc9)]=function(){const _0x42a19f=_0x2b65d2,_0x4621ad=SceneManager['_scene']['_stateTooltipWindow'];if(!_0x4621ad)return null;return _0x4621ad[_0x42a19f(0xf9)];},SceneManager[_0x2b65d2(0xa0)]=function(_0x2d7947){const _0x48c867=_0x2b65d2;if(_0x2d7947&&!_0x2d7947[_0x48c867(0xb7)]())return;if(_0x2d7947&&_0x2d7947[_0x48c867(0xfc)]())return;const _0x1b347d=SceneManager[_0x48c867(0x10c)][_0x48c867(0xbd)];if(!_0x1b347d)return;_0x1b347d[_0x48c867(0xbb)](_0x2d7947);},SceneManager[_0x2b65d2(0x133)]=function(_0x1b1508){const _0x2e2980=_0x2b65d2;if(_0x1b1508&&!_0x1b1508['isAppeared']())return;const _0x38df50=SceneManager[_0x2e2980(0x10c)]['_stateTooltipWindow'];if(!_0x38df50)return;if(_0x38df50[_0x2e2980(0xf9)]!==_0x1b1508)return;_0x38df50[_0x2e2980(0xb2)]();},VisuMZ[_0x2b65d2(0x81)]['Game_Battler_refresh']=Game_Battler[_0x2b65d2(0x10d)]['refresh'],Game_Battler[_0x2b65d2(0x10d)][_0x2b65d2(0x138)]=function(){const _0x492e61=_0x2b65d2;VisuMZ[_0x492e61(0x81)][_0x492e61(0x121)][_0x492e61(0x98)](this),SceneManager[_0x492e61(0x133)](this);},VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x13a)]=Scene_Base[_0x2b65d2(0x10d)][_0x2b65d2(0xcf)],Scene_Base[_0x2b65d2(0x10d)][_0x2b65d2(0xcf)]=function(){const _0x4f866e=_0x2b65d2;VisuMZ[_0x4f866e(0x81)][_0x4f866e(0x13a)][_0x4f866e(0x98)](this),this[_0x4f866e(0x9b)]();},Scene_Base[_0x2b65d2(0x10d)][_0x2b65d2(0x9b)]=function(){const _0x10716c=_0x2b65d2;this[_0x10716c(0xbd)]=new Window_StateTooltip(),this[_0x10716c(0xb0)](this['_stateTooltipWindow']);},VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x14a)]=Sprite_Clickable[_0x2b65d2(0x10d)]['onMouseEnter'],Sprite_Clickable['prototype'][_0x2b65d2(0xe4)]=function(){const _0x573587=_0x2b65d2;VisuMZ[_0x573587(0x81)][_0x573587(0x14a)][_0x573587(0x98)](this),this[_0x573587(0x13d)]();},VisuMZ['StateTooltips'][_0x2b65d2(0x9f)]=Sprite_Clickable[_0x2b65d2(0x10d)][_0x2b65d2(0xca)],Sprite_Clickable[_0x2b65d2(0x10d)][_0x2b65d2(0xca)]=function(){const _0x1271b7=_0x2b65d2;VisuMZ[_0x1271b7(0x81)][_0x1271b7(0x9f)]['call'](this),this['onMouseExitStateTooltips']();},Sprite_Clickable['prototype'][_0x2b65d2(0x13d)]=function(){const _0x3e2bca=_0x2b65d2;this[_0x3e2bca(0xa0)]();},Sprite_Clickable[_0x2b65d2(0x10d)][_0x2b65d2(0x102)]=function(){const _0x2038c0=_0x2b65d2,_0x3511b5=this[_0x2038c0(0x12c)]();_0x3511b5&&SceneManager['currentTooltipBattler']()===_0x3511b5&&SceneManager[_0x2038c0(0xa0)](null);},Sprite_Clickable[_0x2b65d2(0x10d)]['setStateTooltipBattler']=function(){const _0x25f451=_0x2b65d2,_0x9fef3d=this[_0x25f451(0x12c)]();if(_0x9fef3d){if(_0x25f451(0x141)===_0x25f451(0x13e)){if(_0x4fcb60&&!_0x2ce669[_0x25f451(0xb7)]())return;if(_0x257540&&_0x4dd08d[_0x25f451(0xfc)]())return;const _0x4e2f1b=_0x7ab76e['_scene']['_stateTooltipWindow'];if(!_0x4e2f1b)return;_0x4e2f1b[_0x25f451(0xbb)](_0x527907);}else SceneManager[_0x25f451(0xa0)](_0x9fef3d);}},Sprite_Clickable['prototype']['getStateTooltipBattler']=function(){return null;},VisuMZ[_0x2b65d2(0x81)]['Sprite_Battler_onMouseEnter']=Sprite_Battler[_0x2b65d2(0x10d)]['onMouseEnter'],Sprite_Battler['prototype'][_0x2b65d2(0xe4)]=function(){const _0x2ebeb3=_0x2b65d2;VisuMZ[_0x2ebeb3(0x81)][_0x2ebeb3(0x105)][_0x2ebeb3(0x98)](this),this['setStateTooltipBattler']();},Sprite_Battler[_0x2b65d2(0x10d)][_0x2b65d2(0x12c)]=function(){return this['_battler'];},Window_Base['prototype'][_0x2b65d2(0x6e)]=function(){const _0x46d2ee=_0x2b65d2,_0x2c5814=new Point(TouchInput['x'],TouchInput['y']),_0x521c51=this[_0x46d2ee(0x118)][_0x46d2ee(0x111)](_0x2c5814);return this[_0x46d2ee(0x10a)]()[_0x46d2ee(0xf8)](_0x521c51['x'],_0x521c51['y']);},Window_Base[_0x2b65d2(0x10d)]['dimensionRect']=function(){const _0x1b3c13=_0x2b65d2;return new Rectangle(0x0,0x0,this[_0x1b3c13(0xd1)],this['height']);},VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0xa4)]=Window_Selectable[_0x2b65d2(0x10d)]['processTouch'],Window_Selectable['prototype'][_0x2b65d2(0x75)]=function(){const _0x5f41b2=_0x2b65d2;VisuMZ['StateTooltips'][_0x5f41b2(0xa4)][_0x5f41b2(0x98)](this);if(this[_0x5f41b2(0x72)][_0x5f41b2(0xe2)][_0x5f41b2(0xf5)](/Debug/i))return;this[_0x5f41b2(0x84)]();},Window_Selectable[_0x2b65d2(0x10d)]['processTouchStateTooltips']=function(){const _0x346a85=_0x2b65d2;if(!this['isStateTooltipEnabled']())return;this[_0x346a85(0xb1)]=this[_0x346a85(0xb1)]||{};if(!this['isOpen']()){this[_0x346a85(0xb1)][_0x346a85(0xf3)]&&this['closeTouchStateTooltips']();return;}else _0x346a85(0x131)!==_0x346a85(0x131)?_0x527a79['setStateTooltipBattler'](null):this[_0x346a85(0xb1)][_0x346a85(0xf3)]=!![];if(!this[_0x346a85(0xd3)]){if('lnuIk'===_0x346a85(0xd8)){const _0x8a77b4=new _0x18cf5d(_0x1a8f50['x'],_0x14d2aa['y']),_0x3bee4c=this['worldTransform'][_0x346a85(0x111)](_0x8a77b4),_0x50e07a=new _0x4dd56b(0x0,0x0,this[_0x346a85(0xd1)],this['height']);return _0x50e07a[_0x346a85(0xf8)](_0x3bee4c['x'],_0x3bee4c['y']);}else{this[_0x346a85(0xb1)][_0x346a85(0xd3)]&&this[_0x346a85(0x87)]();return;}}else{if(_0x346a85(0xc5)!=='NJneD')return 0x0;else this[_0x346a85(0xb1)]['visible']=!![];}if(this['_cache_StateTooltips']['x']!==this['x']||this[_0x346a85(0xb1)]['y']!==this['y']||this[_0x346a85(0xb1)][_0x346a85(0x93)]!==TouchInput['x']||this[_0x346a85(0xb1)][_0x346a85(0x93)]!==TouchInput['y']){this[_0x346a85(0xb1)]['x']=this['x'],this['_cache_StateTooltips']['y']=this['y'],this[_0x346a85(0xb1)][_0x346a85(0x93)]=TouchInput['x'],this[_0x346a85(0xb1)][_0x346a85(0xfd)]=TouchInput['y'];if(this['isStateTooltipTouched']())this[_0x346a85(0xb1)]['hitTest']=!![],this[_0x346a85(0x77)]();else{if(_0x346a85(0xcc)==='xiWRQ'){if(this[_0x346a85(0xb1)]['hitTest']){if(_0x346a85(0x135)!==_0x346a85(0x107))this[_0x346a85(0x87)]();else return this[_0x346a85(0xdf)];}}else _0x334b06[_0x346a85(0x10d)]['update'][_0x346a85(0x98)](this),this['_requestRefresh']&&(this[_0x346a85(0x13c)]=![],this[_0x346a85(0x138)]()),this['updatePosition'](),this[_0x346a85(0x143)](),this['updateOpacity']();}}},Window_Selectable[_0x2b65d2(0x10d)]['isStateTooltipEnabled']=function(){const _0x473ba4=_0x2b65d2;return VisuMZ[_0x473ba4(0x81)][_0x473ba4(0x8a)][_0x473ba4(0xe5)][this[_0x473ba4(0x72)][_0x473ba4(0xe2)]];},Window_Selectable['prototype'][_0x2b65d2(0x144)]=function(){return this['hitIndex']()>=0x0;},Window_Selectable['prototype'][_0x2b65d2(0x73)]=function(){const _0x5b74db=_0x2b65d2,_0x55d84b=new Point(TouchInput['x'],TouchInput['y']),_0x5c8b4a=this[_0x5b74db(0x118)][_0x5b74db(0x111)](_0x55d84b),_0x51c3ae=new Rectangle(0x0,0x0,this[_0x5b74db(0xd1)],this[_0x5b74db(0xa7)]);return _0x51c3ae[_0x5b74db(0xf8)](_0x5c8b4a['x'],_0x5c8b4a['y']);},Window_Selectable[_0x2b65d2(0x10d)][_0x2b65d2(0x77)]=function(){const _0x374ccf=_0x2b65d2,_0x27d226=this[_0x374ccf(0x12c)]();if(_0x27d226)this[_0x374ccf(0xb1)][_0x374ccf(0xa9)]=_0x27d226,SceneManager[_0x374ccf(0xa0)](_0x27d226);else{if(_0x374ccf(0xf7)!==_0x374ccf(0xf7)){if(_0x3d3565[_0x374ccf(0x65)]()){const _0x466f46=[];_0x466f46[_0x374ccf(0xa3)](_0x529db1[_0x374ccf(0x10c)][_0x374ccf(0x10b)]),_0x466f46[_0x374ccf(0xa3)](_0xba50c9[_0x374ccf(0x10c)][_0x374ccf(0xde)]),_0x466f46[_0x374ccf(0xa3)](_0x137d09['_scene'][_0x374ccf(0x11c)]),_0x466f46[_0x374ccf(0xa3)](_0x5ce2b4[_0x374ccf(0x10c)][_0x374ccf(0xfb)]);for(const _0x5098e0 of _0x466f46){if(_0x5098e0&&_0x5098e0[_0x374ccf(0xb6)]()&&_0x5098e0[_0x374ccf(0xc2)]&&_0x5098e0['isMouseHovered']())return 0x0;}}return 0xff;}else this[_0x374ccf(0x87)]();}},Window_Selectable[_0x2b65d2(0x10d)]['getStateTooltipBattler']=function(){return null;},Window_Selectable[_0x2b65d2(0x10d)][_0x2b65d2(0x87)]=function(){const _0x417e72=_0x2b65d2;this['_cache_StateTooltips']['open']=![],this[_0x417e72(0xb1)]['visible']=![],this[_0x417e72(0xb1)]['hitTest']=![],this[_0x417e72(0xb1)]['battler']&&(SceneManager[_0x417e72(0xa0)](null),this[_0x417e72(0xb1)]['battler']=null);},Window_MenuStatus[_0x2b65d2(0x10d)]['getStateTooltipBattler']=function(){const _0x5de93b=_0x2b65d2,_0x11e017=this[_0x5de93b(0xae)](),_0x10b47c=this['actor'](_0x11e017);return _0x10b47c;},Window_SkillStatus[_0x2b65d2(0x10d)]['isStateTooltipTouched']=function(){const _0x5066e3=_0x2b65d2;return this[_0x5066e3(0x73)]();},Window_SkillStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x12c)]=function(){const _0x54322b=_0x2b65d2;return this[_0x54322b(0xdf)];},Window_EquipStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x144)]=function(){const _0x3254e9=_0x2b65d2;return this[_0x3254e9(0x73)]();},Window_EquipStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x12c)]=function(){return this['_actor'];},Window_Status[_0x2b65d2(0x10d)][_0x2b65d2(0x144)]=function(){const _0x1c9b8d=_0x2b65d2;return this[_0x1c9b8d(0x73)]();},Window_Status[_0x2b65d2(0x10d)][_0x2b65d2(0x12c)]=function(){const _0x53c6e9=_0x2b65d2;return this[_0x53c6e9(0xdf)];},Window_BattleStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x12c)]=function(){const _0x84ea37=_0x2b65d2,_0x591d60=this[_0x84ea37(0xae)](),_0x208a75=this[_0x84ea37(0x149)](_0x591d60);return _0x208a75;};Imported[_0x2b65d2(0x71)]&&(Window_ClassStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x144)]=function(){const _0x1f3c84=_0x2b65d2;return this[_0x1f3c84(0x73)]();},Window_ClassStatus['prototype']['getStateTooltipBattler']=function(){const _0x129763=_0x2b65d2;return this[_0x129763(0xdf)];});;Imported[_0x2b65d2(0xcd)]&&(Window_PartyStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x144)]=function(){const _0x3d5785=_0x2b65d2;return this[_0x3d5785(0x73)]();},Window_PartyStatus[_0x2b65d2(0x10d)][_0x2b65d2(0x12c)]=function(){const _0x31b434=_0x2b65d2;return this[_0x31b434(0xdf)];});;function Window_StateTooltip(){this['initialize'](...arguments);}Window_StateTooltip['prototype']=Object[_0x2b65d2(0x6b)](Window_Base[_0x2b65d2(0x10d)]),Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x72)]=Window_StateTooltip,Window_StateTooltip[_0x2b65d2(0x7b)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0xda)][_0x2b65d2(0x6f)],Window_StateTooltip[_0x2b65d2(0x115)]=VisuMZ[_0x2b65d2(0x81)]['Settings'][_0x2b65d2(0xda)][_0x2b65d2(0x113)],Window_StateTooltip['WINDOW_SKIN_OPACITY']=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)]['Tooltip'][_0x2b65d2(0x8b)],Window_StateTooltip[_0x2b65d2(0x11f)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0x146)]['StateFmt'],Window_StateTooltip[_0x2b65d2(0x127)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0x146)][_0x2b65d2(0x6c)],Window_StateTooltip[_0x2b65d2(0xc8)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0x146)][_0x2b65d2(0x74)],Window_StateTooltip['ACTIONS_FMT']=VisuMZ[_0x2b65d2(0x81)]['Settings'][_0x2b65d2(0x146)][_0x2b65d2(0x80)],Window_StateTooltip[_0x2b65d2(0x119)]=VisuMZ[_0x2b65d2(0x81)]['Settings'][_0x2b65d2(0x146)][_0x2b65d2(0x139)],Window_StateTooltip['PASSIVE_TEXT']=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0x146)][_0x2b65d2(0xc0)],Window_StateTooltip[_0x2b65d2(0xeb)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0x146)][_0x2b65d2(0xdc)],Window_StateTooltip[_0x2b65d2(0x85)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0x146)][_0x2b65d2(0xa5)],Window_StateTooltip['MOUSE_OFFSET_X']=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)]['Tooltip'][_0x2b65d2(0xd6)],Window_StateTooltip[_0x2b65d2(0x129)]=VisuMZ[_0x2b65d2(0x81)][_0x2b65d2(0x8a)][_0x2b65d2(0xda)][_0x2b65d2(0x124)],Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x101)]=function(){const _0x3554ac=_0x2b65d2,_0x3e58a3=new Rectangle(0x0,0x0,Graphics[_0x3554ac(0xd1)],Graphics[_0x3554ac(0xa7)]);Window_Base[_0x3554ac(0x10d)]['initialize'][_0x3554ac(0x98)](this,_0x3e58a3),this[_0x3554ac(0xad)]['x']=this['scale']['y']=Window_StateTooltip['WINDOW_SCALE'],this[_0x3554ac(0x108)](),this[_0x3554ac(0xf9)]=null;},Window_StateTooltip['prototype'][_0x2b65d2(0xbf)]=function(){const _0x333481=_0x2b65d2;this[_0x333481(0xbc)]=ImageManager[_0x333481(0xfe)](Window_StateTooltip[_0x333481(0x115)]);},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x12b)]=function(){const _0xe8d444=_0x2b65d2;this[_0xe8d444(0x99)]=Window_StateTooltip[_0xe8d444(0xe8)];},Window_StateTooltip['prototype'][_0x2b65d2(0xbb)]=function(_0xa33bed){const _0x3c9569=_0x2b65d2;if(this[_0x3c9569(0xf9)]===_0xa33bed)return;this['_battler']=_0xa33bed;if(this['_battler'])_0x3c9569(0xd0)===_0x3c9569(0x114)?_0xd0e1d6['description']=_0x449cb9(_0x19cf8f['$1'])[_0x3c9569(0x132)]():this['refresh']();else{if('dplcV'!==_0x3c9569(0x13b)){this[_0x3c9569(0x125)][_0x3c9569(0x11b)](),this[_0x3c9569(0x104)]();if(this['_text']['length']>0x0){this[_0x3c9569(0x86)]();const _0x1c938c=this[_0x3c9569(0x106)]();this[_0x3c9569(0xf6)](this[_0x3c9569(0x91)],_0x1c938c['x'],_0x1c938c['y'],_0x1c938c[_0x3c9569(0xd1)]),this[_0x3c9569(0xc1)]();}else this[_0x3c9569(0x108)]();}else this['hide']();}},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x138)]=function(){const _0x331880=_0x2b65d2;this[_0x331880(0x125)][_0x331880(0x11b)](),this[_0x331880(0x104)]();if(this[_0x331880(0x91)]['length']>0x0){if(_0x331880(0x110)!==_0x331880(0x110)){_0x24633d[_0x331880(0x81)][_0x331880(0xa4)]['call'](this);if(this[_0x331880(0x72)][_0x331880(0xe2)]['match'](/Debug/i))return;this[_0x331880(0x84)]();}else{this['resizeWindow']();const _0x1a180d=this['baseTextRect']();this[_0x331880(0xf6)](this[_0x331880(0x91)],_0x1a180d['x'],_0x1a180d['y'],_0x1a180d['width']),this['show']();}}else this[_0x331880(0x108)]();},Window_StateTooltip['prototype'][_0x2b65d2(0x12d)]=function(_0x59b539){return _0x59b539;},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x112)]=function(){return![];},Window_StateTooltip[_0x2b65d2(0x10d)]['setupText']=function(){const _0x4a86a7=_0x2b65d2;this[_0x4a86a7(0x91)]='';if(!this[_0x4a86a7(0xf9)])return;this[_0x4a86a7(0x70)](),this[_0x4a86a7(0xd2)](),this[_0x4a86a7(0xb5)](),this[_0x4a86a7(0x91)]=this[_0x4a86a7(0x91)]['trim']();},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x70)]=function(){const _0x3b5288=_0x2b65d2,_0x458dbf=Window_StateTooltip[_0x3b5288(0x11f)],_0x517492=this['_battler'][_0x3b5288(0x90)]();for(const _0x53e66f of _0x517492){if(_0x3b5288(0x7c)===_0x3b5288(0xee))this['initialize'](...arguments);else{if(!_0x53e66f)continue;if(!_0x53e66f[_0x3b5288(0xe2)]['trim']())continue;if(_0x53e66f[_0x3b5288(0xe2)][_0x3b5288(0xf5)](/-----/i))continue;if(_0x53e66f['iconIndex']<=0x0)continue;const _0x261ced=VisuMZ[_0x3b5288(0x81)][_0x3b5288(0xf4)];if(_0x53e66f['note'][_0x3b5288(0xf5)](_0x261ced[_0x3b5288(0x13f)]))continue;const _0x43eb9e=_0x3b5288(0x10e)[_0x3b5288(0xe1)](_0x53e66f['iconIndex']),_0x3e0316=_0x53e66f[_0x3b5288(0xe2)][_0x3b5288(0x132)](),_0x2419a8=_0x53e66f[_0x3b5288(0x117)]['format'](this[_0x3b5288(0xf9)][_0x3b5288(0xe6)](_0x53e66f['id'])),_0x1e3f5e=this[_0x3b5288(0x8f)](_0x53e66f),_0x1c844b=ColorManager[_0x3b5288(0x123)](_0x53e66f),_0x10524b=_0x458dbf[_0x3b5288(0xe1)](_0x43eb9e,_0x3e0316,_0x2419a8,_0x1e3f5e,_0x1c844b)[_0x3b5288(0x132)]();if(_0x10524b){if(_0x3b5288(0x122)===_0x3b5288(0x8c))return this[_0x3b5288(0x73)]();else this[_0x3b5288(0x91)]+=_0x10524b+'\x0a';}}}},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x8f)]=function(_0xfb4250){const _0x45af1b=_0x2b65d2;if(_0xfb4250[_0x45af1b(0x11a)]===0x0)return'';if(this[_0x45af1b(0xf9)][_0x45af1b(0xe3)]()[_0x45af1b(0x12a)](_0xfb4250)){if('LHoyW'!==_0x45af1b(0xef))return Window_StateTooltip[_0x45af1b(0xac)];else{const _0xc3b228=this[_0x45af1b(0x12c)]();_0xc3b228&&_0x5b9cab[_0x45af1b(0xa0)](_0xc3b228);}}let _0xcb6125=_0xfb4250[_0x45af1b(0x11a)]===0x1?Window_StateTooltip[_0x45af1b(0x100)]:Window_StateTooltip[_0x45af1b(0x119)];const _0x55a236=this[_0x45af1b(0xf9)][_0x45af1b(0x134)](_0xfb4250['id'])||0x0,_0x152cd5=ColorManager[_0x45af1b(0x123)](_0xfb4250);return _0xcb6125[_0x45af1b(0xe1)](_0x55a236,_0x152cd5)[_0x45af1b(0x132)]();},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0xd2)]=function(){const _0x4becf7=_0x2b65d2,_0x227bb4=Window_StateTooltip[_0x4becf7(0x127)],_0x49c089=Window_StateTooltip[_0x4becf7(0xc8)];for(let _0x227eee=0x0;_0x227eee<0x8;_0x227eee++){if(_0x4becf7(0x140)!==_0x4becf7(0x67)){if(!this['_battler'][_0x4becf7(0xf0)](_0x227eee))continue;const _0x41686e=this[_0x4becf7(0xf9)][_0x4becf7(0xc7)](_0x227eee),_0x271168=_0x41686e?_0x227bb4:_0x49c089,_0x27fcce=this[_0x4becf7(0xf9)][_0x4becf7(0xab)](this[_0x4becf7(0xf9)]['_buffs'][_0x227eee],_0x227eee),_0x1606c8='\x5cI[%1]'[_0x4becf7(0xe1)](_0x27fcce),_0x5546bf=TextManager['param'](_0x227eee),_0x4a017a=Math[_0x4becf7(0x103)](this[_0x4becf7(0xf9)][_0x4becf7(0xd4)](_0x227eee)*0x64),_0x18ea82=this[_0x4becf7(0x82)](_0x227eee),_0x54b354=_0x41686e?ColorManager[_0x4becf7(0xed)]():ColorManager[_0x4becf7(0xdd)](),_0x393cbd=_0x271168['format'](_0x1606c8,_0x5546bf,_0x4a017a,_0x18ea82,_0x54b354)[_0x4becf7(0x132)]();if(_0x393cbd){if(_0x4becf7(0xff)!==_0x4becf7(0xff)){if(this[_0x4becf7(0xf9)]===_0x2091d3)return;this[_0x4becf7(0xf9)]=_0xac6e47,this[_0x4becf7(0xf9)]?this[_0x4becf7(0x138)]():this[_0x4becf7(0x108)]();}else this[_0x4becf7(0x91)]+=_0x393cbd+'\x0a';}}else{const _0x1ceb8e=_0x133267[_0x4becf7(0x119)],_0x368598=this[_0x4becf7(0xf9)][_0x4becf7(0xcb)](_0x410080),_0x3bb78f=this['_battler'][_0x4becf7(0xc7)](_0x3f06c1),_0x29d391=_0x3bb78f?_0x8056f1[_0x4becf7(0xed)]():_0xb61fcd[_0x4becf7(0xdd)]();return _0x1ceb8e[_0x4becf7(0xe1)](_0x368598,_0x29d391)['trim']();}}},Window_StateTooltip['prototype'][_0x2b65d2(0x82)]=function(_0x297235){const _0x36a5a8=_0x2b65d2,_0x1ccb5a=Window_StateTooltip[_0x36a5a8(0x119)],_0x234507=this[_0x36a5a8(0xf9)][_0x36a5a8(0xcb)](_0x297235),_0x37ecde=this['_battler'][_0x36a5a8(0xc7)](_0x297235),_0x42667a=_0x37ecde?ColorManager[_0x36a5a8(0xed)]():ColorManager[_0x36a5a8(0xdd)]();return _0x1ccb5a[_0x36a5a8(0xe1)](_0x234507,_0x42667a)[_0x36a5a8(0x132)]();},Window_StateTooltip['prototype']['replaceHexColors']=function(){const _0x20109f=_0x2b65d2,_0x570ea4=/\\C\[#(.*?)\]/g;this[_0x20109f(0x91)]=this[_0x20109f(0x91)][_0x20109f(0xf2)](_0x570ea4,(_0x18f904,_0x49951c)=>{const _0x10c948=_0x20109f;if(_0x49951c==='ffffff'){const _0x460e80=ColorManager[_0x10c948(0x92)](Window_StateTooltip['NONWHITE_COLOR']);_0x49951c=_0x460e80['replace'](/#/g,'');}return'\x5cHEXCOLOR<#%1>'['format'](_0x49951c);});},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x68)]=function(_0xdece71,_0x59c49f){const _0x3f7ea2=_0x2b65d2;switch(_0xdece71){case _0x3f7ea2(0x7e):const _0x4fdf0d=this[_0x3f7ea2(0x12e)](_0x59c49f);!this[_0x3f7ea2(0xa8)]()&&_0x59c49f[_0x3f7ea2(0x142)]&&(_0x3f7ea2(0xa2)==='UphfW'?(_0x1d7102(_0x3f7ea2(0xdb)[_0x3f7ea2(0xe1)](_0x1641b1,_0x261dc3)),_0x48fdfb[_0x3f7ea2(0x96)]()):this['changeTextColor'](_0x4fdf0d));break;default:Window_Base[_0x3f7ea2(0x10d)][_0x3f7ea2(0x68)][_0x3f7ea2(0x98)](this,_0xdece71,_0x59c49f);}},Window_StateTooltip['prototype'][_0x2b65d2(0x86)]=function(){const _0x45748e=_0x2b65d2,_0x5af14a=this['textSizeEx'](this[_0x45748e(0x91)]);this['width']=_0x5af14a['width']+(this[_0x45748e(0xd5)]()+this['padding'])*0x2,this[_0x45748e(0xa7)]=_0x5af14a[_0x45748e(0xa7)]+this[_0x45748e(0xd9)]*0x2,this[_0x45748e(0x6a)](),this[_0x45748e(0x97)]();},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x83)]=function(){const _0x26d976=_0x2b65d2;Window_Base['prototype'][_0x26d976(0x83)]['call'](this),this[_0x26d976(0x13c)]&&(this[_0x26d976(0x13c)]=![],this[_0x26d976(0x138)]()),this['updatePosition'](),this[_0x26d976(0x143)](),this[_0x26d976(0x11d)]();},Window_StateTooltip['prototype'][_0x2b65d2(0xb2)]=function(){const _0x15aa6f=_0x2b65d2;this[_0x15aa6f(0x13c)]=!![];},Window_StateTooltip['prototype'][_0x2b65d2(0x69)]=function(){const _0x365a1e=_0x2b65d2;if(!this[_0x365a1e(0xd3)])return;this['x']=TouchInput['x']+Window_StateTooltip[_0x365a1e(0xc6)],this['y']=TouchInput['y']+Window_StateTooltip['MOUSE_OFFSET_Y'],this[_0x365a1e(0xd7)]();},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0xd7)]=function(){const _0x3ae1a8=_0x2b65d2,_0x3a41a6=this[_0x3ae1a8(0xd1)]*(Window_StateTooltip[_0x3ae1a8(0x7b)]||0.01),_0x40d777=this[_0x3ae1a8(0xa7)]*(Window_StateTooltip[_0x3ae1a8(0x7b)]||0.01);this['x']=Math[_0x3ae1a8(0x9a)](this['x'][_0x3ae1a8(0xe0)](0x0,Graphics[_0x3ae1a8(0xd1)]-_0x3a41a6)),this['y']=Math[_0x3ae1a8(0x9a)](this['y']['clamp'](0x0,Graphics[_0x3ae1a8(0xa7)]-_0x40d777));},Window_StateTooltip['prototype'][_0x2b65d2(0x143)]=function(){const _0x15fcca=_0x2b65d2;this[_0x15fcca(0xf9)]&&this[_0x15fcca(0xf9)][_0x15fcca(0xfc)]()&&this[_0x15fcca(0xbb)](null);},Window_StateTooltip['prototype'][_0x2b65d2(0x11d)]=function(){const _0x5b51f1=_0x2b65d2,_0x2e5b81=this[_0x5b51f1(0x88)]();this[_0x5b51f1(0x66)]=this[_0x5b51f1(0x109)]=_0x2e5b81;},Window_StateTooltip[_0x2b65d2(0x10d)][_0x2b65d2(0x88)]=function(){const _0x30281d=_0x2b65d2;if(SceneManager['isSceneBattle']()){const _0x2f4cce=[];_0x2f4cce[_0x30281d(0xa3)](SceneManager['_scene'][_0x30281d(0x10b)]),_0x2f4cce[_0x30281d(0xa3)](SceneManager[_0x30281d(0x10c)]['_itemWindow']),_0x2f4cce[_0x30281d(0xa3)](SceneManager[_0x30281d(0x10c)][_0x30281d(0x11c)]),_0x2f4cce[_0x30281d(0xa3)](SceneManager[_0x30281d(0x10c)][_0x30281d(0xfb)]);for(const _0x1d68ab of _0x2f4cce){if(_0x1d68ab&&_0x1d68ab[_0x30281d(0xb6)]()&&_0x1d68ab[_0x30281d(0xc2)]&&_0x1d68ab[_0x30281d(0x6e)]())return _0x30281d(0x76)!==_0x30281d(0x76)?_0x5ead66['status']&&_0x55461e[_0x30281d(0x117)][_0x30281d(0x12a)]('['+_0x428384+']'):0x0;}}return 0xff;};function _0x1fa8(_0x1dd694,_0x1de3b0){const _0xdf3993=_0xdf39();return _0x1fa8=function(_0x1fa8c4,_0x3a6131){_0x1fa8c4=_0x1fa8c4-0x65;let _0x1a91af=_0xdf3993[_0x1fa8c4];return _0x1a91af;},_0x1fa8(_0x1dd694,_0x1de3b0);}function _0xdf39(){const _0x1e54b1=['MOUSE_OFFSET_Y','includes','updateBackOpacity','getStateTooltipBattler','convertMessageKeywords','obtainEscapeString','ParseStateNotetags','rrwnK','MZEtN','trim','refreshStateTooltipBattler','stateTurns','xCUjX','kpeQm','dGvrT','refresh','TurnsFmt','Scene_Base_createWindowLayer','dplcV','_requestRefresh','onMouseEnterStateTooltips','QVmVN','Exclude','clLNp','WnHJA','drawing','updateDeath','isStateTooltipTouched','26883PUNIqx','Vocab','337161ZoWDPn','version','actor','Sprite_Clickable_onMouseEnter','isSceneBattle','opacity','UcEzc','processEscapeCharacter','updatePosition','createContents','create','BuffFmt','63664Kqodku','isMouseHovered','Scale','setupStateText','VisuMZ_2_ClassChangeSystem','constructor','isStateTooltipHovered','DebuffFmt','processTouch','kKUeR','openTouchStateTooltips','Parse_Notetags_Description','return\x200','FUNC','WINDOW_SCALE','WWBIg','parameters','HEXCOLOR','665838jPCNrh','ActionsFmt','StateTooltips','setupBuffTurnText','update','processTouchStateTooltips','NONWHITE_COLOR','resizeWindow','closeTouchStateTooltips','targetOpacity','process_VisuMZ_StateTooltips_Notetags','Settings','WindowOpacity','NnnLQ','textColor','3615564UmtzIg','setupStateTurnText','states','_text','getColor','touchX','bUrMD','105119akPSDy','exit','resetFontSettings','call','backOpacity','round','createStateTooltipWindow','NUM','note','urUHt','Sprite_Clickable_onMouseExit','setStateTooltipBattler','STR','bBcTk','push','Window_Selectable_processTouch','WhiteReplaceColor','15LzSGRK','height','isColorLocked','battler','Scene_Boot_onDatabaseLoaded','buffIconIndex','PASSIVE_TEXT','scale','hitIndex','ARRAYNUM','addChild','_cache_StateTooltips','requestRefresh','parse','XcROB','replaceHexColors','isOpen','isAppeared','process_VisuMZ_StateTooltips','EVAL','ARRAYJSON','setBattler','windowskin','_stateTooltipWindow','24bqnvmP','loadWindowskin','PassiveText','show','active','#%1','toUpperCase','NJneD','MOUSE_OFFSET_X','isBuffAffected','DEBUFF_FMT','currentTooltipBattler','onMouseExit','buffTurns','xiWRQ','VisuMZ_2_PartySystem','20abMDXp','createWindowLayer','WIqUL','width','setupBuffText','visible','paramBuffRate','itemPadding','OffsetX','clampPosition','TpQNx','padding','Tooltip','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ReplaceWhite','debuffColor','_itemWindow','_actor','clamp','format','name','passiveStates','onMouseEnter','Window','getStateDisplay','ConvertParams','WINDOW_SKIN_OPACITY','29948JhzBnn','4krDGaL','REPLACE_WHITE','filter','buffColor','Rqyqr','CrAeP','isBuffOrDebuffAffected','map','replace','open','RegExp','match','drawTextEx','qKswP','contains','_battler','status','_choiceListWindow','isDead','touchY','loadSystem','oodcL','ACTIONS_FMT','initialize','onMouseExitStateTooltips','floor','setupText','Sprite_Battler_onMouseEnter','baseTextRect','xPRgA','hide','contentsOpacity','dimensionRect','_actorCommandWindow','_scene','prototype','\x5cI[%1]','HelpDescription','hxvkc','applyInverse','isSupportMessageKeywords','WindowSkin','jfpii','WINDOW_SKIN_FILENAME','232hTgXQP','description','worldTransform','TURNS_FMT','autoRemovalTiming','clear','_skillWindow','updateOpacity','onDatabaseLoaded','STATE_FMT','ParseAllNotetags','Game_Battler_refresh','sgpoO','stateColor','OffsetY','contents','qTnsh','BUFF_FMT','VisuMZ_1_BattleCore'];_0xdf39=function(){return _0x1e54b1;};return _0xdf39();}