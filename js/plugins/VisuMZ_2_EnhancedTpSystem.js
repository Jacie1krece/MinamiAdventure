//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [EnhancedTP]
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
 * Version 1.14: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the icon of the TP Modes command in the Skill Scene
 *    would still appear even if command types are set to text only through the
 *    VisuStella MZ Skills & States Core plugin. Fixed by Olivia.
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

const _0x16f5d6=_0x2944;(function(_0x46f5ff,_0x45ae3f){const _0x5a50ed=_0x2944,_0x372bd7=_0x46f5ff();while(!![]){try{const _0x2a80cd=-parseInt(_0x5a50ed(0x2a7))/0x1*(parseInt(_0x5a50ed(0x245))/0x2)+parseInt(_0x5a50ed(0x29f))/0x3*(-parseInt(_0x5a50ed(0x2d8))/0x4)+parseInt(_0x5a50ed(0x2cc))/0x5+-parseInt(_0x5a50ed(0x344))/0x6+-parseInt(_0x5a50ed(0x21b))/0x7*(parseInt(_0x5a50ed(0x211))/0x8)+-parseInt(_0x5a50ed(0x285))/0x9*(-parseInt(_0x5a50ed(0x204))/0xa)+parseInt(_0x5a50ed(0x227))/0xb*(parseInt(_0x5a50ed(0x261))/0xc);if(_0x2a80cd===_0x45ae3f)break;else _0x372bd7['push'](_0x372bd7['shift']());}catch(_0x4c7dbf){_0x372bd7['push'](_0x372bd7['shift']());}}}(_0x13b9,0x62de2));function _0x2944(_0x298904,_0x17fccb){const _0x13b9b8=_0x13b9();return _0x2944=function(_0x2944a6,_0x36781e){_0x2944a6=_0x2944a6-0x1eb;let _0x5aa426=_0x13b9b8[_0x2944a6];return _0x5aa426;},_0x2944(_0x298904,_0x17fccb);}function _0x13b9(){const _0x48049d=['Game_Battler_gainSilentTp','GeHzu','XNEMQ','version','TpModeOrder','CustomLabel','_mp','changeTpCustomColor','itemEffectAddState','makeCommandList','Game_Action_applyItemUserEffect','enemy','CriticalMp','VisuMZ_1_SkillsStatesCore','MaxFormula','UseSkill','drawTpMode','10QEohwY','Initial','actor','TpModeCmdName','defaultTpMode','terms','prototype','drawItem','remove','Game_Actor_setup','hide','FullMp','FlashLightness','8TUtPMC','useItem','mhp','exit','registerCommand','setHandler','aliveMembers','trim','filter','setHelpWindow','3936373eoVOur','CustomColor%1','_availableTpModes','DealAllyState','Game_Action_applyGlobal','includes','setTpModeInSceneSkill','STRUCT','clamp','applyEnhancedTP','NrfQB','Actors','1155SoXNkZ','_tpModeCache','addState','kzGnM','setHue','Scene_Skill_refreshActor','_tp','makeItemList','ckIag','Show','TpRegen','STR','drawText','Scene_Skill_create','learnTpMode','selectLast','createTpGaugeBitmaps','setActor','DealEnemyBuff','TpModes','Enemies','name','Game_Action_executeMpDamage','NIfDp','eYBqO','bitmap','XFhck','rqNaD','max','guardSkillId','2NjbPRT','XPkLZ','drawFullGaugeEnhancedTp','PwtNo','UJRGz','KnXdN','addTpModeCommand','executeHpDamage','_tpModeWindow','SceneSkillTpMode','Game_Actor_learnSkill','applyGlobalEnhancedTP','egPas','split','activate','applyItemEnhancedTPEffect','MultiplierTCR','update','createEnhancedTpChildSprites','fillRect','leader','Sprite_Gauge_update','Sprite_Gauge_setup','AFGhQ','RisiB','KillEnemy','AllyMpDmg','ysKTs','157812ymkmAd','TpWindowBgType','isTpGaugeFlashing','format','isAlive','itemEffectAddBuff','UqWKe','TpMode','rGoSx','availableTpModes','_regeneratingTp','UseItem','TpModeIcon','user','tpModesCommandText','\x5cI[%1]%2','EVAL','onChangeTpMode','Game_Battler_onBattleStart','FleeBattle','process_VisuMZ_EnhancedTP_Settings','DealAllyDebuff','getColor','Game_BattlerBase_sparam','NRNsX','playEquip','iconHeight','EnhancedTP','DealMpHeal','createTpModeWindow','_stypeId','DealEnemyDebuff','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','TakeHpHeal','learnAvailableActorTpModes','testApply','7219539yidciP','DealHpDmg','min','target','map','Game_Action_testApply','ZsevR','parameters','jZhcs','_tpMode_SceneSkill','NUdVo','GainEnemyDebuff','GainEnemyState','drawFullGauge','Game_Action_itemEffectAddBuff','initEnhancedTP','height','parse','GainAllyDebuff','GainAllyState','ARRAYNUM','tpModesCommandIcon','DealHpHeal','index','UfJis','DefaultTpMode','3KtRoXU','attackSkillId','_statusType','updateEnhancedTp','NiGkO','KgsWA','AllyMpHeal','fRGYi','489682UFWbqA','_battler','executeMpDamage','abZpm','create','Game_Party_initialize','CriticalHp','Game_System_initialize','FUNC','members','redrawEnhancedTp','LoseBattle','AllyHpDmg','boxWidth','changeTpMode','isSkill','addChild','qNbOa','tgaez','commandTpMode','tpModes','FlashGauge','setBackgroundType','Sprite_Gauge_drawFullGauge','inBattle','FlashRequirement','toUpperCase','onTpModeOk','isActor','changeBattlerTpLabel','AnDsh','Game_BattlerBase_maxTp','tpMode','playOkSound','FullHp','qOLat','gaugeRate','1017920dGXgYm','tpRate','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','clear','Game_Action_itemEffectAddState','Game_Battler_addState','createSkillTypeWindow','NUM','VfGGd','onTpModeCancel','ConvertParams','Evasion','2104036cVSTxY','bind','drawIcon','Preserve','addWindow','basic','convertEnhancedTpFunctions','_hue','tpModeValue','ARRAYEVAL','OnlyMember','Scene_Skill_createSkillTypeWindow','match','sortTpModes','success','isPreserveTp','tpGaugeFlashSpeed','Scene_Boot_onDatabaseLoaded','learnAvailablePartyTpModes','Game_Action_itemEffectAddDebuff','isTpModeCommandVisible','width','General','onDatabaseLoaded','text','Icon','apply','commandStyle','testApplyEnhancedTP','onEscapeSuccess','show','BattleManager_onEscapeSuccess','Game_Action_executeHpDamage','Game_BattlerBase_isPreserveTp','ARRAYJSON','item','#%1','NYbBT','result','initTpModes','processDefeat','yOuPW','mmp','_tpTextSprite','MaxFormulaFunc','regenerateTp','addCommand','BattleManager_processDefeat','resetTextColor','learnSkillEnhancedTP','maxTp','onBattleStart','processVictory','note','initialize','GlobalTPModes','showTpModeInSceneSkill','deselect','constructor','setBlendColor','traitObjects','QVMRI','abs','description','call','PeSiw','%1Func','DealMpDmg','HVSPJ','mainAreaHeight','igAlR','applyGlobal','setup','floor','isDead','iconWidth','_tpGaugeSprite','ARRAYSTR','Window_SkillList_setStypeId','push','JSON','changeTextColor','gaugeColor2','Sprite_Gauge_drawGaugeRect','_cache','DealEnemyState','Game_Battler_useItem','drawGaugeRectEnhancedTp','return\x200','tpCostColor','Help','learnSkill','RvOXY','sYnOT','XeyFB','TmkCz','gainSilentTp','AllyHpHeal','forceSelect','drawGaugeRect','Sprite_Gauge_redraw','Window_SkillType_makeCommandList','HZvpn','_tpGaugeBack','missed','IZelp','_data','ActorChangeTPMode','2421708uCjzuA','_tpMode','itemEffectAddDebuff','Name','textColor','gainTpFromTpMode','friendsUnit','gaugeBackColor','subject','GainAllyBuff','LwGaj','FlashSpeed','UWQeV','applyItemUserEffect','Settings','WinBattle','_hp','mNNnw','redraw','setStypeId','tpGaugeFlashLightness','TakeMpHeal','_actor','DealAllyBuff','evaded','deathStateId','gradientFillRect','Game_Action_apply','maxCols','refreshActor','_tpModes','BattleManager_processVictory','tpModeWindowRect','length','GainEnemyBuff','vQNRe','_scene','TakeHpDmg','zfzNv','initTp','_statusWindow','sparam','skillIsNotAttackGuard','isItem','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','itemAt','refresh','DsxlD','CriticalHit','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'];_0x13b9=function(){return _0x48049d;};return _0x13b9();}var label=_0x16f5d6(0x27c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x16f5d6(0x219)](function(_0x45b23e){return _0x45b23e['status']&&_0x45b23e['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x16f5d6(0x352)]=VisuMZ[label][_0x16f5d6(0x352)]||{},VisuMZ[_0x16f5d6(0x2d6)]=function(_0x244b91,_0xf97082){const _0x1fb80c=_0x16f5d6;for(const _0x1869ec in _0xf97082){if(_0x1fb80c(0x25c)!==_0x1fb80c(0x2ca)){if(_0x1869ec[_0x1fb80c(0x2e4)](/(.*):(.*)/i)){const _0x1903f8=String(RegExp['$1']),_0x326e1b=String(RegExp['$2'])[_0x1fb80c(0x2c1)]()['trim']();let _0x796225,_0x40e0cc,_0x4c8810;switch(_0x326e1b){case _0x1fb80c(0x2d3):_0x796225=_0xf97082[_0x1869ec]!==''?Number(_0xf97082[_0x1869ec]):0x0;break;case _0x1fb80c(0x299):_0x40e0cc=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):[],_0x796225=_0x40e0cc[_0x1fb80c(0x289)](_0xfcb91f=>Number(_0xfcb91f));break;case _0x1fb80c(0x271):_0x796225=_0xf97082[_0x1869ec]!==''?eval(_0xf97082[_0x1869ec]):null;break;case _0x1fb80c(0x2e1):_0x40e0cc=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):[],_0x796225=_0x40e0cc[_0x1fb80c(0x289)](_0x149fae=>eval(_0x149fae));break;case _0x1fb80c(0x328):_0x796225=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):'';break;case _0x1fb80c(0x2fa):_0x40e0cc=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):[],_0x796225=_0x40e0cc[_0x1fb80c(0x289)](_0x2b6eed=>JSON['parse'](_0x2b6eed));break;case _0x1fb80c(0x2af):_0x796225=_0xf97082[_0x1869ec]!==''?new Function(JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec])):new Function(_0x1fb80c(0x330));break;case'ARRAYFUNC':_0x40e0cc=_0xf97082[_0x1869ec]!==''?JSON['parse'](_0xf97082[_0x1869ec]):[],_0x796225=_0x40e0cc[_0x1fb80c(0x289)](_0x4ecedc=>new Function(JSON['parse'](_0x4ecedc)));break;case _0x1fb80c(0x232):_0x796225=_0xf97082[_0x1869ec]!==''?String(_0xf97082[_0x1869ec]):'';break;case _0x1fb80c(0x325):_0x40e0cc=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):[],_0x796225=_0x40e0cc[_0x1fb80c(0x289)](_0x25de1b=>String(_0x25de1b));break;case _0x1fb80c(0x222):_0x4c8810=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):{},_0x796225=VisuMZ['ConvertParams']({},_0x4c8810);break;case'ARRAYSTRUCT':_0x40e0cc=_0xf97082[_0x1869ec]!==''?JSON[_0x1fb80c(0x296)](_0xf97082[_0x1869ec]):[],_0x796225=_0x40e0cc[_0x1fb80c(0x289)](_0x2af205=>VisuMZ[_0x1fb80c(0x2d6)]({},JSON[_0x1fb80c(0x296)](_0x2af205)));break;default:continue;}_0x244b91[_0x1903f8]=_0x796225;}}else this['friendsUnit']()[_0x1fb80c(0x349)]('KillAlly',this,0x0),this['opponentsUnit']()['gainTpFromTpMode']('KillEnemy',this,0x0);}return _0x244b91;},(_0x3e56b2=>{const _0x346332=_0x16f5d6,_0x61e401=_0x3e56b2[_0x346332(0x23c)];for(const _0x21041a of dependencies){if(!Imported[_0x21041a]){alert(_0x346332(0x2ce)[_0x346332(0x264)](_0x61e401,_0x21041a)),SceneManager[_0x346332(0x214)]();break;}}const _0x62fc4e=_0x3e56b2[_0x346332(0x317)];if(_0x62fc4e['match'](/\[Version[ ](.*?)\]/i)){if(_0x346332(0x242)===_0x346332(0x2a4))this[_0x346332(0x349)]('OnlyMember',this,0x0);else{const _0x1163f2=Number(RegExp['$1']);if(_0x1163f2!==VisuMZ[label][_0x346332(0x1f6)]){if(_0x346332(0x1f0)===_0x346332(0x1f0))alert(_0x346332(0x281)['format'](_0x61e401,_0x1163f2)),SceneManager[_0x346332(0x214)]();else return 0x10;}}}if(_0x62fc4e[_0x346332(0x2e4)](/\[Tier[ ](\d+)\]/i)){const _0x940193=Number(RegExp['$1']);if(_0x940193<tier){if(_0x346332(0x246)!==_0x346332(0x34e))alert(_0x346332(0x1ed)['format'](_0x61e401,_0x940193,tier)),SceneManager[_0x346332(0x214)]();else return this[_0x346332(0x1ee)](this[_0x346332(0x29c)]());}else _0x346332(0x279)!=='zRjfj'?tier=Math['max'](_0x940193,tier):(this[_0x346332(0x33f)]=new _0x17b3e8(),this['addChild'](this[_0x346332(0x33f)]));}VisuMZ[_0x346332(0x2d6)](VisuMZ[label][_0x346332(0x352)],_0x3e56b2[_0x346332(0x28c)]);})(pluginData),PluginManager[_0x16f5d6(0x215)](pluginData[_0x16f5d6(0x23c)],_0x16f5d6(0x343),_0x2fbce2=>{const _0x596f02=_0x16f5d6;VisuMZ[_0x596f02(0x2d6)](_0x2fbce2,_0x2fbce2);const _0xe745a7=_0x2fbce2[_0x596f02(0x226)][_0x596f02(0x289)](_0x7b2734=>$gameActors[_0x596f02(0x206)](_0x7b2734))[_0x596f02(0x20c)](null),_0x2f95ec=_0x2fbce2['TPModeName'];for(const _0x4be374 of _0xe745a7){if(!_0x4be374)continue;_0x4be374[_0x596f02(0x2b5)](_0x2f95ec);}}),PluginManager[_0x16f5d6(0x215)](pluginData[_0x16f5d6(0x23c)],'ActorUnlockTPMode',_0x2eb360=>{const _0x1b8002=_0x16f5d6;VisuMZ[_0x1b8002(0x2d6)](_0x2eb360,_0x2eb360);const _0xfcb64a=_0x2eb360[_0x1b8002(0x226)][_0x1b8002(0x289)](_0xc28dd5=>$gameActors[_0x1b8002(0x206)](_0xc28dd5))[_0x1b8002(0x20c)](null),_0x1c8e39=_0x2eb360['TPModes'];for(const _0x25a668 of _0xfcb64a){if(!_0x25a668)continue;for(const _0x51f5f5 of _0x1c8e39){if(_0x1b8002(0x355)===_0x1b8002(0x2b8)){const _0x144a6d=this[_0x1b8002(0x2c7)]();if(!_0x144a6d)return![];return(_0x144a6d[_0x1b8002(0x210)]||0x0)['clamp'](0x0,0xff);}else _0x25a668[_0x1b8002(0x235)](_0x51f5f5);}}}),PluginManager['registerCommand'](pluginData[_0x16f5d6(0x23c)],'ActorUnlockAllTPModes',_0x1a7cac=>{const _0x23f536=_0x16f5d6;VisuMZ[_0x23f536(0x2d6)](_0x1a7cac,_0x1a7cac);const _0x25f56f=_0x1a7cac[_0x23f536(0x226)]['map'](_0x505a64=>$gameActors[_0x23f536(0x206)](_0x505a64))[_0x23f536(0x20c)](null),_0xc22ed4=VisuMZ[_0x23f536(0x27c)][_0x23f536(0x1f7)];for(const _0x393878 of _0x25f56f){if(_0x23f536(0x269)!==_0x23f536(0x2b9)){if(!_0x393878)continue;for(const _0x17de1f of _0xc22ed4){if(_0x23f536(0x1f4)===_0x23f536(0x28d))return this[_0x23f536(0x342)]?this[_0x23f536(0x342)][_0x23f536(0x365)]:0x1;else _0x393878[_0x23f536(0x235)](_0x17de1f);}}else{const _0x595554=this['tpMode']();if(!_0x595554)return 0x0;_0x5d1da1=_0x23f536(0x31a)[_0x23f536(0x264)](_0x172fb6);if(!_0x595554[_0x5d8f33])return 0x0;return _0x595554[_0x354ee8](this,_0x4cdb33,_0x4c9eea);}}}),PluginManager[_0x16f5d6(0x215)](pluginData[_0x16f5d6(0x23c)],'EnemyChangeTPMode',_0x12a3c1=>{const _0x32df24=_0x16f5d6;VisuMZ[_0x32df24(0x2d6)](_0x12a3c1,_0x12a3c1);const _0x3fa765=_0x12a3c1[_0x32df24(0x23b)][_0x32df24(0x289)](_0xa9574a=>$gameTroop[_0x32df24(0x2b0)]()[_0xa9574a])[_0x32df24(0x20c)](null),_0x231150=_0x12a3c1['TPModeName'];for(const _0x312074 of _0x3fa765){if(_0x32df24(0x2c5)!==_0x32df24(0x1f5)){if(!_0x312074)continue;_0x312074['changeTpMode'](_0x231150);}else{if(!_0x3185f0)return![];if(!_0x2216d3[_0x32df24(0x2b6)](_0x55205d))return![];if(_0x310abd['id']===this[_0x32df24(0x2a0)]())return![];if(_0x7838b['id']===this[_0x32df24(0x244)]())return![];return!![];}}}),PluginManager[_0x16f5d6(0x215)](pluginData[_0x16f5d6(0x23c)],_0x16f5d6(0x24e),_0x56e3c9=>{const _0x46f590=_0x16f5d6;VisuMZ[_0x46f590(0x2d6)](_0x56e3c9,_0x56e3c9),$gameSystem[_0x46f590(0x221)](_0x56e3c9[_0x46f590(0x230)]);}),VisuMZ[_0x16f5d6(0x27c)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x16f5d6(0x20a)][_0x16f5d6(0x2ef)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x561075=_0x16f5d6;VisuMZ[_0x561075(0x27c)][_0x561075(0x2e9)][_0x561075(0x318)](this),this['process_VisuMZ_EnhancedTP_Settings']();},Scene_Boot[_0x16f5d6(0x20a)][_0x16f5d6(0x275)]=function(){const _0x38d9a6=_0x16f5d6;VisuMZ[_0x38d9a6(0x27c)][_0x38d9a6(0x23a)]={},VisuMZ[_0x38d9a6(0x27c)][_0x38d9a6(0x1f7)]=[];for(const _0x3cbd4d of VisuMZ[_0x38d9a6(0x27c)][_0x38d9a6(0x352)][_0x38d9a6(0x268)]){if(_0x38d9a6(0x2d4)!=='SkWaf'){if(!_0x3cbd4d)continue;_0x3cbd4d[_0x38d9a6(0x317)]=_0x3cbd4d[_0x38d9a6(0x332)][_0x38d9a6(0x264)](TextManager['tp']),this['convertEnhancedTpFunctions'](_0x3cbd4d);const _0x5db39d=_0x3cbd4d[_0x38d9a6(0x347)][_0x38d9a6(0x2c1)]()[_0x38d9a6(0x218)]();VisuMZ[_0x38d9a6(0x27c)]['TpModes'][_0x5db39d]=_0x3cbd4d,VisuMZ['EnhancedTP'][_0x38d9a6(0x1f7)]['push'](_0x5db39d);}else{if(this['tpMode']())return this[_0x38d9a6(0x2c7)]()[_0x38d9a6(0x2db)];return _0x4bee8a[_0x38d9a6(0x27c)][_0x38d9a6(0x2f9)][_0x38d9a6(0x318)](this);}}},Scene_Boot[_0x16f5d6(0x20a)][_0x16f5d6(0x2de)]=function(_0x595340){const _0x5c6740=_0x16f5d6,_0x417554=[_0x5c6740(0x201),'Initial',_0x5c6740(0x1f1),_0x5c6740(0x2d7),'UseItem',_0x5c6740(0x202),_0x5c6740(0x231),_0x5c6740(0x2ad),_0x5c6740(0x2c9),_0x5c6740(0x1ff),'FullMp',_0x5c6740(0x2e2),_0x5c6740(0x369),_0x5c6740(0x286),_0x5c6740(0x2b3),_0x5c6740(0x282),'DealHpHeal',_0x5c6740(0x339),'TakeMpDmg',_0x5c6740(0x31b),_0x5c6740(0x25f),'TakeMpHeal',_0x5c6740(0x27d),'AllyMpHeal',_0x5c6740(0x35b),_0x5c6740(0x239),_0x5c6740(0x34d),_0x5c6740(0x366),_0x5c6740(0x276),_0x5c6740(0x280),_0x5c6740(0x297),'GainEnemyDebuff',_0x5c6740(0x21e),_0x5c6740(0x32d),_0x5c6740(0x298),_0x5c6740(0x291),'KillAlly',_0x5c6740(0x25e),_0x5c6740(0x353),_0x5c6740(0x274),_0x5c6740(0x2b2)];for(const _0x19e3d3 of _0x417554){const _0x273e48=_0x5c6740(0x1f2)[_0x5c6740(0x264)](_0x595340[_0x19e3d3]);_0x595340[_0x5c6740(0x31a)[_0x5c6740(0x264)](_0x19e3d3)]=new Function(_0x5c6740(0x26e),_0x5c6740(0x288),'value',_0x273e48);}},TextManager['tpModesCommandText']=VisuMZ['EnhancedTP']['Settings'][_0x16f5d6(0x2ee)][_0x16f5d6(0x207)],ColorManager['getColor']=function(_0x466718){const _0x8b86fd=_0x16f5d6;return _0x466718=String(_0x466718),_0x466718[_0x8b86fd(0x2e4)](/#(.*)/i)?_0x8b86fd(0x2fc)[_0x8b86fd(0x264)](String(RegExp['$1'])):this[_0x8b86fd(0x348)](Number(_0x466718));},ImageManager[_0x16f5d6(0x29a)]=VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x352)][_0x16f5d6(0x2ee)][_0x16f5d6(0x26d)],VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x363)]=BattleManager[_0x16f5d6(0x30c)],BattleManager['processVictory']=function(){const _0x47a696=_0x16f5d6;VisuMZ[_0x47a696(0x27c)][_0x47a696(0x363)][_0x47a696(0x318)](this),$gameParty[_0x47a696(0x349)]('WinBattle',$gameParty['leader'](),0x0);},VisuMZ['EnhancedTP'][_0x16f5d6(0x2f7)]=BattleManager[_0x16f5d6(0x2f5)],BattleManager['onEscapeSuccess']=function(){const _0x566a4a=_0x16f5d6;VisuMZ[_0x566a4a(0x27c)][_0x566a4a(0x2f7)][_0x566a4a(0x318)](this),$gameParty[_0x566a4a(0x349)](_0x566a4a(0x274),$gameParty[_0x566a4a(0x259)](),0x0);},VisuMZ[_0x16f5d6(0x27c)]['BattleManager_processDefeat']=BattleManager[_0x16f5d6(0x300)],BattleManager['processDefeat']=function(){const _0xf6be61=_0x16f5d6;VisuMZ['EnhancedTP'][_0xf6be61(0x307)][_0xf6be61(0x318)](this),$gameParty[_0xf6be61(0x349)](_0xf6be61(0x2b2),$gameParty[_0xf6be61(0x259)](),0x0);},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x2ae)]=Game_System[_0x16f5d6(0x20a)][_0x16f5d6(0x30e)],Game_System[_0x16f5d6(0x20a)][_0x16f5d6(0x30e)]=function(){const _0xb4a7e0=_0x16f5d6;VisuMZ['EnhancedTP']['Game_System_initialize'][_0xb4a7e0(0x318)](this),this[_0xb4a7e0(0x294)]();},Game_System[_0x16f5d6(0x20a)]['initEnhancedTP']=function(){const _0x5d2532=_0x16f5d6;this['_tpMode_SceneSkill']=VisuMZ[_0x5d2532(0x27c)]['Settings'][_0x5d2532(0x2ee)]['ShowTpMode'];},Game_System[_0x16f5d6(0x20a)][_0x16f5d6(0x310)]=function(){const _0xdfc80a=_0x16f5d6;if(this[_0xdfc80a(0x28e)]===undefined)this['initEnhancedTP']();return this[_0xdfc80a(0x28e)];},Game_System[_0x16f5d6(0x20a)][_0x16f5d6(0x221)]=function(_0x3a0064){if(this['_tpMode_SceneSkill']===undefined)this['initEnhancedTP']();this['_tpMode_SceneSkill']=_0x3a0064;},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x35f)]=Game_Action[_0x16f5d6(0x20a)]['apply'],Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x2f2)]=function(_0x104601){const _0x35bbdb=_0x16f5d6;VisuMZ['EnhancedTP'][_0x35bbdb(0x35f)][_0x35bbdb(0x318)](this,_0x104601),this['applyEnhancedTP'](_0x104601);},Game_Action['prototype'][_0x16f5d6(0x224)]=function(_0x3622da){const _0x301abc=_0x16f5d6,_0x1a60ec=_0x3622da[_0x301abc(0x2fe)]();_0x1a60ec['critical']&&(_0x301abc(0x248)!==_0x301abc(0x249)?this['subject']()[_0x301abc(0x349)](_0x301abc(0x1f1),_0x3622da,0x0):this[_0x301abc(0x2a1)]==='tp'&&this['_tpGaugeSprite']?this['drawGaugeRectEnhancedTp'](_0x1b21f4,_0x50a1a3,_0x1dff11,_0x53a474):_0x362010[_0x301abc(0x27c)][_0x301abc(0x32b)]['call'](this,_0x4149d1,_0x5351f5,_0x28d8b5,_0x486c07)),(_0x1a60ec[_0x301abc(0x35c)]||_0x1a60ec[_0x301abc(0x340)])&&_0x3622da['gainTpFromTpMode']('Evasion',_0x3622da,0x0);},VisuMZ['EnhancedTP'][_0x16f5d6(0x2f8)]=Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x24c)],Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x24c)]=function(_0x2a41f0,_0x7b4c3a){const _0xd7640c=_0x16f5d6;VisuMZ[_0xd7640c(0x27c)][_0xd7640c(0x2f8)][_0xd7640c(0x318)](this,_0x2a41f0,_0x7b4c3a);const _0x505d0d=this[_0xd7640c(0x34c)]();_0x7b4c3a>0x0?(_0x2a41f0['gainTpFromTpMode']('TakeHpDmg',_0x2a41f0,_0x7b4c3a),_0x505d0d[_0xd7640c(0x349)](_0xd7640c(0x286),_0x2a41f0,_0x7b4c3a),_0x2a41f0[_0xd7640c(0x34a)]()['gainTpFromTpMode']('AllyHpDmg',_0x2a41f0,_0x7b4c3a)):(_0x7b4c3a=Math[_0xd7640c(0x316)](_0x7b4c3a),_0x2a41f0['gainTpFromTpMode'](_0xd7640c(0x282),_0x2a41f0,_0x7b4c3a),_0x505d0d[_0xd7640c(0x349)](_0xd7640c(0x29b),_0x2a41f0,_0x7b4c3a),_0x2a41f0['friendsUnit']()['gainTpFromTpMode']('AllyHpHeal',_0x2a41f0,_0x7b4c3a));},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x23d)]=Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x2a9)],Game_Action[_0x16f5d6(0x20a)]['executeMpDamage']=function(_0x2ba56c,_0x12b073){const _0x554983=_0x16f5d6;VisuMZ[_0x554983(0x27c)][_0x554983(0x23d)][_0x554983(0x318)](this,_0x2ba56c,_0x12b073);const _0x56680e=this[_0x554983(0x34c)]();_0x12b073>0x0?'jFZwa'!==_0x554983(0x301)?(_0x2ba56c[_0x554983(0x349)]('TakeMpDmg',_0x2ba56c,_0x12b073),_0x56680e[_0x554983(0x349)](_0x554983(0x31b),_0x2ba56c,_0x12b073),_0x2ba56c[_0x554983(0x34a)]()[_0x554983(0x349)]('AllyMpDmg',_0x2ba56c,_0x12b073)):_0x3043ee=_0x31a89b[_0x554983(0x243)](_0x45c685,_0x42f907):(_0x12b073=Math['abs'](_0x12b073),_0x2ba56c[_0x554983(0x349)]('TakeMpHeal',_0x2ba56c,_0x12b073),_0x56680e[_0x554983(0x349)](_0x554983(0x27d),_0x2ba56c,_0x12b073),_0x2ba56c[_0x554983(0x34a)]()[_0x554983(0x349)](_0x554983(0x2a5),_0x2ba56c,_0x12b073));},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x293)]=Game_Action['prototype'][_0x16f5d6(0x266)],Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x266)]=function(_0x310601,_0x428897){const _0x19d922=_0x16f5d6;VisuMZ[_0x19d922(0x27c)][_0x19d922(0x293)][_0x19d922(0x318)](this,_0x310601,_0x428897);if(!_0x310601['result']()[_0x19d922(0x2e6)])return;const _0x27de9d=this['subject']();_0x27de9d[_0x19d922(0x2c3)]()===_0x310601[_0x19d922(0x2c3)]()?(_0x27de9d[_0x19d922(0x349)](_0x19d922(0x35b),_0x310601,0x0),_0x310601[_0x19d922(0x349)](_0x19d922(0x34d),_0x310601,0x0)):(_0x27de9d[_0x19d922(0x349)](_0x19d922(0x239),_0x310601,0x0),_0x310601['gainTpFromTpMode'](_0x19d922(0x366),_0x310601,0x0));},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x2eb)]=Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x346)],Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x346)]=function(_0x2b6393,_0x36c963){const _0x1671cf=_0x16f5d6;VisuMZ[_0x1671cf(0x27c)][_0x1671cf(0x2eb)][_0x1671cf(0x318)](this,_0x2b6393,_0x36c963);if(!_0x2b6393[_0x1671cf(0x2fe)]()['success'])return;const _0x3f5d8f=this['subject']();_0x3f5d8f[_0x1671cf(0x2c3)]()===_0x2b6393[_0x1671cf(0x2c3)]()?(_0x3f5d8f[_0x1671cf(0x349)](_0x1671cf(0x276),_0x2b6393,0x0),_0x2b6393[_0x1671cf(0x349)](_0x1671cf(0x297),_0x2b6393,0x0)):'IXGDo'!==_0x1671cf(0x335)?(_0x3f5d8f['gainTpFromTpMode'](_0x1671cf(0x280),_0x2b6393,0x0),_0x2b6393[_0x1671cf(0x349)]('GainEnemyDebuff',_0x2b6393,0x0)):this['changeTextColor'](_0x220a4d[_0x1671cf(0x331)]());},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x2d0)]=Game_Action['prototype'][_0x16f5d6(0x1fb)],Game_Action[_0x16f5d6(0x20a)]['itemEffectAddState']=function(_0x40c45e,_0x4186a9){const _0x30cc79=_0x16f5d6,_0x173aa1=_0x40c45e[_0x30cc79(0x2fe)]()[_0x30cc79(0x2e6)];_0x40c45e[_0x30cc79(0x2fe)]()[_0x30cc79(0x2e6)]=![],VisuMZ[_0x30cc79(0x27c)]['Game_Action_itemEffectAddState']['call'](this,_0x40c45e,_0x4186a9);if(!_0x40c45e['result']()['success']){_0x40c45e[_0x30cc79(0x2fe)]()[_0x30cc79(0x2e6)]=_0x173aa1;return;}const _0x279ff3=this[_0x30cc79(0x34c)]();if(_0x279ff3['isActor']()===_0x40c45e[_0x30cc79(0x2c3)]())_0x279ff3['gainTpFromTpMode'](_0x30cc79(0x21e),_0x40c45e,0x0),_0x40c45e[_0x30cc79(0x349)]('GainAllyState',_0x40c45e,0x0);else{if(_0x30cc79(0x315)===_0x30cc79(0x315))_0x279ff3[_0x30cc79(0x349)]('DealEnemyState',_0x40c45e,0x0),_0x40c45e['gainTpFromTpMode'](_0x30cc79(0x291),_0x40c45e,0x0);else return this[_0x30cc79(0x342)]&&_0x1431d5>=0x0?this['_data'][_0x169584]:null;}},VisuMZ[_0x16f5d6(0x27c)]['Game_Action_applyItemUserEffect']=Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x351)],Game_Action[_0x16f5d6(0x20a)]['applyItemUserEffect']=function(_0x95ff0a){const _0x3d2b78=_0x16f5d6;VisuMZ[_0x3d2b78(0x27c)][_0x3d2b78(0x1fd)][_0x3d2b78(0x318)](this,_0x95ff0a),this[_0x3d2b78(0x254)](_0x95ff0a);},Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x254)]=function(_0x4b5978){const _0x1af391=_0x16f5d6;if(!_0x4b5978)return;const _0x94f1eb=this['item']()[_0x1af391(0x30d)],_0x89d73c=this[_0x1af391(0x34c)]();_0x94f1eb[_0x1af391(0x2e4)](/<CHANGE TARGET TP MODE: (.*)>/i)&&_0x4b5978[_0x1af391(0x2b5)](String(RegExp['$1']));if(!_0x4b5978[_0x1af391(0x2c3)]())return;const _0x2c6f9e=_0x94f1eb[_0x1af391(0x2e4)](/<UNLOCK TP MODE: (.*)>/gi);if(_0x2c6f9e)for(const _0x46b89e of _0x2c6f9e){'NrfQB'!==_0x1af391(0x225)?(_0x10221a[_0x1af391(0x27c)][_0x1af391(0x363)][_0x1af391(0x318)](this),_0x99632c['gainTpFromTpMode'](_0x1af391(0x353),_0x2d0ff3[_0x1af391(0x259)](),0x0)):(_0x46b89e[_0x1af391(0x2e4)](/<UNLOCK TP MODE: (.*)>/i),_0x4b5978[_0x1af391(0x235)](String(RegExp['$1'])));}if(_0x94f1eb[_0x1af391(0x2e4)](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){if(_0x1af391(0x336)!=='JuWTM'){const _0x3be3c4=String(RegExp['$1'])[_0x1af391(0x252)](/[\r\n]+/);for(const _0x56c548 of _0x3be3c4){_0x4b5978[_0x1af391(0x235)](_0x56c548);}}else _0x2f898a[_0x1af391(0x349)](_0x1af391(0x280),_0x5e5c0b,0x0),_0x1d19c9[_0x1af391(0x349)](_0x1af391(0x290),_0x347564,0x0);}},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x21f)]=Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x31f)],Game_Action['prototype'][_0x16f5d6(0x31f)]=function(){const _0x1dfd8f=_0x16f5d6;VisuMZ['EnhancedTP'][_0x1dfd8f(0x21f)]['call'](this),this['applyGlobalEnhancedTP']();},Game_Action[_0x16f5d6(0x20a)][_0x16f5d6(0x250)]=function(){const _0x5b4706=_0x16f5d6,_0x426e85=this[_0x5b4706(0x2fb)]()[_0x5b4706(0x30d)],_0x4c77bd=this[_0x5b4706(0x34c)]();_0x426e85['match'](/<CHANGE USER TP MODE: (.*)>/i)&&(_0x5b4706(0x241)===_0x5b4706(0x241)?_0x4c77bd['changeTpMode'](String(RegExp['$1'])):_0x1f3d7f[_0x5b4706(0x2b5)](_0x3efafa(_0x53e238['$1'])));},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x28a)]=Game_Action['prototype'][_0x16f5d6(0x284)],Game_Action['prototype'][_0x16f5d6(0x284)]=function(_0x4c88f0){const _0xf4d9f4=_0x16f5d6;if(this[_0xf4d9f4(0x2f4)](_0x4c88f0)){if(_0xf4d9f4(0x22f)!=='ckIag')_0x5b7d20['EnhancedTP'][_0xf4d9f4(0x25b)][_0xf4d9f4(0x318)](this,_0x26f186,_0xfbdea6),this[_0xf4d9f4(0x2a1)]==='tp'&&(this['createEnhancedTpChildSprites'](),this[_0xf4d9f4(0x256)]());else return!![];}return VisuMZ[_0xf4d9f4(0x27c)][_0xf4d9f4(0x28a)]['call'](this,_0x4c88f0);},Game_Action[_0x16f5d6(0x20a)]['testApplyEnhancedTP']=function(_0x186d9e){const _0x4cfb44=_0x16f5d6;if(!this[_0x4cfb44(0x2fb)]())return![];const _0x43573b=this['item']()[_0x4cfb44(0x30d)],_0x24aa6d=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x4f5967 of _0x24aa6d){if(_0x43573b[_0x4cfb44(0x2e4)](_0x4f5967))return!![];}return![];},Game_BattlerBase[_0x16f5d6(0x20a)]['initEnhancedTP']=function(){const _0x130ec2=_0x16f5d6;this['changeTpMode'](this[_0x130ec2(0x208)]());},Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x2b5)]=function(_0x523b81){const _0x4639eb=_0x16f5d6;_0x523b81=_0x523b81[_0x4639eb(0x2c1)]()[_0x4639eb(0x218)]();if(!VisuMZ[_0x4639eb(0x27c)][_0x4639eb(0x23a)][_0x523b81])return;this[_0x4639eb(0x345)]=_0x523b81,this['onChangeTpMode'](_0x523b81);},Game_BattlerBase[_0x16f5d6(0x20a)]['defaultTpMode']=function(){const _0x972f69=_0x16f5d6;return VisuMZ[_0x972f69(0x27c)]['Settings']['General'][_0x972f69(0x29e)][_0x972f69(0x2c1)]()[_0x972f69(0x218)]();},Game_BattlerBase['prototype'][_0x16f5d6(0x2c7)]=function(){const _0x264154=_0x16f5d6;if(this[_0x264154(0x345)]===undefined)this[_0x264154(0x294)]();let _0x52ca41=this[_0x264154(0x345)];for(const _0xed8814 of this[_0x264154(0x314)]()){if(!_0xed8814)continue;if(_0xed8814['note'][_0x264154(0x2e4)](/<FORCE TP MODE: (.*)>/i)){const _0x5b249e=String(RegExp['$1'])['toUpperCase']()[_0x264154(0x218)]();if(!VisuMZ['EnhancedTP'][_0x264154(0x23a)][_0x5b249e])continue;_0x52ca41=_0x5b249e;break;}}return VisuMZ['EnhancedTP']['TpModes'][_0x52ca41[_0x264154(0x2c1)]()[_0x264154(0x218)]()];},Game_BattlerBase['prototype'][_0x16f5d6(0x2e0)]=function(_0x21d4b6,_0x369d9a,_0x41b02c){const _0x82680f=_0x16f5d6,_0x11786a=this[_0x82680f(0x2c7)]();if(!_0x11786a)return 0x0;_0x21d4b6=_0x82680f(0x31a)[_0x82680f(0x264)](_0x21d4b6);if(!_0x11786a[_0x21d4b6])return 0x0;return _0x11786a[_0x21d4b6](this,_0x369d9a,_0x41b02c);},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x1f3)]=Game_Battler['prototype']['gainSilentTp'],Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x338)]=function(_0x5d375d){const _0x2adf44=_0x16f5d6;this['_regeneratingTp']?_0x2adf44(0x22a)===_0x2adf44(0x22a)?this[_0x2adf44(0x22d)]=(this[_0x2adf44(0x22d)]+_0x5d375d)['clamp'](0x0,this[_0x2adf44(0x30a)]()):this['commandStyle']()!==_0x2adf44(0x2f0)&&(_0x5e3462=_0x2adf44(0x270)['format'](_0x27b349[_0x2adf44(0x29a)],_0x30c812)):VisuMZ[_0x2adf44(0x27c)][_0x2adf44(0x1f3)][_0x2adf44(0x318)](this,_0x5d375d);},Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x349)]=function(_0x405cdc,_0x258f11,_0x4c58c2){const _0x3e38ef=_0x16f5d6,_0x1ab236=Math[_0x3e38ef(0x321)](this[_0x3e38ef(0x2e0)](_0x405cdc,_0x258f11,_0x4c58c2));this[_0x3e38ef(0x338)](_0x1ab236);},VisuMZ[_0x16f5d6(0x27c)]['Game_BattlerBase_maxTp']=Game_BattlerBase[_0x16f5d6(0x20a)]['maxTp'],Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x30a)]=function(){const _0x9999fb=_0x16f5d6;if(this[_0x9999fb(0x2c7)]())return Math[_0x9999fb(0x321)](this['tpMode']()[_0x9999fb(0x304)](this,this,0x0));return VisuMZ[_0x9999fb(0x27c)][_0x9999fb(0x2c6)][_0x9999fb(0x318)](this);},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x2f9)]=Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x2e7)],Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x2e7)]=function(){const _0x2189af=_0x16f5d6;if(this[_0x2189af(0x2c7)]())return this[_0x2189af(0x2c7)]()[_0x2189af(0x2db)];return VisuMZ[_0x2189af(0x27c)][_0x2189af(0x2f9)][_0x2189af(0x318)](this);},VisuMZ[_0x16f5d6(0x27c)]['Game_BattlerBase_sparam']=Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x36d)],Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x36d)]=function(_0x2365bd){const _0x3a4aab=_0x16f5d6;let _0x48416d=VisuMZ['EnhancedTP'][_0x3a4aab(0x278)][_0x3a4aab(0x318)](this,_0x2365bd);return _0x2365bd===0x5&&this[_0x3a4aab(0x2c7)]()&&(_0x48416d*=this[_0x3a4aab(0x2c7)]()[_0x3a4aab(0x255)]),_0x48416d;},Game_BattlerBase['prototype'][_0x16f5d6(0x263)]=function(){const _0x268d57=_0x16f5d6;if(!Imported[_0x268d57(0x200)])return![];const _0x2528cc=this[_0x268d57(0x2c7)]();if(!_0x2528cc)return![];if(!_0x2528cc[_0x268d57(0x2bc)])return![];const _0x259eda=_0x2528cc[_0x268d57(0x2c0)]||0x0;return this[_0x268d57(0x2cd)]()>=_0x259eda;},Game_BattlerBase['prototype']['tpGaugeFlashSpeed']=function(){const _0x2bf984=_0x16f5d6,_0x1941f6=this[_0x2bf984(0x2c7)]();if(!_0x1941f6)return![];return(_0x1941f6[_0x2bf984(0x34f)]||0x1)['clamp'](0x1,0xff);},Game_BattlerBase[_0x16f5d6(0x20a)][_0x16f5d6(0x358)]=function(){const _0x27e984=_0x16f5d6,_0xeaff1f=this[_0x27e984(0x2c7)]();if(!_0xeaff1f)return![];return(_0xeaff1f['FlashLightness']||0x0)['clamp'](0x0,0xff);},Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x36b)]=function(){},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x273)]=Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x30b)],Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x30b)]=function(_0x5e7e99){const _0x285a3d=_0x16f5d6;VisuMZ['EnhancedTP'][_0x285a3d(0x273)][_0x285a3d(0x318)](this,_0x5e7e99),this[_0x285a3d(0x349)](_0x285a3d(0x205),this,0x0);},VisuMZ[_0x16f5d6(0x27c)]['Game_Battler_useItem']=Game_Battler[_0x16f5d6(0x20a)]['useItem'],Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x212)]=function(_0x7b305a){const _0x34c89a=_0x16f5d6;VisuMZ[_0x34c89a(0x27c)][_0x34c89a(0x32e)][_0x34c89a(0x318)](this,_0x7b305a),this['skillIsNotAttackGuard'](_0x7b305a)&&this[_0x34c89a(0x349)]('UseSkill',this,0x0),DataManager[_0x34c89a(0x1ec)](_0x7b305a)&&(_0x34c89a(0x267)==='nQVSS'?(!this['_tpGaugeBack'][_0x34c89a(0x240)]&&(this[_0x34c89a(0x33f)][_0x34c89a(0x240)]=new _0x243c9c(this[_0x34c89a(0x240)][_0x34c89a(0x2ed)],this[_0x34c89a(0x240)][_0x34c89a(0x295)])),!this[_0x34c89a(0x324)]['bitmap']&&(this[_0x34c89a(0x324)]['bitmap']=new _0x1f7f9c(this['bitmap']['width'],this[_0x34c89a(0x240)][_0x34c89a(0x295)])),_0xc93b47&&(this[_0x34c89a(0x33f)]['bitmap'][_0x34c89a(0x2cf)](),this[_0x34c89a(0x324)][_0x34c89a(0x240)]['clear']())):this[_0x34c89a(0x349)](_0x34c89a(0x26c),this,0x0));},Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x1eb)]=function(_0x4e1591){const _0x165432=_0x16f5d6;if(!_0x4e1591)return![];if(!DataManager[_0x165432(0x2b6)](_0x4e1591))return![];if(_0x4e1591['id']===this[_0x165432(0x2a0)]())return![];if(_0x4e1591['id']===this[_0x165432(0x244)]())return![];return!![];},VisuMZ[_0x16f5d6(0x27c)]['Game_Battler_regenerateTp']=Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x305)],Game_Battler[_0x16f5d6(0x20a)][_0x16f5d6(0x305)]=function(){const _0x35a113=_0x16f5d6;if(!$gameParty[_0x35a113(0x2bf)]()){if(_0x35a113(0x28f)!=='GStTD')return![];else{_0x3bf136[_0x35a113(0x27c)]['Game_Action_itemEffectAddBuff']['call'](this,_0x172a4f,_0x4af4ed);if(!_0x2f756a['result']()[_0x35a113(0x2e6)])return;const _0x5e8669=this['subject']();_0x5e8669[_0x35a113(0x2c3)]()===_0x316011[_0x35a113(0x2c3)]()?(_0x5e8669[_0x35a113(0x349)](_0x35a113(0x35b),_0x1a04de,0x0),_0x1ddb8b['gainTpFromTpMode'](_0x35a113(0x34d),_0x444ae5,0x0)):(_0x5e8669[_0x35a113(0x349)](_0x35a113(0x239),_0x4c79c4,0x0),_0x12d352[_0x35a113(0x349)](_0x35a113(0x366),_0x2b97a5,0x0));}};this[_0x35a113(0x26b)]=!![];const _0xc8e2c1=Math['floor'](this['maxTp']()*this['trg']);this[_0x35a113(0x338)](_0xc8e2c1),this[_0x35a113(0x349)]('TpRegen',this,0x0);if(this[_0x35a113(0x354)]<this[_0x35a113(0x213)]/0x4){if(_0x35a113(0x2a6)!==_0x35a113(0x2a6))return _0x153e30['status']&&_0x5c1985['description']['includes']('['+_0x116b81+']');else this[_0x35a113(0x349)](_0x35a113(0x2ad),this,0x0);}this['_hp']>=this[_0x35a113(0x213)]&&this['gainTpFromTpMode'](_0x35a113(0x2c9),this,0x0);if(this[_0x35a113(0x1f9)]<this[_0x35a113(0x302)]/0x4){if(_0x35a113(0x33e)!==_0x35a113(0x33e))for(const _0xb3612b of _0x2d691a){_0xb3612b['match'](/<LEARN TP MODE: (.*)>/i),this['learnTpMode'](_0x1da391(_0xcda981['$1']));}else this['gainTpFromTpMode']('CriticalMp',this,0x0);}if(this['_mp']>=this[_0x35a113(0x302)]){if(_0x35a113(0x319)!==_0x35a113(0x319)){_0x590b81[_0x35a113(0x27c)][_0x35a113(0x22c)][_0x35a113(0x318)](this);if(this[_0x35a113(0x24d)])this[_0x35a113(0x24d)][_0x35a113(0x238)](this[_0x35a113(0x206)]());}else this['gainTpFromTpMode'](_0x35a113(0x20f),this,0x0);}this[_0x35a113(0x34a)]()[_0x35a113(0x217)]()[_0x35a113(0x365)]<=0x1&&this[_0x35a113(0x349)]('OnlyMember',this,0x0),this[_0x35a113(0x26b)]=undefined,this[_0x35a113(0x1ef)]();},Game_Battler[_0x16f5d6(0x20a)]['chargeTpByDamage']=function(_0x4c6d5a){},VisuMZ[_0x16f5d6(0x27c)]['Game_Battler_addState']=Game_Battler[_0x16f5d6(0x20a)]['addState'],Game_Battler['prototype'][_0x16f5d6(0x229)]=function(_0x41ed74){const _0x1c611d=_0x16f5d6,_0x5c9c52=this[_0x1c611d(0x265)]();VisuMZ[_0x1c611d(0x27c)][_0x1c611d(0x2d1)][_0x1c611d(0x318)](this,_0x41ed74),_0x41ed74===this[_0x1c611d(0x35d)]()&&this[_0x1c611d(0x322)]()&&_0x5c9c52&&(this[_0x1c611d(0x34a)]()['gainTpFromTpMode']('KillAlly',this,0x0),this['opponentsUnit']()[_0x1c611d(0x349)](_0x1c611d(0x25e),this,0x0));},Game_Battler['prototype']['onChangeTpMode']=function(_0x55034e){const _0x54f232=_0x16f5d6;this[_0x54f232(0x32c)]={},this['_tp']=Math[_0x54f232(0x287)](this[_0x54f232(0x22d)],this[_0x54f232(0x30a)]());},VisuMZ[_0x16f5d6(0x27c)]['Game_Actor_setup']=Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x320)],Game_Actor[_0x16f5d6(0x20a)]['setup']=function(_0x3dc2e2){const _0x1467a3=_0x16f5d6;VisuMZ[_0x1467a3(0x27c)]['Game_Actor_setup'][_0x1467a3(0x318)](this,_0x3dc2e2),this[_0x1467a3(0x294)]();},Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x294)]=function(){const _0x47cca8=_0x16f5d6;this['_availableTpModes']=[],Game_Battler[_0x47cca8(0x20a)][_0x47cca8(0x294)][_0x47cca8(0x318)](this),this[_0x47cca8(0x2ea)](),this['learnAvailableActorTpModes']();},Game_Actor['prototype'][_0x16f5d6(0x208)]=function(){const _0x4f683d=_0x16f5d6;if(this[_0x4f683d(0x206)]()&&this[_0x4f683d(0x206)]()[_0x4f683d(0x30d)]['match'](/<TP MODE: (.*)>/i))return String(RegExp['$1'])[_0x4f683d(0x2c1)]()['trim']();else{if(_0x4f683d(0x24a)===_0x4f683d(0x2fd))_0x3d96ff=_0x24e3b3[_0x4f683d(0x316)](_0x1dffd0),_0x3ca07[_0x4f683d(0x349)](_0x4f683d(0x359),_0x3481be,_0x14f9d6),_0x23a398['gainTpFromTpMode'](_0x4f683d(0x27d),_0x3b075d,_0x240daf),_0x4c847a['friendsUnit']()['gainTpFromTpMode'](_0x4f683d(0x2a5),_0x1a9a1c,_0x468099);else return Game_Battler[_0x4f683d(0x20a)][_0x4f683d(0x208)][_0x4f683d(0x318)](this);}},Game_Actor['prototype']['onChangeTpMode']=function(_0x20da54){const _0x245a81=_0x16f5d6;_0x20da54=_0x20da54[_0x245a81(0x2c1)]()[_0x245a81(0x218)](),Game_Battler[_0x245a81(0x20a)][_0x245a81(0x272)]['call'](this,_0x20da54),this[_0x245a81(0x235)](_0x20da54);},Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x235)]=function(_0x3c3b1b){const _0x1d82c1=_0x16f5d6;_0x3c3b1b=_0x3c3b1b[_0x1d82c1(0x2c1)]()[_0x1d82c1(0x218)]();if(!VisuMZ[_0x1d82c1(0x27c)][_0x1d82c1(0x23a)][_0x3c3b1b])return;this[_0x1d82c1(0x21d)]=this['_availableTpModes']||[],!this[_0x1d82c1(0x21d)][_0x1d82c1(0x220)](_0x3c3b1b)&&('RisiB'===_0x1d82c1(0x25d)?(this[_0x1d82c1(0x21d)][_0x1d82c1(0x327)](_0x3c3b1b),this[_0x1d82c1(0x2e5)]()):this[_0x1d82c1(0x26b)]?this[_0x1d82c1(0x22d)]=(this[_0x1d82c1(0x22d)]+_0x249d0c)[_0x1d82c1(0x223)](0x0,this[_0x1d82c1(0x30a)]()):_0x39a58b['EnhancedTP'][_0x1d82c1(0x1f3)][_0x1d82c1(0x318)](this,_0xaa70a));},VisuMZ['EnhancedTP']['sortTpModes']=function(_0x1f6a94){const _0x4177ba=_0x16f5d6,_0x19dd4e=[];for(const _0xa438fd of VisuMZ['EnhancedTP'][_0x4177ba(0x1f7)]){if(_0x1f6a94[_0x4177ba(0x220)](_0xa438fd))_0x19dd4e[_0x4177ba(0x327)](_0xa438fd);}return _0x19dd4e;},Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x2e5)]=function(){const _0x22fd75=_0x16f5d6;if(this['_availableTpModes']===undefined)this['initEnhancedTP']();this[_0x22fd75(0x21d)]=VisuMZ['EnhancedTP'][_0x22fd75(0x2e5)](this[_0x22fd75(0x21d)]);},Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x26a)]=function(){const _0x42f390=_0x16f5d6;if(this[_0x42f390(0x21d)]===undefined)this[_0x42f390(0x294)]();this[_0x42f390(0x2ea)]();let _0x3fa6b0=this[_0x42f390(0x21d)]['map'](_0x1522db=>VisuMZ['EnhancedTP'][_0x42f390(0x23a)][_0x1522db]);return _0x3fa6b0[_0x42f390(0x20c)](null);},Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x2ea)]=function(){const _0x3307de=_0x16f5d6;for(const _0x4a8b0c of $gameParty[_0x3307de(0x2bb)]()){_0x3307de(0x367)!==_0x3307de(0x367)?(this[_0x3307de(0x24d)]['activate'](),this[_0x3307de(0x24d)]['selectLast']()):this[_0x3307de(0x235)](_0x4a8b0c[_0x3307de(0x2c1)]()[_0x3307de(0x218)]());}},Game_Actor['prototype'][_0x16f5d6(0x283)]=function(){const _0x8c55e7=_0x16f5d6;if(this['actor']()&&this[_0x8c55e7(0x206)]()[_0x8c55e7(0x30d)][_0x8c55e7(0x2e4)](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){if(_0x8c55e7(0x260)!==_0x8c55e7(0x260))_0x1704f0[_0x8c55e7(0x27c)][_0x8c55e7(0x20d)]['call'](this,_0x44ddb1),this['initEnhancedTP']();else{const _0x40f832=String(RegExp['$1'])[_0x8c55e7(0x252)](/[\r\n]+/);for(const _0x261953 of _0x40f832){this[_0x8c55e7(0x235)](_0x261953['toUpperCase']()['trim']());}}}},VisuMZ['EnhancedTP'][_0x16f5d6(0x24f)]=Game_Actor['prototype'][_0x16f5d6(0x333)],Game_Actor[_0x16f5d6(0x20a)][_0x16f5d6(0x333)]=function(_0x34cfe9){const _0x235949=_0x16f5d6;VisuMZ['EnhancedTP'][_0x235949(0x24f)][_0x235949(0x318)](this,_0x34cfe9),this[_0x235949(0x309)](_0x34cfe9);},Game_Actor[_0x16f5d6(0x20a)]['learnSkillEnhancedTP']=function(_0x24fabb){const _0xc1727=_0x16f5d6;if(!$dataSkills[_0x24fabb])return;const _0x6195f=$dataSkills[_0x24fabb]['note'],_0x4819b4=_0x6195f[_0xc1727(0x2e4)](/<LEARN TP MODE: (.*)>/gi);if(_0x4819b4)for(const _0x18dbff of _0x4819b4){_0x18dbff['match'](/<LEARN TP MODE: (.*)>/i),this[_0xc1727(0x235)](String(RegExp['$1']));}if(_0x6195f['match'](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x7f14c8=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0xac9adf of _0x7f14c8){_0xc1727(0x350)===_0xc1727(0x28b)?this['_tp']=(this[_0xc1727(0x22d)]+_0x5a0157)[_0xc1727(0x223)](0x0,this[_0xc1727(0x30a)]()):this[_0xc1727(0x235)](_0xac9adf);}}},Game_Enemy[_0x16f5d6(0x20a)]['defaultTpMode']=function(){const _0x565f08=_0x16f5d6;return this[_0x565f08(0x1fe)]()[_0x565f08(0x30d)][_0x565f08(0x2e4)](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x565f08(0x2c1)]()[_0x565f08(0x218)]():Game_Battler['prototype']['defaultTpMode'][_0x565f08(0x318)](this);},Game_Unit[_0x16f5d6(0x20a)][_0x16f5d6(0x349)]=function(_0xd491ee,_0x482b89,_0x2b1665){const _0x5ba91d=_0x16f5d6;for(const _0x4081c1 of this[_0x5ba91d(0x217)]()){if(!_0x4081c1)continue;_0x4081c1[_0x5ba91d(0x349)](_0xd491ee,_0x482b89,_0x2b1665);}},VisuMZ['EnhancedTP'][_0x16f5d6(0x2ac)]=Game_Party[_0x16f5d6(0x20a)][_0x16f5d6(0x30e)],Game_Party[_0x16f5d6(0x20a)][_0x16f5d6(0x30e)]=function(){const _0xb60d91=_0x16f5d6;VisuMZ[_0xb60d91(0x27c)][_0xb60d91(0x2ac)][_0xb60d91(0x318)](this),this[_0xb60d91(0x2ff)]();},Game_Party[_0x16f5d6(0x20a)][_0x16f5d6(0x2ff)]=function(){const _0xf76a82=_0x16f5d6;this['_tpModes']=[];for(const _0x17662e of VisuMZ[_0xf76a82(0x27c)][_0xf76a82(0x352)][_0xf76a82(0x2ee)][_0xf76a82(0x30f)]){this[_0xf76a82(0x362)][_0xf76a82(0x327)](_0x17662e['toUpperCase']()[_0xf76a82(0x218)]());}},Game_Party[_0x16f5d6(0x20a)][_0x16f5d6(0x2bb)]=function(){const _0x2adbd3=_0x16f5d6;if(this['_tpModes']===undefined)this[_0x2adbd3(0x2ff)]();return this[_0x2adbd3(0x362)];},VisuMZ[_0x16f5d6(0x27c)]['Scene_Skill_create']=Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x2ab)],Scene_Skill[_0x16f5d6(0x20a)]['create']=function(){const _0x246e41=_0x16f5d6;VisuMZ[_0x246e41(0x27c)][_0x246e41(0x234)][_0x246e41(0x318)](this),this[_0x246e41(0x27e)]();},VisuMZ[_0x16f5d6(0x27c)]['Scene_Skill_createSkillTypeWindow']=Scene_Skill['prototype'][_0x16f5d6(0x2d2)],Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x2d2)]=function(){const _0x215184=_0x16f5d6;VisuMZ[_0x215184(0x27c)][_0x215184(0x2e3)][_0x215184(0x318)](this),this['_skillTypeWindow'][_0x215184(0x216)](_0x215184(0x2c7),this['commandTpMode']['bind'](this));},Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x27e)]=function(){const _0x490831=_0x16f5d6,_0xb2d441=this[_0x490831(0x364)]();this[_0x490831(0x24d)]=new Window_TpModes(_0xb2d441),this[_0x490831(0x24d)][_0x490831(0x21a)](this['_helpWindow']),this[_0x490831(0x24d)][_0x490831(0x216)]('ok',this['onTpModeOk'][_0x490831(0x2d9)](this)),this[_0x490831(0x24d)][_0x490831(0x216)]('cancel',this['onTpModeCancel'][_0x490831(0x2d9)](this)),this[_0x490831(0x2dc)](this[_0x490831(0x24d)]);const _0x89ef35=VisuMZ[_0x490831(0x27c)]['Settings'][_0x490831(0x2ee)][_0x490831(0x262)];this[_0x490831(0x24d)][_0x490831(0x2bd)](_0x89ef35||0x0);},Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x364)]=function(){const _0x4cd1dd=_0x16f5d6,_0x25e7ee=0x0,_0x2e4ab1=this[_0x4cd1dd(0x36c)]['y']+this[_0x4cd1dd(0x36c)][_0x4cd1dd(0x295)],_0x4bc7e6=Graphics[_0x4cd1dd(0x2b4)],_0x8d3871=this[_0x4cd1dd(0x31d)]()-this[_0x4cd1dd(0x36c)]['height'];return new Rectangle(_0x25e7ee,_0x2e4ab1,_0x4bc7e6,_0x8d3871);},Scene_Skill['prototype'][_0x16f5d6(0x2ba)]=function(){const _0x391118=_0x16f5d6;this[_0x391118(0x24d)][_0x391118(0x253)](),this[_0x391118(0x24d)][_0x391118(0x236)]();},Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x2c2)]=function(){const _0x2d79e0=_0x16f5d6;this['_tpModeWindow'][_0x2d79e0(0x253)]();const _0x57dd40=this[_0x2d79e0(0x24d)][_0x2d79e0(0x2fb)]();if(!_0x57dd40)return;this[_0x2d79e0(0x206)]()['changeTpMode'](_0x57dd40['Name']),this['_tpModeWindow'][_0x2d79e0(0x1ef)](),this[_0x2d79e0(0x36c)][_0x2d79e0(0x1ef)]();},Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x2d5)]=function(){const _0x2fa464=_0x16f5d6;this[_0x2fa464(0x24d)][_0x2fa464(0x311)](),this['_skillTypeWindow'][_0x2fa464(0x253)]();},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x22c)]=Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x361)],Scene_Skill[_0x16f5d6(0x20a)][_0x16f5d6(0x361)]=function(){const _0x16ffc5=_0x16f5d6;VisuMZ[_0x16ffc5(0x27c)]['Scene_Skill_refreshActor'][_0x16ffc5(0x318)](this);if(this[_0x16ffc5(0x24d)])this['_tpModeWindow'][_0x16ffc5(0x238)](this['actor']());},VisuMZ[_0x16f5d6(0x27c)]['Sprite_Gauge_setup']=Sprite_Gauge[_0x16f5d6(0x20a)]['setup'],Sprite_Gauge[_0x16f5d6(0x20a)]['setup']=function(_0x841205,_0x2db89f){const _0x563bd5=_0x16f5d6;VisuMZ['EnhancedTP'][_0x563bd5(0x25b)][_0x563bd5(0x318)](this,_0x841205,_0x2db89f),this[_0x563bd5(0x2a1)]==='tp'&&(this['createEnhancedTpChildSprites'](),this[_0x563bd5(0x256)]());},Sprite_Gauge['prototype'][_0x16f5d6(0x257)]=function(){const _0x2e4836=_0x16f5d6;!this[_0x2e4836(0x33f)]&&(this['_tpGaugeBack']=new Sprite(),this[_0x2e4836(0x2b7)](this['_tpGaugeBack']));if(!this['_tpGaugeSprite']){if('eYBqO'!==_0x2e4836(0x23f))return _0x9ff875(_0x1054fe['$1'])[_0x2e4836(0x2c1)]()[_0x2e4836(0x218)]();else this[_0x2e4836(0x324)]=new Sprite(),this[_0x2e4836(0x2b7)](this[_0x2e4836(0x324)]);}!this[_0x2e4836(0x303)]&&(this['_tpTextSprite']=new Sprite(),this[_0x2e4836(0x2b7)](this[_0x2e4836(0x303)]));},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x33c)]=Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x356)],Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x356)]=function(){const _0x1ce125=_0x16f5d6;let _0x18fe85=$dataSystem[_0x1ce125(0x209)]['basic'][0x7];this['_statusType']==='tp'&&this['changeBattlerTpLabel'](),VisuMZ['EnhancedTP'][_0x1ce125(0x33c)][_0x1ce125(0x318)](this),this[_0x1ce125(0x2a1)]==='tp'&&(_0x1ce125(0x251)!==_0x1ce125(0x36a)?this[_0x1ce125(0x2b1)]():_0x54b7a5[_0x1ce125(0x349)](_0x1ce125(0x2d7),_0x2331bd,0x0)),this[_0x1ce125(0x2a1)]==='tp'&&($dataSystem[_0x1ce125(0x209)]['basic'][0x7]=_0x18fe85);},Sprite_Gauge['prototype']['redrawEnhancedTp']=function(){const _0xe064d9=_0x16f5d6;this['_tpTextSprite']&&(this[_0xe064d9(0x303)][_0xe064d9(0x240)]=this[_0xe064d9(0x240)]),this['setFrame'](0x0,0x0,0x0,0x0);},VisuMZ[_0x16f5d6(0x27c)]['Sprite_Gauge_drawFullGauge']=Sprite_Gauge['prototype'][_0x16f5d6(0x292)],Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x292)]=function(_0x5a9cdf,_0x190ae0,_0x1c02ed,_0x2fd85b,_0x41d63a,_0x35c5c3){const _0x548d77=_0x16f5d6;this['_statusType']==='tp'&&this[_0x548d77(0x324)]?this[_0x548d77(0x247)](_0x5a9cdf,_0x190ae0,_0x1c02ed,_0x2fd85b,_0x41d63a,_0x35c5c3):_0x548d77(0x2aa)==='abZpm'?VisuMZ['EnhancedTP'][_0x548d77(0x2be)][_0x548d77(0x318)](this,_0x5a9cdf,_0x190ae0,_0x1c02ed,_0x2fd85b,_0x41d63a,_0x35c5c3):this[_0x548d77(0x235)](_0xc68393[_0x548d77(0x2c1)]()[_0x548d77(0x218)]());},Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x237)]=function(_0x4c60b1){const _0x135cfd=_0x16f5d6;if(!this[_0x135cfd(0x33f)]['bitmap']){if(_0x135cfd(0x29d)===_0x135cfd(0x29d))this[_0x135cfd(0x33f)]['bitmap']=new Bitmap(this['bitmap'][_0x135cfd(0x2ed)],this[_0x135cfd(0x240)]['height']);else{const _0x38eb61=_0x13e4de(_0x2909f2['$1'])[_0x135cfd(0x252)](/[\r\n]+/);for(const _0x3cdf48 of _0x38eb61){this['learnTpMode'](_0x3cdf48[_0x135cfd(0x2c1)]()['trim']());}}}!this[_0x135cfd(0x324)][_0x135cfd(0x240)]&&(this[_0x135cfd(0x324)][_0x135cfd(0x240)]=new Bitmap(this[_0x135cfd(0x240)][_0x135cfd(0x2ed)],this['bitmap'][_0x135cfd(0x295)])),_0x4c60b1&&(this[_0x135cfd(0x33f)][_0x135cfd(0x240)]['clear'](),this[_0x135cfd(0x324)]['bitmap'][_0x135cfd(0x2cf)]());},Sprite_Gauge['prototype']['drawFullGaugeEnhancedTp']=function(_0x2e207d,_0x1f2d4b,_0x182702,_0x3d4376,_0x27a02e,_0x4154b1){const _0x1f6783=_0x16f5d6;this[_0x1f6783(0x237)](!![]);const _0x4b7702=this[_0x1f6783(0x2cb)](),_0x33830c=Math['floor']((_0x27a02e-0x2)*_0x4b7702),_0x34025f=_0x4154b1-0x2,_0x17bb86=this['gaugeBackColor']();this[_0x1f6783(0x33f)]['bitmap'][_0x1f6783(0x258)](_0x182702,_0x3d4376,_0x27a02e,_0x4154b1,_0x17bb86),_0x2e207d=this[_0x1f6783(0x1fa)](_0x2e207d,0x1),_0x1f2d4b=this[_0x1f6783(0x1fa)](_0x1f2d4b,0x2),this[_0x1f6783(0x324)][_0x1f6783(0x240)][_0x1f6783(0x35e)](_0x182702+0x1,_0x3d4376+0x1,_0x33830c,_0x34025f,_0x2e207d,_0x1f2d4b);},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x32b)]=Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x33b)],Sprite_Gauge['prototype'][_0x16f5d6(0x33b)]=function(_0x2d46e5,_0x472807,_0x139312,_0x3425db){const _0x18fdf6=_0x16f5d6;if(this[_0x18fdf6(0x2a1)]==='tp'&&this[_0x18fdf6(0x324)]){if('NiGkO'===_0x18fdf6(0x2a3))this[_0x18fdf6(0x32f)](_0x2d46e5,_0x472807,_0x139312,_0x3425db);else{const _0x33a899=_0x3747a6(_0x6ad34b['$1'])[_0x18fdf6(0x252)](/[\r\n]+/);for(const _0x35b0bb of _0x33a899){this[_0x18fdf6(0x235)](_0x35b0bb);}}}else _0x18fdf6(0x23e)!==_0x18fdf6(0x23e)?_0x3d2694[_0x18fdf6(0x27c)][_0x18fdf6(0x32b)][_0x18fdf6(0x318)](this,_0x227e72,_0x5564bc,_0x30bb72,_0x3709ce):VisuMZ[_0x18fdf6(0x27c)][_0x18fdf6(0x32b)][_0x18fdf6(0x318)](this,_0x2d46e5,_0x472807,_0x139312,_0x3425db);},Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x32f)]=function(_0x427573,_0x43970d,_0x28de4c,_0x3d6426){const _0x1b22f5=_0x16f5d6;this['createTpGaugeBitmaps'](!![]);const _0x141d34=this[_0x1b22f5(0x2cb)](),_0x203ec8=Math['floor']((_0x28de4c-0x2)*_0x141d34),_0x3e6f75=_0x3d6426-0x2,_0x450547=this[_0x1b22f5(0x34b)](),_0x2a3d5a=this['changeTpCustomColor'](this['gaugeColor1'](),0x1),_0x5ee998=this['changeTpCustomColor'](this[_0x1b22f5(0x32a)](),0x2);this[_0x1b22f5(0x33f)][_0x1b22f5(0x240)][_0x1b22f5(0x258)](_0x427573,_0x43970d,_0x28de4c,_0x3d6426,_0x450547),this['_tpGaugeSprite']['bitmap'][_0x1b22f5(0x35e)](_0x427573+0x1,_0x43970d+0x1,_0x203ec8,_0x3e6f75,_0x2a3d5a,_0x5ee998);},VisuMZ['EnhancedTP'][_0x16f5d6(0x25a)]=Sprite_Gauge[_0x16f5d6(0x20a)]['update'],Sprite_Gauge[_0x16f5d6(0x20a)]['update']=function(){const _0x839307=_0x16f5d6;VisuMZ[_0x839307(0x27c)]['Sprite_Gauge_update'][_0x839307(0x318)](this),this[_0x839307(0x2a2)]();},Sprite_Gauge['prototype']['updateEnhancedTp']=function(){const _0x576183=_0x16f5d6;if(this['_statusType']!=='tp')return;if(!this['_tpGaugeSprite'])return;if(!this[_0x576183(0x2a8)])return;const _0x36ca77=this['_battler'][_0x576183(0x2c7)]();this[_0x576183(0x228)]!==_0x36ca77&&(this['_tpModeCache']=_0x36ca77,this['redraw']());if(this['_battler'][_0x576183(0x263)]()){if(_0x576183(0x31c)==='voRjv'){if(!this[_0x576183(0x2a8)])return;const _0x140d29=this['_battler'][_0x576183(0x2c7)]();_0x140d29['CustomLabel']&&(_0x33cb03[_0x576183(0x209)][_0x576183(0x2dd)][0x7]=_0x140d29[_0x576183(0x1f8)][_0x576183(0x218)]());}else{const _0x483342=this[_0x576183(0x2a8)][_0x576183(0x2e8)]();this[_0x576183(0x324)][_0x576183(0x22b)](this[_0x576183(0x324)][_0x576183(0x2df)]+_0x483342);const _0x4be33a=this[_0x576183(0x2a8)][_0x576183(0x358)]();this[_0x576183(0x324)]['setBlendColor']([0xff,0xff,0xff,_0x4be33a]);}}else this[_0x576183(0x324)][_0x576183(0x313)]([0xff,0xff,0xff,0x0]),this[_0x576183(0x324)]['setHue'](0x0);},Sprite_Gauge['prototype'][_0x16f5d6(0x2c4)]=function(){const _0xa05e2a=_0x16f5d6;if(!this[_0xa05e2a(0x2a8)])return;const _0x240d95=this['_battler'][_0xa05e2a(0x2c7)]();if(_0x240d95[_0xa05e2a(0x1f8)]){if(_0xa05e2a(0x31e)!=='QqYdd')$dataSystem[_0xa05e2a(0x209)]['basic'][0x7]=_0x240d95[_0xa05e2a(0x1f8)][_0xa05e2a(0x218)]();else{if(!_0x4ac0b0['VisuMZ_1_SkillsStatesCore'])return![];const _0x4ed27d=this[_0xa05e2a(0x2c7)]();if(!_0x4ed27d)return![];if(!_0x4ed27d[_0xa05e2a(0x2bc)])return![];const _0x9400c6=_0x4ed27d[_0xa05e2a(0x2c0)]||0x0;return this[_0xa05e2a(0x2cd)]()>=_0x9400c6;}}},Sprite_Gauge[_0x16f5d6(0x20a)][_0x16f5d6(0x1fa)]=function(_0x100df6,_0x2d9129){const _0x54f11e=_0x16f5d6;if(!this['_battler'])return _0x100df6;const _0x3dfaa9=this[_0x54f11e(0x2a8)]['tpMode'](),_0x4ab53f=_0x54f11e(0x21c)['format'](_0x2d9129);if(_0x3dfaa9[_0x4ab53f])return ColorManager[_0x54f11e(0x277)](_0x3dfaa9[_0x4ab53f]);else{if('Ghtge'!==_0x54f11e(0x337))return _0x100df6;else _0x5d42d1[_0x54f11e(0x235)](_0x162e24);}},Window_Base[_0x16f5d6(0x20a)][_0x16f5d6(0x203)]=function(_0x281833,_0x284d67,_0x13d92,_0x2e0abe,_0x1c6867){const _0x22f8e1=_0x16f5d6;if(!_0x281833)return;const _0x5a1c8c=_0x13d92+(this['lineHeight']()-ImageManager[_0x22f8e1(0x27b)])/0x2,_0x95929e=ImageManager[_0x22f8e1(0x323)]+0x4,_0x398e5e=Math[_0x22f8e1(0x243)](0x0,_0x2e0abe-_0x95929e);this[_0x22f8e1(0x308)](),_0x1c6867&&_0x1c6867[_0x22f8e1(0x2c7)]()===_0x281833&&this[_0x22f8e1(0x329)](ColorManager[_0x22f8e1(0x331)]()),this[_0x22f8e1(0x2da)](_0x281833[_0x22f8e1(0x2f1)],_0x284d67,_0x5a1c8c),this[_0x22f8e1(0x233)](_0x281833[_0x22f8e1(0x347)],_0x284d67+_0x95929e,_0x13d92,_0x398e5e);},VisuMZ[_0x16f5d6(0x27c)][_0x16f5d6(0x33d)]=Window_SkillType['prototype'][_0x16f5d6(0x1fc)],Window_SkillType[_0x16f5d6(0x20a)][_0x16f5d6(0x1fc)]=function(){const _0x3e4f64=_0x16f5d6;VisuMZ[_0x3e4f64(0x27c)]['Window_SkillType_makeCommandList'][_0x3e4f64(0x318)](this),this[_0x3e4f64(0x24b)]();},Window_SkillType[_0x16f5d6(0x20a)][_0x16f5d6(0x24b)]=function(){const _0x32fe6b=_0x16f5d6;if(!this[_0x32fe6b(0x2ec)]())return;let _0x3c3ddb=TextManager[_0x32fe6b(0x26f)][_0x32fe6b(0x264)](TextManager['tp']);Imported[_0x32fe6b(0x200)]&&(this[_0x32fe6b(0x2f3)]()!==_0x32fe6b(0x2f0)&&(_0x32fe6b(0x334)===_0x32fe6b(0x334)?_0x3c3ddb=_0x32fe6b(0x270)[_0x32fe6b(0x264)](ImageManager[_0x32fe6b(0x29a)],_0x3c3ddb):this['learnTpMode'](_0x592ca6['toUpperCase']()['trim']()))),this[_0x32fe6b(0x306)](_0x3c3ddb,'tpMode',!![],_0x32fe6b(0x2c7));},Window_SkillType[_0x16f5d6(0x20a)][_0x16f5d6(0x2ec)]=function(){const _0x1504c5=_0x16f5d6;return $gameSystem[_0x1504c5(0x310)]();},VisuMZ[_0x16f5d6(0x27c)]['Window_SkillList_setStypeId']=Window_SkillList[_0x16f5d6(0x20a)][_0x16f5d6(0x357)],Window_SkillList[_0x16f5d6(0x20a)]['setStypeId']=function(_0x354d6e){const _0x719af5=_0x16f5d6,_0x111faa=this[_0x719af5(0x27f)]!==_0x354d6e;if(!_0x111faa)return;this[_0x719af5(0x2f6)]();const _0xfaa0e7=SceneManager[_0x719af5(0x368)][_0x719af5(0x24d)];if(_0xfaa0e7)_0xfaa0e7['hide']();const _0x175a2c=this[_0x719af5(0x36c)];if(_0x175a2c)_0x175a2c['show']();VisuMZ[_0x719af5(0x27c)][_0x719af5(0x326)]['call'](this,_0x354d6e);if(_0x111faa&&_0xfaa0e7&&_0x354d6e===_0x719af5(0x2c7)){if(_0x175a2c)_0x175a2c['hide']();this['hide'](),_0xfaa0e7[_0x719af5(0x2f6)]();}};function Window_TpModes(){this['initialize'](...arguments);}Window_TpModes[_0x16f5d6(0x20a)]=Object[_0x16f5d6(0x2ab)](Window_Selectable[_0x16f5d6(0x20a)]),Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x312)]=Window_TpModes,Window_TpModes['prototype'][_0x16f5d6(0x30e)]=function(_0x522c4e){const _0x2c2094=_0x16f5d6;Window_Selectable[_0x2c2094(0x20a)][_0x2c2094(0x30e)]['call'](this,_0x522c4e),this[_0x2c2094(0x35a)]=null,this['_data']=[],this[_0x2c2094(0x20e)]();},Window_TpModes['prototype'][_0x16f5d6(0x238)]=function(_0x4265a6){const _0x26802f=_0x16f5d6;this[_0x26802f(0x35a)]!==_0x4265a6&&(this['_actor']=_0x4265a6,this[_0x26802f(0x1ef)](),this['scrollTo'](0x0,0x0));},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x360)]=function(){return 0x2;},Window_TpModes[_0x16f5d6(0x20a)]['colSpacing']=function(){return 0x10;},Window_TpModes[_0x16f5d6(0x20a)]['maxItems']=function(){const _0x4678a1=_0x16f5d6;return this['_data']?this[_0x4678a1(0x342)][_0x4678a1(0x365)]:0x1;},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x2fb)]=function(){const _0x1729af=_0x16f5d6;return this[_0x1729af(0x1ee)](this[_0x1729af(0x29c)]());},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x1ee)]=function(_0x783945){const _0xba8630=_0x16f5d6;return this[_0xba8630(0x342)]&&_0x783945>=0x0?this[_0xba8630(0x342)][_0x783945]:null;},Window_TpModes['prototype'][_0x16f5d6(0x22e)]=function(){const _0x55ccf8=_0x16f5d6;this[_0x55ccf8(0x35a)]?'IZelp'!==_0x55ccf8(0x341)?(_0x14d3a5[_0x55ccf8(0x2e4)](/<UNLOCK TP MODE: (.*)>/i),_0x4c944a[_0x55ccf8(0x235)](_0x2712ac(_0x455409['$1']))):this[_0x55ccf8(0x342)]=this[_0x55ccf8(0x35a)]['availableTpModes']():'TCIdc'==='TCIdc'?this[_0x55ccf8(0x342)]=[]:this[_0x55ccf8(0x303)][_0x55ccf8(0x240)]=this['bitmap'];},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x236)]=function(){const _0x27eca5=_0x16f5d6;this[_0x27eca5(0x33a)](0x0);},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x20b)]=function(_0x19f694){const _0x258595=_0x16f5d6,_0x17f4d4=this[_0x258595(0x1ee)](_0x19f694);if(!_0x17f4d4)return;const _0x6e8178=this['itemLineRect'](_0x19f694);this[_0x258595(0x203)](_0x17f4d4,_0x6e8178['x'],_0x6e8178['y'],_0x6e8178[_0x258595(0x2ed)],this['_actor']);},Window_TpModes[_0x16f5d6(0x20a)]['updateHelp']=function(){this['setHelpWindowItem'](this['item']());},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x1ef)]=function(){const _0x5aad10=_0x16f5d6;this[_0x5aad10(0x22e)](),Window_Selectable[_0x5aad10(0x20a)][_0x5aad10(0x1ef)]['call'](this);},Window_TpModes[_0x16f5d6(0x20a)][_0x16f5d6(0x2c8)]=function(){const _0x3e3586=_0x16f5d6;SoundManager[_0x3e3586(0x27a)]();};