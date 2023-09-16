//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.53;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.53] [EventsMoveCore]
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
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
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
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
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
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
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
//=============================================================================

const _0x3bfc03=_0xf910;function _0x3eb5(){const _0x3ff46b=['fchpj','Game_Troop_meetsConditions','_moveRouteIndex','yNQAO','return\x200','EnableTurnInPlace','processMoveRouteFadeIn','_starting','meetsCPC','lineHeight','turnAwayFromPoint','_active','front','updateShadowChanges','108eLnYwv','of\x20Preloaded\x20Maps.\x0a\x0a','updateStop','conditions','Game_Map_update','width','_screenZoomScale','anchor','Visible','Game_CharacterBase_screenX','FollowerReset','ZryIl','processMoveSynchDirection','realMoveSpeed','CustomPageConditions','AIdxa','SpriteBased','isSpawnedEvent','General','contents','wtVKH','pNpnW','floor','Game_Message_add','FSLCt','push','moveStraight','Game_Event_update','hzPtA','areFollowersForceShown','_events','bjujV','_scaleY','followers','onChange','resetFontSettings','attachPictureBlendMode','drawText','Passability','ARRAYSTRUCT','jump','Game_Timer_initialize','requestRefresh','_eventOverloadThreshold','startEncounterEffect','WbJGl','updateAttachPictureBitmap','Game_System_initialize','lastMovedDirection','custom','isSpawnHitboxCollisionOk','setValue','FollowerID','updateEventLabelText','DEFAULT_SHIFT_Y','WYeCV','_saveEventLocation','update','loadDataFile','EventTimerFramesSet','_visibleEventX','CWrDW','AItRm','despawnEverything','_eventScreenY','SpawnEventAtTerrainTag','_spriteOffsetX','isRegionDockable','updatePosition','_regionRules','eventLabelsVisible','EventLabelVisible','OffsetY','Game_Troop_meetsConditionsCPC','SCbDo','advancedFunc','EventTimerPause','aHaLv','parse','getAttachPictureBitmapWidth','PwGjT','down','setSelfValue','loadCPC','isTriggerIn','Value','createProxyWindow','PostSpawnJS','_eventCopyData','ANNOYED','_labelWindows','lHUbW','getDirectionFromPoint','EzofP','turnTowardPoint','_spawnPreserved','LIGHT-BULB','Game_Player_getInputDirection','isCollidedWithEvents','Settings','Game_Map_unlockEvent','processMoveRouteJumpToCharacter','PostMorphJS','findProperPageIndex','activationProximityType','uouaZ','TJPJw','viWhj','page','EVAL','Game_CharacterBase_setDirection','player','AutoBuffer','_vehicleType','kcqaV','_EventIcons','24093yOnLDp','spawnEventId','jUKhM','EventTimerFramesGain','checkEventTriggerEventsMoveCore','filter','unlock','gSlDw','EjFdD','612210LvdHLC','GYOeh','ZUNaT','Game_Event_updateParallel','STR','itemPadding','pCtxY','mJPkw','XJVXP','SpawnEventDespawnAtXY','setOpacity','LIGHT','irtme','toUpperCase','updateHueShift','isCollidedWithPlayerCharacters','turnRight90','XqqUG','GSOqA','_followerControlID','updateEventMirrorSprite','USER-DEFINED\x201','EventsMoveCore','LUJJU','Game_Timer_onExpire','createIconSprite','isRegionAllowPass','CDQly','wEXPu','MapVariables','Game_Variables_value','processMoveRouteBalloon','BULB','clearCarrying','_forceCarrying','Game_Map_refresh','rJfAw','_eventLabelOffsetY','_cpc','setAllowEventAutoMovement','DhbAv','achiU','deleteIconsOnEventsData','Game_Event_meetsConditions','TiltLeft','zfCIB','_lastAttachPictureMaxSize','WVmgR','setPlayerControlDisable','copy','_attachPictureSprite','regionId','character','QqcVo','uBvTG','findDiagonalDirectionTo','setNumberInput','activationProximityDistance','drawIcon','deleteIconsOnEventsDataKey','lgJpb','_visiblePlayerX','posEventsMoveCore','name','eventsXy','NsWMu','checkEventTriggerHere','max','Game_CharacterBase_screenY','RegionTouch','okAZT','Zbfel','LIGHTBULB','airship','labelWindowText','SelfSwitchID','moveTowardCharacter','sWwDX','getPreservedMorphEventData','USER-DEFINED\x202','Speed','Game_CharacterBase_moveDiagonally','turnTowardCharacter','KIWgl','TerrainTag','BalloonOffsetX','Kiztw','DefaultShadow','ZMsEd','_filename','LOVE','LOWER\x20RIGHT','RegionOk','value','_scaleBaseY','SWEAT','updatePatternEventsMoveCore','height','Window_Message_startMessage','_scaleBaseX','Map\x20%1\x20Variable\x20%2','uzBTn','processMoveRouteFadeOut','isStopFollowerChasing','Game_CharacterBase_update','processMoveSynchMirrorHorz','npTEA','parameters','YlmKg','IconBufferX','_opacity','_clickTrigger','right','IconSize','VisuMZ_Setup_Preload_Map','onCancel','restoreSavedEventPosition','mimic','roundYWithDirection','refresh','_spriteset','setup','initFollowerController','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','meetActivationRegionConditions','AdvancedSwitches','toLowerCase','LineHeight','Operation','Sprite_Character_update','oRVlA','_characterIndex','OffsetX','pPbEz','getPosingCharacterPattern','template','ship','jYRat','resetSelfSwitchesForMap','checkActivationProximity','forceMoveRoute','type','directionOnLadderSpriteVS8dir','firstSpawnedEventID','processMoveRouteSelfVariable','charAt','_type','isWorking','Setting','Game_Temp_setDestination','hasEventIcon','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Switches_value','Game_Event_initialize','PostCopyJS','_pageIndex','_alwaysUpdateMove','isSelfVariable','keyWD','ukVSj','NORMAL','_labelWindow','Game_CharacterBase_isTransparent','spriteId','iconWidth','_eventMorphData','_event','oCbPM','firstSpawnedEvent','updateMove','updateEventCustomZ','_eventPageIndex','_eventIcon','Name','processMoveSynchAway','absDistance','updateShadow','rYdTi','registerSelfTarget','_realX','setPattern','jpCnK','Seconds','disable','ccwX','isEventRunning','ZZZ','isPreventSelfMovement','FRUSTRATION','Game_Player_increaseSteps','round','FaceSynchAllSynchTargets','jmcpf','Map\x20%1\x20Switch\x20%2','initEventsMoveCoreSettings','setControlledFollowerID','PreloadedMaps','_moveSpeed','initEventsMoveCoreEffects','isLandOk','_diagonalSupport','characterPatternYVS8','convertSelfVariableValuesInScriptCall','defaultFontSize','FUNC','Game_CharacterBase_pattern','_chaseOff','UpKUi','KrZAa','morphIntoTemplate','determineCommonEventsWithCPC','Stop','saveEventLocation','reverse\x20copy','innerWidth','MBQCL','call','setupCopyEvent','createLabelWindowForTarget','CkZGI','_eventLabelOffsetX','setupFollowerVisibilityOverrides','clearPose','pJIpD','oToqC','Game_Player_checkEventTriggerHere','iHlNG','%1Dock','vehicle','xUcOY','Spriteset_Map_createLowerLayer','dhhPS','prototype','HWsoA','ANGER','OFF','_randomHomeY','xyIdU','setWaitMode','Self\x20Variable\x20%1','Game_Follower_initialize','EnableDashTilt','irqAv','_target','Allow','isAirship','setEventIconDataKey','DkDPP','getPlayerDiagonalSetting','AeDQx','Rope','_characterName','getLastPluginCommandInterpreter','AdvancedVariables','findTargetSprite','prepareSpawnedEventAtTerrainTag','BGFmj','reverse\x20mimic','EventLabelRefresh','moveTowardPoint','StrictCollision','setStopFollowerChasing','process_VisuMZ_EventsMoveCore_Switches_Variables','lock','Hours','cwY','Game_SelfSwitches_setValue','VICTORY','MoveRouteIndex','match','pattern','AllForbid','switch1Id','updateMoveSynchDirection','tileWidth','onExpire','VS8','BoatSpeed','LEFT','_followerChaseOff','parallelCommonEvents','Toggle','initMoveSpeed','bufferX','DOWN','trigger','FavorHorz','rNklv','_proxyWindow','TOGGLE','DrVwI','isSceneMap','_DisablePlayerControl','fgopo','areFollowersForceHidden','startMessage','isSpriteVS8dir','Frames','randomInt','enable','opacity','%1Forbid','VisibleEventLabels','savePreservedMorphEventDataKey','JDzLl','JSON','forceCarrying','originalText','iconIndex','resetSelfSwitchesForEvent','processMoveRouteStepFrom','distance','Region%1','canStartLocalEvents','mKkwW','FontSize','version','horz\x20mirror','OyMKn','StopAutoMoveEvents','variableValid','SLEEP','70270qJqqOd','638gSLjkG','_forceShowFollower','registerCommand','CarryPose','OJYCr','includes','Game_Map_isDashDisabled','setupDiagonalSupport','ccwY','getPose','checkRegionEventTrigger','padZero','_tilemap','teTlt','VehicleDock','setBackgroundType','hOCAr','SILENCE','shadowFilename','format','isDestinationValid','IconBufferY','Label','_stepPattern','SelfVariableID','avfhP','reverseDir','SqwjN','kFjjo','_callEventData','PfMiI','iconHeight','RIGHT','attachPictureSettings','MapID','region','getEventIconIndex','_moveRoute','processMoveSynchMimic','_erased','lastSpawnedEvent','onOk','setChaseOff','checkNeedForPeriodicRefresh','EnableDir8','setFrame','Game_Followers_jumpAll','deltaX','processMoveRouteStepToCharacter','PRkag','Game_Event_locate','onLoadAttachPicture','updateEventIconSprite','updateText','_spawnedEvents','attachPictureFilename','UNTITLED','processMoveRouteAnimation','createSpawnedEvent','moveRouteIndex','Step2EventId','unlockEvent','ehpdy','_visiblePlayerY','return\x20%1','Chase','Game_CharacterBase_realMoveSpeed','MUSICNOTE','_duration','executeCommandCommonEvent','variables','_needsRefresh','pages','approach','_seconds','updatePose','Sprite_Balloon_updatePosition','RIGHT\x20TO\x20LEFT','_scene','processMoveRouteMoveTo','isLongPressed','$preloadedMap_%1','%1,','bwSPZ','setDashingEnabled','initMembersEventsMoveCore','CPCsMet','Window_ScrollText_startMessage','SPIN\x20CCW','Step2MapId','Game_Event_checkEventTriggerAuto','setupSpawn','kZVAR','pluginCommandCallEvent','processMoveSynchApproach','getPosingCharacterDirection','isAllowEventAutoMovement','setupAttachPictureBitmap','_attachPicture','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','executeMove','gUcSN','jumpAll','BMHYH','activationRegionList','oNLOe','updateSelfMovement','lliHu','NlLQM','backX','cboCM','yzOBU','hasCPCs','AVxvQ','bind','Game_CharacterBase_increaseSteps','%1,%2,','SelfSwitchABCD','HTQGF','checkCollisionKeywords','opacityDelta','Self\x20Switch\x20%1','getControlledFollowerID','_expireCommonEvent','_dragonbones','mYuIV','string','isAnyEventStarting','isTransparent','map','FALSE','ADDITIVE','needsUpdate','%1%2','mirror\x20vert','textSizeEx','characterIndexVS8','ueCAh','mapValue','setCommonEvent','setupEventsMoveCoreNotetags','chaseCharacter','_shadowSprite','removeChild','11756rhMGjx','isShadowShrink','IconBlendMode','smooth','updateAttachPictureSprite','vfLUc','AllAllow','setupSpawnedEvents','VehicleAllow','teHjB','mirror\x20vertical','isDashDisabled','SwitchId','tEtwG','XOtZz','updateSaveEventLocation','Game_CharacterBase_isDashing','fontFace','_selfTargetNumberInput','qmKRU','_pose','ietfX','Game_Map_parallelCommonEvents','screenY','EXCLAMATION','SlowerSpeed','setLastPluginCommandInterpreter','prepareSpawnedEventAtRegion','EYsQX','MorphEventRemove','jgbaZ','becmr','rotation','isPressed','MLCkK','_forceDashing','qpDhf','canPass','clearDestination','deletePreservedMorphEventDataKey','EventIconDelete','SwitchGetSelfSwitchABCD','_selfTarget','eVxNe','ncstV','SPIN\x20CLOCKWISE','none','ALLOW_LADDER_DASH','SpawnEventDespawnEverything','isEmptyCharacter','description','event','NQyoW','TiltRight','random','autoEventIconBuffer','UmrVD','EventTimerExpireEvent','LCzzz','labelWindowRange','_spriteOffsetY','command108','OTdXY','isTurnInPlace','some','setupSaveEventLocations','isPlayerControlDisabled','Game_Player_executeMove','isVisible','referEvent','_advancedSwitchVariable','move','_waitMode','RegionOkTarget','_encounterEffectDuration','isBigCharacter','Letter','createShadows','execute','_lastPluginCommandInterpreter','UqfMz','_paused','WiWQw','processMoveRouteJumpForward','_data','characterPatternY','_spawnData','isPlaytest','create','Scene_Load_onLoadSuccess','createContents','setEventIconData','_mirrorSprite','createCharacterShadow','KNEEL','isDashingEnabled','MapSwitches','shPdE','processMoveSynchReverseMimic','Game_Vehicle_initMoveSpeed','Scene_Map_startEncounterEffect','UAKhU','getEventIconData','updateWaitMode','isShadowVisible','updateTilt','ShowShadows','processMoveSynch','_eventSpawnData','lRFKy','meetsConditions','checkExistingEntitiesAt','_eventOverload','Game_Event_updateSelfMovement','peQeD','setFrames','Game_CharacterBase_initMembers','eMrWi','shadowY','setCharacterBitmap','Game_Event_moveTypeRandom','eYyUj','uLxIQ','Sprite_Balloon_setup','_actuallyMoving','Sprite_Character_initMembers','_eventIconSprite','TemplateName','EventTimerExpireClear','setDirection','EjaSd','vert\x20mirror','getDiagonalDestination','kcxwD','convertVariableValuesInScriptCall','DijhO','hasDragonbones','UfrAj','wXwmW','JoIaT','cwX','lVWzK','padding','deleteSavedEventLocationKey','Game_CharacterBase_characterIndex','_EventsMoveCoreSettings','%1:%2','_lastAttachPictureScale','GqVAg','processOk','processMoveRouteMoveUntilStop','EuVHT','AirshipSpeed','lXoUx','Collision','ARuUU','TerrainTags','terrainTag','onLoadSuccess','blt','XkQMW','hasMoveOnlyRegions','hqOhH','wICEG','DashModifier','Game_Character_processMoveCommand','isPassable','dWAaR','prepareSpawnedEventAtXY','setItemChoice','dashSpeedModifier','MoveAllSynchTargets','eventId','_needsPeriodicRefresh','pageId','LxBsO','processMoveRouteStepTo','Game_CharacterBase_opacity','DashingEnable','setMoveRoute','getMapSpawnedEventData','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','away','updatePattern','oqGgS','_SavedEventLocations','roundXWithDirection','characterName','STRUCT','Window_EventItem_onCancel','_comments','_randomHomeX','moveAwayFromPoint','processMoveRoutePatternLock','isShip','apply','Game_Timer_stop','MobileEnabled','Ssadb','needsAttachPictureUpdate','setupPlayerVisibilityOverrides','requestMapLoadCommonEvents','checkSmartEventCollision','isObjectCharacter','_activationProximityAutoTriggerBypass','uLLrU','Game_Interpreter_executeCommand','Button','processMoveCommandEventsMoveCore','getInputDir8','PdKHM','contentsOpacity','xrZHt','keys','PkJjt','VisuMZ_1_MessageCore','SHJQV','removeMorph','_MapSpawnedEventData','Enable','Game_Followers_isVisible','moveSynchTarget','kNcgn','zoomScale','_lastMovedDirection','Window_EventItem_onOk','clamp','concat','AEayP','Uoyxj','QsiBv','initMembers','hasStepAnime','WKclW','setupMorphEvent','updateMoveSynch','switchId','UDmnC','autosaveEventLocation','posNt','clearAttachPictureSettings','stop','isMovementSucceeded','erase','setPlayerDiagonalSetting','processMoveRouteJumpTo','Game_CharacterBase_bushDepth','timer','left','RpCjP','GmPFJ','isPlayerForceShown','ZHwQS','getAttachPictureBitmapHeight','isBusy','esqAg','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','QUESTION','isAirshipPassable','Game_Event_event','updateScale','makeDeepCopy','UPPER\x20RIGHT','Window_NumberInput_start','inBattle','19994fhwrmf','pos','NwSyY','setupEventsMoveCoreCommentTags','isActive','_reflection','_inputTime','forceDashing','HPaxd','addChild','isBattleTest','OpacitySpeed','isAutoBufferIcon','UVThy','isSupportDiagonalMovement','iconSize','cMjfw','direction','isMapVariable','scale','OrmrU','clearEventCache','setEventLabelsVisible','PlayerIconChange','_cacheVisibility','CAset','nZCJN','tileHeight','isValid','meetActivationProximityConditions','maxSize','Game_Event_findProperPageIndex','JLjOG','isJumping','DabiS','createLabelWindows','_moveAllowPlayerCollision','executeMoveDir8','switches','HURT','Sprite_Character_setCharacterBitmap','Game_Vehicle_isMapPassable','setMoveSpeed','gTqae','_stopCount','_randomMoveWeight','processMoveSynchMirrorVert','updateEventsMoveCoreTagChanges','target','mainFontSize','TargetSwitchId','despawnEventId','isAdvancedVariable','attachPictureOffsetY','setupRegionRestrictions','SXsLV','findDirectionTo','RSjcT','_eventErased','IconSet','frameCount','boat','SelfVariables','ARRAYFUNC','processMoveRouteMoveRepeat','VariableGetSelfVariableID','updateParallel','ARRAYEVAL','EIuWp','follower','EventAutoMovement','Player','MQnON','_shadowOpacity','_CPCs','Game_Character_setMoveRoute','antFh','_moveOnlyRegions','Forbid','Game_Enemy_meetsSwitchCondition','NUM','isInVehicle','PlayerForbid','selfValue','setImage','advancedValue','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','IconIndex','moveDiagonally','_counter','isLabelVisible','isNormalPriority','isRegionForbidPass','USER-DEFINED\x205','MOBILE_EVENT_LABELS','despawnAtXY','attachPictureMaxSize','isOnRope','BitmapSmoothing','Game_Switches_setValue','GetMoveSynchTarget','createAttachPictureSprite','_speed','updateBitmapSmoothing','command357','moveAwayFromCharacter','Game_Interpreter_updateWaitMode','exit','useCarryPoseForIcons','Game_Event_clearPageSettings','ARRAYJSON','Game_CharacterBase_updatePattern','_lastAttachPictureFilename','BufferX','startCallEvent','Game_Event_start','processMoveSynchCustom','processMoveRouteSetIndex','windowPadding','changeSpeed','processSaveEventLocation','setMovementSuccess','Minutes','isAllowCharacterTilt','metCPC','offsetY','fontSize','hasClickTrigger','_saveEventLocations','shadowX','boxWidth','pvjgr','square','VisibleRange','replace','getPosingCharacterIndex','List','USER-DEFINED\x204','Vuwop','turnAwayFromCharacter','fTOyK','Step1MapId','isOnLadder','vertical\x20mirror','SPIN\x20CW','isMobileDevice','constructor','createDisplayObjects','uAjdW','_lastMapId','EventID','gBIsz','isMoveOnlyRegionPassable','deltaYFrom','pauPA','isSaveEventLocation','mapId','lpxhL','_cacheSystemVisible','_customZ','_periodicRefreshTimer','GIvlV','HEART','Icon','_activationProximity','isPosing','EventTimerResume','processMoveRouteTeleportTo','FollowerSetControl','XxsOd','startMapCommonEventOnOK','processMoveRouteTeleportToCharacter','characterPatternYBasic','characterIndex','sZKVl','TRsFq','_selfTargetItemChoice','Vehicle','COLLAPSE','pageIndex','start','Hirel','Game_Follower_chaseCharacter','horizontal\x20mirror','_addedHitbox','Kpten','removeTemporaryMapSpawnedEvents','clearStepPattern','updateOpacity','isMoving','isPassableByAnyDirection','_working','resume','QSKmd','_eventCache','turnLeft90','resizeWindow','Vkxyx','setDestination','gainFrames','Game_Event_isCollidedWithPlayerCharacters','visible','Preserve','requestAnimation','createBitmap','sldXX','Boat','code','bitmap','HMPH','pause','dir8','default','updateEventsAndMovementCore','ePRyT','setupSpawnTest','EventTemplates','jRkDw','Game_Map_setup','_eventScreenX','deltaY','meetsSwitchCondition','Game_Map_setupEvents','visibleRange','Game_Timer_start','loadPicture','screenX','BalloonOffsetY','eRSwk','trim','tjSYF','TzANR','radius','DashOnLadder','isTile','jZwfN','_frames','loadSystem','hasAdvancedSwitchVariable','_scaleX','PageId','attachPictureScale','isSelfSwitch','JxOiW','MOBILE_DIAGONAL_PATHFINDING','UjOsA','adjustMoveSynchOpacityDelta','Game_Event_meetsConditionsCPC','despawnRegions','slice','Game_Message_setItemChoice','525CoGriM','isBoat','xiekq','NZBcv','_mapId','createShadow','Game_Map_event','clearDashing','VariableId','switch2Valid','Game_CommonEvent_isActive','opacitySpeed','checkValidEventerMap','add','jUMkZ','setPose','updatePeriodicRefresh','shift','_forceShowPlayer','RemovePreserve','events','kTPqb','Event','CallEvent','startMapCommonEventOnTouch','canPassDiagonally','PlayerIconDelete','Game_Vehicle_isLandOk','hueShift','cdTUq','AutoBalloon','onDatabaseLoaded','drawTextEx','moveSynchType','All','processMoveCommand','morphInto','TiltVert','text','reserveCommonEvent','Window_NumberInput_processOk','hideShadows','_direction','RandomMoveWeight','_patternLocked','EventIconChange','XuTMd','split','Game_Message_setNumberInput','clear','checkEventsMoveCoreStringTags','Game_Variables_setValue','setMapValue','despawnTerrainTags','drawing','FHVNW','fittingHeight','OperateValues','hovAD','_poseDuration','startsWith','CtrcE','kirJn','updateScaleBase','566372wGzmYb','CRSUl','AEhBo','aQGVD','1356CVDGJM','executeCommand','isSaveEventLocations','HMHOO','blendMode','EbKqW','_moveSynch','Game_SelfSwitches_value','isTargetEventValidForLabelWindow','onClickTrigger','deleteEventLocation','deltaXFrom','executeCommonEvent','BufferY','checkEventTriggerAuto','addLoadListener','USER-DEFINED\x203','ITEM','mirror\x20horizontal','_requestSaveEventLocation','XDSwb','checkAdvancedSwitchVariablePresent','_hidden','Map%1-Event%2','ARRAYNUM','setBalloonPose','MUSIC-NOTE','PosX','clearSpriteOffsets','DNmuT','MULTIPLY','isDiagonalDirection','Game_Character_forceMoveRoute','SCREEN','length','createSpawnedEventWithData','CPC','destinationX','_realY','Game_CharacterBase_direction','hWffd','FollowerSetTargetChase','LVXev','HPgeh','LIGHT\x20BULB','initialize','isRunning','isMapSwitch','updateRoutineMove','MapId','clearSelfTarget','createLowerLayer','note','isPlayerForceHidden','160965fQmZxg','MUSIC\x20NOTE','EventForbid','_commonEvents','ImPTI','variableId','setDiagonalDirection','Spriteset_Map_createShadow','EventId','Scene_Boot_onDatabaseLoaded','list','ShiftY','Region','WFJVO','locate','_pattern','ShipSpeed','SuccessSwitchId','XAhqS','processMoveSynchRandom','bufferY','moveTypeRandom','mirror\x20horz','_characterSprites','isEventClickTriggered','WalkForbid','EpctI','Game_Map_events','COBWEB','getDirectionToPoint','_character','3yhcMvW','bYWSn','resetExitSelfSwitches','VisuMZ_0_CoreEngine','Game_CharacterBase_moveStraight','VRjHm','startMapCommonEventOnOKTarget','indexOf','xMBki','setupEventsMoveCoreEffects','jearL','getInputDirection','offsetX','UPPER\x20LEFT','VfPxz','DIAGONAL_PATHFINDING_EVENT_LIMIT','Game_Event_setupPageSettings','PreMorphJS','SelfSwitches','_forceHidePlayer','_callEventMap','isAdvancedSwitch','log','abs','registerSelfEvent','hbeGM','Game_CharacterBase_hasStepAnime','_PreservedEventMorphData','_visibleEventY','_forceHideFollower','moveBackToRandomHome','ConvertParams','Game_Player_isMapPassable','min','2000VXQMsP','_PlayerDiagonalSetting','_interpreter','PosY','PreSpawnJS','outlineColor','Template','determineEventOverload','ixVLx','turn180','BGyDJ','btJgg','VisuMZ_2_DragonbonesUnion','ejzNo','isMapPassable','_commonEventId','yBMtT','initEventsMoveCore','shiftY','createSaveEventLocationData','increaseSteps','isDashingAndMoving','setupEvents','Game_Interpreter_PluginCommand','Game_CharacterBase_canPass','MNIgk','GsyEc','iAOyJ','_shadowGraphic','Game_Player_isDashing','filename','IpQqy','Map%1.json','_text','delay','Movement','TargetVariableId','PosHn','clearPageSettings','isEventsMoveCoreInvisible','WalkAllow','refreshEventLabels','Airship','updateVisibility','PathfindMobileEnabled','processMoveRouteHugWall','eventsXyNt','%1Allow','isEventTest','getSelfTarget','processMoveRouteSelfSwitch','setupChild','_eventId','processMoveRouteMoveToCharacter','status','SPIN\x20ANTICLOCKWISE','isDashing','YHFiq'];_0x3eb5=function(){return _0x3ff46b;};return _0x3eb5();}(function(_0x34d4b1,_0x379d6f){const _0x1676b0=_0xf910,_0x54bd07=_0x34d4b1();while(!![]){try{const _0x44a77f=-parseInt(_0x1676b0(0x52d))/0x1+parseInt(_0x1676b0(0x66d))/0x2*(parseInt(_0x1676b0(0x586))/0x3)+parseInt(_0x1676b0(0x2e9))/0x4*(parseInt(_0x1676b0(0x4ed))/0x5)+-parseInt(_0x1676b0(0x5f0))/0x6*(-parseInt(_0x1676b0(0x567))/0x7)+parseInt(_0x1676b0(0x5a8))/0x8*(-parseInt(_0x1676b0(0x664))/0x9)+-parseInt(_0x1676b0(0x258))/0xa*(-parseInt(_0x1676b0(0x259))/0xb)+parseInt(_0x1676b0(0x531))/0xc*(parseInt(_0x1676b0(0x3f2))/0xd);if(_0x44a77f===_0x379d6f)break;else _0x54bd07['push'](_0x54bd07['shift']());}catch(_0x1816ee){_0x54bd07['push'](_0x54bd07['shift']());}}}(_0x3eb5,0x5b64c));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5f22ac){const _0x321348=_0xf910;return _0x5f22ac[_0x321348(0x5de)]&&_0x5f22ac[_0x321348(0x31b)][_0x321348(0x25e)]('['+label+']');})[0x0];VisuMZ[label][_0x3bfc03(0x653)]=VisuMZ[label][_0x3bfc03(0x653)]||{},VisuMZ[_0x3bfc03(0x5a5)]=function(_0x2b5b5c,_0x32f5cd){const _0x383556=_0x3bfc03;for(const _0x50765d in _0x32f5cd){if(_0x50765d[_0x383556(0x223)](/(.*):(.*)/i)){const _0x51aa7e=String(RegExp['$1']),_0x292453=String(RegExp['$2'])[_0x383556(0x123)]()[_0x383556(0x4d7)]();let _0x3ae5f5,_0x46f60f,_0x3e39e6;switch(_0x292453){case _0x383556(0x442):_0x3ae5f5=_0x32f5cd[_0x50765d]!==''?Number(_0x32f5cd[_0x50765d]):0x0;break;case _0x383556(0x549):_0x46f60f=_0x32f5cd[_0x50765d]!==''?JSON[_0x383556(0x63e)](_0x32f5cd[_0x50765d]):[],_0x3ae5f5=_0x46f60f['map'](_0x20cec1=>Number(_0x20cec1));break;case _0x383556(0x65d):_0x3ae5f5=_0x32f5cd[_0x50765d]!==''?eval(_0x32f5cd[_0x50765d]):null;break;case _0x383556(0x435):_0x46f60f=_0x32f5cd[_0x50765d]!==''?JSON['parse'](_0x32f5cd[_0x50765d]):[],_0x3ae5f5=_0x46f60f['map'](_0x2c6204=>eval(_0x2c6204));break;case _0x383556(0x247):_0x3ae5f5=_0x32f5cd[_0x50765d]!==''?JSON['parse'](_0x32f5cd[_0x50765d]):'';break;case _0x383556(0x460):_0x46f60f=_0x32f5cd[_0x50765d]!==''?JSON[_0x383556(0x63e)](_0x32f5cd[_0x50765d]):[],_0x3ae5f5=_0x46f60f[_0x383556(0x2da)](_0x51d4f6=>JSON[_0x383556(0x63e)](_0x51d4f6));break;case _0x383556(0x1e2):_0x3ae5f5=_0x32f5cd[_0x50765d]!==''?new Function(JSON[_0x383556(0x63e)](_0x32f5cd[_0x50765d])):new Function(_0x383556(0x5e6));break;case _0x383556(0x431):_0x46f60f=_0x32f5cd[_0x50765d]!==''?JSON[_0x383556(0x63e)](_0x32f5cd[_0x50765d]):[],_0x3ae5f5=_0x46f60f[_0x383556(0x2da)](_0x2113fb=>new Function(JSON[_0x383556(0x63e)](_0x2113fb)));break;case _0x383556(0x11a):_0x3ae5f5=_0x32f5cd[_0x50765d]!==''?String(_0x32f5cd[_0x50765d]):'';break;case'ARRAYSTR':_0x46f60f=_0x32f5cd[_0x50765d]!==''?JSON['parse'](_0x32f5cd[_0x50765d]):[],_0x3ae5f5=_0x46f60f[_0x383556(0x2da)](_0x52f3af=>String(_0x52f3af));break;case _0x383556(0x3a5):_0x3e39e6=_0x32f5cd[_0x50765d]!==''?JSON[_0x383556(0x63e)](_0x32f5cd[_0x50765d]):{},_0x2b5b5c[_0x51aa7e]={},VisuMZ[_0x383556(0x5a5)](_0x2b5b5c[_0x51aa7e],_0x3e39e6);continue;case _0x383556(0x617):_0x46f60f=_0x32f5cd[_0x50765d]!==''?JSON[_0x383556(0x63e)](_0x32f5cd[_0x50765d]):[],_0x3ae5f5=_0x46f60f[_0x383556(0x2da)](_0x399e9f=>VisuMZ[_0x383556(0x5a5)]({},JSON[_0x383556(0x63e)](_0x399e9f)));break;default:continue;}_0x2b5b5c[_0x51aa7e]=_0x3ae5f5;}}return _0x2b5b5c;},(_0x3cbaf4=>{const _0x5be451=_0x3bfc03,_0x1965b6=_0x3cbaf4[_0x5be451(0x155)];for(const _0x171744 of dependencies){if(!Imported[_0x171744]){alert(_0x5be451(0x1ad)[_0x5be451(0x26c)](_0x1965b6,_0x171744)),SceneManager[_0x5be451(0x45d)]();break;}}const _0x2e86bc=_0x3cbaf4[_0x5be451(0x31b)];if(_0x2e86bc[_0x5be451(0x223)](/\[Version[ ](.*?)\]/i)){const _0x281d22=Number(RegExp['$1']);_0x281d22!==VisuMZ[label][_0x5be451(0x252)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5be451(0x26c)](_0x1965b6,_0x281d22)),SceneManager[_0x5be451(0x45d)]());}if(_0x2e86bc['match'](/\[Tier[ ](\d+)\]/i)){const _0xa95c07=Number(RegExp['$1']);_0xa95c07<tier?_0x5be451(0x4fb)!=='jUMkZ'?(this['_frames']=this[_0x5be451(0x4de)]||0x0,this['_frames']=_0x4b4db1,this[_0x5be451(0x4b1)]=!![],this[_0x5be451(0x4de)]=_0x3577c2[_0x5be451(0x159)](0x1,this[_0x5be451(0x4de)])):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5be451(0x26c)](_0x1965b6,_0xa95c07,tier)),SceneManager['exit']()):tier=Math[_0x5be451(0x159)](_0xa95c07,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5be451(0x653)],_0x3cbaf4[_0x5be451(0x181)]);})(pluginData),VisuMZ[_0x3bfc03(0x526)]=function(_0x5eceb7,_0x2ea9c5,_0x679cc){switch(_0x679cc){case'=':return _0x2ea9c5;break;case'+':return _0x5eceb7+_0x2ea9c5;break;case'-':return _0x5eceb7-_0x2ea9c5;break;case'*':return _0x5eceb7*_0x2ea9c5;break;case'/':return _0x5eceb7/_0x2ea9c5;break;case'%':return _0x5eceb7%_0x2ea9c5;break;}return _0x5eceb7;},PluginManager[_0x3bfc03(0x25b)](pluginData['name'],'AutoMoveEvents',_0x467437=>{const _0x44c07c=_0x3bfc03;VisuMZ[_0x44c07c(0x5a5)](_0x467437,_0x467437);switch(_0x467437[_0x44c07c(0x645)]){case _0x44c07c(0x20a):$gameSystem[_0x44c07c(0x13d)](!![]);break;case _0x44c07c(0x1e9):$gameSystem[_0x44c07c(0x13d)](![]);break;case'Toggle':$gameSystem[_0x44c07c(0x13d)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x504),_0x5c09e2=>{const _0x219ed3=_0x3bfc03;VisuMZ['ConvertParams'](_0x5c09e2,_0x5c09e2);const _0x1a734d=$gameTemp[_0x219ed3(0x212)](),_0x21d94f={'mapId':_0x5c09e2[_0x219ed3(0x562)],'eventId':_0x5c09e2[_0x219ed3(0x56f)]||_0x1a734d[_0x219ed3(0x395)](),'pageId':_0x5c09e2[_0x219ed3(0x4e2)]};if(_0x21d94f[_0x219ed3(0x48e)]<=0x0)_0x21d94f[_0x219ed3(0x48e)]=$gameMap?$gameMap[_0x219ed3(0x48e)]():0x1;$gameTemp[_0x219ed3(0x212)]()[_0x219ed3(0x2b6)](_0x21d94f);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'DashEnableToggle',_0x49d1f9=>{const _0x364051=_0x3bfc03;VisuMZ['ConvertParams'](_0x49d1f9,_0x49d1f9);switch(_0x49d1f9[_0x364051(0x645)]){case _0x364051(0x3c4):$gameSystem[_0x364051(0x2ad)](!![]);break;case'Disable':$gameSystem[_0x364051(0x2ad)](![]);break;case _0x364051(0x22f):$gameSystem[_0x364051(0x2ad)](!$gameSystem[_0x364051(0x348)]());break;}}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x51a),_0x3bcae0=>{const _0x48c885=_0x3bfc03;VisuMZ[_0x48c885(0x5a5)](_0x3bcae0,_0x3bcae0);const _0x1b45c5=$gameTemp['getLastPluginCommandInterpreter']();_0x3bcae0[_0x48c885(0x562)]=_0x3bcae0[_0x48c885(0x562)]||$gameMap[_0x48c885(0x48e)](),$gameSystem[_0x48c885(0x20c)](_0x3bcae0['MapId'],_0x3bcae0[_0x48c885(0x56f)]||_0x1b45c5[_0x48c885(0x395)](),_0x3bcae0[_0x48c885(0x449)],_0x3bcae0[_0x48c885(0x183)],_0x3bcae0[_0x48c885(0x26e)],_0x3bcae0[_0x48c885(0x2eb)]);}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x311),_0xec2e9f=>{const _0x3662a2=_0x3bfc03;VisuMZ[_0x3662a2(0x5a5)](_0xec2e9f,_0xec2e9f);const _0x151f98=$gameTemp[_0x3662a2(0x212)]();_0xec2e9f['MapId']=_0xec2e9f[_0x3662a2(0x562)]||$gameMap['mapId'](),$gameSystem[_0x3662a2(0x151)](_0xec2e9f[_0x3662a2(0x562)],_0xec2e9f[_0x3662a2(0x56f)]||_0x151f98[_0x3662a2(0x395)]());}),PluginManager['registerCommand'](pluginData['name'],_0x3bfc03(0x218),_0xdb7a63=>{const _0xe48205=_0x3bfc03;if($gameMap)for(const _0x17dfb6 of $gameMap[_0xe48205(0x501)]()){_0x17dfb6[_0xe48205(0x18d)](),_0x17dfb6['updateEventLabelText']();}if(SceneManager[_0xe48205(0x239)]()){if(_0xe48205(0x374)===_0xe48205(0x374)){const _0x49b587=SceneManager[_0xe48205(0x2a7)][_0xe48205(0x18e)];if(_0x49b587)_0x49b587['refreshEventLabels']();}else{const _0x18900f=['','EXCLAMATION','QUESTION','MUSIC\x20NOTE',_0xe48205(0x494),_0xe48205(0x200),_0xe48205(0x175),_0xe48205(0x583),_0xe48205(0x26a),_0xe48205(0x55d),'ZZZ','','','','',''][_0x128ff3];this[_0xe48205(0x4fc)](_0x18900f,_0x2e7e24);}}}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x637),_0x312c9a=>{const _0x5527e4=_0x3bfc03;VisuMZ['ConvertParams'](_0x312c9a,_0x312c9a);switch(_0x312c9a['Visibility']){case _0x5527e4(0x5f8):$gameSystem['setEventLabelsVisible'](!![]);break;case'Hidden':$gameSystem['setEventLabelsVisible'](![]);break;case'Toggle':$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x5527e4(0x636)]());break;}}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],'EventLocationSave',_0x19e519=>{const _0x541ab4=_0x3bfc03;VisuMZ[_0x541ab4(0x5a5)](_0x19e519,_0x19e519);const _0x87ba40=$gameTemp[_0x541ab4(0x212)]();if(!$gameMap)return;const _0x476665=$gameMap[_0x541ab4(0x31c)](_0x19e519['EventId']||_0x87ba40['eventId']());if(_0x476665)_0x476665[_0x541ab4(0x1ea)]();}),PluginManager[_0x3bfc03(0x25b)](pluginData['name'],'EventLocationCreate',_0x26ff5a=>{const _0x2a377e=_0x3bfc03;VisuMZ[_0x2a377e(0x5a5)](_0x26ff5a,_0x26ff5a);const _0x2767d7=$gameTemp[_0x2a377e(0x212)](),_0x5a2113=_0x26ff5a[_0x2a377e(0x562)]||$gameMap[_0x2a377e(0x48e)](),_0x40c8e1=_0x26ff5a[_0x2a377e(0x56f)]||_0x2767d7[_0x2a377e(0x395)](),_0x2fb4a5=_0x26ff5a['PosX']||0x0,_0x184cfd=_0x26ff5a[_0x2a377e(0x5ab)]||0x0,_0x5839d9=_0x26ff5a['Direction']||0x2,_0x4fdd4f=((_0x26ff5a['PageId']||0x1)-0x1)[_0x2a377e(0x3cb)](0x0,0x13),_0x3a5ddc=_0x26ff5a[_0x2a377e(0x222)]||0x0;$gameSystem['createSaveEventLocationData'](_0x5a2113,_0x40c8e1,_0x2fb4a5,_0x184cfd,_0x5839d9,_0x4fdd4f,_0x3a5ddc);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'EventLocationDelete',_0x54a931=>{const _0x5c10db=_0x3bfc03;VisuMZ[_0x5c10db(0x5a5)](_0x54a931,_0x54a931);const _0x116c19=$gameTemp[_0x5c10db(0x212)](),_0x5c6bd4=_0x54a931['MapId']||$gameMap[_0x5c10db(0x48e)](),_0x305966=_0x54a931[_0x5c10db(0x56f)]||_0x116c19['eventId']();$gameSystem['deleteSavedEventLocationKey'](_0x5c6bd4,_0x305966);}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x322),_0x9d0e0f=>{const _0x2cbb5b=_0x3bfc03;VisuMZ[_0x2cbb5b(0x5a5)](_0x9d0e0f,_0x9d0e0f);const _0x53129d=_0x9d0e0f['CommonEventID'];$gameTimer[_0x2cbb5b(0x2e4)](_0x53129d);}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x369),_0xc0ce3f=>{const _0x36ec2c=_0x3bfc03;$gameTimer[_0x36ec2c(0x2e4)](0x0);}),PluginManager[_0x3bfc03(0x25b)](pluginData['name'],_0x3bfc03(0x667),_0x3c672e=>{const _0x20ae5e=_0x3bfc03;if(!$gameTimer[_0x20ae5e(0x1a9)]())return;VisuMZ[_0x20ae5e(0x5a5)](_0x3c672e,_0x3c672e);let _0x426d30=0x0;_0x426d30+=_0x3c672e[_0x20ae5e(0x23f)],_0x426d30+=_0x3c672e[_0x20ae5e(0x1cc)]*0x3c,_0x426d30+=_0x3c672e[_0x20ae5e(0x46c)]*0x3c*0x3c,_0x426d30+=_0x3c672e[_0x20ae5e(0x21e)]*0x3c*0x3c*0x3c,$gameTimer[_0x20ae5e(0x4b9)](_0x426d30);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x62b),_0x276334=>{const _0x389d2d=_0x3bfc03;if(!$gameTimer[_0x389d2d(0x1a9)]())return;VisuMZ[_0x389d2d(0x5a5)](_0x276334,_0x276334);let _0x37fd4a=0x0;_0x37fd4a+=_0x276334[_0x389d2d(0x23f)],_0x37fd4a+=_0x276334[_0x389d2d(0x1cc)]*0x3c,_0x37fd4a+=_0x276334[_0x389d2d(0x46c)]*0x3c*0x3c,_0x37fd4a+=_0x276334[_0x389d2d(0x21e)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x37fd4a);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x63c),_0x441999=>{if(!$gameTimer['isWorking']())return;$gameTimer['pause']();}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x498),_0x4110e8=>{const _0x78e7fe=_0x3bfc03;if(!$gameTimer['isWorking']())return;$gameTimer[_0x78e7fe(0x4b2)]();}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'EventTimerSpeed',_0x22d722=>{const _0x437cbe=_0x3bfc03;VisuMZ[_0x437cbe(0x5a5)](_0x22d722,_0x22d722);const _0x39b1cf=_0x22d722[_0x437cbe(0x166)]||0x0;$gameTimer[_0x437cbe(0x469)](_0x39b1cf);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'FollowerSetGlobalChase',_0x3db719=>{const _0x382433=_0x3bfc03;VisuMZ['ConvertParams'](_0x3db719,_0x3db719);const _0x35dea8=!_0x3db719[_0x382433(0x29a)];$gameSystem[_0x382433(0x21b)](_0x35dea8);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x55a),_0x2cf48a=>{const _0xf45f91=_0x3bfc03;VisuMZ[_0xf45f91(0x5a5)](_0x2cf48a,_0x2cf48a);const _0x28eff3=(_0x2cf48a[_0xf45f91(0x624)]||0x0)-0x1,_0x5a14f1=!_0x2cf48a['Chase'],_0x2e3469=$gamePlayer['followers']()[_0xf45f91(0x437)](_0x28eff3);if(_0x2e3469)_0x2e3469[_0xf45f91(0x283)](_0x5a14f1);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x49a),_0x1fc806=>{const _0x566b5d=_0x3bfc03;VisuMZ['ConvertParams'](_0x1fc806,_0x1fc806);const _0x288c9f=_0x1fc806['FollowerID'];$gameSystem[_0x566b5d(0x1d9)](_0x288c9f);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x5fa),_0x8c9a76=>{const _0x15e037=_0x3bfc03;VisuMZ[_0x15e037(0x5a5)](_0x8c9a76,_0x8c9a76),$gameSystem[_0x15e037(0x1d9)](0x0),$gameSystem[_0x15e037(0x21b)](![]);for(const _0x154b9e of $gamePlayer[_0x15e037(0x611)]()[_0x15e037(0x33d)]){if(_0x15e037(0x2fe)!==_0x15e037(0x2fe))this['createCharacterShadow'](_0x21404f);else{if(_0x154b9e)_0x154b9e[_0x15e037(0x283)](![]);}}}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x312),_0x2ca07b=>{const _0x193f5f=_0x3bfc03;VisuMZ[_0x193f5f(0x5a5)](_0x2ca07b,_0x2ca07b);const _0x1fbcf2=$gameTemp[_0x193f5f(0x212)]();_0x2ca07b[_0x193f5f(0x562)]=_0x2ca07b[_0x193f5f(0x562)]||$gameMap[_0x193f5f(0x48e)]();const _0x1f68d7=[_0x2ca07b[_0x193f5f(0x562)],_0x2ca07b[_0x193f5f(0x56f)]||_0x1fbcf2[_0x193f5f(0x395)](),_0x2ca07b['Letter']],_0x1c750a=_0x2ca07b[_0x193f5f(0x424)],_0x52f285=$gameSelfSwitches[_0x193f5f(0x173)](_0x1f68d7)||![];$gameSwitches['setValue'](_0x1c750a,_0x52f285);}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],'SwitchGetSelfSwitchID',_0x2b13b5=>{const _0x225d31=_0x3bfc03;VisuMZ[_0x225d31(0x5a5)](_0x2b13b5,_0x2b13b5);const _0x190300=$gameTemp[_0x225d31(0x212)]();_0x2b13b5[_0x225d31(0x562)]=_0x2b13b5['MapId']||$gameMap[_0x225d31(0x48e)]();const _0x4f4797=[_0x2b13b5[_0x225d31(0x562)],_0x2b13b5['EventId']||_0x190300['eventId'](),_0x225d31(0x2d2)['format'](_0x2b13b5[_0x225d31(0x2f5)])],_0x2232de=_0x2b13b5[_0x225d31(0x424)],_0x5a7dca=$gameSelfSwitches['value'](_0x4f4797)||![];$gameSwitches[_0x225d31(0x623)](_0x2232de,_0x5a7dca);}),PluginManager[_0x3bfc03(0x25b)](pluginData['name'],_0x3bfc03(0x433),_0x259772=>{const _0x5a4820=_0x3bfc03;VisuMZ[_0x5a4820(0x5a5)](_0x259772,_0x259772);const _0x49bcf3=$gameTemp[_0x5a4820(0x212)]();_0x259772[_0x5a4820(0x562)]=_0x259772[_0x5a4820(0x562)]||$gameMap[_0x5a4820(0x48e)]();const _0x17b643=[_0x259772[_0x5a4820(0x562)],_0x259772[_0x5a4820(0x56f)]||_0x49bcf3[_0x5a4820(0x395)](),_0x5a4820(0x205)['format'](_0x259772['VariableId'])],_0x303b14=_0x259772[_0x5a4820(0x5cc)],_0x53a029=$gameSelfSwitches[_0x5a4820(0x173)](_0x17b643)||![];$gameVariables['setValue'](_0x303b14,_0x53a029);}),PluginManager[_0x3bfc03(0x25b)](pluginData['name'],'MorphEventTo',_0x473e3e=>{const _0xf7f79b=_0x3bfc03;VisuMZ['ConvertParams'](_0x473e3e,_0x473e3e);if(!$gameMap)return;const _0x309a02=$gameTemp[_0xf7f79b(0x212)](),_0x403a7e=_0x473e3e['Step2Preserve'];_0x473e3e['Step1MapId']=_0x473e3e['Step1MapId']||$gameMap[_0xf7f79b(0x48e)](),_0x473e3e[_0xf7f79b(0x2b2)]=_0x473e3e[_0xf7f79b(0x2b2)]||$gameMap[_0xf7f79b(0x48e)](),_0x473e3e[_0xf7f79b(0x368)]=_0x473e3e[_0xf7f79b(0x368)]['toUpperCase']()[_0xf7f79b(0x4d7)]();if(!_0x403a7e&&_0x473e3e['Step1MapId']!==$gameMap[_0xf7f79b(0x48e)]())return;if($gameMap[_0xf7f79b(0x48e)]()===_0x473e3e[_0xf7f79b(0x47f)]){const _0x4748a8=$gameMap[_0xf7f79b(0x31c)](_0x473e3e['Step1EventId']||_0x309a02[_0xf7f79b(0x395)]());if(!_0x4748a8)return;if(_0x473e3e['TemplateName']!==_0xf7f79b(0x291))_0x4748a8['morphIntoTemplate'](_0x473e3e['TemplateName']);else{if('NdfmL'!=='NdfmL'){const _0x2416ec=this[_0xf7f79b(0x3a8)],_0x1d9a6c=this['_randomHomeY'],_0xb82144=this['checkCollisionKeywords'](_0xcf9f44);return this['processMoveRouteMoveTo'](_0x2416ec,_0x1d9a6c,_0xb82144);}else _0x4748a8[_0xf7f79b(0x511)](_0x473e3e[_0xf7f79b(0x2b2)],_0x473e3e[_0xf7f79b(0x295)]||_0x309a02['eventId']());}}if(_0x403a7e){if('BuVmf'!=='mUHGS')$gameSystem[_0xf7f79b(0x245)](_0x473e3e[_0xf7f79b(0x47f)],_0x473e3e['Step1EventId'],_0x473e3e[_0xf7f79b(0x368)],_0x473e3e['Step2MapId'],_0x473e3e['Step2EventId']);else return[0x1,0x3,0x5,0x7,0x9][_0xf7f79b(0x25e)](_0x494f6f);}}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x306),_0x68e89b=>{const _0x2bd657=_0x3bfc03;VisuMZ[_0x2bd657(0x5a5)](_0x68e89b,_0x68e89b);if(!$gameMap)return;const _0x55110c=$gameTemp[_0x2bd657(0x212)]();_0x68e89b[_0x2bd657(0x562)]=_0x68e89b[_0x2bd657(0x562)]||$gameMap[_0x2bd657(0x48e)]();if($gameMap['mapId']()===_0x68e89b['MapId']){if('dWAaR'!==_0x2bd657(0x390))_0x66ab88[_0x2bd657(0x5fc)]();else{const _0x1f0749=$gameMap['event'](_0x68e89b['EventId']||_0x55110c[_0x2bd657(0x395)]());_0x1f0749[_0x2bd657(0x3c2)]();}}if(_0x68e89b[_0x2bd657(0x500)]){if(_0x2bd657(0x3d6)==='pQjvD'){let _0x2c95cc=_0x4ead2c[_0x2bd657(0x181)][0x0];_0x2c95cc=this['convertVariableValuesInScriptCall'](_0x2c95cc),_0x2c95cc=this[_0x2bd657(0x1e0)](_0x2c95cc),this[_0x2bd657(0x3b9)](_0x141d7b,_0x2c95cc);}else $gameSystem[_0x2bd657(0x310)](_0x68e89b[_0x2bd657(0x562)],_0x68e89b['EventId']||_0x55110c[_0x2bd657(0x395)]());}}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x409),_0x372377=>{const _0x3750b9=_0x3bfc03;VisuMZ['ConvertParams'](_0x372377,_0x372377),$gameSystem[_0x3750b9(0x344)]($gamePlayer,_0x372377[_0x3750b9(0x449)],_0x372377[_0x3750b9(0x183)],_0x372377[_0x3750b9(0x26e)],_0x372377['IconBlendMode']);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x507),_0x4f31e6=>{const _0x147c51=_0x3bfc03;VisuMZ[_0x147c51(0x5a5)](_0x4f31e6,_0x4f31e6),$gameSystem[_0x147c51(0x140)]($gamePlayer);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'PlayerMovementChange',_0x5f5da0=>{const _0x4eda90=_0x3bfc03;VisuMZ[_0x4eda90(0x5a5)](_0x5f5da0,_0x5f5da0),$gameSystem[_0x4eda90(0x146)](!_0x5f5da0[_0x4eda90(0x3c4)]);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'PlayerMovementDiagonal',_0x981887=>{const _0x1d51d2=_0x3bfc03;VisuMZ[_0x1d51d2(0x5a5)](_0x981887,_0x981887),$gameSystem[_0x1d51d2(0x3dd)](_0x981887[_0x1d51d2(0x1aa)]);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'SelfDataResetAll',_0x12d795=>{const _0x126b0a=_0x3bfc03;VisuMZ[_0x126b0a(0x5a5)](_0x12d795,_0x12d795);const _0x4680fd=_0x12d795[_0x126b0a(0x562)]||$gameMap[_0x126b0a(0x48e)]();$gameSelfSwitches[_0x126b0a(0x1a0)](_0x4680fd);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x2ce),_0x452f1e=>{const _0x1b7fc8=_0x3bfc03;VisuMZ['ConvertParams'](_0x452f1e,_0x452f1e);const _0x3f57c4=$gameTemp['getLastPluginCommandInterpreter']();_0x452f1e['MapId']=_0x452f1e['MapId']||$gameMap[_0x1b7fc8(0x48e)]();const _0x1e21cb=[_0x452f1e[_0x1b7fc8(0x562)],_0x452f1e[_0x1b7fc8(0x56f)]||_0x3f57c4[_0x1b7fc8(0x395)](),_0x452f1e[_0x1b7fc8(0x335)]];switch(_0x452f1e[_0x1b7fc8(0x645)]){case'ON':$gameSelfSwitches[_0x1b7fc8(0x623)](_0x1e21cb,!![]);break;case'OFF':$gameSelfSwitches[_0x1b7fc8(0x623)](_0x1e21cb,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x1e21cb,!$gameSelfSwitches[_0x1b7fc8(0x173)](_0x1e21cb));break;}}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x161),_0x853f18=>{const _0x447afe=_0x3bfc03;VisuMZ[_0x447afe(0x5a5)](_0x853f18,_0x853f18);const _0x1c8830=$gameTemp['getLastPluginCommandInterpreter']();_0x853f18['MapId']=_0x853f18[_0x447afe(0x562)]||$gameMap[_0x447afe(0x48e)]();const _0x23b47f=[_0x853f18[_0x447afe(0x562)],_0x853f18[_0x447afe(0x56f)]||_0x1c8830['eventId'](),_0x447afe(0x2d2)[_0x447afe(0x26c)](_0x853f18[_0x447afe(0x2f5)])];switch(_0x853f18[_0x447afe(0x645)]){case'ON':$gameSelfSwitches['setValue'](_0x23b47f,!![]);break;case'OFF':$gameSelfSwitches[_0x447afe(0x623)](_0x23b47f,![]);break;case _0x447afe(0x22f):$gameSelfSwitches['setValue'](_0x23b47f,!$gameSelfSwitches[_0x447afe(0x173)](_0x23b47f));break;}}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x271),_0xa48bd9=>{const _0xa0e02c=_0x3bfc03;VisuMZ['ConvertParams'](_0xa48bd9,_0xa48bd9);const _0x85b5e8=$gameTemp[_0xa0e02c(0x212)]();_0xa48bd9[_0xa0e02c(0x562)]=_0xa48bd9[_0xa0e02c(0x562)]||$gameMap[_0xa0e02c(0x48e)]();const _0x534795=[_0xa48bd9[_0xa0e02c(0x562)],_0xa48bd9[_0xa0e02c(0x56f)]||_0x85b5e8[_0xa0e02c(0x395)](),_0xa0e02c(0x205)[_0xa0e02c(0x26c)](_0xa48bd9[_0xa0e02c(0x4f5)])],_0x4b6c4a=VisuMZ['OperateValues']($gameSelfSwitches[_0xa0e02c(0x173)](_0x534795),_0xa48bd9['Value'],_0xa48bd9[_0xa0e02c(0x196)]);$gameSelfSwitches[_0xa0e02c(0x623)](_0x534795,_0x4b6c4a);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'SpawnEventAtXY',_0x300abc=>{const _0x1465e4=_0x3bfc03;VisuMZ[_0x1465e4(0x5a5)](_0x300abc,_0x300abc);const _0xfb7469=$gameTemp[_0x1465e4(0x212)](),_0x29dc5f={'template':_0x300abc[_0x1465e4(0x368)],'mapId':_0x300abc['MapId']||$gameMap[_0x1465e4(0x48e)](),'eventId':_0x300abc[_0x1465e4(0x56f)]||_0xfb7469['eventId'](),'x':_0x300abc[_0x1465e4(0x54c)],'y':_0x300abc[_0x1465e4(0x5ab)],'spawnPreserved':_0x300abc[_0x1465e4(0x4bc)],'spawnEventId':$gameMap[_0x1465e4(0x28f)][_0x1465e4(0x553)]+0x3e8},_0x4be5b3=_0x300abc['SuccessSwitchId']||0x0;if(!VisuMZ[_0x1465e4(0x1da)][_0x29dc5f[_0x1465e4(0x48e)]]&&_0x29dc5f[_0x1465e4(0x48e)]!==$gameMap[_0x1465e4(0x48e)]()){let _0x3d7686=_0x1465e4(0x2bc)[_0x1465e4(0x26c)](_0x29dc5f[_0x1465e4(0x48e)]);_0x3d7686+=_0x1465e4(0x5f1),_0x3d7686+=_0x1465e4(0x191),_0x3d7686+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x3d7686+=_0x1465e4(0x3e9)[_0x1465e4(0x26c)](_0x29dc5f[_0x1465e4(0x48e)]),alert(_0x3d7686);return;}const _0x17e448=$gameMap[_0x1465e4(0x391)](_0x29dc5f,_0x300abc['Collision'],_0x300abc['Passability']);_0x4be5b3&&$gameSwitches[_0x1465e4(0x623)](_0x4be5b3,!!_0x17e448);}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],'SpawnEventAtRegion',_0x58fde4=>{const _0x54adad=_0x3bfc03;VisuMZ[_0x54adad(0x5a5)](_0x58fde4,_0x58fde4);const _0x23a9be=$gameTemp[_0x54adad(0x212)](),_0x52bc9b={'template':_0x58fde4[_0x54adad(0x368)],'mapId':_0x58fde4[_0x54adad(0x562)]||$gameMap[_0x54adad(0x48e)](),'eventId':_0x58fde4[_0x54adad(0x56f)]||_0x23a9be['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x58fde4[_0x54adad(0x4bc)],'spawnEventId':$gameMap[_0x54adad(0x28f)][_0x54adad(0x553)]+0x3e8},_0x321dd3=_0x58fde4[_0x54adad(0x578)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x52bc9b[_0x54adad(0x48e)]]&&_0x52bc9b[_0x54adad(0x48e)]!==$gameMap[_0x54adad(0x48e)]()){let _0x3b1057='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x54adad(0x26c)](_0x52bc9b[_0x54adad(0x48e)]);_0x3b1057+=_0x54adad(0x5f1),_0x3b1057+=_0x54adad(0x191),_0x3b1057+=_0x54adad(0x39e),_0x3b1057+=_0x54adad(0x3e9)[_0x54adad(0x26c)](_0x52bc9b[_0x54adad(0x48e)]),alert(_0x3b1057);return;}const _0x50910d=$gameMap[_0x54adad(0x304)](_0x52bc9b,_0x58fde4[_0x54adad(0x573)],_0x58fde4[_0x54adad(0x383)],_0x58fde4[_0x54adad(0x616)]);_0x321dd3&&$gameSwitches['setValue'](_0x321dd3,!!_0x50910d);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x631),_0xfd462e=>{const _0x45d043=_0x3bfc03;VisuMZ[_0x45d043(0x5a5)](_0xfd462e,_0xfd462e);const _0x5c2b74=$gameTemp['getLastPluginCommandInterpreter'](),_0x11a8d5={'template':_0xfd462e['TemplateName'],'mapId':_0xfd462e[_0x45d043(0x562)]||$gameMap[_0x45d043(0x48e)](),'eventId':_0xfd462e[_0x45d043(0x56f)]||_0x5c2b74[_0x45d043(0x395)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xfd462e['Preserve'],'spawnEventId':$gameMap[_0x45d043(0x28f)]['length']+0x3e8},_0x76ad6f=_0xfd462e[_0x45d043(0x578)]||0x0;if(!VisuMZ[_0x45d043(0x1da)][_0x11a8d5[_0x45d043(0x48e)]]&&_0x11a8d5['mapId']!==$gameMap['mapId']()){let _0x4fdb65=_0x45d043(0x2bc)[_0x45d043(0x26c)](_0x11a8d5['mapId']);_0x4fdb65+=_0x45d043(0x5f1),_0x4fdb65+=_0x45d043(0x191),_0x4fdb65+=_0x45d043(0x39e),_0x4fdb65+=_0x45d043(0x3e9)[_0x45d043(0x26c)](_0x11a8d5[_0x45d043(0x48e)]),alert(_0x4fdb65);return;}const _0x38f2ca=$gameMap[_0x45d043(0x215)](_0x11a8d5,_0xfd462e['TerrainTags'],_0xfd462e[_0x45d043(0x383)],_0xfd462e[_0x45d043(0x616)]);_0x76ad6f&&(_0x45d043(0x4d8)===_0x45d043(0x250)?_0x905544['morphInto'](_0x11c1eb['Step2MapId'],_0x42b1a9['Step2EventId']||_0x4dae39[_0x45d043(0x395)]()):$gameSwitches[_0x45d043(0x623)](_0x76ad6f,!!_0x38f2ca));}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],'SpawnEventDespawnEventID',_0x55f8fa=>{const _0x255f4e=_0x3bfc03;VisuMZ[_0x255f4e(0x5a5)](_0x55f8fa,_0x55f8fa);const _0x3c0ef7=$gameTemp[_0x255f4e(0x212)]();$gameMap[_0x255f4e(0x425)](_0x55f8fa['EventID']||_0x3c0ef7[_0x255f4e(0x395)]());}),PluginManager[_0x3bfc03(0x25b)](pluginData['name'],_0x3bfc03(0x11f),_0x55c871=>{const _0x3f2b7c=_0x3bfc03;VisuMZ['ConvertParams'](_0x55c871,_0x55c871);const _0x27b620=_0x55c871['PosX'],_0x4618bb=_0x55c871[_0x3f2b7c(0x5ab)];$gameMap['despawnAtXY'](_0x27b620,_0x4618bb);}),PluginManager['registerCommand'](pluginData[_0x3bfc03(0x155)],'SpawnEventDespawnRegions',_0x354112=>{VisuMZ['ConvertParams'](_0x354112,_0x354112),$gameMap['despawnRegions'](_0x354112['Region']);}),PluginManager[_0x3bfc03(0x25b)](pluginData['name'],'SpawnEventDespawnTerrainTags',_0x233ed4=>{const _0x98c2fc=_0x3bfc03;VisuMZ['ConvertParams'](_0x233ed4,_0x233ed4),$gameMap[_0x98c2fc(0x522)](_0x233ed4[_0x98c2fc(0x385)]);}),PluginManager[_0x3bfc03(0x25b)](pluginData[_0x3bfc03(0x155)],_0x3bfc03(0x319),_0x51407d=>{const _0xc6a8c5=_0x3bfc03;VisuMZ[_0xc6a8c5(0x5a5)](_0x51407d,_0x51407d),$gameMap['despawnEverything']();}),VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x570)]=Scene_Boot['prototype'][_0x3bfc03(0x50c)],Scene_Boot[_0x3bfc03(0x1fe)][_0x3bfc03(0x50c)]=function(){const _0x360dde=_0x3bfc03;VisuMZ[_0x360dde(0x12c)][_0x360dde(0x570)][_0x360dde(0x1ee)](this),this[_0x360dde(0x448)](),this[_0x360dde(0x21c)]();if(VisuMZ[_0x360dde(0x12c)][_0x360dde(0x5fe)])VisuMZ[_0x360dde(0x12c)]['CustomPageConditions'][_0x360dde(0x55e)]();},VisuMZ['PreloadedMaps']=[],VisuMZ[_0x3bfc03(0x4ca)]={},Scene_Boot[_0x3bfc03(0x1fe)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x4f812d=_0x3bfc03;if(DataManager['isBattleTest']()||DataManager[_0x4f812d(0x5d8)]())return;const _0x577472=VisuMZ[_0x4f812d(0x12c)][_0x4f812d(0x653)][_0x4f812d(0x5ae)],_0x39ac6a=_0x577472['PreloadMaps']['slice'](0x0);for(const _0x59968d of _0x577472[_0x4f812d(0x47a)]){_0x59968d[_0x4f812d(0x1c3)]=_0x59968d[_0x4f812d(0x1c3)][_0x4f812d(0x123)]()['trim'](),VisuMZ[_0x4f812d(0x4ca)][_0x59968d['Name']]=_0x59968d;if(!_0x39ac6a[_0x4f812d(0x25e)](_0x59968d[_0x4f812d(0x27b)]))_0x39ac6a[_0x4f812d(0x609)](_0x59968d[_0x4f812d(0x27b)]);}for(const _0x2fbf7f of _0x39ac6a){if(VisuMZ[_0x4f812d(0x1da)][_0x2fbf7f])continue;const _0x3e85a5=_0x4f812d(0x5c8)[_0x4f812d(0x26c)](_0x2fbf7f[_0x4f812d(0x264)](0x3)),_0x26223f=_0x4f812d(0x2aa)[_0x4f812d(0x26c)](_0x2fbf7f);DataManager['loadDataFile'](_0x26223f,_0x3e85a5),setTimeout(this[_0x4f812d(0x188)][_0x4f812d(0x2cb)](this,_0x2fbf7f,_0x26223f),0x64);}},Scene_Boot[_0x3bfc03(0x1fe)][_0x3bfc03(0x188)]=function(_0x458b55,_0x34e333){const _0x47c528=_0x3bfc03;if(window[_0x34e333])VisuMZ[_0x47c528(0x1da)][_0x458b55]=window[_0x34e333],window[_0x34e333]=undefined;else{if(_0x47c528(0x4b3)!==_0x47c528(0x4d9))setTimeout(this[_0x47c528(0x188)][_0x47c528(0x2cb)](this,_0x458b55,_0x34e333),0x64);else{if(!this['isTargetEventValidForLabelWindow'](_0x6fccf1))return;if(_0x4b933c[_0x47c528(0x483)]()){if(!_0x325a98[_0x47c528(0x450)])return;}let _0x1abd3b;const _0x34a104=_0x49e249['EventsMoveCore']['Settings']['Label'][_0x47c528(0x600)]??!![];_0x1abd3b=_0x34a104?new _0x45441d(_0x40c87c):new _0x5f38c2(_0x2a4066),_0x1abd3b['z']=0x8,_0x1abd3b[_0x47c528(0x1b9)]=_0x11bf8a[_0x47c528(0x44b)]++,this[_0x47c528(0x265)]['addChild'](_0x1abd3b),this[_0x47c528(0x64a)]['push'](_0x1abd3b);}}},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x3bfc03(0x598)]=[],VisuMZ['MapSwitches']=[],VisuMZ[_0x3bfc03(0x213)]=[],VisuMZ[_0x3bfc03(0x430)]=[],VisuMZ[_0x3bfc03(0x133)]=[],Scene_Boot[_0x3bfc03(0x1fe)][_0x3bfc03(0x21c)]=function(){const _0x4f08b8=_0x3bfc03;for(let _0x160565=0x1;_0x160565<$dataSystem[_0x4f08b8(0x418)][_0x4f08b8(0x553)];_0x160565++){if($dataSystem[_0x4f08b8(0x418)][_0x160565][_0x4f08b8(0x223)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x4f08b8(0x193)][_0x4f08b8(0x609)](_0x160565);if($dataSystem['switches'][_0x160565]['match'](/<SELF>/i))VisuMZ['SelfSwitches'][_0x4f08b8(0x609)](_0x160565);if($dataSystem[_0x4f08b8(0x418)][_0x160565][_0x4f08b8(0x223)](/<MAP>/i))VisuMZ[_0x4f08b8(0x349)][_0x4f08b8(0x609)](_0x160565);}for(let _0x47aabc=0x1;_0x47aabc<$dataSystem[_0x4f08b8(0x29f)]['length'];_0x47aabc++){if($dataSystem[_0x4f08b8(0x29f)][_0x47aabc][_0x4f08b8(0x223)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x4f08b8(0x213)][_0x4f08b8(0x609)](_0x47aabc);if($dataSystem[_0x4f08b8(0x29f)][_0x47aabc][_0x4f08b8(0x223)](/<SELF>/i))VisuMZ[_0x4f08b8(0x430)]['push'](_0x47aabc);if($dataSystem[_0x4f08b8(0x29f)][_0x47aabc][_0x4f08b8(0x223)](/<MAP>/i))VisuMZ['MapVariables'][_0x4f08b8(0x609)](_0x47aabc);}},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5fe)]={},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5fe)][_0x3bfc03(0x55e)]=function(){const _0x57206e=_0x3bfc03;this[_0x57206e(0x5aa)]=new Game_CPCInterpreter(),this[_0x57206e(0x1e8)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5fe)][_0x3bfc03(0x1e8)]=function(){const _0x3dda9e=_0x3bfc03;this['_commonEvents']=[];for(const _0x109041 of $dataCommonEvents){if(!_0x109041)continue;VisuMZ[_0x3dda9e(0x12c)]['CustomPageConditions'][_0x3dda9e(0x643)](_0x109041);if(_0x109041[_0x3dda9e(0x555)][_0x3dda9e(0x553)]>0x0)this[_0x3dda9e(0x56a)]['push'](_0x109041['id']);}},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5fe)]['metCPC']=function(_0x5819fb,_0x35f9df,_0x314f7f){const _0x1cdff8=_0x3bfc03;return this['_interpreter'][_0x1cdff8(0x18f)](_0x5819fb,_0x35f9df),_0x314f7f?_0x1cdff8(0x536)==='EbKqW'?this[_0x1cdff8(0x5aa)]['executeCommonEvent'](_0x314f7f):_0x557d2a[_0x1cdff8(0x12c)][_0x1cdff8(0x38e)]['call'](this,_0x30d233):this[_0x1cdff8(0x5aa)][_0x1cdff8(0x337)](),this['_interpreter'][_0x1cdff8(0x13c)];},VisuMZ[_0x3bfc03(0x12c)]['CustomPageConditions'][_0x3bfc03(0x643)]=function(_0x287081){const _0x405a13=_0x3bfc03;let _0x5eea62=![];_0x287081[_0x405a13(0x555)]=[];for(const _0x4a056b of _0x287081[_0x405a13(0x571)]){if([0x6c,0x198][_0x405a13(0x25e)](_0x4a056b[_0x405a13(0x4c1)])){const _0x42320b=_0x4a056b[_0x405a13(0x181)][0x0];if(_0x42320b['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x5eea62=!![];else _0x42320b[_0x405a13(0x223)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x5eea62=![]);}_0x5eea62&&_0x287081[_0x405a13(0x555)]['push'](_0x4a056b);}},getSelfSwitchValue=function(_0x551b97,_0x8091a,_0x95e354){const _0x33bb07=_0x3bfc03;let _0x35abbc=[_0x551b97,_0x8091a,_0x33bb07(0x2d2)[_0x33bb07(0x26c)](_0x95e354)];return typeof _0x95e354===_0x33bb07(0x2d7)&&(_0x35abbc=[_0x551b97,_0x8091a,_0x95e354[_0x33bb07(0x123)]()[_0x33bb07(0x4d7)]()]),$gameSelfSwitches[_0x33bb07(0x173)](_0x35abbc);},getMapSwitchValue=function(_0x4736e2,_0x5f20a0){const _0x20ce96=_0x3bfc03;let _0x43b72b=[0x0,0x0,_0x20ce96(0x1d7)[_0x20ce96(0x26c)](_0x4736e2,_0x5f20a0)];return $gameSelfSwitches[_0x20ce96(0x173)](_0x43b72b);},getMapVariableValue=function(_0xc783fd,_0x541a3a){const _0x231707=_0x3bfc03;let _0x33291e=[0x0,0x0,_0x231707(0x17a)['format'](_0xc783fd,_0x541a3a)];return $gameSelfSwitches[_0x231707(0x173)](_0x33291e);},getSelfVariableValue=function(_0x71680,_0xbf4c0c,_0x1083d7){const _0x57426e=_0x3bfc03,_0x35141a=[_0x71680,_0xbf4c0c,_0x57426e(0x205)[_0x57426e(0x26c)](_0x1083d7)];return $gameSelfSwitches[_0x57426e(0x173)](_0x35141a);},setSelfSwitchValue=function(_0xd122bc,_0x335ca2,_0x5d6a87,_0x5bfb1a){const _0x1cf34=_0x3bfc03;let _0x784691=[_0xd122bc,_0x335ca2,_0x1cf34(0x2d2)[_0x1cf34(0x26c)](_0x5d6a87)];typeof _0x5d6a87===_0x1cf34(0x2d7)&&(_0x1cf34(0x65b)!==_0x1cf34(0x131)?_0x784691=[_0xd122bc,_0x335ca2,_0x5d6a87['toUpperCase']()['trim']()]:_0x21afd5['requestAnimation']([this],_0x4ee377)),$gameSelfSwitches['setValue'](_0x784691,_0x5bfb1a);},setSelfVariableValue=function(_0x1460e8,_0x39820c,_0x13127f,_0x5ddd50){const _0x5ad947=_0x3bfc03,_0x43d3d6=[_0x1460e8,_0x39820c,_0x5ad947(0x205)['format'](_0x13127f)];$gameSelfSwitches[_0x5ad947(0x623)](_0x43d3d6,_0x5ddd50);},setMapSwitchValue=function(_0x3a5dc2,_0x420683,_0x34b9a0){const _0x9b44e8=_0x3bfc03;let _0x5b58e0=[0x0,0x0,_0x9b44e8(0x1d7)[_0x9b44e8(0x26c)](_0x3a5dc2,_0x420683)];$gameSelfSwitches['setValue'](_0x5b58e0,_0x34b9a0);},setMapVariableValue=function(_0xeb73fa,_0x23ad88,_0x321702){const _0x4c7bf2=_0x3bfc03;let _0x1c5ed5=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x4c7bf2(0x26c)](_0xeb73fa,_0x23ad88)];$gameSelfSwitches[_0x4c7bf2(0x623)](_0x1c5ed5,_0x321702);},DataManager['isAdvancedSwitch']=function(_0x115a48){const _0xbb252d=_0x3bfc03;if(SceneManager[_0xbb252d(0x2a7)][_0xbb252d(0x484)]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0xbb252d(0x25e)](_0x115a48);},DataManager[_0x3bfc03(0x426)]=function(_0x33cb3d){const _0x3f3bb1=_0x3bfc03;if(SceneManager[_0x3f3bb1(0x2a7)][_0x3f3bb1(0x484)]===Scene_Debug)return![];return VisuMZ[_0x3f3bb1(0x213)][_0x3f3bb1(0x25e)](_0x33cb3d);},DataManager[_0x3bfc03(0x4e4)]=function(_0x300b07){const _0x2a96d1=_0x3bfc03;if(SceneManager['_scene'][_0x2a96d1(0x484)]===Scene_Debug)return![];return VisuMZ[_0x2a96d1(0x598)][_0x2a96d1(0x25e)](_0x300b07);},DataManager['isSelfVariable']=function(_0x30d13e){const _0xecf817=_0x3bfc03;if(SceneManager[_0xecf817(0x2a7)][_0xecf817(0x484)]===Scene_Debug)return![];return VisuMZ[_0xecf817(0x430)][_0xecf817(0x25e)](_0x30d13e);},DataManager[_0x3bfc03(0x560)]=function(_0x480273){const _0x5a439a=_0x3bfc03;if(BattleManager[_0x5a439a(0x3fc)]())return![];return VisuMZ[_0x5a439a(0x349)][_0x5a439a(0x25e)](_0x480273);},DataManager[_0x3bfc03(0x404)]=function(_0x2d6a9b){const _0x3bd0ab=_0x3bfc03;if(BattleManager[_0x3bd0ab(0x3fc)]())return![];return VisuMZ[_0x3bd0ab(0x133)][_0x3bd0ab(0x25e)](_0x2d6a9b);},SceneManager[_0x3bfc03(0x239)]=function(){const _0x3de288=_0x3bfc03;return this[_0x3de288(0x2a7)]&&this[_0x3de288(0x2a7)]['constructor']===Scene_Map;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x1ab)]=Game_Temp[_0x3bfc03(0x1fe)]['setDestination'],Game_Temp[_0x3bfc03(0x1fe)][_0x3bfc03(0x4b8)]=function(_0xca8b4a,_0x287369){const _0x4a9f07=_0x3bfc03;if(this[_0x4a9f07(0x57f)](_0xca8b4a,_0x287369))return;VisuMZ[_0x4a9f07(0x12c)]['Game_Temp_setDestination'][_0x4a9f07(0x1ee)](this,_0xca8b4a,_0x287369);},Game_Temp['prototype']['isEventClickTriggered']=function(_0x5d19ec,_0x1333d1){const _0x1d528=_0x3bfc03,_0x5a3cdb=$gameMap[_0x1d528(0x156)](_0x5d19ec,_0x1333d1);for(const _0x49e649 of _0x5a3cdb){if(_0x49e649&&_0x49e649[_0x1d528(0x471)]()){if(_0x1d528(0x13a)===_0x1d528(0x52e)){const _0x88233e=_0x537d8a[_0x1d528(0x31c)](_0x12e4f6(_0x1cb236['$1']));return this[_0x1d528(0x289)](_0x88233e);}else return _0x49e649[_0x1d528(0x53a)](),!![];}}if(TouchInput[_0x1d528(0x2a9)]()&&_0x5a3cdb[_0x1d528(0x553)]>0x0){if(_0x1d528(0x274)===_0x1d528(0x4ef)){if(this[_0x1d528(0x156)](_0x1a4e4d,_0x342377)[_0x1d528(0x553)]>0x0)return!![];if(_0x168f2e['x']===_0x1b4c8d&&_0x407174['y']===_0x5c6dbb)return!![];if(this['boat']()[_0x1d528(0x3d8)](_0x411c41,_0x2b6b75))return!![];if(this[_0x1d528(0x19e)]()[_0x1d528(0x3d8)](_0x1e3aab,_0x16ab3a))return!![];return![];}else TouchInput['clear']();}return![];},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x2e71ff){const _0x9af9ff=_0x3bfc03;this[_0x9af9ff(0x338)]=_0x2e71ff;},Game_Temp[_0x3bfc03(0x1fe)]['getLastPluginCommandInterpreter']=function(){const _0x1dbadf=_0x3bfc03;return this[_0x1dbadf(0x338)];},Game_Temp[_0x3bfc03(0x1fe)][_0x3bfc03(0x1c8)]=function(_0xa8834){this['_selfTarget']=_0xa8834;},Game_Temp['prototype'][_0x3bfc03(0x563)]=function(){const _0xc16aa9=_0x3bfc03;this[_0xc16aa9(0x313)]=undefined;},Game_Temp[_0x3bfc03(0x1fe)][_0x3bfc03(0x5d9)]=function(){return this['_selfTarget'];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x61f)]=Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)],Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)]=function(){const _0xad1a51=_0x3bfc03;VisuMZ[_0xad1a51(0x12c)][_0xad1a51(0x61f)][_0xad1a51(0x1ee)](this),this['initEventsMoveCore'](),this['initFollowerController']();},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x5b9)]=function(){const _0x208073=_0x3bfc03;this[_0x208073(0x37a)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x208073(0x663)]={},this[_0x208073(0x3c3)]=[],this[_0x208073(0x5a1)]={},this[_0x208073(0x3a2)]={},this[_0x208073(0x23a)]=![],this[_0x208073(0x5a9)]=_0x208073(0x4c6);},Game_System['prototype']['isDashingEnabled']=function(){const _0x49f77e=_0x3bfc03;if(this[_0x49f77e(0x37a)]===undefined)this[_0x49f77e(0x5b9)]();if(this[_0x49f77e(0x37a)][_0x49f77e(0x39b)]===undefined)this[_0x49f77e(0x5b9)]();return this[_0x49f77e(0x37a)][_0x49f77e(0x39b)];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x2ad)]=function(_0x2c757d){const _0x5a5fde=_0x3bfc03;if(this[_0x5a5fde(0x37a)]===undefined)this[_0x5a5fde(0x5b9)]();if(this[_0x5a5fde(0x37a)][_0x5a5fde(0x39b)]===undefined)this[_0x5a5fde(0x5b9)]();this['_EventsMoveCoreSettings'][_0x5a5fde(0x39b)]=_0x2c757d;},Game_System['prototype'][_0x3bfc03(0x2b9)]=function(){const _0x133457=_0x3bfc03;if(this[_0x133457(0x37a)]===undefined)this[_0x133457(0x5b9)]();if(this[_0x133457(0x37a)]['EventAutoMovement']===undefined)this[_0x133457(0x5b9)]();return this['_EventsMoveCoreSettings'][_0x133457(0x438)];},Game_System['prototype'][_0x3bfc03(0x13d)]=function(_0x440b9b){const _0x26cb5d=_0x3bfc03;if(this['_EventsMoveCoreSettings']===undefined)this[_0x26cb5d(0x5b9)]();if(this[_0x26cb5d(0x37a)]['EventAutoMovement']===undefined)this[_0x26cb5d(0x5b9)]();this['_EventsMoveCoreSettings'][_0x26cb5d(0x438)]=_0x440b9b;},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x636)]=function(){const _0x50c83d=_0x3bfc03;if(this[_0x50c83d(0x37a)]===undefined)this[_0x50c83d(0x5b9)]();if(this['_EventsMoveCoreSettings'][_0x50c83d(0x244)]===undefined)this[_0x50c83d(0x5b9)]();return this[_0x50c83d(0x37a)][_0x50c83d(0x244)];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x408)]=function(_0x4f5467){const _0xfeb22a=_0x3bfc03;if(this[_0xfeb22a(0x37a)]===undefined)this['initEventsMoveCore']();if(this[_0xfeb22a(0x37a)]['VisibleEventLabels']===undefined)this[_0xfeb22a(0x5b9)]();this[_0xfeb22a(0x37a)][_0xfeb22a(0x244)]=_0x4f5467;},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x32b)]=function(){const _0x2b21f1=_0x3bfc03;return this['_DisablePlayerControl']===undefined&&(_0x2b21f1(0x314)===_0x2b21f1(0x314)?this[_0x2b21f1(0x23a)]=![]:(this['updatePeriodicRefresh'](),_0x3d5d92[_0x2b21f1(0x12c)]['Game_Map_update']['call'](this,_0x37afd2))),this[_0x2b21f1(0x23a)];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x146)]=function(_0x1afd98){const _0xeae06e=_0x3bfc03;this[_0xeae06e(0x23a)]=_0x1afd98;},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x20e)]=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x3dd)]=function(_0x15add3){const _0x25730b=_0x3bfc03;this[_0x25730b(0x5a9)]=String(_0x15add3)[_0x25730b(0x194)]()['trim']();},Game_System[_0x3bfc03(0x1fe)]['getEventIconData']=function(_0x2b4fa2){const _0x48b091=_0x3bfc03;if(this[_0x48b091(0x663)]===undefined)this[_0x48b091(0x5b9)]();if(!_0x2b4fa2)return null;if(_0x2b4fa2===$gamePlayer)return this[_0x48b091(0x663)]['Player'];else{const _0x939c33=VisuMZ[_0x48b091(0x12c)][_0x48b091(0x653)],_0x375a2e=_0x48b091(0x548)['format'](_0x2b4fa2[_0x48b091(0x4f1)],_0x2b4fa2[_0x48b091(0x5dc)]);return this[_0x48b091(0x663)][_0x375a2e]=this[_0x48b091(0x663)][_0x375a2e]||{'iconIndex':0x0,'bufferX':_0x939c33['Icon'][_0x48b091(0x463)],'bufferY':_0x939c33[_0x48b091(0x495)][_0x48b091(0x53e)],'blendMode':_0x939c33[_0x48b091(0x495)]['BlendMode']},this[_0x48b091(0x663)][_0x375a2e];}},Game_System['prototype'][_0x3bfc03(0x344)]=function(_0xd7ed8b,_0x278fc2,_0x148d0a,_0x51cea2,_0x7625b3){const _0x563bad=_0x3bfc03;if(this[_0x563bad(0x663)]===undefined)this['initEventsMoveCore']();const _0x130e8f=_0xd7ed8b===$gamePlayer?'Player':'Map%1-Event%2'[_0x563bad(0x26c)](_0xd7ed8b[_0x563bad(0x4f1)],_0xd7ed8b['_eventId']);this[_0x563bad(0x663)][_0x130e8f]={'iconIndex':_0x278fc2,'bufferX':_0x148d0a,'bufferY':_0x51cea2,'blendMode':_0x7625b3};},Game_System[_0x3bfc03(0x1fe)]['setEventIconDataKey']=function(_0x577e7e,_0x31021a,_0x1599e2,_0x4fbade,_0xf704e2,_0x11cb76){const _0x3e6492=_0x3bfc03;if(this['_EventIcons']===undefined)this[_0x3e6492(0x5b9)]();const _0x16d9c6=_0x3e6492(0x548)[_0x3e6492(0x26c)](_0x577e7e,_0x31021a);this[_0x3e6492(0x663)][_0x16d9c6]={'iconIndex':_0x1599e2,'bufferX':_0x4fbade,'bufferY':_0xf704e2,'blendMode':_0x11cb76};},Game_System['prototype'][_0x3bfc03(0x140)]=function(_0x228024){const _0x5767fd=_0x3bfc03;if(this['_EventIcons']===undefined)this[_0x5767fd(0x5b9)]();if(!_0x228024)return null;_0x228024===$gamePlayer?delete this[_0x5767fd(0x663)][_0x5767fd(0x439)]:this[_0x5767fd(0x151)](_0x228024[_0x5767fd(0x4f1)],_0x228024[_0x5767fd(0x5dc)]);},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x151)]=function(_0x277bd6,_0x4348b6){const _0x264271=_0x3bfc03;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0x2c9b8e=_0x264271(0x548)[_0x264271(0x26c)](_0x277bd6,_0x4348b6);delete this[_0x264271(0x663)][_0x2c9b8e];},Game_System['prototype']['getSavedEventLocation']=function(_0x15585f){const _0x4ed887=_0x3bfc03;if(this[_0x4ed887(0x3a2)]===undefined)this[_0x4ed887(0x5b9)]();if(!_0x15585f)return null;const _0x3dce76='Map%1-Event%2'[_0x4ed887(0x26c)](_0x15585f[_0x4ed887(0x4f1)],_0x15585f[_0x4ed887(0x5dc)]);return this[_0x4ed887(0x3a2)][_0x3dce76];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x1ea)]=function(_0x5481b2){const _0x26ff3b=_0x3bfc03;if(this[_0x26ff3b(0x3a2)]===undefined)this['initEventsMoveCore']();if(!_0x5481b2)return;const _0x283b2f='Map%1-Event%2'[_0x26ff3b(0x26c)](_0x5481b2['_mapId'],_0x5481b2[_0x26ff3b(0x5dc)]);this[_0x26ff3b(0x3a2)][_0x283b2f]={'direction':_0x5481b2[_0x26ff3b(0x403)](),'x':Math[_0x26ff3b(0x1d4)](_0x5481b2['x']),'y':Math[_0x26ff3b(0x1d4)](_0x5481b2['y']),'pageIndex':_0x5481b2[_0x26ff3b(0x1b1)],'moveRouteIndex':_0x5481b2[_0x26ff3b(0x5e4)]};},Game_System['prototype']['deleteSavedEventLocation']=function(_0x5e6c9d){const _0x1da3ff=_0x3bfc03;if(this[_0x1da3ff(0x3a2)]===undefined)this[_0x1da3ff(0x5b9)]();if(!_0x5e6c9d)return;this[_0x1da3ff(0x378)](_0x5e6c9d[_0x1da3ff(0x4f1)],_0x5e6c9d[_0x1da3ff(0x5dc)]);},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x378)]=function(_0x2b8657,_0x5dcc39){const _0x55ba12=_0x3bfc03;if(this[_0x55ba12(0x3a2)]===undefined)this[_0x55ba12(0x5b9)]();const _0x1d15ff=_0x55ba12(0x548)[_0x55ba12(0x26c)](_0x2b8657,_0x5dcc39);delete this[_0x55ba12(0x3a2)][_0x1d15ff];},Game_System['prototype'][_0x3bfc03(0x5bb)]=function(_0x4d7e52,_0x4e81b2,_0x5bbbd4,_0xe5c5f0,_0x1d4bf5,_0x5ed14f,_0x58401a){const _0xafa15c=_0x3bfc03;if(this[_0xafa15c(0x3a2)]===undefined)this['initEventsMoveCore']();const _0xe44dd=_0xafa15c(0x548)[_0xafa15c(0x26c)](_0x4d7e52,_0x4e81b2);this['_SavedEventLocations'][_0xe44dd]={'direction':_0x1d4bf5,'x':Math['round'](_0x5bbbd4),'y':Math[_0xafa15c(0x1d4)](_0xe5c5f0),'pageIndex':_0x5ed14f,'moveRouteIndex':_0x58401a};},Game_System['prototype'][_0x3bfc03(0x164)]=function(_0x40aff2){const _0x4ae41e=_0x3bfc03;if(this[_0x4ae41e(0x5a1)]===undefined)this[_0x4ae41e(0x5b9)]();if(!_0x40aff2)return;const _0x297317=_0x4ae41e(0x548)['format'](_0x40aff2[_0x4ae41e(0x4f1)],_0x40aff2['_eventId']);return this['_PreservedEventMorphData'][_0x297317];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x245)]=function(_0x23b766,_0x33c768,_0x5bb239,_0x33336e,_0x4aa10a){const _0x26c39c=_0x3bfc03;if(this[_0x26c39c(0x5a1)]===undefined)this['initEventsMoveCore']();const _0x85f7ff='Map%1-Event%2'[_0x26c39c(0x26c)](_0x23b766,_0x33c768);this[_0x26c39c(0x5a1)][_0x85f7ff]={'template':_0x5bb239,'mapId':_0x33336e,'eventId':_0x4aa10a};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0x1c24c8,_0x42f959){const _0xfdaf02=_0x3bfc03;if(this[_0xfdaf02(0x5a1)]===undefined)this[_0xfdaf02(0x5b9)]();const _0x38c441='Map%1-Event%2'[_0xfdaf02(0x26c)](_0x1c24c8,_0x42f959);delete this[_0xfdaf02(0x5a1)][_0x38c441];},Game_System['prototype'][_0x3bfc03(0x39d)]=function(_0x49c06c){const _0x511100=_0x3bfc03;if(this[_0x511100(0x3c3)]===undefined)this[_0x511100(0x5b9)]();return this[_0x511100(0x3c3)][_0x49c06c]=this['_MapSpawnedEventData'][_0x49c06c]||[],this[_0x511100(0x3c3)][_0x49c06c];},Game_System[_0x3bfc03(0x1fe)]['removeTemporaryMapSpawnedEvents']=function(_0x52205d){const _0x512de4=_0x3bfc03,_0x12bd41=this[_0x512de4(0x39d)](_0x52205d);for(const _0x20110d of _0x12bd41){if('OTilb'!==_0x512de4(0x5e1)){if(!_0x20110d)continue;if(_0x20110d[_0x512de4(0x64f)])continue;const _0x512d15=_0x12bd41['indexOf'](_0x20110d);_0x12bd41[_0x512d15]=null;}else _0x307dfd[_0x512de4(0x12c)][_0x512de4(0x38e)][_0x512de4(0x1ee)](this,_0x1c5ef4);}},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x190)]=function(){const _0x38fb1a=_0x3bfc03;this[_0x38fb1a(0x129)]=0x0,this[_0x38fb1a(0x22d)]=![];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x2d3)]=function(){const _0x316a7a=_0x3bfc03;if(this[_0x316a7a(0x129)]===undefined)this[_0x316a7a(0x190)]();return this[_0x316a7a(0x129)];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x1d9)]=function(_0x518c2d){const _0x241b5d=_0x3bfc03;if(this['_followerControlID']===undefined)this[_0x241b5d(0x190)]();this[_0x241b5d(0x129)]=_0x518c2d;;},VisuMZ[_0x3bfc03(0x12c)]['Game_Interpreter_character']=Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x14a)],Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x14a)]=function(_0x3dd00d){const _0x1fb451=_0x3bfc03;if(!$gameParty[_0x1fb451(0x3f1)]()&&_0x3dd00d<0x0){let _0x272951=$gameSystem[_0x1fb451(0x2d3)]();if(_0x272951>0x0)return $gamePlayer[_0x1fb451(0x611)]()['follower'](_0x272951-0x1);}return VisuMZ[_0x1fb451(0x12c)]['Game_Interpreter_character'][_0x1fb451(0x1ee)](this,_0x3dd00d);},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x17d)]=function(){const _0x4cd5bc=_0x3bfc03;if(this['_followerChaseOff']===undefined)this[_0x4cd5bc(0x190)]();return this[_0x4cd5bc(0x22d)];},Game_System[_0x3bfc03(0x1fe)][_0x3bfc03(0x21b)]=function(_0x31909e){const _0x21e2a8=_0x3bfc03;if(this['_followerChaseOff']===undefined)this['initFollowerController']();this[_0x21e2a8(0x22d)]=_0x31909e;;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x287)]=Game_Followers[_0x3bfc03(0x1fe)][_0x3bfc03(0x2bf)],Game_Followers[_0x3bfc03(0x1fe)][_0x3bfc03(0x2bf)]=function(){const _0x569c00=_0x3bfc03;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x569c00(0x12c)]['Game_Followers_jumpAll']['call'](this);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x619)]=Game_Timer[_0x3bfc03(0x1fe)]['initialize'],Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)]=function(){const _0x18ab7f=_0x3bfc03;VisuMZ[_0x18ab7f(0x12c)][_0x18ab7f(0x619)][_0x18ab7f(0x1ee)](this),this[_0x18ab7f(0x5b9)]();},Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x5b9)]=function(){const _0x6a4b08=_0x3bfc03;this[_0x6a4b08(0x33a)]=![],this['_speed']=-0x1,this[_0x6a4b08(0x2d4)]=0x0;},Game_Timer['prototype']['update']=function(_0x12a3fb){const _0x22957c=_0x3bfc03;if(!_0x12a3fb)return;if(!this[_0x22957c(0x4b1)])return;if(this[_0x22957c(0x33a)])return;if(this[_0x22957c(0x4de)]<=0x0)return;if(this[_0x22957c(0x458)]===undefined)this[_0x22957c(0x5b9)]();this['_frames']+=this['_speed'],this[_0x22957c(0x4de)]<=0x0&&(_0x22957c(0x2c7)===_0x22957c(0x2c7)?this[_0x22957c(0x229)]():_0x4940c2[0x2][_0x22957c(0x223)](/(?:SELF|MAP)/i)?this[_0x22957c(0x642)](_0xb0327c,_0x48801d):_0x4c3833[_0x22957c(0x12c)]['Game_SelfSwitches_setValue'][_0x22957c(0x1ee)](this,_0x36aa0f,_0xa9e30));},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4d2)]=Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x4a6)],Game_Timer['prototype']['start']=function(_0x1577bc){const _0x24e894=_0x3bfc03;VisuMZ['EventsMoveCore']['Game_Timer_start']['call'](this,_0x1577bc);if(this[_0x24e894(0x33a)]===undefined)this[_0x24e894(0x5b9)]();this[_0x24e894(0x33a)]=![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x3ad)]=Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x3da)],Game_Timer['prototype'][_0x3bfc03(0x3da)]=function(){const _0x48f18e=_0x3bfc03;VisuMZ[_0x48f18e(0x12c)]['Game_Timer_stop'][_0x48f18e(0x1ee)](this);if(this['_paused']===undefined)this[_0x48f18e(0x5b9)]();this[_0x48f18e(0x33a)]=![];},Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x4c4)]=function(){const _0x282518=_0x3bfc03;if(this[_0x282518(0x4de)]<=0x0)return;this[_0x282518(0x33a)]=!![],this[_0x282518(0x4b1)]=!![];},Game_Timer['prototype'][_0x3bfc03(0x4b2)]=function(){const _0x1ed652=_0x3bfc03;if(this[_0x1ed652(0x4de)]<=0x0)return;this[_0x1ed652(0x33a)]=![],this[_0x1ed652(0x4b1)]=!![];},Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x4b9)]=function(_0x3eb217){const _0x2c2620=_0x3bfc03;this[_0x2c2620(0x4de)]=this[_0x2c2620(0x4de)]||0x0,this['_frames']+=_0x3eb217,this[_0x2c2620(0x4b1)]=!![],this[_0x2c2620(0x4de)]=Math[_0x2c2620(0x159)](0x1,this[_0x2c2620(0x4de)]);},Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x35c)]=function(_0x459070){const _0x2a8ed1=_0x3bfc03;this[_0x2a8ed1(0x4de)]=this[_0x2a8ed1(0x4de)]||0x0,this[_0x2a8ed1(0x4de)]=_0x459070,this[_0x2a8ed1(0x4b1)]=!![],this['_frames']=Math[_0x2a8ed1(0x159)](0x1,this['_frames']);},Game_Timer[_0x3bfc03(0x1fe)]['changeSpeed']=function(_0x279483){const _0x37be0a=_0x3bfc03;this[_0x37be0a(0x458)]=_0x279483,this[_0x37be0a(0x4b1)]=!![],_0x279483>0x0&&(this[_0x37be0a(0x4de)]=Math['max'](this[_0x37be0a(0x4de)],0x1));},Game_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e4)]=function(_0x5c81ad){const _0x7d75b8=_0x3bfc03;if(this[_0x7d75b8(0x2d4)]===undefined)this['initEventsMoveCore']();this[_0x7d75b8(0x2d4)]=_0x5c81ad;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x12e)]=Game_Timer['prototype'][_0x3bfc03(0x229)],Game_Timer['prototype'][_0x3bfc03(0x229)]=function(){const _0x587e6f=_0x3bfc03;if(this['_expireCommonEvent']===undefined)this[_0x587e6f(0x5b9)]();if(this['_expireCommonEvent'])_0x587e6f(0x64d)!==_0x587e6f(0x1ff)?$gameTemp[_0x587e6f(0x514)](this['_expireCommonEvent']):_0x2104e6*=this['_scaleY'];else{if(_0x587e6f(0x5cd)===_0x587e6f(0x5cd))VisuMZ[_0x587e6f(0x12c)][_0x587e6f(0x12e)]['call'](this);else{if(_0x23e536&&_0x3bd992['hasClickTrigger']())return _0x24ad76[_0x587e6f(0x53a)](),!![];}}},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x607)]=Game_Message[_0x3bfc03(0x1fe)]['add'],Game_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x4fa)]=function(_0x364e42){const _0x1ee556=_0x3bfc03;VisuMZ[_0x1ee556(0x12c)][_0x1ee556(0x607)][_0x1ee556(0x1ee)](this,_0x364e42),this['_selfEvent']=$gameTemp[_0x1ee556(0x5d9)]();},Game_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x59e)]=function(){const _0x35e507=_0x3bfc03;$gameTemp[_0x35e507(0x1c8)](this['_selfEvent']);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x1ae)]=Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x173)],Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x173)]=function(_0xc898d5){const _0x4be732=_0x3bfc03;if(DataManager[_0x4be732(0x59b)](_0xc898d5))return!!this[_0x4be732(0x447)](_0xc898d5);else{if(DataManager[_0x4be732(0x4e4)](_0xc898d5))return!!this[_0x4be732(0x445)](_0xc898d5);else return DataManager[_0x4be732(0x560)](_0xc898d5)?!!this['mapValue'](_0xc898d5):VisuMZ[_0x4be732(0x12c)]['Game_Switches_value'][_0x4be732(0x1ee)](this,_0xc898d5);}},Game_Switches[_0x3bfc03(0x63b)]={},Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x447)]=function(_0x18fe44){const _0x1b31d2=_0x3bfc03;if(!Game_Switches[_0x1b31d2(0x63b)][_0x18fe44]){$dataSystem[_0x1b31d2(0x418)][_0x18fe44][_0x1b31d2(0x223)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0xdb0b03=_0x1b31d2(0x299)[_0x1b31d2(0x26c)](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x18fe44]=new Function('switchId',_0xdb0b03);}const _0x973ae3=$gameTemp[_0x1b31d2(0x5d9)]()||this;return Game_Switches[_0x1b31d2(0x63b)][_0x18fe44]['call'](_0x973ae3,_0x18fe44);},Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x445)]=function(_0x1b5321){const _0x40947a=_0x3bfc03,_0xdc0b9e=$gameTemp[_0x40947a(0x5d9)]()||this;if(_0xdc0b9e[_0x40947a(0x484)]!==Game_Event)return VisuMZ[_0x40947a(0x12c)][_0x40947a(0x1ae)]['call'](this,_0x1b5321);else{const _0x13c003=[_0xdc0b9e[_0x40947a(0x4f1)],_0xdc0b9e[_0x40947a(0x5dc)],_0x40947a(0x2d2)['format'](_0x1b5321)];return $gameSelfSwitches[_0x40947a(0x173)](_0x13c003);}},Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e3)]=function(_0x5cb138){const _0x1667b4=_0x3bfc03,_0x1fed98=$gameMap?$gameMap[_0x1667b4(0x48e)]():0x0,_0x6d7d5f=[0x0,0x0,_0x1667b4(0x1d7)['format'](_0x1fed98,_0x5cb138)];return $gameSelfSwitches[_0x1667b4(0x173)](_0x6d7d5f);},VisuMZ[_0x3bfc03(0x12c)]['Game_Switches_setValue']=Game_Switches['prototype']['setValue'],Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x623)]=function(_0x336a3f,_0x3d3a1f){const _0x13ecb2=_0x3bfc03;if(DataManager['isSelfSwitch'](_0x336a3f))this[_0x13ecb2(0x642)](_0x336a3f,_0x3d3a1f);else DataManager[_0x13ecb2(0x560)](_0x336a3f)?this[_0x13ecb2(0x521)](_0x336a3f,_0x3d3a1f):VisuMZ[_0x13ecb2(0x12c)][_0x13ecb2(0x455)][_0x13ecb2(0x1ee)](this,_0x336a3f,_0x3d3a1f);},Game_Switches[_0x3bfc03(0x1fe)][_0x3bfc03(0x642)]=function(_0x18bd36,_0x5ec46f){const _0x352e4f=_0x3bfc03,_0x37b400=$gameTemp[_0x352e4f(0x5d9)]()||this;if(_0x37b400[_0x352e4f(0x484)]!==Game_Event)VisuMZ[_0x352e4f(0x12c)][_0x352e4f(0x455)][_0x352e4f(0x1ee)](this,_0x18bd36,_0x5ec46f);else{if(_0x352e4f(0x180)!==_0x352e4f(0x180))_0x5189a9['EventsMoveCore'][_0x352e4f(0x206)]['call'](this,_0x3ce58a),this[_0x352e4f(0x1e4)]=![];else{const _0x168ecf=[_0x37b400[_0x352e4f(0x4f1)],_0x37b400[_0x352e4f(0x5dc)],_0x352e4f(0x2d2)['format'](_0x18bd36)];$gameSelfSwitches[_0x352e4f(0x623)](_0x168ecf,_0x5ec46f);}}},Game_Switches[_0x3bfc03(0x1fe)]['setMapValue']=function(_0x349a1c,_0x560b3c){const _0x275764=_0x3bfc03,_0x2f1e90=$gameMap?$gameMap[_0x275764(0x48e)]():0x0,_0x56dc25=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x275764(0x26c)](_0x2f1e90,_0x349a1c)];return $gameSelfSwitches[_0x275764(0x623)](_0x56dc25,_0x560b3c);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x134)]=Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x173)],Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x173)]=function(_0x31961a){const _0x1b3576=_0x3bfc03;if(DataManager[_0x1b3576(0x426)](_0x31961a))return this[_0x1b3576(0x447)](_0x31961a);else{if(DataManager[_0x1b3576(0x1b3)](_0x31961a))return _0x1b3576(0x246)==='uhVNp'?_0x14607a[_0x1b3576(0x12c)][_0x1b3576(0x508)]['call'](this,_0xb64ea3,_0x48d341,_0x2aa1f0):this['selfValue'](_0x31961a);else return DataManager['isMapVariable'](_0x31961a)?this[_0x1b3576(0x2e3)](_0x31961a):VisuMZ[_0x1b3576(0x12c)][_0x1b3576(0x134)][_0x1b3576(0x1ee)](this,_0x31961a);}},Game_Variables[_0x3bfc03(0x63b)]={},Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x447)]=function(_0x161c79){const _0x49a35a=_0x3bfc03;if(!Game_Variables[_0x49a35a(0x63b)][_0x161c79]){$dataSystem[_0x49a35a(0x29f)][_0x161c79][_0x49a35a(0x223)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x526b01=_0x49a35a(0x299)[_0x49a35a(0x26c)](String(RegExp['$1']));Game_Variables[_0x49a35a(0x63b)][_0x161c79]=new Function(_0x49a35a(0x56c),_0x526b01);}const _0x6c781d=$gameTemp[_0x49a35a(0x5d9)]()||this;return Game_Variables[_0x49a35a(0x63b)][_0x161c79][_0x49a35a(0x1ee)](_0x6c781d,_0x161c79);},Game_Variables[_0x3bfc03(0x1fe)]['selfValue']=function(_0x43e99d){const _0x298ba4=_0x3bfc03,_0x5cb21b=$gameTemp[_0x298ba4(0x5d9)]()||this;if(_0x5cb21b[_0x298ba4(0x484)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x298ba4(0x134)]['call'](this,_0x43e99d);else{const _0x327931=[_0x5cb21b['_mapId'],_0x5cb21b[_0x298ba4(0x5dc)],_0x298ba4(0x205)[_0x298ba4(0x26c)](_0x43e99d)];return $gameSelfSwitches[_0x298ba4(0x173)](_0x327931);}},Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e3)]=function(_0x345e55){const _0x360047=_0x3bfc03,_0x19c9cd=$gameMap?$gameMap[_0x360047(0x48e)]():0x0,_0x322d2f=[0x0,0x0,_0x360047(0x17a)[_0x360047(0x26c)](_0x19c9cd,_0x345e55)];return $gameSelfSwitches[_0x360047(0x173)](_0x322d2f)||0x0;},VisuMZ['EventsMoveCore'][_0x3bfc03(0x520)]=Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x623)],Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x623)]=function(_0x16e084,_0x1c9aa3){const _0x305d06=_0x3bfc03;if(DataManager[_0x305d06(0x1b3)](_0x16e084)){if(_0x305d06(0x13f)!=='vQeTJ')this[_0x305d06(0x642)](_0x16e084,_0x1c9aa3);else return _0x4d6591[_0x305d06(0x444)]['includes'](_0x36b92f)||_0x3e9f9a[_0x305d06(0x580)][_0x305d06(0x25e)](_0x45a644);}else{if(DataManager['isMapVariable'](_0x16e084)){if(_0x305d06(0x238)!=='yYMUo')this[_0x305d06(0x521)](_0x16e084,_0x1c9aa3);else return this[_0x305d06(0x432)](0x6,_0x7b6bd9(_0x2b15a4['$1']));}else VisuMZ[_0x305d06(0x12c)]['Game_Variables_setValue'][_0x305d06(0x1ee)](this,_0x16e084,_0x1c9aa3);}},Game_Variables['prototype'][_0x3bfc03(0x642)]=function(_0x8be2d0,_0x2bdb59){const _0x42ebd7=_0x3bfc03,_0x58c667=$gameTemp[_0x42ebd7(0x5d9)]()||this;if(_0x58c667[_0x42ebd7(0x484)]!==Game_Event)VisuMZ[_0x42ebd7(0x12c)][_0x42ebd7(0x520)][_0x42ebd7(0x1ee)](this,_0x8be2d0,_0x2bdb59);else{if(_0x42ebd7(0x66e)!==_0x42ebd7(0x66e))[0x6c,0x198]['includes'](_0x484115[_0x42ebd7(0x4c1)])&&(_0x10a6c3+=_0x17f03b['parameters'][0x0]);else{const _0x1611e8=[_0x58c667[_0x42ebd7(0x4f1)],_0x58c667[_0x42ebd7(0x5dc)],_0x42ebd7(0x205)[_0x42ebd7(0x26c)](_0x8be2d0)];$gameSelfSwitches['setValue'](_0x1611e8,_0x2bdb59);}}},Game_Variables[_0x3bfc03(0x1fe)][_0x3bfc03(0x521)]=function(_0x1bd5ec,_0xf4ea7c){const _0x54090d=_0x3bfc03,_0x525f62=$gameMap?$gameMap['mapId']():0x0,_0x22d2f4=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x525f62,_0x1bd5ec)];$gameSelfSwitches[_0x54090d(0x623)](_0x22d2f4,_0xf4ea7c);},VisuMZ[_0x3bfc03(0x12c)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x173)],Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x173)]=function(_0x456f6a){const _0x33e178=_0x3bfc03;if(_0x456f6a[0x2]['match'](/(?:SELF|MAP)/i)){if(_0x33e178(0x16e)===_0x33e178(0x64b))for(let _0x1c6183=_0x193306;_0x1c6183<=_0x25ea74;_0x1c6183++){if(this[_0x33e178(0x358)](_0xa8dc0a,_0x1c6183))return![];}else return this[_0x33e178(0x445)](_0x456f6a);}else{return VisuMZ[_0x33e178(0x12c)]['Game_SelfSwitches_value'][_0x33e178(0x1ee)](this,_0x456f6a);;}},Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x445)]=function(_0x32707e){const _0x3b3a01=_0x3bfc03;return _0x32707e[0x2][_0x3b3a01(0x223)](/VAR/i)?this['_data'][_0x32707e]||0x0:!!this[_0x3b3a01(0x33d)][_0x32707e];},VisuMZ[_0x3bfc03(0x12c)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x623)],Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x623)]=function(_0x4c97da,_0x5d8b03){const _0x4e9219=_0x3bfc03;_0x4c97da[0x2]['match'](/(?:SELF|MAP)/i)?_0x4e9219(0x3bb)==='YBxfd'?this['_customZ']=_0x1844ec(_0xba9d10['$1'])||0x0:this[_0x4e9219(0x642)](_0x4c97da,_0x5d8b03):VisuMZ['EventsMoveCore'][_0x4e9219(0x220)][_0x4e9219(0x1ee)](this,_0x4c97da,_0x5d8b03);},Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x642)]=function(_0x2569c5,_0x52842a){const _0x29bf44=_0x3bfc03;this['_data'][_0x2569c5]=_0x2569c5[0x2][_0x29bf44(0x223)](/VAR/i)?_0x52842a:!!_0x52842a,this[_0x29bf44(0x612)]();},VisuMZ[_0x3bfc03(0x12c)]['Scene_Map_createDisplayObjects']=Scene_Map[_0x3bfc03(0x1fe)]['createDisplayObjects'],Scene_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x485)]=function(){const _0x1b1b6c=_0x3bfc03;$gameMap[_0x1b1b6c(0x588)](),VisuMZ[_0x1b1b6c(0x12c)]['Scene_Map_createDisplayObjects']['call'](this);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x588)]=function(){const _0x496bf7=_0x3bfc03;this[_0x496bf7(0x487)]=this[_0x496bf7(0x48e)](),this[_0x496bf7(0x4b4)]=undefined;const _0x16cd44=this[_0x496bf7(0x501)]();for(const _0x141bb0 of _0x16cd44){if(_0x496bf7(0x530)!==_0x496bf7(0x48c)){if(_0x141bb0)$gameSelfSwitches[_0x496bf7(0x24b)](_0x141bb0);}else{const _0x4f414a=_0x55922b[_0x496bf7(0x456)](this[_0x496bf7(0x3c6)]());this[_0x496bf7(0x417)](_0x4f414a[_0x496bf7(0x620)]());}}},Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x24b)]=function(_0x83c65b){const _0xd953be=_0x3bfc03;if(!_0x83c65b)return;if(!_0x83c65b['event']())return;const _0x5c4d23=_0x83c65b[_0xd953be(0x31c)]()['note']||'';if(_0x5c4d23['match'](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x35d0c2=_0xd953be(0x2cd)[_0xd953be(0x26c)]($gameMap['_mapId'],_0x83c65b[_0xd953be(0x5dc)]),_0xa40771=Object[_0xd953be(0x3be)](this['_data'])[_0xd953be(0x669)](_0x330bed=>_0x330bed[_0xd953be(0x529)](_0x35d0c2));while(_0xa40771['length']>0x0){const _0x25943e=_0xa40771[_0xd953be(0x4fe)]();delete this[_0xd953be(0x33d)][_0x25943e];}}},Game_SelfSwitches[_0x3bfc03(0x1fe)][_0x3bfc03(0x1a0)]=function(_0x5481cb){const _0xc00268=_0x3bfc03,_0x25a302=_0xc00268(0x2ab)[_0xc00268(0x26c)]($gameMap[_0xc00268(0x4f1)]),_0x10e15e=Object[_0xc00268(0x3be)](this[_0xc00268(0x33d)])[_0xc00268(0x669)](_0x1193b0=>_0x1193b0['startsWith'](_0x25a302));while(_0x10e15e[_0xc00268(0x553)]>0x0){if(_0xc00268(0x14b)===_0xc00268(0x3f4))this[_0xc00268(0x331)]='',this[_0xc00268(0x464)]();else{const _0x501b4a=_0x10e15e[_0xc00268(0x4fe)]();delete this[_0xc00268(0x33d)][_0x501b4a];}}_0x5481cb===$gameMap[_0xc00268(0x48e)]()&&$gameMap[_0xc00268(0x61a)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x441)]=Game_Enemy[_0x3bfc03(0x1fe)][_0x3bfc03(0x4cf)],Game_Enemy[_0x3bfc03(0x1fe)][_0x3bfc03(0x4cf)]=function(_0x39896e){const _0x36e75b=_0x3bfc03;$gameTemp[_0x36e75b(0x1c8)](this);const _0x3b16d0=VisuMZ['EventsMoveCore'][_0x36e75b(0x441)][_0x36e75b(0x1ee)](this,_0x39896e);return $gameTemp[_0x36e75b(0x563)](),_0x3b16d0;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5e3)]=Game_Troop['prototype'][_0x3bfc03(0x357)],Game_Troop[_0x3bfc03(0x1fe)]['meetsConditions']=function(_0x2ff970){const _0x22ddf7=_0x3bfc03;$gameTemp[_0x22ddf7(0x1c8)](this);const _0x4fc169=VisuMZ[_0x22ddf7(0x12c)][_0x22ddf7(0x5e3)][_0x22ddf7(0x1ee)](this,_0x2ff970);return $gameTemp[_0x22ddf7(0x563)](),_0x4fc169;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4cc)]=Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x18f)],Game_Map[_0x3bfc03(0x1fe)]['setup']=function(_0x259e67){const _0x1b43a8=_0x3bfc03;this[_0x1b43a8(0x4ac)](_0x259e67),this['clearEventCache'](),VisuMZ[_0x1b43a8(0x12c)][_0x1b43a8(0x4cc)][_0x1b43a8(0x1ee)](this,_0x259e67),this[_0x1b43a8(0x407)](),this[_0x1b43a8(0x260)](),this[_0x1b43a8(0x428)](),this[_0x1b43a8(0x32a)](),this[_0x1b43a8(0x2f0)](),this[_0x1b43a8(0x3b1)](),this[_0x1b43a8(0x1f3)](),this[_0x1b43a8(0x3b2)](),this[_0x1b43a8(0x407)]();},VisuMZ[_0x3bfc03(0x12c)]['Game_Map_setupEvents']=Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x5be)],Game_Map['prototype'][_0x3bfc03(0x5be)]=function(){const _0x37321c=_0x3bfc03;VisuMZ[_0x37321c(0x12c)][_0x37321c(0x4d0)][_0x37321c(0x1ee)](this),this['refreshIfNeeded']();},Game_Map[_0x3bfc03(0x61b)]=0xc8,Game_Map['prototype'][_0x3bfc03(0x5af)]=function(){const _0x90bae=_0x3bfc03,_0x1e6863=Game_Map[_0x90bae(0x61b)];this['_eventOverload']=this[_0x90bae(0x501)]()[_0x90bae(0x553)]>_0x1e6863;if(this[_0x90bae(0x359)]&&$gameTemp[_0x90bae(0x340)]()){}},Game_Map[_0x3bfc03(0x1fe)]['isEventOverloaded']=function(){const _0x4f3c1c=_0x3bfc03;return this[_0x4f3c1c(0x359)];},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x407)]=function(){this['_eventCache']=undefined;},Game_Map['prototype'][_0x3bfc03(0x260)]=function(){const _0x36b9d1=_0x3bfc03;this[_0x36b9d1(0x1de)]=VisuMZ[_0x36b9d1(0x12c)][_0x36b9d1(0x653)][_0x36b9d1(0x5cb)][_0x36b9d1(0x285)];const _0x87a44e=$dataMap['note']||'';if(_0x87a44e[_0x36b9d1(0x223)](/<DIAGONAL MOVEMENT: ON>/i))_0x36b9d1(0x3c1)===_0x36b9d1(0x3c1)?this[_0x36b9d1(0x1de)]=!![]:_0x4743b8[_0x36b9d1(0x12c)][_0x36b9d1(0x455)][_0x36b9d1(0x1ee)](this,_0x2134a6,_0x15c375);else _0x87a44e[_0x36b9d1(0x223)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);},Game_Map[_0x3bfc03(0x4e6)]=VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x653)]['Movement'][_0x3bfc03(0x5d4)]??![],Game_Map[_0x3bfc03(0x1fe)]['isSupportDiagonalMovement']=function(){const _0x1e7bd6=_0x3bfc03;if(Utils[_0x1e7bd6(0x483)]()){if(_0x1e7bd6(0x3bf)===_0x1e7bd6(0x370))return 0x4;else{if(!Game_Map[_0x1e7bd6(0x4e6)])return![];}}const _0x148353=$gameSystem[_0x1e7bd6(0x20e)]();if(_0x148353===_0x1e7bd6(0x241))return!![];if(_0x148353===_0x1e7bd6(0x1cd))return![];if(this[_0x1e7bd6(0x1de)]===undefined)this[_0x1e7bd6(0x260)]();return this[_0x1e7bd6(0x1de)];},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x3a3)]=function(_0x12a133,_0x4347be){const _0x142c23=_0x3bfc03;if([0x1,0x4,0x7][_0x142c23(0x25e)](_0x4347be))_0x12a133-=0x1;if([0x3,0x6,0x9]['includes'](_0x4347be))_0x12a133+=0x1;return this['roundX'](_0x12a133);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x18c)]=function(_0x51303a,_0x36f4d2){const _0x43ef8e=_0x3bfc03;if([0x1,0x2,0x3][_0x43ef8e(0x25e)](_0x36f4d2))_0x51303a+=0x1;if([0x7,0x8,0x9][_0x43ef8e(0x25e)](_0x36f4d2))_0x51303a-=0x1;return this['roundY'](_0x51303a);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x1c5)]=function(_0x14fac5,_0x341e77,_0x2d113e,_0x54acf5){const _0x18bd62=_0x3bfc03;return Math[_0x18bd62(0x159)](Math[_0x18bd62(0x59d)](this['deltaX'](_0x14fac5,_0x2d113e)),Math[_0x18bd62(0x59d)](this[_0x18bd62(0x4ce)](_0x341e77,_0x54acf5)));},Game_Map[_0x3bfc03(0x1fe)]['setupRegionRestrictions']=function(){const _0x52d85a=_0x3bfc03,_0x6cf467=VisuMZ[_0x52d85a(0x12c)]['Settings'][_0x52d85a(0x573)],_0x4228f9={},_0x18bd1f=[_0x52d85a(0x20a),_0x52d85a(0x440),'Dock'],_0x325a83=[_0x52d85a(0x50f),'Walk','Player',_0x52d85a(0x503),_0x52d85a(0x4a3),_0x52d85a(0x4c0),'Ship',_0x52d85a(0x5d2)];for(const _0x5c5304 of _0x18bd1f){for(const _0x19d445 of _0x325a83){if('vkdzh'!=='vkdzh')return this[_0x52d85a(0x443)]()&&this['vehicle']()?this[_0x52d85a(0x1fa)]()[_0x52d85a(0x5b6)](_0x3568d5,_0x4b5389,_0x5406f9):!![];else{const _0x161869=_0x52d85a(0x2de)[_0x52d85a(0x26c)](_0x19d445,_0x5c5304);_0x6cf467[_0x161869]&&(_0x4228f9[_0x161869]=_0x6cf467[_0x161869][_0x52d85a(0x4eb)](0x0));}}}const _0x5d4a73=$dataMap[_0x52d85a(0x565)]||'',_0x2dba38=_0x5d4a73[_0x52d85a(0x223)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x2dba38)for(const _0x1fd356 of _0x2dba38){_0x1fd356[_0x52d85a(0x223)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x53e4f2=String(RegExp['$1'])['toLowerCase']()[_0x52d85a(0x4d7)](),_0x1a8d51=String(RegExp['$2'])[_0x52d85a(0x194)]()[_0x52d85a(0x4d7)]();const _0x372906=JSON[_0x52d85a(0x63e)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x53e4f2=_0x53e4f2[_0x52d85a(0x1a7)](0x0)['toUpperCase']()+_0x53e4f2[_0x52d85a(0x4eb)](0x1),_0x1a8d51=_0x1a8d51[_0x52d85a(0x1a7)](0x0)['toUpperCase']()+_0x1a8d51['slice'](0x1);const _0x5f3955='%1%2'[_0x52d85a(0x26c)](_0x53e4f2,_0x1a8d51);if(_0x4228f9[_0x5f3955])_0x4228f9[_0x5f3955]=_0x4228f9[_0x5f3955][_0x52d85a(0x3cc)](_0x372906);}this[_0x52d85a(0x635)]=_0x4228f9;},Game_Map[_0x3bfc03(0x1fe)]['isRegionAllowPass']=function(_0x342fb9,_0x439742,_0x1b0627,_0x432faa){const _0x4e6191=_0x3bfc03,_0x44acbe=this[_0x4e6191(0x3a3)](_0x342fb9,_0x1b0627),_0x9b8e97=this[_0x4e6191(0x18c)](_0x439742,_0x1b0627),_0x4eb568=this[_0x4e6191(0x149)](_0x44acbe,_0x9b8e97),_0x48a91f=this[_0x4e6191(0x635)];if(_0x48a91f[_0x4e6191(0x2ef)]['includes'](_0x4eb568))return!![];else{if(_0x432faa==='player'){if(_0x4e6191(0x545)===_0x4e6191(0x545))return _0x48a91f['PlayerAllow'][_0x4e6191(0x25e)](_0x4eb568)||_0x48a91f['WalkAllow'][_0x4e6191(0x25e)](_0x4eb568);else{const _0x222541=_0x33ae52[_0x4e6191(0x2a7)][_0x4e6191(0x18e)];if(_0x222541){const _0x8d2a27=_0x222541[_0x4e6191(0x214)](this);_0x8d2a27&&_0x8d2a27[_0x4e6191(0x2e7)]&&_0x8d2a27[_0x4e6191(0x2e7)][_0x4e6191(0x16f)]!==this[_0x4e6191(0x26b)]()&&(_0x8d2a27['_shadowSprite'][_0x4e6191(0x16f)]=this[_0x4e6191(0x26b)](),_0x8d2a27[_0x4e6191(0x2e7)][_0x4e6191(0x4c2)]=_0x2bbc61[_0x4e6191(0x4df)](_0x8d2a27[_0x4e6191(0x2e7)][_0x4e6191(0x16f)]));}}}else{if(_0x432faa===_0x4e6191(0x31c))return _0x48a91f['EventAllow'][_0x4e6191(0x25e)](_0x4eb568)||_0x48a91f[_0x4e6191(0x5d0)][_0x4e6191(0x25e)](_0x4eb568);else{if(_0x48a91f[_0x4e6191(0x2f1)][_0x4e6191(0x25e)](_0x4eb568))return!![];else{if(_0x4e6191(0x4e7)!==_0x4e6191(0x4e7))this[_0x4e6191(0x129)]=0x0,this[_0x4e6191(0x22d)]=![];else{const _0x366a7f=_0x4e6191(0x5d7)[_0x4e6191(0x26c)](_0x432faa['charAt'](0x0)[_0x4e6191(0x123)]()+_0x432faa['slice'](0x1));if(_0x48a91f[_0x366a7f])return _0x48a91f[_0x366a7f][_0x4e6191(0x25e)](_0x4eb568);}}}}}return![];},Game_Map['prototype'][_0x3bfc03(0x44e)]=function(_0x34ed07,_0x10c06e,_0x42439c,_0x178323){const _0x356fd3=_0x3bfc03,_0x1cccb0=this[_0x356fd3(0x3a3)](_0x34ed07,_0x42439c),_0x2b9af0=this['roundYWithDirection'](_0x10c06e,_0x42439c),_0x13000d=this[_0x356fd3(0x149)](_0x1cccb0,_0x2b9af0),_0x12fc8a=this[_0x356fd3(0x635)];if(_0x12fc8a[_0x356fd3(0x225)][_0x356fd3(0x25e)](_0x13000d))return!![];else{if(_0x178323==='player'){if(_0x356fd3(0x132)!==_0x356fd3(0x132)){if(_0xfeb469[_0x356fd3(0x2a7)]['constructor']===_0x37c44e)return![];return _0xd30817['AdvancedSwitches'][_0x356fd3(0x25e)](_0x837735);}else return _0x12fc8a[_0x356fd3(0x444)]['includes'](_0x13000d)||_0x12fc8a[_0x356fd3(0x580)][_0x356fd3(0x25e)](_0x13000d);}else{if(_0x178323===_0x356fd3(0x31c))return _0x12fc8a[_0x356fd3(0x569)][_0x356fd3(0x25e)](_0x13000d)||_0x12fc8a['WalkForbid'][_0x356fd3(0x25e)](_0x13000d);else{if(_0x12fc8a['VehicleForbid'][_0x356fd3(0x25e)](_0x13000d))return!![];else{const _0x20ec9d=_0x356fd3(0x243)[_0x356fd3(0x26c)](_0x178323['charAt'](0x0)[_0x356fd3(0x123)]()+_0x178323[_0x356fd3(0x4eb)](0x1));if(_0x12fc8a[_0x20ec9d])return _0x12fc8a[_0x20ec9d][_0x356fd3(0x25e)](_0x13000d);}}}}return![];},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x633)]=function(_0x492c19,_0x4cdee4,_0x44ed78,_0x2124dd){const _0x2e6df8=_0x3bfc03;_0x44ed78=_0x2124dd==='airship'?0x5:_0x44ed78;const _0xc6e375=this[_0x2e6df8(0x3a3)](_0x492c19,_0x44ed78),_0x24ec55=this['roundYWithDirection'](_0x4cdee4,_0x44ed78),_0x4e34e2=this[_0x2e6df8(0x149)](_0xc6e375,_0x24ec55),_0x498644=this[_0x2e6df8(0x635)];if(_0x498644[_0x2e6df8(0x267)][_0x2e6df8(0x25e)](_0x4e34e2))return!![];else{if(_0x2e6df8(0x327)===_0x2e6df8(0x36e)){const _0x5a944a=_0x2b2780[_0x2e6df8(0x31c)](_0x2b6ff7(_0x55efe9['$1'])),_0x337d03=this[_0x2e6df8(0x2d0)](_0x20e395);return this[_0x2e6df8(0x5dd)](_0x5a944a,_0x337d03);}else{const _0x3b17e4=_0x2e6df8(0x1f9)[_0x2e6df8(0x26c)](_0x2124dd['charAt'](0x0)['toUpperCase']()+_0x2124dd[_0x2e6df8(0x4eb)](0x1));if(_0x498644[_0x3b17e4])return _0x498644[_0x3b17e4][_0x2e6df8(0x25e)](_0x4e34e2);}}return![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x139)]=Game_Map[_0x3bfc03(0x1fe)]['refresh'],Game_Map['prototype']['refresh']=function(){const _0x51e6cf=_0x3bfc03;VisuMZ[_0x51e6cf(0x12c)][_0x51e6cf(0x139)][_0x51e6cf(0x1ee)](this),this[_0x51e6cf(0x284)]();},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x284)]=function(){const _0x33a251=_0x3bfc03;this['_needsPeriodicRefresh']=![];if(this[_0x33a251(0x501)]()[_0x33a251(0x329)](_0x2c9af6=>_0x2c9af6[_0x33a251(0x4e0)]())){if(_0x33a251(0x527)!==_0x33a251(0x527)){const _0x5df098=_0x359ded[_0x33a251(0x31c)](_0x14be59(_0x5597c2['$1']));return this[_0x33a251(0x49d)](_0x5df098);}else{this[_0x33a251(0x396)]=!![];return;}}if(this['events']()[_0x33a251(0x329)](_0x5d86d0=>_0x5d86d0[_0x33a251(0x2c9)]())){this[_0x33a251(0x396)]=!![];return;}if(this[_0x33a251(0x56a)][_0x33a251(0x329)](_0x3639fb=>_0x3639fb['hasAdvancedSwitchVariable']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x33a251(0x56a)]['some'](_0xb556ad=>_0xb556ad[_0x33a251(0x2c9)]())){this['_needsPeriodicRefresh']=!![];return;}},VisuMZ['EventsMoveCore']['Game_Map_update']=Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x629)],Game_Map[_0x3bfc03(0x1fe)]['update']=function(_0x4ff7da){const _0xf605f7=_0x3bfc03;this[_0xf605f7(0x4fd)](),VisuMZ[_0xf605f7(0x12c)][_0xf605f7(0x5f4)][_0xf605f7(0x1ee)](this,_0x4ff7da);},Game_Map['prototype'][_0x3bfc03(0x4fd)]=function(){const _0x173c72=_0x3bfc03;if(!this['_needsPeriodicRefresh'])return;this[_0x173c72(0x492)]=this[_0x173c72(0x492)]||0x3c,this[_0x173c72(0x492)]--;if(this[_0x173c72(0x492)]<=0x0){if(_0x173c72(0x35e)==='eMrWi')this[_0x173c72(0x61a)](),this['_periodicRefreshTimer']=0x3c;else{if(this[_0x173c72(0x358)](_0x4d1ef2,_0x4ed725))return![];if(!this[_0x173c72(0x622)](_0x38b8aa,_0x3497d8,_0x12becb))return![];}}},VisuMZ[_0x3bfc03(0x12c)]['Game_Map_isDashDisabled']=Game_Map['prototype'][_0x3bfc03(0x2f4)],Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x2f4)]=function(){const _0x16202f=_0x3bfc03;if(!$gameSystem[_0x16202f(0x348)]())return!![];return VisuMZ[_0x16202f(0x12c)][_0x16202f(0x25f)][_0x16202f(0x1ee)](this);},Game_Map['prototype']['setupSaveEventLocations']=function(){const _0x1cac8f=_0x3bfc03;this['_saveEventLocations']=![];const _0x11b8fc=$dataMap[_0x1cac8f(0x565)]||'';_0x11b8fc[_0x1cac8f(0x223)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1cac8f(0x472)]=!![]);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x533)]=function(){const _0x3fe935=_0x3bfc03;if(this[_0x3fe935(0x472)]===undefined)this[_0x3fe935(0x32a)]();return this[_0x3fe935(0x472)];},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x4ac)]=function(_0x5de6bc){const _0x4f5d02=_0x3bfc03;_0x5de6bc!==this['mapId']()&&$gamePlayer&&(_0x4f5d02(0x11d)!==_0x4f5d02(0x5ff)?$gameSystem[_0x4f5d02(0x4ac)](this[_0x4f5d02(0x48e)]()):this[_0x4f5d02(0x126)]());},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x2f0)]=function(){const _0x13018b=_0x3bfc03;this['_spawnedEvents']=$gameSystem[_0x13018b(0x39d)](this[_0x13018b(0x48e)]()),this[_0x13018b(0x2a0)]=!![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x582)]=Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x501)],Game_Map[_0x3bfc03(0x1fe)]['events']=function(){const _0xe59210=_0x3bfc03;if(this['_eventCache'])return this['_eventCache'];const _0x1fceed=VisuMZ[_0xe59210(0x12c)][_0xe59210(0x582)][_0xe59210(0x1ee)](this),_0x37bfda=_0x1fceed['concat'](this['_spawnedEvents']||[]);return this[_0xe59210(0x4b4)]=_0x37bfda[_0xe59210(0x669)](_0x41d0d8=>!!_0x41d0d8),this[_0xe59210(0x4b4)];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4f3)]=Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x31c)],Game_Map['prototype']['event']=function(_0x5c8cc3){const _0x5420bd=_0x3bfc03;if(_0x5c8cc3>=0x3e8){if(_0x5420bd(0x315)===_0x5420bd(0x63a))this[_0x5420bd(0x4b4)]=_0x30e01f;else return _0x5c8cc3-=0x3e8,this[_0x5420bd(0x28f)][_0x5c8cc3];}else return VisuMZ[_0x5420bd(0x12c)][_0x5420bd(0x4f3)][_0x5420bd(0x1ee)](this,_0x5c8cc3);},Game_Map[_0x3bfc03(0x1fe)]['eraseEvent']=function(_0x1261f7){const _0x291150=_0x3bfc03,_0x32f3ae=this['event'](_0x1261f7);if(_0x32f3ae)_0x32f3ae[_0x291150(0x3dc)]();},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x4c9)]=function(){const _0x52471b=_0x3bfc03,_0x4169b7={'template':_0x52471b(0x3b8),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x52471b(0x553)]+0x3e8};this[_0x52471b(0x554)](_0x4169b7);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x358)]=function(_0x1bb7c5,_0x7ef823){const _0x177cbc=_0x3bfc03;if(this[_0x177cbc(0x156)](_0x1bb7c5,_0x7ef823)[_0x177cbc(0x553)]>0x0)return!![];if($gamePlayer['x']===_0x1bb7c5&&$gamePlayer['y']===_0x7ef823)return!![];if(this[_0x177cbc(0x42f)]()[_0x177cbc(0x3d8)](_0x1bb7c5,_0x7ef823))return!![];if(this[_0x177cbc(0x19e)]()[_0x177cbc(0x3d8)](_0x1bb7c5,_0x7ef823))return!![];return![];},Game_Map['prototype']['isSpawnHitboxCollisionOk']=function(_0x1eb5e4,_0x176eac,_0x49a08c){const _0x192cb2=_0x3bfc03;$gameTemp[_0x192cb2(0x33f)]=_0x1eb5e4;const _0x2d94c6=new Game_Event(_0x1eb5e4[_0x192cb2(0x48e)],_0x1eb5e4[_0x192cb2(0x395)]);$gameTemp[_0x192cb2(0x33f)]=undefined,_0x2d94c6[_0x192cb2(0x18d)]();let _0x33472a=_0x176eac-_0x2d94c6[_0x192cb2(0x4aa)][_0x192cb2(0x3e1)],_0x583976=_0x176eac+_0x2d94c6[_0x192cb2(0x4aa)]['right'],_0x48ee0c=_0x49a08c-_0x2d94c6[_0x192cb2(0x4aa)]['up'],_0x2fc141=_0x49a08c+_0x2d94c6[_0x192cb2(0x4aa)]['down'];for(let _0x4ba6c2=_0x33472a;_0x4ba6c2<=_0x583976;_0x4ba6c2++){for(let _0x9d4c=_0x48ee0c;_0x9d4c<=_0x2fc141;_0x9d4c++){if(this[_0x192cb2(0x358)](_0x4ba6c2,_0x9d4c))return![];}}return!![];},Game_Map['prototype'][_0x3bfc03(0x554)]=function(_0x2d0aa1){const _0x200255=_0x3bfc03;$gameTemp[_0x200255(0x33f)]=_0x2d0aa1;const _0xaa0a34=new Game_Event(_0x2d0aa1[_0x200255(0x48e)],_0x2d0aa1[_0x200255(0x395)]);$gameTemp[_0x200255(0x33f)]=undefined,this[_0x200255(0x28f)][_0x200255(0x609)](_0xaa0a34),_0xaa0a34[_0x200255(0x2b4)](_0x2d0aa1),this['clearEventCache']();},Game_Map[_0x3bfc03(0x1fe)]['prepareSpawnedEventAtXY']=function(_0xef237c,_0x200e41,_0x10733b){const _0x32a938=_0x3bfc03,_0xae1c18=_0xef237c['template'][_0x32a938(0x123)]()[_0x32a938(0x4d7)]();if(_0xae1c18!=='UNTITLED'){if('gUcSN'!==_0x32a938(0x2be))return this[_0x32a938(0x36a)](0x7);else{const _0x5b5ceb=VisuMZ[_0x32a938(0x4ca)][_0xae1c18];if(_0x5b5ceb){if(_0x32a938(0x3e3)===_0x32a938(0x3e3))_0xef237c[_0x32a938(0x48e)]=_0x5b5ceb[_0x32a938(0x27b)],_0xef237c[_0x32a938(0x395)]=_0x5b5ceb[_0x32a938(0x488)];else{const _0x409aae=_0x4084f5(_0x4a0e9f['$1'])*0.01;this[_0x32a938(0x179)]=_0x409aae,this[_0x32a938(0x174)]=_0x409aae;}}}}const _0x1d6e44=_0xef237c['x'],_0x19a945=_0xef237c['y'];if(!this[_0x32a938(0x40e)](_0x1d6e44,_0x19a945))return![];if(_0x200e41){if(_0x32a938(0x55c)===_0x32a938(0x55c)){if(this[_0x32a938(0x358)](_0x1d6e44,_0x19a945))return![];if(!this['isSpawnHitboxCollisionOk'](_0xef237c,_0x1d6e44,_0x19a945))return![];}else return this[_0x32a938(0x338)];}if(_0x10733b){if(_0x32a938(0x3a1)===_0x32a938(0x3a1)){if(!this['isPassableByAnyDirection'](_0x1d6e44,_0x19a945))return![];}else this[_0x32a938(0x628)]=!![];}return this[_0x32a938(0x554)](_0xef237c),!![];},Game_Map['prototype'][_0x3bfc03(0x304)]=function(_0x19e47e,_0x192c72,_0x54690d,_0x484746){const _0x1c99fd=_0x3bfc03,_0x304271=_0x19e47e[_0x1c99fd(0x19d)][_0x1c99fd(0x123)]()[_0x1c99fd(0x4d7)]();if(_0x304271!==_0x1c99fd(0x291)){if(_0x1c99fd(0x429)!==_0x1c99fd(0x502)){const _0x4099fe=VisuMZ[_0x1c99fd(0x4ca)][_0x304271];_0x4099fe&&(_0x19e47e['mapId']=_0x4099fe['MapID'],_0x19e47e[_0x1c99fd(0x395)]=_0x4099fe['EventID']);}else{if(this[_0x1c99fd(0x4b4)])return this['_eventCache'];const _0x277032=_0x18f47a[_0x1c99fd(0x12c)][_0x1c99fd(0x582)]['call'](this),_0x3f0152=_0x277032[_0x1c99fd(0x3cc)](this[_0x1c99fd(0x28f)]||[]);return this[_0x1c99fd(0x4b4)]=_0x3f0152[_0x1c99fd(0x669)](_0x1f2807=>!!_0x1f2807),this[_0x1c99fd(0x4b4)];}}const _0xb260e5=[],_0x3a9375=this['width'](),_0x32bd8b=this[_0x1c99fd(0x177)]();for(let _0x38db04=0x0;_0x38db04<_0x3a9375;_0x38db04++){if(_0x1c99fd(0x266)===_0x1c99fd(0x4a1)){const _0x1cdca2=_0x1f57c7['event'](_0x51b32f[_0x1c99fd(0x56f)]||_0x355143['eventId']());_0x1cdca2['removeMorph']();}else for(let _0x238270=0x0;_0x238270<_0x32bd8b;_0x238270++){if('LHCdV'===_0x1c99fd(0x659))this[_0x1c99fd(0x55e)](...arguments);else{if(!_0x192c72['includes'](this[_0x1c99fd(0x149)](_0x38db04,_0x238270)))continue;if(!this[_0x1c99fd(0x40e)](_0x38db04,_0x238270))continue;if(_0x54690d){if(_0x1c99fd(0x662)===_0x1c99fd(0x662)){if(this['checkExistingEntitiesAt'](_0x38db04,_0x238270))continue;if(!this[_0x1c99fd(0x622)](_0x19e47e,_0x38db04,_0x238270))continue;}else return this[_0x1c99fd(0x137)]();}if(_0x484746){if(!this[_0x1c99fd(0x4b0)](_0x38db04,_0x238270))continue;}_0xb260e5[_0x1c99fd(0x609)]([_0x38db04,_0x238270]);}}}if(_0xb260e5[_0x1c99fd(0x553)]>0x0){if(_0x1c99fd(0x339)!==_0x1c99fd(0x581)){const _0xc0e37f=_0xb260e5[Math['randomInt'](_0xb260e5[_0x1c99fd(0x553)])];return _0x19e47e['x']=_0xc0e37f[0x0],_0x19e47e['y']=_0xc0e37f[0x1],this[_0x1c99fd(0x554)](_0x19e47e),!![];}else this['_shadowSprite']['z']=this['z']-0x1;}return![];},Game_Map['prototype']['prepareSpawnedEventAtTerrainTag']=function(_0x1172f2,_0x5ce475,_0x1d4e99,_0x4b034f){const _0x4892c6=_0x3bfc03,_0x3ba340=_0x1172f2['template'][_0x4892c6(0x123)]()['trim']();if(_0x3ba340!==_0x4892c6(0x291)){const _0x5e7db6=VisuMZ[_0x4892c6(0x4ca)][_0x3ba340];_0x5e7db6&&(_0x4892c6(0x524)===_0x4892c6(0x524)?(_0x1172f2[_0x4892c6(0x48e)]=_0x5e7db6['MapID'],_0x1172f2['eventId']=_0x5e7db6[_0x4892c6(0x488)]):this[_0x4892c6(0x174)]=_0x2d9bfd(_0x291b34['$1'])*0.01);}const _0x4073fc=[],_0x59f4e6=this[_0x4892c6(0x5f5)](),_0x1e28c7=this[_0x4892c6(0x177)]();for(let _0x70426c=0x0;_0x70426c<_0x59f4e6;_0x70426c++){for(let _0x36d085=0x0;_0x36d085<_0x1e28c7;_0x36d085++){if(!_0x5ce475['includes'](this[_0x4892c6(0x386)](_0x70426c,_0x36d085)))continue;if(!this[_0x4892c6(0x40e)](_0x70426c,_0x36d085))continue;if(_0x1d4e99){if(_0x4892c6(0x4a0)==='sZKVl'){if(this[_0x4892c6(0x358)](_0x70426c,_0x36d085))continue;if(!this[_0x4892c6(0x622)](_0x1172f2,_0x70426c,_0x36d085))continue;}else{if(this[_0x4892c6(0x44c)]())this[_0x4892c6(0x3bc)]+=this[_0x4892c6(0x4f8)]();else _0x2ea0d1[_0x4892c6(0x2a7)][_0x4892c6(0x333)]>0x0?this[_0x4892c6(0x3bc)]=0x0:this['contentsOpacity']-=this[_0x4892c6(0x4f8)]();}}if(_0x4b034f){if(_0x4892c6(0x5c1)===_0x4892c6(0x5c1)){if(!this['isPassableByAnyDirection'](_0x70426c,_0x36d085))continue;}else{var _0x5f2375=this['x']-this[_0x4892c6(0x4aa)][_0x4892c6(0x3e1)],_0x58129b=this['x']+this[_0x4892c6(0x4aa)]['right'],_0x1696d8=this['y']-this[_0x4892c6(0x4aa)]['up'],_0x3b82a4=this['y']+this[_0x4892c6(0x4aa)][_0x4892c6(0x641)];return _0x5f2375<=_0x237d65&&_0x320d3<=_0x58129b&&_0x1696d8<=_0x356b8d&&_0x47f595<=_0x3b82a4;}}_0x4073fc['push']([_0x70426c,_0x36d085]);}}if(_0x4073fc['length']>0x0){const _0x420106=_0x4073fc[Math[_0x4892c6(0x240)](_0x4073fc[_0x4892c6(0x553)])];return _0x1172f2['x']=_0x420106[0x0],_0x1172f2['y']=_0x420106[0x1],this[_0x4892c6(0x554)](_0x1172f2),!![];}return![];},Game_Map['prototype']['isPassableByAnyDirection']=function(_0x59d699,_0x4bc3d7){const _0x52567a=_0x3bfc03;if(this[_0x52567a(0x38f)](_0x59d699,_0x4bc3d7,0x2))return!![];if(this[_0x52567a(0x38f)](_0x59d699,_0x4bc3d7,0x4))return!![];if(this[_0x52567a(0x38f)](_0x59d699,_0x4bc3d7,0x6))return!![];if(this[_0x52567a(0x38f)](_0x59d699,_0x4bc3d7,0x8))return!![];return![];},Game_Map['prototype'][_0x3bfc03(0x425)]=function(_0x248f19){const _0x32a7a4=_0x3bfc03;if(_0x248f19<0x3e8)return;if(!this[_0x32a7a4(0x28f)])return;const _0x195b23=this[_0x32a7a4(0x31c)](_0x248f19);_0x195b23[_0x32a7a4(0x575)](-0x1,-0x1),_0x195b23['erase'](),this[_0x32a7a4(0x28f)][_0x248f19-0x3e8]=null,this[_0x32a7a4(0x407)]();},Game_Map['prototype']['firstSpawnedEvent']=function(){const _0x5a8be0=_0x3bfc03;for(const _0x4aa806 of this['_spawnedEvents']){if(_0x5a8be0(0x163)==='nBdTg')this[_0x5a8be0(0x5a4)]();else{if(_0x4aa806)return _0x4aa806;}}return null;},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x1a5)]=function(){const _0x37a21a=_0x3bfc03,_0x22bd82=this[_0x37a21a(0x1be)]();return _0x22bd82?_0x22bd82[_0x37a21a(0x5dc)]:0x0;},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x281)]=function(){const _0x542cd8=_0x3bfc03,_0x2308a1=this[_0x542cd8(0x28f)][_0x542cd8(0x4eb)](0x0)['reverse']();for(const _0x169c41 of _0x2308a1){if(_0x169c41)return _0x169c41;}return null;},Game_Map[_0x3bfc03(0x1fe)]['lastSpawnedEventID']=function(){const _0x5ba4fa=_0x3bfc03,_0x46ed5c=this[_0x5ba4fa(0x281)]();return _0x46ed5c?_0x46ed5c['_eventId']:0x0;},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x451)]=function(_0x259308,_0xb762d5){const _0x535117=_0x3bfc03,_0x4a8cfa=this[_0x535117(0x156)](_0x259308,_0xb762d5);for(const _0x281d40 of _0x4a8cfa){if(!_0x281d40)continue;if(_0x281d40[_0x535117(0x601)]())this[_0x535117(0x425)](_0x281d40[_0x535117(0x5dc)]);}},Game_Map[_0x3bfc03(0x1fe)]['despawnRegions']=function(_0x5a5874){const _0x4b01e5=_0x3bfc03;for(const _0x5eae9c of this[_0x4b01e5(0x28f)]){if(_0x4b01e5(0x3cd)!==_0x4b01e5(0x486)){if(!_0x5eae9c)continue;_0x5a5874['includes'](_0x5eae9c[_0x4b01e5(0x149)]())&&this['despawnEventId'](_0x5eae9c[_0x4b01e5(0x5dc)]);}else{if(this[_0x4b01e5(0x4de)]<=0x0)return;this['_paused']=!![],this[_0x4b01e5(0x4b1)]=!![];}}},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x522)]=function(_0x1e1834){const _0x194c14=_0x3bfc03;for(const _0x562efd of this[_0x194c14(0x28f)]){if(!_0x562efd)continue;_0x1e1834[_0x194c14(0x25e)](_0x562efd[_0x194c14(0x386)]())&&this[_0x194c14(0x425)](_0x562efd[_0x194c14(0x5dc)]);}},Game_Map['prototype'][_0x3bfc03(0x62f)]=function(){const _0x12f207=_0x3bfc03;for(const _0x503700 of this[_0x12f207(0x28f)]){if(_0x12f207(0x17b)===_0x12f207(0x2c5)){const _0x3c747e=_0x28dc90(_0x3e9a6b['$1'])[_0x12f207(0x123)]()[_0x12f207(0x4d7)](),_0x41ac4d=[_0x12f207(0x1b6),_0x12f207(0x2dc),_0x12f207(0x54f),_0x12f207(0x552)];this[_0x12f207(0x2bb)][_0x12f207(0x535)]=_0x41ac4d['indexOf'](_0x3c747e)[_0x12f207(0x3cb)](0x0,0x3);}else{if(!_0x503700)continue;this[_0x12f207(0x425)](_0x503700[_0x12f207(0x5dc)]);}}},VisuMZ['EventsMoveCore'][_0x3bfc03(0x654)]=Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x296)],Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x296)]=function(_0x26f521){const _0x496995=_0x3bfc03;VisuMZ[_0x496995(0x12c)][_0x496995(0x654)]['call'](this,_0x26f521);if(_0x26f521>=0x3e8){if(_0x496995(0x363)!==_0x496995(0x363)){if(!this[_0x496995(0x396)])return;this['_periodicRefreshTimer']=this['_periodicRefreshTimer']||0x3c,this[_0x496995(0x492)]--,this[_0x496995(0x492)]<=0x0&&(this[_0x496995(0x61a)](),this[_0x496995(0x492)]=0x3c);}else{const _0x5f5c86=this['event'](_0x26f521);if(_0x5f5c86)_0x5f5c86[_0x496995(0x66a)]();}}},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x3b1)]=function(){const _0x5b8a07=_0x3bfc03;this[_0x5b8a07(0x4ff)]=![],this[_0x5b8a07(0x599)]=![];if(!$dataMap)return;const _0x5e4419=$dataMap[_0x5b8a07(0x565)]||'';if(_0x5e4419[_0x5b8a07(0x223)](/<HIDE PLAYER>/i)){if(_0x5b8a07(0x65a)===_0x5b8a07(0x65a))this[_0x5b8a07(0x4ff)]=![],this[_0x5b8a07(0x599)]=!![];else return this[_0x5b8a07(0x5a3)]===_0x59c446&&this[_0x5b8a07(0x1f3)](),this[_0x5b8a07(0x5a3)];}else _0x5e4419[_0x5b8a07(0x223)](/<SHOW PLAYER>/i)&&(this[_0x5b8a07(0x4ff)]=!![],this[_0x5b8a07(0x599)]=![]);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x3e4)]=function(){const _0x366184=_0x3bfc03;if(this['_forceShowPlayer']===undefined){if('XAhqS'!==_0x366184(0x579))return this[_0x366184(0x313)];else this[_0x366184(0x3b1)]();}return this[_0x366184(0x4ff)];},Game_Map['prototype'][_0x3bfc03(0x566)]=function(){const _0x539728=_0x3bfc03;if(this[_0x539728(0x599)]===undefined){if('MBpAK'!==_0x539728(0x275))this['setupPlayerVisibilityOverrides']();else{const _0x5804bb=this[_0x539728(0x148)];_0x5804bb['x']=this[_0x539728(0x585)]['attachPictureOffsetX'](),_0x5804bb['y']=this[_0x539728(0x585)]['attachPictureOffsetY'](),_0x5804bb[_0x539728(0x535)]=this[_0x539728(0x585)][_0x539728(0x614)]();}}return this[_0x539728(0x599)];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x1b8)]=Game_CharacterBase[_0x3bfc03(0x1fe)]['isTransparent'],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x2d9)]=function(){const _0x2e7a42=_0x3bfc03;if(this===$gamePlayer){if($gameMap[_0x2e7a42(0x3e4)]())return![];if($gameMap['isPlayerForceHidden']())return!![];}return VisuMZ[_0x2e7a42(0x12c)][_0x2e7a42(0x1b8)][_0x2e7a42(0x1ee)](this);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x1f3)]=function(){const _0x227f95=_0x3bfc03;this[_0x227f95(0x25a)]=![],this[_0x227f95(0x5a3)]=![];if(!$dataMap)return;const _0x590b10=$dataMap[_0x227f95(0x565)]||'';if(_0x590b10[_0x227f95(0x223)](/<HIDE FOLLOWERS>/i))'ZEMlI'==='ZEMlI'?(this[_0x227f95(0x25a)]=![],this[_0x227f95(0x5a3)]=!![]):_0x204e10=_0xdb13c['replace'](_0x269213,(_0x36d83d,_0x6037ad)=>_0x36e6f9['value'](_0x2e0295(_0x6037ad)));else _0x590b10[_0x227f95(0x223)](/<SHOW FOLLOWERS>/i)&&(this[_0x227f95(0x25a)]=!![],this['_forceHideFollower']=![]);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x60d)]=function(){const _0x29a42f=_0x3bfc03;return this[_0x29a42f(0x25a)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x29a42f(0x25a)];},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x23c)]=function(){const _0x6d0db1=_0x3bfc03;return this[_0x6d0db1(0x5a3)]===undefined&&this[_0x6d0db1(0x1f3)](),this[_0x6d0db1(0x5a3)];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x3c5)]=Game_Followers[_0x3bfc03(0x1fe)][_0x3bfc03(0x32d)],Game_Followers[_0x3bfc03(0x1fe)][_0x3bfc03(0x32d)]=function(){const _0x2cc50f=_0x3bfc03;if($gameMap[_0x2cc50f(0x60d)]())return!![];if($gameMap[_0x2cc50f(0x23c)]())return![];return VisuMZ[_0x2cc50f(0x12c)][_0x2cc50f(0x3c5)][_0x2cc50f(0x1ee)](this);},Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x3b2)]=function(){const _0x4ba2dc=_0x3bfc03;if(!$dataMap)return;if(!$dataMap[_0x4ba2dc(0x565)])return;const _0x35a331=$dataMap[_0x4ba2dc(0x565)];if(_0x35a331['match'](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x3e8948=String(RegExp['$1'])[_0x4ba2dc(0x51c)](',')[_0x4ba2dc(0x2da)](_0x1f8977=>Number(_0x1f8977));for(const _0x2f1144 of _0x3e8948){if('UAKhU'!==_0x4ba2dc(0x34e)){const _0x38d024=_0x3dd6b8(_0x18301f['$1']),_0x1fc823=_0x56e19d(_0x14a9f2['$2']);return this['processMoveRouteStepTo'](_0x38d024,_0x1fc823);}else $gameTemp[_0x4ba2dc(0x514)](_0x2f1144);}}},Game_CommonEvent[_0x3bfc03(0x1fe)][_0x3bfc03(0x4e0)]=function(){const _0x4fab59=_0x3bfc03,_0x218128=this[_0x4fab59(0x31c)]();return this[_0x4fab59(0x3f6)]()&&_0x218128[_0x4fab59(0x233)]>=0x1&&DataManager[_0x4fab59(0x59b)](_0x218128[_0x4fab59(0x3d5)]);},Game_CommonEvent[_0x3bfc03(0x1fe)][_0x3bfc03(0x2c9)]=function(){const _0x3b6296=_0x3bfc03;return VisuMZ['EventsMoveCore'][_0x3b6296(0x5fe)]['_commonEvents'][_0x3b6296(0x25e)](this[_0x3b6296(0x5b7)]);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4f7)]=Game_CommonEvent[_0x3bfc03(0x1fe)][_0x3bfc03(0x3f6)],Game_CommonEvent['prototype'][_0x3bfc03(0x3f6)]=function(){const _0x2f7922=_0x3bfc03;if(VisuMZ[_0x2f7922(0x12c)][_0x2f7922(0x4f7)][_0x2f7922(0x1ee)](this))return!![];else{const _0x4d9814=this['event']();return VisuMZ[_0x2f7922(0x12c)][_0x2f7922(0x5fe)]['metCPC'](this['event']()['CPC'],this[_0x2f7922(0x5b7)],_0x4d9814);}},VisuMZ['EventsMoveCore'][_0x3bfc03(0x2ff)]=Game_Map['prototype']['parallelCommonEvents'],Game_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x22e)]=function(){const _0x2f65e3=_0x3bfc03,_0x2b3452=VisuMZ['EventsMoveCore'][_0x2f65e3(0x2ff)]['call'](this),_0x5877de=VisuMZ[_0x2f65e3(0x12c)][_0x2f65e3(0x5fe)][_0x2f65e3(0x56a)][_0x2f65e3(0x2da)](_0x1903cc=>$dataCommonEvents[_0x1903cc]);return _0x2b3452[_0x2f65e3(0x3cc)](_0x5877de)['filter']((_0x2d67a7,_0x890cd4,_0x32e5f4)=>_0x32e5f4['indexOf'](_0x2d67a7)===_0x890cd4);},Game_CharacterBase[_0x3bfc03(0x318)]=VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x653)][_0x3bfc03(0x5cb)][_0x3bfc03(0x4db)]??![],VisuMZ['EventsMoveCore'][_0x3bfc03(0x35d)]=Game_CharacterBase['prototype'][_0x3bfc03(0x3d0)],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d0)]=function(){const _0x133042=_0x3bfc03;VisuMZ[_0x133042(0x12c)][_0x133042(0x35d)][_0x133042(0x1ee)](this),this[_0x133042(0x1d8)]();},Game_CharacterBase[_0x3bfc03(0x1fe)]['initEventsMoveCoreSettings']=function(){const _0x2d8cb2=_0x3bfc03;this['_scaleBaseX']=0x1,this['_scaleBaseY']=0x1,this['_patternLocked']=![],this[_0x2d8cb2(0x1f4)](),this['clearDashing'](),this['clearSpriteOffsets'](),this[_0x2d8cb2(0x4ad)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x39a)]=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x242)],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x242)]=function(){const _0x2989f4=_0x3bfc03;let _0x907808=VisuMZ[_0x2989f4(0x12c)]['Game_CharacterBase_opacity'][_0x2989f4(0x1ee)](this);return _0x907808=this[_0x2989f4(0x4e8)](_0x907808),_0x907808;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x4e8)]=function(_0x50d2b3){return _0x50d2b3;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x23e)]=function(){const _0x49ec29=_0x3bfc03;if(this[_0x49ec29(0x484)]===Game_Player&&this[_0x49ec29(0x443)]())return this[_0x49ec29(0x1fa)]()[_0x49ec29(0x3a4)]()[_0x49ec29(0x223)](/\[VS8\]/i);else{if(Imported[_0x49ec29(0x5b4)]&&this[_0x49ec29(0x371)]())return _0x49ec29(0x559)===_0x49ec29(0x169)?0x2:!![];else{if('UeVGQ'!==_0x49ec29(0x54e))return this['characterName']()['match'](/\[VS8\]/i);else{if(_0x194531[0x2]['match'](/(?:SELF|MAP)/i))return this[_0x49ec29(0x445)](_0x1fac4b);else{return _0x1073f6['EventsMoveCore']['Game_SelfSwitches_value'][_0x49ec29(0x1ee)](this,_0x52507c);;}}}}},VisuMZ[_0x3bfc03(0x12c)]['Game_CharacterBase_direction']=Game_CharacterBase[_0x3bfc03(0x1fe)]['direction'],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x403)]=function(){const _0x59800d=_0x3bfc03;if(!$dataMap)return this[_0x59800d(0x517)]||0x2;if(this['isOnLadder']()&&!this[_0x59800d(0x413)]()&&this[_0x59800d(0x23e)]()){if(_0x59800d(0x534)!=='XfUpG')return this['directionOnLadderSpriteVS8dir']();else{const _0x48f340=new _0x1d6d2c(0x0,0x0,0x1,0x1);this['_proxyWindow']=new _0xb2eb6d(_0x48f340),this[_0x59800d(0x236)][_0x59800d(0x377)]=0x0,this[_0x59800d(0x242)]=this[_0x59800d(0x44c)]()?0xff:0x0;}}else{if(this['isOnLadder']()&&!this[_0x59800d(0x413)]())return 0x8;else{if(this['isPosing']()&&this['isSpriteVS8dir']()){if(_0x59800d(0x323)===_0x59800d(0x2c4))this['_event']=_0x5836e1,_0x5b1c6f[_0x59800d(0x1fe)][_0x59800d(0x55e)][_0x59800d(0x1ee)](this),this['initMembers'](),this[_0x59800d(0x646)]();else return this['getPosingCharacterDirection']();}else{if(_0x59800d(0x4e5)!==_0x59800d(0x3fa))return VisuMZ[_0x59800d(0x12c)][_0x59800d(0x558)][_0x59800d(0x1ee)](this);else _0x3cb39f[_0x59800d(0x12c)][_0x59800d(0x364)][_0x59800d(0x1ee)](this,_0x1d6f2d,_0x5e7c60),_0x1de46a[_0x59800d(0x12c)][_0x59800d(0x653)]['VS8'][_0x59800d(0x50b)]&&this['_target'][_0x59800d(0x585)]['setBalloonPose'](_0x165d0e,this['_duration']);}}}},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x65e)]=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x36a)],Game_CharacterBase['prototype']['setDirection']=function(_0xd4a714){const _0x33cfd8=_0x3bfc03;if(!this[_0x33cfd8(0x23e)]())_0xd4a714=this['correctFacingDirection'](_0xd4a714);VisuMZ[_0x33cfd8(0x12c)][_0x33cfd8(0x65e)][_0x33cfd8(0x1ee)](this,_0xd4a714),this[_0x33cfd8(0x227)]();},Game_CharacterBase[_0x3bfc03(0x1fe)]['correctFacingDirection']=function(_0xdcd2ae){const _0x172e5e=_0x3bfc03;if(_0xdcd2ae===0x1)return this[_0x172e5e(0x30e)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0xdcd2ae===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0xdcd2ae===0x7)return this[_0x172e5e(0x30e)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0xdcd2ae===0x9)return this[_0x172e5e(0x30e)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0xdcd2ae;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x550)]=function(_0x330033){const _0x174b53=_0x3bfc03;return[0x1,0x3,0x5,0x7,0x9][_0x174b53(0x25e)](_0x330033);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x620)]=function(){const _0x305a24=_0x3bfc03;return this[_0x305a24(0x3c9)]||0x0;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x58a)]=Game_CharacterBase['prototype'][_0x3bfc03(0x60a)],Game_CharacterBase[_0x3bfc03(0x1fe)]['moveStraight']=function(_0x1edf55){const _0x4da0b9=_0x3bfc03;this[_0x4da0b9(0x3c9)]=_0x1edf55,VisuMZ[_0x4da0b9(0x12c)][_0x4da0b9(0x58a)][_0x4da0b9(0x1ee)](this,_0x1edf55);},Game_CharacterBase['prototype'][_0x3bfc03(0x417)]=function(_0x1f8537){const _0x2f7a73=_0x3bfc03;if(!this[_0x2f7a73(0x550)](_0x1f8537))return this[_0x2f7a73(0x60a)](_0x1f8537);let _0x512873=0x0,_0x2c54ff=0x0;switch(_0x1f8537){case 0x1:_0x512873=0x4,_0x2c54ff=0x2;break;case 0x3:_0x512873=0x6,_0x2c54ff=0x2;break;case 0x7:_0x512873=0x4,_0x2c54ff=0x8;break;case 0x9:_0x512873=0x6,_0x2c54ff=0x8;break;}if(VisuMZ[_0x2f7a73(0x12c)]['Settings'][_0x2f7a73(0x5cb)][_0x2f7a73(0x21a)]){if(!this[_0x2f7a73(0x30e)](this['_x'],this['_y'],_0x512873))return _0x2f7a73(0x1c7)===_0x2f7a73(0x1c7)?this[_0x2f7a73(0x60a)](_0x2c54ff):this['vehicle']()['isMapPassable'](_0x3bb05e,_0x474d07,_0xa5c0e9);if(!this[_0x2f7a73(0x30e)](this['_x'],this['_y'],_0x2c54ff)){if(_0x2f7a73(0x604)!=='wtVKH')_0x5bf1b4(this[_0x2f7a73(0x188)]['bind'](this,_0x1206d7,_0x3204db),0x64);else return this['moveStraight'](_0x512873);}if(!this[_0x2f7a73(0x506)](this['_x'],this['_y'],_0x512873,_0x2c54ff)){if('Zkvtf'!==_0x2f7a73(0x3d2)){let _0x531cda=VisuMZ['EventsMoveCore']['Settings'][_0x2f7a73(0x5cb)][_0x2f7a73(0x234)]?_0x512873:_0x2c54ff;return this[_0x2f7a73(0x60a)](_0x531cda);}else return _0x54bd09[_0x2f7a73(0x12c)][_0x2f7a73(0x653)][_0x2f7a73(0x26f)][_0x2f7a73(0x3fd)];}}this['_lastMovedDirection']=_0x1f8537,this[_0x2f7a73(0x44a)](_0x512873,_0x2c54ff);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x29b)]=Game_CharacterBase[_0x3bfc03(0x1fe)]['realMoveSpeed'],Game_CharacterBase['prototype'][_0x3bfc03(0x5fd)]=function(){const _0x25a17e=_0x3bfc03;let _0x2a8a09=this[_0x25a17e(0x1db)];return this[_0x25a17e(0x5e0)]()&&(_0x2a8a09+=this['dashSpeedModifier']()),this['adjustDir8MovementSpeed'](_0x2a8a09);},Game_CharacterBase['prototype'][_0x3bfc03(0x393)]=function(){const _0x14c655=_0x3bfc03,_0x1b8a76=VisuMZ[_0x14c655(0x12c)]['Settings'][_0x14c655(0x5cb)];return _0x1b8a76['DashModifier']!==undefined?_0x1b8a76[_0x14c655(0x38d)]:VisuMZ['EventsMoveCore'][_0x14c655(0x29b)]['call'](this)-this['_moveSpeed'];},Game_CharacterBase[_0x3bfc03(0x1fe)]['adjustDir8MovementSpeed']=function(_0x32d4ba){const _0x1fb921=_0x3bfc03,_0x1c0366=VisuMZ['EventsMoveCore'][_0x1fb921(0x653)][_0x1fb921(0x5cb)];if(!_0x1c0366[_0x1fb921(0x302)])return _0x32d4ba;return[0x1,0x3,0x7,0x9][_0x1fb921(0x25e)](this[_0x1fb921(0x3c9)])&&(_0x32d4ba*=_0x1c0366['DiagonalSpeedMultiplier']||0.01),_0x32d4ba;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x2f9)]=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x5e0)],Game_CharacterBase[_0x3bfc03(0x1fe)]['isDashing']=function(){const _0x80388=_0x3bfc03;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this[_0x80388(0x480)]())return![];if(this[_0x80388(0x30c)])return!![];return VisuMZ[_0x80388(0x12c)][_0x80388(0x2f9)][_0x80388(0x1ee)](this);},Game_CharacterBase[_0x3bfc03(0x1fe)]['isDashingAndMoving']=function(){const _0x4d9ecd=_0x3bfc03;return this[_0x4d9ecd(0x5e0)]()&&this[_0x4d9ecd(0x41e)]===0x0;},VisuMZ[_0x3bfc03(0x12c)]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x224)],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x224)]=function(){const _0xba236d=_0x3bfc03;return this[_0xba236d(0x497)]()?this['getPosingCharacterPattern']():VisuMZ[_0xba236d(0x12c)]['Game_CharacterBase_pattern'][_0xba236d(0x1ee)](this);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x2cc)]=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x5bc)],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x5bc)]=function(){const _0x518d71=_0x3bfc03;VisuMZ[_0x518d71(0x12c)][_0x518d71(0x2cc)][_0x518d71(0x1ee)](this),this['clearPose']();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x379)]=Game_CharacterBase[_0x3bfc03(0x1fe)]['characterIndex'],Game_CharacterBase['prototype'][_0x3bfc03(0x49f)]=function(){const _0x4fd99c=_0x3bfc03;if(this['isSpriteVS8dir']())return this['characterIndexVS8']();return VisuMZ[_0x4fd99c(0x12c)][_0x4fd99c(0x379)]['call'](this);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e1)]=function(){const _0x477285=_0x3bfc03,_0x3e2b4a=this[_0x477285(0x403)]();if(this[_0x477285(0x413)]()){if([0x2,0x4,0x6,0x8][_0x477285(0x25e)](_0x3e2b4a))return 0x4;if([0x1,0x3,0x7,0x9][_0x477285(0x25e)](_0x3e2b4a))return 0x5;}else{if(this[_0x477285(0x480)]())return 0x6;else{if(this[_0x477285(0x497)]())return this[_0x477285(0x479)]();else{if(this[_0x477285(0x138)]){if(_0x477285(0x384)!==_0x477285(0x384)){this[_0x477285(0x528)]--;if(this[_0x477285(0x528)]<=0x0&&this[_0x477285(0x2fd)]!==_0x477285(0x1d0))this[_0x477285(0x1f4)]();}else{if([0x2,0x4,0x6,0x8]['includes'](_0x3e2b4a))return 0x4;if([0x1,0x3,0x7,0x9][_0x477285(0x25e)](_0x3e2b4a))return 0x5;}}else{if(this['hasEventIcon']()&&this[_0x477285(0x45e)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3e2b4a))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x3e2b4a))return 0x5;}else{if(this[_0x477285(0x5bd)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x3e2b4a))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x3e2b4a))return 0x3;}else{if(_0x477285(0x605)===_0x477285(0x605)){if([0x2,0x4,0x6,0x8][_0x477285(0x25e)](_0x3e2b4a))return 0x0;if([0x1,0x3,0x7,0x9][_0x477285(0x25e)](_0x3e2b4a))return 0x1;}else _0x1a3e7e[_0x477285(0x1c8)](_0x5afde9[_0x477285(0x4a2)]),_0x39a876[_0x477285(0x12c)]['Window_EventItem_onCancel']['call'](this),_0x7fcd28['clearSelfTarget'](),_0x36497c[_0x477285(0x4a2)]=_0x50a1d1;}}}}}}},Game_CharacterBase['prototype']['useCarryPoseForIcons']=function(){const _0x418311=_0x3bfc03;return VisuMZ['EventsMoveCore']['Settings'][_0x418311(0x22a)][_0x418311(0x25c)];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x453)]=function(){const _0x2c50a6=_0x3bfc03;return this[_0x2c50a6(0x480)]()&&this[_0x2c50a6(0x386)]()===VisuMZ[_0x2c50a6(0x12c)][_0x2c50a6(0x653)][_0x2c50a6(0x16a)][_0x2c50a6(0x210)];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x1a4)]=function(){const _0x5db938=_0x3bfc03;if(this[_0x5db938(0x453)]()){if(_0x5db938(0x5b5)===_0x5db938(0x40c)){if(this[_0x5db938(0x484)]===_0x53df13&&this[_0x5db938(0x443)]())return this[_0x5db938(0x1fa)]()[_0x5db938(0x3a4)]()[_0x5db938(0x223)](/\[VS8\]/i);else return _0x754734[_0x5db938(0x5b4)]&&this[_0x5db938(0x371)]()?!![]:this[_0x5db938(0x3a4)]()['match'](/\[VS8\]/i);}else return 0x4;}else return 0x2;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x17e)]=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x629)],Game_CharacterBase[_0x3bfc03(0x1fe)]['update']=function(){const _0x941bc=_0x3bfc03;this[_0x941bc(0x52c)](),VisuMZ[_0x941bc(0x12c)]['Game_CharacterBase_update']['call'](this),this[_0x941bc(0x2a4)]();},Game_CharacterBase[_0x3bfc03(0x1fe)]['updateScaleBase']=function(){const _0x357c8c=_0x3bfc03;this[_0x357c8c(0x4e1)]=this['_scaleBaseX']??0x1,this[_0x357c8c(0x610)]=this[_0x357c8c(0x174)]??0x1;},VisuMZ[_0x3bfc03(0x12c)]['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x3bfc03(0x1fe)]['bushDepth'],Game_CharacterBase['prototype']['bushDepth']=function(){const _0x1af2f3=_0x3bfc03;let _0x860f40=VisuMZ['EventsMoveCore'][_0x1af2f3(0x3df)][_0x1af2f3(0x1ee)](this);return this['_scaleY']!==undefined&&(_0x860f40/=Math[_0x1af2f3(0x159)](this[_0x1af2f3(0x610)],0.00001)),Math['floor'](_0x860f40);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x2a4)]=function(){const _0x464d37=_0x3bfc03;this[_0x464d37(0x528)]=this[_0x464d37(0x528)]||0x0;if(this[_0x464d37(0x528)]>0x0){if(_0x464d37(0x2ca)!=='AVxvQ')this[_0x464d37(0x4c2)]=new _0xf474b5(_0x4922d2[_0x464d37(0x1d4)](_0x10346b[_0x464d37(0x474)]/0x2),0x30),this[_0x464d37(0x4c2)][_0x464d37(0x2fa)]=this['fontFace'](),this[_0x464d37(0x4c2)][_0x464d37(0x470)]=this[_0x464d37(0x470)](),this[_0x464d37(0x4c2)][_0x464d37(0x5ad)]=_0x41816e[_0x464d37(0x5ad)]();else{this['_poseDuration']--;if(this[_0x464d37(0x528)]<=0x0&&this[_0x464d37(0x2fd)]!==_0x464d37(0x1d0))this[_0x464d37(0x1f4)]();}}},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x167)]=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x44a)],Game_CharacterBase[_0x3bfc03(0x1fe)]['moveDiagonally']=function(_0x594089,_0x271848){const _0x43414d=_0x3bfc03;VisuMZ[_0x43414d(0x12c)]['Game_CharacterBase_moveDiagonally'][_0x43414d(0x1ee)](this,_0x594089,_0x271848);if(this[_0x43414d(0x23e)]())this['setDiagonalDirection'](_0x594089,_0x271848);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x56d)]=function(_0x32f0e3,_0x5ad788){const _0x25c857=_0x3bfc03;if(_0x32f0e3===0x4&&_0x5ad788===0x2)this[_0x25c857(0x36a)](0x1);if(_0x32f0e3===0x6&&_0x5ad788===0x2)this[_0x25c857(0x36a)](0x3);if(_0x32f0e3===0x4&&_0x5ad788===0x8)this[_0x25c857(0x36a)](0x7);if(_0x32f0e3===0x6&&_0x5ad788===0x8)this[_0x25c857(0x36a)](0x9);},VisuMZ[_0x3bfc03(0x12c)]['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d1)],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d1)]=function(){const _0x1d75af=_0x3bfc03;if(this[_0x1d75af(0x497)]()&&this['getPose']()==='ZZZ')return!![];return VisuMZ[_0x1d75af(0x12c)][_0x1d75af(0x5a0)][_0x1d75af(0x1ee)](this);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x4fc)]=function(_0x2bcd03,_0x5447b9){const _0x193c66=_0x3bfc03;if(_0x2bcd03[_0x193c66(0x223)](/Z/i))_0x2bcd03=_0x193c66(0x1d0);if(_0x2bcd03[_0x193c66(0x223)](/SLEEP/i))_0x2bcd03=_0x193c66(0x1d0);this[_0x193c66(0x23e)]()&&(_0x193c66(0x28a)===_0x193c66(0x2f2)?(_0x432200[_0x193c66(0x48e)]=_0x55347c['MapID'],_0x19507e[_0x193c66(0x395)]=_0x4480a0['EventID']):(this[_0x193c66(0x2fd)]=_0x2bcd03[_0x193c66(0x123)]()['trim'](),this['_poseDuration']=_0x5447b9||Infinity));},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x262)]=function(){const _0x348da0=_0x3bfc03;return this['isSpriteVS8dir']()?(this['_pose']||'')[_0x348da0(0x123)]()[_0x348da0(0x4d7)]():''['toUpperCase']()['trim']();},Game_CharacterBase['prototype']['setBalloonPose']=function(_0x20d2b9,_0x36b821){const _0x469273=_0x3bfc03;if(this[_0x469273(0x23e)]()){if('TQllr'==='ZZNlP')return![];else{const _0x3d0a5b=['',_0x469273(0x301),'QUESTION',_0x469273(0x568),'HEART',_0x469273(0x200),_0x469273(0x175),_0x469273(0x583),'SILENCE','LIGHT\x20BULB',_0x469273(0x1d0),'','','','',''][_0x20d2b9];this[_0x469273(0x4fc)](_0x3d0a5b,_0x36b821);}}},Game_CharacterBase['prototype'][_0x3bfc03(0x1f4)]=function(){const _0x438362=_0x3bfc03;this['_pose']='',this[_0x438362(0x528)]=0x0;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x497)]=function(){const _0x3f81c8=_0x3bfc03;return this[_0x3f81c8(0x23e)]()&&!!this[_0x3f81c8(0x2fd)];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x479)]=function(){const _0x3a33e8=_0x3bfc03,_0x1ed0de=this[_0x3a33e8(0x2fd)]['toUpperCase']();switch(this[_0x3a33e8(0x2fd)]['toUpperCase']()[_0x3a33e8(0x4d7)]()){case _0x3a33e8(0x542):case _0x3a33e8(0x4c3):case'VICTORY':case'HURT':case _0x3a33e8(0x347):case _0x3a33e8(0x4a4):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x3bfc03(0x2b8)]=function(){const _0x17c69e=_0x3bfc03;switch(this['_pose'][_0x17c69e(0x123)]()){case _0x17c69e(0x301):case _0x17c69e(0x3ea):case _0x17c69e(0x568):case'!':case'?':return 0x2;break;case _0x17c69e(0x494):case _0x17c69e(0x200):case _0x17c69e(0x175):return 0x4;break;case _0x17c69e(0x542):case _0x17c69e(0x4c3):case _0x17c69e(0x221):case _0x17c69e(0x583):case'SILENCE':case _0x17c69e(0x55d):return 0x6;break;case _0x17c69e(0x419):case _0x17c69e(0x347):case _0x17c69e(0x4a4):case _0x17c69e(0x1d0):case _0x17c69e(0x257):return 0x8;break;default:return VisuMZ[_0x17c69e(0x12c)][_0x17c69e(0x65e)][_0x17c69e(0x1ee)](this);break;}},Game_CharacterBase['prototype'][_0x3bfc03(0x19c)]=function(){const _0x581091=_0x3bfc03;switch(this['_pose']['toUpperCase']()){case _0x581091(0x542):case _0x581091(0x419):case'EXCLAMATION':case'!':case'HEART':case _0x581091(0x583):return 0x0;break;case _0x581091(0x4c3):case _0x581091(0x347):case _0x581091(0x3ea):case'?':case'ANGER':case _0x581091(0x26a):return 0x1;break;case'VICTORY':case _0x581091(0x4a4):case _0x581091(0x568):case _0x581091(0x175):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x581091(0x12c)][_0x581091(0x1e3)][_0x581091(0x1ee)](this);break;}},Game_CharacterBase['prototype'][_0x3bfc03(0x248)]=function(){const _0x500463=_0x3bfc03;this[_0x500463(0x138)]=!![];},Game_CharacterBase[_0x3bfc03(0x1fe)]['clearCarrying']=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x3f9)]=function(){const _0x16503e=_0x3bfc03;this[_0x16503e(0x30c)]=!![];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x4f4)]=function(){const _0x1c3be3=_0x3bfc03;this[_0x1c3be3(0x30c)]=![];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x351)]=function(){const _0x28b77e=_0x3bfc03;if(this[_0x28b77e(0x4dc)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x28b77e(0x211)]==='')return![];if(this[_0x28b77e(0x484)]===Game_Vehicle)return![];if(this[_0x28b77e(0x2d9)]())return![];return!![];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x2ea)]=function(){const _0x2b5f6e=_0x3bfc03;if(this['isOnLadder']())return!![];if(this[_0x2b5f6e(0x484)]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase['prototype']['shadowFilename']=function(){const _0xc077cc=_0x3bfc03;return VisuMZ[_0xc077cc(0x12c)][_0xc077cc(0x653)][_0xc077cc(0x5cb)][_0xc077cc(0x16d)];},Game_CharacterBase['prototype'][_0x3bfc03(0x473)]=function(){return this['screenX']();},Game_CharacterBase[_0x3bfc03(0x1fe)]['shadowY']=function(){const _0x482f75=_0x3bfc03,_0x4bbf4e=$gameMap[_0x482f75(0x40d)]();return Math[_0x482f75(0x606)](this['scrolledY']()*_0x4bbf4e+_0x4bbf4e);},Game_CharacterBase[_0x3bfc03(0x595)]=0x64,Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x36d)]=function(_0x3e67c1,_0x6d8c7d){const _0x126778=_0x3bfc03;if(TouchInput[_0x126778(0x30a)]())return![];if(!$gameMap[_0x126778(0x400)]())return![];if($gameMap[_0x126778(0x5d6)](_0x3e67c1,_0x6d8c7d)['length']>0x0)return![];if(!$gameMap[_0x126778(0x4b0)](_0x3e67c1,_0x6d8c7d))return![];const _0xbc2c7b=$gameMap[_0x126778(0x60e)][_0x126778(0x553)];if(_0xbc2c7b>=Game_CharacterBase[_0x126778(0x595)]){if(_0x126778(0x13e)==='DhbAv')return![];else while(this['isRunning']()){this[_0x126778(0x532)]();}}return!![];},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x14d)]=function(_0xa3b1ef,_0x477b3f){const _0x311580=_0x3bfc03;let _0x372b18=this[_0x311580(0x42a)](_0xa3b1ef,_0x477b3f);if(!this[_0x311580(0x36d)](_0xa3b1ef,_0x477b3f))return _0x372b18;if(this[_0x311580(0x652)](_0xa3b1ef,_0x477b3f))return _0x372b18;const _0x130cd3=_0x372b18;if(_0x372b18===0x2){if(_0x311580(0x34a)!==_0x311580(0x34a))this[_0x311580(0x30c)]=![];else{if(_0xa3b1ef>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0x372b18=0x3;if(_0xa3b1ef<this['x']&&this[_0x311580(0x30e)](this['x'],this['y'],0x4))_0x372b18=0x1;}}else{if(_0x372b18===0x4){if(_0x311580(0x4a7)===_0x311580(0x4a7)){if(_0x477b3f>this['y']&&this[_0x311580(0x30e)](this['x'],this['y'],0x4))_0x372b18=0x1;if(_0x477b3f<this['y']&&this[_0x311580(0x30e)](this['x'],this['y'],0x6))_0x372b18=0x7;}else{const _0x5c01ed=_0x75a7bc?_0x44d2c4[_0x311580(0x48e)]():0x0,_0x172464=[0x0,0x0,_0x311580(0x17a)[_0x311580(0x26c)](_0x5c01ed,_0x9c2c30)];return _0xcb79c5[_0x311580(0x173)](_0x172464)||0x0;}}else{if(_0x372b18===0x6){if(_0x477b3f>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x372b18=0x3;if(_0x477b3f<this['y']&&this[_0x311580(0x30e)](this['x'],this['y'],0x6))_0x372b18=0x9;}else{if(_0x372b18===0x8){if(_0x311580(0x1ed)!==_0x311580(0x51b)){if(_0xa3b1ef>this['x']&&this[_0x311580(0x30e)](this['x'],this['y'],0x6))_0x372b18=0x9;if(_0xa3b1ef<this['x']&&this[_0x311580(0x30e)](this['x'],this['y'],0x4))_0x372b18=0x7;}else{if(_0x1b8d8e)_0x6e64ac[_0x311580(0x407)]();_0x313e3d[_0x311580(0x12c)][_0x311580(0x342)][_0x311580(0x1ee)](this);}}}}}if(!this['canPass'](this['x'],this['y'],_0x372b18))return _0x130cd3;const _0x415def=$gameMap[_0x311580(0x3a3)](this['x'],_0x372b18),_0x4b8e6c=$gameMap[_0x311580(0x18c)](this['y'],_0x372b18);if(this['isCollidedWithEvents'](_0x415def,_0x4b8e6c))_0x372b18=_0x130cd3;return _0x372b18;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5c0)]=Game_CharacterBase[_0x3bfc03(0x1fe)]['canPass'],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x30e)]=function(_0x4700da,_0x3caa29,_0x48467d){const _0xbc489d=_0x3bfc03;if(this[_0xbc489d(0x661)]===_0xbc489d(0x15f)){if(_0xbc489d(0x52f)!==_0xbc489d(0x3ce))return this[_0xbc489d(0x1fa)]()[_0xbc489d(0x3eb)](_0x4700da,_0x3caa29,_0x48467d);else{if(_0x8f38a&&!_0x5bb1ee[_0xbc489d(0x280)]){this[_0xbc489d(0x2a8)](_0x1e9768['x'],_0x188571['y'],_0x2c1a86);if(_0x1b6363[_0xbc489d(0x44d)]()&&this[_0xbc489d(0x44d)]()){const _0x465bbb=_0x3a0212['distance'](this['x'],this['y'],_0x120d70['x'],_0x1cb833['y']);if(_0x465bbb<=0x1)this[_0xbc489d(0x5e4)]++;}}}}else return VisuMZ[_0xbc489d(0x12c)]['Game_CharacterBase_canPass']['call'](this,_0x4700da,_0x3caa29,_0x48467d);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x54d)]=function(){const _0x34f188=_0x3bfc03;this['_spriteOffsetX']=0x0,this[_0x34f188(0x325)]=0x0;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x5f9)]=Game_CharacterBase[_0x3bfc03(0x1fe)]['screenX'],Game_CharacterBase[_0x3bfc03(0x1fe)]['screenX']=function(){const _0x5aa6de=_0x3bfc03;return VisuMZ[_0x5aa6de(0x12c)]['Game_CharacterBase_screenX'][_0x5aa6de(0x1ee)](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x3bfc03(0x12c)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x3bfc03(0x1fe)]['screenY'],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x300)]=function(){const _0x63b73e=_0x3bfc03;return VisuMZ[_0x63b73e(0x12c)][_0x63b73e(0x15a)]['call'](this)+(this[_0x63b73e(0x325)]||0x0);},Game_CharacterBase['DEFAULT_SHIFT_Y']=VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x653)][_0x3bfc03(0x5cb)][_0x3bfc03(0x572)]??-0x6,Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x5ba)]=function(){const _0x411fe6=_0x3bfc03;let _0x2cc918=this[_0x411fe6(0x3b4)]()?0x0:-Game_CharacterBase[_0x411fe6(0x626)];return this[_0x411fe6(0x610)]&&(_0x2cc918*=this[_0x411fe6(0x610)]),Math[_0x411fe6(0x1d4)](_0x2cc918);},Game_CharacterBase['prototype']['clearStepPattern']=function(){const _0xdf676a=_0x3bfc03;this[_0xdf676a(0x270)]='';},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x461)]=Game_CharacterBase['prototype'][_0x3bfc03(0x3a0)],Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x3a0)]=function(){const _0x22e35d=_0x3bfc03;if(this[_0x22e35d(0x519)])return;if(this[_0x22e35d(0x176)]())return;VisuMZ['EventsMoveCore'][_0x22e35d(0x461)][_0x22e35d(0x1ee)](this);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x176)]=function(){const _0x19d0e9=_0x3bfc03;if(!this['hasStepAnime']()&&this['_stopCount']>0x0)return![];switch(String(this[_0x19d0e9(0x270)])[_0x19d0e9(0x123)]()[_0x19d0e9(0x4d7)]()){case'LEFT\x20TO\x20RIGHT':this[_0x19d0e9(0x576)]+=0x1;if(this[_0x19d0e9(0x576)]>0x2)this[_0x19d0e9(0x1ca)](0x0);break;case _0x19d0e9(0x2a6):this['_pattern']-=0x1;if(this[_0x19d0e9(0x576)]<0x0)this[_0x19d0e9(0x1ca)](0x2);break;case _0x19d0e9(0x316):case _0x19d0e9(0x482):this[_0x19d0e9(0x126)]();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x19d0e9(0x2b1):case _0x19d0e9(0x5df):case'SPIN\x20ACW':this[_0x19d0e9(0x4b5)]();break;default:return![];}return!![];},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x34f)]=function(){const _0x2eba9d=_0x3bfc03;return $gameSystem[_0x2eba9d(0x34f)](this);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x1ac)]=function(){const _0x3aebf5=_0x3bfc03,_0x37c542=this[_0x3aebf5(0x34f)]();if(!_0x37c542)return![];return _0x37c542[_0x3aebf5(0x24a)]>0x0;},Game_CharacterBase[_0x3bfc03(0x1fe)]['frontX']=function(){const _0x1605f6=this['direction']();return $gameMap['roundXWithDirection'](this['x'],_0x1605f6);},Game_CharacterBase[_0x3bfc03(0x1fe)]['frontY']=function(){const _0x377740=_0x3bfc03,_0x342358=this[_0x377740(0x403)]();return $gameMap[_0x377740(0x18c)](this['y'],_0x342358);},Game_CharacterBase['prototype'][_0x3bfc03(0x2c6)]=function(){const _0x5a5f49=_0x3bfc03,_0x13d5ab=this[_0x5a5f49(0x273)](this['direction']());return $gameMap[_0x5a5f49(0x3a3)](this['x'],_0x13d5ab);},Game_CharacterBase['prototype']['backY']=function(){const _0xedd2d9=_0x3bfc03,_0x1478d5=this['reverseDir'](this[_0xedd2d9(0x403)]());return $gameMap[_0xedd2d9(0x18c)](this['y'],_0x1478d5);},Game_CharacterBase['prototype'][_0x3bfc03(0x1ce)]=function(){const _0x5c11bc=_0x3bfc03,_0x54ed78=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x5c11bc(0x3a3)](this['x'],_0x54ed78);},Game_CharacterBase['prototype'][_0x3bfc03(0x261)]=function(){const _0x1e8ed2=_0x3bfc03,_0x27f3da=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x1e8ed2(0x18c)](this['y'],_0x27f3da);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x375)]=function(){const _0x16c3c6=_0x3bfc03,_0x14345d=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0x16c3c6(0x3a3)](this['x'],_0x14345d);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x21f)]=function(){const _0x4d81f0=_0x3bfc03,_0x2ccb02=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x4d81f0(0x403)]()];return $gameMap[_0x4d81f0(0x18c)](this['y'],_0x2ccb02);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x43d)]=Game_Character['prototype'][_0x3bfc03(0x39c)],Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x39c)]=function(_0x471dc7){const _0x100069=_0x3bfc03;route=JsonEx[_0x100069(0x3ee)](_0x471dc7),VisuMZ['EventsMoveCore'][_0x100069(0x43d)][_0x100069(0x1ee)](this,route);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x551)]=Game_Character['prototype']['forceMoveRoute'],Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x1a2)]=function(_0x47a7c9){const _0xe3cd1e=_0x3bfc03;route=JsonEx[_0xe3cd1e(0x3ee)](_0x47a7c9),VisuMZ[_0xe3cd1e(0x12c)][_0xe3cd1e(0x551)][_0xe3cd1e(0x1ee)](this,route);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x38e)]=Game_Character['prototype'][_0x3bfc03(0x510)],Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x510)]=function(_0x2dc3ae){const _0x165fca=_0x3bfc03,_0x2ab0b3=Game_Character,_0x43d403=_0x2dc3ae[_0x165fca(0x181)];if(_0x2dc3ae[_0x165fca(0x4c1)]===_0x2ab0b3['ROUTE_SCRIPT']){if(_0x165fca(0x2c8)!==_0x165fca(0x2c8))_0x512ef9[_0x165fca(0x12c)][_0x165fca(0x41a)][_0x165fca(0x1ee)](this),this[_0x165fca(0x4c2)]['addLoadListener'](this['updateBitmapSmoothing'][_0x165fca(0x2cb)](this));else{let _0x108564=_0x2dc3ae[_0x165fca(0x181)][0x0];_0x108564=this['convertVariableValuesInScriptCall'](_0x108564),_0x108564=this['convertSelfVariableValuesInScriptCall'](_0x108564),this[_0x165fca(0x3b9)](_0x2dc3ae,_0x108564);}}else VisuMZ[_0x165fca(0x12c)][_0x165fca(0x38e)]['call'](this,_0x2dc3ae);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x36f)]=function(_0x10f196){const _0x325b1a=_0x3bfc03,_0x5d818d=/\$gameVariables\.value\((\d+)\)/gi,_0x35c306=/\\V\[(\d+)\]/gi;while(_0x10f196['match'](_0x5d818d)){_0x10f196=_0x10f196[_0x325b1a(0x478)](_0x5d818d,(_0x4ea95e,_0x235ffa)=>$gameVariables[_0x325b1a(0x173)](parseInt(_0x235ffa)));}while(_0x10f196[_0x325b1a(0x223)](_0x35c306)){_0x10f196=_0x10f196[_0x325b1a(0x478)](_0x35c306,(_0x47205f,_0x37d8da)=>$gameVariables[_0x325b1a(0x173)](parseInt(_0x37d8da)));}return _0x10f196;},Game_Character['prototype'][_0x3bfc03(0x1e0)]=function(_0x64fa17){const _0x1a10b8=_0x3bfc03,_0x25ac9d=/\\SELFVAR\[(\d+)\]/gi;while(_0x64fa17[_0x1a10b8(0x223)](_0x25ac9d)){_0x64fa17=_0x64fa17[_0x1a10b8(0x478)](_0x25ac9d,(_0x871996,_0x2fb20c)=>getSelfVariableValue(this[_0x1a10b8(0x4f1)],this[_0x1a10b8(0x5dc)],parseInt(_0x2fb20c)));}return _0x64fa17;},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x3b9)]=function(_0x114b42,_0x77be0e){const _0x123400=_0x3bfc03;if(_0x77be0e[_0x123400(0x223)](/ANIMATION:[ ](\d+)/i)){if('smqKy'===_0x123400(0x11e))this[_0x123400(0x3bc)]-=this[_0x123400(0x4f8)]();else return this['processMoveRouteAnimation'](Number(RegExp['$1']));}if(_0x77be0e['match'](/BALLOON:[ ](.*)/i))return this[_0x123400(0x135)](String(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/FADE IN:[ ](\d+)/i)){if(_0x123400(0x2ac)==='bwSPZ')return this[_0x123400(0x5e8)](Number(RegExp['$1']));else _0x3a95c4+=this[_0x123400(0x393)]();}if(_0x77be0e[_0x123400(0x223)](/FADE OUT:[ ](\d+)/i))return this[_0x123400(0x17c)](Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x123400(0x20d)===_0x123400(0x20d))return this[_0x123400(0x248)]();else{if(this[_0x123400(0x1d1)]())return;_0x1a8cba[_0x123400(0x12c)]['Game_Event_updateSelfMovement']['call'](this),this[_0x123400(0x4af)]()&&_0x5ab0d0[_0x123400(0x394)](this[_0x123400(0x5dc)]);}}if(_0x77be0e[_0x123400(0x223)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x123400(0x137)]();if(_0x77be0e['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x123400(0x3f9)]();if(_0x77be0e[_0x123400(0x223)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x77be0e[_0x123400(0x223)](/HUG:[ ]LEFT/i))return this['processMoveRouteHugWall'](_0x123400(0x3e1));if(_0x77be0e[_0x123400(0x223)](/HUG:[ ]RIGHT/i))return this[_0x123400(0x5d5)](_0x123400(0x186));if(_0x77be0e[_0x123400(0x223)](/INDEX:[ ](\d+)/i))return this['processMoveRouteSetIndex'](Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x14c371=this[_0x123400(0x199)]+Number(RegExp['$1']);return this[_0x123400(0x467)](_0x14c371);}if(_0x77be0e['match'](/JUMP FORWARD:[ ](\d+)/i)){if('YeXnM'!=='YeXnM')this[_0x123400(0x3f8)]=0x0;else return this[_0x123400(0x33c)](Number(RegExp['$1']));}if(_0x77be0e[_0x123400(0x223)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return'MMKwx'===_0x123400(0x4b7)?_0x3e5bcf>0x0?0x6:0x4:this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x77be0e[_0x123400(0x223)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x3da08f=$gameMap[_0x123400(0x31c)](Number(RegExp['$1']));return this[_0x123400(0x655)](_0x3da08f);}if(_0x77be0e['match'](/JUMP TO PLAYER/i))return this['processMoveRouteJumpToCharacter']($gamePlayer);if(_0x77be0e[_0x123400(0x223)](/JUMP TO HOME/i)&&this[_0x123400(0x395)]){if(_0x123400(0x40b)!=='vSjLM'){const _0x9a31bb=this[_0x123400(0x3a8)],_0x17644a=this[_0x123400(0x202)];return this['processMoveRouteJumpTo'](_0x9a31bb,_0x17644a);}else{if(this['_followerControlID']===_0x22acd7)this[_0x123400(0x190)]();return this[_0x123400(0x129)];}}if(_0x77be0e[_0x123400(0x223)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x21898d=String(RegExp['$1']),_0x180939=this[_0x123400(0x2d0)](_0x77be0e);return this['processMoveRouteMoveUntilStop'](_0x21898d,_0x180939);}if(_0x77be0e[_0x123400(0x223)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('YRkEV'!==_0x123400(0x33b)){const _0x17f7c7=Number(RegExp['$1']),_0x451a72=Number(RegExp['$2']),_0x261a79=this['checkCollisionKeywords'](_0x77be0e);return this[_0x123400(0x2a8)](_0x17f7c7,_0x451a72,_0x261a79);}else this[_0x123400(0x265)][_0x123400(0x2e8)](_0x1f084d[_0x123400(0x2e7)]);}if(_0x77be0e[_0x123400(0x223)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x2c15b8=$gameMap['event'](Number(RegExp['$1'])),_0x76e222=this['checkCollisionKeywords'](_0x77be0e);return this[_0x123400(0x5dd)](_0x2c15b8,_0x76e222);}if(_0x77be0e[_0x123400(0x223)](/MOVE TO PLAYER/i)){const _0x949340=this[_0x123400(0x2d0)](_0x77be0e);return this[_0x123400(0x5dd)]($gamePlayer,_0x949340);}if(_0x77be0e[_0x123400(0x223)](/MOVE TO HOME/i)&&this[_0x123400(0x395)]){const _0x34d3c4=this[_0x123400(0x3a8)],_0x1da2a8=this[_0x123400(0x202)],_0x2e9bff=this[_0x123400(0x2d0)](_0x77be0e);return this[_0x123400(0x2a8)](_0x34d3c4,_0x1da2a8,_0x2e9bff);}if(_0x77be0e[_0x123400(0x223)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x123400(0x432)](0x1,Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/MOVE DOWN:[ ](\d+)/i)){if(_0x123400(0x2c2)!=='oNLOe'){_0x287c52[_0x123400(0x5a5)](_0x2cb551,_0x146d82);const _0x3828ab=_0x3685ff[_0x123400(0x212)]();_0x106b5b['MapId']=_0x40f9d9[_0x123400(0x562)]||_0x55e664[_0x123400(0x48e)]();const _0x220482=[_0x56f783['MapId'],_0xc06e0[_0x123400(0x56f)]||_0x3828ab[_0x123400(0x395)](),_0x38ffbe[_0x123400(0x335)]],_0x20625f=_0x20d4af[_0x123400(0x424)],_0x4dd36d=_0x14287b[_0x123400(0x173)](_0x220482)||![];_0x27a3b8[_0x123400(0x623)](_0x20625f,_0x4dd36d);}else return this[_0x123400(0x432)](0x2,Number(RegExp['$1']));}if(_0x77be0e[_0x123400(0x223)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x123400(0x432)](0x3,Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/MOVE LEFT:[ ](\d+)/i))return this[_0x123400(0x432)](0x4,Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/MOVE RIGHT:[ ](\d+)/i)){if(_0x123400(0x1f8)==='TtUCB'){if(this[_0x123400(0x3a2)]===_0xea8e5e)this['initEventsMoveCore']();if(!_0x2dcec7)return;this[_0x123400(0x378)](_0x370b88[_0x123400(0x4f1)],_0xae67be[_0x123400(0x5dc)]);}else return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));}if(_0x77be0e[_0x123400(0x223)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x123400(0x432)](0x7,Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/MOVE UP:[ ](\d+)/i))return'GIqgU'!==_0x123400(0x30b)?this[_0x123400(0x432)](0x8,Number(RegExp['$1'])):this['directionOnLadderSpriteVS8dir']();if(_0x77be0e[_0x123400(0x223)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x77be0e['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x5c9404=Math[_0x123400(0x1d4)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x5c9404[_0x123400(0x3cb)](0x0,0xff));}if(_0x77be0e['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if('CtrcE'!==_0x123400(0x52a))return!![];else{const _0x210eda=this[_0x123400(0x184)]+Math[_0x123400(0x1d4)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x210eda[_0x123400(0x3cb)](0x0,0xff));}}if(_0x77be0e[_0x123400(0x223)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x2b83e3=this[_0x123400(0x184)]+Number(RegExp['$1']);return this['setOpacity'](_0x2b83e3[_0x123400(0x3cb)](0x0,0xff));}if(_0x77be0e[_0x123400(0x223)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x123400(0x3aa)](Number(RegExp['$1']));if(_0x77be0e[_0x123400(0x223)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x77be0e[_0x123400(0x223)](/POSE:[ ](.*)/i)){const _0xca478d=String(RegExp['$1'])[_0x123400(0x123)]()['trim']();return this[_0x123400(0x4fc)](_0xca478d);}if(_0x77be0e[_0x123400(0x223)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x123400(0x4d6)===_0x123400(0x122)){const _0x5987ba=_0x326429[_0x423144[_0x123400(0x240)](_0x5576b7['length'])];return _0xd950c['x']=_0x5987ba[0x0],_0x2472a3['y']=_0x5987ba[0x1],this[_0x123400(0x554)](_0x33593c),!![];}else{const _0x291cf6=Number(RegExp['$1']),_0x16b70f=Number(RegExp['$2']);return this[_0x123400(0x399)](_0x291cf6,_0x16b70f);}}if(_0x77be0e[_0x123400(0x223)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x123400(0x60c)===_0x123400(0x308)){_0x1212a4[_0x123400(0x12c)][_0x123400(0x1f7)][_0x123400(0x1ee)](this,_0x5f100f);if(this['canStartLocalEvents']()){this[_0x123400(0x668)](_0x33b291);if(_0x37701d['includes'](0x0)&&this[_0x123400(0x58c)]()==='standing')this[_0x123400(0x49c)](this['x'],this['y']);else(_0x31749a[_0x123400(0x25e)](0x1)||_0x3e05d9[_0x123400(0x25e)](0x2))&&this[_0x123400(0x505)]();}}else{const _0x13dc92=$gameMap[_0x123400(0x31c)](Number(RegExp['$1']));return this[_0x123400(0x289)](_0x13dc92);}}if(_0x77be0e['match'](/STEP TOWARD PLAYER/i))return this[_0x123400(0x289)]($gamePlayer);if(_0x77be0e[_0x123400(0x223)](/STEP TOWARD HOME/i)&&this[_0x123400(0x395)]){if(_0x123400(0x58e)!==_0x123400(0x373)){const _0xd1fcf5=this[_0x123400(0x3a8)],_0x4fdb62=this[_0x123400(0x202)];return this[_0x123400(0x399)](_0xd1fcf5,_0x4fdb62);}else return this[_0x123400(0x496)]['regionList']||[];}if(_0x77be0e['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x123400(0x3a9)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x77be0e[_0x123400(0x223)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if('NOMpR'===_0x123400(0x3e2))this[_0x123400(0x32f)]=!![];else{const _0x20f31f=$gameMap[_0x123400(0x31c)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x20f31f);}}if(_0x77be0e[_0x123400(0x223)](/STEP AWAY FROM PLAYER/i)){if('LfAxT'==='LfAxT')return this['moveAwayFromCharacter']($gamePlayer);else{if(_0x2a2483>0x0&&_0x1a06cc<0x0)return 0x9;if(_0x1f5752<0x0&&_0x426f5a<0x0)return 0x7;if(_0x3b40f1>0x0&&_0x22a18a>0x0)return 0x3;if(_0x55dc22<0x0&&_0x303ad4>0x0)return 0x1;}}if(_0x77be0e[_0x123400(0x223)](/STEP AWAY FROM HOME/i)&&this['eventId']){const _0x4903de=this[_0x123400(0x3a8)],_0x6614da=this[_0x123400(0x202)];return this[_0x123400(0x3a9)](_0x4903de,_0x6614da);}if(_0x77be0e[_0x123400(0x223)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x123400(0x219)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x77be0e[_0x123400(0x223)](/TURN TO EVENT:[ ](\d+)/i)){if(_0x123400(0x272)===_0x123400(0x272)){const _0x5f033a=$gameMap['event'](Number(RegExp['$1']));return this['turnTowardCharacter'](_0x5f033a);}else{const _0x10a5db=_0x17f710['findTargetSprite'](this);_0x10a5db&&_0x10a5db[_0x123400(0x2e7)]&&_0x10a5db[_0x123400(0x2e7)]['_filename']!==this['shadowFilename']()&&(_0x10a5db[_0x123400(0x2e7)][_0x123400(0x16f)]=this[_0x123400(0x26b)](),_0x10a5db['_shadowSprite'][_0x123400(0x4c2)]=_0x395015[_0x123400(0x4df)](_0x10a5db[_0x123400(0x2e7)][_0x123400(0x16f)]));}}if(_0x77be0e[_0x123400(0x223)](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x77be0e[_0x123400(0x223)](/TURN TO HOME/i)&&this[_0x123400(0x395)]){const _0x232bf0=this[_0x123400(0x3a8)],_0x18276e=this[_0x123400(0x202)];return this[_0x123400(0x64e)](_0x232bf0,_0x18276e);}if(_0x77be0e[_0x123400(0x223)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x123400(0x208)===_0x123400(0x59f)){const _0x48cb06=_0x1a29de[_0x123400(0x31c)](_0x101713(_0x34ef16['$1']));return this[_0x123400(0x168)](_0x48cb06);}else return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x77be0e[_0x123400(0x223)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if(_0x123400(0x4c8)!==_0x123400(0x362)){const _0x20efd2=$gameMap[_0x123400(0x31c)](Number(RegExp['$1']));return this[_0x123400(0x47d)](_0x20efd2);}else{let _0x5d1bb2=this[_0x123400(0x63f)]()||0x1,_0x3d13d8=this[_0x123400(0x3e6)]()||0x1;const _0x574e4c=_0x1d6a7f[_0x123400(0x159)](0x1,_0x5d1bb2,_0x3d13d8);_0x278e13=_0x2a693a/_0x574e4c;}}if(_0x77be0e['match'](/TURN AWAY FROM PLAYER/i))return this[_0x123400(0x47d)]($gamePlayer);if(_0x77be0e['match'](/TURN AWAY FROM HOME/i)&&this[_0x123400(0x395)]){const _0xa1b536=this[_0x123400(0x3a8)],_0x52ca3c=this[_0x123400(0x202)];return this[_0x123400(0x5ec)](_0xa1b536,_0x52ca3c);}if(_0x77be0e[_0x123400(0x223)](/TURN LOWER LEFT/i)){if(_0x123400(0x35b)===_0x123400(0x36b))this[_0x123400(0x2bb)][_0x123400(0x46f)]=_0x5571bb(_0x1292ec['$1']);else return this[_0x123400(0x36a)](0x1);}if(_0x77be0e[_0x123400(0x223)](/TURN LOWER RIGHT/i))return'iXcqm'!==_0x123400(0x5b3)?this[_0x123400(0x36a)](0x3):_0x21604b[0x2][_0x123400(0x223)](/VAR/i)?this['_data'][_0xdd05d2]||0x0:!!this['_data'][_0x16f5ae];if(_0x77be0e[_0x123400(0x223)](/TURN UPPER LEFT/i))return this[_0x123400(0x36a)](0x7);if(_0x77be0e[_0x123400(0x223)](/TURN UPPER RIGHT/i))return this[_0x123400(0x36a)](0x9);if(_0x77be0e[_0x123400(0x223)](/Self Switch[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);if(_0x77be0e[_0x123400(0x223)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x123400(0x1b4)===_0x123400(0x1b4))return this[_0x123400(0x1a6)](RegExp['$1'],RegExp['$2']);else{if(_0x7d581c!=='')_0x574638+='\x0a';_0x4ae2da+=_0x586909['parameters'][0x0];}}if(_0x77be0e[_0x123400(0x223)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return _0x123400(0x356)!==_0x123400(0x356)?_0x4815e4[_0x123400(0x4c5)]:this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x77be0e[_0x123400(0x223)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x3eb9fa=$gameMap[_0x123400(0x31c)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x3eb9fa);}if(_0x77be0e['match'](/TELEPORT TO PLAYER/i))return this[_0x123400(0x49d)]($gamePlayer);if(_0x77be0e['match'](/TELEPORT TO HOME/i)&&this['eventId']){if(_0x123400(0x489)!==_0x123400(0x489))_0x717ef7=_0x2294fc['makeDeepCopy'](_0x2d1859),_0x35a0fe[_0x123400(0x12c)][_0x123400(0x43d)][_0x123400(0x1ee)](this,_0x537a45);else{const _0x4199d0=this[_0x123400(0x3a8)],_0x5be730=this[_0x123400(0x202)];return this[_0x123400(0x499)](_0x4199d0,_0x5be730);}}try{VisuMZ[_0x123400(0x12c)][_0x123400(0x38e)][_0x123400(0x1ee)](this,_0x114b42);}catch(_0x38306e){if('uRipw'!==_0x123400(0x406)){if($gameTemp[_0x123400(0x340)]())console['log'](_0x38306e);}else this['updateScaleBase'](),_0x114b6c['EventsMoveCore'][_0x123400(0x17e)][_0x123400(0x1ee)](this),this[_0x123400(0x2a4)]();}},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x292)]=function(_0x20ad7e){const _0x33af51=_0x3bfc03;$gameTemp[_0x33af51(0x4bd)]([this],_0x20ad7e);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x135)]=function(_0x4ff299){const _0x53d6c8=_0x3bfc03;let _0x20ce9d=0x0;switch(_0x4ff299[_0x53d6c8(0x123)]()['trim']()){case'!':case _0x53d6c8(0x301):_0x20ce9d=0x1;break;case'?':case _0x53d6c8(0x3ea):_0x20ce9d=0x2;break;case'MUSIC':case'NOTE':case _0x53d6c8(0x568):case _0x53d6c8(0x54b):case _0x53d6c8(0x29c):_0x20ce9d=0x3;break;case _0x53d6c8(0x494):case _0x53d6c8(0x170):_0x20ce9d=0x4;break;case _0x53d6c8(0x200):_0x20ce9d=0x5;break;case _0x53d6c8(0x175):_0x20ce9d=0x6;break;case _0x53d6c8(0x583):case _0x53d6c8(0x649):case _0x53d6c8(0x1d2):_0x20ce9d=0x7;break;case _0x53d6c8(0x26a):case'...':_0x20ce9d=0x8;break;case _0x53d6c8(0x121):case _0x53d6c8(0x136):case'LIGHT\x20BULB':case _0x53d6c8(0x650):case _0x53d6c8(0x15e):_0x20ce9d=0x9;break;case'Z':case'ZZ':case _0x53d6c8(0x1d0):case'SLEEP':_0x20ce9d=0xa;break;case _0x53d6c8(0x12b):_0x20ce9d=0xb;break;case _0x53d6c8(0x165):_0x20ce9d=0xc;break;case _0x53d6c8(0x541):_0x20ce9d=0xd;break;case _0x53d6c8(0x47b):_0x20ce9d=0xe;break;case _0x53d6c8(0x44f):_0x20ce9d=0xf;break;}$gameTemp['requestBalloon'](this,_0x20ce9d);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x5e8)]=function(_0x36c908){const _0x1bf0a0=_0x3bfc03;_0x36c908+=this[_0x1bf0a0(0x184)],this[_0x1bf0a0(0x120)](_0x36c908[_0x1bf0a0(0x3cb)](0x0,0xff));if(this['_opacity']<0xff)this[_0x1bf0a0(0x5e4)]--;},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x17c)]=function(_0xa95443){const _0x43c8fc=_0x3bfc03;_0xa95443=this[_0x43c8fc(0x184)]-_0xa95443,this[_0x43c8fc(0x120)](_0xa95443['clamp'](0x0,0xff));if(this['_opacity']>0x0)this[_0x43c8fc(0x5e4)]--;},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x5d5)]=function(_0x5701e4){const _0x28e001=_0x3bfc03,_0x2df2b1=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x35cdd8=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x3bf624=this[_0x28e001(0x403)](),_0x39f2ec=(_0x5701e4===_0x28e001(0x3e1)?_0x2df2b1:_0x35cdd8)[_0x3bf624],_0x3fd4e1=(_0x5701e4===_0x28e001(0x3e1)?_0x35cdd8:_0x2df2b1)[_0x3bf624];if(this[_0x28e001(0x30e)](this['x'],this['y'],_0x39f2ec))_0x5701e4===_0x28e001(0x3e1)?this['turnLeft90']():this[_0x28e001(0x126)]();else!this['canPass'](this['x'],this['y'],this['direction']())&&(_0x28e001(0x372)===_0x28e001(0x372)?this[_0x28e001(0x30e)](this['x'],this['y'],_0x3fd4e1)?_0x5701e4==='left'?this[_0x28e001(0x126)]():this[_0x28e001(0x4b5)]():this[_0x28e001(0x5b1)]():_0x467ce0=[_0x245f11,_0x2f9a73,_0x4b29ec['toUpperCase']()[_0x28e001(0x4d7)]()]);this[_0x28e001(0x30e)](this['x'],this['y'],this['direction']())&&this['moveForward']();},Game_Character[_0x3bfc03(0x1fe)]['processMoveRouteSetIndex']=function(_0x44be82){const _0x3c4a8f=_0x3bfc03;if(ImageManager[_0x3c4a8f(0x334)](this[_0x3c4a8f(0x211)]))return;_0x44be82=_0x44be82['clamp'](0x0,0x7),this[_0x3c4a8f(0x446)](this[_0x3c4a8f(0x211)],_0x44be82);},Game_Character['prototype'][_0x3bfc03(0x33c)]=function(_0x19984b){const _0x49cd63=_0x3bfc03;switch(this[_0x49cd63(0x403)]()){case 0x1:this[_0x49cd63(0x618)](-_0x19984b,_0x19984b);break;case 0x2:this[_0x49cd63(0x618)](0x0,_0x19984b);break;case 0x3:this['jump'](_0x19984b,_0x19984b);break;case 0x4:this[_0x49cd63(0x618)](-_0x19984b,0x0);break;case 0x6:this[_0x49cd63(0x618)](_0x19984b,0x0);break;case 0x7:this[_0x49cd63(0x618)](-_0x19984b,-_0x19984b);break;case 0x8:this[_0x49cd63(0x618)](0x0,-_0x19984b);break;case 0x9:this['jump'](_0x19984b,-_0x19984b);break;}},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x3de)]=function(_0xb50b7d,_0xf8070e){const _0x170925=_0x3bfc03,_0x2eb7ec=Math[_0x170925(0x1d4)](_0xb50b7d-this['x']),_0x275790=Math[_0x170925(0x1d4)](_0xf8070e-this['y']);this[_0x170925(0x618)](_0x2eb7ec,_0x275790);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x655)]=function(_0x1344a8){const _0x4150de=_0x3bfc03;if(_0x1344a8)this[_0x4150de(0x3de)](_0x1344a8['x'],_0x1344a8['y']);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x399)]=function(_0x18c09e,_0x5a07ac,_0x9eacce){const _0x1cfa6d=_0x3bfc03;let _0x351a79=0x0;if(_0x9eacce)$gameTemp[_0x1cfa6d(0x416)]=!![];if($gameMap[_0x1cfa6d(0x400)]())_0x351a79=this[_0x1cfa6d(0x14d)](_0x18c09e,_0x5a07ac);else{if('CmuWB'!==_0x1cfa6d(0x269))_0x351a79=this[_0x1cfa6d(0x42a)](_0x18c09e,_0x5a07ac);else return this[_0x1cfa6d(0x2b8)]();}if(_0x9eacce)$gameTemp[_0x1cfa6d(0x416)]=![];this[_0x1cfa6d(0x417)](_0x351a79),this[_0x1cfa6d(0x46b)](!![]);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x289)]=function(_0x1bd818){const _0x530778=_0x3bfc03;if(_0x1bd818)this[_0x530778(0x399)](_0x1bd818['x'],_0x1bd818['y']);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x24c)]=function(_0x3ab349,_0x6ed190){const _0x91f281=_0x3bfc03,_0x5cf02c=this[_0x91f281(0x53c)](_0x3ab349),_0x4a0d1b=this[_0x91f281(0x48b)](_0x6ed190);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x2d0)]=function(_0x1c2c0c){const _0x5093c8=_0x3bfc03;if(_0x1c2c0c[_0x5093c8(0x223)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x1c2c0c[_0x5093c8(0x223)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4ba)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x125)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x125)]=function(_0x5ddb58,_0x4e6266){const _0xec05e4=_0x3bfc03;if($gameTemp[_0xec05e4(0x416)])return![];return VisuMZ[_0xec05e4(0x12c)]['Game_Event_isCollidedWithPlayerCharacters'][_0xec05e4(0x1ee)](this,_0x5ddb58,_0x4e6266);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x37f)]=function(_0x5c0aea,_0x4ac7ac){const _0x4ff75e=_0x3bfc03,_0x42f4fe=['','LOWER\x20LEFT',_0x4ff75e(0x232),_0x4ff75e(0x171),_0x4ff75e(0x22c),'',_0x4ff75e(0x279),_0x4ff75e(0x593),'UP',_0x4ff75e(0x3ef)],_0x4997d8=_0x42f4fe[_0x4ff75e(0x58d)](_0x5c0aea['toUpperCase']()[_0x4ff75e(0x4d7)]());if(_0x4997d8<=0x0)return;if(_0x4ac7ac)$gameTemp[_0x4ff75e(0x416)]=!![];if(this[_0x4ff75e(0x30e)](this['x'],this['y'],_0x4997d8)){if(_0x4ac7ac)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x4ff75e(0x417)](_0x4997d8),this[_0x4ff75e(0x5e4)]-=0x1;}if(_0x4ac7ac)$gameTemp[_0x4ff75e(0x416)]=![];},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x2a8)]=function(_0x3e0dfc,_0x3a5b0e,_0x15423b){const _0x5a28ab=_0x3bfc03;this[_0x5a28ab(0x399)](_0x3e0dfc,_0x3a5b0e,_0x15423b);if(this['x']!==_0x3e0dfc||this['y']!==_0x3a5b0e)this[_0x5a28ab(0x5e4)]--;},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x5dd)]=function(_0x4885ce,_0x5ae644){const _0x4f1750=_0x3bfc03;if(_0x4885ce&&!_0x4885ce['_erased']){if('xfKOf'!=='rAiYK'){this['processMoveRouteMoveTo'](_0x4885ce['x'],_0x4885ce['y'],_0x5ae644);if(_0x4885ce['isNormalPriority']()&&this['isNormalPriority']()){if(_0x4f1750(0x5c2)!=='Txlws'){const _0x366ef4=$gameMap['distance'](this['x'],this['y'],_0x4885ce['x'],_0x4885ce['y']);if(_0x366ef4<=0x1)this[_0x4f1750(0x5e4)]++;}else return _0xcb8941['event'](this[_0x4f1750(0x5dc)])&&_0x402a21[_0x4f1750(0x12c)]['CustomPageConditions']['metCPC'](_0x490713[_0x4f1750(0x555)],this[_0x4f1750(0x5dc)]);}}else return this[_0x4f1750(0x432)](0x1,_0x2c9f37(_0x542173['$1']));}},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x432)]=function(_0x1af65f,_0x4cdff0){const _0x3975bc=_0x3bfc03;_0x4cdff0=_0x4cdff0||0x0;const _0x3526ba={'code':0x1,'indent':null,'parameters':[]};_0x3526ba['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x1af65f],this[_0x3975bc(0x27e)][_0x3975bc(0x571)][this['_moveRouteIndex']][_0x3975bc(0x181)][0x0]='';while(_0x4cdff0--){this['_moveRoute'][_0x3975bc(0x571)]['splice'](this[_0x3975bc(0x5e4)]+0x1,0x0,_0x3526ba);}},Game_Character[_0x3bfc03(0x1fe)]['processMoveRoutePatternLock']=function(_0x50fa83){const _0x3f2b05=_0x3bfc03;this['_patternLocked']=!![],this[_0x3f2b05(0x1ca)](_0x50fa83);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x5da)]=function(_0x2224f4,_0x30adf5){const _0x217143=_0x3bfc03;if(this===$gamePlayer)return;const _0x102328=[this[_0x217143(0x4f1)],this[_0x217143(0x5dc)],'A'];if(_0x2224f4[_0x217143(0x223)](/\b[ABCD]\b/i))_0x102328[0x2]=String(_0x2224f4)[_0x217143(0x1a7)](0x0)['toUpperCase']()[_0x217143(0x4d7)]();else{if('YlmKg'===_0x217143(0x182))_0x102328[0x2]=_0x217143(0x2d2)['format'](_0x2224f4);else{const _0x411fbe=_0x54f400['EventTemplates'][_0x3cd06e];_0x411fbe&&(_0x3c8ee7[_0x217143(0x48e)]=_0x411fbe['MapID'],_0x18e030[_0x217143(0x395)]=_0x411fbe[_0x217143(0x488)]);}}switch(_0x30adf5[_0x217143(0x123)]()[_0x217143(0x4d7)]()){case'ON':case'TRUE':$gameSelfSwitches[_0x217143(0x623)](_0x102328,!![]);break;case _0x217143(0x201):case _0x217143(0x2db):$gameSelfSwitches[_0x217143(0x623)](_0x102328,![]);break;case _0x217143(0x237):$gameSelfSwitches[_0x217143(0x623)](_0x102328,!$gameSelfSwitches[_0x217143(0x173)](_0x102328));break;}},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x1a6)]=function(_0x4c0268,_0x2babc3){const _0x304ecb=_0x3bfc03;if(this===$gamePlayer)return;const _0x46eeca=[this[_0x304ecb(0x4f1)],this[_0x304ecb(0x5dc)],'Self\x20Variable\x20%1'[_0x304ecb(0x26c)](_0x4c0268)];$gameSelfSwitches[_0x304ecb(0x623)](_0x46eeca,Number(_0x2babc3));},Game_Character[_0x3bfc03(0x1fe)]['processMoveRouteTeleportTo']=function(_0x3ee5b4,_0x1df5d9){const _0x484089=_0x3bfc03;this[_0x484089(0x575)](_0x3ee5b4,_0x1df5d9);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x49d)]=function(_0x5483a1){if(_0x5483a1)this['processMoveRouteTeleportTo'](_0x5483a1['x'],_0x5483a1['y']);},Game_Character['prototype'][_0x3bfc03(0x126)]=function(){const _0x768d=_0x3bfc03;switch(this[_0x768d(0x403)]()){case 0x1:this[_0x768d(0x36a)](0x7);break;case 0x2:this[_0x768d(0x36a)](0x4);break;case 0x3:this[_0x768d(0x36a)](0x1);break;case 0x4:this[_0x768d(0x36a)](0x8);break;case 0x6:this['setDirection'](0x2);break;case 0x7:this[_0x768d(0x36a)](0x9);break;case 0x8:this[_0x768d(0x36a)](0x6);break;case 0x9:this[_0x768d(0x36a)](0x3);break;}},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x4b5)]=function(){const _0x303e2f=_0x3bfc03;switch(this['direction']()){case 0x1:this[_0x303e2f(0x36a)](0x3);break;case 0x2:this[_0x303e2f(0x36a)](0x6);break;case 0x3:this[_0x303e2f(0x36a)](0x9);break;case 0x4:this[_0x303e2f(0x36a)](0x2);break;case 0x6:this[_0x303e2f(0x36a)](0x8);break;case 0x7:this[_0x303e2f(0x36a)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x303e2f(0x36a)](0x7);break;}},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x584)]=function(_0xcdb09d,_0x141465,_0x1efc1f){const _0x3d47f1=_0x3bfc03,_0x7cfd3=this[_0x3d47f1(0x53c)](_0xcdb09d),_0x1d5a34=this[_0x3d47f1(0x48b)](_0x141465);if($gameMap['isSupportDiagonalMovement']()){if(_0x1efc1f||this[_0x3d47f1(0x23e)]()){if(_0x7cfd3>0x0&&_0x1d5a34<0x0)return 0x1;if(_0x7cfd3<0x0&&_0x1d5a34<0x0)return 0x3;if(_0x7cfd3>0x0&&_0x1d5a34>0x0)return 0x7;if(_0x7cfd3<0x0&&_0x1d5a34>0x0)return 0x9;}}if(Math[_0x3d47f1(0x59d)](_0x7cfd3)>Math[_0x3d47f1(0x59d)](_0x1d5a34))return _0x7cfd3>0x0?0x4:0x6;else{if(_0x1d5a34!==0x0)return _0x1d5a34>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x64c)]=function(_0x944bad,_0x505172,_0x487c6b){const _0x3c88b0=_0x3bfc03,_0x143e80=this[_0x3c88b0(0x53c)](_0x944bad),_0x29b71d=this[_0x3c88b0(0x48b)](_0x505172);if($gameMap[_0x3c88b0(0x400)]()){if(_0x487c6b||this[_0x3c88b0(0x23e)]()){if(_0x143e80>0x0&&_0x29b71d<0x0)return 0x9;if(_0x143e80<0x0&&_0x29b71d<0x0)return 0x7;if(_0x143e80>0x0&&_0x29b71d>0x0)return 0x3;if(_0x143e80<0x0&&_0x29b71d>0x0)return 0x1;}}if(Math['abs'](_0x143e80)>Math[_0x3c88b0(0x59d)](_0x29b71d)){if(_0x3c88b0(0x3c7)===_0x3c88b0(0x1fd)){if(!this[_0x3c88b0(0x585)])return;let _0x229640=!!this[_0x3c88b0(0x585)][_0x3c88b0(0x345)];this[_0x3c88b0(0x405)]['x']=_0x12df2c[_0x3c88b0(0x59d)](this['scale']['x'])*(_0x229640?-0x1:0x1);}else return _0x143e80>0x0?0x6:0x4;}else{if(_0x29b71d!==0x0)return _0x29b71d>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x219)]=function(_0xade229,_0x45ff60){const _0x1712e3=_0x3bfc03,_0x252b3c=this[_0x1712e3(0x584)](_0xade229,_0x45ff60,!![]);if(_0x252b3c)this[_0x1712e3(0x417)](_0x252b3c);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x3a9)]=function(_0x43605b,_0x2fe47a){const _0x48fb5d=_0x3bfc03,_0x47218a=this[_0x48fb5d(0x64c)](_0x43605b,_0x2fe47a,!![]);if(_0x47218a)this[_0x48fb5d(0x417)](_0x47218a);},Game_Character['prototype'][_0x3bfc03(0x64e)]=function(_0x3cfa24,_0x50059f){const _0x388fe2=_0x3bfc03,_0x1dc19e=this[_0x388fe2(0x584)](_0x3cfa24,_0x50059f,![]);if(_0x1dc19e)this['setDirection'](_0x1dc19e);},Game_Character['prototype']['turnAwayFromPoint']=function(_0x33bcfd,_0x72e0ed){const _0x1a56ba=_0x3bfc03,_0x1a33f6=this[_0x1a56ba(0x64c)](_0x33bcfd,_0x72e0ed,![]);if(_0x1a33f6)this['setDirection'](_0x1a33f6);},Game_Character['prototype'][_0x3bfc03(0x162)]=function(_0x5736c8){const _0xd1d3be=_0x3bfc03;if(_0x5736c8)this[_0xd1d3be(0x219)](_0x5736c8['x'],_0x5736c8['y']);},Game_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x45b)]=function(_0x48a82a){if(_0x48a82a)this['moveAwayFromPoint'](_0x48a82a['x'],_0x48a82a['y']);},Game_Character[_0x3bfc03(0x1fe)]['turnTowardCharacter']=function(_0x48aef4){const _0x3b6d6b=_0x3bfc03;if(_0x48aef4)this[_0x3b6d6b(0x64e)](_0x48aef4['x'],_0x48aef4['y']);},Game_Character['prototype']['turnAwayFromCharacter']=function(_0x468403){const _0xc023bf=_0x3bfc03;if(_0x468403)this[_0xc023bf(0x5ec)](_0x468403['x'],_0x468403['y']);},VisuMZ[_0x3bfc03(0x12c)]['Game_Player_isDashing']=Game_Player[_0x3bfc03(0x1fe)]['isDashing'],Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x5e0)]=function(){const _0x334220=_0x3bfc03;if(!Game_CharacterBase[_0x334220(0x318)]&&this[_0x334220(0x480)]())return![];if(this[_0x334220(0x30c)])return!![];return VisuMZ[_0x334220(0x12c)][_0x334220(0x5c5)]['call'](this);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x651)]=Game_Player['prototype'][_0x3bfc03(0x591)],Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x591)]=function(){const _0x293eb9=_0x3bfc03;return $gameMap[_0x293eb9(0x400)]()?this[_0x293eb9(0x3ba)]():VisuMZ[_0x293eb9(0x12c)][_0x293eb9(0x651)][_0x293eb9(0x1ee)](this);},Game_Player['prototype'][_0x3bfc03(0x3ba)]=function(){const _0x3722c5=_0x3bfc03;return Input[_0x3722c5(0x4c5)];},Game_Player['prototype']['moveByInput']=function(){const _0x3879b0=_0x3bfc03;if($gameSystem[_0x3879b0(0x32b)]())return 0x0;if(!this[_0x3879b0(0x4af)]()&&this['canMove']()){if(_0x3879b0(0x50a)==='cdTUq'){let _0x2c2e7f=this['getInputDirection']();if(_0x2c2e7f>0x0)$gameTemp[_0x3879b0(0x30f)]();else{if($gameTemp[_0x3879b0(0x26d)]()){const _0x2123d7=$gameTemp[_0x3879b0(0x556)](),_0x198b0a=$gameTemp['destinationY']();if(this[_0x3879b0(0x36d)](_0x2123d7,_0x198b0a))_0x2c2e7f=this[_0x3879b0(0x14d)](_0x2123d7,_0x198b0a);else{if(_0x3879b0(0x594)!==_0x3879b0(0x3e5))_0x2c2e7f=this['findDirectionTo'](_0x2123d7,_0x198b0a);else return this[_0x3879b0(0x432)](0x2,_0x42a142(_0x27a26f['$1']));}}}if(_0x2c2e7f>0x0)_0x3879b0(0x627)===_0x3879b0(0x52b)?this[_0x3879b0(0x1bc)][_0x3879b0(0x160)]()!==this[_0x3879b0(0x5c9)]&&(this[_0x3879b0(0x5c9)]=this[_0x3879b0(0x1bc)][_0x3879b0(0x160)](),this[_0x3879b0(0x18d)]()):(this[_0x3879b0(0x3f8)]=this[_0x3879b0(0x3f8)]||0x0,this['isTurnInPlace']()?_0x3879b0(0x19f)!=='ERrsF'?this['setDirection'](_0x2c2e7f):_0x34388c['morphIntoTemplate'](_0xcedf9b[_0x3879b0(0x368)]):this[_0x3879b0(0x2bd)](_0x2c2e7f),this[_0x3879b0(0x3f8)]++);else{if(_0x3879b0(0x12d)!==_0x3879b0(0x47e))this[_0x3879b0(0x3f8)]=0x0;else{const _0x3510f9=this['event'](_0xe48177);if(_0x3510f9)_0x3510f9[_0x3879b0(0x3dc)]();}}}else return this[_0x3879b0(0x47d)](_0x38f19c);}},Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x328)]=function(){const _0x3440fd=_0x3bfc03,_0x1920b2=VisuMZ[_0x3440fd(0x12c)][_0x3440fd(0x653)][_0x3440fd(0x5cb)];if(!_0x1920b2[_0x3440fd(0x5e7)])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x3440fd(0x5e0)]()||this[_0x3440fd(0x4af)]()||this[_0x3440fd(0x480)]())return![];return this[_0x3440fd(0x3f8)]<_0x1920b2['TurnInPlaceDelay'];},VisuMZ['EventsMoveCore'][_0x3bfc03(0x32c)]=Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x2bd)],Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x2bd)]=function(_0x347bd9){const _0x5a649f=_0x3bfc03;if($gameMap[_0x5a649f(0x400)]())_0x5a649f(0x1f1)!==_0x5a649f(0x2e2)?this[_0x5a649f(0x417)](_0x347bd9):this[_0x5a649f(0x2bb)][_0x5a649f(0x405)]=_0x2f4e80(_0x5f0fa9['$1'])*0.01;else{if('lxKGF'===_0x5a649f(0x235)){let _0x4f09d7=_0x5dadbc[_0x5a649f(0x2d3)]();if(_0x4f09d7>0x0)return _0x16d4d3[_0x5a649f(0x611)]()[_0x5a649f(0x437)](_0x4f09d7-0x1);}else VisuMZ[_0x5a649f(0x12c)]['Game_Player_executeMove']['call'](this,_0x347bd9);}},VisuMZ[_0x3bfc03(0x12c)]['Game_Player_isMapPassable']=Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x5b6)],Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x5b6)]=function(_0x2b1acd,_0x43db96,_0x1836b1){const _0xf9310b=_0x3bfc03;if($gameMap[_0xf9310b(0x130)](_0x2b1acd,_0x43db96,_0x1836b1,_0xf9310b(0x65f))){if(this[_0xf9310b(0x443)]()&&this[_0xf9310b(0x1fa)]()){if('acRVD'===_0xf9310b(0x38c)){if(_0x11a1f8[_0xf9310b(0x2a7)][_0xf9310b(0x484)]===_0x357de8)return![];return _0x470b56[_0xf9310b(0x430)]['includes'](_0x4efefe);}else return this['vehicle']()['isMapPassable'](_0x2b1acd,_0x43db96,_0x1836b1);}else return!![];}if($gameMap[_0xf9310b(0x44e)](_0x2b1acd,_0x43db96,_0x1836b1,_0xf9310b(0x65f)))return![];return VisuMZ['EventsMoveCore'][_0xf9310b(0x5a6)]['call'](this,_0x2b1acd,_0x43db96,_0x1836b1);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x1f7)]=Game_Player['prototype'][_0x3bfc03(0x158)],Game_Player['prototype'][_0x3bfc03(0x158)]=function(_0x15dfe8){const _0x50fb71=_0x3bfc03;VisuMZ[_0x50fb71(0x12c)][_0x50fb71(0x1f7)][_0x50fb71(0x1ee)](this,_0x15dfe8);if(this[_0x50fb71(0x24f)]()){this[_0x50fb71(0x668)](_0x15dfe8);if(_0x15dfe8[_0x50fb71(0x25e)](0x0)&&this[_0x50fb71(0x58c)]()==='standing')this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x15dfe8[_0x50fb71(0x25e)](0x1)||_0x15dfe8['includes'](0x2))&&(_0x50fb71(0x1fb)!=='xUcOY'?this[_0x50fb71(0x55e)](...arguments):this[_0x50fb71(0x505)]());}},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere']=Game_Player[_0x3bfc03(0x1fe)]['checkEventTriggerThere'],Game_Player[_0x3bfc03(0x1fe)]['checkEventTriggerThere']=function(_0x1b7758){const _0x34bbd5=_0x3bfc03;VisuMZ[_0x34bbd5(0x12c)]['Game_Player_checkEventTriggerThere'][_0x34bbd5(0x1ee)](this,_0x1b7758);if(this['canStartLocalEvents']()&&_0x1b7758[_0x34bbd5(0x25e)](0x0)&&this[_0x34bbd5(0x58c)]()===_0x34bbd5(0x5ee)){const _0x4a1ff8=this[_0x34bbd5(0x403)](),_0x522326=$gameMap[_0x34bbd5(0x3a3)](this['x'],_0x4a1ff8),_0x3549a9=$gameMap[_0x34bbd5(0x18c)](this['y'],_0x4a1ff8);this[_0x34bbd5(0x49c)](_0x522326,_0x3549a9);}},Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x668)]=function(_0x3cef5d){const _0xc4e67c=_0x3bfc03;if($gameMap['isEventRunning']())return;if($gameMap[_0xc4e67c(0x2d8)]())return;const _0x435d81=$gameMap[_0xc4e67c(0x501)]();for(const _0x414c30 of _0x435d81){if(!_0x414c30)continue;if(!_0x414c30[_0xc4e67c(0x644)](_0x3cef5d))continue;if(this[_0xc4e67c(0x192)](_0x414c30))return _0x414c30['start']();if(this[_0xc4e67c(0x40f)](_0x414c30))return _0x414c30[_0xc4e67c(0x4a6)]();}},Game_Player[_0x3bfc03(0x1fe)]['meetActivationRegionConditions']=function(_0x5eda99){const _0x9806e7=_0x3bfc03;if($gameMap['isEventRunning']())return![];if($gameMap[_0x9806e7(0x2d8)]())return![];return _0x5eda99[_0x9806e7(0x2c1)]()[_0x9806e7(0x25e)](this[_0x9806e7(0x149)]());},Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x40f)]=function(_0x3fb0b4){const _0x446dda=_0x3bfc03;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x446dda(0x317),'region'][_0x446dda(0x25e)](_0x3fb0b4[_0x446dda(0x658)]()))return![];const _0x436ba3=_0x3fb0b4[_0x446dda(0x658)](),_0x238a78=_0x3fb0b4[_0x446dda(0x14f)]();switch(_0x436ba3){case _0x446dda(0x4da):const _0x2a7815=$gameMap[_0x446dda(0x24d)](this['x'],this['y'],_0x3fb0b4['x'],_0x3fb0b4['y']);return _0x3fb0b4['activationProximityDistance']()>=_0x2a7815;break;case _0x446dda(0x476):return _0x238a78>=Math[_0x446dda(0x59d)](_0x3fb0b4[_0x446dda(0x53c)](this['x']))&&_0x238a78>=Math[_0x446dda(0x59d)](_0x3fb0b4[_0x446dda(0x48b)](this['y']));break;case'row':return _0x238a78>=Math[_0x446dda(0x59d)](_0x3fb0b4['deltaYFrom'](this['y']));break;case'column':return _0x238a78>=Math['abs'](_0x3fb0b4[_0x446dda(0x53c)](this['x']));break;case'default':return![];break;}},Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x49c)]=function(_0x31905f,_0x420676){const _0x44849b=_0x3bfc03;if($gameMap[_0x44849b(0x1cf)]())return;if($gameMap['isAnyEventStarting']())return;let _0x2a0754=VisuMZ['EventsMoveCore'][_0x44849b(0x653)][_0x44849b(0x172)],_0x4f851f=$gameMap[_0x44849b(0x149)](_0x31905f,_0x420676);const _0x39e30a=_0x44849b(0x24e)[_0x44849b(0x26c)](_0x4f851f);if(_0x2a0754[_0x39e30a]){if(_0x44849b(0x3ff)===_0x44849b(0x3ff))$gameTemp[_0x44849b(0x514)](_0x2a0754[_0x39e30a]);else{if(this[_0x44849b(0x280)])return![];return this[_0x44849b(0x185)];}}},Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x58c)]=function(){const _0x1b1f08=_0x3bfc03;return VisuMZ[_0x1b1f08(0x12c)][_0x1b1f08(0x653)][_0x1b1f08(0x332)];},Game_Player['prototype']['startMapCommonEventOnTouch']=function(){const _0xff0425=_0x3bfc03;if($gameMap['isEventRunning']())return;if($gameMap[_0xff0425(0x2d8)]())return;let _0x344a23=VisuMZ['EventsMoveCore'][_0xff0425(0x653)][_0xff0425(0x15b)];const _0x256f44=_0xff0425(0x24e)[_0xff0425(0x26c)](this[_0xff0425(0x149)]());_0x344a23[_0x256f44]&&$gameTemp[_0xff0425(0x514)](_0x344a23[_0x256f44]);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x1d3)]=Game_Player['prototype']['increaseSteps'],Game_Player['prototype'][_0x3bfc03(0x5bc)]=function(){const _0x2a06ff=_0x3bfc03;VisuMZ[_0x2a06ff(0x12c)]['Game_Player_increaseSteps'][_0x2a06ff(0x1ee)](this),VisuMZ['MoveAllSynchTargets'](0x0);},Game_Player[_0x3bfc03(0x1fe)][_0x3bfc03(0x227)]=function(){const _0x2b7e8f=_0x3bfc03;VisuMZ[_0x2b7e8f(0x1d5)](0x0);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x206)]=Game_Follower[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)],Game_Follower['prototype'][_0x3bfc03(0x55e)]=function(_0x595495){const _0x51b763=_0x3bfc03;VisuMZ[_0x51b763(0x12c)][_0x51b763(0x206)][_0x51b763(0x1ee)](this,_0x595495),this['_chaseOff']=![];},Game_Follower[_0x3bfc03(0x1fe)][_0x3bfc03(0x5e0)]=function(){const _0x4432be=_0x3bfc03;if(this[_0x4432be(0x1e4)])return Game_Character[_0x4432be(0x1fe)]['isDashing'][_0x4432be(0x1ee)](this);return $gamePlayer[_0x4432be(0x5e0)]();},Game_Follower[_0x3bfc03(0x1fe)]['isDashingAndMoving']=function(){const _0x2d9887=_0x3bfc03;if(this[_0x2d9887(0x1e4)])return Game_Character['prototype']['isDashingAndMoving']['call'](this);return $gamePlayer[_0x2d9887(0x5bd)]()&&this[_0x2d9887(0x365)];},Game_Follower[_0x3bfc03(0x1fe)][_0x3bfc03(0x5fd)]=function(){const _0x34829f=_0x3bfc03;return $gamePlayer[_0x34829f(0x5fd)]();},Game_Follower[_0x3bfc03(0x1fe)][_0x3bfc03(0x5f2)]=function(){const _0x291796=_0x3bfc03;Game_Character[_0x291796(0x1fe)][_0x291796(0x5f2)]['call'](this),this[_0x291796(0x41e)]>0x0&&(this['_actuallyMoving']=![]);},Game_Follower[_0x3bfc03(0x1fe)]['setChaseOff']=function(_0x347558){const _0x4274cd=_0x3bfc03;this[_0x4274cd(0x1e4)]=_0x347558;},VisuMZ['EventsMoveCore'][_0x3bfc03(0x4a8)]=Game_Follower[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e6)],Game_Follower[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e6)]=function(_0x54b391){const _0x2db69a=_0x3bfc03;if(this[_0x2db69a(0x1e4)])return;if($gameSystem[_0x2db69a(0x17d)]())return;VisuMZ[_0x2db69a(0x12c)]['Game_Follower_chaseCharacter']['call'](this,_0x54b391),this[_0x2db69a(0x365)]=!![];},VisuMZ[_0x3bfc03(0x12c)]['Game_Vehicle_isMapPassable']=Game_Vehicle['prototype'][_0x3bfc03(0x5b6)],Game_Vehicle[_0x3bfc03(0x1fe)][_0x3bfc03(0x5b6)]=function(_0x578fb2,_0x1edec5,_0xd1dad){const _0x2ac142=_0x3bfc03;if($gameMap[_0x2ac142(0x130)](_0x578fb2,_0x1edec5,_0xd1dad,this[_0x2ac142(0x1a8)]))return!![];if($gameMap['isRegionForbidPass'](_0x578fb2,_0x1edec5,_0xd1dad,this[_0x2ac142(0x1a8)]))return![];return VisuMZ[_0x2ac142(0x12c)][_0x2ac142(0x41b)][_0x2ac142(0x1ee)](this,_0x578fb2,_0x1edec5,_0xd1dad);},Game_Vehicle[_0x3bfc03(0x1fe)][_0x3bfc03(0x3eb)]=function(_0x245a4b,_0x1cf1b3,_0x3bc950){const _0x2d9513=_0x3bfc03;if($gameMap['isRegionAllowPass'](_0x245a4b,_0x1cf1b3,_0x3bc950,this[_0x2d9513(0x1a8)]))return!![];if($gameMap[_0x2d9513(0x44e)](_0x245a4b,_0x1cf1b3,_0x3bc950,this[_0x2d9513(0x1a8)]))return![];return VisuMZ[_0x2d9513(0x12c)]['Game_CharacterBase_canPass'][_0x2d9513(0x1ee)]($gamePlayer,_0x245a4b,_0x1cf1b3,_0x3bc950);},VisuMZ['EventsMoveCore'][_0x3bfc03(0x508)]=Game_Vehicle[_0x3bfc03(0x1fe)][_0x3bfc03(0x1dd)],Game_Vehicle['prototype']['isLandOk']=function(_0x5e8e46,_0x4ccd40,_0x4205c3){const _0x5f3405=_0x3bfc03;if($gameMap[_0x5f3405(0x633)](_0x5e8e46,_0x4ccd40,_0x4205c3,this[_0x5f3405(0x1a8)]))return!![];const _0x5e136c=this[_0x5f3405(0x1a8)][_0x5f3405(0x1a7)](0x0)[_0x5f3405(0x123)]()+this['_type']['slice'](0x1),_0x2fd254='%1DockRegionOnly'[_0x5f3405(0x26c)](_0x5e136c);return VisuMZ[_0x5f3405(0x12c)][_0x5f3405(0x653)][_0x5f3405(0x573)][_0x2fd254]?![]:VisuMZ['EventsMoveCore'][_0x5f3405(0x508)][_0x5f3405(0x1ee)](this,_0x5e8e46,_0x4ccd40,_0x4205c3);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x34c)]=Game_Vehicle[_0x3bfc03(0x1fe)][_0x3bfc03(0x230)],Game_Vehicle[_0x3bfc03(0x1fe)][_0x3bfc03(0x230)]=function(){const _0x3e8ca6=_0x3bfc03;VisuMZ[_0x3e8ca6(0x12c)]['Game_Vehicle_initMoveSpeed'][_0x3e8ca6(0x1ee)](this);const _0x2df7e9=VisuMZ[_0x3e8ca6(0x12c)][_0x3e8ca6(0x653)][_0x3e8ca6(0x5cb)];if(this[_0x3e8ca6(0x4ee)]()){if(_0x2df7e9[_0x3e8ca6(0x22b)])this['setMoveSpeed'](_0x2df7e9[_0x3e8ca6(0x22b)]);}else{if(this[_0x3e8ca6(0x3ab)]()){if(_0x2df7e9[_0x3e8ca6(0x577)])this[_0x3e8ca6(0x41c)](_0x2df7e9[_0x3e8ca6(0x577)]);}else{if(this[_0x3e8ca6(0x20b)]()){if(_0x2df7e9[_0x3e8ca6(0x381)])this[_0x3e8ca6(0x41c)](_0x2df7e9[_0x3e8ca6(0x381)]);}}}},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x1af)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)]=function(_0x17dfcf,_0x5d3793){const _0x267516=_0x3bfc03;VisuMZ[_0x267516(0x12c)][_0x267516(0x1af)][_0x267516(0x1ee)](this,_0x17dfcf,_0x5d3793),this[_0x267516(0x1ef)](),this[_0x267516(0x3d3)](),this[_0x267516(0x18a)]();},Game_Map['prototype'][_0x3bfc03(0x32e)]=function(_0x1df177,_0x3cfc1d){const _0x1787a3=_0x3bfc03;return _0x1df177===$gameMap[_0x1787a3(0x48e)]()?$dataMap['events'][_0x3cfc1d]:VisuMZ[_0x1787a3(0x1da)][_0x1df177][_0x1787a3(0x501)][_0x3cfc1d];},VisuMZ['EventsMoveCore'][_0x3bfc03(0x3ec)]=Game_Event['prototype'][_0x3bfc03(0x31c)],Game_Event[_0x3bfc03(0x1fe)]['event']=function(){const _0x298caa=_0x3bfc03;if(this[_0x298caa(0x1bb)]!==undefined){const _0x547776=this[_0x298caa(0x1bb)][_0x298caa(0x48e)],_0x168d7c=this[_0x298caa(0x1bb)][_0x298caa(0x395)];return $gameMap[_0x298caa(0x32e)](_0x547776,_0x168d7c);}if(this[_0x298caa(0x648)]!==undefined){if('nZiIG'!=='jifyB'){const _0xf21780=this[_0x298caa(0x648)][_0x298caa(0x48e)],_0xcb4a81=this[_0x298caa(0x648)]['eventId'];return $gameMap[_0x298caa(0x32e)](_0xf21780,_0xcb4a81);}else{const _0x48b7fb=this[_0x298caa(0x3a8)],_0x4daa5b=this['_randomHomeY'];return this['turnAwayFromPoint'](_0x48b7fb,_0x4daa5b);}}if(this[_0x298caa(0x355)]!==undefined){const _0x33b57c=this[_0x298caa(0x355)][_0x298caa(0x48e)],_0x51f914=this['_eventSpawnData'][_0x298caa(0x395)];return $gameMap[_0x298caa(0x32e)](_0x33b57c,_0x51f914);}if($gameTemp[_0x298caa(0x33f)]!==undefined){if(_0x298caa(0x402)===_0x298caa(0x5e5))return _0x257723['max'](_0x11057d['abs'](this[_0x298caa(0x288)](_0x3c0040,_0xc39ca4)),_0x371597[_0x298caa(0x59d)](this[_0x298caa(0x4ce)](_0x1bd40f,_0x283408)));else{const _0x286d62=$gameTemp[_0x298caa(0x33f)]['mapId'],_0x3a3c85=$gameTemp[_0x298caa(0x33f)]['eventId'];return $gameMap[_0x298caa(0x32e)](_0x286d62,_0x3a3c85);}}return VisuMZ['EventsMoveCore']['Game_Event_event'][_0x298caa(0x1ee)](this);},Game_Event['prototype'][_0x3bfc03(0x4f9)]=function(_0x193845,_0x30608c){const _0x53fc9c=_0x3bfc03;if(_0x193845===0x0||_0x30608c===0x0)return![];if(_0x193845===$gameMap[_0x53fc9c(0x48e)]())return!![];if(!VisuMZ[_0x53fc9c(0x1da)][_0x193845]&&_0x193845!==$gameMap[_0x53fc9c(0x48e)]()){if(_0x53fc9c(0x398)!==_0x53fc9c(0x398)){const _0x132099=this[_0x53fc9c(0x53c)](_0x115daa),_0x913a8=this[_0x53fc9c(0x48b)](_0x18ebe3);}else{if($gameTemp[_0x53fc9c(0x340)]()){if('dOjrO'===_0x53fc9c(0x43a))return this['attachPictureSettings']()['filename']??'';else console[_0x53fc9c(0x59c)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'[_0x53fc9c(0x26c)](_0x193845));}return![];}}return!![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x465)]=Game_Event['prototype'][_0x3bfc03(0x4a6)],Game_Event['prototype']['start']=function(){const _0x138d05=_0x3bfc03;VisuMZ['EventsMoveCore'][_0x138d05(0x465)]['call'](this),Imported[_0x138d05(0x3c0)]&&Input[_0x138d05(0x30a)](VisuMZ['MessageCore']['Settings'][_0x138d05(0x602)]['FastForwardKey'])&&Input[_0x138d05(0x51e)]();},Game_Event['prototype']['setupCopyEvent']=function(){const _0x34b59a=_0x3bfc03,_0x52f327=this[_0x34b59a(0x31c)]()[_0x34b59a(0x565)];if(_0x52f327==='')return;if(DataManager[_0x34b59a(0x3fc)]()||DataManager[_0x34b59a(0x5d8)]())return;const _0x3fd4b1=VisuMZ[_0x34b59a(0x12c)][_0x34b59a(0x653)][_0x34b59a(0x5ae)];let _0x5cbedf=null,_0x2b73b3=0x0,_0x5ea450=0x0;if(_0x52f327['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x2b73b3=Number(RegExp['$1']),_0x5ea450=Number(RegExp['$2']);if(_0x2b73b3===0x0)_0x2b73b3=$gameMap[_0x34b59a(0x48e)]();}else{if(_0x52f327['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x34b59a(0x666)===_0x34b59a(0x412)){if(_0x140123)return _0x36da6a;}else{_0x2b73b3=Number(RegExp['$1']),_0x5ea450=Number(RegExp['$2']);if(_0x2b73b3===0x0)_0x2b73b3=$gameMap[_0x34b59a(0x48e)]();}}else{if(_0x52f327[_0x34b59a(0x223)](/<COPY EVENT:[ ](.*?)>/i)){const _0x64a822=String(RegExp['$1'])['toUpperCase']()[_0x34b59a(0x4d7)]();_0x5cbedf=VisuMZ[_0x34b59a(0x4ca)][_0x64a822];if(!_0x5cbedf)return;_0x2b73b3=_0x5cbedf[_0x34b59a(0x27b)],_0x5ea450=_0x5cbedf[_0x34b59a(0x488)];}}}if(!this[_0x34b59a(0x4f9)](_0x2b73b3,_0x5ea450))return;_0x3fd4b1['PreCopyJS'][_0x34b59a(0x1ee)](this,_0x2b73b3,_0x5ea450,this);if(_0x5cbedf)_0x5cbedf['PreCopyJS']['call'](this,_0x2b73b3,_0x5ea450,this);this[_0x34b59a(0x648)]={'mapId':_0x2b73b3,'eventId':_0x5ea450},this[_0x34b59a(0x1b1)]=-0x2,this[_0x34b59a(0x18d)](),_0x3fd4b1[_0x34b59a(0x1b0)]['call'](this,_0x2b73b3,_0x5ea450,this);if(_0x5cbedf)_0x5cbedf[_0x34b59a(0x1b0)][_0x34b59a(0x1ee)](this,_0x2b73b3,_0x5ea450,this);$gameMap[_0x34b59a(0x407)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d3)]=function(){const _0x3344d9=_0x3bfc03,_0x3df10c=$gameSystem[_0x3344d9(0x164)](this);if(!_0x3df10c)return;const _0x92bb06=_0x3df10c[_0x3344d9(0x19d)][_0x3344d9(0x123)]()[_0x3344d9(0x4d7)]();_0x92bb06!==_0x3344d9(0x291)?this[_0x3344d9(0x1e7)](_0x92bb06,!![]):this[_0x3344d9(0x511)](_0x3df10c['mapId'],_0x3df10c[_0x3344d9(0x395)],!![]);},Game_Event['prototype'][_0x3bfc03(0x511)]=function(_0x57e82b,_0x661cf6,_0xa31363){const _0x34a882=_0x3bfc03;if(!this['checkValidEventerMap'](_0x57e82b,_0x661cf6))return;const _0x39fe83=VisuMZ[_0x34a882(0x12c)][_0x34a882(0x653)][_0x34a882(0x5ae)];if(!_0xa31363)_0x39fe83['PreMorphJS'][_0x34a882(0x1ee)](this,_0x57e82b,_0x661cf6,this);this['_eventMorphData']={'mapId':_0x57e82b,'eventId':_0x661cf6},this['_pageIndex']=-0x2,this[_0x34a882(0x18d)]();if(!_0xa31363)_0x39fe83[_0x34a882(0x656)][_0x34a882(0x1ee)](this,_0x57e82b,_0x661cf6,this);$gameMap['clearEventCache']();},Game_Event['prototype']['morphIntoTemplate']=function(_0x22d349,_0x4c6d83){const _0x20d699=_0x3bfc03;_0x22d349=_0x22d349['toUpperCase']()[_0x20d699(0x4d7)]();const _0x52ed39=VisuMZ[_0x20d699(0x4ca)][_0x22d349];if(!_0x52ed39)return;const _0x3fb152=_0x52ed39[_0x20d699(0x27b)],_0x5db34d=_0x52ed39[_0x20d699(0x488)];if(!this[_0x20d699(0x4f9)](_0x3fb152,_0x5db34d))return;if(!_0x4c6d83)_0x52ed39['PreMorphJS']['call'](this,_0x3fb152,_0x5db34d,this);this[_0x20d699(0x511)](_0x3fb152,_0x5db34d,_0x4c6d83);if(!_0x4c6d83)_0x52ed39[_0x20d699(0x656)][_0x20d699(0x1ee)](this,_0x3fb152,_0x5db34d,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event['prototype']['removeMorph']=function(){const _0xe76e97=_0x3bfc03;this[_0xe76e97(0x1bb)]=undefined,this[_0xe76e97(0x1b1)]=-0x2,this[_0xe76e97(0x18d)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x2b4)]=function(_0x47295c){const _0x2f1b55=_0x3bfc03,_0x5963f1=VisuMZ['EventsMoveCore'][_0x2f1b55(0x653)]['Template'],_0x2ede7b=_0x47295c['template'][_0x2f1b55(0x123)]()[_0x2f1b55(0x4d7)](),_0x50df2d=!['',_0x2f1b55(0x291)][_0x2f1b55(0x25e)](_0x2ede7b);let _0x3e20e0=0x0,_0x256d7c=0x0;if(_0x50df2d){const _0x2a72f4=VisuMZ['EventTemplates'][_0x2ede7b];if(!_0x2a72f4)return;_0x3e20e0=_0x2a72f4['MapID'],_0x256d7c=_0x2a72f4[_0x2f1b55(0x488)];}else _0x3e20e0=_0x47295c['mapId'],_0x256d7c=_0x47295c[_0x2f1b55(0x395)];if(!this[_0x2f1b55(0x4f9)](_0x3e20e0,_0x256d7c))return;if(_0x50df2d){const _0x1b601f=VisuMZ['EventTemplates'][_0x2ede7b];_0x1b601f[_0x2f1b55(0x5ac)][_0x2f1b55(0x1ee)](this,_0x3e20e0,_0x256d7c,this);}_0x5963f1[_0x2f1b55(0x5ac)][_0x2f1b55(0x1ee)](this,_0x3e20e0,_0x256d7c,this),this['_eventSpawnData']=_0x47295c,this['_pageIndex']=-0x2,this['_mapId']=$gameMap[_0x2f1b55(0x48e)](),this[_0x2f1b55(0x5dc)]=_0x47295c[_0x2f1b55(0x665)],this[_0x2f1b55(0x64f)]=_0x47295c['spawnPreserved'],this[_0x2f1b55(0x575)](_0x47295c['x'],_0x47295c['y']),this[_0x2f1b55(0x36a)](_0x47295c[_0x2f1b55(0x403)]),this[_0x2f1b55(0x18d)]();if(_0x50df2d){const _0x1c11fa=VisuMZ['EventTemplates'][_0x2ede7b];if(!_0x1c11fa)return;_0x1c11fa[_0x2f1b55(0x647)][_0x2f1b55(0x1ee)](this,_0x3e20e0,_0x256d7c,this);}_0x5963f1[_0x2f1b55(0x647)][_0x2f1b55(0x1ee)](this,_0x3e20e0,_0x256d7c,this);const _0x26dd5e=SceneManager[_0x2f1b55(0x2a7)];if(_0x26dd5e&&_0x26dd5e[_0x2f1b55(0x18e)])_0x26dd5e[_0x2f1b55(0x18e)][_0x2f1b55(0x293)](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x601)]=function(){const _0x1d7bd3=_0x3bfc03;return!!this[_0x1d7bd3(0x355)];},Game_Event[_0x3bfc03(0x1fe)]['start']=function(){const _0x5a17e5=_0x3bfc03;if(!this[_0x5a17e5(0x571)]())return;const _0x391e40=this[_0x5a17e5(0x571)]()[_0x5a17e5(0x669)](_0x5a28c2=>_0x5a28c2[_0x5a17e5(0x4c1)]!==0x6c&&_0x5a28c2['code']!==0x198);_0x391e40[_0x5a17e5(0x553)]>0x1&&(this[_0x5a17e5(0x5e9)]=!![],this[_0x5a17e5(0x644)]([0x0,0x1,0x2])&&this[_0x5a17e5(0x21d)]());},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x45f)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5ce)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5ce)]=function(){const _0x397f58=_0x3bfc03;VisuMZ['EventsMoveCore']['Game_Event_clearPageSettings'][_0x397f58(0x1ee)](this),this['initEventsMoveCoreEffects'](),this[_0x397f58(0x3d7)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x596)]=Game_Event[_0x3bfc03(0x1fe)]['setupPageSettings'],Game_Event[_0x3bfc03(0x1fe)]['setupPageSettings']=function(){const _0x45cc35=_0x3bfc03;this[_0x45cc35(0x3b5)]=!![],VisuMZ[_0x45cc35(0x12c)][_0x45cc35(0x596)][_0x45cc35(0x1ee)](this),this[_0x45cc35(0x58f)](),this[_0x45cc35(0x3d7)](),this[_0x45cc35(0x3b5)]=![];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x58f)]=function(){const _0x27d096=_0x3bfc03;if(!this['event']())return;this['initEventsMoveCoreEffects'](),this['setupEventsMoveCoreNotetags'](),this[_0x27d096(0x3f5)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x2e5)]=function(){const _0x19a572=_0x3bfc03,_0xd1b5a3=this['event']()[_0x19a572(0x565)];if(_0xd1b5a3==='')return;this[_0x19a572(0x51f)](_0xd1b5a3);},Game_Event['prototype'][_0x3bfc03(0x3f5)]=function(){const _0x1837f4=_0x3bfc03;if(!this[_0x1837f4(0x65c)]())return;const _0x375d5e=this[_0x1837f4(0x571)]();let _0x5112c3='';for(const _0x19c383 of _0x375d5e){if([0x6c,0x198][_0x1837f4(0x25e)](_0x19c383[_0x1837f4(0x4c1)])){if(_0x1837f4(0x376)!==_0x1837f4(0x376))return this[_0x1837f4(0x25a)]===_0x1e6b67&&this[_0x1837f4(0x1f3)](),this[_0x1837f4(0x25a)];else{if(_0x5112c3!=='')_0x5112c3+='\x0a';_0x5112c3+=_0x19c383[_0x1837f4(0x181)][0x0];}}}this[_0x1837f4(0x51f)](_0x5112c3);},Game_Event['prototype'][_0x3bfc03(0x1dc)]=function(){const _0x1336ed=_0x3bfc03,_0x54cb58=VisuMZ[_0x1336ed(0x12c)][_0x1336ed(0x653)];this['_activationProximity']={'type':_0x1336ed(0x317),'distance':0x0,'regionList':[]},this[_0x1336ed(0x1b2)]=![],this[_0x1336ed(0x3d9)](),this[_0x1336ed(0x185)]=![],this['_customZ']=![],this[_0x1336ed(0x4aa)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},$gameSystem[_0x1336ed(0x140)](this),this[_0x1336ed(0x1c2)]=$gameSystem['getEventIconData'](this),this['_labelWindow']={'originalText':'','text':'','visibleRange':_0x54cb58['Label'][_0x1336ed(0x477)],'offsetX':_0x54cb58[_0x1336ed(0x26f)][_0x1336ed(0x19a)],'offsetY':_0x54cb58['Label'][_0x1336ed(0x638)],'hueShift':0x0},this[_0x1336ed(0x345)]=![],this[_0x1336ed(0x43f)]=[],this[_0x1336ed(0x537)]={'target':-0x1,'type':_0x1336ed(0x31f),'delay':0x1,'opacityDelta':0x0},this[_0x1336ed(0x41f)]=_0x54cb58['Movement'][_0x1336ed(0x518)]??0x0,this[_0x1336ed(0x628)]=![],this[_0x1336ed(0x179)]=0x1,this[_0x1336ed(0x174)]=0x1,this[_0x1336ed(0x5c4)]={'visible':!![],'filename':_0x54cb58[_0x1336ed(0x5cb)][_0x1336ed(0x16d)]},this[_0x1336ed(0x54d)](),this[_0x1336ed(0x4ad)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x51f)]=function(_0x5aad5d){const _0x2e3ab5=_0x3bfc03;if(_0x5aad5d[_0x2e3ab5(0x223)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x2e3ab5(0x496)]['regionList']=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x2e3ab5(0x496)]['type']=_0x2e3ab5(0x27c);else{if(_0x5aad5d[_0x2e3ab5(0x223)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x2e3ab5(0x55b)===_0x2e3ab5(0x55b))type=String(RegExp['$1'])[_0x2e3ab5(0x194)]()[_0x2e3ab5(0x4d7)](),this[_0x2e3ab5(0x496)]['type']=type,this['_activationProximity'][_0x2e3ab5(0x24d)]=Number(RegExp['$2']);else{_0x1bd34f=_0x1b2def[_0x2e3ab5(0x123)]()[_0x2e3ab5(0x4d7)]();const _0x370b96=_0x13df02[_0x2e3ab5(0x4ca)][_0xa983f3];if(!_0x370b96)return;const _0x2b0777=_0x370b96[_0x2e3ab5(0x27b)],_0x1677a5=_0x370b96[_0x2e3ab5(0x488)];if(!this['checkValidEventerMap'](_0x2b0777,_0x1677a5))return;if(!_0xd6cf7)_0x370b96[_0x2e3ab5(0x597)]['call'](this,_0x2b0777,_0x1677a5,this);this[_0x2e3ab5(0x511)](_0x2b0777,_0x1677a5,_0x293ce3);if(!_0x4461d3)_0x370b96['PostMorphJS'][_0x2e3ab5(0x1ee)](this,_0x2b0777,_0x1677a5,this);if(_0x4015ee)_0x18113c[_0x2e3ab5(0x407)]();}}}_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this['_attachPicture'][_0x2e3ab5(0x5c6)]=String(RegExp['$1']));if(_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if('mfyTP'===_0x2e3ab5(0x5c7))return this['forceDashing']();else{const _0x434fcf=String(RegExp['$1'])[_0x2e3ab5(0x123)]()[_0x2e3ab5(0x4d7)](),_0x28281d=[_0x2e3ab5(0x1b6),_0x2e3ab5(0x2dc),'MULTIPLY','SCREEN'];this[_0x2e3ab5(0x2bb)][_0x2e3ab5(0x535)]=_0x28281d[_0x2e3ab5(0x58d)](_0x434fcf)[_0x2e3ab5(0x3cb)](0x0,0x3);}}if(_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)){if(_0x2e3ab5(0x157)==='NsWMu')this[_0x2e3ab5(0x2bb)]['maxSize']=Number(RegExp['$1']);else{if(_0x578f78)this[_0x2e3ab5(0x3a9)](_0x1b25e6['x'],_0x58b82d['y']);}}_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2e3ab5(0x2bb)][_0x2e3ab5(0x592)]=Number(RegExp['$1']));if(_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x2e3ab5(0x3cf)!==_0x2e3ab5(0x414))this[_0x2e3ab5(0x2bb)][_0x2e3ab5(0x46f)]=Number(RegExp['$1']);else{if(this[_0x2e3ab5(0x358)](_0x311e86,_0x512082))return![];}}if(_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x2e3ab5(0x62d)!==_0x2e3ab5(0x62d)){for(const _0x4f6d4b of this[_0x2e3ab5(0x28f)]){if(_0x4f6d4b)return _0x4f6d4b;}return null;}else this[_0x2e3ab5(0x2bb)][_0x2e3ab5(0x592)]=Number(RegExp['$1']),this[_0x2e3ab5(0x2bb)][_0x2e3ab5(0x46f)]=Number(RegExp['$2']);}if(_0x5aad5d[_0x2e3ab5(0x223)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)){if(_0x2e3ab5(0x5b2)===_0x2e3ab5(0x5b2))this['_attachPicture'][_0x2e3ab5(0x405)]=Number(RegExp['$1'])*0.01;else return!!this[_0x2e3ab5(0x2e3)](_0x5d6d10);}if(_0x5aad5d[_0x2e3ab5(0x223)](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x2e3ab5(0x203)===_0x2e3ab5(0x203))this[_0x2e3ab5(0x1b2)]=!![];else{_0xb286ba[_0x2e3ab5(0x5a5)](_0x1e92aa,_0x4d3182);const _0x205790=_0x13568b[_0x2e3ab5(0x212)]();if(!_0x5083ce)return;const _0x333fb3=_0x4030b3[_0x2e3ab5(0x31c)](_0x7fe14['EventId']||_0x205790[_0x2e3ab5(0x395)]());if(_0x333fb3)_0x333fb3['saveEventLocation']();}}_0x5aad5d[_0x2e3ab5(0x223)](/<CLICK TRIGGER>/i)&&(this[_0x2e3ab5(0x185)]=!![]);if(_0x5aad5d[_0x2e3ab5(0x223)](/<CUSTOM Z:[ ](.*?)>/i)){if(_0x2e3ab5(0x63d)!=='UXdWF')this['_customZ']=Number(RegExp['$1'])||0x0;else{if(!this[_0x2e3ab5(0x236)])return;this[_0x2e3ab5(0x4b6)](),this[_0x2e3ab5(0x615)]();}}const _0x3abbde=_0x5aad5d[_0x2e3ab5(0x223)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x3abbde){if(_0x2e3ab5(0x1b5)!==_0x2e3ab5(0x4f0))for(const _0x5db0d3 of _0x3abbde){if(_0x5db0d3[_0x2e3ab5(0x223)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x2e3ab5(0x254)!==_0x2e3ab5(0x254)){return _0x449db1[_0x2e3ab5(0x12c)][_0x2e3ab5(0x538)][_0x2e3ab5(0x1ee)](this,_0x37f7c9);;}else{const _0x3292bd=String(RegExp['$1'])[_0x2e3ab5(0x194)]()['trim'](),_0x2d61a1=Number(RegExp['$2']);this[_0x2e3ab5(0x4aa)][_0x3292bd]=_0x2d61a1;}}}else this[_0x2e3ab5(0x270)]='';}_0x5aad5d[_0x2e3ab5(0x223)](/<ICON:[ ](\d+)>/i)&&(this[_0x2e3ab5(0x1c2)][_0x2e3ab5(0x24a)]=Number(RegExp['$1']));_0x5aad5d['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x2e3ab5(0x1c2)][_0x2e3ab5(0x231)]=Number(RegExp['$1']));_0x5aad5d[_0x2e3ab5(0x223)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(_0x2e3ab5(0x15d)==='SCqnQ'?(this[_0x2e3ab5(0x544)]=![],_0x24af81[_0x2e3ab5(0x1ea)](this)):this[_0x2e3ab5(0x1c2)]['bufferY']=Number(RegExp['$1']));_0x5aad5d[_0x2e3ab5(0x223)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2e3ab5(0x1c2)][_0x2e3ab5(0x231)]=Number(RegExp['$1']),this[_0x2e3ab5(0x1c2)]['bufferY']=Number(RegExp['$2']));if(_0x5aad5d[_0x2e3ab5(0x223)](/<ICON BLEND MODE:[ ](.*?)>/i)){if('BVZBK'!=='BVZBK'){if(!_0x4fcb03[_0x2e3ab5(0x450)])return;}else{const _0x22006b=String(RegExp['$1'])[_0x2e3ab5(0x123)]()[_0x2e3ab5(0x4d7)](),_0x77a76c=[_0x2e3ab5(0x1b6),_0x2e3ab5(0x2dc),_0x2e3ab5(0x54f),_0x2e3ab5(0x552)];this[_0x2e3ab5(0x1c2)][_0x2e3ab5(0x535)]=_0x77a76c['indexOf'](_0x22006b)[_0x2e3ab5(0x3cb)](0x0,0x3);}}$gameSystem['setEventIconData'](this,this[_0x2e3ab5(0x1c2)]['iconIndex'],this['_eventIcon'][_0x2e3ab5(0x231)],this[_0x2e3ab5(0x1c2)][_0x2e3ab5(0x57b)],this['_eventIcon'][_0x2e3ab5(0x535)]);if(_0x5aad5d[_0x2e3ab5(0x223)](/<LABEL:[ ](.*?)>/i)){if(_0x2e3ab5(0x640)!==_0x2e3ab5(0x640)){if(_0x32864e[_0x2e3ab5(0x1b3)](_0x3a5830))this['setSelfValue'](_0x1b1042,_0x257ed6);else _0x32a494[_0x2e3ab5(0x404)](_0x1e5ec7)?this[_0x2e3ab5(0x521)](_0x4c1b16,_0x812ab1):_0x191d24['EventsMoveCore']['Game_Variables_setValue'][_0x2e3ab5(0x1ee)](this,_0x540553,_0x5cc3d7);}else{let _0x85483f=String(RegExp['$1'])[_0x2e3ab5(0x4d7)]();this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x513)]=_0x85483f,this['_labelWindow'][_0x2e3ab5(0x249)]=_0x85483f;}}if(_0x5aad5d[_0x2e3ab5(0x223)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x4f6d02=String(RegExp['$1'])[_0x2e3ab5(0x4d7)]();this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x513)]=_0x4f6d02,this['_labelWindow'][_0x2e3ab5(0x249)]=_0x4f6d02;}if(_0x5aad5d[_0x2e3ab5(0x223)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x2e3ab5(0x145)!==_0x2e3ab5(0x145)){if(this[_0x2e3ab5(0x2e7)][_0x2e3ab5(0x405)]['x']>this[_0x2e3ab5(0x405)]['x'])this[_0x2e3ab5(0x2e7)][_0x2e3ab5(0x405)]['x']=_0xd08b8b[_0x2e3ab5(0x5a7)](this[_0x2e3ab5(0x2e7)][_0x2e3ab5(0x405)]['x']+0.1,this[_0x2e3ab5(0x405)]['x']);if(this['_shadowSprite'][_0x2e3ab5(0x405)]['x']<this[_0x2e3ab5(0x405)]['x'])this[_0x2e3ab5(0x2e7)]['scale']['x']=_0x40181b[_0x2e3ab5(0x159)](this[_0x2e3ab5(0x2e7)][_0x2e3ab5(0x405)]['x']-0.1,this['scale']['x']);}else this[_0x2e3ab5(0x1b7)]['offsetX']=Number(RegExp['$1']);}_0x5aad5d['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(_0x2e3ab5(0x3bd)===_0x2e3ab5(0x23b)?this[_0x2e3ab5(0x537)][_0x2e3ab5(0x2d1)]=_0x22ced1(_0x351ebe['$1']):this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x46f)]=Number(RegExp['$1']));if(_0x5aad5d[_0x2e3ab5(0x223)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x2e3ab5(0x1cb)==='HpfXQ'){if([0x2,0x4,0x6,0x8][_0x2e3ab5(0x25e)](_0x5a7789))return 0x0;if([0x1,0x3,0x7,0x9][_0x2e3ab5(0x25e)](_0x563c81))return 0x1;}else this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x592)]=Number(RegExp['$1']),this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x46f)]=Number(RegExp['$2']);}_0x5aad5d[_0x2e3ab5(0x223)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(_0x2e3ab5(0x1d6)!=='jmcpf'?(_0x4d2049[_0x2e3ab5(0x5a5)](_0x3e4d4e,_0x17eb23),_0x28aa75[_0x2e3ab5(0x4ea)](_0x1da8ab[_0x2e3ab5(0x573)])):this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x509)]=Number(RegExp['$1']));this[_0x2e3ab5(0x625)]();_0x5aad5d['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(_0x2e3ab5(0x1e5)===_0x2e3ab5(0x1e5)?this[_0x2e3ab5(0x1b7)][_0x2e3ab5(0x4d1)]=Number(RegExp['$1']):this[_0x2e3ab5(0x46a)]());if(_0x5aad5d[_0x2e3ab5(0x223)](/<MIRROR SPRITE>/i)){if(_0x2e3ab5(0x56b)!=='ImPTI'){if(this[_0x2e3ab5(0x585)][_0x2e3ab5(0x290)]()!=='')return![];}else this[_0x2e3ab5(0x345)]=!![];}if(_0x5aad5d[_0x2e3ab5(0x223)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if('pvjgr'===_0x2e3ab5(0x475)){const _0x3769cc=JSON[_0x2e3ab5(0x63e)]('['+RegExp['$1'][_0x2e3ab5(0x223)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x2e3ab5(0x43f)]['concat'](_0x3769cc),this['_moveOnlyRegions']['remove'](0x0);}else this[_0x2e3ab5(0x1f3)]();}if(_0x5aad5d[_0x2e3ab5(0x223)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x61ff7=String(RegExp['$1']);if(_0x61ff7[_0x2e3ab5(0x223)](/PLAYER/i)){if(_0x2e3ab5(0x19b)===_0x2e3ab5(0x19b))this[_0x2e3ab5(0x537)][_0x2e3ab5(0x422)]=0x0;else return!![];}else _0x61ff7['match'](/EVENT[ ](\d+)/i)&&(this[_0x2e3ab5(0x537)][_0x2e3ab5(0x422)]=Number(RegExp['$1']));}_0x5aad5d[_0x2e3ab5(0x223)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x2e3ab5(0x537)][_0x2e3ab5(0x1a3)]=String(RegExp['$1'])['toLowerCase']()[_0x2e3ab5(0x4d7)]());_0x5aad5d[_0x2e3ab5(0x223)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(_0x2e3ab5(0x321)==='UmrVD'?this[_0x2e3ab5(0x537)][_0x2e3ab5(0x5ca)]=Number(RegExp['$1']):this[_0x2e3ab5(0x1de)]=!![]);_0x5aad5d[_0x2e3ab5(0x223)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch'][_0x2e3ab5(0x2d1)]=Number(RegExp['$1']));if(_0x5aad5d[_0x2e3ab5(0x223)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x5aad5d['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x2e3ab5(0x41f)]=Number(RegExp['$1'])||0x0);_0x5aad5d[_0x2e3ab5(0x223)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]);_0x5aad5d[_0x2e3ab5(0x223)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x2e3ab5(0x179)]=Number(RegExp['$1'])*0.01);if(_0x5aad5d['match'](/<SCALE Y:[ ](\d+)([%％])>/i)){if(_0x2e3ab5(0x1bd)==='cnxOP'){var _0x1d93a5=_0x354ce0[_0x2e3ab5(0x12c)][_0x2e3ab5(0x639)]['call'](this,_0x52eba7);return _0x1d93a5&&this[_0x2e3ab5(0x2af)](_0x11e9c5);}else this[_0x2e3ab5(0x174)]=Number(RegExp['$1'])*0.01;}if(_0x5aad5d[_0x2e3ab5(0x223)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x1d1447=Number(RegExp['$1'])*0.01;this[_0x2e3ab5(0x179)]=_0x1d1447,this[_0x2e3ab5(0x174)]=_0x1d1447;}if(_0x5aad5d[_0x2e3ab5(0x223)](/<HIDE SHADOW>/i)){if(_0x2e3ab5(0x2fc)!=='qmKRU'){const _0x37ffc7=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x2e3ab5(0x403)]()];return _0x4432b1[_0x2e3ab5(0x3a3)](this['x'],_0x37ffc7);}else this[_0x2e3ab5(0x5c4)]['visible']=![];}_0x5aad5d['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x2e3ab5(0x5c4)]['filename']=String(RegExp['$1'])),_0x5aad5d[_0x2e3ab5(0x223)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2e3ab5(0x632)]=Number(RegExp['$1'])),_0x5aad5d[_0x2e3ab5(0x223)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1'])),_0x5aad5d[_0x2e3ab5(0x223)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2e3ab5(0x632)]=Number(RegExp['$1']),this[_0x2e3ab5(0x325)]=Number(RegExp['$2'])),_0x5aad5d[_0x2e3ab5(0x223)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x2e3ab5(0x270)]=String(RegExp['$1'])[_0x2e3ab5(0x123)]()[_0x2e3ab5(0x4d7)]());},Game_Event[_0x3bfc03(0x1fe)]['updateEventLabelText']=function(){const _0x2ca9d3=_0x3bfc03;$gameTemp[_0x2ca9d3(0x1c8)](this),this[_0x2ca9d3(0x1b7)]['text']=this[_0x2ca9d3(0x1b7)]['originalText'];for(;;){if(this[_0x2ca9d3(0x1b7)][_0x2ca9d3(0x513)][_0x2ca9d3(0x223)](/\\V\[(\d+)\]/gi))this[_0x2ca9d3(0x1b7)][_0x2ca9d3(0x513)]=this[_0x2ca9d3(0x1b7)][_0x2ca9d3(0x249)][_0x2ca9d3(0x478)](/\\V\[(\d+)\]/gi,(_0x5bed0a,_0x3ebe5b)=>$gameVariables[_0x2ca9d3(0x173)](parseInt(_0x3ebe5b)));else break;}$gameTemp[_0x2ca9d3(0x563)]();},Game_Event['prototype'][_0x3bfc03(0x421)]=function(){const _0x2a1cd5=_0x3bfc03;this[_0x2a1cd5(0x5ef)]();},Game_Event[_0x3bfc03(0x1fe)]['isNearTheScreen']=function(){const _0xcb41bc=_0x3bfc03;if(this[_0xcb41bc(0x1b2)])return!![];return Game_Character['prototype']['isNearTheScreen'][_0xcb41bc(0x1ee)](this);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x35a)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x2c3)],Game_Event['prototype']['updateSelfMovement']=function(){const _0x518d25=_0x3bfc03;if(this['isPreventSelfMovement']())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement']['call'](this),this[_0x518d25(0x4af)]()&&VisuMZ[_0x518d25(0x394)](this[_0x518d25(0x5dc)]);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x1d1)]=function(){const _0x176a74=_0x3bfc03,_0x23cf9b=VisuMZ[_0x176a74(0x12c)][_0x176a74(0x653)]['Movement'];if($gameMap[_0x176a74(0x1cf)]()&&_0x23cf9b[_0x176a74(0x255)])return!![];if($gameMessage[_0x176a74(0x3e7)]()&&_0x23cf9b['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0x176a74(0x2b9)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];if(!SceneManager['_scene'][_0x176a74(0x5ed)])return!![];return![];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5ef)]=function(){const _0x7d604a=_0x3bfc03,_0x4e2d7c=SceneManager['_scene']['_spriteset'];if(_0x4e2d7c){if(_0x7d604a(0x143)==='zfCIB'){const _0x383eb7=_0x4e2d7c['findTargetSprite'](this);if(_0x383eb7&&_0x383eb7[_0x7d604a(0x2e7)]&&_0x383eb7[_0x7d604a(0x2e7)][_0x7d604a(0x16f)]!==this[_0x7d604a(0x26b)]()){if(_0x7d604a(0x2cf)===_0x7d604a(0x2cf))_0x383eb7['_shadowSprite']['_filename']=this[_0x7d604a(0x26b)](),_0x383eb7['_shadowSprite']['bitmap']=ImageManager[_0x7d604a(0x4df)](_0x383eb7['_shadowSprite'][_0x7d604a(0x16f)]);else return _0x34a60c[_0x7d604a(0x38d)];}}else _0x95eeb0[_0x7d604a(0x12c)][_0x7d604a(0x56e)][_0x7d604a(0x1ee)](this),this['createShadows']();}},Game_Event['prototype'][_0x3bfc03(0x26b)]=function(){const _0xf68fe6=_0x3bfc03;return this[_0xf68fe6(0x5c4)][_0xf68fe6(0x5c6)];},Game_Event['prototype']['isShadowVisible']=function(){const _0x5b330=_0x3bfc03;if(!this[_0x5b330(0x5c4)][_0x5b330(0x4bb)])return![];return Game_CharacterBase[_0x5b330(0x1fe)][_0x5b330(0x351)]['call'](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x160)]=function(){const _0x39a4df=_0x3bfc03;return this[_0x39a4df(0x1b7)]['text'];},Game_Event['prototype'][_0x3bfc03(0x324)]=function(){const _0x1e9afe=_0x3bfc03;return this[_0x1e9afe(0x1b7)][_0x1e9afe(0x4d1)];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5b6)]=function(_0x41d76b,_0x31fd08,_0x46cb8f){const _0x5a2c81=_0x3bfc03;if(this[_0x5a2c81(0x38a)]())return this[_0x5a2c81(0x48a)](_0x41d76b,_0x31fd08,_0x46cb8f);if($gameMap['isRegionAllowPass'](_0x41d76b,_0x31fd08,_0x46cb8f,_0x5a2c81(0x31c)))return!![];if($gameMap['isRegionForbidPass'](_0x41d76b,_0x31fd08,_0x46cb8f,_0x5a2c81(0x31c)))return![];return Game_Character[_0x5a2c81(0x1fe)]['isMapPassable']['call'](this,_0x41d76b,_0x31fd08,_0x46cb8f);},Game_Event['prototype'][_0x3bfc03(0x38a)]=function(){const _0x371d68=_0x3bfc03;if(this[_0x371d68(0x43f)]===undefined)this[_0x371d68(0x1dc)]();return this[_0x371d68(0x43f)][_0x371d68(0x553)]>0x0;},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x48a)]=function(_0x1a1e49,_0x29caa7,_0x460fcc){const _0x346e1d=_0x3bfc03,_0xf08b6=$gameMap['roundXWithDirection'](_0x1a1e49,_0x460fcc),_0x27ac5c=$gameMap[_0x346e1d(0x18c)](_0x29caa7,_0x460fcc),_0x3eda60=$gameMap[_0x346e1d(0x149)](_0xf08b6,_0x27ac5c);return this[_0x346e1d(0x43f)][_0x346e1d(0x25e)](_0x3eda60);},VisuMZ['EventsMoveCore'][_0x3bfc03(0x411)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x657)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x657)]=function(){const _0x5d591d=_0x3bfc03;if(this[_0x5d591d(0x31c)]()&&!$gameTemp[_0x5d591d(0x340)]()){if(_0x5d591d(0x297)===_0x5d591d(0x297)){if(this[_0x5d591d(0x31c)]()[_0x5d591d(0x565)]['match'](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}else return _0x9b5262['PlayerAllow'][_0x5d591d(0x25e)](_0x471c06)||_0x17da87['WalkAllow'][_0x5d591d(0x25e)](_0x1df93c);}return this[_0x5d591d(0x32f)]=![],this[_0x5d591d(0x43c)]=![],this[_0x5d591d(0x31c)]()?VisuMZ[_0x5d591d(0x12c)][_0x5d591d(0x411)][_0x5d591d(0x1ee)](this):-0x1;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x141)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x357)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x357)]=function(_0x1c0663){const _0x47f0de=_0x3bfc03;this[_0x47f0de(0x546)](_0x1c0663),$gameTemp[_0x47f0de(0x1c8)](this);const _0x3de61e=VisuMZ['EventsMoveCore']['Game_Event_meetsConditions'][_0x47f0de(0x1ee)](this,_0x1c0663);return $gameTemp[_0x47f0de(0x563)](),_0x3de61e;},Game_Event[_0x3bfc03(0x1fe)]['hasAdvancedSwitchVariable']=function(){const _0x5e12ee=_0x3bfc03;return this[_0x5e12ee(0x32f)];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x546)]=function(_0x165cea){const _0x99d799=_0x3bfc03,_0x561090=_0x165cea[_0x99d799(0x5f3)];if(_0x561090['switch1Valid']&&DataManager[_0x99d799(0x59b)](_0x561090[_0x99d799(0x226)]))this[_0x99d799(0x32f)]=!![];else{if(_0x561090[_0x99d799(0x4f6)]&&DataManager[_0x99d799(0x59b)](_0x561090['switch2Id'])){if(_0x99d799(0x2c0)!==_0x99d799(0x3af))this['_advancedSwitchVariable']=!![];else return _0x36469f[_0x99d799(0x286)](0x0,0x0,0x0,0x0);}else{if(_0x561090[_0x99d799(0x256)]&&DataManager[_0x99d799(0x426)](_0x561090['variableId'])){if(_0x99d799(0x118)!=='ZUNaT'){let _0x496606=_0x99d799(0x2bc)[_0x99d799(0x26c)](_0x3a3e2e[_0x99d799(0x48e)]);_0x496606+=_0x99d799(0x5f1),_0x496606+=_0x99d799(0x191),_0x496606+=_0x99d799(0x39e),_0x496606+=_0x99d799(0x3e9)[_0x99d799(0x26c)](_0x804cd6[_0x99d799(0x48e)]),_0x56b533(_0x496606);return;}else this[_0x99d799(0x32f)]=!![];}}}},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x471)]=function(){if(this['_erased'])return![];return this['_clickTrigger'];},Game_Event['prototype'][_0x3bfc03(0x53a)]=function(){const _0x1882ff=_0x3bfc03;$gameTemp[_0x1882ff(0x30f)](),this[_0x1882ff(0x4a6)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x3f3)]=function(_0x3bac96,_0x55bbd9){const _0x2e0bd9=_0x3bfc03;if(this[_0x2e0bd9(0x4aa)]){if(_0x2e0bd9(0x3e8)!==_0x2e0bd9(0x4dd))return this['posEventsMoveCore'](_0x3bac96,_0x55bbd9);else _0x53a90c['EventsMoveCore'][_0x2e0bd9(0x12e)][_0x2e0bd9(0x1ee)](this);}else return _0x2e0bd9(0x2f6)===_0x2e0bd9(0x2f6)?Game_Character['prototype'][_0x2e0bd9(0x3f3)]['call'](this,_0x3bac96,_0x55bbd9):this['moveAwayFromPoint'](_0x42d182(_0x2a90e4['$1']),_0x3ed348(_0x4c03c3['$2']));},Game_Event['prototype'][_0x3bfc03(0x154)]=function(_0x19932c,_0x25e002){const _0x14e4f9=_0x3bfc03;var _0x50881e=this['x']-this[_0x14e4f9(0x4aa)][_0x14e4f9(0x3e1)],_0x561ee7=this['x']+this[_0x14e4f9(0x4aa)][_0x14e4f9(0x186)],_0x29ea9c=this['y']-this[_0x14e4f9(0x4aa)]['up'],_0x158193=this['y']+this[_0x14e4f9(0x4aa)][_0x14e4f9(0x641)];return _0x50881e<=_0x19932c&&_0x19932c<=_0x561ee7&&_0x29ea9c<=_0x25e002&&_0x25e002<=_0x158193;},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x30e)]=function(_0x32795d,_0x63b1d1,_0x1905e2){const _0x52c379=_0x3bfc03;for(let _0x1ed7af=-this[_0x52c379(0x4aa)][_0x52c379(0x3e1)];_0x1ed7af<=this[_0x52c379(0x4aa)]['right'];_0x1ed7af++){if(_0x52c379(0x49b)!==_0x52c379(0x1f6))for(let _0x495185=-this['_addedHitbox']['up'];_0x495185<=this[_0x52c379(0x4aa)]['down'];_0x495185++){if('DJlMn'!==_0x52c379(0x307)){if(!Game_Character['prototype'][_0x52c379(0x30e)]['call'](this,_0x32795d+_0x1ed7af,_0x63b1d1+_0x495185,_0x1905e2)){if(_0x52c379(0x389)!==_0x52c379(0x4cb))return![];else _0x51d72e['x']=0x0,_0x4fb2c9['y']=-this[_0x52c379(0x177)]+this[_0x52c379(0x177)]*0x2/0x5,this[_0x52c379(0x585)][_0x52c379(0x224)]()!==0x1&&(_0x38a15d['y']+=0x1);}}else{_0x229ea3=_0x519de8(_0x104ec6['$1']),_0x214180=_0x4e387b(_0x57ef3e['$2']);if(_0x1daa9c===0x0)_0x13ccc0=_0x146620[_0x52c379(0x48e)]();}}else this[_0x52c379(0x23a)]=![];}return!![];},Game_Event['prototype'][_0x3bfc03(0x652)]=function(_0x2a561b,_0x2e012a){const _0xf99d12=_0x3bfc03;if(Imported[_0xf99d12(0x589)]&&this['isSmartEventCollisionOn']())return this['checkSmartEventCollision'](_0x2a561b,_0x2e012a);else{if(_0xf99d12(0x127)!==_0xf99d12(0x127))_0x28be9b['mapId']=_0x3974a0['MapID'],_0xd3578b[_0xf99d12(0x395)]=_0x5a6e1f[_0xf99d12(0x488)];else{const _0x34f999=$gameMap[_0xf99d12(0x5d6)](_0x2a561b,_0x2e012a)[_0xf99d12(0x669)](_0x5e4936=>_0x5e4936!==this);return _0x34f999[_0xf99d12(0x553)]>0x0;}}},Game_Event['prototype']['checkSmartEventCollision']=function(_0x45a0bc,_0x4ea7f7){const _0x1d0f68=_0x3bfc03;if(!this['isNormalPriority']())return![];else{const _0x2d5dcf=$gameMap[_0x1d0f68(0x5d6)](_0x45a0bc,_0x4ea7f7)[_0x1d0f68(0x669)](_0x267a0e=>_0x267a0e!==this&&_0x267a0e[_0x1d0f68(0x44d)]());return _0x2d5dcf[_0x1d0f68(0x553)]>0x0;}},Game_Event[_0x3bfc03(0x1fe)]['activationProximityType']=function(){const _0x6b8fc7=_0x3bfc03;return this[_0x6b8fc7(0x496)][_0x6b8fc7(0x1a3)]||'none';},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x14f)]=function(){const _0x4a8efd=_0x3bfc03;return this[_0x4a8efd(0x496)][_0x4a8efd(0x24d)]||0x0;},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x2c1)]=function(){const _0x2c2fdc=_0x3bfc03;return this[_0x2c2fdc(0x496)]['regionList']||[];},Game_Event[_0x3bfc03(0x1fe)]['increaseSteps']=function(){const _0x475982=_0x3bfc03;Game_Character[_0x475982(0x1fe)][_0x475982(0x5bc)]['call'](this);if([_0x475982(0x317),_0x475982(0x27c)][_0x475982(0x25e)](this[_0x475982(0x658)]()))return;$gamePlayer[_0x475982(0x668)]([0x2]);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x2b3)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x53f)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x53f)]=function(){const _0x312ed9=_0x3bfc03;if(this['_trigger']!==0x3)return;if(this[_0x312ed9(0x3b5)])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x312ed9(0x1a1)](![]))return;VisuMZ['EventsMoveCore'][_0x312ed9(0x2b3)][_0x312ed9(0x1ee)](this);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x119)]=Game_Event[_0x3bfc03(0x1fe)]['updateParallel'],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x434)]=function(){const _0x4da124=_0x3bfc03;if(!this[_0x4da124(0x5aa)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ['EventsMoveCore'][_0x4da124(0x119)][_0x4da124(0x1ee)](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x263)]=function(_0xe83a9e){const _0x234fce=_0x3bfc03;if(!_0xe83a9e&&$gameMap[_0x234fce(0x1cf)]())return![];if(!_0xe83a9e&&$gameMap[_0x234fce(0x2d8)]())return![];if(this[_0x234fce(0x2c1)]()<=0x0)return!![];return $gamePlayer[_0x234fce(0x192)](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x1a1)]=function(_0x138c8a){const _0x47ae54=_0x3bfc03;if(!_0x138c8a&&$gameMap[_0x47ae54(0x1cf)]())return![];if(!_0x138c8a&&$gameMap['isAnyEventStarting']())return![];if([_0x47ae54(0x317),_0x47ae54(0x27c)]['includes'](this['activationProximityType']()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},VisuMZ[_0x3bfc03(0x394)]=function(_0x244522){const _0x2b17f0=_0x3bfc03;for(const _0x18b560 of $gameMap[_0x2b17f0(0x501)]()){if(!_0x18b560)continue;_0x18b560[_0x2b17f0(0x3c6)]()===_0x244522&&_0x18b560[_0x2b17f0(0x3d4)]();}},VisuMZ[_0x3bfc03(0x456)]=function(_0x1f77dd){const _0x382ec4=_0x3bfc03;if(_0x1f77dd===0x0)return $gamePlayer;return $gameMap[_0x382ec4(0x31c)](_0x1f77dd);},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x227)]=function(){},Game_Event['prototype'][_0x3bfc03(0x227)]=function(){const _0x5ddf74=_0x3bfc03;VisuMZ[_0x5ddf74(0x1d5)](this['_eventId']);},VisuMZ[_0x3bfc03(0x1d5)]=function(_0x5916c2){const _0x371bee=_0x3bfc03;for(const _0x364dee of $gameMap[_0x371bee(0x501)]()){if(_0x371bee(0x2f7)!==_0x371bee(0x2f7)){if([0x2,0x4,0x6,0x8][_0x371bee(0x25e)](_0x58fb6d))return 0x2;if([0x1,0x3,0x7,0x9][_0x371bee(0x25e)](_0x1a1c62))return 0x3;}else{if(!_0x364dee)continue;_0x364dee['moveSynchTarget']()===_0x5916c2&&_0x364dee['processMoveSynchDirection']();}}},Game_Event[_0x3bfc03(0x1fe)]['moveSynchTarget']=function(){return this['_moveSynch']['target'];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x50e)]=function(){const _0x1dcbf4=_0x3bfc03;return this[_0x1dcbf4(0x537)][_0x1dcbf4(0x1a3)];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5fd)]=function(){const _0x353425=_0x3bfc03;if(this[_0x353425(0x3c6)]()>=0x0){if(_0x353425(0x2d6)!==_0x353425(0x2d6)){const _0x314d67=_0x507798(_0x3bc686['$1']),_0x5f4c40=_0x52063e(_0x9ca85['$2']),_0x7d01e7=this[_0x353425(0x2d0)](_0x29120a);return this[_0x353425(0x2a8)](_0x314d67,_0x5f4c40,_0x7d01e7);}else{const _0x44c229=VisuMZ[_0x353425(0x456)](this[_0x353425(0x3c6)]());if(_0x44c229)return _0x44c229['realMoveSpeed']();}}return Game_Character[_0x353425(0x1fe)][_0x353425(0x5fd)][_0x353425(0x1ee)](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d4)]=function(){const _0x4bbcdd=_0x3bfc03;this[_0x4bbcdd(0x537)][_0x4bbcdd(0x3e0)]=this[_0x4bbcdd(0x537)][_0x4bbcdd(0x3e0)]||0x0,this[_0x4bbcdd(0x537)][_0x4bbcdd(0x3e0)]--;if(this[_0x4bbcdd(0x537)][_0x4bbcdd(0x3e0)]>0x0)return;this[_0x4bbcdd(0x537)][_0x4bbcdd(0x3e0)]=this[_0x4bbcdd(0x537)][_0x4bbcdd(0x5ca)],this[_0x4bbcdd(0x354)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x4e8)]=function(_0x457a02){const _0x4cb836=_0x3bfc03;if(this[_0x4cb836(0x3c6)]()>=0x0){if(_0x4cb836(0x382)!==_0x4cb836(0x25d)){const _0xf495e7=VisuMZ[_0x4cb836(0x456)](this[_0x4cb836(0x3c6)]());if(_0xf495e7){if(_0x4cb836(0x608)!==_0x4cb836(0x608)){this[_0x4cb836(0x396)]=!![];return;}else{const _0x4501b9=$gameMap[_0x4cb836(0x24d)](this['_realX'],this[_0x4cb836(0x557)],_0xf495e7['_realX'],_0xf495e7[_0x4cb836(0x557)])-0x1,_0xd52d41=Math[_0x4cb836(0x5a7)]($gameMap[_0x4cb836(0x228)](),$gameMap[_0x4cb836(0x40d)]()),_0x2f5376=this[_0x4cb836(0x537)][_0x4cb836(0x2d1)]||0x0;_0x457a02-=Math[_0x4cb836(0x159)](0x0,_0x4501b9)*_0xd52d41*_0x2f5376;}}}else this[_0x4cb836(0x1c2)][_0x4cb836(0x57b)]=_0x515ef8(_0x1ee0b4['$1']);}return _0x457a02;},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x354)]=function(){const _0x1e0427=_0x3bfc03;switch(this[_0x1e0427(0x50e)]()){case _0x1e0427(0x31f):this['processMoveSynchRandom']();break;case _0x1e0427(0x2a2):this['processMoveSynchApproach']();break;case _0x1e0427(0x39f):this['processMoveSynchAway']();break;case _0x1e0427(0x621):this[_0x1e0427(0x466)]();break;case _0x1e0427(0x18b):case _0x1e0427(0x147):this[_0x1e0427(0x27f)]();break;case _0x1e0427(0x217):case _0x1e0427(0x1eb):this[_0x1e0427(0x34b)]();break;case'mirror\x20horizontal':case _0x1e0427(0x4a9):case'mirror\x20horz':case _0x1e0427(0x253):this[_0x1e0427(0x17f)]();break;case'mirror\x20vertical':case _0x1e0427(0x481):case'mirror\x20vert':case _0x1e0427(0x36c):this[_0x1e0427(0x420)]();break;default:this['processMoveSynchRandom']();break;}this['update']();},Game_Event['prototype'][_0x3bfc03(0x57a)]=function(){const _0x135c7f=_0x3bfc03,_0x3dc8b8=[0x2,0x4,0x6,0x8];if($gameMap[_0x135c7f(0x400)]()){if(_0x135c7f(0x31d)===_0x135c7f(0x574))return this[_0x135c7f(0x3b3)](_0x36786b,_0x3f9084);else _0x3dc8b8[_0x135c7f(0x609)](0x1,0x3,0x7,0x9);}const _0x38fb26=[];for(const _0x2b9840 of _0x3dc8b8){if('EtKUU'!==_0x135c7f(0x30d)){if(this[_0x135c7f(0x30e)](this['x'],this['y'],_0x2b9840))_0x38fb26[_0x135c7f(0x609)](_0x2b9840);}else return this[_0x135c7f(0x5ec)](_0x395273(_0x5d6a07['$1']),_0x16034c(_0x4ccffd['$2']));}if(_0x38fb26[_0x135c7f(0x553)]>0x0){const _0x5e104=_0x38fb26[Math[_0x135c7f(0x240)](_0x38fb26[_0x135c7f(0x553)])];this[_0x135c7f(0x417)](_0x5e104);}},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x2b7)]=function(){const _0x2764c2=_0x3bfc03,_0x33bf7c=VisuMZ[_0x2764c2(0x456)](this[_0x2764c2(0x3c6)]());this[_0x2764c2(0x162)](_0x33bf7c);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x1c4)]=function(){const _0x11c356=_0x3bfc03,_0x42a082=VisuMZ[_0x11c356(0x456)](this['moveSynchTarget']());this[_0x11c356(0x45b)](_0x42a082);},Game_Event[_0x3bfc03(0x1fe)]['processMoveSynchCustom']=function(){const _0x529ecc=_0x3bfc03;this[_0x529ecc(0x561)]();},Game_Event['prototype'][_0x3bfc03(0x27f)]=function(){const _0x1c3373=_0x3bfc03,_0x3c8930=VisuMZ[_0x1c3373(0x456)](this[_0x1c3373(0x3c6)]());this[_0x1c3373(0x417)](_0x3c8930[_0x1c3373(0x620)]());},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x34b)]=function(){const _0x3d40b5=_0x3bfc03,_0xe99ab2=VisuMZ[_0x3d40b5(0x456)](this[_0x3d40b5(0x3c6)]());this['executeMoveDir8'](this['reverseDir'](_0xe99ab2[_0x3d40b5(0x620)]()));},Game_Event[_0x3bfc03(0x1fe)]['processMoveSynchMirrorHorz']=function(){const _0x1712af=_0x3bfc03,_0x79804=VisuMZ[_0x1712af(0x456)](this[_0x1712af(0x3c6)]()),_0x36b4a7=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x79804[_0x1712af(0x620)]()];this['executeMoveDir8'](_0x36b4a7);},Game_Event['prototype'][_0x3bfc03(0x420)]=function(){const _0x2c374c=_0x3bfc03,_0x3cc102=VisuMZ[_0x2c374c(0x456)](this[_0x2c374c(0x3c6)]()),_0x1f2a10=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x3cc102['lastMovedDirection']()];this[_0x2c374c(0x417)](_0x1f2a10);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5fc)]=function(){const _0x3fdcfb=_0x3bfc03,_0x2c3da6=VisuMZ[_0x3fdcfb(0x456)](this['moveSynchTarget']()),_0x20df5e=_0x2c3da6[_0x3fdcfb(0x403)]();switch(this[_0x3fdcfb(0x50e)]()){case'mimic':case _0x3fdcfb(0x147):this[_0x3fdcfb(0x36a)](_0x20df5e);break;case _0x3fdcfb(0x217):case'reverse\x20copy':this[_0x3fdcfb(0x36a)](this[_0x3fdcfb(0x273)](_0x20df5e));break;case _0x3fdcfb(0x543):case _0x3fdcfb(0x4a9):case _0x3fdcfb(0x57d):case _0x3fdcfb(0x253):this[_0x3fdcfb(0x36a)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x20df5e]);break;case _0x3fdcfb(0x2f3):case _0x3fdcfb(0x481):case _0x3fdcfb(0x2df):case _0x3fdcfb(0x36c):this[_0x3fdcfb(0x36a)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x20df5e]);break;default:return;}this['update']();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x18a)]=function(){const _0x442e5b=_0x3bfc03,_0xaf62f2=$gameSystem['getSavedEventLocation'](this);if(!_0xaf62f2)return;this['setPosition'](_0xaf62f2['x'],_0xaf62f2['y']),this['refreshBushDepth'](),this[_0x442e5b(0x36a)](_0xaf62f2[_0x442e5b(0x403)]),this[_0x442e5b(0x1b1)]===_0xaf62f2[_0x442e5b(0x4a5)]&&(this[_0x442e5b(0x5e4)]=_0xaf62f2[_0x442e5b(0x294)]);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x60b)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x629)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x629)]=function(){const _0x7a1a54=_0x3bfc03;VisuMZ[_0x7a1a54(0x12c)][_0x7a1a54(0x60b)][_0x7a1a54(0x1ee)](this),!Utils['isMobileDevice']()&&this[_0x7a1a54(0x2f8)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x1bf)]=function(){const _0x1ae99d=_0x3bfc03;Game_Character[_0x1ae99d(0x1fe)][_0x1ae99d(0x1bf)]['call'](this),this['autosaveEventLocation']();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x48d)]=function(){const _0x529fdf=_0x3bfc03;if($gameMap[_0x529fdf(0x533)]())return!![];return this[_0x529fdf(0x628)];},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d7)]=function(){const _0x29276d=_0x3bfc03;if(!this[_0x29276d(0x48d)]())return;this['saveEventLocation']();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x1ea)]=function(){const _0x11b0c0=_0x3bfc03;this[_0x11b0c0(0x544)]=!![];},Game_Event['prototype']['updateSaveEventLocation']=function(){const _0x5f2456=_0x3bfc03;this[_0x5f2456(0x544)]&&this[_0x5f2456(0x46a)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x46a)]=function(){this['_requestSaveEventLocation']=![],$gameSystem['saveEventLocation'](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x53b)]=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x34f)]=function(){const _0x217d19=_0x3bfc03;return $gameSystem[_0x217d19(0x34f)](this)?Game_Character[_0x217d19(0x1fe)][_0x217d19(0x34f)]['call'](this):{'iconIndex':0x0,'bufferX':settings[_0x217d19(0x495)][_0x217d19(0x463)],'bufferY':settings[_0x217d19(0x495)]['BufferY'],'blendMode':settings[_0x217d19(0x495)]['BlendMode']};},Game_Event['prototype'][_0x3bfc03(0x2c9)]=function(){return this['_CPCs'];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4e9)]=Game_Event['prototype'][_0x3bfc03(0x357)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x357)]=function(_0x43257e){const _0x39a3b2=_0x3bfc03,_0x528592=VisuMZ[_0x39a3b2(0x12c)][_0x39a3b2(0x4e9)][_0x39a3b2(0x1ee)](this,_0x43257e);if(!_0x528592)return![];return this[_0x39a3b2(0x5ea)](_0x43257e);},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5ea)]=function(_0x1451db){const _0x364b11=_0x3bfc03;VisuMZ[_0x364b11(0x12c)][_0x364b11(0x5fe)][_0x364b11(0x643)](_0x1451db),this[_0x364b11(0x43c)]=_0x1451db[_0x364b11(0x555)][_0x364b11(0x553)]>0x0;_0x1451db[_0x364b11(0x555)]===undefined&&(_0x364b11(0x1f5)!=='pJIpD'?this[_0x364b11(0x5aa)][_0x364b11(0x337)]():VisuMZ[_0x364b11(0x12c)][_0x364b11(0x5fe)][_0x364b11(0x643)](_0x1451db));if(_0x1451db[_0x364b11(0x555)][_0x364b11(0x553)]>0x0){if(_0x364b11(0x38b)!==_0x364b11(0x38b)){if(!_0x405526[_0x364b11(0x318)]&&this[_0x364b11(0x480)]())return![];if(this[_0x364b11(0x30c)])return!![];return _0x5eb311[_0x364b11(0x12c)][_0x364b11(0x5c5)][_0x364b11(0x1ee)](this);}else return $gameMap[_0x364b11(0x31c)](this[_0x364b11(0x5dc)])&&VisuMZ['EventsMoveCore'][_0x364b11(0x5fe)][_0x364b11(0x46e)](_0x1451db['CPC'],this[_0x364b11(0x5dc)]);}return!![];},VisuMZ['EventsMoveCore'][_0x3bfc03(0x639)]=Game_Troop[_0x3bfc03(0x1fe)][_0x3bfc03(0x357)],Game_Troop[_0x3bfc03(0x1fe)][_0x3bfc03(0x357)]=function(_0x329cfe){const _0x3ddc9d=_0x3bfc03;var _0x3fc2a0=VisuMZ[_0x3ddc9d(0x12c)]['Game_Troop_meetsConditionsCPC'][_0x3ddc9d(0x1ee)](this,_0x329cfe);return _0x3fc2a0&&this[_0x3ddc9d(0x2af)](_0x329cfe);},Game_Troop[_0x3bfc03(0x1fe)][_0x3bfc03(0x2af)]=function(_0x5f54af){const _0x1a1823=_0x3bfc03;_0x5f54af[_0x1a1823(0x555)]===undefined&&VisuMZ['EventsMoveCore'][_0x1a1823(0x5fe)][_0x1a1823(0x643)](_0x5f54af);if(_0x5f54af[_0x1a1823(0x555)][_0x1a1823(0x553)]>0x0){if(_0x1a1823(0x42b)!==_0x1a1823(0x15c))return VisuMZ[_0x1a1823(0x12c)]['CustomPageConditions'][_0x1a1823(0x46e)](_0x5f54af['CPC'],0x0);else{if(_0x3708df)_0x156c27[_0x1a1823(0x24b)](_0x40471d);}}return!![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x28b)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x575)],Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x575)]=function(_0x48cdbf,_0x59bdfc){const _0x5279f7=_0x3bfc03;VisuMZ[_0x5279f7(0x12c)][_0x5279f7(0x28b)][_0x5279f7(0x1ee)](this,_0x48cdbf,_0x59bdfc),this['_randomHomeX']=_0x48cdbf,this[_0x5279f7(0x202)]=_0x59bdfc,this[_0x5279f7(0x3d7)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x361)]=Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x57c)],Game_Event[_0x3bfc03(0x1fe)]['moveTypeRandom']=function(){const _0x3f2cbf=_0x3bfc03,_0x457da6=$gameMap[_0x3f2cbf(0x24d)](this['x'],this['y'],this[_0x3f2cbf(0x3a8)],this[_0x3f2cbf(0x202)]),_0x17cf8b=_0x457da6*(this['_randomMoveWeight']||0x0);if(Math['random']()>=_0x17cf8b){if(_0x3f2cbf(0x11c)!==_0x3f2cbf(0x11c)){if(!this[_0x3f2cbf(0x64a)])return;for(const _0x4e3c06 of this[_0x3f2cbf(0x64a)]){_0x4e3c06&&(_0x4e3c06[_0x3f2cbf(0x153)]=_0x409b6e,_0x4e3c06[_0x3f2cbf(0x18d)]());}}else VisuMZ[_0x3f2cbf(0x12c)][_0x3f2cbf(0x361)][_0x3f2cbf(0x1ee)](this);}else this[_0x3f2cbf(0x5a4)]();},Game_Event[_0x3bfc03(0x1fe)][_0x3bfc03(0x5a4)]=function(){const _0xfc650a=_0x3bfc03,_0x24a455=this[_0xfc650a(0x53c)](this['_randomHomeX']),_0x99b4d9=this[_0xfc650a(0x48b)](this[_0xfc650a(0x202)]);if(Math['abs'](_0x24a455)>Math[_0xfc650a(0x59d)](_0x99b4d9)){if('pfHOk'==='pfHOk')this[_0xfc650a(0x60a)](_0x24a455>0x0?0x4:0x6),!this[_0xfc650a(0x3db)]()&&_0x99b4d9!==0x0&&this[_0xfc650a(0x60a)](_0x99b4d9>0x0?0x8:0x2);else{if(_0x129f69[_0xfc650a(0x340)]())_0x56ecb0['log'](_0x55a9b6);}}else _0x99b4d9!==0x0&&('vEybs'!=='vEybs'?(_0x10000e['x']=_0xec970?_0x571bc2['bufferX']:0x0,_0x405bac['y']=_0xf4ad4c?-this['height']+_0x3d8734['bufferY']:0x0):(this[_0xfc650a(0x60a)](_0x99b4d9>0x0?0x8:0x2),!this[_0xfc650a(0x3db)]()&&_0x24a455!==0x0&&this[_0xfc650a(0x60a)](_0x24a455>0x0?0x4:0x6)));},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d9)]=function(){this['_attachPicture']={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x27a)]=function(){const _0x420ebc=_0x3bfc03;if(this[_0x420ebc(0x2bb)]===undefined)this['clearAttachPictureSettings']();return this[_0x420ebc(0x2bb)];},Game_CharacterBase['prototype'][_0x3bfc03(0x290)]=function(){const _0x4188b0=_0x3bfc03;return this[_0x4188b0(0x27a)]()[_0x4188b0(0x5c6)]??'';},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x614)]=function(){const _0x467a47=_0x3bfc03;return this['attachPictureSettings']()[_0x467a47(0x535)]??0x0;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x452)]=function(){const _0x320096=_0x3bfc03;return this[_0x320096(0x27a)]()['maxSize']??0x0;},Game_CharacterBase[_0x3bfc03(0x1fe)]['attachPictureOffsetX']=function(){const _0x576b4f=_0x3bfc03;return this['attachPictureSettings']()[_0x576b4f(0x592)]??0x0;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x427)]=function(){const _0x310237=_0x3bfc03;return this[_0x310237(0x27a)]()['offsetY']??0x0;},Game_CharacterBase[_0x3bfc03(0x1fe)][_0x3bfc03(0x4e3)]=function(){const _0x4a012c=_0x3bfc03;return this['attachPictureSettings']()[_0x4a012c(0x405)]??0x1;},VisuMZ[_0x3bfc03(0x12c)]['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype'][_0x3bfc03(0x350)],Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x350)]=function(){const _0x9a06a8=_0x3bfc03;if(this[_0x9a06a8(0x331)]===_0x9a06a8(0x504)){if(window[this[_0x9a06a8(0x59a)]])this[_0x9a06a8(0x331)]='',this[_0x9a06a8(0x464)]();else{if(_0x9a06a8(0x2b5)!==_0x9a06a8(0x128))return!![];else this[_0x9a06a8(0x25a)]=![],this[_0x9a06a8(0x5a3)]=!![];}}else{if(_0x9a06a8(0x58b)!==_0x9a06a8(0x66b))return VisuMZ[_0x9a06a8(0x12c)][_0x9a06a8(0x45c)][_0x9a06a8(0x1ee)](this);else this['_eventMorphData']=_0x210c3d,this[_0x9a06a8(0x1b1)]=-0x2,this[_0x9a06a8(0x18d)]();}},VisuMZ[_0x3bfc03(0x12c)]['Game_Interpreter_executeCommand']=Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x532)],Game_Interpreter['prototype'][_0x3bfc03(0x532)]=function(){const _0x5ab5c0=_0x3bfc03,_0x4a554f=$gameMap&&this[_0x5ab5c0(0x5dc)]?$gameMap[_0x5ab5c0(0x31c)](this[_0x5ab5c0(0x5dc)]):null;$gameTemp[_0x5ab5c0(0x1c8)](_0x4a554f);const _0x53745b=VisuMZ[_0x5ab5c0(0x12c)][_0x5ab5c0(0x3b7)][_0x5ab5c0(0x1ee)](this);return $gameTemp['clearSelfTarget'](),_0x53745b;},VisuMZ[_0x3bfc03(0x12c)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x45a)],Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x45a)]=function(_0x32b6ed){const _0x559eef=_0x3bfc03;return $gameTemp[_0x559eef(0x303)](this),VisuMZ[_0x559eef(0x12c)][_0x559eef(0x5bf)][_0x559eef(0x1ee)](this,_0x32b6ed);},Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x2b6)]=function(_0x5a4096){const _0x103698=_0x3bfc03;this[_0x103698(0x276)]=_0x5a4096;const _0xc30c4=_0x103698(0x5c8)[_0x103698(0x26c)](_0x5a4096['mapId'][_0x103698(0x264)](0x3));this[_0x103698(0x59a)]='$callEventMap'+Graphics[_0x103698(0x42e)]+'_'+this[_0x103698(0x395)](),DataManager[_0x103698(0x62a)](this[_0x103698(0x59a)],_0xc30c4),window[this[_0x103698(0x59a)]]?this[_0x103698(0x464)]():this[_0x103698(0x204)]('CallEvent');},Game_Interpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x464)]=function(){const _0x5df819=_0x3bfc03,_0x4c06b3=this['_callEventData'],_0x2b30c2=window[this[_0x5df819(0x59a)]],_0x1dea6b=_0x2b30c2[_0x5df819(0x501)][_0x4c06b3[_0x5df819(0x395)]];if(_0x1dea6b&&_0x1dea6b['pages'][_0x4c06b3[_0x5df819(0x397)]-0x1]){if(_0x5df819(0x3b6)!=='UNQFJ'){const _0x11a6bd=_0x1dea6b[_0x5df819(0x2a1)][_0x4c06b3['pageId']-0x1][_0x5df819(0x571)];this[_0x5df819(0x5db)](_0x11a6bd,this[_0x5df819(0x395)]());}else this['_text']=this['_event'][_0x5df819(0x160)](),this[_0x5df819(0x18d)]();}window[this[_0x5df819(0x59a)]]=undefined,this['_callEventMap']=undefined,this[_0x5df819(0x276)]=undefined;};function Game_CPCInterpreter(){const _0x3a4bcf=_0x3bfc03;this[_0x3a4bcf(0x55e)][_0x3a4bcf(0x3ac)](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x3bfc03(0x341)](Game_Interpreter[_0x3bfc03(0x1fe)]),Game_CPCInterpreter[_0x3bfc03(0x1fe)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x3bfc03(0x51e)]=function(){const _0x311473=_0x3bfc03;Game_Interpreter['prototype']['clear'][_0x311473(0x1ee)](this),this[_0x311473(0x13c)]=![];},Game_CPCInterpreter[_0x3bfc03(0x1fe)]['execute']=function(){const _0x4b7d05=_0x3bfc03;while(this[_0x4b7d05(0x55f)]()){this[_0x4b7d05(0x532)]();}},Game_CPCInterpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x53d)]=function(_0x5401c0){const _0x1db7a6=_0x3bfc03;while(this['isRunning']()){this[_0x1db7a6(0x29e)](_0x5401c0);}},Game_CPCInterpreter['prototype'][_0x3bfc03(0x29e)]=function(_0x356028){const _0x326e8d=_0x3bfc03,_0x27347e=_0x356028;$gameTemp['registerSelfTarget'](_0x27347e);const _0x2eb7c3=VisuMZ[_0x326e8d(0x12c)][_0x326e8d(0x3b7)][_0x326e8d(0x1ee)](this);return $gameTemp[_0x326e8d(0x563)](),_0x2eb7c3;},Game_CPCInterpreter[_0x3bfc03(0x1fe)][_0x3bfc03(0x326)]=function(_0x39c910){const _0x47db57=_0x3bfc03;Game_Interpreter[_0x47db57(0x1fe)][_0x47db57(0x326)][_0x47db57(0x1ee)](this,_0x39c910);if(this[_0x47db57(0x3a7)][_0x47db57(0x329)](_0x3775bd=>_0x3775bd[_0x47db57(0x223)](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x47db57(0x20f)!==_0x47db57(0x20f)){const _0x3790a2=_0x43fce7['eventsXy'](_0x268207,_0x1c41ef);for(const _0xcd0805 of _0x3790a2){if(_0xcd0805&&_0xcd0805['hasClickTrigger']())return _0xcd0805[_0x47db57(0x53a)](),!![];}return _0x4dd0cb[_0x47db57(0x2a9)]()&&_0x3790a2[_0x47db57(0x553)]>0x0&&_0x518648[_0x47db57(0x51e)](),![];}else this['_cpc']=!![];}return!![];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x34d)]=Scene_Map[_0x3bfc03(0x1fe)]['startEncounterEffect'],Scene_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x61c)]=function(){const _0x150907=_0x3bfc03;VisuMZ[_0x150907(0x12c)][_0x150907(0x34d)][_0x150907(0x1ee)](this),this['_spriteset'][_0x150907(0x516)]();},VisuMZ['EventsMoveCore']['Scene_Load_onLoadSuccess']=Scene_Load[_0x3bfc03(0x1fe)][_0x3bfc03(0x387)],Scene_Load[_0x3bfc03(0x1fe)][_0x3bfc03(0x387)]=function(){const _0x5e2871=_0x3bfc03;if($gameMap)$gameMap[_0x5e2871(0x407)]();VisuMZ[_0x5e2871(0x12c)][_0x5e2871(0x342)][_0x5e2871(0x1ee)](this);},VisuMZ['EventsMoveCore']['Sprite_Character_initMembers']=Sprite_Character['prototype'][_0x3bfc03(0x3d0)],Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d0)]=function(){const _0x3eda4d=_0x3bfc03;VisuMZ['EventsMoveCore'][_0x3eda4d(0x366)]['call'](this),this[_0x3eda4d(0x2ae)](),this[_0x3eda4d(0x457)](),this[_0x3eda4d(0x12f)]();},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x2ae)]=function(){const _0x1f669c=_0x3bfc03;this[_0x1f669c(0x43b)]=0xff;},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x457)]=function(){const _0x471950=_0x3bfc03;this[_0x471950(0x148)]=new Sprite(),this[_0x471950(0x148)]['anchor']['x']=0.5,this[_0x471950(0x148)][_0x471950(0x5f7)]['y']=0x1,this[_0x471950(0x3fb)](this[_0x471950(0x148)]),this['updateAttachPictureSprite']();},Sprite_Character['prototype'][_0x3bfc03(0x12f)]=function(){const _0x2915d5=_0x3bfc03;this[_0x2915d5(0x367)]=new Sprite(),this['_eventIconSprite'][_0x2915d5(0x4c2)]=ImageManager['loadSystem'](_0x2915d5(0x42d)),this['_eventIconSprite'][_0x2915d5(0x4c2)]['smooth']=![],this[_0x2915d5(0x367)][_0x2915d5(0x286)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x2915d5(0x5f7)]['x']=0.5,this['_eventIconSprite'][_0x2915d5(0x5f7)]['y']=0x1,this[_0x2915d5(0x3fb)](this[_0x2915d5(0x367)]);},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x23e)]=function(){const _0x1cca59=_0x3bfc03;return this[_0x1cca59(0x211)]&&this[_0x1cca59(0x211)][_0x1cca59(0x223)](/\[VS8\]/i);},Sprite_Character[_0x3bfc03(0x1fe)]['isAutoBufferIcon']=function(){const _0x43af62=_0x3bfc03;return this[_0x43af62(0x23e)]()&&VisuMZ[_0x43af62(0x12c)]['Settings'][_0x43af62(0x22a)][_0x43af62(0x660)];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x197)]=Sprite_Character[_0x3bfc03(0x1fe)]['update'],Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x629)]=function(){const _0xe4af88=_0x3bfc03;VisuMZ[_0xe4af88(0x12c)][_0xe4af88(0x197)][_0xe4af88(0x1ee)](this),this[_0xe4af88(0x4c7)]();},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x5d3)]=function(){const _0x2891c8=_0x3bfc03;Sprite[_0x2891c8(0x1fe)][_0x2891c8(0x5d3)]['call'](this),this['isEventsMoveCoreInvisible']()&&(this[_0x2891c8(0x4bb)]=![]);},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x5cf)]=function(){const _0x206bf2=_0x3bfc03;if(this['getEventIconIndex']()>0x0)return![];if(this['_character']){if(_0x206bf2(0x66c)===_0x206bf2(0x66c)){if(this[_0x206bf2(0x585)][_0x206bf2(0x290)]()!=='')return![];}else{_0x516a82[_0x206bf2(0x5a5)](_0x5a63a1,_0x59745b);const _0x569d5f=_0x4db380[_0x206bf2(0x212)](),_0x51cea0={'template':_0x5bd4be[_0x206bf2(0x368)],'mapId':_0x396283[_0x206bf2(0x562)]||_0x537284[_0x206bf2(0x48e)](),'eventId':_0x4ff62c['EventId']||_0x569d5f[_0x206bf2(0x395)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x577bbb[_0x206bf2(0x4bc)],'spawnEventId':_0x59396c['_spawnedEvents'][_0x206bf2(0x553)]+0x3e8},_0x53c5d2=_0x1544ea[_0x206bf2(0x578)]||0x0;if(!_0x4c318f['PreloadedMaps'][_0x51cea0[_0x206bf2(0x48e)]]&&_0x51cea0[_0x206bf2(0x48e)]!==_0x1b3bfd[_0x206bf2(0x48e)]()){let _0x4ff998=_0x206bf2(0x2bc)[_0x206bf2(0x26c)](_0x51cea0[_0x206bf2(0x48e)]);_0x4ff998+=_0x206bf2(0x5f1),_0x4ff998+=_0x206bf2(0x191),_0x4ff998+=_0x206bf2(0x39e),_0x4ff998+=_0x206bf2(0x3e9)[_0x206bf2(0x26c)](_0x51cea0[_0x206bf2(0x48e)]),_0x4feea4(_0x4ff998);return;}const _0x1af204=_0x271caf[_0x206bf2(0x304)](_0x51cea0,_0x17a37d[_0x206bf2(0x573)],_0x4e38eb['Collision'],_0x2177e4[_0x206bf2(0x616)]);_0x53c5d2&&_0x29abf4[_0x206bf2(0x623)](_0x53c5d2,!!_0x1af204);}}return this[_0x206bf2(0x31a)]()||this[_0x206bf2(0x585)]&&this['_character'][_0x206bf2(0x2d9)]();},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x4c7)]=function(){const _0x5d4c58=_0x3bfc03;this[_0x5d4c58(0x52c)](),this[_0x5d4c58(0x352)](),this[_0x5d4c58(0x1c6)](),this[_0x5d4c58(0x28d)](),this[_0x5d4c58(0x1c0)](),this[_0x5d4c58(0x12a)](),this[_0x5d4c58(0x2ed)]();},VisuMZ[_0x3bfc03(0x12c)]['Sprite_Character_setTileBitmap']=Sprite_Character[_0x3bfc03(0x1fe)]['setTileBitmap'],Sprite_Character[_0x3bfc03(0x1fe)]['setTileBitmap']=function(){const _0xc70448=_0x3bfc03;VisuMZ[_0xc70448(0x12c)]['Sprite_Character_setTileBitmap'][_0xc70448(0x1ee)](this),this[_0xc70448(0x4c2)][_0xc70448(0x540)](this['updateBitmapSmoothing']['bind'](this));},VisuMZ['EventsMoveCore'][_0x3bfc03(0x41a)]=Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x360)],Sprite_Character[_0x3bfc03(0x1fe)]['setCharacterBitmap']=function(){const _0x5e2dce=_0x3bfc03;VisuMZ[_0x5e2dce(0x12c)]['Sprite_Character_setCharacterBitmap'][_0x5e2dce(0x1ee)](this),this[_0x5e2dce(0x4c2)][_0x5e2dce(0x540)](this[_0x5e2dce(0x459)][_0x5e2dce(0x2cb)](this));},Sprite_Character['prototype'][_0x3bfc03(0x459)]=function(){const _0xb6377c=_0x3bfc03;if(!this[_0xb6377c(0x4c2)])return;this['bitmap'][_0xb6377c(0x2ec)]=!!VisuMZ['EventsMoveCore'][_0xb6377c(0x653)][_0xb6377c(0x5cb)][_0xb6377c(0x454)];},VisuMZ[_0x3bfc03(0x12c)]['Sprite_Character_characterPatternY']=Sprite_Character[_0x3bfc03(0x1fe)]['characterPatternY'],Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x33e)]=function(){const _0x44ee53=_0x3bfc03;if(this[_0x44ee53(0x23e)]()){if(_0x44ee53(0x198)===_0x44ee53(0x198))return this[_0x44ee53(0x1df)]();else _0x4281c4[_0x44ee53(0x5a5)](_0x1b49a7,_0x16dc38),_0x2afc45[_0x44ee53(0x62f)]();}else return this[_0x44ee53(0x49e)]();},Sprite_Character['prototype'][_0x3bfc03(0x1df)]=function(){const _0x2b88ac=_0x3bfc03,_0x83905=this[_0x2b88ac(0x585)][_0x2b88ac(0x403)]();let _0x38ac0a=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];if(this[_0x2b88ac(0x585)][_0x2b88ac(0x345)]){if(_0x2b88ac(0x60f)===_0x2b88ac(0x493))return _0xe83749>=0x3e8?(_0x19e185-=0x3e8,this['_spawnedEvents'][_0xc2296f]):_0x553f4b[_0x2b88ac(0x12c)][_0x2b88ac(0x4f3)][_0x2b88ac(0x1ee)](this,_0x5899c6);else _0x38ac0a=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];}return(_0x38ac0a[_0x83905]-0x2)/0x2;},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x49e)]=function(){const _0x867474=_0x3bfc03;let _0x2f4b0d=this[_0x867474(0x585)][_0x867474(0x403)]();if(this['_character']['_mirrorSprite']){if(_0x2f4b0d===0x4)_0x2f4b0d=0x6;else _0x2f4b0d===0x6&&(_0x2f4b0d=0x4);}return(_0x2f4b0d-0x2)/0x2;},Sprite_Character['prototype'][_0x3bfc03(0x52c)]=function(){const _0x21bcb0=_0x3bfc03;this[_0x21bcb0(0x405)]['x']=this[_0x21bcb0(0x585)]['_scaleX']??0x1,this[_0x21bcb0(0x405)]['y']=this[_0x21bcb0(0x585)][_0x21bcb0(0x610)]??0x1;},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x352)]=function(){const _0x14c9f6=_0x3bfc03;if(!VisuMZ[_0x14c9f6(0x12c)][_0x14c9f6(0x653)][_0x14c9f6(0x5cb)][_0x14c9f6(0x207)])return;this[_0x14c9f6(0x309)]=0x0;if(this['isAllowCharacterTilt']()){if(_0x14c9f6(0x436)==='PJHGu'){let _0x3d67da=_0x139e66[_0x14c9f6(0x12c)][_0x14c9f6(0x3df)][_0x14c9f6(0x1ee)](this);return this[_0x14c9f6(0x610)]!==_0x3da486&&(_0x3d67da/=_0x1e64b4[_0x14c9f6(0x159)](this['_scaleY'],0.00001)),_0x2e4776['floor'](_0x3d67da);}else{const _0x4caa6a=VisuMZ['EventsMoveCore'][_0x14c9f6(0x653)][_0x14c9f6(0x5cb)],_0x1963d6=this[_0x14c9f6(0x585)][_0x14c9f6(0x403)]();let _0x45ae18=0x0;if([0x1,0x4,0x7]['includes'](_0x1963d6))_0x45ae18=_0x4caa6a[_0x14c9f6(0x142)];if([0x3,0x6,0x9]['includes'](_0x1963d6))_0x45ae18=_0x4caa6a[_0x14c9f6(0x31e)];if([0x2,0x8][_0x14c9f6(0x25e)](_0x1963d6)){if(_0x14c9f6(0x587)===_0x14c9f6(0x587))_0x45ae18=[-_0x4caa6a[_0x14c9f6(0x512)],0x0,_0x4caa6a[_0x14c9f6(0x512)]][this[_0x14c9f6(0x585)][_0x14c9f6(0x224)]()];else{const _0x28ae80=_0x297c8d[_0x14c9f6(0x456)](this['moveSynchTarget']());if(_0x28ae80){const _0x3ae53e=_0xa460be[_0x14c9f6(0x24d)](this[_0x14c9f6(0x1c9)],this[_0x14c9f6(0x557)],_0x28ae80[_0x14c9f6(0x1c9)],_0x28ae80[_0x14c9f6(0x557)])-0x1,_0x4bf008=_0x50d9e5[_0x14c9f6(0x5a7)](_0x2f24f0[_0x14c9f6(0x228)](),_0x414db1['tileHeight']()),_0x312dab=this[_0x14c9f6(0x537)]['opacityDelta']||0x0;_0x30dcec-=_0x2f8808[_0x14c9f6(0x159)](0x0,_0x3ae53e)*_0x4bf008*_0x312dab;}}}if(this[_0x14c9f6(0x3f7)])_0x45ae18*=-0x1;this[_0x14c9f6(0x309)]=_0x45ae18;}}},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x46d)]=function(){const _0x6653a3=_0x3bfc03;if(this[_0x6653a3(0x2d5)])return![];return this['_character']['isDashingAndMoving']()&&!this[_0x6653a3(0x585)][_0x6653a3(0x480)]()&&!this[_0x6653a3(0x585)][_0x6653a3(0x497)]()&&this[_0x6653a3(0x27d)]()===0x0;},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x1c6)]=function(){const _0x2694aa=_0x3bfc03;if(!this['_shadowSprite'])return;this['_shadowSprite']['x']=this[_0x2694aa(0x585)][_0x2694aa(0x473)](),this[_0x2694aa(0x2e7)]['y']=this['_character'][_0x2694aa(0x35f)](),this[_0x2694aa(0x2e7)][_0x2694aa(0x242)]=this[_0x2694aa(0x242)],this[_0x2694aa(0x2e7)]['visible']=this[_0x2694aa(0x585)][_0x2694aa(0x351)](),this[_0x2694aa(0x2e7)][_0x2694aa(0x547)]=this['_hidden'];if(this[_0x2694aa(0x585)][_0x2694aa(0x2ea)]()){if(_0x2694aa(0x41d)!=='gTqae'){const _0x182fc6=_0x30538f(_0x27aa61['$1'])[_0x2694aa(0x51c)](',')[_0x2694aa(0x2da)](_0x2c9ba8=>_0x149f6a(_0x2c9ba8));for(const _0x9744cd of _0x182fc6){_0x160dcc[_0x2694aa(0x514)](_0x9744cd);}}else this['_shadowSprite'][_0x2694aa(0x405)]['x']=Math[_0x2694aa(0x159)](0x0,this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['x']-0.1),this[_0x2694aa(0x2e7)]['scale']['y']=Math[_0x2694aa(0x159)](0x0,this[_0x2694aa(0x2e7)]['scale']['y']-0.1);}else{if('mDEUr'!==_0x2694aa(0x5b8)){if(this['_shadowSprite']['scale']['x']!==this[_0x2694aa(0x405)]['x']){if(this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['x']>this['scale']['x'])this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['x']=Math[_0x2694aa(0x5a7)](this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['x']+0.1,this[_0x2694aa(0x405)]['x']);if(this[_0x2694aa(0x2e7)]['scale']['x']<this[_0x2694aa(0x405)]['x'])this['_shadowSprite'][_0x2694aa(0x405)]['x']=Math[_0x2694aa(0x159)](this[_0x2694aa(0x2e7)]['scale']['x']-0.1,this[_0x2694aa(0x405)]['x']);}if(this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['y']!==this['scale']['y']){if(this['_shadowSprite'][_0x2694aa(0x405)]['y']>this[_0x2694aa(0x405)]['y'])this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['y']=Math[_0x2694aa(0x5a7)](this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['y']+0.1,this['scale']['y']);if(this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['y']<this[_0x2694aa(0x405)]['y'])this[_0x2694aa(0x2e7)][_0x2694aa(0x405)]['y']=Math[_0x2694aa(0x159)](this[_0x2694aa(0x2e7)]['scale']['y']-0.1,this[_0x2694aa(0x405)]['y']);}}else{let _0x2f0c50=_0x2694aa(0x2bc)[_0x2694aa(0x26c)](_0x1b451b[_0x2694aa(0x48e)]);_0x2f0c50+=_0x2694aa(0x5f1),_0x2f0c50+=_0x2694aa(0x191),_0x2f0c50+=_0x2694aa(0x39e),_0x2f0c50+=_0x2694aa(0x3e9)[_0x2694aa(0x26c)](_0x10f234[_0x2694aa(0x48e)]),_0x455c83(_0x2f0c50);return;}}},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x28d)]=function(){const _0xb2aac9=_0x3bfc03;if(!this[_0xb2aac9(0x367)])return;const _0x44dfe9=this[_0xb2aac9(0x367)],_0x520e04=this[_0xb2aac9(0x27d)]();if(_0x520e04<=0x0){if(_0xb2aac9(0x48f)==='lpxhL')return _0x44dfe9['setFrame'](0x0,0x0,0x0,0x0);else{if(!this[_0xb2aac9(0x585)])return;if(this[_0xb2aac9(0x585)][_0xb2aac9(0x491)]===_0x1030c5)return;if(this[_0xb2aac9(0x585)]['_customZ']===![])return;this['z']=this[_0xb2aac9(0x585)][_0xb2aac9(0x491)],this['z']<0x0?this[_0xb2aac9(0x2e7)]['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0;}}else{if(_0xb2aac9(0x5b0)!==_0xb2aac9(0x152)){const _0x4e2684=ImageManager[_0xb2aac9(0x1ba)],_0x58cabd=ImageManager[_0xb2aac9(0x278)],_0x130ecd=_0x520e04%0x10*_0x4e2684,_0x1e4b4d=Math[_0xb2aac9(0x606)](_0x520e04/0x10)*_0x58cabd;_0x44dfe9[_0xb2aac9(0x286)](_0x130ecd,_0x1e4b4d,_0x4e2684,_0x58cabd),this[_0xb2aac9(0x4bb)]=!![];}else this['opacity']=0x0;}const _0x491064=this['_character']['getEventIconData']();this[_0xb2aac9(0x3fe)]()?this[_0xb2aac9(0x320)](_0x44dfe9):(_0x44dfe9['x']=_0x491064?_0x491064[_0xb2aac9(0x231)]:0x0,_0x44dfe9['y']=_0x491064?-this[_0xb2aac9(0x177)]+_0x491064[_0xb2aac9(0x57b)]:0x0),_0x44dfe9[_0xb2aac9(0x535)]=_0x491064?_0x491064[_0xb2aac9(0x535)]:0x0,this[_0xb2aac9(0x2e8)](_0x44dfe9),this[_0xb2aac9(0x3fb)](_0x44dfe9),_0x44dfe9[_0xb2aac9(0x309)]=-this['rotation'];},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x1c0)]=function(){const _0x2559f1=_0x3bfc03;if(!this['_character'])return;if(this[_0x2559f1(0x585)][_0x2559f1(0x491)]===undefined)return;if(this[_0x2559f1(0x585)]['_customZ']===![])return;this['z']=this[_0x2559f1(0x585)][_0x2559f1(0x491)],this['z']<0x0?this[_0x2559f1(0x2e7)]['z']=this['z']-0x1:this[_0x2559f1(0x2e7)]['z']=0x0;},Sprite_Character['prototype'][_0x3bfc03(0x12a)]=function(){const _0x3ebf42=_0x3bfc03;if(!this[_0x3ebf42(0x585)])return;let _0x3d54f4=!!this[_0x3ebf42(0x585)][_0x3ebf42(0x345)];this[_0x3ebf42(0x405)]['x']=Math[_0x3ebf42(0x59d)](this[_0x3ebf42(0x405)]['x'])*(_0x3d54f4?-0x1:0x1);},Sprite_Character['prototype'][_0x3bfc03(0x320)]=function(_0x28ee82){const _0x69e8f9=_0x3bfc03;_0x28ee82['x']=0x0,_0x28ee82['y']=-this[_0x69e8f9(0x177)]+this[_0x69e8f9(0x177)]*0x2/0x5;if(this[_0x69e8f9(0x585)]['pattern']()!==0x1){if(_0x69e8f9(0x4ab)!==_0x69e8f9(0x14c))_0x28ee82['y']+=0x1;else return!![];}},Sprite_Character['prototype'][_0x3bfc03(0x27d)]=function(){const _0x44941c=_0x3bfc03;if(!this[_0x44941c(0x585)])return 0x0;if(this[_0x44941c(0x585)][_0x44941c(0x280)])return 0x0;const _0x5621df=this[_0x44941c(0x585)][_0x44941c(0x34f)]();return _0x5621df?_0x5621df[_0x44941c(0x24a)]||0x0:0x0;},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x2ed)]=function(){const _0x375764=_0x3bfc03;if(!this[_0x375764(0x148)])return;if(!this[_0x375764(0x585)])return;this[_0x375764(0x2ba)](),this[_0x375764(0x61e)]();},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x2ba)]=function(){const _0x5a87ce=_0x3bfc03;if(!this['needsAttachPictureUpdate']())return;const _0x4082f1=this[_0x5a87ce(0x585)][_0x5a87ce(0x27a)]();this['_lastAttachPictureFilename']=_0x4082f1[_0x5a87ce(0x5c6)],this['_lastAttachPictureMaxSize']=_0x4082f1[_0x5a87ce(0x410)],this[_0x5a87ce(0x37c)]=_0x4082f1['scale'];if(_0x4082f1[_0x5a87ce(0x5c6)]!==''){const _0x433a7a=ImageManager[_0x5a87ce(0x4d3)](_0x4082f1[_0x5a87ce(0x5c6)]);_0x433a7a['addLoadListener'](this['onLoadAttachPicture'][_0x5a87ce(0x2cb)](this,_0x433a7a));}else{if(_0x5a87ce(0x47c)!==_0x5a87ce(0x47c)){if(!this['needsAttachPictureUpdate']())return;const _0x1029f7=this['_character'][_0x5a87ce(0x27a)]();this['_lastAttachPictureFilename']=_0x1029f7[_0x5a87ce(0x5c6)],this[_0x5a87ce(0x144)]=_0x1029f7[_0x5a87ce(0x410)],this[_0x5a87ce(0x37c)]=_0x1029f7[_0x5a87ce(0x405)];if(_0x1029f7[_0x5a87ce(0x5c6)]!==''){const _0x51c73c=_0x345e7e[_0x5a87ce(0x4d3)](_0x1029f7[_0x5a87ce(0x5c6)]);_0x51c73c[_0x5a87ce(0x540)](this[_0x5a87ce(0x28c)][_0x5a87ce(0x2cb)](this,_0x51c73c));}else this[_0x5a87ce(0x148)][_0x5a87ce(0x4c2)]=new _0x31c867(0x1,0x1);}else this['_attachPictureSprite']['bitmap']=new Bitmap(0x1,0x1);}},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x61e)]=function(){const _0x40f256=_0x3bfc03,_0x1dd1be=this[_0x40f256(0x148)];_0x1dd1be['x']=this[_0x40f256(0x585)]['attachPictureOffsetX'](),_0x1dd1be['y']=this[_0x40f256(0x585)]['attachPictureOffsetY'](),_0x1dd1be[_0x40f256(0x535)]=this[_0x40f256(0x585)][_0x40f256(0x614)]();},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x3b0)]=function(){const _0x299709=_0x3bfc03,_0x5670b1=this[_0x299709(0x585)]['attachPictureSettings']();if(_0x5670b1){if(this[_0x299709(0x462)]!==_0x5670b1['filename'])return!![];if(this['_lastAttachPictureMaxSize']!==_0x5670b1['maxSize'])return!![];if(this['_lastAttachPictureScale']!==_0x5670b1[_0x299709(0x405)])return!![];}return![];},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x28c)]=function(_0x344bef){const _0x31ca15=_0x3bfc03,_0x5f173c=this[_0x31ca15(0x148)];_0x5f173c[_0x31ca15(0x4c2)]=_0x344bef;const _0x295f75=this[_0x31ca15(0x585)]['attachPictureSettings'](),_0x3d4be4=_0x295f75[_0x31ca15(0x410)],_0x4f4d8a=_0x295f75[_0x31ca15(0x405)];let _0x220eb7=0x1;if(_0x3d4be4>0x0){let _0x2f8fec=this[_0x31ca15(0x63f)]()||0x1,_0x54abc8=this[_0x31ca15(0x3e6)]()||0x1;const _0x12752c=Math[_0x31ca15(0x159)](0x1,_0x2f8fec,_0x54abc8);_0x220eb7=_0x3d4be4/_0x12752c;}_0x220eb7*=_0x4f4d8a;if(_0x220eb7!==0x1){if(_0x31ca15(0x216)===_0x31ca15(0x216))this[_0x31ca15(0x148)][_0x31ca15(0x4c2)][_0x31ca15(0x2ec)]=!![];else{const _0x1b106d=this[_0x31ca15(0x236)][_0x31ca15(0x11b)]();this[_0x31ca15(0x236)][_0x31ca15(0x50d)](this[_0x31ca15(0x5c9)],_0x1b106d,0x0);}}_0x5f173c[_0x31ca15(0x405)]['x']=_0x220eb7,_0x5f173c[_0x31ca15(0x405)]['y']=_0x220eb7,this[_0x31ca15(0x4bb)]=!![],this['updateAttachPictureBitmap']();},Sprite_Character[_0x3bfc03(0x1fe)][_0x3bfc03(0x63f)]=function(){const _0x34277b=_0x3bfc03,_0x1a2160=this[_0x34277b(0x148)];if(!_0x1a2160)return 0x0;return _0x1a2160['bitmap']['width'];},Sprite_Character['prototype'][_0x3bfc03(0x3e6)]=function(){const _0x4b96e2=_0x3bfc03,_0x4b8814=this[_0x4b96e2(0x148)];if(!_0x4b8814)return 0x0;return _0x4b8814[_0x4b96e2(0x4c2)][_0x4b96e2(0x177)];},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x364)]=Sprite_Balloon[_0x3bfc03(0x1fe)]['setup'],Sprite_Balloon[_0x3bfc03(0x1fe)]['setup']=function(_0x514304,_0x2b10eb){const _0x2766f4=_0x3bfc03;VisuMZ[_0x2766f4(0x12c)][_0x2766f4(0x364)][_0x2766f4(0x1ee)](this,_0x514304,_0x2b10eb),VisuMZ[_0x2766f4(0x12c)][_0x2766f4(0x653)]['VS8'][_0x2766f4(0x50b)]&&('BgTJM'==='BgTJM'?this[_0x2766f4(0x209)]['_character'][_0x2766f4(0x54a)](_0x2b10eb,this[_0x2766f4(0x29d)]):_0xa436f1[_0x2766f4(0x555)]['push'](_0x531816));},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x2a5)]=Sprite_Balloon[_0x3bfc03(0x1fe)][_0x3bfc03(0x634)],Sprite_Balloon[_0x3bfc03(0x1fe)]['updatePosition']=function(){const _0x54065d=_0x3bfc03;VisuMZ[_0x54065d(0x12c)][_0x54065d(0x2a5)][_0x54065d(0x1ee)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x3bfc03(0x1fe)]['updateVS8BalloonOffsets']=function(){const _0x2a82be=_0x3bfc03;this['_target'][_0x2a82be(0x585)][_0x2a82be(0x23e)]()&&(this['x']+=VisuMZ[_0x2a82be(0x12c)][_0x2a82be(0x653)]['VS8'][_0x2a82be(0x16b)],this['y']+=VisuMZ[_0x2a82be(0x12c)][_0x2a82be(0x653)][_0x2a82be(0x22a)][_0x2a82be(0x4d5)]);},Sprite_Timer[_0x3bfc03(0x1fe)][_0x3bfc03(0x4be)]=function(){const _0x41c35a=_0x3bfc03;this['bitmap']=new Bitmap(Math[_0x41c35a(0x1d4)](Graphics[_0x41c35a(0x474)]/0x2),0x30),this[_0x41c35a(0x4c2)][_0x41c35a(0x2fa)]=this[_0x41c35a(0x2fa)](),this['bitmap']['fontSize']=this[_0x41c35a(0x470)](),this[_0x41c35a(0x4c2)][_0x41c35a(0x5ad)]=ColorManager['outlineColor']();},Sprite_Timer[_0x3bfc03(0x1fe)]['timerText']=function(){const _0x4f5afa=_0x3bfc03,_0x39562b=Math[_0x4f5afa(0x606)](this[_0x4f5afa(0x2a3)]/0x3c/0x3c),_0x275b93=Math['floor'](this[_0x4f5afa(0x2a3)]/0x3c)%0x3c,_0x2568be=this['_seconds']%0x3c;let _0x5f1c8e=_0x275b93[_0x4f5afa(0x264)](0x2)+':'+_0x2568be[_0x4f5afa(0x264)](0x2);if(_0x39562b>0x0)_0x5f1c8e=_0x4f5afa(0x37b)['format'](_0x39562b,_0x5f1c8e);return _0x5f1c8e;};function Sprite_EventLabel(){const _0x549daf=_0x3bfc03;this[_0x549daf(0x55e)](...arguments);}Sprite_EventLabel['prototype']=Object[_0x3bfc03(0x341)](Sprite[_0x3bfc03(0x1fe)]),Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x484)]=Sprite_EventLabel,Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x55e)]=function(_0x2da256){const _0x2d2752=_0x3bfc03;this['_event']=_0x2da256,Sprite[_0x2d2752(0x1fe)][_0x2d2752(0x55e)][_0x2d2752(0x1ee)](this),this[_0x2d2752(0x3d0)](),this['createProxyWindow']();},Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d0)]=function(){const _0x10b03d=_0x3bfc03;this[_0x10b03d(0x5f7)]['x']=0.5,this[_0x10b03d(0x5f7)]['y']=0x1;},Sprite_EventLabel['prototype'][_0x3bfc03(0x646)]=function(){const _0x2b4d2a=_0x3bfc03,_0xa735fb=new Rectangle(0x0,0x0,0x1,0x1);this[_0x2b4d2a(0x236)]=new Window_Base(_0xa735fb),this[_0x2b4d2a(0x236)][_0x2b4d2a(0x377)]=0x0,this[_0x2b4d2a(0x242)]=this['isLabelVisible']()?0xff:0x0;},Sprite_EventLabel[_0x3bfc03(0x1fe)]['update']=function(){const _0x147d87=_0x3bfc03;Sprite[_0x147d87(0x1fe)]['update'][_0x147d87(0x1ee)](this),this[_0x147d87(0x28e)](),this[_0x147d87(0x3ed)](),this[_0x147d87(0x634)](),this[_0x147d87(0x4ae)](),this[_0x147d87(0x124)]();},Sprite_EventLabel['prototype'][_0x3bfc03(0x28e)]=function(){const _0xe38daa=_0x3bfc03;this[_0xe38daa(0x1bc)]['labelWindowText']()!==this[_0xe38daa(0x5c9)]&&(this['_text']=this[_0xe38daa(0x1bc)][_0xe38daa(0x160)](),this[_0xe38daa(0x18d)]());},Sprite_EventLabel['prototype'][_0x3bfc03(0x18d)]=function(){const _0x55a4b7=_0x3bfc03;if(!this[_0x55a4b7(0x236)])return;this[_0x55a4b7(0x4b6)](),this['drawText']();},Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x4b6)]=function(){const _0x58f657=_0x3bfc03,_0x27deee=this['_proxyWindow'][_0x58f657(0x2e0)](this[_0x58f657(0x5c9)]),_0x4ff78d=this['_proxyWindow'][_0x58f657(0x11b)](),_0xbd66bf=_0x27deee[_0x58f657(0x5f5)]+_0x4ff78d*0x2,_0x3d9826=_0x27deee['height'];this[_0x58f657(0x236)][_0x58f657(0x330)](0x0,0x0,_0xbd66bf,_0x3d9826),this[_0x58f657(0x236)]['createContents'](),this[_0x58f657(0x4c2)]=this[_0x58f657(0x236)][_0x58f657(0x603)];},Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x615)]=function(){const _0x4c9af9=_0x3bfc03,_0x3e552a=this[_0x4c9af9(0x236)][_0x4c9af9(0x11b)]();this[_0x4c9af9(0x236)][_0x4c9af9(0x50d)](this[_0x4c9af9(0x5c9)],_0x3e552a,0x0);},Sprite_EventLabel['prototype'][_0x3bfc03(0x3ed)]=function(){const _0x287780=_0x3bfc03,_0x25bdc7=VisuMZ[_0x287780(0x12c)]['Settings'][_0x287780(0x26f)][_0x287780(0x251)],_0x1a3de4=$gameSystem[_0x287780(0x423)]()||0x1;this[_0x287780(0x405)]['x']=this[_0x287780(0x405)]['y']=_0x25bdc7/_0x1a3de4;},Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x634)]=function(){const _0x4bd851=_0x3bfc03;if(!SceneManager[_0x4bd851(0x2a7)])return;if(!SceneManager['_scene'][_0x4bd851(0x18e)])return;const _0x77daf1=SceneManager[_0x4bd851(0x2a7)][_0x4bd851(0x18e)][_0x4bd851(0x214)](this[_0x4bd851(0x1bc)]);if(!_0x77daf1)return;this['x']=this['_event']['screenX'](),this['x']+=this[_0x4bd851(0x1bc)][_0x4bd851(0x1b7)][_0x4bd851(0x592)],this['y']=this[_0x4bd851(0x1bc)][_0x4bd851(0x300)]()-_0x77daf1[_0x4bd851(0x177)]*_0x77daf1[_0x4bd851(0x405)]['y'],this['y']+=$gameSystem[_0x4bd851(0x468)]()*-0.5,this['y']+=this['_event'][_0x4bd851(0x1b7)][_0x4bd851(0x46f)];},Sprite_EventLabel['prototype'][_0x3bfc03(0x4ae)]=function(){const _0x4969a0=_0x3bfc03;if(this[_0x4969a0(0x44c)]())this[_0x4969a0(0x242)]+=this[_0x4969a0(0x4f8)]();else SceneManager[_0x4969a0(0x2a7)][_0x4969a0(0x333)]>0x0?this[_0x4969a0(0x242)]=0x0:this[_0x4969a0(0x242)]-=this[_0x4969a0(0x4f8)]();},Sprite_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x124)]=function(){const _0x107c03=_0x3bfc03;if(this[_0x107c03(0x44c)]()&&this[_0x107c03(0x1bc)]&&this['_event'][_0x107c03(0x1b7)]['hueShift']){if(_0x107c03(0x43e)===_0x107c03(0x43e)){const _0x583b42=this['_hue']+(this[_0x107c03(0x1bc)][_0x107c03(0x1b7)][_0x107c03(0x509)]||0x0);this['setHue'](_0x583b42);}else return!![];}},Sprite_EventLabel[_0x3bfc03(0x1fe)]['isLabelVisible']=function(){const _0x27db1f=_0x3bfc03;if(!$gameSystem['eventLabelsVisible']())return![];if(this['_event']?.[_0x27db1f(0x280)])return![];if(this[_0x27db1f(0x1bc)]&&this[_0x27db1f(0x1bc)][_0x27db1f(0x1b1)]<0x0)return![];if(SceneManager['_scene'][_0x27db1f(0x333)]>0x0)return![];const _0x454690=$gamePlayer['x'],_0x2ccb8b=$gamePlayer['y'],_0x4713cf=this['_event']['x'],_0x26746d=this['_event']['y'];if(this[_0x27db1f(0x153)]===_0x454690&&this[_0x27db1f(0x298)]===_0x2ccb8b&&this[_0x27db1f(0x62c)]===_0x4713cf&&this[_0x27db1f(0x5a2)]===_0x26746d)return this[_0x27db1f(0x40a)];this[_0x27db1f(0x153)]=$gamePlayer['x'],this[_0x27db1f(0x298)]=$gamePlayer['y'],this[_0x27db1f(0x62c)]=this['_event']['x'],this['_visibleEventY']=this[_0x27db1f(0x1bc)]['y'];if($gameMap[_0x27db1f(0x1c5)](_0x454690,_0x2ccb8b,_0x4713cf,_0x26746d)>this[_0x27db1f(0x1bc)][_0x27db1f(0x324)]()){if(_0x27db1f(0x5c3)===_0x27db1f(0x1e6)){const _0x1454ae=this['direction'](),_0x7caddd=_0x3c5956[_0x27db1f(0x3a3)](this['x'],_0x1454ae),_0x26c2e2=_0x10dc26[_0x27db1f(0x18c)](this['y'],_0x1454ae);this[_0x27db1f(0x49c)](_0x7caddd,_0x26c2e2);}else return this['_cacheVisibility']=![],![];}return this[_0x27db1f(0x40a)]=!![],!![];},Sprite_EventLabel['prototype']['opacitySpeed']=function(){const _0x1f2922=_0x3bfc03;return VisuMZ['EventsMoveCore'][_0x1f2922(0x653)]['Label'][_0x1f2922(0x3fd)];},VisuMZ['EventsMoveCore'][_0x3bfc03(0x1fc)]=Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x564)],Spriteset_Map['prototype'][_0x3bfc03(0x564)]=function(){const _0x23446e=_0x3bfc03;VisuMZ['EventsMoveCore']['Spriteset_Map_createLowerLayer'][_0x23446e(0x1ee)](this),this[_0x23446e(0x415)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x56e)]=Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x4f2)],Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x4f2)]=function(){const _0x50ffa3=_0x3bfc03;VisuMZ[_0x50ffa3(0x12c)][_0x50ffa3(0x56e)][_0x50ffa3(0x1ee)](this),this[_0x50ffa3(0x336)]();},Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x336)]=function(){const _0x48badf=_0x3bfc03;if(!VisuMZ[_0x48badf(0x12c)][_0x48badf(0x653)][_0x48badf(0x5cb)]['ShowShadows'])return;for(const _0x88d23b of this[_0x48badf(0x57e)]){this[_0x48badf(0x346)](_0x88d23b);}},Spriteset_Map['prototype'][_0x3bfc03(0x346)]=function(_0x4626aa){const _0x825828=_0x3bfc03;_0x4626aa[_0x825828(0x2e7)]=new Sprite(),_0x4626aa['_shadowSprite'][_0x825828(0x16f)]=_0x4626aa['_character'][_0x825828(0x26b)](),_0x4626aa[_0x825828(0x2e7)][_0x825828(0x4c2)]=ImageManager[_0x825828(0x4df)](_0x4626aa[_0x825828(0x2e7)][_0x825828(0x16f)]),_0x4626aa[_0x825828(0x2e7)]['anchor']['x']=0.5,_0x4626aa['_shadowSprite']['anchor']['y']=0x1,_0x4626aa[_0x825828(0x2e7)]['z']=0x0,this[_0x825828(0x265)]['addChild'](_0x4626aa[_0x825828(0x2e7)]);},Spriteset_Map['prototype'][_0x3bfc03(0x516)]=function(){const _0x173a05=_0x3bfc03;if(!VisuMZ[_0x173a05(0x12c)][_0x173a05(0x653)][_0x173a05(0x5cb)][_0x173a05(0x353)])return;for(const _0x63e37b of this[_0x173a05(0x57e)]){if('GqVAg'!==_0x173a05(0x37d))return this['_moveSynch'][_0x173a05(0x422)];else this['_tilemap'][_0x173a05(0x2e8)](_0x63e37b[_0x173a05(0x2e7)]);}},Spriteset_Map['prototype'][_0x3bfc03(0x415)]=function(){const _0x54f95d=_0x3bfc03;this[_0x54f95d(0x64a)]=[];for(const _0x23c921 of $gameMap[_0x54f95d(0x501)]()){if(_0x54f95d(0x380)!==_0x54f95d(0x4bf))this['createLabelWindowForTarget'](_0x23c921);else{if(this[_0x54f95d(0x2d4)]===_0x2e11fb)this[_0x54f95d(0x5b9)]();this[_0x54f95d(0x2d4)]=_0x41b157;}}},Spriteset_Map[_0x3bfc03(0x450)]=VisuMZ[_0x3bfc03(0x12c)]['Settings'][_0x3bfc03(0x26f)][_0x3bfc03(0x3ae)]??!![],Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x1f0)]=function(_0x1c1f19){const _0x25ca47=_0x3bfc03;if(!this[_0x25ca47(0x539)](_0x1c1f19))return;if(Utils[_0x25ca47(0x483)]()){if('HomdA'===_0x25ca47(0x590))return _0x48f63c['EventsMoveCore'][_0x25ca47(0x134)]['call'](this,_0x5aa195);else{if(!Spriteset_Map['MOBILE_EVENT_LABELS'])return;}}let _0x1d7330;const _0x40bb85=VisuMZ[_0x25ca47(0x12c)]['Settings']['Label'][_0x25ca47(0x600)]??!![];_0x1d7330=_0x40bb85?new Sprite_EventLabel(_0x1c1f19):new Window_EventLabel(_0x1c1f19),_0x1d7330['z']=0x8,_0x1d7330['spriteId']=Sprite[_0x25ca47(0x44b)]++,this[_0x25ca47(0x265)][_0x25ca47(0x3fb)](_0x1d7330),this[_0x25ca47(0x64a)]['push'](_0x1d7330);},Spriteset_Map[_0x3bfc03(0x1fe)]['isTargetEventValidForLabelWindow']=function(_0x211664){const _0x33b14d=_0x3bfc03,_0x2076b4=_0x211664[_0x33b14d(0x31c)]();if(_0x2076b4[_0x33b14d(0x565)][_0x33b14d(0x223)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x2076b4[_0x33b14d(0x565)][_0x33b14d(0x223)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x4f16c1 of _0x2076b4['pages']){if(_0x33b14d(0x277)==='PfMiI'){let _0x496fdc='';for(const _0x3438ce of _0x4f16c1['list']){_0x33b14d(0x305)==='EYsQX'?[0x6c,0x198][_0x33b14d(0x25e)](_0x3438ce['code'])&&(_0x496fdc+=_0x3438ce[_0x33b14d(0x181)][0x0]):(_0x2b27bc[_0x33b14d(0x1c8)](_0x4fd0f6['_selfTargetNumberInput']),_0x490a35[_0x33b14d(0x12c)][_0x33b14d(0x515)][_0x33b14d(0x1ee)](this),_0xf46f78[_0x33b14d(0x563)](),_0x3dcb0d[_0x33b14d(0x2fb)]=_0x4d5304);}if(_0x496fdc[_0x33b14d(0x223)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x496fdc[_0x33b14d(0x223)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}else this[_0x33b14d(0x150)](_0x1d4402,_0x11bf13['x']+0x2,_0x13c29c['y']);}return![];},Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x293)]=function(_0x19bb9a){const _0xd0c5d7=_0x3bfc03;this[_0xd0c5d7(0x57e)]=this[_0xd0c5d7(0x57e)]||[];const _0x573948=new Sprite_Character(_0x19bb9a);this[_0xd0c5d7(0x57e)][_0xd0c5d7(0x609)](_0x573948),this[_0xd0c5d7(0x265)][_0xd0c5d7(0x3fb)](_0x573948),this[_0xd0c5d7(0x346)](_0x573948),this[_0xd0c5d7(0x1f0)](_0x19bb9a),_0x573948[_0xd0c5d7(0x629)]();},Spriteset_Map[_0x3bfc03(0x1fe)][_0x3bfc03(0x5d1)]=function(){const _0x397ee3=_0x3bfc03;if(!this[_0x397ee3(0x64a)])return;for(const _0x26c33f of this[_0x397ee3(0x64a)]){if(_0x397ee3(0x61d)!=='WbJGl')return this[_0x397ee3(0x27a)]()[_0x397ee3(0x410)]??0x0;else _0x26c33f&&('FiZAt'!=='wejqJ'?(_0x26c33f[_0x397ee3(0x153)]=undefined,_0x26c33f[_0x397ee3(0x18d)]()):(_0x257804[_0x397ee3(0x153)]=_0x3149f7,_0x11ad0b[_0x397ee3(0x18d)]()));}},VisuMZ['EventsMoveCore'][_0x3bfc03(0x51d)]=Game_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x14e)],Game_Message['prototype'][_0x3bfc03(0x14e)]=function(_0x48769f,_0x1b9e95){const _0x222dc2=_0x3bfc03;this[_0x222dc2(0x2fb)]=$gameTemp[_0x222dc2(0x5d9)](),VisuMZ[_0x222dc2(0x12c)][_0x222dc2(0x51d)]['call'](this,_0x48769f,_0x1b9e95);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x3f0)]=Window_NumberInput['prototype'][_0x3bfc03(0x4a6)],Window_NumberInput['prototype']['start']=function(){const _0x63eed6=_0x3bfc03;$gameTemp[_0x63eed6(0x1c8)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x63eed6(0x12c)][_0x63eed6(0x3f0)][_0x63eed6(0x1ee)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x3bfc03(0x12c)]['Window_NumberInput_processOk']=Window_NumberInput[_0x3bfc03(0x1fe)]['processOk'],Window_NumberInput[_0x3bfc03(0x1fe)][_0x3bfc03(0x37e)]=function(){const _0x488b7f=_0x3bfc03;$gameTemp[_0x488b7f(0x1c8)]($gameMessage['_selfTargetNumberInput']),VisuMZ['EventsMoveCore']['Window_NumberInput_processOk'][_0x488b7f(0x1ee)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x488b7f(0x2fb)]=undefined;},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x4ec)]=Game_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x392)],Game_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x392)]=function(_0x2d019f,_0x2da756){const _0x22d6ff=_0x3bfc03;this[_0x22d6ff(0x4a2)]=$gameTemp[_0x22d6ff(0x5d9)](),VisuMZ[_0x22d6ff(0x12c)][_0x22d6ff(0x4ec)][_0x22d6ff(0x1ee)](this,_0x2d019f,_0x2da756);},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x3ca)]=Window_EventItem[_0x3bfc03(0x1fe)][_0x3bfc03(0x282)],Window_EventItem[_0x3bfc03(0x1fe)][_0x3bfc03(0x282)]=function(){const _0x831bca=_0x3bfc03;$gameTemp[_0x831bca(0x1c8)]($gameMessage[_0x831bca(0x4a2)]),VisuMZ[_0x831bca(0x12c)][_0x831bca(0x3ca)][_0x831bca(0x1ee)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x831bca(0x4a2)]=undefined;},VisuMZ['EventsMoveCore'][_0x3bfc03(0x3a6)]=Window_EventItem['prototype'][_0x3bfc03(0x189)],Window_EventItem[_0x3bfc03(0x1fe)][_0x3bfc03(0x189)]=function(){const _0x69121f=_0x3bfc03;$gameTemp[_0x69121f(0x1c8)]($gameMessage[_0x69121f(0x4a2)]),VisuMZ['EventsMoveCore'][_0x69121f(0x3a6)]['call'](this),$gameTemp[_0x69121f(0x563)](),$gameMessage[_0x69121f(0x4a2)]=undefined;},VisuMZ['EventsMoveCore']['Window_Message_startMessage']=Window_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x23d)],Window_Message[_0x3bfc03(0x1fe)][_0x3bfc03(0x23d)]=function(){const _0x4f6f56=_0x3bfc03;$gameMessage[_0x4f6f56(0x59e)](),VisuMZ[_0x4f6f56(0x12c)][_0x4f6f56(0x178)][_0x4f6f56(0x1ee)](this),$gameTemp[_0x4f6f56(0x563)]();},VisuMZ[_0x3bfc03(0x12c)][_0x3bfc03(0x2b0)]=Window_ScrollText[_0x3bfc03(0x1fe)][_0x3bfc03(0x23d)],Window_ScrollText['prototype'][_0x3bfc03(0x23d)]=function(){const _0xad816b=_0x3bfc03;$gameMessage[_0xad816b(0x59e)](),VisuMZ[_0xad816b(0x12c)][_0xad816b(0x2b0)][_0xad816b(0x1ee)](this),$gameTemp[_0xad816b(0x563)]();};function Window_EventLabel(){this['initialize'](...arguments);}function _0xf910(_0x254ff0,_0x51b6c6){const _0x3eb551=_0x3eb5();return _0xf910=function(_0xf910e3,_0x3d05fc){_0xf910e3=_0xf910e3-0x118;let _0x4a2359=_0x3eb551[_0xf910e3];return _0x4a2359;},_0xf910(_0x254ff0,_0x51b6c6);}Window_EventLabel[_0x3bfc03(0x1fe)]=Object[_0x3bfc03(0x341)](Window_Base['prototype']),Window_EventLabel[_0x3bfc03(0x1fe)]['constructor']=Window_EventLabel,Window_EventLabel['prototype'][_0x3bfc03(0x55e)]=function(_0x438540){const _0x42d5bf=_0x3bfc03;this[_0x42d5bf(0x1bc)]=_0x438540;const _0x15daf1=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this[_0x42d5bf(0x525)](0x1));this['initMembers'](),Window_Base[_0x42d5bf(0x1fe)][_0x42d5bf(0x55e)]['call'](this,_0x15daf1),this[_0x42d5bf(0x3bc)]=0x0,this[_0x42d5bf(0x268)](0x2),this[_0x42d5bf(0x5c9)]='';},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x3d0)]=function(){const _0x40c035=_0x3bfc03;this['_eventErased']=![],this[_0x40c035(0x5f6)]=$gameScreen[_0x40c035(0x3c8)](),this[_0x40c035(0x4cd)]=this[_0x40c035(0x1bc)]['screenX'](),this[_0x40c035(0x630)]=this[_0x40c035(0x1bc)][_0x40c035(0x300)](),this['_eventLabelOffsetX']=this[_0x40c035(0x1bc)]['_labelWindow'][_0x40c035(0x592)],this[_0x40c035(0x13b)]=this['_event'][_0x40c035(0x1b7)]['offsetY'],this[_0x40c035(0x1c1)]=this[_0x40c035(0x1bc)][_0x40c035(0x1b1)],this[_0x40c035(0x40a)]=this['isLabelVisible'](),this[_0x40c035(0x490)]=$gameSystem[_0x40c035(0x636)](),this[_0x40c035(0x153)]=$gamePlayer['x'],this[_0x40c035(0x298)]=$gamePlayer['y'],this['_visibleEventX']=this['_event']['x'],this['_visibleEventY']=this[_0x40c035(0x1bc)]['y'];},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x629)]=function(){const _0x501120=_0x3bfc03;Window_Base[_0x501120(0x1fe)][_0x501120(0x629)][_0x501120(0x1ee)](this);if(!this[_0x501120(0x2dd)]())return;this[_0x501120(0x28e)](),this['updateScale'](),this[_0x501120(0x634)](),this[_0x501120(0x4ae)]();},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x2dd)]=function(){const _0x1bca83=_0x3bfc03;if(!this[_0x1bca83(0x1bc)])return![];if(!this[_0x1bca83(0x1bc)][_0x1bca83(0x1b7)])return![];if(this[_0x1bca83(0x1c1)]!==this[_0x1bca83(0x1bc)]['_pageIndex'])return!![];if(this[_0x1bca83(0x1bc)][_0x1bca83(0x280)]&&!this[_0x1bca83(0x42c)])return!![];if(this['_event'][_0x1bca83(0x1b7)][_0x1bca83(0x513)]==='')return![];if(this[_0x1bca83(0x5f6)]!==$gameScreen['zoomScale']())return!![];if(this[_0x1bca83(0x4cd)]!==this[_0x1bca83(0x1bc)]['screenX']())return!![];if(this[_0x1bca83(0x630)]!==this['_event'][_0x1bca83(0x300)]())return!![];if(this[_0x1bca83(0x1f2)]!==this[_0x1bca83(0x1bc)]['_labelWindow'][_0x1bca83(0x592)])return!![];if(this[_0x1bca83(0x13b)]!==this['_event'][_0x1bca83(0x1b7)][_0x1bca83(0x46f)])return!![];if(this[_0x1bca83(0x153)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x1bca83(0x1bc)]['x'])return!![];if(this[_0x1bca83(0x5a2)]!==this['_event']['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x1bca83(0x636)]())return!![];if(this[_0x1bca83(0x40a)]&&this[_0x1bca83(0x3bc)]<0xff)return!![];if(!this[_0x1bca83(0x40a)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x3bfc03(0x28e)]=function(){const _0x8c0342=_0x3bfc03;if(this[_0x8c0342(0x1bc)][_0x8c0342(0x160)]()!==this[_0x8c0342(0x5c9)]){if(_0x8c0342(0x16c)===_0x8c0342(0x5fb))return _0x3636e3[_0x8c0342(0x611)]()[_0x8c0342(0x437)](_0x272ae2-0x1);else this[_0x8c0342(0x5c9)]=this[_0x8c0342(0x1bc)][_0x8c0342(0x160)](),this['refresh']();}},Window_EventLabel['prototype']['updateScale']=function(){const _0x1e37ab=_0x3bfc03;this['scale']['x']=0x1/$gameScreen[_0x1e37ab(0x3c8)](),this[_0x1e37ab(0x405)]['y']=0x1/$gameScreen[_0x1e37ab(0x3c8)](),this[_0x1e37ab(0x5f6)]=$gameScreen['zoomScale']();},Window_EventLabel['prototype'][_0x3bfc03(0x634)]=function(){const _0x4ec45e=_0x3bfc03;if(!SceneManager[_0x4ec45e(0x2a7)])return;if(!SceneManager['_scene'][_0x4ec45e(0x18e)])return;const _0x3901c1=SceneManager['_scene'][_0x4ec45e(0x18e)]['findTargetSprite'](this[_0x4ec45e(0x1bc)]);if(!_0x3901c1)return;this['x']=Math[_0x4ec45e(0x1d4)](this[_0x4ec45e(0x1bc)]['screenX']()-Math[_0x4ec45e(0x606)](this[_0x4ec45e(0x5f5)]*this[_0x4ec45e(0x405)]['x']/0x2)),this['x']+=this['_event']['_labelWindow'][_0x4ec45e(0x592)],this['y']=this[_0x4ec45e(0x1bc)][_0x4ec45e(0x300)]()-_0x3901c1[_0x4ec45e(0x177)],this['y']+=Math[_0x4ec45e(0x1d4)]($gameSystem['windowPadding']()*0.5),this['y']-=Math[_0x4ec45e(0x1d4)](this[_0x4ec45e(0x177)]*this['scale']['y']),this['y']+=this['_event'][_0x4ec45e(0x1b7)][_0x4ec45e(0x46f)],this['_eventErased']=this[_0x4ec45e(0x1bc)]['_erased'],this[_0x4ec45e(0x4cd)]=this[_0x4ec45e(0x1bc)][_0x4ec45e(0x4d4)](),this[_0x4ec45e(0x630)]=this[_0x4ec45e(0x1bc)]['screenY'](),this[_0x4ec45e(0x1f2)]=this['_event'][_0x4ec45e(0x1b7)][_0x4ec45e(0x592)],this['_eventLabelOffsetY']=this[_0x4ec45e(0x1bc)]['_labelWindow']['offsetY'],this[_0x4ec45e(0x1c1)]=this[_0x4ec45e(0x1bc)][_0x4ec45e(0x1b1)],this[_0x4ec45e(0x42c)]&&(this['contentsOpacity']=0x0);},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x4ae)]=function(){const _0x5a8697=_0x3bfc03;if(this[_0x5a8697(0x44c)]()){if(_0x5a8697(0x2ee)!==_0x5a8697(0x2ee))return this[_0x5a8697(0x1fa)]()[_0x5a8697(0x3a4)]()['match'](/\[VS8\]/i);else this[_0x5a8697(0x3bc)]+=this[_0x5a8697(0x4f8)]();}else SceneManager[_0x5a8697(0x2a7)][_0x5a8697(0x333)]>0x0?this[_0x5a8697(0x3bc)]=0x0:_0x5a8697(0x5e2)!==_0x5a8697(0x5e2)?this[_0x5a8697(0x41f)]=_0x151d6f(_0x482a82['$1'])||0x0:this[_0x5a8697(0x3bc)]-=this[_0x5a8697(0x4f8)]();},Window_EventLabel[_0x3bfc03(0x1fe)]['isLabelVisible']=function(){const _0x58039e=_0x3bfc03;if(!$gameSystem[_0x58039e(0x636)]())return![];if(this[_0x58039e(0x1bc)]?.['_erased'])return![];if(SceneManager[_0x58039e(0x2a7)][_0x58039e(0x333)]>0x0)return![];const _0x2c5aa7=$gamePlayer['x'],_0x380d12=$gamePlayer['y'],_0x54e135=this['_event']['x'],_0x3bff74=this[_0x58039e(0x1bc)]['y'];if(this['_visiblePlayerX']===_0x2c5aa7&&this['_visiblePlayerY']===_0x380d12&&this[_0x58039e(0x62c)]===_0x54e135&&this[_0x58039e(0x5a2)]===_0x3bff74)return this[_0x58039e(0x40a)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x58039e(0x298)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x58039e(0x1bc)]['x'],this[_0x58039e(0x5a2)]=this[_0x58039e(0x1bc)]['y'];if($gameMap['absDistance'](_0x2c5aa7,_0x380d12,_0x54e135,_0x3bff74)>this[_0x58039e(0x1bc)]['labelWindowRange']())return this[_0x58039e(0x40a)]=![],![];return this[_0x58039e(0x40a)]=!![],!![];},Window_EventLabel['prototype'][_0x3bfc03(0x4f8)]=function(){const _0x4fa025=_0x3bfc03;return VisuMZ['EventsMoveCore']['Settings'][_0x4fa025(0x26f)][_0x4fa025(0x3fd)];},Window_EventLabel['prototype']['resizeWindow']=function(){const _0x49c0de=_0x3bfc03,_0x2a52ef=this['textSizeEx'](this[_0x49c0de(0x5c9)]);this[_0x49c0de(0x5f5)]=_0x2a52ef[_0x49c0de(0x5f5)]+($gameSystem[_0x49c0de(0x468)]()+this['itemPadding']())*0x2,this['height']=Math['max'](this[_0x49c0de(0x5eb)](),_0x2a52ef[_0x49c0de(0x177)])+$gameSystem[_0x49c0de(0x468)]()*0x2,this[_0x49c0de(0x343)]();},Window_EventLabel['prototype'][_0x3bfc03(0x5eb)]=function(){const _0x3a416b=_0x3bfc03;return VisuMZ[_0x3a416b(0x12c)][_0x3a416b(0x653)][_0x3a416b(0x26f)][_0x3a416b(0x195)];},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x613)]=function(){const _0x382a00=_0x3bfc03;Window_Base[_0x382a00(0x1fe)]['resetFontSettings'][_0x382a00(0x1ee)](this),this[_0x382a00(0x603)][_0x382a00(0x470)]=this['defaultFontSize']();},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x1e1)]=function(){const _0x8b5128=_0x3bfc03;return VisuMZ[_0x8b5128(0x12c)]['Settings'][_0x8b5128(0x26f)][_0x8b5128(0x251)];},Window_EventLabel['prototype']['refresh']=function(){const _0xcfc1ee=_0x3bfc03;this[_0xcfc1ee(0x4b6)](),this[_0xcfc1ee(0x603)][_0xcfc1ee(0x51e)]();const _0x525928=this[_0xcfc1ee(0x5c9)][_0xcfc1ee(0x51c)](/[\r\n]+/);let _0x5dc459=0x0;for(const _0x2fcc76 of _0x525928){const _0x4ede55=this[_0xcfc1ee(0x2e0)](_0x2fcc76),_0x7c7e0a=Math[_0xcfc1ee(0x606)]((this[_0xcfc1ee(0x1ec)]-_0x4ede55[_0xcfc1ee(0x5f5)])/0x2);this[_0xcfc1ee(0x50d)](_0x2fcc76,_0x7c7e0a,_0x5dc459),_0x5dc459+=_0x4ede55[_0xcfc1ee(0x177)];}},Window_EventLabel['prototype']['processDrawIcon']=function(_0x577f90,_0x1fa025){const _0x398d77=_0x3bfc03;if(_0x1fa025[_0x398d77(0x523)]){if(_0x398d77(0x62e)===_0x398d77(0x62e))this[_0x398d77(0x150)](_0x577f90,_0x1fa025['x']+0x2,_0x1fa025['y']);else return!![];}_0x1fa025['x']+=Math[_0x398d77(0x5a7)](this[_0x398d77(0x401)](),ImageManager[_0x398d77(0x1ba)])+0x4;},Window_EventLabel['prototype'][_0x3bfc03(0x150)]=function(_0x78bf6c,_0x120296,_0x19a0f9){const _0x165522=_0x3bfc03,_0x2c59f1=ImageManager['loadSystem'](_0x165522(0x42d)),_0x588ba3=ImageManager[_0x165522(0x1ba)],_0x3a3e03=ImageManager[_0x165522(0x278)],_0x1f443a=_0x78bf6c%0x10*_0x588ba3,_0x313647=Math['floor'](_0x78bf6c/0x10)*_0x3a3e03,_0x47165a=Math[_0x165522(0x5a7)](this[_0x165522(0x401)]()),_0x152557=Math[_0x165522(0x5a7)](this[_0x165522(0x401)]());this[_0x165522(0x603)][_0x165522(0x388)](_0x2c59f1,_0x1f443a,_0x313647,_0x588ba3,_0x3a3e03,_0x120296,_0x19a0f9,_0x47165a,_0x152557);},Window_EventLabel[_0x3bfc03(0x1fe)][_0x3bfc03(0x401)]=function(){const _0x184bab=_0x3bfc03;return VisuMZ[_0x184bab(0x12c)]['Settings'][_0x184bab(0x26f)][_0x184bab(0x187)];};