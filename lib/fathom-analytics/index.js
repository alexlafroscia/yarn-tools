"use strict";

function createSnippet(code) {
  return `
    <!-- Fathom - simple website analytics - https://usefathom.com -->
    <script>
    (function(f, a, t, h, o, m){
    a[h]=a[h]||function(){
    (a[h].q=a[h].q||[]).push(arguments)
    };
    o=f.createElement('script'),
    m=f.getElementsByTagName('script')[0];
    o.async=1; o.src=t; o.id='fathom-script';
    m.parentNode.insertBefore(o,m)
    })(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
    fathom('set', 'siteId', '${code}');
    fathom('set', 'spa', 'pushstate');
    fathom('trackPageview');
    </script>
    <!-- / Fathom -->
  `;
}

module.exports = {
  name: require("./package").name,

  isDevelopingAddon() {
    return true;
  },

  _getAddonOptions(app) {
    return (this.parent && this.parent.options) || (app && app.options) || {};
  },

  included(app) {
    this._super.included.apply(this, arguments);

    this._options = {
      siteId: "",
      isEnabled: false,
      ...this._getAddonOptions(app).fathom
    };
  },

  contentFor(hook) {
    const { siteId, isEnabled } = this._options;

    if (hook === "body-footer" && siteId && isEnabled) {
      return createSnippet(siteId);
    }
  }
};
