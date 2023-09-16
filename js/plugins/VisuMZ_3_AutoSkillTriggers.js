//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.15] [AutoSkillTriggers]
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

const _0x4f2e7b=_0x164d;(function(_0x59b983,_0x2f93e9){const _0x5c9a9c=_0x164d,_0x5cdfd9=_0x59b983();while(!![]){try{const _0x3ac0a8=parseInt(_0x5c9a9c(0x10e))/0x1*(-parseInt(_0x5c9a9c(0x140))/0x2)+-parseInt(_0x5c9a9c(0x160))/0x3*(parseInt(_0x5c9a9c(0x161))/0x4)+-parseInt(_0x5c9a9c(0xee))/0x5*(-parseInt(_0x5c9a9c(0xba))/0x6)+-parseInt(_0x5c9a9c(0x9c))/0x7*(parseInt(_0x5c9a9c(0x17f))/0x8)+parseInt(_0x5c9a9c(0x185))/0x9+parseInt(_0x5c9a9c(0x16f))/0xa*(-parseInt(_0x5c9a9c(0xa0))/0xb)+parseInt(_0x5c9a9c(0x8b))/0xc;if(_0x3ac0a8===_0x2f93e9)break;else _0x5cdfd9['push'](_0x5cdfd9['shift']());}catch(_0x41c0b6){_0x5cdfd9['push'](_0x5cdfd9['shift']());}}}(_0x5444,0x1c81a));var label=_0x4f2e7b(0x113),tier=tier||0x0,dependencies=[_0x4f2e7b(0x101)],pluginData=$plugins[_0x4f2e7b(0xf7)](function(_0x30499e){const _0x365733=_0x4f2e7b;return _0x30499e['status']&&_0x30499e[_0x365733(0x170)][_0x365733(0x12c)]('['+label+']');})[0x0];VisuMZ[label][_0x4f2e7b(0x17d)]=VisuMZ[label][_0x4f2e7b(0x17d)]||{},VisuMZ[_0x4f2e7b(0x139)]=function(_0x7f4018,_0x17af60){const _0x46dfad=_0x4f2e7b;for(const _0x1c529f in _0x17af60){if(_0x1c529f['match'](/(.*):(.*)/i)){const _0x2b88db=String(RegExp['$1']),_0x943bef=String(RegExp['$2'])[_0x46dfad(0x12d)]()[_0x46dfad(0x14f)]();let _0x49c2da,_0x57301d,_0x5185ef;switch(_0x943bef){case _0x46dfad(0x143):_0x49c2da=_0x17af60[_0x1c529f]!==''?Number(_0x17af60[_0x1c529f]):0x0;break;case _0x46dfad(0x148):_0x57301d=_0x17af60[_0x1c529f]!==''?JSON[_0x46dfad(0xf6)](_0x17af60[_0x1c529f]):[],_0x49c2da=_0x57301d[_0x46dfad(0xb3)](_0x3a9ba2=>Number(_0x3a9ba2));break;case _0x46dfad(0x124):_0x49c2da=_0x17af60[_0x1c529f]!==''?eval(_0x17af60[_0x1c529f]):null;break;case _0x46dfad(0xa7):_0x57301d=_0x17af60[_0x1c529f]!==''?JSON[_0x46dfad(0xf6)](_0x17af60[_0x1c529f]):[],_0x49c2da=_0x57301d[_0x46dfad(0xb3)](_0x57adcc=>eval(_0x57adcc));break;case _0x46dfad(0xa9):_0x49c2da=_0x17af60[_0x1c529f]!==''?JSON['parse'](_0x17af60[_0x1c529f]):'';break;case _0x46dfad(0x12f):_0x57301d=_0x17af60[_0x1c529f]!==''?JSON[_0x46dfad(0xf6)](_0x17af60[_0x1c529f]):[],_0x49c2da=_0x57301d['map'](_0xe294e8=>JSON[_0x46dfad(0xf6)](_0xe294e8));break;case _0x46dfad(0x9e):_0x49c2da=_0x17af60[_0x1c529f]!==''?new Function(JSON['parse'](_0x17af60[_0x1c529f])):new Function(_0x46dfad(0x135));break;case _0x46dfad(0x132):_0x57301d=_0x17af60[_0x1c529f]!==''?JSON[_0x46dfad(0xf6)](_0x17af60[_0x1c529f]):[],_0x49c2da=_0x57301d[_0x46dfad(0xb3)](_0x2c8b14=>new Function(JSON[_0x46dfad(0xf6)](_0x2c8b14)));break;case _0x46dfad(0xd1):_0x49c2da=_0x17af60[_0x1c529f]!==''?String(_0x17af60[_0x1c529f]):'';break;case _0x46dfad(0x184):_0x57301d=_0x17af60[_0x1c529f]!==''?JSON['parse'](_0x17af60[_0x1c529f]):[],_0x49c2da=_0x57301d['map'](_0x393a4e=>String(_0x393a4e));break;case _0x46dfad(0x181):_0x5185ef=_0x17af60[_0x1c529f]!==''?JSON[_0x46dfad(0xf6)](_0x17af60[_0x1c529f]):{},_0x49c2da=VisuMZ[_0x46dfad(0x139)]({},_0x5185ef);break;case'ARRAYSTRUCT':_0x57301d=_0x17af60[_0x1c529f]!==''?JSON[_0x46dfad(0xf6)](_0x17af60[_0x1c529f]):[],_0x49c2da=_0x57301d[_0x46dfad(0xb3)](_0x1d4957=>VisuMZ['ConvertParams']({},JSON[_0x46dfad(0xf6)](_0x1d4957)));break;default:continue;}_0x7f4018[_0x2b88db]=_0x49c2da;}}return _0x7f4018;},(_0x213484=>{const _0x4e5059=_0x4f2e7b,_0x33830a=_0x213484[_0x4e5059(0x85)];for(const _0x2e3d1f of dependencies){if(_0x4e5059(0xfc)!==_0x4e5059(0x108)){if(!Imported[_0x2e3d1f]){alert(_0x4e5059(0xd6)[_0x4e5059(0x100)](_0x33830a,_0x2e3d1f)),SceneManager[_0x4e5059(0xd8)]();break;}}else _0x443d22['processAutoSkillTrigger'](_0x4e5059(0x149)),_0x3ad594['clearDeathAutoSkillTrigger']();}const _0x136259=_0x213484[_0x4e5059(0x170)];if(_0x136259[_0x4e5059(0x155)](/\[Version[ ](.*?)\]/i)){if(_0x4e5059(0x7c)==='paXdr')this[_0x4e5059(0xa6)](_0x2149b3,_0x4e5059(0x158));else{const _0x38a853=Number(RegExp['$1']);if(_0x38a853!==VisuMZ[label][_0x4e5059(0xb9)]){if(_0x4e5059(0xed)!=='dMnbp')alert(_0x4e5059(0x11e)[_0x4e5059(0x100)](_0x33830a,_0x38a853)),SceneManager[_0x4e5059(0xd8)]();else return this[_0x4e5059(0xaa)](_0x5ede43[_0x4e5059(0x17e)][_0x1151c4]);}}}if(_0x136259[_0x4e5059(0x155)](/\[Tier[ ](\d+)\]/i)){if(_0x4e5059(0xde)===_0x4e5059(0xac)){if(this[_0x4e5059(0xf4)]())return![];if(this[_0x4e5059(0x146)]()&&this[_0x4e5059(0x171)]())return![];}else{const _0x4bdd08=Number(RegExp['$1']);_0x4bdd08<tier?(alert(_0x4e5059(0x121)[_0x4e5059(0x100)](_0x33830a,_0x4bdd08,tier)),SceneManager['exit']()):tier=Math[_0x4e5059(0xfe)](_0x4bdd08,tier);}}VisuMZ[_0x4e5059(0x139)](VisuMZ[label]['Settings'],_0x213484['parameters']);})(pluginData);if(Imported[_0x4f2e7b(0x118)]&&VisuMZ[_0x4f2e7b(0x128)][_0x4f2e7b(0xb9)]<1.13){let text='';text+=_0x4f2e7b(0xdc),text+=_0x4f2e7b(0xf8),alert(text),SceneManager[_0x4f2e7b(0xd8)]();}VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0xd2)]=Scene_Boot['prototype'][_0x4f2e7b(0x14d)],Scene_Boot['prototype'][_0x4f2e7b(0x14d)]=function(){const _0x19b7a5=_0x4f2e7b;VisuMZ[_0x19b7a5(0x113)][_0x19b7a5(0xd2)][_0x19b7a5(0xb7)](this),this[_0x19b7a5(0x8a)]();},Scene_Boot[_0x4f2e7b(0x114)][_0x4f2e7b(0x8a)]=function(){const _0x2199cb=_0x4f2e7b;VisuMZ[_0x2199cb(0x113)][_0x2199cb(0x105)]();},VisuMZ['AutoSkillTriggers'][_0x4f2e7b(0x159)]={},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x105)]=function(){const _0x556aa2=_0x4f2e7b;let _0x389045=[[_0x556aa2(0x169),_0x556aa2(0x14e)],[_0x556aa2(0x106),_0x556aa2(0xd5)],['Ally',_0x556aa2(0x13b)],[_0x556aa2(0x158),_0x556aa2(0xbf)],[_0x556aa2(0xb0),_0x556aa2(0xd7)],[_0x556aa2(0x157),_0x556aa2(0x107)],[_0x556aa2(0x153),'OPPONENTS']],_0x4a73c7=[[_0x556aa2(0x149),'(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)'],[_0x556aa2(0x13f),_0x556aa2(0xec)],[_0x556aa2(0xcb),'(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)']];for(const _0x1e61df of _0x389045){if(!_0x1e61df)continue;_0x4a73c7['push']([_0x556aa2(0xce)[_0x556aa2(0x100)](_0x1e61df[0x0]),'(?:ATTACK\x20%1|STRIKE\x20%1)'['format'](_0x1e61df[0x1])]),_0x4a73c7['push']([_0x556aa2(0xbd)[_0x556aa2(0x100)](_0x1e61df[0x0]),_0x556aa2(0x99)[_0x556aa2(0x100)](_0x1e61df[0x1])]),_0x4a73c7[_0x556aa2(0x96)]([_0x556aa2(0xc8)['format'](_0x1e61df[0x0]),_0x556aa2(0xa1)[_0x556aa2(0x100)](_0x1e61df[0x1])]),_0x4a73c7[_0x556aa2(0x96)]([_0x556aa2(0x164)[_0x556aa2(0x100)](_0x1e61df[0x0]),_0x556aa2(0x94)[_0x556aa2(0x100)](_0x1e61df[0x1])]),_0x4a73c7[_0x556aa2(0x96)]([_0x556aa2(0x186)[_0x556aa2(0x100)](_0x1e61df[0x0]),_0x556aa2(0x13a)[_0x556aa2(0x100)](_0x1e61df[0x1])]),_0x4a73c7['push']([_0x556aa2(0x97)[_0x556aa2(0x100)](_0x1e61df[0x0]),'(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)'['format'](_0x1e61df[0x1])]);}for(const _0x531c6b of $dataSystem[_0x556aa2(0xe6)]){if(!_0x531c6b)continue;let _0x1965f1=DataManager['stripNameTextCodes'](_0x531c6b);for(const _0x2f6cce of _0x389045){if(_0x556aa2(0x162)!==_0x556aa2(0x162))this['clearTpbChargeTime']();else{if(!_0x2f6cce)continue;_0x4a73c7[_0x556aa2(0x96)]([_0x556aa2(0x145)[_0x556aa2(0x100)](_0x1965f1[_0x556aa2(0x11a)](/[ ]/gi,''),_0x2f6cce[0x0]),_0x556aa2(0xf5)[_0x556aa2(0x100)](_0x1965f1,_0x2f6cce[0x1])]);}}}for(const _0x3ff252 of $dataSystem[_0x556aa2(0x17e)]){if(!_0x3ff252)continue;let _0x3ee7ff=DataManager[_0x556aa2(0xaa)](_0x3ff252);for(const _0x1773d9 of _0x389045){if(!_0x1773d9)continue;_0x4a73c7['push']([_0x556aa2(0x112)[_0x556aa2(0x100)](_0x3ee7ff[_0x556aa2(0x11a)](/[ ]/gi,''),_0x1773d9[0x0]),_0x556aa2(0x15f)[_0x556aa2(0x100)](_0x3ee7ff,_0x1773d9[0x1])]);}}for(const _0x164ec3 of _0x4a73c7){if(_0x556aa2(0x7e)==='FnIcE'){if(!_0x23b74a['isAutoSkillTriggerCompatible']())return;if(!this[_0x556aa2(0x14b)])return;if(this['_actions'][_0x556aa2(0xcc)]>0x0)return;this['_actions']=this['_savedAutoSkillTriggerActions'],this[_0x556aa2(0x14b)]=_0x37f6e2;}else this['CreateNotetag'](_0x164ec3[0x0],_0x164ec3[0x1]);}},VisuMZ[_0x4f2e7b(0x113)]['CreateNotetag']=function(_0x58459e,_0x371a04){const _0x471531=_0x4f2e7b;_0x58459e=_0x58459e[_0x471531(0x12d)]()[_0x471531(0x14f)]();const _0x821dd3=_0x471531(0x165)[_0x471531(0x100)](_0x371a04),_0x25580f=_0x58459e+_0x471531(0x167),_0x215a3f='<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>'['format'](_0x371a04);try{_0x471531(0x150)===_0x471531(0x150)?(VisuMZ['AutoSkillTriggers'][_0x471531(0x159)][_0x58459e]=new RegExp(_0x821dd3,'i'),VisuMZ[_0x471531(0x113)]['RegExp'][_0x25580f]=new RegExp(_0x215a3f,'i')):this[_0x471531(0xc9)][_0x471531(0x14a)]=!![];}catch(_0x4eedb4){if(_0x471531(0xc0)===_0x471531(0xc0))Utils['isOptionValid']('test')&&(console[_0x471531(0x129)]('===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20==='),console['log'](_0x471531(0xdd)[_0x471531(0x100)](_0x821dd3,_0x215a3f)),console[_0x471531(0x129)](_0x471531(0xa8)),console['log'](_0x471531(0x166)));else return this[_0x471531(0xaa)](_0x2439fa[_0x471531(0xe6)][_0x587ca4]);}},DataManager[_0x4f2e7b(0x11f)]=function(_0x3c0ce9){const _0x2b1a47=_0x4f2e7b;return this['stripNameTextCodes']($dataSystem[_0x2b1a47(0xe6)][_0x3c0ce9]);},DataManager['stripNameTextCodes']=function(_0x3bb21d){const _0x1b016e=_0x4f2e7b;if(!_0x3bb21d)return'';return _0x3bb21d=_0x3bb21d[_0x1b016e(0x11a)](/\\V\[(\d+)\]/gi,''),_0x3bb21d=_0x3bb21d['replace'](/\\I\[(\d+)\]/gi,''),_0x3bb21d=_0x3bb21d[_0x1b016e(0x11a)](/\\C\[(\d+)\]/gi,''),_0x3bb21d=_0x3bb21d[_0x1b016e(0x11a)](/\\N\[(\d+)\]/gi,''),_0x3bb21d=_0x3bb21d[_0x1b016e(0x11a)](/\\P\[(\d+)\]/gi,''),(_0x3bb21d||'')[_0x1b016e(0x12d)]()[_0x1b016e(0x14f)]();},DataManager['getElementNameFromID']=function(_0x559b14){return this['stripNameTextCodes']($dataSystem['elements'][_0x559b14]);},BattleManager[_0x4f2e7b(0x179)]=function(){const _0x2dc28e=_0x4f2e7b;if(this[_0x2dc28e(0xf9)](_0x2dc28e(0x82)))return![];if(this['isBattleSys'](_0x2dc28e(0x7d)))return![];if(this[_0x2dc28e(0xf9)]('PTB'))return![];if(Imported[_0x2dc28e(0x83)]){const _0x7844b6=SceneManager['_scene'];if(_0x7844b6&&_0x7844b6[_0x2dc28e(0x173)]())return![];}if(Imported[_0x2dc28e(0x137)]){if(_0x2dc28e(0xa4)===_0x2dc28e(0x13e))_0x2815b1&&(_0x2038a5[_0x2dc28e(0xc3)](_0x2dc28e(0x149)),_0x49f6bf[_0x2dc28e(0x178)]());else{const _0xd413bf=SceneManager['_scene'];if(_0xd413bf&&_0xd413bf[_0x2dc28e(0x11d)]())return![];}}return!![];},VisuMZ[_0x4f2e7b(0x113)]['BattleManager_endAction']=BattleManager[_0x4f2e7b(0xcf)],BattleManager[_0x4f2e7b(0xcf)]=function(){const _0x3be5f9=_0x4f2e7b,_0x4614a8=this['_action']&&this[_0x3be5f9(0x16b)][_0x3be5f9(0xbb)](),_0x31ee9e=this[_0x3be5f9(0xc9)];_0x4614a8&&(this[_0x3be5f9(0xc9)]['_autoSkillTriggerBypassTpbClear']=!![]),VisuMZ[_0x3be5f9(0x113)][_0x3be5f9(0x168)]['call'](this),_0x31ee9e&&_0x4614a8&&(_0x31ee9e[_0x3be5f9(0xab)](),_0x31ee9e[_0x3be5f9(0x174)]());},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0xe3)]=BattleManager[_0x4f2e7b(0x127)],BattleManager[_0x4f2e7b(0x127)]=function(){const _0x4eb055=_0x4f2e7b;if($gameTroop['isAllDead']()){if(_0x4eb055(0x16a)!=='PbxBL'){if(!this[_0x4eb055(0xae)]())return;if(!_0x164cf3[_0x4eb055(0xb6)]())return;this[_0x4eb055(0x16e)]=!![],this[_0x4eb055(0xc3)](_0x4eb055(0xcb));}else $gameParty[_0x4eb055(0x16c)]();}if(this[_0x4eb055(0x84)][_0x4eb055(0xcc)]>0x0)return![];if(BattleManager[_0x4eb055(0x180)]())return![];return VisuMZ[_0x4eb055(0x113)][_0x4eb055(0xe3)][_0x4eb055(0xb7)](this);},BattleManager[_0x4f2e7b(0x180)]=function(){const _0x2cbe88=_0x4f2e7b;if(!Imported['VisuMZ_2_BattleSystemOTB'])return![];if(!BattleManager[_0x2cbe88(0xc6)]())return![];return this['_actionBattlers'][_0x2cbe88(0xa5)](_0x3b9638=>_0x3b9638[_0x2cbe88(0x91)][_0x2cbe88(0xa5)](_0x1e45c3=>_0x1e45c3&&_0x1e45c3[_0x2cbe88(0x15a)]));},VisuMZ[_0x4f2e7b(0x113)]['Game_Action_clear']=Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0x80)],Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0x80)]=function(){const _0x5e272e=_0x4f2e7b;VisuMZ[_0x5e272e(0x113)]['Game_Action_clear'][_0x5e272e(0xb7)](this),this[_0x5e272e(0xf2)](![]);},Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0xf2)]=function(_0x359634){this['_autoSkillTrigger']=_0x359634;},Game_Action[_0x4f2e7b(0x114)]['isAutoSkillTrigger']=function(){const _0x5e9851=_0x4f2e7b;return!!this[_0x5e9851(0x141)];},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0xdb)]=Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0x154)],Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0x154)]=function(){const _0x4ae222=_0x4f2e7b;let _0x26d3d5=VisuMZ['AutoSkillTriggers']['Game_Action_isValid'][_0x4ae222(0xb7)](this),_0x43160b=this[_0x4ae222(0xe5)]()?this[_0x4ae222(0xe5)]()[_0x4ae222(0x89)]:-0x1;if(this[_0x4ae222(0xe5)]()&&this['isAutoSkillTrigger']())return this[_0x4ae222(0xe5)]()['occasion']=0x0,_0x26d3d5=_0x26d3d5&&this[_0x4ae222(0xf1)]()[_0x4ae222(0xd9)](this[_0x4ae222(0xe5)]()),this[_0x4ae222(0xe5)]()[_0x4ae222(0x89)]=_0x43160b,_0x26d3d5;else{if(_0x4ae222(0xc4)==='wKmyX')return _0x26d3d5;else{const _0x3fd09d=_0x51fc38['_scene'];if(_0x3fd09d&&_0x3fd09d[_0x4ae222(0x11d)]())return![];}}},VisuMZ['AutoSkillTriggers'][_0x4f2e7b(0xe9)]=Game_Action['prototype'][_0x4f2e7b(0x176)],Game_Action[_0x4f2e7b(0x114)]['applyGlobal']=function(){const _0xe4e58c=_0x4f2e7b;VisuMZ[_0xe4e58c(0x113)][_0xe4e58c(0xe9)]['call'](this),this[_0xe4e58c(0x122)]();},Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0x123)]=function(){const _0x1ca491=_0x4f2e7b;if(!this[_0x1ca491(0xad)]())return[];let _0x1d7fc2=[];if(Imported[_0x1ca491(0xca)])_0x1d7fc2=DataManager['getSkillTypes'](this[_0x1ca491(0xe5)]());else{if(_0x1ca491(0xd4)!==_0x1ca491(0xd4)){this[_0x1ca491(0x14a)]=_0x4678f8;return;}else _0x1d7fc2[_0x1ca491(0x96)](this['item']()[_0x1ca491(0xaf)]);}return _0x1d7fc2[_0x1ca491(0xb3)](_0x46004f=>DataManager['getSkillTypeNameFromID'](_0x46004f));},Game_Action['prototype'][_0x4f2e7b(0xe8)]=function(){const _0x569708=_0x4f2e7b;let _0x111e59=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x111e59=this[_0x569708(0x17e)]();else{if(this[_0x569708(0xe5)]()[_0x569708(0x182)][_0x569708(0x131)]<0x0){if(_0x569708(0xdf)!=='izmYl'){if(!_0xe8c183[_0x569708(0xb6)]())return![];if(!this[_0x569708(0xae)]())return![];if(this[_0x569708(0x17a)])return![];return this[_0x569708(0xe7)]()[_0x569708(0xa5)](_0x1d77cd=>this[_0x569708(0xc2)](_0x1d77cd));}else{const _0x533a4f=this[_0x569708(0xf1)]();_0x111e59=_0x533a4f[_0x569708(0xcd)]();}}else _0x569708(0x86)!==_0x569708(0x86)?this[_0x569708(0xd0)](_0x50defd):_0x111e59=[this[_0x569708(0xe5)]()['damage'][_0x569708(0x131)]];}return _0x111e59[_0x569708(0xb3)](_0x245b64=>DataManager['getElementNameFromID'](_0x245b64));},Game_Action[_0x4f2e7b(0x114)][_0x4f2e7b(0x122)]=function(){const _0x20d9f5=_0x4f2e7b;if(!SceneManager[_0x20d9f5(0xb6)]())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this[_0x20d9f5(0xe5)]())return;if(this[_0x20d9f5(0xe5)]()[_0x20d9f5(0xea)]['match'](/<NO AUTO SKILL TRIGGER>/i))return;if(this['item']()[_0x20d9f5(0xea)][_0x20d9f5(0x155)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x42fd88=this[_0x20d9f5(0xf1)](),_0xc24d90=BattleManager[_0x20d9f5(0xc1)][_0x20d9f5(0xf7)]((_0xbc1a2d,_0x51a902,_0x466dfa)=>_0x466dfa[_0x20d9f5(0x16d)](_0xbc1a2d)===_0x51a902),_0x402efa=_0x42fd88[_0x20d9f5(0x15e)]()[_0x20d9f5(0xe1)](),_0x4a3869=_0x42fd88[_0x20d9f5(0x9a)]()[_0x20d9f5(0xe1)]();this[_0x20d9f5(0xa6)](_0x42fd88,'User');for(const _0x197507 of _0xc24d90){if(_0x20d9f5(0x177)===_0x20d9f5(0xd3)){if(!_0x5320de['VisuMZ_2_BattleSystemOTB'])return![];if(!_0x18831b['isOTB']())return![];return this['_actionBattlers'][_0x20d9f5(0xa5)](_0x306650=>_0x306650['_actions'][_0x20d9f5(0xa5)](_0x4a4bb7=>_0x4a4bb7&&_0x4a4bb7[_0x20d9f5(0x15a)]));}else{this[_0x20d9f5(0xa6)](_0x197507,_0x20d9f5(0x106));if(_0x197507[_0x20d9f5(0x147)]()===_0x42fd88[_0x20d9f5(0x147)]())this[_0x20d9f5(0xa6)](_0x197507,'Ally');else{if(_0x197507['isActor']()!==_0x42fd88['isActor']()){if('MZzhN'!==_0x20d9f5(0x111))this[_0x20d9f5(0xa6)](_0x197507,'Enemy');else{const _0x1252ea=(_0x167072(_0x18608a['$1'])||0x0)*0.01;_0x4d8d5b=_0x9cb4b8['random']()<_0x1252ea;}}}}}for(const _0x4d3757 of _0x402efa){this[_0x20d9f5(0xa6)](_0x4d3757,'Friends'),_0x4d3757!==_0x42fd88&&this[_0x20d9f5(0xa6)](_0x4d3757,_0x20d9f5(0x157));}for(const _0x2a47f5 of _0x4a3869){this[_0x20d9f5(0xa6)](_0x2a47f5,'Opponents');}},Game_Action[_0x4f2e7b(0x114)]['performAutoSkillTriggers']=function(_0x201ffd,_0x2e34cb){const _0x16718f=_0x4f2e7b;if(!_0x201ffd)return;if(!BattleManager[_0x16718f(0x179)]())return;if(this[_0x16718f(0x102)]())_0x201ffd[_0x16718f(0xc3)](_0x16718f(0xce)[_0x16718f(0x100)](_0x2e34cb));if(this[_0x16718f(0xe4)]())_0x201ffd[_0x16718f(0xc3)](_0x16718f(0xbd)[_0x16718f(0x100)](_0x2e34cb));if(this[_0x16718f(0x138)]())_0x201ffd['processAutoSkillTrigger']('on%1Item'[_0x16718f(0x100)](_0x2e34cb));if(this[_0x16718f(0x90)]())_0x201ffd[_0x16718f(0xc3)]('on%1Physical'[_0x16718f(0x100)](_0x2e34cb));if(this[_0x16718f(0xfd)]())_0x201ffd[_0x16718f(0xc3)]('on%1Magical'[_0x16718f(0x100)](_0x2e34cb));if(this[_0x16718f(0x110)]())_0x201ffd[_0x16718f(0xc3)](_0x16718f(0x97)[_0x16718f(0x100)](_0x2e34cb));const _0x25272d=this[_0x16718f(0x123)]();for(let _0x81ddab of _0x25272d){if(!_0x81ddab)continue;_0x81ddab=_0x81ddab[_0x16718f(0x11a)](/[ ]/gi,''),_0x201ffd[_0x16718f(0xc3)](_0x16718f(0x142)[_0x16718f(0x100)](_0x2e34cb,_0x81ddab));}const _0x3428e3=this[_0x16718f(0xe8)]();for(let _0x4801bd of _0x3428e3){if(!_0x4801bd)continue;_0x4801bd=_0x4801bd[_0x16718f(0x11a)](/[ ]/gi,''),_0x201ffd['processAutoSkillTrigger'](_0x16718f(0x15d)[_0x16718f(0x100)](_0x2e34cb,_0x4801bd));}},VisuMZ['AutoSkillTriggers'][_0x4f2e7b(0x12b)]=Game_BattlerBase[_0x4f2e7b(0x114)][_0x4f2e7b(0x109)],Game_BattlerBase[_0x4f2e7b(0x114)][_0x4f2e7b(0x109)]=function(_0x4ef865){const _0x23640e=_0x4f2e7b;if(this['canActivateDeathAutoSkillTrigger'](_0x4ef865))return this['processDeathAutoSkillTriggerEffects']();VisuMZ['AutoSkillTriggers']['Game_BattlerBase_addNewState'][_0x23640e(0xb7)](this,_0x4ef865);},Game_BattlerBase[_0x4f2e7b(0x114)]['canActivateDeathAutoSkillTrigger']=function(_0x461a47){const _0x1f4561=_0x4f2e7b;if(_0x461a47!==this['deathStateId']())return![];if(Imported[_0x1f4561(0x163)]){if(this[_0x1f4561(0xf4)]())return![];if(this[_0x1f4561(0x146)]()&&this['hasDeathTransform']())return![];}return this[_0x1f4561(0x8d)]();},Game_BattlerBase[_0x4f2e7b(0x114)][_0x4f2e7b(0x8d)]=function(){const _0x3fd4bd=_0x4f2e7b;if(!SceneManager[_0x3fd4bd(0xb6)]())return![];if(!this[_0x3fd4bd(0xae)]())return![];if(this['_deathAutoSkillTriggerPerformed'])return![];return this[_0x3fd4bd(0xe7)]()[_0x3fd4bd(0xa5)](_0x161a4c=>this[_0x3fd4bd(0xc2)](_0x161a4c));},Game_BattlerBase['prototype'][_0x4f2e7b(0xc2)]=function(_0x18387b){const _0x15b14e=_0x4f2e7b,_0x4c302a=VisuMZ[_0x15b14e(0x113)][_0x15b14e(0x159)][_0x15b14e(0x104)];return _0x18387b&&_0x18387b[_0x15b14e(0xea)]['match'](_0x4c302a)&&this[_0x15b14e(0xd9)](_0x18387b);},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x92)]=Game_BattlerBase[_0x4f2e7b(0x114)]['isImmortal'],Game_BattlerBase[_0x4f2e7b(0x114)][_0x4f2e7b(0x12e)]=function(){const _0x43e952=_0x4f2e7b;if(this[_0x43e952(0x16e)])return!![];return VisuMZ[_0x43e952(0x113)][_0x43e952(0x92)][_0x43e952(0xb7)](this);},Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0xc3)]=function(_0x5cad59){const _0x1d966c=_0x4f2e7b;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x1d966c(0x179)]())return;_0x5cad59=_0x5cad59[_0x1d966c(0x12d)]()[_0x1d966c(0x14f)]();const _0x208447=VisuMZ[_0x1d966c(0x113)][_0x1d966c(0x159)][_0x5cad59],_0x3de50c=_0x5cad59+'_CHANCE',_0x1cc55c=VisuMZ[_0x1d966c(0x113)][_0x1d966c(0x159)][_0x3de50c];if(!_0x208447&&!_0x1cc55c)return;if(!this[_0x1d966c(0xae)]())return;for(const _0x3db7d8 of this[_0x1d966c(0xe7)]()){if(!_0x3db7d8)continue;if(!this[_0x1d966c(0xd9)](_0x3db7d8))continue;let _0x39b807=![];if(_0x3db7d8[_0x1d966c(0xea)]['match'](_0x208447))_0x39b807=!![];else{if(_0x3db7d8[_0x1d966c(0xea)][_0x1d966c(0x155)](_0x1cc55c)){const _0x12e072=(Number(RegExp['$1'])||0x0)*0.01;_0x39b807=Math[_0x1d966c(0x115)]()<_0x12e072;}}if(_0x39b807){if(Imported['VisuMZ_2_BattleSystemATB']&&BattleManager['isAutoSkillTriggerCompatible']()){if('xsXZk'===_0x1d966c(0x9d))return _0x46e729[_0x1d966c(0x8e)]&&_0x50158e['description'][_0x1d966c(0x12c)]('['+_0x43a24a+']');else this[_0x1d966c(0x87)](_0x3db7d8);}else Imported[_0x1d966c(0x118)]&&BattleManager['isOTB']()?this[_0x1d966c(0xe2)](_0x3db7d8):this[_0x1d966c(0xd0)](_0x3db7d8);}}},Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0xd0)]=function(_0x26ea78){const _0x1fee89=_0x4f2e7b;this['forceAutoSkillTrigger'](_0x26ea78['id']);const _0x55788e=BattleManager[_0x1fee89(0x156)]['clone'](),_0x467de7=BattleManager[_0x1fee89(0xc9)];BattleManager[_0x1fee89(0xc9)]=null,BattleManager['forceAction'](this),BattleManager['_actionBattlers']=_0x55788e,BattleManager['_subject']=_0x467de7;},Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0x87)]=function(_0x573862,_0x9ae0c5){const _0xca0d6=_0x4f2e7b;this[_0xca0d6(0x12a)]={'state':this[_0xca0d6(0x9b)],'chargeTime':this[_0xca0d6(0x136)],'castTime':this[_0xca0d6(0x10c)],'idleTime':this[_0xca0d6(0xf3)],'turnCount':this[_0xca0d6(0x11b)],'turnEnd':this[_0xca0d6(0x183)]},this['constructAutoSkillTrigger'](_0x573862);},Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0x174)]=function(){const _0x54b771=_0x4f2e7b;if(!Imported[_0x54b771(0xa2)])return;if(!BattleManager[_0x54b771(0x120)]())return;[_0x54b771(0x103),_0x54b771(0xc5)]['includes'](this[_0x54b771(0x9b)])&&(_0x54b771(0x10f)!=='DZwdx'?this[_0x54b771(0x17c)]():_0x9000a6=_0x343b0a[_0x54b771(0xfe)](_0x8276cf,_0x4802ed));if(!this[_0x54b771(0x12a)])return;this[_0x54b771(0x9b)]=this[_0x54b771(0x12a)][_0x54b771(0xef)],this[_0x54b771(0x136)]=this[_0x54b771(0x12a)][_0x54b771(0x187)],this[_0x54b771(0x10c)]=this[_0x54b771(0x12a)]['castTime'],this[_0x54b771(0xf3)]=this['_autoTriggerAtbReturn'][_0x54b771(0x11c)],this['_tpbTurnCount']=this[_0x54b771(0x12a)][_0x54b771(0x13c)],this[_0x54b771(0x183)]=this[_0x54b771(0x12a)][_0x54b771(0x81)],BattleManager[_0x54b771(0xc9)]=null,this[_0x54b771(0x12a)]=undefined,[_0x54b771(0x103),_0x54b771(0xc5)][_0x54b771(0x12c)](this['_tpbState'])&&(_0x54b771(0x93)!==_0x54b771(0x93)?this[_0x54b771(0x87)](_0x5432a4):this[_0x54b771(0x17c)]());},Game_Battler[_0x4f2e7b(0x114)]['constructAutoSkillTriggerOTB']=function(_0x41cbf6){const _0x3d77e6=_0x4f2e7b;if(!this[_0x3d77e6(0xae)]())return;this[_0x3d77e6(0xb8)](_0x41cbf6['id']),$gameTemp['_preventMakeActionsOtb']=!![],this[_0x3d77e6(0x15c)](0x1,!![]),$gameTemp[_0x3d77e6(0x8f)]=![];const _0x1efa9c=BattleManager[_0x3d77e6(0x156)];_0x1efa9c[_0x3d77e6(0x8c)](_0x1efa9c[_0x3d77e6(0x10d)]());const _0x354746=SceneManager[_0x3d77e6(0x13d)][_0x3d77e6(0x17b)];_0x354746&&_0x354746[_0x3d77e6(0xfb)](this);},VisuMZ['AutoSkillTriggers'][_0x4f2e7b(0xa3)]=Game_Actor[_0x4f2e7b(0x114)][_0x4f2e7b(0x15b)],Game_Actor[_0x4f2e7b(0x114)]['makeActions']=function(){const _0x807a66=_0x4f2e7b;if($gameTemp[_0x807a66(0x8f)])return;VisuMZ[_0x807a66(0x113)]['Game_Actor_makeActions'][_0x807a66(0xb7)](this);},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x14c)]=Game_Enemy[_0x4f2e7b(0x114)][_0x4f2e7b(0x15b)],Game_Enemy[_0x4f2e7b(0x114)][_0x4f2e7b(0x15b)]=function(){const _0x545331=_0x4f2e7b;if($gameTemp[_0x545331(0x8f)])return;VisuMZ[_0x545331(0x113)][_0x545331(0x14c)][_0x545331(0xb7)](this);},Game_Battler[_0x4f2e7b(0x114)]['forceAutoSkillTrigger']=function(_0x3e7c92){const _0x453297=_0x4f2e7b;if(!BattleManager[_0x453297(0x179)]())return;if(!this['_savedAutoSkillTriggerActions']){if('qTGvZ'===_0x453297(0x10b))this[_0x453297(0x14b)]=this['_actions'][_0x453297(0x125)]();else{if(this['_deathAutoSkillTriggerActive'])return!![];return _0xba3504[_0x453297(0x113)][_0x453297(0x92)][_0x453297(0xb7)](this);}}this[_0x453297(0xff)](_0x3e7c92,-0x2);if(!this['_actions'])return;const _0x234431=this['_actions'][this['_actions']['length']-0x1];_0x234431[_0x453297(0xf2)](!![]);},Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0xab)]=function(){const _0x470b95=_0x4f2e7b;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this[_0x470b95(0x14b)])return;if(this[_0x470b95(0x91)][_0x470b95(0xcc)]>0x0)return;this[_0x470b95(0x91)]=this[_0x470b95(0x14b)],this['_savedAutoSkillTriggerActions']=undefined;},VisuMZ[_0x4f2e7b(0x113)]['Game_Battler_onBattleEnd']=Game_Battler[_0x4f2e7b(0x114)]['onBattleEnd'],Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0x7f)]=function(){const _0x2a0ecd=_0x4f2e7b;this[_0x2a0ecd(0x14b)]=undefined,VisuMZ[_0x2a0ecd(0x113)][_0x2a0ecd(0x151)][_0x2a0ecd(0xb7)](this);},VisuMZ['AutoSkillTriggers'][_0x4f2e7b(0xe0)]=Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0x17c)],Game_Battler['prototype']['clearTpbChargeTime']=function(){const _0x126e49=_0x4f2e7b;if(this[_0x126e49(0x14a)]){if(_0x126e49(0xb4)===_0x126e49(0xb4)){this[_0x126e49(0x14a)]=undefined;return;}else this['performAutoSkillTriggers'](_0x2dc154,_0x126e49(0x157));}VisuMZ[_0x126e49(0x113)][_0x126e49(0xe0)][_0x126e49(0xb7)](this);},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x10a)]=Game_Battler['prototype'][_0x4f2e7b(0x149)],Game_Battler['prototype'][_0x4f2e7b(0x149)]=function(_0x584c24){const _0xc2271b=_0x4f2e7b;this[_0xc2271b(0x14b)]=undefined,$gameParty[_0xc2271b(0x116)]=!![],VisuMZ[_0xc2271b(0x113)]['Game_Battler_onBattleStart'][_0xc2271b(0xb7)](this,_0x584c24);if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0xc2271b(0xc6)]()){if('PjWDl'!==_0xc2271b(0xb5))return;else{if(this[_0xc2271b(0x14a)]){this[_0xc2271b(0x14a)]=_0x4269be;return;}_0x36983f['AutoSkillTriggers'][_0xc2271b(0xe0)][_0xc2271b(0xb7)](this);}}this[_0xc2271b(0xc3)](_0xc2271b(0x149)),this[_0xc2271b(0x178)]();},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x130)]=BattleManager[_0x4f2e7b(0x9f)],BattleManager[_0x4f2e7b(0x9f)]=function(){const _0x11ef7a=_0x4f2e7b;VisuMZ[_0x11ef7a(0x113)]['BattleManager_startTurn'][_0x11ef7a(0xb7)](this);if(Imported[_0x11ef7a(0x118)]&&BattleManager[_0x11ef7a(0xc6)]()&&$gameTroop[_0x11ef7a(0x13c)]()===0x1){if(_0x11ef7a(0x172)===_0x11ef7a(0xbc))return!!this['_autoSkillTrigger'];else for(const _0x76c07f of this[_0x11ef7a(0xc7)]()){if(_0x76c07f){if(_0x11ef7a(0x133)!==_0x11ef7a(0xda))_0x76c07f['processAutoSkillTrigger'](_0x11ef7a(0x149)),_0x76c07f[_0x11ef7a(0x178)]();else return![];}}}},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x119)]=Game_BattlerBase[_0x4f2e7b(0x114)][_0x4f2e7b(0x175)],Game_BattlerBase[_0x4f2e7b(0x114)][_0x4f2e7b(0x175)]=function(){const _0x588f61=_0x4f2e7b;VisuMZ[_0x588f61(0x113)]['Game_BattlerBase_revive']['call'](this),this[_0x588f61(0x178)]();},Game_Battler['prototype'][_0x4f2e7b(0x178)]=function(){const _0x577f9e=_0x4f2e7b;this[_0x577f9e(0x16e)]=![],this['_deathAutoSkillTriggerPerformed']=![];},Game_Battler[_0x4f2e7b(0x114)]['processDeathAutoSkillTriggerEffects']=function(){const _0x5b4410=_0x4f2e7b;if(!this[_0x5b4410(0xae)]())return;if(!SceneManager[_0x5b4410(0xb6)]())return;this['_deathAutoSkillTriggerActive']=!![],this[_0x5b4410(0xc3)](_0x5b4410(0xcb));};function _0x164d(_0x48bc93,_0x46334f){const _0x544407=_0x5444();return _0x164d=function(_0x164dce,_0x99f36){_0x164dce=_0x164dce-0x7c;let _0x2d0c16=_0x544407[_0x164dce];return _0x2d0c16;},_0x164d(_0x48bc93,_0x46334f);}function _0x5444(){const _0x187ed3=['_tpbState','170135kpbyNg','hvkgF','FUNC','startTurn','2442319ADPmkI','(?:ITEM\x20%1|ITEM\x20%1)','VisuMZ_2_BattleSystemATB','Game_Actor_makeActions','rKuLj','some','performAutoSkillTriggers','ARRAYEVAL','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','JSON','stripNameTextCodes','returnSavedAutoSkillTriggerActions','NlxKe','isSkill','canMove','stypeId','Friends','constructor','_currentTurn','map','aPuiO','pGwxZ','isSceneBattle','call','forceAutoSkillTrigger','version','6xqKtNG','isAutoSkillTrigger','BzdEW','on%1Guard','_instance','ENEMY','WhYxt','_targets','meetsDeathAutoSkillTrigger','processAutoSkillTrigger','wKmyX','charged','isOTB','allBattleMembers','on%1Item','_subject','VisuMZ_1_SkillsStatesCore','onDeath','length','attackElements','on%1Attack','endAction','constructAutoSkillTrigger','STR','Scene_Boot_onDatabaseLoaded','fIPBC','JhhGD','TARGET','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','FRIENDS','exit','canUse','JygDR','Game_Action_isValid','VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','zPiMe','izmYl','Game_Battler_clearTpbChargeTime','aliveMembers','constructAutoSkillTriggerOTB','BattleManager_checkBattleEnd','isGuard','item','skillTypes','skills','getAutoSkillTriggerElements','Game_Action_applyGlobal','note','requestUpdateTurnOrders','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','EPQJb','1068985IiPJPz','state','_positionDuration','subject','setAutoSkillTrigger','_tpbIdleTime','hasLifeStateAutoLifeEffect','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','parse','filter','in\x20order\x20for\x20VisuMZ_3_AutoSkillTriggers\x20to\x20work.','isBattleSys','isAlive','adjustTurnOrderAutoSkillTrigger','yXoxL','isMagical','max','forceAction','format','VisuMZ_1_BattleCore','isAttack','acting','ONDEATH','CreateNotetags','Target','FRIENDS\x20ONLY','xdHgO','addNewState','Game_Battler_onBattleStart','qTGvZ','_tpbCastTime','pop','2ljHoDZ','amcCv','isCertainHit','UDBgd','on%2Element%1','AutoSkillTriggers','prototype','random','_inBattle','onAllActionsEnd','VisuMZ_2_BattleSystemOTB','Game_BattlerBase_revive','replace','_tpbTurnCount','idleTime','canPerformInputComboSkills','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getSkillTypeNameFromID','isATB','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','applyAutoSkillTriggers','getAutoSkillTriggerSTypes','EVAL','clone','_onBattleWinAutoSkillTriggerOn','checkBattleEnd','BattleSystemOTB','log','_autoTriggerAtbReturn','Game_BattlerBase_addNewState','includes','toUpperCase','isImmortal','ARRAYJSON','BattleManager_startTurn','elementId','ARRAYFUNC','ChVcX','battler','return\x200','_tpbChargeTime','VisuMZ_3_InputComboSkills','isItem','ConvertParams','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','ALLY','turnCount','_scene','HFErE','onBattleWin','232204cngRVw','_autoSkillTrigger','on%1SType%2','NUM','checkDeathAutoSkillTriggerRemoval','on%2SType%1','isEnemy','isActor','ARRAYNUM','onBattleStart','_autoSkillTriggerBypassTpbClear','_savedAutoSkillTriggerActions','Game_Enemy_makeActions','onDatabaseLoaded','USER','trim','ltIyg','Game_Battler_onBattleEnd','_subjectX','Opponents','isValid','match','_actionBattlers','FriendsOnly','Enemy','RegExp','_forceAction','makeActions','otbAddActions','on%1Element%2','friendsUnit','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','9QLQQMw','267236BnInAB','PEkCw','VisuMZ_3_LifeStateEffects','on%1Physical','<AUTO\x20TRIGGER:[\x20]%1>','\x20\x20\x20','_CHANCE','BattleManager_endAction','User','PbxBL','_action','processOnBattleWinAutoSkillTriggers','indexOf','_deathAutoSkillTriggerActive','10ZFYCJE','description','hasDeathTransform','UUSHc','isActiveChainSkillsUiVisible','endActionAutoTriggerATB','revive','applyGlobal','kSRpz','clearDeathAutoSkillTrigger','isAutoSkillTriggerCompatible','_deathAutoSkillTriggerPerformed','_otbTurnOrderWindow','clearTpbChargeTime','Settings','elements','56EgmymG','hasOtbForcedActionAutoSkillBattler','STRUCT','damage','_tpbTurnEnd','ARRAYSTR','532233TTsfOK','on%1Magical','chargeTime','tTivy','FTB','aGffb','onBattleEnd','clear','turnEnd','ETB','VisuMZ_3_ActiveChainSkills','_forcedBattlers','name','xoZyx','constructAutoSkillTriggerATB','Game_Unit_onBattleStart','occasion','process_VisuMZ_AutoSkillTriggers_Notetags','8023476LJggRI','unshift','hasDeathAutoSkillTrigger','status','_preventMakeActionsOtb','isPhysical','_actions','Game_BattlerBase_isImmortal','Aldpr','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','processAutoSkillTriggers','push','on%1Certain','sVVGT','(?:GUARD\x20%1|GUARD\x20%1)','opponentsUnit'];_0x5444=function(){return _0x187ed3;};return _0x5444();}const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x4f2e7b(0x114)][_0x4f2e7b(0x117)];Game_Battler[_0x4f2e7b(0x114)]['onAllActionsEnd']=function(){const _0x309837=_0x4f2e7b;_Game_Battler_onAllActionsEnd_[_0x309837(0xb7)](this),this[_0x309837(0x144)]();},Game_Battler['prototype'][_0x4f2e7b(0x144)]=function(){const _0x538851=_0x4f2e7b;if(!this[_0x538851(0x16e)])return;if(this[_0x538851(0x17a)])return;const _0x20c2ff=BattleManager[_0x538851(0x84)];for(const _0x43f749 of _0x20c2ff){if(!_0x43f749)continue;if(_0x43f749[0x0]===this)return;}this[_0x538851(0x16e)]=![],this[_0x538851(0x17a)]=!![],this['refresh']();if(this[_0x538851(0xfa)]())this[_0x538851(0x178)]();},VisuMZ[_0x4f2e7b(0x113)][_0x4f2e7b(0x88)]=Game_Unit['prototype'][_0x4f2e7b(0x149)],Game_Unit['prototype'][_0x4f2e7b(0x149)]=function(_0x34c061){const _0x2f27db=_0x4f2e7b;VisuMZ[_0x2f27db(0x113)][_0x2f27db(0x88)][_0x2f27db(0xb7)](this,_0x34c061);if(this[_0x2f27db(0xb1)]===Game_Party)this[_0x2f27db(0x126)]=![];},Game_Unit[_0x4f2e7b(0x114)][_0x4f2e7b(0x95)]=function(_0x63ce22,_0x34b830){const _0x38ad0f=_0x4f2e7b;_0x34b830=_0x34b830||null;const _0x1580ea=this[_0x38ad0f(0xe1)]()[_0x38ad0f(0xf7)](_0x20cf35=>_0x20cf35!==_0x34b830);for(const _0x1941d4 of _0x1580ea){if(!_0x1941d4)continue;_0x1941d4['processAutoSkillTrigger'](_0x63ce22);}},Game_Party['prototype'][_0x4f2e7b(0x16c)]=function(){const _0x1d48fa=_0x4f2e7b;if(this['_onBattleWinAutoSkillTriggerOn'])return;this[_0x1d48fa(0x126)]=!![],this[_0x1d48fa(0x95)](_0x1d48fa(0x13f));};Imported['VisuMZ_2_BattleSystemOTB']&&(Window_OTB_TurnOrder[_0x4f2e7b(0x114)][_0x4f2e7b(0xfb)]=function(_0x3ad9a1){const _0x3b36bc=_0x4f2e7b;let _0x47773a=null;for(const _0x2c3e23 of this[_0x3b36bc(0xb2)]){if('sVVGT'!==_0x3b36bc(0x98))this[_0x3b36bc(0xa6)](_0x1341d9,_0x3b36bc(0xb0)),_0x353205!==_0x2d7c30&&this['performAutoSkillTriggers'](_0x20c6c8,'FriendsOnly');else{if(!_0x2c3e23)continue;if(_0x2c3e23[_0x3b36bc(0x134)]()!==_0x3ad9a1)continue;_0x47773a=_0x2c3e23,_0x2c3e23[_0x3b36bc(0xbe)]=_0x2c3e23['_instance']||0x0,_0x2c3e23[_0x3b36bc(0xbe)]++;}}_0x47773a[_0x3b36bc(0xbe)]=0x0,_0x47773a[_0x3b36bc(0xf0)]=0x258,_0x47773a['x']=this[_0x3b36bc(0x152)],this['_currentTurn'][_0x3b36bc(0x8c)](this[_0x3b36bc(0xb2)]['pop']()),this[_0x3b36bc(0xeb)]();});;