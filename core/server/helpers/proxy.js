// This file defines everything that helpers "require"
// With the exception of modules like lodash, Bluebird
// We can later refactor to enforce this something like we do in apps
var hbs = require('../themes/engine'),
    _ = require('lodash'),
    settingsCache = require('../settings/cache'),
    config = require('../config');

// Direct requires:
// - lodash
// - bluebird
// - downsize
// - moment-timezone
// - jsonpath

module.exports = {
    hbs: hbs,
    SafeString: hbs.SafeString,
    escapeExpression: hbs.escapeExpression,

    // TODO: Expose less of the API to make this safe
    api: require('../api'),
    // TODO: Only expose "get"
    settingsCache: settingsCache,

    // These 3 are kind of core and required all the time
    errors: require('../errors'),
    i18n: require('../i18n'),
    logging: require('../logging'),

    // This is used to detect if "isPost" is true in prevNext.
    checks: require('../data/schema').checks,

    // Config!
    // Keys used:
    // minifyAssets in asset helper
    // isPrivacyDisabled & referrerPolicy used in ghost_head
    // Subscribe app uses routeKeywords
    config: {
        get: config.get.bind(config),
        isPrivacyDisabled: config.isPrivacyDisabled.bind(config)
    },

    // Labs utils for enabling/disabling helpers
    labs: require('../utils/labs'),

    // System for apps to hook into one day maybe
    filters: require('../filters'),

    // Things required from data/meta
    metaData: {
        get: require('../data/meta'), // ghost_head
        getAssetUrl: require('../data/meta/asset_url'), // asset
        getMetaDataExcerpt: require('../data/meta/excerpt'), // excerpt
        getMetaDataDescription: require('../data/meta/description'), // meta_desc
        getMetaDataTitle: require('../data/meta/title'), // meta_title
        getPaginatedUrl: require('../data/meta/paginated_url'), // page_url
        getMetaDataUrl: require('../data/meta/url') // url
    },

    // The local template thing, should this be merged with the channels one?
    templates: require('./template'),

    // Various utils, needs cleaning up / simplifying
    socialUrls: require('../utils/social-urls'),
    url: require('../utils').url,
    utils: {
        findKey: function findKey(key /* ...objects... */) {
            var objects = Array.prototype.slice.call(arguments, 1);

            return _.reduceRight(objects, function (result, object) {
                if (object && _.has(object, key) && !_.isEmpty(object[key])) {
                    result = object[key];
                }

                return result;
            }, null);
        }
    },
    visibility: require('../utils/visibility')
};
