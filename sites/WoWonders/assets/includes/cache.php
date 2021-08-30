<?php
class Cache {
    function Wo_OpenCacheDir() {
        if (!file_exists('cache')) {
            $oldmask = umask(0);
            @mkdir('cache', 0777, true);
            @umask($oldmask);
        }
        if (!file_exists('cache/.htaccess')) {
            $f = @fopen("cache/.htaccess", "a+");
            @fwrite($f, "deny from all");
            @fclose($f);
        }
        if (!file_exists('cache/index.html')) {
            $f = @fopen("cache/index.html", "a+");
            @fclose($f);
        }
    }
    function read($fileName) {
        $fileName = 'cache/' . $fileName;
        if (file_exists($fileName)) {
            $handle   = fopen($fileName, 'rb');
            $variable = fread($handle, filesize($fileName));
            fclose($handle);
            return unserialize($variable);
        } else {
            return null;
        }
    }
    function write($fileName, $variable) {
        $fileName = 'cache/' . $fileName;
        $handle   = fopen($fileName, 'a');
        fwrite($handle, serialize($variable));
        fclose($handle);
    }
    function delete($fileName) {
        $fileName = 'cache/' . $fileName;
        @unlink($fileName);
    }
}
?>