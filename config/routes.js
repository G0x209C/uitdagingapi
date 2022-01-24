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


    /**
     *  /==============
     * |    API routes
     *  \==============
     */
    'POST /api/checkuserexists': {action:'checkifuserexists'},

    'POST /api/joinroom': {action:'socket/joinroom'},

    'POST /api/newplayer': {action:'newplayer'},

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
