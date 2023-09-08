//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.13: September 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: August 18, 2022
 * * Feature Update!
 * ** Regenerate TP functions no longer occur outside of battle. Update made
 *    by Olivia.
 * 
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
 * @default true
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
/*~struct~General:
 *
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
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
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

function _0x22f4(){const _0x33ad0f=['createTpModeWindow','gaugeColor2','subject','FullHp','maxCols','leader','Game_Battler_regenerateTp','GainAllyBuff','useItem','snCEH','applyItemUserEffect','enemy','process_VisuMZ_EnhancedTP_Settings','filter','_tpModes','BattleManager_processDefeat','isItem','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_tpModeCache','TpModeIcon','call','_tpModeWindow','applyItemEnhancedTPEffect','height','floor','availableTpModes','updateEnhancedTp','drawFullGauge','boxWidth','iKpBy','DealMpDmg','makeItemList','NUM','applyGlobal','actor','itemEffectAddDebuff','CustomLabel','TpModeOrder','DealEnemyState','Name','CriticalMp','ConvertParams','TpMode','DealHpDmg','isActor','map','onBattleStart','parse','92fYAdyf','Game_Action_apply','_mp','gJZDr','MpHfT','BattleManager_processVictory','#%1','tpModesCommandIcon','_skillTypeWindow','changeTpCustomColor','\x5cI[%1]%2','mhp','Game_Action_applyGlobal','Scene_Skill_createSkillTypeWindow','TPModes','gaugeColor1','FlashGauge','onChangeTpMode','match','isTpGaugeFlashing','DealAllyBuff','_cache','_tpGaugeBack','name','jqvwA','cNNUH','Game_Actor_setup','FINkP','commandTpMode','OnlyMember','STRUCT','WlmTp','tpModesCommandText','PASJa','MaxFormulaFunc','gradientFillRect','Game_Battler_onBattleStart','tpModeValue','initEnhancedTP','Sprite_Gauge_drawFullGauge','makeCommandList','basic','constructor','Scene_Skill_refreshActor','attackSkillId','description','format','Game_System_initialize','MPoSm','Evasion','_tpGaugeSprite','TakeHpDmg','STR','applyEnhancedTP','trim','CriticalHit','FlashLightness','redraw','create','Game_Action_itemEffectAddDebuff','learnSkill','push','6411006djsvYZ','friendsUnit','inBattle','colSpacing','drawFullGaugeEnhancedTp','includes','setHelpWindow','testApplyEnhancedTP','deathStateId','Game_Action_testApply','setup','FullMp','exit','tpRate','5916138FRzAfF','TakeMpHeal','4863930dFOycN','Game_Battler_addState','126872ueYiGE','registerCommand','prototype','Game_Action_itemEffectAddBuff','addCommand','TpRegen','TakeMpDmg','dRCxI','TpModes','ActorChangeTPMode','GainAllyState','setHelpWindowItem','ARRAYEVAL','DealEnemyDebuff','activate','ShowTpMode','_tp','setFrame','apply','EhNhI','xHzia','1020140bniskZ','tpModeWindowRect','GainEnemyState','updateHelp','refresh','%1Func','tpCostColor','Initial','learnSkillEnhancedTP','toUpperCase','Sprite_Gauge_setup','JvHCZ','setHue','version','JPDLS','AllyHpHeal','onTpModeCancel','aliveMembers','terms','DealHpHeal','ARRAYFUNC','isSkill','YlYEF','selectLast','EVAL','tWSJi','gainTpFromTpMode','_regeneratingTp','Actors','TakeHpHeal','_tpMode_SceneSkill','Window_SkillList_setStypeId','Game_Action_executeMpDamage','value','initialize','FpvYi','addState','MaxFormula','abs','drawGaugeRect','clamp','133953lMoxAV','ipsYp','uWGDL','gaugeRate','GainEnemyDebuff','regenerateTp','drawIcon','deselect','drawItem','CriticalHp','mainAreaHeight','rXHiC','fillRect','setHandler','FleeBattle','KillEnemy','CvDft','isPreserveTp','Window_SkillType_makeCommandList','initTpModes','itemLineRect','remove','General','gaugeBackColor','mmp','TpWindowBgType','bind','changeTpMode','JSON','Preserve','Game_Battler_useItem','hide','GeRVZ','VisuMZ_1_SkillsStatesCore','GlobalTPModes','chargeTpByDamage','critical','tpGaugeFlashSpeed','_helpWindow','cVvda','511ScMErE','JqoRg','addTpModeCommand','drawText','changeBattlerTpLabel','return\x200','Sprite_Gauge_drawGaugeRect','bitmap','success','NqLtJ','evaded','_data','textColor','iconHeight','sortTpModes','oWGhQ','traitObjects','learnTpMode','note','TpModeCmdName','AllyMpHeal','split','AllyMpDmg','processDefeat','ROSvI','_actor','item','DealAllyState','createEnhancedTpChildSprites','Scene_Skill_create','Game_Battler_gainSilentTp','KdYqF','trg','learnAvailablePartyTpModes','_statusWindow','tpModes','DealAllyDebuff','refreshActor','executeMpDamage','PQrhG','uOVlt','tpGaugeFlashLightness','Scene_Boot_onDatabaseLoaded','EnemyChangeTPMode','tLbhx','_availableTpModes','Enemies','GainEnemyBuff','itemEffectAddState','Game_BattlerBase_sparam','onDatabaseLoaded','createTpGaugeBitmaps','icICn','max','WinBattle','Game_Party_initialize','maxTp','Sprite_Gauge_update','GainAllyDebuff','parameters','Icon','getColor','gainSilentTp','KillAlly','UseSkill','Help','yWfTE','ecbdE','setBlendColor','testApply','result','width','_hp','ARRAYSTR','sQoZr','aiEvW','update','defaultTpMode','1936382fkwjuJ','ARRAYSTRUCT','Sprite_Gauge_redraw','show','DefaultTpMode','convertEnhancedTpFunctions','createSkillTypeWindow','showTpModeInSceneSkill','_tpTextSprite','scrollTo','length','DealMpHeal','forceSelect','_battler','guardSkillId','clear','executeHpDamage','BattleManager_onEscapeSuccess','EnhancedTP','processVictory','setStypeId','onTpModeOk','Settings','addChild','learnAvailableActorTpModes','min','setActor','addWindow','SceneSkillTpMode','tpMode','LoseBattle','applyGlobalEnhancedTP','onEscapeSuccess','playEquip','missed','_scene','members','PvcKS','AllyHpDmg','Game_Action_executeHpDamage','_tpMode','Game_Action_applyItemUserEffect','gHlqZ','maxItems','MtTfo','DealEnemyBuff','Game_BattlerBase_maxTp','drawTpMode','redrawEnhancedTp','resetTextColor','MultiplierTCR','UseItem','eQJhr','Game_Actor_learnSkill','DUyby','isTpModeCommandVisible','_statusType'];_0x22f4=function(){return _0x33ad0f;};return _0x22f4();}const _0x27f8b8=_0x45c1;(function(_0x418b74,_0x5839d7){const _0x4e6304=_0x45c1,_0x30229e=_0x418b74();while(!![]){try{const _0x19e559=parseInt(_0x4e6304(0x118))/0x1+-parseInt(_0x4e6304(0x1b7))/0x2+-parseInt(_0x4e6304(0x141))/0x3*(-parseInt(_0x4e6304(0x220))/0x4)+parseInt(_0x4e6304(0x26e))/0x5+-parseInt(_0x4e6304(0x26c))/0x6+-parseInt(_0x4e6304(0x169))/0x7*(parseInt(_0x4e6304(0x270))/0x8)+parseInt(_0x4e6304(0x25e))/0x9;if(_0x19e559===_0x5839d7)break;else _0x30229e['push'](_0x30229e['shift']());}catch(_0x5c6637){_0x30229e['push'](_0x30229e['shift']());}}}(_0x22f4,0x97718));var label=_0x27f8b8(0x1c9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x27f8b8(0x1fd)](function(_0x194266){const _0x23425f=_0x27f8b8;return _0x194266['status']&&_0x194266[_0x23425f(0x24d)][_0x23425f(0x263)]('['+label+']');})[0x0];VisuMZ[label][_0x27f8b8(0x1cd)]=VisuMZ[label][_0x27f8b8(0x1cd)]||{},VisuMZ[_0x27f8b8(0x219)]=function(_0x18d18c,_0x16cfdd){const _0x24e3f0=_0x27f8b8;for(const _0x4aba09 in _0x16cfdd){if(_0x24e3f0(0x143)===_0x24e3f0(0x143)){if(_0x4aba09[_0x24e3f0(0x232)](/(.*):(.*)/i)){const _0xcc9fd7=String(RegExp['$1']),_0x5d9a06=String(RegExp['$2'])['toUpperCase']()[_0x24e3f0(0x256)]();let _0x238a0d,_0x41e014,_0x457242;switch(_0x5d9a06){case _0x24e3f0(0x210):_0x238a0d=_0x16cfdd[_0x4aba09]!==''?Number(_0x16cfdd[_0x4aba09]):0x0;break;case'ARRAYNUM':_0x41e014=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):[],_0x238a0d=_0x41e014[_0x24e3f0(0x21d)](_0x4039c0=>Number(_0x4039c0));break;case _0x24e3f0(0x130):_0x238a0d=_0x16cfdd[_0x4aba09]!==''?eval(_0x16cfdd[_0x4aba09]):null;break;case _0x24e3f0(0x10f):_0x41e014=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):[],_0x238a0d=_0x41e014[_0x24e3f0(0x21d)](_0x193ada=>eval(_0x193ada));break;case _0x24e3f0(0x15d):_0x238a0d=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):'';break;case'ARRAYJSON':_0x41e014=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):[],_0x238a0d=_0x41e014[_0x24e3f0(0x21d)](_0x24e8ab=>JSON[_0x24e3f0(0x21f)](_0x24e8ab));break;case'FUNC':_0x238a0d=_0x16cfdd[_0x4aba09]!==''?new Function(JSON['parse'](_0x16cfdd[_0x4aba09])):new Function(_0x24e3f0(0x16e));break;case _0x24e3f0(0x12c):_0x41e014=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):[],_0x238a0d=_0x41e014[_0x24e3f0(0x21d)](_0x2e4f17=>new Function(JSON[_0x24e3f0(0x21f)](_0x2e4f17)));break;case _0x24e3f0(0x254):_0x238a0d=_0x16cfdd[_0x4aba09]!==''?String(_0x16cfdd[_0x4aba09]):'';break;case _0x24e3f0(0x1b2):_0x41e014=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):[],_0x238a0d=_0x41e014['map'](_0x3f85c6=>String(_0x3f85c6));break;case _0x24e3f0(0x23e):_0x457242=_0x16cfdd[_0x4aba09]!==''?JSON[_0x24e3f0(0x21f)](_0x16cfdd[_0x4aba09]):{},_0x238a0d=VisuMZ['ConvertParams']({},_0x457242);break;case _0x24e3f0(0x1b8):_0x41e014=_0x16cfdd[_0x4aba09]!==''?JSON['parse'](_0x16cfdd[_0x4aba09]):[],_0x238a0d=_0x41e014['map'](_0xa8c676=>VisuMZ[_0x24e3f0(0x219)]({},JSON[_0x24e3f0(0x21f)](_0xa8c676)));break;default:continue;}_0x18d18c[_0xcc9fd7]=_0x238a0d;}}else for(const _0x89711c of _0x4a0687[_0x24e3f0(0x18c)]()){this[_0x24e3f0(0x17a)](_0x89711c[_0x24e3f0(0x121)]()[_0x24e3f0(0x256)]());}}return _0x18d18c;},(_0x7dd62a=>{const _0x16baec=_0x27f8b8,_0x2850df=_0x7dd62a[_0x16baec(0x237)];for(const _0x4c5b7a of dependencies){if(_0x16baec(0x1e1)!==_0x16baec(0x1e3)){if(!Imported[_0x4c5b7a]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x16baec(0x24e)](_0x2850df,_0x4c5b7a)),SceneManager[_0x16baec(0x26a)]();break;}}else _0x5f5c6d[_0x16baec(0x132)](_0x16baec(0x109),_0x3a844b,_0x5e4be0),_0xeecec4[_0x16baec(0x132)]('DealMpDmg',_0x3712f4,_0x4c4f47),_0x159dc3['friendsUnit']()[_0x16baec(0x132)]('AllyMpDmg',_0x54d155,_0xf5d149);}const _0x92e17b=_0x7dd62a[_0x16baec(0x24d)];if(_0x92e17b[_0x16baec(0x232)](/\[Version[ ](.*?)\]/i)){const _0x55ccb9=Number(RegExp['$1']);_0x55ccb9!==VisuMZ[label][_0x16baec(0x125)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x16baec(0x24e)](_0x2850df,_0x55ccb9)),SceneManager['exit']());}if(_0x92e17b[_0x16baec(0x232)](/\[Tier[ ](\d+)\]/i)){const _0x1d7212=Number(RegExp['$1']);_0x1d7212<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x16baec(0x24e)](_0x2850df,_0x1d7212,tier)),SceneManager[_0x16baec(0x26a)]()):tier=Math[_0x16baec(0x19e)](_0x1d7212,tier);}VisuMZ[_0x16baec(0x219)](VisuMZ[label][_0x16baec(0x1cd)],_0x7dd62a[_0x16baec(0x1a4)]);})(pluginData),PluginManager[_0x27f8b8(0x271)](pluginData[_0x27f8b8(0x237)],_0x27f8b8(0x10c),_0x27f70f=>{const _0x4684c5=_0x27f8b8;VisuMZ[_0x4684c5(0x219)](_0x27f70f,_0x27f70f);const _0x1487c6=_0x27f70f[_0x4684c5(0x134)][_0x4684c5(0x21d)](_0x4dc5a9=>$gameActors[_0x4684c5(0x212)](_0x4dc5a9))[_0x4684c5(0x156)](null),_0x47a78b=_0x27f70f['TPModeName'];for(const _0x595e37 of _0x1487c6){if(_0x4684c5(0x13b)!==_0x4684c5(0x13b))this[_0x4684c5(0x202)]=_0x4e3ead,this[_0x4684c5(0x259)]();else{if(!_0x595e37)continue;_0x595e37[_0x4684c5(0x15c)](_0x47a78b);}}}),PluginManager[_0x27f8b8(0x271)](pluginData[_0x27f8b8(0x237)],'ActorUnlockTPMode',_0x552df9=>{const _0x138606=_0x27f8b8;VisuMZ['ConvertParams'](_0x552df9,_0x552df9);const _0x1311c9=_0x552df9[_0x138606(0x134)][_0x138606(0x21d)](_0x36f333=>$gameActors[_0x138606(0x212)](_0x36f333))[_0x138606(0x156)](null),_0x27f8e6=_0x552df9[_0x138606(0x22e)];for(const _0x49f7ff of _0x1311c9){if(!_0x49f7ff)continue;for(const _0xb926d of _0x27f8e6){_0x49f7ff[_0x138606(0x17a)](_0xb926d);}}}),PluginManager[_0x27f8b8(0x271)](pluginData['name'],'ActorUnlockAllTPModes',_0xff86ed=>{const _0x205a11=_0x27f8b8;VisuMZ[_0x205a11(0x219)](_0xff86ed,_0xff86ed);const _0x219707=_0xff86ed[_0x205a11(0x134)]['map'](_0x1671de=>$gameActors[_0x205a11(0x212)](_0x1671de))[_0x205a11(0x156)](null),_0x81d996=VisuMZ['EnhancedTP'][_0x205a11(0x215)];for(const _0x4d3298 of _0x219707){if(!_0x4d3298)continue;for(const _0x201cc2 of _0x81d996){_0x4d3298[_0x205a11(0x17a)](_0x201cc2);}}}),PluginManager['registerCommand'](pluginData[_0x27f8b8(0x237)],_0x27f8b8(0x194),_0x586fba=>{const _0x5c749c=_0x27f8b8;VisuMZ['ConvertParams'](_0x586fba,_0x586fba);const _0x3023a6=_0x586fba[_0x5c749c(0x197)][_0x5c749c(0x21d)](_0x123841=>$gameTroop[_0x5c749c(0x1db)]()[_0x123841])[_0x5c749c(0x156)](null),_0x179f6c=_0x586fba['TPModeName'];for(const _0x1c0b3c of _0x3023a6){if(_0x5c749c(0x126)===_0x5c749c(0x126)){if(!_0x1c0b3c)continue;_0x1c0b3c['changeTpMode'](_0x179f6c);}else{const _0x7d8980=_0x335ab7[_0x5c749c(0x1af)]();_0x7d8980[_0x5c749c(0x165)]&&this[_0x5c749c(0x1f2)]()['gainTpFromTpMode']('CriticalHit',_0xa93818,0x0),(_0x7d8980[_0x5c749c(0x173)]||_0x7d8980[_0x5c749c(0x1d9)])&&_0x21e605['gainTpFromTpMode']('Evasion',_0x8207bb,0x0);}}}),PluginManager[_0x27f8b8(0x271)](pluginData[_0x27f8b8(0x237)],_0x27f8b8(0x1d3),_0x461858=>{const _0x1960db=_0x27f8b8;VisuMZ[_0x1960db(0x219)](_0x461858,_0x461858),$gameSystem['setTpModeInSceneSkill'](_0x461858['Show']);}),VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x193)]=Scene_Boot[_0x27f8b8(0x105)][_0x27f8b8(0x19b)],Scene_Boot[_0x27f8b8(0x105)][_0x27f8b8(0x19b)]=function(){const _0x2590df=_0x27f8b8;VisuMZ[_0x2590df(0x1c9)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x2590df(0x1fc)]();},Scene_Boot[_0x27f8b8(0x105)][_0x27f8b8(0x1fc)]=function(){const _0x21bac4=_0x27f8b8;VisuMZ[_0x21bac4(0x1c9)][_0x21bac4(0x10b)]={},VisuMZ[_0x21bac4(0x1c9)][_0x21bac4(0x215)]=[];for(const _0x36c9a0 of VisuMZ[_0x21bac4(0x1c9)][_0x21bac4(0x1cd)][_0x21bac4(0x21a)]){if(!_0x36c9a0)continue;_0x36c9a0['description']=_0x36c9a0[_0x21bac4(0x1aa)]['format'](TextManager['tp']),this[_0x21bac4(0x1bc)](_0x36c9a0);const _0x28f340=_0x36c9a0[_0x21bac4(0x217)][_0x21bac4(0x121)]()[_0x21bac4(0x256)]();VisuMZ[_0x21bac4(0x1c9)][_0x21bac4(0x10b)][_0x28f340]=_0x36c9a0,VisuMZ[_0x21bac4(0x1c9)][_0x21bac4(0x215)][_0x21bac4(0x25d)](_0x28f340);}},Scene_Boot[_0x27f8b8(0x105)][_0x27f8b8(0x1bc)]=function(_0x10ab94){const _0x53b202=_0x27f8b8,_0x1757f2=[_0x53b202(0x13d),_0x53b202(0x11f),_0x53b202(0x257),'Evasion',_0x53b202(0x1ea),_0x53b202(0x1a9),_0x53b202(0x108),_0x53b202(0x14a),_0x53b202(0x1f3),_0x53b202(0x218),'FullMp',_0x53b202(0x23d),_0x53b202(0x253),_0x53b202(0x21b),_0x53b202(0x1dd),_0x53b202(0x135),_0x53b202(0x12b),_0x53b202(0x127),'TakeMpDmg',_0x53b202(0x20e),'AllyMpDmg','TakeMpHeal',_0x53b202(0x1c2),_0x53b202(0x17d),_0x53b202(0x234),_0x53b202(0x1e4),_0x53b202(0x1f7),_0x53b202(0x198),_0x53b202(0x18d),_0x53b202(0x110),'GainAllyDebuff','GainEnemyDebuff',_0x53b202(0x184),'DealEnemyState','GainAllyState',_0x53b202(0x11a),_0x53b202(0x1a8),_0x53b202(0x150),_0x53b202(0x19f),_0x53b202(0x14f),_0x53b202(0x1d5)];for(const _0xdbec46 of _0x1757f2){if(_0x53b202(0x190)===_0x53b202(0x1b3)){if(this['tpMode']())return _0x381840[_0x53b202(0x208)](this[_0x53b202(0x1d4)]()[_0x53b202(0x242)](this,this,0x0));return _0x117041[_0x53b202(0x1c9)][_0x53b202(0x1e5)]['call'](this);}else{const _0x5eab2a=_0x53b202(0x201)[_0x53b202(0x24e)](_0x10ab94[_0xdbec46]);_0x10ab94[_0x53b202(0x11d)[_0x53b202(0x24e)](_0xdbec46)]=new Function('user','target',_0x53b202(0x139),_0x5eab2a);}}},TextManager[_0x27f8b8(0x240)]=VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1cd)][_0x27f8b8(0x157)][_0x27f8b8(0x17c)],ColorManager[_0x27f8b8(0x1a6)]=function(_0x1a7ed2){const _0x2c15d6=_0x27f8b8;return _0x1a7ed2=String(_0x1a7ed2),_0x1a7ed2[_0x2c15d6(0x232)](/#(.*)/i)?_0x2c15d6(0x226)[_0x2c15d6(0x24e)](String(RegExp['$1'])):this[_0x2c15d6(0x175)](Number(_0x1a7ed2));},ImageManager[_0x27f8b8(0x227)]=VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1cd)][_0x27f8b8(0x157)][_0x27f8b8(0x203)],VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x225)]=BattleManager[_0x27f8b8(0x1ca)],BattleManager[_0x27f8b8(0x1ca)]=function(){const _0x34dd0a=_0x27f8b8;VisuMZ[_0x34dd0a(0x1c9)][_0x34dd0a(0x225)][_0x34dd0a(0x204)](this),$gameParty[_0x34dd0a(0x132)]('WinBattle',$gameParty[_0x34dd0a(0x1f5)](),0x0);},VisuMZ['EnhancedTP']['BattleManager_onEscapeSuccess']=BattleManager['onEscapeSuccess'],BattleManager[_0x27f8b8(0x1d7)]=function(){const _0x49bb18=_0x27f8b8;VisuMZ[_0x49bb18(0x1c9)][_0x49bb18(0x1c8)][_0x49bb18(0x204)](this),$gameParty['gainTpFromTpMode'](_0x49bb18(0x14f),$gameParty[_0x49bb18(0x1f5)](),0x0);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1ff)]=BattleManager[_0x27f8b8(0x180)],BattleManager[_0x27f8b8(0x180)]=function(){const _0xc2e880=_0x27f8b8;VisuMZ['EnhancedTP'][_0xc2e880(0x1ff)][_0xc2e880(0x204)](this),$gameParty[_0xc2e880(0x132)](_0xc2e880(0x1d5),$gameParty['leader'](),0x0);},VisuMZ[_0x27f8b8(0x1c9)]['Game_System_initialize']=Game_System[_0x27f8b8(0x105)][_0x27f8b8(0x13a)],Game_System[_0x27f8b8(0x105)][_0x27f8b8(0x13a)]=function(){const _0x5a968d=_0x27f8b8;VisuMZ['EnhancedTP'][_0x5a968d(0x24f)][_0x5a968d(0x204)](this),this[_0x5a968d(0x246)]();},Game_System[_0x27f8b8(0x105)][_0x27f8b8(0x246)]=function(){const _0x52682f=_0x27f8b8;this['_tpMode_SceneSkill']=VisuMZ[_0x52682f(0x1c9)]['Settings'][_0x52682f(0x157)][_0x52682f(0x112)];},Game_System[_0x27f8b8(0x105)][_0x27f8b8(0x1be)]=function(){const _0x1331f8=_0x27f8b8;if(this['_tpMode_SceneSkill']===undefined)this[_0x1331f8(0x246)]();return this['_tpMode_SceneSkill'];},Game_System[_0x27f8b8(0x105)]['setTpModeInSceneSkill']=function(_0x1f54ae){const _0x45c654=_0x27f8b8;if(this[_0x45c654(0x136)]===undefined)this[_0x45c654(0x246)]();this['_tpMode_SceneSkill']=_0x1f54ae;},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x221)]=Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x115)],Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x115)]=function(_0x22b260){const _0x10f603=_0x27f8b8;VisuMZ[_0x10f603(0x1c9)][_0x10f603(0x221)][_0x10f603(0x204)](this,_0x22b260),this[_0x10f603(0x255)](_0x22b260);},Game_Action['prototype'][_0x27f8b8(0x255)]=function(_0x588c39){const _0xf37f5=_0x27f8b8,_0x335a69=_0x588c39[_0xf37f5(0x1af)]();_0x335a69[_0xf37f5(0x165)]&&('oWGhQ'===_0xf37f5(0x178)?this[_0xf37f5(0x1f2)]()['gainTpFromTpMode'](_0xf37f5(0x257),_0x588c39,0x0):(!this[_0xf37f5(0x236)][_0xf37f5(0x170)]&&(this[_0xf37f5(0x236)]['bitmap']=new _0x35265e(this[_0xf37f5(0x170)][_0xf37f5(0x1b0)],this[_0xf37f5(0x170)][_0xf37f5(0x207)])),!this['_tpGaugeSprite'][_0xf37f5(0x170)]&&(this[_0xf37f5(0x252)][_0xf37f5(0x170)]=new _0x563cbe(this['bitmap'][_0xf37f5(0x1b0)],this['bitmap']['height'])),_0x23d106&&(this[_0xf37f5(0x236)][_0xf37f5(0x170)][_0xf37f5(0x1c6)](),this[_0xf37f5(0x252)][_0xf37f5(0x170)][_0xf37f5(0x1c6)]()))),(_0x335a69[_0xf37f5(0x173)]||_0x335a69[_0xf37f5(0x1d9)])&&_0x588c39[_0xf37f5(0x132)](_0xf37f5(0x251),_0x588c39,0x0);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1de)]=Game_Action['prototype']['executeHpDamage'],Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x1c7)]=function(_0x4c33d8,_0x2ab813){const _0x26210f=_0x27f8b8;VisuMZ[_0x26210f(0x1c9)][_0x26210f(0x1de)][_0x26210f(0x204)](this,_0x4c33d8,_0x2ab813);const _0x19fe36=this[_0x26210f(0x1f2)]();_0x2ab813>0x0?_0x26210f(0x116)!==_0x26210f(0x116)?(_0x3d34ac['EnhancedTP'][_0x26210f(0x1ff)][_0x26210f(0x204)](this),_0x37cc50[_0x26210f(0x132)]('LoseBattle',_0x3284ac[_0x26210f(0x1f5)](),0x0)):(_0x4c33d8[_0x26210f(0x132)]('TakeHpDmg',_0x4c33d8,_0x2ab813),_0x19fe36[_0x26210f(0x132)](_0x26210f(0x21b),_0x4c33d8,_0x2ab813),_0x4c33d8[_0x26210f(0x25f)]()[_0x26210f(0x132)](_0x26210f(0x1dd),_0x4c33d8,_0x2ab813)):(_0x2ab813=Math[_0x26210f(0x13e)](_0x2ab813),_0x4c33d8['gainTpFromTpMode']('TakeHpHeal',_0x4c33d8,_0x2ab813),_0x19fe36[_0x26210f(0x132)]('DealHpHeal',_0x4c33d8,_0x2ab813),_0x4c33d8[_0x26210f(0x25f)]()[_0x26210f(0x132)](_0x26210f(0x127),_0x4c33d8,_0x2ab813));},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x138)]=Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x18f)],Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x18f)]=function(_0x17461b,_0x18878b){const _0x2005c5=_0x27f8b8;VisuMZ['EnhancedTP'][_0x2005c5(0x138)][_0x2005c5(0x204)](this,_0x17461b,_0x18878b);const _0x2662d5=this[_0x2005c5(0x1f2)]();if(_0x18878b>0x0)_0x17461b['gainTpFromTpMode'](_0x2005c5(0x109),_0x17461b,_0x18878b),_0x2662d5['gainTpFromTpMode'](_0x2005c5(0x20e),_0x17461b,_0x18878b),_0x17461b['friendsUnit']()[_0x2005c5(0x132)](_0x2005c5(0x17f),_0x17461b,_0x18878b);else{if(_0x2005c5(0x224)!==_0x2005c5(0x224)){if(!this['isTpModeCommandVisible']())return;let _0x36e27f=_0xd916b3[_0x2005c5(0x240)][_0x2005c5(0x24e)](_0x113984['tp']);_0x50865b[_0x2005c5(0x162)]&&(_0x36e27f=_0x2005c5(0x22a)['format'](_0x50c1aa[_0x2005c5(0x227)],_0x36e27f)),this[_0x2005c5(0x107)](_0x36e27f,_0x2005c5(0x1d4),!![],_0x2005c5(0x1d4));}else _0x18878b=Math['abs'](_0x18878b),_0x17461b['gainTpFromTpMode'](_0x2005c5(0x26d),_0x17461b,_0x18878b),_0x2662d5['gainTpFromTpMode']('DealMpHeal',_0x17461b,_0x18878b),_0x17461b[_0x2005c5(0x25f)]()[_0x2005c5(0x132)]('AllyMpHeal',_0x17461b,_0x18878b);}},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x106)]=Game_Action[_0x27f8b8(0x105)]['itemEffectAddBuff'],Game_Action['prototype']['itemEffectAddBuff']=function(_0x26c5ae,_0x192437){const _0x69a01d=_0x27f8b8;VisuMZ[_0x69a01d(0x1c9)]['Game_Action_itemEffectAddBuff']['call'](this,_0x26c5ae,_0x192437);if(!_0x26c5ae['result']()['success'])return;const _0x56df4c=this[_0x69a01d(0x1f2)]();_0x56df4c[_0x69a01d(0x21c)]()===_0x26c5ae[_0x69a01d(0x21c)]()?(_0x56df4c[_0x69a01d(0x132)](_0x69a01d(0x234),_0x26c5ae,0x0),_0x26c5ae[_0x69a01d(0x132)](_0x69a01d(0x1f7),_0x26c5ae,0x0)):(_0x56df4c[_0x69a01d(0x132)]('DealEnemyBuff',_0x26c5ae,0x0),_0x26c5ae['gainTpFromTpMode']('GainEnemyBuff',_0x26c5ae,0x0));},VisuMZ[_0x27f8b8(0x1c9)]['Game_Action_itemEffectAddDebuff']=Game_Action['prototype'][_0x27f8b8(0x213)],Game_Action['prototype'][_0x27f8b8(0x213)]=function(_0x21a669,_0x3b9a88){const _0x182257=_0x27f8b8;VisuMZ[_0x182257(0x1c9)][_0x182257(0x25b)][_0x182257(0x204)](this,_0x21a669,_0x3b9a88);if(!_0x21a669[_0x182257(0x1af)]()[_0x182257(0x171)])return;const _0xa34762=this[_0x182257(0x1f2)]();if(_0xa34762[_0x182257(0x21c)]()===_0x21a669[_0x182257(0x21c)]()){if('GGWtX'===_0x182257(0x14c))for(const _0x15d7a8 of _0x319e8b){_0x15d7a8[_0x182257(0x232)](/<UNLOCK TP MODE: (.*)>/i),_0x526ceb['learnTpMode'](_0x4712f2(_0x3ca975['$1']));}else _0xa34762['gainTpFromTpMode'](_0x182257(0x18d),_0x21a669,0x0),_0x21a669[_0x182257(0x132)](_0x182257(0x1a3),_0x21a669,0x0);}else _0xa34762['gainTpFromTpMode']('DealEnemyDebuff',_0x21a669,0x0),_0x21a669[_0x182257(0x132)](_0x182257(0x145),_0x21a669,0x0);},VisuMZ[_0x27f8b8(0x1c9)]['Game_Action_itemEffectAddState']=Game_Action[_0x27f8b8(0x105)]['itemEffectAddState'],Game_Action['prototype'][_0x27f8b8(0x199)]=function(_0x3346c2,_0x19c2b4){const _0x4cfce7=_0x27f8b8,_0x5c4282=_0x3346c2[_0x4cfce7(0x1af)]()[_0x4cfce7(0x171)];_0x3346c2[_0x4cfce7(0x1af)]()[_0x4cfce7(0x171)]=![],VisuMZ[_0x4cfce7(0x1c9)]['Game_Action_itemEffectAddState'][_0x4cfce7(0x204)](this,_0x3346c2,_0x19c2b4);if(!_0x3346c2[_0x4cfce7(0x1af)]()['success']){if(_0x4cfce7(0x1eb)!=='eQJhr')_0xf946ec*=this[_0x4cfce7(0x1d4)]()[_0x4cfce7(0x1e9)];else{_0x3346c2[_0x4cfce7(0x1af)]()['success']=_0x5c4282;return;}}const _0x522d28=this[_0x4cfce7(0x1f2)]();if(_0x522d28[_0x4cfce7(0x21c)]()===_0x3346c2['isActor']()){if('UWbZB'===_0x4cfce7(0x188)){if(!this[_0x4cfce7(0x1c4)])return _0x42f5f1;const _0x360670=this[_0x4cfce7(0x1c4)][_0x4cfce7(0x1d4)](),_0x23a8c9='CustomColor%1'['format'](_0x16d993);return _0x360670[_0x23a8c9]?_0x9323ed['getColor'](_0x360670[_0x23a8c9]):_0x37615a;}else _0x522d28[_0x4cfce7(0x132)](_0x4cfce7(0x184),_0x3346c2,0x0),_0x3346c2[_0x4cfce7(0x132)](_0x4cfce7(0x10d),_0x3346c2,0x0);}else _0x522d28['gainTpFromTpMode'](_0x4cfce7(0x216),_0x3346c2,0x0),_0x3346c2[_0x4cfce7(0x132)](_0x4cfce7(0x11a),_0x3346c2,0x0);},VisuMZ['EnhancedTP'][_0x27f8b8(0x1e0)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x1fa)]=function(_0x485b79){const _0x45278b=_0x27f8b8;VisuMZ[_0x45278b(0x1c9)][_0x45278b(0x1e0)][_0x45278b(0x204)](this,_0x485b79),this[_0x45278b(0x206)](_0x485b79);},Game_Action['prototype'][_0x27f8b8(0x206)]=function(_0x6d1a8){const _0x25dfd9=_0x27f8b8;if(!_0x6d1a8)return;const _0x1873aa=this['item']()[_0x25dfd9(0x17b)],_0x44b4d1=this[_0x25dfd9(0x1f2)]();_0x1873aa[_0x25dfd9(0x232)](/<CHANGE TARGET TP MODE: (.*)>/i)&&(_0x25dfd9(0x191)!==_0x25dfd9(0x191)?(_0x46e853[_0x25dfd9(0x1c9)][_0x25dfd9(0x22c)][_0x25dfd9(0x204)](this),this[_0x25dfd9(0x1d6)]()):_0x6d1a8[_0x25dfd9(0x15c)](String(RegExp['$1'])));if(!_0x6d1a8[_0x25dfd9(0x21c)]())return;const _0x4e07a0=_0x1873aa[_0x25dfd9(0x232)](/<UNLOCK TP MODE: (.*)>/gi);if(_0x4e07a0){if(_0x25dfd9(0x12e)===_0x25dfd9(0x195)){_0x962b0f['EnhancedTP'][_0x25dfd9(0x1de)][_0x25dfd9(0x204)](this,_0x57c638,_0x2fedf7);const _0x438712=this[_0x25dfd9(0x1f2)]();_0x408a0c>0x0?(_0x3e17d6[_0x25dfd9(0x132)]('TakeHpDmg',_0x341b27,_0x186e12),_0x438712[_0x25dfd9(0x132)]('DealHpDmg',_0x6b23ec,_0x4827b6),_0x590a17[_0x25dfd9(0x25f)]()[_0x25dfd9(0x132)](_0x25dfd9(0x1dd),_0x2add25,_0x2919f6)):(_0x3a2c37=_0x408be8[_0x25dfd9(0x13e)](_0x44ff49),_0x4edb4b[_0x25dfd9(0x132)]('TakeHpHeal',_0x171be9,_0xb0d8df),_0x438712[_0x25dfd9(0x132)](_0x25dfd9(0x12b),_0x2dcfc8,_0x432fec),_0x44e482[_0x25dfd9(0x25f)]()['gainTpFromTpMode'](_0x25dfd9(0x127),_0x19e43e,_0x43d9ce));}else for(const _0x1b0466 of _0x4e07a0){_0x1b0466[_0x25dfd9(0x232)](/<UNLOCK TP MODE: (.*)>/i),_0x6d1a8[_0x25dfd9(0x17a)](String(RegExp['$1']));}}if(_0x1873aa[_0x25dfd9(0x232)](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0x427840=String(RegExp['$1'])[_0x25dfd9(0x17e)](/[\r\n]+/);for(const _0x1b335d of _0x427840){_0x25dfd9(0x172)!==_0x25dfd9(0x16a)?_0x6d1a8[_0x25dfd9(0x17a)](_0x1b335d):(_0x4d96fe['EnhancedTP'][_0x25dfd9(0x225)][_0x25dfd9(0x204)](this),_0x353c55[_0x25dfd9(0x132)](_0x25dfd9(0x19f),_0x51e1e7['leader'](),0x0));}}},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x22c)]=Game_Action['prototype']['applyGlobal'],Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x211)]=function(){const _0x4318a0=_0x27f8b8;VisuMZ[_0x4318a0(0x1c9)]['Game_Action_applyGlobal'][_0x4318a0(0x204)](this),this[_0x4318a0(0x1d6)]();},Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x1d6)]=function(){const _0x4aa88a=_0x27f8b8,_0x1a399d=this['item']()[_0x4aa88a(0x17b)],_0x22b2f6=this[_0x4aa88a(0x1f2)]();_0x1a399d[_0x4aa88a(0x232)](/<CHANGE USER TP MODE: (.*)>/i)&&('ZTwfe'!=='ZTwfe'?this[_0x4aa88a(0x132)](_0x4aa88a(0x1ea),this,0x0):_0x22b2f6[_0x4aa88a(0x15c)](String(RegExp['$1'])));},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x267)]=Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x1ae)],Game_Action[_0x27f8b8(0x105)][_0x27f8b8(0x1ae)]=function(_0x3f084f){const _0x4e443a=_0x27f8b8;if(this[_0x4e443a(0x265)](_0x3f084f)){if(_0x4e443a(0x23b)!==_0x4e443a(0x23b))this['learnTpMode'](_0x2d7b2f[_0x4e443a(0x121)]()['trim']());else return!![];}return VisuMZ[_0x4e443a(0x1c9)][_0x4e443a(0x267)]['call'](this,_0x3f084f);},Game_Action['prototype']['testApplyEnhancedTP']=function(_0x519bb1){const _0x29d468=_0x27f8b8;if(!this[_0x29d468(0x183)]())return![];const _0x55bef0=this[_0x29d468(0x183)]()['note'],_0x406581=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x4a4da3 of _0x406581){if(_0x55bef0[_0x29d468(0x232)](_0x4a4da3))return!![];}return![];},Game_BattlerBase[_0x27f8b8(0x105)]['initEnhancedTP']=function(){this['changeTpMode'](this['defaultTpMode']());},Game_BattlerBase[_0x27f8b8(0x105)]['changeTpMode']=function(_0xccb5b6){const _0x4e0b8b=_0x27f8b8;_0xccb5b6=_0xccb5b6[_0x4e0b8b(0x121)]()[_0x4e0b8b(0x256)]();if(!VisuMZ[_0x4e0b8b(0x1c9)][_0x4e0b8b(0x10b)][_0xccb5b6])return;this[_0x4e0b8b(0x1df)]=_0xccb5b6,this[_0x4e0b8b(0x231)](_0xccb5b6);},Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x1b6)]=function(){const _0x33fc1a=_0x27f8b8;return VisuMZ['EnhancedTP']['Settings']['General'][_0x33fc1a(0x1bb)]['toUpperCase']()[_0x33fc1a(0x256)]();},Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x1d4)]=function(){const _0x14bec0=_0x27f8b8;if(this[_0x14bec0(0x1df)]===undefined)this[_0x14bec0(0x246)]();let _0x585ae4=this[_0x14bec0(0x1df)];for(const _0x13a586 of this[_0x14bec0(0x179)]()){if(!_0x13a586)continue;if(_0x13a586[_0x14bec0(0x17b)][_0x14bec0(0x232)](/<FORCE TP MODE: (.*)>/i)){if('GcIhs'==='GcIhs'){const _0x318b9e=String(RegExp['$1'])[_0x14bec0(0x121)]()['trim']();if(!VisuMZ[_0x14bec0(0x1c9)][_0x14bec0(0x10b)][_0x318b9e])continue;_0x585ae4=_0x318b9e;break;}else _0x5351ac[_0x14bec0(0x132)](_0x14bec0(0x18d),_0x99b26e,0x0),_0x55eb6f[_0x14bec0(0x132)](_0x14bec0(0x1a3),_0x53f749,0x0);}}return VisuMZ[_0x14bec0(0x1c9)][_0x14bec0(0x10b)][_0x585ae4['toUpperCase']()['trim']()];},Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x245)]=function(_0x1a7c35,_0x2e8d2c,_0x4f349a){const _0x1dac23=_0x27f8b8,_0x5eaff5=this['tpMode']();if(!_0x5eaff5)return 0x0;_0x1a7c35='%1Func'[_0x1dac23(0x24e)](_0x1a7c35);if(!_0x5eaff5[_0x1a7c35])return 0x0;return _0x5eaff5[_0x1a7c35](this,_0x2e8d2c,_0x4f349a);},VisuMZ['EnhancedTP'][_0x27f8b8(0x187)]=Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x1a7)],Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x1a7)]=function(_0x55e35b){const _0x374f43=_0x27f8b8;this[_0x374f43(0x133)]?this[_0x374f43(0x113)]=(this[_0x374f43(0x113)]+_0x55e35b)['clamp'](0x0,this[_0x374f43(0x1a1)]()):VisuMZ[_0x374f43(0x1c9)]['Game_Battler_gainSilentTp'][_0x374f43(0x204)](this,_0x55e35b);},Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x132)]=function(_0x356a12,_0x5837e0,_0xc9b328){const _0x701d97=_0x27f8b8,_0xb833fc=Math['floor'](this[_0x701d97(0x245)](_0x356a12,_0x5837e0,_0xc9b328));this[_0x701d97(0x1a7)](_0xb833fc);},VisuMZ[_0x27f8b8(0x1c9)]['Game_BattlerBase_maxTp']=Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x1a1)],Game_BattlerBase[_0x27f8b8(0x105)]['maxTp']=function(){const _0x5dfb38=_0x27f8b8;if(this[_0x5dfb38(0x1d4)]())return Math['floor'](this[_0x5dfb38(0x1d4)]()['MaxFormulaFunc'](this,this,0x0));return VisuMZ['EnhancedTP'][_0x5dfb38(0x1e5)][_0x5dfb38(0x204)](this);},VisuMZ[_0x27f8b8(0x1c9)]['Game_BattlerBase_isPreserveTp']=Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x152)],Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x152)]=function(){const _0x3c7154=_0x27f8b8;if(this[_0x3c7154(0x1d4)]())return this['tpMode']()[_0x3c7154(0x15e)];return VisuMZ[_0x3c7154(0x1c9)]['Game_BattlerBase_isPreserveTp']['call'](this);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x19a)]=Game_BattlerBase[_0x27f8b8(0x105)]['sparam'],Game_BattlerBase['prototype']['sparam']=function(_0x4c1c1d){const _0x257aa1=_0x27f8b8;let _0x4f2466=VisuMZ[_0x257aa1(0x1c9)][_0x257aa1(0x19a)]['call'](this,_0x4c1c1d);return _0x4c1c1d===0x5&&this[_0x257aa1(0x1d4)]()&&(_0x4f2466*=this[_0x257aa1(0x1d4)]()[_0x257aa1(0x1e9)]),_0x4f2466;},Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x233)]=function(){const _0x194015=_0x27f8b8;if(!Imported[_0x194015(0x162)])return![];const _0x158133=this[_0x194015(0x1d4)]();if(!_0x158133)return![];if(!_0x158133[_0x194015(0x230)])return![];const _0x8c8e62=_0x158133['FlashRequirement']||0x0;return this[_0x194015(0x26b)]()>=_0x8c8e62;},Game_BattlerBase['prototype'][_0x27f8b8(0x166)]=function(){const _0x50a17e=_0x27f8b8,_0x34a2c4=this[_0x50a17e(0x1d4)]();if(!_0x34a2c4)return![];return(_0x34a2c4['FlashSpeed']||0x1)[_0x50a17e(0x140)](0x1,0xff);},Game_BattlerBase[_0x27f8b8(0x105)][_0x27f8b8(0x192)]=function(){const _0x38f520=_0x27f8b8,_0x1c4846=this[_0x38f520(0x1d4)]();if(!_0x1c4846)return![];return(_0x1c4846[_0x38f520(0x258)]||0x0)[_0x38f520(0x140)](0x0,0xff);},Game_Battler[_0x27f8b8(0x105)]['initTp']=function(){},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x244)]=Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x21e)],Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x21e)]=function(_0x2e2eae){const _0x5b2517=_0x27f8b8;VisuMZ[_0x5b2517(0x1c9)]['Game_Battler_onBattleStart'][_0x5b2517(0x204)](this,_0x2e2eae),this['gainTpFromTpMode'](_0x5b2517(0x11f),this,0x0);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x15f)]=Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x1f8)],Game_Battler['prototype'][_0x27f8b8(0x1f8)]=function(_0x1ef6d1){const _0x3e9251=_0x27f8b8;VisuMZ['EnhancedTP'][_0x3e9251(0x15f)][_0x3e9251(0x204)](this,_0x1ef6d1);if(this['skillIsNotAttackGuard'](_0x1ef6d1)){if(_0x3e9251(0x142)===_0x3e9251(0x1ac)){if(!this['_battler'])return;const _0x44c0b4=this['_battler'][_0x3e9251(0x1d4)]();_0x44c0b4[_0x3e9251(0x214)]&&(_0x29f9f3[_0x3e9251(0x12a)]['basic'][0x7]=_0x44c0b4['CustomLabel']['trim']());}else this[_0x3e9251(0x132)](_0x3e9251(0x1a9),this,0x0);}DataManager[_0x3e9251(0x200)](_0x1ef6d1)&&(_0x3e9251(0x19d)!==_0x3e9251(0x168)?this[_0x3e9251(0x132)](_0x3e9251(0x1ea),this,0x0):this[_0x3e9251(0x136)]=_0x209a05[_0x3e9251(0x1c9)]['Settings'][_0x3e9251(0x157)][_0x3e9251(0x112)]);},Game_Battler[_0x27f8b8(0x105)]['skillIsNotAttackGuard']=function(_0x8ec3ed){const _0x407625=_0x27f8b8;if(!_0x8ec3ed)return![];if(!DataManager[_0x407625(0x12d)](_0x8ec3ed))return![];if(_0x8ec3ed['id']===this[_0x407625(0x24c)]())return![];if(_0x8ec3ed['id']===this[_0x407625(0x1c5)]())return![];return!![];},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1f6)]=Game_Battler[_0x27f8b8(0x105)]['regenerateTp'],Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x146)]=function(){const _0x2c5f4e=_0x27f8b8;if(!$gameParty[_0x2c5f4e(0x260)]()){if('xHzia'!==_0x2c5f4e(0x117)){let _0x509e30=_0x4cad50[_0x2c5f4e(0x1c9)]['Game_BattlerBase_sparam']['call'](this,_0x449dc5);return _0xa48e0e===0x5&&this[_0x2c5f4e(0x1d4)]()&&(_0x509e30*=this['tpMode']()[_0x2c5f4e(0x1e9)]),_0x509e30;}else return![];};this[_0x2c5f4e(0x133)]=!![];const _0x22108d=Math['floor'](this[_0x2c5f4e(0x1a1)]()*this[_0x2c5f4e(0x189)]);this[_0x2c5f4e(0x1a7)](_0x22108d),this[_0x2c5f4e(0x132)](_0x2c5f4e(0x108),this,0x0),this[_0x2c5f4e(0x1b1)]<this[_0x2c5f4e(0x22b)]/0x4&&this[_0x2c5f4e(0x132)]('CriticalHp',this,0x0),this['_hp']>=this[_0x2c5f4e(0x22b)]&&this[_0x2c5f4e(0x132)]('FullHp',this,0x0),this['_mp']<this[_0x2c5f4e(0x159)]/0x4&&this[_0x2c5f4e(0x132)]('CriticalMp',this,0x0),this[_0x2c5f4e(0x222)]>=this[_0x2c5f4e(0x159)]&&this[_0x2c5f4e(0x132)](_0x2c5f4e(0x269),this,0x0),this[_0x2c5f4e(0x25f)]()[_0x2c5f4e(0x129)]()['length']<=0x1&&this[_0x2c5f4e(0x132)](_0x2c5f4e(0x23d),this,0x0),this[_0x2c5f4e(0x133)]=undefined,this[_0x2c5f4e(0x11c)]();},Game_Battler['prototype'][_0x27f8b8(0x164)]=function(_0x38e0e3){},VisuMZ['EnhancedTP'][_0x27f8b8(0x26f)]=Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x13c)],Game_Battler[_0x27f8b8(0x105)]['addState']=function(_0x4f0960){const _0x3f0ff9=_0x27f8b8,_0x37fbe9=this['isAlive']();VisuMZ[_0x3f0ff9(0x1c9)][_0x3f0ff9(0x26f)][_0x3f0ff9(0x204)](this,_0x4f0960),_0x4f0960===this[_0x3f0ff9(0x266)]()&&this['isDead']()&&_0x37fbe9&&(this[_0x3f0ff9(0x25f)]()['gainTpFromTpMode']('KillAlly',this,0x0),this['opponentsUnit']()[_0x3f0ff9(0x132)](_0x3f0ff9(0x150),this,0x0));},Game_Battler[_0x27f8b8(0x105)][_0x27f8b8(0x231)]=function(_0x3c7eee){const _0x3ec0bc=_0x27f8b8;this[_0x3ec0bc(0x235)]={},this[_0x3ec0bc(0x113)]=Math[_0x3ec0bc(0x1d0)](this[_0x3ec0bc(0x113)],this['maxTp']());},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x23a)]=Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x268)],Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x268)]=function(_0x4ff7e2){const _0x58e79f=_0x27f8b8;VisuMZ['EnhancedTP'][_0x58e79f(0x23a)][_0x58e79f(0x204)](this,_0x4ff7e2),this[_0x58e79f(0x246)]();},Game_Actor[_0x27f8b8(0x105)]['initEnhancedTP']=function(){const _0x526c29=_0x27f8b8;this[_0x526c29(0x196)]=[],Game_Battler[_0x526c29(0x105)]['initEnhancedTP'][_0x526c29(0x204)](this),this[_0x526c29(0x18a)](),this[_0x526c29(0x1cf)]();},Game_Actor[_0x27f8b8(0x105)]['defaultTpMode']=function(){const _0x3b7a37=_0x27f8b8;if(this[_0x3b7a37(0x212)]()&&this[_0x3b7a37(0x212)]()[_0x3b7a37(0x17b)][_0x3b7a37(0x232)](/<TP MODE: (.*)>/i)){if('wrZdP'==='wrZdP')return String(RegExp['$1'])[_0x3b7a37(0x121)]()[_0x3b7a37(0x256)]();else{const _0x449625=this['tpModeWindowRect']();this[_0x3b7a37(0x205)]=new _0x2549a2(_0x449625),this[_0x3b7a37(0x205)][_0x3b7a37(0x264)](this[_0x3b7a37(0x167)]),this[_0x3b7a37(0x205)]['setHandler']('ok',this['onTpModeOk'][_0x3b7a37(0x15b)](this)),this[_0x3b7a37(0x205)][_0x3b7a37(0x14e)]('cancel',this['onTpModeCancel'][_0x3b7a37(0x15b)](this)),this[_0x3b7a37(0x1d2)](this[_0x3b7a37(0x205)]);const _0x40a8dc=_0x350b65[_0x3b7a37(0x1c9)][_0x3b7a37(0x1cd)][_0x3b7a37(0x157)][_0x3b7a37(0x15a)];this[_0x3b7a37(0x205)]['setBackgroundType'](_0x40a8dc||0x0);}}else return Game_Battler[_0x3b7a37(0x105)][_0x3b7a37(0x1b6)][_0x3b7a37(0x204)](this);},Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x231)]=function(_0x3aa148){const _0x3e2d2c=_0x27f8b8;_0x3aa148=_0x3aa148[_0x3e2d2c(0x121)]()['trim'](),Game_Battler[_0x3e2d2c(0x105)]['onChangeTpMode'][_0x3e2d2c(0x204)](this,_0x3aa148),this[_0x3e2d2c(0x17a)](_0x3aa148);},Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x17a)]=function(_0x13a46e){const _0x4d8f30=_0x27f8b8;_0x13a46e=_0x13a46e[_0x4d8f30(0x121)]()['trim']();if(!VisuMZ['EnhancedTP'][_0x4d8f30(0x10b)][_0x13a46e])return;this[_0x4d8f30(0x196)]=this[_0x4d8f30(0x196)]||[],!this[_0x4d8f30(0x196)]['includes'](_0x13a46e)&&(this[_0x4d8f30(0x196)]['push'](_0x13a46e),this[_0x4d8f30(0x177)]());},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x177)]=function(_0x427dfe){const _0x1ddb45=_0x27f8b8,_0x23dfe7=[];for(const _0x44c6ca of VisuMZ['EnhancedTP'][_0x1ddb45(0x215)]){if(_0x427dfe[_0x1ddb45(0x263)](_0x44c6ca))_0x23dfe7[_0x1ddb45(0x25d)](_0x44c6ca);}return _0x23dfe7;},Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x177)]=function(){const _0x4f0498=_0x27f8b8;if(this['_availableTpModes']===undefined)this['initEnhancedTP']();this['_availableTpModes']=VisuMZ['EnhancedTP'][_0x4f0498(0x177)](this[_0x4f0498(0x196)]);},Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x209)]=function(){const _0x4d2cd=_0x27f8b8;if(this[_0x4d2cd(0x196)]===undefined)this[_0x4d2cd(0x246)]();this[_0x4d2cd(0x18a)]();let _0x3de480=this['_availableTpModes']['map'](_0x58fbb9=>VisuMZ[_0x4d2cd(0x1c9)]['TpModes'][_0x58fbb9]);return _0x3de480['remove'](null);},Game_Actor[_0x27f8b8(0x105)]['learnAvailablePartyTpModes']=function(){const _0x15462a=_0x27f8b8;for(const _0x5dd09b of $gameParty[_0x15462a(0x18c)]()){'BUQbj'==='BUQbj'?this['learnTpMode'](_0x5dd09b['toUpperCase']()['trim']()):this[_0x15462a(0x113)]=(this['_tp']+_0x5a0dc4)['clamp'](0x0,this[_0x15462a(0x1a1)]());}},Game_Actor['prototype'][_0x27f8b8(0x1cf)]=function(){const _0x14596a=_0x27f8b8;if(this[_0x14596a(0x212)]()&&this['actor']()[_0x14596a(0x17b)]['match'](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x34a470=String(RegExp['$1'])[_0x14596a(0x17e)](/[\r\n]+/);for(const _0x3249fe of _0x34a470){this[_0x14596a(0x17a)](_0x3249fe[_0x14596a(0x121)]()['trim']());}}},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1ec)]=Game_Actor['prototype'][_0x27f8b8(0x25c)],Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x25c)]=function(_0x4219da){const _0x21a8c9=_0x27f8b8;VisuMZ[_0x21a8c9(0x1c9)][_0x21a8c9(0x1ec)][_0x21a8c9(0x204)](this,_0x4219da),this[_0x21a8c9(0x120)](_0x4219da);},Game_Actor[_0x27f8b8(0x105)][_0x27f8b8(0x120)]=function(_0x8c1542){const _0x472985=_0x27f8b8;if(!$dataSkills[_0x8c1542])return;const _0x30fd0a=$dataSkills[_0x8c1542]['note'],_0x32f18f=_0x30fd0a['match'](/<LEARN TP MODE: (.*)>/gi);if(_0x32f18f)for(const _0x486077 of _0x32f18f){_0x486077[_0x472985(0x232)](/<LEARN TP MODE: (.*)>/i),this['learnTpMode'](String(RegExp['$1']));}if(_0x30fd0a[_0x472985(0x232)](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x25e173=String(RegExp['$1'])[_0x472985(0x17e)](/[\r\n]+/);for(const _0x2388ea of _0x25e173){this[_0x472985(0x17a)](_0x2388ea);}}},Game_Enemy['prototype']['defaultTpMode']=function(){const _0x241dc7=_0x27f8b8;if(this[_0x241dc7(0x1fb)]()[_0x241dc7(0x17b)][_0x241dc7(0x232)](/<TP MODE: (.*)>/i)){if('FyHNM'!==_0x241dc7(0x1f9))return String(RegExp['$1'])[_0x241dc7(0x121)]()[_0x241dc7(0x256)]();else this['_availableTpModes'][_0x241dc7(0x25d)](_0x2ae543),this[_0x241dc7(0x177)]();}else return Game_Battler[_0x241dc7(0x105)][_0x241dc7(0x1b6)]['call'](this);},Game_Unit['prototype'][_0x27f8b8(0x132)]=function(_0x262f16,_0x58d88d,_0x5d07a2){const _0x52ff47=_0x27f8b8;for(const _0xb3fe89 of this[_0x52ff47(0x129)]()){if(!_0xb3fe89)continue;_0xb3fe89[_0x52ff47(0x132)](_0x262f16,_0x58d88d,_0x5d07a2);}},VisuMZ[_0x27f8b8(0x1c9)]['Game_Party_initialize']=Game_Party[_0x27f8b8(0x105)][_0x27f8b8(0x13a)],Game_Party[_0x27f8b8(0x105)][_0x27f8b8(0x13a)]=function(){const _0x3d5aaf=_0x27f8b8;VisuMZ[_0x3d5aaf(0x1c9)][_0x3d5aaf(0x1a0)][_0x3d5aaf(0x204)](this),this[_0x3d5aaf(0x154)]();},Game_Party[_0x27f8b8(0x105)][_0x27f8b8(0x154)]=function(){const _0x1bc58f=_0x27f8b8;this[_0x1bc58f(0x1fe)]=[];for(const _0x5ae926 of VisuMZ[_0x1bc58f(0x1c9)][_0x1bc58f(0x1cd)][_0x1bc58f(0x157)]['GlobalTPModes']){_0x1bc58f(0x1ab)!==_0x1bc58f(0x239)?this[_0x1bc58f(0x1fe)][_0x1bc58f(0x25d)](_0x5ae926['toUpperCase']()[_0x1bc58f(0x256)]()):this[_0x1bc58f(0x15c)](this[_0x1bc58f(0x1b6)]());}},Game_Party[_0x27f8b8(0x105)][_0x27f8b8(0x18c)]=function(){const _0x5c1c55=_0x27f8b8;if(this[_0x5c1c55(0x1fe)]===undefined)this[_0x5c1c55(0x154)]();return this[_0x5c1c55(0x1fe)];},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x186)]=Scene_Skill['prototype'][_0x27f8b8(0x25a)],Scene_Skill['prototype'][_0x27f8b8(0x25a)]=function(){const _0x35cab3=_0x27f8b8;VisuMZ[_0x35cab3(0x1c9)][_0x35cab3(0x186)][_0x35cab3(0x204)](this),this['createTpModeWindow']();},VisuMZ['EnhancedTP'][_0x27f8b8(0x22d)]=Scene_Skill[_0x27f8b8(0x105)][_0x27f8b8(0x1bd)],Scene_Skill[_0x27f8b8(0x105)]['createSkillTypeWindow']=function(){const _0x4331dc=_0x27f8b8;VisuMZ[_0x4331dc(0x1c9)]['Scene_Skill_createSkillTypeWindow'][_0x4331dc(0x204)](this),this[_0x4331dc(0x228)][_0x4331dc(0x14e)](_0x4331dc(0x1d4),this[_0x4331dc(0x23c)][_0x4331dc(0x15b)](this));},Scene_Skill[_0x27f8b8(0x105)][_0x27f8b8(0x1f0)]=function(){const _0x371725=_0x27f8b8,_0x6a2cf7=this[_0x371725(0x119)]();this[_0x371725(0x205)]=new Window_TpModes(_0x6a2cf7),this[_0x371725(0x205)][_0x371725(0x264)](this[_0x371725(0x167)]),this[_0x371725(0x205)][_0x371725(0x14e)]('ok',this[_0x371725(0x1cc)][_0x371725(0x15b)](this)),this[_0x371725(0x205)][_0x371725(0x14e)]('cancel',this[_0x371725(0x128)][_0x371725(0x15b)](this)),this[_0x371725(0x1d2)](this['_tpModeWindow']);const _0x4918cf=VisuMZ[_0x371725(0x1c9)][_0x371725(0x1cd)][_0x371725(0x157)][_0x371725(0x15a)];this[_0x371725(0x205)]['setBackgroundType'](_0x4918cf||0x0);},Scene_Skill[_0x27f8b8(0x105)][_0x27f8b8(0x119)]=function(){const _0x2bd5c1=_0x27f8b8,_0x3d5dbe=0x0,_0x4ae3f7=this[_0x2bd5c1(0x18b)]['y']+this[_0x2bd5c1(0x18b)][_0x2bd5c1(0x207)],_0x27fd3e=Graphics[_0x2bd5c1(0x20c)],_0xf84c08=this[_0x2bd5c1(0x14b)]()-this[_0x2bd5c1(0x18b)][_0x2bd5c1(0x207)];return new Rectangle(_0x3d5dbe,_0x4ae3f7,_0x27fd3e,_0xf84c08);},Scene_Skill['prototype']['commandTpMode']=function(){const _0x4db28a=_0x27f8b8;this[_0x4db28a(0x205)][_0x4db28a(0x111)](),this['_tpModeWindow'][_0x4db28a(0x12f)]();},Scene_Skill['prototype'][_0x27f8b8(0x1cc)]=function(){const _0x4993ae=_0x27f8b8;this['_tpModeWindow'][_0x4993ae(0x111)]();const _0x38234f=this[_0x4993ae(0x205)]['item']();if(!_0x38234f)return;this[_0x4993ae(0x212)]()[_0x4993ae(0x15c)](_0x38234f[_0x4993ae(0x217)]),this[_0x4993ae(0x205)][_0x4993ae(0x11c)](),this[_0x4993ae(0x18b)][_0x4993ae(0x11c)]();},Scene_Skill[_0x27f8b8(0x105)]['onTpModeCancel']=function(){const _0x34615e=_0x27f8b8;this[_0x34615e(0x205)][_0x34615e(0x148)](),this[_0x34615e(0x228)][_0x34615e(0x111)]();},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x24b)]=Scene_Skill[_0x27f8b8(0x105)][_0x27f8b8(0x18e)],Scene_Skill['prototype'][_0x27f8b8(0x18e)]=function(){const _0x3261c5=_0x27f8b8;VisuMZ[_0x3261c5(0x1c9)][_0x3261c5(0x24b)]['call'](this);if(this[_0x3261c5(0x205)])this[_0x3261c5(0x205)][_0x3261c5(0x1d1)](this[_0x3261c5(0x212)]());},VisuMZ['EnhancedTP'][_0x27f8b8(0x122)]=Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x268)],Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x268)]=function(_0x38bd49,_0x1b6c20){const _0x4abfc3=_0x27f8b8;VisuMZ['EnhancedTP']['Sprite_Gauge_setup']['call'](this,_0x38bd49,_0x1b6c20),this[_0x4abfc3(0x1ef)]==='tp'&&(_0x4abfc3(0x241)!==_0x4abfc3(0x161)?(this[_0x4abfc3(0x185)](),this[_0x4abfc3(0x1b5)]()):this[_0x4abfc3(0x236)][_0x4abfc3(0x170)]=new _0x2e8ab8(this[_0x4abfc3(0x170)]['width'],this[_0x4abfc3(0x170)][_0x4abfc3(0x207)]));},Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x185)]=function(){const _0x3183b8=_0x27f8b8;!this[_0x3183b8(0x236)]&&(this[_0x3183b8(0x236)]=new Sprite(),this[_0x3183b8(0x1ce)](this[_0x3183b8(0x236)])),!this[_0x3183b8(0x252)]&&(this['_tpGaugeSprite']=new Sprite(),this[_0x3183b8(0x1ce)](this[_0x3183b8(0x252)])),!this[_0x3183b8(0x1bf)]&&(_0x3183b8(0x131)!==_0x3183b8(0x131)?(_0x314c5a['EnhancedTP'][_0x3183b8(0x1ec)][_0x3183b8(0x204)](this,_0xe2939a),this[_0x3183b8(0x120)](_0x50a28e)):(this[_0x3183b8(0x1bf)]=new Sprite(),this['addChild'](this[_0x3183b8(0x1bf)])));},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x1b9)]=Sprite_Gauge['prototype'][_0x27f8b8(0x259)],Sprite_Gauge[_0x27f8b8(0x105)]['redraw']=function(){const _0x5c63a0=_0x27f8b8;let _0x18373c=$dataSystem[_0x5c63a0(0x12a)]['basic'][0x7];this[_0x5c63a0(0x1ef)]==='tp'&&this[_0x5c63a0(0x16d)](),VisuMZ[_0x5c63a0(0x1c9)]['Sprite_Gauge_redraw'][_0x5c63a0(0x204)](this),this[_0x5c63a0(0x1ef)]==='tp'&&(_0x5c63a0(0x1ed)===_0x5c63a0(0x1ed)?this[_0x5c63a0(0x1e7)]():_0x54a16c['learnTpMode'](_0x3d1113)),this['_statusType']==='tp'&&($dataSystem[_0x5c63a0(0x12a)][_0x5c63a0(0x249)][0x7]=_0x18373c);},Sprite_Gauge['prototype'][_0x27f8b8(0x1e7)]=function(){const _0x22b486=_0x27f8b8;if(this['_tpTextSprite']){if(_0x22b486(0x1b4)===_0x22b486(0x23f)){if(this['_tpModes']===_0x56f1b1)this[_0x22b486(0x154)]();return this[_0x22b486(0x1fe)];}else this[_0x22b486(0x1bf)]['bitmap']=this['bitmap'];}this[_0x22b486(0x114)](0x0,0x0,0x0,0x0);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x247)]=Sprite_Gauge[_0x27f8b8(0x105)]['drawFullGauge'],Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x20b)]=function(_0x2385a,_0x5e2c2b,_0x18eecf,_0x555624,_0x2ded6f,_0x3891a7){const _0x6ab1d9=_0x27f8b8;if(this[_0x6ab1d9(0x1ef)]==='tp'&&this[_0x6ab1d9(0x252)]){if(_0x6ab1d9(0x20d)!==_0x6ab1d9(0x20d)){this[_0x6ab1d9(0x1fe)]=[];for(const _0x3f9be4 of _0x304bc5[_0x6ab1d9(0x1c9)][_0x6ab1d9(0x1cd)][_0x6ab1d9(0x157)][_0x6ab1d9(0x163)]){this[_0x6ab1d9(0x1fe)]['push'](_0x3f9be4[_0x6ab1d9(0x121)]()[_0x6ab1d9(0x256)]());}}else this[_0x6ab1d9(0x262)](_0x2385a,_0x5e2c2b,_0x18eecf,_0x555624,_0x2ded6f,_0x3891a7);}else VisuMZ[_0x6ab1d9(0x1c9)][_0x6ab1d9(0x247)][_0x6ab1d9(0x204)](this,_0x2385a,_0x5e2c2b,_0x18eecf,_0x555624,_0x2ded6f,_0x3891a7);},Sprite_Gauge['prototype'][_0x27f8b8(0x19c)]=function(_0x43385c){const _0x422455=_0x27f8b8;!this[_0x422455(0x236)]['bitmap']&&(this[_0x422455(0x236)][_0x422455(0x170)]=new Bitmap(this[_0x422455(0x170)][_0x422455(0x1b0)],this[_0x422455(0x170)][_0x422455(0x207)]));!this[_0x422455(0x252)][_0x422455(0x170)]&&(this['_tpGaugeSprite']['bitmap']=new Bitmap(this['bitmap'][_0x422455(0x1b0)],this[_0x422455(0x170)][_0x422455(0x207)]));if(_0x43385c){if(_0x422455(0x123)!==_0x422455(0x1dc))this['_tpGaugeBack'][_0x422455(0x170)][_0x422455(0x1c6)](),this['_tpGaugeSprite'][_0x422455(0x170)][_0x422455(0x1c6)]();else{this[_0x422455(0x19c)](!![]);const _0x38c31a=this[_0x422455(0x144)](),_0x33d4a3=_0x4348dd[_0x422455(0x208)]((_0x1f1813-0x2)*_0x38c31a),_0x5ab743=_0x2ef0f4-0x2,_0xa98078=this[_0x422455(0x158)](),_0x5499b7=this[_0x422455(0x229)](this[_0x422455(0x22f)](),0x1),_0x4fbd52=this['changeTpCustomColor'](this[_0x422455(0x1f1)](),0x2);this[_0x422455(0x236)]['bitmap']['fillRect'](_0x3f7f97,_0x4466a8,_0x4533ba,_0x1588a5,_0xa98078),this[_0x422455(0x252)]['bitmap'][_0x422455(0x243)](_0x3260f1+0x1,_0xcbdcb0+0x1,_0x33d4a3,_0x5ab743,_0x5499b7,_0x4fbd52);}}},Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x262)]=function(_0x194a46,_0xb3a077,_0x535291,_0x3efe18,_0x441256,_0x383589){const _0x52d724=_0x27f8b8;this['createTpGaugeBitmaps'](!![]);const _0x11cb6b=this[_0x52d724(0x144)](),_0x3a0fbd=Math[_0x52d724(0x208)]((_0x441256-0x2)*_0x11cb6b),_0x1257ac=_0x383589-0x2,_0x4db045=this[_0x52d724(0x158)]();this[_0x52d724(0x236)][_0x52d724(0x170)][_0x52d724(0x14d)](_0x535291,_0x3efe18,_0x441256,_0x383589,_0x4db045),_0x194a46=this['changeTpCustomColor'](_0x194a46,0x1),_0xb3a077=this[_0x52d724(0x229)](_0xb3a077,0x2),this[_0x52d724(0x252)][_0x52d724(0x170)][_0x52d724(0x243)](_0x535291+0x1,_0x3efe18+0x1,_0x3a0fbd,_0x1257ac,_0x194a46,_0xb3a077);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x16f)]=Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x13f)],Sprite_Gauge[_0x27f8b8(0x105)]['drawGaugeRect']=function(_0x6752b5,_0x3854da,_0x55766c,_0x19d27f){const _0x3d40f2=_0x27f8b8;this[_0x3d40f2(0x1ef)]==='tp'&&this['_tpGaugeSprite']?this['drawGaugeRectEnhancedTp'](_0x6752b5,_0x3854da,_0x55766c,_0x19d27f):VisuMZ[_0x3d40f2(0x1c9)][_0x3d40f2(0x16f)]['call'](this,_0x6752b5,_0x3854da,_0x55766c,_0x19d27f);},Sprite_Gauge['prototype']['drawGaugeRectEnhancedTp']=function(_0x210875,_0x220adf,_0x2c7721,_0x3958a3){const _0x59414f=_0x27f8b8;this['createTpGaugeBitmaps'](!![]);const _0x52dc6a=this[_0x59414f(0x144)](),_0x578998=Math[_0x59414f(0x208)]((_0x2c7721-0x2)*_0x52dc6a),_0x127515=_0x3958a3-0x2,_0x42ecb3=this['gaugeBackColor'](),_0x1f2ed2=this[_0x59414f(0x229)](this['gaugeColor1'](),0x1),_0x420c9e=this[_0x59414f(0x229)](this[_0x59414f(0x1f1)](),0x2);this[_0x59414f(0x236)][_0x59414f(0x170)][_0x59414f(0x14d)](_0x210875,_0x220adf,_0x2c7721,_0x3958a3,_0x42ecb3),this[_0x59414f(0x252)]['bitmap'][_0x59414f(0x243)](_0x210875+0x1,_0x220adf+0x1,_0x578998,_0x127515,_0x1f2ed2,_0x420c9e);},VisuMZ['EnhancedTP'][_0x27f8b8(0x1a2)]=Sprite_Gauge[_0x27f8b8(0x105)]['update'],Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x1b5)]=function(){const _0x5c3a9c=_0x27f8b8;VisuMZ[_0x5c3a9c(0x1c9)][_0x5c3a9c(0x1a2)][_0x5c3a9c(0x204)](this),this[_0x5c3a9c(0x20a)]();},Sprite_Gauge['prototype'][_0x27f8b8(0x20a)]=function(){const _0x5a67f6=_0x27f8b8;if(this[_0x5a67f6(0x1ef)]!=='tp')return;if(!this[_0x5a67f6(0x252)])return;if(!this[_0x5a67f6(0x1c4)])return;const _0x405d19=this[_0x5a67f6(0x1c4)][_0x5a67f6(0x1d4)]();if(this['_tpModeCache']!==_0x405d19){if(_0x5a67f6(0x238)!==_0x5a67f6(0x151))this[_0x5a67f6(0x202)]=_0x405d19,this[_0x5a67f6(0x259)]();else{if(this['_availableTpModes']===_0x3df38a)this['initEnhancedTP']();this[_0x5a67f6(0x18a)]();let _0x4f884e=this['_availableTpModes'][_0x5a67f6(0x21d)](_0x12b448=>_0xb8c042[_0x5a67f6(0x1c9)][_0x5a67f6(0x10b)][_0x12b448]);return _0x4f884e[_0x5a67f6(0x156)](null);}}if(this[_0x5a67f6(0x1c4)]['isTpGaugeFlashing']()){const _0x1b2c7a=this[_0x5a67f6(0x1c4)][_0x5a67f6(0x166)]();this[_0x5a67f6(0x252)][_0x5a67f6(0x124)](this['_tpGaugeSprite']['_hue']+_0x1b2c7a);const _0x1e76b6=this[_0x5a67f6(0x1c4)][_0x5a67f6(0x192)]();this['_tpGaugeSprite'][_0x5a67f6(0x1ad)]([0xff,0xff,0xff,_0x1e76b6]);}else this[_0x5a67f6(0x252)][_0x5a67f6(0x1ad)]([0xff,0xff,0xff,0x0]),this[_0x5a67f6(0x252)][_0x5a67f6(0x124)](0x0);},Sprite_Gauge['prototype'][_0x27f8b8(0x16d)]=function(){const _0xa32cb2=_0x27f8b8;if(!this[_0xa32cb2(0x1c4)])return;const _0x10bfc0=this[_0xa32cb2(0x1c4)]['tpMode']();_0x10bfc0[_0xa32cb2(0x214)]&&(_0xa32cb2(0x250)===_0xa32cb2(0x223)?this[_0xa32cb2(0x1fe)]['push'](_0x54d23c[_0xa32cb2(0x121)]()[_0xa32cb2(0x256)]()):$dataSystem[_0xa32cb2(0x12a)][_0xa32cb2(0x249)][0x7]=_0x10bfc0[_0xa32cb2(0x214)]['trim']());},Sprite_Gauge[_0x27f8b8(0x105)][_0x27f8b8(0x229)]=function(_0x465893,_0x179437){const _0xa0c183=_0x27f8b8;if(!this['_battler'])return _0x465893;const _0x44f1ef=this[_0xa0c183(0x1c4)][_0xa0c183(0x1d4)](),_0x1bac8c='CustomColor%1'['format'](_0x179437);return _0x44f1ef[_0x1bac8c]?ColorManager[_0xa0c183(0x1a6)](_0x44f1ef[_0x1bac8c]):_0x465893;},Window_Base[_0x27f8b8(0x105)]['drawTpMode']=function(_0x3c2df3,_0x422002,_0xe7181,_0x523a7e,_0x378d62){const _0x507a44=_0x27f8b8;if(!_0x3c2df3)return;const _0x5330bf=_0xe7181+(this['lineHeight']()-ImageManager[_0x507a44(0x176)])/0x2,_0x1ccb11=ImageManager['iconWidth']+0x4,_0x573fb2=Math[_0x507a44(0x19e)](0x0,_0x523a7e-_0x1ccb11);this[_0x507a44(0x1e8)](),_0x378d62&&_0x378d62[_0x507a44(0x1d4)]()===_0x3c2df3&&this['changeTextColor'](ColorManager[_0x507a44(0x11e)]()),this[_0x507a44(0x147)](_0x3c2df3[_0x507a44(0x1a5)],_0x422002,_0x5330bf),this[_0x507a44(0x16c)](_0x3c2df3[_0x507a44(0x217)],_0x422002+_0x1ccb11,_0xe7181,_0x573fb2);},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x153)]=Window_SkillType[_0x27f8b8(0x105)]['makeCommandList'],Window_SkillType[_0x27f8b8(0x105)][_0x27f8b8(0x248)]=function(){const _0x55cb78=_0x27f8b8;VisuMZ[_0x55cb78(0x1c9)]['Window_SkillType_makeCommandList'][_0x55cb78(0x204)](this),this[_0x55cb78(0x16b)]();},Window_SkillType[_0x27f8b8(0x105)][_0x27f8b8(0x16b)]=function(){const _0x5c4897=_0x27f8b8;if(!this[_0x5c4897(0x1ee)]())return;let _0x5a67a3=TextManager[_0x5c4897(0x240)][_0x5c4897(0x24e)](TextManager['tp']);Imported[_0x5c4897(0x162)]&&(_0x5a67a3=_0x5c4897(0x22a)[_0x5c4897(0x24e)](ImageManager[_0x5c4897(0x227)],_0x5a67a3)),this[_0x5c4897(0x107)](_0x5a67a3,'tpMode',!![],_0x5c4897(0x1d4));},Window_SkillType['prototype']['isTpModeCommandVisible']=function(){const _0x22247b=_0x27f8b8;return $gameSystem[_0x22247b(0x1be)]();},VisuMZ[_0x27f8b8(0x1c9)][_0x27f8b8(0x137)]=Window_SkillList[_0x27f8b8(0x105)][_0x27f8b8(0x1cb)],Window_SkillList['prototype'][_0x27f8b8(0x1cb)]=function(_0x2a8f23){const _0x1269a2=_0x27f8b8,_0x1b2ca6=this['_stypeId']!==_0x2a8f23;if(!_0x1b2ca6)return;this[_0x1269a2(0x1ba)]();const _0x2092a4=SceneManager[_0x1269a2(0x1da)][_0x1269a2(0x205)];if(_0x2092a4)_0x2092a4[_0x1269a2(0x160)]();const _0x56a191=this[_0x1269a2(0x18b)];if(_0x56a191)_0x56a191[_0x1269a2(0x1ba)]();VisuMZ[_0x1269a2(0x1c9)][_0x1269a2(0x137)][_0x1269a2(0x204)](this,_0x2a8f23);if(_0x1b2ca6&&_0x2092a4&&_0x2a8f23===_0x1269a2(0x1d4)){if(_0x56a191)_0x56a191[_0x1269a2(0x160)]();this[_0x1269a2(0x160)](),_0x2092a4[_0x1269a2(0x1ba)]();}};function _0x45c1(_0x49a936,_0x4260cb){const _0x22f4bb=_0x22f4();return _0x45c1=function(_0x45c187,_0x717a3d){_0x45c187=_0x45c187-0x105;let _0x442173=_0x22f4bb[_0x45c187];return _0x442173;},_0x45c1(_0x49a936,_0x4260cb);}function Window_TpModes(){const _0x4414c5=_0x27f8b8;this[_0x4414c5(0x13a)](...arguments);}Window_TpModes[_0x27f8b8(0x105)]=Object[_0x27f8b8(0x25a)](Window_Selectable['prototype']),Window_TpModes['prototype'][_0x27f8b8(0x24a)]=Window_TpModes,Window_TpModes[_0x27f8b8(0x105)][_0x27f8b8(0x13a)]=function(_0x32521f){const _0x3cf858=_0x27f8b8;Window_Selectable[_0x3cf858(0x105)][_0x3cf858(0x13a)][_0x3cf858(0x204)](this,_0x32521f),this[_0x3cf858(0x182)]=null,this[_0x3cf858(0x174)]=[],this['hide']();},Window_TpModes['prototype'][_0x27f8b8(0x1d1)]=function(_0x3fd939){const _0x45ba0d=_0x27f8b8;this[_0x45ba0d(0x182)]!==_0x3fd939&&(this['_actor']=_0x3fd939,this[_0x45ba0d(0x11c)](),this[_0x45ba0d(0x1c0)](0x0,0x0));},Window_TpModes[_0x27f8b8(0x105)][_0x27f8b8(0x1f4)]=function(){return 0x2;},Window_TpModes['prototype'][_0x27f8b8(0x261)]=function(){return 0x10;},Window_TpModes[_0x27f8b8(0x105)][_0x27f8b8(0x1e2)]=function(){const _0x454984=_0x27f8b8;return this['_data']?this[_0x454984(0x174)][_0x454984(0x1c1)]:0x1;},Window_TpModes['prototype'][_0x27f8b8(0x183)]=function(){return this['itemAt'](this['index']());},Window_TpModes[_0x27f8b8(0x105)]['itemAt']=function(_0x40e4c3){const _0x5e269d=_0x27f8b8;return this[_0x5e269d(0x174)]&&_0x40e4c3>=0x0?this['_data'][_0x40e4c3]:null;},Window_TpModes[_0x27f8b8(0x105)]['makeItemList']=function(){const _0x12f00c=_0x27f8b8;if(this[_0x12f00c(0x182)])'dRCxI'!==_0x12f00c(0x10a)?(_0x402014[_0x12f00c(0x1c9)]['Game_System_initialize'][_0x12f00c(0x204)](this),this[_0x12f00c(0x246)]()):this[_0x12f00c(0x174)]=this['_actor'][_0x12f00c(0x209)]();else{if(_0x12f00c(0x181)===_0x12f00c(0x181))this[_0x12f00c(0x174)]=[];else{if(!this[_0x12f00c(0x183)]())return![];const _0x5da953=this[_0x12f00c(0x183)]()[_0x12f00c(0x17b)],_0x4b05b=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x1042f8 of _0x4b05b){if(_0x5da953[_0x12f00c(0x232)](_0x1042f8))return!![];}return![];}}},Window_TpModes[_0x27f8b8(0x105)][_0x27f8b8(0x12f)]=function(){const _0x442c49=_0x27f8b8;this[_0x442c49(0x1c3)](0x0);},Window_TpModes['prototype'][_0x27f8b8(0x149)]=function(_0x3e8c15){const _0x1fa460=_0x27f8b8,_0x5062c8=this['itemAt'](_0x3e8c15);if(!_0x5062c8)return;const _0x5232d8=this[_0x1fa460(0x155)](_0x3e8c15);this[_0x1fa460(0x1e6)](_0x5062c8,_0x5232d8['x'],_0x5232d8['y'],_0x5232d8[_0x1fa460(0x1b0)],this[_0x1fa460(0x182)]);},Window_TpModes[_0x27f8b8(0x105)][_0x27f8b8(0x11b)]=function(){const _0x1df197=_0x27f8b8;this[_0x1df197(0x10e)](this[_0x1df197(0x183)]());},Window_TpModes[_0x27f8b8(0x105)][_0x27f8b8(0x11c)]=function(){const _0x1dd7ad=_0x27f8b8;this[_0x1dd7ad(0x20f)](),Window_Selectable[_0x1dd7ad(0x105)]['refresh'][_0x1dd7ad(0x204)](this);},Window_TpModes['prototype']['playOkSound']=function(){const _0x295527=_0x27f8b8;SoundManager[_0x295527(0x1d8)]();};