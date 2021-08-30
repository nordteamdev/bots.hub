@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../satooshi/php-coveralls/composer/bin/coveralls
php "%BIN_TARGET%" %*
