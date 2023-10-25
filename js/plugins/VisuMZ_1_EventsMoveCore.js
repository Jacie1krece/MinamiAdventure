//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.54;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.54] [EventsMoveCore]
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

function _0x5869(_0x52303d,_0x295f4c){const _0x43a796=_0x43a7();return _0x5869=function(_0x586966,_0x3893e5){_0x586966=_0x586966-0xff;let _0x4bc41d=_0x43a796[_0x586966];return _0x4bc41d;},_0x5869(_0x52303d,_0x295f4c);}const _0x2a2f60=_0x5869;(function(_0x47d45f,_0x4193f4){const _0x3a47f2=_0x5869,_0x5023bb=_0x47d45f();while(!![]){try{const _0x128fe2=-parseInt(_0x3a47f2(0x23e))/0x1+parseInt(_0x3a47f2(0x58e))/0x2+parseInt(_0x3a47f2(0x18c))/0x3*(parseInt(_0x3a47f2(0x2a0))/0x4)+parseInt(_0x3a47f2(0x28e))/0x5*(parseInt(_0x3a47f2(0x3b3))/0x6)+parseInt(_0x3a47f2(0x3eb))/0x7+-parseInt(_0x3a47f2(0x544))/0x8*(-parseInt(_0x3a47f2(0x601))/0x9)+parseInt(_0x3a47f2(0x607))/0xa*(-parseInt(_0x3a47f2(0x1a0))/0xb);if(_0x128fe2===_0x4193f4)break;else _0x5023bb['push'](_0x5023bb['shift']());}catch(_0x38c497){_0x5023bb['push'](_0x5023bb['shift']());}}}(_0x43a7,0x81211));var label=_0x2a2f60(0x193),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2a2f60(0x628)](function(_0x12ebf8){const _0x1e3c52=_0x2a2f60;return _0x12ebf8[_0x1e3c52(0x28d)]&&_0x12ebf8['description'][_0x1e3c52(0x117)]('['+label+']');})[0x0];VisuMZ[label][_0x2a2f60(0x430)]=VisuMZ[label][_0x2a2f60(0x430)]||{},VisuMZ[_0x2a2f60(0x2ff)]=function(_0x41dd84,_0x21eca1){const _0x909499=_0x2a2f60;for(const _0x2ecf9c in _0x21eca1){if(_0x909499(0x471)!==_0x909499(0x153)){if(_0x2ecf9c[_0x909499(0x148)](/(.*):(.*)/i)){const _0x77bb49=String(RegExp['$1']),_0x381ee0=String(RegExp['$2'])[_0x909499(0x3f0)]()['trim']();let _0x4a6647,_0x1e3666,_0x3529eb;switch(_0x381ee0){case _0x909499(0x56d):_0x4a6647=_0x21eca1[_0x2ecf9c]!==''?Number(_0x21eca1[_0x2ecf9c]):0x0;break;case _0x909499(0x244):_0x1e3666=_0x21eca1[_0x2ecf9c]!==''?JSON['parse'](_0x21eca1[_0x2ecf9c]):[],_0x4a6647=_0x1e3666['map'](_0x26eefa=>Number(_0x26eefa));break;case _0x909499(0x298):_0x4a6647=_0x21eca1[_0x2ecf9c]!==''?eval(_0x21eca1[_0x2ecf9c]):null;break;case _0x909499(0x351):_0x1e3666=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):[],_0x4a6647=_0x1e3666[_0x909499(0x302)](_0x4bc68b=>eval(_0x4bc68b));break;case _0x909499(0x21d):_0x4a6647=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):'';break;case _0x909499(0x15b):_0x1e3666=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):[],_0x4a6647=_0x1e3666[_0x909499(0x302)](_0x6fbbf3=>JSON[_0x909499(0x570)](_0x6fbbf3));break;case'FUNC':_0x4a6647=_0x21eca1[_0x2ecf9c]!==''?new Function(JSON['parse'](_0x21eca1[_0x2ecf9c])):new Function(_0x909499(0x25b));break;case'ARRAYFUNC':_0x1e3666=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):[],_0x4a6647=_0x1e3666[_0x909499(0x302)](_0xe2de1a=>new Function(JSON[_0x909499(0x570)](_0xe2de1a)));break;case _0x909499(0x102):_0x4a6647=_0x21eca1[_0x2ecf9c]!==''?String(_0x21eca1[_0x2ecf9c]):'';break;case _0x909499(0x3f1):_0x1e3666=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):[],_0x4a6647=_0x1e3666[_0x909499(0x302)](_0x2e501c=>String(_0x2e501c));break;case'STRUCT':_0x3529eb=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):{},_0x41dd84[_0x77bb49]={},VisuMZ[_0x909499(0x2ff)](_0x41dd84[_0x77bb49],_0x3529eb);continue;case _0x909499(0x1dd):_0x1e3666=_0x21eca1[_0x2ecf9c]!==''?JSON[_0x909499(0x570)](_0x21eca1[_0x2ecf9c]):[],_0x4a6647=_0x1e3666[_0x909499(0x302)](_0x2412a6=>VisuMZ[_0x909499(0x2ff)]({},JSON['parse'](_0x2412a6)));break;default:continue;}_0x41dd84[_0x77bb49]=_0x4a6647;}}else _0x1ea0f4*=_0x5c969a['DiagonalSpeedMultiplier']||0.01;}return _0x41dd84;},(_0x8c26a3=>{const _0x559cf6=_0x2a2f60,_0x147d04=_0x8c26a3[_0x559cf6(0x4bf)];for(const _0x1b2ade of dependencies){if(_0x559cf6(0x29a)!==_0x559cf6(0x2fb)){if(!Imported[_0x1b2ade]){if(_0x559cf6(0x5ed)==='bCvGy'){alert(_0x559cf6(0x31f)[_0x559cf6(0x198)](_0x147d04,_0x1b2ade)),SceneManager[_0x559cf6(0x403)]();break;}else return _0x26488e[_0x559cf6(0x354)]['command108'][_0x559cf6(0x3be)](this,_0x561744),this['_comments']['some'](_0x446e8c=>_0x446e8c[_0x559cf6(0x148)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x559cf6(0x15f)]=!![]),!![];}}else _0x330461[0x2]=_0xaea691(_0x38b387)[_0x559cf6(0x5c3)](0x0)[_0x559cf6(0x3f0)]()['trim']();}const _0x418f18=_0x8c26a3[_0x559cf6(0x3c6)];if(_0x418f18[_0x559cf6(0x148)](/\[Version[ ](.*?)\]/i)){const _0x3d2821=Number(RegExp['$1']);if(_0x3d2821!==VisuMZ[label][_0x559cf6(0x62c)]){if(_0x559cf6(0x516)!==_0x559cf6(0x48c))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x147d04,_0x3d2821)),SceneManager[_0x559cf6(0x403)]();else{const _0x60df5d=_0x39f96d['shift']();delete this[_0x559cf6(0x5d7)][_0x60df5d];}}}if(_0x418f18['match'](/\[Tier[ ](\d+)\]/i)){const _0x49c94c=Number(RegExp['$1']);_0x49c94c<tier?_0x559cf6(0x16d)===_0x559cf6(0x5cb)?_0x5bd246=this[_0x559cf6(0x32a)](_0x4b1950,_0x538800):(alert(_0x559cf6(0x413)[_0x559cf6(0x198)](_0x147d04,_0x49c94c,tier)),SceneManager['exit']()):tier=Math[_0x559cf6(0x431)](_0x49c94c,tier);}VisuMZ[_0x559cf6(0x2ff)](VisuMZ[label][_0x559cf6(0x430)],_0x8c26a3[_0x559cf6(0x3da)]);})(pluginData),VisuMZ[_0x2a2f60(0x2cc)]=function(_0x1361a6,_0xfe3b6a,_0x4c427e){switch(_0x4c427e){case'=':return _0xfe3b6a;break;case'+':return _0x1361a6+_0xfe3b6a;break;case'-':return _0x1361a6-_0xfe3b6a;break;case'*':return _0x1361a6*_0xfe3b6a;break;case'/':return _0x1361a6/_0xfe3b6a;break;case'%':return _0x1361a6%_0xfe3b6a;break;}return _0x1361a6;},PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x384),_0x3c4563=>{const _0x27e831=_0x2a2f60;VisuMZ[_0x27e831(0x2ff)](_0x3c4563,_0x3c4563);switch(_0x3c4563[_0x27e831(0x216)]){case'Allow':$gameSystem[_0x27e831(0x18e)](!![]);break;case'Stop':$gameSystem[_0x27e831(0x18e)](![]);break;case'Toggle':$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x27e831(0x396)]());break;}}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],_0x2a2f60(0x29d),_0x5bcd0e=>{const _0x686be8=_0x2a2f60;VisuMZ[_0x686be8(0x2ff)](_0x5bcd0e,_0x5bcd0e);const _0x189474=$gameTemp['getLastPluginCommandInterpreter'](),_0x3dfd42={'mapId':_0x5bcd0e['MapId'],'eventId':_0x5bcd0e['EventId']||_0x189474[_0x686be8(0x206)](),'pageId':_0x5bcd0e[_0x686be8(0x36c)]};if(_0x3dfd42['mapId']<=0x0)_0x3dfd42[_0x686be8(0x2a4)]=$gameMap?$gameMap[_0x686be8(0x2a4)]():0x1;$gameTemp[_0x686be8(0x59c)]()[_0x686be8(0x602)](_0x3dfd42);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'DashEnableToggle',_0x2ad7ac=>{const _0x5cd54e=_0x2a2f60;VisuMZ['ConvertParams'](_0x2ad7ac,_0x2ad7ac);switch(_0x2ad7ac[_0x5cd54e(0x216)]){case _0x5cd54e(0x211):$gameSystem[_0x5cd54e(0x42d)](!![]);break;case _0x5cd54e(0x46d):$gameSystem[_0x5cd54e(0x42d)](![]);break;case _0x5cd54e(0x5be):$gameSystem[_0x5cd54e(0x42d)](!$gameSystem[_0x5cd54e(0x363)]());break;}}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x480),_0x9df859=>{const _0x42f5c4=_0x2a2f60;VisuMZ[_0x42f5c4(0x2ff)](_0x9df859,_0x9df859);const _0x2919e5=$gameTemp['getLastPluginCommandInterpreter']();_0x9df859[_0x42f5c4(0x1ac)]=_0x9df859[_0x42f5c4(0x1ac)]||$gameMap['mapId'](),$gameSystem[_0x42f5c4(0x53f)](_0x9df859[_0x42f5c4(0x1ac)],_0x9df859[_0x42f5c4(0x286)]||_0x2919e5[_0x42f5c4(0x206)](),_0x9df859[_0x42f5c4(0x1cc)],_0x9df859[_0x42f5c4(0x2d4)],_0x9df859['IconBufferY'],_0x9df859[_0x42f5c4(0x455)]);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x383),_0x54d4e2=>{const _0x2163ad=_0x2a2f60;VisuMZ['ConvertParams'](_0x54d4e2,_0x54d4e2);const _0x54eef0=$gameTemp[_0x2163ad(0x59c)]();_0x54d4e2[_0x2163ad(0x1ac)]=_0x54d4e2['MapId']||$gameMap[_0x2163ad(0x2a4)](),$gameSystem[_0x2163ad(0x5d3)](_0x54d4e2[_0x2163ad(0x1ac)],_0x54d4e2[_0x2163ad(0x286)]||_0x54eef0[_0x2163ad(0x206)]());}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x339),_0x28cb43=>{const _0x278a1b=_0x2a2f60;if($gameMap)for(const _0x103ae6 of $gameMap[_0x278a1b(0x218)]()){_0x103ae6['refresh'](),_0x103ae6['updateEventLabelText']();}if(SceneManager['isSceneMap']()){const _0x5ef153=SceneManager[_0x278a1b(0x263)][_0x278a1b(0x388)];if(_0x5ef153)_0x5ef153[_0x278a1b(0x2fc)]();}}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],_0x2a2f60(0x2f9),_0x4a6297=>{const _0x5965f1=_0x2a2f60;VisuMZ[_0x5965f1(0x2ff)](_0x4a6297,_0x4a6297);switch(_0x4a6297[_0x5965f1(0x4a3)]){case _0x5965f1(0x47a):$gameSystem[_0x5965f1(0x1f9)](!![]);break;case _0x5965f1(0x4fb):$gameSystem['setEventLabelsVisible'](![]);break;case _0x5965f1(0x5be):$gameSystem[_0x5965f1(0x1f9)](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'EventLocationSave',_0x43f48b=>{const _0x550dce=_0x2a2f60;VisuMZ[_0x550dce(0x2ff)](_0x43f48b,_0x43f48b);const _0x266674=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x338a0b=$gameMap['event'](_0x43f48b[_0x550dce(0x286)]||_0x266674[_0x550dce(0x206)]());if(_0x338a0b)_0x338a0b[_0x550dce(0x100)]();}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x5a0),_0xc1e17a=>{const _0x3cf85b=_0x2a2f60;VisuMZ[_0x3cf85b(0x2ff)](_0xc1e17a,_0xc1e17a);const _0x38efaa=$gameTemp[_0x3cf85b(0x59c)](),_0xacc7c0=_0xc1e17a[_0x3cf85b(0x1ac)]||$gameMap[_0x3cf85b(0x2a4)](),_0x381130=_0xc1e17a['EventId']||_0x38efaa['eventId'](),_0x170db2=_0xc1e17a['PosX']||0x0,_0x5f34a1=_0xc1e17a['PosY']||0x0,_0x2ea577=_0xc1e17a[_0x3cf85b(0x26a)]||0x2,_0x56d851=((_0xc1e17a['PageId']||0x1)-0x1)[_0x3cf85b(0x45a)](0x0,0x13),_0x49b7f7=_0xc1e17a[_0x3cf85b(0x129)]||0x0;$gameSystem[_0x3cf85b(0x14f)](_0xacc7c0,_0x381130,_0x170db2,_0x5f34a1,_0x2ea577,_0x56d851,_0x49b7f7);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x3ca),_0xc14a6f=>{const _0x28e250=_0x2a2f60;VisuMZ[_0x28e250(0x2ff)](_0xc14a6f,_0xc14a6f);const _0x39c80b=$gameTemp[_0x28e250(0x59c)](),_0x5465ec=_0xc14a6f[_0x28e250(0x1ac)]||$gameMap['mapId'](),_0x322087=_0xc14a6f[_0x28e250(0x286)]||_0x39c80b[_0x28e250(0x206)]();$gameSystem[_0x28e250(0x235)](_0x5465ec,_0x322087);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x1cb),_0x1f38f7=>{const _0x2e531d=_0x2a2f60;VisuMZ[_0x2e531d(0x2ff)](_0x1f38f7,_0x1f38f7);const _0x33de81=_0x1f38f7['CommonEventID'];$gameTimer[_0x2e531d(0x121)](_0x33de81);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'EventTimerExpireClear',_0x14ca8e=>{const _0x4a8f2b=_0x2a2f60;$gameTimer[_0x4a8f2b(0x121)](0x0);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x61b),_0x6ad6df=>{const _0x4a3da0=_0x2a2f60;if(!$gameTimer[_0x4a3da0(0x10a)]())return;VisuMZ[_0x4a3da0(0x2ff)](_0x6ad6df,_0x6ad6df);let _0x5a31c2=0x0;_0x5a31c2+=_0x6ad6df[_0x4a3da0(0x223)],_0x5a31c2+=_0x6ad6df['Seconds']*0x3c,_0x5a31c2+=_0x6ad6df[_0x4a3da0(0x52c)]*0x3c*0x3c,_0x5a31c2+=_0x6ad6df[_0x4a3da0(0x433)]*0x3c*0x3c*0x3c,$gameTimer[_0x4a3da0(0x11f)](_0x5a31c2);}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x2f6),_0x1c5d15=>{const _0x17770a=_0x2a2f60;if(!$gameTimer['isWorking']())return;VisuMZ[_0x17770a(0x2ff)](_0x1c5d15,_0x1c5d15);let _0x316829=0x0;_0x316829+=_0x1c5d15['Frames'],_0x316829+=_0x1c5d15['Seconds']*0x3c,_0x316829+=_0x1c5d15[_0x17770a(0x52c)]*0x3c*0x3c,_0x316829+=_0x1c5d15[_0x17770a(0x433)]*0x3c*0x3c*0x3c,$gameTimer[_0x17770a(0x1b6)](_0x316829);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'EventTimerPause',_0xd9b062=>{const _0x53c0d7=_0x2a2f60;if(!$gameTimer[_0x53c0d7(0x10a)]())return;$gameTimer[_0x53c0d7(0x1db)]();}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],'EventTimerResume',_0x3d79e2=>{const _0x512a37=_0x2a2f60;if(!$gameTimer[_0x512a37(0x10a)]())return;$gameTimer[_0x512a37(0x5f5)]();}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'EventTimerSpeed',_0x515eb3=>{const _0x56d9b0=_0x2a2f60;VisuMZ['ConvertParams'](_0x515eb3,_0x515eb3);const _0x8b38a5=_0x515eb3[_0x56d9b0(0x51e)]||0x0;$gameTimer[_0x56d9b0(0x3f7)](_0x8b38a5);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x62f),_0x236f5c=>{const _0x4ecca3=_0x2a2f60;VisuMZ['ConvertParams'](_0x236f5c,_0x236f5c);const _0x459888=!_0x236f5c['Chase'];$gameSystem[_0x4ecca3(0x249)](_0x459888);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'FollowerSetTargetChase',_0xfffd8e=>{const _0x8dd30a=_0x2a2f60;VisuMZ[_0x8dd30a(0x2ff)](_0xfffd8e,_0xfffd8e);const _0x2b5bc0=(_0xfffd8e['FollowerID']||0x0)-0x1,_0x3836f2=!_0xfffd8e[_0x8dd30a(0x5d6)],_0x1bdd45=$gamePlayer[_0x8dd30a(0x136)]()[_0x8dd30a(0x2d1)](_0x2b5bc0);if(_0x1bdd45)_0x1bdd45[_0x8dd30a(0x37c)](_0x3836f2);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x239),_0x406ec8=>{const _0x4e80e9=_0x2a2f60;VisuMZ[_0x4e80e9(0x2ff)](_0x406ec8,_0x406ec8);const _0x291905=_0x406ec8['FollowerID'];$gameSystem['setControlledFollowerID'](_0x291905);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x502),_0x2e25a6=>{const _0x113923=_0x2a2f60;VisuMZ[_0x113923(0x2ff)](_0x2e25a6,_0x2e25a6),$gameSystem[_0x113923(0x620)](0x0),$gameSystem[_0x113923(0x249)](![]);for(const _0x1dd425 of $gamePlayer[_0x113923(0x136)]()[_0x113923(0x5d7)]){if(_0x1dd425)_0x1dd425[_0x113923(0x37c)](![]);}}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],_0x2a2f60(0x40b),_0x4b44eb=>{const _0x290277=_0x2a2f60;VisuMZ[_0x290277(0x2ff)](_0x4b44eb,_0x4b44eb);const _0x1b3055=$gameTemp[_0x290277(0x59c)]();_0x4b44eb[_0x290277(0x1ac)]=_0x4b44eb[_0x290277(0x1ac)]||$gameMap[_0x290277(0x2a4)]();const _0x45cd76=[_0x4b44eb['MapId'],_0x4b44eb['EventId']||_0x1b3055['eventId'](),_0x4b44eb[_0x290277(0x5a7)]],_0x38c3eb=_0x4b44eb[_0x290277(0x292)],_0xbb0177=$gameSelfSwitches['value'](_0x45cd76)||![];$gameSwitches[_0x290277(0x104)](_0x38c3eb,_0xbb0177);}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],'SwitchGetSelfSwitchID',_0x5f333c=>{const _0x4d2cbc=_0x2a2f60;VisuMZ[_0x4d2cbc(0x2ff)](_0x5f333c,_0x5f333c);const _0x20bd13=$gameTemp['getLastPluginCommandInterpreter']();_0x5f333c[_0x4d2cbc(0x1ac)]=_0x5f333c['MapId']||$gameMap['mapId']();const _0x2ad0d4=[_0x5f333c[_0x4d2cbc(0x1ac)],_0x5f333c[_0x4d2cbc(0x286)]||_0x20bd13[_0x4d2cbc(0x206)](),_0x4d2cbc(0x141)['format'](_0x5f333c[_0x4d2cbc(0x506)])],_0x2378e9=_0x5f333c[_0x4d2cbc(0x292)],_0x23b334=$gameSelfSwitches['value'](_0x2ad0d4)||![];$gameSwitches[_0x4d2cbc(0x104)](_0x2378e9,_0x23b334);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'VariableGetSelfVariableID',_0x165974=>{const _0x37588a=_0x2a2f60;VisuMZ[_0x37588a(0x2ff)](_0x165974,_0x165974);const _0x148ff1=$gameTemp[_0x37588a(0x59c)]();_0x165974[_0x37588a(0x1ac)]=_0x165974[_0x37588a(0x1ac)]||$gameMap[_0x37588a(0x2a4)]();const _0x1824bd=[_0x165974[_0x37588a(0x1ac)],_0x165974[_0x37588a(0x286)]||_0x148ff1[_0x37588a(0x206)](),_0x37588a(0x5b3)[_0x37588a(0x198)](_0x165974[_0x37588a(0x39f)])],_0x5e5e95=_0x165974['TargetVariableId'],_0x41b6f6=$gameSelfSwitches['value'](_0x1824bd)||![];$gameVariables[_0x37588a(0x104)](_0x5e5e95,_0x41b6f6);}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x425),_0x5c7b82=>{const _0x3530c2=_0x2a2f60;VisuMZ[_0x3530c2(0x2ff)](_0x5c7b82,_0x5c7b82);if(!$gameMap)return;const _0x52cc06=$gameTemp[_0x3530c2(0x59c)](),_0x37a357=_0x5c7b82['Step2Preserve'];_0x5c7b82[_0x3530c2(0x1bb)]=_0x5c7b82[_0x3530c2(0x1bb)]||$gameMap[_0x3530c2(0x2a4)](),_0x5c7b82[_0x3530c2(0x4a6)]=_0x5c7b82[_0x3530c2(0x4a6)]||$gameMap[_0x3530c2(0x2a4)](),_0x5c7b82['TemplateName']=_0x5c7b82[_0x3530c2(0x50b)][_0x3530c2(0x3f0)]()[_0x3530c2(0x637)]();if(!_0x37a357&&_0x5c7b82[_0x3530c2(0x1bb)]!==$gameMap['mapId']())return;if($gameMap[_0x3530c2(0x2a4)]()===_0x5c7b82['Step1MapId']){if(_0x3530c2(0x202)===_0x3530c2(0x202)){const _0x1777d6=$gameMap[_0x3530c2(0x5a5)](_0x5c7b82[_0x3530c2(0x4b2)]||_0x52cc06['eventId']());if(!_0x1777d6)return;if(_0x5c7b82['TemplateName']!=='UNTITLED'){if('rKnlB'!==_0x3530c2(0x5ae))_0x1777d6[_0x3530c2(0x429)](_0x5c7b82[_0x3530c2(0x50b)]);else{if(!_0x3b5599[_0x3530c2(0x263)])return;if(!_0x401904['_scene'][_0x3530c2(0x388)])return;const _0x4399a0=_0x2a88c2[_0x3530c2(0x263)][_0x3530c2(0x388)][_0x3530c2(0x13a)](this[_0x3530c2(0x3a9)]);if(!_0x4399a0)return;this['x']=_0x3eda32['round'](this['_event']['screenX']()-_0x2d23f3[_0x3530c2(0x24f)](this[_0x3530c2(0x627)]*this[_0x3530c2(0x51d)]['x']/0x2)),this['x']+=this[_0x3530c2(0x3a9)][_0x3530c2(0x62e)][_0x3530c2(0x172)],this['y']=this[_0x3530c2(0x3a9)][_0x3530c2(0x412)]()-_0x4399a0[_0x3530c2(0x5cf)],this['y']+=_0x3a0b78[_0x3530c2(0x4b9)](_0xd26814['windowPadding']()*0.5),this['y']-=_0x192984[_0x3530c2(0x4b9)](this['height']*this[_0x3530c2(0x51d)]['y']),this['y']+=this['_event']['_labelWindow']['offsetY'],this[_0x3530c2(0x5a9)]=this['_event']['_erased'],this[_0x3530c2(0x203)]=this[_0x3530c2(0x3a9)][_0x3530c2(0x5a1)](),this[_0x3530c2(0x418)]=this[_0x3530c2(0x3a9)][_0x3530c2(0x412)](),this[_0x3530c2(0x226)]=this[_0x3530c2(0x3a9)][_0x3530c2(0x62e)]['offsetX'],this[_0x3530c2(0x15c)]=this[_0x3530c2(0x3a9)][_0x3530c2(0x62e)][_0x3530c2(0x293)],this[_0x3530c2(0x3fd)]=this[_0x3530c2(0x3a9)]['_pageIndex'],this[_0x3530c2(0x5a9)]&&(this[_0x3530c2(0x2a2)]=0x0);}}else _0x1777d6[_0x3530c2(0x452)](_0x5c7b82['Step2MapId'],_0x5c7b82[_0x3530c2(0x332)]||_0x52cc06[_0x3530c2(0x206)]());}else this[_0x3530c2(0x5e7)]=!![];}if(_0x37a357){if(_0x3530c2(0x3b6)!==_0x3530c2(0x224))$gameSystem['savePreservedMorphEventDataKey'](_0x5c7b82[_0x3530c2(0x1bb)],_0x5c7b82['Step1EventId'],_0x5c7b82[_0x3530c2(0x50b)],_0x5c7b82[_0x3530c2(0x4a6)],_0x5c7b82['Step2EventId']);else{if(_0x25899e)return _0x58a20a;}}}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],'MorphEventRemove',_0x5110cf=>{const _0x2f620a=_0x2a2f60;VisuMZ['ConvertParams'](_0x5110cf,_0x5110cf);if(!$gameMap)return;const _0x24bbcf=$gameTemp['getLastPluginCommandInterpreter']();_0x5110cf[_0x2f620a(0x1ac)]=_0x5110cf[_0x2f620a(0x1ac)]||$gameMap[_0x2f620a(0x2a4)]();if($gameMap[_0x2f620a(0x2a4)]()===_0x5110cf[_0x2f620a(0x1ac)]){if('OlLlT'!==_0x2f620a(0x1e8)){this[_0x2f620a(0x1df)]=![],this[_0x2f620a(0x514)]=![];if(!_0x5c0bf5)return;const _0x50bfc1=_0x4c0c8d[_0x2f620a(0x45c)]||'';if(_0x50bfc1[_0x2f620a(0x148)](/<HIDE FOLLOWERS>/i))this[_0x2f620a(0x1df)]=![],this[_0x2f620a(0x514)]=!![];else _0x50bfc1['match'](/<SHOW FOLLOWERS>/i)&&(this[_0x2f620a(0x1df)]=!![],this['_forceHideFollower']=![]);}else{const _0x38d044=$gameMap['event'](_0x5110cf['EventId']||_0x24bbcf[_0x2f620a(0x206)]());_0x38d044[_0x2f620a(0x2f2)]();}}if(_0x5110cf[_0x2f620a(0x150)]){if('KcltP'!=='KcltP'){if(this[_0x2f620a(0x645)]['attachPictureFilename']()!=='')return![];}else $gameSystem['deletePreservedMorphEventDataKey'](_0x5110cf['MapId'],_0x5110cf[_0x2f620a(0x286)]||_0x24bbcf[_0x2f620a(0x206)]());}}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x285),_0x5026d2=>{const _0x40cf0b=_0x2a2f60;VisuMZ['ConvertParams'](_0x5026d2,_0x5026d2),$gameSystem[_0x40cf0b(0x3b9)]($gamePlayer,_0x5026d2[_0x40cf0b(0x1cc)],_0x5026d2[_0x40cf0b(0x2d4)],_0x5026d2[_0x40cf0b(0x3f5)],_0x5026d2[_0x40cf0b(0x455)]);}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],_0x2a2f60(0x3af),_0x589a84=>{const _0xcdf517=_0x2a2f60;VisuMZ[_0xcdf517(0x2ff)](_0x589a84,_0x589a84),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x5bc),_0x3480de=>{const _0x5565f5=_0x2a2f60;VisuMZ[_0x5565f5(0x2ff)](_0x3480de,_0x3480de),$gameSystem['setPlayerControlDisable'](!_0x3480de[_0x5565f5(0x211)]);}),PluginManager['registerCommand'](pluginData['name'],_0x2a2f60(0x618),_0x15366f=>{const _0x27561c=_0x2a2f60;VisuMZ[_0x27561c(0x2ff)](_0x15366f,_0x15366f),$gameSystem[_0x27561c(0x47e)](_0x15366f[_0x27561c(0x621)]);}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x495),_0x405a62=>{const _0x17dec8=_0x2a2f60;VisuMZ[_0x17dec8(0x2ff)](_0x405a62,_0x405a62);const _0x331113=_0x405a62[_0x17dec8(0x1ac)]||$gameMap[_0x17dec8(0x2a4)]();$gameSelfSwitches[_0x17dec8(0x606)](_0x331113);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x56b),_0x583321=>{const _0xca4b58=_0x2a2f60;VisuMZ[_0xca4b58(0x2ff)](_0x583321,_0x583321);const _0x121469=$gameTemp[_0xca4b58(0x59c)]();_0x583321[_0xca4b58(0x1ac)]=_0x583321[_0xca4b58(0x1ac)]||$gameMap['mapId']();const _0x54029a=[_0x583321[_0xca4b58(0x1ac)],_0x583321[_0xca4b58(0x286)]||_0x121469[_0xca4b58(0x206)](),_0x583321[_0xca4b58(0x5a7)]];switch(_0x583321['Value']){case'ON':$gameSelfSwitches['setValue'](_0x54029a,!![]);break;case _0xca4b58(0x27a):$gameSelfSwitches[_0xca4b58(0x104)](_0x54029a,![]);break;case _0xca4b58(0x5be):$gameSelfSwitches['setValue'](_0x54029a,!$gameSelfSwitches[_0xca4b58(0x50f)](_0x54029a));break;}}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x420),_0x155995=>{const _0x1079be=_0x2a2f60;VisuMZ[_0x1079be(0x2ff)](_0x155995,_0x155995);const _0x434e74=$gameTemp[_0x1079be(0x59c)]();_0x155995[_0x1079be(0x1ac)]=_0x155995[_0x1079be(0x1ac)]||$gameMap[_0x1079be(0x2a4)]();const _0x521878=[_0x155995[_0x1079be(0x1ac)],_0x155995[_0x1079be(0x286)]||_0x434e74[_0x1079be(0x206)](),'Self\x20Switch\x20%1'['format'](_0x155995[_0x1079be(0x506)])];switch(_0x155995[_0x1079be(0x216)]){case'ON':$gameSelfSwitches[_0x1079be(0x104)](_0x521878,!![]);break;case'OFF':$gameSelfSwitches['setValue'](_0x521878,![]);break;case _0x1079be(0x5be):$gameSelfSwitches[_0x1079be(0x104)](_0x521878,!$gameSelfSwitches[_0x1079be(0x50f)](_0x521878));break;}}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x330),_0x4741fd=>{const _0x3b622e=_0x2a2f60;VisuMZ[_0x3b622e(0x2ff)](_0x4741fd,_0x4741fd);const _0x4583d0=$gameTemp['getLastPluginCommandInterpreter']();_0x4741fd[_0x3b622e(0x1ac)]=_0x4741fd['MapId']||$gameMap[_0x3b622e(0x2a4)]();const _0x5bc4cf=[_0x4741fd['MapId'],_0x4741fd[_0x3b622e(0x286)]||_0x4583d0['eventId'](),'Self\x20Variable\x20%1'[_0x3b622e(0x198)](_0x4741fd['VariableId'])],_0x57e84b=VisuMZ[_0x3b622e(0x2cc)]($gameSelfSwitches[_0x3b622e(0x50f)](_0x5bc4cf),_0x4741fd['Value'],_0x4741fd['Operation']);$gameSelfSwitches['setValue'](_0x5bc4cf,_0x57e84b);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x619),_0x564dad=>{const _0x273c8d=_0x2a2f60;VisuMZ[_0x273c8d(0x2ff)](_0x564dad,_0x564dad);const _0x4dc5f7=$gameTemp[_0x273c8d(0x59c)](),_0x2f9c64={'template':_0x564dad[_0x273c8d(0x50b)],'mapId':_0x564dad[_0x273c8d(0x1ac)]||$gameMap[_0x273c8d(0x2a4)](),'eventId':_0x564dad[_0x273c8d(0x286)]||_0x4dc5f7[_0x273c8d(0x206)](),'x':_0x564dad[_0x273c8d(0x108)],'y':_0x564dad[_0x273c8d(0x212)],'spawnPreserved':_0x564dad['Preserve'],'spawnEventId':$gameMap[_0x273c8d(0x5b9)][_0x273c8d(0x5ca)]+0x3e8},_0x510c81=_0x564dad[_0x273c8d(0x124)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x2f9c64[_0x273c8d(0x2a4)]]&&_0x2f9c64[_0x273c8d(0x2a4)]!==$gameMap[_0x273c8d(0x2a4)]()){let _0x341ebb=_0x273c8d(0x565)[_0x273c8d(0x198)](_0x2f9c64[_0x273c8d(0x2a4)]);_0x341ebb+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x341ebb+=_0x273c8d(0x2b2),_0x341ebb+=_0x273c8d(0x3fc),_0x341ebb+=_0x273c8d(0x356)[_0x273c8d(0x198)](_0x2f9c64[_0x273c8d(0x2a4)]),alert(_0x341ebb);return;}const _0x2eeb92=$gameMap[_0x273c8d(0x40e)](_0x2f9c64,_0x564dad[_0x273c8d(0x44f)],_0x564dad[_0x273c8d(0x3e8)]);if(_0x510c81){if(_0x273c8d(0x58d)===_0x273c8d(0x422)){const _0x123b60=[0x2,0x4,0x6,0x8];_0x47ef1d['isSupportDiagonalMovement']()&&_0x123b60['push'](0x1,0x3,0x7,0x9);const _0x245ad1=[];for(const _0x547df3 of _0x123b60){if(this[_0x273c8d(0x4a5)](this['x'],this['y'],_0x547df3))_0x245ad1['push'](_0x547df3);}if(_0x245ad1['length']>0x0){const _0x37ef72=_0x245ad1[_0x292b30[_0x273c8d(0x278)](_0x245ad1[_0x273c8d(0x5ca)])];this[_0x273c8d(0x4e7)](_0x37ef72);}}else $gameSwitches[_0x273c8d(0x104)](_0x510c81,!!_0x2eeb92);}}),PluginManager['registerCommand'](pluginData[_0x2a2f60(0x4bf)],'SpawnEventAtRegion',_0x5312ae=>{const _0x55cff0=_0x2a2f60;VisuMZ[_0x55cff0(0x2ff)](_0x5312ae,_0x5312ae);const _0x1104d8=$gameTemp[_0x55cff0(0x59c)](),_0x4b80b7={'template':_0x5312ae['TemplateName'],'mapId':_0x5312ae[_0x55cff0(0x1ac)]||$gameMap[_0x55cff0(0x2a4)](),'eventId':_0x5312ae[_0x55cff0(0x286)]||_0x1104d8[_0x55cff0(0x206)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x5312ae[_0x55cff0(0x243)],'spawnEventId':$gameMap['_spawnedEvents'][_0x55cff0(0x5ca)]+0x3e8},_0x62066a=_0x5312ae[_0x55cff0(0x124)]||0x0;if(!VisuMZ[_0x55cff0(0x446)][_0x4b80b7[_0x55cff0(0x2a4)]]&&_0x4b80b7[_0x55cff0(0x2a4)]!==$gameMap['mapId']()){let _0x37233a=_0x55cff0(0x565)[_0x55cff0(0x198)](_0x4b80b7[_0x55cff0(0x2a4)]);_0x37233a+=_0x55cff0(0x3c9),_0x37233a+=_0x55cff0(0x2b2),_0x37233a+=_0x55cff0(0x3fc),_0x37233a+=_0x55cff0(0x356)[_0x55cff0(0x198)](_0x4b80b7[_0x55cff0(0x2a4)]),alert(_0x37233a);return;}const _0x3d7679=$gameMap[_0x55cff0(0x42c)](_0x4b80b7,_0x5312ae['Region'],_0x5312ae['Collision'],_0x5312ae[_0x55cff0(0x3e8)]);if(_0x62066a){if(_0x55cff0(0x3de)===_0x55cff0(0x3de))$gameSwitches[_0x55cff0(0x104)](_0x62066a,!!_0x3d7679);else{if(!this[_0x55cff0(0x1ee)](_0x37a5fc))return;if(_0xdbd1e[_0x55cff0(0x56c)]()){if(!_0x4a8f86['MOBILE_EVENT_LABELS'])return;}let _0x48897b;const _0x93693e=_0x5a6ba3[_0x55cff0(0x193)][_0x55cff0(0x430)][_0x55cff0(0x395)][_0x55cff0(0x44e)]??!![];_0x48897b=_0x93693e?new _0x235b06(_0x4c67bb):new _0x50ecb3(_0x3018bf),_0x48897b['z']=0x8,_0x48897b[_0x55cff0(0x105)]=_0x16f821[_0x55cff0(0x582)]++,this['_tilemap']['addChild'](_0x48897b),this['_labelWindows'][_0x55cff0(0x245)](_0x48897b);}}}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x40f),_0xd5fd93=>{const _0x1e25ac=_0x2a2f60;VisuMZ[_0x1e25ac(0x2ff)](_0xd5fd93,_0xd5fd93);const _0xc458dd=$gameTemp[_0x1e25ac(0x59c)](),_0x44df88={'template':_0xd5fd93[_0x1e25ac(0x50b)],'mapId':_0xd5fd93[_0x1e25ac(0x1ac)]||$gameMap[_0x1e25ac(0x2a4)](),'eventId':_0xd5fd93[_0x1e25ac(0x286)]||_0xc458dd[_0x1e25ac(0x206)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xd5fd93[_0x1e25ac(0x243)],'spawnEventId':$gameMap[_0x1e25ac(0x5b9)][_0x1e25ac(0x5ca)]+0x3e8},_0x56dad8=_0xd5fd93[_0x1e25ac(0x124)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x44df88[_0x1e25ac(0x2a4)]]&&_0x44df88[_0x1e25ac(0x2a4)]!==$gameMap['mapId']()){let _0x2880f1=_0x1e25ac(0x565)['format'](_0x44df88[_0x1e25ac(0x2a4)]);_0x2880f1+=_0x1e25ac(0x3c9),_0x2880f1+=_0x1e25ac(0x2b2),_0x2880f1+=_0x1e25ac(0x3fc),_0x2880f1+=_0x1e25ac(0x356)['format'](_0x44df88[_0x1e25ac(0x2a4)]),alert(_0x2880f1);return;}const _0x56d40e=$gameMap[_0x1e25ac(0x2a5)](_0x44df88,_0xd5fd93[_0x1e25ac(0x560)],_0xd5fd93[_0x1e25ac(0x44f)],_0xd5fd93[_0x1e25ac(0x3e8)]);_0x56dad8&&$gameSwitches['setValue'](_0x56dad8,!!_0x56d40e);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'SpawnEventDespawnEventID',_0x17927e=>{const _0x2cc9af=_0x2a2f60;VisuMZ[_0x2cc9af(0x2ff)](_0x17927e,_0x17927e);const _0x2621a1=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x2cc9af(0x371)](_0x17927e['EventID']||_0x2621a1['eventId']());}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'SpawnEventDespawnAtXY',_0x2e66eb=>{const _0x5896b4=_0x2a2f60;VisuMZ[_0x5896b4(0x2ff)](_0x2e66eb,_0x2e66eb);const _0x4bce25=_0x2e66eb[_0x5896b4(0x108)],_0x175c91=_0x2e66eb[_0x5896b4(0x212)];$gameMap[_0x5896b4(0x3ef)](_0x4bce25,_0x175c91);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],_0x2a2f60(0x190),_0x154326=>{const _0x2c1fbd=_0x2a2f60;VisuMZ['ConvertParams'](_0x154326,_0x154326),$gameMap[_0x2c1fbd(0x191)](_0x154326[_0x2c1fbd(0x64f)]);}),PluginManager[_0x2a2f60(0x2d0)](pluginData['name'],_0x2a2f60(0x401),_0x20fa07=>{const _0x28f486=_0x2a2f60;VisuMZ[_0x28f486(0x2ff)](_0x20fa07,_0x20fa07),$gameMap[_0x28f486(0x1e2)](_0x20fa07[_0x28f486(0x560)]);}),PluginManager[_0x2a2f60(0x2d0)](pluginData[_0x2a2f60(0x4bf)],'SpawnEventDespawnEverything',_0x4a3015=>{const _0x4a39af=_0x2a2f60;VisuMZ[_0x4a39af(0x2ff)](_0x4a3015,_0x4a3015),$gameMap['despawnEverything']();}),VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x181)]=Scene_Boot[_0x2a2f60(0x354)][_0x2a2f60(0x144)],Scene_Boot[_0x2a2f60(0x354)][_0x2a2f60(0x144)]=function(){const _0x2e3409=_0x2a2f60;VisuMZ[_0x2e3409(0x193)][_0x2e3409(0x181)][_0x2e3409(0x3be)](this),this[_0x2e3409(0x5c8)](),this[_0x2e3409(0x3ee)]();if(VisuMZ[_0x2e3409(0x193)]['CustomPageConditions'])VisuMZ[_0x2e3409(0x193)][_0x2e3409(0x2e3)][_0x2e3409(0x222)]();},VisuMZ[_0x2a2f60(0x446)]=[],VisuMZ[_0x2a2f60(0x5bf)]={},Scene_Boot[_0x2a2f60(0x354)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x38f05d=_0x2a2f60;if(DataManager[_0x38f05d(0x461)]()||DataManager[_0x38f05d(0x5d2)]())return;const _0x1483ab=VisuMZ['EventsMoveCore'][_0x38f05d(0x430)][_0x38f05d(0x439)],_0x59ae60=_0x1483ab[_0x38f05d(0x58c)][_0x38f05d(0x256)](0x0);for(const _0x53eb71 of _0x1483ab[_0x38f05d(0x265)]){_0x53eb71[_0x38f05d(0x595)]=_0x53eb71[_0x38f05d(0x595)][_0x38f05d(0x3f0)]()[_0x38f05d(0x637)](),VisuMZ[_0x38f05d(0x5bf)][_0x53eb71['Name']]=_0x53eb71;if(!_0x59ae60[_0x38f05d(0x117)](_0x53eb71[_0x38f05d(0x264)]))_0x59ae60[_0x38f05d(0x245)](_0x53eb71[_0x38f05d(0x264)]);}for(const _0x52bd69 of _0x59ae60){if(_0x38f05d(0x11c)!==_0x38f05d(0x343)){if(VisuMZ[_0x38f05d(0x446)][_0x52bd69])continue;const _0x7a63bb='Map%1.json'[_0x38f05d(0x198)](_0x52bd69[_0x38f05d(0x25c)](0x3)),_0x3c70d6=_0x38f05d(0x426)['format'](_0x52bd69);DataManager[_0x38f05d(0x635)](_0x3c70d6,_0x7a63bb),setTimeout(this['VisuMZ_Setup_Preload_Map']['bind'](this,_0x52bd69,_0x3c70d6),0x64);}else{const _0x1842fe=this[_0x38f05d(0x645)]['attachPictureSettings']();if(_0x1842fe){if(this['_lastAttachPictureFilename']!==_0x1842fe[_0x38f05d(0x5e2)])return!![];if(this[_0x38f05d(0x56e)]!==_0x1842fe[_0x38f05d(0x353)])return!![];if(this[_0x38f05d(0x11d)]!==_0x1842fe['scale'])return!![];}return![];}}},Scene_Boot[_0x2a2f60(0x354)][_0x2a2f60(0x3e9)]=function(_0x2bdb66,_0x596ef7){const _0x3b38ac=_0x2a2f60;window[_0x596ef7]?(VisuMZ[_0x3b38ac(0x446)][_0x2bdb66]=window[_0x596ef7],window[_0x596ef7]=undefined):setTimeout(this[_0x3b38ac(0x3e9)]['bind'](this,_0x2bdb66,_0x596ef7),0x64);},VisuMZ[_0x2a2f60(0x556)]=[],VisuMZ[_0x2a2f60(0x16a)]=[],VisuMZ[_0x2a2f60(0x14a)]=[],VisuMZ[_0x2a2f60(0x4d8)]=[],VisuMZ[_0x2a2f60(0x614)]=[],VisuMZ[_0x2a2f60(0x18d)]=[],Scene_Boot[_0x2a2f60(0x354)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x38dc3e=_0x2a2f60;for(let _0xa32dfa=0x1;_0xa32dfa<$dataSystem['switches'][_0x38dc3e(0x5ca)];_0xa32dfa++){if(_0x38dc3e(0x5d1)!==_0x38dc3e(0x5d1)){const _0x3ad4b9=_0x37ce8f[_0x38dc3e(0x474)]()||this;if(_0x3ad4b9[_0x38dc3e(0x231)]!==_0x530998)_0x3b5e3d['EventsMoveCore'][_0x38dc3e(0x24d)][_0x38dc3e(0x3be)](this,_0x353105,_0x461af7);else{const _0x443746=[_0x3ad4b9[_0x38dc3e(0x623)],_0x3ad4b9[_0x38dc3e(0x4e6)],_0x38dc3e(0x5b3)[_0x38dc3e(0x198)](_0xde6586)];_0x4081ef[_0x38dc3e(0x104)](_0x443746,_0x375206);}}else{if($dataSystem['switches'][_0xa32dfa][_0x38dc3e(0x148)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x38dc3e(0x556)][_0x38dc3e(0x245)](_0xa32dfa);if($dataSystem['switches'][_0xa32dfa][_0x38dc3e(0x148)](/<SELF>/i))VisuMZ[_0x38dc3e(0x16a)][_0x38dc3e(0x245)](_0xa32dfa);if($dataSystem[_0x38dc3e(0x552)][_0xa32dfa][_0x38dc3e(0x148)](/<MAP>/i))VisuMZ[_0x38dc3e(0x14a)][_0x38dc3e(0x245)](_0xa32dfa);}}for(let _0x14b245=0x1;_0x14b245<$dataSystem[_0x38dc3e(0x114)][_0x38dc3e(0x5ca)];_0x14b245++){if(_0x38dc3e(0x2ca)===_0x38dc3e(0x60b))this[_0x38dc3e(0x3ae)]();else{if($dataSystem[_0x38dc3e(0x114)][_0x14b245][_0x38dc3e(0x148)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x38dc3e(0x4d8)][_0x38dc3e(0x245)](_0x14b245);if($dataSystem[_0x38dc3e(0x114)][_0x14b245]['match'](/<SELF>/i))VisuMZ[_0x38dc3e(0x614)][_0x38dc3e(0x245)](_0x14b245);if($dataSystem[_0x38dc3e(0x114)][_0x14b245][_0x38dc3e(0x148)](/<MAP>/i))VisuMZ[_0x38dc3e(0x18d)][_0x38dc3e(0x245)](_0x14b245);}}},VisuMZ['EventsMoveCore'][_0x2a2f60(0x2e3)]={},VisuMZ['EventsMoveCore'][_0x2a2f60(0x2e3)][_0x2a2f60(0x222)]=function(){const _0x30b05b=_0x2a2f60;this[_0x30b05b(0x5c2)]=new Game_CPCInterpreter(),this[_0x30b05b(0x113)]();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2e3)][_0x2a2f60(0x113)]=function(){const _0x181011=_0x2a2f60;this[_0x181011(0x612)]=[];for(const _0xde22f2 of $dataCommonEvents){if('xtdck'!==_0x181011(0x155))_0x5c8b6a['EventsMoveCore']['Game_Character_processMoveCommand']['call'](this,_0x561820);else{if(!_0xde22f2)continue;VisuMZ[_0x181011(0x193)][_0x181011(0x2e3)][_0x181011(0x1f2)](_0xde22f2);if(_0xde22f2[_0x181011(0x460)][_0x181011(0x5ca)]>0x0)this[_0x181011(0x612)][_0x181011(0x245)](_0xde22f2['id']);}}},VisuMZ['EventsMoveCore'][_0x2a2f60(0x2e3)][_0x2a2f60(0x421)]=function(_0x227c72,_0x363a2b,_0x358a22){const _0x44438f=_0x2a2f60;return this[_0x44438f(0x5c2)][_0x44438f(0x5a2)](_0x227c72,_0x363a2b),_0x358a22?this[_0x44438f(0x5c2)]['executeCommonEvent'](_0x358a22):this['_interpreter'][_0x44438f(0x2ef)](),this[_0x44438f(0x5c2)][_0x44438f(0x15f)];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2e3)][_0x2a2f60(0x1f2)]=function(_0x9c9194){const _0xa16fe4=_0x2a2f60;let _0x59e8c1=![];_0x9c9194[_0xa16fe4(0x460)]=[];for(const _0x4c5271 of _0x9c9194[_0xa16fe4(0x364)]){if([0x6c,0x198][_0xa16fe4(0x117)](_0x4c5271[_0xa16fe4(0x58b)])){const _0x54f4da=_0x4c5271[_0xa16fe4(0x3da)][0x0];if(_0x54f4da[_0xa16fe4(0x148)](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0xa16fe4(0x1f3)===_0xa16fe4(0x586)){if(!_0x892e47['advancedFunc'][_0x3eb976]){_0x31df71[_0xa16fe4(0x114)][_0x5c7d4e][_0xa16fe4(0x148)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4d42c0=_0xa16fe4(0x13e)[_0xa16fe4(0x198)](_0x4433de(_0x5c3284['$1']));_0x223664[_0xa16fe4(0x55c)][_0x4906d8]=new _0x1d2d54(_0xa16fe4(0x27b),_0x4d42c0);}const _0x31e6a3=_0x14fd90[_0xa16fe4(0x474)]()||this;return _0x432fc0[_0xa16fe4(0x55c)][_0x2f443c][_0xa16fe4(0x3be)](_0x31e6a3,_0x1cda59);}else _0x59e8c1=!![];}else _0x54f4da[_0xa16fe4(0x148)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0xa16fe4(0x5c6)==='ADkfA'?_0x59e8c1=![]:(_0x14fd5d[_0xa16fe4(0x192)][_0xa16fe4(0x2cd)]=this[_0xa16fe4(0x2ad)](),_0x2072ec[_0xa16fe4(0x192)][_0xa16fe4(0x2b7)]=_0x23ff5e['loadSystem'](_0xb5731d['_shadowSprite']['_filename'])));}_0x59e8c1&&_0x9c9194[_0xa16fe4(0x460)]['push'](_0x4c5271);}},getSelfSwitchValue=function(_0x41dfca,_0x267c45,_0x43026b){const _0x545fe4=_0x2a2f60;let _0x4693b7=[_0x41dfca,_0x267c45,_0x545fe4(0x141)[_0x545fe4(0x198)](_0x43026b)];if(typeof _0x43026b===_0x545fe4(0x1e4)){if(_0x545fe4(0x5fe)==='uElPJ'){let _0x3a3281=[0x0,0x0,_0x545fe4(0x210)['format'](_0x5da748,_0x43af7b)];return _0x133488[_0x545fe4(0x50f)](_0x3a3281);}else _0x4693b7=[_0x41dfca,_0x267c45,_0x43026b['toUpperCase']()[_0x545fe4(0x637)]()];}return $gameSelfSwitches[_0x545fe4(0x50f)](_0x4693b7);},getMapSwitchValue=function(_0x5eed63,_0x36dc59){const _0x25ec77=_0x2a2f60;let _0xfe6142=[0x0,0x0,_0x25ec77(0x210)[_0x25ec77(0x198)](_0x5eed63,_0x36dc59)];return $gameSelfSwitches[_0x25ec77(0x50f)](_0xfe6142);},getMapVariableValue=function(_0x2e76b1,_0x1524ca){const _0x18657b=_0x2a2f60;let _0x582c58=[0x0,0x0,_0x18657b(0x498)[_0x18657b(0x198)](_0x2e76b1,_0x1524ca)];return $gameSelfSwitches[_0x18657b(0x50f)](_0x582c58);},getSelfVariableValue=function(_0x4be1b4,_0x1f4615,_0x212a8e){const _0x59b2b5=_0x2a2f60,_0x2673cd=[_0x4be1b4,_0x1f4615,_0x59b2b5(0x5b3)[_0x59b2b5(0x198)](_0x212a8e)];return $gameSelfSwitches[_0x59b2b5(0x50f)](_0x2673cd);},setSelfSwitchValue=function(_0x323a1a,_0x13a1a7,_0x4df7c0,_0x38d6ae){const _0x39de22=_0x2a2f60;let _0x480cd4=[_0x323a1a,_0x13a1a7,_0x39de22(0x141)['format'](_0x4df7c0)];typeof _0x4df7c0==='string'&&(_0x39de22(0x335)!==_0x39de22(0x335)?(_0xe2d0bb[_0x39de22(0x193)][_0x39de22(0x3e7)][_0x39de22(0x3be)](this),_0x1d5b6b[_0x39de22(0x537)]&&_0x393484[_0x39de22(0x358)](_0x18941f[_0x39de22(0x4ea)]['Settings'][_0x39de22(0x1e5)][_0x39de22(0x274)])&&_0xd2f5fa[_0x39de22(0x289)]()):_0x480cd4=[_0x323a1a,_0x13a1a7,_0x4df7c0[_0x39de22(0x3f0)]()[_0x39de22(0x637)]()]),$gameSelfSwitches['setValue'](_0x480cd4,_0x38d6ae);},setSelfVariableValue=function(_0x41fba4,_0x459cf8,_0x254ff7,_0x39194f){const _0x17fc09=_0x2a2f60,_0x291696=[_0x41fba4,_0x459cf8,_0x17fc09(0x5b3)['format'](_0x254ff7)];$gameSelfSwitches['setValue'](_0x291696,_0x39194f);},setMapSwitchValue=function(_0x8e09c3,_0x823a23,_0x413518){const _0x319d35=_0x2a2f60;let _0x5c07bd=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'['format'](_0x8e09c3,_0x823a23)];$gameSelfSwitches[_0x319d35(0x104)](_0x5c07bd,_0x413518);},setMapVariableValue=function(_0x56969f,_0x57e507,_0x51782f){const _0xa4a17a=_0x2a2f60;let _0x3f9a9a=[0x0,0x0,_0xa4a17a(0x498)[_0xa4a17a(0x198)](_0x56969f,_0x57e507)];$gameSelfSwitches[_0xa4a17a(0x104)](_0x3f9a9a,_0x51782f);},DataManager[_0x2a2f60(0x17b)]=function(_0x5a9e60){const _0x57cc1d=_0x2a2f60;if(SceneManager[_0x57cc1d(0x263)][_0x57cc1d(0x231)]===Scene_Debug)return![];return VisuMZ[_0x57cc1d(0x556)]['includes'](_0x5a9e60);},DataManager[_0x2a2f60(0x40c)]=function(_0x9048d6){const _0x1fd825=_0x2a2f60;if(SceneManager[_0x1fd825(0x263)]['constructor']===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0x1fd825(0x117)](_0x9048d6);},DataManager[_0x2a2f60(0x260)]=function(_0x7635e7){const _0x7674b2=_0x2a2f60;if(SceneManager[_0x7674b2(0x263)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x7674b2(0x16a)][_0x7674b2(0x117)](_0x7635e7);},DataManager[_0x2a2f60(0x41a)]=function(_0x42f546){const _0x314736=_0x2a2f60;if(SceneManager[_0x314736(0x263)]['constructor']===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x314736(0x117)](_0x42f546);},DataManager[_0x2a2f60(0x3ac)]=function(_0x5754b0){const _0x20af22=_0x2a2f60;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x20af22(0x14a)][_0x20af22(0x117)](_0x5754b0);},DataManager['isMapVariable']=function(_0x2ddd66){const _0x22aec5=_0x2a2f60;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x22aec5(0x18d)][_0x22aec5(0x117)](_0x2ddd66);},SceneManager[_0x2a2f60(0x451)]=function(){const _0x2ce86e=_0x2a2f60;return this[_0x2ce86e(0x263)]&&this[_0x2ce86e(0x263)][_0x2ce86e(0x231)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0xb9ad55=_0x2a2f60;return this[_0xb9ad55(0x263)]&&this[_0xb9ad55(0x263)]instanceof Scene_Map;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x205)]=Game_Temp[_0x2a2f60(0x354)]['setDestination'],Game_Temp['prototype'][_0x2a2f60(0x18f)]=function(_0x1eb3f9,_0x1a7d83){const _0x38f5ce=_0x2a2f60;if(this[_0x38f5ce(0x201)](_0x1eb3f9,_0x1a7d83))return;VisuMZ[_0x38f5ce(0x193)][_0x38f5ce(0x205)]['call'](this,_0x1eb3f9,_0x1a7d83);},Game_Temp[_0x2a2f60(0x354)][_0x2a2f60(0x201)]=function(_0x47e650,_0x3f83b7){const _0x2138c6=_0x2a2f60,_0x4cd44a=$gameMap[_0x2138c6(0x166)](_0x47e650,_0x3f83b7);for(const _0x3fa9b2 of _0x4cd44a){if(_0x3fa9b2&&_0x3fa9b2[_0x2138c6(0x1b0)]())return _0x3fa9b2[_0x2138c6(0x559)](),!![];}return TouchInput[_0x2138c6(0x238)]()&&_0x4cd44a['length']>0x0&&(_0x2138c6(0x2ba)!==_0x2138c6(0x2ba)?(_0x4b524e[_0x2138c6(0x354)][_0x2138c6(0x405)][_0x2138c6(0x3be)](this),this[_0x2138c6(0x14e)][_0x2138c6(0x53b)]=this[_0x2138c6(0x23f)]()):TouchInput[_0x2138c6(0x289)]()),![];},Game_Temp[_0x2a2f60(0x354)]['setLastPluginCommandInterpreter']=function(_0x55010a){const _0x1380a0=_0x2a2f60;this[_0x1380a0(0x5e9)]=_0x55010a;},Game_Temp[_0x2a2f60(0x354)][_0x2a2f60(0x59c)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x2a2f60(0x354)][_0x2a2f60(0x496)]=function(_0x709758){const _0x4628ab=_0x2a2f60;this[_0x4628ab(0x1be)]=_0x709758;},Game_Temp[_0x2a2f60(0x354)][_0x2a2f60(0x17f)]=function(){const _0x5254f3=_0x2a2f60;this[_0x5254f3(0x1be)]=undefined;},Game_Temp[_0x2a2f60(0x354)][_0x2a2f60(0x474)]=function(){const _0x9ecb6a=_0x2a2f60;return this[_0x9ecb6a(0x1be)];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x63a)]=Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x222)],Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x222)]=function(){const _0x11dbe3=_0x2a2f60;VisuMZ[_0x11dbe3(0x193)]['Game_System_initialize']['call'](this),this[_0x11dbe3(0x57f)](),this[_0x11dbe3(0x5a3)]();},Game_System['prototype']['initEventsMoveCore']=function(){const _0x4a98cc=_0x2a2f60;this[_0x4a98cc(0x4e4)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x4a98cc(0x5c1)]={},this['_MapSpawnedEventData']=[],this[_0x4a98cc(0x407)]={},this[_0x4a98cc(0x15e)]={},this[_0x4a98cc(0x1ef)]=![],this[_0x4a98cc(0x4d2)]=_0x4a98cc(0x5c4);},Game_System['prototype'][_0x2a2f60(0x363)]=function(){const _0x1949d8=_0x2a2f60;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x1949d8(0x4e4)][_0x1949d8(0x26b)]===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings'][_0x1949d8(0x26b)];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x42d)]=function(_0x5ead87){const _0x21b52d=_0x2a2f60;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x21b52d(0x26b)]===undefined)this[_0x21b52d(0x57f)]();this[_0x21b52d(0x4e4)]['DashingEnable']=_0x5ead87;},Game_System[_0x2a2f60(0x354)]['isAllowEventAutoMovement']=function(){const _0x5493bb=_0x2a2f60;if(this[_0x5493bb(0x4e4)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x5493bb(0x545)]===undefined)this[_0x5493bb(0x57f)]();return this[_0x5493bb(0x4e4)][_0x5493bb(0x545)];},Game_System['prototype'][_0x2a2f60(0x18e)]=function(_0x593bd9){const _0x30b79d=_0x2a2f60;if(this['_EventsMoveCoreSettings']===undefined)this[_0x30b79d(0x57f)]();if(this[_0x30b79d(0x4e4)][_0x30b79d(0x545)]===undefined)this[_0x30b79d(0x57f)]();this[_0x30b79d(0x4e4)]['EventAutoMovement']=_0x593bd9;},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x248)]=function(){const _0x5d5e66=_0x2a2f60;if(this[_0x5d5e66(0x4e4)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings']['VisibleEventLabels']===undefined)this[_0x5d5e66(0x57f)]();return this['_EventsMoveCoreSettings']['VisibleEventLabels'];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x1f9)]=function(_0x421013){const _0x2ee197=_0x2a2f60;if(this[_0x2ee197(0x4e4)]===undefined)this['initEventsMoveCore']();if(this[_0x2ee197(0x4e4)][_0x2ee197(0x39a)]===undefined)this[_0x2ee197(0x57f)]();this[_0x2ee197(0x4e4)][_0x2ee197(0x39a)]=_0x421013;},Game_System[_0x2a2f60(0x354)]['isPlayerControlDisabled']=function(){const _0x5d2750=_0x2a2f60;return this[_0x5d2750(0x1ef)]===undefined&&(this['_DisablePlayerControl']=![]),this[_0x5d2750(0x1ef)];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x60c)]=function(_0x25b1de){const _0x1bebbc=_0x2a2f60;this[_0x1bebbc(0x1ef)]=_0x25b1de;},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x4dd)]=function(){const _0x13aee7=_0x2a2f60;return this[_0x13aee7(0x4d2)];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x47e)]=function(_0x4bf695){const _0x2b4d4f=_0x2a2f60;this[_0x2b4d4f(0x4d2)]=String(_0x4bf695)['toLowerCase']()[_0x2b4d4f(0x637)]();},Game_System['prototype'][_0x2a2f60(0x5e3)]=function(_0x23994e){const _0x4e7539=_0x2a2f60;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();if(!_0x23994e)return null;if(_0x23994e===$gamePlayer){if(_0x4e7539(0x3bb)===_0x4e7539(0x3bb))return this[_0x4e7539(0x5c1)][_0x4e7539(0x5f2)];else{if([0x6c,0x198][_0x4e7539(0x117)](_0x6ed870['code'])){if(_0x213b21!=='')_0x253317+='\x0a';_0x4c13a7+=_0x35d88e[_0x4e7539(0x3da)][0x0];}}}else{if(_0x4e7539(0x61a)===_0x4e7539(0x61a)){const _0x2291c1=VisuMZ[_0x4e7539(0x193)]['Settings'],_0x45f4c9=_0x4e7539(0x488)[_0x4e7539(0x198)](_0x23994e[_0x4e7539(0x623)],_0x23994e[_0x4e7539(0x4e6)]);return this[_0x4e7539(0x5c1)][_0x45f4c9]=this[_0x4e7539(0x5c1)][_0x45f4c9]||{'iconIndex':0x0,'bufferX':_0x2291c1[_0x4e7539(0x5d0)][_0x4e7539(0x457)],'bufferY':_0x2291c1[_0x4e7539(0x5d0)][_0x4e7539(0x151)],'blendMode':_0x2291c1['Icon']['BlendMode']},this[_0x4e7539(0x5c1)][_0x45f4c9];}else{let _0x4a4760=0x0;if(_0x1d9451)_0x593191[_0x4e7539(0x17a)]=!![];_0x49726d['isSupportDiagonalMovement']()?_0x4a4760=this[_0x4e7539(0x209)](_0x3dd1d9,_0x554da5):_0x4a4760=this[_0x4e7539(0x32a)](_0xe6dcc4,_0x48e9f5);if(_0x1cc1cf)_0x56fdde[_0x4e7539(0x17a)]=![];this[_0x4e7539(0x4e7)](_0x4a4760),this[_0x4e7539(0x291)](!![]);}}},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x3b9)]=function(_0xf2fd30,_0x35a244,_0x2e6ffa,_0x1ae369,_0x12c248){const _0x147a44=_0x2a2f60;if(this['_EventIcons']===undefined)this[_0x147a44(0x57f)]();const _0x1b7e22=_0xf2fd30===$gamePlayer?_0x147a44(0x5f2):_0x147a44(0x488)[_0x147a44(0x198)](_0xf2fd30[_0x147a44(0x623)],_0xf2fd30[_0x147a44(0x4e6)]);this[_0x147a44(0x5c1)][_0x1b7e22]={'iconIndex':_0x35a244,'bufferX':_0x2e6ffa,'bufferY':_0x1ae369,'blendMode':_0x12c248};},Game_System[_0x2a2f60(0x354)]['setEventIconDataKey']=function(_0x1ccbba,_0x462b76,_0x406378,_0x235b3a,_0x531e42,_0x64e03d){const _0x1f2d8d=_0x2a2f60;if(this[_0x1f2d8d(0x5c1)]===undefined)this[_0x1f2d8d(0x57f)]();const _0x1b3323=_0x1f2d8d(0x488)['format'](_0x1ccbba,_0x462b76);this[_0x1f2d8d(0x5c1)][_0x1b3323]={'iconIndex':_0x406378,'bufferX':_0x235b3a,'bufferY':_0x531e42,'blendMode':_0x64e03d};},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x25d)]=function(_0x5e0ba3){const _0x158b9c=_0x2a2f60;if(this[_0x158b9c(0x5c1)]===undefined)this[_0x158b9c(0x57f)]();if(!_0x5e0ba3)return null;_0x5e0ba3===$gamePlayer?delete this[_0x158b9c(0x5c1)][_0x158b9c(0x5f2)]:_0x158b9c(0x55d)!==_0x158b9c(0x55d)?this[_0x158b9c(0x25e)]=!![]:this['deleteIconsOnEventsDataKey'](_0x5e0ba3[_0x158b9c(0x623)],_0x5e0ba3[_0x158b9c(0x4e6)]);},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x5d3)]=function(_0xe5078e,_0x1cfe76){const _0x22de9d=_0x2a2f60;if(this[_0x22de9d(0x5c1)]===undefined)this[_0x22de9d(0x57f)]();const _0x11c8b2='Map%1-Event%2'[_0x22de9d(0x198)](_0xe5078e,_0x1cfe76);delete this[_0x22de9d(0x5c1)][_0x11c8b2];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x60f)]=function(_0x565fbe){const _0x54c195=_0x2a2f60;if(this[_0x54c195(0x15e)]===undefined)this[_0x54c195(0x57f)]();if(!_0x565fbe)return null;const _0x79798f='Map%1-Event%2'[_0x54c195(0x198)](_0x565fbe[_0x54c195(0x623)],_0x565fbe[_0x54c195(0x4e6)]);return this[_0x54c195(0x15e)][_0x79798f];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x100)]=function(_0x39af3b){const _0x1b5c19=_0x2a2f60;if(this[_0x1b5c19(0x15e)]===undefined)this[_0x1b5c19(0x57f)]();if(!_0x39af3b)return;const _0x171c91=_0x1b5c19(0x488)[_0x1b5c19(0x198)](_0x39af3b[_0x1b5c19(0x623)],_0x39af3b['_eventId']);this[_0x1b5c19(0x15e)][_0x171c91]={'direction':_0x39af3b['direction'](),'x':Math[_0x1b5c19(0x4b9)](_0x39af3b['x']),'y':Math[_0x1b5c19(0x4b9)](_0x39af3b['y']),'pageIndex':_0x39af3b[_0x1b5c19(0x4b1)],'moveRouteIndex':_0x39af3b['_moveRouteIndex']};},Game_System['prototype'][_0x2a2f60(0x314)]=function(_0x3e3d92){const _0x1a0798=_0x2a2f60;if(this[_0x1a0798(0x15e)]===undefined)this[_0x1a0798(0x57f)]();if(!_0x3e3d92)return;this[_0x1a0798(0x235)](_0x3e3d92[_0x1a0798(0x623)],_0x3e3d92['_eventId']);},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x235)]=function(_0x12afc4,_0x27c857){const _0x46a6b3=_0x2a2f60;if(this['_SavedEventLocations']===undefined)this[_0x46a6b3(0x57f)]();const _0x1c1080=_0x46a6b3(0x488)[_0x46a6b3(0x198)](_0x12afc4,_0x27c857);delete this[_0x46a6b3(0x15e)][_0x1c1080];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x14f)]=function(_0x54025b,_0x5f14f1,_0x3b2fff,_0x4dd411,_0x4993e7,_0x2ef251,_0x1ebadf){const _0x5cbc45=_0x2a2f60;if(this['_SavedEventLocations']===undefined)this[_0x5cbc45(0x57f)]();const _0x49f5a1=_0x5cbc45(0x488)['format'](_0x54025b,_0x5f14f1);this['_SavedEventLocations'][_0x49f5a1]={'direction':_0x4993e7,'x':Math[_0x5cbc45(0x4b9)](_0x3b2fff),'y':Math[_0x5cbc45(0x4b9)](_0x4dd411),'pageIndex':_0x2ef251,'moveRouteIndex':_0x1ebadf};},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x64b)]=function(_0xd187af){const _0x3ffbf1=_0x2a2f60;if(this[_0x3ffbf1(0x407)]===undefined)this['initEventsMoveCore']();if(!_0xd187af)return;const _0x93abcb=_0x3ffbf1(0x488)['format'](_0xd187af[_0x3ffbf1(0x623)],_0xd187af['_eventId']);return this[_0x3ffbf1(0x407)][_0x93abcb];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x507)]=function(_0x251a72,_0x5bad54,_0xa7a15c,_0x2b4799,_0xd366bd){const _0x1baa4b=_0x2a2f60;if(this['_PreservedEventMorphData']===undefined)this[_0x1baa4b(0x57f)]();const _0x2ff4fd=_0x1baa4b(0x488)[_0x1baa4b(0x198)](_0x251a72,_0x5bad54);this[_0x1baa4b(0x407)][_0x2ff4fd]={'template':_0xa7a15c,'mapId':_0x2b4799,'eventId':_0xd366bd};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0x5005aa,_0x2c0bd8){const _0x179b17=_0x2a2f60;if(this[_0x179b17(0x407)]===undefined)this[_0x179b17(0x57f)]();const _0x570e69=_0x179b17(0x488)[_0x179b17(0x198)](_0x5005aa,_0x2c0bd8);delete this[_0x179b17(0x407)][_0x570e69];},Game_System[_0x2a2f60(0x354)]['getMapSpawnedEventData']=function(_0x128472){const _0x3ce9c4=_0x2a2f60;if(this[_0x3ce9c4(0x511)]===undefined)this[_0x3ce9c4(0x57f)]();return this[_0x3ce9c4(0x511)][_0x128472]=this[_0x3ce9c4(0x511)][_0x128472]||[],this[_0x3ce9c4(0x511)][_0x128472];},Game_System['prototype']['removeTemporaryMapSpawnedEvents']=function(_0x2307d3){const _0x133420=_0x2a2f60,_0x58883f=this[_0x133420(0x648)](_0x2307d3);for(const _0x2fb4db of _0x58883f){if(_0x133420(0x163)===_0x133420(0x163)){if(!_0x2fb4db)continue;if(_0x2fb4db[_0x133420(0x3db)])continue;const _0x7cd836=_0x58883f[_0x133420(0x5bb)](_0x2fb4db);_0x58883f[_0x7cd836]=null;}else return _0x2bcfd8[_0x133420(0x193)]['Settings'][_0x133420(0x395)][_0x133420(0x252)];}},Game_System['prototype'][_0x2a2f60(0x5a3)]=function(){const _0xdcd401=_0x2a2f60;this[_0xdcd401(0x4ee)]=0x0,this[_0xdcd401(0x367)]=![];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x4f8)]=function(){const _0x11d564=_0x2a2f60;if(this['_followerControlID']===undefined)this[_0x11d564(0x5a3)]();return this[_0x11d564(0x4ee)];},Game_System[_0x2a2f60(0x354)][_0x2a2f60(0x620)]=function(_0x11602b){const _0x2d6316=_0x2a2f60;if(this[_0x2d6316(0x4ee)]===undefined)this[_0x2d6316(0x5a3)]();this[_0x2d6316(0x4ee)]=_0x11602b;;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5e5)]=Game_Interpreter['prototype'][_0x2a2f60(0x398)],Game_Interpreter['prototype'][_0x2a2f60(0x398)]=function(_0x19f970){const _0x22a0c9=_0x2a2f60;if(!$gameParty['inBattle']()&&_0x19f970<0x0){if(_0x22a0c9(0x527)===_0x22a0c9(0x3a2)){if(_0x77dd91>this['x']&&this[_0x22a0c9(0x4a5)](this['x'],this['y'],0x6))_0x121d21=0x3;if(_0x264bb3<this['x']&&this[_0x22a0c9(0x4a5)](this['x'],this['y'],0x4))_0x20ad71=0x1;}else{let _0x2804d1=$gameSystem[_0x22a0c9(0x4f8)]();if(_0x2804d1>0x0){if(_0x22a0c9(0x1ec)===_0x22a0c9(0x1ec))return $gamePlayer[_0x22a0c9(0x136)]()[_0x22a0c9(0x2d1)](_0x2804d1-0x1);else this[_0x22a0c9(0x304)](),_0x26d688['EventsMoveCore'][_0x22a0c9(0x18a)][_0x22a0c9(0x3be)](this),this['updatePose']();}}}return VisuMZ[_0x22a0c9(0x193)][_0x22a0c9(0x5e5)][_0x22a0c9(0x3be)](this,_0x19f970);},Game_System['prototype'][_0x2a2f60(0x3a6)]=function(){const _0x40f6d0=_0x2a2f60;if(this[_0x40f6d0(0x367)]===undefined)this[_0x40f6d0(0x5a3)]();return this[_0x40f6d0(0x367)];},Game_System[_0x2a2f60(0x354)]['setStopFollowerChasing']=function(_0x314a74){const _0x54357d=_0x2a2f60;if(this[_0x54357d(0x367)]===undefined)this[_0x54357d(0x5a3)]();this[_0x54357d(0x367)]=_0x314a74;;},VisuMZ['EventsMoveCore'][_0x2a2f60(0x435)]=Game_Followers[_0x2a2f60(0x354)][_0x2a2f60(0x655)],Game_Followers['prototype'][_0x2a2f60(0x655)]=function(){const _0x22ea1c=_0x2a2f60;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x22ea1c(0x193)]['Game_Followers_jumpAll'][_0x22ea1c(0x3be)](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x554)]=Game_Timer['prototype'][_0x2a2f60(0x222)],Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x222)]=function(){const _0x381150=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x381150(0x554)][_0x381150(0x3be)](this),this[_0x381150(0x57f)]();},Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x57f)]=function(){const _0x5019a2=_0x2a2f60;this[_0x5019a2(0x536)]=![],this['_speed']=-0x1,this[_0x5019a2(0x381)]=0x0;},Game_Timer['prototype'][_0x2a2f60(0x481)]=function(_0x31c9f8){const _0x573db4=_0x2a2f60;if(!_0x31c9f8)return;if(!this[_0x573db4(0x437)])return;if(this[_0x573db4(0x536)])return;if(this['_frames']<=0x0)return;if(this[_0x573db4(0x2c7)]===undefined)this[_0x573db4(0x57f)]();this[_0x573db4(0x1d4)]+=this[_0x573db4(0x2c7)],this['_frames']<=0x0&&(_0x573db4(0x653)==='pucJy'?this[_0x573db4(0x192)]['z']=this['z']-0x1:this[_0x573db4(0x3ab)]());},VisuMZ[_0x2a2f60(0x193)]['Game_Timer_start']=Game_Timer['prototype'][_0x2a2f60(0x375)],Game_Timer['prototype']['start']=function(_0x2a74b5){const _0x377ada=_0x2a2f60;VisuMZ[_0x377ada(0x193)][_0x377ada(0x604)][_0x377ada(0x3be)](this,_0x2a74b5);if(this['_paused']===undefined)this[_0x377ada(0x57f)]();this[_0x377ada(0x536)]=![];},VisuMZ[_0x2a2f60(0x193)]['Game_Timer_stop']=Game_Timer['prototype']['stop'],Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x140)]=function(){const _0x13739c=_0x2a2f60;VisuMZ[_0x13739c(0x193)][_0x13739c(0x2bd)]['call'](this);if(this[_0x13739c(0x536)]===undefined)this[_0x13739c(0x57f)]();this[_0x13739c(0x536)]=![];},Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x1db)]=function(){const _0x10df27=_0x2a2f60;if(this[_0x10df27(0x1d4)]<=0x0)return;this[_0x10df27(0x536)]=!![],this['_working']=!![];},Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x5f5)]=function(){const _0x3df8b5=_0x2a2f60;if(this[_0x3df8b5(0x1d4)]<=0x0)return;this[_0x3df8b5(0x536)]=![],this[_0x3df8b5(0x437)]=!![];},Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x11f)]=function(_0x4d499d){const _0x5c4e50=_0x2a2f60;this[_0x5c4e50(0x1d4)]=this[_0x5c4e50(0x1d4)]||0x0,this[_0x5c4e50(0x1d4)]+=_0x4d499d,this[_0x5c4e50(0x437)]=!![],this[_0x5c4e50(0x1d4)]=Math[_0x5c4e50(0x431)](0x1,this[_0x5c4e50(0x1d4)]);},Game_Timer['prototype'][_0x2a2f60(0x1b6)]=function(_0x504809){const _0x11b19a=_0x2a2f60;this[_0x11b19a(0x1d4)]=this['_frames']||0x0,this[_0x11b19a(0x1d4)]=_0x504809,this['_working']=!![],this['_frames']=Math['max'](0x1,this[_0x11b19a(0x1d4)]);},Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x3f7)]=function(_0x34e542){const _0x479221=_0x2a2f60;this[_0x479221(0x2c7)]=_0x34e542,this[_0x479221(0x437)]=!![],_0x34e542>0x0&&(this[_0x479221(0x1d4)]=Math[_0x479221(0x431)](this['_frames'],0x1));},Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x121)]=function(_0x24ddef){const _0x2c5125=_0x2a2f60;if(this[_0x2c5125(0x381)]===undefined)this['initEventsMoveCore']();this[_0x2c5125(0x381)]=_0x24ddef;},VisuMZ['EventsMoveCore']['Game_Timer_onExpire']=Game_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x3ab)],Game_Timer['prototype']['onExpire']=function(){const _0x1a489b=_0x2a2f60;if(this[_0x1a489b(0x381)]===undefined)this[_0x1a489b(0x57f)]();if(this[_0x1a489b(0x381)]){if(_0x1a489b(0x651)===_0x1a489b(0x2b3)){if(this[_0x1a489b(0x5a5)]()&&!_0x52ea3a[_0x1a489b(0x1a9)]()){if(this[_0x1a489b(0x5a5)]()[_0x1a489b(0x45c)][_0x1a489b(0x148)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this['_advancedSwitchVariable']=![],this[_0x1a489b(0x333)]=![],this['event']()?_0x4639ae[_0x1a489b(0x193)][_0x1a489b(0x523)][_0x1a489b(0x3be)](this):-0x1;}else $gameTemp['reserveCommonEvent'](this[_0x1a489b(0x381)]);}else{if(_0x1a489b(0x4f7)!==_0x1a489b(0x4f7)){const _0x16bfbc=this['_randomHomeX'],_0x558854=this['_randomHomeY'];return this[_0x1a489b(0x369)](_0x16bfbc,_0x558854);}else VisuMZ[_0x1a489b(0x193)][_0x1a489b(0x237)]['call'](this);}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x3b2)]=Game_Message[_0x2a2f60(0x354)]['add'],Game_Message[_0x2a2f60(0x354)][_0x2a2f60(0x281)]=function(_0x5714d9){const _0x2994eb=_0x2a2f60;VisuMZ['EventsMoveCore']['Game_Message_add']['call'](this,_0x5714d9),this['_selfEvent']=$gameTemp[_0x2994eb(0x474)]();},Game_Message['prototype'][_0x2a2f60(0x563)]=function(){$gameTemp['registerSelfTarget'](this['_selfEvent']);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x128)]=Game_Switches[_0x2a2f60(0x354)][_0x2a2f60(0x50f)],Game_Switches[_0x2a2f60(0x354)][_0x2a2f60(0x50f)]=function(_0x1b5ca3){const _0x2a73d5=_0x2a2f60;if(DataManager[_0x2a73d5(0x17b)](_0x1b5ca3))return!!this[_0x2a73d5(0x168)](_0x1b5ca3);else{if(DataManager[_0x2a73d5(0x260)](_0x1b5ca3))return!!this[_0x2a73d5(0x3e0)](_0x1b5ca3);else return DataManager[_0x2a73d5(0x3ac)](_0x1b5ca3)?_0x2a73d5(0x419)===_0x2a73d5(0x419)?!!this['mapValue'](_0x1b5ca3):_0x33b1e9[_0x2a73d5(0x37a)]:VisuMZ['EventsMoveCore'][_0x2a73d5(0x128)][_0x2a73d5(0x3be)](this,_0x1b5ca3);}},Game_Switches[_0x2a2f60(0x55c)]={},Game_Switches[_0x2a2f60(0x354)][_0x2a2f60(0x168)]=function(_0x418d4c){const _0x55aeec=_0x2a2f60;if(!Game_Switches['advancedFunc'][_0x418d4c]){$dataSystem['switches'][_0x418d4c]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0xcd7104=_0x55aeec(0x13e)[_0x55aeec(0x198)](String(RegExp['$1']));Game_Switches[_0x55aeec(0x55c)][_0x418d4c]=new Function(_0x55aeec(0x59f),_0xcd7104);}const _0x4ed39a=$gameTemp[_0x55aeec(0x474)]()||this;return Game_Switches['advancedFunc'][_0x418d4c][_0x55aeec(0x3be)](_0x4ed39a,_0x418d4c);},Game_Switches[_0x2a2f60(0x354)][_0x2a2f60(0x3e0)]=function(_0x5c853e){const _0x24c57b=_0x2a2f60,_0x12440e=$gameTemp[_0x24c57b(0x474)]()||this;if(_0x12440e[_0x24c57b(0x231)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x24c57b(0x128)][_0x24c57b(0x3be)](this,_0x5c853e);else{const _0x1c78ed=[_0x12440e[_0x24c57b(0x623)],_0x12440e[_0x24c57b(0x4e6)],_0x24c57b(0x141)[_0x24c57b(0x198)](_0x5c853e)];return $gameSelfSwitches[_0x24c57b(0x50f)](_0x1c78ed);}},Game_Switches[_0x2a2f60(0x354)][_0x2a2f60(0x4e1)]=function(_0x5c7bc2){const _0x3acb2e=_0x2a2f60,_0x229c1a=$gameMap?$gameMap[_0x3acb2e(0x2a4)]():0x0,_0x1eca3e=[0x0,0x0,_0x3acb2e(0x210)[_0x3acb2e(0x198)](_0x229c1a,_0x5c7bc2)];return $gameSelfSwitches['value'](_0x1eca3e);},VisuMZ[_0x2a2f60(0x193)]['Game_Switches_setValue']=Game_Switches[_0x2a2f60(0x354)]['setValue'],Game_Switches['prototype'][_0x2a2f60(0x104)]=function(_0x351227,_0x5119e1){const _0x396ea6=_0x2a2f60;if(DataManager['isSelfSwitch'](_0x351227))this['setSelfValue'](_0x351227,_0x5119e1);else{if(DataManager[_0x396ea6(0x3ac)](_0x351227))this[_0x396ea6(0x130)](_0x351227,_0x5119e1);else{if(_0x396ea6(0x115)===_0x396ea6(0x115))VisuMZ[_0x396ea6(0x193)][_0x396ea6(0x219)][_0x396ea6(0x3be)](this,_0x351227,_0x5119e1);else{const _0x4aa82c=this[_0x396ea6(0x188)](_0x53f976,_0x4d07a7,![]);if(_0x4aa82c)this[_0x396ea6(0x47d)](_0x4aa82c);}}}},Game_Switches['prototype'][_0x2a2f60(0x489)]=function(_0x57c86d,_0x19b37f){const _0x154dbf=_0x2a2f60,_0x554929=$gameTemp[_0x154dbf(0x474)]()||this;if(_0x554929[_0x154dbf(0x231)]!==Game_Event)VisuMZ['EventsMoveCore'][_0x154dbf(0x219)][_0x154dbf(0x3be)](this,_0x57c86d,_0x19b37f);else{const _0x5ebe4e=[_0x554929[_0x154dbf(0x623)],_0x554929[_0x154dbf(0x4e6)],'Self\x20Switch\x20%1'[_0x154dbf(0x198)](_0x57c86d)];$gameSelfSwitches[_0x154dbf(0x104)](_0x5ebe4e,_0x19b37f);}},Game_Switches[_0x2a2f60(0x354)][_0x2a2f60(0x130)]=function(_0x18d051,_0x5b2c77){const _0x39ba36=_0x2a2f60,_0x89bac6=$gameMap?$gameMap[_0x39ba36(0x2a4)]():0x0,_0x5e7c02=[0x0,0x0,_0x39ba36(0x210)[_0x39ba36(0x198)](_0x89bac6,_0x18d051)];return $gameSelfSwitches[_0x39ba36(0x104)](_0x5e7c02,_0x5b2c77);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x204)]=Game_Variables['prototype'][_0x2a2f60(0x50f)],Game_Variables['prototype'][_0x2a2f60(0x50f)]=function(_0x88b54d){const _0x44144c=_0x2a2f60;if(DataManager['isAdvancedVariable'](_0x88b54d)){if(_0x44144c(0x414)!==_0x44144c(0x28f))return this[_0x44144c(0x168)](_0x88b54d);else this[_0x44144c(0x4cf)]();}else{if(DataManager['isSelfVariable'](_0x88b54d))return this['selfValue'](_0x88b54d);else{if(DataManager[_0x44144c(0x32c)](_0x88b54d))return this[_0x44144c(0x4e1)](_0x88b54d);else{if(_0x44144c(0x568)!==_0x44144c(0x588))return VisuMZ[_0x44144c(0x193)]['Game_Variables_value']['call'](this,_0x88b54d);else{const _0x687490=_0x493c9c[_0x2f086e[_0x44144c(0x278)](_0x18be0[_0x44144c(0x5ca)])];return _0x7db1ca['x']=_0x687490[0x0],_0x34d91d['y']=_0x687490[0x1],this[_0x44144c(0x60d)](_0x2554cf),!![];}}}}},Game_Variables[_0x2a2f60(0x55c)]={},Game_Variables['prototype']['advancedValue']=function(_0x171654){const _0x42b6ce=_0x2a2f60;if(!Game_Variables[_0x42b6ce(0x55c)][_0x171654]){$dataSystem['variables'][_0x171654][_0x42b6ce(0x148)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x12eba6=_0x42b6ce(0x13e)[_0x42b6ce(0x198)](String(RegExp['$1']));Game_Variables[_0x42b6ce(0x55c)][_0x171654]=new Function(_0x42b6ce(0x27b),_0x12eba6);}const _0x26a34f=$gameTemp[_0x42b6ce(0x474)]()||this;return Game_Variables[_0x42b6ce(0x55c)][_0x171654][_0x42b6ce(0x3be)](_0x26a34f,_0x171654);},Game_Variables['prototype']['selfValue']=function(_0x56bc22){const _0x21cacb=_0x2a2f60,_0x27198d=$gameTemp[_0x21cacb(0x474)]()||this;if(_0x27198d[_0x21cacb(0x231)]!==Game_Event)return VisuMZ[_0x21cacb(0x193)][_0x21cacb(0x204)][_0x21cacb(0x3be)](this,_0x56bc22);else{const _0x44f7b8=[_0x27198d[_0x21cacb(0x623)],_0x27198d[_0x21cacb(0x4e6)],_0x21cacb(0x5b3)[_0x21cacb(0x198)](_0x56bc22)];return $gameSelfSwitches[_0x21cacb(0x50f)](_0x44f7b8);}},Game_Variables[_0x2a2f60(0x354)][_0x2a2f60(0x4e1)]=function(_0x800f22){const _0x1ecf32=_0x2a2f60,_0x502748=$gameMap?$gameMap[_0x1ecf32(0x2a4)]():0x0,_0x567802=[0x0,0x0,_0x1ecf32(0x498)[_0x1ecf32(0x198)](_0x502748,_0x800f22)];return $gameSelfSwitches[_0x1ecf32(0x50f)](_0x567802)||0x0;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x24d)]=Game_Variables['prototype'][_0x2a2f60(0x104)],Game_Variables['prototype'][_0x2a2f60(0x104)]=function(_0x40a30f,_0xe91889){const _0x2d19e0=_0x2a2f60;if(DataManager['isSelfVariable'](_0x40a30f))this[_0x2d19e0(0x489)](_0x40a30f,_0xe91889);else DataManager[_0x2d19e0(0x32c)](_0x40a30f)?'hDsTd'!==_0x2d19e0(0x176)?this[_0x2d19e0(0x130)](_0x40a30f,_0xe91889):(this[_0x2d19e0(0x463)]=_0x22905d,_0x1db012[_0x2d19e0(0x193)][_0x2d19e0(0x1dc)][_0x2d19e0(0x3be)](this,_0x572d08)):VisuMZ[_0x2d19e0(0x193)][_0x2d19e0(0x24d)][_0x2d19e0(0x3be)](this,_0x40a30f,_0xe91889);},Game_Variables[_0x2a2f60(0x354)][_0x2a2f60(0x489)]=function(_0x4dbd96,_0x34428e){const _0x1dc63d=_0x2a2f60,_0x4a55d2=$gameTemp[_0x1dc63d(0x474)]()||this;if(_0x4a55d2[_0x1dc63d(0x231)]!==Game_Event){if('kHIFI'===_0x1dc63d(0x32b))return _0x49fe31>=0x3e8?(_0x1aa993-=0x3e8,this[_0x1dc63d(0x5b9)][_0x5d2853]):_0x305981[_0x1dc63d(0x193)][_0x1dc63d(0x35b)][_0x1dc63d(0x3be)](this,_0x3b90f0);else VisuMZ['EventsMoveCore'][_0x1dc63d(0x24d)][_0x1dc63d(0x3be)](this,_0x4dbd96,_0x34428e);}else{if('BJeZB'===_0x1dc63d(0x189)){if(!_0x401d91[_0x1dc63d(0x10a)]())return;_0x4db732['pause']();}else{const _0x225c43=[_0x4a55d2[_0x1dc63d(0x623)],_0x4a55d2[_0x1dc63d(0x4e6)],_0x1dc63d(0x5b3)[_0x1dc63d(0x198)](_0x4dbd96)];$gameSelfSwitches[_0x1dc63d(0x104)](_0x225c43,_0x34428e);}}},Game_Variables[_0x2a2f60(0x354)][_0x2a2f60(0x130)]=function(_0x51e4b6,_0x5146f3){const _0x53098f=_0x2a2f60,_0x14cbd5=$gameMap?$gameMap[_0x53098f(0x2a4)]():0x0,_0x459e9b=[0x0,0x0,_0x53098f(0x498)[_0x53098f(0x198)](_0x14cbd5,_0x51e4b6)];$gameSelfSwitches[_0x53098f(0x104)](_0x459e9b,_0x5146f3);},VisuMZ['EventsMoveCore'][_0x2a2f60(0x456)]=Game_SelfSwitches[_0x2a2f60(0x354)][_0x2a2f60(0x50f)],Game_SelfSwitches['prototype']['value']=function(_0x460e72){const _0x770c67=_0x2a2f60;if(_0x460e72[0x2]['match'](/(?:SELF|MAP)/i))return this[_0x770c67(0x3e0)](_0x460e72);else{return VisuMZ[_0x770c67(0x193)][_0x770c67(0x456)][_0x770c67(0x3be)](this,_0x460e72);;}},Game_SelfSwitches[_0x2a2f60(0x354)][_0x2a2f60(0x3e0)]=function(_0x8d752b){const _0x5d38fb=_0x2a2f60;return _0x8d752b[0x2][_0x5d38fb(0x148)](/VAR/i)?this['_data'][_0x8d752b]||0x0:!!this[_0x5d38fb(0x5d7)][_0x8d752b];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x1f7)]=Game_SelfSwitches[_0x2a2f60(0x354)][_0x2a2f60(0x104)],Game_SelfSwitches[_0x2a2f60(0x354)][_0x2a2f60(0x104)]=function(_0x40c01d,_0xf07cbe){const _0x5c4d67=_0x2a2f60;_0x40c01d[0x2]['match'](/(?:SELF|MAP)/i)?this[_0x5c4d67(0x489)](_0x40c01d,_0xf07cbe):'pUBYN'===_0x5c4d67(0x34d)?this[_0x5c4d67(0x62e)][_0x5c4d67(0x45f)]=this['_labelWindow'][_0x5c4d67(0x594)][_0x5c4d67(0x39e)](/\\V\[(\d+)\]/gi,(_0x5213bd,_0x4570e2)=>_0x5c7657[_0x5c4d67(0x50f)](_0xa5ca34(_0x4570e2))):VisuMZ['EventsMoveCore'][_0x5c4d67(0x1f7)][_0x5c4d67(0x3be)](this,_0x40c01d,_0xf07cbe);},Game_SelfSwitches[_0x2a2f60(0x354)][_0x2a2f60(0x489)]=function(_0x1ac172,_0x48899a){this['_data'][_0x1ac172]=_0x1ac172[0x2]['match'](/VAR/i)?_0x48899a:!!_0x48899a,this['onChange']();},VisuMZ['EventsMoveCore'][_0x2a2f60(0x137)]=Scene_Map[_0x2a2f60(0x354)]['createDisplayObjects'],Scene_Map[_0x2a2f60(0x354)][_0x2a2f60(0x531)]=function(){const _0x31c7ff=_0x2a2f60;$gameMap[_0x31c7ff(0x3f8)](),VisuMZ['EventsMoveCore'][_0x31c7ff(0x137)][_0x31c7ff(0x3be)](this);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x3f8)]=function(){const _0x489067=_0x2a2f60;this[_0x489067(0x5d4)]=this[_0x489067(0x2a4)](),this[_0x489067(0x4db)]=undefined;const _0x573848=this[_0x489067(0x218)]();for(const _0x5c2fd1 of _0x573848){if('aGbwc'!==_0x489067(0x3d9)){if(this[_0x489067(0x15e)]===_0x236f10)this[_0x489067(0x57f)]();if(!_0x2f352c)return;const _0x19cd8f=_0x489067(0x488)[_0x489067(0x198)](_0x449074[_0x489067(0x623)],_0x397466[_0x489067(0x4e6)]);this['_SavedEventLocations'][_0x19cd8f]={'direction':_0xd63fb0[_0x489067(0x562)](),'x':_0xccbea0['round'](_0x423090['x']),'y':_0x3701cc[_0x489067(0x4b9)](_0x5b8454['y']),'pageIndex':_0x3752ef[_0x489067(0x4b1)],'moveRouteIndex':_0xfa53c[_0x489067(0x227)]};}else{if(_0x5c2fd1)$gameSelfSwitches[_0x489067(0x228)](_0x5c2fd1);}}},Game_SelfSwitches[_0x2a2f60(0x354)][_0x2a2f60(0x228)]=function(_0x7e9287){const _0x10c965=_0x2a2f60;if(!_0x7e9287)return;if(!_0x7e9287[_0x10c965(0x5a5)]())return;const _0x30ac9c=_0x7e9287['event']()[_0x10c965(0x45c)]||'';if(_0x30ac9c[_0x10c965(0x148)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){if('ORGVV'!=='naVDJ'){const _0x35415f=_0x10c965(0x36e)[_0x10c965(0x198)]($gameMap[_0x10c965(0x623)],_0x7e9287[_0x10c965(0x4e6)]),_0x3d6aaa=Object['keys'](this[_0x10c965(0x5d7)])[_0x10c965(0x628)](_0x11b73e=>_0x11b73e[_0x10c965(0x600)](_0x35415f));while(_0x3d6aaa['length']>0x0){const _0x121eb7=_0x3d6aaa[_0x10c965(0x51c)]();delete this['_data'][_0x121eb7];}}else return _0x59ae49[_0x10c965(0x28d)]&&_0x1858b9['description'][_0x10c965(0x117)]('['+_0x217a64+']');}},Game_SelfSwitches['prototype']['resetSelfSwitchesForMap']=function(_0x487d94){const _0x2ed55f=_0x2a2f60,_0x703451='%1,'['format']($gameMap[_0x2ed55f(0x623)]),_0x553c40=Object[_0x2ed55f(0x39c)](this[_0x2ed55f(0x5d7)])[_0x2ed55f(0x628)](_0x2f9fa4=>_0x2f9fa4[_0x2ed55f(0x600)](_0x703451));while(_0x553c40[_0x2ed55f(0x5ca)]>0x0){const _0x376b7b=_0x553c40[_0x2ed55f(0x51c)]();delete this[_0x2ed55f(0x5d7)][_0x376b7b];}_0x487d94===$gameMap[_0x2ed55f(0x2a4)]()&&$gameMap[_0x2ed55f(0x43f)]();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x19f)]=Game_Enemy[_0x2a2f60(0x354)][_0x2a2f60(0x34f)],Game_Enemy[_0x2a2f60(0x354)][_0x2a2f60(0x34f)]=function(_0x3a156a){const _0x4d5c11=_0x2a2f60;$gameTemp['registerSelfTarget'](this);const _0x436c80=VisuMZ[_0x4d5c11(0x193)][_0x4d5c11(0x19f)][_0x4d5c11(0x3be)](this,_0x3a156a);return $gameTemp[_0x4d5c11(0x17f)](),_0x436c80;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x4ad)]=Game_Troop['prototype'][_0x2a2f60(0x187)],Game_Troop[_0x2a2f60(0x354)][_0x2a2f60(0x187)]=function(_0x1a9c48){const _0x202ac2=_0x2a2f60;$gameTemp[_0x202ac2(0x496)](this);const _0x5b95a9=VisuMZ[_0x202ac2(0x193)][_0x202ac2(0x4ad)][_0x202ac2(0x3be)](this,_0x1a9c48);return $gameTemp[_0x202ac2(0x17f)](),_0x5b95a9;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x324)]=Game_Map['prototype'][_0x2a2f60(0x5a2)],Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x5a2)]=function(_0x225af8){const _0x1d71fe=_0x2a2f60;this[_0x1d71fe(0x494)](_0x225af8),this[_0x1d71fe(0x145)](),VisuMZ['EventsMoveCore'][_0x1d71fe(0x324)]['call'](this,_0x225af8),this['clearEventCache'](),this[_0x1d71fe(0x19a)](),this[_0x1d71fe(0x2a1)](),this[_0x1d71fe(0x2fd)](),this[_0x1d71fe(0x17c)](),this[_0x1d71fe(0x633)](),this[_0x1d71fe(0x41e)](),this[_0x1d71fe(0x417)](),this[_0x1d71fe(0x145)]();},VisuMZ[_0x2a2f60(0x193)]['Game_Map_setupEvents']=Game_Map['prototype']['setupEvents'],Game_Map[_0x2a2f60(0x354)]['setupEvents']=function(){const _0x5b2ea8=_0x2a2f60;VisuMZ[_0x5b2ea8(0x193)]['Game_Map_setupEvents'][_0x5b2ea8(0x3be)](this),this[_0x5b2ea8(0x5e1)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x5ee)]=function(){const _0x573169=_0x2a2f60,_0x4883f9=Game_Map[_0x573169(0x103)];this[_0x573169(0x2e8)]=this[_0x573169(0x218)]()['length']>_0x4883f9;if(this['_eventOverload']&&$gameTemp[_0x573169(0x1a9)]()){}},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x19c)]=function(){const _0x266e9d=_0x2a2f60;return this[_0x266e9d(0x2e8)];},Game_Map[_0x2a2f60(0x354)]['clearEventCache']=function(){this['_eventCache']=undefined;},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x19a)]=function(){const _0x315405=_0x2a2f60;this['_diagonalSupport']=VisuMZ[_0x315405(0x193)][_0x315405(0x430)][_0x315405(0x5ec)][_0x315405(0x41b)];const _0xc9889f=$dataMap[_0x315405(0x45c)]||'';if(_0xc9889f[_0x315405(0x148)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x315405(0x1cd)]=!![];else _0xc9889f['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x315405(0x1cd)]=![]);},Game_Map['MOBILE_DIAGONAL_PATHFINDING']=VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x430)][_0x2a2f60(0x5ec)]['PathfindMobileEnabled']??![],Game_Map['prototype'][_0x2a2f60(0x549)]=function(){const _0x2193a0=_0x2a2f60;if(Utils[_0x2193a0(0x56c)]()){if(_0x2193a0(0x3a7)!==_0x2193a0(0x2e1)){if(!Game_Map['MOBILE_DIAGONAL_PATHFINDING'])return![];}else return this['_forceHideFollower']===_0x7dbd4&&this[_0x2193a0(0x41e)](),this[_0x2193a0(0x514)];}const _0x3429e2=$gameSystem[_0x2193a0(0x4dd)]();if(_0x3429e2==='enable')return!![];if(_0x3429e2===_0x2193a0(0x173))return![];if(this[_0x2193a0(0x1cd)]===undefined)this[_0x2193a0(0x19a)]();return this['_diagonalSupport'];},Game_Map['prototype'][_0x2a2f60(0x26c)]=function(_0x5b499b,_0xb6c130){const _0x599c2a=_0x2a2f60;if([0x1,0x4,0x7]['includes'](_0xb6c130))_0x5b499b-=0x1;if([0x3,0x6,0x9][_0x599c2a(0x117)](_0xb6c130))_0x5b499b+=0x1;return this[_0x599c2a(0x1a6)](_0x5b499b);},Game_Map['prototype'][_0x2a2f60(0x3e2)]=function(_0x5be573,_0x5dad64){const _0x566c25=_0x2a2f60;if([0x1,0x2,0x3][_0x566c25(0x117)](_0x5dad64))_0x5be573+=0x1;if([0x7,0x8,0x9][_0x566c25(0x117)](_0x5dad64))_0x5be573-=0x1;return this[_0x566c25(0x58f)](_0x5be573);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x541)]=function(_0x3d8b44,_0x2239d0,_0x478759,_0x5e7171){const _0x57df1e=_0x2a2f60;return Math[_0x57df1e(0x431)](Math['abs'](this['deltaX'](_0x3d8b44,_0x478759)),Math['abs'](this['deltaY'](_0x2239d0,_0x5e7171)));},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x2a1)]=function(){const _0x32c546=_0x2a2f60,_0x42452b=VisuMZ[_0x32c546(0x193)][_0x32c546(0x430)][_0x32c546(0x64f)],_0x1810ac={},_0x75e966=[_0x32c546(0x650),_0x32c546(0x125),_0x32c546(0x220)],_0x5b2a6f=[_0x32c546(0x483),_0x32c546(0x2d6),'Player','Event',_0x32c546(0x20c),'Boat','Ship',_0x32c546(0x45b)];for(const _0x5287dc of _0x75e966){if(_0x32c546(0x2f4)!==_0x32c546(0x2f4)){if(_0x390656)_0xffb24e[_0x32c546(0x17a)]=![];this['executeMoveDir8'](_0x36cf83),this[_0x32c546(0x227)]-=0x1;}else for(const _0x194db4 of _0x5b2a6f){const _0x191b65=_0x32c546(0x492)['format'](_0x194db4,_0x5287dc);if(_0x42452b[_0x191b65]){if(_0x32c546(0x1d0)===_0x32c546(0x1d0))_0x1810ac[_0x191b65]=_0x42452b[_0x191b65][_0x32c546(0x256)](0x0);else return 0x8;}}}const _0x4b973d=$dataMap[_0x32c546(0x45c)]||'',_0x13a659=_0x4b973d[_0x32c546(0x148)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x13a659){if(_0x32c546(0x29e)!=='CpRmD')for(const _0x572895 of _0x13a659){if(_0x32c546(0x26f)!==_0x32c546(0x331)){_0x572895[_0x32c546(0x148)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x18a390=String(RegExp['$1'])[_0x32c546(0x10f)]()[_0x32c546(0x637)](),_0x4ff166=String(RegExp['$2'])[_0x32c546(0x10f)]()[_0x32c546(0x637)]();const _0x12bb10=JSON[_0x32c546(0x570)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x18a390=_0x18a390['charAt'](0x0)[_0x32c546(0x3f0)]()+_0x18a390[_0x32c546(0x256)](0x1),_0x4ff166=_0x4ff166['charAt'](0x0)['toUpperCase']()+_0x4ff166['slice'](0x1);const _0x42b107=_0x32c546(0x492)[_0x32c546(0x198)](_0x18a390,_0x4ff166);if(_0x1810ac[_0x42b107])_0x1810ac[_0x42b107]=_0x1810ac[_0x42b107][_0x32c546(0x3df)](_0x12bb10);}else{if(this['eventsXy'](_0x2d5bd8,_0x198a2a)['length']>0x0)return!![];if(_0x135a57['x']===_0x386bbc&&_0x1e5d6b['y']===_0x618e41)return!![];if(this[_0x32c546(0x3c8)]()[_0x32c546(0x599)](_0x27beb5,_0x3d5b86))return!![];if(this[_0x32c546(0x43a)]()[_0x32c546(0x599)](_0x31894d,_0x24ce44))return!![];return![];}}else{if(!this[_0x32c546(0x2d7)](_0x5613c5,_0x1d86de))return;const _0x1a8ec7=_0x442999[_0x32c546(0x193)][_0x32c546(0x430)][_0x32c546(0x439)];if(!_0x2ed70c)_0x1a8ec7[_0x32c546(0x4cd)][_0x32c546(0x3be)](this,_0x3f090a,_0x2c53f1,this);this['_eventMorphData']={'mapId':_0x5848d0,'eventId':_0x21027a},this[_0x32c546(0x4b1)]=-0x2,this['refresh']();if(!_0x225f30)_0x1a8ec7[_0x32c546(0x2ec)][_0x32c546(0x3be)](this,_0x3cd6ff,_0x1c0f7e,this);_0x1d62ba[_0x32c546(0x145)]();}}this[_0x32c546(0x27c)]=_0x1810ac;},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x170)]=function(_0x5d12dc,_0x14a38c,_0x115212,_0x316d8c){const _0x240151=_0x2a2f60,_0x5d6387=this['roundXWithDirection'](_0x5d12dc,_0x115212),_0x2bac92=this['roundYWithDirection'](_0x14a38c,_0x115212),_0x432e07=this['regionId'](_0x5d6387,_0x2bac92),_0x45201a=this[_0x240151(0x27c)];if(_0x45201a[_0x240151(0x352)][_0x240151(0x117)](_0x432e07))return!![];else{if(_0x316d8c===_0x240151(0x360))return _0x45201a[_0x240151(0x34a)]['includes'](_0x432e07)||_0x45201a[_0x240151(0x567)][_0x240151(0x117)](_0x432e07);else{if(_0x316d8c===_0x240151(0x5a5))return _0x45201a[_0x240151(0x503)][_0x240151(0x117)](_0x432e07)||_0x45201a[_0x240151(0x567)][_0x240151(0x117)](_0x432e07);else{if(_0x45201a[_0x240151(0x3a8)][_0x240151(0x117)](_0x432e07))return!![];else{const _0x5f4398='%1Allow'['format'](_0x316d8c[_0x240151(0x5c3)](0x0)[_0x240151(0x3f0)]()+_0x316d8c[_0x240151(0x256)](0x1));if(_0x45201a[_0x5f4398])return _0x45201a[_0x5f4398]['includes'](_0x432e07);}}}}return![];},Game_Map[_0x2a2f60(0x354)]['isRegionForbidPass']=function(_0x48d82e,_0x59cf2f,_0x4b45d7,_0x355fe0){const _0x46f8b4=_0x2a2f60,_0x40ff0c=this['roundXWithDirection'](_0x48d82e,_0x4b45d7),_0x55b753=this[_0x46f8b4(0x3e2)](_0x59cf2f,_0x4b45d7),_0x1583ce=this[_0x46f8b4(0x40a)](_0x40ff0c,_0x55b753),_0x325182=this[_0x46f8b4(0x27c)];if(_0x325182['AllForbid'][_0x46f8b4(0x117)](_0x1583ce))return!![];else{if(_0x355fe0===_0x46f8b4(0x360)){if('Hpxnu'===_0x46f8b4(0x262))return _0x325182[_0x46f8b4(0x39d)][_0x46f8b4(0x117)](_0x1583ce)||_0x325182[_0x46f8b4(0x4e5)][_0x46f8b4(0x117)](_0x1583ce);else{if(this[_0x46f8b4(0x57b)](_0x3f525,_0x3eec0c,0x2))return!![];if(this['isPassable'](_0x59637f,_0x2cb1a5,0x4))return!![];if(this[_0x46f8b4(0x57b)](_0x1f9f11,_0x68fcfa,0x6))return!![];if(this[_0x46f8b4(0x57b)](_0x4cc571,_0x43caa5,0x8))return!![];return![];}}else{if(_0x355fe0===_0x46f8b4(0x5a5))return _0x325182['EventForbid'][_0x46f8b4(0x117)](_0x1583ce)||_0x325182['WalkForbid'][_0x46f8b4(0x117)](_0x1583ce);else{if(_0x325182['VehicleForbid']['includes'](_0x1583ce)){if(_0x46f8b4(0x3f2)==='yKoVo'){if(_0x2c7019['isBattleTest']())return![];return _0x5a9e00['MapVariables']['includes'](_0x261d15);}else return!![];}else{const _0x4a792a='%1Forbid'[_0x46f8b4(0x198)](_0x355fe0[_0x46f8b4(0x5c3)](0x0)[_0x46f8b4(0x3f0)]()+_0x355fe0['slice'](0x1));if(_0x325182[_0x4a792a])return _0x325182[_0x4a792a][_0x46f8b4(0x117)](_0x1583ce);}}}}return![];},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x5b2)]=function(_0x2764a3,_0x2be995,_0x5d2fd7,_0x55fddc){const _0x148749=_0x2a2f60;_0x5d2fd7=_0x55fddc===_0x148749(0x297)?0x5:_0x5d2fd7;const _0x25dbc6=this[_0x148749(0x26c)](_0x2764a3,_0x5d2fd7),_0x90f67d=this[_0x148749(0x3e2)](_0x2be995,_0x5d2fd7),_0x1f08a4=this[_0x148749(0x40a)](_0x25dbc6,_0x90f67d),_0x2f203b=this[_0x148749(0x27c)];if(_0x2f203b[_0x148749(0x31e)][_0x148749(0x117)](_0x1f08a4))return!![];else{if(_0x148749(0x175)==='xubAc'){const _0x1ece46='%1Dock'[_0x148749(0x198)](_0x55fddc[_0x148749(0x5c3)](0x0)[_0x148749(0x3f0)]()+_0x55fddc[_0x148749(0x256)](0x1));if(_0x2f203b[_0x1ece46])return _0x2f203b[_0x1ece46][_0x148749(0x117)](_0x1f08a4);}else return _0x44baea[_0x148749(0x193)][_0x148749(0x430)]['Label'][_0x148749(0x4ed)];}return![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x4e9)]=Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x3d1)],Game_Map[_0x2a2f60(0x354)]['refresh']=function(){const _0x4348c8=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x4348c8(0x4e9)]['call'](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x4e0)]=function(){const _0x155fa1=_0x2a2f60;this[_0x155fa1(0x646)]=![];if(this['events']()['some'](_0x3cffb0=>_0x3cffb0[_0x155fa1(0x3dc)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x155fa1(0x218)]()[_0x155fa1(0x3d4)](_0x542460=>_0x542460['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x155fa1(0x612)]['some'](_0x5232d9=>_0x5232d9[_0x155fa1(0x3dc)]())){if('YFAcl'===_0x155fa1(0x631)){this[_0x155fa1(0x646)]=!![];return;}else return this[_0x155fa1(0x509)][_0x155fa1(0x1f4)]||[];}if(this[_0x155fa1(0x612)]['some'](_0x4586c7=>_0x4586c7[_0x155fa1(0x365)]())){if(_0x155fa1(0x33b)===_0x155fa1(0x33b)){this[_0x155fa1(0x646)]=!![];return;}else this['setSelfValue'](_0x17a6ea,_0x881e64);}},VisuMZ['EventsMoveCore'][_0x2a2f60(0x462)]=Game_Map[_0x2a2f60(0x354)]['update'],Game_Map['prototype'][_0x2a2f60(0x481)]=function(_0x35615a){const _0x4c100e=_0x2a2f60;this[_0x4c100e(0x164)](),VisuMZ[_0x4c100e(0x193)][_0x4c100e(0x462)][_0x4c100e(0x3be)](this,_0x35615a);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x164)]=function(){const _0x5d1b49=_0x2a2f60;if(!this[_0x5d1b49(0x646)])return;this['_periodicRefreshTimer']=this['_periodicRefreshTimer']||0x3c,this[_0x5d1b49(0x112)]--,this[_0x5d1b49(0x112)]<=0x0&&(this[_0x5d1b49(0x43f)](),this[_0x5d1b49(0x112)]=0x3c);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x434)]=Game_Map['prototype'][_0x2a2f60(0x16c)],Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x16c)]=function(){const _0x32b266=_0x2a2f60;if(!$gameSystem[_0x32b266(0x363)]())return!![];return VisuMZ['EventsMoveCore'][_0x32b266(0x434)]['call'](this);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x2fd)]=function(){const _0x1e385d=_0x2a2f60;this[_0x1e385d(0x59b)]=![];const _0x267114=$dataMap['note']||'';_0x267114[_0x1e385d(0x148)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(_0x1e385d(0x110)===_0x1e385d(0x5f7)?this[_0x1e385d(0x57c)]():this[_0x1e385d(0x59b)]=!![]);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x4b6)]=function(){const _0x2aa165=_0x2a2f60;if(this[_0x2aa165(0x59b)]===undefined)this['setupSaveEventLocations']();return this[_0x2aa165(0x59b)];},Game_Map['prototype'][_0x2a2f60(0x494)]=function(_0x5c4df4){const _0x308a79=_0x2a2f60;_0x5c4df4!==this[_0x308a79(0x2a4)]()&&$gamePlayer&&$gameSystem[_0x308a79(0x494)](this['mapId']());},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x17c)]=function(){const _0x5b7e98=_0x2a2f60;this['_spawnedEvents']=$gameSystem['getMapSpawnedEventData'](this[_0x5b7e98(0x2a4)]()),this[_0x5b7e98(0x4f0)]=!![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x1fb)]=Game_Map[_0x2a2f60(0x354)]['events'],Game_Map['prototype'][_0x2a2f60(0x218)]=function(){const _0x2a9675=_0x2a2f60;if(this['_eventCache'])return this[_0x2a9675(0x4db)];const _0x298d90=VisuMZ[_0x2a9675(0x193)][_0x2a9675(0x1fb)]['call'](this),_0x32939b=_0x298d90['concat'](this['_spawnedEvents']||[]);return this['_eventCache']=_0x32939b['filter'](_0x599555=>!!_0x599555),this[_0x2a9675(0x4db)];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x35b)]=Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x5a5)],Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x5a5)]=function(_0x2130f0){const _0x3566a3=_0x2a2f60;if(_0x2130f0>=0x3e8)return _0x2130f0-=0x3e8,this[_0x3566a3(0x5b9)][_0x2130f0];else{if(_0x3566a3(0x21f)!==_0x3566a3(0x21f)){const _0x241e5d=this['_hue']+(this[_0x3566a3(0x3a9)][_0x3566a3(0x62e)][_0x3566a3(0x182)]||0x0);this[_0x3566a3(0x4e2)](_0x241e5d);}else return VisuMZ['EventsMoveCore'][_0x3566a3(0x35b)][_0x3566a3(0x3be)](this,_0x2130f0);}},Game_Map['prototype'][_0x2a2f60(0x20f)]=function(_0x4d6934){const _0x1240b0=_0x2a2f60,_0x57c4c2=this[_0x1240b0(0x5a5)](_0x4d6934);if(_0x57c4c2)_0x57c4c2[_0x1240b0(0x543)]();},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x346)]=function(){const _0x53e0cb=_0x2a2f60,_0x1ad747={'template':_0x53e0cb(0x12e),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x53e0cb(0x5b9)]['length']+0x3e8};this[_0x53e0cb(0x60d)](_0x1ad747);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x26e)]=function(_0x48ea3c,_0xc49c93){const _0x2e90bd=_0x2a2f60;if(this['eventsXy'](_0x48ea3c,_0xc49c93)[_0x2e90bd(0x5ca)]>0x0)return!![];if($gamePlayer['x']===_0x48ea3c&&$gamePlayer['y']===_0xc49c93)return!![];if(this['boat']()[_0x2e90bd(0x599)](_0x48ea3c,_0xc49c93))return!![];if(this[_0x2e90bd(0x43a)]()[_0x2e90bd(0x599)](_0x48ea3c,_0xc49c93))return!![];return![];},Game_Map['prototype'][_0x2a2f60(0x38c)]=function(_0x2ce660,_0x2d048d,_0xcf2ee7){const _0x3da789=_0x2a2f60;$gameTemp['_spawnData']=_0x2ce660;const _0x21c0fc=new Game_Event(_0x2ce660[_0x3da789(0x2a4)],_0x2ce660[_0x3da789(0x206)]);$gameTemp[_0x3da789(0x2aa)]=undefined,_0x21c0fc['refresh']();let _0x480092=_0x2d048d-_0x21c0fc[_0x3da789(0x18b)]['left'],_0x3ba5c9=_0x2d048d+_0x21c0fc[_0x3da789(0x18b)][_0x3da789(0x208)],_0x4cad5b=_0xcf2ee7-_0x21c0fc[_0x3da789(0x18b)]['up'],_0x1af846=_0xcf2ee7+_0x21c0fc[_0x3da789(0x18b)][_0x3da789(0x64d)];for(let _0x3ff80c=_0x480092;_0x3ff80c<=_0x3ba5c9;_0x3ff80c++){for(let _0x2655fc=_0x4cad5b;_0x2655fc<=_0x1af846;_0x2655fc++){if(this[_0x3da789(0x26e)](_0x3ff80c,_0x2655fc))return![];}}return!![];},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x60d)]=function(_0x1d641e){const _0x42bb07=_0x2a2f60;$gameTemp['_spawnData']=_0x1d641e;const _0x37e9db=new Game_Event(_0x1d641e[_0x42bb07(0x2a4)],_0x1d641e[_0x42bb07(0x206)]);$gameTemp[_0x42bb07(0x2aa)]=undefined,this[_0x42bb07(0x5b9)]['push'](_0x37e9db),_0x37e9db[_0x42bb07(0x30e)](_0x1d641e),this['clearEventCache']();},Game_Map['prototype'][_0x2a2f60(0x40e)]=function(_0x10db77,_0x270166,_0xc16e5b){const _0xb93c72=_0x2a2f60,_0x3f28e6=_0x10db77[_0xb93c72(0x442)]['toUpperCase']()[_0xb93c72(0x637)]();if(_0x3f28e6!=='UNTITLED'){if(_0xb93c72(0x1bd)!==_0xb93c72(0x1bd))_0xc358a6=_0x378bb2[_0xb93c72(0x39e)](_0x25d158,(_0x143441,_0x18e77e)=>_0x108bbf[_0xb93c72(0x50f)](_0x563ea8(_0x18e77e)));else{const _0x40d477=VisuMZ['EventTemplates'][_0x3f28e6];_0x40d477&&(_0xb93c72(0x479)!==_0xb93c72(0x479)?this['opacity']-=this[_0xb93c72(0x3ec)]():(_0x10db77[_0xb93c72(0x2a4)]=_0x40d477['MapID'],_0x10db77[_0xb93c72(0x206)]=_0x40d477[_0xb93c72(0x459)]));}}const _0x25d516=_0x10db77['x'],_0x131f8c=_0x10db77['y'];if(!this[_0xb93c72(0x519)](_0x25d516,_0x131f8c))return![];if(_0x270166){if(this[_0xb93c72(0x26e)](_0x25d516,_0x131f8c))return![];if(!this[_0xb93c72(0x38c)](_0x10db77,_0x25d516,_0x131f8c))return![];}if(_0xc16e5b){if(_0xb93c72(0x4b7)!==_0xb93c72(0x4b7))return this[_0xb93c72(0x11e)](0x7,_0x4ede8d(_0x201961['$1']));else{if(!this[_0xb93c72(0x321)](_0x25d516,_0x131f8c))return![];}}return this[_0xb93c72(0x60d)](_0x10db77),!![];},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x42c)]=function(_0x4d1cc4,_0x4c4d8a,_0x322ce7,_0x53e18a){const _0x5ec263=_0x2a2f60,_0x4ff6a5=_0x4d1cc4[_0x5ec263(0x442)][_0x5ec263(0x3f0)]()[_0x5ec263(0x637)]();if(_0x4ff6a5!=='UNTITLED'){const _0x55940b=VisuMZ[_0x5ec263(0x5bf)][_0x4ff6a5];_0x55940b&&(_0x4d1cc4[_0x5ec263(0x2a4)]=_0x55940b[_0x5ec263(0x264)],_0x4d1cc4[_0x5ec263(0x206)]=_0x55940b[_0x5ec263(0x459)]);}const _0x2650f3=[],_0x395783=this[_0x5ec263(0x627)](),_0x2a7498=this[_0x5ec263(0x5cf)]();for(let _0x4e465d=0x0;_0x4e465d<_0x395783;_0x4e465d++){for(let _0x8d3b81=0x0;_0x8d3b81<_0x2a7498;_0x8d3b81++){if(_0x5ec263(0x312)!==_0x5ec263(0x63c)){if(!_0x4c4d8a[_0x5ec263(0x117)](this[_0x5ec263(0x40a)](_0x4e465d,_0x8d3b81)))continue;if(!this[_0x5ec263(0x519)](_0x4e465d,_0x8d3b81))continue;if(_0x322ce7){if(_0x5ec263(0x643)!==_0x5ec263(0x643)){if(_0x5d2f55[_0x5ec263(0x552)][_0x520def][_0x5ec263(0x148)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x2372b9['AdvancedSwitches'][_0x5ec263(0x245)](_0x428b3e);if(_0x2c7ebe[_0x5ec263(0x552)][_0x313d75][_0x5ec263(0x148)](/<SELF>/i))_0x527809[_0x5ec263(0x16a)][_0x5ec263(0x245)](_0x19da65);if(_0x28b2d1[_0x5ec263(0x552)][_0x594e3b][_0x5ec263(0x148)](/<MAP>/i))_0xc44021[_0x5ec263(0x14a)]['push'](_0x30e9fa);}else{if(this['checkExistingEntitiesAt'](_0x4e465d,_0x8d3b81))continue;if(!this[_0x5ec263(0x38c)](_0x4d1cc4,_0x4e465d,_0x8d3b81))continue;}}if(_0x53e18a){if(!this['isPassableByAnyDirection'](_0x4e465d,_0x8d3b81))continue;}_0x2650f3[_0x5ec263(0x245)]([_0x4e465d,_0x8d3b81]);}else _0x3b24cc(_0x5ec263(0x413)[_0x5ec263(0x198)](_0x3c9b6a,_0x31e713,_0x5e157c)),_0xb33bed['exit']();}}if(_0x2650f3['length']>0x0){const _0x5d9cb2=_0x2650f3[Math['randomInt'](_0x2650f3[_0x5ec263(0x5ca)])];return _0x4d1cc4['x']=_0x5d9cb2[0x0],_0x4d1cc4['y']=_0x5d9cb2[0x1],this[_0x5ec263(0x60d)](_0x4d1cc4),!![];}return![];},Game_Map['prototype'][_0x2a2f60(0x2a5)]=function(_0x28658c,_0xa09e61,_0x595879,_0x317074){const _0x14e5e6=_0x2a2f60,_0xcfd0c4=_0x28658c['template'][_0x14e5e6(0x3f0)]()[_0x14e5e6(0x637)]();if(_0xcfd0c4!==_0x14e5e6(0x423)){const _0x48e707=VisuMZ[_0x14e5e6(0x5bf)][_0xcfd0c4];_0x48e707&&(_0x28658c[_0x14e5e6(0x2a4)]=_0x48e707[_0x14e5e6(0x264)],_0x28658c[_0x14e5e6(0x206)]=_0x48e707[_0x14e5e6(0x459)]);}const _0x235c86=[],_0x3be509=this[_0x14e5e6(0x627)](),_0x3cba5f=this[_0x14e5e6(0x5cf)]();for(let _0x4de1f8=0x0;_0x4de1f8<_0x3be509;_0x4de1f8++){for(let _0x73c8f5=0x0;_0x73c8f5<_0x3cba5f;_0x73c8f5++){if(!_0xa09e61[_0x14e5e6(0x117)](this[_0x14e5e6(0x443)](_0x4de1f8,_0x73c8f5)))continue;if(!this[_0x14e5e6(0x519)](_0x4de1f8,_0x73c8f5))continue;if(_0x595879){if('MjkFH'!==_0x14e5e6(0x524)){if(!this[_0x14e5e6(0x127)])return;if(!this[_0x14e5e6(0x645)])return;this[_0x14e5e6(0x160)](),this[_0x14e5e6(0x295)]();}else{if(this['checkExistingEntitiesAt'](_0x4de1f8,_0x73c8f5))continue;if(!this[_0x14e5e6(0x38c)](_0x28658c,_0x4de1f8,_0x73c8f5))continue;}}if(_0x317074){if(_0x14e5e6(0x24c)===_0x14e5e6(0x25f))_0x598fe9/=_0x1d2643[_0x14e5e6(0x431)](this['_scaleY'],0.00001);else{if(!this[_0x14e5e6(0x321)](_0x4de1f8,_0x73c8f5))continue;}}_0x235c86[_0x14e5e6(0x245)]([_0x4de1f8,_0x73c8f5]);}}if(_0x235c86[_0x14e5e6(0x5ca)]>0x0){const _0x23dba1=_0x235c86[Math[_0x14e5e6(0x278)](_0x235c86['length'])];return _0x28658c['x']=_0x23dba1[0x0],_0x28658c['y']=_0x23dba1[0x1],this['createSpawnedEventWithData'](_0x28658c),!![];}return![];},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x321)]=function(_0x19ad5d,_0x5bb2b2){const _0x36df3d=_0x2a2f60;if(this[_0x36df3d(0x57b)](_0x19ad5d,_0x5bb2b2,0x2))return!![];if(this[_0x36df3d(0x57b)](_0x19ad5d,_0x5bb2b2,0x4))return!![];if(this[_0x36df3d(0x57b)](_0x19ad5d,_0x5bb2b2,0x6))return!![];if(this[_0x36df3d(0x57b)](_0x19ad5d,_0x5bb2b2,0x8))return!![];return![];},Game_Map['prototype']['despawnEventId']=function(_0x4e8521){const _0x1dbe34=_0x2a2f60;if(_0x4e8521<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x503d36=this[_0x1dbe34(0x5a5)](_0x4e8521);_0x503d36[_0x1dbe34(0x478)](-0x1,-0x1),_0x503d36[_0x1dbe34(0x543)](),this[_0x1dbe34(0x5b9)][_0x4e8521-0x3e8]=null,this[_0x1dbe34(0x145)]();},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x466)]=function(){const _0x293657=_0x2a2f60;for(const _0x510901 of this[_0x293657(0x5b9)]){if(_0x293657(0x186)!=='hlxKg'){if(_0x47b661['BoatSpeed'])this[_0x293657(0x19d)](_0xac5d05[_0x293657(0x581)]);}else{if(_0x510901)return _0x510901;}}return null;},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x377)]=function(){const _0x1fc8d0=_0x2a2f60,_0xe79da1=this[_0x1fc8d0(0x466)]();return _0xe79da1?_0xe79da1[_0x1fc8d0(0x4e6)]:0x0;},Game_Map['prototype'][_0x2a2f60(0x1ea)]=function(){const _0x27b6e1=_0x2a2f60,_0xdcd092=this[_0x27b6e1(0x5b9)]['slice'](0x0)[_0x27b6e1(0x31b)]();for(const _0x5b3419 of _0xdcd092){if(_0x5b3419)return _0x5b3419;}return null;},Game_Map['prototype']['lastSpawnedEventID']=function(){const _0xd5d80f=_0x2a2f60,_0x41ff1d=this[_0xd5d80f(0x1ea)]();return _0x41ff1d?_0x41ff1d[_0xd5d80f(0x4e6)]:0x0;},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x3ef)]=function(_0xedd49c,_0xe5a093){const _0x541d84=_0x2a2f60,_0x4874d9=this['eventsXy'](_0xedd49c,_0xe5a093);for(const _0x2d46bd of _0x4874d9){if(!_0x2d46bd)continue;if(_0x2d46bd['isSpawnedEvent']())this[_0x541d84(0x371)](_0x2d46bd['_eventId']);}},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x191)]=function(_0x54f8b1){const _0xb25639=_0x2a2f60;for(const _0x44d489 of this[_0xb25639(0x5b9)]){if(!_0x44d489)continue;_0x54f8b1['includes'](_0x44d489[_0xb25639(0x40a)]())&&this['despawnEventId'](_0x44d489[_0xb25639(0x4e6)]);}},Game_Map['prototype'][_0x2a2f60(0x1e2)]=function(_0x40a30a){const _0x5bc9b2=_0x2a2f60;for(const _0x57adef of this[_0x5bc9b2(0x5b9)]){if(_0x5bc9b2(0x572)!==_0x5bc9b2(0x482)){if(!_0x57adef)continue;_0x40a30a[_0x5bc9b2(0x117)](_0x57adef['terrainTag']())&&this[_0x5bc9b2(0x371)](_0x57adef['_eventId']);}else{if(!_0x5ca148[_0x5bc9b2(0x578)])return;}}},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x288)]=function(){const _0x4b9d3b=_0x2a2f60;for(const _0x23e596 of this['_spawnedEvents']){if('QysRV'!==_0x4b9d3b(0x146)){if(!_0x23e596)continue;this['despawnEventId'](_0x23e596[_0x4b9d3b(0x4e6)]);}else{const _0x12d7cc=this[_0x4b9d3b(0x3ad)](this[_0x4b9d3b(0x562)]());return _0x41c117['roundXWithDirection'](this['x'],_0x12d7cc);}}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2fe)]=Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x3fe)],Game_Map['prototype']['unlockEvent']=function(_0x21cf08){const _0x3bc485=_0x2a2f60;VisuMZ[_0x3bc485(0x193)][_0x3bc485(0x2fe)][_0x3bc485(0x3be)](this,_0x21cf08);if(_0x21cf08>=0x3e8){if(_0x3bc485(0x2bf)===_0x3bc485(0x382)){_0x2eb326[_0x3bc485(0x2ff)](_0x3823ca,_0x4587d4);const _0x13043c=_0x4bae7b[_0x3bc485(0x59c)]();_0x15f4ee[_0x3bc485(0x371)](_0x55b9ed[_0x3bc485(0x459)]||_0x13043c[_0x3bc485(0x206)]());}else{const _0x2e9f1a=this[_0x3bc485(0x5a5)](_0x21cf08);if(_0x2e9f1a)_0x2e9f1a[_0x3bc485(0x35c)]();}}},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x633)]=function(){const _0x68bc53=_0x2a2f60;this[_0x68bc53(0x5e0)]=![],this[_0x68bc53(0x41c)]=![];if(!$dataMap)return;const _0x37f4de=$dataMap['note']||'';if(_0x37f4de[_0x68bc53(0x148)](/<HIDE PLAYER>/i)){if(_0x68bc53(0x39b)!==_0x68bc53(0x4e8))this[_0x68bc53(0x5e0)]=![],this[_0x68bc53(0x41c)]=!![];else{_0x2c36dd['ConvertParams'](_0x558d1a,_0x46b0d1),_0x3d18b4[_0x68bc53(0x620)](0x0),_0x5af9c5[_0x68bc53(0x249)](![]);for(const _0x21d507 of _0x3e813b[_0x68bc53(0x136)]()[_0x68bc53(0x5d7)]){if(_0x21d507)_0x21d507[_0x68bc53(0x37c)](![]);}}}else _0x37f4de[_0x68bc53(0x148)](/<SHOW PLAYER>/i)&&(this[_0x68bc53(0x5e0)]=!![],this[_0x68bc53(0x41c)]=![]);},Game_Map[_0x2a2f60(0x354)]['isPlayerForceShown']=function(){const _0x302aa5=_0x2a2f60;return this[_0x302aa5(0x5e0)]===undefined&&this[_0x302aa5(0x633)](),this['_forceShowPlayer'];},Game_Map['prototype'][_0x2a2f60(0x1d3)]=function(){const _0x14bfd2=_0x2a2f60;return this[_0x14bfd2(0x41c)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x14bfd2(0x41c)];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x379)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x2b9)],Game_CharacterBase['prototype'][_0x2a2f60(0x2b9)]=function(){const _0xa8f9c1=_0x2a2f60;if(this===$gamePlayer){if('QLJib'!==_0xa8f9c1(0x30a)){if(this[_0xa8f9c1(0x4ce)])return _0x1d39ed['prototype'][_0xa8f9c1(0x350)][_0xa8f9c1(0x3be)](this);return _0x4daca7['isDashing']();}else{if($gameMap[_0xa8f9c1(0x22a)]())return![];if($gameMap['isPlayerForceHidden']())return!![];}}return VisuMZ[_0xa8f9c1(0x193)][_0xa8f9c1(0x379)]['call'](this);},Game_Map['prototype'][_0x2a2f60(0x41e)]=function(){const _0x2ea6b1=_0x2a2f60;this['_forceShowFollower']=![],this[_0x2ea6b1(0x514)]=![];if(!$dataMap)return;const _0x54e2da=$dataMap[_0x2ea6b1(0x45c)]||'';if(_0x54e2da[_0x2ea6b1(0x148)](/<HIDE FOLLOWERS>/i))this[_0x2ea6b1(0x1df)]=![],this[_0x2ea6b1(0x514)]=!![];else _0x54e2da[_0x2ea6b1(0x148)](/<SHOW FOLLOWERS>/i)&&(this[_0x2ea6b1(0x1df)]=!![],this[_0x2ea6b1(0x514)]=![]);},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x3dd)]=function(){const _0x2d2121=_0x2a2f60;return this[_0x2d2121(0x1df)]===undefined&&this[_0x2d2121(0x41e)](),this[_0x2d2121(0x1df)];},Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x359)]=function(){const _0x4ce8b1=_0x2a2f60;return this['_forceHideFollower']===undefined&&this[_0x4ce8b1(0x41e)](),this['_forceHideFollower'];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x213)]=Game_Followers[_0x2a2f60(0x354)][_0x2a2f60(0x37f)],Game_Followers['prototype'][_0x2a2f60(0x37f)]=function(){const _0x6ee6c7=_0x2a2f60;if($gameMap[_0x6ee6c7(0x3dd)]())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ[_0x6ee6c7(0x193)]['Game_Followers_isVisible'][_0x6ee6c7(0x3be)](this);},Game_Map[_0x2a2f60(0x354)]['requestMapLoadCommonEvents']=function(){const _0x2dd3b3=_0x2a2f60;if(!$dataMap)return;if(!$dataMap[_0x2dd3b3(0x45c)])return;const _0x4abc37=$dataMap[_0x2dd3b3(0x45c)];if(_0x4abc37[_0x2dd3b3(0x148)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x392b95=String(RegExp['$1'])['split'](',')[_0x2dd3b3(0x302)](_0x50b940=>Number(_0x50b940));for(const _0x8359a4 of _0x392b95){$gameTemp['reserveCommonEvent'](_0x8359a4);}}},Game_CommonEvent[_0x2a2f60(0x354)]['hasAdvancedSwitchVariable']=function(){const _0x4c2ee6=_0x2a2f60,_0x47deb0=this[_0x4c2ee6(0x5a5)]();return this[_0x4c2ee6(0x53e)]()&&_0x47deb0[_0x4c2ee6(0x3c5)]>=0x1&&DataManager[_0x4c2ee6(0x17b)](_0x47deb0[_0x4c2ee6(0x59f)]);},Game_CommonEvent[_0x2a2f60(0x354)]['hasCPCs']=function(){const _0x5bc020=_0x2a2f60;return VisuMZ[_0x5bc020(0x193)]['CustomPageConditions']['_commonEvents']['includes'](this[_0x5bc020(0x174)]);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x195)]=Game_CommonEvent[_0x2a2f60(0x354)][_0x2a2f60(0x53e)],Game_CommonEvent[_0x2a2f60(0x354)]['isActive']=function(){const _0x3dc2e2=_0x2a2f60;if(VisuMZ[_0x3dc2e2(0x193)][_0x3dc2e2(0x195)]['call'](this))return _0x3dc2e2(0x2ab)===_0x3dc2e2(0x55a)?![]:!![];else{const _0x3c7175=this[_0x3dc2e2(0x5a5)]();return VisuMZ[_0x3dc2e2(0x193)][_0x3dc2e2(0x2e3)][_0x3dc2e2(0x421)](this['event']()[_0x3dc2e2(0x460)],this[_0x3dc2e2(0x174)],_0x3c7175);}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5fa)]=Game_Map[_0x2a2f60(0x354)][_0x2a2f60(0x17d)],Game_Map['prototype']['parallelCommonEvents']=function(){const _0x5dc0ab=_0x2a2f60,_0x57fce6=VisuMZ[_0x5dc0ab(0x193)][_0x5dc0ab(0x5fa)][_0x5dc0ab(0x3be)](this),_0x48ab24=VisuMZ[_0x5dc0ab(0x193)][_0x5dc0ab(0x2e3)]['_commonEvents'][_0x5dc0ab(0x302)](_0x620a14=>$dataCommonEvents[_0x620a14]);return _0x57fce6[_0x5dc0ab(0x3df)](_0x48ab24)['filter']((_0x4bcf85,_0x43fe11,_0x4ee3ed)=>_0x4ee3ed[_0x5dc0ab(0x5bb)](_0x4bcf85)===_0x43fe11);},Game_CharacterBase[_0x2a2f60(0x169)]=VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x430)][_0x2a2f60(0x5ec)][_0x2a2f60(0x408)]??![],VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x143)]=Game_CharacterBase['prototype'][_0x2a2f60(0x4c4)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x4c4)]=function(){const _0x494804=_0x2a2f60;VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers'][_0x494804(0x3be)](this),this[_0x494804(0x467)]();},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x467)]=function(){const _0x3f50b8=_0x2a2f60;this[_0x3f50b8(0x613)]=0x1,this['_scaleBaseY']=0x1,this[_0x3f50b8(0x28a)]=![],this[_0x3f50b8(0x280)](),this[_0x3f50b8(0x309)](),this[_0x3f50b8(0x5ac)](),this[_0x3f50b8(0x1eb)]();},VisuMZ[_0x2a2f60(0x193)]['Game_CharacterBase_opacity']=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x323)],Game_CharacterBase['prototype']['opacity']=function(){const _0x2c8d55=_0x2a2f60;let _0x36f618=VisuMZ[_0x2c8d55(0x193)]['Game_CharacterBase_opacity']['call'](this);return _0x36f618=this[_0x2c8d55(0x315)](_0x36f618),_0x36f618;},Game_CharacterBase['prototype'][_0x2a2f60(0x315)]=function(_0x2e91e9){return _0x2e91e9;},Game_CharacterBase[_0x2a2f60(0x354)]['isSpriteVS8dir']=function(){const _0x1ad22d=_0x2a2f60;if(this[_0x1ad22d(0x231)]===Game_Player&&this[_0x1ad22d(0x63e)]()){if('aXbTS'!==_0x1ad22d(0x225)){if(_0x207e4>0x0&&_0x5d7a49<0x0)return 0x9;if(_0xd9494d<0x0&&_0x646b1b<0x0)return 0x7;if(_0x1880f0>0x0&&_0x40f986>0x0)return 0x3;if(_0x169f1d<0x0&&_0x410fd2>0x0)return 0x1;}else return this[_0x1ad22d(0x458)]()[_0x1ad22d(0x31d)]()[_0x1ad22d(0x148)](/\[VS8\]/i);}else{if(Imported[_0x1ad22d(0x424)]&&this[_0x1ad22d(0x64c)]()){if(_0x1ad22d(0x266)!==_0x1ad22d(0x4d4))return!![];else{const _0x30bfaf=_0xd383bb(_0x44899e['$1']);if(_0x30bfaf[_0x1ad22d(0x148)](/PLAYER/i))this[_0x1ad22d(0x2ee)][_0x1ad22d(0x296)]=0x0;else _0x30bfaf[_0x1ad22d(0x148)](/EVENT[ ](\d+)/i)&&(this[_0x1ad22d(0x2ee)]['target']=_0x3f4f6b(_0x5bebe8['$1']));}}else return _0x1ad22d(0x4dc)===_0x1ad22d(0x4dc)?this[_0x1ad22d(0x31d)]()[_0x1ad22d(0x148)](/\[VS8\]/i):_0x3f9210['EventsMoveCore'][_0x1ad22d(0x5f8)][_0x1ad22d(0x3be)](this,_0x384d53,_0x240ae7,_0x5caa7a);}},VisuMZ['EventsMoveCore'][_0x2a2f60(0x5e8)]=Game_CharacterBase['prototype'][_0x2a2f60(0x562)],Game_CharacterBase[_0x2a2f60(0x354)]['direction']=function(){const _0x5d2a76=_0x2a2f60;if(!$dataMap)return this['_direction']||0x2;if(this['isOnLadder']()&&!this[_0x5d2a76(0x33e)]()&&this[_0x5d2a76(0x548)]()){if(_0x5d2a76(0x342)!==_0x5d2a76(0x538))return this[_0x5d2a76(0x4ba)]();else{if(this[_0x5d2a76(0x511)]===_0x232e8e)this[_0x5d2a76(0x57f)]();return this['_MapSpawnedEventData'][_0x51fd4e]=this[_0x5d2a76(0x511)][_0x41b350]||[],this['_MapSpawnedEventData'][_0x1508bf];}}else{if(this[_0x5d2a76(0x4ab)]()&&!this[_0x5d2a76(0x33e)]())return 0x8;else return this[_0x5d2a76(0x344)]()&&this[_0x5d2a76(0x548)]()?this[_0x5d2a76(0x47b)]():VisuMZ[_0x5d2a76(0x193)]['Game_CharacterBase_direction'][_0x5d2a76(0x3be)](this);}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x109)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x47d)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x47d)]=function(_0x3a1577){const _0x450461=_0x2a2f60;if(!this[_0x450461(0x548)]())_0x3a1577=this['correctFacingDirection'](_0x3a1577);VisuMZ['EventsMoveCore'][_0x450461(0x109)][_0x450461(0x3be)](this,_0x3a1577),this[_0x450461(0x28c)]();},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x361)]=function(_0xc55ff2){const _0x43f956=_0x2a2f60;if(_0xc55ff2===0x1)return this[_0x43f956(0x4a5)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0xc55ff2===0x3)return this[_0x43f956(0x4a5)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0xc55ff2===0x7)return this[_0x43f956(0x4a5)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0xc55ff2===0x9)return this[_0x43f956(0x4a5)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0xc55ff2;},Game_CharacterBase['prototype'][_0x2a2f60(0x44b)]=function(_0x26386c){const _0x55122b=_0x2a2f60;return[0x1,0x3,0x5,0x7,0x9][_0x55122b(0x117)](_0x26386c);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x499)]=function(){const _0x57813e=_0x2a2f60;return this[_0x57813e(0x463)]||0x0;},VisuMZ[_0x2a2f60(0x193)]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x484)],Game_CharacterBase['prototype'][_0x2a2f60(0x484)]=function(_0x59faae){const _0x2fac8d=_0x2a2f60;this[_0x2fac8d(0x463)]=_0x59faae,VisuMZ[_0x2fac8d(0x193)][_0x2fac8d(0x1dc)][_0x2fac8d(0x3be)](this,_0x59faae);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x4e7)]=function(_0x2b5c7d){const _0x2a38d9=_0x2a2f60;if(!this[_0x2a38d9(0x44b)](_0x2b5c7d))return this[_0x2a38d9(0x484)](_0x2b5c7d);let _0x5beafe=0x0,_0x35a14b=0x0;switch(_0x2b5c7d){case 0x1:_0x5beafe=0x4,_0x35a14b=0x2;break;case 0x3:_0x5beafe=0x6,_0x35a14b=0x2;break;case 0x7:_0x5beafe=0x4,_0x35a14b=0x8;break;case 0x9:_0x5beafe=0x6,_0x35a14b=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x2a38d9(0x430)][_0x2a38d9(0x5ec)][_0x2a38d9(0x2f0)]){if('WYKDu'==='WYKDu'){if(!this[_0x2a38d9(0x4a5)](this['_x'],this['_y'],_0x5beafe))return this[_0x2a38d9(0x484)](_0x35a14b);if(!this[_0x2a38d9(0x4a5)](this['_x'],this['_y'],_0x35a14b))return this['moveStraight'](_0x5beafe);if(!this[_0x2a38d9(0x161)](this['_x'],this['_y'],_0x5beafe,_0x35a14b)){let _0x27b94e=VisuMZ['EventsMoveCore']['Settings'][_0x2a38d9(0x5ec)][_0x2a38d9(0x326)]?_0x5beafe:_0x35a14b;return this['moveStraight'](_0x27b94e);}}else{if(this['_EventsMoveCoreSettings']===_0x9fbdc7)this[_0x2a38d9(0x57f)]();if(this[_0x2a38d9(0x4e4)][_0x2a38d9(0x26b)]===_0x4bdc47)this['initEventsMoveCore']();this[_0x2a38d9(0x4e4)][_0x2a38d9(0x26b)]=_0x26c3b9;}}this[_0x2a38d9(0x463)]=_0x2b5c7d,this[_0x2a38d9(0x1f8)](_0x5beafe,_0x35a14b);},VisuMZ[_0x2a2f60(0x193)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x2a2f60(0x354)]['realMoveSpeed'],Game_CharacterBase[_0x2a2f60(0x354)]['realMoveSpeed']=function(){const _0x4be70b=_0x2a2f60;let _0x577841=this[_0x4be70b(0xff)];return this[_0x4be70b(0x350)]()&&(_0x577841+=this['dashSpeedModifier']()),this[_0x4be70b(0x28b)](_0x577841);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x5db)]=function(){const _0x11f09d=_0x2a2f60,_0x345e0c=VisuMZ[_0x11f09d(0x193)]['Settings'][_0x11f09d(0x5ec)];if(_0x345e0c['DashModifier']!==undefined)return _0x345e0c['DashModifier'];else{if(_0x11f09d(0x4d0)===_0x11f09d(0x4d0))return VisuMZ['EventsMoveCore']['Game_CharacterBase_realMoveSpeed'][_0x11f09d(0x3be)](this)-this[_0x11f09d(0xff)];else{_0x1ab3cf[_0x11f09d(0x354)][_0x11f09d(0x20a)][_0x11f09d(0x3be)](this);if(['none',_0x11f09d(0x5b8)][_0x11f09d(0x117)](this[_0x11f09d(0x3aa)]()))return;_0x27d952['checkEventTriggerEventsMoveCore']([0x2]);}}},Game_CharacterBase['prototype']['adjustDir8MovementSpeed']=function(_0x331f12){const _0x2a09d4=_0x2a2f60,_0x291bdf=VisuMZ[_0x2a09d4(0x193)][_0x2a09d4(0x430)]['Movement'];if(!_0x291bdf[_0x2a09d4(0x4df)])return _0x331f12;return[0x1,0x3,0x7,0x9][_0x2a09d4(0x117)](this['_lastMovedDirection'])&&(_0x2a09d4(0x1fe)===_0x2a09d4(0x1fe)?_0x331f12*=_0x291bdf['DiagonalSpeedMultiplier']||0.01:(this[_0x2a09d4(0x512)]=_0x49dab0(_0x12ad8d['$1']),this[_0x2a09d4(0x1c7)]=_0x5a4007(_0x5708e7['$2']))),_0x331f12;},VisuMZ[_0x2a2f60(0x193)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x350)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x350)]=function(){const _0x48ccf4=_0x2a2f60;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this[_0x48ccf4(0x4ab)]())return![];if(this[_0x48ccf4(0x5b7)])return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_isDashing'][_0x48ccf4(0x3be)](this);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x5d5)]=function(){const _0x16756f=_0x2a2f60;return this[_0x16756f(0x350)]()&&this[_0x16756f(0x22e)]===0x0;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x61c)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x3bf)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x3bf)]=function(){const _0x4c8739=_0x2a2f60;return this['isPosing']()?this[_0x4c8739(0x584)]():VisuMZ[_0x4c8739(0x193)][_0x4c8739(0x61c)][_0x4c8739(0x3be)](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x54c)]=Game_CharacterBase['prototype'][_0x2a2f60(0x20a)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x20a)]=function(){const _0x47292e=_0x2a2f60;VisuMZ[_0x47292e(0x193)][_0x47292e(0x54c)][_0x47292e(0x3be)](this),this[_0x47292e(0x280)]();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x34e)]=Game_CharacterBase['prototype'][_0x2a2f60(0x2dd)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x2dd)]=function(){const _0x3b9204=_0x2a2f60;if(this[_0x3b9204(0x548)]())return this['characterIndexVS8']();return VisuMZ[_0x3b9204(0x193)][_0x3b9204(0x34e)]['call'](this);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x41f)]=function(){const _0x391cbb=_0x2a2f60,_0xa5347d=this[_0x391cbb(0x562)]();if(this[_0x391cbb(0x33e)]()){if(_0x391cbb(0x1b9)==='Ecoxo')return this['forceDashing']();else{if([0x2,0x4,0x6,0x8]['includes'](_0xa5347d))return 0x4;if([0x1,0x3,0x7,0x9][_0x391cbb(0x117)](_0xa5347d))return 0x5;}}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x391cbb(0x344)]())return _0x391cbb(0x5b4)!==_0x391cbb(0x5b4)?!![]:this['getPosingCharacterIndex']();else{if(this[_0x391cbb(0x25e)]){if([0x2,0x4,0x6,0x8][_0x391cbb(0x117)](_0xa5347d))return 0x4;if([0x1,0x3,0x7,0x9][_0x391cbb(0x117)](_0xa5347d))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x391cbb(0x636)]()){if(_0x391cbb(0x3c1)!==_0x391cbb(0x3c1)){if(_0x46428b>this['y']&&this[_0x391cbb(0x4a5)](this['x'],this['y'],0x4))_0x4ceb24=0x1;if(_0x30f68f<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0x40f893=0x7;}else{if([0x2,0x4,0x6,0x8][_0x391cbb(0x117)](_0xa5347d))return 0x4;if([0x1,0x3,0x7,0x9][_0x391cbb(0x117)](_0xa5347d))return 0x5;}}else{if(this[_0x391cbb(0x5d5)]()){if([0x2,0x4,0x6,0x8]['includes'](_0xa5347d))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0xa5347d))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x391cbb(0x117)](_0xa5347d))return 0x0;if([0x1,0x3,0x7,0x9][_0x391cbb(0x117)](_0xa5347d))return 0x1;}}}}}}},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x636)]=function(){const _0x5e5bdc=_0x2a2f60;return VisuMZ[_0x5e5bdc(0x193)]['Settings']['VS8'][_0x5e5bdc(0x197)];},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x328)]=function(){const _0x511c61=_0x2a2f60;return this['isOnLadder']()&&this['terrainTag']()===VisuMZ[_0x511c61(0x193)][_0x511c61(0x430)][_0x511c61(0x59e)][_0x511c61(0x370)];},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x4ba)]=function(){const _0x43b152=_0x2a2f60;return this[_0x43b152(0x328)]()?0x4:0x2;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x18a)]=Game_CharacterBase[_0x2a2f60(0x354)]['update'],Game_CharacterBase['prototype'][_0x2a2f60(0x481)]=function(){const _0x35dccc=_0x2a2f60;this['updateScaleBase'](),VisuMZ[_0x35dccc(0x193)][_0x35dccc(0x18a)][_0x35dccc(0x3be)](this),this[_0x35dccc(0x386)]();},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x304)]=function(){const _0xb6e121=_0x2a2f60;this[_0xb6e121(0x33f)]=this[_0xb6e121(0x613)]??0x1,this[_0xb6e121(0x55e)]=this['_scaleBaseY']??0x1;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x566)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x14c)],Game_CharacterBase[_0x2a2f60(0x354)]['bushDepth']=function(){const _0x5ec5df=_0x2a2f60;let _0x578273=VisuMZ[_0x5ec5df(0x193)][_0x5ec5df(0x566)][_0x5ec5df(0x3be)](this);return this[_0x5ec5df(0x55e)]!==undefined&&(_0x578273/=Math[_0x5ec5df(0x431)](this[_0x5ec5df(0x55e)],0.00001)),Math[_0x5ec5df(0x24f)](_0x578273);},Game_CharacterBase[_0x2a2f60(0x354)]['updatePose']=function(){const _0x5ea4d2=_0x2a2f60;this['_poseDuration']=this['_poseDuration']||0x0;if(this[_0x5ea4d2(0x59a)]>0x0){if('OrHQC'!==_0x5ea4d2(0x564)){if(!_0x2985ef[_0x5ea4d2(0x263)])return;if(!_0x723db9['_scene'][_0x5ea4d2(0x388)])return;const _0x5e7e60=_0x22f6d4['_scene'][_0x5ea4d2(0x388)][_0x5ea4d2(0x13a)](this[_0x5ea4d2(0x3a9)]);if(!_0x5e7e60)return;this['x']=this[_0x5ea4d2(0x3a9)][_0x5ea4d2(0x5a1)](),this['x']+=this['_event'][_0x5ea4d2(0x62e)][_0x5ea4d2(0x172)],this['y']=this[_0x5ea4d2(0x3a9)][_0x5ea4d2(0x412)]()-_0x5e7e60[_0x5ea4d2(0x5cf)]*_0x5e7e60[_0x5ea4d2(0x51d)]['y'],this['y']+=_0x42244d['windowPadding']()*-0.5,this['y']+=this[_0x5ea4d2(0x3a9)][_0x5ea4d2(0x62e)][_0x5ea4d2(0x293)];}else{this[_0x5ea4d2(0x59a)]--;if(this['_poseDuration']<=0x0&&this['_pose']!=='ZZZ')this[_0x5ea4d2(0x280)]();}}},VisuMZ[_0x2a2f60(0x193)]['Game_CharacterBase_moveDiagonally']=Game_CharacterBase['prototype']['moveDiagonally'],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x1f8)]=function(_0x3407ff,_0xd39eb){const _0x251174=_0x2a2f60;VisuMZ[_0x251174(0x193)][_0x251174(0x505)][_0x251174(0x3be)](this,_0x3407ff,_0xd39eb);if(this[_0x251174(0x548)]())this[_0x251174(0x1ab)](_0x3407ff,_0xd39eb);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x1ab)]=function(_0x17582d,_0x291cef){const _0x1eb298=_0x2a2f60;if(_0x17582d===0x4&&_0x291cef===0x2)this[_0x1eb298(0x47d)](0x1);if(_0x17582d===0x6&&_0x291cef===0x2)this[_0x1eb298(0x47d)](0x3);if(_0x17582d===0x4&&_0x291cef===0x8)this[_0x1eb298(0x47d)](0x7);if(_0x17582d===0x6&&_0x291cef===0x8)this['setDirection'](0x9);},VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x2a2f60(0x354)]['hasStepAnime'],Game_CharacterBase['prototype']['hasStepAnime']=function(){const _0x1af1c1=_0x2a2f60;if(this[_0x1af1c1(0x344)]()&&this[_0x1af1c1(0x5ad)]()===_0x1af1c1(0x207))return!![];return VisuMZ[_0x1af1c1(0x193)][_0x1af1c1(0x4a1)][_0x1af1c1(0x3be)](this);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x60e)]=function(_0x17566d,_0x2294df){const _0x24ed06=_0x2a2f60;if(_0x17566d[_0x24ed06(0x148)](/Z/i))_0x17566d='ZZZ';if(_0x17566d['match'](/SLEEP/i))_0x17566d='ZZZ';this[_0x24ed06(0x548)]()&&(this[_0x24ed06(0x26d)]=_0x17566d[_0x24ed06(0x3f0)]()['trim'](),this[_0x24ed06(0x59a)]=_0x2294df||Infinity);},Game_CharacterBase['prototype'][_0x2a2f60(0x5ad)]=function(){const _0x3cd8b1=_0x2a2f60;if(this[_0x3cd8b1(0x548)]()){if('OJoJO'!==_0x3cd8b1(0x500))return(this['_pose']||'')[_0x3cd8b1(0x3f0)]()['trim']();else for(const _0x4c8151 of _0x156063){_0x4c8151['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x3d3621=_0x13e46d(_0x2d6b2e['$1'])[_0x3cd8b1(0x10f)]()[_0x3cd8b1(0x637)](),_0x33e385=_0x3110c1(_0x2a040a['$2'])[_0x3cd8b1(0x10f)]()[_0x3cd8b1(0x637)]();const _0x29bf61=_0x1d8b05[_0x3cd8b1(0x570)]('['+_0x509ac0['$3'][_0x3cd8b1(0x148)](/\d+/g)+']');_0x3d3621=_0x3d3621[_0x3cd8b1(0x5c3)](0x0)['toUpperCase']()+_0x3d3621[_0x3cd8b1(0x256)](0x1),_0x33e385=_0x33e385['charAt'](0x0)[_0x3cd8b1(0x3f0)]()+_0x33e385[_0x3cd8b1(0x256)](0x1);const _0x182307=_0x3cd8b1(0x492)['format'](_0x3d3621,_0x33e385);if(_0x433a1c[_0x182307])_0x55506d[_0x182307]=_0x354eb1[_0x182307][_0x3cd8b1(0x3df)](_0x29bf61);}}else return''[_0x3cd8b1(0x3f0)]()[_0x3cd8b1(0x637)]();},Game_CharacterBase['prototype'][_0x2a2f60(0x504)]=function(_0x4a1db8,_0x48a4b4){const _0x2476bc=_0x2a2f60;if(this[_0x2476bc(0x548)]()){if('FIARy'!==_0x2476bc(0x622)){const _0x61c971=['',_0x2476bc(0x2c4),'QUESTION',_0x2476bc(0x596),'HEART',_0x2476bc(0x1b4),'SWEAT','COBWEB',_0x2476bc(0x230),'LIGHT\x20BULB',_0x2476bc(0x207),'','','','',''][_0x4a1db8];this['setPose'](_0x61c971,_0x48a4b4);}else _0x2e7ea1[_0x2476bc(0x3f8)](),_0x87d7f8[_0x2476bc(0x193)][_0x2476bc(0x137)][_0x2476bc(0x3be)](this);}},Game_CharacterBase[_0x2a2f60(0x354)]['clearPose']=function(){const _0x4cae01=_0x2a2f60;this[_0x4cae01(0x26d)]='',this[_0x4cae01(0x59a)]=0x0;},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x344)]=function(){const _0x5a5b80=_0x2a2f60;return this[_0x5a5b80(0x548)]()&&!!this['_pose'];},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x23a)]=function(){const _0x4f2c2a=_0x2a2f60,_0x2dc5fa=this[_0x4f2c2a(0x26d)][_0x4f2c2a(0x3f0)]();switch(this['_pose'][_0x4f2c2a(0x3f0)]()[_0x4f2c2a(0x637)]()){case _0x4f2c2a(0x1e0):case _0x4f2c2a(0x391):case _0x4f2c2a(0x574):case'HURT':case _0x4f2c2a(0x393):case _0x4f2c2a(0x46e):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x47b)]=function(){const _0x21dcff=_0x2a2f60;switch(this[_0x21dcff(0x26d)]['toUpperCase']()){case _0x21dcff(0x2c4):case _0x21dcff(0x49e):case'MUSIC\x20NOTE':case'!':case'?':return 0x2;break;case _0x21dcff(0x490):case _0x21dcff(0x1b4):case _0x21dcff(0x234):return 0x4;break;case _0x21dcff(0x1e0):case _0x21dcff(0x391):case _0x21dcff(0x574):case _0x21dcff(0x1ca):case _0x21dcff(0x230):case'LIGHT\x20BULB':return 0x6;break;case _0x21dcff(0x50d):case'KNEEL':case _0x21dcff(0x46e):case _0x21dcff(0x207):case _0x21dcff(0x13b):return 0x8;break;default:return VisuMZ[_0x21dcff(0x193)][_0x21dcff(0x109)][_0x21dcff(0x3be)](this);break;}},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x584)]=function(){const _0x168784=_0x2a2f60;switch(this['_pose'][_0x168784(0x3f0)]()){case _0x168784(0x1e0):case _0x168784(0x50d):case'EXCLAMATION':case'!':case _0x168784(0x490):case _0x168784(0x1ca):return 0x0;break;case _0x168784(0x391):case _0x168784(0x393):case _0x168784(0x49e):case'?':case _0x168784(0x1b4):case _0x168784(0x230):return 0x1;break;case'VICTORY':case _0x168784(0x46e):case'MUSIC\x20NOTE':case _0x168784(0x234):case _0x168784(0x157):return 0x2;break;default:return VisuMZ[_0x168784(0x193)][_0x168784(0x61c)][_0x168784(0x3be)](this);break;}},Game_CharacterBase['prototype'][_0x2a2f60(0x415)]=function(){const _0x32207f=_0x2a2f60;this[_0x32207f(0x25e)]=!![];},Game_CharacterBase[_0x2a2f60(0x354)]['clearCarrying']=function(){const _0x2dadef=_0x2a2f60;this[_0x2dadef(0x25e)]=![];},Game_CharacterBase['prototype']['forceDashing']=function(){const _0x468dff=_0x2a2f60;this[_0x468dff(0x5b7)]=!![];},Game_CharacterBase['prototype'][_0x2a2f60(0x309)]=function(){const _0x165155=_0x2a2f60;this[_0x165155(0x5b7)]=![];},Game_CharacterBase['prototype'][_0x2a2f60(0x44d)]=function(){const _0x2e090b=_0x2a2f60;if(this[_0x2e090b(0x154)]())return![];if(this[_0x2e090b(0x525)])return![];if(this[_0x2e090b(0x4ff)]==='')return![];if(this[_0x2e090b(0x231)]===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x36f)]=function(){const _0xa3eb33=_0x2a2f60;if(this['isOnLadder']())return!![];if(this[_0xa3eb33(0x231)]===Game_Player&&this[_0xa3eb33(0x63e)]())return!![];return![];},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x2ad)]=function(){const _0x11be8e=_0x2a2f60;return VisuMZ[_0x11be8e(0x193)][_0x11be8e(0x430)][_0x11be8e(0x5ec)][_0x11be8e(0x337)];},Game_CharacterBase[_0x2a2f60(0x354)]['shadowX']=function(){const _0x22a913=_0x2a2f60;return this[_0x22a913(0x5a1)]();},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x1e6)]=function(){const _0x4b74aa=_0x2a2f60,_0x4309a2=$gameMap[_0x4b74aa(0x513)]();return Math['floor'](this[_0x4b74aa(0x649)]()*_0x4309a2+_0x4309a2);},Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT']=0x64,Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x4fc)]=function(_0x295c23,_0x35f721){const _0x74069d=_0x2a2f60;if(TouchInput['isPressed']())return![];if(!$gameMap[_0x74069d(0x549)]())return![];if($gameMap[_0x74069d(0x2af)](_0x295c23,_0x35f721)[_0x74069d(0x5ca)]>0x0)return![];if(!$gameMap['isPassableByAnyDirection'](_0x295c23,_0x35f721))return![];const _0x5346be=$gameMap['_events'][_0x74069d(0x5ca)];if(_0x5346be>=Game_CharacterBase[_0x74069d(0x38f)])return![];return!![];},Game_Character['prototype'][_0x2a2f60(0x209)]=function(_0x168a55,_0x513c44){const _0x168305=_0x2a2f60;let _0x20c344=this[_0x168305(0x32a)](_0x168a55,_0x513c44);if(!this[_0x168305(0x4fc)](_0x168a55,_0x513c44))return _0x20c344;if(this['isCollidedWithEvents'](_0x168a55,_0x513c44))return _0x20c344;const _0x23da32=_0x20c344;if(_0x20c344===0x2){if(_0x168a55>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0x20c344=0x3;if(_0x168a55<this['x']&&this[_0x168305(0x4a5)](this['x'],this['y'],0x4))_0x20c344=0x1;}else{if(_0x20c344===0x4){if(_0x513c44>this['y']&&this[_0x168305(0x4a5)](this['x'],this['y'],0x4))_0x20c344=0x1;if(_0x513c44<this['y']&&this[_0x168305(0x4a5)](this['x'],this['y'],0x6))_0x20c344=0x7;}else{if(_0x20c344===0x6){if(_0x513c44>this['y']&&this[_0x168305(0x4a5)](this['x'],this['y'],0x4))_0x20c344=0x3;if(_0x513c44<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0x20c344=0x9;}else{if(_0x20c344===0x8){if(_0x168305(0x32d)!==_0x168305(0x411)){if(_0x168a55>this['x']&&this[_0x168305(0x4a5)](this['x'],this['y'],0x6))_0x20c344=0x9;if(_0x168a55<this['x']&&this[_0x168305(0x4a5)](this['x'],this['y'],0x4))_0x20c344=0x7;}else this['_labelWindow'][_0x168305(0x322)]=_0x542a2f(_0x1af673['$1']);}}}}if(!this[_0x168305(0x4a5)](this['x'],this['y'],_0x20c344))return _0x23da32;const _0x668aad=$gameMap['roundXWithDirection'](this['x'],_0x20c344),_0x138447=$gameMap[_0x168305(0x3e2)](this['y'],_0x20c344);if(this[_0x168305(0x605)](_0x668aad,_0x138447))_0x20c344=_0x23da32;return _0x20c344;},VisuMZ['EventsMoveCore'][_0x2a2f60(0x5f8)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x4a5)],Game_CharacterBase['prototype'][_0x2a2f60(0x4a5)]=function(_0x2db3b2,_0x4a91e5,_0x33ee24){const _0x1160b9=_0x2a2f60;if(this['_vehicleType']===_0x1160b9(0x297)){if(_0x1160b9(0x5fb)!=='mibpn'){if(!this['isNormalPriority']())return![];else{const _0x5d8a29=_0x2a7c0f['eventsXyNt'](_0x1761c5,_0xd95456)[_0x1160b9(0x628)](_0x112ed3=>_0x112ed3!==this&&_0x112ed3[_0x1160b9(0x46a)]());return _0x5d8a29['length']>0x0;}}else return this[_0x1160b9(0x458)]()[_0x1160b9(0x5bd)](_0x2db3b2,_0x4a91e5,_0x33ee24);}else return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass'][_0x1160b9(0x3be)](this,_0x2db3b2,_0x4a91e5,_0x33ee24);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x5ac)]=function(){const _0xabfbcf=_0x2a2f60;this[_0xabfbcf(0x512)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5f0)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x5a1)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x5a1)]=function(){const _0x33506c=_0x2a2f60;return VisuMZ[_0x33506c(0x193)][_0x33506c(0x5f0)]['call'](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x47c)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x412)],Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x412)]=function(){const _0x4326b5=_0x2a2f60;return VisuMZ[_0x4326b5(0x193)]['Game_CharacterBase_screenY'][_0x4326b5(0x3be)](this)+(this[_0x4326b5(0x1c7)]||0x0);},Game_CharacterBase['DEFAULT_SHIFT_Y']=VisuMZ[_0x2a2f60(0x193)]['Settings']['Movement'][_0x2a2f60(0x2c6)]??-0x6,Game_CharacterBase[_0x2a2f60(0x354)]['shiftY']=function(){const _0x651e89=_0x2a2f60;let _0x40f6a8=this[_0x651e89(0x3b1)]()?0x0:-Game_CharacterBase[_0x651e89(0x180)];return this[_0x651e89(0x55e)]&&(_0x40f6a8*=this[_0x651e89(0x55e)]),Math[_0x651e89(0x4b9)](_0x40f6a8);},Game_CharacterBase[_0x2a2f60(0x354)]['clearStepPattern']=function(){const _0x40631d=_0x2a2f60;this[_0x40631d(0x5d8)]='';},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5af)]=Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x40d)],Game_CharacterBase[_0x2a2f60(0x354)]['updatePattern']=function(){const _0xf61e50=_0x2a2f60;if(this['_patternLocked'])return;if(this[_0xf61e50(0x45e)]())return;VisuMZ[_0xf61e50(0x193)][_0xf61e50(0x5af)]['call'](this);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x45e)]=function(){const _0x1deadd=_0x2a2f60;if(!this[_0x1deadd(0x497)]()&&this[_0x1deadd(0x22e)]>0x0)return![];switch(String(this[_0x1deadd(0x5d8)])['toUpperCase']()['trim']()){case _0x1deadd(0x37b):this[_0x1deadd(0x5ab)]+=0x1;if(this[_0x1deadd(0x5ab)]>0x2)this['setPattern'](0x0);break;case _0x1deadd(0x5b0):this[_0x1deadd(0x5ab)]-=0x1;if(this['_pattern']<0x0)this[_0x1deadd(0x1d2)](0x2);break;case _0x1deadd(0x43e):case'SPIN\x20CW':this[_0x1deadd(0x171)]();break;case _0x1deadd(0x2d5):case'SPIN\x20CCW':case'SPIN\x20ANTICLOCKWISE':case _0x1deadd(0x48f):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x2a2f60(0x5e3)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x1ae)]=function(){const _0x55d6d7=_0x2a2f60,_0x45dd92=this['getEventIconData']();if(!_0x45dd92)return![];return _0x45dd92[_0x55d6d7(0x318)]>0x0;},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x5f1)]=function(){const _0x58515a=_0x2a2f60,_0x42eb98=this['direction']();return $gameMap[_0x58515a(0x26c)](this['x'],_0x42eb98);},Game_CharacterBase[_0x2a2f60(0x354)]['frontY']=function(){const _0x5b2252=_0x2a2f60,_0x207268=this[_0x5b2252(0x562)]();return $gameMap[_0x5b2252(0x3e2)](this['y'],_0x207268);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x534)]=function(){const _0x339176=_0x2a2f60,_0x59f0e7=this[_0x339176(0x3ad)](this[_0x339176(0x562)]());return $gameMap[_0x339176(0x26c)](this['x'],_0x59f0e7);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x35f)]=function(){const _0x3d3ae6=_0x2a2f60,_0x1d1402=this[_0x3d3ae6(0x3ad)](this[_0x3d3ae6(0x562)]());return $gameMap[_0x3d3ae6(0x3e2)](this['y'],_0x1d1402);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x325)]=function(){const _0x45d0d8=_0x2a2f60,_0x40b82e=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x45d0d8(0x562)]()];return $gameMap['roundXWithDirection'](this['x'],_0x40b82e);},Game_CharacterBase[_0x2a2f60(0x354)]['ccwY']=function(){const _0x551cdb=_0x2a2f60,_0x580ccf=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x551cdb(0x562)]()];return $gameMap[_0x551cdb(0x3e2)](this['y'],_0x580ccf);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x2b6)]=function(){const _0x8cb20=_0x2a2f60,_0x3c8182=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0x8cb20(0x26c)](this['x'],_0x3c8182);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x241)]=function(){const _0x4cbc9f=_0x2a2f60,_0x3ed712=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0x4cbc9f(0x3e2)](this['y'],_0x3ed712);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x4b5)]=Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x116)],Game_Character['prototype'][_0x2a2f60(0x116)]=function(_0x15f05d){const _0x338a3b=_0x2a2f60;route=JsonEx[_0x338a3b(0x576)](_0x15f05d),VisuMZ[_0x338a3b(0x193)][_0x338a3b(0x4b5)]['call'](this,route);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x56a)]=Game_Character['prototype'][_0x2a2f60(0x1e3)],Game_Character['prototype'][_0x2a2f60(0x1e3)]=function(_0x447e75){const _0x2e8888=_0x2a2f60;route=JsonEx[_0x2e8888(0x576)](_0x447e75),VisuMZ[_0x2e8888(0x193)][_0x2e8888(0x56a)]['call'](this,route);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x550)]=Game_Character['prototype'][_0x2a2f60(0x4a7)],Game_Character[_0x2a2f60(0x354)]['processMoveCommand']=function(_0xa92b59){const _0x2feac6=_0x2a2f60,_0x593df5=Game_Character,_0x309514=_0xa92b59[_0x2feac6(0x3da)];if(_0xa92b59['code']===_0x593df5[_0x2feac6(0x557)]){if(_0x2feac6(0x4f3)!==_0x2feac6(0x4f3))this[_0x2feac6(0x50c)]();else{let _0x3a26d3=_0xa92b59[_0x2feac6(0x3da)][0x0];_0x3a26d3=this[_0x2feac6(0x597)](_0x3a26d3),_0x3a26d3=this[_0x2feac6(0x416)](_0x3a26d3),this[_0x2feac6(0x1a7)](_0xa92b59,_0x3a26d3);}}else VisuMZ[_0x2feac6(0x193)][_0x2feac6(0x550)][_0x2feac6(0x3be)](this,_0xa92b59);},Game_Character['prototype']['convertVariableValuesInScriptCall']=function(_0x11407c){const _0x15e894=_0x2a2f60,_0x6fc3e0=/\$gameVariables\.value\((\d+)\)/gi,_0x2c7cab=/\\V\[(\d+)\]/gi;while(_0x11407c[_0x15e894(0x148)](_0x6fc3e0)){'Ruumv'===_0x15e894(0x149)?_0x11407c=_0x11407c['replace'](_0x6fc3e0,(_0x525090,_0x2b26cd)=>$gameVariables[_0x15e894(0x50f)](parseInt(_0x2b26cd))):(_0x251247['clearDestination'](),this[_0x15e894(0x375)]());}while(_0x11407c[_0x15e894(0x148)](_0x2c7cab)){_0x11407c=_0x11407c[_0x15e894(0x39e)](_0x2c7cab,(_0x3fc012,_0x556590)=>$gameVariables['value'](parseInt(_0x556590)));}return _0x11407c;},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x416)]=function(_0x53f0ea){const _0x303db9=_0x2a2f60,_0x4cc173=/\\SELFVAR\[(\d+)\]/gi;while(_0x53f0ea[_0x303db9(0x148)](_0x4cc173)){if(_0x303db9(0x501)===_0x303db9(0x642))return this[_0x303db9(0x31d)]()[_0x303db9(0x148)](/\[VS8\]/i);else _0x53f0ea=_0x53f0ea['replace'](_0x4cc173,(_0x273691,_0x37d632)=>getSelfVariableValue(this['_mapId'],this[_0x303db9(0x4e6)],parseInt(_0x37d632)));}return _0x53f0ea;},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x1a7)]=function(_0xb77e30,_0x4bd846){const _0x242ed8=_0x2a2f60;if(_0x4bd846[_0x242ed8(0x148)](/ANIMATION:[ ](\d+)/i))return this[_0x242ed8(0x53a)](Number(RegExp['$1']));if(_0x4bd846['match'](/BALLOON:[ ](.*)/i)){if(_0x242ed8(0x348)!==_0x242ed8(0x25a))return this[_0x242ed8(0x652)](String(RegExp['$1']));else{const _0x4f9c59=_0x2a605a(_0x1ad615['$1']);_0x4f9c59!==_0xb12254[_0x1b20b1][_0x242ed8(0x62c)]&&(_0x62f13a(_0x242ed8(0x528)[_0x242ed8(0x198)](_0x2a1b52,_0x4f9c59)),_0x26c69d[_0x242ed8(0x403)]());}}if(_0x4bd846[_0x242ed8(0x148)](/FADE IN:[ ](\d+)/i))return this[_0x242ed8(0x54d)](Number(RegExp['$1']));if(_0x4bd846['match'](/FADE OUT:[ ](\d+)/i))return this[_0x242ed8(0x592)](Number(RegExp['$1']));if(_0x4bd846['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x242ed8(0x415)]();if(_0x4bd846[_0x242ed8(0x148)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x242ed8(0x394)]();if(_0x4bd846[_0x242ed8(0x148)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x242ed8(0x1d9)]();if(_0x4bd846[_0x242ed8(0x148)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x242ed8(0x309)]();if(_0x4bd846[_0x242ed8(0x148)](/HUG:[ ]LEFT/i)){if(_0x242ed8(0x2a7)===_0x242ed8(0x2a7))return this[_0x242ed8(0x546)](_0x242ed8(0x547));else this[_0x242ed8(0x368)]['x']=0.5,this[_0x242ed8(0x368)]['y']=0x1;}if(_0x4bd846[_0x242ed8(0x148)](/HUG:[ ]RIGHT/i))return _0x242ed8(0x3f6)===_0x242ed8(0x305)?_0x559187[_0x242ed8(0x218)][_0x242a23]:this[_0x242ed8(0x546)](_0x242ed8(0x208));if(_0x4bd846[_0x242ed8(0x148)](/INDEX:[ ](\d+)/i))return this['processMoveRouteSetIndex'](Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x242ed8(0x50a)===_0x242ed8(0x50a)){const _0x4ac132=this[_0x242ed8(0x3d8)]+Number(RegExp['$1']);return this[_0x242ed8(0x374)](_0x4ac132);}else return _0x4c3f0f['EventAllow']['includes'](_0x341bf5)||_0x3649cd[_0x242ed8(0x567)][_0x242ed8(0x117)](_0x9f3b5b);}if(_0x4bd846['match'](/JUMP FORWARD:[ ](\d+)/i)){if(_0x242ed8(0x299)!==_0x242ed8(0x162))return this[_0x242ed8(0x3b5)](Number(RegExp['$1']));else{const _0x1cc996=_0x242ed8(0x44c)['format'](_0x1c5d6f[_0x242ed8(0x5c3)](0x0)[_0x242ed8(0x3f0)]()+_0x24c890[_0x242ed8(0x256)](0x1));if(_0x56e3f2[_0x1cc996])return _0x273653[_0x1cc996][_0x242ed8(0x117)](_0x26b731);}}if(_0x4bd846[_0x242ed8(0x148)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('YRvnr'===_0x242ed8(0x1c1))return this[_0x242ed8(0x177)](Number(RegExp['$1']),Number(RegExp['$2']));else{this[_0x242ed8(0x49b)](_0x57703b);if(_0xc1426a[_0x242ed8(0x117)](0x0)&&this[_0x242ed8(0x473)]()===_0x242ed8(0x20d))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x1c362c[_0x242ed8(0x117)](0x1)||_0x3466ea[_0x242ed8(0x117)](0x2))&&this[_0x242ed8(0x23b)]();}}if(_0x4bd846['match'](/JUMP TO EVENT:[ ](\d+)/i)){if('yUyZt'===_0x242ed8(0x3d3)){const _0x5f1cff=$gameMap['event'](Number(RegExp['$1']));return this[_0x242ed8(0x147)](_0x5f1cff);}else{if(_0x31deff||this[_0x242ed8(0x548)]()){if(_0x203a8b>0x0&&_0x26cf09<0x0)return 0x1;if(_0x39af2b<0x0&&_0x516df0<0x0)return 0x3;if(_0x5b7180>0x0&&_0xff436c>0x0)return 0x7;if(_0x33172b<0x0&&_0x3f42cb>0x0)return 0x9;}}}if(_0x4bd846['match'](/JUMP TO PLAYER/i))return'fDycW'!==_0x242ed8(0x284)?this[_0x242ed8(0x11e)](0x9,_0x144489(_0x4c2036['$1'])):this[_0x242ed8(0x147)]($gamePlayer);if(_0x4bd846['match'](/JUMP TO HOME/i)&&this[_0x242ed8(0x206)]){if(_0x242ed8(0x404)!=='baJMM'){const _0x1ca287=this[_0x242ed8(0x1c8)],_0x2c88d5=this[_0x242ed8(0x1e1)];return this[_0x242ed8(0x177)](_0x1ca287,_0x2c88d5);}else while(this['isRunning']()){this[_0x242ed8(0x1b7)]();}}if(_0x4bd846[_0x242ed8(0x148)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0xd3cadd=String(RegExp['$1']),_0x1463f5=this[_0x242ed8(0x4ec)](_0x4bd846);return this['processMoveRouteMoveUntilStop'](_0xd3cadd,_0x1463f5);}if(_0x4bd846['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x23dd09=Number(RegExp['$1']),_0x333281=Number(RegExp['$2']),_0xb55712=this[_0x242ed8(0x4ec)](_0x4bd846);return this[_0x242ed8(0x380)](_0x23dd09,_0x333281,_0xb55712);}if(_0x4bd846['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0x5b3f03=$gameMap['event'](Number(RegExp['$1'])),_0x2fb4f9=this[_0x242ed8(0x4ec)](_0x4bd846);return this[_0x242ed8(0x2e2)](_0x5b3f03,_0x2fb4f9);}if(_0x4bd846['match'](/MOVE TO PLAYER/i)){const _0x4fd4ff=this[_0x242ed8(0x4ec)](_0x4bd846);return this[_0x242ed8(0x2e2)]($gamePlayer,_0x4fd4ff);}if(_0x4bd846[_0x242ed8(0x148)](/MOVE TO HOME/i)&&this[_0x242ed8(0x206)]){const _0x640edf=this[_0x242ed8(0x1c8)],_0x410170=this[_0x242ed8(0x1e1)],_0x3b3e4a=this[_0x242ed8(0x4ec)](_0x4bd846);return this[_0x242ed8(0x380)](_0x640edf,_0x410170,_0x3b3e4a);}if(_0x4bd846['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x242ed8(0x11e)](0x1,Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/MOVE DOWN:[ ](\d+)/i))return this[_0x242ed8(0x11e)](0x2,Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x3,Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/MOVE LEFT:[ ](\d+)/i)){if(_0x242ed8(0x5dd)==='VYsbo')_0x18efd7[_0x242ed8(0x314)](this);else return this[_0x242ed8(0x11e)](0x4,Number(RegExp['$1']));}if(_0x4bd846[_0x242ed8(0x148)](/MOVE RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/MOVE UP:[ ](\d+)/i))return this[_0x242ed8(0x11e)](0x8,Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/MOVE UPPER RIGHT:[ ](\d+)/i)){if('Epbcb'===_0x242ed8(0x2e7))return this[_0x242ed8(0x11e)](0x9,Number(RegExp['$1']));else{_0x5601a7=_0x40c18f===_0x242ed8(0x297)?0x5:_0x481d91;const _0x46cc29=this[_0x242ed8(0x26c)](_0x4267d4,_0x12e6ca),_0x182e8e=this[_0x242ed8(0x3e2)](_0x2f0d8b,_0x544d9f),_0x12285d=this[_0x242ed8(0x40a)](_0x46cc29,_0x182e8e),_0x54f725=this[_0x242ed8(0x27c)];if(_0x54f725['VehicleDock'][_0x242ed8(0x117)](_0x12285d))return!![];else{const _0x2d0163=_0x242ed8(0x4c3)['format'](_0x5e225d['charAt'](0x0)['toUpperCase']()+_0x32a132['slice'](0x1));if(_0x54f725[_0x2d0163])return _0x54f725[_0x2d0163][_0x242ed8(0x117)](_0x12285d);}return![];}}if(_0x4bd846[_0x242ed8(0x148)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x242ed8(0x1f6)!==_0x242ed8(0x1f6))return!![];else{const _0x275c3e=Math[_0x242ed8(0x4b9)](Number(RegExp['$1'])/0x64*0xff);return this[_0x242ed8(0x38a)](_0x275c3e[_0x242ed8(0x45a)](0x0,0xff));}}if(_0x4bd846['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x15f97a=this[_0x242ed8(0x107)]+Math[_0x242ed8(0x4b9)](Number(RegExp['$1'])/0x64*0xff);return this[_0x242ed8(0x38a)](_0x15f97a[_0x242ed8(0x45a)](0x0,0xff));}if(_0x4bd846[_0x242ed8(0x148)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x5cffae=this['_opacity']+Number(RegExp['$1']);return this[_0x242ed8(0x38a)](_0x5cffae[_0x242ed8(0x45a)](0x0,0xff));}if(_0x4bd846[_0x242ed8(0x148)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x242ed8(0x42e)](Number(RegExp['$1']));if(_0x4bd846[_0x242ed8(0x148)](/PATTERN UNLOCK/i))return this[_0x242ed8(0x28a)]=![];if(_0x4bd846[_0x242ed8(0x148)](/POSE:[ ](.*)/i)){const _0x47ef0c=String(RegExp['$1'])[_0x242ed8(0x3f0)]()['trim']();return this[_0x242ed8(0x60e)](_0x47ef0c);}if(_0x4bd846[_0x242ed8(0x148)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x23cd04=Number(RegExp['$1']),_0x2de852=Number(RegExp['$2']);return this[_0x242ed8(0x63f)](_0x23cd04,_0x2de852);}if(_0x4bd846['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){if('cfreS'===_0x242ed8(0x533))this[_0x242ed8(0x5b7)]=![];else{const _0x3aa9ce=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x3aa9ce);}}if(_0x4bd846[_0x242ed8(0x148)](/STEP TOWARD PLAYER/i))return this[_0x242ed8(0x46c)]($gamePlayer);if(_0x4bd846[_0x242ed8(0x148)](/STEP TOWARD HOME/i)&&this[_0x242ed8(0x206)]){const _0x39167a=this[_0x242ed8(0x1c8)],_0x46d919=this[_0x242ed8(0x1e1)];return this['processMoveRouteStepTo'](_0x39167a,_0x46d919);}if(_0x4bd846[_0x242ed8(0x148)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x242ed8(0x409)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4bd846[_0x242ed8(0x148)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x5bcead=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x5bcead);}if(_0x4bd846['match'](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x4bd846['match'](/STEP AWAY FROM HOME/i)&&this[_0x242ed8(0x206)]){const _0x5b355a=this[_0x242ed8(0x1c8)],_0x33313f=this['_randomHomeY'];return this[_0x242ed8(0x409)](_0x5b355a,_0x33313f);}if(_0x4bd846[_0x242ed8(0x148)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x242ed8(0x5ff)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4bd846[_0x242ed8(0x148)](/TURN TO EVENT:[ ](\d+)/i)){const _0x79739d=$gameMap['event'](Number(RegExp['$1']));return this[_0x242ed8(0x4a8)](_0x79739d);}if(_0x4bd846[_0x242ed8(0x148)](/TURN TO PLAYER/i))return this[_0x242ed8(0x4a8)]($gamePlayer);if(_0x4bd846[_0x242ed8(0x148)](/TURN TO HOME/i)&&this['eventId']){const _0x58f285=this[_0x242ed8(0x1c8)],_0x3cb21e=this[_0x242ed8(0x1e1)];return this['turnTowardPoint'](_0x58f285,_0x3cb21e);}if(_0x4bd846[_0x242ed8(0x148)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x242ed8(0x551)===_0x242ed8(0x551))return this[_0x242ed8(0x5e4)](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x242ed8(0x46b)]=0x0;}if(_0x4bd846[_0x242ed8(0x148)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x2262c8=$gameMap[_0x242ed8(0x5a5)](Number(RegExp['$1']));return this[_0x242ed8(0x34c)](_0x2262c8);}if(_0x4bd846[_0x242ed8(0x148)](/TURN AWAY FROM PLAYER/i)){if(_0x242ed8(0x583)===_0x242ed8(0x477)){_0x18725b[_0x242ed8(0x114)][_0xd62144]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5b6ed0=_0x242ed8(0x13e)[_0x242ed8(0x198)](_0x111c0b(_0x8f0e56['$1']));_0x484760[_0x242ed8(0x55c)][_0x46ed5a]=new _0x52b241(_0x242ed8(0x27b),_0x5b6ed0);}else return this[_0x242ed8(0x34c)]($gamePlayer);}if(_0x4bd846[_0x242ed8(0x148)](/TURN AWAY FROM HOME/i)&&this[_0x242ed8(0x206)]){const _0x283aaa=this[_0x242ed8(0x1c8)],_0x32d882=this['_randomHomeY'];return this['turnAwayFromPoint'](_0x283aaa,_0x32d882);}if(_0x4bd846['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x4bd846[_0x242ed8(0x148)](/TURN LOWER RIGHT/i)){if(_0x242ed8(0x5a4)!==_0x242ed8(0x5a4))_0x24f80c[_0x242ed8(0x2a4)]=_0x48ef5f[_0x242ed8(0x264)],_0x295077[_0x242ed8(0x206)]=_0x1b161a[_0x242ed8(0x459)];else return this[_0x242ed8(0x47d)](0x3);}if(_0x4bd846['match'](/TURN UPPER LEFT/i))return this[_0x242ed8(0x47d)](0x7);if(_0x4bd846[_0x242ed8(0x148)](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x4bd846[_0x242ed8(0x148)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x242ed8(0x3d6)](RegExp['$1'],RegExp['$2']);if(_0x4bd846[_0x242ed8(0x148)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x242ed8(0x4a9)===_0x242ed8(0x37d)){_0x5bea82['EventsMoveCore'][_0x242ed8(0x2e3)][_0x242ed8(0x1f2)](_0x2fd3de),this[_0x242ed8(0x333)]=_0x2f4d56['CPC'][_0x242ed8(0x5ca)]>0x0;_0x293617[_0x242ed8(0x460)]===_0xc0d1e6&&_0x52bc6b[_0x242ed8(0x193)][_0x242ed8(0x2e3)][_0x242ed8(0x1f2)](_0x730e83);if(_0x2ac51b[_0x242ed8(0x460)][_0x242ed8(0x5ca)]>0x0)return _0x39bef9[_0x242ed8(0x5a5)](this['_eventId'])&&_0x2001e1['EventsMoveCore'][_0x242ed8(0x2e3)]['metCPC'](_0x5ddd2f[_0x242ed8(0x460)],this[_0x242ed8(0x4e6)]);return!![];}else return this[_0x242ed8(0x5d9)](RegExp['$1'],RegExp['$2']);}if(_0x4bd846[_0x242ed8(0x148)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x242ed8(0x369)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x4bd846[_0x242ed8(0x148)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x242ed8(0x2fa)===_0x242ed8(0x123))return _0x3ae5a1[_0x242ed8(0x193)][_0x242ed8(0x430)][_0x242ed8(0x395)]['OpacitySpeed'];else{const _0x48048c=$gameMap[_0x242ed8(0x5a5)](Number(RegExp['$1']));return this[_0x242ed8(0x119)](_0x48048c);}}if(_0x4bd846[_0x242ed8(0x148)](/TELEPORT TO PLAYER/i))return this[_0x242ed8(0x119)]($gamePlayer);if(_0x4bd846['match'](/TELEPORT TO HOME/i)&&this['eventId']){if(_0x242ed8(0x269)!==_0x242ed8(0x269)){if(_0x5cd350[_0x242ed8(0x170)](_0x3c05b7,_0x300310,_0x19c32c,this[_0x242ed8(0x24b)]))return!![];if(_0x453e72['isRegionForbidPass'](_0x57cd94,_0x3d713d,_0x498364,this[_0x242ed8(0x24b)]))return![];return _0x7b921a[_0x242ed8(0x193)][_0x242ed8(0x5f8)][_0x242ed8(0x3be)](_0x41ea05,_0xb7c0a9,_0x421d49,_0x1f54a9);}else{const _0x1033da=this['_randomHomeX'],_0x49bcfe=this[_0x242ed8(0x1e1)];return this[_0x242ed8(0x369)](_0x1033da,_0x49bcfe);}}try{if(_0x242ed8(0x389)!==_0x242ed8(0x389)){if(this[_0x242ed8(0x201)](_0x515623,_0x408637))return;_0x2af836[_0x242ed8(0x193)][_0x242ed8(0x205)]['call'](this,_0x5d624d,_0x1160dc);}else VisuMZ[_0x242ed8(0x193)][_0x242ed8(0x550)][_0x242ed8(0x3be)](this,_0xb77e30);}catch(_0x228e16){if($gameTemp['isPlaytest']())console['log'](_0x228e16);}},Game_Character['prototype']['processMoveRouteAnimation']=function(_0xf8d026){$gameTemp['requestAnimation']([this],_0xf8d026);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x652)]=function(_0x5c8d9b){const _0x331ba1=_0x2a2f60;let _0x35a8ff=0x0;switch(_0x5c8d9b[_0x331ba1(0x3f0)]()['trim']()){case'!':case'EXCLAMATION':_0x35a8ff=0x1;break;case'?':case _0x331ba1(0x49e):_0x35a8ff=0x2;break;case _0x331ba1(0x57e):case _0x331ba1(0x270):case _0x331ba1(0x596):case _0x331ba1(0x55b):case _0x331ba1(0x5c9):_0x35a8ff=0x3;break;case'HEART':case _0x331ba1(0x444):_0x35a8ff=0x4;break;case _0x331ba1(0x1b4):_0x35a8ff=0x5;break;case _0x331ba1(0x234):_0x35a8ff=0x6;break;case _0x331ba1(0x1ca):case _0x331ba1(0x450):case _0x331ba1(0x3c0):_0x35a8ff=0x7;break;case'SILENCE':case _0x331ba1(0x349):_0x35a8ff=0x8;break;case'LIGHT':case _0x331ba1(0x657):case _0x331ba1(0x157):case _0x331ba1(0x2d2):case _0x331ba1(0x14d):_0x35a8ff=0x9;break;case'Z':case'ZZ':case _0x331ba1(0x207):case _0x331ba1(0x13b):_0x35a8ff=0xa;break;case'USER-DEFINED\x201':_0x35a8ff=0xb;break;case'USER-DEFINED\x202':_0x35a8ff=0xc;break;case _0x331ba1(0x236):_0x35a8ff=0xd;break;case'USER-DEFINED\x204':_0x35a8ff=0xe;break;case _0x331ba1(0x4f5):_0x35a8ff=0xf;break;}$gameTemp[_0x331ba1(0x4d7)](this,_0x35a8ff);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x54d)]=function(_0x56f1e9){const _0x29b4bd=_0x2a2f60;_0x56f1e9+=this[_0x29b4bd(0x107)],this[_0x29b4bd(0x38a)](_0x56f1e9[_0x29b4bd(0x45a)](0x0,0xff));if(this['_opacity']<0xff)this[_0x29b4bd(0x227)]--;},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x592)]=function(_0x10157d){const _0x32a51b=_0x2a2f60;_0x10157d=this['_opacity']-_0x10157d,this[_0x32a51b(0x38a)](_0x10157d[_0x32a51b(0x45a)](0x0,0xff));if(this[_0x32a51b(0x107)]>0x0)this[_0x32a51b(0x227)]--;},Game_Character['prototype']['processMoveRouteHugWall']=function(_0x46c5b4){const _0x396b04=_0x2a2f60,_0x3a9483=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4f9246=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x48a6d5=this[_0x396b04(0x562)](),_0x4ea320=(_0x46c5b4===_0x396b04(0x547)?_0x3a9483:_0x4f9246)[_0x48a6d5],_0x3db173=(_0x46c5b4===_0x396b04(0x547)?_0x4f9246:_0x3a9483)[_0x48a6d5];if(this[_0x396b04(0x4a5)](this['x'],this['y'],_0x4ea320)){if(_0x46c5b4===_0x396b04(0x547)){if(_0x396b04(0x3c3)!==_0x396b04(0x51b))this['turnLeft90']();else{if(!_0xfbb014['EventsMoveCore'][_0x396b04(0x430)][_0x396b04(0x5ec)]['EnableDashTilt'])return;this[_0x396b04(0x3ff)]=0x0;if(this[_0x396b04(0x1ba)]()){const _0x50ff0d=_0x2ddca9[_0x396b04(0x193)]['Settings'][_0x396b04(0x5ec)],_0x2244fc=this[_0x396b04(0x645)][_0x396b04(0x562)]();let _0x22d57a=0x0;if([0x1,0x4,0x7][_0x396b04(0x117)](_0x2244fc))_0x22d57a=_0x50ff0d[_0x396b04(0x465)];if([0x3,0x6,0x9]['includes'](_0x2244fc))_0x22d57a=_0x50ff0d[_0x396b04(0x4bb)];[0x2,0x8][_0x396b04(0x117)](_0x2244fc)&&(_0x22d57a=[-_0x50ff0d[_0x396b04(0x3f9)],0x0,_0x50ff0d[_0x396b04(0x3f9)]][this[_0x396b04(0x645)]['pattern']()]);if(this['_reflection'])_0x22d57a*=-0x1;this[_0x396b04(0x3ff)]=_0x22d57a;}}}else this[_0x396b04(0x171)]();}else{if(!this['canPass'](this['x'],this['y'],this['direction']())){if('ZmIde'!==_0x396b04(0x428))this[_0x396b04(0x4a5)](this['x'],this['y'],_0x3db173)?_0x46c5b4===_0x396b04(0x547)?_0x396b04(0x338)!=='XVQnT'?this['turnRight90']():this[_0x396b04(0x2a3)](_0x58d890):this[_0x396b04(0x57c)]():_0x396b04(0x3cb)===_0x396b04(0x3cb)?this[_0x396b04(0x3c4)]():_0x293459=_0x7dbfc8[_0x396b04(0x39e)](_0x212053,(_0x39b54d,_0x15b8df)=>_0x31dcee[_0x396b04(0x50f)](_0x3c9c4e(_0x15b8df)));else{if(this===_0x2f8f00)return;const _0x33cacd=[this[_0x396b04(0x623)],this['_eventId'],_0x396b04(0x5b3)[_0x396b04(0x198)](_0x4a6e18)];_0xda9e54['setValue'](_0x33cacd,_0x5a06a2(_0x3785b5));}}}if(this[_0x396b04(0x4a5)](this['x'],this['y'],this['direction']())){if('rQZZg'!==_0x396b04(0x632))this[_0x396b04(0x3ae)]();else{if(!_0x59172c[_0x396b04(0x193)][_0x396b04(0x430)][_0x396b04(0x5ec)][_0x396b04(0x5a8)])return;for(const _0x3c9564 of this[_0x396b04(0x267)]){this[_0x396b04(0x167)][_0x396b04(0x12b)](_0x3c9564[_0x396b04(0x192)]);}}}},Game_Character[_0x2a2f60(0x354)]['processMoveRouteSetIndex']=function(_0xe5da13){const _0x513912=_0x2a2f60;if(ImageManager[_0x513912(0x1d7)](this[_0x513912(0x4ff)]))return;_0xe5da13=_0xe5da13[_0x513912(0x45a)](0x0,0x7),this[_0x513912(0x54b)](this[_0x513912(0x4ff)],_0xe5da13);},Game_Character[_0x2a2f60(0x354)]['processMoveRouteJumpForward']=function(_0x457627){const _0x144ac7=_0x2a2f60;switch(this[_0x144ac7(0x562)]()){case 0x1:this[_0x144ac7(0x50e)](-_0x457627,_0x457627);break;case 0x2:this[_0x144ac7(0x50e)](0x0,_0x457627);break;case 0x3:this[_0x144ac7(0x50e)](_0x457627,_0x457627);break;case 0x4:this[_0x144ac7(0x50e)](-_0x457627,0x0);break;case 0x6:this[_0x144ac7(0x50e)](_0x457627,0x0);break;case 0x7:this[_0x144ac7(0x50e)](-_0x457627,-_0x457627);break;case 0x8:this[_0x144ac7(0x50e)](0x0,-_0x457627);break;case 0x9:this[_0x144ac7(0x50e)](_0x457627,-_0x457627);break;}},Game_Character['prototype'][_0x2a2f60(0x177)]=function(_0x46539f,_0x55d797){const _0x29c742=_0x2a2f60,_0x227cf6=Math[_0x29c742(0x4b9)](_0x46539f-this['x']),_0x3caba7=Math[_0x29c742(0x4b9)](_0x55d797-this['y']);this[_0x29c742(0x50e)](_0x227cf6,_0x3caba7);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x147)]=function(_0x4203dc){const _0x433cf2=_0x2a2f60;if(_0x4203dc)this[_0x433cf2(0x177)](_0x4203dc['x'],_0x4203dc['y']);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x63f)]=function(_0x533f7c,_0x216526,_0x21c9d9){const _0x79339f=_0x2a2f60;let _0x143721=0x0;if(_0x21c9d9)$gameTemp['_moveAllowPlayerCollision']=!![];if($gameMap[_0x79339f(0x549)]())_0x143721=this[_0x79339f(0x209)](_0x533f7c,_0x216526);else{if(_0x79339f(0x250)!=='hwRjJ')_0x143721=this[_0x79339f(0x32a)](_0x533f7c,_0x216526);else return this[_0x79339f(0x3d6)](_0x33acb4['$1'],_0x29c1f9['$2']);}if(_0x21c9d9)$gameTemp[_0x79339f(0x17a)]=![];this[_0x79339f(0x4e7)](_0x143721),this[_0x79339f(0x291)](!![]);},Game_Character['prototype'][_0x2a2f60(0x46c)]=function(_0x3f5563){if(_0x3f5563)this['processMoveRouteStepTo'](_0x3f5563['x'],_0x3f5563['y']);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x4a4)]=function(_0x50219f,_0x1de489){const _0x3e68a9=_0x2a2f60,_0x1c0ad5=this['deltaXFrom'](_0x50219f),_0xb4aa4d=this[_0x3e68a9(0x1d6)](_0x1de489);},Game_Character['prototype'][_0x2a2f60(0x4ec)]=function(_0x323964){const _0x530fe9=_0x2a2f60;if(_0x323964[_0x530fe9(0x148)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)){if('lbhAE'===_0x530fe9(0x4c2))_0x9fd5f4[_0x530fe9(0x193)][_0x530fe9(0x1f7)][_0x530fe9(0x3be)](this,_0x348188,_0x40864c);else return!![];}else return _0x323964['match'](/(?:AVOID|EVADE|DODGE)/i)?_0x530fe9(0x4d9)!=='jcOSN'?this[_0x530fe9(0x1be)]:![]:![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x616)]=Game_Event['prototype'][_0x2a2f60(0x1ce)],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1ce)]=function(_0x6ec9ce,_0x5bed5d){const _0x2d13ab=_0x2a2f60;if($gameTemp[_0x2d13ab(0x17a)])return![];return VisuMZ['EventsMoveCore'][_0x2d13ab(0x616)][_0x2d13ab(0x3be)](this,_0x6ec9ce,_0x5bed5d);},Game_Character[_0x2a2f60(0x354)]['processMoveRouteMoveUntilStop']=function(_0x1e4809,_0x17aaca){const _0x7a9b11=_0x2a2f60,_0x22c784=['',_0x7a9b11(0x63d),_0x7a9b11(0x37e),'LOWER\x20RIGHT',_0x7a9b11(0x152),'',_0x7a9b11(0x615),_0x7a9b11(0x138),'UP',_0x7a9b11(0x399)],_0x5b020e=_0x22c784[_0x7a9b11(0x5bb)](_0x1e4809[_0x7a9b11(0x3f0)]()[_0x7a9b11(0x637)]());if(_0x5b020e<=0x0)return;if(_0x17aaca)$gameTemp[_0x7a9b11(0x17a)]=!![];if(this[_0x7a9b11(0x4a5)](this['x'],this['y'],_0x5b020e)){if(_0x7a9b11(0x301)==='bzuys'){if(_0x17aaca)$gameTemp[_0x7a9b11(0x17a)]=![];this[_0x7a9b11(0x4e7)](_0x5b020e),this[_0x7a9b11(0x227)]-=0x1;}else{if(_0x781623)this[_0x7a9b11(0x177)](_0x35d96e['x'],_0x4d962e['y']);}}if(_0x17aaca)$gameTemp[_0x7a9b11(0x17a)]=![];},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x380)]=function(_0xfbc45f,_0x5e68a9,_0x55d9e9){const _0x566166=_0x2a2f60;this['processMoveRouteStepTo'](_0xfbc45f,_0x5e68a9,_0x55d9e9);if(this['x']!==_0xfbc45f||this['y']!==_0x5e68a9)this[_0x566166(0x227)]--;},Game_Character['prototype'][_0x2a2f60(0x2e2)]=function(_0x384423,_0x1e4506){const _0xa4cc8c=_0x2a2f60;if(_0x384423&&!_0x384423[_0xa4cc8c(0x35a)]){if(_0xa4cc8c(0x2b1)!==_0xa4cc8c(0x48b)){this[_0xa4cc8c(0x380)](_0x384423['x'],_0x384423['y'],_0x1e4506);if(_0x384423[_0xa4cc8c(0x46a)]()&&this[_0xa4cc8c(0x46a)]()){const _0xaca246=$gameMap[_0xa4cc8c(0x277)](this['x'],this['y'],_0x384423['x'],_0x384423['y']);if(_0xaca246<=0x1)this[_0xa4cc8c(0x227)]++;}}else _0x661510[_0xa4cc8c(0x193)][_0xa4cc8c(0x261)]['call'](this),_0x32aa1a[_0xa4cc8c(0x49f)](0x0);}},Game_Character['prototype'][_0x2a2f60(0x11e)]=function(_0x3f94f8,_0xb02e50){const _0x272d79=_0x2a2f60;_0xb02e50=_0xb02e50||0x0;const _0x90180={'code':0x1,'indent':null,'parameters':[]};_0x90180[_0x272d79(0x58b)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x3f94f8],this[_0x272d79(0x441)][_0x272d79(0x364)][this[_0x272d79(0x227)]][_0x272d79(0x3da)][0x0]='';while(_0xb02e50--){if(_0x272d79(0x3ea)!=='bMYLa'){if([0x2,0x4,0x6,0x8][_0x272d79(0x117)](_0x1cd11e))return 0x4;if([0x1,0x3,0x7,0x9][_0x272d79(0x117)](_0x5309e0))return 0x5;}else this[_0x272d79(0x441)][_0x272d79(0x364)][_0x272d79(0x13c)](this['_moveRouteIndex']+0x1,0x0,_0x90180);}},Game_Character['prototype'][_0x2a2f60(0x42e)]=function(_0x1aee5d){const _0x3a971c=_0x2a2f60;this[_0x3a971c(0x28a)]=!![],this[_0x3a971c(0x1d2)](_0x1aee5d);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x3d6)]=function(_0x30a1a3,_0x1d35fc){const _0x41510f=_0x2a2f60;if(this===$gamePlayer)return;const _0x248e7c=[this[_0x41510f(0x623)],this[_0x41510f(0x4e6)],'A'];_0x30a1a3['match'](/\b[ABCD]\b/i)?'WzlvE'===_0x41510f(0x1c9)?_0x248e7c[0x2]=String(_0x30a1a3)['charAt'](0x0)[_0x41510f(0x3f0)]()[_0x41510f(0x637)]():_0x1ba2dd[_0x8c58a2]?(_0x33b922[_0x41510f(0x446)][_0x1db0cc]=_0x2a7499[_0x5842ed],_0x1f5827[_0x315921]=_0x12bb18):_0x29fde3(this[_0x41510f(0x3e9)]['bind'](this,_0x4470d3,_0x6ef717),0x64):_0x248e7c[0x2]='Self\x20Switch\x20%1'['format'](_0x30a1a3);switch(_0x1d35fc['toUpperCase']()[_0x41510f(0x637)]()){case'ON':case _0x41510f(0x1f1):$gameSelfSwitches[_0x41510f(0x104)](_0x248e7c,!![]);break;case _0x41510f(0x27a):case _0x41510f(0x625):$gameSelfSwitches[_0x41510f(0x104)](_0x248e7c,![]);break;case _0x41510f(0x2b0):$gameSelfSwitches['setValue'](_0x248e7c,!$gameSelfSwitches[_0x41510f(0x50f)](_0x248e7c));break;}},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x5d9)]=function(_0x154579,_0x2ab9c0){const _0x39f52e=_0x2a2f60;if(this===$gamePlayer)return;const _0x2a56d5=[this[_0x39f52e(0x623)],this[_0x39f52e(0x4e6)],'Self\x20Variable\x20%1'[_0x39f52e(0x198)](_0x154579)];$gameSelfSwitches[_0x39f52e(0x104)](_0x2a56d5,Number(_0x2ab9c0));},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x369)]=function(_0xb6bdc2,_0x4ad8af){this['locate'](_0xb6bdc2,_0x4ad8af);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x119)]=function(_0x4abe94){const _0x3425d7=_0x2a2f60;if(_0x4abe94)this[_0x3425d7(0x369)](_0x4abe94['x'],_0x4abe94['y']);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x171)]=function(){const _0xcd075=_0x2a2f60;switch(this[_0xcd075(0x562)]()){case 0x1:this[_0xcd075(0x47d)](0x7);break;case 0x2:this[_0xcd075(0x47d)](0x4);break;case 0x3:this[_0xcd075(0x47d)](0x1);break;case 0x4:this[_0xcd075(0x47d)](0x8);break;case 0x6:this[_0xcd075(0x47d)](0x2);break;case 0x7:this[_0xcd075(0x47d)](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0xcd075(0x47d)](0x3);break;}},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x57c)]=function(){const _0x39d9ff=_0x2a2f60;switch(this[_0x39d9ff(0x562)]()){case 0x1:this[_0x39d9ff(0x47d)](0x3);break;case 0x2:this[_0x39d9ff(0x47d)](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x39d9ff(0x47d)](0x8);break;case 0x7:this[_0x39d9ff(0x47d)](0x1);break;case 0x8:this[_0x39d9ff(0x47d)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x2a2f60(0x354)]['getDirectionToPoint']=function(_0xbe6128,_0x47b056,_0x2e55d9){const _0x535338=_0x2a2f60,_0x273862=this[_0x535338(0x2e4)](_0xbe6128),_0x248161=this['deltaYFrom'](_0x47b056);if($gameMap[_0x535338(0x549)]()){if(_0x535338(0x336)==='CmXUf')this['deleteIconsOnEventsDataKey'](_0x69cbec[_0x535338(0x623)],_0x1640b1['_eventId']);else{if(_0x2e55d9||this[_0x535338(0x548)]()){if(_0x273862>0x0&&_0x248161<0x0)return 0x1;if(_0x273862<0x0&&_0x248161<0x0)return 0x3;if(_0x273862>0x0&&_0x248161>0x0)return 0x7;if(_0x273862<0x0&&_0x248161>0x0)return 0x9;}}}if(Math[_0x535338(0x61e)](_0x273862)>Math[_0x535338(0x61e)](_0x248161))return'sTbAB'===_0x535338(0x54f)?this[_0x535338(0x372)]:_0x273862>0x0?0x4:0x6;else{if(_0x248161!==0x0){if('Fqnzw'!==_0x535338(0x571))return _0x248161>0x0?0x8:0x2;else this['contentsOpacity']-=this[_0x535338(0x3ec)]();}}return 0x0;},Game_Character['prototype'][_0x2a2f60(0x188)]=function(_0x25a885,_0x2ef7de,_0x1a5b9e){const _0x3bf1a2=_0x2a2f60,_0x16e1de=this['deltaXFrom'](_0x25a885),_0xea6f27=this['deltaYFrom'](_0x2ef7de);if($gameMap['isSupportDiagonalMovement']()){if(_0x1a5b9e||this['isSpriteVS8dir']()){if(_0x3bf1a2(0x233)!==_0x3bf1a2(0x233))this[_0x3bf1a2(0x1df)]=![],this[_0x3bf1a2(0x514)]=!![];else{if(_0x16e1de>0x0&&_0xea6f27<0x0)return 0x9;if(_0x16e1de<0x0&&_0xea6f27<0x0)return 0x7;if(_0x16e1de>0x0&&_0xea6f27>0x0)return 0x3;if(_0x16e1de<0x0&&_0xea6f27>0x0)return 0x1;}}}if(Math[_0x3bf1a2(0x61e)](_0x16e1de)>Math[_0x3bf1a2(0x61e)](_0xea6f27))return _0x16e1de>0x0?0x6:0x4;else{if(_0xea6f27!==0x0)return _0xea6f27>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x5ff)]=function(_0x5bc591,_0x5e589d){const _0x3dc616=_0x2a2f60,_0x5c7201=this[_0x3dc616(0x2a8)](_0x5bc591,_0x5e589d,!![]);if(_0x5c7201)this[_0x3dc616(0x4e7)](_0x5c7201);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x409)]=function(_0x553a1a,_0x51ea17){const _0x1fea81=_0x2a2f60,_0x474501=this[_0x1fea81(0x188)](_0x553a1a,_0x51ea17,!![]);if(_0x474501)this['executeMoveDir8'](_0x474501);},Game_Character['prototype'][_0x2a2f60(0x23c)]=function(_0x1d701,_0x590bc8){const _0x19ed4a=_0x2a2f60,_0x194d03=this[_0x19ed4a(0x2a8)](_0x1d701,_0x590bc8,![]);if(_0x194d03)this[_0x19ed4a(0x47d)](_0x194d03);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x5e4)]=function(_0x51c342,_0xdcd711){const _0x2c55e1=_0x2a2f60,_0x364fcc=this[_0x2c55e1(0x188)](_0x51c342,_0xdcd711,![]);if(_0x364fcc)this[_0x2c55e1(0x47d)](_0x364fcc);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x2b8)]=function(_0x21cb83){const _0x57092f=_0x2a2f60;if(_0x21cb83)this[_0x57092f(0x5ff)](_0x21cb83['x'],_0x21cb83['y']);},Game_Character['prototype'][_0x2a2f60(0x5df)]=function(_0x424e13){if(_0x424e13)this['moveAwayFromPoint'](_0x424e13['x'],_0x424e13['y']);},Game_Character[_0x2a2f60(0x354)][_0x2a2f60(0x4a8)]=function(_0x4a4627){const _0x4e373c=_0x2a2f60;if(_0x4a4627)this[_0x4e373c(0x23c)](_0x4a4627['x'],_0x4a4627['y']);},Game_Character['prototype']['turnAwayFromCharacter']=function(_0xc9ab0e){const _0x16bc11=_0x2a2f60;if(_0xc9ab0e)this[_0x16bc11(0x5e4)](_0xc9ab0e['x'],_0xc9ab0e['y']);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2e9)]=Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x350)],Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x350)]=function(){const _0x31ddcd=_0x2a2f60;if(!Game_CharacterBase[_0x31ddcd(0x169)]&&this['isOnLadder']())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0x31ddcd(0x193)]['Game_Player_isDashing'][_0x31ddcd(0x3be)](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2b5)]=Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x310)],Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x310)]=function(){const _0x384fd8=_0x2a2f60;return $gameMap[_0x384fd8(0x549)]()?this['getInputDir8']():VisuMZ[_0x384fd8(0x193)]['Game_Player_getInputDirection']['call'](this);},Game_Player['prototype'][_0x2a2f60(0x1e9)]=function(){return Input['dir8'];},Game_Player['prototype'][_0x2a2f60(0x341)]=function(){const _0xc04c84=_0x2a2f60;if($gameSystem[_0xc04c84(0x38e)]())return 0x0;if(!this[_0xc04c84(0x4af)]()&&this[_0xc04c84(0x392)]()){if(_0xc04c84(0x2de)==='gGfVI'){let _0x2fd474=this['getInputDirection']();if(_0x2fd474>0x0)$gameTemp[_0xc04c84(0x1b5)]();else{if($gameTemp['isDestinationValid']()){const _0x77505c=$gameTemp[_0xc04c84(0x232)](),_0x74e5c9=$gameTemp['destinationY']();if(this[_0xc04c84(0x4fc)](_0x77505c,_0x74e5c9))_0x2fd474=this[_0xc04c84(0x209)](_0x77505c,_0x74e5c9);else{if(_0xc04c84(0x517)==='eadfD')_0x2fd474=this[_0xc04c84(0x32a)](_0x77505c,_0x74e5c9);else{if(!this[_0xc04c84(0x2b7)])return;this[_0xc04c84(0x2b7)][_0xc04c84(0x340)]=!!_0x52e1a7['EventsMoveCore'][_0xc04c84(0x430)][_0xc04c84(0x5ec)][_0xc04c84(0x1f5)];}}}}_0x2fd474>0x0?'zIRKn'==='ZdGWI'?(_0x53bef5['EventsMoveCore'][_0xc04c84(0x22d)][_0xc04c84(0x3be)](this),this['bitmap'][_0xc04c84(0x311)](this[_0xc04c84(0x2cb)][_0xc04c84(0x308)](this))):(this['_inputTime']=this['_inputTime']||0x0,this['isTurnInPlace']()?_0xc04c84(0x52d)===_0xc04c84(0x491)?this['_advancedSwitchVariable']=!![]:this[_0xc04c84(0x47d)](_0x2fd474):this[_0xc04c84(0x2a3)](_0x2fd474),this['_inputTime']++):this[_0xc04c84(0x46b)]=0x0;}else _0x32aad3[_0xc04c84(0x193)][_0xc04c84(0x1d1)][_0xc04c84(0x3be)](this),this[_0xc04c84(0x1c4)](),this['createAttachPictureSprite'](),this['createIconSprite']();}},Game_Player['prototype'][_0x2a2f60(0x30c)]=function(){const _0x4a6cd9=_0x2a2f60,_0x616838=VisuMZ[_0x4a6cd9(0x193)]['Settings']['Movement'];if(!_0x616838['EnableTurnInPlace'])return![];if($gameTemp[_0x4a6cd9(0x2c0)]())return![];if(this['isDashing']()||this['isMoving']()||this[_0x4a6cd9(0x4ab)]())return![];return this[_0x4a6cd9(0x46b)]<_0x616838['TurnInPlaceDelay'];},VisuMZ[_0x2a2f60(0x193)]['Game_Player_executeMove']=Game_Player[_0x2a2f60(0x354)]['executeMove'],Game_Player[_0x2a2f60(0x354)]['executeMove']=function(_0x57aef2){const _0x129b67=_0x2a2f60;$gameMap[_0x129b67(0x549)]()?_0x129b67(0x1ad)===_0x129b67(0x347)?(_0x3e42cd[_0x129b67(0x193)][_0x129b67(0x29b)][_0x129b67(0x3be)](this,_0x113457,_0xa9fda4),this[_0x129b67(0x397)](),this[_0x129b67(0x229)](),this['restoreSavedEventPosition']()):this['executeMoveDir8'](_0x57aef2):VisuMZ[_0x129b67(0x193)]['Game_Player_executeMove'][_0x129b67(0x3be)](this,_0x57aef2);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5c5)]=Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x590)],Game_Player[_0x2a2f60(0x354)]['isMapPassable']=function(_0x1461a5,_0x29ac17,_0x1c6dbd){const _0x1f8f52=_0x2a2f60;if($gameMap[_0x1f8f52(0x170)](_0x1461a5,_0x29ac17,_0x1c6dbd,'player')){if(this[_0x1f8f52(0x63e)]()&&this[_0x1f8f52(0x458)]()){if('fyVJO'!=='fyVJO'){_0xf78b28=_0x229f22||0x0;const _0x117c2f={'code':0x1,'indent':null,'parameters':[]};_0x117c2f[_0x1f8f52(0x58b)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x25f8ce],this[_0x1f8f52(0x441)]['list'][this['_moveRouteIndex']][_0x1f8f52(0x3da)][0x0]='';while(_0x53c9c3--){this[_0x1f8f52(0x441)][_0x1f8f52(0x364)][_0x1f8f52(0x13c)](this['_moveRouteIndex']+0x1,0x0,_0x117c2f);}}else return this[_0x1f8f52(0x458)]()[_0x1f8f52(0x590)](_0x1461a5,_0x29ac17,_0x1c6dbd);}else{if(_0x1f8f52(0x58a)===_0x1f8f52(0x21c))_0x4d3eb6['mapId']=_0x52124f['MapID'],_0x398d2d[_0x1f8f52(0x206)]=_0x50bbca['EventID'];else return!![];}}if($gameMap[_0x1f8f52(0x5ba)](_0x1461a5,_0x29ac17,_0x1c6dbd,_0x1f8f52(0x360)))return![];return VisuMZ[_0x1f8f52(0x193)][_0x1f8f52(0x5c5)]['call'](this,_0x1461a5,_0x29ac17,_0x1c6dbd);},VisuMZ[_0x2a2f60(0x193)]['Game_Player_checkEventTriggerHere']=Game_Player['prototype']['checkEventTriggerHere'],Game_Player[_0x2a2f60(0x354)]['checkEventTriggerHere']=function(_0x20f89f){const _0x1904fe=_0x2a2f60;VisuMZ[_0x1904fe(0x193)][_0x1904fe(0x402)]['call'](this,_0x20f89f);if(this['canStartLocalEvents']()){this[_0x1904fe(0x49b)](_0x20f89f);if(_0x20f89f['includes'](0x0)&&this[_0x1904fe(0x473)]()===_0x1904fe(0x20d)){if(_0x1904fe(0x464)!==_0x1904fe(0x52e))this[_0x1904fe(0x5fc)](this['x'],this['y']);else{if(_0x5a4f9a>0x0&&_0x36d575<0x0)return 0x1;if(_0x49d277<0x0&&_0x18eba2<0x0)return 0x3;if(_0x117c34>0x0&&_0x95bd80>0x0)return 0x7;if(_0x33241b<0x0&&_0x37b206>0x0)return 0x9;}}else(_0x20f89f[_0x1904fe(0x117)](0x1)||_0x20f89f['includes'](0x2))&&this[_0x1904fe(0x23b)]();}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x329)]=Game_Player[_0x2a2f60(0x354)]['checkEventTriggerThere'],Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x101)]=function(_0x51312b){const _0x104879=_0x2a2f60;VisuMZ[_0x104879(0x193)][_0x104879(0x329)][_0x104879(0x3be)](this,_0x51312b);if(this['canStartLocalEvents']()&&_0x51312b[_0x104879(0x117)](0x0)&&this[_0x104879(0x473)]()==='front'){const _0x4a7c9e=this[_0x104879(0x562)](),_0x20f52f=$gameMap[_0x104879(0x26c)](this['x'],_0x4a7c9e),_0x557789=$gameMap['roundYWithDirection'](this['y'],_0x4a7c9e);this[_0x104879(0x5fc)](_0x20f52f,_0x557789);}},Game_Player[_0x2a2f60(0x354)]['checkEventTriggerEventsMoveCore']=function(_0x28494a){const _0x51b120=_0x2a2f60;if($gameMap[_0x51b120(0x251)]())return;if($gameMap['isAnyEventStarting']())return;const _0x88099f=$gameMap['events']();for(const _0x11a54 of _0x88099f){if('rzHWD'===_0x51b120(0x35e)){if(!_0x11a54)continue;if(!_0x11a54['isTriggerIn'](_0x28494a))continue;if(this['meetActivationRegionConditions'](_0x11a54))return _0x11a54[_0x51b120(0x375)]();if(this[_0x51b120(0x638)](_0x11a54))return _0x11a54[_0x51b120(0x375)]();}else{if(this[_0x51b120(0x26e)](_0x580d01,_0x18388b))return![];if(!this[_0x51b120(0x38c)](_0x491ce8,_0x894877,_0x5507f0))return![];}}},Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x1f0)]=function(_0x2cee34){const _0x25ae36=_0x2a2f60;if($gameMap[_0x25ae36(0x251)]())return![];if($gameMap[_0x25ae36(0x5f9)]())return![];return _0x2cee34[_0x25ae36(0x10d)]()[_0x25ae36(0x117)](this[_0x25ae36(0x40a)]());},Game_Player[_0x2a2f60(0x354)]['meetActivationProximityConditions']=function(_0x403f34){const _0x1171e5=_0x2a2f60;if($gameMap['isEventRunning']())return![];if($gameMap[_0x1171e5(0x5f9)]())return![];if([_0x1171e5(0x5ea),_0x1171e5(0x5b8)]['includes'](_0x403f34[_0x1171e5(0x3aa)]()))return![];const _0x3d6cf2=_0x403f34['activationProximityType'](),_0x3fb57b=_0x403f34['activationProximityDistance']();switch(_0x3d6cf2){case _0x1171e5(0x317):return _0x3fb57b>=Math[_0x1171e5(0x61e)](_0x403f34[_0x1171e5(0x2e4)](this['x']))&&_0x3fb57b>=Math[_0x1171e5(0x61e)](_0x403f34['deltaYFrom'](this['y']));break;case _0x1171e5(0x4ca):const _0x41fbc9=Math[_0x1171e5(0x611)](_0x403f34['x']-$gamePlayer['x'],0x2),_0x372378=Math[_0x1171e5(0x611)](_0x403f34['y']-$gamePlayer['y'],0x2);return _0x3fb57b>=Math[_0x1171e5(0x4b9)](Math[_0x1171e5(0x4ef)](_0x41fbc9+_0x372378));break;case _0x1171e5(0x16f):case _0x1171e5(0x2c9):const _0x3fc23c=$gameMap['distance'](this['x'],this['y'],_0x403f34['x'],_0x403f34['y']);return _0x403f34[_0x1171e5(0x5de)]()>=_0x3fc23c;break;case _0x1171e5(0x131):return _0x3fb57b>=Math[_0x1171e5(0x61e)](_0x403f34['deltaYFrom'](this['y']));break;case'column':return _0x3fb57b>=Math['abs'](_0x403f34[_0x1171e5(0x2e4)](this['x']));break;case _0x1171e5(0x5c4):return![];break;}},Game_Player[_0x2a2f60(0x354)][_0x2a2f60(0x5fc)]=function(_0x4d6964,_0x277148){const _0x4b1068=_0x2a2f60;if($gameMap[_0x4b1068(0x251)]())return;if($gameMap[_0x4b1068(0x5f9)]())return;let _0x1fe304=VisuMZ[_0x4b1068(0x193)][_0x4b1068(0x430)]['RegionOk'],_0x519101=$gameMap[_0x4b1068(0x40a)](_0x4d6964,_0x277148);const _0x4d70a5=_0x4b1068(0x5ef)['format'](_0x519101);_0x1fe304[_0x4d70a5]&&$gameTemp['reserveCommonEvent'](_0x1fe304[_0x4d70a5]);},Game_Player['prototype'][_0x2a2f60(0x473)]=function(){const _0x2e3749=_0x2a2f60;return VisuMZ[_0x2e3749(0x193)]['Settings'][_0x2e3749(0x521)];},Game_Player[_0x2a2f60(0x354)]['startMapCommonEventOnTouch']=function(){const _0x2fcb78=_0x2a2f60;if($gameMap['isEventRunning']())return;if($gameMap[_0x2fcb78(0x5f9)]())return;let _0x578e76=VisuMZ[_0x2fcb78(0x193)][_0x2fcb78(0x430)]['RegionTouch'];const _0x480c73=_0x2fcb78(0x5ef)[_0x2fcb78(0x198)](this[_0x2fcb78(0x40a)]());_0x578e76[_0x480c73]&&(_0x2fcb78(0x5e6)===_0x2fcb78(0x3a5)?_0x54f449[_0x2fcb78(0x289)]():$gameTemp[_0x2fcb78(0x135)](_0x578e76[_0x480c73]));},VisuMZ[_0x2a2f60(0x193)]['Game_Player_increaseSteps']=Game_Player[_0x2a2f60(0x354)]['increaseSteps'],Game_Player[_0x2a2f60(0x354)]['increaseSteps']=function(){const _0x2935f8=_0x2a2f60;VisuMZ[_0x2935f8(0x193)]['Game_Player_increaseSteps'][_0x2935f8(0x3be)](this),VisuMZ[_0x2935f8(0x49f)](0x0);},Game_Player['prototype'][_0x2a2f60(0x28c)]=function(){const _0x40def4=_0x2a2f60;VisuMZ[_0x40def4(0x2d3)](0x0);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x445)]=Game_Follower[_0x2a2f60(0x354)]['initialize'],Game_Follower['prototype'][_0x2a2f60(0x222)]=function(_0x33b629){const _0x301801=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x301801(0x445)][_0x301801(0x3be)](this,_0x33b629),this[_0x301801(0x4ce)]=![];},Game_Follower[_0x2a2f60(0x354)][_0x2a2f60(0x350)]=function(){const _0x6f54dd=_0x2a2f60;if(this[_0x6f54dd(0x4ce)])return Game_Character[_0x6f54dd(0x354)][_0x6f54dd(0x350)][_0x6f54dd(0x3be)](this);return $gamePlayer[_0x6f54dd(0x350)]();},Game_Follower[_0x2a2f60(0x354)][_0x2a2f60(0x5d5)]=function(){const _0x346d06=_0x2a2f60;if(this[_0x346d06(0x4ce)])return Game_Character['prototype']['isDashingAndMoving']['call'](this);return $gamePlayer['isDashingAndMoving']()&&this['_actuallyMoving'];},Game_Follower['prototype'][_0x2a2f60(0x4f9)]=function(){const _0x1420ad=_0x2a2f60;return $gamePlayer[_0x1420ad(0x4f9)]();},Game_Follower[_0x2a2f60(0x354)][_0x2a2f60(0x22c)]=function(){const _0x5574fa=_0x2a2f60;Game_Character['prototype'][_0x5574fa(0x22c)]['call'](this),this[_0x5574fa(0x22e)]>0x0&&(_0x5574fa(0x316)!==_0x5574fa(0x57d)?this['_actuallyMoving']=![]:this['_DisablePlayerControl']=![]);},Game_Follower[_0x2a2f60(0x354)]['setChaseOff']=function(_0x1d3278){const _0x3e6699=_0x2a2f60;this[_0x3e6699(0x4ce)]=_0x1d3278;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x185)]=Game_Follower[_0x2a2f60(0x354)][_0x2a2f60(0x593)],Game_Follower['prototype'][_0x2a2f60(0x593)]=function(_0x37984e){const _0x1d4b03=_0x2a2f60;if(this[_0x1d4b03(0x4ce)])return;if($gameSystem[_0x1d4b03(0x3a6)]())return;VisuMZ['EventsMoveCore'][_0x1d4b03(0x185)][_0x1d4b03(0x3be)](this,_0x37984e),this[_0x1d4b03(0x20e)]=!![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2be)]=Game_Vehicle[_0x2a2f60(0x354)]['isMapPassable'],Game_Vehicle[_0x2a2f60(0x354)]['isMapPassable']=function(_0x69319d,_0x8d32fb,_0x36e951){const _0x199ddd=_0x2a2f60;if($gameMap[_0x199ddd(0x170)](_0x69319d,_0x8d32fb,_0x36e951,this[_0x199ddd(0x24b)]))return!![];if($gameMap[_0x199ddd(0x5ba)](_0x69319d,_0x8d32fb,_0x36e951,this[_0x199ddd(0x24b)]))return![];return VisuMZ['EventsMoveCore'][_0x199ddd(0x2be)][_0x199ddd(0x3be)](this,_0x69319d,_0x8d32fb,_0x36e951);},Game_Vehicle[_0x2a2f60(0x354)]['isAirshipPassable']=function(_0x4634ee,_0x19e73,_0x2dc5a3){const _0x349e5f=_0x2a2f60;if($gameMap[_0x349e5f(0x170)](_0x4634ee,_0x19e73,_0x2dc5a3,this[_0x349e5f(0x24b)]))return!![];if($gameMap[_0x349e5f(0x5ba)](_0x4634ee,_0x19e73,_0x2dc5a3,this['_type']))return![];return VisuMZ['EventsMoveCore'][_0x349e5f(0x5f8)][_0x349e5f(0x3be)]($gamePlayer,_0x4634ee,_0x19e73,_0x2dc5a3);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x1a2)]=Game_Vehicle[_0x2a2f60(0x354)]['isLandOk'],Game_Vehicle['prototype'][_0x2a2f60(0x540)]=function(_0x4d8f4d,_0x512b8e,_0xa6e43b){const _0x5134a4=_0x2a2f60;if($gameMap['isRegionDockable'](_0x4d8f4d,_0x512b8e,_0xa6e43b,this[_0x5134a4(0x24b)]))return!![];const _0x11263c=this['_type'][_0x5134a4(0x5c3)](0x0)[_0x5134a4(0x3f0)]()+this[_0x5134a4(0x24b)]['slice'](0x1),_0x30e544='%1DockRegionOnly'[_0x5134a4(0x198)](_0x11263c);if(VisuMZ['EventsMoveCore']['Settings'][_0x5134a4(0x64f)][_0x30e544]){if('FfcBP'!==_0x5134a4(0x24a)){const _0x5260f5=this[_0x5134a4(0x107)]+_0x2668c9(_0x113c7b['$1']);return this[_0x5134a4(0x38a)](_0x5260f5[_0x5134a4(0x45a)](0x0,0xff));}else return![];}else{if(_0x5134a4(0x1cf)!==_0x5134a4(0x106))return VisuMZ[_0x5134a4(0x193)]['Game_Vehicle_isLandOk']['call'](this,_0x4d8f4d,_0x512b8e,_0xa6e43b);else{const _0x4107da=[_0x498c89,_0x374bc9,_0x5134a4(0x5b3)[_0x5134a4(0x198)](_0x3c990b)];_0x11e3cb[_0x5134a4(0x104)](_0x4107da,_0xc97207);}}},VisuMZ[_0x2a2f60(0x193)]['Game_Vehicle_initMoveSpeed']=Game_Vehicle[_0x2a2f60(0x354)][_0x2a2f60(0x3e1)],Game_Vehicle[_0x2a2f60(0x354)][_0x2a2f60(0x3e1)]=function(){const _0x28bd43=_0x2a2f60;VisuMZ[_0x28bd43(0x193)][_0x28bd43(0x539)][_0x28bd43(0x3be)](this);const _0x33aa78=VisuMZ[_0x28bd43(0x193)]['Settings'][_0x28bd43(0x5ec)];if(this[_0x28bd43(0x4cc)]()){if(_0x33aa78[_0x28bd43(0x581)])this[_0x28bd43(0x19d)](_0x33aa78[_0x28bd43(0x581)]);}else{if(this[_0x28bd43(0x5cc)]()){if(_0x28bd43(0x57a)===_0x28bd43(0x2e0)){if(this['_PreservedEventMorphData']===_0x1aaf21)this[_0x28bd43(0x57f)]();const _0x60aedc=_0x28bd43(0x488)[_0x28bd43(0x198)](_0x5aa8fa,_0x442ae5);delete this[_0x28bd43(0x407)][_0x60aedc];}else{if(_0x33aa78['ShipSpeed'])this[_0x28bd43(0x19d)](_0x33aa78[_0x28bd43(0x406)]);}}else{if(this[_0x28bd43(0x608)]()){if(_0x33aa78[_0x28bd43(0x2ac)])this[_0x28bd43(0x19d)](_0x33aa78[_0x28bd43(0x2ac)]);}}}},VisuMZ[_0x2a2f60(0x193)]['Game_Event_initialize']=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x222)],Game_Event[_0x2a2f60(0x354)]['initialize']=function(_0x5d318d,_0x18af85){const _0x4027b0=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x4027b0(0x29b)]['call'](this,_0x5d318d,_0x18af85),this[_0x4027b0(0x397)](),this['setupMorphEvent'](),this[_0x4027b0(0x1ff)]();},Game_Map['prototype'][_0x2a2f60(0x1e7)]=function(_0x20c1f0,_0x319d5d){const _0x5da93d=_0x2a2f60;return _0x20c1f0===$gameMap[_0x5da93d(0x2a4)]()?$dataMap['events'][_0x319d5d]:VisuMZ['PreloadedMaps'][_0x20c1f0][_0x5da93d(0x218)][_0x319d5d];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x447)]=Game_Event[_0x2a2f60(0x354)]['event'],Game_Event['prototype'][_0x2a2f60(0x5a5)]=function(){const _0x223e77=_0x2a2f60;if(this[_0x223e77(0x133)]!==undefined){if(_0x223e77(0x271)!==_0x223e77(0x522)){const _0x3f93eb=this[_0x223e77(0x133)]['mapId'],_0x5a7e4e=this[_0x223e77(0x133)][_0x223e77(0x206)];return $gameMap[_0x223e77(0x1e7)](_0x3f93eb,_0x5a7e4e);}else this['processSaveEventLocation']();}if(this[_0x223e77(0x21a)]!==undefined){if(_0x223e77(0x1de)===_0x223e77(0x387))return this[_0x223e77(0x263)]&&this[_0x223e77(0x263)]['constructor']===_0x33eac3;else{const _0x1efb3d=this['_eventCopyData'][_0x223e77(0x2a4)],_0x3b1608=this[_0x223e77(0x21a)][_0x223e77(0x206)];return $gameMap['referEvent'](_0x1efb3d,_0x3b1608);}}if(this['_eventSpawnData']!==undefined){const _0x52c6fc=this['_eventSpawnData'][_0x223e77(0x2a4)],_0x543cc1=this[_0x223e77(0x591)][_0x223e77(0x206)];return $gameMap[_0x223e77(0x1e7)](_0x52c6fc,_0x543cc1);}if($gameTemp[_0x223e77(0x2aa)]!==undefined){const _0x42b93d=$gameTemp[_0x223e77(0x2aa)][_0x223e77(0x2a4)],_0x53f554=$gameTemp[_0x223e77(0x2aa)][_0x223e77(0x206)];return $gameMap['referEvent'](_0x42b93d,_0x53f554);}return VisuMZ[_0x223e77(0x193)]['Game_Event_event'][_0x223e77(0x3be)](this);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x2d7)]=function(_0x651003,_0x4bfd88){const _0x19a288=_0x2a2f60;if(_0x651003===0x0||_0x4bfd88===0x0)return![];if(_0x651003===$gameMap[_0x19a288(0x2a4)]())return!![];if(!VisuMZ['PreloadedMaps'][_0x651003]&&_0x651003!==$gameMap[_0x19a288(0x2a4)]()){if(_0x19a288(0x553)!==_0x19a288(0x2c1))return $gameTemp[_0x19a288(0x1a9)]()&&console[_0x19a288(0x159)](_0x19a288(0x355)[_0x19a288(0x198)](_0x651003)),![];else this[_0x19a288(0x3a9)][_0x19a288(0x15d)]()!==this[_0x19a288(0x2d8)]&&(this[_0x19a288(0x2d8)]=this['_event']['labelWindowText'](),this[_0x19a288(0x3d1)]());}return!![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x3e7)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x375)],Game_Event['prototype'][_0x2a2f60(0x375)]=function(){const _0x49b357=_0x2a2f60;VisuMZ[_0x49b357(0x193)][_0x49b357(0x3e7)][_0x49b357(0x3be)](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x49b357(0x358)](VisuMZ['MessageCore'][_0x49b357(0x430)][_0x49b357(0x1e5)][_0x49b357(0x274)])&&Input[_0x49b357(0x289)]();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x397)]=function(){const _0x363c1d=_0x2a2f60,_0x285e8c=this[_0x363c1d(0x5a5)]()[_0x363c1d(0x45c)];if(_0x285e8c==='')return;if(DataManager[_0x363c1d(0x461)]()||DataManager[_0x363c1d(0x5d2)]())return;const _0x548488=VisuMZ[_0x363c1d(0x193)]['Settings']['Template'];let _0x58f3f4=null,_0x4aa910=0x0,_0x378e52=0x0;if(_0x285e8c[_0x363c1d(0x148)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x4aa910=Number(RegExp['$1']),_0x378e52=Number(RegExp['$2']);if(_0x4aa910===0x0)_0x4aa910=$gameMap[_0x363c1d(0x2a4)]();}else{if(_0x285e8c['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x4aa910=Number(RegExp['$1']),_0x378e52=Number(RegExp['$2']);if(_0x4aa910===0x0)_0x4aa910=$gameMap[_0x363c1d(0x2a4)]();}else{if(_0x285e8c[_0x363c1d(0x148)](/<COPY EVENT:[ ](.*?)>/i)){if(_0x363c1d(0x1af)===_0x363c1d(0x1af)){const _0x1edffc=String(RegExp['$1'])[_0x363c1d(0x3f0)]()[_0x363c1d(0x637)]();_0x58f3f4=VisuMZ[_0x363c1d(0x5bf)][_0x1edffc];if(!_0x58f3f4)return;_0x4aa910=_0x58f3f4['MapID'],_0x378e52=_0x58f3f4[_0x363c1d(0x459)];}else return this[_0x363c1d(0x309)]();}}}if(!this[_0x363c1d(0x2d7)](_0x4aa910,_0x378e52))return;_0x548488['PreCopyJS']['call'](this,_0x4aa910,_0x378e52,this);if(_0x58f3f4)_0x58f3f4[_0x363c1d(0x630)][_0x363c1d(0x3be)](this,_0x4aa910,_0x378e52,this);this[_0x363c1d(0x21a)]={'mapId':_0x4aa910,'eventId':_0x378e52},this['_pageIndex']=-0x2,this[_0x363c1d(0x3d1)](),_0x548488['PostCopyJS'][_0x363c1d(0x3be)](this,_0x4aa910,_0x378e52,this);if(_0x58f3f4)_0x58f3f4[_0x363c1d(0x246)][_0x363c1d(0x3be)](this,_0x4aa910,_0x378e52,this);$gameMap[_0x363c1d(0x145)]();},Game_Event[_0x2a2f60(0x354)]['setupMorphEvent']=function(){const _0x6c3927=_0x2a2f60,_0x4a2244=$gameSystem[_0x6c3927(0x64b)](this);if(!_0x4a2244)return;const _0xfb1a0a=_0x4a2244[_0x6c3927(0x442)][_0x6c3927(0x3f0)]()['trim']();_0xfb1a0a!==_0x6c3927(0x423)?this[_0x6c3927(0x429)](_0xfb1a0a,!![]):this[_0x6c3927(0x452)](_0x4a2244['mapId'],_0x4a2244[_0x6c3927(0x206)],!![]);},Game_Event[_0x2a2f60(0x354)]['morphInto']=function(_0x504272,_0x52a177,_0x248f56){const _0x432431=_0x2a2f60;if(!this[_0x432431(0x2d7)](_0x504272,_0x52a177))return;const _0x51ff40=VisuMZ[_0x432431(0x193)][_0x432431(0x430)][_0x432431(0x439)];if(!_0x248f56)_0x51ff40[_0x432431(0x4cd)][_0x432431(0x3be)](this,_0x504272,_0x52a177,this);this[_0x432431(0x133)]={'mapId':_0x504272,'eventId':_0x52a177},this[_0x432431(0x4b1)]=-0x2,this[_0x432431(0x3d1)]();if(!_0x248f56)_0x51ff40[_0x432431(0x2ec)]['call'](this,_0x504272,_0x52a177,this);$gameMap[_0x432431(0x145)]();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x429)]=function(_0x266008,_0x5b3d9b){const _0x3fce90=_0x2a2f60;_0x266008=_0x266008['toUpperCase']()[_0x3fce90(0x637)]();const _0x5771d0=VisuMZ['EventTemplates'][_0x266008];if(!_0x5771d0)return;const _0x57552f=_0x5771d0[_0x3fce90(0x264)],_0x22fc41=_0x5771d0[_0x3fce90(0x459)];if(!this[_0x3fce90(0x2d7)](_0x57552f,_0x22fc41))return;if(!_0x5b3d9b)_0x5771d0['PreMorphJS'][_0x3fce90(0x3be)](this,_0x57552f,_0x22fc41,this);this[_0x3fce90(0x452)](_0x57552f,_0x22fc41,_0x5b3d9b);if(!_0x5b3d9b)_0x5771d0[_0x3fce90(0x2ec)][_0x3fce90(0x3be)](this,_0x57552f,_0x22fc41,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x2f2)]=function(){const _0x55c2d5=_0x2a2f60;this[_0x55c2d5(0x133)]=undefined,this[_0x55c2d5(0x4b1)]=-0x2,this[_0x55c2d5(0x3d1)]();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x30e)]=function(_0x37a449){const _0x4e5d67=_0x2a2f60,_0x469315=VisuMZ[_0x4e5d67(0x193)]['Settings']['Template'],_0x1e8968=_0x37a449[_0x4e5d67(0x442)][_0x4e5d67(0x3f0)]()[_0x4e5d67(0x637)](),_0x2435ad=!['',_0x4e5d67(0x423)]['includes'](_0x1e8968);let _0xd51212=0x0,_0x31a402=0x0;if(_0x2435ad){const _0x10e66b=VisuMZ['EventTemplates'][_0x1e8968];if(!_0x10e66b)return;_0xd51212=_0x10e66b[_0x4e5d67(0x264)],_0x31a402=_0x10e66b[_0x4e5d67(0x459)];}else _0x4e5d67(0x11a)!==_0x4e5d67(0x11a)?(this[_0x4e5d67(0x2b7)]=new _0x5ec6c1(_0x18251b[_0x4e5d67(0x4b9)](_0x5244f5[_0x4e5d67(0x4d1)]/0x2),0x30),this['bitmap']['fontFace']=this[_0x4e5d67(0x585)](),this[_0x4e5d67(0x2b7)][_0x4e5d67(0x53b)]=this[_0x4e5d67(0x53b)](),this[_0x4e5d67(0x2b7)][_0x4e5d67(0x276)]=_0x4968a2[_0x4e5d67(0x276)]()):(_0xd51212=_0x37a449['mapId'],_0x31a402=_0x37a449[_0x4e5d67(0x206)]);if(!this[_0x4e5d67(0x2d7)](_0xd51212,_0x31a402))return;if(_0x2435ad){if(_0x4e5d67(0x3b7)!==_0x4e5d67(0x3b7)){const _0x320a6e=_0x3786c5[_0x4e5d67(0x5bf)][_0x120ca6];_0x320a6e&&(_0x6adb7a['mapId']=_0x320a6e['MapID'],_0x234aab['eventId']=_0x320a6e[_0x4e5d67(0x459)]);}else{const _0x2bdb21=VisuMZ['EventTemplates'][_0x1e8968];_0x2bdb21[_0x4e5d67(0x3f4)][_0x4e5d67(0x3be)](this,_0xd51212,_0x31a402,this);}}_0x469315['PreSpawnJS']['call'](this,_0xd51212,_0x31a402,this),this['_eventSpawnData']=_0x37a449,this[_0x4e5d67(0x4b1)]=-0x2,this['_mapId']=$gameMap[_0x4e5d67(0x2a4)](),this[_0x4e5d67(0x4e6)]=_0x37a449[_0x4e5d67(0x577)],this[_0x4e5d67(0x3db)]=_0x37a449[_0x4e5d67(0x617)],this[_0x4e5d67(0x478)](_0x37a449['x'],_0x37a449['y']),this[_0x4e5d67(0x47d)](_0x37a449[_0x4e5d67(0x562)]),this[_0x4e5d67(0x3d1)]();if(_0x2435ad){const _0x4ccb18=VisuMZ[_0x4e5d67(0x5bf)][_0x1e8968];if(!_0x4ccb18)return;_0x4ccb18[_0x4e5d67(0x42a)][_0x4e5d67(0x3be)](this,_0xd51212,_0x31a402,this);}_0x469315[_0x4e5d67(0x42a)][_0x4e5d67(0x3be)](this,_0xd51212,_0x31a402,this);const _0x1b7e60=SceneManager[_0x4e5d67(0x263)];if(_0x1b7e60&&_0x1b7e60[_0x4e5d67(0x388)])_0x1b7e60[_0x4e5d67(0x388)]['createSpawnedEvent'](this);},Game_Event['prototype'][_0x2a2f60(0x5f4)]=function(){const _0x55bdf8=_0x2a2f60;return!!this[_0x55bdf8(0x591)];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x375)]=function(){const _0x3f7d29=_0x2a2f60;if(!this[_0x3f7d29(0x364)]())return;const _0x41ca79=this[_0x3f7d29(0x364)]()[_0x3f7d29(0x628)](_0x3fcf25=>_0x3fcf25['code']!==0x6c&&_0x3fcf25[_0x3f7d29(0x58b)]!==0x198);if(_0x41ca79[_0x3f7d29(0x5ca)]>0x1){if(_0x3f7d29(0x48e)!=='msDEI')this[_0x3f7d29(0x33a)]=!![],this[_0x3f7d29(0x20b)]([0x0,0x1,0x2])&&this[_0x3f7d29(0x4cf)]();else{let _0xe6a4c8=_0x1f3568(_0x4eff7b['$1'])[_0x3f7d29(0x637)]();this[_0x3f7d29(0x62e)][_0x3f7d29(0x45f)]=_0xe6a4c8,this[_0x3f7d29(0x62e)]['originalText']=_0xe6a4c8;}}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x200)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x194)],Game_Event[_0x2a2f60(0x354)]['clearPageSettings']=function(){const _0x5a17ec=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x5a17ec(0x200)][_0x5a17ec(0x3be)](this),this['initEventsMoveCoreEffects'](),this['autosaveEventLocation']();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2b4)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x132)],Game_Event['prototype'][_0x2a2f60(0x132)]=function(){const _0x42d79d=_0x2a2f60;this[_0x42d79d(0x4f2)]=!![],VisuMZ['EventsMoveCore'][_0x42d79d(0x2b4)][_0x42d79d(0x3be)](this),this[_0x42d79d(0x3a1)](),this[_0x42d79d(0x5b5)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event['prototype']['setupEventsMoveCoreEffects']=function(){const _0x310dde=_0x2a2f60;if(!this[_0x310dde(0x5a5)]())return;this[_0x310dde(0x1a4)](),this[_0x310dde(0x2db)](),this['setupEventsMoveCoreCommentTags'](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0x2a2f60(0x354)]['setupEventsMoveCoreNotetags']=function(){const _0x4bc29b=_0x2a2f60,_0x14acce=this[_0x4bc29b(0x5a5)]()[_0x4bc29b(0x45c)];if(_0x14acce==='')return;this[_0x4bc29b(0x13f)](_0x14acce);},Game_Event[_0x2a2f60(0x354)]['setupEventsMoveCoreCommentTags']=function(){const _0x44b3e5=_0x2a2f60;if(!this[_0x44b3e5(0x2e5)]())return;const _0x35bccb=this[_0x44b3e5(0x364)]();let _0x432187='';for(const _0xdd587a of _0x35bccb){if([0x6c,0x198][_0x44b3e5(0x117)](_0xdd587a['code'])){if(_0x432187!=='')_0x432187+='\x0a';_0x432187+=_0xdd587a[_0x44b3e5(0x3da)][0x0];}}this[_0x44b3e5(0x13f)](_0x432187);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1a4)]=function(){const _0x243ed9=_0x2a2f60,_0x46fd2b=VisuMZ['EventsMoveCore'][_0x243ed9(0x430)];this[_0x243ed9(0x509)]={'type':_0x243ed9(0x5ea),'distance':0x0,'regionList':[]},this[_0x243ed9(0x5e7)]=![],this[_0x243ed9(0x366)](),this[_0x243ed9(0x24e)]=![],this[_0x243ed9(0x334)]=![],this[_0x243ed9(0x18b)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},$gameSystem[_0x243ed9(0x25d)](this),this[_0x243ed9(0x12d)]=$gameSystem[_0x243ed9(0x5e3)](this),this[_0x243ed9(0x62e)]={'originalText':'','text':'','visibleRange':_0x46fd2b[_0x243ed9(0x395)]['VisibleRange'],'offsetX':_0x46fd2b[_0x243ed9(0x395)][_0x243ed9(0x2cf)],'offsetY':_0x46fd2b['Label'][_0x243ed9(0x320)],'hueShift':0x0},this[_0x243ed9(0x56f)]=![],this[_0x243ed9(0x486)]=[],this['_moveSynch']={'target':-0x1,'type':_0x243ed9(0x300),'delay':0x1,'opacityDelta':0x0},this[_0x243ed9(0x469)]=_0x46fd2b[_0x243ed9(0x5ec)]['RandomMoveWeight']??0x0,this[_0x243ed9(0x62a)]=![],this[_0x243ed9(0x613)]=0x1,this[_0x243ed9(0x43c)]=0x1,this['_shadowGraphic']={'visible':!![],'filename':_0x46fd2b[_0x243ed9(0x5ec)][_0x243ed9(0x337)]},this[_0x243ed9(0x5ac)](),this['clearStepPattern']();},Game_Event['prototype'][_0x2a2f60(0x13f)]=function(_0x515bd2){const _0x5f0629=_0x2a2f60;if(_0x515bd2[_0x5f0629(0x148)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('hhYHu'===_0x5f0629(0x52a))return _0x58fae4[_0x5f0629(0x559)](),!![];else this['_activationProximity'][_0x5f0629(0x1f4)]=JSON['parse']('['+RegExp['$1'][_0x5f0629(0x148)](/\d+/g)+']'),this[_0x5f0629(0x509)][_0x5f0629(0x4aa)]=_0x5f0629(0x5b8);}else _0x515bd2[_0x5f0629(0x148)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x5f0629(0x10f)]()[_0x5f0629(0x637)](),this[_0x5f0629(0x509)][_0x5f0629(0x4aa)]=type,this[_0x5f0629(0x509)][_0x5f0629(0x277)]=Number(RegExp['$2']));if(_0x515bd2[_0x5f0629(0x148)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)){if('nCKpW'===_0x5f0629(0x48a))for(const _0xe94639 of _0x21bc29['events']()){_0xe94639[_0x5f0629(0x3d1)](),_0xe94639['updateEventLabelText']();}else this['_attachPicture'][_0x5f0629(0x5e2)]=String(RegExp['$1']);}if(_0x515bd2[_0x5f0629(0x148)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if(_0x5f0629(0x640)!==_0x5f0629(0x449)){const _0x59bbba=String(RegExp['$1'])[_0x5f0629(0x3f0)]()['trim'](),_0x4250a6=[_0x5f0629(0x4bd),_0x5f0629(0x1b2),_0x5f0629(0x448),_0x5f0629(0x3a0)];this[_0x5f0629(0x183)][_0x5f0629(0x258)]=_0x4250a6[_0x5f0629(0x5bb)](_0x59bbba)[_0x5f0629(0x45a)](0x0,0x3);}else return this[_0x5f0629(0x23a)]();}_0x515bd2['match'](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this['_attachPicture'][_0x5f0629(0x353)]=Number(RegExp['$1']));_0x515bd2[_0x5f0629(0x148)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x5f0629(0x172)]=Number(RegExp['$1']));_0x515bd2[_0x5f0629(0x148)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5f0629(0x183)][_0x5f0629(0x293)]=Number(RegExp['$1']));_0x515bd2['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5f0629(0x22b)!==_0x5f0629(0x54e)?(this[_0x5f0629(0x183)][_0x5f0629(0x172)]=Number(RegExp['$1']),this[_0x5f0629(0x183)]['offsetY']=Number(RegExp['$2'])):_0x50c2c5[_0x5f0629(0x135)](_0x3d547e[_0x598597]));_0x515bd2[_0x5f0629(0x148)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x5f0629(0x183)][_0x5f0629(0x51d)]=Number(RegExp['$1'])*0.01);_0x515bd2[_0x5f0629(0x148)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x5f0629(0x5e7)]=!![]);_0x515bd2['match'](/<CLICK TRIGGER>/i)&&(this[_0x5f0629(0x24e)]=!![]);_0x515bd2[_0x5f0629(0x148)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x5f0629(0x334)]=Number(RegExp['$1'])||0x0);const _0x1e415c=_0x515bd2['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x1e415c)for(const _0x43f7fa of _0x1e415c){if(_0x5f0629(0x385)!==_0x5f0629(0x55f)){if(_0x43f7fa['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x5f0629(0x3e6)===_0x5f0629(0x3e6)){const _0x5dd3f8=String(RegExp['$1'])['toLowerCase']()[_0x5f0629(0x637)](),_0x360fbc=Number(RegExp['$2']);this[_0x5f0629(0x18b)][_0x5dd3f8]=_0x360fbc;}else{const _0x4dc3e0=this[_0x5f0629(0x2e4)](_0x167967),_0x3ad58c=this[_0x5f0629(0x1d6)](_0x160db0);}}}else return this[_0x5f0629(0x62e)][_0x5f0629(0x45f)];}_0x515bd2[_0x5f0629(0x148)](/<ICON:[ ](\d+)>/i)&&(_0x5f0629(0x4c0)===_0x5f0629(0x64e)?this[_0x5f0629(0x41e)]():this[_0x5f0629(0x12d)][_0x5f0629(0x318)]=Number(RegExp['$1']));if(_0x515bd2[_0x5f0629(0x148)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if('GayFZ'===_0x5f0629(0x485))this[_0x5f0629(0x12d)][_0x5f0629(0x49c)]=Number(RegExp['$1']);else{if(!this['needsAttachPictureUpdate']())return;const _0x4df982=this[_0x5f0629(0x645)][_0x5f0629(0x184)]();this['_lastAttachPictureFilename']=_0x4df982[_0x5f0629(0x5e2)],this['_lastAttachPictureMaxSize']=_0x4df982[_0x5f0629(0x353)],this[_0x5f0629(0x11d)]=_0x4df982['scale'];if(_0x4df982[_0x5f0629(0x5e2)]!==''){const _0x2cdc00=_0x1e6ead['loadPicture'](_0x4df982[_0x5f0629(0x5e2)]);_0x2cdc00['addLoadListener'](this[_0x5f0629(0x3bc)]['bind'](this,_0x2cdc00));}else this['_attachPictureSprite'][_0x5f0629(0x2b7)]=new _0x2c984c(0x1,0x1);}}_0x515bd2['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(_0x5f0629(0x272)===_0x5f0629(0x272)?this[_0x5f0629(0x12d)]['bufferY']=Number(RegExp['$1']):this['executeCommandCommonEvent'](_0xe5ed5d));_0x515bd2[_0x5f0629(0x148)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5f0629(0x12d)][_0x5f0629(0x49c)]=Number(RegExp['$1']),this[_0x5f0629(0x12d)]['bufferY']=Number(RegExp['$2']));if(_0x515bd2[_0x5f0629(0x148)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x86634d=String(RegExp['$1'])[_0x5f0629(0x3f0)]()['trim'](),_0x3cd23b=[_0x5f0629(0x4bd),_0x5f0629(0x1b2),_0x5f0629(0x448),_0x5f0629(0x3a0)];this[_0x5f0629(0x12d)][_0x5f0629(0x258)]=_0x3cd23b[_0x5f0629(0x5bb)](_0x86634d)['clamp'](0x0,0x3);}$gameSystem['setEventIconData'](this,this[_0x5f0629(0x12d)][_0x5f0629(0x318)],this['_eventIcon'][_0x5f0629(0x49c)],this[_0x5f0629(0x12d)][_0x5f0629(0x10e)],this[_0x5f0629(0x12d)][_0x5f0629(0x258)]);if(_0x515bd2[_0x5f0629(0x148)](/<LABEL:[ ](.*?)>/i)){let _0x211b32=String(RegExp['$1'])[_0x5f0629(0x637)]();this[_0x5f0629(0x62e)][_0x5f0629(0x45f)]=_0x211b32,this[_0x5f0629(0x62e)][_0x5f0629(0x594)]=_0x211b32;}if(_0x515bd2[_0x5f0629(0x148)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x292077=String(RegExp['$1'])[_0x5f0629(0x637)]();this[_0x5f0629(0x62e)][_0x5f0629(0x45f)]=_0x292077,this[_0x5f0629(0x62e)][_0x5f0629(0x594)]=_0x292077;}_0x515bd2[_0x5f0629(0x148)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5f0629(0x62e)][_0x5f0629(0x172)]=Number(RegExp['$1']));_0x515bd2[_0x5f0629(0x148)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(_0x5f0629(0x427)==='nqIlb'?this[_0x5f0629(0x62e)][_0x5f0629(0x293)]=Number(RegExp['$1']):_0x3772c3[_0x5f0629(0x1b5)]());_0x515bd2[_0x5f0629(0x148)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5f0629(0x62e)][_0x5f0629(0x172)]=Number(RegExp['$1']),this[_0x5f0629(0x62e)][_0x5f0629(0x293)]=Number(RegExp['$2']));_0x515bd2[_0x5f0629(0x148)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x5f0629(0x62e)]['hueShift']=Number(RegExp['$1']));this['updateEventLabelText']();if(_0x515bd2[_0x5f0629(0x148)](/<LABEL RANGE:[ ](\d+)>/i)){if(_0x5f0629(0x2a6)===_0x5f0629(0x373)){if(this[_0x5f0629(0x548)]()){const _0x39019c=['',_0x5f0629(0x2c4),_0x5f0629(0x49e),_0x5f0629(0x596),_0x5f0629(0x490),_0x5f0629(0x1b4),'SWEAT',_0x5f0629(0x1ca),'SILENCE',_0x5f0629(0x157),_0x5f0629(0x207),'','','','',''][_0x556904];this[_0x5f0629(0x60e)](_0x39019c,_0x110713);}}else this[_0x5f0629(0x62e)][_0x5f0629(0x322)]=Number(RegExp['$1']);}_0x515bd2[_0x5f0629(0x148)](/<MIRROR SPRITE>/i)&&(this[_0x5f0629(0x56f)]=!![]);if(_0x515bd2[_0x5f0629(0x148)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if('shimP'===_0x5f0629(0x273))_0x2293d4['EventsMoveCore'][_0x5f0629(0x554)]['call'](this),this[_0x5f0629(0x57f)]();else{const _0xa5cf72=JSON['parse']('['+RegExp['$1'][_0x5f0629(0x148)](/\d+/g)+']');this[_0x5f0629(0x486)]=this[_0x5f0629(0x486)][_0x5f0629(0x3df)](_0xa5cf72),this[_0x5f0629(0x486)][_0x5f0629(0x5b1)](0x0);}}if(_0x515bd2[_0x5f0629(0x148)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x5f0629(0x626)!==_0x5f0629(0x12f)){const _0xd33a45=String(RegExp['$1']);if(_0xd33a45[_0x5f0629(0x148)](/PLAYER/i))this[_0x5f0629(0x2ee)][_0x5f0629(0x296)]=0x0;else _0xd33a45[_0x5f0629(0x148)](/EVENT[ ](\d+)/i)&&(this['_moveSynch'][_0x5f0629(0x296)]=Number(RegExp['$1']));}else _0x3be83a=_0xe9c6ff['makeDeepCopy'](_0x470fd0),_0x291c51['EventsMoveCore'][_0x5f0629(0x56a)][_0x5f0629(0x3be)](this,_0x3328d0);}_0x515bd2[_0x5f0629(0x148)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(_0x5f0629(0x327)!==_0x5f0629(0x327)?(this['_waitMode']='',this[_0x5f0629(0x3c2)]()):this[_0x5f0629(0x2ee)][_0x5f0629(0x4aa)]=String(RegExp['$1'])[_0x5f0629(0x10f)]()[_0x5f0629(0x637)]());_0x515bd2[_0x5f0629(0x148)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(_0x5f0629(0x122)!==_0x5f0629(0x122)?this[_0x5f0629(0x472)](_0x138c17):this[_0x5f0629(0x2ee)][_0x5f0629(0x52b)]=Number(RegExp['$1']));_0x515bd2['match'](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x5f0629(0x2ee)][_0x5f0629(0x42b)]=Number(RegExp['$1']));if(_0x515bd2[_0x5f0629(0x148)](/<TRUE RANDOM MOVE>/i)){if(_0x5f0629(0x4f1)===_0x5f0629(0x357)){_0x387fac['registerSelfTarget'](this);const _0x1d5e4d=_0x1d8588[_0x5f0629(0x193)][_0x5f0629(0x19f)][_0x5f0629(0x3be)](this,_0x18c6fd);return _0x34e692[_0x5f0629(0x17f)](),_0x1d5e4d;}else this[_0x5f0629(0x469)]=0x0;}else _0x515bd2[_0x5f0629(0x148)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x5f0629(0x469)]=Number(RegExp['$1'])||0x0);_0x515bd2[_0x5f0629(0x148)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&('oTisP'!==_0x5f0629(0x558)?this[_0x5f0629(0x62a)]=!![]:_0x3ba53a[_0x5f0629(0x43f)]());_0x515bd2[_0x5f0629(0x148)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x5f0629(0x613)]=Number(RegExp['$1'])*0.01);_0x515bd2[_0x5f0629(0x148)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x5f0629(0x43c)]=Number(RegExp['$1'])*0.01);if(_0x515bd2[_0x5f0629(0x148)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x463eb8=Number(RegExp['$1'])*0.01;this[_0x5f0629(0x613)]=_0x463eb8,this['_scaleBaseY']=_0x463eb8;}if(_0x515bd2[_0x5f0629(0x148)](/<HIDE SHADOW>/i)){if(_0x5f0629(0x4fd)!==_0x5f0629(0x3b8))this[_0x5f0629(0x5a6)][_0x5f0629(0x41d)]=![];else{const _0xbb714e=_0x4288ac(_0x4810b5['$1']),_0x5cb227=this[_0x5f0629(0x4ec)](_0x54f0cb);return this[_0x5f0629(0x214)](_0xbb714e,_0x5cb227);}}if(_0x515bd2[_0x5f0629(0x148)](/<SHADOW FILENAME:[ ](.*?)>/i)){if(_0x5f0629(0x1aa)==='pqMPQ')this[_0x5f0629(0x5a6)][_0x5f0629(0x5e2)]=String(RegExp['$1']);else return _0x505500===_0x12f378['mapId']()?_0x4a323c[_0x5f0629(0x218)][_0x5452b3]:_0x4a9d83[_0x5f0629(0x446)][_0x46af4a]['events'][_0x3d1444];}if(_0x515bd2[_0x5f0629(0x148)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x5f0629(0x42f)===_0x5f0629(0x1bf))return![];else this[_0x5f0629(0x512)]=Number(RegExp['$1']);}_0x515bd2[_0x5f0629(0x148)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5f0629(0x1c7)]=Number(RegExp['$1']));if(_0x515bd2[_0x5f0629(0x148)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5f0629(0x1d8)!==_0x5f0629(0x38b))this[_0x5f0629(0x512)]=Number(RegExp['$1']),this[_0x5f0629(0x1c7)]=Number(RegExp['$2']);else return''[_0x5f0629(0x3f0)]()[_0x5f0629(0x637)]();}_0x515bd2[_0x5f0629(0x148)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x5f0629(0x5d8)]=String(RegExp['$1'])['toUpperCase']()[_0x5f0629(0x637)]());},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x31a)]=function(){const _0x4ffc22=_0x2a2f60;$gameTemp[_0x4ffc22(0x496)](this),this[_0x4ffc22(0x62e)][_0x4ffc22(0x45f)]=this[_0x4ffc22(0x62e)][_0x4ffc22(0x594)];for(;;){if(this['_labelWindow'][_0x4ffc22(0x45f)][_0x4ffc22(0x148)](/\\V\[(\d+)\]/gi)){if(_0x4ffc22(0x27d)!==_0x4ffc22(0x2c8))this[_0x4ffc22(0x62e)][_0x4ffc22(0x45f)]=this[_0x4ffc22(0x62e)][_0x4ffc22(0x594)]['replace'](/\\V\[(\d+)\]/gi,(_0x46ee66,_0x498883)=>$gameVariables[_0x4ffc22(0x50f)](parseInt(_0x498883)));else return this['_addedHitbox']?this[_0x4ffc22(0x4b4)](_0x158708,_0x46d226):_0x23948c[_0x4ffc22(0x354)][_0x4ffc22(0x59d)][_0x4ffc22(0x3be)](this,_0x24eab8,_0x48be32);}else break;}$gameTemp['clearSelfTarget']();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x319)]=function(){const _0x1b6035=_0x2a2f60;this[_0x1b6035(0x2bb)]();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x634)]=function(){const _0x161d01=_0x2a2f60;if(this[_0x161d01(0x5e7)])return!![];return Game_Character['prototype'][_0x161d01(0x634)][_0x161d01(0x3be)](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x49d)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x555)],Game_Event['prototype']['updateSelfMovement']=function(){const _0x33fdc7=_0x2a2f60;if(this['isPreventSelfMovement']())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement']['call'](this);if(this[_0x33fdc7(0x4af)]()){if(_0x33fdc7(0x31c)!=='HfmTV')VisuMZ[_0x33fdc7(0x49f)](this[_0x33fdc7(0x4e6)]);else{if(this[_0x33fdc7(0x5a5)]()[_0x33fdc7(0x45c)][_0x33fdc7(0x148)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}}},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x3bd)]=function(){const _0x18af33=_0x2a2f60,_0x3c5578=VisuMZ[_0x18af33(0x193)][_0x18af33(0x430)]['Movement'];if($gameMap[_0x18af33(0x251)]()&&_0x3c5578['StopAutoMoveEvents'])return!![];if($gameMessage[_0x18af33(0x2a9)]()&&_0x3c5578[_0x18af33(0x3c7)])return!![];if(!$gameSystem[_0x18af33(0x396)]())return!![];if(this[_0x18af33(0x51a)]()>=0x0)return!![];if(!SceneManager['_scene'][_0x18af33(0x4b0)])return!![];return![];},Game_Event[_0x2a2f60(0x354)]['updateShadowChanges']=function(){const _0x10d005=_0x2a2f60,_0x59da3d=SceneManager[_0x10d005(0x263)][_0x10d005(0x388)];if(_0x59da3d){const _0x464ee6=_0x59da3d[_0x10d005(0x13a)](this);_0x464ee6&&_0x464ee6['_shadowSprite']&&_0x464ee6[_0x10d005(0x192)]['_filename']!==this[_0x10d005(0x2ad)]()&&(_0x464ee6[_0x10d005(0x192)]['_filename']=this[_0x10d005(0x2ad)](),_0x464ee6['_shadowSprite']['bitmap']=ImageManager['loadSystem'](_0x464ee6[_0x10d005(0x192)]['_filename']));}},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x2ad)]=function(){const _0x1c5bc3=_0x2a2f60;return this[_0x1c5bc3(0x5a6)][_0x1c5bc3(0x5e2)];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x44d)]=function(){const _0x352e7f=_0x2a2f60;if(!this[_0x352e7f(0x5a6)][_0x352e7f(0x41d)])return![];return Game_CharacterBase[_0x352e7f(0x354)][_0x352e7f(0x44d)]['call'](this);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x15d)]=function(){const _0x1314f9=_0x2a2f60;return this['_labelWindow'][_0x1314f9(0x45f)];},Game_Event['prototype'][_0x2a2f60(0x4be)]=function(){const _0x352919=_0x2a2f60;return this[_0x352919(0x62e)]['visibleRange'];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x590)]=function(_0x2b5761,_0x4cddc4,_0x3d16de){const _0x2e6091=_0x2a2f60;if(this[_0x2e6091(0x1a8)]())return this['isMoveOnlyRegionPassable'](_0x2b5761,_0x4cddc4,_0x3d16de);if($gameMap['isRegionAllowPass'](_0x2b5761,_0x4cddc4,_0x3d16de,_0x2e6091(0x5a5)))return!![];if($gameMap[_0x2e6091(0x5ba)](_0x2b5761,_0x4cddc4,_0x3d16de,_0x2e6091(0x5a5)))return![];return Game_Character['prototype']['isMapPassable'][_0x2e6091(0x3be)](this,_0x2b5761,_0x4cddc4,_0x3d16de);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1a8)]=function(){const _0x47473d=_0x2a2f60;if(this[_0x47473d(0x486)]===undefined)this[_0x47473d(0x1a4)]();return this[_0x47473d(0x486)]['length']>0x0;},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x3cc)]=function(_0xd368c3,_0x2508db,_0x259694){const _0x8baff1=_0x2a2f60,_0x313814=$gameMap['roundXWithDirection'](_0xd368c3,_0x259694),_0x350ad7=$gameMap[_0x8baff1(0x3e2)](_0x2508db,_0x259694),_0x51d713=$gameMap[_0x8baff1(0x40a)](_0x313814,_0x350ad7);return this[_0x8baff1(0x486)][_0x8baff1(0x117)](_0x51d713);},VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex']=Game_Event[_0x2a2f60(0x354)]['findProperPageIndex'],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1a5)]=function(){const _0x4692e5=_0x2a2f60;if(this['event']()&&!$gameTemp[_0x4692e5(0x1a9)]()){if(this['event']()[_0x4692e5(0x45c)]['match'](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x4692e5(0x49a)]=![],this['_CPCs']=![],this[_0x4692e5(0x5a5)]()?VisuMZ[_0x4692e5(0x193)]['Game_Event_findProperPageIndex']['call'](this):-0x1;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x21e)]=Game_Event[_0x2a2f60(0x354)]['meetsConditions'],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x187)]=function(_0x46950e){const _0x369562=_0x2a2f60;this[_0x369562(0x5f6)](_0x46950e),$gameTemp[_0x369562(0x496)](this);const _0x268190=VisuMZ['EventsMoveCore'][_0x369562(0x21e)][_0x369562(0x3be)](this,_0x46950e);return $gameTemp[_0x369562(0x17f)](),_0x268190;},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x3dc)]=function(){const _0x11fa45=_0x2a2f60;return this[_0x11fa45(0x49a)];},Game_Event[_0x2a2f60(0x354)]['checkAdvancedSwitchVariablePresent']=function(_0x4b30ff){const _0x356338=_0x2a2f60,_0x59d5d0=_0x4b30ff[_0x356338(0x580)];if(_0x59d5d0[_0x356338(0x2eb)]&&DataManager[_0x356338(0x17b)](_0x59d5d0['switch1Id']))this['_advancedSwitchVariable']=!![];else{if(_0x59d5d0['switch2Valid']&&DataManager[_0x356338(0x17b)](_0x59d5d0[_0x356338(0x4d3)]))this[_0x356338(0x49a)]=!![];else{if(_0x59d5d0['variableValid']&&DataManager[_0x356338(0x40c)](_0x59d5d0[_0x356338(0x27b)])){if('IrRxR'!=='IrRxR')return this[_0x356338(0x1b1)]();else this['_advancedSwitchVariable']=!![];}}}},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1b0)]=function(){const _0x243511=_0x2a2f60;if(this[_0x243511(0x35a)])return![];return this[_0x243511(0x24e)];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x559)]=function(){const _0x5330a2=_0x2a2f60;$gameTemp[_0x5330a2(0x1b5)](),this[_0x5330a2(0x375)]();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x59d)]=function(_0x38c73f,_0x2ea99c){const _0x40cbe8=_0x2a2f60;return this[_0x40cbe8(0x18b)]?this[_0x40cbe8(0x4b4)](_0x38c73f,_0x2ea99c):Game_Character[_0x40cbe8(0x354)][_0x40cbe8(0x59d)][_0x40cbe8(0x3be)](this,_0x38c73f,_0x2ea99c);},Game_Event[_0x2a2f60(0x354)]['posEventsMoveCore']=function(_0x5b2185,_0x551b5b){const _0x26b38b=_0x2a2f60;var _0x208917=this['x']-this[_0x26b38b(0x18b)]['left'],_0x5d5355=this['x']+this['_addedHitbox'][_0x26b38b(0x208)],_0x546455=this['y']-this[_0x26b38b(0x18b)]['up'],_0x10a2ce=this['y']+this[_0x26b38b(0x18b)][_0x26b38b(0x64d)];return _0x208917<=_0x5b2185&&_0x5b2185<=_0x5d5355&&_0x546455<=_0x551b5b&&_0x551b5b<=_0x10a2ce;},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x4a5)]=function(_0x523f9d,_0x521be3,_0x6256ae){const _0x874a8b=_0x2a2f60;for(let _0x481337=-this[_0x874a8b(0x18b)]['left'];_0x481337<=this['_addedHitbox'][_0x874a8b(0x208)];_0x481337++){for(let _0x4bec26=-this[_0x874a8b(0x18b)]['up'];_0x4bec26<=this['_addedHitbox']['down'];_0x4bec26++){if(!Game_Character['prototype'][_0x874a8b(0x4a5)][_0x874a8b(0x3be)](this,_0x523f9d+_0x481337,_0x521be3+_0x4bec26,_0x6256ae))return![];}}return!![];},Game_Event['prototype']['isCollidedWithEvents']=function(_0x1cbdf6,_0x27cbd1){const _0xb44f7=_0x2a2f60;if(Imported[_0xb44f7(0x3fa)]&&this['isSmartEventCollisionOn']()){if(_0xb44f7(0x247)!==_0xb44f7(0x247)){if(this[_0xb44f7(0x1a8)]())return this[_0xb44f7(0x3cc)](_0x278a89,_0x9c35f2,_0x15c333);if(_0x3bffa5[_0xb44f7(0x170)](_0x43b843,_0x593781,_0xc6eab7,'event'))return!![];if(_0x41d7a1[_0xb44f7(0x5ba)](_0x227521,_0x46b794,_0x974e64,'event'))return![];return _0x249fb5[_0xb44f7(0x354)]['isMapPassable'][_0xb44f7(0x3be)](this,_0x2312ae,_0x58be23,_0x1ffbeb);}else return this[_0xb44f7(0x468)](_0x1cbdf6,_0x27cbd1);}else{const _0x2fab8d=$gameMap[_0xb44f7(0x2af)](_0x1cbdf6,_0x27cbd1)[_0xb44f7(0x628)](_0x5708cb=>_0x5708cb!==this);return _0x2fab8d[_0xb44f7(0x5ca)]>0x0;}},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x468)]=function(_0x327dc3,_0x383da3){const _0x1b86cd=_0x2a2f60;if(!this[_0x1b86cd(0x46a)]())return![];else{if(_0x1b86cd(0x510)!=='CKIlt'){const _0x354e3f=$gameMap[_0x1b86cd(0x2af)](_0x327dc3,_0x383da3)['filter'](_0x193162=>_0x193162!==this&&_0x193162[_0x1b86cd(0x46a)]());return _0x354e3f[_0x1b86cd(0x5ca)]>0x0;}else{const _0x3a113e=this[_0x1b86cd(0x127)];_0x3a113e[_0x1b86cd(0x2b7)]=_0x577d36;const _0x2e9b0a=this['_character']['attachPictureSettings'](),_0x557f1d=_0x2e9b0a[_0x1b86cd(0x353)],_0x166478=_0x2e9b0a['scale'];let _0x247044=0x1;if(_0x557f1d>0x0){let _0xcb1bca=this[_0x1b86cd(0x362)]()||0x1,_0x6f3aed=this[_0x1b86cd(0x43d)]()||0x1;const _0x230d56=_0x2f05d3[_0x1b86cd(0x431)](0x1,_0xcb1bca,_0x6f3aed);_0x247044=_0x557f1d/_0x230d56;}_0x247044*=_0x166478,_0x247044!==0x1&&(this[_0x1b86cd(0x127)]['bitmap'][_0x1b86cd(0x340)]=!![]),_0x3a113e['scale']['x']=_0x247044,_0x3a113e[_0x1b86cd(0x51d)]['y']=_0x247044,this[_0x1b86cd(0x41d)]=!![],this['updateAttachPictureBitmap']();}}},Game_Event['prototype'][_0x2a2f60(0x3aa)]=function(){const _0x5442ad=_0x2a2f60;return this['_activationProximity']['type']||_0x5442ad(0x5ea);},Game_Event[_0x2a2f60(0x354)]['activationProximityDistance']=function(){const _0x1b586d=_0x2a2f60;return this[_0x1b586d(0x509)][_0x1b586d(0x277)]||0x0;},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x10d)]=function(){const _0x4b4852=_0x2a2f60;return this['_activationProximity'][_0x4b4852(0x1f4)]||[];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x20a)]=function(){const _0x46ec77=_0x2a2f60;Game_Character[_0x46ec77(0x354)][_0x46ec77(0x20a)]['call'](this);if([_0x46ec77(0x5ea),'region']['includes'](this[_0x46ec77(0x3aa)]()))return;$gamePlayer[_0x46ec77(0x49b)]([0x2]);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x53c)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x279)],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x279)]=function(){const _0x77001e=_0x2a2f60;if(this[_0x77001e(0x10c)]!==0x3)return;if(this[_0x77001e(0x4f2)])return;if(!this[_0x77001e(0x22f)](![]))return;if(!this[_0x77001e(0x5da)](![]))return;VisuMZ[_0x77001e(0x193)][_0x77001e(0x53c)][_0x77001e(0x3be)](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2ea)]=Game_Event['prototype'][_0x2a2f60(0x3cf)],Game_Event['prototype']['updateParallel']=function(){const _0x3e4810=_0x2a2f60;if(!this['_interpreter'])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x3e4810(0x5da)](!![]))return;VisuMZ['EventsMoveCore'][_0x3e4810(0x2ea)][_0x3e4810(0x3be)](this);},Game_Event[_0x2a2f60(0x354)]['checkRegionEventTrigger']=function(_0x1fe9b6){const _0x48a0b0=_0x2a2f60;if(!_0x1fe9b6&&$gameMap[_0x48a0b0(0x251)]())return![];if(!_0x1fe9b6&&$gameMap[_0x48a0b0(0x5f9)]())return![];if(this[_0x48a0b0(0x10d)]()<=0x0)return!![];return $gamePlayer[_0x48a0b0(0x1f0)](this);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x5da)]=function(_0x53ef65){const _0x5e084e=_0x2a2f60;if(!_0x53ef65&&$gameMap['isEventRunning']())return![];if(!_0x53ef65&&$gameMap[_0x5e084e(0x5f9)]())return![];if(['none',_0x5e084e(0x5b8)][_0x5e084e(0x117)](this['activationProximityType']()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},VisuMZ[_0x2a2f60(0x49f)]=function(_0xc16cf3){const _0x3e9efc=_0x2a2f60;for(const _0x566eb4 of $gameMap[_0x3e9efc(0x218)]()){if(!_0x566eb4)continue;if(_0x566eb4[_0x3e9efc(0x51a)]()===_0xc16cf3){if('htpCT'==='jjrrE')return _0x3118d6[_0x3e9efc(0x5e3)](this)?_0x2f316c[_0x3e9efc(0x354)][_0x3e9efc(0x5e3)][_0x3e9efc(0x3be)](this):{'iconIndex':0x0,'bufferX':_0x3a45a0[_0x3e9efc(0x5d0)]['BufferX'],'bufferY':_0x438a61[_0x3e9efc(0x5d0)][_0x3e9efc(0x151)],'blendMode':_0x64c20b[_0x3e9efc(0x5d0)][_0x3e9efc(0x2df)]};else _0x566eb4[_0x3e9efc(0x165)]();}}},VisuMZ[_0x2a2f60(0x4cb)]=function(_0x36fb5a){if(_0x36fb5a===0x0)return $gamePlayer;return $gameMap['event'](_0x36fb5a);},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x28c)]=function(){},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x28c)]=function(){const _0x1c0470=_0x2a2f60;VisuMZ[_0x1c0470(0x2d3)](this[_0x1c0470(0x4e6)]);},VisuMZ['FaceSynchAllSynchTargets']=function(_0x138a4d){const _0x3f26e8=_0x2a2f60;for(const _0x332a40 of $gameMap[_0x3f26e8(0x218)]()){if(!_0x332a40)continue;_0x332a40['moveSynchTarget']()===_0x138a4d&&_0x332a40[_0x3f26e8(0x111)]();}},Game_Event['prototype']['moveSynchTarget']=function(){const _0x5514e9=_0x2a2f60;return this['_moveSynch'][_0x5514e9(0x296)];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x3fb)]=function(){const _0x2ce000=_0x2a2f60;return this[_0x2ce000(0x2ee)][_0x2ce000(0x4aa)];},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x4f9)]=function(){const _0x32a710=_0x2a2f60;if(this[_0x32a710(0x51a)]()>=0x0){const _0x50bab7=VisuMZ[_0x32a710(0x4cb)](this[_0x32a710(0x51a)]());if(_0x50bab7)return _0x50bab7[_0x32a710(0x4f9)]();}return Game_Character['prototype'][_0x32a710(0x4f9)][_0x32a710(0x3be)](this);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x165)]=function(){const _0x48e4b1=_0x2a2f60;this[_0x48e4b1(0x2ee)][_0x48e4b1(0x400)]=this['_moveSynch']['timer']||0x0,this[_0x48e4b1(0x2ee)]['timer']--;if(this[_0x48e4b1(0x2ee)][_0x48e4b1(0x400)]>0x0)return;this[_0x48e4b1(0x2ee)][_0x48e4b1(0x400)]=this[_0x48e4b1(0x2ee)][_0x48e4b1(0x52b)],this[_0x48e4b1(0x4c6)]();},Game_Event['prototype']['adjustMoveSynchOpacityDelta']=function(_0x557e25){const _0x37dc31=_0x2a2f60;if(this[_0x37dc31(0x51a)]()>=0x0){const _0x52765a=VisuMZ[_0x37dc31(0x4cb)](this[_0x37dc31(0x51a)]());if(_0x52765a){if('yOXCY'===_0x37dc31(0x51f)){const _0x32ad03=$gameMap[_0x37dc31(0x277)](this[_0x37dc31(0x63b)],this['_realY'],_0x52765a[_0x37dc31(0x63b)],_0x52765a['_realY'])-0x1,_0x28ce2b=Math[_0x37dc31(0x15a)]($gameMap['tileWidth'](),$gameMap[_0x37dc31(0x513)]()),_0x577895=this[_0x37dc31(0x2ee)][_0x37dc31(0x42b)]||0x0;_0x557e25-=Math[_0x37dc31(0x431)](0x0,_0x32ad03)*_0x28ce2b*_0x577895;}else this[_0x37dc31(0x183)][_0x37dc31(0x51d)]=_0xb2b175(_0x4e8769['$1'])*0.01;}}return _0x557e25;},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x4c6)]=function(){const _0x530db5=_0x2a2f60;switch(this[_0x530db5(0x3fb)]()){case _0x530db5(0x300):this[_0x530db5(0x240)]();break;case _0x530db5(0x515):this['processMoveSynchApproach']();break;case'away':this[_0x530db5(0x470)]();break;case'custom':this[_0x530db5(0x17e)]();break;case _0x530db5(0x3d7):case _0x530db5(0x255):this[_0x530db5(0x4c9)]();break;case _0x530db5(0x390):case _0x530db5(0x1c3):this[_0x530db5(0x19b)]();break;case'mirror\x20horizontal':case _0x530db5(0x30f):case _0x530db5(0x4b3):case _0x530db5(0x476):this[_0x530db5(0x518)]();break;case'mirror\x20vertical':case _0x530db5(0x120):case _0x530db5(0x257):case _0x530db5(0x32f):this[_0x530db5(0x10b)]();break;default:this[_0x530db5(0x240)]();break;}this[_0x530db5(0x481)]();},Game_Event['prototype'][_0x2a2f60(0x240)]=function(){const _0x2fe5f0=_0x2a2f60,_0x22230f=[0x2,0x4,0x6,0x8];$gameMap[_0x2fe5f0(0x549)]()&&_0x22230f[_0x2fe5f0(0x245)](0x1,0x3,0x7,0x9);const _0x144ca5=[];for(const _0x278e80 of _0x22230f){if(this[_0x2fe5f0(0x4a5)](this['x'],this['y'],_0x278e80))_0x144ca5[_0x2fe5f0(0x245)](_0x278e80);}if(_0x144ca5[_0x2fe5f0(0x5ca)]>0x0){if('fPDYx'!==_0x2fe5f0(0x1b8)){if(_0x55930c)this[_0x2fe5f0(0x5e4)](_0x22fb27['x'],_0x5a0459['y']);}else{const _0x5631be=_0x144ca5[Math['randomInt'](_0x144ca5[_0x2fe5f0(0x5ca)])];this[_0x2fe5f0(0x4e7)](_0x5631be);}}},Game_Event[_0x2a2f60(0x354)]['processMoveSynchApproach']=function(){const _0x2571e2=_0x2a2f60,_0x9b11f2=VisuMZ[_0x2571e2(0x4cb)](this[_0x2571e2(0x51a)]());this[_0x2571e2(0x2b8)](_0x9b11f2);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x470)]=function(){const _0x1ef684=_0x2a2f60,_0x372b5d=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x1ef684(0x5df)](_0x372b5d);},Game_Event['prototype'][_0x2a2f60(0x17e)]=function(){this['updateRoutineMove']();},Game_Event['prototype'][_0x2a2f60(0x4c9)]=function(){const _0xebb00b=_0x2a2f60,_0x1e6c91=VisuMZ[_0xebb00b(0x4cb)](this[_0xebb00b(0x51a)]());this['executeMoveDir8'](_0x1e6c91[_0xebb00b(0x499)]());},Game_Event[_0x2a2f60(0x354)]['processMoveSynchReverseMimic']=function(){const _0x1816c3=_0x2a2f60,_0x4a3b58=VisuMZ[_0x1816c3(0x4cb)](this[_0x1816c3(0x51a)]());this[_0x1816c3(0x4e7)](this[_0x1816c3(0x3ad)](_0x4a3b58['lastMovedDirection']()));},Game_Event[_0x2a2f60(0x354)]['processMoveSynchMirrorHorz']=function(){const _0x3250f7=_0x2a2f60,_0x113d31=VisuMZ[_0x3250f7(0x4cb)](this[_0x3250f7(0x51a)]()),_0xb7d4fd=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x113d31['lastMovedDirection']()];this[_0x3250f7(0x4e7)](_0xb7d4fd);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x10b)]=function(){const _0x3452a1=_0x2a2f60,_0x566625=VisuMZ[_0x3452a1(0x4cb)](this['moveSynchTarget']()),_0x2e8542=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x566625[_0x3452a1(0x499)]()];this[_0x3452a1(0x4e7)](_0x2e8542);},Game_Event['prototype']['processMoveSynchDirection']=function(){const _0x10a712=_0x2a2f60,_0x2a8497=VisuMZ[_0x10a712(0x4cb)](this[_0x10a712(0x51a)]()),_0x15f27a=_0x2a8497['direction']();switch(this[_0x10a712(0x3fb)]()){case _0x10a712(0x3d7):case _0x10a712(0x255):this['setDirection'](_0x15f27a);break;case _0x10a712(0x390):case _0x10a712(0x1c3):this[_0x10a712(0x47d)](this[_0x10a712(0x3ad)](_0x15f27a));break;case _0x10a712(0x268):case _0x10a712(0x30f):case _0x10a712(0x4b3):case _0x10a712(0x476):this[_0x10a712(0x47d)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x15f27a]);break;case'mirror\x20vertical':case _0x10a712(0x120):case _0x10a712(0x257):case'vert\x20mirror':this[_0x10a712(0x47d)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x15f27a]);break;default:return;}this[_0x10a712(0x481)]();},Game_Event[_0x2a2f60(0x354)]['restoreSavedEventPosition']=function(){const _0x2c4835=_0x2a2f60,_0x55709b=$gameSystem[_0x2c4835(0x60f)](this);if(!_0x55709b)return;this[_0x2c4835(0x4c7)](_0x55709b['x'],_0x55709b['y']),this[_0x2c4835(0x4ae)](),this['setDirection'](_0x55709b[_0x2c4835(0x562)]),this['_pageIndex']===_0x55709b[_0x2c4835(0x4f4)]&&(this[_0x2c4835(0x227)]=_0x55709b[_0x2c4835(0x27e)]);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x199)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x481)],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x481)]=function(){const _0x325021=_0x2a2f60;VisuMZ['EventsMoveCore']['Game_Event_update'][_0x325021(0x3be)](this),!Utils[_0x325021(0x56c)]()&&this['updateSaveEventLocation']();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x493)]=function(){const _0x3f8d9b=_0x2a2f60;Game_Character['prototype'][_0x3f8d9b(0x493)]['call'](this),this['autosaveEventLocation']();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x283)]=function(){const _0x3a4a26=_0x2a2f60;if($gameMap[_0x3a4a26(0x4b6)]())return!![];return this['_saveEventLocation'];},Game_Event['prototype']['autosaveEventLocation']=function(){const _0x5e9b02=_0x2a2f60;if(!this[_0x5e9b02(0x283)]())return;this['saveEventLocation']();},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x100)]=function(){const _0x33a7ec=_0x2a2f60;this[_0x33a7ec(0x35d)]=!![];},Game_Event[_0x2a2f60(0x354)]['updateSaveEventLocation']=function(){const _0x2dedc8=_0x2a2f60;this[_0x2dedc8(0x35d)]&&(_0x2dedc8(0x1b3)!=='kZIWb'?(this[_0x2dedc8(0x5c2)]=new _0x445bf5(),this[_0x2dedc8(0x113)]()):this[_0x2dedc8(0x1c2)]());},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1c2)]=function(){const _0x1cedf0=_0x2a2f60;this['_requestSaveEventLocation']=![],$gameSystem[_0x1cedf0(0x100)](this);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x29f)]=function(){const _0x46b0cb=_0x2a2f60;$gameSystem[_0x46b0cb(0x314)](this);},Game_Event['prototype'][_0x2a2f60(0x5e3)]=function(){const _0x5e2d7d=_0x2a2f60;return $gameSystem[_0x5e2d7d(0x5e3)](this)?Game_Character[_0x5e2d7d(0x354)][_0x5e2d7d(0x5e3)][_0x5e2d7d(0x3be)](this):{'iconIndex':0x0,'bufferX':settings[_0x5e2d7d(0x5d0)]['BufferX'],'bufferY':settings[_0x5e2d7d(0x5d0)]['BufferY'],'blendMode':settings[_0x5e2d7d(0x5d0)]['BlendMode']};},Game_Event[_0x2a2f60(0x354)]['hasCPCs']=function(){const _0x7e55c7=_0x2a2f60;return this[_0x7e55c7(0x333)];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x410)]=Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x187)],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x187)]=function(_0x34d638){const _0x501ffc=_0x2a2f60,_0x110e2e=VisuMZ['EventsMoveCore'][_0x501ffc(0x410)][_0x501ffc(0x3be)](this,_0x34d638);if(!_0x110e2e)return![];return this[_0x501ffc(0x1a3)](_0x34d638);},Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x1a3)]=function(_0x415132){const _0x59ab58=_0x2a2f60;VisuMZ[_0x59ab58(0x193)]['CustomPageConditions'][_0x59ab58(0x1f2)](_0x415132),this['_CPCs']=_0x415132[_0x59ab58(0x460)][_0x59ab58(0x5ca)]>0x0;_0x415132[_0x59ab58(0x460)]===undefined&&VisuMZ[_0x59ab58(0x193)][_0x59ab58(0x2e3)][_0x59ab58(0x1f2)](_0x415132);if(_0x415132[_0x59ab58(0x460)][_0x59ab58(0x5ca)]>0x0)return $gameMap['event'](this[_0x59ab58(0x4e6)])&&VisuMZ[_0x59ab58(0x193)][_0x59ab58(0x2e3)]['metCPC'](_0x415132[_0x59ab58(0x460)],this[_0x59ab58(0x4e6)]);return!![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x436)]=Game_Troop[_0x2a2f60(0x354)][_0x2a2f60(0x187)],Game_Troop[_0x2a2f60(0x354)][_0x2a2f60(0x187)]=function(_0x5afc80){const _0x5c77c7=_0x2a2f60;var _0xe6c76a=VisuMZ[_0x5c77c7(0x193)][_0x5c77c7(0x436)][_0x5c77c7(0x3be)](this,_0x5afc80);return _0xe6c76a&&this[_0x5c77c7(0x345)](_0x5afc80);},Game_Troop[_0x2a2f60(0x354)][_0x2a2f60(0x345)]=function(_0x1925c2){const _0x4ec7ff=_0x2a2f60;if(_0x1925c2['CPC']===undefined){if(_0x4ec7ff(0x2e6)===_0x4ec7ff(0x2e6))VisuMZ[_0x4ec7ff(0x193)][_0x4ec7ff(0x2e3)][_0x4ec7ff(0x1f2)](_0x1925c2);else for(const _0x141958 of _0x4e491c){if(_0x141958[_0x4ec7ff(0x148)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x5a246e=_0x43ea32(_0x2f46ec['$1'])[_0x4ec7ff(0x10f)]()[_0x4ec7ff(0x637)](),_0x5d8121=_0x5e9b7e(_0x1cc941['$2']);this[_0x4ec7ff(0x18b)][_0x5a246e]=_0x5d8121;}}}if(_0x1925c2[_0x4ec7ff(0x460)][_0x4ec7ff(0x5ca)]>0x0)return VisuMZ[_0x4ec7ff(0x193)][_0x4ec7ff(0x2e3)][_0x4ec7ff(0x421)](_0x1925c2[_0x4ec7ff(0x460)],0x0);return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event[_0x2a2f60(0x354)]['locate'],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x478)]=function(_0x160e89,_0x39c324){const _0x4190d9=_0x2a2f60;VisuMZ[_0x4190d9(0x193)][_0x4190d9(0x654)][_0x4190d9(0x3be)](this,_0x160e89,_0x39c324),this[_0x4190d9(0x1c8)]=_0x160e89,this[_0x4190d9(0x1e1)]=_0x39c324,this[_0x4190d9(0x5b5)]();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2dc)]=Game_Event['prototype'][_0x2a2f60(0x16e)],Game_Event[_0x2a2f60(0x354)][_0x2a2f60(0x16e)]=function(){const _0xf88d4e=_0x2a2f60,_0x55214c=$gameMap[_0xf88d4e(0x277)](this['x'],this['y'],this[_0xf88d4e(0x1c8)],this[_0xf88d4e(0x1e1)]),_0x235248=_0x55214c*(this[_0xf88d4e(0x469)]||0x0);Math['random']()>=_0x235248?VisuMZ['EventsMoveCore'][_0xf88d4e(0x2dc)][_0xf88d4e(0x3be)](this):this[_0xf88d4e(0x50c)]();},Game_Event['prototype'][_0x2a2f60(0x50c)]=function(){const _0x5c3e44=_0x2a2f60,_0x61e122=this[_0x5c3e44(0x2e4)](this[_0x5c3e44(0x1c8)]),_0x1cde6b=this[_0x5c3e44(0x1d6)](this[_0x5c3e44(0x1e1)]);if(Math[_0x5c3e44(0x61e)](_0x61e122)>Math[_0x5c3e44(0x61e)](_0x1cde6b)){if(_0x5c3e44(0x2f5)===_0x5c3e44(0x5c7)){if(this[_0x5c3e44(0x5c1)]===_0x556e88)this[_0x5c3e44(0x57f)]();if(!_0x6d332d)return null;if(_0x41f104===_0x51c8df)return this['_EventIcons'][_0x5c3e44(0x5f2)];else{const _0x3728aa=_0x3c1580[_0x5c3e44(0x193)][_0x5c3e44(0x430)],_0x1a3e10=_0x5c3e44(0x488)[_0x5c3e44(0x198)](_0x3865ed[_0x5c3e44(0x623)],_0x339035[_0x5c3e44(0x4e6)]);return this[_0x5c3e44(0x5c1)][_0x1a3e10]=this[_0x5c3e44(0x5c1)][_0x1a3e10]||{'iconIndex':0x0,'bufferX':_0x3728aa[_0x5c3e44(0x5d0)]['BufferX'],'bufferY':_0x3728aa[_0x5c3e44(0x5d0)][_0x5c3e44(0x151)],'blendMode':_0x3728aa['Icon'][_0x5c3e44(0x2df)]},this[_0x5c3e44(0x5c1)][_0x1a3e10];}}else this[_0x5c3e44(0x484)](_0x61e122>0x0?0x4:0x6),!this[_0x5c3e44(0x3ed)]()&&_0x1cde6b!==0x0&&(_0x5c3e44(0x4c8)==='QwnhG'?this['moveStraight'](_0x1cde6b>0x0?0x8:0x2):this['_advancedSwitchVariable']=!![]);}else _0x1cde6b!==0x0&&(this[_0x5c3e44(0x484)](_0x1cde6b>0x0?0x8:0x2),!this[_0x5c3e44(0x3ed)]()&&_0x61e122!==0x0&&this[_0x5c3e44(0x484)](_0x61e122>0x0?0x4:0x6));},Game_CharacterBase[_0x2a2f60(0x354)]['clearAttachPictureSettings']=function(){const _0x527934=_0x2a2f60;this[_0x527934(0x183)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase['prototype']['attachPictureSettings']=function(){const _0x303101=_0x2a2f60;if(this[_0x303101(0x183)]===undefined)this['clearAttachPictureSettings']();return this['_attachPicture'];},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x54a)]=function(){const _0xfae3e0=_0x2a2f60;return this[_0xfae3e0(0x184)]()[_0xfae3e0(0x5e2)]??'';},Game_CharacterBase[_0x2a2f60(0x354)]['attachPictureBlendMode']=function(){const _0x4715c5=_0x2a2f60;return this[_0x4715c5(0x184)]()[_0x4715c5(0x258)]??0x0;},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x376)]=function(){const _0xb7e233=_0x2a2f60;return this[_0xb7e233(0x184)]()['maxSize']??0x0;},Game_CharacterBase['prototype']['attachPictureOffsetX']=function(){const _0x51ada3=_0x2a2f60;return this[_0x51ada3(0x184)]()[_0x51ada3(0x172)]??0x0;},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x610)]=function(){const _0x32c90a=_0x2a2f60;return this[_0x32c90a(0x184)]()['offsetY']??0x0;},Game_CharacterBase[_0x2a2f60(0x354)][_0x2a2f60(0x624)]=function(){const _0x6f9149=_0x2a2f60;return this[_0x6f9149(0x184)]()[_0x6f9149(0x51d)]??0x1;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5f3)]=Game_Interpreter['prototype'][_0x2a2f60(0x3b0)],Game_Interpreter[_0x2a2f60(0x354)][_0x2a2f60(0x3b0)]=function(){const _0x33084e=_0x2a2f60;if(this[_0x33084e(0x3d0)]===_0x33084e(0x29d)){if(window[this[_0x33084e(0x61f)]])this['_waitMode']='',this[_0x33084e(0x3c2)]();else{if(_0x33084e(0x287)==='AJfEn')return!![];else{const _0x2d2f8a=_0x47c995?_0x147af0['mapId']():0x0,_0x39345b=[0x0,0x0,_0x33084e(0x498)['format'](_0x2d2f8a,_0x44f6e1)];return _0x1e9b49['value'](_0x39345b)||0x0;}}}else return VisuMZ['EventsMoveCore'][_0x33084e(0x5f3)][_0x33084e(0x3be)](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x303)]=Game_Interpreter[_0x2a2f60(0x354)][_0x2a2f60(0x1b7)],Game_Interpreter[_0x2a2f60(0x354)][_0x2a2f60(0x1b7)]=function(){const _0x456a39=_0x2a2f60,_0xf01e7a=$gameMap&&this[_0x456a39(0x4e6)]?$gameMap[_0x456a39(0x5a5)](this[_0x456a39(0x4e6)]):null;$gameTemp[_0x456a39(0x496)](_0xf01e7a);const _0x189099=VisuMZ[_0x456a39(0x193)]['Game_Interpreter_executeCommand'][_0x456a39(0x3be)](this);return $gameTemp[_0x456a39(0x17f)](),_0x189099;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2c3)]=Game_Interpreter[_0x2a2f60(0x354)]['command357'],Game_Interpreter['prototype'][_0x2a2f60(0x21b)]=function(_0x2a20cd){const _0x57084e=_0x2a2f60;return $gameTemp[_0x57084e(0x438)](this),VisuMZ[_0x57084e(0x193)]['Game_Interpreter_PluginCommand']['call'](this,_0x2a20cd);},Game_Interpreter[_0x2a2f60(0x354)][_0x2a2f60(0x602)]=function(_0x273da2){const _0x176826=_0x2a2f60;this['_callEventData']=_0x273da2;const _0x50a504=_0x176826(0x27f)[_0x176826(0x198)](_0x273da2[_0x176826(0x2a4)][_0x176826(0x25c)](0x3));this[_0x176826(0x61f)]='$callEventMap'+Graphics[_0x176826(0x196)]+'_'+this['eventId'](),DataManager['loadDataFile'](this[_0x176826(0x61f)],_0x50a504),window[this[_0x176826(0x61f)]]?this[_0x176826(0x3c2)]():this[_0x176826(0x4d5)]('CallEvent');},Game_Interpreter[_0x2a2f60(0x354)][_0x2a2f60(0x3c2)]=function(){const _0x20bbd0=_0x2a2f60,_0x3471d8=this['_callEventData'],_0x30a78e=window[this[_0x20bbd0(0x61f)]],_0x1bf040=_0x30a78e[_0x20bbd0(0x218)][_0x3471d8['eventId']];if(_0x1bf040&&_0x1bf040[_0x20bbd0(0x1a1)][_0x3471d8['pageId']-0x1]){if(_0x20bbd0(0x242)===_0x20bbd0(0x242)){const _0x3d689a=_0x1bf040[_0x20bbd0(0x1a1)][_0x3471d8[_0x20bbd0(0x3d5)]-0x1]['list'];this[_0x20bbd0(0x4a0)](_0x3d689a,this[_0x20bbd0(0x206)]());}else{const _0x16e2b0=[_0x9633fa[_0x20bbd0(0x623)],_0x5c40eb['_eventId'],_0x20bbd0(0x5b3)['format'](_0x2a12f0)];_0xbfe076[_0x20bbd0(0x104)](_0x16e2b0,_0x2e3692);}}window[this['_callEventMap']]=undefined,this[_0x20bbd0(0x61f)]=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){const _0x3044c3=_0x2a2f60;this[_0x3044c3(0x222)][_0x3044c3(0x1bc)](this,arguments);}function _0x43a7(){const _0x104311=['Visible','getPosingCharacterDirection','Game_CharacterBase_screenY','setDirection','setPlayerDiagonalSetting','attachPictureBlendMode','EventIconChange','update','LFQkK','All','moveStraight','GayFZ','_moveOnlyRegions','createProxyWindow','Map%1-Event%2','setSelfValue','Fezxo','TEUYl','omLRz','ilcFM','JhuPV','SPIN\x20ACW','HEART','zRpaZ','%1%2','updateMove','removeTemporaryMapSpawnedEvents','SelfDataResetAll','registerSelfTarget','hasStepAnime','Map\x20%1\x20Variable\x20%2','lastMovedDirection','_advancedSwitchVariable','checkEventTriggerEventsMoveCore','bufferX','Game_Event_updateSelfMovement','QUESTION','MoveAllSynchTargets','setupChild','Game_CharacterBase_hasStepAnime','Scene_Map_startEncounterEffect','Visibility','processMoveRouteStepFrom','canPass','Step2MapId','processMoveCommand','turnTowardCharacter','RGVDn','type','isOnLadder','characterPatternY','Game_Troop_meetsConditions','refreshBushDepth','isMoving','_active','_pageIndex','Step1EventId','mirror\x20horz','posEventsMoveCore','Game_Character_setMoveRoute','isSaveEventLocations','ToPhp','AAdcx','round','directionOnLadderSpriteVS8dir','TiltRight','onOk','NORMAL','labelWindowRange','name','NxhGy','characterPatternYVS8','QPjoU','%1Dock','initMembers','move','processMoveSynch','setPosition','QwnhG','processMoveSynchMimic','circle','GetMoveSynchTarget','isBoat','PreMorphJS','_chaseOff','lock','wFVcf','boxWidth','_PlayerDiagonalSetting','switch2Id','tclxG','setWaitMode','MobileEnabled','requestBalloon','AdvancedVariables','jcOSN','GuRJD','_eventCache','NUulV','getPlayerDiagonalSetting','_reflection','SlowerSpeed','checkNeedForPeriodicRefresh','mapValue','setHue','Window_Message_startMessage','_EventsMoveCoreSettings','WalkForbid','_eventId','executeMoveDir8','dwKMB','Game_Map_refresh','MessageCore','isEventsMoveCoreInvisible','checkCollisionKeywords','IconSize','_followerControlID','sqrt','_needsRefresh','garmq','_activationProximityAutoTriggerBypass','LRaPC','pageIndex','USER-DEFINED\x205','VS8','PETqH','getControlledFollowerID','realMoveSpeed','createSpawnedEvent','Hidden','getDiagonalDestination','tAptO','vJNGg','_characterName','tadQp','JtAHE','FollowerReset','EventAllow','setBalloonPose','Game_CharacterBase_moveDiagonally','SwitchId','savePreservedMorphEventDataKey','Scene_Load_onLoadSuccess','_activationProximity','WuYmo','TemplateName','moveBackToRandomHome','HURT','jump','value','SnbTJ','_MapSpawnedEventData','_spriteOffsetX','tileHeight','_forceHideFollower','approach','rZRPN','eadfD','processMoveSynchMirrorHorz','isValid','moveSynchTarget','dEtLv','shift','scale','Speed','yOXCY','Spriteset_Map_createShadow','RegionOkTarget','CVMlw','Game_Event_findProperPageIndex','MjkFH','_isObjectCharacter','Window_ScrollText_startMessage','rXFDR','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_labelWindows','JtIPW','delay','Minutes','Pyyru','ptMkJ','Window_NumberInput_processOk','processDrawIcon','createDisplayObjects','updateShadow','FihGp','backX','_target','_paused','VisuMZ_1_MessageCore','ApNNV','Game_Vehicle_initMoveSpeed','processMoveRouteAnimation','fontSize','Game_Event_checkEventTriggerAuto','OpacitySpeed','isActive','setEventIconDataKey','isLandOk','absDistance','shadowX','erase','1688AYsega','EventAutoMovement','processMoveRouteHugWall','left','isSpriteVS8dir','isSupportDiagonalMovement','attachPictureFilename','setImage','Game_CharacterBase_increaseSteps','processMoveRouteFadeIn','vQCFC','timXq','Game_Character_processMoveCommand','cUtwn','switches','HMCSa','Game_Timer_initialize','updateSelfMovement','AdvancedSwitches','ROUTE_SCRIPT','mABll','onClickTrigger','kWkOt','MUSIC-NOTE','advancedFunc','UxkDh','_scaleY','xOyos','TerrainTags','Sprite_Character_setTileBitmap','direction','registerSelfEvent','OrHQC','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','Game_CharacterBase_bushDepth','WalkAllow','jyyVU','split','Game_Character_forceMoveRoute','SelfSwitchABCD','isMobileDevice','NUM','_lastAttachPictureMaxSize','_mirrorSprite','parse','YLxMN','gMRZj','updateEventsAndMovementCore','VICTORY','_visibleEventX','makeDeepCopy','spawnEventId','MOBILE_EVENT_LABELS','isRunning','hPUuT','isPassable','turnLeft90','uxNJx','MUSIC','initEventsMoveCore','conditions','BoatSpeed','_counter','TuhKH','getPosingCharacterPattern','fontFace','snVYh','iconHeight','WyPxz','createLabelWindowForTarget','Wuwhr','code','PreloadMaps','EvhVK','1576812odswwn','roundY','isMapPassable','_eventSpawnData','processMoveRouteFadeOut','chaseCharacter','originalText','Name','MUSIC\x20NOTE','convertVariableValuesInScriptCall','_cacheSystemVisible','posNt','_poseDuration','_saveEventLocations','getLastPluginCommandInterpreter','pos','TerrainTag','switchId','EventLocationCreate','screenX','setup','initFollowerController','QmMHf','event','_shadowGraphic','Letter','ShowShadows','_eventErased','Sprite_Character_characterPatternY','_pattern','clearSpriteOffsets','getPose','TVxGg','Game_CharacterBase_updatePattern','RIGHT\x20TO\x20LEFT','remove','isRegionDockable','Self\x20Variable\x20%1','ZkdOc','autosaveEventLocation','UotyL','_forceDashing','region','_spawnedEvents','isRegionForbidPass','indexOf','PlayerMovementChange','isAirshipPassable','Toggle','EventTemplates','_visibleEventY','_EventIcons','_interpreter','charAt','default','Game_Player_isMapPassable','ADkfA','BPPpe','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','MUSICNOTE','length','ifMvC','isShip','eVwgS','resizeWindow','height','Icon','KpAod','isEventTest','deleteIconsOnEventsDataKey','_lastMapId','isDashingAndMoving','Chase','_data','_stepPattern','processMoveRouteSelfVariable','checkActivationProximity','dashSpeedModifier','innerWidth','ykFYE','activationProximityDistance','moveAwayFromCharacter','_forceShowPlayer','refreshIfNeeded','filename','getEventIconData','turnAwayFromPoint','Game_Interpreter_character','QNNrk','_alwaysUpdateMove','Game_CharacterBase_direction','_lastPluginCommandInterpreter','none','addChild','Movement','bCvGy','determineEventOverload','Region%1','Game_CharacterBase_screenX','frontX','Player','Game_Interpreter_updateWaitMode','isSpawnedEvent','resume','checkAdvancedSwitchVariablePresent','CnqHo','Game_CharacterBase_canPass','isAnyEventStarting','Game_Map_parallelCommonEvents','mibpn','startMapCommonEventOnOK','executeCommandCommonEvent','slbPK','moveTowardPoint','startsWith','21159ZWQEML','pluginCommandCallEvent','_proxyWindow','Game_Timer_start','isCollidedWithEvents','resetSelfSwitchesForMap','70cDxyMJ','isAirship','Game_Message_setNumberInput','KARpE','xBHss','setPlayerControlDisable','createSpawnedEventWithData','setPose','getSavedEventLocation','attachPictureOffsetY','pow','_commonEvents','_scaleBaseX','SelfVariables','RIGHT','Game_Event_isCollidedWithPlayerCharacters','spawnPreserved','PlayerMovementDiagonal','SpawnEventAtXY','MurTn','EventTimerFramesGain','Game_CharacterBase_pattern','_duration','abs','_callEventMap','setControlledFollowerID','Setting','LYltc','_mapId','attachPictureScale','FALSE','geadJ','width','filter','_screenZoomScale','_saveEventLocation','createShadow','version','PRyzP','_labelWindow','FollowerSetGlobalChase','PreCopyJS','YFAcl','lSGbZ','setupPlayerVisibilityOverrides','isNearTheScreen','loadDataFile','useCarryPoseForIcons','trim','meetActivationProximityConditions','createLowerLayer','Game_System_initialize','_realX','BQdmL','LOWER\x20LEFT','isInVehicle','processMoveRouteStepTo','FhGyU','_comments','ZArfe','grdHI','updateOpacity','_character','_needsPeriodicRefresh','createAttachPictureSprite','getMapSpawnedEventData','scrolledY','Window_EventItem_onOk','getPreservedMorphEventData','hasDragonbones','down','BksME','Region','Allow','baplT','processMoveRouteBalloon','UGgmN','Game_Event_locate','jumpAll','drawTextEx','BULB','_moveSpeed','saveEventLocation','checkEventTriggerThere','STR','_eventOverloadThreshold','setValue','spriteId','XnfwJ','_opacity','PosX','Game_CharacterBase_setDirection','isWorking','processMoveSynchMirrorVert','_trigger','activationRegionList','bufferY','toLowerCase','hbgSy','processMoveSynchDirection','_periodicRefreshTimer','determineCommonEventsWithCPC','variables','QSyKW','setMoveRoute','includes','fDwHc','processMoveRouteTeleportToCharacter','emcmU','updateVisibility','kVrGL','_lastAttachPictureScale','processMoveRouteMoveRepeat','gainFrames','vertical\x20mirror','setCommonEvent','dkCxK','KTTqJ','SuccessSwitchId','Forbid','createShadows','_attachPictureSprite','Game_Switches_value','MoveRouteIndex','rqrgh','removeChild','setNumberInput','_eventIcon','Button','wjNgP','setMapValue','row','setupPageSettings','_eventMorphData','createContents','reserveCommonEvent','followers','Scene_Map_createDisplayObjects','UPPER\x20LEFT','textSizeEx','findTargetSprite','SLEEP','splice','setFrame','return\x20%1','checkEventsMoveCoreStringTags','stop','Self\x20Switch\x20%1','BalloonOffsetY','Game_CharacterBase_initMembers','onDatabaseLoaded','clearEventCache','eWHAX','processMoveRouteJumpToCharacter','match','Ruumv','MapSwitches','updateEventMirrorSprite','bushDepth','LIGHTBULB','contents','createSaveEventLocationData','RemovePreserve','BufferY','LEFT','zlFiW','isTile','xtdck','updateEventIconSprite','LIGHT\x20BULB','FontSize','log','min','ARRAYJSON','_eventLabelOffsetY','labelWindowText','_SavedEventLocations','_cpc','setupAttachPictureBitmap','canPassDiagonally','IJdrO','SdFcy','updatePeriodicRefresh','updateMoveSynch','eventsXy','_tilemap','advancedValue','ALLOW_LADDER_DASH','SelfSwitches','updateAttachPictureSprite','isDashDisabled','zhDli','moveTypeRandom','radius','isRegionAllowPass','turnRight90','offsetX','disable','_commonEventId','xubAc','DAssB','processMoveRouteJumpTo','_encounterEffectDuration','updatePosition','_moveAllowPlayerCollision','isAdvancedSwitch','setupSpawnedEvents','parallelCommonEvents','processMoveSynchCustom','clearSelfTarget','DEFAULT_SHIFT_Y','Scene_Boot_onDatabaseLoaded','hueShift','_attachPicture','attachPictureSettings','Game_Follower_chaseCharacter','hlxKg','meetsConditions','getDirectionFromPoint','YbHwZ','Game_CharacterBase_update','_addedHitbox','3ZxNmOR','MapVariables','setAllowEventAutoMovement','setDestination','SpawnEventDespawnRegions','despawnRegions','_shadowSprite','EventsMoveCore','clearPageSettings','Game_CommonEvent_isActive','frameCount','CarryPose','format','Game_Event_update','setupDiagonalSupport','processMoveSynchReverseMimic','isEventOverloaded','setMoveSpeed','PkNDn','Game_Enemy_meetsSwitchCondition','3644168HWailV','pages','Game_Vehicle_isLandOk','meetsCPC','initEventsMoveCoreEffects','findProperPageIndex','roundX','processMoveCommandEventsMoveCore','hasMoveOnlyRegions','isPlaytest','pqMPQ','setDiagonalDirection','MapId','PzOFF','hasEventIcon','ccAiH','hasClickTrigger','characterPatternYBasic','ADDITIVE','kZIWb','ANGER','clearDestination','setFrames','executeCommand','fPDYx','FVHKY','isAllowCharacterTilt','Step1MapId','apply','GbLeS','_selfTarget','KTkWx','stFxF','YRvnr','processSaveEventLocation','reverse\x20copy','initMembersEventsMoveCore','updateHueShift','itemPadding','_spriteOffsetY','_randomHomeX','WzlvE','COBWEB','EventTimerExpireEvent','IconIndex','_diagonalSupport','isCollidedWithPlayerCharacters','ICjXa','bHZbY','Sprite_Character_initMembers','setPattern','isPlayerForceHidden','_frames','updateText','deltaYFrom','isBigCharacter','ikGjj','forceDashing','drawText','pause','Game_CharacterBase_moveStraight','ARRAYSTRUCT','AMyqG','_forceShowFollower','ITEM','_randomHomeY','despawnTerrainTags','forceMoveRoute','string','General','shadowY','referEvent','OlLlT','getInputDir8','lastSpawnedEvent','clearStepPattern','BVCWc','setItemChoice','isTargetEventValidForLabelWindow','_DisablePlayerControl','meetActivationRegionConditions','TRUE','loadCPC','eNWyN','regionList','BitmapSmoothing','NrZTx','Game_SelfSwitches_setValue','moveDiagonally','setEventLabelsVisible','hideShadows','Game_Map_events','createCharacterShadow','CpKzJ','kRuOa','restoreSavedEventPosition','Game_Event_clearPageSettings','isEventClickTriggered','iPuEp','_eventScreenX','Game_Variables_value','Game_Temp_setDestination','eventId','ZZZ','right','findDiagonalDirectionTo','increaseSteps','isTriggerIn','Vehicle','standing','_actuallyMoving','eraseEvent','Map\x20%1\x20Switch\x20%2','Enable','PosY','Game_Followers_isVisible','processMoveRouteMoveUntilStop','_visiblePlayerY','Value','gRxQD','events','Game_Switches_setValue','_eventCopyData','command357','rZAkS','JSON','Game_Event_meetsConditions','JowxX','Dock','_eventIconSprite','initialize','Frames','BoxZq','aXbTS','_eventLabelOffsetX','_moveRouteIndex','resetSelfSwitchesForEvent','setupMorphEvent','isPlayerForceShown','YSSPF','updateStop','Sprite_Character_setCharacterBitmap','_stopCount','checkRegionEventTrigger','SILENCE','constructor','destinationX','jELLJ','SWEAT','deleteSavedEventLocationKey','USER-DEFINED\x203','Game_Timer_onExpire','isLongPressed','FollowerSetControl','getPosingCharacterIndex','startMapCommonEventOnTouch','turnTowardPoint','_lastAttachPictureFilename','315430TByRaa','defaultFontSize','processMoveSynchRandom','cwY','SfwXd','Preserve','ARRAYNUM','push','PostCopyJS','iJCtX','eventLabelsVisible','setStopFollowerChasing','FfcBP','_type','EJJqN','Game_Variables_setValue','_clickTrigger','floor','omQvE','isEventRunning','LineHeight','AutoBalloon','_hidden','copy','slice','mirror\x20vert','blendMode','drawIcon','TqNUD','return\x200','padZero','deleteIconsOnEventsData','_forceCarrying','odITB','isSelfSwitch','Game_Player_increaseSteps','Hpxnu','_scene','MapID','List','qkWoU','_characterSprites','mirror\x20horizontal','UBNoD','Direction','DashingEnable','roundXWithDirection','_pose','checkExistingEntitiesAt','sAVec','NOTE','IvqXM','hMZOl','YLCKO','FastForwardKey','AutoBuffer','outlineColor','distance','randomInt','checkEventTriggerAuto','OFF','variableId','_regionRules','tRLBN','moveRouteIndex','Map%1.json','clearPose','add','lineHeight','isSaveEventLocation','fDycW','PlayerIconChange','EventId','AJfEn','despawnEverything','clear','_patternLocked','adjustDir8MovementSpeed','updateMoveSynchDirection','status','5pJujRw','oPwzg','needsUpdate','setMovementSuccess','TargetSwitchId','offsetY','attachPictureOffsetX','updateAttachPictureBitmap','target','airship','EVAL','JWFIE','hLmPz','Game_Event_initialize','Sprite_Character_update','CallEvent','eyulE','deleteEventLocation','2248676fKlOCA','setupRegionRestrictions','contentsOpacity','executeMove','mapId','prepareSpawnedEventAtTerrainTag','Evara','oIwaY','getDirectionToPoint','isBusy','_spawnData','WfAlj','AirshipSpeed','shadowFilename','startEncounterEffect','eventsXyNt','TOGGLE','bqujK','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','PRUKs','Game_Event_setupPageSettings','Game_Player_getInputDirection','cwX','bitmap','moveTowardCharacter','isTransparent','qDraC','updateShadowChanges','Sprite_Balloon_updatePosition','Game_Timer_stop','Game_Vehicle_isMapPassable','HZQgw','isDestinationValid','qKEQs','zoomScale','Game_Interpreter_PluginCommand','EXCLAMATION','createBitmap','ShiftY','_speed','bxxfl','delta','ZfYJy','updateBitmapSmoothing','OperateValues','_filename','_seconds','OffsetX','registerCommand','follower','LIGHT-BULB','FaceSynchAllSynchTargets','IconBufferX','SPIN\x20COUNTERCLOCKWISE','Walk','checkValidEventerMap','_text','processOk','updateTilt','setupEventsMoveCoreNotetags','Game_Event_moveTypeRandom','characterIndex','gGfVI','BlendMode','gHZJt','VpbHI','processMoveRouteMoveToCharacter','CustomPageConditions','deltaXFrom','page','GQTdT','Epbcb','_eventOverload','Game_Player_isDashing','Game_Event_updateParallel','switch1Valid','PostMorphJS','mainFontSize','_moveSynch','execute','StrictCollision','padding','removeMorph','EnableDashTilt','IPrdY','STwhj','EventTimerFramesSet','xvytL','createLabelWindows','EventLabelVisible','LBoCN','FSkdm','refreshEventLabels','setupSaveEventLocations','Game_Map_unlockEvent','ConvertParams','random','bzuys','map','Game_Interpreter_executeCommand','updateScaleBase','jpXEo','loadPicture','lwBzk','bind','clearDashing','QLJib','needsAttachPictureUpdate','isTurnInPlace','isLabelVisible','setupSpawn','horizontal\x20mirror','getInputDirection','addLoadListener','qOXhG','setTileBitmap','deleteSavedEventLocation','adjustMoveSynchOpacityDelta','cePcc','square','iconIndex','updateEventsMoveCoreTagChanges','updateEventLabelText','reverse','Jyiaf','characterName','VehicleDock','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','OffsetY','isPassableByAnyDirection','visibleRange','opacity','Game_Map_setup','ccwX','FavorHorz','AgjTi','isOnRope','Game_Player_checkEventTriggerThere','findDirectionTo','kvwqf','isMapVariable','fLoLf','updateEventCustomZ','vert\x20mirror','SelfVariableID','ALARE','Step2EventId','_CPCs','_customZ','EUNrD','wjNVk','DefaultShadow','vwNSl','EventLabelRefresh','_starting','iQJrI','isAutoBufferIcon','setCharacterBitmap','isJumping','_scaleX','smooth','moveByInput','CfpnM','SzscN','isPosing','CPCsMet','setupSpawnTest','waGmh','fPERf','...','PlayerAllow','iconWidth','turnAwayFromCharacter','egoiN','Game_CharacterBase_characterIndex','meetsSwitchCondition','isDashing','ARRAYEVAL','AllAllow','maxSize','prototype','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','quWzG','isPressed','areFollowersForceHidden','_erased','Game_Map_event','unlock','_requestSaveEventLocation','rzHWD','backY','player','correctFacingDirection','getAttachPictureBitmapWidth','isDashingEnabled','list','hasCPCs','clearAttachPictureSettings','_followerChaseOff','anchor','processMoveRouteTeleportTo','Spriteset_Map_createLowerLayer','onCancel','PageId','create','%1,%2,','isShadowShrink','Rope','despawnEventId','_cacheVisibility','fvNtL','processMoveRouteSetIndex','start','attachPictureMaxSize','firstSpawnedEventID','_selfTargetNumberInput','Game_CharacterBase_isTransparent','dir8','LEFT\x20TO\x20RIGHT','setChaseOff','VIXgB','DOWN','isVisible','processMoveRouteMoveTo','_expireCommonEvent','krbUo','EventIconDelete','AutoMoveEvents','kOvIl','updatePose','gOoMw','_spriteset','KNxTs','setOpacity','AimAJ','isSpawnHitboxCollisionOk','Window_NumberInput_start','isPlayerControlDisabled','DIAGONAL_PATHFINDING_EVENT_LIMIT','reverse\x20mimic','HMPH','canMove','KNEEL','clearCarrying','Label','isAllowEventAutoMovement','setupCopyEvent','character','UPPER\x20RIGHT','VisibleEventLabels','MgOBz','keys','PlayerForbid','replace','VariableId','SCREEN','setupEventsMoveCoreEffects','VKzTc','gDyAw','iconSize','LSYkM','isStopFollowerChasing','kQlNn','VehicleAllow','_event','activationProximityType','onExpire','isMapSwitch','reverseDir','moveForward','PlayerIconDelete','updateWaitMode','isObjectCharacter','Game_Message_add','2163390giabGy','_visiblePlayerX','processMoveRouteJumpForward','gRtrf','qADen','exAaV','setEventIconData','BalloonOffsetX','wJIhq','onLoadAttachPicture','isPreventSelfMovement','call','pattern','FRUSTRATION','ltSCv','startCallEvent','xxYkw','turn180','trigger','description','StopAutoMoveMessages','boat','of\x20Preloaded\x20Maps.\x0a\x0a','EventLocationDelete','ftPUi','isMoveOnlyRegionPassable','blt','Sprite_Balloon_setup','updateParallel','_waitMode','refresh','loadSystem','yUyZt','some','pageId','processMoveRouteSelfSwitch','mimic','_characterIndex','aGbwc','parameters','_spawnPreserved','hasAdvancedSwitchVariable','areFollowersForceShown','Tpkfj','concat','selfValue','initMoveSpeed','roundYWithDirection','createIconSprite','Game_Message_setItemChoice','updateScale','WuuPk','Game_Event_start','Passability','VisuMZ_Setup_Preload_Map','bMYLa','6693106JnVkFw','opacitySpeed','isMovementSucceeded','process_VisuMZ_EventsMoveCore_Switches_Variables','despawnAtXY','toUpperCase','ARRAYSTR','RhYWN','getEventIconIndex','PreSpawnJS','IconBufferY','EXzvX','changeSpeed','resetExitSelfSwitches','TiltVert','VisuMZ_0_CoreEngine','moveSynchType','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','_eventPageIndex','unlockEvent','rotation','timer','SpawnEventDespawnTerrainTags','Game_Player_checkEventTriggerHere','exit','hgDcc','resetFontSettings','ShipSpeed','_PreservedEventMorphData','DashOnLadder','moveAwayFromPoint','regionId','SwitchGetSelfSwitchABCD','isAdvancedVariable','updatePattern','prepareSpawnedEventAtXY','SpawnEventAtTerrainTag','Game_Event_meetsConditionsCPC','UHwiZ','screenY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','uUsKd','forceCarrying','convertSelfVariableValuesInScriptCall','requestMapLoadCommonEvents','_eventScreenY','TyfWm','isSelfVariable','EnableDir8','_forceHidePlayer','visible','setupFollowerVisibilityOverrides','characterIndexVS8','SelfSwitchID','metCPC','ztcdu','UNTITLED','VisuMZ_2_DragonbonesUnion','MorphEventTo','$preloadedMap_%1','nqIlb','jBSoL','morphIntoTemplate','PostSpawnJS','opacityDelta','prepareSpawnedEventAtRegion','setDashingEnabled','processMoveRoutePatternLock','qoeyJ','Settings','max','QInFl','Hours','Game_Map_isDashDisabled','Game_Followers_jumpAll','Game_Troop_meetsConditionsCPC','_working','setLastPluginCommandInterpreter','Template','ship','command108','_scaleBaseY','getAttachPictureBitmapHeight','SPIN\x20CLOCKWISE','requestRefresh','startMessage','_moveRoute','template','terrainTag','LOVE','Game_Follower_initialize','PreloadedMaps','Game_Event_event','MULTIPLY','SHgHc','drawing','isDiagonalDirection','%1Forbid','isShadowVisible','SpriteBased','Collision','ANNOYED','isSceneMap','morphInto','Game_CharacterBase_isDashing','_selfTargetItemChoice','IconBlendMode','Game_SelfSwitches_value','BufferX','vehicle','EventID','clamp','Airship','note','updateVS8BalloonOffsets','updatePatternEventsMoveCore','text','CPC','isBattleTest','Game_Map_update','_lastMovedDirection','tsnjK','TiltLeft','firstSpawnedEvent','initEventsMoveCoreSettings','checkSmartEventCollision','_randomMoveWeight','isNormalPriority','_inputTime','processMoveRouteStepToCharacter','Disable','COLLAPSE','windowPadding','processMoveSynchAway','MwYMB','autoEventIconBuffer','startMapCommonEventOnOKTarget','getSelfTarget','fittingHeight','horz\x20mirror','wfHVI','locate','mryVo'];_0x43a7=function(){return _0x104311;};return _0x43a7();};Game_CPCInterpreter[_0x2a2f60(0x354)]=Object['create'](Game_Interpreter[_0x2a2f60(0x354)]),Game_CPCInterpreter['prototype']['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x2a2f60(0x354)][_0x2a2f60(0x289)]=function(){const _0xdb858f=_0x2a2f60;Game_Interpreter[_0xdb858f(0x354)][_0xdb858f(0x289)]['call'](this),this[_0xdb858f(0x15f)]=![];},Game_CPCInterpreter[_0x2a2f60(0x354)][_0x2a2f60(0x2ef)]=function(){const _0x36b691=_0x2a2f60;while(this[_0x36b691(0x579)]()){this['executeCommand']();}},Game_CPCInterpreter[_0x2a2f60(0x354)]['executeCommonEvent']=function(_0x20ad43){const _0x13e3a7=_0x2a2f60;while(this[_0x13e3a7(0x579)]()){if(_0x13e3a7(0x62d)!=='hFJHe')this['executeCommandCommonEvent'](_0x20ad43);else return _0x3a900d[_0x13e3a7(0x193)][_0x13e3a7(0x204)]['call'](this,_0x47e90e);}},Game_CPCInterpreter['prototype'][_0x2a2f60(0x5fd)]=function(_0x39b8c3){const _0x4ab237=_0x2a2f60,_0x5d3cc5=_0x39b8c3;$gameTemp[_0x4ab237(0x496)](_0x5d3cc5);const _0xc17bfa=VisuMZ[_0x4ab237(0x193)][_0x4ab237(0x303)][_0x4ab237(0x3be)](this);return $gameTemp[_0x4ab237(0x17f)](),_0xc17bfa;},Game_CPCInterpreter[_0x2a2f60(0x354)][_0x2a2f60(0x43b)]=function(_0x1c2333){const _0x414986=_0x2a2f60;return Game_Interpreter[_0x414986(0x354)][_0x414986(0x43b)][_0x414986(0x3be)](this,_0x1c2333),this[_0x414986(0x641)][_0x414986(0x3d4)](_0x136ad6=>_0x136ad6[_0x414986(0x148)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x4a2)]=Scene_Map['prototype']['startEncounterEffect'],Scene_Map[_0x2a2f60(0x354)][_0x2a2f60(0x2ae)]=function(){const _0xaf295d=_0x2a2f60;VisuMZ[_0xaf295d(0x193)][_0xaf295d(0x4a2)][_0xaf295d(0x3be)](this),this[_0xaf295d(0x388)][_0xaf295d(0x1fa)]();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x508)]=Scene_Load[_0x2a2f60(0x354)]['onLoadSuccess'],Scene_Load[_0x2a2f60(0x354)]['onLoadSuccess']=function(){const _0x273a28=_0x2a2f60;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0x273a28(0x193)]['Scene_Load_onLoadSuccess']['call'](this);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x1d1)]=Sprite_Character[_0x2a2f60(0x354)]['initMembers'],Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x4c4)]=function(){const _0x3ba9c2=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x3ba9c2(0x1d1)][_0x3ba9c2(0x3be)](this),this[_0x3ba9c2(0x1c4)](),this[_0x3ba9c2(0x647)](),this[_0x3ba9c2(0x3e3)]();},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x1c4)]=function(){this['_shadowOpacity']=0xff;},Sprite_Character['prototype']['createAttachPictureSprite']=function(){const _0x34e3df=_0x2a2f60;this[_0x34e3df(0x127)]=new Sprite(),this[_0x34e3df(0x127)][_0x34e3df(0x368)]['x']=0.5,this[_0x34e3df(0x127)][_0x34e3df(0x368)]['y']=0x1,this['addChild'](this['_attachPictureSprite']),this[_0x34e3df(0x16b)]();},Sprite_Character['prototype'][_0x2a2f60(0x3e3)]=function(){const _0x1d5d2c=_0x2a2f60;this['_eventIconSprite']=new Sprite(),this[_0x1d5d2c(0x221)][_0x1d5d2c(0x2b7)]=ImageManager[_0x1d5d2c(0x3d2)]('IconSet'),this['_eventIconSprite'][_0x1d5d2c(0x2b7)][_0x1d5d2c(0x340)]=![],this[_0x1d5d2c(0x221)][_0x1d5d2c(0x13d)](0x0,0x0,0x0,0x0),this[_0x1d5d2c(0x221)][_0x1d5d2c(0x368)]['x']=0.5,this[_0x1d5d2c(0x221)]['anchor']['y']=0x1,this[_0x1d5d2c(0x5eb)](this[_0x1d5d2c(0x221)]);},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x548)]=function(){const _0x4ec171=_0x2a2f60;return this[_0x4ec171(0x4ff)]&&this[_0x4ec171(0x4ff)]['match'](/\[VS8\]/i);},Sprite_Character[_0x2a2f60(0x354)]['isAutoBufferIcon']=function(){const _0x3ec715=_0x2a2f60;return this[_0x3ec715(0x548)]()&&VisuMZ[_0x3ec715(0x193)][_0x3ec715(0x430)][_0x3ec715(0x4f6)][_0x3ec715(0x275)];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x29c)]=Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x481)],Sprite_Character[_0x2a2f60(0x354)]['update']=function(){const _0x45e5a2=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x45e5a2(0x29c)][_0x45e5a2(0x3be)](this),this[_0x45e5a2(0x573)]();},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x11b)]=function(){const _0x1dc7bc=_0x2a2f60;Sprite['prototype'][_0x1dc7bc(0x11b)][_0x1dc7bc(0x3be)](this),this[_0x1dc7bc(0x4eb)]()&&(this[_0x1dc7bc(0x41d)]=![]);},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x4eb)]=function(){const _0x496539=_0x2a2f60;if(this[_0x496539(0x3f3)]()>0x0)return![];if(this[_0x496539(0x645)]){if('ordbX'!=='zClCs'){if(this[_0x496539(0x645)][_0x496539(0x54a)]()!=='')return![];}else return this['_CPCs'];}return this['isEmptyCharacter']()||this[_0x496539(0x645)]&&this[_0x496539(0x645)][_0x496539(0x2b9)]();},Sprite_Character['prototype'][_0x2a2f60(0x573)]=function(){const _0x1cf380=_0x2a2f60;this[_0x1cf380(0x304)](),this[_0x1cf380(0x2da)](),this[_0x1cf380(0x532)](),this['updateEventIconSprite'](),this[_0x1cf380(0x32e)](),this[_0x1cf380(0x14b)](),this['updateAttachPictureSprite']();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x561)]=Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x313)],Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x313)]=function(){const _0x4ce4d3=_0x2a2f60;VisuMZ['EventsMoveCore'][_0x4ce4d3(0x561)][_0x4ce4d3(0x3be)](this),this['bitmap']['addLoadListener'](this[_0x4ce4d3(0x2cb)]['bind'](this));},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x22d)]=Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x33d)],Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x33d)]=function(){const _0x5b44e7=_0x2a2f60;VisuMZ[_0x5b44e7(0x193)][_0x5b44e7(0x22d)][_0x5b44e7(0x3be)](this),this[_0x5b44e7(0x2b7)][_0x5b44e7(0x311)](this[_0x5b44e7(0x2cb)][_0x5b44e7(0x308)](this));},Sprite_Character['prototype']['updateBitmapSmoothing']=function(){const _0x3cca0b=_0x2a2f60;if(!this[_0x3cca0b(0x2b7)])return;this['bitmap']['smooth']=!!VisuMZ[_0x3cca0b(0x193)][_0x3cca0b(0x430)]['Movement']['BitmapSmoothing'];},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x5aa)]=Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x4ac)],Sprite_Character[_0x2a2f60(0x354)]['characterPatternY']=function(){const _0x308dbe=_0x2a2f60;return this['isSpriteVS8dir']()?this[_0x308dbe(0x4c1)]():this[_0x308dbe(0x1b1)]();},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x4c1)]=function(){const _0x5c0a46=_0x2a2f60,_0x488155=this[_0x5c0a46(0x645)][_0x5c0a46(0x562)]();let _0x2c153d=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x5c0a46(0x645)]['_mirrorSprite']&&(_0x2c153d=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x2c153d[_0x488155]-0x2)/0x2;},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x1b1)]=function(){const _0x284dc6=_0x2a2f60;let _0x40e0f7=this[_0x284dc6(0x645)][_0x284dc6(0x562)]();if(this[_0x284dc6(0x645)][_0x284dc6(0x56f)]){if(_0x284dc6(0x4b8)!==_0x284dc6(0x4b8))[0x6c,0x198][_0x284dc6(0x117)](_0x35c4ca[_0x284dc6(0x58b)])&&(_0x5236da+=_0x40502d[_0x284dc6(0x3da)][0x0]);else{if(_0x40e0f7===0x4)_0x40e0f7=0x6;else _0x40e0f7===0x6&&(_0x40e0f7=0x4);}}return(_0x40e0f7-0x2)/0x2;},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x304)]=function(){const _0x386d0e=_0x2a2f60;this[_0x386d0e(0x51d)]['x']=this[_0x386d0e(0x645)][_0x386d0e(0x33f)]??0x1,this[_0x386d0e(0x51d)]['y']=this['_character']['_scaleY']??0x1;},Sprite_Character[_0x2a2f60(0x354)]['updateTilt']=function(){const _0x49ab73=_0x2a2f60;if(!VisuMZ[_0x49ab73(0x193)][_0x49ab73(0x430)]['Movement'][_0x49ab73(0x2f3)])return;this[_0x49ab73(0x3ff)]=0x0;if(this[_0x49ab73(0x1ba)]()){if(_0x49ab73(0x12a)!==_0x49ab73(0x118)){const _0x277e3b=VisuMZ['EventsMoveCore'][_0x49ab73(0x430)][_0x49ab73(0x5ec)],_0x429814=this['_character']['direction']();let _0x30e90e=0x0;if([0x1,0x4,0x7]['includes'](_0x429814))_0x30e90e=_0x277e3b[_0x49ab73(0x465)];if([0x3,0x6,0x9][_0x49ab73(0x117)](_0x429814))_0x30e90e=_0x277e3b[_0x49ab73(0x4bb)];[0x2,0x8]['includes'](_0x429814)&&(_0x30e90e=[-_0x277e3b[_0x49ab73(0x3f9)],0x0,_0x277e3b['TiltVert']][this[_0x49ab73(0x645)][_0x49ab73(0x3bf)]()]);if(this[_0x49ab73(0x4de)])_0x30e90e*=-0x1;this[_0x49ab73(0x3ff)]=_0x30e90e;}else return _0x1bfd6d>0x0?0x2:0x8;}},Sprite_Character[_0x2a2f60(0x354)]['isAllowCharacterTilt']=function(){const _0x3912ed=_0x2a2f60;if(this['_dragonbones'])return![];return this['_character']['isDashingAndMoving']()&&!this[_0x3912ed(0x645)][_0x3912ed(0x4ab)]()&&!this[_0x3912ed(0x645)][_0x3912ed(0x344)]()&&this[_0x3912ed(0x3f3)]()===0x0;},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x532)]=function(){const _0x4019d2=_0x2a2f60;if(!this[_0x4019d2(0x192)])return;this['_shadowSprite']['x']=this[_0x4019d2(0x645)][_0x4019d2(0x542)](),this[_0x4019d2(0x192)]['y']=this[_0x4019d2(0x645)][_0x4019d2(0x1e6)](),this[_0x4019d2(0x192)]['opacity']=this[_0x4019d2(0x323)],this[_0x4019d2(0x192)][_0x4019d2(0x41d)]=this[_0x4019d2(0x645)][_0x4019d2(0x44d)](),this[_0x4019d2(0x192)][_0x4019d2(0x254)]=this[_0x4019d2(0x254)];if(this[_0x4019d2(0x645)][_0x4019d2(0x36f)]())this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['x']=Math[_0x4019d2(0x431)](0x0,this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['x']-0.1),this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['y']=Math[_0x4019d2(0x431)](0x0,this[_0x4019d2(0x192)]['scale']['y']-0.1);else{if('bQwrh'!=='bQwrh')this['_text']=this['_event']['labelWindowText'](),this[_0x4019d2(0x3d1)]();else{if(this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['x']!==this[_0x4019d2(0x51d)]['x']){if(this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['x']>this[_0x4019d2(0x51d)]['x'])this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['x']=Math[_0x4019d2(0x15a)](this['_shadowSprite'][_0x4019d2(0x51d)]['x']+0.1,this[_0x4019d2(0x51d)]['x']);if(this[_0x4019d2(0x192)]['scale']['x']<this[_0x4019d2(0x51d)]['x'])this[_0x4019d2(0x192)]['scale']['x']=Math[_0x4019d2(0x431)](this[_0x4019d2(0x192)]['scale']['x']-0.1,this[_0x4019d2(0x51d)]['x']);}if(this[_0x4019d2(0x192)]['scale']['y']!==this[_0x4019d2(0x51d)]['y']){if(this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['y']>this[_0x4019d2(0x51d)]['y'])this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['y']=Math[_0x4019d2(0x15a)](this['_shadowSprite'][_0x4019d2(0x51d)]['y']+0.1,this[_0x4019d2(0x51d)]['y']);if(this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['y']<this[_0x4019d2(0x51d)]['y'])this['_shadowSprite'][_0x4019d2(0x51d)]['y']=Math[_0x4019d2(0x431)](this[_0x4019d2(0x192)][_0x4019d2(0x51d)]['y']-0.1,this[_0x4019d2(0x51d)]['y']);}}}},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x156)]=function(){const _0x43095e=_0x2a2f60;if(!this[_0x43095e(0x221)])return;const _0x21b7ae=this[_0x43095e(0x221)],_0x35638d=this[_0x43095e(0x3f3)]();if(_0x35638d<=0x0)return _0x21b7ae[_0x43095e(0x13d)](0x0,0x0,0x0,0x0);else{if(_0x43095e(0x2f7)!==_0x43095e(0x60a)){const _0x187aec=ImageManager[_0x43095e(0x34b)],_0x1a14a4=ImageManager[_0x43095e(0x587)],_0x378f9f=_0x35638d%0x10*_0x187aec,_0x1643fc=Math[_0x43095e(0x24f)](_0x35638d/0x10)*_0x1a14a4;_0x21b7ae[_0x43095e(0x13d)](_0x378f9f,_0x1643fc,_0x187aec,_0x1a14a4),this[_0x43095e(0x41d)]=!![];}else{if(!_0x5cdc6b[_0x43095e(0x169)]&&this[_0x43095e(0x4ab)]())return![];if(this[_0x43095e(0x5b7)])return!![];return _0x800231[_0x43095e(0x193)][_0x43095e(0x453)][_0x43095e(0x3be)](this);}}const _0x2995f9=this[_0x43095e(0x645)][_0x43095e(0x5e3)]();this[_0x43095e(0x33c)]()?this[_0x43095e(0x472)](_0x21b7ae):(_0x21b7ae['x']=_0x2995f9?_0x2995f9[_0x43095e(0x49c)]:0x0,_0x21b7ae['y']=_0x2995f9?-this[_0x43095e(0x5cf)]+_0x2995f9[_0x43095e(0x10e)]:0x0),_0x21b7ae[_0x43095e(0x258)]=_0x2995f9?_0x2995f9[_0x43095e(0x258)]:0x0,this['removeChild'](_0x21b7ae),this[_0x43095e(0x5eb)](_0x21b7ae),_0x21b7ae['rotation']=-this[_0x43095e(0x3ff)];},Sprite_Character['prototype']['updateEventCustomZ']=function(){const _0x42130f=_0x2a2f60;if(!this[_0x42130f(0x645)])return;if(this[_0x42130f(0x645)]['_customZ']===undefined)return;if(this[_0x42130f(0x645)]['_customZ']===![])return;this['z']=this['_character'][_0x42130f(0x334)];if(this[_0x42130f(0x192)]){if(this['z']<0x0)this[_0x42130f(0x192)]['z']=this['z']-0x1;else{if('xWjfE'!==_0x42130f(0x217))this[_0x42130f(0x192)]['z']=0x0;else return this[_0x42130f(0x47d)](0x7);}}},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x14b)]=function(){const _0x42e2f5=_0x2a2f60;if(!this[_0x42e2f5(0x645)])return;let _0x59af71=!!this['_character'][_0x42e2f5(0x56f)];this[_0x42e2f5(0x51d)]['x']=Math['abs'](this[_0x42e2f5(0x51d)]['x'])*(_0x59af71?-0x1:0x1);},Sprite_Character['prototype'][_0x2a2f60(0x472)]=function(_0x5bb5cc){const _0x5c9309=_0x2a2f60;_0x5bb5cc['x']=0x0,_0x5bb5cc['y']=-this[_0x5c9309(0x5cf)]+this[_0x5c9309(0x5cf)]*0x2/0x5,this['_character']['pattern']()!==0x1&&(_0x5bb5cc['y']+=0x1);},Sprite_Character['prototype']['getEventIconIndex']=function(){const _0x3c01c6=_0x2a2f60;if(!this[_0x3c01c6(0x645)])return 0x0;if(this[_0x3c01c6(0x645)][_0x3c01c6(0x35a)])return 0x0;const _0x4c2645=this[_0x3c01c6(0x645)]['getEventIconData']();return _0x4c2645?_0x4c2645['iconIndex']||0x0:0x0;},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x16b)]=function(){const _0x54a485=_0x2a2f60;if(!this[_0x54a485(0x127)])return;if(!this[_0x54a485(0x645)])return;this[_0x54a485(0x160)](),this[_0x54a485(0x295)]();},Sprite_Character[_0x2a2f60(0x354)]['setupAttachPictureBitmap']=function(){const _0x8b4654=_0x2a2f60;if(!this[_0x8b4654(0x30b)]())return;const _0xcf97cf=this[_0x8b4654(0x645)]['attachPictureSettings']();this[_0x8b4654(0x23d)]=_0xcf97cf[_0x8b4654(0x5e2)],this[_0x8b4654(0x56e)]=_0xcf97cf['maxSize'],this[_0x8b4654(0x11d)]=_0xcf97cf[_0x8b4654(0x51d)];if(_0xcf97cf['filename']!==''){const _0x413fb2=ImageManager[_0x8b4654(0x306)](_0xcf97cf[_0x8b4654(0x5e2)]);_0x413fb2[_0x8b4654(0x311)](this[_0x8b4654(0x3bc)][_0x8b4654(0x308)](this,_0x413fb2));}else{if(_0x8b4654(0x1fd)==='CpKzJ')this[_0x8b4654(0x127)][_0x8b4654(0x2b7)]=new Bitmap(0x1,0x1);else return this[_0x8b4654(0x5d9)](_0xeb3775['$1'],_0x2c49c6['$2']);}},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x295)]=function(){const _0x5b8d7a=_0x2a2f60,_0x379d90=this[_0x5b8d7a(0x127)];_0x379d90['x']=this[_0x5b8d7a(0x645)][_0x5b8d7a(0x294)](),_0x379d90['y']=this['_character'][_0x5b8d7a(0x610)](),_0x379d90[_0x5b8d7a(0x258)]=this[_0x5b8d7a(0x645)][_0x5b8d7a(0x47f)]();},Sprite_Character[_0x2a2f60(0x354)][_0x2a2f60(0x30b)]=function(){const _0x540617=_0x2a2f60,_0x81014c=this[_0x540617(0x645)][_0x540617(0x184)]();if(_0x81014c){if(this[_0x540617(0x23d)]!==_0x81014c['filename'])return!![];if(this[_0x540617(0x56e)]!==_0x81014c['maxSize'])return!![];if(this[_0x540617(0x11d)]!==_0x81014c['scale'])return!![];}return![];},Sprite_Character['prototype']['onLoadAttachPicture']=function(_0x47a5b9){const _0x1c9451=_0x2a2f60,_0x14420b=this[_0x1c9451(0x127)];_0x14420b[_0x1c9451(0x2b7)]=_0x47a5b9;const _0x2cdf46=this['_character']['attachPictureSettings'](),_0x1e035d=_0x2cdf46[_0x1c9451(0x353)],_0x15b07f=_0x2cdf46['scale'];let _0x3971db=0x1;if(_0x1e035d>0x0){let _0x323a9e=this[_0x1c9451(0x362)]()||0x1,_0x1ec8c7=this[_0x1c9451(0x43d)]()||0x1;const _0xed19ba=Math[_0x1c9451(0x431)](0x1,_0x323a9e,_0x1ec8c7);_0x3971db=_0x1e035d/_0xed19ba;}_0x3971db*=_0x15b07f;if(_0x3971db!==0x1){if('nTAsX'===_0x1c9451(0x4fe)){if(this['isOnLadder']())return!![];if(this[_0x1c9451(0x231)]===_0x555a5f&&this[_0x1c9451(0x63e)]())return!![];return![];}else this[_0x1c9451(0x127)][_0x1c9451(0x2b7)][_0x1c9451(0x340)]=!![];}_0x14420b[_0x1c9451(0x51d)]['x']=_0x3971db,_0x14420b['scale']['y']=_0x3971db,this['visible']=!![],this[_0x1c9451(0x295)]();},Sprite_Character['prototype'][_0x2a2f60(0x362)]=function(){const _0x40fd0c=_0x2a2f60,_0x2ac203=this['_attachPictureSprite'];if(!_0x2ac203)return 0x0;return _0x2ac203[_0x40fd0c(0x2b7)][_0x40fd0c(0x627)];},Sprite_Character['prototype'][_0x2a2f60(0x43d)]=function(){const _0x346e16=_0x2a2f60,_0x61574a=this[_0x346e16(0x127)];if(!_0x61574a)return 0x0;return _0x61574a['bitmap'][_0x346e16(0x5cf)];},VisuMZ['EventsMoveCore'][_0x2a2f60(0x3ce)]=Sprite_Balloon[_0x2a2f60(0x354)][_0x2a2f60(0x5a2)],Sprite_Balloon[_0x2a2f60(0x354)][_0x2a2f60(0x5a2)]=function(_0x1b3a59,_0x49ebc2){const _0x2c94b0=_0x2a2f60;VisuMZ[_0x2c94b0(0x193)][_0x2c94b0(0x3ce)][_0x2c94b0(0x3be)](this,_0x1b3a59,_0x49ebc2),VisuMZ[_0x2c94b0(0x193)][_0x2c94b0(0x430)][_0x2c94b0(0x4f6)][_0x2c94b0(0x253)]&&this[_0x2c94b0(0x535)][_0x2c94b0(0x645)][_0x2c94b0(0x504)](_0x49ebc2,this[_0x2c94b0(0x61d)]);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x2bc)]=Sprite_Balloon[_0x2a2f60(0x354)][_0x2a2f60(0x179)],Sprite_Balloon['prototype'][_0x2a2f60(0x179)]=function(){const _0x4bdcad=_0x2a2f60;VisuMZ[_0x4bdcad(0x193)][_0x4bdcad(0x2bc)]['call'](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x2a2f60(0x354)][_0x2a2f60(0x45d)]=function(){const _0x12fc36=_0x2a2f60;this[_0x12fc36(0x535)]['_character'][_0x12fc36(0x548)]()&&(this['x']+=VisuMZ['EventsMoveCore'][_0x12fc36(0x430)]['VS8'][_0x12fc36(0x3ba)],this['y']+=VisuMZ[_0x12fc36(0x193)][_0x12fc36(0x430)][_0x12fc36(0x4f6)][_0x12fc36(0x142)]);},Sprite_Timer[_0x2a2f60(0x354)][_0x2a2f60(0x2c5)]=function(){const _0x3e2533=_0x2a2f60;this[_0x3e2533(0x2b7)]=new Bitmap(Math[_0x3e2533(0x4b9)](Graphics[_0x3e2533(0x4d1)]/0x2),0x30),this[_0x3e2533(0x2b7)][_0x3e2533(0x585)]=this[_0x3e2533(0x585)](),this[_0x3e2533(0x2b7)]['fontSize']=this[_0x3e2533(0x53b)](),this[_0x3e2533(0x2b7)][_0x3e2533(0x276)]=ColorManager['outlineColor']();},Sprite_Timer[_0x2a2f60(0x354)]['timerText']=function(){const _0x440505=_0x2a2f60,_0x318562=Math[_0x440505(0x24f)](this[_0x440505(0x2ce)]/0x3c/0x3c),_0x16bc1d=Math['floor'](this['_seconds']/0x3c)%0x3c,_0x24aa23=this[_0x440505(0x2ce)]%0x3c;let _0x2c7803=_0x16bc1d['padZero'](0x2)+':'+_0x24aa23[_0x440505(0x25c)](0x2);if(_0x318562>0x0)_0x2c7803='%1:%2'['format'](_0x318562,_0x2c7803);return _0x2c7803;};function Sprite_EventLabel(){const _0x472a85=_0x2a2f60;this[_0x472a85(0x222)](...arguments);}Sprite_EventLabel[_0x2a2f60(0x354)]=Object[_0x2a2f60(0x36d)](Sprite['prototype']),Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x231)]=Sprite_EventLabel,Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x222)]=function(_0x3b30c5){const _0x4ebb89=_0x2a2f60;this[_0x4ebb89(0x3a9)]=_0x3b30c5,Sprite[_0x4ebb89(0x354)]['initialize']['call'](this),this[_0x4ebb89(0x4c4)](),this[_0x4ebb89(0x487)]();},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x4c4)]=function(){const _0x1d4ce9=_0x2a2f60;this['anchor']['x']=0.5,this[_0x1d4ce9(0x368)]['y']=0x1;},Sprite_EventLabel['prototype'][_0x2a2f60(0x487)]=function(){const _0x388a17=_0x2a2f60,_0x169a3f=new Rectangle(0x0,0x0,0x1,0x1);this['_proxyWindow']=new Window_Base(_0x169a3f),this['_proxyWindow'][_0x388a17(0x2f1)]=0x0,this[_0x388a17(0x323)]=this[_0x388a17(0x30d)]()?0xff:0x0;},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x481)]=function(){const _0x4cd9a0=_0x2a2f60;Sprite['prototype']['update']['call'](this),this[_0x4cd9a0(0x1d5)](),this[_0x4cd9a0(0x3e5)](),this[_0x4cd9a0(0x179)](),this[_0x4cd9a0(0x644)](),this['updateHueShift']();},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x1d5)]=function(){const _0x214c03=_0x2a2f60;this['_event'][_0x214c03(0x15d)]()!==this[_0x214c03(0x2d8)]&&(this[_0x214c03(0x2d8)]=this['_event'][_0x214c03(0x15d)](),this[_0x214c03(0x3d1)]());},Sprite_EventLabel['prototype'][_0x2a2f60(0x3d1)]=function(){const _0x1bab45=_0x2a2f60;if(!this[_0x1bab45(0x603)])return;this[_0x1bab45(0x5ce)](),this[_0x1bab45(0x1da)]();},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x5ce)]=function(){const _0x23888b=_0x2a2f60,_0x4b4c23=this[_0x23888b(0x603)][_0x23888b(0x139)](this[_0x23888b(0x2d8)]),_0x1eb8bf=this[_0x23888b(0x603)][_0x23888b(0x1c6)](),_0x45b3cc=_0x4b4c23[_0x23888b(0x627)]+_0x1eb8bf*0x2,_0x1572f2=_0x4b4c23['height'];this['_proxyWindow'][_0x23888b(0x4c5)](0x0,0x0,_0x45b3cc,_0x1572f2),this['_proxyWindow']['createContents'](),this[_0x23888b(0x2b7)]=this[_0x23888b(0x603)][_0x23888b(0x14e)];},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x1da)]=function(){const _0x16a546=_0x2a2f60,_0x3c64d1=this[_0x16a546(0x603)]['itemPadding']();this['_proxyWindow'][_0x16a546(0x656)](this[_0x16a546(0x2d8)],_0x3c64d1,0x0);},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x3e5)]=function(){const _0x1ec982=_0x2a2f60,_0x43c263=VisuMZ[_0x1ec982(0x193)][_0x1ec982(0x430)][_0x1ec982(0x395)][_0x1ec982(0x158)],_0x50e95b=$gameSystem[_0x1ec982(0x2ed)]()||0x1;this[_0x1ec982(0x51d)]['x']=this[_0x1ec982(0x51d)]['y']=_0x43c263/_0x50e95b;},Sprite_EventLabel['prototype'][_0x2a2f60(0x179)]=function(){const _0x7d3012=_0x2a2f60;if(!SceneManager[_0x7d3012(0x263)])return;if(!SceneManager['_scene'][_0x7d3012(0x388)])return;const _0x5ad5d0=SceneManager['_scene'][_0x7d3012(0x388)][_0x7d3012(0x13a)](this[_0x7d3012(0x3a9)]);if(!_0x5ad5d0)return;this['x']=this[_0x7d3012(0x3a9)][_0x7d3012(0x5a1)](),this['x']+=this['_event']['_labelWindow'][_0x7d3012(0x172)],this['y']=this['_event'][_0x7d3012(0x412)]()-_0x5ad5d0[_0x7d3012(0x5cf)]*_0x5ad5d0[_0x7d3012(0x51d)]['y'],this['y']+=$gameSystem[_0x7d3012(0x46f)]()*-0.5,this['y']+=this['_event'][_0x7d3012(0x62e)][_0x7d3012(0x293)];},Sprite_EventLabel[_0x2a2f60(0x354)]['updateOpacity']=function(){const _0x1e86f1=_0x2a2f60;if(this[_0x1e86f1(0x30d)]())this[_0x1e86f1(0x323)]+=this['opacitySpeed']();else SceneManager[_0x1e86f1(0x263)][_0x1e86f1(0x178)]>0x0?this[_0x1e86f1(0x323)]=0x0:_0x1e86f1(0x4da)!=='yvPjy'?this[_0x1e86f1(0x323)]-=this[_0x1e86f1(0x3ec)]():this[_0x1e86f1(0x183)][_0x1e86f1(0x353)]=_0x32d736(_0x1ea020['$1']);},Sprite_EventLabel['prototype'][_0x2a2f60(0x1c5)]=function(){const _0x538a19=_0x2a2f60;if(this['isLabelVisible']()&&this[_0x538a19(0x3a9)]&&this[_0x538a19(0x3a9)][_0x538a19(0x62e)]['hueShift']){const _0x30174c=this['_hue']+(this['_event'][_0x538a19(0x62e)][_0x538a19(0x182)]||0x0);this[_0x538a19(0x4e2)](_0x30174c);}},Sprite_EventLabel['prototype'][_0x2a2f60(0x30d)]=function(){const _0x55a652=_0x2a2f60;if(!$gameSystem['eventLabelsVisible']())return![];if(this[_0x55a652(0x3a9)]?.[_0x55a652(0x35a)])return![];if(this[_0x55a652(0x3a9)]&&this['_event'][_0x55a652(0x4b1)]<0x0)return![];if(SceneManager['_scene'][_0x55a652(0x178)]>0x0)return![];const _0x36dd4c=$gamePlayer['x'],_0x3de63d=$gamePlayer['y'],_0x1df8a1=this[_0x55a652(0x3a9)]['x'],_0x537657=this['_event']['y'];if(this['_visiblePlayerX']===_0x36dd4c&&this[_0x55a652(0x215)]===_0x3de63d&&this[_0x55a652(0x575)]===_0x1df8a1&&this['_visibleEventY']===_0x537657){if('saifW'!=='saifW'){const _0x24fd25=_0x3e0407[_0x55a652(0x193)][_0x55a652(0x5fa)][_0x55a652(0x3be)](this),_0x23fea4=_0xb1c0e0[_0x55a652(0x193)]['CustomPageConditions']['_commonEvents'][_0x55a652(0x302)](_0x3759ed=>_0x56616b[_0x3759ed]);return _0x24fd25[_0x55a652(0x3df)](_0x23fea4)[_0x55a652(0x628)]((_0x41d762,_0xe5f47,_0x162ae8)=>_0x162ae8[_0x55a652(0x5bb)](_0x41d762)===_0xe5f47);}else return this[_0x55a652(0x372)];}this[_0x55a652(0x3b4)]=$gamePlayer['x'],this[_0x55a652(0x215)]=$gamePlayer['y'],this[_0x55a652(0x575)]=this['_event']['x'],this[_0x55a652(0x5c0)]=this[_0x55a652(0x3a9)]['y'];if($gameMap[_0x55a652(0x541)](_0x36dd4c,_0x3de63d,_0x1df8a1,_0x537657)>this[_0x55a652(0x3a9)][_0x55a652(0x4be)]()){if(_0x55a652(0x432)!==_0x55a652(0x5cd))return this['_cacheVisibility']=![],![];else{if(_0x556f27&&_0x340279[_0x55a652(0x1b0)]())return _0x4f4ffd[_0x55a652(0x559)](),!![];}}return this[_0x55a652(0x372)]=!![],!![];},Sprite_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x3ec)]=function(){const _0x3effa5=_0x2a2f60;return VisuMZ[_0x3effa5(0x193)][_0x3effa5(0x430)]['Label'][_0x3effa5(0x53d)];},VisuMZ['EventsMoveCore'][_0x2a2f60(0x36a)]=Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x639)],Spriteset_Map['prototype'][_0x2a2f60(0x639)]=function(){const _0x3fb458=_0x2a2f60;VisuMZ[_0x3fb458(0x193)][_0x3fb458(0x36a)]['call'](this),this[_0x3fb458(0x2f8)]();},VisuMZ[_0x2a2f60(0x193)]['Spriteset_Map_createShadow']=Spriteset_Map['prototype']['createShadow'],Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x62b)]=function(){const _0x20aacc=_0x2a2f60;VisuMZ[_0x20aacc(0x193)][_0x20aacc(0x520)][_0x20aacc(0x3be)](this),this[_0x20aacc(0x126)]();},Spriteset_Map[_0x2a2f60(0x354)]['createShadows']=function(){const _0x18994f=_0x2a2f60;if(!VisuMZ['EventsMoveCore'][_0x18994f(0x430)][_0x18994f(0x5ec)]['ShowShadows'])return;for(const _0x3b6edc of this[_0x18994f(0x267)]){_0x18994f(0x48d)===_0x18994f(0x1c0)?this[_0x18994f(0x222)][_0x18994f(0x1bc)](this,arguments):this[_0x18994f(0x1fc)](_0x3b6edc);}},Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x1fc)]=function(_0x170234){const _0x58bb7c=_0x2a2f60;_0x170234[_0x58bb7c(0x192)]=new Sprite(),_0x170234['_shadowSprite'][_0x58bb7c(0x2cd)]=_0x170234['_character'][_0x58bb7c(0x2ad)](),_0x170234[_0x58bb7c(0x192)][_0x58bb7c(0x2b7)]=ImageManager['loadSystem'](_0x170234['_shadowSprite'][_0x58bb7c(0x2cd)]),_0x170234[_0x58bb7c(0x192)][_0x58bb7c(0x368)]['x']=0.5,_0x170234[_0x58bb7c(0x192)][_0x58bb7c(0x368)]['y']=0x1,_0x170234[_0x58bb7c(0x192)]['z']=0x0,this[_0x58bb7c(0x167)][_0x58bb7c(0x5eb)](_0x170234[_0x58bb7c(0x192)]);},Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x1fa)]=function(){const _0x3d8815=_0x2a2f60;if(!VisuMZ[_0x3d8815(0x193)][_0x3d8815(0x430)]['Movement'][_0x3d8815(0x5a8)])return;for(const _0x261a38 of this[_0x3d8815(0x267)]){this['_tilemap'][_0x3d8815(0x12b)](_0x261a38[_0x3d8815(0x192)]);}},Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x2f8)]=function(){const _0x3be946=_0x2a2f60;this[_0x3be946(0x529)]=[];for(const _0x3c75ee of $gameMap[_0x3be946(0x218)]()){this[_0x3be946(0x589)](_0x3c75ee);}},Spriteset_Map['MOBILE_EVENT_LABELS']=VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x430)][_0x2a2f60(0x395)][_0x2a2f60(0x4d6)]??!![],Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x589)]=function(_0x4ab026){const _0x5f31c1=_0x2a2f60;if(!this['isTargetEventValidForLabelWindow'](_0x4ab026))return;if(Utils[_0x5f31c1(0x56c)]()){if('gDyAw'===_0x5f31c1(0x3a3)){if(!Spriteset_Map[_0x5f31c1(0x578)])return;}else return this[_0x5f31c1(0x41c)]===_0x5bfdc1&&this[_0x5f31c1(0x633)](),this[_0x5f31c1(0x41c)];}let _0x1eb381;const _0x32a720=VisuMZ['EventsMoveCore'][_0x5f31c1(0x430)]['Label']['SpriteBased']??!![];_0x1eb381=_0x32a720?new Sprite_EventLabel(_0x4ab026):new Window_EventLabel(_0x4ab026),_0x1eb381['z']=0x8,_0x1eb381[_0x5f31c1(0x105)]=Sprite['_counter']++,this[_0x5f31c1(0x167)][_0x5f31c1(0x5eb)](_0x1eb381),this['_labelWindows']['push'](_0x1eb381);},Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x1ee)]=function(_0x4ab99f){const _0x520eda=_0x2a2f60,_0x54d12a=_0x4ab99f[_0x520eda(0x5a5)]();if(_0x54d12a[_0x520eda(0x45c)][_0x520eda(0x148)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x54d12a[_0x520eda(0x45c)][_0x520eda(0x148)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x21b63f of _0x54d12a['pages']){let _0x5a49af='';for(const _0x4c7271 of _0x21b63f['list']){[0x6c,0x198][_0x520eda(0x117)](_0x4c7271[_0x520eda(0x58b)])&&(_0x5a49af+=_0x4c7271[_0x520eda(0x3da)][0x0]);}if(_0x5a49af[_0x520eda(0x148)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5a49af['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return'CzEAu'!==_0x520eda(0x19e)?!![]:_0x1cbe26[_0x520eda(0x549)]()?this[_0x520eda(0x1e9)]():_0x54e685[_0x520eda(0x193)][_0x520eda(0x2b5)]['call'](this);}return![];},Spriteset_Map[_0x2a2f60(0x354)][_0x2a2f60(0x4fa)]=function(_0x1a0242){const _0xee2fb3=_0x2a2f60;this['_characterSprites']=this['_characterSprites']||[];const _0x183a4f=new Sprite_Character(_0x1a0242);this['_characterSprites'][_0xee2fb3(0x245)](_0x183a4f),this['_tilemap']['addChild'](_0x183a4f),this[_0xee2fb3(0x1fc)](_0x183a4f),this['createLabelWindowForTarget'](_0x1a0242),_0x183a4f[_0xee2fb3(0x481)]();},Spriteset_Map['prototype']['refreshEventLabels']=function(){const _0x4bc77a=_0x2a2f60;if(!this[_0x4bc77a(0x529)])return;for(const _0x1f0b07 of this[_0x4bc77a(0x529)]){_0x1f0b07&&(_0x4bc77a(0x307)==='gDvpy'?this['_forceCarrying']=![]:(_0x1f0b07[_0x4bc77a(0x3b4)]=undefined,_0x1f0b07[_0x4bc77a(0x3d1)]()));}},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x609)]=Game_Message['prototype']['setNumberInput'],Game_Message[_0x2a2f60(0x354)][_0x2a2f60(0x12c)]=function(_0x2953e1,_0x292e23){const _0x538e72=_0x2a2f60;this['_selfTargetNumberInput']=$gameTemp[_0x538e72(0x474)](),VisuMZ[_0x538e72(0x193)][_0x538e72(0x609)][_0x538e72(0x3be)](this,_0x2953e1,_0x292e23);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x38d)]=Window_NumberInput['prototype'][_0x2a2f60(0x375)],Window_NumberInput[_0x2a2f60(0x354)][_0x2a2f60(0x375)]=function(){const _0x5cba08=_0x2a2f60;$gameTemp[_0x5cba08(0x496)]($gameMessage[_0x5cba08(0x378)]),VisuMZ['EventsMoveCore'][_0x5cba08(0x38d)][_0x5cba08(0x3be)](this),$gameTemp[_0x5cba08(0x17f)]();},VisuMZ['EventsMoveCore'][_0x2a2f60(0x52f)]=Window_NumberInput['prototype'][_0x2a2f60(0x2d9)],Window_NumberInput['prototype'][_0x2a2f60(0x2d9)]=function(){const _0x376375=_0x2a2f60;$gameTemp[_0x376375(0x496)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x376375(0x193)]['Window_NumberInput_processOk'][_0x376375(0x3be)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x376375(0x378)]=undefined;},VisuMZ['EventsMoveCore'][_0x2a2f60(0x3e4)]=Game_Message[_0x2a2f60(0x354)][_0x2a2f60(0x1ed)],Game_Message['prototype'][_0x2a2f60(0x1ed)]=function(_0x560e1f,_0x47cbeb){const _0x38f4c0=_0x2a2f60;this['_selfTargetItemChoice']=$gameTemp['getSelfTarget'](),VisuMZ[_0x38f4c0(0x193)][_0x38f4c0(0x3e4)]['call'](this,_0x560e1f,_0x47cbeb);},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x64a)]=Window_EventItem[_0x2a2f60(0x354)][_0x2a2f60(0x4bc)],Window_EventItem['prototype'][_0x2a2f60(0x4bc)]=function(){const _0x4969d7=_0x2a2f60;$gameTemp[_0x4969d7(0x496)]($gameMessage[_0x4969d7(0x454)]),VisuMZ['EventsMoveCore']['Window_EventItem_onOk'][_0x4969d7(0x3be)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x4969d7(0x454)]=undefined;},VisuMZ[_0x2a2f60(0x193)]['Window_EventItem_onCancel']=Window_EventItem[_0x2a2f60(0x354)][_0x2a2f60(0x36b)],Window_EventItem['prototype'][_0x2a2f60(0x36b)]=function(){const _0x562ff7=_0x2a2f60;$gameTemp[_0x562ff7(0x496)]($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore']['Window_EventItem_onCancel'][_0x562ff7(0x3be)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x562ff7(0x454)]=undefined;},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x4e3)]=Window_Message[_0x2a2f60(0x354)][_0x2a2f60(0x440)],Window_Message['prototype'][_0x2a2f60(0x440)]=function(){const _0xdf4761=_0x2a2f60;$gameMessage[_0xdf4761(0x563)](),VisuMZ[_0xdf4761(0x193)][_0xdf4761(0x4e3)][_0xdf4761(0x3be)](this),$gameTemp[_0xdf4761(0x17f)]();},VisuMZ[_0x2a2f60(0x193)][_0x2a2f60(0x526)]=Window_ScrollText[_0x2a2f60(0x354)][_0x2a2f60(0x440)],Window_ScrollText['prototype'][_0x2a2f60(0x440)]=function(){const _0x38a664=_0x2a2f60;$gameMessage['registerSelfEvent'](),VisuMZ[_0x38a664(0x193)][_0x38a664(0x526)]['call'](this),$gameTemp[_0x38a664(0x17f)]();};function Window_EventLabel(){const _0xd51ec0=_0x2a2f60;this[_0xd51ec0(0x222)](...arguments);}Window_EventLabel[_0x2a2f60(0x354)]=Object[_0x2a2f60(0x36d)](Window_Base[_0x2a2f60(0x354)]),Window_EventLabel[_0x2a2f60(0x354)]['constructor']=Window_EventLabel,Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x222)]=function(_0x5d95f3){const _0x2ae287=_0x2a2f60;this['_event']=_0x5d95f3;const _0x438637=new Rectangle(0x0,0x0,Graphics[_0x2ae287(0x4d1)]/0x4,this[_0x2ae287(0x475)](0x1));this[_0x2ae287(0x4c4)](),Window_Base['prototype'][_0x2ae287(0x222)][_0x2ae287(0x3be)](this,_0x438637),this[_0x2ae287(0x2a2)]=0x0,this['setBackgroundType'](0x2),this[_0x2ae287(0x2d8)]='';},Window_EventLabel['prototype'][_0x2a2f60(0x4c4)]=function(){const _0x34a2f9=_0x2a2f60;this[_0x34a2f9(0x5a9)]=![],this[_0x34a2f9(0x629)]=$gameScreen[_0x34a2f9(0x2c2)](),this[_0x34a2f9(0x203)]=this[_0x34a2f9(0x3a9)][_0x34a2f9(0x5a1)](),this[_0x34a2f9(0x418)]=this['_event']['screenY'](),this[_0x34a2f9(0x226)]=this[_0x34a2f9(0x3a9)][_0x34a2f9(0x62e)]['offsetX'],this[_0x34a2f9(0x15c)]=this[_0x34a2f9(0x3a9)][_0x34a2f9(0x62e)][_0x34a2f9(0x293)],this['_eventPageIndex']=this[_0x34a2f9(0x3a9)][_0x34a2f9(0x4b1)],this['_cacheVisibility']=this[_0x34a2f9(0x30d)](),this[_0x34a2f9(0x598)]=$gameSystem[_0x34a2f9(0x248)](),this['_visiblePlayerX']=$gamePlayer['x'],this[_0x34a2f9(0x215)]=$gamePlayer['y'],this[_0x34a2f9(0x575)]=this[_0x34a2f9(0x3a9)]['x'],this['_visibleEventY']=this[_0x34a2f9(0x3a9)]['y'];},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x481)]=function(){const _0x5b3720=_0x2a2f60;Window_Base[_0x5b3720(0x354)][_0x5b3720(0x481)][_0x5b3720(0x3be)](this);if(!this[_0x5b3720(0x290)]())return;this[_0x5b3720(0x1d5)](),this['updateScale'](),this['updatePosition'](),this['updateOpacity']();},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x290)]=function(){const _0x142ca3=_0x2a2f60;if(!this[_0x142ca3(0x3a9)])return![];if(!this[_0x142ca3(0x3a9)][_0x142ca3(0x62e)])return![];if(this[_0x142ca3(0x3fd)]!==this[_0x142ca3(0x3a9)][_0x142ca3(0x4b1)])return!![];if(this[_0x142ca3(0x3a9)][_0x142ca3(0x35a)]&&!this[_0x142ca3(0x5a9)])return!![];if(this[_0x142ca3(0x3a9)][_0x142ca3(0x62e)][_0x142ca3(0x45f)]==='')return![];if(this[_0x142ca3(0x629)]!==$gameScreen['zoomScale']())return!![];if(this['_eventScreenX']!==this[_0x142ca3(0x3a9)]['screenX']())return!![];if(this[_0x142ca3(0x418)]!==this['_event']['screenY']())return!![];if(this[_0x142ca3(0x226)]!==this['_event'][_0x142ca3(0x62e)][_0x142ca3(0x172)])return!![];if(this[_0x142ca3(0x15c)]!==this[_0x142ca3(0x3a9)][_0x142ca3(0x62e)]['offsetY'])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x142ca3(0x575)]!==this[_0x142ca3(0x3a9)]['x'])return!![];if(this['_visibleEventY']!==this['_event']['y'])return!![];if(this[_0x142ca3(0x598)]!==$gameSystem['eventLabelsVisible']())return!![];if(this[_0x142ca3(0x372)]&&this[_0x142ca3(0x2a2)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x142ca3(0x2a2)]>0x0)return!![];if(SceneManager[_0x142ca3(0x263)][_0x142ca3(0x178)]>0x0)return!![];return![];},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x1d5)]=function(){const _0x2d3ee7=_0x2a2f60;this['_event']['labelWindowText']()!==this[_0x2d3ee7(0x2d8)]&&(this[_0x2d3ee7(0x2d8)]=this[_0x2d3ee7(0x3a9)][_0x2d3ee7(0x15d)](),this[_0x2d3ee7(0x3d1)]());},Window_EventLabel[_0x2a2f60(0x354)]['updateScale']=function(){const _0x49fde2=_0x2a2f60;this[_0x49fde2(0x51d)]['x']=0x1/$gameScreen[_0x49fde2(0x2c2)](),this[_0x49fde2(0x51d)]['y']=0x1/$gameScreen['zoomScale'](),this[_0x49fde2(0x629)]=$gameScreen['zoomScale']();},Window_EventLabel['prototype'][_0x2a2f60(0x179)]=function(){const _0x3fa2f1=_0x2a2f60;if(!SceneManager[_0x3fa2f1(0x263)])return;if(!SceneManager['_scene'][_0x3fa2f1(0x388)])return;const _0x39b054=SceneManager[_0x3fa2f1(0x263)]['_spriteset']['findTargetSprite'](this[_0x3fa2f1(0x3a9)]);if(!_0x39b054)return;this['x']=Math['round'](this[_0x3fa2f1(0x3a9)]['screenX']()-Math[_0x3fa2f1(0x24f)](this[_0x3fa2f1(0x627)]*this[_0x3fa2f1(0x51d)]['x']/0x2)),this['x']+=this[_0x3fa2f1(0x3a9)][_0x3fa2f1(0x62e)][_0x3fa2f1(0x172)],this['y']=this[_0x3fa2f1(0x3a9)][_0x3fa2f1(0x412)]()-_0x39b054['height'],this['y']+=Math[_0x3fa2f1(0x4b9)]($gameSystem[_0x3fa2f1(0x46f)]()*0.5),this['y']-=Math[_0x3fa2f1(0x4b9)](this['height']*this[_0x3fa2f1(0x51d)]['y']),this['y']+=this['_event']['_labelWindow']['offsetY'],this['_eventErased']=this[_0x3fa2f1(0x3a9)][_0x3fa2f1(0x35a)],this[_0x3fa2f1(0x203)]=this['_event'][_0x3fa2f1(0x5a1)](),this[_0x3fa2f1(0x418)]=this['_event']['screenY'](),this[_0x3fa2f1(0x226)]=this[_0x3fa2f1(0x3a9)][_0x3fa2f1(0x62e)][_0x3fa2f1(0x172)],this['_eventLabelOffsetY']=this['_event'][_0x3fa2f1(0x62e)][_0x3fa2f1(0x293)],this['_eventPageIndex']=this[_0x3fa2f1(0x3a9)][_0x3fa2f1(0x4b1)],this[_0x3fa2f1(0x5a9)]&&(_0x3fa2f1(0x5b6)!=='UotyL'?(_0x459f04[_0x3fa2f1(0x193)]['Game_Event_update']['call'](this),!_0x41a8d2['isMobileDevice']()&&this['updateSaveEventLocation']()):this[_0x3fa2f1(0x2a2)]=0x0);},Window_EventLabel['prototype'][_0x2a2f60(0x644)]=function(){const _0x2662da=_0x2a2f60;if(this['isLabelVisible']())this['contentsOpacity']+=this[_0x2662da(0x3ec)]();else SceneManager[_0x2662da(0x263)][_0x2662da(0x178)]>0x0?this[_0x2662da(0x2a2)]=0x0:this[_0x2662da(0x2a2)]-=this['opacitySpeed']();},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x30d)]=function(){const _0x465046=_0x2a2f60;if(!$gameSystem['eventLabelsVisible']())return![];if(this[_0x465046(0x3a9)]?.[_0x465046(0x35a)])return![];if(SceneManager[_0x465046(0x263)][_0x465046(0x178)]>0x0)return![];const _0x5b1651=$gamePlayer['x'],_0x123be0=$gamePlayer['y'],_0x4ce798=this[_0x465046(0x3a9)]['x'],_0x10dd7e=this[_0x465046(0x3a9)]['y'];if(this[_0x465046(0x3b4)]===_0x5b1651&&this[_0x465046(0x215)]===_0x123be0&&this[_0x465046(0x575)]===_0x4ce798&&this[_0x465046(0x5c0)]===_0x10dd7e)return this[_0x465046(0x372)];this[_0x465046(0x3b4)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x465046(0x575)]=this['_event']['x'],this[_0x465046(0x5c0)]=this[_0x465046(0x3a9)]['y'];if($gameMap[_0x465046(0x541)](_0x5b1651,_0x123be0,_0x4ce798,_0x10dd7e)>this[_0x465046(0x3a9)][_0x465046(0x4be)]()){if('yVeei'==='yVeei')return this['_cacheVisibility']=![],![];else{if(!_0x1d2aa6[_0x465046(0x10a)]())return;_0x2564d5[_0x465046(0x2ff)](_0xa6c2ab,_0xc8d9d5);let _0x48792f=0x0;_0x48792f+=_0x4ea1fa[_0x465046(0x223)],_0x48792f+=_0x16ae29['Seconds']*0x3c,_0x48792f+=_0x4c3703[_0x465046(0x52c)]*0x3c*0x3c,_0x48792f+=_0x1f0f9f[_0x465046(0x433)]*0x3c*0x3c*0x3c,_0x21f8d5['setFrames'](_0x48792f);}}return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x3ec)]=function(){const _0x3eadad=_0x2a2f60;return VisuMZ[_0x3eadad(0x193)][_0x3eadad(0x430)][_0x3eadad(0x395)][_0x3eadad(0x53d)];},Window_EventLabel[_0x2a2f60(0x354)]['resizeWindow']=function(){const _0x25fe35=_0x2a2f60,_0x34c00f=this[_0x25fe35(0x139)](this[_0x25fe35(0x2d8)]);this[_0x25fe35(0x627)]=_0x34c00f['width']+($gameSystem[_0x25fe35(0x46f)]()+this[_0x25fe35(0x1c6)]())*0x2,this[_0x25fe35(0x5cf)]=Math['max'](this[_0x25fe35(0x282)](),_0x34c00f[_0x25fe35(0x5cf)])+$gameSystem[_0x25fe35(0x46f)]()*0x2,this[_0x25fe35(0x134)]();},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x282)]=function(){const _0x2155ad=_0x2a2f60;return VisuMZ['EventsMoveCore']['Settings'][_0x2155ad(0x395)][_0x2155ad(0x252)];},Window_EventLabel['prototype'][_0x2a2f60(0x405)]=function(){const _0x56b7a4=_0x2a2f60;Window_Base[_0x56b7a4(0x354)][_0x56b7a4(0x405)][_0x56b7a4(0x3be)](this),this[_0x56b7a4(0x14e)][_0x56b7a4(0x53b)]=this[_0x56b7a4(0x23f)]();},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x23f)]=function(){const _0x39c798=_0x2a2f60;return VisuMZ[_0x39c798(0x193)][_0x39c798(0x430)]['Label']['FontSize'];},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x3d1)]=function(){const _0x5ecfce=_0x2a2f60;this['resizeWindow'](),this['contents'][_0x5ecfce(0x289)]();const _0x2e455f=this[_0x5ecfce(0x2d8)][_0x5ecfce(0x569)](/[\r\n]+/);let _0xbee8a2=0x0;for(const _0x4f3276 of _0x2e455f){const _0x475096=this[_0x5ecfce(0x139)](_0x4f3276),_0x4e2c22=Math[_0x5ecfce(0x24f)]((this[_0x5ecfce(0x5dc)]-_0x475096['width'])/0x2);this[_0x5ecfce(0x656)](_0x4f3276,_0x4e2c22,_0xbee8a2),_0xbee8a2+=_0x475096[_0x5ecfce(0x5cf)];}},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x530)]=function(_0x16fbbf,_0x174a64){const _0x1cefc6=_0x2a2f60;_0x174a64[_0x1cefc6(0x44a)]&&this[_0x1cefc6(0x259)](_0x16fbbf,_0x174a64['x']+0x2,_0x174a64['y']),_0x174a64['x']+=Math[_0x1cefc6(0x15a)](this[_0x1cefc6(0x3a4)](),ImageManager[_0x1cefc6(0x34b)])+0x4;},Window_EventLabel[_0x2a2f60(0x354)][_0x2a2f60(0x259)]=function(_0x2a35bf,_0x3601c8,_0x4b0615){const _0xb6c665=_0x2a2f60,_0x1ee9b0=ImageManager[_0xb6c665(0x3d2)]('IconSet'),_0x420034=ImageManager[_0xb6c665(0x34b)],_0x2a26a5=ImageManager['iconHeight'],_0x963b38=_0x2a35bf%0x10*_0x420034,_0x9486b4=Math[_0xb6c665(0x24f)](_0x2a35bf/0x10)*_0x2a26a5,_0x54505f=Math[_0xb6c665(0x15a)](this[_0xb6c665(0x3a4)]()),_0x3715dc=Math['min'](this[_0xb6c665(0x3a4)]());this[_0xb6c665(0x14e)][_0xb6c665(0x3cd)](_0x1ee9b0,_0x963b38,_0x9486b4,_0x420034,_0x2a26a5,_0x3601c8,_0x4b0615,_0x54505f,_0x3715dc);},Window_EventLabel[_0x2a2f60(0x354)]['iconSize']=function(){const _0x178da6=_0x2a2f60;return VisuMZ[_0x178da6(0x193)][_0x178da6(0x430)][_0x178da6(0x395)][_0x178da6(0x4ed)];};