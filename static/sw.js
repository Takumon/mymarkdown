importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "mymarkdown",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.eaa9dfca7142566a7bd8.js",
    "revision": "c3e0b82f7055dd515bbf4485c6d68ec7"
  },
  {
    "url": "/_nuxt/layouts/default.4b9d5226ed83d1517ba5.js",
    "revision": "a5efe4b7a32d6ac8bead85c93ca16255"
  },
  {
    "url": "/_nuxt/manifest.a45e0bcc9860f0602903.js",
    "revision": "703bd22073bac172ed56b86f2554c074"
  },
  {
    "url": "/_nuxt/pages/editor.74e96cabc2d9a15771ab.js",
    "revision": "88c8f1da62c5550bfc37ef9f1c83c4a5"
  },
  {
    "url": "/_nuxt/pages/index.0ffc04e0ea7aa5abcc47.js",
    "revision": "b1674996377e1a2afe438204b4b3388c"
  },
  {
    "url": "/_nuxt/pages/login.88ebdba6fcc183373a07.js",
    "revision": "f24cb9d0ac794eb4d3cc60ed569996f0"
  },
  {
    "url": "/_nuxt/pages/sample.41bd78169c684006b3a3.js",
    "revision": "e03e346de8bca49aef0f1f8d75e69ac6"
  },
  {
    "url": "/_nuxt/vendor.452cc5a32c6380c42a12.js",
    "revision": "61669126397bca272ac908c7539b7872"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

