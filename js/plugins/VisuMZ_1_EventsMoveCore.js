//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.56;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.56] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0x270971=_0xb856;function _0xb856(_0x36dcf2,_0x22d7b9){const _0x45a963=_0x45a9();return _0xb856=function(_0xb8566f,_0xa57ec8){_0xb8566f=_0xb8566f-0x8a;let _0x52146b=_0x45a963[_0xb8566f];return _0x52146b;},_0xb856(_0x36dcf2,_0x22d7b9);}(function(_0x41aa73,_0x441d99){const _0x39ad4e=_0xb856,_0x583f8c=_0x41aa73();while(!![]){try{const _0x4f72b7=-parseInt(_0x39ad4e(0x3d6))/0x1*(-parseInt(_0x39ad4e(0xc8))/0x2)+parseInt(_0x39ad4e(0x33d))/0x3+-parseInt(_0x39ad4e(0x2b1))/0x4*(-parseInt(_0x39ad4e(0x4a5))/0x5)+-parseInt(_0x39ad4e(0x5b7))/0x6+-parseInt(_0x39ad4e(0x4b4))/0x7*(-parseInt(_0x39ad4e(0xd9))/0x8)+-parseInt(_0x39ad4e(0x229))/0x9*(-parseInt(_0x39ad4e(0x539))/0xa)+-parseInt(_0x39ad4e(0x478))/0xb;if(_0x4f72b7===_0x441d99)break;else _0x583f8c['push'](_0x583f8c['shift']());}catch(_0x329fa8){_0x583f8c['push'](_0x583f8c['shift']());}}}(_0x45a9,0xe6424));var label=_0x270971(0x543),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x270971(0x49b)](function(_0x17ef51){const _0x2336dd=_0x270971;return _0x17ef51[_0x2336dd(0x2b3)]&&_0x17ef51[_0x2336dd(0x3e8)][_0x2336dd(0x3fc)]('['+label+']');})[0x0];VisuMZ[label][_0x270971(0x412)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x14ea8c,_0x19932){const _0x4b3cee=_0x270971;for(const _0x4aa3d1 in _0x19932){if(_0x4aa3d1[_0x4b3cee(0x447)](/(.*):(.*)/i)){const _0x5f427c=String(RegExp['$1']),_0x319b94=String(RegExp['$2'])[_0x4b3cee(0x363)]()[_0x4b3cee(0x1c1)]();let _0x5bd0e1,_0x9e1b92,_0x206076;switch(_0x319b94){case _0x4b3cee(0x499):_0x5bd0e1=_0x19932[_0x4aa3d1]!==''?Number(_0x19932[_0x4aa3d1]):0x0;break;case _0x4b3cee(0x16a):_0x9e1b92=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):[],_0x5bd0e1=_0x9e1b92[_0x4b3cee(0x218)](_0x1ff290=>Number(_0x1ff290));break;case _0x4b3cee(0x130):_0x5bd0e1=_0x19932[_0x4aa3d1]!==''?eval(_0x19932[_0x4aa3d1]):null;break;case _0x4b3cee(0x18e):_0x9e1b92=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):[],_0x5bd0e1=_0x9e1b92[_0x4b3cee(0x218)](_0x55a464=>eval(_0x55a464));break;case _0x4b3cee(0x3d4):_0x5bd0e1=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):'';break;case _0x4b3cee(0x538):_0x9e1b92=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):[],_0x5bd0e1=_0x9e1b92[_0x4b3cee(0x218)](_0x31e4e8=>JSON[_0x4b3cee(0x3a1)](_0x31e4e8));break;case _0x4b3cee(0x2c3):_0x5bd0e1=_0x19932[_0x4aa3d1]!==''?new Function(JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1])):new Function(_0x4b3cee(0x262));break;case _0x4b3cee(0x4d7):_0x9e1b92=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):[],_0x5bd0e1=_0x9e1b92['map'](_0x38281d=>new Function(JSON['parse'](_0x38281d)));break;case _0x4b3cee(0x51e):_0x5bd0e1=_0x19932[_0x4aa3d1]!==''?String(_0x19932[_0x4aa3d1]):'';break;case _0x4b3cee(0x31f):_0x9e1b92=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):[],_0x5bd0e1=_0x9e1b92[_0x4b3cee(0x218)](_0x16b55d=>String(_0x16b55d));break;case _0x4b3cee(0x429):_0x206076=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):{},_0x14ea8c[_0x5f427c]={},VisuMZ['ConvertParams'](_0x14ea8c[_0x5f427c],_0x206076);continue;case _0x4b3cee(0x46d):_0x9e1b92=_0x19932[_0x4aa3d1]!==''?JSON[_0x4b3cee(0x3a1)](_0x19932[_0x4aa3d1]):[],_0x5bd0e1=_0x9e1b92[_0x4b3cee(0x218)](_0x2f069f=>VisuMZ['ConvertParams']({},JSON['parse'](_0x2f069f)));break;default:continue;}_0x14ea8c[_0x5f427c]=_0x5bd0e1;}}return _0x14ea8c;},(_0x483fea=>{const _0x316575=_0x270971,_0x4f56af=_0x483fea[_0x316575(0x292)];for(const _0x4e588d of dependencies){if(_0x316575(0x2d2)===_0x316575(0x2d2)){if(!Imported[_0x4e588d]){alert(_0x316575(0x628)[_0x316575(0x27e)](_0x4f56af,_0x4e588d)),SceneManager[_0x316575(0x48c)]();break;}}else _0x9754b2[_0x316575(0x543)][_0x316575(0x3e4)]['call'](this),this[_0x316575(0x4ce)][_0x316575(0x587)](this[_0x316575(0x571)][_0x316575(0x111)](this));}const _0xe3b199=_0x483fea['description'];if(_0xe3b199[_0x316575(0x447)](/\[Version[ ](.*?)\]/i)){const _0x4ba6dd=Number(RegExp['$1']);_0x4ba6dd!==VisuMZ[label]['version']&&(alert(_0x316575(0x4e7)[_0x316575(0x27e)](_0x4f56af,_0x4ba6dd)),SceneManager['exit']());}if(_0xe3b199[_0x316575(0x447)](/\[Tier[ ](\d+)\]/i)){const _0x7f6e53=Number(RegExp['$1']);if(_0x7f6e53<tier){if(_0x316575(0xea)===_0x316575(0xea))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x316575(0x27e)](_0x4f56af,_0x7f6e53,tier)),SceneManager['exit']();else{this[_0x316575(0x5a7)]=this[_0x316575(0x5a7)]||0x0;if(this[_0x316575(0x5a7)]>0x0){this[_0x316575(0x5a7)]--;if(this[_0x316575(0x5a7)]<=0x0&&this[_0x316575(0x297)]!==_0x316575(0x289))this[_0x316575(0x3d0)]();}}}else tier=Math[_0x316575(0x60f)](_0x7f6e53,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x483fea[_0x316575(0x16b)]);})(pluginData),VisuMZ['OperateValues']=function(_0x2a85fe,_0x9ea9b2,_0x34f6bb){switch(_0x34f6bb){case'=':return _0x9ea9b2;break;case'+':return _0x2a85fe+_0x9ea9b2;break;case'-':return _0x2a85fe-_0x9ea9b2;break;case'*':return _0x2a85fe*_0x9ea9b2;break;case'/':return _0x2a85fe/_0x9ea9b2;break;case'%':return _0x2a85fe%_0x9ea9b2;break;}return _0x2a85fe;},PluginManager['registerCommand'](pluginData[_0x270971(0x292)],_0x270971(0xbd),_0x3b93e1=>{const _0x47c649=_0x270971;VisuMZ[_0x47c649(0x317)](_0x3b93e1,_0x3b93e1);switch(_0x3b93e1[_0x47c649(0x198)]){case _0x47c649(0x19d):$gameSystem[_0x47c649(0x99)](!![]);break;case _0x47c649(0xf7):$gameSystem['setAllowEventAutoMovement'](![]);break;case'Toggle':$gameSystem[_0x47c649(0x99)](!$gameSystem[_0x47c649(0x11b)]());break;}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x590),_0x2d97cc=>{const _0x2ab0ce=_0x270971;VisuMZ[_0x2ab0ce(0x317)](_0x2d97cc,_0x2d97cc);const _0x333377=$gameTemp[_0x2ab0ce(0x58a)](),_0x1f0130={'mapId':_0x2d97cc[_0x2ab0ce(0xf1)],'eventId':_0x2d97cc['EventId']||_0x333377[_0x2ab0ce(0x2c4)](),'pageId':_0x2d97cc['PageId']};if(_0x1f0130[_0x2ab0ce(0x4dc)]<=0x0)_0x1f0130['mapId']=$gameMap?$gameMap[_0x2ab0ce(0x4dc)]():0x1;$gameTemp['getLastPluginCommandInterpreter']()['pluginCommandCallEvent'](_0x1f0130);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'DashEnableToggle',_0x2391e8=>{const _0xcd54b7=_0x270971;VisuMZ['ConvertParams'](_0x2391e8,_0x2391e8);switch(_0x2391e8[_0xcd54b7(0x198)]){case _0xcd54b7(0x1fa):$gameSystem['setDashingEnabled'](!![]);break;case _0xcd54b7(0x1d3):$gameSystem['setDashingEnabled'](![]);break;case _0xcd54b7(0x573):$gameSystem[_0xcd54b7(0x595)](!$gameSystem[_0xcd54b7(0x598)]());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x270971(0xa4),_0x198980=>{const _0x2656e3=_0x270971;VisuMZ[_0x2656e3(0x317)](_0x198980,_0x198980);const _0x595458=$gameTemp[_0x2656e3(0x58a)]();_0x198980[_0x2656e3(0xf1)]=_0x198980['MapId']||$gameMap['mapId'](),$gameSystem[_0x2656e3(0x346)](_0x198980['MapId'],_0x198980[_0x2656e3(0x514)]||_0x595458[_0x2656e3(0x2c4)](),_0x198980[_0x2656e3(0x50b)],_0x198980[_0x2656e3(0x1f2)],_0x198980['IconBufferY'],_0x198980[_0x2656e3(0x59f)]);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x1c3),_0x84ba39=>{const _0xd9ac2b=_0x270971;VisuMZ[_0xd9ac2b(0x317)](_0x84ba39,_0x84ba39);const _0x1f549d=$gameTemp[_0xd9ac2b(0x58a)]();_0x84ba39[_0xd9ac2b(0xf1)]=_0x84ba39[_0xd9ac2b(0xf1)]||$gameMap['mapId'](),$gameSystem[_0xd9ac2b(0x3c8)](_0x84ba39['MapId'],_0x84ba39['EventId']||_0x1f549d[_0xd9ac2b(0x2c4)]());}),PluginManager[_0x270971(0x3ec)](pluginData['name'],'EventLabelRefresh',_0x557197=>{const _0x19fe83=_0x270971;if($gameMap){if('wXnRg'==='yHZpH'){_0x4b1f02[_0x19fe83(0x317)](_0x2cb31a,_0x4e4663);const _0xfd31e7=_0x85703c['MapId']||_0x1a92af['mapId']();_0x49f458[_0x19fe83(0x319)](_0xfd31e7);}else for(const _0x427025 of $gameMap[_0x19fe83(0x1b6)]()){_0x427025[_0x19fe83(0xdb)](),_0x427025[_0x19fe83(0x3e3)]();}}if(SceneManager[_0x19fe83(0x15f)]()){const _0x1500cb=SceneManager[_0x19fe83(0x3e0)][_0x19fe83(0x402)];if(_0x1500cb)_0x1500cb[_0x19fe83(0x32b)]();}}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x3ee),_0x21add7=>{const _0x584a5e=_0x270971;VisuMZ['ConvertParams'](_0x21add7,_0x21add7);switch(_0x21add7[_0x584a5e(0x46e)]){case _0x584a5e(0x5bb):$gameSystem[_0x584a5e(0x270)](!![]);break;case _0x584a5e(0x56e):$gameSystem[_0x584a5e(0x270)](![]);break;case _0x584a5e(0x573):$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x584a5e(0x306)]());break;}}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x38b),_0x319c28=>{const _0x2e767b=_0x270971;VisuMZ[_0x2e767b(0x317)](_0x319c28,_0x319c28);const _0x3c257d=$gameTemp[_0x2e767b(0x58a)]();if(!$gameMap)return;const _0xc6d539=$gameMap['event'](_0x319c28['EventId']||_0x3c257d['eventId']());if(_0xc6d539)_0xc6d539[_0x2e767b(0x53e)]();}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x173),_0xf8b415=>{const _0x504fee=_0x270971;VisuMZ[_0x504fee(0x317)](_0xf8b415,_0xf8b415);const _0x4f6c1e=$gameTemp[_0x504fee(0x58a)](),_0xa9ee1=_0xf8b415[_0x504fee(0xf1)]||$gameMap[_0x504fee(0x4dc)](),_0x4023b0=_0xf8b415['EventId']||_0x4f6c1e[_0x504fee(0x2c4)](),_0x801e7f=_0xf8b415[_0x504fee(0x2f8)]||0x0,_0x4e0fa9=_0xf8b415['PosY']||0x0,_0x20e438=_0xf8b415[_0x504fee(0x362)]||0x2,_0x50a03d=((_0xf8b415['PageId']||0x1)-0x1)['clamp'](0x0,0x13),_0x30a2f1=_0xf8b415[_0x504fee(0x3c2)]||0x0;$gameSystem['createSaveEventLocationData'](_0xa9ee1,_0x4023b0,_0x801e7f,_0x4e0fa9,_0x20e438,_0x50a03d,_0x30a2f1);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x2bd),_0x3366e4=>{const _0x1b2c9b=_0x270971;VisuMZ[_0x1b2c9b(0x317)](_0x3366e4,_0x3366e4);const _0x3a3b48=$gameTemp['getLastPluginCommandInterpreter'](),_0x2c8f2a=_0x3366e4[_0x1b2c9b(0xf1)]||$gameMap['mapId'](),_0x5b40a9=_0x3366e4['EventId']||_0x3a3b48[_0x1b2c9b(0x2c4)]();$gameSystem[_0x1b2c9b(0x121)](_0x2c8f2a,_0x5b40a9);}),VisuMZ[_0x270971(0x543)]['ApplyPopupExtraSettings']=function(_0x3016e0,_0x2320ee){const _0xf56b52=_0x270971;_0x2320ee=_0x2320ee||{},_0x3016e0['fadeDuration']={'fadeIn':_0x2320ee['fadeInDuration']||0x0,'fadeOut':_0x2320ee[_0xf56b52(0x2ee)]||0x0},_0x3016e0[_0xf56b52(0x61e)]={'x':_0x2320ee[_0xf56b52(0x2a5)]||0x0,'y':_0x2320ee['startOffsetY']||0x0},_0x3016e0[_0xf56b52(0x4a2)]={'x':_0x2320ee[_0xf56b52(0x2fc)]||0x0,'y':_0x2320ee[_0xf56b52(0x1cd)]||0x0},_0x3016e0[_0xf56b52(0x23b)]={'x':_0x2320ee[_0xf56b52(0x43f)]||0x0,'y':_0x2320ee[_0xf56b52(0x1cf)]||0x0},_0x3016e0[_0xf56b52(0x2ea)]={'x':_0x2320ee['startScaleX']||0x0,'y':_0x2320ee['startScaleY']||0x0},_0x3016e0[_0xf56b52(0x36b)]={'start':_0x2320ee[_0xf56b52(0x4e3)]||0x0,'end':_0x2320ee[_0xf56b52(0x420)]||0x0},_0x3016e0[_0xf56b52(0x117)]={'arc':_0x2320ee[_0xf56b52(0x3cc)]||0x0};},PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x521),_0x44ce74=>{const _0x5f45fc=_0x270971;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x5f45fc(0x4be)]){if(_0x5f45fc(0xe9)===_0x5f45fc(0xe9)){if($gameTemp['isPlaytest']()){if(_0x5f45fc(0x1d6)!==_0x5f45fc(0x1d6))return![];else alert(_0x5f45fc(0x231)+_0x5f45fc(0x56f));}return;}else this[_0x5f45fc(0x533)](_0x24c6cf);}VisuMZ[_0x5f45fc(0x317)](_0x44ce74,_0x44ce74);const _0x19a5df={'text':_0x44ce74[_0x5f45fc(0xa0)]||'','duration':Math[_0x5f45fc(0x60f)](_0x44ce74['MsgDuration']||0x3c,0xc)},_0x40ee25=_0x44ce74[_0x5f45fc(0x393)]||{};VisuMZ[_0x5f45fc(0x543)][_0x5f45fc(0xeb)](_0x19a5df,_0x40ee25);const _0xb17cac=SceneManager['_scene']['_spriteset'];if(_0xb17cac){const _0x5d9977=$gamePlayer;_0xb17cac[_0x5f45fc(0xce)](_0x5d9977,_0x19a5df);}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x5ce),_0x1fd511=>{const _0x292365=_0x270971;if(!SceneManager[_0x292365(0x383)]())return;if(!Imported[_0x292365(0x4be)]){if($gameTemp[_0x292365(0x4ed)]()){if(_0x292365(0x115)===_0x292365(0x27a)){const _0x192cd5=_0xf95ef3[_0x292365(0x257)](this[_0x292365(0x4c5)]/0x3c/0x3c),_0x1bf213=_0x1430a9[_0x292365(0x257)](this[_0x292365(0x4c5)]/0x3c)%0x3c,_0x37f384=this[_0x292365(0x4c5)]%0x3c;let _0x25e569=_0x1bf213['padZero'](0x2)+':'+_0x37f384['padZero'](0x2);if(_0x192cd5>0x0)_0x25e569=_0x292365(0x107)[_0x292365(0x27e)](_0x192cd5,_0x25e569);return _0x25e569;}else alert(_0x292365(0x231)+_0x292365(0x56f));}return;}VisuMZ['ConvertParams'](_0x1fd511,_0x1fd511);const _0xf29e69=_0x1fd511[_0x292365(0x1f0)]||0x0,_0xf9afde={'text':_0x1fd511[_0x292365(0xa0)]||'','duration':Math[_0x292365(0x60f)](_0x1fd511[_0x292365(0x416)]||0x3c,0xc)},_0x431f61=_0x1fd511['PopupExtra']||{};VisuMZ[_0x292365(0x543)]['ApplyPopupExtraSettings'](_0xf9afde,_0x431f61);const _0x3c1cbc=SceneManager[_0x292365(0x3e0)][_0x292365(0x402)];if(_0x3c1cbc){const _0x624038=$gamePlayer['followers']()[_0x292365(0x41f)](_0xf29e69);_0x3c1cbc[_0x292365(0xce)](_0x624038,_0xf9afde);}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x3e1),_0x1146c8=>{const _0x14ed7d=_0x270971;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x14ed7d(0x4be)]){$gameTemp[_0x14ed7d(0x4ed)]()&&alert(_0x14ed7d(0x231)+_0x14ed7d(0x56f));return;}VisuMZ[_0x14ed7d(0x317)](_0x1146c8,_0x1146c8);const _0x1c14fe=$gameTemp['getLastPluginCommandInterpreter'](),_0x10f9de=_0x1146c8['EventId']||(_0x1c14fe?_0x1c14fe['eventId']():0x1),_0x622d06={'text':_0x1146c8[_0x14ed7d(0xa0)]||'','duration':Math[_0x14ed7d(0x60f)](_0x1146c8[_0x14ed7d(0x416)]||0x3c,0xc)},_0x47cd1c=_0x1146c8['PopupExtra']||{};VisuMZ[_0x14ed7d(0x543)]['ApplyPopupExtraSettings'](_0x622d06,_0x47cd1c);const _0x2c394c=SceneManager['_scene'][_0x14ed7d(0x402)];if(_0x2c394c){const _0x42d155=$gameMap[_0x14ed7d(0x22b)](_0x10f9de);_0x2c394c[_0x14ed7d(0xce)](_0x42d155,_0x622d06);}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'MsgPopupTargetTile',_0x3f5674=>{const _0x15cd1e=_0x270971;if(!SceneManager[_0x15cd1e(0x383)]())return;if(!Imported[_0x15cd1e(0x4be)]){if(_0x15cd1e(0x407)!==_0x15cd1e(0x325)){$gameTemp[_0x15cd1e(0x4ed)]()&&alert(_0x15cd1e(0x231)+_0x15cd1e(0x56f));return;}else return _0x43cf7a>0x0?0x2:0x8;}VisuMZ[_0x15cd1e(0x317)](_0x3f5674,_0x3f5674);const _0xad8ef6={'text':_0x3f5674[_0x15cd1e(0xa0)]||'','duration':Math['max'](_0x3f5674['MsgDuration']||0x3c,0xc),'tileCoordinates':{'x':Math[_0x15cd1e(0x594)](_0x3f5674[_0x15cd1e(0x614)]||0x0),'y':Math['round'](_0x3f5674[_0x15cd1e(0x265)]||0x0)}},_0x5df28c=_0x3f5674[_0x15cd1e(0x393)]||{};VisuMZ['EventsMoveCore'][_0x15cd1e(0xeb)](_0xad8ef6,_0x5df28c);const _0x559d72=SceneManager[_0x15cd1e(0x3e0)][_0x15cd1e(0x402)];_0x559d72&&_0x559d72[_0x15cd1e(0x20b)](_0xad8ef6);}),PluginManager['registerCommand'](pluginData['name'],_0x270971(0x25e),_0xa45af1=>{const _0x2b58f5=_0x270971;VisuMZ[_0x2b58f5(0x317)](_0xa45af1,_0xa45af1);const _0x425ac1=_0xa45af1[_0x2b58f5(0x168)];$gameTimer[_0x2b58f5(0x34f)](_0x425ac1);}),PluginManager['registerCommand'](pluginData[_0x270971(0x292)],_0x270971(0x63c),_0x4f2fcd=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager['registerCommand'](pluginData['name'],_0x270971(0xa5),_0x50ec99=>{const _0x4a4c66=_0x270971;if(!$gameTimer[_0x4a4c66(0x3d9)]())return;VisuMZ[_0x4a4c66(0x317)](_0x50ec99,_0x50ec99);let _0x158402=0x0;_0x158402+=_0x50ec99[_0x4a4c66(0x3d7)],_0x158402+=_0x50ec99[_0x4a4c66(0x57a)]*0x3c,_0x158402+=_0x50ec99[_0x4a4c66(0x372)]*0x3c*0x3c,_0x158402+=_0x50ec99[_0x4a4c66(0x54a)]*0x3c*0x3c*0x3c,$gameTimer[_0x4a4c66(0x48a)](_0x158402);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'EventTimerFramesSet',_0x1d25d0=>{const _0x2099ad=_0x270971;if(!$gameTimer[_0x2099ad(0x3d9)]())return;VisuMZ[_0x2099ad(0x317)](_0x1d25d0,_0x1d25d0);let _0x435032=0x0;_0x435032+=_0x1d25d0[_0x2099ad(0x3d7)],_0x435032+=_0x1d25d0['Seconds']*0x3c,_0x435032+=_0x1d25d0['Minutes']*0x3c*0x3c,_0x435032+=_0x1d25d0[_0x2099ad(0x54a)]*0x3c*0x3c*0x3c,$gameTimer[_0x2099ad(0x55b)](_0x435032);}),PluginManager['registerCommand'](pluginData[_0x270971(0x292)],_0x270971(0x26c),_0x8c6b9=>{const _0x3f6065=_0x270971;if(!$gameTimer[_0x3f6065(0x3d9)]())return;$gameTimer[_0x3f6065(0x2b7)]();}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x16c),_0x33e77e=>{const _0x56a66c=_0x270971;if(!$gameTimer[_0x56a66c(0x3d9)]())return;$gameTimer[_0x56a66c(0x217)]();}),PluginManager[_0x270971(0x3ec)](pluginData['name'],'EventTimerSpeed',_0x7b836a=>{const _0x3aae58=_0x270971;VisuMZ[_0x3aae58(0x317)](_0x7b836a,_0x7b836a);const _0x4075f5=_0x7b836a['Speed']||0x0;$gameTimer[_0x3aae58(0x414)](_0x4075f5);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x547),_0x2b2f14=>{const _0x5d5451=_0x270971;VisuMZ[_0x5d5451(0x317)](_0x2b2f14,_0x2b2f14);const _0x4af21f=!_0x2b2f14[_0x5d5451(0x34b)];$gameSystem['setStopFollowerChasing'](_0x4af21f);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x248),_0x5ba618=>{const _0x5860ba=_0x270971;VisuMZ[_0x5860ba(0x317)](_0x5ba618,_0x5ba618);const _0x3d06a9=(_0x5ba618[_0x5860ba(0x54e)]||0x0)-0x1,_0x56cad7=!_0x5ba618['Chase'],_0x19bfe2=$gamePlayer[_0x5860ba(0x268)]()['follower'](_0x3d06a9);if(_0x19bfe2)_0x19bfe2[_0x5860ba(0x48d)](_0x56cad7);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x588),_0x262a64=>{const _0x1fdfd5=_0x270971;VisuMZ[_0x1fdfd5(0x317)](_0x262a64,_0x262a64);const _0xe4e88d=_0x262a64[_0x1fdfd5(0x54e)];$gameSystem[_0x1fdfd5(0x1b0)](_0xe4e88d);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'FollowerReset',_0x5f2116=>{const _0x3ed022=_0x270971;VisuMZ['ConvertParams'](_0x5f2116,_0x5f2116),$gameSystem[_0x3ed022(0x1b0)](0x0),$gameSystem[_0x3ed022(0x113)](![]);for(const _0x52dfff of $gamePlayer[_0x3ed022(0x268)]()[_0x3ed022(0x496)]){if(_0x3ed022(0x55f)!==_0x3ed022(0x55f))this[_0x3ed022(0x4ce)]=new _0x149c6f(_0x11aa0c[_0x3ed022(0x594)](_0x5c2406['boxWidth']/0x2),0x30),this[_0x3ed022(0x4ce)][_0x3ed022(0x3b5)]=this[_0x3ed022(0x3b5)](),this['bitmap'][_0x3ed022(0x4fc)]=this[_0x3ed022(0x4fc)](),this[_0x3ed022(0x4ce)]['outlineColor']=_0x1c1c97[_0x3ed022(0x32c)]();else{if(_0x52dfff)_0x52dfff[_0x3ed022(0x48d)](![]);}}}),PluginManager['registerCommand'](pluginData[_0x270971(0x292)],_0x270971(0x4bf),_0xd66949=>{const _0x2b78ce=_0x270971;VisuMZ[_0x2b78ce(0x317)](_0xd66949,_0xd66949);const _0x38d57d=$gameTemp[_0x2b78ce(0x58a)]();_0xd66949[_0x2b78ce(0xf1)]=_0xd66949[_0x2b78ce(0xf1)]||$gameMap[_0x2b78ce(0x4dc)]();const _0x3e28c7=[_0xd66949[_0x2b78ce(0xf1)],_0xd66949[_0x2b78ce(0x514)]||_0x38d57d[_0x2b78ce(0x2c4)](),_0xd66949[_0x2b78ce(0x570)]],_0x413a38=_0xd66949['TargetSwitchId'],_0x5633d0=$gameSelfSwitches[_0x2b78ce(0x481)](_0x3e28c7)||![];$gameSwitches['setValue'](_0x413a38,_0x5633d0);}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x11e),_0x13f92d=>{const _0x2d96c5=_0x270971;VisuMZ['ConvertParams'](_0x13f92d,_0x13f92d);const _0x221462=$gameTemp[_0x2d96c5(0x58a)]();_0x13f92d[_0x2d96c5(0xf1)]=_0x13f92d[_0x2d96c5(0xf1)]||$gameMap[_0x2d96c5(0x4dc)]();const _0x7fe7c=[_0x13f92d[_0x2d96c5(0xf1)],_0x13f92d['EventId']||_0x221462[_0x2d96c5(0x2c4)](),'Self\x20Switch\x20%1'[_0x2d96c5(0x27e)](_0x13f92d[_0x2d96c5(0x1e3)])],_0x4ef6f7=_0x13f92d[_0x2d96c5(0xe5)],_0x31b3cf=$gameSelfSwitches[_0x2d96c5(0x481)](_0x7fe7c)||![];$gameSwitches[_0x2d96c5(0x5d7)](_0x4ef6f7,_0x31b3cf);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x3f2),_0x153c68=>{const _0x3bb74d=_0x270971;VisuMZ[_0x3bb74d(0x317)](_0x153c68,_0x153c68);const _0x567f08=$gameTemp[_0x3bb74d(0x58a)]();_0x153c68['MapId']=_0x153c68[_0x3bb74d(0xf1)]||$gameMap['mapId']();const _0x22e20e=[_0x153c68[_0x3bb74d(0xf1)],_0x153c68[_0x3bb74d(0x514)]||_0x567f08[_0x3bb74d(0x2c4)](),_0x3bb74d(0x281)[_0x3bb74d(0x27e)](_0x153c68[_0x3bb74d(0x535)])],_0x3ba0e4=_0x153c68[_0x3bb74d(0x5d6)],_0x4de334=$gameSelfSwitches[_0x3bb74d(0x481)](_0x22e20e)||![];$gameVariables['setValue'](_0x3ba0e4,_0x4de334);}),PluginManager['registerCommand'](pluginData['name'],'MorphEventTo',_0x1fcf41=>{const _0x177d66=_0x270971;VisuMZ[_0x177d66(0x317)](_0x1fcf41,_0x1fcf41);if(!$gameMap)return;const _0x363776=$gameTemp[_0x177d66(0x58a)](),_0x16fc49=_0x1fcf41[_0x177d66(0x239)];_0x1fcf41[_0x177d66(0x307)]=_0x1fcf41[_0x177d66(0x307)]||$gameMap[_0x177d66(0x4dc)](),_0x1fcf41[_0x177d66(0x431)]=_0x1fcf41[_0x177d66(0x431)]||$gameMap[_0x177d66(0x4dc)](),_0x1fcf41[_0x177d66(0x293)]=_0x1fcf41[_0x177d66(0x293)][_0x177d66(0x363)]()[_0x177d66(0x1c1)]();if(!_0x16fc49&&_0x1fcf41[_0x177d66(0x307)]!==$gameMap[_0x177d66(0x4dc)]())return;if($gameMap['mapId']()===_0x1fcf41['Step1MapId']){const _0x17f117=$gameMap[_0x177d66(0x22b)](_0x1fcf41[_0x177d66(0x4c8)]||_0x363776['eventId']());if(!_0x17f117)return;_0x1fcf41['TemplateName']!=='UNTITLED'?_0x17f117[_0x177d66(0x3f5)](_0x1fcf41[_0x177d66(0x293)]):_0x17f117[_0x177d66(0x135)](_0x1fcf41[_0x177d66(0x431)],_0x1fcf41[_0x177d66(0x264)]||_0x363776['eventId']());}if(_0x16fc49){if(_0x177d66(0x1ce)==='GyRQn'){if(_0xa8820c[this[_0x177d66(0x35c)]])this[_0x177d66(0x501)]='',this[_0x177d66(0x3bb)]();else return!![];}else $gameSystem[_0x177d66(0xba)](_0x1fcf41[_0x177d66(0x307)],_0x1fcf41[_0x177d66(0x4c8)],_0x1fcf41['TemplateName'],_0x1fcf41[_0x177d66(0x431)],_0x1fcf41['Step2EventId']);}}),PluginManager[_0x270971(0x3ec)](pluginData['name'],'MorphEventRemove',_0x3869a2=>{const _0x6a8e79=_0x270971;VisuMZ[_0x6a8e79(0x317)](_0x3869a2,_0x3869a2);if(!$gameMap)return;const _0xaa60f8=$gameTemp['getLastPluginCommandInterpreter']();_0x3869a2[_0x6a8e79(0xf1)]=_0x3869a2[_0x6a8e79(0xf1)]||$gameMap[_0x6a8e79(0x4dc)]();if($gameMap[_0x6a8e79(0x4dc)]()===_0x3869a2[_0x6a8e79(0xf1)]){if('yjpEq'===_0x6a8e79(0x42c))this[_0x6a8e79(0x177)]='';else{const _0x322371=$gameMap['event'](_0x3869a2[_0x6a8e79(0x514)]||_0xaa60f8[_0x6a8e79(0x2c4)]());_0x322371[_0x6a8e79(0x419)]();}}_0x3869a2['RemovePreserve']&&$gameSystem[_0x6a8e79(0x19e)](_0x3869a2['MapId'],_0x3869a2[_0x6a8e79(0x514)]||_0xaa60f8['eventId']());}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'PlayerIconChange',_0x3615fb=>{const _0x65cee0=_0x270971;VisuMZ[_0x65cee0(0x317)](_0x3615fb,_0x3615fb),$gameSystem[_0x65cee0(0x4f3)]($gamePlayer,_0x3615fb[_0x65cee0(0x50b)],_0x3615fb[_0x65cee0(0x1f2)],_0x3615fb['IconBufferY'],_0x3615fb['IconBlendMode']);}),PluginManager['registerCommand'](pluginData[_0x270971(0x292)],_0x270971(0x60c),_0x384248=>{const _0x4ee16f=_0x270971;VisuMZ['ConvertParams'](_0x384248,_0x384248),$gameSystem[_0x4ee16f(0x279)]($gamePlayer);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x5ec),_0x47bb6b=>{const _0x41e69d=_0x270971;VisuMZ[_0x41e69d(0x317)](_0x47bb6b,_0x47bb6b),$gameSystem[_0x41e69d(0x48e)](!_0x47bb6b[_0x41e69d(0x1fa)]);}),PluginManager[_0x270971(0x3ec)](pluginData['name'],'PlayerMovementDiagonal',_0x2d9e9b=>{const _0x30f160=_0x270971;VisuMZ['ConvertParams'](_0x2d9e9b,_0x2d9e9b),$gameSystem[_0x30f160(0x467)](_0x2d9e9b['Setting']);}),PluginManager['registerCommand'](pluginData[_0x270971(0x292)],_0x270971(0x160),_0x18d9c7=>{const _0x4e67e2=_0x270971;VisuMZ['ConvertParams'](_0x18d9c7,_0x18d9c7);const _0x11525d=_0x18d9c7[_0x4e67e2(0xf1)]||$gameMap['mapId']();$gameSelfSwitches[_0x4e67e2(0x319)](_0x11525d);}),PluginManager['registerCommand'](pluginData['name'],_0x270971(0xfe),_0x32ef39=>{const _0x4aa972=_0x270971;VisuMZ['ConvertParams'](_0x32ef39,_0x32ef39);const _0x344b63=$gameTemp['getLastPluginCommandInterpreter']();_0x32ef39[_0x4aa972(0xf1)]=_0x32ef39['MapId']||$gameMap[_0x4aa972(0x4dc)]();const _0x3ed3cc=[_0x32ef39[_0x4aa972(0xf1)],_0x32ef39[_0x4aa972(0x514)]||_0x344b63['eventId'](),_0x32ef39['Letter']];switch(_0x32ef39[_0x4aa972(0x198)]){case'ON':$gameSelfSwitches[_0x4aa972(0x5d7)](_0x3ed3cc,!![]);break;case'OFF':$gameSelfSwitches[_0x4aa972(0x5d7)](_0x3ed3cc,![]);break;case _0x4aa972(0x573):$gameSelfSwitches[_0x4aa972(0x5d7)](_0x3ed3cc,!$gameSelfSwitches[_0x4aa972(0x481)](_0x3ed3cc));break;}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x21c),_0x588170=>{const _0x376cc4=_0x270971;VisuMZ[_0x376cc4(0x317)](_0x588170,_0x588170);const _0x40c7d7=$gameTemp[_0x376cc4(0x58a)]();_0x588170[_0x376cc4(0xf1)]=_0x588170[_0x376cc4(0xf1)]||$gameMap[_0x376cc4(0x4dc)]();const _0x5f09a7=[_0x588170['MapId'],_0x588170[_0x376cc4(0x514)]||_0x40c7d7['eventId'](),'Self\x20Switch\x20%1'['format'](_0x588170[_0x376cc4(0x1e3)])];switch(_0x588170[_0x376cc4(0x198)]){case'ON':$gameSelfSwitches[_0x376cc4(0x5d7)](_0x5f09a7,!![]);break;case'OFF':$gameSelfSwitches['setValue'](_0x5f09a7,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x5f09a7,!$gameSelfSwitches['value'](_0x5f09a7));break;}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'SelfVariableID',_0x3db9b9=>{const _0x122bdd=_0x270971;VisuMZ[_0x122bdd(0x317)](_0x3db9b9,_0x3db9b9);const _0x15fb8e=$gameTemp[_0x122bdd(0x58a)]();_0x3db9b9[_0x122bdd(0xf1)]=_0x3db9b9[_0x122bdd(0xf1)]||$gameMap[_0x122bdd(0x4dc)]();const _0x4b1f98=[_0x3db9b9[_0x122bdd(0xf1)],_0x3db9b9[_0x122bdd(0x514)]||_0x15fb8e['eventId'](),_0x122bdd(0x281)[_0x122bdd(0x27e)](_0x3db9b9[_0x122bdd(0x535)])],_0x54ae66=VisuMZ[_0x122bdd(0x5a9)]($gameSelfSwitches[_0x122bdd(0x481)](_0x4b1f98),_0x3db9b9[_0x122bdd(0x198)],_0x3db9b9[_0x122bdd(0x578)]);$gameSelfSwitches[_0x122bdd(0x5d7)](_0x4b1f98,_0x54ae66);}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x5ad),_0x24d763=>{const _0x238d59=_0x270971;VisuMZ['ConvertParams'](_0x24d763,_0x24d763);const _0x4cddaa=$gameTemp[_0x238d59(0x58a)](),_0x419412={'template':_0x24d763[_0x238d59(0x293)],'mapId':_0x24d763[_0x238d59(0xf1)]||$gameMap[_0x238d59(0x4dc)](),'eventId':_0x24d763[_0x238d59(0x514)]||_0x4cddaa[_0x238d59(0x2c4)](),'x':_0x24d763[_0x238d59(0x2f8)],'y':_0x24d763[_0x238d59(0x259)],'spawnPreserved':_0x24d763[_0x238d59(0x1a3)],'spawnEventId':$gameMap['_spawnedEvents'][_0x238d59(0x531)]+0x3e8},_0xdd44b=_0x24d763[_0x238d59(0x566)]||0x0;if(!VisuMZ[_0x238d59(0x14c)][_0x419412[_0x238d59(0x4dc)]]&&_0x419412[_0x238d59(0x4dc)]!==$gameMap[_0x238d59(0x4dc)]()){if('hhEft'===_0x238d59(0x593))this['opacity']-=this[_0x238d59(0xed)]();else{let _0x5bc6a9=_0x238d59(0x148)[_0x238d59(0x27e)](_0x419412['mapId']);_0x5bc6a9+=_0x238d59(0x354),_0x5bc6a9+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x5bc6a9+=_0x238d59(0x59b),_0x5bc6a9+=_0x238d59(0x5a2)[_0x238d59(0x27e)](_0x419412[_0x238d59(0x4dc)]),alert(_0x5bc6a9);return;}}const _0x69e3fb=$gameMap['prepareSpawnedEventAtXY'](_0x419412,_0x24d763['Collision'],_0x24d763['Passability']);if(_0xdd44b){if(_0x238d59(0x2fa)==='yEBrM'){if(!this[_0x238d59(0x27c)])return 0x0;if(this[_0x238d59(0x27c)]['_erased'])return 0x0;const _0x464d33=this[_0x238d59(0x27c)]['getEventIconData']();return _0x464d33?_0x464d33['iconIndex']||0x0:0x0;}else $gameSwitches[_0x238d59(0x5d7)](_0xdd44b,!!_0x69e3fb);}}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],'SpawnEventAtRegion',_0x20d1af=>{const _0x361c06=_0x270971;VisuMZ['ConvertParams'](_0x20d1af,_0x20d1af);const _0x4c8ff2=$gameTemp[_0x361c06(0x58a)](),_0x4c564a={'template':_0x20d1af[_0x361c06(0x293)],'mapId':_0x20d1af[_0x361c06(0xf1)]||$gameMap['mapId'](),'eventId':_0x20d1af['EventId']||_0x4c8ff2['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x20d1af[_0x361c06(0x1a3)],'spawnEventId':$gameMap[_0x361c06(0x5e3)][_0x361c06(0x531)]+0x3e8},_0x423c16=_0x20d1af[_0x361c06(0x566)]||0x0;if(!VisuMZ[_0x361c06(0x14c)][_0x4c564a['mapId']]&&_0x4c564a['mapId']!==$gameMap[_0x361c06(0x4dc)]()){let _0x2d2a2b=_0x361c06(0x148)['format'](_0x4c564a[_0x361c06(0x4dc)]);_0x2d2a2b+=_0x361c06(0x354),_0x2d2a2b+=_0x361c06(0x166),_0x2d2a2b+=_0x361c06(0x59b),_0x2d2a2b+=_0x361c06(0x5a2)['format'](_0x4c564a[_0x361c06(0x4dc)]),alert(_0x2d2a2b);return;}const _0x1f59c0=$gameMap['prepareSpawnedEventAtRegion'](_0x4c564a,_0x20d1af[_0x361c06(0x3b1)],_0x20d1af['Collision'],_0x20d1af['Passability']);_0x423c16&&(_0x361c06(0x1c7)!==_0x361c06(0x1c7)?_0x4e6807['FaceSynchAllSynchTargets'](this[_0x361c06(0x8a)]):$gameSwitches['setValue'](_0x423c16,!!_0x1f59c0));}),PluginManager[_0x270971(0x3ec)](pluginData['name'],'SpawnEventAtTerrainTag',_0x555542=>{const _0xa89aed=_0x270971;VisuMZ[_0xa89aed(0x317)](_0x555542,_0x555542);const _0x516c01=$gameTemp[_0xa89aed(0x58a)](),_0x295cbb={'template':_0x555542[_0xa89aed(0x293)],'mapId':_0x555542[_0xa89aed(0xf1)]||$gameMap['mapId'](),'eventId':_0x555542[_0xa89aed(0x514)]||_0x516c01[_0xa89aed(0x2c4)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x555542['Preserve'],'spawnEventId':$gameMap['_spawnedEvents'][_0xa89aed(0x531)]+0x3e8},_0x58dea0=_0x555542[_0xa89aed(0x566)]||0x0;if(!VisuMZ[_0xa89aed(0x14c)][_0x295cbb[_0xa89aed(0x4dc)]]&&_0x295cbb[_0xa89aed(0x4dc)]!==$gameMap[_0xa89aed(0x4dc)]()){let _0x2129e6=_0xa89aed(0x148)[_0xa89aed(0x27e)](_0x295cbb[_0xa89aed(0x4dc)]);_0x2129e6+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x2129e6+=_0xa89aed(0x166),_0x2129e6+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x2129e6+=_0xa89aed(0x5a2)[_0xa89aed(0x27e)](_0x295cbb[_0xa89aed(0x4dc)]),alert(_0x2129e6);return;}const _0x2fbaec=$gameMap[_0xa89aed(0x55a)](_0x295cbb,_0x555542[_0xa89aed(0xbf)],_0x555542[_0xa89aed(0x1fd)],_0x555542[_0xa89aed(0x482)]);_0x58dea0&&(_0xa89aed(0x206)===_0xa89aed(0x206)?$gameSwitches[_0xa89aed(0x5d7)](_0x58dea0,!!_0x2fbaec):(_0x22cb75[_0xa89aed(0x543)][_0xa89aed(0x18f)][_0xa89aed(0x437)](this),this[_0xa89aed(0x4b2)]()));}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x4ca),_0x2e48ec=>{const _0x334422=_0x270971;VisuMZ[_0x334422(0x317)](_0x2e48ec,_0x2e48ec);const _0xda9951=$gameTemp[_0x334422(0x58a)]();$gameMap[_0x334422(0x2c9)](_0x2e48ec[_0x334422(0x50c)]||_0xda9951[_0x334422(0x2c4)]());}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x421),_0x6d0ec7=>{const _0xa0a578=_0x270971;VisuMZ[_0xa0a578(0x317)](_0x6d0ec7,_0x6d0ec7);const _0x5c57b2=_0x6d0ec7[_0xa0a578(0x2f8)],_0x2bb84a=_0x6d0ec7[_0xa0a578(0x259)];$gameMap['despawnAtXY'](_0x5c57b2,_0x2bb84a);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x29f),_0x56e3c5=>{const _0x20bb80=_0x270971;VisuMZ[_0x20bb80(0x317)](_0x56e3c5,_0x56e3c5),$gameMap['despawnRegions'](_0x56e3c5['Region']);}),PluginManager[_0x270971(0x3ec)](pluginData['name'],_0x270971(0x330),_0x14beeb=>{const _0x370c8a=_0x270971;VisuMZ[_0x370c8a(0x317)](_0x14beeb,_0x14beeb),$gameMap[_0x370c8a(0x60e)](_0x14beeb['TerrainTags']);}),PluginManager[_0x270971(0x3ec)](pluginData[_0x270971(0x292)],_0x270971(0x12b),_0x453846=>{const _0xc380b8=_0x270971;VisuMZ[_0xc380b8(0x317)](_0x453846,_0x453846),$gameMap[_0xc380b8(0x574)]();}),VisuMZ[_0x270971(0x543)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x270971(0xa1)]['onDatabaseLoaded'],Scene_Boot[_0x270971(0xa1)]['onDatabaseLoaded']=function(){const _0x13a147=_0x270971;VisuMZ[_0x13a147(0x543)][_0x13a147(0x1d0)][_0x13a147(0x437)](this),this[_0x13a147(0x558)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x13a147(0x543)][_0x13a147(0x42d)])VisuMZ[_0x13a147(0x543)]['CustomPageConditions']['initialize']();},VisuMZ[_0x270971(0x14c)]=[],VisuMZ[_0x270971(0x4ba)]={},Scene_Boot[_0x270971(0xa1)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x13fdfc=_0x270971;if(DataManager[_0x13fdfc(0x194)]()||DataManager[_0x13fdfc(0x5da)]())return;const _0x3fe460=VisuMZ[_0x13fdfc(0x543)][_0x13fdfc(0x412)]['Template'],_0x5aa159=_0x3fe460['PreloadMaps'][_0x13fdfc(0xe3)](0x0);for(const _0x3574c6 of _0x3fe460[_0x13fdfc(0x46f)]){_0x3574c6[_0x13fdfc(0x178)]=_0x3574c6[_0x13fdfc(0x178)][_0x13fdfc(0x363)]()[_0x13fdfc(0x1c1)](),VisuMZ[_0x13fdfc(0x4ba)][_0x3574c6[_0x13fdfc(0x178)]]=_0x3574c6;if(!_0x5aa159[_0x13fdfc(0x3fc)](_0x3574c6[_0x13fdfc(0x8d)]))_0x5aa159['push'](_0x3574c6['MapID']);}for(const _0x2cb2cb of _0x5aa159){if(VisuMZ[_0x13fdfc(0x14c)][_0x2cb2cb])continue;const _0x23d5ac='Map%1.json'['format'](_0x2cb2cb[_0x13fdfc(0x14f)](0x3)),_0x52f37b=_0x13fdfc(0x9f)[_0x13fdfc(0x27e)](_0x2cb2cb);DataManager[_0x13fdfc(0x581)](_0x52f37b,_0x23d5ac),setTimeout(this[_0x13fdfc(0x357)][_0x13fdfc(0x111)](this,_0x2cb2cb,_0x52f37b),0x64);}},Scene_Boot['prototype'][_0x270971(0x357)]=function(_0xb37ac2,_0x363fa1){const _0xc773d8=_0x270971;if(window[_0x363fa1])VisuMZ[_0xc773d8(0x14c)][_0xb37ac2]=window[_0x363fa1],window[_0x363fa1]=undefined;else{if('gbzGT'!=='gbzGT'){if(this[_0xc773d8(0x1dd)]())return this[_0xc773d8(0x112)](_0x2ab189,_0x540553,_0x4751c6);if(_0x2db8e2[_0xc773d8(0x4d1)](_0x2e9fbd,_0x3f13b0,_0x2dd873,'event'))return!![];if(_0x373f69[_0xc773d8(0x378)](_0x581261,_0x49781f,_0x5bf994,_0xc773d8(0x22b)))return![];return _0x6e2b93[_0xc773d8(0xa1)][_0xc773d8(0x585)][_0xc773d8(0x437)](this,_0x2d754a,_0x295357,_0x129ff9);}else setTimeout(this[_0xc773d8(0x357)][_0xc773d8(0x111)](this,_0xb37ac2,_0x363fa1),0x64);}},VisuMZ[_0x270971(0x3f8)]=[],VisuMZ[_0x270971(0x55e)]=[],VisuMZ[_0x270971(0x256)]=[],VisuMZ[_0x270971(0x4f5)]=[],VisuMZ[_0x270971(0x5f2)]=[],VisuMZ[_0x270971(0x32e)]=[],Scene_Boot['prototype'][_0x270971(0x626)]=function(){const _0x5b7495=_0x270971;for(let _0x5117f4=0x1;_0x5117f4<$dataSystem['switches'][_0x5b7495(0x531)];_0x5117f4++){if($dataSystem[_0x5b7495(0x8f)][_0x5117f4][_0x5b7495(0x447)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches'][_0x5b7495(0x1bd)](_0x5117f4);if($dataSystem[_0x5b7495(0x8f)][_0x5117f4][_0x5b7495(0x447)](/<SELF>/i))VisuMZ['SelfSwitches'][_0x5b7495(0x1bd)](_0x5117f4);if($dataSystem[_0x5b7495(0x8f)][_0x5117f4][_0x5b7495(0x447)](/<MAP>/i))VisuMZ[_0x5b7495(0x256)][_0x5b7495(0x1bd)](_0x5117f4);}for(let _0x25a54c=0x1;_0x25a54c<$dataSystem[_0x5b7495(0xcb)][_0x5b7495(0x531)];_0x25a54c++){if($dataSystem[_0x5b7495(0xcb)][_0x25a54c][_0x5b7495(0x447)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x5b7495(0x1bd)](_0x25a54c);if($dataSystem[_0x5b7495(0xcb)][_0x25a54c]['match'](/<SELF>/i))VisuMZ['SelfVariables']['push'](_0x25a54c);if($dataSystem[_0x5b7495(0xcb)][_0x25a54c]['match'](/<MAP>/i))VisuMZ[_0x5b7495(0x32e)]['push'](_0x25a54c);}},VisuMZ[_0x270971(0x543)][_0x270971(0x42d)]={},VisuMZ[_0x270971(0x543)]['CustomPageConditions']['initialize']=function(){const _0x449536=_0x270971;this[_0x449536(0xe6)]=new Game_CPCInterpreter(),this[_0x449536(0x3c0)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x42d)][_0x270971(0x3c0)]=function(){const _0x252a7f=_0x270971;this[_0x252a7f(0x11f)]=[];for(const _0x3fd76c of $dataCommonEvents){if(!_0x3fd76c)continue;VisuMZ[_0x252a7f(0x543)][_0x252a7f(0x42d)]['loadCPC'](_0x3fd76c);if(_0x3fd76c[_0x252a7f(0x4af)]['length']>0x0)this['_commonEvents'][_0x252a7f(0x1bd)](_0x3fd76c['id']);}},VisuMZ[_0x270971(0x543)][_0x270971(0x42d)][_0x270971(0x216)]=function(_0x547312,_0x135801,_0x59fb26){const _0x3651=_0x270971;return this[_0x3651(0xe6)][_0x3651(0x1e1)](_0x547312,_0x135801),_0x59fb26?this[_0x3651(0xe6)][_0x3651(0x137)](_0x59fb26):this[_0x3651(0xe6)][_0x3651(0x96)](),this[_0x3651(0xe6)][_0x3651(0x3a4)];},VisuMZ[_0x270971(0x543)]['CustomPageConditions'][_0x270971(0x560)]=function(_0x3c3b4c){const _0x4a8ce0=_0x270971;let _0x12b690=![];_0x3c3b4c[_0x4a8ce0(0x4af)]=[];for(const _0x204028 of _0x3c3b4c[_0x4a8ce0(0x157)]){if('RzKKq'!=='RzKKq'){const _0x52332e=this['x'],_0x194cfd=this['y'];return _0x2707df[_0x4a8ce0(0x98)](_0x52332e,_0x194cfd,_0x1ed6d9,_0x5a0f42,_0x3b3c87);}else{if([0x6c,0x198][_0x4a8ce0(0x3fc)](_0x204028['code'])){const _0x20d270=_0x204028[_0x4a8ce0(0x16b)][0x0];if(_0x20d270[_0x4a8ce0(0x447)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x12b690=!![];else{if(_0x20d270[_0x4a8ce0(0x447)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x4a8ce0(0x46b)==='QwyZx')return this[_0x4a8ce0(0x255)](_0x1f19b0);else _0x12b690=![];}}}_0x12b690&&_0x3c3b4c[_0x4a8ce0(0x4af)][_0x4a8ce0(0x1bd)](_0x204028);}}},getSelfSwitchValue=function(_0x4c9207,_0xbe864c,_0x24c6a7){const _0x572da5=_0x270971;let _0x472079=[_0x4c9207,_0xbe864c,_0x572da5(0x35f)['format'](_0x24c6a7)];if(typeof _0x24c6a7==='string'){if(_0x572da5(0x250)!==_0x572da5(0x54b))_0x472079=[_0x4c9207,_0xbe864c,_0x24c6a7['toUpperCase']()[_0x572da5(0x1c1)]()];else{const _0xee7289=this[_0x572da5(0xb2)](_0xfe83af),_0xd0a698=_0x415c15[_0x572da5(0x257)]((this[_0x572da5(0x565)]-_0xee7289[_0x572da5(0x549)])/0x2);this[_0x572da5(0x4cb)](_0x3fd019,_0xd0a698,_0x5617be),_0x3350f0+=_0xee7289['height'];}}return $gameSelfSwitches[_0x572da5(0x481)](_0x472079);},getMapSwitchValue=function(_0x467af3,_0x43afdb){const _0x36b257=_0x270971;let _0x9b887=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'['format'](_0x467af3,_0x43afdb)];return $gameSelfSwitches[_0x36b257(0x481)](_0x9b887);},getMapVariableValue=function(_0x73325c,_0x58fe01){const _0x2fd4f3=_0x270971;let _0x5073bf=[0x0,0x0,_0x2fd4f3(0xc4)[_0x2fd4f3(0x27e)](_0x73325c,_0x58fe01)];return $gameSelfSwitches[_0x2fd4f3(0x481)](_0x5073bf);},getSelfVariableValue=function(_0x470ff2,_0x2f0e28,_0x4d6fc5){const _0x17258e=_0x270971,_0x386e2c=[_0x470ff2,_0x2f0e28,_0x17258e(0x281)[_0x17258e(0x27e)](_0x4d6fc5)];return $gameSelfSwitches[_0x17258e(0x481)](_0x386e2c);},setSelfSwitchValue=function(_0x2b3fdd,_0x13f393,_0x20abf9,_0x479e3c){const _0x1392a3=_0x270971;let _0x41bf73=[_0x2b3fdd,_0x13f393,_0x1392a3(0x35f)[_0x1392a3(0x27e)](_0x20abf9)];if(typeof _0x20abf9===_0x1392a3(0x1f6)){if(_0x1392a3(0x408)===_0x1392a3(0x616)){const _0x19c8c4=_0x5560aa[_0x1392a3(0x11d)]()||this;if(_0x19c8c4[_0x1392a3(0x2a8)]!==_0x18b4ef)return _0x27c644[_0x1392a3(0x543)]['Game_Switches_value'][_0x1392a3(0x437)](this,_0x3f7b84);else{const _0x20beb8=[_0x19c8c4[_0x1392a3(0x61a)],_0x19c8c4[_0x1392a3(0x8a)],'Self\x20Switch\x20%1'['format'](_0x5a872a)];return _0x2f2622[_0x1392a3(0x481)](_0x20beb8);}}else _0x41bf73=[_0x2b3fdd,_0x13f393,_0x20abf9[_0x1392a3(0x363)]()[_0x1392a3(0x1c1)]()];}$gameSelfSwitches[_0x1392a3(0x5d7)](_0x41bf73,_0x479e3c);},setSelfVariableValue=function(_0x45f0fa,_0x5f53f4,_0x3e4e12,_0x26200d){const _0x291689=_0x270971,_0x3a223d=[_0x45f0fa,_0x5f53f4,_0x291689(0x281)[_0x291689(0x27e)](_0x3e4e12)];$gameSelfSwitches[_0x291689(0x5d7)](_0x3a223d,_0x26200d);},setMapSwitchValue=function(_0x2f338b,_0x221184,_0x531d6e){const _0x20875a=_0x270971;let _0xc3f8f6=[0x0,0x0,_0x20875a(0x53c)[_0x20875a(0x27e)](_0x2f338b,_0x221184)];$gameSelfSwitches[_0x20875a(0x5d7)](_0xc3f8f6,_0x531d6e);},setMapVariableValue=function(_0x24562d,_0x3b591f,_0x3e66dc){const _0x3e324=_0x270971;let _0x4e82d2=[0x0,0x0,_0x3e324(0xc4)[_0x3e324(0x27e)](_0x24562d,_0x3b591f)];$gameSelfSwitches[_0x3e324(0x5d7)](_0x4e82d2,_0x3e66dc);},DataManager['isAdvancedSwitch']=function(_0x1eb83e){const _0x3201ec=_0x270971;if(SceneManager[_0x3201ec(0x3e0)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x3201ec(0x3f8)][_0x3201ec(0x3fc)](_0x1eb83e);},DataManager[_0x270971(0x1c0)]=function(_0xfdee10){const _0x41e74d=_0x270971;if(SceneManager[_0x41e74d(0x3e0)][_0x41e74d(0x2a8)]===Scene_Debug)return![];return VisuMZ[_0x41e74d(0x4f5)][_0x41e74d(0x3fc)](_0xfdee10);},DataManager[_0x270971(0x2b6)]=function(_0x27b43c){const _0x2a7154=_0x270971;if(SceneManager[_0x2a7154(0x3e0)][_0x2a7154(0x2a8)]===Scene_Debug)return![];return VisuMZ[_0x2a7154(0x55e)][_0x2a7154(0x3fc)](_0x27b43c);},DataManager[_0x270971(0x5d9)]=function(_0x4eaee5){const _0xba7811=_0x270971;if(SceneManager[_0xba7811(0x3e0)]['constructor']===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0xba7811(0x3fc)](_0x4eaee5);},DataManager[_0x270971(0xe2)]=function(_0x1815ef){if(BattleManager['isBattleTest']())return![];return VisuMZ['MapSwitches']['includes'](_0x1815ef);},DataManager['isMapVariable']=function(_0x3d7613){const _0x2317c8=_0x270971;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x2317c8(0x32e)][_0x2317c8(0x3fc)](_0x3d7613);},SceneManager['isSceneMap']=function(){const _0x22fe83=_0x270971;return this[_0x22fe83(0x3e0)]&&this['_scene'][_0x22fe83(0x2a8)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x232078=_0x270971;return this[_0x232078(0x3e0)]&&this[_0x232078(0x3e0)]instanceof Scene_Map;},VisuMZ[_0x270971(0x543)]['Game_Temp_setDestination']=Game_Temp[_0x270971(0xa1)]['setDestination'],Game_Temp[_0x270971(0xa1)]['setDestination']=function(_0x482309,_0x17f4b6){const _0x2f238a=_0x270971;if(this[_0x2f238a(0x28b)](_0x482309,_0x17f4b6))return;VisuMZ[_0x2f238a(0x543)][_0x2f238a(0x3e6)][_0x2f238a(0x437)](this,_0x482309,_0x17f4b6);},Game_Temp[_0x270971(0xa1)][_0x270971(0x28b)]=function(_0xac7f39,_0x27f31f){const _0x1d08fe=_0x270971,_0x228832=$gameMap[_0x1d08fe(0x2a7)](_0xac7f39,_0x27f31f);for(const _0x2c2e71 of _0x228832){if(_0x1d08fe(0x299)!==_0x1d08fe(0x3ad)){if(_0x2c2e71&&_0x2c2e71['hasClickTrigger']()){if('ZtZjd'===_0x1d08fe(0x2a3))_0x55918d[_0x1d08fe(0x5cc)](this[_0x1d08fe(0x8a)]);else return _0x2c2e71[_0x1d08fe(0x282)](),!![];}}else{if(_0x40bdeb[_0x1d08fe(0x4ed)]())_0x55b78f['log'](_0x4266a2);}}return TouchInput['isLongPressed']()&&_0x228832[_0x1d08fe(0x531)]>0x0&&TouchInput[_0x1d08fe(0x4ef)](),![];},Game_Temp['prototype'][_0x270971(0x2f4)]=function(_0xc67f0b){this['_lastPluginCommandInterpreter']=_0xc67f0b;},Game_Temp[_0x270971(0xa1)][_0x270971(0x58a)]=function(){const _0x5c3007=_0x270971;return this[_0x5c3007(0x5c2)];},Game_Temp[_0x270971(0xa1)]['registerSelfTarget']=function(_0x38ee04){this['_selfTarget']=_0x38ee04;},Game_Temp[_0x270971(0xa1)]['clearSelfTarget']=function(){const _0x5bea06=_0x270971;this[_0x5bea06(0x17e)]=undefined;},Game_Temp['prototype'][_0x270971(0x11d)]=function(){const _0x205301=_0x270971;return this[_0x205301(0x17e)];},VisuMZ[_0x270971(0x543)]['Game_System_initialize']=Game_System[_0x270971(0xa1)]['initialize'],Game_System['prototype'][_0x270971(0x2c2)]=function(){const _0x25a0d1=_0x270971;VisuMZ[_0x25a0d1(0x543)][_0x25a0d1(0x1b4)][_0x25a0d1(0x437)](this),this[_0x25a0d1(0x1f8)](),this[_0x25a0d1(0x1f7)]();},Game_System['prototype'][_0x270971(0x1f8)]=function(){const _0xbb0d8d=_0x270971;this[_0xbb0d8d(0x4da)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this['_MapSpawnedEventData']=[],this[_0xbb0d8d(0xc1)]={},this['_SavedEventLocations']={},this[_0xbb0d8d(0x3c4)]=![],this[_0xbb0d8d(0x22a)]=_0xbb0d8d(0x536);},Game_System[_0x270971(0xa1)]['isDashingEnabled']=function(){const _0x19756b=_0x270971;if(this[_0x19756b(0x4da)]===undefined)this[_0x19756b(0x1f8)]();if(this[_0x19756b(0x4da)][_0x19756b(0x2fe)]===undefined)this[_0x19756b(0x1f8)]();return this['_EventsMoveCoreSettings'][_0x19756b(0x2fe)];},Game_System['prototype']['setDashingEnabled']=function(_0x341777){const _0x26d71f=_0x270971;if(this['_EventsMoveCoreSettings']===undefined)this[_0x26d71f(0x1f8)]();if(this['_EventsMoveCoreSettings'][_0x26d71f(0x2fe)]===undefined)this[_0x26d71f(0x1f8)]();this['_EventsMoveCoreSettings'][_0x26d71f(0x2fe)]=_0x341777;},Game_System[_0x270971(0xa1)]['isAllowEventAutoMovement']=function(){const _0x17fd95=_0x270971;if(this[_0x17fd95(0x4da)]===undefined)this[_0x17fd95(0x1f8)]();if(this[_0x17fd95(0x4da)][_0x17fd95(0x631)]===undefined)this['initEventsMoveCore']();return this[_0x17fd95(0x4da)]['EventAutoMovement'];},Game_System[_0x270971(0xa1)][_0x270971(0x99)]=function(_0x302e96){const _0x452924=_0x270971;if(this[_0x452924(0x4da)]===undefined)this[_0x452924(0x1f8)]();if(this['_EventsMoveCoreSettings'][_0x452924(0x631)]===undefined)this[_0x452924(0x1f8)]();this[_0x452924(0x4da)][_0x452924(0x631)]=_0x302e96;},Game_System[_0x270971(0xa1)][_0x270971(0x306)]=function(){const _0xc72a7f=_0x270971;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0xc72a7f(0x4da)][_0xc72a7f(0x5bd)]===undefined)this[_0xc72a7f(0x1f8)]();return this[_0xc72a7f(0x4da)][_0xc72a7f(0x5bd)];},Game_System['prototype'][_0x270971(0x270)]=function(_0x5bbbcc){const _0xfcefdf=_0x270971;if(this[_0xfcefdf(0x4da)]===undefined)this[_0xfcefdf(0x1f8)]();if(this[_0xfcefdf(0x4da)][_0xfcefdf(0x5bd)]===undefined)this[_0xfcefdf(0x1f8)]();this['_EventsMoveCoreSettings'][_0xfcefdf(0x5bd)]=_0x5bbbcc;},Game_System[_0x270971(0xa1)][_0x270971(0x57c)]=function(){const _0xe2d0a4=_0x270971;return this['_DisablePlayerControl']===undefined&&(_0xe2d0a4(0x1b5)==='zvhBS'?this['_DisablePlayerControl']=![]:(_0x15ab6d[_0xe2d0a4(0xa1)]['update'][_0xe2d0a4(0x437)](this),this[_0xe2d0a4(0x47a)](),this[_0xe2d0a4(0x45d)](),this[_0xe2d0a4(0x5d5)](),this[_0xe2d0a4(0x341)](),this[_0xe2d0a4(0x4f0)]())),this['_DisablePlayerControl'];},Game_System[_0x270971(0xa1)][_0x270971(0x48e)]=function(_0x592ba2){const _0x1d54b9=_0x270971;this[_0x1d54b9(0x3c4)]=_0x592ba2;},Game_System['prototype'][_0x270971(0x458)]=function(){const _0x647b2e=_0x270971;return this[_0x647b2e(0x22a)];},Game_System[_0x270971(0xa1)][_0x270971(0x467)]=function(_0x23eb77){const _0x506316=_0x270971;this[_0x506316(0x22a)]=String(_0x23eb77)[_0x506316(0x261)]()[_0x506316(0x1c1)]();},Game_System['prototype'][_0x270971(0x28f)]=function(_0x39f0df){const _0x44fb02=_0x270971;if(this[_0x44fb02(0x415)]===undefined)this[_0x44fb02(0x1f8)]();if(!_0x39f0df)return null;if(_0x39f0df===$gamePlayer)return this[_0x44fb02(0x415)][_0x44fb02(0xa2)];else{if(_0x44fb02(0x254)===_0x44fb02(0x254)){const _0x458df2=VisuMZ['EventsMoveCore'][_0x44fb02(0x412)],_0x2c555f=_0x44fb02(0x56a)[_0x44fb02(0x27e)](_0x39f0df[_0x44fb02(0x61a)],_0x39f0df[_0x44fb02(0x8a)]);return this[_0x44fb02(0x415)][_0x2c555f]=this[_0x44fb02(0x415)][_0x2c555f]||{'iconIndex':0x0,'bufferX':_0x458df2['Icon'][_0x44fb02(0x110)],'bufferY':_0x458df2[_0x44fb02(0x59a)]['BufferY'],'blendMode':_0x458df2[_0x44fb02(0x59a)][_0x44fb02(0xd4)]},this[_0x44fb02(0x415)][_0x2c555f];}else return!![];}},Game_System[_0x270971(0xa1)][_0x270971(0x4f3)]=function(_0x257391,_0xf5996d,_0xe11dc8,_0x1362bf,_0x173572){const _0x2f04a7=_0x270971;if(this[_0x2f04a7(0x415)]===undefined)this[_0x2f04a7(0x1f8)]();const _0x47ae8c=_0x257391===$gamePlayer?_0x2f04a7(0xa2):_0x2f04a7(0x56a)[_0x2f04a7(0x27e)](_0x257391[_0x2f04a7(0x61a)],_0x257391['_eventId']);this['_EventIcons'][_0x47ae8c]={'iconIndex':_0xf5996d,'bufferX':_0xe11dc8,'bufferY':_0x1362bf,'blendMode':_0x173572};},Game_System[_0x270971(0xa1)]['setEventIconDataKey']=function(_0x190f64,_0x3d033b,_0x101014,_0x33760b,_0x37de0f,_0x392f04){const _0x5e0253=_0x270971;if(this[_0x5e0253(0x415)]===undefined)this[_0x5e0253(0x1f8)]();const _0x1ad765='Map%1-Event%2'[_0x5e0253(0x27e)](_0x190f64,_0x3d033b);this[_0x5e0253(0x415)][_0x1ad765]={'iconIndex':_0x101014,'bufferX':_0x33760b,'bufferY':_0x37de0f,'blendMode':_0x392f04};},Game_System[_0x270971(0xa1)][_0x270971(0x279)]=function(_0x5e4554){const _0x2c298e=_0x270971;if(this[_0x2c298e(0x415)]===undefined)this[_0x2c298e(0x1f8)]();if(!_0x5e4554)return null;_0x5e4554===$gamePlayer?delete this[_0x2c298e(0x415)][_0x2c298e(0xa2)]:this[_0x2c298e(0x3c8)](_0x5e4554[_0x2c298e(0x61a)],_0x5e4554['_eventId']);},Game_System[_0x270971(0xa1)][_0x270971(0x3c8)]=function(_0x2475df,_0x4ac8bc){const _0x3121d7=_0x270971;if(this[_0x3121d7(0x415)]===undefined)this[_0x3121d7(0x1f8)]();const _0x5b5072=_0x3121d7(0x56a)[_0x3121d7(0x27e)](_0x2475df,_0x4ac8bc);delete this[_0x3121d7(0x415)][_0x5b5072];},Game_System[_0x270971(0xa1)]['getSavedEventLocation']=function(_0x1d9e8c){const _0x4ef856=_0x270971;if(this[_0x4ef856(0x14b)]===undefined)this[_0x4ef856(0x1f8)]();if(!_0x1d9e8c)return null;const _0xed58e2=_0x4ef856(0x56a)[_0x4ef856(0x27e)](_0x1d9e8c[_0x4ef856(0x61a)],_0x1d9e8c[_0x4ef856(0x8a)]);return this['_SavedEventLocations'][_0xed58e2];},Game_System['prototype'][_0x270971(0x53e)]=function(_0x1be728){const _0x3e6e43=_0x270971;if(this[_0x3e6e43(0x14b)]===undefined)this[_0x3e6e43(0x1f8)]();if(!_0x1be728)return;const _0x33473d='Map%1-Event%2'[_0x3e6e43(0x27e)](_0x1be728[_0x3e6e43(0x61a)],_0x1be728['_eventId']);this['_SavedEventLocations'][_0x33473d]={'direction':_0x1be728[_0x3e6e43(0x3b9)](),'x':Math[_0x3e6e43(0x594)](_0x1be728['x']),'y':Math['round'](_0x1be728['y']),'pageIndex':_0x1be728['_pageIndex'],'moveRouteIndex':_0x1be728[_0x3e6e43(0x572)]};},Game_System[_0x270971(0xa1)][_0x270971(0x3c9)]=function(_0x1e9ad7){const _0x2141b5=_0x270971;if(this[_0x2141b5(0x14b)]===undefined)this['initEventsMoveCore']();if(!_0x1e9ad7)return;this[_0x2141b5(0x121)](_0x1e9ad7['_mapId'],_0x1e9ad7[_0x2141b5(0x8a)]);},Game_System[_0x270971(0xa1)][_0x270971(0x121)]=function(_0x303f6e,_0x374c0c){const _0xedeb20=_0x270971;if(this[_0xedeb20(0x14b)]===undefined)this[_0xedeb20(0x1f8)]();const _0x1e989b=_0xedeb20(0x56a)[_0xedeb20(0x27e)](_0x303f6e,_0x374c0c);delete this[_0xedeb20(0x14b)][_0x1e989b];},Game_System[_0x270971(0xa1)]['createSaveEventLocationData']=function(_0x2fd111,_0x13faac,_0x214d80,_0x5720c7,_0x3d2f96,_0x106d38,_0x1573d8){const _0x1109c1=_0x270971;if(this[_0x1109c1(0x14b)]===undefined)this['initEventsMoveCore']();const _0x202989='Map%1-Event%2'['format'](_0x2fd111,_0x13faac);this['_SavedEventLocations'][_0x202989]={'direction':_0x3d2f96,'x':Math[_0x1109c1(0x594)](_0x214d80),'y':Math[_0x1109c1(0x594)](_0x5720c7),'pageIndex':_0x106d38,'moveRouteIndex':_0x1573d8};},Game_System[_0x270971(0xa1)]['getPreservedMorphEventData']=function(_0x54968a){const _0x3a8824=_0x270971;if(this[_0x3a8824(0xc1)]===undefined)this[_0x3a8824(0x1f8)]();if(!_0x54968a)return;const _0x51b2a8=_0x3a8824(0x56a)[_0x3a8824(0x27e)](_0x54968a['_mapId'],_0x54968a[_0x3a8824(0x8a)]);return this[_0x3a8824(0xc1)][_0x51b2a8];},Game_System[_0x270971(0xa1)][_0x270971(0xba)]=function(_0x2ec5dd,_0x10c03c,_0x2b442c,_0xaa34c1,_0x456a3){const _0x34875b=_0x270971;if(this[_0x34875b(0xc1)]===undefined)this[_0x34875b(0x1f8)]();const _0x2ae14d=_0x34875b(0x56a)[_0x34875b(0x27e)](_0x2ec5dd,_0x10c03c);this['_PreservedEventMorphData'][_0x2ae14d]={'template':_0x2b442c,'mapId':_0xaa34c1,'eventId':_0x456a3};},Game_System[_0x270971(0xa1)][_0x270971(0x19e)]=function(_0x392261,_0x5ebbe6){const _0x3b2160=_0x270971;if(this[_0x3b2160(0xc1)]===undefined)this[_0x3b2160(0x1f8)]();const _0x5dba6b=_0x3b2160(0x56a)[_0x3b2160(0x27e)](_0x392261,_0x5ebbe6);delete this['_PreservedEventMorphData'][_0x5dba6b];},Game_System['prototype']['getMapSpawnedEventData']=function(_0x195504){const _0x45e68c=_0x270971;if(this[_0x45e68c(0x511)]===undefined)this[_0x45e68c(0x1f8)]();return this['_MapSpawnedEventData'][_0x195504]=this[_0x45e68c(0x511)][_0x195504]||[],this[_0x45e68c(0x511)][_0x195504];},Game_System[_0x270971(0xa1)]['removeTemporaryMapSpawnedEvents']=function(_0x11538e){const _0x3dffce=_0x270971,_0x17f214=this[_0x3dffce(0x425)](_0x11538e);for(const _0x1f4870 of _0x17f214){if(!_0x1f4870)continue;if(_0x1f4870[_0x3dffce(0x367)])continue;const _0x22f704=_0x17f214[_0x3dffce(0x119)](_0x1f4870);_0x17f214[_0x22f704]=null;}},Game_System[_0x270971(0xa1)][_0x270971(0x1f7)]=function(){const _0x4b95ab=_0x270971;this[_0x4b95ab(0xbe)]=0x0,this[_0x4b95ab(0x324)]=![];},Game_System[_0x270971(0xa1)][_0x270971(0x3a6)]=function(){const _0x242591=_0x270971;if(this[_0x242591(0xbe)]===undefined)this[_0x242591(0x1f7)]();return this['_followerControlID'];},Game_System[_0x270971(0xa1)]['setControlledFollowerID']=function(_0x5a6304){const _0x2ca6a5=_0x270971;if(this[_0x2ca6a5(0xbe)]===undefined)this[_0x2ca6a5(0x1f7)]();this[_0x2ca6a5(0xbe)]=_0x5a6304;;},VisuMZ['EventsMoveCore']['Game_Interpreter_character']=Game_Interpreter[_0x270971(0xa1)][_0x270971(0x5f8)],Game_Interpreter[_0x270971(0xa1)][_0x270971(0x5f8)]=function(_0x174bf7){const _0x50837d=_0x270971;if(!$gameParty[_0x50837d(0x298)]()&&_0x174bf7<0x0){if('eTYqZ'!==_0x50837d(0x4b9))this[_0x50837d(0x135)](_0x23dbc3[_0x50837d(0x4dc)],_0x527317[_0x50837d(0x2c4)],!![]);else{let _0x48d04f=$gameSystem[_0x50837d(0x3a6)]();if(_0x48d04f>0x0){if(_0x50837d(0x172)!==_0x50837d(0x61f))return $gamePlayer[_0x50837d(0x268)]()['follower'](_0x48d04f-0x1);else{if(!_0x1f1235['isInstanceOfSceneMap']())return;if(!_0x864fc9[_0x50837d(0x4be)]){_0x1e83f1[_0x50837d(0x4ed)]()&&_0x22cba2(_0x50837d(0x231)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}_0x10078e[_0x50837d(0x317)](_0x7928f9,_0x58c41d);const _0x1d4764=_0x372059[_0x50837d(0x58a)](),_0x3e433b=_0x41fc9b[_0x50837d(0x514)]||(_0x1d4764?_0x1d4764['eventId']():0x1),_0x3705f3={'text':_0x2a988a[_0x50837d(0xa0)]||'','duration':_0x446018['max'](_0x1efef2[_0x50837d(0x416)]||0x3c,0xc)},_0x57f8b7=_0x92fa1e[_0x50837d(0x393)]||{};_0x43f7c5[_0x50837d(0x543)][_0x50837d(0xeb)](_0x3705f3,_0x57f8b7);const _0x90a314=_0x49ac81['_scene'][_0x50837d(0x402)];if(_0x90a314){const _0x55b482=_0x3e9126['event'](_0x3e433b);_0x90a314[_0x50837d(0xce)](_0x55b482,_0x3705f3);}}}}}return VisuMZ['EventsMoveCore'][_0x50837d(0xa7)][_0x50837d(0x437)](this,_0x174bf7);},Game_System[_0x270971(0xa1)][_0x270971(0x4a7)]=function(){const _0xacd9af=_0x270971;if(this[_0xacd9af(0x324)]===undefined)this[_0xacd9af(0x1f7)]();return this[_0xacd9af(0x324)];},Game_System[_0x270971(0xa1)][_0x270971(0x113)]=function(_0x127b90){const _0x371ecd=_0x270971;if(this[_0x371ecd(0x324)]===undefined)this[_0x371ecd(0x1f7)]();this[_0x371ecd(0x324)]=_0x127b90;;},VisuMZ[_0x270971(0x543)][_0x270971(0x443)]=Game_Followers[_0x270971(0xa1)][_0x270971(0xee)],Game_Followers[_0x270971(0xa1)][_0x270971(0xee)]=function(){const _0x9946ba=_0x270971;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x9946ba(0x543)][_0x9946ba(0x443)][_0x9946ba(0x437)](this);},VisuMZ[_0x270971(0x543)][_0x270971(0x4b6)]=Game_Timer[_0x270971(0xa1)][_0x270971(0x2c2)],Game_Timer[_0x270971(0xa1)]['initialize']=function(){const _0x5ca721=_0x270971;VisuMZ[_0x5ca721(0x543)][_0x5ca721(0x4b6)]['call'](this),this[_0x5ca721(0x1f8)]();},Game_Timer[_0x270971(0xa1)]['initEventsMoveCore']=function(){const _0x576098=_0x270971;this[_0x576098(0x303)]=![],this['_speed']=-0x1,this[_0x576098(0x5fd)]=0x0;},Game_Timer[_0x270971(0xa1)][_0x270971(0x424)]=function(_0x32e654){const _0x4e7655=_0x270971;if(!_0x32e654)return;if(!this['_working'])return;if(this[_0x4e7655(0x303)])return;if(this[_0x4e7655(0x120)]<=0x0)return;if(this[_0x4e7655(0x12f)]===undefined)this[_0x4e7655(0x1f8)]();this[_0x4e7655(0x120)]+=this['_speed'],this['_frames']<=0x0&&this[_0x4e7655(0x161)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x453)]=Game_Timer['prototype'][_0x270971(0x40d)],Game_Timer[_0x270971(0xa1)][_0x270971(0x40d)]=function(_0x556df4){const _0x1752ee=_0x270971;VisuMZ[_0x1752ee(0x543)]['Game_Timer_start']['call'](this,_0x556df4);if(this[_0x1752ee(0x303)]===undefined)this[_0x1752ee(0x1f8)]();this[_0x1752ee(0x303)]=![];},VisuMZ[_0x270971(0x543)][_0x270971(0x31a)]=Game_Timer[_0x270971(0xa1)][_0x270971(0x24b)],Game_Timer[_0x270971(0xa1)][_0x270971(0x24b)]=function(){const _0x1be3b5=_0x270971;VisuMZ[_0x1be3b5(0x543)]['Game_Timer_stop'][_0x1be3b5(0x437)](this);if(this[_0x1be3b5(0x303)]===undefined)this[_0x1be3b5(0x1f8)]();this['_paused']=![];},Game_Timer['prototype'][_0x270971(0x2b7)]=function(){const _0x4d907d=_0x270971;if(this[_0x4d907d(0x120)]<=0x0)return;this[_0x4d907d(0x303)]=!![],this[_0x4d907d(0x497)]=!![];},Game_Timer[_0x270971(0xa1)][_0x270971(0x217)]=function(){const _0x405d15=_0x270971;if(this['_frames']<=0x0)return;this[_0x405d15(0x303)]=![],this[_0x405d15(0x497)]=!![];},Game_Timer[_0x270971(0xa1)][_0x270971(0x48a)]=function(_0x596b23){const _0x503e6a=_0x270971;this['_frames']=this[_0x503e6a(0x120)]||0x0,this[_0x503e6a(0x120)]+=_0x596b23,this['_working']=!![],this['_frames']=Math[_0x503e6a(0x60f)](0x1,this['_frames']);},Game_Timer[_0x270971(0xa1)][_0x270971(0x55b)]=function(_0x5589ee){const _0x1ba63f=_0x270971;this[_0x1ba63f(0x120)]=this['_frames']||0x0,this[_0x1ba63f(0x120)]=_0x5589ee,this[_0x1ba63f(0x497)]=!![],this[_0x1ba63f(0x120)]=Math[_0x1ba63f(0x60f)](0x1,this[_0x1ba63f(0x120)]);},Game_Timer[_0x270971(0xa1)][_0x270971(0x414)]=function(_0x417573){const _0x4037b3=_0x270971;this[_0x4037b3(0x12f)]=_0x417573,this[_0x4037b3(0x497)]=!![],_0x417573>0x0&&(this[_0x4037b3(0x120)]=Math['max'](this[_0x4037b3(0x120)],0x1));},Game_Timer[_0x270971(0xa1)][_0x270971(0x34f)]=function(_0x286118){const _0x28927c=_0x270971;if(this['_expireCommonEvent']===undefined)this['initEventsMoveCore']();this[_0x28927c(0x5fd)]=_0x286118;},VisuMZ[_0x270971(0x543)]['Game_Timer_onExpire']=Game_Timer[_0x270971(0xa1)][_0x270971(0x161)],Game_Timer[_0x270971(0xa1)][_0x270971(0x161)]=function(){const _0x549a3f=_0x270971;if(this[_0x549a3f(0x5fd)]===undefined)this[_0x549a3f(0x1f8)]();if(this[_0x549a3f(0x5fd)]){if(_0x549a3f(0x202)!==_0x549a3f(0x202))return _0x3f3ce5[_0x549a3f(0x543)][_0x549a3f(0x1c9)]['call'](this,_0x3835cb);else $gameTemp['reserveCommonEvent'](this[_0x549a3f(0x5fd)]);}else VisuMZ[_0x549a3f(0x543)][_0x549a3f(0x3b2)][_0x549a3f(0x437)](this);},VisuMZ[_0x270971(0x543)][_0x270971(0x551)]=Game_Message['prototype']['add'],Game_Message['prototype'][_0x270971(0x3e5)]=function(_0x1b8d75){const _0x5b2e0e=_0x270971;VisuMZ[_0x5b2e0e(0x543)]['Game_Message_add'][_0x5b2e0e(0x437)](this,_0x1b8d75),this[_0x5b2e0e(0x2ac)]=$gameTemp['getSelfTarget']();},Game_Message[_0x270971(0xa1)][_0x270971(0x180)]=function(){const _0x2e7569=_0x270971;$gameTemp[_0x2e7569(0x35b)](this[_0x2e7569(0x2ac)]);},VisuMZ[_0x270971(0x543)][_0x270971(0x154)]=Game_Switches['prototype']['value'],Game_Switches[_0x270971(0xa1)][_0x270971(0x481)]=function(_0x4b15f1){const _0x37cb49=_0x270971;if(DataManager[_0x37cb49(0x1ab)](_0x4b15f1))return!!this[_0x37cb49(0x441)](_0x4b15f1);else{if(DataManager['isSelfSwitch'](_0x4b15f1))return!!this['selfValue'](_0x4b15f1);else{if(DataManager[_0x37cb49(0xe2)](_0x4b15f1))return!!this[_0x37cb49(0x459)](_0x4b15f1);else{if(_0x37cb49(0x253)===_0x37cb49(0x253))return VisuMZ['EventsMoveCore']['Game_Switches_value'][_0x37cb49(0x437)](this,_0x4b15f1);else{if([0x2,0x4,0x6,0x8][_0x37cb49(0x3fc)](_0x447490))return 0x4;if([0x1,0x3,0x7,0x9][_0x37cb49(0x3fc)](_0x3dfff1))return 0x5;}}}}},Game_Switches['advancedFunc']={},Game_Switches['prototype']['advancedValue']=function(_0x2c28a3){const _0x5eec23=_0x270971;if(!Game_Switches[_0x5eec23(0x5f3)][_0x2c28a3]){if(_0x5eec23(0x490)!==_0x5eec23(0x5a3)){$dataSystem['switches'][_0x2c28a3][_0x5eec23(0x447)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5e397c='return\x20%1'[_0x5eec23(0x27e)](String(RegExp['$1']));Game_Switches[_0x5eec23(0x5f3)][_0x2c28a3]=new Function('switchId',_0x5e397c);}else{if(!_0xa5ccb3[_0x5eec23(0x543)][_0x5eec23(0x412)]['Movement']['ShowShadows'])return;for(const _0x5ec586 of this[_0x5eec23(0x181)]){this[_0x5eec23(0x1ad)](_0x5ec586);}}}const _0x55b86e=$gameTemp['getSelfTarget']()||this;return Game_Switches['advancedFunc'][_0x2c28a3][_0x5eec23(0x437)](_0x55b86e,_0x2c28a3);},Game_Switches[_0x270971(0xa1)][_0x270971(0x3c1)]=function(_0x33f304){const _0x5d2869=_0x270971,_0x6d2ea5=$gameTemp[_0x5d2869(0x11d)]()||this;if(_0x6d2ea5[_0x5d2869(0x2a8)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x5d2869(0x154)][_0x5d2869(0x437)](this,_0x33f304);else{const _0x501ddc=[_0x6d2ea5[_0x5d2869(0x61a)],_0x6d2ea5[_0x5d2869(0x8a)],_0x5d2869(0x35f)['format'](_0x33f304)];return $gameSelfSwitches[_0x5d2869(0x481)](_0x501ddc);}},Game_Switches[_0x270971(0xa1)][_0x270971(0x459)]=function(_0x3d2bf1){const _0x26bfc0=_0x270971,_0x2ecebf=$gameMap?$gameMap[_0x26bfc0(0x4dc)]():0x0,_0x35f9fb=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x26bfc0(0x27e)](_0x2ecebf,_0x3d2bf1)];return $gameSelfSwitches[_0x26bfc0(0x481)](_0x35f9fb);},VisuMZ[_0x270971(0x543)][_0x270971(0x40b)]=Game_Switches[_0x270971(0xa1)][_0x270971(0x5d7)],Game_Switches[_0x270971(0xa1)][_0x270971(0x5d7)]=function(_0x18a99c,_0x594342){const _0x40de79=_0x270971;if(DataManager[_0x40de79(0x2b6)](_0x18a99c))_0x40de79(0x403)===_0x40de79(0x413)?(this[_0x40de79(0x633)]=this['_settings']['duration'],this[_0x40de79(0x17c)]=this[_0x40de79(0x1c2)][_0x40de79(0x5cb)],this['z']=0x6,this[_0x40de79(0x349)]=this[_0x40de79(0x1c2)][_0x40de79(0x10a)][_0x40de79(0x1d5)],this[_0x40de79(0x349)]>0x0&&this['_fadeInDuration']>=_0x45fd4b[_0x40de79(0x257)](this[_0x40de79(0x633)]*0.48)&&(this[_0x40de79(0x349)]=_0x2ad120['floor'](this[_0x40de79(0x633)]*0.48)),this[_0x40de79(0x204)]=this['_fadeInDuration']>0x0?0x0:0xff,this['_fadeOutDuration']=this[_0x40de79(0x1c2)][_0x40de79(0x10a)][_0x40de79(0x2e9)],this[_0x40de79(0x505)]>0x0&&this[_0x40de79(0x505)]>=_0x4186c0[_0x40de79(0x257)](this[_0x40de79(0x633)]*0.48)&&(this[_0x40de79(0x505)]=_0x499517[_0x40de79(0x257)](this[_0x40de79(0x633)]*0.48)),this['_fadeOutStart']=this[_0x40de79(0x505)],this[_0x40de79(0x599)]=this[_0x40de79(0x1c2)][_0x40de79(0x61e)]['x'],this[_0x40de79(0x314)]=this[_0x40de79(0x1c2)][_0x40de79(0x61e)]['y'],this[_0x40de79(0x149)]=this['_settings']['endOffset']['x'],this[_0x40de79(0x559)]=this[_0x40de79(0x1c2)]['endOffset']['y'],this[_0x40de79(0x263)]=this[_0x40de79(0x599)],this[_0x40de79(0x25f)]=this[_0x40de79(0x314)],this['_startScaleX']=this[_0x40de79(0x1c2)]['startScale']['x'],this[_0x40de79(0x50e)]=this[_0x40de79(0x1c2)]['startScale']['y'],this[_0x40de79(0x4e9)]=this[_0x40de79(0x1c2)][_0x40de79(0x23b)]['x'],this[_0x40de79(0x153)]=this[_0x40de79(0x1c2)][_0x40de79(0x23b)]['y'],this[_0x40de79(0x15d)]=-this[_0x40de79(0x1c2)][_0x40de79(0x36b)][_0x40de79(0x40d)],this['_targetAngle']=-this[_0x40de79(0x1c2)][_0x40de79(0x36b)][_0x40de79(0x170)],this[_0x40de79(0x38e)]=-this['_settings'][_0x40de79(0x117)]['arc'],this['_currentArc']=0x0):this[_0x40de79(0x4e2)](_0x18a99c,_0x594342);else{if(DataManager[_0x40de79(0xe2)](_0x18a99c)){if(_0x40de79(0x53a)!==_0x40de79(0x53a)){const _0x1adc7e=_0x40de79(0x3ce)[_0x40de79(0x27e)](_0x15113e['charAt'](0x0)['toUpperCase']()+_0x39f9fd[_0x40de79(0xe3)](0x1));if(_0x308cd7[_0x1adc7e])return _0x23e6e7[_0x1adc7e][_0x40de79(0x3fc)](_0x3929b5);}else this[_0x40de79(0x1a4)](_0x18a99c,_0x594342);}else VisuMZ[_0x40de79(0x543)][_0x40de79(0x40b)][_0x40de79(0x437)](this,_0x18a99c,_0x594342);}},Game_Switches[_0x270971(0xa1)][_0x270971(0x4e2)]=function(_0x339c0b,_0x37d52b){const _0x1d1c24=_0x270971,_0x3301a7=$gameTemp[_0x1d1c24(0x11d)]()||this;if(_0x3301a7[_0x1d1c24(0x2a8)]!==Game_Event)VisuMZ[_0x1d1c24(0x543)][_0x1d1c24(0x40b)][_0x1d1c24(0x437)](this,_0x339c0b,_0x37d52b);else{const _0x138c55=[_0x3301a7[_0x1d1c24(0x61a)],_0x3301a7[_0x1d1c24(0x8a)],_0x1d1c24(0x35f)[_0x1d1c24(0x27e)](_0x339c0b)];$gameSelfSwitches['setValue'](_0x138c55,_0x37d52b);}},Game_Switches[_0x270971(0xa1)]['setMapValue']=function(_0x15e433,_0x28c6f5){const _0x5aae6c=_0x270971,_0x3c6fb4=$gameMap?$gameMap[_0x5aae6c(0x4dc)]():0x0,_0x2a2c1a=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x5aae6c(0x27e)](_0x3c6fb4,_0x15e433)];return $gameSelfSwitches['setValue'](_0x2a2c1a,_0x28c6f5);},VisuMZ['EventsMoveCore'][_0x270971(0x247)]=Game_Variables[_0x270971(0xa1)][_0x270971(0x481)],Game_Variables[_0x270971(0xa1)][_0x270971(0x481)]=function(_0x53e146){const _0x56c453=_0x270971;if(DataManager['isAdvancedVariable'](_0x53e146))return this[_0x56c453(0x441)](_0x53e146);else{if(DataManager[_0x56c453(0x5d9)](_0x53e146))return this[_0x56c453(0x3c1)](_0x53e146);else{if(DataManager['isMapVariable'](_0x53e146)){if('FNAzW'===_0x56c453(0x577))return this[_0x56c453(0x459)](_0x53e146);else{if(this[_0x56c453(0x14b)]===_0xcd6c80)this[_0x56c453(0x1f8)]();const _0x600eb3=_0x56c453(0x56a)[_0x56c453(0x27e)](_0x3144e2,_0x4f7478);delete this[_0x56c453(0x14b)][_0x600eb3];}}else return VisuMZ[_0x56c453(0x543)][_0x56c453(0x247)][_0x56c453(0x437)](this,_0x53e146);}}},Game_Variables['advancedFunc']={},Game_Variables['prototype'][_0x270971(0x441)]=function(_0x2612a1){const _0x3c5d6d=_0x270971;if(!Game_Variables[_0x3c5d6d(0x5f3)][_0x2612a1]){if(_0x3c5d6d(0x335)!==_0x3c5d6d(0x3d5)){$dataSystem[_0x3c5d6d(0xcb)][_0x2612a1][_0x3c5d6d(0x447)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1fe6e6='return\x20%1'[_0x3c5d6d(0x27e)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x2612a1]=new Function(_0x3c5d6d(0x503),_0x1fe6e6);}else return _0x3c9ac5['EventsMoveCore'][_0x3c5d6d(0x46c)][_0x3c5d6d(0x437)](this)+(this[_0x3c5d6d(0x4b3)]||0x0);}const _0x37daa3=$gameTemp[_0x3c5d6d(0x11d)]()||this;return Game_Variables[_0x3c5d6d(0x5f3)][_0x2612a1][_0x3c5d6d(0x437)](_0x37daa3,_0x2612a1);},Game_Variables[_0x270971(0xa1)][_0x270971(0x3c1)]=function(_0x261a4f){const _0x172271=_0x270971,_0x43dd97=$gameTemp[_0x172271(0x11d)]()||this;if(_0x43dd97[_0x172271(0x2a8)]!==Game_Event)return VisuMZ[_0x172271(0x543)]['Game_Variables_value'][_0x172271(0x437)](this,_0x261a4f);else{const _0x125c8a=[_0x43dd97[_0x172271(0x61a)],_0x43dd97[_0x172271(0x8a)],_0x172271(0x281)[_0x172271(0x27e)](_0x261a4f)];return $gameSelfSwitches[_0x172271(0x481)](_0x125c8a);}},Game_Variables[_0x270971(0xa1)][_0x270971(0x459)]=function(_0xfdcfa9){const _0x156576=_0x270971,_0x1bb9ae=$gameMap?$gameMap['mapId']():0x0,_0x2977ae=[0x0,0x0,_0x156576(0xc4)[_0x156576(0x27e)](_0x1bb9ae,_0xfdcfa9)];return $gameSelfSwitches[_0x156576(0x481)](_0x2977ae)||0x0;},VisuMZ['EventsMoveCore'][_0x270971(0x39d)]=Game_Variables[_0x270971(0xa1)][_0x270971(0x5d7)],Game_Variables[_0x270971(0xa1)]['setValue']=function(_0x4135fb,_0x53e947){const _0x26c268=_0x270971;if(DataManager['isSelfVariable'](_0x4135fb))this[_0x26c268(0x4e2)](_0x4135fb,_0x53e947);else DataManager['isMapVariable'](_0x4135fb)?this[_0x26c268(0x1a4)](_0x4135fb,_0x53e947):VisuMZ[_0x26c268(0x543)][_0x26c268(0x39d)][_0x26c268(0x437)](this,_0x4135fb,_0x53e947);},Game_Variables['prototype'][_0x270971(0x4e2)]=function(_0x1a7a46,_0x913ac6){const _0x183b0a=_0x270971,_0x28e29c=$gameTemp[_0x183b0a(0x11d)]()||this;if(_0x28e29c[_0x183b0a(0x2a8)]!==Game_Event){if(_0x183b0a(0xf6)!==_0x183b0a(0xf6))return this['_forceShowFollower']===_0x4fad0e&&this['setupFollowerVisibilityOverrides'](),this[_0x183b0a(0x5c7)];else VisuMZ[_0x183b0a(0x543)][_0x183b0a(0x39d)][_0x183b0a(0x437)](this,_0x1a7a46,_0x913ac6);}else{if(_0x183b0a(0xa3)!==_0x183b0a(0xa3)){const _0x478984=_0x4cabea(_0x430e24['$1'])[_0x183b0a(0x363)]()[_0x183b0a(0x1c1)](),_0x34700f=[_0x183b0a(0x409),_0x183b0a(0x5fe),_0x183b0a(0x311),'SCREEN'];this[_0x183b0a(0x3a9)]['blendMode']=_0x34700f[_0x183b0a(0x119)](_0x478984)[_0x183b0a(0x17b)](0x0,0x3);}else{const _0x3031fd=[_0x28e29c[_0x183b0a(0x61a)],_0x28e29c[_0x183b0a(0x8a)],_0x183b0a(0x281)[_0x183b0a(0x27e)](_0x1a7a46)];$gameSelfSwitches[_0x183b0a(0x5d7)](_0x3031fd,_0x913ac6);}}},Game_Variables[_0x270971(0xa1)][_0x270971(0x1a4)]=function(_0x4c83d1,_0x49e144){const _0x21c5b6=_0x270971,_0x1e717e=$gameMap?$gameMap[_0x21c5b6(0x4dc)]():0x0,_0x515d75=[0x0,0x0,_0x21c5b6(0xc4)[_0x21c5b6(0x27e)](_0x1e717e,_0x4c83d1)];$gameSelfSwitches[_0x21c5b6(0x5d7)](_0x515d75,_0x49e144);},VisuMZ[_0x270971(0x543)][_0x270971(0x30d)]=Game_SelfSwitches[_0x270971(0xa1)][_0x270971(0x481)],Game_SelfSwitches['prototype']['value']=function(_0x265dd8){const _0x15737b=_0x270971;if(_0x265dd8[0x2][_0x15737b(0x447)](/(?:SELF|MAP)/i))return this[_0x15737b(0x3c1)](_0x265dd8);else{return VisuMZ[_0x15737b(0x543)]['Game_SelfSwitches_value'][_0x15737b(0x437)](this,_0x265dd8);;}},Game_SelfSwitches[_0x270971(0xa1)][_0x270971(0x3c1)]=function(_0x27f6a5){const _0x193f85=_0x270971;return _0x27f6a5[0x2]['match'](/VAR/i)?this[_0x193f85(0x496)][_0x27f6a5]||0x0:!!this['_data'][_0x27f6a5];},VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue']=Game_SelfSwitches['prototype'][_0x270971(0x5d7)],Game_SelfSwitches[_0x270971(0xa1)][_0x270971(0x5d7)]=function(_0x1b17ad,_0x10c878){const _0x48746c=_0x270971;if(_0x1b17ad[0x2]['match'](/(?:SELF|MAP)/i))this[_0x48746c(0x4e2)](_0x1b17ad,_0x10c878);else{if(_0x48746c(0x2ec)!==_0x48746c(0x2ec)){const _0x43ac4d=_0x1c6108(_0x228c68['$1'])[_0x48746c(0x363)]()['trim']();_0x113441=_0x3967ac['EventTemplates'][_0x43ac4d];if(!_0x4a7584)return;_0x55d3ca=_0xc84730[_0x48746c(0x8d)],_0x1ede34=_0x161499['EventID'];}else VisuMZ[_0x48746c(0x543)][_0x48746c(0x3dc)][_0x48746c(0x437)](this,_0x1b17ad,_0x10c878);}},Game_SelfSwitches['prototype']['setSelfValue']=function(_0x2135e6,_0x2d9d4c){const _0x489d04=_0x270971;this[_0x489d04(0x496)][_0x2135e6]=_0x2135e6[0x2]['match'](/VAR/i)?_0x2d9d4c:!!_0x2d9d4c,this[_0x489d04(0x375)]();},VisuMZ[_0x270971(0x543)][_0x270971(0xe1)]=Scene_Map[_0x270971(0xa1)][_0x270971(0x427)],Scene_Map[_0x270971(0xa1)][_0x270971(0x427)]=function(){const _0x46b109=_0x270971;$gameMap['resetExitSelfSwitches'](),VisuMZ[_0x46b109(0x543)][_0x46b109(0xe1)][_0x46b109(0x437)](this);},Game_Map[_0x270971(0xa1)][_0x270971(0xfb)]=function(){const _0x2a4a00=_0x270971;this[_0x2a4a00(0x557)]=this[_0x2a4a00(0x4dc)](),this[_0x2a4a00(0x52a)]=undefined;const _0x551f93=this['events']();for(const _0x642b00 of _0x551f93){if(_0x2a4a00(0x2bf)!==_0x2a4a00(0x97)){if(_0x642b00)$gameSelfSwitches[_0x2a4a00(0x53f)](_0x642b00);}else return this['getPosingCharacterPattern']();}},Game_SelfSwitches['prototype'][_0x270971(0x53f)]=function(_0x1e3c22){const _0x3a4b27=_0x270971;if(!_0x1e3c22)return;if(!_0x1e3c22[_0x3a4b27(0x22b)]())return;const _0x42eb52=_0x1e3c22[_0x3a4b27(0x22b)]()[_0x3a4b27(0x3f7)]||'';if(_0x42eb52[_0x3a4b27(0x447)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x29b47f='%1,%2,'[_0x3a4b27(0x27e)]($gameMap[_0x3a4b27(0x61a)],_0x1e3c22[_0x3a4b27(0x8a)]),_0x2e0f72=Object['keys'](this[_0x3a4b27(0x496)])['filter'](_0x311cb4=>_0x311cb4[_0x3a4b27(0x61b)](_0x29b47f));while(_0x2e0f72[_0x3a4b27(0x531)]>0x0){if('koiHT'===_0x3a4b27(0x4b8))this[_0x3a4b27(0x5c2)]=_0x1b6698;else{const _0x41d753=_0x2e0f72[_0x3a4b27(0x404)]();delete this['_data'][_0x41d753];}}}},Game_SelfSwitches[_0x270971(0xa1)][_0x270971(0x319)]=function(_0x14a6ba){const _0x3cd613=_0x270971,_0x2dd67b=_0x3cd613(0xf5)[_0x3cd613(0x27e)]($gameMap[_0x3cd613(0x61a)]),_0x1be456=Object[_0x3cd613(0x4d9)](this['_data'])['filter'](_0x5e614b=>_0x5e614b['startsWith'](_0x2dd67b));while(_0x1be456['length']>0x0){if(_0x3cd613(0x105)==='pQomB')this[_0x3cd613(0x17d)]();else{const _0x42dea4=_0x1be456['shift']();delete this[_0x3cd613(0x496)][_0x42dea4];}}_0x14a6ba===$gameMap[_0x3cd613(0x4dc)]()&&(_0x3cd613(0x3e7)!==_0x3cd613(0x500)?$gameMap['requestRefresh']():this[_0x3cd613(0x53d)]());},VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition']=Game_Enemy[_0x270971(0xa1)]['meetsSwitchCondition'],Game_Enemy['prototype']['meetsSwitchCondition']=function(_0x214051){const _0x59c624=_0x270971;$gameTemp[_0x59c624(0x35b)](this);const _0x1f0384=VisuMZ[_0x59c624(0x543)]['Game_Enemy_meetsSwitchCondition']['call'](this,_0x214051);return $gameTemp[_0x59c624(0x152)](),_0x1f0384;},VisuMZ[_0x270971(0x543)]['Game_Party_hasEncounterHalf']=Game_Party[_0x270971(0xa1)][_0x270971(0x1ee)],Game_Party[_0x270971(0xa1)][_0x270971(0x1ee)]=function(){const _0x24d046=_0x270971;if(this[_0x24d046(0x47c)]())return!![];return VisuMZ['EventsMoveCore'][_0x24d046(0x356)][_0x24d046(0x437)](this);},Game_Party[_0x270971(0xa1)][_0x270971(0x47c)]=function(){const _0x5369a6=_0x270971;if(this[_0x5369a6(0x3a3)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ['EventsMoveCore'][_0x270971(0x236)]=Game_Party[_0x270971(0xa1)][_0x270971(0x15e)],Game_Party[_0x270971(0xa1)][_0x270971(0x15e)]=function(){const _0x4c5ad3=_0x270971;if(this[_0x4c5ad3(0x5a4)]())return!![];return VisuMZ['EventsMoveCore']['Game_Party_hasEncounterNone'][_0x4c5ad3(0x437)](this);},Game_Party[_0x270971(0xa1)]['isPlayerWithinEncounterNoneEvents']=function(){const _0x328994=_0x270971;if(this[_0x328994(0x3a3)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x11878c,_0x29f571){const _0x3b4e3d=_0x270971;if(!$gameMap)return![];_0x11878c=Math[_0x3b4e3d(0x594)](_0x11878c||0x0),_0x29f571=Math[_0x3b4e3d(0x594)](_0x29f571||0x0);const _0xe12e8e=$gameMap['events']();for(const _0x2dc769 of _0xe12e8e){if(!_0x2dc769)continue;if(_0x2dc769[_0x3b4e3d(0xbb)])continue;const _0x46882c=_0x2dc769[_0x3b4e3d(0x5f9)](!![]),_0x4479fc=_0x2dc769[_0x3b4e3d(0x2c6)](!![]);if($gameMap['checkEventProximity'](_0x11878c,_0x29f571,_0x2dc769,_0x46882c,_0x4479fc))return!![];}return![];},$isTileEncounterNone=function(_0x532d27,_0x1010a1){const _0x328d14=_0x270971;if(!$gameMap)return![];_0x532d27=Math[_0x328d14(0x594)](_0x532d27||0x0),_0x1010a1=Math[_0x328d14(0x594)](_0x1010a1||0x0);const _0x485c13=$gameMap[_0x328d14(0x1b6)]();for(const _0x57108c of _0x485c13){if(!_0x57108c)continue;if(_0x57108c[_0x328d14(0xbb)])continue;const _0x4c52a4=_0x57108c[_0x328d14(0x5f9)](![]),_0x1a4297=_0x57108c[_0x328d14(0x2c6)](![]);if($gameMap[_0x328d14(0x98)](_0x532d27,_0x1010a1,_0x57108c,_0x4c52a4,_0x1a4297))return!![];}return![];};VisuMZ[_0x270971(0x543)][_0x270971(0x200)]=Game_Troop[_0x270971(0xa1)][_0x270971(0x230)],Game_Troop[_0x270971(0xa1)][_0x270971(0x230)]=function(_0x2a69e9){const _0x1a9162=_0x270971;$gameTemp['registerSelfTarget'](this);const _0x364f38=VisuMZ[_0x1a9162(0x543)][_0x1a9162(0x200)][_0x1a9162(0x437)](this,_0x2a69e9);return $gameTemp[_0x1a9162(0x152)](),_0x364f38;},VisuMZ['EventsMoveCore'][_0x270971(0xca)]=Game_Map[_0x270971(0xa1)]['setup'],Game_Map[_0x270971(0xa1)][_0x270971(0x1e1)]=function(_0x4b483a){const _0x2b4797=_0x270971;this[_0x2b4797(0x625)](_0x4b483a),this['clearEventCache'](),VisuMZ['EventsMoveCore'][_0x2b4797(0xca)][_0x2b4797(0x437)](this,_0x4b483a),this[_0x2b4797(0x50d)](),this[_0x2b4797(0x18d)](),this[_0x2b4797(0x3dd)](),this[_0x2b4797(0x596)](),this[_0x2b4797(0x563)](),this[_0x2b4797(0x17d)](),this['setupFollowerVisibilityOverrides'](),this[_0x2b4797(0x339)](),this[_0x2b4797(0x348)](),this[_0x2b4797(0x50d)]();},VisuMZ[_0x270971(0x543)]['Game_Map_setupEvents']=Game_Map['prototype']['setupEvents'],Game_Map[_0x270971(0xa1)][_0x270971(0x444)]=function(){const _0x2f8ffc=_0x270971;VisuMZ[_0x2f8ffc(0x543)][_0x2f8ffc(0x428)][_0x2f8ffc(0x437)](this),this[_0x2f8ffc(0x5e9)]();},Game_Map[_0x270971(0x3c3)]=0xc8,Game_Map[_0x270971(0xa1)]['determineEventOverload']=function(){const _0x205ba8=_0x270971,_0x211506=Game_Map[_0x205ba8(0x3c3)];this[_0x205ba8(0x1b8)]=this[_0x205ba8(0x1b6)]()['length']>_0x211506;if(this['_eventOverload']&&$gameTemp[_0x205ba8(0x4ed)]()){}},Game_Map[_0x270971(0xa1)]['isEventOverloaded']=function(){const _0xbafae7=_0x270971;return this[_0xbafae7(0x1b8)];},Game_Map[_0x270971(0xa1)]['clearEventCache']=function(){const _0x1b0025=_0x270971;this[_0x1b0025(0x52a)]=undefined;},Game_Map[_0x270971(0xa1)][_0x270971(0x18d)]=function(){const _0x5a5efa=_0x270971;this[_0x5a5efa(0x132)]=VisuMZ[_0x5a5efa(0x543)]['Settings'][_0x5a5efa(0x42b)][_0x5a5efa(0x562)];const _0x1af183=$dataMap['note']||'';if(_0x1af183[_0x5a5efa(0x447)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x1af183[_0x5a5efa(0x447)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x5a5efa(0x132)]=![]);},Game_Map[_0x270971(0x22e)]=VisuMZ['EventsMoveCore']['Settings'][_0x270971(0x42b)][_0x270971(0x2a4)]??![],Game_Map['prototype']['isSupportDiagonalMovement']=function(){const _0x378d2f=_0x270971;if(Utils[_0x378d2f(0x24c)]()){if(_0x378d2f(0x4db)!=='cDbdm')return this['processMoveRouteSelfVariable'](_0x3db973['$1'],_0xc599de['$2']);else{if(!Game_Map['MOBILE_DIAGONAL_PATHFINDING'])return![];}}const _0x1607cc=$gameSystem['getPlayerDiagonalSetting']();if(_0x1607cc===_0x378d2f(0x47d))return!![];if(_0x1607cc===_0x378d2f(0x63b))return![];if(this[_0x378d2f(0x132)]===undefined)this[_0x378d2f(0x18d)]();return this[_0x378d2f(0x132)];},Game_Map[_0x270971(0xa1)][_0x270971(0x62c)]=function(_0x65cbef,_0x1bff05){const _0x2f8517=_0x270971;if([0x1,0x4,0x7][_0x2f8517(0x3fc)](_0x1bff05))_0x65cbef-=0x1;if([0x3,0x6,0x9][_0x2f8517(0x3fc)](_0x1bff05))_0x65cbef+=0x1;return this['roundX'](_0x65cbef);},Game_Map['prototype'][_0x270971(0x150)]=function(_0x35a8f4,_0x6c1575){const _0x4dc7f1=_0x270971;if([0x1,0x2,0x3][_0x4dc7f1(0x3fc)](_0x6c1575))_0x35a8f4+=0x1;if([0x7,0x8,0x9][_0x4dc7f1(0x3fc)](_0x6c1575))_0x35a8f4-=0x1;return this[_0x4dc7f1(0x199)](_0x35a8f4);},Game_Map[_0x270971(0xa1)][_0x270971(0x38f)]=function(_0x594a18,_0x5dab20,_0x38705d,_0x5e6beb){const _0xe4b798=_0x270971;return Math['max'](Math[_0xe4b798(0x4ff)](this[_0xe4b798(0x1eb)](_0x594a18,_0x38705d)),Math[_0xe4b798(0x4ff)](this['deltaY'](_0x5dab20,_0x5e6beb)));},Game_Map[_0x270971(0xa1)][_0x270971(0x3dd)]=function(){const _0x530b4c=_0x270971,_0xc61ab7=VisuMZ[_0x530b4c(0x543)]['Settings'][_0x530b4c(0x3b1)],_0x48f196={},_0xac0d0f=[_0x530b4c(0x19d),_0x530b4c(0x278),_0x530b4c(0x49a)],_0x3a8560=[_0x530b4c(0xac),_0x530b4c(0x235),_0x530b4c(0xa2),_0x530b4c(0x630),_0x530b4c(0x5dc),_0x530b4c(0x43b),_0x530b4c(0x175),'Airship'];for(const _0x31b6ea of _0xac0d0f){if(_0x530b4c(0x3ea)!==_0x530b4c(0x3ea))this[_0x530b4c(0x1ea)]();else for(const _0x51c958 of _0x3a8560){const _0x15bbdb=_0x530b4c(0x2cc)[_0x530b4c(0x27e)](_0x51c958,_0x31b6ea);if(_0xc61ab7[_0x15bbdb]){if(_0x530b4c(0x24d)!==_0x530b4c(0x24d)){const _0x6caea4=_0x530b4c(0x2cc)[_0x530b4c(0x27e)](_0x432f12,_0x4b61e1);_0x4d79ce[_0x6caea4]&&(_0x1476d3[_0x6caea4]=_0x4a276f[_0x6caea4][_0x530b4c(0xe3)](0x0));}else _0x48f196[_0x15bbdb]=_0xc61ab7[_0x15bbdb][_0x530b4c(0xe3)](0x0);}}}const _0x10d393=$dataMap[_0x530b4c(0x3f7)]||'',_0x16387a=_0x10d393['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x16387a){if('RYqmd'!=='FQfgK')for(const _0x4a10ad of _0x16387a){if(_0x530b4c(0x48b)===_0x530b4c(0x1f9))this[_0x530b4c(0x3a9)]['maxSize']=_0x34734a(_0x5137a5['$1']);else{_0x4a10ad['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x223e03=String(RegExp['$1'])[_0x530b4c(0x261)]()[_0x530b4c(0x1c1)](),_0x4747fa=String(RegExp['$2'])[_0x530b4c(0x261)]()[_0x530b4c(0x1c1)]();const _0x507cbe=JSON[_0x530b4c(0x3a1)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x223e03=_0x223e03['charAt'](0x0)[_0x530b4c(0x363)]()+_0x223e03[_0x530b4c(0xe3)](0x1),_0x4747fa=_0x4747fa[_0x530b4c(0x142)](0x0)['toUpperCase']()+_0x4747fa[_0x530b4c(0xe3)](0x1);const _0x51538c='%1%2'[_0x530b4c(0x27e)](_0x223e03,_0x4747fa);if(_0x48f196[_0x51538c])_0x48f196[_0x51538c]=_0x48f196[_0x51538c]['concat'](_0x507cbe);}}else _0x2bc842[_0x530b4c(0xba)](_0x11fdba[_0x530b4c(0x307)],_0xea53e0[_0x530b4c(0x4c8)],_0x7d0e76['TemplateName'],_0x4a25fc[_0x530b4c(0x431)],_0x4831d5[_0x530b4c(0x264)]);}this['_regionRules']=_0x48f196;},Game_Map['prototype'][_0x270971(0x4d1)]=function(_0xd93346,_0x59211e,_0x50181c,_0x331624){const _0xf0b4aa=_0x270971,_0x206b82=this['roundXWithDirection'](_0xd93346,_0x50181c),_0xa5f3d5=this[_0xf0b4aa(0x150)](_0x59211e,_0x50181c),_0x1f80c6=this['regionId'](_0x206b82,_0xa5f3d5),_0x3356fe=this[_0xf0b4aa(0x3ab)];if(_0x3356fe[_0xf0b4aa(0x4a6)][_0xf0b4aa(0x3fc)](_0x1f80c6))return!![];else{if(_0x331624===_0xf0b4aa(0x5f0))return _0x3356fe[_0xf0b4aa(0x58b)][_0xf0b4aa(0x3fc)](_0x1f80c6)||_0x3356fe['WalkAllow']['includes'](_0x1f80c6);else{if(_0x331624===_0xf0b4aa(0x22b))return _0x3356fe['EventAllow']['includes'](_0x1f80c6)||_0x3356fe[_0xf0b4aa(0x62d)][_0xf0b4aa(0x3fc)](_0x1f80c6);else{if(_0x3356fe['VehicleAllow']['includes'](_0x1f80c6))return!![];else{const _0x95f729=_0xf0b4aa(0x51d)[_0xf0b4aa(0x27e)](_0x331624['charAt'](0x0)[_0xf0b4aa(0x363)]()+_0x331624[_0xf0b4aa(0xe3)](0x1));if(_0x3356fe[_0x95f729])return _0x3356fe[_0x95f729][_0xf0b4aa(0x3fc)](_0x1f80c6);}}}}return![];},Game_Map[_0x270971(0xa1)][_0x270971(0x378)]=function(_0x31ddb0,_0x1c4a5f,_0x54cb66,_0x1ac897){const _0x19ed86=_0x270971,_0x5196e4=this[_0x19ed86(0x62c)](_0x31ddb0,_0x54cb66),_0x422afd=this[_0x19ed86(0x150)](_0x1c4a5f,_0x54cb66),_0x3e21b1=this[_0x19ed86(0x3fe)](_0x5196e4,_0x422afd),_0x7b0a9c=this[_0x19ed86(0x3ab)];if(_0x7b0a9c[_0x19ed86(0x59c)][_0x19ed86(0x3fc)](_0x3e21b1))return!![];else{if(_0x1ac897===_0x19ed86(0x5f0)){if(_0x19ed86(0x233)==='snSTh'){const _0x1854a6=this['_character'][_0x19ed86(0x487)]();if(_0x1854a6){if(this[_0x19ed86(0x422)]!==_0x1854a6[_0x19ed86(0x442)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x1854a6[_0x19ed86(0x432)])return!![];if(this[_0x19ed86(0x2df)]!==_0x1854a6[_0x19ed86(0x269)])return!![];}return![];}else return _0x7b0a9c[_0x19ed86(0x183)][_0x19ed86(0x3fc)](_0x3e21b1)||_0x7b0a9c[_0x19ed86(0x313)][_0x19ed86(0x3fc)](_0x3e21b1);}else{if(_0x1ac897===_0x19ed86(0x22b))return'snXFL'===_0x19ed86(0x41a)?_0x7b0a9c[_0x19ed86(0x226)]['includes'](_0x3e21b1)||_0x7b0a9c['WalkForbid'][_0x19ed86(0x3fc)](_0x3e21b1):this[_0x19ed86(0x302)](_0x1aea88);else{if(_0x7b0a9c[_0x19ed86(0x318)][_0x19ed86(0x3fc)](_0x3e21b1))return'DlAkA'!==_0x19ed86(0x603)?(this['_DisablePlayerControl']===_0x1810f8&&(this[_0x19ed86(0x3c4)]=![]),this['_DisablePlayerControl']):!![];else{if(_0x19ed86(0x1e4)!=='zRaSx'){if(this[_0x19ed86(0x39e)])return;if(_0x5d5f63[_0x19ed86(0x4a7)]())return;_0xb6990e[_0x19ed86(0x543)]['Game_Follower_chaseCharacter'][_0x19ed86(0x437)](this,_0xe762ad),this[_0x19ed86(0x10c)]=!![];}else{const _0x1dae4c=_0x19ed86(0x5bf)[_0x19ed86(0x27e)](_0x1ac897['charAt'](0x0)[_0x19ed86(0x363)]()+_0x1ac897['slice'](0x1));if(_0x7b0a9c[_0x1dae4c])return _0x7b0a9c[_0x1dae4c]['includes'](_0x3e21b1);}}}}}return![];},Game_Map[_0x270971(0xa1)][_0x270971(0x245)]=function(_0x15c1c1,_0x13ee0a,_0x3fb6a9,_0x167402){const _0xbc81dc=_0x270971;_0x3fb6a9=_0x167402===_0xbc81dc(0x41e)?0x5:_0x3fb6a9;const _0xb25d7e=this['roundXWithDirection'](_0x15c1c1,_0x3fb6a9),_0x62c78e=this[_0xbc81dc(0x150)](_0x13ee0a,_0x3fb6a9),_0x1d78be=this[_0xbc81dc(0x3fe)](_0xb25d7e,_0x62c78e),_0x45a524=this[_0xbc81dc(0x3ab)];if(_0x45a524[_0xbc81dc(0x56c)][_0xbc81dc(0x3fc)](_0x1d78be))return!![];else{const _0x2294d6=_0xbc81dc(0x3ce)[_0xbc81dc(0x27e)](_0x167402['charAt'](0x0)[_0xbc81dc(0x363)]()+_0x167402['slice'](0x1));if(_0x45a524[_0x2294d6])return _0x45a524[_0x2294d6]['includes'](_0x1d78be);}return![];},VisuMZ[_0x270971(0x543)][_0x270971(0x288)]=Game_Map[_0x270971(0xa1)][_0x270971(0xdb)],Game_Map[_0x270971(0xa1)][_0x270971(0xdb)]=function(){const _0x2116e4=_0x270971;VisuMZ['EventsMoveCore'][_0x2116e4(0x288)]['call'](this),this[_0x2116e4(0x449)]();},Game_Map[_0x270971(0xa1)][_0x270971(0x449)]=function(){const _0x28bf04=_0x270971;this[_0x28bf04(0x3a5)]=![];if(this['events']()[_0x28bf04(0x211)](_0x1e96ca=>_0x1e96ca[_0x28bf04(0x575)]())){if(_0x28bf04(0x342)===_0x28bf04(0x342)){this[_0x28bf04(0x3a5)]=!![];return;}else return this[_0x28bf04(0x54c)]()['characterName']()['match'](/\[VS8\]/i);}if(this[_0x28bf04(0x1b6)]()[_0x28bf04(0x211)](_0x5592be=>_0x5592be[_0x28bf04(0x448)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['_commonEvents'][_0x28bf04(0x211)](_0x933c5a=>_0x933c5a[_0x28bf04(0x575)]())){if(_0x28bf04(0x347)!==_0x28bf04(0x347)){if(!_0x146cba[_0x28bf04(0x3d9)]())return;_0xb7cb06[_0x28bf04(0x317)](_0x355c05,_0x444ceb);let _0x3f0c21=0x0;_0x3f0c21+=_0x5696aa[_0x28bf04(0x3d7)],_0x3f0c21+=_0x31ab7a[_0x28bf04(0x57a)]*0x3c,_0x3f0c21+=_0x1e5b1f[_0x28bf04(0x372)]*0x3c*0x3c,_0x3f0c21+=_0x558c53['Hours']*0x3c*0x3c*0x3c,_0x28ad29[_0x28bf04(0x48a)](_0x3f0c21);}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x28bf04(0x11f)][_0x28bf04(0x211)](_0x51df35=>_0x51df35[_0x28bf04(0x448)]())){this[_0x28bf04(0x3a5)]=!![];return;}},VisuMZ['EventsMoveCore']['Game_Map_update']=Game_Map[_0x270971(0xa1)][_0x270971(0x424)],Game_Map['prototype'][_0x270971(0x424)]=function(_0x33343c){const _0x3fa09a=_0x270971;this[_0x3fa09a(0x49d)](),VisuMZ['EventsMoveCore'][_0x3fa09a(0x5c5)][_0x3fa09a(0x437)](this,_0x33343c);},Game_Map[_0x270971(0xa1)][_0x270971(0x49d)]=function(){const _0x49e0a2=_0x270971;if(!this['_needsPeriodicRefresh'])return;this[_0x49e0a2(0x60d)]=this[_0x49e0a2(0x60d)]||0x3c,this['_periodicRefreshTimer']--,this[_0x49e0a2(0x60d)]<=0x0&&(this[_0x49e0a2(0xb1)](),this[_0x49e0a2(0x60d)]=0x3c);},VisuMZ[_0x270971(0x543)]['Game_Map_isDashDisabled']=Game_Map['prototype'][_0x270971(0x5a6)],Game_Map['prototype']['isDashDisabled']=function(){const _0x51092b=_0x270971;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x51092b(0x543)][_0x51092b(0x457)][_0x51092b(0x437)](this);},Game_Map['prototype'][_0x270971(0x596)]=function(){const _0x419e94=_0x270971;this[_0x419e94(0x484)]=![];const _0x34e4dc=$dataMap[_0x419e94(0x3f7)]||'';_0x34e4dc['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x419e94(0x484)]=!![]);},Game_Map['prototype'][_0x270971(0x522)]=function(){const _0x40c6d6=_0x270971;if(this[_0x40c6d6(0x484)]===undefined)this[_0x40c6d6(0x596)]();return this['_saveEventLocations'];},Game_Map[_0x270971(0xa1)]['removeTemporaryMapSpawnedEvents']=function(_0x3ebad9){const _0x1e1941=_0x270971;_0x3ebad9!==this[_0x1e1941(0x4dc)]()&&$gamePlayer&&$gameSystem[_0x1e1941(0x625)](this['mapId']());},Game_Map['prototype']['setupSpawnedEvents']=function(){const _0x2d5c8e=_0x270971;this[_0x2d5c8e(0x5e3)]=$gameSystem[_0x2d5c8e(0x425)](this[_0x2d5c8e(0x4dc)]()),this['_needsRefresh']=!![];},VisuMZ[_0x270971(0x543)][_0x270971(0x4fb)]=Game_Map['prototype'][_0x270971(0x1b6)],Game_Map[_0x270971(0xa1)]['events']=function(){const _0x2f5c3f=_0x270971;if(this[_0x2f5c3f(0x52a)])return this['_eventCache'];const _0x4e2bfe=VisuMZ[_0x2f5c3f(0x543)][_0x2f5c3f(0x4fb)][_0x2f5c3f(0x437)](this),_0xb16fb4=_0x4e2bfe[_0x2f5c3f(0x1fc)](this[_0x2f5c3f(0x5e3)]||[]);return this['_eventCache']=_0xb16fb4['filter'](_0x51ac60=>!!_0x51ac60),this['_eventCache'];},VisuMZ['EventsMoveCore'][_0x270971(0x1c9)]=Game_Map[_0x270971(0xa1)][_0x270971(0x22b)],Game_Map[_0x270971(0xa1)][_0x270971(0x22b)]=function(_0x2e5db3){const _0x1c6526=_0x270971;if(_0x2e5db3>=0x3e8){if(_0x1c6526(0x147)!==_0x1c6526(0x147)){if(!_0x3ad2d1[_0x1c6526(0x3d9)]())return;_0x19fc61[_0x1c6526(0x217)]();}else return _0x2e5db3-=0x3e8,this[_0x1c6526(0x5e3)][_0x2e5db3];}else return VisuMZ['EventsMoveCore'][_0x1c6526(0x1c9)][_0x1c6526(0x437)](this,_0x2e5db3);},Game_Map['prototype'][_0x270971(0x568)]=function(_0x4741de){const _0x5e9c6e=_0x270971,_0x877894=this[_0x5e9c6e(0x22b)](_0x4741de);if(_0x877894)_0x877894[_0x5e9c6e(0x4a3)]();},Game_Map[_0x270971(0xa1)]['setupSpawnTest']=function(){const _0x3c164c=_0x270971,_0x3e1ca5={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x3c164c(0x5e3)][_0x3c164c(0x531)]+0x3e8};this['createSpawnedEventWithData'](_0x3e1ca5);},Game_Map[_0x270971(0xa1)][_0x270971(0x545)]=function(_0x38ad70,_0x3c2e4f){const _0x314924=_0x270971;if(this[_0x314924(0x2a7)](_0x38ad70,_0x3c2e4f)[_0x314924(0x531)]>0x0)return!![];if($gamePlayer['x']===_0x38ad70&&$gamePlayer['y']===_0x3c2e4f)return!![];if(this[_0x314924(0xec)]()['posNt'](_0x38ad70,_0x3c2e4f))return!![];if(this['ship']()[_0x314924(0x35a)](_0x38ad70,_0x3c2e4f))return!![];return![];},Game_Map[_0x270971(0xa1)]['isSpawnHitboxCollisionOk']=function(_0x538a25,_0x129902,_0x3d66cf){const _0x5eb0f=_0x270971;$gameTemp[_0x5eb0f(0x553)]=_0x538a25;const _0x14b61e=new Game_Event(_0x538a25[_0x5eb0f(0x4dc)],_0x538a25[_0x5eb0f(0x2c4)]);$gameTemp[_0x5eb0f(0x553)]=undefined,_0x14b61e[_0x5eb0f(0xdb)]();let _0x4f1f50=_0x129902-_0x14b61e['_addedHitbox'][_0x5eb0f(0xe8)],_0x2ba347=_0x129902+_0x14b61e[_0x5eb0f(0x271)][_0x5eb0f(0x2b0)],_0x142344=_0x3d66cf-_0x14b61e[_0x5eb0f(0x271)]['up'],_0x249fb3=_0x3d66cf+_0x14b61e['_addedHitbox'][_0x5eb0f(0x1d4)];for(let _0x41d0a7=_0x4f1f50;_0x41d0a7<=_0x2ba347;_0x41d0a7++){for(let _0x34b80f=_0x142344;_0x34b80f<=_0x249fb3;_0x34b80f++){if(this['checkExistingEntitiesAt'](_0x41d0a7,_0x34b80f))return![];}}return!![];},Game_Map[_0x270971(0xa1)][_0x270971(0x3f3)]=function(_0x2680c5){const _0x3c4494=_0x270971;$gameTemp['_spawnData']=_0x2680c5;const _0x469eb1=new Game_Event(_0x2680c5['mapId'],_0x2680c5[_0x3c4494(0x2c4)]);$gameTemp[_0x3c4494(0x553)]=undefined,this['_spawnedEvents']['push'](_0x469eb1),_0x469eb1[_0x3c4494(0x2cf)](_0x2680c5),this[_0x3c4494(0x50d)]();},Game_Map[_0x270971(0xa1)][_0x270971(0x23c)]=function(_0x5ba5e5,_0x42557f,_0x403623){const _0x288d2d=_0x270971,_0x349d67=_0x5ba5e5[_0x288d2d(0x3bc)][_0x288d2d(0x363)]()[_0x288d2d(0x1c1)]();if(_0x349d67!==_0x288d2d(0x128)){if(_0x288d2d(0xcd)!==_0x288d2d(0xcd)){_0x19c92e[_0x288d2d(0x317)](_0x893410,_0x33930a);const _0x13dd92=_0x268009[_0x288d2d(0x54e)];_0x56f68f['setControlledFollowerID'](_0x13dd92);}else{const _0x16815b=VisuMZ[_0x288d2d(0x4ba)][_0x349d67];_0x16815b&&(_0x5ba5e5[_0x288d2d(0x4dc)]=_0x16815b[_0x288d2d(0x8d)],_0x5ba5e5[_0x288d2d(0x2c4)]=_0x16815b[_0x288d2d(0x50c)]);}}const _0x28da9c=_0x5ba5e5['x'],_0x1919b9=_0x5ba5e5['y'];if(!this['isValid'](_0x28da9c,_0x1919b9))return![];if(_0x42557f){if(this[_0x288d2d(0x545)](_0x28da9c,_0x1919b9))return![];if(!this['isSpawnHitboxCollisionOk'](_0x5ba5e5,_0x28da9c,_0x1919b9))return![];}if(_0x403623){if(!this['isPassableByAnyDirection'](_0x28da9c,_0x1919b9))return![];}return this[_0x288d2d(0x3f3)](_0x5ba5e5),!![];},Game_Map['prototype'][_0x270971(0x1b2)]=function(_0x3f740e,_0x4c6fcb,_0x23d75f,_0x403052){const _0x1584a8=_0x270971,_0x2a9c8a=_0x3f740e[_0x1584a8(0x3bc)][_0x1584a8(0x363)]()['trim']();if(_0x2a9c8a!==_0x1584a8(0x128)){if(_0x1584a8(0x1be)!=='MfXJt'){if(this[_0x1584a8(0x5fd)]===_0x6d71fb)this['initEventsMoveCore']();this['_expireCommonEvent']=_0x423c3b;}else{const _0x44cff2=VisuMZ[_0x1584a8(0x4ba)][_0x2a9c8a];_0x44cff2&&(_0x3f740e['mapId']=_0x44cff2[_0x1584a8(0x8d)],_0x3f740e[_0x1584a8(0x2c4)]=_0x44cff2[_0x1584a8(0x50c)]);}}const _0x3a2518=[],_0x58dee6=this['width'](),_0xd8eb9a=this['height']();for(let _0x308ade=0x0;_0x308ade<_0x58dee6;_0x308ade++){if(_0x1584a8(0x57e)!==_0x1584a8(0x57e)){if(this[_0x1584a8(0x39e)])return _0x6219e3[_0x1584a8(0xa1)]['isDashingAndMoving'][_0x1584a8(0x437)](this);return _0x470956[_0x1584a8(0x510)]()&&this[_0x1584a8(0x10c)];}else for(let _0x3e43ce=0x0;_0x3e43ce<_0xd8eb9a;_0x3e43ce++){if(!_0x4c6fcb['includes'](this[_0x1584a8(0x3fe)](_0x308ade,_0x3e43ce)))continue;if(!this['isValid'](_0x308ade,_0x3e43ce))continue;if(_0x23d75f){if(this[_0x1584a8(0x545)](_0x308ade,_0x3e43ce))continue;if(!this[_0x1584a8(0x1e8)](_0x3f740e,_0x308ade,_0x3e43ce))continue;}if(_0x403052){if(!this[_0x1584a8(0x309)](_0x308ade,_0x3e43ce))continue;}_0x3a2518['push']([_0x308ade,_0x3e43ce]);}}if(_0x3a2518[_0x1584a8(0x531)]>0x0){const _0x134e99=_0x3a2518[Math[_0x1584a8(0x10f)](_0x3a2518[_0x1584a8(0x531)])];return _0x3f740e['x']=_0x134e99[0x0],_0x3f740e['y']=_0x134e99[0x1],this[_0x1584a8(0x3f3)](_0x3f740e),!![];}return![];},Game_Map[_0x270971(0xa1)][_0x270971(0x55a)]=function(_0x442c6b,_0x314179,_0x57f24a,_0x4e7f65){const _0x1386bd=_0x270971,_0xa59ad1=_0x442c6b[_0x1386bd(0x3bc)]['toUpperCase']()[_0x1386bd(0x1c1)]();if(_0xa59ad1!==_0x1386bd(0x128)){const _0x55c94d=VisuMZ[_0x1386bd(0x4ba)][_0xa59ad1];_0x55c94d&&(_0x442c6b[_0x1386bd(0x4dc)]=_0x55c94d['MapID'],_0x442c6b[_0x1386bd(0x2c4)]=_0x55c94d['EventID']);}const _0x367572=[],_0x4ce6ca=this[_0x1386bd(0x549)](),_0xae0946=this[_0x1386bd(0x3b6)]();for(let _0x30ea03=0x0;_0x30ea03<_0x4ce6ca;_0x30ea03++){for(let _0x3a8e86=0x0;_0x3a8e86<_0xae0946;_0x3a8e86++){if(_0x1386bd(0x4de)!=='gVgaw'){_0x22b3d5[_0x1386bd(0x35b)](this);const _0x42a5c1=_0x21d404[_0x1386bd(0x543)][_0x1386bd(0x193)][_0x1386bd(0x437)](this,_0x4276c1);return _0x27749a['clearSelfTarget'](),_0x42a5c1;}else{if(!_0x314179[_0x1386bd(0x3fc)](this[_0x1386bd(0x508)](_0x30ea03,_0x3a8e86)))continue;if(!this[_0x1386bd(0x597)](_0x30ea03,_0x3a8e86))continue;if(_0x57f24a){if(this[_0x1386bd(0x545)](_0x30ea03,_0x3a8e86))continue;if(!this[_0x1386bd(0x1e8)](_0x442c6b,_0x30ea03,_0x3a8e86))continue;}if(_0x4e7f65){if(!this[_0x1386bd(0x309)](_0x30ea03,_0x3a8e86))continue;}_0x367572[_0x1386bd(0x1bd)]([_0x30ea03,_0x3a8e86]);}}}if(_0x367572[_0x1386bd(0x531)]>0x0){const _0x4dc5c9=_0x367572[Math[_0x1386bd(0x10f)](_0x367572['length'])];return _0x442c6b['x']=_0x4dc5c9[0x0],_0x442c6b['y']=_0x4dc5c9[0x1],this[_0x1386bd(0x3f3)](_0x442c6b),!![];}return![];},Game_Map[_0x270971(0xa1)][_0x270971(0x309)]=function(_0x4430ba,_0x13adba){const _0x44e68f=_0x270971;if(this['isPassable'](_0x4430ba,_0x13adba,0x2))return!![];if(this['isPassable'](_0x4430ba,_0x13adba,0x4))return!![];if(this[_0x44e68f(0x5a5)](_0x4430ba,_0x13adba,0x6))return!![];if(this[_0x44e68f(0x5a5)](_0x4430ba,_0x13adba,0x8))return!![];return![];},Game_Map[_0x270971(0xa1)][_0x270971(0x2c9)]=function(_0x2491ea){const _0x23dee9=_0x270971;if(_0x2491ea<0x3e8)return;if(!this[_0x23dee9(0x5e3)])return;const _0xf191dc=this[_0x23dee9(0x22b)](_0x2491ea);_0xf191dc[_0x23dee9(0x329)](-0x1,-0x1),_0xf191dc['erase'](),this[_0x23dee9(0x5e3)][_0x2491ea-0x3e8]=null,this['clearEventCache']();},Game_Map['prototype'][_0x270971(0x399)]=function(){const _0x378b82=_0x270971;for(const _0x3b0853 of this[_0x378b82(0x5e3)]){if(_0x3b0853)return _0x3b0853;}return null;},Game_Map[_0x270971(0xa1)][_0x270971(0x167)]=function(){const _0x377f01=_0x270971,_0x556407=this[_0x377f01(0x399)]();return _0x556407?_0x556407[_0x377f01(0x8a)]:0x0;},Game_Map[_0x270971(0xa1)][_0x270971(0xf4)]=function(){const _0x3ae392=_0x270971,_0xb13046=this[_0x3ae392(0x5e3)][_0x3ae392(0xe3)](0x0)['reverse']();for(const _0x34d76d of _0xb13046){if(_0x34d76d)return _0x34d76d;}return null;},Game_Map[_0x270971(0xa1)][_0x270971(0x24a)]=function(){const _0x62f646=_0x270971,_0x1d8c93=this[_0x62f646(0xf4)]();return _0x1d8c93?_0x1d8c93[_0x62f646(0x8a)]:0x0;},Game_Map[_0x270971(0xa1)]['despawnAtXY']=function(_0x29d6b2,_0x10b270){const _0x419a61=_0x270971,_0x3d95a9=this[_0x419a61(0x2a7)](_0x29d6b2,_0x10b270);for(const _0x1d8ec8 of _0x3d95a9){if(_0x419a61(0x139)!=='yZIoX')this[_0x419a61(0x517)]=_0x23f5df(_0x1ae301['$1'])*0.01;else{if(!_0x1d8ec8)continue;if(_0x1d8ec8[_0x419a61(0x54d)]())this['despawnEventId'](_0x1d8ec8['_eventId']);}}},Game_Map['prototype']['despawnRegions']=function(_0x178c87){const _0xc88459=_0x270971;for(const _0x219933 of this['_spawnedEvents']){if(!_0x219933)continue;_0x178c87[_0xc88459(0x3fc)](_0x219933['regionId']())&&this[_0xc88459(0x2c9)](_0x219933[_0xc88459(0x8a)]);}},Game_Map['prototype'][_0x270971(0x60e)]=function(_0xb5c61a){const _0x2f2c9e=_0x270971;for(const _0x12ffa9 of this[_0x2f2c9e(0x5e3)]){if(!_0x12ffa9)continue;_0xb5c61a[_0x2f2c9e(0x3fc)](_0x12ffa9[_0x2f2c9e(0x508)]())&&this[_0x2f2c9e(0x2c9)](_0x12ffa9[_0x2f2c9e(0x8a)]);}},Game_Map[_0x270971(0xa1)]['despawnEverything']=function(){const _0x5a0c9e=_0x270971;for(const _0x226458 of this[_0x5a0c9e(0x5e3)]){if(_0x5a0c9e(0x4a8)!==_0x5a0c9e(0x182)){if(!_0x226458)continue;this[_0x5a0c9e(0x2c9)](_0x226458[_0x5a0c9e(0x8a)]);}else return this[_0x5a0c9e(0x487)]()[_0x5a0c9e(0x442)]??'';}},VisuMZ['EventsMoveCore'][_0x270971(0x621)]=Game_Map['prototype'][_0x270971(0x433)],Game_Map[_0x270971(0xa1)][_0x270971(0x433)]=function(_0x29aff3){const _0x23e7e7=_0x270971;VisuMZ[_0x23e7e7(0x543)]['Game_Map_unlockEvent'][_0x23e7e7(0x437)](this,_0x29aff3);if(_0x29aff3>=0x3e8){const _0x1790c8=this[_0x23e7e7(0x22b)](_0x29aff3);if(_0x1790c8)_0x1790c8['unlock']();}},Game_Map[_0x270971(0xa1)][_0x270971(0x17d)]=function(){const _0x22f539=_0x270971;this[_0x22f539(0x5f7)]=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x2a6c3c=$dataMap[_0x22f539(0x3f7)]||'';if(_0x2a6c3c[_0x22f539(0x447)](/<HIDE PLAYER>/i))_0x22f539(0x188)===_0x22f539(0x188)?(this[_0x22f539(0x5f7)]=![],this['_forceHidePlayer']=!![]):(this['updateScaleBase'](),_0x3b6ab0[_0x22f539(0x543)][_0x22f539(0x5f4)][_0x22f539(0x437)](this),this[_0x22f539(0x1cb)]());else _0x2a6c3c[_0x22f539(0x447)](/<SHOW PLAYER>/i)&&(this[_0x22f539(0x5f7)]=!![],this[_0x22f539(0x639)]=![]);},Game_Map['prototype'][_0x270971(0x477)]=function(){const _0x4c5a7c=_0x270971;return this[_0x4c5a7c(0x5f7)]===undefined&&this['setupPlayerVisibilityOverrides'](),this['_forceShowPlayer'];},Game_Map[_0x270971(0xa1)][_0x270971(0x17f)]=function(){const _0x34cfe0=_0x270971;return this[_0x34cfe0(0x639)]===undefined&&this[_0x34cfe0(0x17d)](),this['_forceHidePlayer'];},VisuMZ['EventsMoveCore'][_0x270971(0x4bc)]=Game_CharacterBase[_0x270971(0xa1)]['isTransparent'],Game_CharacterBase['prototype']['isTransparent']=function(){const _0x51946f=_0x270971;if(this===$gamePlayer){if(_0x51946f(0x2af)===_0x51946f(0x2af)){if($gameMap['isPlayerForceShown']())return![];if($gameMap['isPlayerForceHidden']())return!![];}else{if([0x2,0x4,0x6,0x8][_0x51946f(0x3fc)](_0x3eac22))return 0x2;if([0x1,0x3,0x7,0x9][_0x51946f(0x3fc)](_0x5e3aec))return 0x3;}}return VisuMZ['EventsMoveCore'][_0x51946f(0x4bc)][_0x51946f(0x437)](this);},Game_Map[_0x270971(0xa1)]['setupFollowerVisibilityOverrides']=function(){const _0x17294b=_0x270971;this['_forceShowFollower']=![],this[_0x17294b(0x51a)]=![];if(!$dataMap)return;const _0x284266=$dataMap[_0x17294b(0x3f7)]||'';if(_0x284266[_0x17294b(0x447)](/<HIDE FOLLOWERS>/i))_0x17294b(0x201)===_0x17294b(0x550)?this[_0x17294b(0x204)]=0x0:(this[_0x17294b(0x5c7)]=![],this[_0x17294b(0x51a)]=!![]);else{if(_0x284266[_0x17294b(0x447)](/<SHOW FOLLOWERS>/i)){if(_0x17294b(0x143)!==_0x17294b(0x143)){const _0x264a54=[_0x246549[_0x17294b(0x61a)],_0x4769af[_0x17294b(0x8a)],_0x17294b(0x35f)[_0x17294b(0x27e)](_0x177a9c)];_0x5f5ae3['setValue'](_0x264a54,_0x21e705);}else this[_0x17294b(0x5c7)]=!![],this[_0x17294b(0x51a)]=![];}}},Game_Map[_0x270971(0xa1)]['areFollowersForceShown']=function(){const _0x111b56=_0x270971;if(this['_forceShowFollower']===undefined){if(_0x111b56(0x2eb)!=='wOgde')this[_0x111b56(0x1ea)]();else return this[_0x111b56(0x3c1)](_0x512547);}return this[_0x111b56(0x5c7)];},Game_Map[_0x270971(0xa1)][_0x270971(0x3f0)]=function(){const _0x5003ec=_0x270971;if(this[_0x5003ec(0x51a)]===undefined){if(_0x5003ec(0x42e)!==_0x5003ec(0x42e)){this[_0x5003ec(0x557)]=this[_0x5003ec(0x4dc)](),this[_0x5003ec(0x52a)]=_0x3afb7b;const _0x4d21a1=this[_0x5003ec(0x1b6)]();for(const _0x256217 of _0x4d21a1){if(_0x256217)_0x44d0d0['resetSelfSwitchesForEvent'](_0x256217);}}else this[_0x5003ec(0x1ea)]();}return this[_0x5003ec(0x51a)];},VisuMZ[_0x270971(0x543)][_0x270971(0x509)]=Game_Followers[_0x270971(0xa1)][_0x270971(0x2dd)],Game_Followers[_0x270971(0xa1)][_0x270971(0x2dd)]=function(){const _0xbaa5a1=_0x270971;if($gameMap[_0xbaa5a1(0x3cf)]())return!![];if($gameMap[_0xbaa5a1(0x3f0)]())return![];return VisuMZ[_0xbaa5a1(0x543)][_0xbaa5a1(0x509)][_0xbaa5a1(0x437)](this);},Game_Map[_0x270971(0xa1)][_0x270971(0x339)]=function(){const _0x11aa05=_0x270971,_0x419b39=this[_0x11aa05(0x1b6)](),_0x60bd84=[];$gameParty[_0x11aa05(0x3a3)]=!![];for(const _0x229948 of _0x419b39){if(_0x11aa05(0x5f5)===_0x11aa05(0x468))return 0x8;else{if(!_0x229948)continue;if(_0x229948[_0x11aa05(0xbb)])continue;_0x229948[_0x11aa05(0x540)]()&&_0x60bd84[_0x11aa05(0x1bd)](_0x229948);}}$gameParty[_0x11aa05(0x3a3)]=undefined;for(const _0x49621c of _0x60bd84){if(!_0x49621c)continue;if(_0x49621c['_erased'])continue;this[_0x11aa05(0x568)](_0x49621c[_0x11aa05(0x2c4)]());}},Game_Event[_0x270971(0xa1)][_0x270971(0x540)]=function(){const _0xaf80af=_0x270971,_0x3dd08c=this[_0xaf80af(0x22b)]()[_0xaf80af(0x3f7)]||'';if(_0x3dd08c[_0xaf80af(0x447)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty['hasEncounterHalf']())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x3dd08c[_0xaf80af(0x447)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty[_0xaf80af(0x15e)]())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0x270971(0x543)]['Scene_Map_onMapLoadedEncErase']=Scene_Map[_0x270971(0xa1)][_0x270971(0x146)],Scene_Map[_0x270971(0xa1)][_0x270971(0x146)]=function(){const _0x113be6=_0x270971;VisuMZ[_0x113be6(0x543)][_0x113be6(0x63e)][_0x113be6(0x437)](this),$gameMap[_0x113be6(0x339)]();},Game_Map[_0x270971(0xa1)][_0x270971(0x348)]=function(){const _0x490907=_0x270971;if(!$dataMap)return;if(!$dataMap[_0x490907(0x3f7)])return;const _0x4496a4=$dataMap[_0x490907(0x3f7)];if(_0x4496a4[_0x490907(0x447)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){if(_0x490907(0x2f3)===_0x490907(0x2f3)){const _0x1e5b4f=String(RegExp['$1'])[_0x490907(0x62b)](',')[_0x490907(0x218)](_0x3a22f3=>Number(_0x3a22f3));for(const _0x2a8b23 of _0x1e5b4f){_0x490907(0x22f)===_0x490907(0x22f)?$gameTemp[_0x490907(0x208)](_0x2a8b23):(this['_interpreter']=new _0x2ea7f4(),this[_0x490907(0x3c0)]());}}else _0x191b02['ConvertParams'](_0x13f8c3,_0xaf01c1),_0x5d897a[_0x490907(0x574)]();}},Game_CommonEvent[_0x270971(0xa1)][_0x270971(0x575)]=function(){const _0x566000=_0x270971,_0x16a9ec=this[_0x566000(0x22b)]();return this[_0x566000(0x10d)]()&&_0x16a9ec[_0x566000(0x291)]>=0x1&&DataManager[_0x566000(0x1ab)](_0x16a9ec['switchId']);},Game_CommonEvent[_0x270971(0xa1)][_0x270971(0x448)]=function(){const _0xc51953=_0x270971;return VisuMZ[_0xc51953(0x543)][_0xc51953(0x42d)][_0xc51953(0x11f)]['includes'](this[_0xc51953(0x191)]);},VisuMZ[_0x270971(0x543)][_0x270971(0x3ff)]=Game_CommonEvent[_0x270971(0xa1)][_0x270971(0x10d)],Game_CommonEvent[_0x270971(0xa1)][_0x270971(0x10d)]=function(){const _0xef6380=_0x270971;if(VisuMZ[_0xef6380(0x543)][_0xef6380(0x3ff)][_0xef6380(0x437)](this))return _0xef6380(0x4d4)!==_0xef6380(0x4d4)?_0x954a67>=0x3e8?(_0x58a4c4-=0x3e8,this[_0xef6380(0x5e3)][_0x2841ad]):_0xdc84e0[_0xef6380(0x543)][_0xef6380(0x1c9)][_0xef6380(0x437)](this,_0x1988cd):!![];else{const _0x4b5aea=this[_0xef6380(0x22b)]();return VisuMZ[_0xef6380(0x543)][_0xef6380(0x42d)][_0xef6380(0x216)](this[_0xef6380(0x22b)]()[_0xef6380(0x4af)],this[_0xef6380(0x191)],_0x4b5aea);}},VisuMZ['EventsMoveCore'][_0x270971(0x141)]=Game_Map[_0x270971(0xa1)][_0x270971(0x3b0)],Game_Map['prototype'][_0x270971(0x3b0)]=function(){const _0x1d59d4=_0x270971,_0x301dcc=VisuMZ[_0x1d59d4(0x543)][_0x1d59d4(0x141)][_0x1d59d4(0x437)](this),_0x541147=VisuMZ[_0x1d59d4(0x543)]['CustomPageConditions'][_0x1d59d4(0x11f)][_0x1d59d4(0x218)](_0x50c1ff=>$dataCommonEvents[_0x50c1ff]);return _0x301dcc[_0x1d59d4(0x1fc)](_0x541147)['filter']((_0x5a5cd9,_0x50e128,_0x1ca491)=>_0x1ca491[_0x1d59d4(0x119)](_0x5a5cd9)===_0x50e128);},Game_CharacterBase[_0x270971(0x114)]=VisuMZ['EventsMoveCore'][_0x270971(0x412)][_0x270971(0x42b)][_0x270971(0x5ba)]??![],VisuMZ[_0x270971(0x543)][_0x270971(0x151)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x485)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x485)]=function(){const _0x569f7d=_0x270971;VisuMZ[_0x569f7d(0x543)][_0x569f7d(0x151)]['call'](this),this[_0x569f7d(0x328)]();},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x328)]=function(){const _0x14372a=_0x270971;this['_scaleBaseX']=0x1,this[_0x14372a(0x517)]=0x1,this['_patternLocked']=![],this['clearPose'](),this[_0x14372a(0x556)](),this['clearSpriteOffsets'](),this['clearStepPattern']();},VisuMZ[_0x270971(0x543)]['Game_CharacterBase_opacity']=Game_CharacterBase[_0x270971(0xa1)]['opacity'],Game_CharacterBase[_0x270971(0xa1)]['opacity']=function(){const _0x4d5225=_0x270971;let _0x18d516=VisuMZ['EventsMoveCore'][_0x4d5225(0x2f7)][_0x4d5225(0x437)](this);return _0x18d516=this[_0x4d5225(0x591)](_0x18d516),_0x18d516;},Game_CharacterBase[_0x270971(0xa1)]['adjustMoveSynchOpacityDelta']=function(_0x3950cf){return _0x3950cf;},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x602)]=function(){const _0x3ffb57=_0x270971;if(this['constructor']===Game_Player&&this[_0x3ffb57(0x2e2)]())return this[_0x3ffb57(0x54c)]()[_0x3ffb57(0x446)]()[_0x3ffb57(0x447)](/\[VS8\]/i);else{if(Imported[_0x3ffb57(0x4d8)]&&this[_0x3ffb57(0x290)]()){if('niLCx'!==_0x3ffb57(0x40f)){const _0x3ce921=_0x54528c[_0x3ffb57(0x543)]['Game_Map_parallelCommonEvents'][_0x3ffb57(0x437)](this),_0x535de5=_0x184533[_0x3ffb57(0x543)][_0x3ffb57(0x42d)][_0x3ffb57(0x11f)][_0x3ffb57(0x218)](_0x1ec060=>_0x50e260[_0x1ec060]);return _0x3ce921[_0x3ffb57(0x1fc)](_0x535de5)[_0x3ffb57(0x49b)]((_0x53c02c,_0x49617b,_0x4f4bfc)=>_0x4f4bfc['indexOf'](_0x53c02c)===_0x49617b);}else return!![];}else return this[_0x3ffb57(0x446)]()[_0x3ffb57(0x447)](/\[VS8\]/i);}},VisuMZ[_0x270971(0x543)][_0x270971(0x9a)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x3b9)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x3b9)]=function(){const _0x165f0a=_0x270971;if(!$dataMap)return this[_0x165f0a(0xc2)]||0x2;if(this[_0x165f0a(0x2a0)]()&&!this[_0x165f0a(0x1b7)]()&&this[_0x165f0a(0x602)]())return this[_0x165f0a(0x286)]();else{if(this[_0x165f0a(0x2a0)]()&&!this['isJumping']())return 0x8;else{if(this[_0x165f0a(0x5b0)]()&&this[_0x165f0a(0x602)]())return this[_0x165f0a(0x350)]();else{if('VLsDL'===_0x165f0a(0x334))return VisuMZ[_0x165f0a(0x543)][_0x165f0a(0x9a)][_0x165f0a(0x437)](this);else{_0xf4d5a6=_0x36de0b(_0x3042b7['$1']),_0x1d8b04=_0x2155f8(_0xe717d1['$2']);if(_0x5ed5bd===0x0)_0x1a3706=_0x48f3ae[_0x165f0a(0x4dc)]();}}}}},VisuMZ[_0x270971(0x543)][_0x270971(0x2f2)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x12a)],Game_CharacterBase['prototype'][_0x270971(0x12a)]=function(_0x4f348b){const _0x3458a7=_0x270971;if(!this[_0x3458a7(0x602)]())_0x4f348b=this[_0x3458a7(0x1a2)](_0x4f348b);VisuMZ[_0x3458a7(0x543)][_0x3458a7(0x2f2)][_0x3458a7(0x437)](this,_0x4f348b),this['updateMoveSynchDirection']();},Game_CharacterBase[_0x270971(0xa1)]['correctFacingDirection']=function(_0x579300){const _0x15bef2=_0x270971;if(_0x579300===0x1)return this[_0x15bef2(0x45a)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x579300===0x3)return this[_0x15bef2(0x45a)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x579300===0x7)return this[_0x15bef2(0x45a)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x579300===0x9)return this[_0x15bef2(0x45a)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x579300;},Game_CharacterBase['prototype'][_0x270971(0x340)]=function(_0x379080){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x379080);},Game_CharacterBase[_0x270971(0xa1)]['lastMovedDirection']=function(){const _0x220460=_0x270971;return this[_0x220460(0x212)]||0x0;},VisuMZ[_0x270971(0x543)][_0x270971(0x61c)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x255)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x255)]=function(_0x1dac6f){const _0x302f42=_0x270971;this[_0x302f42(0x212)]=_0x1dac6f,VisuMZ[_0x302f42(0x543)][_0x302f42(0x61c)]['call'](this,_0x1dac6f);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x1bc)]=function(_0x57873e){const _0x4be068=_0x270971;if(!this[_0x4be068(0x340)](_0x57873e)){if(_0x4be068(0x54f)===_0x4be068(0x54f))return this[_0x4be068(0x255)](_0x57873e);else{if(!this[_0x4be068(0x537)])return;this[_0x4be068(0x541)](),this[_0x4be068(0x2b8)]();}}let _0x12f91a=0x0,_0x1988fc=0x0;switch(_0x57873e){case 0x1:_0x12f91a=0x4,_0x1988fc=0x2;break;case 0x3:_0x12f91a=0x6,_0x1988fc=0x2;break;case 0x7:_0x12f91a=0x4,_0x1988fc=0x8;break;case 0x9:_0x12f91a=0x6,_0x1988fc=0x8;break;}if(VisuMZ[_0x4be068(0x543)][_0x4be068(0x412)][_0x4be068(0x42b)]['StrictCollision']){if(_0x4be068(0x37a)===_0x4be068(0x37a)){if(!this['canPass'](this['_x'],this['_y'],_0x12f91a))return this[_0x4be068(0x255)](_0x1988fc);if(!this['canPass'](this['_x'],this['_y'],_0x1988fc))return this[_0x4be068(0x255)](_0x12f91a);if(!this[_0x4be068(0x28c)](this['_x'],this['_y'],_0x12f91a,_0x1988fc)){if(_0x4be068(0x3fb)!==_0x4be068(0x3fb)){if(this[_0x4be068(0x2d0)]()&&this['_event']&&this['_event']['_labelWindow']['hueShift']){const _0x346eae=this[_0x4be068(0x3bf)]+(this[_0x4be068(0x4ac)][_0x4be068(0x240)][_0x4be068(0x361)]||0x0);this[_0x4be068(0x294)](_0x346eae);}}else{let _0x2d0545=VisuMZ[_0x4be068(0x543)][_0x4be068(0x412)]['Movement'][_0x4be068(0x4d0)]?_0x12f91a:_0x1988fc;return this['moveStraight'](_0x2d0545);}}}else{const _0x24abb8=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return _0x3e7694[_0x4be068(0x150)](this['y'],_0x24abb8);}}this[_0x4be068(0x212)]=_0x57873e,this[_0x4be068(0x21d)](_0x12f91a,_0x1988fc);},VisuMZ[_0x270971(0x543)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x2f9)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x2f9)]=function(){const _0x3cfa15=_0x270971;let _0x5bf13b=this[_0x3cfa15(0x1ba)];return this['isDashing']()&&(_0x5bf13b+=this['dashSpeedModifier']()),this[_0x3cfa15(0x5b1)](_0x5bf13b);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x4f8)]=function(){const _0xa0b85b=_0x270971,_0x1e5aab=VisuMZ['EventsMoveCore'][_0xa0b85b(0x412)]['Movement'];if(_0x1e5aab[_0xa0b85b(0x476)]!==undefined)return _0xa0b85b(0x4f6)!=='LXHca'?this['characterPatternYBasic']():_0x1e5aab['DashModifier'];else{if('YfWZO'===_0xa0b85b(0x222))return VisuMZ['EventsMoveCore'][_0xa0b85b(0x1ca)][_0xa0b85b(0x437)](this)-this[_0xa0b85b(0x1ba)];else{_0x1b53b2[_0xa0b85b(0x543)]['Game_CharacterBase_moveDiagonally'][_0xa0b85b(0x437)](this,_0x18873e,_0x21a13c);if(this[_0xa0b85b(0x602)]())this['setDiagonalDirection'](_0x2d159b,_0x2543c9);}}},Game_CharacterBase[_0x270971(0xa1)]['adjustDir8MovementSpeed']=function(_0x51af97){const _0x1a492d=_0x270971,_0x47f5e3=VisuMZ[_0x1a492d(0x543)][_0x1a492d(0x412)]['Movement'];if(!_0x47f5e3[_0x1a492d(0x207)])return _0x51af97;if([0x1,0x3,0x7,0x9][_0x1a492d(0x3fc)](this['_lastMovedDirection'])){if(_0x1a492d(0x1ac)!==_0x1a492d(0x1ac)){if(this['isOnLadder']())return!![];if(this[_0x1a492d(0x2a8)]===_0x40625a&&this[_0x1a492d(0x2e2)]())return!![];return![];}else _0x51af97*=_0x47f5e3[_0x1a492d(0x55c)]||0.01;}return _0x51af97;},VisuMZ[_0x270971(0x543)][_0x270971(0x1e6)]=Game_CharacterBase[_0x270971(0xa1)]['isDashing'],Game_CharacterBase[_0x270971(0xa1)]['isDashing']=function(){const _0x31868b=_0x270971;if(!Game_CharacterBase[_0x31868b(0x114)]&&this[_0x31868b(0x2a0)]())return![];if(this[_0x31868b(0x312)])return!![];return VisuMZ[_0x31868b(0x543)][_0x31868b(0x1e6)]['call'](this);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x510)]=function(){const _0x4723dc=_0x270971;return this[_0x4723dc(0x52d)]()&&this[_0x4723dc(0x405)]===0x0;},VisuMZ['EventsMoveCore'][_0x270971(0x436)]=Game_CharacterBase[_0x270971(0xa1)]['pattern'],Game_CharacterBase['prototype'][_0x270971(0x4dd)]=function(){const _0x1a98ca=_0x270971;if(this['isPosing']()){if(_0x1a98ca(0x377)==='oMAbM'){const _0xa9096c=_0x3f3433[_0x1a98ca(0x5c0)](this);_0xa9096c&&_0xa9096c[_0x1a98ca(0x1da)]&&_0xa9096c[_0x1a98ca(0x1da)]['_filename']!==this[_0x1a98ca(0x1c4)]()&&(_0xa9096c[_0x1a98ca(0x1da)][_0x1a98ca(0x4e8)]=this[_0x1a98ca(0x1c4)](),_0xa9096c['_shadowSprite'][_0x1a98ca(0x4ce)]=_0x541cf3[_0x1a98ca(0x471)](_0xa9096c[_0x1a98ca(0x1da)]['_filename']));}else return this[_0x1a98ca(0x498)]();}else return VisuMZ['EventsMoveCore'][_0x1a98ca(0x436)]['call'](this);},VisuMZ[_0x270971(0x543)][_0x270971(0x52e)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x608)],Game_CharacterBase['prototype'][_0x270971(0x608)]=function(){const _0xc628ef=_0x270971;VisuMZ[_0xc628ef(0x543)][_0xc628ef(0x52e)][_0xc628ef(0x437)](this),this[_0xc628ef(0x3d0)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x48f)]=Game_CharacterBase['prototype'][_0x270971(0xf2)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0xf2)]=function(){const _0x2ea44a=_0x270971;if(this[_0x2ea44a(0x602)]())return this['characterIndexVS8']();return VisuMZ[_0x2ea44a(0x543)][_0x2ea44a(0x48f)][_0x2ea44a(0x437)](this);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x26e)]=function(){const _0x767e25=_0x270971,_0x54ab8f=this['direction']();if(this[_0x767e25(0x1b7)]()){if(_0x767e25(0x46a)!==_0x767e25(0x1e7)){if([0x2,0x4,0x6,0x8][_0x767e25(0x3fc)](_0x54ab8f))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x54ab8f))return 0x5;}else return this[_0x767e25(0x529)]();}else{if(this[_0x767e25(0x2a0)]())return 0x6;else{if(this[_0x767e25(0x5b0)]())return this[_0x767e25(0x552)]();else{if(this[_0x767e25(0x38a)]){if('yRmzA'!=='ElTqY'){if([0x2,0x4,0x6,0x8]['includes'](_0x54ab8f))return 0x4;if([0x1,0x3,0x7,0x9][_0x767e25(0x3fc)](_0x54ab8f))return 0x5;}else{_0x172759[_0x767e25(0x317)](_0x1b6787,_0x300329);const _0x68ff32=_0x48f660[_0x767e25(0x2f8)],_0x5ac5a0=_0xaa83d9[_0x767e25(0x259)];_0x146c28[_0x767e25(0x106)](_0x68ff32,_0x5ac5a0);}}else{if(this[_0x767e25(0x5b4)]()&&this[_0x767e25(0x20e)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x54ab8f))return 0x4;if([0x1,0x3,0x7,0x9][_0x767e25(0x3fc)](_0x54ab8f))return 0x5;}else{if(this[_0x767e25(0x510)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x54ab8f))return 0x2;if([0x1,0x3,0x7,0x9][_0x767e25(0x3fc)](_0x54ab8f))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x54ab8f))return 0x0;if([0x1,0x3,0x7,0x9][_0x767e25(0x3fc)](_0x54ab8f))return 0x1;}}}}}}},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x20e)]=function(){const _0x3a5e9c=_0x270971;return VisuMZ[_0x3a5e9c(0x543)][_0x3a5e9c(0x412)][_0x3a5e9c(0x2a2)]['CarryPose'];},Game_CharacterBase['prototype'][_0x270971(0x3a7)]=function(){const _0x3ba934=_0x270971;return this[_0x3ba934(0x2a0)]()&&this['terrainTag']()===VisuMZ['EventsMoveCore'][_0x3ba934(0x412)][_0x3ba934(0x43d)][_0x3ba934(0x5ed)];},Game_CharacterBase['prototype'][_0x270971(0x286)]=function(){const _0x5c781a=_0x270971;if(this['isOnRope']()){if(_0x5c781a(0xd5)===_0x5c781a(0xd5))return 0x4;else _0x26673d[_0x5c781a(0x543)][_0x5c781a(0x3c6)][_0x5c781a(0x437)](this),this[_0x5c781a(0x3e2)]();}else return 0x2;},VisuMZ[_0x270971(0x543)][_0x270971(0x5f4)]=Game_CharacterBase['prototype']['update'],Game_CharacterBase['prototype'][_0x270971(0x424)]=function(){const _0x579953=_0x270971;this['updateScaleBase'](),VisuMZ[_0x579953(0x543)][_0x579953(0x5f4)]['call'](this),this[_0x579953(0x1cb)]();},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x31e)]=function(){const _0x5ee61d=_0x270971;this[_0x5ee61d(0x45b)]=this['_scaleBaseX']??0x1,this[_0x5ee61d(0x26d)]=this['_scaleBaseY']??0x1;},VisuMZ[_0x270971(0x543)]['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x2d9)],Game_CharacterBase['prototype'][_0x270971(0x2d9)]=function(){const _0x242b9c=_0x270971;let _0x2a90ef=VisuMZ[_0x242b9c(0x543)][_0x242b9c(0x3ba)][_0x242b9c(0x437)](this);if(this['_scaleY']!==undefined){if(_0x242b9c(0x450)===_0x242b9c(0x450))_0x2a90ef/=Math[_0x242b9c(0x60f)](this[_0x242b9c(0x26d)],0.00001);else{if(_0x30f60f[_0x242b9c(0x447)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0xa49480['match'](/(?:AVOID|EVADE|DODGE)/i)?![]:![];}}return Math[_0x242b9c(0x257)](_0x2a90ef);},Game_CharacterBase[_0x270971(0xa1)]['updatePose']=function(){const _0x3edce7=_0x270971;this[_0x3edce7(0x5a7)]=this[_0x3edce7(0x5a7)]||0x0;if(this[_0x3edce7(0x5a7)]>0x0){if('NzCMo'!==_0x3edce7(0x360)){const _0x1d6cd6=[_0x36dc99[_0x3edce7(0x61a)],_0x3c033e[_0x3edce7(0x8a)],_0x3edce7(0x281)[_0x3edce7(0x27e)](_0x118d10)];_0x1df09e[_0x3edce7(0x5d7)](_0x1d6cd6,_0x369350);}else{this['_poseDuration']--;if(this[_0x3edce7(0x5a7)]<=0x0&&this[_0x3edce7(0x297)]!=='ZZZ')this[_0x3edce7(0x3d0)]();}}},VisuMZ[_0x270971(0x543)][_0x270971(0x2b5)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x21d)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x21d)]=function(_0x3a9846,_0x1846ae){const _0x5db8ca=_0x270971;VisuMZ['EventsMoveCore'][_0x5db8ca(0x2b5)]['call'](this,_0x3a9846,_0x1846ae);if(this['isSpriteVS8dir']())this[_0x5db8ca(0x355)](_0x3a9846,_0x1846ae);},Game_CharacterBase['prototype']['setDiagonalDirection']=function(_0x185e9c,_0x274172){const _0x35d05f=_0x270971;if(_0x185e9c===0x4&&_0x274172===0x2)this[_0x35d05f(0x12a)](0x1);if(_0x185e9c===0x6&&_0x274172===0x2)this[_0x35d05f(0x12a)](0x3);if(_0x185e9c===0x4&&_0x274172===0x8)this[_0x35d05f(0x12a)](0x7);if(_0x185e9c===0x6&&_0x274172===0x8)this[_0x35d05f(0x12a)](0x9);},VisuMZ[_0x270971(0x543)][_0x270971(0x300)]=Game_CharacterBase['prototype']['hasStepAnime'],Game_CharacterBase[_0x270971(0xa1)]['hasStepAnime']=function(){const _0x43077d=_0x270971;if(this[_0x43077d(0x5b0)]()&&this[_0x43077d(0x2cd)]()===_0x43077d(0x289))return!![];return VisuMZ['EventsMoveCore'][_0x43077d(0x300)][_0x43077d(0x437)](this);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x144)]=function(_0x456b5f,_0x1945c5){const _0x390651=_0x270971;if(_0x456b5f['match'](/Z/i))_0x456b5f=_0x390651(0x289);if(_0x456b5f[_0x390651(0x447)](/SLEEP/i))_0x456b5f=_0x390651(0x289);this[_0x390651(0x602)]()&&(this[_0x390651(0x297)]=_0x456b5f[_0x390651(0x363)]()[_0x390651(0x1c1)](),this['_poseDuration']=_0x1945c5||Infinity);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x2cd)]=function(){const _0x1953d7=_0x270971;if(this[_0x1953d7(0x602)]())return(this['_pose']||'')[_0x1953d7(0x363)]()[_0x1953d7(0x1c1)]();else{if(_0x1953d7(0x33c)!==_0x1953d7(0x33c))this['_moveSynch'][_0x1953d7(0x473)]=_0x5e87ea(_0x5dce7b['$1'])[_0x1953d7(0x261)]()[_0x1953d7(0x1c1)]();else return''['toUpperCase']()[_0x1953d7(0x1c1)]();}},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x28e)]=function(_0x2891d4,_0x554970){const _0x346663=_0x270971;if(this[_0x346663(0x602)]()){const _0xff7f01=['',_0x346663(0x243),_0x346663(0x13b),'MUSIC\x20NOTE',_0x346663(0x4e0),_0x346663(0x343),_0x346663(0x400),'COBWEB',_0x346663(0x47f),_0x346663(0x15c),_0x346663(0x289),'','','','',''][_0x2891d4];this[_0x346663(0x144)](_0xff7f01,_0x554970);}},Game_CharacterBase['prototype']['clearPose']=function(){const _0x5d864f=_0x270971;this[_0x5d864f(0x297)]='',this[_0x5d864f(0x5a7)]=0x0;},Game_CharacterBase[_0x270971(0xa1)]['isPosing']=function(){const _0x5ab16=_0x270971;return this[_0x5ab16(0x602)]()&&!!this[_0x5ab16(0x297)];},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x552)]=function(){const _0x13eb90=_0x270971,_0x5ccea3=this[_0x13eb90(0x297)][_0x13eb90(0x363)]();switch(this['_pose'][_0x13eb90(0x363)]()[_0x13eb90(0x1c1)]()){case _0x13eb90(0xfd):case _0x13eb90(0x36e):case'VICTORY':case'HURT':case _0x13eb90(0x397):case _0x13eb90(0x277):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x350)]=function(){const _0x4b2280=_0x270971;switch(this[_0x4b2280(0x297)][_0x4b2280(0x363)]()){case _0x4b2280(0x243):case _0x4b2280(0x13b):case _0x4b2280(0x359):case'!':case'?':return 0x2;break;case _0x4b2280(0x4e0):case _0x4b2280(0x343):case _0x4b2280(0x400):return 0x4;break;case _0x4b2280(0xfd):case _0x4b2280(0x36e):case _0x4b2280(0x380):case _0x4b2280(0x2ca):case _0x4b2280(0x47f):case _0x4b2280(0x15c):return 0x6;break;case _0x4b2280(0x20f):case'KNEEL':case _0x4b2280(0x277):case _0x4b2280(0x289):case _0x4b2280(0x463):return 0x8;break;default:return VisuMZ[_0x4b2280(0x543)][_0x4b2280(0x2f2)]['call'](this);break;}},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x498)]=function(){const _0x31bfdb=_0x270971;switch(this[_0x31bfdb(0x297)][_0x31bfdb(0x363)]()){case'ITEM':case _0x31bfdb(0x20f):case'EXCLAMATION':case'!':case _0x31bfdb(0x4e0):case _0x31bfdb(0x2ca):return 0x0;break;case _0x31bfdb(0x36e):case _0x31bfdb(0x397):case'QUESTION':case'?':case'ANGER':case'SILENCE':return 0x1;break;case _0x31bfdb(0x380):case _0x31bfdb(0x277):case _0x31bfdb(0x359):case'SWEAT':case _0x31bfdb(0x15c):return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x31bfdb(0x436)][_0x31bfdb(0x437)](this);break;}},Game_CharacterBase[_0x270971(0xa1)]['forceCarrying']=function(){this['_forceCarrying']=!![];},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x417)]=function(){const _0x3b05a9=_0x270971;this[_0x3b05a9(0x38a)]=![];},Game_CharacterBase[_0x270971(0xa1)]['forceDashing']=function(){const _0x75f23d=_0x270971;this[_0x75f23d(0x312)]=!![];},Game_CharacterBase[_0x270971(0xa1)]['clearDashing']=function(){const _0x55f3a1=_0x270971;this[_0x55f3a1(0x312)]=![];},Game_CharacterBase['prototype']['isShadowVisible']=function(){const _0x3773c8=_0x270971;if(this[_0x3773c8(0xaf)]())return![];if(this[_0x3773c8(0x13d)])return![];if(this[_0x3773c8(0x176)]==='')return![];if(this['constructor']===Game_Vehicle)return![];if(this[_0x3773c8(0x5b2)]())return![];return!![];},Game_CharacterBase[_0x270971(0xa1)]['isShadowShrink']=function(){const _0x4cb8d2=_0x270971;if(this[_0x4cb8d2(0x2a0)]())return!![];if(this[_0x4cb8d2(0x2a8)]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x1c4)]=function(){const _0x690c29=_0x270971;return VisuMZ[_0x690c29(0x543)][_0x690c29(0x412)][_0x690c29(0x42b)][_0x690c29(0x5b5)];},Game_CharacterBase[_0x270971(0xa1)]['shadowX']=function(){const _0x4c31f1=_0x270971;return this[_0x4c31f1(0x1de)]();},Game_CharacterBase[_0x270971(0xa1)]['shadowY']=function(){const _0x5b0b79=_0x270971,_0x4cf962=$gameMap[_0x5b0b79(0x1d7)]();return Math[_0x5b0b79(0x257)](this['scrolledY']()*_0x4cf962+_0x4cf962);},Game_CharacterBase[_0x270971(0x203)]=0x64,Game_CharacterBase['prototype'][_0x270971(0x171)]=function(_0x3c3461,_0x125b89){const _0x277483=_0x270971;if(TouchInput[_0x277483(0x28a)]())return![];if(!$gameMap['isSupportDiagonalMovement']())return![];if($gameMap[_0x277483(0x5e5)](_0x3c3461,_0x125b89)['length']>0x0)return![];if(!$gameMap[_0x277483(0x309)](_0x3c3461,_0x125b89))return![];const _0x1e5184=$gameMap[_0x277483(0x5ab)][_0x277483(0x531)];if(_0x1e5184>=Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT'])return![];return!![];},Game_Character[_0x270971(0xa1)][_0x270971(0x4c7)]=function(_0x2d9d01,_0x8e4d2d){const _0x336a34=_0x270971;let _0xfae1fc=this[_0x336a34(0x221)](_0x2d9d01,_0x8e4d2d);if(!this[_0x336a34(0x171)](_0x2d9d01,_0x8e4d2d))return _0xfae1fc;if(this['isCollidedWithEvents'](_0x2d9d01,_0x8e4d2d))return _0xfae1fc;const _0x1fb054=_0xfae1fc;if(_0xfae1fc===0x2){if(_0x2d9d01>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0xfae1fc=0x3;if(_0x2d9d01<this['x']&&this[_0x336a34(0x45a)](this['x'],this['y'],0x4))_0xfae1fc=0x1;}else{if(_0xfae1fc===0x4){if(_0x336a34(0x123)===_0x336a34(0x20d)){const _0x48ee58=_0x455da7?_0x1de08a[_0x336a34(0x4dc)]():0x0,_0x53eee7=[0x0,0x0,_0x336a34(0xc4)[_0x336a34(0x27e)](_0x48ee58,_0x3c430d)];return _0x5c596a[_0x336a34(0x481)](_0x53eee7)||0x0;}else{if(_0x8e4d2d>this['y']&&this[_0x336a34(0x45a)](this['x'],this['y'],0x4))_0xfae1fc=0x1;if(_0x8e4d2d<this['y']&&this[_0x336a34(0x45a)](this['x'],this['y'],0x6))_0xfae1fc=0x7;}}else{if(_0xfae1fc===0x6){if(_0x8e4d2d>this['y']&&this[_0x336a34(0x45a)](this['x'],this['y'],0x4))_0xfae1fc=0x3;if(_0x8e4d2d<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0xfae1fc=0x9;}else{if(_0xfae1fc===0x8){if(_0x336a34(0x2d6)!==_0x336a34(0x29c)){if(_0x2d9d01>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0xfae1fc=0x9;if(_0x2d9d01<this['x']&&this['canPass'](this['x'],this['y'],0x4))_0xfae1fc=0x7;}else{if(this[_0x336a34(0x415)]===_0x45d09f)this[_0x336a34(0x1f8)]();const _0x25cb83=_0x336a34(0x56a)[_0x336a34(0x27e)](_0x3eba36,_0x22d141);delete this[_0x336a34(0x415)][_0x25cb83];}}}}}if(!this[_0x336a34(0x45a)](this['x'],this['y'],_0xfae1fc))return _0x1fb054;const _0x166e4a=$gameMap[_0x336a34(0x62c)](this['x'],_0xfae1fc),_0x309168=$gameMap['roundYWithDirection'](this['y'],_0xfae1fc);if(this[_0x336a34(0x209)](_0x166e4a,_0x309168))_0xfae1fc=_0x1fb054;return _0xfae1fc;},VisuMZ['EventsMoveCore'][_0x270971(0x37e)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x45a)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x45a)]=function(_0xa21281,_0x29c493,_0x14c041){const _0x12f71c=_0x270971;if(this[_0x12f71c(0x426)]===_0x12f71c(0x41e)){if(_0x12f71c(0x18a)!==_0x12f71c(0x18a)){let _0x5c0bb4=this['getAttachPictureBitmapWidth']()||0x1,_0x42b1c5=this[_0x12f71c(0x39a)]()||0x1;const _0x4710a9=_0x6636c2['max'](0x1,_0x5c0bb4,_0x42b1c5);_0x36207d=_0x2b4ed5/_0x4710a9;}else return this[_0x12f71c(0x54c)]()[_0x12f71c(0x33e)](_0xa21281,_0x29c493,_0x14c041);}else return VisuMZ['EventsMoveCore'][_0x12f71c(0x37e)][_0x12f71c(0x437)](this,_0xa21281,_0x29c493,_0x14c041);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0xfa)]=function(){const _0x5ee64a=_0x270971;this[_0x5ee64a(0x4b3)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x270971(0x543)][_0x270971(0x46c)]=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x1de)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x1de)]=function(){const _0x2d0705=_0x270971;return VisuMZ[_0x2d0705(0x543)][_0x2d0705(0x46c)]['call'](this)+(this[_0x2d0705(0x4b3)]||0x0);},VisuMZ[_0x270971(0x543)][_0x270971(0x37b)]=Game_CharacterBase['prototype']['screenY'],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x336)]=function(){const _0x5a81fa=_0x270971;return VisuMZ['EventsMoveCore'][_0x5a81fa(0x37b)][_0x5a81fa(0x437)](this)+(this[_0x5a81fa(0x2cb)]||0x0);},Game_CharacterBase['DEFAULT_SHIFT_Y']=VisuMZ['EventsMoveCore'][_0x270971(0x412)][_0x270971(0x42b)][_0x270971(0x332)]??-0x6,Game_CharacterBase[_0x270971(0xa1)]['shiftY']=function(){const _0x42b8b4=_0x270971;let _0x52250e=this[_0x42b8b4(0x532)]()?0x0:-Game_CharacterBase[_0x42b8b4(0x612)];if(this[_0x42b8b4(0x26d)]){if(_0x42b8b4(0x3d1)==='VLpDO'){_0xcbcc37['EventsMoveCore'][_0x42b8b4(0x31a)]['call'](this);if(this['_paused']===_0x24c1c2)this[_0x42b8b4(0x1f8)]();this['_paused']=![];}else _0x52250e*=this[_0x42b8b4(0x26d)];}return Math[_0x42b8b4(0x594)](_0x52250e);},Game_CharacterBase['prototype'][_0x270971(0x251)]=function(){const _0x4014aa=_0x270971;this[_0x4014aa(0x177)]='';},VisuMZ['EventsMoveCore']['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x3e9)],Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x3e9)]=function(){const _0x5f56b1=_0x270971;if(this[_0x5f56b1(0x36f)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x5f56b1(0x543)]['Game_CharacterBase_updatePattern']['call'](this);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x455)]=function(){const _0x259fca=_0x270971;if(!this[_0x259fca(0x241)]()&&this['_stopCount']>0x0)return![];switch(String(this[_0x259fca(0x177)])[_0x259fca(0x363)]()[_0x259fca(0x1c1)]()){case _0x259fca(0x4b5):this[_0x259fca(0x42f)]+=0x1;if(this[_0x259fca(0x42f)]>0x2)this[_0x259fca(0x223)](0x0);break;case _0x259fca(0x36c):this['_pattern']-=0x1;if(this[_0x259fca(0x42f)]<0x0)this[_0x259fca(0x223)](0x2);break;case'SPIN\x20CLOCKWISE':case _0x259fca(0x44a):this['turnRight90']();break;case _0x259fca(0x22c):case _0x259fca(0x4f2):case _0x259fca(0x607):case _0x259fca(0xbc):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x270971(0xa1)]['getEventIconData']=function(){const _0x402f9c=_0x270971;return $gameSystem[_0x402f9c(0x28f)](this);},Game_CharacterBase[_0x270971(0xa1)]['hasEventIcon']=function(){const _0x5596bc=_0x270971,_0x59eb39=this[_0x5596bc(0x28f)]();if(!_0x59eb39)return![];return _0x59eb39[_0x5596bc(0x636)]>0x0;},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x50f)]=function(){const _0x508937=_0x270971,_0x16528e=this[_0x508937(0x3b9)]();return $gameMap[_0x508937(0x62c)](this['x'],_0x16528e);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x232)]=function(){const _0x54af20=_0x270971,_0x26ec2c=this['direction']();return $gameMap[_0x54af20(0x150)](this['y'],_0x26ec2c);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x51b)]=function(){const _0x9a0159=_0x270971,_0x21df03=this[_0x9a0159(0x2ff)](this[_0x9a0159(0x3b9)]());return $gameMap['roundXWithDirection'](this['x'],_0x21df03);},Game_CharacterBase[_0x270971(0xa1)]['backY']=function(){const _0x14c7c9=_0x270971,_0x1ebde9=this[_0x14c7c9(0x2ff)](this['direction']());return $gameMap[_0x14c7c9(0x150)](this['y'],_0x1ebde9);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x5cd)]=function(){const _0x5c630a=_0x270971,_0x3a531a=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x5c630a(0x3b9)]()];return $gameMap[_0x5c630a(0x62c)](this['x'],_0x3a531a);},Game_CharacterBase[_0x270971(0xa1)]['ccwY']=function(){const _0x45bfcf=_0x270971,_0x1311bf=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x45bfcf(0x3b9)]()];return $gameMap['roundYWithDirection'](this['y'],_0x1311bf);},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x609)]=function(){const _0x4a3ad0=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap['roundXWithDirection'](this['x'],_0x4a3ad0);},Game_CharacterBase[_0x270971(0xa1)]['cwY']=function(){const _0x1d611e=_0x270971,_0x13d5fd=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x1d611e(0x3b9)]()];return $gameMap['roundYWithDirection'](this['y'],_0x13d5fd);},VisuMZ[_0x270971(0x543)]['Game_Character_setMoveRoute']=Game_Character['prototype'][_0x270971(0x133)],Game_Character[_0x270971(0xa1)]['setMoveRoute']=function(_0x3db730){const _0x3fa8ec=_0x270971;route=JsonEx[_0x3fa8ec(0x4ea)](_0x3db730),VisuMZ[_0x3fa8ec(0x543)][_0x3fa8ec(0x5e7)]['call'](this,route);},VisuMZ[_0x270971(0x543)][_0x270971(0x451)]=Game_Character[_0x270971(0xa1)][_0x270971(0x411)],Game_Character[_0x270971(0xa1)][_0x270971(0x411)]=function(_0x6b87be){const _0x5a725e=_0x270971;route=JsonEx['makeDeepCopy'](_0x6b87be),VisuMZ[_0x5a725e(0x543)][_0x5a725e(0x451)][_0x5a725e(0x437)](this,route);},VisuMZ[_0x270971(0x543)][_0x270971(0x45c)]=Game_Character[_0x270971(0xa1)][_0x270971(0xc7)],Game_Character['prototype'][_0x270971(0xc7)]=function(_0x1fea97){const _0x36cafb=_0x270971,_0x704ed0=Game_Character,_0x47778b=_0x1fea97['parameters'];if(_0x1fea97[_0x36cafb(0x8e)]===_0x704ed0['ROUTE_SCRIPT']){let _0x3ef6de=_0x1fea97[_0x36cafb(0x16b)][0x0];_0x3ef6de=this[_0x36cafb(0x492)](_0x3ef6de),_0x3ef6de=this['convertSelfVariableValuesInScriptCall'](_0x3ef6de),this[_0x36cafb(0x4d3)](_0x1fea97,_0x3ef6de);}else{if(_0x36cafb(0xd2)==='zZXCP')VisuMZ[_0x36cafb(0x543)]['Game_Character_processMoveCommand'][_0x36cafb(0x437)](this,_0x1fea97);else{_0x70c06d=_0x4bdf52||0x0;const _0x2217e3={'code':0x1,'indent':null,'parameters':[]};_0x2217e3['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x364dc5],this[_0x36cafb(0x2fd)][_0x36cafb(0x157)][this[_0x36cafb(0x572)]][_0x36cafb(0x16b)][0x0]='';while(_0x25ad67--){this['_moveRoute'][_0x36cafb(0x157)][_0x36cafb(0x23a)](this[_0x36cafb(0x572)]+0x1,0x0,_0x2217e3);}}}},Game_Character[_0x270971(0xa1)]['convertVariableValuesInScriptCall']=function(_0x276657){const _0x23bbed=_0x270971,_0x336113=/\$gameVariables\.value\((\d+)\)/gi,_0x3c4dfd=/\\V\[(\d+)\]/gi;while(_0x276657[_0x23bbed(0x447)](_0x336113)){_0x276657=_0x276657[_0x23bbed(0x17a)](_0x336113,(_0x5e61fb,_0x7c308)=>$gameVariables[_0x23bbed(0x481)](parseInt(_0x7c308)));}while(_0x276657['match'](_0x3c4dfd)){_0x276657=_0x276657['replace'](_0x3c4dfd,(_0x525da0,_0x4544f8)=>$gameVariables[_0x23bbed(0x481)](parseInt(_0x4544f8)));}return _0x276657;},Game_Character['prototype'][_0x270971(0x526)]=function(_0xcdc914){const _0xc3cee5=_0x270971,_0x5d9fad=/\\SELFVAR\[(\d+)\]/gi;while(_0xcdc914[_0xc3cee5(0x447)](_0x5d9fad)){_0xcdc914=_0xcdc914['replace'](_0x5d9fad,(_0xf2235,_0x595a6d)=>getSelfVariableValue(this[_0xc3cee5(0x61a)],this['_eventId'],parseInt(_0x595a6d)));}return _0xcdc914;},Game_Character['prototype'][_0x270971(0x4d3)]=function(_0x27f41d,_0x3456fa){const _0x533b87=_0x270971;if(_0x3456fa[_0x533b87(0x447)](/ANIMATION:[ ](\d+)/i))return this['processMoveRouteAnimation'](Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/BALLOON:[ ](.*)/i))return this[_0x533b87(0x395)](String(RegExp['$1']));if(_0x3456fa['match'](/FADE IN:[ ](\d+)/i)){if('TJQwL'!==_0x533b87(0x4ad)){if(!_0xf588c0[_0x533b87(0x3e0)])return;if(!_0x3a7136['_scene']['_spriteset'])return;const _0x1134de=_0x22ce63[_0x533b87(0x3e0)][_0x533b87(0x402)]['findTargetSprite'](this['_event']);if(!_0x1134de)return;this['x']=this[_0x533b87(0x4ac)][_0x533b87(0x1de)](),this['x']+=this[_0x533b87(0x4ac)]['_labelWindow'][_0x533b87(0x2f6)],this['y']=this['_event'][_0x533b87(0x336)]()-_0x1134de[_0x533b87(0x3b6)]*_0x1134de[_0x533b87(0x269)]['y'],this['y']+=_0x25c4f2[_0x533b87(0x5c8)]()*-0.5,this['y']+=this[_0x533b87(0x4ac)][_0x533b87(0x240)][_0x533b87(0x515)];}else return this[_0x533b87(0x52f)](Number(RegExp['$1']));}if(_0x3456fa['match'](/FADE OUT:[ ](\d+)/i))return this[_0x533b87(0x4c3)](Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x533b87(0x388)===_0x533b87(0xb3))_0x4d920b[_0x533b87(0x180)](),_0x959c17[_0x533b87(0x543)]['Window_ScrollText_startMessage'][_0x533b87(0x437)](this),_0x154823['clearSelfTarget']();else return this['forceCarrying']();}if(_0x3456fa[_0x533b87(0x447)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x533b87(0x417)]();if(_0x3456fa[_0x533b87(0x447)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x533b87(0x13f)]();if(_0x3456fa[_0x533b87(0x447)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x533b87(0x556)]();if(_0x3456fa[_0x533b87(0x447)](/HUG:[ ]LEFT/i))return this[_0x533b87(0x44d)]('left');if(_0x3456fa[_0x533b87(0x447)](/HUG:[ ]RIGHT/i))return this[_0x533b87(0x44d)]('right');if(_0x3456fa['match'](/INDEX:[ ](\d+)/i)){if(_0x533b87(0x440)!==_0x533b87(0x440))this[_0x533b87(0x376)][_0x533b87(0x27c)][_0x533b87(0x602)]()&&(this['x']+=_0x1440ff[_0x533b87(0x543)]['Settings'][_0x533b87(0x2a2)]['BalloonOffsetX'],this['y']+=_0x2b7a44[_0x533b87(0x543)]['Settings'][_0x533b87(0x2a2)][_0x533b87(0x41c)]);else return this[_0x533b87(0x2c7)](Number(RegExp['$1']));}if(_0x3456fa[_0x533b87(0x447)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x533b87(0x1bf)===_0x533b87(0x1bf)){const _0xa549e9=this[_0x533b87(0x15a)]+Number(RegExp['$1']);return this[_0x533b87(0x2c7)](_0xa549e9);}else{if(this[_0x533b87(0xaf)]())return![];if(this[_0x533b87(0x13d)])return![];if(this[_0x533b87(0x176)]==='')return![];if(this[_0x533b87(0x2a8)]===_0x41fa62)return![];if(this[_0x533b87(0x5b2)]())return![];return!![];}}if(_0x3456fa['match'](/JUMP FORWARD:[ ](\d+)/i))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x533b87(0x284)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x3456fa['match'](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x533b87(0x19a)!==_0x533b87(0x507)){const _0x198854=$gameMap[_0x533b87(0x22b)](Number(RegExp['$1']));return this[_0x533b87(0x302)](_0x198854);}else return this[_0x533b87(0x441)](_0x1fa2a9);}if(_0x3456fa[_0x533b87(0x447)](/JUMP TO PLAYER/i)){if('dURKn'!==_0x533b87(0x9b))return this[_0x533b87(0x302)]($gamePlayer);else{if(_0x4b4cda[_0x533b87(0x194)]())return![];return _0x2fd589[_0x533b87(0x32e)][_0x533b87(0x3fc)](_0x1b3012);}}if(_0x3456fa[_0x533b87(0x447)](/JUMP TO HOME/i)&&this[_0x533b87(0x2c4)]){if(_0x533b87(0x13c)!==_0x533b87(0x370)){const _0x12d61e=this[_0x533b87(0x2b4)],_0x42fb1d=this[_0x533b87(0x5ac)];return this[_0x533b87(0x284)](_0x12d61e,_0x42fb1d);}else{if(this[_0x533b87(0x162)])this[_0x533b87(0x162)]['removeChild'](this);this[_0x533b87(0xb4)][_0x533b87(0x4ce)]&&this['_textSprite'][_0x533b87(0x4ce)]['destroy']();}}if(_0x3456fa[_0x533b87(0x447)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x3cdeaf=String(RegExp['$1']),_0x15d6d8=this[_0x533b87(0x374)](_0x3456fa);return this['processMoveRouteMoveUntilStop'](_0x3cdeaf,_0x15d6d8);}if(_0x3456fa[_0x533b87(0x447)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x3fb103=Number(RegExp['$1']),_0x206bde=Number(RegExp['$2']),_0x1569d7=this[_0x533b87(0x374)](_0x3456fa);return this['processMoveRouteMoveTo'](_0x3fb103,_0x206bde,_0x1569d7);}if(_0x3456fa[_0x533b87(0x447)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x1717a2=$gameMap[_0x533b87(0x22b)](Number(RegExp['$1'])),_0x3cb314=this[_0x533b87(0x374)](_0x3456fa);return this[_0x533b87(0x604)](_0x1717a2,_0x3cb314);}if(_0x3456fa['match'](/MOVE TO PLAYER/i)){const _0xc2bd6c=this[_0x533b87(0x374)](_0x3456fa);return this[_0x533b87(0x604)]($gamePlayer,_0xc2bd6c);}if(_0x3456fa[_0x533b87(0x447)](/MOVE TO HOME/i)&&this[_0x533b87(0x2c4)]){if(_0x533b87(0x2e7)===_0x533b87(0x2e7)){const _0x57da5c=this[_0x533b87(0x2b4)],_0x1cf7d9=this[_0x533b87(0x5ac)],_0xc3a9c8=this[_0x533b87(0x374)](_0x3456fa);return this[_0x533b87(0x56b)](_0x57da5c,_0x1cf7d9,_0xc3a9c8);}else _0x3ed8d4[_0x533b87(0x3c9)](this);}if(_0x3456fa[_0x533b87(0x447)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x533b87(0x258)](0x1,Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/MOVE DOWN:[ ](\d+)/i))return this[_0x533b87(0x258)](0x2,Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0x533b87(0x2e0)!==_0x533b87(0x601))return this[_0x533b87(0x258)](0x3,Number(RegExp['$1']));else{const _0x35f0c0=_0x23bb0f?this[_0x533b87(0x224)]:this[_0x533b87(0x4c4)];return _0x35f0c0?_0x35f0c0[_0x533b87(0x41b)]:0x0;}}if(_0x3456fa[_0x533b87(0x447)](/MOVE LEFT:[ ](\d+)/i)){if('dVCTn'===_0x533b87(0xcf))return this[_0x533b87(0x258)](0x4,Number(RegExp['$1']));else this[_0x533b87(0x4cf)][_0x533b87(0x242)]=_0x5886f5(_0x522d06['$1']);}if(_0x3456fa['match'](/MOVE RIGHT:[ ](\d+)/i))return this[_0x533b87(0x258)](0x6,Number(RegExp['$1']));if(_0x3456fa['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x533b87(0x258)](0x7,Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/MOVE UP:[ ](\d+)/i)){if(_0x533b87(0x384)!==_0x533b87(0x29e))return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));else this['_eventCache']=_0x5b3203;}if(_0x3456fa[_0x533b87(0x447)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x533b87(0x258)](0x9,Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x533b87(0x5be)!=='vDhEc')this[_0x533b87(0x120)]=this['_frames']||0x0,this['_frames']+=_0xd2dfcd,this[_0x533b87(0x497)]=!![],this[_0x533b87(0x120)]=_0x27fe01[_0x533b87(0x60f)](0x1,this[_0x533b87(0x120)]);else{const _0x5ea146=Math[_0x533b87(0x594)](Number(RegExp['$1'])/0x64*0xff);return this[_0x533b87(0x1d9)](_0x5ea146[_0x533b87(0x17b)](0x0,0xff));}}if(_0x3456fa[_0x533b87(0x447)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if(_0x533b87(0x460)!=='eArVI'){const _0x43a55c=this['getDirectionToPoint'](_0x411c88,_0x1c7de2,!![]);if(_0x43a55c)this[_0x533b87(0x1bc)](_0x43a55c);}else{const _0x76f9c2=this['_opacity']+Math[_0x533b87(0x594)](Number(RegExp['$1'])/0x64*0xff);return this[_0x533b87(0x1d9)](_0x76f9c2['clamp'](0x0,0xff));}}if(_0x3456fa[_0x533b87(0x447)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x4da215=this[_0x533b87(0x576)]+Number(RegExp['$1']);return this[_0x533b87(0x1d9)](_0x4da215[_0x533b87(0x17b)](0x0,0xff));}if(_0x3456fa[_0x533b87(0x447)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x533b87(0x445)](Number(RegExp['$1']));if(_0x3456fa[_0x533b87(0x447)](/PATTERN UNLOCK/i))return this[_0x533b87(0x36f)]=![];if(_0x3456fa[_0x533b87(0x447)](/POSE:[ ](.*)/i)){if(_0x533b87(0x23f)===_0x533b87(0x23f)){const _0x360ab6=String(RegExp['$1'])[_0x533b87(0x363)]()[_0x533b87(0x1c1)]();return this[_0x533b87(0x144)](_0x360ab6);}else _0x1d52a8[_0x533b87(0x543)][_0x533b87(0x58c)][_0x533b87(0x437)](this),this[_0x533b87(0x4cc)](),this[_0x533b87(0x452)](),this[_0x533b87(0x29d)]();}if(_0x3456fa[_0x533b87(0x447)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x533b87(0x60b)===_0x533b87(0x60b)){const _0x57eedd=Number(RegExp['$1']),_0x57b155=Number(RegExp['$2']);return this[_0x533b87(0x10b)](_0x57eedd,_0x57b155);}else{const _0x538a19=this['direction']();return _0x39a5cb['roundXWithDirection'](this['x'],_0x538a19);}}if(_0x3456fa['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x807059=$gameMap['event'](Number(RegExp['$1']));return this[_0x533b87(0x469)](_0x807059);}if(_0x3456fa[_0x533b87(0x447)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToCharacter']($gamePlayer);if(_0x3456fa['match'](/STEP TOWARD HOME/i)&&this[_0x533b87(0x2c4)]){if(_0x533b87(0x1fb)==='rqFPD'){const _0x370039=this['_randomHomeX'],_0x5d741a=this[_0x533b87(0x5ac)];return this[_0x533b87(0x10b)](_0x370039,_0x5d741a);}else _0x47278d[_0x533b87(0x35b)](_0x4b2668['_selfTargetItemChoice']),_0x77e7ca[_0x533b87(0x543)][_0x533b87(0x197)]['call'](this),_0x160180[_0x533b87(0x152)](),_0x1f7c18[_0x533b87(0xad)]=_0xbf44fe;}if(_0x3456fa[_0x533b87(0x447)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('CthDs'===_0x533b87(0x4a1))return this['moveAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));else{this[_0x533b87(0x10b)](_0x470f22,_0x4585b3,_0xe7c561);if(this['x']!==_0x211d6a||this['y']!==_0x16971f)this[_0x533b87(0x572)]--;}}if(_0x3456fa[_0x533b87(0x447)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x2b98b1=$gameMap[_0x533b87(0x22b)](Number(RegExp['$1']));return this[_0x533b87(0x3b8)](_0x2b98b1);}if(_0x3456fa[_0x533b87(0x447)](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x3456fa[_0x533b87(0x447)](/STEP AWAY FROM HOME/i)&&this[_0x533b87(0x2c4)]){if(_0x533b87(0x62e)!=='RXPsH'){const _0x538e7b=this[_0x533b87(0x2b4)],_0x2da30c=this[_0x533b87(0x5ac)];return this[_0x533b87(0x60a)](_0x538e7b,_0x2da30c);}else{if(_0x19a3f4)for(const _0x3f965f of _0x2e8de4['events']()){_0x3f965f[_0x533b87(0xdb)](),_0x3f965f['updateEventLabelText']();}if(_0x399556[_0x533b87(0x15f)]()){const _0x54b458=_0x4d79c8[_0x533b87(0x3e0)]['_spriteset'];if(_0x54b458)_0x54b458['refreshEventLabels']();}}}if(_0x3456fa[_0x533b87(0x447)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x533b87(0x308)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x3456fa['match'](/TURN TO EVENT:[ ](\d+)/i)){if(_0x533b87(0x3f1)!==_0x533b87(0x462)){const _0xe546f2=$gameMap[_0x533b87(0x22b)](Number(RegExp['$1']));return this[_0x533b87(0x5c1)](_0xe546f2);}else{const _0x53e3df=this['_callEventData'],_0x184b5b=_0x5373e0[this[_0x533b87(0x35c)]],_0x3da0d9=_0x184b5b[_0x533b87(0x1b6)][_0x53e3df[_0x533b87(0x2c4)]];if(_0x3da0d9&&_0x3da0d9[_0x533b87(0x1ae)][_0x53e3df[_0x533b87(0x25d)]-0x1]){const _0x555616=_0x3da0d9[_0x533b87(0x1ae)][_0x53e3df['pageId']-0x1][_0x533b87(0x157)];this[_0x533b87(0x4ee)](_0x555616,this[_0x533b87(0x2c4)]());}_0x1677c7[this[_0x533b87(0x35c)]]=_0x423a56,this[_0x533b87(0x35c)]=_0xf12e4f,this[_0x533b87(0x246)]=_0x13ab7d;}}if(_0x3456fa[_0x533b87(0x447)](/TURN TO PLAYER/i)){if('nUEsR'===_0x533b87(0xd3))return this[_0x533b87(0x5c1)]($gamePlayer);else{const _0x21e983=this[_0x533b87(0x2b4)],_0x4c5a75=this[_0x533b87(0x5ac)];return this['turnTowardPoint'](_0x21e983,_0x4c5a75);}}if(_0x3456fa[_0x533b87(0x447)](/TURN TO HOME/i)&&this['eventId']){const _0x587d41=this[_0x533b87(0x2b4)],_0x442578=this[_0x533b87(0x5ac)];return this[_0x533b87(0x1f5)](_0x587d41,_0x442578);}if(_0x3456fa[_0x533b87(0x447)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x533b87(0x611)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x3456fa[_0x533b87(0x447)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x16907a=$gameMap['event'](Number(RegExp['$1']));return this[_0x533b87(0x3cb)](_0x16907a);}if(_0x3456fa['match'](/TURN AWAY FROM PLAYER/i))return this[_0x533b87(0x3cb)]($gamePlayer);if(_0x3456fa[_0x533b87(0x447)](/TURN AWAY FROM HOME/i)&&this['eventId']){const _0xd28217=this[_0x533b87(0x2b4)],_0x591c9e=this[_0x533b87(0x5ac)];return this[_0x533b87(0x611)](_0xd28217,_0x591c9e);}if(_0x3456fa[_0x533b87(0x447)](/TURN LOWER LEFT/i))return this[_0x533b87(0x12a)](0x1);if(_0x3456fa[_0x533b87(0x447)](/TURN LOWER RIGHT/i)){if(_0x533b87(0x333)===_0x533b87(0x187)){if(!this[_0x533b87(0x2be)](_0x5a2276,_0x2f8e0d))return;const _0x39246a=_0x56bbcf[_0x533b87(0x543)][_0x533b87(0x412)]['Template'];if(!_0x2bfb63)_0x39246a['PreMorphJS'][_0x533b87(0x437)](this,_0x4883c4,_0x41424f,this);this[_0x533b87(0x600)]={'mapId':_0x24808a,'eventId':_0x516819},this[_0x533b87(0x584)]=-0x2,this[_0x533b87(0xdb)]();if(!_0x46e43d)_0x39246a[_0x533b87(0x548)][_0x533b87(0x437)](this,_0x342cc6,_0xf7da81,this);_0x3a1a71[_0x533b87(0x50d)]();}else return this['setDirection'](0x3);}if(_0x3456fa[_0x533b87(0x447)](/TURN UPPER LEFT/i))return this[_0x533b87(0x12a)](0x7);if(_0x3456fa[_0x533b87(0x447)](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x3456fa['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x533b87(0x5b6)](RegExp['$1'],RegExp['$2']);if(_0x3456fa['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x533b87(0x4a4)](RegExp['$1'],RegExp['$2']);if(_0x3456fa['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x533b87(0x26a)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x3456fa[_0x533b87(0x447)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x533b87(0x39b)!==_0x533b87(0x39b)){const _0x4d6f32=_0x41eea4[_0x533b87(0x1d7)](),_0x2c8c48=_0x1ce710[_0x533b87(0x506)]['y'],_0x18a14c=_0x3596ed[_0x533b87(0x2bb)](_0x2c8c48);this['y']=_0x5434e9[_0x533b87(0x257)](_0x18a14c*_0x4d6f32+_0x4d6f32);}else{const _0x46cb45=$gameMap['event'](Number(RegExp['$1']));return this[_0x533b87(0x635)](_0x46cb45);}}if(_0x3456fa[_0x533b87(0x447)](/TELEPORT TO PLAYER/i))return this[_0x533b87(0x635)]($gamePlayer);if(_0x3456fa[_0x533b87(0x447)](/TELEPORT TO HOME/i)&&this['eventId']){if(_0x533b87(0x93)!==_0x533b87(0x93)){let _0x47031d=_0x3d02f5['parameters'][0x0];_0x47031d=this['convertVariableValuesInScriptCall'](_0x47031d),_0x47031d=this[_0x533b87(0x526)](_0x47031d),this[_0x533b87(0x4d3)](_0x15205a,_0x47031d);}else{const _0x20a7f7=this[_0x533b87(0x2b4)],_0x450df3=this[_0x533b87(0x5ac)];return this[_0x533b87(0x26a)](_0x20a7f7,_0x450df3);}}try{VisuMZ[_0x533b87(0x543)][_0x533b87(0x45c)][_0x533b87(0x437)](this,_0x27f41d);}catch(_0x3fa0b9){if($gameTemp[_0x533b87(0x4ed)]())console['log'](_0x3fa0b9);}},Game_Character[_0x270971(0xa1)][_0x270971(0x4e5)]=function(_0x4dca72){$gameTemp['requestAnimation']([this],_0x4dca72);},Game_Character[_0x270971(0xa1)][_0x270971(0x395)]=function(_0x40fbfd){const _0x3d23b1=_0x270971;let _0x178d3e=0x0;switch(_0x40fbfd[_0x3d23b1(0x363)]()[_0x3d23b1(0x1c1)]()){case'!':case _0x3d23b1(0x243):_0x178d3e=0x1;break;case'?':case _0x3d23b1(0x13b):_0x178d3e=0x2;break;case'MUSIC':case'NOTE':case _0x3d23b1(0x359):case _0x3d23b1(0x21f):case'MUSICNOTE':_0x178d3e=0x3;break;case _0x3d23b1(0x4e0):case _0x3d23b1(0xda):_0x178d3e=0x4;break;case _0x3d23b1(0x343):_0x178d3e=0x5;break;case _0x3d23b1(0x400):_0x178d3e=0x6;break;case _0x3d23b1(0x2ca):case'ANNOYED':case _0x3d23b1(0x59e):_0x178d3e=0x7;break;case _0x3d23b1(0x47f):case'...':_0x178d3e=0x8;break;case'LIGHT':case _0x3d23b1(0x24e):case _0x3d23b1(0x15c):case _0x3d23b1(0x51c):case _0x3d23b1(0x127):_0x178d3e=0x9;break;case'Z':case'ZZ':case _0x3d23b1(0x289):case _0x3d23b1(0x463):_0x178d3e=0xa;break;case _0x3d23b1(0x5df):_0x178d3e=0xb;break;case'USER-DEFINED\x202':_0x178d3e=0xc;break;case _0x3d23b1(0x56d):_0x178d3e=0xd;break;case _0x3d23b1(0x33f):_0x178d3e=0xe;break;case _0x3d23b1(0x637):_0x178d3e=0xf;break;}$gameTemp['requestBalloon'](this,_0x178d3e);},Game_Character[_0x270971(0xa1)][_0x270971(0x52f)]=function(_0x60b761){const _0x374827=_0x270971;_0x60b761+=this[_0x374827(0x576)],this[_0x374827(0x1d9)](_0x60b761['clamp'](0x0,0xff));if(this[_0x374827(0x576)]<0xff)this[_0x374827(0x572)]--;},Game_Character[_0x270971(0xa1)][_0x270971(0x4c3)]=function(_0x152926){const _0x361fc0=_0x270971;_0x152926=this[_0x361fc0(0x576)]-_0x152926,this[_0x361fc0(0x1d9)](_0x152926[_0x361fc0(0x17b)](0x0,0xff));if(this[_0x361fc0(0x576)]>0x0)this[_0x361fc0(0x572)]--;},Game_Character[_0x270971(0xa1)][_0x270971(0x44d)]=function(_0xf0610f){const _0x59ceb3=_0x270971,_0x988745=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x5c08ca=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x15faeb=this[_0x59ceb3(0x3b9)](),_0x2f763f=(_0xf0610f===_0x59ceb3(0xe8)?_0x988745:_0x5c08ca)[_0x15faeb],_0x29a231=(_0xf0610f===_0x59ceb3(0xe8)?_0x5c08ca:_0x988745)[_0x15faeb];if(this[_0x59ceb3(0x45a)](this['x'],this['y'],_0x2f763f))_0xf0610f===_0x59ceb3(0xe8)?this[_0x59ceb3(0x3c5)]():this[_0x59ceb3(0x38c)]();else{if(!this[_0x59ceb3(0x45a)](this['x'],this['y'],this[_0x59ceb3(0x3b9)]())){if(this[_0x59ceb3(0x45a)](this['x'],this['y'],_0x29a231)){if('kupeH'==='DEozg'){this[_0x59ceb3(0x5c7)]=![],this[_0x59ceb3(0x51a)]=![];if(!_0x3046de)return;const _0x3f830e=_0x26aeda['note']||'';if(_0x3f830e['match'](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this[_0x59ceb3(0x51a)]=!![];else _0x3f830e[_0x59ceb3(0x447)](/<SHOW FOLLOWERS>/i)&&(this[_0x59ceb3(0x5c7)]=!![],this[_0x59ceb3(0x51a)]=![]);}else{if(_0xf0610f===_0x59ceb3(0xe8)){if('UdSbk'===_0x59ceb3(0x4ae))return _0x5460e4[_0x59ceb3(0x543)][_0x59ceb3(0x412)][_0x59ceb3(0x33a)][_0x59ceb3(0x2d4)];else this[_0x59ceb3(0x38c)]();}else this[_0x59ceb3(0x3c5)]();}}else _0x59ceb3(0x92)!==_0x59ceb3(0x92)?(_0x3eb6be[_0x59ceb3(0x35b)](_0x1c219a[_0x59ceb3(0xad)]),_0x445f59['EventsMoveCore'][_0x59ceb3(0x55d)][_0x59ceb3(0x437)](this),_0x5164d7[_0x59ceb3(0x152)](),_0x4d5f77[_0x59ceb3(0xad)]=_0xab6b5b):this[_0x59ceb3(0x1cc)]();}}if(this[_0x59ceb3(0x45a)](this['x'],this['y'],this[_0x59ceb3(0x3b9)]())){if(_0x59ceb3(0x190)!==_0x59ceb3(0x10e))this[_0x59ceb3(0x53d)]();else{if(this['isSpriteVS8dir']())return this['characterIndexVS8']();return _0x1c36d9[_0x59ceb3(0x543)][_0x59ceb3(0x48f)][_0x59ceb3(0x437)](this);}}},Game_Character[_0x270971(0xa1)]['processMoveRouteSetIndex']=function(_0x1a8783){const _0x1a973c=_0x270971;if(ImageManager[_0x1a973c(0x1d2)](this[_0x1a973c(0x176)]))return;_0x1a8783=_0x1a8783[_0x1a973c(0x17b)](0x0,0x7),this[_0x1a973c(0xb0)](this[_0x1a973c(0x176)],_0x1a8783);},Game_Character[_0x270971(0xa1)]['processMoveRouteJumpForward']=function(_0x3c05f5){const _0x52780e=_0x270971;switch(this[_0x52780e(0x3b9)]()){case 0x1:this['jump'](-_0x3c05f5,_0x3c05f5);break;case 0x2:this[_0x52780e(0x546)](0x0,_0x3c05f5);break;case 0x3:this[_0x52780e(0x546)](_0x3c05f5,_0x3c05f5);break;case 0x4:this['jump'](-_0x3c05f5,0x0);break;case 0x6:this[_0x52780e(0x546)](_0x3c05f5,0x0);break;case 0x7:this[_0x52780e(0x546)](-_0x3c05f5,-_0x3c05f5);break;case 0x8:this[_0x52780e(0x546)](0x0,-_0x3c05f5);break;case 0x9:this['jump'](_0x3c05f5,-_0x3c05f5);break;}},Game_Character[_0x270971(0xa1)][_0x270971(0x284)]=function(_0x1d09ef,_0x4338bb){const _0x23b3d4=_0x270971,_0x3b7735=Math['round'](_0x1d09ef-this['x']),_0x14f9b3=Math['round'](_0x4338bb-this['y']);this[_0x23b3d4(0x546)](_0x3b7735,_0x14f9b3);},Game_Character[_0x270971(0xa1)]['processMoveRouteJumpToCharacter']=function(_0x189020){const _0x975803=_0x270971;if(_0x189020)this[_0x975803(0x284)](_0x189020['x'],_0x189020['y']);},Game_Character[_0x270971(0xa1)][_0x270971(0x10b)]=function(_0xa46d95,_0x3375db,_0x1c8ccf){const _0x19220d=_0x270971;let _0x31933a=0x0;if(_0x1c8ccf)$gameTemp['_moveAllowPlayerCollision']=!![];$gameMap['isSupportDiagonalMovement']()?_0x31933a=this[_0x19220d(0x4c7)](_0xa46d95,_0x3375db):_0x31933a=this[_0x19220d(0x221)](_0xa46d95,_0x3375db);if(_0x1c8ccf)$gameTemp[_0x19220d(0x47b)]=![];this[_0x19220d(0x1bc)](_0x31933a),this[_0x19220d(0x57b)](!![]);},Game_Character[_0x270971(0xa1)][_0x270971(0x469)]=function(_0x37b5dc){if(_0x37b5dc)this['processMoveRouteStepTo'](_0x37b5dc['x'],_0x37b5dc['y']);},Game_Character[_0x270971(0xa1)][_0x270971(0x21b)]=function(_0x51307d,_0x4cbdaa){const _0x31fac8=_0x270971,_0x5e070f=this[_0x31fac8(0x504)](_0x51307d),_0x2ebc1a=this[_0x31fac8(0x215)](_0x4cbdaa);},Game_Character['prototype'][_0x270971(0x374)]=function(_0x5339cf){const _0x3c4c11=_0x270971;if(_0x5339cf[_0x3c4c11(0x447)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)){if(_0x3c4c11(0x435)!==_0x3c4c11(0x435)){const _0x51db50=this[_0x3c4c11(0x3b9)](),_0x87db75=_0x14b8c9[_0x3c4c11(0x62c)](this['x'],_0x51db50),_0x3aa7ca=_0x29e976['roundYWithDirection'](this['y'],_0x51db50);this['startMapCommonEventOnOK'](_0x87db75,_0x3aa7ca);}else return!![];}else{if(_0x5339cf[_0x3c4c11(0x447)](/(?:AVOID|EVADE|DODGE)/i)){if(_0x3c4c11(0x4c6)==='OuXmv')_0x32c083[_0x3c4c11(0x25c)]([this],_0x5016fb);else return![];}else return![];}},VisuMZ[_0x270971(0x543)][_0x270971(0x30f)]=Game_Event[_0x270971(0xa1)][_0x270971(0x280)],Game_Event['prototype'][_0x270971(0x280)]=function(_0x3e7e12,_0x507020){const _0x223a5f=_0x270971;if($gameTemp[_0x223a5f(0x47b)])return![];return VisuMZ[_0x223a5f(0x543)][_0x223a5f(0x30f)][_0x223a5f(0x437)](this,_0x3e7e12,_0x507020);},Game_Character[_0x270971(0xa1)][_0x270971(0x27f)]=function(_0x59e761,_0x2c1f81){const _0x24d1ed=_0x270971,_0x1adace=['',_0x24d1ed(0x304),_0x24d1ed(0x26f),'LOWER\x20RIGHT',_0x24d1ed(0x94),'','RIGHT',_0x24d1ed(0x44c),'UP',_0x24d1ed(0x3df)],_0x1b539b=_0x1adace[_0x24d1ed(0x119)](_0x59e761[_0x24d1ed(0x363)]()[_0x24d1ed(0x1c1)]());if(_0x1b539b<=0x0)return;if(_0x2c1f81)$gameTemp[_0x24d1ed(0x47b)]=!![];if(this[_0x24d1ed(0x45a)](this['x'],this['y'],_0x1b539b)){if(_0x2c1f81)$gameTemp[_0x24d1ed(0x47b)]=![];this[_0x24d1ed(0x1bc)](_0x1b539b),this[_0x24d1ed(0x572)]-=0x1;}if(_0x2c1f81)$gameTemp[_0x24d1ed(0x47b)]=![];},Game_Character[_0x270971(0xa1)]['processMoveRouteMoveTo']=function(_0x2540ec,_0x20bd06,_0x2d2de0){const _0x57be22=_0x270971;this[_0x57be22(0x10b)](_0x2540ec,_0x20bd06,_0x2d2de0);if(this['x']!==_0x2540ec||this['y']!==_0x20bd06)this[_0x57be22(0x572)]--;},Game_Character[_0x270971(0xa1)][_0x270971(0x604)]=function(_0x312124,_0x1c8b40){const _0x30d320=_0x270971;if(_0x312124&&!_0x312124[_0x30d320(0xbb)]){if(_0x30d320(0x315)===_0x30d320(0x4d6)){if(!_0x4325ab)return;if(!_0x2e505a[_0x30d320(0x22b)]())return;const _0x563c04=_0x188f4d[_0x30d320(0x22b)]()[_0x30d320(0x3f7)]||'';if(_0x563c04['match'](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x392147=_0x30d320(0x2ba)[_0x30d320(0x27e)](_0x196cb7[_0x30d320(0x61a)],_0x48a642[_0x30d320(0x8a)]),_0x40dc7e=_0x22e28f[_0x30d320(0x4d9)](this[_0x30d320(0x496)])[_0x30d320(0x49b)](_0x28affc=>_0x28affc[_0x30d320(0x61b)](_0x392147));while(_0x40dc7e[_0x30d320(0x531)]>0x0){const _0x45a71b=_0x40dc7e[_0x30d320(0x404)]();delete this[_0x30d320(0x496)][_0x45a71b];}}}else{this[_0x30d320(0x56b)](_0x312124['x'],_0x312124['y'],_0x1c8b40);if(_0x312124[_0x30d320(0x118)]()&&this[_0x30d320(0x118)]()){if(_0x30d320(0x276)===_0x30d320(0x276)){const _0x184afe=$gameMap['distance'](this['x'],this['y'],_0x312124['x'],_0x312124['y']);if(_0x184afe<=0x1)this[_0x30d320(0x572)]++;}else _0x2d81f7[_0x30d320(0x461)]();}}}},Game_Character['prototype'][_0x270971(0x258)]=function(_0x3cdfe9,_0x1b1bed){const _0x5484ee=_0x270971;_0x1b1bed=_0x1b1bed||0x0;const _0x5b949e={'code':0x1,'indent':null,'parameters':[]};_0x5b949e[_0x5484ee(0x8e)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x3cdfe9],this[_0x5484ee(0x2fd)]['list'][this[_0x5484ee(0x572)]]['parameters'][0x0]='';while(_0x1b1bed--){this[_0x5484ee(0x2fd)][_0x5484ee(0x157)][_0x5484ee(0x23a)](this[_0x5484ee(0x572)]+0x1,0x0,_0x5b949e);}},Game_Character[_0x270971(0xa1)][_0x270971(0x445)]=function(_0x59bb32){const _0x3daf29=_0x270971;this[_0x3daf29(0x36f)]=!![],this['setPattern'](_0x59bb32);},Game_Character['prototype'][_0x270971(0x5b6)]=function(_0x46ede3,_0x5a9a1f){const _0x314ac7=_0x270971;if(this===$gamePlayer)return;const _0x509cd7=[this[_0x314ac7(0x61a)],this[_0x314ac7(0x8a)],'A'];if(_0x46ede3[_0x314ac7(0x447)](/\b[ABCD]\b/i)){if(_0x314ac7(0x5cf)===_0x314ac7(0x5cf))_0x509cd7[0x2]=String(_0x46ede3)[_0x314ac7(0x142)](0x0)['toUpperCase']()[_0x314ac7(0x1c1)]();else{if(this[_0x314ac7(0x415)]===_0x54c94e)this[_0x314ac7(0x1f8)]();if(!_0x191ae4)return null;_0x5708c3===_0x50faa3?delete this[_0x314ac7(0x415)][_0x314ac7(0xa2)]:this[_0x314ac7(0x3c8)](_0x9034f6[_0x314ac7(0x61a)],_0x4d4c38[_0x314ac7(0x8a)]);}}else _0x509cd7[0x2]='Self\x20Switch\x20%1'[_0x314ac7(0x27e)](_0x46ede3);switch(_0x5a9a1f[_0x314ac7(0x363)]()[_0x314ac7(0x1c1)]()){case'ON':case _0x314ac7(0x345):$gameSelfSwitches['setValue'](_0x509cd7,!![]);break;case _0x314ac7(0x1fe):case _0x314ac7(0x5fb):$gameSelfSwitches[_0x314ac7(0x5d7)](_0x509cd7,![]);break;case'TOGGLE':$gameSelfSwitches['setValue'](_0x509cd7,!$gameSelfSwitches[_0x314ac7(0x481)](_0x509cd7));break;}},Game_Character[_0x270971(0xa1)]['processMoveRouteSelfVariable']=function(_0x2fdbe7,_0x48c6cd){const _0x5f17f4=_0x270971;if(this===$gamePlayer)return;const _0x4c4895=[this[_0x5f17f4(0x61a)],this['_eventId'],_0x5f17f4(0x281)[_0x5f17f4(0x27e)](_0x2fdbe7)];$gameSelfSwitches[_0x5f17f4(0x5d7)](_0x4c4895,Number(_0x48c6cd));},Game_Character[_0x270971(0xa1)][_0x270971(0x26a)]=function(_0x12667c,_0x4aa0f2){const _0x5a63e2=_0x270971;this[_0x5a63e2(0x329)](_0x12667c,_0x4aa0f2);},Game_Character[_0x270971(0xa1)][_0x270971(0x635)]=function(_0x538e3d){const _0x553ccd=_0x270971;if(_0x538e3d)this[_0x553ccd(0x26a)](_0x538e3d['x'],_0x538e3d['y']);},Game_Character[_0x270971(0xa1)][_0x270971(0x38c)]=function(){const _0x1b5f32=_0x270971;switch(this[_0x1b5f32(0x3b9)]()){case 0x1:this[_0x1b5f32(0x12a)](0x7);break;case 0x2:this[_0x1b5f32(0x12a)](0x4);break;case 0x3:this[_0x1b5f32(0x12a)](0x1);break;case 0x4:this[_0x1b5f32(0x12a)](0x8);break;case 0x6:this[_0x1b5f32(0x12a)](0x2);break;case 0x7:this[_0x1b5f32(0x12a)](0x9);break;case 0x8:this[_0x1b5f32(0x12a)](0x6);break;case 0x9:this[_0x1b5f32(0x12a)](0x3);break;}},Game_Character[_0x270971(0xa1)][_0x270971(0x3c5)]=function(){const _0x5f547b=_0x270971;switch(this[_0x5f547b(0x3b9)]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0x5f547b(0x12a)](0x2);break;case 0x6:this['setDirection'](0x8);break;case 0x7:this[_0x5f547b(0x12a)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x5f547b(0x12a)](0x7);break;}},Game_Character[_0x270971(0xa1)]['getDirectionToPoint']=function(_0x339525,_0x5346c2,_0x2beaa0){const _0x4501c0=_0x270971,_0x14bb8c=this['deltaXFrom'](_0x339525),_0x231536=this[_0x4501c0(0x215)](_0x5346c2);if($gameMap[_0x4501c0(0x5fc)]()){if(_0x2beaa0||this[_0x4501c0(0x602)]()){if(_0x14bb8c>0x0&&_0x231536<0x0)return 0x1;if(_0x14bb8c<0x0&&_0x231536<0x0)return 0x3;if(_0x14bb8c>0x0&&_0x231536>0x0)return 0x7;if(_0x14bb8c<0x0&&_0x231536>0x0)return 0x9;}}if(Math[_0x4501c0(0x4ff)](_0x14bb8c)>Math[_0x4501c0(0x4ff)](_0x231536))return _0x14bb8c>0x0?0x4:0x6;else{if(_0x231536!==0x0)return _0x231536>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x270971(0xa1)][_0x270971(0x331)]=function(_0x45926d,_0xedc1a4,_0x4faa6a){const _0x5e69c1=_0x270971,_0x35f86c=this[_0x5e69c1(0x504)](_0x45926d),_0x20bffb=this['deltaYFrom'](_0xedc1a4);if($gameMap['isSupportDiagonalMovement']()){if(_0x5e69c1(0x4e4)!==_0x5e69c1(0x4e4))_0xd390b3=_0x319d6b[_0x5e69c1(0x4ea)](_0x40f466),_0x315e01[_0x5e69c1(0x543)][_0x5e69c1(0x5e7)][_0x5e69c1(0x437)](this,_0x516f60);else{if(_0x4faa6a||this[_0x5e69c1(0x602)]()){if(_0x5e69c1(0x386)!=='vcbGQ')_0x48ade7=_0x3fdcf0['replace'](_0x200ea4,(_0x5ba5d9,_0x5f59c2)=>_0x28de8d[_0x5e69c1(0x481)](_0xb7a055(_0x5f59c2)));else{if(_0x35f86c>0x0&&_0x20bffb<0x0)return 0x9;if(_0x35f86c<0x0&&_0x20bffb<0x0)return 0x7;if(_0x35f86c>0x0&&_0x20bffb>0x0)return 0x3;if(_0x35f86c<0x0&&_0x20bffb>0x0)return 0x1;}}}}if(Math[_0x5e69c1(0x4ff)](_0x35f86c)>Math[_0x5e69c1(0x4ff)](_0x20bffb)){if(_0x5e69c1(0x63a)!==_0x5e69c1(0x63a)){_0x5aef3c[_0x5e69c1(0x4ed)]()&&_0x3ecf91(_0x5e69c1(0x231)+_0x5e69c1(0x56f));return;}else return _0x35f86c>0x0?0x6:0x4;}else{if(_0x20bffb!==0x0)return _0x20bffb>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x270971(0xa1)]['moveTowardPoint']=function(_0x45513f,_0x154607){const _0x386789=_0x270971,_0x4815fc=this[_0x386789(0x260)](_0x45513f,_0x154607,!![]);if(_0x4815fc)this[_0x386789(0x1bc)](_0x4815fc);},Game_Character[_0x270971(0xa1)][_0x270971(0x60a)]=function(_0x308dec,_0x2bda77){const _0x1376b8=_0x270971,_0x413f3e=this[_0x1376b8(0x331)](_0x308dec,_0x2bda77,!![]);if(_0x413f3e)this[_0x1376b8(0x1bc)](_0x413f3e);},Game_Character[_0x270971(0xa1)][_0x270971(0x1f5)]=function(_0x51c29b,_0x16334a){const _0xb3acda=_0x270971,_0x168ad8=this[_0xb3acda(0x260)](_0x51c29b,_0x16334a,![]);if(_0x168ad8)this[_0xb3acda(0x12a)](_0x168ad8);},Game_Character['prototype'][_0x270971(0x611)]=function(_0x35f115,_0x7349f6){const _0x5f3bfa=_0x270971,_0x11314a=this[_0x5f3bfa(0x331)](_0x35f115,_0x7349f6,![]);if(_0x11314a)this[_0x5f3bfa(0x12a)](_0x11314a);},Game_Character[_0x270971(0xa1)][_0x270971(0x1ef)]=function(_0xe83319){const _0x5b94e=_0x270971;if(_0xe83319)this[_0x5b94e(0x308)](_0xe83319['x'],_0xe83319['y']);},Game_Character['prototype'][_0x270971(0x3b8)]=function(_0x2af90f){const _0x266257=_0x270971;if(_0x2af90f)this[_0x266257(0x60a)](_0x2af90f['x'],_0x2af90f['y']);},Game_Character[_0x270971(0xa1)][_0x270971(0x5c1)]=function(_0x1ae892){const _0x2f06af=_0x270971;if(_0x1ae892)this[_0x2f06af(0x1f5)](_0x1ae892['x'],_0x1ae892['y']);},Game_Character[_0x270971(0xa1)][_0x270971(0x3cb)]=function(_0x3a3445){const _0x192ae5=_0x270971;if(_0x3a3445)this[_0x192ae5(0x611)](_0x3a3445['x'],_0x3a3445['y']);},VisuMZ['EventsMoveCore'][_0x270971(0x20c)]=Game_Player[_0x270971(0xa1)][_0x270971(0x52d)],Game_Player[_0x270971(0xa1)][_0x270971(0x52d)]=function(){const _0x1efe5a=_0x270971;if(!Game_CharacterBase[_0x1efe5a(0x114)]&&this[_0x1efe5a(0x2a0)]())return![];if(this[_0x1efe5a(0x312)])return!![];return VisuMZ[_0x1efe5a(0x543)][_0x1efe5a(0x20c)][_0x1efe5a(0x437)](this);},VisuMZ[_0x270971(0x543)]['Game_Player_getInputDirection']=Game_Player[_0x270971(0xa1)][_0x270971(0x530)],Game_Player[_0x270971(0xa1)][_0x270971(0x530)]=function(){const _0x520f11=_0x270971;if($gameMap[_0x520f11(0x5fc)]()){if(_0x520f11(0x20a)!==_0x520f11(0x62a))return this[_0x520f11(0x4bd)]();else{if([0x1,0x2,0x3][_0x520f11(0x3fc)](_0x2cbc5c))_0x38f922+=0x1;if([0x7,0x8,0x9][_0x520f11(0x3fc)](_0x475b96))_0x499a46-=0x1;return this['roundY'](_0x1d472d);}}else{if('OxgSJ'!==_0x520f11(0x2c1))this['_advancedSwitchVariable']=!![];else return VisuMZ[_0x520f11(0x543)]['Game_Player_getInputDirection'][_0x520f11(0x437)](this);}},Game_Player[_0x270971(0xa1)][_0x270971(0x4bd)]=function(){return Input['dir8'];},Game_Player[_0x270971(0xa1)]['moveByInput']=function(){const _0x456927=_0x270971;if($gameSystem[_0x456927(0x57c)]())return 0x0;if(!this[_0x456927(0xd8)]()&&this['canMove']()){let _0x1a1577=this['getInputDirection']();if(_0x1a1577>0x0)$gameTemp[_0x456927(0x159)]();else{if($gameTemp[_0x456927(0x91)]()){const _0x7fb1d9=$gameTemp[_0x456927(0x3ae)](),_0x51e588=$gameTemp['destinationY']();this[_0x456927(0x171)](_0x7fb1d9,_0x51e588)?_0x1a1577=this['findDiagonalDirectionTo'](_0x7fb1d9,_0x51e588):_0x1a1577=this['findDirectionTo'](_0x7fb1d9,_0x51e588);}}_0x1a1577>0x0?_0x456927(0x439)!=='VkHHj'?(_0x59a5a6['ConvertParams'](_0x3fa43a,_0xd4f96b),_0x762dde[_0x456927(0x4f3)](_0x4ef07a,_0x225981[_0x456927(0x50b)],_0x573a51['IconBufferX'],_0x267059[_0x456927(0x5d4)],_0x4e2fa1[_0x456927(0x59f)])):(this[_0x456927(0x527)]=this[_0x456927(0x527)]||0x0,this[_0x456927(0x369)]()?this[_0x456927(0x12a)](_0x1a1577):this[_0x456927(0x533)](_0x1a1577),this[_0x456927(0x527)]++):this['_inputTime']=0x0;}},Game_Player[_0x270971(0xa1)]['isTurnInPlace']=function(){const _0x5b40ad=_0x270971,_0x4522a2=VisuMZ[_0x5b40ad(0x543)][_0x5b40ad(0x412)][_0x5b40ad(0x42b)];if(!_0x4522a2[_0x5b40ad(0x606)])return![];if($gameTemp[_0x5b40ad(0x91)]())return![];if(this[_0x5b40ad(0x52d)]()||this[_0x5b40ad(0xd8)]()||this['isOnLadder']())return![];return this[_0x5b40ad(0x527)]<_0x4522a2['TurnInPlaceDelay'];},VisuMZ[_0x270971(0x543)][_0x270971(0x586)]=Game_Player[_0x270971(0xa1)]['executeMove'],Game_Player[_0x270971(0xa1)][_0x270971(0x533)]=function(_0x5160d5){const _0x36dd89=_0x270971;$gameMap[_0x36dd89(0x5fc)]()?_0x36dd89(0x638)===_0x36dd89(0x52c)?_0x47b068[_0x36dd89(0x1bd)](0x1,0x3,0x7,0x9):this['executeMoveDir8'](_0x5160d5):VisuMZ['EventsMoveCore'][_0x36dd89(0x586)][_0x36dd89(0x437)](this,_0x5160d5);},VisuMZ[_0x270971(0x543)][_0x270971(0x249)]=Game_Player[_0x270971(0xa1)][_0x270971(0x585)],Game_Player[_0x270971(0xa1)][_0x270971(0x585)]=function(_0x2040e8,_0x323912,_0x16afa7){const _0x25a97c=_0x270971;if($gameMap[_0x25a97c(0x4d1)](_0x2040e8,_0x323912,_0x16afa7,_0x25a97c(0x5f0))){if(_0x25a97c(0x267)!==_0x25a97c(0x179)){if(this[_0x25a97c(0x2e2)]()&&this[_0x25a97c(0x54c)]())return this[_0x25a97c(0x54c)]()[_0x25a97c(0x585)](_0x2040e8,_0x323912,_0x16afa7);else{if(_0x25a97c(0x1f4)===_0x25a97c(0x5f1))this[_0x25a97c(0xbe)]=0x0,this['_followerChaseOff']=![];else return!![];}}else this[_0x25a97c(0x3c8)](_0x58303a[_0x25a97c(0x61a)],_0x11c493[_0x25a97c(0x8a)]);}if($gameMap[_0x25a97c(0x378)](_0x2040e8,_0x323912,_0x16afa7,'player'))return![];return VisuMZ[_0x25a97c(0x543)][_0x25a97c(0x249)][_0x25a97c(0x437)](this,_0x2040e8,_0x323912,_0x16afa7);},VisuMZ['EventsMoveCore'][_0x270971(0x40e)]=Game_Player['prototype'][_0x270971(0x513)],Game_Player[_0x270971(0xa1)][_0x270971(0x513)]=function(_0x118c1f){const _0x43a392=_0x270971;VisuMZ[_0x43a392(0x543)][_0x43a392(0x40e)][_0x43a392(0x437)](this,_0x118c1f);if(this[_0x43a392(0x418)]()){this['checkEventTriggerEventsMoveCore'](_0x118c1f);if(_0x118c1f[_0x43a392(0x3fc)](0x0)&&this[_0x43a392(0x464)]()===_0x43a392(0x4fa))this[_0x43a392(0x32a)](this['x'],this['y']);else(_0x118c1f[_0x43a392(0x3fc)](0x1)||_0x118c1f[_0x43a392(0x3fc)](0x2))&&this['startMapCommonEventOnTouch']();}},VisuMZ['EventsMoveCore'][_0x270971(0x2c8)]=Game_Player['prototype']['checkEventTriggerThere'],Game_Player[_0x270971(0xa1)][_0x270971(0x53b)]=function(_0x53423a){const _0x293efe=_0x270971;VisuMZ[_0x293efe(0x543)]['Game_Player_checkEventTriggerThere'][_0x293efe(0x437)](this,_0x53423a);if(this[_0x293efe(0x418)]()&&_0x53423a['includes'](0x0)&&this[_0x293efe(0x464)]()===_0x293efe(0x5a1)){if(_0x293efe(0x5bc)!==_0x293efe(0x3c7)){const _0x49a2b1=this['direction'](),_0x5a638b=$gameMap[_0x293efe(0x62c)](this['x'],_0x49a2b1),_0x4d4503=$gameMap[_0x293efe(0x150)](this['y'],_0x49a2b1);this[_0x293efe(0x32a)](_0x5a638b,_0x4d4503);}else return _0x362281[_0x293efe(0x226)][_0x293efe(0x3fc)](_0xdc2f8)||_0x4c0476[_0x293efe(0x313)][_0x293efe(0x3fc)](_0x536c02);}},Game_Player[_0x270971(0xa1)][_0x270971(0x186)]=function(_0x3c4511){const _0x325099=_0x270971;if($gameMap['isEventRunning']())return;if($gameMap[_0x325099(0x1c6)]())return;const _0x271648=$gameMap[_0x325099(0x1b6)]();for(const _0x1c8f05 of _0x271648){if(!_0x1c8f05)continue;if(!_0x1c8f05[_0x325099(0x483)](_0x3c4511))continue;if(this[_0x325099(0x1ff)](_0x1c8f05))return _0x1c8f05[_0x325099(0x40d)]();if(this[_0x325099(0x49c)](_0x1c8f05))return _0x1c8f05[_0x325099(0x40d)]();}},Game_Player['prototype'][_0x270971(0x1ff)]=function(_0xc79b37){const _0x48e3b1=_0x270971;if($gameMap['isEventRunning']())return![];if($gameMap[_0x48e3b1(0x1c6)]())return![];return _0xc79b37[_0x48e3b1(0x103)]()['includes'](this[_0x48e3b1(0x3fe)]());},Game_Player[_0x270971(0xa1)][_0x270971(0x49c)]=function(_0x4d998){const _0x1ec9fe=_0x270971;if($gameMap[_0x1ec9fe(0x21a)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x1ec9fe(0xdc),_0x1ec9fe(0x3da)][_0x1ec9fe(0x3fc)](_0x4d998[_0x1ec9fe(0x326)]()))return![];const _0xf597cf=_0x4d998[_0x1ec9fe(0x326)](),_0x1e8f93=_0x4d998[_0x1ec9fe(0x475)]();return this[_0x1ec9fe(0x98)](_0x4d998,_0xf597cf,_0x1e8f93);},Game_Map['prototype'][_0x270971(0x98)]=function(_0x2ff4c8,_0x1abd8a,_0x23ee60,_0x323a45,_0x266cba){const _0x1d7fec=_0x270971;switch(_0x323a45){case _0x1d7fec(0x220):return _0x266cba>=Math[_0x1d7fec(0x4ff)](_0x23ee60[_0x1d7fec(0x504)](_0x2ff4c8))&&_0x266cba>=Math[_0x1d7fec(0x4ff)](_0x23ee60['deltaYFrom'](_0x1abd8a));break;case _0x1d7fec(0xde):const _0xf549e=Math['pow'](_0x23ee60['x']-_0x2ff4c8,0x2),_0x54b812=Math[_0x1d7fec(0xfc)](_0x23ee60['y']-_0x1abd8a,0x2);return _0x266cba>=Math['round'](Math[_0x1d7fec(0x192)](_0xf549e+_0x54b812));break;case'radius':case _0x1d7fec(0x295):const _0x93652f=$gameMap[_0x1d7fec(0x41b)](_0x2ff4c8,_0x1abd8a,_0x23ee60['x'],_0x23ee60['y']);return _0x23ee60[_0x1d7fec(0x475)]()>=_0x93652f;break;case _0x1d7fec(0x423):return _0x266cba>=Math[_0x1d7fec(0x4ff)](_0x23ee60[_0x1d7fec(0x215)](_0x1abd8a));break;case'column':return _0x266cba>=Math['abs'](_0x23ee60['deltaXFrom'](_0x2ff4c8));break;}return![];},Game_Player['prototype']['checkEventProximity']=function(_0x302250,_0x3ce15b,_0x29969c){const _0x54e8a7=_0x270971,_0x4cf097=this['x'],_0x90d43c=this['y'];return $gameMap[_0x54e8a7(0x98)](_0x4cf097,_0x90d43c,_0x302250,_0x3ce15b,_0x29969c);},Game_Player['prototype'][_0x270971(0x32a)]=function(_0x21f159,_0x3cf551){const _0x4a1014=_0x270971;if($gameMap['isEventRunning']())return;if($gameMap['isAnyEventStarting']())return;let _0x5cf8a9=VisuMZ[_0x4a1014(0x543)][_0x4a1014(0x412)][_0x4a1014(0x512)],_0x289c8d=$gameMap[_0x4a1014(0x3fe)](_0x21f159,_0x3cf551);const _0x1dc899='Region%1'[_0x4a1014(0x27e)](_0x289c8d);_0x5cf8a9[_0x1dc899]&&(_0x4a1014(0x31b)===_0x4a1014(0x31b)?$gameTemp[_0x4a1014(0x208)](_0x5cf8a9[_0x1dc899]):(_0x317366[_0x4a1014(0xdb)](),_0x52b9b5['updateEventLabelText']()));},Game_Player['prototype'][_0x270971(0x464)]=function(){const _0x9e068a=_0x270971;return VisuMZ[_0x9e068a(0x543)][_0x9e068a(0x412)][_0x9e068a(0x2e3)];},Game_Player[_0x270971(0xa1)][_0x270971(0x4f4)]=function(){const _0x18268e=_0x270971;if($gameMap[_0x18268e(0x21a)]())return;if($gameMap['isAnyEventStarting']())return;let _0x13eb6b=VisuMZ[_0x18268e(0x543)][_0x18268e(0x412)][_0x18268e(0x5af)];const _0x2c1e3e=_0x18268e(0x2ae)[_0x18268e(0x27e)](this[_0x18268e(0x3fe)]());_0x13eb6b[_0x2c1e3e]&&$gameTemp[_0x18268e(0x208)](_0x13eb6b[_0x2c1e3e]);},VisuMZ[_0x270971(0x543)][_0x270971(0x18c)]=Game_Player[_0x270971(0xa1)][_0x270971(0x608)],Game_Player['prototype'][_0x270971(0x608)]=function(){const _0x3f9588=_0x270971;VisuMZ[_0x3f9588(0x543)][_0x3f9588(0x18c)][_0x3f9588(0x437)](this),VisuMZ[_0x3f9588(0x5cc)](0x0);},Game_Player['prototype']['updateMoveSynchDirection']=function(){const _0x1d132b=_0x270971;VisuMZ[_0x1d132b(0xb9)](0x0);},VisuMZ[_0x270971(0x543)][_0x270971(0x519)]=Game_Follower[_0x270971(0xa1)][_0x270971(0x2c2)],Game_Follower[_0x270971(0xa1)][_0x270971(0x2c2)]=function(_0x463d82){const _0x11e40e=_0x270971;VisuMZ['EventsMoveCore'][_0x11e40e(0x519)][_0x11e40e(0x437)](this,_0x463d82),this[_0x11e40e(0x39e)]=![];},Game_Follower[_0x270971(0xa1)][_0x270971(0x52d)]=function(){const _0x52baf5=_0x270971;if(this[_0x52baf5(0x39e)])return Game_Character[_0x52baf5(0xa1)][_0x52baf5(0x52d)][_0x52baf5(0x437)](this);return $gamePlayer[_0x52baf5(0x52d)]();},Game_Follower[_0x270971(0xa1)][_0x270971(0x510)]=function(){const _0x3fcc5a=_0x270971;if(this[_0x3fcc5a(0x39e)])return Game_Character[_0x3fcc5a(0xa1)][_0x3fcc5a(0x510)][_0x3fcc5a(0x437)](this);return $gamePlayer[_0x3fcc5a(0x510)]()&&this['_actuallyMoving'];},Game_Follower[_0x270971(0xa1)][_0x270971(0x2f9)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x270971(0xa1)]['updateStop']=function(){const _0x220dc5=_0x270971;Game_Character['prototype'][_0x220dc5(0x398)][_0x220dc5(0x437)](this),this[_0x220dc5(0x405)]>0x0&&(this['_actuallyMoving']=![]);},Game_Follower[_0x270971(0xa1)]['setChaseOff']=function(_0x22cb23){this['_chaseOff']=_0x22cb23;},VisuMZ['EventsMoveCore']['Game_Follower_chaseCharacter']=Game_Follower[_0x270971(0xa1)][_0x270971(0x174)],Game_Follower['prototype']['chaseCharacter']=function(_0x59344e){const _0x11bf17=_0x270971;if(this[_0x11bf17(0x39e)])return;if($gameSystem[_0x11bf17(0x4a7)]())return;VisuMZ[_0x11bf17(0x543)][_0x11bf17(0x394)]['call'](this,_0x59344e),this['_actuallyMoving']=!![];},VisuMZ[_0x270971(0x543)][_0x270971(0x516)]=Game_Vehicle[_0x270971(0xa1)]['isMapPassable'],Game_Vehicle[_0x270971(0xa1)][_0x270971(0x585)]=function(_0x20ad76,_0x3a95e6,_0xebf8c3){const _0x4b2ac7=_0x270971;if($gameMap[_0x4b2ac7(0x4d1)](_0x20ad76,_0x3a95e6,_0xebf8c3,this['_type']))return!![];if($gameMap[_0x4b2ac7(0x378)](_0x20ad76,_0x3a95e6,_0xebf8c3,this[_0x4b2ac7(0x43a)]))return![];return VisuMZ['EventsMoveCore'][_0x4b2ac7(0x516)][_0x4b2ac7(0x437)](this,_0x20ad76,_0x3a95e6,_0xebf8c3);},Game_Vehicle[_0x270971(0xa1)][_0x270971(0x33e)]=function(_0x1574fa,_0x57b1f5,_0x1fe2f7){const _0x13afd8=_0x270971;if($gameMap[_0x13afd8(0x4d1)](_0x1574fa,_0x57b1f5,_0x1fe2f7,this['_type']))return!![];if($gameMap[_0x13afd8(0x378)](_0x1574fa,_0x57b1f5,_0x1fe2f7,this[_0x13afd8(0x43a)]))return![];return VisuMZ[_0x13afd8(0x543)]['Game_CharacterBase_canPass']['call']($gamePlayer,_0x1574fa,_0x57b1f5,_0x1fe2f7);},VisuMZ[_0x270971(0x543)][_0x270971(0x36d)]=Game_Vehicle['prototype'][_0x270971(0x27b)],Game_Vehicle[_0x270971(0xa1)][_0x270971(0x27b)]=function(_0x10a35a,_0x7ad353,_0x2dbe95){const _0x35233b=_0x270971;if($gameMap[_0x35233b(0x245)](_0x10a35a,_0x7ad353,_0x2dbe95,this['_type']))return!![];const _0x11012b=this['_type'][_0x35233b(0x142)](0x0)[_0x35233b(0x363)]()+this[_0x35233b(0x43a)]['slice'](0x1),_0xc5abe8=_0x35233b(0x1db)[_0x35233b(0x27e)](_0x11012b);return VisuMZ[_0x35233b(0x543)]['Settings'][_0x35233b(0x3b1)][_0xc5abe8]?![]:VisuMZ['EventsMoveCore']['Game_Vehicle_isLandOk'][_0x35233b(0x437)](this,_0x10a35a,_0x7ad353,_0x2dbe95);},VisuMZ[_0x270971(0x543)][_0x270971(0x18b)]=Game_Vehicle[_0x270971(0xa1)][_0x270971(0xdd)],Game_Vehicle['prototype'][_0x270971(0xdd)]=function(){const _0x4d30b9=_0x270971;VisuMZ[_0x4d30b9(0x543)][_0x4d30b9(0x18b)][_0x4d30b9(0x437)](this);const _0x264c68=VisuMZ['EventsMoveCore'][_0x4d30b9(0x412)][_0x4d30b9(0x42b)];if(this[_0x4d30b9(0x36a)]()){if(_0x264c68['BoatSpeed'])this[_0x4d30b9(0x2b9)](_0x264c68[_0x4d30b9(0x49f)]);}else{if(this[_0x4d30b9(0x368)]()){if('NfFRg'===_0x4d30b9(0x5a0))_0xf39902(this[_0x4d30b9(0x357)]['bind'](this,_0x13c868,_0x304aad),0x64);else{if(_0x264c68[_0x4d30b9(0x2e6)])this[_0x4d30b9(0x2b9)](_0x264c68[_0x4d30b9(0x2e6)]);}}else{if(this[_0x4d30b9(0x2f0)]()){if(_0x264c68[_0x4d30b9(0x620)])this[_0x4d30b9(0x2b9)](_0x264c68[_0x4d30b9(0x620)]);}}}},VisuMZ[_0x270971(0x543)]['Game_Event_initialize']=Game_Event[_0x270971(0xa1)][_0x270971(0x2c2)],Game_Event[_0x270971(0xa1)][_0x270971(0x2c2)]=function(_0x5dace1,_0xd74071){const _0x3acc3c=_0x270971;VisuMZ[_0x3acc3c(0x543)]['Game_Event_initialize'][_0x3acc3c(0x437)](this,_0x5dace1,_0xd74071),this[_0x3acc3c(0x364)](),this[_0x3acc3c(0x129)](),this[_0x3acc3c(0x3d3)]();},Game_Map[_0x270971(0xa1)][_0x270971(0x237)]=function(_0xf92e42,_0x1a97bc){const _0x23125e=_0x270971;return _0xf92e42===$gameMap[_0x23125e(0x4dc)]()?$dataMap[_0x23125e(0x1b6)][_0x1a97bc]:VisuMZ[_0x23125e(0x14c)][_0xf92e42][_0x23125e(0x1b6)][_0x1a97bc];},VisuMZ[_0x270971(0x543)][_0x270971(0x16d)]=Game_Event[_0x270971(0xa1)][_0x270971(0x22b)],Game_Event[_0x270971(0xa1)][_0x270971(0x22b)]=function(){const _0x45bb47=_0x270971;if(this[_0x45bb47(0x600)]!==undefined){const _0x2d6314=this['_eventMorphData'][_0x45bb47(0x4dc)],_0x5be66f=this[_0x45bb47(0x600)][_0x45bb47(0x2c4)];return $gameMap[_0x45bb47(0x237)](_0x2d6314,_0x5be66f);}if(this[_0x45bb47(0x14a)]!==undefined){if(_0x45bb47(0x45e)!==_0x45bb47(0x45e))this[_0x45bb47(0x240)][_0x45bb47(0x2f6)]=_0x34807a(_0x4cf416['$1']);else{const _0x5c5323=this[_0x45bb47(0x14a)][_0x45bb47(0x4dc)],_0x3a6dc2=this[_0x45bb47(0x14a)][_0x45bb47(0x2c4)];return $gameMap[_0x45bb47(0x237)](_0x5c5323,_0x3a6dc2);}}if(this['_eventSpawnData']!==undefined){const _0x4dfab5=this[_0x45bb47(0x225)][_0x45bb47(0x4dc)],_0x5b0f61=this['_eventSpawnData'][_0x45bb47(0x2c4)];return $gameMap[_0x45bb47(0x237)](_0x4dfab5,_0x5b0f61);}if($gameTemp[_0x45bb47(0x553)]!==undefined){const _0x6a2219=$gameTemp['_spawnData'][_0x45bb47(0x4dc)],_0x3cebcf=$gameTemp['_spawnData'][_0x45bb47(0x2c4)];return $gameMap[_0x45bb47(0x237)](_0x6a2219,_0x3cebcf);}return VisuMZ[_0x45bb47(0x543)]['Game_Event_event'][_0x45bb47(0x437)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0x2be)]=function(_0x34e3d3,_0x338742){const _0x19e5ed=_0x270971;if(_0x34e3d3===0x0||_0x338742===0x0)return![];if(_0x34e3d3===$gameMap[_0x19e5ed(0x4dc)]())return!![];if(!VisuMZ['PreloadedMaps'][_0x34e3d3]&&_0x34e3d3!==$gameMap[_0x19e5ed(0x4dc)]()){if(_0x19e5ed(0x323)!==_0x19e5ed(0x323)){const _0x347e04=_0x4bf4?this[_0x19e5ed(0x224)]:this['_encounterNoneProximity'];return _0x347e04?_0x347e04[_0x19e5ed(0x473)]:_0x19e5ed(0xdc);}else return $gameTemp['isPlaytest']()&&console['log']('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'['format'](_0x34e3d3)),![];}return!![];},VisuMZ[_0x270971(0x543)][_0x270971(0x252)]=Game_Event[_0x270971(0xa1)][_0x270971(0x40d)],Game_Event[_0x270971(0xa1)][_0x270971(0x40d)]=function(){const _0x4df5b2=_0x270971;VisuMZ[_0x4df5b2(0x543)][_0x4df5b2(0x252)][_0x4df5b2(0x437)](this);if(Imported[_0x4df5b2(0x4be)]&&Input[_0x4df5b2(0x28a)](VisuMZ[_0x4df5b2(0x3cd)][_0x4df5b2(0x412)][_0x4df5b2(0x5ea)][_0x4df5b2(0x622)])){if(_0x4df5b2(0x1c8)!==_0x4df5b2(0x5a8))Input[_0x4df5b2(0x4ef)]();else{const _0x236bd6=_0x5d7bf5['parse']('['+_0x1d7e8a['$1']['match'](/\d+/g)+']');this[_0x4df5b2(0x301)]=this[_0x4df5b2(0x301)][_0x4df5b2(0x1fc)](_0x236bd6),this[_0x4df5b2(0x301)]['remove'](0x0);}}},Game_Event[_0x270971(0xa1)][_0x270971(0x364)]=function(){const _0x4a1c93=_0x270971,_0x136ac3=this[_0x4a1c93(0x22b)]()['note'];if(_0x136ac3==='')return;if(DataManager[_0x4a1c93(0x194)]()||DataManager[_0x4a1c93(0x5da)]())return;const _0x1bae79=VisuMZ['EventsMoveCore'][_0x4a1c93(0x412)]['Template'];let _0xca68b6=null,_0x28c000=0x0,_0x1f0450=0x0;if(_0x136ac3[_0x4a1c93(0x447)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x28c000=Number(RegExp['$1']),_0x1f0450=Number(RegExp['$2']);if(_0x28c000===0x0)_0x28c000=$gameMap[_0x4a1c93(0x4dc)]();}else{if(_0x136ac3[_0x4a1c93(0x447)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x28c000=Number(RegExp['$1']),_0x1f0450=Number(RegExp['$2']);if(_0x28c000===0x0)_0x28c000=$gameMap[_0x4a1c93(0x4dc)]();}else{if(_0x136ac3[_0x4a1c93(0x447)](/<COPY EVENT:[ ](.*?)>/i)){if(_0x4a1c93(0x316)!=='NjGCk'){const _0x1a5874=String(RegExp['$1'])[_0x4a1c93(0x363)]()['trim']();_0xca68b6=VisuMZ['EventTemplates'][_0x1a5874];if(!_0xca68b6)return;_0x28c000=_0xca68b6['MapID'],_0x1f0450=_0xca68b6['EventID'];}else return this[_0x4a1c93(0x415)][_0x4a1c93(0xa2)];}}}if(!this[_0x4a1c93(0x2be)](_0x28c000,_0x1f0450))return;_0x1bae79[_0x4a1c93(0x196)]['call'](this,_0x28c000,_0x1f0450,this);if(_0xca68b6)_0xca68b6[_0x4a1c93(0x196)][_0x4a1c93(0x437)](this,_0x28c000,_0x1f0450,this);this[_0x4a1c93(0x14a)]={'mapId':_0x28c000,'eventId':_0x1f0450},this[_0x4a1c93(0x584)]=-0x2,this[_0x4a1c93(0xdb)](),_0x1bae79[_0x4a1c93(0x109)]['call'](this,_0x28c000,_0x1f0450,this);if(_0xca68b6)_0xca68b6[_0x4a1c93(0x109)][_0x4a1c93(0x437)](this,_0x28c000,_0x1f0450,this);$gameMap[_0x4a1c93(0x50d)]();},Game_Event[_0x270971(0xa1)][_0x270971(0x129)]=function(){const _0x2e2328=_0x270971,_0x3192f5=$gameSystem['getPreservedMorphEventData'](this);if(!_0x3192f5)return;const _0x1e6508=_0x3192f5['template'][_0x2e2328(0x363)]()['trim']();if(_0x1e6508!==_0x2e2328(0x128)){if('ESDUX'==='ESDUX')this['morphIntoTemplate'](_0x1e6508,!![]);else return this['_lastMovedDirection']||0x0;}else this[_0x2e2328(0x135)](_0x3192f5[_0x2e2328(0x4dc)],_0x3192f5['eventId'],!![]);},Game_Event['prototype']['morphInto']=function(_0x56e0dd,_0x46e89d,_0x4b94e1){const _0x559acc=_0x270971;if(!this[_0x559acc(0x2be)](_0x56e0dd,_0x46e89d))return;const _0x2290ab=VisuMZ[_0x559acc(0x543)][_0x559acc(0x412)]['Template'];if(!_0x4b94e1)_0x2290ab['PreMorphJS'][_0x559acc(0x437)](this,_0x56e0dd,_0x46e89d,this);this['_eventMorphData']={'mapId':_0x56e0dd,'eventId':_0x46e89d},this[_0x559acc(0x584)]=-0x2,this[_0x559acc(0xdb)]();if(!_0x4b94e1)_0x2290ab['PostMorphJS'][_0x559acc(0x437)](this,_0x56e0dd,_0x46e89d,this);$gameMap[_0x559acc(0x50d)]();},Game_Event[_0x270971(0xa1)][_0x270971(0x3f5)]=function(_0x5585fe,_0x4c77a7){const _0x13b263=_0x270971;_0x5585fe=_0x5585fe['toUpperCase']()[_0x13b263(0x1c1)]();const _0x3c5768=VisuMZ[_0x13b263(0x4ba)][_0x5585fe];if(!_0x3c5768)return;const _0x9bf832=_0x3c5768[_0x13b263(0x8d)],_0x8fd540=_0x3c5768[_0x13b263(0x50c)];if(!this[_0x13b263(0x2be)](_0x9bf832,_0x8fd540))return;if(!_0x4c77a7)_0x3c5768['PreMorphJS'][_0x13b263(0x437)](this,_0x9bf832,_0x8fd540,this);this[_0x13b263(0x135)](_0x9bf832,_0x8fd540,_0x4c77a7);if(!_0x4c77a7)_0x3c5768['PostMorphJS'][_0x13b263(0x437)](this,_0x9bf832,_0x8fd540,this);if($gameMap)$gameMap[_0x13b263(0x50d)]();},Game_Event['prototype']['removeMorph']=function(){const _0x54f055=_0x270971;this['_eventMorphData']=undefined,this[_0x54f055(0x584)]=-0x2,this['refresh']();},Game_Event['prototype'][_0x270971(0x2cf)]=function(_0xa8cb60){const _0x5f4336=_0x270971,_0x74253c=VisuMZ[_0x5f4336(0x543)][_0x5f4336(0x412)][_0x5f4336(0x2b2)],_0x1ebaab=_0xa8cb60['template'][_0x5f4336(0x363)]()[_0x5f4336(0x1c1)](),_0x4d2d86=!['',_0x5f4336(0x128)][_0x5f4336(0x3fc)](_0x1ebaab);let _0x39ac98=0x0,_0x2a1ff7=0x0;if(_0x4d2d86){if(_0x5f4336(0x3ac)!==_0x5f4336(0x3ac)){_0x50c9e9[_0x5f4336(0x317)](_0x4148c9,_0x269d3c);const _0x127ef3=_0x98680c['getLastPluginCommandInterpreter'](),_0x3fb758=_0x5aecba[_0x5f4336(0xf1)]||_0x14882e[_0x5f4336(0x4dc)](),_0x12157c=_0x5c8e43['EventId']||_0x127ef3['eventId']();_0x1a48e9[_0x5f4336(0x121)](_0x3fb758,_0x12157c);}else{const _0xf7f742=VisuMZ['EventTemplates'][_0x1ebaab];if(!_0xf7f742)return;_0x39ac98=_0xf7f742['MapID'],_0x2a1ff7=_0xf7f742[_0x5f4336(0x50c)];}}else _0x39ac98=_0xa8cb60[_0x5f4336(0x4dc)],_0x2a1ff7=_0xa8cb60[_0x5f4336(0x2c4)];if(!this[_0x5f4336(0x2be)](_0x39ac98,_0x2a1ff7))return;if(_0x4d2d86){if('duvnV'===_0x5f4336(0x3ef)){const _0x285c0d=VisuMZ[_0x5f4336(0x4ba)][_0x1ebaab];_0x285c0d[_0x5f4336(0x138)][_0x5f4336(0x437)](this,_0x39ac98,_0x2a1ff7,this);}else{const _0x2c24de=_0x13aff7(_0xd72425['$1']),_0x9a1c75=_0x37a9f0(_0xc8f3e0['$2']),_0x5db7e9=this[_0x5f4336(0x374)](_0x5b1ccb);return this['processMoveRouteMoveTo'](_0x2c24de,_0x9a1c75,_0x5db7e9);}}_0x74253c[_0x5f4336(0x138)][_0x5f4336(0x437)](this,_0x39ac98,_0x2a1ff7,this),this[_0x5f4336(0x225)]=_0xa8cb60,this[_0x5f4336(0x584)]=-0x2,this[_0x5f4336(0x61a)]=$gameMap['mapId'](),this[_0x5f4336(0x8a)]=_0xa8cb60[_0x5f4336(0xd1)],this[_0x5f4336(0x367)]=_0xa8cb60[_0x5f4336(0x1a1)],this[_0x5f4336(0x329)](_0xa8cb60['x'],_0xa8cb60['y']),this[_0x5f4336(0x12a)](_0xa8cb60['direction']),this[_0x5f4336(0xdb)]();if(_0x4d2d86){const _0x46e0d3=VisuMZ[_0x5f4336(0x4ba)][_0x1ebaab];if(!_0x46e0d3)return;_0x46e0d3['PostSpawnJS'][_0x5f4336(0x437)](this,_0x39ac98,_0x2a1ff7,this);}_0x74253c[_0x5f4336(0x44e)][_0x5f4336(0x437)](this,_0x39ac98,_0x2a1ff7,this);const _0x4a9f26=SceneManager['_scene'];if(_0x4a9f26&&_0x4a9f26['_spriteset'])_0x4a9f26[_0x5f4336(0x402)][_0x5f4336(0x1a0)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0x54d)]=function(){const _0x24acf8=_0x270971;return!!this[_0x24acf8(0x225)];},Game_Event[_0x270971(0xa1)]['start']=function(){const _0x28761f=_0x270971;if(!this['list']())return;const _0x19d1c0=this[_0x28761f(0x157)]()[_0x28761f(0x49b)](_0x5f435a=>_0x5f435a[_0x28761f(0x8e)]!==0x6c&&_0x5f435a[_0x28761f(0x8e)]!==0x198);if(_0x19d1c0['length']>0x1){if(_0x28761f(0x39f)===_0x28761f(0x39f)){this[_0x28761f(0x15b)]=!![];if(this['isTriggerIn']([0x0,0x1,0x2])){if('rUpSK'!==_0x28761f(0x454))this[_0x28761f(0x195)]();else{if(this['_PreservedEventMorphData']===_0x2c8af0)this['initEventsMoveCore']();if(!_0x27bc11)return;const _0x2b9d00=_0x28761f(0x56a)['format'](_0x202a3e['_mapId'],_0x55afe8[_0x28761f(0x8a)]);return this['_PreservedEventMorphData'][_0x2b9d00];}}}else{if(!this['isNormalPriority']())return![];else{const _0x59025d=_0x3a0cb0[_0x28761f(0x5e5)](_0x4fa4ae,_0x31699c)[_0x28761f(0x49b)](_0x2ce871=>_0x2ce871!==this&&_0x2ce871[_0x28761f(0x118)]());return _0x59025d[_0x28761f(0x531)]>0x0;}}}},VisuMZ[_0x270971(0x543)]['Game_Event_clearPageSettings']=Game_Event[_0x270971(0xa1)]['clearPageSettings'],Game_Event['prototype'][_0x270971(0x214)]=function(){const _0x4f585e=_0x270971;VisuMZ[_0x4f585e(0x543)][_0x4f585e(0x373)][_0x4f585e(0x437)](this),this['initEventsMoveCoreEffects'](),this['autosaveEventLocation']();},VisuMZ[_0x270971(0x543)]['Game_Event_setupPageSettings']=Game_Event[_0x270971(0xa1)][_0x270971(0x3d2)],Game_Event['prototype'][_0x270971(0x3d2)]=function(){const _0x41cfc8=_0x270971;this[_0x41cfc8(0x283)]=!![],VisuMZ[_0x41cfc8(0x543)][_0x41cfc8(0xf3)][_0x41cfc8(0x437)](this),this[_0x41cfc8(0x238)](),this[_0x41cfc8(0x523)](),this[_0x41cfc8(0x283)]=![];},Game_Event[_0x270971(0xa1)][_0x270971(0x238)]=function(){const _0x66dc6f=_0x270971;if(!this[_0x66dc6f(0x22b)]())return;this[_0x66dc6f(0x3af)](),this[_0x66dc6f(0x321)](),this[_0x66dc6f(0x5d3)](),this[_0x66dc6f(0x57f)]();},Game_Event[_0x270971(0xa1)]['setupEventsMoveCoreNotetags']=function(){const _0x223494=_0x270971,_0x564d91=this['event']()[_0x223494(0x3f7)];if(_0x564d91==='')return;this[_0x223494(0x489)](_0x564d91);},Game_Event[_0x270971(0xa1)][_0x270971(0x5d3)]=function(){const _0x18774f=_0x270971;if(!this[_0x18774f(0xa6)]())return;const _0x55bc96=this[_0x18774f(0x157)]();let _0x18801c='';for(const _0x4b515c of _0x55bc96){if([0x6c,0x198][_0x18774f(0x3fc)](_0x4b515c[_0x18774f(0x8e)])){if(_0x18774f(0x213)===_0x18774f(0x495)){if(!_0xdcda1c['eventLabelsVisible']())return![];if(this[_0x18774f(0x4ac)]?.[_0x18774f(0xbb)])return![];if(_0x3b4012[_0x18774f(0x3e0)][_0x18774f(0x32d)]>0x0)return![];const _0x2dfce5=_0x3ba4bd['x'],_0x5435ae=_0x42e67e['y'],_0x141d17=this['_event']['x'],_0x42964e=this[_0x18774f(0x4ac)]['y'];if(this[_0x18774f(0x33b)]===_0x2dfce5&&this['_visiblePlayerY']===_0x5435ae&&this[_0x18774f(0xb6)]===_0x141d17&&this[_0x18774f(0x2d3)]===_0x42964e)return this[_0x18774f(0x12d)];this[_0x18774f(0x33b)]=_0x44bd7f['x'],this[_0x18774f(0x140)]=_0x7e18fc['y'],this[_0x18774f(0xb6)]=this['_event']['x'],this[_0x18774f(0x2d3)]=this[_0x18774f(0x4ac)]['y'];if(_0xf9d86f[_0x18774f(0x38f)](_0x2dfce5,_0x5435ae,_0x141d17,_0x42964e)>this['_event'][_0x18774f(0x14e)]())return this['_cacheVisibility']=![],![];return this[_0x18774f(0x12d)]=!![],!![];}else{if(_0x18801c!=='')_0x18801c+='\x0a';_0x18801c+=_0x4b515c[_0x18774f(0x16b)][0x0];}}}this[_0x18774f(0x489)](_0x18801c);},Game_Event[_0x270971(0xa1)][_0x270971(0x3af)]=function(){const _0x2a2107=_0x270971,_0x31090f=VisuMZ['EventsMoveCore'][_0x2a2107(0x412)];this['_activationProximity']={'type':_0x2a2107(0xdc),'distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x2a2107(0x13a)](),this[_0x2a2107(0x5e1)]=![],this[_0x2a2107(0x525)]=![],this[_0x2a2107(0x271)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x2a2107(0x224)]={'type':_0x2a2107(0xdc),'distance':0x0},this[_0x2a2107(0x4c4)]={'type':_0x2a2107(0xdc),'distance':0x0},$gameSystem[_0x2a2107(0x279)](this),this[_0x2a2107(0x4cf)]=$gameSystem[_0x2a2107(0x28f)](this),this[_0x2a2107(0x240)]={'originalText':'','text':'','visibleRange':_0x31090f['Label']['VisibleRange'],'offsetX':_0x31090f[_0x2a2107(0x33a)]['OffsetX'],'offsetY':_0x31090f[_0x2a2107(0x33a)]['OffsetY'],'hueShift':0x0},this['_mirrorSprite']=![],this['_moveOnlyRegions']=[],this[_0x2a2107(0x42a)]={'target':-0x1,'type':_0x2a2107(0x5ef),'delay':0x1,'opacityDelta':0x0},this[_0x2a2107(0x493)]=_0x31090f[_0x2a2107(0x42b)][_0x2a2107(0x1a6)]??0x0,this[_0x2a2107(0x623)]=![],this[_0x2a2107(0x491)]=0x1,this[_0x2a2107(0x517)]=0x1,this[_0x2a2107(0x337)]={'visible':!![],'filename':_0x31090f[_0x2a2107(0x42b)]['DefaultShadow']},this[_0x2a2107(0xfa)](),this[_0x2a2107(0x251)]();},Game_Event[_0x270971(0xa1)][_0x270971(0x489)]=function(_0x1596b){const _0x403a11=_0x270971;if(_0x1596b['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x403a11(0x3b3)!==_0x403a11(0x58f))this[_0x403a11(0x580)][_0x403a11(0xf8)]=JSON[_0x403a11(0x3a1)]('['+RegExp['$1'][_0x403a11(0x447)](/\d+/g)+']'),this[_0x403a11(0x580)][_0x403a11(0x473)]=_0x403a11(0x3da);else{if(this[_0x403a11(0x4da)]===_0x5a363d)this[_0x403a11(0x1f8)]();if(this[_0x403a11(0x4da)][_0x403a11(0x2fe)]===_0x140717)this[_0x403a11(0x1f8)]();this[_0x403a11(0x4da)][_0x403a11(0x2fe)]=_0x1d4d62;}}else _0x1596b[_0x403a11(0x447)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x403a11(0x1c1)](),this[_0x403a11(0x580)][_0x403a11(0x473)]=type,this['_activationProximity'][_0x403a11(0x41b)]=Number(RegExp['$2']));if(_0x1596b['match'](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)){if('Wnzjm'===_0x403a11(0x5e8))return![];else this[_0x403a11(0x3a9)]['filename']=String(RegExp['$1']);}if(_0x1596b[_0x403a11(0x447)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){const _0x2b06cc=String(RegExp['$1'])[_0x403a11(0x363)]()[_0x403a11(0x1c1)](),_0x40f4c3=['NORMAL',_0x403a11(0x5fe),_0x403a11(0x311),_0x403a11(0x1a9)];this[_0x403a11(0x3a9)][_0x403a11(0x470)]=_0x40f4c3['indexOf'](_0x2b06cc)[_0x403a11(0x17b)](0x0,0x3);}_0x1596b[_0x403a11(0x447)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&('PtICi'!==_0x403a11(0x37d)?this[_0x403a11(0x42a)]['target']=_0x3c2836(_0x1e3c62['$1']):this['_attachPicture']['maxSize']=Number(RegExp['$1']));if(_0x1596b[_0x403a11(0x447)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)){if('PVJch'===_0x403a11(0x1b1)){const _0x337336=this['_settings'];{const _0x3ebf4a=_0x44346d[_0x403a11(0xd6)](),_0xcedcce=_0x337336['tileCoordinates']['x'],_0x3d2b38=_0x31c4c3[_0x403a11(0x8b)](_0xcedcce);this['x']=_0x1193fa[_0x403a11(0x257)](_0x3d2b38*_0x3ebf4a+_0x3ebf4a/0x2);}{const _0xa3af3b=_0x8e8353['tileHeight'](),_0xc8280d=_0x337336[_0x403a11(0x506)]['y'],_0x2e4eb5=_0x5e2af8[_0x403a11(0x2bb)](_0xc8280d);this['y']=_0x7c91bd[_0x403a11(0x257)](_0x2e4eb5*_0xa3af3b+_0xa3af3b);}}else this['_attachPicture'][_0x403a11(0x2f6)]=Number(RegExp['$1']);}if(_0x1596b['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x403a11(0x592)==='sjUrg')return 0x2;else this['_attachPicture'][_0x403a11(0x515)]=Number(RegExp['$1']);}_0x1596b['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x403a11(0x3a9)][_0x403a11(0x2f6)]=Number(RegExp['$1']),this[_0x403a11(0x3a9)][_0x403a11(0x515)]=Number(RegExp['$2']));_0x1596b[_0x403a11(0x447)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x403a11(0x3a9)][_0x403a11(0x269)]=Number(RegExp['$1'])*0.01);if(_0x1596b[_0x403a11(0x447)](/<ALWAYS UPDATE MOVEMENT>/i)){if('ZIVBd'==='xsjVA'){if(!this[_0x403a11(0x480)]())return;const _0x2fb54e=this[_0x403a11(0x27c)][_0x403a11(0x487)]();this[_0x403a11(0x422)]=_0x2fb54e[_0x403a11(0x442)],this['_lastAttachPictureMaxSize']=_0x2fb54e[_0x403a11(0x432)],this[_0x403a11(0x2df)]=_0x2fb54e[_0x403a11(0x269)];if(_0x2fb54e[_0x403a11(0x442)]!==''){const _0x1a2dcf=_0x2c7c26[_0x403a11(0x11a)](_0x2fb54e['filename']);_0x1a2dcf['addLoadListener'](this[_0x403a11(0x406)][_0x403a11(0x111)](this,_0x1a2dcf));}else this[_0x403a11(0x5de)]['bitmap']=new _0x5496a9(0x1,0x1);}else this[_0x403a11(0x244)]=!![];}_0x1596b[_0x403a11(0x447)](/<CLICK TRIGGER>/i)&&(this[_0x403a11(0x5e1)]=!![]);_0x1596b[_0x403a11(0x447)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x403a11(0x525)]=Number(RegExp['$1'])||0x0);_0x1596b[_0x403a11(0x447)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x403a11(0x261)]()[_0x403a11(0x1c1)](),this[_0x403a11(0x224)][_0x403a11(0x473)]=type,this['_encounterHalfProximity']['distance']=Number(RegExp['$2']));_0x1596b[_0x403a11(0x447)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(_0x403a11(0x108)===_0x403a11(0x108)?(type=String(RegExp['$1'])[_0x403a11(0x261)]()[_0x403a11(0x1c1)](),this[_0x403a11(0x4c4)][_0x403a11(0x473)]=type,this[_0x403a11(0x4c4)]['distance']=Number(RegExp['$2'])):_0x2120b9=0x6);const _0x3270b2=_0x1596b[_0x403a11(0x447)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x3270b2)for(const _0x532d4d of _0x3270b2){if(_0x403a11(0x353)!=='BhryE')_0xf97bc0===_0x403a11(0xe8)?this[_0x403a11(0x3c5)]():this['turnRight90']();else{if(_0x532d4d[_0x403a11(0x447)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x4478db=String(RegExp['$1'])[_0x403a11(0x261)]()['trim'](),_0x10320b=Number(RegExp['$2']);this[_0x403a11(0x271)][_0x4478db]=_0x10320b;}}}_0x1596b['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x403a11(0x4cf)][_0x403a11(0x636)]=Number(RegExp['$1']));_0x1596b[_0x403a11(0x447)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x403a11(0x4cf)][_0x403a11(0x242)]=Number(RegExp['$1']));if(_0x1596b[_0x403a11(0x447)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if('GayYX'!==_0x403a11(0xcc)){const _0x406fed=this[_0x403a11(0x576)]+_0x11d34e[_0x403a11(0x594)](_0x5d461c(_0x147c5a['$1'])/0x64*0xff);return this[_0x403a11(0x1d9)](_0x406fed[_0x403a11(0x17b)](0x0,0xff));}else this[_0x403a11(0x4cf)][_0x403a11(0x47e)]=Number(RegExp['$1']);}if(_0x1596b[_0x403a11(0x447)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x403a11(0x1dc)==='QvBjp')return{'iconIndex':0x0,'bufferX':_0x211457['Icon']['BufferX'],'bufferY':_0x1c279a[_0x403a11(0x59a)]['BufferY'],'blendMode':_0x161fd1[_0x403a11(0x59a)][_0x403a11(0xd4)]};else this['_eventIcon'][_0x403a11(0x242)]=Number(RegExp['$1']),this[_0x403a11(0x4cf)][_0x403a11(0x47e)]=Number(RegExp['$2']);}if(_0x1596b[_0x403a11(0x447)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x520ce9=String(RegExp['$1'])[_0x403a11(0x363)]()[_0x403a11(0x1c1)](),_0x2a2409=[_0x403a11(0x409),'ADDITIVE',_0x403a11(0x311),_0x403a11(0x1a9)];this[_0x403a11(0x4cf)][_0x403a11(0x470)]=_0x2a2409[_0x403a11(0x119)](_0x520ce9)['clamp'](0x0,0x3);}$gameSystem[_0x403a11(0x4f3)](this,this[_0x403a11(0x4cf)][_0x403a11(0x636)],this[_0x403a11(0x4cf)]['bufferX'],this[_0x403a11(0x4cf)]['bufferY'],this[_0x403a11(0x4cf)][_0x403a11(0x470)]);if(_0x1596b[_0x403a11(0x447)](/<LABEL:[ ](.*?)>/i)){let _0x2cd002=String(RegExp['$1'])['trim']();this['_labelWindow'][_0x403a11(0x1af)]=_0x2cd002,this['_labelWindow']['originalText']=_0x2cd002;}if(_0x1596b['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x403a11(0x4bb)!=='Cltnb'){let _0x50781b=String(RegExp['$1'])['trim']();this[_0x403a11(0x240)]['text']=_0x50781b,this[_0x403a11(0x240)][_0x403a11(0x542)]=_0x50781b;}else _0x1c6b72[_0x403a11(0x5fc)]()?this[_0x403a11(0x1bc)](_0x1ff73d):_0x53586e[_0x403a11(0x543)][_0x403a11(0x586)]['call'](this,_0x5cce31);}_0x1596b[_0x403a11(0x447)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x403a11(0x2f6)]=Number(RegExp['$1']));if(_0x1596b['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x403a11(0xf0)==='BzeUp')this[_0x403a11(0x240)][_0x403a11(0x515)]=Number(RegExp['$1']);else{const _0x591d3e=this['event']();return this[_0x403a11(0x10d)]()&&_0x591d3e[_0x403a11(0x291)]>=0x1&&_0x32cfae['isAdvancedSwitch'](_0x591d3e[_0x403a11(0x344)]);}}if(_0x1596b[_0x403a11(0x447)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('kAGGT'===_0x403a11(0x2ab)){const _0x59a041=_0x2466b1[_0x403a11(0x2ce)](this);if(!_0x59a041)return;const _0x291e61=_0x59a041[_0x403a11(0x3bc)][_0x403a11(0x363)]()['trim']();_0x291e61!=='UNTITLED'?this[_0x403a11(0x3f5)](_0x291e61,!![]):this['morphInto'](_0x59a041[_0x403a11(0x4dc)],_0x59a041[_0x403a11(0x2c4)],!![]);}else this['_labelWindow']['offsetX']=Number(RegExp['$1']),this['_labelWindow'][_0x403a11(0x515)]=Number(RegExp['$2']);}_0x1596b[_0x403a11(0x447)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x403a11(0x240)]['hueShift']=Number(RegExp['$1']));this[_0x403a11(0x3e3)]();_0x1596b[_0x403a11(0x447)](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow'][_0x403a11(0x228)]=Number(RegExp['$1']));if(_0x1596b['match'](/<MIRROR SPRITE>/i)){if(_0x403a11(0x19c)===_0x403a11(0x19c))this['_mirrorSprite']=!![];else{if(this[_0x403a11(0x484)]===_0x2c7028)this[_0x403a11(0x596)]();return this[_0x403a11(0x484)];}}if(_0x1596b[_0x403a11(0x447)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x173370=JSON[_0x403a11(0x3a1)]('['+RegExp['$1'][_0x403a11(0x447)](/\d+/g)+']');this[_0x403a11(0x301)]=this[_0x403a11(0x301)][_0x403a11(0x1fc)](_0x173370),this['_moveOnlyRegions'][_0x403a11(0x145)](0x0);}if(_0x1596b[_0x403a11(0x447)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x403a11(0x5ca)!==_0x403a11(0x410)){const _0x52fde2=String(RegExp['$1']);if(_0x52fde2['match'](/PLAYER/i))this['_moveSynch']['target']=0x0;else{if(_0x52fde2[_0x403a11(0x447)](/EVENT[ ](\d+)/i)){if(_0x403a11(0x310)!==_0x403a11(0x35e))this['_moveSynch'][_0x403a11(0x4e6)]=Number(RegExp['$1']);else return _0x4098a5[_0x403a11(0x2f4)](this),_0x488d81[_0x403a11(0x543)][_0x403a11(0x352)][_0x403a11(0x437)](this,_0x434577);}}}else this['_randomMoveWeight']=_0x49fd18(_0x55fc63['$1'])||0x0;}_0x1596b[_0x403a11(0x447)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch'][_0x403a11(0x473)]=String(RegExp['$1'])[_0x403a11(0x261)]()['trim']());if(_0x1596b['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x403a11(0x2f5)===_0x403a11(0x8c)){let _0x1694cb=_0x579b59[_0x403a11(0x3a6)]();if(_0x1694cb>0x0)return _0x1eb542[_0x403a11(0x268)]()[_0x403a11(0x41f)](_0x1694cb-0x1);}else this[_0x403a11(0x42a)][_0x403a11(0x30e)]=Number(RegExp['$1']);}_0x1596b[_0x403a11(0x447)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x403a11(0x42a)]['opacityDelta']=Number(RegExp['$1']));if(_0x1596b[_0x403a11(0x447)](/<TRUE RANDOM MOVE>/i))this[_0x403a11(0x493)]=0x0;else _0x1596b[_0x403a11(0x447)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(_0x403a11(0xc5)===_0x403a11(0x4c2)?(this[_0x403a11(0x4da)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x403a11(0x415)]={},this[_0x403a11(0x511)]=[],this[_0x403a11(0xc1)]={},this[_0x403a11(0x14b)]={},this[_0x403a11(0x3c4)]=![],this[_0x403a11(0x22a)]='default'):this[_0x403a11(0x493)]=Number(RegExp['$1'])||0x0);_0x1596b['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x403a11(0x623)]=!![]);_0x1596b['match'](/<SCALE X:[ ](\d+)([%％])>/i)&&(this['_scaleBaseX']=Number(RegExp['$1'])*0.01);_0x1596b[_0x403a11(0x447)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x403a11(0x517)]=Number(RegExp['$1'])*0.01);if(_0x1596b[_0x403a11(0x447)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x5aedce=Number(RegExp['$1'])*0.01;this[_0x403a11(0x491)]=_0x5aedce,this[_0x403a11(0x517)]=_0x5aedce;}_0x1596b[_0x403a11(0x447)](/<HIDE SHADOW>/i)&&(this['_shadowGraphic'][_0x403a11(0x21e)]=![]),_0x1596b[_0x403a11(0x447)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x403a11(0x337)][_0x403a11(0x442)]=String(RegExp['$1'])),_0x1596b[_0x403a11(0x447)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&('CuzYh'===_0x403a11(0x5d2)?this[_0x403a11(0x4b3)]=Number(RegExp['$1']):_0x15f8cc=![]),_0x1596b[_0x403a11(0x447)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1'])),_0x1596b[_0x403a11(0x447)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x403a11(0x4b3)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0x1596b[_0x403a11(0x447)](/<STEP PATTERN:[ ](.*)>/i)&&(_0x403a11(0x396)===_0x403a11(0x396)?this[_0x403a11(0x177)]=String(RegExp['$1'])[_0x403a11(0x363)]()['trim']():_0x2b2941['EventsMoveCore'][_0x403a11(0x45c)][_0x403a11(0x437)](this,_0x5ce85d));},Game_Event[_0x270971(0xa1)][_0x270971(0x3e3)]=function(){const _0x1f901f=_0x270971;$gameTemp[_0x1f901f(0x35b)](this),this['_labelWindow']['text']=this[_0x1f901f(0x240)][_0x1f901f(0x542)];for(;;){if(this[_0x1f901f(0x240)][_0x1f901f(0x1af)][_0x1f901f(0x447)](/\\V\[(\d+)\]/gi)){if(_0x1f901f(0x5d8)==='IIbrz')this[_0x1f901f(0x240)]['text']=this['_labelWindow'][_0x1f901f(0x542)][_0x1f901f(0x17a)](/\\V\[(\d+)\]/gi,(_0x1afba9,_0x511b96)=>$gameVariables[_0x1f901f(0x481)](parseInt(_0x511b96)));else{const _0x926b3=_0x1bdfc5[_0x1f901f(0x4ba)][_0x2b2289];_0x926b3&&(_0x519c47['mapId']=_0x926b3[_0x1f901f(0x8d)],_0x420eda[_0x1f901f(0x2c4)]=_0x926b3['EventID']);}}else break;}$gameTemp['clearSelfTarget']();},Game_Event['prototype'][_0x270971(0x57f)]=function(){this['updateShadowChanges']();},Game_Event[_0x270971(0xa1)]['isNearTheScreen']=function(){const _0x1f5580=_0x270971;if(this[_0x1f5580(0x244)])return!![];return Game_Character[_0x1f5580(0xa1)][_0x1f5580(0x2a6)][_0x1f5580(0x437)](this);},VisuMZ[_0x270971(0x543)][_0x270971(0x518)]=Game_Event['prototype']['updateSelfMovement'],Game_Event[_0x270971(0xa1)][_0x270971(0x1c5)]=function(){const _0x1a5b72=_0x270971;if(this[_0x1a5b72(0x2ef)]())return;VisuMZ[_0x1a5b72(0x543)][_0x1a5b72(0x518)][_0x1a5b72(0x437)](this),this[_0x1a5b72(0xd8)]()&&VisuMZ[_0x1a5b72(0x5cc)](this[_0x1a5b72(0x8a)]);},Game_Event[_0x270971(0xa1)][_0x270971(0x2ef)]=function(){const _0x3a9697=_0x270971,_0x54c6de=VisuMZ[_0x3a9697(0x543)]['Settings'][_0x3a9697(0x42b)];if($gameMap['isEventRunning']()&&_0x54c6de[_0x3a9697(0x40c)])return!![];if($gameMessage[_0x3a9697(0x5ae)]()&&_0x54c6de[_0x3a9697(0x34c)])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this[_0x3a9697(0x49e)]()>=0x0)return!![];if(!SceneManager[_0x3a9697(0x3e0)]['_active'])return!![];return![];},Game_Event[_0x270971(0xa1)][_0x270971(0x134)]=function(){const _0x3703ab=_0x270971,_0x93eca3=SceneManager[_0x3703ab(0x3e0)]['_spriteset'];if(_0x93eca3){const _0x255066=_0x93eca3[_0x3703ab(0x5c0)](this);_0x255066&&_0x255066[_0x3703ab(0x1da)]&&_0x255066[_0x3703ab(0x1da)][_0x3703ab(0x4e8)]!==this[_0x3703ab(0x1c4)]()&&(_0x255066[_0x3703ab(0x1da)][_0x3703ab(0x4e8)]=this[_0x3703ab(0x1c4)](),_0x255066['_shadowSprite'][_0x3703ab(0x4ce)]=ImageManager[_0x3703ab(0x471)](_0x255066[_0x3703ab(0x1da)][_0x3703ab(0x4e8)]));}},Game_Event['prototype'][_0x270971(0x1c4)]=function(){const _0x37d507=_0x270971;return this[_0x37d507(0x337)][_0x37d507(0x442)];},Game_Event[_0x270971(0xa1)]['isShadowVisible']=function(){const _0x427675=_0x270971;if(!this[_0x427675(0x337)]['visible'])return![];return Game_CharacterBase['prototype']['isShadowVisible'][_0x427675(0x437)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0x3de)]=function(){const _0x264358=_0x270971;return this[_0x264358(0x240)][_0x264358(0x1af)];},Game_Event['prototype'][_0x270971(0x14e)]=function(){const _0x2d194f=_0x270971;return this[_0x2d194f(0x240)][_0x2d194f(0x228)];},Game_Event[_0x270971(0xa1)]['isMapPassable']=function(_0x1879c5,_0x3dc97b,_0x14cd29){const _0x5812f0=_0x270971;if(this[_0x5812f0(0x1dd)]())return this[_0x5812f0(0x112)](_0x1879c5,_0x3dc97b,_0x14cd29);if($gameMap[_0x5812f0(0x4d1)](_0x1879c5,_0x3dc97b,_0x14cd29,_0x5812f0(0x22b)))return!![];if($gameMap[_0x5812f0(0x378)](_0x1879c5,_0x3dc97b,_0x14cd29,_0x5812f0(0x22b)))return![];return Game_Character[_0x5812f0(0xa1)][_0x5812f0(0x585)]['call'](this,_0x1879c5,_0x3dc97b,_0x14cd29);},Game_Event['prototype']['hasMoveOnlyRegions']=function(){const _0x38626e=_0x270971;if(this[_0x38626e(0x301)]===undefined)this[_0x38626e(0x3af)]();return this[_0x38626e(0x301)][_0x38626e(0x531)]>0x0;},Game_Event['prototype'][_0x270971(0x112)]=function(_0x521073,_0x3d7673,_0x104942){const _0x2f2316=_0x270971,_0x45b123=$gameMap[_0x2f2316(0x62c)](_0x521073,_0x104942),_0x579484=$gameMap[_0x2f2316(0x150)](_0x3d7673,_0x104942),_0x212b1e=$gameMap['regionId'](_0x45b123,_0x579484);return this[_0x2f2316(0x301)][_0x2f2316(0x3fc)](_0x212b1e);},VisuMZ[_0x270971(0x543)][_0x270971(0x275)]=Game_Event[_0x270971(0xa1)][_0x270971(0x3f9)],Game_Event[_0x270971(0xa1)][_0x270971(0x3f9)]=function(){const _0x3c65ad=_0x270971;if(this['event']()&&!$gameTemp[_0x3c65ad(0x4ed)]()){if(this['event']()[_0x3c65ad(0x3f7)][_0x3c65ad(0x447)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x3c65ad(0x163)]=![],this['_CPCs']=![],this['event']()?VisuMZ[_0x3c65ad(0x543)][_0x3c65ad(0x275)]['call'](this):-0x1;},VisuMZ[_0x270971(0x543)][_0x270971(0x379)]=Game_Event[_0x270971(0xa1)][_0x270971(0x230)],Game_Event[_0x270971(0xa1)]['meetsConditions']=function(_0x288f8a){const _0x3b5ffa=_0x270971;this[_0x3b5ffa(0x125)](_0x288f8a),$gameTemp[_0x3b5ffa(0x35b)](this);const _0x2ecbac=VisuMZ[_0x3b5ffa(0x543)][_0x3b5ffa(0x379)][_0x3b5ffa(0x437)](this,_0x288f8a);return $gameTemp[_0x3b5ffa(0x152)](),_0x2ecbac;},Game_Event[_0x270971(0xa1)][_0x270971(0x575)]=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x270971(0xa1)][_0x270971(0x125)]=function(_0x2a7e3c){const _0x2a61f6=_0x270971,_0x288dcc=_0x2a7e3c['conditions'];if(_0x288dcc[_0x2a61f6(0x34d)]&&DataManager[_0x2a61f6(0x1ab)](_0x288dcc[_0x2a61f6(0x1f1)]))this[_0x2a61f6(0x163)]=!![];else{if(_0x288dcc[_0x2a61f6(0x287)]&&DataManager[_0x2a61f6(0x1ab)](_0x288dcc[_0x2a61f6(0x3fd)]))_0x2a61f6(0x1df)!==_0x2a61f6(0x618)?this['_advancedSwitchVariable']=!![]:this['updateSaveEventLocation']();else _0x288dcc[_0x2a61f6(0x101)]&&DataManager[_0x2a61f6(0x1c0)](_0x288dcc[_0x2a61f6(0x503)])&&(this[_0x2a61f6(0x163)]=!![]);}},Game_Event[_0x270971(0xa1)][_0x270971(0x381)]=function(){const _0x935405=_0x270971;if(this[_0x935405(0xbb)])return![];return this[_0x935405(0x5e1)];},Game_Event[_0x270971(0xa1)]['onClickTrigger']=function(){const _0x53036d=_0x270971;$gameTemp[_0x53036d(0x159)](),this[_0x53036d(0x40d)]();},Game_Event[_0x270971(0xa1)]['pos']=function(_0x5a71bf,_0x43b1ca){const _0x4fbe72=_0x270971;if(this[_0x4fbe72(0x271)]){if('CTPpl'==='ppohH'){if(_0x438649>this['x']&&this[_0x4fbe72(0x45a)](this['x'],this['y'],0x6))_0x20ed55=0x9;if(_0x2c0a70<this['x']&&this[_0x4fbe72(0x45a)](this['x'],this['y'],0x4))_0x2be2a1=0x7;}else return this[_0x4fbe72(0x2e4)](_0x5a71bf,_0x43b1ca);}else return Game_Character[_0x4fbe72(0xa1)][_0x4fbe72(0x52b)]['call'](this,_0x5a71bf,_0x43b1ca);},Game_Event[_0x270971(0xa1)][_0x270971(0x2e4)]=function(_0x54adbe,_0x1e1978){const _0x3ecc14=_0x270971;var _0x2e4812=this['x']-this['_addedHitbox'][_0x3ecc14(0xe8)],_0x46b603=this['x']+this[_0x3ecc14(0x271)][_0x3ecc14(0x2b0)],_0x5b6ad1=this['y']-this[_0x3ecc14(0x271)]['up'],_0x901b74=this['y']+this['_addedHitbox'][_0x3ecc14(0x1d4)];return _0x2e4812<=_0x54adbe&&_0x54adbe<=_0x46b603&&_0x5b6ad1<=_0x1e1978&&_0x1e1978<=_0x901b74;},Game_Event['prototype']['canPass']=function(_0x45a1f9,_0x190ff3,_0x466d89){const _0x2aef45=_0x270971;for(let _0x3c4f7b=-this['_addedHitbox'][_0x2aef45(0xe8)];_0x3c4f7b<=this[_0x2aef45(0x271)]['right'];_0x3c4f7b++){for(let _0x196050=-this[_0x2aef45(0x271)]['up'];_0x196050<=this[_0x2aef45(0x271)]['down'];_0x196050++){if(_0x2aef45(0x34a)!=='bXpIZ')_0x46c0d0(_0x2aef45(0x4e7)[_0x2aef45(0x27e)](_0x27ea99,_0x2a0ff9)),_0x22f267[_0x2aef45(0x48c)]();else{if(!Game_Character['prototype'][_0x2aef45(0x45a)][_0x2aef45(0x437)](this,_0x45a1f9+_0x3c4f7b,_0x190ff3+_0x196050,_0x466d89))return'DWLgH'==='DWLgH'?![]:this[_0x2aef45(0x44d)]('left');}}}return!![];},Game_Event[_0x270971(0xa1)][_0x270971(0x209)]=function(_0x10473b,_0x58e2f4){const _0x3c00cf=_0x270971;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x3c00cf(0x29b)]()){if(_0x3c00cf(0x26b)!==_0x3c00cf(0x26b)){if(this[_0x3c00cf(0x4da)]===_0x464864)this[_0x3c00cf(0x1f8)]();if(this[_0x3c00cf(0x4da)][_0x3c00cf(0x631)]===_0x25334e)this[_0x3c00cf(0x1f8)]();this['_EventsMoveCoreSettings'][_0x3c00cf(0x631)]=_0x483a1c;}else return this[_0x3c00cf(0x5fa)](_0x10473b,_0x58e2f4);}else{const _0x35d160=$gameMap[_0x3c00cf(0x5e5)](_0x10473b,_0x58e2f4)[_0x3c00cf(0x49b)](_0x594e33=>_0x594e33!==this);return _0x35d160[_0x3c00cf(0x531)]>0x0;}},Game_Event[_0x270971(0xa1)][_0x270971(0x5fa)]=function(_0x1ed125,_0x1f6174){const _0x4712e5=_0x270971;if(!this[_0x4712e5(0x118)]()){if(_0x4712e5(0x456)==='pGucX')return![];else _0x35cb3f[_0x4712e5(0x5d7)](_0x2e1241,!!_0x5396aa);}else{const _0x488512=$gameMap[_0x4712e5(0x5e5)](_0x1ed125,_0x1f6174)[_0x4712e5(0x49b)](_0x57cc69=>_0x57cc69!==this&&_0x57cc69[_0x4712e5(0x118)]());return _0x488512[_0x4712e5(0x531)]>0x0;}},Game_Event['prototype'][_0x270971(0x326)]=function(){const _0x39b2d8=_0x270971;if(!this[_0x39b2d8(0x580)])return _0x39b2d8(0xdc);return this['_activationProximity'][_0x39b2d8(0x473)]||'none';},Game_Event['prototype'][_0x270971(0x475)]=function(){const _0x2e8ddc=_0x270971;if(!this[_0x2e8ddc(0x580)])return 0x0;return this[_0x2e8ddc(0x580)][_0x2e8ddc(0x41b)]||0x0;},Game_Event['prototype'][_0x270971(0x103)]=function(){const _0x4a9250=_0x270971;if(!this[_0x4a9250(0x580)])return[];return this[_0x4a9250(0x580)][_0x4a9250(0xf8)]||[];},Game_Event[_0x270971(0xa1)]['increaseSteps']=function(){const _0x32fc91=_0x270971;Game_Character['prototype']['increaseSteps'][_0x32fc91(0x437)](this);if([_0x32fc91(0xdc),_0x32fc91(0x3da)][_0x32fc91(0x3fc)](this[_0x32fc91(0x326)]()))return;$gamePlayer[_0x32fc91(0x186)]([0x2]);},VisuMZ[_0x270971(0x543)]['Game_Event_checkEventTriggerAuto']=Game_Event['prototype'][_0x270971(0x44b)],Game_Event[_0x270971(0xa1)][_0x270971(0x44b)]=function(){const _0x39b713=_0x270971;if(this[_0x39b713(0x5aa)]!==0x3)return;if(this[_0x39b713(0x283)])return;if(!this[_0x39b713(0xe7)](![]))return;if(!this[_0x39b713(0x5e0)](![]))return;VisuMZ['EventsMoveCore'][_0x39b713(0x365)][_0x39b713(0x437)](this);},VisuMZ['EventsMoveCore']['Game_Event_updateParallel']=Game_Event[_0x270971(0xa1)][_0x270971(0x579)],Game_Event[_0x270971(0xa1)]['updateParallel']=function(){const _0x39b323=_0x270971;if(!this[_0x39b323(0xe6)])return;if(!this[_0x39b323(0xe7)](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ['EventsMoveCore'][_0x39b323(0x2c0)][_0x39b323(0x437)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0xe7)]=function(_0x321e81){const _0x589ed7=_0x270971;if(!_0x321e81&&$gameMap[_0x589ed7(0x21a)]())return![];if(!_0x321e81&&$gameMap[_0x589ed7(0x1c6)]())return![];if(this[_0x589ed7(0x103)]()<=0x0)return!![];return $gamePlayer[_0x589ed7(0x1ff)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0x5e0)]=function(_0x560887){const _0x9e53d3=_0x270971;if(!_0x560887&&$gameMap[_0x9e53d3(0x21a)]())return![];if(!_0x560887&&$gameMap[_0x9e53d3(0x1c6)]())return![];if([_0x9e53d3(0xdc),_0x9e53d3(0x3da)]['includes'](this[_0x9e53d3(0x326)]()))return!![];return $gamePlayer[_0x9e53d3(0x49c)](this);},Game_Event[_0x270971(0xa1)]['encounterProximityType']=function(_0x1bf492){const _0x48ce71=_0x270971,_0x3d0098=_0x1bf492?this[_0x48ce71(0x224)]:this[_0x48ce71(0x4c4)];return _0x3d0098?_0x3d0098[_0x48ce71(0x473)]:_0x48ce71(0xdc);},Game_Event[_0x270971(0xa1)][_0x270971(0x2c6)]=function(_0x899ddb){const _0x1649c=_0x899ddb?this['_encounterHalfProximity']:this['_encounterNoneProximity'];return _0x1649c?_0x1649c['distance']:0x0;},VisuMZ[_0x270971(0x5cc)]=function(_0x4ce4db){const _0x28b823=_0x270971;for(const _0x46b779 of $gameMap[_0x28b823(0x1b6)]()){if(!_0x46b779)continue;_0x46b779[_0x28b823(0x49e)]()===_0x4ce4db&&_0x46b779[_0x28b823(0x461)]();}},VisuMZ['GetMoveSynchTarget']=function(_0x1d9453){const _0x5c8cc3=_0x270971;if(_0x1d9453===0x0)return $gamePlayer;return $gameMap[_0x5c8cc3(0x22b)](_0x1d9453);},Game_CharacterBase['prototype'][_0x270971(0x100)]=function(){},Game_Event[_0x270971(0xa1)]['updateMoveSynchDirection']=function(){const _0x19a3a1=_0x270971;VisuMZ[_0x19a3a1(0xb9)](this[_0x19a3a1(0x8a)]);},VisuMZ[_0x270971(0xb9)]=function(_0x32c75f){const _0x3ac478=_0x270971;for(const _0x5ac03c of $gameMap[_0x3ac478(0x1b6)]()){if('hwuIw'==='iHoWA'){let _0x129a74=this[_0x3ac478(0x1ba)];return this[_0x3ac478(0x52d)]()&&(_0x129a74+=this[_0x3ac478(0x4f8)]()),this[_0x3ac478(0x5b1)](_0x129a74);}else{if(!_0x5ac03c)continue;_0x5ac03c[_0x3ac478(0x49e)]()===_0x32c75f&&_0x5ac03c['processMoveSynchDirection']();}}},Game_Event[_0x270971(0xa1)]['moveSynchTarget']=function(){const _0x674bbe=_0x270971;return this[_0x674bbe(0x42a)][_0x674bbe(0x4e6)];},Game_Event[_0x270971(0xa1)][_0x270971(0x3b4)]=function(){const _0x43fed2=_0x270971;return this[_0x43fed2(0x42a)][_0x43fed2(0x473)];},Game_Event[_0x270971(0xa1)]['realMoveSpeed']=function(){const _0x327b25=_0x270971;if(this[_0x327b25(0x49e)]()>=0x0){const _0x1e705e=VisuMZ['GetMoveSynchTarget'](this[_0x327b25(0x49e)]());if(_0x1e705e)return _0x1e705e[_0x327b25(0x2f9)]();}return Game_Character['prototype'][_0x327b25(0x2f9)][_0x327b25(0x437)](this);},Game_Event['prototype']['updateMoveSynch']=function(){const _0x2daa8d=_0x270971;this[_0x2daa8d(0x42a)]['timer']=this[_0x2daa8d(0x42a)][_0x2daa8d(0x567)]||0x0,this[_0x2daa8d(0x42a)][_0x2daa8d(0x567)]--;if(this[_0x2daa8d(0x42a)][_0x2daa8d(0x567)]>0x0)return;this[_0x2daa8d(0x42a)][_0x2daa8d(0x567)]=this[_0x2daa8d(0x42a)][_0x2daa8d(0x30e)],this[_0x2daa8d(0x234)]();},Game_Event['prototype'][_0x270971(0x591)]=function(_0x2962e0){const _0x29f17d=_0x270971;if(this[_0x29f17d(0x49e)]()>=0x0){if(_0x29f17d(0xf9)===_0x29f17d(0x534))return _0x1802a6['EventsMoveCore'][_0x29f17d(0xab)][_0x29f17d(0x437)](this);else{const _0x374eab=VisuMZ[_0x29f17d(0x2d5)](this[_0x29f17d(0x49e)]());if(_0x374eab){const _0x2da275=$gameMap[_0x29f17d(0x41b)](this[_0x29f17d(0x3d8)],this[_0x29f17d(0x5b3)],_0x374eab[_0x29f17d(0x3d8)],_0x374eab['_realY'])-0x1,_0x5c3b26=Math[_0x29f17d(0x16f)]($gameMap[_0x29f17d(0xd6)](),$gameMap[_0x29f17d(0x1d7)]()),_0x1bd96d=this[_0x29f17d(0x42a)][_0x29f17d(0x615)]||0x0;_0x2962e0-=Math[_0x29f17d(0x60f)](0x0,_0x2da275)*_0x5c3b26*_0x1bd96d;}}}return _0x2962e0;},Game_Event[_0x270971(0xa1)][_0x270971(0x234)]=function(){const _0x340ea5=_0x270971;switch(this[_0x340ea5(0x3b4)]()){case'random':this[_0x340ea5(0x627)]();break;case _0x340ea5(0x465):this[_0x340ea5(0x3a8)]();break;case _0x340ea5(0x1f3):this[_0x340ea5(0x38d)]();break;case _0x340ea5(0x43e):this['processMoveSynchCustom']();break;case'mimic':case _0x340ea5(0x23e):this[_0x340ea5(0x14d)]();break;case'reverse\x20mimic':case'reverse\x20copy':this['processMoveSynchReverseMimic']();break;case _0x340ea5(0x1aa):case'horizontal\x20mirror':case _0x340ea5(0x554):case'horz\x20mirror':this[_0x340ea5(0x31c)]();break;case _0x340ea5(0x30b):case _0x340ea5(0x4c9):case _0x340ea5(0x1e2):case _0x340ea5(0x9c):this['processMoveSynchMirrorVert']();break;default:this[_0x340ea5(0x627)]();break;}this[_0x340ea5(0x424)]();},Game_Event['prototype'][_0x270971(0x627)]=function(){const _0x3b7760=_0x270971,_0x31176d=[0x2,0x4,0x6,0x8];$gameMap[_0x3b7760(0x5fc)]()&&_0x31176d[_0x3b7760(0x1bd)](0x1,0x3,0x7,0x9);const _0x3c3b16=[];for(const _0x4c45c8 of _0x31176d){if(_0x3b7760(0x219)===_0x3b7760(0x219)){if(this[_0x3b7760(0x45a)](this['x'],this['y'],_0x4c45c8))_0x3c3b16[_0x3b7760(0x1bd)](_0x4c45c8);}else _0x5c58cc['EventsMoveCore'][_0x3b7760(0x151)]['call'](this),this[_0x3b7760(0x328)]();}if(_0x3c3b16[_0x3b7760(0x531)]>0x0){const _0x5cf197=_0x3c3b16[Math[_0x3b7760(0x10f)](_0x3c3b16[_0x3b7760(0x531)])];this['executeMoveDir8'](_0x5cf197);}},Game_Event[_0x270971(0xa1)][_0x270971(0x3a8)]=function(){const _0x2f1516=_0x270971,_0x46de2a=VisuMZ[_0x2f1516(0x2d5)](this[_0x2f1516(0x49e)]());this[_0x2f1516(0x1ef)](_0x46de2a);},Game_Event['prototype'][_0x270971(0x38d)]=function(){const _0x5a39f8=_0x270971,_0x2613cc=VisuMZ[_0x5a39f8(0x2d5)](this['moveSynchTarget']());this['moveAwayFromCharacter'](_0x2613cc);},Game_Event[_0x270971(0xa1)][_0x270971(0x338)]=function(){this['updateRoutineMove']();},Game_Event['prototype'][_0x270971(0x14d)]=function(){const _0x1f09a5=_0x270971,_0xd5a15b=VisuMZ[_0x1f09a5(0x2d5)](this[_0x1f09a5(0x49e)]());this[_0x1f09a5(0x1bc)](_0xd5a15b[_0x1f09a5(0x488)]());},Game_Event[_0x270971(0xa1)][_0x270971(0x322)]=function(){const _0xbed930=_0x270971,_0x4c1236=VisuMZ[_0xbed930(0x2d5)](this['moveSynchTarget']());this[_0xbed930(0x1bc)](this[_0xbed930(0x2ff)](_0x4c1236[_0xbed930(0x488)]()));},Game_Event[_0x270971(0xa1)][_0x270971(0x31c)]=function(){const _0x3593c2=_0x270971,_0x1908f2=VisuMZ[_0x3593c2(0x2d5)](this[_0x3593c2(0x49e)]()),_0x1b0da1=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x1908f2[_0x3593c2(0x488)]()];this[_0x3593c2(0x1bc)](_0x1b0da1);},Game_Event['prototype']['processMoveSynchMirrorVert']=function(){const _0x32f36e=_0x270971,_0x56dcc1=VisuMZ[_0x32f36e(0x2d5)](this[_0x32f36e(0x49e)]()),_0xdafdc0=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x56dcc1['lastMovedDirection']()];this['executeMoveDir8'](_0xdafdc0);},Game_Event[_0x270971(0xa1)]['processMoveSynchDirection']=function(){const _0x7dc25b=_0x270971,_0xfbbb7d=VisuMZ[_0x7dc25b(0x2d5)](this['moveSynchTarget']()),_0x415ab2=_0xfbbb7d[_0x7dc25b(0x3b9)]();switch(this[_0x7dc25b(0x3b4)]()){case'mimic':case _0x7dc25b(0x23e):this['setDirection'](_0x415ab2);break;case _0x7dc25b(0xc3):case _0x7dc25b(0x2a9):this['setDirection'](this['reverseDir'](_0x415ab2));break;case'mirror\x20horizontal':case'horizontal\x20mirror':case'mirror\x20horz':case _0x7dc25b(0x25a):this[_0x7dc25b(0x12a)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x415ab2]);break;case'mirror\x20vertical':case'vertical\x20mirror':case'mirror\x20vert':case _0x7dc25b(0x9c):this[_0x7dc25b(0x12a)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x415ab2]);break;default:return;}this['update']();},Game_Event[_0x270971(0xa1)][_0x270971(0x3d3)]=function(){const _0x1dab19=_0x270971,_0x59dfa9=$gameSystem['getSavedEventLocation'](this);if(!_0x59dfa9)return;this['setPosition'](_0x59dfa9['x'],_0x59dfa9['y']),this['refreshBushDepth'](),this['setDirection'](_0x59dfa9['direction']),this[_0x1dab19(0x584)]===_0x59dfa9[_0x1dab19(0x37c)]&&(this[_0x1dab19(0x572)]=_0x59dfa9[_0x1dab19(0x1a7)]);},VisuMZ['EventsMoveCore']['Game_Event_update']=Game_Event['prototype'][_0x270971(0x424)],Game_Event['prototype'][_0x270971(0x424)]=function(){const _0x518a69=_0x270971;VisuMZ[_0x518a69(0x543)][_0x518a69(0x57d)]['call'](this);if(!Utils[_0x518a69(0x24c)]()){if(_0x518a69(0x296)==='dSPpa')this['updateSaveEventLocation']();else{const _0x277893=_0x58784[_0x518a69(0x553)][_0x518a69(0x4dc)],_0x5c1464=_0x390b68[_0x518a69(0x553)][_0x518a69(0x2c4)];return _0x552671[_0x518a69(0x237)](_0x277893,_0x5c1464);}}},Game_Event[_0x270971(0xa1)][_0x270971(0x391)]=function(){const _0x105178=_0x270971;Game_Character[_0x105178(0xa1)]['updateMove'][_0x105178(0x437)](this),this[_0x105178(0x523)]();},Game_Event[_0x270971(0xa1)][_0x270971(0x2ed)]=function(){const _0x145873=_0x270971;if($gameMap[_0x145873(0x522)]())return!![];return this[_0x145873(0x623)];},Game_Event[_0x270971(0xa1)]['autosaveEventLocation']=function(){const _0x4cf4da=_0x270971;if(!this['isSaveEventLocation']())return;this[_0x4cf4da(0x53e)]();},Game_Event['prototype']['saveEventLocation']=function(){const _0x5f4723=_0x270971;this[_0x5f4723(0x41d)]=!![];},Game_Event['prototype'][_0x270971(0x104)]=function(){const _0x192918=_0x270971;this['_requestSaveEventLocation']&&this[_0x192918(0x16e)]();},Game_Event[_0x270971(0xa1)][_0x270971(0x16e)]=function(){const _0x5e973e=_0x270971;this['_requestSaveEventLocation']=![],$gameSystem[_0x5e973e(0x53e)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0x3f6)]=function(){const _0x3e5e4b=_0x270971;$gameSystem[_0x3e5e4b(0x3c9)](this);},Game_Event[_0x270971(0xa1)][_0x270971(0x28f)]=function(){const _0x55cd29=_0x270971;if($gameSystem['getEventIconData'](this)){if(_0x55cd29(0x3ca)!=='zncbR'){const _0x571318=this[_0x55cd29(0x2ff)](this['direction']());return _0x14e830[_0x55cd29(0x150)](this['y'],_0x571318);}else return Game_Character[_0x55cd29(0xa1)][_0x55cd29(0x28f)][_0x55cd29(0x437)](this);}else return{'iconIndex':0x0,'bufferX':settings[_0x55cd29(0x59a)][_0x55cd29(0x110)],'bufferY':settings[_0x55cd29(0x59a)][_0x55cd29(0x5ee)],'blendMode':settings['Icon'][_0x55cd29(0xd4)]};},Game_Event[_0x270971(0xa1)][_0x270971(0x448)]=function(){return this['_CPCs'];},VisuMZ[_0x270971(0x543)][_0x270971(0x2f1)]=Game_Event[_0x270971(0xa1)]['meetsConditions'],Game_Event[_0x270971(0xa1)][_0x270971(0x230)]=function(_0xd2dabd){const _0x258763=_0x270971,_0x2ed3e9=VisuMZ[_0x258763(0x543)][_0x258763(0x2f1)][_0x258763(0x437)](this,_0xd2dabd);if(!_0x2ed3e9)return![];return this[_0x258763(0x2ad)](_0xd2dabd);},Game_Event[_0x270971(0xa1)][_0x270971(0x2ad)]=function(_0x527618){const _0x4cdc64=_0x270971;VisuMZ[_0x4cdc64(0x543)]['CustomPageConditions'][_0x4cdc64(0x560)](_0x527618),this[_0x4cdc64(0x486)]=_0x527618['CPC'][_0x4cdc64(0x531)]>0x0;_0x527618[_0x4cdc64(0x4af)]===undefined&&(_0x4cdc64(0x3db)!=='ijPYl'?_0x24dffe+=_0x23c5c1[_0x4cdc64(0x16b)][0x0]:VisuMZ[_0x4cdc64(0x543)][_0x4cdc64(0x42d)][_0x4cdc64(0x560)](_0x527618));if(_0x527618[_0x4cdc64(0x4af)][_0x4cdc64(0x531)]>0x0)return $gameMap[_0x4cdc64(0x22b)](this['_eventId'])&&VisuMZ[_0x4cdc64(0x543)][_0x4cdc64(0x42d)][_0x4cdc64(0x216)](_0x527618[_0x4cdc64(0x4af)],this[_0x4cdc64(0x8a)]);return!![];},VisuMZ[_0x270971(0x543)]['Game_Troop_meetsConditionsCPC']=Game_Troop[_0x270971(0xa1)][_0x270971(0x230)],Game_Troop[_0x270971(0xa1)][_0x270971(0x230)]=function(_0x19d8d6){const _0x84750e=_0x270971;var _0x497994=VisuMZ[_0x84750e(0x543)][_0x84750e(0x5c3)][_0x84750e(0x437)](this,_0x19d8d6);return _0x497994&&this[_0x84750e(0x3a2)](_0x19d8d6);},Game_Troop[_0x270971(0xa1)]['CPCsMet']=function(_0x3ddf1f){const _0x4ed646=_0x270971;_0x3ddf1f[_0x4ed646(0x4af)]===undefined&&VisuMZ[_0x4ed646(0x543)][_0x4ed646(0x42d)][_0x4ed646(0x560)](_0x3ddf1f);if(_0x3ddf1f['CPC'][_0x4ed646(0x531)]>0x0)return VisuMZ[_0x4ed646(0x543)][_0x4ed646(0x42d)][_0x4ed646(0x216)](_0x3ddf1f[_0x4ed646(0x4af)],0x0);return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event['prototype'][_0x270971(0x329)],Game_Event[_0x270971(0xa1)][_0x270971(0x329)]=function(_0x21ca76,_0x1e8715){const _0x198767=_0x270971;VisuMZ[_0x198767(0x543)][_0x198767(0x272)][_0x198767(0x437)](this,_0x21ca76,_0x1e8715),this[_0x198767(0x2b4)]=_0x21ca76,this[_0x198767(0x5ac)]=_0x1e8715,this[_0x198767(0x523)]();},VisuMZ[_0x270971(0x543)]['Game_Event_moveTypeRandom']=Game_Event[_0x270971(0xa1)][_0x270971(0x524)],Game_Event[_0x270971(0xa1)]['moveTypeRandom']=function(){const _0x996438=_0x270971,_0x2eee0d=$gameMap[_0x996438(0x41b)](this['x'],this['y'],this[_0x996438(0x2b4)],this[_0x996438(0x5ac)]),_0x4a357e=_0x2eee0d*(this[_0x996438(0x493)]||0x0);Math[_0x996438(0x5ef)]()>=_0x4a357e?VisuMZ[_0x996438(0x543)][_0x996438(0x5e2)][_0x996438(0x437)](this):this[_0x996438(0x5d0)]();},Game_Event[_0x270971(0xa1)][_0x270971(0x5d0)]=function(){const _0x383420=_0x270971,_0x33fe06=this[_0x383420(0x504)](this[_0x383420(0x2b4)]),_0x4327b4=this['deltaYFrom'](this[_0x383420(0x5ac)]);if(Math[_0x383420(0x4ff)](_0x33fe06)>Math[_0x383420(0x4ff)](_0x4327b4)){if(_0x383420(0x4d5)!=='vPWwp'){if(_0x5cb686[_0x383420(0x447)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x4b3307=_0x639dc8(_0x3fe29f['$1'])[_0x383420(0x261)]()[_0x383420(0x1c1)](),_0x257428=_0x5ec946(_0x2922c7['$2']);this[_0x383420(0x271)][_0x4b3307]=_0x257428;}}else this['moveStraight'](_0x33fe06>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x4327b4!==0x0&&this['moveStraight'](_0x4327b4>0x0?0x8:0x2);}else _0x4327b4!==0x0&&(this[_0x383420(0x255)](_0x4327b4>0x0?0x8:0x2),!this[_0x383420(0x155)]()&&_0x33fe06!==0x0&&this[_0x383420(0x255)](_0x33fe06>0x0?0x4:0x6));},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x13a)]=function(){const _0x26d62f=_0x270971;this[_0x26d62f(0x3a9)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x487)]=function(){const _0x4b7d0f=_0x270971;if(this['_attachPicture']===undefined)this[_0x4b7d0f(0x13a)]();return this['_attachPicture'];},Game_CharacterBase['prototype'][_0x270971(0x90)]=function(){const _0x29355f=_0x270971;return this[_0x29355f(0x487)]()[_0x29355f(0x442)]??'';},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x2d8)]=function(){const _0x2bad91=_0x270971;return this[_0x2bad91(0x487)]()[_0x2bad91(0x470)]??0x0;},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x5b9)]=function(){const _0x5e231b=_0x270971;return this['attachPictureSettings']()[_0x5e231b(0x432)]??0x0;},Game_CharacterBase[_0x270971(0xa1)][_0x270971(0x169)]=function(){const _0x470c3c=_0x270971;return this[_0x470c3c(0x487)]()[_0x470c3c(0x2f6)]??0x0;},Game_CharacterBase['prototype'][_0x270971(0x619)]=function(){return this['attachPictureSettings']()['offsetY']??0x0;},Game_CharacterBase[_0x270971(0xa1)]['attachPictureScale']=function(){const _0x9d52a9=_0x270971;return this[_0x9d52a9(0x487)]()['scale']??0x1;},VisuMZ[_0x270971(0x543)][_0x270971(0xab)]=Game_Interpreter['prototype'][_0x270971(0x4ab)],Game_Interpreter['prototype'][_0x270971(0x4ab)]=function(){const _0x2bfc0b=_0x270971;if(this['_waitMode']==='CallEvent'){if(window[this[_0x2bfc0b(0x35c)]])this[_0x2bfc0b(0x501)]='',this['startCallEvent']();else return!![];}else{if(_0x2bfc0b(0x390)===_0x2bfc0b(0x390))return VisuMZ[_0x2bfc0b(0x543)][_0x2bfc0b(0xab)][_0x2bfc0b(0x437)](this);else{if(!_0x19e693[_0x2bfc0b(0x543)][_0x2bfc0b(0x412)]['Movement'][_0x2bfc0b(0x19f)])return;this[_0x2bfc0b(0x2d7)]=0x0;if(this[_0x2bfc0b(0x2da)]()){const _0x40af4b=_0x1607d6[_0x2bfc0b(0x543)][_0x2bfc0b(0x412)][_0x2bfc0b(0x42b)],_0x157da4=this['_character'][_0x2bfc0b(0x3b9)]();let _0x16afb5=0x0;if([0x1,0x4,0x7]['includes'](_0x157da4))_0x16afb5=_0x40af4b[_0x2bfc0b(0x5eb)];if([0x3,0x6,0x9]['includes'](_0x157da4))_0x16afb5=_0x40af4b[_0x2bfc0b(0x2e8)];[0x2,0x8][_0x2bfc0b(0x3fc)](_0x157da4)&&(_0x16afb5=[-_0x40af4b[_0x2bfc0b(0x583)],0x0,_0x40af4b[_0x2bfc0b(0x583)]][this['_character'][_0x2bfc0b(0x4dd)]()]);if(this[_0x2bfc0b(0x305)])_0x16afb5*=-0x1;this[_0x2bfc0b(0x2d7)]=_0x16afb5;}}}},VisuMZ[_0x270971(0x543)][_0x270971(0x58e)]=Game_Interpreter[_0x270971(0xa1)]['executeCommand'],Game_Interpreter[_0x270971(0xa1)][_0x270971(0x31d)]=function(){const _0x23ef8e=_0x270971,_0x273dec=$gameMap&&this[_0x23ef8e(0x8a)]?$gameMap[_0x23ef8e(0x22b)](this[_0x23ef8e(0x8a)]):null;$gameTemp['registerSelfTarget'](_0x273dec);const _0x2c141f=VisuMZ[_0x23ef8e(0x543)]['Game_Interpreter_executeCommand'][_0x23ef8e(0x437)](this);return $gameTemp[_0x23ef8e(0x152)](),_0x2c141f;},VisuMZ['EventsMoveCore'][_0x270971(0x352)]=Game_Interpreter[_0x270971(0xa1)][_0x270971(0x28d)],Game_Interpreter[_0x270971(0xa1)][_0x270971(0x28d)]=function(_0x2c6707){const _0xddcb47=_0x270971;return $gameTemp[_0xddcb47(0x2f4)](this),VisuMZ[_0xddcb47(0x543)][_0xddcb47(0x352)][_0xddcb47(0x437)](this,_0x2c6707);},Game_Interpreter['prototype'][_0x270971(0x4cd)]=function(_0x45fc0f){const _0x4c9ff8=_0x270971;this[_0x4c9ff8(0x246)]=_0x45fc0f;const _0xe5e62b=_0x4c9ff8(0x58d)[_0x4c9ff8(0x27e)](_0x45fc0f['mapId']['padZero'](0x3));this[_0x4c9ff8(0x35c)]=_0x4c9ff8(0x4a9)+Graphics[_0x4c9ff8(0x392)]+'_'+this[_0x4c9ff8(0x2c4)](),DataManager[_0x4c9ff8(0x581)](this[_0x4c9ff8(0x35c)],_0xe5e62b);if(window[this[_0x4c9ff8(0x35c)]]){if(_0x4c9ff8(0x210)===_0x4c9ff8(0x382))return _0x5b9641[0x2]['match'](/VAR/i)?this[_0x4c9ff8(0x496)][_0x14fe34]||0x0:!!this['_data'][_0x42a71b];else this[_0x4c9ff8(0x3bb)]();}else{if('yzKOW'===_0x4c9ff8(0xc6))return this[_0x4c9ff8(0x255)](_0x1cf36d);else this[_0x4c9ff8(0x430)]('CallEvent');}},Game_Interpreter[_0x270971(0xa1)]['startCallEvent']=function(){const _0x105874=_0x270971,_0x461fb9=this['_callEventData'],_0x27134a=window[this['_callEventMap']],_0x1193ae=_0x27134a[_0x105874(0x1b6)][_0x461fb9[_0x105874(0x2c4)]];if(_0x1193ae&&_0x1193ae[_0x105874(0x1ae)][_0x461fb9[_0x105874(0x25d)]-0x1]){const _0x4f31c3=_0x1193ae['pages'][_0x461fb9[_0x105874(0x25d)]-0x1][_0x105874(0x157)];this['setupChild'](_0x4f31c3,this['eventId']());}window[this[_0x105874(0x35c)]]=undefined,this[_0x105874(0x35c)]=undefined,this[_0x105874(0x246)]=undefined;};function Game_CPCInterpreter(){this['initialize']['apply'](this,arguments);};Game_CPCInterpreter[_0x270971(0xa1)]=Object[_0x270971(0x2a1)](Game_Interpreter['prototype']),Game_CPCInterpreter['prototype'][_0x270971(0x2a8)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x270971(0x4ef)]=function(){const _0x54cc78=_0x270971;Game_Interpreter[_0x54cc78(0xa1)]['clear'][_0x54cc78(0x437)](this),this[_0x54cc78(0x3a4)]=![];},Game_CPCInterpreter[_0x270971(0xa1)][_0x270971(0x96)]=function(){const _0x26c148=_0x270971;while(this[_0x26c148(0xdf)]()){if(_0x26c148(0x59d)!==_0x26c148(0xd0))this['executeCommand']();else{const _0x11a1ce=_0x51b56a['EventsMoveCore'][_0x26c148(0x412)],_0x182349=_0x26c148(0x56a)['format'](_0xd11aee[_0x26c148(0x61a)],_0x156c30[_0x26c148(0x8a)]);return this[_0x26c148(0x415)][_0x182349]=this[_0x26c148(0x415)][_0x182349]||{'iconIndex':0x0,'bufferX':_0x11a1ce['Icon'][_0x26c148(0x110)],'bufferY':_0x11a1ce[_0x26c148(0x59a)][_0x26c148(0x5ee)],'blendMode':_0x11a1ce[_0x26c148(0x59a)][_0x26c148(0xd4)]},this[_0x26c148(0x415)][_0x182349];}}},Game_CPCInterpreter['prototype'][_0x270971(0x137)]=function(_0x279981){const _0x4f2e50=_0x270971;while(this[_0x4f2e50(0xdf)]()){if(_0x4f2e50(0x62f)!==_0x4f2e50(0x62f))return!![];else this[_0x4f2e50(0x1ec)](_0x279981);}},Game_CPCInterpreter[_0x270971(0xa1)][_0x270971(0x1ec)]=function(_0x53aa6b){const _0x2fe5ee=_0x270971,_0x50f31a=_0x53aa6b;$gameTemp[_0x2fe5ee(0x35b)](_0x50f31a);const _0x538cf6=VisuMZ[_0x2fe5ee(0x543)][_0x2fe5ee(0x58e)][_0x2fe5ee(0x437)](this);return $gameTemp[_0x2fe5ee(0x152)](),_0x538cf6;},Game_CPCInterpreter[_0x270971(0xa1)][_0x270971(0x122)]=function(_0x49db78){const _0x1df198=_0x270971;return Game_Interpreter[_0x1df198(0xa1)][_0x1df198(0x122)][_0x1df198(0x437)](this,_0x49db78),this[_0x1df198(0x2e5)][_0x1df198(0x211)](_0x42e70f=>_0x42e70f[_0x1df198(0x447)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x1df198(0x3a4)]=!![]),!![];},VisuMZ[_0x270971(0x543)][_0x270971(0x185)]=Scene_Map['prototype'][_0x270971(0x2fb)],Scene_Map['prototype'][_0x270971(0x2fb)]=function(){const _0x55241f=_0x270971;VisuMZ[_0x55241f(0x543)][_0x55241f(0x185)]['call'](this),this['_spriteset'][_0x55241f(0x401)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x32f)]=Scene_Load[_0x270971(0xa1)]['onLoadSuccess'],Scene_Load[_0x270971(0xa1)][_0x270971(0x3b7)]=function(){const _0x2e326e=_0x270971;if($gameMap)$gameMap[_0x2e326e(0x50d)]();VisuMZ[_0x2e326e(0x543)][_0x2e326e(0x32f)]['call'](this);},VisuMZ[_0x270971(0x543)][_0x270971(0x58c)]=Sprite_Character['prototype'][_0x270971(0x485)],Sprite_Character[_0x270971(0xa1)]['initMembers']=function(){const _0x4fec1e=_0x270971;VisuMZ[_0x4fec1e(0x543)]['Sprite_Character_initMembers'][_0x4fec1e(0x437)](this),this[_0x4fec1e(0x4cc)](),this[_0x4fec1e(0x452)](),this[_0x4fec1e(0x29d)]();},Sprite_Character[_0x270971(0xa1)][_0x270971(0x4cc)]=function(){const _0x5213cd=_0x270971;this[_0x5213cd(0x13e)]=0xff;},Sprite_Character['prototype'][_0x270971(0x452)]=function(){const _0x18ff0d=_0x270971;this[_0x18ff0d(0x5de)]=new Sprite(),this[_0x18ff0d(0x5de)][_0x18ff0d(0x5c9)]['x']=0.5,this[_0x18ff0d(0x5de)][_0x18ff0d(0x5c9)]['y']=0x1,this[_0x18ff0d(0x9d)](this[_0x18ff0d(0x5de)]),this[_0x18ff0d(0x4f1)]();},Sprite_Character[_0x270971(0xa1)][_0x270971(0x29d)]=function(){const _0x55895a=_0x270971;this[_0x55895a(0x479)]=new Sprite(),this[_0x55895a(0x479)]['bitmap']=ImageManager[_0x55895a(0x471)](_0x55895a(0x12c)),this[_0x55895a(0x479)][_0x55895a(0x4ce)]['smooth']=![],this[_0x55895a(0x479)]['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x55895a(0x5c9)]['x']=0.5,this['_eventIconSprite'][_0x55895a(0x5c9)]['y']=0x1,this[_0x55895a(0x9d)](this[_0x55895a(0x479)]);},Sprite_Character[_0x270971(0xa1)][_0x270971(0x602)]=function(){const _0x5c3193=_0x270971;return this[_0x5c3193(0x176)]&&this[_0x5c3193(0x176)][_0x5c3193(0x447)](/\[VS8\]/i);},Sprite_Character[_0x270971(0xa1)]['isAutoBufferIcon']=function(){const _0x399e41=_0x270971;return this[_0x399e41(0x602)]()&&VisuMZ['EventsMoveCore']['Settings'][_0x399e41(0x2a2)][_0x399e41(0x11c)];},VisuMZ['EventsMoveCore'][_0x270971(0x494)]=Sprite_Character[_0x270971(0xa1)][_0x270971(0x424)],Sprite_Character[_0x270971(0xa1)]['update']=function(){const _0x218daf=_0x270971;VisuMZ[_0x218daf(0x543)][_0x218daf(0x494)][_0x218daf(0x437)](this),this['updateEventsAndMovementCore']();},Sprite_Character['prototype'][_0x270971(0xef)]=function(){const _0x3be156=_0x270971;Sprite['prototype'][_0x3be156(0xef)][_0x3be156(0x437)](this),this[_0x3be156(0x30c)]()&&(this[_0x3be156(0x21e)]=![]);},Sprite_Character[_0x270971(0xa1)][_0x270971(0x30c)]=function(){const _0x23d1d2=_0x270971;if(this[_0x23d1d2(0x63d)]()>0x0)return![];if(this[_0x23d1d2(0x27c)]){if(this[_0x23d1d2(0x27c)][_0x23d1d2(0x90)]()!=='')return![];}return this[_0x23d1d2(0x3fa)]()||this[_0x23d1d2(0x27c)]&&this[_0x23d1d2(0x27c)][_0x23d1d2(0x5b2)]();},Sprite_Character[_0x270971(0xa1)]['updateEventsAndMovementCore']=function(){const _0x1c004d=_0x270971;this['updateScaleBase'](),this[_0x1c004d(0x39c)](),this[_0x1c004d(0x4f7)](),this['updateEventIconSprite'](),this[_0x1c004d(0xff)](),this[_0x1c004d(0x629)](),this[_0x1c004d(0x4f1)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x3e4)]=Sprite_Character[_0x270971(0xa1)][_0x270971(0x320)],Sprite_Character[_0x270971(0xa1)]['setTileBitmap']=function(){const _0x45f4c3=_0x270971;VisuMZ[_0x45f4c3(0x543)]['Sprite_Character_setTileBitmap'][_0x45f4c3(0x437)](this),this['bitmap'][_0x45f4c3(0x587)](this['updateBitmapSmoothing'][_0x45f4c3(0x111)](this));},VisuMZ[_0x270971(0x543)][_0x270971(0x4b0)]=Sprite_Character[_0x270971(0xa1)][_0x270971(0x124)],Sprite_Character['prototype'][_0x270971(0x124)]=function(){const _0x137f56=_0x270971;VisuMZ['EventsMoveCore']['Sprite_Character_setCharacterBitmap'][_0x137f56(0x437)](this),this[_0x137f56(0x4ce)][_0x137f56(0x587)](this[_0x137f56(0x571)][_0x137f56(0x111)](this));},Sprite_Character[_0x270971(0xa1)][_0x270971(0x571)]=function(){const _0x109607=_0x270971;if(!this[_0x109607(0x4ce)])return;this['bitmap'][_0x109607(0x4c0)]=!!VisuMZ[_0x109607(0x543)]['Settings'][_0x109607(0x42b)][_0x109607(0x605)];},VisuMZ['EventsMoveCore']['Sprite_Character_characterPatternY']=Sprite_Character[_0x270971(0xa1)][_0x270971(0x5c6)],Sprite_Character[_0x270971(0xa1)]['characterPatternY']=function(){const _0x296687=_0x270971;return this[_0x296687(0x602)]()?this[_0x296687(0x4b1)]():this[_0x296687(0x165)]();},Sprite_Character[_0x270971(0xa1)][_0x270971(0x4b1)]=function(){const _0x9b9aa6=_0x270971,_0x14e8e2=this[_0x9b9aa6(0x27c)][_0x9b9aa6(0x3b9)]();let _0x146522=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x9b9aa6(0x27c)][_0x9b9aa6(0x371)]&&(_0x146522=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x146522[_0x14e8e2]-0x2)/0x2;},Sprite_Character[_0x270971(0xa1)][_0x270971(0x165)]=function(){const _0x4cb5a2=_0x270971;let _0x1b28cf=this[_0x4cb5a2(0x27c)]['direction']();if(this[_0x4cb5a2(0x27c)][_0x4cb5a2(0x371)]){if(_0x4cb5a2(0x4d2)===_0x4cb5a2(0x5f6)){const _0x2adb21=this['_randomHomeX'],_0x3cdd5f=this[_0x4cb5a2(0x5ac)],_0x280e75=this[_0x4cb5a2(0x374)](_0x4d9a00);return this[_0x4cb5a2(0x56b)](_0x2adb21,_0x3cdd5f,_0x280e75);}else{if(_0x1b28cf===0x4)_0x1b28cf=0x6;else _0x1b28cf===0x6&&(_0x1b28cf=0x4);}}return(_0x1b28cf-0x2)/0x2;},Sprite_Character['prototype'][_0x270971(0x31e)]=function(){const _0x141234=_0x270971;this[_0x141234(0x269)]['x']=this[_0x141234(0x27c)]['_scaleX']??0x1,this[_0x141234(0x269)]['y']=this[_0x141234(0x27c)]['_scaleY']??0x1;},Sprite_Character[_0x270971(0xa1)][_0x270971(0x39c)]=function(){const _0x501d6f=_0x270971;if(!VisuMZ[_0x501d6f(0x543)][_0x501d6f(0x412)][_0x501d6f(0x42b)][_0x501d6f(0x19f)])return;this[_0x501d6f(0x2d7)]=0x0;if(this[_0x501d6f(0x2da)]()){if('gByMi'===_0x501d6f(0x2db))_0x52cc37=0x4;else{const _0x261e58=VisuMZ[_0x501d6f(0x543)][_0x501d6f(0x412)]['Movement'],_0x45f476=this['_character'][_0x501d6f(0x3b9)]();let _0x49ef9d=0x0;if([0x1,0x4,0x7][_0x501d6f(0x3fc)](_0x45f476))_0x49ef9d=_0x261e58[_0x501d6f(0x5eb)];if([0x3,0x6,0x9][_0x501d6f(0x3fc)](_0x45f476))_0x49ef9d=_0x261e58[_0x501d6f(0x2e8)];[0x2,0x8]['includes'](_0x45f476)&&(_0x49ef9d=[-_0x261e58['TiltVert'],0x0,_0x261e58[_0x501d6f(0x583)]][this[_0x501d6f(0x27c)][_0x501d6f(0x4dd)]()]);if(this[_0x501d6f(0x305)])_0x49ef9d*=-0x1;this[_0x501d6f(0x2d7)]=_0x49ef9d;}}},Sprite_Character[_0x270971(0xa1)][_0x270971(0x2da)]=function(){const _0x5a1a53=_0x270971;if(this['_dragonbones'])return![];return this[_0x5a1a53(0x27c)][_0x5a1a53(0x510)]()&&!this[_0x5a1a53(0x27c)][_0x5a1a53(0x2a0)]()&&!this[_0x5a1a53(0x27c)][_0x5a1a53(0x5b0)]()&&this[_0x5a1a53(0x63d)]()===0x0;},Sprite_Character['prototype'][_0x270971(0x4f7)]=function(){const _0x48f16c=_0x270971;if(!this[_0x48f16c(0x1da)])return;this[_0x48f16c(0x1da)]['x']=this[_0x48f16c(0x27c)][_0x48f16c(0x528)](),this[_0x48f16c(0x1da)]['y']=this['_character'][_0x48f16c(0x158)](),this[_0x48f16c(0x1da)][_0x48f16c(0x204)]=this['opacity'],this[_0x48f16c(0x1da)]['visible']=this[_0x48f16c(0x27c)][_0x48f16c(0x387)](),this[_0x48f16c(0x1da)][_0x48f16c(0x3ed)]=this[_0x48f16c(0x3ed)];if(this['_character'][_0x48f16c(0x5dd)]())'YHzkB'==='reojm'?this['_alwaysUpdateMove']=!![]:(this['_shadowSprite'][_0x48f16c(0x269)]['x']=Math['max'](0x0,this['_shadowSprite']['scale']['x']-0.1),this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['y']=Math[_0x48f16c(0x60f)](0x0,this[_0x48f16c(0x1da)]['scale']['y']-0.1));else{if(this['_shadowSprite'][_0x48f16c(0x269)]['x']!==this[_0x48f16c(0x269)]['x']){if('pSQpv'!==_0x48f16c(0x126))this[_0x48f16c(0x430)](_0x48f16c(0x590));else{if(this[_0x48f16c(0x1da)]['scale']['x']>this[_0x48f16c(0x269)]['x'])this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['x']=Math[_0x48f16c(0x16f)](this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['x']+0.1,this[_0x48f16c(0x269)]['x']);if(this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['x']<this[_0x48f16c(0x269)]['x'])this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['x']=Math[_0x48f16c(0x60f)](this['_shadowSprite'][_0x48f16c(0x269)]['x']-0.1,this[_0x48f16c(0x269)]['x']);}}if(this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['y']!==this[_0x48f16c(0x269)]['y']){if(_0x48f16c(0x569)===_0x48f16c(0x569)){if(this[_0x48f16c(0x1da)]['scale']['y']>this['scale']['y'])this['_shadowSprite']['scale']['y']=Math[_0x48f16c(0x16f)](this['_shadowSprite'][_0x48f16c(0x269)]['y']+0.1,this[_0x48f16c(0x269)]['y']);if(this[_0x48f16c(0x1da)][_0x48f16c(0x269)]['y']<this['scale']['y'])this['_shadowSprite'][_0x48f16c(0x269)]['y']=Math[_0x48f16c(0x60f)](this['_shadowSprite']['scale']['y']-0.1,this[_0x48f16c(0x269)]['y']);}else return this['turnTowardCharacter'](_0x257a08);}}},Sprite_Character[_0x270971(0xa1)]['updateEventIconSprite']=function(){const _0x2a055f=_0x270971;if(!this[_0x2a055f(0x479)])return;const _0x3ef3e7=this[_0x2a055f(0x479)],_0xd8bba3=this[_0x2a055f(0x63d)]();if(_0xd8bba3<=0x0)return _0x3ef3e7[_0x2a055f(0x1d1)](0x0,0x0,0x0,0x0);else{const _0xe17df4=ImageManager[_0x2a055f(0x327)],_0xfdf31e=ImageManager['iconHeight'],_0x135f8=_0xd8bba3%0x10*_0xe17df4,_0x102227=Math['floor'](_0xd8bba3/0x10)*_0xfdf31e;_0x3ef3e7[_0x2a055f(0x1d1)](_0x135f8,_0x102227,_0xe17df4,_0xfdf31e),this[_0x2a055f(0x21e)]=!![];}const _0x238a79=this[_0x2a055f(0x27c)][_0x2a055f(0x28f)]();this[_0x2a055f(0x30a)]()?_0x2a055f(0x4df)!==_0x2a055f(0x1ed)?this[_0x2a055f(0x389)](_0x3ef3e7):_0x18c39c[_0x2a055f(0x3f5)](_0x35899c[_0x2a055f(0x293)]):(_0x3ef3e7['x']=_0x238a79?_0x238a79[_0x2a055f(0x242)]:0x0,_0x3ef3e7['y']=_0x238a79?-this[_0x2a055f(0x3b6)]+_0x238a79['bufferY']:0x0),_0x3ef3e7[_0x2a055f(0x470)]=_0x238a79?_0x238a79[_0x2a055f(0x470)]:0x0,this[_0x2a055f(0x3eb)](_0x3ef3e7),this[_0x2a055f(0x9d)](_0x3ef3e7),_0x3ef3e7['rotation']=-this[_0x2a055f(0x2d7)];},Sprite_Character[_0x270971(0xa1)][_0x270971(0xff)]=function(){const _0x5f7d33=_0x270971;if(!this[_0x5f7d33(0x27c)])return;if(this[_0x5f7d33(0x27c)][_0x5f7d33(0x525)]===undefined)return;if(this[_0x5f7d33(0x27c)]['_customZ']===![])return;this['z']=this[_0x5f7d33(0x27c)][_0x5f7d33(0x525)];if(this[_0x5f7d33(0x1da)]){if(this['z']<0x0)this[_0x5f7d33(0x1da)]['z']=this['z']-0x1;else{if('AbawG'!==_0x5f7d33(0x4aa))this[_0x5f7d33(0x1da)]['z']=0x0;else{const _0x4153ea=_0x2b149d[_0x5f7d33(0x543)][_0x5f7d33(0x412)][_0x5f7d33(0x42b)];if(!_0x4153ea[_0x5f7d33(0x207)])return _0x1c0a8f;return[0x1,0x3,0x7,0x9][_0x5f7d33(0x3fc)](this[_0x5f7d33(0x212)])&&(_0x3baa3d*=_0x4153ea['DiagonalSpeedMultiplier']||0.01),_0x3d9bb1;}}}},Sprite_Character['prototype'][_0x270971(0x629)]=function(){const _0x5e6ea5=_0x270971;if(!this[_0x5e6ea5(0x27c)])return;let _0x4a6ee0=!!this['_character'][_0x5e6ea5(0x371)];this['scale']['x']=Math[_0x5e6ea5(0x4ff)](this[_0x5e6ea5(0x269)]['x'])*(_0x4a6ee0?-0x1:0x1);},Sprite_Character[_0x270971(0xa1)]['autoEventIconBuffer']=function(_0x3e1a87){const _0x481f85=_0x270971;_0x3e1a87['x']=0x0,_0x3e1a87['y']=-this[_0x481f85(0x3b6)]+this[_0x481f85(0x3b6)]*0x2/0x5,this[_0x481f85(0x27c)][_0x481f85(0x4dd)]()!==0x1&&(_0x481f85(0x61d)===_0x481f85(0x1b9)?(_0x5286a3[_0x481f85(0x4dc)]=_0x3fd051[_0x481f85(0x8d)],_0xbf0b34['eventId']=_0x594e96[_0x481f85(0x50c)]):_0x3e1a87['y']+=0x1);},Sprite_Character[_0x270971(0xa1)][_0x270971(0x63d)]=function(){const _0x21f7d6=_0x270971;if(!this[_0x21f7d6(0x27c)])return 0x0;if(this['_character'][_0x21f7d6(0xbb)])return 0x0;const _0x4099ba=this[_0x21f7d6(0x27c)][_0x21f7d6(0x28f)]();return _0x4099ba?_0x4099ba[_0x21f7d6(0x636)]||0x0:0x0;},Sprite_Character[_0x270971(0xa1)][_0x270971(0x4f1)]=function(){const _0x45b2b8=_0x270971;if(!this[_0x45b2b8(0x5de)])return;if(!this[_0x45b2b8(0x27c)])return;this[_0x45b2b8(0x3aa)](),this[_0x45b2b8(0xa9)]();},Sprite_Character[_0x270971(0xa1)][_0x270971(0x3aa)]=function(){const _0x1f855c=_0x270971;if(!this['needsAttachPictureUpdate']())return;const _0x487bf2=this[_0x1f855c(0x27c)]['attachPictureSettings']();this[_0x1f855c(0x422)]=_0x487bf2[_0x1f855c(0x442)],this[_0x1f855c(0x617)]=_0x487bf2[_0x1f855c(0x432)],this['_lastAttachPictureScale']=_0x487bf2[_0x1f855c(0x269)];if(_0x487bf2[_0x1f855c(0x442)]!==''){const _0x88fd7a=ImageManager['loadPicture'](_0x487bf2[_0x1f855c(0x442)]);_0x88fd7a[_0x1f855c(0x587)](this[_0x1f855c(0x406)][_0x1f855c(0x111)](this,_0x88fd7a));}else{if(_0x1f855c(0x273)!==_0x1f855c(0x273)){const _0xb1caf1=this[_0x1f855c(0x537)][_0x1f855c(0x2aa)]();this[_0x1f855c(0x537)]['drawTextEx'](this['_text'],_0xb1caf1,0x0);}else this['_attachPictureSprite']['bitmap']=new Bitmap(0x1,0x1);}},Sprite_Character[_0x270971(0xa1)]['updateAttachPictureBitmap']=function(){const _0x3cbfb3=_0x270971,_0x372086=this[_0x3cbfb3(0x5de)];_0x372086['x']=this[_0x3cbfb3(0x27c)][_0x3cbfb3(0x169)](),_0x372086['y']=this[_0x3cbfb3(0x27c)]['attachPictureOffsetY'](),_0x372086['blendMode']=this[_0x3cbfb3(0x27c)][_0x3cbfb3(0x2d8)]();},Sprite_Character[_0x270971(0xa1)][_0x270971(0x480)]=function(){const _0x1b8c6f=_0x270971,_0x30f6b7=this[_0x1b8c6f(0x27c)]['attachPictureSettings']();if(_0x30f6b7){if(_0x1b8c6f(0x624)===_0x1b8c6f(0x624)){if(this[_0x1b8c6f(0x422)]!==_0x30f6b7[_0x1b8c6f(0x442)])return!![];if(this[_0x1b8c6f(0x617)]!==_0x30f6b7['maxSize'])return!![];if(this[_0x1b8c6f(0x2df)]!==_0x30f6b7['scale'])return!![];}else return _0x31c504[_0x1b8c6f(0x14c)][_0x419dac][_0x1b8c6f(0x1b6)][_0x117a80];}return![];},Sprite_Character[_0x270971(0xa1)]['onLoadAttachPicture']=function(_0x292b53){const _0x3092b1=_0x270971,_0x1ef6fb=this['_attachPictureSprite'];_0x1ef6fb['bitmap']=_0x292b53;const _0x4eb3d1=this['_character'][_0x3092b1(0x487)](),_0xe98b09=_0x4eb3d1['maxSize'],_0x367caf=_0x4eb3d1['scale'];let _0x8ab774=0x1;if(_0xe98b09>0x0){if(_0x3092b1(0xaa)===_0x3092b1(0x45f))return!![];else{let _0x254dc9=this[_0x3092b1(0xb5)]()||0x1,_0x462173=this[_0x3092b1(0x39a)]()||0x1;const _0x453d0d=Math[_0x3092b1(0x60f)](0x1,_0x254dc9,_0x462173);_0x8ab774=_0xe98b09/_0x453d0d;}}_0x8ab774*=_0x367caf,_0x8ab774!==0x1&&(this[_0x3092b1(0x5de)][_0x3092b1(0x4ce)]['smooth']=!![]),_0x1ef6fb['scale']['x']=_0x8ab774,_0x1ef6fb['scale']['y']=_0x8ab774,this[_0x3092b1(0x21e)]=!![],this['updateAttachPictureBitmap']();},Sprite_Character[_0x270971(0xa1)]['getAttachPictureBitmapWidth']=function(){const _0x25a3be=_0x270971,_0x5d976c=this[_0x25a3be(0x5de)];if(!_0x5d976c)return 0x0;return _0x5d976c[_0x25a3be(0x4ce)]['width'];},Sprite_Character[_0x270971(0xa1)][_0x270971(0x39a)]=function(){const _0x26d3f6=_0x270971,_0x3e67fb=this[_0x26d3f6(0x5de)];if(!_0x3e67fb)return 0x0;return _0x3e67fb[_0x26d3f6(0x4ce)][_0x26d3f6(0x3b6)];},VisuMZ[_0x270971(0x543)][_0x270971(0x3be)]=Sprite_Balloon['prototype'][_0x270971(0x1e1)],Sprite_Balloon[_0x270971(0xa1)][_0x270971(0x1e1)]=function(_0x569d22,_0x233a14){const _0x1847ab=_0x270971;VisuMZ[_0x1847ab(0x543)][_0x1847ab(0x3be)]['call'](this,_0x569d22,_0x233a14),VisuMZ[_0x1847ab(0x543)]['Settings']['VS8']['AutoBalloon']&&this['_target'][_0x1847ab(0x27c)]['setBalloonPose'](_0x233a14,this['_duration']);},VisuMZ[_0x270971(0x543)][_0x270971(0x5ff)]=Sprite_Balloon[_0x270971(0xa1)][_0x270971(0x5d5)],Sprite_Balloon[_0x270971(0xa1)]['updatePosition']=function(){const _0x408e0e=_0x270971;VisuMZ['EventsMoveCore'][_0x408e0e(0x5ff)][_0x408e0e(0x437)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x270971(0xa1)][_0x270971(0x610)]=function(){const _0x3218ff=_0x270971;if(this[_0x3218ff(0x376)][_0x3218ff(0x27c)][_0x3218ff(0x602)]()){if(_0x3218ff(0xe4)!==_0x3218ff(0x5e4))this['x']+=VisuMZ[_0x3218ff(0x543)][_0x3218ff(0x412)][_0x3218ff(0x2a2)][_0x3218ff(0x4a0)],this['y']+=VisuMZ[_0x3218ff(0x543)]['Settings'][_0x3218ff(0x2a2)][_0x3218ff(0x41c)];else return![];}},Sprite_Timer[_0x270971(0xa1)]['createBitmap']=function(){const _0x2c809c=_0x270971;this['bitmap']=new Bitmap(Math[_0x2c809c(0x594)](Graphics[_0x2c809c(0xc0)]/0x2),0x30),this['bitmap'][_0x2c809c(0x3b5)]=this[_0x2c809c(0x3b5)](),this[_0x2c809c(0x4ce)]['fontSize']=this[_0x2c809c(0x4fc)](),this[_0x2c809c(0x4ce)][_0x2c809c(0x32c)]=ColorManager[_0x2c809c(0x32c)]();},Sprite_Timer[_0x270971(0xa1)][_0x270971(0x502)]=function(){const _0x1e4216=_0x270971,_0x207340=Math[_0x1e4216(0x257)](this[_0x1e4216(0x4c5)]/0x3c/0x3c),_0x2fa5a4=Math['floor'](this[_0x1e4216(0x4c5)]/0x3c)%0x3c,_0x314b96=this[_0x1e4216(0x4c5)]%0x3c;let _0x4eba32=_0x2fa5a4[_0x1e4216(0x14f)](0x2)+':'+_0x314b96[_0x1e4216(0x14f)](0x2);if(_0x207340>0x0)_0x4eba32='%1:%2'[_0x1e4216(0x27e)](_0x207340,_0x4eba32);return _0x4eba32;};function Sprite_EventLabel(){const _0x52e291=_0x270971;this[_0x52e291(0x2c2)](...arguments);}Sprite_EventLabel[_0x270971(0xa1)]=Object[_0x270971(0x2a1)](Sprite[_0x270971(0xa1)]),Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0x2a8)]=Sprite_EventLabel,Sprite_EventLabel['prototype']['initialize']=function(_0x2baa2e){const _0x163e96=_0x270971;this[_0x163e96(0x4ac)]=_0x2baa2e,Sprite['prototype']['initialize'][_0x163e96(0x437)](this),this[_0x163e96(0x485)](),this[_0x163e96(0xb8)]();},Sprite_EventLabel['prototype'][_0x270971(0x485)]=function(){const _0x8b8251=_0x270971;this[_0x8b8251(0x5c9)]['x']=0.5,this[_0x8b8251(0x5c9)]['y']=0x1;},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0xb8)]=function(){const _0x2a0716=_0x270971,_0x46f01b=new Rectangle(0x0,0x0,0x1,0x1);this[_0x2a0716(0x537)]=new Window_Base(_0x46f01b),this[_0x2a0716(0x537)][_0x2a0716(0x95)]=0x0,this[_0x2a0716(0x204)]=this[_0x2a0716(0x2d0)]()?0xff:0x0;},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0x424)]=function(){const _0x2bba02=_0x270971;Sprite[_0x2bba02(0xa1)][_0x2bba02(0x424)]['call'](this),this[_0x2bba02(0x47a)](),this[_0x2bba02(0x45d)](),this[_0x2bba02(0x5d5)](),this['updateOpacity'](),this['updateHueShift']();},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0x47a)]=function(){const _0x1b11e1=_0x270971;this[_0x1b11e1(0x4ac)][_0x1b11e1(0x3de)]()!==this[_0x1b11e1(0x5d1)]&&('EOWcn'!=='EOWcn'?(this[_0x1b11e1(0x625)](_0x19dcd9),this[_0x1b11e1(0x50d)](),_0x4880ac[_0x1b11e1(0x543)][_0x1b11e1(0xca)][_0x1b11e1(0x437)](this,_0x31616b),this[_0x1b11e1(0x50d)](),this[_0x1b11e1(0x18d)](),this['setupRegionRestrictions'](),this[_0x1b11e1(0x596)](),this[_0x1b11e1(0x563)](),this[_0x1b11e1(0x17d)](),this['setupFollowerVisibilityOverrides'](),this['processEraseEncounterEvents'](),this[_0x1b11e1(0x348)](),this[_0x1b11e1(0x50d)]()):(this[_0x1b11e1(0x5d1)]=this[_0x1b11e1(0x4ac)]['labelWindowText'](),this[_0x1b11e1(0xdb)]()));},Sprite_EventLabel['prototype'][_0x270971(0xdb)]=function(){const _0x20a16c=_0x270971;if(!this[_0x20a16c(0x537)])return;this[_0x20a16c(0x541)](),this[_0x20a16c(0x2b8)]();},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0x541)]=function(){const _0x232bb9=_0x270971,_0xbafe0f=this[_0x232bb9(0x537)][_0x232bb9(0xb2)](this[_0x232bb9(0x5d1)]),_0x515a43=this[_0x232bb9(0x537)]['itemPadding'](),_0x2152d6=_0xbafe0f[_0x232bb9(0x549)]+_0x515a43*0x2,_0x100be0=_0xbafe0f[_0x232bb9(0x3b6)];this[_0x232bb9(0x537)]['move'](0x0,0x0,_0x2152d6,_0x100be0),this[_0x232bb9(0x537)][_0x232bb9(0x3bd)](),this[_0x232bb9(0x4ce)]=this[_0x232bb9(0x537)]['contents'];},Sprite_EventLabel['prototype'][_0x270971(0x2b8)]=function(){const _0x46237e=_0x270971,_0x44af70=this[_0x46237e(0x537)][_0x46237e(0x2aa)]();this[_0x46237e(0x537)][_0x46237e(0x4cb)](this[_0x46237e(0x5d1)],_0x44af70,0x0);},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0x45d)]=function(){const _0x4109f1=_0x270971,_0x4c8863=VisuMZ[_0x4109f1(0x543)][_0x4109f1(0x412)][_0x4109f1(0x33a)][_0x4109f1(0x2d4)],_0x2f8819=$gameSystem[_0x4109f1(0x4ec)]()||0x1;this[_0x4109f1(0x269)]['x']=this[_0x4109f1(0x269)]['y']=_0x4c8863/_0x2f8819;},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0x5d5)]=function(){const _0x465088=_0x270971;if(!SceneManager[_0x465088(0x3e0)])return;if(!SceneManager[_0x465088(0x3e0)][_0x465088(0x402)])return;const _0xe1366c=SceneManager[_0x465088(0x3e0)][_0x465088(0x402)]['findTargetSprite'](this[_0x465088(0x4ac)]);if(!_0xe1366c)return;this['x']=this['_event']['screenX'](),this['x']+=this[_0x465088(0x4ac)][_0x465088(0x240)][_0x465088(0x2f6)],this['y']=this[_0x465088(0x4ac)]['screenY']()-_0xe1366c[_0x465088(0x3b6)]*_0xe1366c[_0x465088(0x269)]['y'],this['y']+=$gameSystem[_0x465088(0x5c8)]()*-0.5,this['y']+=this['_event']['_labelWindow'][_0x465088(0x515)];},Sprite_EventLabel['prototype']['updateOpacity']=function(){const _0x65e451=_0x270971;if(this[_0x65e451(0x2d0)]())this[_0x65e451(0x204)]+=this[_0x65e451(0xed)]();else{if(SceneManager['_scene'][_0x65e451(0x32d)]>0x0){if('BOrdl'!==_0x65e451(0x131)){const _0x19f109=_0x54b828[_0x65e451(0x358)](this);if(!_0x19f109)return;this[_0x65e451(0x474)](_0x19f109['x'],_0x19f109['y']),this[_0x65e451(0x520)](),this[_0x65e451(0x12a)](_0x19f109[_0x65e451(0x3b9)]),this['_pageIndex']===_0x19f109['pageIndex']&&(this['_moveRouteIndex']=_0x19f109[_0x65e451(0x1a7)]);}else this[_0x65e451(0x204)]=0x0;}else this['opacity']-=this['opacitySpeed']();}},Sprite_EventLabel[_0x270971(0xa1)]['updateHueShift']=function(){const _0x359186=_0x270971;if(this[_0x359186(0x2d0)]()&&this[_0x359186(0x4ac)]&&this[_0x359186(0x4ac)][_0x359186(0x240)][_0x359186(0x361)]){if(_0x359186(0x1e9)===_0x359186(0x1e9)){const _0x49f426=this[_0x359186(0x3bf)]+(this[_0x359186(0x4ac)][_0x359186(0x240)][_0x359186(0x361)]||0x0);this[_0x359186(0x294)](_0x49f426);}else _0x74eacb[_0x359186(0xfb)](),_0x45ca2c[_0x359186(0x543)][_0x359186(0xe1)][_0x359186(0x437)](this);}},Sprite_EventLabel[_0x270971(0xa1)]['isLabelVisible']=function(){const _0x391b48=_0x270971;if(!$gameSystem[_0x391b48(0x306)]())return![];if(this[_0x391b48(0x4ac)]?.[_0x391b48(0xbb)])return![];if(this['_event']&&this['_event'][_0x391b48(0x584)]<0x0)return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x474c44=$gamePlayer['x'],_0x19ab39=$gamePlayer['y'],_0x551d7e=this['_event']['x'],_0x17e7ef=this[_0x391b48(0x4ac)]['y'];if(this['_visiblePlayerX']===_0x474c44&&this[_0x391b48(0x140)]===_0x19ab39&&this[_0x391b48(0xb6)]===_0x551d7e&&this[_0x391b48(0x2d3)]===_0x17e7ef)return this[_0x391b48(0x12d)];this[_0x391b48(0x33b)]=$gamePlayer['x'],this[_0x391b48(0x140)]=$gamePlayer['y'],this[_0x391b48(0xb6)]=this['_event']['x'],this[_0x391b48(0x2d3)]=this[_0x391b48(0x4ac)]['y'];if($gameMap[_0x391b48(0x38f)](_0x474c44,_0x19ab39,_0x551d7e,_0x17e7ef)>this[_0x391b48(0x4ac)][_0x391b48(0x14e)]())return this[_0x391b48(0x12d)]=![],![];return this['_cacheVisibility']=!![],!![];},Sprite_EventLabel[_0x270971(0xa1)][_0x270971(0xed)]=function(){const _0x8f16d8=_0x270971;return VisuMZ['EventsMoveCore'][_0x8f16d8(0x412)]['Label'][_0x8f16d8(0x2c5)];};function _0x45a9(){const _0x59548e=['target','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_filename','_targetScaleX','makeDeepCopy','Window_NumberInput_processOk','mainFontSize','isPlaytest','setupChild','clear','updateHueShift','updateAttachPictureSprite','SPIN\x20CCW','setEventIconData','startMapCommonEventOnTouch','AdvancedVariables','LXHca','updateShadow','dashSpeedModifier','updateFadeOut','standing','Game_Map_events','fontSize','MobileEnabled','IconSize','abs','FFQmi','_waitMode','timerText','variableId','deltaXFrom','_fadeOutDuration','tileCoordinates','FjCvQ','terrainTag','Game_Followers_isVisible','_fadeOutStart','IconIndex','EventID','clearEventCache','_startScaleY','frontX','isDashingAndMoving','_MapSpawnedEventData','RegionOk','checkEventTriggerHere','EventId','offsetY','Game_Vehicle_isMapPassable','_scaleBaseY','Game_Event_updateSelfMovement','Game_Follower_initialize','_forceHideFollower','backX','LIGHT-BULB','%1Allow','STR','drawing','refreshBushDepth','MsgPopupPlayer','isSaveEventLocations','autosaveEventLocation','moveTypeRandom','_customZ','convertSelfVariableValuesInScriptCall','_inputTime','shadowX','forceCarrying','_eventCache','pos','kwKis','isDashing','Game_CharacterBase_increaseSteps','processMoveRouteFadeIn','getInputDirection','length','isObjectCharacter','executeMove','mKAuT','VariableId','default','_proxyWindow','ARRAYJSON','11750570YqbAUR','CMSRP','checkEventTriggerThere','Map\x20%1\x20Switch\x20%2','moveForward','saveEventLocation','resetSelfSwitchesForEvent','processEraseEncounterSpawn','resizeWindow','originalText','EventsMoveCore','resetFontSettings','checkExistingEntitiesAt','jump','FollowerSetGlobalChase','PostMorphJS','width','Hours','GCzrI','vehicle','isSpawnedEvent','FollowerID','ZjyNk','Veerk','Game_Message_add','getPosingCharacterIndex','_spawnData','mirror\x20horz','iconSize','clearDashing','_lastMapId','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_targetY','prepareSpawnedEventAtTerrainTag','setFrames','DiagonalSpeedMultiplier','Window_EventItem_onCancel','SelfSwitches','Mecdv','loadCPC','_screenZoomScale','EnableDir8','setupSpawnedEvents','contents','innerWidth','SuccessSwitchId','timer','eraseEvent','oLNfL','Map%1-Event%2','processMoveRouteMoveTo','VehicleDock','USER-DEFINED\x203','Hidden','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','Letter','updateBitmapSmoothing','_moveRouteIndex','Toggle','despawnEverything','hasAdvancedSwitchVariable','_opacity','FNAzW','Operation','updateParallel','Seconds','setMovementSuccess','isPlayerControlDisabled','Game_Event_update','UdUhe','updateEventsMoveCoreTagChanges','_activationProximity','loadDataFile','CXJbc','TiltVert','_pageIndex','isMapPassable','Game_Player_executeMove','addLoadListener','FollowerSetControl','onOk','getLastPluginCommandInterpreter','PlayerAllow','Sprite_Character_initMembers','Map%1.json','Game_Interpreter_executeCommand','fwbkv','CallEvent','adjustMoveSynchOpacityDelta','iaIdl','fLNqQ','round','setDashingEnabled','setupSaveEventLocations','isValid','isDashingEnabled','_startX','Icon','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','AllForbid','WUGOo','FRUSTRATION','IconBlendMode','zSeSM','front','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','uiBcu','isPlayerWithinEncounterNoneEvents','isPassable','isDashDisabled','_poseDuration','HuMat','OperateValues','_trigger','_events','_randomHomeY','SpawnEventAtXY','isBusy','RegionTouch','isPosing','adjustDir8MovementSpeed','isTransparent','_realY','hasEventIcon','DefaultShadow','processMoveRouteSelfSwitch','2048382OmgpTt','_targetAngle','attachPictureMaxSize','DashOnLadder','Visible','YdDUy','VisibleEventLabels','vDhEc','%1Forbid','findTargetSprite','turnTowardCharacter','_lastPluginCommandInterpreter','Game_Troop_meetsConditionsCPC','drawIcon','Game_Map_update','characterPatternY','_forceShowFollower','windowPadding','anchor','CCkCE','duration','MoveAllSynchTargets','ccwX','MsgPopupFollower','QjttC','moveBackToRandomHome','_text','CuzYh','setupEventsMoveCoreCommentTags','IconBufferY','updatePosition','TargetVariableId','setValue','IIbrz','isSelfVariable','isEventTest','blt','Vehicle','isShadowShrink','_attachPictureSprite','USER-DEFINED\x201','checkActivationProximity','_clickTrigger','Game_Event_moveTypeRandom','_spawnedEvents','NqzCS','eventsXyNt','zoomScale','Game_Character_setMoveRoute','ncNZF','refreshIfNeeded','General','TiltLeft','PlayerMovementChange','Rope','BufferY','random','player','ByOBR','SelfVariables','advancedFunc','Game_CharacterBase_update','sXYha','IKVni','_forceShowPlayer','character','encounterProximityType','checkSmartEventCollision','FALSE','isSupportDiagonalMovement','_expireCommonEvent','ADDITIVE','Sprite_Balloon_updatePosition','_eventMorphData','hUQZz','isSpriteVS8dir','DlAkA','processMoveRouteMoveToCharacter','BitmapSmoothing','EnableTurnInPlace','SPIN\x20ANTICLOCKWISE','increaseSteps','cwX','moveAwayFromPoint','krxrX','PlayerIconDelete','_periodicRefreshTimer','despawnTerrainTags','max','updateVS8BalloonOffsets','turnAwayFromPoint','DEFAULT_SHIFT_Y','_eventLabelOffsetX','TileX','opacityDelta','DZeFw','_lastAttachPictureMaxSize','DiBEu','attachPictureOffsetY','_mapId','startsWith','Game_CharacterBase_moveStraight','cqjUp','startOffset','tnmbJ','AirshipSpeed','Game_Map_unlockEvent','FastForwardKey','_saveEventLocation','RvknL','removeTemporaryMapSpawnedEvents','process_VisuMZ_EventsMoveCore_Switches_Variables','processMoveSynchRandom','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updateEventMirrorSprite','BgEsD','split','roundXWithDirection','WalkAllow','GfJHt','Ohojx','Event','EventAutoMovement','_startScaleX','_duration','Game_Message_setItemChoice','processMoveRouteTeleportToCharacter','iconIndex','USER-DEFINED\x205','IsttE','_forceHidePlayer','UbLBo','disable','EventTimerExpireClear','getEventIconIndex','Scene_Map_onMapLoadedEncErase','_eventId','adjustX','vsWjf','MapID','code','switches','attachPictureFilename','isDestinationValid','yHoKg','LfuKD','LEFT','padding','execute','lngBu','checkEventProximity','setAllowEventAutoMovement','Game_CharacterBase_direction','cFXpE','vert\x20mirror','addChild','createDummyWindow','$preloadedMap_%1','MessageText','prototype','Player','xYfcJ','EventIconChange','EventTimerFramesGain','page','Game_Interpreter_character','_eventScreenX','updateAttachPictureBitmap','rygUo','Game_Interpreter_updateWaitMode','All','_selfTargetItemChoice','_eventErased','isTile','setImage','requestRefresh','textSizeEx','hoaHs','_textSprite','getAttachPictureBitmapWidth','_visibleEventX','OwmaR','createProxyWindow','FaceSynchAllSynchTargets','savePreservedMorphEventDataKey','_erased','SPIN\x20ACW','AutoMoveEvents','_followerControlID','TerrainTags','boxWidth','_PreservedEventMorphData','_direction','reverse\x20mimic','Map\x20%1\x20Variable\x20%2','IJakd','ucPZS','processMoveCommand','144pGJihy','fittingHeight','Game_Map_setup','variables','GayYX','ViMTk','createEventsMoveCoreMessagePopup','dVCTn','usUET','spawnEventId','zZXCP','nUEsR','BlendMode','avPYj','tileWidth','updateTextScale','isMoving','368lVNbTQ','LOVE','refresh','none','initMoveSpeed','circle','isRunning','_labelWindows','Scene_Map_createDisplayObjects','isMapSwitch','slice','HaBMY','TargetSwitchId','_interpreter','checkRegionEventTrigger','left','gNxas','OczfV','ApplyPopupExtraSettings','boat','opacitySpeed','jumpAll','updateVisibility','BzeUp','MapId','characterIndex','Game_Event_setupPageSettings','lastSpawnedEvent','%1,','fsQCs','Stop','regionList','dkKWQ','clearSpriteOffsets','resetExitSelfSwitches','pow','ITEM','SelfSwitchABCD','updateEventCustomZ','updateMoveSynchDirection','variableValid','_tilemap','activationRegionList','updateSaveEventLocation','sDHah','despawnAtXY','%1:%2','PEmlD','PostCopyJS','fadeDuration','processMoveRouteStepTo','_actuallyMoving','isActive','DBCbU','randomInt','BufferX','bind','isMoveOnlyRegionPassable','setStopFollowerChasing','ALLOW_LADDER_DASH','GMkUu','updateSpritePosition','misc','isNormalPriority','indexOf','loadPicture','isAllowEventAutoMovement','AutoBuffer','getSelfTarget','SwitchGetSelfSwitchID','_commonEvents','_frames','deleteSavedEventLocationKey','command108','XrltS','setCharacterBitmap','checkAdvancedSwitchVariablePresent','pSQpv','LIGHTBULB','UNTITLED','setupMorphEvent','setDirection','SpawnEventDespawnEverything','IconSet','_cacheVisibility','WMtgN','_speed','EVAL','BOrdl','_diagonalSupport','setMoveRoute','updateShadowChanges','morphInto','isTargetEventValidForLabelWindow','executeCommonEvent','PreSpawnJS','yZIoX','clearAttachPictureSettings','QUESTION','csvoL','_isObjectCharacter','_shadowOpacity','forceDashing','_visiblePlayerY','Game_Map_parallelCommonEvents','charAt','cwWcr','setPose','remove','onMapLoaded','zwICf','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','_targetX','_eventCopyData','_SavedEventLocations','PreloadedMaps','processMoveSynchMimic','labelWindowRange','padZero','roundYWithDirection','Game_CharacterBase_initMembers','clearSelfTarget','_targetScaleY','Game_Switches_value','isMovementSucceeded','setItemChoice','list','shadowY','clearDestination','_characterIndex','_starting','LIGHT\x20BULB','_startAngle','hasEncounterNone','isSceneMap','SelfDataResetAll','onExpire','parent','_advancedSwitchVariable','lgvfR','characterPatternYBasic','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','firstSpawnedEventID','CommonEventID','attachPictureOffsetX','ARRAYNUM','parameters','EventTimerResume','Game_Event_event','processSaveEventLocation','min','end','getDiagonalDestination','pbukH','EventLocationCreate','chaseCharacter','Ship','_characterName','_stepPattern','Name','iQTxb','replace','clamp','_wholeDuration','setupPlayerVisibilityOverrides','_selfTarget','isPlayerForceHidden','registerSelfEvent','_characterSprites','iYzKC','PlayerForbid','updateTextPosition','Scene_Map_startEncounterEffect','checkEventTriggerEventsMoveCore','wAKJz','prIDM','_selfTargetNumberInput','SdVBm','Game_Vehicle_initMoveSpeed','Game_Player_increaseSteps','setupDiagonalSupport','ARRAYEVAL','Spriteset_Map_createLowerLayer','VAwTg','_commonEventId','sqrt','Game_Enemy_meetsSwitchCondition','isBattleTest','lock','PreCopyJS','Window_EventItem_onOk','Value','roundY','HWFCi','spriteId','fhmta','Allow','deletePreservedMorphEventDataKey','EnableDashTilt','createSpawnedEvent','spawnPreserved','correctFacingDirection','Preserve','setMapValue','cjjHC','RandomMoveWeight','moveRouteIndex','onCancel','SCREEN','mirror\x20horizontal','isAdvancedSwitch','PxzIW','createCharacterShadow','pages','text','setControlledFollowerID','jkPjk','prepareSpawnedEventAtRegion','move','Game_System_initialize','zvhBS','events','isJumping','_eventOverload','moRWu','_moveSpeed','mrMcw','executeMoveDir8','push','MfXJt','KfDOs','isAdvancedVariable','trim','_settings','EventIconDelete','shadowFilename','updateSelfMovement','isAnyEventStarting','PQKTB','sPTTp','Game_Map_event','Game_CharacterBase_realMoveSpeed','updatePose','turn180','endOffsetY','isMCH','endScaleY','Scene_Boot_onDatabaseLoaded','setFrame','isBigCharacter','Disable','down','fadeIn','KYDLu','tileHeight','updateDuration','setOpacity','_shadowSprite','%1DockRegionOnly','WeMSQ','hasMoveOnlyRegions','screenX','LMHGr','setBackgroundType','setup','mirror\x20vert','SwitchId','zRaSx','createShadow','Game_CharacterBase_isDashing','rbwms','isSpawnHitboxCollisionOk','kofZF','setupFollowerVisibilityOverrides','deltaX','executeCommandCommonEvent','wUssX','hasEncounterHalf','moveTowardCharacter','FollowerIndex','switch1Id','IconBufferX','away','lcltX','turnTowardPoint','string','initFollowerController','initEventsMoveCore','nLdYm','Enable','rqFPD','concat','Collision','OFF','meetActivationRegionConditions','Game_Troop_meetsConditions','gMLYH','tzjaK','DIAGONAL_PATHFINDING_EVENT_LIMIT','opacity','_currentArc','hqRtG','SlowerSpeed','reserveCommonEvent','isCollidedWithEvents','wKAni','createEventsMoveCoreTileMessagePopup','Game_Player_isDashing','tNigX','useCarryPoseForIcons','HURT','ZUBRv','some','_lastMovedDirection','Ygcns','clearPageSettings','deltaYFrom','metCPC','resume','map','NSYDB','isEventRunning','processMoveRouteStepFrom','SelfSwitchID','moveDiagonally','visible','MUSIC-NOTE','square','findDirectionTo','YfWZO','setPattern','_encounterHalfProximity','_eventSpawnData','EventForbid','defaultFontSize','visibleRange','9OpiSHy','_PlayerDiagonalSetting','event','SPIN\x20COUNTERCLOCKWISE','createLowerLayer','MOBILE_DIAGONAL_PATHFINDING','PnUmJ','meetsConditions','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','frontY','DsPBP','processMoveSynch','Walk','Game_Party_hasEncounterNone','referEvent','setupEventsMoveCoreEffects','Step2Preserve','splice','endScale','prepareSpawnedEventAtXY','processOk','copy','JTHCq','_labelWindow','hasStepAnime','bufferX','EXCLAMATION','_alwaysUpdateMove','isRegionDockable','_callEventData','Game_Variables_value','FollowerSetTargetChase','Game_Player_isMapPassable','lastSpawnedEventID','stop','isMobileDevice','hEzAh','BULB','_dummyWindow','urxXD','clearStepPattern','Game_Event_start','bJQlQ','WcSUn','moveStraight','MapSwitches','floor','processMoveRouteMoveRepeat','PosY','horz\x20mirror','GlZuP','requestAnimation','pageId','EventTimerExpireEvent','_offsetY','getDirectionToPoint','toLowerCase','return\x200','_offsetX','Step2EventId','TileY','_eventPageIndex','RMJWJ','followers','scale','processMoveRouteTeleportTo','trtwT','EventTimerPause','_scaleY','characterIndexVS8','DOWN','setEventLabelsVisible','_addedHitbox','Game_Event_locate','YTJwn','createTextSprite','Game_Event_findProperPageIndex','fHgTn','COLLAPSE','Forbid','deleteIconsOnEventsData','Khuvv','isLandOk','_character','contentsOpacity','format','processMoveRouteMoveUntilStop','isCollidedWithPlayerCharacters','Self\x20Variable\x20%1','onClickTrigger','_activationProximityAutoTriggerBypass','processMoveRouteJumpTo','MOBILE_EVENT_LABELS','directionOnLadderSpriteVS8dir','switch2Valid','Game_Map_refresh','ZZZ','isPressed','isEventClickTriggered','canPassDiagonally','command357','setBalloonPose','getEventIconData','hasDragonbones','trigger','name','TemplateName','setHue','delta','dSPpa','_pose','inBattle','onghV','processDrawIcon','isSmartEventCollisionOn','KswCO','createIconSprite','rPofa','SpawnEventDespawnRegions','isOnLadder','create','VS8','vAPQI','PathfindMobileEnabled','startOffsetX','isNearTheScreen','eventsXy','constructor','reverse\x20copy','itemPadding','wSXIB','_selfEvent','meetsCPC','Region%1','IJXDQ','right','4OqXfcI','Template','status','_randomHomeX','Game_CharacterBase_moveDiagonally','isSelfSwitch','pause','drawText','setMoveSpeed','%1,%2,','adjustY','Window_NumberInput_start','EventLocationDelete','checkValidEventerMap','AvSwi','Game_Event_updateParallel','OxgSJ','initialize','FUNC','eventId','OpacitySpeed','encounterProximityDistance','processMoveRouteSetIndex','Game_Player_checkEventTriggerThere','despawnEventId','COBWEB','_spriteOffsetY','%1%2','getPose','getPreservedMorphEventData','setupSpawn','isLabelVisible','_counter','Uspmy','_visibleEventY','FontSize','GetMoveSynchTarget','lLmte','rotation','attachPictureBlendMode','bushDepth','isAllowCharacterTilt','sLpvm','pIScW','isVisible','updateFadeIn','_lastAttachPictureScale','lWYga','startMessage','isInVehicle','RegionOkTarget','posEventsMoveCore','_comments','ShipSpeed','ctVXi','TiltRight','fadeOut','startScale','KFpFp','DRpHR','isSaveEventLocation','fadeOutDuration','isPreventSelfMovement','isAirship','Game_Event_meetsConditionsCPC','Game_CharacterBase_setDirection','GhfzD','setLastPluginCommandInterpreter','gGRWj','offsetX','Game_CharacterBase_opacity','PosX','realMoveSpeed','QRQWJ','startEncounterEffect','endOffsetX','_moveRoute','DashingEnable','reverseDir','Game_CharacterBase_hasStepAnime','_moveOnlyRegions','processMoveRouteJumpToCharacter','_paused','LOWER\x20LEFT','_reflection','eventLabelsVisible','Step1MapId','moveTowardPoint','isPassableByAnyDirection','isAutoBufferIcon','mirror\x20vertical','isEventsMoveCoreInvisible','Game_SelfSwitches_value','delay','Game_Event_isCollidedWithPlayerCharacters','HZHkK','MULTIPLY','_forceDashing','WalkForbid','_startY','tCFmK','wgBmh','ConvertParams','VehicleForbid','resetSelfSwitchesForMap','Game_Timer_stop','HxXpA','processMoveSynchMirrorHorz','executeCommand','updateScaleBase','ARRAYSTR','setTileBitmap','setupEventsMoveCoreNotetags','processMoveSynchReverseMimic','ARFKo','_followerChaseOff','YpkLj','activationProximityType','iconWidth','initEventsMoveCoreSettings','locate','startMapCommonEventOnOK','refreshEventLabels','outlineColor','_encounterEffectDuration','MapVariables','Scene_Load_onLoadSuccess','SpawnEventDespawnTerrainTags','getDirectionFromPoint','ShiftY','JWDYp','VLsDL','DRaNP','screenY','_shadowGraphic','processMoveSynchCustom','processEraseEncounterEvents','Label','_visiblePlayerX','ApEjh','2220945fnSIpd','isAirshipPassable','USER-DEFINED\x204','isDiagonalDirection','updateOpacity','woEgz','ANGER','switchId','TRUE','setEventIconDataKey','qbWBR','requestMapLoadCommonEvents','_fadeInDuration','bXpIZ','Chase','StopAutoMoveMessages','switch1Valid','FVsva','setCommonEvent','getPosingCharacterDirection','LineHeight','Game_Interpreter_PluginCommand','BhryE','of\x20Preloaded\x20Maps.\x0a\x0a','setDiagonalDirection','Game_Party_hasEncounterHalf','VisuMZ_Setup_Preload_Map','getSavedEventLocation','MUSIC\x20NOTE','posNt','registerSelfTarget','_callEventMap','SpriteBased','rAlkM','Self\x20Switch\x20%1','NzCMo','hueShift','Direction','toUpperCase','setupCopyEvent','Game_Event_checkEventTriggerAuto','createLabelWindowForTarget','_spawnPreserved','isShip','isTurnInPlace','isBoat','angle','RIGHT\x20TO\x20LEFT','Game_Vehicle_isLandOk','HMPH','_patternLocked','nynZn','_mirrorSprite','Minutes','Game_Event_clearPageSettings','checkCollisionKeywords','onChange','_target','TuLOy','isRegionForbidPass','Game_Event_meetsConditions','EocTA','Game_CharacterBase_screenY','pageIndex','PtICi','Game_CharacterBase_canPass','mNgiv','VICTORY','hasClickTrigger','aTCEp','isInstanceOfSceneMap','izTAP','iconHeight','vcbGQ','isShadowVisible','rKKNO','autoEventIconBuffer','_forceCarrying','EventLocationSave','turnRight90','processMoveSynchAway','_arcPeak','absDistance','WQPkW','updateMove','frameCount','PopupExtra','Game_Follower_chaseCharacter','processMoveRouteBalloon','LDANs','KNEEL','updateStop','firstSpawnedEvent','getAttachPictureBitmapHeight','VHHfN','updateTilt','Game_Variables_setValue','_chaseOff','DKGnT','canUpdate','parse','CPCsMet','_checkEncounterRaw','_cpc','_needsPeriodicRefresh','getControlledFollowerID','isOnRope','processMoveSynchApproach','_attachPicture','setupAttachPictureBitmap','_regionRules','WzYAc','Jhmag','destinationX','initEventsMoveCoreEffects','parallelCommonEvents','Region','Game_Timer_onExpire','ZANLp','moveSynchType','fontFace','height','onLoadSuccess','moveAwayFromCharacter','direction','Game_CharacterBase_bushDepth','startCallEvent','template','createContents','Sprite_Balloon_setup','_hue','determineCommonEventsWithCPC','selfValue','MoveRouteIndex','_eventOverloadThreshold','_DisablePlayerControl','turnLeft90','Spriteset_Map_createShadow','XMpJV','deleteIconsOnEventsDataKey','deleteSavedEventLocation','zncbR','turnAwayFromCharacter','Arc','MessageCore','%1Dock','areFollowersForceShown','clearPose','SziPW','setupPageSettings','restoreSavedEventPosition','JSON','romFE','13605fMiwFC','Frames','_realX','isWorking','region','ijPYl','Game_SelfSwitches_setValue','setupRegionRestrictions','labelWindowText','UPPER\x20RIGHT','_scene','MsgPopupEvent','createShadows','updateEventLabelText','Sprite_Character_setTileBitmap','add','Game_Temp_setDestination','TDqyv','description','updatePattern','mbcuC','removeChild','registerCommand','_hidden','EventLabelVisible','duvnV','areFollowersForceHidden','mXoxr','VariableGetSelfVariableID','createSpawnedEventWithData','_eventScreenY','morphIntoTemplate','deleteEventLocation','note','AdvancedSwitches','findProperPageIndex','isEmptyCharacter','EjPoo','includes','switch2Id','regionId','Game_CommonEvent_isActive','SWEAT','hideShadows','_spriteset','ixYfx','shift','_stopCount','onLoadAttachPicture','RurwR','aDace','NORMAL','Game_Message_setNumberInput','Game_Switches_setValue','StopAutoMoveEvents','start','Game_Player_checkEventTriggerHere','niLCx','PXOzu','forceMoveRoute','Settings','SRWgD','changeSpeed','_EventIcons','MsgDuration','clearCarrying','canStartLocalEvents','removeMorph','snXFL','distance','BalloonOffsetY','_requestSaveEventLocation','airship','follower','endAngle','SpawnEventDespawnAtXY','_lastAttachPictureFilename','row','update','getMapSpawnedEventData','_vehicleType','createDisplayObjects','Game_Map_setupEvents','STRUCT','_moveSynch','Movement','imcqo','CustomPageConditions','IVtbV','_pattern','setWaitMode','Step2MapId','maxSize','unlockEvent','setNumberInput','wfHYC','Game_CharacterBase_pattern','call','Window_ScrollText_startMessage','VkHHj','_type','Boat','qkuah','TerrainTag','custom','endScaleX','tEWyB','advancedValue','filename','Game_Followers_jumpAll','setupEvents','processMoveRoutePatternLock','characterName','match','hasCPCs','checkNeedForPeriodicRefresh','SPIN\x20CW','checkEventTriggerAuto','UPPER\x20LEFT','processMoveRouteHugWall','PostSpawnJS','needsUpdate','fAsXT','Game_Character_forceMoveRoute','createAttachPictureSprite','Game_Timer_start','UkiiI','updatePatternEventsMoveCore','pGucX','Game_Map_isDashDisabled','getPlayerDiagonalSetting','mapValue','canPass','_scaleX','Game_Character_processMoveCommand','updateScale','OCuwd','XQYYs','eArVI','updateMoveSynch','gZucS','SLEEP','startMapCommonEventOnOKTarget','approach','updateTextAngle','setPlayerDiagonalSetting','ppXjX','processMoveRouteStepToCharacter','fKRdM','JSVqP','Game_CharacterBase_screenX','ARRAYSTRUCT','Visibility','List','blendMode','loadSystem','_eventLabelOffsetY','type','setPosition','activationProximityDistance','DashModifier','isPlayerForceShown','38839218fIJIOd','_eventIconSprite','updateText','_moveAllowPlayerCollision','isPlayerWithinEncounterHalfEvents','enable','bufferY','SILENCE','needsAttachPictureUpdate','value','Passability','isTriggerIn','_saveEventLocations','initMembers','_CPCs','attachPictureSettings','lastMovedDirection','checkEventsMoveCoreStringTags','gainFrames','DTvzB','exit','setChaseOff','setPlayerControlDisable','Game_CharacterBase_characterIndex','hPdsB','_scaleBaseX','convertVariableValuesInScriptCall','_randomMoveWeight','Sprite_Character_update','QUqgX','_data','_working','getPosingCharacterPattern','NUM','Dock','filter','meetActivationProximityConditions','updatePeriodicRefresh','moveSynchTarget','BoatSpeed','BalloonOffsetX','CthDs','endOffset','erase','processMoveRouteSelfVariable','9190745zlNYYi','AllAllow','isStopFollowerChasing','vFlyk','$callEventMap','zDRIg','updateWaitMode','_event','TJQwL','tSVbs','CPC','Sprite_Character_setCharacterBitmap','characterPatternYVS8','createLabelWindows','_spriteOffsetX','12523oPTFrM','LEFT\x20TO\x20RIGHT','Game_Timer_initialize','destroy','LQoTp','eTYqZ','EventTemplates','Vvqhy','Game_CharacterBase_isTransparent','getInputDir8','VisuMZ_1_MessageCore','SwitchGetSelfSwitchABCD','smooth','lineHeight','fXafn','processMoveRouteFadeOut','_encounterNoneProximity','_seconds','ExpdL','findDiagonalDirectionTo','Step1EventId','vertical\x20mirror','SpawnEventDespawnEventID','drawTextEx','initMembersEventsMoveCore','pluginCommandCallEvent','bitmap','_eventIcon','FavorHorz','isRegionAllowPass','XhyTi','processMoveCommandEventsMoveCore','EFWCV','vPWwp','Cfjvh','ARRAYFUNC','VisuMZ_2_DragonbonesUnion','keys','_EventsMoveCoreSettings','cDbdm','mapId','pattern','gVgaw','PiyKs','HEART','_cacheSystemVisible','setSelfValue','startAngle','RAoVn','processMoveRouteAnimation'];_0x45a9=function(){return _0x59548e;};return _0x45a9();}function Sprite_VisuMz_MessagePopup(){this['initialize'](...arguments);}Sprite_VisuMz_MessagePopup[_0x270971(0xa1)]=Object[_0x270971(0x2a1)](Sprite[_0x270971(0xa1)]),Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x2a8)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x2c2)]=function(_0x27fe84){const _0x5cd25b=_0x270971;this['_settings']=_0x27fe84,Sprite['prototype'][_0x5cd25b(0x2c2)]['call'](this),this[_0x5cd25b(0x485)](),this['createDummyWindow'](),this[_0x5cd25b(0x274)](),this[_0x5cd25b(0x424)]();},Sprite_VisuMz_MessagePopup['prototype'][_0x270971(0x485)]=function(){const _0x289556=_0x270971;this[_0x289556(0x633)]=this[_0x289556(0x1c2)][_0x289556(0x5cb)],this[_0x289556(0x17c)]=this['_settings'][_0x289556(0x5cb)],this['z']=0x6,this[_0x289556(0x349)]=this[_0x289556(0x1c2)]['fadeDuration']['fadeIn'];this['_fadeInDuration']>0x0&&this[_0x289556(0x349)]>=Math[_0x289556(0x257)](this[_0x289556(0x633)]*0.48)&&(this[_0x289556(0x349)]=Math[_0x289556(0x257)](this['_duration']*0.48));this[_0x289556(0x204)]=this[_0x289556(0x349)]>0x0?0x0:0xff,this['_fadeOutDuration']=this[_0x289556(0x1c2)]['fadeDuration'][_0x289556(0x2e9)];if(this[_0x289556(0x505)]>0x0&&this[_0x289556(0x505)]>=Math[_0x289556(0x257)](this['_duration']*0.48)){if(_0x289556(0x37f)!==_0x289556(0x43c))this['_fadeOutDuration']=Math[_0x289556(0x257)](this[_0x289556(0x633)]*0.48);else{for(let _0x325d67=-this[_0x289556(0x271)][_0x289556(0xe8)];_0x325d67<=this[_0x289556(0x271)][_0x289556(0x2b0)];_0x325d67++){for(let _0x45e369=-this['_addedHitbox']['up'];_0x45e369<=this[_0x289556(0x271)][_0x289556(0x1d4)];_0x45e369++){if(!_0x25fcb8['prototype'][_0x289556(0x45a)]['call'](this,_0x43982d+_0x325d67,_0x40bca+_0x45e369,_0x34af1e))return![];}}return!![];}}this[_0x289556(0x50a)]=this['_fadeOutDuration'],this[_0x289556(0x599)]=this[_0x289556(0x1c2)][_0x289556(0x61e)]['x'],this['_startY']=this[_0x289556(0x1c2)][_0x289556(0x61e)]['y'],this[_0x289556(0x149)]=this[_0x289556(0x1c2)][_0x289556(0x4a2)]['x'],this[_0x289556(0x559)]=this[_0x289556(0x1c2)][_0x289556(0x4a2)]['y'],this[_0x289556(0x263)]=this[_0x289556(0x599)],this[_0x289556(0x25f)]=this['_startY'],this[_0x289556(0x632)]=this[_0x289556(0x1c2)][_0x289556(0x2ea)]['x'],this[_0x289556(0x50e)]=this['_settings'][_0x289556(0x2ea)]['y'],this['_targetScaleX']=this[_0x289556(0x1c2)][_0x289556(0x23b)]['x'],this[_0x289556(0x153)]=this[_0x289556(0x1c2)][_0x289556(0x23b)]['y'],this['_startAngle']=-this['_settings'][_0x289556(0x36b)][_0x289556(0x40d)],this[_0x289556(0x5b8)]=-this[_0x289556(0x1c2)][_0x289556(0x36b)][_0x289556(0x170)],this[_0x289556(0x38e)]=-this[_0x289556(0x1c2)]['misc']['arc'],this[_0x289556(0x205)]=0x0;},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x9e)]=function(){const _0x1a03a3=_0x270971,_0x41f842=this[_0x1a03a3(0x1c2)],_0x56c0bd=new Rectangle(0x0,0x0,Graphics[_0x1a03a3(0x549)],Graphics['height']);this[_0x1a03a3(0x24f)]=new Window_Base(_0x56c0bd);const _0x18f1d0=this['_dummyWindow']['textSizeEx'](_0x41f842[_0x1a03a3(0x1af)]),_0x4cca56=_0x18f1d0[_0x1a03a3(0x549)],_0x3aec9f=_0x18f1d0[_0x1a03a3(0x3b6)],_0xe576ab=_0x4cca56+$gameSystem[_0x1a03a3(0x5c8)]()*0x2,_0x4201ce=_0x3aec9f+$gameSystem[_0x1a03a3(0x5c8)]()*0x2;this[_0x1a03a3(0x24f)][_0x1a03a3(0x1b3)](0x0,0x0,_0xe576ab,_0x4201ce),this[_0x1a03a3(0x24f)]['createContents'](),this[_0x1a03a3(0x24f)]['drawTextEx'](_0x41f842[_0x1a03a3(0x1af)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)]['createTextSprite']=function(){const _0x11406d=_0x270971;this['_textSprite']=new Sprite(),this['_textSprite'][_0x11406d(0x4ce)]=this['_dummyWindow'][_0x11406d(0x564)],this[_0x11406d(0xb4)]['anchor']['x']=0.5,this[_0x11406d(0xb4)][_0x11406d(0x5c9)]['y']=0.5,this['_textSprite']['x']=this['_startX'],this[_0x11406d(0xb4)]['y']=this[_0x11406d(0x314)],this[_0x11406d(0xb4)][_0x11406d(0x269)]['x']=this[_0x11406d(0x632)],this['_textSprite']['scale']['y']=this['_startScaleY'],this[_0x11406d(0xb4)][_0x11406d(0x36b)]=this[_0x11406d(0x15d)],this[_0x11406d(0x9d)](this[_0x11406d(0xb4)]);},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x424)]=function(){const _0x58d084=_0x270971;Sprite['prototype'][_0x58d084(0x424)][_0x58d084(0x437)](this);if(!this[_0x58d084(0x3a0)]())return;this[_0x58d084(0x116)](),this[_0x58d084(0x184)](),this[_0x58d084(0xd7)](),this[_0x58d084(0x466)](),this[_0x58d084(0x341)](),this[_0x58d084(0x1d8)]();},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x3a0)]=function(){return!!this['_textSprite'];},Sprite_VisuMz_MessagePopup['prototype'][_0x270971(0x116)]=function(){const _0x54804b=_0x270971,_0x19e007=this[_0x54804b(0x1c2)];{const _0x18683d=$gameMap[_0x54804b(0xd6)](),_0x51c8c5=_0x19e007[_0x54804b(0x506)]['x'],_0xf54b9f=$gameMap[_0x54804b(0x8b)](_0x51c8c5);this['x']=Math[_0x54804b(0x257)](_0xf54b9f*_0x18683d+_0x18683d/0x2);}{const _0x3d3f34=$gameMap[_0x54804b(0x1d7)](),_0x58924b=_0x19e007['tileCoordinates']['y'],_0x2c3735=$gameMap[_0x54804b(0x2bb)](_0x58924b);this['y']=Math['floor'](_0x2c3735*_0x3d3f34+_0x3d3f34);}},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x184)]=function(){const _0x1adb55=_0x270971;if(this[_0x1adb55(0x633)]<=0x0)return;const _0x5df089=this[_0x1adb55(0x633)],_0x35fe52=this[_0x1adb55(0x17c)];{if(_0x1adb55(0x1bb)===_0x1adb55(0x12e)){if(this[_0x1adb55(0x415)]===_0x55d9f7)this['initEventsMoveCore']();if(!_0x1ddc52)return null;if(_0x9468cc===_0x27b8d5)return this[_0x1adb55(0x415)][_0x1adb55(0xa2)];else{const _0x45eb69=_0x422344[_0x1adb55(0x543)][_0x1adb55(0x412)],_0x6b58e2=_0x1adb55(0x56a)[_0x1adb55(0x27e)](_0x260808[_0x1adb55(0x61a)],_0x5d7f4d[_0x1adb55(0x8a)]);return this['_EventIcons'][_0x6b58e2]=this[_0x1adb55(0x415)][_0x6b58e2]||{'iconIndex':0x0,'bufferX':_0x45eb69[_0x1adb55(0x59a)][_0x1adb55(0x110)],'bufferY':_0x45eb69[_0x1adb55(0x59a)][_0x1adb55(0x5ee)],'blendMode':_0x45eb69[_0x1adb55(0x59a)][_0x1adb55(0xd4)]},this[_0x1adb55(0x415)][_0x6b58e2];}}else this[_0x1adb55(0x263)]=(this['_offsetX']*(_0x5df089-0x1)+this['_targetX'])/_0x5df089,this['_offsetY']=(this[_0x1adb55(0x25f)]*(_0x5df089-0x1)+this[_0x1adb55(0x559)])/_0x5df089;}{const _0x48e0b5=_0x35fe52-_0x5df089,_0x3d5d4d=_0x35fe52/0x2,_0x338669=this[_0x1adb55(0x38e)],_0x1f05be=-_0x338669/Math[_0x1adb55(0xfc)](_0x3d5d4d,0x2);this[_0x1adb55(0x205)]=_0x1f05be*Math[_0x1adb55(0xfc)](_0x48e0b5-_0x3d5d4d,0x2)+_0x338669;}this[_0x1adb55(0xb4)]['x']=this[_0x1adb55(0x263)],this[_0x1adb55(0xb4)]['y']=this['_offsetY']+this[_0x1adb55(0x205)];},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)]['updateTextScale']=function(){const _0x4e6a7b=_0x270971;if(this[_0x4e6a7b(0x633)]<=0x0)return;const _0x1833e0=this[_0x4e6a7b(0x633)];this['_textSprite']['scale']['x']=(this[_0x4e6a7b(0xb4)][_0x4e6a7b(0x269)]['x']*(_0x1833e0-0x1)+this[_0x4e6a7b(0x4e9)])/_0x1833e0,this['_textSprite'][_0x4e6a7b(0x269)]['y']=(this['_textSprite']['scale']['y']*(_0x1833e0-0x1)+this[_0x4e6a7b(0x153)])/_0x1833e0;},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)]['updateTextAngle']=function(){const _0xca0d3a=_0x270971;if(this[_0xca0d3a(0x633)]<=0x0)return;const _0x374d44=this['_duration'];this[_0xca0d3a(0xb4)][_0xca0d3a(0x36b)]=(this[_0xca0d3a(0xb4)]['angle']*(_0x374d44-0x1)+this[_0xca0d3a(0x5b8)])/_0x374d44;},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)]['updateOpacity']=function(){const _0x3b11a9=_0x270971;this['updateFadeIn'](),this[_0x3b11a9(0x4f9)]();},Sprite_VisuMz_MessagePopup['prototype'][_0x270971(0x2de)]=function(){const _0x578b0c=_0x270971;if(this[_0x578b0c(0x349)]<=0x0)return;const _0x3d5bfc=this['_fadeInDuration'];this[_0x578b0c(0x204)]=(this[_0x578b0c(0x204)]*(_0x3d5bfc-0x1)+0xff)/_0x3d5bfc,this['_fadeInDuration']--,this[_0x578b0c(0x349)]<=0x0&&(this[_0x578b0c(0x204)]=0xff);},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)][_0x270971(0x4f9)]=function(){const _0x1f257c=_0x270971;if(this['_fadeOutDuration']<=0x0)return;if(this[_0x1f257c(0x633)]>this[_0x1f257c(0x50a)])return;const _0x1f15c7=this[_0x1f257c(0x505)];this[_0x1f257c(0x204)]=(this[_0x1f257c(0x204)]*(_0x1f15c7-0x1)+0x0)/_0x1f15c7,this[_0x1f257c(0x505)]--,this[_0x1f257c(0x505)]<=0x0&&(this[_0x1f257c(0x204)]=0x0);},Sprite_VisuMz_MessagePopup[_0x270971(0xa1)]['updateDuration']=function(){const _0x4efa2a=_0x270971;if(this[_0x4efa2a(0x633)]<=0x0)return;this[_0x4efa2a(0x633)]--;if(this[_0x4efa2a(0x633)]<=0x0){if(this[_0x4efa2a(0x162)])this[_0x4efa2a(0x162)][_0x4efa2a(0x3eb)](this);if(this[_0x4efa2a(0xb4)]['bitmap']){if(_0x4efa2a(0x2dc)!==_0x4efa2a(0x2dc)){if(this[_0x4efa2a(0x511)]===_0x136057)this[_0x4efa2a(0x1f8)]();return this['_MapSpawnedEventData'][_0x33d26e]=this[_0x4efa2a(0x511)][_0x5530f5]||[],this['_MapSpawnedEventData'][_0x3635e9];}else this['_textSprite'][_0x4efa2a(0x4ce)][_0x4efa2a(0x4b7)]();}}},VisuMZ[_0x270971(0x543)]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x270971(0xa1)][_0x270971(0x22d)],Spriteset_Map[_0x270971(0xa1)][_0x270971(0x22d)]=function(){const _0x517448=_0x270971;VisuMZ['EventsMoveCore'][_0x517448(0x18f)][_0x517448(0x437)](this),this[_0x517448(0x4b2)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x3c6)]=Spriteset_Map[_0x270971(0xa1)][_0x270971(0x1e5)],Spriteset_Map['prototype'][_0x270971(0x1e5)]=function(){const _0x2840a1=_0x270971;VisuMZ['EventsMoveCore'][_0x2840a1(0x3c6)][_0x2840a1(0x437)](this),this[_0x2840a1(0x3e2)]();},Spriteset_Map[_0x270971(0xa1)]['createShadows']=function(){const _0x4e8139=_0x270971;if(!VisuMZ[_0x4e8139(0x543)][_0x4e8139(0x412)][_0x4e8139(0x42b)]['ShowShadows'])return;for(const _0x5ae587 of this[_0x4e8139(0x181)]){this[_0x4e8139(0x1ad)](_0x5ae587);}},Spriteset_Map['prototype'][_0x270971(0x1ad)]=function(_0x1a9728){const _0x39d886=_0x270971;_0x1a9728[_0x39d886(0x1da)]=new Sprite(),_0x1a9728['_shadowSprite'][_0x39d886(0x4e8)]=_0x1a9728['_character'][_0x39d886(0x1c4)](),_0x1a9728[_0x39d886(0x1da)][_0x39d886(0x4ce)]=ImageManager[_0x39d886(0x471)](_0x1a9728['_shadowSprite'][_0x39d886(0x4e8)]),_0x1a9728[_0x39d886(0x1da)][_0x39d886(0x5c9)]['x']=0.5,_0x1a9728[_0x39d886(0x1da)]['anchor']['y']=0x1,_0x1a9728[_0x39d886(0x1da)]['z']=0x0,this[_0x39d886(0x102)][_0x39d886(0x9d)](_0x1a9728['_shadowSprite']);},Spriteset_Map['prototype'][_0x270971(0x401)]=function(){const _0x32d1f7=_0x270971;if(!VisuMZ[_0x32d1f7(0x543)][_0x32d1f7(0x412)]['Movement']['ShowShadows'])return;for(const _0x400d34 of this[_0x32d1f7(0x181)]){if('gDDmZ'!==_0x32d1f7(0x582))this['_tilemap']['removeChild'](_0x400d34[_0x32d1f7(0x1da)]);else{const _0x200832=[_0x1d0251[_0x32d1f7(0x61a)],_0x52257[_0x32d1f7(0x8a)],'Self\x20Variable\x20%1'['format'](_0x290c59)];return _0x46e4c5['value'](_0x200832);}}},Spriteset_Map[_0x270971(0xa1)][_0x270971(0x4b2)]=function(){const _0x17f85f=_0x270971;this[_0x17f85f(0xe0)]=[];for(const _0x2583fb of $gameMap[_0x17f85f(0x1b6)]()){this[_0x17f85f(0x366)](_0x2583fb);}},Spriteset_Map[_0x270971(0x285)]=VisuMZ[_0x270971(0x543)][_0x270971(0x412)][_0x270971(0x33a)][_0x270971(0x4fd)]??!![],Spriteset_Map[_0x270971(0xa1)]['createLabelWindowForTarget']=function(_0x5e8c22){const _0x16086a=_0x270971;if(!this['isTargetEventValidForLabelWindow'](_0x5e8c22))return;if(Utils[_0x16086a(0x24c)]()){if(!Spriteset_Map[_0x16086a(0x285)])return;}let _0x4bda28;const _0x4a6fda=VisuMZ[_0x16086a(0x543)]['Settings'][_0x16086a(0x33a)][_0x16086a(0x35d)]??!![];_0x4bda28=_0x4a6fda?new Sprite_EventLabel(_0x5e8c22):new Window_EventLabel(_0x5e8c22),_0x4bda28['z']=0x8,_0x4bda28[_0x16086a(0x19b)]=Sprite[_0x16086a(0x2d1)]++,this['_tilemap']['addChild'](_0x4bda28),this['_labelWindows']['push'](_0x4bda28);},Spriteset_Map[_0x270971(0xa1)][_0x270971(0x136)]=function(_0x14609d){const _0x405cc8=_0x270971,_0x47bd54=_0x14609d[_0x405cc8(0x22b)]();if(_0x47bd54[_0x405cc8(0x3f7)][_0x405cc8(0x447)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x47bd54[_0x405cc8(0x3f7)][_0x405cc8(0x447)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x581128 of _0x47bd54[_0x405cc8(0x1ae)]){if(_0x405cc8(0x34e)!=='isXHm'){let _0x34c32a='';for(const _0x43f7a5 of _0x581128[_0x405cc8(0x157)]){[0x6c,0x198][_0x405cc8(0x3fc)](_0x43f7a5['code'])&&(_0x34c32a+=_0x43f7a5[_0x405cc8(0x16b)][0x0]);}if(_0x34c32a['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x34c32a[_0x405cc8(0x447)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if('ArdiJ'===_0x405cc8(0x164)){_0x19fd88[_0x405cc8(0x4ed)]()&&_0xb97d28(_0x405cc8(0x231)+_0x405cc8(0x56f));return;}else return!![];}}else{if(!_0x327d27)return;if(!this[_0x405cc8(0x497)])return;if(this[_0x405cc8(0x303)])return;if(this[_0x405cc8(0x120)]<=0x0)return;if(this['_speed']===_0x8e2e56)this[_0x405cc8(0x1f8)]();this['_frames']+=this[_0x405cc8(0x12f)],this[_0x405cc8(0x120)]<=0x0&&this[_0x405cc8(0x161)]();}}return![];},Spriteset_Map['prototype'][_0x270971(0x1a0)]=function(_0x1e8e2a){const _0x8593b2=_0x270971;this['_characterSprites']=this[_0x8593b2(0x181)]||[];const _0x7db2b0=new Sprite_Character(_0x1e8e2a);this[_0x8593b2(0x181)][_0x8593b2(0x1bd)](_0x7db2b0),this[_0x8593b2(0x102)]['addChild'](_0x7db2b0),this[_0x8593b2(0x1ad)](_0x7db2b0),this[_0x8593b2(0x366)](_0x1e8e2a),_0x7db2b0[_0x8593b2(0x424)]();},Spriteset_Map[_0x270971(0xa1)][_0x270971(0x32b)]=function(){const _0x317efd=_0x270971;if(!this[_0x317efd(0xe0)])return;for(const _0x58a31c of this[_0x317efd(0xe0)]){_0x317efd(0xb7)===_0x317efd(0x25b)?(_0xf9b846[_0x317efd(0x159)](),this['start']()):_0x58a31c&&(_0x58a31c[_0x317efd(0x33b)]=undefined,_0x58a31c[_0x317efd(0xdb)]());}},Spriteset_Map[_0x270971(0xa1)]['createEventsMoveCoreMessagePopup']=function(_0x578b92,_0x4d3fe7){const _0xf2956a=_0x270971;if(!_0x578b92)return;_0x4d3fe7[_0xf2956a(0x506)]={'x':_0x578b92['x'],'y':_0x578b92['y']},this['createEventsMoveCoreTileMessagePopup'](_0x4d3fe7);},Spriteset_Map[_0x270971(0xa1)]['createEventsMoveCoreTileMessagePopup']=function(_0x8c71d8){const _0x3636c4=_0x270971;if(!this['_tilemap'])return;const _0x17de7e=new Sprite_VisuMz_MessagePopup(_0x8c71d8);this[_0x3636c4(0x102)]['addChild'](_0x17de7e);},VisuMZ[_0x270971(0x543)][_0x270971(0x40a)]=Game_Message[_0x270971(0xa1)][_0x270971(0x434)],Game_Message[_0x270971(0xa1)]['setNumberInput']=function(_0x5383f6,_0xac9da3){const _0x27d252=_0x270971;this[_0x27d252(0x189)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x27d252(0x543)][_0x27d252(0x40a)]['call'](this,_0x5383f6,_0xac9da3);},VisuMZ[_0x270971(0x543)][_0x270971(0x2bc)]=Window_NumberInput[_0x270971(0xa1)][_0x270971(0x40d)],Window_NumberInput[_0x270971(0xa1)][_0x270971(0x40d)]=function(){const _0x41af1a=_0x270971;$gameTemp['registerSelfTarget']($gameMessage[_0x41af1a(0x189)]),VisuMZ[_0x41af1a(0x543)][_0x41af1a(0x2bc)][_0x41af1a(0x437)](this),$gameTemp[_0x41af1a(0x152)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x4eb)]=Window_NumberInput[_0x270971(0xa1)][_0x270971(0x23d)],Window_NumberInput[_0x270971(0xa1)][_0x270971(0x23d)]=function(){const _0x34d828=_0x270971;$gameTemp['registerSelfTarget']($gameMessage[_0x34d828(0x189)]),VisuMZ['EventsMoveCore']['Window_NumberInput_processOk'][_0x34d828(0x437)](this),$gameTemp[_0x34d828(0x152)](),$gameMessage[_0x34d828(0x189)]=undefined;},VisuMZ[_0x270971(0x543)][_0x270971(0x634)]=Game_Message[_0x270971(0xa1)][_0x270971(0x156)],Game_Message['prototype'][_0x270971(0x156)]=function(_0x2a2d5e,_0x4b3a7a){const _0x451825=_0x270971;this[_0x451825(0xad)]=$gameTemp[_0x451825(0x11d)](),VisuMZ[_0x451825(0x543)]['Game_Message_setItemChoice'][_0x451825(0x437)](this,_0x2a2d5e,_0x4b3a7a);},VisuMZ[_0x270971(0x543)][_0x270971(0x197)]=Window_EventItem[_0x270971(0xa1)][_0x270971(0x589)],Window_EventItem['prototype'][_0x270971(0x589)]=function(){const _0x5e9eba=_0x270971;$gameTemp[_0x5e9eba(0x35b)]($gameMessage[_0x5e9eba(0xad)]),VisuMZ[_0x5e9eba(0x543)][_0x5e9eba(0x197)][_0x5e9eba(0x437)](this),$gameTemp['clearSelfTarget'](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore']['Window_EventItem_onCancel']=Window_EventItem[_0x270971(0xa1)][_0x270971(0x1a8)],Window_EventItem[_0x270971(0xa1)][_0x270971(0x1a8)]=function(){const _0x2d7c85=_0x270971;$gameTemp[_0x2d7c85(0x35b)]($gameMessage[_0x2d7c85(0xad)]),VisuMZ['EventsMoveCore'][_0x2d7c85(0x55d)][_0x2d7c85(0x437)](this),$gameTemp[_0x2d7c85(0x152)](),$gameMessage[_0x2d7c85(0xad)]=undefined;},VisuMZ[_0x270971(0x543)]['Window_Message_startMessage']=Window_Message['prototype'][_0x270971(0x2e1)],Window_Message[_0x270971(0xa1)][_0x270971(0x2e1)]=function(){const _0xb71410=_0x270971;$gameMessage[_0xb71410(0x180)](),VisuMZ[_0xb71410(0x543)]['Window_Message_startMessage'][_0xb71410(0x437)](this),$gameTemp[_0xb71410(0x152)]();},VisuMZ[_0x270971(0x543)][_0x270971(0x438)]=Window_ScrollText[_0x270971(0xa1)][_0x270971(0x2e1)],Window_ScrollText[_0x270971(0xa1)]['startMessage']=function(){const _0x20bd80=_0x270971;$gameMessage[_0x20bd80(0x180)](),VisuMZ['EventsMoveCore'][_0x20bd80(0x438)][_0x20bd80(0x437)](this),$gameTemp[_0x20bd80(0x152)]();};function Window_EventLabel(){const _0x462067=_0x270971;this[_0x462067(0x2c2)](...arguments);}Window_EventLabel['prototype']=Object[_0x270971(0x2a1)](Window_Base['prototype']),Window_EventLabel[_0x270971(0xa1)][_0x270971(0x2a8)]=Window_EventLabel,Window_EventLabel[_0x270971(0xa1)]['initialize']=function(_0x4c9d41){const _0x22a219=_0x270971;this[_0x22a219(0x4ac)]=_0x4c9d41;const _0x462b5e=new Rectangle(0x0,0x0,Graphics[_0x22a219(0xc0)]/0x4,this[_0x22a219(0xc9)](0x1));this[_0x22a219(0x485)](),Window_Base[_0x22a219(0xa1)][_0x22a219(0x2c2)][_0x22a219(0x437)](this,_0x462b5e),this['contentsOpacity']=0x0,this[_0x22a219(0x1e0)](0x2),this['_text']='';},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x485)]=function(){const _0x456fde=_0x270971;this[_0x456fde(0xae)]=![],this[_0x456fde(0x561)]=$gameScreen[_0x456fde(0x5e6)](),this[_0x456fde(0xa8)]=this[_0x456fde(0x4ac)][_0x456fde(0x1de)](),this[_0x456fde(0x3f4)]=this[_0x456fde(0x4ac)][_0x456fde(0x336)](),this['_eventLabelOffsetX']=this[_0x456fde(0x4ac)][_0x456fde(0x240)][_0x456fde(0x2f6)],this[_0x456fde(0x472)]=this['_event'][_0x456fde(0x240)][_0x456fde(0x515)],this[_0x456fde(0x266)]=this[_0x456fde(0x4ac)][_0x456fde(0x584)],this[_0x456fde(0x12d)]=this[_0x456fde(0x2d0)](),this['_cacheSystemVisible']=$gameSystem[_0x456fde(0x306)](),this[_0x456fde(0x33b)]=$gamePlayer['x'],this[_0x456fde(0x140)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x456fde(0x4ac)]['x'],this[_0x456fde(0x2d3)]=this[_0x456fde(0x4ac)]['y'];},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x424)]=function(){const _0x48790e=_0x270971;Window_Base['prototype'][_0x48790e(0x424)]['call'](this);if(!this['needsUpdate']())return;this[_0x48790e(0x47a)](),this[_0x48790e(0x45d)](),this[_0x48790e(0x5d5)](),this[_0x48790e(0x341)]();},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x44f)]=function(){const _0x54ceac=_0x270971;if(!this[_0x54ceac(0x4ac)])return![];if(!this[_0x54ceac(0x4ac)][_0x54ceac(0x240)])return![];if(this['_eventPageIndex']!==this['_event'][_0x54ceac(0x584)])return!![];if(this[_0x54ceac(0x4ac)]['_erased']&&!this[_0x54ceac(0xae)])return!![];if(this['_event'][_0x54ceac(0x240)][_0x54ceac(0x1af)]==='')return![];if(this[_0x54ceac(0x561)]!==$gameScreen['zoomScale']())return!![];if(this[_0x54ceac(0xa8)]!==this[_0x54ceac(0x4ac)][_0x54ceac(0x1de)]())return!![];if(this[_0x54ceac(0x3f4)]!==this[_0x54ceac(0x4ac)]['screenY']())return!![];if(this[_0x54ceac(0x613)]!==this[_0x54ceac(0x4ac)][_0x54ceac(0x240)][_0x54ceac(0x2f6)])return!![];if(this['_eventLabelOffsetY']!==this[_0x54ceac(0x4ac)][_0x54ceac(0x240)]['offsetY'])return!![];if(this[_0x54ceac(0x33b)]!==$gamePlayer['x'])return!![];if(this[_0x54ceac(0x140)]!==$gamePlayer['y'])return!![];if(this[_0x54ceac(0xb6)]!==this['_event']['x'])return!![];if(this[_0x54ceac(0x2d3)]!==this[_0x54ceac(0x4ac)]['y'])return!![];if(this[_0x54ceac(0x4e1)]!==$gameSystem[_0x54ceac(0x306)]())return!![];if(this[_0x54ceac(0x12d)]&&this[_0x54ceac(0x27d)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x54ceac(0x27d)]>0x0)return!![];if(SceneManager[_0x54ceac(0x3e0)][_0x54ceac(0x32d)]>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x270971(0x47a)]=function(){const _0x451e65=_0x270971;if(this['_event']['labelWindowText']()!==this[_0x451e65(0x5d1)]){if(_0x451e65(0x1a5)!=='XQcBU')this[_0x451e65(0x5d1)]=this[_0x451e65(0x4ac)][_0x451e65(0x3de)](),this[_0x451e65(0xdb)]();else return _0x3c1415;}},Window_EventLabel['prototype'][_0x270971(0x45d)]=function(){const _0x2748da=_0x270971;this['scale']['x']=0x1/$gameScreen[_0x2748da(0x5e6)](),this[_0x2748da(0x269)]['y']=0x1/$gameScreen[_0x2748da(0x5e6)](),this[_0x2748da(0x561)]=$gameScreen[_0x2748da(0x5e6)]();},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x5d5)]=function(){const _0x416f80=_0x270971;if(!SceneManager[_0x416f80(0x3e0)])return;if(!SceneManager[_0x416f80(0x3e0)][_0x416f80(0x402)])return;const _0x559421=SceneManager[_0x416f80(0x3e0)][_0x416f80(0x402)]['findTargetSprite'](this['_event']);if(!_0x559421)return;this['x']=Math[_0x416f80(0x594)](this['_event'][_0x416f80(0x1de)]()-Math[_0x416f80(0x257)](this['width']*this['scale']['x']/0x2)),this['x']+=this['_event']['_labelWindow']['offsetX'],this['y']=this[_0x416f80(0x4ac)][_0x416f80(0x336)]()-_0x559421['height'],this['y']+=Math[_0x416f80(0x594)]($gameSystem[_0x416f80(0x5c8)]()*0.5),this['y']-=Math['round'](this[_0x416f80(0x3b6)]*this[_0x416f80(0x269)]['y']),this['y']+=this[_0x416f80(0x4ac)][_0x416f80(0x240)][_0x416f80(0x515)],this[_0x416f80(0xae)]=this[_0x416f80(0x4ac)][_0x416f80(0xbb)],this['_eventScreenX']=this['_event']['screenX'](),this[_0x416f80(0x3f4)]=this[_0x416f80(0x4ac)][_0x416f80(0x336)](),this[_0x416f80(0x613)]=this[_0x416f80(0x4ac)][_0x416f80(0x240)][_0x416f80(0x2f6)],this['_eventLabelOffsetY']=this[_0x416f80(0x4ac)][_0x416f80(0x240)][_0x416f80(0x515)],this['_eventPageIndex']=this[_0x416f80(0x4ac)][_0x416f80(0x584)],this[_0x416f80(0xae)]&&(this[_0x416f80(0x27d)]=0x0);},Window_EventLabel[_0x270971(0xa1)]['updateOpacity']=function(){const _0x4ac22f=_0x270971;if(this['isLabelVisible']())this['contentsOpacity']+=this[_0x4ac22f(0xed)]();else SceneManager[_0x4ac22f(0x3e0)][_0x4ac22f(0x32d)]>0x0?this[_0x4ac22f(0x27d)]=0x0:this[_0x4ac22f(0x27d)]-=this[_0x4ac22f(0xed)]();},Window_EventLabel['prototype']['isLabelVisible']=function(){const _0x76943f=_0x270971;if(!$gameSystem[_0x76943f(0x306)]())return![];if(this[_0x76943f(0x4ac)]?.['_erased'])return![];if(SceneManager[_0x76943f(0x3e0)][_0x76943f(0x32d)]>0x0)return![];const _0x2ed370=$gamePlayer['x'],_0x5768b6=$gamePlayer['y'],_0x3da7da=this['_event']['x'],_0x501067=this[_0x76943f(0x4ac)]['y'];if(this[_0x76943f(0x33b)]===_0x2ed370&&this[_0x76943f(0x140)]===_0x5768b6&&this[_0x76943f(0xb6)]===_0x3da7da&&this['_visibleEventY']===_0x501067)return this[_0x76943f(0x12d)];this[_0x76943f(0x33b)]=$gamePlayer['x'],this[_0x76943f(0x140)]=$gamePlayer['y'],this[_0x76943f(0xb6)]=this[_0x76943f(0x4ac)]['x'],this[_0x76943f(0x2d3)]=this[_0x76943f(0x4ac)]['y'];if($gameMap[_0x76943f(0x38f)](_0x2ed370,_0x5768b6,_0x3da7da,_0x501067)>this[_0x76943f(0x4ac)][_0x76943f(0x14e)]())return this['_cacheVisibility']=![],![];return this[_0x76943f(0x12d)]=!![],!![];},Window_EventLabel[_0x270971(0xa1)][_0x270971(0xed)]=function(){const _0x53aa3d=_0x270971;return VisuMZ['EventsMoveCore']['Settings'][_0x53aa3d(0x33a)][_0x53aa3d(0x2c5)];},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x541)]=function(){const _0x3eb507=_0x270971,_0x30eb30=this[_0x3eb507(0xb2)](this[_0x3eb507(0x5d1)]);this[_0x3eb507(0x549)]=_0x30eb30[_0x3eb507(0x549)]+($gameSystem['windowPadding']()+this[_0x3eb507(0x2aa)]())*0x2,this[_0x3eb507(0x3b6)]=Math[_0x3eb507(0x60f)](this['lineHeight'](),_0x30eb30[_0x3eb507(0x3b6)])+$gameSystem[_0x3eb507(0x5c8)]()*0x2,this[_0x3eb507(0x3bd)]();},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x4c1)]=function(){const _0x4f69fc=_0x270971;return VisuMZ['EventsMoveCore']['Settings'][_0x4f69fc(0x33a)][_0x4f69fc(0x351)];},Window_EventLabel[_0x270971(0xa1)]['resetFontSettings']=function(){const _0x3aa2b3=_0x270971;Window_Base[_0x3aa2b3(0xa1)][_0x3aa2b3(0x544)][_0x3aa2b3(0x437)](this),this['contents'][_0x3aa2b3(0x4fc)]=this[_0x3aa2b3(0x227)]();},Window_EventLabel['prototype'][_0x270971(0x227)]=function(){const _0x2b8ecd=_0x270971;return VisuMZ[_0x2b8ecd(0x543)][_0x2b8ecd(0x412)][_0x2b8ecd(0x33a)][_0x2b8ecd(0x2d4)];},Window_EventLabel[_0x270971(0xa1)]['refresh']=function(){const _0x5dd934=_0x270971;this[_0x5dd934(0x541)](),this['contents'][_0x5dd934(0x4ef)]();const _0xe5af52=this[_0x5dd934(0x5d1)]['split'](/[\r\n]+/);let _0x2ab790=0x0;for(const _0x521667 of _0xe5af52){const _0x3aa222=this[_0x5dd934(0xb2)](_0x521667),_0x141a16=Math[_0x5dd934(0x257)]((this[_0x5dd934(0x565)]-_0x3aa222[_0x5dd934(0x549)])/0x2);this[_0x5dd934(0x4cb)](_0x521667,_0x141a16,_0x2ab790),_0x2ab790+=_0x3aa222['height'];}},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x29a)]=function(_0x2525b7,_0x290f39){const _0x2ab92c=_0x270971;_0x290f39[_0x2ab92c(0x51f)]&&this[_0x2ab92c(0x5c4)](_0x2525b7,_0x290f39['x']+0x2,_0x290f39['y']),_0x290f39['x']+=Math[_0x2ab92c(0x16f)](this[_0x2ab92c(0x555)](),ImageManager[_0x2ab92c(0x327)])+0x4;},Window_EventLabel[_0x270971(0xa1)][_0x270971(0x5c4)]=function(_0x38e77f,_0x280257,_0x34e47b){const _0x76df02=_0x270971,_0x19a22b=ImageManager['loadSystem'](_0x76df02(0x12c)),_0x17ccc3=ImageManager[_0x76df02(0x327)],_0x448325=ImageManager[_0x76df02(0x385)],_0x36e939=_0x38e77f%0x10*_0x17ccc3,_0x8692a=Math[_0x76df02(0x257)](_0x38e77f/0x10)*_0x448325,_0xad5b50=Math['min'](this['iconSize']()),_0xd664f9=Math[_0x76df02(0x16f)](this[_0x76df02(0x555)]());this[_0x76df02(0x564)][_0x76df02(0x5db)](_0x19a22b,_0x36e939,_0x8692a,_0x17ccc3,_0x448325,_0x280257,_0x34e47b,_0xad5b50,_0xd664f9);},Window_EventLabel[_0x270971(0xa1)]['iconSize']=function(){const _0xc77fd2=_0x270971;return VisuMZ[_0xc77fd2(0x543)][_0xc77fd2(0x412)][_0xc77fd2(0x33a)][_0xc77fd2(0x4fe)];};