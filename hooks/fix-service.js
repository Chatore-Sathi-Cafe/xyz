// Android 14 fix: background-mode plugin ki foreground service ko type chahiye.
// Idempotent: kitni bhi baar chale, foregroundServiceType sirf ek baar rahega.
const fs = require('fs');
const path = require('path');
module.exports = function (ctx) {
  const f = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
  if (!fs.existsSync(f)) return;
  const x = fs.readFileSync(f, 'utf8');
  let found = false;
  const y = x.replace(/<service\b[^>]*>/g, function (tag) {
    if (tag.indexOf('de.appplant.cordova.plugin.background.ForegroundService') === -1) return tag;
    found = true;
    // pehle koi bhi purani foregroundServiceType hata do (duplicate se bachne ke liye)
    let t = tag.replace(/\s+android:foregroundServiceType\s*=\s*("[^"]*"|'[^']*')/g, '');
    // phir ek baar lagao
    t = t.replace(/\s*(\/?>)$/, ' android:foregroundServiceType="specialUse" $1');
    return t;
  });
  if (!found) { console.log('fix-service: service tag not found'); return; }
  if (y !== x) fs.writeFileSync(f, y);
  console.log('fix-service: foregroundServiceType set (once)');
};
