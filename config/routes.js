/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  'GET /csrfToken': {action: 'security/grant-csrf-token'},

  /**
   *  /==============
   * |    Socket-specific routes
   *  \==============
   */

  'POST /socket/joinroom': {action: 'socket/joinroom'},
  'POST /socket/initdata': {action: 'socket/emit-init-data'},

  /**
   *  /==============
   * |    API routes
   *  \==============
   */
  'POST /api/checkuserexists': {action: 'checkifuserexists'},

  'POST /api/newplayer': {action: 'newplayer'},

  'POST /api/getscoreboard': {action: 'getscoreboard'},
  /**
   *  /==============
   * |    Chat routes
   *  \==============
   */
  'POST /chat/getmessages': {action: 'chat/getmessages'},
  'POST /chat/sendmessage': {action: 'chat/sendmessage'},

  /**
   *  /==============
   * |    Game routes
   *  \==============
   */

};
