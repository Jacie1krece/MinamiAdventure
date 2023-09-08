//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.14] [AutoSkillTriggers]
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

const _0x44ede5=_0x48fa;(function(_0x1ecf59,_0xad32f9){const _0x1d68d4=_0x48fa,_0xd39682=_0x1ecf59();while(!![]){try{const _0x404f6d=-parseInt(_0x1d68d4(0x139))/0x1+parseInt(_0x1d68d4(0x17d))/0x2*(parseInt(_0x1d68d4(0x100))/0x3)+-parseInt(_0x1d68d4(0x19d))/0x4*(-parseInt(_0x1d68d4(0x1d8))/0x5)+-parseInt(_0x1d68d4(0x1b0))/0x6+parseInt(_0x1d68d4(0x124))/0x7+parseInt(_0x1d68d4(0x1b2))/0x8+-parseInt(_0x1d68d4(0xef))/0x9;if(_0x404f6d===_0xad32f9)break;else _0xd39682['push'](_0xd39682['shift']());}catch(_0x51e231){_0xd39682['push'](_0xd39682['shift']());}}}(_0x2ce2,0x1ad69));var label='AutoSkillTriggers',tier=tier||0x0,dependencies=[_0x44ede5(0xf7)],pluginData=$plugins[_0x44ede5(0x11f)](function(_0x4bab59){const _0x5d2df1=_0x44ede5;return _0x4bab59[_0x5d2df1(0x145)]&&_0x4bab59[_0x5d2df1(0x13a)][_0x5d2df1(0x132)]('['+label+']');})[0x0];VisuMZ[label][_0x44ede5(0x168)]=VisuMZ[label][_0x44ede5(0x168)]||{},VisuMZ[_0x44ede5(0x141)]=function(_0x348a72,_0xb97790){const _0x10d977=_0x44ede5;for(const _0x55b46c in _0xb97790){if('NcwQO'===_0x10d977(0x1e9)){const _0x31d764=(_0x1e3d11(_0x3cee0d['$1'])||0x0)*0.01;_0x8f9e3f=_0x469405[_0x10d977(0x164)]()<_0x31d764;}else{if(_0x55b46c[_0x10d977(0x1a4)](/(.*):(.*)/i)){const _0x2191ba=String(RegExp['$1']),_0x5daf9d=String(RegExp['$2'])[_0x10d977(0x1ca)]()['trim']();let _0x3edb81,_0x233c73,_0x4fa8ab;switch(_0x5daf9d){case _0x10d977(0x19e):_0x3edb81=_0xb97790[_0x55b46c]!==''?Number(_0xb97790[_0x55b46c]):0x0;break;case _0x10d977(0x12c):_0x233c73=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):[],_0x3edb81=_0x233c73[_0x10d977(0x15f)](_0x185b92=>Number(_0x185b92));break;case _0x10d977(0x192):_0x3edb81=_0xb97790[_0x55b46c]!==''?eval(_0xb97790[_0x55b46c]):null;break;case'ARRAYEVAL':_0x233c73=_0xb97790[_0x55b46c]!==''?JSON['parse'](_0xb97790[_0x55b46c]):[],_0x3edb81=_0x233c73[_0x10d977(0x15f)](_0x31cea7=>eval(_0x31cea7));break;case _0x10d977(0x126):_0x3edb81=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):'';break;case _0x10d977(0x1c2):_0x233c73=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):[],_0x3edb81=_0x233c73['map'](_0x42a66e=>JSON[_0x10d977(0x153)](_0x42a66e));break;case'FUNC':_0x3edb81=_0xb97790[_0x55b46c]!==''?new Function(JSON['parse'](_0xb97790[_0x55b46c])):new Function(_0x10d977(0x1cc));break;case _0x10d977(0xf1):_0x233c73=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):[],_0x3edb81=_0x233c73['map'](_0x55cee0=>new Function(JSON[_0x10d977(0x153)](_0x55cee0)));break;case _0x10d977(0x1d6):_0x3edb81=_0xb97790[_0x55b46c]!==''?String(_0xb97790[_0x55b46c]):'';break;case _0x10d977(0x169):_0x233c73=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):[],_0x3edb81=_0x233c73['map'](_0xf4b70b=>String(_0xf4b70b));break;case _0x10d977(0x1bd):_0x4fa8ab=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):{},_0x3edb81=VisuMZ[_0x10d977(0x141)]({},_0x4fa8ab);break;case _0x10d977(0x11d):_0x233c73=_0xb97790[_0x55b46c]!==''?JSON[_0x10d977(0x153)](_0xb97790[_0x55b46c]):[],_0x3edb81=_0x233c73[_0x10d977(0x15f)](_0x3dd92d=>VisuMZ[_0x10d977(0x141)]({},JSON[_0x10d977(0x153)](_0x3dd92d)));break;default:continue;}_0x348a72[_0x2191ba]=_0x3edb81;}}}return _0x348a72;},(_0x5713d4=>{const _0x45a453=_0x44ede5,_0x51db70=_0x5713d4[_0x45a453(0x149)];for(const _0x32004f of dependencies){if(!Imported[_0x32004f]){alert(_0x45a453(0x175)[_0x45a453(0x179)](_0x51db70,_0x32004f)),SceneManager['exit']();break;}}const _0x2a52df=_0x5713d4[_0x45a453(0x13a)];if(_0x2a52df[_0x45a453(0x1a4)](/\[Version[ ](.*?)\]/i)){if(_0x45a453(0x119)===_0x45a453(0x119)){const _0x2e87da=Number(RegExp['$1']);_0x2e87da!==VisuMZ[label][_0x45a453(0x16f)]&&(_0x45a453(0x1be)!==_0x45a453(0x176)?(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x45a453(0x179)](_0x51db70,_0x2e87da)),SceneManager[_0x45a453(0x1e3)]()):(_0x3bf0ee['log'](_0x45a453(0x18e)),_0x500e9b[_0x45a453(0x103)](_0x45a453(0x1bb)[_0x45a453(0x179)](_0x192049,_0x480f92)),_0x2bd2ae[_0x45a453(0x103)](_0x45a453(0x194)),_0x3503af[_0x45a453(0x103)](_0x45a453(0x10e))));}else this[_0x45a453(0x111)](_0x5f5dfd);}if(_0x2a52df[_0x45a453(0x1a4)](/\[Tier[ ](\d+)\]/i)){if(_0x45a453(0x109)===_0x45a453(0x109)){const _0xd48c41=Number(RegExp['$1']);_0xd48c41<tier?_0x45a453(0x112)===_0x45a453(0x112)?(alert(_0x45a453(0x1dc)[_0x45a453(0x179)](_0x51db70,_0xd48c41,tier)),SceneManager['exit']()):_0xacaf78['processOnBattleWinAutoSkillTriggers']():tier=Math[_0x45a453(0x12b)](_0xd48c41,tier);}else return;}VisuMZ[_0x45a453(0x141)](VisuMZ[label]['Settings'],_0x5713d4[_0x45a453(0x1b9)]);})(pluginData);if(Imported['VisuMZ_2_BattleSystemOTB']&&VisuMZ[_0x44ede5(0x10b)][_0x44ede5(0x16f)]<1.13){let text='';text+=_0x44ede5(0x1ad),text+=_0x44ede5(0xf6),alert(text),SceneManager[_0x44ede5(0x1e3)]();}function _0x48fa(_0x1e1f0d,_0x5ebc9e){const _0x2ce2c7=_0x2ce2();return _0x48fa=function(_0x48fa2c,_0x417afe){_0x48fa2c=_0x48fa2c-0xed;let _0x25f015=_0x2ce2c7[_0x48fa2c];return _0x25f015;},_0x48fa(_0x1e1f0d,_0x5ebc9e);}VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0xf3)]=Scene_Boot[_0x44ede5(0x1b8)][_0x44ede5(0x19c)],Scene_Boot[_0x44ede5(0x1b8)][_0x44ede5(0x19c)]=function(){const _0x1c6264=_0x44ede5;VisuMZ[_0x1c6264(0x1c7)][_0x1c6264(0xf3)][_0x1c6264(0x17e)](this),this[_0x1c6264(0x1ef)]();},Scene_Boot['prototype']['process_VisuMZ_AutoSkillTriggers_Notetags']=function(){const _0x22f275=_0x44ede5;VisuMZ[_0x22f275(0x1c7)][_0x22f275(0x197)]();},VisuMZ[_0x44ede5(0x1c7)]['RegExp']={},VisuMZ[_0x44ede5(0x1c7)]['CreateNotetags']=function(){const _0x298c1d=_0x44ede5;let _0x1d0997=[['User',_0x298c1d(0x13e)],['Target',_0x298c1d(0x135)],['Ally',_0x298c1d(0xfd)],['Enemy',_0x298c1d(0x18c)],[_0x298c1d(0x1a8),_0x298c1d(0xf8)],[_0x298c1d(0x161),_0x298c1d(0x129)],[_0x298c1d(0x190),'OPPONENTS']],_0x154242=[[_0x298c1d(0x1c9),_0x298c1d(0xfe)],[_0x298c1d(0x150),_0x298c1d(0x184)],['onDeath','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)']];for(const _0x10ef0a of _0x1d0997){if('neiSW'==='neiSW'){if(!_0x10ef0a)continue;_0x154242['push']([_0x298c1d(0x1a6)[_0x298c1d(0x179)](_0x10ef0a[0x0]),_0x298c1d(0x128)[_0x298c1d(0x179)](_0x10ef0a[0x1])]),_0x154242[_0x298c1d(0x1bf)]([_0x298c1d(0x101)[_0x298c1d(0x179)](_0x10ef0a[0x0]),'(?:GUARD\x20%1|GUARD\x20%1)'['format'](_0x10ef0a[0x1])]),_0x154242['push'](['on%1Item'[_0x298c1d(0x179)](_0x10ef0a[0x0]),_0x298c1d(0xf0)[_0x298c1d(0x179)](_0x10ef0a[0x1])]),_0x154242[_0x298c1d(0x1bf)](['on%1Physical'[_0x298c1d(0x179)](_0x10ef0a[0x0]),_0x298c1d(0x17f)[_0x298c1d(0x179)](_0x10ef0a[0x1])]),_0x154242['push'](['on%1Magical'['format'](_0x10ef0a[0x0]),'(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)'[_0x298c1d(0x179)](_0x10ef0a[0x1])]),_0x154242[_0x298c1d(0x1bf)]([_0x298c1d(0x151)[_0x298c1d(0x179)](_0x10ef0a[0x0]),_0x298c1d(0x193)[_0x298c1d(0x179)](_0x10ef0a[0x1])]);}else _0x585488['isOptionValid'](_0x298c1d(0x1af))&&(_0x594927[_0x298c1d(0x103)](_0x298c1d(0x18e)),_0x5ee14d[_0x298c1d(0x103)](_0x298c1d(0x1bb)[_0x298c1d(0x179)](_0x59555e,_0x5ab039)),_0x59080d['log'](_0x298c1d(0x194)),_0x17dc76[_0x298c1d(0x103)](_0x298c1d(0x10e)));}for(const _0x142a67 of $dataSystem['skillTypes']){if(!_0x142a67)continue;let _0x35a125=DataManager[_0x298c1d(0x1db)](_0x142a67);for(const _0x4a905f of _0x1d0997){if(_0x298c1d(0x1ce)!==_0x298c1d(0x1ce))this[_0x298c1d(0x15c)](_0x4ba282,_0x298c1d(0x1a8)),_0x51bf7e!==_0x292c2c&&this['performAutoSkillTriggers'](_0x1b037e,_0x298c1d(0x161));else{if(!_0x4a905f)continue;_0x154242[_0x298c1d(0x1bf)]([_0x298c1d(0x13f)[_0x298c1d(0x179)](_0x35a125[_0x298c1d(0x11c)](/[ ]/gi,''),_0x4a905f[0x0]),_0x298c1d(0x10d)[_0x298c1d(0x179)](_0x35a125,_0x4a905f[0x1])]);}}}for(const _0x5ef253 of $dataSystem[_0x298c1d(0x1c4)]){if(!_0x5ef253)continue;let _0x1e8407=DataManager[_0x298c1d(0x1db)](_0x5ef253);for(const _0x2df6c3 of _0x1d0997){if(!_0x2df6c3)continue;_0x154242['push']([_0x298c1d(0x11a)[_0x298c1d(0x179)](_0x1e8407[_0x298c1d(0x11c)](/[ ]/gi,''),_0x2df6c3[0x0]),'(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)'[_0x298c1d(0x179)](_0x1e8407,_0x2df6c3[0x1])]);}}for(const _0x49c7e6 of _0x154242){this[_0x298c1d(0x134)](_0x49c7e6[0x0],_0x49c7e6[0x1]);}},VisuMZ[_0x44ede5(0x1c7)]['CreateNotetag']=function(_0x19ffbc,_0xa9e53e){const _0x3705a3=_0x44ede5;_0x19ffbc=_0x19ffbc[_0x3705a3(0x1ca)]()['trim']();const _0x48a818=_0x3705a3(0x1e2)[_0x3705a3(0x179)](_0xa9e53e),_0x596b57=_0x19ffbc+'_CHANCE',_0x3c5703=_0x3705a3(0x1a1)['format'](_0xa9e53e);try{_0x3705a3(0x18d)===_0x3705a3(0x15a)?(_0x15fee4[_0x3705a3(0x1c7)][_0x3705a3(0x158)][_0x3705a3(0x17e)](this),this[_0x3705a3(0x1e0)]()):(VisuMZ[_0x3705a3(0x1c7)][_0x3705a3(0x137)][_0x19ffbc]=new RegExp(_0x48a818,'i'),VisuMZ['AutoSkillTriggers'][_0x3705a3(0x137)][_0x596b57]=new RegExp(_0x3c5703,'i'));}catch(_0x484003){if('BnqNK'!==_0x3705a3(0x1d7)){if(Utils[_0x3705a3(0x144)](_0x3705a3(0x1af))){if(_0x3705a3(0x1c6)!=='mPDlv')console[_0x3705a3(0x103)](_0x3705a3(0x18e)),console[_0x3705a3(0x103)](_0x3705a3(0x1bb)['format'](_0x48a818,_0x3c5703)),console[_0x3705a3(0x103)](_0x3705a3(0x194)),console[_0x3705a3(0x103)](_0x3705a3(0x10e));else{if(!this['canMove']())return;if(!_0x23e143[_0x3705a3(0x12e)]())return;this['_deathAutoSkillTriggerActive']=!![],this[_0x3705a3(0x1ae)](_0x3705a3(0x195));}}}else _0x47c723=!![];}},DataManager['getSkillTypeNameFromID']=function(_0x528ed2){return this['stripNameTextCodes']($dataSystem['skillTypes'][_0x528ed2]);},DataManager[_0x44ede5(0x1db)]=function(_0x8edfb5){const _0xe386e1=_0x44ede5;if(!_0x8edfb5)return'';return _0x8edfb5=_0x8edfb5[_0xe386e1(0x11c)](/\\V\[(\d+)\]/gi,''),_0x8edfb5=_0x8edfb5[_0xe386e1(0x11c)](/\\I\[(\d+)\]/gi,''),_0x8edfb5=_0x8edfb5['replace'](/\\C\[(\d+)\]/gi,''),_0x8edfb5=_0x8edfb5['replace'](/\\N\[(\d+)\]/gi,''),_0x8edfb5=_0x8edfb5[_0xe386e1(0x11c)](/\\P\[(\d+)\]/gi,''),(_0x8edfb5||'')[_0xe386e1(0x1ca)]()[_0xe386e1(0x166)]();},DataManager['getElementNameFromID']=function(_0x2ef749){const _0x19b1a9=_0x44ede5;return this[_0x19b1a9(0x1db)]($dataSystem[_0x19b1a9(0x1c4)][_0x2ef749]);},BattleManager[_0x44ede5(0xfc)]=function(){const _0x59c973=_0x44ede5;if(this[_0x59c973(0x17a)](_0x59c973(0x1b4)))return![];if(this[_0x59c973(0x17a)](_0x59c973(0x1ed)))return![];if(this[_0x59c973(0x17a)]('PTB'))return![];if(Imported[_0x59c973(0x16a)]){const _0x28e8e6=SceneManager[_0x59c973(0x12a)];if(_0x28e8e6&&_0x28e8e6['isActiveChainSkillsUiVisible']())return![];}if(Imported[_0x59c973(0x1e1)]){const _0x57e26c=SceneManager[_0x59c973(0x12a)];if(_0x57e26c&&_0x57e26c[_0x59c973(0x1b3)]())return![];}return!![];},VisuMZ['AutoSkillTriggers'][_0x44ede5(0x1a2)]=BattleManager[_0x44ede5(0x180)],BattleManager[_0x44ede5(0x180)]=function(){const _0xdf1f84=_0x44ede5,_0x42c51b=this['_action']&&this['_action']['isAutoSkillTrigger'](),_0x3b123b=this['_subject'];_0x42c51b&&(this[_0xdf1f84(0x1cd)][_0xdf1f84(0x173)]=!![]),VisuMZ[_0xdf1f84(0x1c7)][_0xdf1f84(0x1a2)][_0xdf1f84(0x17e)](this),_0x3b123b&&_0x42c51b&&(_0xdf1f84(0x156)===_0xdf1f84(0x17b)?_0x5ca31e&&(_0xf889b8[_0xdf1f84(0x1ae)](_0xdf1f84(0x1c9)),_0x28bd96[_0xdf1f84(0x1e0)]()):(_0x3b123b[_0xdf1f84(0x170)](),_0x3b123b[_0xdf1f84(0x1d3)]()));},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0x18f)]=BattleManager[_0x44ede5(0x146)],BattleManager[_0x44ede5(0x146)]=function(){const _0x5cca4f=_0x44ede5;$gameTroop['isAllDead']()&&$gameParty[_0x5cca4f(0x1cb)]();if(this[_0x5cca4f(0x16b)]['length']>0x0)return![];if(BattleManager[_0x5cca4f(0x160)]())return![];return VisuMZ[_0x5cca4f(0x1c7)]['BattleManager_checkBattleEnd'][_0x5cca4f(0x17e)](this);},BattleManager['hasOtbForcedActionAutoSkillBattler']=function(){const _0x26aeb4=_0x44ede5;if(!Imported[_0x26aeb4(0x13b)])return![];if(!BattleManager[_0x26aeb4(0x171)]())return![];return this[_0x26aeb4(0x17c)]['some'](_0x27086a=>_0x27086a[_0x26aeb4(0x1d5)][_0x26aeb4(0x1e6)](_0x4392b1=>_0x4392b1&&_0x4392b1[_0x26aeb4(0x148)]));},VisuMZ['AutoSkillTriggers'][_0x44ede5(0x1dd)]=Game_Action[_0x44ede5(0x1b8)]['clear'],Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x136)]=function(){const _0x56f79f=_0x44ede5;VisuMZ[_0x56f79f(0x1c7)][_0x56f79f(0x1dd)][_0x56f79f(0x17e)](this),this[_0x56f79f(0x167)](![]);},Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x167)]=function(_0x2d5793){const _0x533c83=_0x44ede5;this[_0x533c83(0x174)]=_0x2d5793;},Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x19a)]=function(){const _0x43f05d=_0x44ede5;return!!this[_0x43f05d(0x174)];},VisuMZ['AutoSkillTriggers'][_0x44ede5(0x1b6)]=Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x152)],Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x152)]=function(){const _0x68abf6=_0x44ede5;let _0x56f83d=VisuMZ[_0x68abf6(0x1c7)][_0x68abf6(0x1b6)][_0x68abf6(0x17e)](this),_0x3c8314=this[_0x68abf6(0x1b7)]()?this['item']()['occasion']:-0x1;if(this[_0x68abf6(0x1b7)]()&&this[_0x68abf6(0x19a)]()){if('UCIdC'==='UCIdC')return this[_0x68abf6(0x1b7)]()[_0x68abf6(0x1da)]=0x0,_0x56f83d=_0x56f83d&&this[_0x68abf6(0x1e7)]()['canUse'](this['item']()),this[_0x68abf6(0x1b7)]()['occasion']=_0x3c8314,_0x56f83d;else{if(this[_0x68abf6(0x1ee)](_0x4cea4a))return this[_0x68abf6(0x163)]();_0x4a0b80['AutoSkillTriggers'][_0x68abf6(0xf5)][_0x68abf6(0x17e)](this,_0x470432);}}else{if('yVmzY'!==_0x68abf6(0x1ac))return _0x56f83d;else _0x1d33a5[_0x68abf6(0x17e)](this),this[_0x68abf6(0x14d)]();}},VisuMZ[_0x44ede5(0x1c7)]['Game_Action_applyGlobal']=Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x1d2)],Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x1d2)]=function(){const _0x214900=_0x44ede5;VisuMZ[_0x214900(0x1c7)]['Game_Action_applyGlobal'][_0x214900(0x17e)](this),this[_0x214900(0x191)]();},Game_Action[_0x44ede5(0x1b8)]['getAutoSkillTriggerSTypes']=function(){const _0x2b908a=_0x44ede5;if(!this['isSkill']())return[];let _0x32ef0b=[];if(Imported[_0x2b908a(0x127)]){if(_0x2b908a(0x13d)===_0x2b908a(0x1ba))return this[_0x2b908a(0x163)]();else _0x32ef0b=DataManager['getSkillTypes'](this[_0x2b908a(0x1b7)]());}else _0x32ef0b[_0x2b908a(0x1bf)](this[_0x2b908a(0x1b7)]()['stypeId']);return _0x32ef0b[_0x2b908a(0x15f)](_0x25a370=>DataManager[_0x2b908a(0x198)](_0x25a370));},Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x1c3)]=function(){const _0x3a4d79=_0x44ede5;let _0x2875c7=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x3a4d79(0x1e4)==='FujvQ'?_0x2875c7=this[_0x3a4d79(0x1c4)]():this['performAutoSkillTriggers'](_0x1df4c7,_0x3a4d79(0x19b));else{if(this[_0x3a4d79(0x1b7)]()[_0x3a4d79(0x106)]['elementId']<0x0){const _0x5387bd=this[_0x3a4d79(0x1e7)]();_0x2875c7=_0x5387bd['attackElements']();}else _0x2875c7=[this['item']()[_0x3a4d79(0x106)][_0x3a4d79(0x155)]];}return _0x2875c7[_0x3a4d79(0x15f)](_0x3334f0=>DataManager[_0x3a4d79(0x1ec)](_0x3334f0));},Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x191)]=function(){const _0x1a1854=_0x44ede5;if(!SceneManager[_0x1a1854(0x12e)]())return;if(!BattleManager[_0x1a1854(0xfc)]())return;if(!this['item']())return;if(this[_0x1a1854(0x1b7)]()[_0x1a1854(0x142)][_0x1a1854(0x1a4)](/<NO AUTO SKILL TRIGGER>/i))return;if(this['item']()[_0x1a1854(0x142)][_0x1a1854(0x1a4)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x53da91=this['subject'](),_0x4e824d=BattleManager[_0x1a1854(0x147)]['filter']((_0x415a8a,_0x3fd969,_0x4ab08a)=>_0x4ab08a[_0x1a1854(0x181)](_0x415a8a)===_0x3fd969),_0x888bb7=_0x53da91[_0x1a1854(0x1a0)]()[_0x1a1854(0x117)](),_0xd43200=_0x53da91['opponentsUnit']()[_0x1a1854(0x117)]();this[_0x1a1854(0x15c)](_0x53da91,_0x1a1854(0x165));for(const _0x2667bc of _0x4e824d){if('UlLHX'==='rQXnl'){let _0x20094c=_0x3d3bdb[_0x1a1854(0x1c7)][_0x1a1854(0x1b6)][_0x1a1854(0x17e)](this),_0x10f26d=this[_0x1a1854(0x1b7)]()?this['item']()[_0x1a1854(0x1da)]:-0x1;return this[_0x1a1854(0x1b7)]()&&this[_0x1a1854(0x19a)]()?(this[_0x1a1854(0x1b7)]()[_0x1a1854(0x1da)]=0x0,_0x20094c=_0x20094c&&this[_0x1a1854(0x1e7)]()[_0x1a1854(0x10f)](this['item']()),this[_0x1a1854(0x1b7)]()[_0x1a1854(0x1da)]=_0x10f26d,_0x20094c):_0x20094c;}else{this[_0x1a1854(0x15c)](_0x2667bc,'Target');if(_0x2667bc[_0x1a1854(0x1e5)]()===_0x53da91['isActor']()){if(_0x1a1854(0x1d4)!==_0x1a1854(0x10a))this[_0x1a1854(0x15c)](_0x2667bc,_0x1a1854(0x14b));else{const _0x5d55a9=this[_0x1a1854(0x1a7)]&&this[_0x1a1854(0x1a7)][_0x1a1854(0x19a)](),_0x3cb216=this[_0x1a1854(0x1cd)];_0x5d55a9&&(this[_0x1a1854(0x1cd)][_0x1a1854(0x173)]=!![]),_0x3261d3['AutoSkillTriggers']['BattleManager_endAction'][_0x1a1854(0x17e)](this),_0x3cb216&&_0x5d55a9&&(_0x3cb216[_0x1a1854(0x170)](),_0x3cb216['endActionAutoTriggerATB']());}}else _0x2667bc[_0x1a1854(0x1e5)]()!==_0x53da91[_0x1a1854(0x1e5)]()&&this[_0x1a1854(0x15c)](_0x2667bc,_0x1a1854(0x19b));}}for(const _0x41dfdc of _0x888bb7){_0x1a1854(0x183)!==_0x1a1854(0x183)?_0x3887fc=_0x3f3939['getSkillTypes'](this[_0x1a1854(0x1b7)]()):(this[_0x1a1854(0x15c)](_0x41dfdc,_0x1a1854(0x1a8)),_0x41dfdc!==_0x53da91&&(_0x1a1854(0x1eb)!==_0x1a1854(0x1d0)?this[_0x1a1854(0x15c)](_0x41dfdc,_0x1a1854(0x161)):(this[_0x1a1854(0xfb)]=_0x40d3e0,_0x27155c[_0x1a1854(0x1c7)]['Game_Battler_onBattleEnd'][_0x1a1854(0x17e)](this))));}for(const _0x9ac146 of _0xd43200){this[_0x1a1854(0x15c)](_0x9ac146,_0x1a1854(0x190));}},Game_Action[_0x44ede5(0x1b8)][_0x44ede5(0x15c)]=function(_0xfa0c4f,_0x2dbeb9){const _0x4ee8dd=_0x44ede5;if(!_0xfa0c4f)return;if(!BattleManager[_0x4ee8dd(0xfc)]())return;if(this[_0x4ee8dd(0x15e)]())_0xfa0c4f[_0x4ee8dd(0x1ae)](_0x4ee8dd(0x1a6)[_0x4ee8dd(0x179)](_0x2dbeb9));if(this[_0x4ee8dd(0xf9)]())_0xfa0c4f[_0x4ee8dd(0x1ae)]('on%1Guard'[_0x4ee8dd(0x179)](_0x2dbeb9));if(this[_0x4ee8dd(0x189)]())_0xfa0c4f[_0x4ee8dd(0x1ae)]('on%1Item'['format'](_0x2dbeb9));if(this[_0x4ee8dd(0x199)]())_0xfa0c4f['processAutoSkillTrigger'](_0x4ee8dd(0x15d)['format'](_0x2dbeb9));if(this[_0x4ee8dd(0x1cf)]())_0xfa0c4f['processAutoSkillTrigger'](_0x4ee8dd(0xf4)[_0x4ee8dd(0x179)](_0x2dbeb9));if(this[_0x4ee8dd(0x1c8)]())_0xfa0c4f[_0x4ee8dd(0x1ae)]('on%1Certain'['format'](_0x2dbeb9));const _0x41d7e3=this[_0x4ee8dd(0x187)]();for(let _0xe67efb of _0x41d7e3){if(_0x4ee8dd(0x14e)===_0x4ee8dd(0x125)){if(!_0x5a7fbd['isAutoSkillTriggerCompatible']())return;if(!this[_0x4ee8dd(0xfb)])return;if(this['_actions'][_0x4ee8dd(0x1d1)]>0x0)return;this['_actions']=this['_savedAutoSkillTriggerActions'],this[_0x4ee8dd(0xfb)]=_0x1f36d9;}else{if(!_0xe67efb)continue;_0xe67efb=_0xe67efb[_0x4ee8dd(0x11c)](/[ ]/gi,''),_0xfa0c4f[_0x4ee8dd(0x1ae)]('on%1SType%2'[_0x4ee8dd(0x179)](_0x2dbeb9,_0xe67efb));}}const _0x1aeaeb=this[_0x4ee8dd(0x1c3)]();for(let _0x16c567 of _0x1aeaeb){if(!_0x16c567)continue;_0x16c567=_0x16c567[_0x4ee8dd(0x11c)](/[ ]/gi,''),_0xfa0c4f[_0x4ee8dd(0x1ae)](_0x4ee8dd(0x1df)[_0x4ee8dd(0x179)](_0x2dbeb9,_0x16c567));}},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0xf5)]=Game_BattlerBase['prototype'][_0x44ede5(0x16c)],Game_BattlerBase['prototype'][_0x44ede5(0x16c)]=function(_0x2e5a3f){const _0x431abe=_0x44ede5;if(this[_0x431abe(0x1ee)](_0x2e5a3f))return this[_0x431abe(0x163)]();VisuMZ['AutoSkillTriggers'][_0x431abe(0xf5)][_0x431abe(0x17e)](this,_0x2e5a3f);},Game_BattlerBase[_0x44ede5(0x1b8)][_0x44ede5(0x1ee)]=function(_0x478583){const _0x4985d0=_0x44ede5;if(_0x478583!==this[_0x4985d0(0x120)]())return![];if(Imported[_0x4985d0(0x18b)]){if(this['hasLifeStateAutoLifeEffect']())return![];if(this[_0x4985d0(0x185)]()&&this['hasDeathTransform']())return![];}return this['hasDeathAutoSkillTrigger']();},Game_BattlerBase[_0x44ede5(0x1b8)][_0x44ede5(0x130)]=function(){const _0x15f73b=_0x44ede5;if(!SceneManager['isSceneBattle']())return![];if(!this[_0x15f73b(0x1c1)]())return![];if(this[_0x15f73b(0x154)])return![];return this[_0x15f73b(0x1d9)]()[_0x15f73b(0x1e6)](_0x83ceb3=>this['meetsDeathAutoSkillTrigger'](_0x83ceb3));},Game_BattlerBase[_0x44ede5(0x1b8)]['meetsDeathAutoSkillTrigger']=function(_0x1858f3){const _0x4f28ae=_0x44ede5,_0x22c0a5=VisuMZ[_0x4f28ae(0x1c7)]['RegExp']['ONDEATH'];return _0x1858f3&&_0x1858f3[_0x4f28ae(0x142)]['match'](_0x22c0a5)&&this[_0x4f28ae(0x10f)](_0x1858f3);},VisuMZ[_0x44ede5(0x1c7)]['Game_BattlerBase_isImmortal']=Game_BattlerBase[_0x44ede5(0x1b8)]['isImmortal'],Game_BattlerBase[_0x44ede5(0x1b8)][_0x44ede5(0x12f)]=function(){const _0x358815=_0x44ede5;if(this[_0x358815(0x186)])return!![];return VisuMZ[_0x358815(0x1c7)][_0x358815(0x15b)][_0x358815(0x17e)](this);},Game_Battler[_0x44ede5(0x1b8)]['processAutoSkillTrigger']=function(_0x25df9a){const _0x166c7d=_0x44ede5;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;_0x25df9a=_0x25df9a[_0x166c7d(0x1ca)]()[_0x166c7d(0x166)]();const _0x4663fc=VisuMZ['AutoSkillTriggers'][_0x166c7d(0x137)][_0x25df9a],_0x618acc=_0x25df9a+_0x166c7d(0x14a),_0x58de3e=VisuMZ[_0x166c7d(0x1c7)][_0x166c7d(0x137)][_0x618acc];if(!_0x4663fc&&!_0x58de3e)return;if(!this[_0x166c7d(0x1c1)]())return;for(const _0x2474c7 of this[_0x166c7d(0x1d9)]()){if(!_0x2474c7)continue;if(!this['canUse'](_0x2474c7))continue;let _0x1cf947=![];if(_0x2474c7[_0x166c7d(0x142)][_0x166c7d(0x1a4)](_0x4663fc))_0x1cf947=!![];else{if(_0x2474c7[_0x166c7d(0x142)][_0x166c7d(0x1a4)](_0x58de3e)){if('OhcEG'===_0x166c7d(0x116)){if(_0xe6a7dc[_0x166c7d(0x1a3)]&&_0x10c96e[_0x166c7d(0xfc)]())this[_0x166c7d(0x102)](_0x2464d5);else _0xe92a3d[_0x166c7d(0x13b)]&&_0x792217['isOTB']()?this[_0x166c7d(0x196)](_0x4e51a5):this[_0x166c7d(0x111)](_0x4eb3b6);}else{const _0x2e9c70=(Number(RegExp['$1'])||0x0)*0.01;_0x1cf947=Math[_0x166c7d(0x164)]()<_0x2e9c70;}}}if(_0x1cf947){if('UROHO'!=='UROHO')this[_0x166c7d(0x110)]={'state':this[_0x166c7d(0x143)],'chargeTime':this[_0x166c7d(0x123)],'castTime':this[_0x166c7d(0xf2)],'idleTime':this[_0x166c7d(0x1ea)],'turnCount':this[_0x166c7d(0x1a9)],'turnEnd':this[_0x166c7d(0x107)]},this[_0x166c7d(0x111)](_0x3495f0);else{if(Imported['VisuMZ_2_BattleSystemATB']&&BattleManager['isAutoSkillTriggerCompatible']()){if(_0x166c7d(0x14f)===_0x166c7d(0x14f))this[_0x166c7d(0x102)](_0x2474c7);else{if(_0x580742['_preventMakeActionsOtb'])return;_0x10e53c['AutoSkillTriggers']['Game_Actor_makeActions']['call'](this);}}else Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x166c7d(0x171)]()?'YryHz'!==_0x166c7d(0xff)?this[_0x166c7d(0x196)](_0x2474c7):(_0x960ed4('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x166c7d(0x179)](_0x15e00d,_0x58a447,_0x23f153)),_0x97344c[_0x166c7d(0x1e3)]()):this[_0x166c7d(0x111)](_0x2474c7);}}}},Game_Battler['prototype'][_0x44ede5(0x111)]=function(_0x44bac3){const _0x7a9cce=_0x44ede5;this[_0x7a9cce(0x19f)](_0x44bac3['id']);const _0x33882a=BattleManager[_0x7a9cce(0x17c)]['clone'](),_0x1b40c2=BattleManager[_0x7a9cce(0x1cd)];BattleManager['_subject']=null,BattleManager['forceAction'](this),BattleManager[_0x7a9cce(0x17c)]=_0x33882a,BattleManager[_0x7a9cce(0x1cd)]=_0x1b40c2;},Game_Battler[_0x44ede5(0x1b8)]['constructAutoSkillTriggerATB']=function(_0x164cb7){const _0x1d4bd2=_0x44ede5;this[_0x1d4bd2(0x110)]={'state':this['_tpbState'],'chargeTime':this[_0x1d4bd2(0x123)],'castTime':this[_0x1d4bd2(0xf2)],'idleTime':this[_0x1d4bd2(0x1ea)],'turnCount':this[_0x1d4bd2(0x1a9)],'turnEnd':this[_0x1d4bd2(0x107)]},this[_0x1d4bd2(0x111)](_0x164cb7);},Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x1d3)]=function(){const _0x373769=_0x44ede5;if(!Imported[_0x373769(0x1a3)])return;if(!BattleManager[_0x373769(0x11b)]())return;[_0x373769(0x1c0),_0x373769(0x1bc)][_0x373769(0x132)](this[_0x373769(0x143)])&&('YeeNt'!=='YeeNt'?(_0x531c33[_0x373769(0x1c7)]['Game_Action_clear'][_0x373769(0x17e)](this),this[_0x373769(0x167)](![])):this[_0x373769(0x1de)]());if(!this[_0x373769(0x110)])return;this[_0x373769(0x143)]=this[_0x373769(0x110)][_0x373769(0x11e)],this['_tpbChargeTime']=this[_0x373769(0x110)][_0x373769(0x138)],this[_0x373769(0xf2)]=this[_0x373769(0x110)][_0x373769(0x18a)],this[_0x373769(0x1ea)]=this[_0x373769(0x110)][_0x373769(0x16e)],this['_tpbTurnCount']=this[_0x373769(0x110)][_0x373769(0x131)],this[_0x373769(0x107)]=this['_autoTriggerAtbReturn']['turnEnd'],BattleManager[_0x373769(0x1cd)]=null,this[_0x373769(0x110)]=undefined;},Game_Battler[_0x44ede5(0x1b8)]['constructAutoSkillTriggerOTB']=function(_0x14a4a2){const _0x184dbb=_0x44ede5;if(!this[_0x184dbb(0x1c1)]())return;this['forceAutoSkillTrigger'](_0x14a4a2['id']),$gameTemp[_0x184dbb(0x133)]=!![],this[_0x184dbb(0x177)](0x1,!![]),$gameTemp[_0x184dbb(0x133)]=![];const _0xd222b4=BattleManager[_0x184dbb(0x17c)];_0xd222b4[_0x184dbb(0x188)](_0xd222b4[_0x184dbb(0x104)]());const _0x10bde3=SceneManager['_scene']['_otbTurnOrderWindow'];if(_0x10bde3){if(_0x184dbb(0x140)===_0x184dbb(0x140))_0x10bde3[_0x184dbb(0x172)](this);else{if(this['_deathAutoSkillTriggerActive'])return!![];return _0x5a4d28[_0x184dbb(0x1c7)]['Game_BattlerBase_isImmortal'][_0x184dbb(0x17e)](this);}}},VisuMZ[_0x44ede5(0x1c7)]['Game_Actor_makeActions']=Game_Actor[_0x44ede5(0x1b8)][_0x44ede5(0x118)],Game_Actor[_0x44ede5(0x1b8)]['makeActions']=function(){const _0x430e70=_0x44ede5;if($gameTemp[_0x430e70(0x133)])return;VisuMZ[_0x430e70(0x1c7)][_0x430e70(0xee)][_0x430e70(0x17e)](this);},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0x1b5)]=Game_Enemy['prototype'][_0x44ede5(0x118)],Game_Enemy[_0x44ede5(0x1b8)]['makeActions']=function(){const _0x5b9197=_0x44ede5;if($gameTemp[_0x5b9197(0x133)])return;VisuMZ[_0x5b9197(0x1c7)][_0x5b9197(0x1b5)][_0x5b9197(0x17e)](this);},Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x19f)]=function(_0xba9c0f){const _0x23c32e=_0x44ede5;if(!BattleManager['isAutoSkillTriggerCompatible']())return;!this[_0x23c32e(0xfb)]&&(this[_0x23c32e(0xfb)]=this[_0x23c32e(0x1d5)][_0x23c32e(0x16d)]());this[_0x23c32e(0x162)](_0xba9c0f,-0x2);if(!this[_0x23c32e(0x1d5)])return;const _0x46c8db=this[_0x23c32e(0x1d5)][this[_0x23c32e(0x1d5)][_0x23c32e(0x1d1)]-0x1];_0x46c8db[_0x23c32e(0x167)](!![]);},Game_Battler[_0x44ede5(0x1b8)]['returnSavedAutoSkillTriggerActions']=function(){const _0x47a483=_0x44ede5;if(!BattleManager[_0x47a483(0xfc)]())return;if(!this[_0x47a483(0xfb)])return;if(this[_0x47a483(0x1d5)][_0x47a483(0x1d1)]>0x0)return;this[_0x47a483(0x1d5)]=this[_0x47a483(0xfb)],this[_0x47a483(0xfb)]=undefined;},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0x182)]=Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x14c)],Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x14c)]=function(){const _0x2e7c66=_0x44ede5;this[_0x2e7c66(0xfb)]=undefined,VisuMZ['AutoSkillTriggers']['Game_Battler_onBattleEnd']['call'](this);},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0x159)]=Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x1de)],Game_Battler['prototype'][_0x44ede5(0x1de)]=function(){const _0x1bf021=_0x44ede5;if(this[_0x1bf021(0x173)]){if(_0x1bf021(0x115)!==_0x1bf021(0x157)){this[_0x1bf021(0x173)]=undefined;return;}else{const _0x393618=_0x47816f(_0x17c8bf['$1']);_0x393618<_0x35f405?(_0xca0974('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1bf021(0x179)](_0x31be44,_0x393618,_0x339328)),_0x221055['exit']()):_0x1225a0=_0x326725[_0x1bf021(0x12b)](_0x393618,_0x1e299e);}}VisuMZ['AutoSkillTriggers']['Game_Battler_clearTpbChargeTime'][_0x1bf021(0x17e)](this);},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0x10c)]=Game_Battler['prototype'][_0x44ede5(0x1c9)],Game_Battler[_0x44ede5(0x1b8)]['onBattleStart']=function(_0x48268){const _0x462c20=_0x44ede5;this[_0x462c20(0xfb)]=undefined,$gameParty[_0x462c20(0x122)]=!![],VisuMZ['AutoSkillTriggers'][_0x462c20(0x10c)]['call'](this,_0x48268);if(Imported[_0x462c20(0x13b)]&&BattleManager[_0x462c20(0x171)]())return;this[_0x462c20(0x1ae)](_0x462c20(0x1c9)),this[_0x462c20(0x1e0)]();},VisuMZ[_0x44ede5(0x1c7)][_0x44ede5(0xfa)]=BattleManager[_0x44ede5(0x1c5)],BattleManager[_0x44ede5(0x1c5)]=function(){const _0x20e0f1=_0x44ede5;VisuMZ['AutoSkillTriggers'][_0x20e0f1(0xfa)][_0x20e0f1(0x17e)](this);if(Imported[_0x20e0f1(0x13b)]&&BattleManager[_0x20e0f1(0x171)]()&&$gameTroop['turnCount']()===0x1)for(const _0x3dc710 of this['allBattleMembers']()){_0x3dc710&&(_0x3dc710[_0x20e0f1(0x1ae)](_0x20e0f1(0x1c9)),_0x3dc710[_0x20e0f1(0x1e0)]());}},VisuMZ[_0x44ede5(0x1c7)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x44ede5(0x1b8)][_0x44ede5(0xed)],Game_BattlerBase[_0x44ede5(0x1b8)][_0x44ede5(0xed)]=function(){const _0x5999a6=_0x44ede5;VisuMZ[_0x5999a6(0x1c7)][_0x5999a6(0x158)]['call'](this),this[_0x5999a6(0x1e0)]();},Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x1e0)]=function(){const _0x340695=_0x44ede5;this[_0x340695(0x186)]=![],this[_0x340695(0x154)]=![];},Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x163)]=function(){const _0x3ad044=_0x44ede5;if(!this[_0x3ad044(0x1c1)]())return;if(!SceneManager[_0x3ad044(0x12e)]())return;this[_0x3ad044(0x186)]=!![],this[_0x3ad044(0x1ae)](_0x3ad044(0x195));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x1a5)];Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x1a5)]=function(){const _0x11f4cc=_0x44ede5;_Game_Battler_onAllActionsEnd_['call'](this),this[_0x11f4cc(0x14d)]();},Game_Battler[_0x44ede5(0x1b8)][_0x44ede5(0x14d)]=function(){const _0xbd417e=_0x44ede5;if(!this['_deathAutoSkillTriggerActive'])return;if(this[_0xbd417e(0x154)])return;const _0x264e9b=BattleManager[_0xbd417e(0x16b)];for(const _0x10e448 of _0x264e9b){if(!_0x10e448)continue;if(_0x10e448[0x0]===this)return;}this[_0xbd417e(0x186)]=![],this['_deathAutoSkillTriggerPerformed']=!![],this[_0xbd417e(0x1b1)]();if(this['isAlive']())this[_0xbd417e(0x1e0)]();},VisuMZ[_0x44ede5(0x1c7)]['Game_Unit_onBattleStart']=Game_Unit[_0x44ede5(0x1b8)][_0x44ede5(0x1c9)],Game_Unit[_0x44ede5(0x1b8)][_0x44ede5(0x1c9)]=function(_0x5df218){const _0x1f95b9=_0x44ede5;VisuMZ[_0x1f95b9(0x1c7)][_0x1f95b9(0x108)][_0x1f95b9(0x17e)](this,_0x5df218);if(this[_0x1f95b9(0x178)]===Game_Party)this['_onBattleWinAutoSkillTriggerOn']=![];},Game_Unit['prototype'][_0x44ede5(0x1ab)]=function(_0x1ca4a8,_0x3e515b){const _0x1098da=_0x44ede5;_0x3e515b=_0x3e515b||null;const _0x13e466=this[_0x1098da(0x117)]()[_0x1098da(0x11f)](_0x4e76c3=>_0x4e76c3!==_0x3e515b);for(const _0x15a393 of _0x13e466){if(_0x1098da(0x13c)!==_0x1098da(0x13c)){this[_0x1098da(0x15c)](_0x2f60cd,'Target');if(_0x1d6f60['isActor']()===_0x51a6f4[_0x1098da(0x1e5)]())this[_0x1098da(0x15c)](_0x5dad6c,_0x1098da(0x14b));else _0x4999a2[_0x1098da(0x1e5)]()!==_0x4b6c52[_0x1098da(0x1e5)]()&&this['performAutoSkillTriggers'](_0x27d9a7,_0x1098da(0x19b));}else{if(!_0x15a393)continue;_0x15a393[_0x1098da(0x1ae)](_0x1ca4a8);}}},Game_Party['prototype'][_0x44ede5(0x1cb)]=function(){const _0x52f420=_0x44ede5;if(this['_onBattleWinAutoSkillTriggerOn'])return;this['_onBattleWinAutoSkillTriggerOn']=!![],this[_0x52f420(0x1ab)]('onBattleWin');};Imported['VisuMZ_2_BattleSystemOTB']&&(Window_OTB_TurnOrder[_0x44ede5(0x1b8)][_0x44ede5(0x172)]=function(_0x3c8157){const _0x21d6fd=_0x44ede5;let _0x2f2789=null;for(const _0x1e90c9 of this[_0x21d6fd(0x1aa)]){if(_0x21d6fd(0x113)!==_0x21d6fd(0x113))return _0x279118['status']&&_0x5301d9['description'][_0x21d6fd(0x132)]('['+_0x3f578d+']');else{if(!_0x1e90c9)continue;if(_0x1e90c9[_0x21d6fd(0x114)]()!==_0x3c8157)continue;_0x2f2789=_0x1e90c9,_0x1e90c9['_instance']=_0x1e90c9[_0x21d6fd(0x105)]||0x0,_0x1e90c9['_instance']++;}}_0x2f2789[_0x21d6fd(0x105)]=0x0,_0x2f2789[_0x21d6fd(0x12d)]=0x258,_0x2f2789['x']=this[_0x21d6fd(0x121)],this[_0x21d6fd(0x1aa)][_0x21d6fd(0x188)](this[_0x21d6fd(0x1aa)][_0x21d6fd(0x104)]()),this[_0x21d6fd(0x1e8)]();});function _0x2ce2(){const _0x57fd3c=['constructAutoSkillTrigger','hSUFe','RHRld','battler','NlnsZ','aRChG','aliveMembers','makeActions','iTIkN','on%2Element%1','isATB','replace','ARRAYSTRUCT','state','filter','deathStateId','_subjectX','_inBattle','_tpbChargeTime','200949TSnvcx','zijic','JSON','VisuMZ_1_SkillsStatesCore','(?:ATTACK\x20%1|STRIKE\x20%1)','FRIENDS\x20ONLY','_scene','max','ARRAYNUM','_positionDuration','isSceneBattle','isImmortal','hasDeathAutoSkillTrigger','turnCount','includes','_preventMakeActionsOtb','CreateNotetag','TARGET','clear','RegExp','chargeTime','187316XwaoKP','description','VisuMZ_2_BattleSystemOTB','vxHmw','hfYqL','USER','on%2SType%1','OOACJ','ConvertParams','note','_tpbState','isOptionValid','status','checkBattleEnd','_targets','_forceAction','name','_CHANCE','Ally','onBattleEnd','checkDeathAutoSkillTriggerRemoval','fwJff','DYxoe','onBattleWin','on%1Certain','isValid','parse','_deathAutoSkillTriggerPerformed','elementId','vnRVn','wmjRq','Game_BattlerBase_revive','Game_Battler_clearTpbChargeTime','aUaqY','Game_BattlerBase_isImmortal','performAutoSkillTriggers','on%1Physical','isAttack','map','hasOtbForcedActionAutoSkillBattler','FriendsOnly','forceAction','processDeathAutoSkillTriggerEffects','random','User','trim','setAutoSkillTrigger','Settings','ARRAYSTR','VisuMZ_3_ActiveChainSkills','_forcedBattlers','addNewState','clone','idleTime','version','returnSavedAutoSkillTriggerActions','isOTB','adjustTurnOrderAutoSkillTrigger','_autoSkillTriggerBypassTpbClear','_autoSkillTrigger','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','cmXax','otbAddActions','constructor','format','isBattleSys','fsrfr','_actionBattlers','163630OSkcVb','call','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','endAction','indexOf','Game_Battler_onBattleEnd','lhJuE','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','isEnemy','_deathAutoSkillTriggerActive','getAutoSkillTriggerSTypes','unshift','isItem','castTime','VisuMZ_3_LifeStateEffects','ENEMY','mpSXl','===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20===','BattleManager_checkBattleEnd','Opponents','applyAutoSkillTriggers','EVAL','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','onDeath','constructAutoSkillTriggerOTB','CreateNotetags','getSkillTypeNameFromID','isPhysical','isAutoSkillTrigger','Enemy','onDatabaseLoaded','52YdXKJf','NUM','forceAutoSkillTrigger','friendsUnit','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','BattleManager_endAction','VisuMZ_2_BattleSystemATB','match','onAllActionsEnd','on%1Attack','_action','Friends','_tpbTurnCount','_currentTurn','processAutoSkillTriggers','ONOnV','VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20','processAutoSkillTrigger','test','60732aeNNKi','refresh','1574480SyJXAk','canPerformInputComboSkills','ETB','Game_Enemy_makeActions','Game_Action_isValid','item','prototype','parameters','UfoFF','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','charged','STRUCT','iACNM','push','acting','canMove','ARRAYJSON','getAutoSkillTriggerElements','elements','startTurn','HaKrS','AutoSkillTriggers','isCertainHit','onBattleStart','toUpperCase','processOnBattleWinAutoSkillTriggers','return\x200','_subject','sQtXS','isMagical','AGHvO','length','applyGlobal','endActionAutoTriggerATB','WLlpS','_actions','STR','bUhpU','48935WGyJPZ','skills','occasion','stripNameTextCodes','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Action_clear','clearTpbChargeTime','on%1Element%2','clearDeathAutoSkillTrigger','VisuMZ_3_InputComboSkills','<AUTO\x20TRIGGER:[\x20]%1>','exit','FujvQ','isActor','some','subject','requestUpdateTurnOrders','PuKsr','_tpbIdleTime','eIlsE','getElementNameFromID','FTB','canActivateDeathAutoSkillTrigger','process_VisuMZ_AutoSkillTriggers_Notetags','revive','Game_Actor_makeActions','1144764nSRFUY','(?:ITEM\x20%1|ITEM\x20%1)','ARRAYFUNC','_tpbCastTime','Scene_Boot_onDatabaseLoaded','on%1Magical','Game_BattlerBase_addNewState','in\x20order\x20for\x20VisuMZ_3_AutoSkillTriggers\x20to\x20work.','VisuMZ_1_BattleCore','FRIENDS','isGuard','BattleManager_startTurn','_savedAutoSkillTriggerActions','isAutoSkillTriggerCompatible','ALLY','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','WkJsC','3TRUMZP','on%1Guard','constructAutoSkillTriggerATB','log','pop','_instance','damage','_tpbTurnEnd','Game_Unit_onBattleStart','FqxRE','rEvpW','BattleSystemOTB','Game_Battler_onBattleStart','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','\x20\x20\x20','canUse','_autoTriggerAtbReturn'];_0x2ce2=function(){return _0x57fd3c;};return _0x2ce2();};