//=============================================================================
// VisuStella MZ - Anti-Damage Barriers
// VisuMZ_3_AntiDmgBarriers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AntiDmgBarriers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AntiDmgBarriers = VisuMZ.AntiDmgBarriers || {};
VisuMZ.AntiDmgBarriers.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.07] [AntiDmgBarriers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Anti-Damage_Barriers_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @base VisuMZ_1_ElementStatusCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ElementStatusCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ does not have many options for damage mitigation. There are
 * only raw defensive parameters, elemental rates, and direct damage modifiers.
 * This plugin introduces six categories of Anti-Damage Barriers made in the
 * form of states to allow you to create more ways for the player's party to
 * defend themselves with.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Cancellation Barriers that can block out damage entirely if the damage is
 *   above or below a certain threshold.
 * * Nullification Barriers that block out damage entirely, but have a limited
 *   amount of times they can block damage for.
 * * Reduction Barriers that can stack additively with one another to provide
 *   percentile reduction values.
 * * Absorption Barriers which contain an exact number of points of damage that
 *   they can soak up.
 * * MP Barriers that disperses a percentage of the damage towards a battler's
 *   MP pool as long as they have enough MP.
 * * TP Barriers that function similarly to MP Barriers except they disperse
 *   the damage dealt instead to the TP pool.
 * * The ability to set barriers to block specific types of damage ranging from
 *   all, certain hits, physical hits, magical hits, and even elemental hits.
 * * Skill and trait effects that can bypass barriers.
 * * Make certain barrier types fragile and will break upon receiving specific
 *   types of damage (elemental, physical, magical, etc).
 * * Nullification and Absorption Barriers can regenerate themselves and/or
 *   decay over time.
 * * Playing specific animations whenever barriers tank a hit or break.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_SkillsStatesCore
 * * VisuMZ_1_ElementStatusCore
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
 * How Barriers Work
 * ============================================================================
 *
 * When an action successfully hits an actor, damage is calculated. Barriers do
 * not block damage that comes directly from event commands, plugin commands,
 * script calls, percentile HP action effects, or damage over time states.
 * 
 * Barrier states cannot be enabled in passive state form. This is due to their
 * nature of needing to be applied and their automatic nature of being removed
 * upon running out. Barrier states need to be directly applied through adding
 * a state upon the target battler. As passive states are neither applied nor
 * removed, barrier state effects cannot apply to them naturally.
 * 
 * Instead, they must come directly from a damage formula source. Before that
 * damage is applied to a battler, the following series of events happen:
 *
 * ---
 * 
 * === HP Damage Check ===
 * 
 * Check to see if the action is dealing HP damage. This does not apply for MP
 * or TP damage. If no HP damage is being dealt, ignore the rest.
 * 
 * ---
 * 
 * === State Breakers ===
 * 
 * Some states can have the unique trait of dispersing upon receiving specific
 * kinds of damage using the notetags from this plugin. These range from
 * breaking under any kind of damage, certain hit damage, physical damage,
 * magical magical, and elemental damage. If the damage to be dealt is
 * affiliated with any of the listed and the state is vulnerable to that kind
 * of damage, immediately destroy the state before the damage calculations are
 * made. This will affect any of the states remaining.
 * 
 * ---
 * 
 * === Barrier Ignore ===
 * 
 * Check if the action itself (skill or item), if the attacking battler, or if
 * the defending battler has any notetags that would cause them to ignore any
 * barrier effects. If there are, ignore the rest.
 * 
 * ---
 * 
 * === Cancellation Barriers ===
 * 
 * Check for any Cancellation Barriers. Cancellation Barriers come in two
 * different types: Over and Under. The value listed for a Cancel Over Barrier
 * will cancel damage equal to or over a specific amount. The reverse is true
 * for a Cancel Under Barrier as it will cancel damage equal to or under a
 * specific amount. If damage is blocked here, it is blocked entirely and the
 * rest of the steps do not need any calculations made.
 * 
 * ---
 * 
 * === Nullification Barriers ===
 * 
 * Next, check for any Nullification Barriers. These Barriers have a charge to
 * them displayed separate from their turn count. Any matching damage dealt
 * while a Nullification Barrier is active will be reduced entirely to 0 at the
 * cost of one of the Nullification Barrier's charges. If the Nullification
 * Barrier's charges reach 0, that state is automatically removed. If damage
 * is blocked here, it is blocked entirely and the rest of the steps do not 
 * need any calculations made.
 * 
 * If a battler has multiple Nullification Barriers, then charges will be
 * removed from Nullification Barriers with the least amount of turns remaining
 * to the ones with the most amount of turns remaining (or indefinite). If two
 * Nullification Barriers have an equal amount of turns remaining, then the
 * charge will be deducted from the one with the higher priority. If both
 * priorities are the same, then the charge will be deducted will be the one
 * with a lower database ID.
 * 
 * Renewing a Nullification Barrier's state will recalculate its charge count.
 * 
 * ---
 * 
 * === Battle Core's Pre-Damage Step ===
 * 
 * Here, the Battle Core's Pre-Damage Step takes effect. This means any of the
 * <JS Pre-Damage> and related notetags will take effect and any damage
 * modifications made from them will be carried forward.
 * 
 * ---
 * 
 * === Reduction Barriers ===
 * 
 * After applying the Battle Core's Pre-Damage Step, the Reduction Barriers
 * will have their turn. Reduction Barriers can stack with each other and they
 * stack additively. This means if you have a Reduction Barrier state worth
 * 10% and another one that is worth 20% on the same battler, then a total of
 * 30% damage will be reduced. If damage reaches zero, skip the remaining
 * Barrier calculations.
 * 
 * ---
 * 
 * === Absorption Barriers ===
 * 
 * Absorption Barrier states have a set value that they can absorb. This value
 * can be a static number or it can be calculated by a formula. The barrier
 * value an Absorption Barrier has will trade damage 1 for 1. Once the
 * Absorption Barrier reaches 0, it will automatically remove itself. If damage
 * reaches zero, skip the remaining Barrier calculations.
 * 
 * If there is 500 incoming damage and an Absorption Barrier of 100 is present,
 * then 400 damage will go through and the Absorption Barrier is reduced to 0,
 * thus removing itself.
 * 
 * If there is 100 incoming damage and an Absorption Barrier of 500 is present,
 * then 0 damage will go through and the Absorption Barrier is reduced to 400.
 * The Absorption Barrier will remain.
 * 
 * If a battler has multiple Absorption Barriers, then barriers will be removed
 * from Absorption Barriers with the least amount of turns remaining to the
 * ones with the most amount of turns remaining (or indefinite). If two
 * Absorption Barriers have an equal amount of turns remaining, then the
 * barriers deducted from the one with the higher priority. If both priorities
 * are the same, then the barrier deducted from will be the one with a lower
 * database ID.
 * 
 * Renewing an Absorption Barrier's state will recalculate its barrier count.
 * 
 * ---
 * 
 * === MP-Dispersion Barriers ===
 * 
 * If any MP-Dispersion Barriers are present, then it's time for them to take
 * effect. MP Barriers can block a percentage of the damage using MP, trading
 * off 1 for 1. If an MP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to MP (or less if there's insufficient MP). If a battler
 * runs out of MP after this step, the MP-Dispersion Barrier will automatically
 * remove itself. If damage reaches zero, skip the remaining Barrier
 * calculations.
 * 
 * ---
 * 
 * === TP-Dispersion Barriers ===
 * 
 * If any TP-Dispersion Barriers are present, then it's time for them to take
 * effect. TP Barriers can block a percentage of the damage using TP, trading
 * off 1 for 1. If a TP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to TP (or less if there's insufficient TP). If a battler
 * runs out of TP after this step, the TP-Dispersion Barrier will automatically
 * remove itself.
 * 
 * Some battlers might gain TP upon being hit. This gained TP does not apply
 * to the TP-Dispersion Barrier as it is generated after being hit.
 * 
 * ---
 * 
 * === Final Damage ===
 * 
 * After a long, long journey, any remaining damage will be dealt to the target
 * battler (unless there's other plugins affecting damage further).
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
 * === Cancellation Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Barrier Cancel Damage Over: x>
 * <hitType Barrier Cancel Damage Over: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or over a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Over: 1000>
 *   <Physical Barrier Cancel Damage Over: 500>
 *   <Magical Barrier Cancel Damage Over: user.def + target.mdf>
 *   <Element Fire Cancel Damage Over: Math.randomInt(300)>
 *   <Element Wind, Ice Barrier Cancel Damage Over: $gameVariables.value(42)>
 *
 * ---
 *
 * <hitType Barrier Cancel Damage Under: x>
 * <hitType Barrier Cancel Damage Under: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or under a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Under: 100>
 *   <Physical Barrier Cancel Damage Under: 200>
 *   <Magical Barrier Cancel Damage Under: user.def + target.mdf>
 *   <Element Fire Barrier Cancel Damage Under: Math.randomInt(500)>
 *   <Element Wind, Ice Barrier Cancel Damage Under: $gameVariables.value(42)>
 *
 * ---
 * 
 * === Nullification Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Nullify Barrier: x>
 * <hitType Nullify Barrier: formula>
 *
 * - Used for: State Notetags
 * - Nullification Barriers block all damage at the cost of one charge.
 * - If a Nullification Barrier runs out of charges, it will automatically
 *   remove itself from the battler.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the number of charges the
 *   Nullification Barrier will have.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's charges.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Absorption Barrier effect and
 *   both cannot be placed on the same state. They can, however, be placed on
 *   two separate states.
 * 
 *   Examples:
 * 
 *   <All Nullify Barrier: 3>
 *   <Physical Nullify Barrier: 5>
 *   <Magical Nullify Barrier: user.level + target.level>
 *   <Element Fire Nullify Barrier: Math.randomInt(10)>
 *   <Element Wind, Ice Nullify Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Nullify Barrier Degen: x>
 * <Nullify Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will decay by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Degen: 1>
 *   <Nullify Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Nullify Barrier Regen: x>
 * <Nullify Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to raise by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will regen by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Regen: 1>
 *   <Nullify Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === Reduction Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Reduce Barrier: x%>
 * <hitType Reduce Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into a Reduction Barrier. Reduction Barriers reduce
 *   incoming damage by a percentile.
 * - If a battler has multiple Reduction Barriers, they stack additively.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage it
 *   will reduce by.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be reduced by.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Reduce Barrier: 20%>
 *   <Physical Reduce Barrier: 40%>
 *   <Magical Reduce Barrier: user.hpRate()>
 *   <Element Fire Reduce Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice Reduce Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Absorption Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Absorb Barrier: x>
 * <hitType Absorb Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into an Absorption Barrier which contains a visible
 *   barrier that will block damage 1 for 1.
 * - If the Absorption Barrier's value is reduced to 0, it will automatically
 *   remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the barrier value the
 *   Absorption Barrier state has upon being applied.
 * - Replace 'formula' with a calculation that determines what barrier value
 *   Absorption Barrier state has upon being applied.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Nullification Barrier effect
 *   and both cannot be placed on the same state. They can, however, be placed
 *   on two separate states.
 * 
 *   Examples:
 * 
 *   <All Absorb Barrier: 300>
 *   <Physical Absorb Barrier: 500>
 *   <Magical Absorb Barrier: user.def + target.mdf>
 *   <Element Fire Absorb Barrier: Math.randomInt(1000)>
 *   <Element Wind, Ice Absorb Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Absorb Barrier Degen: x>
 * <Absorb Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will decay by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Degen: 1>
 *   <Absorb Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Absorb Barrier Regen: x>
 * <Absorb Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to regen by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will regen by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Regen: 1>
 *   <Absorb Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === MP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType MP Barrier: x%>
 * <hitType MP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into an MP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's MP pool.
 * - Damage will be dispersed 1 for 1 with MP. If there is insufficient MP,
 *   the damage dispersion percentile will be reduced to account for MP.
 * - If MP reaches 0, the state will automatically remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's MP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the MP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All MP Barrier: 20%>
 *   <Physical MP Barrier: 40%>
 *   <Magical MP Barrier: user.hpRate()>
 *   <Element Fire MP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice MP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === TP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType TP Barrier: x%>
 * <hitType TP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a TP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's TP pool.
 * - Damage will be dispersed 1 for 1 with TP. If there is insufficient TP,
 *   the damage dispersion percentile will be reduced to account for TP.
 * - If TP reaches 0, the state will automatically remove itself.
 * - TP can be generated upon being hit. This gained TP does not apply to the
 *   TP-Dispersion Barrier as it is generated after being hit.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's TP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the TP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All TP Barrier: 20%>
 *   <Physical TP Barrier: 40%>
 *   <Magical TP Barrier: user.hpRate()>
 *   <Element Fire TP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice TP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Barrier Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Ignore Barriers>
 *
 * - Used for: Skill, Item Notetags
 * - Causes this skill or item to completely ignore any barriers on the target.
 *
 * ---
 *
 * <Ignore Barriers as User>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If an attacker with this notetag on any of its trait objects attacks a
 *   target with barriers, ignore the target's barriers.
 *
 * ---
 *
 * <Ignore Barriers as Target>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a target battler has this notetag on any of its trait objects receives
 *   an attack, any barriers on the target battler will be ignored.
 *
 * ---
 * 
 * === Break State-Related Notetags ===
 * 
 * ---
 *
 * <hitType Breaks State>
 *
 * - Used for: State Notetags
 * - If an attack hits a battler with this state and state's notetag, as long
 *   as the damage type matches, automatically remove the state.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - This can be used for states that aren't barriers.
 * - This occurs before most of the pre-damage phase.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Absorption Barriers
 * ============================================================================
 *
 * Settings for the Absorption Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much barrier was lost.
 *   - %1 - Barrier
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cancellation Barriers
 * ============================================================================
 *
 * Settings for the Cancellation Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: MP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the MP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Nullification Barriers
 * ============================================================================
 *
 * Settings for the Nullificaton Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reduction Barriers
 * ============================================================================
 *
 * Settings for the Reduction Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the TP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much TP was lost.
 *   - %1 - TP Lost, %2 - TP Text
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.07: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the 'user' variable was not detecting the proper scene
 *    actor when used in a JS formula outside of battle. Fix made by Arisu.
 * 
 * Version 1.06: March 16, 2023
 * * Feature Update!
 * ** Better rounding calculations are applied throughout the plugin to prevent
 *    decimal places from appear in damage barrier popups. Update by Olivia.
 * 
 * Version 1.05: November 11, 2021
 * * Documentation Update
 * ** Added snip in "How Barriers Work" section:
 * *** Barrier states cannot be enabled in passive state form. This is due to
 *     their nature of needing to be applied and their automatic nature of
 *     being removed upon running out. Barrier states need to be directly
 *     applied through adding a state upon the target battler. As passive
 *     states are neither applied nor removed, barrier state effects cannot
 *     apply to them naturally.
 * 
 * Version 1.04: July 2, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Absorption Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Absorption Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Break > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Break > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Break > Enemy Flip?
 * **** Flip the animation for enemies?
 * 
 * Version 1.02: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: November 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableAntiDmgBarriersMenu
 * @text System: Enable AntiDmgBarriers in Menu?
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowAntiDmgBarriersMenu
 * @text System: Show AntiDmgBarriers in Menu?
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
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
 * @param AntiDmgBarriers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Absorb:struct
 * @text Absorption Barriers
 * @type struct<Absorb>
 * @desc Settings for the Absorption Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"4","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"5","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1","TextColor:str":"27","FlashColor:eval":"[255, 0, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Cancel:struct
 * @text Cancellation Barriers
 * @type struct<Cancel>
 * @desc Settings for the Cancellation Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"119","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"15","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param MP:struct
 * @text MP-Dispersion Barriers
 * @type struct<MP>
 * @desc Settings for the MP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"62","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"81","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Nullify:struct
 * @text Nullification Barriers
 * @type struct<Nullify>
 * @desc Settings for the Nullificaton Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"58","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"11","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Reduce:struct
 * @text Reduction Barriers
 * @type struct<Reduce>
 * @desc Settings for the Reduction Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"53","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"14","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param TP:struct
 * @text TP-Dispersion Barriers
 * @type struct<TP>
 * @desc Settings for the TP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"91","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"45","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1 %2","TextColor:str":"29","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60"}
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
 * Absorption Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Absorb:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 4
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 5
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much barrier was lost.
 * %1 - Barrier
 * @default -%1
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Cancellation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cancel:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 119
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 15
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * MP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 62
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 61
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Nullify Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Nullify:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 58
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 11
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Reduction Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Reduce:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 53
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 14
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * TP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 91
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 45
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much TP was lost.
 * %1 - TP Lost, %2 - TP Text
 * @default -%1 %2
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x395661=_0x175a;function _0x4bab(){const _0x546c65=['clearJsTargets','pnsfT','FNWPF','XPTfK','getStateDisplay','RwVtI','onAntiDamageBarrierEffect','HWkSU','_antiDamageBarrierMp','Absorb','DAMAGE','Reduce','FlashColor','setAntiDamageBarrierMp','getAntiDamageBarrierCancelOver','floor','getAntiDamageBarrierStates','applyMpBarrier','displayAbsorptionBarrierPopup','Cancel','isPlaytest','applyCancelUnderBarrier','isAlive','traitObjects','includes','Game_Battler_addState','wlWjN','map','match','gainMp','onAntiDamageMpBarrier','548840GXzymq','processBreakStateEffect','2619568qoMcXG','Settings','VisuMZ_1_BattleCore','16NPyAHm','pTUVw','log','isAntiDamageBarrierIgnoredAsSubject','OnYDK','ignoreAllAntiDamageBarriers','createJsTargets','parameters','%1EnemyFlip','ARRAYSTRUCT','_actor','PopupText','ARRAYJSON','GEfou','Nullify','ReduceBarrier','SVXvC','6LFHFXS','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isAntiDamageBarrierIgnored','ALL','NullBarrier','NgdUx','CancelOver','_antiDamageBarrierCancelOver','matchesAntiDamageBarrierType','CalculateCharges','split','parse','matchesAntiDamageBarrier','NUM','jFWDN','requestFauxAnimation','setAntiDamageBarrierCancelOver','GDdhe','description','setAntiDamageBarrierTp','VisuMZ_1_ElementStatusCore','applyCancelOverBarrier','format','regenerateAntiDamageBarriers','VisuMZ_1_SkillsStatesCore','OZxVl','clamp','Game_BattlerBase_initMembers','applyBattleCoreJS','OfDAs','applyAbsorptionBarrier','ARRAYSTR','HCmwG','getElementIdWithName','7563WWEGQH','vrrxX','initAntiDamageBarriers','setStateDisplay','BarrierRegen','EVAL','isStateAffected','%1Mirror','fPMlU','applyBreakStateEffects','510431ZeifyS','applyPreAntiDamageBarriers','IgnoreAllBarrierAsDefender','bsGJm','_antiDamageBarrierTp','ceil','version','gainTp','AntiDmgBarriers','onAntiDamageNullificationBarrier','AbsorbBarrier','getAntiDamageBarrierCancelUnder','STR','xzHoi','iQiSY','concat','applyTpBarrier','ZGsub','RlqHU','VisuMZ_0_CoreEngine','TpBarrier','lnIcQ','Dbxav','784341kIDTqQ','5767391tTuQDN','isMagical','BDLkP','tUCBA','onAntiDamageCancelBarrier','states','iHbhL','status','applyReductionBarrier','sJVzl','_subject','prototype','note','MpBarrier','ConvertParams','push','FcbRN','cDzpV','eNYHS','getAntiDamageBarrierReduction','toUpperCase','IgnoreAllBarrierAsAttacker','regenerateAll','call','displayTpBarrierPopup','2012630olyHBI','getAntiDamageBarrierTp','some','filter','STRUCT','Intact','stateTurns','IgnoreAllBarrier','isSceneBattle','onAntiDamageReductionBarrier','priority','elements','%1Mute','_antiDamageBarrierReduction','removeState','FlashDuration','92WJqcLA','initMembers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setAntiDamageBarrierCancelUnder','isAntiDamageBarrierIgnoredAsTarget','lITlE','user','Game_Action_applyBattleCoreJS','ogvbQ','trim','initAntiDamageBarrierDataForState','matchesAntiDamageBarrierElementType','TextColor','KzmcF','regenerateAntiDamageBarrierState','AnFAQ','isPhysical','name','ANY','item','_scene','NxDPl','DZqKn','kAwHj','StateMatchesBreakEffect','ARRAYNUM','CancelUnder','BXruj','ARRAYFUNC','sQxIo','target','min','replace','getAntiDamageBarrierMp','jHgXc','exit','Miyik','_antiDamageBarrierCancelUnder','FUNC','setupTextPopup','isCertainHit','VKpYw','autoRemovalTiming','SGRNw','subject','addState','ARRAYEVAL','%1AnimationID','applyNullificationBarrier','inBattle','YANVo','sgabr','max','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setAntiDamageBarrierReduction','NhccW','onAntiDamageAbsorptionBarrier','skills','Game_Battler_regenerateAll','RegExp'];_0x4bab=function(){return _0x546c65;};return _0x4bab();}(function(_0x7b6dea,_0x442a8a){const _0x55f4ad=_0x175a,_0x130c1e=_0x7b6dea();while(!![]){try{const _0x150511=parseInt(_0x55f4ad(0x145))/0x1+parseInt(_0x55f4ad(0xa8))/0x2*(-parseInt(_0x55f4ad(0x13b))/0x3)+parseInt(_0x55f4ad(0x105))/0x4+parseInt(_0x55f4ad(0x98))/0x5+-parseInt(_0x55f4ad(0x119))/0x6*(parseInt(_0x55f4ad(0x15d))/0x7)+-parseInt(_0x55f4ad(0x108))/0x8*(parseInt(_0x55f4ad(0x15c))/0x9)+parseInt(_0x55f4ad(0x103))/0xa;if(_0x150511===_0x442a8a)break;else _0x130c1e['push'](_0x130c1e['shift']());}catch(_0x26af04){_0x130c1e['push'](_0x130c1e['shift']());}}}(_0x4bab,0x7c28c));function _0x175a(_0x4caf68,_0x1cfcc0){const _0x4bab0e=_0x4bab();return _0x175a=function(_0x175a69,_0x146161){_0x175a69=_0x175a69-0x90;let _0x42beb9=_0x4bab0e[_0x175a69];return _0x42beb9;},_0x175a(_0x4caf68,_0x1cfcc0);}var label=_0x395661(0x14d),tier=tier||0x0,dependencies=[_0x395661(0x158),_0x395661(0x107),_0x395661(0x131),_0x395661(0x12d)],pluginData=$plugins[_0x395661(0x9b)](function(_0x339a72){const _0x1c50df=_0x395661;return _0x339a72['status']&&_0x339a72['description'][_0x1c50df(0xfc)]('['+label+']');})[0x0];VisuMZ[label][_0x395661(0x106)]=VisuMZ[label][_0x395661(0x106)]||{},VisuMZ[_0x395661(0x16b)]=function(_0x5568c6,_0xa69e20){const _0x47c36d=_0x395661;for(const _0x505c20 in _0xa69e20){if(_0x505c20[_0x47c36d(0x100)](/(.*):(.*)/i)){const _0xf1278b=String(RegExp['$1']),_0x5ea676=String(RegExp['$2'])[_0x47c36d(0x93)]()[_0x47c36d(0xb1)]();let _0x1421a4,_0xdde5b8,_0x3de71a;switch(_0x5ea676){case _0x47c36d(0x126):_0x1421a4=_0xa69e20[_0x505c20]!==''?Number(_0xa69e20[_0x505c20]):0x0;break;case _0x47c36d(0xc1):_0xdde5b8=_0xa69e20[_0x505c20]!==''?JSON[_0x47c36d(0x124)](_0xa69e20[_0x505c20]):[],_0x1421a4=_0xdde5b8[_0x47c36d(0xff)](_0x5738f0=>Number(_0x5738f0));break;case _0x47c36d(0x140):_0x1421a4=_0xa69e20[_0x505c20]!==''?eval(_0xa69e20[_0x505c20]):null;break;case _0x47c36d(0xd6):_0xdde5b8=_0xa69e20[_0x505c20]!==''?JSON[_0x47c36d(0x124)](_0xa69e20[_0x505c20]):[],_0x1421a4=_0xdde5b8['map'](_0x2963e0=>eval(_0x2963e0));break;case'JSON':_0x1421a4=_0xa69e20[_0x505c20]!==''?JSON[_0x47c36d(0x124)](_0xa69e20[_0x505c20]):'';break;case _0x47c36d(0x114):_0xdde5b8=_0xa69e20[_0x505c20]!==''?JSON[_0x47c36d(0x124)](_0xa69e20[_0x505c20]):[],_0x1421a4=_0xdde5b8[_0x47c36d(0xff)](_0x5117b7=>JSON[_0x47c36d(0x124)](_0x5117b7));break;case _0x47c36d(0xce):_0x1421a4=_0xa69e20[_0x505c20]!==''?new Function(JSON['parse'](_0xa69e20[_0x505c20])):new Function('return\x200');break;case _0x47c36d(0xc4):_0xdde5b8=_0xa69e20[_0x505c20]!==''?JSON[_0x47c36d(0x124)](_0xa69e20[_0x505c20]):[],_0x1421a4=_0xdde5b8[_0x47c36d(0xff)](_0x2e31f5=>new Function(JSON[_0x47c36d(0x124)](_0x2e31f5)));break;case _0x47c36d(0x151):_0x1421a4=_0xa69e20[_0x505c20]!==''?String(_0xa69e20[_0x505c20]):'';break;case _0x47c36d(0x138):_0xdde5b8=_0xa69e20[_0x505c20]!==''?JSON['parse'](_0xa69e20[_0x505c20]):[],_0x1421a4=_0xdde5b8[_0x47c36d(0xff)](_0x2d3fcf=>String(_0x2d3fcf));break;case _0x47c36d(0x9c):_0x3de71a=_0xa69e20[_0x505c20]!==''?JSON['parse'](_0xa69e20[_0x505c20]):{},_0x1421a4=VisuMZ[_0x47c36d(0x16b)]({},_0x3de71a);break;case _0x47c36d(0x111):_0xdde5b8=_0xa69e20[_0x505c20]!==''?JSON['parse'](_0xa69e20[_0x505c20]):[],_0x1421a4=_0xdde5b8[_0x47c36d(0xff)](_0x13f5d4=>VisuMZ[_0x47c36d(0x16b)]({},JSON['parse'](_0x13f5d4)));break;default:continue;}_0x5568c6[_0xf1278b]=_0x1421a4;}}return _0x5568c6;},(_0xc8f3f8=>{const _0xe1540b=_0x395661,_0x36fa91=_0xc8f3f8[_0xe1540b(0xb9)];for(const _0xed7279 of dependencies){if(_0xe1540b(0xda)!==_0xe1540b(0xda))return _0x5726a2[_0xe1540b(0x164)]&&_0x145e39[_0xe1540b(0x12b)][_0xe1540b(0xfc)]('['+_0x1ded71+']');else{if(!Imported[_0xed7279]){if(_0xe1540b(0x16d)==='qPpxN'){const _0x2d8912=_0xd53c6a['id'];let _0x3565e7=(_0x32ff0d(this['getStateDisplay'](_0x2d8912))||0x0)-0x1;this[_0xe1540b(0x13e)](_0x2d8912,_0x3565e7),_0x3565e7<=0x0&&this[_0xe1540b(0xa6)](_0x2d8912),this[_0xe1540b(0xea)](_0xe1540b(0x116),_0x3565e7>0x0);}else{alert(_0xe1540b(0x11a)[_0xe1540b(0x12f)](_0x36fa91,_0xed7279)),SceneManager[_0xe1540b(0xcb)]();break;}}}}const _0x25e397=_0xc8f3f8[_0xe1540b(0x12b)];if(_0x25e397[_0xe1540b(0x100)](/\[Version[ ](.*?)\]/i)){if(_0xe1540b(0xb7)!=='qaYGC'){const _0x11ae53=Number(RegExp['$1']);_0x11ae53!==VisuMZ[label][_0xe1540b(0x14b)]&&('bQyWn'==='HAZuX'?this['removeState'](_0x3c1309):(alert(_0xe1540b(0xdd)['format'](_0x36fa91,_0x11ae53)),SceneManager['exit']()));}else{const _0x3afba5=[this],_0x90412b=_0x2f23ff[_0xe1540b(0xd7)['format'](_0x348a77)];let _0x146bff=_0x4d1cec[_0xe1540b(0x142)[_0xe1540b(0x12f)](_0x38619b)];_0x45ad8c['%1EnemyFlip'[_0xe1540b(0x12f)](_0x488657)]&&(_0x146bff=!_0x146bff);const _0x5835d4=_0x3e35b7[_0xe1540b(0xa4)['format'](_0xa0d063)];_0x19490f[_0xe1540b(0x128)](_0x3afba5,_0x90412b,_0x146bff,_0x5835d4);}}if(_0x25e397[_0xe1540b(0x100)](/\[Tier[ ](\d+)\]/i)){if('UoGup'!==_0xe1540b(0x91)){const _0x4cfbdb=Number(RegExp['$1']);_0x4cfbdb<tier?(alert(_0xe1540b(0xaa)[_0xe1540b(0x12f)](_0x36fa91,_0x4cfbdb,tier)),SceneManager['exit']()):tier=Math[_0xe1540b(0xdc)](_0x4cfbdb,tier);}else{if(!this[_0xe1540b(0x141)](_0x2e773a))return 0x0;return this['_antiDamageBarrierTp']===_0x12f078&&this[_0xe1540b(0x13d)](),this[_0xe1540b(0x149)][_0x2d86dd]||0x0;}}VisuMZ[_0xe1540b(0x16b)](VisuMZ[label][_0xe1540b(0x106)],_0xc8f3f8[_0xe1540b(0x10f)]);})(pluginData),VisuMZ['AntiDmgBarriers'][_0x395661(0xe3)]={'IgnoreAllBarrier':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS)>/gi,'IgnoreAllBarrierAsAttacker':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:ATTACKER|USER)>/gi,'IgnoreAllBarrierAsDefender':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:TARGET|DEFENDER)>/gi,'CancelOver':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG OVER|DAMAGE OVER|OVER):[ ](.*)>/gi,'CancelUnder':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG UNDER|DAMAGE UNDER|UNDER):[ ](.*)>/gi,'NullBarrier':/<(.*)[ ](?:NULLIFY|NULL|NULLIFICATION)[ ]BARRIER:[ ](.*)>/gi,'ReduceBarrier':/<(.*)[ ](?:CUT|REDUCE|REDUCTION)[ ]BARRIER:[ ](.*)>/gi,'AbsorbBarrier':/<(.*)[ ](?:ABSORB|ABSORPTION)[ ]BARRIER:[ ](.*)>/gi,'MpBarrier':/<(.*)[ ](?:MP|MAGIC|MANA)[ ]BARRIER:[ ](.*)>/gi,'TpBarrier':/<(.*)[ ](?:TP|TECH|LIMIT)[ ]BARRIER:[ ](.*)>/gi,'BreakState':/<(.*)[ ](?:BREAK|BREAKS)[ ]STATE>/gi,'BarrierDegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:DECAY|DEGEN):[ ](.*)>/gi,'BarrierRegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:REGENERATION|REGEN):[ ](.*)>/gi},DataManager['hasAntiDmgBarriersNotetag']=function(_0x4f22ce){const _0x48f266=_0x395661;if(!_0x4f22ce)return![];const _0x2b0bbd=VisuMZ[_0x48f266(0x14d)]['RegExp'],_0x1f1734=_0x4f22ce[_0x48f266(0x169)]||'';for(const _0x4f8fdf in _0x2b0bbd){if(_0x1f1734[_0x48f266(0x100)](_0x2b0bbd[_0x4f8fdf]))return!![];}return![];},VisuMZ[_0x395661(0x14d)]['Game_Action_applyBattleCoreJS']=Game_Action['prototype']['applyBattleCoreJS'],Game_Action[_0x395661(0x168)][_0x395661(0x135)]=function(_0x49734c,_0x3f6b46,_0x1cddcd,_0x4c85c){const _0xa2124c=_0x395661,_0x4a0236=_0x49734c==='PreDamage%1JS'&&this['isHpEffect']()&&_0x1cddcd>0x0;if(_0x4a0236){if(_0xa2124c(0x12a)===_0xa2124c(0x12a))_0x3f6b46[_0xa2124c(0x144)](this);else{_0x3fc567=_0x3e206c[_0xa2124c(0xc8)](/\b(\d+)([%％])/gi,(_0x36bf7e,_0x32507d)=>(_0x11400a(_0x32507d)||0x0)*0.01);try{return _0x227ba2(_0x4d1b0d);}catch(_0x3bdc6f){if(_0x29f608['isPlaytest']())_0x30b85d['log'](_0x3bdc6f);return 0x0;}}}return _0x4a0236&&(_0x1cddcd=this['applyPreAntiDamageBarriers'](_0x3f6b46,_0x1cddcd)),_0x1cddcd=VisuMZ[_0xa2124c(0x14d)][_0xa2124c(0xaf)][_0xa2124c(0x96)](this,_0x49734c,_0x3f6b46,_0x1cddcd,_0x4c85c),_0x4a0236&&(_0x1cddcd=this['applyPostAntiDamageBarriers'](_0x3f6b46,_0x1cddcd)),_0x1cddcd;},Game_Action[_0x395661(0x168)][_0x395661(0x146)]=function(_0x4c4a13,_0x320f80){const _0x11c3e3=_0x395661;if(this[_0x11c3e3(0x11b)](_0x4c4a13))return _0x320f80;if(this[_0x11c3e3(0x12e)](_0x4c4a13,_0x320f80))return 0x0;if(this['applyCancelUnderBarrier'](_0x4c4a13,_0x320f80))return 0x0;if(this['applyNullificationBarrier'](_0x4c4a13))return 0x0;return _0x320f80;},Game_Action[_0x395661(0x168)]['applyPostAntiDamageBarriers']=function(_0x56a770,_0x2dffcc){const _0xd1358d=_0x395661;if(this['isAntiDamageBarrierIgnored'](_0x56a770))return _0x2dffcc;if(_0x2dffcc<=0x0)return _0x2dffcc;return _0x2dffcc=this[_0xd1358d(0x165)](_0x56a770,_0x2dffcc),_0x2dffcc=this[_0xd1358d(0x137)](_0x56a770,_0x2dffcc),_0x2dffcc=this[_0xd1358d(0xf5)](_0x56a770,_0x2dffcc),_0x2dffcc=this[_0xd1358d(0x155)](_0x56a770,_0x2dffcc),_0x2dffcc=Math[_0xd1358d(0xf3)](_0x2dffcc),_0x2dffcc;},Game_Action[_0x395661(0x168)][_0x395661(0x11b)]=function(_0x3686d1){const _0x5a7808=_0x395661;if(this[_0x5a7808(0xbb)]()&&this[_0x5a7808(0xbb)]()['note'][_0x5a7808(0x100)](VisuMZ[_0x5a7808(0x14d)][_0x5a7808(0xe3)][_0x5a7808(0x9f)]))return!![];if(this[_0x5a7808(0x10b)]()){if(_0x5a7808(0xeb)!=='HWkSU')this[_0x5a7808(0xea)]('Cancel',!![]);else return!![];}if(this['isAntiDamageBarrierIgnoredAsTarget'](_0x3686d1)){if(_0x5a7808(0xbd)!==_0x5a7808(0x15f))return!![];else this[_0x5a7808(0x13d)]();}return![];},Game_Action[_0x395661(0x168)][_0x395661(0x10b)]=function(){const _0xc0fa4c=_0x395661,_0x32476e=this['subject']()['traitObjects'](),_0x2b2b99=VisuMZ['AntiDmgBarriers'][_0xc0fa4c(0xe3)][_0xc0fa4c(0x94)];return _0x32476e[_0xc0fa4c(0x9a)](_0x365b4a=>_0x365b4a&&_0x365b4a[_0xc0fa4c(0x169)]&&_0x365b4a[_0xc0fa4c(0x169)]['match'](_0x2b2b99));},Game_Action[_0x395661(0x168)][_0x395661(0xac)]=function(_0x23c8c8){const _0x2f198e=_0x395661,_0x42f477=_0x23c8c8[_0x2f198e(0xfb)](),_0x18b4f4=VisuMZ[_0x2f198e(0x14d)]['RegExp'][_0x2f198e(0x147)];return _0x42f477[_0x2f198e(0x9a)](_0x16d444=>_0x16d444&&_0x16d444[_0x2f198e(0x169)]&&_0x16d444[_0x2f198e(0x169)][_0x2f198e(0x100)](_0x18b4f4));},Game_Action[_0x395661(0x168)][_0x395661(0xd8)]=function(_0x51b21b){const _0x5a0443=_0x395661,_0x4820d0=_0x51b21b[_0x5a0443(0xf4)]();for(const _0x578234 of _0x4820d0){if(!_0x578234)continue;if(this[_0x5a0443(0x125)](_0x578234,'NullBarrier'))return _0x51b21b['onAntiDamageNullificationBarrier'](_0x578234),!![];}return![];},Game_Action['prototype']['applyCancelOverBarrier']=function(_0x5be549,_0x3cd7b1){const _0xa877ed=_0x395661,_0x228649=_0x5be549[_0xa877ed(0x162)]();for(const _0x4f96d3 of _0x228649){if(_0xa877ed(0x166)===_0xa877ed(0x109))return!![];else{if(!_0x4f96d3)continue;if(_0x3cd7b1<_0x5be549[_0xa877ed(0xf2)](_0x4f96d3['id']))continue;if(this[_0xa877ed(0x125)](_0x4f96d3,_0xa877ed(0x11f)))return _0x5be549[_0xa877ed(0x161)](_0x4f96d3),!![];}}return![];},Game_Action[_0x395661(0x168)][_0x395661(0xf9)]=function(_0xb632c9,_0x1ac5e3){const _0x1ec354=_0x395661,_0x3657d0=_0xb632c9['states']();for(const _0x2af780 of _0x3657d0){if(!_0x2af780)continue;if(_0x1ac5e3>_0xb632c9[_0x1ec354(0x150)](_0x2af780['id']))continue;if(this[_0x1ec354(0x125)](_0x2af780,_0x1ec354(0xc2)))return _0xb632c9[_0x1ec354(0x161)](_0x2af780),!![];}return![];},Game_Action[_0x395661(0x168)][_0x395661(0x165)]=function(_0x13da80,_0x1c2585){const _0x1911be=_0x395661;if(_0x1c2585<=0x0)return _0x1c2585;const _0x293174=_0x13da80[_0x1911be(0x162)]();let _0x3ab909=0x0;for(const _0x3d9623 of _0x293174){if(!_0x3d9623)continue;this['matchesAntiDamageBarrier'](_0x3d9623,_0x1911be(0x117))&&(_0x1911be(0x118)!==_0x1911be(0xe9)?_0x3ab909+=_0x13da80['getAntiDamageBarrierReduction'](_0x3d9623['id']):this[_0x1911be(0xa6)](_0x50849c));}return _0x3ab909>0x0&&(_0x1c2585*=(0x1-_0x3ab909)[_0x1911be(0x133)](0x0,0x1),_0x13da80[_0x1911be(0xa1)]()),Math[_0x1911be(0xf3)](_0x1c2585);},Game_Action['prototype'][_0x395661(0x137)]=function(_0x431bf0,_0x164750){const _0x3f96e8=_0x395661;if(_0x164750<=0x0)return _0x164750;const _0x26c335=_0x431bf0[_0x3f96e8(0xf4)]();for(const _0x3a2617 of _0x26c335){if(_0x3f96e8(0xd3)!==_0x3f96e8(0x139)){if(!_0x3a2617)continue;if(this[_0x3f96e8(0x125)](_0x3a2617,_0x3f96e8(0x14f))){if(_0x3f96e8(0x15b)!==_0x3f96e8(0x15b)){const _0x52e535=_0x1296bc(_0x2a7350['$1'])[_0x3f96e8(0x123)](','),_0x4432e1=_0x52e535[_0x3f96e8(0xff)](_0x235719=>_0x6dddcb[_0x3f96e8(0x13a)](_0x235719));return _0xa1321f[_0x3f96e8(0x9a)](_0x1d2ce6=>_0x4432e1['includes'](_0x1d2ce6));}else{let _0x3a1d4a=Number(_0x431bf0[_0x3f96e8(0xe8)](_0x3a2617['id']))||0x0;const _0x308ebb=Math[_0x3f96e8(0xc7)](_0x164750,_0x3a1d4a);_0x164750-=_0x308ebb,_0x3a1d4a-=_0x308ebb,_0x431bf0[_0x3f96e8(0x13e)](_0x3a2617['id'],_0x3a1d4a);_0x308ebb>0x0&&(_0x431bf0[_0x3f96e8(0xf6)](_0x308ebb,_0x3a2617),_0x431bf0[_0x3f96e8(0xe0)](_0x3a2617));if(_0x164750<=0x0)break;}}}else _0x4b991d[_0x3f96e8(0x16c)](_0x400ec8['id']);}return Math[_0x3f96e8(0xf3)](_0x164750);},Game_Action['prototype'][_0x395661(0xf5)]=function(_0x1e03c5,_0x2b514a){const _0x50d8b2=_0x395661;if(_0x2b514a<=0x0)return _0x2b514a;const _0x5cf68a=_0x1e03c5[_0x50d8b2(0x162)]();let _0x519164=_0x1e03c5['mp'];for(const _0x55b098 of _0x5cf68a){if(!_0x55b098)continue;if(this[_0x50d8b2(0x125)](_0x55b098,_0x50d8b2(0x16a))){const _0x4746e3=_0x1e03c5['getAntiDamageBarrierMp'](_0x55b098['id']),_0x26a7ef=Math[_0x50d8b2(0xc7)](Math[_0x50d8b2(0x14a)](_0x2b514a*_0x4746e3),_0x1e03c5['mp']);_0x2b514a-=_0x26a7ef,_0x1e03c5[_0x50d8b2(0x101)](-_0x26a7ef);_0x26a7ef>0x0&&(_0x50d8b2(0xe7)===_0x50d8b2(0xe5)?(this[_0x50d8b2(0x149)]===_0x4f6b59&&this['initAntiDamageBarriers'](),this[_0x50d8b2(0x149)][_0x25950f]=_0x7e3ea5):_0x1e03c5[_0x50d8b2(0x102)](_0x55b098));if(_0x2b514a<=0x0)break;}}return Math[_0x50d8b2(0xf3)](_0x2b514a);},Game_Action['prototype'][_0x395661(0x155)]=function(_0x5d7a65,_0x4f4a05){const _0x213e71=_0x395661;if(_0x4f4a05<=0x0)return _0x4f4a05;const _0x1080fa=_0x5d7a65[_0x213e71(0x162)]();let _0x31017e=_0x5d7a65['mp'];for(const _0x3ce339 of _0x1080fa){if('jHgXc'===_0x213e71(0xca)){if(!_0x3ce339)continue;if(this[_0x213e71(0x125)](_0x3ce339,_0x213e71(0x159))){const _0x149301=_0x5d7a65[_0x213e71(0x99)](_0x3ce339['id']),_0x1d059c=Math[_0x213e71(0xc7)](Math[_0x213e71(0x14a)](_0x4f4a05*_0x149301),_0x5d7a65['tp']);_0x4f4a05-=_0x1d059c,_0x5d7a65[_0x213e71(0x14c)](-_0x1d059c);_0x1d059c>0x0&&(_0x5d7a65[_0x213e71(0x97)](_0x1d059c),_0x5d7a65['onAntiDamageTpBarrier'](_0x3ce339));if(_0x4f4a05<=0x0){if(_0x213e71(0xdf)===_0x213e71(0xdf))break;else _0x1a2a43[_0x213e71(0x144)](this);}}}else this[_0x213e71(0xcd)]===_0xff1edb&&this[_0x213e71(0x13d)](),this['_antiDamageBarrierCancelUnder'][_0x311324]=_0x2d9fb7;}return Math['floor'](_0x4f4a05);},Game_Action[_0x395661(0x168)][_0x395661(0x125)]=function(_0x44c78e,_0x226f60){const _0x48ee85=_0x395661,_0xddbe5=VisuMZ[_0x48ee85(0x14d)][_0x48ee85(0xe3)][_0x226f60];if(!_0xddbe5)return![];const _0x296f46=_0x44c78e[_0x48ee85(0x169)][_0x48ee85(0x100)](_0xddbe5);if(_0x296f46)for(const _0x17e086 of _0x296f46){if(_0x48ee85(0xbe)!=='DZqKn'){const _0x241a12=_0x23e35e[_0x48ee85(0x14d)]['CalculateCharges'](_0x338bc5['$2']);this['setStateDisplay'](_0x3e6b7d,_0x241a12||0x1);}else{_0x17e086[_0x48ee85(0x100)](_0xddbe5);const _0x54fc04=String(RegExp['$1']);if(this[_0x48ee85(0x121)](_0x54fc04))return!![];}}return![];},Game_Action[_0x395661(0x168)][_0x395661(0x121)]=function(_0x4604db){const _0x37f49a=_0x395661;_0x4604db=_0x4604db['toUpperCase']()[_0x37f49a(0xb1)]();if([_0x37f49a(0x11c),_0x37f49a(0xba),_0x37f49a(0xee)][_0x37f49a(0xfc)](_0x4604db)){if('xOtoX'!==_0x37f49a(0x163))return!![];else{if(_0x1fe3d6[_0x37f49a(0x100)](_0x235b23[_0x2b5901]))return!![];}}else{if(_0x4604db['match'](/ELEMENT/i))return this[_0x37f49a(0xb3)](_0x4604db);else{if(_0x4604db[_0x37f49a(0x100)](/CERTAIN/i))return this[_0x37f49a(0xd0)]();else{if(_0x4604db[_0x37f49a(0x100)](/PHYSICAL/i))return this[_0x37f49a(0xb8)]();else{if(_0x4604db['match'](/MAGICAL/i))return this[_0x37f49a(0x15e)]();}}}}},Game_Action['prototype'][_0x395661(0xb3)]=function(_0x22f985){const _0x78b609=_0x395661,_0x8f4df2=this[_0x78b609(0xa3)]();if(_0x22f985[_0x78b609(0x100)](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){if(_0x78b609(0x152)===_0x78b609(0xd1))this['initAntiDamageBarriers']();else{const _0x4a5800=JSON[_0x78b609(0x124)]('['+RegExp['$1'][_0x78b609(0x100)](/\d+/g)+']');return _0x8f4df2[_0x78b609(0x9a)](_0x21d939=>_0x4a5800['includes'](_0x21d939));}}else{if(_0x22f985['match'](/ELEMENT[ ](.*)/i)){const _0x1d57cc=String(RegExp['$1'])['split'](','),_0x31aa5c=_0x1d57cc['map'](_0x13bc27=>DataManager['getElementIdWithName'](_0x13bc27));return _0x8f4df2[_0x78b609(0x9a)](_0x4a96be=>_0x31aa5c[_0x78b609(0xfc)](_0x4a96be));}}return![];},VisuMZ[_0x395661(0x14d)][_0x395661(0x134)]=Game_BattlerBase['prototype'][_0x395661(0xa9)],Game_BattlerBase[_0x395661(0x168)][_0x395661(0xa9)]=function(){const _0x25a243=_0x395661;VisuMZ['AntiDmgBarriers'][_0x25a243(0x134)]['call'](this),this['initAntiDamageBarriers']();},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x13d)]=function(){const _0x5002f4=_0x395661;this[_0x5002f4(0x120)]={},this[_0x5002f4(0xcd)]={},this[_0x5002f4(0xa5)]={},this[_0x5002f4(0xec)]={},this[_0x5002f4(0x149)]={};},Game_BattlerBase[_0x395661(0x168)]['getAntiDamageBarrierCancelOver']=function(_0x429aa0){const _0x3c710b=_0x395661;if(!this[_0x3c710b(0x141)](_0x429aa0))return 0x0;return this[_0x3c710b(0x120)]===undefined&&this['initAntiDamageBarriers'](),this[_0x3c710b(0x120)][_0x429aa0]||0x0;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x129)]=function(_0x429026,_0x2205f8){const _0x2a3924=_0x395661;this[_0x2a3924(0x120)]===undefined&&this[_0x2a3924(0x13d)](),this[_0x2a3924(0x120)][_0x429026]=_0x2205f8;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x150)]=function(_0x1b3119){const _0x479744=_0x395661;if(!this[_0x479744(0x141)](_0x1b3119))return 0x0;if(this[_0x479744(0xcd)]===undefined){if('NgdUx'!==_0x479744(0x11e)){const _0x3671f8=_0x3ebf99[_0x479744(0x124)]('['+_0x256df1['$1'][_0x479744(0x100)](/\d+/g)+']');return _0x10349a[_0x479744(0x9a)](_0x1dee02=>_0x3671f8['includes'](_0x1dee02));}else this[_0x479744(0x13d)]();}return this[_0x479744(0xcd)][_0x1b3119]||0x0;},Game_BattlerBase['prototype'][_0x395661(0xab)]=function(_0x1be6f4,_0xcdfce6){const _0x5ba707=_0x395661;this[_0x5ba707(0xcd)]===undefined&&this[_0x5ba707(0x13d)](),this[_0x5ba707(0xcd)][_0x1be6f4]=_0xcdfce6;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x92)]=function(_0x11c560){const _0x424841=_0x395661;if(!this['isStateAffected'](_0x11c560))return 0x0;return this[_0x424841(0xa5)]===undefined&&('OpkXu'===_0x424841(0xb5)?this[_0x424841(0x13d)]():this[_0x424841(0x13d)]()),this[_0x424841(0xa5)][_0x11c560]||0x0;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0xde)]=function(_0x204c01,_0x636180){const _0xe65893=_0x395661;this['_antiDamageBarrierReduction']===undefined&&this[_0xe65893(0x13d)](),this[_0xe65893(0xa5)][_0x204c01]=_0x636180;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0xc9)]=function(_0xb42281){const _0x373011=_0x395661;if(!this[_0x373011(0x141)](_0xb42281))return 0x0;return this[_0x373011(0xec)]===undefined&&this[_0x373011(0x13d)](),this[_0x373011(0xec)][_0xb42281]||0x0;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0xf1)]=function(_0x4f6f50,_0x44abff){const _0xe02750=_0x395661;this[_0xe02750(0xec)]===undefined&&('wlWjN'!==_0xe02750(0xfe)?this[_0xe02750(0x13d)]():this[_0xe02750(0x13d)]()),this[_0xe02750(0xec)][_0x4f6f50]=_0x44abff;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x99)]=function(_0x4d8be0){const _0x209a3a=_0x395661;if(!this['isStateAffected'](_0x4d8be0))return 0x0;return this[_0x209a3a(0x149)]===undefined&&this[_0x209a3a(0x13d)](),this[_0x209a3a(0x149)][_0x4d8be0]||0x0;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x12c)]=function(_0x12765f,_0x193fb4){const _0xd8eed4=_0x395661;this['_antiDamageBarrierTp']===undefined&&('ZAQhh'===_0xd8eed4(0xad)?(_0x3b2179*=(0x1-_0x58c958)[_0xd8eed4(0x133)](0x0,0x1),_0x1fd435[_0xd8eed4(0xa1)]()):this[_0xd8eed4(0x13d)]()),this[_0xd8eed4(0x149)][_0x12765f]=_0x193fb4;},Game_BattlerBase[_0x395661(0x168)][_0x395661(0x10d)]=function(){const _0x2abfb3=_0x395661,_0x5a7d27=this[_0x2abfb3(0xfb)]()[_0x2abfb3(0x154)](this[_0x2abfb3(0xe1)]()),_0x50e2ba=VisuMZ[_0x2abfb3(0x14d)][_0x2abfb3(0xe3)][_0x2abfb3(0x9f)];return _0x5a7d27[_0x2abfb3(0x9a)](_0x503045=>_0x503045&&_0x503045['note']&&_0x503045['note'][_0x2abfb3(0x100)](_0x50e2ba));},Game_BattlerBase[_0x395661(0x168)][_0x395661(0xf4)]=function(){const _0x5eef91=_0x395661,_0x3a5e98=Number['MAX_SAFE_INTEGER'],_0x516864=this[_0x5eef91(0x162)]()['sort']((_0x20cb61,_0x26417d)=>{const _0x222072=_0x5eef91;if(_0x222072(0xc3)==='JBMoc'){const _0x287896=_0x46b466[_0x222072(0x14d)][_0x222072(0x122)](_0x39e05a['$2']);this[_0x222072(0x129)](_0x3a869a,_0x287896||0x0);}else{const _0x557074=_0x20cb61[_0x222072(0xd2)]===0x0?_0x3a5e98:this[_0x222072(0x9e)](_0x20cb61['id']),_0x5709a8=_0x26417d[_0x222072(0xd2)]===0x0?_0x3a5e98:this['stateTurns'](_0x26417d['id']);if(_0x557074!==_0x5709a8){if('LxFkZ'===_0x222072(0x115))this['initAntiDamageBarriers']();else return _0x557074-_0x5709a8;}const _0x428d06=_0x20cb61[_0x222072(0xa2)],_0x489aae=_0x26417d[_0x222072(0xa2)];if(_0x428d06!==_0x489aae){if(_0x222072(0x127)===_0x222072(0xc5)){if(!this[_0x222072(0x141)](_0x108b6c))return 0x0;return this[_0x222072(0x120)]===_0x23b5c7&&this['initAntiDamageBarriers'](),this[_0x222072(0x120)][_0x3efe50]||0x0;}else return _0x489aae-_0x428d06;}return _0x20cb61['id']-_0x26417d['id'];}});return _0x516864;},VisuMZ[_0x395661(0x14d)][_0x395661(0x10e)]=function(_0x1be4e8){const _0xcc4713=_0x395661;$gameParty[_0xcc4713(0xd9)]()?_0xcc4713(0x148)===_0xcc4713(0x143)?this['onAntiDamageBarrierEffect']('TP',![]):window['user']=BattleManager[_0xcc4713(0x167)]||_0x1be4e8:window[_0xcc4713(0xae)]=SceneManager['_scene']['_actor']||_0x1be4e8,window[_0xcc4713(0xc6)]=_0x1be4e8,window['a']=window[_0xcc4713(0xae)],window['b']=window[_0xcc4713(0xc6)];},VisuMZ['AntiDmgBarriers']['clearJsTargets']=function(){const _0x2e9241=_0x395661;window[_0x2e9241(0xae)]=undefined,window[_0x2e9241(0xc6)]=undefined,window['a']=undefined,window['b']=undefined;},VisuMZ[_0x395661(0x14d)][_0x395661(0x122)]=function(_0x93dabb){const _0x13c3c0=_0x395661;_0x93dabb=_0x93dabb['replace'](/\b(\d+)([%％])/gi,(_0x2309d9,_0xcee0c8)=>(Number(_0xcee0c8)||0x0)*0.01);try{if(_0x13c3c0(0x10c)===_0x13c3c0(0x10c))return eval(_0x93dabb);else{const _0x4e3293=this[_0x13c3c0(0xd4)]()[_0x13c3c0(0xfb)](),_0x544e77=_0x357bc4[_0x13c3c0(0x14d)]['RegExp'][_0x13c3c0(0x94)];return _0x4e3293['some'](_0x4ae2a8=>_0x4ae2a8&&_0x4ae2a8[_0x13c3c0(0x169)]&&_0x4ae2a8[_0x13c3c0(0x169)][_0x13c3c0(0x100)](_0x544e77));}}catch(_0x8b7639){if($gameTemp[_0x13c3c0(0xf8)]())console[_0x13c3c0(0x10a)](_0x8b7639);return 0x0;}},VisuMZ['AntiDmgBarriers'][_0x395661(0xfd)]=Game_Battler[_0x395661(0x168)][_0x395661(0xd5)],Game_Battler[_0x395661(0x168)][_0x395661(0xd5)]=function(_0x4b75e5){const _0x346eac=_0x395661;VisuMZ[_0x346eac(0x14d)][_0x346eac(0xfd)][_0x346eac(0x96)](this,_0x4b75e5),this[_0x346eac(0xb2)](_0x4b75e5);},Game_Battler[_0x395661(0x168)][_0x395661(0xb2)]=function(_0x3fa1cf){const _0x33ba30=_0x395661;if(!this[_0x33ba30(0x141)](_0x3fa1cf))return;const _0x772763=$dataStates[_0x3fa1cf];if(!_0x772763)return;const _0x483170=VisuMZ[_0x33ba30(0x14d)][_0x33ba30(0xe3)],_0x5c472a=_0x772763[_0x33ba30(0x169)];VisuMZ[_0x33ba30(0x14d)][_0x33ba30(0x10e)](this);if(_0x5c472a[_0x33ba30(0x100)](_0x483170[_0x33ba30(0x11d)])){const _0x4b854f=VisuMZ['AntiDmgBarriers'][_0x33ba30(0x122)](RegExp['$2']);this[_0x33ba30(0x13e)](_0x3fa1cf,_0x4b854f||0x1);}if(_0x5c472a[_0x33ba30(0x100)](_0x483170[_0x33ba30(0x11f)])){const _0x3afe62=VisuMZ['AntiDmgBarriers']['CalculateCharges'](RegExp['$2']);this[_0x33ba30(0x129)](_0x3fa1cf,_0x3afe62||0x0);}if(_0x5c472a[_0x33ba30(0x100)](_0x483170['CancelUnder'])){const _0x35763f=VisuMZ[_0x33ba30(0x14d)]['CalculateCharges'](RegExp['$2']);this[_0x33ba30(0xab)](_0x3fa1cf,_0x35763f||0x0);}if(_0x5c472a['match'](_0x483170[_0x33ba30(0x117)])){const _0x5d894e=VisuMZ[_0x33ba30(0x14d)][_0x33ba30(0x122)](RegExp['$2']);this['setAntiDamageBarrierReduction'](_0x3fa1cf,_0x5d894e||0x0);}if(_0x5c472a[_0x33ba30(0x100)](_0x483170['AbsorbBarrier'])){const _0x2d6ae6=VisuMZ['AntiDmgBarriers'][_0x33ba30(0x122)](RegExp['$2']);this[_0x33ba30(0x13e)](_0x3fa1cf,_0x2d6ae6||0x0);}if(_0x5c472a[_0x33ba30(0x100)](_0x483170['MpBarrier'])){if(_0x33ba30(0x156)===_0x33ba30(0x156)){const _0x2ac47b=VisuMZ['AntiDmgBarriers'][_0x33ba30(0x122)](RegExp['$2']);this[_0x33ba30(0xf1)](_0x3fa1cf,_0x2ac47b||0x0);}else return!![];}if(_0x5c472a[_0x33ba30(0x100)](_0x483170[_0x33ba30(0x159)])){const _0x18b2f6=VisuMZ[_0x33ba30(0x14d)][_0x33ba30(0x122)](RegExp['$2']);this[_0x33ba30(0x12c)](_0x3fa1cf,_0x18b2f6||0x0);}VisuMZ['AntiDmgBarriers'][_0x33ba30(0xe4)]();},Game_Battler[_0x395661(0x168)]['onAntiDamageBarrierEffect']=function(_0x1b5aef,_0x49f465){const _0x4aae06=_0x395661;if(!SceneManager[_0x4aae06(0xa0)]())return;const _0x973754=VisuMZ[_0x4aae06(0x14d)][_0x4aae06(0x106)][_0x1b5aef];if(!_0x973754)return;const _0x673749=_0x49f465?_0x4aae06(0x9d):'Break';if(_0x973754[_0x4aae06(0xd7)[_0x4aae06(0x12f)](_0x673749)]>0x0){if('RlqHU'===_0x4aae06(0x157)){const _0xd7d220=[this],_0x1ddb22=_0x973754[_0x4aae06(0xd7)['format'](_0x673749)];let _0x17d47c=_0x973754[_0x4aae06(0x142)[_0x4aae06(0x12f)](_0x673749)];_0x973754[_0x4aae06(0x110)[_0x4aae06(0x12f)](_0x673749)]&&(_0x17d47c=!_0x17d47c);const _0x58f3e4=_0x973754[_0x4aae06(0xa4)[_0x4aae06(0x12f)](_0x673749)];$gameTemp[_0x4aae06(0x128)](_0xd7d220,_0x1ddb22,_0x17d47c,_0x58f3e4);}else{const _0x10ac14=_0x416a32['id'];this['tp']<=0x0&&this['removeState'](_0x10ac14),this[_0x4aae06(0xea)]('TP',this['tp']>0x0);}}},Game_Battler[_0x395661(0x168)][_0x395661(0x104)]=function(_0x4d5f79){const _0x370ed2=_0x395661;if(!_0x4d5f79)return;const _0x581745=_0x4d5f79['id'],_0x62c216=VisuMZ[_0x370ed2(0x14d)][_0x370ed2(0xe3)],_0x57f10d=_0x4d5f79[_0x370ed2(0x169)];this[_0x370ed2(0xa6)](_0x581745);if(_0x57f10d[_0x370ed2(0x100)](_0x62c216[_0x370ed2(0x11d)]))this[_0x370ed2(0xea)](_0x370ed2(0x116),![]);else{if(_0x57f10d[_0x370ed2(0x100)](_0x62c216['CancelOver']))this[_0x370ed2(0xea)](_0x370ed2(0xf7),![]);else{if(_0x57f10d[_0x370ed2(0x100)](_0x62c216[_0x370ed2(0xc2)]))this[_0x370ed2(0xea)](_0x370ed2(0xf7),![]);else{if(_0x57f10d['match'](_0x62c216[_0x370ed2(0x117)]))this[_0x370ed2(0xea)]('Reduce',![]);else{if(_0x57f10d[_0x370ed2(0x100)](_0x62c216[_0x370ed2(0x14f)])){if(_0x370ed2(0x15a)!=='xbImf')this[_0x370ed2(0xea)]('Absorb',![]);else return _0x5c9097-_0x3f8b29;}else{if(_0x57f10d[_0x370ed2(0x100)](_0x62c216[_0x370ed2(0x16a)]))this[_0x370ed2(0xea)]('MP',![]);else _0x57f10d[_0x370ed2(0x100)](_0x62c216[_0x370ed2(0x159)])&&this[_0x370ed2(0xea)]('TP',![]);}}}}}},Game_Battler[_0x395661(0x168)][_0x395661(0x14e)]=function(_0xc66711){const _0x1f618e=_0x395661,_0x4c30d6=_0xc66711['id'];let _0x2b27ba=(Number(this[_0x1f618e(0xe8)](_0x4c30d6))||0x0)-0x1;this[_0x1f618e(0x13e)](_0x4c30d6,_0x2b27ba),_0x2b27ba<=0x0&&this[_0x1f618e(0xa6)](_0x4c30d6),this[_0x1f618e(0xea)](_0x1f618e(0x116),_0x2b27ba>0x0);},Game_Battler[_0x395661(0x168)]['onAntiDamageCancelBarrier']=function(_0x8d9659){const _0x5d4441=_0x395661;this[_0x5d4441(0xea)](_0x5d4441(0xf7),!![]);},Game_Battler[_0x395661(0x168)]['onAntiDamageReductionBarrier']=function(){const _0x1ac1ee=_0x395661;this[_0x1ac1ee(0xea)](_0x1ac1ee(0xef),!![]);},Game_Battler[_0x395661(0x168)]['displayAbsorptionBarrierPopup']=function(_0x5df857,_0x476c96){const _0x56ded2=_0x395661;if(!SceneManager['isSceneBattle']())return![];const _0x160326=VisuMZ['AntiDmgBarriers']['Settings'][_0x56ded2(0xed)];if(!_0x160326)return;if(_0x160326[_0x56ded2(0x113)]==='')return;const _0x386529=_0x160326['PopupText'][_0x56ded2(0x12f)](_0x5df857),_0x1ff27e={'textColor':_0x160326[_0x56ded2(0xb4)],'flashColor':_0x160326[_0x56ded2(0xf0)],'flashDuration':_0x160326[_0x56ded2(0xa7)]};this[_0x56ded2(0xcf)](_0x386529,_0x1ff27e);},Game_Battler[_0x395661(0x168)][_0x395661(0xe0)]=function(_0x4c13dc){const _0x35b10a=_0x395661,_0x2409ca=_0x4c13dc['id'];let _0x386db0=Number(this[_0x35b10a(0xe8)](_0x2409ca))||0x0;_0x386db0<=0x0&&this['removeState'](_0x2409ca),this[_0x35b10a(0xea)](_0x35b10a(0xed),_0x386db0>0x0);},Game_Battler[_0x395661(0x168)]['onAntiDamageMpBarrier']=function(_0x1a0c30){const _0x2451ca=_0x395661,_0x23fc78=_0x1a0c30['id'];if(this['mp']<=0x0){if('OfDAs'!==_0x2451ca(0x136)){if(!_0x5c799b['isSceneBattle']())return![];const _0x39fd49=_0x50fb00['AntiDmgBarriers']['Settings']['TP'];if(!_0x39fd49)return;if(_0x39fd49[_0x2451ca(0x113)]==='')return;const _0x53961d=_0x39fd49[_0x2451ca(0x113)][_0x2451ca(0x12f)](_0x30f1dc,_0x152816['tp']),_0x1d4bf3={'textColor':_0x39fd49[_0x2451ca(0xb4)],'flashColor':_0x39fd49[_0x2451ca(0xf0)],'flashDuration':_0x39fd49['FlashDuration']};this[_0x2451ca(0xcf)](_0x53961d,_0x1d4bf3);}else this[_0x2451ca(0xa6)](_0x23fc78);}this['onAntiDamageBarrierEffect']('MP',this['mp']>0x0);},Game_Battler['prototype'][_0x395661(0x97)]=function(_0x273edd){const _0x49bc1f=_0x395661;if(!SceneManager[_0x49bc1f(0xa0)]())return![];const _0x129e5f=VisuMZ[_0x49bc1f(0x14d)][_0x49bc1f(0x106)]['TP'];if(!_0x129e5f)return;if(_0x129e5f[_0x49bc1f(0x113)]==='')return;const _0x19b532=_0x129e5f['PopupText'][_0x49bc1f(0x12f)](_0x273edd,TextManager['tp']),_0x266732={'textColor':_0x129e5f[_0x49bc1f(0xb4)],'flashColor':_0x129e5f[_0x49bc1f(0xf0)],'flashDuration':_0x129e5f['FlashDuration']};this[_0x49bc1f(0xcf)](_0x19b532,_0x266732);},Game_Battler[_0x395661(0x168)]['onAntiDamageTpBarrier']=function(_0x3b57ad){const _0x1681f7=_0x395661,_0x58f90c=_0x3b57ad['id'];this['tp']<=0x0&&('Bcqvg'!==_0x1681f7(0xcc)?this[_0x1681f7(0xa6)](_0x58f90c):(_0x24fe1d(_0x1681f7(0xaa)[_0x1681f7(0x12f)](_0x224456,_0x1dbd22,_0x3966ee)),_0x1db17d[_0x1681f7(0xcb)]())),this[_0x1681f7(0xea)]('TP',this['tp']>0x0);},Game_Battler['prototype'][_0x395661(0x144)]=function(_0x552e90){const _0x4e577c=_0x395661;if(!_0x552e90)return;if(!_0x552e90[_0x4e577c(0xbb)]())return;let _0x5d18df=[];for(const _0x364293 of this[_0x4e577c(0x162)]()){if(_0x4e577c(0xe6)===_0x4e577c(0x90))_0xf97951[_0x4e577c(0x14d)][_0x4e577c(0xe2)][_0x4e577c(0x96)](this),this[_0x4e577c(0xfa)]()&&this[_0x4e577c(0x130)]();else{if(!_0x364293)continue;if(!this['isStateAffected'](_0x364293['id']))continue;VisuMZ['AntiDmgBarriers'][_0x4e577c(0xc0)](_0x364293,_0x552e90)&&_0x5d18df['push'](_0x364293['id']);}}for(const _0x5de464 of _0x5d18df){if(_0x4e577c(0x132)===_0x4e577c(0x160)){const _0x49776f=_0x104d79['AntiDmgBarriers'][_0x4e577c(0x122)](_0x1e2234['$2']);this[_0x4e577c(0xf1)](_0x4153af,_0x49776f||0x0);}else{const _0x41385e=$dataStates[_0x5de464];if(!_0x41385e)continue;this['processBreakStateEffect'](_0x41385e);}}},VisuMZ[_0x395661(0x14d)][_0x395661(0xc0)]=function(_0x36de34,_0x7cf823){const _0x38a08d=_0x395661,_0x41a313=VisuMZ['AntiDmgBarriers'][_0x38a08d(0xe3)]['BreakState'],_0x314a5f=_0x36de34[_0x38a08d(0x169)][_0x38a08d(0x100)](_0x41a313);if(_0x314a5f)for(const _0x4d09db of _0x314a5f){if(_0x38a08d(0xdb)!==_0x38a08d(0xb0)){if(!_0x4d09db)continue;_0x4d09db[_0x38a08d(0x100)](_0x41a313);const _0x498469=String(RegExp['$1']);if(_0x7cf823[_0x38a08d(0x121)](_0x498469))return!![];}else this['regenerateAntiDamageBarriers']();}return![];},VisuMZ['AntiDmgBarriers']['Game_Battler_regenerateAll']=Game_Battler['prototype'][_0x395661(0x95)],Game_Battler[_0x395661(0x168)]['regenerateAll']=function(){const _0x360657=_0x395661;VisuMZ[_0x360657(0x14d)][_0x360657(0xe2)][_0x360657(0x96)](this),this['isAlive']()&&this['regenerateAntiDamageBarriers']();},Game_Battler[_0x395661(0x168)][_0x395661(0x130)]=function(){const _0x50c7b6=_0x395661;VisuMZ[_0x50c7b6(0x14d)]['createJsTargets'](this);const _0x4d18ba=VisuMZ[_0x50c7b6(0x14d)][_0x50c7b6(0xe3)];for(const _0x4c61ce of this[_0x50c7b6(0x162)]()){if('iQiSY'===_0x50c7b6(0x153)){if(!_0x4c61ce)continue;const _0x816d51=_0x4c61ce[_0x50c7b6(0x169)];(_0x816d51[_0x50c7b6(0x100)](_0x4d18ba['NullBarrier'])||_0x816d51[_0x50c7b6(0x100)](_0x4d18ba[_0x50c7b6(0x14f)]))&&this[_0x50c7b6(0xb6)](_0x4c61ce);}else _0x499651[_0x50c7b6(0xae)]=_0x1f6eed[_0x50c7b6(0xbc)][_0x50c7b6(0x112)]||_0x20d441;}VisuMZ[_0x50c7b6(0x14d)][_0x50c7b6(0xe4)]();},Game_Battler[_0x395661(0x168)][_0x395661(0xb6)]=function(_0x435b11){const _0x3eab13=_0x395661,_0x2da95a=VisuMZ[_0x3eab13(0x14d)][_0x3eab13(0xe3)],_0x108210=_0x435b11[_0x3eab13(0x169)];let _0x2d71f6=0x0;_0x108210[_0x3eab13(0x100)](_0x2da95a['BarrierDegen'])&&(_0x2d71f6-=VisuMZ['AntiDmgBarriers'][_0x3eab13(0x122)](RegExp['$1']));if(_0x108210[_0x3eab13(0x100)](_0x2da95a[_0x3eab13(0x13f)])){if(_0x3eab13(0x13c)!==_0x3eab13(0x13c))return _0x27be78(_0x499794);else _0x2d71f6+=VisuMZ[_0x3eab13(0x14d)][_0x3eab13(0x122)](RegExp['$1']);}let _0x5c27c5=Number(this['getStateDisplay'](_0x435b11['id']));_0x5c27c5+=_0x2d71f6,_0x5c27c5>0x0?this[_0x3eab13(0x13e)](_0x435b11['id'],_0x5c27c5):_0x3eab13(0xbf)!=='oUhqY'?this[_0x3eab13(0x104)](_0x435b11):_0x4b0bbf+=_0x43ad12[_0x3eab13(0x92)](_0x2ac022['id']);};