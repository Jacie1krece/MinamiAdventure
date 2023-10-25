//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.44;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.44] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x1e5274=_0x2d16;(function(_0x3ff980,_0x3a7aac){const _0x3ff9a4=_0x2d16,_0x46a40c=_0x3ff980();while(!![]){try{const _0x18cb30=-parseInt(_0x3ff9a4(0x526))/0x1*(-parseInt(_0x3ff9a4(0x27b))/0x2)+parseInt(_0x3ff9a4(0x20b))/0x3+parseInt(_0x3ff9a4(0x24b))/0x4+parseInt(_0x3ff9a4(0x34a))/0x5*(parseInt(_0x3ff9a4(0x25c))/0x6)+-parseInt(_0x3ff9a4(0x2f8))/0x7*(parseInt(_0x3ff9a4(0x431))/0x8)+parseInt(_0x3ff9a4(0x3b0))/0x9*(parseInt(_0x3ff9a4(0x4f1))/0xa)+-parseInt(_0x3ff9a4(0x25a))/0xb;if(_0x18cb30===_0x3a7aac)break;else _0x46a40c['push'](_0x46a40c['shift']());}catch(_0x3b20e1){_0x46a40c['push'](_0x46a40c['shift']());}}}(_0x494e,0xad262));function _0x494e(){const _0x51442e=['defaultColor','textColor','isVolumeSymbol','\x1bTEXTALIGNMENT[2]','_cancelButton','48708XBgWRJ','skill','_maxShuffleChoices','ENABLE','black','setWordWrap','isChoiceEnabled','SortObjectByKeyLength','actorName','Rypgv','_pictures','isColorLocked','_textDelay','addMessageCoreCommands','updateHelp','text','slice','needsPictureTextRefresh','item','addGeneralOptions','innerWidth','VisuMZ_1_SkillsStatesCore','uxcqm','Width','width','_itemChoiceVariableId','processAutoSize','call','maxFontSizeInLine','makeItemList','lowerright','_forcedPosition','Window_EventItem_includes','outputHeight','addCommand','maxChoiceWidth','processColorLock','ConfigManager_applyData','blt','zoomScale','FontBiggerCap','_refreshPauseSign','General','<B>','dUqWo','drawSkillCost','_pictureTextRefresh','_commonEventId','process_VisuMZ_MessageCore_TextCodes_Replace','messageWindowRect','SxFBU','_choiceCancelType','MaxRows','process_VisuMZ_MessageCore_AutoColor','<WORDWRAP>','[0]','CreateAutoColorRegExpListEntries','Window_NameBox_updatePlacement','COMMONEVENT','Game_System_initialize','processCharacter','orange','qwpZA','messageCoreWindowX','TBJXw','makeData','_textColorStack','tXAkK','Xdiuj','#707070','atypeId','Window_ChoiceList_updatePlacement','refreshDimmerBitmap','DISABLE','battle\x20enemy','windowWidth','processCommonEvent','Game_Map_refresh','gainItem','\x1bTEXTALIGNMENT[3]','dqeeo','createContents','_action','test','obtainGold','processFontChangeItalic','<LEFT>','</CENTER>','tvswC','halRq','resetWordWrap','WAIT','EVAL','resizePictureText','Game_Screen_clearPictures','Uwjyb','MzrBj','addWindow','SHOW','Pkflz','Weapons','updateOverlappingY','fontFace','ptAzU','prepareAutoSizeEscapeCharacters','battle\x20actor','levelUp','NMkxp','yRBhS','attachPictureText','getMessageWindowXyOffsets','messageCoreTextSpeed','FontSmallerCap','MessageWindowXyOffsets','fontItalic','Window_Message_synchronizeNameBox','processStoredAutoColorChanges','fontBold','calcMoveEasing','AutoColorBypassList','_autoSizeCheck','CGjad','setChoiceListLineHeight','textSizeEx','TextColor','map','center','isSceneMap','menu','1728IqKItT','databaseObjectName','\x1bITALIC[0]','true','clearPictures','jJVnA','ARRAYJSON','split','ActionJS','_wordWrap','_moveTargetY','xTqAa','registerResetRect','startY','AddOption','random','setMessageWindowXyOffsets','inBattle','commandName','\x1bCOLORLOCK[0]','_moveTargetWidth','_textDelayCount','YQeIG','_autoSizeRegexp','ARRAYSTR','processCustomWait','textSizeExWordWrap','getTextAlignment','STRUCT','_resetRect','qcBVv','resetPositionX','TextCodeActions','prepareForcedPositionEscapeCharacters','ParseArmorNotetags','Game_Party_initialize','klSgi','NameBoxWindowOffsetY','messageRows','ConvertTextAutoColorRegExpFriendly','lastGainedObjectQuantity','applyData','flushTextState','LMQMm','open','\x1bC[%1]%2\x1bPREVCOLOR[0]','setMessageWindowWordWrap','PictureIDs','\x1bWrapJpBreak[0]','calcWindowHeight','return\x200','isHelpWindowWordWrap','requestPictureTextRefresh','callCancelHandler','ShuffleArray','_macroBypassWordWrap','itemChoiceWtypeId','setRelativePosition','CommonEvent','setupChoices','setupNumInput','updateBitmap','updateAutoPosition','GzxqP','_autoPosRegExp','instantTextSpeed','ParseStateNotetags','<LINE\x20BREAK>','length','ParseEnemyNotetags','onNewPageMessageCore','Window_Message_terminateMessage','yellow','Window_Options_changeVolume','_eventId','dTWoo','changePaintOpacity','_choiceListHelpWindow','processPyTextCode','constructor','ANY','round','addExtraShowChoices','updateXyOffsets','setMessageWindowRows','etypeId','createTextState','WoxlK','Game_Map_updateEvents','MsgWindowOffsetX','Window_Help_refresh','actor','realPictureId','AutoColor','move','HelpWindow','_itemChoiceStypeId','list','processWrapBreak','anchor','inputtingAction','isMessageWindowWordWrap','ZvFYu','Window_Base_processNewLine','_positionType','TextAlign','parseChoiceText','Settings','convertMessageCoreEscapeActions','changeChoiceBackgroundColor','defeat','_messagePositionReset','itemBackColor2','setWaitMode','uPKyh','description','Enemies','peKJm','isSkillHidden','YBflv','choices','Game_Interpreter_PluginCommand','bzNpi','</I>','isInputting','Game_Screen_erasePicture','Rows','resetTextColor','strokeRect','eLxpV','setArmorChoice','convertNewPageTextStateMacros','setBackground','_textMacroFound','makeDeepCopy','randomInt','changeOutlineColor','ParseSkillNotetags','processControlCharacter','textSpeedStatusText','_itemChoiceItypeId','clear','_messageOffsetX','makeFontBigger','HIDE','maxCommands','MESSAGE_CORE_PLUGIN_NAME','autoPositionOffsetY','members','NameBoxWindowOffsetX','Cuyhl','ChoiceWindowLineHeight','\x1bTEXTALIGNMENT[1]','registerSelfEvent','_targets','#fff799','Window_Base_processControlCharacter','addMessageCommonEvent','launchMessageCommonEvent','getPreservedFontSettings','AHJpc','victory','_choiceIndexArray','textWidth','itemChoiceEtypeId','SelectSkill','placeCancelButton','FastForwardKey','_helpWindow','_MessageCoreSettings','#ffc8e0','crisisColor','replace','sUGvb','XnOcn','_textAlignment','setLastPluginCommandInterpreter','YNIoI','MsgWindowOffsetY','setChoiceListHelpWindow','resetFontSettings','itemPadding','visible','AutoColorRegExp','messageWidth','updateRelativePosition','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','name','processDrawPicture','isBusy','ArmorTypeID','\x5c%1','1100VRZbAu','isPressed','OTUNe','\x1bi[%1]%2','changeVolume','scale','choiceLineHeight','maxLines','<BR>','version','itemRect','NYfmm','WJlDx','system','XZzTt','ITALIC','update','min','Undefined','ConvertParams','_subject','_choiceListWindow','rQvGv','textCodeCheck','getColor','adjustShowChoiceExtension','windowPadding','_pictureId','CFavx','FontChangeValue','getChoiceIndent','CqlLK','(((','WordWrap','drawCustomBackgroundColor','colSpacing','push','hcSMu','zFMuq','processAutoColorWords','TextStr','registerCommand','choice','obtainExp','processAutoPosition','isWeapon','rtl','TzdYS','convertLockColorsEscapeCharacters','convertHardcodedEscapeReplacements','obtainItem','VisuMZ_1_EventsMoveCore','setSkillChoice','1uXbpcj','setLastGainedItemData','Match','</RIGHT>','mYwil','moveTo','convertEscapeCharacters','clampPlacementPosition','Window_Base_update','applyMoveEasing','textSizeExTextAlignment','iSsKx','canMove','ZTbPD','setTextDelay','nWEhQ','clearChoiceHelpDescriptions','helpWordWrap','MessageWindowProperties','armor','isSceneBattle','ARRAYEVAL','HeeLy','TextManager_message','SelectWeapon','Game_Map_initialize','\x1bITALIC[1]','setChoiceListMaxColumns','preConvertEscapeCharacters','\x1bTEXTALIGNMENT','sRDaS','mainFontFace','none','ConfigManager_makeData','clearActorNameAutoColor','convertMessageCoreEscapeReplacements','substr','MessageWindow','blue','setupItemChoice','setChoiceListTextAlign','createChoiceListWindow','drawItem','itemRectWithPadding','_relativePosition','BVPsI','setHelpWindowWordWrap','prepareShowTextFollowups','upperright','easeIn','setPositionType','fuVNy','hgVRj','processPxTextCode','openness','BxRrL','processDrawCenteredPicture','bind','map\x20party','TextMacros','HFTLA','Instant','TextColor%1','Skills','getPictureText','isRunning','itemHeight','updateMessageCommonEvents','weapon','convertVariableEscapeCharacters','ParseWeaponNotetags','outlineWidth','includes','getMessageWindowRows','_moveEasingType','eraseAllPictureTexts','_pictureTextHeight','convertChoiceMacros','Window_MessageLog','BOLD','PictureTextChange','tCWWz','textSizeExRaw','choiceTextAlign','splice','gray','padding','commandSymbol','wFYzd','MessageCore','MessageRows','#acacac','map\x20player','jqxwx','synchronizeNameBox','Window_Message_isTriggered','isChoiceVisible','isCommandEnabled','TightWrap','TextCodeReplace','makeCommandList','max','ParseAddedText','2614821UAcBou','currentCommand','setup','Window_Base_changeTextColor','add','convertTextMacros','isRTL','_colorLock','<COLORLOCK>','isWordWrapEnabled','escapeStart','Items','value','wFuSk','applyDatabaseAutoColor','Window_ItemList_drawItemNumber','clearAllPictureTexts','choiceIndexArray','OffsetX','indent','process_VisuMZ_MessageCore_TextMacros','violet','QserL','EquipTypeID','CvSMg','_dimmerSprite','URQZX','_autoPositionTarget','isArmor','contents','ALL','purple','remove','CwUEe','_pictureTextWindow','preemptive','contentsBack','getPictureTextBuffer','wPDcC','girQo','PHCcd','NErnc','_itemChoiceAtypeId','_nameBoxWindow','adjustShowChoiceCancel','EAkCT','chunJ','CreateAutoColorFor','ChoiceWindowTextAlign','TextSpeed','itemBackColor1','requestPictureTextRefreshAll','match','Game_Interpreter_setupChoices','prepareWordWrapEscapeCharacters','cgltU','changeTextColor','SWITCHES','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','clearFlags','TextJS','Scene_Options_maxCommands','convertFontSettingsEscapeCharacters','textCodeResult','4963928jrOqFU','getLastGainedItemData','format','initMessageCore','convertButtonAssistEscapeCharacters','JSON','DQfNU','Name','_scene','Sprite_Picture_updateBitmap','<%1>','battleTargetName','processAllText','getChoiceListMaxRows','isChoiceWindow','38479540lgOajU','BlXzJ','30XrXHto','GUjoL','makeFontSmaller','changeTextSpeed','itemChoiceActor','Window_ChoiceList','obtainEscapeParam','AdjustRect','processMessageCoreEscapeActions','_pictureTextSprite','right','battle\x20party','toLowerCase','JVnyp','createPictureText','outputWidth','updateMove','Window_ChoiceList_callCancelHandler','Window_Base_textSizeEx','MessageWidth','drawBackCenteredPicture','clearRect','#f26c4f','white','ParseAllNotetags','addedHeight','outLineColor','height','maxCols','down','createChoiceListHelpWindow','1246702raKPhs','prepareShowTextCommand','faceWidth','ActorID','updateDimensions','#6dcff6','contentsHeight','Window_Options_addGeneralOptions','event','processNewLine','WRAPBREAK','_lastGainedItemData','choiceRows','unshift','brown','isSkillTypeMatchForUse','prepareShowTextPluginCommandFollowups','drawTextEx','processTextAlignmentX','_target','ARRAYNUM','setText','Window_Message_needsNewPage','anyPictureTextChanges','convertTextAlignmentEscapeCharacters','_messageCommonEvents','updateEvents','quantity','newPage','_pictureText','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','resetRect','iPQTZ','_indent','ParseClassNotetags','_messageOffsetY','Window_Base_initialize','stringify','ceil','addContinuousShowChoices','processTextAlignmentChange','bitmap','paintOpacity','fontSize','updateOffsetPosition','isTriggered','kbrHg','getRandomTextFromPool','REtFu','left','addContinuousShowTextCommands','CreateAutoColorRegExpLists','setPictureTextBuffer','mRekC','startX','iconIndex','drawBackPicture','follower','_texts','saAxa','\x1bI[%1]','ZRTTl','battleActionName','ZyUYK','false','preFlushTextState','cancel','startWait','ByfeA','SESeP','red','parse','filter','WRAPJPBREAK','shift','updateTransform','_currentAutoSize','command357','_showFast','boxWidth','isBreakShowTextCommands','changeValue','trim','CENTERPICTURE','battleUserName','addChildAt','addWrapBreakAfterPunctuation','choiceCols','message','_moveDuration','getChoiceListLineHeight','\x1bBOLD[0]','_pictureTextBuffer','poLyj','LineBreakSpace','callOkHandler','WeaponTypeID','hide','dGlKP','postFlushTextState','setWeaponChoice','updatePlacement','RelativePXPY','indexOf','Scene_Message_createChoiceListWindow','moveBy','convertBackslashCharacters','_wholeMoveDuration','Window_Message_newPage','JIGQJ','postConvertEscapeCharacters','Window_Message_processEscapeCharacter','AddAutoColor','isSkill','convertShowChoiceEscapeCodes','choiceCancelType','processFsTextCode','upperleft','urAqK','currencyUnit','itemChoiceStypeId','easeOut','bxjUv','EgzQl','stretchDimmerSprite','13979UBjBXg','itemChoiceItypeId','_autoColorActorNames','clamp','boxHeight','exec','Sprite_Picture_update','setTextAlignment','choiceListHelpWindowRect','vzLIl','_list','lowerleft','join','drawItemNumber','FdgZn','_choices','isAutoColorAffected','Scene_Boot_onDatabaseLoaded','nextEventCode','KQgNi','substring','tRJQF','Window_Options_isVolumeSymbol','</WORDWRAP>','VisuMZ_3_ActSeqCamera','start','getSkillTypes','innerHeight','<CENTER>','vaAhz','ChoiceWindowMaxCols','UAFgm','drawPictureText','messagePositionReset','emerge','vAaZi','toUpperCase','States','getChoiceListMaxColumns','\x1bCOLORLOCK[1]','processEscapeCharacter','anchorPictureText','PICTURE','_itemChoiceEtypeId','_itemChoiceWtypeId','powerUpColor','drawing','aIQTy','clearPictureTextRefresh','setSpeakerName','tTxFn','_interpreter','onProcessCharacter','outlineColor','setColorLock','DefaultOutlineWidth','isContinuePrepareShowTextCommands','setMessageWindowWidth','iGtsn','default','process_VisuMZ_MessageCore_TextCodes_Action','addMessageCoreTextSpeedCommand','activate','erasePictureTextBuffer','OffsetY','needsNewPage','some','processActorNameAutoColorChanges','return\x20\x27','sort','onDatabaseLoaded','#7cc576','command101','ChoiceWindowMaxRows','getLastPluginCommandInterpreter','setPictureText','_pictureTextWidth','Window_Message_clearFlags','<RIGHT>','getChoiceListTextAlign','messageWordWrap','normalColor','1307450ZJWVEx','makeSkillList','setupEvents','addedWidth','type','convertButtonAssistText','Window_Options_statusText','xWZwI','floor','zQWsR','hasPictureText','StretchDimmedBg','wIQwe','ChoiceWindowProperties','OFQoL','_index','exit','map\x20actor','updateChoiceListHelpWindowPlacement','Default','initialize','Window_ChoiceList_windowX','prototype','gradientFillRect','DnPOc','_moveTargetHeight','itemChoiceAtypeId','</B>','SplitJpCnCharacters','Actors','followers','updatePictureText','surprise','EndPadding','textSpeed','Window_NameBox_refresh','partyMemberName','getPictureTextData','\x1bTEXTALIGNMENT[0]','Classes',')))','VisuMZ_0_CoreEngine','maxShuffleChoices','Armors','TEXTALIGNMENT','_centerMessageWindow','processPreviousColor','LineHeight','drawPictureTextZone','applyChoiceHelpDescriptions','show','_messageWindow','_pictureTextCache','initTextAlignement','terminateMessage','grey','statusText','parameters','Window_Base_processAllText','registerActorNameAutoColorChanges','map\x20event','updateForcedPlacement','getConfigValue','Xkabq','setChoiceListMaxRows','VariableID','YKtMv','getStartingChoiceWidth','Type','_data','wtypeId','getMessageWindowWidth','setupShuffleChoices','lastGainedObjectName','WORD_WRAP_PADDING','_choiceHelpDescriptions','addLoadListener','_moveTargetX','loadPicture','returnPreservedFontSettings','adjustShowChoiceDefault','ParseItemNotetags','NgPDG','code','</LEFT>','bVEbs','_spriteset','selectDefault','bKQcO','updateAutoSizePosition','refresh','faceName','updateNameBoxMove','obtainEscapeString','index','ARRAYFUNC','MessageTextDelay'];_0x494e=function(){return _0x51442e;};return _0x494e();}var label=_0x1e5274(0x1fd),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1e5274(0x2c3)](function(_0xea7df1){const _0x285ce4=_0x1e5274;return _0xea7df1['status']&&_0xea7df1['description'][_0x285ce4(0x1ec)]('['+label+']');})[0x0];VisuMZ[label][_0x1e5274(0x49c)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1e5274(0x504)]=function(_0x5dfbc5,_0x334641){const _0x4b69a0=_0x1e5274;for(const _0x5bfefc in _0x334641){if('TiBmL'!==_0x4b69a0(0x317)){if(_0x5bfefc['match'](/(.*):(.*)/i)){const _0x12980c=String(RegExp['$1']),_0x48d105=String(RegExp['$2'])['toUpperCase']()[_0x4b69a0(0x2cd)]();let _0x562951,_0x4e8fb3,_0xd4445b;switch(_0x48d105){case'NUM':_0x562951=_0x334641[_0x5bfefc]!==''?Number(_0x334641[_0x5bfefc]):0x0;break;case _0x4b69a0(0x28f):_0x4e8fb3=_0x334641[_0x5bfefc]!==''?JSON[_0x4b69a0(0x2c2)](_0x334641[_0x5bfefc]):[],_0x562951=_0x4e8fb3[_0x4b69a0(0x42d)](_0x5f2c7d=>Number(_0x5f2c7d));break;case _0x4b69a0(0x40c):_0x562951=_0x334641[_0x5bfefc]!==''?eval(_0x334641[_0x5bfefc]):null;break;case _0x4b69a0(0x53b):_0x4e8fb3=_0x334641[_0x5bfefc]!==''?JSON[_0x4b69a0(0x2c2)](_0x334641[_0x5bfefc]):[],_0x562951=_0x4e8fb3[_0x4b69a0(0x42d)](_0x27e4e6=>eval(_0x27e4e6));break;case _0x4b69a0(0x250):_0x562951=_0x334641[_0x5bfefc]!==''?JSON['parse'](_0x334641[_0x5bfefc]):'';break;case _0x4b69a0(0x437):_0x4e8fb3=_0x334641[_0x5bfefc]!==''?JSON['parse'](_0x334641[_0x5bfefc]):[],_0x562951=_0x4e8fb3[_0x4b69a0(0x42d)](_0x5bf205=>JSON[_0x4b69a0(0x2c2)](_0x5bf205));break;case'FUNC':_0x562951=_0x334641[_0x5bfefc]!==''?new Function(JSON['parse'](_0x334641[_0x5bfefc])):new Function(_0x4b69a0(0x463));break;case _0x4b69a0(0x3a9):_0x4e8fb3=_0x334641[_0x5bfefc]!==''?JSON[_0x4b69a0(0x2c2)](_0x334641[_0x5bfefc]):[],_0x562951=_0x4e8fb3[_0x4b69a0(0x42d)](_0x71629b=>new Function(JSON[_0x4b69a0(0x2c2)](_0x71629b)));break;case'STR':_0x562951=_0x334641[_0x5bfefc]!==''?String(_0x334641[_0x5bfefc]):'';break;case _0x4b69a0(0x449):_0x4e8fb3=_0x334641[_0x5bfefc]!==''?JSON['parse'](_0x334641[_0x5bfefc]):[],_0x562951=_0x4e8fb3['map'](_0x4e58aa=>String(_0x4e58aa));break;case _0x4b69a0(0x44d):_0xd4445b=_0x334641[_0x5bfefc]!==''?JSON['parse'](_0x334641[_0x5bfefc]):{},_0x5dfbc5[_0x12980c]={},VisuMZ[_0x4b69a0(0x504)](_0x5dfbc5[_0x12980c],_0xd4445b);continue;case'ARRAYSTRUCT':_0x4e8fb3=_0x334641[_0x5bfefc]!==''?JSON[_0x4b69a0(0x2c2)](_0x334641[_0x5bfefc]):[],_0x562951=_0x4e8fb3['map'](_0x3519a9=>VisuMZ[_0x4b69a0(0x504)]({},JSON['parse'](_0x3519a9)));break;default:continue;}_0x5dfbc5[_0x12980c]=_0x562951;}}else this[_0x4b69a0(0x3c8)]=_0x5958da['min'](this[_0x4b69a0(0x3c8)],_0x529ebd[_0x4b69a0(0x3c8)]),this['height']=_0x2b879b[_0x4b69a0(0x502)](this[_0x4b69a0(0x277)],_0x2d6489[_0x4b69a0(0x277)]);}return _0x5dfbc5;},(_0x2cdcd9=>{const _0x23ce12=_0x1e5274,_0x59117b=_0x2cdcd9[_0x23ce12(0x4ec)];for(const _0x58eb41 of dependencies){if(_0x23ce12(0x2ab)!==_0x23ce12(0x2ab)){if(!_0x2b2cf2||!_0x202d4e)return-0x1;return _0x25c957['Match'][_0x23ce12(0x475)]-_0x1fb44f[_0x23ce12(0x528)][_0x23ce12(0x475)];}else{if(!Imported[_0x58eb41]){if(_0x23ce12(0x239)!==_0x23ce12(0x239))return _0x125be9[_0x23ce12(0x1fd)][_0x23ce12(0x26e)]['call'](this,_0x29ec0e);else{alert(_0x23ce12(0x299)[_0x23ce12(0x24d)](_0x59117b,_0x58eb41)),SceneManager[_0x23ce12(0x35a)]();break;}}}}const _0x233dc8=_0x2cdcd9[_0x23ce12(0x4a4)];if(_0x233dc8[_0x23ce12(0x23f)](/\[Version[ ](.*?)\]/i)){const _0xcd4513=Number(RegExp['$1']);_0xcd4513!==VisuMZ[label][_0x23ce12(0x4fa)]&&(alert(_0x23ce12(0x245)[_0x23ce12(0x24d)](_0x59117b,_0xcd4513)),SceneManager[_0x23ce12(0x35a)]());}if(_0x233dc8[_0x23ce12(0x23f)](/\[Tier[ ](\d+)\]/i)){const _0x3d1983=Number(RegExp['$1']);if(_0x3d1983<tier){if(_0x23ce12(0x413)!==_0x23ce12(0x413))return this[_0x23ce12(0x43a)];else alert(_0x23ce12(0x4eb)[_0x23ce12(0x24d)](_0x59117b,_0x3d1983,tier)),SceneManager[_0x23ce12(0x35a)]();}else{if(_0x23ce12(0x3b9)===_0x23ce12(0x3b9))tier=Math[_0x23ce12(0x209)](_0x3d1983,tier);else{const _0x44be45=_0x2d2e[_0x23ce12(0x438)](',')[_0x23ce12(0x42d)](_0x4b4547=>_0x496358(_0x4b4547)||0x0);let _0x333750=_0x44be45[0x0]||0x0,_0x5d7bc2=_0x44be45[0x1]||0x0;return _0x3ea439['setMessageWindowXyOffsets'](_0x333750,_0x5d7bc2),'';}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x23ce12(0x49c)],_0x2cdcd9[_0x23ce12(0x383)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1e5274(0x4ec)],_0x1e5274(0x357),_0x2fa160=>{const _0x13a54d=_0x1e5274;VisuMZ['ConvertParams'](_0x2fa160,_0x2fa160);const _0x14d39d=_0x2fa160[_0x13a54d(0x379)]||$gameSystem[_0x13a54d(0x2d5)]()||0x1,_0x40f2dd=_0x2fa160[_0x13a54d(0x3e4)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x17b9a2=_0x2fa160['MaxCols']||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x662e4d=_0x2fa160[_0x13a54d(0x49a)]['toLowerCase']()||'default';$gameSystem['setChoiceListLineHeight'](_0x14d39d),$gameSystem['setChoiceListMaxRows'](_0x40f2dd),$gameSystem[_0x13a54d(0x541)](_0x17b9a2),$gameSystem[_0x13a54d(0x54e)](_0x662e4d);}),PluginManager[_0x1e5274(0x51a)](pluginData['name'],_0x1e5274(0x538),_0x26d3ef=>{const _0x3f1ba0=_0x1e5274;VisuMZ[_0x3f1ba0(0x504)](_0x26d3ef,_0x26d3ef);const _0x5d22d6=_0x26d3ef[_0x3f1ba0(0x4af)]||$gameSystem[_0x3f1ba0(0x1ed)]()||0x1,_0x13502b=_0x26d3ef[_0x3f1ba0(0x3c7)]||$gameSystem[_0x3f1ba0(0x391)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0x2cd72e=_0x26d3ef[_0x3f1ba0(0x512)][_0x3f1ba0(0x268)]();$gameSystem['setMessageWindowRows'](_0x5d22d6),$gameSystem[_0x3f1ba0(0x331)](_0x13502b);if([_0x3f1ba0(0x434),_0x3f1ba0(0x2bb)][_0x3f1ba0(0x1ec)](_0x2cd72e)){if('iSsKx'!==_0x3f1ba0(0x531)){_0x1983c6['MessageCore']['ParseClassNotetags']['call'](this,_0x97f255);const _0x53d2ab=_0x42bff5[_0x3f1ba0(0x1fd)][_0x3f1ba0(0x49c)][_0x3f1ba0(0x48e)];_0x14fd85['MessageCore'][_0x3f1ba0(0x23a)](_0x3dc195,_0x53d2ab[_0x3f1ba0(0x371)]);}else $gameSystem[_0x3f1ba0(0x45f)](eval(_0x2cd72e));}const _0x349893=SceneManager[_0x3f1ba0(0x253)]['_messageWindow'];_0x349893&&(_0x349893[_0x3f1ba0(0x40a)](),_0x349893[_0x3f1ba0(0x27f)](),_0x349893['createContents']());}),PluginManager[_0x1e5274(0x51a)](pluginData[_0x1e5274(0x4ec)],_0x1e5274(0x421),_0x56ec55=>{const _0x50df4b=_0x1e5274;VisuMZ[_0x50df4b(0x504)](_0x56ec55,_0x56ec55),$gameSystem['setMessageWindowXyOffsets'](_0x56ec55[_0x50df4b(0x21d)],_0x56ec55[_0x50df4b(0x338)]);const _0x5e531d=SceneManager[_0x50df4b(0x253)][_0x50df4b(0x37d)];_0x5e531d&&(_0x5e531d[_0x50df4b(0x40a)](),_0x5e531d['updateDimensions'](),_0x5e531d[_0x50df4b(0x401)]());}),PluginManager[_0x1e5274(0x51a)](pluginData[_0x1e5274(0x4ec)],_0x1e5274(0x53e),_0x328826=>{const _0x5054f4=_0x1e5274;VisuMZ[_0x5054f4(0x504)](_0x328826,_0x328826),$gameMessage[_0x5054f4(0x2df)](_0x328826[_0x5054f4(0x38b)]||0x0,_0x328826['WeaponTypeID']||0x0);const _0x373f6c=$gameTemp[_0x5054f4(0x342)]();if(_0x373f6c)_0x373f6c['setWaitMode']('message');}),PluginManager['registerCommand'](pluginData[_0x1e5274(0x4ec)],'SelectArmor',_0x32082e=>{const _0x2b025f=_0x1e5274;VisuMZ['ConvertParams'](_0x32082e,_0x32082e),$gameMessage['setArmorChoice'](_0x32082e[_0x2b025f(0x38b)]||0x0,_0x32082e['ArmorTypeID']||0x0,_0x32082e[_0x2b025f(0x222)]||0x0);const _0x16456a=$gameTemp[_0x2b025f(0x342)]();if(_0x16456a)_0x16456a['setWaitMode'](_0x2b025f(0x2d3));}),PluginManager['registerCommand'](pluginData[_0x1e5274(0x4ec)],_0x1e5274(0x4d6),_0x373774=>{const _0x1c11f4=_0x1e5274;VisuMZ['ConvertParams'](_0x373774,_0x373774),$gameMessage[_0x1c11f4(0x525)](_0x373774[_0x1c11f4(0x38b)]||0x0,_0x373774[_0x1c11f4(0x27e)]||0x0,_0x373774['SkillTypeID']||0x0);const _0x4602b6=$gameTemp['getLastPluginCommandInterpreter']();if(_0x4602b6)_0x4602b6['setWaitMode'](_0x1c11f4(0x2d3));}),PluginManager['registerCommand'](pluginData[_0x1e5274(0x4ec)],_0x1e5274(0x1f4),_0x12ff7d=>{const _0x48e03b=_0x1e5274;VisuMZ[_0x48e03b(0x504)](_0x12ff7d,_0x12ff7d);const _0xc5e8ad=_0x12ff7d[_0x48e03b(0x460)]||[],_0x40df9a=_0x12ff7d['Padding']||0x0,_0x35d6f0=[_0x48e03b(0x2f0),'up',_0x48e03b(0x556),_0x48e03b(0x2ac),_0x48e03b(0x42e),_0x48e03b(0x266),_0x48e03b(0x303),_0x48e03b(0x279),_0x48e03b(0x3ce)];for(const _0x264577 of _0xc5e8ad){$gameScreen['setPictureTextBuffer'](_0x264577,_0x40df9a);for(const _0x1360c0 of _0x35d6f0){if(_0x48e03b(0x2c0)!==_0x48e03b(0x332)){if(_0x12ff7d[_0x1360c0]===undefined)continue;$gameScreen['setPictureText'](_0x264577,_0x12ff7d[_0x1360c0],_0x1360c0);}else return!![];}}}),PluginManager[_0x1e5274(0x51a)](pluginData['name'],'PictureTextErase',_0x4d03a5=>{const _0x1851a2=_0x1e5274;VisuMZ[_0x1851a2(0x504)](_0x4d03a5,_0x4d03a5);const _0x5cd667=_0x4d03a5[_0x1851a2(0x460)]||[];for(const _0x1fa78d of _0x5cd667){$gameScreen[_0x1851a2(0x1ef)](_0x1fa78d),$gameScreen[_0x1851a2(0x337)](_0x1fa78d);}}),PluginManager['registerCommand'](pluginData[_0x1e5274(0x4ec)],'PictureTextRefresh',_0x24b3b2=>{$gameScreen['requestPictureTextRefreshAll']();}),VisuMZ[_0x1e5274(0x1fd)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1e5274(0x360)][_0x1e5274(0x33e)],Scene_Boot[_0x1e5274(0x360)][_0x1e5274(0x33e)]=function(){const _0x57f4d5=_0x1e5274;VisuMZ['MessageCore'][_0x57f4d5(0x309)]['call'](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x57f4d5(0x3e0)](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x57f4d5(0x3e5)]();},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3b7)]=function(_0x38699d){const _0x331e38=_0x1e5274,_0x559c8d=VisuMZ[_0x331e38(0x1fd)][_0x331e38(0x49c)][_0x38699d];_0x559c8d[_0x331e38(0x33d)]((_0x4b21ba,_0x4a84a0)=>{const _0x4312e2=_0x331e38;if(!_0x4b21ba||!_0x4a84a0)return-0x1;return _0x4a84a0[_0x4312e2(0x528)][_0x4312e2(0x475)]-_0x4b21ba['Match'][_0x4312e2(0x475)];});},Scene_Boot[_0x1e5274(0x360)][_0x1e5274(0x334)]=function(){const _0x514717=_0x1e5274;VisuMZ[_0x514717(0x1fd)]['SortObjectByKeyLength'](_0x514717(0x451));for(const _0x3616a7 of VisuMZ[_0x514717(0x1fd)]['Settings'][_0x514717(0x451)]){_0x3616a7['Match']=_0x3616a7[_0x514717(0x528)][_0x514717(0x31c)](),_0x3616a7[_0x514717(0x508)]=new RegExp('\x1b'+_0x3616a7[_0x514717(0x528)],'gi'),_0x3616a7[_0x514717(0x24a)]='\x1b'+_0x3616a7[_0x514717(0x528)];if(_0x3616a7[_0x514717(0x38e)]==='')_0x3616a7[_0x514717(0x24a)]+=_0x514717(0x3e7);}},Scene_Boot[_0x1e5274(0x360)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x32841c=_0x1e5274;VisuMZ[_0x32841c(0x1fd)]['SortObjectByKeyLength']('TextCodeReplace');for(const _0x63367b of VisuMZ[_0x32841c(0x1fd)][_0x32841c(0x49c)][_0x32841c(0x207)]){_0x63367b[_0x32841c(0x508)]=new RegExp('\x1b'+_0x63367b[_0x32841c(0x528)]+_0x63367b[_0x32841c(0x38e)],'gi'),_0x63367b['TextStr']!==''&&_0x63367b['TextStr']!==_0x32841c(0x503)?_0x32841c(0x22c)!==_0x32841c(0x22c)?this[_0x32841c(0x52b)](this['_resetRect']['x'],this[_0x32841c(0x44e)]['y'],this['_resetRect'][_0x32841c(0x3c8)],this[_0x32841c(0x44e)][_0x32841c(0x277)],_0x3945b0,_0x408488):_0x63367b['textCodeResult']=new Function('return\x20\x27'+_0x63367b['TextStr'][_0x32841c(0x4dd)](/\\/g,'\x1b')+'\x27'):_0x63367b['textCodeResult']=_0x63367b[_0x32841c(0x247)];}},Scene_Boot[_0x1e5274(0x360)][_0x1e5274(0x21f)]=function(){const _0x5142c1=_0x1e5274;for(const _0xeb12da of VisuMZ[_0x5142c1(0x1fd)][_0x5142c1(0x49c)][_0x5142c1(0x561)]){_0xeb12da[_0x5142c1(0x508)]=new RegExp('\x5c['+_0xeb12da['Match']+'\x5c]','gi');if(_0xeb12da[_0x5142c1(0x519)]!==''&&_0xeb12da[_0x5142c1(0x519)]!=='Undefined'){let _0x13aaa1=_0xeb12da['TextStr'];_0x13aaa1=_0x13aaa1[_0x5142c1(0x4dd)](/\\/g,'\x1b'),_0x13aaa1=_0x13aaa1[_0x5142c1(0x4dd)]('\x27','\x5c\x27'),_0x13aaa1=_0x13aaa1[_0x5142c1(0x4dd)]('\x22','\x5c\x22'),_0xeb12da[_0x5142c1(0x24a)]=new Function(_0x5142c1(0x33c)+_0x13aaa1+'\x27');}else{if(_0x5142c1(0x232)===_0x5142c1(0x4de))return this['_itemChoiceStypeId']||0x0;else _0xeb12da['textCodeResult']=_0xeb12da[_0x5142c1(0x247)];}}},Scene_Boot[_0x1e5274(0x360)][_0x1e5274(0x3e5)]=function(){const _0x411c1e=_0x1e5274,_0x1ac35e=VisuMZ[_0x411c1e(0x1fd)][_0x411c1e(0x49c)][_0x411c1e(0x48e)];!VisuMZ[_0x411c1e(0x274)]&&(VisuMZ['MessageCore']['AddAutoColor']($dataClasses,_0x1ac35e[_0x411c1e(0x371)]),VisuMZ['MessageCore'][_0x411c1e(0x2eb)]($dataSkills,_0x1ac35e['Skills']),VisuMZ[_0x411c1e(0x1fd)][_0x411c1e(0x2eb)]($dataItems,_0x1ac35e[_0x411c1e(0x216)]),VisuMZ[_0x411c1e(0x1fd)]['AddAutoColor']($dataWeapons,_0x1ac35e[_0x411c1e(0x414)]),VisuMZ[_0x411c1e(0x1fd)]['AddAutoColor']($dataArmors,_0x1ac35e[_0x411c1e(0x375)]),VisuMZ[_0x411c1e(0x1fd)][_0x411c1e(0x2eb)]($dataEnemies,_0x1ac35e[_0x411c1e(0x4a5)]),VisuMZ['MessageCore'][_0x411c1e(0x2eb)]($dataStates,_0x1ac35e[_0x411c1e(0x31d)])),VisuMZ['MessageCore'][_0x411c1e(0x2ae)]();},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x427)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x1e5274(0x3db),_0x1e5274(0x365),'<I>',_0x1e5274(0x4ac),_0x1e5274(0x406),_0x1e5274(0x39e),_0x1e5274(0x314),_0x1e5274(0x407),_0x1e5274(0x346),_0x1e5274(0x529),_0x1e5274(0x213),'</COLORLOCK>',_0x1e5274(0x511),_0x1e5274(0x372),_0x1e5274(0x3e6),'</WORDWRAP>',_0x1e5274(0x4f9),_0x1e5274(0x474),'PICTURE',_0x1e5274(0x2ce),'COMMONEVENT','WAIT',_0x1e5274(0x412),_0x1e5274(0x4c1),_0x1e5274(0x3b3),_0x1e5274(0x3f9),'SWITCH',_0x1e5274(0x244),_0x1e5274(0x229),_0x1e5274(0x481)],VisuMZ[_0x1e5274(0x1fd)]['AddAutoColor']=function(_0x41875e,_0x11a03f){const _0x16b98a=_0x1e5274;if(_0x11a03f<=0x0)return;const _0x574d8d=_0x41875e;for(const _0xaebf3b of _0x574d8d){if(!_0xaebf3b)continue;VisuMZ[_0x16b98a(0x1fd)][_0x16b98a(0x23a)](_0xaebf3b,_0x11a03f);}},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x2ae)]=function(){const _0x4d0be0=_0x1e5274;VisuMZ[_0x4d0be0(0x1fd)][_0x4d0be0(0x4e8)]=[];for(let _0x47a965=0x1;_0x47a965<=0x1f;_0x47a965++){if(_0x4d0be0(0x41c)===_0x4d0be0(0x3ee))_0x12ec95=_0x418674[_0x4d0be0(0x4dd)](/\x1bV\[(\d+)\]/gi,(_0x30c7cf,_0x381341)=>this['convertBackslashCharacters'](_0x183d97(_0x18937d[_0x4d0be0(0x217)](_0x4d2418(_0x381341)))));else{const _0x1699b1=_0x4d0be0(0x564)[_0x4d0be0(0x24d)](_0x47a965),_0x5387c=VisuMZ[_0x4d0be0(0x1fd)]['Settings']['AutoColor'][_0x1699b1];_0x5387c[_0x4d0be0(0x33d)]((_0x1a93fe,_0xfc601c)=>{const _0x56846e=_0x4d0be0;if(_0x56846e(0x29b)!==_0x56846e(0x29b)){const _0x3ad2b1=this[_0x56846e(0x487)](_0x307914,0x0,0x0,0x0),_0x3cefce=this['getPreservedFontSettings']();return _0x3ad2b1[_0x56846e(0x326)]=![],this[_0x56846e(0x3b5)](![]),this['processAllText'](_0x3ad2b1),this[_0x56846e(0x3b5)](!![]),this[_0x56846e(0x399)](_0x3cefce),{'width':_0x3ad2b1['outputWidth'],'height':_0x3ad2b1[_0x56846e(0x3d1)]};}else{if(!_0x1a93fe||!_0xfc601c)return-0x1;return _0xfc601c[_0x56846e(0x475)]-_0x1a93fe[_0x56846e(0x475)];}}),this[_0x4d0be0(0x3e8)](_0x5387c,_0x47a965);}}},VisuMZ['MessageCore']['CreateAutoColorRegExpListEntries']=function(_0x564195,_0x22f6aa){const _0x875465=_0x1e5274;for(const _0x1e5edc of _0x564195){if(_0x1e5edc['length']<=0x0)continue;if(/^\d+$/[_0x875465(0x403)](_0x1e5edc))continue;let _0x12aca4=VisuMZ[_0x875465(0x1fd)][_0x875465(0x458)](_0x1e5edc);if(_0x1e5edc['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x45c3ee=new RegExp(_0x12aca4,'i');else{if(_0x875465(0x4e2)==='UFFhc')_0xc3a8b2[_0x875465(0x1fd)][_0x875465(0x40e)]['call'](this),this[_0x875465(0x21b)]();else var _0x45c3ee=new RegExp('\x5cb'+_0x12aca4+'\x5cb','g');}VisuMZ[_0x875465(0x1fd)]['AutoColorRegExp'][_0x875465(0x515)]([_0x45c3ee,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x875465(0x24d)](_0x22f6aa,_0x1e5edc)]);}},VisuMZ['MessageCore'][_0x1e5274(0x458)]=function(_0x18fccf){const _0x7536f6=_0x1e5274;return _0x18fccf=_0x18fccf[_0x7536f6(0x4dd)](/(\W)/gi,(_0x14beb5,_0x1218c3)=>'\x5c%1'[_0x7536f6(0x24d)](_0x1218c3)),_0x18fccf;},VisuMZ['MessageCore'][_0x1e5274(0x29d)]=VisuMZ[_0x1e5274(0x29d)],VisuMZ['ParseClassNotetags']=function(_0x15df36){const _0x47dfc3=_0x1e5274;VisuMZ[_0x47dfc3(0x1fd)][_0x47dfc3(0x29d)][_0x47dfc3(0x3cb)](this,_0x15df36);const _0x2f1676=VisuMZ[_0x47dfc3(0x1fd)][_0x47dfc3(0x49c)][_0x47dfc3(0x48e)];VisuMZ[_0x47dfc3(0x1fd)][_0x47dfc3(0x23a)](_0x15df36,_0x2f1676[_0x47dfc3(0x371)]);},VisuMZ['MessageCore'][_0x1e5274(0x4ba)]=VisuMZ[_0x1e5274(0x4ba)],VisuMZ['ParseSkillNotetags']=function(_0x301630){const _0x378956=_0x1e5274;VisuMZ['MessageCore'][_0x378956(0x4ba)][_0x378956(0x3cb)](this,_0x301630);const _0x3e3a0f=VisuMZ[_0x378956(0x1fd)][_0x378956(0x49c)][_0x378956(0x48e)];VisuMZ['MessageCore'][_0x378956(0x23a)](_0x301630,_0x3e3a0f[_0x378956(0x565)]);},0x7,VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x39b)]=VisuMZ[_0x1e5274(0x39b)],VisuMZ[_0x1e5274(0x39b)]=function(_0x1d2f99){const _0x51e1c1=_0x1e5274;VisuMZ[_0x51e1c1(0x1fd)][_0x51e1c1(0x39b)][_0x51e1c1(0x3cb)](this,_0x1d2f99);const _0x2cae20=VisuMZ[_0x51e1c1(0x1fd)][_0x51e1c1(0x49c)]['AutoColor'];VisuMZ[_0x51e1c1(0x1fd)][_0x51e1c1(0x23a)](_0x1d2f99,_0x2cae20[_0x51e1c1(0x216)]);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x56c)]=VisuMZ[_0x1e5274(0x56c)],VisuMZ[_0x1e5274(0x56c)]=function(_0x106304){const _0x4d4462=_0x1e5274;VisuMZ[_0x4d4462(0x1fd)][_0x4d4462(0x56c)]['call'](this,_0x106304);const _0x1e50d7=VisuMZ[_0x4d4462(0x1fd)][_0x4d4462(0x49c)][_0x4d4462(0x48e)];VisuMZ[_0x4d4462(0x1fd)][_0x4d4462(0x23a)](_0x106304,_0x1e50d7[_0x4d4462(0x414)]);},VisuMZ['MessageCore'][_0x1e5274(0x453)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x1e5274(0x453)]=function(_0x137960){const _0x45ce77=_0x1e5274;VisuMZ[_0x45ce77(0x1fd)][_0x45ce77(0x453)][_0x45ce77(0x3cb)](this,_0x137960);const _0x275802=VisuMZ[_0x45ce77(0x1fd)][_0x45ce77(0x49c)][_0x45ce77(0x48e)];VisuMZ[_0x45ce77(0x1fd)]['CreateAutoColorFor'](_0x137960,_0x275802['Armors']);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x476)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x1e5274(0x476)]=function(_0xda11f3){const _0x5798e4=_0x1e5274;VisuMZ[_0x5798e4(0x1fd)][_0x5798e4(0x476)][_0x5798e4(0x3cb)](this,_0xda11f3);const _0x2a4053=VisuMZ[_0x5798e4(0x1fd)][_0x5798e4(0x49c)]['AutoColor'];VisuMZ[_0x5798e4(0x1fd)][_0x5798e4(0x23a)](_0xda11f3,_0x2a4053[_0x5798e4(0x4a5)]);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x473)]=VisuMZ[_0x1e5274(0x473)],VisuMZ['ParseStateNotetags']=function(_0x8b20a9){const _0x18783c=_0x1e5274;VisuMZ[_0x18783c(0x1fd)][_0x18783c(0x473)]['call'](this,_0x8b20a9);const _0x3aea87=VisuMZ[_0x18783c(0x1fd)][_0x18783c(0x49c)][_0x18783c(0x48e)];VisuMZ['MessageCore'][_0x18783c(0x23a)](_0x8b20a9,_0x3aea87[_0x18783c(0x31d)]);},VisuMZ['MessageCore'][_0x1e5274(0x23a)]=function(_0x55b2ba,_0x583f5c){const _0x5cba6f=_0x1e5274;if(_0x583f5c<=0x0)return;const _0x3cee32=VisuMZ['MessageCore'][_0x5cba6f(0x49c)][_0x5cba6f(0x48e)][_0x5cba6f(0x42c)+_0x583f5c];let _0x4d13da=_0x55b2ba[_0x5cba6f(0x4ec)][_0x5cba6f(0x2cd)]();if(/^\d+$/[_0x5cba6f(0x403)](_0x4d13da))return;if(VisuMZ[_0x5cba6f(0x1fd)][_0x5cba6f(0x427)][_0x5cba6f(0x1ec)](_0x4d13da[_0x5cba6f(0x31c)]()))return;_0x4d13da=_0x4d13da[_0x5cba6f(0x4dd)](/\\I\[(\d+)\]/gi,''),_0x4d13da=_0x4d13da[_0x5cba6f(0x4dd)](/\x1bI\[(\d+)\]/gi,'');if(_0x4d13da['length']<=0x0)return;if(_0x4d13da[_0x5cba6f(0x23f)](/-----/i))return;_0x3cee32[_0x5cba6f(0x515)](_0x4d13da);},SceneManager[_0x1e5274(0x53a)]=function(){const _0x98ae59=_0x1e5274;return this['_scene']&&this[_0x98ae59(0x253)][_0x98ae59(0x480)]===Scene_Battle;},SceneManager[_0x1e5274(0x42f)]=function(){const _0x4acd53=_0x1e5274;return this[_0x4acd53(0x253)]&&this[_0x4acd53(0x253)][_0x4acd53(0x480)]===Scene_Map;},VisuMZ['MessageCore'][_0x1e5274(0x53d)]=TextManager[_0x1e5274(0x2d3)],TextManager[_0x1e5274(0x2d3)]=function(_0x38e21b){const _0x2d5728=_0x1e5274,_0x5a3351=[_0x2d5728(0x41a),_0x2d5728(0x31a),_0x2d5728(0x22e),_0x2d5728(0x36a),_0x2d5728(0x4d2),_0x2d5728(0x49f),_0x2d5728(0x215),_0x2d5728(0x51c),_0x2d5728(0x404),_0x2d5728(0x523)];let _0x57b131=VisuMZ['MessageCore'][_0x2d5728(0x53d)][_0x2d5728(0x3cb)](this,_0x38e21b);return _0x5a3351[_0x2d5728(0x1ec)](_0x38e21b)&&(_0x57b131=_0x2d5728(0x30f)+_0x57b131),_0x57b131;},ConfigManager['textSpeed']=VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x49c)][_0x1e5274(0x23c)][_0x1e5274(0x35d)],VisuMZ['MessageCore']['ConfigManager_makeData']=ConfigManager[_0x1e5274(0x3f1)],ConfigManager[_0x1e5274(0x3f1)]=function(){const _0xf4dec1=_0x1e5274,_0x395dd0=VisuMZ[_0xf4dec1(0x1fd)][_0xf4dec1(0x547)][_0xf4dec1(0x3cb)](this);return _0x395dd0['textSpeed']=this[_0xf4dec1(0x36c)],_0x395dd0;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3d5)]=ConfigManager['applyData'],ConfigManager[_0x1e5274(0x45a)]=function(_0x563f73){const _0x1f2bfc=_0x1e5274;VisuMZ[_0x1f2bfc(0x1fd)][_0x1f2bfc(0x3d5)]['call'](this,_0x563f73),_0x1f2bfc(0x36c)in _0x563f73?this[_0x1f2bfc(0x36c)]=Number(_0x563f73['textSpeed'])['clamp'](0x1,0xb):_0x1f2bfc(0x25d)!==_0x1f2bfc(0x25d)?(this['_choiceHelpDescriptions']={},this[_0x1f2bfc(0x4d9)]&&(this[_0x1f2bfc(0x4d9)]['clear'](),this[_0x1f2bfc(0x4d9)][_0x1f2bfc(0x2dc)]())):this['textSpeed']=VisuMZ[_0x1f2bfc(0x1fd)][_0x1f2bfc(0x49c)][_0x1f2bfc(0x23c)]['Default'];},TextManager[_0x1e5274(0x41f)]=VisuMZ[_0x1e5274(0x1fd)]['Settings'][_0x1e5274(0x23c)][_0x1e5274(0x252)],TextManager['instantTextSpeed']=VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x49c)][_0x1e5274(0x23c)][_0x1e5274(0x563)],Game_Temp[_0x1e5274(0x360)][_0x1e5274(0x4e1)]=function(_0x33912e){this['_lastPluginCommandInterpreter']=_0x33912e;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x4aa)]=Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x2c8)],Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x2c8)]=function(_0x5c6867){const _0x315b7b=_0x1e5274;return $gameTemp[_0x315b7b(0x4e1)](this),VisuMZ[_0x315b7b(0x1fd)][_0x315b7b(0x4aa)]['call'](this,_0x5c6867);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3eb)]=Game_System[_0x1e5274(0x360)][_0x1e5274(0x35e)],Game_System[_0x1e5274(0x360)][_0x1e5274(0x35e)]=function(){const _0xc670f0=_0x1e5274;VisuMZ[_0xc670f0(0x1fd)]['Game_System_initialize']['call'](this),this[_0xc670f0(0x24e)]();},Game_System[_0x1e5274(0x360)][_0x1e5274(0x24e)]=function(){const _0x51e9b5=_0x1e5274,_0xda3358=VisuMZ['MessageCore'][_0x51e9b5(0x49c)][_0x51e9b5(0x3da)],_0x137996=VisuMZ[_0x51e9b5(0x1fd)][_0x51e9b5(0x49c)][_0x51e9b5(0x512)];this[_0x51e9b5(0x4da)]={'messageRows':_0xda3358[_0x51e9b5(0x1fe)],'messageWidth':_0xda3358[_0x51e9b5(0x26f)],'messageWordWrap':_0x137996[_0x51e9b5(0x54b)],'helpWordWrap':_0x137996[_0x51e9b5(0x490)],'choiceLineHeight':_0xda3358[_0x51e9b5(0x4c8)],'choiceRows':_0xda3358[_0x51e9b5(0x341)],'choiceCols':_0xda3358[_0x51e9b5(0x316)],'choiceTextAlign':_0xda3358[_0x51e9b5(0x23b)]},this[_0x51e9b5(0x4bf)]===undefined&&(_0x51e9b5(0x4fc)===_0x51e9b5(0x4fc)?(this[_0x51e9b5(0x4bf)]=_0xda3358['MsgWindowOffsetX'],this[_0x51e9b5(0x29e)]=_0xda3358[_0x51e9b5(0x4e3)]):this['launchMessageCommonEvent'](_0x51f5c9));},Game_System[_0x1e5274(0x360)][_0x1e5274(0x1ed)]=function(){const _0x37c389=_0x1e5274;if(this[_0x37c389(0x4da)]===undefined)this[_0x37c389(0x24e)]();if(this['_MessageCoreSettings'][_0x37c389(0x457)]===undefined)this[_0x37c389(0x24e)]();return this[_0x37c389(0x4da)][_0x37c389(0x457)];},Game_System[_0x1e5274(0x360)][_0x1e5274(0x485)]=function(_0x573271){const _0x3f38c7=_0x1e5274;if(this[_0x3f38c7(0x4da)]===undefined)this[_0x3f38c7(0x24e)]();if(this['_MessageCoreSettings'][_0x3f38c7(0x457)]===undefined)this[_0x3f38c7(0x24e)]();this['_MessageCoreSettings']['messageRows']=_0x573271||0x1;},Game_System[_0x1e5274(0x360)][_0x1e5274(0x391)]=function(){const _0x5a9579=_0x1e5274;if(this[_0x5a9579(0x4da)]===undefined)this[_0x5a9579(0x24e)]();if(this[_0x5a9579(0x4da)][_0x5a9579(0x4e9)]===undefined)this[_0x5a9579(0x24e)]();return this[_0x5a9579(0x4da)][_0x5a9579(0x4e9)];},Game_System[_0x1e5274(0x360)]['setMessageWindowWidth']=function(_0x275b1a){const _0x45a967=_0x1e5274;if(this[_0x45a967(0x4da)]===undefined)this[_0x45a967(0x24e)]();if(this[_0x45a967(0x4da)][_0x45a967(0x4e9)]===undefined)this['initMessageCore']();_0x275b1a=Math[_0x45a967(0x2a1)](_0x275b1a);if(_0x275b1a%0x2!==0x0)_0x275b1a+=0x1;this[_0x45a967(0x4da)]['messageWidth']=_0x275b1a||0x2;},Game_System[_0x1e5274(0x360)]['isMessageWindowWordWrap']=function(){const _0x1323b7=_0x1e5274;if(this[_0x1323b7(0x4da)]===undefined)this[_0x1323b7(0x24e)]();if(this[_0x1323b7(0x4da)][_0x1323b7(0x348)]===undefined)this[_0x1323b7(0x24e)]();return this[_0x1323b7(0x4da)][_0x1323b7(0x348)];},Game_System[_0x1e5274(0x360)]['setMessageWindowWordWrap']=function(_0x17103f){const _0x2fd850=_0x1e5274;if(this[_0x2fd850(0x4da)]===undefined)this[_0x2fd850(0x24e)]();if(this['_MessageCoreSettings']['messageWordWrap']===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x2fd850(0x348)]=_0x17103f;},Game_System['prototype'][_0x1e5274(0x41e)]=function(){const _0x4ce050=_0x1e5274;if(this[_0x4ce050(0x4bf)]===undefined){if('dUqWo'===_0x4ce050(0x3dc)){const _0x296658=VisuMZ[_0x4ce050(0x1fd)][_0x4ce050(0x49c)][_0x4ce050(0x3da)];this[_0x4ce050(0x4bf)]=_0x296658[_0x4ce050(0x48a)],this['_messageOffsetY']=_0x296658[_0x4ce050(0x4e3)];}else this['adjustShowChoiceDefault'](_0x12ec0c,_0x358287,_0x23ce47),this[_0x4ce050(0x237)](_0x402d60,_0x5e1fb4,_0x3bde97),this[_0x4ce050(0x483)](_0x446c95,_0x4304a1);}return{'x':this[_0x4ce050(0x4bf)]||0x0,'y':this[_0x4ce050(0x29e)]||0x0};},Game_System[_0x1e5274(0x360)]['setMessageWindowXyOffsets']=function(_0x4f65e2,_0x436285){const _0x575ee9=_0x1e5274;if(this[_0x575ee9(0x4da)]===undefined)this[_0x575ee9(0x24e)]();this[_0x575ee9(0x4bf)]=_0x4f65e2,this[_0x575ee9(0x29e)]=_0x436285;},Game_System[_0x1e5274(0x360)]['isHelpWindowWordWrap']=function(){const _0x36e529=_0x1e5274;if(this[_0x36e529(0x4da)]===undefined)this['initMessageCore']();if(this[_0x36e529(0x4da)]['helpWordWrap']===undefined)this['initMessageCore']();return this[_0x36e529(0x4da)][_0x36e529(0x537)];},Game_System['prototype'][_0x1e5274(0x554)]=function(_0x1d947f){const _0x62fde5=_0x1e5274;if(this[_0x62fde5(0x4da)]===undefined)this[_0x62fde5(0x24e)]();if(this['_MessageCoreSettings']['helpWordWrap']===undefined)this[_0x62fde5(0x24e)]();this[_0x62fde5(0x4da)][_0x62fde5(0x537)]=_0x1d947f;},Game_System['prototype'][_0x1e5274(0x2d5)]=function(){const _0x594441=_0x1e5274;if(this[_0x594441(0x4da)]===undefined)this[_0x594441(0x24e)]();if(this[_0x594441(0x4da)][_0x594441(0x4f7)]===undefined)this['initMessageCore']();return this[_0x594441(0x4da)]['choiceLineHeight'];},Game_System[_0x1e5274(0x360)][_0x1e5274(0x42a)]=function(_0x5dae7d){const _0x43d19f=_0x1e5274;if(this[_0x43d19f(0x4da)]===undefined)this[_0x43d19f(0x24e)]();if(this[_0x43d19f(0x4da)][_0x43d19f(0x4f7)]===undefined)this[_0x43d19f(0x24e)]();this['_MessageCoreSettings']['choiceLineHeight']=_0x5dae7d||0x1;},Game_System['prototype'][_0x1e5274(0x258)]=function(){const _0x4dff0d=_0x1e5274;if(this[_0x4dff0d(0x4da)]===undefined)this['initMessageCore']();if(this[_0x4dff0d(0x4da)][_0x4dff0d(0x287)]===undefined)this['initMessageCore']();return this[_0x4dff0d(0x4da)][_0x4dff0d(0x287)];},Game_System[_0x1e5274(0x360)][_0x1e5274(0x38a)]=function(_0x16c1b6){const _0x4ecec0=_0x1e5274;if(this[_0x4ecec0(0x4da)]===undefined)this[_0x4ecec0(0x24e)]();if(this[_0x4ecec0(0x4da)][_0x4ecec0(0x287)]===undefined)this['initMessageCore']();this[_0x4ecec0(0x4da)]['choiceRows']=_0x16c1b6||0x1;},Game_System[_0x1e5274(0x360)][_0x1e5274(0x31e)]=function(){const _0x3988c3=_0x1e5274;if(this[_0x3988c3(0x4da)]===undefined)this['initMessageCore']();if(this[_0x3988c3(0x4da)][_0x3988c3(0x2d2)]===undefined)this[_0x3988c3(0x24e)]();return this[_0x3988c3(0x4da)][_0x3988c3(0x2d2)];},Game_System['prototype'][_0x1e5274(0x541)]=function(_0x44391e){const _0x3a03d2=_0x1e5274;if(this[_0x3a03d2(0x4da)]===undefined)this['initMessageCore']();if(this[_0x3a03d2(0x4da)][_0x3a03d2(0x2d2)]===undefined)this[_0x3a03d2(0x24e)]();this['_MessageCoreSettings']['choiceCols']=_0x44391e||0x1;},Game_System['prototype'][_0x1e5274(0x347)]=function(){const _0x292b40=_0x1e5274;if(this[_0x292b40(0x4da)]===undefined)this[_0x292b40(0x24e)]();if(this[_0x292b40(0x4da)]['choiceTextAlign']===undefined)this['initMessageCore']();return this['_MessageCoreSettings']['choiceTextAlign'];},Game_System['prototype']['setChoiceListTextAlign']=function(_0x24c471){const _0x1df521=_0x1e5274;if(this[_0x1df521(0x4da)]===undefined)this[_0x1df521(0x24e)]();if(this['_MessageCoreSettings'][_0x1df521(0x1f7)]===undefined)this['initMessageCore']();this[_0x1df521(0x4da)][_0x1df521(0x1f7)]=_0x24c471['toLowerCase']();},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x2df)]=function(_0x488e8b,_0x1fc1c9){const _0xf9f6ef=_0x1e5274;this[_0xf9f6ef(0x3c9)]=_0x488e8b,this[_0xf9f6ef(0x4bd)]='weapon',this['_itemChoiceWtypeId']=_0x1fc1c9,this['_itemChoiceEtypeId']=0x0;},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x469)]=function(){const _0x17e533=_0x1e5274;return this[_0x17e533(0x324)]||0x0;},Game_Message['prototype'][_0x1e5274(0x4b3)]=function(_0x191aa5,_0x175740,_0x4b6bd6){const _0x551de1=_0x1e5274;this['_itemChoiceVariableId']=_0x191aa5,this[_0x551de1(0x4bd)]='armor',this[_0x551de1(0x235)]=_0x175740,this['_itemChoiceEtypeId']=_0x4b6bd6;},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x364)]=function(){const _0x147b7b=_0x1e5274;return this[_0x147b7b(0x235)]||0x0;},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x4d5)]=function(){return this['_itemChoiceEtypeId']||0x0;},Game_Message['prototype']['setSkillChoice']=function(_0x5b5c5c,_0x2b2033,_0x2dcafc){const _0x4709ef=_0x1e5274;this[_0x4709ef(0x3c9)]=_0x5b5c5c,this['_itemChoiceItypeId']=_0x4709ef(0x3b1),this['_itemChoiceActorId']=_0x2b2033,this[_0x4709ef(0x491)]=_0x2dcafc;},Game_Message[_0x1e5274(0x360)]['itemChoiceActorId']=function(){return this['_itemChoiceActorId']||0x0;},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x260)]=function(){return $gameActors['actor'](this['itemChoiceActorId']())||$gameParty['leader']()||null;},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x2f3)]=function(){const _0x361f05=_0x1e5274;return this[_0x361f05(0x491)]||0x0;},Game_Message[_0x1e5274(0x360)][_0x1e5274(0x392)]=function(){const _0x72cf9f=_0x1e5274;this[_0x72cf9f(0x4d3)]=[];const _0x11cbe3=this[_0x72cf9f(0x307)][_0x72cf9f(0x475)];this['_maxShuffleChoices']=_0x11cbe3;let _0x5d7399=![];for(let _0x9c6243=0x0;_0x9c6243<_0x11cbe3;_0x9c6243++){if(_0x72cf9f(0x52a)!==_0x72cf9f(0x447)){let _0x54cecb=this['_choices'][_0x9c6243];_0x54cecb[_0x72cf9f(0x23f)](/<SHUFFLE>/gi)&&(_0x72cf9f(0x2b8)===_0x72cf9f(0x2b8)?(_0x5d7399=!![],_0x54cecb=_0x54cecb[_0x72cf9f(0x4dd)](/<SHUFFLE>/gi,'')):(this[_0x72cf9f(0x532)]()&&(this['x']=this[_0x72cf9f(0x52f)](this['x'],this[_0x72cf9f(0x397)]),this['y']=this['applyMoveEasing'](this['y'],this['_moveTargetY']),this[_0x72cf9f(0x3c8)]=this[_0x72cf9f(0x52f)](this[_0x72cf9f(0x3c8)],this[_0x72cf9f(0x445)]),this[_0x72cf9f(0x277)]=this[_0x72cf9f(0x52f)](this[_0x72cf9f(0x277)],this[_0x72cf9f(0x363)]),this['clampPlacementPosition']()),this[_0x72cf9f(0x2d4)]--)),_0x54cecb[_0x72cf9f(0x23f)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x5d7399=!![],this[_0x72cf9f(0x3b2)]=Math[_0x72cf9f(0x502)](Number(RegExp['$1']),this[_0x72cf9f(0x3b2)]),_0x54cecb=_0x54cecb['replace'](/<SHUFFLE:[ ](\d+)>/gi,'')),this[_0x72cf9f(0x4d3)][_0x72cf9f(0x515)](_0x9c6243),this[_0x72cf9f(0x307)][_0x9c6243]=_0x54cecb;}else{const _0x43dffb=_0x360108['$1']['split'](',')[_0x72cf9f(0x42d)](_0x870954=>_0x30102e(_0x870954)||0x0);for(const _0x405a9c of _0x43dffb){if(!_0x2f5931[_0x72cf9f(0x217)](_0x405a9c))return!![];}return![];}}if(_0x5d7399){this[_0x72cf9f(0x4d3)]=VisuMZ[_0x72cf9f(0x1fd)][_0x72cf9f(0x467)](this[_0x72cf9f(0x4d3)]);if(this[_0x72cf9f(0x2ee)]()!==-0x2)this[_0x72cf9f(0x3e3)]=-0x1;}},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x467)]=function(_0x1e04a7){const _0x1d91ac=_0x1e5274;var _0x1f0bfc,_0x1b8e32,_0x77bfe4;for(_0x77bfe4=_0x1e04a7[_0x1d91ac(0x475)]-0x1;_0x77bfe4>0x0;_0x77bfe4--){if(_0x1d91ac(0x455)!==_0x1d91ac(0x455)){if(_0x5b7096[_0x1d91ac(0x383)][0x2]<0x0)return;const _0x44b5d0=_0x64bcae[_0x1d91ac(0x383)][0x2]+_0x1505b8;this['_list'][_0xeaeb90]['parameters'][0x2]=_0x44b5d0;}else _0x1f0bfc=Math[_0x1d91ac(0x352)](Math[_0x1d91ac(0x440)]()*(_0x77bfe4+0x1)),_0x1b8e32=_0x1e04a7[_0x77bfe4],_0x1e04a7[_0x77bfe4]=_0x1e04a7[_0x1f0bfc],_0x1e04a7[_0x1f0bfc]=_0x1b8e32;}return _0x1e04a7;},Game_Message['prototype'][_0x1e5274(0x21c)]=function(){const _0x361689=_0x1e5274;if(!this[_0x361689(0x4d3)])this['setupShuffleChoices']();return this[_0x361689(0x4d3)];},Game_Message[_0x1e5274(0x360)]['maxShuffleChoices']=function(){const _0x592c01=_0x1e5274;if(this['_maxShuffleChoices']===undefined)this[_0x592c01(0x392)]();return this['_maxShuffleChoices'];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x40e)]=Game_Screen[_0x1e5274(0x360)]['clearPictures'],Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x435)]=function(){const _0x5d37f3=_0x1e5274;VisuMZ['MessageCore'][_0x5d37f3(0x40e)]['call'](this),this[_0x5d37f3(0x21b)]();},Game_Screen['prototype'][_0x1e5274(0x21b)]=function(){const _0x55dcd0=_0x1e5274;this[_0x55dcd0(0x298)]=[],this[_0x55dcd0(0x2d7)]=[],this['_pictureTextRefresh']=[];},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x36f)]=function(_0x4d7842){const _0x31f8d7=_0x1e5274;if(this[_0x31f8d7(0x298)]===undefined)this[_0x31f8d7(0x21b)]();const _0x99b83=this['realPictureId'](_0x4d7842);return this[_0x31f8d7(0x298)][_0x99b83]=this[_0x31f8d7(0x298)][_0x99b83]||{},this[_0x31f8d7(0x298)][_0x99b83];},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x566)]=function(_0x40490d,_0x2c1178){const _0x46623e=_0x1e5274;return _0x2c1178=_0x2c1178['toLowerCase']()[_0x46623e(0x2cd)](),this[_0x46623e(0x36f)](_0x40490d)[_0x2c1178]||'';},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x343)]=function(_0x3c1496,_0x18c757,_0x186590){const _0x524cee=_0x1e5274;_0x186590=_0x186590[_0x524cee(0x268)]()[_0x524cee(0x2cd)](),this[_0x524cee(0x36f)](_0x3c1496)[_0x186590]=_0x18c757||'',this[_0x524cee(0x465)](_0x3c1496,!![]);},Game_Screen['prototype'][_0x1e5274(0x1ef)]=function(_0x24ecc0){const _0x1598bc=_0x1e5274;if(this['_pictureText']===undefined)this[_0x1598bc(0x21b)]();const _0x3e57cc=this[_0x1598bc(0x48d)](_0x24ecc0);this[_0x1598bc(0x298)][_0x3e57cc]=null,this['requestPictureTextRefresh'](_0x24ecc0,!![]);},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x230)]=function(_0xed6433){const _0x296d26=_0x1e5274;if(this['_pictureText']===undefined)this[_0x296d26(0x21b)]();const _0x36b621=this['realPictureId'](_0xed6433);return this['_pictureTextBuffer'][_0x36b621]||0x0;},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x2af)]=function(_0x297af2,_0x742379){const _0x2a9302=_0x1e5274;if(this[_0x2a9302(0x298)]===undefined)this[_0x2a9302(0x21b)]();const _0x3a07a8=this[_0x2a9302(0x48d)](_0x297af2);this['_pictureTextBuffer'][_0x3a07a8]=Math[_0x2a9302(0x209)](0x0,_0x742379);},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x337)]=function(_0x3a71bc){const _0x1e764f=_0x1e5274;if(this[_0x1e764f(0x298)]===undefined)this['clearAllPictureTexts']();const _0x2f166d=this[_0x1e764f(0x48d)](_0x3a71bc);this[_0x1e764f(0x2d7)][_0x2f166d]=undefined;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x4ae)]=Game_Screen[_0x1e5274(0x360)]['erasePicture'],Game_Screen[_0x1e5274(0x360)]['erasePicture']=function(_0x36c309){const _0x251e33=_0x1e5274;VisuMZ[_0x251e33(0x1fd)][_0x251e33(0x4ae)][_0x251e33(0x3cb)](this,_0x36c309),this[_0x251e33(0x1ef)](_0x36c309),this['erasePictureTextBuffer'](_0x36c309),this[_0x251e33(0x465)](_0x36c309,!![]);},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x23e)]=function(){const _0x231421=_0x1e5274;for(const _0xe19150 of this[_0x231421(0x3ba)]){if(_0xe19150){if(_0x231421(0x520)===_0x231421(0x520)){let _0x5fbd7c=this[_0x231421(0x3ba)][_0x231421(0x2e2)](_0xe19150);this['requestPictureTextRefresh'](_0x5fbd7c);}else return _0x34590f['MessageCore'][_0x231421(0x35f)][_0x231421(0x3cb)](this);}}},Game_Screen['prototype'][_0x1e5274(0x465)]=function(_0x35f538,_0x2cfb85){const _0x3b0299=_0x1e5274;this['_pictureTextRefresh']=this[_0x3b0299(0x3de)]||[],(this[_0x3b0299(0x354)](_0x35f538)||_0x2cfb85)&&this[_0x3b0299(0x3de)][_0x3b0299(0x515)](_0x35f538);},Game_Screen['prototype'][_0x1e5274(0x3c1)]=function(_0x34517a){const _0x22e14e=_0x1e5274;return this[_0x22e14e(0x3de)]=this[_0x22e14e(0x3de)]||[],this['_pictureTextRefresh']['includes'](_0x34517a);},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x328)]=function(_0x381766){const _0x3173b5=_0x1e5274;this['_pictureTextRefresh']=this[_0x3173b5(0x3de)]||[],this[_0x3173b5(0x3de)][_0x3173b5(0x22b)](_0x381766);},Game_Screen[_0x1e5274(0x360)][_0x1e5274(0x354)]=function(_0x3fcc5a){const _0x4d8bda=_0x1e5274,_0x5d0d49=['upperleft','up',_0x4d8bda(0x556),'left','center','right',_0x4d8bda(0x303),'down',_0x4d8bda(0x3ce)];return _0x5d0d49[_0x4d8bda(0x33a)](_0x2fa092=>this[_0x4d8bda(0x566)](_0x3fcc5a,_0x2fa092)!=='');},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x454)]=Game_Party[_0x1e5274(0x360)][_0x1e5274(0x35e)],Game_Party[_0x1e5274(0x360)][_0x1e5274(0x35e)]=function(){const _0x229ef6=_0x1e5274;VisuMZ[_0x229ef6(0x1fd)][_0x229ef6(0x454)]['call'](this),this[_0x229ef6(0x24e)]();},Game_Party[_0x1e5274(0x360)][_0x1e5274(0x24e)]=function(){const _0x8589b4=_0x1e5274;this[_0x8589b4(0x286)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x1e5274(0x360)][_0x1e5274(0x24c)]=function(){const _0x5e19aa=_0x1e5274;if(this[_0x5e19aa(0x286)]===undefined)this[_0x5e19aa(0x24e)]();return this[_0x5e19aa(0x286)];},Game_Party[_0x1e5274(0x360)][_0x1e5274(0x527)]=function(_0x148938,_0x146a75){const _0x1ac0de=_0x1e5274;if(this[_0x1ac0de(0x286)]===undefined)this[_0x1ac0de(0x24e)]();if(!_0x148938)return;if(DataManager['isItem'](_0x148938))this[_0x1ac0de(0x286)][_0x1ac0de(0x34e)]=0x0;else{if(DataManager['isWeapon'](_0x148938))'KYWpq'===_0x1ac0de(0x231)?(this[_0x1ac0de(0x298)]=[],this['_pictureTextBuffer']=[],this[_0x1ac0de(0x3de)]=[]):this['_lastGainedItemData'][_0x1ac0de(0x34e)]=0x1;else{if(DataManager[_0x1ac0de(0x227)](_0x148938)){if(_0x1ac0de(0x3f4)==='WGKkf'){const _0x37eab1=this[_0x1ac0de(0x3a7)](_0x4b8c72)[_0x1ac0de(0x438)](',');if(!_0x2a4940[_0x1ac0de(0x326)])return;const _0x4b09d1=_0x37eab1[0x0][_0x1ac0de(0x2cd)](),_0x56f5a9=_0x37eab1[0x1]||0x0,_0x33165e=_0x37eab1[0x2]||0x0,_0x4725da=_0x311eff[_0x1ac0de(0x398)](_0x4b09d1),_0x402031=this['contents'][_0x1ac0de(0x2a5)];_0x4725da[_0x1ac0de(0x396)](this[_0x1ac0de(0x2b3)][_0x1ac0de(0x55f)](this,_0x4725da,_0x5595d4['x'],_0x6a59e3['y'],_0x56f5a9,_0x33165e,_0x402031));}else this[_0x1ac0de(0x286)][_0x1ac0de(0x34e)]=0x2;}}}this[_0x1ac0de(0x286)]['id']=_0x148938['id'],this['_lastGainedItemData'][_0x1ac0de(0x296)]=_0x146a75;},VisuMZ['MessageCore']['Game_Party_gainItem']=Game_Party[_0x1e5274(0x360)][_0x1e5274(0x3fe)],Game_Party[_0x1e5274(0x360)][_0x1e5274(0x3fe)]=function(_0x1b942d,_0x35de40,_0x24eb9e){const _0x46a22c=_0x1e5274;VisuMZ[_0x46a22c(0x1fd)]['Game_Party_gainItem'][_0x46a22c(0x3cb)](this,_0x1b942d,_0x35de40,_0x24eb9e);if(_0x35de40>0x0){if(_0x46a22c(0x559)===_0x46a22c(0x559))this[_0x46a22c(0x527)](_0x1b942d,_0x35de40);else return!![];}},VisuMZ['MessageCore'][_0x1e5274(0x53f)]=Game_Map[_0x1e5274(0x360)][_0x1e5274(0x35e)],Game_Map[_0x1e5274(0x360)]['initialize']=function(){const _0xc1b361=_0x1e5274;VisuMZ[_0xc1b361(0x1fd)][_0xc1b361(0x53f)][_0xc1b361(0x3cb)](this),this[_0xc1b361(0x294)]=[];},VisuMZ[_0x1e5274(0x1fd)]['Game_Map_setupEvents']=Game_Map[_0x1e5274(0x360)][_0x1e5274(0x34c)],Game_Map[_0x1e5274(0x360)][_0x1e5274(0x34c)]=function(){const _0x5923a0=_0x1e5274;VisuMZ[_0x5923a0(0x1fd)]['Game_Map_setupEvents'][_0x5923a0(0x3cb)](this),this[_0x5923a0(0x294)]=[];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x489)]=Game_Map[_0x1e5274(0x360)][_0x1e5274(0x295)],Game_Map['prototype']['updateEvents']=function(){const _0x102d7b=_0x1e5274;VisuMZ['MessageCore'][_0x102d7b(0x489)][_0x102d7b(0x3cb)](this),this['updateMessageCommonEvents']();},Game_Map[_0x1e5274(0x360)][_0x1e5274(0x4ce)]=function(_0x48b57a){const _0xa5ce4d=_0x1e5274;if(!$dataCommonEvents[_0x48b57a])return;this[_0xa5ce4d(0x294)]=this[_0xa5ce4d(0x294)]||[];const _0x52ed87=this[_0xa5ce4d(0x32b)][_0xa5ce4d(0x47b)],_0x3fc25f=new Game_MessageCommonEvent(_0x48b57a,_0x52ed87);this[_0xa5ce4d(0x294)]['push'](_0x3fc25f);},Game_Map[_0x1e5274(0x360)][_0x1e5274(0x569)]=function(){const _0x41d37d=_0x1e5274;this['_messageCommonEvents']=this['_messageCommonEvents']||[];for(const _0x5946cc of this[_0x41d37d(0x294)]){if('DQfNU'!==_0x41d37d(0x251)){let _0x14e6bd=0x60;const _0xc438db=_0xeb9a5d[_0x41d37d(0x4a9)]();for(const _0x3e11cf of _0xc438db){_0x3e11cf[_0x41d37d(0x23f)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x14e6bd=_0x41fda7[_0x41d37d(0x209)](_0x14e6bd,_0x4e4450(_0x3fc5f2['$1'])));}return _0x14e6bd;}else!_0x5946cc[_0x41d37d(0x32b)]?this[_0x41d37d(0x294)][_0x41d37d(0x22b)](_0x5946cc):'WhXHN'==='WhXHN'?_0x5946cc[_0x41d37d(0x501)]():this[_0x41d37d(0x493)](_0xcd7e00,!![]);}},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3fd)]=Game_Map[_0x1e5274(0x360)][_0x1e5274(0x3a4)],Game_Map[_0x1e5274(0x360)][_0x1e5274(0x3a4)]=function(){const _0x4b4b18=_0x1e5274;VisuMZ[_0x4b4b18(0x1fd)][_0x4b4b18(0x3fd)][_0x4b4b18(0x3cb)](this),$gameScreen[_0x4b4b18(0x23e)]();},Game_Interpreter[_0x1e5274(0x4c3)]=pluginData[_0x1e5274(0x4ec)],Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x340)]=function(_0x4740f7){const _0x47700f=_0x1e5274;if($gameMessage[_0x47700f(0x4ee)]())return![];return this[_0x47700f(0x27c)](_0x4740f7),this[_0x47700f(0x2ad)](_0x4740f7),this[_0x47700f(0x555)](_0x4740f7),this[_0x47700f(0x4a2)](_0x47700f(0x2d3)),!![];},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x27c)]=function(_0x108e8a){const _0x1cf966=_0x1e5274;$gameMessage['setFaceImage'](_0x108e8a[0x0],_0x108e8a[0x1]),$gameMessage[_0x1cf966(0x4b5)](_0x108e8a[0x2]),$gameMessage[_0x1cf966(0x558)](_0x108e8a[0x3]),$gameMessage[_0x1cf966(0x329)](_0x108e8a[0x4]);},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x2ad)]=function(_0x3397ec){const _0xd68736=_0x1e5274;while(this[_0xd68736(0x330)]()){this[_0xd68736(0x359)]++;if(this[_0xd68736(0x20c)]()[_0xd68736(0x39d)]===0x191){if(_0xd68736(0x4c7)!==_0xd68736(0x4ff)){let _0x39d843=this['currentCommand']()[_0xd68736(0x383)][0x0];_0x39d843=VisuMZ[_0xd68736(0x1fd)][_0xd68736(0x20a)](_0x39d843),$gameMessage[_0xd68736(0x20f)](_0x39d843);}else _0x4d3272['MessageCore'][_0xd68736(0x21a)][_0xd68736(0x3cb)](this,_0x9b9f45,_0x1343cb,_0x303b4a,_0x270a17);}if(this[_0xd68736(0x2cb)]())break;}},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x330)]=function(){const _0x2fa984=_0x1e5274;return this[_0x2fa984(0x30a)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this[_0x2fa984(0x30a)]()===0x191;},VisuMZ['MessageCore'][_0x1e5274(0x20a)]=function(_0x300f32){const _0x17470f=_0x1e5274;return _0x300f32=_0x300f32['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x300f32=_0x300f32[_0x17470f(0x4dd)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x54fce5,_0x53b866)=>this[_0x17470f(0x2aa)](_0x53b866)),_0x300f32;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x2aa)]=function(_0x4dda59){const _0x495eee=_0x1e5274,_0x16f49b=_0x4dda59[_0x495eee(0x438)]('|')['map'](_0x1665ce=>_0x1665ce[_0x495eee(0x2cd)]())[_0x495eee(0x22b)]('')[_0x495eee(0x22b)](null);return _0x16f49b[Math[_0x495eee(0x4b8)](_0x16f49b[_0x495eee(0x475)])];},Game_Interpreter['prototype'][_0x1e5274(0x2cb)]=function(){const _0xbc85f4=_0x1e5274;if(this[_0xbc85f4(0x20c)]()&&this[_0xbc85f4(0x20c)]()[_0xbc85f4(0x383)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0xbc85f4(0x2b5)][_0xbc85f4(0x475)]>=$gameSystem[_0xbc85f4(0x1ed)]()&&this[_0xbc85f4(0x30a)]()!==0x191;},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x555)]=function(_0x70700d){const _0x2d61a6=_0x1e5274;switch(this[_0x2d61a6(0x30a)]()){case 0x66:this[_0x2d61a6(0x359)]++,this[_0x2d61a6(0x46c)](this[_0x2d61a6(0x20c)]()[_0x2d61a6(0x383)]);break;case 0x67:this[_0x2d61a6(0x359)]++,this[_0x2d61a6(0x46d)](this[_0x2d61a6(0x20c)]()[_0x2d61a6(0x383)]);break;case 0x68:this['_index']++,this[_0x2d61a6(0x54d)](this[_0x2d61a6(0x20c)]()['parameters']);break;case 0x165:const _0x233b0e=this[_0x2d61a6(0x302)][this[_0x2d61a6(0x359)]+0x1],_0x40526b=_0x233b0e[_0x2d61a6(0x383)];_0x40526b[0x0]===Game_Interpreter[_0x2d61a6(0x4c3)]&&this[_0x2d61a6(0x28b)](_0x40526b);break;}},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x240)]=Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x46c)],Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x46c)]=function(_0x5ef4e1){const _0x1074a1=_0x1e5274;_0x5ef4e1=this[_0x1074a1(0x2a2)](),VisuMZ[_0x1074a1(0x1fd)][_0x1074a1(0x240)][_0x1074a1(0x3cb)](this,_0x5ef4e1),$gameMessage[_0x1074a1(0x392)]();},Game_Interpreter['prototype']['addContinuousShowChoices']=function(){const _0x7e6264=_0x1e5274,_0x207f78=this['_index'],_0xd2afe2=[];let _0x39cc86=0x0;this[_0x7e6264(0x359)]++;while(this[_0x7e6264(0x359)]<this[_0x7e6264(0x302)]['length']){if(_0x7e6264(0x1f5)!==_0x7e6264(0x223)){if(this[_0x7e6264(0x20c)]()[_0x7e6264(0x21e)]===this[_0x7e6264(0x29c)]){if(_0x7e6264(0x225)!=='sZNae'){if(this[_0x7e6264(0x20c)]()[_0x7e6264(0x39d)]===0x194&&this[_0x7e6264(0x30a)]()!==0x66){if('QserL'!==_0x7e6264(0x221))this[_0x7e6264(0x4d9)][_0x7e6264(0x4be)](),this[_0x7e6264(0x4d9)][_0x7e6264(0x2dc)]();else break;}else{if(this[_0x7e6264(0x20c)]()[_0x7e6264(0x39d)]===0x66)this[_0x7e6264(0x50a)](_0x39cc86,this[_0x7e6264(0x20c)](),_0x207f78),this[_0x7e6264(0x359)]-=0x2;else this[_0x7e6264(0x20c)]()[_0x7e6264(0x39d)]===0x192&&(this[_0x7e6264(0x20c)]()[_0x7e6264(0x383)][0x0]=_0x39cc86,_0x39cc86++);}}else this[_0x7e6264(0x46f)](),_0x391219['MessageCore'][_0x7e6264(0x423)]['call'](this);}this['_index']++;}else this['_autoPositionTarget']=_0x2a2bd3;}return this[_0x7e6264(0x359)]=_0x207f78,this[_0x7e6264(0x20c)]()[_0x7e6264(0x383)];},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x50a)]=function(_0x428374,_0x35fed2,_0xf315a2){const _0x112b7f=_0x1e5274;this[_0x112b7f(0x39a)](_0x428374,_0x35fed2,_0xf315a2),this[_0x112b7f(0x237)](_0x428374,_0x35fed2,_0xf315a2),this[_0x112b7f(0x483)](_0x35fed2,_0xf315a2);},Game_Interpreter[_0x1e5274(0x360)]['adjustShowChoiceDefault']=function(_0xacaed5,_0x3e0c3d,_0x2413e6){const _0x1b91e5=_0x1e5274;if(_0x3e0c3d[_0x1b91e5(0x383)][0x2]<0x0)return;const _0x32ee61=_0x3e0c3d['parameters'][0x2]+_0xacaed5;this[_0x1b91e5(0x302)][_0x2413e6][_0x1b91e5(0x383)][0x2]=_0x32ee61;},Game_Interpreter['prototype'][_0x1e5274(0x237)]=function(_0x5e4b93,_0x11925e,_0x4846c6){const _0x2f7002=_0x1e5274;if(_0x11925e['parameters'][0x1]>=0x0){var _0x214236=_0x11925e[_0x2f7002(0x383)][0x1]+_0x5e4b93;this[_0x2f7002(0x302)][_0x4846c6][_0x2f7002(0x383)][0x1]=_0x214236;}else _0x11925e[_0x2f7002(0x383)][0x1]===-0x2&&(this[_0x2f7002(0x302)][_0x4846c6][_0x2f7002(0x383)][0x1]=_0x11925e['parameters'][0x1]);},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x483)]=function(_0x749c8c,_0x7ccfcb){const _0xadff55=_0x1e5274;for(const _0x54ea46 of _0x749c8c['parameters'][0x0]){this[_0xadff55(0x302)][_0x7ccfcb][_0xadff55(0x383)][0x0][_0xadff55(0x515)](_0x54ea46);}this[_0xadff55(0x302)][_0xadff55(0x1f8)](this['_index']-0x1,0x2);},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x28b)]=function(_0x15b27e){const _0x111410=_0x1e5274,_0x286160=_0x15b27e[0x1];if(_0x286160===_0x111410(0x53e)){if(_0x111410(0x4a3)!==_0x111410(0x4a3)){const _0x281ca2=_0x3d55d3['split'](',')[_0x111410(0x42d)](_0xbdd06b=>_0x3a6868(_0xbdd06b)||0x0);if(_0x281ca2[0x0]!==_0x2c66f6)this[_0x111410(0x3cf)]['x']=_0x8f89f8(_0x281ca2[0x0]);if(_0x281ca2[0x1]!==_0x2e4c33)this[_0x111410(0x3cf)]['y']=_0x24c5b9(_0x281ca2[0x1]);if(_0x281ca2[0x2]!==_0x134d2e)this[_0x111410(0x3cf)][_0x111410(0x3c8)]=_0x2e0b91(_0x281ca2[0x2]);if(_0x281ca2[0x3]!==_0x48ffca)this['_forcedPosition'][_0x111410(0x277)]=_0x412cf0(_0x281ca2[0x3]);return'';}else this['_index']++,this['setWeaponChoice'](_0x15b27e);}else{if(_0x286160==='SelectArmor')this[_0x111410(0x359)]++,this[_0x111410(0x4b3)](_0x15b27e);else _0x286160==='SelectSkill'&&Imported[_0x111410(0x3c5)]&&(this[_0x111410(0x359)]++,this[_0x111410(0x525)](_0x15b27e));}},Game_Interpreter[_0x1e5274(0x360)]['setWeaponChoice']=function(_0x5aed73){const _0x8ccf7=_0x1e5274,_0x4edc74=JSON[_0x8ccf7(0x2c2)](JSON[_0x8ccf7(0x2a0)](_0x5aed73[0x3]));VisuMZ[_0x8ccf7(0x504)](_0x4edc74,_0x4edc74),$gameMessage[_0x8ccf7(0x2df)](_0x4edc74[_0x8ccf7(0x38b)]||0x0,_0x4edc74[_0x8ccf7(0x2db)]||0x0);},Game_Interpreter['prototype']['setArmorChoice']=function(_0x2d4409){const _0x4d827c=_0x1e5274,_0x35ed1d=JSON[_0x4d827c(0x2c2)](JSON['stringify'](_0x2d4409[0x3]));VisuMZ[_0x4d827c(0x504)](_0x35ed1d,_0x35ed1d),$gameMessage['setArmorChoice'](_0x35ed1d[_0x4d827c(0x38b)]||0x0,_0x35ed1d[_0x4d827c(0x4ef)]||0x0,_0x35ed1d[_0x4d827c(0x222)]||0x0);},Game_Interpreter[_0x1e5274(0x360)][_0x1e5274(0x525)]=function(_0x24bf78){const _0x47400e=_0x1e5274,_0x144656=JSON[_0x47400e(0x2c2)](JSON['stringify'](_0x24bf78[0x3]));VisuMZ[_0x47400e(0x504)](_0x144656,_0x144656),$gameMessage[_0x47400e(0x525)](_0x144656['VariableID']||0x0,_0x144656[_0x47400e(0x27e)]||0x0,_0x144656['SkillTypeID']||0x0);};function Game_MessageCommonEvent(){const _0x3af8f6=_0x1e5274;this[_0x3af8f6(0x35e)](...arguments);}function _0x2d16(_0xf0f24b,_0x40e0a1){const _0x494ed5=_0x494e();return _0x2d16=function(_0x2d169a,_0x1a4377){_0x2d169a=_0x2d169a-0x1ec;let _0x3ecb1f=_0x494ed5[_0x2d169a];return _0x3ecb1f;},_0x2d16(_0xf0f24b,_0x40e0a1);}Game_MessageCommonEvent[_0x1e5274(0x360)]['initialize']=function(_0x4e3133,_0xc34a28){const _0x547e51=_0x1e5274;this[_0x547e51(0x3df)]=_0x4e3133,this['_eventId']=_0xc34a28||0x0,this[_0x547e51(0x3a4)]();},Game_MessageCommonEvent['prototype'][_0x1e5274(0x283)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent['prototype'][_0x1e5274(0x492)]=function(){const _0x2d2a04=_0x1e5274;return this['event']()[_0x2d2a04(0x492)];},Game_MessageCommonEvent[_0x1e5274(0x360)][_0x1e5274(0x3a4)]=function(){const _0xd0b08f=_0x1e5274;this[_0xd0b08f(0x32b)]=new Game_Interpreter(),this['_interpreter'][_0xd0b08f(0x20d)](this[_0xd0b08f(0x492)](),this[_0xd0b08f(0x47b)]);},Game_MessageCommonEvent[_0x1e5274(0x360)][_0x1e5274(0x501)]=function(){const _0x53157e=_0x1e5274;this['_interpreter']&&(_0x53157e(0x47c)!==_0x53157e(0x47c)?(_0x2220e4[_0x53157e(0x1fd)][_0x53157e(0x3eb)][_0x53157e(0x3cb)](this),this[_0x53157e(0x24e)]()):this[_0x53157e(0x32b)][_0x53157e(0x567)]()?this[_0x53157e(0x32b)]['update']():this[_0x53157e(0x4be)]());},Game_MessageCommonEvent['prototype']['clear']=function(){const _0x5e35f0=_0x1e5274;this[_0x5e35f0(0x32b)]=null;},Scene_Message[_0x1e5274(0x360)][_0x1e5274(0x3e1)]=function(){const _0x1d8d6e=_0x1e5274,_0x1684ae=Math['min'](Graphics[_0x1d8d6e(0x3c8)],$gameSystem[_0x1d8d6e(0x391)]()),_0x4aa4b8=$gameSystem[_0x1d8d6e(0x1ed)](),_0x15e26d=this[_0x1d8d6e(0x462)](_0x4aa4b8,![]),_0x1f5a5c=(Graphics[_0x1d8d6e(0x2ca)]-_0x1684ae)/0x2,_0x5441b8=0x0;return new Rectangle(_0x1f5a5c,_0x5441b8,_0x1684ae,_0x15e26d);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x2e3)]=Scene_Message['prototype'][_0x1e5274(0x54f)],Scene_Message[_0x1e5274(0x360)][_0x1e5274(0x54f)]=function(){const _0x517538=_0x1e5274;VisuMZ[_0x517538(0x1fd)][_0x517538(0x2e3)][_0x517538(0x3cb)](this),this[_0x517538(0x27a)]();},Scene_Message[_0x1e5274(0x360)]['createChoiceListHelpWindow']=function(){const _0x553dc1=_0x1e5274,_0x898aac=this[_0x553dc1(0x300)](),_0x491dd5=new Window_Help(_0x898aac);_0x491dd5[_0x553dc1(0x2dc)](),this[_0x553dc1(0x506)]['setHelpWindow'](_0x491dd5),this[_0x553dc1(0x37d)][_0x553dc1(0x4e4)](_0x491dd5),this['addWindow'](_0x491dd5),this[_0x553dc1(0x47e)]=_0x491dd5;},Scene_Message[_0x1e5274(0x360)][_0x1e5274(0x300)]=function(){const _0x557edd=_0x1e5274,_0x1d7d96=0x0,_0x385c5d=0x0,_0x56d4ac=Graphics[_0x557edd(0x2ca)],_0x56e657=this[_0x557edd(0x462)](0x2,![]);return new Rectangle(_0x1d7d96,_0x385c5d,_0x56d4ac,_0x56e657);},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x4e4)]=function(_0x48267d){const _0x16bc54=_0x1e5274;this[_0x16bc54(0x47e)]=_0x48267d;},Window_Message[_0x1e5274(0x360)]['updateChoiceListHelpWindowPlacement']=function(){const _0x373f67=_0x1e5274;if(!this['_choiceListHelpWindow'])return;const _0x170042=this[_0x373f67(0x47e)];_0x170042&&(_0x170042['y']=this['y']>0x0?0x0:Graphics[_0x373f67(0x2fc)]-_0x170042[_0x373f67(0x277)]);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x248)]=Scene_Options[_0x1e5274(0x360)][_0x1e5274(0x4c2)],Scene_Options[_0x1e5274(0x360)][_0x1e5274(0x4c2)]=function(){const _0xcc8709=_0x1e5274;let _0x461708=VisuMZ[_0xcc8709(0x1fd)]['Scene_Options_maxCommands'][_0xcc8709(0x3cb)](this);const _0xbce5f3=VisuMZ[_0xcc8709(0x1fd)]['Settings'];if(_0xbce5f3[_0xcc8709(0x23c)][_0xcc8709(0x43f)]&&_0xbce5f3[_0xcc8709(0x23c)][_0xcc8709(0x263)])_0x461708++;return _0x461708;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x254)]=Sprite_Picture[_0x1e5274(0x360)][_0x1e5274(0x46e)],Sprite_Picture['prototype'][_0x1e5274(0x46e)]=function(){const _0x2faf62=_0x1e5274;VisuMZ[_0x2faf62(0x1fd)]['Sprite_Picture_updateBitmap'][_0x2faf62(0x3cb)](this),this[_0x2faf62(0x26a)]();},VisuMZ['MessageCore'][_0x1e5274(0x2fe)]=Sprite_Picture[_0x1e5274(0x360)][_0x1e5274(0x501)],Sprite_Picture[_0x1e5274(0x360)]['update']=function(){const _0x55d377=_0x1e5274;VisuMZ['MessageCore'][_0x55d377(0x2fe)][_0x55d377(0x3cb)](this),this['updatePictureText']();},Sprite_Picture[_0x1e5274(0x360)][_0x1e5274(0x369)]=function(){const _0x4a85ac=_0x1e5274;if(!this[_0x4a85ac(0x4e7)])return;this['resizePictureText'](),this[_0x4a85ac(0x321)](),this['drawPictureText'](),this[_0x4a85ac(0x41d)]();},Sprite_Picture['prototype'][_0x1e5274(0x26a)]=function(){const _0x5e5509=_0x1e5274;if(this['_pictureTextWindow'])return;if(this[_0x5e5509(0x265)])return;const _0x4dedd6=new Rectangle(0x0,0x0,0x0,0x0);this[_0x5e5509(0x22d)]=new Window_Base(_0x4dedd6),this['_pictureTextWindow'][_0x5e5509(0x1fa)]=0x0,this[_0x5e5509(0x265)]=new Sprite(),this[_0x5e5509(0x2d0)](this[_0x5e5509(0x265)],0x0),this[_0x5e5509(0x344)]=0x0,this[_0x5e5509(0x1f0)]=0x0,this['_pictureTextCache']={};},Sprite_Picture[_0x1e5274(0x360)][_0x1e5274(0x40d)]=function(){const _0x1c10e7=_0x1e5274;if(!this['_pictureTextWindow'])return;if(this['_pictureTextWidth']===this['width']&&this['_pictureTextHeight']===this[_0x1c10e7(0x277)])return;this['_pictureTextWidth']=this[_0x1c10e7(0x3c8)],this[_0x1c10e7(0x1f0)]=this[_0x1c10e7(0x277)],this[_0x1c10e7(0x37e)]={},this[_0x1c10e7(0x22d)][_0x1c10e7(0x48f)](0x0,0x0,this[_0x1c10e7(0x3c8)],this[_0x1c10e7(0x277)]);},Sprite_Picture[_0x1e5274(0x360)][_0x1e5274(0x321)]=function(){const _0xb74e32=_0x1e5274;if(!this[_0xb74e32(0x265)])return;this[_0xb74e32(0x265)]['anchor']['x']=this[_0xb74e32(0x494)]['x'],this[_0xb74e32(0x265)][_0xb74e32(0x494)]['y']=this[_0xb74e32(0x494)]['y'];},Sprite_Picture['prototype'][_0x1e5274(0x318)]=function(){const _0x2fc9db=_0x1e5274;if(!this['_pictureTextWindow'])return;if(!this[_0x2fc9db(0x292)]())return;const _0xfb24b0=[_0x2fc9db(0x2f0),'up',_0x2fc9db(0x556),_0x2fc9db(0x2ac),'center',_0x2fc9db(0x266),_0x2fc9db(0x303),_0x2fc9db(0x279),_0x2fc9db(0x3ce)];this['_pictureTextWindow']['createContents']();for(const _0x12b890 of _0xfb24b0){this[_0x2fc9db(0x37a)](_0x12b890);}},Sprite_Picture['prototype'][_0x1e5274(0x292)]=function(){const _0x21f6a4=_0x1e5274;if($gameScreen['needsPictureTextRefresh'](this['_pictureId']))return!![];const _0x3e878d=['upperleft','up',_0x21f6a4(0x556),_0x21f6a4(0x2ac),_0x21f6a4(0x42e),_0x21f6a4(0x266),_0x21f6a4(0x303),_0x21f6a4(0x279),_0x21f6a4(0x3ce)];for(const _0x47ffab of _0x3e878d){const _0x3100cc=$gameScreen['getPictureText'](this[_0x21f6a4(0x50c)],_0x47ffab);if(this[_0x21f6a4(0x37e)][_0x47ffab]===_0x3100cc)continue;return!![];}return![];},Sprite_Picture[_0x1e5274(0x360)][_0x1e5274(0x37a)]=function(_0x49389c){const _0x1a69ae=_0x1e5274;$gameScreen['clearPictureTextRefresh'](this[_0x1a69ae(0x50c)]);const _0x489c8a=$gameScreen[_0x1a69ae(0x566)](this[_0x1a69ae(0x50c)],_0x49389c);this[_0x1a69ae(0x37e)][_0x49389c]=_0x489c8a;const _0x445e8a=this[_0x1a69ae(0x22d)][_0x1a69ae(0x42b)](_0x489c8a);let _0x2d94d8=$gameScreen[_0x1a69ae(0x230)](this[_0x1a69ae(0x50c)]),_0x3bbc32=_0x2d94d8,_0x12b63f=_0x2d94d8;if(['up',_0x1a69ae(0x42e),'down'][_0x1a69ae(0x1ec)](_0x49389c))_0x3bbc32=Math[_0x1a69ae(0x352)]((this[_0x1a69ae(0x3c8)]-_0x445e8a[_0x1a69ae(0x3c8)])/0x2);else[_0x1a69ae(0x556),_0x1a69ae(0x266),_0x1a69ae(0x3ce)][_0x1a69ae(0x1ec)](_0x49389c)&&(_0x3bbc32=Math[_0x1a69ae(0x352)](this[_0x1a69ae(0x3c8)]-_0x445e8a[_0x1a69ae(0x3c8)]-_0x2d94d8));if([_0x1a69ae(0x2ac),_0x1a69ae(0x42e),'right'][_0x1a69ae(0x1ec)](_0x49389c))_0x12b63f=Math[_0x1a69ae(0x352)]((this[_0x1a69ae(0x277)]-_0x445e8a[_0x1a69ae(0x277)])/0x2);else[_0x1a69ae(0x303),'down','lowerright']['includes'](_0x49389c)&&(_0x12b63f=Math[_0x1a69ae(0x352)](this['height']-_0x445e8a[_0x1a69ae(0x277)]-_0x2d94d8));this['_pictureTextWindow']['drawTextEx'](_0x489c8a,_0x3bbc32,_0x12b63f);},Sprite_Picture[_0x1e5274(0x360)]['attachPictureText']=function(){const _0x2d8eef=_0x1e5274;if(!this[_0x2d8eef(0x22d)])return;if(!this[_0x2d8eef(0x265)])return;this[_0x2d8eef(0x265)][_0x2d8eef(0x2a4)]=this[_0x2d8eef(0x22d)][_0x2d8eef(0x228)];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x29f)]=Window_Base['prototype']['initialize'],Window_Base[_0x1e5274(0x360)]['initialize']=function(_0x4bf9cb){const _0x53e278=_0x1e5274;this[_0x53e278(0x24e)](_0x4bf9cb),VisuMZ[_0x53e278(0x1fd)][_0x53e278(0x29f)]['call'](this,_0x4bf9cb);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x24e)]=function(_0x5985fd){const _0x3c126e=_0x1e5274;this[_0x3c126e(0x37f)](),this[_0x3c126e(0x40a)](),this['registerResetRect'](_0x5985fd);},Window_Base[_0x1e5274(0x360)]['initTextAlignement']=function(){const _0x3b87d7=_0x1e5274;this[_0x3b87d7(0x2ff)](_0x3b87d7(0x333));},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2ff)]=function(_0x3e9d35){const _0xeba51a=_0x1e5274;this[_0xeba51a(0x4e0)]=_0x3e9d35;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x44c)]=function(){const _0x1911e2=_0x1e5274;return this[_0x1911e2(0x4e0)];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x26e)]=Window_Base['prototype'][_0x1e5274(0x42b)],Window_Base[_0x1e5274(0x360)]['textSizeEx']=function(_0x37e50c){const _0x5bc5fd=_0x1e5274;return this[_0x5bc5fd(0x40a)](),VisuMZ[_0x5bc5fd(0x1fd)][_0x5bc5fd(0x26e)]['call'](this,_0x37e50c);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x1f6)]=function(_0x16238b){const _0x519c6c=_0x1e5274;return VisuMZ[_0x519c6c(0x1fd)][_0x519c6c(0x26e)]['call'](this,_0x16238b);},VisuMZ[_0x1e5274(0x1fd)]['Window_Base_processAllText']=Window_Base[_0x1e5274(0x360)][_0x1e5274(0x257)],Window_Base['prototype'][_0x1e5274(0x257)]=function(_0x23f149){const _0xcfef88=_0x1e5274;VisuMZ[_0xcfef88(0x1fd)]['Window_Base_processAllText'][_0xcfef88(0x3cb)](this,_0x23f149);if(_0x23f149[_0xcfef88(0x326)])this['setTextAlignment'](_0xcfef88(0x333));},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x40a)]=function(){const _0x149904=_0x1e5274;this[_0x149904(0x3b5)](![]);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x214)]=function(){const _0x4c24e4=_0x1e5274;return this[_0x4c24e4(0x43a)];},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x3b5)]=function(_0xa2ae45){const _0x1e0b45=_0x1e5274;return this[_0x1e0b45(0x43a)]=_0xa2ae45,'';},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x43d)]=function(_0x2d2316){const _0x21278f=_0x1e5274;this[_0x21278f(0x44e)]=JsonEx[_0x21278f(0x4b7)](_0x2d2316);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x4e5)]=function(){const _0x126846=_0x1e5274;this['contents'][_0x126846(0x416)]=$gameSystem[_0x126846(0x545)](),this['contents'][_0x126846(0x2a6)]=$gameSystem['mainFontSize'](),this[_0x126846(0x228)][_0x126846(0x425)]=![],this[_0x126846(0x228)][_0x126846(0x422)]=![],this['resetTextColor']();},Window_Base[_0x1e5274(0x360)]['resetTextColor']=function(){const _0x36b00d=_0x1e5274;this[_0x36b00d(0x243)](ColorManager[_0x36b00d(0x349)]()),this[_0x36b00d(0x4b9)](ColorManager[_0x36b00d(0x32d)]());const _0x21ce01=VisuMZ[_0x36b00d(0x1fd)][_0x36b00d(0x49c)][_0x36b00d(0x3da)];_0x21ce01[_0x36b00d(0x32f)]===undefined&&(_0x21ce01[_0x36b00d(0x32f)]=0x3),this[_0x36b00d(0x228)][_0x36b00d(0x56d)]=_0x21ce01['DefaultOutlineWidth'],this['setColorLock'](![]);},Window_Base['prototype'][_0x1e5274(0x32e)]=function(_0x5df810){const _0x46ed66=_0x1e5274;this[_0x46ed66(0x212)]=_0x5df810;},Window_Base['prototype'][_0x1e5274(0x3bb)]=function(){const _0x2ccd4b=_0x1e5274;return this[_0x2ccd4b(0x212)];},Window_Base['prototype'][_0x1e5274(0x308)]=function(){return![];},Window_Base[_0x1e5274(0x360)]['getPreservedFontSettings']=function(){const _0x108040=_0x1e5274,_0x3204fe=[_0x108040(0x416),_0x108040(0x2a6),_0x108040(0x425),'fontItalic',_0x108040(0x3ac),_0x108040(0x276),_0x108040(0x56d),_0x108040(0x2a5)];let _0x1e89d3={};for(const _0x26d59b of _0x3204fe){_0x1e89d3[_0x26d59b]=this[_0x108040(0x228)][_0x26d59b];}return _0x1e89d3;},Window_Base['prototype']['returnPreservedFontSettings']=function(_0x45aa1d){const _0x3d412a=_0x1e5274;for(const _0x156a6d in _0x45aa1d){this[_0x3d412a(0x228)][_0x156a6d]=_0x45aa1d[_0x156a6d];}},VisuMZ[_0x1e5274(0x1fd)]['Window_Base_update']=Window_Base[_0x1e5274(0x360)]['update'],Window_Base['prototype']['update']=function(){const _0x1d1d24=_0x1e5274;VisuMZ['MessageCore'][_0x1d1d24(0x52e)][_0x1d1d24(0x3cb)](this),this['updateMove']();},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x532)]=function(){return![];},Window_Base['prototype'][_0x1e5274(0x26c)]=function(){const _0x5aa780=_0x1e5274;if(this['_moveDuration']>0x0){if(_0x5aa780(0x4d1)===_0x5aa780(0x4d1)){if(this['canMove']()){if(_0x5aa780(0x39c)===_0x5aa780(0x39c))this['x']=this[_0x5aa780(0x52f)](this['x'],this[_0x5aa780(0x397)]),this['y']=this['applyMoveEasing'](this['y'],this['_moveTargetY']),this['width']=this[_0x5aa780(0x52f)](this[_0x5aa780(0x3c8)],this[_0x5aa780(0x445)]),this[_0x5aa780(0x277)]=this[_0x5aa780(0x52f)](this[_0x5aa780(0x277)],this[_0x5aa780(0x363)]),this['clampPlacementPosition']();else return this[_0x5aa780(0x323)]||0x0;}this[_0x5aa780(0x2d4)]--;}else _0x237d35=this['contents'][_0x5aa780(0x2a6)];}},Window_Base[_0x1e5274(0x360)]['clampPlacementPosition']=function(_0x55465b,_0x234614){const _0x464cd3=_0x1e5274;!_0x55465b&&(this['width']=Math[_0x464cd3(0x502)](this['width'],Graphics[_0x464cd3(0x3c8)]),this[_0x464cd3(0x277)]=Math[_0x464cd3(0x502)](this['height'],Graphics[_0x464cd3(0x277)]));if(!_0x234614){const _0x404cd1=-(Math[_0x464cd3(0x352)](Graphics[_0x464cd3(0x3c8)]-Graphics[_0x464cd3(0x2ca)])/0x2),_0xdd67c2=_0x404cd1+Graphics[_0x464cd3(0x3c8)]-this[_0x464cd3(0x3c8)],_0x557b76=-(Math[_0x464cd3(0x352)](Graphics['height']-Graphics['boxHeight'])/0x2),_0x172bd4=_0x557b76+Graphics[_0x464cd3(0x277)]-this[_0x464cd3(0x277)];this['x']=this['x']['clamp'](_0x404cd1,_0xdd67c2),this['y']=this['y'][_0x464cd3(0x2fb)](_0x557b76,_0x172bd4);}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x52f)]=function(_0x929e1,_0xd15e17){const _0x4e32b6=_0x1e5274,_0x5ec252=this[_0x4e32b6(0x2d4)],_0x56a4bb=this[_0x4e32b6(0x2e6)],_0x1f3e6f=this[_0x4e32b6(0x426)]((_0x56a4bb-_0x5ec252)/_0x56a4bb),_0x1a121f=this[_0x4e32b6(0x426)]((_0x56a4bb-_0x5ec252+0x1)/_0x56a4bb),_0x553e9f=(_0x929e1-_0xd15e17*_0x1f3e6f)/(0x1-_0x1f3e6f);return _0x553e9f+(_0xd15e17-_0x553e9f)*_0x1a121f;},Window_Base['prototype'][_0x1e5274(0x426)]=function(_0x1d78c6){const _0x58bcb0=_0x1e5274,_0x4fb852=0x2;switch(this[_0x58bcb0(0x1ee)]){case 0x0:return _0x1d78c6;case 0x1:return this[_0x58bcb0(0x557)](_0x1d78c6,_0x4fb852);case 0x2:return this[_0x58bcb0(0x2f4)](_0x1d78c6,_0x4fb852);case 0x3:return this['easeInOut'](_0x1d78c6,_0x4fb852);default:if(Imported['VisuMZ_0_CoreEngine'])return VisuMZ[_0x58bcb0(0x52f)](_0x1d78c6,this[_0x58bcb0(0x1ee)]);else{if(_0x58bcb0(0x55d)===_0x58bcb0(0x4a6))_0x110c89[_0x58bcb0(0x1fd)]['Scene_Message_createChoiceListWindow'][_0x58bcb0(0x3cb)](this),this[_0x58bcb0(0x27a)]();else return _0x1d78c6;}}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x52b)]=function(_0x3975db,_0x781269,_0x4355a6,_0x190949,_0x48d4f4,_0x2c6a27){const _0x32aa94=_0x1e5274;this[_0x32aa94(0x397)]=_0x3975db,this[_0x32aa94(0x43b)]=_0x781269,this[_0x32aa94(0x445)]=_0x4355a6||this[_0x32aa94(0x3c8)],this[_0x32aa94(0x363)]=_0x190949||this['height'],this[_0x32aa94(0x2d4)]=_0x48d4f4||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this[_0x32aa94(0x2e6)]=this[_0x32aa94(0x2d4)],this[_0x32aa94(0x1ee)]=_0x2c6a27||0x0;if(_0x48d4f4<=0x0)this['updateMove']();},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2e4)]=function(_0x44130d,_0x5e3a0a,_0x491612,_0x349d91,_0x574606,_0x42c80c){const _0x20fa80=_0x1e5274;this['_moveTargetX']=this['x']+_0x44130d,this[_0x20fa80(0x43b)]=this['y']+_0x5e3a0a,this['_moveTargetWidth']=this[_0x20fa80(0x3c8)]+(_0x491612||0x0),this[_0x20fa80(0x363)]=this[_0x20fa80(0x277)]+(_0x349d91||0x0),this[_0x20fa80(0x2d4)]=_0x574606||0x1;if(this[_0x20fa80(0x2d4)]<=0x0)this[_0x20fa80(0x2d4)]=0x1;this[_0x20fa80(0x2e6)]=this[_0x20fa80(0x2d4)],this[_0x20fa80(0x1ee)]=_0x42c80c||0x0;if(_0x574606<=0x0)this[_0x20fa80(0x26c)]();},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x29a)]=function(_0x2c3540,_0x4ddd60){const _0xb5fdfb=_0x1e5274;this['moveTo'](this[_0xb5fdfb(0x44e)]['x'],this[_0xb5fdfb(0x44e)]['y'],this[_0xb5fdfb(0x44e)][_0xb5fdfb(0x3c8)],this[_0xb5fdfb(0x44e)][_0xb5fdfb(0x277)],_0x2c3540,_0x4ddd60);},VisuMZ[_0x1e5274(0x1fd)]['Window_Base_changeTextColor']=Window_Base[_0x1e5274(0x360)]['changeTextColor'],Window_Base[_0x1e5274(0x360)][_0x1e5274(0x243)]=function(_0x46b5b3){const _0x33070b=_0x1e5274;if(this[_0x33070b(0x3bb)]())return;_0x46b5b3=_0x46b5b3[_0x33070b(0x4dd)](/\,/g,''),this[_0x33070b(0x3f2)]=this[_0x33070b(0x3f2)]||[],this[_0x33070b(0x3f2)][_0x33070b(0x288)](this['contents']['textColor']),VisuMZ['MessageCore'][_0x33070b(0x20e)][_0x33070b(0x3cb)](this,_0x46b5b3);},Window_Base['prototype'][_0x1e5274(0x378)]=function(_0x40e3ac){const _0x792220=_0x1e5274;this['obtainEscapeParam'](_0x40e3ac);if(this[_0x792220(0x3bb)]())return;if(_0x40e3ac['drawing']){if(_0x792220(0x356)!=='wIQwe'){const _0x4ecf53=_0x5cd92f(_0x31f5f2['$1']);_0x4ecf53<_0x4cda50?(_0x172394(_0x792220(0x4eb)['format'](_0x581e3d,_0x4ecf53,_0x1a311a)),_0x7e1451[_0x792220(0x35a)]()):_0x5de538=_0x4c3c9b[_0x792220(0x209)](_0x4ecf53,_0x3ac718);}else this[_0x792220(0x3f2)]=this[_0x792220(0x3f2)]||[],this['contents'][_0x792220(0x3ac)]=this[_0x792220(0x3f2)][_0x792220(0x2c5)]()||ColorManager[_0x792220(0x349)]();}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x52c)]=function(_0x52caf2){const _0x1d6005=_0x1e5274;return _0x52caf2=this['convertTextMacros'](_0x52caf2),_0x52caf2=this[_0x1d6005(0x2e5)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x56b)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x24f)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x542)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x2ed)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x249)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x293)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x521)](_0x52caf2),_0x52caf2=this['convertBaseEscapeCharacters'](_0x52caf2),_0x52caf2=this[_0x1d6005(0x522)](_0x52caf2),_0x52caf2=this[_0x1d6005(0x49d)](_0x52caf2),_0x52caf2=this['convertMessageCoreEscapeReplacements'](_0x52caf2),_0x52caf2=this[_0x1d6005(0x2e9)](_0x52caf2),_0x52caf2=this['convertVariableEscapeCharacters'](_0x52caf2),_0x52caf2=this[_0x1d6005(0x518)](_0x52caf2),_0x52caf2=this['prepareWordWrapEscapeCharacters'](_0x52caf2),_0x52caf2;},Window_Base[_0x1e5274(0x360)]['convertTextMacros']=function(_0x6ffbf4){const _0x11dea3=_0x1e5274;this[_0x11dea3(0x4b6)]=![];for(const _0x3a2dc8 of VisuMZ[_0x11dea3(0x1fd)][_0x11dea3(0x49c)][_0x11dea3(0x561)]){_0x6ffbf4['match'](_0x3a2dc8[_0x11dea3(0x508)])&&(_0x11dea3(0x353)!==_0x11dea3(0x353)?(_0xb7885[_0x11dea3(0x508)]=new _0x1d0339('\x1b'+_0x55b035[_0x11dea3(0x528)]+_0x2cf89e[_0x11dea3(0x38e)],'gi'),_0x2659fc[_0x11dea3(0x519)]!==''&&_0xa368be['TextStr']!==_0x11dea3(0x503)?_0x4b55cb[_0x11dea3(0x24a)]=new _0x434318('return\x20\x27'+_0x23da51[_0x11dea3(0x519)][_0x11dea3(0x4dd)](/\\/g,'\x1b')+'\x27'):_0x163667[_0x11dea3(0x24a)]=_0x21fca1[_0x11dea3(0x247)]):(this['_textMacroFound']=!![],_0x6ffbf4=_0x6ffbf4[_0x11dea3(0x4dd)](_0x3a2dc8[_0x11dea3(0x508)],_0x3a2dc8[_0x11dea3(0x24a)][_0x11dea3(0x55f)](this))));}return _0x6ffbf4;},Window_Base[_0x1e5274(0x360)]['convertBackslashCharacters']=function(_0x18fea4){const _0xfeb833=_0x1e5274;return _0x18fea4=_0x18fea4[_0xfeb833(0x4dd)](/\\/g,'\x1b'),_0x18fea4=_0x18fea4[_0xfeb833(0x4dd)](/\x1b\x1b/g,'\x5c'),_0x18fea4;},Window_Base[_0x1e5274(0x360)]['convertVariableEscapeCharacters']=function(_0x80940a){const _0x33ddbc=_0x1e5274;for(;;){if(_0x80940a[_0x33ddbc(0x23f)](/\\V\[(\d+)\]/gi))_0x80940a=_0x80940a[_0x33ddbc(0x4dd)](/\\V\[(\d+)\]/gi,(_0x77ff4f,_0x762dc8)=>this[_0x33ddbc(0x2e5)](String($gameVariables[_0x33ddbc(0x217)](parseInt(_0x762dc8)))));else{if(_0x80940a[_0x33ddbc(0x23f)](/\x1bV\[(\d+)\]/gi))_0x80940a=_0x80940a['replace'](/\x1bV\[(\d+)\]/gi,(_0x13a4b0,_0x38c280)=>this[_0x33ddbc(0x2e5)](String($gameVariables['value'](parseInt(_0x38c280)))));else break;}}return _0x80940a;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x24f)]=function(_0x70e51f){const _0x51997=_0x1e5274;return Imported[_0x51997(0x373)]&&(_0x70e51f=_0x70e51f[_0x51997(0x4dd)](/<Up (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)]('up')),_0x70e51f=_0x70e51f['replace'](/<Left (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)](_0x51997(0x2ac))),_0x70e51f=_0x70e51f[_0x51997(0x4dd)](/<Right (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)](_0x51997(0x266))),_0x70e51f=_0x70e51f['replace'](/<Down (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)](_0x51997(0x279))),_0x70e51f=_0x70e51f['replace'](/<Ok (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)]('ok')),_0x70e51f=_0x70e51f[_0x51997(0x4dd)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)](_0x51997(0x2bd))),_0x70e51f=_0x70e51f['replace'](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x51997(0x430))),_0x70e51f=_0x70e51f[_0x51997(0x4dd)](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x51997(0x2c5))),_0x70e51f=_0x70e51f['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)]('pageup')),_0x70e51f=_0x70e51f[_0x51997(0x4dd)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x51997(0x34f)]('pagedown'))),_0x70e51f;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x34f)]=function(_0x451ad3){const _0x3b0622=_0x1e5274;let _0x10a0de=TextManager['getInputButtonString'](_0x451ad3)||'';return _0x10a0de=this[_0x3b0622(0x2e5)](_0x10a0de),_0x10a0de=this[_0x3b0622(0x56b)](_0x10a0de),_0x10a0de[_0x3b0622(0x2cd)]();},Window_Base[_0x1e5274(0x360)]['preConvertEscapeCharacters']=function(_0x363022){const _0x520f56=_0x1e5274;return this[_0x520f56(0x385)](),_0x363022;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2e9)]=function(_0x2ea91f){return _0x2ea91f;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2ed)]=function(_0x50d16f){const _0x44f588=_0x1e5274;return this[_0x44f588(0x259)]()&&(_0x50d16f=_0x50d16f[_0x44f588(0x4dd)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x50d16f=_0x50d16f[_0x44f588(0x4dd)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x50d16f=_0x50d16f['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x50d16f=_0x50d16f[_0x44f588(0x4dd)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x50d16f=_0x50d16f[_0x44f588(0x4dd)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x50d16f=_0x50d16f[_0x44f588(0x4dd)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,'')),_0x50d16f;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x259)]=function(){const _0x172e47=_0x1e5274,_0x5383af=[_0x172e47(0x261),_0x172e47(0x1f2)];return _0x5383af[_0x172e47(0x1ec)](this['constructor']['name']);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x249)]=function(_0x330d95){const _0xcb6bd3=_0x1e5274;return _0x330d95=_0x330d95[_0xcb6bd3(0x4dd)](/<B>/gi,'\x1bBOLD[1]'),_0x330d95=_0x330d95[_0xcb6bd3(0x4dd)](/<\/B>/gi,_0xcb6bd3(0x2d6)),_0x330d95=_0x330d95['replace'](/<I>/gi,_0xcb6bd3(0x540)),_0x330d95=_0x330d95[_0xcb6bd3(0x4dd)](/<\/I>/gi,_0xcb6bd3(0x433)),_0x330d95;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x293)]=function(_0x2f5c28){const _0x247888=_0x1e5274;return _0x2f5c28=_0x2f5c28[_0x247888(0x4dd)](/<LEFT>/gi,_0x247888(0x4c9)),_0x2f5c28=_0x2f5c28['replace'](/<\/LEFT>/gi,_0x247888(0x370)),_0x2f5c28=_0x2f5c28[_0x247888(0x4dd)](/<CENTER>/gi,_0x247888(0x3ae)),_0x2f5c28=_0x2f5c28[_0x247888(0x4dd)](/<\/CENTER>/gi,_0x247888(0x370)),_0x2f5c28=_0x2f5c28[_0x247888(0x4dd)](/<RIGHT>/gi,_0x247888(0x3ff)),_0x2f5c28=_0x2f5c28[_0x247888(0x4dd)](/<\/RIGHT>/gi,_0x247888(0x370)),_0x2f5c28;},Window_Base['prototype'][_0x1e5274(0x521)]=function(_0x2d67e8){const _0x37ec11=_0x1e5274;return _0x2d67e8=_0x2d67e8['replace'](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x2d67e8=_0x2d67e8[_0x37ec11(0x4dd)](/<\/COLORLOCK>/gi,_0x37ec11(0x444)),_0x2d67e8=_0x2d67e8['replace'](/\(\(\(/gi,_0x37ec11(0x31f)),_0x2d67e8=_0x2d67e8[_0x37ec11(0x4dd)](/\)\)\)/gi,_0x37ec11(0x444)),_0x2d67e8;},Window_Base['prototype']['convertBaseEscapeCharacters']=function(_0x576c6b){const _0x5acd69=_0x1e5274;return _0x576c6b=_0x576c6b[_0x5acd69(0x4dd)](/\x1bN\[(\d+)\]/gi,(_0x47324b,_0x20734f)=>this[_0x5acd69(0x3b8)](parseInt(_0x20734f))),_0x576c6b=_0x576c6b['replace'](/\x1bP\[(\d+)\]/gi,(_0x373657,_0x49e325)=>this[_0x5acd69(0x36e)](parseInt(_0x49e325))),_0x576c6b=_0x576c6b[_0x5acd69(0x4dd)](/\x1bG/gi,TextManager[_0x5acd69(0x2f2)]),_0x576c6b;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x522)]=function(_0x4ff3f2){const _0x262050=_0x1e5274;return _0x4ff3f2=_0x4ff3f2[_0x262050(0x4dd)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x262050(0x256)]()),_0x4ff3f2=_0x4ff3f2[_0x262050(0x4dd)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x262050(0x2cf)]()),_0x4ff3f2=_0x4ff3f2[_0x262050(0x4dd)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x4ff3f2=_0x4ff3f2['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x262050(0x2b9)](![])),_0x4ff3f2;},Window_Base[_0x1e5274(0x360)]['battleTargetName']=function(){const _0x51ba29=_0x1e5274;if(!SceneManager[_0x51ba29(0x53a)]())return'';if(BattleManager[_0x51ba29(0x28e)])return BattleManager['_target']['name']();if(BattleManager[_0x51ba29(0x4cb)][0x0])return BattleManager['_targets'][0x0]['name']();return'';},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2cf)]=function(){const _0xb4f711=_0x1e5274;if(!SceneManager[_0xb4f711(0x53a)]())return'';let _0x5ea799=null;_0x5ea799=BattleManager[_0xb4f711(0x505)];if(!_0x5ea799&&BattleManager[_0xb4f711(0x4ad)]()){if(_0xb4f711(0x507)!==_0xb4f711(0x41b))_0x5ea799=BattleManager[_0xb4f711(0x48c)]();else{let _0x1a7228=0x0;return _0x23aff4[_0xb4f711(0x23f)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x1a7228=_0x47bedd(_0x15910f['$1'])),_0x1a7228;}}return _0x5ea799?_0x5ea799[_0xb4f711(0x4ec)]():'';},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2b9)]=function(_0x30a078){const _0x3c0a3e=_0x1e5274;if(!SceneManager[_0x3c0a3e(0x53a)]())return'';let _0x1716a1=BattleManager[_0x3c0a3e(0x402)]||null;if(!_0x1716a1&&BattleManager[_0x3c0a3e(0x4ad)]()){if(_0x3c0a3e(0x2f5)===_0x3c0a3e(0x2f5))_0x1716a1=BattleManager[_0x3c0a3e(0x495)]();else{const _0x1a73c9=this[_0x3c0a3e(0x551)](_0x3d963f),_0x4bca90=_0x3a3345[_0x3c0a3e(0x347)]()!==_0x3c0a3e(0x333)?_0x3c0a3e(0x255)['format'](_0x2de12a[_0x3c0a3e(0x347)]()):'',_0x9e5179=_0x4bca90+this[_0x3c0a3e(0x443)](_0x1b02eb);this[_0x3c0a3e(0x47d)](this[_0x3c0a3e(0x205)](_0x555c3e));const _0x9a467=this['textSizeEx'](_0x9e5179)[_0x3c0a3e(0x277)],_0x5c7292=_0x1a73c9['x']+this['getChoiceIndent'](_0x9e5179),_0x2e6a29=_0x2a1ca5['max'](_0x1a73c9['y'],_0x1a73c9['y']+_0x181c93['round']((_0x1a73c9['height']-_0x9a467)/0x2));this[_0x3c0a3e(0x28c)](_0x9e5179,_0x5c7292,_0x2e6a29,_0x1a73c9[_0x3c0a3e(0x3c8)]),this[_0x3c0a3e(0x49e)](_0xd14be6);}}if(_0x1716a1&&_0x1716a1[_0x3c0a3e(0x3c2)]()){let _0x2012a2='';if(_0x30a078)_0x2012a2+=_0x3c0a3e(0x2b7)[_0x3c0a3e(0x24d)](_0x1716a1[_0x3c0a3e(0x3c2)]()['iconIndex']);return _0x2012a2+=_0x1716a1[_0x3c0a3e(0x3c2)]()['name'],_0x2012a2;}return'';},Window_Base['prototype']['convertMessageCoreEscapeActions']=function(_0x2163cc){const _0x115a4f=_0x1e5274;for(const _0xc30fb4 of VisuMZ['MessageCore']['Settings'][_0x115a4f(0x451)]){if(_0x115a4f(0x30b)===_0x115a4f(0x30b))_0x2163cc[_0x115a4f(0x23f)](_0xc30fb4[_0x115a4f(0x508)])&&(_0x2163cc=_0x2163cc[_0x115a4f(0x4dd)](_0xc30fb4[_0x115a4f(0x508)],_0xc30fb4[_0x115a4f(0x24a)]),_0x2163cc=this['convertVariableEscapeCharacters'](_0x2163cc));else{const _0xc59b84=_0x44ef32[0x1];if(_0xc59b84===_0x115a4f(0x53e))this[_0x115a4f(0x359)]++,this['setWeaponChoice'](_0x6e57b5);else{if(_0xc59b84==='SelectArmor')this[_0x115a4f(0x359)]++,this[_0x115a4f(0x4b3)](_0x3a8045);else _0xc59b84===_0x115a4f(0x4d6)&&_0x1e0253[_0x115a4f(0x3c5)]&&(this['_index']++,this['setSkillChoice'](_0x5b4f43));}}}return _0x2163cc;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x549)]=function(_0x2043de){const _0x16c21b=_0x1e5274;for(const _0x181bc1 of VisuMZ[_0x16c21b(0x1fd)]['Settings']['TextCodeReplace']){_0x2043de[_0x16c21b(0x23f)](_0x181bc1[_0x16c21b(0x508)])&&(_0x2043de=_0x2043de['replace'](_0x181bc1[_0x16c21b(0x508)],_0x181bc1[_0x16c21b(0x24a)][_0x16c21b(0x55f)](this)),_0x2043de=this[_0x16c21b(0x56b)](_0x2043de));}return _0x2043de;},Window_Base['prototype'][_0x1e5274(0x3b8)]=function(_0x5718d4){const _0x3b6fc6=_0x1e5274,_0x3beac9=_0x5718d4>=0x1?$gameActors[_0x3b6fc6(0x48c)](_0x5718d4):null,_0x544a7f=_0x3beac9?_0x3beac9[_0x3b6fc6(0x4ec)]():'',_0x1b881f=Number(VisuMZ[_0x3b6fc6(0x1fd)]['Settings'][_0x3b6fc6(0x48e)]['Actors']);if(this[_0x3b6fc6(0x308)]()&&_0x1b881f!==0x0){if(_0x3b6fc6(0x4f3)==='HHtzj')this[_0x3b6fc6(0x4bf)]=_0xd10875[_0x3b6fc6(0x48a)],this[_0x3b6fc6(0x29e)]=_0x5c8d50[_0x3b6fc6(0x4e3)];else return _0x3b6fc6(0x45e)[_0x3b6fc6(0x24d)](_0x1b881f,_0x544a7f);}else{if('cgltU'!==_0x3b6fc6(0x242)){this[_0x3b6fc6(0x4d3)]=_0x3065fe[_0x3b6fc6(0x1fd)][_0x3b6fc6(0x467)](this[_0x3b6fc6(0x4d3)]);if(this[_0x3b6fc6(0x2ee)]()!==-0x2)this['_choiceCancelType']=-0x1;}else return _0x544a7f;}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x36e)]=function(_0x45085c){const _0x159205=_0x1e5274,_0x371b1e=_0x45085c>=0x1?$gameParty[_0x159205(0x4c5)]()[_0x45085c-0x1]:null,_0x49fe15=_0x371b1e?_0x371b1e[_0x159205(0x4ec)]():'',_0x429c14=Number(VisuMZ[_0x159205(0x1fd)]['Settings'][_0x159205(0x48e)][_0x159205(0x367)]);if(this[_0x159205(0x308)]()&&_0x429c14!==0x0)return _0x159205(0x45e)[_0x159205(0x24d)](_0x429c14,_0x49fe15);else{if('dqeeo'!==_0x159205(0x400))this[_0x159205(0x2be)](_0x3c4800);else return _0x49fe15;}},Window_Base['prototype'][_0x1e5274(0x518)]=function(_0x2d58a7){const _0x46af7f=_0x1e5274;if(this['isAutoColorAffected']()){if('bzYht'!=='bzYht')return this[_0x46af7f(0x3ca)](_0x29624e,!![],!![]),this[_0x46af7f(0x51d)](_0x46af7f(0x546)),'';else _0x2d58a7=this[_0x46af7f(0x424)](_0x2d58a7),_0x2d58a7=this[_0x46af7f(0x33b)](_0x2d58a7);}return _0x2d58a7;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x424)]=function(_0xdf4fa2){const _0x111fb7=_0x1e5274;for(autoColor of VisuMZ[_0x111fb7(0x1fd)]['AutoColorRegExp']){'BlXzJ'===_0x111fb7(0x25b)?_0xdf4fa2=_0xdf4fa2[_0x111fb7(0x4dd)](autoColor[0x0],autoColor[0x1]):_0x14c2a1=_0x24a61c['inputtingAction']();}return _0xdf4fa2;},Window_Base['prototype']['clearActorNameAutoColor']=function(){this['_autoColorActorNames']=[];},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x385)]=function(){const _0x223898=_0x1e5274;this[_0x223898(0x548)]();const _0x43594d=VisuMZ['MessageCore']['Settings'][_0x223898(0x48e)],_0x78d354=_0x43594d['Actors'];if(_0x78d354<=0x0)return;for(const _0x44b3ee of $gameActors[_0x223898(0x38f)]){if(_0x223898(0x50d)==='CFavx'){if(!_0x44b3ee)continue;const _0x2a6bb9=_0x44b3ee[_0x223898(0x4ec)]();if(_0x2a6bb9[_0x223898(0x2cd)]()[_0x223898(0x475)]<=0x0)continue;if(/^\d+$/[_0x223898(0x403)](_0x2a6bb9))continue;if(_0x2a6bb9['match'](/-----/i))continue;let _0x3a983a=VisuMZ['MessageCore']['ConvertTextAutoColorRegExpFriendly'](_0x2a6bb9);const _0x39460c=new RegExp('\x5cb'+_0x3a983a+'\x5cb','g'),_0x3e6ed3='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x78d354,_0x2a6bb9);this[_0x223898(0x2fa)]['push']([_0x39460c,_0x3e6ed3]);}else{const _0x54fb6f=_0x38b8eb['$1'][_0x223898(0x438)](',')[_0x223898(0x42d)](_0x951ef1=>_0x740594(_0x951ef1)||0x0);for(const _0x3f6beb of _0x54fb6f){if(!_0x33e2ad[_0x223898(0x217)](_0x3f6beb))return![];}return!![];}}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x33b)]=function(_0x12281a){const _0x31093e=_0x1e5274;this[_0x31093e(0x2fa)]===undefined&&this[_0x31093e(0x385)]();for(autoColor of this[_0x31093e(0x2fa)]){_0x12281a=_0x12281a['replace'](autoColor[0x0],autoColor[0x1]);}return _0x12281a;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x432)]=function(_0x3ae62c,_0x5ce5fe,_0x57747a){const _0x9dc620=_0x1e5274;if(!_0x3ae62c)return'';const _0x5257ba=_0x3ae62c[_0x5ce5fe];let _0x5adbab='';if(_0x5257ba&&_0x57747a&&_0x5257ba[_0x9dc620(0x2b2)]){if('bCyTw'!==_0x9dc620(0x3e2)){const _0x266cc1=_0x9dc620(0x4f4);_0x5adbab=_0x266cc1['format'](_0x5257ba[_0x9dc620(0x2b2)],_0x5257ba['name']);}else this[_0x9dc620(0x37a)](_0xaacfde);}else{if(_0x5257ba){if(_0x9dc620(0x417)===_0x9dc620(0x417))_0x5adbab=_0x5257ba[_0x9dc620(0x4ec)];else return _0x4d84cb['setLastPluginCommandInterpreter'](this),_0x2aae05[_0x9dc620(0x1fd)][_0x9dc620(0x4aa)]['call'](this,_0x5809ce);}else _0x5adbab='';}return this['isAutoColorAffected']()&&(_0x5adbab=this[_0x9dc620(0x219)](_0x5adbab,_0x3ae62c)),_0x5adbab;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x393)]=function(_0x482c5f){const _0x124259=_0x1e5274,_0x1fc0eb=$gameParty[_0x124259(0x24c)]();if(_0x1fc0eb['id']<0x0)return'';let _0x280925=null;if(_0x1fc0eb[_0x124259(0x34e)]===0x0)_0x280925=$dataItems[_0x1fc0eb['id']];if(_0x1fc0eb[_0x124259(0x34e)]===0x1)_0x280925=$dataWeapons[_0x1fc0eb['id']];if(_0x1fc0eb[_0x124259(0x34e)]===0x2)_0x280925=$dataArmors[_0x1fc0eb['id']];if(!_0x280925)return'';return _0x482c5f?_0x124259(0x4f4)[_0x124259(0x24d)](_0x280925[_0x124259(0x2b2)],_0x280925[_0x124259(0x4ec)]):_0x280925[_0x124259(0x4ec)];},Window_Base['prototype'][_0x1e5274(0x459)]=function(){const _0x1bb849=_0x1e5274,_0x223d5f=$gameParty[_0x1bb849(0x24c)]();if(_0x223d5f['id']<=0x0)return'';return _0x223d5f[_0x1bb849(0x296)];},Window_Base[_0x1e5274(0x360)]['applyDatabaseAutoColor']=function(_0x336f3e,_0x1867d6){const _0x489ff1=_0x1e5274,_0x5a347c=VisuMZ[_0x489ff1(0x1fd)][_0x489ff1(0x49c)][_0x489ff1(0x48e)];let _0x2cbdae=0x0;if(_0x1867d6===$dataActors)_0x2cbdae=_0x5a347c[_0x489ff1(0x367)];if(_0x1867d6===$dataClasses)_0x2cbdae=_0x5a347c[_0x489ff1(0x371)];if(_0x1867d6===$dataSkills)_0x2cbdae=_0x5a347c[_0x489ff1(0x565)];if(_0x1867d6===$dataItems)_0x2cbdae=_0x5a347c[_0x489ff1(0x216)];if(_0x1867d6===$dataWeapons)_0x2cbdae=_0x5a347c['Weapons'];if(_0x1867d6===$dataArmors)_0x2cbdae=_0x5a347c[_0x489ff1(0x375)];if(_0x1867d6===$dataEnemies)_0x2cbdae=_0x5a347c[_0x489ff1(0x4a5)];if(_0x1867d6===$dataStates)_0x2cbdae=_0x5a347c[_0x489ff1(0x31d)];if(_0x2cbdae>0x0){if(_0x489ff1(0x358)==='OFQoL')_0x336f3e=_0x489ff1(0x45e)['format'](_0x2cbdae,_0x336f3e);else{_0xd6a02[_0x489ff1(0x1fd)][_0x489ff1(0x3b7)]('TextCodeReplace');for(const _0x3d1b61 of _0x57963a[_0x489ff1(0x1fd)][_0x489ff1(0x49c)][_0x489ff1(0x207)]){_0x3d1b61[_0x489ff1(0x508)]=new _0x5edd63('\x1b'+_0x3d1b61[_0x489ff1(0x528)]+_0x3d1b61[_0x489ff1(0x38e)],'gi'),_0x3d1b61[_0x489ff1(0x519)]!==''&&_0x3d1b61[_0x489ff1(0x519)]!==_0x489ff1(0x503)?_0x3d1b61[_0x489ff1(0x24a)]=new _0x1d64cd(_0x489ff1(0x33c)+_0x3d1b61['TextStr'][_0x489ff1(0x4dd)](/\\/g,'\x1b')+'\x27'):_0x3d1b61['textCodeResult']=_0x3d1b61[_0x489ff1(0x247)];}}}return _0x336f3e;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x241)]=function(_0x4d46ab){const _0x1804fe=_0x1e5274;_0x4d46ab=_0x4d46ab[_0x1804fe(0x4dd)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x3f8b98,_0x5f045a)=>this[_0x1804fe(0x3b5)](!![])),_0x4d46ab=_0x4d46ab['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x386198,_0x3a7786)=>this[_0x1804fe(0x3b5)](![])),_0x4d46ab=_0x4d46ab[_0x1804fe(0x4dd)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x3b57a5,_0x46c200)=>this[_0x1804fe(0x3b5)](![]));if(_0x4d46ab[_0x1804fe(0x23f)](Window_Message['_autoSizeRegexp']))this[_0x1804fe(0x3b5)](![]);else _0x4d46ab[_0x1804fe(0x23f)](Window_Message[_0x1804fe(0x471)])&&(_0x1804fe(0x516)===_0x1804fe(0x516)?this[_0x1804fe(0x3b5)](![]):(_0x21b3b3=_0x107fa1[_0x1804fe(0x352)](_0x394ff0[_0x1804fe(0x440)]()*(_0x1b8347+0x1)),_0xe4ab49=_0x7401b2[_0x3cf3d4],_0xf25a21[_0x2bc0d9]=_0x4c6c5d[_0x3dfcc8],_0x46d298[_0x63e844]=_0x1f3d8));if(!this[_0x1804fe(0x214)]())return _0x4d46ab;if(_0x4d46ab['length']<=0x0)return _0x4d46ab;VisuMZ[_0x1804fe(0x1fd)][_0x1804fe(0x49c)][_0x1804fe(0x512)][_0x1804fe(0x2d9)]?_0x1804fe(0x269)!==_0x1804fe(0x238)?(_0x4d46ab=_0x4d46ab['replace'](/[\n\r]+/g,'\x20'),_0x4d46ab=_0x4d46ab['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x3eea1c=_0x10267c[_0x1804fe(0x4dd)](/[\n\r]+/g,''),_0x4f7733=_0x107b9c[_0x1804fe(0x4dd)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):(_0x4d46ab=_0x4d46ab[_0x1804fe(0x4dd)](/[\n\r]+/g,''),_0x4d46ab=_0x4d46ab['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'));_0x4d46ab=this[_0x1804fe(0x2d1)](_0x4d46ab),_0x4d46ab=_0x4d46ab[_0x1804fe(0x438)]('\x20')[_0x1804fe(0x304)]('\x1bWrapBreak[0]');if(_0x4d46ab['match'](/[\u3040-\u30FF\u4E00-\u9FFF]/g)){if(_0x1804fe(0x4ab)===_0x1804fe(0x544)){const _0xe9aa42=this['getConfigValue'](_0x2622c4),_0x369dbf=0x1,_0x1c3c66=_0xe9aa42+(_0x34a00e?_0x369dbf:-_0x369dbf);_0x1c3c66>0xb&&_0x356b1c?this[_0x1804fe(0x2cc)](_0xe897a4,0x1):this[_0x1804fe(0x2cc)](_0x1069f8,_0x1c3c66['clamp'](0x1,0xb));}else _0x4d46ab=VisuMZ[_0x1804fe(0x1fd)][_0x1804fe(0x366)](_0x4d46ab)[_0x1804fe(0x304)](_0x1804fe(0x461));}return _0x4d46ab=_0x4d46ab['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x4d46ab=_0x4d46ab[_0x1804fe(0x4dd)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x4d46ab;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x366)]=function(_0x52a2cd){const _0x3dc2a3=_0x1e5274;return _0x52a2cd[_0x3dc2a3(0x23f)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)||[];},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2d1)]=function(_0x4b798a){return _0x4b798a;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x498)]=Window_Base[_0x1e5274(0x360)][_0x1e5274(0x284)],Window_Base['prototype']['processNewLine']=function(_0x1943bc){const _0x1c59d6=_0x1e5274;VisuMZ['MessageCore'][_0x1c59d6(0x498)][_0x1c59d6(0x3cb)](this,_0x1943bc),this[_0x1c59d6(0x28d)](_0x1943bc);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x4cd)]=Window_Base[_0x1e5274(0x360)][_0x1e5274(0x4bb)],Window_Base['prototype']['processControlCharacter']=function(_0x18b111,_0xb7f631){const _0x4f4820=_0x1e5274;VisuMZ['MessageCore'][_0x4f4820(0x4cd)][_0x4f4820(0x3cb)](this,_0x18b111,_0xb7f631);if(_0xb7f631==='\x1bWrapBreak[0]'){if(_0x4f4820(0x351)===_0x4f4820(0x351))this[_0x4f4820(0x493)](_0x18b111);else return _0x29b902[_0x4f4820(0x3a8)]+=_0x1c6566[0x0][_0x4f4820(0x475)],_0x19d2b8(_0x204d46[0x0][_0x4f4820(0x3c0)](0x1,_0x2c0f37[0x0][_0x4f4820(0x475)]-0x1));}else{if(_0xb7f631==='\x1bWrapJpBreak[0]'){if(_0x4f4820(0x488)===_0x4f4820(0x488))this[_0x4f4820(0x493)](_0x18b111,!![]);else{if(_0x5945ff[_0x4f4820(0x211)]())return;this[_0x4f4820(0x552)]=this[_0x4f4820(0x552)]||0x0;const _0x4ac711=_0xbcd6b6['MessageCore'][_0x4f4820(0x49c)][_0x4f4820(0x3da)][_0x4f4820(0x4c6)],_0x4e0530=_0x5135cf[_0x4f4820(0x1fd)]['Settings'][_0x4f4820(0x3da)][_0x4f4820(0x456)],_0x1b572f=(0x5-this[_0x4f4820(0x552)])/0x5;this['x']+=_0x130277['floor'](_0x4ac711*_0x1b572f),this['y']+=_0x4e0530;}}}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x3a7)]=function(_0x447c29){const _0x4fa721=_0x1e5274;var _0x252cde=/^\<(.*?)\>/[_0x4fa721(0x2fd)](_0x447c29[_0x4fa721(0x3bf)][_0x4fa721(0x3c0)](_0x447c29['index']));if(_0x252cde){if(_0x4fa721(0x3f0)===_0x4fa721(0x3f0))return _0x447c29[_0x4fa721(0x3a8)]+=_0x252cde[0x0][_0x4fa721(0x475)],String(_0x252cde[0x0][_0x4fa721(0x3c0)](0x1,_0x252cde[0x0]['length']-0x1));else _0x38eaae['y']=this[_0x4fa721(0x262)](_0x227b4e),_0x25c4bd[_0x4fa721(0x1fd)]['Settings'][_0x4fa721(0x3da)]['RelativePXPY']&&(_0x4239c5['y']+=_0x2ee176[_0x4fa721(0x43e)]);}else return'';},VisuMZ[_0x1e5274(0x1fd)]['Window_Base_processEscapeCharacter']=Window_Base[_0x1e5274(0x360)]['processEscapeCharacter'],Window_Base[_0x1e5274(0x360)][_0x1e5274(0x320)]=function(_0x14f350,_0x49168f){const _0x246f4b=_0x1e5274;switch(_0x14f350){case'C':_0x49168f[_0x246f4b(0x326)]?VisuMZ[_0x246f4b(0x1fd)]['Window_Base_processEscapeCharacter'][_0x246f4b(0x3cb)](this,_0x14f350,_0x49168f):_0x246f4b(0x470)===_0x246f4b(0x2b6)?this['obtainEscapeParam'](_0x10ecf7):this[_0x246f4b(0x262)](_0x49168f);break;case'I':case'{':case'}':VisuMZ['MessageCore']['Window_Base_processEscapeCharacter'][_0x246f4b(0x3cb)](this,_0x14f350,_0x49168f);break;case'FS':this[_0x246f4b(0x2ef)](_0x49168f);break;case'PX':this['processPxTextCode'](_0x49168f);break;case'PY':this['processPyTextCode'](_0x49168f);break;case _0x246f4b(0x1f3):this['processFontChangeBold'](this[_0x246f4b(0x262)](_0x49168f));break;case _0x246f4b(0x2ce):this[_0x246f4b(0x55e)](_0x49168f);break;case'COLORLOCK':this[_0x246f4b(0x3d4)](_0x49168f);break;case _0x246f4b(0x3ea):this['processCommonEvent'](_0x49168f);break;case _0x246f4b(0x500):this[_0x246f4b(0x405)](this[_0x246f4b(0x262)](_0x49168f));break;case _0x246f4b(0x322):this[_0x246f4b(0x4ed)](_0x49168f);break;case'PREVCOLOR':this['processPreviousColor'](_0x49168f);break;case _0x246f4b(0x376):this[_0x246f4b(0x2a3)](_0x49168f);break;case _0x246f4b(0x40b):this['processCustomWait'](_0x49168f);break;case _0x246f4b(0x285):this[_0x246f4b(0x493)](_0x49168f);break;case _0x246f4b(0x2c4):this[_0x246f4b(0x493)](_0x49168f,!![]);break;default:this['processMessageCoreEscapeActions'](_0x14f350,_0x49168f);}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x264)]=function(_0x2ef343,_0x2744a8){const _0x41ae2c=_0x1e5274;for(const _0x1c5a36 of VisuMZ['MessageCore'][_0x41ae2c(0x49c)][_0x41ae2c(0x451)]){if(_0x1c5a36[_0x41ae2c(0x528)]===_0x2ef343){if(_0x41ae2c(0x562)!=='HFTLA'){if(!_0x4cbf98[_0x270564])return;this[_0x41ae2c(0x294)]=this[_0x41ae2c(0x294)]||[];const _0x27888f=this[_0x41ae2c(0x32b)][_0x41ae2c(0x47b)],_0x44f0ba=new _0x550788(_0x4a3dc7,_0x27888f);this[_0x41ae2c(0x294)][_0x41ae2c(0x515)](_0x44f0ba);}else{if(_0x1c5a36['Type']==='')this[_0x41ae2c(0x262)](_0x2744a8);_0x1c5a36[_0x41ae2c(0x439)][_0x41ae2c(0x3cb)](this,_0x2744a8);if(this['constructor']===Window_Message){const _0x1232ae=_0x1c5a36[_0x41ae2c(0x46b)]||0x0;if(_0x1232ae>0x0)this[_0x41ae2c(0x4cf)](_0x1232ae);}}}}},Window_Base[_0x1e5274(0x360)]['makeFontBigger']=function(){const _0x991d6e=_0x1e5274;this[_0x991d6e(0x228)]['fontSize']+=VisuMZ[_0x991d6e(0x1fd)][_0x991d6e(0x49c)][_0x991d6e(0x3da)][_0x991d6e(0x50e)],this[_0x991d6e(0x228)][_0x991d6e(0x2a6)]=Math[_0x991d6e(0x502)](this[_0x991d6e(0x228)]['fontSize'],VisuMZ['MessageCore'][_0x991d6e(0x49c)][_0x991d6e(0x3da)][_0x991d6e(0x3d8)]);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x25e)]=function(){const _0x1300f9=_0x1e5274;this[_0x1300f9(0x228)][_0x1300f9(0x2a6)]-=VisuMZ[_0x1300f9(0x1fd)][_0x1300f9(0x49c)]['General'][_0x1300f9(0x50e)],this['contents'][_0x1300f9(0x2a6)]=Math[_0x1300f9(0x209)](this[_0x1300f9(0x228)][_0x1300f9(0x2a6)],VisuMZ['MessageCore'][_0x1300f9(0x49c)][_0x1300f9(0x3da)]['FontSmallerCap']);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2ef)]=function(_0x55d50d){const _0x3a01a0=_0x1e5274,_0x3c96d7=this[_0x3a01a0(0x262)](_0x55d50d);this['contents']['fontSize']=_0x3c96d7[_0x3a01a0(0x2fb)](VisuMZ['MessageCore']['Settings'][_0x3a01a0(0x3da)][_0x3a01a0(0x420)],VisuMZ[_0x3a01a0(0x1fd)][_0x3a01a0(0x49c)][_0x3a01a0(0x3da)]['FontBiggerCap']);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x3cc)]=function(_0x2b918e){const _0x514019=_0x1e5274;let _0x57b54c=this[_0x514019(0x228)][_0x514019(0x2a6)];const _0x3422e5=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x514019(0x2bf)===_0x514019(0x4a8))_0x406570*=_0x442a41[_0x514019(0x3d7)]();else{const _0x3cc869=_0x3422e5[_0x514019(0x2fd)](_0x2b918e);if(!_0x3cc869)break;const _0x1fedd9=String(_0x3cc869[0x1])[_0x514019(0x31c)]();if(_0x1fedd9==='{')this[_0x514019(0x4c0)]();else{if(_0x1fedd9==='}')this['makeFontSmaller']();else _0x1fedd9==='FS'&&(this['contents'][_0x514019(0x2a6)]=parseInt(_0x3cc869[0x3])[_0x514019(0x2fb)](VisuMZ[_0x514019(0x1fd)][_0x514019(0x49c)][_0x514019(0x3da)][_0x514019(0x420)],VisuMZ[_0x514019(0x1fd)]['Settings'][_0x514019(0x3da)][_0x514019(0x3d8)]));}this[_0x514019(0x228)]['fontSize']>_0x57b54c&&(_0x514019(0x3c6)!==_0x514019(0x3c6)?_0xf72a86='':_0x57b54c=this[_0x514019(0x228)][_0x514019(0x2a6)]);}}return _0x57b54c;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x55b)]=function(_0xe14715){const _0x36ff2c=_0x1e5274;_0xe14715['x']=this[_0x36ff2c(0x262)](_0xe14715),VisuMZ[_0x36ff2c(0x1fd)]['Settings'][_0x36ff2c(0x3da)][_0x36ff2c(0x2e1)]&&(_0x36ff2c(0x45c)===_0x36ff2c(0x2ba)?this['prepareShowTextPluginCommandFollowups'](_0x2939e0):_0xe14715['x']+=_0xe14715[_0x36ff2c(0x2b1)]);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x47f)]=function(_0x9ac614){const _0x2afbcb=_0x1e5274;_0x9ac614['y']=this['obtainEscapeParam'](_0x9ac614),VisuMZ[_0x2afbcb(0x1fd)]['Settings']['General'][_0x2afbcb(0x2e1)]&&(_0x9ac614['y']+=_0x9ac614[_0x2afbcb(0x43e)]);},Window_Base[_0x1e5274(0x360)]['processFontChangeBold']=function(_0x1cb08b){const _0x28b93a=_0x1e5274;this[_0x28b93a(0x228)][_0x28b93a(0x425)]=!!_0x1cb08b;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x405)]=function(_0x41c352){const _0x6afe1d=_0x1e5274;this[_0x6afe1d(0x228)][_0x6afe1d(0x422)]=!!_0x41c352;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2a3)]=function(_0x435b6b){const _0x54353c=_0x1e5274,_0x48ce3b=this[_0x54353c(0x262)](_0x435b6b);if(!_0x435b6b['drawing'])return;switch(_0x48ce3b){case 0x0:this[_0x54353c(0x2ff)](_0x54353c(0x333));return;case 0x1:this['setTextAlignment'](_0x54353c(0x2ac));break;case 0x2:this['setTextAlignment'](_0x54353c(0x42e));break;case 0x3:this['setTextAlignment'](_0x54353c(0x266));break;}this[_0x54353c(0x28d)](_0x435b6b);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x28d)]=function(_0x25655e){const _0x4b8667=_0x1e5274;if(!_0x25655e[_0x4b8667(0x326)])return;if(_0x25655e[_0x4b8667(0x51f)])return;if(this['getTextAlignment']()===_0x4b8667(0x333))return;let _0x1967e8=_0x25655e['text'][_0x4b8667(0x2e2)](_0x4b8667(0x543),_0x25655e[_0x4b8667(0x3a8)]+0x1),_0x12549f=_0x25655e['text'][_0x4b8667(0x2e2)]('\x0a',_0x25655e[_0x4b8667(0x3a8)]+0x1);if(_0x1967e8<0x0)_0x1967e8=_0x25655e[_0x4b8667(0x3bf)]['length']+0x1;if(_0x12549f>0x0)_0x1967e8=Math['min'](_0x1967e8,_0x12549f);const _0x1723ec=_0x25655e[_0x4b8667(0x3bf)][_0x4b8667(0x30c)](_0x25655e['index'],_0x1967e8),_0x16b87d=this[_0x4b8667(0x530)](_0x1723ec)[_0x4b8667(0x3c8)],_0x5bbb9a=_0x25655e['width']||this[_0x4b8667(0x3c4)]-0x8,_0x3712e7=this[_0x4b8667(0x480)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this['getTextAlignment']()){case _0x4b8667(0x2ac):_0x25655e['x']=_0x25655e[_0x4b8667(0x2b1)];break;case _0x4b8667(0x42e):_0x25655e['x']=_0x25655e[_0x4b8667(0x2b1)],_0x25655e['x']+=Math[_0x4b8667(0x352)]((_0x5bbb9a-_0x16b87d)/0x2);_0x3712e7&&(_0x25655e['x']-=_0x25655e['startX']/0x2);break;case'right':_0x25655e['x']=_0x5bbb9a-_0x16b87d+_0x25655e[_0x4b8667(0x2b1)];_0x3712e7&&(_0x4b8667(0x233)===_0x4b8667(0x436)?_0x5aa898=_0x64fddf[_0x4b8667(0x352)]((this[_0x4b8667(0x277)]-_0x133fe7['height'])/0x2):_0x25655e['x']-=_0x25655e[_0x4b8667(0x2b1)]);break;}},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x530)]=function(_0x4f0a41){const _0x16e7f9=_0x1e5274;_0x4f0a41=_0x4f0a41[_0x16e7f9(0x4dd)](/\x1b!/g,''),_0x4f0a41=_0x4f0a41[_0x16e7f9(0x4dd)](/\x1b\|/g,''),_0x4f0a41=_0x4f0a41[_0x16e7f9(0x4dd)](/\x1b\./g,'');const _0x87c26d=this[_0x16e7f9(0x487)](_0x4f0a41,0x0,0x0,0x0),_0x2eace6=this[_0x16e7f9(0x4d0)]();return _0x87c26d[_0x16e7f9(0x326)]=![],this[_0x16e7f9(0x257)](_0x87c26d),this[_0x16e7f9(0x399)](_0x2eace6),{'width':_0x87c26d[_0x16e7f9(0x26b)],'height':_0x87c26d[_0x16e7f9(0x3d1)]};},Window_Base['WORD_WRAP_PADDING']=VisuMZ['MessageCore'][_0x1e5274(0x49c)][_0x1e5274(0x512)][_0x1e5274(0x36b)]||0x0,Window_Base[_0x1e5274(0x360)][_0x1e5274(0x493)]=function(_0x5d9900,_0x49237b){const _0x3c22ad=_0x1e5274,_0x5b3093=(_0x5d9900[_0x3c22ad(0x51f)]?-0x1:0x1)*this[_0x3c22ad(0x4d4)]('\x20');if(!_0x49237b)_0x5d9900['x']+=_0x5b3093;if(this[_0x3c22ad(0x262)](_0x5d9900)>0x0&&!_0x49237b)_0x5d9900['x']+=_0x5b3093;if(_0x5d9900[_0x3c22ad(0x51f)])return;let _0x48e49c;_0x49237b?_0x48e49c=_0x5d9900[_0x3c22ad(0x3bf)][_0x3c22ad(0x2e2)](_0x3c22ad(0x461),_0x5d9900['index']+0x1):_0x48e49c=_0x5d9900[_0x3c22ad(0x3bf)][_0x3c22ad(0x2e2)]('\x1bWrapBreak[0]',_0x5d9900[_0x3c22ad(0x3a8)]+0x1);let _0x14dd50=_0x5d9900[_0x3c22ad(0x3bf)]['indexOf']('\x0a',_0x5d9900[_0x3c22ad(0x3a8)]+0x1);if(_0x48e49c<0x0)_0x48e49c=_0x5d9900['text'][_0x3c22ad(0x475)]+0x1;if(_0x14dd50>0x0)_0x48e49c=Math[_0x3c22ad(0x502)](_0x48e49c,_0x14dd50);const _0x3edb77=_0x5d9900[_0x3c22ad(0x3bf)][_0x3c22ad(0x30c)](_0x5d9900[_0x3c22ad(0x3a8)],_0x48e49c),_0x1f332b=this[_0x3c22ad(0x44b)](_0x3edb77)[_0x3c22ad(0x3c8)];let _0x2fcee1=_0x5d9900[_0x3c22ad(0x3c8)]||this[_0x3c22ad(0x3c4)];_0x2fcee1-=Window_Base[_0x3c22ad(0x394)];if(this['constructor']===Window_Message){const _0xf6fa5a=$gameMessage[_0x3c22ad(0x3a5)]()===''?0x0:ImageManager[_0x3c22ad(0x27d)]+0x14;_0x2fcee1-=_0xf6fa5a,VisuMZ['MessageCore']['Settings']['WordWrap'][_0x3c22ad(0x206)]&&(_0x2fcee1-=_0xf6fa5a);}let _0x2359fc=![];if(_0x5d9900['x']+_0x1f332b>_0x5d9900[_0x3c22ad(0x2b1)]+_0x2fcee1)_0x2359fc=!![];if(_0x1f332b===0x0)_0x2359fc=!![];_0x2359fc&&(_0x5d9900[_0x3c22ad(0x3bf)]=_0x5d9900[_0x3c22ad(0x3bf)][_0x3c22ad(0x3c0)](0x0,_0x5d9900[_0x3c22ad(0x3a8)])+'\x0a'+_0x5d9900[_0x3c22ad(0x3bf)][_0x3c22ad(0x54a)](_0x5d9900[_0x3c22ad(0x3a8)]));},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x44b)]=function(_0x173b87){const _0x3309a8=_0x1e5274,_0x212db2=this['createTextState'](_0x173b87,0x0,0x0,0x0),_0x23e4c5=this['getPreservedFontSettings']();return _0x212db2[_0x3309a8(0x326)]=![],this[_0x3309a8(0x3b5)](![]),this[_0x3309a8(0x257)](_0x212db2),this[_0x3309a8(0x3b5)](!![]),this['returnPreservedFontSettings'](_0x23e4c5),{'width':_0x212db2[_0x3309a8(0x26b)],'height':_0x212db2['outputHeight']};},Window_Base['prototype'][_0x1e5274(0x3fc)]=function(_0x2cf508){const _0x1ef7c1=_0x1e5274;return this[_0x1ef7c1(0x262)](_0x2cf508);},Window_Base[_0x1e5274(0x360)]['processDrawPicture']=function(_0x15dcbd){const _0x9ff547=_0x1e5274,_0x26a180=this['obtainEscapeString'](_0x15dcbd)['split'](',');if(!_0x15dcbd[_0x9ff547(0x326)])return;const _0x5f4e01=_0x26a180[0x0]['trim'](),_0x1f767d=_0x26a180[0x1]||0x0,_0x508ec4=_0x26a180[0x2]||0x0,_0x1e32b7=ImageManager[_0x9ff547(0x398)](_0x5f4e01),_0x2e7e8f=this['contents'][_0x9ff547(0x2a5)];_0x1e32b7[_0x9ff547(0x396)](this['drawBackPicture'][_0x9ff547(0x55f)](this,_0x1e32b7,_0x15dcbd['x'],_0x15dcbd['y'],_0x1f767d,_0x508ec4,_0x2e7e8f));},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x2b3)]=function(_0xaf6de,_0x2af283,_0x5a69ee,_0x492643,_0x2b7ee5,_0x4ed1d8){const _0x5c54cd=_0x1e5274;_0x492643=_0x492643||_0xaf6de[_0x5c54cd(0x3c8)],_0x2b7ee5=_0x2b7ee5||_0xaf6de['height'],this[_0x5c54cd(0x22f)]['paintOpacity']=_0x4ed1d8,this['contentsBack'][_0x5c54cd(0x3d6)](_0xaf6de,0x0,0x0,_0xaf6de['width'],_0xaf6de['height'],_0x2af283,_0x5a69ee,_0x492643,_0x2b7ee5),this[_0x5c54cd(0x22f)][_0x5c54cd(0x2a5)]=0xff;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x55e)]=function(_0x364592){const _0xfa0983=_0x1e5274,_0x2aa4fc=this['obtainEscapeString'](_0x364592)[_0xfa0983(0x438)](',');if(!_0x364592[_0xfa0983(0x326)])return;const _0x1d8e0a=_0x2aa4fc[0x0]['trim'](),_0x4ab365=ImageManager[_0xfa0983(0x398)](_0x1d8e0a),_0x6e6329=JsonEx[_0xfa0983(0x4b7)](_0x364592),_0x4981be=this['contents'][_0xfa0983(0x2a5)];_0x4ab365[_0xfa0983(0x396)](this[_0xfa0983(0x270)][_0xfa0983(0x55f)](this,_0x4ab365,_0x6e6329,_0x4981be));},Window_Base['prototype'][_0x1e5274(0x270)]=function(_0xf36b6,_0x6b2ae,_0x3ea85a){const _0x26f196=_0x1e5274,_0x5aa477=_0x6b2ae[_0x26f196(0x3c8)]||this['innerWidth'],_0x1c2246=this[_0x26f196(0x359)]!==undefined?this['itemHeight']():this[_0x26f196(0x313)],_0x354da6=_0x5aa477/_0xf36b6[_0x26f196(0x3c8)],_0x178476=_0x1c2246/_0xf36b6[_0x26f196(0x277)],_0x12ce86=Math[_0x26f196(0x502)](_0x354da6,_0x178476,0x1),_0x129468=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)['height']-this['lineHeight']())/0x2:0x0,_0x499c82=_0xf36b6[_0x26f196(0x3c8)]*_0x12ce86,_0xd83c15=_0xf36b6['height']*_0x12ce86,_0x4103c7=Math[_0x26f196(0x352)]((_0x5aa477-_0x499c82)/0x2)+_0x6b2ae[_0x26f196(0x2b1)],_0x14beeb=Math[_0x26f196(0x352)]((_0x1c2246-_0xd83c15)/0x2)+_0x6b2ae[_0x26f196(0x43e)]-_0x129468*0x2;this[_0x26f196(0x22f)][_0x26f196(0x2a5)]=_0x3ea85a,this[_0x26f196(0x22f)][_0x26f196(0x3d6)](_0xf36b6,0x0,0x0,_0xf36b6[_0x26f196(0x3c8)],_0xf36b6['height'],_0x4103c7,_0x14beeb,_0x499c82,_0xd83c15),this[_0x26f196(0x22f)][_0x26f196(0x2a5)]=0xff;},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x3d4)]=function(_0x188837){const _0x3294cf=_0x1e5274,_0x1a14d6=this[_0x3294cf(0x262)](_0x188837);if(_0x188837[_0x3294cf(0x326)])this[_0x3294cf(0x32e)](_0x1a14d6>0x0);},Window_Base[_0x1e5274(0x360)][_0x1e5274(0x44a)]=function(_0x37bf62){const _0x28c169=_0x1e5274,_0x408b97=this[_0x28c169(0x262)](_0x37bf62);this[_0x28c169(0x480)]===Window_Message&&_0x37bf62['drawing']&&this[_0x28c169(0x2be)](_0x408b97);},Window_Help[_0x1e5274(0x360)]['resetWordWrap']=function(){const _0x4ad006=_0x1e5274;this[_0x4ad006(0x3b5)]($gameSystem[_0x4ad006(0x464)]());},Window_Help[_0x1e5274(0x360)][_0x1e5274(0x308)]=function(){return!![];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x48b)]=Window_Help[_0x1e5274(0x360)][_0x1e5274(0x3a4)],Window_Help[_0x1e5274(0x360)][_0x1e5274(0x3a4)]=function(){const _0x6e9191=_0x1e5274;this[_0x6e9191(0x548)](),VisuMZ['MessageCore'][_0x6e9191(0x48b)][_0x6e9191(0x3cb)](this),this[_0x6e9191(0x40a)]();},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x282)]=Window_Options[_0x1e5274(0x360)][_0x1e5274(0x3c3)],Window_Options[_0x1e5274(0x360)][_0x1e5274(0x3c3)]=function(){const _0x3cb305=_0x1e5274;VisuMZ[_0x3cb305(0x1fd)][_0x3cb305(0x282)][_0x3cb305(0x3cb)](this),this['addMessageCoreCommands']();},Window_Options['prototype'][_0x1e5274(0x3bd)]=function(){const _0x111c1d=_0x1e5274;VisuMZ[_0x111c1d(0x1fd)][_0x111c1d(0x49c)]['TextSpeed'][_0x111c1d(0x43f)]&&(_0x111c1d(0x53c)===_0x111c1d(0x53c)?this[_0x111c1d(0x335)]():this['setLastGainedItemData'](_0x19680a,_0x3ccde7));},Window_Options[_0x1e5274(0x360)][_0x1e5274(0x335)]=function(){const _0x5a5737=_0x1e5274,_0x38339b=TextManager[_0x5a5737(0x41f)],_0x4d415d=_0x5a5737(0x36c);this[_0x5a5737(0x3d2)](_0x38339b,_0x4d415d);},VisuMZ['MessageCore'][_0x1e5274(0x350)]=Window_Options[_0x1e5274(0x360)][_0x1e5274(0x382)],Window_Options[_0x1e5274(0x360)][_0x1e5274(0x382)]=function(_0x4e25ea){const _0x3b65bd=_0x1e5274,_0x5ef286=this[_0x3b65bd(0x1fb)](_0x4e25ea);if(_0x5ef286===_0x3b65bd(0x36c))return this['textSpeedStatusText']();return VisuMZ[_0x3b65bd(0x1fd)]['Window_Options_statusText'][_0x3b65bd(0x3cb)](this,_0x4e25ea);},VisuMZ['MessageCore'][_0x1e5274(0x30e)]=Window_Options[_0x1e5274(0x360)][_0x1e5274(0x3ad)],Window_Options[_0x1e5274(0x360)]['isVolumeSymbol']=function(_0x412335){const _0x1154cc=_0x1e5274;if(_0x412335===_0x1154cc(0x36c))return!![];return VisuMZ['MessageCore'][_0x1154cc(0x30e)]['call'](this,_0x412335);},Window_Options[_0x1e5274(0x360)][_0x1e5274(0x4bc)]=function(){const _0x441861=_0x1e5274,_0x5afac0=this[_0x441861(0x388)](_0x441861(0x36c));return _0x5afac0>0xa?_0x441861(0x2b0)===_0x441861(0x306)?(_0x56a04e[_0x441861(0x2ca)]-this[_0x441861(0x3fb)]())/0x2:TextManager[_0x441861(0x472)]:_0x5afac0;},VisuMZ[_0x1e5274(0x1fd)]['Window_Options_changeVolume']=Window_Options[_0x1e5274(0x360)][_0x1e5274(0x4f5)],Window_Options[_0x1e5274(0x360)][_0x1e5274(0x4f5)]=function(_0x4aba4a,_0xa683a1,_0x4f8782){const _0x4e7e28=_0x1e5274;if(_0x4aba4a==='textSpeed')return this[_0x4e7e28(0x25f)](_0x4aba4a,_0xa683a1,_0x4f8782);VisuMZ[_0x4e7e28(0x1fd)][_0x4e7e28(0x47a)][_0x4e7e28(0x3cb)](this,_0x4aba4a,_0xa683a1,_0x4f8782);},Window_Options[_0x1e5274(0x360)]['changeTextSpeed']=function(_0x16409f,_0x2b0f28,_0x40d144){const _0x1cbb34=_0x1e5274,_0x2e4125=this['getConfigValue'](_0x16409f),_0x5e1c65=0x1,_0xc5dae6=_0x2e4125+(_0x2b0f28?_0x5e1c65:-_0x5e1c65);if(_0xc5dae6>0xb&&_0x40d144)this[_0x1cbb34(0x2cc)](_0x16409f,0x1);else{if('FPuOF'==='GQiNq'){_0x7ac121[_0x1cbb34(0x528)]=_0x376a8d['Match'][_0x1cbb34(0x31c)](),_0x2c66ff[_0x1cbb34(0x508)]=new _0xd1f0d0('\x1b'+_0x46b5bd[_0x1cbb34(0x528)],'gi'),_0x2a29e5['textCodeResult']='\x1b'+_0x2f9bee['Match'];if(_0x9f7e60[_0x1cbb34(0x38e)]==='')_0x5f3229[_0x1cbb34(0x24a)]+=_0x1cbb34(0x3e7);}else this[_0x1cbb34(0x2cc)](_0x16409f,_0xc5dae6[_0x1cbb34(0x2fb)](0x1,0xb));}},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x281)]=function(){const _0x23913f=_0x1e5274;let _0x4a2a5f=Window_Base['prototype']['contentsHeight'][_0x23913f(0x3cb)](this);return _0x4a2a5f-=this['addedHeight'](),_0x4a2a5f;},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x3f8)]=function(){const _0x545c31=_0x1e5274;Window_Base['prototype']['refreshDimmerBitmap'][_0x545c31(0x3cb)](this),VisuMZ[_0x545c31(0x1fd)][_0x545c31(0x49c)]['General']['StretchDimmedBg']&&this[_0x545c31(0x2f7)]();},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x2f7)]=function(){const _0x3f3d78=_0x1e5274;this['_dimmerSprite']['x']=Math[_0x3f3d78(0x482)](this[_0x3f3d78(0x3c8)]/0x2),this[_0x3f3d78(0x224)][_0x3f3d78(0x494)]['x']=0.5,this['_dimmerSprite'][_0x3f3d78(0x4f6)]['x']=Graphics[_0x3f3d78(0x3c8)];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x345)]=Window_Message[_0x1e5274(0x360)][_0x1e5274(0x246)],Window_Message['prototype'][_0x1e5274(0x246)]=function(){const _0x478733=_0x1e5274;VisuMZ[_0x478733(0x1fd)][_0x478733(0x345)][_0x478733(0x3cb)](this),this[_0x478733(0x548)](),this['resetWordWrap'](),this[_0x478733(0x32e)](![]),this[_0x478733(0x2ff)](_0x478733(0x333)),this[_0x478733(0x534)](VisuMZ['MessageCore'][_0x478733(0x49c)][_0x478733(0x3da)][_0x478733(0x3aa)]);},Window_Message['prototype'][_0x1e5274(0x40a)]=function(){const _0xd8696c=_0x1e5274;this[_0xd8696c(0x3b5)]($gameSystem[_0xd8696c(0x496)]());},Window_Message[_0x1e5274(0x360)]['isAutoColorAffected']=function(){return!![];},Window_Message[_0x1e5274(0x360)]['setTextDelay']=function(_0xfe97fd){const _0x38762a=_0x1e5274,_0x1634a0=0xb-ConfigManager[_0x38762a(0x36c)];_0xfe97fd=Math['round'](_0xfe97fd*_0x1634a0),this[_0x38762a(0x446)]=_0xfe97fd,this[_0x38762a(0x3bc)]=_0xfe97fd;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x203)]=Window_Message['prototype']['isTriggered'],Window_Message[_0x1e5274(0x360)][_0x1e5274(0x2a8)]=function(){const _0x546177=_0x1e5274;return VisuMZ[_0x546177(0x1fd)][_0x546177(0x203)]['call'](this)||Input[_0x546177(0x4f2)](VisuMZ['MessageCore'][_0x546177(0x49c)]['General'][_0x546177(0x4d8)]);},VisuMZ['MessageCore']['Window_Message_updatePlacement']=Window_Message[_0x1e5274(0x360)][_0x1e5274(0x2e0)],Window_Message[_0x1e5274(0x360)][_0x1e5274(0x2e0)]=function(){const _0x1e4675=_0x1e5274;let _0x4703da=this['y'];this['x']=Math['round']((Graphics['boxWidth']-this[_0x1e4675(0x3c8)])/0x2),VisuMZ[_0x1e4675(0x1fd)]['Window_Message_updatePlacement']['call'](this);if(this[_0x1e4675(0x226)])this['y']=_0x4703da;this[_0x1e4675(0x484)](),this[_0x1e4675(0x387)](),this[_0x1e4675(0x52d)](),this[_0x1e4675(0x35c)]();},VisuMZ[_0x1e5274(0x1fd)]['Window_Message_newPage']=Window_Message[_0x1e5274(0x360)][_0x1e5274(0x297)],Window_Message['prototype'][_0x1e5274(0x297)]=function(_0x260a86){const _0x5a4434=_0x1e5274;this[_0x5a4434(0x4b4)](_0x260a86),this['onNewPageMessageCore'](_0x260a86),VisuMZ['MessageCore'][_0x5a4434(0x2e7)]['call'](this,_0x260a86),this[_0x5a4434(0x401)]();},Window_Message[_0x1e5274(0x360)]['convertNewPageTextStateMacros']=function(_0xa4140c){const _0x4b17a0=_0x1e5274;if(!_0xa4140c)return;this[_0x4b17a0(0x468)]=![],_0xa4140c[_0x4b17a0(0x3bf)]=this[_0x4b17a0(0x210)](_0xa4140c['text']),this['_textMacroFound']&&(_0xa4140c[_0x4b17a0(0x3bf)]=this[_0x4b17a0(0x241)](_0xa4140c[_0x4b17a0(0x3bf)]),this[_0x4b17a0(0x468)]=!![]);},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x241)]=function(_0x458869){const _0x26bad3=_0x1e5274;if(this['_macroBypassWordWrap'])return _0x458869;return Window_Base[_0x26bad3(0x360)][_0x26bad3(0x241)]['call'](this,_0x458869);},Window_Message['prototype'][_0x1e5274(0x477)]=function(_0x6312c2){const _0x48dc16=_0x1e5274;this[_0x48dc16(0x452)](_0x6312c2),this['prepareAutoSizeEscapeCharacters'](_0x6312c2),this[_0x48dc16(0x27f)]();},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x478)]=Window_Message[_0x1e5274(0x360)]['terminateMessage'],Window_Message[_0x1e5274(0x360)][_0x1e5274(0x380)]=function(){const _0x2df51b=_0x1e5274;VisuMZ['MessageCore'][_0x2df51b(0x478)]['call'](this),this[_0x2df51b(0x246)]();if(this[_0x2df51b(0x4a0)])this['messagePositionReset']();},Window_Message['prototype']['updateDimensions']=function(){const _0xb48295=_0x1e5274;this[_0xb48295(0x3c8)]=$gameSystem[_0xb48295(0x391)]()+this['addedWidth']();;this['width']=Math['min'](Graphics['width'],this['width']);const _0x5f118e=$gameSystem[_0xb48295(0x1ed)]();this[_0xb48295(0x277)]=SceneManager['_scene'][_0xb48295(0x462)](_0x5f118e,![])+this[_0xb48295(0x275)](),this[_0xb48295(0x277)]=Math[_0xb48295(0x502)](Graphics['height'],this[_0xb48295(0x277)]);if($gameTemp['_centerMessageWindow'])this[_0xb48295(0x450)]();},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x34d)]=function(){return 0x0;},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x275)]=function(){return 0x0;},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x450)]=function(){const _0x22b2b9=_0x1e5274;this['x']=(Graphics[_0x22b2b9(0x2ca)]-this[_0x22b2b9(0x3c8)])/0x2,$gameTemp[_0x22b2b9(0x377)]=undefined,this['clampPlacementPosition']();},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x26c)]=function(){const _0x32b4c6=_0x1e5274,_0x3e9e50={'x':this['x'],'y':this['y']};Window_Base[_0x32b4c6(0x360)][_0x32b4c6(0x26c)][_0x32b4c6(0x3cb)](this),this[_0x32b4c6(0x3a6)](_0x3e9e50);},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x532)]=function(){return!![];},Window_Message['prototype'][_0x1e5274(0x3a6)]=function(_0x6ab569){const _0x58723f=_0x1e5274;this[_0x58723f(0x236)]&&(_0x58723f(0x55a)===_0x58723f(0x55a)?(this[_0x58723f(0x236)]['x']+=this['x']-_0x6ab569['x'],this['_nameBoxWindow']['y']+=this['y']-_0x6ab569['y']):this[_0x58723f(0x228)][_0x58723f(0x425)]=!!_0x28a8a0);},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x29a)]=function(_0x526748,_0x1b8de8){const _0x2b7644=_0x1e5274;this[_0x2b7644(0x52b)](this['_resetRect']['x'],this[_0x2b7644(0x499)]*(Graphics[_0x2b7644(0x2fc)]-this[_0x2b7644(0x277)])/0x2,this[_0x2b7644(0x44e)][_0x2b7644(0x3c8)],this[_0x2b7644(0x44e)][_0x2b7644(0x277)],_0x526748,_0x1b8de8);},Window_Message['prototype'][_0x1e5274(0x3fc)]=function(_0x3db8e9){const _0x9fab36=_0x1e5274,_0x388804=Window_Base[_0x9fab36(0x360)]['processCommonEvent'][_0x9fab36(0x3cb)](this,_0x3db8e9);_0x3db8e9[_0x9fab36(0x326)]&&('NWprr'!=='NWprr'?(this[_0x9fab36(0x4d9)][_0x9fab36(0x4be)](),this[_0x9fab36(0x4d9)][_0x9fab36(0x2dc)]()):this[_0x9fab36(0x4cf)](_0x388804));},Window_Message['prototype'][_0x1e5274(0x4cf)]=function(_0x57b997){const _0x33db15=_0x1e5274;if($gameParty[_0x33db15(0x442)]()){}else $gameMap['addMessageCommonEvent'](_0x57b997);},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x3ec)]=function(_0x562119){const _0x2a3397=_0x1e5274;this[_0x2a3397(0x446)]--;if(this[_0x2a3397(0x446)]<=0x0){if(_0x2a3397(0x2f1)===_0x2a3397(0x497)){if(!_0x418849[_0x2a3397(0x217)](_0x21d66a))return!![];}else this[_0x2a3397(0x32c)](_0x562119),Window_Base[_0x2a3397(0x360)]['processCharacter'][_0x2a3397(0x3cb)](this,_0x562119);}},Window_Message['prototype'][_0x1e5274(0x32c)]=function(_0x24b959){const _0x218941=_0x1e5274;this[_0x218941(0x446)]=this[_0x218941(0x3bc)];if(this['_textDelay']<=0x0)this[_0x218941(0x2c9)]=!![];},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x2ea)]=Window_Message[_0x1e5274(0x360)]['processEscapeCharacter'],Window_Message[_0x1e5274(0x360)]['processEscapeCharacter']=function(_0x3745d3,_0x7c621){const _0x3d386f=_0x1e5274;if(!_0x7c621[_0x3d386f(0x326)])Window_Base[_0x3d386f(0x360)][_0x3d386f(0x320)]['call'](this,_0x3745d3,_0x7c621);else{if(_0x3d386f(0x389)==='rAHtI'){if(!this['_pictureTextSprite'])return;this[_0x3d386f(0x265)]['anchor']['x']=this['anchor']['x'],this['_pictureTextSprite']['anchor']['y']=this[_0x3d386f(0x494)]['y'];}else VisuMZ[_0x3d386f(0x1fd)][_0x3d386f(0x2ea)][_0x3d386f(0x3cb)](this,_0x3745d3,_0x7c621);}},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x291)]=Window_Message[_0x1e5274(0x360)]['needsNewPage'],Window_Message['prototype'][_0x1e5274(0x339)]=function(_0x597e66){const _0x37f8a4=_0x1e5274;if(this[_0x37f8a4(0x2c7)])return![];return VisuMZ[_0x37f8a4(0x1fd)]['Window_Message_needsNewPage'][_0x37f8a4(0x3cb)](this,_0x597e66);},Window_Message['prototype'][_0x1e5274(0x452)]=function(_0x2a2bc9){const _0xbb7c9=_0x1e5274;let _0x335359=_0x2a2bc9['text'];this['_forcedPosition']={};if(this[_0xbb7c9(0x214)]())return _0x335359;_0x335359=_0x335359[_0xbb7c9(0x4dd)](/<POSITION:[ ]*(.*?)>/gi,(_0x54ad2e,_0x2fe40e)=>{const _0x582a68=_0xbb7c9,_0x28ba82=_0x2fe40e[_0x582a68(0x438)](',')[_0x582a68(0x42d)](_0x4aeee9=>Number(_0x4aeee9)||0x0);if(_0x28ba82[0x0]!==undefined)this[_0x582a68(0x3cf)]['x']=Number(_0x28ba82[0x0]);if(_0x28ba82[0x1]!==undefined)this[_0x582a68(0x3cf)]['y']=Number(_0x28ba82[0x1]);if(_0x28ba82[0x2]!==undefined)this['_forcedPosition'][_0x582a68(0x3c8)]=Number(_0x28ba82[0x2]);if(_0x28ba82[0x3]!==undefined)this[_0x582a68(0x3cf)][_0x582a68(0x277)]=Number(_0x28ba82[0x3]);return'';}),_0x335359=_0x335359[_0xbb7c9(0x4dd)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x4ca581,_0x59d44a)=>{const _0x3046c9=_0xbb7c9,_0x127022=_0x59d44a[_0x3046c9(0x438)](',')['map'](_0x457a6b=>Number(_0x457a6b)||0x0);if(_0x127022[0x0]!==undefined)this[_0x3046c9(0x3cf)]['x']=Number(_0x127022[0x0]);if(_0x127022[0x1]!==undefined)this[_0x3046c9(0x3cf)]['y']=Number(_0x127022[0x1]);return'';}),_0x335359=_0x335359[_0xbb7c9(0x4dd)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x41ca23,_0xabdfb9)=>{const _0x246e54=_0xbb7c9,_0x161461=_0xabdfb9['split'](',')[_0x246e54(0x42d)](_0x322816=>Number(_0x322816)||0x0);if(_0x161461[0x0]!==undefined)this['_forcedPosition'][_0x246e54(0x3c8)]=Number(_0x161461[0x2]);if(_0x161461[0x1]!==undefined)this['_forcedPosition'][_0x246e54(0x277)]=Number(_0x161461[0x3]);return'';}),_0x335359=_0x335359[_0xbb7c9(0x4dd)](/<OFFSET:[ ]*(.*?)>/gi,(_0x57c2f1,_0x1723e5)=>{const _0xab3872=_0xbb7c9,_0x52efb0=_0x1723e5['split'](',')[_0xab3872(0x42d)](_0x33312e=>Number(_0x33312e)||0x0);let _0x3e15d7=_0x52efb0[0x0]||0x0,_0x2bac48=_0x52efb0[0x1]||0x0;return $gameSystem[_0xab3872(0x441)](_0x3e15d7,_0x2bac48),'';}),_0x2a2bc9[_0xbb7c9(0x3bf)]=_0x335359;},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x484)]=function(){const _0x2941c5=_0x1e5274,_0xd4b5cb=$gameSystem[_0x2941c5(0x41e)]();this['x']+=_0xd4b5cb['x'],this['y']+=_0xd4b5cb['y'];},Window_Message[_0x1e5274(0x360)]['updateForcedPlacement']=function(){const _0x475d93=_0x1e5274;this[_0x475d93(0x3cf)]=this['_forcedPosition']||{};const _0x207834=['x','y',_0x475d93(0x3c8),_0x475d93(0x277)];for(const _0x1169d7 of _0x207834){this[_0x475d93(0x3cf)][_0x1169d7]!==undefined&&(this[_0x1169d7]=Number(this['_forcedPosition'][_0x1169d7]));}},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x418)]=function(_0x14790a){const _0x345ab1=_0x1e5274;this['_currentAutoSize']=![];let _0x56c45e=_0x14790a[_0x345ab1(0x3bf)];_0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0xb74e6=_0x345ab1;if(_0xb74e6(0x327)===_0xb74e6(0x327))return this[_0xb74e6(0x3ca)](_0x56c45e,!![],!![]),this[_0xb74e6(0x51d)](_0xb74e6(0x546)),'';else for(const _0x2bda39 of _0x515872[_0xb74e6(0x1fd)][_0xb74e6(0x49c)]['TextMacros']){_0x2bda39[_0xb74e6(0x508)]=new _0x5b5af3('\x5c['+_0x2bda39[_0xb74e6(0x528)]+'\x5c]','gi');if(_0x2bda39[_0xb74e6(0x519)]!==''&&_0x2bda39[_0xb74e6(0x519)]!==_0xb74e6(0x503)){let _0x201e0a=_0x2bda39[_0xb74e6(0x519)];_0x201e0a=_0x201e0a[_0xb74e6(0x4dd)](/\\/g,'\x1b'),_0x201e0a=_0x201e0a[_0xb74e6(0x4dd)]('\x27','\x5c\x27'),_0x201e0a=_0x201e0a['replace']('\x22','\x5c\x22'),_0x2bda39['textCodeResult']=new _0x420dca('return\x20\x27'+_0x201e0a+'\x27');}else _0x2bda39[_0xb74e6(0x24a)]=_0x2bda39[_0xb74e6(0x247)];}}),_0x56c45e=_0x56c45e['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x1eb368=_0x345ab1;if(_0x1eb368(0x533)!==_0x1eb368(0x533)){const _0x363edf=_0x3d7258['choicePositionType']();if(_0x363edf===0x1)return(_0x4d3104[_0x1eb368(0x2ca)]-this[_0x1eb368(0x3fb)]())/0x2;else return _0x363edf===0x2?this[_0x1eb368(0x37d)]['x']+this['_messageWindow']['width']-this[_0x1eb368(0x3fb)]():this[_0x1eb368(0x37d)]['x'];}else return this[_0x1eb368(0x3ca)](_0x56c45e,!![],![]),this['processAutoPosition'](_0x1eb368(0x546)),'';}),_0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0xf0d642=_0x345ab1;return this[_0xf0d642(0x3ca)](_0x56c45e,![],!![]),this[_0xf0d642(0x51d)](_0xf0d642(0x546)),'';});if(SceneManager[_0x345ab1(0x53a)]())_0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x82e2a2,_0x1f4a7d)=>{const _0x451550=_0x345ab1;return this[_0x451550(0x3ca)](_0x56c45e,!![],!![]),this[_0x451550(0x51d)]('battle\x20actor',Number(_0x1f4a7d)||0x1),'';}),_0x56c45e=_0x56c45e['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x5ab1a7,_0xb4bcb6)=>{const _0x49bcb6=_0x345ab1;return this[_0x49bcb6(0x3ca)](_0x56c45e,!![],!![]),this[_0x49bcb6(0x51d)](_0x49bcb6(0x267),Number(_0xb4bcb6)||0x0),'';}),_0x56c45e=_0x56c45e['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2d0979,_0x47cdb6)=>{const _0x130eba=_0x345ab1;return this['processAutoSize'](_0x56c45e,!![],!![]),this[_0x130eba(0x51d)](_0x130eba(0x3fa),Number(_0x47cdb6)||0x0),'';});else{if(SceneManager[_0x345ab1(0x42f)]()){if('Ndiya'===_0x345ab1(0x44f)){if(this['_MessageCoreSettings']===_0x583a55)this[_0x345ab1(0x24e)]();if(this['_MessageCoreSettings'][_0x345ab1(0x287)]===_0x507c6a)this[_0x345ab1(0x24e)]();return this[_0x345ab1(0x4da)]['choiceRows'];}else _0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x5f3271,_0x1520a7)=>{const _0x5460b2=_0x345ab1;return this['processAutoSize'](_0x56c45e,!![],!![]),this[_0x5460b2(0x51d)](_0x5460b2(0x200),0x0),'';}),_0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x316007,_0x2b996a)=>{const _0xf1c1ba=_0x345ab1;if('poitd'!==_0xf1c1ba(0x39f))return this[_0xf1c1ba(0x3ca)](_0x56c45e,!![],!![]),this['processAutoPosition'](_0xf1c1ba(0x35b),Number(_0x2b996a)||0x1),'';else{const _0x3f139e=this['choiceListHelpWindowRect'](),_0x51c5e0=new _0xe98aa4(_0x3f139e);_0x51c5e0[_0xf1c1ba(0x2dc)](),this[_0xf1c1ba(0x506)]['setHelpWindow'](_0x51c5e0),this[_0xf1c1ba(0x37d)]['setChoiceListHelpWindow'](_0x51c5e0),this[_0xf1c1ba(0x411)](_0x51c5e0),this['_choiceListHelpWindow']=_0x51c5e0;}}),_0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x5d6858,_0xd5afd4)=>{const _0x27a625=_0x345ab1;return _0x27a625(0x553)===_0x27a625(0x1fc)?(this[_0x27a625(0x3ca)](_0x1c6491,!![],![]),this[_0x27a625(0x51d)](_0x27a625(0x546)),''):(this[_0x27a625(0x3ca)](_0x56c45e,!![],!![]),this['processAutoPosition'](_0x27a625(0x560),Number(_0xd5afd4)||0x0),'');}),_0x56c45e=_0x56c45e[_0x345ab1(0x4dd)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x1cff71,_0x5b2048)=>{const _0x5f57d2=_0x345ab1;if(_0x5f57d2(0x43c)!=='xTqAa')_0x32a737[_0x5f57d2(0x3bf)]=_0x6c1832['text'][_0x5f57d2(0x3c0)](0x0,_0x3656bd[_0x5f57d2(0x3a8)])+'\x0a'+_0xfa48c9['text']['substr'](_0x1cc626[_0x5f57d2(0x3a8)]);else return this[_0x5f57d2(0x3ca)](_0x56c45e,!![],!![]),this[_0x5f57d2(0x51d)](_0x5f57d2(0x386),Number(_0x5b2048)||0x0),'';});}}_0x14790a[_0x345ab1(0x3bf)]=_0x56c45e;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x1e5274(0x471)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x1e5274(0x360)][_0x1e5274(0x3ca)]=function(_0x4823e,_0x4f7f49,_0x50085c){const _0x59eed8=_0x1e5274;_0x4823e=_0x4823e[_0x59eed8(0x4dd)](Window_Message[_0x59eed8(0x448)],''),_0x4823e=_0x4823e[_0x59eed8(0x4dd)](Window_Message[_0x59eed8(0x471)],''),this[_0x59eed8(0x428)]=!![],this[_0x59eed8(0x2c7)]=!![],this[_0x59eed8(0x3b5)](![]);const _0x2a2a4c=this['textSizeExRaw'](_0x4823e);if(_0x4f7f49){if(_0x59eed8(0x2e8)===_0x59eed8(0x2e8)){let _0xc044e1=_0x2a2a4c[_0x59eed8(0x3c8)]+$gameSystem[_0x59eed8(0x50b)]()*0x2+0x6;const _0x19b288=$gameMessage[_0x59eed8(0x3a5)]()!=='',_0x58aae2=ImageManager['faceWidth'],_0x3a082a=0x14;_0xc044e1+=_0x19b288?_0x58aae2+_0x3a082a:0x4;if(_0xc044e1%0x2!==0x0)_0xc044e1+=0x1;$gameSystem[_0x59eed8(0x331)](_0xc044e1);}else this[_0x59eed8(0x4be)]();}if(_0x50085c){let _0x6a2288=Math[_0x59eed8(0x2a1)](_0x2a2a4c['height']/this['lineHeight']());$gameSystem[_0x59eed8(0x485)](_0x6a2288);}this['updateAutoSizePosition'](),this[_0x59eed8(0x3d9)](),this[_0x59eed8(0x428)]=![],this[_0x59eed8(0x4a0)]=!![];},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x3a3)]=function(){const _0x33e073=_0x1e5274;this[_0x33e073(0x27f)](),this['updatePlacement'](),this[_0x33e073(0x450)](),this[_0x33e073(0x2c6)](),this[_0x33e073(0x228)][_0x33e073(0x4be)](),this[_0x33e073(0x401)]();},Window_Message['prototype'][_0x1e5274(0x51d)]=function(_0x36f6c4,_0x381baf){const _0x5b2768=_0x1e5274;switch(_0x36f6c4['toLowerCase']()[_0x5b2768(0x2cd)]()){case _0x5b2768(0x419):this[_0x5b2768(0x226)]=$gameActors[_0x5b2768(0x48c)](_0x381baf);break;case _0x5b2768(0x267):this[_0x5b2768(0x226)]=$gameParty[_0x5b2768(0x4c5)]()[_0x381baf-0x1];break;case _0x5b2768(0x3fa):this[_0x5b2768(0x226)]=$gameTroop[_0x5b2768(0x4c5)]()[_0x381baf-0x1];break;case _0x5b2768(0x200):this['_autoPositionTarget']=$gamePlayer;break;case _0x5b2768(0x35b):const _0x36240c=$gameActors['actor'](_0x381baf)['index']();_0x36240c===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x5b2768(0x226)]=$gamePlayer[_0x5b2768(0x368)]()[_0x5b2768(0x2b4)](_0x36240c-0x1);break;case _0x5b2768(0x560):_0x381baf===0x1?this[_0x5b2768(0x226)]=$gamePlayer:_0x5b2768(0x429)===_0x5b2768(0x429)?this[_0x5b2768(0x226)]=$gamePlayer[_0x5b2768(0x368)]()[_0x5b2768(0x2b4)](_0x381baf-0x2):_0x376e77[_0x5b2768(0x1fd)][_0x5b2768(0x2ea)][_0x5b2768(0x3cb)](this,_0x59c710,_0xf230e0);break;case'map\x20event':this[_0x5b2768(0x226)]=$gameMap[_0x5b2768(0x283)](_0x381baf);break;}this['_autoPositionTarget']&&this[_0x5b2768(0x46f)]();},VisuMZ[_0x1e5274(0x1fd)]['Window_Message_synchronizeNameBox']=Window_Message[_0x1e5274(0x360)][_0x1e5274(0x202)],Window_Message[_0x1e5274(0x360)][_0x1e5274(0x202)]=function(){const _0x5d2750=_0x1e5274;this[_0x5d2750(0x46f)](),VisuMZ[_0x5d2750(0x1fd)][_0x5d2750(0x423)][_0x5d2750(0x3cb)](this);},Window_Message['prototype'][_0x1e5274(0x46f)]=function(){const _0x423fad=_0x1e5274;if(!this[_0x423fad(0x226)])return;const _0xd8d61c=SceneManager[_0x423fad(0x253)];if(!_0xd8d61c)return;const _0xa26eec=_0xd8d61c[_0x423fad(0x3a0)];if(!_0xa26eec)return;const _0x568ccb=_0xa26eec['findTargetSprite'](this[_0x423fad(0x226)]);if(!_0x568ccb)return;let _0xf50e82=_0x568ccb['x'];if(SceneManager[_0x423fad(0x42f)]())_0x423fad(0x410)==='mdtwL'?this[_0x423fad(0x493)](_0x1b7ad8):_0xf50e82*=$gameScreen['zoomScale']();else{if(SceneManager['isSceneBattle']()&&Imported[_0x423fad(0x310)]){if('WUhcO'!==_0x423fad(0x2d8)){let _0x4fecb1=_0x568ccb['x']-Graphics[_0x423fad(0x2ca)]*_0xa26eec[_0x423fad(0x494)]['x'];_0xf50e82+=_0x4fecb1*(_0xa26eec['scale']['x']-0x1);}else _0x3a7dac['y']=this['y']>0x0?0x0:_0x661784[_0x423fad(0x2fc)]-_0x5a63f2[_0x423fad(0x277)];}}_0xf50e82-=this[_0x423fad(0x3c8)]/0x2,_0xf50e82-=(Graphics[_0x423fad(0x3c8)]-Graphics['boxWidth'])/0x2,_0xf50e82+=this['autoPositionOffsetX']();let _0x435903=_0x568ccb['y'];if(SceneManager[_0x423fad(0x42f)]())_0x435903-=_0x568ccb[_0x423fad(0x277)]+0x8,_0x435903*=$gameScreen[_0x423fad(0x3d7)](),_0x435903-=this['height']*$gameScreen['zoomScale']();else{if(SceneManager[_0x423fad(0x53a)]()&&Imported['VisuMZ_3_ActSeqCamera']){if('nWEhQ'!==_0x423fad(0x535)){if(_0x9bc86['isBusy']())return![];return this[_0x423fad(0x27c)](_0xc439bb),this[_0x423fad(0x2ad)](_0x23189d),this['prepareShowTextFollowups'](_0x36d3cc),this['setWaitMode']('message'),!![];}else{let _0x6dfa7f=_0x568ccb['height']*_0xa26eec[_0x423fad(0x4f6)]['y'];_0x435903-=this[_0x423fad(0x277)]*_0xa26eec['scale']['y']+_0x6dfa7f+0x8;let _0x1103d3=_0x568ccb['y']-Graphics['boxHeight']*_0xa26eec['anchor']['y'];_0x435903+=_0x1103d3*(_0xa26eec['scale']['y']-0x1);}}else _0x435903-=_0x568ccb['height']+0x8,_0x435903-=this[_0x423fad(0x277)];}_0x435903-=(Graphics[_0x423fad(0x277)]-Graphics[_0x423fad(0x2fc)])/0x2,_0x435903+=this[_0x423fad(0x4c4)]();const _0x21b8c6=$gameSystem[_0x423fad(0x41e)]();_0xf50e82+=_0x21b8c6['x'],_0x435903+=_0x21b8c6['y'],this['x']=Math[_0x423fad(0x482)](_0xf50e82),this['y']=Math['round'](_0x435903),this[_0x423fad(0x52d)](!![],![]),this[_0x423fad(0x3cf)]=this['_forcedPosition']||{},this[_0x423fad(0x3cf)]['x']=this['x'],this['_forcedPosition']['y']=this['y'],this[_0x423fad(0x3cf)]['width']=this['width'],this[_0x423fad(0x3cf)]['height']=this['height'],this[_0x423fad(0x236)][_0x423fad(0x2e0)]();},Window_Message['prototype']['autoPositionOffsetX']=function(){return 0x0;},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x4c4)]=function(){return 0x0;},Window_Message['prototype'][_0x1e5274(0x319)]=function(){const _0x1c9482=_0x1e5274;this['_messagePositionReset']=![],this[_0x1c9482(0x226)]=undefined,$gameSystem[_0x1c9482(0x24e)](),this['updateAutoSizePosition'](),this[_0x1c9482(0x55c)]=0x0;},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x542)]=function(_0x4daae9){const _0x1bc57b=_0x1e5274;return Window_Base['prototype'][_0x1bc57b(0x542)][_0x1bc57b(0x3cb)](this,_0x4daae9);},Window_Message[_0x1e5274(0x360)]['postConvertEscapeCharacters']=function(_0x454971){const _0x4762d4=_0x1e5274;return Window_Base['prototype'][_0x4762d4(0x2e9)][_0x4762d4(0x3cb)](this,_0x454971);},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x45b)]=function(_0x2f62e4){const _0x51c7b3=_0x1e5274;this[_0x51c7b3(0x2bc)](_0x2f62e4),Window_Base[_0x51c7b3(0x360)]['flushTextState'][_0x51c7b3(0x3cb)](this,_0x2f62e4),this[_0x51c7b3(0x2de)](_0x2f62e4);},Window_Message['prototype'][_0x1e5274(0x2bc)]=function(_0x1644ab){},Window_Message[_0x1e5274(0x360)][_0x1e5274(0x2de)]=function(_0x306a55){},Window_NameBox['prototype'][_0x1e5274(0x308)]=function(){return![];},Window_NameBox['prototype'][_0x1e5274(0x4b0)]=function(){const _0x5e05ab=_0x1e5274;Window_Base[_0x5e05ab(0x360)][_0x5e05ab(0x4b0)][_0x5e05ab(0x3cb)](this),this['changeTextColor'](this['defaultColor']());},Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x3ab)]=function(){const _0x4213e2=_0x1e5274,_0x58ce98=VisuMZ['MessageCore'][_0x4213e2(0x49c)]['General']['NameBoxWindowDefaultColor'];return ColorManager[_0x4213e2(0x3ac)](_0x58ce98);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3e9)]=Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x2e0)],Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x2e0)]=function(){const _0x3101a3=_0x1e5274;VisuMZ['MessageCore']['Window_NameBox_updatePlacement'][_0x3101a3(0x3cb)](this),this[_0x3101a3(0x4ea)](),this[_0x3101a3(0x2a7)](),this['clampPlacementPosition'](),this[_0x3101a3(0x415)]();},Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x542)]=function(_0x208f47){const _0x26d706=_0x1e5274;return _0x208f47=_0x208f47['replace'](/<LEFT>/gi,this['setRelativePosition'][_0x26d706(0x55f)](this,0x0)),_0x208f47=_0x208f47['replace'](/<CENTER>/gi,this[_0x26d706(0x46a)]['bind'](this,0x5)),_0x208f47=_0x208f47['replace'](/<RIGHT>/gi,this['setRelativePosition']['bind'](this,0xa)),_0x208f47=_0x208f47[_0x26d706(0x4dd)](/<POSITION:[ ](\d+)>/gi,(_0x5d0385,_0x5e8a3b)=>this[_0x26d706(0x46a)](parseInt(_0x5e8a3b))),_0x208f47=_0x208f47[_0x26d706(0x4dd)](/<\/LEFT>/gi,''),_0x208f47=_0x208f47[_0x26d706(0x4dd)](/<\/CENTER>/gi,''),_0x208f47=_0x208f47['replace'](/<\/RIGHT>/gi,''),Window_Base[_0x26d706(0x360)][_0x26d706(0x542)]['call'](this,_0x208f47);},Window_NameBox[_0x1e5274(0x360)]['setRelativePosition']=function(_0xb53ab1){const _0x19eda6=_0x1e5274;return this[_0x19eda6(0x552)]=_0xb53ab1,'';},Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x4ea)]=function(){const _0x1e9a20=_0x1e5274;if($gameMessage['isRTL']())return;this[_0x1e9a20(0x552)]=this[_0x1e9a20(0x552)]||0x0;const _0x39618c=this[_0x1e9a20(0x37d)],_0x500651=Math[_0x1e9a20(0x352)](_0x39618c[_0x1e9a20(0x3c8)]*this['_relativePosition']/0xa);this['x']=_0x39618c['x']+_0x500651-Math[_0x1e9a20(0x352)](this[_0x1e9a20(0x3c8)]/0x2),this['x']=this['x']['clamp'](_0x39618c['x'],_0x39618c['x']+_0x39618c[_0x1e9a20(0x3c8)]-this[_0x1e9a20(0x3c8)]);},Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x2a7)]=function(){const _0x2d9d81=_0x1e5274;if($gameMessage[_0x2d9d81(0x211)]())return;this['_relativePosition']=this[_0x2d9d81(0x552)]||0x0;const _0x4585c8=VisuMZ[_0x2d9d81(0x1fd)][_0x2d9d81(0x49c)][_0x2d9d81(0x3da)][_0x2d9d81(0x4c6)],_0x16240e=VisuMZ[_0x2d9d81(0x1fd)][_0x2d9d81(0x49c)]['General'][_0x2d9d81(0x456)],_0x1cdb74=(0x5-this[_0x2d9d81(0x552)])/0x5;this['x']+=Math[_0x2d9d81(0x352)](_0x4585c8*_0x1cdb74),this['y']+=_0x16240e;},Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x415)]=function(){const _0x19c5cb=_0x1e5274,_0x85fe3c=this[_0x19c5cb(0x37d)],_0x4ddafe=_0x85fe3c['y'],_0x407593=VisuMZ[_0x19c5cb(0x1fd)]['Settings'][_0x19c5cb(0x3da)][_0x19c5cb(0x456)];_0x4ddafe>this['y']&&_0x4ddafe<this['y']+this[_0x19c5cb(0x277)]-_0x407593&&(this['y']=_0x85fe3c['y']+_0x85fe3c['height']);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x36d)]=Window_NameBox['prototype'][_0x1e5274(0x3a4)],Window_NameBox[_0x1e5274(0x360)][_0x1e5274(0x3a4)]=function(){const _0x1f7c8f=_0x1e5274;this[_0x1f7c8f(0x552)]=0x0,VisuMZ[_0x1f7c8f(0x1fd)]['Window_NameBox_refresh'][_0x1f7c8f(0x3cb)](this);},Window_ChoiceList['prototype']['isWordWrapEnabled']=function(){return![];},Window_ChoiceList['prototype']['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x568)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x278)]=function(){const _0x2da38a=_0x1e5274;return $gameSystem[_0x2da38a(0x31e)]();},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x311)]=function(){const _0x36c8e4=_0x1e5274;this[_0x36c8e4(0x3a4)](),this[_0x36c8e4(0x3a1)](),this[_0x36c8e4(0x45d)](),this[_0x36c8e4(0x336)]();},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x2da)]=function(){const _0x4aa737=_0x1e5274;$gameMessage['onChoice'](this['currentExt']()),this[_0x4aa737(0x37d)][_0x4aa737(0x380)](),this['close'](),this[_0x4aa737(0x4d9)]&&(_0x4aa737(0x3a2)===_0x4aa737(0x2dd)?_0x1ba348[_0x4aa737(0x32f)]=0x3:(this['_helpWindow'][_0x4aa737(0x4be)](),this[_0x4aa737(0x4d9)][_0x4aa737(0x2dc)]()));},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x26d)]=Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x466)],Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x466)]=function(){const _0x19ee65=_0x1e5274;VisuMZ[_0x19ee65(0x1fd)][_0x19ee65(0x26d)][_0x19ee65(0x3cb)](this),this[_0x19ee65(0x4d9)]&&(this['_helpWindow'][_0x19ee65(0x4be)](),this['_helpWindow'][_0x19ee65(0x2dc)]());},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x3a4)]=function(){const _0x3ac149=_0x1e5274;this['clearCommandList'](),this[_0x3ac149(0x208)](),this['_messageWindow']&&(this[_0x3ac149(0x2e0)](),this[_0x3ac149(0x4d7)]()),this[_0x3ac149(0x401)](),this['updateBackground'](),this[_0x3ac149(0x3f8)](),Window_Selectable[_0x3ac149(0x360)]['refresh'][_0x3ac149(0x3cb)](this);},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x208)]=function(){const _0x534cba=_0x1e5274,_0x576ee1=$gameMessage['choices'](),_0x246138=$gameMessage[_0x534cba(0x21c)](),_0x5575b0=$gameMessage[_0x534cba(0x374)](),_0x434b4c=_0x576ee1[_0x534cba(0x475)];let _0xa558b5=0x0;for(let _0x4226ee=0x0;_0x4226ee<_0x434b4c;_0x4226ee++){if(this[_0x534cba(0x302)][_0x534cba(0x475)]>=_0x5575b0)break;const _0x1d8302=_0x246138[_0x4226ee];let _0x2d3110=_0x576ee1[_0x1d8302];if(_0x2d3110===undefined)continue;_0x2d3110=this[_0x534cba(0x1f1)](_0x2d3110);if(this[_0x534cba(0x204)](_0x2d3110)){if('NErnc'===_0x534cba(0x234)){const _0x442b3e=this['parseChoiceText'](_0x2d3110),_0xcf06de=this[_0x534cba(0x3b6)](_0x2d3110);this['addCommand'](_0x442b3e,_0x534cba(0x51b),_0xcf06de,_0x1d8302);}else{const _0x2b6406=_0x11a806[_0x534cba(0x2c2)](_0x232ad8[_0x534cba(0x2a0)](_0x4cae6d[0x3]));_0x1db388['ConvertParams'](_0x2b6406,_0x2b6406),_0x1f291e[_0x534cba(0x4b3)](_0x2b6406[_0x534cba(0x38b)]||0x0,_0x2b6406[_0x534cba(0x4ef)]||0x0,_0x2b6406[_0x534cba(0x222)]||0x0);}}_0xa558b5++;}this[_0x534cba(0x536)](),this[_0x534cba(0x37b)]();},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x1f1)]=function(_0x42dc1c){const _0x1f001e=_0x1e5274;return Window_Base[_0x1f001e(0x360)][_0x1f001e(0x210)][_0x1f001e(0x3cb)](this,_0x42dc1c);},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x204)]=function(_0x2a3561){const _0x222717=_0x1e5274;if(Imported[_0x222717(0x524)])$gameMessage[_0x222717(0x4ca)]();if(_0x2a3561[_0x222717(0x23f)](/<HIDE>/i))return![];if(_0x2a3561[_0x222717(0x23f)](/<SHOW>/i))return!![];if(_0x2a3561['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x222717(0x4b2)!==_0x222717(0x4b2)){_0x43601e[_0x222717(0x1fd)][_0x222717(0x384)]['call'](this,_0x5f22d8);if(_0x5eaa7c[_0x222717(0x326)])this[_0x222717(0x2ff)](_0x222717(0x333));}else{const _0x446273=RegExp['$1'][_0x222717(0x438)](',')['map'](_0x472826=>Number(_0x472826)||0x0);for(const _0x11dd68 of _0x446273){if(_0x222717(0x201)!==_0x222717(0x201)){let _0x4270cb=_0x468043['MessageCore'][_0x222717(0x248)][_0x222717(0x3cb)](this);const _0x106f66=_0x379e14[_0x222717(0x1fd)][_0x222717(0x49c)];if(_0x106f66[_0x222717(0x23c)]['AddOption']&&_0x106f66['TextSpeed']['AdjustRect'])_0x4270cb++;return _0x4270cb;}else{if(!$gameSwitches[_0x222717(0x217)](_0x11dd68))return![];}}return!![];}}if(_0x2a3561[_0x222717(0x23f)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x222717(0x517)==='HXgEZ')this['_interpreter']=null;else{const _0x51b508=RegExp['$1']['split'](',')['map'](_0x585531=>Number(_0x585531)||0x0);for(const _0x41413e of _0x51b508){if(!$gameSwitches[_0x222717(0x217)](_0x41413e))return![];}return!![];}}if(_0x2a3561[_0x222717(0x23f)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x222717(0x30d)!=='SDMqN'){const _0x39a48a=RegExp['$1'][_0x222717(0x438)](',')[_0x222717(0x42d)](_0x4a3e11=>Number(_0x4a3e11)||0x0);for(const _0x1b860d of _0x39a48a){if($gameSwitches['value'](_0x1b860d))return!![];}return![];}else this[_0x222717(0x47e)]=_0x39b431;}if(_0x2a3561['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x222717(0x409)!==_0x222717(0x409)){if(!this['_choiceIndexArray'])this[_0x222717(0x392)]();return this[_0x222717(0x4d3)];}else{const _0x3fa2e3=RegExp['$1'][_0x222717(0x438)](',')[_0x222717(0x42d)](_0x317160=>Number(_0x317160)||0x0);for(const _0x1aa82b of _0x3fa2e3){if('kOJek'!=='kOJek')_0x59ffdd['prototype'][_0x222717(0x3f8)][_0x222717(0x3cb)](this),_0x871ce1[_0x222717(0x1fd)][_0x222717(0x49c)][_0x222717(0x3da)][_0x222717(0x355)]&&this[_0x222717(0x2f7)]();else{if(!$gameSwitches[_0x222717(0x217)](_0x1aa82b))return!![];}}return![];}}if(_0x2a3561[_0x222717(0x23f)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2c8e86=RegExp['$1']['split'](',')[_0x222717(0x42d)](_0x9474d2=>Number(_0x9474d2)||0x0);for(const _0x12d450 of _0x2c8e86){if(!$gameSwitches[_0x222717(0x217)](_0x12d450))return!![];}return![];}if(_0x2a3561[_0x222717(0x23f)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2dfabe=RegExp['$1']['split'](',')[_0x222717(0x42d)](_0x1a3805=>Number(_0x1a3805)||0x0);for(const _0x323a87 of _0x2dfabe){if(_0x222717(0x2a9)!=='kbrHg')return _0x3cc3d=_0x3b032a[_0x222717(0x4dd)](/\x1bN\[(\d+)\]/gi,(_0x3fe8b8,_0x57bd5d)=>this['actorName'](_0x4811cd(_0x57bd5d))),_0x2e2324=_0x52276d['replace'](/\x1bP\[(\d+)\]/gi,(_0x238c16,_0x5949fa)=>this[_0x222717(0x36e)](_0x206282(_0x5949fa))),_0x184585=_0x8b77d5[_0x222717(0x4dd)](/\x1bG/gi,_0x1b7b96[_0x222717(0x2f2)]),_0x27ab3c;else{if($gameSwitches[_0x222717(0x217)](_0x323a87))return![];}}return!![];}return!![];},Window_ChoiceList['prototype'][_0x1e5274(0x49b)]=function(_0x4a0ba6){const _0x45d966=_0x1e5274;let _0x409d3a=_0x4a0ba6;return _0x409d3a=_0x409d3a[_0x45d966(0x4dd)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x409d3a=_0x409d3a[_0x45d966(0x4dd)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x409d3a;},Window_ChoiceList['prototype'][_0x1e5274(0x3b6)]=function(_0x3e45b1){const _0x3bb1a6=_0x1e5274;if(Imported[_0x3bb1a6(0x524)])$gameMessage[_0x3bb1a6(0x4ca)]();if(_0x3e45b1['match'](/<DISABLE>/i))return![];if(_0x3e45b1[_0x3bb1a6(0x23f)](/<ENABLE>/i))return!![];if(_0x3e45b1[_0x3bb1a6(0x23f)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x230c41=RegExp['$1'][_0x3bb1a6(0x438)](',')[_0x3bb1a6(0x42d)](_0x3e2b26=>Number(_0x3e2b26)||0x0);for(const _0x25224f of _0x230c41){if(!$gameSwitches[_0x3bb1a6(0x217)](_0x25224f))return![];}return!![];}if(_0x3e45b1[_0x3bb1a6(0x23f)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x3bb1a6(0x218)!==_0x3bb1a6(0x218))this[_0x3bb1a6(0x32c)](_0x2c3dce),_0x76f0d5[_0x3bb1a6(0x360)]['processCharacter']['call'](this,_0x8270e1);else{const _0x2cd47a=RegExp['$1'][_0x3bb1a6(0x438)](',')['map'](_0x2fab6d=>Number(_0x2fab6d)||0x0);for(const _0x41d8ac of _0x2cd47a){if(!$gameSwitches['value'](_0x41d8ac))return![];}return!![];}}if(_0x3e45b1[_0x3bb1a6(0x23f)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x544590=RegExp['$1'][_0x3bb1a6(0x438)](',')[_0x3bb1a6(0x42d)](_0x2ef7f7=>Number(_0x2ef7f7)||0x0);for(const _0x31b428 of _0x544590){if($gameSwitches['value'](_0x31b428))return!![];}return![];}if(_0x3e45b1[_0x3bb1a6(0x23f)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x493f78=RegExp['$1'][_0x3bb1a6(0x438)](',')[_0x3bb1a6(0x42d)](_0x16f5c5=>Number(_0x16f5c5)||0x0);for(const _0x24b113 of _0x493f78){if('RpCuo'===_0x3bb1a6(0x408))_0x1d0b64=_0x20cf47[_0x3bb1a6(0x352)]((this['width']-_0x3bf38b[_0x3bb1a6(0x3c8)])/0x2);else{if(!$gameSwitches[_0x3bb1a6(0x217)](_0x24b113))return!![];}}return![];}if(_0x3e45b1[_0x3bb1a6(0x23f)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x29ac80=RegExp['$1'][_0x3bb1a6(0x438)](',')[_0x3bb1a6(0x42d)](_0x55cbe8=>Number(_0x55cbe8)||0x0);for(const _0x5d0534 of _0x29ac80){if(_0x3bb1a6(0x301)===_0x3bb1a6(0x301)){if(!$gameSwitches[_0x3bb1a6(0x217)](_0x5d0534))return!![];}else{const _0x56013b=_0x3d6b01['split'](',')['map'](_0x1599f4=>_0x2b60a4(_0x1599f4)||0x0);if(_0x56013b[0x0]!==_0x4dbe72)this['_forcedPosition'][_0x3bb1a6(0x3c8)]=_0x32888b(_0x56013b[0x2]);if(_0x56013b[0x1]!==_0x596f14)this['_forcedPosition'][_0x3bb1a6(0x277)]=_0x73eb89(_0x56013b[0x3]);return'';}}return![];}if(_0x3e45b1['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x57ea57=RegExp['$1']['split'](',')[_0x3bb1a6(0x42d)](_0x4704c3=>Number(_0x4704c3)||0x0);for(const _0x5dfa49 of _0x57ea57){if(_0x3bb1a6(0x315)!==_0x3bb1a6(0x40f)){if($gameSwitches['value'](_0x5dfa49))return![];}else return this['resetWordWrap'](),_0x56cf74[_0x3bb1a6(0x1fd)][_0x3bb1a6(0x26e)][_0x3bb1a6(0x3cb)](this,_0x4b806f);}return!![];}return!![];},Window_ChoiceList[_0x1e5274(0x360)]['clearChoiceHelpDescriptions']=function(){const _0x98c1d6=_0x1e5274;this[_0x98c1d6(0x395)]={},this[_0x98c1d6(0x4d9)]&&(this['_helpWindow'][_0x98c1d6(0x4be)](),this[_0x98c1d6(0x4d9)][_0x98c1d6(0x2dc)]());},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x37b)]=function(){const _0x1e9657=_0x1e5274,_0xbe78e5=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0xf3b22 of this[_0x1e9657(0x302)]){if(_0x1e9657(0x3f3)==='tXAkK'){if(!_0xf3b22)continue;const _0x16ed62=this['_list'][_0x1e9657(0x2e2)](_0xf3b22);if(_0xf3b22[_0x1e9657(0x4ec)][_0x1e9657(0x23f)](_0xbe78e5)){if(_0x1e9657(0x2f6)!==_0x1e9657(0x2f6)){if(this[_0x1e9657(0x4da)]===_0x2301b5)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x1e9657(0x2d2)]===_0x370d97)this[_0x1e9657(0x24e)]();this[_0x1e9657(0x4da)]['choiceCols']=_0x322857||0x1;}else{const _0x1dd13c=String(RegExp['$1']);this[_0x1e9657(0x395)][_0x16ed62]=_0x1dd13c[_0x1e9657(0x2cd)](),_0xf3b22[_0x1e9657(0x4ec)]=_0xf3b22['name'][_0x1e9657(0x4dd)](_0xbe78e5,'')[_0x1e9657(0x2cd)]();}}else{if(_0x1e9657(0x32a)==='ObPlT'){if(_0x1c4b04[_0x1e9657(0x3f6)]!==_0x2adbe5)return![];}else this[_0x1e9657(0x395)][_0x16ed62]='';}}else return _0x146809=_0x3db95a['replace'](/(\W)/gi,(_0x2570ca,_0x23b3ba)=>_0x1e9657(0x4f0)[_0x1e9657(0x24d)](_0x23b3ba)),_0x343834;}},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3f7)]=Window_ChoiceList[_0x1e5274(0x360)]['updatePlacement'],Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x2e0)]=function(){const _0x521750=_0x1e5274;VisuMZ[_0x521750(0x1fd)][_0x521750(0x3f7)][_0x521750(0x3cb)](this),this[_0x521750(0x52d)]();},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x4d7)]=function(){const _0x3998fc=_0x1e5274;if(!this[_0x3998fc(0x3af)])return;const _0x94bafe=0x8,_0x15a8ce=this[_0x3998fc(0x3af)],_0x1f3c31=this['x']+this[_0x3998fc(0x3c8)],_0x30cebc=Math[_0x3998fc(0x352)]((Graphics[_0x3998fc(0x3c8)]-Graphics['boxWidth'])/0x2);if(_0x1f3c31>=Graphics[_0x3998fc(0x2ca)]+_0x30cebc-_0x15a8ce['width']+_0x94bafe){if(_0x3998fc(0x38c)===_0x3998fc(0x4df)){_0x4413c7[_0x3998fc(0x1fd)]['Window_Message_terminateMessage'][_0x3998fc(0x3cb)](this),this[_0x3998fc(0x246)]();if(this[_0x3998fc(0x4a0)])this[_0x3998fc(0x319)]();}else _0x15a8ce['x']=-_0x15a8ce['width']-_0x94bafe;}else _0x15a8ce['x']=this[_0x3998fc(0x3c8)]+_0x94bafe;_0x15a8ce['y']=this[_0x3998fc(0x277)]/0x2-_0x15a8ce['height']/0x2;},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x35f)]=Window_ChoiceList[_0x1e5274(0x360)]['windowX'],Window_ChoiceList[_0x1e5274(0x360)]['windowX']=function(){const _0x2376e7=_0x1e5274;if(this[_0x2376e7(0x37d)])return this[_0x2376e7(0x3ef)]();else{if('pmuJQ'==='pmuJQ')return VisuMZ[_0x2376e7(0x1fd)][_0x2376e7(0x35f)][_0x2376e7(0x3cb)](this);else{const _0xe702d9=[_0x2376e7(0x41a),_0x2376e7(0x31a),_0x2376e7(0x22e),_0x2376e7(0x36a),'victory','defeat','escapeStart',_0x2376e7(0x51c),_0x2376e7(0x404),_0x2376e7(0x523)];let _0x2bacfe=_0x360b13['MessageCore']['TextManager_message'][_0x2376e7(0x3cb)](this,_0x4fc76c);return _0xe702d9[_0x2376e7(0x1ec)](_0x205a29)&&(_0x2bacfe='</WORDWRAP>'+_0x2bacfe),_0x2bacfe;}}},Window_ChoiceList[_0x1e5274(0x360)]['messageCoreWindowX']=function(){const _0xfe8582=_0x1e5274,_0x404b92=$gameMessage['choicePositionType']();if(_0x404b92===0x1)return(Graphics['boxWidth']-this[_0xfe8582(0x3fb)]())/0x2;else return _0x404b92===0x2?this[_0xfe8582(0x37d)]['x']+this[_0xfe8582(0x37d)][_0xfe8582(0x3c8)]-this[_0xfe8582(0x3fb)]():this[_0xfe8582(0x37d)]['x'];},Window_ChoiceList[_0x1e5274(0x360)]['windowWidth']=function(){const _0x5a2509=_0x1e5274,_0x3070c4=(this[_0x5a2509(0x3d3)]()+this[_0x5a2509(0x514)]())*this[_0x5a2509(0x278)]()+this[_0x5a2509(0x1fa)]*0x2;return Math[_0x5a2509(0x502)](_0x3070c4,Graphics[_0x5a2509(0x3c8)]);},Window_ChoiceList['prototype']['numVisibleRows']=function(){const _0x29108b=_0x1e5274,_0x424929=$gameMessage['choices']()[_0x29108b(0x42d)](_0x4cedfc=>this[_0x29108b(0x1f1)](_0x4cedfc))['filter'](_0x417982=>this[_0x29108b(0x204)](_0x417982)),_0x281c76=$gameMessage[_0x29108b(0x374)](),_0x1c91fd=Math['ceil'](Math[_0x29108b(0x502)](_0x281c76,_0x424929[_0x29108b(0x475)])/this[_0x29108b(0x278)]());return Math['max'](0x1,Math[_0x29108b(0x502)](_0x1c91fd,this[_0x29108b(0x4f8)]()));},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x4f8)]=function(){const _0x1cca7f=_0x1e5274,_0x5293cd=this[_0x1cca7f(0x37d)],_0x21cc86=_0x5293cd?_0x5293cd['y']:0x0,_0x5e24b8=_0x5293cd?_0x5293cd['height']:0x0,_0x1cda28=Graphics['boxHeight']/0x2;if(_0x21cc86<_0x1cda28&&_0x21cc86+_0x5e24b8>_0x1cda28){if(_0x1cca7f(0x362)===_0x1cca7f(0x362))return 0x4;else _0x29e4fe[_0x1cca7f(0x1fd)][_0x1cca7f(0x3f7)]['call'](this),this[_0x1cca7f(0x52d)]();}else return $gameSystem['getChoiceListMaxRows']();},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x3d3)]=function(){const _0x3f0c83=_0x1e5274;let _0x47c434=this[_0x3f0c83(0x38d)]();for(const _0xedb6e3 of this[_0x3f0c83(0x302)]){const _0x3df897=_0xedb6e3[_0x3f0c83(0x4ec)],_0x102168=this['getChoiceIndent'](_0x3df897),_0x27ac5b=this[_0x3f0c83(0x42b)](_0x3df897)['width']+_0x102168,_0x446b6c=Math[_0x3f0c83(0x2a1)](_0x27ac5b)+this[_0x3f0c83(0x4e6)]()*0x2;_0x47c434=Math[_0x3f0c83(0x209)](_0x47c434,_0x446b6c);}return _0x47c434;},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x38d)]=function(){const _0xbefc86=_0x1e5274;let _0x5772b1=0x60;const _0x479d02=$gameMessage['choices']();for(const _0x30c00d of _0x479d02){if(_0xbefc86(0x31b)==='EcMui'){_0x2f04fb['ConvertParams'](_0x1781d5,_0x5b25e9);const _0x2741e2=_0x4e5480[_0xbefc86(0x4af)]||_0x58992b['getMessageWindowRows']()||0x1,_0x30a9b3=_0x5aea30['Width']||_0x2e3f04[_0xbefc86(0x391)]()||0x1;_0x40e635[_0xbefc86(0x377)]=!![];const _0x11478b=_0x265b72[_0xbefc86(0x512)][_0xbefc86(0x268)]();_0x4dda6d[_0xbefc86(0x485)](_0x2741e2),_0x53e145[_0xbefc86(0x331)](_0x30a9b3);[_0xbefc86(0x434),'false'][_0xbefc86(0x1ec)](_0x11478b)&&_0x6b3008[_0xbefc86(0x45f)](_0x576d75(_0x11478b));const _0x1ddfbb=_0x57236d[_0xbefc86(0x253)][_0xbefc86(0x37d)];_0x1ddfbb&&(_0x1ddfbb[_0xbefc86(0x40a)](),_0x1ddfbb[_0xbefc86(0x27f)](),_0x1ddfbb[_0xbefc86(0x401)]());}else _0x30c00d[_0xbefc86(0x23f)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x5772b1=Math[_0xbefc86(0x209)](_0x5772b1,Number(RegExp['$1'])));}return _0x5772b1;},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x550)]=function(_0x2afab1){const _0x51ac35=_0x1e5274,_0x34c4b2=this[_0x51ac35(0x551)](_0x2afab1),_0x473ca6=$gameSystem[_0x51ac35(0x347)]()!==_0x51ac35(0x333)?_0x51ac35(0x255)[_0x51ac35(0x24d)]($gameSystem[_0x51ac35(0x347)]()):'',_0x195428=_0x473ca6+this[_0x51ac35(0x443)](_0x2afab1);this[_0x51ac35(0x47d)](this[_0x51ac35(0x205)](_0x2afab1));const _0x16355f=this['textSizeEx'](_0x195428)[_0x51ac35(0x277)],_0x564803=_0x34c4b2['x']+this[_0x51ac35(0x50f)](_0x195428),_0x3fa4a3=Math[_0x51ac35(0x209)](_0x34c4b2['y'],_0x34c4b2['y']+Math[_0x51ac35(0x482)]((_0x34c4b2[_0x51ac35(0x277)]-_0x16355f)/0x2));this['drawTextEx'](_0x195428,_0x564803,_0x3fa4a3,_0x34c4b2[_0x51ac35(0x3c8)]),this['changeChoiceBackgroundColor'](_0x2afab1);},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x50f)]=function(_0x1cc008){const _0x4f2786=_0x1e5274;let _0x5ad4ec=0x0;return _0x1cc008[_0x4f2786(0x23f)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x5ad4ec=Number(RegExp['$1'])),_0x5ad4ec;},Window_ChoiceList['prototype'][_0x1e5274(0x49e)]=function(_0xb1dd18){const _0x13e882=_0x1e5274;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x4b0cce=this[_0x13e882(0x443)](_0xb1dd18);let _0x304318=![],_0x33ff16=![],_0x4722f8=ColorManager[_0x13e882(0x23d)](),_0xc96438=ColorManager[_0x13e882(0x4a1)]();if(_0x4b0cce[_0x13e882(0x23f)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x4722f8=ColorManager[_0x13e882(0x509)](RegExp['$1'])['trim'](),_0xc96438=ColorManager[_0x13e882(0x509)](RegExp['$2'])[_0x13e882(0x2cd)](),_0x304318=!![];else{if(_0x4b0cce['match'](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0xb02e8=String(RegExp['$1'])[_0x13e882(0x268)]()[_0x13e882(0x2cd)]();switch(_0xb02e8){case _0x13e882(0x2c1):_0x4722f8=_0xc96438=_0x13e882(0x272),_0x33ff16=!![];break;case _0x13e882(0x3ed):_0x4722f8=_0xc96438='#fbaf5d',_0x33ff16=!![];break;case _0x13e882(0x479):_0x4722f8=_0xc96438=_0x13e882(0x4cc),_0x33ff16=!![];break;case'green':_0x4722f8=_0xc96438=_0x13e882(0x33f),_0x33ff16=!![];break;case _0x13e882(0x54c):_0x4722f8=_0xc96438=_0x13e882(0x280),_0x33ff16=!![];break;case _0x13e882(0x22a):case _0x13e882(0x220):_0x4722f8=_0xc96438='#a186be',_0x33ff16=!![];break;case _0x13e882(0x289):_0x4722f8=_0xc96438='#c69c6d',_0x33ff16=!![];break;case'pink':_0x4722f8=_0xc96438=_0x13e882(0x4db),_0x33ff16=!![];break;case _0x13e882(0x273):_0x4722f8=_0xc96438='#ffffff',_0x33ff16=!![];break;case _0x13e882(0x1f9):case _0x13e882(0x381):_0x4722f8=_0xc96438=_0x13e882(0x1ff),_0x33ff16=!![];break;case _0x13e882(0x3b4):_0x4722f8=_0xc96438=_0x13e882(0x3f5),_0x33ff16=!![];break;case'yes':_0x4722f8=_0xc96438=ColorManager[_0x13e882(0x325)](),_0x33ff16=!![];break;case'no':_0x4722f8=_0xc96438=ColorManager['powerDownColor'](),_0x33ff16=!![];break;case _0x13e882(0x4fe):_0x4722f8=_0xc96438=ColorManager['systemColor'](),_0x33ff16=!![];break;case'crisis':_0x4722f8=_0xc96438=ColorManager[_0x13e882(0x4dc)](),_0x33ff16=!![];break;default:_0x4722f8=_0xc96438=ColorManager[_0x13e882(0x509)](_0xb02e8),_0x33ff16=!![];break;}_0x304318=!![];}}if(!_0x304318)return;const _0x2a27ae=this[_0x13e882(0x4fb)](_0xb1dd18);this['contentsBack'][_0x13e882(0x271)](_0x2a27ae['x'],_0x2a27ae['y'],_0x2a27ae[_0x13e882(0x3c8)],_0x2a27ae[_0x13e882(0x277)]),this[_0x13e882(0x513)](_0x2a27ae,_0x4722f8,_0xc96438,_0x33ff16);},Window_ChoiceList['prototype'][_0x1e5274(0x513)]=function(_0x2bb2f3,_0x340b31,_0x29d098,_0xd1e090){const _0x5a0952=_0x1e5274,_0x1414fd=ColorManager[_0x5a0952(0x23d)](),_0x18cfec=ColorManager['dimColor2'](),_0x1bec3f=_0x340b31??ColorManager[_0x5a0952(0x23d)](),_0x64962f=_0x29d098??_0x340b31,_0x537cc5=_0x2bb2f3['x'],_0x2178b9=_0x2bb2f3['y'],_0x298ac9=_0x2bb2f3[_0x5a0952(0x3c8)],_0x2bab09=_0x2bb2f3[_0x5a0952(0x277)];this[_0x5a0952(0x22f)][_0x5a0952(0x361)](_0x537cc5,_0x2178b9,_0x298ac9,_0x2bab09,_0x1bec3f,_0x64962f,!![]);if(_0xd1e090){if(_0x5a0952(0x510)===_0x5a0952(0x4fd)){const _0x45601b=this[_0x5a0952(0x3a7)](_0x39333f)[_0x5a0952(0x438)](',');if(!_0x4a21c5['drawing'])return;const _0x3d4b48=_0x45601b[0x0]['trim'](),_0x14e150=_0x57bcc6['loadPicture'](_0x3d4b48),_0x423e5e=_0x1d773e[_0x5a0952(0x4b7)](_0xe8ee81),_0x2d68b6=this[_0x5a0952(0x228)][_0x5a0952(0x2a5)];_0x14e150[_0x5a0952(0x396)](this[_0x5a0952(0x270)][_0x5a0952(0x55f)](this,_0x14e150,_0x423e5e,_0x2d68b6));}else this[_0x5a0952(0x22f)][_0x5a0952(0x361)](_0x537cc5,_0x2178b9,_0x298ac9,_0x2bab09,_0x1414fd,_0x64962f,!![]);}this[_0x5a0952(0x22f)][_0x5a0952(0x4b1)](_0x537cc5,_0x2178b9,_0x298ac9,_0x2bab09,_0x1414fd);},Window_ChoiceList[_0x1e5274(0x360)][_0x1e5274(0x3be)]=function(){const _0x4c7638=_0x1e5274;this[_0x4c7638(0x4d9)][_0x4c7638(0x4be)]();if(!this[_0x4c7638(0x395)])return;const _0x200dfe=this['index']();this[_0x4c7638(0x395)][_0x200dfe]?(this[_0x4c7638(0x4d9)][_0x4c7638(0x290)](this[_0x4c7638(0x395)][_0x200dfe]),this[_0x4c7638(0x4d9)][_0x4c7638(0x37c)]()):(this['_helpWindow']['clear'](),this[_0x4c7638(0x4d9)][_0x4c7638(0x2dc)]());},Window_EventItem[_0x1e5274(0x360)][_0x1e5274(0x3cd)]=function(){const _0x1d7474=_0x1e5274,_0x36e065=$gameMessage[_0x1d7474(0x2f9)]();_0x36e065===_0x1d7474(0x3b1)&&Imported[_0x1d7474(0x3c5)]?this[_0x1d7474(0x34b)]():Window_ItemList['prototype'][_0x1d7474(0x3cd)]['call'](this);},Window_EventItem[_0x1e5274(0x360)][_0x1e5274(0x34b)]=function(){const _0x2cdce6=_0x1e5274,_0x449e10=$gameMessage['itemChoiceActor']();this[_0x2cdce6(0x38f)]=_0x449e10?_0x449e10['skills']()[_0x2cdce6(0x2c3)](_0x4c6c93=>this[_0x2cdce6(0x1ec)](_0x4c6c93)):[],this['includes'](null)&&this['_data'][_0x2cdce6(0x515)](null);},VisuMZ[_0x1e5274(0x1fd)][_0x1e5274(0x3d0)]=Window_EventItem['prototype']['includes'],Window_EventItem[_0x1e5274(0x360)][_0x1e5274(0x1ec)]=function(_0x1de9b7){const _0x3ca2e0=_0x1e5274,_0x31ca31=$gameMessage[_0x3ca2e0(0x2f9)]();if(_0x31ca31===_0x3ca2e0(0x56a)){if(!DataManager[_0x3ca2e0(0x51e)](_0x1de9b7))return![];const _0x27c813=$gameMessage['itemChoiceWtypeId']();if(_0x27c813>0x0){if(_0x1de9b7[_0x3ca2e0(0x390)]!==_0x27c813)return![];}return!![];}else{if(_0x31ca31===_0x3ca2e0(0x539)){if(!DataManager[_0x3ca2e0(0x227)](_0x1de9b7))return![];const _0x57b217=$gameMessage['itemChoiceAtypeId']();if(_0x57b217>0x0){if(_0x1de9b7[_0x3ca2e0(0x3f6)]!==_0x57b217)return![];}const _0x4047bc=$gameMessage['itemChoiceEtypeId']();if(_0x4047bc>0x0){if(_0x1de9b7[_0x3ca2e0(0x486)]!==_0x4047bc)return![];}return!![];}else{if(_0x31ca31===_0x3ca2e0(0x3b1)){if(!DataManager[_0x3ca2e0(0x2ec)](_0x1de9b7))return![];const _0x20c3e6=$gameMessage[_0x3ca2e0(0x260)]();if(_0x20c3e6[_0x3ca2e0(0x4a7)](_0x1de9b7))return![];if(!_0x20c3e6[_0x3ca2e0(0x28a)](_0x1de9b7))return![];const _0x47fcf5=$gameMessage['itemChoiceStypeId']();if(_0x47fcf5>0x0){const _0xd0331e=DataManager[_0x3ca2e0(0x312)](_0x1de9b7);if(!_0xd0331e[_0x3ca2e0(0x1ec)](_0x47fcf5))return![];}return!![];}else{if('RKzHz'==='spEoV')this[_0x3ca2e0(0x286)]={'type':0x0,'id':0x0,'quantity':0x0};else return VisuMZ['MessageCore']['Window_EventItem_includes'][_0x3ca2e0(0x3cb)](this,_0x1de9b7);}}}},VisuMZ[_0x1e5274(0x1fd)]['Window_ItemList_drawItemNumber']=Window_ItemList[_0x1e5274(0x360)][_0x1e5274(0x305)],Window_ItemList[_0x1e5274(0x360)][_0x1e5274(0x305)]=function(_0x612865,_0x2ae6e6,_0x54159c,_0x13e3e7){const _0xa905dc=_0x1e5274,_0x2501fa=$gameMessage[_0xa905dc(0x2f9)]();if(_0x2501fa==='skill'){const _0xd69995=$gameMessage[_0xa905dc(0x260)]();this[_0xa905dc(0x3dd)](_0xd69995,_0x612865,_0x2ae6e6,_0x54159c,_0x13e3e7);}else VisuMZ['MessageCore'][_0xa905dc(0x21a)][_0xa905dc(0x3cb)](this,_0x612865,_0x2ae6e6,_0x54159c,_0x13e3e7);};