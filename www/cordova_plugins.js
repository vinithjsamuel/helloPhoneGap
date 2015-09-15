cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.loicknuchel.cordova.deviceaccounts/www/DeviceAccounts.js",
        "id": "org.loicknuchel.cordova.deviceaccounts.DeviceAccounts",
        "clobbers": [
            "plugins.DeviceAccounts"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-geolocation": "1.0.1",
    "cordova-plugin-device": "1.0.1",
    "org.loicknuchel.cordova.deviceaccounts": "0.0.1"
}
// BOTTOM OF METADATA
});