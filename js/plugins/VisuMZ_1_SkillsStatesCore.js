//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.35] [SkillsStatesCore]
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
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
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
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
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
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
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

const _0x5e012b=_0x11a5;function _0x32f2(){const _0x1e63de=['loadBitmap','anchor','labelFontFace','eraseState','wvVvO','eqxOw','onExpireStateGlobalJS','Window_SkillList_updateHelp','Game_BattlerBase_states','THizX','resetFontSettings','isUseSkillsStatesCoreUpdatedLayout','isStateCategoryAffected','clearStateRetainType','YBQXo','getCurrentTroopUniqueID','hMehS','paramBuffRate','UmgWL','AChoD','DataFontSize','Window_SkillList_drawItem','onAddBuff','ParseStateNotetags','addDebuff','lineHeight','YXQXF','kmRXR','Name','addDebuffTurns','increaseBuff','clearStates','labelOutlineWidth','skill','AHBYG','endAction','state','textColor','hasStateCategory','Gauge','Eyedb','ignore','dtFcE','wSntW','TurnOffsetY','mPRat','MAXHP','parameters','drawItemStyleIcon','SPRcm','onEraseStateGlobalJS','cWTtd','onEraseDebuffGlobalJS','initMembersSkillsStatesCore','menuActor','applyItemUserEffect','stateTurns','Parse_Notetags_State_SlipEffectJS','success','LzXET','WPopS','rqQRy','ItmZi','isSceneBattle','skillTypes','kNhDG','GroupDigits','_tempBattler','mLOFG','Game_Battler_isStateAddable','SkillsStatesCore','ParseSkillNotetags','value','Sprite_StateIcon_updateFrame','traitObjects','ThdeV','action','ZOdKD','checkSkillConditionsSwitchNotetags','indexOf','CmdStyle','toLowerCase','replace','auto','VbIfe','max','clamp','Tiftz','getStateData','getStypeIdWithName','Parse_Notetags_State_Category','_battler','iconHeight','valueFontSize','width','actor','Game_Action_testApply','eMRtL','checkSkillTypeMatch','Game_Action_applyItemUserEffect','greater','isDebuffAffected','skillVisibleJS','ZlarT','isStateRemoved','22889789INrEJp','VisuMZ_2_ClassChangeSystem','commandName','zpasX','DataOffsetX','WdqYu','none','meetsPassiveStateConditions','actions','trKxP','split','ParseClassIDs','commandNameWindowDrawText','SkillConditionJS','LabelOutlineSolid','xehiB','setDebuffTurns','debuffTurns','makeCommandName','gainHp','Sprite_Gauge_currentMaxValue','TurnEndOnMap','floor','Skills','odJpG','onAddStateJS','clearStateData','isSkillHidden','drawText','fontBold','currentValue','GFPDm','stateCategoriesResisted','setActor','_skills','includesSkillsStatesCore','UuzVG','Game_BattlerBase_traitsSet','frameCount','testSkillStatesCoreNotetags','Vfceq','Game_BattlerBase_refresh','paramValueByName','currentMaxValueSkillsStatesCore','statePassiveConditionJS','602673gBoZAR','allIcons','Parse_Notetags_State_PassiveJS','AWTZj','TurnOffsetX','3952902lUXpgE','createShopStatusWindow','Game_BattlerBase_meetsSkillConditions','GaugeMaxJS','bOqhO','isStateRestrict','shopStatusWindowRect','itemAt','call','paySkillCost','Game_Actor_forgetSkill','onExpireBuff','addChild','skillTypeWindowRectSkillsStatesCore','xWOYu','itemLineRect','WezdR','innerWidth','setPassiveStateSlipDamageJS','ATK','applySkillsStatesCoreEffects','onExpireDebuffJS','ssjzS','kFYGv','boxWidth','clbfa','stateTpSlipHealJS','Parse_Notetags_Skill_JS','ColorNegative','ZITaj','YwbXf','createSkillCostText','ReapplyRules','GdRTq','_stateRetainType','ActionEndUpdate','description','CanPayJS','bUGiw','CYEoH','VisuMZ_0_CoreEngine','<actor-%1>','eraseBuff','onExpireDebuffGlobalJS','helpWindowRect','meetsPassiveStateConditionClasses','applyBuffTurnManipulationEffects','AnSky','PayJS','EmRvU','drawFullGauge','labelFontSize','drawActorStateData','applyStateCategoryRemovalEffects','calcWindowHeight','mpDamage','_stateDisplay','RefreshCacheVar','LayoutStyle','createItemWindow','_turnDisplaySprite','bXcHr','multiclasses','Scene_Skill_statusWindowRect','qkfBw','drawTextEx','updateStateTurns','CalcJS','BattleHiddenSkillTypes','getStateDisplay','onAddStateGlobalJS','MultiplierJS','_stateOrigin','refresh','VbNKD','Gyxcr','maxCols','NEGATIVE','aOJug','addPassiveStatesByPluginParameters','removeStatesByCategory','changeOutlineColor','fontSize','regenerateAll','dCojC','SkillMenuStatusRect','totalStateCategoryAffected','hide','ValueOutlineWidth','36SJFnPa','9qFPCgy','addPassiveStatesFromOtherPlugins','drawActorIconsAllTurnCounters','convertPassiveStates','makeCurrentTroopUniqueID','getStateIdWithName','_tempActor','updateFrame','SkillSceneAdjustSkillList','_animationIndex','debuffColor','stateId','Sprite_Gauge_setup','commandNameWindowDrawBackground','makeSuccess','allowCreateShopStatusWindow','qJVSk','BCJdt','FGCiv','remove','KcNzA','setStateOrigin','_itemWindow','removeOtherStatesOfSameCategory','clear','outlineColor','stateHpSlipDamageJS','AQDnn','VisuMZ_1_ItemsEquipsCore','_currentActor','Game_BattlerBase_skillMpCost','_states','valueFontFace','xXdJl','groupDefeat','GaugeDrawJS','numberFontFace','sQvZA','_categoryWindow','isSkillUsableForAutoBattle','dbtqg','ShowTurns','buffLength','YBfdJ','eFyuY','stateColor','KsnnG','updatedLayoutStyle','huGYO','wcFOR','_buffTurns','AFdLp','kvIDv','_stateSteps','Game_BattlerBase_increaseBuff','changeTextColor','STRUCT','iKJJS','PefWh','isStateAddable','lsvxY','KkIyZ','resetStateCounts','Scene_Skill_itemWindowRect','meetsSkillConditions','uiMenuStyle','isGroupDefeatStateAffected','mainAreaTop','makeResistedStateCategories','Window_StatusBase_placeGauge','onRegenerateCustomStateDamageOverTime','skillTypeWindowRect','mainFontSize','stateExpireJS','Game_Actor_skillTypes','slipMp','gaugeBackColor','meetsPassiveStateConditionJS','nFzDy','meetsSkillConditionsGlobalJS','canClearState','setBuffTurns','UhGFM','hasSkill','add','clearStateOrigin','Game_Battler_addState','onExpireBuffGlobalJS','_stypeIDs','PassiveConditionJS','PfMSx','resetTextColor','categories','untitled','getStateOriginByKey','YUhoy','statusWindowRect','PresetLabelGaugeColor','14dvyOEe','onAddStateMakeCustomSlipValues','iconText','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','right','_hidden','recalculateSlipDamageJS','tBKpx','setStatusWindow','onAddDebuffGlobalJS','fontFace','commandNameWindowCenter','GaugeCurrentJS','ecafv','ZoXgW','MDF','_phase','removeStatesAuto','drawActorIcons','addState','SCwqT','_checkingPassiveStates','clearStateDisplay','exit','convertTargetToStateOriginKey','saJUF','NSoxF','_passiveStateResults','_classIDs','QROVk','damage','alterSkillName','onExpireDebuff','equips','gradientFillRect','YkZkt','tGCKQ','_stateMaxTurns','Window_SkillList_includes','_subject','Game_Switches_onChange','buffTurns','woash','initialize','updateTurnDisplaySprite','stepsForTurn','magicSkills','yTfta','trim','traitsSet','rCteb','VYrNt','slipHp','Window_SkillStatus_refresh','isMaxDebuffAffected','_costSettings','Geucr','gainMp','isRightInputMode','fillRect','setStateData','onExpireState','SkillSceneStatusBgType','RefreshCacheSwitch','ygswL','getSkillTypes','ALL','allBattleMembers','CheckIncompatibleStates','uiHelpPosition','JdbKP','VisuMZ_1_MainMenuCore','_checkingTraitsSetSkillsStatesCore','addPassiveStatesTraitSets','textSizeEx','Window_SkillType_initialize','Opzui','isBottomHelpMode','meetsPassiveStateConditionSwitches','recover\x20all','eHSRK','setStypeId','colSpacing','LUK','ebYom','nfYTD','_currentTroopUniqueID','_scene','UeABn','checkShowHideJS','Game_Actor_learnSkill','FUNC','mdmKX','center','recoverAll','useDigitGrouping','ColorBuff','opacity','Scene_Skill_helpWindowRect','labelOutlineColor','getStateRetainType','currentValueSkillsStatesCore','CoreEngine','Game_BattlerBase_initMembers','convertGaugeTypeSkillsStatesCore','TurnFontSize','VfXDW','Game_Unit_isAllDead','addWindow','HGjia','isStateCategoryResisted','applyStateTurnManipulationEffects','Game_Troop_setup','sort','BMxOk','EnableLayout','valueOutlineWidth','onExpireStateCustomJS','DOaex','CmdTextAlign','kWWOD','getSkillIdWithName','vsakT','_shopStatusWindow','helpWindowRectSkillsStatesCore','vEwTc','zgaLy','updateHelp','number','fYLik','FjJOH','heal','removeStatesByCategoryAll','text','INfBW','placeGauge','%1%','hasState','AsITz','isBuffOrDebuffAffected','nsryQ','TzgcP','Sprite_Gauge_gaugeRate','CZtQd','Game_BattlerBase_isStateResist','skillMpCost','stypeId','gainSilentTp','AdWhO','version','currentClass','onEraseStateJS','NbOCn','xelpk','constructor','concat','isStateResist','checkShowHideNotetags','_skillTypeWindow','slipTp','passiveStateObjects','canPaySkillCost','status','normalColor','onEraseDebuff','qgyaC','createCommandNameWindow','buff','aAVIo','isPlaytest','hpDamage','ANY','States','UnnDN','vboDA','onAddDebuffJS','_stateIDs','stateData','dfnvx','Settings','ShowJS','isUseModernControls','clearStatesWithStateRetain','setBackgroundType','statesByCategory','vNpnf','oEvzV','ShowData','maxSlipDamage','glhwd','rWnke','user','ZnLgg','applyDebuffTurnManipulationEffects','meetsPassiveStateGlobalConditionJS','removeBuffsAuto','setStateRetainType','maBoc','Game_Battler_addDebuff','onAddBuffJS','initMembers','AisNd','onEraseDebuffJS','ARRAYFUNC','stOJj','includes','bitmap','Game_Battler_addBuff','_colorCache','shcTu','onAddBuffGlobalJS','LabelFontMainType','isAlive','scrollTo','setStateTurns','4JbqxTd','isCommandEnabled','13055110KnptGt','itemWindowRect','createPassiveStatesCache','mSqmJ','IconStypeMagic','gaugeRate','onExpireBuffJS','CheckVisibleBattleNotetags','bmeiZ','QfOTK','length','statusWidth','uQfON','XNiKk','learnSkill','Game_BattlerBase_resetStateCounts','Costs','drawActorBuffRates','bzArA','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','keys','getClassIdWithName','ShowShopStatus','kKHyi','prototype','drawItemStyleIconText','drawItem','WjMol','HVulA','PEdPb','toUpperCase','AGI','DEF','commandStyle','StackBuffMax','buttonAssistSwitch','reset','_stateTurns','onExpireStateJS','return\x200','Mkdct','IPouw','checkCacheKey','_stored_state-%1-color','Scene_Skill_createItemWindow','%1\x20%2\x20%3','onAddStateCustomJS','sKnJx','isStateAffected','priority','drawActorStateTurns','members','shift','EKlnZ','getColor','llHBB','Actor','Game_BattlerBase_recoverAll','makeCommandList','isPartyAllAffectedByGroupDefeatStates','MatchLabelColor','setItem','ValueFontMainType','iconIndex','_stateData','addStateTurns','getStateOrigin','Scene_Skill_skillTypeWindowRect','ValueOutlineSolid','Ollee','updateStatesActionEnd','rgba(0,\x200,\x200,\x200)','ZlODR','Game_BattlerBase_decreaseBuff','match','gjeUy','Game_BattlerBase_die','CheckVisibleSkillNotetags','parse','_actor','buffColor','nMTyS','autoRemovalTiming','stateAddJS','Game_BattlerBase_skillTpCost','isBuffExpired','IconStypeNorm','addBuffTurns','qXKSX','ceil','shopStatusWindowRectSkillsStatesCore','GQJZi','ARRAYEVAL','skillEnableJS','uiInputPosition','buffIconIndex','map','WLrII','_statusWindow','onEraseStateCustomJS','enemy','adjustItemWidthByShopStatus','maxItems','MaxTurns','SqQhi','Game_Variables_onChange','Game_BattlerBase_buffIconIndex','isSkillCostShown','bVLyx','dGgiq','UsXyn','_skillIDs','ptQHN','drawSkillCost','skills','gaugeLineHeight','LabelOutlineWidth','height','BattleManager_endAction','Byjax','onChange','ConvertParams','test','onDatabaseLoaded','contents','Game_BattlerBase_overwriteBuffTurns','setup','zgfJG','Window_SkillList_maxCols','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','17725AYHkVW','5262488IuilxK','drawExtendedParameter','round','windowPadding','SEdls','getColorDataFromPluginParameters','callUpdateHelp','152uxHJUl','Buffs','gnGhq','checkSkillConditionsNotetags','wNnCG','IiBYK','getCurrentStateActiveUser','PassiveStates','createTurnDisplaySprite','_commandNameWindow','Game_BattlerBase_clearStates','MAXMP','LgDsu','468643BHwgoS','overwriteBuffTurns','retrieveStateColor','DiDeh','oKnXs','fNgTx','meetsSkillConditionsEnableJS','FwXfi','redrawSkillsStatesCore','CheckVisibleSwitchNotetags','TnQwp','slice','avSdK','ARRAYSTRUCT','passiveStates','MAT','Sprite_Gauge_initMembers','isPassiveStateStackable','note','MatchLabelGaugeColor','Parse_Notetags_Skill_Cost','itemWindowRectSkillsStatesCore','2gsChMP','inBattle','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','stateEraseJS','isSkillTypeMatchForUse','death','Game_Battler_regenerateAll','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','item','bcSFO','UOKLu','die','DWLxj','mainFontFace','buttonAssistText1','mainCommandWidth','zywRy','wlRHJ','emYoh','actorId','Game_BattlerBase_eraseBuff','ddwfa','redraw','ecAKj','removeState','TextJS','currentMaxValue','_lastStatesActionEndFrameCount','index','VDwXH','dasQh','format','addBuff','DataOffsetY','Window_StatusBase_drawActorIcons','isStateExpired','skillCostSeparator','onRemoveState','name','_cache','Param','push','1482QJMzMN','meetsStateCondition','statusWindowRectSkillsStatesCore','enemyId','BNWmn','filter','decreaseBuff','addPassiveStates','shopStatusWidth','isBuffAffected','states','addPassiveStatesByNotetag','onAddDebuff','getCurrentStateOriginKey','onEraseBuff','itemTextAlign','commandStyleCheck','STR','Parse_Notetags_State_ApplyRemoveLeaveJS','_result','iconWidth','icon','eHvMA','VUkan','Sprite_StateIcon_loadBitmap','Window_SkillList_setActor','Game_BattlerBase_eraseState','helpAreaHeight','gaugeColor1','DHNXQ','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','POSITIVE','updateCommandNameWindow','VcqAZ','<troop-%1>','ColorNeutral','drawExtendedSkillsStatesCoreStatus','ciKbK','<member-%1>','nPZZa','<enemy-%1>','stateMpSlipHealJS','_stypeId','HhYTX','_buffs','log','testApply','isAllDead','stateTpSlipDamageJS','stateHpSlipHealJS','isLearnedSkill','rgba(0,\x200,\x200,\x201)','uWUWp','gaugeColor2','\x5cI[%1]%2','HiddenSkillTypes','forgetSkill','stateMpSlipDamageJS','ParseAllNotetags','_checkingVisuMzPassiveStateObjects','ColorDebuff','VisuMZ_1_ElementStatusCore','process_VisuMZ_SkillsStatesCore_Notetags','stateMaximumTurns','canUse','pdjoF'];_0x32f2=function(){return _0x1e63de;};return _0x32f2();}(function(_0x5890e9,_0xec2969){const _0x48f849=_0x11a5,_0x4a1569=_0x5890e9();while(!![]){try{const _0x4232bd=parseInt(_0x48f849(0x481))/0x1*(parseInt(_0x48f849(0x37f))/0x2)+-parseInt(_0x48f849(0x486))/0x3*(-parseInt(_0x48f849(0x2d0))/0x4)+parseInt(_0x48f849(0x354))/0x5*(-parseInt(_0x48f849(0x3a9))/0x6)+parseInt(_0x48f849(0x369))/0x7*(-parseInt(_0x48f849(0x35c))/0x8)+parseInt(_0x48f849(0x4e0))/0x9*(parseInt(_0x48f849(0x2d2))/0xa)+parseInt(_0x48f849(0x355))/0xb*(parseInt(_0x48f849(0x4df))/0xc)+-parseInt(_0x48f849(0x454))/0xd*(parseInt(_0x48f849(0x1f9))/0xe);if(_0x4232bd===_0xec2969)break;else _0x4a1569['push'](_0x4a1569['shift']());}catch(_0xeaa86b){_0x4a1569['push'](_0x4a1569['shift']());}}}(_0x32f2,0xb7c03));var label=_0x5e012b(0x431),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5e012b(0x3ae)](function(_0xd6b1e0){const _0x1acad9=_0x5e012b;return _0xd6b1e0[_0x1acad9(0x29b)]&&_0xd6b1e0[_0x1acad9(0x4aa)][_0x1acad9(0x2c6)]('['+label+']');})[0x0];function _0x11a5(_0x143058,_0x43e82a){const _0x32f250=_0x32f2();return _0x11a5=function(_0x11a520,_0x42662a){_0x11a520=_0x11a520-0x1ed;let _0x1c5f06=_0x32f250[_0x11a520];return _0x1c5f06;},_0x11a5(_0x143058,_0x43e82a);}VisuMZ[label]['Settings']=VisuMZ[label][_0x5e012b(0x2ac)]||{},VisuMZ[_0x5e012b(0x34b)]=function(_0x5b90a7,_0x1e8092){const _0x5a3f1c=_0x5e012b;for(const _0xc52e99 in _0x1e8092){if(_0xc52e99[_0x5a3f1c(0x31c)](/(.*):(.*)/i)){if(_0x5a3f1c(0x38f)!=='uWfTr'){const _0x2b103e=String(RegExp['$1']),_0x38ed39=String(RegExp['$2'])[_0x5a3f1c(0x2f0)]()[_0x5a3f1c(0x229)]();let _0x1c8800,_0x406c3f,_0x1f9e6b;switch(_0x38ed39){case'NUM':_0x1c8800=_0x1e8092[_0xc52e99]!==''?Number(_0x1e8092[_0xc52e99]):0x0;break;case'ARRAYNUM':_0x406c3f=_0x1e8092[_0xc52e99]!==''?JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99]):[],_0x1c8800=_0x406c3f['map'](_0x5c8c37=>Number(_0x5c8c37));break;case'EVAL':_0x1c8800=_0x1e8092[_0xc52e99]!==''?eval(_0x1e8092[_0xc52e99]):null;break;case _0x5a3f1c(0x32e):_0x406c3f=_0x1e8092[_0xc52e99]!==''?JSON['parse'](_0x1e8092[_0xc52e99]):[],_0x1c8800=_0x406c3f[_0x5a3f1c(0x332)](_0x485379=>eval(_0x485379));break;case'JSON':_0x1c8800=_0x1e8092[_0xc52e99]!==''?JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99]):'';break;case'ARRAYJSON':_0x406c3f=_0x1e8092[_0xc52e99]!==''?JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99]):[],_0x1c8800=_0x406c3f['map'](_0x475d65=>JSON[_0x5a3f1c(0x320)](_0x475d65));break;case _0x5a3f1c(0x254):_0x1c8800=_0x1e8092[_0xc52e99]!==''?new Function(JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99])):new Function(_0x5a3f1c(0x2f9));break;case _0x5a3f1c(0x2c4):_0x406c3f=_0x1e8092[_0xc52e99]!==''?JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99]):[],_0x1c8800=_0x406c3f['map'](_0x28f0a3=>new Function(JSON[_0x5a3f1c(0x320)](_0x28f0a3)));break;case _0x5a3f1c(0x3ba):_0x1c8800=_0x1e8092[_0xc52e99]!==''?String(_0x1e8092[_0xc52e99]):'';break;case'ARRAYSTR':_0x406c3f=_0x1e8092[_0xc52e99]!==''?JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99]):[],_0x1c8800=_0x406c3f[_0x5a3f1c(0x332)](_0x270517=>String(_0x270517));break;case _0x5a3f1c(0x518):_0x1f9e6b=_0x1e8092[_0xc52e99]!==''?JSON['parse'](_0x1e8092[_0xc52e99]):{},_0x5b90a7[_0x2b103e]={},VisuMZ['ConvertParams'](_0x5b90a7[_0x2b103e],_0x1f9e6b);continue;case _0x5a3f1c(0x376):_0x406c3f=_0x1e8092[_0xc52e99]!==''?JSON[_0x5a3f1c(0x320)](_0x1e8092[_0xc52e99]):[],_0x1c8800=_0x406c3f[_0x5a3f1c(0x332)](_0x4c4ecc=>VisuMZ[_0x5a3f1c(0x34b)]({},JSON[_0x5a3f1c(0x320)](_0x4c4ecc)));break;default:continue;}_0x5b90a7[_0x2b103e]=_0x1c8800;}else{if(!_0x532267['value'](_0x4b5292))return!![];}}}return _0x5b90a7;},(_0x1f1b8a=>{const _0x4b9a3d=_0x5e012b,_0x440360=_0x1f1b8a[_0x4b9a3d(0x3a5)];for(const _0x2df7e5 of dependencies){if(!Imported[_0x2df7e5]){if(_0x4b9a3d(0x36c)===_0x4b9a3d(0x373))return!![];else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4b9a3d(0x39e)](_0x440360,_0x2df7e5)),SceneManager[_0x4b9a3d(0x210)]();break;}}}const _0x32243a=_0x1f1b8a['description'];if(_0x32243a[_0x4b9a3d(0x31c)](/\[Version[ ](.*?)\]/i)){if(_0x4b9a3d(0x3d0)!=='eNgbf'){const _0x2ce3dc=Number(RegExp['$1']);_0x2ce3dc!==VisuMZ[label][_0x4b9a3d(0x28e)]&&(alert(_0x4b9a3d(0x2e5)[_0x4b9a3d(0x39e)](_0x440360,_0x2ce3dc)),SceneManager[_0x4b9a3d(0x210)]());}else _0x1b4618[_0x4b9a3d(0x431)][_0x4b9a3d(0x2ac)]['States'][_0x4b9a3d(0x2f8)]['call'](this,_0x329e51);}if(_0x32243a['match'](/\[Tier[ ](\d+)\]/i)){if(_0x4b9a3d(0x249)!==_0x4b9a3d(0x249)){const _0x2a1004=_0x405864[_0x4b9a3d(0x320)]('['+_0x3824bc['$1']['match'](/\d+/g)+']');for(const _0x5b11b6 of _0x2a1004){if(!_0x28d7f2[_0x4b9a3d(0x3db)](_0x5b11b6))return!![];}return![];}else{const _0x19e533=Number(RegExp['$1']);_0x19e533<tier?(alert(_0x4b9a3d(0x1fc)[_0x4b9a3d(0x39e)](_0x440360,_0x19e533,tier)),SceneManager['exit']()):tier=Math[_0x4b9a3d(0x440)](_0x19e533,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x4b9a3d(0x2ac)],_0x1f1b8a[_0x4b9a3d(0x41a)]);})(pluginData),VisuMZ[_0x5e012b(0x431)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x5e012b(0x2ea)][_0x5e012b(0x34d)],Scene_Boot[_0x5e012b(0x2ea)]['onDatabaseLoaded']=function(){const _0x2a6630=_0x5e012b;VisuMZ[_0x2a6630(0x431)]['Scene_Boot_onDatabaseLoaded'][_0x2a6630(0x48e)](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ[_0x2a6630(0x431)][_0x2a6630(0x23d)]();},Scene_Boot[_0x5e012b(0x2ea)][_0x5e012b(0x3e7)]=function(){const _0x4c8c74=_0x5e012b;if(VisuMZ[_0x4c8c74(0x3e3)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x242ad0=_0x5e012b;for(const _0x3cbfa3 of $dataSkills){if(_0x242ad0(0x52e)!==_0x242ad0(0x52e)){if(!_0x1726fc[_0x242ad0(0x431)]['CheckVisibleBattleNotetags'](this,_0x5ac49d))return!![];if(!_0x2a2221['SkillsStatesCore'][_0x242ad0(0x372)](this,_0x11197d))return!![];if(!_0xc96f90[_0x242ad0(0x431)]['CheckVisibleSkillNotetags'](this,_0x207be5))return!![];return![];}else{if(!_0x3cbfa3)continue;VisuMZ[_0x242ad0(0x431)][_0x242ad0(0x37d)](_0x3cbfa3),VisuMZ[_0x242ad0(0x431)][_0x242ad0(0x4a1)](_0x3cbfa3);}}},Scene_Boot[_0x5e012b(0x2ea)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x38da62=_0x5e012b;for(const _0x33ad36 of $dataStates){if(!_0x33ad36)continue;VisuMZ[_0x38da62(0x431)]['Parse_Notetags_State_Category'](_0x33ad36),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS'](_0x33ad36),VisuMZ[_0x38da62(0x431)][_0x38da62(0x424)](_0x33ad36),VisuMZ[_0x38da62(0x431)][_0x38da62(0x3bb)](_0x33ad36);}},VisuMZ['SkillsStatesCore']['ParseSkillNotetags']=VisuMZ[_0x5e012b(0x432)],VisuMZ[_0x5e012b(0x432)]=function(_0x50da66){const _0x55847a=_0x5e012b;VisuMZ[_0x55847a(0x431)][_0x55847a(0x432)][_0x55847a(0x48e)](this,_0x50da66),VisuMZ[_0x55847a(0x431)][_0x55847a(0x37d)](_0x50da66),VisuMZ[_0x55847a(0x431)][_0x55847a(0x4a1)](_0x50da66);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x402)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x5e012b(0x402)]=function(_0x1a0d8f){const _0x4e56f8=_0x5e012b;VisuMZ[_0x4e56f8(0x431)]['ParseStateNotetags'][_0x4e56f8(0x48e)](this,_0x1a0d8f),VisuMZ[_0x4e56f8(0x431)][_0x4e56f8(0x445)](_0x1a0d8f),VisuMZ[_0x4e56f8(0x431)][_0x4e56f8(0x483)](_0x1a0d8f),VisuMZ[_0x4e56f8(0x431)][_0x4e56f8(0x424)](_0x1a0d8f),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x1a0d8f);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x37d)]=function(_0x41476f){const _0x4e69f5=_0x5e012b,_0x4832c5=_0x41476f['note'];if(_0x4832c5[_0x4e69f5(0x31c)](/<MP COST:[ ](\d+)>/i)){if('lIyIf'!==_0x4e69f5(0x288))_0x41476f['mpCost']=Number(RegExp['$1']);else{const _0x5ed8ca=this[_0x4e69f5(0x495)](this[_0x4e69f5(0x39b)]());let _0x5e753c=this[_0x4e69f5(0x456)](this['index']());_0x5e753c=_0x5e753c[_0x4e69f5(0x43d)](/\\I\[(\d+)\]/gi,''),_0x7c6e21[_0x4e69f5(0x3f5)](),this[_0x4e69f5(0x4ed)](_0x5e753c,_0x5ed8ca),this[_0x4e69f5(0x460)](_0x5e753c,_0x5ed8ca),this[_0x4e69f5(0x204)](_0x5e753c,_0x5ed8ca);}}_0x4832c5[_0x4e69f5(0x31c)](/<TP COST:[ ](\d+)>/i)&&(_0x41476f['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x32f)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x451)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x4a1)]=function(_0x572b41){const _0x763cda=_0x5e012b,_0xd439e1=_0x572b41[_0x763cda(0x37b)];if(_0xd439e1[_0x763cda(0x31c)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x3ae264=String(RegExp['$1']),_0x53e6c5=_0x763cda(0x3c7)['format'](_0x3ae264);VisuMZ[_0x763cda(0x431)][_0x763cda(0x32f)][_0x572b41['id']]=new Function(_0x763cda(0x40c),_0x53e6c5);}if(_0xd439e1[_0x763cda(0x31c)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x763cda(0x4f2)!=='FGCiv'){if(!_0x25e0c4[_0x763cda(0x3db)](_0x2c1b4a))return![];}else{const _0x1cfcfe=String(RegExp['$1']),_0x56818d=_0x763cda(0x381)[_0x763cda(0x39e)](_0x1cfcfe);VisuMZ[_0x763cda(0x431)]['skillVisibleJS'][_0x572b41['id']]=new Function(_0x763cda(0x40c),_0x56818d);}}},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x445)]=function(_0x43c37c){const _0x24b742=_0x5e012b;_0x43c37c[_0x24b742(0x1f3)]=[_0x24b742(0x23b),_0x24b742(0x2a4)];const _0x58362f=_0x43c37c['note'],_0x561f5f=_0x58362f['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x561f5f)for(const _0xc24279 of _0x561f5f){_0xc24279['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x10e66a=String(RegExp['$1'])[_0x24b742(0x2f0)]()['trim']()[_0x24b742(0x45e)](',');for(const _0x50f2bf of _0x10e66a){_0x43c37c['categories'][_0x24b742(0x3a8)](_0x50f2bf[_0x24b742(0x229)]());}}if(_0x58362f['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x1359df=RegExp['$1'][_0x24b742(0x45e)](/[\r\n]+/);for(const _0x3436f1 of _0x1359df){_0x43c37c[_0x24b742(0x1f3)][_0x24b742(0x3a8)](_0x3436f1[_0x24b742(0x2f0)]()['trim']());}}_0x58362f[_0x24b742(0x31c)](/<POSITIVE STATE>/i)&&_0x43c37c['categories']['push'](_0x24b742(0x3c8)),_0x58362f[_0x24b742(0x31c)](/<NEGATIVE STATE>/i)&&_0x43c37c[_0x24b742(0x1f3)][_0x24b742(0x3a8)](_0x24b742(0x4d3));},VisuMZ['SkillsStatesCore'][_0x5e012b(0x480)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x483)]=function(_0x44e74d){const _0x17292a=_0x5e012b,_0xad6ded=_0x44e74d[_0x17292a(0x37b)];if(_0xad6ded[_0x17292a(0x31c)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x1e265b=String(RegExp['$1']),_0x34702c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x1e265b);VisuMZ[_0x17292a(0x431)][_0x17292a(0x480)][_0x44e74d['id']]=new Function(_0x17292a(0x40f),_0x34702c);}},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x4fa)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3da)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3e2)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3d2)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3d9)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x4a0)]={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x424)]=function(_0x361ae3){const _0x34c0e8=_0x5e012b,_0x151b77=_0x361ae3[_0x34c0e8(0x37b)],_0x2188eb='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x151b77[_0x34c0e8(0x31c)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0x34c0e8(0x3d4)!==_0x34c0e8(0x3d4)){_0x305492['SkillsStatesCore'][_0x34c0e8(0x221)][_0x34c0e8(0x48e)](this);const _0x2fedf1=_0x412295[_0x34c0e8(0x431)][_0x34c0e8(0x2ac)]['PassiveStates'][_0x34c0e8(0x238)]??!![];if(!_0x2fedf1)return;if(_0x29775f[_0x34c0e8(0x42a)]())for(const _0x3a9ca8 of _0x426758[_0x34c0e8(0x23c)]()){if(_0x3a9ca8)_0x3a9ca8[_0x34c0e8(0x4cf)]();}}else{const _0x3d0abb=String(RegExp['$1']),_0xdc6b6d=_0x2188eb['format'](_0x3d0abb,_0x34c0e8(0x217),-0x1,'slipHp');VisuMZ[_0x34c0e8(0x431)]['stateHpSlipDamageJS'][_0x361ae3['id']]=new Function('stateId',_0xdc6b6d);}}else{if(_0x151b77['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if(_0x34c0e8(0x3ea)!==_0x34c0e8(0x2ef)){const _0x52b7eb=String(RegExp['$1']),_0x38d3c7=_0x2188eb[_0x34c0e8(0x39e)](_0x52b7eb,_0x34c0e8(0x27c),0x1,_0x34c0e8(0x22d));VisuMZ[_0x34c0e8(0x431)][_0x34c0e8(0x3da)][_0x361ae3['id']]=new Function(_0x34c0e8(0x4eb),_0x38d3c7);}else{if(!_0x4cd6af[_0x34c0e8(0x433)](_0x1702d6))return!![];}}}if(_0x151b77[_0x34c0e8(0x31c)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x34c0e8(0x263)==='UEGTT')return _0x88883c(_0x258feb['$1']);else{const _0x2e0ca3=String(RegExp['$1']),_0x38645b=_0x2188eb['format'](_0x2e0ca3,_0x34c0e8(0x217),-0x1,'slipMp');VisuMZ[_0x34c0e8(0x431)][_0x34c0e8(0x3e2)][_0x361ae3['id']]=new Function('stateId',_0x38645b);}}else{if(_0x151b77[_0x34c0e8(0x31c)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x34c0e8(0x3ca)===_0x34c0e8(0x3ca)){const _0x5daed=String(RegExp['$1']),_0x4f60b0=_0x2188eb['format'](_0x5daed,_0x34c0e8(0x27c),0x1,_0x34c0e8(0x52b));VisuMZ[_0x34c0e8(0x431)][_0x34c0e8(0x3d2)][_0x361ae3['id']]=new Function(_0x34c0e8(0x4eb),_0x4f60b0);}else{this['_stypeIDs']=this[_0x34c0e8(0x1ef)]||{};if(this[_0x34c0e8(0x1ef)][_0x5ad1ab['id']])return this[_0x34c0e8(0x1ef)][_0x209847['id']];this[_0x34c0e8(0x1ef)][_0x360796['id']]=[_0x3fc252[_0x34c0e8(0x28b)]];if(_0x30cf41['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33b070=_0x4280d5[_0x34c0e8(0x320)]('['+_0x435eb8['$1'][_0x34c0e8(0x31c)](/\d+/g)+']');this[_0x34c0e8(0x1ef)][_0x4af09b['id']]=this[_0x34c0e8(0x1ef)][_0x51bfa7['id']]['concat'](_0x33b070);}else{if(_0x35f070[_0x34c0e8(0x37b)][_0x34c0e8(0x31c)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0xdc4292=_0x29cb98['$1'][_0x34c0e8(0x45e)](',');for(const _0x194bad of _0xdc4292){const _0x4351fd=_0x3b1cf8[_0x34c0e8(0x444)](_0x194bad);if(_0x4351fd)this[_0x34c0e8(0x1ef)][_0x1c7159['id']]['push'](_0x4351fd);}}}return this[_0x34c0e8(0x1ef)][_0x472795['id']];}}}if(_0x151b77[_0x34c0e8(0x31c)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if('AWTZj'!==_0x34c0e8(0x484))_0x5d8cd2[_0x34c0e8(0x324)]=0x2;else{const _0x24b58f=String(RegExp['$1']),_0x2f74ec=_0x2188eb[_0x34c0e8(0x39e)](_0x24b58f,_0x34c0e8(0x217),-0x1,_0x34c0e8(0x298));VisuMZ['SkillsStatesCore'][_0x34c0e8(0x3d9)][_0x361ae3['id']]=new Function(_0x34c0e8(0x4eb),_0x2f74ec);}}else{if(_0x151b77[_0x34c0e8(0x31c)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x34c0e8(0x390)===_0x34c0e8(0x24d)){_0x148a52[_0x34c0e8(0x31c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x47ef96=_0x2fd74e[_0x34c0e8(0x43a)](_0x280870(_0xa13723['$1'])[_0x34c0e8(0x2f0)]()),_0x3d0389=_0x2eed82(_0x2427dc['$2']);_0x47ef96>=0x0&&(_0x1261dc['setDebuffTurns'](_0x47ef96,_0x3d0389),this[_0x34c0e8(0x4ee)](_0x48b218));}else{const _0x588bee=String(RegExp['$1']),_0x3be4f1=_0x2188eb[_0x34c0e8(0x39e)](_0x588bee,_0x34c0e8(0x27c),0x1,_0x34c0e8(0x298));VisuMZ['SkillsStatesCore'][_0x34c0e8(0x4a0)][_0x361ae3['id']]=new Function(_0x34c0e8(0x4eb),_0x3be4f1);}}}},VisuMZ['SkillsStatesCore']['stateAddJS']={},VisuMZ['SkillsStatesCore'][_0x5e012b(0x382)]={},VisuMZ[_0x5e012b(0x431)]['stateExpireJS']={},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3bb)]=function(_0x46dad8){const _0x44fe61=_0x5e012b,_0x5df0be=_0x46dad8['note'],_0x631d3c=_0x44fe61(0x353);if(_0x5df0be[_0x44fe61(0x31c)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if('wQDXR'!=='XlmKp'){const _0x3b6520=String(RegExp['$1']),_0x418fbf=_0x631d3c[_0x44fe61(0x39e)](_0x3b6520);VisuMZ[_0x44fe61(0x431)][_0x44fe61(0x325)][_0x46dad8['id']]=new Function(_0x44fe61(0x4eb),_0x418fbf);}else{if(this[_0x44fe61(0x4e6)]||this['_tempBattler'])return;try{_0x5f17cd[_0x44fe61(0x431)][_0x44fe61(0x2ac)]['States'][_0x44fe61(0x46d)][_0x44fe61(0x48e)](this,_0x4636e8);}catch(_0xe5ba53){if(_0x25619e[_0x44fe61(0x2a2)]())_0x2aa03c['log'](_0xe5ba53);}}}if(_0x5df0be['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x44fe61(0x416)===_0x44fe61(0x416)){const _0x4c2c16=String(RegExp['$1']),_0x2e6244=_0x631d3c[_0x44fe61(0x39e)](_0x4c2c16);VisuMZ[_0x44fe61(0x431)][_0x44fe61(0x382)][_0x46dad8['id']]=new Function(_0x44fe61(0x4eb),_0x2e6244);}else{if(_0x571ae2[_0x44fe61(0x2a2)]())_0x3e99ae['log'](_0xec8bdd);}}if(_0x5df0be[_0x44fe61(0x31c)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x44fe61(0x391)!==_0x44fe61(0x391)){const _0x17df7f=[];for(const _0x2552fc of this[_0x44fe61(0x336)]()[_0x44fe61(0x45c)]){const _0x3fed53=_0x154307[_0x2552fc['skillId']];if(_0x3fed53&&!_0x17df7f[_0x44fe61(0x2c6)](_0x3fed53))_0x17df7f[_0x44fe61(0x3a8)](_0x3fed53);}return _0x17df7f;}else{const _0x4f7eee=String(RegExp['$1']),_0x18d1ba=_0x631d3c['format'](_0x4f7eee);VisuMZ[_0x44fe61(0x431)][_0x44fe61(0x529)][_0x46dad8['id']]=new Function('stateId',_0x18d1ba);}}},VisuMZ['SkillsStatesCore'][_0x5e012b(0x23d)]=function(){const _0x297a33=_0x5e012b;if(!VisuMZ[_0x297a33(0x431)][_0x297a33(0x2ac)][_0x297a33(0x2a5)][_0x297a33(0x4a9)])return;for(const _0x2b5ebb of $dataStates){if(_0x297a33(0x452)==='ZlarT'){if(!_0x2b5ebb)continue;_0x2b5ebb['restriction']===0x4&&_0x2b5ebb['autoRemovalTiming']===0x1&&(_0x2b5ebb[_0x297a33(0x324)]=0x2);}else _0x2abaaa[_0x297a33(0x431)][_0x297a33(0x269)][_0x297a33(0x48e)](this,_0x3e1309),this[_0x297a33(0x4e4)]();}},DataManager[_0x5e012b(0x2e7)]=function(_0x108c3e){const _0x545e73=_0x5e012b;_0x108c3e=_0x108c3e[_0x545e73(0x2f0)]()[_0x545e73(0x229)](),this[_0x545e73(0x215)]=this[_0x545e73(0x215)]||{};if(this[_0x545e73(0x215)][_0x108c3e])return this[_0x545e73(0x215)][_0x108c3e];for(const _0x2e8a0e of $dataClasses){if(!_0x2e8a0e)continue;let _0x411f48=_0x2e8a0e[_0x545e73(0x3a5)];_0x411f48=_0x411f48[_0x545e73(0x43d)](/\x1I\[(\d+)\]/gi,''),_0x411f48=_0x411f48[_0x545e73(0x43d)](/\\I\[(\d+)\]/gi,''),this[_0x545e73(0x215)][_0x411f48['toUpperCase']()['trim']()]=_0x2e8a0e['id'];}return this['_classIDs'][_0x108c3e]||0x0;},DataManager[_0x5e012b(0x23a)]=function(_0x4b5aaa){const _0x40e1b3=_0x5e012b;this[_0x40e1b3(0x1ef)]=this[_0x40e1b3(0x1ef)]||{};if(this['_stypeIDs'][_0x4b5aaa['id']])return this[_0x40e1b3(0x1ef)][_0x4b5aaa['id']];this[_0x40e1b3(0x1ef)][_0x4b5aaa['id']]=[_0x4b5aaa[_0x40e1b3(0x28b)]];if(_0x4b5aaa['note'][_0x40e1b3(0x31c)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x599651=JSON[_0x40e1b3(0x320)]('['+RegExp['$1'][_0x40e1b3(0x31c)](/\d+/g)+']');this['_stypeIDs'][_0x4b5aaa['id']]=this[_0x40e1b3(0x1ef)][_0x4b5aaa['id']][_0x40e1b3(0x294)](_0x599651);}else{if(_0x4b5aaa[_0x40e1b3(0x37b)][_0x40e1b3(0x31c)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x40e1b3(0x2d5)!==_0x40e1b3(0x2fb)){const _0x4784d0=RegExp['$1'][_0x40e1b3(0x45e)](',');for(const _0x4f57e7 of _0x4784d0){const _0x5ac2e4=DataManager['getStypeIdWithName'](_0x4f57e7);if(_0x5ac2e4)this[_0x40e1b3(0x1ef)][_0x4b5aaa['id']][_0x40e1b3(0x3a8)](_0x5ac2e4);}}else this[_0x40e1b3(0x450)](_0x547321)&&(_0x3c526f+=this[_0x40e1b3(0x222)](_0x5f230b),this[_0x40e1b3(0x2cf)](_0x523a55,_0x3a8dba));}}return this['_stypeIDs'][_0x4b5aaa['id']];},DataManager[_0x5e012b(0x444)]=function(_0xf33b07){const _0x478de8=_0x5e012b;_0xf33b07=_0xf33b07[_0x478de8(0x2f0)]()[_0x478de8(0x229)](),this['_stypeIDs']=this[_0x478de8(0x1ef)]||{};if(this['_stypeIDs'][_0xf33b07])return this[_0x478de8(0x1ef)][_0xf33b07];for(let _0x4bcaa0=0x1;_0x4bcaa0<0x64;_0x4bcaa0++){if(_0x478de8(0x2db)!==_0x478de8(0x2db))this[_0x478de8(0x2bd)](_0x478de8(0x248)),_0x321982[_0x478de8(0x431)]['Game_BattlerBase_recoverAll']['call'](this),this[_0x478de8(0x3f8)]();else{if(!$dataSystem[_0x478de8(0x42b)][_0x4bcaa0])continue;let _0x4cf303=$dataSystem[_0x478de8(0x42b)][_0x4bcaa0][_0x478de8(0x2f0)]()[_0x478de8(0x229)]();_0x4cf303=_0x4cf303[_0x478de8(0x43d)](/\x1I\[(\d+)\]/gi,''),_0x4cf303=_0x4cf303[_0x478de8(0x43d)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x4cf303]=_0x4bcaa0;}}return this[_0x478de8(0x1ef)][_0xf33b07]||0x0;},DataManager[_0x5e012b(0x272)]=function(_0x1e197f){const _0x4dc3b3=_0x5e012b;_0x1e197f=_0x1e197f[_0x4dc3b3(0x2f0)]()[_0x4dc3b3(0x229)](),this[_0x4dc3b3(0x341)]=this['_skillIDs']||{};if(this['_skillIDs'][_0x1e197f])return this[_0x4dc3b3(0x341)][_0x1e197f];for(const _0x58ca72 of $dataSkills){if(!_0x58ca72)continue;this[_0x4dc3b3(0x341)][_0x58ca72[_0x4dc3b3(0x3a5)][_0x4dc3b3(0x2f0)]()[_0x4dc3b3(0x229)]()]=_0x58ca72['id'];}return this[_0x4dc3b3(0x341)][_0x1e197f]||0x0;},DataManager[_0x5e012b(0x4e5)]=function(_0x15694d){const _0x23a269=_0x5e012b;_0x15694d=_0x15694d[_0x23a269(0x2f0)]()['trim'](),this[_0x23a269(0x2a9)]=this['_stateIDs']||{};if(this['_stateIDs'][_0x15694d])return this[_0x23a269(0x2a9)][_0x15694d];for(const _0x312e07 of $dataStates){if(_0x23a269(0x342)!=='jAgXh'){if(!_0x312e07)continue;this[_0x23a269(0x2a9)][_0x312e07['name'][_0x23a269(0x2f0)]()['trim']()]=_0x312e07['id'];}else{const _0x57f4e4=_0x178640['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x57f4e4)for(const _0x2bbb4b of _0x57f4e4){_0x2bbb4b[_0x23a269(0x31c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x19162e=_0xd266ed(_0x2a1882['$1']);_0x5125bc[_0x23a269(0x27d)](_0x19162e);}}}return this[_0x23a269(0x2a9)][_0x15694d]||0x0;},DataManager[_0x5e012b(0x3e8)]=function(_0x54ad52){const _0xf43ea0=_0x5e012b;this['_stateMaxTurns']=this[_0xf43ea0(0x21e)]||{};if(this['_stateMaxTurns'][_0x54ad52])return this[_0xf43ea0(0x21e)][_0x54ad52];return $dataStates[_0x54ad52][_0xf43ea0(0x37b)]['match'](/<MAX TURNS:[ ](\d+)>/i)?this[_0xf43ea0(0x21e)][_0x54ad52]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x54ad52]=VisuMZ[_0xf43ea0(0x431)]['Settings'][_0xf43ea0(0x2a5)][_0xf43ea0(0x339)],this['_stateMaxTurns'][_0x54ad52];},ColorManager[_0x5e012b(0x35a)]=function(_0x37555f,_0xf86bb7){const _0x1222eb=_0x5e012b;return _0xf86bb7=String(_0xf86bb7),this['_colorCache']=this['_colorCache']||{},_0xf86bb7[_0x1222eb(0x31c)](/#(.*)/i)?this['_colorCache'][_0x37555f]='#%1'[_0x1222eb(0x39e)](String(RegExp['$1'])):this['_colorCache'][_0x37555f]=this[_0x1222eb(0x410)](Number(_0xf86bb7)),this[_0x1222eb(0x2c9)][_0x37555f];},ColorManager['getColor']=function(_0x3f07f0){const _0x5b3db8=_0x5e012b;return _0x3f07f0=String(_0x3f07f0),_0x3f07f0[_0x5b3db8(0x31c)](/#(.*)/i)?'#%1'['format'](String(RegExp['$1'])):this['textColor'](Number(_0x3f07f0));},ColorManager[_0x5e012b(0x50d)]=function(_0x41686d){const _0x21001c=_0x5e012b;if(typeof _0x41686d===_0x21001c(0x279))_0x41686d=$dataStates[_0x41686d];const _0x32df1e=_0x21001c(0x2fd)[_0x21001c(0x39e)](_0x41686d['id']);this[_0x21001c(0x2c9)]=this[_0x21001c(0x2c9)]||{};if(this['_colorCache'][_0x32df1e])return this[_0x21001c(0x2c9)][_0x32df1e];const _0x4baab9=this[_0x21001c(0x36b)](_0x41686d);return this['getColorDataFromPluginParameters'](_0x32df1e,_0x4baab9);},ColorManager['retrieveStateColor']=function(_0x56d922){const _0x3a4412=_0x5e012b,_0x3d509a=_0x56d922['note'];if(_0x3d509a[_0x3a4412(0x31c)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3d509a[_0x3a4412(0x31c)](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x3a4412(0x2ac)]['States']['ColorPositive'];else{if(_0x3d509a[_0x3a4412(0x31c)](/<NEGATIVE STATE>/i))return VisuMZ[_0x3a4412(0x431)][_0x3a4412(0x2ac)]['States'][_0x3a4412(0x4a2)];else{if(_0x3a4412(0x4c6)!==_0x3a4412(0x207))return VisuMZ[_0x3a4412(0x431)][_0x3a4412(0x2ac)][_0x3a4412(0x2a5)][_0x3a4412(0x3cc)];else{const _0x1dffad=this['getStateRetainType']();if(_0x1dffad!==''){const _0x45d6a5=_0x333e56['note'];if(_0x1dffad===_0x3a4412(0x384)&&_0x45d6a5[_0x3a4412(0x31c)](/<NO DEATH CLEAR>/i))return![];if(_0x1dffad===_0x3a4412(0x248)&&_0x45d6a5['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x3a4412(0x302)](_0x2e992f['id']);}}}}},ColorManager[_0x5e012b(0x322)]=function(){const _0x2d1f12=_0x5e012b,_0x5b6e85='_stored_buffColor';this[_0x2d1f12(0x2c9)]=this['_colorCache']||{};if(this[_0x2d1f12(0x2c9)][_0x5b6e85])return this[_0x2d1f12(0x2c9)][_0x5b6e85];const _0xae61a5=VisuMZ[_0x2d1f12(0x431)][_0x2d1f12(0x2ac)][_0x2d1f12(0x35d)][_0x2d1f12(0x259)];return this[_0x2d1f12(0x35a)](_0x5b6e85,_0xae61a5);},ColorManager[_0x5e012b(0x4ea)]=function(){const _0x1227f3=_0x5e012b,_0x5880c9='_stored_debuffColor';this['_colorCache']=this[_0x1227f3(0x2c9)]||{};if(this[_0x1227f3(0x2c9)][_0x5880c9])return this[_0x1227f3(0x2c9)][_0x5880c9];const _0x1c3833=VisuMZ[_0x1227f3(0x431)]['Settings'][_0x1227f3(0x35d)][_0x1227f3(0x3e5)];return this[_0x1227f3(0x35a)](_0x5880c9,_0x1c3833);},SceneManager[_0x5e012b(0x42a)]=function(){const _0x5a7627=_0x5e012b;return this[_0x5a7627(0x250)]&&this[_0x5a7627(0x250)][_0x5a7627(0x293)]===Scene_Battle;},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x348)]=BattleManager['endAction'],BattleManager[_0x5e012b(0x40e)]=function(){const _0x5774ec=_0x5e012b;this[_0x5774ec(0x318)](),VisuMZ['SkillsStatesCore'][_0x5774ec(0x348)][_0x5774ec(0x48e)](this);},BattleManager[_0x5e012b(0x318)]=function(){const _0x43f363=_0x5e012b,_0x1095ed=VisuMZ['SkillsStatesCore'][_0x43f363(0x2ac)][_0x43f363(0x2a5)];if(!_0x1095ed)return;if(_0x1095ed[_0x43f363(0x4a9)]===![])return;if(!this['_subject'])return;this[_0x43f363(0x220)]['updateStatesActionEnd']();},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x318)]=function(){const _0x543e07=_0x5e012b;if(BattleManager[_0x543e07(0x209)]!==_0x543e07(0x437))return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x543e07(0x47a)])return;this[_0x543e07(0x39a)]=Graphics[_0x543e07(0x47a)];for(const _0x4ec55d of this[_0x543e07(0x4ff)]){if(_0x543e07(0x206)!==_0x543e07(0x519)){const _0x438cc5=$dataStates[_0x4ec55d];if(!_0x438cc5)continue;if(_0x438cc5[_0x543e07(0x324)]!==0x1)continue;if(this[_0x543e07(0x2f7)][_0x4ec55d]>0x0){if(_0x543e07(0x245)!=='kaoEC')this[_0x543e07(0x2f7)][_0x4ec55d]--;else for(const _0x84714c of _0x3bf3ee){_0x84714c['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5b932=_0x4c362d(_0x256e09['$1']),_0x271cab=_0x1e8058(_0x59565e['$2']);_0x32a20a[_0x543e07(0x4d6)](_0x5b932,_0x271cab);}}}else this['setStateOrigin'](_0x4efc84),this[_0x543e07(0x4f7)](_0x4ca06f),this[_0x543e07(0x1fa)](_0x3cd4bc),this[_0x543e07(0x300)](_0x39a4d6),this[_0x543e07(0x4cc)](_0x5ed071);}this[_0x543e07(0x20a)](0x1);},Game_BattlerBase['prototype'][_0x5e012b(0x4c8)]=function(){const _0x29c1f4=_0x5e012b,_0x3110ef=VisuMZ['SkillsStatesCore'][_0x29c1f4(0x2ac)][_0x29c1f4(0x2a5)];for(const _0x19a207 of this[_0x29c1f4(0x4ff)]){const _0x2a80dc=$dataStates[_0x19a207];if(_0x3110ef&&_0x3110ef[_0x29c1f4(0x4a9)]!==![]){if(_0x29c1f4(0x42f)===_0x29c1f4(0x3c0))_0x277974+=this[_0x29c1f4(0x222)](_0x2fad73),this[_0x29c1f4(0x2cf)](_0x42d265,_0x20168c);else{if(_0x2a80dc&&_0x2a80dc[_0x29c1f4(0x324)]===0x1)continue;}}if(this['_stateTurns'][_0x19a207]>0x0){if(_0x29c1f4(0x428)!==_0x29c1f4(0x428)){this[_0x29c1f4(0x241)]=!![];let _0xdaf2bb=_0x440b2b['SkillsStatesCore'][_0x29c1f4(0x479)][_0x29c1f4(0x48e)](this,_0x888296);return this[_0x29c1f4(0x241)]=_0x4f7ac1,_0xdaf2bb;}else this['_stateTurns'][_0x19a207]--;}}},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x221)]=Game_Switches[_0x5e012b(0x2ea)][_0x5e012b(0x34a)],Game_Switches[_0x5e012b(0x2ea)][_0x5e012b(0x34a)]=function(){const _0x2d146c=_0x5e012b;VisuMZ['SkillsStatesCore'][_0x2d146c(0x221)][_0x2d146c(0x48e)](this);const _0x2b2267=VisuMZ[_0x2d146c(0x431)][_0x2d146c(0x2ac)][_0x2d146c(0x363)][_0x2d146c(0x238)]??!![];if(!_0x2b2267)return;if(SceneManager[_0x2d146c(0x42a)]()){if(_0x2d146c(0x2c2)==='AisNd')for(const _0x40e3df of BattleManager[_0x2d146c(0x23c)]()){if(_0x40e3df)_0x40e3df['refresh']();}else{const _0x334d64=_0x1b29e7[_0x2d146c(0x320)]('['+_0x3e6780['$1']['match'](/\d+/g)+']');for(const _0x3c30b5 of _0x334d64){if(!_0x33529f[_0x2d146c(0x533)](_0x3c30b5))return![];}return!![];}}},VisuMZ['SkillsStatesCore'][_0x5e012b(0x33b)]=Game_Variables[_0x5e012b(0x2ea)][_0x5e012b(0x34a)],Game_Variables[_0x5e012b(0x2ea)][_0x5e012b(0x34a)]=function(){const _0x577c65=_0x5e012b;VisuMZ[_0x577c65(0x431)][_0x577c65(0x33b)][_0x577c65(0x48e)](this);const _0x28221c=VisuMZ['SkillsStatesCore'][_0x577c65(0x2ac)]['PassiveStates'][_0x577c65(0x4bf)]??!![];if(!_0x28221c)return;if(SceneManager['isSceneBattle']())for(const _0x5105b2 of BattleManager[_0x577c65(0x23c)]()){if(_0x5105b2)_0x5105b2[_0x577c65(0x4cf)]();}},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x44e)]=Game_Action[_0x5e012b(0x2ea)]['applyItemUserEffect'],Game_Action[_0x5e012b(0x2ea)][_0x5e012b(0x422)]=function(_0x578643){const _0x55bae4=_0x5e012b;VisuMZ['SkillsStatesCore'][_0x55bae4(0x44e)][_0x55bae4(0x48e)](this,_0x578643),this[_0x55bae4(0x49a)](_0x578643);},Game_Action[_0x5e012b(0x2ea)][_0x5e012b(0x49a)]=function(_0x35b5d0){const _0xfc8a97=_0x5e012b;this[_0xfc8a97(0x4bb)](_0x35b5d0),this['applyStateTurnManipulationEffects'](_0x35b5d0),this[_0xfc8a97(0x4b4)](_0x35b5d0),this['applyDebuffTurnManipulationEffects'](_0x35b5d0);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x44b)]=Game_Action[_0x5e012b(0x2ea)][_0x5e012b(0x3d7)],Game_Action[_0x5e012b(0x2ea)][_0x5e012b(0x3d7)]=function(_0x144d34){const _0x11c16b=_0x5e012b;if(this[_0x11c16b(0x47b)](_0x144d34))return!![];return VisuMZ[_0x11c16b(0x431)][_0x11c16b(0x44b)][_0x11c16b(0x48e)](this,_0x144d34);},Game_Action[_0x5e012b(0x2ea)]['testSkillStatesCoreNotetags']=function(_0x7158d3){const _0x30bdd1=_0x5e012b;if(!this['item']())return;const _0x4d276d=this[_0x30bdd1(0x387)]()[_0x30bdd1(0x37b)];if(_0x4d276d[_0x30bdd1(0x31c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x30bdd1(0x51a)!==_0x30bdd1(0x276)){const _0x4aaadc=String(RegExp['$1']);if(_0x7158d3[_0x30bdd1(0x3f7)](_0x4aaadc))return!![];}else return _0x434cb4[_0x30bdd1(0x29b)]&&_0x21aa68['description']['includes']('['+_0x10b2c1+']');}if(_0x4d276d[_0x30bdd1(0x31c)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x30bdd1(0x251)!==_0x30bdd1(0x3ef)){const _0x3b41aa=Number(RegExp['$1']);if(_0x7158d3[_0x30bdd1(0x302)](_0x3b41aa))return!![];}else this[_0x30bdd1(0x46e)](_0x56dd7d),this['clearStateDisplay'](_0x4c1b80),this[_0x30bdd1(0x535)](_0x2cebe6);}else{if(_0x4d276d[_0x30bdd1(0x31c)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x2e9c4a=DataManager[_0x30bdd1(0x4e5)](RegExp['$1']);if(_0x7158d3[_0x30bdd1(0x302)](_0x2e9c4a))return!![];}}return![];},Game_Action['prototype']['applyStateCategoryRemovalEffects']=function(_0x2abf36){const _0x4af936=_0x5e012b;if(_0x2abf36[_0x4af936(0x3b3)]()[_0x4af936(0x2dc)]<=0x0)return;const _0x8c47a8=this[_0x4af936(0x387)]()['note'];{if(_0x4af936(0x36e)==='fNgTx'){const _0x12a52e=_0x8c47a8['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x12a52e){if('SVTsE'===_0x4af936(0x29e)){const _0xd0cde2=this[_0x4af936(0x48c)]();this[_0x4af936(0x274)]=new _0x49f651(_0xd0cde2),this[_0x4af936(0x265)](this['_shopStatusWindow']),this[_0x4af936(0x4f6)][_0x4af936(0x201)](this[_0x4af936(0x274)]);const _0x81f6d3=_0x246278[_0x4af936(0x431)][_0x4af936(0x2ac)][_0x4af936(0x46b)][_0x4af936(0x237)];this[_0x4af936(0x274)][_0x4af936(0x2b0)](_0x81f6d3||0x0);}else for(const _0x592729 of _0x12a52e){if(_0x4af936(0x200)===_0x4af936(0x200)){_0x592729[_0x4af936(0x31c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x26f2f4=String(RegExp['$1']);_0x2abf36[_0x4af936(0x27d)](_0x26f2f4);}else this[_0x4af936(0x21e)][_0x167e9f]=_0x3d424e[_0x4af936(0x431)][_0x4af936(0x2ac)]['States'][_0x4af936(0x339)];}}}else{const _0x5c422a=_0x5ba5cc[_0x4af936(0x37b)];if(_0x5c422a['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x3abf05=_0x53a132(_0x1f894f['$1']),_0x113ccd=_0x4af936(0x386)['format'](_0x3abf05);_0x4c090a[_0x4af936(0x431)][_0x4af936(0x480)][_0x649de3['id']]=new _0x290543(_0x4af936(0x40f),_0x113ccd);}}}{if(_0x4af936(0x20d)!=='KMSja'){const _0x31b0ef=_0x8c47a8[_0x4af936(0x31c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x31b0ef){if(_0x4af936(0x40d)!=='zGEth')for(const _0x59829f of _0x31b0ef){_0x59829f[_0x4af936(0x31c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x509347=String(RegExp['$1']),_0x521f82=Number(RegExp['$2']);_0x2abf36[_0x4af936(0x4d6)](_0x509347,_0x521f82);}else{if(typeof _0x4d06c4!==_0x4af936(0x279))_0x2cf0de=_0x4ed311['id'];return this[_0x4af936(0x4be)]=this[_0x4af936(0x4be)]||{},this[_0x4af936(0x4be)][_0x2235ad]===_0x372a63&&(this['_stateDisplay'][_0x47d3ea]=''),this['_stateDisplay'][_0x6a1374];}}}else{if(_0x4d145b[_0x4af936(0x433)](_0x97b2ba))return!![];}}},Game_Action['prototype'][_0x5e012b(0x268)]=function(_0x2d8b41){const _0x4f6cb6=_0x5e012b,_0x4da675=this[_0x4f6cb6(0x387)]()[_0x4f6cb6(0x37b)],_0x48f005=_0x4da675[_0x4f6cb6(0x31c)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x48f005){if(_0x4f6cb6(0x36d)===_0x4f6cb6(0x36d))for(const _0x51809b of _0x48f005){let _0x2d1568=0x0,_0x121f89=0x0;if(_0x51809b[_0x4f6cb6(0x31c)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2d1568=Number(RegExp['$1']),_0x121f89=Number(RegExp['$2']);else _0x51809b['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2d1568=DataManager[_0x4f6cb6(0x4e5)](RegExp['$1']),_0x121f89=Number(RegExp['$2']));_0x2d8b41[_0x4f6cb6(0x2cf)](_0x2d1568,_0x121f89),this[_0x4f6cb6(0x4ee)](_0x2d8b41);}else return _0x5e7648[_0x4f6cb6(0x504)]();}const _0x19863e=_0x4da675[_0x4f6cb6(0x31c)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x19863e)for(const _0x56d3ed of _0x19863e){if(_0x4f6cb6(0x231)==='wRsvc')for(const _0x352159 of this[_0x4f6cb6(0x3b3)]()){this[_0x4f6cb6(0x3a2)](_0x352159['id'])&&_0x352159[_0x4f6cb6(0x324)]===_0x4b1952&&(this['removeState'](_0x352159['id']),this['onExpireState'](_0x352159['id']),this[_0x4f6cb6(0x3f1)](_0x352159['id']));}else{let _0x4db2f5=0x0,_0x5c098c=0x0;if(_0x56d3ed['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x4f6cb6(0x228)!==_0x4f6cb6(0x463))_0x4db2f5=Number(RegExp['$1']),_0x5c098c=Number(RegExp['$2']);else return this['_battler']&&this[_0x4f6cb6(0x230)]?this['currentValueSkillsStatesCore']():_0x1784ad[_0x4f6cb6(0x431)]['Sprite_Gauge_currentValue'][_0x4f6cb6(0x48e)](this);}else _0x56d3ed[_0x4f6cb6(0x31c)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x4db2f5=DataManager[_0x4f6cb6(0x4e5)](RegExp['$1']),_0x5c098c=Number(RegExp['$2']));_0x2d8b41[_0x4f6cb6(0x313)](_0x4db2f5,_0x5c098c),this[_0x4f6cb6(0x4ee)](_0x2d8b41);}}},Game_Action[_0x5e012b(0x2ea)][_0x5e012b(0x4b4)]=function(_0xfff2c){const _0x1a49ca=_0x5e012b,_0x479f70=[_0x1a49ca(0x419),_0x1a49ca(0x367),_0x1a49ca(0x499),_0x1a49ca(0x2f2),_0x1a49ca(0x378),_0x1a49ca(0x208),_0x1a49ca(0x2f1),_0x1a49ca(0x24c)],_0x566170=this[_0x1a49ca(0x387)]()['note'],_0x24e1d1=_0x566170[_0x1a49ca(0x31c)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x24e1d1){if(_0x1a49ca(0x33a)!==_0x1a49ca(0x33a)){const _0x2297c9=this[_0x1a49ca(0x3bc)][_0x1a49ca(0x2a3)]||0x0;this[_0x1a49ca(0x467)](_0x4796ae),this[_0x1a49ca(0x3bc)]['hpDamage']+=_0x2297c9;}else for(const _0x157bfc of _0x24e1d1){_0x157bfc['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x31354e=_0x479f70[_0x1a49ca(0x43a)](String(RegExp['$1'])[_0x1a49ca(0x2f0)]()),_0x1d79d9=Number(RegExp['$2']);_0x31354e>=0x0&&(_0xfff2c[_0x1a49ca(0x531)](_0x31354e,_0x1d79d9),this[_0x1a49ca(0x4ee)](_0xfff2c));}}const _0x5b2d91=_0x566170[_0x1a49ca(0x31c)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x5b2d91)for(const _0x150f2a of _0x24e1d1){if(_0x1a49ca(0x255)==='LDgVd'){const _0x4bb2f7=_0x2dbdc4['parse']('['+_0x46a192['$1']['match'](/\d+/g)+']');for(const _0x42e227 of _0x4bb2f7){if(_0x2523a1[_0x1a49ca(0x533)](_0x42e227))return![];}return!![];}else{_0x150f2a[_0x1a49ca(0x31c)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x22402a=_0x479f70['indexOf'](String(RegExp['$1'])[_0x1a49ca(0x2f0)]()),_0x28d928=Number(RegExp['$2']);if(_0x22402a>=0x0){if(_0x1a49ca(0x2be)==='keFSI'){const _0x43831d=_0x1d8dc8[_0x1a49ca(0x320)]('['+_0x28e297['$1'][_0x1a49ca(0x31c)](/\d+/g)+']');for(const _0x24d0d7 of _0x43831d){if(!_0x24e3f8[_0x1a49ca(0x3db)](_0x24d0d7))return![];}return!![];}else _0xfff2c['addBuffTurns'](_0x22402a,_0x28d928),this[_0x1a49ca(0x4ee)](_0xfff2c);}}}},Game_Action['prototype'][_0x5e012b(0x2ba)]=function(_0x2d7bf9){const _0x568259=_0x5e012b,_0x57133c=[_0x568259(0x419),_0x568259(0x367),_0x568259(0x499),_0x568259(0x2f2),_0x568259(0x378),'MDF',_0x568259(0x2f1),_0x568259(0x24c)],_0x350903=this['item']()[_0x568259(0x37b)],_0x169f27=_0x350903[_0x568259(0x31c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x169f27)for(const _0x40bfa5 of _0x169f27){_0x40bfa5[_0x568259(0x31c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x24b51b=_0x57133c[_0x568259(0x43a)](String(RegExp['$1'])[_0x568259(0x2f0)]()),_0x528566=Number(RegExp['$2']);if(_0x24b51b>=0x0){if('IJFcj'!=='dqAZC')_0x2d7bf9[_0x568259(0x464)](_0x24b51b,_0x528566),this[_0x568259(0x4ee)](_0x2d7bf9);else{_0x55ce8c[_0x568259(0x31c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x2f819d=_0x9c4d2(_0x2d0bf8['$1']);_0xe64b4[_0x568259(0x27d)](_0x2f819d);}}}const _0x423a82=_0x350903['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x423a82)for(const _0x184989 of _0x169f27){_0x184989['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x13ee66=_0x57133c[_0x568259(0x43a)](String(RegExp['$1'])[_0x568259(0x2f0)]()),_0x4c63a0=Number(RegExp['$2']);_0x13ee66>=0x0&&(_0x2d7bf9[_0x568259(0x408)](_0x13ee66,_0x4c63a0),this[_0x568259(0x4ee)](_0x2d7bf9));}},VisuMZ[_0x5e012b(0x431)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x5e012b(0x2ea)]['initMembers'],Game_BattlerBase['prototype']['initMembers']=function(){const _0x5a27e8=_0x5e012b;this[_0x5a27e8(0x3a6)]={},this[_0x5a27e8(0x420)](),VisuMZ[_0x5a27e8(0x431)][_0x5a27e8(0x260)][_0x5a27e8(0x48e)](this);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x420)]=function(){const _0x34a572=_0x5e012b;this[_0x34a572(0x4a8)]='',this[_0x34a572(0x312)]={},this[_0x34a572(0x4be)]={},this[_0x34a572(0x4ce)]={};},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x2fc)]=function(_0x229e81){const _0x93e130=_0x5e012b;return this[_0x93e130(0x3a6)]=this[_0x93e130(0x3a6)]||{},this[_0x93e130(0x3a6)][_0x229e81]!==undefined;},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x47d)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x4cf)],Game_BattlerBase[_0x5e012b(0x2ea)]['refresh']=function(){const _0x5c4be0=_0x5e012b;this[_0x5c4be0(0x3a6)]={},VisuMZ[_0x5c4be0(0x431)][_0x5c4be0(0x47d)]['call'](this);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3c3)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3ee)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3ee)]=function(_0x5056a5){const _0x20f6a2=_0x5e012b;let _0x37a922=this['isStateAffected'](_0x5056a5);VisuMZ[_0x20f6a2(0x431)][_0x20f6a2(0x3c3)][_0x20f6a2(0x48e)](this,_0x5056a5);if(_0x37a922&&!this[_0x20f6a2(0x302)](_0x5056a5))this[_0x20f6a2(0x3a4)](_0x5056a5);},Game_BattlerBase['prototype'][_0x5e012b(0x3a4)]=function(_0x1709f7){const _0x2be79e=_0x5e012b;this['clearStateData'](_0x1709f7),this[_0x2be79e(0x20f)](_0x1709f7),this[_0x2be79e(0x535)](_0x1709f7);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x2e1)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x51e)],Game_BattlerBase['prototype'][_0x5e012b(0x51e)]=function(_0x1746ee){const _0x16ebd8=_0x5e012b,_0x4463bc=$dataStates[_0x1746ee],_0x385111=this[_0x16ebd8(0x423)](_0x1746ee),_0x3c5001=this['getStateReapplyRulings'](_0x4463bc)[_0x16ebd8(0x43c)]()[_0x16ebd8(0x229)]();switch(_0x3c5001){case'ignore':if(_0x385111<=0x0)VisuMZ[_0x16ebd8(0x431)][_0x16ebd8(0x2e1)][_0x16ebd8(0x48e)](this,_0x1746ee);break;case _0x16ebd8(0x2f6):VisuMZ[_0x16ebd8(0x431)][_0x16ebd8(0x2e1)][_0x16ebd8(0x48e)](this,_0x1746ee);break;case _0x16ebd8(0x44f):VisuMZ['SkillsStatesCore'][_0x16ebd8(0x2e1)][_0x16ebd8(0x48e)](this,_0x1746ee),this[_0x16ebd8(0x2f7)][_0x1746ee]=Math[_0x16ebd8(0x440)](this[_0x16ebd8(0x2f7)][_0x1746ee],_0x385111);break;case _0x16ebd8(0x534):VisuMZ[_0x16ebd8(0x431)]['Game_BattlerBase_resetStateCounts'][_0x16ebd8(0x48e)](this,_0x1746ee),this[_0x16ebd8(0x2f7)][_0x1746ee]+=_0x385111;break;default:VisuMZ[_0x16ebd8(0x431)][_0x16ebd8(0x2e1)]['call'](this,_0x1746ee);break;}},Game_BattlerBase[_0x5e012b(0x2ea)]['getStateReapplyRulings']=function(_0x3d84f0){const _0x2cb7b6=_0x5e012b,_0x1e5c5b=_0x3d84f0['note'];return _0x1e5c5b[_0x2cb7b6(0x31c)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x2cb7b6(0x431)][_0x2cb7b6(0x2ac)][_0x2cb7b6(0x2a5)]['ReapplyRules'];},VisuMZ['SkillsStatesCore'][_0x5e012b(0x34f)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x36a)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x36a)]=function(_0x12ff07,_0x4866cf){const _0x300acb=_0x5e012b,_0x27d894=VisuMZ['SkillsStatesCore'][_0x300acb(0x2ac)][_0x300acb(0x35d)][_0x300acb(0x4a6)],_0x40c165=this[_0x300acb(0x222)](_0x12ff07);switch(_0x27d894){case _0x300acb(0x414):if(_0x40c165<=0x0)this[_0x300acb(0x512)][_0x12ff07]=_0x4866cf;break;case'reset':this[_0x300acb(0x512)][_0x12ff07]=_0x4866cf;break;case _0x300acb(0x44f):this[_0x300acb(0x512)][_0x12ff07]=Math[_0x300acb(0x440)](_0x40c165,_0x4866cf);break;case _0x300acb(0x534):this[_0x300acb(0x512)][_0x12ff07]+=_0x4866cf;break;default:VisuMZ[_0x300acb(0x431)]['Game_BattlerBase_overwriteBuffTurns']['call'](this,_0x12ff07,_0x4866cf);break;}const _0x32b7c4=VisuMZ[_0x300acb(0x431)][_0x300acb(0x2ac)][_0x300acb(0x35d)][_0x300acb(0x339)];this[_0x300acb(0x512)][_0x12ff07]=this[_0x300acb(0x512)][_0x12ff07][_0x300acb(0x441)](0x0,_0x32b7c4);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x522)]=function(){const _0xcc9d7b=_0x5e012b;if(this[_0xcc9d7b(0x3a6)][_0xcc9d7b(0x502)]!==undefined)return this[_0xcc9d7b(0x3a6)][_0xcc9d7b(0x502)];this[_0xcc9d7b(0x3a6)]['groupDefeat']=![];const _0x5f2de4=this['states']();for(const _0x16c245 of _0x5f2de4){if(!_0x16c245)continue;if(_0x16c245[_0xcc9d7b(0x37b)][_0xcc9d7b(0x31c)](/<GROUP DEFEAT>/i)){this[_0xcc9d7b(0x3a6)][_0xcc9d7b(0x502)]=!![];break;}}return this['_cache'][_0xcc9d7b(0x502)];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x366)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x40a)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x40a)]=function(){const _0x1c3c42=_0x5e012b;this[_0x1c3c42(0x25d)]()!==''?this['clearStatesWithStateRetain']():'BDcPD'==='RdlNx'?(this[_0x1c3c42(0x515)]=this[_0x1c3c42(0x515)]||{},_0x30cda6['prototype']['clearStates'][_0x1c3c42(0x48e)](this)):(VisuMZ['SkillsStatesCore'][_0x1c3c42(0x366)]['call'](this),this['initMembersSkillsStatesCore']());},Game_Actor[_0x5e012b(0x2ea)]['clearStates']=function(){const _0x46282b=_0x5e012b;this[_0x46282b(0x515)]=this[_0x46282b(0x515)]||{},Game_Battler[_0x46282b(0x2ea)][_0x46282b(0x40a)][_0x46282b(0x48e)](this);},Game_BattlerBase[_0x5e012b(0x2ea)]['clearStatesWithStateRetain']=function(){const _0x262d48=_0x5e012b,_0x3281ba=this[_0x262d48(0x3b3)]();for(const _0x46385f of _0x3281ba){if(_0x262d48(0x4ad)===_0x262d48(0x333))this[_0x262d48(0x4a8)]='',this[_0x262d48(0x312)]={},this['_stateDisplay']={},this[_0x262d48(0x4ce)]={};else{if(_0x46385f&&this[_0x262d48(0x530)](_0x46385f))this[_0x262d48(0x3ee)](_0x46385f['id']);}}this[_0x262d48(0x3a6)]={};},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x530)]=function(_0x23bf64){const _0x33b1bb=_0x5e012b,_0x19845d=this['getStateRetainType']();if(_0x19845d!==''){const _0x13dba3=_0x23bf64[_0x33b1bb(0x37b)];if(_0x19845d===_0x33b1bb(0x384)&&_0x13dba3[_0x33b1bb(0x31c)](/<NO DEATH CLEAR>/i))return![];if(_0x19845d==='recover\x20all'&&_0x13dba3['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x33b1bb(0x302)](_0x23bf64['id']);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x25d)]=function(){const _0xb1ef86=_0x5e012b;return this[_0xb1ef86(0x4a8)];},Game_BattlerBase['prototype'][_0x5e012b(0x2bd)]=function(_0x29a14e){const _0x2dff20=_0x5e012b;this[_0x2dff20(0x4a8)]=_0x29a14e;},Game_BattlerBase[_0x5e012b(0x2ea)]['clearStateRetainType']=function(){const _0x5ae185=_0x5e012b;this[_0x5ae185(0x4a8)]='';},VisuMZ[_0x5e012b(0x431)]['Game_BattlerBase_die']=Game_BattlerBase['prototype'][_0x5e012b(0x38a)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x38a)]=function(){const _0x43f848=_0x5e012b;this[_0x43f848(0x2bd)](_0x43f848(0x384)),VisuMZ[_0x43f848(0x431)]['Game_BattlerBase_die']['call'](this),this[_0x43f848(0x3f8)]();},VisuMZ['SkillsStatesCore'][_0x5e012b(0x30b)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x257)],Game_BattlerBase['prototype'][_0x5e012b(0x257)]=function(){const _0x29c9af=_0x5e012b;this[_0x29c9af(0x2bd)](_0x29c9af(0x248)),VisuMZ[_0x29c9af(0x431)][_0x29c9af(0x30b)][_0x29c9af(0x48e)](this),this[_0x29c9af(0x3f8)]();},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x29a)]=function(_0x31c814){const _0x543b87=_0x5e012b;for(settings of VisuMZ[_0x543b87(0x431)][_0x543b87(0x2ac)][_0x543b87(0x2e2)]){const _0x102027=settings['CalcJS'][_0x543b87(0x48e)](this,_0x31c814);if(!settings[_0x543b87(0x4ab)][_0x543b87(0x48e)](this,_0x31c814,_0x102027))return![];}return!![];},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x48f)]=function(_0x4a2231){const _0x420699=_0x5e012b;for(settings of VisuMZ[_0x420699(0x431)][_0x420699(0x2ac)][_0x420699(0x2e2)]){if(_0x420699(0x50c)!==_0x420699(0x317)){const _0x2fc968=settings['CalcJS'][_0x420699(0x48e)](this,_0x4a2231);settings['PayJS']['call'](this,_0x4a2231,_0x2fc968);}else this['contents'][_0x420699(0x470)](_0xec6d46,_0x5db209,_0x1b0e7e,_0x2ac860,this['contents'][_0x420699(0x347)],_0x5e1b53);}},VisuMZ['SkillsStatesCore'][_0x5e012b(0x488)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x520)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x520)]=function(_0x143a10){const _0x2d5f8f=_0x5e012b;if(!_0x143a10)return![];if(!VisuMZ[_0x2d5f8f(0x431)][_0x2d5f8f(0x488)]['call'](this,_0x143a10))return![];if(!this[_0x2d5f8f(0x35f)](_0x143a10))return![];if(!this[_0x2d5f8f(0x36f)](_0x143a10))return![];if(!this[_0x2d5f8f(0x52f)](_0x143a10))return![];return!![];},Game_BattlerBase[_0x5e012b(0x2ea)]['checkSkillConditionsNotetags']=function(_0x2a6427){if(!this['checkSkillConditionsSwitchNotetags'](_0x2a6427))return![];return!![];},Game_BattlerBase['prototype'][_0x5e012b(0x439)]=function(_0x55efc2){const _0x205d6f=_0x5e012b,_0x55a23e=_0x55efc2[_0x205d6f(0x37b)];if(_0x55a23e[_0x205d6f(0x31c)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32cdf1=JSON['parse']('['+RegExp['$1'][_0x205d6f(0x31c)](/\d+/g)+']');for(const _0x51c2ac of _0x32cdf1){if('nroko'==='XQivU')_0x12dd2a(_0x205d6f(0x2e5)['format'](_0x1b63b8,_0x2095f1)),_0x57d52d['exit']();else{if(!$gameSwitches[_0x205d6f(0x433)](_0x51c2ac))return![];}}return!![];}if(_0x55a23e[_0x205d6f(0x31c)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x205d6f(0x2a6)===_0x205d6f(0x2df)){if(_0x163ceb[_0x205d6f(0x2a2)]())_0x270c54[_0x205d6f(0x3d6)](_0x41e8ce);}else{const _0x8f94cc=JSON[_0x205d6f(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x29688f of _0x8f94cc){if(!$gameSwitches[_0x205d6f(0x433)](_0x29688f))return![];}return!![];}}if(_0x55a23e['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x205d6f(0x43f)===_0x205d6f(0x43f)){const _0x564709=JSON[_0x205d6f(0x320)]('['+RegExp['$1'][_0x205d6f(0x31c)](/\d+/g)+']');for(const _0xef2285 of _0x564709){if(_0x205d6f(0x2fa)!=='loSVr'){if($gameSwitches['value'](_0xef2285))return!![];}else return _0xcfe684[_0x205d6f(0x431)][_0x205d6f(0x2ac)][_0x205d6f(0x46b)]['LayoutStyle'];}return![];}else return this[_0x205d6f(0x50f)]()['match'](/LOWER/i);}if(_0x55a23e['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d5d01=JSON['parse']('['+RegExp['$1'][_0x205d6f(0x31c)](/\d+/g)+']');for(const _0x17ebe2 of _0x4d5d01){if(!$gameSwitches[_0x205d6f(0x433)](_0x17ebe2))return!![];}return![];}if(_0x55a23e[_0x205d6f(0x31c)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x14af0b=JSON[_0x205d6f(0x320)]('['+RegExp['$1'][_0x205d6f(0x31c)](/\d+/g)+']');for(const _0x1d4aac of _0x14af0b){if(!$gameSwitches[_0x205d6f(0x433)](_0x1d4aac))return!![];}return![];}if(_0x55a23e['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x205d6f(0x42c)!==_0x205d6f(0x4d4)){const _0x2b638e=JSON['parse']('['+RegExp['$1'][_0x205d6f(0x31c)](/\d+/g)+']');for(const _0x1cd925 of _0x2b638e){if($gameSwitches[_0x205d6f(0x433)](_0x1cd925))return![];}return!![];}else _0x18f3b0=_0x592a76(_0x394ed0['$1']),_0x460d79=_0x179016(_0x41c7f7['$2']);}return!![];},Game_BattlerBase['prototype'][_0x5e012b(0x36f)]=function(_0x3ecf63){const _0x58ab0f=_0x5e012b,_0x183acf=_0x3ecf63[_0x58ab0f(0x37b)],_0x4c5e01=VisuMZ['SkillsStatesCore'][_0x58ab0f(0x32f)];if(_0x4c5e01[_0x3ecf63['id']])return _0x4c5e01[_0x3ecf63['id']][_0x58ab0f(0x48e)](this,_0x3ecf63);else{if(_0x58ab0f(0x216)!=='JoSRs')return!![];else{_0x5b6f88['prototype']['addPassiveStatesByPluginParameters']['call'](this);const _0x57bad9=_0x497dfc[_0x58ab0f(0x431)][_0x58ab0f(0x2ac)]['PassiveStates']['Enemy'];this['_cache'][_0x58ab0f(0x377)]=this[_0x58ab0f(0x3a6)]['passiveStates'][_0x58ab0f(0x294)](_0x57bad9);}}},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x52f)]=function(_0xcb9e7){const _0x2536e5=_0x5e012b;return VisuMZ['SkillsStatesCore']['Settings']['Skills'][_0x2536e5(0x461)]['call'](this,_0xcb9e7);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x28a)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x28a)]=function(_0x323248){const _0x43e807=_0x5e012b;for(settings of VisuMZ[_0x43e807(0x431)][_0x43e807(0x2ac)][_0x43e807(0x2e2)]){if('HVulA'===_0x43e807(0x2ee)){if(settings[_0x43e807(0x407)]['toUpperCase']()==='MP')return settings[_0x43e807(0x4c9)][_0x43e807(0x48e)](this,_0x323248);}else return this[_0x43e807(0x4dc)](_0x42c6a6)>0x0;}return VisuMZ[_0x43e807(0x431)][_0x43e807(0x4fe)][_0x43e807(0x48e)](this,_0x323248);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x326)]=Game_BattlerBase['prototype']['skillTpCost'],Game_BattlerBase[_0x5e012b(0x2ea)]['skillTpCost']=function(_0x2f3175){const _0x548e81=_0x5e012b;for(settings of VisuMZ[_0x548e81(0x431)][_0x548e81(0x2ac)][_0x548e81(0x2e2)]){if(settings[_0x548e81(0x407)][_0x548e81(0x2f0)]()==='TP'){if(_0x548e81(0x212)!=='CeVJw')return settings[_0x548e81(0x4c9)][_0x548e81(0x48e)](this,_0x2f3175);else{const _0xe1646d=_0x291b9c['SkillsStatesCore'],_0xe78aa0=['stateHpSlipDamageJS',_0x548e81(0x3da),'stateMpSlipDamageJS',_0x548e81(0x3d2),_0x548e81(0x3d9),_0x548e81(0x4a0)];for(const _0x4a6569 of _0xe78aa0){_0xe1646d[_0x4a6569][_0x31d158]&&_0xe1646d[_0x4a6569][_0x3fa8eb][_0x548e81(0x48e)](this,_0x1ca465);}}}}return VisuMZ[_0x548e81(0x431)][_0x548e81(0x326)][_0x548e81(0x48e)](this,_0x2f3175);},Game_BattlerBase['prototype'][_0x5e012b(0x282)]=function(_0x3360c7){const _0xcaeee=_0x5e012b;if(typeof _0x3360c7===_0xcaeee(0x279))_0x3360c7=$dataStates[_0x3360c7];return this[_0xcaeee(0x3b3)]()[_0xcaeee(0x2c6)](_0x3360c7);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3f3)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3b3)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3b3)]=function(){const _0x3d9be7=_0x5e012b;let _0x4f5c59=VisuMZ[_0x3d9be7(0x431)]['Game_BattlerBase_states'][_0x3d9be7(0x48e)](this);if($gameTemp[_0x3d9be7(0x20e)])return _0x4f5c59;return $gameTemp['_checkingPassiveStates']=!![],this[_0x3d9be7(0x3b0)](_0x4f5c59),$gameTemp[_0x3d9be7(0x20e)]=undefined,_0x4f5c59;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3b0)]=function(_0x523adb){const _0x5058b4=_0x5e012b,_0x3855bc=this['passiveStates']();for(state of _0x3855bc){if(!state)continue;if(!this[_0x5058b4(0x37a)](state)&&_0x523adb[_0x5058b4(0x2c6)](state))continue;_0x523adb['push'](state);}_0x3855bc[_0x5058b4(0x2dc)]>0x0&&_0x523adb[_0x5058b4(0x26a)]((_0x551fe9,_0xeb4df6)=>{const _0x4bcea2=_0x5058b4,_0x2a853f=_0x551fe9[_0x4bcea2(0x303)],_0x26a047=_0xeb4df6[_0x4bcea2(0x303)];if(_0x2a853f!==_0x26a047){if(_0x4bcea2(0x21d)==='tGCKQ')return _0x26a047-_0x2a853f;else{if(_0x1a87e5[_0x4bcea2(0x407)][_0x4bcea2(0x2f0)]()==='TP')return _0x149da6[_0x4bcea2(0x4c9)]['call'](this,_0x214013);}}return _0x551fe9-_0xeb4df6;});},Game_BattlerBase['prototype'][_0x5e012b(0x37a)]=function(_0x29b793){const _0x5c7d06=_0x5e012b;return _0x29b793[_0x5c7d06(0x37b)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_traitsSet']=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x22a)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x22a)]=function(_0x1c74a4){const _0x6d8e8d=_0x5e012b;this[_0x6d8e8d(0x241)]=!![];let _0x4b70ef=VisuMZ[_0x6d8e8d(0x431)][_0x6d8e8d(0x479)][_0x6d8e8d(0x48e)](this,_0x1c74a4);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x4b70ef;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x4e3)]=function(){const _0x393d74=_0x5e012b;let _0x3ef046=[];this[_0x393d74(0x214)]=this[_0x393d74(0x214)]||{};for(;;){_0x3ef046=[];let _0x1b4fd6=!![];for(const _0x9fdbb1 of this[_0x393d74(0x3a6)][_0x393d74(0x377)]){const _0x2854b2=$dataStates[_0x9fdbb1];if(!_0x2854b2)continue;let _0x3461bf=this[_0x393d74(0x45b)](_0x2854b2);this[_0x393d74(0x214)][_0x9fdbb1]!==_0x3461bf&&(_0x393d74(0x39d)!=='GhEDc'?(_0x1b4fd6=![],this[_0x393d74(0x214)][_0x9fdbb1]=_0x3461bf):_0x1d2539[_0x393d74(0x431)]['Settings'][_0x393d74(0x35d)][_0x393d74(0x2c3)][_0x393d74(0x48e)](this,_0x71e180));if(!_0x3461bf)continue;_0x3ef046[_0x393d74(0x3a8)](_0x2854b2);}if(_0x1b4fd6){if(_0x393d74(0x24e)===_0x393d74(0x24e))break;else{const _0x2a6543=this[_0x393d74(0x365)];_0x2a6543[_0x393d74(0x470)](_0x31f279,0x0,_0x11124b['y'],_0x2a6543[_0x393d74(0x497)],_0x393d74(0x256));}}else{if(!this[_0x393d74(0x241)])this[_0x393d74(0x4cf)]();this[_0x393d74(0x2d4)]();}}return _0x3ef046;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x45b)]=function(_0x10f3b1){const _0x519ed6=_0x5e012b;if(!this['meetsPassiveStateConditionClasses'](_0x10f3b1))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x10f3b1))return![];if(!this[_0x519ed6(0x52d)](_0x10f3b1))return![];if(!this[_0x519ed6(0x2bb)](_0x10f3b1))return![];return!![];},Game_BattlerBase[_0x5e012b(0x2ea)]['meetsPassiveStateConditionClasses']=function(_0x254632){return!![];},Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x4b3)]=function(_0x1ec3d5){const _0x3aff76=_0x5e012b,_0x2906f3=_0x1ec3d5[_0x3aff76(0x37b)];if(_0x2906f3['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if('uXalm'==='uXalm'){const _0x2d44b5=String(RegExp['$1'])[_0x3aff76(0x45e)](',')[_0x3aff76(0x332)](_0x10be67=>_0x10be67['trim']()),_0x31e5ae=VisuMZ[_0x3aff76(0x431)][_0x3aff76(0x45f)](_0x2d44b5);return _0x31e5ae[_0x3aff76(0x2c6)](this[_0x3aff76(0x28f)]());}else{if(!_0x10930a[_0x3aff76(0x433)](_0x25c865))return![];}}if(_0x2906f3['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x725df6=String(RegExp['$1'])[_0x3aff76(0x45e)](',')[_0x3aff76(0x332)](_0x1defaf=>_0x1defaf[_0x3aff76(0x229)]()),_0x1799e2=VisuMZ['SkillsStatesCore'][_0x3aff76(0x45f)](_0x725df6);let _0xdb0f87=[this['currentClass']()];return Imported[_0x3aff76(0x455)]&&this['multiclasses']&&(_0x3aff76(0x2a7)===_0x3aff76(0x2a7)?_0xdb0f87=this['multiclasses']():_0x22661a[_0x3aff76(0x1f3)][_0x3aff76(0x3a8)](_0x3aff76(0x3c8))),_0x1799e2[_0x3aff76(0x3ae)](_0x37df22=>_0xdb0f87[_0x3aff76(0x2c6)](_0x37df22))[_0x3aff76(0x2dc)]>0x0;}return Game_BattlerBase['prototype'][_0x3aff76(0x4b3)][_0x3aff76(0x48e)](this,_0x1ec3d5);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x45f)]=function(_0x4db344){const _0x567542=_0x5e012b,_0x3723d6=[];for(let _0x180418 of _0x4db344){if(_0x567542(0x505)!=='EgbXy'){_0x180418=(String(_0x180418)||'')[_0x567542(0x229)]();const _0x20df8e=/^\d+$/[_0x567542(0x34c)](_0x180418);if(_0x20df8e)_0x3723d6['push'](Number(_0x180418));else{if(_0x567542(0x223)!==_0x567542(0x349))_0x3723d6[_0x567542(0x3a8)](DataManager[_0x567542(0x2e7)](_0x180418));else{const _0x1d5cf2=_0x453d51[_0x567542(0x320)]('['+_0x11fae6['$1']['match'](/\d+/g)+']');for(const _0x2c7a0d of _0x1d5cf2){if(_0x5f07d0[_0x567542(0x533)](_0x2c7a0d))return!![];}return![];}}}else{const _0x26cb8=this[_0x567542(0x495)](_0x4275ab),_0x4b1ab2=this[_0x567542(0x243)](_0x3e0ba0)[_0x567542(0x449)];return _0x4b1ab2<=_0x26cb8['width']?_0x567542(0x1fb):_0x567542(0x3be);}}return _0x3723d6[_0x567542(0x332)](_0x339f61=>$dataClasses[Number(_0x339f61)])[_0x567542(0x4f3)](null);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x247)]=function(_0x55127f){const _0x593758=_0x5e012b,_0x50ab25=_0x55127f['note'];if(_0x50ab25['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x593758(0x285)===_0x593758(0x51c))return _0x3b3bec['uiHelpPosition'];else{const _0x1c728b=JSON['parse']('['+RegExp['$1'][_0x593758(0x31c)](/\d+/g)+']');for(const _0x310966 of _0x1c728b){if(!$gameSwitches[_0x593758(0x433)](_0x310966))return![];}return!![];}}if(_0x50ab25['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x593758(0x26b)!=='BMxOk')return _0x183418[_0x3acc74['id']][_0x593758(0x48e)](this,_0x445d98);else{const _0x19a3a7=JSON['parse']('['+RegExp['$1'][_0x593758(0x31c)](/\d+/g)+']');for(const _0x24d9fe of _0x19a3a7){if(_0x593758(0x273)!==_0x593758(0x273))this[_0x593758(0x4c7)](_0x373bcb,_0x4d7f26['x'],_0x23bc4b['y'],_0x15a19b);else{if(!$gameSwitches['value'](_0x24d9fe))return![];}}return!![];}}if(_0x50ab25[_0x593758(0x31c)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x274d43=JSON[_0x593758(0x320)]('['+RegExp['$1'][_0x593758(0x31c)](/\d+/g)+']');for(const _0x5ceac7 of _0x274d43){if(_0x593758(0x340)!==_0x593758(0x2ab)){if($gameSwitches[_0x593758(0x433)](_0x5ceac7))return!![];}else return _0x4bb6cb[_0x593758(0x431)][_0x593758(0x352)][_0x593758(0x48e)](this);}return![];}if(_0x50ab25[_0x593758(0x31c)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17aebf=JSON[_0x593758(0x320)]('['+RegExp['$1'][_0x593758(0x31c)](/\d+/g)+']');for(const _0x2e4659 of _0x17aebf){if(!$gameSwitches[_0x593758(0x433)](_0x2e4659))return!![];}return![];}if(_0x50ab25[_0x593758(0x31c)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('xsaGh'==='xsaGh'){const _0x1190cc=JSON[_0x593758(0x320)]('['+RegExp['$1'][_0x593758(0x31c)](/\d+/g)+']');for(const _0x2fbd06 of _0x1190cc){if(!$gameSwitches[_0x593758(0x433)](_0x2fbd06))return!![];}return![];}else this[_0x593758(0x2c7)][_0x593758(0x4f8)](),this[_0x593758(0x371)]();}if(_0x50ab25['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x593758(0x277)!==_0x593758(0x514)){const _0x2f8ec6=JSON[_0x593758(0x320)]('['+RegExp['$1'][_0x593758(0x31c)](/\d+/g)+']');for(const _0x21e617 of _0x2f8ec6){if(_0x593758(0x38b)!==_0x593758(0x38b))return _0x27cc5e[_0x593758(0x431)][_0x593758(0x2ac)]['PassiveStates'][_0x593758(0x1f0)][_0x593758(0x48e)](this,_0x5dae41);else{if($gameSwitches['value'](_0x21e617))return![];}}return!![];}else _0x3c262d[_0x32f295][_0x30d8bb][_0x593758(0x48e)](this,_0x2c9e67);}return!![];},Game_BattlerBase[_0x5e012b(0x2ea)]['meetsPassiveStateConditionJS']=function(_0x1bbbbc){const _0x47280c=_0x5e012b,_0x1e9c9c=VisuMZ[_0x47280c(0x431)][_0x47280c(0x480)];if(_0x1e9c9c[_0x1bbbbc['id']]&&!_0x1e9c9c[_0x1bbbbc['id']]['call'](this,_0x1bbbbc))return![];return!![];},Game_BattlerBase[_0x5e012b(0x2ea)]['meetsPassiveStateGlobalConditionJS']=function(_0x55ce92){const _0x5a3eca=_0x5e012b;return VisuMZ[_0x5a3eca(0x431)][_0x5a3eca(0x2ac)][_0x5a3eca(0x363)][_0x5a3eca(0x1f0)][_0x5a3eca(0x48e)](this,_0x55ce92);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x377)]=function(){const _0x23482f=_0x5e012b;if(this[_0x23482f(0x2fc)](_0x23482f(0x377)))return this[_0x23482f(0x4e3)]();if(this[_0x23482f(0x3e4)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this['createPassiveStatesCache'](),this[_0x23482f(0x3e4)]=undefined,this[_0x23482f(0x4e3)]();},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x2d4)]=function(){const _0x35c7f2=_0x5e012b;this[_0x35c7f2(0x3e4)]=!![],this[_0x35c7f2(0x3a6)][_0x35c7f2(0x377)]=[],this[_0x35c7f2(0x4e1)](),this[_0x35c7f2(0x3b4)](),this[_0x35c7f2(0x4d5)](),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase[_0x5e012b(0x2ea)]['addPassiveStatesFromOtherPlugins']=function(){const _0x44266f=_0x5e012b;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x44266f(0x242)]();},Game_BattlerBase['prototype'][_0x5e012b(0x299)]=function(){return[];},Game_BattlerBase['prototype'][_0x5e012b(0x3b4)]=function(){const _0x1e440f=_0x5e012b,_0xaa0a59=this[_0x1e440f(0x299)]();for(const _0x3b2af8 of _0xaa0a59){if(!_0x3b2af8)continue;const _0x2cdb25=_0x3b2af8[_0x1e440f(0x37b)][_0x1e440f(0x31c)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x2cdb25)for(const _0x4425eb of _0x2cdb25){if(_0x1e440f(0x45d)===_0x1e440f(0x45d)){_0x4425eb[_0x1e440f(0x31c)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x56f023=RegExp['$1'];if(_0x56f023[_0x1e440f(0x31c)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x1e440f(0x2b2)==='vNpnf'){const _0x5868b9=JSON[_0x1e440f(0x320)]('['+RegExp['$1'][_0x1e440f(0x31c)](/\d+/g)+']');this[_0x1e440f(0x3a6)][_0x1e440f(0x377)]=this[_0x1e440f(0x3a6)][_0x1e440f(0x377)][_0x1e440f(0x294)](_0x5868b9);}else{_0x15fb89[_0x1e440f(0x431)][_0x1e440f(0x22e)]['call'](this);if(this[_0x1e440f(0x321)])this[_0x1e440f(0x3cd)]();}}else{if(_0x1e440f(0x368)===_0x1e440f(0x368)){const _0x3545d2=_0x56f023[_0x1e440f(0x45e)](',');for(const _0x218f43 of _0x3545d2){const _0x5b83d8=DataManager[_0x1e440f(0x4e5)](_0x218f43);if(_0x5b83d8)this['_cache'][_0x1e440f(0x377)][_0x1e440f(0x3a8)](_0x5b83d8);}}else return _0x1c4cdc[_0x1e440f(0x4fd)];}}else this['drawItemStyleIcon'](_0x2b5fbb);}}},Game_BattlerBase['prototype'][_0x5e012b(0x4d5)]=function(){const _0x4337ca=_0x5e012b,_0x529bbc=VisuMZ[_0x4337ca(0x431)][_0x4337ca(0x2ac)][_0x4337ca(0x363)]['Global'];this['_cache'][_0x4337ca(0x377)]=this[_0x4337ca(0x3a6)][_0x4337ca(0x377)]['concat'](_0x529bbc);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x423)]=function(_0x46e544){const _0x94566b=_0x5e012b;if(typeof _0x46e544!==_0x94566b(0x279))_0x46e544=_0x46e544['id'];return this[_0x94566b(0x2f7)][_0x46e544]||0x0;},Game_BattlerBase['prototype']['setStateTurns']=function(_0x3cb869,_0x3f1abf){const _0x3e5b09=_0x5e012b;if(typeof _0x3cb869!==_0x3e5b09(0x279))_0x3cb869=_0x3cb869['id'];if(this[_0x3e5b09(0x302)](_0x3cb869)){const _0x3e7d98=DataManager[_0x3e5b09(0x3e8)](_0x3cb869);this[_0x3e5b09(0x2f7)][_0x3cb869]=_0x3f1abf[_0x3e5b09(0x441)](0x0,_0x3e7d98);if(this['_stateTurns'][_0x3cb869]<=0x0)this[_0x3e5b09(0x397)](_0x3cb869);}},Game_BattlerBase['prototype'][_0x5e012b(0x313)]=function(_0x2e19e5,_0x30a181){const _0x392341=_0x5e012b;if(typeof _0x2e19e5!==_0x392341(0x279))_0x2e19e5=_0x2e19e5['id'];this['isStateAffected'](_0x2e19e5)&&(_0x30a181+=this[_0x392341(0x423)](_0x2e19e5),this[_0x392341(0x2cf)](_0x2e19e5,_0x30a181));},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x393)]=Game_BattlerBase['prototype'][_0x5e012b(0x4b0)],Game_BattlerBase['prototype'][_0x5e012b(0x4b0)]=function(_0x2586f3){const _0x6799ae=_0x5e012b,_0x31c157=this[_0x6799ae(0x3d5)][_0x2586f3];VisuMZ['SkillsStatesCore'][_0x6799ae(0x393)][_0x6799ae(0x48e)](this,_0x2586f3);if(_0x31c157>0x0)this[_0x6799ae(0x3b7)](_0x2586f3);if(_0x31c157<0x0)this[_0x6799ae(0x29d)](_0x2586f3);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x516)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x409)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x409)]=function(_0x3edc73){const _0x259508=_0x5e012b;VisuMZ[_0x259508(0x431)][_0x259508(0x516)]['call'](this,_0x3edc73);if(!this[_0x259508(0x284)](_0x3edc73))this[_0x259508(0x4b0)](_0x3edc73);},VisuMZ[_0x5e012b(0x431)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3af)]=function(_0x11a24d){const _0x4d7240=_0x5e012b;VisuMZ[_0x4d7240(0x431)]['Game_BattlerBase_decreaseBuff'][_0x4d7240(0x48e)](this,_0x11a24d);if(!this[_0x4d7240(0x284)](_0x11a24d))this[_0x4d7240(0x4b0)](_0x11a24d);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3b7)]=function(_0x4221e2){},Game_BattlerBase['prototype'][_0x5e012b(0x29d)]=function(_0x532aa9){},Game_BattlerBase['prototype']['isMaxBuffAffected']=function(_0x44b0d1){const _0x1cd2c7=_0x5e012b;return this['_buffs'][_0x44b0d1]===VisuMZ['SkillsStatesCore'][_0x1cd2c7(0x2ac)]['Buffs'][_0x1cd2c7(0x2f4)];},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x22f)]=function(_0x22e3a8){const _0x2d097a=_0x5e012b;return this[_0x2d097a(0x3d5)][_0x22e3a8]===-VisuMZ['SkillsStatesCore'][_0x2d097a(0x2ac)][_0x2d097a(0x35d)]['StackDebuffMax'];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x33c)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x331)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x331)]=function(_0x126216,_0x1f01b4){const _0x3b743a=_0x5e012b;return _0x126216=_0x126216[_0x3b743a(0x441)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x3b743a(0x33c)][_0x3b743a(0x48e)](this,_0x126216,_0x1f01b4);},Game_BattlerBase[_0x5e012b(0x2ea)]['paramBuffRate']=function(_0x1633ec){const _0x285a87=_0x5e012b,_0x34ce7b=this[_0x285a87(0x3d5)][_0x1633ec];return VisuMZ[_0x285a87(0x431)][_0x285a87(0x2ac)][_0x285a87(0x35d)]['MultiplierJS'][_0x285a87(0x48e)](this,_0x1633ec,_0x34ce7b);},Game_BattlerBase[_0x5e012b(0x2ea)]['buffTurns']=function(_0x180ee6){const _0x51b6e4=_0x5e012b;return this[_0x51b6e4(0x512)][_0x180ee6]||0x0;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x465)]=function(_0x1d6249){const _0x1fd9a5=_0x5e012b;return this[_0x1fd9a5(0x222)](_0x1d6249);},Game_BattlerBase['prototype'][_0x5e012b(0x531)]=function(_0x3739e6,_0x5baf1a){const _0x56f161=_0x5e012b;if(this[_0x56f161(0x3b2)](_0x3739e6)){if(_0x56f161(0x271)==='IaHmc'){if(!_0x49f7cf[_0x56f161(0x431)]['Settings']['Buffs'][_0x56f161(0x2b4)])return;const _0x524b18=_0x12fd64['paramBuffRate'](_0x39a897),_0x1ca7ae=_0x22f33c[_0x56f161(0x2a0)](_0x37bf76),_0x90aecf=_0x57f3d3[_0x56f161(0x3bd)],_0x56dac0=_0xd614d9[_0x56f161(0x447)]/0x2,_0x4af210=_0x1ca7ae>0x0?_0x3b6daf[_0x56f161(0x322)]():_0x356d70[_0x56f161(0x4ea)]();this[_0x56f161(0x517)](_0x4af210),this[_0x56f161(0x4d7)](_0x56f161(0x3dc)),this[_0x56f161(0x34e)][_0x56f161(0x471)]=!![],this[_0x56f161(0x34e)][_0x56f161(0x4d8)]=_0x2d1ded[_0x56f161(0x431)][_0x56f161(0x2ac)]['Buffs'][_0x56f161(0x3ff)],_0x4294ca+=_0x372048[_0x56f161(0x431)][_0x56f161(0x2ac)][_0x56f161(0x35d)][_0x56f161(0x458)],_0x3b92ab+=_0x3ada57[_0x56f161(0x431)][_0x56f161(0x2ac)][_0x56f161(0x35d)][_0x56f161(0x3a0)];const _0x8ae4f1=_0x56f161(0x281)['format'](_0x5b7973['round'](_0x524b18*0x64));this['drawText'](_0x8ae4f1,_0x28810b,_0x42d0d7,_0x90aecf,_0x56f161(0x256)),this['contents'][_0x56f161(0x471)]=![],this[_0x56f161(0x3f5)]();}else{const _0x3d6a6d=VisuMZ['SkillsStatesCore'][_0x56f161(0x2ac)]['Buffs'][_0x56f161(0x339)];this[_0x56f161(0x512)][_0x3739e6]=_0x5baf1a[_0x56f161(0x441)](0x0,_0x3d6a6d);}}},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x329)]=function(_0x247538,_0x6dd67){const _0x4c924d=_0x5e012b;this[_0x4c924d(0x3b2)](_0x247538)&&('odJpG'!==_0x4c924d(0x46c)?(_0x1aec57['prototype'][_0x4c924d(0x29d)][_0x4c924d(0x48e)](this,_0x654557),this[_0x4c924d(0x41f)](_0x2f83cd)):(_0x6dd67+=this[_0x4c924d(0x222)](stateId),this[_0x4c924d(0x2cf)](_0x247538,_0x6dd67)));},Game_BattlerBase[_0x5e012b(0x2ea)]['setDebuffTurns']=function(_0x2c0f52,_0x31cc5c){const _0x386519=_0x5e012b;if(this[_0x386519(0x450)](_0x2c0f52)){if(_0x386519(0x266)!==_0x386519(0x266))this[_0x386519(0x2cb)](_0x55fa28,_0x4e0bc7);else{const _0x3673e7=VisuMZ[_0x386519(0x431)][_0x386519(0x2ac)]['Buffs']['MaxTurns'];this[_0x386519(0x512)][_0x2c0f52]=_0x31cc5c[_0x386519(0x441)](0x0,_0x3673e7);}}},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x408)]=function(_0x833efe,_0x32c491){const _0x5741bd=_0x5e012b;if(this[_0x5741bd(0x450)](_0x833efe)){if('YXQXF'!==_0x5741bd(0x405)){if(typeof _0x3319c7!==_0x5741bd(0x279))_0x1c2aa7=_0x4aa11d['id'];this[_0x5741bd(0x4be)]=this['_stateDisplay']||{},this[_0x5741bd(0x4be)][_0x3247fc]='';}else _0x32c491+=this[_0x5741bd(0x222)](stateId),this['setStateTurns'](_0x833efe,_0x32c491);}},Game_BattlerBase[_0x5e012b(0x2ea)]['stateData']=function(_0x11bc6a){const _0x4207fd=_0x5e012b;if(typeof _0x11bc6a!==_0x4207fd(0x279))_0x11bc6a=_0x11bc6a['id'];return this['_stateData']=this[_0x4207fd(0x312)]||{},this['_stateData'][_0x11bc6a]=this['_stateData'][_0x11bc6a]||{},this[_0x4207fd(0x312)][_0x11bc6a];},Game_BattlerBase['prototype'][_0x5e012b(0x443)]=function(_0x967b1,_0x4f3595){if(typeof _0x967b1!=='number')_0x967b1=_0x967b1['id'];const _0x2999f4=this['stateData'](_0x967b1);return _0x2999f4[_0x4f3595];},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x235)]=function(_0x1411ab,_0x42b2c7,_0x5b2d9f){const _0x3c73fc=_0x5e012b;if(typeof _0x1411ab!==_0x3c73fc(0x279))_0x1411ab=_0x1411ab['id'];const _0x266c5e=this[_0x3c73fc(0x2aa)](_0x1411ab);_0x266c5e[_0x42b2c7]=_0x5b2d9f;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x46e)]=function(_0x116d08){const _0x40a161=_0x5e012b;if(typeof _0x116d08!==_0x40a161(0x279))_0x116d08=_0x116d08['id'];this[_0x40a161(0x312)]=this[_0x40a161(0x312)]||{},this[_0x40a161(0x312)][_0x116d08]={};},Game_BattlerBase[_0x5e012b(0x2ea)]['getStateDisplay']=function(_0x38fc45){const _0x1bb640=_0x5e012b;if(typeof _0x38fc45!==_0x1bb640(0x279))_0x38fc45=_0x38fc45['id'];return this[_0x1bb640(0x4be)]=this[_0x1bb640(0x4be)]||{},this[_0x1bb640(0x4be)][_0x38fc45]===undefined&&(_0x1bb640(0x3fb)===_0x1bb640(0x32d)?this['onAddStateMakeCustomSlipValues'](_0x7e1d0c['id']):this[_0x1bb640(0x4be)][_0x38fc45]=''),this['_stateDisplay'][_0x38fc45];},Game_BattlerBase[_0x5e012b(0x2ea)]['setStateDisplay']=function(_0x4178b4,_0x6d592e){const _0x3b18ba=_0x5e012b;if(typeof _0x4178b4!==_0x3b18ba(0x279))_0x4178b4=_0x4178b4['id'];this['_stateDisplay']=this[_0x3b18ba(0x4be)]||{},this[_0x3b18ba(0x4be)][_0x4178b4]=_0x6d592e;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x20f)]=function(_0x511011){const _0x4c58b8=_0x5e012b;if(typeof _0x511011!==_0x4c58b8(0x279))_0x511011=_0x511011['id'];this[_0x4c58b8(0x4be)]=this[_0x4c58b8(0x4be)]||{},this[_0x4c58b8(0x4be)][_0x511011]='';},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x314)]=function(_0x555ffa){const _0x2f1925=_0x5e012b;if(typeof _0x555ffa!==_0x2f1925(0x279))_0x555ffa=_0x555ffa['id'];this['_stateOrigin']=this[_0x2f1925(0x4ce)]||{},this['_stateOrigin'][_0x555ffa]=this['_stateOrigin'][_0x555ffa]||_0x2f1925(0x2b8);const _0x338088=this[_0x2f1925(0x4ce)][_0x555ffa];return this[_0x2f1925(0x1f5)](_0x338088);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x4f5)]=function(_0x463af9,_0x1d892d){const _0x37108a=_0x5e012b;this[_0x37108a(0x4ce)]=this[_0x37108a(0x4ce)]||{};const _0x2a014b=_0x1d892d?this['convertTargetToStateOriginKey'](_0x1d892d):this[_0x37108a(0x3b6)]();this[_0x37108a(0x4ce)][_0x463af9]=_0x2a014b;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x535)]=function(_0xd8df63){const _0x47d990=_0x5e012b;this['_stateOrigin']=this[_0x47d990(0x4ce)]||{},delete this[_0x47d990(0x4ce)][_0xd8df63];},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x3b6)]=function(){const _0x37794b=_0x5e012b,_0x4c7f09=this[_0x37794b(0x362)]();return this['convertTargetToStateOriginKey'](_0x4c7f09);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x362)]=function(){const _0x491ae3=_0x5e012b;if($gameParty[_0x491ae3(0x380)]()){if(BattleManager[_0x491ae3(0x220)])return BattleManager[_0x491ae3(0x220)];else{if(BattleManager['_currentActor'])return BattleManager['_currentActor'];}}else{if('TzgcP'===_0x491ae3(0x286)){const _0xecb11a=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x491ae3(0x2c6)](_0xecb11a[_0x491ae3(0x293)]))return $gameParty[_0x491ae3(0x421)]();}else _0x42c5a1+=this[_0x491ae3(0x222)](_0x38d1f1),this[_0x491ae3(0x2cf)](_0x53ef24,_0x13f060);}return this;},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x211)]=function(_0x5480f8){const _0xf924fd=_0x5e012b;if(!_0x5480f8)return'user';if(_0x5480f8['isActor']())return _0xf924fd(0x4af)['format'](_0x5480f8['actorId']());else{const _0x53a081=_0xf924fd(0x3d1)[_0xf924fd(0x39e)](_0x5480f8[_0xf924fd(0x3ac)]()),_0x1fdb2f=_0xf924fd(0x3cf)[_0xf924fd(0x39e)](_0x5480f8['index']()),_0x22d157=_0xf924fd(0x3cb)[_0xf924fd(0x39e)]($gameTroop[_0xf924fd(0x3fa)]());return _0xf924fd(0x2ff)[_0xf924fd(0x39e)](_0x53a081,_0x1fdb2f,_0x22d157);}return _0xf924fd(0x2b8);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x1f5)]=function(_0x25b588){const _0x27246c=_0x5e012b;if(_0x25b588===_0x27246c(0x2b8)){if(_0x27246c(0x32a)!==_0x27246c(0x429))return this;else{const _0xcfef04=this['gaugeRate'](),_0x33ff4f=_0x27c4ec[_0x27246c(0x46a)]((_0x1abca7-0x2)*_0xcfef04),_0x423e7e=_0x24c83b-0x2,_0x582776=this[_0x27246c(0x52c)]();this[_0x27246c(0x2c7)][_0x27246c(0x234)](_0x482933,_0x164afc,_0x171332,_0x394de5,_0x582776),this['bitmap'][_0x27246c(0x21b)](_0x524151+0x1,_0x3a299e+0x1,_0x33ff4f,_0x423e7e,_0xf330cb,_0x30af48);}}else{if(_0x25b588[_0x27246c(0x31c)](/<actor-(\d+)>/i))return $gameActors[_0x27246c(0x44a)](Number(RegExp['$1']));else{if(_0x27246c(0x3dd)!==_0x27246c(0x3dd)){const _0x3141b0=_0x1cc1f6(_0x332ae7['$1']),_0xeaa1c2=_0x3c4667[_0x27246c(0x39e)](_0x3141b0,_0x27246c(0x27c),0x1,_0x27246c(0x298));_0xd8bc56['SkillsStatesCore']['stateTpSlipHealJS'][_0x44e63c['id']]=new _0x4e01ba('stateId',_0xeaa1c2);}else{if($gameParty[_0x27246c(0x380)]()&&_0x25b588['match'](/<troop-(\d+)>/i)){const _0x1231bd=Number(RegExp['$1']);if(_0x1231bd===$gameTroop[_0x27246c(0x3fa)]()){if(_0x25b588[_0x27246c(0x31c)](/<member-(\d+)>/i))return $gameTroop[_0x27246c(0x305)]()[Number(RegExp['$1'])];}}if(_0x25b588[_0x27246c(0x31c)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ['SkillsStatesCore'][_0x5e012b(0x1ed)]=Game_Battler['prototype'][_0x5e012b(0x20c)],Game_Battler[_0x5e012b(0x2ea)]['addState']=function(_0x545d11){const _0x5128b1=_0x5e012b,_0x19395f=this[_0x5128b1(0x51b)](_0x545d11);VisuMZ[_0x5128b1(0x431)]['Game_Battler_addState'][_0x5128b1(0x48e)](this,_0x545d11);if(_0x19395f&&this['hasState']($dataStates[_0x545d11])){this['onAddState'](_0x545d11);;}},VisuMZ['SkillsStatesCore'][_0x5e012b(0x430)]=Game_Battler[_0x5e012b(0x2ea)]['isStateAddable'],Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x51b)]=function(_0x1a7bdb){const _0x3844f1=_0x5e012b,_0x5e889c=$dataStates[_0x1a7bdb];if(_0x5e889c&&_0x5e889c['note'][_0x3844f1(0x31c)](/<NO DEATH CLEAR>/i))return!this[_0x3844f1(0x295)](_0x1a7bdb)&&!this[_0x3844f1(0x48b)](_0x1a7bdb)&&!this['_result'][_0x3844f1(0x453)](_0x1a7bdb);return VisuMZ[_0x3844f1(0x431)][_0x3844f1(0x430)]['call'](this,_0x1a7bdb);},Game_Battler[_0x5e012b(0x2ea)]['onAddState']=function(_0x865566){const _0x254ffe=_0x5e012b;this[_0x254ffe(0x4f5)](_0x865566),this['removeOtherStatesOfSameCategory'](_0x865566),this[_0x254ffe(0x1fa)](_0x865566),this[_0x254ffe(0x300)](_0x865566),this['onAddStateGlobalJS'](_0x865566);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x3a4)]=function(_0x2f520a){const _0x56ffd2=_0x5e012b;this[_0x56ffd2(0x335)](_0x2f520a),this['onEraseStateGlobalJS'](_0x2f520a),Game_BattlerBase[_0x56ffd2(0x2ea)][_0x56ffd2(0x3a4)][_0x56ffd2(0x48e)](this,_0x2f520a);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x20a)]=function(_0x58c1ef){const _0x53c477=_0x5e012b;for(const _0x44fe59 of this['states']()){if(_0x53c477(0x426)===_0x53c477(0x426)){if(this['isStateExpired'](_0x44fe59['id'])&&_0x44fe59['autoRemovalTiming']===_0x58c1ef){if('XtEph'==='XtEph')this[_0x53c477(0x397)](_0x44fe59['id']),this[_0x53c477(0x236)](_0x44fe59['id']),this[_0x53c477(0x3f1)](_0x44fe59['id']);else{const _0x23e0cb=_0x5e1d00[_0x53c477(0x37b)];if(_0x23e0cb[_0x53c477(0x31c)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x20a045=_0x2b8ffb(_0x53f968['$1']),_0x7b9463='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x20a045);_0x26f46f[_0x53c477(0x431)]['skillEnableJS'][_0x56040d['id']]=new _0x3c30fc('skill',_0x7b9463);}if(_0x23e0cb[_0x53c477(0x31c)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1f37e9=_0x36b81f(_0x2f70ec['$1']),_0x523f88=_0x53c477(0x381)[_0x53c477(0x39e)](_0x1f37e9);_0x21de05['SkillsStatesCore']['skillVisibleJS'][_0x285d31['id']]=new _0x1398fc('skill',_0x523f88);}}}}else return _0x5e904c[_0x53c477(0x4f9)]();}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x236)]=function(_0x543fde){const _0x539fa4=_0x5e012b;this[_0x539fa4(0x26e)](_0x543fde);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x300)]=function(_0x5473b3){const _0x12ef11=_0x5e012b;if(this['_tempActor']||this[_0x12ef11(0x42e)])return;const _0x3279e1=VisuMZ[_0x12ef11(0x431)][_0x12ef11(0x325)];if(_0x3279e1[_0x5473b3])_0x3279e1[_0x5473b3][_0x12ef11(0x48e)](this,_0x5473b3);},Game_Battler[_0x5e012b(0x2ea)]['onEraseStateCustomJS']=function(_0x5cfc32){const _0xdbc94=_0x5e012b;if(this[_0xdbc94(0x4e6)]||this['_tempBattler'])return;const _0x202732=VisuMZ[_0xdbc94(0x431)][_0xdbc94(0x382)];if(_0x202732[_0x5cfc32])_0x202732[_0x5cfc32][_0xdbc94(0x48e)](this,_0x5cfc32);},Game_Battler[_0x5e012b(0x2ea)]['onExpireStateCustomJS']=function(_0x4fa731){const _0x2a3130=_0x5e012b;if(this['_tempActor']||this['_tempBattler'])return;const _0x826693=VisuMZ[_0x2a3130(0x431)][_0x2a3130(0x529)];if(_0x826693[_0x4fa731])_0x826693[_0x4fa731][_0x2a3130(0x48e)](this,_0x4fa731);},Game_Battler[_0x5e012b(0x2ea)]['onAddStateGlobalJS']=function(_0x4f620b){const _0x29e34f=_0x5e012b;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x29e34f(0x431)][_0x29e34f(0x2ac)][_0x29e34f(0x2a5)]['onAddStateJS'][_0x29e34f(0x48e)](this,_0x4f620b);}catch(_0x3089a5){if('YBfdJ'!==_0x29e34f(0x50b)){const _0x13cee6=_0x2e6034['parse']('['+_0x39cbf2['$1'][_0x29e34f(0x31c)](/\d+/g)+']');for(const _0x4a8698 of _0x13cee6){if(!_0x5cdfcc['value'](_0x4a8698))return![];}return!![];}else{if($gameTemp[_0x29e34f(0x2a2)]())console[_0x29e34f(0x3d6)](_0x3089a5);}}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x41d)]=function(_0x3a03a5){const _0x52893b=_0x5e012b;if(this[_0x52893b(0x4e6)]||this['_tempBattler'])return;try{VisuMZ[_0x52893b(0x431)][_0x52893b(0x2ac)][_0x52893b(0x2a5)][_0x52893b(0x290)]['call'](this,_0x3a03a5);}catch(_0x57958b){if($gameTemp[_0x52893b(0x2a2)]())console['log'](_0x57958b);}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x3f1)]=function(_0x5f0892){const _0x5e82dc=_0x5e012b;if(this[_0x5e82dc(0x4e6)]||this[_0x5e82dc(0x42e)])return;try{VisuMZ[_0x5e82dc(0x431)][_0x5e82dc(0x2ac)][_0x5e82dc(0x2a5)][_0x5e82dc(0x2f8)][_0x5e82dc(0x48e)](this,_0x5f0892);}catch(_0x24b47a){if($gameTemp[_0x5e82dc(0x2a2)]())console[_0x5e82dc(0x3d6)](_0x24b47a);}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x2b1)]=function(_0x5365e2){const _0x114493=_0x5e012b;return _0x5365e2=_0x5365e2[_0x114493(0x2f0)]()[_0x114493(0x229)](),this['states']()[_0x114493(0x3ae)](_0x193fdd=>_0x193fdd['categories']['includes'](_0x5365e2));},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x4d6)]=function(_0x206255,_0x6ee5ba){const _0x1bca62=_0x5e012b;_0x206255=_0x206255[_0x1bca62(0x2f0)]()['trim'](),_0x6ee5ba=_0x6ee5ba||0x0;const _0x4b947c=this['statesByCategory'](_0x206255),_0x3a5b98=[];for(const _0x3871d7 of _0x4b947c){if(_0x1bca62(0x511)!==_0x1bca62(0x511))this['contents'][_0x1bca62(0x410)]=_0x261568;else{if(!_0x3871d7)continue;if(_0x6ee5ba<=0x0)break;_0x3a5b98[_0x1bca62(0x3a8)](_0x3871d7['id']),this[_0x1bca62(0x3bc)][_0x1bca62(0x425)]=!![],_0x6ee5ba--;}}while(_0x3a5b98[_0x1bca62(0x2dc)]>0x0){if(_0x1bca62(0x2b6)===_0x1bca62(0x2b6))this[_0x1bca62(0x397)](_0x3a5b98['shift']());else{if(_0x2ed9d1['hasSkill'](_0xc11a8f))return!![];}}},Game_Battler[_0x5e012b(0x2ea)]['removeStatesByCategoryAll']=function(_0x714a7,_0x100b22){const _0x502f99=_0x5e012b;_0x714a7=_0x714a7[_0x502f99(0x2f0)]()['trim'](),_0x100b22=_0x100b22||[];const _0x400dfa=this['statesByCategory'](_0x714a7),_0x494527=[];for(const _0x40f7d0 of _0x400dfa){if(_0x502f99(0x49c)!==_0x502f99(0x49c))this[_0x502f99(0x3a6)]={},_0x1cc369['SkillsStatesCore'][_0x502f99(0x47d)]['call'](this);else{if(!_0x40f7d0)continue;if(_0x100b22['includes'](_0x40f7d0))continue;_0x494527[_0x502f99(0x3a8)](_0x40f7d0['id']),this[_0x502f99(0x3bc)][_0x502f99(0x425)]=!![];}}while(_0x494527[_0x502f99(0x2dc)]>0x0){if(_0x502f99(0x389)!=='JIZGt')this[_0x502f99(0x397)](_0x494527[_0x502f99(0x306)]());else return'\x20';}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x3f7)]=function(_0x268468){const _0x250f1f=_0x5e012b;return this[_0x250f1f(0x4dc)](_0x268468)>0x0;},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x411)]=function(_0x54d0c5){return this['totalStateCategory'](_0x54d0c5)>0x0;},Game_Battler[_0x5e012b(0x2ea)]['totalStateCategoryAffected']=function(_0x5ef6ae){const _0x2000ce=_0x5e012b,_0x21e2c8=this['statesByCategory'](_0x5ef6ae)['filter'](_0x55b281=>this[_0x2000ce(0x302)](_0x55b281['id']));return _0x21e2c8[_0x2000ce(0x2dc)];},Game_Battler[_0x5e012b(0x2ea)]['totalStateCategory']=function(_0x345029){const _0x1811ac=_0x5e012b,_0x115a74=this[_0x1811ac(0x2b1)](_0x345029);return _0x115a74[_0x1811ac(0x2dc)];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x289)]=Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x295)],Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x295)]=function(_0x47effa){const _0x540c19=_0x5e012b,_0x215a0c=$dataStates[_0x47effa];if(_0x215a0c&&_0x215a0c[_0x540c19(0x1f3)][_0x540c19(0x2dc)]>0x0){if(_0x540c19(0x26f)==='rZLMU'){if(!_0x3a3b7c[_0x540c19(0x433)](_0xea470e))return!![];}else for(const _0x109d09 of _0x215a0c[_0x540c19(0x1f3)]){if(this[_0x540c19(0x267)](_0x109d09))return!![];}}return VisuMZ[_0x540c19(0x431)][_0x540c19(0x289)]['call'](this,_0x47effa);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x267)]=function(_0x2c334a){const _0xe5a0df=_0x5e012b;let _0x50396e=_0xe5a0df(0x474);if(this[_0xe5a0df(0x2fc)](_0x50396e))return this[_0xe5a0df(0x3a6)][_0x50396e]['includes'](_0x2c334a);return this['_cache'][_0x50396e]=this[_0xe5a0df(0x524)](),this[_0xe5a0df(0x3a6)][_0x50396e]['includes'](_0x2c334a);},Game_BattlerBase[_0x5e012b(0x2ea)][_0x5e012b(0x524)]=function(){const _0x387f66=_0x5e012b,_0x200379=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x4c9402=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x19f131=[];for(const _0x500eb3 of this[_0x387f66(0x435)]()){if(_0x387f66(0x33e)!==_0x387f66(0x39c)){if(!_0x500eb3)continue;const _0x7a0e88=_0x500eb3['note'],_0x1f2099=_0x7a0e88[_0x387f66(0x31c)](_0x200379);if(_0x1f2099)for(const _0x431a80 of _0x1f2099){if(_0x387f66(0x27a)===_0x387f66(0x27a)){_0x431a80[_0x387f66(0x31c)](_0x200379);const _0x49ed4e=String(RegExp['$1'])[_0x387f66(0x45e)](',')[_0x387f66(0x332)](_0x48a281=>String(_0x48a281)[_0x387f66(0x2f0)]()[_0x387f66(0x229)]());_0x19f131=_0x19f131[_0x387f66(0x294)](_0x49ed4e);}else{if(typeof _0x11c516!==_0x387f66(0x279))_0xbb8267=_0x38dc0a['id'];return this[_0x387f66(0x2f7)][_0x39371f]||0x0;}}if(_0x7a0e88[_0x387f66(0x31c)](_0x4c9402)){const _0x49df22=String(RegExp['$1'])[_0x387f66(0x45e)](/[\r\n]+/)[_0x387f66(0x332)](_0x41fae3=>String(_0x41fae3)[_0x387f66(0x2f0)]()['trim']());_0x19f131=_0x19f131[_0x387f66(0x294)](_0x49df22);}}else{const _0x3152c6=[_0x717031];for(const _0x5819a5 of _0x1a90ff){_0x5819a5[_0x387f66(0x31c)](/<REMOVE OTHER (.*) STATES>/i);const _0x12ac80=_0x55a19d(_0x18cc0c['$1']);this[_0x387f66(0x27d)](_0x12ac80,_0x3152c6);}}}return _0x19f131;},Game_BattlerBase['prototype'][_0x5e012b(0x4f7)]=function(_0x491872){const _0x29acbe=_0x5e012b,_0xffe1c6=$dataStates[_0x491872];if(!_0xffe1c6)return;const _0x154235=_0xffe1c6[_0x29acbe(0x37b)]||'',_0x420271=_0x154235[_0x29acbe(0x31c)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x420271){if('dGgiq'===_0x29acbe(0x33f)){const _0x517cfe=[_0xffe1c6];for(const _0x15d518 of _0x420271){_0x15d518[_0x29acbe(0x31c)](/<REMOVE OTHER (.*) STATES>/i);const _0x2e5c94=String(RegExp['$1']);this[_0x29acbe(0x27d)](_0x2e5c94,_0x517cfe);}}else this[_0x29acbe(0x3a6)]={},this[_0x29acbe(0x420)](),_0x1c7755[_0x29acbe(0x431)][_0x29acbe(0x260)][_0x29acbe(0x48e)](this);}},VisuMZ['SkillsStatesCore'][_0x5e012b(0x2c8)]=Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x39f)],Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x39f)]=function(_0x2aea0d,_0xc2d168){const _0xfb1916=_0x5e012b;VisuMZ['SkillsStatesCore'][_0xfb1916(0x2c8)][_0xfb1916(0x48e)](this,_0x2aea0d,_0xc2d168);if(this['isBuffAffected'](_0x2aea0d)){if(_0xfb1916(0x3fd)!==_0xfb1916(0x309))this[_0xfb1916(0x401)](_0x2aea0d,_0xc2d168);else{const _0x57fd07=_0x2de1d0['CalcJS'][_0xfb1916(0x48e)](_0xfa4cd2,_0x482e09);return _0x260dbb[_0xfb1916(0x2ad)][_0xfb1916(0x48e)](_0x44330c,_0x5058e3,_0x57fd07,_0x1e0d18);}}},Game_Battler['prototype']['isBuffPrevented']=function(_0x35e1ea){},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x2bf)]=Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x403)],Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x403)]=function(_0x5c169d,_0x6f7808){const _0x57fec9=_0x5e012b;VisuMZ[_0x57fec9(0x431)][_0x57fec9(0x2bf)][_0x57fec9(0x48e)](this,_0x5c169d,_0x6f7808),this[_0x57fec9(0x450)](_0x5c169d)&&this['onAddDebuff'](_0x5c169d,_0x6f7808);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x2bc)]=function(){const _0x3028fd=_0x5e012b;for(let _0x33e334=0x0;_0x33e334<this[_0x3028fd(0x50a)]();_0x33e334++){if(this[_0x3028fd(0x327)](_0x33e334)){if(_0x3028fd(0x291)!==_0x3028fd(0x239)){const _0x1021e5=this[_0x3028fd(0x3d5)][_0x33e334];this['removeBuff'](_0x33e334);if(_0x1021e5>0x0)this[_0x3028fd(0x491)](_0x33e334);if(_0x1021e5<0x0)this[_0x3028fd(0x219)](_0x33e334);}else{if(!this[_0x3028fd(0x4b3)](_0x488e88))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x1a0eec))return![];if(!this['meetsPassiveStateConditionJS'](_0x3e5ef3))return![];if(!this[_0x3028fd(0x2bb)](_0x28794c))return![];return!![];}}}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x401)]=function(_0xd89b6c,_0xf32ef4){const _0x39504c=_0x5e012b;this[_0x39504c(0x2cb)](_0xd89b6c,_0xf32ef4);},Game_Battler['prototype'][_0x5e012b(0x3b5)]=function(_0x52779f,_0x3055c0){const _0x590da7=_0x5e012b;this[_0x590da7(0x202)](_0x52779f,_0x3055c0);},Game_Battler['prototype'][_0x5e012b(0x3b7)]=function(_0x2c5067){const _0x3fe7a4=_0x5e012b;Game_BattlerBase[_0x3fe7a4(0x2ea)]['onEraseBuff'][_0x3fe7a4(0x48e)](this,_0x2c5067),this['onEraseBuffGlobalJS'](_0x2c5067);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x29d)]=function(_0x26d171){const _0x117f04=_0x5e012b;Game_BattlerBase[_0x117f04(0x2ea)][_0x117f04(0x29d)][_0x117f04(0x48e)](this,_0x26d171),this[_0x117f04(0x41f)](_0x26d171);},Game_Battler[_0x5e012b(0x2ea)]['onExpireBuff']=function(_0x277c49){this['onExpireBuffGlobalJS'](_0x277c49);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x219)]=function(_0x15c3ae){const _0x2dc06d=_0x5e012b;this[_0x2dc06d(0x4b1)](_0x15c3ae);},Game_Battler[_0x5e012b(0x2ea)]['onAddBuffGlobalJS']=function(_0x27498c,_0x3d77ed){const _0x5afe2e=_0x5e012b;VisuMZ[_0x5afe2e(0x431)][_0x5afe2e(0x2ac)]['Buffs'][_0x5afe2e(0x2c0)][_0x5afe2e(0x48e)](this,_0x27498c,_0x3d77ed);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x202)]=function(_0x3d99ca,_0x44bc37){const _0x4d12d0=_0x5e012b;VisuMZ[_0x4d12d0(0x431)]['Settings'][_0x4d12d0(0x35d)][_0x4d12d0(0x2a8)][_0x4d12d0(0x48e)](this,_0x3d99ca,_0x44bc37);},Game_BattlerBase[_0x5e012b(0x2ea)]['onEraseBuffGlobalJS']=function(_0x334c78){const _0x67d47e=_0x5e012b;VisuMZ[_0x67d47e(0x431)][_0x67d47e(0x2ac)]['Buffs']['onEraseBuffJS']['call'](this,_0x334c78);},Game_BattlerBase[_0x5e012b(0x2ea)]['onEraseDebuffGlobalJS']=function(_0x1349c2){const _0x3881d6=_0x5e012b;VisuMZ[_0x3881d6(0x431)]['Settings'][_0x3881d6(0x35d)]['onEraseDebuffJS'][_0x3881d6(0x48e)](this,_0x1349c2);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x1ee)]=function(_0x2885ce){const _0x191c4d=_0x5e012b;VisuMZ[_0x191c4d(0x431)][_0x191c4d(0x2ac)][_0x191c4d(0x35d)][_0x191c4d(0x2d8)][_0x191c4d(0x48e)](this,_0x2885ce);},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x4b1)]=function(_0x3f4dfb){const _0x4ee6d0=_0x5e012b;VisuMZ['SkillsStatesCore']['Settings'][_0x4ee6d0(0x35d)][_0x4ee6d0(0x49b)][_0x4ee6d0(0x48e)](this,_0x3f4dfb);},Game_Battler['prototype'][_0x5e012b(0x1fa)]=function(_0x16066a){const _0x55f1d7=_0x5e012b,_0x41098c=VisuMZ[_0x55f1d7(0x431)],_0x4c04b2=[_0x55f1d7(0x4fa),_0x55f1d7(0x3da),_0x55f1d7(0x3e2),_0x55f1d7(0x3d2),_0x55f1d7(0x3d9),_0x55f1d7(0x4a0)];for(const _0xf392b1 of _0x4c04b2){if(_0x55f1d7(0x513)!=='nldNZ'){if(_0x41098c[_0xf392b1][_0x16066a]){if('gqXlF'===_0x55f1d7(0x44c)){const _0x5bb705=_0x469fc8(_0x21d4ce['$1'])['split'](',')[_0x55f1d7(0x332)](_0x4143e6=>_0x4143e6[_0x55f1d7(0x229)]()),_0x13645d=_0x2a7f4b[_0x55f1d7(0x431)][_0x55f1d7(0x45f)](_0x5bb705);let _0x597c47=[this[_0x55f1d7(0x28f)]()];return _0x2e5678[_0x55f1d7(0x455)]&&this[_0x55f1d7(0x4c4)]&&(_0x597c47=this[_0x55f1d7(0x4c4)]()),_0x13645d[_0x55f1d7(0x3ae)](_0x2f0e4d=>_0x597c47[_0x55f1d7(0x2c6)](_0x2f0e4d))['length']>0x0;}else _0x41098c[_0xf392b1][_0x16066a]['call'](this,_0x16066a);}}else this[_0x55f1d7(0x34e)][_0x55f1d7(0x4f9)]=_0x22087e;}},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x385)]=Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x4d9)],Game_Battler[_0x5e012b(0x2ea)]['regenerateAll']=function(){const _0x3b2c9f=_0x5e012b;this[_0x3b2c9f(0x1ff)](),VisuMZ[_0x3b2c9f(0x431)][_0x3b2c9f(0x385)][_0x3b2c9f(0x48e)](this),this[_0x3b2c9f(0x498)](),this['regenerateAllSkillsStatesCore']();},Game_Battler['prototype'][_0x5e012b(0x498)]=function(){const _0x162a3a=_0x5e012b;for(const _0x240ea3 of this[_0x162a3a(0x377)]()){if(_0x162a3a(0x473)!==_0x162a3a(0x473))for(const _0x5a4452 of _0xb51251){_0x5a4452['match'](_0x3caaba);const _0x987ebe=_0x166e5c(_0x153857['$1'])[_0x162a3a(0x45e)](',')[_0x162a3a(0x332)](_0x1221f4=>_0x49a515(_0x1221f4)[_0x162a3a(0x2f0)]()[_0x162a3a(0x229)]());_0x1b6e92=_0x389e3c['concat'](_0x987ebe);}else{if(!_0x240ea3)continue;this['onAddStateMakeCustomSlipValues'](_0x240ea3['id']);}}},Game_Battler[_0x5e012b(0x2ea)][_0x5e012b(0x1ff)]=function(){const _0x59ce5d=_0x5e012b;for(const _0x2b459f of this[_0x59ce5d(0x3b3)]()){if(!_0x2b459f)continue;_0x2b459f[_0x59ce5d(0x37b)]['match'](/<JS SLIP REFRESH>/i)&&('bcSFO'!==_0x59ce5d(0x388)?this['_statusWindow'][_0x59ce5d(0x30f)](this[_0x59ce5d(0x387)]()):this['onAddStateMakeCustomSlipValues'](_0x2b459f['id']));}},Game_Battler[_0x5e012b(0x2ea)]['regenerateAllSkillsStatesCore']=function(){const _0x5ad9dd=_0x5e012b;if(!this[_0x5ad9dd(0x2cd)]())return;const _0x934b12=this[_0x5ad9dd(0x3b3)]();for(const _0x48d1a2 of _0x934b12){if(_0x5ad9dd(0x375)==='avSdK'){if(!_0x48d1a2)continue;this[_0x5ad9dd(0x526)](_0x48d1a2);}else _0x1f0fb3[_0x5ad9dd(0x26a)]((_0x3ce885,_0x5d4bd5)=>{const _0x240793=_0x5ad9dd,_0x1dc6d3=_0x3ce885[_0x240793(0x303)],_0x82aafa=_0x5d4bd5[_0x240793(0x303)];if(_0x1dc6d3!==_0x82aafa)return _0x82aafa-_0x1dc6d3;return _0x3ce885-_0x5d4bd5;});}},Game_Battler['prototype'][_0x5e012b(0x526)]=function(_0x5cd38c){const _0x32c364=_0x5e012b,_0x19ee27=this[_0x32c364(0x443)](_0x5cd38c['id'],_0x32c364(0x22d))||0x0,_0x8173e4=-this[_0x32c364(0x2b5)](),_0x3d8e35=Math[_0x32c364(0x440)](_0x19ee27,_0x8173e4);if(_0x3d8e35!==0x0){if(_0x32c364(0x27b)===_0x32c364(0x360)){const _0x3f8c6f=_0x254331[_0x32c364(0x4c9)][_0x32c364(0x48e)](this,_0x399e41);_0x598819[_0x32c364(0x4b6)]['call'](this,_0x273fb1,_0x3f8c6f);}else{const _0x1b94a1=this['_result']['hpDamage']||0x0;this[_0x32c364(0x467)](_0x3d8e35),this[_0x32c364(0x3bc)]['hpDamage']+=_0x1b94a1;}}const _0x5ca792=this['getStateData'](_0x5cd38c['id'],'slipMp')||0x0;if(_0x5ca792!==0x0){if(_0x32c364(0x213)==='NSoxF'){const _0x179847=this[_0x32c364(0x3bc)][_0x32c364(0x4bd)]||0x0;this[_0x32c364(0x232)](_0x5ca792),this[_0x32c364(0x3bc)][_0x32c364(0x4bd)]+=_0x179847;}else{const _0x4a8bd9=_0x6ea8e(_0x33b624['$1']);_0x4a8bd9<_0x74cbf5?(_0x17201b(_0x32c364(0x1fc)['format'](_0x2d6830,_0x4a8bd9,_0x1d21bf)),_0x4743d4[_0x32c364(0x210)]()):_0x104923=_0x1464d5['max'](_0x4a8bd9,_0x1eb97d);}}const _0x5e4588=this[_0x32c364(0x443)](_0x5cd38c['id'],_0x32c364(0x298))||0x0;if(_0x5e4588!==0x0){if(_0x32c364(0x494)===_0x32c364(0x508))return _0x51e3d0[_0x32c364(0x528)]()-0x6;else this[_0x32c364(0x28c)](_0x5e4588);}},VisuMZ['SkillsStatesCore'][_0x5e012b(0x52a)]=Game_Actor[_0x5e012b(0x2ea)]['skillTypes'],Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x42b)]=function(){const _0x562230=_0x5e012b,_0x572da7=VisuMZ[_0x562230(0x431)][_0x562230(0x52a)][_0x562230(0x48e)](this),_0x759d25=VisuMZ[_0x562230(0x431)][_0x562230(0x2ac)][_0x562230(0x46b)];let _0x3a41dc=_0x759d25[_0x562230(0x3e0)];if($gameParty[_0x562230(0x380)]()){if('ZnLgg'!==_0x562230(0x2b9))return!![];else _0x3a41dc=_0x3a41dc[_0x562230(0x294)](_0x759d25[_0x562230(0x4ca)]);}return _0x572da7[_0x562230(0x3ae)](_0x137a37=>!_0x3a41dc[_0x562230(0x2c6)](_0x137a37));},Game_Actor[_0x5e012b(0x2ea)]['usableSkills']=function(){const _0x8ae3a7=_0x5e012b;return this['skills']()[_0x8ae3a7(0x3ae)](_0x2f2097=>this[_0x8ae3a7(0x507)](_0x2f2097));},Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x507)]=function(_0x2bb9ae){const _0x2bf2f=_0x5e012b;if(!this[_0x2bf2f(0x3e9)](_0x2bb9ae))return![];if(!_0x2bb9ae)return![];if(!this[_0x2bf2f(0x383)](_0x2bb9ae))return![];if(this['isSkillHidden'](_0x2bb9ae))return![];return!![];},Game_Actor[_0x5e012b(0x2ea)]['isSkillTypeMatchForUse']=function(_0x17c0bf){const _0x5e7ea8=_0x5e012b,_0x590392=this[_0x5e7ea8(0x42b)](),_0x4d8057=DataManager[_0x5e7ea8(0x23a)](_0x17c0bf),_0x26fb9f=_0x590392[_0x5e7ea8(0x3ae)](_0xea123=>_0x4d8057[_0x5e7ea8(0x2c6)](_0xea123));return _0x26fb9f[_0x5e7ea8(0x2dc)]>0x0;},Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x46f)]=function(_0x50f811){const _0x16ce68=_0x5e012b;if(!VisuMZ[_0x16ce68(0x431)]['CheckVisibleBattleNotetags'](this,_0x50f811))return!![];if(!VisuMZ[_0x16ce68(0x431)][_0x16ce68(0x372)](this,_0x50f811))return!![];if(!VisuMZ[_0x16ce68(0x431)][_0x16ce68(0x31f)](this,_0x50f811))return!![];return![];},Game_Actor[_0x5e012b(0x2ea)]['passiveStateObjects']=function(){const _0x28a62b=_0x5e012b;let _0x431616=[this[_0x28a62b(0x44a)](),this['currentClass']()];_0x431616=_0x431616[_0x28a62b(0x294)](this[_0x28a62b(0x21a)]()[_0x28a62b(0x3ae)](_0x1596f4=>_0x1596f4));for(const _0x57570a of this[_0x28a62b(0x476)]){const _0x5a2795=$dataSkills[_0x57570a];if(_0x5a2795)_0x431616['push'](_0x5a2795);}return _0x431616;},Game_Actor[_0x5e012b(0x2ea)]['addPassiveStatesByPluginParameters']=function(){const _0x1ec781=_0x5e012b;Game_Battler[_0x1ec781(0x2ea)][_0x1ec781(0x4d5)][_0x1ec781(0x48e)](this);const _0x509cf8=VisuMZ['SkillsStatesCore'][_0x1ec781(0x2ac)][_0x1ec781(0x363)][_0x1ec781(0x30a)];this[_0x1ec781(0x3a6)][_0x1ec781(0x377)]=this[_0x1ec781(0x3a6)][_0x1ec781(0x377)][_0x1ec781(0x294)](_0x509cf8);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x253)]=Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x2e0)],Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x2e0)]=function(_0x211f36){const _0x3045fe=_0x5e012b;VisuMZ[_0x3045fe(0x431)]['Game_Actor_learnSkill']['call'](this,_0x211f36),this['_cache']={};},VisuMZ[_0x5e012b(0x431)]['Game_Actor_forgetSkill']=Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x3e1)],Game_Actor[_0x5e012b(0x2ea)][_0x5e012b(0x3e1)]=function(_0x373023){const _0x59274e=_0x5e012b;VisuMZ[_0x59274e(0x431)][_0x59274e(0x490)][_0x59274e(0x48e)](this,_0x373023),this[_0x59274e(0x3a6)]={};},Game_Actor['prototype'][_0x5e012b(0x226)]=function(){const _0x47858e=_0x5e012b;return VisuMZ[_0x47858e(0x431)][_0x47858e(0x2ac)][_0x47858e(0x2a5)][_0x47858e(0x469)]??0x14;},Game_Enemy[_0x5e012b(0x2ea)]['passiveStateObjects']=function(){const _0x227792=_0x5e012b;let _0x3d2ad9=[this['enemy']()];return _0x3d2ad9[_0x227792(0x294)](this[_0x227792(0x344)]());},Game_Enemy['prototype'][_0x5e012b(0x4d5)]=function(){const _0x14de4c=_0x5e012b;Game_Battler['prototype'][_0x14de4c(0x4d5)][_0x14de4c(0x48e)](this);const _0x630ee4=VisuMZ[_0x14de4c(0x431)][_0x14de4c(0x2ac)][_0x14de4c(0x363)]['Enemy'];this['_cache']['passiveStates']=this[_0x14de4c(0x3a6)][_0x14de4c(0x377)][_0x14de4c(0x294)](_0x630ee4);},Game_Enemy[_0x5e012b(0x2ea)][_0x5e012b(0x344)]=function(){const _0x5461df=_0x5e012b,_0x865e3f=[];for(const _0x3b9ce1 of this[_0x5461df(0x336)]()[_0x5461df(0x45c)]){const _0x1cffb0=$dataSkills[_0x3b9ce1['skillId']];if(_0x1cffb0&&!_0x865e3f[_0x5461df(0x2c6)](_0x1cffb0))_0x865e3f['push'](_0x1cffb0);}return _0x865e3f;},Game_Enemy[_0x5e012b(0x2ea)][_0x5e012b(0x3aa)]=function(_0x589af3){const _0x3ae000=_0x5e012b;return this[_0x3ae000(0x282)]($dataStates[_0x589af3]);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x264)]=Game_Unit[_0x5e012b(0x2ea)][_0x5e012b(0x3d8)],Game_Unit[_0x5e012b(0x2ea)][_0x5e012b(0x3d8)]=function(){const _0x182eb3=_0x5e012b;if(this[_0x182eb3(0x30d)]())return!![];return VisuMZ['SkillsStatesCore'][_0x182eb3(0x264)][_0x182eb3(0x48e)](this);},Game_Unit[_0x5e012b(0x2ea)][_0x5e012b(0x30d)]=function(){const _0x16ea78=_0x5e012b,_0x49661e=this['aliveMembers']();for(const _0x164eb6 of _0x49661e){if(_0x16ea78(0x442)!==_0x16ea78(0x532)){if(!_0x164eb6[_0x16ea78(0x522)]())return![];}else return _0x164edd[_0x16ea78(0x431)][_0x16ea78(0x2ac)][_0x16ea78(0x2a5)][_0x16ea78(0x3cc)];}return!![];},VisuMZ['SkillsStatesCore'][_0x5e012b(0x269)]=Game_Troop['prototype'][_0x5e012b(0x350)],Game_Troop[_0x5e012b(0x2ea)][_0x5e012b(0x350)]=function(_0x1e72e6){const _0x48d663=_0x5e012b;VisuMZ[_0x48d663(0x431)][_0x48d663(0x269)][_0x48d663(0x48e)](this,_0x1e72e6),this['makeCurrentTroopUniqueID']();},Game_Troop[_0x5e012b(0x2ea)]['makeCurrentTroopUniqueID']=function(){const _0x3642f6=_0x5e012b;this[_0x3642f6(0x24f)]=Graphics[_0x3642f6(0x47a)];},Game_Troop[_0x5e012b(0x2ea)][_0x5e012b(0x3fa)]=function(){const _0x5a97ab=_0x5e012b;return this['_currentTroopUniqueID']=this[_0x5a97ab(0x24f)]||Graphics['frameCount'],this[_0x5a97ab(0x24f)];},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x246)]=function(){const _0x415f94=_0x5e012b;if(ConfigManager[_0x415f94(0x521)]&&ConfigManager[_0x415f94(0x23e)]!==undefined)return _0x415f94(0x1f1)!==_0x415f94(0x1f1)?_0x1fc1f4[_0x415f94(0x305)]()[_0x3c0b0e(_0x5afaee['$1'])]:ConfigManager['uiHelpPosition'];else{if(this[_0x415f94(0x3f6)]()){if('qpmfl'==='rAwNf')this[_0x415f94(0x24f)]=_0x4521f0[_0x415f94(0x47a)];else return this[_0x415f94(0x50f)]()[_0x415f94(0x31c)](/LOWER/i);}else{if('xfzkY'!=='qUmyl')Scene_ItemBase[_0x415f94(0x2ea)][_0x415f94(0x233)]['call'](this);else return _0x5f10dd[_0x415f94(0x431)][_0x415f94(0x2ac)][_0x415f94(0x2a5)][_0x415f94(0x4a2)];}}},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x233)]=function(){const _0x41aa60=_0x5e012b;if(ConfigManager[_0x41aa60(0x521)]&&ConfigManager[_0x41aa60(0x330)]!==undefined)return ConfigManager[_0x41aa60(0x330)];else return this[_0x41aa60(0x3f6)]()?this[_0x41aa60(0x50f)]()[_0x41aa60(0x31c)](/RIGHT/i):Scene_ItemBase['prototype'][_0x41aa60(0x233)][_0x41aa60(0x48e)](this);},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x50f)]=function(){const _0x1fbeb1=_0x5e012b;return VisuMZ['SkillsStatesCore'][_0x1fbeb1(0x2ac)]['Skills'][_0x1fbeb1(0x4c0)];},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x2ae)]=function(){const _0x3a9b08=_0x5e012b;return this[_0x3a9b08(0x506)]&&this[_0x3a9b08(0x506)][_0x3a9b08(0x2ae)]();},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x3f6)]=function(){const _0x388a9d=_0x5e012b;return VisuMZ[_0x388a9d(0x431)]['Settings'][_0x388a9d(0x46b)][_0x388a9d(0x26c)];},VisuMZ['SkillsStatesCore'][_0x5e012b(0x25b)]=Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x4b2)],Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x4b2)]=function(){const _0x4ae9c7=_0x5e012b;if(this[_0x4ae9c7(0x3f6)]())return _0x4ae9c7(0x2a1)==='aAVIo'?this['helpWindowRectSkillsStatesCore']():'<actor-%1>'[_0x4ae9c7(0x39e)](_0x279fed[_0x4ae9c7(0x392)]());else{if('xApSb'===_0x4ae9c7(0x4d1)){const _0xbae250=_0x139bd1[_0x4ae9c7(0x320)]('['+_0x27a9f4['$1'][_0x4ae9c7(0x31c)](/\d+/g)+']');for(const _0x95a49e of _0xbae250){if(!_0x214c16['value'](_0x95a49e))return![];}return!![];}else return VisuMZ[_0x4ae9c7(0x431)][_0x4ae9c7(0x25b)][_0x4ae9c7(0x48e)](this);}},Scene_Skill['prototype'][_0x5e012b(0x275)]=function(){const _0x140456=_0x5e012b,_0x1d1b6a=0x0,_0x31fe97=this['helpAreaTop'](),_0x909b75=Graphics[_0x140456(0x49e)],_0x3a365e=this[_0x140456(0x3c4)]();return new Rectangle(_0x1d1b6a,_0x31fe97,_0x909b75,_0x3a365e);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x315)]=Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x527)],Scene_Skill['prototype'][_0x5e012b(0x527)]=function(){const _0x449768=_0x5e012b;if(this[_0x449768(0x3f6)]()){if('mPRat'===_0x449768(0x418))return this[_0x449768(0x493)]();else{const _0x258add=_0x5f35c9[_0x449768(0x431)][_0x449768(0x2ac)][_0x449768(0x412)];return _0x258add[_0x449768(0x310)]===_0x449768(0x279)?_0x585e87[_0x449768(0x504)]():_0x136e70[_0x449768(0x38c)]();}}else return VisuMZ['SkillsStatesCore'][_0x449768(0x315)][_0x449768(0x48e)](this);},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x493)]=function(){const _0x50083c=_0x5e012b,_0x41c2fa=this[_0x50083c(0x38e)](),_0x5e11c0=this[_0x50083c(0x4bc)](0x3,!![]),_0x222f79=this[_0x50083c(0x233)]()?Graphics[_0x50083c(0x49e)]-_0x41c2fa:0x0,_0xc8d198=this[_0x50083c(0x523)]();return new Rectangle(_0x222f79,_0xc8d198,_0x41c2fa,_0x5e11c0);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x4c5)]=Scene_Skill[_0x5e012b(0x2ea)]['statusWindowRect'],Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x1f7)]=function(){const _0x27293e=_0x5e012b;return this[_0x27293e(0x3f6)]()?this[_0x27293e(0x3ab)]():VisuMZ['SkillsStatesCore'][_0x27293e(0x4c5)][_0x27293e(0x48e)](this);},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x3ab)]=function(){const _0x2ca1a7=_0x5e012b,_0x40e394=Graphics[_0x2ca1a7(0x49e)]-this[_0x2ca1a7(0x38e)](),_0x4dfd35=this[_0x2ca1a7(0x297)][_0x2ca1a7(0x347)],_0x3d8eb5=this[_0x2ca1a7(0x233)]()?0x0:Graphics[_0x2ca1a7(0x49e)]-_0x40e394,_0x3c45ee=this[_0x2ca1a7(0x523)]();return new Rectangle(_0x3d8eb5,_0x3c45ee,_0x40e394,_0x4dfd35);},VisuMZ[_0x5e012b(0x431)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x5e012b(0x2ea)]['createItemWindow'],Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x4c1)]=function(){const _0x24d6d9=_0x5e012b;VisuMZ['SkillsStatesCore'][_0x24d6d9(0x2fe)]['call'](this);if(this[_0x24d6d9(0x4ef)]()){if(_0x24d6d9(0x3ad)===_0x24d6d9(0x3ad))this[_0x24d6d9(0x487)]();else{if(!_0x19fc5c)return _0x42f318['SkillsStatesCore'][_0x24d6d9(0x21f)][_0x24d6d9(0x48e)](this,_0x3a9267);if(!this[_0x24d6d9(0x44d)](_0x345b6d))return![];if(!this[_0x24d6d9(0x296)](_0x37ae19))return![];if(!this['checkShowHideJS'](_0xb3058e))return![];return!![];}}},VisuMZ[_0x5e012b(0x431)]['Scene_Skill_itemWindowRect']=Scene_Skill[_0x5e012b(0x2ea)]['itemWindowRect'],Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x2d3)]=function(){const _0x5cec24=_0x5e012b;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x5cec24(0x49f)!==_0x5cec24(0x50e))return this[_0x5cec24(0x37e)]();else for(const _0x475670 of _0x2298f8){let _0x397569=0x0,_0x29af3e=0x0;if(_0x475670[_0x5cec24(0x31c)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x397569=_0x374e6a(_0x4cf91e['$1']),_0x29af3e=_0x20c313(_0x44535d['$2']);else _0x475670[_0x5cec24(0x31c)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x397569=_0x25ce91[_0x5cec24(0x4e5)](_0x58304b['$1']),_0x29af3e=_0x49a323(_0x44a875['$2']));_0x5c7cb4['setStateTurns'](_0x397569,_0x29af3e),this[_0x5cec24(0x4ee)](_0xc9814a);}}else{const _0x2efa6d=VisuMZ[_0x5cec24(0x431)][_0x5cec24(0x51f)]['call'](this);return this['allowCreateShopStatusWindow']()&&this['adjustItemWidthByShopStatus']()&&(_0x2efa6d[_0x5cec24(0x449)]-=this[_0x5cec24(0x3b1)]()),_0x2efa6d;}},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x37e)]=function(){const _0x452f22=_0x5e012b,_0x4c2a4d=Graphics[_0x452f22(0x49e)]-this[_0x452f22(0x3b1)](),_0x52a717=this['mainAreaHeight']()-this[_0x452f22(0x334)][_0x452f22(0x347)],_0x3c7f82=this[_0x452f22(0x233)]()?Graphics[_0x452f22(0x49e)]-_0x4c2a4d:0x0,_0x45a41e=this[_0x452f22(0x334)]['y']+this[_0x452f22(0x334)][_0x452f22(0x347)];return new Rectangle(_0x3c7f82,_0x45a41e,_0x4c2a4d,_0x52a717);},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x4ef)]=function(){const _0x1ba729=_0x5e012b;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else{if(this[_0x1ba729(0x3f6)]()){if('yMmJB'!==_0x1ba729(0x4da))return!![];else{if(_0x2c5771[_0x1ba729(0x3e6)])this[_0x1ba729(0x242)]();}}else return'KkIyZ'!==_0x1ba729(0x51d)?_0x5f0b48[_0x1ba729(0x4fc)]?_0x2009f8[_0x1ba729(0x2ea)][_0x1ba729(0x2dd)]():0x0:VisuMZ[_0x1ba729(0x431)]['Settings']['Skills'][_0x1ba729(0x2e8)];}},Scene_Skill[_0x5e012b(0x2ea)]['adjustItemWidthByShopStatus']=function(){const _0x37efa6=_0x5e012b;return VisuMZ['SkillsStatesCore'][_0x37efa6(0x2ac)][_0x37efa6(0x46b)][_0x37efa6(0x4e8)];},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x487)]=function(){const _0x22c928=_0x5e012b,_0x3281a7=this[_0x22c928(0x48c)]();this[_0x22c928(0x274)]=new Window_ShopStatus(_0x3281a7),this[_0x22c928(0x265)](this[_0x22c928(0x274)]),this['_itemWindow'][_0x22c928(0x201)](this['_shopStatusWindow']);const _0x528d58=VisuMZ[_0x22c928(0x431)][_0x22c928(0x2ac)]['Skills'][_0x22c928(0x237)];this[_0x22c928(0x274)][_0x22c928(0x2b0)](_0x528d58||0x0);},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x48c)]=function(){const _0x3a8237=_0x5e012b;return this[_0x3a8237(0x3f6)]()?this[_0x3a8237(0x32c)]():VisuMZ[_0x3a8237(0x431)][_0x3a8237(0x2ac)][_0x3a8237(0x46b)][_0x3a8237(0x4db)][_0x3a8237(0x48e)](this);},Scene_Skill['prototype'][_0x5e012b(0x32c)]=function(){const _0x3dacbe=_0x5e012b,_0x2e84f2=this[_0x3dacbe(0x3b1)](),_0x1baed7=this[_0x3dacbe(0x4f6)][_0x3dacbe(0x347)],_0x5e22b1=this[_0x3dacbe(0x233)]()?0x0:Graphics[_0x3dacbe(0x49e)]-this['shopStatusWidth'](),_0x427085=this[_0x3dacbe(0x4f6)]['y'];return new Rectangle(_0x5e22b1,_0x427085,_0x2e84f2,_0x1baed7);},Scene_Skill[_0x5e012b(0x2ea)][_0x5e012b(0x3b1)]=function(){const _0x4c4693=_0x5e012b;if(Imported['VisuMZ_1_ItemsEquipsCore'])return Scene_Shop[_0x4c4693(0x2ea)][_0x4c4693(0x2dd)]();else{if('qJVSk'!==_0x4c4693(0x4f0))_0x11de6d['SkillsStatesCore']['Sprite_StateIcon_updateFrame'][_0x4c4693(0x48e)](this),this[_0x4c4693(0x225)]();else return 0x0;}},Scene_Skill['prototype'][_0x5e012b(0x38d)]=function(){const _0x477d74=_0x5e012b;return this['_skillTypeWindow']&&this['_skillTypeWindow']['active']?TextManager[_0x477d74(0x2f5)]:'';},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x379)]=Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x2c1)],Sprite_Gauge[_0x5e012b(0x2ea)]['initMembers']=function(){const _0x437a85=_0x5e012b;VisuMZ['SkillsStatesCore'][_0x437a85(0x379)][_0x437a85(0x48e)](this),this[_0x437a85(0x230)]=null;},VisuMZ['SkillsStatesCore'][_0x5e012b(0x4ec)]=Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x350)],Sprite_Gauge['prototype']['setup']=function(_0x35ee55,_0x27f886){const _0x535f02=_0x5e012b;this['setupSkillsStatesCore'](_0x35ee55,_0x27f886),_0x27f886=_0x27f886['toLowerCase'](),VisuMZ['SkillsStatesCore'][_0x535f02(0x4ec)]['call'](this,_0x35ee55,_0x27f886);},Sprite_Gauge['prototype']['setupSkillsStatesCore']=function(_0x818a04,_0x435525){const _0x2a88d1=_0x5e012b,_0x11b0dc=VisuMZ[_0x2a88d1(0x431)][_0x2a88d1(0x2ac)]['Costs'][_0x2a88d1(0x3ae)](_0x23e85e=>_0x23e85e[_0x2a88d1(0x407)][_0x2a88d1(0x2f0)]()===_0x435525[_0x2a88d1(0x2f0)]());_0x11b0dc[_0x2a88d1(0x2dc)]>=0x1?this[_0x2a88d1(0x230)]=_0x11b0dc[0x0]:this[_0x2a88d1(0x230)]=null;},VisuMZ['SkillsStatesCore']['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x472)],Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x472)]=function(){const _0xf88b87=_0x5e012b;if(this[_0xf88b87(0x446)]&&this[_0xf88b87(0x230)]){if(_0xf88b87(0x31a)===_0xf88b87(0x31a))return this[_0xf88b87(0x25e)]();else{const _0x526d48=this[_0xf88b87(0x2b1)](_0x2dc29e);return _0x526d48[_0xf88b87(0x2dc)];}}else return VisuMZ[_0xf88b87(0x431)]['Sprite_Gauge_currentValue'][_0xf88b87(0x48e)](this);},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x25e)]=function(){const _0x5c95ea=_0x5e012b;return this['_costSettings'][_0x5c95ea(0x205)]['call'](this[_0x5c95ea(0x446)]);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x468)]=Sprite_Gauge[_0x5e012b(0x2ea)]['currentMaxValue'],Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x399)]=function(){const _0x4e6dc4=_0x5e012b;if(this[_0x4e6dc4(0x446)]&&this['_costSettings'])return this[_0x4e6dc4(0x47f)]();else{if('NbZJQ'===_0x4e6dc4(0x351)){const _0x2e399e=_0x198038[_0x4e6dc4(0x431)][_0x4e6dc4(0x2ac)][_0x4e6dc4(0x35d)][_0x4e6dc4(0x339)];this[_0x4e6dc4(0x512)][_0x20bfc9]=_0x38fe1c[_0x4e6dc4(0x441)](0x0,_0x2e399e);}else return VisuMZ['SkillsStatesCore'][_0x4e6dc4(0x468)][_0x4e6dc4(0x48e)](this);}},Sprite_Gauge['prototype']['currentMaxValueSkillsStatesCore']=function(){const _0x340e36=_0x5e012b;return this['_costSettings'][_0x340e36(0x489)]['call'](this['_battler']);},VisuMZ['SkillsStatesCore'][_0x5e012b(0x287)]=Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x2d7)],Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x2d7)]=function(){const _0x48c2d9=_0x5e012b,_0x5e7447=VisuMZ[_0x48c2d9(0x431)][_0x48c2d9(0x287)][_0x48c2d9(0x48e)](this);return _0x5e7447[_0x48c2d9(0x441)](0x0,0x1);},VisuMZ[_0x5e012b(0x431)]['Sprite_Gauge_redraw']=Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x395)],Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x395)]=function(){const _0x8709cd=_0x5e012b;if(this[_0x8709cd(0x446)]&&this[_0x8709cd(0x230)]){if(_0x8709cd(0x427)!==_0x8709cd(0x427)){for(_0x47bf27 of _0x4bb2fe[_0x8709cd(0x431)]['Settings'][_0x8709cd(0x2e2)]){if(_0x365d81[_0x8709cd(0x407)][_0x8709cd(0x2f0)]()==='MP')return _0x4d5db9[_0x8709cd(0x4c9)][_0x8709cd(0x48e)](this,_0x2dc7a3);}return _0x148937['SkillsStatesCore']['Game_BattlerBase_skillMpCost'][_0x8709cd(0x48e)](this,_0x434a54);}else this['bitmap'][_0x8709cd(0x4f8)](),this[_0x8709cd(0x371)]();}else VisuMZ[_0x8709cd(0x431)]['Sprite_Gauge_redraw'][_0x8709cd(0x48e)](this);},Sprite_Gauge[_0x5e012b(0x2ea)]['currentDisplayedValue']=function(){const _0x507cbe=_0x5e012b;let _0x1bd478=this['currentValue']();if(Imported['VisuMZ_0_CoreEngine']&&this[_0x507cbe(0x258)]()){if('cWTtd'!==_0x507cbe(0x41e)){for(_0x248518 of _0x27524e['SkillsStatesCore'][_0x507cbe(0x2ac)][_0x507cbe(0x2e2)]){const _0x404b1e=_0x11c0f7[_0x507cbe(0x4c9)][_0x507cbe(0x48e)](this,_0x227175);if(!_0x31578e[_0x507cbe(0x4ab)][_0x507cbe(0x48e)](this,_0x5ddefa,_0x404b1e))return![];}return!![];}else _0x1bd478=VisuMZ[_0x507cbe(0x42d)](_0x1bd478);}return _0x1bd478;},Sprite_Gauge['prototype'][_0x5e012b(0x371)]=function(){const _0xc83dbc=_0x5e012b;this[_0xc83dbc(0x230)]['GaugeDrawJS'][_0xc83dbc(0x48e)](this);},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x4b8)]=function(_0x105d3a,_0x2c4fae,_0x9efe0d,_0xb113e,_0x2c8a4b,_0x4f89b3){const _0x5c054e=_0x5e012b,_0x10d49c=this[_0x5c054e(0x2d7)](),_0x13443b=Math[_0x5c054e(0x46a)]((_0x2c8a4b-0x2)*_0x10d49c),_0x1b1aa5=_0x4f89b3-0x2,_0x1798f9=this[_0x5c054e(0x52c)]();this[_0x5c054e(0x2c7)]['fillRect'](_0x9efe0d,_0xb113e,_0x2c8a4b,_0x4f89b3,_0x1798f9),this[_0x5c054e(0x2c7)]['gradientFillRect'](_0x9efe0d+0x1,_0xb113e+0x1,_0x13443b,_0x1b1aa5,_0x105d3a,_0x2c4fae);},Sprite_Gauge['prototype'][_0x5e012b(0x3ed)]=function(){const _0xab5d59=_0x5e012b,_0x10f17f=VisuMZ[_0xab5d59(0x431)][_0xab5d59(0x2ac)]['Gauge'];if(_0x10f17f[_0xab5d59(0x2cc)]==='number'){if('zzTyp'===_0xab5d59(0x3f9)){const _0x48e5e4=_0x57923d[_0x29d6a8];if(_0x48e5e4)_0x51d66c['push'](_0x48e5e4);}else return $gameSystem[_0xab5d59(0x504)]();}else{if('YUhoy'!==_0xab5d59(0x1f6)){const _0x2da757=_0x53a5e7[_0xab5d59(0x320)]('['+_0x3d90f2['$1'][_0xab5d59(0x31c)](/\d+/g)+']');for(const _0x44b074 of _0x2da757){if(_0x359a22[_0xab5d59(0x433)](_0x44b074))return!![];}return![];}else return $gameSystem[_0xab5d59(0x38c)]();}},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x4b9)]=function(){const _0x6c7346=_0x5e012b,_0x3d2a64=VisuMZ[_0x6c7346(0x431)][_0x6c7346(0x2ac)][_0x6c7346(0x412)];if(_0x3d2a64[_0x6c7346(0x2cc)]===_0x6c7346(0x279)){if(_0x6c7346(0x4c3)!==_0x6c7346(0x47c))return $gameSystem[_0x6c7346(0x528)]()-0x6;else _0x431b22=this[_0x6c7346(0x4c4)]();}else{if('oHemI'===_0x6c7346(0x4f4)){let _0xe4cec6=[this['actor'](),this['currentClass']()];_0xe4cec6=_0xe4cec6[_0x6c7346(0x294)](this['equips']()[_0x6c7346(0x3ae)](_0x226228=>_0x226228));for(const _0xe62382 of this['_skills']){const _0x4137c6=_0x25f853[_0xe62382];if(_0x4137c6)_0xe4cec6['push'](_0x4137c6);}return _0xe4cec6;}else return $gameSystem[_0x6c7346(0x528)]()-0x2;}},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x500)]=function(){const _0x2fa735=_0x5e012b,_0xc44625=VisuMZ['SkillsStatesCore'][_0x2fa735(0x2ac)][_0x2fa735(0x412)];return _0xc44625[_0x2fa735(0x310)]==='number'?$gameSystem[_0x2fa735(0x504)]():_0x2fa735(0x4d0)!==_0x2fa735(0x4d0)?_0x3e3b20['actor'](_0x2ab37e(_0x5a61f3['$1'])):$gameSystem[_0x2fa735(0x38c)]();},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x448)]=function(){const _0x3684f7=_0x5e012b,_0x2ec8ab=VisuMZ['SkillsStatesCore'][_0x3684f7(0x2ac)][_0x3684f7(0x412)];if(_0x2ec8ab['ValueFontMainType']==='number'){if(_0x3684f7(0x394)!==_0x3684f7(0x394))this[_0x3684f7(0x2bd)](_0x3684f7(0x384)),_0x1e6104[_0x3684f7(0x431)][_0x3684f7(0x31e)]['call'](this),this[_0x3684f7(0x3f8)]();else return $gameSystem[_0x3684f7(0x528)]()-0x6;}else return $gameSystem[_0x3684f7(0x528)]()-0x2;},Sprite_Gauge[_0x5e012b(0x2ea)]['labelColor']=function(){const _0x27082a=_0x5e012b,_0x353aaf=VisuMZ[_0x27082a(0x431)][_0x27082a(0x2ac)][_0x27082a(0x412)];if(_0x353aaf[_0x27082a(0x30e)]){if(_0x353aaf[_0x27082a(0x37c)]===0x1)return this[_0x27082a(0x3c5)]();else{if(_0x353aaf[_0x27082a(0x37c)]===0x2){if(_0x27082a(0x3fe)!=='AChoD')_0x15e30c=![],this['_passiveStateResults'][_0x425c0b]=_0x2b6e97;else return this[_0x27082a(0x3de)]();}}}const _0x2ae998=_0x353aaf[_0x27082a(0x1f8)];return ColorManager[_0x27082a(0x308)](_0x2ae998);},Sprite_Gauge['prototype'][_0x5e012b(0x25c)]=function(){const _0x497991=_0x5e012b,_0x1c2fa2=VisuMZ[_0x497991(0x431)][_0x497991(0x2ac)]['Gauge'];if(this['labelOutlineWidth']()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x1c2fa2[_0x497991(0x462)]?'rgba(0,\x200,\x200,\x201)':ColorManager[_0x497991(0x4f9)]();},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x40b)]=function(){const _0x397a29=_0x5e012b;return VisuMZ[_0x397a29(0x431)][_0x397a29(0x2ac)][_0x397a29(0x412)][_0x397a29(0x346)]||0x0;},Sprite_Gauge[_0x5e012b(0x2ea)]['valueOutlineColor']=function(){const _0x52f235=_0x5e012b,_0x2df9ca=VisuMZ['SkillsStatesCore']['Settings'][_0x52f235(0x412)];if(this[_0x52f235(0x26d)]()<=0x0){if(_0x52f235(0x2e9)!==_0x52f235(0x2da))return _0x52f235(0x319);else this[_0x52f235(0x26e)](_0x1d1da2);}else{if(_0x2df9ca[_0x52f235(0x316)])return'ZOPjV'!==_0x52f235(0x4b7)?'rgba(0,\x200,\x200,\x201)':(_0x3b307b=_0x53e8cf(_0x169ce1),this[_0x52f235(0x2c9)]=this[_0x52f235(0x2c9)]||{},_0x1fd744[_0x52f235(0x31c)](/#(.*)/i)?this[_0x52f235(0x2c9)][_0x4d383c]='#%1'[_0x52f235(0x39e)](_0x514197(_0x3a1015['$1'])):this[_0x52f235(0x2c9)][_0x39bb56]=this[_0x52f235(0x410)](_0x44ab49(_0x175165)),this[_0x52f235(0x2c9)][_0x352c0a]);else{if(_0x52f235(0x21c)===_0x52f235(0x21c))return ColorManager[_0x52f235(0x4f9)]();else this[_0x52f235(0x2f7)][_0x2d144d]--;}}},Sprite_Gauge[_0x5e012b(0x2ea)][_0x5e012b(0x26d)]=function(){const _0x4fbfe0=_0x5e012b;return VisuMZ['SkillsStatesCore']['Settings']['Gauge'][_0x4fbfe0(0x4de)]||0x0;},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3c1)]=Sprite_StateIcon['prototype'][_0x5e012b(0x3eb)],Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x3eb)]=function(){const _0x1fab1b=_0x5e012b;VisuMZ[_0x1fab1b(0x431)][_0x1fab1b(0x3c1)]['call'](this),this[_0x1fab1b(0x364)]();},Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x364)]=function(){const _0x3abedf=_0x5e012b,_0x596746=Window_Base['prototype'][_0x3abedf(0x404)]();this['_turnDisplaySprite']=new Sprite(),this[_0x3abedf(0x4c2)]['bitmap']=new Bitmap(ImageManager[_0x3abedf(0x3bd)],_0x596746),this[_0x3abedf(0x4c2)][_0x3abedf(0x3ec)]['x']=this['anchor']['x'],this[_0x3abedf(0x4c2)][_0x3abedf(0x3ec)]['y']=this[_0x3abedf(0x3ec)]['y'],this['addChild'](this[_0x3abedf(0x4c2)]),this[_0x3abedf(0x34e)]=this[_0x3abedf(0x4c2)][_0x3abedf(0x2c7)];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x434)]=Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x4e7)],Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x4e7)]=function(){const _0x5a6872=_0x5e012b;VisuMZ[_0x5a6872(0x431)][_0x5a6872(0x434)][_0x5a6872(0x48e)](this),this[_0x5a6872(0x225)]();},Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x470)]=function(_0x4a5485,_0x43568d,_0x418a8b,_0x94e391,_0x208654){const _0x2dbf89=_0x5e012b;this[_0x2dbf89(0x34e)][_0x2dbf89(0x470)](_0x4a5485,_0x43568d,_0x418a8b,_0x94e391,this[_0x2dbf89(0x34e)][_0x2dbf89(0x347)],_0x208654);},Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x225)]=function(){const _0x3fc247=_0x5e012b;this[_0x3fc247(0x3f5)](),this[_0x3fc247(0x34e)][_0x3fc247(0x4f8)]();const _0x4dd59e=this[_0x3fc247(0x446)];if(!_0x4dd59e)return;const _0x99001=_0x4dd59e['states']()[_0x3fc247(0x3ae)](_0x50b218=>_0x50b218[_0x3fc247(0x311)]>0x0),_0x53802d=[...Array(0x8)[_0x3fc247(0x2e6)]()][_0x3fc247(0x3ae)](_0x3c224a=>_0x4dd59e[_0x3fc247(0x2a0)](_0x3c224a)!==0x0),_0x4dafed=this[_0x3fc247(0x4e9)],_0x581c21=_0x99001[_0x4dafed];if(_0x581c21)_0x3fc247(0x415)!==_0x3fc247(0x496)?(Window_Base[_0x3fc247(0x2ea)][_0x3fc247(0x304)][_0x3fc247(0x48e)](this,_0x4dd59e,_0x581c21,0x0,0x0),Window_Base['prototype'][_0x3fc247(0x4ba)][_0x3fc247(0x48e)](this,_0x4dd59e,_0x581c21,0x0,0x0)):(this[_0x3fc247(0x335)](_0x59599d),this[_0x3fc247(0x41d)](_0x52cb85),_0xd11b0f['prototype']['onRemoveState'][_0x3fc247(0x48e)](this,_0x1d8134));else{const _0x31232d=_0x53802d[_0x4dafed-_0x99001[_0x3fc247(0x2dc)]];if(_0x31232d===undefined)return;Window_Base[_0x3fc247(0x2ea)]['drawActorBuffTurns']['call'](this,_0x4dd59e,_0x31232d,0x0,0x0),Window_Base['prototype'][_0x3fc247(0x2e3)][_0x3fc247(0x48e)](this,_0x4dd59e,_0x31232d,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x5e012b(0x3f5)]=function(){const _0x1cf799=_0x5e012b;this[_0x1cf799(0x34e)][_0x1cf799(0x203)]=$gameSystem[_0x1cf799(0x38c)](),this['contents'][_0x1cf799(0x4d8)]=$gameSystem['mainFontSize'](),this[_0x1cf799(0x1f2)]();},Sprite_StateIcon[_0x5e012b(0x2ea)]['resetTextColor']=function(){const _0x139425=_0x5e012b;this[_0x139425(0x517)](ColorManager[_0x139425(0x29c)]()),this[_0x139425(0x4d7)](ColorManager[_0x139425(0x4f9)]());},Sprite_StateIcon['prototype'][_0x5e012b(0x517)]=function(_0x23b413){const _0x1cf6b0=_0x5e012b;this[_0x1cf6b0(0x34e)][_0x1cf6b0(0x410)]=_0x23b413;},Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x4d7)]=function(_0x2a73bd){const _0x4878fb=_0x5e012b;this[_0x4878fb(0x34e)]['outlineColor']=_0x2a73bd;},Sprite_StateIcon[_0x5e012b(0x2ea)][_0x5e012b(0x4dd)]=function(){const _0x123b4b=_0x5e012b;this[_0x123b4b(0x1fe)]=!![],this['updateVisibility']();},Window_Base[_0x5e012b(0x2ea)]['drawSkillCost']=function(_0x453441,_0x2ec90b,_0x14985c,_0x29cd15,_0x2fab1a){const _0x52c63a=_0x5e012b,_0xc79c83=this['createAllSkillCostText'](_0x453441,_0x2ec90b),_0xdaed25=this[_0x52c63a(0x243)](_0xc79c83,_0x14985c,_0x29cd15,_0x2fab1a),_0x357b57=_0x14985c+_0x2fab1a-_0xdaed25[_0x52c63a(0x449)];this[_0x52c63a(0x4c7)](_0xc79c83,_0x357b57,_0x29cd15,_0x2fab1a),this[_0x52c63a(0x3f5)]();},Window_Base[_0x5e012b(0x2ea)]['createAllSkillCostText']=function(_0x2b8d16,_0x582a74){const _0x54b7e9=_0x5e012b;let _0x2610da='';for(settings of VisuMZ['SkillsStatesCore'][_0x54b7e9(0x2ac)]['Costs']){if(!this['isSkillCostShown'](_0x2b8d16,_0x582a74,settings))continue;if(_0x2610da[_0x54b7e9(0x2dc)]>0x0)_0x2610da+=this[_0x54b7e9(0x3a3)]();_0x2610da+=this[_0x54b7e9(0x4a5)](_0x2b8d16,_0x582a74,settings);}_0x2610da=this['makeAdditionalSkillCostText'](_0x2b8d16,_0x582a74,_0x2610da);if(_0x582a74[_0x54b7e9(0x37b)][_0x54b7e9(0x31c)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x2610da[_0x54b7e9(0x2dc)]>0x0)_0x2610da+=this[_0x54b7e9(0x3a3)]();_0x2610da+=String(RegExp['$1']);}return _0x2610da;},Window_Base[_0x5e012b(0x2ea)]['makeAdditionalSkillCostText']=function(_0x2e5036,_0x53e850,_0x474948){return _0x474948;},Window_Base[_0x5e012b(0x2ea)][_0x5e012b(0x33d)]=function(_0x1db668,_0x3da26a,_0x188928){const _0x50c973=_0x5e012b,_0x33e5c7=_0x188928['CalcJS'][_0x50c973(0x48e)](_0x1db668,_0x3da26a);return _0x188928[_0x50c973(0x2ad)][_0x50c973(0x48e)](_0x1db668,_0x3da26a,_0x33e5c7,_0x188928);},Window_Base[_0x5e012b(0x2ea)][_0x5e012b(0x4a5)]=function(_0x257220,_0x243d5c,_0x3fdd64){const _0x50bc58=_0x5e012b,_0x1967fd=_0x3fdd64[_0x50bc58(0x4c9)][_0x50bc58(0x48e)](_0x257220,_0x243d5c);return _0x3fdd64[_0x50bc58(0x398)][_0x50bc58(0x48e)](_0x257220,_0x243d5c,_0x1967fd,_0x3fdd64);},Window_Base['prototype'][_0x5e012b(0x3a3)]=function(){return'\x20';},Window_Base['prototype'][_0x5e012b(0x20b)]=function(_0x168673,_0x1a97f5,_0x5993b1,_0x5671a1){const _0x19a5cc=_0x5e012b;if(!_0x168673)return;VisuMZ[_0x19a5cc(0x431)]['Window_StatusBase_drawActorIcons'][_0x19a5cc(0x48e)](this,_0x168673,_0x1a97f5,_0x5993b1,_0x5671a1),this['drawActorIconsAllTurnCounters'](_0x168673,_0x1a97f5,_0x5993b1,_0x5671a1);},Window_Base[_0x5e012b(0x2ea)][_0x5e012b(0x4e2)]=function(_0xd1153a,_0x8d85c5,_0x1177bf,_0x2c86f6){const _0x42ac2d=_0x5e012b;_0x2c86f6=_0x2c86f6||0x90;const _0x16fb64=ImageManager['iconWidth'],_0x51af52=_0xd1153a[_0x42ac2d(0x482)]()[_0x42ac2d(0x374)](0x0,Math[_0x42ac2d(0x46a)](_0x2c86f6/_0x16fb64)),_0x31b45f=_0xd1153a[_0x42ac2d(0x3b3)]()[_0x42ac2d(0x3ae)](_0x5b8afd=>_0x5b8afd[_0x42ac2d(0x311)]>0x0),_0x25ba9b=[...Array(0x8)['keys']()]['filter'](_0x5e5b2a=>_0xd1153a['buff'](_0x5e5b2a)!==0x0),_0x17fd62=[];let _0x4426ea=_0x8d85c5;for(let _0x395999=0x0;_0x395999<_0x51af52[_0x42ac2d(0x2dc)];_0x395999++){this[_0x42ac2d(0x3f5)]();const _0x576eaa=_0x31b45f[_0x395999];if(_0x576eaa){if('AQDnn'===_0x42ac2d(0x4fb))!_0x17fd62[_0x42ac2d(0x2c6)](_0x576eaa)&&this[_0x42ac2d(0x304)](_0xd1153a,_0x576eaa,_0x4426ea,_0x1177bf),this[_0x42ac2d(0x4ba)](_0xd1153a,_0x576eaa,_0x4426ea,_0x1177bf),_0x17fd62[_0x42ac2d(0x3a8)](_0x576eaa);else{if(typeof _0x2e0b65!==_0x42ac2d(0x279))_0x52399c=_0x1103fd['id'];this[_0x42ac2d(0x312)]=this[_0x42ac2d(0x312)]||{},this[_0x42ac2d(0x312)][_0x17a3d9]={};}}else{if(_0x42ac2d(0x23f)!=='yZHJd'){const _0x5aa147=_0x25ba9b[_0x395999-_0x31b45f[_0x42ac2d(0x2dc)]];this['drawActorBuffTurns'](_0xd1153a,_0x5aa147,_0x4426ea,_0x1177bf),this[_0x42ac2d(0x2e3)](_0xd1153a,_0x5aa147,_0x4426ea,_0x1177bf);}else for(const _0x2a6a8e of _0x49b8e4){_0x2a6a8e[_0x42ac2d(0x31c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x438ecd=_0x49cb53(_0x210a41['$1'])[_0x42ac2d(0x2f0)]()[_0x42ac2d(0x229)]()[_0x42ac2d(0x45e)](',');for(const _0x15ff76 of _0x438ecd){_0x558e58[_0x42ac2d(0x1f3)]['push'](_0x15ff76[_0x42ac2d(0x229)]());}}}_0x4426ea+=_0x16fb64;}},Window_Base[_0x5e012b(0x2ea)][_0x5e012b(0x304)]=function(_0x9bad16,_0x3207c8,_0x5c2328,_0x40a78b){const _0x154d6e=_0x5e012b;if(!VisuMZ[_0x154d6e(0x431)]['Settings'][_0x154d6e(0x2a5)][_0x154d6e(0x509)])return;if(!_0x9bad16[_0x154d6e(0x302)](_0x3207c8['id']))return;if(_0x3207c8['autoRemovalTiming']===0x0)return;if(_0x3207c8[_0x154d6e(0x37b)][_0x154d6e(0x31c)](/<HIDE STATE TURNS>/i))return;const _0x285754=_0x9bad16[_0x154d6e(0x423)](_0x3207c8['id']),_0x3797d7=ImageManager[_0x154d6e(0x3bd)],_0x469c59=ColorManager[_0x154d6e(0x50d)](_0x3207c8);this[_0x154d6e(0x517)](_0x469c59),this['changeOutlineColor'](_0x154d6e(0x3dc)),this[_0x154d6e(0x34e)]['fontBold']=!![],this['contents'][_0x154d6e(0x4d8)]=VisuMZ[_0x154d6e(0x431)]['Settings'][_0x154d6e(0x2a5)][_0x154d6e(0x262)],_0x5c2328+=VisuMZ[_0x154d6e(0x431)]['Settings'][_0x154d6e(0x2a5)][_0x154d6e(0x485)],_0x40a78b+=VisuMZ[_0x154d6e(0x431)][_0x154d6e(0x2ac)][_0x154d6e(0x2a5)]['TurnOffsetY'],this[_0x154d6e(0x470)](_0x285754,_0x5c2328,_0x40a78b,_0x3797d7,_0x154d6e(0x1fd)),this[_0x154d6e(0x34e)][_0x154d6e(0x471)]=![],this[_0x154d6e(0x3f5)]();},Window_Base[_0x5e012b(0x2ea)]['drawActorStateData']=function(_0x4aa57c,_0x5d3b85,_0x383b29,_0x26d861){const _0x5a7df3=_0x5e012b;if(!VisuMZ[_0x5a7df3(0x431)][_0x5a7df3(0x2ac)][_0x5a7df3(0x2a5)]['ShowData'])return;const _0x5e5d80=ImageManager['iconWidth'],_0x13ad21=ImageManager['iconHeight']/0x2,_0x280d24=ColorManager[_0x5a7df3(0x29c)]();this[_0x5a7df3(0x517)](_0x280d24),this[_0x5a7df3(0x4d7)](_0x5a7df3(0x3dc)),this[_0x5a7df3(0x34e)]['fontBold']=!![],this[_0x5a7df3(0x34e)][_0x5a7df3(0x4d8)]=VisuMZ[_0x5a7df3(0x431)][_0x5a7df3(0x2ac)][_0x5a7df3(0x2a5)][_0x5a7df3(0x3ff)],_0x383b29+=VisuMZ[_0x5a7df3(0x431)][_0x5a7df3(0x2ac)]['States']['DataOffsetX'],_0x26d861+=VisuMZ[_0x5a7df3(0x431)][_0x5a7df3(0x2ac)][_0x5a7df3(0x2a5)][_0x5a7df3(0x3a0)];const _0x3b891e=String(_0x4aa57c[_0x5a7df3(0x4cb)](_0x5d3b85['id']));this[_0x5a7df3(0x470)](_0x3b891e,_0x383b29,_0x26d861,_0x5e5d80,_0x5a7df3(0x256)),this[_0x5a7df3(0x34e)][_0x5a7df3(0x471)]=![],this[_0x5a7df3(0x3f5)]();},Window_Base[_0x5e012b(0x2ea)]['drawActorBuffTurns']=function(_0x3689da,_0x3519db,_0x1c107c,_0x46e827){const _0x17b707=_0x5e012b;if(!VisuMZ['SkillsStatesCore'][_0x17b707(0x2ac)][_0x17b707(0x35d)][_0x17b707(0x509)])return;const _0x1dd2a8=_0x3689da[_0x17b707(0x2a0)](_0x3519db);if(_0x1dd2a8===0x0)return;const _0x2dfd1c=_0x3689da[_0x17b707(0x222)](_0x3519db),_0x5d562c=ImageManager['iconWidth'],_0xec01c3=_0x1dd2a8>0x0?ColorManager[_0x17b707(0x322)]():ColorManager[_0x17b707(0x4ea)]();this['changeTextColor'](_0xec01c3),this[_0x17b707(0x4d7)](_0x17b707(0x3dc)),this[_0x17b707(0x34e)]['fontBold']=!![],this[_0x17b707(0x34e)][_0x17b707(0x4d8)]=VisuMZ[_0x17b707(0x431)][_0x17b707(0x2ac)]['Buffs'][_0x17b707(0x262)],_0x1c107c+=VisuMZ[_0x17b707(0x431)][_0x17b707(0x2ac)][_0x17b707(0x35d)]['TurnOffsetX'],_0x46e827+=VisuMZ['SkillsStatesCore'][_0x17b707(0x2ac)][_0x17b707(0x35d)][_0x17b707(0x417)],this[_0x17b707(0x470)](_0x2dfd1c,_0x1c107c,_0x46e827,_0x5d562c,_0x17b707(0x1fd)),this[_0x17b707(0x34e)][_0x17b707(0x471)]=![],this[_0x17b707(0x3f5)]();},Window_Base[_0x5e012b(0x2ea)][_0x5e012b(0x2e3)]=function(_0x494429,_0x29db40,_0x4f6c11,_0x42de74){const _0xcfa0c8=_0x5e012b;if(!VisuMZ[_0xcfa0c8(0x431)][_0xcfa0c8(0x2ac)][_0xcfa0c8(0x35d)][_0xcfa0c8(0x2b4)])return;const _0x2b8d60=_0x494429[_0xcfa0c8(0x3fc)](_0x29db40),_0x534388=_0x494429[_0xcfa0c8(0x2a0)](_0x29db40),_0x3b4821=ImageManager[_0xcfa0c8(0x3bd)],_0x5998f8=ImageManager[_0xcfa0c8(0x447)]/0x2,_0x25ca84=_0x534388>0x0?ColorManager[_0xcfa0c8(0x322)]():ColorManager[_0xcfa0c8(0x4ea)]();this[_0xcfa0c8(0x517)](_0x25ca84),this['changeOutlineColor'](_0xcfa0c8(0x3dc)),this[_0xcfa0c8(0x34e)][_0xcfa0c8(0x471)]=!![],this['contents'][_0xcfa0c8(0x4d8)]=VisuMZ[_0xcfa0c8(0x431)][_0xcfa0c8(0x2ac)]['Buffs']['DataFontSize'],_0x4f6c11+=VisuMZ[_0xcfa0c8(0x431)][_0xcfa0c8(0x2ac)][_0xcfa0c8(0x35d)][_0xcfa0c8(0x458)],_0x42de74+=VisuMZ[_0xcfa0c8(0x431)][_0xcfa0c8(0x2ac)]['Buffs'][_0xcfa0c8(0x3a0)];const _0x5e14e6=_0xcfa0c8(0x281)[_0xcfa0c8(0x39e)](Math[_0xcfa0c8(0x357)](_0x2b8d60*0x64));this['drawText'](_0x5e14e6,_0x4f6c11,_0x42de74,_0x3b4821,_0xcfa0c8(0x256)),this[_0xcfa0c8(0x34e)]['fontBold']=![],this[_0xcfa0c8(0x3f5)]();},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x525)]=Window_StatusBase[_0x5e012b(0x2ea)][_0x5e012b(0x280)],Window_StatusBase[_0x5e012b(0x2ea)]['placeGauge']=function(_0x96add1,_0x583874,_0x2fa123,_0x36fa2b){const _0x14053d=_0x5e012b;if(_0x96add1['isActor']())_0x583874=this[_0x14053d(0x261)](_0x96add1,_0x583874);this['placeExactGauge'](_0x96add1,_0x583874,_0x2fa123,_0x36fa2b);},Window_StatusBase['prototype']['placeExactGauge']=function(_0x3884e4,_0x55871b,_0x5c07f0,_0x4a5ede){const _0x1cb94f=_0x5e012b;if([_0x1cb94f(0x45a),_0x1cb94f(0x1f4)][_0x1cb94f(0x2c6)](_0x55871b['toLowerCase']()))return;VisuMZ['SkillsStatesCore']['Window_StatusBase_placeGauge'][_0x1cb94f(0x48e)](this,_0x3884e4,_0x55871b,_0x5c07f0,_0x4a5ede);},Window_StatusBase[_0x5e012b(0x2ea)][_0x5e012b(0x261)]=function(_0x24e99b,_0x47268b){const _0x520325=_0x5e012b,_0x4bd868=_0x24e99b['currentClass']()[_0x520325(0x37b)];if(_0x47268b==='hp'&&_0x4bd868['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x47268b==='mp'&&_0x4bd868[_0x520325(0x31c)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x520325(0x49d)!=='kFYGv'){const _0x1b498c=_0x262230[_0x520325(0x431)][_0x520325(0x51f)][_0x520325(0x48e)](this);return this[_0x520325(0x4ef)]()&&this[_0x520325(0x337)]()&&(_0x1b498c['width']-=this['shopStatusWidth']()),_0x1b498c;}else return String(RegExp['$1']);}else return _0x47268b==='tp'&&_0x4bd868[_0x520325(0x31c)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x47268b;}},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3a1)]=Window_StatusBase[_0x5e012b(0x2ea)][_0x5e012b(0x20b)],Window_StatusBase[_0x5e012b(0x2ea)][_0x5e012b(0x20b)]=function(_0x305005,_0xc38639,_0x178aa7,_0x3498f9){const _0x3fe5fa=_0x5e012b;if(!_0x305005)return;Window_Base[_0x3fe5fa(0x2ea)][_0x3fe5fa(0x20b)][_0x3fe5fa(0x48e)](this,_0x305005,_0xc38639,_0x178aa7,_0x3498f9);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x244)]=Window_SkillType[_0x5e012b(0x2ea)]['initialize'],Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x224)]=function(_0x5a2023){const _0x32c7b6=_0x5e012b;VisuMZ[_0x32c7b6(0x431)][_0x32c7b6(0x244)][_0x32c7b6(0x48e)](this,_0x5a2023),this[_0x32c7b6(0x29f)](_0x5a2023);},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x29f)]=function(_0x1ee053){const _0x57a51a=_0x5e012b,_0x4de66a=new Rectangle(0x0,0x0,_0x1ee053[_0x57a51a(0x449)],_0x1ee053[_0x57a51a(0x347)]);this[_0x57a51a(0x365)]=new Window_Base(_0x4de66a),this[_0x57a51a(0x365)][_0x57a51a(0x25a)]=0x0,this[_0x57a51a(0x492)](this[_0x57a51a(0x365)]),this[_0x57a51a(0x3c9)]();},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x35b)]=function(){const _0x160739=_0x5e012b;Window_Command[_0x160739(0x2ea)][_0x160739(0x35b)][_0x160739(0x48e)](this);if(this[_0x160739(0x365)])this[_0x160739(0x3c9)]();},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x3c9)]=function(){const _0x199e6f=_0x5e012b,_0x4cf099=this['_commandNameWindow'];_0x4cf099[_0x199e6f(0x34e)]['clear']();const _0x435066=this[_0x199e6f(0x3b9)](this[_0x199e6f(0x39b)]());if(_0x435066===_0x199e6f(0x3be)&&this[_0x199e6f(0x338)]()>0x0){const _0x4ebb18=this['itemLineRect'](this['index']());let _0x404196=this[_0x199e6f(0x456)](this['index']());_0x404196=_0x404196[_0x199e6f(0x43d)](/\\I\[(\d+)\]/gi,''),_0x4cf099['resetFontSettings'](),this[_0x199e6f(0x4ed)](_0x404196,_0x4ebb18),this[_0x199e6f(0x460)](_0x404196,_0x4ebb18),this[_0x199e6f(0x204)](_0x404196,_0x4ebb18);}},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x4ed)]=function(_0x5d7eb8,_0xab719a){},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x460)]=function(_0xed876,_0x538035){const _0x638c7f=_0x5e012b,_0xad9f5f=this[_0x638c7f(0x365)];_0xad9f5f[_0x638c7f(0x470)](_0xed876,0x0,_0x538035['y'],_0xad9f5f[_0x638c7f(0x497)],_0x638c7f(0x256));},Window_SkillType['prototype'][_0x5e012b(0x204)]=function(_0x3db264,_0x3118b1){const _0x36db17=_0x5e012b,_0x24eba4=this[_0x36db17(0x365)],_0x191f8a=$gameSystem[_0x36db17(0x358)](),_0x422a1d=_0x3118b1['x']+Math[_0x36db17(0x46a)](_0x3118b1[_0x36db17(0x449)]/0x2)+_0x191f8a;_0x24eba4['x']=_0x24eba4[_0x36db17(0x449)]/-0x2+_0x422a1d,_0x24eba4['y']=Math[_0x36db17(0x46a)](_0x3118b1[_0x36db17(0x347)]/0x2);},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x2ae)]=function(){const _0x52a747=_0x5e012b;return Imported[_0x52a747(0x4ae)]&&Window_Command[_0x52a747(0x2ea)][_0x52a747(0x2ae)][_0x52a747(0x48e)](this);},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x30c)]=function(){const _0x484486=_0x5e012b;if(!this[_0x484486(0x321)])return;const _0x5a8820=this[_0x484486(0x321)][_0x484486(0x42b)]();for(const _0x2677c8 of _0x5a8820){if('zFqjy'===_0x484486(0x3f0))return!![];else{const _0x40cb75=this['makeCommandName'](_0x2677c8);this['addCommand'](_0x40cb75,_0x484486(0x40c),!![],_0x2677c8);}}},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x466)]=function(_0xb6228){const _0xeef1fb=_0x5e012b;let _0x18390c=$dataSystem[_0xeef1fb(0x42b)][_0xb6228];if(_0x18390c[_0xeef1fb(0x31c)](/\\I\[(\d+)\]/i))return _0x18390c;if(this[_0xeef1fb(0x2f3)]()===_0xeef1fb(0x27e))return _0x18390c;const _0x20f87d=VisuMZ['SkillsStatesCore'][_0xeef1fb(0x2ac)][_0xeef1fb(0x46b)],_0x207786=$dataSystem[_0xeef1fb(0x227)][_0xeef1fb(0x2c6)](_0xb6228),_0xd6cd2e=_0x207786?_0x20f87d[_0xeef1fb(0x2d6)]:_0x20f87d[_0xeef1fb(0x328)];return _0xeef1fb(0x3df)[_0xeef1fb(0x39e)](_0xd6cd2e,_0x18390c);},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x3b8)]=function(){const _0x7c16f0=_0x5e012b;return VisuMZ[_0x7c16f0(0x431)][_0x7c16f0(0x2ac)]['Skills'][_0x7c16f0(0x270)];},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x2ec)]=function(_0x1568c5){const _0x7bef2f=_0x5e012b,_0xb2363e=this[_0x7bef2f(0x3b9)](_0x1568c5);if(_0xb2363e===_0x7bef2f(0x1fb)){if(_0x7bef2f(0x413)!==_0x7bef2f(0x4ac))this[_0x7bef2f(0x2eb)](_0x1568c5);else{if(_0x262172[_0x7bef2f(0x521)]&&_0x5a2ae3[_0x7bef2f(0x23e)]!==_0x20d60d)return _0x43bfc6[_0x7bef2f(0x23e)];else{if(this[_0x7bef2f(0x3f6)]())return this[_0x7bef2f(0x50f)]()['match'](/LOWER/i);else _0x3e3677[_0x7bef2f(0x2ea)]['isRightInputMode'][_0x7bef2f(0x48e)](this);}}}else{if(_0xb2363e===_0x7bef2f(0x3be)){if(_0x7bef2f(0x510)==='huGYO')this['drawItemStyleIcon'](_0x1568c5);else return this[_0x7bef2f(0x24f)]=this[_0x7bef2f(0x24f)]||_0x32b1de['frameCount'],this[_0x7bef2f(0x24f)];}else Window_Command[_0x7bef2f(0x2ea)][_0x7bef2f(0x2ec)][_0x7bef2f(0x48e)](this,_0x1568c5);}},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x2f3)]=function(){const _0x4a1a88=_0x5e012b;return VisuMZ[_0x4a1a88(0x431)][_0x4a1a88(0x2ac)][_0x4a1a88(0x46b)][_0x4a1a88(0x43b)];},Window_SkillType['prototype'][_0x5e012b(0x3b9)]=function(_0x6b2843){const _0x3d79c8=_0x5e012b;if(_0x6b2843<0x0)return _0x3d79c8(0x27e);const _0x4293f5=this['commandStyle']();if(_0x4293f5!==_0x3d79c8(0x43e)){if('ecAKj'!==_0x3d79c8(0x396)){const _0x4d02d0=_0x568944['$1'][_0x3d79c8(0x45e)](',');for(const _0xb68a3b of _0x4d02d0){const _0x506fc5=_0x50e2ec['getStypeIdWithName'](_0xb68a3b);if(_0x506fc5)this['_stypeIDs'][_0x296dbd['id']][_0x3d79c8(0x3a8)](_0x506fc5);}}else return _0x4293f5;}else{if(this[_0x3d79c8(0x338)]()>0x0){const _0x5b10dd=this[_0x3d79c8(0x456)](_0x6b2843);if(_0x5b10dd[_0x3d79c8(0x31c)](/\\I\[(\d+)\]/i)){if('AdWhO'===_0x3d79c8(0x28d)){const _0x2322f1=this['itemLineRect'](_0x6b2843),_0x5713c9=this[_0x3d79c8(0x243)](_0x5b10dd)[_0x3d79c8(0x449)];return _0x5713c9<=_0x2322f1[_0x3d79c8(0x449)]?_0x3d79c8(0x1fb):_0x3d79c8(0x3be);}else this['removeState'](_0x1157ce['shift']());}}}return'text';},Window_SkillType['prototype']['drawItemStyleIconText']=function(_0x170c51){const _0x5ab956=_0x5e012b,_0x13a4c2=this[_0x5ab956(0x495)](_0x170c51),_0x4f90c6=this['commandName'](_0x170c51),_0x354f2a=this[_0x5ab956(0x243)](_0x4f90c6)[_0x5ab956(0x449)];this['changePaintOpacity'](this[_0x5ab956(0x2d1)](_0x170c51));const _0x18ed74=this[_0x5ab956(0x3b8)]();if(_0x18ed74===_0x5ab956(0x1fd)){if('WjMol'===_0x5ab956(0x2ed))this['drawTextEx'](_0x4f90c6,_0x13a4c2['x']+_0x13a4c2[_0x5ab956(0x449)]-_0x354f2a,_0x13a4c2['y'],_0x354f2a);else return _0x208ae8[_0x5ab956(0x2f5)];}else{if(_0x18ed74===_0x5ab956(0x256)){if(_0x5ab956(0x301)===_0x5ab956(0x3c6))_0x323e26['prototype']['isRightInputMode'][_0x5ab956(0x48e)](this);else{const _0x3ab145=_0x13a4c2['x']+Math['floor']((_0x13a4c2[_0x5ab956(0x449)]-_0x354f2a)/0x2);this[_0x5ab956(0x4c7)](_0x4f90c6,_0x3ab145,_0x13a4c2['y'],_0x354f2a);}}else this[_0x5ab956(0x4c7)](_0x4f90c6,_0x13a4c2['x'],_0x13a4c2['y'],_0x354f2a);}},Window_SkillType[_0x5e012b(0x2ea)][_0x5e012b(0x41b)]=function(_0x53171d){const _0x1a2189=_0x5e012b;this[_0x1a2189(0x456)](_0x53171d)[_0x1a2189(0x31c)](/\\I\[(\d+)\]/i);const _0x2d8710=Number(RegExp['$1'])||0x0,_0x3ef15f=this[_0x1a2189(0x495)](_0x53171d),_0x815bcd=_0x3ef15f['x']+Math[_0x1a2189(0x46a)]((_0x3ef15f['width']-ImageManager[_0x1a2189(0x3bd)])/0x2),_0x344278=_0x3ef15f['y']+(_0x3ef15f[_0x1a2189(0x347)]-ImageManager[_0x1a2189(0x447)])/0x2;this['drawIcon'](_0x2d8710,_0x815bcd,_0x344278);},VisuMZ[_0x5e012b(0x431)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x5e012b(0x2ea)]['refresh'],Window_SkillStatus[_0x5e012b(0x2ea)]['refresh']=function(){const _0xb8e017=_0x5e012b;VisuMZ['SkillsStatesCore'][_0xb8e017(0x22e)][_0xb8e017(0x48e)](this);if(this[_0xb8e017(0x321)])this[_0xb8e017(0x3cd)]();},Window_SkillStatus[_0x5e012b(0x2ea)][_0x5e012b(0x3cd)]=function(){const _0x77c6d1=_0x5e012b;if(!Imported[_0x77c6d1(0x4ae)])return;if(!Imported[_0x77c6d1(0x240)])return;const _0xad51e3=this[_0x77c6d1(0x345)]();let _0x33a395=this[_0x77c6d1(0x24b)]()/0x2+0xb4+0xb4+0xb4,_0x556419=this[_0x77c6d1(0x497)]-_0x33a395-0x2;if(_0x556419>=0x12c){if(_0x77c6d1(0x406)!==_0x77c6d1(0x406)){const _0x35cece=this[_0x77c6d1(0x443)](_0x1e8c2e['id'],_0x77c6d1(0x22d))||0x0,_0xb4007c=-this['maxSlipDamage'](),_0x5036fb=_0x421b1b[_0x77c6d1(0x440)](_0x35cece,_0xb4007c);if(_0x5036fb!==0x0){const _0x342dbf=this[_0x77c6d1(0x3bc)][_0x77c6d1(0x2a3)]||0x0;this[_0x77c6d1(0x467)](_0x5036fb),this[_0x77c6d1(0x3bc)][_0x77c6d1(0x2a3)]+=_0x342dbf;}const _0x5ce200=this[_0x77c6d1(0x443)](_0x8bd9a8['id'],_0x77c6d1(0x52b))||0x0;if(_0x5ce200!==0x0){const _0x5ec061=this[_0x77c6d1(0x3bc)][_0x77c6d1(0x4bd)]||0x0;this[_0x77c6d1(0x232)](_0x5ce200),this[_0x77c6d1(0x3bc)][_0x77c6d1(0x4bd)]+=_0x5ec061;}const _0x360e2d=this[_0x77c6d1(0x443)](_0x87cf84['id'],_0x77c6d1(0x298))||0x0;_0x360e2d!==0x0&&this[_0x77c6d1(0x28c)](_0x360e2d);}else{const _0x1da7dd=VisuMZ[_0x77c6d1(0x25f)][_0x77c6d1(0x2ac)][_0x77c6d1(0x3a7)]['DisplayedParams'],_0x3e667a=Math[_0x77c6d1(0x46a)](_0x556419/0x2)-0x18;let _0x4e68f4=_0x33a395,_0x49d706=Math[_0x77c6d1(0x46a)]((this['innerHeight']-Math[_0x77c6d1(0x32b)](_0x1da7dd['length']/0x2)*_0xad51e3)/0x2),_0x244937=0x0;for(const _0x4cbab4 of _0x1da7dd){this[_0x77c6d1(0x356)](_0x4e68f4,_0x49d706,_0x3e667a,_0x4cbab4),_0x244937++;if(_0x244937%0x2===0x0)_0x4e68f4=_0x33a395,_0x49d706+=_0xad51e3;else{if(_0x77c6d1(0x307)===_0x77c6d1(0x307))_0x4e68f4+=_0x3e667a+0x18;else{const _0x4cea1f=_0x168073(_0x7441f7['$1']),_0x266da4=_0x408c5a[_0x77c6d1(0x39e)](_0x4cea1f);_0x1999b9[_0x77c6d1(0x431)][_0x77c6d1(0x529)][_0x55e307['id']]=new _0x4b78cd(_0x77c6d1(0x4eb),_0x266da4);}}}}}this[_0x77c6d1(0x3f5)]();},Window_SkillStatus[_0x5e012b(0x2ea)][_0x5e012b(0x356)]=function(_0x196ea7,_0x58a9e8,_0x1830e1,_0x3c9252){const _0x3f6729=_0x5e012b,_0x3f79e4=this[_0x3f6729(0x345)]();this['resetFontSettings'](),this['drawParamText'](_0x196ea7,_0x58a9e8,_0x1830e1,_0x3c9252,!![]),this[_0x3f6729(0x1f2)](),this['contents'][_0x3f6729(0x4d8)]-=0x8;const _0x50ae7c=this[_0x3f6729(0x321)][_0x3f6729(0x47e)](_0x3c9252,!![]);this[_0x3f6729(0x34e)][_0x3f6729(0x470)](_0x50ae7c,_0x196ea7,_0x58a9e8,_0x1830e1,_0x3f79e4,_0x3f6729(0x1fd));},VisuMZ[_0x5e012b(0x431)]['Window_SkillList_includes']=Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x2c6)],Window_SkillList[_0x5e012b(0x2ea)]['includes']=function(_0x3351ee){const _0x177e33=_0x5e012b;return this[_0x177e33(0x477)](_0x3351ee);},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x352)]=Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x4d2)],Window_SkillList['prototype'][_0x5e012b(0x4d2)]=function(){const _0x43b8f1=_0x5e012b;return SceneManager[_0x43b8f1(0x250)][_0x43b8f1(0x293)]===Scene_Battle?VisuMZ[_0x43b8f1(0x431)][_0x43b8f1(0x352)][_0x43b8f1(0x48e)](this):VisuMZ[_0x43b8f1(0x431)][_0x43b8f1(0x2ac)][_0x43b8f1(0x46b)]['ListWindowCols'];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3c2)]=Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x475)],Window_SkillList[_0x5e012b(0x2ea)]['setActor']=function(_0x411b55){const _0xeca515=_0x5e012b,_0x1a8a56=this['_actor']!==_0x411b55;VisuMZ['SkillsStatesCore'][_0xeca515(0x3c2)][_0xeca515(0x48e)](this,_0x411b55),_0x1a8a56&&(this[_0xeca515(0x334)]&&this[_0xeca515(0x334)][_0xeca515(0x293)]===Window_ShopStatus&&this['_statusWindow'][_0xeca515(0x30f)](this['itemAt'](0x0)));},Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x24a)]=function(_0x520ab0){const _0xa3437f=_0x5e012b;if(this[_0xa3437f(0x3d3)]===_0x520ab0)return;this[_0xa3437f(0x3d3)]=_0x520ab0,this[_0xa3437f(0x4cf)](),this[_0xa3437f(0x2ce)](0x0,0x0),this[_0xa3437f(0x334)]&&this[_0xa3437f(0x334)][_0xa3437f(0x293)]===Window_ShopStatus&&this['_statusWindow']['setItem'](this[_0xa3437f(0x48d)](0x0));},Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x477)]=function(_0x17d430){const _0x236de9=_0x5e012b;if(!_0x17d430)return VisuMZ[_0x236de9(0x431)][_0x236de9(0x21f)][_0x236de9(0x48e)](this,_0x17d430);if(!this[_0x236de9(0x44d)](_0x17d430))return![];if(!this[_0x236de9(0x296)](_0x17d430))return![];if(!this[_0x236de9(0x252)](_0x17d430))return![];return!![];},Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x44d)]=function(_0x1a7d1c){const _0x57b484=_0x5e012b;return DataManager[_0x57b484(0x23a)](_0x1a7d1c)[_0x57b484(0x2c6)](this[_0x57b484(0x3d3)]);},Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x296)]=function(_0x470cea){const _0xc9e3fe=_0x5e012b;if(!VisuMZ[_0xc9e3fe(0x431)][_0xc9e3fe(0x2d9)](this['_actor'],_0x470cea))return![];if(!VisuMZ['SkillsStatesCore'][_0xc9e3fe(0x372)](this[_0xc9e3fe(0x321)],_0x470cea))return![];if(!VisuMZ[_0xc9e3fe(0x431)][_0xc9e3fe(0x31f)](this['_actor'],_0x470cea))return![];return!![];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x2d9)]=function(_0x550197,_0x14bf18){const _0x4ed20f=_0x5e012b,_0x16219d=_0x14bf18['note'];if(_0x16219d[_0x4ed20f(0x31c)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x4ed20f(0x380)]())return![];else{if(_0x16219d['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x4ed20f(0x380)]()){if(_0x4ed20f(0x359)===_0x4ed20f(0x359))return![];else{if(_0x4085e6[_0x4ed20f(0x433)](_0x1539c0))return!![];}}else return!![];}},VisuMZ[_0x5e012b(0x431)]['CheckVisibleSwitchNotetags']=function(_0x9b1c8a,_0x38b89d){const _0x3fbf2b=_0x5e012b,_0x5d1f6a=_0x38b89d[_0x3fbf2b(0x37b)];if(_0x5d1f6a[_0x3fbf2b(0x31c)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3fbf2b(0x3f4)===_0x3fbf2b(0x3f4)){const _0x50f760=JSON[_0x3fbf2b(0x320)]('['+RegExp['$1'][_0x3fbf2b(0x31c)](/\d+/g)+']');for(const _0x2b4e9a of _0x50f760){if(!$gameSwitches[_0x3fbf2b(0x433)](_0x2b4e9a))return![];}return!![];}else{const _0x17126c=_0x269d62[_0x3fbf2b(0x431)][_0x3fbf2b(0x2ac)][_0x3fbf2b(0x2a5)];if(!_0x17126c)return;if(_0x17126c[_0x3fbf2b(0x4a9)]===![])return;if(!this[_0x3fbf2b(0x220)])return;this[_0x3fbf2b(0x220)][_0x3fbf2b(0x318)]();}}if(_0x5d1f6a[_0x3fbf2b(0x31c)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5aa16d=JSON['parse']('['+RegExp['$1'][_0x3fbf2b(0x31c)](/\d+/g)+']');for(const _0x21c480 of _0x5aa16d){if(_0x3fbf2b(0x4b5)===_0x3fbf2b(0x4f1)){if(_0x45ca3a[_0x3fbf2b(0x220)])return _0x477004[_0x3fbf2b(0x220)];else{if(_0x503000[_0x3fbf2b(0x4fd)])return _0x520207['_currentActor'];}}else{if(!$gameSwitches[_0x3fbf2b(0x433)](_0x21c480))return![];}}return!![];}if(_0x5d1f6a['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x820199=JSON['parse']('['+RegExp['$1'][_0x3fbf2b(0x31c)](/\d+/g)+']');for(const _0x457fcf of _0x820199){if($gameSwitches[_0x3fbf2b(0x433)](_0x457fcf))return!![];}return![];}if(_0x5d1f6a[_0x3fbf2b(0x31c)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3fbf2b(0x2de)===_0x3fbf2b(0x292)){if(!_0x546ec1[_0x3fbf2b(0x3db)](_0x5d48fd))return![];}else{const _0x3b7c21=JSON[_0x3fbf2b(0x320)]('['+RegExp['$1'][_0x3fbf2b(0x31c)](/\d+/g)+']');for(const _0x4454df of _0x3b7c21){if(!$gameSwitches[_0x3fbf2b(0x433)](_0x4454df))return!![];}return![];}}if(_0x5d1f6a[_0x3fbf2b(0x31c)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d47f1=JSON[_0x3fbf2b(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x132196 of _0x3d47f1){if('ZfCwm'!==_0x3fbf2b(0x2e4)){if(!$gameSwitches[_0x3fbf2b(0x433)](_0x132196))return!![];}else _0x2c78fb=_0x315f13,_0x4ddbe8+=_0x29ecaa;}return![];}if(_0x5d1f6a[_0x3fbf2b(0x31c)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c1a6b=JSON[_0x3fbf2b(0x320)]('['+RegExp['$1'][_0x3fbf2b(0x31c)](/\d+/g)+']');for(const _0x3f2314 of _0x1c1a6b){if(_0x3fbf2b(0x459)!==_0x3fbf2b(0x459)){const _0x47343d=_0x5005a1(_0x24bb45['$1'])[_0x3fbf2b(0x45e)](',')['map'](_0x227597=>_0x227597[_0x3fbf2b(0x229)]()),_0x43ae50=_0x147d59['SkillsStatesCore'][_0x3fbf2b(0x45f)](_0x47343d);return _0x43ae50[_0x3fbf2b(0x2c6)](this[_0x3fbf2b(0x28f)]());}else{if($gameSwitches[_0x3fbf2b(0x433)](_0x3f2314))return![];}}return!![];}return!![];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x31f)]=function(_0x5cb3ab,_0x5be03a){const _0x50201e=_0x5e012b,_0x42b16a=_0x5be03a[_0x50201e(0x37b)];if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('OYMwF'===_0x50201e(0x27f))return this[_0x50201e(0x506)]&&this[_0x50201e(0x506)]['isUseModernControls']();else{const _0xe8b159=JSON[_0x50201e(0x320)]('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x44791f of _0xe8b159){if(!_0x5cb3ab[_0x50201e(0x3db)](_0x44791f))return![];}return!![];}}else{if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5eabca=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0xd73a41 of _0x5eabca){const _0x45be0e=DataManager['getSkillIdWithName'](_0xd73a41);if(!_0x45be0e)continue;if(!_0x5cb3ab[_0x50201e(0x3db)](_0x45be0e))return![];}return!![];}}if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x50201e(0x283)===_0x50201e(0x4a7)){if(_0x57ce6f[_0x50201e(0x433)](_0x461bae))return![];}else{const _0x2bd2d9=JSON['parse']('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x36c40f of _0x2bd2d9){if(!_0x5cb3ab[_0x50201e(0x3db)](_0x36c40f))return![];}return!![];}}else{if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e079a=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x5d1a80 of _0x1e079a){if(_0x50201e(0x501)!==_0x50201e(0x501)){if(_0x70df77)_0x349cf0[_0x50201e(0x4cf)]();}else{const _0x3f0300=DataManager[_0x50201e(0x272)](_0x5d1a80);if(!_0x3f0300)continue;if(!_0x5cb3ab[_0x50201e(0x3db)](_0x3f0300))return![];}}return!![];}}if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x392b50=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4896be of _0x392b50){if(_0x5cb3ab[_0x50201e(0x3db)](_0x4896be))return!![];}return![];}else{if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2d693f=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x29f9d1 of _0x2d693f){if(_0x50201e(0x370)===_0x50201e(0x370)){const _0x22240a=DataManager[_0x50201e(0x272)](_0x29f9d1);if(!_0x22240a)continue;if(_0x5cb3ab[_0x50201e(0x3db)](_0x22240a))return!![];}else for(const _0x175a45 of _0x54e2a1){_0x175a45['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x5985d5=_0x3241a1(_0x40da4b['$1']);_0x19f4fd[_0x50201e(0x27d)](_0x5985d5);}}return![];}}if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6abf25=JSON['parse']('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x118436 of _0x6abf25){if(!_0x5cb3ab[_0x50201e(0x3db)](_0x118436))return!![];}return![];}else{if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xe0b6b9=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x224a4d of _0xe0b6b9){if(_0x50201e(0x438)===_0x50201e(0x438)){const _0x7d0bae=DataManager['getSkillIdWithName'](_0x224a4d);if(!_0x7d0bae)continue;if(!_0x5cb3ab[_0x50201e(0x3db)](_0x7d0bae))return!![];}else _0x3169d5[_0x50201e(0x531)](_0x20e0e7,_0x4dc67a),this[_0x50201e(0x4ee)](_0x5616d8);}return![];}}if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1635f5=JSON[_0x50201e(0x320)]('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x5ec294 of _0x1635f5){if(!_0x5cb3ab['isLearnedSkill'](_0x5ec294))return!![];}return![];}else{if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x363ce6=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x4443f2 of _0x363ce6){const _0x293742=DataManager[_0x50201e(0x272)](_0x4443f2);if(!_0x293742)continue;if(!_0x5cb3ab[_0x50201e(0x3db)](_0x293742))return!![];}return![];}}if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49c9c7=JSON[_0x50201e(0x320)]('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x412c13 of _0x49c9c7){if(_0x5cb3ab[_0x50201e(0x3db)](_0x412c13))return![];}return!![];}else{if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('gjeUy'!==_0x50201e(0x31d))this['getStateRetainType']()!==''?this[_0x50201e(0x2af)]():(_0x39f35f[_0x50201e(0x431)][_0x50201e(0x366)]['call'](this),this['initMembersSkillsStatesCore']());else{const _0xa24aae=RegExp['$1']['split'](',');for(const _0x20ad6e of _0xa24aae){const _0x5dc6fe=DataManager['getSkillIdWithName'](_0x20ad6e);if(!_0x5dc6fe)continue;if(_0x5cb3ab[_0x50201e(0x3db)](_0x5dc6fe))return![];}return!![];}}}if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x50201e(0x323)!==_0x50201e(0x323)){const _0x38b03f=this['statesByCategory'](_0x266df9)[_0x50201e(0x3ae)](_0x3d0795=>this[_0x50201e(0x302)](_0x3d0795['id']));return _0x38b03f['length'];}else{const _0x32bf45=JSON['parse']('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x13a93e of _0x32bf45){if(_0x50201e(0x457)!==_0x50201e(0x457))this[_0x50201e(0x334)]&&this[_0x50201e(0x334)][_0x50201e(0x293)]===_0x3c0113&&this['_statusWindow'][_0x50201e(0x30f)](this[_0x50201e(0x48d)](0x0));else{if(!_0x5cb3ab[_0x50201e(0x533)](_0x13a93e))return![];}}return!![];}}else{if(_0x42b16a['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x50201e(0x436)===_0x50201e(0x48a))return _0xb1b1d3['prototype']['isRightInputMode'][_0x50201e(0x48e)](this);else{const _0x30b94e=RegExp['$1']['split'](',');for(const _0x2fdfa9 of _0x30b94e){if(_0x50201e(0x2b7)===_0x50201e(0x2b7)){const _0x26476c=DataManager['getSkillIdWithName'](_0x2fdfa9);if(!_0x26476c)continue;if(!_0x5cb3ab['hasSkill'](_0x26476c))return![];}else{const _0x279db1=_0x4e428f(_0x5fd297['$1']),_0x2628c5=_0x218f6a[_0x50201e(0x39e)](_0x279db1,_0x50201e(0x27c),0x1,_0x50201e(0x22d));_0x3d37ee[_0x50201e(0x431)][_0x50201e(0x3da)][_0x42b479['id']]=new _0x447804(_0x50201e(0x4eb),_0x2628c5);}}return!![];}}}if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x50201e(0x22c)==='VYrNt'){const _0x2f31a7=JSON[_0x50201e(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x18bf77 of _0x2f31a7){if(!_0x5cb3ab[_0x50201e(0x533)](_0x18bf77))return![];}return!![];}else return this[_0x50201e(0x230)]['GaugeMaxJS'][_0x50201e(0x48e)](this[_0x50201e(0x446)]);}else{if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('oEvzV'===_0x50201e(0x2b3)){const _0x36df20=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x32920c of _0x36df20){if(_0x50201e(0x2ca)!==_0x50201e(0x2ca))_0x11f968['SkillsStatesCore'][_0x50201e(0x244)][_0x50201e(0x48e)](this,_0x25d1a2),this[_0x50201e(0x29f)](_0x1dc26e);else{const _0xd30cc3=DataManager[_0x50201e(0x272)](_0x32920c);if(!_0xd30cc3)continue;if(!_0x5cb3ab['hasSkill'](_0xd30cc3))return![];}}return!![];}else{const _0x250720=_0x1bead8['SkillsStatesCore'][_0x50201e(0x2ac)][_0x50201e(0x412)];return _0x250720['ValueFontMainType']==='number'?_0xeb8110[_0x50201e(0x528)]()-0x6:_0x4ed39b[_0x50201e(0x528)]()-0x2;}}}if(_0x42b16a[_0x50201e(0x31c)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('YwbXf'!==_0x50201e(0x4a4)){const _0x2aa0c9=_0x294dc9[_0x50201e(0x431)]['Settings'][_0x50201e(0x412)];if(_0x2aa0c9[_0x50201e(0x30e)]){if(_0x2aa0c9[_0x50201e(0x37c)]===0x1)return this[_0x50201e(0x3c5)]();else{if(_0x2aa0c9[_0x50201e(0x37c)]===0x2)return this[_0x50201e(0x3de)]();}}const _0x3fe5f6=_0x2aa0c9['PresetLabelGaugeColor'];return _0x3b7f01[_0x50201e(0x308)](_0x3fe5f6);}else{const _0x24ea6d=JSON[_0x50201e(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x568d49 of _0x24ea6d){if(_0x5cb3ab['hasSkill'](_0x568d49))return!![];}return![];}}else{if(_0x42b16a['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x50201e(0x22b)!=='tQFGv'){const _0x770b02=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x24a8c8 of _0x770b02){const _0x5190da=DataManager[_0x50201e(0x272)](_0x24a8c8);if(!_0x5190da)continue;if(_0x5cb3ab[_0x50201e(0x533)](_0x5190da))return!![];}return![];}else{_0x3a3983[_0x50201e(0x431)][_0x50201e(0x31b)][_0x50201e(0x48e)](this,_0x210902);if(!this[_0x50201e(0x284)](_0x415164))this[_0x50201e(0x4b0)](_0x3e3f96);}}}if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('sWkbX'===_0x50201e(0x2c5))_0xe761e6[_0x50201e(0x431)]['Game_Battler_addDebuff'][_0x50201e(0x48e)](this,_0x1df513,_0x230689),this[_0x50201e(0x450)](_0x2a57ef)&&this['onAddDebuff'](_0x372118,_0x268a6b);else{const _0x59d516=JSON[_0x50201e(0x320)]('['+RegExp['$1'][_0x50201e(0x31c)](/\d+/g)+']');for(const _0x32a4e6 of _0x59d516){if(!_0x5cb3ab[_0x50201e(0x533)](_0x32a4e6))return!![];}return![];}}else{if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x50201e(0x4a3)===_0x50201e(0x4a3)){const _0xa03d57=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x41558a of _0xa03d57){if(_0x50201e(0x3ce)!=='ciKbK')this[_0x50201e(0x28c)](_0x45be32);else{const _0x2b1fb8=DataManager['getSkillIdWithName'](_0x41558a);if(!_0x2b1fb8)continue;if(!_0x5cb3ab[_0x50201e(0x533)](_0x2b1fb8))return!![];}}return![];}else{const _0x49dfa9=this[_0x50201e(0x3d5)][_0x2d972c];return _0x227622[_0x50201e(0x431)][_0x50201e(0x2ac)][_0x50201e(0x35d)][_0x50201e(0x4cd)][_0x50201e(0x48e)](this,_0x149319,_0x49dfa9);}}}if(_0x42b16a['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x50201e(0x3bf)==='DgpNK')this[_0x50201e(0x230)][_0x50201e(0x503)][_0x50201e(0x48e)](this);else{const _0x2b56b1=JSON[_0x50201e(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5391f6 of _0x2b56b1){if(!_0x5cb3ab[_0x50201e(0x533)](_0x5391f6))return!![];}return![];}}else{if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4f1e02=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x145b29 of _0x4f1e02){const _0x3f6d95=DataManager['getSkillIdWithName'](_0x145b29);if(!_0x3f6d95)continue;if(!_0x5cb3ab[_0x50201e(0x533)](_0x3f6d95))return!![];}return![];}}if(_0x42b16a['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x232858=JSON[_0x50201e(0x320)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4c4d3e of _0x232858){if(_0x5cb3ab[_0x50201e(0x533)](_0x4c4d3e))return![];}return!![];}else{if(_0x42b16a[_0x50201e(0x31c)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3031f4=RegExp['$1'][_0x50201e(0x45e)](',');for(const _0x19070c of _0x3031f4){const _0x4da83f=DataManager[_0x50201e(0x272)](_0x19070c);if(!_0x4da83f)continue;if(_0x5cb3ab[_0x50201e(0x533)](_0x4da83f))return![];}return!![];}}return!![];},Window_SkillList['prototype']['checkShowHideJS']=function(_0x300666){const _0x43e623=_0x5e012b,_0x2f5115=_0x300666[_0x43e623(0x37b)],_0x2ea286=VisuMZ[_0x43e623(0x431)][_0x43e623(0x451)];return _0x2ea286[_0x300666['id']]?_0x2ea286[_0x300666['id']][_0x43e623(0x48e)](this,_0x300666):!![];},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x400)]=Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x2ec)],Window_SkillList[_0x5e012b(0x2ea)]['drawItem']=function(_0x1b3e7a){const _0x1deffb=_0x5e012b,_0x4fc584=this[_0x1deffb(0x48d)](_0x1b3e7a),_0x28f4b6=_0x4fc584[_0x1deffb(0x3a5)];if(_0x4fc584)this[_0x1deffb(0x218)](_0x4fc584);VisuMZ['SkillsStatesCore']['Window_SkillList_drawItem'][_0x1deffb(0x48e)](this,_0x1b3e7a);if(_0x4fc584)_0x4fc584['name']=_0x28f4b6;},Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x218)]=function(_0x1a5768){const _0x525642=_0x5e012b;if(_0x1a5768&&_0x1a5768[_0x525642(0x37b)][_0x525642(0x31c)](/<LIST NAME:[ ](.*)>/i)){_0x1a5768['name']=String(RegExp['$1'])[_0x525642(0x229)]();for(;;){if(_0x525642(0x478)===_0x525642(0x478)){if(_0x1a5768[_0x525642(0x3a5)][_0x525642(0x31c)](/\\V\[(\d+)\]/gi))_0x1a5768[_0x525642(0x3a5)]=_0x1a5768[_0x525642(0x3a5)][_0x525642(0x43d)](/\\V\[(\d+)\]/gi,(_0x37e5a7,_0x143117)=>$gameVariables['value'](parseInt(_0x143117)));else{if(_0x525642(0x361)!==_0x525642(0x361)){if(!_0x48fc3f[_0x525642(0x433)](_0x44f72c))return!![];}else break;}}else return _0x227676(_0x93e4f7['$1']);}}},Window_SkillList[_0x5e012b(0x2ea)][_0x5e012b(0x343)]=function(_0x7768c5,_0x4a3c78,_0x9afc2f,_0xabd437){const _0x1781fc=_0x5e012b;Window_Base['prototype'][_0x1781fc(0x343)][_0x1781fc(0x48e)](this,this[_0x1781fc(0x321)],_0x7768c5,_0x4a3c78,_0x9afc2f,_0xabd437);},Window_SkillList['prototype'][_0x5e012b(0x201)]=function(_0x4eec6d){const _0x1532e2=_0x5e012b;this['_statusWindow']=_0x4eec6d,this[_0x1532e2(0x35b)]();},VisuMZ[_0x5e012b(0x431)][_0x5e012b(0x3f2)]=Window_SkillList['prototype'][_0x5e012b(0x278)],Window_SkillList['prototype'][_0x5e012b(0x278)]=function(){const _0x474c0a=_0x5e012b;VisuMZ[_0x474c0a(0x431)]['Window_SkillList_updateHelp']['call'](this);if(this[_0x474c0a(0x334)]&&this[_0x474c0a(0x334)][_0x474c0a(0x293)]===Window_ShopStatus){if(_0x474c0a(0x35e)===_0x474c0a(0x41c))return _0x474c0a(0x319);else this[_0x474c0a(0x334)]['setItem'](this[_0x474c0a(0x387)]());}};