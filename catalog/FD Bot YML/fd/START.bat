
@ECHO OFF
SET BINDIR=%~dp0
CD /D "%BINDIR%"
java -Xincgc -Xmx1G -Dfile.encoding=UTF-8 -jar Bot.jar
Pause
