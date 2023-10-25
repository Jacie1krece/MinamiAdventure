//=============================================================================
// VisuStella MZ - Animated Pictures
// VisuMZ_4_AnimatedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AnimatedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AnimatedPictures = VisuMZ.AnimatedPictures || {};
VisuMZ.AnimatedPictures.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [AnimatedPictures]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Pictures_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that gives functionality to Show Picture
 * events to display animated pictures. Animated pictures are shown in a sprite
 * sheet format. There are looping controls and speed controls that can be used
 * with these animated pictures.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to make pictures animated as long as they follow the
 *   animated cell format.
 * * Control the looping properties and speed of the animated picture through
 *   the usage of plugin commands.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures folder.
 * The filename must be named with the following format:
 *
 * filename[ANI][HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Parrot[ANI][3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated pictures.
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
 * Animated Picture: Change Properties
 * - Changes the properties used for the animated picture.
 *
 *   Picture ID:
 *   - Select which Picture ID to affect.
 *
 *   Loop?:
 *   - Animated pictures will loop back to beginning once it reaches the
 *     last frame.
 *
 *   Wait Frames:
 *   - Number of frames to wait before moving to next picture cell.
 *
 * ---
 *
 * ============================================================================
 * Good Practices
 * ============================================================================
 *
 * Animated pictures, if used incorrectly, can bog down the game client. Here
 * are some good practices that you can follow when making animated pictures
 * to make them run more smoothly in-game.
 *
 * ---
 *
 * 1. Use animated pictures sparingly if possible. RPG Maker MZ's cache has a
 * limited size to it, which means the more animated pictures you use, the
 * faster it will fill up. And the faster it fills up, the more it needs to be
 * emptied to allow other assets in your game to load at all.
 *
 * ---
 *
 * 2. If you do use animated pictures, trim down as much empty space as
 * possible and keep picture cells to a minimum size to reduce bloating
 * the cache.
 *
 * ---
 *
 * 3. If it is practical, make your sprite sheet cells work towards a power of
 * 2 (ie: sizes of 32x32, 64x64, 128x128, 256x256, etc). Bitmaps render best
 * when it works in this cell range. This is not necessary, but it is a thing
 * to keep in mind.
 *
 * ---
 *
 * 4. Limit the amount of colors used in the animated picture to reduce the
 * filesize of the image and reduce the strain on the cache. Use more flat
 * colors instead of gradients. These work better for the engine.
 *
 * ---
 *
 * 5. When you are done using the animated picture, use the Erase Picture
 * command to clear the picture from use. This will stop the animation frame
 * calculating and reduce strain on your game.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters are the only ones available with this plugin. These
 * adjust the default settings of animated pictures. If you wish to change how
 * some animated pictures behave from others, 
 *
 * ---
 *
 * Defaults
 * 
 *   Default Loop?:
 *   - Animated pictures will loop back to beginning by default once it reaches
 *     the last frame.
 * 
 *   Default Wait Frames:
 *   - Default number of frames to wait before moving to next picture cell.
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
 * Version 1.04: October 12, 2023
 * * Feature Update!
 * ** Added failsafes for loading extremely large images that may or may not
 *    load bitmaps properly and causing crashes. Update made by Arisu.
 * 
 * Version 1.03: August 11, 2022
 * * Feature Update!
 * ** Reduced frame count load to hide the spritesheet for event attached
 *    animated pictures. Update made by Arisu.
 * 
 * Version 1.02: April 28, 2022
 * * Compatibility Update
 * ** Added compatibility with Events & Movement Core version 1.38's new
 *    <Picture Filename: filename> related notetags.
 * 
 * Version 1.01: December 4, 2020
 * * Bug Fixes!
 * ** Plugin Command "Animated Picture: Change Properties" wait frames will no
 *    longer cap at 1 frame. Fixed by Irina and Shaz.
 *
 * Version 1.00: October 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeProperties
 * @text Animated Picture: Change Properties
 * @desc Changes the properties used for the animated picture.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to affect.
 * @default 1
 *
 * @arg Loop:eval
 * @text Loop?
 * @parent PictureID:num
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning once it reaches the last frame.
 * @default true
 *
 * @arg WaitFrames:num
 * @text Wait Frames
 * @parent PictureID:num
 * @type number
 * @min 1
 * @desc Number of frames to wait before moving to next picture cell.
 * @default 4
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
 * @param AnimatedPictures
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Loop:eval
 * @text Default Loop?
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning by default once it reaches the last frame.
 * @default true
 *
 * @param WaitFrames:num
 * @text Default Wait Frames
 * @desc Default number of frames to wait before moving to next picture cell.
 * @default 4
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
//=============================================================================

function _0x1d44(_0x57cb1e,_0x59c723){const _0x41d0e1=_0x41d0();return _0x1d44=function(_0x1d44ae,_0x1c9164){_0x1d44ae=_0x1d44ae-0x88;let _0x5cdca9=_0x41d0e1[_0x1d44ae];return _0x5cdca9;},_0x1d44(_0x57cb1e,_0x59c723);}const _0x52cd7b=_0x1d44;function _0x41d0(){const _0x5db538=['STR','initAnimatedPicture','_animationIndex','fuLbS','version','VvMCF','isAnimatedPicture','WcYPC','Sprite_Character_getAttachPictureBitmapWidth','Game_CharacterBase_clearAttachPictureSettings','registerCommand','width','116018IobvYG','_animatedPictureLoop','description','isAnimatedPictureLooping','_isAttachPictureAnimatedPicture','ChangeProperties','66suqmGx','Sprite_Picture_loadBitmap','92030XWamtk','WaitFrames','_isAnimatedPicture','Game_Event_checkEventsMoveCoreStringTags','setFrame','call','aniWaitFrames','172034XHpjLl','getAttachPictureBitmapHeight','_character','parse','EVAL','addLoadListener','attachPictureAniWaitFrames','map','visible','lCsvu','DbCyL','328flvHTg','2967356cIEDdq','isAnimationLooping','updateAnimatedAttachPictureBitmap','updateAnimatedPictureCount','PictureID','setAnimatedPictureWaitFrames','ARRAYJSON','bitmap','Sprite_Picture_update','toUpperCase','onLoadAttachPicture','73138HFScaB','exit','updateAttachedPictureAnimatedPictureFrame','39nEUAQZ','_pictureName','_animatedPictureWait','bind','706981nXiVnP','Avsdh','attachPictureSettings','_animationCount','_animationHorzCells','STRUCT','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','format','ConvertParams','updateAttachPictureBitmap','attachPictureFilename','max','_attachPictureAnimationMaxCells','getAnimatedPictureWaitFrames','oUQvs','parameters','Sprite_Character_getAttachPictureBitmapHeight','clearAttachPictureSettings','getAttachPictureBitmapWidth','_attachPictureAnimationIndex','_attachPictureAnimationCount','setAnimatedPictureLooping','height','Settings','_animationMaxCells','realPictureId','update','_attachPicture','NUM','335520qPwhsB','initAnimatedPictureSettings','JSON','_pictureId','prototype','resetFrame','_attachPictureAnimationVertCells','initialize','loadBitmap','Sprite_Character_updateAttachPictureBitmap','setupAnimatedPictureData','name','nbAaV','_animationVertCells','FKvzL','FUNC','Sprite_Picture_initialize','filter','156uBrmVS','checkEventsMoveCoreStringTags','261yBgAeI','animationWaitFrames','_attachPictureAnimationHorzCells','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_attachPictureSprite','updateAnimatedPictureFrame','floor','ARRAYNUM','AnimatedPictures','_attachPictureAnimationWaitFrames','match','Loop','ARRAYFUNC','includes','Sprite_Character_onLoadAttachPicture'];_0x41d0=function(){return _0x5db538;};return _0x41d0();}(function(_0xaa2912,_0xb6f397){const _0x361799=_0x1d44,_0x30181e=_0xaa2912();while(!![]){try{const _0x5eea52=parseInt(_0x361799(0xf3))/0x1+parseInt(_0x361799(0x91))/0x2*(parseInt(_0x361799(0x94))/0x3)+-parseInt(_0x361799(0xff))/0x4+-parseInt(_0x361799(0xb5))/0x5*(parseInt(_0x361799(0xea))/0x6)+-parseInt(_0x361799(0xe4))/0x7*(-parseInt(_0x361799(0xfe))/0x8)+-parseInt(_0x361799(0xc9))/0x9*(parseInt(_0x361799(0xec))/0xa)+-parseInt(_0x361799(0x98))/0xb*(-parseInt(_0x361799(0xc7))/0xc);if(_0x5eea52===_0xb6f397)break;else _0x30181e['push'](_0x30181e['shift']());}catch(_0x28547a){_0x30181e['push'](_0x30181e['shift']());}}}(_0x41d0,0x65782));var label=_0x52cd7b(0xd1),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x52cd7b(0xc6)](function(_0x44a14a){const _0x43e189=_0x52cd7b;return _0x44a14a['status']&&_0x44a14a['description'][_0x43e189(0xd6)]('['+label+']');})[0x0];VisuMZ[label][_0x52cd7b(0xaf)]=VisuMZ[label][_0x52cd7b(0xaf)]||{},VisuMZ[_0x52cd7b(0xa0)]=function(_0x476177,_0x1a7fb4){const _0x3bd34d=_0x52cd7b;for(const _0x4ab1b1 in _0x1a7fb4){if(_0x4ab1b1['match'](/(.*):(.*)/i)){const _0x2f1a62=String(RegExp['$1']),_0x18c5b9=String(RegExp['$2'])[_0x3bd34d(0x8f)]()['trim']();let _0x4cd87f,_0x365300,_0x11653d;switch(_0x18c5b9){case _0x3bd34d(0xb4):_0x4cd87f=_0x1a7fb4[_0x4ab1b1]!==''?Number(_0x1a7fb4[_0x4ab1b1]):0x0;break;case _0x3bd34d(0xd0):_0x365300=_0x1a7fb4[_0x4ab1b1]!==''?JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1]):[],_0x4cd87f=_0x365300[_0x3bd34d(0xfa)](_0x1f5854=>Number(_0x1f5854));break;case _0x3bd34d(0xf7):_0x4cd87f=_0x1a7fb4[_0x4ab1b1]!==''?eval(_0x1a7fb4[_0x4ab1b1]):null;break;case'ARRAYEVAL':_0x365300=_0x1a7fb4[_0x4ab1b1]!==''?JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1]):[],_0x4cd87f=_0x365300[_0x3bd34d(0xfa)](_0xe940da=>eval(_0xe940da));break;case _0x3bd34d(0xb7):_0x4cd87f=_0x1a7fb4[_0x4ab1b1]!==''?JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1]):'';break;case _0x3bd34d(0x8c):_0x365300=_0x1a7fb4[_0x4ab1b1]!==''?JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1]):[],_0x4cd87f=_0x365300['map'](_0x48f670=>JSON[_0x3bd34d(0xf6)](_0x48f670));break;case _0x3bd34d(0xc4):_0x4cd87f=_0x1a7fb4[_0x4ab1b1]!==''?new Function(JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1])):new Function('return\x200');break;case _0x3bd34d(0xd5):_0x365300=_0x1a7fb4[_0x4ab1b1]!==''?JSON['parse'](_0x1a7fb4[_0x4ab1b1]):[],_0x4cd87f=_0x365300['map'](_0x5776d7=>new Function(JSON[_0x3bd34d(0xf6)](_0x5776d7)));break;case _0x3bd34d(0xd8):_0x4cd87f=_0x1a7fb4[_0x4ab1b1]!==''?String(_0x1a7fb4[_0x4ab1b1]):'';break;case'ARRAYSTR':_0x365300=_0x1a7fb4[_0x4ab1b1]!==''?JSON['parse'](_0x1a7fb4[_0x4ab1b1]):[],_0x4cd87f=_0x365300[_0x3bd34d(0xfa)](_0x5ca093=>String(_0x5ca093));break;case _0x3bd34d(0x9d):_0x11653d=_0x1a7fb4[_0x4ab1b1]!==''?JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1]):{},_0x4cd87f=VisuMZ[_0x3bd34d(0xa0)]({},_0x11653d);break;case'ARRAYSTRUCT':_0x365300=_0x1a7fb4[_0x4ab1b1]!==''?JSON[_0x3bd34d(0xf6)](_0x1a7fb4[_0x4ab1b1]):[],_0x4cd87f=_0x365300[_0x3bd34d(0xfa)](_0x5e97b4=>VisuMZ[_0x3bd34d(0xa0)]({},JSON[_0x3bd34d(0xf6)](_0x5e97b4)));break;default:continue;}_0x476177[_0x2f1a62]=_0x4cd87f;}}return _0x476177;},(_0x4db1f8=>{const _0x109670=_0x52cd7b,_0x58e379=_0x4db1f8[_0x109670(0xc0)];for(const _0x23bccf of dependencies){if(!Imported[_0x23bccf]){alert(_0x109670(0xcc)[_0x109670(0x9f)](_0x58e379,_0x23bccf)),SceneManager['exit']();break;}}const _0x2880bf=_0x4db1f8[_0x109670(0xe6)];if(_0x2880bf['match'](/\[Version[ ](.*?)\]/i)){const _0x41e364=Number(RegExp['$1']);_0x41e364!==VisuMZ[label][_0x109670(0xdc)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x109670(0x9f)](_0x58e379,_0x41e364)),SceneManager[_0x109670(0x92)]());}if(_0x2880bf[_0x109670(0xd3)](/\[Tier[ ](\d+)\]/i)){const _0xfc269d=Number(RegExp['$1']);_0xfc269d<tier?_0x109670(0xdb)===_0x109670(0xdb)?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x109670(0x9f)](_0x58e379,_0xfc269d,tier)),SceneManager['exit']()):this[_0x109670(0xda)]=0x0:tier=Math[_0x109670(0xa3)](_0xfc269d,tier);}VisuMZ[_0x109670(0xa0)](VisuMZ[label]['Settings'],_0x4db1f8[_0x109670(0xa7)]);})(pluginData),PluginManager[_0x52cd7b(0xe2)](pluginData[_0x52cd7b(0xc0)],_0x52cd7b(0xe9),_0x3657ec=>{const _0x1b60fd=_0x52cd7b;VisuMZ[_0x1b60fd(0xa0)](_0x3657ec,_0x3657ec);const _0x4a680a=_0x3657ec[_0x1b60fd(0x8a)],_0x2442cb=_0x3657ec[_0x1b60fd(0xd4)],_0x3e01ed=_0x3657ec[_0x1b60fd(0xed)];$gameScreen[_0x1b60fd(0xad)](_0x4a680a,_0x2442cb),$gameScreen[_0x1b60fd(0x8b)](_0x4a680a,_0x3e01ed);}),VisuMZ[_0x52cd7b(0xd1)]['Game_Screen_initialize']=Game_Screen[_0x52cd7b(0xb9)]['initialize'],Game_Screen['prototype'][_0x52cd7b(0xbc)]=function(){const _0x52d509=_0x52cd7b;VisuMZ['AnimatedPictures']['Game_Screen_initialize']['call'](this),this[_0x52d509(0xb6)]();},Game_Screen[_0x52cd7b(0xb9)][_0x52cd7b(0xb6)]=function(){const _0x54fab9=_0x52cd7b;this[_0x54fab9(0xe5)]=[],this[_0x54fab9(0x96)]=[];},Game_Screen['prototype'][_0x52cd7b(0xe7)]=function(_0x124cac){const _0x539b37=_0x52cd7b;if(this[_0x539b37(0xe5)]===undefined){if(_0x539b37(0x99)===_0x539b37(0x99))this['initAnimatedPictureSettings']();else return this[_0x539b37(0x9a)]()['aniWaitFrames']??0x1;}const _0x5999fa=this[_0x539b37(0xb1)](_0x124cac);return this[_0x539b37(0xe5)][_0x5999fa]===undefined&&(this[_0x539b37(0xe5)][_0x5999fa]=VisuMZ['AnimatedPictures'][_0x539b37(0xaf)][_0x539b37(0xd4)]),this[_0x539b37(0xe5)][_0x5999fa];},Game_Screen['prototype'][_0x52cd7b(0xad)]=function(_0x4210a7,_0x5d9dd1){const _0x255ae3=_0x52cd7b;this[_0x255ae3(0xe5)]===undefined&&this[_0x255ae3(0xb6)]();const _0x40fa7a=this[_0x255ae3(0xb1)](_0x4210a7);this[_0x255ae3(0xe5)][_0x40fa7a]=_0x5d9dd1;},Game_Screen[_0x52cd7b(0xb9)][_0x52cd7b(0xa5)]=function(_0x260ced){const _0x3c81b5=_0x52cd7b;this[_0x3c81b5(0x96)]===undefined&&this[_0x3c81b5(0xb6)]();const _0x5acab7=this[_0x3c81b5(0xb1)](_0x260ced);return this[_0x3c81b5(0x96)][_0x5acab7]===undefined&&(this[_0x3c81b5(0x96)][_0x5acab7]=VisuMZ[_0x3c81b5(0xd1)][_0x3c81b5(0xaf)][_0x3c81b5(0xed)]),this[_0x3c81b5(0x96)][_0x5acab7];},Game_Screen['prototype']['setAnimatedPictureWaitFrames']=function(_0x392755,_0x20542e){const _0x40baf8=_0x52cd7b;this[_0x40baf8(0x96)]===undefined&&this[_0x40baf8(0xb6)]();const _0x4277cc=this[_0x40baf8(0xb1)](_0x392755);this[_0x40baf8(0x96)][_0x4277cc]=_0x20542e;},VisuMZ[_0x52cd7b(0xd1)][_0x52cd7b(0xe1)]=Game_CharacterBase[_0x52cd7b(0xb9)]['clearAttachPictureSettings'],Game_CharacterBase[_0x52cd7b(0xb9)][_0x52cd7b(0xa9)]=function(){const _0x274564=_0x52cd7b;VisuMZ['AnimatedPictures']['Game_CharacterBase_clearAttachPictureSettings'][_0x274564(0xf1)](this),this[_0x274564(0xb3)][_0x274564(0xf2)]=VisuMZ['AnimatedPictures'][_0x274564(0xaf)][_0x274564(0xed)]||0x1;},VisuMZ[_0x52cd7b(0xd1)][_0x52cd7b(0xef)]=Game_Event[_0x52cd7b(0xb9)][_0x52cd7b(0xc8)],Game_Event['prototype'][_0x52cd7b(0xc8)]=function(_0x3956f8){const _0x25cd0f=_0x52cd7b;VisuMZ['AnimatedPictures'][_0x25cd0f(0xef)][_0x25cd0f(0xf1)](this,_0x3956f8),_0x3956f8[_0x25cd0f(0xd3)](/<(?:ATTACH PICTURE|PICTURE) (?:WAIT|DELAY) (?:FRAME|FRAMES):[ ](\d+)>/i)&&(this[_0x25cd0f(0xb3)]['aniWaitFrames']=Math[_0x25cd0f(0xa3)](0x1,Number(RegExp['$1'])));},Game_CharacterBase[_0x52cd7b(0xb9)][_0x52cd7b(0xf9)]=function(){const _0x357277=_0x52cd7b;return this[_0x357277(0x9a)]()[_0x357277(0xf2)]??0x1;},VisuMZ[_0x52cd7b(0xd1)][_0x52cd7b(0xbe)]=Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0xa1)],Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0xa1)]=function(){const _0x5c4dcf=_0x52cd7b;VisuMZ[_0x5c4dcf(0xd1)][_0x5c4dcf(0xbe)][_0x5c4dcf(0xf1)](this),this[_0x5c4dcf(0x88)]();},VisuMZ[_0x52cd7b(0xd1)][_0x52cd7b(0xd7)]=Sprite_Character['prototype'][_0x52cd7b(0x90)],Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0x90)]=function(_0x38bcbf){const _0x227ec9=_0x52cd7b;this[_0x227ec9(0xac)]=0x0,this['_attachPictureAnimationIndex']=0x0,VisuMZ['AnimatedPictures'][_0x227ec9(0xd7)][_0x227ec9(0xf1)](this,_0x38bcbf);const _0x396276=this[_0x227ec9(0xf5)][_0x227ec9(0xa2)]();_0x396276[_0x227ec9(0xd3)](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this['_isAttachPictureAnimatedPicture']=!![],this[_0x227ec9(0xcb)]=Math['max'](0x1,parseInt(RegExp['$1'])),this[_0x227ec9(0xbb)]=Math[_0x227ec9(0xa3)](0x1,parseInt(RegExp['$2'])),this[_0x227ec9(0xa4)]=this[_0x227ec9(0xcb)]*this[_0x227ec9(0xbb)],this[_0x227ec9(0xd2)]=this['_character'][_0x227ec9(0xf9)](),this[_0x227ec9(0x93)]()):(this[_0x227ec9(0xcd)][_0x227ec9(0xfb)]=![],this[_0x227ec9(0xe8)]=![],this[_0x227ec9(0xcb)]=0x1,this['_attachPictureAnimationVertCells']=0x1,this[_0x227ec9(0xa4)]=0x1,this[_0x227ec9(0xcd)][_0x227ec9(0xf0)](0x0,0x0,_0x38bcbf?_0x38bcbf[_0x227ec9(0xe3)]:0x0,_0x38bcbf?_0x38bcbf['height']:0x0),this[_0x227ec9(0xcd)][_0x227ec9(0xfb)]=!![]);},VisuMZ[_0x52cd7b(0xd1)][_0x52cd7b(0xe0)]=Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0xaa)],Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0xaa)]=function(){const _0x1862e4=_0x52cd7b;let _0x41a76c=VisuMZ[_0x1862e4(0xd1)]['Sprite_Character_getAttachPictureBitmapWidth'][_0x1862e4(0xf1)](this);return _0x41a76c/(this[_0x1862e4(0xcb)]||0x1);},VisuMZ['AnimatedPictures'][_0x52cd7b(0xa8)]=Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0xf4)],Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0xf4)]=function(){const _0x57de4b=_0x52cd7b;let _0x4e6848=VisuMZ['AnimatedPictures'][_0x57de4b(0xa8)]['call'](this);return _0x4e6848/(this[_0x57de4b(0xbb)]||0x1);},Sprite_Character[_0x52cd7b(0xb9)][_0x52cd7b(0x88)]=function(){const _0x1e0c05=_0x52cd7b;if(!this['_isAttachPictureAnimatedPicture'])return;this[_0x1e0c05(0xac)]+=0x1,this[_0x1e0c05(0xac)]>=this[_0x1e0c05(0xd2)]&&(this['_attachPictureAnimationCount']=0x0,this[_0x1e0c05(0xab)]+=0x1,this['_attachPictureAnimationIndex']>=this['_attachPictureAnimationMaxCells']&&(_0x1e0c05(0xfc)!==_0x1e0c05(0xc3)?this['_attachPictureAnimationIndex']=0x0:this['_animationIndex']=this[_0x1e0c05(0xb0)]-0x1),this['updateAttachedPictureAnimatedPictureFrame']());},Sprite_Character[_0x52cd7b(0xb9)]['updateAttachedPictureAnimatedPictureFrame']=function(){const _0x154b5b=_0x52cd7b,_0x28e37e=this[_0x154b5b(0xcd)],_0x16a6c8=_0x28e37e[_0x154b5b(0x8d)],_0x20fb7c=(_0x16a6c8?_0x16a6c8['width']:0x0)/this[_0x154b5b(0xcb)],_0x483121=(_0x16a6c8?_0x16a6c8[_0x154b5b(0xae)]:0x0)/this[_0x154b5b(0xbb)],_0xca025d=this['_attachPictureAnimationIndex']%this[_0x154b5b(0xcb)]*_0x20fb7c,_0x4e9bb9=Math['floor'](this['_attachPictureAnimationIndex']/this[_0x154b5b(0xcb)])*_0x483121;_0x28e37e[_0x154b5b(0xf0)](_0xca025d,_0x4e9bb9,_0x20fb7c,_0x483121),_0x28e37e['visible']=!![];},VisuMZ[_0x52cd7b(0xd1)][_0x52cd7b(0xc5)]=Sprite_Picture[_0x52cd7b(0xb9)]['initialize'],Sprite_Picture[_0x52cd7b(0xb9)]['initialize']=function(_0x4c601a){const _0x51804c=_0x52cd7b;this['initAnimatedPicture'](),VisuMZ[_0x51804c(0xd1)][_0x51804c(0xc5)][_0x51804c(0xf1)](this,_0x4c601a);},Sprite_Picture[_0x52cd7b(0xb9)]['initAnimatedPicture']=function(){const _0x2cd1ee=_0x52cd7b;this[_0x2cd1ee(0xee)]=![],this[_0x2cd1ee(0x9c)]=0x1,this[_0x2cd1ee(0xc2)]=0x1,this[_0x2cd1ee(0xb0)]=0x1,this[_0x2cd1ee(0x9b)]=0x0,this[_0x2cd1ee(0xda)]=0x0;},Sprite_Picture[_0x52cd7b(0xb9)][_0x52cd7b(0xde)]=function(){const _0x4bc69d=_0x52cd7b;if(this[_0x4bc69d(0xee)]===undefined)this[_0x4bc69d(0xd9)]();return this[_0x4bc69d(0xee)];},VisuMZ[_0x52cd7b(0xd1)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype'][_0x52cd7b(0xbd)],Sprite_Picture[_0x52cd7b(0xb9)][_0x52cd7b(0xbd)]=function(){const _0x389abc=_0x52cd7b;this[_0x389abc(0xbf)](),VisuMZ[_0x389abc(0xd1)][_0x389abc(0xeb)][_0x389abc(0xf1)](this);if(this[_0x389abc(0xde)]())this[_0x389abc(0x8d)][_0x389abc(0xf8)](this[_0x389abc(0xce)]['bind'](this));else{if('DbCyL'!==_0x389abc(0xfd)){const _0x5169f1=_0x21320e(_0x95171['$1']);_0x5169f1<_0x1fa776?(_0x1ef0ec(_0x389abc(0x9e)['format'](_0x27b35c,_0x5169f1,_0x559100)),_0x334f6d[_0x389abc(0x92)]()):_0x3279ad=_0x564ccf[_0x389abc(0xa3)](_0x5169f1,_0x1fb007);}else this[_0x389abc(0x8d)][_0x389abc(0xf8)](this[_0x389abc(0xba)][_0x389abc(0x97)](this));}},Sprite_Picture['prototype']['resetFrame']=function(){const _0x40ca93=_0x52cd7b;this['setFrame'](0x0,0x0,this[_0x40ca93(0x8d)]?this[_0x40ca93(0x8d)]['width']:0x0,this[_0x40ca93(0x8d)]?this[_0x40ca93(0x8d)][_0x40ca93(0xae)]:0x0);},Sprite_Picture[_0x52cd7b(0xb9)][_0x52cd7b(0xbf)]=function(){const _0x4e56af=_0x52cd7b;if(this[_0x4e56af(0x95)][_0x4e56af(0xd3)](/\[ANI\]\[(\d+)x(\d+)\]/i))this[_0x4e56af(0xee)]=!![],this['_animationHorzCells']=Math[_0x4e56af(0xa3)](0x1,parseInt(RegExp['$1'])),this[_0x4e56af(0xc2)]=Math[_0x4e56af(0xa3)](0x1,parseInt(RegExp['$2'])),this[_0x4e56af(0xb0)]=this['_animationHorzCells']*this[_0x4e56af(0xc2)];else{if(_0x4e56af(0xdd)==='ExBlI'){this[_0x4e56af(0x96)]===_0x219913&&this[_0x4e56af(0xb6)]();const _0xe8478f=this[_0x4e56af(0xb1)](_0x54aa43);this[_0x4e56af(0x96)][_0xe8478f]=_0x4871bb;}else this['_isAnimatedPicture']=![],this['_animationHorzCells']=0x1,this[_0x4e56af(0xc2)]=0x1,this[_0x4e56af(0xb0)]=0x1;}this[_0x4e56af(0x9b)]=0x0,this[_0x4e56af(0xda)]=0x0;},VisuMZ['AnimatedPictures']['Sprite_Picture_update']=Sprite_Picture['prototype'][_0x52cd7b(0xb2)],Sprite_Picture[_0x52cd7b(0xb9)][_0x52cd7b(0xb2)]=function(){const _0x27bc7a=_0x52cd7b;VisuMZ[_0x27bc7a(0xd1)][_0x27bc7a(0x8e)][_0x27bc7a(0xf1)](this),this[_0x27bc7a(0xfb)]&&this[_0x27bc7a(0xde)]()&&this[_0x27bc7a(0x89)]();},Sprite_Picture[_0x52cd7b(0xb9)]['updateAnimatedPictureCount']=function(){const _0x19cdef=_0x52cd7b;this[_0x19cdef(0x9b)]+=0x1,this[_0x19cdef(0x9b)]>=this['animationWaitFrames']()&&('oUQvs'!==_0x19cdef(0xa6)?(this[_0x19cdef(0xac)]=0x0,this['_attachPictureAnimationIndex']+=0x1,this[_0x19cdef(0xab)]>=this['_attachPictureAnimationMaxCells']&&(this[_0x19cdef(0xab)]=0x0),this[_0x19cdef(0x93)]()):(this[_0x19cdef(0x9b)]=0x0,this[_0x19cdef(0xda)]+=0x1,this['_animationIndex']>=this['_animationMaxCells']&&(_0x19cdef(0xc1)==='nbAaV'?this[_0x19cdef(0x100)]()?_0x19cdef(0xdf)==='cjLIi'?(this[_0x19cdef(0xee)]=!![],this[_0x19cdef(0x9c)]=_0x503d30[_0x19cdef(0xa3)](0x1,_0xf47b8e(_0xd18d0f['$1'])),this[_0x19cdef(0xc2)]=_0x4da78d[_0x19cdef(0xa3)](0x1,_0x16cee8(_0x1c750e['$2'])),this[_0x19cdef(0xb0)]=this[_0x19cdef(0x9c)]*this[_0x19cdef(0xc2)]):this[_0x19cdef(0xda)]=0x0:'JPQVO'==='iNRrL'?(_0x593b3b['AnimatedPictures'][_0x19cdef(0x8e)][_0x19cdef(0xf1)](this),this['visible']&&this[_0x19cdef(0xde)]()&&this[_0x19cdef(0x89)]()):this[_0x19cdef(0xda)]=this[_0x19cdef(0xb0)]-0x1:(this[_0x19cdef(0xe5)]=[],this[_0x19cdef(0x96)]=[])),this[_0x19cdef(0xce)]()));},Sprite_Picture['prototype'][_0x52cd7b(0xce)]=function(){const _0x1fb2fb=_0x52cd7b,_0x262cd7=(this[_0x1fb2fb(0x8d)]?this[_0x1fb2fb(0x8d)][_0x1fb2fb(0xe3)]:0x0)/this[_0x1fb2fb(0x9c)],_0x174e6f=(this['bitmap']?this[_0x1fb2fb(0x8d)][_0x1fb2fb(0xae)]:0x0)/this[_0x1fb2fb(0xc2)],_0xa635d5=this['_animationIndex']%this[_0x1fb2fb(0x9c)]*_0x262cd7,_0x21eda4=Math[_0x1fb2fb(0xcf)](this[_0x1fb2fb(0xda)]/this[_0x1fb2fb(0x9c)])*_0x174e6f;this[_0x1fb2fb(0xf0)](_0xa635d5,_0x21eda4,_0x262cd7,_0x174e6f);},Sprite_Picture[_0x52cd7b(0xb9)][_0x52cd7b(0x100)]=function(){const _0x3a12db=_0x52cd7b;return $gameScreen['isAnimatedPictureLooping'](this[_0x3a12db(0xb8)]);},Sprite_Picture['prototype'][_0x52cd7b(0xca)]=function(){return $gameScreen['getAnimatedPictureWaitFrames'](this['_pictureId']);};