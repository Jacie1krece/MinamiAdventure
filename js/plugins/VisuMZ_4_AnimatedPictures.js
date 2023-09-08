//=============================================================================
// VisuStella MZ - Animated Pictures
// VisuMZ_X_AnimatedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AnimatedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AnimatedPictures = VisuMZ.AnimatedPictures || {};
VisuMZ.AnimatedPictures.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [AnimatedPictures]
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

const _0x8b73ff=_0x4691;(function(_0x296442,_0x3119fe){const _0x54597e=_0x4691,_0x4e7450=_0x296442();while(!![]){try{const _0x373f74=-parseInt(_0x54597e(0x182))/0x1+parseInt(_0x54597e(0x198))/0x2*(-parseInt(_0x54597e(0x17f))/0x3)+parseInt(_0x54597e(0x168))/0x4*(parseInt(_0x54597e(0x180))/0x5)+-parseInt(_0x54597e(0x184))/0x6+-parseInt(_0x54597e(0x18c))/0x7+-parseInt(_0x54597e(0x15d))/0x8+-parseInt(_0x54597e(0x195))/0x9*(-parseInt(_0x54597e(0x1a5))/0xa);if(_0x373f74===_0x3119fe)break;else _0x4e7450['push'](_0x4e7450['shift']());}catch(_0x1eccc9){_0x4e7450['push'](_0x4e7450['shift']());}}}(_0xe635,0x1dd93));var label='AnimatedPictures',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x8b73ff(0x19b)](function(_0x5b54dc){const _0x1de441=_0x8b73ff;return _0x5b54dc[_0x1de441(0x147)]&&_0x5b54dc[_0x1de441(0x142)][_0x1de441(0x145)]('['+label+']');})[0x0];function _0x4691(_0x1bd648,_0x4f553f){const _0xe6355c=_0xe635();return _0x4691=function(_0x46911e,_0x16f652){_0x46911e=_0x46911e-0x135;let _0x31debb=_0xe6355c[_0x46911e];return _0x31debb;},_0x4691(_0x1bd648,_0x4f553f);}function _0xe635(){const _0x28585c=['description','Game_Event_checkEventsMoveCoreStringTags','bitmap','includes','animationWaitFrames','status','width','floor','_animatedPictureLoop','YvOTX','ARRAYFUNC','resetFrame','isAnimatedPictureLooping','_attachPictureSprite','FSsnu','checkEventsMoveCoreStringTags','_attachPictureAnimationVertCells','_animationHorzCells','updateAnimatedPictureCount','attachPictureAniWaitFrames','_attachPictureAnimationWaitFrames','parse','getAttachPictureBitmapWidth','Sprite_Picture_loadBitmap','_attachPictureAnimationIndex','exit','WaitFrames','846128lmoIKB','updateAnimatedAttachPictureBitmap','ChangeProperties','Sprite_Picture_initialize','_pictureId','lOhwg','_animationVertCells','bind','onLoadAttachPicture','_character','_animatedPictureWait','4LZnNKS','setAnimatedPictureLooping','lKoyj','_animationMaxCells','aFQcz','call','Game_CharacterBase_clearAttachPictureSettings','Sprite_Character_getAttachPictureBitmapWidth','_animationIndex','Sprite_Character_onLoadAttachPicture','clearAttachPictureSettings','Sprite_Character_updateAttachPictureBitmap','Game_Screen_initialize','ARRAYEVAL','format','ARRAYNUM','_pictureName','updateAttachedPictureAnimatedPictureFrame','ARRAYSTR','Loop','Sprite_Picture_update','_attachPictureAnimationCount','prototype','81JWpZmY','202445RbctZe','isAnimatedPicture','231912FyhyOl','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','876390PBxIKG','_animationCount','aniWaitFrames','max','map','ConvertParams','initAnimatedPictureSettings','getAttachPictureBitmapHeight','1611400dklHcn','KTHra','EVAL','Sprite_Character_getAttachPictureBitmapHeight','AnimatedPictures','ARRAYJSON','setupAnimatedPictureData','PictureID','visible','43074dOGbOG','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','update','2390XkzzMz','setAnimatedPictureWaitFrames','loadBitmap','filter','_attachPicture','height','return\x200','toUpperCase','realPictureId','addLoadListener','setFrame','parameters','_attachPictureAnimationHorzCells','1730wyPvqL','Settings','tPRdj','attachPictureSettings','_isAnimatedPicture','updateAnimatedPictureFrame','_attachPictureAnimationMaxCells','initAnimatedPicture','_isAttachPictureAnimatedPicture','getAnimatedPictureWaitFrames','isAnimationLooping','name','JSON','attachPictureFilename','NUM','QcbsQ','match'];_0xe635=function(){return _0x28585c;};return _0xe635();}VisuMZ[label]['Settings']=VisuMZ[label][_0x8b73ff(0x1a6)]||{},VisuMZ[_0x8b73ff(0x189)]=function(_0x132983,_0x5468d8){const _0x34c35c=_0x8b73ff;for(const _0x12a0e6 in _0x5468d8){if(_0x12a0e6[_0x34c35c(0x141)](/(.*):(.*)/i)){const _0x1bfb9f=String(RegExp['$1']),_0x19a7ba=String(RegExp['$2'])[_0x34c35c(0x19f)]()['trim']();let _0x2c77ab,_0x16d6e7,_0x4f3fd5;switch(_0x19a7ba){case _0x34c35c(0x13f):_0x2c77ab=_0x5468d8[_0x12a0e6]!==''?Number(_0x5468d8[_0x12a0e6]):0x0;break;case _0x34c35c(0x177):_0x16d6e7=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):[],_0x2c77ab=_0x16d6e7[_0x34c35c(0x188)](_0x4cf286=>Number(_0x4cf286));break;case _0x34c35c(0x18e):_0x2c77ab=_0x5468d8[_0x12a0e6]!==''?eval(_0x5468d8[_0x12a0e6]):null;break;case _0x34c35c(0x175):_0x16d6e7=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):[],_0x2c77ab=_0x16d6e7[_0x34c35c(0x188)](_0x5da931=>eval(_0x5da931));break;case _0x34c35c(0x13d):_0x2c77ab=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):'';break;case _0x34c35c(0x191):_0x16d6e7=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):[],_0x2c77ab=_0x16d6e7[_0x34c35c(0x188)](_0x2d8bc2=>JSON[_0x34c35c(0x157)](_0x2d8bc2));break;case'FUNC':_0x2c77ab=_0x5468d8[_0x12a0e6]!==''?new Function(JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6])):new Function(_0x34c35c(0x19e));break;case _0x34c35c(0x14c):_0x16d6e7=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):[],_0x2c77ab=_0x16d6e7['map'](_0x3911e1=>new Function(JSON[_0x34c35c(0x157)](_0x3911e1)));break;case'STR':_0x2c77ab=_0x5468d8[_0x12a0e6]!==''?String(_0x5468d8[_0x12a0e6]):'';break;case _0x34c35c(0x17a):_0x16d6e7=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):[],_0x2c77ab=_0x16d6e7[_0x34c35c(0x188)](_0x29e0aa=>String(_0x29e0aa));break;case'STRUCT':_0x4f3fd5=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):{},_0x2c77ab=VisuMZ[_0x34c35c(0x189)]({},_0x4f3fd5);break;case'ARRAYSTRUCT':_0x16d6e7=_0x5468d8[_0x12a0e6]!==''?JSON[_0x34c35c(0x157)](_0x5468d8[_0x12a0e6]):[],_0x2c77ab=_0x16d6e7[_0x34c35c(0x188)](_0x12fb34=>VisuMZ[_0x34c35c(0x189)]({},JSON[_0x34c35c(0x157)](_0x12fb34)));break;default:continue;}_0x132983[_0x1bfb9f]=_0x2c77ab;}}return _0x132983;},(_0x28577a=>{const _0x6e4be3=_0x8b73ff,_0x13b21c=_0x28577a['name'];for(const _0x4698e9 of dependencies){if('ABdYO'==='XBWRo')this[_0x6e4be3(0x178)][_0x6e4be3(0x141)](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this[_0x6e4be3(0x135)]=!![],this[_0x6e4be3(0x153)]=_0x26a651[_0x6e4be3(0x187)](0x1,_0x4e24da(_0x3b300c['$1'])),this[_0x6e4be3(0x163)]=_0x2a3ae0[_0x6e4be3(0x187)](0x1,_0x58323f(_0x83606['$2'])),this[_0x6e4be3(0x16b)]=this[_0x6e4be3(0x153)]*this[_0x6e4be3(0x163)]):(this[_0x6e4be3(0x135)]=![],this[_0x6e4be3(0x153)]=0x1,this[_0x6e4be3(0x163)]=0x1,this[_0x6e4be3(0x16b)]=0x1),this[_0x6e4be3(0x185)]=0x0,this[_0x6e4be3(0x170)]=0x0;else{if(!Imported[_0x4698e9]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x13b21c,_0x4698e9)),SceneManager[_0x6e4be3(0x15b)]();break;}}}const _0x278a9e=_0x28577a[_0x6e4be3(0x142)];if(_0x278a9e[_0x6e4be3(0x141)](/\[Version[ ](.*?)\]/i)){const _0x48e70f=Number(RegExp['$1']);_0x48e70f!==VisuMZ[label]['version']&&(alert(_0x6e4be3(0x196)[_0x6e4be3(0x176)](_0x13b21c,_0x48e70f)),SceneManager[_0x6e4be3(0x15b)]());}if(_0x278a9e[_0x6e4be3(0x141)](/\[Tier[ ](\d+)\]/i)){const _0x1269ff=Number(RegExp['$1']);_0x1269ff<tier?(alert(_0x6e4be3(0x183)['format'](_0x13b21c,_0x1269ff,tier)),SceneManager[_0x6e4be3(0x15b)]()):'Cduan'===_0x6e4be3(0x14b)?this['bitmap'][_0x6e4be3(0x1a1)](this['resetFrame'][_0x6e4be3(0x164)](this)):tier=Math[_0x6e4be3(0x187)](_0x1269ff,tier);}VisuMZ[_0x6e4be3(0x189)](VisuMZ[label][_0x6e4be3(0x1a6)],_0x28577a[_0x6e4be3(0x1a3)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x8b73ff(0x13c)],_0x8b73ff(0x15f),_0xa2c8c7=>{const _0x2fad9c=_0x8b73ff;VisuMZ[_0x2fad9c(0x189)](_0xa2c8c7,_0xa2c8c7);const _0x1f5d34=_0xa2c8c7[_0x2fad9c(0x193)],_0x229860=_0xa2c8c7[_0x2fad9c(0x17b)],_0x21d949=_0xa2c8c7[_0x2fad9c(0x15c)];$gameScreen[_0x2fad9c(0x169)](_0x1f5d34,_0x229860),$gameScreen[_0x2fad9c(0x199)](_0x1f5d34,_0x21d949);}),VisuMZ['AnimatedPictures']['Game_Screen_initialize']=Game_Screen[_0x8b73ff(0x17e)]['initialize'],Game_Screen[_0x8b73ff(0x17e)]['initialize']=function(){const _0x4ca409=_0x8b73ff;VisuMZ[_0x4ca409(0x190)][_0x4ca409(0x174)]['call'](this),this['initAnimatedPictureSettings']();},Game_Screen['prototype'][_0x8b73ff(0x18a)]=function(){const _0x3f7e5e=_0x8b73ff;this[_0x3f7e5e(0x14a)]=[],this[_0x3f7e5e(0x167)]=[];},Game_Screen[_0x8b73ff(0x17e)][_0x8b73ff(0x14e)]=function(_0x6f037c){const _0xe42eb1=_0x8b73ff;this[_0xe42eb1(0x14a)]===undefined&&this[_0xe42eb1(0x18a)]();const _0x357843=this[_0xe42eb1(0x1a0)](_0x6f037c);return this['_animatedPictureLoop'][_0x357843]===undefined&&(this[_0xe42eb1(0x14a)][_0x357843]=VisuMZ['AnimatedPictures']['Settings'][_0xe42eb1(0x17b)]),this[_0xe42eb1(0x14a)][_0x357843];},Game_Screen[_0x8b73ff(0x17e)][_0x8b73ff(0x169)]=function(_0x19df0c,_0x3726e){const _0x497183=_0x8b73ff;this[_0x497183(0x14a)]===undefined&&this[_0x497183(0x18a)]();const _0x1e4417=this[_0x497183(0x1a0)](_0x19df0c);this[_0x497183(0x14a)][_0x1e4417]=_0x3726e;},Game_Screen['prototype'][_0x8b73ff(0x13a)]=function(_0x26e666){const _0x538120=_0x8b73ff;this['_animatedPictureWait']===undefined&&this['initAnimatedPictureSettings']();const _0x560c76=this['realPictureId'](_0x26e666);return this[_0x538120(0x167)][_0x560c76]===undefined&&(this['_animatedPictureWait'][_0x560c76]=VisuMZ[_0x538120(0x190)]['Settings'][_0x538120(0x15c)]),this['_animatedPictureWait'][_0x560c76];},Game_Screen[_0x8b73ff(0x17e)][_0x8b73ff(0x199)]=function(_0x31f637,_0x44c273){const _0x36220a=_0x8b73ff;this[_0x36220a(0x167)]===undefined&&this[_0x36220a(0x18a)]();const _0x32e26b=this[_0x36220a(0x1a0)](_0x31f637);this[_0x36220a(0x167)][_0x32e26b]=_0x44c273;},VisuMZ[_0x8b73ff(0x190)][_0x8b73ff(0x16e)]=Game_CharacterBase[_0x8b73ff(0x17e)][_0x8b73ff(0x172)],Game_CharacterBase[_0x8b73ff(0x17e)][_0x8b73ff(0x172)]=function(){const _0x1d0a9f=_0x8b73ff;VisuMZ['AnimatedPictures'][_0x1d0a9f(0x16e)][_0x1d0a9f(0x16d)](this),this['_attachPicture'][_0x1d0a9f(0x186)]=VisuMZ[_0x1d0a9f(0x190)][_0x1d0a9f(0x1a6)][_0x1d0a9f(0x15c)]||0x1;},VisuMZ[_0x8b73ff(0x190)][_0x8b73ff(0x143)]=Game_Event[_0x8b73ff(0x17e)]['checkEventsMoveCoreStringTags'],Game_Event[_0x8b73ff(0x17e)][_0x8b73ff(0x151)]=function(_0x59b6da){const _0x18bdac=_0x8b73ff;VisuMZ[_0x18bdac(0x190)][_0x18bdac(0x143)][_0x18bdac(0x16d)](this,_0x59b6da),_0x59b6da[_0x18bdac(0x141)](/<(?:ATTACH PICTURE|PICTURE) (?:WAIT|DELAY) (?:FRAME|FRAMES):[ ](\d+)>/i)&&('GlNYx'!=='pRnIZ'?this[_0x18bdac(0x19c)][_0x18bdac(0x186)]=Math[_0x18bdac(0x187)](0x1,Number(RegExp['$1'])):(_0x4d9591[_0x18bdac(0x190)][_0x18bdac(0x174)][_0x18bdac(0x16d)](this),this['initAnimatedPictureSettings']()));},Game_CharacterBase[_0x8b73ff(0x17e)][_0x8b73ff(0x155)]=function(){const _0x28d773=_0x8b73ff;return this[_0x28d773(0x1a8)]()[_0x28d773(0x186)]??0x1;},VisuMZ[_0x8b73ff(0x190)]['Sprite_Character_updateAttachPictureBitmap']=Sprite_Character['prototype']['updateAttachPictureBitmap'],Sprite_Character[_0x8b73ff(0x17e)]['updateAttachPictureBitmap']=function(){const _0x51df68=_0x8b73ff;VisuMZ[_0x51df68(0x190)][_0x51df68(0x173)]['call'](this),this[_0x51df68(0x15e)]();},VisuMZ[_0x8b73ff(0x190)][_0x8b73ff(0x171)]=Sprite_Character[_0x8b73ff(0x17e)][_0x8b73ff(0x165)],Sprite_Character[_0x8b73ff(0x17e)][_0x8b73ff(0x165)]=function(_0x1b91a0){const _0x150630=_0x8b73ff;this[_0x150630(0x17d)]=0x0,this[_0x150630(0x15a)]=0x0,VisuMZ['AnimatedPictures'][_0x150630(0x171)]['call'](this,_0x1b91a0);const _0x370f39=this['_character'][_0x150630(0x13e)]();_0x370f39['match'](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this[_0x150630(0x139)]=!![],this[_0x150630(0x1a4)]=Math[_0x150630(0x187)](0x1,parseInt(RegExp['$1'])),this[_0x150630(0x152)]=Math[_0x150630(0x187)](0x1,parseInt(RegExp['$2'])),this[_0x150630(0x137)]=this[_0x150630(0x1a4)]*this['_attachPictureAnimationVertCells'],this[_0x150630(0x156)]=this[_0x150630(0x166)][_0x150630(0x155)](),this[_0x150630(0x179)]()):(this[_0x150630(0x14f)][_0x150630(0x194)]=![],this[_0x150630(0x139)]=![],this['_attachPictureAnimationHorzCells']=0x1,this[_0x150630(0x152)]=0x1,this[_0x150630(0x137)]=0x1,this[_0x150630(0x14f)][_0x150630(0x1a2)](0x0,0x0,_0x1b91a0['width'],_0x1b91a0[_0x150630(0x19d)]),this['_attachPictureSprite']['visible']=!![]);},VisuMZ[_0x8b73ff(0x190)]['Sprite_Character_getAttachPictureBitmapWidth']=Sprite_Character['prototype'][_0x8b73ff(0x158)],Sprite_Character['prototype']['getAttachPictureBitmapWidth']=function(){const _0xdea409=_0x8b73ff;let _0x5b6f38=VisuMZ['AnimatedPictures'][_0xdea409(0x16f)][_0xdea409(0x16d)](this);return _0x5b6f38/(this[_0xdea409(0x1a4)]||0x1);},VisuMZ[_0x8b73ff(0x190)][_0x8b73ff(0x18f)]=Sprite_Character[_0x8b73ff(0x17e)][_0x8b73ff(0x18b)],Sprite_Character[_0x8b73ff(0x17e)][_0x8b73ff(0x18b)]=function(){const _0x29398f=_0x8b73ff;let _0x3e4172=VisuMZ['AnimatedPictures'][_0x29398f(0x18f)][_0x29398f(0x16d)](this);return _0x3e4172/(this[_0x29398f(0x152)]||0x1);},Sprite_Character[_0x8b73ff(0x17e)][_0x8b73ff(0x15e)]=function(){const _0x2570b2=_0x8b73ff;if(!this[_0x2570b2(0x139)])return;this['_attachPictureAnimationCount']+=0x1,this[_0x2570b2(0x17d)]>=this[_0x2570b2(0x156)]&&(_0x2570b2(0x162)!==_0x2570b2(0x140)?(this[_0x2570b2(0x17d)]=0x0,this[_0x2570b2(0x15a)]+=0x1,this[_0x2570b2(0x15a)]>=this[_0x2570b2(0x137)]&&(this[_0x2570b2(0x15a)]=0x0),this['updateAttachedPictureAnimatedPictureFrame']()):(this[_0x2570b2(0x192)](),_0x30a785[_0x2570b2(0x190)][_0x2570b2(0x159)]['call'](this),this['isAnimatedPicture']()?this['bitmap'][_0x2570b2(0x1a1)](this['updateAnimatedPictureFrame'][_0x2570b2(0x164)](this)):this[_0x2570b2(0x144)]['addLoadListener'](this[_0x2570b2(0x14d)][_0x2570b2(0x164)](this))));},Sprite_Character[_0x8b73ff(0x17e)][_0x8b73ff(0x179)]=function(){const _0x3ca0a0=_0x8b73ff,_0xfdb7a1=this[_0x3ca0a0(0x14f)],_0x586452=_0xfdb7a1[_0x3ca0a0(0x144)],_0x4c9501=_0x586452[_0x3ca0a0(0x148)]/this['_attachPictureAnimationHorzCells'],_0x7d01d8=_0x586452[_0x3ca0a0(0x19d)]/this['_attachPictureAnimationVertCells'],_0x2a7d20=this[_0x3ca0a0(0x15a)]%this[_0x3ca0a0(0x1a4)]*_0x4c9501,_0x130ac6=Math['floor'](this[_0x3ca0a0(0x15a)]/this[_0x3ca0a0(0x1a4)])*_0x7d01d8;_0xfdb7a1[_0x3ca0a0(0x1a2)](_0x2a7d20,_0x130ac6,_0x4c9501,_0x7d01d8),_0xfdb7a1[_0x3ca0a0(0x194)]=!![];},VisuMZ[_0x8b73ff(0x190)][_0x8b73ff(0x160)]=Sprite_Picture[_0x8b73ff(0x17e)]['initialize'],Sprite_Picture['prototype']['initialize']=function(_0x1ec73f){const _0x34899b=_0x8b73ff;this[_0x34899b(0x138)](),VisuMZ[_0x34899b(0x190)][_0x34899b(0x160)][_0x34899b(0x16d)](this,_0x1ec73f);},Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x138)]=function(){const _0xf30d53=_0x8b73ff;this[_0xf30d53(0x135)]=![],this[_0xf30d53(0x153)]=0x1,this['_animationVertCells']=0x1,this['_animationMaxCells']=0x1,this[_0xf30d53(0x185)]=0x0,this[_0xf30d53(0x170)]=0x0;},Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x181)]=function(){const _0x58b1d8=_0x8b73ff;if(this[_0x58b1d8(0x135)]===undefined)this[_0x58b1d8(0x138)]();return this['_isAnimatedPicture'];},VisuMZ['AnimatedPictures'][_0x8b73ff(0x159)]=Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x19a)],Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x19a)]=function(){const _0x14a000=_0x8b73ff;this['setupAnimatedPictureData'](),VisuMZ[_0x14a000(0x190)][_0x14a000(0x159)][_0x14a000(0x16d)](this);if(this[_0x14a000(0x181)]())this[_0x14a000(0x144)][_0x14a000(0x1a1)](this[_0x14a000(0x136)]['bind'](this));else{if(_0x14a000(0x18d)!=='KTHra'){if(!this['_isAttachPictureAnimatedPicture'])return;this['_attachPictureAnimationCount']+=0x1,this[_0x14a000(0x17d)]>=this[_0x14a000(0x156)]&&(this[_0x14a000(0x17d)]=0x0,this[_0x14a000(0x15a)]+=0x1,this[_0x14a000(0x15a)]>=this['_attachPictureAnimationMaxCells']&&(this[_0x14a000(0x15a)]=0x0),this[_0x14a000(0x179)]());}else this[_0x14a000(0x144)][_0x14a000(0x1a1)](this[_0x14a000(0x14d)][_0x14a000(0x164)](this));}},Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x14d)]=function(){const _0x4f6b9e=_0x8b73ff;this[_0x4f6b9e(0x1a2)](0x0,0x0,this[_0x4f6b9e(0x144)]['width'],this['bitmap']['height']);},Sprite_Picture['prototype'][_0x8b73ff(0x192)]=function(){const _0x8eb2e=_0x8b73ff;this[_0x8eb2e(0x178)]['match'](/\[ANI\]\[(\d+)x(\d+)\]/i)?_0x8eb2e(0x1a7)!==_0x8eb2e(0x1a7)?this['initAnimatedPictureSettings']():(this['_isAnimatedPicture']=!![],this['_animationHorzCells']=Math[_0x8eb2e(0x187)](0x1,parseInt(RegExp['$1'])),this[_0x8eb2e(0x163)]=Math[_0x8eb2e(0x187)](0x1,parseInt(RegExp['$2'])),this[_0x8eb2e(0x16b)]=this[_0x8eb2e(0x153)]*this[_0x8eb2e(0x163)]):(this[_0x8eb2e(0x135)]=![],this[_0x8eb2e(0x153)]=0x1,this[_0x8eb2e(0x163)]=0x1,this['_animationMaxCells']=0x1),this['_animationCount']=0x0,this[_0x8eb2e(0x170)]=0x0;},VisuMZ[_0x8b73ff(0x190)][_0x8b73ff(0x17c)]=Sprite_Picture['prototype'][_0x8b73ff(0x197)],Sprite_Picture['prototype'][_0x8b73ff(0x197)]=function(){const _0x324a8b=_0x8b73ff;VisuMZ['AnimatedPictures'][_0x324a8b(0x17c)][_0x324a8b(0x16d)](this),this[_0x324a8b(0x194)]&&this['isAnimatedPicture']()&&this[_0x324a8b(0x154)]();},Sprite_Picture['prototype'][_0x8b73ff(0x154)]=function(){const _0x5a30f3=_0x8b73ff;this[_0x5a30f3(0x185)]+=0x1,this[_0x5a30f3(0x185)]>=this[_0x5a30f3(0x146)]()&&('FSsnu'!==_0x5a30f3(0x150)?this['_attachPictureAnimationIndex']=0x0:(this[_0x5a30f3(0x185)]=0x0,this[_0x5a30f3(0x170)]+=0x1,this[_0x5a30f3(0x170)]>=this[_0x5a30f3(0x16b)]&&(this[_0x5a30f3(0x13b)]()?this[_0x5a30f3(0x170)]=0x0:_0x5a30f3(0x16c)!==_0x5a30f3(0x16a)?this['_animationIndex']=this[_0x5a30f3(0x16b)]-0x1:this[_0x5a30f3(0x170)]=this['_animationMaxCells']-0x1),this['updateAnimatedPictureFrame']()));},Sprite_Picture['prototype']['updateAnimatedPictureFrame']=function(){const _0x33a868=_0x8b73ff,_0x4d91f4=this['bitmap']['width']/this[_0x33a868(0x153)],_0x4569b5=this[_0x33a868(0x144)]['height']/this['_animationVertCells'],_0x2fd886=this[_0x33a868(0x170)]%this[_0x33a868(0x153)]*_0x4d91f4,_0x1338a9=Math[_0x33a868(0x149)](this[_0x33a868(0x170)]/this[_0x33a868(0x153)])*_0x4569b5;this[_0x33a868(0x1a2)](_0x2fd886,_0x1338a9,_0x4d91f4,_0x4569b5);},Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x13b)]=function(){const _0x38ecad=_0x8b73ff;return $gameScreen[_0x38ecad(0x14e)](this[_0x38ecad(0x161)]);},Sprite_Picture[_0x8b73ff(0x17e)][_0x8b73ff(0x146)]=function(){const _0x1ae07c=_0x8b73ff;return $gameScreen[_0x1ae07c(0x13a)](this['_pictureId']);};