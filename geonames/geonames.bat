
coproc2 samples\geonames\geonames.js geonames_doc.js http://10.33.5.63:2227 -v

GOTO end

IF %1. == . GOTO usage

coproc2 samples\geonames\geonames.js %1 http://10.33.5.63:2227 -v

:usage
ECHO Parameter missing

:end
