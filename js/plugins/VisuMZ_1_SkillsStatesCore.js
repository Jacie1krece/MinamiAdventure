//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.43;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.43] [SkillsStatesCore]
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
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
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
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
* @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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

const _0x124c5c=_0x2e73;function _0x2e73(_0x5c73fe,_0x56f128){const _0x32356b=_0x3235();return _0x2e73=function(_0x2e73a6,_0x1889a7){_0x2e73a6=_0x2e73a6-0xb0;let _0x183c9e=_0x32356b[_0x2e73a6];return _0x183c9e;},_0x2e73(_0x5c73fe,_0x56f128);}function _0x3235(){const _0x2da6a3=['sort','857946SUMWBb','CanPayJS','oZRMf','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_Action_applyItemUserEffect','_turnDisplaySprite','xqBaD','menuActor','Game_BattlerBase_skillMpCost','Game_Actor_forgetSkill','ZHGdd','stateMaximumTurns','format','KIzVX','ColorNeutral','center','totalStateCategory','ltwQk','BGRqj','_endingBattle','paySkillCost','mainFontSize','tyoEQ','ActorIDs','getStypeIdWithName','StateTurnsEnemyChangeTo','GaugeDrawJS','loadBitmap','Game_Variables_onChange','stateHpSlipDamageJS','Game_BattlerBase_increaseBuff','LabelOutlineWidth','LKuKj','skills','UDwPB','skillTpCost','Skills','addChild','_phase','canPaySkillCost','stateTpSlipHealJS','VisuMZ_1_ItemsEquipsCore','Parse_Notetags_State_SlipEffectJS','sYfyP','Parse_Notetags_Skill_JS','CheckVisibleSwitchNotetags','foYAH','_stateDisplay','eraseState','csYXU','cdVPJ','VisuMZ_1_MainMenuCore','MatchLabelGaugeColor','removeStatesByCategory','kJZZi','applyDebuffTurnManipulationEffects','meetsSkillConditions','gWnUQ','removeOtherStatesOfSameCategory','makeCommandName','clamp','exit','Sprite_Gauge_initMembers','clearStateRetainType','setStateTurns','ShowTurns','Game_BattlerBase_isStateResist','user','OVMuf','ColorPositive','Window_SkillList_includes','regenerateAllSkillsStatesCore','usableSkills','calcWindowHeight','_result','icon','setBuffTurns','refresh','NUM','ListWindowCols','onEraseStateGlobalJS','isStateRemoved','_statusWindow','checkCacheKey','process_VisuMZ_SkillsStatesCore_Skill_Notetags','ReKqW','_checkingPassiveStates','testSkillStatesCoreNotetags','Scene_Skill_helpWindowRect','buffLength','active','uZgwu','onExpireBuffGlobalJS','stateMpSlipHealJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','shift','Scene_Boot_onDatabaseLoaded','qSxJu','redrawSkillsStatesCore','onExpireStateCustomJS','LayoutStyle','isGroupDefeatStateAffected','onExpireState','checkShowHideNotetags','AAckG','Game_Actor_learnSkill','gQXfv','currentClass','DataOffsetX','uPQJb','skillTypeWindowRectSkillsStatesCore','prepareResetStateCounts','meetsSkillConditionsGlobalJS','statusWindowRect','createShopStatusWindow','death','SkillSceneAdjustSkillList','commandStyleCheck','Parse_Notetags_State_ApplyRemoveLeaveJS','uiInputPosition','_stateOrigin','Game_Battler_isStateAddable','_passiveStateResults','skillMpCost','_stypeId','iconText','_stored_state-%1-color','addPassiveStatesFromOtherPlugins','MDF','auto','buffIconIndex','Game_BattlerBase_recoverAll','getStateRetainType','<actor-%1>','paramValueByName','outlineColor','FPZTs','autoRemovalTiming','parameters','onAddState','Parse_Notetags_State_Category','statePassiveConditionJS','helpWindowRectSkillsStatesCore','_scene','jmAHx','ARRAYNUM','rgba(0,\x200,\x200,\x201)','pJqZk','_buffs','clearStates','Sprite_Gauge_setup','useDigitGrouping','onEraseBuff','increaseBuff','numberFontFace','Window_StatusBase_placeGauge','onAddDebuff','979565NCrkcG','debuffTurns','<troop-%1>','RrlOX','6vWJccq','vHNXZ','bTGns','ZHnBV','canUse','ATK','uOqkH','retrieveStateColor','_tempBattler','remove','drawActorStateTurns','split','width','allBattleMembers','stateTurns','_stateIDs','fontSize','Ijbur','DataFontSize','addPassiveStatesByNotetag','kOupZ','XsqsS','LUK','isStateRestrict','GrDVp','mQJSj','setItem','_stateSteps','_stateData','index','bThgF','_stateTurns','skillId','regenerateAll','Sprite_Gauge_currentValue','helpWindowRect','length','updateHelp','TWAxd','meetsPassiveStateConditionJS','slipHp','changeOutlineColor','YDrIO','debuffColor','callUpdateHelp','_skillTypeWindow','drawTextEx','innerWidth','mainAreaHeight','stateColor','lDuAh','hasSkill','makeAdditionalSkillCostText','onAddStateMakeCustomSlipValues','#%1','Game_BattlerBase_eraseState','aSaHu','stateId','ezPBz','eyhXJ','Parse_Notetags_Skill_Cost','stateMpSlipDamageJS','ShowData','isDebuffAffected','gainMp','bitmap','2090349EBRVVs','_lastStatesActionEndFrameCount','Name','isSkillTypeMatchForUse','onEraseBuffJS','getStateIdWithName','ARRAYSTR','getStateData','convertTargetToStateOriginKey','StateID','createAllSkillCostText','bUmby','skillCostSeparator','reset','Game_Switches_onChange','mGwVl','Window_StatusBase_drawActorIcons','drawIcon','number','priority','statesByCategory','toUpperCase','getStateReapplyRulings','TXkON','createTurnDisplaySprite','addBuff','SkillSceneStatusBgType','STRUCT','SkillsStatesCore','Game_BattlerBase_eraseBuff','_commandNameWindow','boxWidth','vQziU','Kbzir','gaugeRate','onEraseStateCustomJS','eraseBuff','_buffTurns','blJGB','onAddStateGlobalJS','TJvdJ','GaugeCurrentJS','PayJS','slipMp','ALInA','Game_Battler_onBattleEnd','WzJZq','TurnOffsetX','Game_BattlerBase_states','ZWOCw','setStateOrigin','YSldr','isMaxDebuffAffected','FEOci','ParseAllNotetags','statusWidth','getStateOriginByKey','maxCols','updatedLayoutStyle','isCommandEnabled','WaBtq','VisuMZ_2_ClassChangeSystem','initialize','onAddBuff','forgetSkill','textSizeEx','initMembersSkillsStatesCore','WYeVz','createItemWindow','replace','isPartyAllAffectedByGroupDefeatStates','hasState','MCMSo','constructor','zQABB','buffTurns','siNrZ','ParseClassIDs','status','initMembers','anchor','drawActorIconsAllTurnCounters','mainFontFace','BEtcS','checkSkillTypeMatch','textColor','Game_Unit_isAllDead','7YYkNdD','onAddBuffJS','PassiveConditionJS','INLOS','VisuMZ_1_ElementStatusCore','clearStateData','coKhs','bVfUx','drawExtendedSkillsStatesCoreStatus','Scene_Skill_itemWindowRect','Window_SkillList_maxCols','fBzPx','drawItemStyleIconText','EFqBD','members','includesSkillsStatesCore','getColor','_colorCache','stateTpSlipDamageJS','VwSKL','Turns','onDatabaseLoaded','mrRpY','_checkingTraitsSetSkillsStatesCore','parse','hzwPr','buttonAssistSwitch','Settings','right','indexOf','StateTurnsActorChangeBy','ceil','return\x200','getCurrentStateActiveUser','rRaaV','eSzrr','onAddBuffGlobalJS','wOqpo','Game_BattlerBase_decreaseBuff','_stateMaxTurns','meetsPassiveStateConditionSwitches','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','CmdWidth','iconWidth','CKwKR','Gtdjl','ZLEHX','commandName','ZSory','mERKe','makeCurrentTroopUniqueID','fyzdq','PdJZk','recover\x20all','add','buff','hJNtE','YWGdr','kFqMI','ValueOutlineWidth','mPaJg','Game_BattlerBase_meetsSkillConditions','itemWindowRectSkillsStatesCore','YATkc','VXPyu','_currentActor','mHPQH','isAllDead','eZBGV','onExpireDebuffJS','convertPassiveStates','createPassiveStatesCache','CNUAf','test','eHzJX','currentMaxValue','updateCommandNameWindow','meetsSkillConditionsEnableJS','GMlyo','Parse_Notetags_State_PassiveJS','_states','RGqwT','DnmKv','removeBuffsAuto','onRemoveState','WsTKn','getSkillIdWithName','Actor','isStateExpired','AXYXL','enemy','keys','adjustSkillCost','TextJS','NMNpz','currentValue','magicSkills','tpCost','Game_Battler_addDebuff','Buffs','setStateRetainType','qggyT','isUseSkillsStatesCoreUpdatedLayout','OZxwn','ParseSkillNotetags','drawItem','_stypeIDs','_classIDs','KqStH','getStateDisplay','SScgz','eivsv','isActor','currentMaxValueSkillsStatesCore','isRightInputMode','INiDf','States','isBuffOrDebuffAffected','isBuffPrevented','_stored_debuffColor','MAT','ARRAYJSON','item','kdKEr','isStateCategoryResisted','pnOUA','slipTp','buffColor','greater','drawText','setStatusWindow','enemyId','AGerd','<member-%1>','mainCommandWidth','commandNameWindowCenter','Sprite_Gauge_gaugeRate','SkillConditionJS','drawExtendedParameter','4GlvclT','RnfzG','5847950mPXSms','KzayM','stateCategoriesResisted','ShowJS','iduhn','RjpaB','rgrfT','addState','Game_Unit_deadMembers','applyStateCategoryRemovalEffects','_skillIDs','BuwOj','Game_Action_testApply','onExpireBuffJS','helpAreaHeight','MatchLabelColor','map','WdQMf','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','2277896keYCrl','oEqCr','changePaintOpacity','rGbWY','mainAreaTop','fontFace','note','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','WLZtq','NEGATIVE','uiMenuStyle','shopStatusWidth','clearStateOrigin','log','setup','onAddStateJS','VisuMZ_0_CoreEngine','Sprite_StateIcon_loadBitmap','isSkillCostShown','onEraseDebuff','217925AxkrVj','_stateRetainType','GroupDigits','_costSettings','cZjMx','adjustItemWidthByShopStatus','passiveStates','ARRAYSTRUCT','JmJBe','Sprite_StateIcon_updateFrame','clearStateDisplay','removeState','RJLFx','makeSuccess','ParseStateNotetags','ipyYZ','_skills','EnableLayout','isAlive','AEvuh','ignore','Param','YLeMI','cPUfR','MAXHP','meetsPassiveStateConditions','STR','SkillActorPaySkillCost','process_VisuMZ_SkillsStatesCore_Notetags','HGCAF','onChange','ANauK','_categoryWindow','Game_BattlerBase_buffIconIndex','QufDM','updateVisibility','commandStyle','ValueFontMainType','addBuffTurns','inBattle','sogTr','YYzrY','trim','CheckVisibleSkillNotetags','skillEnableJS','onBattleEnd','oWxRH','setPassiveStateSlipDamageJS','UBkBm','setActor','LabelFontMainType','zGbNp','labelOutlineWidth','Wmutc','deadMembers','AutoAddState','uoItJ','innerHeight','mpDamage','exPkF','rgba(0,\x200,\x200,\x200)','_currentTroopUniqueID','Game_BattlerBase_die','removeStatesAuto','ValueOutlineSolid','VBCaq','applyItemUserEffect','statusWindowRectSkillsStatesCore','BattleManager_endAction','isStateResist','HIaCP','addCommand','meetsPassiveStateGlobalConditionJS','Window_SkillStatus_refresh','resetStateCounts','MultiplierJS','onAddDebuffGlobalJS','SkillEnemyPaySkillCost','gaugeColor1','setDebuffTurns','wBTWs','traitsSet','kLAvh','lineHeight','isUseModernControls','drawActorBuffTurns','Sprite_Gauge_redraw','Enemy','_checkingVisuMzPassiveStateObjects','Game_BattlerBase_refresh','Sprite_Gauge_currentMaxValue','itemWindowRect','bOgXK','equips','max','ACNGd','EomBY','states','POSITIVE','abeVx','isPlaytest','shopStatusWindowRectSkillsStatesCore','floor','EVAL','TurnEndOnMap','KfwUD','redraw','_animationIndex','DataOffsetY','qvIxX','npHSO','Game_BattlerBase_resetStateCounts','_cache','Game_BattlerBase_skillTpCost','isSkillUsableForAutoBattle','learnSkill','process_VisuMZ_SkillsStatesCore_State_Notetags','Game_BattlerBase_clearStates','zhazd','Game_Battler_regenerateAll','createCommandNameWindow','NhNgw','gaugeBackColor','HTrLf','WQPIi','GiOrk','SQaLk','getCurrentTroopUniqueID','applyBuffTurnManipulationEffects','ColorBuff','passiveStateObjects','cpbxe','FgGdF','CalcJS','onExpireDebuff','isStateAffected','Game_Actor_skillTypes','EnemyIndex','itemLineRect','windowPadding','categories','alterSkillName','placeExactGauge','Scene_Skill_createItemWindow','bFTJd','onAddStateCustomJS','updateStateTurns','BQDnL','Game_BattlerBase_overwriteBuffTurns','aDGQC','height','eBxNB','isSkillHidden','JfwzO','toLowerCase','getClassIdWithName','DEF','itemTextAlign','RefreshCacheSwitch','Game_Troop_setup','Scene_Skill_skillTypeWindowRect','drawFullGauge','lpuJD','StackBuffMax','ReapplyRules','stateHpSlipHealJS','damage','jOdiu','TBlQj','rZmWy','ftnpL','Gauge','eFeiw','clear','multiclasses','LhKhL','clearStatesWithStateRetain','_actor','_hidden','_subject','ViSnr','labelFontSize','onEraseDebuffJS','heal','Game_Battler_addBuff','normalColor','onAddDebuffJS','ColorNegative','action','getColorDataFromPluginParameters','drawItemStyleIcon','applyStateTurnManipulationEffects','zYDLI','labelOutlineColor','skill','aRJdj','addPassiveStatesByPluginParameters','currentDisplayedValue','actorId','addDebuffTurns','RSAvn','skillVisibleJS','restriction','ukNKa','EKyhu','contents','oHVuP','currentValueSkillsStatesCore','call','JRzsy','onEraseBuffGlobalJS','stateExpireJS','prototype','icmXz','Game_Battler_addState','ctNZb','WAqff','LhuIY','XpdXb','Window_SkillType_initialize','VYwGC','TurnFontSize','resetTextColor','HiddenSkillTypes','testApply','FdEGa','onExpireStateGlobalJS','name','iconHeight','allowCreateShopStatusWindow','isLearnedSkill','iconIndex','commandNameWindowDrawText','AUTPD','isStateAddable','groupDefeat','_battler','stypeId','MaxTurns','clearAllStateOrigins','onRegenerateCustomStateDamageOverTime','clWfK','push','itemAt','CWHVS','maxItems','563886PMmGGj','removeStatesByCategoryAll','aNSZN','meetsPassiveStateConditionClasses','fontBold','MAXMP','updateTurnDisplaySprite','placeGauge','uiHelpPosition','TurnOffsetY','drawActorStateData','SkillID','text','PresetLabelGaugeColor','_tempActor','Window_SkillList_drawItem','EWAeb','CheckIncompatibleStates','StateTurnsActorChangeTo','Sjksq','onEraseStateJS','setupSkillsStatesCore','bFSkb','drawActorBuffRates','CmdStyle','hpDamage','slice','traitObjects','Costs','OGwSC','ActionEndUpdate','isBuffAffected','valueFontFace','stateEraseJS','actions','PEAdq','includes','skillTypeWindowRect','aCzZF','endAction','addWindow','recoverAll','isPassiveStateStackable','totalStateCategoryAffected','ConvertParams','gaugeLineHeight','ZloDc','SNnfF','ipSgK','SkillMenuStatusRect','concat','Game_BattlerBase_initMembers','getSkillTypes','description','stateData','resetFontSettings','round','FxTxu','_itemWindow','filter','isSceneBattle','createSkillCostText','skillTypes','checkSkillConditionsNotetags','stateAddJS','_shopStatusWindow','addStateTurns','helpAreaTop','checkSkillConditionsSwitchNotetags','Scene_Skill_statusWindowRect','allIcons','PassiveStates','AGI','canClearState','updateFrame','JUEJL','LvWkD','DisplayedParams','vXBRh','paramBuffRate','commandNameWindowDrawBackground','removeBuff','QQYGQ','CheckVisibleBattleNotetags','changeTextColor','Rbtxy','%1%','LabelOutlineSolid','GouBJ','cnUNj','updateStatesActionEnd','registerCommand','valueOutlineWidth','StackDebuffMax','Window_SkillList_setActor','checkShowHideJS','onEraseDebuffGlobalJS','die','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','CoreEngine','IconStypeMagic','frameCount','yqoRR','none','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawSkillCost','recalculateSlipDamageJS','getCurrentStateOriginKey','hasStateCategory','isStateCategoryAffected','actor','value','match','XFEac','rzqDp','FQIgD','drawActorIcons','convertGaugeTypeSkillsStatesCore','Window_SkillList_updateHelp','rRtOi','overwriteBuffTurns','decreaseBuff'];_0x3235=function(){return _0x2da6a3;};return _0x3235();}(function(_0x6c4d2e,_0x2c4925){const _0x403ed0=_0x2e73,_0x4b93b0=_0x6c4d2e();while(!![]){try{const _0xb11f06=-parseInt(_0x403ed0(0x147))/0x1+parseInt(_0x403ed0(0x359))/0x2*(parseInt(_0x403ed0(0x23d))/0x3)+parseInt(_0x403ed0(0x11e))/0x4*(-parseInt(_0x403ed0(0x355))/0x5)+parseInt(_0x403ed0(0x2b8))/0x6+parseInt(_0x403ed0(0x3f2))/0x7*(-parseInt(_0x403ed0(0x133))/0x8)+-parseInt(_0x403ed0(0x39b))/0x9+parseInt(_0x403ed0(0x120))/0xa;if(_0xb11f06===_0x2c4925)break;else _0x4b93b0['push'](_0x4b93b0['shift']());}catch(_0x410a26){_0x4b93b0['push'](_0x4b93b0['shift']());}}}(_0x3235,0x58184));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x124c5c(0x278)](function(_0x5179b1){const _0x346e79=_0x124c5c;return _0x5179b1[_0x346e79(0x3e9)]&&_0x5179b1[_0x346e79(0x272)][_0x346e79(0x261)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x124c5c(0x40d)]||{},VisuMZ[_0x124c5c(0x269)]=function(_0x2aae0c,_0xf75824){const _0x20be5b=_0x124c5c;for(const _0x1dae76 in _0xf75824){if(_0x20be5b(0x313)===_0x20be5b(0x2e6)){const _0x41953b=this[_0x20be5b(0x1d1)](_0x1c06b6),_0x2d3bea=this[_0x20be5b(0xc2)](_0x3f4caa),_0x5eaec0=this['textSizeEx'](_0x2d3bea)[_0x20be5b(0x365)];this[_0x20be5b(0x135)](this[_0x20be5b(0x3d6)](_0x2a04ed));const _0x46d892=this[_0x20be5b(0x1e4)]();if(_0x46d892==='right')this[_0x20be5b(0x387)](_0x2d3bea,_0x41953b['x']+_0x41953b[_0x20be5b(0x365)]-_0x5eaec0,_0x41953b['y'],_0x5eaec0);else{if(_0x46d892==='center'){const _0x307d14=_0x41953b['x']+_0x1a814c[_0x20be5b(0x1ad)]((_0x41953b[_0x20be5b(0x365)]-_0x5eaec0)/0x2);this['drawTextEx'](_0x2d3bea,_0x307d14,_0x41953b['y'],_0x5eaec0);}else this[_0x20be5b(0x387)](_0x2d3bea,_0x41953b['x'],_0x41953b['y'],_0x5eaec0);}}else{if(_0x1dae76[_0x20be5b(0x2ad)](/(.*):(.*)/i)){const _0x138cb1=String(RegExp['$1']),_0x4f4a7c=String(RegExp['$2'])['toUpperCase']()[_0x20be5b(0x171)]();let _0x1057e4,_0x53cbac,_0x3b617f;switch(_0x4f4a7c){case _0x20be5b(0x306):_0x1057e4=_0xf75824[_0x1dae76]!==''?Number(_0xf75824[_0x1dae76]):0x0;break;case _0x20be5b(0x349):_0x53cbac=_0xf75824[_0x1dae76]!==''?JSON[_0x20be5b(0x40a)](_0xf75824[_0x1dae76]):[],_0x1057e4=_0x53cbac['map'](_0x1edacb=>Number(_0x1edacb));break;case _0x20be5b(0x1ae):_0x1057e4=_0xf75824[_0x1dae76]!==''?eval(_0xf75824[_0x1dae76]):null;break;case'ARRAYEVAL':_0x53cbac=_0xf75824[_0x1dae76]!==''?JSON[_0x20be5b(0x40a)](_0xf75824[_0x1dae76]):[],_0x1057e4=_0x53cbac[_0x20be5b(0x130)](_0x528ce5=>eval(_0x528ce5));break;case'JSON':_0x1057e4=_0xf75824[_0x1dae76]!==''?JSON['parse'](_0xf75824[_0x1dae76]):'';break;case _0x20be5b(0x10c):_0x53cbac=_0xf75824[_0x1dae76]!==''?JSON['parse'](_0xf75824[_0x1dae76]):[],_0x1057e4=_0x53cbac[_0x20be5b(0x130)](_0x10399b=>JSON[_0x20be5b(0x40a)](_0x10399b));break;case'FUNC':_0x1057e4=_0xf75824[_0x1dae76]!==''?new Function(JSON['parse'](_0xf75824[_0x1dae76])):new Function(_0x20be5b(0xb3));break;case'ARRAYFUNC':_0x53cbac=_0xf75824[_0x1dae76]!==''?JSON[_0x20be5b(0x40a)](_0xf75824[_0x1dae76]):[],_0x1057e4=_0x53cbac['map'](_0x2e2129=>new Function(JSON[_0x20be5b(0x40a)](_0x2e2129)));break;case _0x20be5b(0x161):_0x1057e4=_0xf75824[_0x1dae76]!==''?String(_0xf75824[_0x1dae76]):'';break;case _0x20be5b(0x3a1):_0x53cbac=_0xf75824[_0x1dae76]!==''?JSON[_0x20be5b(0x40a)](_0xf75824[_0x1dae76]):[],_0x1057e4=_0x53cbac[_0x20be5b(0x130)](_0x194c5d=>String(_0x194c5d));break;case _0x20be5b(0x3b6):_0x3b617f=_0xf75824[_0x1dae76]!==''?JSON[_0x20be5b(0x40a)](_0xf75824[_0x1dae76]):{},_0x2aae0c[_0x138cb1]={},VisuMZ['ConvertParams'](_0x2aae0c[_0x138cb1],_0x3b617f);continue;case _0x20be5b(0x14e):_0x53cbac=_0xf75824[_0x1dae76]!==''?JSON['parse'](_0xf75824[_0x1dae76]):[],_0x1057e4=_0x53cbac[_0x20be5b(0x130)](_0x5a8fc0=>VisuMZ[_0x20be5b(0x269)]({},JSON[_0x20be5b(0x40a)](_0x5a8fc0)));break;default:continue;}_0x2aae0c[_0x138cb1]=_0x1057e4;}}}return _0x2aae0c;},(_0x288077=>{const _0x2328d8=_0x124c5c,_0x373ff9=_0x288077[_0x2328d8(0x22a)];for(const _0x23196a of dependencies){if(!Imported[_0x23196a]){alert(_0x2328d8(0x29f)[_0x2328d8(0x2c4)](_0x373ff9,_0x23196a)),SceneManager[_0x2328d8(0x2f5)]();break;}}const _0x35569f=_0x288077['description'];if(_0x35569f[_0x2328d8(0x2ad)](/\[Version[ ](.*?)\]/i)){if(_0x2328d8(0x1a7)!==_0x2328d8(0x1a7))this[_0x2328d8(0x129)](_0x465931),this[_0x2328d8(0x206)](_0x5d5bcb),this[_0x2328d8(0x1c7)](_0x40154b),this[_0x2328d8(0x2ef)](_0x586280);else{const _0x39fe84=Number(RegExp['$1']);_0x39fe84!==VisuMZ[label]['version']&&(alert(_0x2328d8(0x2bb)[_0x2328d8(0x2c4)](_0x373ff9,_0x39fe84)),SceneManager[_0x2328d8(0x2f5)]());}}if(_0x35569f['match'](/\[Tier[ ](\d+)\]/i)){const _0x28037d=Number(RegExp['$1']);if(_0x28037d<tier){if(_0x2328d8(0x320)===_0x2328d8(0x320))alert(_0x2328d8(0x2a5)[_0x2328d8(0x2c4)](_0x373ff9,_0x28037d,tier)),SceneManager['exit']();else return this[_0x2328d8(0x167)]&&this[_0x2328d8(0x167)]['isUseModernControls']();}else{if(_0x2328d8(0x26b)==='yLGHQ'){const _0x513d6e=this['_commandNameWindow'],_0x2385c7=_0x28b03a['windowPadding'](),_0x2a717f=_0x4cb801['x']+_0x442004[_0x2328d8(0x1ad)](_0x25020c[_0x2328d8(0x365)]/0x2)+_0x2385c7;_0x513d6e['x']=_0x513d6e[_0x2328d8(0x365)]/-0x2+_0x2a717f,_0x513d6e['y']=_0xac1ea9[_0x2328d8(0x1ad)](_0x44a196[_0x2328d8(0x1dd)]/0x2);}else tier=Math['max'](_0x28037d,tier);}}VisuMZ[_0x2328d8(0x269)](VisuMZ[label][_0x2328d8(0x40d)],_0x288077[_0x2328d8(0x342)]);})(pluginData),PluginManager[_0x124c5c(0x298)](pluginData[_0x124c5c(0x22a)],_0x124c5c(0x162),_0x129235=>{const _0x28e392=_0x124c5c;VisuMZ[_0x28e392(0x269)](_0x129235,_0x129235);const _0x1088c7=_0x129235['ActorIDs']||[],_0x2dcf58=Number(_0x129235[_0x28e392(0x248)]),_0x1bdf5e=$dataSkills[_0x2dcf58];if(!_0x1bdf5e)return;for(const _0x312932 of _0x1088c7){const _0xd3603=$gameActors['actor'](_0x312932);if(!_0xd3603)continue;_0xd3603[_0x28e392(0x2cc)](_0x1bdf5e);}}),PluginManager[_0x124c5c(0x298)](pluginData['name'],_0x124c5c(0x194),_0x41676d=>{const _0x2ebfdb=_0x124c5c;VisuMZ[_0x2ebfdb(0x269)](_0x41676d,_0x41676d);const _0x1b78cb=_0x41676d[_0x2ebfdb(0x1d0)]||[],_0x4e2188=Number(_0x41676d['SkillID']),_0xac7527=$dataSkills[_0x4e2188];if(!_0xac7527)return;for(const _0x33c07a of _0x1b78cb){if('hzwPr'!==_0x2ebfdb(0x40b)){if(this[_0x2ebfdb(0x24b)]||this[_0x2ebfdb(0x361)])return;const _0x359347=_0x13fb29['SkillsStatesCore'][_0x2ebfdb(0x25e)];if(_0x359347[_0x211bf1])_0x359347[_0xab0722][_0x2ebfdb(0x217)](this,_0x21ffa1);}else{const _0x4a4c2e=$gameTroop[_0x2ebfdb(0x400)]()[_0x33c07a];if(!_0x4a4c2e)continue;_0x4a4c2e[_0x2ebfdb(0x2cc)](_0xac7527);}}}),PluginManager[_0x124c5c(0x298)](pluginData[_0x124c5c(0x22a)],_0x124c5c(0xb1),_0x43bab3=>{const _0x5103f6=_0x124c5c;VisuMZ['ConvertParams'](_0x43bab3,_0x43bab3);const _0x2ec6fe=_0x43bab3[_0x5103f6(0x2cf)]||[],_0x49e5bf=Number(_0x43bab3[_0x5103f6(0x3a4)]),_0x4b9523=Number(_0x43bab3[_0x5103f6(0x406)]),_0x3d6b2f=_0x43bab3[_0x5103f6(0x17e)];for(const _0x1c4701 of _0x2ec6fe){const _0x48ed8b=$gameActors[_0x5103f6(0x2ab)](_0x1c4701);if(!_0x48ed8b)continue;if(_0x3d6b2f&&!_0x48ed8b[_0x5103f6(0x1ce)](_0x49e5bf)){if(_0x5103f6(0x230)!==_0x5103f6(0x17f))_0x48ed8b[_0x5103f6(0x127)](_0x49e5bf),_0x48ed8b[_0x5103f6(0x2f8)](_0x49e5bf,_0x4b9523);else{if(this[_0x5103f6(0x3e1)]())return!![];return _0x208579[_0x5103f6(0x3b7)][_0x5103f6(0x3f1)][_0x5103f6(0x217)](this);}}else _0x48ed8b[_0x5103f6(0x27f)](_0x49e5bf,_0x4b9523);}}),PluginManager[_0x124c5c(0x298)](pluginData[_0x124c5c(0x22a)],_0x124c5c(0x24f),_0x40497a=>{const _0x375e3f=_0x124c5c;VisuMZ[_0x375e3f(0x269)](_0x40497a,_0x40497a);const _0x52fcc5=_0x40497a[_0x375e3f(0x2cf)]||[],_0x159235=Number(_0x40497a[_0x375e3f(0x3a4)]),_0x12c368=Math[_0x375e3f(0x1a5)](Number(_0x40497a[_0x375e3f(0x406)]),0x0),_0x25432b=_0x40497a[_0x375e3f(0x17e)];for(const _0x418d59 of _0x52fcc5){const _0x45e450=$gameActors[_0x375e3f(0x2ab)](_0x418d59);if(!_0x45e450)continue;if(_0x25432b&&!_0x45e450[_0x375e3f(0x1ce)](_0x159235)){if(_0x375e3f(0xc3)===_0x375e3f(0x238)){if(this['isBuffAffected'](_0x44f266)){const _0x30992a=_0x3c550f[_0x375e3f(0x3b7)][_0x375e3f(0x40d)]['Buffs'][_0x375e3f(0x235)];this['_buffTurns'][_0x8d269d]=_0x77fea5[_0x375e3f(0x2f4)](0x0,_0x30992a);}}else _0x45e450[_0x375e3f(0x127)](_0x159235);}_0x45e450[_0x375e3f(0x2f8)](_0x159235,_0x12c368);}}),PluginManager[_0x124c5c(0x298)](pluginData[_0x124c5c(0x22a)],'StateTurnsEnemyChangeBy',_0x4330ea=>{const _0x1f9ed7=_0x124c5c;if(!$gameParty[_0x1f9ed7(0x16e)]())return;VisuMZ[_0x1f9ed7(0x269)](_0x4330ea,_0x4330ea);const _0x114215=_0x4330ea[_0x1f9ed7(0x1d0)]||[],_0x2f5275=Number(_0x4330ea[_0x1f9ed7(0x3a4)]),_0x3258f8=Number(_0x4330ea[_0x1f9ed7(0x406)]),_0x29300f=_0x4330ea['AutoAddState'];for(const _0x52de58 of _0x114215){if(_0x1f9ed7(0x1c4)==='GiOrk'){const _0x6e4cc2=$gameTroop['members']()[_0x52de58];if(!_0x6e4cc2)continue;if(_0x29300f&&!_0x6e4cc2[_0x1f9ed7(0x1ce)](_0x2f5275))_0x6e4cc2['addState'](_0x2f5275),_0x6e4cc2[_0x1f9ed7(0x2f8)](_0x2f5275,_0x3258f8);else{if(_0x1f9ed7(0x340)!==_0x1f9ed7(0x1a3))_0x6e4cc2['addStateTurns'](_0x2f5275,_0x3258f8);else{if(_0x5efd8f[_0x1f9ed7(0x2ac)](_0x364756))return![];}}}else this[_0x1f9ed7(0x233)]&&this[_0x1f9ed7(0x14a)]?(this[_0x1f9ed7(0x39a)][_0x1f9ed7(0x1f4)](),this['redrawSkillsStatesCore']()):_0x5e7be5[_0x1f9ed7(0x3b7)]['Sprite_Gauge_redraw'][_0x1f9ed7(0x217)](this);}}),PluginManager[_0x124c5c(0x298)](pluginData[_0x124c5c(0x22a)],_0x124c5c(0x2d1),_0x292d35=>{const _0xd326de=_0x124c5c;if(!$gameParty[_0xd326de(0x16e)]())return;VisuMZ[_0xd326de(0x269)](_0x292d35,_0x292d35);const _0x5b2524=_0x292d35[_0xd326de(0x1d0)]||[],_0x4eec7f=Number(_0x292d35[_0xd326de(0x3a4)]),_0x154665=Math[_0xd326de(0x1a5)](Number(_0x292d35[_0xd326de(0x406)]),0x0),_0x3c8cbf=_0x292d35[_0xd326de(0x17e)];for(const _0xcb7b00 of _0x5b2524){if(_0xd326de(0x102)===_0xd326de(0x2ba)){if(_0x1723a4[_0xd326de(0x2ac)](_0x3a60d4))return!![];}else{const _0x23878f=$gameTroop[_0xd326de(0x400)]()[_0xcb7b00];if(!_0x23878f)continue;if(_0x3c8cbf&&!_0x23878f[_0xd326de(0x1ce)](_0x4eec7f)){if('UKBSX'!=='DEtyh')_0x23878f[_0xd326de(0x127)](_0x4eec7f);else{_0x10ca85[_0xd326de(0x2ad)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x1f41cb=_0x1660e2[_0xd326de(0xb0)](_0x3be983(_0x3bf96f['$1'])[_0xd326de(0x3b0)]()),_0x5a5163=_0x1ce738(_0x1ebc28['$2']);_0x1f41cb>=0x0&&(_0x6ace6e[_0xd326de(0x304)](_0x1f41cb,_0x5a5163),this[_0xd326de(0x154)](_0x2a5229));}}_0x23878f['setStateTurns'](_0x4eec7f,_0x154665);}}}),VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x318)]=Scene_Boot['prototype'][_0x124c5c(0x407)],Scene_Boot[_0x124c5c(0x21b)]['onDatabaseLoaded']=function(){const _0x4ff48e=_0x124c5c;VisuMZ[_0x4ff48e(0x3b7)][_0x4ff48e(0x318)][_0x4ff48e(0x217)](this),this[_0x4ff48e(0x163)](),VisuMZ[_0x4ff48e(0x3b7)][_0x4ff48e(0x24e)]();},Scene_Boot[_0x124c5c(0x21b)][_0x124c5c(0x163)]=function(){const _0x2ed2a8=_0x124c5c;if(VisuMZ[_0x2ed2a8(0x3d1)])return;this[_0x2ed2a8(0x30c)](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot['prototype'][_0x124c5c(0x30c)]=function(){const _0x153234=_0x124c5c;for(const _0xf13f45 of $dataSkills){if(_0x153234(0x3c1)==='blJGB'){if(!_0xf13f45)continue;VisuMZ[_0x153234(0x3b7)][_0x153234(0x395)](_0xf13f45),VisuMZ[_0x153234(0x3b7)][_0x153234(0x2e4)](_0xf13f45);}else _0x20dece[_0x153234(0x127)](_0x5b0368);}},Scene_Boot[_0x124c5c(0x21b)][_0x124c5c(0x1bb)]=function(){const _0x288dbd=_0x124c5c;for(const _0x321d24 of $dataStates){if(!_0x321d24)continue;VisuMZ[_0x288dbd(0x3b7)][_0x288dbd(0x344)](_0x321d24),VisuMZ[_0x288dbd(0x3b7)][_0x288dbd(0xe2)](_0x321d24),VisuMZ[_0x288dbd(0x3b7)]['Parse_Notetags_State_SlipEffectJS'](_0x321d24),VisuMZ[_0x288dbd(0x3b7)][_0x288dbd(0x32e)](_0x321d24);}},VisuMZ['SkillsStatesCore'][_0x124c5c(0xfb)]=VisuMZ[_0x124c5c(0xfb)],VisuMZ[_0x124c5c(0xfb)]=function(_0x4fa854){const _0x2ee96a=_0x124c5c;VisuMZ[_0x2ee96a(0x3b7)][_0x2ee96a(0xfb)][_0x2ee96a(0x217)](this,_0x4fa854),VisuMZ[_0x2ee96a(0x3b7)][_0x2ee96a(0x395)](_0x4fa854),VisuMZ['SkillsStatesCore'][_0x2ee96a(0x2e4)](_0x4fa854);},VisuMZ[_0x124c5c(0x3b7)]['ParseStateNotetags']=VisuMZ[_0x124c5c(0x155)],VisuMZ[_0x124c5c(0x155)]=function(_0x10ef75){const _0xf281bc=_0x124c5c;VisuMZ['SkillsStatesCore'][_0xf281bc(0x155)][_0xf281bc(0x217)](this,_0x10ef75),VisuMZ[_0xf281bc(0x3b7)]['Parse_Notetags_State_Category'](_0x10ef75),VisuMZ['SkillsStatesCore'][_0xf281bc(0xe2)](_0x10ef75),VisuMZ[_0xf281bc(0x3b7)][_0xf281bc(0x2e2)](_0x10ef75),VisuMZ[_0xf281bc(0x3b7)][_0xf281bc(0x32e)](_0x10ef75);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x395)]=function(_0x489f8d){const _0x24b4e7=_0x124c5c,_0x1d84c5=_0x489f8d[_0x24b4e7(0x139)];if(_0x1d84c5['match'](/<MP COST:[ ](\d+)>/i)){if('LKuKj'===_0x24b4e7(0x2d8))_0x489f8d['mpCost']=Number(RegExp['$1']);else return![];}if(_0x1d84c5[_0x24b4e7(0x2ad)](/<TP COST:[ ](\d+)>/i)){if(_0x24b4e7(0x2ce)!==_0x24b4e7(0x2ce)){const _0x3d708b=_0xd920b6[_0x24b4e7(0x40a)]('['+_0x3750f8['$1']['match'](/\d+/g)+']');for(const _0x7b142e of _0x3d708b){if(!_0x43ec3d[_0x24b4e7(0x38c)](_0x7b142e))return!![];}return![];}else _0x489f8d[_0x24b4e7(0xf4)]=Number(RegExp['$1']);}},VisuMZ['SkillsStatesCore']['skillEnableJS']={},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x210)]={},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2e4)]=function(_0x3b507c){const _0x5b8dc0=_0x124c5c,_0x5f2a8e=_0x3b507c['note'];if(_0x5f2a8e['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if(_0x5b8dc0(0x391)==='wCbUi'){const _0x446ca5=_0x1cf2cd[_0x5b8dc0(0x2d0)](_0x2e63fe);if(_0x446ca5)this['_stypeIDs'][_0x538f1f['id']][_0x5b8dc0(0x239)](_0x446ca5);}else{const _0x7b391b=String(RegExp['$1']),_0x4ed796='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x7b391b);VisuMZ[_0x5b8dc0(0x3b7)][_0x5b8dc0(0x173)][_0x3b507c['id']]=new Function(_0x5b8dc0(0x209),_0x4ed796);}}if(_0x5f2a8e[_0x5b8dc0(0x2ad)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4e17bf=String(RegExp['$1']),_0x8525cc=_0x5b8dc0(0x316)['format'](_0x4e17bf);VisuMZ[_0x5b8dc0(0x3b7)]['skillVisibleJS'][_0x3b507c['id']]=new Function(_0x5b8dc0(0x209),_0x8525cc);}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x344)]=function(_0x2116d2){const _0x571625=_0x124c5c;_0x2116d2[_0x571625(0x1d3)]=['ALL','ANY'];const _0x3f89b8=_0x2116d2[_0x571625(0x139)],_0x4e2392=_0x3f89b8[_0x571625(0x2ad)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x4e2392){if(_0x571625(0x156)!==_0x571625(0x1f6))for(const _0x3c9c5b of _0x4e2392){_0x3c9c5b['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3b8621=String(RegExp['$1'])[_0x571625(0x3b0)]()[_0x571625(0x171)]()[_0x571625(0x364)](',');for(const _0x586b25 of _0x3b8621){_0x2116d2[_0x571625(0x1d3)][_0x571625(0x239)](_0x586b25['trim']());}}else return this['updatedLayoutStyle']()[_0x571625(0x2ad)](/RIGHT/i);}if(_0x3f89b8['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if('GtFod'!=='RyKHT'){const _0x163e56=RegExp['$1'][_0x571625(0x364)](/[\r\n]+/);for(const _0x32fc4f of _0x163e56){_0x571625(0x20f)===_0x571625(0x20f)?_0x2116d2[_0x571625(0x1d3)]['push'](_0x32fc4f[_0x571625(0x3b0)]()[_0x571625(0x171)]()):this[_0x571625(0x14a)]=_0x114d32[0x0];}}else return this[_0x571625(0x3e2)](_0x2205bb[_0x2a0969]);}_0x3f89b8[_0x571625(0x2ad)](/<POSITIVE STATE>/i)&&_0x2116d2[_0x571625(0x1d3)][_0x571625(0x239)](_0x571625(0x1a9));if(_0x3f89b8[_0x571625(0x2ad)](/<NEGATIVE STATE>/i)){if(_0x571625(0x17c)!==_0x571625(0x38b))_0x2116d2[_0x571625(0x1d3)]['push'](_0x571625(0x13c));else return _0x1215f0=_0x2a9601[_0x571625(0x3b0)]()['trim'](),this[_0x571625(0x1a8)]()[_0x571625(0x278)](_0x5cf29e=>_0x5cf29e['categories'][_0x571625(0x261)](_0x578471));}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x345)]={},VisuMZ[_0x124c5c(0x3b7)]['Parse_Notetags_State_PassiveJS']=function(_0x4d32a0){const _0xb3c23d=_0x124c5c,_0x299646=_0x4d32a0[_0xb3c23d(0x139)];if(_0x299646['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x290185=String(RegExp['$1']),_0x5effe2=_0xb3c23d(0xbc)[_0xb3c23d(0x2c4)](_0x290185);VisuMZ[_0xb3c23d(0x3b7)]['statePassiveConditionJS'][_0x4d32a0['id']]=new Function('state',_0x5effe2);}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2d5)]={},VisuMZ[_0x124c5c(0x3b7)]['stateHpSlipHealJS']={},VisuMZ[_0x124c5c(0x3b7)]['stateMpSlipDamageJS']={},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x315)]={},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x404)]={},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2e0)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS']=function(_0x6e2616){const _0x5543e8=_0x124c5c,_0x132bf6=_0x6e2616['note'],_0x3d8fc6=_0x5543e8(0x132);if(_0x132bf6[_0x5543e8(0x2ad)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x41a24=String(RegExp['$1']),_0x5b6b8e=_0x3d8fc6[_0x5543e8(0x2c4)](_0x41a24,_0x5543e8(0x1ed),-0x1,_0x5543e8(0x381));VisuMZ[_0x5543e8(0x3b7)][_0x5543e8(0x2d5)][_0x6e2616['id']]=new Function(_0x5543e8(0x392),_0x5b6b8e);}else{if(_0x132bf6['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if(_0x5543e8(0x175)!==_0x5543e8(0x175)){const _0x5ea76e=_0x469407[_0x5543e8(0x40a)]('['+_0x1e5071['$1']['match'](/\d+/g)+']');for(const _0x1d69b5 of _0x5ea76e){if(_0x26b81e[_0x5543e8(0x2ac)](_0x1d69b5))return!![];}return![];}else{const _0x294fb2=String(RegExp['$1']),_0x246f72=_0x3d8fc6[_0x5543e8(0x2c4)](_0x294fb2,_0x5543e8(0x1fe),0x1,_0x5543e8(0x381));VisuMZ['SkillsStatesCore'][_0x5543e8(0x1ec)][_0x6e2616['id']]=new Function('stateId',_0x246f72);}}}if(_0x132bf6[_0x5543e8(0x2ad)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if('YIakl'!==_0x5543e8(0xdb)){const _0x3707db=String(RegExp['$1']),_0x349534=_0x3d8fc6['format'](_0x3707db,'damage',-0x1,_0x5543e8(0x3c6));VisuMZ[_0x5543e8(0x3b7)][_0x5543e8(0x396)][_0x6e2616['id']]=new Function(_0x5543e8(0x392),_0x349534);}else{if(_0x2c4040[_0x5543e8(0x22d)](_0x139773))return![];}}else{if(_0x132bf6[_0x5543e8(0x2ad)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x12f852=String(RegExp['$1']),_0x5c7e67=_0x3d8fc6['format'](_0x12f852,_0x5543e8(0x1fe),0x1,_0x5543e8(0x3c6));VisuMZ['SkillsStatesCore'][_0x5543e8(0x315)][_0x6e2616['id']]=new Function(_0x5543e8(0x392),_0x5c7e67);}}if(_0x132bf6[_0x5543e8(0x2ad)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x5c05e9=String(RegExp['$1']),_0x216988=_0x3d8fc6[_0x5543e8(0x2c4)](_0x5c05e9,'damage',-0x1,'slipTp');VisuMZ[_0x5543e8(0x3b7)][_0x5543e8(0x404)][_0x6e2616['id']]=new Function('stateId',_0x216988);}else{if(_0x132bf6[_0x5543e8(0x2ad)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x5543e8(0x170)!==_0x5543e8(0x199)){const _0x39ba7c=String(RegExp['$1']),_0x4ffd09=_0x3d8fc6[_0x5543e8(0x2c4)](_0x39ba7c,_0x5543e8(0x1fe),0x1,_0x5543e8(0x111));VisuMZ['SkillsStatesCore'][_0x5543e8(0x2e0)][_0x6e2616['id']]=new Function(_0x5543e8(0x392),_0x4ffd09);}else return _0x41ff29[_0x5543e8(0x352)]();}}},VisuMZ['SkillsStatesCore'][_0x124c5c(0x27d)]={},VisuMZ[_0x124c5c(0x3b7)]['stateEraseJS']={},VisuMZ[_0x124c5c(0x3b7)]['stateExpireJS']={},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x32e)]=function(_0x23b513){const _0x1731fa=_0x124c5c,_0x41be8b=_0x23b513['note'],_0x4e8edb=_0x1731fa(0x13a);if(_0x41be8b[_0x1731fa(0x2ad)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0xecdea8=String(RegExp['$1']),_0x38da26=_0x4e8edb['format'](_0xecdea8);VisuMZ[_0x1731fa(0x3b7)]['stateAddJS'][_0x23b513['id']]=new Function(_0x1731fa(0x392),_0x38da26);}if(_0x41be8b[_0x1731fa(0x2ad)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x1731fa(0x36a)===_0x1731fa(0x34b))_0x4f076f['SkillsStatesCore'][_0x1731fa(0x40d)][_0x1731fa(0xf6)]['onAddBuffJS'][_0x1731fa(0x217)](this,_0x14fd8d,_0x2ee4c1);else{const _0x53e8d8=String(RegExp['$1']),_0x2e6ca5=_0x4e8edb[_0x1731fa(0x2c4)](_0x53e8d8);VisuMZ[_0x1731fa(0x3b7)][_0x1731fa(0x25e)][_0x23b513['id']]=new Function(_0x1731fa(0x392),_0x2e6ca5);}}if(_0x41be8b['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x39a7f1=String(RegExp['$1']),_0x25adcf=_0x4e8edb[_0x1731fa(0x2c4)](_0x39a7f1);VisuMZ[_0x1731fa(0x3b7)][_0x1731fa(0x21a)][_0x23b513['id']]=new Function(_0x1731fa(0x392),_0x25adcf);}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x24e)]=function(){const _0x4dd49d=_0x124c5c;if(!VisuMZ[_0x4dd49d(0x3b7)][_0x4dd49d(0x40d)][_0x4dd49d(0x107)][_0x4dd49d(0x25b)])return;for(const _0xcfbba of $dataStates){if(!_0xcfbba)continue;_0xcfbba[_0x4dd49d(0x211)]===0x4&&_0xcfbba[_0x4dd49d(0x341)]===0x1&&(_0xcfbba[_0x4dd49d(0x341)]=0x2);}},DataManager[_0x124c5c(0x1e2)]=function(_0x3a570c){const _0x15f895=_0x124c5c;_0x3a570c=_0x3a570c[_0x15f895(0x3b0)]()['trim'](),this['_classIDs']=this[_0x15f895(0xfe)]||{};if(this[_0x15f895(0xfe)][_0x3a570c])return this['_classIDs'][_0x3a570c];for(const _0x55e5b1 of $dataClasses){if(!_0x55e5b1)continue;let _0x54aac8=_0x55e5b1[_0x15f895(0x22a)];_0x54aac8=_0x54aac8['replace'](/\x1I\[(\d+)\]/gi,''),_0x54aac8=_0x54aac8[_0x15f895(0x3e0)](/\\I\[(\d+)\]/gi,''),this[_0x15f895(0xfe)][_0x54aac8[_0x15f895(0x3b0)]()[_0x15f895(0x171)]()]=_0x55e5b1['id'];}return this[_0x15f895(0xfe)][_0x3a570c]||0x0;},DataManager[_0x124c5c(0x271)]=function(_0x318a38){const _0x5a184f=_0x124c5c;this[_0x5a184f(0xfd)]=this[_0x5a184f(0xfd)]||{};if(this['_stypeIDs'][_0x318a38['id']])return this[_0x5a184f(0xfd)][_0x318a38['id']];this[_0x5a184f(0xfd)][_0x318a38['id']]=[_0x318a38[_0x5a184f(0x234)]];if(_0x318a38['note'][_0x5a184f(0x2ad)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x5a184f(0x25a)!=='YaGTz'){const _0x1dce87=JSON[_0x5a184f(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x5a184f(0xfd)][_0x318a38['id']]=this['_stypeIDs'][_0x318a38['id']]['concat'](_0x1dce87);}else _0x10cf7f[_0x5a184f(0x21b)][_0x5a184f(0x105)][_0x5a184f(0x217)](this);}else{if(_0x318a38[_0x5a184f(0x139)][_0x5a184f(0x2ad)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x1b02c5=RegExp['$1'][_0x5a184f(0x364)](',');for(const _0x44884c of _0x1b02c5){const _0x256102=DataManager[_0x5a184f(0x2d0)](_0x44884c);if(_0x256102)this[_0x5a184f(0xfd)][_0x318a38['id']]['push'](_0x256102);}}}return this[_0x5a184f(0xfd)][_0x318a38['id']];},DataManager[_0x124c5c(0x2d0)]=function(_0x2b97cd){const _0x2b18eb=_0x124c5c;_0x2b97cd=_0x2b97cd[_0x2b18eb(0x3b0)]()[_0x2b18eb(0x171)](),this[_0x2b18eb(0xfd)]=this[_0x2b18eb(0xfd)]||{};if(this[_0x2b18eb(0xfd)][_0x2b97cd])return this[_0x2b18eb(0xfd)][_0x2b97cd];for(let _0xb03e=0x1;_0xb03e<0x64;_0xb03e++){if(!$dataSystem[_0x2b18eb(0x27b)][_0xb03e])continue;let _0x5ce5ea=$dataSystem[_0x2b18eb(0x27b)][_0xb03e]['toUpperCase']()['trim']();_0x5ce5ea=_0x5ce5ea[_0x2b18eb(0x3e0)](/\x1I\[(\d+)\]/gi,''),_0x5ce5ea=_0x5ce5ea[_0x2b18eb(0x3e0)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x5ce5ea]=_0xb03e;}return this[_0x2b18eb(0xfd)][_0x2b97cd]||0x0;},DataManager[_0x124c5c(0xe9)]=function(_0x2c1202){const _0x2cf0d4=_0x124c5c;_0x2c1202=_0x2c1202['toUpperCase']()[_0x2cf0d4(0x171)](),this[_0x2cf0d4(0x12a)]=this[_0x2cf0d4(0x12a)]||{};if(this[_0x2cf0d4(0x12a)][_0x2c1202])return this[_0x2cf0d4(0x12a)][_0x2c1202];for(const _0x2fccf2 of $dataSkills){if('vHNXZ'===_0x2cf0d4(0x35a)){if(!_0x2fccf2)continue;this['_skillIDs'][_0x2fccf2[_0x2cf0d4(0x22a)][_0x2cf0d4(0x3b0)]()['trim']()]=_0x2fccf2['id'];}else{if(!this['meetsPassiveStateConditionClasses'](_0x2d9cfd))return![];if(!this[_0x2cf0d4(0xbb)](_0x401ed4))return![];if(!this[_0x2cf0d4(0x380)](_0x5b098c))return![];if(!this[_0x2cf0d4(0x18f)](_0xe21500))return![];return!![];}}return this[_0x2cf0d4(0x12a)][_0x2c1202]||0x0;},DataManager[_0x124c5c(0x3a0)]=function(_0x32d28f){const _0x3e228b=_0x124c5c;_0x32d28f=_0x32d28f[_0x3e228b(0x3b0)]()[_0x3e228b(0x171)](),this['_stateIDs']=this[_0x3e228b(0x368)]||{};if(this[_0x3e228b(0x368)][_0x32d28f])return this[_0x3e228b(0x368)][_0x32d28f];for(const _0x1a6398 of $dataStates){if('YbuWs'!==_0x3e228b(0x117)){if(!_0x1a6398)continue;this[_0x3e228b(0x368)][_0x1a6398['name'][_0x3e228b(0x3b0)]()[_0x3e228b(0x171)]()]=_0x1a6398['id'];}else return new _0x2ee92b(_0x109b47(_0x230ac0['$1']),-0x1f4,-0x1f4);}return this[_0x3e228b(0x368)][_0x32d28f]||0x0;},DataManager[_0x124c5c(0x2c3)]=function(_0x356a40){const _0x4c9b2b=_0x124c5c;this[_0x4c9b2b(0xba)]=this[_0x4c9b2b(0xba)]||{};if(this['_stateMaxTurns'][_0x356a40])return this[_0x4c9b2b(0xba)][_0x356a40];if($dataStates[_0x356a40][_0x4c9b2b(0x139)][_0x4c9b2b(0x2ad)](/<MAX TURNS:[ ](\d+)>/i)){if(_0x4c9b2b(0x289)!==_0x4c9b2b(0x14f))this[_0x4c9b2b(0xba)][_0x356a40]=Number(RegExp['$1']);else{const _0x2d638b=_0x22efa3[_0x4c9b2b(0x3b7)][_0x4c9b2b(0x40d)][_0x4c9b2b(0x1f2)];if(this[_0x4c9b2b(0x17b)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x2d638b[_0x4c9b2b(0x294)]?_0x4c9b2b(0x34a):_0x5d0327[_0x4c9b2b(0x33f)]();}}else{if(_0x4c9b2b(0x215)===_0x4c9b2b(0x215))this[_0x4c9b2b(0xba)][_0x356a40]=VisuMZ['SkillsStatesCore']['Settings'][_0x4c9b2b(0x107)]['MaxTurns'];else return _0x4bba32=_0x116670(_0x599247),_0x1f1fc7[_0x4c9b2b(0x2ad)](/#(.*)/i)?'#%1'['format'](_0x2ee240(_0x15e0b7['$1'])):this['textColor'](_0x1347e3(_0xc2e8f9));}return this[_0x4c9b2b(0xba)][_0x356a40];},ColorManager['getColorDataFromPluginParameters']=function(_0x1ccae7,_0x44d75f){const _0x3a1fd9=_0x124c5c;return _0x44d75f=String(_0x44d75f),this[_0x3a1fd9(0x403)]=this['_colorCache']||{},_0x44d75f[_0x3a1fd9(0x2ad)](/#(.*)/i)?this[_0x3a1fd9(0x403)][_0x1ccae7]=_0x3a1fd9(0x38f)[_0x3a1fd9(0x2c4)](String(RegExp['$1'])):this['_colorCache'][_0x1ccae7]=this[_0x3a1fd9(0x3f0)](Number(_0x44d75f)),this[_0x3a1fd9(0x403)][_0x1ccae7];},ColorManager[_0x124c5c(0x402)]=function(_0x109294){const _0x4aa4cc=_0x124c5c;_0x109294=String(_0x109294);if(_0x109294['match'](/#(.*)/i))return _0x4aa4cc(0x38f)['format'](String(RegExp['$1']));else{if(_0x4aa4cc(0xec)!==_0x4aa4cc(0xec)){const _0x498d83=_0x227aff[_0x4aa4cc(0x3b7)][_0x4aa4cc(0x40d)]['Gauge'];return _0x498d83[_0x4aa4cc(0x16c)]==='number'?_0x23c7aa[_0x4aa4cc(0x352)]():_0x3fd7b8[_0x4aa4cc(0x3ed)]();}else return this[_0x4aa4cc(0x3f0)](Number(_0x109294));}},ColorManager[_0x124c5c(0x38a)]=function(_0x11aa2f){const _0x2f2672=_0x124c5c;if(typeof _0x11aa2f===_0x2f2672(0x3ad))_0x11aa2f=$dataStates[_0x11aa2f];const _0x5d636c=_0x2f2672(0x336)[_0x2f2672(0x2c4)](_0x11aa2f['id']);this[_0x2f2672(0x403)]=this[_0x2f2672(0x403)]||{};if(this[_0x2f2672(0x403)][_0x5d636c])return this[_0x2f2672(0x403)][_0x5d636c];const _0x16e6c0=this[_0x2f2672(0x360)](_0x11aa2f);return this[_0x2f2672(0x204)](_0x5d636c,_0x16e6c0);},ColorManager[_0x124c5c(0x360)]=function(_0x1e8623){const _0x2c1c7c=_0x124c5c,_0x532c49=_0x1e8623[_0x2c1c7c(0x139)];if(_0x532c49['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x532c49['match'](/<POSITIVE STATE>/i)){if('fyzdq'!==_0x2c1c7c(0xc6)){const _0x35e642=_0x56dc16[_0x2c1c7c(0x3b7)]['Settings'][_0x2c1c7c(0xf6)][_0x2c1c7c(0x235)];this[_0x2c1c7c(0x3c0)][_0x20b6f9]=_0x23061c[_0x2c1c7c(0x2f4)](0x0,_0x35e642);}else return VisuMZ[_0x2c1c7c(0x3b7)][_0x2c1c7c(0x40d)]['States'][_0x2c1c7c(0x2fd)];}else{if(_0x532c49['match'](/<NEGATIVE STATE>/i))return VisuMZ[_0x2c1c7c(0x3b7)][_0x2c1c7c(0x40d)][_0x2c1c7c(0x107)][_0x2c1c7c(0x202)];else{if(_0x2c1c7c(0x3c7)!==_0x2c1c7c(0x3f9))return VisuMZ[_0x2c1c7c(0x3b7)][_0x2c1c7c(0x40d)]['States'][_0x2c1c7c(0x2c6)];else{const _0x30a4f3=_0xcce0cd[_0x5c3c0b-_0x5f1f7a[_0x2c1c7c(0x37d)]];this['drawActorBuffTurns'](_0x546786,_0x30a4f3,_0x309c97,_0x9abd15),this[_0x2c1c7c(0x254)](_0x2c0116,_0x30a4f3,_0x1c758d,_0x33a10b);}}}}},ColorManager[_0x124c5c(0x112)]=function(){const _0x17852a=_0x124c5c,_0x47889d='_stored_buffColor';this[_0x17852a(0x403)]=this[_0x17852a(0x403)]||{};if(this[_0x17852a(0x403)][_0x47889d])return this[_0x17852a(0x403)][_0x47889d];const _0x198d5c=VisuMZ[_0x17852a(0x3b7)]['Settings']['Buffs'][_0x17852a(0x1c8)];return this['getColorDataFromPluginParameters'](_0x47889d,_0x198d5c);},ColorManager[_0x124c5c(0x384)]=function(){const _0x1f6c7b=_0x124c5c,_0x50e5e2=_0x1f6c7b(0x10a);this['_colorCache']=this[_0x1f6c7b(0x403)]||{};if(this[_0x1f6c7b(0x403)][_0x50e5e2])return this[_0x1f6c7b(0x403)][_0x50e5e2];const _0x59c8bc=VisuMZ[_0x1f6c7b(0x3b7)][_0x1f6c7b(0x40d)][_0x1f6c7b(0xf6)]['ColorDebuff'];return this[_0x1f6c7b(0x204)](_0x50e5e2,_0x59c8bc);},SceneManager[_0x124c5c(0x279)]=function(){const _0x41f7e8=_0x124c5c;return this['_scene']&&this[_0x41f7e8(0x347)][_0x41f7e8(0x3e4)]===Scene_Battle;},VisuMZ[_0x124c5c(0x3b7)]['BattleManager_endAction']=BattleManager[_0x124c5c(0x264)],BattleManager[_0x124c5c(0x264)]=function(){const _0x49306a=_0x124c5c;this[_0x49306a(0x297)](),VisuMZ[_0x49306a(0x3b7)][_0x49306a(0x18b)][_0x49306a(0x217)](this);},BattleManager[_0x124c5c(0x297)]=function(){const _0x2962c2=_0x124c5c,_0x47e556=VisuMZ[_0x2962c2(0x3b7)][_0x2962c2(0x40d)]['States'];if(!_0x47e556)return;if(_0x47e556[_0x2962c2(0x25b)]===![])return;if(!this[_0x2962c2(0x1fa)])return;this[_0x2962c2(0x1fa)][_0x2962c2(0x297)]();},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x297)]=function(){const _0x4b91a2=_0x124c5c;if(BattleManager[_0x4b91a2(0x2de)]!==_0x4b91a2(0x203))return;if(this[_0x4b91a2(0x39c)]===Graphics['frameCount'])return;this[_0x4b91a2(0x39c)]=Graphics['frameCount'];for(const _0x483a2b of this[_0x4b91a2(0xe3)]){const _0x303d8c=$dataStates[_0x483a2b];if(!_0x303d8c)continue;if(_0x303d8c[_0x4b91a2(0x341)]!==0x1)continue;if(this[_0x4b91a2(0x378)][_0x483a2b]>0x0){if(_0x4b91a2(0xcf)==='mPaJg')this['_stateTurns'][_0x483a2b]--;else for(const _0x249db9 of _0x246fc4['categories']){if(this[_0x4b91a2(0x10f)](_0x249db9))return!![];}}}this[_0x4b91a2(0x186)](0x1);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x1d9)]=function(){const _0x2d6f91=_0x124c5c,_0x46ecb7=VisuMZ[_0x2d6f91(0x3b7)][_0x2d6f91(0x40d)][_0x2d6f91(0x107)];for(const _0x719548 of this[_0x2d6f91(0xe3)]){const _0x1b26fc=$dataStates[_0x719548];if(_0x46ecb7&&_0x46ecb7[_0x2d6f91(0x25b)]!==![]){if('mGwVl'!==_0x2d6f91(0x3aa))this[_0x2d6f91(0x403)][_0xc480ae]='#%1'[_0x2d6f91(0x2c4)](_0x33562e(_0x746953['$1']));else{if(_0x1b26fc&&_0x1b26fc['autoRemovalTiming']===0x1)continue;}}if(this['_stateTurns'][_0x719548]>0x0){if(_0x2d6f91(0x101)!==_0x2d6f91(0xc0))this[_0x2d6f91(0x378)][_0x719548]--;else return _0x224742[_0x2d6f91(0x3b7)][_0x2d6f91(0x3fc)][_0x2d6f91(0x217)](this);}}},VisuMZ[_0x124c5c(0x3b7)]['Game_Switches_onChange']=Game_Switches[_0x124c5c(0x21b)]['onChange'],Game_Switches[_0x124c5c(0x21b)][_0x124c5c(0x165)]=function(){const _0x3c5745=_0x124c5c;VisuMZ[_0x3c5745(0x3b7)][_0x3c5745(0x3a9)][_0x3c5745(0x217)](this);const _0x3c4b3a=VisuMZ[_0x3c5745(0x3b7)]['Settings'][_0x3c5745(0x284)]['RefreshCacheSwitch']??!![];if(!_0x3c4b3a)return;if(SceneManager['isSceneBattle']())for(const _0x55143d of BattleManager['allBattleMembers']()){if(_0x3c5745(0x3f5)!=='INLOS')for(const _0x10ca9e of _0x55c8a1){_0x10ca9e['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x24701d=_0xdc421[_0x3c5745(0xb0)](_0x5bd41e(_0x3d64e8['$1'])['toUpperCase']()),_0x162381=_0x340a90(_0x20a255['$2']);_0x24701d>=0x0&&(_0x203be4[_0x3c5745(0x196)](_0x24701d,_0x162381),this[_0x3c5745(0x154)](_0x1f3c3d));}else{if(_0x55143d)_0x55143d[_0x3c5745(0x305)]();}}},VisuMZ['SkillsStatesCore'][_0x124c5c(0x2d4)]=Game_Variables[_0x124c5c(0x21b)][_0x124c5c(0x165)],Game_Variables[_0x124c5c(0x21b)]['onChange']=function(){const _0x25c9a3=_0x124c5c;VisuMZ[_0x25c9a3(0x3b7)]['Game_Variables_onChange'][_0x25c9a3(0x217)](this);const _0xb0eb5a=VisuMZ[_0x25c9a3(0x3b7)][_0x25c9a3(0x40d)]['PassiveStates']['RefreshCacheVar']??!![];if(!_0xb0eb5a)return;if(SceneManager['isSceneBattle']())for(const _0x1c2a11 of BattleManager[_0x25c9a3(0x366)]()){if(_0x1c2a11)_0x1c2a11[_0x25c9a3(0x305)]();}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2bc)]=Game_Action['prototype'][_0x124c5c(0x189)],Game_Action[_0x124c5c(0x21b)][_0x124c5c(0x189)]=function(_0x52499e){const _0x268aa6=_0x124c5c;VisuMZ[_0x268aa6(0x3b7)][_0x268aa6(0x2bc)][_0x268aa6(0x217)](this,_0x52499e),this['applySkillsStatesCoreEffects'](_0x52499e);},Game_Action[_0x124c5c(0x21b)]['applySkillsStatesCoreEffects']=function(_0x23ff71){const _0x36b7ee=_0x124c5c;this['applyStateCategoryRemovalEffects'](_0x23ff71),this[_0x36b7ee(0x206)](_0x23ff71),this[_0x36b7ee(0x1c7)](_0x23ff71),this[_0x36b7ee(0x2ef)](_0x23ff71);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x12c)]=Game_Action[_0x124c5c(0x21b)][_0x124c5c(0x227)],Game_Action['prototype']['testApply']=function(_0x4ad796){const _0x23cb40=_0x124c5c;if(this[_0x23cb40(0x30f)](_0x4ad796))return _0x23cb40(0x188)===_0x23cb40(0x188)?!![]:_0x5844ad['SkillsStatesCore'][_0x23cb40(0x282)][_0x23cb40(0x217)](this);return VisuMZ[_0x23cb40(0x3b7)][_0x23cb40(0x12c)][_0x23cb40(0x217)](this,_0x4ad796);},Game_Action[_0x124c5c(0x21b)][_0x124c5c(0x30f)]=function(_0x4b6cdd){const _0x1572f1=_0x124c5c;if(!this[_0x1572f1(0x10d)]())return;const _0x3ea506=this[_0x1572f1(0x10d)]()[_0x1572f1(0x139)];if(_0x3ea506[_0x1572f1(0x2ad)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x419e74=String(RegExp['$1']);if(_0x4b6cdd[_0x1572f1(0x2aa)](_0x419e74))return!![];}if(_0x3ea506[_0x1572f1(0x2ad)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x2e03cc=Number(RegExp['$1']);if(_0x4b6cdd['isStateAffected'](_0x2e03cc))return!![];}else{if(_0x3ea506[_0x1572f1(0x2ad)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x401fd3=DataManager[_0x1572f1(0x3a0)](RegExp['$1']);if(_0x4b6cdd['isStateAffected'](_0x401fd3))return!![];}}return![];},Game_Action[_0x124c5c(0x21b)]['applyStateCategoryRemovalEffects']=function(_0x32e367){const _0x2d62bc=_0x124c5c;if(_0x32e367['states']()[_0x2d62bc(0x37d)]<=0x0)return;const _0x1155c6=this[_0x2d62bc(0x10d)]()['note'];{if(_0x2d62bc(0xe8)==='yzJTM')_0x106990[_0x2d62bc(0x1d3)][_0x2d62bc(0x239)]('POSITIVE');else{const _0x138fc4=_0x1155c6[_0x2d62bc(0x2ad)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x138fc4)for(const _0x17ebf6 of _0x138fc4){if(_0x2d62bc(0xf1)===_0x2d62bc(0x28f))return _0x5959dc[_0x54f37f['id']]['call'](this,_0x25ce8e);else{_0x17ebf6[_0x2d62bc(0x2ad)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x5a315e=String(RegExp['$1']);_0x32e367[_0x2d62bc(0x23e)](_0x5a315e);}}}}{if(_0x2d62bc(0x1b0)===_0x2d62bc(0x1b0)){const _0x9ed35=_0x1155c6[_0x2d62bc(0x2ad)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x9ed35){if(_0x2d62bc(0x169)==='QufDM')for(const _0x28e157 of _0x9ed35){_0x28e157['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x42780b=String(RegExp['$1']),_0x36a69c=Number(RegExp['$2']);_0x32e367[_0x2d62bc(0x2ed)](_0x42780b,_0x36a69c);}else _0x5237c2[_0x2d62bc(0x3b7)]['Sprite_Gauge_initMembers'][_0x2d62bc(0x217)](this),this[_0x2d62bc(0x14a)]=null;}}else for(const _0x914a04 of _0x2ef06a){let _0x586b7e=0x0,_0x58a854=0x0;if(_0x914a04[_0x2d62bc(0x2ad)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x586b7e=_0x588961(_0x22fcdb['$1']),_0x58a854=_0x332232(_0x1f6072['$2']);else _0x914a04['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x586b7e=_0x19869f[_0x2d62bc(0x3a0)](_0x13a8c4['$1']),_0x58a854=_0x22ec2c(_0x97b1fe['$2']));_0x39035d[_0x2d62bc(0x27f)](_0x586b7e,_0x58a854),this[_0x2d62bc(0x154)](_0xab3209);}}},Game_Action[_0x124c5c(0x21b)][_0x124c5c(0x206)]=function(_0x2f3c4a){const _0x47e4fc=_0x124c5c,_0xd766e8=this['item']()[_0x47e4fc(0x139)],_0x1d5abb=_0xd766e8[_0x47e4fc(0x2ad)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x1d5abb){if(_0x47e4fc(0x3de)==='WYeVz')for(const _0x57ea1e of _0x1d5abb){let _0x78abbe=0x0,_0x2c3ed5=0x0;if(_0x57ea1e['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x78abbe=Number(RegExp['$1']),_0x2c3ed5=Number(RegExp['$2']);else{if(_0x57ea1e[_0x47e4fc(0x2ad)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x47e4fc(0x121)==='NZZIa')return _0xdb2a49[_0x47e4fc(0x352)]();else _0x78abbe=DataManager[_0x47e4fc(0x3a0)](RegExp['$1']),_0x2c3ed5=Number(RegExp['$2']);}}_0x2f3c4a[_0x47e4fc(0x2f8)](_0x78abbe,_0x2c3ed5),this[_0x47e4fc(0x154)](_0x2f3c4a);}else{const _0x3d166d=_0x1ac1bb[_0x47e4fc(0x3b7)][_0x47e4fc(0x40d)][_0x47e4fc(0x107)];if(!_0x3d166d)return;if(_0x3d166d[_0x47e4fc(0x25b)]===![])return;if(!this[_0x47e4fc(0x1fa)])return;this['_subject']['updateStatesActionEnd']();}}const _0xf9ba47=_0xd766e8['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0xf9ba47)for(const _0x1d67b8 of _0xf9ba47){let _0x25657e=0x0,_0x3a8017=0x0;if(_0x1d67b8[_0x47e4fc(0x2ad)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x47e4fc(0x1de)!==_0x47e4fc(0x1de)?(_0x24ffa8['SkillsStatesCore'][_0x47e4fc(0x1e6)][_0x47e4fc(0x217)](this,_0x222306),this[_0x47e4fc(0xc5)]()):(_0x25657e=Number(RegExp['$1']),_0x3a8017=Number(RegExp['$2']));else _0x1d67b8[_0x47e4fc(0x2ad)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x25657e=DataManager[_0x47e4fc(0x3a0)](RegExp['$1']),_0x3a8017=Number(RegExp['$2']));_0x2f3c4a[_0x47e4fc(0x27f)](_0x25657e,_0x3a8017),this['makeSuccess'](_0x2f3c4a);}},Game_Action['prototype'][_0x124c5c(0x1c7)]=function(_0x437261){const _0x3ac5e9=_0x124c5c,_0x15f482=[_0x3ac5e9(0x15f),_0x3ac5e9(0x242),_0x3ac5e9(0x35e),_0x3ac5e9(0x1e3),_0x3ac5e9(0x10b),_0x3ac5e9(0x338),'AGI',_0x3ac5e9(0x36f)],_0x52adde=this[_0x3ac5e9(0x10d)]()[_0x3ac5e9(0x139)],_0x423b10=_0x52adde[_0x3ac5e9(0x2ad)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x423b10){if('qeUKL'==='qeUKL')for(const _0x5c2b11 of _0x423b10){_0x5c2b11[_0x3ac5e9(0x2ad)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x52be71=_0x15f482[_0x3ac5e9(0xb0)](String(RegExp['$1'])[_0x3ac5e9(0x3b0)]()),_0x546537=Number(RegExp['$2']);_0x52be71>=0x0&&(_0x437261[_0x3ac5e9(0x304)](_0x52be71,_0x546537),this[_0x3ac5e9(0x154)](_0x437261));}else return _0x1315e3[_0x3ac5e9(0x33f)]();}const _0x1f00d0=_0x52adde[_0x3ac5e9(0x2ad)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1f00d0)for(const _0x15f229 of _0x423b10){_0x15f229[_0x3ac5e9(0x2ad)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x4ddd70=_0x15f482[_0x3ac5e9(0xb0)](String(RegExp['$1'])[_0x3ac5e9(0x3b0)]()),_0x3d7fe1=Number(RegExp['$2']);_0x4ddd70>=0x0&&(_0x437261[_0x3ac5e9(0x16d)](_0x4ddd70,_0x3d7fe1),this[_0x3ac5e9(0x154)](_0x437261));}},Game_Action[_0x124c5c(0x21b)][_0x124c5c(0x2ef)]=function(_0x31e2e5){const _0x320f79=_0x124c5c,_0x2d12b9=[_0x320f79(0x15f),_0x320f79(0x242),_0x320f79(0x35e),_0x320f79(0x1e3),_0x320f79(0x10b),_0x320f79(0x338),_0x320f79(0x285),_0x320f79(0x36f)],_0x49753c=this[_0x320f79(0x10d)]()[_0x320f79(0x139)],_0xb63249=_0x49753c[_0x320f79(0x2ad)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0xb63249)for(const _0x45d1da of _0xb63249){if(_0x320f79(0x250)!==_0x320f79(0x1cb)){_0x45d1da['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x239ee5=_0x2d12b9[_0x320f79(0xb0)](String(RegExp['$1'])[_0x320f79(0x3b0)]()),_0x36477a=Number(RegExp['$2']);_0x239ee5>=0x0&&(_0x31e2e5['setDebuffTurns'](_0x239ee5,_0x36477a),this[_0x320f79(0x154)](_0x31e2e5));}else this['drawActorStateTurns'](_0x10aacf,_0x514f0d,_0x35fc3a,_0x1eb866);}const _0x28dca7=_0x49753c['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x28dca7){if(_0x320f79(0x12b)!==_0x320f79(0x12b))return this[_0x320f79(0x2c8)](_0x45fe8f)>0x0;else for(const _0x1e0b94 of _0xb63249){_0x1e0b94['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1f3bd4=_0x2d12b9[_0x320f79(0xb0)](String(RegExp['$1'])[_0x320f79(0x3b0)]()),_0x2651f2=Number(RegExp['$2']);if(_0x1f3bd4>=0x0){if(_0x320f79(0x260)!=='PEAdq')return _0x148401[_0x320f79(0xd4)];else _0x31e2e5[_0x320f79(0x20e)](_0x1f3bd4,_0x2651f2),this[_0x320f79(0x154)](_0x31e2e5);}}}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x270)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3ea)],Game_BattlerBase['prototype'][_0x124c5c(0x3ea)]=function(){const _0x436159=_0x124c5c;this[_0x436159(0x1b7)]={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x436159(0x3b7)][_0x436159(0x270)]['call'](this);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3dd)]=function(){const _0x39e994=_0x124c5c;this[_0x39e994(0x148)]='',this[_0x39e994(0x375)]={},this[_0x39e994(0x2e7)]={},this[_0x39e994(0x330)]={};},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x30b)]=function(_0x1f446a){const _0x23ba18=_0x124c5c;return this[_0x23ba18(0x1b7)]=this[_0x23ba18(0x1b7)]||{},this['_cache'][_0x1f446a]!==undefined;},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1a0)]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x305)]=function(){const _0x1612c6=_0x124c5c;this[_0x1612c6(0x1b7)]={},VisuMZ['SkillsStatesCore'][_0x1612c6(0x1a0)][_0x1612c6(0x217)](this);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseState']=Game_BattlerBase['prototype'][_0x124c5c(0x2e8)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2e8)]=function(_0x3b648e){const _0x4e3a2c=_0x124c5c;let _0xb0e087=this['isStateAffected'](_0x3b648e);VisuMZ[_0x4e3a2c(0x3b7)][_0x4e3a2c(0x390)][_0x4e3a2c(0x217)](this,_0x3b648e);if(_0xb0e087&&!this[_0x4e3a2c(0x1ce)](_0x3b648e))this[_0x4e3a2c(0xe7)](_0x3b648e);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0xe7)]=function(_0x3b9f47){const _0x3a170c=_0x124c5c;this[_0x3a170c(0x3f7)](_0x3b9f47),this[_0x3a170c(0x151)](_0x3b9f47);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x3c8)]=Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x174)],Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x174)]=function(){const _0xc9935c=_0x124c5c;VisuMZ['SkillsStatesCore'][_0xc9935c(0x3c8)][_0xc9935c(0x217)](this),this[_0xc9935c(0x236)]();},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1b6)]=Game_BattlerBase['prototype']['resetStateCounts'],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x191)]=function(_0x308d2e){const _0x2a35cc=_0x124c5c,_0x3ad060=$dataStates[_0x308d2e],_0x39a1c4=this['stateTurns'](_0x308d2e),_0x22c6ca=this[_0x2a35cc(0x3b1)](_0x3ad060)[_0x2a35cc(0x1e1)]()[_0x2a35cc(0x171)]();switch(_0x22c6ca){case _0x2a35cc(0x15b):if(_0x39a1c4<=0x0)this[_0x2a35cc(0x327)](_0x308d2e);break;case _0x2a35cc(0x3a8):this[_0x2a35cc(0x327)](_0x308d2e);break;case _0x2a35cc(0x113):this[_0x2a35cc(0x327)](_0x308d2e),this[_0x2a35cc(0x378)][_0x308d2e]=Math[_0x2a35cc(0x1a5)](this[_0x2a35cc(0x378)][_0x308d2e],_0x39a1c4);break;case'add':this['prepareResetStateCounts'](_0x308d2e),this[_0x2a35cc(0x378)][_0x308d2e]+=_0x39a1c4;break;default:this['prepareResetStateCounts'](_0x308d2e);break;}if(this[_0x2a35cc(0x1ce)](_0x308d2e)){if(_0x2a35cc(0x153)!==_0x2a35cc(0x153)){const _0x4848ed=_0x45f25e[_0x2a35cc(0x3b7)][_0x2a35cc(0x40d)][_0x2a35cc(0x1f2)];return _0x4848ed[_0x2a35cc(0x16c)]===_0x2a35cc(0x3ad)?_0x524901[_0x2a35cc(0x2cd)]()-0x6:_0x211e75[_0x2a35cc(0x2cd)]()-0x2;}else{const _0x5c05e4=DataManager[_0x2a35cc(0x2c3)](_0x308d2e);this[_0x2a35cc(0x378)][_0x308d2e]=this['_stateTurns'][_0x308d2e][_0x2a35cc(0x2f4)](0x0,_0x5c05e4);}}},Game_BattlerBase[_0x124c5c(0x21b)]['prepareResetStateCounts']=function(_0x34f57d){const _0x39ef8f=_0x124c5c;VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x39ef8f(0x217)](this,_0x34f57d);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3b1)]=function(_0x457c20){const _0x402966=_0x124c5c,_0x3aa06d=_0x457c20[_0x402966(0x139)];if(_0x3aa06d['match'](/<REAPPLY RULES:[ ](.*)>/i)){if(_0x402966(0x3bb)===_0x402966(0x3bb))return String(RegExp['$1']);else{_0x39c5e7[_0x402966(0x2ad)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x2d0e9c=_0x148750(_0x11c5f9['$1']),_0x2699ee=_0x338f61(_0x1a3272['$2']);_0x5bbe2b[_0x402966(0x2ed)](_0x2d0e9c,_0x2699ee);}}else return VisuMZ[_0x402966(0x3b7)][_0x402966(0x40d)][_0x402966(0x107)][_0x402966(0x1eb)];},VisuMZ['SkillsStatesCore'][_0x124c5c(0x1db)]=Game_BattlerBase['prototype'][_0x124c5c(0x2b5)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2b5)]=function(_0x4d2432,_0x2af854){const _0x13614d=_0x124c5c,_0x43e2f9=VisuMZ['SkillsStatesCore'][_0x13614d(0x40d)][_0x13614d(0xf6)][_0x13614d(0x1eb)],_0x39aca8=this[_0x13614d(0x3e6)](_0x4d2432);switch(_0x43e2f9){case _0x13614d(0x15b):if(_0x39aca8<=0x0)this[_0x13614d(0x3c0)][_0x4d2432]=_0x2af854;break;case _0x13614d(0x3a8):this[_0x13614d(0x3c0)][_0x4d2432]=_0x2af854;break;case'greater':this[_0x13614d(0x3c0)][_0x4d2432]=Math[_0x13614d(0x1a5)](_0x39aca8,_0x2af854);break;case _0x13614d(0xc9):this[_0x13614d(0x3c0)][_0x4d2432]+=_0x2af854;break;default:VisuMZ[_0x13614d(0x3b7)][_0x13614d(0x1db)][_0x13614d(0x217)](this,_0x4d2432,_0x2af854);break;}const _0x2dc961=VisuMZ[_0x13614d(0x3b7)]['Settings'][_0x13614d(0xf6)][_0x13614d(0x235)];this[_0x13614d(0x3c0)][_0x4d2432]=this[_0x13614d(0x3c0)][_0x4d2432]['clamp'](0x0,_0x2dc961);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x31d)]=function(){const _0x82590=_0x124c5c;if(this[_0x82590(0x1b7)][_0x82590(0x232)]!==undefined)return this[_0x82590(0x1b7)][_0x82590(0x232)];this['_cache'][_0x82590(0x232)]=![];const _0x219880=this['states']();for(const _0xf3b0b0 of _0x219880){if(!_0xf3b0b0)continue;if(_0xf3b0b0[_0x82590(0x139)][_0x82590(0x2ad)](/<GROUP DEFEAT>/i)){if(_0x82590(0x372)!==_0x82590(0x372))return this['_buffs'][_0x20f9cb]===-_0xfaf1d9['SkillsStatesCore'][_0x82590(0x40d)][_0x82590(0xf6)][_0x82590(0x29a)];else{this[_0x82590(0x1b7)][_0x82590(0x232)]=!![];break;}}}return this[_0x82590(0x1b7)][_0x82590(0x232)];},VisuMZ[_0x124c5c(0x3b7)]['Game_Unit_deadMembers']=Game_Unit[_0x124c5c(0x21b)][_0x124c5c(0x17d)],Game_Unit[_0x124c5c(0x21b)][_0x124c5c(0x17d)]=function(){const _0x321424=_0x124c5c;let _0x45ca09=VisuMZ[_0x321424(0x3b7)][_0x321424(0x128)][_0x321424(0x217)](this);if(BattleManager[_0x321424(0x2cb)]){if(_0x321424(0x136)!==_0x321424(0x136)){if(_0x58f079[_0x321424(0x2ac)](_0x122085))return![];}else _0x45ca09=_0x45ca09[_0x321424(0x26f)](this[_0x321424(0x400)]()[_0x321424(0x278)](_0x3ea546=>_0x3ea546[_0x321424(0x31d)]()));}return _0x45ca09;},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1bc)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x34d)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x34d)]=function(){const _0x42bff7=_0x124c5c;this[_0x42bff7(0x33c)]()!==''?this[_0x42bff7(0x1f7)]():_0x42bff7(0xb5)!==_0x42bff7(0x1f1)?(VisuMZ['SkillsStatesCore'][_0x42bff7(0x1bc)][_0x42bff7(0x217)](this),this[_0x42bff7(0x3dd)]()):this['isDebuffAffected'](_0x390401)&&(_0x1b5da7+=this[_0x42bff7(0x3e6)](_0x5c719b),this[_0x42bff7(0x196)](_0x1f1977,_0x5b57ef));},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x34d)]=function(){const _0x3ba4e5=_0x124c5c;this[_0x3ba4e5(0x374)]=this[_0x3ba4e5(0x374)]||{},Game_Battler[_0x3ba4e5(0x21b)][_0x3ba4e5(0x34d)]['call'](this);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x1f7)]=function(){const _0x445e6b=_0x124c5c,_0x3e5087=this[_0x445e6b(0x1a8)]();for(const _0xbf8497 of _0x3e5087){if(_0xbf8497&&this[_0x445e6b(0x286)](_0xbf8497))this[_0x445e6b(0x2e8)](_0xbf8497['id']);}this[_0x445e6b(0x1b7)]={};},Game_BattlerBase[_0x124c5c(0x21b)]['canClearState']=function(_0x2f23ea){const _0x4e0898=_0x124c5c,_0x5ddfee=this['getStateRetainType']();if(_0x5ddfee!==''){const _0xb00334=_0x2f23ea[_0x4e0898(0x139)];if(_0x5ddfee==='death'&&_0xb00334[_0x4e0898(0x2ad)](/<NO DEATH CLEAR>/i))return![];if(_0x5ddfee===_0x4e0898(0xc8)&&_0xb00334[_0x4e0898(0x2ad)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x2f23ea['id']);},Game_BattlerBase['prototype'][_0x124c5c(0x33c)]=function(){const _0x36d6dc=_0x124c5c;return this[_0x36d6dc(0x148)];},Game_BattlerBase[_0x124c5c(0x21b)]['setStateRetainType']=function(_0x2fa5aa){this['_stateRetainType']=_0x2fa5aa;},Game_BattlerBase[_0x124c5c(0x21b)]['clearStateRetainType']=function(){const _0x2ec516=_0x124c5c;this[_0x2ec516(0x148)]='';},VisuMZ[_0x124c5c(0x3b7)]['Game_BattlerBase_die']=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x29e)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x29e)]=function(){const _0x185e5c=_0x124c5c;this[_0x185e5c(0xf7)](_0x185e5c(0x32b)),VisuMZ['SkillsStatesCore'][_0x185e5c(0x185)][_0x185e5c(0x217)](this),this[_0x185e5c(0x2f7)]();},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x33b)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x266)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x266)]=function(){const _0x495b06=_0x124c5c;this['setStateRetainType'](_0x495b06(0xc8)),VisuMZ[_0x495b06(0x3b7)][_0x495b06(0x33b)][_0x495b06(0x217)](this),this[_0x495b06(0x2f7)]();},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0xef)]=function(_0x1adb9f,_0x4c7477,_0x4d9729){return _0x4c7477;},Game_BattlerBase['prototype'][_0x124c5c(0x2df)]=function(_0x44ed73){const _0x5ef292=_0x124c5c;for(settings of VisuMZ[_0x5ef292(0x3b7)]['Settings'][_0x5ef292(0x259)]){let _0x193903=settings[_0x5ef292(0x1cc)][_0x5ef292(0x217)](this,_0x44ed73);_0x193903=this['adjustSkillCost'](_0x44ed73,_0x193903,settings);if(!settings[_0x5ef292(0x2b9)]['call'](this,_0x44ed73,_0x193903))return![];}return!![];},Game_BattlerBase['prototype']['paySkillCost']=function(_0x27546){const _0x241cbf=_0x124c5c;for(settings of VisuMZ[_0x241cbf(0x3b7)][_0x241cbf(0x40d)][_0x241cbf(0x259)]){let _0x5e4be8=settings['CalcJS'][_0x241cbf(0x217)](this,_0x27546);_0x5e4be8=this[_0x241cbf(0xef)](_0x27546,_0x5e4be8,settings),settings[_0x241cbf(0x3c5)]['call'](this,_0x27546,_0x5e4be8);}},VisuMZ['SkillsStatesCore'][_0x124c5c(0xd0)]=Game_BattlerBase['prototype'][_0x124c5c(0x2f0)],Game_BattlerBase[_0x124c5c(0x21b)]['meetsSkillConditions']=function(_0x2866c3){const _0x5cfceb=_0x124c5c;if(!_0x2866c3)return![];if(!VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions'][_0x5cfceb(0x217)](this,_0x2866c3))return![];if(!this[_0x5cfceb(0x27c)](_0x2866c3))return![];if(!this[_0x5cfceb(0xe0)](_0x2866c3))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x2866c3))return![];return!![];},Game_BattlerBase[_0x124c5c(0x21b)]['checkSkillConditionsNotetags']=function(_0x2d3cc0){const _0x4fc5de=_0x124c5c;if(!this[_0x4fc5de(0x281)](_0x2d3cc0))return![];return!![];},Game_BattlerBase['prototype'][_0x124c5c(0x281)]=function(_0x548d00){const _0x1c3f64=_0x124c5c,_0x5918c2=_0x548d00[_0x1c3f64(0x139)];if(_0x5918c2[_0x1c3f64(0x2ad)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1bd285=JSON[_0x1c3f64(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4aa465 of _0x1bd285){if(!$gameSwitches['value'](_0x4aa465))return![];}return!![];}if(_0x5918c2['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c3f64(0x3e7)!==_0x1c3f64(0x1b4)){const _0x1761c4=JSON[_0x1c3f64(0x40a)]('['+RegExp['$1'][_0x1c3f64(0x2ad)](/\d+/g)+']');for(const _0x559f32 of _0x1761c4){if('iqKNx'==='fBiVU'){const _0x5c2231=this[_0x1c3f64(0xb4)]();return this[_0x1c3f64(0x3a3)](_0x5c2231);}else{if(!$gameSwitches[_0x1c3f64(0x2ac)](_0x559f32))return![];}}return!![];}else{const _0x13a99b=_0x57c992(_0x155472['$1']),_0x1fda43=_0x1c3f64(0x316)[_0x1c3f64(0x2c4)](_0x13a99b);_0x2f8ef3['SkillsStatesCore']['skillVisibleJS'][_0x545bbe['id']]=new _0x2e98e8(_0x1c3f64(0x209),_0x1fda43);}}if(_0x5918c2[_0x1c3f64(0x2ad)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49d466=JSON[_0x1c3f64(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5bfbd5 of _0x49d466){if('PdJZk'!==_0x1c3f64(0xc7))this[_0x1c3f64(0x32a)]();else{if($gameSwitches[_0x1c3f64(0x2ac)](_0x5bfbd5))return!![];}}return![];}if(_0x5918c2[_0x1c3f64(0x2ad)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1c3f64(0xff)===_0x1c3f64(0xff)){const _0x40fae1=JSON[_0x1c3f64(0x40a)]('['+RegExp['$1'][_0x1c3f64(0x2ad)](/\d+/g)+']');for(const _0x2ade85 of _0x40fae1){if(!$gameSwitches[_0x1c3f64(0x2ac)](_0x2ade85))return!![];}return![];}else{if(this[_0x1c3f64(0x24b)]||this[_0x1c3f64(0x361)])return;try{_0x4836ae[_0x1c3f64(0x3b7)]['Settings']['States'][_0x1c3f64(0x142)][_0x1c3f64(0x217)](this,_0x142646);}catch(_0x43c41f){if(_0x2eed0b[_0x1c3f64(0x1ab)]())_0x3b390d['log'](_0x43c41f);}}}if(_0x5918c2[_0x1c3f64(0x2ad)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7e538d=JSON[_0x1c3f64(0x40a)]('['+RegExp['$1'][_0x1c3f64(0x2ad)](/\d+/g)+']');for(const _0x405dca of _0x7e538d){if(!$gameSwitches[_0x1c3f64(0x2ac)](_0x405dca))return!![];}return![];}if(_0x5918c2[_0x1c3f64(0x2ad)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('zQABB'!==_0x1c3f64(0x3e5))return _0x255e34[_0x1c3f64(0x3b7)][_0x1c3f64(0x40d)]['Gauge'][_0x1c3f64(0x2d7)]||0x0;else{const _0x51229c=JSON[_0x1c3f64(0x40a)]('['+RegExp['$1'][_0x1c3f64(0x2ad)](/\d+/g)+']');for(const _0x12bb11 of _0x51229c){if($gameSwitches[_0x1c3f64(0x2ac)](_0x12bb11))return![];}return!![];}}return!![];},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0xe0)]=function(_0xf10cf4){const _0x200697=_0x124c5c,_0x1f344d=_0xf10cf4[_0x200697(0x139)],_0x30ed50=VisuMZ[_0x200697(0x3b7)][_0x200697(0x173)];return _0x30ed50[_0xf10cf4['id']]?_0x30ed50[_0xf10cf4['id']]['call'](this,_0xf10cf4):!![];},Game_BattlerBase['prototype'][_0x124c5c(0x328)]=function(_0x50849){const _0x3aa133=_0x124c5c;return VisuMZ[_0x3aa133(0x3b7)][_0x3aa133(0x40d)][_0x3aa133(0x2dc)][_0x3aa133(0x11c)]['call'](this,_0x50849);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x333)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x333)]=function(_0x2256dd){const _0x4615e5=_0x124c5c;for(settings of VisuMZ[_0x4615e5(0x3b7)][_0x4615e5(0x40d)][_0x4615e5(0x259)]){if(settings[_0x4615e5(0x39d)][_0x4615e5(0x3b0)]()==='MP'){if(_0x4615e5(0x134)!==_0x4615e5(0x2f1)){let _0x283ff6=settings[_0x4615e5(0x1cc)][_0x4615e5(0x217)](this,_0x2256dd);return _0x283ff6=this['adjustSkillCost'](_0x2256dd,_0x283ff6,settings),_0x283ff6;}else return this[_0x4615e5(0x233)]&&this[_0x4615e5(0x14a)]?this[_0x4615e5(0x216)]():_0x461ddf['SkillsStatesCore']['Sprite_Gauge_currentValue'][_0x4615e5(0x217)](this);}}return VisuMZ[_0x4615e5(0x3b7)][_0x4615e5(0x2c0)]['call'](this,_0x2256dd);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1b8)]=Game_BattlerBase['prototype'][_0x124c5c(0x2db)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2db)]=function(_0x11e09a){const _0x1dc7e4=_0x124c5c;for(settings of VisuMZ[_0x1dc7e4(0x3b7)][_0x1dc7e4(0x40d)][_0x1dc7e4(0x259)]){if(settings[_0x1dc7e4(0x39d)][_0x1dc7e4(0x3b0)]()==='TP'){if(_0x1dc7e4(0x377)!==_0x1dc7e4(0x3ff)){let _0x498222=settings[_0x1dc7e4(0x1cc)][_0x1dc7e4(0x217)](this,_0x11e09a);return _0x498222=this['adjustSkillCost'](_0x11e09a,_0x498222,settings),_0x498222;}else _0x2cc8c[_0x1dc7e4(0x3b7)][_0x1dc7e4(0x40d)][_0x1dc7e4(0x107)]['onAddStateJS'][_0x1dc7e4(0x217)](this,_0x3a47dc);}}return VisuMZ[_0x1dc7e4(0x3b7)][_0x1dc7e4(0x1b8)][_0x1dc7e4(0x217)](this,_0x11e09a);},Game_BattlerBase['prototype'][_0x124c5c(0x3e2)]=function(_0x546dd0){const _0x4cfb3a=_0x124c5c;if(typeof _0x546dd0===_0x4cfb3a(0x3ad))_0x546dd0=$dataStates[_0x546dd0];return this['states']()[_0x4cfb3a(0x261)](_0x546dd0);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x3cb)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x1a8)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x1a8)]=function(){const _0x2d2edd=_0x124c5c;let _0x5a737a=VisuMZ[_0x2d2edd(0x3b7)][_0x2d2edd(0x3cb)]['call'](this);if($gameTemp['_checkingPassiveStates'])return _0x5a737a;return $gameTemp[_0x2d2edd(0x30e)]=!![],this['addPassiveStates'](_0x5a737a),$gameTemp[_0x2d2edd(0x30e)]=undefined,_0x5a737a;},Game_BattlerBase[_0x124c5c(0x21b)]['addPassiveStates']=function(_0x5aa082){const _0x156976=_0x124c5c,_0x5543b2=this[_0x156976(0x14d)]();for(state of _0x5543b2){if(_0x156976(0x23f)===_0x156976(0x23f)){if(!state)continue;if(!this[_0x156976(0x267)](state)&&_0x5aa082['includes'](state))continue;_0x5aa082[_0x156976(0x239)](state);}else return _0x3d43f2[_0x25fb33['id']][_0x156976(0x217)](this,_0x29c524);}if(_0x5543b2[_0x156976(0x37d)]>0x0){if('nawNU'===_0x156976(0x213)){const _0x4e091d=this[_0x156976(0x34c)][_0x5a7a0b];return _0x272917['SkillsStatesCore'][_0x156976(0x40d)][_0x156976(0xf6)]['MultiplierJS']['call'](this,_0x23c0c2,_0x4e091d);}else _0x5aa082[_0x156976(0x2b7)]((_0x51fbf9,_0x273ddf)=>{const _0x300426=_0x156976,_0x4bfef6=_0x51fbf9['priority'],_0x3394fd=_0x273ddf[_0x300426(0x3ae)];if(_0x4bfef6!==_0x3394fd){if('AEvuh'!==_0x300426(0x15a)){const _0x2af437=_0x308475[_0x300426(0x3b7)][_0x300426(0x3fb)][_0x300426(0x217)](this);return this[_0x300426(0x22c)]()&&this[_0x300426(0x14c)]()&&(_0x2af437[_0x300426(0x365)]-=this[_0x300426(0x13e)]()),_0x2af437;}else return _0x3394fd-_0x4bfef6;}return _0x51fbf9-_0x273ddf;});}},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x267)]=function(_0x47f2f1){const _0x5b4dcb=_0x124c5c;return _0x47f2f1[_0x5b4dcb(0x139)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x124c5c(0x3b7)]['Game_BattlerBase_traitsSet']=Game_BattlerBase[_0x124c5c(0x21b)]['traitsSet'],Game_BattlerBase['prototype'][_0x124c5c(0x198)]=function(_0x42fbbf){const _0x2b4d97=_0x124c5c;this['_checkingTraitsSetSkillsStatesCore']=!![];let _0x44b702=VisuMZ[_0x2b4d97(0x3b7)]['Game_BattlerBase_traitsSet'][_0x2b4d97(0x217)](this,_0x42fbbf);return this[_0x2b4d97(0x409)]=undefined,_0x44b702;},Game_BattlerBase['prototype'][_0x124c5c(0xd9)]=function(){const _0x4e6d83=_0x124c5c;let _0x52e222=[];this['_passiveStateResults']=this[_0x4e6d83(0x332)]||{};for(;;){if('hWziw'===_0x4e6d83(0x10e)){const _0x3733a4=_0x9996ef[_0x4e6d83(0x40a)]('['+_0x39a762['$1'][_0x4e6d83(0x2ad)](/\d+/g)+']');for(const _0x5749b6 of _0x3733a4){if(_0x361200[_0x4e6d83(0x2ac)](_0x5749b6))return![];}return!![];}else{_0x52e222=[];let _0x5b1260=!![];for(const _0x50cf18 of this[_0x4e6d83(0x1b7)][_0x4e6d83(0x14d)]){const _0x131862=$dataStates[_0x50cf18];if(!_0x131862)continue;let _0x15d0e4=this[_0x4e6d83(0x160)](_0x131862);if(this[_0x4e6d83(0x332)][_0x50cf18]!==_0x15d0e4){if(_0x4e6d83(0xe5)===_0x4e6d83(0x24d))for(_0x1a454b of _0x3e598d['SkillsStatesCore']['Settings'][_0x4e6d83(0x259)]){let _0x1de18a=_0x3c893b[_0x4e6d83(0x1cc)][_0x4e6d83(0x217)](this,_0x2d2c7e);_0x1de18a=this[_0x4e6d83(0xef)](_0xfdae61,_0x1de18a,_0x1a6698),_0x240ab8[_0x4e6d83(0x3c5)][_0x4e6d83(0x217)](this,_0x4c98ee,_0x1de18a);}else _0x5b1260=![],this['_passiveStateResults'][_0x50cf18]=_0x15d0e4;}if(!_0x15d0e4)continue;_0x52e222[_0x4e6d83(0x239)](_0x131862);}if(_0x5b1260)break;else{if(!this[_0x4e6d83(0x409)])this[_0x4e6d83(0x305)]();this[_0x4e6d83(0xda)]();}}}return _0x52e222;},Game_BattlerBase[_0x124c5c(0x21b)]['meetsPassiveStateConditions']=function(_0x1f4179){const _0x1d3c18=_0x124c5c;if(!this[_0x1d3c18(0x240)](_0x1f4179))return![];if(!this[_0x1d3c18(0xbb)](_0x1f4179))return![];if(!this[_0x1d3c18(0x380)](_0x1f4179))return![];if(!this[_0x1d3c18(0x18f)](_0x1f4179))return![];return!![];},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x240)]=function(_0x2e732d){return!![];},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x240)]=function(_0x2e15e8){const _0x17657e=_0x124c5c,_0x58c4e5=_0x2e15e8[_0x17657e(0x139)];if(_0x58c4e5[_0x17657e(0x2ad)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x40a79c=String(RegExp['$1'])[_0x17657e(0x364)](',')[_0x17657e(0x130)](_0x51105b=>_0x51105b[_0x17657e(0x171)]()),_0x42d3b2=VisuMZ[_0x17657e(0x3b7)]['ParseClassIDs'](_0x40a79c);return _0x42d3b2[_0x17657e(0x261)](this[_0x17657e(0x323)]());}if(_0x58c4e5[_0x17657e(0x2ad)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x437f02=String(RegExp['$1'])[_0x17657e(0x364)](',')['map'](_0x33b52f=>_0x33b52f[_0x17657e(0x171)]()),_0x5116d9=VisuMZ[_0x17657e(0x3b7)][_0x17657e(0x3e8)](_0x437f02);let _0x39f5c9=[this[_0x17657e(0x323)]()];if(Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x17657e(0x1f5)]){if('zAzHP'!=='oREsg')_0x39f5c9=this[_0x17657e(0x1f5)]();else{const _0x19e5dd=_0x2be070[_0x17657e(0x40a)]('['+_0x11a3f1['$1']['match'](/\d+/g)+']');for(const _0x1d7f30 of _0x19e5dd){if(_0x363b9b[_0x17657e(0x2ac)](_0x1d7f30))return!![];}return![];}}return _0x5116d9['filter'](_0x3d20e8=>_0x39f5c9[_0x17657e(0x261)](_0x3d20e8))[_0x17657e(0x37d)]>0x0;}return Game_BattlerBase[_0x17657e(0x21b)][_0x17657e(0x240)][_0x17657e(0x217)](this,_0x2e15e8);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x3e8)]=function(_0x291fb0){const _0x24a60b=_0x124c5c,_0x490ffe=[];for(let _0x14c5d5 of _0x291fb0){_0x14c5d5=(String(_0x14c5d5)||'')[_0x24a60b(0x171)]();const _0x2344c7=/^\d+$/[_0x24a60b(0xdc)](_0x14c5d5);if(_0x2344c7){if(_0x24a60b(0x26c)!==_0x24a60b(0x2b0))_0x490ffe[_0x24a60b(0x239)](Number(_0x14c5d5));else{const _0x3a77e4=_0x39a8a6[_0x24a60b(0x40a)]('['+_0x354eb5['$1'][_0x24a60b(0x2ad)](/\d+/g)+']');for(const _0x5296af of _0x3a77e4){if(!_0xf7344a[_0x24a60b(0x2ac)](_0x5296af))return![];}return!![];}}else{if(_0x24a60b(0x220)!==_0x24a60b(0x1f3))_0x490ffe[_0x24a60b(0x239)](DataManager[_0x24a60b(0x1e2)](_0x14c5d5));else{const _0xdf698c=_0x4c3350[_0x24a60b(0x139)];if(_0xdf698c['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x1bd0f7=_0x3b3324(_0x4a280b['$1'])[_0x24a60b(0x364)](',')['map'](_0xe369c8=>_0xe369c8[_0x24a60b(0x171)]()),_0x5d22db=_0x40ba18['SkillsStatesCore'][_0x24a60b(0x3e8)](_0x1bd0f7);return _0x5d22db[_0x24a60b(0x261)](this[_0x24a60b(0x323)]());}if(_0xdf698c[_0x24a60b(0x2ad)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0xc67d10=_0x24bf5e(_0x3252c2['$1'])['split'](',')[_0x24a60b(0x130)](_0x3ef4de=>_0x3ef4de[_0x24a60b(0x171)]()),_0x3c11cb=_0x24619a['SkillsStatesCore']['ParseClassIDs'](_0xc67d10);let _0x844049=[this[_0x24a60b(0x323)]()];return _0x4c952f['VisuMZ_2_ClassChangeSystem']&&this[_0x24a60b(0x1f5)]&&(_0x844049=this[_0x24a60b(0x1f5)]()),_0x3c11cb['filter'](_0x246b5f=>_0x844049[_0x24a60b(0x261)](_0x246b5f))[_0x24a60b(0x37d)]>0x0;}return _0x311a9d[_0x24a60b(0x21b)][_0x24a60b(0x240)]['call'](this,_0x12ff95);}}}return _0x490ffe[_0x24a60b(0x130)](_0x47c8f1=>$dataClasses[Number(_0x47c8f1)])[_0x24a60b(0x362)](null);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0xbb)]=function(_0x730be7){const _0x35f453=_0x124c5c,_0x59071c=_0x730be7[_0x35f453(0x139)];if(_0x59071c['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x35f453(0x2ae)!==_0x35f453(0x2ae)){const _0x5f307e=this[_0x35f453(0xc2)](_0x3672f3);if(_0x5f307e[_0x35f453(0x2ad)](/\\I\[(\d+)\]/i)){const _0x4f9a74=this[_0x35f453(0x1d1)](_0x2d2229),_0x44d529=this['textSizeEx'](_0x5f307e)[_0x35f453(0x365)];return _0x44d529<=_0x4f9a74['width']?_0x35f453(0x335):_0x35f453(0x303);}}else{const _0x36bcda=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2950b5 of _0x36bcda){if(!$gameSwitches[_0x35f453(0x2ac)](_0x2950b5))return![];}return!![];}}if(_0x59071c[_0x35f453(0x2ad)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45d686=JSON[_0x35f453(0x40a)]('['+RegExp['$1'][_0x35f453(0x2ad)](/\d+/g)+']');for(const _0x4069b4 of _0x45d686){if(!$gameSwitches[_0x35f453(0x2ac)](_0x4069b4))return![];}return!![];}if(_0x59071c[_0x35f453(0x2ad)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x456d74=JSON['parse']('['+RegExp['$1'][_0x35f453(0x2ad)](/\d+/g)+']');for(const _0x498d33 of _0x456d74){if(_0x35f453(0x26d)!=='ipSgK')_0x48f359+=_0x4e5ac2+0x18;else{if($gameSwitches[_0x35f453(0x2ac)](_0x498d33))return!![];}}return![];}if(_0x59071c[_0x35f453(0x2ad)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ad5e5=JSON[_0x35f453(0x40a)]('['+RegExp['$1'][_0x35f453(0x2ad)](/\d+/g)+']');for(const _0x15d982 of _0x3ad5e5){if(!$gameSwitches[_0x35f453(0x2ac)](_0x15d982))return!![];}return![];}if(_0x59071c['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x284ada=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x313947 of _0x284ada){if(_0x35f453(0x15d)===_0x35f453(0x21c))_0x154755[_0x35f453(0x127)](_0x5432bb);else{if(!$gameSwitches[_0x35f453(0x2ac)](_0x313947))return!![];}}return![];}if(_0x59071c[_0x35f453(0x2ad)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x159cab=JSON['parse']('['+RegExp['$1'][_0x35f453(0x2ad)](/\d+/g)+']');for(const _0x44da0f of _0x159cab){if($gameSwitches['value'](_0x44da0f))return![];}return!![];}return!![];},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x380)]=function(_0xc98ad0){const _0x18ff06=_0x124c5c,_0x827e02=VisuMZ[_0x18ff06(0x3b7)][_0x18ff06(0x345)];if(_0x827e02[_0xc98ad0['id']]&&!_0x827e02[_0xc98ad0['id']]['call'](this,_0xc98ad0))return![];return!![];},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x18f)]=function(_0x133dcb){const _0x3f63b2=_0x124c5c;return VisuMZ[_0x3f63b2(0x3b7)][_0x3f63b2(0x40d)]['PassiveStates'][_0x3f63b2(0x3f4)]['call'](this,_0x133dcb);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x14d)]=function(){const _0x3025f1=_0x124c5c;if(this['checkCacheKey'](_0x3025f1(0x14d)))return this[_0x3025f1(0xd9)]();if(this[_0x3025f1(0x19f)])return[];return this[_0x3025f1(0x19f)]=!![],this[_0x3025f1(0xda)](),this[_0x3025f1(0x19f)]=undefined,this[_0x3025f1(0xd9)]();},Game_BattlerBase[_0x124c5c(0x21b)]['createPassiveStatesCache']=function(){const _0x3afdc5=_0x124c5c;this[_0x3afdc5(0x19f)]=!![],this['_cache'][_0x3afdc5(0x14d)]=[],this[_0x3afdc5(0x337)](),this[_0x3afdc5(0x36c)](),this[_0x3afdc5(0x20b)](),this[_0x3afdc5(0x1b7)][_0x3afdc5(0x14d)]=this[_0x3afdc5(0x1b7)]['passiveStates'][_0x3afdc5(0x2b7)]((_0x9a0d88,_0x4f25ce)=>_0x9a0d88-_0x4f25ce),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x337)]=function(){const _0x57951a=_0x124c5c;if(Imported[_0x57951a(0x3f6)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x1c9)]=function(){return[];},Game_BattlerBase[_0x124c5c(0x21b)]['addPassiveStatesByNotetag']=function(){const _0x2b7827=_0x124c5c,_0x19a85e=this['passiveStateObjects']();for(const _0x5c7bd9 of _0x19a85e){if(!_0x5c7bd9)continue;const _0x5c443b=_0x5c7bd9[_0x2b7827(0x139)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x5c443b){if(_0x2b7827(0xb6)===_0x2b7827(0xb6))for(const _0x3ecf7f of _0x5c443b){if(_0x2b7827(0x35c)===_0x2b7827(0x2e3)){const _0x3634a5=this['statesByCategory'](_0x471368);return _0x3634a5['length'];}else{_0x3ecf7f[_0x2b7827(0x2ad)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x785374=RegExp['$1'];if(_0x785374['match'](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x2b7827(0x13b)!==_0x2b7827(0x13b)){if(typeof _0x489113!==_0x2b7827(0x3ad))_0x3c0715=_0x5a494b['id'];const _0x56b9d9=this[_0x2b7827(0x273)](_0x14b279);_0x56b9d9[_0x5a26f4]=_0x269c04;}else{const _0x465be1=JSON['parse']('['+RegExp['$1'][_0x2b7827(0x2ad)](/\d+/g)+']');this[_0x2b7827(0x1b7)][_0x2b7827(0x14d)]=this[_0x2b7827(0x1b7)][_0x2b7827(0x14d)][_0x2b7827(0x26f)](_0x465be1);}}else{const _0x112b3f=_0x785374[_0x2b7827(0x364)](',');for(const _0x7c0f27 of _0x112b3f){const _0x2b144e=DataManager['getStateIdWithName'](_0x7c0f27);if(_0x2b144e)this[_0x2b7827(0x1b7)][_0x2b7827(0x14d)]['push'](_0x2b144e);}}}}else this[_0x2b7827(0x30a)]&&this[_0x2b7827(0x30a)][_0x2b7827(0x3e4)]===_0x563e35&&this[_0x2b7827(0x30a)]['setItem'](this[_0x2b7827(0x23a)](0x0));}}},Game_BattlerBase[_0x124c5c(0x21b)]['addPassiveStatesByPluginParameters']=function(){const _0x55a974=_0x124c5c,_0xecd9fa=VisuMZ['SkillsStatesCore']['Settings'][_0x55a974(0x284)]['Global'];this[_0x55a974(0x1b7)][_0x55a974(0x14d)]=this[_0x55a974(0x1b7)][_0x55a974(0x14d)][_0x55a974(0x26f)](_0xecd9fa);},Game_BattlerBase['prototype'][_0x124c5c(0x367)]=function(_0x304e1e){const _0x58a51c=_0x124c5c;if(typeof _0x304e1e!==_0x58a51c(0x3ad))_0x304e1e=_0x304e1e['id'];return this['_stateTurns'][_0x304e1e]||0x0;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2f8)]=function(_0x260b05,_0x4e484b){const _0x204884=_0x124c5c;if(typeof _0x260b05!==_0x204884(0x3ad))_0x260b05=_0x260b05['id'];if(this['isStateAffected'](_0x260b05)){const _0x4c1274=DataManager[_0x204884(0x2c3)](_0x260b05);this[_0x204884(0x378)][_0x260b05]=_0x4e484b[_0x204884(0x2f4)](0x0,_0x4c1274);if(this[_0x204884(0x378)][_0x260b05]<=0x0)this[_0x204884(0x152)](_0x260b05);}},Game_BattlerBase['prototype'][_0x124c5c(0x27f)]=function(_0x1987a,_0x1e3ba0){const _0x3cbd06=_0x124c5c;if(typeof _0x1987a!==_0x3cbd06(0x3ad))_0x1987a=_0x1987a['id'];if(this[_0x3cbd06(0x1ce)](_0x1987a)){if(_0x3cbd06(0xfa)!==_0x3cbd06(0xfa)){_0x192cf4['SkillsStatesCore']['Game_BattlerBase_decreaseBuff'][_0x3cbd06(0x217)](this,_0x4bac01);if(!this[_0x3cbd06(0x108)](_0x2836e6))this[_0x3cbd06(0x3bf)](_0x33ba37);}else _0x1e3ba0+=this[_0x3cbd06(0x367)](_0x1987a),this[_0x3cbd06(0x2f8)](_0x1987a,_0x1e3ba0);}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x3b8)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3bf)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3bf)]=function(_0x3b8a83){const _0x3b5fe7=_0x124c5c,_0x5a891f=this[_0x3b5fe7(0x34c)][_0x3b8a83];VisuMZ[_0x3b5fe7(0x3b7)][_0x3b5fe7(0x3b8)][_0x3b5fe7(0x217)](this,_0x3b8a83);if(_0x5a891f>0x0)this[_0x3b5fe7(0x350)](_0x3b8a83);if(_0x5a891f<0x0)this['onEraseDebuff'](_0x3b8a83);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2d6)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x351)],Game_BattlerBase[_0x124c5c(0x21b)]['increaseBuff']=function(_0x2567e4){const _0x2770ef=_0x124c5c;VisuMZ['SkillsStatesCore'][_0x2770ef(0x2d6)][_0x2770ef(0x217)](this,_0x2567e4);if(!this[_0x2770ef(0x108)](_0x2567e4))this['eraseBuff'](_0x2567e4);},VisuMZ['SkillsStatesCore'][_0x124c5c(0xb9)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2b6)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2b6)]=function(_0x49512f){const _0x8b90d0=_0x124c5c;VisuMZ['SkillsStatesCore'][_0x8b90d0(0xb9)][_0x8b90d0(0x217)](this,_0x49512f);if(!this[_0x8b90d0(0x108)](_0x49512f))this[_0x8b90d0(0x3bf)](_0x49512f);},Game_BattlerBase['prototype'][_0x124c5c(0x350)]=function(_0x161950){},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x146)]=function(_0x18df69){},Game_BattlerBase['prototype']['isMaxBuffAffected']=function(_0x3bab24){const _0x250a29=_0x124c5c;return this[_0x250a29(0x34c)][_0x3bab24]===VisuMZ[_0x250a29(0x3b7)][_0x250a29(0x40d)][_0x250a29(0xf6)][_0x250a29(0x1ea)];},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3cf)]=function(_0x256f11){const _0xc1f74=_0x124c5c;return this[_0xc1f74(0x34c)][_0x256f11]===-VisuMZ[_0xc1f74(0x3b7)][_0xc1f74(0x40d)][_0xc1f74(0xf6)]['StackDebuffMax'];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex']=Game_BattlerBase['prototype'][_0x124c5c(0x33a)],Game_BattlerBase[_0x124c5c(0x21b)]['buffIconIndex']=function(_0xbdebcb,_0x175747){const _0x38cc82=_0x124c5c;return _0xbdebcb=_0xbdebcb[_0x38cc82(0x2f4)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x38cc82(0x168)][_0x38cc82(0x217)](this,_0xbdebcb,_0x175747);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x28c)]=function(_0x5606a6){const _0x60a7bf=_0x124c5c,_0x1ccd70=this[_0x60a7bf(0x34c)][_0x5606a6];return VisuMZ['SkillsStatesCore'][_0x60a7bf(0x40d)][_0x60a7bf(0xf6)][_0x60a7bf(0x192)][_0x60a7bf(0x217)](this,_0x5606a6,_0x1ccd70);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3e6)]=function(_0x401fc2){return this['_buffTurns'][_0x401fc2]||0x0;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x356)]=function(_0x5010fd){return this['buffTurns'](_0x5010fd);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x304)]=function(_0xdd96d8,_0x4c503c){const _0x43728f=_0x124c5c;if(this['isBuffAffected'](_0xdd96d8)){if(_0x43728f(0x3bc)===_0x43728f(0x358))return!![];else{const _0x25ce5a=VisuMZ[_0x43728f(0x3b7)][_0x43728f(0x40d)][_0x43728f(0xf6)][_0x43728f(0x235)];this[_0x43728f(0x3c0)][_0xdd96d8]=_0x4c503c[_0x43728f(0x2f4)](0x0,_0x25ce5a);}}},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x16d)]=function(_0x2549ff,_0x282a66){const _0x2d2a37=_0x124c5c;if(this[_0x2d2a37(0x25c)](_0x2549ff)){if(_0x2d2a37(0x1dc)!==_0x2d2a37(0x166))_0x282a66+=this[_0x2d2a37(0x3e6)](stateId),this[_0x2d2a37(0x304)](_0x2549ff,_0x282a66);else{this['commandName'](_0x399aa1)[_0x2d2a37(0x2ad)](/\\I\[(\d+)\]/i);const _0x4446b7=_0x2b2295(_0x41deb6['$1'])||0x0,_0x2f834b=this[_0x2d2a37(0x1d1)](_0x1edd32),_0x56041e=_0x2f834b['x']+_0x26bbaf[_0x2d2a37(0x1ad)]((_0x2f834b[_0x2d2a37(0x365)]-_0x20ab0c['iconWidth'])/0x2),_0x4a861f=_0x2f834b['y']+(_0x2f834b[_0x2d2a37(0x1dd)]-_0x14f555['iconHeight'])/0x2;this[_0x2d2a37(0x3ac)](_0x4446b7,_0x56041e,_0x4a861f);}}},Game_BattlerBase['prototype'][_0x124c5c(0x196)]=function(_0x1299db,_0xb68b1b){const _0xf4e1b7=_0x124c5c;if(this[_0xf4e1b7(0x398)](_0x1299db)){const _0xf1223e=VisuMZ[_0xf4e1b7(0x3b7)][_0xf4e1b7(0x40d)]['Buffs'][_0xf4e1b7(0x235)];this[_0xf4e1b7(0x3c0)][_0x1299db]=_0xb68b1b[_0xf4e1b7(0x2f4)](0x0,_0xf1223e);}},Game_BattlerBase[_0x124c5c(0x21b)]['addDebuffTurns']=function(_0x466353,_0x14372c){const _0x53e702=_0x124c5c;this[_0x53e702(0x398)](_0x466353)&&(_0x14372c+=this[_0x53e702(0x3e6)](stateId),this[_0x53e702(0x196)](_0x466353,_0x14372c));},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x273)]=function(_0xbbe553){const _0x5176bc=_0x124c5c;if(typeof _0xbbe553!=='number')_0xbbe553=_0xbbe553['id'];return this[_0x5176bc(0x375)]=this[_0x5176bc(0x375)]||{},this[_0x5176bc(0x375)][_0xbbe553]=this[_0x5176bc(0x375)][_0xbbe553]||{},this[_0x5176bc(0x375)][_0xbbe553];},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3a2)]=function(_0x1b53a6,_0x56e90b){const _0x49c41c=_0x124c5c;if(typeof _0x1b53a6!==_0x49c41c(0x3ad))_0x1b53a6=_0x1b53a6['id'];const _0x4c2b40=this[_0x49c41c(0x273)](_0x1b53a6);return _0x4c2b40[_0x56e90b];},Game_BattlerBase[_0x124c5c(0x21b)]['setStateData']=function(_0x128ac6,_0x583bf8,_0x2dc8c9){const _0x2a9b9b=_0x124c5c;if(typeof _0x128ac6!==_0x2a9b9b(0x3ad))_0x128ac6=_0x128ac6['id'];const _0x51df0b=this['stateData'](_0x128ac6);_0x51df0b[_0x583bf8]=_0x2dc8c9;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3f7)]=function(_0x8118ea){const _0x5510d2=_0x124c5c;if(typeof _0x8118ea!=='number')_0x8118ea=_0x8118ea['id'];this[_0x5510d2(0x375)]=this['_stateData']||{},this[_0x5510d2(0x375)][_0x8118ea]={};},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x100)]=function(_0x2d29d1){const _0x630313=_0x124c5c;if(typeof _0x2d29d1!==_0x630313(0x3ad))_0x2d29d1=_0x2d29d1['id'];return this[_0x630313(0x2e7)]=this[_0x630313(0x2e7)]||{},this[_0x630313(0x2e7)][_0x2d29d1]===undefined&&(this['_stateDisplay'][_0x2d29d1]=''),this['_stateDisplay'][_0x2d29d1];},Game_BattlerBase[_0x124c5c(0x21b)]['setStateDisplay']=function(_0x1f8074,_0x242209){const _0x2b184c=_0x124c5c;if(typeof _0x1f8074!==_0x2b184c(0x3ad))_0x1f8074=_0x1f8074['id'];this[_0x2b184c(0x2e7)]=this[_0x2b184c(0x2e7)]||{},this['_stateDisplay'][_0x1f8074]=_0x242209;},Game_BattlerBase[_0x124c5c(0x21b)]['clearStateDisplay']=function(_0x114eb6){const _0x44c51c=_0x124c5c;if(typeof _0x114eb6!==_0x44c51c(0x3ad))_0x114eb6=_0x114eb6['id'];this[_0x44c51c(0x2e7)]=this[_0x44c51c(0x2e7)]||{},this[_0x44c51c(0x2e7)][_0x114eb6]='';},Game_BattlerBase[_0x124c5c(0x21b)]['getStateOrigin']=function(_0x2b5ceb){const _0x2137f3=_0x124c5c;if(typeof _0x2b5ceb!==_0x2137f3(0x3ad))_0x2b5ceb=_0x2b5ceb['id'];this['_stateOrigin']=this['_stateOrigin']||{},this[_0x2137f3(0x330)][_0x2b5ceb]=this[_0x2137f3(0x330)][_0x2b5ceb]||'user';const _0x23374a=this['_stateOrigin'][_0x2b5ceb];return this[_0x2137f3(0x3d3)](_0x23374a);},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3cd)]=function(_0x89ee1,_0x400ed5){const _0x44d0d7=_0x124c5c;this[_0x44d0d7(0x330)]=this[_0x44d0d7(0x330)]||{};const _0x4150d5=_0x400ed5?this[_0x44d0d7(0x3a3)](_0x400ed5):this[_0x44d0d7(0x2a8)]();this[_0x44d0d7(0x330)][_0x89ee1]=_0x4150d5;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x13f)]=function(_0x3cc13c){const _0x5b8f81=_0x124c5c;this[_0x5b8f81(0x330)]=this[_0x5b8f81(0x330)]||{},delete this[_0x5b8f81(0x330)][_0x3cc13c];},Game_BattlerBase[_0x124c5c(0x21b)]['clearAllStateOrigins']=function(){const _0x5f0bf8=_0x124c5c;this[_0x5f0bf8(0x330)]={};},Game_BattlerBase['prototype'][_0x124c5c(0x2a8)]=function(){const _0x1e7e83=_0x124c5c,_0x45fd43=this['getCurrentStateActiveUser']();return this[_0x1e7e83(0x3a3)](_0x45fd43);},Game_BattlerBase['prototype']['getCurrentStateActiveUser']=function(){const _0x321d1c=_0x124c5c;if($gameParty[_0x321d1c(0x16e)]()){if(BattleManager['_subject'])return BattleManager[_0x321d1c(0x1fa)];else{if(BattleManager['_currentActor']){if(_0x321d1c(0x3cc)===_0x321d1c(0x2e9)){const _0x1b5588=_0x2ab5a7[_0x321d1c(0x40a)]('['+_0x18bcae['$1']['match'](/\d+/g)+']');for(const _0x17fbfc of _0x1b5588){if(_0x289707[_0x321d1c(0x2ac)](_0x17fbfc))return![];}return!![];}else return BattleManager[_0x321d1c(0xd4)];}}}else{if(_0x321d1c(0x408)==='zhriq')return'iconText';else{const _0x298f20=SceneManager[_0x321d1c(0x347)];if(![Scene_Map,Scene_Item]['includes'](_0x298f20[_0x321d1c(0x3e4)]))return $gameParty[_0x321d1c(0x2bf)]();}}return this;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x3a3)]=function(_0x229919){const _0x4e9a47=_0x124c5c;if(!_0x229919)return'user';if(_0x229919[_0x4e9a47(0x103)]()){if(_0x4e9a47(0xcc)!==_0x4e9a47(0x21e))return _0x4e9a47(0x33d)[_0x4e9a47(0x2c4)](_0x229919[_0x4e9a47(0x20d)]());else{_0x3748cb[_0x4e9a47(0x2ad)](/<REMOVE OTHER (.*) STATES>/i);const _0x1e9bb4=_0x4b8f5b(_0x2294e7['$1']);this[_0x4e9a47(0x23e)](_0x1e9bb4,_0x419b01);}}else{const _0x3f2795='<enemy-%1>'['format'](_0x229919[_0x4e9a47(0x116)]()),_0x41909f=_0x4e9a47(0x118)[_0x4e9a47(0x2c4)](_0x229919['index']()),_0x7b90e1=_0x4e9a47(0x357)[_0x4e9a47(0x2c4)]($gameTroop['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'[_0x4e9a47(0x2c4)](_0x3f2795,_0x41909f,_0x7b90e1);}return'user';},Game_BattlerBase['prototype'][_0x124c5c(0x3d3)]=function(_0x2491da){const _0x3c7d6c=_0x124c5c;if(_0x2491da===_0x3c7d6c(0x2fb)){if(_0x3c7d6c(0x3c3)!=='TJvdJ')for(const _0x3fc972 of _0x43f36b['allBattleMembers']()){if(_0x3fc972)_0x3fc972[_0x3c7d6c(0x305)]();}else return this;}else{if(_0x2491da[_0x3c7d6c(0x2ad)](/<actor-(\d+)>/i)){if(_0x3c7d6c(0x21f)!==_0x3c7d6c(0x21f)){this['onAddState'](_0x510fe3);;}else return $gameActors[_0x3c7d6c(0x2ab)](Number(RegExp['$1']));}else{if(_0x3c7d6c(0x2c5)===_0x3c7d6c(0x2c5)){if($gameParty[_0x3c7d6c(0x16e)]()&&_0x2491da[_0x3c7d6c(0x2ad)](/<troop-(\d+)>/i)){const _0x176baf=Number(RegExp['$1']);if(_0x176baf===$gameTroop[_0x3c7d6c(0x1c6)]()){if(_0x2491da[_0x3c7d6c(0x2ad)](/<member-(\d+)>/i)){if(_0x3c7d6c(0x276)!==_0x3c7d6c(0x276))this[_0x3c7d6c(0x291)](_0x4f8a07[_0x3c7d6c(0x200)]()),this['changeOutlineColor'](_0x51f267[_0x3c7d6c(0x33f)]());else return $gameTroop['members']()[Number(RegExp['$1'])];}}}if(_0x2491da[_0x3c7d6c(0x2ad)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}else this['_statusWindow'][_0x3c7d6c(0x373)](this[_0x3c7d6c(0x10d)]());}}return this;},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x21d)]=Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x127)],Game_Battler[_0x124c5c(0x21b)]['addState']=function(_0x21bb03){const _0x414f33=_0x124c5c,_0x5c6922=this['isStateAddable'](_0x21bb03);VisuMZ['SkillsStatesCore'][_0x414f33(0x21d)][_0x414f33(0x217)](this,_0x21bb03);if(_0x5c6922&&this[_0x414f33(0x3e2)]($dataStates[_0x21bb03])){this[_0x414f33(0x343)](_0x21bb03);;}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x331)]=Game_Battler[_0x124c5c(0x21b)]['isStateAddable'],Game_Battler['prototype'][_0x124c5c(0x231)]=function(_0xa95617){const _0x589279=_0x124c5c,_0x23d9a3=$dataStates[_0xa95617];if(_0x23d9a3&&_0x23d9a3[_0x589279(0x139)][_0x589279(0x2ad)](/<NO DEATH CLEAR>/i))return!this[_0x589279(0x18c)](_0xa95617)&&!this[_0x589279(0x370)](_0xa95617)&&!this[_0x589279(0x302)][_0x589279(0x309)](_0xa95617);return VisuMZ['SkillsStatesCore'][_0x589279(0x331)]['call'](this,_0xa95617);},Game_Battler[_0x124c5c(0x21b)]['onAddState']=function(_0x1d37d9){const _0x3cc4d1=_0x124c5c;this[_0x3cc4d1(0x3cd)](_0x1d37d9),this[_0x3cc4d1(0x2f2)](_0x1d37d9),this[_0x3cc4d1(0x38e)](_0x1d37d9),this[_0x3cc4d1(0x1d8)](_0x1d37d9),this['onAddStateGlobalJS'](_0x1d37d9);},Game_Battler['prototype']['onRemoveState']=function(_0x963805){const _0x11b7c1=_0x124c5c;this[_0x11b7c1(0x3be)](_0x963805),this[_0x11b7c1(0x308)](_0x963805),Game_BattlerBase[_0x11b7c1(0x21b)][_0x11b7c1(0xe7)]['call'](this,_0x963805);},Game_Battler['prototype'][_0x124c5c(0x186)]=function(_0x1614a7){const _0x154dc3=_0x124c5c;for(const _0x39b71d of this[_0x154dc3(0x1a8)]()){this[_0x154dc3(0xeb)](_0x39b71d['id'])&&_0x39b71d['autoRemovalTiming']===_0x1614a7&&(this[_0x154dc3(0x152)](_0x39b71d['id']),this[_0x154dc3(0x31e)](_0x39b71d['id']),this[_0x154dc3(0x229)](_0x39b71d['id']));}},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x31e)]=function(_0x45ee82){const _0x484917=_0x124c5c;this[_0x484917(0x31b)](_0x45ee82);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x1d8)]=function(_0x31f8df){const _0xbdf6f9=_0x124c5c;if(this[_0xbdf6f9(0x24b)]||this[_0xbdf6f9(0x361)])return;const _0x26916d=VisuMZ[_0xbdf6f9(0x3b7)][_0xbdf6f9(0x27d)];if(_0x26916d[_0x31f8df])_0x26916d[_0x31f8df][_0xbdf6f9(0x217)](this,_0x31f8df);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x3be)]=function(_0x46a751){const _0x56e7ac=_0x124c5c;if(this[_0x56e7ac(0x24b)]||this[_0x56e7ac(0x361)])return;const _0x32c41c=VisuMZ[_0x56e7ac(0x3b7)][_0x56e7ac(0x25e)];if(_0x32c41c[_0x46a751])_0x32c41c[_0x46a751][_0x56e7ac(0x217)](this,_0x46a751);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x31b)]=function(_0x31f00d){const _0xbeb049=_0x124c5c;if(this[_0xbeb049(0x24b)]||this[_0xbeb049(0x361)])return;const _0x1a2f9a=VisuMZ['SkillsStatesCore'][_0xbeb049(0x21a)];if(_0x1a2f9a[_0x31f00d])_0x1a2f9a[_0x31f00d][_0xbeb049(0x217)](this,_0x31f00d);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x3c2)]=function(_0xb4f59f){const _0xc061f8=_0x124c5c;if(this[_0xc061f8(0x24b)]||this[_0xc061f8(0x361)])return;try{if(_0xc061f8(0xd7)===_0xc061f8(0x2ca)){const _0x1e21d3=this[_0xc061f8(0x1d1)](this[_0xc061f8(0x376)]());let _0x1192d2=this['commandName'](this[_0xc061f8(0x376)]());_0x1192d2=_0x1192d2[_0xc061f8(0x3e0)](/\\I\[(\d+)\]/gi,''),_0x33fc7f['resetFontSettings'](),this[_0xc061f8(0x28d)](_0x1192d2,_0x1e21d3),this[_0xc061f8(0x22f)](_0x1192d2,_0x1e21d3),this[_0xc061f8(0x11a)](_0x1192d2,_0x1e21d3);}else VisuMZ[_0xc061f8(0x3b7)][_0xc061f8(0x40d)]['States'][_0xc061f8(0x142)][_0xc061f8(0x217)](this,_0xb4f59f);}catch(_0x595031){if($gameTemp[_0xc061f8(0x1ab)]())console[_0xc061f8(0x140)](_0x595031);}},Game_Battler['prototype'][_0x124c5c(0x308)]=function(_0x38e95f){const _0x503016=_0x124c5c;if(this[_0x503016(0x24b)]||this['_tempBattler'])return;try{VisuMZ[_0x503016(0x3b7)][_0x503016(0x40d)]['States'][_0x503016(0x251)][_0x503016(0x217)](this,_0x38e95f);}catch(_0x24a86d){if($gameTemp[_0x503016(0x1ab)]())console[_0x503016(0x140)](_0x24a86d);}},Game_Battler['prototype'][_0x124c5c(0x229)]=function(_0x35430b){const _0x1761c6=_0x124c5c;if(this[_0x1761c6(0x24b)]||this['_tempBattler'])return;try{_0x1761c6(0x1aa)===_0x1761c6(0x2c2)?this[_0x1761c6(0x148)]='':VisuMZ[_0x1761c6(0x3b7)]['Settings'][_0x1761c6(0x107)]['onExpireStateJS'][_0x1761c6(0x217)](this,_0x35430b);}catch(_0x39aa8e){if($gameTemp['isPlaytest']())console['log'](_0x39aa8e);}},Game_Battler[_0x124c5c(0x21b)]['statesByCategory']=function(_0x51c643){const _0x65fbc5=_0x124c5c;return _0x51c643=_0x51c643[_0x65fbc5(0x3b0)]()[_0x65fbc5(0x171)](),this[_0x65fbc5(0x1a8)]()['filter'](_0x46b579=>_0x46b579['categories']['includes'](_0x51c643));},Game_Battler['prototype'][_0x124c5c(0x2ed)]=function(_0x447bfc,_0x1ec86c){const _0x3f5abc=_0x124c5c;_0x447bfc=_0x447bfc[_0x3f5abc(0x3b0)]()[_0x3f5abc(0x171)](),_0x1ec86c=_0x1ec86c||0x0;const _0xe87dbe=this[_0x3f5abc(0x3af)](_0x447bfc),_0x5aac01=[];for(const _0x36e555 of _0xe87dbe){if(!_0x36e555)continue;if(_0x1ec86c<=0x0)break;_0x5aac01[_0x3f5abc(0x239)](_0x36e555['id']),this[_0x3f5abc(0x302)]['success']=!![],_0x1ec86c--;}while(_0x5aac01['length']>0x0){if(_0x3f5abc(0x14b)===_0x3f5abc(0x14b))this['removeState'](_0x5aac01[_0x3f5abc(0x317)]());else{if(!this[_0x3f5abc(0x281)](_0x3dcd06))return![];return!![];}}},Game_Battler['prototype'][_0x124c5c(0x23e)]=function(_0x68c08c,_0x469a2d){const _0x2a2d7f=_0x124c5c;_0x68c08c=_0x68c08c['toUpperCase']()['trim'](),_0x469a2d=_0x469a2d||[];const _0x4a7a18=this[_0x2a2d7f(0x3af)](_0x68c08c),_0x45ab3c=[];for(const _0x1f6cee of _0x4a7a18){if(!_0x1f6cee)continue;if(_0x469a2d[_0x2a2d7f(0x261)](_0x1f6cee))continue;_0x45ab3c[_0x2a2d7f(0x239)](_0x1f6cee['id']),this[_0x2a2d7f(0x302)]['success']=!![];}while(_0x45ab3c[_0x2a2d7f(0x37d)]>0x0){this[_0x2a2d7f(0x152)](_0x45ab3c[_0x2a2d7f(0x317)]());}},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x2aa)]=function(_0x43b81a){const _0xa71a79=_0x124c5c;return this[_0xa71a79(0x268)](_0x43b81a)>0x0;},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x2a9)]=function(_0x2ae0a5){const _0x2882b6=_0x124c5c;return this[_0x2882b6(0x2c8)](_0x2ae0a5)>0x0;},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x268)]=function(_0xa98e58){const _0xdeee11=_0x124c5c,_0x32f601=this[_0xdeee11(0x3af)](_0xa98e58)[_0xdeee11(0x278)](_0x1bea19=>this[_0xdeee11(0x1ce)](_0x1bea19['id']));return _0x32f601[_0xdeee11(0x37d)];},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x2c8)]=function(_0x22c2bd){const _0x17d268=_0x124c5c,_0x3c0e28=this[_0x17d268(0x3af)](_0x22c2bd);return _0x3c0e28[_0x17d268(0x37d)];},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2fa)]=Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x18c)],Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x18c)]=function(_0x1e39e8){const _0x4d21d9=_0x124c5c,_0x1da1ed=$dataStates[_0x1e39e8];if(_0x1da1ed&&_0x1da1ed[_0x4d21d9(0x1d3)][_0x4d21d9(0x37d)]>0x0)for(const _0x36b112 of _0x1da1ed['categories']){if(this['isStateCategoryResisted'](_0x36b112))return!![];}return VisuMZ[_0x4d21d9(0x3b7)][_0x4d21d9(0x2fa)]['call'](this,_0x1e39e8);},Game_BattlerBase['prototype']['isStateCategoryResisted']=function(_0x1f1ae3){const _0x1b4fd0=_0x124c5c;let _0x329160=_0x1b4fd0(0x122);if(this['checkCacheKey'](_0x329160))return this[_0x1b4fd0(0x1b7)][_0x329160][_0x1b4fd0(0x261)](_0x1f1ae3);return this[_0x1b4fd0(0x1b7)][_0x329160]=this['makeResistedStateCategories'](),this[_0x1b4fd0(0x1b7)][_0x329160][_0x1b4fd0(0x261)](_0x1f1ae3);},Game_BattlerBase[_0x124c5c(0x21b)]['makeResistedStateCategories']=function(){const _0x4776ec=_0x124c5c,_0x5e6bb4=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x4022c2=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x5507bc=[];for(const _0x4ae74d of this[_0x4776ec(0x258)]()){if(!_0x4ae74d)continue;const _0x36a90a=_0x4ae74d['note'],_0x4afd06=_0x36a90a[_0x4776ec(0x2ad)](_0x5e6bb4);if(_0x4afd06)for(const _0x183855 of _0x4afd06){if(_0x4776ec(0x197)===_0x4776ec(0x197)){_0x183855[_0x4776ec(0x2ad)](_0x5e6bb4);const _0xcb5671=String(RegExp['$1'])['split'](',')[_0x4776ec(0x130)](_0x405077=>String(_0x405077)[_0x4776ec(0x3b0)]()[_0x4776ec(0x171)]());_0x5507bc=_0x5507bc[_0x4776ec(0x26f)](_0xcb5671);}else this[_0x4776ec(0x314)](_0x1350b5);}if(_0x36a90a[_0x4776ec(0x2ad)](_0x4022c2)){const _0x528ad9=String(RegExp['$1'])[_0x4776ec(0x364)](/[\r\n]+/)[_0x4776ec(0x130)](_0x5452f9=>String(_0x5452f9)['toUpperCase']()[_0x4776ec(0x171)]());_0x5507bc=_0x5507bc[_0x4776ec(0x26f)](_0x528ad9);}}return _0x5507bc;},Game_BattlerBase[_0x124c5c(0x21b)][_0x124c5c(0x2f2)]=function(_0x2cc294){const _0x53ae0e=_0x124c5c,_0x6e6169=$dataStates[_0x2cc294];if(!_0x6e6169)return;const _0x155b4c=_0x6e6169[_0x53ae0e(0x139)]||'',_0x1b9dff=_0x155b4c[_0x53ae0e(0x2ad)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x1b9dff){const _0x5efe92=[_0x6e6169];for(const _0x184971 of _0x1b9dff){if(_0x53ae0e(0x1c2)!==_0x53ae0e(0x3b2)){_0x184971[_0x53ae0e(0x2ad)](/<REMOVE OTHER (.*) STATES>/i);const _0x2afc65=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x2afc65,_0x5efe92);}else{const _0x1814e6=this['_buffs'][_0x98940e];_0x240c0b[_0x53ae0e(0x3b7)][_0x53ae0e(0x3b8)][_0x53ae0e(0x217)](this,_0x238bf9);if(_0x1814e6>0x0)this['onEraseBuff'](_0x983075);if(_0x1814e6<0x0)this[_0x53ae0e(0x146)](_0x4dee23);}}}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1ff)]=Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x3b4)],Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x3b4)]=function(_0x1ee0f0,_0x320b70){const _0x40f895=_0x124c5c;VisuMZ[_0x40f895(0x3b7)][_0x40f895(0x1ff)]['call'](this,_0x1ee0f0,_0x320b70);if(this['isBuffAffected'](_0x1ee0f0)){if(_0x40f895(0x2da)==='UDwPB')this[_0x40f895(0x3da)](_0x1ee0f0,_0x320b70);else{if([_0x40f895(0x2a4),'untitled'][_0x40f895(0x261)](_0x156e8c[_0x40f895(0x1e1)]()))return;_0x28c7b8[_0x40f895(0x3b7)][_0x40f895(0x353)][_0x40f895(0x217)](this,_0x251fa9,_0x7869e9,_0x168240,_0x1539dc);}}},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x109)]=function(_0x87f0ca){},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0xf5)]=Game_Battler[_0x124c5c(0x21b)]['addDebuff'],Game_Battler[_0x124c5c(0x21b)]['addDebuff']=function(_0x3cddcf,_0xafcc38){const _0x3628a9=_0x124c5c;VisuMZ['SkillsStatesCore']['Game_Battler_addDebuff'][_0x3628a9(0x217)](this,_0x3cddcf,_0xafcc38),this[_0x3628a9(0x398)](_0x3cddcf)&&this[_0x3628a9(0x354)](_0x3cddcf,_0xafcc38);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0xe6)]=function(){const _0x5ee2d1=_0x124c5c;for(let _0x5c1997=0x0;_0x5c1997<this[_0x5ee2d1(0x311)]();_0x5c1997++){if(this['isBuffExpired'](_0x5c1997)){const _0x55c1aa=this['_buffs'][_0x5c1997];this[_0x5ee2d1(0x28e)](_0x5c1997);if(_0x55c1aa>0x0)this['onExpireBuff'](_0x5c1997);if(_0x55c1aa<0x0)this['onExpireDebuff'](_0x5c1997);}}},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x3da)]=function(_0x19217e,_0x37bb9c){const _0x5c74a7=_0x124c5c;this[_0x5c74a7(0xb7)](_0x19217e,_0x37bb9c);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x354)]=function(_0x562bda,_0x4aa269){const _0x13f1a6=_0x124c5c;this[_0x13f1a6(0x193)](_0x562bda,_0x4aa269);},Game_Battler['prototype']['onEraseBuff']=function(_0x4857b7){const _0x41f117=_0x124c5c;Game_BattlerBase[_0x41f117(0x21b)][_0x41f117(0x350)][_0x41f117(0x217)](this,_0x4857b7),this[_0x41f117(0x219)](_0x4857b7);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x146)]=function(_0x906bc9){const _0x3491fe=_0x124c5c;Game_BattlerBase[_0x3491fe(0x21b)][_0x3491fe(0x146)][_0x3491fe(0x217)](this,_0x906bc9),this['onEraseDebuffGlobalJS'](_0x906bc9);},Game_Battler[_0x124c5c(0x21b)]['onExpireBuff']=function(_0x4648eb){const _0x4f93af=_0x124c5c;this[_0x4f93af(0x314)](_0x4648eb);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x1cd)]=function(_0x2e4b35){this['onExpireDebuffGlobalJS'](_0x2e4b35);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0xb7)]=function(_0xa46e92,_0x24da92){const _0x1cff35=_0x124c5c;VisuMZ[_0x1cff35(0x3b7)]['Settings'][_0x1cff35(0xf6)][_0x1cff35(0x3f3)][_0x1cff35(0x217)](this,_0xa46e92,_0x24da92);},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x193)]=function(_0x86ff65,_0x2dbda1){const _0x4a4f04=_0x124c5c;VisuMZ[_0x4a4f04(0x3b7)][_0x4a4f04(0x40d)][_0x4a4f04(0xf6)][_0x4a4f04(0x201)]['call'](this,_0x86ff65,_0x2dbda1);},Game_BattlerBase[_0x124c5c(0x21b)]['onEraseBuffGlobalJS']=function(_0x5a048a){const _0x364168=_0x124c5c;VisuMZ[_0x364168(0x3b7)]['Settings'][_0x364168(0xf6)][_0x364168(0x39f)][_0x364168(0x217)](this,_0x5a048a);},Game_BattlerBase['prototype'][_0x124c5c(0x29d)]=function(_0x2f87bc){const _0x70d6cf=_0x124c5c;VisuMZ[_0x70d6cf(0x3b7)][_0x70d6cf(0x40d)][_0x70d6cf(0xf6)][_0x70d6cf(0x1fd)][_0x70d6cf(0x217)](this,_0x2f87bc);},Game_Battler[_0x124c5c(0x21b)]['onExpireBuffGlobalJS']=function(_0x503502){const _0x1677a0=_0x124c5c;VisuMZ['SkillsStatesCore'][_0x1677a0(0x40d)][_0x1677a0(0xf6)][_0x1677a0(0x12d)][_0x1677a0(0x217)](this,_0x503502);},Game_Battler[_0x124c5c(0x21b)]['onExpireDebuffGlobalJS']=function(_0x34ddc4){const _0x4b73c1=_0x124c5c;VisuMZ[_0x4b73c1(0x3b7)]['Settings'][_0x4b73c1(0xf6)][_0x4b73c1(0xd8)][_0x4b73c1(0x217)](this,_0x34ddc4);},Game_Battler[_0x124c5c(0x21b)]['onAddStateMakeCustomSlipValues']=function(_0x1ab974){const _0x574a24=_0x124c5c,_0x5341e3=VisuMZ[_0x574a24(0x3b7)],_0x1be5a7=[_0x574a24(0x2d5),_0x574a24(0x1ec),_0x574a24(0x396),'stateMpSlipHealJS',_0x574a24(0x404),_0x574a24(0x2e0)];for(const _0x3a4dd1 of _0x1be5a7){if(_0x574a24(0xe4)!==_0x574a24(0xe4))for(const _0x2b7d30 of _0x2cc7db){_0x2b7d30[_0x574a24(0x2ad)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x44277c=_0x1e9bf5(_0x5dc215['$1'])[_0x574a24(0x3b0)]()[_0x574a24(0x171)]()[_0x574a24(0x364)](',');for(const _0x46f5cf of _0x44277c){_0x3b2851['categories'][_0x574a24(0x239)](_0x46f5cf[_0x574a24(0x171)]());}}else _0x5341e3[_0x3a4dd1][_0x1ab974]&&(_0x574a24(0x2ee)!==_0x574a24(0x295)?_0x5341e3[_0x3a4dd1][_0x1ab974][_0x574a24(0x217)](this,_0x1ab974):this[_0x574a24(0xba)][_0x1a36c2]=_0x24aeb0(_0x4896e0['$1']));}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1be)]=Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x37a)],Game_Battler['prototype']['regenerateAll']=function(){const _0x57ed17=_0x124c5c;this[_0x57ed17(0x2a7)](),VisuMZ['SkillsStatesCore']['Game_Battler_regenerateAll'][_0x57ed17(0x217)](this),this[_0x57ed17(0x176)](),this[_0x57ed17(0x2ff)]();},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x176)]=function(){const _0x1daf30=_0x124c5c;for(const _0x5367a4 of this[_0x1daf30(0x14d)]()){if(!_0x5367a4)continue;this[_0x1daf30(0x38e)](_0x5367a4['id']);}},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x2a7)]=function(){const _0x1b432d=_0x124c5c;for(const _0xb30b4f of this['states']()){if(!_0xb30b4f)continue;_0xb30b4f[_0x1b432d(0x139)][_0x1b432d(0x2ad)](/<JS SLIP REFRESH>/i)&&this[_0x1b432d(0x38e)](_0xb30b4f['id']);}},Game_Battler[_0x124c5c(0x21b)][_0x124c5c(0x2ff)]=function(){const _0x1ed8f3=_0x124c5c;if(!this[_0x1ed8f3(0x159)]())return;const _0x1323e2=this['states']();for(const _0xf6c887 of _0x1323e2){if('ZLEHX'!==_0x1ed8f3(0xc1)){const _0x32f9c5=_0x2ccb9f[_0x1ed8f3(0x40a)]('['+_0x4f912c['$1'][_0x1ed8f3(0x2ad)](/\d+/g)+']');for(const _0x102a3d of _0x32f9c5){if(!_0x117034[_0x1ed8f3(0x22d)](_0x102a3d))return!![];}return![];}else{if(!_0xf6c887)continue;this[_0x1ed8f3(0x237)](_0xf6c887);}}},Game_Battler['prototype'][_0x124c5c(0x237)]=function(_0x3f3d22){const _0x47706d=_0x124c5c,_0x1c1206=this['getStateData'](_0x3f3d22['id'],_0x47706d(0x381))||0x0,_0x3024e9=-this['maxSlipDamage'](),_0x3baa19=Math[_0x47706d(0x1a5)](_0x1c1206,_0x3024e9);if(_0x3baa19!==0x0){if(_0x47706d(0x2a3)!==_0x47706d(0x20a)){const _0x2e7678=this['_result'][_0x47706d(0x256)]||0x0;this['gainHp'](_0x3baa19),this['_result'][_0x47706d(0x256)]+=_0x2e7678;}else{if(!_0x22aa7b['value'](_0x5272f6))return![];}}const _0x36ed5c=this[_0x47706d(0x3a2)](_0x3f3d22['id'],_0x47706d(0x3c6))||0x0;if(_0x36ed5c!==0x0){const _0x397988=this[_0x47706d(0x302)][_0x47706d(0x181)]||0x0;this[_0x47706d(0x399)](_0x36ed5c),this[_0x47706d(0x302)][_0x47706d(0x181)]+=_0x397988;}const _0x2d13bb=this[_0x47706d(0x3a2)](_0x3f3d22['id'],'slipTp')||0x0;_0x2d13bb!==0x0&&this['gainSilentTp'](_0x2d13bb);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1cf)]=Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x27b)],Game_Actor[_0x124c5c(0x21b)]['skillTypes']=function(){const _0x658247=_0x124c5c,_0x1a3271=VisuMZ[_0x658247(0x3b7)]['Game_Actor_skillTypes'][_0x658247(0x217)](this),_0x348400=VisuMZ[_0x658247(0x3b7)][_0x658247(0x40d)][_0x658247(0x2dc)];let _0x570fc4=_0x348400[_0x658247(0x226)];return $gameParty[_0x658247(0x16e)]()&&(_0x570fc4=_0x570fc4[_0x658247(0x26f)](_0x348400['BattleHiddenSkillTypes'])),_0x1a3271['filter'](_0x41891f=>!_0x570fc4[_0x658247(0x261)](_0x41891f));},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x300)]=function(){const _0x38387d=_0x124c5c;return this[_0x38387d(0x2d9)]()[_0x38387d(0x278)](_0x2c0f9c=>this[_0x38387d(0x1b9)](_0x2c0f9c));},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x1b9)]=function(_0x19b89a){const _0x1102b6=_0x124c5c;if(!this[_0x1102b6(0x35d)](_0x19b89a))return![];if(!_0x19b89a)return![];if(!this[_0x1102b6(0x39e)](_0x19b89a))return![];if(this[_0x1102b6(0x1df)](_0x19b89a))return![];return!![];},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x39e)]=function(_0x3de1a8){const _0x13b78e=_0x124c5c,_0x5b1c4b=this[_0x13b78e(0x27b)](),_0x7ed251=DataManager['getSkillTypes'](_0x3de1a8),_0x14b06e=_0x5b1c4b['filter'](_0x4e41dc=>_0x7ed251[_0x13b78e(0x261)](_0x4e41dc));return _0x14b06e['length']>0x0;},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x1df)]=function(_0x79c45e){const _0x186b98=_0x124c5c;if(!VisuMZ[_0x186b98(0x3b7)]['CheckVisibleBattleNotetags'](this,_0x79c45e))return!![];if(!VisuMZ[_0x186b98(0x3b7)][_0x186b98(0x2e5)](this,_0x79c45e))return!![];if(!VisuMZ[_0x186b98(0x3b7)][_0x186b98(0x172)](this,_0x79c45e))return!![];return![];},Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x1c9)]=function(){const _0x7009fa=_0x124c5c;let _0x28d4a7=[this[_0x7009fa(0x2ab)](),this[_0x7009fa(0x323)]()];_0x28d4a7=_0x28d4a7[_0x7009fa(0x26f)](this[_0x7009fa(0x1a4)]()[_0x7009fa(0x278)](_0x21e0e2=>_0x21e0e2));for(const _0x495c39 of this[_0x7009fa(0x157)]){if('OrlPj'===_0x7009fa(0x35f)){if(!_0x5241a4[_0x7009fa(0x2ac)](_0x3c77c4))return![];}else{const _0x2a51ac=$dataSkills[_0x495c39];if(_0x2a51ac)_0x28d4a7[_0x7009fa(0x239)](_0x2a51ac);}}return _0x28d4a7;},Game_Actor['prototype']['addPassiveStatesByPluginParameters']=function(){const _0xbafe78=_0x124c5c;Game_Battler[_0xbafe78(0x21b)]['addPassiveStatesByPluginParameters'][_0xbafe78(0x217)](this);const _0x4eca03=VisuMZ[_0xbafe78(0x3b7)]['Settings']['PassiveStates'][_0xbafe78(0xea)];this[_0xbafe78(0x1b7)]['passiveStates']=this[_0xbafe78(0x1b7)][_0xbafe78(0x14d)]['concat'](_0x4eca03);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x321)]=Game_Actor['prototype'][_0x124c5c(0x1ba)],Game_Actor['prototype'][_0x124c5c(0x1ba)]=function(_0x38c156){const _0x5abff2=_0x124c5c;VisuMZ[_0x5abff2(0x3b7)][_0x5abff2(0x321)][_0x5abff2(0x217)](this,_0x38c156),this['_cache']={},this[_0x5abff2(0x14d)]();},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2c1)]=Game_Actor['prototype'][_0x124c5c(0x3db)],Game_Actor[_0x124c5c(0x21b)][_0x124c5c(0x3db)]=function(_0x2bd5ab){const _0x5e6b01=_0x124c5c;VisuMZ[_0x5e6b01(0x3b7)][_0x5e6b01(0x2c1)][_0x5e6b01(0x217)](this,_0x2bd5ab),this['_cache']={},this[_0x5e6b01(0x14d)]();},Game_Actor[_0x124c5c(0x21b)]['stepsForTurn']=function(){const _0x55bed2=_0x124c5c;return VisuMZ[_0x55bed2(0x3b7)]['Settings'][_0x55bed2(0x107)][_0x55bed2(0x1af)]??0x14;},Game_Enemy[_0x124c5c(0x21b)][_0x124c5c(0x1c9)]=function(){const _0x3a0968=_0x124c5c;let _0x174fc8=[this['enemy']()];return _0x174fc8[_0x3a0968(0x26f)](this[_0x3a0968(0x2d9)]());},Game_Enemy[_0x124c5c(0x21b)][_0x124c5c(0x20b)]=function(){const _0x2551ab=_0x124c5c;Game_Battler[_0x2551ab(0x21b)][_0x2551ab(0x20b)][_0x2551ab(0x217)](this);const _0x287fc3=VisuMZ[_0x2551ab(0x3b7)][_0x2551ab(0x40d)][_0x2551ab(0x284)][_0x2551ab(0x19e)];this['_cache'][_0x2551ab(0x14d)]=this[_0x2551ab(0x1b7)]['passiveStates'][_0x2551ab(0x26f)](_0x287fc3);},Game_Enemy['prototype'][_0x124c5c(0x2d9)]=function(){const _0x1041ad=_0x124c5c,_0x27ab0c=[];for(const _0x44e2b1 of this[_0x1041ad(0xed)]()[_0x1041ad(0x25f)]){if(_0x1041ad(0x30d)!==_0x1041ad(0x30d))_0x5988f6[_0x1041ad(0xf4)]=_0x536a37(_0x14a896['$1']);else{const _0x1e9d92=$dataSkills[_0x44e2b1[_0x1041ad(0x379)]];if(_0x1e9d92&&!_0x27ab0c['includes'](_0x1e9d92))_0x27ab0c[_0x1041ad(0x239)](_0x1e9d92);}}return _0x27ab0c;},Game_Enemy[_0x124c5c(0x21b)]['meetsStateCondition']=function(_0x346823){return this['hasState']($dataStates[_0x346823]);},VisuMZ[_0x124c5c(0x3b7)]['Game_Unit_isAllDead']=Game_Unit['prototype'][_0x124c5c(0xd6)],Game_Unit[_0x124c5c(0x21b)][_0x124c5c(0xd6)]=function(){const _0x439204=_0x124c5c;if(this[_0x439204(0x3e1)]())return!![];return VisuMZ[_0x439204(0x3b7)]['Game_Unit_isAllDead'][_0x439204(0x217)](this);},Game_Unit[_0x124c5c(0x21b)][_0x124c5c(0x3e1)]=function(){const _0x2c85f0=_0x124c5c,_0x5806db=this['aliveMembers']();for(const _0x409e2b of _0x5806db){if(!_0x409e2b[_0x2c85f0(0x31d)]())return![];}return!![];},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1e6)]=Game_Troop[_0x124c5c(0x21b)][_0x124c5c(0x141)],Game_Troop[_0x124c5c(0x21b)]['setup']=function(_0x33e5f3){const _0x76faf6=_0x124c5c;VisuMZ['SkillsStatesCore'][_0x76faf6(0x1e6)][_0x76faf6(0x217)](this,_0x33e5f3),this[_0x76faf6(0xc5)]();},Game_Troop[_0x124c5c(0x21b)][_0x124c5c(0xc5)]=function(){const _0x3cb67b=_0x124c5c;this[_0x3cb67b(0x184)]=Graphics[_0x3cb67b(0x2a2)];},Game_Troop[_0x124c5c(0x21b)]['getCurrentTroopUniqueID']=function(){const _0x1c2c87=_0x124c5c;return this[_0x1c2c87(0x184)]=this[_0x1c2c87(0x184)]||Graphics['frameCount'],this['_currentTroopUniqueID'];},Scene_Skill[_0x124c5c(0x21b)]['isBottomHelpMode']=function(){const _0xd7883a=_0x124c5c;if(ConfigManager[_0xd7883a(0x13d)]&&ConfigManager[_0xd7883a(0x245)]!==undefined)return ConfigManager[_0xd7883a(0x245)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_ItemBase['prototype']['isRightInputMode'][_0xd7883a(0x217)](this);}},Scene_Skill[_0x124c5c(0x21b)]['isRightInputMode']=function(){const _0x19cc98=_0x124c5c;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x19cc98(0x32f)];else return this[_0x19cc98(0xf9)]()?_0x19cc98(0x2b4)===_0x19cc98(0xe1)?_0x1d138b['SkillsStatesCore'][_0x19cc98(0x40d)]['Skills'][_0x19cc98(0x307)]:this[_0x19cc98(0x3d5)]()[_0x19cc98(0x2ad)](/RIGHT/i):Scene_ItemBase[_0x19cc98(0x21b)][_0x19cc98(0x105)]['call'](this);},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x3d5)]=function(){const _0x5a1afd=_0x124c5c;return VisuMZ[_0x5a1afd(0x3b7)][_0x5a1afd(0x40d)]['Skills'][_0x5a1afd(0x31c)];},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x19b)]=function(){const _0x40d84c=_0x124c5c;return this['_categoryWindow']&&this[_0x40d84c(0x167)][_0x40d84c(0x19b)]();},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0xf9)]=function(){const _0x1568f6=_0x124c5c;return VisuMZ[_0x1568f6(0x3b7)][_0x1568f6(0x40d)][_0x1568f6(0x2dc)][_0x1568f6(0x158)];},VisuMZ['SkillsStatesCore'][_0x124c5c(0x310)]=Scene_Skill['prototype'][_0x124c5c(0x37c)],Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x37c)]=function(){const _0x181b22=_0x124c5c;return this[_0x181b22(0xf9)]()?this[_0x181b22(0x346)]():VisuMZ[_0x181b22(0x3b7)][_0x181b22(0x310)][_0x181b22(0x217)](this);},Scene_Skill['prototype'][_0x124c5c(0x346)]=function(){const _0x50d331=_0x124c5c,_0x1a635a=0x0,_0x59a674=this[_0x50d331(0x280)](),_0x36191e=Graphics[_0x50d331(0x3ba)],_0x49943b=this[_0x50d331(0x12e)]();return new Rectangle(_0x1a635a,_0x59a674,_0x36191e,_0x49943b);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x1e7)]=Scene_Skill['prototype'][_0x124c5c(0x262)],Scene_Skill['prototype'][_0x124c5c(0x262)]=function(){const _0x5b11bb=_0x124c5c;if(this[_0x5b11bb(0xf9)]()){if(_0x5b11bb(0x221)!==_0x5b11bb(0x28b))return this['skillTypeWindowRectSkillsStatesCore']();else{const _0x20a0dd=_0x21dd16[_0x5b11bb(0x139)],_0x349950=_0x44c35c[_0x5b11bb(0x3b7)]['skillVisibleJS'];return _0x349950[_0x5822a4['id']]?_0x349950[_0x119152['id']][_0x5b11bb(0x217)](this,_0x2817f8):!![];}}else{if(_0x5b11bb(0x207)==='yNUsf'){const _0x5e6fca=_0x4e93ce[_0x5b11bb(0x40a)]('['+_0x486d8b['$1']['match'](/\d+/g)+']');for(const _0x4e274c of _0x5e6fca){if(_0x277031[_0x5b11bb(0x22d)](_0x4e274c))return!![];}return![];}else return VisuMZ[_0x5b11bb(0x3b7)]['Scene_Skill_skillTypeWindowRect'][_0x5b11bb(0x217)](this);}},Scene_Skill['prototype']['mainCommandWidth']=function(){const _0x339463=_0x124c5c;return VisuMZ[_0x339463(0x3b7)][_0x339463(0x40d)]['Skills'][_0x339463(0xbd)]??Scene_MenuBase[_0x339463(0x21b)]['mainCommandWidth'][_0x339463(0x217)](this);},Scene_Skill['prototype'][_0x124c5c(0x326)]=function(){const _0x3d7b23=_0x124c5c,_0x53d57f=this[_0x3d7b23(0x119)](),_0x1e44c1=this['calcWindowHeight'](0x3,!![]),_0x1923ab=this[_0x3d7b23(0x105)]()?Graphics[_0x3d7b23(0x3ba)]-_0x53d57f:0x0,_0x505766=this[_0x3d7b23(0x137)]();return new Rectangle(_0x1923ab,_0x505766,_0x53d57f,_0x1e44c1);},VisuMZ[_0x124c5c(0x3b7)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x329)],Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x329)]=function(){const _0x505b55=_0x124c5c;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x505b55(0x288)!==_0x505b55(0x288)){const _0x831631=_0x1ab2c0[_0x505b55(0x40a)]('['+_0x5b40b6['$1'][_0x505b55(0x2ad)](/\d+/g)+']');for(const _0x21f850 of _0x831631){if(!_0x336dd8[_0x505b55(0x38c)](_0x21f850))return![];}return!![];}else return this[_0x505b55(0x18a)]();}else return VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect'][_0x505b55(0x217)](this);},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x18a)]=function(){const _0x28bbdc=_0x124c5c,_0x21e889=Graphics['boxWidth']-this[_0x28bbdc(0x119)](),_0x51adbf=this['_skillTypeWindow']['height'],_0xa95134=this[_0x28bbdc(0x105)]()?0x0:Graphics['boxWidth']-_0x21e889,_0x561962=this[_0x28bbdc(0x137)]();return new Rectangle(_0xa95134,_0x561962,_0x21e889,_0x51adbf);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x1d6)]=Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x3df)],Scene_Skill['prototype']['createItemWindow']=function(){const _0x395f0e=_0x124c5c;VisuMZ[_0x395f0e(0x3b7)][_0x395f0e(0x1d6)]['call'](this),this[_0x395f0e(0x22c)]()&&this[_0x395f0e(0x32a)]();},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x3fb)]=Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x1a2)],Scene_Skill['prototype']['itemWindowRect']=function(){const _0x4e43df=_0x124c5c;if(this[_0x4e43df(0xf9)]()){if(_0x4e43df(0x1d7)===_0x4e43df(0x1c5))this[_0x4e43df(0x30a)]['setItem'](this[_0x4e43df(0x23a)](0x0));else return this[_0x4e43df(0xd1)]();}else{if(_0x4e43df(0x1ca)!==_0x4e43df(0x371)){const _0x22181f=VisuMZ['SkillsStatesCore'][_0x4e43df(0x3fb)][_0x4e43df(0x217)](this);return this[_0x4e43df(0x22c)]()&&this[_0x4e43df(0x14c)]()&&(_0x22181f[_0x4e43df(0x365)]-=this['shopStatusWidth']()),_0x22181f;}else{let _0xb62a25=_0x13f29c[_0x4e43df(0x1cc)][_0x4e43df(0x217)](_0x2d4811,_0x68b7bc);return _0xb62a25=_0x50227d[_0x4e43df(0xef)](_0x12997d,_0xb62a25,_0x51af33),_0x299a40[_0x4e43df(0xf0)][_0x4e43df(0x217)](_0x5f20d1,_0x335359,_0xb62a25,_0x5e3b4d);}}},Scene_Skill['prototype'][_0x124c5c(0xd1)]=function(){const _0x4658d6=_0x124c5c,_0x19dfd4=Graphics[_0x4658d6(0x3ba)]-this[_0x4658d6(0x13e)](),_0x370c9f=this[_0x4658d6(0x389)]()-this[_0x4658d6(0x30a)][_0x4658d6(0x1dd)],_0x1384b1=this[_0x4658d6(0x105)]()?Graphics[_0x4658d6(0x3ba)]-_0x19dfd4:0x0,_0x58e554=this['_statusWindow']['y']+this[_0x4658d6(0x30a)][_0x4658d6(0x1dd)];return new Rectangle(_0x1384b1,_0x58e554,_0x19dfd4,_0x370c9f);},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x22c)]=function(){const _0x302b8e=_0x124c5c;if(!Imported[_0x302b8e(0x2e1)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?_0x302b8e(0x1f0)===_0x302b8e(0x11f)?this[_0x302b8e(0x386)]&&this['_skillTypeWindow']['active']?_0x1ccd9f[_0x302b8e(0x40c)]:'':!![]:VisuMZ[_0x302b8e(0x3b7)][_0x302b8e(0x40d)][_0x302b8e(0x2dc)]['ShowShopStatus'];},Scene_Skill['prototype'][_0x124c5c(0x14c)]=function(){const _0xda30a0=_0x124c5c;return VisuMZ[_0xda30a0(0x3b7)]['Settings'][_0xda30a0(0x2dc)][_0xda30a0(0x32c)];},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x32a)]=function(){const _0x3e5094=_0x124c5c,_0x26b900=this['shopStatusWindowRect']();this[_0x3e5094(0x27e)]=new Window_ShopStatus(_0x26b900),this[_0x3e5094(0x265)](this[_0x3e5094(0x27e)]),this[_0x3e5094(0x277)][_0x3e5094(0x115)](this['_shopStatusWindow']);const _0x22ad5f=VisuMZ[_0x3e5094(0x3b7)][_0x3e5094(0x40d)][_0x3e5094(0x2dc)][_0x3e5094(0x3b5)];this[_0x3e5094(0x27e)]['setBackgroundType'](_0x22ad5f||0x0);},Scene_Skill[_0x124c5c(0x21b)]['shopStatusWindowRect']=function(){const _0x413714=_0x124c5c;return this[_0x413714(0xf9)]()?this[_0x413714(0x1ac)]():VisuMZ[_0x413714(0x3b7)][_0x413714(0x40d)][_0x413714(0x2dc)][_0x413714(0x26e)][_0x413714(0x217)](this);},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x1ac)]=function(){const _0x23c8b9=_0x124c5c,_0x30b814=this[_0x23c8b9(0x13e)](),_0x273bba=this[_0x23c8b9(0x277)]['height'],_0x2c6443=this[_0x23c8b9(0x105)]()?0x0:Graphics[_0x23c8b9(0x3ba)]-this['shopStatusWidth'](),_0x3971f0=this[_0x23c8b9(0x277)]['y'];return new Rectangle(_0x2c6443,_0x3971f0,_0x30b814,_0x273bba);},Scene_Skill[_0x124c5c(0x21b)][_0x124c5c(0x13e)]=function(){const _0x55f475=_0x124c5c;return Imported[_0x55f475(0x2e1)]?Scene_Shop[_0x55f475(0x21b)][_0x55f475(0x3d2)]():0x0;},Scene_Skill[_0x124c5c(0x21b)]['buttonAssistText1']=function(){const _0xea3780=_0x124c5c;if(this['_skillTypeWindow']&&this[_0xea3780(0x386)][_0xea3780(0x312)]){if(_0xea3780(0x1ee)!==_0xea3780(0x1ee)){if(this['_tempActor']||this[_0xea3780(0x361)])return;const _0x484e4b=_0x4792c6[_0xea3780(0x3b7)]['stateExpireJS'];if(_0x484e4b[_0x51e0fc])_0x484e4b[_0xa0215e]['call'](this,_0x3e570c);}else return TextManager['buttonAssistSwitch'];}else{if(_0xea3780(0x182)!==_0xea3780(0xc4))return'';else{const _0x404dd1=_0x2cd3d1(_0x8afd7c['$1']),_0x2ce437=_0x38bf65['format'](_0x404dd1,_0xea3780(0x1fe),0x1,_0xea3780(0x3c6));_0x397328[_0xea3780(0x3b7)]['stateMpSlipHealJS'][_0x16735c['id']]=new _0xc6e3e8('stateId',_0x2ce437);}}},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2f6)]=Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x3ea)],Sprite_Gauge[_0x124c5c(0x21b)]['initMembers']=function(){const _0x12ee3d=_0x124c5c;VisuMZ[_0x12ee3d(0x3b7)][_0x12ee3d(0x2f6)][_0x12ee3d(0x217)](this),this[_0x12ee3d(0x14a)]=null;},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x34e)]=Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x141)],Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x141)]=function(_0x145ff1,_0x12a319){const _0x323835=_0x124c5c;this[_0x323835(0x252)](_0x145ff1,_0x12a319),_0x12a319=_0x12a319[_0x323835(0x1e1)](),VisuMZ['SkillsStatesCore'][_0x323835(0x34e)][_0x323835(0x217)](this,_0x145ff1,_0x12a319);},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x252)]=function(_0x39fd99,_0x2c30b7){const _0xfda54d=_0x124c5c,_0x6e2b68=VisuMZ[_0xfda54d(0x3b7)]['Settings'][_0xfda54d(0x259)][_0xfda54d(0x278)](_0x4ec7d8=>_0x4ec7d8[_0xfda54d(0x39d)]['toUpperCase']()===_0x2c30b7[_0xfda54d(0x3b0)]());_0x6e2b68[_0xfda54d(0x37d)]>=0x1?this[_0xfda54d(0x14a)]=_0x6e2b68[0x0]:this[_0xfda54d(0x14a)]=null;},VisuMZ[_0x124c5c(0x3b7)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x124c5c(0x21b)]['currentValue'],Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0xf2)]=function(){const _0x245816=_0x124c5c;if(this['_battler']&&this['_costSettings'])return this[_0x245816(0x216)]();else{if(_0x245816(0x319)!==_0x245816(0x319))_0x3f75d9['prototype'][_0x245816(0xfc)][_0x245816(0x217)](this,_0x1de78f);else return VisuMZ[_0x245816(0x3b7)][_0x245816(0x37b)]['call'](this);}},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x216)]=function(){const _0x162955=_0x124c5c;return this[_0x162955(0x14a)][_0x162955(0x3c4)]['call'](this[_0x162955(0x233)]);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x1a1)]=Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0xde)],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x59baed=_0x124c5c;if(this[_0x59baed(0x233)]&&this[_0x59baed(0x14a)]){if(_0x59baed(0x2ea)!==_0x59baed(0x2ea)){const _0x1851d5=_0x1d4494(_0x201d35['$1']);if(_0x1851d5===_0xd6409f[_0x59baed(0x1c6)]()){if(_0x2e0b82[_0x59baed(0x2ad)](/<member-(\d+)>/i))return _0x3741a2['members']()[_0x54b28e(_0xfd39c4['$1'])];}}else return this[_0x59baed(0x104)]();}else return VisuMZ[_0x59baed(0x3b7)][_0x59baed(0x1a1)][_0x59baed(0x217)](this);},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x104)]=function(){const _0x4ec9e3=_0x124c5c;return this[_0x4ec9e3(0x14a)]['GaugeMaxJS']['call'](this[_0x4ec9e3(0x233)]);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x11b)]=Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x3bd)],Sprite_Gauge[_0x124c5c(0x21b)]['gaugeRate']=function(){const _0x5af124=_0x124c5c,_0x5c9d43=VisuMZ[_0x5af124(0x3b7)][_0x5af124(0x11b)][_0x5af124(0x217)](this);return _0x5c9d43[_0x5af124(0x2f4)](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x19d)]=Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x1b1)],Sprite_Gauge['prototype']['redraw']=function(){const _0x497bac=_0x124c5c;if(this['_battler']&&this[_0x497bac(0x14a)]){if(_0x497bac(0x131)!=='WdQMf'){const _0x426b84=_0xa65768[_0x497bac(0x40a)]('['+_0xbab230['$1']['match'](/\d+/g)+']');for(const _0xa776af of _0x426b84){if(!_0x35763c[_0x497bac(0x2ac)](_0xa776af))return!![];}return![];}else this[_0x497bac(0x39a)][_0x497bac(0x1f4)](),this[_0x497bac(0x31a)]();}else VisuMZ['SkillsStatesCore'][_0x497bac(0x19d)][_0x497bac(0x217)](this);},Sprite_Gauge['prototype'][_0x124c5c(0x20c)]=function(){const _0x42f878=_0x124c5c;let _0x710ea3=this[_0x42f878(0xf2)]();return Imported[_0x42f878(0x143)]&&this[_0x42f878(0x34f)]()&&('ctynp'===_0x42f878(0x383)?(!_0x55634a[_0x42f878(0x261)](_0xc593bc)&&this['drawActorStateTurns'](_0x32207d,_0x4ad775,_0x390f13,_0x11e8b7),this['drawActorStateData'](_0x43078b,_0x12b1a9,_0x49db1c,_0x2d7815),_0x5e0467[_0x42f878(0x239)](_0x4efdb5)):_0x710ea3=VisuMZ[_0x42f878(0x149)](_0x710ea3)),_0x710ea3;},Sprite_Gauge['prototype'][_0x124c5c(0x31a)]=function(){const _0x206393=_0x124c5c;this['bitmap'][_0x206393(0x1f4)](),this[_0x206393(0x14a)][_0x206393(0x2d2)][_0x206393(0x217)](this);},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x1e8)]=function(_0x364b13,_0x2a06fb,_0x139af3,_0x41ee32,_0x21e18b,_0x3b9bd4){const _0x157f24=_0x124c5c,_0x2af7a9=this['gaugeRate'](),_0x6cba87=Math[_0x157f24(0x1ad)]((_0x21e18b-0x2)*_0x2af7a9),_0x482b22=_0x3b9bd4-0x2,_0x10d697=this[_0x157f24(0x1c1)]();this['bitmap']['fillRect'](_0x139af3,_0x41ee32,_0x21e18b,_0x3b9bd4,_0x10d697),this[_0x157f24(0x39a)]['gradientFillRect'](_0x139af3+0x1,_0x41ee32+0x1,_0x6cba87,_0x482b22,_0x364b13,_0x2a06fb);},Sprite_Gauge[_0x124c5c(0x21b)]['labelFontFace']=function(){const _0x3bf4c1=_0x124c5c,_0x1bcb55=VisuMZ[_0x3bf4c1(0x3b7)][_0x3bf4c1(0x40d)][_0x3bf4c1(0x1f2)];return _0x1bcb55[_0x3bf4c1(0x179)]===_0x3bf4c1(0x3ad)?$gameSystem['numberFontFace']():$gameSystem[_0x3bf4c1(0x3ed)]();},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x1fc)]=function(){const _0x1b37d7=_0x124c5c,_0x273b4e=VisuMZ[_0x1b37d7(0x3b7)][_0x1b37d7(0x40d)]['Gauge'];return _0x273b4e[_0x1b37d7(0x179)]===_0x1b37d7(0x3ad)?$gameSystem[_0x1b37d7(0x2cd)]()-0x6:$gameSystem[_0x1b37d7(0x2cd)]()-0x2;},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x25d)]=function(){const _0x40f500=_0x124c5c,_0x5a8edb=VisuMZ[_0x40f500(0x3b7)][_0x40f500(0x40d)][_0x40f500(0x1f2)];return _0x5a8edb[_0x40f500(0x16c)]==='number'?_0x40f500(0x37f)!=='TWAxd'?this[_0x40f500(0x3d5)]()[_0x40f500(0x2ad)](/LOWER/i):$gameSystem['numberFontFace']():$gameSystem[_0x40f500(0x3ed)]();},Sprite_Gauge['prototype']['valueFontSize']=function(){const _0x289fc5=_0x124c5c,_0xe27b1e=VisuMZ[_0x289fc5(0x3b7)][_0x289fc5(0x40d)][_0x289fc5(0x1f2)];return _0xe27b1e[_0x289fc5(0x16c)]==='number'?_0x289fc5(0xcb)===_0x289fc5(0x394)?(_0x2fa54c=_0x368392(_0x1b3ff1),this[_0x289fc5(0x403)]=this[_0x289fc5(0x403)]||{},_0x57bec8[_0x289fc5(0x2ad)](/#(.*)/i)?this[_0x289fc5(0x403)][_0x3a9613]=_0x289fc5(0x38f)[_0x289fc5(0x2c4)](_0x275e08(_0x4e0e6d['$1'])):this['_colorCache'][_0x402ebd]=this['textColor'](_0x4ba34d(_0x32c0e8)),this[_0x289fc5(0x403)][_0x218fbd]):$gameSystem[_0x289fc5(0x2cd)]()-0x6:$gameSystem[_0x289fc5(0x2cd)]()-0x2;},Sprite_Gauge[_0x124c5c(0x21b)]['labelColor']=function(){const _0x1a5c56=_0x124c5c,_0x546e3c=VisuMZ[_0x1a5c56(0x3b7)]['Settings'][_0x1a5c56(0x1f2)];if(_0x546e3c[_0x1a5c56(0x12f)]){if(_0x1a5c56(0x292)!==_0x1a5c56(0xdd)){if(_0x546e3c['MatchLabelGaugeColor']===0x1)return this['gaugeColor1']();else{if(_0x546e3c[_0x1a5c56(0x2ec)]===0x2)return _0x1a5c56(0xb8)!=='wOqpo'?_0x2e41bb[_0x1a5c56(0x3e9)]&&_0xb6a90['description'][_0x1a5c56(0x261)]('['+_0x5836fc+']'):this['gaugeColor2']();}}else{if(!_0x2418cf[_0x1a5c56(0x38c)](_0x4540c5))return!![];}}const _0xbfc0f2=_0x546e3c[_0x1a5c56(0x24a)];return ColorManager[_0x1a5c56(0x402)](_0xbfc0f2);},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x208)]=function(){const _0xd4febb=_0x124c5c,_0x398aa9=VisuMZ[_0xd4febb(0x3b7)][_0xd4febb(0x40d)][_0xd4febb(0x1f2)];if(this['labelOutlineWidth']()<=0x0){if(_0xd4febb(0x218)!==_0xd4febb(0x3d7))return _0xd4febb(0x183);else{_0x9b6fc9['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x44a973=_0x36deaa[_0xd4febb(0xb0)](_0x38bf43(_0x1e3e5f['$1'])['toUpperCase']()),_0x3b9734=_0x19e0ec(_0x5a4950['$2']);_0x44a973>=0x0&&(_0x3c4ffc[_0xd4febb(0x196)](_0x44a973,_0x3b9734),this[_0xd4febb(0x154)](_0x58faf5));}}else{if(_0x398aa9[_0xd4febb(0x294)]){if(_0xd4febb(0x212)!==_0xd4febb(0x212)){const _0x1a91c=this[_0xd4febb(0x23a)](_0x19171a),_0x4797f1=_0x1a91c?_0x1a91c[_0xd4febb(0x22a)]:'';if(_0x1a91c)this[_0xd4febb(0x1d4)](_0x1a91c);_0x6d7230[_0xd4febb(0x3b7)]['Window_SkillList_drawItem'][_0xd4febb(0x217)](this,_0x289cd1);if(_0x1a91c)_0x1a91c['name']=_0x4797f1;}else return'rgba(0,\x200,\x200,\x201)';}else return ColorManager[_0xd4febb(0x33f)]();}},Sprite_Gauge['prototype'][_0x124c5c(0x17b)]=function(){const _0x3ededd=_0x124c5c;return VisuMZ[_0x3ededd(0x3b7)][_0x3ededd(0x40d)]['Gauge']['LabelOutlineWidth']||0x0;},Sprite_Gauge[_0x124c5c(0x21b)]['valueOutlineColor']=function(){const _0x5854c8=_0x124c5c,_0x515960=VisuMZ[_0x5854c8(0x3b7)][_0x5854c8(0x40d)][_0x5854c8(0x1f2)];if(this['valueOutlineWidth']()<=0x0){if(_0x5854c8(0x124)!==_0x5854c8(0x1fb))return _0x5854c8(0x183);else _0x2c870c[_0x5854c8(0x3b7)][_0x5854c8(0x321)][_0x5854c8(0x217)](this,_0x22f832),this[_0x5854c8(0x1b7)]={},this[_0x5854c8(0x14d)]();}else{if(_0x515960[_0x5854c8(0x187)])return _0x5854c8(0x34a);else{if(_0x5854c8(0x1c3)!=='WQPIi')_0x14d59b[_0x5854c8(0x20e)](_0x423845,_0x4cad9d),this[_0x5854c8(0x154)](_0x19460e);else return ColorManager[_0x5854c8(0x33f)]();}}},Sprite_Gauge[_0x124c5c(0x21b)][_0x124c5c(0x299)]=function(){const _0x144884=_0x124c5c;return VisuMZ[_0x144884(0x3b7)][_0x144884(0x40d)][_0x144884(0x1f2)][_0x144884(0xce)]||0x0;},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x144)]=Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x2d3)],Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x2d3)]=function(){const _0x2a6e87=_0x124c5c;VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap'][_0x2a6e87(0x217)](this),this[_0x2a6e87(0x3b3)]();},Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x3b3)]=function(){const _0x576913=_0x124c5c,_0x1edbe6=Window_Base[_0x576913(0x21b)][_0x576913(0x19a)]();this[_0x576913(0x2bd)]=new Sprite(),this[_0x576913(0x2bd)][_0x576913(0x39a)]=new Bitmap(ImageManager[_0x576913(0xbe)],_0x1edbe6),this[_0x576913(0x2bd)][_0x576913(0x3eb)]['x']=this[_0x576913(0x3eb)]['x'],this[_0x576913(0x2bd)][_0x576913(0x3eb)]['y']=this[_0x576913(0x3eb)]['y'],this[_0x576913(0x2dd)](this['_turnDisplaySprite']),this['contents']=this[_0x576913(0x2bd)][_0x576913(0x39a)];},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x150)]=Sprite_StateIcon['prototype'][_0x124c5c(0x287)],Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x287)]=function(){const _0x19ab71=_0x124c5c;VisuMZ[_0x19ab71(0x3b7)][_0x19ab71(0x150)][_0x19ab71(0x217)](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x124c5c(0x21b)]['drawText']=function(_0x28402a,_0xa3ef89,_0x582320,_0x11864f,_0x23076){const _0x2ecf7d=_0x124c5c;this[_0x2ecf7d(0x214)]['drawText'](_0x28402a,_0xa3ef89,_0x582320,_0x11864f,this['contents'][_0x2ecf7d(0x1dd)],_0x23076);},Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x243)]=function(){const _0xdc528d=_0x124c5c;this[_0xdc528d(0x274)](),this[_0xdc528d(0x214)][_0xdc528d(0x1f4)]();const _0xc2f210=this[_0xdc528d(0x233)];if(!_0xc2f210)return;const _0x3b6bfa=_0xc2f210[_0xdc528d(0x1a8)]()[_0xdc528d(0x278)](_0x3b8842=>_0x3b8842['iconIndex']>0x0),_0x2687aa=[...Array(0x8)[_0xdc528d(0xee)]()]['filter'](_0x274562=>_0xc2f210[_0xdc528d(0xca)](_0x274562)!==0x0),_0x39f2ff=this[_0xdc528d(0x1b2)],_0x2f0891=_0x3b6bfa[_0x39f2ff];if(_0x2f0891){if(_0xdc528d(0x2fc)!==_0xdc528d(0x3e3))Window_Base[_0xdc528d(0x21b)][_0xdc528d(0x363)][_0xdc528d(0x217)](this,_0xc2f210,_0x2f0891,0x0,0x0),Window_Base['prototype'][_0xdc528d(0x247)][_0xdc528d(0x217)](this,_0xc2f210,_0x2f0891,0x0,0x0);else for(const _0x71714c of _0x2c740a){_0x71714c['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x327615=_0x4a206b[_0xdc528d(0xb0)](_0x175d93(_0x3e7470['$1'])['toUpperCase']()),_0x4381ee=_0x3c7317(_0xef5ec5['$2']);_0x327615>=0x0&&(_0x1a320f[_0xdc528d(0x16d)](_0x327615,_0x4381ee),this['makeSuccess'](_0x5bbf7e));}}else{const _0x161364=_0x2687aa[_0x39f2ff-_0x3b6bfa['length']];if(_0x161364===undefined)return;Window_Base[_0xdc528d(0x21b)][_0xdc528d(0x19c)][_0xdc528d(0x217)](this,_0xc2f210,_0x161364,0x0,0x0),Window_Base[_0xdc528d(0x21b)][_0xdc528d(0x254)][_0xdc528d(0x217)](this,_0xc2f210,_0x161364,0x0,0x0);}},Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x274)]=function(){const _0x453914=_0x124c5c;this['contents'][_0x453914(0x138)]=$gameSystem['mainFontFace'](),this['contents'][_0x453914(0x369)]=$gameSystem[_0x453914(0x2cd)](),this['resetTextColor']();},Sprite_StateIcon['prototype'][_0x124c5c(0x225)]=function(){const _0x4020e8=_0x124c5c;this['changeTextColor'](ColorManager[_0x4020e8(0x200)]()),this['changeOutlineColor'](ColorManager[_0x4020e8(0x33f)]());},Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x291)]=function(_0x3a2677){const _0x117db5=_0x124c5c;this[_0x117db5(0x214)][_0x117db5(0x3f0)]=_0x3a2677;},Sprite_StateIcon[_0x124c5c(0x21b)][_0x124c5c(0x382)]=function(_0x93a3d9){this['contents']['outlineColor']=_0x93a3d9;},Sprite_StateIcon['prototype']['hide']=function(){const _0x256010=_0x124c5c;this[_0x256010(0x1f9)]=!![],this[_0x256010(0x16a)]();},Window_Base[_0x124c5c(0x21b)][_0x124c5c(0x2a6)]=function(_0x3c71bf,_0x44ba89,_0x3eb3ec,_0x52cacf,_0x2e903a){const _0x50069b=_0x124c5c,_0x47a699=this[_0x50069b(0x3a5)](_0x3c71bf,_0x44ba89),_0x468fc0=this[_0x50069b(0x3dc)](_0x47a699,_0x3eb3ec,_0x52cacf,_0x2e903a),_0x4ff2c7=_0x3eb3ec+_0x2e903a-_0x468fc0[_0x50069b(0x365)];this[_0x50069b(0x387)](_0x47a699,_0x4ff2c7,_0x52cacf,_0x2e903a),this[_0x50069b(0x274)]();},Window_Base[_0x124c5c(0x21b)]['createAllSkillCostText']=function(_0xa8d598,_0x1f1b60){const _0x1ffd5e=_0x124c5c;let _0x9a583a='';for(settings of VisuMZ[_0x1ffd5e(0x3b7)][_0x1ffd5e(0x40d)][_0x1ffd5e(0x259)]){if(!this[_0x1ffd5e(0x145)](_0xa8d598,_0x1f1b60,settings))continue;if(_0x9a583a[_0x1ffd5e(0x37d)]>0x0)_0x9a583a+=this[_0x1ffd5e(0x3a7)]();_0x9a583a+=this[_0x1ffd5e(0x27a)](_0xa8d598,_0x1f1b60,settings);}_0x9a583a=this[_0x1ffd5e(0x38d)](_0xa8d598,_0x1f1b60,_0x9a583a);if(_0x1f1b60[_0x1ffd5e(0x139)]['match'](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x9a583a[_0x1ffd5e(0x37d)]>0x0)_0x9a583a+=this[_0x1ffd5e(0x3a7)]();_0x9a583a+=String(RegExp['$1']);}return _0x9a583a;},Window_Base['prototype'][_0x124c5c(0x38d)]=function(_0xa3434d,_0x375c1a,_0x199f4b){return _0x199f4b;},Window_Base[_0x124c5c(0x21b)]['isSkillCostShown']=function(_0x220267,_0x487d20,_0x372325){const _0x4b9651=_0x124c5c;let _0x2f827f=_0x372325[_0x4b9651(0x1cc)][_0x4b9651(0x217)](_0x220267,_0x487d20);return _0x2f827f=_0x220267[_0x4b9651(0xef)](_0x487d20,_0x2f827f,_0x372325),_0x372325[_0x4b9651(0x123)][_0x4b9651(0x217)](_0x220267,_0x487d20,_0x2f827f,_0x372325);},Window_Base['prototype'][_0x124c5c(0x27a)]=function(_0x1740f3,_0x586875,_0x18e6ca){const _0x5a850c=_0x124c5c;let _0x1f0444=_0x18e6ca[_0x5a850c(0x1cc)][_0x5a850c(0x217)](_0x1740f3,_0x586875);return _0x1f0444=_0x1740f3['adjustSkillCost'](_0x586875,_0x1f0444,_0x18e6ca),_0x18e6ca[_0x5a850c(0xf0)][_0x5a850c(0x217)](_0x1740f3,_0x586875,_0x1f0444,_0x18e6ca);},Window_Base[_0x124c5c(0x21b)][_0x124c5c(0x3a7)]=function(){return'\x20';},Window_Base[_0x124c5c(0x21b)]['drawActorIcons']=function(_0x4681d4,_0x3dcd54,_0x56e8ac,_0x13cb66){const _0x238b03=_0x124c5c;if(!_0x4681d4)return;VisuMZ[_0x238b03(0x3b7)][_0x238b03(0x3ab)]['call'](this,_0x4681d4,_0x3dcd54,_0x56e8ac,_0x13cb66),this['drawActorIconsAllTurnCounters'](_0x4681d4,_0x3dcd54,_0x56e8ac,_0x13cb66);},Window_Base[_0x124c5c(0x21b)][_0x124c5c(0x3ec)]=function(_0x3c3fac,_0x8580e5,_0x1a2054,_0x38d5c6){const _0x5de8a5=_0x124c5c;_0x38d5c6=_0x38d5c6||0x90;const _0x21b9c3=ImageManager[_0x5de8a5(0xbe)],_0x4d35c0=_0x3c3fac[_0x5de8a5(0x283)]()[_0x5de8a5(0x257)](0x0,Math[_0x5de8a5(0x1ad)](_0x38d5c6/_0x21b9c3)),_0x12d7b7=_0x3c3fac[_0x5de8a5(0x1a8)]()[_0x5de8a5(0x278)](_0x3b237d=>_0x3b237d[_0x5de8a5(0x22e)]>0x0),_0x541b50=[...Array(0x8)['keys']()][_0x5de8a5(0x278)](_0xc5ab3a=>_0x3c3fac['buff'](_0xc5ab3a)!==0x0),_0x3ef0d=[];let _0x1eed1e=_0x8580e5;for(let _0x4ac3c4=0x0;_0x4ac3c4<_0x4d35c0['length'];_0x4ac3c4++){this[_0x5de8a5(0x274)]();const _0x268855=_0x12d7b7[_0x4ac3c4];if(_0x268855){if(!_0x3ef0d[_0x5de8a5(0x261)](_0x268855)){if(_0x5de8a5(0x253)!==_0x5de8a5(0x253))return _0x503723['SkillsStatesCore'][_0x5de8a5(0x40d)][_0x5de8a5(0x2dc)][_0x5de8a5(0x31c)];else this[_0x5de8a5(0x363)](_0x3c3fac,_0x268855,_0x1eed1e,_0x1a2054);}this['drawActorStateData'](_0x3c3fac,_0x268855,_0x1eed1e,_0x1a2054),_0x3ef0d[_0x5de8a5(0x239)](_0x268855);}else{const _0x3706eb=_0x541b50[_0x4ac3c4-_0x12d7b7['length']];this[_0x5de8a5(0x19c)](_0x3c3fac,_0x3706eb,_0x1eed1e,_0x1a2054),this[_0x5de8a5(0x254)](_0x3c3fac,_0x3706eb,_0x1eed1e,_0x1a2054);}_0x1eed1e+=_0x21b9c3;}},Window_Base[_0x124c5c(0x21b)][_0x124c5c(0x363)]=function(_0x50968c,_0x3ed080,_0x4d5086,_0x2c8b8a){const _0x158033=_0x124c5c;if(!VisuMZ[_0x158033(0x3b7)]['Settings'][_0x158033(0x107)]['ShowTurns'])return;if(!_0x50968c[_0x158033(0x1ce)](_0x3ed080['id']))return;if(_0x3ed080[_0x158033(0x341)]===0x0)return;if(_0x3ed080['note'][_0x158033(0x2ad)](/<HIDE STATE TURNS>/i))return;const _0x19a0e6=_0x50968c[_0x158033(0x367)](_0x3ed080['id']),_0x312da1=ImageManager[_0x158033(0xbe)],_0x2eb885=ColorManager[_0x158033(0x38a)](_0x3ed080);this[_0x158033(0x291)](_0x2eb885),this[_0x158033(0x382)]('rgba(0,\x200,\x200,\x201)'),this[_0x158033(0x214)]['fontBold']=!![],this[_0x158033(0x214)][_0x158033(0x369)]=VisuMZ[_0x158033(0x3b7)]['Settings'][_0x158033(0x107)][_0x158033(0x224)],_0x4d5086+=VisuMZ['SkillsStatesCore'][_0x158033(0x40d)][_0x158033(0x107)][_0x158033(0x3ca)],_0x2c8b8a+=VisuMZ[_0x158033(0x3b7)][_0x158033(0x40d)][_0x158033(0x107)][_0x158033(0x246)],this['drawText'](_0x19a0e6,_0x4d5086,_0x2c8b8a,_0x312da1,_0x158033(0x40e)),this['contents'][_0x158033(0x241)]=![],this[_0x158033(0x274)]();},Window_Base[_0x124c5c(0x21b)][_0x124c5c(0x247)]=function(_0x49d608,_0x273b9b,_0x16fb53,_0x57d0a4){const _0x295275=_0x124c5c;if(!VisuMZ['SkillsStatesCore'][_0x295275(0x40d)][_0x295275(0x107)][_0x295275(0x397)])return;const _0x1c6a43=ImageManager['iconWidth'],_0xbd02f2=ImageManager['iconHeight']/0x2,_0x37dbfe=ColorManager[_0x295275(0x200)]();this[_0x295275(0x291)](_0x37dbfe),this[_0x295275(0x382)](_0x295275(0x34a)),this[_0x295275(0x214)][_0x295275(0x241)]=!![],this['contents']['fontSize']=VisuMZ[_0x295275(0x3b7)][_0x295275(0x40d)][_0x295275(0x107)][_0x295275(0x36b)],_0x16fb53+=VisuMZ[_0x295275(0x3b7)][_0x295275(0x40d)][_0x295275(0x107)][_0x295275(0x324)],_0x57d0a4+=VisuMZ[_0x295275(0x3b7)][_0x295275(0x40d)][_0x295275(0x107)][_0x295275(0x1b3)];const _0x40f42e=String(_0x49d608['getStateDisplay'](_0x273b9b['id']));this[_0x295275(0x114)](_0x40f42e,_0x16fb53,_0x57d0a4,_0x1c6a43,_0x295275(0x2c7)),this[_0x295275(0x214)][_0x295275(0x241)]=![],this[_0x295275(0x274)]();},Window_Base[_0x124c5c(0x21b)][_0x124c5c(0x19c)]=function(_0x595abe,_0x2154a9,_0x4fc40b,_0x2e54d7){const _0x200fa5=_0x124c5c;if(!VisuMZ[_0x200fa5(0x3b7)][_0x200fa5(0x40d)]['Buffs'][_0x200fa5(0x2f9)])return;const _0x1813b0=_0x595abe[_0x200fa5(0xca)](_0x2154a9);if(_0x1813b0===0x0)return;const _0x5633f3=_0x595abe[_0x200fa5(0x3e6)](_0x2154a9),_0x3581b2=ImageManager[_0x200fa5(0xbe)],_0x44de7a=_0x1813b0>0x0?ColorManager[_0x200fa5(0x112)]():ColorManager['debuffColor']();this[_0x200fa5(0x291)](_0x44de7a),this['changeOutlineColor'](_0x200fa5(0x34a)),this[_0x200fa5(0x214)][_0x200fa5(0x241)]=!![],this['contents'][_0x200fa5(0x369)]=VisuMZ['SkillsStatesCore'][_0x200fa5(0x40d)][_0x200fa5(0xf6)][_0x200fa5(0x224)],_0x4fc40b+=VisuMZ[_0x200fa5(0x3b7)][_0x200fa5(0x40d)][_0x200fa5(0xf6)][_0x200fa5(0x3ca)],_0x2e54d7+=VisuMZ[_0x200fa5(0x3b7)][_0x200fa5(0x40d)]['Buffs'][_0x200fa5(0x246)],this[_0x200fa5(0x114)](_0x5633f3,_0x4fc40b,_0x2e54d7,_0x3581b2,_0x200fa5(0x40e)),this[_0x200fa5(0x214)]['fontBold']=![],this['resetFontSettings']();},Window_Base['prototype'][_0x124c5c(0x254)]=function(_0x1b1097,_0x3164df,_0xe25f5e,_0x3188a0){const _0x547cb9=_0x124c5c;if(!VisuMZ['SkillsStatesCore'][_0x547cb9(0x40d)][_0x547cb9(0xf6)][_0x547cb9(0x397)])return;const _0x4d1030=_0x1b1097['paramBuffRate'](_0x3164df),_0x59140a=_0x1b1097[_0x547cb9(0xca)](_0x3164df),_0x4c5b39=ImageManager['iconWidth'],_0x3df811=ImageManager[_0x547cb9(0x22b)]/0x2,_0x124438=_0x59140a>0x0?ColorManager['buffColor']():ColorManager[_0x547cb9(0x384)]();this[_0x547cb9(0x291)](_0x124438),this['changeOutlineColor'](_0x547cb9(0x34a)),this[_0x547cb9(0x214)][_0x547cb9(0x241)]=!![],this[_0x547cb9(0x214)]['fontSize']=VisuMZ['SkillsStatesCore'][_0x547cb9(0x40d)][_0x547cb9(0xf6)][_0x547cb9(0x36b)],_0xe25f5e+=VisuMZ[_0x547cb9(0x3b7)][_0x547cb9(0x40d)][_0x547cb9(0xf6)]['DataOffsetX'],_0x3188a0+=VisuMZ['SkillsStatesCore'][_0x547cb9(0x40d)]['Buffs'][_0x547cb9(0x1b3)];const _0x50aba0=_0x547cb9(0x293)['format'](Math[_0x547cb9(0x275)](_0x4d1030*0x64));this['drawText'](_0x50aba0,_0xe25f5e,_0x3188a0,_0x4c5b39,_0x547cb9(0x2c7)),this[_0x547cb9(0x214)]['fontBold']=![],this[_0x547cb9(0x274)]();},VisuMZ['SkillsStatesCore'][_0x124c5c(0x353)]=Window_StatusBase[_0x124c5c(0x21b)][_0x124c5c(0x244)],Window_StatusBase[_0x124c5c(0x21b)][_0x124c5c(0x244)]=function(_0x8da724,_0x311ae8,_0x3ad30d,_0x1cf434){const _0x32ffc7=_0x124c5c;if(_0x8da724[_0x32ffc7(0x103)]())_0x311ae8=this[_0x32ffc7(0x2b2)](_0x8da724,_0x311ae8);this['placeExactGauge'](_0x8da724,_0x311ae8,_0x3ad30d,_0x1cf434);},Window_StatusBase[_0x124c5c(0x21b)][_0x124c5c(0x1d5)]=function(_0x223184,_0x510c62,_0x2c07db,_0x3c9c02){const _0x2cd0d7=_0x124c5c;if([_0x2cd0d7(0x2a4),'untitled'][_0x2cd0d7(0x261)](_0x510c62[_0x2cd0d7(0x1e1)]()))return;VisuMZ['SkillsStatesCore'][_0x2cd0d7(0x353)][_0x2cd0d7(0x217)](this,_0x223184,_0x510c62,_0x2c07db,_0x3c9c02);},Window_StatusBase[_0x124c5c(0x21b)][_0x124c5c(0x2b2)]=function(_0x7d2469,_0x61ba6e){const _0x517d74=_0x124c5c,_0x1fd51e=_0x7d2469[_0x517d74(0x323)]()['note'];if(_0x61ba6e==='hp'&&_0x1fd51e['match'](/<REPLACE HP GAUGE:[ ](.*)>/i)){if(_0x517d74(0xbf)!==_0x517d74(0x228))return String(RegExp['$1']);else _0x344aab['SkillsStatesCore'][_0x517d74(0x1bc)][_0x517d74(0x217)](this),this[_0x517d74(0x3dd)]();}else{if(_0x61ba6e==='mp'&&_0x1fd51e[_0x517d74(0x2ad)](/<REPLACE MP GAUGE:[ ](.*)>/i))return'VYwGC'===_0x517d74(0x223)?String(RegExp['$1']):'<actor-%1>'[_0x517d74(0x2c4)](_0x5f28ca[_0x517d74(0x20d)]());else{if(_0x61ba6e==='tp'&&_0x1fd51e['match'](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x517d74(0x1c0)!==_0x517d74(0x1c0)){const _0x21c17f=_0x1909d7[_0x517d74(0x40a)]('['+_0x26e262['$1']['match'](/\d+/g)+']');for(const _0x24459c of _0x21c17f){if(!_0x33f4d5[_0x517d74(0x22d)](_0x24459c))return!![];}return![];}else return _0x61ba6e;}}}},VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons']=Window_StatusBase['prototype'][_0x124c5c(0x2b1)],Window_StatusBase['prototype'][_0x124c5c(0x2b1)]=function(_0x3a71d8,_0x4d6a29,_0x223c84,_0x1197db){const _0xfde93c=_0x124c5c;if(!_0x3a71d8)return;Window_Base['prototype'][_0xfde93c(0x2b1)]['call'](this,_0x3a71d8,_0x4d6a29,_0x223c84,_0x1197db);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x222)]=Window_SkillType['prototype']['initialize'],Window_SkillType[_0x124c5c(0x21b)][_0x124c5c(0x3d9)]=function(_0x29066e){const _0x3b8c0e=_0x124c5c;VisuMZ[_0x3b8c0e(0x3b7)][_0x3b8c0e(0x222)]['call'](this,_0x29066e),this['createCommandNameWindow'](_0x29066e);},Window_SkillType[_0x124c5c(0x21b)][_0x124c5c(0x1bf)]=function(_0x18acc6){const _0x1e1eb3=_0x124c5c,_0x4abc58=new Rectangle(0x0,0x0,_0x18acc6[_0x1e1eb3(0x365)],_0x18acc6[_0x1e1eb3(0x1dd)]);this[_0x1e1eb3(0x3b9)]=new Window_Base(_0x4abc58),this[_0x1e1eb3(0x3b9)]['opacity']=0x0,this[_0x1e1eb3(0x2dd)](this[_0x1e1eb3(0x3b9)]),this[_0x1e1eb3(0xdf)]();},Window_SkillType[_0x124c5c(0x21b)]['callUpdateHelp']=function(){const _0x5d57f5=_0x124c5c;Window_Command[_0x5d57f5(0x21b)]['callUpdateHelp'][_0x5d57f5(0x217)](this);if(this[_0x5d57f5(0x3b9)])this['updateCommandNameWindow']();},Window_SkillType[_0x124c5c(0x21b)][_0x124c5c(0xdf)]=function(){const _0x3cdc61=_0x124c5c,_0xbab5f8=this[_0x3cdc61(0x3b9)];_0xbab5f8[_0x3cdc61(0x214)][_0x3cdc61(0x1f4)]();const _0x17a6e7=this[_0x3cdc61(0x32d)](this[_0x3cdc61(0x376)]());if(_0x17a6e7==='icon'&&this[_0x3cdc61(0x23c)]()>0x0){if(_0x3cdc61(0x177)===_0x3cdc61(0x177)){const _0x386577=this[_0x3cdc61(0x1d1)](this['index']());let _0x52e975=this[_0x3cdc61(0xc2)](this['index']());_0x52e975=_0x52e975[_0x3cdc61(0x3e0)](/\\I\[(\d+)\]/gi,''),_0xbab5f8[_0x3cdc61(0x274)](),this[_0x3cdc61(0x28d)](_0x52e975,_0x386577),this[_0x3cdc61(0x22f)](_0x52e975,_0x386577),this[_0x3cdc61(0x11a)](_0x52e975,_0x386577);}else{const _0x3764ce=_0x24fbd0[_0x3cdc61(0x2a0)][_0x3cdc61(0x40d)][_0x3cdc61(0x15c)][_0x3cdc61(0x28a)],_0x436984=_0x1c886a[_0x3cdc61(0x1ad)](_0x39eabf/0x2)-0x18;let _0x33bcea=_0x2ce615,_0x3aa64b=_0x54508c[_0x3cdc61(0x1ad)]((this[_0x3cdc61(0x180)]-_0x3f0d3d[_0x3cdc61(0xb2)](_0x3764ce[_0x3cdc61(0x37d)]/0x2)*_0xddecad)/0x2),_0x498c39=0x0;for(const _0x1ffad0 of _0x3764ce){this[_0x3cdc61(0x11d)](_0x33bcea,_0x3aa64b,_0x436984,_0x1ffad0),_0x498c39++,_0x498c39%0x2===0x0?(_0x33bcea=_0x4c51a9,_0x3aa64b+=_0x4c6bd6):_0x33bcea+=_0x436984+0x18;}}}},Window_SkillType[_0x124c5c(0x21b)][_0x124c5c(0x28d)]=function(_0x22cbd5,_0x3372c1){},Window_SkillType['prototype']['commandNameWindowDrawText']=function(_0x2ff8cf,_0x510104){const _0x3c4ce4=_0x124c5c,_0x538a01=this[_0x3c4ce4(0x3b9)];_0x538a01[_0x3c4ce4(0x114)](_0x2ff8cf,0x0,_0x510104['y'],_0x538a01[_0x3c4ce4(0x388)],_0x3c4ce4(0x2c7));},Window_SkillType[_0x124c5c(0x21b)]['commandNameWindowCenter']=function(_0x37ce31,_0x190335){const _0x4b1a86=_0x124c5c,_0x5e504d=this['_commandNameWindow'],_0x310965=$gameSystem[_0x4b1a86(0x1d2)](),_0x3d77bc=_0x190335['x']+Math[_0x4b1a86(0x1ad)](_0x190335['width']/0x2)+_0x310965;_0x5e504d['x']=_0x5e504d[_0x4b1a86(0x365)]/-0x2+_0x3d77bc,_0x5e504d['y']=Math[_0x4b1a86(0x1ad)](_0x190335[_0x4b1a86(0x1dd)]/0x2);},Window_SkillType['prototype'][_0x124c5c(0x19b)]=function(){const _0x2d911a=_0x124c5c;return Imported['VisuMZ_0_CoreEngine']&&Window_Command['prototype'][_0x2d911a(0x19b)][_0x2d911a(0x217)](this);},Window_SkillType[_0x124c5c(0x21b)]['makeCommandList']=function(){const _0x218f5=_0x124c5c;if(!this[_0x218f5(0x1f8)])return;const _0xda01c0=this[_0x218f5(0x1f8)][_0x218f5(0x27b)]();for(const _0x54fdb5 of _0xda01c0){if('hJLya'!==_0x218f5(0x1ef)){const _0x5b69ed=this[_0x218f5(0x2f3)](_0x54fdb5);this[_0x218f5(0x18e)](_0x5b69ed,_0x218f5(0x209),!![],_0x54fdb5);}else{if(!this[_0x218f5(0x35d)](_0x5857dc))return![];if(!_0x117348)return![];if(!this[_0x218f5(0x39e)](_0x4bf06e))return![];if(this['isSkillHidden'](_0x1d4b50))return![];return!![];}}},Window_SkillType[_0x124c5c(0x21b)]['makeCommandName']=function(_0x514a39){const _0x33976f=_0x124c5c;let _0x42edfe=$dataSystem[_0x33976f(0x27b)][_0x514a39];if(_0x42edfe[_0x33976f(0x2ad)](/\\I\[(\d+)\]/i))return _0x42edfe;if(this[_0x33976f(0x16b)]()==='text')return _0x42edfe;const _0x29fb76=VisuMZ[_0x33976f(0x3b7)][_0x33976f(0x40d)][_0x33976f(0x2dc)],_0x1e1171=$dataSystem[_0x33976f(0xf3)][_0x33976f(0x261)](_0x514a39),_0x29bdd3=_0x1e1171?_0x29fb76[_0x33976f(0x2a1)]:_0x29fb76['IconStypeNorm'];return'\x5cI[%1]%2'[_0x33976f(0x2c4)](_0x29bdd3,_0x42edfe);},Window_SkillType[_0x124c5c(0x21b)][_0x124c5c(0x1e4)]=function(){const _0x299773=_0x124c5c;return VisuMZ[_0x299773(0x3b7)][_0x299773(0x40d)][_0x299773(0x2dc)]['CmdTextAlign'];},Window_SkillType['prototype'][_0x124c5c(0xfc)]=function(_0x1fb6ed){const _0x562e1d=_0x124c5c,_0x36f292=this['commandStyleCheck'](_0x1fb6ed);if(_0x36f292==='iconText')this[_0x562e1d(0x3fe)](_0x1fb6ed);else{if(_0x36f292==='icon'){if(_0x562e1d(0x2c9)==='skuFR'){const _0x981262=_0x3d8135['parse']('['+_0x255661['$1'][_0x562e1d(0x2ad)](/\d+/g)+']');for(const _0x59cb21 of _0x981262){if(!_0x46fe20[_0x562e1d(0x22d)](_0x59cb21))return![];}return!![];}else this[_0x562e1d(0x205)](_0x1fb6ed);}else Window_Command[_0x562e1d(0x21b)][_0x562e1d(0xfc)][_0x562e1d(0x217)](this,_0x1fb6ed);}},Window_SkillType[_0x124c5c(0x21b)]['commandStyle']=function(){const _0x8afc5e=_0x124c5c;return VisuMZ[_0x8afc5e(0x3b7)][_0x8afc5e(0x40d)][_0x8afc5e(0x2dc)][_0x8afc5e(0x255)];},Window_SkillType[_0x124c5c(0x21b)][_0x124c5c(0x32d)]=function(_0x1e69fa){const _0x30e946=_0x124c5c;if(_0x1e69fa<0x0)return'text';const _0x39e628=this[_0x30e946(0x16b)]();if(_0x39e628!==_0x30e946(0x339))return _0x39e628;else{if(this[_0x30e946(0x23c)]()>0x0){if(_0x30e946(0x3c9)!==_0x30e946(0x36d)){const _0x4a7354=this[_0x30e946(0xc2)](_0x1e69fa);if(_0x4a7354['match'](/\\I\[(\d+)\]/i)){if(_0x30e946(0x35b)===_0x30e946(0x35b)){const _0x47f5b1=this[_0x30e946(0x1d1)](_0x1e69fa),_0x2ff621=this[_0x30e946(0x3dc)](_0x4a7354)['width'];if(_0x2ff621<=_0x47f5b1[_0x30e946(0x365)])return _0x30e946(0x335);else{if(_0x30e946(0x1e0)==='yEGVk')this[_0x30e946(0x214)]['fontFace']=_0x4dd298['mainFontFace'](),this[_0x30e946(0x214)]['fontSize']=_0x4bc71d[_0x30e946(0x2cd)](),this[_0x30e946(0x225)]();else return'icon';}}else{const _0x2d13f4=_0x734474(_0x5823b2['$1'])[_0x30e946(0x364)](',')['map'](_0x5e3db9=>_0x5e3db9['trim']()),_0x4cd1c3=_0x448ed8['SkillsStatesCore']['ParseClassIDs'](_0x2d13f4);let _0x1c26c6=[this[_0x30e946(0x323)]()];return _0xed6ed7[_0x30e946(0x3d8)]&&this[_0x30e946(0x1f5)]&&(_0x1c26c6=this[_0x30e946(0x1f5)]()),_0x4cd1c3[_0x30e946(0x278)](_0x3b9be9=>_0x1c26c6[_0x30e946(0x261)](_0x3b9be9))[_0x30e946(0x37d)]>0x0;}}}else{const _0x43f460=this['mainCommandWidth'](),_0x5eb916=this[_0x30e946(0x301)](0x3,!![]),_0x54a4c6=this['isRightInputMode']()?_0x53f77a[_0x30e946(0x3ba)]-_0x43f460:0x0,_0x46aeec=this[_0x30e946(0x137)]();return new _0x5730f9(_0x54a4c6,_0x46aeec,_0x43f460,_0x5eb916);}}}return _0x30e946(0x249);},Window_SkillType['prototype']['drawItemStyleIconText']=function(_0x3149cb){const _0x336469=_0x124c5c,_0x582439=this[_0x336469(0x1d1)](_0x3149cb),_0x51cdf2=this[_0x336469(0xc2)](_0x3149cb),_0x1e00df=this[_0x336469(0x3dc)](_0x51cdf2)['width'];this['changePaintOpacity'](this[_0x336469(0x3d6)](_0x3149cb));const _0x256d44=this['itemTextAlign']();if(_0x256d44===_0x336469(0x40e))this[_0x336469(0x387)](_0x51cdf2,_0x582439['x']+_0x582439[_0x336469(0x365)]-_0x1e00df,_0x582439['y'],_0x1e00df);else{if(_0x256d44===_0x336469(0x2c7)){const _0x2e2778=_0x582439['x']+Math[_0x336469(0x1ad)]((_0x582439[_0x336469(0x365)]-_0x1e00df)/0x2);this['drawTextEx'](_0x51cdf2,_0x2e2778,_0x582439['y'],_0x1e00df);}else this[_0x336469(0x387)](_0x51cdf2,_0x582439['x'],_0x582439['y'],_0x1e00df);}},Window_SkillType[_0x124c5c(0x21b)]['drawItemStyleIcon']=function(_0x4e776b){const _0x149153=_0x124c5c;this[_0x149153(0xc2)](_0x4e776b)['match'](/\\I\[(\d+)\]/i);const _0x4b9d71=Number(RegExp['$1'])||0x0,_0x1a6f60=this['itemLineRect'](_0x4e776b),_0xefb175=_0x1a6f60['x']+Math[_0x149153(0x1ad)]((_0x1a6f60['width']-ImageManager[_0x149153(0xbe)])/0x2),_0x1a378a=_0x1a6f60['y']+(_0x1a6f60['height']-ImageManager[_0x149153(0x22b)])/0x2;this[_0x149153(0x3ac)](_0x4b9d71,_0xefb175,_0x1a378a);},VisuMZ['SkillsStatesCore'][_0x124c5c(0x190)]=Window_SkillStatus[_0x124c5c(0x21b)][_0x124c5c(0x305)],Window_SkillStatus[_0x124c5c(0x21b)][_0x124c5c(0x305)]=function(){const _0x3c2274=_0x124c5c;VisuMZ[_0x3c2274(0x3b7)][_0x3c2274(0x190)][_0x3c2274(0x217)](this);if(this[_0x3c2274(0x1f8)])this[_0x3c2274(0x3fa)]();},Window_SkillStatus[_0x124c5c(0x21b)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x1e9288=_0x124c5c;if(!Imported[_0x1e9288(0x143)])return;if(!Imported[_0x1e9288(0x2eb)])return;const _0x13ff33=this[_0x1e9288(0x26a)]();let _0x24451c=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x5e88a2=this[_0x1e9288(0x388)]-_0x24451c-0x2;if(_0x5e88a2>=0x12c){if(_0x1e9288(0x296)===_0x1e9288(0x348)){const _0x569440=_0x4d82ec(_0xef7935['$1']),_0x5225ef=_0x5a6eb5[_0x1e9288(0x2c4)](_0x569440,_0x1e9288(0x1ed),-0x1,_0x1e9288(0x3c6));_0x4806d5[_0x1e9288(0x3b7)][_0x1e9288(0x396)][_0x153e8b['id']]=new _0x5172aa(_0x1e9288(0x392),_0x5225ef);}else{const _0x2922a8=VisuMZ[_0x1e9288(0x2a0)]['Settings']['Param']['DisplayedParams'],_0x3ec8d0=Math['floor'](_0x5e88a2/0x2)-0x18;let _0x40617b=_0x24451c,_0x4b138f=Math['floor']((this['innerHeight']-Math[_0x1e9288(0xb2)](_0x2922a8['length']/0x2)*_0x13ff33)/0x2),_0x43327b=0x0;for(const _0x3d71e6 of _0x2922a8){this[_0x1e9288(0x11d)](_0x40617b,_0x4b138f,_0x3ec8d0,_0x3d71e6),_0x43327b++;if(_0x43327b%0x2===0x0)_0x40617b=_0x24451c,_0x4b138f+=_0x13ff33;else{if('TiivP'==='TiivP')_0x40617b+=_0x3ec8d0+0x18;else return![];}}}}this[_0x1e9288(0x274)]();},Window_SkillStatus[_0x124c5c(0x21b)][_0x124c5c(0x11d)]=function(_0x5765bb,_0x2d0578,_0x1d7d33,_0x14b368){const _0x223f74=_0x124c5c,_0x403b0b=this[_0x223f74(0x26a)]();this['resetFontSettings'](),this['drawParamText'](_0x5765bb,_0x2d0578,_0x1d7d33,_0x14b368,!![]),this[_0x223f74(0x225)](),this[_0x223f74(0x214)][_0x223f74(0x369)]-=0x8;const _0x36f881=this['_actor'][_0x223f74(0x33e)](_0x14b368,!![]);this[_0x223f74(0x214)][_0x223f74(0x114)](_0x36f881,_0x5765bb,_0x2d0578,_0x1d7d33,_0x403b0b,_0x223f74(0x40e));},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2fe)]=Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x261)],Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x261)]=function(_0x3c5826){return this['includesSkillsStatesCore'](_0x3c5826);},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x3fc)]=Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x3d4)],Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x3d4)]=function(){const _0x5c6d9e=_0x124c5c;return SceneManager[_0x5c6d9e(0x347)][_0x5c6d9e(0x3e4)]===Scene_Battle?VisuMZ['SkillsStatesCore'][_0x5c6d9e(0x3fc)][_0x5c6d9e(0x217)](this):VisuMZ[_0x5c6d9e(0x3b7)]['Settings'][_0x5c6d9e(0x2dc)][_0x5c6d9e(0x307)];},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x29b)]=Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x178)],Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x178)]=function(_0x3b8bde){const _0x26b620=_0x124c5c,_0x4045a4=this[_0x26b620(0x1f8)]!==_0x3b8bde;VisuMZ[_0x26b620(0x3b7)][_0x26b620(0x29b)][_0x26b620(0x217)](this,_0x3b8bde),_0x4045a4&&('RjpaB'!==_0x26b620(0x125)?(this[_0x26b620(0x1b7)]={},_0x355633[_0x26b620(0x3b7)][_0x26b620(0x1a0)][_0x26b620(0x217)](this)):this[_0x26b620(0x30a)]&&this[_0x26b620(0x30a)][_0x26b620(0x3e4)]===Window_ShopStatus&&this['_statusWindow'][_0x26b620(0x373)](this[_0x26b620(0x23a)](0x0)));},Window_SkillList[_0x124c5c(0x21b)]['setStypeId']=function(_0x1df15b){const _0x4ce993=_0x124c5c;if(this['_stypeId']===_0x1df15b)return;this[_0x4ce993(0x334)]=_0x1df15b,this['refresh'](),this['scrollTo'](0x0,0x0);if(this[_0x4ce993(0x30a)]&&this['_statusWindow'][_0x4ce993(0x3e4)]===Window_ShopStatus){if(_0x4ce993(0x23b)!==_0x4ce993(0x23b)){if(!_0x4dac81['value'](_0x164c49))return!![];}else this['_statusWindow'][_0x4ce993(0x373)](this[_0x4ce993(0x23a)](0x0));}},Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x401)]=function(_0x2301c5){const _0x63aeee=_0x124c5c;if(!_0x2301c5)return VisuMZ[_0x63aeee(0x3b7)][_0x63aeee(0x2fe)][_0x63aeee(0x217)](this,_0x2301c5);if(!this[_0x63aeee(0x3ef)](_0x2301c5))return![];if(!this[_0x63aeee(0x31f)](_0x2301c5))return![];if(!this[_0x63aeee(0x29c)](_0x2301c5))return![];return!![];},Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x3ef)]=function(_0x552e41){const _0x298f6d=_0x124c5c;return DataManager[_0x298f6d(0x271)](_0x552e41)[_0x298f6d(0x261)](this[_0x298f6d(0x334)]);},Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x31f)]=function(_0x1c35be){const _0x441909=_0x124c5c;if(!VisuMZ[_0x441909(0x3b7)][_0x441909(0x290)](this[_0x441909(0x1f8)],_0x1c35be))return![];if(!VisuMZ[_0x441909(0x3b7)]['CheckVisibleSwitchNotetags'](this['_actor'],_0x1c35be))return![];if(!VisuMZ['SkillsStatesCore']['CheckVisibleSkillNotetags'](this['_actor'],_0x1c35be))return![];return!![];},VisuMZ[_0x124c5c(0x3b7)]['CheckVisibleBattleNotetags']=function(_0x499563,_0x2fd857){const _0x30f12b=_0x124c5c,_0x1c13bf=_0x2fd857[_0x30f12b(0x139)];if(_0x1c13bf[_0x30f12b(0x2ad)](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']())return![];else return _0x1c13bf['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x30f12b(0x16e)]()?![]:!![];},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2e5)]=function(_0x422dce,_0x10d7d4){const _0x390b79=_0x124c5c,_0x475835=_0x10d7d4[_0x390b79(0x139)];if(_0x475835['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x40f7d0=JSON['parse']('['+RegExp['$1'][_0x390b79(0x2ad)](/\d+/g)+']');for(const _0x31cb9e of _0x40f7d0){if(!$gameSwitches[_0x390b79(0x2ac)](_0x31cb9e))return![];}return!![];}if(_0x475835[_0x390b79(0x2ad)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x384b7a=JSON[_0x390b79(0x40a)]('['+RegExp['$1'][_0x390b79(0x2ad)](/\d+/g)+']');for(const _0x6caa77 of _0x384b7a){if(!$gameSwitches['value'](_0x6caa77))return![];}return!![];}if(_0x475835[_0x390b79(0x2ad)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x390b79(0x106)!==_0x390b79(0x36e)){const _0x295fba=JSON[_0x390b79(0x40a)]('['+RegExp['$1'][_0x390b79(0x2ad)](/\d+/g)+']');for(const _0x5aa9b6 of _0x295fba){if($gameSwitches[_0x390b79(0x2ac)](_0x5aa9b6))return!![];}return![];}else return _0x52894c[_0x390b79(0x2cd)]()-0x2;}if(_0x475835[_0x390b79(0x2ad)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4170e8=JSON[_0x390b79(0x40a)]('['+RegExp['$1'][_0x390b79(0x2ad)](/\d+/g)+']');for(const _0x3e5cac of _0x4170e8){if(_0x390b79(0x16f)===_0x390b79(0x16f)){if(!$gameSwitches[_0x390b79(0x2ac)](_0x3e5cac))return!![];}else{if(typeof _0x369fc6===_0x390b79(0x3ad))_0x1987d6=_0x15e0bf[_0x65609a];const _0x27a026=_0x390b79(0x336)[_0x390b79(0x2c4)](_0x26449d['id']);this[_0x390b79(0x403)]=this[_0x390b79(0x403)]||{};if(this[_0x390b79(0x403)][_0x27a026])return this['_colorCache'][_0x27a026];const _0x2c67f7=this[_0x390b79(0x360)](_0x1f8af7);return this['getColorDataFromPluginParameters'](_0x27a026,_0x2c67f7);}}return![];}if(_0x475835['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x454b01=JSON[_0x390b79(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x23980e of _0x454b01){if(_0x390b79(0x393)!==_0x390b79(0x1da)){if(!$gameSwitches[_0x390b79(0x2ac)](_0x23980e))return!![];}else{const _0x291912=_0x361b19[_0x390b79(0x3b7)][_0x390b79(0x11b)][_0x390b79(0x217)](this);return _0x291912[_0x390b79(0x2f4)](0x0,0x1);}}return![];}if(_0x475835[_0x390b79(0x2ad)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('yxUKM'==='REaOf')this[_0x390b79(0x31b)](_0xb505e2);else{const _0x43b6ce=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x18a220 of _0x43b6ce){if($gameSwitches[_0x390b79(0x2ac)](_0x18a220))return![];}return!![];}}return!![];},VisuMZ['SkillsStatesCore'][_0x124c5c(0x172)]=function(_0x2cf8a2,_0xb2ef3d){const _0x55cbdb=_0x124c5c,_0x5984eb=_0xb2ef3d['note'];if(_0x5984eb['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x55cbdb(0x1bd)==='zhazd'){const _0x26379a=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0x2fff02 of _0x26379a){if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x2fff02))return![];}return!![];}else{const _0x59ed2a='_stored_debuffColor';this[_0x55cbdb(0x403)]=this['_colorCache']||{};if(this['_colorCache'][_0x59ed2a])return this['_colorCache'][_0x59ed2a];const _0x5a32ed=_0x51e03a[_0x55cbdb(0x3b7)][_0x55cbdb(0x40d)][_0x55cbdb(0xf6)]['ColorDebuff'];return this[_0x55cbdb(0x204)](_0x59ed2a,_0x5a32ed);}}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('JgeAD'===_0x55cbdb(0x110)){const _0x44411=this['shopStatusWidth'](),_0x32b715=this[_0x55cbdb(0x277)]['height'],_0x502b78=this[_0x55cbdb(0x105)]()?0x0:_0x23ab05['boxWidth']-this[_0x55cbdb(0x13e)](),_0x5e3aab=this[_0x55cbdb(0x277)]['y'];return new _0x4066f8(_0x502b78,_0x5e3aab,_0x44411,_0x32b715);}else{const _0x1554e8=RegExp['$1']['split'](',');for(const _0x40960b of _0x1554e8){const _0x4719d2=DataManager['getSkillIdWithName'](_0x40960b);if(!_0x4719d2)continue;if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x4719d2))return![];}return!![];}}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa361c1=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x48e8e7 of _0xa361c1){if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x48e8e7))return![];}return!![];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x55cbdb(0x3fd)===_0x55cbdb(0x3fd)){const _0x20ca78=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x382d27 of _0x20ca78){const _0x3c64bb=DataManager[_0x55cbdb(0xe9)](_0x382d27);if(!_0x3c64bb)continue;if(!_0x2cf8a2['isLearnedSkill'](_0x3c64bb))return![];}return!![];}else return'\x20';}}if(_0x5984eb['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x55cbdb(0x3d0)===_0x55cbdb(0xcd)){if(_0x26e3bb[_0x55cbdb(0x2ac)](_0x1ba972))return![];}else{const _0x5dfbff=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0x22cda6 of _0x5dfbff){if(_0x2cf8a2[_0x55cbdb(0x22d)](_0x22cda6))return!![];}return![];}}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1359df=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x415940 of _0x1359df){const _0x4019f9=DataManager[_0x55cbdb(0xe9)](_0x415940);if(!_0x4019f9)continue;if(_0x2cf8a2[_0x55cbdb(0x22d)](_0x4019f9))return!![];}return![];}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x55cbdb(0x3f8)==='coKhs'){const _0x24713f=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1e6744 of _0x24713f){if(_0x55cbdb(0xf8)===_0x55cbdb(0x3ce)){const _0x525451=_0x47e079[_0x55cbdb(0x40a)]('['+_0x582d28['$1']['match'](/\d+/g)+']');for(const _0x3b73c8 of _0x525451){if(_0x4df39e[_0x55cbdb(0x38c)](_0x3b73c8))return![];}return!![];}else{if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x1e6744))return!![];}}return![];}else _0x3300ac[_0x55cbdb(0x3b7)][_0x55cbdb(0x3c8)][_0x55cbdb(0x217)](this),this[_0x55cbdb(0x236)]();}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x443a7b=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x4474a1 of _0x443a7b){const _0x5764af=DataManager[_0x55cbdb(0xe9)](_0x4474a1);if(!_0x5764af)continue;if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x5764af))return!![];}return![];}}if(_0x5984eb['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x9ecc36=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x30270d of _0x9ecc36){if(_0x55cbdb(0x1e9)===_0x55cbdb(0x3a6)){const _0x497243=_0x17036e[_0x55cbdb(0x40a)]('['+_0x3ad10f['$1']['match'](/\d+/g)+']');for(const _0x17ee7c of _0x497243){if(!_0x2735bb[_0x55cbdb(0x38c)](_0x17ee7c))return![];}return!![];}else{if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x30270d))return!![];}}return![];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xa88085=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x1e3e8c of _0xa88085){const _0x5737e2=DataManager[_0x55cbdb(0xe9)](_0x1e3e8c);if(!_0x5737e2)continue;if(!_0x2cf8a2[_0x55cbdb(0x22d)](_0x5737e2))return!![];}return![];}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c9bf5=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x355d54 of _0x1c9bf5){if(_0x2cf8a2[_0x55cbdb(0x22d)](_0x355d54))return![];}return!![];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x55cbdb(0x17a)==='RkSYl')this['_stateTurns'][_0x4b1ac3]--;else{const _0x72770c=RegExp['$1']['split'](',');for(const _0x3b71b4 of _0x72770c){if(_0x55cbdb(0x1a6)!==_0x55cbdb(0x1a6))_0x5a8960[_0x55cbdb(0x239)](_0x51a9cd(_0x1904e0));else{const _0x29017f=DataManager[_0x55cbdb(0xe9)](_0x3b71b4);if(!_0x29017f)continue;if(_0x2cf8a2[_0x55cbdb(0x22d)](_0x29017f))return![];}}return!![];}}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x55cbdb(0xd2)!==_0x55cbdb(0x263)){const _0x4f1815=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0x2ed1c2 of _0x4f1815){if(_0x55cbdb(0x15e)==='cPUfR'){if(!_0x2cf8a2[_0x55cbdb(0x38c)](_0x2ed1c2))return![];}else{const _0x2fda23=this[_0x55cbdb(0x1a8)]();for(const _0xf29201 of _0x2fda23){if(_0xf29201&&this[_0x55cbdb(0x286)](_0xf29201))this[_0x55cbdb(0x2e8)](_0xf29201['id']);}this['_cache']={};}}return!![];}else{const _0x2b05d1=_0x444886[_0x42f69f];if(!_0x2b05d1)return;const _0x4ed883=_0x2b05d1[_0x55cbdb(0x139)]||'',_0x4ed708=_0x4ed883['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0x4ed708){const _0x47cf7e=[_0x2b05d1];for(const _0x1d51d4 of _0x4ed708){_0x1d51d4['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x433845=_0x3e4dda(_0x4c53a5['$1']);this[_0x55cbdb(0x23e)](_0x433845,_0x47cf7e);}}}}else{if(_0x5984eb['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x55cbdb(0xd5)===_0x55cbdb(0xd5)){const _0x18242c=RegExp['$1']['split'](',');for(const _0x5ccd52 of _0x18242c){const _0xb65bf0=DataManager[_0x55cbdb(0xe9)](_0x5ccd52);if(!_0xb65bf0)continue;if(!_0x2cf8a2[_0x55cbdb(0x38c)](_0xb65bf0))return![];}return!![];}else{const _0x4e8b1d=[_0x2f440d];for(const _0x320737 of _0x48b02e){_0x320737[_0x55cbdb(0x2ad)](/<REMOVE OTHER (.*) STATES>/i);const _0x2655aa=_0x181fa6(_0x413c3b['$1']);this[_0x55cbdb(0x23e)](_0x2655aa,_0x4e8b1d);}}}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35abf9=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0x2b85a4 of _0x35abf9){if(_0x55cbdb(0x2af)!==_0x55cbdb(0x322)){if(!_0x2cf8a2[_0x55cbdb(0x38c)](_0x2b85a4))return![];}else{_0xe5940a[_0x55cbdb(0x3b7)][_0x55cbdb(0x3a9)]['call'](this);const _0xec7c86=_0x117cc2[_0x55cbdb(0x3b7)][_0x55cbdb(0x40d)]['PassiveStates'][_0x55cbdb(0x1e5)]??!![];if(!_0xec7c86)return;if(_0x4b9306[_0x55cbdb(0x279)]())for(const _0x32db64 of _0x5a0dea[_0x55cbdb(0x366)]()){if(_0x32db64)_0x32db64[_0x55cbdb(0x305)]();}}}return!![];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x40ccb5=RegExp['$1']['split'](',');for(const _0x4249e8 of _0x40ccb5){const _0x39cacb=DataManager[_0x55cbdb(0xe9)](_0x4249e8);if(!_0x39cacb)continue;if(!_0x2cf8a2['hasSkill'](_0x39cacb))return![];}return!![];}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e0ac0=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0x2abd1e of _0x3e0ac0){if(_0x2cf8a2[_0x55cbdb(0x38c)](_0x2abd1e))return!![];}return![];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xb9dc82=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x16810e of _0xb9dc82){const _0x1c1489=DataManager[_0x55cbdb(0xe9)](_0x16810e);if(!_0x1c1489)continue;if(_0x2cf8a2['hasSkill'](_0x1c1489))return!![];}return![];}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('IyPgv'!==_0x55cbdb(0x3ee)){const _0x3a6015=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4ce3a3 of _0x3a6015){if(!_0x2cf8a2[_0x55cbdb(0x38c)](_0x4ce3a3))return!![];}return![];}else return _0x2b2535[_0x55cbdb(0x400)]()[_0x5d4613(_0x1992d3['$1'])];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('NBSpq'===_0x55cbdb(0x2be))_0x446aab('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x47ab1c,_0x44fc01,_0x2ca97e)),_0x8b9cab['exit']();else{const _0x5ca6c3=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x256c3c of _0x5ca6c3){if(_0x55cbdb(0xd3)!==_0x55cbdb(0x18d)){const _0x256db8=DataManager[_0x55cbdb(0xe9)](_0x256c3c);if(!_0x256db8)continue;if(!_0x2cf8a2[_0x55cbdb(0x38c)](_0x256db8))return!![];}else{if(this[_0x55cbdb(0x24b)]||this[_0x55cbdb(0x361)])return;const _0x574f59=_0x1f5861['SkillsStatesCore'][_0x55cbdb(0x27d)];if(_0x574f59[_0x70fd4a])_0x574f59[_0x1c699e]['call'](this,_0x31450d);}}return![];}}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xbbf0a3=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0xba223c of _0xbbf0a3){if(!_0x2cf8a2['hasSkill'](_0xba223c))return!![];}return![];}else{if(_0x5984eb['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4b8d82=RegExp['$1'][_0x55cbdb(0x364)](',');for(const _0x3af9a0 of _0x4b8d82){const _0x46044e=DataManager['getSkillIdWithName'](_0x3af9a0);if(!_0x46044e)continue;if(!_0x2cf8a2[_0x55cbdb(0x38c)](_0x46044e))return!![];}return![];}}if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d6ccf=JSON[_0x55cbdb(0x40a)]('['+RegExp['$1'][_0x55cbdb(0x2ad)](/\d+/g)+']');for(const _0x233f06 of _0x5d6ccf){if(_0x2cf8a2[_0x55cbdb(0x38c)](_0x233f06))return![];}return!![];}else{if(_0x5984eb[_0x55cbdb(0x2ad)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x55cbdb(0x126)!==_0x55cbdb(0x1b5)){const _0x15286f=RegExp['$1']['split'](',');for(const _0x5e4bf8 of _0x15286f){if(_0x55cbdb(0x405)===_0x55cbdb(0x405)){const _0x5cd197=DataManager[_0x55cbdb(0xe9)](_0x5e4bf8);if(!_0x5cd197)continue;if(_0x2cf8a2['hasSkill'](_0x5cd197))return![];}else for(const _0x481bf0 of _0x484963){_0x481bf0[_0x55cbdb(0x2ad)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4dfedf=_0x1655ed[_0x55cbdb(0xb0)](_0x1d7795(_0xcc9026['$1'])[_0x55cbdb(0x3b0)]()),_0x590a16=_0x32e973(_0x42e13a['$2']);_0x4dfedf>=0x0&&(_0x11c1cd[_0x55cbdb(0x304)](_0x4dfedf,_0x590a16),this['makeSuccess'](_0x24ffc8));}}return!![];}else{const _0xb65555=_0x3b3001['note'];return _0xb65555[_0x55cbdb(0x2ad)](/<REAPPLY RULES:[ ](.*)>/i)?_0x18409d(_0x42856c['$1']):_0x260052[_0x55cbdb(0x3b7)]['Settings'][_0x55cbdb(0x107)][_0x55cbdb(0x1eb)];}}}return!![];},Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x29c)]=function(_0x5a0997){const _0x3f3efd=_0x124c5c,_0x4f9b6f=_0x5a0997[_0x3f3efd(0x139)],_0x24f06b=VisuMZ[_0x3f3efd(0x3b7)]['skillVisibleJS'];return _0x24f06b[_0x5a0997['id']]?_0x24f06b[_0x5a0997['id']][_0x3f3efd(0x217)](this,_0x5a0997):!![];},VisuMZ['SkillsStatesCore'][_0x124c5c(0x24c)]=Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0xfc)],Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0xfc)]=function(_0xb1963e){const _0x280aaa=_0x124c5c,_0x3f512c=this['itemAt'](_0xb1963e),_0x3d7fab=_0x3f512c?_0x3f512c['name']:'';if(_0x3f512c)this[_0x280aaa(0x1d4)](_0x3f512c);VisuMZ[_0x280aaa(0x3b7)][_0x280aaa(0x24c)][_0x280aaa(0x217)](this,_0xb1963e);if(_0x3f512c)_0x3f512c[_0x280aaa(0x22a)]=_0x3d7fab;},Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x1d4)]=function(_0xed6223){const _0x28097d=_0x124c5c;if(_0xed6223&&_0xed6223[_0x28097d(0x139)][_0x28097d(0x2ad)](/<LIST NAME:[ ](.*)>/i)){if(_0x28097d(0x164)==='MsSfP')this[_0x28097d(0x387)](_0x50291f,_0x8aa01f['x']+_0x3975a4[_0x28097d(0x365)]-_0x1ab698,_0x2a09ed['y'],_0x57b407);else{_0xed6223[_0x28097d(0x22a)]=String(RegExp['$1'])[_0x28097d(0x171)]();for(;;){if(_0xed6223[_0x28097d(0x22a)][_0x28097d(0x2ad)](/\\V\[(\d+)\]/gi)){if('uPQJb'===_0x28097d(0x325))_0xed6223['name']=_0xed6223[_0x28097d(0x22a)][_0x28097d(0x3e0)](/\\V\[(\d+)\]/gi,(_0x9825d1,_0x1e7335)=>$gameVariables[_0x28097d(0x2ac)](parseInt(_0x1e7335)));else return this[_0x28097d(0x195)]();}else break;}}}},Window_SkillList['prototype'][_0x124c5c(0x2a6)]=function(_0x1c1f2c,_0x301ef8,_0xc16fb7,_0x45ced7){const _0x45a968=_0x124c5c;Window_Base['prototype']['drawSkillCost'][_0x45a968(0x217)](this,this['_actor'],_0x1c1f2c,_0x301ef8,_0xc16fb7,_0x45ced7);},Window_SkillList[_0x124c5c(0x21b)]['setStatusWindow']=function(_0x3fd9c1){const _0x18f347=_0x124c5c;this[_0x18f347(0x30a)]=_0x3fd9c1,this[_0x18f347(0x385)]();},VisuMZ[_0x124c5c(0x3b7)][_0x124c5c(0x2b3)]=Window_SkillList[_0x124c5c(0x21b)][_0x124c5c(0x37e)],Window_SkillList['prototype'][_0x124c5c(0x37e)]=function(){const _0x4d2c17=_0x124c5c;VisuMZ['SkillsStatesCore']['Window_SkillList_updateHelp'][_0x4d2c17(0x217)](this),this[_0x4d2c17(0x30a)]&&this[_0x4d2c17(0x30a)][_0x4d2c17(0x3e4)]===Window_ShopStatus&&this[_0x4d2c17(0x30a)]['setItem'](this[_0x4d2c17(0x10d)]());};