importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "mymarkdown",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.a631d87f588a6bc7e6c1.js",
    "revision": "0b37e5ec7ed00558d71da02dd6ceeb6d"
  },
  {
    "url": "/_nuxt/layouts/default.646128771a5efe21d4e2.js",
    "revision": "79aeee0656c4082ebaa7225beb3d6be2"
  },
  {
    "url": "/_nuxt/manifest.83341b3f2fe9df013125.js",
    "revision": "901283677ee0d07f6b0c545b1f55c19f"
  },
  {
    "url": "/_nuxt/pages/editor.e7a4c4198d6326798853.js",
    "revision": "297530c284bcc6e6736c6137c99c480f"
  },
  {
    "url": "/_nuxt/pages/index.3285529636c8115a5ec7.js",
    "revision": "66ce66c768c707384d186df9bd495173"
  },
  {
    "url": "/_nuxt/pages/login.7545d94363935186d9fd.js",
    "revision": "62b6ab87743cce188e68998e3f03503a"
  },
  {
    "url": "/_nuxt/vendor.6fd4f2c5a68028611eee.js",
    "revision": "3a18e31636695fe0cd219fd8b8bcde14"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

