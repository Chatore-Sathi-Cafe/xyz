// Android 14 fix: background-mode plugin ki foreground service ko type chahiye.
const fs = require('fs');
const path = require('path');
module.exports = function (ctx) {
  const f = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
  if (!fs.existsSync(f)) return;
  let x = fs.readFileSync(f, 'utf8');
  if (/ForegroundService[^>]*foregroundServiceType/.test(x)) return;
  const re = /<service(\s[^>]*?de\.appplant\.cordova\.plugin\.background\.ForegroundService[^>]*?)(\s*\/?>)/;
  if (!re.test(x)) { console.log('fix-service: service tag not found'); return; }
  x = x.replace(re, '<service$1 android:foregroundServiceType="specialUse"$2');
  fs.writeFileSync(f, x);
  console.log('fix-service: foregroundServiceType added');
};
