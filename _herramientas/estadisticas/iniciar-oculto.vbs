' Arranca el contador sin ventana (lo usa la tarea automatica de Windows)
Set fso = CreateObject("Scripting.FileSystemObject")
Set sh = CreateObject("WScript.Shell")
carpeta = fso.GetParentFolderName(WScript.ScriptFullName)
sh.CurrentDirectory = carpeta
sh.Run "cmd /c """ & carpeta & "\iniciar.bat""", 0, False
