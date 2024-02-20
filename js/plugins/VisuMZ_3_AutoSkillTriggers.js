//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.16] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * - VisuMZ_1_BattleCore
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
 * Battle System - FTB
 * Battle System - ETB
 * Battle System - PTB
 * 
 * These battle systems are incompatible with Auto Skill Triggers. This is due
 * to their turn structures, making them highly incompatible with the way that
 * Auto Skill Triggers work.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.16: January 18, 2024
 * * Compatibility Update!
 * ** Added better compatibiliy with Battle System - OTB when using states with
 *    Action Times+. Update made by Olivia.
 * 
 * Version 1.15: August 17, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System - ATB's wait setting.
 *    Update made by Olivia.
 * 
 * Version 1.14: July 13, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System - ATB's active setting.
 *    Update made by Olivia.
 * ** Added better compatibility with Battle System - OTB for battle start and
 *    enemy responses. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System OTB's forced action update.
 *    Update made by Olivia.
 * 
 * Version 1.12: June 30, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.11: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 16, 2021
 * * Compatibility Update!
 * ** Auto Skill Triggers is now disabled with the following battle systems:
 *    ETB, FTB, and PTB. This is due to the way their turn structures work,
 *    making them highly incompatible with one another.
 * ** We may revisit this in the future, but for now, Auto Skill Triggers are
 *    to be disabled by code when any of the battle systems are detected.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section.
 * 
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

function _0x3f19(){const _0x568119=['return\x200','unshift','returnSavedAutoSkillTriggerActions','TARGET','_autoTriggerAtbReturn','isCertainHit','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','ONDEATH','constructAutoSkillTrigger','osflb','processDeathAutoSkillTriggerEffects','977080GqJBty','OPPONENTS','battler','on%1Attack','_tpbState','allBattleMembers','ARRAYNUM','_scene','pop','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Scene_Boot_onDatabaseLoaded','max','processOnBattleWinAutoSkillTriggers','on%2Element%1','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)','_autoSkillTrigger_otbProcessActionCheck','BattleSystemOTB','endActionAutoTriggerATB','12YNjkzk','Game_Enemy_makeActions','skillTypes','MwDul','BattleManager_endAction','gPRUT','Game_BattlerBase_revive','\x20\x20\x20','Game_Action_applyGlobal','VisuMZ_2_BattleSystemOTB','processAutoSkillTrigger','KRKEE','CreateNotetag','_autoSkillTrigger','lbpOv','FTB','Game_Battler_onBattleStart','yDiyV','isSkill','isAutoSkillTrigger','item','22012mscqzs','description','version','RegExp','getSkillTypeNameFromID','Game_Battler_otbProcessActionCheck','_savedAutoSkillTriggerActions','note','Settings','hasDeathTransform','Ally','_CHANCE','AkKqz','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_targets','<AUTO\x20TRIGGER:[\x20]%1>','charged','ETB','_deathAutoSkillTriggerActive','ARRAYFUNC','32YydeeG','skills','hasDeathAutoSkillTrigger','onBattleEnd','byRpI','533841csXgne','filter','Game_Battler_onBattleEnd','VisuMZ_1_ElementStatusCore','isMagical','castTime','PXSql','isSceneBattle','on%1Magical','canMove','YKOEw','applyGlobal','FRIENDS\x20ONLY','turnEnd','_autoSkillTriggerBypassTpbClear','meetsDeathAutoSkillTrigger','lrzWr','STR','(?:GUARD\x20%1|GUARD\x20%1)','1605644pukzwM','tLTvu','test','isEnemy','VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','tZTSO','ALLY','isBattleSys','28572291PhKlke','includes','isOTB','parse','PTB','makeActions','log','elements','on%2SType%1','canUse','Game_Actor_makeActions','_forceAction','BdnQR','name','turnCount','aliveMembers','Game_BattlerBase_addNewState','ARRAYEVAL','_action','TgMJP','_positionDuration','222930dpWKeV','getElementNameFromID','(?:ITEM\x20%1|ITEM\x20%1)','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','clearTpbChargeTime','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','isPhysical','damage','forceAction','attackElements','FRIENDS','getAutoSkillTriggerSTypes','pqfnK','isOptionValid','occasion','Target','call','uWagD','_currentTurn','deathStateId','hasOtbForcedActionAutoSkillBattler','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','_actions','ConvertParams','FriendsOnly','wxJsB','onDatabaseLoaded','EVAL','prototype','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','Game_Action_clear','USER','in\x20order\x20for\x20VisuMZ_3_AutoSkillTriggers\x20to\x20work.','exit','_tpbIdleTime','indexOf','isActor','_tpbChargeTime','User','bsEba','stripNameTextCodes','clear','length','Enemy','_tpbTurnCount','_instance','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','BattleManager_checkBattleEnd','adjustTurnOrderAutoSkillTrigger','toUpperCase','CreateNotetags','trim','endAction','isActiveChainSkillsUiVisible','_subject','VisuMZ_3_ActiveChainSkills','startTurn','push','requestUpdateTurnOrders','1hwQFCh','onBattleWin','on%1Guard','clone','IeEAg','BattleManager_startTurn','parameters','isGuard','FUNC','on%1Item','LkSwa','Opponents','_tpbCastTime','onAllActionsEnd','_deathAutoSkillTriggerPerformed','ENEMY','hNCtu','checkBattleEnd','replace','isAutoSkillTriggerCompatible','otbAddActions','_tpbTurnEnd','jeyca','addNewState','AutoSkillTriggers','_onBattleWinAutoSkillTriggerOn','some','getAutoSkillTriggerElements','clearDeathAutoSkillTrigger','refresh','applyAutoSkillTriggers','isAllDead','processAutoSkillTriggers','on%1Certain','29170oMjCfO','map','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','format','NUM','revive','ZLPdu','subject','isImmortal','ARRAYSTRUCT','RsQNO','nOsKZ','friendsUnit','canActivateDeathAutoSkillTrigger','performAutoSkillTriggers','ARRAYSTR','Game_BattlerBase_isImmortal','match','isAttack','status','setAutoSkillTrigger','opponentsUnit','hjPQl','elementId','onBattleStart','constructAutoSkillTriggerOTB','_preventMakeActionsOtb','_otbTurnOrderWindow','constructAutoSkillTriggerATB','_subjectX','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','random','_actionBattlers','chargeTime','===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20===','onDeath','forceAutoSkillTrigger','on%1Physical','Game_Battler_clearTpbChargeTime','VlZLU','isItem','477WUHWFF'];_0x3f19=function(){return _0x568119;};return _0x3f19();}function _0xb9bb(_0x19dd0d,_0x1ad369){const _0x3f196d=_0x3f19();return _0xb9bb=function(_0xb9bb1c,_0x1f131a){_0xb9bb1c=_0xb9bb1c-0x78;let _0x5644e6=_0x3f196d[_0xb9bb1c];return _0x5644e6;},_0xb9bb(_0x19dd0d,_0x1ad369);}const _0x23bf49=_0xb9bb;(function(_0x55a585,_0x5ce0f0){const _0x146bb2=_0xb9bb,_0x8cee1b=_0x55a585();while(!![]){try{const _0xd4f65d=-parseInt(_0x146bb2(0x167))/0x1*(parseInt(_0x146bb2(0x10e))/0x2)+parseInt(_0x146bb2(0xae))/0x3*(-parseInt(_0x146bb2(0xe2))/0x4)+-parseInt(_0x146bb2(0xba))/0x5+-parseInt(_0x146bb2(0xcd))/0x6*(parseInt(_0x146bb2(0xfb))/0x7)+parseInt(_0x146bb2(0xf6))/0x8*(-parseInt(_0x146bb2(0x12c))/0x9)+-parseInt(_0x146bb2(0x85))/0xa+parseInt(_0x146bb2(0x117))/0xb;if(_0xd4f65d===_0x5ce0f0)break;else _0x8cee1b['push'](_0x8cee1b['shift']());}catch(_0x140389){_0x8cee1b['push'](_0x8cee1b['shift']());}}}(_0x3f19,0x72aef));var label='AutoSkillTriggers',tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x23bf49(0xfc)](function(_0x520c85){const _0x38fb4c=_0x23bf49;return _0x520c85[_0x38fb4c(0x98)]&&_0x520c85[_0x38fb4c(0xe3)][_0x38fb4c(0x118)]('['+label+']');})[0x0];VisuMZ[label][_0x23bf49(0xea)]=VisuMZ[label][_0x23bf49(0xea)]||{},VisuMZ[_0x23bf49(0x143)]=function(_0x16182a,_0x321602){const _0x503556=_0x23bf49;for(const _0x42c573 in _0x321602){if(_0x42c573[_0x503556(0x96)](/(.*):(.*)/i)){const _0x4bb0f3=String(RegExp['$1']),_0x1cc313=String(RegExp['$2'])[_0x503556(0x15d)]()['trim']();let _0x16abf0,_0x45d42d,_0x2f1057;switch(_0x1cc313){case _0x503556(0x89):_0x16abf0=_0x321602[_0x42c573]!==''?Number(_0x321602[_0x42c573]):0x0;break;case _0x503556(0xc0):_0x45d42d=_0x321602[_0x42c573]!==''?JSON[_0x503556(0x11a)](_0x321602[_0x42c573]):[],_0x16abf0=_0x45d42d[_0x503556(0x86)](_0xf23c30=>Number(_0xf23c30));break;case _0x503556(0x147):_0x16abf0=_0x321602[_0x42c573]!==''?eval(_0x321602[_0x42c573]):null;break;case _0x503556(0x128):_0x45d42d=_0x321602[_0x42c573]!==''?JSON[_0x503556(0x11a)](_0x321602[_0x42c573]):[],_0x16abf0=_0x45d42d[_0x503556(0x86)](_0x4ad0de=>eval(_0x4ad0de));break;case'JSON':_0x16abf0=_0x321602[_0x42c573]!==''?JSON['parse'](_0x321602[_0x42c573]):'';break;case'ARRAYJSON':_0x45d42d=_0x321602[_0x42c573]!==''?JSON[_0x503556(0x11a)](_0x321602[_0x42c573]):[],_0x16abf0=_0x45d42d[_0x503556(0x86)](_0x827f3d=>JSON[_0x503556(0x11a)](_0x827f3d));break;case _0x503556(0x16f):_0x16abf0=_0x321602[_0x42c573]!==''?new Function(JSON['parse'](_0x321602[_0x42c573])):new Function(_0x503556(0xaf));break;case _0x503556(0xf5):_0x45d42d=_0x321602[_0x42c573]!==''?JSON['parse'](_0x321602[_0x42c573]):[],_0x16abf0=_0x45d42d[_0x503556(0x86)](_0x131b6f=>new Function(JSON[_0x503556(0x11a)](_0x131b6f)));break;case _0x503556(0x10c):_0x16abf0=_0x321602[_0x42c573]!==''?String(_0x321602[_0x42c573]):'';break;case _0x503556(0x94):_0x45d42d=_0x321602[_0x42c573]!==''?JSON[_0x503556(0x11a)](_0x321602[_0x42c573]):[],_0x16abf0=_0x45d42d[_0x503556(0x86)](_0x247b89=>String(_0x247b89));break;case'STRUCT':_0x2f1057=_0x321602[_0x42c573]!==''?JSON[_0x503556(0x11a)](_0x321602[_0x42c573]):{},_0x16abf0=VisuMZ[_0x503556(0x143)]({},_0x2f1057);break;case _0x503556(0x8e):_0x45d42d=_0x321602[_0x42c573]!==''?JSON[_0x503556(0x11a)](_0x321602[_0x42c573]):[],_0x16abf0=_0x45d42d['map'](_0x1d0a55=>VisuMZ['ConvertParams']({},JSON[_0x503556(0x11a)](_0x1d0a55)));break;default:continue;}_0x16182a[_0x4bb0f3]=_0x16abf0;}}return _0x16182a;},(_0xd5786f=>{const _0x461a74=_0x23bf49,_0x296c37=_0xd5786f[_0x461a74(0x124)];for(const _0x1192a7 of dependencies){if(_0x461a74(0x101)===_0x461a74(0x101)){if(!Imported[_0x1192a7]){if(_0x461a74(0x177)!=='XKAzb'){alert(_0x461a74(0xc3)['format'](_0x296c37,_0x1192a7)),SceneManager[_0x461a74(0x14d)]();break;}else{if(this[_0x461a74(0x109)]){this[_0x461a74(0x109)]=_0x284c85;return;}_0x50c9d8['AutoSkillTriggers'][_0x461a74(0xab)][_0x461a74(0x13c)](this);}}}else _0x26f67f[_0x461a74(0x7b)]['RegExp'][_0x5f2a45]=new _0x499001(_0x4aec06,'i'),_0x146166[_0x461a74(0x7b)][_0x461a74(0xe5)][_0x40266a]=new _0x46b78b(_0x4c4d8a,'i');}const _0x332385=_0xd5786f['description'];if(_0x332385['match'](/\[Version[ ](.*?)\]/i)){if(_0x461a74(0x13d)!==_0x461a74(0x13d))this[_0x461a74(0x9e)](_0xd45bfa);else{const _0x16fc44=Number(RegExp['$1']);_0x16fc44!==VisuMZ[label][_0x461a74(0xe4)]&&(_0x461a74(0x10f)===_0x461a74(0x123)?this[_0x461a74(0xd9)](_0x3234ed[0x0],_0xd5d2bc[0x1]):(alert(_0x461a74(0xc8)[_0x461a74(0x88)](_0x296c37,_0x16fc44)),SceneManager['exit']()));}}if(_0x332385['match'](/\[Tier[ ](\d+)\]/i)){if('xsilo'!==_0x461a74(0xd0)){const _0x2c4c4c=Number(RegExp['$1']);_0x2c4c4c<tier?(alert(_0x461a74(0xef)[_0x461a74(0x88)](_0x296c37,_0x2c4c4c,tier)),SceneManager[_0x461a74(0x14d)]()):_0x461a74(0x79)!=='llylu'?tier=Math[_0x461a74(0xc5)](_0x2c4c4c,tier):_0x605b6[_0x461a74(0xc6)]();}else _0x261160[_0x461a74(0x11d)](_0x461a74(0xa7)),_0x4f626e['log'](_0x461a74(0x131)['format'](_0x2aea31,_0x2785f3)),_0x1e5c49['log'](_0x461a74(0xa3)),_0x46e7bb['log'](_0x461a74(0xd4));}VisuMZ[_0x461a74(0x143)](VisuMZ[label][_0x461a74(0xea)],_0xd5786f[_0x461a74(0x16d)]);})(pluginData);if(Imported[_0x23bf49(0xd6)]&&VisuMZ[_0x23bf49(0xcb)][_0x23bf49(0xe4)]<1.13){let text='';text+='VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20',text+=_0x23bf49(0x14c),alert(text),SceneManager[_0x23bf49(0x14d)]();}VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0xc4)]=Scene_Boot[_0x23bf49(0x148)][_0x23bf49(0x146)],Scene_Boot[_0x23bf49(0x148)][_0x23bf49(0x146)]=function(){const _0x27cc25=_0x23bf49;VisuMZ[_0x27cc25(0x7b)][_0x27cc25(0xc4)][_0x27cc25(0x13c)](this),this['process_VisuMZ_AutoSkillTriggers_Notetags']();},Scene_Boot[_0x23bf49(0x148)]['process_VisuMZ_AutoSkillTriggers_Notetags']=function(){const _0x3b008c=_0x23bf49;VisuMZ[_0x3b008c(0x7b)][_0x3b008c(0x15e)]();},VisuMZ[_0x23bf49(0x7b)]['RegExp']={},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0x15e)]=function(){const _0x3504e5=_0x23bf49;let _0x237196=[[_0x3504e5(0x152),_0x3504e5(0x14b)],[_0x3504e5(0x13b),_0x3504e5(0xb2)],[_0x3504e5(0xec),_0x3504e5(0x115)],[_0x3504e5(0x157),_0x3504e5(0x176)],['Friends',_0x3504e5(0x136)],[_0x3504e5(0x144),_0x3504e5(0x107)],[_0x3504e5(0x172),_0x3504e5(0xbb)]],_0x2d38b2=[['onBattleStart',_0x3504e5(0x15a)],[_0x3504e5(0x168),'(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)'],[_0x3504e5(0xa8),_0x3504e5(0xc9)]];for(const _0x54f1d8 of _0x237196){if(_0x3504e5(0xee)===_0x3504e5(0xee)){if(!_0x54f1d8)continue;_0x2d38b2['push'](['on%1Attack'[_0x3504e5(0x88)](_0x54f1d8[0x0]),'(?:ATTACK\x20%1|STRIKE\x20%1)'[_0x3504e5(0x88)](_0x54f1d8[0x1])]),_0x2d38b2[_0x3504e5(0x165)]([_0x3504e5(0x169)[_0x3504e5(0x88)](_0x54f1d8[0x0]),_0x3504e5(0x10d)['format'](_0x54f1d8[0x1])]),_0x2d38b2['push']([_0x3504e5(0x170)[_0x3504e5(0x88)](_0x54f1d8[0x0]),_0x3504e5(0x12e)['format'](_0x54f1d8[0x1])]),_0x2d38b2['push']([_0x3504e5(0xaa)[_0x3504e5(0x88)](_0x54f1d8[0x0]),_0x3504e5(0x149)[_0x3504e5(0x88)](_0x54f1d8[0x1])]),_0x2d38b2[_0x3504e5(0x165)](['on%1Magical'[_0x3504e5(0x88)](_0x54f1d8[0x0]),_0x3504e5(0x141)[_0x3504e5(0x88)](_0x54f1d8[0x1])]),_0x2d38b2[_0x3504e5(0x165)]([_0x3504e5(0x84)['format'](_0x54f1d8[0x0]),_0x3504e5(0x12f)[_0x3504e5(0x88)](_0x54f1d8[0x1])]);}else this[_0x3504e5(0xca)]=!![],_0x5936ed['AutoSkillTriggers'][_0x3504e5(0xe7)][_0x3504e5(0x13c)](this,_0x4c6869,_0x90c05e),this[_0x3504e5(0xca)]=![];}for(const _0x334981 of $dataSystem[_0x3504e5(0xcf)]){if(_0x3504e5(0xd8)!==_0x3504e5(0x90)){if(!_0x334981)continue;let _0x322786=DataManager[_0x3504e5(0x154)](_0x334981);for(const _0x337488 of _0x237196){if(!_0x337488)continue;_0x2d38b2[_0x3504e5(0x165)]([_0x3504e5(0x11f)[_0x3504e5(0x88)](_0x322786['replace'](/[ ]/gi,''),_0x337488[0x0]),_0x3504e5(0x87)[_0x3504e5(0x88)](_0x322786,_0x337488[0x1])]);}}else{const _0x58117c=this['_action']&&this[_0x3504e5(0x129)]['isAutoSkillTrigger'](),_0x297281=this['_subject'];_0x58117c&&(this[_0x3504e5(0x162)][_0x3504e5(0x109)]=!![]),_0x4ddde7[_0x3504e5(0x7b)]['BattleManager_endAction'][_0x3504e5(0x13c)](this),_0x297281&&_0x58117c&&(_0x297281[_0x3504e5(0xb1)](),_0x297281[_0x3504e5(0xcc)]());}}for(const _0x2fd74d of $dataSystem[_0x3504e5(0x11e)]){if(!_0x2fd74d)continue;let _0x4692d8=DataManager[_0x3504e5(0x154)](_0x2fd74d);for(const _0x5b6a3b of _0x237196){if(!_0x5b6a3b)continue;_0x2d38b2[_0x3504e5(0x165)]([_0x3504e5(0xc7)[_0x3504e5(0x88)](_0x4692d8[_0x3504e5(0x179)](/[ ]/gi,''),_0x5b6a3b[0x0]),_0x3504e5(0x113)[_0x3504e5(0x88)](_0x4692d8,_0x5b6a3b[0x1])]);}}for(const _0x2455ff of _0x2d38b2){this[_0x3504e5(0xd9)](_0x2455ff[0x0],_0x2455ff[0x1]);}},VisuMZ['AutoSkillTriggers']['CreateNotetag']=function(_0x31c2ee,_0x284f84){const _0x455454=_0x23bf49;_0x31c2ee=_0x31c2ee[_0x455454(0x15d)]()[_0x455454(0x15f)]();const _0x41537=_0x455454(0xf1)[_0x455454(0x88)](_0x284f84),_0x57287d=_0x31c2ee+_0x455454(0xed),_0x3d7305=_0x455454(0xb5)['format'](_0x284f84);try{if(_0x455454(0xdb)!==_0x455454(0xdb))return![];else VisuMZ[_0x455454(0x7b)][_0x455454(0xe5)][_0x31c2ee]=new RegExp(_0x41537,'i'),VisuMZ['AutoSkillTriggers'][_0x455454(0xe5)][_0x57287d]=new RegExp(_0x3d7305,'i');}catch(_0x95ea0b){Utils[_0x455454(0x139)](_0x455454(0x110))&&(console[_0x455454(0x11d)](_0x455454(0xa7)),console[_0x455454(0x11d)](_0x455454(0x131)[_0x455454(0x88)](_0x41537,_0x3d7305)),console[_0x455454(0x11d)](_0x455454(0xa3)),console['log'](_0x455454(0xd4)));}},DataManager['getSkillTypeNameFromID']=function(_0x234e86){const _0x3d228f=_0x23bf49;return this[_0x3d228f(0x154)]($dataSystem['skillTypes'][_0x234e86]);},DataManager[_0x23bf49(0x154)]=function(_0x4fd570){const _0x229b3f=_0x23bf49;if(!_0x4fd570)return'';return _0x4fd570=_0x4fd570['replace'](/\\V\[(\d+)\]/gi,''),_0x4fd570=_0x4fd570[_0x229b3f(0x179)](/\\I\[(\d+)\]/gi,''),_0x4fd570=_0x4fd570[_0x229b3f(0x179)](/\\C\[(\d+)\]/gi,''),_0x4fd570=_0x4fd570['replace'](/\\N\[(\d+)\]/gi,''),_0x4fd570=_0x4fd570[_0x229b3f(0x179)](/\\P\[(\d+)\]/gi,''),(_0x4fd570||'')[_0x229b3f(0x15d)]()[_0x229b3f(0x15f)]();},DataManager[_0x23bf49(0x12d)]=function(_0x549da3){const _0x98df96=_0x23bf49;return this[_0x98df96(0x154)]($dataSystem[_0x98df96(0x11e)][_0x549da3]);},BattleManager[_0x23bf49(0x17a)]=function(){const _0x40de05=_0x23bf49;if(this['isBattleSys'](_0x40de05(0xf3)))return![];if(this[_0x40de05(0x116)](_0x40de05(0xdc)))return![];if(this['isBattleSys'](_0x40de05(0x11b)))return![];if(Imported[_0x40de05(0x163)]){const _0x5065a1=SceneManager[_0x40de05(0xc1)];if(_0x5065a1&&_0x5065a1[_0x40de05(0x161)]())return![];}if(Imported['VisuMZ_3_InputComboSkills']){if(_0x40de05(0x138)===_0x40de05(0x16b))_0x24c9c9(_0x40de05(0xc8)['format'](_0x556029,_0x50b14c)),_0x1d9910[_0x40de05(0x14d)]();else{const _0x4afa50=SceneManager[_0x40de05(0xc1)];if(_0x4afa50&&_0x4afa50['canPerformInputComboSkills']())return![];}}return!![];},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0xd1)]=BattleManager[_0x23bf49(0x160)],BattleManager[_0x23bf49(0x160)]=function(){const _0x4f96e9=_0x23bf49,_0x1e0029=this['_action']&&this[_0x4f96e9(0x129)][_0x4f96e9(0xe0)](),_0x318806=this[_0x4f96e9(0x162)];if(_0x1e0029){if(_0x4f96e9(0xde)===_0x4f96e9(0xde))this['_subject'][_0x4f96e9(0x109)]=!![];else{_0x3cb875[_0x4f96e9(0x82)]()&&_0xe6e018['processOnBattleWinAutoSkillTriggers']();if(this['_forcedBattlers']['length']>0x0)return![];if(_0x2d8251['hasOtbForcedActionAutoSkillBattler']())return![];return _0x12672e[_0x4f96e9(0x7b)]['BattleManager_checkBattleEnd']['call'](this);}}VisuMZ[_0x4f96e9(0x7b)]['BattleManager_endAction'][_0x4f96e9(0x13c)](this),_0x318806&&_0x1e0029&&(_0x4f96e9(0x12a)===_0x4f96e9(0x12a)?(_0x318806[_0x4f96e9(0xb1)](),_0x318806[_0x4f96e9(0xcc)]()):this['performAutoSkillTriggers'](_0x57972a,_0x4f96e9(0x157)));},VisuMZ['AutoSkillTriggers'][_0x23bf49(0x15b)]=BattleManager['checkBattleEnd'],BattleManager[_0x23bf49(0x178)]=function(){const _0x5e0aa9=_0x23bf49;if($gameTroop[_0x5e0aa9(0x82)]()){if(_0x5e0aa9(0x145)===_0x5e0aa9(0x145))$gameParty['processOnBattleWinAutoSkillTriggers']();else{let _0x5cd536='';_0x5cd536+=_0x5e0aa9(0x112),_0x5cd536+=_0x5e0aa9(0x14c),_0x1c10ae(_0x5cd536),_0x32da9c[_0x5e0aa9(0x14d)]();}}if(this['_forcedBattlers'][_0x5e0aa9(0x156)]>0x0)return![];if(BattleManager[_0x5e0aa9(0x140)]())return![];return VisuMZ[_0x5e0aa9(0x7b)][_0x5e0aa9(0x15b)][_0x5e0aa9(0x13c)](this);},BattleManager[_0x23bf49(0x140)]=function(){const _0x38be4e=_0x23bf49;if(!Imported['VisuMZ_2_BattleSystemOTB'])return![];if(!BattleManager[_0x38be4e(0x119)]())return![];return this['_actionBattlers'][_0x38be4e(0x7d)](_0x3ee270=>_0x3ee270['_actions'][_0x38be4e(0x7d)](_0x2c6487=>_0x2c6487&&_0x2c6487[_0x38be4e(0x122)]));},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0x14a)]=Game_Action[_0x23bf49(0x148)][_0x23bf49(0x155)],Game_Action[_0x23bf49(0x148)][_0x23bf49(0x155)]=function(){const _0x5ad26f=_0x23bf49;VisuMZ[_0x5ad26f(0x7b)][_0x5ad26f(0x14a)]['call'](this),this[_0x5ad26f(0x99)](![]);},Game_Action['prototype'][_0x23bf49(0x99)]=function(_0x5997a3){this['_autoSkillTrigger']=_0x5997a3;},Game_Action[_0x23bf49(0x148)][_0x23bf49(0xe0)]=function(){const _0x12551a=_0x23bf49;return!!this[_0x12551a(0xda)];},VisuMZ[_0x23bf49(0x7b)]['Game_Action_isValid']=Game_Action['prototype']['isValid'],Game_Action[_0x23bf49(0x148)]['isValid']=function(){const _0xd66504=_0x23bf49;let _0x22ea87=VisuMZ[_0xd66504(0x7b)]['Game_Action_isValid'][_0xd66504(0x13c)](this),_0x5f1773=this[_0xd66504(0xe1)]()?this[_0xd66504(0xe1)]()['occasion']:-0x1;return this[_0xd66504(0xe1)]()&&this[_0xd66504(0xe0)]()?(this['item']()[_0xd66504(0x13a)]=0x0,_0x22ea87=_0x22ea87&&this['subject']()[_0xd66504(0x120)](this[_0xd66504(0xe1)]()),this[_0xd66504(0xe1)]()[_0xd66504(0x13a)]=_0x5f1773,_0x22ea87):_0x22ea87;},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0xd5)]=Game_Action[_0x23bf49(0x148)][_0x23bf49(0x106)],Game_Action[_0x23bf49(0x148)][_0x23bf49(0x106)]=function(){const _0x21fa2c=_0x23bf49;VisuMZ['AutoSkillTriggers'][_0x21fa2c(0xd5)][_0x21fa2c(0x13c)](this),this[_0x21fa2c(0x81)]();},Game_Action[_0x23bf49(0x148)][_0x23bf49(0x137)]=function(){const _0x41a3cc=_0x23bf49;if(!this[_0x41a3cc(0xdf)]())return[];let _0x50e4dd=[];if(Imported['VisuMZ_1_SkillsStatesCore']){if(_0x41a3cc(0xb8)!==_0x41a3cc(0xb8))for(const _0x37ece6 of this[_0x41a3cc(0xbf)]()){_0x37ece6&&(_0x37ece6[_0x41a3cc(0xd7)]('onBattleStart'),_0x37ece6[_0x41a3cc(0x7f)]());}else _0x50e4dd=DataManager['getSkillTypes'](this['item']());}else _0x50e4dd[_0x41a3cc(0x165)](this[_0x41a3cc(0xe1)]()['stypeId']);return _0x50e4dd[_0x41a3cc(0x86)](_0x37c7d2=>DataManager[_0x41a3cc(0xe6)](_0x37c7d2));},Game_Action['prototype'][_0x23bf49(0x7e)]=function(){const _0x5361c8=_0x23bf49;let _0x433792=[];if(Imported[_0x5361c8(0xfe)])_0x433792=this[_0x5361c8(0x11e)]();else{if(this[_0x5361c8(0xe1)]()['damage'][_0x5361c8(0x9c)]<0x0){const _0x1c4016=this[_0x5361c8(0x8c)]();_0x433792=_0x1c4016[_0x5361c8(0x135)]();}else _0x433792=[this[_0x5361c8(0xe1)]()['damage']['elementId']];}return _0x433792['map'](_0x489525=>DataManager[_0x5361c8(0x12d)](_0x489525));},Game_Action[_0x23bf49(0x148)][_0x23bf49(0x81)]=function(){const _0x2be1c6=_0x23bf49;if(!SceneManager[_0x2be1c6(0x102)]())return;if(!BattleManager[_0x2be1c6(0x17a)]())return;if(!this[_0x2be1c6(0xe1)]())return;if(this[_0x2be1c6(0xe1)]()['note'][_0x2be1c6(0x96)](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x2be1c6(0xe1)]()['note'][_0x2be1c6(0x96)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x3c34f6=this[_0x2be1c6(0x8c)](),_0x583008=BattleManager[_0x2be1c6(0xf0)][_0x2be1c6(0xfc)]((_0x4be81e,_0x487b3f,_0x17a9b3)=>_0x17a9b3[_0x2be1c6(0x14f)](_0x4be81e)===_0x487b3f),_0x45e5e7=_0x3c34f6[_0x2be1c6(0x91)]()[_0x2be1c6(0x126)](),_0x19c54b=_0x3c34f6[_0x2be1c6(0x9a)]()[_0x2be1c6(0x126)]();this[_0x2be1c6(0x93)](_0x3c34f6,'User');for(const _0x5854bf of _0x583008){if('RsQNO'===_0x2be1c6(0x8f)){this[_0x2be1c6(0x93)](_0x5854bf,_0x2be1c6(0x13b));if(_0x5854bf['isActor']()===_0x3c34f6[_0x2be1c6(0x150)]())this[_0x2be1c6(0x93)](_0x5854bf,_0x2be1c6(0xec));else _0x5854bf[_0x2be1c6(0x150)]()!==_0x3c34f6[_0x2be1c6(0x150)]()&&this[_0x2be1c6(0x93)](_0x5854bf,_0x2be1c6(0x157));}else{if(!this[_0x2be1c6(0x104)]())return;this[_0x2be1c6(0xa9)](_0x5102f9['id']),_0x4bbc8d[_0x2be1c6(0x9f)]=!![],this['otbAddActions'](0x1,!![]),_0x200848[_0x2be1c6(0x9f)]=![];const _0x418905=_0x11465a[_0x2be1c6(0xa5)];_0x418905[_0x2be1c6(0xb0)](_0x418905[_0x2be1c6(0xc2)]());const _0x3b0d60=_0x17c619['_scene'][_0x2be1c6(0xa0)];_0x3b0d60&&_0x3b0d60[_0x2be1c6(0x15c)](this);}}for(const _0x1110d4 of _0x45e5e7){this['performAutoSkillTriggers'](_0x1110d4,'Friends'),_0x1110d4!==_0x3c34f6&&this[_0x2be1c6(0x93)](_0x1110d4,_0x2be1c6(0x144));}for(const _0x2cdd4b of _0x19c54b){_0x2be1c6(0x9b)!==_0x2be1c6(0xd2)?this[_0x2be1c6(0x93)](_0x2cdd4b,_0x2be1c6(0x172)):this[_0x2be1c6(0xe8)]=this['_actions'][_0x2be1c6(0x16a)]();}},Game_Action[_0x23bf49(0x148)][_0x23bf49(0x93)]=function(_0x171c0d,_0x2bafea){const _0x2e9ab7=_0x23bf49;if(!_0x171c0d)return;if(!BattleManager[_0x2e9ab7(0x17a)]())return;if(this[_0x2e9ab7(0x97)]())_0x171c0d[_0x2e9ab7(0xd7)](_0x2e9ab7(0xbd)['format'](_0x2bafea));if(this[_0x2e9ab7(0x16e)]())_0x171c0d[_0x2e9ab7(0xd7)](_0x2e9ab7(0x169)[_0x2e9ab7(0x88)](_0x2bafea));if(this[_0x2e9ab7(0xad)]())_0x171c0d['processAutoSkillTrigger'](_0x2e9ab7(0x170)[_0x2e9ab7(0x88)](_0x2bafea));if(this[_0x2e9ab7(0x132)]())_0x171c0d['processAutoSkillTrigger'](_0x2e9ab7(0xaa)[_0x2e9ab7(0x88)](_0x2bafea));if(this[_0x2e9ab7(0xff)]())_0x171c0d[_0x2e9ab7(0xd7)](_0x2e9ab7(0x103)[_0x2e9ab7(0x88)](_0x2bafea));if(this[_0x2e9ab7(0xb4)]())_0x171c0d[_0x2e9ab7(0xd7)]('on%1Certain'['format'](_0x2bafea));const _0x4b15d9=this[_0x2e9ab7(0x137)]();for(let _0x5c6eb0 of _0x4b15d9){if(!_0x5c6eb0)continue;_0x5c6eb0=_0x5c6eb0['replace'](/[ ]/gi,''),_0x171c0d[_0x2e9ab7(0xd7)]('on%1SType%2'[_0x2e9ab7(0x88)](_0x2bafea,_0x5c6eb0));}const _0xd20094=this[_0x2e9ab7(0x7e)]();for(let _0x5cf858 of _0xd20094){if(!_0x5cf858)continue;_0x5cf858=_0x5cf858[_0x2e9ab7(0x179)](/[ ]/gi,''),_0x171c0d[_0x2e9ab7(0xd7)]('on%1Element%2'[_0x2e9ab7(0x88)](_0x2bafea,_0x5cf858));}},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0x127)]=Game_BattlerBase[_0x23bf49(0x148)][_0x23bf49(0x7a)],Game_BattlerBase[_0x23bf49(0x148)][_0x23bf49(0x7a)]=function(_0x5c73d2){const _0x85762d=_0x23bf49;if(this['canActivateDeathAutoSkillTrigger'](_0x5c73d2))return this[_0x85762d(0xb9)]();VisuMZ['AutoSkillTriggers'][_0x85762d(0x127)][_0x85762d(0x13c)](this,_0x5c73d2);},Game_BattlerBase[_0x23bf49(0x148)][_0x23bf49(0x92)]=function(_0x58a0bc){const _0x40fc4f=_0x23bf49;if(_0x58a0bc!==this[_0x40fc4f(0x13f)]())return![];if(Imported['VisuMZ_3_LifeStateEffects']){if(_0x40fc4f(0x171)===_0x40fc4f(0x171)){if(this['hasLifeStateAutoLifeEffect']())return![];if(this[_0x40fc4f(0x111)]()&&this[_0x40fc4f(0xeb)]())return![];}else _0x479f76=!![];}return this[_0x40fc4f(0xf8)]();},Game_BattlerBase['prototype']['hasDeathAutoSkillTrigger']=function(){const _0x1fc118=_0x23bf49;if(!SceneManager[_0x1fc118(0x102)]())return![];if(!this[_0x1fc118(0x104)]())return![];if(this[_0x1fc118(0x175)])return![];return this[_0x1fc118(0xf7)]()[_0x1fc118(0x7d)](_0x434fb8=>this[_0x1fc118(0x10a)](_0x434fb8));},Game_BattlerBase[_0x23bf49(0x148)][_0x23bf49(0x10a)]=function(_0x3f1ccf){const _0x4e785e=_0x23bf49,_0x5d0a0a=VisuMZ[_0x4e785e(0x7b)][_0x4e785e(0xe5)][_0x4e785e(0xb6)];return _0x3f1ccf&&_0x3f1ccf[_0x4e785e(0xe9)]['match'](_0x5d0a0a)&&this[_0x4e785e(0x120)](_0x3f1ccf);},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0x95)]=Game_BattlerBase[_0x23bf49(0x148)]['isImmortal'],Game_BattlerBase[_0x23bf49(0x148)][_0x23bf49(0x8d)]=function(){const _0x18a739=_0x23bf49;if(this[_0x18a739(0xf4)])return!![];return VisuMZ['AutoSkillTriggers'][_0x18a739(0x95)]['call'](this);},Game_Battler[_0x23bf49(0x148)][_0x23bf49(0xd7)]=function(_0x210e55){const _0x285d2d=_0x23bf49;if(!SceneManager[_0x285d2d(0x102)]())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;_0x210e55=_0x210e55[_0x285d2d(0x15d)]()[_0x285d2d(0x15f)]();const _0x4d768a=VisuMZ[_0x285d2d(0x7b)][_0x285d2d(0xe5)][_0x210e55],_0x30931b=_0x210e55+_0x285d2d(0xed),_0x28a5d8=VisuMZ[_0x285d2d(0x7b)][_0x285d2d(0xe5)][_0x30931b];if(!_0x4d768a&&!_0x28a5d8)return;if(!this[_0x285d2d(0x104)]())return;for(const _0x59fb8f of this[_0x285d2d(0xf7)]()){if('VlZLU'!==_0x285d2d(0xac))_0x38c015[_0x285d2d(0xb1)](),_0x1eef70[_0x285d2d(0xcc)]();else{if(!_0x59fb8f)continue;if(!this[_0x285d2d(0x120)](_0x59fb8f))continue;let _0x31b305=![];if(_0x59fb8f[_0x285d2d(0xe9)][_0x285d2d(0x96)](_0x4d768a))_0x31b305=!![];else{if(_0x59fb8f[_0x285d2d(0xe9)][_0x285d2d(0x96)](_0x28a5d8)){if(_0x285d2d(0x10b)!==_0x285d2d(0x10b))return this[_0x285d2d(0xb9)]();else{const _0x33d8a1=(Number(RegExp['$1'])||0x0)*0.01;_0x31b305=Math[_0x285d2d(0xa4)]()<_0x33d8a1;}}}if(_0x31b305){if(_0x285d2d(0x105)==='lKPtI'){if(this[_0x285d2d(0x116)](_0x285d2d(0xf3)))return![];if(this[_0x285d2d(0x116)]('FTB'))return![];if(this[_0x285d2d(0x116)](_0x285d2d(0x11b)))return![];if(_0xab6429[_0x285d2d(0x163)]){const _0x59ae22=_0x22f916[_0x285d2d(0xc1)];if(_0x59ae22&&_0x59ae22[_0x285d2d(0x161)]())return![];}if(_0x29dd98['VisuMZ_3_InputComboSkills']){const _0x38687a=_0x3ef4d2[_0x285d2d(0xc1)];if(_0x38687a&&_0x38687a['canPerformInputComboSkills']())return![];}return!![];}else{if(Imported['VisuMZ_2_BattleSystemATB']&&BattleManager[_0x285d2d(0x17a)]())'psGGs'===_0x285d2d(0xfa)?this[_0x285d2d(0xb7)](_0x935878):this[_0x285d2d(0xa1)](_0x59fb8f);else{if(Imported[_0x285d2d(0xd6)]&&BattleManager[_0x285d2d(0x119)]())this[_0x285d2d(0x9e)](_0x59fb8f);else{if('szUZw'!==_0x285d2d(0x8b))this['constructAutoSkillTrigger'](_0x59fb8f);else return this[_0x285d2d(0xe1)]()[_0x285d2d(0x13a)]=0x0,_0x1f5cd2=_0x13122a&&this[_0x285d2d(0x8c)]()[_0x285d2d(0x120)](this[_0x285d2d(0xe1)]()),this[_0x285d2d(0xe1)]()[_0x285d2d(0x13a)]=_0x3b94cd,_0x4ad7a5;}}}}}}},Game_Battler[_0x23bf49(0x148)]['constructAutoSkillTrigger']=function(_0x467141){const _0x2ad31f=_0x23bf49;this[_0x2ad31f(0xa9)](_0x467141['id']);const _0x370807=BattleManager[_0x2ad31f(0xa5)][_0x2ad31f(0x16a)](),_0x5cec33=BattleManager['_subject'];BattleManager[_0x2ad31f(0x162)]=null,BattleManager[_0x2ad31f(0x134)](this),BattleManager['_actionBattlers']=_0x370807,BattleManager['_subject']=_0x5cec33;},Game_Battler[_0x23bf49(0x148)][_0x23bf49(0xa1)]=function(_0x563d9f,_0x56f5de){const _0x15c478=_0x23bf49;this[_0x15c478(0xb3)]={'state':this[_0x15c478(0xbe)],'chargeTime':this['_tpbChargeTime'],'castTime':this[_0x15c478(0x173)],'idleTime':this[_0x15c478(0x14e)],'turnCount':this[_0x15c478(0x158)],'turnEnd':this[_0x15c478(0x78)]},this[_0x15c478(0xb7)](_0x563d9f);},Game_Battler['prototype'][_0x23bf49(0xcc)]=function(){const _0x57b71b=_0x23bf49;if(!Imported['VisuMZ_2_BattleSystemATB'])return;if(!BattleManager['isATB']())return;['acting','charged'][_0x57b71b(0x118)](this[_0x57b71b(0xbe)])&&this[_0x57b71b(0x130)]();if(!this['_autoTriggerAtbReturn'])return;this[_0x57b71b(0xbe)]=this['_autoTriggerAtbReturn']['state'],this[_0x57b71b(0x151)]=this[_0x57b71b(0xb3)][_0x57b71b(0xa6)],this[_0x57b71b(0x173)]=this[_0x57b71b(0xb3)][_0x57b71b(0x100)],this[_0x57b71b(0x14e)]=this[_0x57b71b(0xb3)]['idleTime'],this['_tpbTurnCount']=this['_autoTriggerAtbReturn'][_0x57b71b(0x125)],this[_0x57b71b(0x78)]=this[_0x57b71b(0xb3)][_0x57b71b(0x108)],BattleManager[_0x57b71b(0x162)]=null,this[_0x57b71b(0xb3)]=undefined,['acting',_0x57b71b(0xf2)][_0x57b71b(0x118)](this[_0x57b71b(0xbe)])&&this['clearTpbChargeTime']();},Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x9e)]=function(_0x412d00){const _0x1675bd=_0x23bf49;if(!this['canMove']())return;this['forceAutoSkillTrigger'](_0x412d00['id']),$gameTemp[_0x1675bd(0x9f)]=!![],this[_0x1675bd(0x17b)](0x1,!![]),$gameTemp[_0x1675bd(0x9f)]=![];const _0x563f33=BattleManager['_actionBattlers'];_0x563f33[_0x1675bd(0xb0)](_0x563f33['pop']());const _0x2968a5=SceneManager[_0x1675bd(0xc1)][_0x1675bd(0xa0)];_0x2968a5&&_0x2968a5['adjustTurnOrderAutoSkillTrigger'](this);},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0x121)]=Game_Actor[_0x23bf49(0x148)][_0x23bf49(0x11c)],Game_Actor[_0x23bf49(0x148)][_0x23bf49(0x11c)]=function(){const _0x1535f4=_0x23bf49;if($gameTemp[_0x1535f4(0x9f)])return;if(this[_0x1535f4(0xca)])return;const _0x458c45=this[_0x1535f4(0x142)],_0x282080=_0x458c45['filter'](_0x22428b=>_0x22428b[_0x1535f4(0xe0)]());VisuMZ['AutoSkillTriggers'][_0x1535f4(0x121)][_0x1535f4(0x13c)](this);let _0x5d71c8=0x0;for(const _0x400333 of _0x282080){if(this[_0x1535f4(0x142)][_0x5d71c8])this[_0x1535f4(0x142)][_0x5d71c8]=_0x400333;else break;_0x5d71c8++;}},VisuMZ['AutoSkillTriggers']['Game_Enemy_makeActions']=Game_Enemy[_0x23bf49(0x148)][_0x23bf49(0x11c)],Game_Enemy[_0x23bf49(0x148)]['makeActions']=function(){const _0x767f2f=_0x23bf49;if($gameTemp[_0x767f2f(0x9f)])return;VisuMZ[_0x767f2f(0x7b)][_0x767f2f(0xce)]['call'](this);},Game_Battler[_0x23bf49(0x148)][_0x23bf49(0xa9)]=function(_0x33166b){const _0x2d37ab=_0x23bf49;if(!BattleManager[_0x2d37ab(0x17a)]())return;if(!this[_0x2d37ab(0xe8)]){if(_0x2d37ab(0x153)!==_0x2d37ab(0x153)){if(!_0x2852e2[_0x2d37ab(0x17a)]())return;if(!this[_0x2d37ab(0xe8)])return;if(this[_0x2d37ab(0x142)][_0x2d37ab(0x156)]>0x0)return;this[_0x2d37ab(0x142)]=this[_0x2d37ab(0xe8)],this[_0x2d37ab(0xe8)]=_0x3c60c2;}else this['_savedAutoSkillTriggerActions']=this['_actions'][_0x2d37ab(0x16a)]();}this[_0x2d37ab(0x134)](_0x33166b,-0x2);if(!this[_0x2d37ab(0x142)])return;const _0x2bf780=this['_actions'][this[_0x2d37ab(0x142)][_0x2d37ab(0x156)]-0x1];_0x2bf780['setAutoSkillTrigger'](!![]);},Game_Battler[_0x23bf49(0x148)][_0x23bf49(0xb1)]=function(){const _0x4dfed8=_0x23bf49;if(!BattleManager[_0x4dfed8(0x17a)]())return;if(!this[_0x4dfed8(0xe8)])return;if(this[_0x4dfed8(0x142)][_0x4dfed8(0x156)]>0x0)return;this['_actions']=this[_0x4dfed8(0xe8)],this[_0x4dfed8(0xe8)]=undefined;},VisuMZ['AutoSkillTriggers'][_0x23bf49(0xfd)]=Game_Battler['prototype'][_0x23bf49(0xf9)],Game_Battler[_0x23bf49(0x148)][_0x23bf49(0xf9)]=function(){const _0x1d1d9d=_0x23bf49;this[_0x1d1d9d(0xe8)]=undefined,VisuMZ['AutoSkillTriggers'][_0x1d1d9d(0xfd)][_0x1d1d9d(0x13c)](this);},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0xab)]=Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x130)],Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x130)]=function(){const _0x3bc883=_0x23bf49;if(this['_autoSkillTriggerBypassTpbClear']){this[_0x3bc883(0x109)]=undefined;return;}VisuMZ[_0x3bc883(0x7b)][_0x3bc883(0xab)][_0x3bc883(0x13c)](this);},VisuMZ['AutoSkillTriggers'][_0x23bf49(0xdd)]=Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x9d)],Game_Battler[_0x23bf49(0x148)]['onBattleStart']=function(_0x597b64){const _0xf7c87c=_0x23bf49;this[_0xf7c87c(0xe8)]=undefined,$gameParty['_inBattle']=!![],VisuMZ[_0xf7c87c(0x7b)]['Game_Battler_onBattleStart']['call'](this,_0x597b64);if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0xf7c87c(0x119)]()){if(_0xf7c87c(0x114)!==_0xf7c87c(0x114)){let _0x310fd2=[];if(_0x1d22a9['VisuMZ_1_ElementStatusCore'])_0x310fd2=this[_0xf7c87c(0x11e)]();else{if(this['item']()[_0xf7c87c(0x133)][_0xf7c87c(0x9c)]<0x0){const _0x181f11=this[_0xf7c87c(0x8c)]();_0x310fd2=_0x181f11[_0xf7c87c(0x135)]();}else _0x310fd2=[this[_0xf7c87c(0xe1)]()['damage']['elementId']];}return _0x310fd2[_0xf7c87c(0x86)](_0x5d6a0c=>_0x564e3b[_0xf7c87c(0x12d)](_0x5d6a0c));}else return;}this[_0xf7c87c(0xd7)]('onBattleStart'),this[_0xf7c87c(0x7f)]();},VisuMZ[_0x23bf49(0x7b)][_0x23bf49(0x16c)]=BattleManager['startTurn'],BattleManager[_0x23bf49(0x164)]=function(){const _0x2e94af=_0x23bf49;VisuMZ[_0x2e94af(0x7b)][_0x2e94af(0x16c)]['call'](this);if(Imported[_0x2e94af(0xd6)]&&BattleManager['isOTB']()&&$gameTroop[_0x2e94af(0x125)]()===0x1)for(const _0xf722a9 of this[_0x2e94af(0xbf)]()){_0xf722a9&&(_0xf722a9[_0x2e94af(0xd7)]('onBattleStart'),_0xf722a9[_0x2e94af(0x7f)]());}},VisuMZ[_0x23bf49(0x7b)]['Game_BattlerBase_revive']=Game_BattlerBase['prototype'][_0x23bf49(0x8a)],Game_BattlerBase[_0x23bf49(0x148)][_0x23bf49(0x8a)]=function(){const _0x1017d7=_0x23bf49;VisuMZ['AutoSkillTriggers'][_0x1017d7(0xd3)][_0x1017d7(0x13c)](this),this[_0x1017d7(0x7f)]();},Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x7f)]=function(){const _0x2a4711=_0x23bf49;this[_0x2a4711(0xf4)]=![],this[_0x2a4711(0x175)]=![];},Game_Battler['prototype'][_0x23bf49(0xb9)]=function(){const _0x52ca1d=_0x23bf49;if(!this[_0x52ca1d(0x104)]())return;if(!SceneManager[_0x52ca1d(0x102)]())return;this['_deathAutoSkillTriggerActive']=!![],this['processAutoSkillTrigger']('onDeath');};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x174)];Game_Battler[_0x23bf49(0x148)][_0x23bf49(0x174)]=function(){const _0x36fee8=_0x23bf49;_Game_Battler_onAllActionsEnd_[_0x36fee8(0x13c)](this),this['checkDeathAutoSkillTriggerRemoval']();},Game_Battler[_0x23bf49(0x148)]['checkDeathAutoSkillTriggerRemoval']=function(){const _0x14b97e=_0x23bf49;if(!this['_deathAutoSkillTriggerActive'])return;if(this[_0x14b97e(0x175)])return;const _0x1ce420=BattleManager['_forcedBattlers'];for(const _0x40c58f of _0x1ce420){if(!_0x40c58f)continue;if(_0x40c58f[0x0]===this)return;}this[_0x14b97e(0xf4)]=![],this[_0x14b97e(0x175)]=!![],this[_0x14b97e(0x80)]();if(this['isAlive']())this[_0x14b97e(0x7f)]();},VisuMZ[_0x23bf49(0x7b)]['Game_Battler_otbProcessActionCheck']=Game_Battler['prototype']['otbProcessActionCheck'],Game_Battler[_0x23bf49(0x148)]['otbProcessActionCheck']=function(_0x29db4e,_0x4b3f6f){const _0x54122f=_0x23bf49;this[_0x54122f(0xca)]=!![],VisuMZ['AutoSkillTriggers'][_0x54122f(0xe7)][_0x54122f(0x13c)](this,_0x29db4e,_0x4b3f6f),this['_autoSkillTrigger_otbProcessActionCheck']=![];},VisuMZ['AutoSkillTriggers']['Game_Unit_onBattleStart']=Game_Unit[_0x23bf49(0x148)][_0x23bf49(0x9d)],Game_Unit['prototype']['onBattleStart']=function(_0x4477c9){const _0x172bb3=_0x23bf49;VisuMZ[_0x172bb3(0x7b)]['Game_Unit_onBattleStart']['call'](this,_0x4477c9);if(this['constructor']===Game_Party)this[_0x172bb3(0x7c)]=![];},Game_Unit[_0x23bf49(0x148)][_0x23bf49(0x83)]=function(_0x261e2a,_0x37be80){const _0x27b7c6=_0x23bf49;_0x37be80=_0x37be80||null;const _0x4995fb=this['aliveMembers']()[_0x27b7c6(0xfc)](_0x2729c3=>_0x2729c3!==_0x37be80);for(const _0x208f6a of _0x4995fb){if(!_0x208f6a)continue;_0x208f6a[_0x27b7c6(0xd7)](_0x261e2a);}},Game_Party['prototype'][_0x23bf49(0xc6)]=function(){const _0x19aa41=_0x23bf49;if(this['_onBattleWinAutoSkillTriggerOn'])return;this[_0x19aa41(0x7c)]=!![],this['processAutoSkillTriggers']('onBattleWin');};Imported[_0x23bf49(0xd6)]&&(Window_OTB_TurnOrder[_0x23bf49(0x148)][_0x23bf49(0x15c)]=function(_0x1c798f){const _0x5582ea=_0x23bf49;let _0x304052=null;for(const _0x35812f of this['_currentTurn']){if(!_0x35812f)continue;if(_0x35812f[_0x5582ea(0xbc)]()!==_0x1c798f)continue;_0x304052=_0x35812f,_0x35812f[_0x5582ea(0x159)]=_0x35812f[_0x5582ea(0x159)]||0x0,_0x35812f[_0x5582ea(0x159)]++;}_0x304052['_instance']=0x0,_0x304052[_0x5582ea(0x12b)]=0x258,_0x304052['x']=this[_0x5582ea(0xa2)],this[_0x5582ea(0x13e)]['unshift'](this['_currentTurn'][_0x5582ea(0xc2)]()),this[_0x5582ea(0x166)]();});;