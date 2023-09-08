//=============================================================================
// VisuStella MZ - Anti-Damage Barriers
// VisuMZ_3_AntiDmgBarriers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AntiDmgBarriers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AntiDmgBarriers = VisuMZ.AntiDmgBarriers || {};
VisuMZ.AntiDmgBarriers.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [AntiDmgBarriers]
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

const _0x2b7d9c=_0xa513;function _0xa513(_0x9f72c5,_0x5e64d1){const _0x2c8bee=_0x2c8b();return _0xa513=function(_0xa513e5,_0x141b85){_0xa513e5=_0xa513e5-0x1d4;let _0x4d838d=_0x2c8bee[_0xa513e5];return _0x4d838d;},_0xa513(_0x9f72c5,_0x5e64d1);}(function(_0xf79c14,_0x423526){const _0x12c792=_0xa513,_0x31fd62=_0xf79c14();while(!![]){try{const _0x4116d5=-parseInt(_0x12c792(0x1f6))/0x1+parseInt(_0x12c792(0x217))/0x2+-parseInt(_0x12c792(0x221))/0x3*(-parseInt(_0x12c792(0x21d))/0x4)+-parseInt(_0x12c792(0x248))/0x5*(-parseInt(_0x12c792(0x20d))/0x6)+parseInt(_0x12c792(0x22a))/0x7+parseInt(_0x12c792(0x235))/0x8*(-parseInt(_0x12c792(0x252))/0x9)+-parseInt(_0x12c792(0x249))/0xa;if(_0x4116d5===_0x423526)break;else _0x31fd62['push'](_0x31fd62['shift']());}catch(_0x13ed0a){_0x31fd62['push'](_0x31fd62['shift']());}}}(_0x2c8b,0x41f1f));function _0x2c8b(){const _0x302ad6=['ignoreAllAntiDamageBarriers','264856RTGWwp','VisuMZ_1_SkillsStatesCore','_antiDamageBarrierMp','Game_BattlerBase_initMembers','9fxRHIn','Settings','isAlive','regenerateAntiDamageBarriers','addState','onAntiDamageAbsorptionBarrier','ARRAYEVAL','ARRAYSTR','MpBarrier','2302783BZCXEL','clearJsTargets','getStateDisplay','includes','toUpperCase','Nullify','JSON','initAntiDamageBarriers','applyReductionBarrier','getElementIdWithName','applyTpBarrier','2323144VFsumd','applyNullificationBarrier','onAntiDamageMpBarrier','autoRemovalTiming','onAntiDamageCancelBarrier','StateMatchesBreakEffect','BarrierDegen','Reduce','ReduceBarrier','FlashDuration','some','item','BreakState','getAntiDamageBarrierCancelOver','AntiDmgBarriers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','split','%1AnimationID','Intact','567115kNWOVj','1136400BHhcma','concat','onAntiDamageBarrierEffect','push','Absorb','regenerateAll','setAntiDamageBarrierTp','TpBarrier','map','9EsDMes','matchesAntiDamageBarrierType','onAntiDamageNullificationBarrier','createJsTargets','log','setAntiDamageBarrierCancelUnder','RegExp','matchesAntiDamageBarrier','exit','getAntiDamageBarrierStates','MAX_SAFE_INTEGER','applyPostAntiDamageBarriers','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ANY','getAntiDamageBarrierMp','stateTurns','floor','%1Mirror','sort','CalculateCharges','PreDamage%1JS','_antiDamageBarrierReduction','onAntiDamageReductionBarrier','ARRAYNUM','CancelOver','isStateAffected','%1Mute','traitObjects','FlashColor','setStateDisplay','version','_subject','filter','Game_Action_applyBattleCoreJS','trim','TextColor','_antiDamageBarrierTp','subject','prototype','states','BarrierRegen','name','%1EnemyFlip','hasAntiDmgBarriersNotetag','ConvertParams','applyAbsorptionBarrier','_antiDamageBarrierCancelUnder','note','initMembers','STRUCT','target','replace','NullBarrier','Game_Battler_addState','applyPreAntiDamageBarriers','setAntiDamageBarrierMp','match','isCertainHit','call','AbsorbBarrier','applyBattleCoreJS','ceil','Game_Battler_regenerateAll','format','elements','isSceneBattle','422616rrXWAw','description','CancelUnder','isAntiDamageBarrierIgnoredAsSubject','isPlaytest','getAntiDamageBarrierTp','displayAbsorptionBarrierPopup','applyCancelOverBarrier','getAntiDamageBarrierCancelUnder','applyBreakStateEffects','ARRAYJSON','parse','matchesAntiDamageBarrierElementType','STR','user','isHpEffect','initAntiDamageBarrierDataForState','priority','removeState','setupTextPopup','parameters','Break','PopupText','6ETmlGr','isAntiDamageBarrierIgnoredAsTarget','_antiDamageBarrierCancelOver','setAntiDamageBarrierCancelOver','IgnoreAllBarrier','Cancel','isAntiDamageBarrierIgnored','ARRAYFUNC','min','gainMp','911452FlONjk','getAntiDamageBarrierReduction','displayTpBarrierPopup','applyCancelUnderBarrier','setAntiDamageBarrierReduction'];_0x2c8b=function(){return _0x302ad6;};return _0x2c8b();}var label='AntiDmgBarriers',tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine','VisuMZ_1_BattleCore',_0x2b7d9c(0x21e),'VisuMZ_1_ElementStatusCore'],pluginData=$plugins[_0x2b7d9c(0x1d4)](function(_0x446bcf){const _0x577594=_0x2b7d9c;return _0x446bcf['status']&&_0x446bcf['description'][_0x577594(0x22d)]('['+label+']');})[0x0];VisuMZ[label][_0x2b7d9c(0x222)]=VisuMZ[label][_0x2b7d9c(0x222)]||{},VisuMZ['ConvertParams']=function(_0x35e702,_0xe0cfb7){const _0x311358=_0x2b7d9c;for(const _0x414830 in _0xe0cfb7){if(_0x414830['match'](/(.*):(.*)/i)){const _0x59896a=String(RegExp['$1']),_0x2fb3a5=String(RegExp['$2'])[_0x311358(0x22e)]()[_0x311358(0x1d6)]();let _0x1f6bf2,_0x3e18b4,_0x29660d;switch(_0x2fb3a5){case'NUM':_0x1f6bf2=_0xe0cfb7[_0x414830]!==''?Number(_0xe0cfb7[_0x414830]):0x0;break;case _0x311358(0x269):_0x3e18b4=_0xe0cfb7[_0x414830]!==''?JSON['parse'](_0xe0cfb7[_0x414830]):[],_0x1f6bf2=_0x3e18b4[_0x311358(0x251)](_0x47bd6f=>Number(_0x47bd6f));break;case'EVAL':_0x1f6bf2=_0xe0cfb7[_0x414830]!==''?eval(_0xe0cfb7[_0x414830]):null;break;case _0x311358(0x227):_0x3e18b4=_0xe0cfb7[_0x414830]!==''?JSON['parse'](_0xe0cfb7[_0x414830]):[],_0x1f6bf2=_0x3e18b4[_0x311358(0x251)](_0x4e3a6a=>eval(_0x4e3a6a));break;case _0x311358(0x230):_0x1f6bf2=_0xe0cfb7[_0x414830]!==''?JSON[_0x311358(0x201)](_0xe0cfb7[_0x414830]):'';break;case _0x311358(0x200):_0x3e18b4=_0xe0cfb7[_0x414830]!==''?JSON[_0x311358(0x201)](_0xe0cfb7[_0x414830]):[],_0x1f6bf2=_0x3e18b4[_0x311358(0x251)](_0x5d5b09=>JSON[_0x311358(0x201)](_0x5d5b09));break;case'FUNC':_0x1f6bf2=_0xe0cfb7[_0x414830]!==''?new Function(JSON[_0x311358(0x201)](_0xe0cfb7[_0x414830])):new Function('return\x200');break;case _0x311358(0x214):_0x3e18b4=_0xe0cfb7[_0x414830]!==''?JSON['parse'](_0xe0cfb7[_0x414830]):[],_0x1f6bf2=_0x3e18b4[_0x311358(0x251)](_0x490e68=>new Function(JSON[_0x311358(0x201)](_0x490e68)));break;case _0x311358(0x203):_0x1f6bf2=_0xe0cfb7[_0x414830]!==''?String(_0xe0cfb7[_0x414830]):'';break;case _0x311358(0x228):_0x3e18b4=_0xe0cfb7[_0x414830]!==''?JSON[_0x311358(0x201)](_0xe0cfb7[_0x414830]):[],_0x1f6bf2=_0x3e18b4[_0x311358(0x251)](_0x39a61e=>String(_0x39a61e));break;case _0x311358(0x1e5):_0x29660d=_0xe0cfb7[_0x414830]!==''?JSON[_0x311358(0x201)](_0xe0cfb7[_0x414830]):{},_0x1f6bf2=VisuMZ[_0x311358(0x1e0)]({},_0x29660d);break;case'ARRAYSTRUCT':_0x3e18b4=_0xe0cfb7[_0x414830]!==''?JSON['parse'](_0xe0cfb7[_0x414830]):[],_0x1f6bf2=_0x3e18b4[_0x311358(0x251)](_0x1e5c90=>VisuMZ['ConvertParams']({},JSON[_0x311358(0x201)](_0x1e5c90)));break;default:continue;}_0x35e702[_0x59896a]=_0x1f6bf2;}}return _0x35e702;},(_0xc267fa=>{const _0x512007=_0x2b7d9c,_0x25f173=_0xc267fa[_0x512007(0x1dd)];for(const _0x2eb760 of dependencies){if(!Imported[_0x2eb760]){alert(_0x512007(0x25e)[_0x512007(0x1f3)](_0x25f173,_0x2eb760)),SceneManager[_0x512007(0x25a)]();break;}}const _0x11592f=_0xc267fa[_0x512007(0x1f7)];if(_0x11592f[_0x512007(0x1ec)](/\[Version[ ](.*?)\]/i)){const _0x5d1b40=Number(RegExp['$1']);_0x5d1b40!==VisuMZ[label][_0x512007(0x270)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x25f173,_0x5d1b40)),SceneManager[_0x512007(0x25a)]());}if(_0x11592f[_0x512007(0x1ec)](/\[Tier[ ](\d+)\]/i)){const _0x1e0706=Number(RegExp['$1']);_0x1e0706<tier?(alert(_0x512007(0x244)[_0x512007(0x1f3)](_0x25f173,_0x1e0706,tier)),SceneManager[_0x512007(0x25a)]()):tier=Math['max'](_0x1e0706,tier);}VisuMZ[_0x512007(0x1e0)](VisuMZ[label]['Settings'],_0xc267fa[_0x512007(0x20a)]);})(pluginData),VisuMZ['AntiDmgBarriers'][_0x2b7d9c(0x258)]={'IgnoreAllBarrier':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS)>/gi,'IgnoreAllBarrierAsAttacker':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:ATTACKER|USER)>/gi,'IgnoreAllBarrierAsDefender':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:TARGET|DEFENDER)>/gi,'CancelOver':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG OVER|DAMAGE OVER|OVER):[ ](.*)>/gi,'CancelUnder':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG UNDER|DAMAGE UNDER|UNDER):[ ](.*)>/gi,'NullBarrier':/<(.*)[ ](?:NULLIFY|NULL|NULLIFICATION)[ ]BARRIER:[ ](.*)>/gi,'ReduceBarrier':/<(.*)[ ](?:CUT|REDUCE|REDUCTION)[ ]BARRIER:[ ](.*)>/gi,'AbsorbBarrier':/<(.*)[ ](?:ABSORB|ABSORPTION)[ ]BARRIER:[ ](.*)>/gi,'MpBarrier':/<(.*)[ ](?:MP|MAGIC|MANA)[ ]BARRIER:[ ](.*)>/gi,'TpBarrier':/<(.*)[ ](?:TP|TECH|LIMIT)[ ]BARRIER:[ ](.*)>/gi,'BreakState':/<(.*)[ ](?:BREAK|BREAKS)[ ]STATE>/gi,'BarrierDegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:DECAY|DEGEN):[ ](.*)>/gi,'BarrierRegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:REGENERATION|REGEN):[ ](.*)>/gi},DataManager[_0x2b7d9c(0x1df)]=function(_0x142d9d){const _0x535b6d=_0x2b7d9c;if(!_0x142d9d)return![];const _0x138dee=VisuMZ['AntiDmgBarriers'][_0x535b6d(0x258)],_0xa52fa=_0x142d9d[_0x535b6d(0x1e3)]||'';for(const _0x1aaaf6 in _0x138dee){if(_0xa52fa[_0x535b6d(0x1ec)](_0x138dee[_0x1aaaf6]))return!![];}return![];},VisuMZ[_0x2b7d9c(0x243)][_0x2b7d9c(0x1d5)]=Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1f0)],Game_Action['prototype']['applyBattleCoreJS']=function(_0x538125,_0x142c41,_0x1b0a83,_0x1b9552){const _0x553803=_0x2b7d9c,_0x2cfeb2=_0x538125===_0x553803(0x266)&&this[_0x553803(0x205)]()&&_0x1b0a83>0x0;return _0x2cfeb2&&_0x142c41['applyBreakStateEffects'](this),_0x2cfeb2&&(_0x1b0a83=this[_0x553803(0x1ea)](_0x142c41,_0x1b0a83)),_0x1b0a83=VisuMZ[_0x553803(0x243)][_0x553803(0x1d5)][_0x553803(0x1ee)](this,_0x538125,_0x142c41,_0x1b0a83,_0x1b9552),_0x2cfeb2&&(_0x1b0a83=this[_0x553803(0x25d)](_0x142c41,_0x1b0a83)),_0x1b0a83;},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1ea)]=function(_0x55dc82,_0x15a703){const _0x5cf0db=_0x2b7d9c;if(this[_0x5cf0db(0x213)](_0x55dc82))return _0x15a703;if(this[_0x5cf0db(0x1fd)](_0x55dc82,_0x15a703))return 0x0;if(this[_0x5cf0db(0x21a)](_0x55dc82,_0x15a703))return 0x0;if(this[_0x5cf0db(0x236)](_0x55dc82))return 0x0;return _0x15a703;},Game_Action['prototype'][_0x2b7d9c(0x25d)]=function(_0x13741f,_0x4425f9){const _0x588d4a=_0x2b7d9c;if(this[_0x588d4a(0x213)](_0x13741f))return _0x4425f9;if(_0x4425f9<=0x0)return _0x4425f9;return _0x4425f9=this['applyReductionBarrier'](_0x13741f,_0x4425f9),_0x4425f9=this[_0x588d4a(0x1e1)](_0x13741f,_0x4425f9),_0x4425f9=this['applyMpBarrier'](_0x13741f,_0x4425f9),_0x4425f9=this[_0x588d4a(0x234)](_0x13741f,_0x4425f9),_0x4425f9=Math[_0x588d4a(0x262)](_0x4425f9),_0x4425f9;},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x213)]=function(_0x1533ec){const _0x215008=_0x2b7d9c;if(this[_0x215008(0x240)]()&&this[_0x215008(0x240)]()['note'][_0x215008(0x1ec)](VisuMZ[_0x215008(0x243)]['RegExp'][_0x215008(0x211)]))return!![];if(this[_0x215008(0x1f9)]())return!![];if(this[_0x215008(0x20e)](_0x1533ec))return!![];return![];},Game_Action[_0x2b7d9c(0x1da)]['isAntiDamageBarrierIgnoredAsSubject']=function(){const _0x5c4e11=_0x2b7d9c,_0x59da7c=this[_0x5c4e11(0x1d9)]()[_0x5c4e11(0x26d)](),_0xa2756b=VisuMZ['AntiDmgBarriers'][_0x5c4e11(0x258)]['IgnoreAllBarrierAsAttacker'];return _0x59da7c[_0x5c4e11(0x23f)](_0x486bf1=>_0x486bf1&&_0x486bf1[_0x5c4e11(0x1e3)]&&_0x486bf1[_0x5c4e11(0x1e3)][_0x5c4e11(0x1ec)](_0xa2756b));},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x20e)]=function(_0x176c0e){const _0x3055e0=_0x2b7d9c,_0x2fcdb1=_0x176c0e[_0x3055e0(0x26d)](),_0x3eac70=VisuMZ[_0x3055e0(0x243)][_0x3055e0(0x258)]['IgnoreAllBarrierAsDefender'];return _0x2fcdb1[_0x3055e0(0x23f)](_0x429ee5=>_0x429ee5&&_0x429ee5[_0x3055e0(0x1e3)]&&_0x429ee5['note']['match'](_0x3eac70));},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x236)]=function(_0x4a097a){const _0x1151d2=_0x2b7d9c,_0x55fad0=_0x4a097a[_0x1151d2(0x25b)]();for(const _0x2b8ad0 of _0x55fad0){if(!_0x2b8ad0)continue;if(this[_0x1151d2(0x259)](_0x2b8ad0,'NullBarrier'))return _0x4a097a['onAntiDamageNullificationBarrier'](_0x2b8ad0),!![];}return![];},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1fd)]=function(_0x5419fb,_0xf514a0){const _0x1fe5a5=_0x2b7d9c,_0x33ed96=_0x5419fb['states']();for(const _0x2f280d of _0x33ed96){if(!_0x2f280d)continue;if(_0xf514a0<_0x5419fb[_0x1fe5a5(0x242)](_0x2f280d['id']))continue;if(this[_0x1fe5a5(0x259)](_0x2f280d,_0x1fe5a5(0x26a)))return _0x5419fb[_0x1fe5a5(0x239)](_0x2f280d),!![];}return![];},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x21a)]=function(_0x3fb4c8,_0xca5f56){const _0x43abf4=_0x2b7d9c,_0x31eba5=_0x3fb4c8[_0x43abf4(0x1db)]();for(const _0x78993e of _0x31eba5){if(!_0x78993e)continue;if(_0xca5f56>_0x3fb4c8[_0x43abf4(0x1fe)](_0x78993e['id']))continue;if(this['matchesAntiDamageBarrier'](_0x78993e,'CancelUnder'))return _0x3fb4c8['onAntiDamageCancelBarrier'](_0x78993e),!![];}return![];},Game_Action['prototype'][_0x2b7d9c(0x232)]=function(_0xcc9ba9,_0x2c288a){const _0x5a4fac=_0x2b7d9c;if(_0x2c288a<=0x0)return _0x2c288a;const _0x60c5af=_0xcc9ba9[_0x5a4fac(0x1db)]();let _0x3698ed=0x0;for(const _0x215fed of _0x60c5af){if(!_0x215fed)continue;this[_0x5a4fac(0x259)](_0x215fed,_0x5a4fac(0x23d))&&(_0x3698ed+=_0xcc9ba9[_0x5a4fac(0x218)](_0x215fed['id']));}return _0x3698ed>0x0&&(_0x2c288a*=(0x1-_0x3698ed)['clamp'](0x0,0x1),_0xcc9ba9[_0x5a4fac(0x268)]()),Math[_0x5a4fac(0x262)](_0x2c288a);},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1e1)]=function(_0x371791,_0x83d29e){const _0x345422=_0x2b7d9c;if(_0x83d29e<=0x0)return _0x83d29e;const _0x7e9286=_0x371791[_0x345422(0x25b)]();for(const _0x4249b4 of _0x7e9286){if(!_0x4249b4)continue;if(this['matchesAntiDamageBarrier'](_0x4249b4,_0x345422(0x1ef))){let _0x1170f4=Number(_0x371791[_0x345422(0x22c)](_0x4249b4['id']))||0x0;const _0x2aa2db=Math['min'](_0x83d29e,_0x1170f4);_0x83d29e-=_0x2aa2db,_0x1170f4-=_0x2aa2db,_0x371791['setStateDisplay'](_0x4249b4['id'],_0x1170f4);_0x2aa2db>0x0&&(_0x371791['displayAbsorptionBarrierPopup'](_0x2aa2db,_0x4249b4),_0x371791['onAntiDamageAbsorptionBarrier'](_0x4249b4));if(_0x83d29e<=0x0)break;}}return Math[_0x345422(0x262)](_0x83d29e);},Game_Action['prototype']['applyMpBarrier']=function(_0x48ed6a,_0x3e5e18){const _0x323337=_0x2b7d9c;if(_0x3e5e18<=0x0)return _0x3e5e18;const _0x62e226=_0x48ed6a['states']();let _0x1f2d2e=_0x48ed6a['mp'];for(const _0x4d10df of _0x62e226){if(!_0x4d10df)continue;if(this[_0x323337(0x259)](_0x4d10df,_0x323337(0x229))){const _0x27727e=_0x48ed6a[_0x323337(0x260)](_0x4d10df['id']),_0x23b154=Math[_0x323337(0x215)](Math[_0x323337(0x1f1)](_0x3e5e18*_0x27727e),_0x48ed6a['mp']);_0x3e5e18-=_0x23b154,_0x48ed6a[_0x323337(0x216)](-_0x23b154);_0x23b154>0x0&&_0x48ed6a[_0x323337(0x237)](_0x4d10df);if(_0x3e5e18<=0x0)break;}}return Math['floor'](_0x3e5e18);},Game_Action['prototype'][_0x2b7d9c(0x234)]=function(_0x3a2373,_0x191786){const _0x2d0da5=_0x2b7d9c;if(_0x191786<=0x0)return _0x191786;const _0x1fa3d8=_0x3a2373[_0x2d0da5(0x1db)]();let _0x2ef7b9=_0x3a2373['mp'];for(const _0x1ef437 of _0x1fa3d8){if(!_0x1ef437)continue;if(this[_0x2d0da5(0x259)](_0x1ef437,_0x2d0da5(0x250))){const _0x5071da=_0x3a2373[_0x2d0da5(0x1fb)](_0x1ef437['id']),_0x4d212e=Math[_0x2d0da5(0x215)](Math['ceil'](_0x191786*_0x5071da),_0x3a2373['tp']);_0x191786-=_0x4d212e,_0x3a2373['gainTp'](-_0x4d212e);_0x4d212e>0x0&&(_0x3a2373[_0x2d0da5(0x219)](_0x4d212e),_0x3a2373['onAntiDamageTpBarrier'](_0x1ef437));if(_0x191786<=0x0)break;}}return Math[_0x2d0da5(0x262)](_0x191786);},Game_Action['prototype']['matchesAntiDamageBarrier']=function(_0x3ac11d,_0x11807a){const _0x13ad66=_0x2b7d9c,_0x5e254f=VisuMZ[_0x13ad66(0x243)][_0x13ad66(0x258)][_0x11807a];if(!_0x5e254f)return![];const _0x444874=_0x3ac11d[_0x13ad66(0x1e3)][_0x13ad66(0x1ec)](_0x5e254f);if(_0x444874)for(const _0x3e96f3 of _0x444874){_0x3e96f3['match'](_0x5e254f);const _0x3a46c8=String(RegExp['$1']);if(this[_0x13ad66(0x253)](_0x3a46c8))return!![];}return![];},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x253)]=function(_0x39f7e2){const _0x32ba5f=_0x2b7d9c;_0x39f7e2=_0x39f7e2['toUpperCase']()[_0x32ba5f(0x1d6)]();if(['ALL',_0x32ba5f(0x25f),'DAMAGE'][_0x32ba5f(0x22d)](_0x39f7e2))return!![];else{if(_0x39f7e2['match'](/ELEMENT/i))return this[_0x32ba5f(0x202)](_0x39f7e2);else{if(_0x39f7e2[_0x32ba5f(0x1ec)](/CERTAIN/i))return this[_0x32ba5f(0x1ed)]();else{if(_0x39f7e2[_0x32ba5f(0x1ec)](/PHYSICAL/i))return this['isPhysical']();else{if(_0x39f7e2['match'](/MAGICAL/i))return this['isMagical']();}}}}},Game_Action[_0x2b7d9c(0x1da)][_0x2b7d9c(0x202)]=function(_0xc3b610){const _0x1c0e8d=_0x2b7d9c,_0x1eac58=this[_0x1c0e8d(0x1f4)]();if(_0xc3b610[_0x1c0e8d(0x1ec)](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){const _0x531d4e=JSON[_0x1c0e8d(0x201)]('['+RegExp['$1']['match'](/\d+/g)+']');return _0x1eac58[_0x1c0e8d(0x23f)](_0x18a632=>_0x531d4e[_0x1c0e8d(0x22d)](_0x18a632));}else{if(_0xc3b610[_0x1c0e8d(0x1ec)](/ELEMENT[ ](.*)/i)){const _0x420cce=String(RegExp['$1'])[_0x1c0e8d(0x245)](','),_0x3c2ec2=_0x420cce[_0x1c0e8d(0x251)](_0x143f63=>DataManager[_0x1c0e8d(0x233)](_0x143f63));return _0x1eac58[_0x1c0e8d(0x23f)](_0x5b5b05=>_0x3c2ec2[_0x1c0e8d(0x22d)](_0x5b5b05));}}return![];},VisuMZ[_0x2b7d9c(0x243)]['Game_BattlerBase_initMembers']=Game_BattlerBase['prototype'][_0x2b7d9c(0x1e4)],Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1e4)]=function(){const _0x3bad14=_0x2b7d9c;VisuMZ[_0x3bad14(0x243)][_0x3bad14(0x220)][_0x3bad14(0x1ee)](this),this[_0x3bad14(0x231)]();},Game_BattlerBase[_0x2b7d9c(0x1da)]['initAntiDamageBarriers']=function(){const _0x1bdb3b=_0x2b7d9c;this[_0x1bdb3b(0x20f)]={},this[_0x1bdb3b(0x1e2)]={},this[_0x1bdb3b(0x267)]={},this[_0x1bdb3b(0x21f)]={},this[_0x1bdb3b(0x1d8)]={};},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x242)]=function(_0x265e0d){const _0x3eb81d=_0x2b7d9c;if(!this[_0x3eb81d(0x26b)](_0x265e0d))return 0x0;return this['_antiDamageBarrierCancelOver']===undefined&&this[_0x3eb81d(0x231)](),this['_antiDamageBarrierCancelOver'][_0x265e0d]||0x0;},Game_BattlerBase['prototype'][_0x2b7d9c(0x210)]=function(_0x4a6e00,_0xbea9f6){const _0x59a27b=_0x2b7d9c;this['_antiDamageBarrierCancelOver']===undefined&&this[_0x59a27b(0x231)](),this[_0x59a27b(0x20f)][_0x4a6e00]=_0xbea9f6;},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1fe)]=function(_0x28463f){const _0x316f25=_0x2b7d9c;if(!this[_0x316f25(0x26b)](_0x28463f))return 0x0;return this[_0x316f25(0x1e2)]===undefined&&this['initAntiDamageBarriers'](),this['_antiDamageBarrierCancelUnder'][_0x28463f]||0x0;},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x257)]=function(_0x55aaf9,_0x5ea259){const _0x5c4dcc=_0x2b7d9c;this[_0x5c4dcc(0x1e2)]===undefined&&this[_0x5c4dcc(0x231)](),this[_0x5c4dcc(0x1e2)][_0x55aaf9]=_0x5ea259;},Game_BattlerBase['prototype'][_0x2b7d9c(0x218)]=function(_0x3b4eb5){const _0x487181=_0x2b7d9c;if(!this[_0x487181(0x26b)](_0x3b4eb5))return 0x0;return this['_antiDamageBarrierReduction']===undefined&&this['initAntiDamageBarriers'](),this[_0x487181(0x267)][_0x3b4eb5]||0x0;},Game_BattlerBase[_0x2b7d9c(0x1da)]['setAntiDamageBarrierReduction']=function(_0x494196,_0x25d5d5){const _0x83a355=_0x2b7d9c;this['_antiDamageBarrierReduction']===undefined&&this[_0x83a355(0x231)](),this['_antiDamageBarrierReduction'][_0x494196]=_0x25d5d5;},Game_BattlerBase['prototype'][_0x2b7d9c(0x260)]=function(_0x5e5444){const _0x190566=_0x2b7d9c;if(!this[_0x190566(0x26b)](_0x5e5444))return 0x0;return this[_0x190566(0x21f)]===undefined&&this['initAntiDamageBarriers'](),this[_0x190566(0x21f)][_0x5e5444]||0x0;},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1eb)]=function(_0x4a1d7f,_0x32aaa4){const _0x186c5c=_0x2b7d9c;this[_0x186c5c(0x21f)]===undefined&&this[_0x186c5c(0x231)](),this['_antiDamageBarrierMp'][_0x4a1d7f]=_0x32aaa4;},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1fb)]=function(_0x37997b){const _0x5c37db=_0x2b7d9c;if(!this[_0x5c37db(0x26b)](_0x37997b))return 0x0;return this[_0x5c37db(0x1d8)]===undefined&&this['initAntiDamageBarriers'](),this[_0x5c37db(0x1d8)][_0x37997b]||0x0;},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x24f)]=function(_0x139e3f,_0x2f1193){const _0x2cd436=_0x2b7d9c;this[_0x2cd436(0x1d8)]===undefined&&this['initAntiDamageBarriers'](),this[_0x2cd436(0x1d8)][_0x139e3f]=_0x2f1193;},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x21c)]=function(){const _0x1fd8d0=_0x2b7d9c,_0x500194=this['traitObjects']()[_0x1fd8d0(0x24a)](this['skills']()),_0x46e30e=VisuMZ[_0x1fd8d0(0x243)][_0x1fd8d0(0x258)][_0x1fd8d0(0x211)];return _0x500194['some'](_0x1741c6=>_0x1741c6&&_0x1741c6[_0x1fd8d0(0x1e3)]&&_0x1741c6[_0x1fd8d0(0x1e3)][_0x1fd8d0(0x1ec)](_0x46e30e));},Game_BattlerBase[_0x2b7d9c(0x1da)][_0x2b7d9c(0x25b)]=function(){const _0x27174a=_0x2b7d9c,_0x428247=Number[_0x27174a(0x25c)],_0x3fab43=this[_0x27174a(0x1db)]()[_0x27174a(0x264)]((_0x13a579,_0x44da45)=>{const _0x4e7cda=_0x27174a,_0x26123c=_0x13a579[_0x4e7cda(0x238)]===0x0?_0x428247:this[_0x4e7cda(0x261)](_0x13a579['id']),_0x5c6ef1=_0x44da45[_0x4e7cda(0x238)]===0x0?_0x428247:this['stateTurns'](_0x44da45['id']);if(_0x26123c!==_0x5c6ef1)return _0x26123c-_0x5c6ef1;const _0x36f286=_0x13a579[_0x4e7cda(0x207)],_0x7381e=_0x44da45[_0x4e7cda(0x207)];if(_0x36f286!==_0x7381e)return _0x7381e-_0x36f286;return _0x13a579['id']-_0x44da45['id'];});return _0x3fab43;},VisuMZ[_0x2b7d9c(0x243)][_0x2b7d9c(0x255)]=function(_0x479c19){const _0x3e6a22=_0x2b7d9c;window[_0x3e6a22(0x204)]=BattleManager[_0x3e6a22(0x271)]||_0x479c19,window[_0x3e6a22(0x1e6)]=_0x479c19,window['a']=window['user'],window['b']=window[_0x3e6a22(0x1e6)];},VisuMZ[_0x2b7d9c(0x243)]['clearJsTargets']=function(){const _0x1515c0=_0x2b7d9c;window[_0x1515c0(0x204)]=undefined,window[_0x1515c0(0x1e6)]=undefined,window['a']=undefined,window['b']=undefined;},VisuMZ[_0x2b7d9c(0x243)][_0x2b7d9c(0x265)]=function(_0x2fd316){const _0x47e875=_0x2b7d9c;_0x2fd316=_0x2fd316[_0x47e875(0x1e7)](/\b(\d+)([%％])/gi,(_0xdbf7b4,_0x1fe69f)=>(Number(_0x1fe69f)||0x0)*0.01);try{return eval(_0x2fd316);}catch(_0x555a36){if($gameTemp[_0x47e875(0x1fa)]())console[_0x47e875(0x256)](_0x555a36);return 0x0;}},VisuMZ[_0x2b7d9c(0x243)][_0x2b7d9c(0x1e9)]=Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x225)],Game_Battler[_0x2b7d9c(0x1da)]['addState']=function(_0x26909f){const _0x3fb01b=_0x2b7d9c;VisuMZ['AntiDmgBarriers'][_0x3fb01b(0x1e9)][_0x3fb01b(0x1ee)](this,_0x26909f),this[_0x3fb01b(0x206)](_0x26909f);},Game_Battler['prototype'][_0x2b7d9c(0x206)]=function(_0x16ad8c){const _0x3ba1cb=_0x2b7d9c;if(!this[_0x3ba1cb(0x26b)](_0x16ad8c))return;const _0x1f9529=$dataStates[_0x16ad8c];if(!_0x1f9529)return;const _0x47391e=VisuMZ['AntiDmgBarriers'][_0x3ba1cb(0x258)],_0x159375=_0x1f9529[_0x3ba1cb(0x1e3)];VisuMZ[_0x3ba1cb(0x243)]['createJsTargets'](this);if(_0x159375[_0x3ba1cb(0x1ec)](_0x47391e[_0x3ba1cb(0x1e8)])){const _0x4e4bb1=VisuMZ[_0x3ba1cb(0x243)][_0x3ba1cb(0x265)](RegExp['$2']);this['setStateDisplay'](_0x16ad8c,_0x4e4bb1||0x1);}if(_0x159375[_0x3ba1cb(0x1ec)](_0x47391e[_0x3ba1cb(0x26a)])){const _0x4bd5d9=VisuMZ[_0x3ba1cb(0x243)][_0x3ba1cb(0x265)](RegExp['$2']);this[_0x3ba1cb(0x210)](_0x16ad8c,_0x4bd5d9||0x0);}if(_0x159375[_0x3ba1cb(0x1ec)](_0x47391e[_0x3ba1cb(0x1f8)])){const _0x41c2eb=VisuMZ['AntiDmgBarriers'][_0x3ba1cb(0x265)](RegExp['$2']);this[_0x3ba1cb(0x257)](_0x16ad8c,_0x41c2eb||0x0);}if(_0x159375[_0x3ba1cb(0x1ec)](_0x47391e['ReduceBarrier'])){const _0x53d826=VisuMZ[_0x3ba1cb(0x243)][_0x3ba1cb(0x265)](RegExp['$2']);this[_0x3ba1cb(0x21b)](_0x16ad8c,_0x53d826||0x0);}if(_0x159375['match'](_0x47391e[_0x3ba1cb(0x1ef)])){const _0x44efe9=VisuMZ['AntiDmgBarriers'][_0x3ba1cb(0x265)](RegExp['$2']);this[_0x3ba1cb(0x26f)](_0x16ad8c,_0x44efe9||0x0);}if(_0x159375[_0x3ba1cb(0x1ec)](_0x47391e[_0x3ba1cb(0x229)])){const _0x1478fa=VisuMZ[_0x3ba1cb(0x243)][_0x3ba1cb(0x265)](RegExp['$2']);this['setAntiDamageBarrierMp'](_0x16ad8c,_0x1478fa||0x0);}if(_0x159375[_0x3ba1cb(0x1ec)](_0x47391e[_0x3ba1cb(0x250)])){const _0x1eb8b9=VisuMZ[_0x3ba1cb(0x243)][_0x3ba1cb(0x265)](RegExp['$2']);this[_0x3ba1cb(0x24f)](_0x16ad8c,_0x1eb8b9||0x0);}VisuMZ[_0x3ba1cb(0x243)][_0x3ba1cb(0x22b)]();},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x24b)]=function(_0x21058d,_0x4bbb86){const _0x350549=_0x2b7d9c;if(!SceneManager[_0x350549(0x1f5)]())return;const _0x39a1e7=VisuMZ['AntiDmgBarriers'][_0x350549(0x222)][_0x21058d];if(!_0x39a1e7)return;const _0x5b707a=_0x4bbb86?_0x350549(0x247):_0x350549(0x20b);if(_0x39a1e7['%1AnimationID'[_0x350549(0x1f3)](_0x5b707a)]>0x0){const _0x259408=[this],_0x3e74a3=_0x39a1e7[_0x350549(0x246)[_0x350549(0x1f3)](_0x5b707a)];let _0x39a391=_0x39a1e7[_0x350549(0x263)['format'](_0x5b707a)];_0x39a1e7[_0x350549(0x1de)[_0x350549(0x1f3)](_0x5b707a)]&&(_0x39a391=!_0x39a391);const _0x52c113=_0x39a1e7[_0x350549(0x26c)[_0x350549(0x1f3)](_0x5b707a)];$gameTemp['requestFauxAnimation'](_0x259408,_0x3e74a3,_0x39a391,_0x52c113);}},Game_Battler[_0x2b7d9c(0x1da)]['processBreakStateEffect']=function(_0x8be957){const _0x404a42=_0x2b7d9c;if(!_0x8be957)return;const _0x19a04e=_0x8be957['id'],_0x3708ae=VisuMZ[_0x404a42(0x243)][_0x404a42(0x258)],_0x59a89e=_0x8be957[_0x404a42(0x1e3)];this[_0x404a42(0x208)](_0x19a04e);if(_0x59a89e[_0x404a42(0x1ec)](_0x3708ae[_0x404a42(0x1e8)]))this['onAntiDamageBarrierEffect'](_0x404a42(0x22f),![]);else{if(_0x59a89e[_0x404a42(0x1ec)](_0x3708ae[_0x404a42(0x26a)]))this[_0x404a42(0x24b)](_0x404a42(0x212),![]);else{if(_0x59a89e[_0x404a42(0x1ec)](_0x3708ae[_0x404a42(0x1f8)]))this[_0x404a42(0x24b)](_0x404a42(0x212),![]);else{if(_0x59a89e[_0x404a42(0x1ec)](_0x3708ae['ReduceBarrier']))this[_0x404a42(0x24b)](_0x404a42(0x23c),![]);else{if(_0x59a89e[_0x404a42(0x1ec)](_0x3708ae[_0x404a42(0x1ef)]))this[_0x404a42(0x24b)](_0x404a42(0x24d),![]);else{if(_0x59a89e[_0x404a42(0x1ec)](_0x3708ae[_0x404a42(0x229)]))this[_0x404a42(0x24b)]('MP',![]);else _0x59a89e[_0x404a42(0x1ec)](_0x3708ae[_0x404a42(0x250)])&&this[_0x404a42(0x24b)]('TP',![]);}}}}}},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x254)]=function(_0xb3d218){const _0x5622a5=_0x2b7d9c,_0x13fc93=_0xb3d218['id'];let _0x4eda89=(Number(this[_0x5622a5(0x22c)](_0x13fc93))||0x0)-0x1;this[_0x5622a5(0x26f)](_0x13fc93,_0x4eda89),_0x4eda89<=0x0&&this[_0x5622a5(0x208)](_0x13fc93),this[_0x5622a5(0x24b)](_0x5622a5(0x22f),_0x4eda89>0x0);},Game_Battler['prototype'][_0x2b7d9c(0x239)]=function(_0x3a549f){const _0x4ce70a=_0x2b7d9c;this[_0x4ce70a(0x24b)](_0x4ce70a(0x212),!![]);},Game_Battler['prototype'][_0x2b7d9c(0x268)]=function(){const _0x304268=_0x2b7d9c;this[_0x304268(0x24b)](_0x304268(0x23c),!![]);},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1fc)]=function(_0x3531ef,_0x219f45){const _0x18353e=_0x2b7d9c;if(!SceneManager[_0x18353e(0x1f5)]())return![];const _0x15b759=VisuMZ[_0x18353e(0x243)][_0x18353e(0x222)]['Absorb'];if(!_0x15b759)return;if(_0x15b759[_0x18353e(0x20c)]==='')return;const _0x5c36a3=_0x15b759[_0x18353e(0x20c)][_0x18353e(0x1f3)](_0x3531ef),_0x6f36e4={'textColor':_0x15b759[_0x18353e(0x1d7)],'flashColor':_0x15b759[_0x18353e(0x26e)],'flashDuration':_0x15b759[_0x18353e(0x23e)]};this[_0x18353e(0x209)](_0x5c36a3,_0x6f36e4);},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x226)]=function(_0x280c79){const _0x21989b=_0x2b7d9c,_0x47a44f=_0x280c79['id'];let _0x7f94c=Number(this[_0x21989b(0x22c)](_0x47a44f))||0x0;_0x7f94c<=0x0&&this[_0x21989b(0x208)](_0x47a44f),this[_0x21989b(0x24b)](_0x21989b(0x24d),_0x7f94c>0x0);},Game_Battler['prototype'][_0x2b7d9c(0x237)]=function(_0x21922e){const _0x215bbb=_0x2b7d9c,_0x144632=_0x21922e['id'];this['mp']<=0x0&&this[_0x215bbb(0x208)](_0x144632),this[_0x215bbb(0x24b)]('MP',this['mp']>0x0);},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x219)]=function(_0x410b52){const _0x34399d=_0x2b7d9c;if(!SceneManager[_0x34399d(0x1f5)]())return![];const _0x801140=VisuMZ[_0x34399d(0x243)][_0x34399d(0x222)]['TP'];if(!_0x801140)return;if(_0x801140[_0x34399d(0x20c)]==='')return;const _0x225a17=_0x801140['PopupText']['format'](_0x410b52,TextManager['tp']),_0x19f6e1={'textColor':_0x801140[_0x34399d(0x1d7)],'flashColor':_0x801140[_0x34399d(0x26e)],'flashDuration':_0x801140['FlashDuration']};this[_0x34399d(0x209)](_0x225a17,_0x19f6e1);},Game_Battler[_0x2b7d9c(0x1da)]['onAntiDamageTpBarrier']=function(_0x1efea5){const _0x2a3b7a=_0x2b7d9c,_0x2a1052=_0x1efea5['id'];this['tp']<=0x0&&this[_0x2a3b7a(0x208)](_0x2a1052),this[_0x2a3b7a(0x24b)]('TP',this['tp']>0x0);},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x1ff)]=function(_0x797d83){const _0x283fce=_0x2b7d9c;if(!_0x797d83)return;if(!_0x797d83[_0x283fce(0x240)]())return;let _0x35eda0=[];for(const _0x1d5878 of this[_0x283fce(0x1db)]()){if(!_0x1d5878)continue;if(!this['isStateAffected'](_0x1d5878['id']))continue;VisuMZ[_0x283fce(0x243)][_0x283fce(0x23a)](_0x1d5878,_0x797d83)&&_0x35eda0[_0x283fce(0x24c)](_0x1d5878['id']);}for(const _0x2e3ca2 of _0x35eda0){const _0x2465a5=$dataStates[_0x2e3ca2];if(!_0x2465a5)continue;this['processBreakStateEffect'](_0x2465a5);}},VisuMZ[_0x2b7d9c(0x243)][_0x2b7d9c(0x23a)]=function(_0x1a36ae,_0x486f08){const _0x24899f=_0x2b7d9c,_0x501b2a=VisuMZ[_0x24899f(0x243)][_0x24899f(0x258)][_0x24899f(0x241)],_0x46d31f=_0x1a36ae[_0x24899f(0x1e3)]['match'](_0x501b2a);if(_0x46d31f)for(const _0x3a1738 of _0x46d31f){if(!_0x3a1738)continue;_0x3a1738[_0x24899f(0x1ec)](_0x501b2a);const _0x5554f7=String(RegExp['$1']);if(_0x486f08[_0x24899f(0x253)](_0x5554f7))return!![];}return![];},VisuMZ[_0x2b7d9c(0x243)]['Game_Battler_regenerateAll']=Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x24e)],Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x24e)]=function(){const _0x27db22=_0x2b7d9c;VisuMZ['AntiDmgBarriers'][_0x27db22(0x1f2)][_0x27db22(0x1ee)](this),this[_0x27db22(0x223)]()&&this[_0x27db22(0x224)]();},Game_Battler[_0x2b7d9c(0x1da)][_0x2b7d9c(0x224)]=function(){const _0x4af83a=_0x2b7d9c;VisuMZ['AntiDmgBarriers'][_0x4af83a(0x255)](this);const _0xc4f024=VisuMZ[_0x4af83a(0x243)][_0x4af83a(0x258)];for(const _0x179e14 of this[_0x4af83a(0x1db)]()){if(!_0x179e14)continue;const _0xad6621=_0x179e14[_0x4af83a(0x1e3)];(_0xad6621['match'](_0xc4f024[_0x4af83a(0x1e8)])||_0xad6621[_0x4af83a(0x1ec)](_0xc4f024[_0x4af83a(0x1ef)]))&&this['regenerateAntiDamageBarrierState'](_0x179e14);}VisuMZ[_0x4af83a(0x243)][_0x4af83a(0x22b)]();},Game_Battler[_0x2b7d9c(0x1da)]['regenerateAntiDamageBarrierState']=function(_0x52188e){const _0x5739ec=_0x2b7d9c,_0x3500de=VisuMZ['AntiDmgBarriers']['RegExp'],_0x73d612=_0x52188e[_0x5739ec(0x1e3)];let _0x57b856=0x0;_0x73d612[_0x5739ec(0x1ec)](_0x3500de[_0x5739ec(0x23b)])&&(_0x57b856-=VisuMZ[_0x5739ec(0x243)][_0x5739ec(0x265)](RegExp['$1']));_0x73d612[_0x5739ec(0x1ec)](_0x3500de[_0x5739ec(0x1dc)])&&(_0x57b856+=VisuMZ[_0x5739ec(0x243)][_0x5739ec(0x265)](RegExp['$1']));let _0x397afe=Number(this[_0x5739ec(0x22c)](_0x52188e['id']));_0x397afe+=_0x57b856,_0x397afe>0x0?this[_0x5739ec(0x26f)](_0x52188e['id'],_0x397afe):this['processBreakStateEffect'](_0x52188e);};