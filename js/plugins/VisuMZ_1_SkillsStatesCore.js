//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.41;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.41] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x3a38(){const _0x279996=['FsdMr','Game_Variables_onChange','getStateReapplyRulings','GroupDigits','addPassiveStatesFromOtherPlugins','Game_BattlerBase_meetsSkillConditions','_hidden','isCommandEnabled','isSkillUsableForAutoBattle','GaugeDrawJS','commandName','<troop-%1>','RuTwb','Sprite_Gauge_currentValue','getCurrentTroopUniqueID','addBuffTurns','yavgl','isMaxBuffAffected','isStateAddable','MatchLabelColor','process_VisuMZ_SkillsStatesCore_State_Notetags','SkillSceneAdjustSkillList','setStateOrigin','otutr','drawFullGauge','MaxTurns','WCFDa','map','addCommand','changeOutlineColor','NWwYm','onEraseBuff','createSkillCostText','%1%','hikKl','CTjsX','leocE','QMDxi','fcIBx','description','Costs','commandNameWindowDrawBackground','<member-%1>','paramValueByName','concat','Game_BattlerBase_states','dDvDP','floor','parameters','gWduF','getCurrentStateOriginKey','mMfSH','menuActor','categories','isSkillCostShown','initMembersSkillsStatesCore','addBuff','QIxPU','jxRdG','stateTpSlipDamageJS','meetsSkillConditions','PresetLabelGaugeColor','labelOutlineWidth','removeStatesByCategory','uzxuy','ActionEndUpdate','gainMp','isGroupDefeatStateAffected','BattleManager_endAction','meetsPassiveStateConditionSwitches','resetStateCounts','WmLCc','multiclasses','Scene_Boot_onDatabaseLoaded','psSDI','_checkingVisuMzPassiveStateObjects','_tempBattler','lineHeight','Parse_Notetags_State_Category','test','getStateOriginByKey','vEaAu','canPaySkillCost','regenerateAll','itemWindowRect','lUaHY','ARRAYJSON','HiddenSkillTypes','drawItemStyleIcon','clearStatesWithStateRetain','note','createItemWindow','MAXMP','lyDmj','lznQj','members','testSkillStatesCoreNotetags','stepsForTurn','SoyFc','ARRAYNUM','Game_Actor_learnSkill','uiHelpPosition','process_VisuMZ_SkillsStatesCore_Skill_Notetags','aLgDP','maxSlipDamage','ConvertParams','sOZkw','applyStateTurnManipulationEffects','TtUhZ','GaugeMaxJS','traitsSet','checkShowHideNotetags','shift','item','EVAL','ARRAYFUNC','YjEtb','gaugeColor1','buff','onExpireBuffGlobalJS','_shopStatusWindow','bMmos','onEraseBuffGlobalJS','Game_BattlerBase_traitsSet','PassiveConditionJS','AhXRk','meetsPassiveStateConditionJS','_skills','setup','ekMgc','ZTbCA','StackBuffMax','YgZaV','split','convertPassiveStates','statePassiveConditionJS','loadBitmap','Game_BattlerBase_recoverAll','user','onExpireStateCustomJS','NcBCQ','groupDefeat','CheckVisibleSwitchNotetags','LabelOutlineWidth','slipTp','_passiveStateResults','initMembers','normalColor','pEGXz','ihtyS','Game_BattlerBase_decreaseBuff','enemy','isStateAffected','makeCurrentTroopUniqueID','valueFontFace','tgrwS','greater','uqcbf','clearStateDisplay','_itemWindow','currentValue','setItem','mainFontSize','MultiplierJS','LabelOutlineSolid','Sbpsr','isDebuffAffected','TurnFontSize','whWja','_stateDisplay','onExpireDebuff','DEF','mJRtP','toUpperCase','OITuc','LFtLY','heal','skillTypes','canUse','onAddBuffGlobalJS','LayoutStyle','clearStates','includesSkillsStatesCore','vqhOg','iconHeight','onAddStateMakeCustomSlipValues','rSZyc','helpAreaTop','Actor','convertGaugeTypeSkillsStatesCore','stateTurns','Game_BattlerBase_skillMpCost','number','commandNameWindowDrawText','2580200qlernO','MDF','updateHelp','22414854GFzGMn','VIOez','applySkillsStatesCoreEffects','Game_Battler_addDebuff','onAddStateCustomJS','TextJS','learnSkill','JzLxh','stateExpireJS','skillMpCost','rCorb','6713934DnGLTy','eraseState','height','applyDebuffTurnManipulationEffects','totalStateCategoryAffected','LJCDN','Game_Battler_addState','ParseSkillNotetags','skillTpCost','match','cYwsY','DataFontSize','_lastStatesActionEndFrameCount','WJngp','commandStyleCheck','paySkillCost','VisuMZ_0_CoreEngine','onRegenerateCustomStateDamageOverTime','refresh','_tempActor','addWindow','_battler','Parse_Notetags_State_PassiveJS','fwAgk','hasStateCategory','CpNpm','stFvR','_classIDs','EMYwx','getStateOrigin','_stored_state-%1-color','onExpireBuff','parse','length','DLbUt','gsiTu','vYzpL','skills','MbVZi','pZpCn','removeState','_buffs','getSkillTypes','center','isStateRemoved','_costSettings','qxNEj','VaSsB','_subject','labelColor','gaugeColor2','xVVBC','_statusWindow','pcAQI','uiInputPosition','SkillConditionJS','stateCategoriesResisted','yjOAL','DKiCA','ParseStateNotetags','MBLte','getSkillIdWithName','VisuMZ_1_ElementStatusCore','Luqrf','States','addChild','ARRAYSTR','Window_SkillList_setActor','drawParamText','canClearState','iconIndex','rqTaO','itemAt','isUseModernControls','JqcWC','\x5cI[%1]%2','autoRemovalTiming','CheckIncompatibleStates','LUK','allIcons','clearStateOrigin','gainHp','meetsPassiveStateConditions','STRUCT','updateCommandNameWindow','add','debuffColor','_phase','YjoqA','Sprite_StateIcon_loadBitmap','WQpnj','onExpireDebuffGlobalJS','tvHMQ','version','yUUwB','success','eZbNM','drawExtendedSkillsStatesCoreStatus','stateEraseJS','tsJMf','DataOffsetX','resetTextColor','lMtdd','onEraseDebuff','JAuWo','stateHpSlipDamageJS','resetFontSettings','enemyId','commandNameWindowCenter','TurnOffsetY','getStateData','RcAvG','_buffTurns','TLLko','onDatabaseLoaded','FfDHd','6348488JEMITD','redraw','scrollTo','Game_Battler_addBuff','increaseBuff','ignore','RFuYw','_currentActor','updateFrame','isLearnedSkill','Window_SkillList_updateHelp','ExaTo','createAllSkillCostText','isBuffAffected','redrawSkillsStatesCore','yFIQm','round','YdbcR','setDebuffTurns','isMaxDebuffAffected','TurnOffsetX','createShopStatusWindow','buttonAssistText1','uIMOr','skillVisibleJS','passiveStateObjects','TurnEndOnMap','slipHp','stateId','wdMgg','right','Window_SkillType_initialize','Scene_Skill_createItemWindow','addStateTurns','addDebuff','mainAreaTop','_skillIDs','uOolq','stateAddJS','DLpjn','createPassiveStatesCache','skillTypeWindowRectSkillsStatesCore','Game_Actor_forgetSkill','_animationIndex','CanPayJS','DzpbC','itemWindowRectSkillsStatesCore','drawActorIconsAllTurnCounters','Sprite_Gauge_currentMaxValue','getCurrentStateActiveUser','calcWindowHeight','clamp','_states','damage','width','Game_Action_testApply','_actor','addPassiveStatesByPluginParameters','VisuMZ_2_ClassChangeSystem','onEraseBuffJS','isBuffPrevented','_endingBattle','iJavB','_stateRetainType','Window_StatusBase_placeGauge','XPplo','Settings','statesByCategory','onEraseDebuffJS','debuffTurns','NrVju','_checkingPassiveStates','IywaD','stateHpSlipHealJS','Parse_Notetags_State_ApplyRemoveLeaveJS','IconStypeNorm','retrieveStateColor','XOPoU','VvWGx','drawActorStateTurns','CheckVisibleSkillNotetags','stateData','KrJNQ','UWluk','overwriteBuffTurns','icon','VKRMz','_result','createCommandNameWindow','7QyrXRA','zrNPT','isStateExpired','XIJyI','getColorDataFromPluginParameters','isBottomHelpMode','iconWidth','setStypeId','VisuMZ_1_ItemsEquipsCore','itemTextAlign','jdQtJ','VhKcG','isPassiveStateStackable','rpmjh','clearStateRetainType','onExpireBuffJS','fontBold','jUcuG','removeOtherStatesOfSameCategory','uccAB','XfLdr','Game_BattlerBase_skillTpCost','callUpdateHelp','testApply','valueOutlineWidth','removeBuff','ARRAYEVAL','ColorDebuff','isStateRestrict','ZDDsO','buffTurns','DpQLA','replace','CKphh','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','helpWindowRectSkillsStatesCore','YWABD','PassiveStates','aliveMembers','updateTurnDisplaySprite','addState','textColor','onEraseStateJS','mpDamage','getClassIdWithName','stateMpSlipHealJS','uLhMl','mpCost','Sprite_Gauge_gaugeRate','lbWxE','_colorCache','NKnSh','onEraseStateCustomJS','FUNC','makeCommandName','changePaintOpacity','actorId','Game_BattlerBase_eraseState','Parse_Notetags_Skill_JS','150372UejOQM','Global','drawItem','TMUyF','getStateRetainType','alterSkillName','Fofkj','Game_BattlerBase_overwriteBuffTurns','kUhqJ','addPassiveStates','priority','setStateRetainType','kRsiC','xNCfi','regenerateAllSkillsStatesCore','GmbCk','KaMou','Window_SkillStatus_refresh','endAction','stypeId','_stateTurns','_stypeId','FLZHW','push','setPassiveStateSlipDamageJS','IoxaZ','prototype','OiOLV','Game_BattlerBase_clearStates','shopStatusWindowRect','updateStatesActionEnd','36qMQCgN','nIfvS','sWvwN','Game_BattlerBase_isStateResist','IconStypeMagic','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','BadAK','XqzoS','jWNPR','windowPadding','VswXv','jAqpD','Game_Actor_skillTypes','fontSize','isStateCategoryResisted','clear','isStateCategoryAffected','ceil','frameCount','filter','onAddState','hnMWf','VHPOn','ALL','Name','setStateTurns','exit','EnableLayout','YJUkl','SkillsStatesCore','Kbfss','3489810OyhKSp','_turnDisplaySprite','dyWKZ','_stored_debuffColor','IUuIy','setBackgroundType','#%1','Game_BattlerBase_increaseBuff','_commandNameWindow','JOuUx','gradientFillRect','shopStatusWindowRectSkillsStatesCore','isStateResist','hJiGE','gaugeLineHeight','applyBuffTurnManipulationEffects','onExpireStateJS','Scene_Skill_statusWindowRect','eeKUh','removeStatesByCategoryAll','QXnVQ','Parse_Notetags_Skill_Cost','currentValueSkillsStatesCore','onAddDebuffGlobalJS','_stateOrigin','_scene','isSceneBattle','isSkillHidden','tYgQR','getStypeIdWithName','Omjcd','Sprite_StateIcon_updateFrame','innerWidth','onExpireState','constructor','MAT','Game_Switches_onChange','removeBuffsAuto','totalStateCategory','currentDisplayedValue','Game_BattlerBase_initMembers','Game_BattlerBase_eraseBuff','actor','reset','opacity','drawTextEx','_stateSteps','rxhaQ','updatedLayoutStyle','POSITIVE','GSVAD','log','Sprite_Gauge_redraw','Scene_Skill_skillTypeWindowRect','PfLdf','PayJS','placeExactGauge','buffColor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onExpireStateGlobalJS','value','CalcJS','addDebuffTurns','meetsPassiveStateConditionClasses','TXzCl','GnCON','indexOf','statusWidth','adjustSkillCost','Param','addPassiveStatesTraitSets','addPassiveStatesByNotetag','_stateIDs','skillEnableJS','litim','xEyju','SkillMenuStatusRect','wkXMA','LrAbb','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_checkingTraitsSetSkillsStatesCore','setStatusWindow','Game_Action_applyItemUserEffect','isBuffExpired','death','hckVO','CheckVisibleBattleNotetags','onAddStateGlobalJS','onChange','makeAdditionalSkillCostText','stateTpSlipHealJS','placeGauge','Window_SkillList_drawItem','sTYmU','ValueOutlineSolid','fillRect','6LqRPYJ','DisplayedParams','ReapplyRules','itemLineRect','hpDamage','ShowJS','DPZmM','XHUrG','ATK','_categoryWindow','format','hasSkill','ZzUFY','TfHAr','state','Scene_Skill_helpWindowRect','hide','UsBtO','recalculateSlipDamageJS','_stypeIDs','qjyTn','isAllDead','QSPss','lHTfv','YyZQm','name','statusWindowRectSkillsStatesCore','meetsPassiveStateGlobalConditionJS','snXRD','makeResistedStateCategories','NSyNs','rgba(0,\x200,\x200,\x201)','mainAreaHeight','isActor','hasState','onEraseStateGlobalJS','_stateMaxTurns','checkShowHideJS','ListWindowCols','BjQjD','stateMaximumTurns','MAXHP','mxxnD','skillId','onAddDebuff','isPlaytest','skillTypeWindowRect','KLjYj','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','GaNLZ','kaMTw','TdFIb','stateColor','Buffs','process_VisuMZ_SkillsStatesCore_Notetags','44WcebGL','gaugeBackColor','MgtTV','helpAreaHeight','NmpGn','iconText','jHlIg','recoverAll','ShowData','VsEPb','rgba(0,\x200,\x200,\x200)','none','isPartyAllAffectedByGroupDefeatStates','numberFontFace','actions','tpCost','eRKKG','Window_SkillList_includes','Window_StatusBase_drawActorIcons','onAddStateJS','isRightInputMode','Game_BattlerBase_refresh','pSFVD','_stateData','Window_SkillList_maxCols','zaDjM','max','ZIXmV','MMlHk','skill','<actor-%1>','_cache','useDigitGrouping','currentClass','drawExtendedParameter','maxItems','changeTextColor','Game_BattlerBase_die','drawActorStateData','_currentTroopUniqueID','getStateIdWithName','drawActorBuffRates','XAojJ','onAddDebuffJS','states','checkSkillConditionsSwitchNotetags','boxWidth','RefreshCacheVar','tMggW','DataOffsetY','updateStateTurns','removeStatesAuto','updateVisibility','includes','setupSkillsStatesCore','ColorPositive','ColorBuff','VisuMZ_1_MainMenuCore','slipMp','JTKEB','buttonAssistSwitch','toLowerCase','rJZJW','ecaWI','decreaseBuff','currentMaxValueSkillsStatesCore','vrldl','maxCols','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','isBuffOrDebuffAffected','index','344405SvpuhI','jBbcr','tEKRy','JRfLh','inBattle','allBattleMembers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','fOkNV','checkCacheKey','text','ShowShopStatus','bitmap','ARRAYSTRUCT','drawActorBuffTurns','Udukq','paramBuffRate','jpaWf','getStateDisplay','Game_Unit_isAllDead','isAlive','mainCommandWidth','getColor','wHpir','MCTEc','contents','applyStateCategoryRemovalEffects','ANY','skillCostSeparator','LvToy','KnTKi','makeSuccess','LabelFontMainType','ShowTurns','AGI','valueOutlineColor','onExpireDebuffJS','prepareResetStateCounts','convertTargetToStateOriginKey','nCjRp','drawText','Game_BattlerBase_resetStateCounts','usableSkills','clearStateData','labelFontFace','forgetSkill','adjustItemWidthByShopStatus','Scene_Skill_itemWindowRect','DiXML','drawSkillCost','helpWindowRect','AWVbQ','trim','NgJEq','kLSgx','_skillTypeWindow','setActor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','textSizeEx','uiMenuStyle','currentMaxValue','commandStyle','gaugeRate','call','Skills','drawActorIcons','applyItemUserEffect','deadMembers','setBuffTurns','onRemoveState','cdoAF','SjgED','keys','passiveStates','Game_Battler_regenerateAll','xvCup','PavOo','eraseBuff','Game_Battler_isStateAddable','SAXlh','mainFontFace','Parse_Notetags_State_SlipEffectJS','MatchLabelGaugeColor','Game_Unit_deadMembers','aWxYE','checkSkillTypeMatch','oRclW','isUseSkillsStatesCoreUpdatedLayout','checkSkillConditionsNotetags','anchor','Game_BattlerBase_buffIconIndex','KhKGF','meetsSkillConditionsGlobalJS','ValueFontMainType','allowCreateShopStatusWindow','statusWindowRect','fontFace','outlineColor','Game_Troop_setup','Sprite_Gauge_setup','CmdWidth','createTurnDisplaySprite','buffIconIndex','shopStatusWidth','xGuaS','KQCUV','Gauge','tnVrc','BdVSr','stateMpSlipDamageJS','UaBdI','isSkillTypeMatchForUse','IQyxS','traitObjects','ParseClassIDs','untitled'];_0x3a38=function(){return _0x279996;};return _0x3a38();}function _0x2843(_0x69b371,_0x12db06){const _0x3a3855=_0x3a38();return _0x2843=function(_0x2843f6,_0x303794){_0x2843f6=_0x2843f6-0x198;let _0x1ac93c=_0x3a3855[_0x2843f6];return _0x1ac93c;},_0x2843(_0x69b371,_0x12db06);}const _0x47d9c7=_0x2843;(function(_0x3342ca,_0x2aca2c){const _0x52d7b0=_0x2843,_0x39b0e8=_0x3342ca();while(!![]){try{const _0x12925a=parseInt(_0x52d7b0(0x3fb))/0x1*(-parseInt(_0x52d7b0(0x37d))/0x2)+-parseInt(_0x52d7b0(0x2df))/0x3*(parseInt(_0x52d7b0(0x3b4))/0x4)+-parseInt(_0x52d7b0(0x31d))/0x5+parseInt(_0x52d7b0(0x1d7))/0x6+parseInt(_0x52d7b0(0x2a4))/0x7*(parseInt(_0x52d7b0(0x24b))/0x8)+-parseInt(_0x52d7b0(0x2fe))/0x9*(parseInt(_0x52d7b0(0x1c9))/0xa)+parseInt(_0x52d7b0(0x1cc))/0xb;if(_0x12925a===_0x2aca2c)break;else _0x39b0e8['push'](_0x39b0e8['shift']());}catch(_0x4f69ab){_0x39b0e8['push'](_0x39b0e8['shift']());}}}(_0x3a38,0x9b2fb));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3a9255){const _0x40cdc3=_0x2843;return _0x3a9255['status']&&_0x3a9255[_0x40cdc3(0x495)][_0x40cdc3(0x3e9)]('['+label+']');})[0x0];VisuMZ[label][_0x47d9c7(0x28d)]=VisuMZ[label][_0x47d9c7(0x28d)]||{},VisuMZ[_0x47d9c7(0x4d7)]=function(_0x2e0455,_0xdc549e){const _0x47c20e=_0x47d9c7;for(const _0x487465 in _0xdc549e){if('jgQWw'===_0x47c20e(0x2e7))this['drawItemStyleIconText'](_0x1813a5);else{if(_0x487465[_0x47c20e(0x1e0)](/(.*):(.*)/i)){const _0x22156c=String(RegExp['$1']),_0x19d467=String(RegExp['$2'])['toUpperCase']()[_0x47c20e(0x42e)]();let _0x29987a,_0x1d5445,_0x1f6402;switch(_0x19d467){case'NUM':_0x29987a=_0xdc549e[_0x487465]!==''?Number(_0xdc549e[_0x487465]):0x0;break;case _0x47c20e(0x4d1):_0x1d5445=_0xdc549e[_0x487465]!==''?JSON[_0x47c20e(0x1f7)](_0xdc549e[_0x487465]):[],_0x29987a=_0x1d5445[_0x47c20e(0x489)](_0x8aac01=>Number(_0x8aac01));break;case _0x47c20e(0x4e0):_0x29987a=_0xdc549e[_0x487465]!==''?eval(_0xdc549e[_0x487465]):null;break;case _0x47c20e(0x2be):_0x1d5445=_0xdc549e[_0x487465]!==''?JSON[_0x47c20e(0x1f7)](_0xdc549e[_0x487465]):[],_0x29987a=_0x1d5445[_0x47c20e(0x489)](_0x20c074=>eval(_0x20c074));break;case'JSON':_0x29987a=_0xdc549e[_0x487465]!==''?JSON['parse'](_0xdc549e[_0x487465]):'';break;case _0x47c20e(0x4c4):_0x1d5445=_0xdc549e[_0x487465]!==''?JSON['parse'](_0xdc549e[_0x487465]):[],_0x29987a=_0x1d5445[_0x47c20e(0x489)](_0x18f330=>JSON[_0x47c20e(0x1f7)](_0x18f330));break;case _0x47c20e(0x2d9):_0x29987a=_0xdc549e[_0x487465]!==''?new Function(JSON['parse'](_0xdc549e[_0x487465])):new Function('return\x200');break;case _0x47c20e(0x4e1):_0x1d5445=_0xdc549e[_0x487465]!==''?JSON[_0x47c20e(0x1f7)](_0xdc549e[_0x487465]):[],_0x29987a=_0x1d5445[_0x47c20e(0x489)](_0x6dbb66=>new Function(JSON[_0x47c20e(0x1f7)](_0x6dbb66)));break;case'STR':_0x29987a=_0xdc549e[_0x487465]!==''?String(_0xdc549e[_0x487465]):'';break;case _0x47c20e(0x219):_0x1d5445=_0xdc549e[_0x487465]!==''?JSON[_0x47c20e(0x1f7)](_0xdc549e[_0x487465]):[],_0x29987a=_0x1d5445['map'](_0x19c539=>String(_0x19c539));break;case _0x47c20e(0x22a):_0x1f6402=_0xdc549e[_0x487465]!==''?JSON[_0x47c20e(0x1f7)](_0xdc549e[_0x487465]):{},_0x2e0455[_0x22156c]={},VisuMZ[_0x47c20e(0x4d7)](_0x2e0455[_0x22156c],_0x1f6402);continue;case _0x47c20e(0x407):_0x1d5445=_0xdc549e[_0x487465]!==''?JSON['parse'](_0xdc549e[_0x487465]):[],_0x29987a=_0x1d5445[_0x47c20e(0x489)](_0x2646d5=>VisuMZ[_0x47c20e(0x4d7)]({},JSON[_0x47c20e(0x1f7)](_0x2646d5)));break;default:continue;}_0x2e0455[_0x22156c]=_0x29987a;}}}return _0x2e0455;},(_0x3983ab=>{const _0x62407d=_0x47d9c7,_0x3a3bfd=_0x3983ab[_0x62407d(0x396)];for(const _0x324164 of dependencies){if(!Imported[_0x324164]){alert(_0x62407d(0x3ad)['format'](_0x3a3bfd,_0x324164)),SceneManager[_0x62407d(0x318)]();break;}}const _0x452874=_0x3983ab['description'];if(_0x452874[_0x62407d(0x1e0)](/\[Version[ ](.*?)\]/i)){const _0x18039d=Number(RegExp['$1']);_0x18039d!==VisuMZ[label][_0x62407d(0x234)]&&(alert(_0x62407d(0x2c6)[_0x62407d(0x387)](_0x3a3bfd,_0x18039d)),SceneManager[_0x62407d(0x318)]());}if(_0x452874['match'](/\[Tier[ ](\d+)\]/i)){if('XqzoS'===_0x62407d(0x305)){const _0x550592=Number(RegExp['$1']);if(_0x550592<tier)_0x62407d(0x4bf)===_0x62407d(0x490)?_0x2a9ca4['SkillsStatesCore'][_0x62407d(0x28d)]['Buffs'][_0x62407d(0x2b3)][_0x62407d(0x439)](this,_0x2009b3):(alert(_0x62407d(0x401)[_0x62407d(0x387)](_0x3a3bfd,_0x550592,tier)),SceneManager[_0x62407d(0x318)]());else{if(_0x62407d(0x488)!==_0x62407d(0x42f))tier=Math[_0x62407d(0x3ce)](_0x550592,tier);else{this[_0x62407d(0x478)](_0x3e5080)[_0x62407d(0x1e0)](/\\I\[(\d+)\]/i);const _0x19fd2c=_0x3f71d7(_0x4a9055['$1'])||0x0,_0x2fb867=this[_0x62407d(0x380)](_0x45bc70),_0x5a813b=_0x2fb867['x']+_0x933e25[_0x62407d(0x49d)]((_0x2fb867[_0x62407d(0x281)]-_0x3e5ca0['iconWidth'])/0x2),_0x5e39af=_0x2fb867['y']+(_0x2fb867[_0x62407d(0x1d9)]-_0x2f14a9[_0x62407d(0x1bf)])/0x2;this['drawIcon'](_0x19fd2c,_0x5a813b,_0x5e39af);}}}else{if(!_0xdbd00[_0x62407d(0x31b)][_0x62407d(0x28d)][_0x62407d(0x3b2)][_0x62407d(0x3bc)])return;const _0x42583c=_0x50b172['paramBuffRate'](_0x15b1f6),_0x1d8ade=_0x3db35e['buff'](_0x9e48b),_0x395d77=_0x1357c5[_0x62407d(0x2aa)],_0x292c38=_0x12fe6a[_0x62407d(0x1bf)]/0x2,_0x4b88e8=_0x1d8ade>0x0?_0xb69aad[_0x62407d(0x356)]():_0x1d5a42[_0x62407d(0x22d)]();this[_0x62407d(0x3d8)](_0x4b88e8),this[_0x62407d(0x48b)]('rgba(0,\x200,\x200,\x201)'),this[_0x62407d(0x413)][_0x62407d(0x2b4)]=!![],this[_0x62407d(0x413)][_0x62407d(0x30b)]=_0x5e943a['SkillsStatesCore'][_0x62407d(0x28d)][_0x62407d(0x3b2)][_0x62407d(0x1e2)],_0x33bb40+=_0x10e802[_0x62407d(0x31b)][_0x62407d(0x28d)]['Buffs']['DataOffsetX'],_0x18e600+=_0x3fbeba['SkillsStatesCore'][_0x62407d(0x28d)]['Buffs'][_0x62407d(0x3e5)];const _0x1aed85='%1%'['format'](_0x3f82cf[_0x62407d(0x25b)](_0x42583c*0x64));this[_0x62407d(0x422)](_0x1aed85,_0x21f5a3,_0x5dff38,_0x395d77,_0x62407d(0x202)),this[_0x62407d(0x413)][_0x62407d(0x2b4)]=![],this[_0x62407d(0x241)]();}}VisuMZ[_0x62407d(0x4d7)](VisuMZ[label][_0x62407d(0x28d)],_0x3983ab[_0x62407d(0x49e)]);})(pluginData),VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4b7)]=Scene_Boot[_0x47d9c7(0x2f9)][_0x47d9c7(0x249)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x425316=_0x47d9c7;VisuMZ[_0x425316(0x31b)][_0x425316(0x4b7)]['call'](this),this[_0x425316(0x3b3)](),VisuMZ[_0x425316(0x31b)]['CheckIncompatibleStates']();},Scene_Boot['prototype'][_0x47d9c7(0x3b3)]=function(){const _0xa5f231=_0x47d9c7;if(VisuMZ['ParseAllNotetags'])return;this[_0xa5f231(0x4d4)](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0xf6bf7c=_0x47d9c7;for(const _0x278ed0 of $dataSkills){if(_0xf6bf7c(0x4a1)!=='PVydJ'){if(!_0x278ed0)continue;VisuMZ[_0xf6bf7c(0x31b)][_0xf6bf7c(0x332)](_0x278ed0),VisuMZ[_0xf6bf7c(0x31b)][_0xf6bf7c(0x2de)](_0x278ed0);}else _0xcb7928(_0xf6bf7c(0x2c6)['format'](_0x34eed7,_0x346e14)),_0x126e4b[_0xf6bf7c(0x318)]();}},Scene_Boot[_0x47d9c7(0x2f9)][_0x47d9c7(0x482)]=function(){const _0x2aefa4=_0x47d9c7;for(const _0x28c6a3 of $dataStates){if(_0x2aefa4(0x3e4)!=='Ixwpq'){if(!_0x28c6a3)continue;VisuMZ[_0x2aefa4(0x31b)]['Parse_Notetags_State_Category'](_0x28c6a3),VisuMZ[_0x2aefa4(0x31b)][_0x2aefa4(0x1ed)](_0x28c6a3),VisuMZ[_0x2aefa4(0x31b)]['Parse_Notetags_State_SlipEffectJS'](_0x28c6a3),VisuMZ[_0x2aefa4(0x31b)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x28c6a3);}else return'';}},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x1de)]=VisuMZ[_0x47d9c7(0x1de)],VisuMZ[_0x47d9c7(0x1de)]=function(_0x506085){const _0x3adc73=_0x47d9c7;VisuMZ['SkillsStatesCore'][_0x3adc73(0x1de)][_0x3adc73(0x439)](this,_0x506085),VisuMZ[_0x3adc73(0x31b)][_0x3adc73(0x332)](_0x506085),VisuMZ[_0x3adc73(0x31b)]['Parse_Notetags_Skill_JS'](_0x506085);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x212)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x47d9c7(0x212)]=function(_0x32e2f1){const _0x5e6934=_0x47d9c7;VisuMZ[_0x5e6934(0x31b)][_0x5e6934(0x212)][_0x5e6934(0x439)](this,_0x32e2f1),VisuMZ[_0x5e6934(0x31b)][_0x5e6934(0x4bc)](_0x32e2f1),VisuMZ[_0x5e6934(0x31b)][_0x5e6934(0x1ed)](_0x32e2f1),VisuMZ['SkillsStatesCore'][_0x5e6934(0x44b)](_0x32e2f1),VisuMZ[_0x5e6934(0x31b)][_0x5e6934(0x295)](_0x32e2f1);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x332)]=function(_0x3d481d){const _0x4a5baa=_0x47d9c7,_0x33120a=_0x3d481d[_0x4a5baa(0x4c8)];_0x33120a['match'](/<MP COST:[ ](\d+)>/i)&&(_0x3d481d[_0x4a5baa(0x2d3)]=Number(RegExp['$1']));if(_0x33120a['match'](/<TP COST:[ ](\d+)>/i)){if(_0x4a5baa(0x298)===_0x4a5baa(0x298))_0x3d481d[_0x4a5baa(0x3c3)]=Number(RegExp['$1']);else return _0x2bcf5d[_0x4a5baa(0x31b)][_0x4a5baa(0x28d)][_0x4a5baa(0x43a)][_0x4a5baa(0x3a3)];}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x366)]={},VisuMZ[_0x47d9c7(0x31b)]['skillVisibleJS']={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x2de)]=function(_0xafc297){const _0x1cca17=_0x47d9c7,_0x3ecb8b=_0xafc297[_0x1cca17(0x4c8)];if(_0x3ecb8b['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if(_0x1cca17(0x1b5)!=='cfbbd'){const _0x5cbe31=String(RegExp['$1']),_0x507261=_0x1cca17(0x303)[_0x1cca17(0x387)](_0x5cbe31);VisuMZ['SkillsStatesCore'][_0x1cca17(0x366)][_0xafc297['id']]=new Function('skill',_0x507261);}else _0x5da40d[_0x1cca17(0x31b)][_0x1cca17(0x351)][_0x1cca17(0x439)](this);}if(_0x3ecb8b[_0x1cca17(0x1e0)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x1cca17(0x1dc)==='LJCDN'){const _0x570c2c=String(RegExp['$1']),_0x528d40=_0x1cca17(0x357)[_0x1cca17(0x387)](_0x570c2c);VisuMZ[_0x1cca17(0x31b)][_0x1cca17(0x263)][_0xafc297['id']]=new Function(_0x1cca17(0x3d1),_0x528d40);}else return _0x193b56(_0x32e9fc['$1']);}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4bc)]=function(_0xc19f03){const _0x55b3a6=_0x47d9c7;_0xc19f03[_0x55b3a6(0x4a3)]=[_0x55b3a6(0x315),_0x55b3a6(0x415)];const _0x5a969d=_0xc19f03['note'],_0x1d674e=_0x5a969d[_0x55b3a6(0x1e0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1d674e)for(const _0x2ace6a of _0x1d674e){if(_0x55b3a6(0x306)!==_0x55b3a6(0x306))_0x1d3996[_0x55b3a6(0x3c3)]=_0x1eb0f5(_0x3065c1['$1']);else{_0x2ace6a[_0x55b3a6(0x1e0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0xf260c7=String(RegExp['$1'])['toUpperCase']()['trim']()['split'](',');for(const _0x4240a6 of _0xf260c7){_0xc19f03[_0x55b3a6(0x4a3)]['push'](_0x4240a6[_0x55b3a6(0x42e)]());}}}if(_0x5a969d[_0x55b3a6(0x1e0)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x55b3a6(0x2ee)!==_0x55b3a6(0x1fb)){const _0x460924=RegExp['$1']['split'](/[\r\n]+/);for(const _0x3d93bb of _0x460924){_0xc19f03[_0x55b3a6(0x4a3)][_0x55b3a6(0x2f6)](_0x3d93bb[_0x55b3a6(0x1b4)]()[_0x55b3a6(0x42e)]());}}else return _0x2a12f4[_0x559d42['id']][_0x55b3a6(0x439)](this,_0x3d318d);}_0x5a969d[_0x55b3a6(0x1e0)](/<POSITIVE STATE>/i)&&_0xc19f03[_0x55b3a6(0x4a3)][_0x55b3a6(0x2f6)](_0x55b3a6(0x34e)),_0x5a969d[_0x55b3a6(0x1e0)](/<NEGATIVE STATE>/i)&&_0xc19f03[_0x55b3a6(0x4a3)][_0x55b3a6(0x2f6)]('NEGATIVE');},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4f5)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS']=function(_0x37c3cd){const _0x342902=_0x47d9c7,_0x1ce6bd=_0x37c3cd[_0x342902(0x4c8)];if(_0x1ce6bd[_0x342902(0x1e0)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x342902(0x326)!==_0x342902(0x326)){const _0x4077bc=_0x2c1b67['SkillsStatesCore'][_0x342902(0x28d)][_0x342902(0x464)];return _0x4077bc[_0x342902(0x41a)]===_0x342902(0x1c7)?_0x4f5ebe[_0x342902(0x1a9)]()-0x6:_0x5cd8e6['mainFontSize']()-0x2;}else{const _0x2dfe34=String(RegExp['$1']),_0xf41e75=_0x342902(0x3f8)['format'](_0x2dfe34);VisuMZ[_0x342902(0x31b)][_0x342902(0x4f5)][_0x37c3cd['id']]=new Function(_0x342902(0x38b),_0xf41e75);}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x240)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x294)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x467)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x2d1)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4a9)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x377)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x44b)]=function(_0x32e83c){const _0x1c5195=_0x47d9c7,_0x7fdfc4=_0x32e83c['note'],_0x48a9ec=_0x1c5195(0x433);if(_0x7fdfc4['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0x1c5195(0x4cb)!==_0x1c5195(0x221)){const _0x55b658=String(RegExp['$1']),_0x126aef=_0x48a9ec[_0x1c5195(0x387)](_0x55b658,_0x1c5195(0x280),-0x1,_0x1c5195(0x266));VisuMZ[_0x1c5195(0x31b)][_0x1c5195(0x240)][_0x32e83c['id']]=new Function(_0x1c5195(0x267),_0x126aef);}else{_0x41757a['SkillsStatesCore'][_0x1c5195(0x46f)]['call'](this);const _0x35201a=_0x383020[_0x1c5195(0x31b)][_0x1c5195(0x28d)]['PassiveStates'][_0x1c5195(0x3e3)]??!![];if(!_0x35201a)return;if(_0x202ffa[_0x1c5195(0x337)]())for(const _0x40bb99 of _0x5cb396[_0x1c5195(0x400)]()){if(_0x40bb99)_0x40bb99['refresh']();}}}else{if(_0x7fdfc4['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x294de6=String(RegExp['$1']),_0x1597f6=_0x48a9ec[_0x1c5195(0x387)](_0x294de6,'heal',0x1,_0x1c5195(0x266));VisuMZ[_0x1c5195(0x31b)]['stateHpSlipHealJS'][_0x32e83c['id']]=new Function(_0x1c5195(0x267),_0x1597f6);}}if(_0x7fdfc4[_0x1c5195(0x1e0)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x588af2=String(RegExp['$1']),_0x101c3d=_0x48a9ec['format'](_0x588af2,_0x1c5195(0x280),-0x1,_0x1c5195(0x3ee));VisuMZ[_0x1c5195(0x31b)][_0x1c5195(0x467)][_0x32e83c['id']]=new Function('stateId',_0x101c3d);}else{if(_0x7fdfc4['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x3b4c1f=String(RegExp['$1']),_0x77b970=_0x48a9ec[_0x1c5195(0x387)](_0x3b4c1f,_0x1c5195(0x1b7),0x1,_0x1c5195(0x3ee));VisuMZ[_0x1c5195(0x31b)]['stateMpSlipHealJS'][_0x32e83c['id']]=new Function(_0x1c5195(0x267),_0x77b970);}}if(_0x7fdfc4[_0x1c5195(0x1e0)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x43451a=String(RegExp['$1']),_0x51301b=_0x48a9ec[_0x1c5195(0x387)](_0x43451a,_0x1c5195(0x280),-0x1,'slipTp');VisuMZ[_0x1c5195(0x31b)][_0x1c5195(0x4a9)][_0x32e83c['id']]=new Function(_0x1c5195(0x267),_0x51301b);}else{if(_0x7fdfc4[_0x1c5195(0x1e0)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x1c5195(0x3ba)!==_0x1c5195(0x2eb)){const _0x2d0cce=String(RegExp['$1']),_0x271660=_0x48a9ec[_0x1c5195(0x387)](_0x2d0cce,'heal',0x1,_0x1c5195(0x4fe));VisuMZ[_0x1c5195(0x31b)]['stateTpSlipHealJS'][_0x32e83c['id']]=new Function(_0x1c5195(0x267),_0x271660);}else return _0x3c54cc['status']&&_0x2f2845[_0x1c5195(0x495)]['includes']('['+_0x572143+']');}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x271)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x239)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x1d4)]={},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x295)]=function(_0xd9483f){const _0x213767=_0x47d9c7,_0x45359b=_0xd9483f['note'],_0x3984f6=_0x213767(0x36c);if(_0x45359b[_0x213767(0x1e0)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x42f2ea=String(RegExp['$1']),_0xcd714b=_0x3984f6[_0x213767(0x387)](_0x42f2ea);VisuMZ[_0x213767(0x31b)][_0x213767(0x271)][_0xd9483f['id']]=new Function(_0x213767(0x267),_0xcd714b);}if(_0x45359b[_0x213767(0x1e0)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x51cc38=String(RegExp['$1']),_0x43ba8e=_0x3984f6[_0x213767(0x387)](_0x51cc38);VisuMZ[_0x213767(0x31b)][_0x213767(0x239)][_0xd9483f['id']]=new Function(_0x213767(0x267),_0x43ba8e);}if(_0x45359b[_0x213767(0x1e0)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x254849=String(RegExp['$1']),_0x31aab5=_0x3984f6[_0x213767(0x387)](_0x254849);VisuMZ[_0x213767(0x31b)]['stateExpireJS'][_0xd9483f['id']]=new Function(_0x213767(0x267),_0x31aab5);}},VisuMZ[_0x47d9c7(0x31b)]['CheckIncompatibleStates']=function(){const _0x191670=_0x47d9c7;if(!VisuMZ['SkillsStatesCore'][_0x191670(0x28d)][_0x191670(0x217)][_0x191670(0x4af)])return;for(const _0x402c41 of $dataStates){if(!_0x402c41)continue;if(_0x402c41['restriction']===0x4&&_0x402c41[_0x191670(0x223)]===0x1){if(_0x191670(0x206)!==_0x191670(0x206)){if(typeof _0x414a01!==_0x191670(0x1c7))_0x224bb2=_0x905f65['id'];const _0x3063b6=this[_0x191670(0x29c)](_0x17283e);return _0x3063b6[_0x2ad263];}else _0x402c41[_0x191670(0x223)]=0x2;}}},DataManager['getClassIdWithName']=function(_0x200e3f){const _0x34a6af=_0x47d9c7;_0x200e3f=_0x200e3f[_0x34a6af(0x1b4)]()[_0x34a6af(0x42e)](),this[_0x34a6af(0x1f2)]=this[_0x34a6af(0x1f2)]||{};if(this[_0x34a6af(0x1f2)][_0x200e3f])return this[_0x34a6af(0x1f2)][_0x200e3f];for(const _0x13dd18 of $dataClasses){if(!_0x13dd18)continue;let _0x21271f=_0x13dd18[_0x34a6af(0x396)];_0x21271f=_0x21271f[_0x34a6af(0x2c4)](/\x1I\[(\d+)\]/gi,''),_0x21271f=_0x21271f[_0x34a6af(0x2c4)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x21271f[_0x34a6af(0x1b4)]()[_0x34a6af(0x42e)]()]=_0x13dd18['id'];}return this['_classIDs'][_0x200e3f]||0x0;},DataManager[_0x47d9c7(0x201)]=function(_0xdc165a){const _0x1addbb=_0x47d9c7;this[_0x1addbb(0x390)]=this[_0x1addbb(0x390)]||{};if(this[_0x1addbb(0x390)][_0xdc165a['id']])return this[_0x1addbb(0x390)][_0xdc165a['id']];this[_0x1addbb(0x390)][_0xdc165a['id']]=[_0xdc165a[_0x1addbb(0x2f2)]];if(_0xdc165a['note'][_0x1addbb(0x1e0)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1addbb(0x3ac)===_0x1addbb(0x3ac)){const _0x1767f1=JSON[_0x1addbb(0x1f7)]('['+RegExp['$1']['match'](/\d+/g)+']');this['_stypeIDs'][_0xdc165a['id']]=this[_0x1addbb(0x390)][_0xdc165a['id']][_0x1addbb(0x49a)](_0x1767f1);}else return this[_0x1addbb(0x336)]&&this['_scene'][_0x1addbb(0x33f)]===_0x4f55e7;}else{if(_0xdc165a[_0x1addbb(0x4c8)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x1addbb(0x308)===_0x1addbb(0x2d7))return![];else{const _0x491972=RegExp['$1']['split'](',');for(const _0x5b894b of _0x491972){const _0x4adbfa=DataManager[_0x1addbb(0x33a)](_0x5b894b);if(_0x4adbfa)this[_0x1addbb(0x390)][_0xdc165a['id']][_0x1addbb(0x2f6)](_0x4adbfa);}}}}return this[_0x1addbb(0x390)][_0xdc165a['id']];},DataManager[_0x47d9c7(0x33a)]=function(_0x20484a){const _0x462b2b=_0x47d9c7;_0x20484a=_0x20484a['toUpperCase']()[_0x462b2b(0x42e)](),this['_stypeIDs']=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x20484a])return this[_0x462b2b(0x390)][_0x20484a];for(let _0x24380e=0x1;_0x24380e<0x64;_0x24380e++){if(!$dataSystem[_0x462b2b(0x1b8)][_0x24380e])continue;let _0x3079b3=$dataSystem[_0x462b2b(0x1b8)][_0x24380e][_0x462b2b(0x1b4)]()[_0x462b2b(0x42e)]();_0x3079b3=_0x3079b3[_0x462b2b(0x2c4)](/\x1I\[(\d+)\]/gi,''),_0x3079b3=_0x3079b3[_0x462b2b(0x2c4)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x3079b3]=_0x24380e;}return this[_0x462b2b(0x390)][_0x20484a]||0x0;},DataManager['getSkillIdWithName']=function(_0xc5650e){const _0x3c302d=_0x47d9c7;_0xc5650e=_0xc5650e[_0x3c302d(0x1b4)]()[_0x3c302d(0x42e)](),this[_0x3c302d(0x26f)]=this[_0x3c302d(0x26f)]||{};if(this[_0x3c302d(0x26f)][_0xc5650e])return this[_0x3c302d(0x26f)][_0xc5650e];for(const _0x64915e of $dataSkills){if('fwAgk'===_0x3c302d(0x1ee)){if(!_0x64915e)continue;this['_skillIDs'][_0x64915e[_0x3c302d(0x396)][_0x3c302d(0x1b4)]()[_0x3c302d(0x42e)]()]=_0x64915e['id'];}else{if(this[_0x3c302d(0x3c0)]())return!![];return _0x4abf6e['SkillsStatesCore'][_0x3c302d(0x40d)][_0x3c302d(0x439)](this);}}return this[_0x3c302d(0x26f)][_0xc5650e]||0x0;},DataManager[_0x47d9c7(0x3dc)]=function(_0x26dcff){const _0x3f81e8=_0x47d9c7;_0x26dcff=_0x26dcff[_0x3f81e8(0x1b4)]()[_0x3f81e8(0x42e)](),this[_0x3f81e8(0x365)]=this[_0x3f81e8(0x365)]||{};if(this[_0x3f81e8(0x365)][_0x26dcff])return this['_stateIDs'][_0x26dcff];for(const _0x5abeea of $dataStates){if(!_0x5abeea)continue;this[_0x3f81e8(0x365)][_0x5abeea['name']['toUpperCase']()['trim']()]=_0x5abeea['id'];}return this[_0x3f81e8(0x365)][_0x26dcff]||0x0;},DataManager[_0x47d9c7(0x3a5)]=function(_0x3c4111){const _0x584e45=_0x47d9c7;this[_0x584e45(0x3a1)]=this[_0x584e45(0x3a1)]||{};if(this[_0x584e45(0x3a1)][_0x3c4111])return this[_0x584e45(0x3a1)][_0x3c4111];if($dataStates[_0x3c4111]['note'][_0x584e45(0x1e0)](/<MAX TURNS:[ ](\d+)>/i)){if(_0x584e45(0x25a)===_0x584e45(0x25a))this[_0x584e45(0x3a1)][_0x3c4111]=Number(RegExp['$1']);else{const _0x29d288=_0x4d74f9[_0x584e45(0x4c8)];if(_0x29d288[_0x584e45(0x1e0)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x4d0068=_0xacea3a(_0x3e6d9b['$1'])[_0x584e45(0x4f3)](',')[_0x584e45(0x489)](_0x1c7e36=>_0x1c7e36[_0x584e45(0x42e)]()),_0x1b6e52=_0x9bb9bc[_0x584e45(0x31b)][_0x584e45(0x46c)](_0x4d0068);return _0x1b6e52[_0x584e45(0x3e9)](this['currentClass']());}if(_0x29d288['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x5bb50a=_0xfeebfd(_0x2fc8db['$1'])[_0x584e45(0x4f3)](',')[_0x584e45(0x489)](_0x2fa015=>_0x2fa015[_0x584e45(0x42e)]()),_0x1ca84d=_0x19bd3f['SkillsStatesCore'][_0x584e45(0x46c)](_0x5bb50a);let _0x3243fc=[this[_0x584e45(0x3d5)]()];return _0x28aef5[_0x584e45(0x285)]&&this[_0x584e45(0x4b6)]&&(_0x3243fc=this[_0x584e45(0x4b6)]()),_0x1ca84d[_0x584e45(0x311)](_0x2e77a0=>_0x3243fc['includes'](_0x2e77a0))[_0x584e45(0x1f8)]>0x0;}return _0x179b01[_0x584e45(0x2f9)][_0x584e45(0x35c)][_0x584e45(0x439)](this,_0x407a9e);}}else _0x584e45(0x33b)===_0x584e45(0x33b)?this[_0x584e45(0x3a1)][_0x3c4111]=VisuMZ[_0x584e45(0x31b)]['Settings'][_0x584e45(0x217)]['MaxTurns']:(_0x464868=_0x349759[_0x584e45(0x3dc)](_0x19e55f['$1']),_0x5b579d=_0x35a6b5(_0x58438f['$2']));return this['_stateMaxTurns'][_0x3c4111];},ColorManager[_0x47d9c7(0x2a8)]=function(_0x2db445,_0x49b23d){const _0x466861=_0x47d9c7;_0x49b23d=String(_0x49b23d),this[_0x466861(0x2d6)]=this[_0x466861(0x2d6)]||{};if(_0x49b23d['match'](/#(.*)/i))this[_0x466861(0x2d6)][_0x2db445]=_0x466861(0x323)[_0x466861(0x387)](String(RegExp['$1']));else{if(_0x466861(0x34f)===_0x466861(0x4d5)){_0x31fe8e[_0x466861(0x2f9)][_0x466861(0x284)]['call'](this);const _0x2967e7=_0x57f06b['SkillsStatesCore']['Settings'][_0x466861(0x2c9)][_0x466861(0x1c3)];this[_0x466861(0x3d3)][_0x466861(0x443)]=this[_0x466861(0x3d3)][_0x466861(0x443)]['concat'](_0x2967e7);}else this[_0x466861(0x2d6)][_0x2db445]=this[_0x466861(0x2cd)](Number(_0x49b23d));}return this[_0x466861(0x2d6)][_0x2db445];},ColorManager[_0x47d9c7(0x410)]=function(_0x2d5cf3){const _0x44b0c6=_0x47d9c7;return _0x2d5cf3=String(_0x2d5cf3),_0x2d5cf3['match'](/#(.*)/i)?_0x44b0c6(0x323)['format'](String(RegExp['$1'])):this[_0x44b0c6(0x2cd)](Number(_0x2d5cf3));},ColorManager[_0x47d9c7(0x3b1)]=function(_0x47ca67){const _0x2de225=_0x47d9c7;if(typeof _0x47ca67==='number')_0x47ca67=$dataStates[_0x47ca67];const _0x1370bd=_0x2de225(0x1f5)[_0x2de225(0x387)](_0x47ca67['id']);this[_0x2de225(0x2d6)]=this[_0x2de225(0x2d6)]||{};if(this[_0x2de225(0x2d6)][_0x1370bd])return this[_0x2de225(0x2d6)][_0x1370bd];const _0x227249=this[_0x2de225(0x297)](_0x47ca67);return this[_0x2de225(0x2a8)](_0x1370bd,_0x227249);},ColorManager[_0x47d9c7(0x297)]=function(_0x3507db){const _0x35407c=_0x47d9c7,_0x588b09=_0x3507db[_0x35407c(0x4c8)];if(_0x588b09[_0x35407c(0x1e0)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x588b09[_0x35407c(0x1e0)](/<POSITIVE STATE>/i))return VisuMZ[_0x35407c(0x31b)][_0x35407c(0x28d)][_0x35407c(0x217)][_0x35407c(0x3eb)];else return _0x588b09[_0x35407c(0x1e0)](/<NEGATIVE STATE>/i)?VisuMZ[_0x35407c(0x31b)][_0x35407c(0x28d)]['States']['ColorNegative']:VisuMZ[_0x35407c(0x31b)][_0x35407c(0x28d)]['States']['ColorNeutral'];}},ColorManager[_0x47d9c7(0x356)]=function(){const _0x1fbc3f=_0x47d9c7,_0x252086='_stored_buffColor';this[_0x1fbc3f(0x2d6)]=this[_0x1fbc3f(0x2d6)]||{};if(this['_colorCache'][_0x252086])return this[_0x1fbc3f(0x2d6)][_0x252086];const _0x55bcfd=VisuMZ['SkillsStatesCore'][_0x1fbc3f(0x28d)][_0x1fbc3f(0x3b2)][_0x1fbc3f(0x3ec)];return this['getColorDataFromPluginParameters'](_0x252086,_0x55bcfd);},ColorManager['debuffColor']=function(){const _0x118b36=_0x47d9c7,_0x2a9bfb=_0x118b36(0x320);this[_0x118b36(0x2d6)]=this[_0x118b36(0x2d6)]||{};if(this[_0x118b36(0x2d6)][_0x2a9bfb])return this[_0x118b36(0x2d6)][_0x2a9bfb];const _0x24203e=VisuMZ[_0x118b36(0x31b)][_0x118b36(0x28d)][_0x118b36(0x3b2)][_0x118b36(0x2bf)];return this['getColorDataFromPluginParameters'](_0x2a9bfb,_0x24203e);},SceneManager['isSceneBattle']=function(){const _0x477693=_0x47d9c7;return this[_0x477693(0x336)]&&this[_0x477693(0x336)][_0x477693(0x33f)]===Scene_Battle;},VisuMZ[_0x47d9c7(0x31b)]['BattleManager_endAction']=BattleManager[_0x47d9c7(0x2f1)],BattleManager['endAction']=function(){const _0x3a560d=_0x47d9c7;this[_0x3a560d(0x2fd)](),VisuMZ[_0x3a560d(0x31b)][_0x3a560d(0x4b2)][_0x3a560d(0x439)](this);},BattleManager[_0x47d9c7(0x2fd)]=function(){const _0x18e6cf=_0x47d9c7,_0x564fc1=VisuMZ[_0x18e6cf(0x31b)][_0x18e6cf(0x28d)]['States'];if(!_0x564fc1)return;if(_0x564fc1[_0x18e6cf(0x4af)]===![])return;if(!this[_0x18e6cf(0x207)])return;this[_0x18e6cf(0x207)]['updateStatesActionEnd']();},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x2fd)]=function(){const _0x3dabdc=_0x47d9c7;if(BattleManager[_0x3dabdc(0x22e)]!=='action')return;if(this[_0x3dabdc(0x1e3)]===Graphics[_0x3dabdc(0x310)])return;this[_0x3dabdc(0x1e3)]=Graphics[_0x3dabdc(0x310)];for(const _0x990848 of this[_0x3dabdc(0x27f)]){if(_0x3dabdc(0x248)!==_0x3dabdc(0x31a)){const _0x45a944=$dataStates[_0x990848];if(!_0x45a944)continue;if(_0x45a944[_0x3dabdc(0x223)]!==0x1)continue;if(this[_0x3dabdc(0x2f3)][_0x990848]>0x0){if(_0x3dabdc(0x20a)!==_0x3dabdc(0x20a)){if(this[_0x3dabdc(0x1ad)](_0x3eaee7)){const _0x5486ab=_0x2bde1b['SkillsStatesCore']['Settings'][_0x3dabdc(0x3b2)][_0x3dabdc(0x487)];this['_buffTurns'][_0xb2436c]=_0xf5f7d1['clamp'](0x0,_0x5486ab);}}else this[_0x3dabdc(0x2f3)][_0x990848]--;}}else for(const _0x4dab93 of _0xe6c9d3){_0x4dab93[_0x3dabdc(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4279c0=_0x177a8d(_0xbdb7e8['$1']),_0xd58746=_0x31ebd2(_0x380106['$2']);_0x3040e9['removeStatesByCategory'](_0x4279c0,_0xd58746);}}this[_0x3dabdc(0x3e7)](0x1);},Game_BattlerBase['prototype'][_0x47d9c7(0x3e6)]=function(){const _0x4ad484=_0x47d9c7,_0x1321e9=VisuMZ[_0x4ad484(0x31b)][_0x4ad484(0x28d)][_0x4ad484(0x217)];for(const _0x4475e1 of this[_0x4ad484(0x27f)]){if(_0x4ad484(0x3fd)!==_0x4ad484(0x3fd))_0x25b69d['SkillsStatesCore'][_0x4ad484(0x45c)][_0x4ad484(0x439)](this,_0x340fbc),this['makeCurrentTroopUniqueID']();else{const _0x49f278=$dataStates[_0x4475e1];if(_0x1321e9&&_0x1321e9[_0x4ad484(0x4af)]!==![]){if(_0x4ad484(0x418)!=='KnTKi'){const _0x28166f=_0x37a191[_0x4ad484(0x31b)][_0x4ad484(0x28d)][_0x4ad484(0x464)];return _0x28166f[_0x4ad484(0x457)]==='number'?_0x5cff53['mainFontSize']()-0x6:_0x243c6f[_0x4ad484(0x1a9)]()-0x2;}else{if(_0x49f278&&_0x49f278[_0x4ad484(0x223)]===0x1)continue;}}if(this['_stateTurns'][_0x4475e1]>0x0){if(_0x4ad484(0x1fe)!=='pZpCn'){let _0x3def3b=_0x5b6b74[_0x4ad484(0x35a)][_0x4ad484(0x439)](_0x1e2915,_0x28020f);return _0x3def3b=_0x14da03[_0x4ad484(0x361)](_0x423c92,_0x3def3b,_0x3a2715),_0x168ac8[_0x4ad484(0x382)][_0x4ad484(0x439)](_0x2c00ef,_0x45d340,_0x3def3b,_0x5ccf07);}else this[_0x4ad484(0x2f3)][_0x4475e1]--;}}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x341)]=Game_Switches[_0x47d9c7(0x2f9)][_0x47d9c7(0x375)],Game_Switches[_0x47d9c7(0x2f9)][_0x47d9c7(0x375)]=function(){const _0x159b59=_0x47d9c7;VisuMZ[_0x159b59(0x31b)][_0x159b59(0x341)][_0x159b59(0x439)](this);const _0x371e2b=VisuMZ[_0x159b59(0x31b)][_0x159b59(0x28d)][_0x159b59(0x2c9)]['RefreshCacheSwitch']??!![];if(!_0x371e2b)return;if(SceneManager[_0x159b59(0x337)]()){if(_0x159b59(0x216)===_0x159b59(0x216))for(const _0x106fed of BattleManager['allBattleMembers']()){if(_0x106fed)_0x106fed[_0x159b59(0x1e9)]();}else{if(typeof _0x714c13!==_0x159b59(0x1c7))_0x1ceff4=_0x3b6884['id'];this['_stateDisplay']=this['_stateDisplay']||{},this['_stateDisplay'][_0x82916b]=_0x59aaa4;}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x46f)]=Game_Variables['prototype']['onChange'],Game_Variables[_0x47d9c7(0x2f9)][_0x47d9c7(0x375)]=function(){const _0x1b6273=_0x47d9c7;VisuMZ[_0x1b6273(0x31b)][_0x1b6273(0x46f)][_0x1b6273(0x439)](this);const _0x59a948=VisuMZ[_0x1b6273(0x31b)][_0x1b6273(0x28d)]['PassiveStates'][_0x1b6273(0x3e3)]??!![];if(!_0x59a948)return;if(SceneManager[_0x1b6273(0x337)]())for(const _0x381252 of BattleManager[_0x1b6273(0x400)]()){if(_0x381252)_0x381252[_0x1b6273(0x1e9)]();}},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x36f)]=Game_Action[_0x47d9c7(0x2f9)][_0x47d9c7(0x43c)],Game_Action[_0x47d9c7(0x2f9)][_0x47d9c7(0x43c)]=function(_0x1b834c){const _0x292d9f=_0x47d9c7;VisuMZ[_0x292d9f(0x31b)][_0x292d9f(0x36f)][_0x292d9f(0x439)](this,_0x1b834c),this[_0x292d9f(0x1ce)](_0x1b834c);},Game_Action[_0x47d9c7(0x2f9)][_0x47d9c7(0x1ce)]=function(_0x447f5d){const _0x1f4cb0=_0x47d9c7;this['applyStateCategoryRemovalEffects'](_0x447f5d),this[_0x1f4cb0(0x4d9)](_0x447f5d),this[_0x1f4cb0(0x32c)](_0x447f5d),this[_0x1f4cb0(0x1da)](_0x447f5d);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x282)]=Game_Action['prototype'][_0x47d9c7(0x2bb)],Game_Action[_0x47d9c7(0x2f9)][_0x47d9c7(0x2bb)]=function(_0x415000){const _0x229ece=_0x47d9c7;if(this[_0x229ece(0x4ce)](_0x415000))return!![];return VisuMZ['SkillsStatesCore'][_0x229ece(0x282)][_0x229ece(0x439)](this,_0x415000);},Game_Action['prototype'][_0x47d9c7(0x4ce)]=function(_0x45e8ef){const _0x3568df=_0x47d9c7;if(!this[_0x3568df(0x4df)]())return;const _0x56c0cc=this[_0x3568df(0x4df)]()['note'];if(_0x56c0cc[_0x3568df(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x3568df(0x3b8)===_0x3568df(0x3b8)){const _0x1fbad1=String(RegExp['$1']);if(_0x45e8ef[_0x3568df(0x30e)](_0x1fbad1))return!![];}else{if(_0x21be7f)_0x178cd4[_0x3568df(0x1e9)]();}}if(_0x56c0cc[_0x3568df(0x1e0)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x2ad762=Number(RegExp['$1']);if(_0x45e8ef[_0x3568df(0x19f)](_0x2ad762))return!![];}else{if(_0x56c0cc[_0x3568df(0x1e0)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x3568df(0x465)===_0x3568df(0x465)){const _0x59acf7=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x45e8ef[_0x3568df(0x19f)](_0x59acf7))return!![];}else return!this[_0x3568df(0x329)](_0x231f82)&&!this[_0x3568df(0x2c0)](_0xb27953)&&!this[_0x3568df(0x2a2)][_0x3568df(0x203)](_0x2737a6);}}return![];},Game_Action[_0x47d9c7(0x2f9)][_0x47d9c7(0x414)]=function(_0x39ec25){const _0x3fa4b5=_0x47d9c7;if(_0x39ec25['states']()[_0x3fa4b5(0x1f8)]<=0x0)return;const _0xe2cba8=this[_0x3fa4b5(0x4df)]()[_0x3fa4b5(0x4c8)];{const _0x247672=_0xe2cba8[_0x3fa4b5(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x247672){if(_0x3fa4b5(0x2d2)!==_0x3fa4b5(0x2e2))for(const _0x5da3f of _0x247672){if(_0x3fa4b5(0x299)!==_0x3fa4b5(0x299))return _0x152739=_0x54bd6c[_0x3fa4b5(0x1b4)]()[_0x3fa4b5(0x42e)](),this[_0x3fa4b5(0x3e0)]()['filter'](_0x33a818=>_0x33a818['categories'][_0x3fa4b5(0x3e9)](_0x321354));else{_0x5da3f[_0x3fa4b5(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0xbcf278=String(RegExp['$1']);_0x39ec25['removeStatesByCategoryAll'](_0xbcf278);}}else{const _0xf5916c=_0xfd4a5f[_0x3fa4b5(0x1f7)]('['+_0x1529c1['$1'][_0x3fa4b5(0x1e0)](/\d+/g)+']');for(const _0x55a782 of _0xf5916c){if(_0x1dc5b1[_0x3fa4b5(0x359)](_0x55a782))return![];}return!![];}}}{const _0x25a8ab=_0xe2cba8[_0x3fa4b5(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x25a8ab)for(const _0x43401 of _0x25a8ab){if(_0x3fa4b5(0x1a4)===_0x3fa4b5(0x1a4)){_0x43401[_0x3fa4b5(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x2f92bc=String(RegExp['$1']),_0x5d6d85=Number(RegExp['$2']);_0x39ec25[_0x3fa4b5(0x4ad)](_0x2f92bc,_0x5d6d85);}else{if(this['_stypeId']===_0x163f64)return;this['_stypeId']=_0x4b8bbd,this['refresh'](),this[_0x3fa4b5(0x24d)](0x0,0x0),this['_statusWindow']&&this[_0x3fa4b5(0x20b)][_0x3fa4b5(0x33f)]===_0x763f61&&this[_0x3fa4b5(0x20b)][_0x3fa4b5(0x1a8)](this[_0x3fa4b5(0x21f)](0x0));}}}},Game_Action[_0x47d9c7(0x2f9)]['applyStateTurnManipulationEffects']=function(_0x58fe7e){const _0x1c0011=_0x47d9c7,_0x513f98=this[_0x1c0011(0x4df)]()[_0x1c0011(0x4c8)],_0x2159a8=_0x513f98[_0x1c0011(0x1e0)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x2159a8)for(const _0x5321d1 of _0x2159a8){let _0x4a4e37=0x0,_0x18ab8c=0x0;if(_0x5321d1[_0x1c0011(0x1e0)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x1c0011(0x3fc)!==_0x1c0011(0x47a))_0x4a4e37=Number(RegExp['$1']),_0x18ab8c=Number(RegExp['$2']);else{const _0x3a6647=_0x462700[_0x1c0011(0x4c8)],_0x4cb324=_0x1f3b5a[_0x1c0011(0x31b)][_0x1c0011(0x366)];return _0x4cb324[_0x18117a['id']]?_0x4cb324[_0x2d2010['id']]['call'](this,_0x288967):!![];}}else _0x5321d1[_0x1c0011(0x1e0)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x4a4e37=DataManager[_0x1c0011(0x3dc)](RegExp['$1']),_0x18ab8c=Number(RegExp['$2']));_0x58fe7e[_0x1c0011(0x317)](_0x4a4e37,_0x18ab8c),this[_0x1c0011(0x419)](_0x58fe7e);}const _0x562888=_0x513f98[_0x1c0011(0x1e0)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x562888){if(_0x1c0011(0x399)!==_0x1c0011(0x399))this[_0x1c0011(0x1c0)](_0x4b5977['id']);else for(const _0x5ed587 of _0x562888){let _0x34b390=0x0,_0x48fffd=0x0;if(_0x5ed587[_0x1c0011(0x1e0)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if('fcIBx'!==_0x1c0011(0x494)){if(!_0x159f12['value'](_0x4de6cd))return![];}else _0x34b390=Number(RegExp['$1']),_0x48fffd=Number(RegExp['$2']);}else _0x5ed587[_0x1c0011(0x1e0)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x34b390=DataManager[_0x1c0011(0x3dc)](RegExp['$1']),_0x48fffd=Number(RegExp['$2']));_0x58fe7e['addStateTurns'](_0x34b390,_0x48fffd),this['makeSuccess'](_0x58fe7e);}}},Game_Action[_0x47d9c7(0x2f9)][_0x47d9c7(0x32c)]=function(_0x385902){const _0x3ce06a=_0x47d9c7,_0x218375=[_0x3ce06a(0x3a6),_0x3ce06a(0x4ca),'ATK',_0x3ce06a(0x1b2),'MAT',_0x3ce06a(0x1ca),_0x3ce06a(0x41c),_0x3ce06a(0x225)],_0x12b6b0=this[_0x3ce06a(0x4df)]()[_0x3ce06a(0x4c8)],_0x3f66d5=_0x12b6b0[_0x3ce06a(0x1e0)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x3f66d5){if(_0x3ce06a(0x1b6)===_0x3ce06a(0x270)){const _0x590c89=_0x27b9e8['parse']('['+_0x529fc6['$1']['match'](/\d+/g)+']');for(const _0x581fe9 of _0x590c89){if(_0x4e2fc3[_0x3ce06a(0x254)](_0x581fe9))return!![];}return![];}else for(const _0x49d156 of _0x3f66d5){if(_0x3ce06a(0x468)===_0x3ce06a(0x339)){if(!_0x3c02ab[_0x3ce06a(0x388)](_0x5daf16))return![];}else{_0x49d156[_0x3ce06a(0x1e0)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4ca4d1=_0x218375[_0x3ce06a(0x35f)](String(RegExp['$1'])['toUpperCase']()),_0x4d2f50=Number(RegExp['$2']);_0x4ca4d1>=0x0&&(_0x385902[_0x3ce06a(0x43e)](_0x4ca4d1,_0x4d2f50),this[_0x3ce06a(0x419)](_0x385902));}}}const _0x57589d=_0x12b6b0[_0x3ce06a(0x1e0)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x57589d){if(_0x3ce06a(0x237)!==_0x3ce06a(0x35d))for(const _0x6073c5 of _0x3f66d5){if(_0x3ce06a(0x367)!==_0x3ce06a(0x384)){_0x6073c5['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x282f4f=_0x218375[_0x3ce06a(0x35f)](String(RegExp['$1'])[_0x3ce06a(0x1b4)]()),_0x36892e=Number(RegExp['$2']);if(_0x282f4f>=0x0){if(_0x3ce06a(0x391)!==_0x3ce06a(0x391)){const _0x4a8b93=_0x354570['parse']('['+_0x46aa6e['$1'][_0x3ce06a(0x1e0)](/\d+/g)+']');for(const _0x16df69 of _0x4a8b93){if(_0x198ba0['value'](_0x16df69))return!![];}return![];}else _0x385902['addBuffTurns'](_0x282f4f,_0x36892e),this['makeSuccess'](_0x385902);}}else{if(_0x536f3d[_0x3ce06a(0x39e)]())_0x1e7ab3=this['convertGaugeTypeSkillsStatesCore'](_0xf1707e,_0x5896fc);this[_0x3ce06a(0x355)](_0x2de7bc,_0x57f974,_0x740156,_0x15594d);}}else{if(_0x4a4cf4[_0x3ce06a(0x44c)]===0x1)return this[_0x3ce06a(0x4e3)]();else{if(_0x4973cd['MatchLabelGaugeColor']===0x2)return this[_0x3ce06a(0x209)]();}}}},Game_Action[_0x47d9c7(0x2f9)]['applyDebuffTurnManipulationEffects']=function(_0x26cc9d){const _0x26460f=_0x47d9c7,_0x3536e2=[_0x26460f(0x3a6),_0x26460f(0x4ca),_0x26460f(0x385),_0x26460f(0x1b2),_0x26460f(0x340),_0x26460f(0x1ca),_0x26460f(0x41c),_0x26460f(0x225)],_0x4fc917=this[_0x26460f(0x4df)]()['note'],_0x4edccb=_0x4fc917['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4edccb)for(const _0x485809 of _0x4edccb){if(_0x26460f(0x2c5)!==_0x26460f(0x4d8)){_0x485809[_0x26460f(0x1e0)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0xbaa45e=_0x3536e2[_0x26460f(0x35f)](String(RegExp['$1'])[_0x26460f(0x1b4)]()),_0x1d01e5=Number(RegExp['$2']);_0xbaa45e>=0x0&&(_0x26cc9d['setDebuffTurns'](_0xbaa45e,_0x1d01e5),this[_0x26460f(0x419)](_0x26cc9d));}else{if(_0xb9c0dc['VisuMZ_1_ElementStatusCore'])this['addPassiveStatesTraitSets']();}}const _0x18ca0f=_0x4fc917['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x18ca0f)for(const _0x2f84de of _0x4edccb){if('FIvFi'===_0x26460f(0x455)){if(!this['checkSkillConditionsSwitchNotetags'](_0x42858d))return![];return!![];}else{_0x2f84de['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x12a795=_0x3536e2[_0x26460f(0x35f)](String(RegExp['$1'])[_0x26460f(0x1b4)]()),_0xe9ba18=Number(RegExp['$2']);_0x12a795>=0x0&&(_0x26cc9d['addDebuffTurns'](_0x12a795,_0xe9ba18),this[_0x26460f(0x419)](_0x26cc9d));}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x345)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x199)],Game_BattlerBase['prototype'][_0x47d9c7(0x199)]=function(){const _0x5d7d20=_0x47d9c7;this['_cache']={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x5d7d20(0x31b)][_0x5d7d20(0x345)][_0x5d7d20(0x439)](this);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4a5)]=function(){const _0x5a500c=_0x47d9c7;this[_0x5a500c(0x28a)]='',this[_0x5a500c(0x3cb)]={},this[_0x5a500c(0x1b0)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x403)]=function(_0x3e8f6b){const _0x549ff4=_0x47d9c7;return this[_0x549ff4(0x3d3)]=this[_0x549ff4(0x3d3)]||{},this[_0x549ff4(0x3d3)][_0x3e8f6b]!==undefined;},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x3c9)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1e9)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1e9)]=function(){const _0x14b5b2=_0x47d9c7;this[_0x14b5b2(0x3d3)]={},VisuMZ[_0x14b5b2(0x31b)][_0x14b5b2(0x3c9)][_0x14b5b2(0x439)](this);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x2dd)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1d8)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1d8)]=function(_0x5c757d){const _0x4b478c=_0x47d9c7;let _0x402787=this['isStateAffected'](_0x5c757d);VisuMZ[_0x4b478c(0x31b)][_0x4b478c(0x2dd)][_0x4b478c(0x439)](this,_0x5c757d);if(_0x402787&&!this['isStateAffected'](_0x5c757d))this[_0x4b478c(0x43f)](_0x5c757d);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x43f)]=function(_0x4ae19e){const _0x50186a=_0x47d9c7;this['clearStateData'](_0x4ae19e),this[_0x50186a(0x1a5)](_0x4ae19e),this['clearStateOrigin'](_0x4ae19e);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x423)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4b4)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4b4)]=function(_0x7499a1){const _0x2c8210=_0x47d9c7,_0x4bf8d8=$dataStates[_0x7499a1],_0x4efc25=this[_0x2c8210(0x1c5)](_0x7499a1),_0x22b309=this[_0x2c8210(0x470)](_0x4bf8d8)[_0x2c8210(0x3f1)]()[_0x2c8210(0x42e)]();switch(_0x22b309){case _0x2c8210(0x250):if(_0x4efc25<=0x0)this['prepareResetStateCounts'](_0x7499a1);break;case'reset':this[_0x2c8210(0x41f)](_0x7499a1);break;case _0x2c8210(0x1a3):this[_0x2c8210(0x41f)](_0x7499a1),this[_0x2c8210(0x2f3)][_0x7499a1]=Math[_0x2c8210(0x3ce)](this[_0x2c8210(0x2f3)][_0x7499a1],_0x4efc25);break;case'add':this[_0x2c8210(0x41f)](_0x7499a1),this[_0x2c8210(0x2f3)][_0x7499a1]+=_0x4efc25;break;default:this[_0x2c8210(0x41f)](_0x7499a1);break;}if(this[_0x2c8210(0x19f)](_0x7499a1)){if(_0x2c8210(0x28c)!==_0x2c8210(0x28c)){const _0x243c81=_0x172b16[_0x2c8210(0x3dc)](_0x2477ca['$1']);if(_0x25421e[_0x2c8210(0x19f)](_0x243c81))return!![];}else{const _0x55d86a=DataManager[_0x2c8210(0x3a5)](_0x7499a1);this[_0x2c8210(0x2f3)][_0x7499a1]=this[_0x2c8210(0x2f3)][_0x7499a1][_0x2c8210(0x27e)](0x0,_0x55d86a);}}},Game_BattlerBase['prototype'][_0x47d9c7(0x41f)]=function(_0xe75e37){const _0xb55a48=_0x47d9c7;VisuMZ[_0xb55a48(0x31b)][_0xb55a48(0x423)]['call'](this,_0xe75e37);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x470)]=function(_0xbae9d1){const _0x3eb70f=_0x47d9c7,_0x583305=_0xbae9d1[_0x3eb70f(0x4c8)];return _0x583305[_0x3eb70f(0x1e0)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x3eb70f(0x31b)]['Settings'][_0x3eb70f(0x217)][_0x3eb70f(0x37f)];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x2e6)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x29f)],Game_BattlerBase['prototype'][_0x47d9c7(0x29f)]=function(_0x2837de,_0x3d4ea7){const _0x2eaecc=_0x47d9c7,_0xce66f1=VisuMZ[_0x2eaecc(0x31b)][_0x2eaecc(0x28d)][_0x2eaecc(0x3b2)][_0x2eaecc(0x37f)],_0x59e707=this[_0x2eaecc(0x2c2)](_0x2837de);switch(_0xce66f1){case _0x2eaecc(0x250):if(_0x59e707<=0x0)this[_0x2eaecc(0x247)][_0x2837de]=_0x3d4ea7;break;case _0x2eaecc(0x348):this[_0x2eaecc(0x247)][_0x2837de]=_0x3d4ea7;break;case _0x2eaecc(0x1a3):this['_buffTurns'][_0x2837de]=Math[_0x2eaecc(0x3ce)](_0x59e707,_0x3d4ea7);break;case _0x2eaecc(0x22c):this[_0x2eaecc(0x247)][_0x2837de]+=_0x3d4ea7;break;default:VisuMZ[_0x2eaecc(0x31b)][_0x2eaecc(0x2e6)][_0x2eaecc(0x439)](this,_0x2837de,_0x3d4ea7);break;}const _0x597fba=VisuMZ[_0x2eaecc(0x31b)][_0x2eaecc(0x28d)][_0x2eaecc(0x3b2)][_0x2eaecc(0x487)];this['_buffTurns'][_0x2837de]=this[_0x2eaecc(0x247)][_0x2837de][_0x2eaecc(0x27e)](0x0,_0x597fba);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4b1)]=function(){const _0x64c74=_0x47d9c7;if(this[_0x64c74(0x3d3)][_0x64c74(0x4fb)]!==undefined)return this[_0x64c74(0x3d3)][_0x64c74(0x4fb)];this[_0x64c74(0x3d3)][_0x64c74(0x4fb)]=![];const _0x4620bc=this[_0x64c74(0x3e0)]();for(const _0x446325 of _0x4620bc){if(_0x64c74(0x3ca)!==_0x64c74(0x46e)){if(!_0x446325)continue;if(_0x446325['note'][_0x64c74(0x1e0)](/<GROUP DEFEAT>/i)){if(_0x64c74(0x2ec)!==_0x64c74(0x246)){this[_0x64c74(0x3d3)][_0x64c74(0x4fb)]=!![];break;}else{if(_0x2e4d97[_0x64c74(0x388)](_0xccfcd2))return!![];}}}else for(const _0x53662d of _0x71f4c6){_0x53662d[_0x64c74(0x1e0)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x17b609=_0x5317db(_0x4072ad['$1']);_0x5c8086[_0x64c74(0x330)](_0x17b609);}}return this[_0x64c74(0x3d3)][_0x64c74(0x4fb)];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x44d)]=Game_Unit['prototype'][_0x47d9c7(0x43d)],Game_Unit['prototype'][_0x47d9c7(0x43d)]=function(){const _0x2b012e=_0x47d9c7;let _0x109845=VisuMZ[_0x2b012e(0x31b)][_0x2b012e(0x44d)][_0x2b012e(0x439)](this);if(BattleManager[_0x2b012e(0x288)]){if(_0x2b012e(0x4a7)!=='FYElZ')_0x109845=_0x109845['concat'](this[_0x2b012e(0x4cd)]()[_0x2b012e(0x311)](_0x1e3cb5=>_0x1e3cb5['isGroupDefeatStateAffected']()));else return _0x2d84f5[_0x2b012e(0x31b)][_0x2b012e(0x28d)]['Skills'][_0x2b012e(0x1bb)];}return _0x109845;},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x2fb)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1bc)],Game_BattlerBase['prototype'][_0x47d9c7(0x1bc)]=function(){const _0x2fd607=_0x47d9c7;this['getStateRetainType']()!==''?_0x2fd607(0x485)!=='rtLfr'?this[_0x2fd607(0x4c7)]():(_0x2e1bbb=_0x3c2fe3[_0x2fd607(0x3dc)](_0x3c13e7['$1']),_0x4256d4=_0x2b9a51(_0x45db0c['$2'])):(VisuMZ['SkillsStatesCore'][_0x2fd607(0x2fb)]['call'](this),this[_0x2fd607(0x4a5)]());},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x1bc)]=function(){const _0x4cdc8a=_0x47d9c7;this[_0x4cdc8a(0x34b)]=this[_0x4cdc8a(0x34b)]||{},Game_Battler[_0x4cdc8a(0x2f9)][_0x4cdc8a(0x1bc)][_0x4cdc8a(0x439)](this);},Game_BattlerBase[_0x47d9c7(0x2f9)]['clearStatesWithStateRetain']=function(){const _0x257d6e=_0x47d9c7,_0x10a267=this[_0x257d6e(0x3e0)]();for(const _0x14bcf2 of _0x10a267){if('MbVZi'===_0x257d6e(0x1fd)){if(_0x14bcf2&&this[_0x257d6e(0x21c)](_0x14bcf2))this[_0x257d6e(0x1d8)](_0x14bcf2['id']);}else{const _0x5cc7e0=[];for(const _0x345571 of this[_0x257d6e(0x19e)]()[_0x257d6e(0x3c2)]){const _0x2a8dcb=_0x4ff45c[_0x345571[_0x257d6e(0x3a8)]];if(_0x2a8dcb&&!_0x5cc7e0['includes'](_0x2a8dcb))_0x5cc7e0[_0x257d6e(0x2f6)](_0x2a8dcb);}return _0x5cc7e0;}}this[_0x257d6e(0x3d3)]={};},Game_BattlerBase['prototype']['canClearState']=function(_0x424e3e){const _0x2492a=_0x47d9c7,_0x19cd5a=this[_0x2492a(0x2e3)]();if(_0x19cd5a!==''){if(_0x2492a(0x463)===_0x2492a(0x463)){const _0x4a286b=_0x424e3e[_0x2492a(0x4c8)];if(_0x19cd5a==='death'&&_0x4a286b[_0x2492a(0x1e0)](/<NO DEATH CLEAR>/i))return![];if(_0x19cd5a==='recover\x20all'&&_0x4a286b[_0x2492a(0x1e0)](/<NO RECOVER ALL CLEAR>/i))return![];}else _0x351cb9[_0x2492a(0x31b)][_0x2492a(0x230)]['call'](this),this['createTurnDisplaySprite']();}return this[_0x2492a(0x19f)](_0x424e3e['id']);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x2e3)]=function(){const _0x501bc4=_0x47d9c7;return this[_0x501bc4(0x28a)];},Game_BattlerBase[_0x47d9c7(0x2f9)]['setStateRetainType']=function(_0x306919){const _0xb27d42=_0x47d9c7;this[_0xb27d42(0x28a)]=_0x306919;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x2b2)]=function(){this['_stateRetainType']='';},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x3d9)]=Game_BattlerBase[_0x47d9c7(0x2f9)]['die'],Game_BattlerBase[_0x47d9c7(0x2f9)]['die']=function(){const _0x84a776=_0x47d9c7;this[_0x84a776(0x2ea)](_0x84a776(0x371)),VisuMZ[_0x84a776(0x31b)][_0x84a776(0x3d9)][_0x84a776(0x439)](this),this[_0x84a776(0x2b2)]();},VisuMZ[_0x47d9c7(0x31b)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x3bb)],Game_BattlerBase['prototype'][_0x47d9c7(0x3bb)]=function(){const _0x57eeaa=_0x47d9c7;this['setStateRetainType']('recover\x20all'),VisuMZ['SkillsStatesCore'][_0x57eeaa(0x4f7)][_0x57eeaa(0x439)](this),this[_0x57eeaa(0x2b2)]();},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x361)]=function(_0xc9924f,_0xbc109e,_0x3cdb97){return _0xbc109e;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4c0)]=function(_0x2a330c){const _0x2a7cf9=_0x47d9c7;for(settings of VisuMZ[_0x2a7cf9(0x31b)][_0x2a7cf9(0x28d)][_0x2a7cf9(0x496)]){let _0x23df31=settings['CalcJS'][_0x2a7cf9(0x439)](this,_0x2a330c);_0x23df31=this['adjustSkillCost'](_0x2a330c,_0x23df31,settings);if(!settings[_0x2a7cf9(0x277)][_0x2a7cf9(0x439)](this,_0x2a330c,_0x23df31))return![];}return!![];},Game_BattlerBase['prototype'][_0x47d9c7(0x1e6)]=function(_0x1095f4){const _0x22f453=_0x47d9c7;for(settings of VisuMZ[_0x22f453(0x31b)][_0x22f453(0x28d)][_0x22f453(0x496)]){let _0x1c68e6=settings['CalcJS'][_0x22f453(0x439)](this,_0x1095f4);_0x1c68e6=this['adjustSkillCost'](_0x1095f4,_0x1c68e6,settings),settings[_0x22f453(0x354)]['call'](this,_0x1095f4,_0x1c68e6);}},VisuMZ[_0x47d9c7(0x31b)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4aa)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4aa)]=function(_0x3d6e4e){const _0x27a9de=_0x47d9c7;if(!_0x3d6e4e)return![];if(!VisuMZ['SkillsStatesCore'][_0x27a9de(0x473)][_0x27a9de(0x439)](this,_0x3d6e4e))return![];if(!this[_0x27a9de(0x452)](_0x3d6e4e))return![];if(!this['meetsSkillConditionsEnableJS'](_0x3d6e4e))return![];if(!this[_0x27a9de(0x456)](_0x3d6e4e))return![];return!![];},Game_BattlerBase['prototype'][_0x47d9c7(0x452)]=function(_0x19183a){if(!this['checkSkillConditionsSwitchNotetags'](_0x19183a))return![];return!![];},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x3e1)]=function(_0x1c0b28){const _0x222038=_0x47d9c7,_0x4cfb04=_0x1c0b28[_0x222038(0x4c8)];if(_0x4cfb04[_0x222038(0x1e0)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x222038(0x2b8)!=='XfLdr'){this['_stateOrigin']=this[_0x222038(0x335)]||{};const _0x1408b=_0x1cd2d2?this[_0x222038(0x420)](_0x840a1d):this[_0x222038(0x4a0)]();this[_0x222038(0x335)][_0x12aaac]=_0x1408b;}else{const _0x35f238=JSON[_0x222038(0x1f7)]('['+RegExp['$1'][_0x222038(0x1e0)](/\d+/g)+']');for(const _0x179cae of _0x35f238){if(!$gameSwitches['value'](_0x179cae))return![];}return!![];}}if(_0x4cfb04[_0x222038(0x1e0)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ec5a3=JSON[_0x222038(0x1f7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x666d8c of _0x4ec5a3){if(!$gameSwitches[_0x222038(0x359)](_0x666d8c))return![];}return!![];}if(_0x4cfb04[_0x222038(0x1e0)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x222038(0x3d0)===_0x222038(0x3a7))_0x42aaba['autoRemovalTiming']=0x2;else{const _0x1ba9df=JSON[_0x222038(0x1f7)]('['+RegExp['$1'][_0x222038(0x1e0)](/\d+/g)+']');for(const _0x5203b6 of _0x1ba9df){if(_0x222038(0x2c1)===_0x222038(0x2c1)){if($gameSwitches[_0x222038(0x359)](_0x5203b6))return!![];}else{const _0xb420e2=this[_0x222038(0x3e0)]();for(const _0x2d50aa of _0xb420e2){if(_0x2d50aa&&this[_0x222038(0x21c)](_0x2d50aa))this[_0x222038(0x1d8)](_0x2d50aa['id']);}this[_0x222038(0x3d3)]={};}}return![];}}if(_0x4cfb04[_0x222038(0x1e0)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd12b08=JSON['parse']('['+RegExp['$1'][_0x222038(0x1e0)](/\d+/g)+']');for(const _0x26267d of _0xd12b08){if('JxWgI'===_0x222038(0x36b))return this[_0x222038(0x28a)];else{if(!$gameSwitches[_0x222038(0x359)](_0x26267d))return!![];}}return![];}if(_0x4cfb04[_0x222038(0x1e0)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x222038(0x441)!==_0x222038(0x441)){if(_0x497e99[_0x222038(0x3aa)]())_0x420ff7[_0x222038(0x350)](_0x4854e9);}else{const _0x3a1533=JSON[_0x222038(0x1f7)]('['+RegExp['$1'][_0x222038(0x1e0)](/\d+/g)+']');for(const _0x2366d8 of _0x3a1533){if(_0x222038(0x4d0)!==_0x222038(0x4d0))return _0x4a5a0e[_0x222038(0x31b)][_0x222038(0x28d)][_0x222038(0x43a)][_0x222038(0x483)];else{if(!$gameSwitches['value'](_0x2366d8))return!![];}}return![];}}if(_0x4cfb04['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x222038(0x309)!==_0x222038(0x309)){if(this['_tempActor']||this[_0x222038(0x4ba)])return;const _0x15563b=_0x522eec[_0x222038(0x31b)][_0x222038(0x271)];if(_0x15563b[_0x2dbb7])_0x15563b[_0x12eb7b]['call'](this,_0x2de3ab);}else{const _0x6d562a=JSON[_0x222038(0x1f7)]('['+RegExp['$1'][_0x222038(0x1e0)](/\d+/g)+']');for(const _0x316e8a of _0x6d562a){if(_0x222038(0x3b0)==='MooLy')_0x595583+=this[_0x222038(0x2c2)](_0x49ebab),this[_0x222038(0x25d)](_0x2aae5b,_0x2cffad);else{if($gameSwitches[_0x222038(0x359)](_0x316e8a))return![];}}return!![];}}return!![];},Game_BattlerBase['prototype']['meetsSkillConditionsEnableJS']=function(_0x12ec4c){const _0x21c832=_0x47d9c7,_0x28f925=_0x12ec4c['note'],_0x132f9d=VisuMZ[_0x21c832(0x31b)][_0x21c832(0x366)];return _0x132f9d[_0x12ec4c['id']]?_0x132f9d[_0x12ec4c['id']][_0x21c832(0x439)](this,_0x12ec4c):_0x21c832(0x1cd)==='VIOez'?!![]:_0x2dcd04-_0x2c33a0;},Game_BattlerBase['prototype'][_0x47d9c7(0x456)]=function(_0x1c281e){const _0x2f3b88=_0x47d9c7;return VisuMZ[_0x2f3b88(0x31b)][_0x2f3b88(0x28d)]['Skills'][_0x2f3b88(0x20e)][_0x2f3b88(0x439)](this,_0x1c281e);},VisuMZ[_0x47d9c7(0x31b)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x47d9c7(0x2f9)]['skillMpCost'],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1d5)]=function(_0x1a6fc8){const _0x8cb98=_0x47d9c7;for(settings of VisuMZ[_0x8cb98(0x31b)][_0x8cb98(0x28d)]['Costs']){if(settings[_0x8cb98(0x316)][_0x8cb98(0x1b4)]()==='MP'){if('UZVpX'===_0x8cb98(0x3f2))return _0x2d2096[_0x8cb98(0x4d3)];else{let _0x2e6d55=settings['CalcJS'][_0x8cb98(0x439)](this,_0x1a6fc8);return _0x2e6d55=this[_0x8cb98(0x361)](_0x1a6fc8,_0x2e6d55,settings),_0x2e6d55;}}}return VisuMZ[_0x8cb98(0x31b)][_0x8cb98(0x1c6)][_0x8cb98(0x439)](this,_0x1a6fc8);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x2b9)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1df)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1df)]=function(_0x52422f){const _0x1e180a=_0x47d9c7;for(settings of VisuMZ[_0x1e180a(0x31b)][_0x1e180a(0x28d)]['Costs']){if(settings['Name'][_0x1e180a(0x1b4)]()==='TP'){if(_0x1e180a(0x3f6)===_0x1e180a(0x3f6)){let _0x25e98f=settings[_0x1e180a(0x35a)][_0x1e180a(0x439)](this,_0x52422f);return _0x25e98f=this[_0x1e180a(0x361)](_0x52422f,_0x25e98f,settings),_0x25e98f;}else return new _0xdcdc62(_0x1901b8(_0x5b16f2['$1']),-0x1f4,-0x1f4);}}return VisuMZ[_0x1e180a(0x31b)][_0x1e180a(0x2b9)][_0x1e180a(0x439)](this,_0x52422f);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x39f)]=function(_0x59f2a9){const _0x28c7cf=_0x47d9c7;if(typeof _0x59f2a9===_0x28c7cf(0x1c7))_0x59f2a9=$dataStates[_0x59f2a9];return this['states']()[_0x28c7cf(0x3e9)](_0x59f2a9);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x49b)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x3e0)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x3e0)]=function(){const _0x5a1c4c=_0x47d9c7;let _0x5d7601=VisuMZ[_0x5a1c4c(0x31b)][_0x5a1c4c(0x49b)][_0x5a1c4c(0x439)](this);if($gameTemp[_0x5a1c4c(0x292)])return _0x5d7601;return $gameTemp[_0x5a1c4c(0x292)]=!![],this[_0x5a1c4c(0x2e8)](_0x5d7601),$gameTemp['_checkingPassiveStates']=undefined,_0x5d7601;},Game_BattlerBase['prototype'][_0x47d9c7(0x2e8)]=function(_0x1fa924){const _0x51fe4f=_0x47d9c7,_0x12f295=this['passiveStates']();for(state of _0x12f295){if(!state)continue;if(!this[_0x51fe4f(0x2b0)](state)&&_0x1fa924[_0x51fe4f(0x3e9)](state))continue;_0x1fa924[_0x51fe4f(0x2f6)](state);}if(_0x12f295[_0x51fe4f(0x1f8)]>0x0){if(_0x51fe4f(0x2ff)!==_0x51fe4f(0x2ff))return _0x2c8c7f[_0x51fe4f(0x31b)][_0x51fe4f(0x28d)][_0x51fe4f(0x43a)][_0x51fe4f(0x369)][_0x51fe4f(0x439)](this);else _0x1fa924['sort']((_0x5f4012,_0x138962)=>{const _0xc6b9e8=_0x51fe4f;if(_0xc6b9e8(0x2b7)!=='uccAB'){if(!_0x2b3471[_0xc6b9e8(0x359)](_0x213ffd))return!![];}else{const _0x5e85f2=_0x5f4012[_0xc6b9e8(0x2e9)],_0x171aff=_0x138962[_0xc6b9e8(0x2e9)];if(_0x5e85f2!==_0x171aff){if(_0xc6b9e8(0x233)==='tvHMQ')return _0x171aff-_0x5e85f2;else{if(_0x34c8b7[_0xc6b9e8(0x254)](_0x4a8c4d))return![];}}return _0x5f4012-_0x138962;}});}},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x2b0)]=function(_0x542159){const _0x4586d1=_0x47d9c7;return _0x542159[_0x4586d1(0x4c8)][_0x4586d1(0x1e0)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4e9)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4dc)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4dc)]=function(_0x452951){const _0x5b64c6=_0x47d9c7;this[_0x5b64c6(0x36d)]=!![];let _0x57b00b=VisuMZ[_0x5b64c6(0x31b)][_0x5b64c6(0x4e9)][_0x5b64c6(0x439)](this,_0x452951);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x57b00b;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4f4)]=function(){const _0x3a056d=_0x47d9c7;let _0x57457e=[];this['_passiveStateResults']=this[_0x3a056d(0x198)]||{};for(;;){if(_0x3a056d(0x231)===_0x3a056d(0x4b5)){const _0xb7c3e0=_0x3d657e[_0x3a056d(0x31b)][_0x3a056d(0x28d)][_0x3a056d(0x3b2)]['MaxTurns'];this['_buffTurns'][_0x51520d]=_0x47206a[_0x3a056d(0x27e)](0x0,_0xb7c3e0);}else{_0x57457e=[];let _0x184c05=!![];for(const _0x2c73d7 of this[_0x3a056d(0x3d3)][_0x3a056d(0x443)]){const _0x6893fb=$dataStates[_0x2c73d7];if(!_0x6893fb)continue;let _0x6104c9=this[_0x3a056d(0x229)](_0x6893fb);this['_passiveStateResults'][_0x2c73d7]!==_0x6104c9&&(_0x184c05=![],this[_0x3a056d(0x198)][_0x2c73d7]=_0x6104c9);if(!_0x6104c9)continue;_0x57457e[_0x3a056d(0x2f6)](_0x6893fb);}if(_0x184c05)break;else{if(_0x3a056d(0x1c1)!==_0x3a056d(0x1c1)){if(this['isBuffExpired'](_0x2fa0b2)){const _0x1df385=this[_0x3a056d(0x200)][_0x433c12];this['removeBuff'](_0x110e31);if(_0x1df385>0x0)this[_0x3a056d(0x1f6)](_0x5611a4);if(_0x1df385<0x0)this[_0x3a056d(0x1b1)](_0xe22c7c);}}else{if(!this[_0x3a056d(0x36d)])this[_0x3a056d(0x1e9)]();this[_0x3a056d(0x273)]();}}}}return _0x57457e;},Game_BattlerBase[_0x47d9c7(0x2f9)]['meetsPassiveStateConditions']=function(_0x5eae66){const _0x5458f5=_0x47d9c7;if(!this['meetsPassiveStateConditionClasses'](_0x5eae66))return![];if(!this[_0x5458f5(0x4b3)](_0x5eae66))return![];if(!this['meetsPassiveStateConditionJS'](_0x5eae66))return![];if(!this[_0x5458f5(0x398)](_0x5eae66))return![];return!![];},Game_BattlerBase[_0x47d9c7(0x2f9)]['meetsPassiveStateConditionClasses']=function(_0x21bb50){return!![];},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x35c)]=function(_0x5b9e5d){const _0x78be7b=_0x47d9c7,_0x36fd39=_0x5b9e5d[_0x78be7b(0x4c8)];if(_0x36fd39[_0x78be7b(0x1e0)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x490e5d=String(RegExp['$1'])[_0x78be7b(0x4f3)](',')[_0x78be7b(0x489)](_0x1aa967=>_0x1aa967[_0x78be7b(0x42e)]()),_0x17ae0b=VisuMZ['SkillsStatesCore'][_0x78be7b(0x46c)](_0x490e5d);return _0x17ae0b[_0x78be7b(0x3e9)](this['currentClass']());}if(_0x36fd39[_0x78be7b(0x1e0)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x441ed6=String(RegExp['$1'])['split'](',')[_0x78be7b(0x489)](_0x2f2398=>_0x2f2398[_0x78be7b(0x42e)]()),_0x42e872=VisuMZ['SkillsStatesCore'][_0x78be7b(0x46c)](_0x441ed6);let _0xf7debd=[this['currentClass']()];return Imported[_0x78be7b(0x285)]&&this[_0x78be7b(0x4b6)]&&(_0xf7debd=this[_0x78be7b(0x4b6)]()),_0x42e872['filter'](_0x5c81cd=>_0xf7debd[_0x78be7b(0x3e9)](_0x5c81cd))[_0x78be7b(0x1f8)]>0x0;}return Game_BattlerBase['prototype'][_0x78be7b(0x35c)][_0x78be7b(0x439)](this,_0x5b9e5d);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x46c)]=function(_0x39b826){const _0x300e26=_0x47d9c7,_0x117497=[];for(let _0x2caa65 of _0x39b826){_0x2caa65=(String(_0x2caa65)||'')[_0x300e26(0x42e)]();const _0x3be203=/^\d+$/[_0x300e26(0x4bd)](_0x2caa65);if(_0x3be203){if('gXYyz'===_0x300e26(0x29d)){if(typeof _0x444e1f!==_0x300e26(0x1c7))_0x461045=_0x1337e3['id'];this[_0x300e26(0x19f)](_0x133fe3)&&(_0x53db71+=this[_0x300e26(0x1c5)](_0x2bc807),this[_0x300e26(0x317)](_0x4c4999,_0x16ae79));}else _0x117497[_0x300e26(0x2f6)](Number(_0x2caa65));}else _0x117497['push'](DataManager[_0x300e26(0x2d0)](_0x2caa65));}return _0x117497[_0x300e26(0x489)](_0x3fb71e=>$dataClasses[Number(_0x3fb71e)])['remove'](null);},Game_BattlerBase[_0x47d9c7(0x2f9)]['meetsPassiveStateConditionSwitches']=function(_0x1cf5e7){const _0x186ce9=_0x47d9c7,_0x9e58e3=_0x1cf5e7[_0x186ce9(0x4c8)];if(_0x9e58e3['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d8ff2=JSON[_0x186ce9(0x1f7)]('['+RegExp['$1'][_0x186ce9(0x1e0)](/\d+/g)+']');for(const _0x27a32d of _0x4d8ff2){if(!$gameSwitches[_0x186ce9(0x359)](_0x27a32d))return![];}return!![];}if(_0x9e58e3[_0x186ce9(0x1e0)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25b12b=JSON[_0x186ce9(0x1f7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x21e53a of _0x25b12b){if(!$gameSwitches['value'](_0x21e53a))return![];}return!![];}if(_0x9e58e3[_0x186ce9(0x1e0)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('IywaD'===_0x186ce9(0x293)){const _0x4d7ad5=JSON['parse']('['+RegExp['$1'][_0x186ce9(0x1e0)](/\d+/g)+']');for(const _0x437a7b of _0x4d7ad5){if(_0x186ce9(0x4eb)==='MbDFi')_0x21dd64[_0x186ce9(0x31b)][_0x186ce9(0x33c)][_0x186ce9(0x439)](this),this[_0x186ce9(0x2cb)]();else{if($gameSwitches[_0x186ce9(0x359)](_0x437a7b))return!![];}}return![];}else{const _0x3d7625=this[_0x186ce9(0x480)](_0x2359ce);_0x4c6cf7[_0x186ce9(0x31b)][_0x186ce9(0x1dd)][_0x186ce9(0x439)](this,_0x47fc0b);if(_0x3d7625&&this['hasState'](_0x443c3e[_0x55ab1b])){this[_0x186ce9(0x312)](_0x55eee2);;}}}if(_0x9e58e3['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x74ddbb=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x38e0d2 of _0x74ddbb){if(!$gameSwitches['value'](_0x38e0d2))return!![];}return![];}if(_0x9e58e3[_0x186ce9(0x1e0)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x353293=JSON[_0x186ce9(0x1f7)]('['+RegExp['$1'][_0x186ce9(0x1e0)](/\d+/g)+']');for(const _0x39520f of _0x353293){if(!$gameSwitches[_0x186ce9(0x359)](_0x39520f))return!![];}return![];}if(_0x9e58e3[_0x186ce9(0x1e0)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x461e1b=JSON[_0x186ce9(0x1f7)]('['+RegExp['$1'][_0x186ce9(0x1e0)](/\d+/g)+']');for(const _0x3d60f7 of _0x461e1b){if($gameSwitches[_0x186ce9(0x359)](_0x3d60f7))return![];}return!![];}return!![];},Game_BattlerBase[_0x47d9c7(0x2f9)]['meetsPassiveStateConditionJS']=function(_0x5dbd96){const _0x49b233=_0x47d9c7,_0x2b37cd=VisuMZ[_0x49b233(0x31b)][_0x49b233(0x4f5)];if(_0x2b37cd[_0x5dbd96['id']]&&!_0x2b37cd[_0x5dbd96['id']][_0x49b233(0x439)](this,_0x5dbd96))return![];return!![];},Game_BattlerBase[_0x47d9c7(0x2f9)]['meetsPassiveStateGlobalConditionJS']=function(_0x1d13f2){const _0x2352de=_0x47d9c7;return VisuMZ['SkillsStatesCore']['Settings']['PassiveStates'][_0x2352de(0x4ea)]['call'](this,_0x1d13f2);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x443)]=function(){const _0x490a5f=_0x47d9c7;if(this['checkCacheKey']('passiveStates'))return this['convertPassiveStates']();if(this[_0x490a5f(0x4b9)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x490a5f(0x273)](),this[_0x490a5f(0x4b9)]=undefined,this['convertPassiveStates']();},Game_BattlerBase['prototype']['createPassiveStatesCache']=function(){const _0x4ae29d=_0x47d9c7;this[_0x4ae29d(0x4b9)]=!![],this[_0x4ae29d(0x3d3)][_0x4ae29d(0x443)]=[],this[_0x4ae29d(0x472)](),this[_0x4ae29d(0x364)](),this[_0x4ae29d(0x284)](),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x472)]=function(){const _0x3f6a79=_0x47d9c7;if(Imported[_0x3f6a79(0x215)])this[_0x3f6a79(0x363)]();},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x264)]=function(){return[];},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x364)]=function(){const _0x17d823=_0x47d9c7,_0x1758a3=this['passiveStateObjects']();for(const _0x43e7d6 of _0x1758a3){if('uzBTn'===_0x17d823(0x493)){if(!_0x1a7d3e[_0x17d823(0x254)](_0x3db4cd))return![];}else{if(!_0x43e7d6)continue;const _0x4b47b5=_0x43e7d6['note'][_0x17d823(0x1e0)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x4b47b5)for(const _0x43f3e of _0x4b47b5){_0x43f3e['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4e5b=RegExp['$1'];if(_0x4e5b[_0x17d823(0x1e0)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x17d823(0x2e5)===_0x17d823(0x2e5)){const _0xeae5cb=JSON['parse']('['+RegExp['$1'][_0x17d823(0x1e0)](/\d+/g)+']');this['_cache'][_0x17d823(0x443)]=this[_0x17d823(0x3d3)][_0x17d823(0x443)][_0x17d823(0x49a)](_0xeae5cb);}else{const _0x3d1b51=this['createAllSkillCostText'](_0x306ee0,_0x3cb4ec),_0x3e8a4e=this['textSizeEx'](_0x3d1b51,_0x430bc2,_0x3bdeba,_0x368afb),_0x36e429=_0x60156b+_0x3efa0a-_0x3e8a4e[_0x17d823(0x281)];this[_0x17d823(0x34a)](_0x3d1b51,_0x36e429,_0x490469,_0x2ba06a),this['resetFontSettings']();}}else{const _0x3f035d=_0x4e5b[_0x17d823(0x4f3)](',');for(const _0x436034 of _0x3f035d){if(_0x17d823(0x24a)!==_0x17d823(0x2a1)){const _0x1cc2dc=DataManager[_0x17d823(0x3dc)](_0x436034);if(_0x1cc2dc)this[_0x17d823(0x3d3)]['passiveStates']['push'](_0x1cc2dc);}else{const _0x54947c=_0x467816(_0x57d81['$1']),_0xd1f086=_0xb15c74[_0x17d823(0x387)](_0x54947c,_0x17d823(0x280),-0x1,_0x17d823(0x266));_0x2af8c7[_0x17d823(0x31b)][_0x17d823(0x240)][_0x4b9cfa['id']]=new _0x2b4ad4('stateId',_0xd1f086);}}}}}}},Game_BattlerBase['prototype']['addPassiveStatesByPluginParameters']=function(){const _0xc63f9c=_0x47d9c7,_0x56471e=VisuMZ['SkillsStatesCore'][_0xc63f9c(0x28d)][_0xc63f9c(0x2c9)][_0xc63f9c(0x2e0)];this[_0xc63f9c(0x3d3)]['passiveStates']=this['_cache'][_0xc63f9c(0x443)][_0xc63f9c(0x49a)](_0x56471e);},Game_BattlerBase['prototype'][_0x47d9c7(0x1c5)]=function(_0xf409df){const _0x15fe9c=_0x47d9c7;if(typeof _0xf409df!=='number')_0xf409df=_0xf409df['id'];return this[_0x15fe9c(0x2f3)][_0xf409df]||0x0;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x317)]=function(_0x5cc2a1,_0x23ce83){const _0x948cfb=_0x47d9c7;if(typeof _0x5cc2a1!==_0x948cfb(0x1c7))_0x5cc2a1=_0x5cc2a1['id'];if(this[_0x948cfb(0x19f)](_0x5cc2a1)){if(_0x948cfb(0x3bd)!==_0x948cfb(0x3bd)){if(typeof _0x3261f6!==_0x948cfb(0x1c7))_0x1d0a2d=_0x1e9767['id'];if(this['isStateAffected'](_0xe2f71b)){const _0x3d3185=_0x2333d9[_0x948cfb(0x3a5)](_0x423073);this[_0x948cfb(0x2f3)][_0x24d540]=_0x11a75a['clamp'](0x0,_0x3d3185);if(this[_0x948cfb(0x2f3)][_0x504c0e]<=0x0)this['removeState'](_0x232166);}}else{const _0x403974=DataManager[_0x948cfb(0x3a5)](_0x5cc2a1);this[_0x948cfb(0x2f3)][_0x5cc2a1]=_0x23ce83['clamp'](0x0,_0x403974);if(this[_0x948cfb(0x2f3)][_0x5cc2a1]<=0x0)this[_0x948cfb(0x1ff)](_0x5cc2a1);}}},Game_BattlerBase['prototype'][_0x47d9c7(0x26c)]=function(_0x5e79ba,_0x540248){const _0x3172ee=_0x47d9c7;if(typeof _0x5e79ba!==_0x3172ee(0x1c7))_0x5e79ba=_0x5e79ba['id'];this[_0x3172ee(0x19f)](_0x5e79ba)&&(_0x540248+=this[_0x3172ee(0x1c5)](_0x5e79ba),this[_0x3172ee(0x317)](_0x5e79ba,_0x540248));},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x346)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x447)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x447)]=function(_0x108984){const _0x32bcd0=_0x47d9c7,_0x8f7796=this['_buffs'][_0x108984];VisuMZ['SkillsStatesCore'][_0x32bcd0(0x346)][_0x32bcd0(0x439)](this,_0x108984);if(_0x8f7796>0x0)this[_0x32bcd0(0x48d)](_0x108984);if(_0x8f7796<0x0)this[_0x32bcd0(0x23e)](_0x108984);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x324)]=Game_BattlerBase['prototype'][_0x47d9c7(0x24f)],Game_BattlerBase[_0x47d9c7(0x2f9)]['increaseBuff']=function(_0x598675){const _0x1a95d3=_0x47d9c7;VisuMZ[_0x1a95d3(0x31b)][_0x1a95d3(0x324)][_0x1a95d3(0x439)](this,_0x598675);if(!this['isBuffOrDebuffAffected'](_0x598675))this[_0x1a95d3(0x447)](_0x598675);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x19d)]=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x3f4)]=function(_0x3915ef){const _0x28a379=_0x47d9c7;VisuMZ[_0x28a379(0x31b)]['Game_BattlerBase_decreaseBuff'][_0x28a379(0x439)](this,_0x3915ef);if(!this[_0x28a379(0x3f9)](_0x3915ef))this[_0x28a379(0x447)](_0x3915ef);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x48d)]=function(_0x1f2ac1){},Game_BattlerBase['prototype'][_0x47d9c7(0x23e)]=function(_0x59446b){},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x47f)]=function(_0xc437b9){const _0x5cfa4a=_0x47d9c7;return this['_buffs'][_0xc437b9]===VisuMZ[_0x5cfa4a(0x31b)][_0x5cfa4a(0x28d)]['Buffs'][_0x5cfa4a(0x4f1)];},Game_BattlerBase['prototype'][_0x47d9c7(0x25e)]=function(_0x28edf2){const _0x586966=_0x47d9c7;return this[_0x586966(0x200)][_0x28edf2]===-VisuMZ['SkillsStatesCore'][_0x586966(0x28d)]['Buffs']['StackDebuffMax'];},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x454)]=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x460)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x460)]=function(_0x3d9904,_0x1b3b76){const _0x4d9c27=_0x47d9c7;return _0x3d9904=_0x3d9904[_0x4d9c27(0x27e)](-0x2,0x2),VisuMZ[_0x4d9c27(0x31b)][_0x4d9c27(0x454)][_0x4d9c27(0x439)](this,_0x3d9904,_0x1b3b76);},Game_BattlerBase['prototype'][_0x47d9c7(0x40a)]=function(_0x1d0cd4){const _0x3d6b9c=_0x47d9c7,_0x5a4991=this[_0x3d6b9c(0x200)][_0x1d0cd4];return VisuMZ[_0x3d6b9c(0x31b)]['Settings']['Buffs'][_0x3d6b9c(0x1aa)]['call'](this,_0x1d0cd4,_0x5a4991);},Game_BattlerBase['prototype']['buffTurns']=function(_0x415f0a){return this['_buffTurns'][_0x415f0a]||0x0;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x290)]=function(_0x1492d6){const _0x9e58e9=_0x47d9c7;return this[_0x9e58e9(0x2c2)](_0x1492d6);},Game_BattlerBase[_0x47d9c7(0x2f9)]['setBuffTurns']=function(_0xee7a06,_0x3742c3){const _0x5770eb=_0x47d9c7;if(this[_0x5770eb(0x258)](_0xee7a06)){if(_0x5770eb(0x4a8)!==_0x5770eb(0x4a8)){const _0x3f920d=_0x587d06[_0x5770eb(0x4c8)];return _0x3f920d[_0x5770eb(0x1e0)](/<REAPPLY RULES:[ ](.*)>/i)?_0x329a79(_0x17b870['$1']):_0x4863b3[_0x5770eb(0x31b)][_0x5770eb(0x28d)]['States'][_0x5770eb(0x37f)];}else{const _0x26ec48=VisuMZ[_0x5770eb(0x31b)][_0x5770eb(0x28d)][_0x5770eb(0x3b2)]['MaxTurns'];this['_buffTurns'][_0xee7a06]=_0x3742c3[_0x5770eb(0x27e)](0x0,_0x26ec48);}}},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x47d)]=function(_0x56c43e,_0x4ae9c6){const _0x2b1c14=_0x47d9c7;this['isBuffAffected'](_0x56c43e)&&(_0x4ae9c6+=this[_0x2b1c14(0x2c2)](stateId),this[_0x2b1c14(0x43e)](_0x56c43e,_0x4ae9c6));},Game_BattlerBase[_0x47d9c7(0x2f9)]['setDebuffTurns']=function(_0x49874a,_0x281a1b){const _0xb25b19=_0x47d9c7;if(this[_0xb25b19(0x1ad)](_0x49874a)){if(_0xb25b19(0x2b1)===_0xb25b19(0x210)){if(!this[_0xb25b19(0x1b9)](_0x4bd0ca))return![];if(!_0x201bff)return![];if(!this[_0xb25b19(0x469)](_0x1fddb2))return![];if(this[_0xb25b19(0x338)](_0x3f6cc6))return![];return!![];}else{const _0xf8a289=VisuMZ['SkillsStatesCore']['Settings'][_0xb25b19(0x3b2)][_0xb25b19(0x487)];this[_0xb25b19(0x247)][_0x49874a]=_0x281a1b[_0xb25b19(0x27e)](0x0,_0xf8a289);}}},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x35b)]=function(_0x14131d,_0x4f45b4){const _0x1c66fe=_0x47d9c7;if(this['isDebuffAffected'](_0x14131d)){if(_0x1c66fe(0x4ae)==='EBKXa')return _0x10bf55[_0x1c66fe(0x1a9)]()-0x6;else _0x4f45b4+=this[_0x1c66fe(0x2c2)](stateId),this[_0x1c66fe(0x25d)](_0x14131d,_0x4f45b4);}},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x29c)]=function(_0x313f41){const _0x4def46=_0x47d9c7;if(typeof _0x313f41!==_0x4def46(0x1c7))_0x313f41=_0x313f41['id'];return this[_0x4def46(0x3cb)]=this['_stateData']||{},this['_stateData'][_0x313f41]=this['_stateData'][_0x313f41]||{},this[_0x4def46(0x3cb)][_0x313f41];},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x245)]=function(_0x41f5e8,_0x4393c0){if(typeof _0x41f5e8!=='number')_0x41f5e8=_0x41f5e8['id'];const _0x488e4c=this['stateData'](_0x41f5e8);return _0x488e4c[_0x4393c0];},Game_BattlerBase['prototype']['setStateData']=function(_0x1795d6,_0x258210,_0xf90ecb){const _0x4a6dec=_0x47d9c7;if(typeof _0x1795d6!==_0x4a6dec(0x1c7))_0x1795d6=_0x1795d6['id'];const _0x375f3a=this[_0x4a6dec(0x29c)](_0x1795d6);_0x375f3a[_0x258210]=_0xf90ecb;},Game_BattlerBase['prototype'][_0x47d9c7(0x425)]=function(_0x3732f0){const _0x1150b5=_0x47d9c7;if(typeof _0x3732f0!==_0x1150b5(0x1c7))_0x3732f0=_0x3732f0['id'];this[_0x1150b5(0x3cb)]=this[_0x1150b5(0x3cb)]||{},this[_0x1150b5(0x3cb)][_0x3732f0]={};},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x40c)]=function(_0x47149a){const _0x118c94=_0x47d9c7;if(typeof _0x47149a!==_0x118c94(0x1c7))_0x47149a=_0x47149a['id'];this[_0x118c94(0x1b0)]=this[_0x118c94(0x1b0)]||{};if(this['_stateDisplay'][_0x47149a]===undefined){if(_0x118c94(0x1d3)!==_0x118c94(0x1fa))this['_stateDisplay'][_0x47149a]='';else{if(!_0x11b8d0[_0x118c94(0x4b1)]())return![];}}return this[_0x118c94(0x1b0)][_0x47149a];},Game_BattlerBase[_0x47d9c7(0x2f9)]['setStateDisplay']=function(_0x3ab071,_0x199156){const _0x23ba0c=_0x47d9c7;if(typeof _0x3ab071!==_0x23ba0c(0x1c7))_0x3ab071=_0x3ab071['id'];this[_0x23ba0c(0x1b0)]=this[_0x23ba0c(0x1b0)]||{},this[_0x23ba0c(0x1b0)][_0x3ab071]=_0x199156;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1a5)]=function(_0x3abce8){const _0x115e22=_0x47d9c7;if(typeof _0x3abce8!==_0x115e22(0x1c7))_0x3abce8=_0x3abce8['id'];this[_0x115e22(0x1b0)]=this[_0x115e22(0x1b0)]||{},this[_0x115e22(0x1b0)][_0x3abce8]='';},Game_BattlerBase['prototype'][_0x47d9c7(0x1f4)]=function(_0x18f205){const _0x5daf3f=_0x47d9c7;if(typeof _0x18f205!=='number')_0x18f205=_0x18f205['id'];this[_0x5daf3f(0x335)]=this[_0x5daf3f(0x335)]||{},this[_0x5daf3f(0x335)][_0x18f205]=this[_0x5daf3f(0x335)][_0x18f205]||_0x5daf3f(0x4f8);const _0x57217a=this[_0x5daf3f(0x335)][_0x18f205];return this[_0x5daf3f(0x4be)](_0x57217a);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x484)]=function(_0x1d7c28,_0x56cc1f){const _0x20a1b8=_0x47d9c7;this[_0x20a1b8(0x335)]=this[_0x20a1b8(0x335)]||{};const _0x493a0a=_0x56cc1f?this[_0x20a1b8(0x420)](_0x56cc1f):this['getCurrentStateOriginKey']();this[_0x20a1b8(0x335)][_0x1d7c28]=_0x493a0a;},Game_BattlerBase[_0x47d9c7(0x2f9)]['clearStateOrigin']=function(_0x2e186d){const _0x27b002=_0x47d9c7;this[_0x27b002(0x335)]=this[_0x27b002(0x335)]||{},delete this[_0x27b002(0x335)][_0x2e186d];},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4a0)]=function(){const _0xc2aa4b=_0x47d9c7,_0x5dd1bb=this[_0xc2aa4b(0x27c)]();return this[_0xc2aa4b(0x420)](_0x5dd1bb);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x27c)]=function(){const _0x480b88=_0x47d9c7;if($gameParty[_0x480b88(0x3ff)]()){if(_0x480b88(0x38a)!==_0x480b88(0x38a))for(const _0x5be54d of _0x1a341b){_0x5be54d[_0x480b88(0x1e0)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x4721ec=_0x55c20a['indexOf'](_0x5aee1e(_0x4de379['$1'])[_0x480b88(0x1b4)]()),_0x20f2f3=_0x55006c(_0x48073d['$2']);_0x4721ec>=0x0&&(_0x3a34e7[_0x480b88(0x47d)](_0x4721ec,_0x20f2f3),this[_0x480b88(0x419)](_0x5efaeb));}else{if(BattleManager[_0x480b88(0x207)]){if(_0x480b88(0x417)===_0x480b88(0x450)){const _0x2e0d5a=_0x103234[_0x480b88(0x1f7)]('['+_0x4257c6['$1']['match'](/\d+/g)+']');for(const _0x2d13d4 of _0x2e0d5a){if(!_0x56ecb3[_0x480b88(0x388)](_0x2d13d4))return!![];}return![];}else return BattleManager[_0x480b88(0x207)];}else{if(BattleManager[_0x480b88(0x252)]){if(_0x480b88(0x1f3)===_0x480b88(0x1f3))return BattleManager[_0x480b88(0x252)];else _0x3e332c[_0x480b88(0x31b)][_0x480b88(0x2fb)][_0x480b88(0x439)](this),this[_0x480b88(0x4a5)]();}}}}else{const _0x332f7e=SceneManager[_0x480b88(0x336)];if(![Scene_Map,Scene_Item]['includes'](_0x332f7e[_0x480b88(0x33f)])){if('eRKKG'!==_0x480b88(0x3c4))for(const _0x52c9bf of _0x4eddae){let _0x585eba=0x0,_0x3628e5=0x0;if(_0x52c9bf[_0x480b88(0x1e0)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x585eba=_0x300d3b(_0x3be6d0['$1']),_0x3628e5=_0x2524a0(_0xe58d6e['$2']);else _0x52c9bf[_0x480b88(0x1e0)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x585eba=_0xe379d3['getStateIdWithName'](_0x4bc313['$1']),_0x3628e5=_0x266dc4(_0x460a8f['$2']));_0x532730[_0x480b88(0x317)](_0x585eba,_0x3628e5),this[_0x480b88(0x419)](_0x390a1b);}else return $gameParty[_0x480b88(0x4a2)]();}}return this;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x420)]=function(_0xe954f9){const _0x10db22=_0x47d9c7;if(!_0xe954f9)return _0x10db22(0x4f8);if(_0xe954f9[_0x10db22(0x39e)]()){if(_0x10db22(0x32a)==='hJiGE')return _0x10db22(0x3d2)[_0x10db22(0x387)](_0xe954f9[_0x10db22(0x2dc)]());else _0x490c3b[_0x10db22(0x31b)][_0x10db22(0x36f)][_0x10db22(0x439)](this,_0x190a04),this[_0x10db22(0x1ce)](_0x1a66f6);}else{if(_0x10db22(0x449)!==_0x10db22(0x449))return this[_0x10db22(0x1bd)](_0x5b3df3);else{const _0x4e1742='<enemy-%1>'['format'](_0xe954f9[_0x10db22(0x242)]()),_0x2b2884=_0x10db22(0x498)['format'](_0xe954f9['index']()),_0x101b21=_0x10db22(0x479)[_0x10db22(0x387)]($gameTroop['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'[_0x10db22(0x387)](_0x4e1742,_0x2b2884,_0x101b21);}}return _0x10db22(0x4f8);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4be)]=function(_0x4d8559){const _0x5202d4=_0x47d9c7;if(_0x4d8559===_0x5202d4(0x4f8))return this;else{if(_0x4d8559[_0x5202d4(0x1e0)](/<actor-(\d+)>/i)){if(_0x5202d4(0x49c)==='kXSQx')this[_0x5202d4(0x28a)]='';else return $gameActors[_0x5202d4(0x347)](Number(RegExp['$1']));}else{if('orgGY'!==_0x5202d4(0x23a)){if($gameParty[_0x5202d4(0x3ff)]()&&_0x4d8559[_0x5202d4(0x1e0)](/<troop-(\d+)>/i)){if('lUaHY'!==_0x5202d4(0x4c3))for(const _0x5e7b3f of _0xc9d06e){_0x5e7b3f[_0x5202d4(0x1e0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x132c86=_0x1540eb(_0x39a445['$1'])[_0x5202d4(0x1b4)]()['trim']()[_0x5202d4(0x4f3)](',');for(const _0x57315b of _0x132c86){_0x1df101[_0x5202d4(0x4a3)]['push'](_0x57315b[_0x5202d4(0x42e)]());}}else{const _0x132ab7=Number(RegExp['$1']);if(_0x132ab7===$gameTroop['getCurrentTroopUniqueID']()){if(_0x4d8559[_0x5202d4(0x1e0)](/<member-(\d+)>/i)){if('WkiJe'!==_0x5202d4(0x466))return $gameTroop['members']()[Number(RegExp['$1'])];else{if(!this[_0x5202d4(0x36d)])this[_0x5202d4(0x1e9)]();this[_0x5202d4(0x273)]();}}}}}if(_0x4d8559['match'](/<enemy-(\d+)>/i)){if(_0x5202d4(0x2ef)!==_0x5202d4(0x47e))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else{const _0x536136=_0x13dec3[_0x5202d4(0x1f7)]('['+_0x5eb47f['$1'][_0x5202d4(0x1e0)](/\d+/g)+']');for(const _0x3a61f3 of _0x536136){if(!_0x375fa8['isLearnedSkill'](_0x3a61f3))return!![];}return![];}}}else return _0x194e6f['VisuMZ_0_CoreEngine']&&_0x1c3bbb['prototype'][_0x5202d4(0x220)][_0x5202d4(0x439)](this);}}return this;},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x1dd)]=Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x2cc)],Game_Battler['prototype']['addState']=function(_0x5cd47f){const _0x26b576=_0x47d9c7,_0x5cb175=this[_0x26b576(0x480)](_0x5cd47f);VisuMZ['SkillsStatesCore'][_0x26b576(0x1dd)][_0x26b576(0x439)](this,_0x5cd47f);if(_0x5cb175&&this['hasState']($dataStates[_0x5cd47f])){this[_0x26b576(0x312)](_0x5cd47f);;}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x448)]=Game_Battler['prototype'][_0x47d9c7(0x480)],Game_Battler['prototype'][_0x47d9c7(0x480)]=function(_0x587dab){const _0x25b659=_0x47d9c7,_0x542c69=$dataStates[_0x587dab];if(_0x542c69&&_0x542c69[_0x25b659(0x4c8)][_0x25b659(0x1e0)](/<NO DEATH CLEAR>/i))return!this['isStateResist'](_0x587dab)&&!this[_0x25b659(0x2c0)](_0x587dab)&&!this['_result']['isStateRemoved'](_0x587dab);return VisuMZ[_0x25b659(0x31b)][_0x25b659(0x448)]['call'](this,_0x587dab);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x312)]=function(_0x2f3fc8){const _0x598778=_0x47d9c7;this[_0x598778(0x484)](_0x2f3fc8),this[_0x598778(0x2b6)](_0x2f3fc8),this['onAddStateMakeCustomSlipValues'](_0x2f3fc8),this['onAddStateCustomJS'](_0x2f3fc8),this['onAddStateGlobalJS'](_0x2f3fc8);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x43f)]=function(_0x4b515d){const _0x4e144e=_0x47d9c7;this['onEraseStateCustomJS'](_0x4b515d),this[_0x4e144e(0x3a0)](_0x4b515d),Game_BattlerBase[_0x4e144e(0x2f9)][_0x4e144e(0x43f)]['call'](this,_0x4b515d);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x3e7)]=function(_0x4072e0){const _0x58196f=_0x47d9c7;for(const _0x244849 of this[_0x58196f(0x3e0)]()){this[_0x58196f(0x2a6)](_0x244849['id'])&&_0x244849['autoRemovalTiming']===_0x4072e0&&(this[_0x58196f(0x1ff)](_0x244849['id']),this[_0x58196f(0x33e)](_0x244849['id']),this[_0x58196f(0x358)](_0x244849['id']));}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x33e)]=function(_0x396422){const _0xc58407=_0x47d9c7;this[_0xc58407(0x4f9)](_0x396422);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x1d0)]=function(_0x4b9465){const _0x17b29d=_0x47d9c7;if(this[_0x17b29d(0x1ea)]||this[_0x17b29d(0x4ba)])return;const _0x404a8c=VisuMZ[_0x17b29d(0x31b)]['stateAddJS'];if(_0x404a8c[_0x4b9465])_0x404a8c[_0x4b9465][_0x17b29d(0x439)](this,_0x4b9465);},Game_Battler['prototype'][_0x47d9c7(0x2d8)]=function(_0x54922d){const _0x447043=_0x47d9c7;if(this[_0x447043(0x1ea)]||this[_0x447043(0x4ba)])return;const _0x24e41c=VisuMZ['SkillsStatesCore'][_0x447043(0x239)];if(_0x24e41c[_0x54922d])_0x24e41c[_0x54922d][_0x447043(0x439)](this,_0x54922d);},Game_Battler[_0x47d9c7(0x2f9)]['onExpireStateCustomJS']=function(_0x113e97){const _0x35ef7b=_0x47d9c7;if(this[_0x35ef7b(0x1ea)]||this[_0x35ef7b(0x4ba)])return;const _0x320eac=VisuMZ[_0x35ef7b(0x31b)]['stateExpireJS'];if(_0x320eac[_0x113e97])_0x320eac[_0x113e97][_0x35ef7b(0x439)](this,_0x113e97);},Game_Battler['prototype'][_0x47d9c7(0x374)]=function(_0x3ee6ba){const _0x1c25a1=_0x47d9c7;if(this['_tempActor']||this[_0x1c25a1(0x4ba)])return;try{VisuMZ[_0x1c25a1(0x31b)]['Settings'][_0x1c25a1(0x217)][_0x1c25a1(0x3c7)]['call'](this,_0x3ee6ba);}catch(_0x19f2be){if(_0x1c25a1(0x1b3)===_0x1c25a1(0x4e7))this[_0x1c25a1(0x406)]['clear'](),this['_costSettings'][_0x1c25a1(0x477)][_0x1c25a1(0x439)](this);else{if($gameTemp[_0x1c25a1(0x3aa)]())console[_0x1c25a1(0x350)](_0x19f2be);}}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x3a0)]=function(_0x4375ac){const _0x935e47=_0x47d9c7;if(this[_0x935e47(0x1ea)]||this[_0x935e47(0x4ba)])return;try{_0x935e47(0x3ef)===_0x935e47(0x31c)?(_0x57be8e=![],this[_0x935e47(0x198)][_0xe6d653]=_0x133608):VisuMZ[_0x935e47(0x31b)][_0x935e47(0x28d)][_0x935e47(0x217)][_0x935e47(0x2ce)]['call'](this,_0x4375ac);}catch(_0x3a9b3a){if($gameTemp[_0x935e47(0x3aa)]())console[_0x935e47(0x350)](_0x3a9b3a);}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x358)]=function(_0xc7d5c){const _0x251168=_0x47d9c7;if(this[_0x251168(0x1ea)]||this[_0x251168(0x4ba)])return;try{'yMFcV'===_0x251168(0x4da)?(this[_0x251168(0x425)](_0x542c06),this['clearStateDisplay'](_0xbfdb64),this[_0x251168(0x227)](_0xeb7351)):VisuMZ['SkillsStatesCore']['Settings'][_0x251168(0x217)][_0x251168(0x32d)]['call'](this,_0xc7d5c);}catch(_0x511296){if(_0x251168(0x393)!==_0x251168(0x205)){if($gameTemp[_0x251168(0x3aa)]())console[_0x251168(0x350)](_0x511296);}else _0x36de53['categories']['push'](_0x28fc2f[_0x251168(0x1b4)]()[_0x251168(0x42e)]());}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x28e)]=function(_0x1e2873){const _0x3c2261=_0x47d9c7;return _0x1e2873=_0x1e2873[_0x3c2261(0x1b4)]()[_0x3c2261(0x42e)](),this[_0x3c2261(0x3e0)]()[_0x3c2261(0x311)](_0xb474fd=>_0xb474fd['categories'][_0x3c2261(0x3e9)](_0x1e2873));},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x4ad)]=function(_0x4fe8e6,_0x4f2bbe){const _0x308956=_0x47d9c7;_0x4fe8e6=_0x4fe8e6[_0x308956(0x1b4)]()[_0x308956(0x42e)](),_0x4f2bbe=_0x4f2bbe||0x0;const _0x29741c=this[_0x308956(0x28e)](_0x4fe8e6),_0x4d1069=[];for(const _0x1d29d5 of _0x29741c){if(_0x308956(0x3af)===_0x308956(0x314)){const _0x2395a2=_0x4a746f(_0xcab7e9['$1']),_0x395b1f=_0x168ff3[_0x308956(0x387)](_0x2395a2,'damage',-0x1,_0x308956(0x3ee));_0x42143a[_0x308956(0x31b)][_0x308956(0x467)][_0x296baf['id']]=new _0x1489d2(_0x308956(0x267),_0x395b1f);}else{if(!_0x1d29d5)continue;if(_0x4f2bbe<=0x0)break;_0x4d1069['push'](_0x1d29d5['id']),this[_0x308956(0x2a2)][_0x308956(0x236)]=!![],_0x4f2bbe--;}}while(_0x4d1069[_0x308956(0x1f8)]>0x0){this['removeState'](_0x4d1069[_0x308956(0x4de)]());}},Game_Battler[_0x47d9c7(0x2f9)]['removeStatesByCategoryAll']=function(_0x5c7c52,_0x5a639c){const _0x1787b5=_0x47d9c7;_0x5c7c52=_0x5c7c52[_0x1787b5(0x1b4)]()['trim'](),_0x5a639c=_0x5a639c||[];const _0x25c5f3=this['statesByCategory'](_0x5c7c52),_0x854f73=[];for(const _0x88c404 of _0x25c5f3){if(_0x1787b5(0x3ae)===_0x1787b5(0x3ae)){if(!_0x88c404)continue;if(_0x5a639c['includes'](_0x88c404))continue;_0x854f73[_0x1787b5(0x2f6)](_0x88c404['id']),this['_result'][_0x1787b5(0x236)]=!![];}else return this['_battler']&&this['_costSettings']?this[_0x1787b5(0x3f5)]():_0x321d39[_0x1787b5(0x31b)][_0x1787b5(0x27b)]['call'](this);}while(_0x854f73[_0x1787b5(0x1f8)]>0x0){if(_0x1787b5(0x251)!==_0x1787b5(0x251)){const _0x7b4d4b=_0x4f60ff[_0x1787b5(0x31b)][_0x1787b5(0x2d4)][_0x1787b5(0x439)](this);return _0x7b4d4b['clamp'](0x0,0x1);}else this['removeState'](_0x854f73[_0x1787b5(0x4de)]());}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x30e)]=function(_0x111127){return this['totalStateCategoryAffected'](_0x111127)>0x0;},Game_Battler['prototype'][_0x47d9c7(0x1ef)]=function(_0x26a053){const _0x28a27e=_0x47d9c7;return this[_0x28a27e(0x343)](_0x26a053)>0x0;},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x1db)]=function(_0x4bdc96){const _0x523b22=_0x47d9c7,_0x49e805=this[_0x523b22(0x28e)](_0x4bdc96)[_0x523b22(0x311)](_0x1ead9e=>this[_0x523b22(0x19f)](_0x1ead9e['id']));return _0x49e805['length'];},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x343)]=function(_0x503718){const _0x591f6c=_0x47d9c7,_0x555877=this['statesByCategory'](_0x503718);return _0x555877[_0x591f6c(0x1f8)];},VisuMZ[_0x47d9c7(0x31b)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x329)],Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x329)]=function(_0x1abce8){const _0x2c752d=_0x47d9c7,_0x3e14c4=$dataStates[_0x1abce8];if(_0x3e14c4&&_0x3e14c4['categories'][_0x2c752d(0x1f8)]>0x0){if(_0x2c752d(0x256)===_0x2c752d(0x3fe))return this['_categoryWindow']&&this[_0x2c752d(0x386)][_0x2c752d(0x220)]();else for(const _0x3b4f26 of _0x3e14c4[_0x2c752d(0x4a3)]){if(this[_0x2c752d(0x30c)](_0x3b4f26))return!![];}}return VisuMZ[_0x2c752d(0x31b)][_0x2c752d(0x301)][_0x2c752d(0x439)](this,_0x1abce8);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x30c)]=function(_0x3b734d){const _0x5eee12=_0x47d9c7;let _0x41298f=_0x5eee12(0x20f);if(this[_0x5eee12(0x403)](_0x41298f))return this[_0x5eee12(0x3d3)][_0x41298f]['includes'](_0x3b734d);return this[_0x5eee12(0x3d3)][_0x41298f]=this[_0x5eee12(0x39a)](),this[_0x5eee12(0x3d3)][_0x41298f][_0x5eee12(0x3e9)](_0x3b734d);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x39a)]=function(){const _0x3d3de1=_0x47d9c7,_0x4230bb=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x2a016b=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x5f02f2=[];for(const _0x32a09b of this[_0x3d3de1(0x46b)]()){if(_0x3d3de1(0x1d6)===_0x3d3de1(0x1d6)){if(!_0x32a09b)continue;const _0x3284a4=_0x32a09b[_0x3d3de1(0x4c8)],_0x525810=_0x3284a4[_0x3d3de1(0x1e0)](_0x4230bb);if(_0x525810){if('lHTfv'===_0x3d3de1(0x394))for(const _0x11d203 of _0x525810){if('aPGDB'!=='aPGDB')_0x14227f[_0x3d3de1(0x31b)][_0x3d3de1(0x275)][_0x3d3de1(0x439)](this,_0x136a04),this['_cache']={},this['passiveStates']();else{_0x11d203['match'](_0x4230bb);const _0x197031=String(RegExp['$1'])['split'](',')[_0x3d3de1(0x489)](_0xd7ca05=>String(_0xd7ca05)[_0x3d3de1(0x1b4)]()[_0x3d3de1(0x42e)]());_0x5f02f2=_0x5f02f2[_0x3d3de1(0x49a)](_0x197031);}}else return _0x5c817c(_0x25aeed['$1']);}if(_0x3284a4[_0x3d3de1(0x1e0)](_0x2a016b)){const _0x2bea74=String(RegExp['$1'])[_0x3d3de1(0x4f3)](/[\r\n]+/)[_0x3d3de1(0x489)](_0x2ee123=>String(_0x2ee123)[_0x3d3de1(0x1b4)]()[_0x3d3de1(0x42e)]());_0x5f02f2=_0x5f02f2[_0x3d3de1(0x49a)](_0x2bea74);}}else{if(_0x599290[_0x3d3de1(0x3aa)]())_0x2bf583[_0x3d3de1(0x350)](_0x3911ea);}}return _0x5f02f2;},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x2b6)]=function(_0xbf548){const _0x18ff4a=_0x47d9c7,_0x2008ca=$dataStates[_0xbf548];if(!_0x2008ca)return;const _0x272bf0=_0x2008ca[_0x18ff4a(0x4c8)]||'',_0x222c90=_0x272bf0[_0x18ff4a(0x1e0)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x222c90){if(_0x18ff4a(0x268)!==_0x18ff4a(0x268))this['setStateRetainType'](_0x18ff4a(0x371)),_0xd6ae0b[_0x18ff4a(0x31b)][_0x18ff4a(0x3d9)]['call'](this),this[_0x18ff4a(0x2b2)]();else{const _0x145535=[_0x2008ca];for(const _0x3b72d6 of _0x222c90){if('SMHqg'===_0x18ff4a(0x272)){const _0x7af827=_0xb0baee[_0x18ff4a(0x1f7)]('['+_0x2970ab['$1'][_0x18ff4a(0x1e0)](/\d+/g)+']');for(const _0x4ae95c of _0x7af827){if(!_0x2cf29e[_0x18ff4a(0x359)](_0x4ae95c))return!![];}return![];}else{_0x3b72d6[_0x18ff4a(0x1e0)](/<REMOVE OTHER (.*) STATES>/i);const _0x1c6117=String(RegExp['$1']);this[_0x18ff4a(0x330)](_0x1c6117,_0x145535);}}}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x24e)]=Game_Battler[_0x47d9c7(0x2f9)]['addBuff'],Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x4a6)]=function(_0x3261b8,_0x4ff749){const _0x57569f=_0x47d9c7;VisuMZ[_0x57569f(0x31b)][_0x57569f(0x24e)]['call'](this,_0x3261b8,_0x4ff749),this[_0x57569f(0x258)](_0x3261b8)&&this['onAddBuff'](_0x3261b8,_0x4ff749);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x287)]=function(_0x1c7f14){},VisuMZ[_0x47d9c7(0x31b)]['Game_Battler_addDebuff']=Game_Battler['prototype'][_0x47d9c7(0x26d)],Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x26d)]=function(_0x589d08,_0x22e31b){const _0x4d3e8e=_0x47d9c7;VisuMZ[_0x4d3e8e(0x31b)][_0x4d3e8e(0x1cf)]['call'](this,_0x589d08,_0x22e31b);if(this[_0x4d3e8e(0x1ad)](_0x589d08)){if(_0x4d3e8e(0x38e)!==_0x4d3e8e(0x38e)){if(_0x105c1b[_0x4d3e8e(0x3aa)]())_0x14f6b6[_0x4d3e8e(0x350)](_0x436b68);}else this[_0x4d3e8e(0x3a9)](_0x589d08,_0x22e31b);}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x342)]=function(){const _0x301e18=_0x47d9c7;for(let _0x1229fc=0x0;_0x1229fc<this['buffLength']();_0x1229fc++){if(this[_0x301e18(0x370)](_0x1229fc)){const _0x1bcdf2=this[_0x301e18(0x200)][_0x1229fc];this[_0x301e18(0x2bd)](_0x1229fc);if(_0x1bcdf2>0x0)this[_0x301e18(0x1f6)](_0x1229fc);if(_0x1bcdf2<0x0)this[_0x301e18(0x1b1)](_0x1229fc);}}},Game_Battler['prototype']['onAddBuff']=function(_0x2b17bf,_0x4dc33d){const _0x218359=_0x47d9c7;this[_0x218359(0x1ba)](_0x2b17bf,_0x4dc33d);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x3a9)]=function(_0x5ce862,_0x470dc0){const _0x52cec0=_0x47d9c7;this[_0x52cec0(0x334)](_0x5ce862,_0x470dc0);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x48d)]=function(_0x2a13d6){const _0x58d2b7=_0x47d9c7;Game_BattlerBase['prototype'][_0x58d2b7(0x48d)][_0x58d2b7(0x439)](this,_0x2a13d6),this[_0x58d2b7(0x4e8)](_0x2a13d6);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x23e)]=function(_0x22f448){const _0x167afd=_0x47d9c7;Game_BattlerBase[_0x167afd(0x2f9)][_0x167afd(0x23e)][_0x167afd(0x439)](this,_0x22f448),this['onEraseDebuffGlobalJS'](_0x22f448);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x1f6)]=function(_0x483d5b){const _0x251ced=_0x47d9c7;this[_0x251ced(0x4e5)](_0x483d5b);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x1b1)]=function(_0x51ebe1){const _0x26e14f=_0x47d9c7;this[_0x26e14f(0x232)](_0x51ebe1);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x1ba)]=function(_0x241552,_0x2f77fe){const _0x495cf0=_0x47d9c7;VisuMZ[_0x495cf0(0x31b)]['Settings'][_0x495cf0(0x3b2)]['onAddBuffJS'][_0x495cf0(0x439)](this,_0x241552,_0x2f77fe);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x334)]=function(_0x265456,_0x5ad536){const _0x50c833=_0x47d9c7;VisuMZ['SkillsStatesCore']['Settings'][_0x50c833(0x3b2)][_0x50c833(0x3df)][_0x50c833(0x439)](this,_0x265456,_0x5ad536);},Game_BattlerBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x4e8)]=function(_0x341e1f){const _0x3ebf06=_0x47d9c7;VisuMZ['SkillsStatesCore'][_0x3ebf06(0x28d)][_0x3ebf06(0x3b2)][_0x3ebf06(0x286)]['call'](this,_0x341e1f);},Game_BattlerBase[_0x47d9c7(0x2f9)]['onEraseDebuffGlobalJS']=function(_0x23996c){const _0x263dad=_0x47d9c7;VisuMZ[_0x263dad(0x31b)][_0x263dad(0x28d)]['Buffs'][_0x263dad(0x28f)]['call'](this,_0x23996c);},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x4e5)]=function(_0x239b22){const _0x33cc04=_0x47d9c7;VisuMZ[_0x33cc04(0x31b)][_0x33cc04(0x28d)][_0x33cc04(0x3b2)][_0x33cc04(0x2b3)]['call'](this,_0x239b22);},Game_Battler['prototype']['onExpireDebuffGlobalJS']=function(_0x1421a8){const _0x2e7c72=_0x47d9c7;VisuMZ[_0x2e7c72(0x31b)][_0x2e7c72(0x28d)]['Buffs'][_0x2e7c72(0x41e)]['call'](this,_0x1421a8);},Game_Battler['prototype']['onAddStateMakeCustomSlipValues']=function(_0x2385a0){const _0x43ae21=_0x47d9c7,_0x1e909e=VisuMZ[_0x43ae21(0x31b)],_0x59c3e0=[_0x43ae21(0x240),_0x43ae21(0x294),_0x43ae21(0x467),_0x43ae21(0x2d1),_0x43ae21(0x4a9),_0x43ae21(0x377)];for(const _0x4512aa of _0x59c3e0){if(_0x43ae21(0x353)!==_0x43ae21(0x35e))_0x1e909e[_0x4512aa][_0x2385a0]&&_0x1e909e[_0x4512aa][_0x2385a0][_0x43ae21(0x439)](this,_0x2385a0);else{const _0xc0871d=this['_commandNameWindow'];_0xc0871d[_0x43ae21(0x422)](_0x400294,0x0,_0x4cdbcc['y'],_0xc0871d[_0x43ae21(0x33d)],_0x43ae21(0x202));}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x444)]=Game_Battler[_0x47d9c7(0x2f9)]['regenerateAll'],Game_Battler['prototype'][_0x47d9c7(0x4c1)]=function(){const _0x4ed65e=_0x47d9c7;this[_0x4ed65e(0x38f)](),VisuMZ['SkillsStatesCore'][_0x4ed65e(0x444)]['call'](this),this[_0x4ed65e(0x2f7)](),this[_0x4ed65e(0x2ed)]();},Game_Battler[_0x47d9c7(0x2f9)]['setPassiveStateSlipDamageJS']=function(){const _0x505ccf=_0x47d9c7;for(const _0x3cafaf of this['passiveStates']()){if('krVXB'!=='krVXB'){if(typeof _0x1f8e75===_0x505ccf(0x1c7))_0x5d1af4=_0x4cced3[_0x1133e1];return this[_0x505ccf(0x3e0)]()[_0x505ccf(0x3e9)](_0x123652);}else{if(!_0x3cafaf)continue;this[_0x505ccf(0x1c0)](_0x3cafaf['id']);}}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x38f)]=function(){const _0x5ad8c7=_0x47d9c7;for(const _0x1f0a45 of this[_0x5ad8c7(0x3e0)]()){if(_0x5ad8c7(0x19c)===_0x5ad8c7(0x19c)){if(!_0x1f0a45)continue;if(_0x1f0a45[_0x5ad8c7(0x4c8)]['match'](/<JS SLIP REFRESH>/i)){if(_0x5ad8c7(0x1f0)!=='CpNpm'){if(_0x3bb2e1[_0x5ad8c7(0x359)](_0xeee8f1))return![];}else this[_0x5ad8c7(0x1c0)](_0x1f0a45['id']);}}else return this[_0x5ad8c7(0x4e3)]();}},Game_Battler[_0x47d9c7(0x2f9)][_0x47d9c7(0x2ed)]=function(){const _0x5e7a00=_0x47d9c7;if(!this[_0x5e7a00(0x40e)]())return;const _0x590430=this[_0x5e7a00(0x3e0)]();for(const _0x16494b of _0x590430){if(!_0x16494b)continue;this[_0x5e7a00(0x1e8)](_0x16494b);}},Game_Battler[_0x47d9c7(0x2f9)]['onRegenerateCustomStateDamageOverTime']=function(_0x551bcc){const _0x318b36=_0x47d9c7,_0x30d48d=this[_0x318b36(0x245)](_0x551bcc['id'],_0x318b36(0x266))||0x0,_0x3a8f03=-this[_0x318b36(0x4d6)](),_0x34a46e=Math['max'](_0x30d48d,_0x3a8f03);if(_0x34a46e!==0x0){const _0x164cde=this[_0x318b36(0x2a2)][_0x318b36(0x381)]||0x0;this[_0x318b36(0x228)](_0x34a46e),this[_0x318b36(0x2a2)]['hpDamage']+=_0x164cde;}const _0x43144e=this[_0x318b36(0x245)](_0x551bcc['id'],_0x318b36(0x3ee))||0x0;if(_0x43144e!==0x0){if('tMwAC'==='tMwAC'){const _0x1faffb=this['_result'][_0x318b36(0x2cf)]||0x0;this[_0x318b36(0x4b0)](_0x43144e),this['_result'][_0x318b36(0x2cf)]+=_0x1faffb;}else{const _0x4e6efc=_0x4247f9[_0x318b36(0x1f7)]('['+_0x351f9e['$1'][_0x318b36(0x1e0)](/\d+/g)+']');for(const _0x5a9269 of _0x4e6efc){if(!_0x211b14['value'](_0x5a9269))return![];}return!![];}}const _0x441c30=this[_0x318b36(0x245)](_0x551bcc['id'],_0x318b36(0x4fe))||0x0;if(_0x441c30!==0x0){if('wzvMi'==='WIMRb'){const _0x366181=_0x43b544[_0x318b36(0x4c8)];if(_0x366181[_0x318b36(0x1e0)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x50f0c9=_0x1bfb5a(_0x463720['$1']),_0x1628d7=_0x318b36(0x303)[_0x318b36(0x387)](_0x50f0c9);_0x391a89[_0x318b36(0x31b)][_0x318b36(0x366)][_0x1d4a21['id']]=new _0x3cce4f(_0x318b36(0x3d1),_0x1628d7);}if(_0x366181[_0x318b36(0x1e0)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x383abd=_0x5cb782(_0x2c248a['$1']),_0x3c2845='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x318b36(0x387)](_0x383abd);_0xeee700['SkillsStatesCore'][_0x318b36(0x263)][_0x2d930b['id']]=new _0x283cfa(_0x318b36(0x3d1),_0x3c2845);}}else this['gainSilentTp'](_0x441c30);}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x30a)]=Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x1b8)],Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x1b8)]=function(){const _0x447336=_0x47d9c7,_0x4a706c=VisuMZ['SkillsStatesCore'][_0x447336(0x30a)]['call'](this),_0x2f90f9=VisuMZ[_0x447336(0x31b)]['Settings']['Skills'];let _0x4f947d=_0x2f90f9[_0x447336(0x4c5)];return $gameParty['inBattle']()&&(_0x447336(0x2a5)!==_0x447336(0x2d5)?_0x4f947d=_0x4f947d[_0x447336(0x49a)](_0x2f90f9['BattleHiddenSkillTypes']):(this[_0x447336(0x2fd)](),_0x1a2b9a[_0x447336(0x31b)][_0x447336(0x4b2)]['call'](this))),_0x4a706c[_0x447336(0x311)](_0x3e8a5e=>!_0x4f947d['includes'](_0x3e8a5e));},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x424)]=function(){const _0x451ee6=_0x47d9c7;return this['skills']()['filter'](_0x1c6122=>this[_0x451ee6(0x476)](_0x1c6122));},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x476)]=function(_0x20b07b){const _0xd1bbb8=_0x47d9c7;if(!this[_0xd1bbb8(0x1b9)](_0x20b07b))return![];if(!_0x20b07b)return![];if(!this[_0xd1bbb8(0x469)](_0x20b07b))return![];if(this[_0xd1bbb8(0x338)](_0x20b07b))return![];return!![];},Game_Actor['prototype'][_0x47d9c7(0x469)]=function(_0x4ed9ee){const _0x49290b=_0x47d9c7,_0xd70725=this['skillTypes'](),_0x24c108=DataManager[_0x49290b(0x201)](_0x4ed9ee),_0x17d94e=_0xd70725['filter'](_0x497987=>_0x24c108['includes'](_0x497987));return _0x17d94e[_0x49290b(0x1f8)]>0x0;},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x338)]=function(_0x2cb5bc){const _0x4ca6ab=_0x47d9c7;if(!VisuMZ[_0x4ca6ab(0x31b)]['CheckVisibleBattleNotetags'](this,_0x2cb5bc))return!![];if(!VisuMZ[_0x4ca6ab(0x31b)]['CheckVisibleSwitchNotetags'](this,_0x2cb5bc))return!![];if(!VisuMZ['SkillsStatesCore'][_0x4ca6ab(0x29b)](this,_0x2cb5bc))return!![];return![];},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x264)]=function(){const _0x35c00a=_0x47d9c7;let _0x21339b=[this[_0x35c00a(0x347)](),this[_0x35c00a(0x3d5)]()];_0x21339b=_0x21339b[_0x35c00a(0x49a)](this['equips']()['filter'](_0x451533=>_0x451533));for(const _0x3cdde9 of this[_0x35c00a(0x4ed)]){const _0x57b7c4=$dataSkills[_0x3cdde9];if(_0x57b7c4)_0x21339b['push'](_0x57b7c4);}return _0x21339b;},Game_Actor['prototype']['addPassiveStatesByPluginParameters']=function(){const _0x295284=_0x47d9c7;Game_Battler[_0x295284(0x2f9)]['addPassiveStatesByPluginParameters'][_0x295284(0x439)](this);const _0x407f32=VisuMZ[_0x295284(0x31b)]['Settings'][_0x295284(0x2c9)][_0x295284(0x1c3)];this[_0x295284(0x3d3)][_0x295284(0x443)]=this[_0x295284(0x3d3)][_0x295284(0x443)][_0x295284(0x49a)](_0x407f32);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4d2)]=Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x1d2)],Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x1d2)]=function(_0x1a9993){const _0x1200de=_0x47d9c7;VisuMZ[_0x1200de(0x31b)][_0x1200de(0x4d2)][_0x1200de(0x439)](this,_0x1a9993),this['_cache']={},this[_0x1200de(0x443)]();},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x275)]=Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x427)],Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x427)]=function(_0x9642da){const _0x569172=_0x47d9c7;VisuMZ[_0x569172(0x31b)]['Game_Actor_forgetSkill'][_0x569172(0x439)](this,_0x9642da),this['_cache']={},this[_0x569172(0x443)]();},Game_Actor[_0x47d9c7(0x2f9)][_0x47d9c7(0x4cf)]=function(){const _0x1048ce=_0x47d9c7;return VisuMZ['SkillsStatesCore'][_0x1048ce(0x28d)][_0x1048ce(0x217)][_0x1048ce(0x265)]??0x14;},Game_Enemy[_0x47d9c7(0x2f9)][_0x47d9c7(0x264)]=function(){const _0x38dd36=_0x47d9c7;let _0x3cefd2=[this[_0x38dd36(0x19e)]()];return _0x3cefd2[_0x38dd36(0x49a)](this[_0x38dd36(0x1fc)]());},Game_Enemy[_0x47d9c7(0x2f9)][_0x47d9c7(0x284)]=function(){const _0x527707=_0x47d9c7;Game_Battler[_0x527707(0x2f9)][_0x527707(0x284)]['call'](this);const _0x51cd7e=VisuMZ[_0x527707(0x31b)][_0x527707(0x28d)]['PassiveStates']['Enemy'];this['_cache'][_0x527707(0x443)]=this[_0x527707(0x3d3)][_0x527707(0x443)][_0x527707(0x49a)](_0x51cd7e);},Game_Enemy['prototype'][_0x47d9c7(0x1fc)]=function(){const _0x2d0fcb=_0x47d9c7,_0x4abc9f=[];for(const _0x23dc64 of this['enemy']()[_0x2d0fcb(0x3c2)]){const _0x2ccfd0=$dataSkills[_0x23dc64[_0x2d0fcb(0x3a8)]];if(_0x2ccfd0&&!_0x4abc9f[_0x2d0fcb(0x3e9)](_0x2ccfd0))_0x4abc9f[_0x2d0fcb(0x2f6)](_0x2ccfd0);}return _0x4abc9f;},Game_Enemy[_0x47d9c7(0x2f9)]['meetsStateCondition']=function(_0x1472fb){const _0x18416c=_0x47d9c7;return this[_0x18416c(0x39f)]($dataStates[_0x1472fb]);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x40d)]=Game_Unit[_0x47d9c7(0x2f9)]['isAllDead'],Game_Unit[_0x47d9c7(0x2f9)][_0x47d9c7(0x392)]=function(){const _0x237e4e=_0x47d9c7;if(this[_0x237e4e(0x3c0)]())return!![];return VisuMZ[_0x237e4e(0x31b)][_0x237e4e(0x40d)][_0x237e4e(0x439)](this);},Game_Unit[_0x47d9c7(0x2f9)][_0x47d9c7(0x3c0)]=function(){const _0x25cbb1=_0x47d9c7,_0x3312a7=this[_0x25cbb1(0x2ca)]();for(const _0x476212 of _0x3312a7){if(!_0x476212['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x45c)]=Game_Troop[_0x47d9c7(0x2f9)][_0x47d9c7(0x4ee)],Game_Troop[_0x47d9c7(0x2f9)][_0x47d9c7(0x4ee)]=function(_0x26047c){const _0x2cc3aa=_0x47d9c7;VisuMZ['SkillsStatesCore'][_0x2cc3aa(0x45c)]['call'](this,_0x26047c),this[_0x2cc3aa(0x1a0)]();},Game_Troop['prototype'][_0x47d9c7(0x1a0)]=function(){const _0x438d7f=_0x47d9c7;this[_0x438d7f(0x3db)]=Graphics['frameCount'];},Game_Troop[_0x47d9c7(0x2f9)][_0x47d9c7(0x47c)]=function(){const _0x18d1e8=_0x47d9c7;return this[_0x18d1e8(0x3db)]=this[_0x18d1e8(0x3db)]||Graphics[_0x18d1e8(0x310)],this[_0x18d1e8(0x3db)];},Scene_Skill['prototype'][_0x47d9c7(0x2a9)]=function(){const _0x27c8c3=_0x47d9c7;if(ConfigManager[_0x27c8c3(0x435)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x27c8c3(0x4d3)];else{if(this[_0x27c8c3(0x451)]()){if(_0x27c8c3(0x4e2)===_0x27c8c3(0x4e2))return this[_0x27c8c3(0x34d)]()[_0x27c8c3(0x1e0)](/LOWER/i);else{const _0x31614=_0x447df8['parse']('['+_0x32027a['$1']['match'](/\d+/g)+']');for(const _0x3fc52e of _0x31614){if(!_0xaa66d4[_0x27c8c3(0x359)](_0x3fc52e))return![];}return!![];}}else{if(_0x27c8c3(0x289)!==_0x27c8c3(0x213))Scene_ItemBase[_0x27c8c3(0x2f9)][_0x27c8c3(0x3c8)]['call'](this);else return _0x27c8c3(0x39c);}}},Scene_Skill[_0x47d9c7(0x2f9)]['isRightInputMode']=function(){const _0x16390d=_0x47d9c7;if(ConfigManager[_0x16390d(0x435)]&&ConfigManager[_0x16390d(0x20d)]!==undefined)return _0x16390d(0x36a)!=='kIHAp'?ConfigManager[_0x16390d(0x20d)]:_0x4f8d15[_0x16390d(0x2f9)][_0x16390d(0x3c8)]['call'](this);else{if(this[_0x16390d(0x451)]())return this[_0x16390d(0x34d)]()[_0x16390d(0x1e0)](/RIGHT/i);else{if(_0x16390d(0x2b5)==='bPEGo')_0x418e60[_0x16390d(0x47d)](_0x132535,_0x470182),this[_0x16390d(0x419)](_0x57884b);else return Scene_ItemBase[_0x16390d(0x2f9)][_0x16390d(0x3c8)][_0x16390d(0x439)](this);}}},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x34d)]=function(){const _0x29160c=_0x47d9c7;return VisuMZ[_0x29160c(0x31b)][_0x29160c(0x28d)][_0x29160c(0x43a)][_0x29160c(0x1bb)];},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x220)]=function(){const _0x340740=_0x47d9c7;return this[_0x340740(0x386)]&&this[_0x340740(0x386)][_0x340740(0x220)]();},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x451)]=function(){const _0x358196=_0x47d9c7;return VisuMZ['SkillsStatesCore'][_0x358196(0x28d)][_0x358196(0x43a)]['EnableLayout'];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x38c)]=Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x42c)],Scene_Skill[_0x47d9c7(0x2f9)]['helpWindowRect']=function(){const _0x28b80e=_0x47d9c7;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x28b80e(0x1e1)==='STcbV'){const _0x54aab1=_0x733bc[_0x28b80e(0x4c8)],_0x49041d=_0x57a1d9[_0x28b80e(0x31b)]['skillVisibleJS'];return _0x49041d[_0x249935['id']]?_0x49041d[_0x33bb7d['id']]['call'](this,_0x3b7cd6):!![];}else return this['helpWindowRectSkillsStatesCore']();}else return _0x28b80e(0x313)!==_0x28b80e(0x32f)?VisuMZ['SkillsStatesCore'][_0x28b80e(0x38c)]['call'](this):this[_0x28b80e(0x204)][_0x28b80e(0x4db)][_0x28b80e(0x439)](this[_0x28b80e(0x1ec)]);},Scene_Skill[_0x47d9c7(0x2f9)]['helpWindowRectSkillsStatesCore']=function(){const _0x53af9a=_0x47d9c7,_0x4c0522=0x0,_0xa07292=this[_0x53af9a(0x1c2)](),_0x4c15f6=Graphics[_0x53af9a(0x3e2)],_0x188d86=this[_0x53af9a(0x3b7)]();return new Rectangle(_0x4c0522,_0xa07292,_0x4c15f6,_0x188d86);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x352)]=Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x3ab)],Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x3ab)]=function(){const _0x2af86e=_0x47d9c7;if(this[_0x2af86e(0x451)]())return _0x2af86e(0x2f5)!=='FLZHW'?!![]:this[_0x2af86e(0x274)]();else{if('klMhl'!=='ibPeF')return VisuMZ[_0x2af86e(0x31b)][_0x2af86e(0x352)][_0x2af86e(0x439)](this);else{let _0xd98534=_0x4025f3[_0x2af86e(0x1b8)][_0x472dd7];if(_0xd98534[_0x2af86e(0x1e0)](/\\I\[(\d+)\]/i))return _0xd98534;if(this[_0x2af86e(0x437)]()===_0x2af86e(0x404))return _0xd98534;const _0x572a54=_0x9b3bd7['SkillsStatesCore']['Settings'][_0x2af86e(0x43a)],_0x109ca7=_0x2b40d2['magicSkills'][_0x2af86e(0x3e9)](_0x4a12af),_0x59af73=_0x109ca7?_0x572a54[_0x2af86e(0x302)]:_0x572a54['IconStypeNorm'];return _0x2af86e(0x222)[_0x2af86e(0x387)](_0x59af73,_0xd98534);}}},Scene_Skill['prototype'][_0x47d9c7(0x40f)]=function(){const _0x443073=_0x47d9c7;return VisuMZ[_0x443073(0x31b)][_0x443073(0x28d)][_0x443073(0x43a)][_0x443073(0x45e)]??Scene_MenuBase[_0x443073(0x2f9)][_0x443073(0x40f)][_0x443073(0x439)](this);},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x274)]=function(){const _0x2d1a74=_0x47d9c7,_0x420ace=this['mainCommandWidth'](),_0x2dc469=this[_0x2d1a74(0x27d)](0x3,!![]),_0x434e80=this[_0x2d1a74(0x3c8)]()?Graphics[_0x2d1a74(0x3e2)]-_0x420ace:0x0,_0x443338=this[_0x2d1a74(0x26e)]();return new Rectangle(_0x434e80,_0x443338,_0x420ace,_0x2dc469);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x32e)]=Scene_Skill['prototype']['statusWindowRect'],Scene_Skill['prototype'][_0x47d9c7(0x459)]=function(){const _0x5e4ce4=_0x47d9c7;if(this[_0x5e4ce4(0x451)]())return this['statusWindowRectSkillsStatesCore']();else{if('yXrOi'===_0x5e4ce4(0x409))_0x3f447a['SkillsStatesCore']['Settings'][_0x5e4ce4(0x3b2)]['onExpireDebuffJS'][_0x5e4ce4(0x439)](this,_0x411fbf);else return VisuMZ[_0x5e4ce4(0x31b)][_0x5e4ce4(0x32e)][_0x5e4ce4(0x439)](this);}},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x397)]=function(){const _0x33c471=_0x47d9c7,_0x19ce81=Graphics['boxWidth']-this[_0x33c471(0x40f)](),_0x55d1ac=this[_0x33c471(0x431)]['height'],_0x5c60d4=this['isRightInputMode']()?0x0:Graphics[_0x33c471(0x3e2)]-_0x19ce81,_0x1c5854=this[_0x33c471(0x26e)]();return new Rectangle(_0x5c60d4,_0x1c5854,_0x19ce81,_0x55d1ac);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x26b)]=Scene_Skill['prototype'][_0x47d9c7(0x4c9)],Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x4c9)]=function(){const _0xea6157=_0x47d9c7;VisuMZ[_0xea6157(0x31b)][_0xea6157(0x26b)][_0xea6157(0x439)](this),this[_0xea6157(0x458)]()&&(_0xea6157(0x2f8)==='IoxaZ'?this['createShopStatusWindow']():(_0x5e2fd4=_0x29b258,_0x2ec787+=_0x35beeb));},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x429)]=Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x4c2)],Scene_Skill['prototype'][_0x47d9c7(0x4c2)]=function(){const _0x3ae86a=_0x47d9c7;if(this[_0x3ae86a(0x451)]())return this[_0x3ae86a(0x279)]();else{if('COFWk'==='COFWk'){const _0x111a40=VisuMZ[_0x3ae86a(0x31b)][_0x3ae86a(0x429)][_0x3ae86a(0x439)](this);return this[_0x3ae86a(0x458)]()&&this[_0x3ae86a(0x428)]()&&(_0x111a40['width']-=this[_0x3ae86a(0x461)]()),_0x111a40;}else{if(this[_0x3ae86a(0x1ea)]||this[_0x3ae86a(0x4ba)])return;const _0x3f20c9=_0x59068d[_0x3ae86a(0x31b)][_0x3ae86a(0x1d4)];if(_0x3f20c9[_0x106763])_0x3f20c9[_0x3df576][_0x3ae86a(0x439)](this,_0x147f19);}}},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x279)]=function(){const _0x25baf9=_0x47d9c7,_0xd268dd=Graphics[_0x25baf9(0x3e2)]-this['shopStatusWidth'](),_0x51e42a=this[_0x25baf9(0x39d)]()-this[_0x25baf9(0x20b)]['height'],_0x598e1d=this[_0x25baf9(0x3c8)]()?Graphics['boxWidth']-_0xd268dd:0x0,_0x66c4b0=this[_0x25baf9(0x20b)]['y']+this[_0x25baf9(0x20b)][_0x25baf9(0x1d9)];return new Rectangle(_0x598e1d,_0x66c4b0,_0xd268dd,_0x51e42a);},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x458)]=function(){const _0x360641=_0x47d9c7;if(!Imported[_0x360641(0x2ac)])return![];else return this[_0x360641(0x451)]()?!![]:VisuMZ[_0x360641(0x31b)][_0x360641(0x28d)]['Skills'][_0x360641(0x405)];},Scene_Skill['prototype'][_0x47d9c7(0x428)]=function(){const _0x65ce2=_0x47d9c7;return VisuMZ[_0x65ce2(0x31b)][_0x65ce2(0x28d)][_0x65ce2(0x43a)]['SkillSceneAdjustSkillList'];},Scene_Skill['prototype'][_0x47d9c7(0x260)]=function(){const _0x2c283d=_0x47d9c7,_0x3c5919=this[_0x2c283d(0x2fc)]();this['_shopStatusWindow']=new Window_ShopStatus(_0x3c5919),this[_0x2c283d(0x1eb)](this['_shopStatusWindow']),this[_0x2c283d(0x1a6)][_0x2c283d(0x36e)](this[_0x2c283d(0x4e6)]);const _0x145c21=VisuMZ['SkillsStatesCore'][_0x2c283d(0x28d)][_0x2c283d(0x43a)]['SkillSceneStatusBgType'];this[_0x2c283d(0x4e6)][_0x2c283d(0x322)](_0x145c21||0x0);},Scene_Skill[_0x47d9c7(0x2f9)]['shopStatusWindowRect']=function(){const _0x3273de=_0x47d9c7;return this[_0x3273de(0x451)]()?this[_0x3273de(0x328)]():_0x3273de(0x39b)===_0x3273de(0x29e)?_0x3f6a31[_0x3273de(0x31b)][_0x3273de(0x28d)][_0x3273de(0x217)]['TurnEndOnMap']??0x14:VisuMZ[_0x3273de(0x31b)][_0x3273de(0x28d)][_0x3273de(0x43a)][_0x3273de(0x369)][_0x3273de(0x439)](this);},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x328)]=function(){const _0x16550c=_0x47d9c7,_0x1fc58d=this[_0x16550c(0x461)](),_0x127e20=this['_itemWindow'][_0x16550c(0x1d9)],_0xc9ca92=this[_0x16550c(0x3c8)]()?0x0:Graphics[_0x16550c(0x3e2)]-this[_0x16550c(0x461)](),_0xd3ba48=this['_itemWindow']['y'];return new Rectangle(_0xc9ca92,_0xd3ba48,_0x1fc58d,_0x127e20);},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x461)]=function(){const _0xcc3078=_0x47d9c7;if(Imported[_0xcc3078(0x2ac)]){if(_0xcc3078(0x462)!==_0xcc3078(0x23f))return Scene_Shop[_0xcc3078(0x2f9)][_0xcc3078(0x360)]();else{if(!_0x3e5657)return;_0x28bb01[_0xcc3078(0x2f9)]['drawActorIcons'][_0xcc3078(0x439)](this,_0x4078fd,_0x17192d,_0xd3df50,_0x555724);}}else return 0x0;},Scene_Skill[_0x47d9c7(0x2f9)][_0x47d9c7(0x261)]=function(){const _0x354838=_0x47d9c7;return this[_0x354838(0x431)]&&this[_0x354838(0x431)]['active']?TextManager[_0x354838(0x3f0)]:_0x354838(0x4f2)!==_0x354838(0x372)?'':_0x361c0f['SkillsStatesCore'][_0x354838(0x32e)][_0x354838(0x439)](this);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_initMembers']=Sprite_Gauge['prototype']['initMembers'],Sprite_Gauge[_0x47d9c7(0x2f9)]['initMembers']=function(){const _0x13f334=_0x47d9c7;VisuMZ[_0x13f334(0x31b)]['Sprite_Gauge_initMembers'][_0x13f334(0x439)](this),this[_0x13f334(0x204)]=null;},VisuMZ[_0x47d9c7(0x31b)]['Sprite_Gauge_setup']=Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x4ee)],Sprite_Gauge[_0x47d9c7(0x2f9)]['setup']=function(_0x481a48,_0x22ae4b){const _0x2c36bc=_0x47d9c7;this['setupSkillsStatesCore'](_0x481a48,_0x22ae4b),_0x22ae4b=_0x22ae4b[_0x2c36bc(0x3f1)](),VisuMZ[_0x2c36bc(0x31b)][_0x2c36bc(0x45d)][_0x2c36bc(0x439)](this,_0x481a48,_0x22ae4b);},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x3ea)]=function(_0x49ae96,_0x49245e){const _0x19668=_0x47d9c7,_0x5096b5=VisuMZ[_0x19668(0x31b)][_0x19668(0x28d)][_0x19668(0x496)]['filter'](_0x1597b9=>_0x1597b9[_0x19668(0x316)][_0x19668(0x1b4)]()===_0x49245e['toUpperCase']());_0x5096b5[_0x19668(0x1f8)]>=0x1?this['_costSettings']=_0x5096b5[0x0]:this[_0x19668(0x204)]=null;},VisuMZ[_0x47d9c7(0x31b)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x1a7)],Sprite_Gauge[_0x47d9c7(0x2f9)]['currentValue']=function(){const _0x40e417=_0x47d9c7;if(this[_0x40e417(0x1ec)]&&this[_0x40e417(0x204)])return this[_0x40e417(0x333)]();else{if(_0x40e417(0x4f0)===_0x40e417(0x4f0))return VisuMZ['SkillsStatesCore'][_0x40e417(0x47b)][_0x40e417(0x439)](this);else this['_stateRetainType']=_0xc1bd54;}},Sprite_Gauge[_0x47d9c7(0x2f9)]['currentValueSkillsStatesCore']=function(){const _0x3be469=_0x47d9c7;return this['_costSettings']['GaugeCurrentJS'][_0x3be469(0x439)](this[_0x3be469(0x1ec)]);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x27b)]=Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x436)],Sprite_Gauge[_0x47d9c7(0x2f9)]['currentMaxValue']=function(){const _0x2c9344=_0x47d9c7;return this[_0x2c9344(0x1ec)]&&this[_0x2c9344(0x204)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x2c9344(0x31b)]['Sprite_Gauge_currentMaxValue']['call'](this);},Sprite_Gauge['prototype']['currentMaxValueSkillsStatesCore']=function(){const _0x2964f4=_0x47d9c7;return this[_0x2964f4(0x204)][_0x2964f4(0x4db)][_0x2964f4(0x439)](this[_0x2964f4(0x1ec)]);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x438)],Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x438)]=function(){const _0x3f819c=_0x47d9c7,_0x169d2a=VisuMZ[_0x3f819c(0x31b)][_0x3f819c(0x2d4)][_0x3f819c(0x439)](this);return _0x169d2a[_0x3f819c(0x27e)](0x0,0x1);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_redraw']=Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x24c)],Sprite_Gauge['prototype']['redraw']=function(){const _0xe9f2d9=_0x47d9c7;if(this['_battler']&&this['_costSettings']){if(_0xe9f2d9(0x412)!=='OfwCJ')this[_0xe9f2d9(0x406)][_0xe9f2d9(0x30d)](),this['redrawSkillsStatesCore']();else{const _0x530b61=_0x12a569[_0x4dbcbf];if(!_0x530b61)return;const _0x209736=_0x530b61['note']||'',_0x18cc8d=_0x209736[_0xe9f2d9(0x1e0)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x18cc8d){const _0x1ba084=[_0x530b61];for(const _0x47d7b1 of _0x18cc8d){_0x47d7b1[_0xe9f2d9(0x1e0)](/<REMOVE OTHER (.*) STATES>/i);const _0x32a4dc=_0x45fc79(_0x39399d['$1']);this[_0xe9f2d9(0x330)](_0x32a4dc,_0x1ba084);}}}}else{if(_0xe9f2d9(0x262)===_0xe9f2d9(0x262))VisuMZ['SkillsStatesCore'][_0xe9f2d9(0x351)]['call'](this);else return _0x53b0b9['SkillsStatesCore'][_0xe9f2d9(0x352)][_0xe9f2d9(0x439)](this);}},Sprite_Gauge['prototype'][_0x47d9c7(0x344)]=function(){const _0x4a1589=_0x47d9c7;let _0x2476a8=this[_0x4a1589(0x1a7)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x4a1589(0x3d4)]()&&(_0x2476a8=VisuMZ[_0x4a1589(0x471)](_0x2476a8)),_0x2476a8;},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x259)]=function(){const _0x2dab4a=_0x47d9c7;this[_0x2dab4a(0x406)]['clear'](),this[_0x2dab4a(0x204)][_0x2dab4a(0x477)][_0x2dab4a(0x439)](this);},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x486)]=function(_0x579e14,_0x26c63e,_0x44aabd,_0x5a8465,_0x289bd2,_0x1f0e62){const _0x37ede5=_0x47d9c7,_0x2c547f=this[_0x37ede5(0x438)](),_0x15e24d=Math[_0x37ede5(0x49d)]((_0x289bd2-0x2)*_0x2c547f),_0x12d8ff=_0x1f0e62-0x2,_0x4b121d=this[_0x37ede5(0x3b5)]();this['bitmap'][_0x37ede5(0x37c)](_0x44aabd,_0x5a8465,_0x289bd2,_0x1f0e62,_0x4b121d),this['bitmap'][_0x37ede5(0x327)](_0x44aabd+0x1,_0x5a8465+0x1,_0x15e24d,_0x12d8ff,_0x579e14,_0x26c63e);},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x426)]=function(){const _0x2bc80f=_0x47d9c7,_0x6cecf4=VisuMZ['SkillsStatesCore'][_0x2bc80f(0x28d)][_0x2bc80f(0x464)];return _0x6cecf4['LabelFontMainType']===_0x2bc80f(0x1c7)?$gameSystem[_0x2bc80f(0x3c1)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x47d9c7(0x2f9)]['labelFontSize']=function(){const _0x94703d=_0x47d9c7,_0xe02140=VisuMZ[_0x94703d(0x31b)][_0x94703d(0x28d)][_0x94703d(0x464)];if(_0xe02140[_0x94703d(0x41a)]==='number'){if(_0x94703d(0x1f9)!==_0x94703d(0x2ae))return $gameSystem[_0x94703d(0x1a9)]()-0x6;else{if(!this[_0x94703d(0x35c)](_0x13764a))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x54ea58))return![];if(!this[_0x94703d(0x4ec)](_0x14b5f6))return![];if(!this['meetsPassiveStateGlobalConditionJS'](_0x4349b2))return![];return!![];}}else return $gameSystem[_0x94703d(0x1a9)]()-0x2;},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x1a1)]=function(){const _0x225382=_0x47d9c7,_0x345c8c=VisuMZ[_0x225382(0x31b)]['Settings'][_0x225382(0x464)];if(_0x345c8c[_0x225382(0x457)]===_0x225382(0x1c7))return $gameSystem[_0x225382(0x3c1)]();else{if(_0x225382(0x2af)===_0x225382(0x3b6))this[_0x225382(0x20b)][_0x225382(0x1a8)](this[_0x225382(0x21f)](0x0));else return $gameSystem[_0x225382(0x44a)]();}},Sprite_Gauge[_0x47d9c7(0x2f9)]['valueFontSize']=function(){const _0x4ebbde=_0x47d9c7,_0x418e41=VisuMZ[_0x4ebbde(0x31b)][_0x4ebbde(0x28d)][_0x4ebbde(0x464)];return _0x418e41[_0x4ebbde(0x457)]==='number'?$gameSystem[_0x4ebbde(0x1a9)]()-0x6:$gameSystem[_0x4ebbde(0x1a9)]()-0x2;},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x208)]=function(){const _0x278d82=_0x47d9c7,_0x3eb6a2=VisuMZ[_0x278d82(0x31b)][_0x278d82(0x28d)][_0x278d82(0x464)];if(_0x3eb6a2[_0x278d82(0x481)]){if(_0x3eb6a2['MatchLabelGaugeColor']===0x1)return this[_0x278d82(0x4e3)]();else{if(_0x3eb6a2[_0x278d82(0x44c)]===0x2){if('KDepy'!==_0x278d82(0x31f))return this[_0x278d82(0x209)]();else _0x3ecfb9+=this[_0x278d82(0x1c5)](_0x5e6894),this[_0x278d82(0x317)](_0xea9e35,_0x4a1dc7);}}}const _0x49fa52=_0x3eb6a2[_0x278d82(0x4ab)];return ColorManager[_0x278d82(0x410)](_0x49fa52);},Sprite_Gauge['prototype']['labelOutlineColor']=function(){const _0x32ed67=_0x47d9c7,_0x146b4a=VisuMZ['SkillsStatesCore'][_0x32ed67(0x28d)][_0x32ed67(0x464)];if(this[_0x32ed67(0x4ac)]()<=0x0)return _0x32ed67(0x3be);else return _0x146b4a[_0x32ed67(0x1ab)]?'BjQjD'===_0x32ed67(0x3a4)?'rgba(0,\x200,\x200,\x201)':![]:ColorManager[_0x32ed67(0x45b)]();},Sprite_Gauge['prototype']['labelOutlineWidth']=function(){const _0x456dc1=_0x47d9c7;return VisuMZ[_0x456dc1(0x31b)][_0x456dc1(0x28d)]['Gauge'][_0x456dc1(0x4fd)]||0x0;},Sprite_Gauge[_0x47d9c7(0x2f9)][_0x47d9c7(0x41d)]=function(){const _0x3ae2a8=_0x47d9c7,_0xc8bb9b=VisuMZ[_0x3ae2a8(0x31b)][_0x3ae2a8(0x28d)][_0x3ae2a8(0x464)];if(this[_0x3ae2a8(0x2bc)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else{if(_0xc8bb9b[_0x3ae2a8(0x37b)]){if(_0x3ae2a8(0x20c)===_0x3ae2a8(0x1e4))this[_0x3ae2a8(0x474)]=!![],this[_0x3ae2a8(0x3e8)]();else return _0x3ae2a8(0x39c);}else{if(_0x3ae2a8(0x22f)!==_0x3ae2a8(0x22f)){const _0x1049ed=_0x767c0a[_0x3ae2a8(0x31b)][_0x3ae2a8(0x28d)]['Gauge'];if(this[_0x3ae2a8(0x4ac)]()<=0x0)return _0x3ae2a8(0x3be);else return _0x1049ed[_0x3ae2a8(0x1ab)]?_0x3ae2a8(0x39c):_0x920965[_0x3ae2a8(0x45b)]();}else return ColorManager[_0x3ae2a8(0x45b)]();}}},Sprite_Gauge['prototype']['valueOutlineWidth']=function(){const _0x28eff9=_0x47d9c7;return VisuMZ[_0x28eff9(0x31b)]['Settings'][_0x28eff9(0x464)]['ValueOutlineWidth']||0x0;},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x230)]=Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x4f6)],Sprite_StateIcon['prototype'][_0x47d9c7(0x4f6)]=function(){const _0x56f011=_0x47d9c7;VisuMZ[_0x56f011(0x31b)][_0x56f011(0x230)][_0x56f011(0x439)](this),this[_0x56f011(0x45f)]();},Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x45f)]=function(){const _0x42e8c8=_0x47d9c7,_0xdef10b=Window_Base[_0x42e8c8(0x2f9)][_0x42e8c8(0x4bb)]();this['_turnDisplaySprite']=new Sprite(),this[_0x42e8c8(0x31e)][_0x42e8c8(0x406)]=new Bitmap(ImageManager[_0x42e8c8(0x2aa)],_0xdef10b),this['_turnDisplaySprite'][_0x42e8c8(0x453)]['x']=this['anchor']['x'],this['_turnDisplaySprite']['anchor']['y']=this[_0x42e8c8(0x453)]['y'],this['addChild'](this[_0x42e8c8(0x31e)]),this[_0x42e8c8(0x413)]=this['_turnDisplaySprite'][_0x42e8c8(0x406)];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x33c)]=Sprite_StateIcon[_0x47d9c7(0x2f9)]['updateFrame'],Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x253)]=function(){const _0x3606c1=_0x47d9c7;VisuMZ[_0x3606c1(0x31b)][_0x3606c1(0x33c)][_0x3606c1(0x439)](this),this[_0x3606c1(0x2cb)]();},Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x422)]=function(_0x8ae65f,_0xe9c1b,_0x33672e,_0x991680,_0x44b914){const _0x561606=_0x47d9c7;this[_0x561606(0x413)][_0x561606(0x422)](_0x8ae65f,_0xe9c1b,_0x33672e,_0x991680,this[_0x561606(0x413)][_0x561606(0x1d9)],_0x44b914);},Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x2cb)]=function(){const _0x1d2fd5=_0x47d9c7;this[_0x1d2fd5(0x241)](),this[_0x1d2fd5(0x413)][_0x1d2fd5(0x30d)]();const _0x55390f=this[_0x1d2fd5(0x1ec)];if(!_0x55390f)return;const _0x149cd4=_0x55390f[_0x1d2fd5(0x3e0)]()[_0x1d2fd5(0x311)](_0x44c9d9=>_0x44c9d9['iconIndex']>0x0),_0x17ef57=[...Array(0x8)[_0x1d2fd5(0x442)]()][_0x1d2fd5(0x311)](_0x234f1a=>_0x55390f[_0x1d2fd5(0x4e4)](_0x234f1a)!==0x0),_0x319bf0=this[_0x1d2fd5(0x276)],_0x210d4e=_0x149cd4[_0x319bf0];if(_0x210d4e)Window_Base[_0x1d2fd5(0x2f9)]['drawActorStateTurns'][_0x1d2fd5(0x439)](this,_0x55390f,_0x210d4e,0x0,0x0),Window_Base[_0x1d2fd5(0x2f9)][_0x1d2fd5(0x3da)][_0x1d2fd5(0x439)](this,_0x55390f,_0x210d4e,0x0,0x0);else{if('DiXML'!==_0x1d2fd5(0x42a))this['_statusWindow'][_0x1d2fd5(0x1a8)](this[_0x1d2fd5(0x21f)](0x0));else{const _0x102132=_0x17ef57[_0x319bf0-_0x149cd4[_0x1d2fd5(0x1f8)]];if(_0x102132===undefined)return;Window_Base['prototype'][_0x1d2fd5(0x408)]['call'](this,_0x55390f,_0x102132,0x0,0x0),Window_Base[_0x1d2fd5(0x2f9)][_0x1d2fd5(0x3dd)]['call'](this,_0x55390f,_0x102132,0x0,0x0);}}},Sprite_StateIcon['prototype']['resetFontSettings']=function(){const _0x295f72=_0x47d9c7;this[_0x295f72(0x413)][_0x295f72(0x45a)]=$gameSystem[_0x295f72(0x44a)](),this[_0x295f72(0x413)]['fontSize']=$gameSystem[_0x295f72(0x1a9)](),this[_0x295f72(0x23c)]();},Sprite_StateIcon['prototype'][_0x47d9c7(0x23c)]=function(){const _0x3b8f37=_0x47d9c7;this[_0x3b8f37(0x3d8)](ColorManager[_0x3b8f37(0x19a)]()),this[_0x3b8f37(0x48b)](ColorManager[_0x3b8f37(0x45b)]());},Sprite_StateIcon[_0x47d9c7(0x2f9)]['changeTextColor']=function(_0xd1256a){const _0x29bc05=_0x47d9c7;this['contents'][_0x29bc05(0x2cd)]=_0xd1256a;},Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x48b)]=function(_0x1d960b){const _0x3c2b68=_0x47d9c7;this[_0x3c2b68(0x413)][_0x3c2b68(0x45b)]=_0x1d960b;},Sprite_StateIcon[_0x47d9c7(0x2f9)][_0x47d9c7(0x38d)]=function(){const _0x4a9d6b=_0x47d9c7;this[_0x4a9d6b(0x474)]=!![],this[_0x4a9d6b(0x3e8)]();},Window_Base[_0x47d9c7(0x2f9)][_0x47d9c7(0x42b)]=function(_0x3d470d,_0x8fad7,_0x5b4959,_0x85942a,_0x2a9b28){const _0x51f487=_0x47d9c7,_0x5e727b=this[_0x51f487(0x257)](_0x3d470d,_0x8fad7),_0x1319dc=this[_0x51f487(0x434)](_0x5e727b,_0x5b4959,_0x85942a,_0x2a9b28),_0xfc3d72=_0x5b4959+_0x2a9b28-_0x1319dc[_0x51f487(0x281)];this['drawTextEx'](_0x5e727b,_0xfc3d72,_0x85942a,_0x2a9b28),this['resetFontSettings']();},Window_Base['prototype']['createAllSkillCostText']=function(_0x489ac2,_0x3050dc){const _0x325a7d=_0x47d9c7;let _0x3c6c88='';for(settings of VisuMZ[_0x325a7d(0x31b)][_0x325a7d(0x28d)][_0x325a7d(0x496)]){if(!this['isSkillCostShown'](_0x489ac2,_0x3050dc,settings))continue;if(_0x3c6c88[_0x325a7d(0x1f8)]>0x0)_0x3c6c88+=this[_0x325a7d(0x416)]();_0x3c6c88+=this[_0x325a7d(0x48e)](_0x489ac2,_0x3050dc,settings);}_0x3c6c88=this[_0x325a7d(0x376)](_0x489ac2,_0x3050dc,_0x3c6c88);if(_0x3050dc[_0x325a7d(0x4c8)]['match'](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x3c6c88[_0x325a7d(0x1f8)]>0x0)_0x3c6c88+=this[_0x325a7d(0x416)]();_0x3c6c88+=String(RegExp['$1']);}return _0x3c6c88;},Window_Base[_0x47d9c7(0x2f9)]['makeAdditionalSkillCostText']=function(_0x1c88d7,_0x7d1b72,_0x2e15e8){return _0x2e15e8;},Window_Base['prototype'][_0x47d9c7(0x4a4)]=function(_0xb669ec,_0x2c0290,_0x46b75c){const _0x445c0b=_0x47d9c7;let _0x5c1073=_0x46b75c['CalcJS']['call'](_0xb669ec,_0x2c0290);return _0x5c1073=_0xb669ec[_0x445c0b(0x361)](_0x2c0290,_0x5c1073,_0x46b75c),_0x46b75c[_0x445c0b(0x382)][_0x445c0b(0x439)](_0xb669ec,_0x2c0290,_0x5c1073,_0x46b75c);},Window_Base[_0x47d9c7(0x2f9)][_0x47d9c7(0x48e)]=function(_0x20cf35,_0x2b1589,_0x34527d){const _0x400961=_0x47d9c7;let _0x2930cc=_0x34527d[_0x400961(0x35a)]['call'](_0x20cf35,_0x2b1589);return _0x2930cc=_0x20cf35[_0x400961(0x361)](_0x2b1589,_0x2930cc,_0x34527d),_0x34527d[_0x400961(0x1d1)][_0x400961(0x439)](_0x20cf35,_0x2b1589,_0x2930cc,_0x34527d);},Window_Base['prototype'][_0x47d9c7(0x416)]=function(){return'\x20';},Window_Base[_0x47d9c7(0x2f9)][_0x47d9c7(0x43b)]=function(_0x8362b3,_0x4557b4,_0x2814fc,_0x302bb9){const _0x1c7bbc=_0x47d9c7;if(!_0x8362b3)return;VisuMZ[_0x1c7bbc(0x31b)][_0x1c7bbc(0x3c6)][_0x1c7bbc(0x439)](this,_0x8362b3,_0x4557b4,_0x2814fc,_0x302bb9),this['drawActorIconsAllTurnCounters'](_0x8362b3,_0x4557b4,_0x2814fc,_0x302bb9);},Window_Base[_0x47d9c7(0x2f9)][_0x47d9c7(0x27a)]=function(_0x1a9f42,_0x7491e2,_0x5f3a02,_0x29b974){const _0x3af47a=_0x47d9c7;_0x29b974=_0x29b974||0x90;const _0x150721=ImageManager[_0x3af47a(0x2aa)],_0xa2dd14=_0x1a9f42[_0x3af47a(0x226)]()['slice'](0x0,Math[_0x3af47a(0x49d)](_0x29b974/_0x150721)),_0x24c35e=_0x1a9f42['states']()[_0x3af47a(0x311)](_0x19eb7c=>_0x19eb7c[_0x3af47a(0x21d)]>0x0),_0x57072d=[...Array(0x8)['keys']()][_0x3af47a(0x311)](_0x3eea31=>_0x1a9f42[_0x3af47a(0x4e4)](_0x3eea31)!==0x0),_0x363aed=[];let _0x34079f=_0x7491e2;for(let _0x2745ce=0x0;_0x2745ce<_0xa2dd14[_0x3af47a(0x1f8)];_0x2745ce++){if(_0x3af47a(0x3f3)===_0x3af47a(0x3f3)){this['resetFontSettings']();const _0x4bac60=_0x24c35e[_0x2745ce];if(_0x4bac60)!_0x363aed[_0x3af47a(0x3e9)](_0x4bac60)&&this[_0x3af47a(0x29a)](_0x1a9f42,_0x4bac60,_0x34079f,_0x5f3a02),this[_0x3af47a(0x3da)](_0x1a9f42,_0x4bac60,_0x34079f,_0x5f3a02),_0x363aed['push'](_0x4bac60);else{if(_0x3af47a(0x2c8)!=='YWABD')_0x1c90f8['SkillsStatesCore'][_0x3af47a(0x26b)][_0x3af47a(0x439)](this),this[_0x3af47a(0x458)]()&&this[_0x3af47a(0x260)]();else{const _0x31d978=_0x57072d[_0x2745ce-_0x24c35e[_0x3af47a(0x1f8)]];this[_0x3af47a(0x408)](_0x1a9f42,_0x31d978,_0x34079f,_0x5f3a02),this[_0x3af47a(0x3dd)](_0x1a9f42,_0x31d978,_0x34079f,_0x5f3a02);}}_0x34079f+=_0x150721;}else{const _0x574692=_0x185772(_0x40ec3c['$1'])[_0x3af47a(0x4f3)](/[\r\n]+/)[_0x3af47a(0x489)](_0x1840c1=>_0xc728a4(_0x1840c1)[_0x3af47a(0x1b4)]()[_0x3af47a(0x42e)]());_0x6cde33=_0x1a4d1e['concat'](_0x574692);}}},Window_Base[_0x47d9c7(0x2f9)][_0x47d9c7(0x29a)]=function(_0x5516e0,_0x2da35c,_0x2893ea,_0x5ce6ae){const _0x22d99b=_0x47d9c7;if(!VisuMZ['SkillsStatesCore'][_0x22d99b(0x28d)][_0x22d99b(0x217)][_0x22d99b(0x41b)])return;if(!_0x5516e0[_0x22d99b(0x19f)](_0x2da35c['id']))return;if(_0x2da35c[_0x22d99b(0x223)]===0x0)return;if(_0x2da35c[_0x22d99b(0x4c8)][_0x22d99b(0x1e0)](/<HIDE STATE TURNS>/i))return;const _0x462035=_0x5516e0['stateTurns'](_0x2da35c['id']),_0x258c90=ImageManager[_0x22d99b(0x2aa)],_0x3c4726=ColorManager[_0x22d99b(0x3b1)](_0x2da35c);this[_0x22d99b(0x3d8)](_0x3c4726),this[_0x22d99b(0x48b)]('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x22d99b(0x2b4)]=!![],this[_0x22d99b(0x413)][_0x22d99b(0x30b)]=VisuMZ[_0x22d99b(0x31b)][_0x22d99b(0x28d)][_0x22d99b(0x217)][_0x22d99b(0x1ae)],_0x2893ea+=VisuMZ['SkillsStatesCore'][_0x22d99b(0x28d)][_0x22d99b(0x217)]['TurnOffsetX'],_0x5ce6ae+=VisuMZ[_0x22d99b(0x31b)][_0x22d99b(0x28d)][_0x22d99b(0x217)][_0x22d99b(0x244)],this[_0x22d99b(0x422)](_0x462035,_0x2893ea,_0x5ce6ae,_0x258c90,'right'),this[_0x22d99b(0x413)][_0x22d99b(0x2b4)]=![],this['resetFontSettings']();},Window_Base[_0x47d9c7(0x2f9)][_0x47d9c7(0x3da)]=function(_0x1f5819,_0x582d53,_0x3b61d9,_0x2465d1){const _0x91b075=_0x47d9c7;if(!VisuMZ[_0x91b075(0x31b)]['Settings'][_0x91b075(0x217)]['ShowData'])return;const _0x26948e=ImageManager[_0x91b075(0x2aa)],_0x517d5f=ImageManager[_0x91b075(0x1bf)]/0x2,_0x5e014d=ColorManager[_0x91b075(0x19a)]();this[_0x91b075(0x3d8)](_0x5e014d),this[_0x91b075(0x48b)]('rgba(0,\x200,\x200,\x201)'),this['contents']['fontBold']=!![],this['contents'][_0x91b075(0x30b)]=VisuMZ['SkillsStatesCore']['Settings']['States']['DataFontSize'],_0x3b61d9+=VisuMZ[_0x91b075(0x31b)][_0x91b075(0x28d)][_0x91b075(0x217)][_0x91b075(0x23b)],_0x2465d1+=VisuMZ[_0x91b075(0x31b)][_0x91b075(0x28d)][_0x91b075(0x217)]['DataOffsetY'];const _0x41f164=String(_0x1f5819[_0x91b075(0x40c)](_0x582d53['id']));this['drawText'](_0x41f164,_0x3b61d9,_0x2465d1,_0x26948e,_0x91b075(0x202)),this[_0x91b075(0x413)]['fontBold']=![],this[_0x91b075(0x241)]();},Window_Base['prototype'][_0x47d9c7(0x408)]=function(_0x8d2b3e,_0x440f72,_0x5105c0,_0x238229){const _0x51089f=_0x47d9c7;if(!VisuMZ[_0x51089f(0x31b)][_0x51089f(0x28d)]['Buffs']['ShowTurns'])return;const _0x492d57=_0x8d2b3e[_0x51089f(0x4e4)](_0x440f72);if(_0x492d57===0x0)return;const _0x4fcd35=_0x8d2b3e[_0x51089f(0x2c2)](_0x440f72),_0x51b4e4=ImageManager[_0x51089f(0x2aa)],_0x495ec5=_0x492d57>0x0?ColorManager[_0x51089f(0x356)]():ColorManager[_0x51089f(0x22d)]();this['changeTextColor'](_0x495ec5),this['changeOutlineColor'](_0x51089f(0x39c)),this['contents'][_0x51089f(0x2b4)]=!![],this[_0x51089f(0x413)][_0x51089f(0x30b)]=VisuMZ['SkillsStatesCore'][_0x51089f(0x28d)][_0x51089f(0x3b2)][_0x51089f(0x1ae)],_0x5105c0+=VisuMZ[_0x51089f(0x31b)]['Settings']['Buffs'][_0x51089f(0x25f)],_0x238229+=VisuMZ[_0x51089f(0x31b)][_0x51089f(0x28d)]['Buffs']['TurnOffsetY'],this[_0x51089f(0x422)](_0x4fcd35,_0x5105c0,_0x238229,_0x51b4e4,_0x51089f(0x269)),this[_0x51089f(0x413)][_0x51089f(0x2b4)]=![],this[_0x51089f(0x241)]();},Window_Base['prototype'][_0x47d9c7(0x3dd)]=function(_0x214feb,_0x305dcc,_0x2de56c,_0x440082){const _0x2252b5=_0x47d9c7;if(!VisuMZ[_0x2252b5(0x31b)][_0x2252b5(0x28d)][_0x2252b5(0x3b2)][_0x2252b5(0x3bc)])return;const _0x154ad0=_0x214feb[_0x2252b5(0x40a)](_0x305dcc),_0xac5027=_0x214feb[_0x2252b5(0x4e4)](_0x305dcc),_0x2436fe=ImageManager[_0x2252b5(0x2aa)],_0xf022eb=ImageManager['iconHeight']/0x2,_0x5e9332=_0xac5027>0x0?ColorManager[_0x2252b5(0x356)]():ColorManager[_0x2252b5(0x22d)]();this[_0x2252b5(0x3d8)](_0x5e9332),this[_0x2252b5(0x48b)]('rgba(0,\x200,\x200,\x201)'),this[_0x2252b5(0x413)][_0x2252b5(0x2b4)]=!![],this[_0x2252b5(0x413)][_0x2252b5(0x30b)]=VisuMZ[_0x2252b5(0x31b)][_0x2252b5(0x28d)][_0x2252b5(0x3b2)][_0x2252b5(0x1e2)],_0x2de56c+=VisuMZ[_0x2252b5(0x31b)][_0x2252b5(0x28d)][_0x2252b5(0x3b2)][_0x2252b5(0x23b)],_0x440082+=VisuMZ[_0x2252b5(0x31b)][_0x2252b5(0x28d)]['Buffs'][_0x2252b5(0x3e5)];const _0x1452d2=_0x2252b5(0x48f)[_0x2252b5(0x387)](Math[_0x2252b5(0x25b)](_0x154ad0*0x64));this[_0x2252b5(0x422)](_0x1452d2,_0x2de56c,_0x440082,_0x2436fe,'center'),this['contents'][_0x2252b5(0x2b4)]=![],this['resetFontSettings']();},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x28b)]=Window_StatusBase['prototype'][_0x47d9c7(0x378)],Window_StatusBase['prototype'][_0x47d9c7(0x378)]=function(_0x3f4b31,_0x21e0d7,_0x56d3ba,_0x2e3b7f){const _0x3bed4f=_0x47d9c7;if(_0x3f4b31[_0x3bed4f(0x39e)]())_0x21e0d7=this[_0x3bed4f(0x1c4)](_0x3f4b31,_0x21e0d7);this[_0x3bed4f(0x355)](_0x3f4b31,_0x21e0d7,_0x56d3ba,_0x2e3b7f);},Window_StatusBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x355)]=function(_0x4e266d,_0x56058f,_0x179bbe,_0x3eda2d){const _0x152943=_0x47d9c7;if([_0x152943(0x3bf),_0x152943(0x46d)][_0x152943(0x3e9)](_0x56058f[_0x152943(0x3f1)]()))return;VisuMZ['SkillsStatesCore'][_0x152943(0x28b)][_0x152943(0x439)](this,_0x4e266d,_0x56058f,_0x179bbe,_0x3eda2d);},Window_StatusBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x1c4)]=function(_0x41ee09,_0x11a298){const _0x596544=_0x47d9c7,_0x2f5448=_0x41ee09[_0x596544(0x3d5)]()[_0x596544(0x4c8)];if(_0x11a298==='hp'&&_0x2f5448[_0x596544(0x1e0)](/<REPLACE HP GAUGE:[ ](.*)>/i)){if(_0x596544(0x4cc)===_0x596544(0x4cc))return String(RegExp['$1']);else{_0x2409d7[_0x596544(0x31b)][_0x596544(0x19d)][_0x596544(0x439)](this,_0x52d9a2);if(!this[_0x596544(0x3f9)](_0x331aa3))this[_0x596544(0x447)](_0x3ff11d);}}else{if(_0x11a298==='mp'&&_0x2f5448[_0x596544(0x1e0)](/<REPLACE MP GAUGE:[ ](.*)>/i))return'aWxYE'!==_0x596544(0x44e)?_0x9c596c[_0x596544(0x31b)]['Settings']['Skills'][_0x596544(0x319)]:String(RegExp['$1']);else{if(_0x11a298==='tp'&&_0x2f5448['match'](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x596544(0x402)==='fOkNV')return _0x11a298;else this[_0x596544(0x406)][_0x596544(0x30d)](),this[_0x596544(0x259)]();}}}},VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x47d9c7(0x2f9)][_0x47d9c7(0x43b)],Window_StatusBase['prototype']['drawActorIcons']=function(_0x1a6de0,_0x1ac41e,_0xf4c739,_0x1c1ea3){const _0x3be29a=_0x47d9c7;if(!_0x1a6de0)return;Window_Base[_0x3be29a(0x2f9)][_0x3be29a(0x43b)]['call'](this,_0x1a6de0,_0x1ac41e,_0xf4c739,_0x1c1ea3);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x26a)]=Window_SkillType[_0x47d9c7(0x2f9)]['initialize'],Window_SkillType['prototype']['initialize']=function(_0x37eed1){const _0x17fe52=_0x47d9c7;VisuMZ[_0x17fe52(0x31b)][_0x17fe52(0x26a)][_0x17fe52(0x439)](this,_0x37eed1),this[_0x17fe52(0x2a3)](_0x37eed1);},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x2a3)]=function(_0x4c72a3){const _0x510fbb=_0x47d9c7,_0x24ca84=new Rectangle(0x0,0x0,_0x4c72a3[_0x510fbb(0x281)],_0x4c72a3[_0x510fbb(0x1d9)]);this[_0x510fbb(0x325)]=new Window_Base(_0x24ca84),this['_commandNameWindow'][_0x510fbb(0x349)]=0x0,this[_0x510fbb(0x218)](this[_0x510fbb(0x325)]),this[_0x510fbb(0x22b)]();},Window_SkillType['prototype']['callUpdateHelp']=function(){const _0x366d96=_0x47d9c7;Window_Command[_0x366d96(0x2f9)][_0x366d96(0x2ba)][_0x366d96(0x439)](this);if(this[_0x366d96(0x325)])this[_0x366d96(0x22b)]();},Window_SkillType[_0x47d9c7(0x2f9)]['updateCommandNameWindow']=function(){const _0x3aaa3b=_0x47d9c7,_0x3e239f=this[_0x3aaa3b(0x325)];_0x3e239f[_0x3aaa3b(0x413)][_0x3aaa3b(0x30d)]();const _0x3e8670=this[_0x3aaa3b(0x1e5)](this[_0x3aaa3b(0x3fa)]());if(_0x3e8670===_0x3aaa3b(0x2a0)&&this['maxItems']()>0x0){const _0x3c0134=this[_0x3aaa3b(0x380)](this[_0x3aaa3b(0x3fa)]());let _0xa78ae8=this[_0x3aaa3b(0x478)](this['index']());_0xa78ae8=_0xa78ae8['replace'](/\\I\[(\d+)\]/gi,''),_0x3e239f['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0xa78ae8,_0x3c0134),this[_0x3aaa3b(0x1c8)](_0xa78ae8,_0x3c0134),this[_0x3aaa3b(0x243)](_0xa78ae8,_0x3c0134);}},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x497)]=function(_0x2c51db,_0x19c94d){},Window_SkillType[_0x47d9c7(0x2f9)]['commandNameWindowDrawText']=function(_0x4229dd,_0x5c2832){const _0xc96202=_0x47d9c7,_0xf65cc6=this[_0xc96202(0x325)];_0xf65cc6[_0xc96202(0x422)](_0x4229dd,0x0,_0x5c2832['y'],_0xf65cc6[_0xc96202(0x33d)],_0xc96202(0x202));},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x243)]=function(_0x3c7349,_0x3a178e){const _0x386029=_0x47d9c7,_0x38b161=this[_0x386029(0x325)],_0x1847d2=$gameSystem[_0x386029(0x307)](),_0x4b9079=_0x3a178e['x']+Math[_0x386029(0x49d)](_0x3a178e['width']/0x2)+_0x1847d2;_0x38b161['x']=_0x38b161['width']/-0x2+_0x4b9079,_0x38b161['y']=Math['floor'](_0x3a178e[_0x386029(0x1d9)]/0x2);},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x220)]=function(){const _0x42fa18=_0x47d9c7;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x42fa18(0x2f9)][_0x42fa18(0x220)][_0x42fa18(0x439)](this);},Window_SkillType[_0x47d9c7(0x2f9)]['makeCommandList']=function(){const _0x446dbf=_0x47d9c7;if(!this[_0x446dbf(0x283)])return;const _0x5083a1=this[_0x446dbf(0x283)]['skillTypes']();for(const _0x21d503 of _0x5083a1){if('yUUwB'===_0x446dbf(0x235)){const _0x36dd6f=this[_0x446dbf(0x2da)](_0x21d503);this[_0x446dbf(0x48a)](_0x36dd6f,_0x446dbf(0x3d1),!![],_0x21d503);}else this[_0x446dbf(0x335)]=this[_0x446dbf(0x335)]||{},delete this['_stateOrigin'][_0x383b7d];}},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x2da)]=function(_0x315215){const _0xe86cc4=_0x47d9c7;let _0x520b4a=$dataSystem[_0xe86cc4(0x1b8)][_0x315215];if(_0x520b4a[_0xe86cc4(0x1e0)](/\\I\[(\d+)\]/i))return _0x520b4a;if(this[_0xe86cc4(0x437)]()===_0xe86cc4(0x404))return _0x520b4a;const _0x2e0fbc=VisuMZ[_0xe86cc4(0x31b)]['Settings'][_0xe86cc4(0x43a)],_0x51d4c4=$dataSystem['magicSkills'][_0xe86cc4(0x3e9)](_0x315215),_0x24f4bd=_0x51d4c4?_0x2e0fbc['IconStypeMagic']:_0x2e0fbc[_0xe86cc4(0x296)];return _0xe86cc4(0x222)[_0xe86cc4(0x387)](_0x24f4bd,_0x520b4a);},Window_SkillType['prototype']['itemTextAlign']=function(){const _0x271a70=_0x47d9c7;return VisuMZ[_0x271a70(0x31b)]['Settings'][_0x271a70(0x43a)]['CmdTextAlign'];},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x2e1)]=function(_0x5ab03c){const _0x174e2e=_0x47d9c7,_0x1a5bd6=this[_0x174e2e(0x1e5)](_0x5ab03c);if(_0x1a5bd6===_0x174e2e(0x3b9)){if(_0x174e2e(0x19b)!=='pEGXz')return _0x30f397['SkillsStatesCore'][_0x174e2e(0x38c)][_0x174e2e(0x439)](this);else this['drawItemStyleIconText'](_0x5ab03c);}else _0x1a5bd6===_0x174e2e(0x2a0)?_0x174e2e(0x21e)!==_0x174e2e(0x2c3)?this[_0x174e2e(0x4c6)](_0x5ab03c):(_0x18bb30[_0x174e2e(0x25d)](_0x2e2637,_0x593b50),this[_0x174e2e(0x419)](_0x17ebfd)):Window_Command['prototype']['drawItem'][_0x174e2e(0x439)](this,_0x5ab03c);},Window_SkillType[_0x47d9c7(0x2f9)]['commandStyle']=function(){const _0x3b6b4a=_0x47d9c7;return VisuMZ['SkillsStatesCore'][_0x3b6b4a(0x28d)][_0x3b6b4a(0x43a)]['CmdStyle'];},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x1e5)]=function(_0x882533){const _0x51ce5c=_0x47d9c7;if(_0x882533<0x0)return _0x51ce5c(0x404);const _0x43d596=this[_0x51ce5c(0x437)]();if(_0x43d596!=='auto')return _0x43d596;else{if(this[_0x51ce5c(0x3d7)]()>0x0){const _0x399d86=this['commandName'](_0x882533);if(_0x399d86['match'](/\\I\[(\d+)\]/i)){if('OiOLV'===_0x51ce5c(0x2fa)){const _0x565946=this[_0x51ce5c(0x380)](_0x882533),_0xfe732c=this[_0x51ce5c(0x434)](_0x399d86)[_0x51ce5c(0x281)];if(_0xfe732c<=_0x565946[_0x51ce5c(0x281)])return _0x51ce5c(0x3b9);else{if('vqhOg'===_0x51ce5c(0x1be))return _0x51ce5c(0x2a0);else this[_0x51ce5c(0x2d6)][_0x19864d]=this[_0x51ce5c(0x2cd)](_0x30d95d(_0x40fe7f));}}else _0x50f092[_0x51ce5c(0x31b)][_0x51ce5c(0x4b7)][_0x51ce5c(0x439)](this),this[_0x51ce5c(0x3b3)](),_0x233bd7[_0x51ce5c(0x31b)][_0x51ce5c(0x224)]();}}}return'text';},Window_SkillType[_0x47d9c7(0x2f9)]['drawItemStyleIconText']=function(_0x3e442c){const _0x31e25a=_0x47d9c7,_0x18b5f1=this[_0x31e25a(0x380)](_0x3e442c),_0x42e97f=this[_0x31e25a(0x478)](_0x3e442c),_0x5e5d44=this[_0x31e25a(0x434)](_0x42e97f)[_0x31e25a(0x281)];this[_0x31e25a(0x2db)](this[_0x31e25a(0x475)](_0x3e442c));const _0x3cff11=this[_0x31e25a(0x2ad)]();if(_0x3cff11===_0x31e25a(0x269))this[_0x31e25a(0x34a)](_0x42e97f,_0x18b5f1['x']+_0x18b5f1['width']-_0x5e5d44,_0x18b5f1['y'],_0x5e5d44);else{if(_0x3cff11===_0x31e25a(0x202)){const _0x40b118=_0x18b5f1['x']+Math[_0x31e25a(0x49d)]((_0x18b5f1[_0x31e25a(0x281)]-_0x5e5d44)/0x2);this[_0x31e25a(0x34a)](_0x42e97f,_0x40b118,_0x18b5f1['y'],_0x5e5d44);}else'jpaWf'===_0x31e25a(0x40b)?this[_0x31e25a(0x34a)](_0x42e97f,_0x18b5f1['x'],_0x18b5f1['y'],_0x5e5d44):this[_0x31e25a(0x2a6)](_0x20ae4f['id'])&&_0x4d6ffd['autoRemovalTiming']===_0x3e08ef&&(this[_0x31e25a(0x1ff)](_0x5ccc7b['id']),this['onExpireState'](_0x3b2460['id']),this['onExpireStateGlobalJS'](_0x1df9de['id']));}},Window_SkillType[_0x47d9c7(0x2f9)][_0x47d9c7(0x4c6)]=function(_0x48a559){const _0x4381ea=_0x47d9c7;this[_0x4381ea(0x478)](_0x48a559)[_0x4381ea(0x1e0)](/\\I\[(\d+)\]/i);const _0x440a55=Number(RegExp['$1'])||0x0,_0x57f886=this['itemLineRect'](_0x48a559),_0x54fcdb=_0x57f886['x']+Math['floor']((_0x57f886['width']-ImageManager[_0x4381ea(0x2aa)])/0x2),_0x400309=_0x57f886['y']+(_0x57f886[_0x4381ea(0x1d9)]-ImageManager[_0x4381ea(0x1bf)])/0x2;this['drawIcon'](_0x440a55,_0x54fcdb,_0x400309);},VisuMZ['SkillsStatesCore'][_0x47d9c7(0x2f0)]=Window_SkillStatus[_0x47d9c7(0x2f9)]['refresh'],Window_SkillStatus['prototype']['refresh']=function(){const _0x3e0847=_0x47d9c7;VisuMZ[_0x3e0847(0x31b)]['Window_SkillStatus_refresh'][_0x3e0847(0x439)](this);if(this[_0x3e0847(0x283)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x47d9c7(0x2f9)][_0x47d9c7(0x238)]=function(){const _0x54daa6=_0x47d9c7;if(!Imported[_0x54daa6(0x1e7)])return;if(!Imported[_0x54daa6(0x3ed)])return;const _0x4de3be=this[_0x54daa6(0x32b)]();let _0x30ccb0=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x4b5a46=this['innerWidth']-_0x30ccb0-0x2;if(_0x4b5a46>=0x12c){if(_0x54daa6(0x321)!==_0x54daa6(0x411)){const _0x2f9e25=VisuMZ['CoreEngine']['Settings'][_0x54daa6(0x362)][_0x54daa6(0x37e)],_0x5590bb=Math[_0x54daa6(0x49d)](_0x4b5a46/0x2)-0x18;let _0x346dfb=_0x30ccb0,_0xf2a575=Math[_0x54daa6(0x49d)]((this['innerHeight']-Math[_0x54daa6(0x30f)](_0x2f9e25['length']/0x2)*_0x4de3be)/0x2),_0x45c6df=0x0;for(const _0x4c32b1 of _0x2f9e25){this[_0x54daa6(0x3d6)](_0x346dfb,_0xf2a575,_0x5590bb,_0x4c32b1),_0x45c6df++;if(_0x45c6df%0x2===0x0){if(_0x54daa6(0x395)!==_0x54daa6(0x395)){if(!_0x1b91f4[_0x54daa6(0x388)](_0x1a846c))return!![];}else _0x346dfb=_0x30ccb0,_0xf2a575+=_0x4de3be;}else _0x346dfb+=_0x5590bb+0x18;}}else return _0x54daa6(0x2a0);}this['resetFontSettings']();},Window_SkillStatus[_0x47d9c7(0x2f9)]['drawExtendedParameter']=function(_0x4c8aad,_0x4caf83,_0x113f1b,_0x5874e7){const _0x5317e7=_0x47d9c7,_0x56cb19=this[_0x5317e7(0x32b)]();this[_0x5317e7(0x241)](),this[_0x5317e7(0x21b)](_0x4c8aad,_0x4caf83,_0x113f1b,_0x5874e7,!![]),this['resetTextColor'](),this['contents'][_0x5317e7(0x30b)]-=0x8;const _0x48a078=this[_0x5317e7(0x283)][_0x5317e7(0x499)](_0x5874e7,!![]);this[_0x5317e7(0x413)][_0x5317e7(0x422)](_0x48a078,_0x4c8aad,_0x4caf83,_0x113f1b,_0x56cb19,_0x5317e7(0x269));},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x3c5)]=Window_SkillList['prototype'][_0x47d9c7(0x3e9)],Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x3e9)]=function(_0x420a40){const _0x454176=_0x47d9c7;return this[_0x454176(0x1bd)](_0x420a40);},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x3cc)]=Window_SkillList[_0x47d9c7(0x2f9)]['maxCols'],Window_SkillList['prototype'][_0x47d9c7(0x3f7)]=function(){const _0x5f0cbb=_0x47d9c7;if(SceneManager[_0x5f0cbb(0x336)][_0x5f0cbb(0x33f)]===Scene_Battle)return VisuMZ[_0x5f0cbb(0x31b)][_0x5f0cbb(0x3cc)]['call'](this);else{if(_0x5f0cbb(0x3cd)===_0x5f0cbb(0x389))this[_0x5f0cbb(0x2d8)](_0x3d2db0),this['onEraseStateGlobalJS'](_0x31e86f),_0x5dd0a8[_0x5f0cbb(0x2f9)][_0x5f0cbb(0x43f)][_0x5f0cbb(0x439)](this,_0x221b9f);else return VisuMZ[_0x5f0cbb(0x31b)]['Settings'][_0x5f0cbb(0x43a)][_0x5f0cbb(0x3a3)];}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x21a)]=Window_SkillList['prototype'][_0x47d9c7(0x432)],Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x432)]=function(_0x3a5766){const _0x25e829=_0x47d9c7,_0x55eba0=this[_0x25e829(0x283)]!==_0x3a5766;VisuMZ[_0x25e829(0x31b)][_0x25e829(0x21a)]['call'](this,_0x3a5766);if(_0x55eba0){if(this[_0x25e829(0x20b)]&&this[_0x25e829(0x20b)][_0x25e829(0x33f)]===Window_ShopStatus){if(_0x25e829(0x4fa)==='bJHUk'){const _0x3a6c5f=this['makeCommandName'](_0x5a75e9);this[_0x25e829(0x48a)](_0x3a6c5f,_0x25e829(0x3d1),!![],_0x4befba);}else this[_0x25e829(0x20b)][_0x25e829(0x1a8)](this[_0x25e829(0x21f)](0x0));}}},Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x2ab)]=function(_0x166d57){const _0x10c601=_0x47d9c7;if(this[_0x10c601(0x2f4)]===_0x166d57)return;this['_stypeId']=_0x166d57,this[_0x10c601(0x1e9)](),this[_0x10c601(0x24d)](0x0,0x0),this['_statusWindow']&&this[_0x10c601(0x20b)][_0x10c601(0x33f)]===Window_ShopStatus&&('XIJyI'!==_0x10c601(0x2a7)?_0x43bd06[_0x59356a][_0x471a08][_0x10c601(0x439)](this,_0x50dfd4):this[_0x10c601(0x20b)][_0x10c601(0x1a8)](this['itemAt'](0x0)));},Window_SkillList[_0x47d9c7(0x2f9)]['includesSkillsStatesCore']=function(_0x28ca58){const _0x15baec=_0x47d9c7;if(!_0x28ca58)return VisuMZ['SkillsStatesCore'][_0x15baec(0x3c5)][_0x15baec(0x439)](this,_0x28ca58);if(!this[_0x15baec(0x44f)](_0x28ca58))return![];if(!this[_0x15baec(0x4dd)](_0x28ca58))return![];if(!this['checkShowHideJS'](_0x28ca58))return![];return!![];},Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x44f)]=function(_0x2293e5){const _0x47ab21=_0x47d9c7;return DataManager[_0x47ab21(0x201)](_0x2293e5)[_0x47ab21(0x3e9)](this[_0x47ab21(0x2f4)]);},Window_SkillList['prototype'][_0x47d9c7(0x4dd)]=function(_0x4aa454){const _0xa5562d=_0x47d9c7;if(!VisuMZ[_0xa5562d(0x31b)][_0xa5562d(0x373)](this[_0xa5562d(0x283)],_0x4aa454))return![];if(!VisuMZ[_0xa5562d(0x31b)][_0xa5562d(0x4fc)](this[_0xa5562d(0x283)],_0x4aa454))return![];if(!VisuMZ['SkillsStatesCore']['CheckVisibleSkillNotetags'](this[_0xa5562d(0x283)],_0x4aa454))return![];return!![];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x373)]=function(_0x303bad,_0x581271){const _0x1bf703=_0x47d9c7,_0x21bb22=_0x581271['note'];if(_0x21bb22[_0x1bf703(0x1e0)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1bf703(0x3ff)]())return![];else{if(_0x21bb22[_0x1bf703(0x1e0)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()){if(_0x1bf703(0x445)!==_0x1bf703(0x1a2))return![];else{const _0x1aadf2=_0x4c3471[_0x1bf703(0x31b)][_0x1bf703(0x28d)][_0x1bf703(0x464)];if(_0x1aadf2[_0x1bf703(0x481)]){if(_0x1aadf2[_0x1bf703(0x44c)]===0x1)return this['gaugeColor1']();else{if(_0x1aadf2[_0x1bf703(0x44c)]===0x2)return this[_0x1bf703(0x209)]();}}const _0x3d9830=_0x1aadf2[_0x1bf703(0x4ab)];return _0x2c0a4c[_0x1bf703(0x410)](_0x3d9830);}}else{if(_0x1bf703(0x440)!==_0x1bf703(0x440)){const _0x229364=this[_0x1bf703(0x478)](_0x24fcae);if(_0x229364['match'](/\\I\[(\d+)\]/i)){const _0x2b2ee9=this[_0x1bf703(0x380)](_0x2ebd77),_0x15fdbb=this[_0x1bf703(0x434)](_0x229364)[_0x1bf703(0x281)];return _0x15fdbb<=_0x2b2ee9[_0x1bf703(0x281)]?_0x1bf703(0x3b9):_0x1bf703(0x2a0);}}else return!![];}}},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x4fc)]=function(_0x4f8013,_0x1f0dfc){const _0xfe202e=_0x47d9c7,_0x214c39=_0x1f0dfc[_0xfe202e(0x4c8)];if(_0x214c39[_0xfe202e(0x1e0)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11f688=JSON[_0xfe202e(0x1f7)]('['+RegExp['$1'][_0xfe202e(0x1e0)](/\d+/g)+']');for(const _0x3c7fda of _0x11f688){if(!$gameSwitches[_0xfe202e(0x359)](_0x3c7fda))return![];}return!![];}if(_0x214c39[_0xfe202e(0x1e0)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xfe202e(0x4ef)!==_0xfe202e(0x4ef))return _0x17cea5[_0xfe202e(0x44a)]();else{const _0x519220=JSON[_0xfe202e(0x1f7)]('['+RegExp['$1'][_0xfe202e(0x1e0)](/\d+/g)+']');for(const _0x588ebd of _0x519220){if(!$gameSwitches[_0xfe202e(0x359)](_0x588ebd))return![];}return!![];}}if(_0x214c39[_0xfe202e(0x1e0)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29c345=JSON[_0xfe202e(0x1f7)]('['+RegExp['$1'][_0xfe202e(0x1e0)](/\d+/g)+']');for(const _0x2f111c of _0x29c345){if(_0xfe202e(0x37a)!==_0xfe202e(0x37a))_0x111d33=_0x27eb48['max'](_0x281b8f,_0x17e076);else{if($gameSwitches[_0xfe202e(0x359)](_0x2f111c))return!![];}}return![];}if(_0x214c39[_0xfe202e(0x1e0)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ZCAKg'!==_0xfe202e(0x331)){const _0xc66632=JSON[_0xfe202e(0x1f7)]('['+RegExp['$1'][_0xfe202e(0x1e0)](/\d+/g)+']');for(const _0x2e031a of _0xc66632){if(!$gameSwitches[_0xfe202e(0x359)](_0x2e031a))return!![];}return![];}else{if(!_0x11755a)return;_0x19a653['SkillsStatesCore'][_0xfe202e(0x3c6)][_0xfe202e(0x439)](this,_0x6f966c,_0x1b304b,_0x420b85,_0x602834),this[_0xfe202e(0x27a)](_0xea8443,_0x806f7a,_0xf71b92,_0x33302b);}}if(_0x214c39[_0xfe202e(0x1e0)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xfe202e(0x491)!==_0xfe202e(0x492)){const _0x440f69=JSON[_0xfe202e(0x1f7)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4d6f02 of _0x440f69){if(!$gameSwitches[_0xfe202e(0x359)](_0x4d6f02))return!![];}return![];}else{if(_0x5f2ca3[_0xfe202e(0x359)](_0x412e26))return![];}}if(_0x214c39[_0xfe202e(0x1e0)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a240e=JSON['parse']('['+RegExp['$1'][_0xfe202e(0x1e0)](/\d+/g)+']');for(const _0x2282ee of _0x4a240e){if($gameSwitches[_0xfe202e(0x359)](_0x2282ee))return![];}return!![];}return!![];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x29b)]=function(_0x5c3449,_0x4519a2){const _0x474e6b=_0x47d9c7,_0x17e349=_0x4519a2[_0x474e6b(0x4c8)];if(_0x17e349['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24aff4=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x555030 of _0x24aff4){if(!_0x5c3449[_0x474e6b(0x254)](_0x555030))return![];}return!![];}else{if(_0x17e349['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('qgpKU'!==_0x474e6b(0x4b8)){const _0x23383e=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x1af6c9 of _0x23383e){if(_0x474e6b(0x1af)!==_0x474e6b(0x34c)){const _0x16adb5=DataManager[_0x474e6b(0x214)](_0x1af6c9);if(!_0x16adb5)continue;if(!_0x5c3449['isLearnedSkill'](_0x16adb5))return![];}else{const _0x5dd7c2=_0x25eb9c[_0x474e6b(0x1f7)]('['+_0x5ebf04['$1']['match'](/\d+/g)+']');for(const _0xd9579e of _0x5dd7c2){if(!_0x5220ba[_0x474e6b(0x254)](_0xd9579e))return![];}return!![];}}return!![];}else{if(this[_0x474e6b(0x4ce)](_0x37338))return!![];return _0x4c6200[_0x474e6b(0x31b)]['Game_Action_testApply'][_0x474e6b(0x439)](this,_0x5a3fd6);}}}if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d86c2=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x1b75f5 of _0x2d86c2){if('YdbcR'===_0x474e6b(0x25c)){if(!_0x5c3449[_0x474e6b(0x254)](_0x1b75f5))return![];}else return!![];}return!![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2dc946=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x33b591 of _0x2dc946){const _0x9d6674=DataManager[_0x474e6b(0x214)](_0x33b591);if(!_0x9d6674)continue;if(!_0x5c3449[_0x474e6b(0x254)](_0x9d6674))return![];}return!![];}}if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xef0e6a=JSON['parse']('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x5a6e0c of _0xef0e6a){if(_0x474e6b(0x368)===_0x474e6b(0x1f1)){const _0x5961e5=_0x438207(_0x125ecd['$1']),_0x7b03af=_0x342cb9[_0x474e6b(0x387)](_0x5961e5,_0x474e6b(0x1b7),0x1,_0x474e6b(0x266));_0x5488ed['SkillsStatesCore'][_0x474e6b(0x294)][_0x2a0f0c['id']]=new _0x461c44(_0x474e6b(0x267),_0x7b03af);}else{if(_0x5c3449[_0x474e6b(0x254)](_0x5a6e0c))return!![];}}return![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x474e6b(0x430)===_0x474e6b(0x430)){const _0x123d02=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x5a63bc of _0x123d02){const _0x64bf46=DataManager[_0x474e6b(0x214)](_0x5a63bc);if(!_0x64bf46)continue;if(_0x5c3449[_0x474e6b(0x254)](_0x64bf46))return!![];}return![];}else return this['statusWindowRectSkillsStatesCore']();}}if(_0x17e349['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52012e=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x43c36a of _0x52012e){if(!_0x5c3449[_0x474e6b(0x254)](_0x43c36a))return!![];}return![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('EwmuJ'!=='WsLqp'){const _0x37e5c9=RegExp['$1']['split'](',');for(const _0x2f5411 of _0x37e5c9){const _0x3ab28a=DataManager['getSkillIdWithName'](_0x2f5411);if(!_0x3ab28a)continue;if(!_0x5c3449[_0x474e6b(0x254)](_0x3ab28a))return!![];}return![];}else{if(!_0x2de6f0['SkillsStatesCore'][_0x474e6b(0x28d)][_0x474e6b(0x3b2)][_0x474e6b(0x41b)])return;const _0xe06c4e=_0xf89a0c[_0x474e6b(0x4e4)](_0xd6ceae);if(_0xe06c4e===0x0)return;const _0x21a4dc=_0x295570['buffTurns'](_0x457521),_0x1bf3f1=_0x4a0102[_0x474e6b(0x2aa)],_0x5c7ff5=_0xe06c4e>0x0?_0x4f3209[_0x474e6b(0x356)]():_0x40dc3b['debuffColor']();this[_0x474e6b(0x3d8)](_0x5c7ff5),this[_0x474e6b(0x48b)](_0x474e6b(0x39c)),this[_0x474e6b(0x413)][_0x474e6b(0x2b4)]=!![],this['contents'][_0x474e6b(0x30b)]=_0x27a6c8['SkillsStatesCore'][_0x474e6b(0x28d)][_0x474e6b(0x3b2)][_0x474e6b(0x1ae)],_0x295380+=_0x4b4eaf[_0x474e6b(0x31b)][_0x474e6b(0x28d)][_0x474e6b(0x3b2)][_0x474e6b(0x25f)],_0x2712dd+=_0x3b87f6['SkillsStatesCore'][_0x474e6b(0x28d)][_0x474e6b(0x3b2)][_0x474e6b(0x244)],this['drawText'](_0x21a4dc,_0x3a637c,_0x1deaf5,_0x1bf3f1,_0x474e6b(0x269)),this[_0x474e6b(0x413)]['fontBold']=![],this[_0x474e6b(0x241)]();}}}if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3002b4=JSON['parse']('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x1bd7a4 of _0x3002b4){if(!_0x5c3449['isLearnedSkill'](_0x1bd7a4))return!![];}return![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x474e6b(0x421)!==_0x474e6b(0x421)){const _0x159bed=_0x3d7cc1[_0x474e6b(0x2e9)],_0x2a3a76=_0x4c70df[_0x474e6b(0x2e9)];if(_0x159bed!==_0x2a3a76)return _0x2a3a76-_0x159bed;return _0x586307-_0x51f4ae;}else{const _0x317e3d=RegExp['$1']['split'](',');for(const _0x2b36b9 of _0x317e3d){const _0x3ac1f2=DataManager[_0x474e6b(0x214)](_0x2b36b9);if(!_0x3ac1f2)continue;if(!_0x5c3449[_0x474e6b(0x254)](_0x3ac1f2))return!![];}return![];}}}if(_0x17e349['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbf6fe9=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x1e67aa of _0xbf6fe9){if(_0x474e6b(0x3de)!==_0x474e6b(0x278)){if(_0x5c3449[_0x474e6b(0x254)](_0x1e67aa))return![];}else{let _0xbc56b8=_0x282d67[_0x474e6b(0x35a)][_0x474e6b(0x439)](this,_0xc552e9);return _0xbc56b8=this[_0x474e6b(0x361)](_0x25138a,_0xbc56b8,_0x5c3739),_0xbc56b8;}}return!![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('KfWHo'!=='nLvWn'){const _0x35ea5d=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x52bb62 of _0x35ea5d){const _0x30b1d=DataManager[_0x474e6b(0x214)](_0x52bb62);if(!_0x30b1d)continue;if(_0x5c3449[_0x474e6b(0x254)](_0x30b1d))return![];}return!![];}else return this[_0x474e6b(0x451)]()?this[_0x474e6b(0x2c7)]():_0x2dc8a5[_0x474e6b(0x31b)][_0x474e6b(0x38c)]['call'](this);}}if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17b4e1=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x5ba978 of _0x17b4e1){if(_0x474e6b(0x49f)===_0x474e6b(0x49f)){if(!_0x5c3449[_0x474e6b(0x388)](_0x5ba978))return![];}else{if(this[_0x474e6b(0x403)](_0x474e6b(0x443)))return this[_0x474e6b(0x4f4)]();if(this[_0x474e6b(0x4b9)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x474e6b(0x273)](),this[_0x474e6b(0x4b9)]=_0x53ae28,this[_0x474e6b(0x4f4)]();}}return!![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x474e6b(0x23d)===_0x474e6b(0x23d)){const _0x11bea9=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x48c2b9 of _0x11bea9){const _0x4092e4=DataManager['getSkillIdWithName'](_0x48c2b9);if(!_0x4092e4)continue;if(!_0x5c3449[_0x474e6b(0x388)](_0x4092e4))return![];}return!![];}else this[_0x474e6b(0x1ad)](_0x4e61fd)&&(_0x4a3932+=this[_0x474e6b(0x2c2)](_0x20a4f6),this[_0x474e6b(0x25d)](_0x5302c4,_0x132fcb));}}if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x474e6b(0x211)!==_0x474e6b(0x211)){for(_0x541d64 of _0x4a01fa['SkillsStatesCore'][_0x474e6b(0x28d)][_0x474e6b(0x496)]){if(_0x55d09b[_0x474e6b(0x316)][_0x474e6b(0x1b4)]()==='MP'){let _0x533e02=_0x1d7ead[_0x474e6b(0x35a)]['call'](this,_0x521916);return _0x533e02=this[_0x474e6b(0x361)](_0x3bf9ea,_0x533e02,_0x10af12),_0x533e02;}}return _0x564af1[_0x474e6b(0x31b)][_0x474e6b(0x1c6)][_0x474e6b(0x439)](this,_0x281e86);}else{const _0x3572ec=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x29d39d of _0x3572ec){if(_0x474e6b(0x3cf)!==_0x474e6b(0x3cf)){const _0x2fc6f2=_0x812120['parse']('['+_0x5ae869['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x24b166 of _0x2fc6f2){if(!_0x1d135f[_0x474e6b(0x254)](_0x24b166))return![];}return!![];}else{if(!_0x5c3449['hasSkill'](_0x29d39d))return![];}}return!![];}}else{if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x481135=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x271f0c of _0x481135){const _0x32b281=DataManager[_0x474e6b(0x214)](_0x271f0c);if(!_0x32b281)continue;if(!_0x5c3449[_0x474e6b(0x388)](_0x32b281))return![];}return!![];}}if(_0x17e349['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a766e=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x7d9463 of _0x5a766e){if(_0x5c3449['hasSkill'](_0x7d9463))return!![];}return![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5a6edc=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x3d29b6 of _0x5a6edc){if('HbVEL'==='zfAnf'){if(!_0x4ba53a[_0x474e6b(0x359)](_0x45df85))return!![];}else{const _0x2b2949=DataManager[_0x474e6b(0x214)](_0x3d29b6);if(!_0x2b2949)continue;if(_0x5c3449[_0x474e6b(0x388)](_0x2b2949))return!![];}}return![];}}if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf68f=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x5cde7d of _0xf68f){if(!_0x5c3449['hasSkill'](_0x5cde7d))return!![];}return![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x474e6b(0x291)!==_0x474e6b(0x291)){for(_0x45369b of _0x76e3a1[_0x474e6b(0x31b)][_0x474e6b(0x28d)][_0x474e6b(0x496)]){if(_0x34628e['Name'][_0x474e6b(0x1b4)]()==='TP'){let _0x16f832=_0x73b09d['CalcJS']['call'](this,_0xa966ef);return _0x16f832=this['adjustSkillCost'](_0x2a4197,_0x16f832,_0x15e61b),_0x16f832;}}return _0xc5eb52[_0x474e6b(0x31b)][_0x474e6b(0x2b9)][_0x474e6b(0x439)](this,_0x1cdb40);}else{const _0x1bab8b=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x209ee2 of _0x1bab8b){if(_0x474e6b(0x1ac)!==_0x474e6b(0x304)){const _0x29e4a2=DataManager[_0x474e6b(0x214)](_0x209ee2);if(!_0x29e4a2)continue;if(!_0x5c3449[_0x474e6b(0x388)](_0x29e4a2))return!![];}else _0xd8a846[_0x474e6b(0x31b)][_0x474e6b(0x28d)][_0x474e6b(0x3b2)][_0x474e6b(0x28f)][_0x474e6b(0x439)](this,_0x1c2286);}return![];}}}if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49a145=JSON[_0x474e6b(0x1f7)]('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x28ccbf of _0x49a145){if(!_0x5c3449['hasSkill'](_0x28ccbf))return!![];}return![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('PavOo'!==_0x474e6b(0x446))this[_0x474e6b(0x38f)](),_0x1191c2[_0x474e6b(0x31b)][_0x474e6b(0x444)][_0x474e6b(0x439)](this),this[_0x474e6b(0x2f7)](),this[_0x474e6b(0x2ed)]();else{const _0x5dd4a0=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0x58cfc3 of _0x5dd4a0){const _0x4dd634=DataManager[_0x474e6b(0x214)](_0x58cfc3);if(!_0x4dd634)continue;if(!_0x5c3449[_0x474e6b(0x388)](_0x4dd634))return!![];}return![];}}}if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x229277=JSON['parse']('['+RegExp['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x4c5ec6 of _0x229277){if(_0x5c3449[_0x474e6b(0x388)](_0x4c5ec6))return![];}return!![];}else{if(_0x17e349[_0x474e6b(0x1e0)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x39da51=RegExp['$1'][_0x474e6b(0x4f3)](',');for(const _0xea1f77 of _0x39da51){if('AWVbQ'===_0x474e6b(0x42d)){const _0x40ce30=DataManager['getSkillIdWithName'](_0xea1f77);if(!_0x40ce30)continue;if(_0x5c3449[_0x474e6b(0x388)](_0x40ce30))return![];}else{const _0x25839e=_0xc4811d[_0x474e6b(0x1f7)]('['+_0x227d5f['$1'][_0x474e6b(0x1e0)](/\d+/g)+']');for(const _0x1560cf of _0x25839e){if(!_0x57fe70[_0x474e6b(0x359)](_0x1560cf))return![];}return!![];}}return!![];}}return!![];},Window_SkillList['prototype'][_0x47d9c7(0x3a2)]=function(_0x4f984e){const _0x5d0e80=_0x47d9c7,_0x13bc40=_0x4f984e[_0x5d0e80(0x4c8)],_0x337b07=VisuMZ[_0x5d0e80(0x31b)][_0x5d0e80(0x263)];if(_0x337b07[_0x4f984e['id']]){if('sqsoy'!==_0x5d0e80(0x46a))return _0x337b07[_0x4f984e['id']][_0x5d0e80(0x439)](this,_0x4f984e);else _0x6e6245[_0x5d0e80(0x281)]-=this['shopStatusWidth']();}else return!![];},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x379)]=Window_SkillList[_0x47d9c7(0x2f9)]['drawItem'],Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x2e1)]=function(_0x11f2b2){const _0x2cff97=_0x47d9c7,_0x1ef959=this[_0x2cff97(0x21f)](_0x11f2b2),_0x5ddd8b=_0x1ef959?_0x1ef959[_0x2cff97(0x396)]:'';if(_0x1ef959)this[_0x2cff97(0x2e4)](_0x1ef959);VisuMZ['SkillsStatesCore'][_0x2cff97(0x379)][_0x2cff97(0x439)](this,_0x11f2b2);if(_0x1ef959)_0x1ef959['name']=_0x5ddd8b;},Window_SkillList['prototype'][_0x47d9c7(0x2e4)]=function(_0x214bd0){const _0x3db7f4=_0x47d9c7;if(_0x214bd0&&_0x214bd0[_0x3db7f4(0x4c8)][_0x3db7f4(0x1e0)](/<LIST NAME:[ ](.*)>/i)){if('qQvVN'==='hMAat')return _0x30b5cf=_0x3196f8[_0x3db7f4(0x27e)](-0x2,0x2),_0x3808a4[_0x3db7f4(0x31b)]['Game_BattlerBase_buffIconIndex']['call'](this,_0x520932,_0x15869a);else{_0x214bd0[_0x3db7f4(0x396)]=String(RegExp['$1'])[_0x3db7f4(0x42e)]();for(;;){if('NWwYm'!==_0x3db7f4(0x48c)){let _0x1be107=_0x16ac86[_0x3db7f4(0x31b)][_0x3db7f4(0x44d)][_0x3db7f4(0x439)](this);return _0x5efaf5[_0x3db7f4(0x288)]&&(_0x1be107=_0x1be107[_0x3db7f4(0x49a)](this[_0x3db7f4(0x4cd)]()[_0x3db7f4(0x311)](_0x1903e5=>_0x1903e5[_0x3db7f4(0x4b1)]()))),_0x1be107;}else{if(_0x214bd0[_0x3db7f4(0x396)][_0x3db7f4(0x1e0)](/\\V\[(\d+)\]/gi))_0x214bd0[_0x3db7f4(0x396)]=_0x214bd0[_0x3db7f4(0x396)]['replace'](/\\V\[(\d+)\]/gi,(_0x3bea90,_0x3c113a)=>$gameVariables[_0x3db7f4(0x359)](parseInt(_0x3c113a)));else{if(_0x3db7f4(0x383)!==_0x3db7f4(0x383)){const _0x554f02=_0x3d3d60[_0x3db7f4(0x1f7)]('['+_0x175769['$1'][_0x3db7f4(0x1e0)](/\d+/g)+']');for(const _0x2bc0fd of _0x554f02){if(!_0x4e75c9[_0x3db7f4(0x388)](_0x2bc0fd))return![];}return!![];}else break;}}}}}},Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x42b)]=function(_0x4750b8,_0x21969f,_0xf8462f,_0x2fe9d3){const _0x258242=_0x47d9c7;Window_Base[_0x258242(0x2f9)][_0x258242(0x42b)]['call'](this,this[_0x258242(0x283)],_0x4750b8,_0x21969f,_0xf8462f,_0x2fe9d3);},Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x36e)]=function(_0x443ebb){const _0x298915=_0x47d9c7;this['_statusWindow']=_0x443ebb,this[_0x298915(0x2ba)]();},VisuMZ[_0x47d9c7(0x31b)][_0x47d9c7(0x255)]=Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x1cb)],Window_SkillList[_0x47d9c7(0x2f9)][_0x47d9c7(0x1cb)]=function(){const _0x498fb2=_0x47d9c7;VisuMZ[_0x498fb2(0x31b)][_0x498fb2(0x255)]['call'](this),this[_0x498fb2(0x20b)]&&this[_0x498fb2(0x20b)][_0x498fb2(0x33f)]===Window_ShopStatus&&(_0x498fb2(0x300)!==_0x498fb2(0x300)?this[_0x498fb2(0x3a9)](_0x22ecfe,_0x3b60fb):this['_statusWindow'][_0x498fb2(0x1a8)](this[_0x498fb2(0x4df)]()));};