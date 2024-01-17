/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/exittodesktop/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_GameOver
 * @plugindesc Adds options to close the game window (exit to desktop)
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds an option to close the game completely in 
 * the title screen, game end screen, and (if using CGMZ GameOver) in the game
 * over screen as well.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin does not use plugin commands.
 *
 * Version History:
 * 1.0.0 - Initial release
 *
 * @param Command Name
 * @type text
 * @default Exit Game
 * @desc The text to show for the command
 *
 * @param Hide in Browser
 * @type boolean
 * @default true
 * @desc Hide exit game command if the player is in web browser?
*/
var Imported = Imported || {};
Imported.CGMZ_ExitToDesktop = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Exit to Desktop"] = "1.0.0";
CGMZ.ExitToDesktop = CGMZ.ExitToDesktop || {};
CGMZ.ExitToDesktop.parameters = PluginManager.parameters('CGMZ_ExitToDesktop');
CGMZ.ExitToDesktop.CommandName = CGMZ.ExitToDesktop.parameters["Command Name"];
CGMZ.ExitToDesktop.HideInBrowser = (CGMZ.ExitToDesktop.parameters["Hide in Browser"] === "true") ? true : false;
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// Add additional command to the title window
//=============================================================================
//-----------------------------------------------------------------------------
// Add command to exit the game to the command window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_SceneTitle_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	alias_CGMZ_ExitToDesktop_SceneTitle_createCommandWindow.call(this);
	this._commandWindow.setHandler("CGMZ_exitToDesktop", this.CGMZ_commandExitToDesktop.bind(this));
};
//-----------------------------------------------------------------------------
// Exit the game handling
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_commandExitToDesktop = function() {
	SceneManager.exit();
};
//=============================================================================
// Window_TitleCommand
//-----------------------------------------------------------------------------
// Add additional command to the title window
//=============================================================================
//-----------------------------------------------------------------------------
// Add command to exit the game to the command window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_WindowTitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    alias_CGMZ_ExitToDesktop_WindowTitleCommand_makeCommandList.call(this);
	if(Utils.isNwjs() || !CGMZ.ExitToDesktop.HideInBrowser) {
		this.addCommand(CGMZ.ExitToDesktop.CommandName, "CGMZ_exitToDesktop");
	}
};
//=============================================================================
// Scene_GameEnd
//-----------------------------------------------------------------------------
// Add additional command to the game end command window
//=============================================================================
//-----------------------------------------------------------------------------
// Add command to exit the game to the command window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_SceneGameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
Scene_GameEnd.prototype.createCommandWindow = function() {
    alias_CGMZ_ExitToDesktop_SceneGameEnd_createCommandWindow.call(this);
	this._commandWindow.setHandler("CGMZ_exitToDesktop", this.CGMZ_commandExitToDesktop.bind(this));
};
//-----------------------------------------------------------------------------
// Set visible lines to 3 in the gameEnd window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_SceneGameEnd_commandWindowRect = Scene_GameEnd.prototype.commandWindowRect;
Scene_GameEnd.prototype.commandWindowRect = function() {
    let rect = alias_CGMZ_ExitToDesktop_SceneGameEnd_commandWindowRect.call(this);
	if(Utils.isNwjs() || !CGMZ.ExitToDesktop.HideInBrowser) {
		rect.height = this.calcWindowHeight(3, true);
	}
	return rect;
};
//-----------------------------------------------------------------------------
// Exit the game handling
//-----------------------------------------------------------------------------
Scene_GameEnd.prototype.CGMZ_commandExitToDesktop = function() {
	SceneManager.exit();
};
//=============================================================================
// Window_GameEnd
//-----------------------------------------------------------------------------
// Add additional command to the game end window
//=============================================================================
//-----------------------------------------------------------------------------
// Add command to exit the game to the command window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_WindowGameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
Window_GameEnd.prototype.makeCommandList = function() {
    alias_CGMZ_ExitToDesktop_WindowGameEnd_makeCommandList.call(this);
	if(Utils.isNwjs() || !CGMZ.ExitToDesktop.HideInBrowser) {
		this.addCommand(CGMZ.ExitToDesktop.CommandName, "CGMZ_exitToDesktop");
	}
};
//-----------------------------------------------------------------------------
// Below code only if CGMZ Game Over imported
//-----------------------------------------------------------------------------
if(Imported.CGMZ_GameOver && CGMZ.GameOver.ShowCommandWindow) {
//=============================================================================
// Scene_Gameover
//-----------------------------------------------------------------------------
// Add additional command to the game over command window
//=============================================================================
//-----------------------------------------------------------------------------
// Add game end option to game over command window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_SceneGameOver_addCustomHandlers = Scene_Gameover.prototype.CGMZ_GameOver_addCustomHandlers;
Scene_Gameover.prototype.CGMZ_GameOver_addCustomHandlers = function() {
	alias_CGMZ_ExitToDesktop_SceneGameOver_addCustomHandlers.call(this);
	this._commandWindow.setHandler("CGMZ_exitToDesktop", this.CGMZ_commandExitToDesktop.bind(this));
};
//-----------------------------------------------------------------------------
// Number of commands in command window
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_SceneGameOver_numCommands = Scene_Gameover.prototype.CGMZ_GameOver_numCommands;
Scene_Gameover.prototype.CGMZ_GameOver_numCommands = function() {
	return 1 + alias_CGMZ_ExitToDesktop_SceneGameOver_numCommands.call(this);
};
//-----------------------------------------------------------------------------
// Exit the game handling
//-----------------------------------------------------------------------------
Scene_Gameover.prototype.CGMZ_commandExitToDesktop = function() {
	SceneManager.exit();
};
//=============================================================================
// CGMZ_Window_GameOverCommand
//-----------------------------------------------------------------------------
// Add additional command to the game over command window
//=============================================================================
//-----------------------------------------------------------------------------
// Add game exit command
//-----------------------------------------------------------------------------
const alias_CGMZ_ExitToDesktop_WindowGameOver_makeCommandList = CGMZ_Window_GameOverCommand.prototype.makeCommandList;
CGMZ_Window_GameOverCommand.prototype.makeCommandList = function() {
	alias_CGMZ_ExitToDesktop_WindowGameOver_makeCommandList.call(this);
	if(Utils.isNwjs() || !CGMZ.ExitToDesktop.HideInBrowser) {
		this.addCommand(CGMZ.ExitToDesktop.CommandName, 'CGMZ_exitToDesktop');
	}
};
}