//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.42;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.42] [MessageCore]
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
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
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

function _0x412f(_0x36c3b7,_0x21ecb1){const _0x3d6eba=_0x3d6e();return _0x412f=function(_0x412fbb,_0x50a233){_0x412fbb=_0x412fbb-0x1d0;let _0x105741=_0x3d6eba[_0x412fbb];return _0x105741;},_0x412f(_0x36c3b7,_0x21ecb1);}const _0x488928=_0x412f;(function(_0x31b4c7,_0x1159e4){const _0x2f2dc1=_0x412f,_0x123f0f=_0x31b4c7();while(!![]){try{const _0xf9ab11=-parseInt(_0x2f2dc1(0x410))/0x1+-parseInt(_0x2f2dc1(0x245))/0x2+parseInt(_0x2f2dc1(0x49b))/0x3*(-parseInt(_0x2f2dc1(0x2cd))/0x4)+-parseInt(_0x2f2dc1(0x2ca))/0x5*(-parseInt(_0x2f2dc1(0x354))/0x6)+parseInt(_0x2f2dc1(0x44b))/0x7+-parseInt(_0x2f2dc1(0x2bd))/0x8*(-parseInt(_0x2f2dc1(0x39b))/0x9)+-parseInt(_0x2f2dc1(0x497))/0xa;if(_0xf9ab11===_0x1159e4)break;else _0x123f0f['push'](_0x123f0f['shift']());}catch(_0x355038){_0x123f0f['push'](_0x123f0f['shift']());}}}(_0x3d6e,0xa8fa8));var label=_0x488928(0x44d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x488928(0x454)](function(_0x3908be){const _0x24112a=_0x488928;return _0x3908be['status']&&_0x3908be[_0x24112a(0x422)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x488928(0x446)]=VisuMZ[label][_0x488928(0x446)]||{},VisuMZ[_0x488928(0x391)]=function(_0x37aef4,_0x30ba25){const _0x138aec=_0x488928;for(const _0x337433 in _0x30ba25){if(_0x337433[_0x138aec(0x337)](/(.*):(.*)/i)){const _0xeb9dc2=String(RegExp['$1']),_0x462da4=String(RegExp['$2'])[_0x138aec(0x322)]()[_0x138aec(0x1fe)]();let _0x47d8da,_0x269ce1,_0x80fbd5;switch(_0x462da4){case _0x138aec(0x487):_0x47d8da=_0x30ba25[_0x337433]!==''?Number(_0x30ba25[_0x337433]):0x0;break;case _0x138aec(0x3da):_0x269ce1=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):[],_0x47d8da=_0x269ce1[_0x138aec(0x27a)](_0x1a80b0=>Number(_0x1a80b0));break;case _0x138aec(0x22f):_0x47d8da=_0x30ba25[_0x337433]!==''?eval(_0x30ba25[_0x337433]):null;break;case _0x138aec(0x43b):_0x269ce1=_0x30ba25[_0x337433]!==''?JSON['parse'](_0x30ba25[_0x337433]):[],_0x47d8da=_0x269ce1[_0x138aec(0x27a)](_0x42e3ea=>eval(_0x42e3ea));break;case _0x138aec(0x1dd):_0x47d8da=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):'';break;case'ARRAYJSON':_0x269ce1=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):[],_0x47d8da=_0x269ce1[_0x138aec(0x27a)](_0x521a4c=>JSON[_0x138aec(0x2be)](_0x521a4c));break;case _0x138aec(0x20f):_0x47d8da=_0x30ba25[_0x337433]!==''?new Function(JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433])):new Function(_0x138aec(0x356));break;case _0x138aec(0x366):_0x269ce1=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):[],_0x47d8da=_0x269ce1[_0x138aec(0x27a)](_0x2b1624=>new Function(JSON[_0x138aec(0x2be)](_0x2b1624)));break;case _0x138aec(0x387):_0x47d8da=_0x30ba25[_0x337433]!==''?String(_0x30ba25[_0x337433]):'';break;case _0x138aec(0x3b1):_0x269ce1=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):[],_0x47d8da=_0x269ce1[_0x138aec(0x27a)](_0x3c7334=>String(_0x3c7334));break;case'STRUCT':_0x80fbd5=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):{},_0x37aef4[_0xeb9dc2]={},VisuMZ['ConvertParams'](_0x37aef4[_0xeb9dc2],_0x80fbd5);continue;case _0x138aec(0x409):_0x269ce1=_0x30ba25[_0x337433]!==''?JSON[_0x138aec(0x2be)](_0x30ba25[_0x337433]):[],_0x47d8da=_0x269ce1['map'](_0x1fe64e=>VisuMZ[_0x138aec(0x391)]({},JSON['parse'](_0x1fe64e)));break;default:continue;}_0x37aef4[_0xeb9dc2]=_0x47d8da;}}return _0x37aef4;},(_0x348dbe=>{const _0xad04f5=_0x488928,_0x5d63a6=_0x348dbe[_0xad04f5(0x31d)];for(const _0x5ab704 of dependencies){if(!Imported[_0x5ab704]){alert(_0xad04f5(0x2c7)['format'](_0x5d63a6,_0x5ab704)),SceneManager[_0xad04f5(0x1fc)]();break;}}const _0x134929=_0x348dbe[_0xad04f5(0x422)];if(_0x134929[_0xad04f5(0x337)](/\[Version[ ](.*?)\]/i)){const _0x1da4cf=Number(RegExp['$1']);_0x1da4cf!==VisuMZ[label][_0xad04f5(0x459)]&&(alert(_0xad04f5(0x2e1)[_0xad04f5(0x304)](_0x5d63a6,_0x1da4cf)),SceneManager[_0xad04f5(0x1fc)]());}if(_0x134929['match'](/\[Tier[ ](\d+)\]/i)){const _0x2ec037=Number(RegExp['$1']);_0x2ec037<tier?(alert(_0xad04f5(0x28a)['format'](_0x5d63a6,_0x2ec037,tier)),SceneManager[_0xad04f5(0x1fc)]()):tier=Math[_0xad04f5(0x21e)](_0x2ec037,tier);}VisuMZ[_0xad04f5(0x391)](VisuMZ[label][_0xad04f5(0x446)],_0x348dbe['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x488928(0x273),_0x4b3e80=>{const _0x16759e=_0x488928;VisuMZ[_0x16759e(0x391)](_0x4b3e80,_0x4b3e80);const _0x34216c=_0x4b3e80['LineHeight']||$gameSystem['getChoiceListLineHeight']()||0x1,_0x555693=_0x4b3e80['MaxRows']||$gameSystem[_0x16759e(0x478)]()||0x1,_0x3b2be1=_0x4b3e80[_0x16759e(0x303)]||$gameSystem[_0x16759e(0x473)]()||0x1,_0x50be39=_0x4b3e80[_0x16759e(0x40a)][_0x16759e(0x246)]()||'default';$gameSystem[_0x16759e(0x225)](_0x34216c),$gameSystem['setChoiceListMaxRows'](_0x555693),$gameSystem[_0x16759e(0x2a4)](_0x3b2be1),$gameSystem[_0x16759e(0x3e8)](_0x50be39);}),PluginManager[_0x488928(0x39f)](pluginData['name'],_0x488928(0x44c),_0x93d2d4=>{const _0x4566e2=_0x488928;VisuMZ[_0x4566e2(0x391)](_0x93d2d4,_0x93d2d4);const _0x52666a=_0x93d2d4['Rows']||$gameSystem[_0x4566e2(0x346)]()||0x1,_0xc3d699=_0x93d2d4[_0x4566e2(0x440)]||$gameSystem[_0x4566e2(0x45f)]()||0x1;$gameTemp[_0x4566e2(0x298)]=!![];const _0x237c6a=_0x93d2d4[_0x4566e2(0x47e)][_0x4566e2(0x246)]();$gameSystem[_0x4566e2(0x20b)](_0x52666a),$gameSystem[_0x4566e2(0x29d)](_0xc3d699);[_0x4566e2(0x439),_0x4566e2(0x1eb)][_0x4566e2(0x23a)](_0x237c6a)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x237c6a));const _0xbbe810=SceneManager[_0x4566e2(0x2af)][_0x4566e2(0x2f4)];_0xbbe810&&(_0xbbe810['resetWordWrap'](),_0xbbe810[_0x4566e2(0x490)](),_0xbbe810['createContents']());}),PluginManager[_0x488928(0x39f)](pluginData[_0x488928(0x31d)],'MessageWindowXyOffsets',_0x513b2a=>{const _0x544c81=_0x488928;VisuMZ[_0x544c81(0x391)](_0x513b2a,_0x513b2a),$gameSystem['setMessageWindowXyOffsets'](_0x513b2a[_0x544c81(0x34a)],_0x513b2a['OffsetY']);const _0x159f7a=SceneManager['_scene'][_0x544c81(0x2f4)];_0x159f7a&&(_0x159f7a[_0x544c81(0x1fd)](),_0x159f7a[_0x544c81(0x490)](),_0x159f7a[_0x544c81(0x3c9)]());}),PluginManager[_0x488928(0x39f)](pluginData['name'],'SelectWeapon',_0x3ae586=>{const _0x12d917=_0x488928;VisuMZ[_0x12d917(0x391)](_0x3ae586,_0x3ae586),$gameMessage[_0x12d917(0x20e)](_0x3ae586['VariableID']||0x0,_0x3ae586[_0x12d917(0x207)]||0x0);const _0x1fc5d4=$gameTemp[_0x12d917(0x403)]();if(_0x1fc5d4)_0x1fc5d4[_0x12d917(0x401)]('message');}),PluginManager[_0x488928(0x39f)](pluginData[_0x488928(0x31d)],_0x488928(0x1f5),_0x2b5797=>{const _0x26101c=_0x488928;VisuMZ[_0x26101c(0x391)](_0x2b5797,_0x2b5797),$gameMessage[_0x26101c(0x3f0)](_0x2b5797['VariableID']||0x0,_0x2b5797[_0x26101c(0x488)]||0x0,_0x2b5797[_0x26101c(0x2ff)]||0x0);const _0x642fb=$gameTemp[_0x26101c(0x403)]();if(_0x642fb)_0x642fb['setWaitMode'](_0x26101c(0x28d));}),PluginManager[_0x488928(0x39f)](pluginData[_0x488928(0x31d)],'SelectSkill',_0x5d9322=>{const _0x1a95c2=_0x488928;VisuMZ[_0x1a95c2(0x391)](_0x5d9322,_0x5d9322),$gameMessage['setSkillChoice'](_0x5d9322[_0x1a95c2(0x27e)]||0x0,_0x5d9322[_0x1a95c2(0x3df)]||0x0,_0x5d9322[_0x1a95c2(0x3f6)]||0x0);const _0x13fc17=$gameTemp[_0x1a95c2(0x403)]();if(_0x13fc17)_0x13fc17['setWaitMode']('message');}),PluginManager['registerCommand'](pluginData[_0x488928(0x31d)],'PictureTextChange',_0x265916=>{const _0x11a088=_0x488928;VisuMZ[_0x11a088(0x391)](_0x265916,_0x265916);const _0x215930=_0x265916['PictureIDs']||[],_0x29c185=_0x265916[_0x11a088(0x2de)]||0x0,_0x2413bb=[_0x11a088(0x284),'up',_0x11a088(0x370),_0x11a088(0x3de),_0x11a088(0x496),_0x11a088(0x3b7),'lowerleft',_0x11a088(0x482),_0x11a088(0x26f)];for(const _0x101387 of _0x215930){$gameScreen[_0x11a088(0x49f)](_0x101387,_0x29c185);for(const _0x10813a of _0x2413bb){if(_0x265916[_0x10813a]===undefined)continue;$gameScreen[_0x11a088(0x3b2)](_0x101387,_0x265916[_0x10813a],_0x10813a);}}}),PluginManager[_0x488928(0x39f)](pluginData['name'],'PictureTextErase',_0x2d15ef=>{const _0x5a40a3=_0x488928;VisuMZ[_0x5a40a3(0x391)](_0x2d15ef,_0x2d15ef);const _0x57b299=_0x2d15ef[_0x5a40a3(0x35a)]||[];for(const _0x21ad45 of _0x57b299){$gameScreen[_0x5a40a3(0x4a1)](_0x21ad45),$gameScreen[_0x5a40a3(0x1e0)](_0x21ad45);}}),PluginManager['registerCommand'](pluginData[_0x488928(0x31d)],_0x488928(0x432),_0x34192e=>{const _0x1d8395=_0x488928;$gameScreen[_0x1d8395(0x3d7)]();}),VisuMZ[_0x488928(0x44d)][_0x488928(0x287)]=Scene_Boot[_0x488928(0x2fa)][_0x488928(0x2d3)],Scene_Boot[_0x488928(0x2fa)][_0x488928(0x2d3)]=function(){const _0x5f40a8=_0x488928;VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded'][_0x5f40a8(0x2ed)](this),this[_0x5f40a8(0x212)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x5f40a8(0x431)]();},VisuMZ[_0x488928(0x44d)][_0x488928(0x38a)]=function(_0x309895){const _0x75432e=_0x488928,_0x5e72a2=VisuMZ[_0x75432e(0x44d)]['Settings'][_0x309895];_0x5e72a2['sort']((_0x56a985,_0x19b550)=>{const _0x410b9b=_0x75432e;if(!_0x56a985||!_0x19b550)return-0x1;return _0x19b550[_0x410b9b(0x33f)][_0x410b9b(0x476)]-_0x56a985[_0x410b9b(0x33f)][_0x410b9b(0x476)];});},Scene_Boot[_0x488928(0x2fa)][_0x488928(0x212)]=function(){const _0x25ea37=_0x488928;VisuMZ['MessageCore']['SortObjectByKeyLength'](_0x25ea37(0x41f));for(const _0x5721f1 of VisuMZ['MessageCore'][_0x25ea37(0x446)][_0x25ea37(0x41f)]){_0x5721f1['Match']=_0x5721f1[_0x25ea37(0x33f)]['toUpperCase'](),_0x5721f1[_0x25ea37(0x37a)]=new RegExp('\x1b'+_0x5721f1['Match'],'gi'),_0x5721f1['textCodeResult']='\x1b'+_0x5721f1['Match'];if(_0x5721f1[_0x25ea37(0x3f4)]==='')_0x5721f1['textCodeResult']+=_0x25ea37(0x20d);}},Scene_Boot[_0x488928(0x2fa)][_0x488928(0x33c)]=function(){const _0x51f093=_0x488928;VisuMZ[_0x51f093(0x44d)][_0x51f093(0x38a)]('TextCodeReplace');for(const _0x403b6e of VisuMZ['MessageCore']['Settings'][_0x51f093(0x215)]){_0x403b6e[_0x51f093(0x37a)]=new RegExp('\x1b'+_0x403b6e[_0x51f093(0x33f)]+_0x403b6e[_0x51f093(0x3f4)],'gi'),_0x403b6e[_0x51f093(0x3f2)]!==''&&_0x403b6e['TextStr']!=='Undefined'?_0x403b6e[_0x51f093(0x23c)]=new Function(_0x51f093(0x26c)+_0x403b6e[_0x51f093(0x3f2)][_0x51f093(0x329)](/\\/g,'\x1b')+'\x27'):_0x403b6e['textCodeResult']=_0x403b6e[_0x51f093(0x3e7)];}},Scene_Boot['prototype'][_0x488928(0x21f)]=function(){const _0x186761=_0x488928;for(const _0x3f4b41 of VisuMZ[_0x186761(0x44d)][_0x186761(0x446)][_0x186761(0x447)]){_0x3f4b41[_0x186761(0x37a)]=new RegExp('\x5c['+_0x3f4b41['Match']+'\x5c]','gi');if(_0x3f4b41['TextStr']!==''&&_0x3f4b41[_0x186761(0x3f2)]!==_0x186761(0x236)){let _0x5d1a60=_0x3f4b41['TextStr'];_0x5d1a60=_0x5d1a60[_0x186761(0x329)](/\\/g,'\x1b'),_0x5d1a60=_0x5d1a60[_0x186761(0x329)]('\x27','\x5c\x27'),_0x5d1a60=_0x5d1a60[_0x186761(0x329)]('\x22','\x5c\x22'),_0x3f4b41[_0x186761(0x23c)]=new Function(_0x186761(0x26c)+_0x5d1a60+'\x27');}else _0x3f4b41[_0x186761(0x23c)]=_0x3f4b41[_0x186761(0x3e7)];}},Scene_Boot['prototype'][_0x488928(0x431)]=function(){const _0x4ae98a=_0x488928,_0x2ab8ab=VisuMZ['MessageCore'][_0x4ae98a(0x446)]['AutoColor'];!VisuMZ[_0x4ae98a(0x404)]&&(VisuMZ['MessageCore'][_0x4ae98a(0x430)]($dataClasses,_0x2ab8ab[_0x4ae98a(0x208)]),VisuMZ[_0x4ae98a(0x44d)][_0x4ae98a(0x430)]($dataSkills,_0x2ab8ab[_0x4ae98a(0x377)]),VisuMZ[_0x4ae98a(0x44d)][_0x4ae98a(0x430)]($dataItems,_0x2ab8ab['Items']),VisuMZ['MessageCore'][_0x4ae98a(0x430)]($dataWeapons,_0x2ab8ab['Weapons']),VisuMZ['MessageCore'][_0x4ae98a(0x430)]($dataArmors,_0x2ab8ab[_0x4ae98a(0x4ab)]),VisuMZ['MessageCore'][_0x4ae98a(0x430)]($dataEnemies,_0x2ab8ab[_0x4ae98a(0x302)]),VisuMZ[_0x4ae98a(0x44d)]['AddAutoColor']($dataStates,_0x2ab8ab[_0x4ae98a(0x22a)])),VisuMZ[_0x4ae98a(0x44d)][_0x4ae98a(0x27b)]();},VisuMZ['MessageCore']['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>',_0x488928(0x372),_0x488928(0x28b),_0x488928(0x29a),'<LEFT>',_0x488928(0x3ca),_0x488928(0x28e),_0x488928(0x3bb),_0x488928(0x445),_0x488928(0x451),'<COLORLOCK>','</COLORLOCK>',_0x488928(0x3c4),_0x488928(0x21a),_0x488928(0x3b3),_0x488928(0x48d),'<BR>',_0x488928(0x1f0),'PICTURE',_0x488928(0x460),'COMMONEVENT',_0x488928(0x1ea),_0x488928(0x249),_0x488928(0x24f),_0x488928(0x4ad),_0x488928(0x1e4),_0x488928(0x2b0),_0x488928(0x309),'ALL',_0x488928(0x1fb)],VisuMZ[_0x488928(0x44d)][_0x488928(0x430)]=function(_0x391db8,_0x1b10a1){const _0x25de08=_0x488928;if(_0x1b10a1<=0x0)return;const _0x4cf20a=_0x391db8;for(const _0x38efa8 of _0x4cf20a){if(!_0x38efa8)continue;VisuMZ[_0x25de08(0x44d)][_0x25de08(0x1d1)](_0x38efa8,_0x1b10a1);}},VisuMZ['MessageCore'][_0x488928(0x27b)]=function(){const _0x70aa1a=_0x488928;VisuMZ['MessageCore'][_0x70aa1a(0x262)]=[];for(let _0x5980ac=0x1;_0x5980ac<=0x1f;_0x5980ac++){const _0x4c4358=_0x70aa1a(0x342)[_0x70aa1a(0x304)](_0x5980ac),_0x2e6a29=VisuMZ[_0x70aa1a(0x44d)]['Settings']['AutoColor'][_0x4c4358];_0x2e6a29['sort']((_0x1ad87b,_0x351431)=>{const _0x3d0026=_0x70aa1a;if(!_0x1ad87b||!_0x351431)return-0x1;return _0x351431[_0x3d0026(0x476)]-_0x1ad87b[_0x3d0026(0x476)];}),this['CreateAutoColorRegExpListEntries'](_0x2e6a29,_0x5980ac);}},VisuMZ[_0x488928(0x44d)][_0x488928(0x40f)]=function(_0x594710,_0x4bb14c){const _0x3694d6=_0x488928;for(const _0x91fcd of _0x594710){if(_0x91fcd['length']<=0x0)continue;if(/^\d+$/['test'](_0x91fcd))continue;let _0x336bc7=VisuMZ[_0x3694d6(0x44d)]['ConvertTextAutoColorRegExpFriendly'](_0x91fcd);if(_0x91fcd[_0x3694d6(0x337)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x1ba1e6=new RegExp(_0x336bc7,'i');else var _0x1ba1e6=new RegExp('\x5cb'+_0x336bc7+'\x5cb','g');VisuMZ['MessageCore'][_0x3694d6(0x262)][_0x3694d6(0x206)]([_0x1ba1e6,_0x3694d6(0x25c)['format'](_0x4bb14c,_0x91fcd)]);}},VisuMZ['MessageCore'][_0x488928(0x3ef)]=function(_0x245c54){const _0x3939ee=_0x488928;return _0x245c54=_0x245c54[_0x3939ee(0x329)](/(\W)/gi,(_0x3c609f,_0x55fb7d)=>_0x3939ee(0x1f8)[_0x3939ee(0x304)](_0x55fb7d)),_0x245c54;},VisuMZ[_0x488928(0x44d)][_0x488928(0x2d1)]=VisuMZ[_0x488928(0x2d1)],VisuMZ[_0x488928(0x2d1)]=function(_0x1011c0){const _0x1bf5c5=_0x488928;VisuMZ[_0x1bf5c5(0x44d)][_0x1bf5c5(0x2d1)][_0x1bf5c5(0x2ed)](this,_0x1011c0);const _0x494ffc=VisuMZ[_0x1bf5c5(0x44d)][_0x1bf5c5(0x446)][_0x1bf5c5(0x3f7)];VisuMZ[_0x1bf5c5(0x44d)][_0x1bf5c5(0x1d1)](_0x1011c0,_0x494ffc['Classes']);},VisuMZ[_0x488928(0x44d)][_0x488928(0x380)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x488928(0x380)]=function(_0x974602){const _0x5c4b12=_0x488928;VisuMZ['MessageCore']['ParseSkillNotetags']['call'](this,_0x974602);const _0x2b0be4=VisuMZ[_0x5c4b12(0x44d)][_0x5c4b12(0x446)][_0x5c4b12(0x3f7)];VisuMZ[_0x5c4b12(0x44d)][_0x5c4b12(0x1d1)](_0x974602,_0x2b0be4[_0x5c4b12(0x377)]);},0x7,VisuMZ[_0x488928(0x44d)][_0x488928(0x2c5)]=VisuMZ[_0x488928(0x2c5)],VisuMZ[_0x488928(0x2c5)]=function(_0x2d3ec5){const _0xd2ec6a=_0x488928;VisuMZ[_0xd2ec6a(0x44d)][_0xd2ec6a(0x2c5)]['call'](this,_0x2d3ec5);const _0x23b9f7=VisuMZ[_0xd2ec6a(0x44d)][_0xd2ec6a(0x446)][_0xd2ec6a(0x3f7)];VisuMZ[_0xd2ec6a(0x44d)][_0xd2ec6a(0x1d1)](_0x2d3ec5,_0x23b9f7['Items']);},VisuMZ[_0x488928(0x44d)][_0x488928(0x1dc)]=VisuMZ[_0x488928(0x1dc)],VisuMZ[_0x488928(0x1dc)]=function(_0x47881a){const _0x12b8af=_0x488928;VisuMZ[_0x12b8af(0x44d)][_0x12b8af(0x1dc)][_0x12b8af(0x2ed)](this,_0x47881a);const _0x1705c3=VisuMZ[_0x12b8af(0x44d)][_0x12b8af(0x446)][_0x12b8af(0x3f7)];VisuMZ[_0x12b8af(0x44d)][_0x12b8af(0x1d1)](_0x47881a,_0x1705c3[_0x12b8af(0x49e)]);},VisuMZ[_0x488928(0x44d)][_0x488928(0x2e2)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x488928(0x2e2)]=function(_0x4e9b7b){const _0x3dac6c=_0x488928;VisuMZ['MessageCore'][_0x3dac6c(0x2e2)][_0x3dac6c(0x2ed)](this,_0x4e9b7b);const _0x5d149d=VisuMZ['MessageCore'][_0x3dac6c(0x446)][_0x3dac6c(0x3f7)];VisuMZ[_0x3dac6c(0x44d)]['CreateAutoColorFor'](_0x4e9b7b,_0x5d149d[_0x3dac6c(0x4ab)]);},VisuMZ['MessageCore'][_0x488928(0x3bf)]=VisuMZ[_0x488928(0x3bf)],VisuMZ['ParseEnemyNotetags']=function(_0x43c968){const _0x178050=_0x488928;VisuMZ[_0x178050(0x44d)][_0x178050(0x3bf)]['call'](this,_0x43c968);const _0xdddbaa=VisuMZ[_0x178050(0x44d)][_0x178050(0x446)][_0x178050(0x3f7)];VisuMZ[_0x178050(0x44d)]['CreateAutoColorFor'](_0x43c968,_0xdddbaa[_0x178050(0x302)]);},VisuMZ[_0x488928(0x44d)][_0x488928(0x340)]=VisuMZ[_0x488928(0x340)],VisuMZ['ParseStateNotetags']=function(_0x1ab992){const _0x2015d5=_0x488928;VisuMZ[_0x2015d5(0x44d)]['ParseStateNotetags'][_0x2015d5(0x2ed)](this,_0x1ab992);const _0x3d4736=VisuMZ[_0x2015d5(0x44d)][_0x2015d5(0x446)][_0x2015d5(0x3f7)];VisuMZ[_0x2015d5(0x44d)][_0x2015d5(0x1d1)](_0x1ab992,_0x3d4736['States']);},VisuMZ[_0x488928(0x44d)][_0x488928(0x1d1)]=function(_0x51c3b3,_0x259022){const _0x122c3c=_0x488928;if(_0x259022<=0x0)return;const _0x75e512=VisuMZ[_0x122c3c(0x44d)][_0x122c3c(0x446)][_0x122c3c(0x3f7)][_0x122c3c(0x45e)+_0x259022];let _0x3406fc=_0x51c3b3[_0x122c3c(0x31d)][_0x122c3c(0x1fe)]();if(/^\d+$/[_0x122c3c(0x469)](_0x3406fc))return;if(VisuMZ[_0x122c3c(0x44d)][_0x122c3c(0x26d)][_0x122c3c(0x23a)](_0x3406fc[_0x122c3c(0x322)]()))return;_0x3406fc=_0x3406fc[_0x122c3c(0x329)](/\\I\[(\d+)\]/gi,''),_0x3406fc=_0x3406fc[_0x122c3c(0x329)](/\x1bI\[(\d+)\]/gi,'');if(_0x3406fc[_0x122c3c(0x476)]<=0x0)return;if(_0x3406fc[_0x122c3c(0x337)](/-----/i))return;_0x75e512[_0x122c3c(0x206)](_0x3406fc);},SceneManager[_0x488928(0x359)]=function(){const _0x287b44=_0x488928;return this[_0x287b44(0x2af)]&&this[_0x287b44(0x2af)][_0x287b44(0x218)]===Scene_Battle;},SceneManager[_0x488928(0x338)]=function(){const _0x578ed4=_0x488928;return this[_0x578ed4(0x2af)]&&this[_0x578ed4(0x2af)][_0x578ed4(0x218)]===Scene_Map;},VisuMZ[_0x488928(0x44d)][_0x488928(0x493)]=TextManager[_0x488928(0x28d)],TextManager[_0x488928(0x28d)]=function(_0x518958){const _0x578bd7=_0x488928,_0x12f40f=[_0x578bd7(0x25a),'emerge',_0x578bd7(0x4a3),_0x578bd7(0x1fa),_0x578bd7(0x48e),_0x578bd7(0x290),'escapeStart',_0x578bd7(0x37e),_0x578bd7(0x2a8),_0x578bd7(0x47f)];let _0x318cd0=VisuMZ[_0x578bd7(0x44d)][_0x578bd7(0x493)][_0x578bd7(0x2ed)](this,_0x518958);return _0x12f40f['includes'](_0x518958)&&(_0x318cd0=_0x578bd7(0x48d)+_0x318cd0),_0x318cd0;},ConfigManager[_0x488928(0x32e)]=VisuMZ[_0x488928(0x44d)][_0x488928(0x446)][_0x488928(0x237)][_0x488928(0x363)],VisuMZ['MessageCore'][_0x488928(0x393)]=ConfigManager[_0x488928(0x256)],ConfigManager[_0x488928(0x256)]=function(){const _0x4f41e1=_0x488928,_0x37a58a=VisuMZ['MessageCore'][_0x4f41e1(0x393)][_0x4f41e1(0x2ed)](this);return _0x37a58a[_0x4f41e1(0x32e)]=this[_0x4f41e1(0x32e)],_0x37a58a;},VisuMZ['MessageCore'][_0x488928(0x24c)]=ConfigManager['applyData'],ConfigManager[_0x488928(0x3d3)]=function(_0x1ad3b3){const _0x10fdb2=_0x488928;VisuMZ[_0x10fdb2(0x44d)][_0x10fdb2(0x24c)][_0x10fdb2(0x2ed)](this,_0x1ad3b3),_0x10fdb2(0x32e)in _0x1ad3b3?this['textSpeed']=Number(_0x1ad3b3[_0x10fdb2(0x32e)])['clamp'](0x1,0xb):this[_0x10fdb2(0x32e)]=VisuMZ[_0x10fdb2(0x44d)][_0x10fdb2(0x446)][_0x10fdb2(0x237)][_0x10fdb2(0x363)];},TextManager[_0x488928(0x33a)]=VisuMZ[_0x488928(0x44d)][_0x488928(0x446)]['TextSpeed']['Name'],TextManager[_0x488928(0x280)]=VisuMZ[_0x488928(0x44d)][_0x488928(0x446)]['TextSpeed']['Instant'],Game_Temp[_0x488928(0x2fa)]['setLastPluginCommandInterpreter']=function(_0x258175){const _0x8ab24a=_0x488928;this[_0x8ab24a(0x378)]=_0x258175;},Game_Temp[_0x488928(0x2fa)][_0x488928(0x403)]=function(){const _0x51e8f1=_0x488928;return this[_0x51e8f1(0x378)];},VisuMZ[_0x488928(0x44d)][_0x488928(0x40c)]=Game_Interpreter[_0x488928(0x2fa)]['command357'],Game_Interpreter['prototype'][_0x488928(0x23d)]=function(_0x4ec0e8){const _0x552c8a=_0x488928;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['MessageCore'][_0x552c8a(0x40c)]['call'](this,_0x4ec0e8);},VisuMZ['MessageCore'][_0x488928(0x2cc)]=Game_System['prototype'][_0x488928(0x2bf)],Game_System[_0x488928(0x2fa)][_0x488928(0x2bf)]=function(){const _0x6722b=_0x488928;VisuMZ[_0x6722b(0x44d)][_0x6722b(0x2cc)][_0x6722b(0x2ed)](this),this[_0x6722b(0x3ce)]();},Game_System[_0x488928(0x2fa)][_0x488928(0x3ce)]=function(){const _0xd3a115=_0x488928,_0x52d075=VisuMZ[_0xd3a115(0x44d)][_0xd3a115(0x446)]['General'],_0x8e2540=VisuMZ[_0xd3a115(0x44d)][_0xd3a115(0x446)][_0xd3a115(0x47e)];this[_0xd3a115(0x2b9)]={'messageRows':_0x52d075[_0xd3a115(0x2e5)],'messageWidth':_0x52d075[_0xd3a115(0x2f3)],'messageWordWrap':_0x8e2540[_0xd3a115(0x436)],'helpWordWrap':_0x8e2540['HelpWindow'],'choiceLineHeight':_0x52d075[_0xd3a115(0x2f1)],'choiceRows':_0x52d075[_0xd3a115(0x21c)],'choiceCols':_0x52d075['ChoiceWindowMaxCols'],'choiceTextAlign':_0x52d075[_0xd3a115(0x297)]},this[_0xd3a115(0x3b6)]===undefined&&(this[_0xd3a115(0x3b6)]=_0x52d075[_0xd3a115(0x3a2)],this[_0xd3a115(0x32f)]=_0x52d075['MsgWindowOffsetY']);},Game_System[_0x488928(0x2fa)][_0x488928(0x346)]=function(){const _0x5d5c47=_0x488928;if(this[_0x5d5c47(0x2b9)]===undefined)this[_0x5d5c47(0x3ce)]();if(this[_0x5d5c47(0x2b9)]['messageRows']===undefined)this[_0x5d5c47(0x3ce)]();return this[_0x5d5c47(0x2b9)][_0x5d5c47(0x47d)];},Game_System['prototype'][_0x488928(0x20b)]=function(_0x455d2c){const _0x50b7a9=_0x488928;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x50b7a9(0x2b9)][_0x50b7a9(0x47d)]===undefined)this[_0x50b7a9(0x3ce)]();this['_MessageCoreSettings'][_0x50b7a9(0x47d)]=_0x455d2c||0x1;},Game_System[_0x488928(0x2fa)][_0x488928(0x45f)]=function(){const _0x323fef=_0x488928;if(this[_0x323fef(0x2b9)]===undefined)this[_0x323fef(0x3ce)]();if(this[_0x323fef(0x2b9)][_0x323fef(0x23b)]===undefined)this['initMessageCore']();return this[_0x323fef(0x2b9)]['messageWidth'];},Game_System[_0x488928(0x2fa)][_0x488928(0x29d)]=function(_0x2f9e4c){const _0x94adb6=_0x488928;if(this[_0x94adb6(0x2b9)]===undefined)this[_0x94adb6(0x3ce)]();if(this[_0x94adb6(0x2b9)][_0x94adb6(0x23b)]===undefined)this['initMessageCore']();_0x2f9e4c=Math[_0x94adb6(0x47a)](_0x2f9e4c);if(_0x2f9e4c%0x2!==0x0)_0x2f9e4c+=0x1;this[_0x94adb6(0x2b9)][_0x94adb6(0x23b)]=_0x2f9e4c||0x2;},Game_System[_0x488928(0x2fa)][_0x488928(0x227)]=function(){const _0x935cb2=_0x488928;if(this[_0x935cb2(0x2b9)]===undefined)this[_0x935cb2(0x3ce)]();if(this['_MessageCoreSettings']['messageWordWrap']===undefined)this[_0x935cb2(0x3ce)]();return this['_MessageCoreSettings']['messageWordWrap'];},Game_System[_0x488928(0x2fa)][_0x488928(0x332)]=function(_0x4a5b0d){const _0x404b28=_0x488928;if(this[_0x404b28(0x2b9)]===undefined)this[_0x404b28(0x3ce)]();if(this['_MessageCoreSettings'][_0x404b28(0x266)]===undefined)this[_0x404b28(0x3ce)]();this[_0x404b28(0x2b9)][_0x404b28(0x266)]=_0x4a5b0d;},Game_System[_0x488928(0x2fa)][_0x488928(0x486)]=function(){const _0x1f0808=_0x488928;if(this[_0x1f0808(0x3b6)]===undefined){const _0x8bd464=VisuMZ[_0x1f0808(0x44d)]['Settings'][_0x1f0808(0x425)];this[_0x1f0808(0x3b6)]=_0x8bd464[_0x1f0808(0x3a2)],this[_0x1f0808(0x32f)]=_0x8bd464['MsgWindowOffsetY'];}return{'x':this[_0x1f0808(0x3b6)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System[_0x488928(0x2fa)][_0x488928(0x308)]=function(_0x39c8bd,_0x28441d){const _0x268092=_0x488928;if(this[_0x268092(0x2b9)]===undefined)this['initMessageCore']();this[_0x268092(0x3b6)]=_0x39c8bd,this['_messageOffsetY']=_0x28441d;},Game_System['prototype']['isHelpWindowWordWrap']=function(){const _0xbe451b=_0x488928;if(this[_0xbe451b(0x2b9)]===undefined)this[_0xbe451b(0x3ce)]();if(this['_MessageCoreSettings'][_0xbe451b(0x465)]===undefined)this[_0xbe451b(0x3ce)]();return this['_MessageCoreSettings'][_0xbe451b(0x465)];},Game_System[_0x488928(0x2fa)]['setHelpWindowWordWrap']=function(_0x4b7c3c){const _0x1e769e=_0x488928;if(this[_0x1e769e(0x2b9)]===undefined)this[_0x1e769e(0x3ce)]();if(this[_0x1e769e(0x2b9)][_0x1e769e(0x465)]===undefined)this['initMessageCore']();this[_0x1e769e(0x2b9)][_0x1e769e(0x465)]=_0x4b7c3c;},Game_System[_0x488928(0x2fa)]['getChoiceListLineHeight']=function(){const _0xe941fc=_0x488928;if(this[_0xe941fc(0x2b9)]===undefined)this[_0xe941fc(0x3ce)]();if(this[_0xe941fc(0x2b9)][_0xe941fc(0x300)]===undefined)this[_0xe941fc(0x3ce)]();return this[_0xe941fc(0x2b9)]['choiceLineHeight'];},Game_System[_0x488928(0x2fa)][_0x488928(0x225)]=function(_0x1239f9){const _0x2c904f=_0x488928;if(this[_0x2c904f(0x2b9)]===undefined)this[_0x2c904f(0x3ce)]();if(this['_MessageCoreSettings'][_0x2c904f(0x300)]===undefined)this[_0x2c904f(0x3ce)]();this[_0x2c904f(0x2b9)][_0x2c904f(0x300)]=_0x1239f9||0x1;},Game_System[_0x488928(0x2fa)]['getChoiceListMaxRows']=function(){const _0x42f58a=_0x488928;if(this[_0x42f58a(0x2b9)]===undefined)this[_0x42f58a(0x3ce)]();if(this['_MessageCoreSettings'][_0x42f58a(0x305)]===undefined)this[_0x42f58a(0x3ce)]();return this[_0x42f58a(0x2b9)][_0x42f58a(0x305)];},Game_System[_0x488928(0x2fa)][_0x488928(0x2d2)]=function(_0x1f9e04){const _0x280b44=_0x488928;if(this[_0x280b44(0x2b9)]===undefined)this[_0x280b44(0x3ce)]();if(this[_0x280b44(0x2b9)][_0x280b44(0x305)]===undefined)this[_0x280b44(0x3ce)]();this['_MessageCoreSettings'][_0x280b44(0x305)]=_0x1f9e04||0x1;},Game_System[_0x488928(0x2fa)]['getChoiceListMaxColumns']=function(){const _0x340618=_0x488928;if(this[_0x340618(0x2b9)]===undefined)this[_0x340618(0x3ce)]();if(this['_MessageCoreSettings'][_0x340618(0x46d)]===undefined)this[_0x340618(0x3ce)]();return this[_0x340618(0x2b9)]['choiceCols'];},Game_System[_0x488928(0x2fa)][_0x488928(0x2a4)]=function(_0x1bebb6){const _0x528941=_0x488928;if(this[_0x528941(0x2b9)]===undefined)this[_0x528941(0x3ce)]();if(this[_0x528941(0x2b9)][_0x528941(0x46d)]===undefined)this[_0x528941(0x3ce)]();this[_0x528941(0x2b9)][_0x528941(0x46d)]=_0x1bebb6||0x1;},Game_System[_0x488928(0x2fa)]['getChoiceListTextAlign']=function(){const _0x4a49f7=_0x488928;if(this['_MessageCoreSettings']===undefined)this[_0x4a49f7(0x3ce)]();if(this['_MessageCoreSettings'][_0x4a49f7(0x269)]===undefined)this[_0x4a49f7(0x3ce)]();return this[_0x4a49f7(0x2b9)][_0x4a49f7(0x269)];},Game_System[_0x488928(0x2fa)][_0x488928(0x3e8)]=function(_0x56b6d4){const _0x51219a=_0x488928;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x51219a(0x2b9)]['choiceTextAlign']===undefined)this[_0x51219a(0x3ce)]();this[_0x51219a(0x2b9)][_0x51219a(0x269)]=_0x56b6d4['toLowerCase']();},Game_Message['prototype']['setWeaponChoice']=function(_0x409747,_0x2b2965){const _0x448658=_0x488928;this['_itemChoiceVariableId']=_0x409747,this[_0x448658(0x2d6)]=_0x448658(0x499),this[_0x448658(0x263)]=_0x2b2965,this[_0x448658(0x29f)]=0x0;},Game_Message[_0x488928(0x2fa)][_0x488928(0x279)]=function(){const _0x328c26=_0x488928;return this[_0x328c26(0x263)]||0x0;},Game_Message[_0x488928(0x2fa)][_0x488928(0x3f0)]=function(_0x3d77fc,_0x170061,_0x51278f){const _0x273caa=_0x488928;this['_itemChoiceVariableId']=_0x3d77fc,this[_0x273caa(0x2d6)]='armor',this[_0x273caa(0x2e9)]=_0x170061,this['_itemChoiceEtypeId']=_0x51278f;},Game_Message[_0x488928(0x2fa)][_0x488928(0x2ad)]=function(){const _0x2c0dc3=_0x488928;return this[_0x2c0dc3(0x2e9)]||0x0;},Game_Message[_0x488928(0x2fa)][_0x488928(0x472)]=function(){return this['_itemChoiceEtypeId']||0x0;},Game_Message['prototype']['setSkillChoice']=function(_0x1b34f6,_0x28ef6e,_0x4bd947){const _0x1ed294=_0x488928;this['_itemChoiceVariableId']=_0x1b34f6,this[_0x1ed294(0x2d6)]=_0x1ed294(0x2cb),this[_0x1ed294(0x29b)]=_0x28ef6e,this[_0x1ed294(0x1df)]=_0x4bd947;},Game_Message[_0x488928(0x2fa)]['itemChoiceActorId']=function(){const _0x3a9ad9=_0x488928;return this[_0x3a9ad9(0x29b)]||0x0;},Game_Message[_0x488928(0x2fa)][_0x488928(0x3fc)]=function(){const _0x1ee217=_0x488928;return $gameActors[_0x1ee217(0x334)](this[_0x1ee217(0x286)]())||$gameParty['leader']()||null;},Game_Message[_0x488928(0x2fa)][_0x488928(0x35f)]=function(){return this['_itemChoiceStypeId']||0x0;},VisuMZ[_0x488928(0x44d)]['Game_Screen_clearPictures']=Game_Screen[_0x488928(0x2fa)]['clearPictures'],Game_Screen[_0x488928(0x2fa)][_0x488928(0x301)]=function(){const _0xafdc24=_0x488928;VisuMZ[_0xafdc24(0x44d)][_0xafdc24(0x3d4)][_0xafdc24(0x2ed)](this),this[_0xafdc24(0x36b)]();},Game_Screen[_0x488928(0x2fa)][_0x488928(0x36b)]=function(){this['_pictureText']=[],this['_pictureTextBuffer']=[],this['_pictureTextRefresh']=[];},Game_Screen[_0x488928(0x2fa)][_0x488928(0x247)]=function(_0x29422f){const _0x1f8b09=_0x488928;if(this[_0x1f8b09(0x4a4)]===undefined)this[_0x1f8b09(0x36b)]();const _0x52b91e=this[_0x1f8b09(0x461)](_0x29422f);return this[_0x1f8b09(0x4a4)][_0x52b91e]=this[_0x1f8b09(0x4a4)][_0x52b91e]||{},this[_0x1f8b09(0x4a4)][_0x52b91e];},Game_Screen[_0x488928(0x2fa)][_0x488928(0x3e4)]=function(_0x2c585e,_0x3115cc){const _0x5e6bef=_0x488928;return _0x3115cc=_0x3115cc[_0x5e6bef(0x246)]()[_0x5e6bef(0x1fe)](),this['getPictureTextData'](_0x2c585e)[_0x3115cc]||'';},Game_Screen[_0x488928(0x2fa)][_0x488928(0x3b2)]=function(_0x1ccaa5,_0x5cb506,_0x726628){const _0x565fe3=_0x488928;_0x726628=_0x726628[_0x565fe3(0x246)]()[_0x565fe3(0x1fe)](),this[_0x565fe3(0x247)](_0x1ccaa5)[_0x726628]=_0x5cb506||'',this[_0x565fe3(0x385)](_0x1ccaa5,!![]);},Game_Screen[_0x488928(0x2fa)][_0x488928(0x4a1)]=function(_0x1bdc0c){const _0x32b681=_0x488928;if(this[_0x32b681(0x4a4)]===undefined)this[_0x32b681(0x36b)]();const _0x46d38a=this[_0x32b681(0x461)](_0x1bdc0c);this[_0x32b681(0x4a4)][_0x46d38a]=null,this['requestPictureTextRefresh'](_0x1bdc0c,!![]);},Game_Screen['prototype'][_0x488928(0x324)]=function(_0x3e2dc7){const _0x5db525=_0x488928;if(this[_0x5db525(0x4a4)]===undefined)this[_0x5db525(0x36b)]();const _0x426d98=this[_0x5db525(0x461)](_0x3e2dc7);return this[_0x5db525(0x2b1)][_0x426d98]||0x0;},Game_Screen[_0x488928(0x2fa)][_0x488928(0x49f)]=function(_0x457367,_0x2aae4c){const _0xafa23f=_0x488928;if(this[_0xafa23f(0x4a4)]===undefined)this[_0xafa23f(0x36b)]();const _0x2f21a2=this[_0xafa23f(0x461)](_0x457367);this[_0xafa23f(0x2b1)][_0x2f21a2]=Math['max'](0x0,_0x2aae4c);},Game_Screen[_0x488928(0x2fa)][_0x488928(0x1e0)]=function(_0x499d6c){const _0x107171=_0x488928;if(this['_pictureText']===undefined)this[_0x107171(0x36b)]();const _0x409879=this[_0x107171(0x461)](_0x499d6c);this[_0x107171(0x2b1)][_0x409879]=undefined;},VisuMZ[_0x488928(0x44d)]['Game_Screen_erasePicture']=Game_Screen[_0x488928(0x2fa)][_0x488928(0x416)],Game_Screen[_0x488928(0x2fa)][_0x488928(0x416)]=function(_0x281a08){const _0x18713b=_0x488928;VisuMZ[_0x18713b(0x44d)][_0x18713b(0x241)][_0x18713b(0x2ed)](this,_0x281a08),this[_0x18713b(0x4a1)](_0x281a08),this['erasePictureTextBuffer'](_0x281a08),this[_0x18713b(0x385)](_0x281a08,!![]);},Game_Screen[_0x488928(0x2fa)][_0x488928(0x3d7)]=function(){const _0x11189f=_0x488928;for(const _0x7d5187 of this[_0x11189f(0x494)]){if(_0x7d5187){let _0x2550ec=this[_0x11189f(0x494)]['indexOf'](_0x7d5187);this[_0x11189f(0x385)](_0x2550ec);}}},Game_Screen[_0x488928(0x2fa)][_0x488928(0x385)]=function(_0x114210,_0x24eb3f){const _0x108787=_0x488928;this[_0x108787(0x376)]=this[_0x108787(0x376)]||[],(this[_0x108787(0x35b)](_0x114210)||_0x24eb3f)&&this[_0x108787(0x376)][_0x108787(0x206)](_0x114210);},Game_Screen[_0x488928(0x2fa)][_0x488928(0x348)]=function(_0x10e8a4){const _0x3cfb37=_0x488928;return this[_0x3cfb37(0x376)]=this[_0x3cfb37(0x376)]||[],this[_0x3cfb37(0x376)]['includes'](_0x10e8a4);},Game_Screen[_0x488928(0x2fa)]['clearPictureTextRefresh']=function(_0x4177c0){const _0x5dbc9d=_0x488928;this[_0x5dbc9d(0x376)]=this[_0x5dbc9d(0x376)]||[],this['_pictureTextRefresh']['remove'](_0x4177c0);},Game_Screen[_0x488928(0x2fa)][_0x488928(0x35b)]=function(_0x10d236){const _0x584f2a=_0x488928,_0x1104e8=[_0x584f2a(0x284),'up','upperright',_0x584f2a(0x3de),_0x584f2a(0x496),_0x584f2a(0x3b7),'lowerleft',_0x584f2a(0x482),_0x584f2a(0x26f)];return _0x1104e8[_0x584f2a(0x2a0)](_0x83cd73=>this['getPictureText'](_0x10d236,_0x83cd73)!=='');},VisuMZ[_0x488928(0x44d)][_0x488928(0x268)]=Game_Party[_0x488928(0x2fa)][_0x488928(0x2bf)],Game_Party[_0x488928(0x2fa)][_0x488928(0x2bf)]=function(){const _0x48811c=_0x488928;VisuMZ[_0x48811c(0x44d)]['Game_Party_initialize'][_0x48811c(0x2ed)](this),this[_0x48811c(0x3ce)]();},Game_Party[_0x488928(0x2fa)][_0x488928(0x3ce)]=function(){const _0x4be5b4=_0x488928;this[_0x4be5b4(0x216)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x488928(0x2fa)]['getLastGainedItemData']=function(){const _0x28f84e=_0x488928;if(this[_0x28f84e(0x216)]===undefined)this[_0x28f84e(0x3ce)]();return this['_lastGainedItemData'];},Game_Party['prototype'][_0x488928(0x3e0)]=function(_0x1e95de,_0x57ff73){const _0x5d92af=_0x488928;if(this['_lastGainedItemData']===undefined)this[_0x5d92af(0x3ce)]();if(!_0x1e95de)return;if(DataManager['isItem'](_0x1e95de))this[_0x5d92af(0x216)][_0x5d92af(0x46e)]=0x0;else{if(DataManager[_0x5d92af(0x3fe)](_0x1e95de))this[_0x5d92af(0x216)][_0x5d92af(0x46e)]=0x1;else DataManager['isArmor'](_0x1e95de)&&(this['_lastGainedItemData'][_0x5d92af(0x46e)]=0x2);}this[_0x5d92af(0x216)]['id']=_0x1e95de['id'],this['_lastGainedItemData']['quantity']=_0x57ff73;},VisuMZ[_0x488928(0x44d)][_0x488928(0x314)]=Game_Party[_0x488928(0x2fa)][_0x488928(0x31b)],Game_Party['prototype'][_0x488928(0x31b)]=function(_0x1bf144,_0xe9a665,_0x11533d){const _0x29a867=_0x488928;VisuMZ['MessageCore'][_0x29a867(0x314)]['call'](this,_0x1bf144,_0xe9a665,_0x11533d),_0xe9a665>0x0&&this[_0x29a867(0x3e0)](_0x1bf144,_0xe9a665);},VisuMZ['MessageCore'][_0x488928(0x295)]=Game_Map[_0x488928(0x2fa)][_0x488928(0x2bf)],Game_Map[_0x488928(0x2fa)]['initialize']=function(){const _0xb5f26b=_0x488928;VisuMZ['MessageCore']['Game_Map_initialize'][_0xb5f26b(0x2ed)](this),this[_0xb5f26b(0x24a)]=[];},VisuMZ[_0x488928(0x44d)]['Game_Map_setupEvents']=Game_Map[_0x488928(0x2fa)][_0x488928(0x220)],Game_Map['prototype']['setupEvents']=function(){const _0x5c6262=_0x488928;VisuMZ[_0x5c6262(0x44d)][_0x5c6262(0x462)][_0x5c6262(0x2ed)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x488928(0x44d)][_0x488928(0x2b3)]=Game_Map['prototype'][_0x488928(0x427)],Game_Map['prototype']['updateEvents']=function(){const _0x465fc9=_0x488928;VisuMZ[_0x465fc9(0x44d)]['Game_Map_updateEvents'][_0x465fc9(0x2ed)](this),this['updateMessageCommonEvents']();},Game_Map[_0x488928(0x2fa)][_0x488928(0x3fb)]=function(_0x16bf9e){const _0x34d156=_0x488928;if(!$dataCommonEvents[_0x16bf9e])return;this['_messageCommonEvents']=this[_0x34d156(0x24a)]||[];const _0xbb4822=this[_0x34d156(0x252)][_0x34d156(0x25e)],_0x1b6a6e=new Game_MessageCommonEvent(_0x16bf9e,_0xbb4822);this[_0x34d156(0x24a)][_0x34d156(0x206)](_0x1b6a6e);},Game_Map[_0x488928(0x2fa)][_0x488928(0x26a)]=function(){const _0x598b24=_0x488928;this[_0x598b24(0x24a)]=this[_0x598b24(0x24a)]||[];for(const _0x3c52a2 of this[_0x598b24(0x24a)]){!_0x3c52a2[_0x598b24(0x252)]?this['_messageCommonEvents'][_0x598b24(0x341)](_0x3c52a2):_0x3c52a2[_0x598b24(0x2d8)]();}},VisuMZ[_0x488928(0x44d)]['Game_Map_refresh']=Game_Map[_0x488928(0x2fa)][_0x488928(0x39e)],Game_Map['prototype'][_0x488928(0x39e)]=function(){const _0x3d907a=_0x488928;VisuMZ[_0x3d907a(0x44d)]['Game_Map_refresh'][_0x3d907a(0x2ed)](this),$gameScreen[_0x3d907a(0x3d7)]();},Game_Interpreter[_0x488928(0x1e7)]=pluginData[_0x488928(0x31d)],Game_Interpreter['prototype']['command101']=function(_0x19f77d){const _0x1bd0df=_0x488928;if($gameMessage[_0x1bd0df(0x444)]())return![];return this[_0x1bd0df(0x484)](_0x19f77d),this['addContinuousShowTextCommands'](_0x19f77d),this[_0x1bd0df(0x411)](_0x19f77d),this[_0x1bd0df(0x401)](_0x1bd0df(0x28d)),!![];},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x484)]=function(_0x1c07d8){const _0x1c9b51=_0x488928;$gameMessage['setFaceImage'](_0x1c07d8[0x0],_0x1c07d8[0x1]),$gameMessage[_0x1c9b51(0x238)](_0x1c07d8[0x2]),$gameMessage[_0x1c9b51(0x360)](_0x1c07d8[0x3]),$gameMessage[_0x1c9b51(0x46c)](_0x1c07d8[0x4]);},Game_Interpreter[_0x488928(0x2fa)]['addContinuousShowTextCommands']=function(_0x587c2a){const _0x3f5629=_0x488928;while(this[_0x3f5629(0x2f8)]()){this[_0x3f5629(0x3fa)]++;if(this[_0x3f5629(0x441)]()['code']===0x191){let _0x324e26=this['currentCommand']()[_0x3f5629(0x379)][0x0];_0x324e26=VisuMZ[_0x3f5629(0x44d)][_0x3f5629(0x320)](_0x324e26),$gameMessage[_0x3f5629(0x4a7)](_0x324e26);}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter[_0x488928(0x2fa)]['isContinuePrepareShowTextCommands']=function(){const _0x2d533a=_0x488928;return this[_0x2d533a(0x335)]()===0x65&&$gameSystem[_0x2d533a(0x346)]()>0x4?!![]:this[_0x2d533a(0x335)]()===0x191;},VisuMZ[_0x488928(0x44d)][_0x488928(0x320)]=function(_0x5db0ca){const _0x4ea9cd=_0x488928;return _0x5db0ca=_0x5db0ca['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x5db0ca=_0x5db0ca[_0x4ea9cd(0x329)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0xa9ed15,_0x3475f0)=>this[_0x4ea9cd(0x274)](_0x3475f0)),_0x5db0ca;},VisuMZ['MessageCore'][_0x488928(0x274)]=function(_0x36d786){const _0x3cefd3=_0x488928,_0x5f2887=_0x36d786[_0x3cefd3(0x471)]('|')['map'](_0x4e2c54=>_0x4e2c54[_0x3cefd3(0x1fe)]())[_0x3cefd3(0x341)]('')['remove'](null);return _0x5f2887[Math[_0x3cefd3(0x31e)](_0x5f2887['length'])];},Game_Interpreter['prototype'][_0x488928(0x345)]=function(){const _0x5c9083=_0x488928;if(this[_0x5c9083(0x441)]()&&this['currentCommand']()[_0x5c9083(0x379)][0x0][_0x5c9083(0x337)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x5c9083(0x34f)][_0x5c9083(0x476)]>=$gameSystem[_0x5c9083(0x346)]()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x411)]=function(_0x552a11){const _0x417cb8=_0x488928;switch(this[_0x417cb8(0x335)]()){case 0x66:this[_0x417cb8(0x3fa)]++,this[_0x417cb8(0x48f)](this[_0x417cb8(0x441)]()['parameters']);break;case 0x67:this[_0x417cb8(0x3fa)]++,this['setupNumInput'](this['currentCommand']()[_0x417cb8(0x379)]);break;case 0x68:this['_index']++,this[_0x417cb8(0x402)](this[_0x417cb8(0x441)]()['parameters']);break;case 0x165:const _0x5e412e=this[_0x417cb8(0x293)][this[_0x417cb8(0x3fa)]+0x1],_0x2edad6=_0x5e412e[_0x417cb8(0x379)];_0x2edad6[0x0]===Game_Interpreter['MESSAGE_CORE_PLUGIN_NAME']&&this['prepareShowTextPluginCommandFollowups'](_0x2edad6);break;}},VisuMZ[_0x488928(0x44d)][_0x488928(0x3a6)]=Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x48f)],Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x48f)]=function(_0x246139){const _0x12eee9=_0x488928;_0x246139=this[_0x12eee9(0x3ff)](),VisuMZ[_0x12eee9(0x44d)][_0x12eee9(0x3a6)][_0x12eee9(0x2ed)](this,_0x246139);},Game_Interpreter['prototype']['addContinuousShowChoices']=function(){const _0x1e1006=_0x488928,_0x526991=this['_index'],_0x565eb4=[];let _0xabc559=0x0;this[_0x1e1006(0x3fa)]++;while(this[_0x1e1006(0x3fa)]<this[_0x1e1006(0x293)][_0x1e1006(0x476)]){if(this[_0x1e1006(0x441)]()['indent']===this['_indent']){if(this[_0x1e1006(0x441)]()[_0x1e1006(0x1f7)]===0x194&&this[_0x1e1006(0x335)]()!==0x66)break;else{if(this[_0x1e1006(0x441)]()[_0x1e1006(0x1f7)]===0x66)this[_0x1e1006(0x3cd)](_0xabc559,this[_0x1e1006(0x441)](),_0x526991),this[_0x1e1006(0x3fa)]-=0x2;else this['currentCommand']()[_0x1e1006(0x1f7)]===0x192&&(this[_0x1e1006(0x441)]()[_0x1e1006(0x379)][0x0]=_0xabc559,_0xabc559++);}}this[_0x1e1006(0x3fa)]++;}return this[_0x1e1006(0x3fa)]=_0x526991,this[_0x1e1006(0x441)]()['parameters'];},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x3cd)]=function(_0x4fe406,_0x25364f,_0x4319d5){const _0x30be13=_0x488928;this[_0x30be13(0x24e)](_0x4fe406,_0x25364f,_0x4319d5),this[_0x30be13(0x3e9)](_0x4fe406,_0x25364f,_0x4319d5),this[_0x30be13(0x205)](_0x25364f,_0x4319d5);},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x24e)]=function(_0x1814bf,_0x1a993c,_0x3cfc65){const _0x40e67c=_0x488928;if(_0x1a993c[_0x40e67c(0x379)][0x2]<0x0)return;const _0x40a51b=_0x1a993c['parameters'][0x2]+_0x1814bf;this[_0x40e67c(0x293)][_0x3cfc65][_0x40e67c(0x379)][0x2]=_0x40a51b;},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x3e9)]=function(_0x9293d2,_0xd89213,_0x2c2270){const _0x46c1c2=_0x488928;if(_0xd89213['parameters'][0x1]>=0x0){var _0x47eb85=_0xd89213[_0x46c1c2(0x379)][0x1]+_0x9293d2;this[_0x46c1c2(0x293)][_0x2c2270]['parameters'][0x1]=_0x47eb85;}else _0xd89213[_0x46c1c2(0x379)][0x1]===-0x2&&(this[_0x46c1c2(0x293)][_0x2c2270][_0x46c1c2(0x379)][0x1]=_0xd89213[_0x46c1c2(0x379)][0x1]);},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x205)]=function(_0x333d70,_0x1fff4e){const _0x3c3fdd=_0x488928;for(const _0x106bf of _0x333d70[_0x3c3fdd(0x379)][0x0]){this['_list'][_0x1fff4e][_0x3c3fdd(0x379)][0x0][_0x3c3fdd(0x206)](_0x106bf);}this[_0x3c3fdd(0x293)][_0x3c3fdd(0x367)](this[_0x3c3fdd(0x3fa)]-0x1,0x2);},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x383)]=function(_0x101f9a){const _0xa7b6c0=_0x488928,_0x125139=_0x101f9a[0x1];if(_0x125139===_0xa7b6c0(0x3e1))this[_0xa7b6c0(0x3fa)]++,this[_0xa7b6c0(0x20e)](_0x101f9a);else{if(_0x125139===_0xa7b6c0(0x1f5))this[_0xa7b6c0(0x3fa)]++,this['setArmorChoice'](_0x101f9a);else _0x125139===_0xa7b6c0(0x316)&&Imported[_0xa7b6c0(0x421)]&&(this[_0xa7b6c0(0x3fa)]++,this[_0xa7b6c0(0x243)](_0x101f9a));}},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x20e)]=function(_0x5bad77){const _0x571733=_0x488928,_0x22176b=JSON[_0x571733(0x2be)](JSON[_0x571733(0x219)](_0x5bad77[0x3]));VisuMZ[_0x571733(0x391)](_0x22176b,_0x22176b),$gameMessage[_0x571733(0x20e)](_0x22176b[_0x571733(0x27e)]||0x0,_0x22176b[_0x571733(0x207)]||0x0);},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x3f0)]=function(_0x32909e){const _0x2dc9c0=_0x488928,_0x103e0c=JSON[_0x2dc9c0(0x2be)](JSON[_0x2dc9c0(0x219)](_0x32909e[0x3]));VisuMZ[_0x2dc9c0(0x391)](_0x103e0c,_0x103e0c),$gameMessage[_0x2dc9c0(0x3f0)](_0x103e0c[_0x2dc9c0(0x27e)]||0x0,_0x103e0c[_0x2dc9c0(0x488)]||0x0,_0x103e0c['EquipTypeID']||0x0);},Game_Interpreter[_0x488928(0x2fa)][_0x488928(0x243)]=function(_0x23bd79){const _0xae31e1=_0x488928,_0x42f7f9=JSON[_0xae31e1(0x2be)](JSON['stringify'](_0x23bd79[0x3]));VisuMZ['ConvertParams'](_0x42f7f9,_0x42f7f9),$gameMessage[_0xae31e1(0x243)](_0x42f7f9['VariableID']||0x0,_0x42f7f9[_0xae31e1(0x3df)]||0x0,_0x42f7f9[_0xae31e1(0x3f6)]||0x0);};function _0x3d6e(){const _0x3f61e1=['Window_Message_newPage','ParseAddedText','itemBackColor2','toUpperCase','isTriggered','getPictureTextBuffer','MessageTextDelay','isVolumeSymbol','refreshDimmerBitmap','#fff799','replace','clearRect','processActorNameAutoColorChanges','clearActorNameAutoColor','min','textSpeed','_messageOffsetY','resetPositionX','getColor','setMessageWindowWordWrap','updateOverlappingY','actor','nextEventCode','clearFlags','match','isSceneMap','processNewLine','messageCoreTextSpeed','choices','process_VisuMZ_MessageCore_TextCodes_Replace','_moveEasingType','drawPictureTextZone','Match','ParseStateNotetags','remove','TextColor%1','getStartingChoiceWidth','<%1>','isBreakShowTextCommands','getMessageWindowRows','_currentAutoSize','needsPictureTextRefresh','_moveTargetWidth','OffsetX','_subject','lineHeight','unshift','updateNameBoxMove','_texts','textSizeExWordWrap','defaultColor','updateMove','processPreviousColor','8658ZLkZjE','visible','return\x200','open','getPreservedFontSettings','isSceneBattle','PictureIDs','hasPictureText','#ffffff','\x1bWrapBreak[0]','actorName','itemChoiceStypeId','setPositionType','_textColorStack','onNewPageMessageCore','Default','updateXyOffsets','itemRect','ARRAYFUNC','splice','pink','join','isWordWrapEnabled','clearAllPictureTexts','_wordWrap','gray','messageCoreWindowX','innerHeight','upperright','prepareAutoSizeEscapeCharacters','</B>','outputHeight','follower','contents','_pictureTextRefresh','Skills','_lastPluginCommandInterpreter','parameters','textCodeCheck','isChoiceWindow','changeValue','windowX','obtainExp','#ffc8e0','ParseSkillNotetags','updateRelativePosition','move','prepareShowTextPluginCommandFollowups','followers','requestPictureTextRefresh','createPictureText','STR','index','faceWidth','SortObjectByKeyLength','parseChoiceText','Scene_Message_createChoiceListWindow','_macroBypassWordWrap','isCommandEnabled','convertMessageCoreEscapeReplacements','EndPadding','ConvertParams','addMessageCoreTextSpeedCommand','ConfigManager_makeData','maxLines','Window_Message_isTriggered','processTextAlignmentChange','onChoice','_commonEventId','#6dcff6','white','5446368RpBSYi','Sprite_Picture_updateBitmap','_relativePosition','refresh','registerCommand','databaseObjectName','changeVolume','MsgWindowOffsetX','atypeId','\x1bTEXTALIGNMENT[2]','synchronizeNameBox','Game_Interpreter_setupChoices','itemBackColor1','_messagePositionReset','onProcessCharacter','contentsBack','Window_Base_changeTextColor','isAutoColorAffected','processPxTextCode','\x1bCOLORLOCK[1]','maxCommands','processTextAlignmentX','ARRAYSTR','setPictureText','<WORDWRAP>','messagePositionReset','lastGainedObjectQuantity','_messageOffsetX','right','FontSmallerCap','calcMoveEasing','start','</CENTER>','_resetRect','updateAutoPosition','slice','ParseEnemyNotetags','#c69c6d','initTextAlignement','makeDeepCopy','_action','(((','_autoSizeRegexp','makeCommandList','padding','Window_Message_needsNewPage','createContents','</LEFT>','anchorPictureText','processAllText','adjustShowChoiceExtension','initMessageCore','registerResetRect','autoPositionOffsetY','moveBy','canMove','applyData','Game_Screen_clearPictures','processFontChangeItalic','event','requestPictureTextRefreshAll','_dimmerSprite','anchor','ARRAYNUM','selectDefault','getSkillTypes','Window_Message_processEscapeCharacter','left','ActorID','setLastGainedItemData','SelectWeapon','isRTL','Sprite_Picture_update','getPictureText','_forcedPosition','\x1bTEXTALIGNMENT[1]','TextJS','setChoiceListTextAlign','adjustShowChoiceCancel','setColorLock','setWordWrap','VisuMZ_0_CoreEngine','mainFontFace','_targets','ConvertTextAutoColorRegExpFriendly','setArmorChoice','textColor','TextStr','createTextState','Type','#707070','SkillTypeID','AutoColor','lastGainedObjectName','dimColor2','_index','addMessageCommonEvent','itemChoiceActor','itemChoiceItypeId','isWeapon','addContinuousShowChoices','getChoiceListLineHeight','setWaitMode','setupItemChoice','getLastPluginCommandInterpreter','ParseAllNotetags','updateOffsetPosition','calcWindowHeight','getTextAlignment','lowerleft','ARRAYSTRUCT','TextAlign','_target','Game_Interpreter_PluginCommand','hide','postFlushTextState','CreateAutoColorRegExpListEntries','4875xBpqpD','prepareShowTextFollowups','registerSelfEvent','processFsTextCode','StretchDimmedBg','_helpWindow','erasePicture','#f26c4f','easeInOut','fontBold','red','startX','Window_NameBox_updatePlacement','processAutoColorWords','textSpeedStatusText','TextCodeActions','textWidth','VisuMZ_1_SkillsStatesCore','description','\x1bCOLORLOCK[0]','_wholeMoveDuration','General','launchMessageCommonEvent','updateEvents','outlineWidth','default','WORD_WRAP_PADDING','battle\x20party','drawBackCenteredPicture','DefaultOutlineWidth','#a186be','width','AddAutoColor','process_VisuMZ_MessageCore_AutoColor','PictureTextRefresh','indexOf','_moveDuration','Window_Base_initialize','MessageWindow','paintOpacity','NameBoxWindowOffsetX','true','drawBackPicture','ARRAYEVAL','faceName','processEscapeCharacter','normalColor','convertNewPageTextStateMacros','Width','currentCommand','quantity','PICTURE','isBusy','<RIGHT>','Settings','TextMacros','processControlCharacter','updatePlacement','_refreshPauseSign','7244279wJmhne','MessageWindowProperties','MessageCore','_pictureId','setRelativePosition','currentExt','</RIGHT>','brown','processDrawPicture','filter','partyMemberName','_choiceListHelpWindow','battle\x20actor','RelativePXPY','version','convertBaseEscapeCharacters','shift','battleTargetName','gradientFillRect','TextColor','getMessageWindowWidth','CENTERPICTURE','realPictureId','Game_Map_setupEvents','makeFontSmaller','createChoiceListHelpWindow','helpWordWrap','getConfigValue','LineBreakSpace','convertButtonAssistText','test','resetTextColor','_moveTargetY','setSpeakerName','choiceCols','type','_autoColorActorNames','mainFontSize','split','itemChoiceEtypeId','getChoiceListMaxColumns','itemHeight','choice','length','registerActorNameAutoColorChanges','getChoiceListMaxRows','Window_Base_processEscapeCharacter','ceil','getChoiceListTextAlign','\x1bI[%1]','messageRows','WordWrap','obtainItem','obtainEscapeString','battle\x20enemy','down','convertEscapeCharacters','prepareShowTextCommand','pagedown','getMessageWindowXyOffsets','NUM','ArmorTypeID','TightWrap','drawItem','menu','Window_Message_synchronizeNameBox','</WORDWRAP>','victory','setupChoices','updateDimensions','_cancelButton','newPage','TextManager_message','_pictures','Window_ChoiceList_updatePlacement','center','14548210DtcrKG','attachPictureText','weapon','updateBackground','304743mDiyFS','\x1bITALIC[1]','resetRect','Weapons','setPictureTextBuffer','contentsHeight','eraseAllPictureTexts','fontSize','preemptive','_pictureText','startY','Window_NameBox_refresh','add','round','_colorLock','isChoiceVisible','Armors','postConvertEscapeCharacters','ENABLE','powerUpColor','members','isHelpWindowWordWrap','convertShowChoiceEscapeCodes','_pictureTextWidth','\x1bi[%1]%2','floor','isSkill','CreateAutoColorFor','setHelpWindow','Window_ChoiceList_windowX','Window_Base_textSizeEx','wtypeId','AddOption','drawItemNumber','preFlushTextState','Window_Help_refresh','#7cc576','prepareForcedPositionEscapeCharacters','ParseWeaponNotetags','JSON','\x1bTEXTALIGNMENT[3]','_itemChoiceStypeId','erasePictureTextBuffer','returnPreservedFontSettings','TEXTALIGNMENT','innerWidth','DISABLE','convertFontSettingsEscapeCharacters','_moveTargetHeight','MESSAGE_CORE_PLUGIN_NAME','_pictureTextWindow','exec','WAIT','false','\x1bTEXTALIGNMENT[0]','addLoadListener','choiceListHelpWindowRect','isPressed','<LINE\x20BREAK>','none','obtainEscapeParam','callCancelHandler','setTextDelay','SelectArmor','currencyUnit','code','\x5c%1','convertVariableEscapeCharacters','surprise','ANY','exit','resetWordWrap','trim','stretchDimmerSprite','height','makeFontBigger','fontFace','convertTextMacros','numVisibleRows','addExtraShowChoices','push','WeaponTypeID','Classes','applyMoveEasing','_autoSizeCheck','setMessageWindowRows','Window_Base_processControlCharacter','[0]','setWeaponChoice','FUNC','Scene_Options_maxCommands','etypeId','process_VisuMZ_MessageCore_TextCodes_Action','powerDownColor','processFontChangeBold','TextCodeReplace','_lastGainedItemData','convertMessageCoreEscapeActions','constructor','stringify',')))','_textDelayCount','ChoiceWindowMaxRows','processMessageCoreEscapeActions','max','process_VisuMZ_MessageCore_TextMacros','setupEvents','processAutoPosition','systemColor','VisuMZ_1_EventsMoveCore','findTargetSprite','setChoiceListLineHeight','Window_Base_update','isMessageWindowWordWrap','_textMacroFound','rtl','States','resizePictureText','_pictureTextCache','processAutoSize','iconIndex','EVAL','system','drawing','outputWidth','getChoiceIndent','clamp','ActionJS','Undefined','TextSpeed','setBackground','makeSkillList','includes','messageWidth','textCodeResult','command357','#acacac','processCustomWait','orange','Game_Screen_erasePicture','processCommonEvent','setSkillChoice','NameBoxWindowDefaultColor','483518RajHLz','toLowerCase','getPictureTextData','boxHeight','SHOW','_messageCommonEvents','convertTextAlignmentEscapeCharacters','ConfigManager_applyData','map\x20player','adjustShowChoiceDefault','HIDE','autoPositionOffsetX','getLastGainedItemData','_interpreter','bitmap','itemPadding','textSizeExRaw','makeData','PREVCOLOR','updateForcedPlacement','BOLD','levelUp','_textDelay','\x1bC[%1]%2\x1bPREVCOLOR[0]','substring','_eventId','setTextAlignment','inBattle','fontItalic','AutoColorRegExp','_itemChoiceWtypeId','isArmor','updatePictureText','messageWordWrap','blt','Game_Party_initialize','choiceTextAlign','updateMessageCommonEvents','addedHeight','return\x20\x27','AutoColorBypassList','boxWidth','lowerright','bind','Window_Options_changeVolume','cancel','ChoiceWindowProperties','getRandomTextFromPool','moveTo','drawSkillCost','createChoiceListWindow','applyChoiceHelpDescriptions','itemChoiceWtypeId','map','CreateAutoColorRegExpLists','Window_Message_terminateMessage','clear','VariableID','Window_ChoiceList_callCancelHandler','instantTextSpeed','Window_ItemList_drawItemNumber','Window_EventItem_includes','_showFast','upperleft','black','itemChoiceActorId','Scene_Boot_onDatabaseLoaded','convertBackslashCharacters','processStoredAutoColorChanges','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','<I>','processDrawCenteredPicture','message','<CENTER>','Window_Message_clearFlags','defeat','processColorLock','applyDatabaseAutoColor','_list','clearPictureTextRefresh','Game_Map_initialize','makeItemList','ChoiceWindowTextAlign','_centerMessageWindow','#fbaf5d','</I>','_itemChoiceActorId','map\x20actor','setMessageWindowWidth','maxCols','_itemChoiceEtypeId','some','textSizeEx','battleActionName','clearCommandList','setChoiceListMaxColumns','commandName','callOkHandler','convertButtonAssistEscapeCharacters','obtainGold','purple','isSkillHidden','changeTextSpeed','outlineColor','itemChoiceAtypeId','convertChoiceMacros','_scene','SWITCH','_pictureTextBuffer','terminateMessage','Game_Map_updateEvents','textSizeExTextAlignment','addMessageCoreCommands','list','clampPlacementPosition','processWrapBreak','_MessageCoreSettings','_choiceListWindow','placeCancelButton','addWindow','16OlzhHa','parse','initialize','updateChoiceListHelpWindowPlacement','ITALIC','changeTextColor','text','setChoiceListHelpWindow','ParseItemNotetags','processCharacter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_nameBoxWindow','drawTextEx','3330mwVoOm','skill','Game_System_initialize','32KRKZrd','clearChoiceHelpDescriptions','updateAutoSizePosition','itemRectWithPadding','ParseClassNotetags','setChoiceListMaxRows','onDatabaseLoaded','setText','_data','_itemChoiceItypeId','_choiceHelpDescriptions','update','Window_Message_updatePlacement','crisisColor','drawPictureText','loadPicture','flushTextState','Padding','prepareWordWrapEscapeCharacters','_moveTargetX','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ParseArmorNotetags','COMMONEVENT','NameBoxWindowOffsetY','MessageRows','Window_Options_isVolumeSymbol','convertLockColorsEscapeCharacters','preConvertEscapeCharacters','_itemChoiceAtypeId','skills','map\x20party','value','call','anyPictureTextChanges','_pictureTextHeight','map\x20event','ChoiceWindowLineHeight','commandSymbol','MessageWidth','_messageWindow','grey','Window_Base_processAllText','_autoPositionTarget','isContinuePrepareShowTextCommands','Window_Base_processNewLine','prototype','_pictureTextSprite','FontChangeValue','FontBiggerCap','yellow','EquipTypeID','choiceLineHeight','clearPictures','Enemies','MaxCols','format','choiceRows','close','windowWidth','setMessageWindowXyOffsets','SWITCHES','_spriteset','Actors','updateBitmap','addCommand','_autoPosRegExp','drawCustomBackgroundColor','pageup','addGeneralOptions','processPyTextCode','windowPadding','Game_Party_gainItem','isInputting','SelectSkill','item','easeOut','addWrapBreakAfterPunctuation','needsNewPage','gainItem','isColorLocked','name','randomInt'];_0x3d6e=function(){return _0x3f61e1;};return _0x3d6e();}function Game_MessageCommonEvent(){const _0x420840=_0x488928;this[_0x420840(0x2bf)](...arguments);}Game_MessageCommonEvent[_0x488928(0x2fa)][_0x488928(0x2bf)]=function(_0x1e20ab,_0x5cbc76){const _0x73ef16=_0x488928;this[_0x73ef16(0x398)]=_0x1e20ab,this[_0x73ef16(0x25e)]=_0x5cbc76||0x0,this[_0x73ef16(0x39e)]();},Game_MessageCommonEvent[_0x488928(0x2fa)][_0x488928(0x3d6)]=function(){const _0x590746=_0x488928;return $dataCommonEvents[this[_0x590746(0x398)]];},Game_MessageCommonEvent['prototype']['list']=function(){const _0x5eb5b7=_0x488928;return this[_0x5eb5b7(0x3d6)]()[_0x5eb5b7(0x2b6)];},Game_MessageCommonEvent[_0x488928(0x2fa)][_0x488928(0x39e)]=function(){const _0x145cb7=_0x488928;this['_interpreter']=new Game_Interpreter(),this[_0x145cb7(0x252)]['setup'](this[_0x145cb7(0x2b6)](),this['_eventId']);},Game_MessageCommonEvent[_0x488928(0x2fa)][_0x488928(0x2d8)]=function(){const _0x3e9417=_0x488928;this['_interpreter']&&(this['_interpreter']['isRunning']()?this[_0x3e9417(0x252)][_0x3e9417(0x2d8)]():this[_0x3e9417(0x27d)]());},Game_MessageCommonEvent[_0x488928(0x2fa)][_0x488928(0x27d)]=function(){this['_interpreter']=null;},Scene_Message['prototype']['messageWindowRect']=function(){const _0x20d662=_0x488928,_0x896a3c=Math[_0x20d662(0x32d)](Graphics[_0x20d662(0x42f)],$gameSystem[_0x20d662(0x45f)]()),_0x51472a=$gameSystem[_0x20d662(0x346)](),_0x3a199d=this['calcWindowHeight'](_0x51472a,![]),_0x24b0b2=(Graphics[_0x20d662(0x26e)]-_0x896a3c)/0x2,_0x310bd4=0x0;return new Rectangle(_0x24b0b2,_0x310bd4,_0x896a3c,_0x3a199d);},VisuMZ['MessageCore']['Scene_Message_createChoiceListWindow']=Scene_Message[_0x488928(0x2fa)][_0x488928(0x277)],Scene_Message[_0x488928(0x2fa)]['createChoiceListWindow']=function(){const _0xf28ee1=_0x488928;VisuMZ['MessageCore'][_0xf28ee1(0x38c)][_0xf28ee1(0x2ed)](this),this[_0xf28ee1(0x464)]();},Scene_Message[_0x488928(0x2fa)]['createChoiceListHelpWindow']=function(){const _0x3cbde=_0x488928,_0x5bb0e4=this['choiceListHelpWindowRect'](),_0x36d86e=new Window_Help(_0x5bb0e4);_0x36d86e[_0x3cbde(0x40d)](),this[_0x3cbde(0x2ba)][_0x3cbde(0x1d2)](_0x36d86e),this[_0x3cbde(0x2f4)][_0x3cbde(0x2c4)](_0x36d86e),this[_0x3cbde(0x2bc)](_0x36d86e),this[_0x3cbde(0x456)]=_0x36d86e;},Scene_Message[_0x488928(0x2fa)][_0x488928(0x1ee)]=function(){const _0x498505=_0x488928,_0x3865d3=0x0,_0x48cfbc=0x0,_0x404df2=Graphics[_0x498505(0x26e)],_0x505059=this[_0x498505(0x406)](0x2,![]);return new Rectangle(_0x3865d3,_0x48cfbc,_0x404df2,_0x505059);},Window_Message['prototype']['setChoiceListHelpWindow']=function(_0x49e6ee){this['_choiceListHelpWindow']=_0x49e6ee;},Window_Message[_0x488928(0x2fa)][_0x488928(0x2c0)]=function(){const _0x2e635e=_0x488928;if(!this[_0x2e635e(0x456)])return;const _0x31ea62=this[_0x2e635e(0x456)];_0x31ea62&&(_0x31ea62['y']=this['y']>0x0?0x0:Graphics[_0x2e635e(0x248)]-_0x31ea62[_0x2e635e(0x200)]);},VisuMZ[_0x488928(0x44d)][_0x488928(0x210)]=Scene_Options[_0x488928(0x2fa)]['maxCommands'],Scene_Options[_0x488928(0x2fa)][_0x488928(0x3af)]=function(){const _0x50f1f1=_0x488928;let _0x35e70a=VisuMZ[_0x50f1f1(0x44d)][_0x50f1f1(0x210)]['call'](this);const _0x22b69d=VisuMZ[_0x50f1f1(0x44d)]['Settings'];if(_0x22b69d[_0x50f1f1(0x237)]['AddOption']&&_0x22b69d[_0x50f1f1(0x237)]['AdjustRect'])_0x35e70a++;return _0x35e70a;},VisuMZ[_0x488928(0x44d)][_0x488928(0x39c)]=Sprite_Picture[_0x488928(0x2fa)]['updateBitmap'],Sprite_Picture[_0x488928(0x2fa)][_0x488928(0x30c)]=function(){const _0x2cf1be=_0x488928;VisuMZ[_0x2cf1be(0x44d)][_0x2cf1be(0x39c)][_0x2cf1be(0x2ed)](this),this[_0x2cf1be(0x386)]();},VisuMZ[_0x488928(0x44d)][_0x488928(0x3e3)]=Sprite_Picture[_0x488928(0x2fa)][_0x488928(0x2d8)],Sprite_Picture['prototype']['update']=function(){const _0x14f40c=_0x488928;VisuMZ[_0x14f40c(0x44d)][_0x14f40c(0x3e3)][_0x14f40c(0x2ed)](this),this[_0x14f40c(0x265)]();},Sprite_Picture['prototype']['updatePictureText']=function(){const _0x20bf7b=_0x488928;if(!this[_0x20bf7b(0x355)])return;this[_0x20bf7b(0x22b)](),this[_0x20bf7b(0x3cb)](),this[_0x20bf7b(0x2db)](),this[_0x20bf7b(0x498)]();},Sprite_Picture['prototype'][_0x488928(0x386)]=function(){const _0x2bd189=_0x488928;if(this['_pictureTextWindow'])return;if(this['_pictureTextSprite'])return;const _0x41de3c=new Rectangle(0x0,0x0,0x0,0x0);this[_0x2bd189(0x1e8)]=new Window_Base(_0x41de3c),this[_0x2bd189(0x1e8)][_0x2bd189(0x3c7)]=0x0,this['_pictureTextSprite']=new Sprite(),this['addChildAt'](this[_0x2bd189(0x2fb)],0x0),this[_0x2bd189(0x4b2)]=0x0,this[_0x2bd189(0x2ef)]=0x0,this['_pictureTextCache']={};},Sprite_Picture[_0x488928(0x2fa)][_0x488928(0x22b)]=function(){const _0x58a7fc=_0x488928;if(!this['_pictureTextWindow'])return;if(this[_0x58a7fc(0x4b2)]===this['width']&&this[_0x58a7fc(0x2ef)]===this[_0x58a7fc(0x200)])return;this[_0x58a7fc(0x4b2)]=this[_0x58a7fc(0x42f)],this[_0x58a7fc(0x2ef)]=this[_0x58a7fc(0x200)],this[_0x58a7fc(0x22c)]={},this[_0x58a7fc(0x1e8)][_0x58a7fc(0x382)](0x0,0x0,this[_0x58a7fc(0x42f)],this[_0x58a7fc(0x200)]);},Sprite_Picture[_0x488928(0x2fa)]['anchorPictureText']=function(){const _0x5b48b5=_0x488928;if(!this[_0x5b48b5(0x2fb)])return;this[_0x5b48b5(0x2fb)]['anchor']['x']=this[_0x5b48b5(0x3d9)]['x'],this[_0x5b48b5(0x2fb)][_0x5b48b5(0x3d9)]['y']=this[_0x5b48b5(0x3d9)]['y'];},Sprite_Picture[_0x488928(0x2fa)][_0x488928(0x2db)]=function(){const _0x5e4e3c=_0x488928;if(!this[_0x5e4e3c(0x1e8)])return;if(!this[_0x5e4e3c(0x2ee)]())return;const _0x2a9a21=['upperleft','up',_0x5e4e3c(0x370),_0x5e4e3c(0x3de),_0x5e4e3c(0x496),'right',_0x5e4e3c(0x408),_0x5e4e3c(0x482),_0x5e4e3c(0x26f)];this[_0x5e4e3c(0x1e8)][_0x5e4e3c(0x3c9)]();for(const _0x4adbd2 of _0x2a9a21){this[_0x5e4e3c(0x33e)](_0x4adbd2);}},Sprite_Picture[_0x488928(0x2fa)][_0x488928(0x2ee)]=function(){const _0xc10151=_0x488928;if($gameScreen[_0xc10151(0x348)](this[_0xc10151(0x44e)]))return!![];const _0x207a2e=['upperleft','up',_0xc10151(0x370),_0xc10151(0x3de),'center',_0xc10151(0x3b7),_0xc10151(0x408),_0xc10151(0x482),_0xc10151(0x26f)];for(const _0x22490d of _0x207a2e){const _0x5688df=$gameScreen[_0xc10151(0x3e4)](this['_pictureId'],_0x22490d);if(this[_0xc10151(0x22c)][_0x22490d]===_0x5688df)continue;return!![];}return![];},Sprite_Picture[_0x488928(0x2fa)][_0x488928(0x33e)]=function(_0x2785f8){const _0x596b39=_0x488928;$gameScreen[_0x596b39(0x294)](this[_0x596b39(0x44e)]);const _0x53fb8c=$gameScreen[_0x596b39(0x3e4)](this[_0x596b39(0x44e)],_0x2785f8);this[_0x596b39(0x22c)][_0x2785f8]=_0x53fb8c;const _0x14ae6e=this[_0x596b39(0x1e8)]['textSizeEx'](_0x53fb8c);let _0x3567dc=$gameScreen[_0x596b39(0x324)](this['_pictureId']),_0x25b06f=_0x3567dc,_0x1650c0=_0x3567dc;if(['up','center','down'][_0x596b39(0x23a)](_0x2785f8))_0x25b06f=Math[_0x596b39(0x4b4)]((this[_0x596b39(0x42f)]-_0x14ae6e[_0x596b39(0x42f)])/0x2);else['upperright','right','lowerright'][_0x596b39(0x23a)](_0x2785f8)&&(_0x25b06f=Math[_0x596b39(0x4b4)](this['width']-_0x14ae6e[_0x596b39(0x42f)]-_0x3567dc));if([_0x596b39(0x3de),'center','right']['includes'](_0x2785f8))_0x1650c0=Math[_0x596b39(0x4b4)]((this[_0x596b39(0x200)]-_0x14ae6e[_0x596b39(0x200)])/0x2);else['lowerleft',_0x596b39(0x482),_0x596b39(0x26f)]['includes'](_0x2785f8)&&(_0x1650c0=Math[_0x596b39(0x4b4)](this[_0x596b39(0x200)]-_0x14ae6e[_0x596b39(0x200)]-_0x3567dc));this['_pictureTextWindow'][_0x596b39(0x2c9)](_0x53fb8c,_0x25b06f,_0x1650c0);},Sprite_Picture[_0x488928(0x2fa)]['attachPictureText']=function(){const _0x20cd1d=_0x488928;if(!this[_0x20cd1d(0x1e8)])return;if(!this[_0x20cd1d(0x2fb)])return;this[_0x20cd1d(0x2fb)][_0x20cd1d(0x253)]=this['_pictureTextWindow'][_0x20cd1d(0x375)];},VisuMZ[_0x488928(0x44d)][_0x488928(0x435)]=Window_Base['prototype'][_0x488928(0x2bf)],Window_Base[_0x488928(0x2fa)][_0x488928(0x2bf)]=function(_0xf4aaef){const _0x453441=_0x488928;this[_0x453441(0x3ce)](_0xf4aaef),VisuMZ[_0x453441(0x44d)]['Window_Base_initialize']['call'](this,_0xf4aaef);},Window_Base[_0x488928(0x2fa)]['initMessageCore']=function(_0x427f31){const _0x5cf764=_0x488928;this[_0x5cf764(0x3c1)](),this['resetWordWrap'](),this[_0x5cf764(0x3cf)](_0x427f31);},Window_Base[_0x488928(0x2fa)][_0x488928(0x3c1)]=function(){const _0x1380d5=_0x488928;this[_0x1380d5(0x25f)](_0x1380d5(0x429));},Window_Base[_0x488928(0x2fa)]['setTextAlignment']=function(_0x3f4d64){this['_textAlignment']=_0x3f4d64;},Window_Base[_0x488928(0x2fa)][_0x488928(0x407)]=function(){return this['_textAlignment'];},VisuMZ['MessageCore']['Window_Base_textSizeEx']=Window_Base['prototype']['textSizeEx'],Window_Base[_0x488928(0x2fa)]['textSizeEx']=function(_0xea2993){const _0x2c9e5e=_0x488928;return this['resetWordWrap'](),VisuMZ[_0x2c9e5e(0x44d)][_0x2c9e5e(0x1d4)]['call'](this,_0xea2993);},Window_Base[_0x488928(0x2fa)][_0x488928(0x255)]=function(_0xb3025a){const _0x4c8e8c=_0x488928;return VisuMZ[_0x4c8e8c(0x44d)][_0x4c8e8c(0x1d4)]['call'](this,_0xb3025a);},VisuMZ[_0x488928(0x44d)][_0x488928(0x2f6)]=Window_Base[_0x488928(0x2fa)][_0x488928(0x3cc)],Window_Base[_0x488928(0x2fa)]['processAllText']=function(_0x2bab1f){const _0x27d909=_0x488928;VisuMZ['MessageCore'][_0x27d909(0x2f6)]['call'](this,_0x2bab1f);if(_0x2bab1f[_0x27d909(0x231)])this[_0x27d909(0x25f)]('default');},Window_Base[_0x488928(0x2fa)][_0x488928(0x1fd)]=function(){const _0x4ce8a4=_0x488928;this[_0x4ce8a4(0x3eb)](![]);},Window_Base[_0x488928(0x2fa)][_0x488928(0x36a)]=function(){const _0x7bcb5d=_0x488928;return this[_0x7bcb5d(0x36c)];},Window_Base['prototype'][_0x488928(0x3eb)]=function(_0x983fb9){const _0x4052b5=_0x488928;return this[_0x4052b5(0x36c)]=_0x983fb9,'';},Window_Base['prototype'][_0x488928(0x3cf)]=function(_0x4bff4e){const _0x1240b7=_0x488928;this[_0x1240b7(0x3bc)]=JsonEx[_0x1240b7(0x3c2)](_0x4bff4e);},Window_Base[_0x488928(0x2fa)]['resetFontSettings']=function(){const _0x2d5e93=_0x488928;this['contents'][_0x2d5e93(0x202)]=$gameSystem[_0x2d5e93(0x3ed)](),this['contents']['fontSize']=$gameSystem[_0x2d5e93(0x470)](),this[_0x2d5e93(0x375)][_0x2d5e93(0x419)]=![],this[_0x2d5e93(0x375)][_0x2d5e93(0x261)]=![],this[_0x2d5e93(0x46a)]();},Window_Base[_0x488928(0x2fa)]['resetTextColor']=function(){const _0x3e74cd=_0x488928;this[_0x3e74cd(0x2c2)](ColorManager[_0x3e74cd(0x43e)]()),this['changeOutlineColor'](ColorManager[_0x3e74cd(0x2ac)]());const _0x5b11c2=VisuMZ[_0x3e74cd(0x44d)][_0x3e74cd(0x446)][_0x3e74cd(0x425)];_0x5b11c2[_0x3e74cd(0x42d)]===undefined&&(_0x5b11c2[_0x3e74cd(0x42d)]=0x3),this[_0x3e74cd(0x375)][_0x3e74cd(0x428)]=_0x5b11c2[_0x3e74cd(0x42d)],this[_0x3e74cd(0x3ea)](![]);},Window_Base[_0x488928(0x2fa)][_0x488928(0x3ea)]=function(_0xfa6b62){const _0x2ea204=_0x488928;this[_0x2ea204(0x4a9)]=_0xfa6b62;},Window_Base[_0x488928(0x2fa)][_0x488928(0x31c)]=function(){const _0x2eb3c2=_0x488928;return this[_0x2eb3c2(0x4a9)];},Window_Base['prototype'][_0x488928(0x3ac)]=function(){return![];},Window_Base[_0x488928(0x2fa)][_0x488928(0x358)]=function(){const _0x470194=_0x488928,_0x86345c=[_0x470194(0x202),_0x470194(0x4a2),'fontBold',_0x470194(0x261),_0x470194(0x3f1),'outLineColor','outlineWidth','paintOpacity'];let _0x2d4e04={};for(const _0x40efa9 of _0x86345c){_0x2d4e04[_0x40efa9]=this['contents'][_0x40efa9];}return _0x2d4e04;},Window_Base['prototype']['returnPreservedFontSettings']=function(_0x59bd73){const _0x1bbbe6=_0x488928;for(const _0x5bde47 in _0x59bd73){this[_0x1bbbe6(0x375)][_0x5bde47]=_0x59bd73[_0x5bde47];}},VisuMZ['MessageCore'][_0x488928(0x226)]=Window_Base[_0x488928(0x2fa)][_0x488928(0x2d8)],Window_Base['prototype']['update']=function(){const _0xe83b53=_0x488928;VisuMZ['MessageCore'][_0xe83b53(0x226)]['call'](this),this['updateMove']();},Window_Base[_0x488928(0x2fa)][_0x488928(0x3d2)]=function(){return![];},Window_Base['prototype']['updateMove']=function(){const _0x582fea=_0x488928;this[_0x582fea(0x434)]>0x0&&(this[_0x582fea(0x3d2)]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x582fea(0x2e0)]),this['y']=this[_0x582fea(0x209)](this['y'],this['_moveTargetY']),this['width']=this[_0x582fea(0x209)](this[_0x582fea(0x42f)],this[_0x582fea(0x349)]),this[_0x582fea(0x200)]=this[_0x582fea(0x209)](this[_0x582fea(0x200)],this[_0x582fea(0x1e6)]),this[_0x582fea(0x2b7)]()),this[_0x582fea(0x434)]--);},Window_Base[_0x488928(0x2fa)]['clampPlacementPosition']=function(_0x5770cb,_0x22436b){const _0x31476f=_0x488928;!_0x5770cb&&(this[_0x31476f(0x42f)]=Math[_0x31476f(0x32d)](this['width'],Graphics[_0x31476f(0x42f)]),this[_0x31476f(0x200)]=Math[_0x31476f(0x32d)](this[_0x31476f(0x200)],Graphics['height']));if(!_0x22436b){const _0x1e26ff=-(Math[_0x31476f(0x4b4)](Graphics[_0x31476f(0x42f)]-Graphics[_0x31476f(0x26e)])/0x2),_0x2e4897=_0x1e26ff+Graphics['width']-this[_0x31476f(0x42f)],_0x15a2fc=-(Math[_0x31476f(0x4b4)](Graphics[_0x31476f(0x200)]-Graphics[_0x31476f(0x248)])/0x2),_0x4cf16f=_0x15a2fc+Graphics['height']-this['height'];this['x']=this['x']['clamp'](_0x1e26ff,_0x2e4897),this['y']=this['y'][_0x31476f(0x234)](_0x15a2fc,_0x4cf16f);}},Window_Base[_0x488928(0x2fa)]['applyMoveEasing']=function(_0x37785b,_0x225200){const _0x3a6bfb=_0x488928,_0x2e5179=this[_0x3a6bfb(0x434)],_0x3ee0c7=this[_0x3a6bfb(0x424)],_0x4c6fa0=this[_0x3a6bfb(0x3b9)]((_0x3ee0c7-_0x2e5179)/_0x3ee0c7),_0x2fc62c=this['calcMoveEasing']((_0x3ee0c7-_0x2e5179+0x1)/_0x3ee0c7),_0x222348=(_0x37785b-_0x225200*_0x4c6fa0)/(0x1-_0x4c6fa0);return _0x222348+(_0x225200-_0x222348)*_0x2fc62c;},Window_Base[_0x488928(0x2fa)][_0x488928(0x3b9)]=function(_0x17f19e){const _0xe8123d=_0x488928,_0x52dbd5=0x2;switch(this['_moveEasingType']){case 0x0:return _0x17f19e;case 0x1:return this['easeIn'](_0x17f19e,_0x52dbd5);case 0x2:return this[_0xe8123d(0x318)](_0x17f19e,_0x52dbd5);case 0x3:return this[_0xe8123d(0x418)](_0x17f19e,_0x52dbd5);default:return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0xe8123d(0x209)](_0x17f19e,this[_0xe8123d(0x33d)]):_0x17f19e;}},Window_Base[_0x488928(0x2fa)]['moveTo']=function(_0x5ecc35,_0x50dc7c,_0x5bc043,_0x482cb9,_0x47fae0,_0x58c3e7){const _0x40630c=_0x488928;this[_0x40630c(0x2e0)]=_0x5ecc35,this['_moveTargetY']=_0x50dc7c,this['_moveTargetWidth']=_0x5bc043||this[_0x40630c(0x42f)],this[_0x40630c(0x1e6)]=_0x482cb9||this[_0x40630c(0x200)],this['_moveDuration']=_0x47fae0||0x1;if(this[_0x40630c(0x434)]<=0x0)this[_0x40630c(0x434)]=0x1;this[_0x40630c(0x424)]=this['_moveDuration'],this[_0x40630c(0x33d)]=_0x58c3e7||0x0;if(_0x47fae0<=0x0)this[_0x40630c(0x352)]();},Window_Base[_0x488928(0x2fa)][_0x488928(0x3d1)]=function(_0x4171f8,_0xa904dd,_0x19077c,_0x177edd,_0x6fca5,_0x14d1d2){const _0x5be567=_0x488928;this['_moveTargetX']=this['x']+_0x4171f8,this[_0x5be567(0x46b)]=this['y']+_0xa904dd,this[_0x5be567(0x349)]=this['width']+(_0x19077c||0x0),this[_0x5be567(0x1e6)]=this[_0x5be567(0x200)]+(_0x177edd||0x0),this[_0x5be567(0x434)]=_0x6fca5||0x1;if(this[_0x5be567(0x434)]<=0x0)this[_0x5be567(0x434)]=0x1;this[_0x5be567(0x424)]=this[_0x5be567(0x434)],this[_0x5be567(0x33d)]=_0x14d1d2||0x0;if(_0x6fca5<=0x0)this[_0x5be567(0x352)]();},Window_Base[_0x488928(0x2fa)]['resetRect']=function(_0x35c715,_0x2b4085){const _0x55b5c2=_0x488928;this[_0x55b5c2(0x275)](this[_0x55b5c2(0x3bc)]['x'],this[_0x55b5c2(0x3bc)]['y'],this[_0x55b5c2(0x3bc)]['width'],this[_0x55b5c2(0x3bc)][_0x55b5c2(0x200)],_0x35c715,_0x2b4085);},VisuMZ[_0x488928(0x44d)][_0x488928(0x3ab)]=Window_Base['prototype'][_0x488928(0x2c2)],Window_Base[_0x488928(0x2fa)][_0x488928(0x2c2)]=function(_0x35efd8){const _0x31a72d=_0x488928;if(this[_0x31a72d(0x31c)]())return;_0x35efd8=_0x35efd8[_0x31a72d(0x329)](/\,/g,''),this[_0x31a72d(0x361)]=this[_0x31a72d(0x361)]||[],this[_0x31a72d(0x361)][_0x31a72d(0x34d)](this[_0x31a72d(0x375)]['textColor']),VisuMZ[_0x31a72d(0x44d)]['Window_Base_changeTextColor'][_0x31a72d(0x2ed)](this,_0x35efd8);},Window_Base['prototype'][_0x488928(0x353)]=function(_0x4f086f){const _0x3225f1=_0x488928;this[_0x3225f1(0x1f2)](_0x4f086f);if(this[_0x3225f1(0x31c)]())return;_0x4f086f[_0x3225f1(0x231)]&&(this['_textColorStack']=this[_0x3225f1(0x361)]||[],this[_0x3225f1(0x375)][_0x3225f1(0x3f1)]=this[_0x3225f1(0x361)][_0x3225f1(0x45b)]()||ColorManager['normalColor']());},Window_Base[_0x488928(0x2fa)][_0x488928(0x483)]=function(_0x139b19){const _0x3bd079=_0x488928;return _0x139b19=this['convertTextMacros'](_0x139b19),_0x139b19=this['convertBackslashCharacters'](_0x139b19),_0x139b19=this[_0x3bd079(0x1f9)](_0x139b19),_0x139b19=this['convertButtonAssistEscapeCharacters'](_0x139b19),_0x139b19=this['preConvertEscapeCharacters'](_0x139b19),_0x139b19=this[_0x3bd079(0x4b1)](_0x139b19),_0x139b19=this['convertFontSettingsEscapeCharacters'](_0x139b19),_0x139b19=this['convertTextAlignmentEscapeCharacters'](_0x139b19),_0x139b19=this[_0x3bd079(0x2e7)](_0x139b19),_0x139b19=this[_0x3bd079(0x45a)](_0x139b19),_0x139b19=this['convertHardcodedEscapeReplacements'](_0x139b19),_0x139b19=this[_0x3bd079(0x217)](_0x139b19),_0x139b19=this[_0x3bd079(0x38f)](_0x139b19),_0x139b19=this[_0x3bd079(0x4ac)](_0x139b19),_0x139b19=this[_0x3bd079(0x1f9)](_0x139b19),_0x139b19=this['processAutoColorWords'](_0x139b19),_0x139b19=this[_0x3bd079(0x2df)](_0x139b19),_0x139b19;},Window_Base[_0x488928(0x2fa)][_0x488928(0x203)]=function(_0xcd9d15){const _0xb34af8=_0x488928;this[_0xb34af8(0x228)]=![];for(const _0x7acd0 of VisuMZ[_0xb34af8(0x44d)]['Settings'][_0xb34af8(0x447)]){_0xcd9d15[_0xb34af8(0x337)](_0x7acd0[_0xb34af8(0x37a)])&&(this[_0xb34af8(0x228)]=!![],_0xcd9d15=_0xcd9d15[_0xb34af8(0x329)](_0x7acd0['textCodeCheck'],_0x7acd0[_0xb34af8(0x23c)]['bind'](this)));}return _0xcd9d15;},Window_Base[_0x488928(0x2fa)][_0x488928(0x288)]=function(_0x4d31fa){const _0x257fb8=_0x488928;return _0x4d31fa=_0x4d31fa[_0x257fb8(0x329)](/\\/g,'\x1b'),_0x4d31fa=_0x4d31fa[_0x257fb8(0x329)](/\x1b\x1b/g,'\x5c'),_0x4d31fa;},Window_Base['prototype'][_0x488928(0x1f9)]=function(_0x220d8b){const _0x48f53c=_0x488928;for(;;){if(_0x220d8b[_0x48f53c(0x337)](/\\V\[(\d+)\]/gi))_0x220d8b=_0x220d8b[_0x48f53c(0x329)](/\\V\[(\d+)\]/gi,(_0x22d9da,_0x39bdba)=>this[_0x48f53c(0x288)](String($gameVariables[_0x48f53c(0x2ec)](parseInt(_0x39bdba)))));else{if(_0x220d8b[_0x48f53c(0x337)](/\x1bV\[(\d+)\]/gi))_0x220d8b=_0x220d8b['replace'](/\x1bV\[(\d+)\]/gi,(_0x38a297,_0x4991e4)=>this[_0x48f53c(0x288)](String($gameVariables[_0x48f53c(0x2ec)](parseInt(_0x4991e4)))));else break;}}return _0x220d8b;},Window_Base[_0x488928(0x2fa)][_0x488928(0x2a7)]=function(_0x595820){const _0x5df790=_0x488928;return Imported[_0x5df790(0x3ec)]&&(_0x595820=_0x595820[_0x5df790(0x329)](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x595820=_0x595820[_0x5df790(0x329)](/<Left (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)]('left')),_0x595820=_0x595820[_0x5df790(0x329)](/<Right (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)]('right')),_0x595820=_0x595820[_0x5df790(0x329)](/<Down (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)](_0x5df790(0x482))),_0x595820=_0x595820['replace'](/<Ok (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)]('ok')),_0x595820=_0x595820[_0x5df790(0x329)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)](_0x5df790(0x272))),_0x595820=_0x595820[_0x5df790(0x329)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)](_0x5df790(0x48b))),_0x595820=_0x595820[_0x5df790(0x329)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)](_0x5df790(0x45b))),_0x595820=_0x595820[_0x5df790(0x329)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x5df790(0x468)](_0x5df790(0x310))),_0x595820=_0x595820[_0x5df790(0x329)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x5df790(0x485)))),_0x595820;},Window_Base[_0x488928(0x2fa)]['convertButtonAssistText']=function(_0x283c6c){const _0x1f2ebd=_0x488928;let _0x2dd44b=TextManager['getInputButtonString'](_0x283c6c)||'';return _0x2dd44b=this['convertBackslashCharacters'](_0x2dd44b),_0x2dd44b=this[_0x1f2ebd(0x1f9)](_0x2dd44b),_0x2dd44b['trim']();},Window_Base[_0x488928(0x2fa)][_0x488928(0x2e8)]=function(_0x3cb8a8){const _0x3a6a5b=_0x488928;return this[_0x3a6a5b(0x477)](),_0x3cb8a8;},Window_Base[_0x488928(0x2fa)][_0x488928(0x4ac)]=function(_0x4f6f18){return _0x4f6f18;},Window_Base['prototype'][_0x488928(0x4b1)]=function(_0x378cb4){const _0x12bb4b=_0x488928;return this[_0x12bb4b(0x37b)]()&&(_0x378cb4=_0x378cb4[_0x12bb4b(0x329)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x378cb4=_0x378cb4[_0x12bb4b(0x329)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x378cb4=_0x378cb4['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x378cb4=_0x378cb4[_0x12bb4b(0x329)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x378cb4=_0x378cb4[_0x12bb4b(0x329)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x378cb4=_0x378cb4[_0x12bb4b(0x329)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,'')),_0x378cb4;},Window_Base['prototype'][_0x488928(0x37b)]=function(){const _0xf4f8f8=_0x488928,_0x46e755=['Window_ChoiceList','Window_MessageLog'];return _0x46e755['includes'](this[_0xf4f8f8(0x218)]['name']);},Window_Base[_0x488928(0x2fa)][_0x488928(0x1e5)]=function(_0x46f362){const _0x3c97d4=_0x488928;return _0x46f362=_0x46f362['replace'](/<B>/gi,'\x1bBOLD[1]'),_0x46f362=_0x46f362[_0x3c97d4(0x329)](/<\/B>/gi,'\x1bBOLD[0]'),_0x46f362=_0x46f362[_0x3c97d4(0x329)](/<I>/gi,_0x3c97d4(0x49c)),_0x46f362=_0x46f362['replace'](/<\/I>/gi,'\x1bITALIC[0]'),_0x46f362;},Window_Base[_0x488928(0x2fa)][_0x488928(0x24b)]=function(_0x3951bd){const _0x40b0a2=_0x488928;return _0x3951bd=_0x3951bd[_0x40b0a2(0x329)](/<LEFT>/gi,_0x40b0a2(0x3e6)),_0x3951bd=_0x3951bd[_0x40b0a2(0x329)](/<\/LEFT>/gi,_0x40b0a2(0x1ec)),_0x3951bd=_0x3951bd[_0x40b0a2(0x329)](/<CENTER>/gi,_0x40b0a2(0x3a4)),_0x3951bd=_0x3951bd[_0x40b0a2(0x329)](/<\/CENTER>/gi,_0x40b0a2(0x1ec)),_0x3951bd=_0x3951bd[_0x40b0a2(0x329)](/<RIGHT>/gi,_0x40b0a2(0x1de)),_0x3951bd=_0x3951bd['replace'](/<\/RIGHT>/gi,_0x40b0a2(0x1ec)),_0x3951bd;},Window_Base[_0x488928(0x2fa)][_0x488928(0x2e7)]=function(_0x5e7844){const _0x522d78=_0x488928;return _0x5e7844=_0x5e7844['replace'](/<COLORLOCK>/gi,_0x522d78(0x3ae)),_0x5e7844=_0x5e7844[_0x522d78(0x329)](/<\/COLORLOCK>/gi,_0x522d78(0x423)),_0x5e7844=_0x5e7844[_0x522d78(0x329)](/\(\(\(/gi,_0x522d78(0x3ae)),_0x5e7844=_0x5e7844['replace'](/\)\)\)/gi,_0x522d78(0x423)),_0x5e7844;},Window_Base[_0x488928(0x2fa)][_0x488928(0x45a)]=function(_0x1d611b){const _0x1922f5=_0x488928;return _0x1d611b=_0x1d611b[_0x1922f5(0x329)](/\x1bN\[(\d+)\]/gi,(_0x4aca1a,_0x398788)=>this['actorName'](parseInt(_0x398788))),_0x1d611b=_0x1d611b['replace'](/\x1bP\[(\d+)\]/gi,(_0x49f51a,_0x5e3f64)=>this[_0x1922f5(0x455)](parseInt(_0x5e3f64))),_0x1d611b=_0x1d611b[_0x1922f5(0x329)](/\x1bG/gi,TextManager[_0x1922f5(0x1f6)]),_0x1d611b;},Window_Base[_0x488928(0x2fa)]['convertHardcodedEscapeReplacements']=function(_0xca3385){const _0x3a594a=_0x488928;return _0xca3385=_0xca3385[_0x3a594a(0x329)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x3a594a(0x45c)]()),_0xca3385=_0xca3385[_0x3a594a(0x329)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0xca3385=_0xca3385[_0x3a594a(0x329)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x3a594a(0x2a2)](!![])),_0xca3385=_0xca3385[_0x3a594a(0x329)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x3a594a(0x2a2)](![])),_0xca3385;},Window_Base[_0x488928(0x2fa)][_0x488928(0x45c)]=function(){const _0x579de7=_0x488928;if(!SceneManager['isSceneBattle']())return'';if(BattleManager[_0x579de7(0x40b)])return BattleManager['_target'][_0x579de7(0x31d)]();if(BattleManager[_0x579de7(0x3ee)][0x0])return BattleManager['_targets'][0x0]['name']();return'';},Window_Base[_0x488928(0x2fa)]['battleUserName']=function(){const _0x2c346e=_0x488928;if(!SceneManager[_0x2c346e(0x359)]())return'';let _0x52b9fe=null;return _0x52b9fe=BattleManager[_0x2c346e(0x34b)],!_0x52b9fe&&BattleManager[_0x2c346e(0x315)]()&&(_0x52b9fe=BattleManager['actor']()),_0x52b9fe?_0x52b9fe[_0x2c346e(0x31d)]():'';},Window_Base[_0x488928(0x2fa)][_0x488928(0x2a2)]=function(_0x3e2f9c){const _0x244560=_0x488928;if(!SceneManager[_0x244560(0x359)]())return'';let _0x5cd135=BattleManager[_0x244560(0x3c3)]||null;!_0x5cd135&&BattleManager[_0x244560(0x315)]()&&(_0x5cd135=BattleManager['inputtingAction']());if(_0x5cd135&&_0x5cd135[_0x244560(0x317)]()){let _0x18be31='';if(_0x3e2f9c)_0x18be31+=_0x244560(0x47c)['format'](_0x5cd135['item']()[_0x244560(0x22e)]);return _0x18be31+=_0x5cd135[_0x244560(0x317)]()[_0x244560(0x31d)],_0x18be31;}return'';},Window_Base[_0x488928(0x2fa)][_0x488928(0x217)]=function(_0x616cda){const _0x7e041d=_0x488928;for(const _0x1fa126 of VisuMZ[_0x7e041d(0x44d)][_0x7e041d(0x446)][_0x7e041d(0x41f)]){_0x616cda['match'](_0x1fa126[_0x7e041d(0x37a)])&&(_0x616cda=_0x616cda['replace'](_0x1fa126[_0x7e041d(0x37a)],_0x1fa126['textCodeResult']),_0x616cda=this[_0x7e041d(0x1f9)](_0x616cda));}return _0x616cda;},Window_Base[_0x488928(0x2fa)]['convertMessageCoreEscapeReplacements']=function(_0x4fd3ee){const _0x41edcc=_0x488928;for(const _0x281481 of VisuMZ[_0x41edcc(0x44d)][_0x41edcc(0x446)][_0x41edcc(0x215)]){_0x4fd3ee[_0x41edcc(0x337)](_0x281481[_0x41edcc(0x37a)])&&(_0x4fd3ee=_0x4fd3ee[_0x41edcc(0x329)](_0x281481['textCodeCheck'],_0x281481[_0x41edcc(0x23c)][_0x41edcc(0x270)](this)),_0x4fd3ee=this[_0x41edcc(0x1f9)](_0x4fd3ee));}return _0x4fd3ee;},Window_Base['prototype'][_0x488928(0x35e)]=function(_0x4aff9e){const _0xbcc6fb=_0x488928,_0x518611=_0x4aff9e>=0x1?$gameActors[_0xbcc6fb(0x334)](_0x4aff9e):null,_0x399093=_0x518611?_0x518611['name']():'',_0x57b02a=Number(VisuMZ['MessageCore'][_0xbcc6fb(0x446)][_0xbcc6fb(0x3f7)]['Actors']);return this['isAutoColorAffected']()&&_0x57b02a!==0x0?_0xbcc6fb(0x25c)[_0xbcc6fb(0x304)](_0x57b02a,_0x399093):_0x399093;},Window_Base[_0x488928(0x2fa)][_0x488928(0x455)]=function(_0x13f609){const _0x2f8922=_0x488928,_0x163b8f=_0x13f609>=0x1?$gameParty[_0x2f8922(0x4af)]()[_0x13f609-0x1]:null,_0x35e52b=_0x163b8f?_0x163b8f['name']():'',_0x461009=Number(VisuMZ[_0x2f8922(0x44d)][_0x2f8922(0x446)]['AutoColor'][_0x2f8922(0x30b)]);return this['isAutoColorAffected']()&&_0x461009!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x2f8922(0x304)](_0x461009,_0x35e52b):_0x35e52b;},Window_Base['prototype'][_0x488928(0x41d)]=function(_0x4a7acb){const _0x5c52a0=_0x488928;return this[_0x5c52a0(0x3ac)]()&&(_0x4a7acb=this[_0x5c52a0(0x289)](_0x4a7acb),_0x4a7acb=this[_0x5c52a0(0x32b)](_0x4a7acb)),_0x4a7acb;},Window_Base[_0x488928(0x2fa)]['processStoredAutoColorChanges']=function(_0x304e12){const _0x3892a0=_0x488928;for(autoColor of VisuMZ[_0x3892a0(0x44d)][_0x3892a0(0x262)]){_0x304e12=_0x304e12[_0x3892a0(0x329)](autoColor[0x0],autoColor[0x1]);}return _0x304e12;},Window_Base[_0x488928(0x2fa)][_0x488928(0x32c)]=function(){const _0x2fcd88=_0x488928;this[_0x2fcd88(0x46f)]=[];},Window_Base[_0x488928(0x2fa)][_0x488928(0x477)]=function(){const _0x6fe1c2=_0x488928;this['clearActorNameAutoColor']();const _0x3777a=VisuMZ[_0x6fe1c2(0x44d)]['Settings']['AutoColor'],_0x1a89ca=_0x3777a[_0x6fe1c2(0x30b)];if(_0x1a89ca<=0x0)return;for(const _0x3c6c33 of $gameActors[_0x6fe1c2(0x2d5)]){if(!_0x3c6c33)continue;const _0x1a03a8=_0x3c6c33['name']();if(_0x1a03a8['trim']()[_0x6fe1c2(0x476)]<=0x0)continue;if(/^\d+$/[_0x6fe1c2(0x469)](_0x1a03a8))continue;if(_0x1a03a8['match'](/-----/i))continue;let _0x166a3d=VisuMZ[_0x6fe1c2(0x44d)][_0x6fe1c2(0x3ef)](_0x1a03a8);const _0x4a4f27=new RegExp('\x5cb'+_0x166a3d+'\x5cb','g'),_0x5f5022=_0x6fe1c2(0x25c)[_0x6fe1c2(0x304)](_0x1a89ca,_0x1a03a8);this[_0x6fe1c2(0x46f)][_0x6fe1c2(0x206)]([_0x4a4f27,_0x5f5022]);}},Window_Base['prototype'][_0x488928(0x32b)]=function(_0x313152){const _0x47a917=_0x488928;this[_0x47a917(0x46f)]===undefined&&this[_0x47a917(0x477)]();for(autoColor of this[_0x47a917(0x46f)]){_0x313152=_0x313152[_0x47a917(0x329)](autoColor[0x0],autoColor[0x1]);}return _0x313152;},Window_Base[_0x488928(0x2fa)][_0x488928(0x3a0)]=function(_0x4aca51,_0x5003fb,_0x47cff4){const _0x376db6=_0x488928;if(!_0x4aca51)return'';const _0x24a89f=_0x4aca51[_0x5003fb];let _0xbb0ec0='';if(_0x24a89f&&_0x47cff4&&_0x24a89f[_0x376db6(0x22e)]){const _0x3cda1e=_0x376db6(0x4b3);_0xbb0ec0=_0x3cda1e[_0x376db6(0x304)](_0x24a89f['iconIndex'],_0x24a89f[_0x376db6(0x31d)]);}else _0x24a89f?_0xbb0ec0=_0x24a89f[_0x376db6(0x31d)]:_0xbb0ec0='';return this[_0x376db6(0x3ac)]()&&(_0xbb0ec0=this[_0x376db6(0x292)](_0xbb0ec0,_0x4aca51)),_0xbb0ec0;},Window_Base[_0x488928(0x2fa)][_0x488928(0x3f8)]=function(_0x4fb8c7){const _0x5da0d9=_0x488928,_0x362022=$gameParty[_0x5da0d9(0x251)]();if(_0x362022['id']<0x0)return'';let _0x1beaf6=null;if(_0x362022[_0x5da0d9(0x46e)]===0x0)_0x1beaf6=$dataItems[_0x362022['id']];if(_0x362022[_0x5da0d9(0x46e)]===0x1)_0x1beaf6=$dataWeapons[_0x362022['id']];if(_0x362022[_0x5da0d9(0x46e)]===0x2)_0x1beaf6=$dataArmors[_0x362022['id']];if(!_0x1beaf6)return'';return _0x4fb8c7?_0x5da0d9(0x4b3)[_0x5da0d9(0x304)](_0x1beaf6[_0x5da0d9(0x22e)],_0x1beaf6['name']):_0x1beaf6[_0x5da0d9(0x31d)];},Window_Base[_0x488928(0x2fa)][_0x488928(0x3b5)]=function(){const _0x46298a=_0x488928,_0x1f804e=$gameParty['getLastGainedItemData']();if(_0x1f804e['id']<=0x0)return'';return _0x1f804e[_0x46298a(0x442)];},Window_Base[_0x488928(0x2fa)]['applyDatabaseAutoColor']=function(_0x30bb63,_0x181398){const _0x15de43=_0x488928,_0x903829=VisuMZ['MessageCore'][_0x15de43(0x446)]['AutoColor'];let _0x49e7bc=0x0;if(_0x181398===$dataActors)_0x49e7bc=_0x903829[_0x15de43(0x30b)];if(_0x181398===$dataClasses)_0x49e7bc=_0x903829[_0x15de43(0x208)];if(_0x181398===$dataSkills)_0x49e7bc=_0x903829[_0x15de43(0x377)];if(_0x181398===$dataItems)_0x49e7bc=_0x903829['Items'];if(_0x181398===$dataWeapons)_0x49e7bc=_0x903829[_0x15de43(0x49e)];if(_0x181398===$dataArmors)_0x49e7bc=_0x903829[_0x15de43(0x4ab)];if(_0x181398===$dataEnemies)_0x49e7bc=_0x903829[_0x15de43(0x302)];if(_0x181398===$dataStates)_0x49e7bc=_0x903829[_0x15de43(0x22a)];return _0x49e7bc>0x0&&(_0x30bb63=_0x15de43(0x25c)[_0x15de43(0x304)](_0x49e7bc,_0x30bb63)),_0x30bb63;},Window_Base['prototype'][_0x488928(0x2df)]=function(_0x463a43){const _0x9d6ca0=_0x488928;_0x463a43=_0x463a43['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x50e55e,_0x1c6632)=>this[_0x9d6ca0(0x3eb)](!![])),_0x463a43=_0x463a43['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x2d278b,_0x19ec4d)=>this[_0x9d6ca0(0x3eb)](![])),_0x463a43=_0x463a43[_0x9d6ca0(0x329)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x17d798,_0xf04e76)=>this['setWordWrap'](![]));if(_0x463a43[_0x9d6ca0(0x337)](Window_Message['_autoSizeRegexp']))this[_0x9d6ca0(0x3eb)](![]);else _0x463a43['match'](Window_Message[_0x9d6ca0(0x30e)])&&this[_0x9d6ca0(0x3eb)](![]);if(!this[_0x9d6ca0(0x36a)]())return _0x463a43;if(_0x463a43['length']<=0x0)return _0x463a43;return VisuMZ[_0x9d6ca0(0x44d)][_0x9d6ca0(0x446)]['WordWrap'][_0x9d6ca0(0x467)]?(_0x463a43=_0x463a43['replace'](/[\n\r]+/g,'\x20'),_0x463a43=_0x463a43[_0x9d6ca0(0x329)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x463a43=_0x463a43[_0x9d6ca0(0x329)](/[\n\r]+/g,''),_0x463a43=_0x463a43[_0x9d6ca0(0x329)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x463a43=this[_0x9d6ca0(0x319)](_0x463a43),_0x463a43=_0x463a43[_0x9d6ca0(0x471)]('\x20')[_0x9d6ca0(0x369)](_0x9d6ca0(0x35d)),_0x463a43=_0x463a43['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x463a43=_0x463a43['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x463a43;},Window_Base['prototype'][_0x488928(0x319)]=function(_0x37aafa){return _0x37aafa;},VisuMZ[_0x488928(0x44d)][_0x488928(0x2f9)]=Window_Base[_0x488928(0x2fa)][_0x488928(0x339)],Window_Base[_0x488928(0x2fa)][_0x488928(0x339)]=function(_0x4e2660){const _0xa11576=_0x488928;VisuMZ[_0xa11576(0x44d)][_0xa11576(0x2f9)][_0xa11576(0x2ed)](this,_0x4e2660),this[_0xa11576(0x3b0)](_0x4e2660);},VisuMZ['MessageCore'][_0x488928(0x20c)]=Window_Base['prototype'][_0x488928(0x448)],Window_Base[_0x488928(0x2fa)]['processControlCharacter']=function(_0x3cc86a,_0x2bb20a){const _0x1bcb49=_0x488928;VisuMZ[_0x1bcb49(0x44d)]['Window_Base_processControlCharacter']['call'](this,_0x3cc86a,_0x2bb20a),_0x2bb20a==='\x1bWrapBreak[0]'&&this[_0x1bcb49(0x2b8)](_0x3cc86a);},Window_Base[_0x488928(0x2fa)][_0x488928(0x480)]=function(_0x51e8ca){const _0x206de7=_0x488928;var _0x794efe=/^\<(.*?)\>/[_0x206de7(0x1e9)](_0x51e8ca[_0x206de7(0x2c3)][_0x206de7(0x3be)](_0x51e8ca[_0x206de7(0x388)]));return _0x794efe?(_0x51e8ca[_0x206de7(0x388)]+=_0x794efe[0x0]['length'],String(_0x794efe[0x0]['slice'](0x1,_0x794efe[0x0][_0x206de7(0x476)]-0x1))):'';},VisuMZ[_0x488928(0x44d)]['Window_Base_processEscapeCharacter']=Window_Base['prototype'][_0x488928(0x43d)],Window_Base[_0x488928(0x2fa)]['processEscapeCharacter']=function(_0x546875,_0xab18b1){const _0x1e1928=_0x488928;switch(_0x546875){case'C':_0xab18b1['drawing']?VisuMZ[_0x1e1928(0x44d)][_0x1e1928(0x479)]['call'](this,_0x546875,_0xab18b1):this[_0x1e1928(0x1f2)](_0xab18b1);break;case'I':case'{':case'}':VisuMZ[_0x1e1928(0x44d)][_0x1e1928(0x479)]['call'](this,_0x546875,_0xab18b1);break;case'FS':this[_0x1e1928(0x413)](_0xab18b1);break;case'PX':this['processPxTextCode'](_0xab18b1);break;case'PY':this['processPyTextCode'](_0xab18b1);break;case _0x1e1928(0x259):this['processFontChangeBold'](this[_0x1e1928(0x1f2)](_0xab18b1));break;case _0x1e1928(0x460):this[_0x1e1928(0x28c)](_0xab18b1);break;case'COLORLOCK':this[_0x1e1928(0x291)](_0xab18b1);break;case _0x1e1928(0x2e3):this[_0x1e1928(0x242)](_0xab18b1);break;case _0x1e1928(0x2c1):this[_0x1e1928(0x3d5)](this[_0x1e1928(0x1f2)](_0xab18b1));break;case _0x1e1928(0x443):this[_0x1e1928(0x453)](_0xab18b1);break;case _0x1e1928(0x257):this[_0x1e1928(0x353)](_0xab18b1);break;case _0x1e1928(0x1e2):this['processTextAlignmentChange'](_0xab18b1);break;case'WAIT':this[_0x1e1928(0x23f)](_0xab18b1);break;case'WRAPBREAK':this[_0x1e1928(0x2b8)](_0xab18b1);break;default:this[_0x1e1928(0x21d)](_0x546875,_0xab18b1);}},Window_Base[_0x488928(0x2fa)]['processMessageCoreEscapeActions']=function(_0x4ce618,_0x59c564){const _0x432747=_0x488928;for(const _0x3fc94a of VisuMZ[_0x432747(0x44d)][_0x432747(0x446)][_0x432747(0x41f)]){if(_0x3fc94a[_0x432747(0x33f)]===_0x4ce618){if(_0x3fc94a[_0x432747(0x3f4)]==='')this[_0x432747(0x1f2)](_0x59c564);_0x3fc94a[_0x432747(0x235)][_0x432747(0x2ed)](this,_0x59c564);if(this['constructor']===Window_Message){const _0x43158e=_0x3fc94a['CommonEvent']||0x0;if(_0x43158e>0x0)this[_0x432747(0x426)](_0x43158e);}}}},Window_Base[_0x488928(0x2fa)][_0x488928(0x201)]=function(){const _0x28492e=_0x488928;this[_0x28492e(0x375)][_0x28492e(0x4a2)]+=VisuMZ[_0x28492e(0x44d)][_0x28492e(0x446)][_0x28492e(0x425)][_0x28492e(0x2fc)],this[_0x28492e(0x375)]['fontSize']=Math['min'](this[_0x28492e(0x375)][_0x28492e(0x4a2)],VisuMZ[_0x28492e(0x44d)][_0x28492e(0x446)]['General'][_0x28492e(0x2fd)]);},Window_Base[_0x488928(0x2fa)][_0x488928(0x463)]=function(){const _0x27cd2f=_0x488928;this[_0x27cd2f(0x375)][_0x27cd2f(0x4a2)]-=VisuMZ[_0x27cd2f(0x44d)][_0x27cd2f(0x446)][_0x27cd2f(0x425)][_0x27cd2f(0x2fc)],this[_0x27cd2f(0x375)][_0x27cd2f(0x4a2)]=Math[_0x27cd2f(0x21e)](this[_0x27cd2f(0x375)]['fontSize'],VisuMZ[_0x27cd2f(0x44d)]['Settings'][_0x27cd2f(0x425)][_0x27cd2f(0x3b8)]);},Window_Base[_0x488928(0x2fa)][_0x488928(0x413)]=function(_0x22b98f){const _0x3cfecb=_0x488928,_0x52ec72=this[_0x3cfecb(0x1f2)](_0x22b98f);this['contents'][_0x3cfecb(0x4a2)]=_0x52ec72[_0x3cfecb(0x234)](VisuMZ['MessageCore'][_0x3cfecb(0x446)][_0x3cfecb(0x425)]['FontSmallerCap'],VisuMZ[_0x3cfecb(0x44d)][_0x3cfecb(0x446)][_0x3cfecb(0x425)][_0x3cfecb(0x2fd)]);},Window_Base[_0x488928(0x2fa)]['maxFontSizeInLine']=function(_0x5c9d9b){const _0x35c460=_0x488928;let _0x49e020=this[_0x35c460(0x375)][_0x35c460(0x4a2)];const _0x418b4c=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x54823c=_0x418b4c[_0x35c460(0x1e9)](_0x5c9d9b);if(!_0x54823c)break;const _0x49913d=String(_0x54823c[0x1])[_0x35c460(0x322)]();if(_0x49913d==='{')this[_0x35c460(0x201)]();else{if(_0x49913d==='}')this[_0x35c460(0x463)]();else _0x49913d==='FS'&&(this[_0x35c460(0x375)][_0x35c460(0x4a2)]=parseInt(_0x54823c[0x3])[_0x35c460(0x234)](VisuMZ[_0x35c460(0x44d)][_0x35c460(0x446)][_0x35c460(0x425)][_0x35c460(0x3b8)],VisuMZ[_0x35c460(0x44d)][_0x35c460(0x446)][_0x35c460(0x425)][_0x35c460(0x2fd)]));}this['contents'][_0x35c460(0x4a2)]>_0x49e020&&(_0x49e020=this[_0x35c460(0x375)][_0x35c460(0x4a2)]);}return _0x49e020;},Window_Base['prototype'][_0x488928(0x3ad)]=function(_0x4f4114){const _0x4ec958=_0x488928;_0x4f4114['x']=this[_0x4ec958(0x1f2)](_0x4f4114),VisuMZ[_0x4ec958(0x44d)]['Settings'][_0x4ec958(0x425)][_0x4ec958(0x458)]&&(_0x4f4114['x']+=_0x4f4114[_0x4ec958(0x41b)]);},Window_Base[_0x488928(0x2fa)][_0x488928(0x312)]=function(_0x256c67){const _0x4dd66c=_0x488928;_0x256c67['y']=this[_0x4dd66c(0x1f2)](_0x256c67),VisuMZ[_0x4dd66c(0x44d)][_0x4dd66c(0x446)]['General'][_0x4dd66c(0x458)]&&(_0x256c67['y']+=_0x256c67[_0x4dd66c(0x4a5)]);},Window_Base[_0x488928(0x2fa)][_0x488928(0x214)]=function(_0x10f5f6){this['contents']['fontBold']=!!_0x10f5f6;},Window_Base['prototype'][_0x488928(0x3d5)]=function(_0x167cf7){const _0x19f60c=_0x488928;this[_0x19f60c(0x375)][_0x19f60c(0x261)]=!!_0x167cf7;},Window_Base['prototype'][_0x488928(0x396)]=function(_0x38c3af){const _0x4c9f79=_0x488928,_0x3395d9=this['obtainEscapeParam'](_0x38c3af);if(!_0x38c3af[_0x4c9f79(0x231)])return;switch(_0x3395d9){case 0x0:this[_0x4c9f79(0x25f)]('default');return;case 0x1:this['setTextAlignment']('left');break;case 0x2:this[_0x4c9f79(0x25f)](_0x4c9f79(0x496));break;case 0x3:this['setTextAlignment'](_0x4c9f79(0x3b7));break;}this[_0x4c9f79(0x3b0)](_0x38c3af);},Window_Base[_0x488928(0x2fa)][_0x488928(0x3b0)]=function(_0x1c11cb){const _0x120a30=_0x488928;if(!_0x1c11cb[_0x120a30(0x231)])return;if(_0x1c11cb[_0x120a30(0x229)])return;if(this[_0x120a30(0x407)]()==='default')return;let _0xf10f9b=_0x1c11cb['text']['indexOf']('\x1bTEXTALIGNMENT',_0x1c11cb[_0x120a30(0x388)]+0x1),_0x5d36d6=_0x1c11cb[_0x120a30(0x2c3)]['indexOf']('\x0a',_0x1c11cb['index']+0x1);if(_0xf10f9b<0x0)_0xf10f9b=_0x1c11cb[_0x120a30(0x2c3)][_0x120a30(0x476)]+0x1;if(_0x5d36d6>0x0)_0xf10f9b=Math[_0x120a30(0x32d)](_0xf10f9b,_0x5d36d6);const _0x4477d9=_0x1c11cb['text'][_0x120a30(0x25d)](_0x1c11cb[_0x120a30(0x388)],_0xf10f9b),_0x2b3a56=this['textSizeExTextAlignment'](_0x4477d9)[_0x120a30(0x42f)],_0x275397=_0x1c11cb[_0x120a30(0x42f)]||this[_0x120a30(0x1e3)]-0x8,_0xa69deb=this[_0x120a30(0x218)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x120a30(0x407)]()){case _0x120a30(0x3de):_0x1c11cb['x']=_0x1c11cb['startX'];break;case _0x120a30(0x496):_0x1c11cb['x']=_0x1c11cb[_0x120a30(0x41b)],_0x1c11cb['x']+=Math[_0x120a30(0x4b4)]((_0x275397-_0x2b3a56)/0x2);_0xa69deb&&(_0x1c11cb['x']-=_0x1c11cb[_0x120a30(0x41b)]/0x2);break;case _0x120a30(0x3b7):_0x1c11cb['x']=_0x275397-_0x2b3a56+_0x1c11cb[_0x120a30(0x41b)];_0xa69deb&&(_0x1c11cb['x']-=_0x1c11cb['startX']);break;}},Window_Base[_0x488928(0x2fa)][_0x488928(0x2b4)]=function(_0x5b0719){const _0x59b12d=_0x488928;_0x5b0719=_0x5b0719['replace'](/\x1b!/g,''),_0x5b0719=_0x5b0719[_0x59b12d(0x329)](/\x1b\|/g,''),_0x5b0719=_0x5b0719[_0x59b12d(0x329)](/\x1b\./g,'');const _0x37e31a=this['createTextState'](_0x5b0719,0x0,0x0,0x0),_0x568a0c=this[_0x59b12d(0x358)]();return _0x37e31a[_0x59b12d(0x231)]=![],this['processAllText'](_0x37e31a),this[_0x59b12d(0x1e1)](_0x568a0c),{'width':_0x37e31a[_0x59b12d(0x232)],'height':_0x37e31a[_0x59b12d(0x373)]};},Window_Base[_0x488928(0x42a)]=VisuMZ[_0x488928(0x44d)][_0x488928(0x446)][_0x488928(0x47e)][_0x488928(0x390)]||0x0,Window_Base['prototype']['processWrapBreak']=function(_0x3d99f1){const _0x3620e6=_0x488928,_0xc729af=(_0x3d99f1[_0x3620e6(0x229)]?-0x1:0x1)*this[_0x3620e6(0x420)]('\x20');_0x3d99f1['x']+=_0xc729af;if(this[_0x3620e6(0x1f2)](_0x3d99f1)>0x0)_0x3d99f1['x']+=_0xc729af;if(_0x3d99f1[_0x3620e6(0x229)])return;let _0x334685=_0x3d99f1[_0x3620e6(0x2c3)][_0x3620e6(0x433)](_0x3620e6(0x35d),_0x3d99f1[_0x3620e6(0x388)]+0x1),_0x1f0590=_0x3d99f1[_0x3620e6(0x2c3)][_0x3620e6(0x433)]('\x0a',_0x3d99f1[_0x3620e6(0x388)]+0x1);if(_0x334685<0x0)_0x334685=_0x3d99f1[_0x3620e6(0x2c3)][_0x3620e6(0x476)]+0x1;if(_0x1f0590>0x0)_0x334685=Math[_0x3620e6(0x32d)](_0x334685,_0x1f0590);const _0x14fb08=_0x3d99f1[_0x3620e6(0x2c3)]['substring'](_0x3d99f1[_0x3620e6(0x388)],_0x334685),_0xd93e22=this[_0x3620e6(0x350)](_0x14fb08)['width'];let _0xd100f9=_0x3d99f1[_0x3620e6(0x42f)]||this[_0x3620e6(0x1e3)];_0xd100f9-=Window_Base[_0x3620e6(0x42a)];if(this[_0x3620e6(0x218)]===Window_Message){const _0x44df21=$gameMessage[_0x3620e6(0x43c)]()===''?0x0:ImageManager[_0x3620e6(0x389)]+0x14;_0xd100f9-=_0x44df21,VisuMZ[_0x3620e6(0x44d)][_0x3620e6(0x446)][_0x3620e6(0x47e)][_0x3620e6(0x489)]&&(_0xd100f9-=_0x44df21);}let _0x1d7dbb=![];if(_0x3d99f1['x']+_0xd93e22>_0x3d99f1[_0x3620e6(0x41b)]+_0xd100f9)_0x1d7dbb=!![];if(_0xd93e22===0x0)_0x1d7dbb=!![];_0x1d7dbb&&(_0x3d99f1[_0x3620e6(0x2c3)]=_0x3d99f1[_0x3620e6(0x2c3)]['slice'](0x0,_0x3d99f1['index'])+'\x0a'+_0x3d99f1[_0x3620e6(0x2c3)]['substr'](_0x3d99f1[_0x3620e6(0x388)]));},Window_Base[_0x488928(0x2fa)][_0x488928(0x350)]=function(_0x19e4de){const _0x940178=_0x488928,_0x5b037c=this[_0x940178(0x3f3)](_0x19e4de,0x0,0x0,0x0),_0xb916a=this['getPreservedFontSettings']();return _0x5b037c[_0x940178(0x231)]=![],this[_0x940178(0x3eb)](![]),this['processAllText'](_0x5b037c),this['setWordWrap'](!![]),this[_0x940178(0x1e1)](_0xb916a),{'width':_0x5b037c['outputWidth'],'height':_0x5b037c[_0x940178(0x373)]};},Window_Base['prototype'][_0x488928(0x242)]=function(_0x529a2b){const _0x337ad1=_0x488928;return this[_0x337ad1(0x1f2)](_0x529a2b);},Window_Base[_0x488928(0x2fa)][_0x488928(0x453)]=function(_0x573aaf){const _0x54690d=_0x488928,_0x15d10d=this['obtainEscapeString'](_0x573aaf)[_0x54690d(0x471)](',');if(!_0x573aaf[_0x54690d(0x231)])return;const _0xec9de9=_0x15d10d[0x0][_0x54690d(0x1fe)](),_0x5e150b=_0x15d10d[0x1]||0x0,_0x507d7b=_0x15d10d[0x2]||0x0,_0xc958b6=ImageManager['loadPicture'](_0xec9de9),_0x5e7277=this['contents'][_0x54690d(0x437)];_0xc958b6['addLoadListener'](this[_0x54690d(0x43a)][_0x54690d(0x270)](this,_0xc958b6,_0x573aaf['x'],_0x573aaf['y'],_0x5e150b,_0x507d7b,_0x5e7277));},Window_Base[_0x488928(0x2fa)][_0x488928(0x43a)]=function(_0x523d0b,_0x5c33cf,_0x2e432d,_0x257dd9,_0x1c4e68,_0x5cc4cd){const _0x9aa7a0=_0x488928;_0x257dd9=_0x257dd9||_0x523d0b[_0x9aa7a0(0x42f)],_0x1c4e68=_0x1c4e68||_0x523d0b['height'],this[_0x9aa7a0(0x3aa)][_0x9aa7a0(0x437)]=_0x5cc4cd,this['contentsBack'][_0x9aa7a0(0x267)](_0x523d0b,0x0,0x0,_0x523d0b[_0x9aa7a0(0x42f)],_0x523d0b['height'],_0x5c33cf,_0x2e432d,_0x257dd9,_0x1c4e68),this[_0x9aa7a0(0x3aa)][_0x9aa7a0(0x437)]=0xff;},Window_Base[_0x488928(0x2fa)][_0x488928(0x28c)]=function(_0x8ca17e){const _0x3ebb2a=_0x488928,_0x2ea547=this[_0x3ebb2a(0x480)](_0x8ca17e)[_0x3ebb2a(0x471)](',');if(!_0x8ca17e['drawing'])return;const _0x1f02ff=_0x2ea547[0x0][_0x3ebb2a(0x1fe)](),_0xcfc3af=ImageManager[_0x3ebb2a(0x2dc)](_0x1f02ff),_0x34d444=JsonEx[_0x3ebb2a(0x3c2)](_0x8ca17e),_0x5e5dec=this[_0x3ebb2a(0x375)][_0x3ebb2a(0x437)];_0xcfc3af[_0x3ebb2a(0x1ed)](this[_0x3ebb2a(0x42c)][_0x3ebb2a(0x270)](this,_0xcfc3af,_0x34d444,_0x5e5dec));},Window_Base[_0x488928(0x2fa)][_0x488928(0x42c)]=function(_0x50f066,_0x3dc449,_0x151b53){const _0x1599ce=_0x488928,_0x3e43c2=_0x3dc449[_0x1599ce(0x42f)]||this['innerWidth'],_0xc5563a=this[_0x1599ce(0x3fa)]!==undefined?this[_0x1599ce(0x474)]():this[_0x1599ce(0x36f)],_0x1fa085=_0x3e43c2/_0x50f066[_0x1599ce(0x42f)],_0x53c825=_0xc5563a/_0x50f066[_0x1599ce(0x200)],_0x267dfb=Math[_0x1599ce(0x32d)](_0x1fa085,_0x53c825,0x1),_0x5bd8e7=this['_index']!==undefined?(this[_0x1599ce(0x2d0)](0x0)['height']-this[_0x1599ce(0x34c)]())/0x2:0x0,_0x924c72=_0x50f066[_0x1599ce(0x42f)]*_0x267dfb,_0x437cae=_0x50f066[_0x1599ce(0x200)]*_0x267dfb,_0x1bb7f3=Math[_0x1599ce(0x4b4)]((_0x3e43c2-_0x924c72)/0x2)+_0x3dc449[_0x1599ce(0x41b)],_0x16a308=Math['floor']((_0xc5563a-_0x437cae)/0x2)+_0x3dc449[_0x1599ce(0x4a5)]-_0x5bd8e7*0x2;this[_0x1599ce(0x3aa)]['paintOpacity']=_0x151b53,this[_0x1599ce(0x3aa)][_0x1599ce(0x267)](_0x50f066,0x0,0x0,_0x50f066[_0x1599ce(0x42f)],_0x50f066['height'],_0x1bb7f3,_0x16a308,_0x924c72,_0x437cae),this['contentsBack'][_0x1599ce(0x437)]=0xff;},Window_Base[_0x488928(0x2fa)][_0x488928(0x291)]=function(_0x28819c){const _0x356bc2=_0x488928,_0x35b4f1=this[_0x356bc2(0x1f2)](_0x28819c);if(_0x28819c[_0x356bc2(0x231)])this['setColorLock'](_0x35b4f1>0x0);},Window_Base[_0x488928(0x2fa)]['processCustomWait']=function(_0x4d93bc){const _0x5cf0cc=_0x488928,_0x12de82=this[_0x5cf0cc(0x1f2)](_0x4d93bc);this[_0x5cf0cc(0x218)]===Window_Message&&_0x4d93bc[_0x5cf0cc(0x231)]&&this['startWait'](_0x12de82);},Window_Help[_0x488928(0x2fa)]['resetWordWrap']=function(){const _0x3bc570=_0x488928;this[_0x3bc570(0x3eb)]($gameSystem[_0x3bc570(0x4b0)]());},Window_Help['prototype'][_0x488928(0x3ac)]=function(){return!![];},VisuMZ[_0x488928(0x44d)]['Window_Help_refresh']=Window_Help[_0x488928(0x2fa)][_0x488928(0x39e)],Window_Help[_0x488928(0x2fa)][_0x488928(0x39e)]=function(){const _0xb44288=_0x488928;this[_0xb44288(0x32c)](),VisuMZ[_0xb44288(0x44d)][_0xb44288(0x1d9)]['call'](this),this[_0xb44288(0x1fd)]();},VisuMZ['MessageCore']['Window_Options_addGeneralOptions']=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x488928(0x2fa)][_0x488928(0x311)]=function(){const _0x279a43=_0x488928;VisuMZ['MessageCore']['Window_Options_addGeneralOptions'][_0x279a43(0x2ed)](this),this[_0x279a43(0x2b5)]();},Window_Options[_0x488928(0x2fa)]['addMessageCoreCommands']=function(){const _0x2ff516=_0x488928;VisuMZ[_0x2ff516(0x44d)]['Settings'][_0x2ff516(0x237)][_0x2ff516(0x1d6)]&&this[_0x2ff516(0x392)]();},Window_Options['prototype'][_0x488928(0x392)]=function(){const _0x2a740b=_0x488928,_0x2fe7b9=TextManager[_0x2a740b(0x33a)],_0x59397d=_0x2a740b(0x32e);this[_0x2a740b(0x30d)](_0x2fe7b9,_0x59397d);},VisuMZ[_0x488928(0x44d)]['Window_Options_statusText']=Window_Options[_0x488928(0x2fa)]['statusText'],Window_Options[_0x488928(0x2fa)]['statusText']=function(_0x84c565){const _0x48e3c9=_0x488928,_0x4ec7fb=this[_0x48e3c9(0x2f2)](_0x84c565);if(_0x4ec7fb==='textSpeed')return this['textSpeedStatusText']();return VisuMZ[_0x48e3c9(0x44d)]['Window_Options_statusText'][_0x48e3c9(0x2ed)](this,_0x84c565);},VisuMZ['MessageCore'][_0x488928(0x2e6)]=Window_Options[_0x488928(0x2fa)][_0x488928(0x326)],Window_Options[_0x488928(0x2fa)][_0x488928(0x326)]=function(_0x291a69){const _0x2e0d85=_0x488928;if(_0x291a69===_0x2e0d85(0x32e))return!![];return VisuMZ['MessageCore'][_0x2e0d85(0x2e6)][_0x2e0d85(0x2ed)](this,_0x291a69);},Window_Options[_0x488928(0x2fa)][_0x488928(0x41e)]=function(){const _0x1cf0fb=_0x488928,_0x417bd8=this[_0x1cf0fb(0x466)](_0x1cf0fb(0x32e));return _0x417bd8>0xa?TextManager[_0x1cf0fb(0x280)]:_0x417bd8;},VisuMZ[_0x488928(0x44d)][_0x488928(0x271)]=Window_Options['prototype']['changeVolume'],Window_Options[_0x488928(0x2fa)][_0x488928(0x3a1)]=function(_0x2cb229,_0x143cd6,_0x414017){const _0x62bcf1=_0x488928;if(_0x2cb229===_0x62bcf1(0x32e))return this['changeTextSpeed'](_0x2cb229,_0x143cd6,_0x414017);VisuMZ['MessageCore'][_0x62bcf1(0x271)]['call'](this,_0x2cb229,_0x143cd6,_0x414017);},Window_Options[_0x488928(0x2fa)][_0x488928(0x2ab)]=function(_0x4ff369,_0x46c829,_0x4bc07b){const _0x491a23=_0x488928,_0x1fdaf2=this[_0x491a23(0x466)](_0x4ff369),_0x59c3e3=0x1,_0x21f973=_0x1fdaf2+(_0x46c829?_0x59c3e3:-_0x59c3e3);_0x21f973>0xb&&_0x4bc07b?this[_0x491a23(0x37c)](_0x4ff369,0x1):this[_0x491a23(0x37c)](_0x4ff369,_0x21f973[_0x491a23(0x234)](0x1,0xb));},Window_Message[_0x488928(0x2fa)][_0x488928(0x4a0)]=function(){const _0x28d698=_0x488928;let _0x533efd=Window_Base[_0x28d698(0x2fa)][_0x28d698(0x4a0)][_0x28d698(0x2ed)](this);return _0x533efd-=this[_0x28d698(0x26b)](),_0x533efd;},Window_Message[_0x488928(0x2fa)]['refreshDimmerBitmap']=function(){const _0x5261ba=_0x488928;Window_Base[_0x5261ba(0x2fa)][_0x5261ba(0x327)][_0x5261ba(0x2ed)](this),VisuMZ[_0x5261ba(0x44d)][_0x5261ba(0x446)]['General'][_0x5261ba(0x414)]&&this[_0x5261ba(0x1ff)]();},Window_Message[_0x488928(0x2fa)][_0x488928(0x1ff)]=function(){const _0x410747=_0x488928;this[_0x410747(0x3d8)]['x']=Math[_0x410747(0x4a8)](this[_0x410747(0x42f)]/0x2),this[_0x410747(0x3d8)]['anchor']['x']=0.5,this[_0x410747(0x3d8)]['scale']['x']=Graphics[_0x410747(0x42f)];},VisuMZ[_0x488928(0x44d)]['Window_Message_clearFlags']=Window_Message[_0x488928(0x2fa)][_0x488928(0x336)],Window_Message[_0x488928(0x2fa)][_0x488928(0x336)]=function(){const _0x1767bf=_0x488928;VisuMZ['MessageCore'][_0x1767bf(0x28f)]['call'](this),this[_0x1767bf(0x32c)](),this[_0x1767bf(0x1fd)](),this['setColorLock'](![]),this[_0x1767bf(0x25f)](_0x1767bf(0x429)),this[_0x1767bf(0x1f4)](VisuMZ[_0x1767bf(0x44d)][_0x1767bf(0x446)][_0x1767bf(0x425)][_0x1767bf(0x325)]);},Window_Message[_0x488928(0x2fa)][_0x488928(0x1fd)]=function(){const _0x41a302=_0x488928;this['setWordWrap']($gameSystem[_0x41a302(0x227)]());},Window_Message[_0x488928(0x2fa)][_0x488928(0x3ac)]=function(){return!![];},Window_Message[_0x488928(0x2fa)]['setTextDelay']=function(_0x477101){const _0x5c1344=_0x488928,_0x329a62=0xb-ConfigManager[_0x5c1344(0x32e)];_0x477101=Math[_0x5c1344(0x4a8)](_0x477101*_0x329a62),this[_0x5c1344(0x21b)]=_0x477101,this['_textDelay']=_0x477101;},VisuMZ[_0x488928(0x44d)][_0x488928(0x395)]=Window_Message['prototype']['isTriggered'],Window_Message['prototype'][_0x488928(0x323)]=function(){const _0x188aa4=_0x488928;return VisuMZ[_0x188aa4(0x44d)][_0x188aa4(0x395)][_0x188aa4(0x2ed)](this)||Input[_0x188aa4(0x1ef)](VisuMZ[_0x188aa4(0x44d)]['Settings']['General']['FastForwardKey']);},VisuMZ[_0x488928(0x44d)][_0x488928(0x2d9)]=Window_Message[_0x488928(0x2fa)][_0x488928(0x449)],Window_Message[_0x488928(0x2fa)][_0x488928(0x449)]=function(){const _0xf900e2=_0x488928;let _0x2febed=this['y'];this['x']=Math[_0xf900e2(0x4a8)]((Graphics[_0xf900e2(0x26e)]-this[_0xf900e2(0x42f)])/0x2),VisuMZ[_0xf900e2(0x44d)][_0xf900e2(0x2d9)]['call'](this);if(this[_0xf900e2(0x2f7)])this['y']=_0x2febed;this[_0xf900e2(0x364)](),this[_0xf900e2(0x258)](),this['clampPlacementPosition'](),this['updateChoiceListHelpWindowPlacement']();},VisuMZ['MessageCore'][_0x488928(0x31f)]=Window_Message[_0x488928(0x2fa)][_0x488928(0x492)],Window_Message[_0x488928(0x2fa)]['newPage']=function(_0x16e2b3){const _0x5ae854=_0x488928;this[_0x5ae854(0x43f)](_0x16e2b3),this[_0x5ae854(0x362)](_0x16e2b3),VisuMZ['MessageCore'][_0x5ae854(0x31f)][_0x5ae854(0x2ed)](this,_0x16e2b3),this[_0x5ae854(0x3c9)]();},Window_Message['prototype'][_0x488928(0x43f)]=function(_0x5410ad){const _0x49a314=_0x488928;if(!_0x5410ad)return;this[_0x49a314(0x38d)]=![],_0x5410ad[_0x49a314(0x2c3)]=this[_0x49a314(0x203)](_0x5410ad[_0x49a314(0x2c3)]),this['_textMacroFound']&&(_0x5410ad['text']=this['prepareWordWrapEscapeCharacters'](_0x5410ad['text']),this[_0x49a314(0x38d)]=!![]);},Window_Message[_0x488928(0x2fa)][_0x488928(0x2df)]=function(_0x165317){const _0x4d37f0=_0x488928;if(this['_macroBypassWordWrap'])return _0x165317;return Window_Base[_0x4d37f0(0x2fa)][_0x4d37f0(0x2df)]['call'](this,_0x165317);},Window_Message[_0x488928(0x2fa)][_0x488928(0x362)]=function(_0x5b3555){const _0x1c0258=_0x488928;this[_0x1c0258(0x1db)](_0x5b3555),this['prepareAutoSizeEscapeCharacters'](_0x5b3555),this['updateDimensions']();},VisuMZ[_0x488928(0x44d)][_0x488928(0x27c)]=Window_Message['prototype'][_0x488928(0x2b2)],Window_Message[_0x488928(0x2fa)][_0x488928(0x2b2)]=function(){const _0x30eb1b=_0x488928;VisuMZ[_0x30eb1b(0x44d)][_0x30eb1b(0x27c)][_0x30eb1b(0x2ed)](this),this[_0x30eb1b(0x336)]();if(this[_0x30eb1b(0x3a8)])this[_0x30eb1b(0x3b4)]();},Window_Message['prototype']['updateDimensions']=function(){const _0x4fc374=_0x488928;this[_0x4fc374(0x42f)]=$gameSystem[_0x4fc374(0x45f)]()+this['addedWidth']();;this[_0x4fc374(0x42f)]=Math['min'](Graphics[_0x4fc374(0x42f)],this[_0x4fc374(0x42f)]);const _0x511cc1=$gameSystem['getMessageWindowRows']();this[_0x4fc374(0x200)]=SceneManager[_0x4fc374(0x2af)][_0x4fc374(0x406)](_0x511cc1,![])+this[_0x4fc374(0x26b)](),this[_0x4fc374(0x200)]=Math[_0x4fc374(0x32d)](Graphics['height'],this[_0x4fc374(0x200)]);if($gameTemp[_0x4fc374(0x298)])this[_0x4fc374(0x330)]();},Window_Message[_0x488928(0x2fa)]['addedWidth']=function(){return 0x0;},Window_Message[_0x488928(0x2fa)]['addedHeight']=function(){return 0x0;},Window_Message[_0x488928(0x2fa)][_0x488928(0x330)]=function(){const _0x5311a1=_0x488928;this['x']=(Graphics[_0x5311a1(0x26e)]-this['width'])/0x2,$gameTemp[_0x5311a1(0x298)]=undefined,this[_0x5311a1(0x2b7)]();},Window_Message[_0x488928(0x2fa)]['updateMove']=function(){const _0x404241=_0x488928,_0x46cc32={'x':this['x'],'y':this['y']};Window_Base[_0x404241(0x2fa)]['updateMove'][_0x404241(0x2ed)](this),this[_0x404241(0x34e)](_0x46cc32);},Window_Message['prototype'][_0x488928(0x3d2)]=function(){return!![];},Window_Message[_0x488928(0x2fa)][_0x488928(0x34e)]=function(_0x1cd0aa){const _0x436494=_0x488928;this['_nameBoxWindow']&&(this[_0x436494(0x2c8)]['x']+=this['x']-_0x1cd0aa['x'],this[_0x436494(0x2c8)]['y']+=this['y']-_0x1cd0aa['y']);},Window_Message[_0x488928(0x2fa)][_0x488928(0x49d)]=function(_0x95717d,_0x26ba39){const _0x357915=_0x488928;this[_0x357915(0x275)](this[_0x357915(0x3bc)]['x'],this['_positionType']*(Graphics['boxHeight']-this[_0x357915(0x200)])/0x2,this[_0x357915(0x3bc)][_0x357915(0x42f)],this[_0x357915(0x3bc)][_0x357915(0x200)],_0x95717d,_0x26ba39);},Window_Message[_0x488928(0x2fa)][_0x488928(0x242)]=function(_0x1d5732){const _0x4b4037=_0x488928,_0x3d866b=Window_Base['prototype'][_0x4b4037(0x242)]['call'](this,_0x1d5732);_0x1d5732[_0x4b4037(0x231)]&&this[_0x4b4037(0x426)](_0x3d866b);},Window_Message[_0x488928(0x2fa)][_0x488928(0x426)]=function(_0x30c061){const _0xa07856=_0x488928;if($gameParty[_0xa07856(0x260)]()){}else $gameMap[_0xa07856(0x3fb)](_0x30c061);},Window_Message[_0x488928(0x2fa)][_0x488928(0x2c6)]=function(_0x389026){const _0x2f9991=_0x488928;this[_0x2f9991(0x21b)]--,this[_0x2f9991(0x21b)]<=0x0&&(this['onProcessCharacter'](_0x389026),Window_Base[_0x2f9991(0x2fa)][_0x2f9991(0x2c6)][_0x2f9991(0x2ed)](this,_0x389026));},Window_Message[_0x488928(0x2fa)][_0x488928(0x3a9)]=function(_0x3d8a09){const _0x4d6b2a=_0x488928;this['_textDelayCount']=this[_0x4d6b2a(0x25b)];if(this['_textDelay']<=0x0)this[_0x4d6b2a(0x283)]=!![];},VisuMZ['MessageCore']['Window_Message_processEscapeCharacter']=Window_Message[_0x488928(0x2fa)][_0x488928(0x43d)],Window_Message['prototype'][_0x488928(0x43d)]=function(_0x29992c,_0x54e46c){const _0x56ba73=_0x488928;!_0x54e46c['drawing']?Window_Base[_0x56ba73(0x2fa)][_0x56ba73(0x43d)][_0x56ba73(0x2ed)](this,_0x29992c,_0x54e46c):VisuMZ['MessageCore'][_0x56ba73(0x3dd)][_0x56ba73(0x2ed)](this,_0x29992c,_0x54e46c);},VisuMZ[_0x488928(0x44d)][_0x488928(0x3c8)]=Window_Message['prototype'][_0x488928(0x31a)],Window_Message[_0x488928(0x2fa)]['needsNewPage']=function(_0x3d8ed9){const _0x59ab3b=_0x488928;if(this[_0x59ab3b(0x347)])return![];return VisuMZ[_0x59ab3b(0x44d)][_0x59ab3b(0x3c8)]['call'](this,_0x3d8ed9);},Window_Message[_0x488928(0x2fa)][_0x488928(0x1db)]=function(_0x27375b){const _0x88cf40=_0x488928;let _0x4fd7d7=_0x27375b[_0x88cf40(0x2c3)];this[_0x88cf40(0x3e5)]={};if(this[_0x88cf40(0x36a)]())return _0x4fd7d7;_0x4fd7d7=_0x4fd7d7[_0x88cf40(0x329)](/<POSITION:[ ]*(.*?)>/gi,(_0x4e1768,_0x2b6aaa)=>{const _0x5472d7=_0x88cf40,_0x1013ae=_0x2b6aaa[_0x5472d7(0x471)](',')['map'](_0x3cc2ab=>Number(_0x3cc2ab)||0x0);if(_0x1013ae[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x1013ae[0x0]);if(_0x1013ae[0x1]!==undefined)this[_0x5472d7(0x3e5)]['y']=Number(_0x1013ae[0x1]);if(_0x1013ae[0x2]!==undefined)this[_0x5472d7(0x3e5)][_0x5472d7(0x42f)]=Number(_0x1013ae[0x2]);if(_0x1013ae[0x3]!==undefined)this[_0x5472d7(0x3e5)][_0x5472d7(0x200)]=Number(_0x1013ae[0x3]);return'';}),_0x4fd7d7=_0x4fd7d7['replace'](/<COORDINATES:[ ]*(.*?)>/gi,(_0x1b0820,_0x3af570)=>{const _0x1361ef=_0x88cf40,_0x3f3096=_0x3af570[_0x1361ef(0x471)](',')['map'](_0x38d3a8=>Number(_0x38d3a8)||0x0);if(_0x3f3096[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x3f3096[0x0]);if(_0x3f3096[0x1]!==undefined)this[_0x1361ef(0x3e5)]['y']=Number(_0x3f3096[0x1]);return'';}),_0x4fd7d7=_0x4fd7d7['replace'](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x1498e0,_0x2303a9)=>{const _0xb8faf3=_0x88cf40,_0x2ba4ec=_0x2303a9[_0xb8faf3(0x471)](',')['map'](_0x37cba6=>Number(_0x37cba6)||0x0);if(_0x2ba4ec[0x0]!==undefined)this[_0xb8faf3(0x3e5)][_0xb8faf3(0x42f)]=Number(_0x2ba4ec[0x2]);if(_0x2ba4ec[0x1]!==undefined)this[_0xb8faf3(0x3e5)][_0xb8faf3(0x200)]=Number(_0x2ba4ec[0x3]);return'';}),_0x4fd7d7=_0x4fd7d7[_0x88cf40(0x329)](/<OFFSET:[ ]*(.*?)>/gi,(_0x4f1047,_0x28ffc9)=>{const _0x2885ae=_0x88cf40,_0x5e4dc6=_0x28ffc9[_0x2885ae(0x471)](',')[_0x2885ae(0x27a)](_0x3c4b64=>Number(_0x3c4b64)||0x0);let _0x2ab622=_0x5e4dc6[0x0]||0x0,_0x17820d=_0x5e4dc6[0x1]||0x0;return $gameSystem[_0x2885ae(0x308)](_0x2ab622,_0x17820d),'';}),_0x27375b[_0x88cf40(0x2c3)]=_0x4fd7d7;},Window_Message[_0x488928(0x2fa)][_0x488928(0x364)]=function(){const _0x2fed68=_0x488928,_0x396d0b=$gameSystem[_0x2fed68(0x486)]();this['x']+=_0x396d0b['x'],this['y']+=_0x396d0b['y'];},Window_Message[_0x488928(0x2fa)][_0x488928(0x258)]=function(){const _0x545774=_0x488928;this[_0x545774(0x3e5)]=this[_0x545774(0x3e5)]||{};const _0x1b0b4d=['x','y',_0x545774(0x42f),'height'];for(const _0xa6c76f of _0x1b0b4d){this['_forcedPosition'][_0xa6c76f]!==undefined&&(this[_0xa6c76f]=Number(this[_0x545774(0x3e5)][_0xa6c76f]));}},Window_Message[_0x488928(0x2fa)][_0x488928(0x371)]=function(_0x448f4f){const _0x54a953=_0x488928;this[_0x54a953(0x347)]=![];let _0x16d4c7=_0x448f4f[_0x54a953(0x2c3)];_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x365cf1=_0x54a953;return this[_0x365cf1(0x22d)](_0x16d4c7,!![],!![]),this[_0x365cf1(0x221)](_0x365cf1(0x1f1)),'';}),_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x427d8d=_0x54a953;return this[_0x427d8d(0x22d)](_0x16d4c7,!![],![]),this[_0x427d8d(0x221)](_0x427d8d(0x1f1)),'';}),_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x55dd6d=_0x54a953;return this['processAutoSize'](_0x16d4c7,![],!![]),this['processAutoPosition'](_0x55dd6d(0x1f1)),'';});if(SceneManager[_0x54a953(0x359)]())_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4daf2e,_0x10d6b6)=>{const _0x45146d=_0x54a953;return this['processAutoSize'](_0x16d4c7,!![],!![]),this['processAutoPosition'](_0x45146d(0x457),Number(_0x10d6b6)||0x1),'';}),_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0xa43d17,_0x37cb5e)=>{const _0x11ad80=_0x54a953;return this['processAutoSize'](_0x16d4c7,!![],!![]),this[_0x11ad80(0x221)]('battle\x20party',Number(_0x37cb5e)||0x0),'';}),_0x16d4c7=_0x16d4c7['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2a42e0,_0x21f6c2)=>{const _0x5c10b3=_0x54a953;return this[_0x5c10b3(0x22d)](_0x16d4c7,!![],!![]),this[_0x5c10b3(0x221)](_0x5c10b3(0x481),Number(_0x21f6c2)||0x0),'';});else SceneManager['isSceneMap']()&&(_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x56f4b6,_0xd41e37)=>{const _0x506029=_0x54a953;return this[_0x506029(0x22d)](_0x16d4c7,!![],!![]),this['processAutoPosition'](_0x506029(0x24d),0x0),'';}),_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xf2782c,_0x761d62)=>{const _0x3e7d5f=_0x54a953;return this[_0x3e7d5f(0x22d)](_0x16d4c7,!![],!![]),this[_0x3e7d5f(0x221)](_0x3e7d5f(0x29c),Number(_0x761d62)||0x1),'';}),_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x37f153,_0x43f8ef)=>{const _0x448c0c=_0x54a953;return this[_0x448c0c(0x22d)](_0x16d4c7,!![],!![]),this[_0x448c0c(0x221)](_0x448c0c(0x2eb),Number(_0x43f8ef)||0x0),'';}),_0x16d4c7=_0x16d4c7[_0x54a953(0x329)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x5468f6,_0x1d2ad9)=>{const _0x3a1388=_0x54a953;return this[_0x3a1388(0x22d)](_0x16d4c7,!![],!![]),this[_0x3a1388(0x221)]('map\x20event',Number(_0x1d2ad9)||0x0),'';}));_0x448f4f['text']=_0x16d4c7;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x488928(0x30e)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x488928(0x2fa)][_0x488928(0x22d)]=function(_0x59224b,_0x3828fe,_0x3d5b05){const _0x4c0a28=_0x488928;_0x59224b=_0x59224b[_0x4c0a28(0x329)](Window_Message[_0x4c0a28(0x3c5)],''),_0x59224b=_0x59224b[_0x4c0a28(0x329)](Window_Message['_autoPosRegExp'],''),this[_0x4c0a28(0x20a)]=!![],this[_0x4c0a28(0x347)]=!![],this[_0x4c0a28(0x3eb)](![]);const _0x1b5b45=this['textSizeExRaw'](_0x59224b);if(_0x3828fe){let _0x9ed2c9=_0x1b5b45[_0x4c0a28(0x42f)]+$gameSystem[_0x4c0a28(0x313)]()*0x2+0x6;const _0x13d157=$gameMessage[_0x4c0a28(0x43c)]()!=='',_0x1f4438=ImageManager[_0x4c0a28(0x389)],_0x8cba13=0x14;_0x9ed2c9+=_0x13d157?_0x1f4438+_0x8cba13:0x4;if(_0x9ed2c9%0x2!==0x0)_0x9ed2c9+=0x1;$gameSystem[_0x4c0a28(0x29d)](_0x9ed2c9);}if(_0x3d5b05){let _0x3976fc=Math['ceil'](_0x1b5b45[_0x4c0a28(0x200)]/this[_0x4c0a28(0x34c)]());$gameSystem['setMessageWindowRows'](_0x3976fc);}this[_0x4c0a28(0x2cf)](),this[_0x4c0a28(0x44a)](),this[_0x4c0a28(0x20a)]=![],this['_messagePositionReset']=!![];},Window_Message[_0x488928(0x2fa)][_0x488928(0x2cf)]=function(){const _0x37e4d8=_0x488928;this[_0x37e4d8(0x490)](),this['updatePlacement'](),this[_0x37e4d8(0x330)](),this['updateTransform'](),this[_0x37e4d8(0x375)][_0x37e4d8(0x27d)](),this['createContents']();},Window_Message[_0x488928(0x2fa)]['processAutoPosition']=function(_0x231a4e,_0x3cc702){const _0x122c21=_0x488928;switch(_0x231a4e['toLowerCase']()[_0x122c21(0x1fe)]()){case _0x122c21(0x457):this[_0x122c21(0x2f7)]=$gameActors[_0x122c21(0x334)](_0x3cc702);break;case _0x122c21(0x42b):this['_autoPositionTarget']=$gameParty[_0x122c21(0x4af)]()[_0x3cc702-0x1];break;case _0x122c21(0x481):this[_0x122c21(0x2f7)]=$gameTroop['members']()[_0x3cc702-0x1];break;case _0x122c21(0x24d):this[_0x122c21(0x2f7)]=$gamePlayer;break;case _0x122c21(0x29c):const _0x247046=$gameActors[_0x122c21(0x334)](_0x3cc702)[_0x122c21(0x388)]();_0x247046===0x0?this[_0x122c21(0x2f7)]=$gamePlayer:this[_0x122c21(0x2f7)]=$gamePlayer[_0x122c21(0x384)]()['follower'](_0x247046-0x1);break;case _0x122c21(0x2eb):_0x3cc702===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x122c21(0x2f7)]=$gamePlayer[_0x122c21(0x384)]()[_0x122c21(0x374)](_0x3cc702-0x2);break;case _0x122c21(0x2f0):this['_autoPositionTarget']=$gameMap[_0x122c21(0x3d6)](_0x3cc702);break;}this['_autoPositionTarget']&&this[_0x122c21(0x3bd)]();},VisuMZ[_0x488928(0x44d)][_0x488928(0x48c)]=Window_Message[_0x488928(0x2fa)][_0x488928(0x3a5)],Window_Message[_0x488928(0x2fa)]['synchronizeNameBox']=function(){const _0x3335e1=_0x488928;this[_0x3335e1(0x3bd)](),VisuMZ[_0x3335e1(0x44d)][_0x3335e1(0x48c)]['call'](this);},Window_Message[_0x488928(0x2fa)]['updateAutoPosition']=function(){const _0x2a963c=_0x488928;if(!this[_0x2a963c(0x2f7)])return;const _0x4aa92a=SceneManager['_scene'];if(!_0x4aa92a)return;if(!_0x4aa92a[_0x2a963c(0x30a)])return;const _0x34de98=_0x4aa92a['_spriteset'][_0x2a963c(0x224)](this['_autoPositionTarget']);if(!_0x34de98)return;let _0x42195=_0x34de98['x'];_0x42195-=this[_0x2a963c(0x42f)]/0x2,_0x42195-=(Graphics[_0x2a963c(0x42f)]-Graphics['boxWidth'])/0x2,_0x42195+=this[_0x2a963c(0x250)]();let _0x39c77a=_0x34de98['y'];_0x39c77a-=this[_0x2a963c(0x200)],_0x39c77a-=(Graphics[_0x2a963c(0x200)]-Graphics[_0x2a963c(0x248)])/0x2,_0x39c77a+=this[_0x2a963c(0x3d0)](),_0x39c77a-=_0x34de98[_0x2a963c(0x200)]+0x8;const _0x509e80=$gameSystem[_0x2a963c(0x486)]();_0x42195+=_0x509e80['x'],_0x39c77a+=_0x509e80['y'],this['x']=Math[_0x2a963c(0x4a8)](_0x42195),this['y']=Math[_0x2a963c(0x4a8)](_0x39c77a),this[_0x2a963c(0x2b7)](!![],![]),this[_0x2a963c(0x3e5)]=this['_forcedPosition']||{},this[_0x2a963c(0x3e5)]['x']=this['x'],this[_0x2a963c(0x3e5)]['y']=this['y'],this[_0x2a963c(0x3e5)][_0x2a963c(0x42f)]=this['width'],this[_0x2a963c(0x3e5)][_0x2a963c(0x200)]=this[_0x2a963c(0x200)],this[_0x2a963c(0x2c8)]['updatePlacement']();},Window_Message['prototype'][_0x488928(0x250)]=function(){return 0x0;},Window_Message['prototype'][_0x488928(0x3d0)]=function(){return 0x0;},Window_Message[_0x488928(0x2fa)][_0x488928(0x3b4)]=function(){const _0x1e0e34=_0x488928;this[_0x1e0e34(0x3a8)]=![],this[_0x1e0e34(0x2f7)]=undefined,$gameSystem[_0x1e0e34(0x3ce)](),this[_0x1e0e34(0x2cf)](),this['openness']=0x0;},Window_Message[_0x488928(0x2fa)][_0x488928(0x2e8)]=function(_0x942dec){const _0x1662ee=_0x488928;return Window_Base[_0x1662ee(0x2fa)][_0x1662ee(0x2e8)][_0x1662ee(0x2ed)](this,_0x942dec);},Window_Message[_0x488928(0x2fa)][_0x488928(0x4ac)]=function(_0x56d284){const _0x55fb7a=_0x488928;return Window_Base[_0x55fb7a(0x2fa)][_0x55fb7a(0x4ac)][_0x55fb7a(0x2ed)](this,_0x56d284);},Window_Message[_0x488928(0x2fa)][_0x488928(0x2dd)]=function(_0x3518d4){const _0x546b66=_0x488928;this['preFlushTextState'](_0x3518d4),Window_Base['prototype'][_0x546b66(0x2dd)][_0x546b66(0x2ed)](this,_0x3518d4),this[_0x546b66(0x40e)](_0x3518d4);},Window_Message[_0x488928(0x2fa)][_0x488928(0x1d8)]=function(_0x189009){},Window_Message['prototype'][_0x488928(0x40e)]=function(_0x7c1ffa){},Window_NameBox[_0x488928(0x2fa)][_0x488928(0x3ac)]=function(){return![];},Window_NameBox[_0x488928(0x2fa)][_0x488928(0x46a)]=function(){const _0xcff932=_0x488928;Window_Base[_0xcff932(0x2fa)]['resetTextColor'][_0xcff932(0x2ed)](this),this[_0xcff932(0x2c2)](this[_0xcff932(0x351)]());},Window_NameBox[_0x488928(0x2fa)]['defaultColor']=function(){const _0x5ff651=_0x488928,_0x311e61=VisuMZ[_0x5ff651(0x44d)][_0x5ff651(0x446)][_0x5ff651(0x425)][_0x5ff651(0x244)];return ColorManager['textColor'](_0x311e61);},VisuMZ[_0x488928(0x44d)][_0x488928(0x41c)]=Window_NameBox[_0x488928(0x2fa)]['updatePlacement'],Window_NameBox[_0x488928(0x2fa)][_0x488928(0x449)]=function(){const _0xdadb8=_0x488928;VisuMZ['MessageCore'][_0xdadb8(0x41c)]['call'](this),this[_0xdadb8(0x381)](),this[_0xdadb8(0x405)](),this[_0xdadb8(0x2b7)](),this[_0xdadb8(0x333)]();},Window_NameBox[_0x488928(0x2fa)][_0x488928(0x2e8)]=function(_0x48e30a){const _0x5702da=_0x488928;return _0x48e30a=_0x48e30a[_0x5702da(0x329)](/<LEFT>/gi,this[_0x5702da(0x44f)]['bind'](this,0x0)),_0x48e30a=_0x48e30a[_0x5702da(0x329)](/<CENTER>/gi,this[_0x5702da(0x44f)][_0x5702da(0x270)](this,0x5)),_0x48e30a=_0x48e30a[_0x5702da(0x329)](/<RIGHT>/gi,this[_0x5702da(0x44f)][_0x5702da(0x270)](this,0xa)),_0x48e30a=_0x48e30a[_0x5702da(0x329)](/<POSITION:[ ](\d+)>/gi,(_0x285bc1,_0x181857)=>this[_0x5702da(0x44f)](parseInt(_0x181857))),_0x48e30a=_0x48e30a[_0x5702da(0x329)](/<\/LEFT>/gi,''),_0x48e30a=_0x48e30a[_0x5702da(0x329)](/<\/CENTER>/gi,''),_0x48e30a=_0x48e30a[_0x5702da(0x329)](/<\/RIGHT>/gi,''),Window_Base[_0x5702da(0x2fa)][_0x5702da(0x2e8)][_0x5702da(0x2ed)](this,_0x48e30a);},Window_NameBox['prototype'][_0x488928(0x44f)]=function(_0x58ee65){return this['_relativePosition']=_0x58ee65,'';},Window_NameBox[_0x488928(0x2fa)][_0x488928(0x381)]=function(){const _0x1cc8e7=_0x488928;if($gameMessage['isRTL']())return;this[_0x1cc8e7(0x39d)]=this['_relativePosition']||0x0;const _0x1291b6=this['_messageWindow'],_0x41c252=Math[_0x1cc8e7(0x4b4)](_0x1291b6[_0x1cc8e7(0x42f)]*this[_0x1cc8e7(0x39d)]/0xa);this['x']=_0x1291b6['x']+_0x41c252-Math[_0x1cc8e7(0x4b4)](this[_0x1cc8e7(0x42f)]/0x2),this['x']=this['x']['clamp'](_0x1291b6['x'],_0x1291b6['x']+_0x1291b6['width']-this[_0x1cc8e7(0x42f)]);},Window_NameBox['prototype'][_0x488928(0x405)]=function(){const _0x139f30=_0x488928;if($gameMessage[_0x139f30(0x3e2)]())return;this[_0x139f30(0x39d)]=this[_0x139f30(0x39d)]||0x0;const _0x42af8f=VisuMZ[_0x139f30(0x44d)][_0x139f30(0x446)][_0x139f30(0x425)][_0x139f30(0x438)],_0xcf6c5=VisuMZ[_0x139f30(0x44d)][_0x139f30(0x446)][_0x139f30(0x425)][_0x139f30(0x2e4)],_0x5586ad=(0x5-this[_0x139f30(0x39d)])/0x5;this['x']+=Math[_0x139f30(0x4b4)](_0x42af8f*_0x5586ad),this['y']+=_0xcf6c5;},Window_NameBox[_0x488928(0x2fa)][_0x488928(0x333)]=function(){const _0x27f007=_0x488928,_0x4c5fed=this[_0x27f007(0x2f4)],_0x1b1c86=_0x4c5fed['y'],_0x3f03d7=VisuMZ[_0x27f007(0x44d)][_0x27f007(0x446)]['General'][_0x27f007(0x2e4)];_0x1b1c86>this['y']&&_0x1b1c86<this['y']+this[_0x27f007(0x200)]-_0x3f03d7&&(this['y']=_0x4c5fed['y']+_0x4c5fed[_0x27f007(0x200)]);},VisuMZ[_0x488928(0x44d)][_0x488928(0x4a6)]=Window_NameBox[_0x488928(0x2fa)][_0x488928(0x39e)],Window_NameBox['prototype'][_0x488928(0x39e)]=function(){const _0x54069a=_0x488928;this[_0x54069a(0x39d)]=0x0,VisuMZ[_0x54069a(0x44d)][_0x54069a(0x4a6)][_0x54069a(0x2ed)](this);},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x36a)]=function(){return![];},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x3ac)]=function(){return!![];},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x474)]=function(){const _0x5c0585=_0x488928;return $gameSystem[_0x5c0585(0x400)]()+0x8;},Window_ChoiceList['prototype']['maxCols']=function(){const _0x39ecf2=_0x488928;return $gameSystem[_0x39ecf2(0x473)]();},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x3ba)]=function(){const _0x7a4d86=_0x488928;this[_0x7a4d86(0x39e)](),this[_0x7a4d86(0x3db)](),this[_0x7a4d86(0x357)](),this['activate']();},Window_ChoiceList['prototype'][_0x488928(0x2a6)]=function(){const _0x2c919d=_0x488928;$gameMessage[_0x2c919d(0x397)](this[_0x2c919d(0x450)]()),this[_0x2c919d(0x2f4)]['terminateMessage'](),this[_0x2c919d(0x306)](),this[_0x2c919d(0x415)]&&(this[_0x2c919d(0x415)][_0x2c919d(0x27d)](),this[_0x2c919d(0x415)][_0x2c919d(0x40d)]());},VisuMZ[_0x488928(0x44d)]['Window_ChoiceList_callCancelHandler']=Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x1f3)],Window_ChoiceList['prototype'][_0x488928(0x1f3)]=function(){const _0x4c0015=_0x488928;VisuMZ[_0x4c0015(0x44d)][_0x4c0015(0x27f)][_0x4c0015(0x2ed)](this),this[_0x4c0015(0x415)]&&(this['_helpWindow'][_0x4c0015(0x27d)](),this['_helpWindow'][_0x4c0015(0x40d)]());},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x39e)]=function(){const _0x3d5942=_0x488928;this[_0x3d5942(0x2a3)](),this[_0x3d5942(0x3c6)](),this[_0x3d5942(0x2f4)]&&(this[_0x3d5942(0x449)](),this[_0x3d5942(0x2bb)]()),this['createContents'](),this[_0x3d5942(0x49a)](),this[_0x3d5942(0x327)](),Window_Selectable['prototype'][_0x3d5942(0x39e)][_0x3d5942(0x2ed)](this);},Window_ChoiceList['prototype'][_0x488928(0x3c6)]=function(){const _0x13f16b=_0x488928,_0xf12eb4=$gameMessage[_0x13f16b(0x33b)]();let _0x56749d=0x0;for(let _0x41a0fc of _0xf12eb4){_0x41a0fc=this[_0x13f16b(0x2ae)](_0x41a0fc);if(this[_0x13f16b(0x4aa)](_0x41a0fc)){const _0x48514a=this[_0x13f16b(0x38b)](_0x41a0fc),_0x1dc5f4=this['isChoiceEnabled'](_0x41a0fc);this[_0x13f16b(0x30d)](_0x48514a,_0x13f16b(0x475),_0x1dc5f4,_0x56749d);}_0x56749d++;}this['clearChoiceHelpDescriptions'](),this[_0x13f16b(0x278)]();},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x2ae)]=function(_0x597533){const _0x531980=_0x488928;return Window_Base[_0x531980(0x2fa)][_0x531980(0x203)][_0x531980(0x2ed)](this,_0x597533);},Window_ChoiceList[_0x488928(0x2fa)]['isChoiceVisible']=function(_0xed25d0){const _0x2e5b8f=_0x488928;if(Imported[_0x2e5b8f(0x223)])$gameMessage[_0x2e5b8f(0x412)]();if(_0xed25d0['match'](/<HIDE>/i))return![];if(_0xed25d0['match'](/<SHOW>/i))return!![];if(_0xed25d0[_0x2e5b8f(0x337)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x24be0e=RegExp['$1'][_0x2e5b8f(0x471)](',')[_0x2e5b8f(0x27a)](_0x3702c4=>Number(_0x3702c4)||0x0);for(const _0x4793f2 of _0x24be0e){if(!$gameSwitches[_0x2e5b8f(0x2ec)](_0x4793f2))return![];}return!![];}if(_0xed25d0[_0x2e5b8f(0x337)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x57e8c7=RegExp['$1'][_0x2e5b8f(0x471)](',')[_0x2e5b8f(0x27a)](_0x2cb419=>Number(_0x2cb419)||0x0);for(const _0x18f214 of _0x57e8c7){if(!$gameSwitches[_0x2e5b8f(0x2ec)](_0x18f214))return![];}return!![];}if(_0xed25d0[_0x2e5b8f(0x337)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3effe7=RegExp['$1'][_0x2e5b8f(0x471)](',')[_0x2e5b8f(0x27a)](_0x3389b6=>Number(_0x3389b6)||0x0);for(const _0x4d54ac of _0x3effe7){if($gameSwitches[_0x2e5b8f(0x2ec)](_0x4d54ac))return!![];}return![];}if(_0xed25d0[_0x2e5b8f(0x337)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2805e4=RegExp['$1'][_0x2e5b8f(0x471)](',')[_0x2e5b8f(0x27a)](_0x11af1c=>Number(_0x11af1c)||0x0);for(const _0x285797 of _0x2805e4){if(!$gameSwitches[_0x2e5b8f(0x2ec)](_0x285797))return!![];}return![];}if(_0xed25d0[_0x2e5b8f(0x337)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5bf713=RegExp['$1'][_0x2e5b8f(0x471)](',')['map'](_0x139eff=>Number(_0x139eff)||0x0);for(const _0x2a2b06 of _0x5bf713){if(!$gameSwitches[_0x2e5b8f(0x2ec)](_0x2a2b06))return!![];}return![];}if(_0xed25d0[_0x2e5b8f(0x337)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x452ea5=RegExp['$1'][_0x2e5b8f(0x471)](',')[_0x2e5b8f(0x27a)](_0x163e9a=>Number(_0x163e9a)||0x0);for(const _0x2e3ef8 of _0x452ea5){if($gameSwitches[_0x2e5b8f(0x2ec)](_0x2e3ef8))return![];}return!![];}return!![];},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x38b)]=function(_0xade5b){const _0x45ee6e=_0x488928;let _0x11cca4=_0xade5b;return _0x11cca4=_0x11cca4[_0x45ee6e(0x329)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x11cca4=_0x11cca4[_0x45ee6e(0x329)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x11cca4;},Window_ChoiceList[_0x488928(0x2fa)]['isChoiceEnabled']=function(_0x39ebe6){const _0x536da0=_0x488928;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x536da0(0x412)]();if(_0x39ebe6[_0x536da0(0x337)](/<DISABLE>/i))return![];if(_0x39ebe6['match'](/<ENABLE>/i))return!![];if(_0x39ebe6[_0x536da0(0x337)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x53bc24=RegExp['$1'][_0x536da0(0x471)](',')[_0x536da0(0x27a)](_0x2f7563=>Number(_0x2f7563)||0x0);for(const _0x3787c8 of _0x53bc24){if(!$gameSwitches[_0x536da0(0x2ec)](_0x3787c8))return![];}return!![];}if(_0x39ebe6[_0x536da0(0x337)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5bf128=RegExp['$1']['split'](',')['map'](_0x4f2342=>Number(_0x4f2342)||0x0);for(const _0x36aad4 of _0x5bf128){if(!$gameSwitches['value'](_0x36aad4))return![];}return!![];}if(_0x39ebe6['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5d5a2a=RegExp['$1'][_0x536da0(0x471)](',')[_0x536da0(0x27a)](_0x339fb7=>Number(_0x339fb7)||0x0);for(const _0x4d43a6 of _0x5d5a2a){if($gameSwitches['value'](_0x4d43a6))return!![];}return![];}if(_0x39ebe6['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x22966f=RegExp['$1']['split'](',')['map'](_0x2fee21=>Number(_0x2fee21)||0x0);for(const _0xdc8159 of _0x22966f){if(!$gameSwitches[_0x536da0(0x2ec)](_0xdc8159))return!![];}return![];}if(_0x39ebe6[_0x536da0(0x337)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x22fdf4=RegExp['$1'][_0x536da0(0x471)](',')[_0x536da0(0x27a)](_0x14f73b=>Number(_0x14f73b)||0x0);for(const _0x3fb1f1 of _0x22fdf4){if(!$gameSwitches[_0x536da0(0x2ec)](_0x3fb1f1))return!![];}return![];}if(_0x39ebe6[_0x536da0(0x337)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x16f4aa=RegExp['$1'][_0x536da0(0x471)](',')[_0x536da0(0x27a)](_0x3f1db9=>Number(_0x3f1db9)||0x0);for(const _0x5ad189 of _0x16f4aa){if($gameSwitches[_0x536da0(0x2ec)](_0x5ad189))return![];}return!![];}return!![];},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x2ce)]=function(){const _0x9ec349=_0x488928;this['_choiceHelpDescriptions']={},this[_0x9ec349(0x415)]&&(this['_helpWindow'][_0x9ec349(0x27d)](),this[_0x9ec349(0x415)][_0x9ec349(0x40d)]());},Window_ChoiceList['prototype'][_0x488928(0x278)]=function(){const _0x1fe2fb=_0x488928,_0x294fd4=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x243e6a of this['_list']){if(!_0x243e6a)continue;const _0x23814b=this[_0x1fe2fb(0x293)][_0x1fe2fb(0x433)](_0x243e6a);if(_0x243e6a['name'][_0x1fe2fb(0x337)](_0x294fd4)){const _0x175281=String(RegExp['$1']);this[_0x1fe2fb(0x2d7)][_0x23814b]=_0x175281['trim'](),_0x243e6a['name']=_0x243e6a['name'][_0x1fe2fb(0x329)](_0x294fd4,'')[_0x1fe2fb(0x1fe)]();}else this[_0x1fe2fb(0x2d7)][_0x23814b]='';}},VisuMZ[_0x488928(0x44d)][_0x488928(0x495)]=Window_ChoiceList[_0x488928(0x2fa)]['updatePlacement'],Window_ChoiceList['prototype'][_0x488928(0x449)]=function(){const _0x267eae=_0x488928;VisuMZ[_0x267eae(0x44d)][_0x267eae(0x495)][_0x267eae(0x2ed)](this),this[_0x267eae(0x2b7)]();},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x2bb)]=function(){const _0x5b16e8=_0x488928;if(!this[_0x5b16e8(0x491)])return;const _0x288a0d=0x8,_0x12c8cd=this[_0x5b16e8(0x491)],_0x37a357=this['x']+this[_0x5b16e8(0x42f)],_0x485bc8=Math[_0x5b16e8(0x4b4)]((Graphics['width']-Graphics['boxWidth'])/0x2);_0x37a357>=Graphics[_0x5b16e8(0x26e)]+_0x485bc8-_0x12c8cd[_0x5b16e8(0x42f)]+_0x288a0d?_0x12c8cd['x']=-_0x12c8cd[_0x5b16e8(0x42f)]-_0x288a0d:_0x12c8cd['x']=this['width']+_0x288a0d,_0x12c8cd['y']=this[_0x5b16e8(0x200)]/0x2-_0x12c8cd[_0x5b16e8(0x200)]/0x2;},VisuMZ[_0x488928(0x44d)][_0x488928(0x1d3)]=Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x37d)],Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x37d)]=function(){const _0x5ec8b5=_0x488928;return this[_0x5ec8b5(0x2f4)]?this[_0x5ec8b5(0x36e)]():VisuMZ[_0x5ec8b5(0x44d)][_0x5ec8b5(0x1d3)]['call'](this);},Window_ChoiceList[_0x488928(0x2fa)]['messageCoreWindowX']=function(){const _0x4ca967=_0x488928,_0x540d43=$gameMessage['choicePositionType']();if(_0x540d43===0x1)return(Graphics['boxWidth']-this[_0x4ca967(0x307)]())/0x2;else return _0x540d43===0x2?this['_messageWindow']['x']+this['_messageWindow']['width']-this[_0x4ca967(0x307)]():this[_0x4ca967(0x2f4)]['x'];},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x307)]=function(){const _0x373c16=_0x488928,_0x5c9dd4=(this['maxChoiceWidth']()+this['colSpacing']())*this['maxCols']()+this[_0x373c16(0x3c7)]*0x2;return Math[_0x373c16(0x32d)](_0x5c9dd4,Graphics[_0x373c16(0x42f)]);},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x204)]=function(){const _0x302f7f=_0x488928,_0x4018dd=$gameMessage['choices']()[_0x302f7f(0x27a)](_0x201fe2=>this[_0x302f7f(0x2ae)](_0x201fe2))[_0x302f7f(0x454)](_0x2e9c6f=>this[_0x302f7f(0x4aa)](_0x2e9c6f)),_0x47ccc1=Math[_0x302f7f(0x47a)](_0x4018dd[_0x302f7f(0x476)]/this[_0x302f7f(0x29e)]());return Math[_0x302f7f(0x21e)](0x1,Math[_0x302f7f(0x32d)](_0x47ccc1,this['maxLines']()));},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x394)]=function(){const _0x2e2140=_0x488928,_0x389d8f=this['_messageWindow'],_0x2edc0d=_0x389d8f?_0x389d8f['y']:0x0,_0x479c5d=_0x389d8f?_0x389d8f[_0x2e2140(0x200)]:0x0,_0x6a2d5e=Graphics[_0x2e2140(0x248)]/0x2;return _0x2edc0d<_0x6a2d5e&&_0x2edc0d+_0x479c5d>_0x6a2d5e?0x4:$gameSystem[_0x2e2140(0x478)]();},Window_ChoiceList[_0x488928(0x2fa)]['maxChoiceWidth']=function(){const _0x25d72b=_0x488928;let _0x5ce9c6=this[_0x25d72b(0x343)]();for(const _0x2ca491 of this[_0x25d72b(0x293)]){const _0x581034=_0x2ca491[_0x25d72b(0x31d)],_0x439d6c=this[_0x25d72b(0x233)](_0x581034),_0x4dd0eb=this[_0x25d72b(0x2a1)](_0x581034)[_0x25d72b(0x42f)]+_0x439d6c,_0x3ec769=Math[_0x25d72b(0x47a)](_0x4dd0eb)+this[_0x25d72b(0x254)]()*0x2;_0x5ce9c6=Math[_0x25d72b(0x21e)](_0x5ce9c6,_0x3ec769);}return _0x5ce9c6;},Window_ChoiceList['prototype'][_0x488928(0x343)]=function(){const _0x17a581=_0x488928;let _0x58b763=0x60;const _0x2612cf=$gameMessage['choices']();for(const _0x3179e7 of _0x2612cf){_0x3179e7[_0x17a581(0x337)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x58b763=Math[_0x17a581(0x21e)](_0x58b763,Number(RegExp['$1'])));}return _0x58b763;},Window_ChoiceList['prototype'][_0x488928(0x48a)]=function(_0x1a64ce){const _0x378478=_0x488928,_0x580834=this['itemRectWithPadding'](_0x1a64ce),_0x18d7c3=$gameSystem['getChoiceListTextAlign']()!=='default'?_0x378478(0x344)[_0x378478(0x304)]($gameSystem[_0x378478(0x47b)]()):'',_0x1f47ba=_0x18d7c3+this['commandName'](_0x1a64ce);this['changePaintOpacity'](this[_0x378478(0x38e)](_0x1a64ce));const _0x451b86=this['textSizeEx'](_0x1f47ba)['height'],_0x624d88=_0x580834['x']+this['getChoiceIndent'](_0x1f47ba),_0x3e6f10=Math[_0x378478(0x21e)](_0x580834['y'],_0x580834['y']+Math[_0x378478(0x4a8)]((_0x580834[_0x378478(0x200)]-_0x451b86)/0x2));this[_0x378478(0x2c9)](_0x1f47ba,_0x624d88,_0x3e6f10,_0x580834[_0x378478(0x42f)]),this['changeChoiceBackgroundColor'](_0x1a64ce);},Window_ChoiceList[_0x488928(0x2fa)][_0x488928(0x233)]=function(_0x466a26){const _0x38045a=_0x488928;let _0x10b335=0x0;return _0x466a26[_0x38045a(0x337)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x10b335=Number(RegExp['$1'])),_0x10b335;},Window_ChoiceList['prototype']['changeChoiceBackgroundColor']=function(_0x2bfc05){const _0x4e4f50=_0x488928;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x381d98=this[_0x4e4f50(0x2a5)](_0x2bfc05);let _0x113359=![],_0x35f986=![],_0x60af63=ColorManager[_0x4e4f50(0x3a7)](),_0x1ac949=ColorManager[_0x4e4f50(0x321)]();if(_0x381d98[_0x4e4f50(0x337)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x60af63=ColorManager[_0x4e4f50(0x331)](RegExp['$1'])[_0x4e4f50(0x1fe)](),_0x1ac949=ColorManager[_0x4e4f50(0x331)](RegExp['$2'])[_0x4e4f50(0x1fe)](),_0x113359=!![];else{if(_0x381d98[_0x4e4f50(0x337)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x2e53c5=String(RegExp['$1'])[_0x4e4f50(0x246)]()[_0x4e4f50(0x1fe)]();switch(_0x2e53c5){case _0x4e4f50(0x41a):_0x60af63=_0x1ac949=_0x4e4f50(0x417),_0x35f986=!![];break;case _0x4e4f50(0x240):_0x60af63=_0x1ac949=_0x4e4f50(0x299),_0x35f986=!![];break;case _0x4e4f50(0x2fe):_0x60af63=_0x1ac949=_0x4e4f50(0x328),_0x35f986=!![];break;case'green':_0x60af63=_0x1ac949=_0x4e4f50(0x1da),_0x35f986=!![];break;case'blue':_0x60af63=_0x1ac949=_0x4e4f50(0x399),_0x35f986=!![];break;case _0x4e4f50(0x2a9):case'violet':_0x60af63=_0x1ac949=_0x4e4f50(0x42e),_0x35f986=!![];break;case _0x4e4f50(0x452):_0x60af63=_0x1ac949=_0x4e4f50(0x3c0),_0x35f986=!![];break;case _0x4e4f50(0x368):_0x60af63=_0x1ac949=_0x4e4f50(0x37f),_0x35f986=!![];break;case _0x4e4f50(0x39a):_0x60af63=_0x1ac949=_0x4e4f50(0x35c),_0x35f986=!![];break;case _0x4e4f50(0x36d):case _0x4e4f50(0x2f5):_0x60af63=_0x1ac949=_0x4e4f50(0x23e),_0x35f986=!![];break;case _0x4e4f50(0x285):_0x60af63=_0x1ac949=_0x4e4f50(0x3f5),_0x35f986=!![];break;case'yes':_0x60af63=_0x1ac949=ColorManager[_0x4e4f50(0x4ae)](),_0x35f986=!![];break;case'no':_0x60af63=_0x1ac949=ColorManager[_0x4e4f50(0x213)](),_0x35f986=!![];break;case _0x4e4f50(0x230):_0x60af63=_0x1ac949=ColorManager[_0x4e4f50(0x222)](),_0x35f986=!![];break;case'crisis':_0x60af63=_0x1ac949=ColorManager[_0x4e4f50(0x2da)](),_0x35f986=!![];break;default:_0x60af63=_0x1ac949=ColorManager[_0x4e4f50(0x331)](_0x2e53c5),_0x35f986=!![];break;}_0x113359=!![];}}if(!_0x113359)return;const _0x6fd807=this[_0x4e4f50(0x365)](_0x2bfc05);this[_0x4e4f50(0x3aa)][_0x4e4f50(0x32a)](_0x6fd807['x'],_0x6fd807['y'],_0x6fd807[_0x4e4f50(0x42f)],_0x6fd807[_0x4e4f50(0x200)]),this[_0x4e4f50(0x30f)](_0x6fd807,_0x60af63,_0x1ac949,_0x35f986);},Window_ChoiceList[_0x488928(0x2fa)]['drawCustomBackgroundColor']=function(_0x19e094,_0xebc796,_0x12d854,_0x34757d){const _0x51e51b=_0x488928,_0x4944d1=ColorManager[_0x51e51b(0x3a7)](),_0x2770d2=ColorManager[_0x51e51b(0x3f9)](),_0x2425c2=_0xebc796??ColorManager[_0x51e51b(0x3a7)](),_0x1c5202=_0x12d854??_0xebc796,_0x5ae474=_0x19e094['x'],_0x258e1d=_0x19e094['y'],_0x4b03b1=_0x19e094[_0x51e51b(0x42f)],_0x10ad47=_0x19e094[_0x51e51b(0x200)];this[_0x51e51b(0x3aa)][_0x51e51b(0x45d)](_0x5ae474,_0x258e1d,_0x4b03b1,_0x10ad47,_0x2425c2,_0x1c5202,!![]),_0x34757d&&this[_0x51e51b(0x3aa)]['gradientFillRect'](_0x5ae474,_0x258e1d,_0x4b03b1,_0x10ad47,_0x4944d1,_0x1c5202,!![]),this['contentsBack']['strokeRect'](_0x5ae474,_0x258e1d,_0x4b03b1,_0x10ad47,_0x4944d1);},Window_ChoiceList[_0x488928(0x2fa)]['updateHelp']=function(){const _0x493ca0=_0x488928;this[_0x493ca0(0x415)]['clear']();if(!this[_0x493ca0(0x2d7)])return;const _0x291b1e=this[_0x493ca0(0x388)]();this[_0x493ca0(0x2d7)][_0x291b1e]?(this[_0x493ca0(0x415)][_0x493ca0(0x2d4)](this['_choiceHelpDescriptions'][_0x291b1e]),this['_helpWindow']['show']()):(this['_helpWindow']['clear'](),this[_0x493ca0(0x415)][_0x493ca0(0x40d)]());},Window_EventItem[_0x488928(0x2fa)][_0x488928(0x296)]=function(){const _0x333414=_0x488928,_0x208724=$gameMessage['itemChoiceItypeId']();_0x208724===_0x333414(0x2cb)&&Imported[_0x333414(0x421)]?this[_0x333414(0x239)]():Window_ItemList[_0x333414(0x2fa)]['makeItemList'][_0x333414(0x2ed)](this);},Window_EventItem[_0x488928(0x2fa)][_0x488928(0x239)]=function(){const _0x4e7e0e=_0x488928,_0x48215a=$gameMessage[_0x4e7e0e(0x3fc)]();this[_0x4e7e0e(0x2d5)]=_0x48215a?_0x48215a[_0x4e7e0e(0x2ea)]()[_0x4e7e0e(0x454)](_0x1284dc=>this[_0x4e7e0e(0x23a)](_0x1284dc)):[],this[_0x4e7e0e(0x23a)](null)&&this['_data'][_0x4e7e0e(0x206)](null);},VisuMZ[_0x488928(0x44d)]['Window_EventItem_includes']=Window_EventItem['prototype'][_0x488928(0x23a)],Window_EventItem[_0x488928(0x2fa)][_0x488928(0x23a)]=function(_0x26fa6a){const _0xd06ca4=_0x488928,_0x10aa96=$gameMessage['itemChoiceItypeId']();if(_0x10aa96===_0xd06ca4(0x499)){if(!DataManager[_0xd06ca4(0x3fe)](_0x26fa6a))return![];const _0x1467fc=$gameMessage['itemChoiceWtypeId']();if(_0x1467fc>0x0){if(_0x26fa6a[_0xd06ca4(0x1d5)]!==_0x1467fc)return![];}return!![];}else{if(_0x10aa96==='armor'){if(!DataManager[_0xd06ca4(0x264)](_0x26fa6a))return![];const _0x50cf13=$gameMessage['itemChoiceAtypeId']();if(_0x50cf13>0x0){if(_0x26fa6a[_0xd06ca4(0x3a3)]!==_0x50cf13)return![];}const _0x157055=$gameMessage[_0xd06ca4(0x472)]();if(_0x157055>0x0){if(_0x26fa6a[_0xd06ca4(0x211)]!==_0x157055)return![];}return!![];}else{if(_0x10aa96===_0xd06ca4(0x2cb)){if(!DataManager[_0xd06ca4(0x1d0)](_0x26fa6a))return![];const _0x4aa097=$gameMessage['itemChoiceActor']();if(_0x4aa097[_0xd06ca4(0x2aa)](_0x26fa6a))return![];if(!_0x4aa097['isSkillTypeMatchForUse'](_0x26fa6a))return![];const _0x2fc218=$gameMessage['itemChoiceStypeId']();if(_0x2fc218>0x0){const _0x13bc98=DataManager[_0xd06ca4(0x3dc)](_0x26fa6a);if(!_0x13bc98['includes'](_0x2fc218))return![];}return!![];}else return VisuMZ[_0xd06ca4(0x44d)][_0xd06ca4(0x282)][_0xd06ca4(0x2ed)](this,_0x26fa6a);}}},VisuMZ['MessageCore'][_0x488928(0x281)]=Window_ItemList['prototype'][_0x488928(0x1d7)],Window_ItemList[_0x488928(0x2fa)][_0x488928(0x1d7)]=function(_0x4dd6cb,_0x344c42,_0x43c30c,_0x4b8081){const _0x42622f=_0x488928,_0x406a32=$gameMessage[_0x42622f(0x3fd)]();if(_0x406a32===_0x42622f(0x2cb)){const _0x27b234=$gameMessage[_0x42622f(0x3fc)]();this[_0x42622f(0x276)](_0x27b234,_0x4dd6cb,_0x344c42,_0x43c30c,_0x4b8081);}else VisuMZ[_0x42622f(0x44d)][_0x42622f(0x281)][_0x42622f(0x2ed)](this,_0x4dd6cb,_0x344c42,_0x43c30c,_0x4b8081);};