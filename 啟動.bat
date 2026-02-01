@echo off
chcp 65001 >nul
echo =========================================
echo   正在啟動 Portfolio 專案集...
echo =========================================
echo.

set "TARGET_URL=%~dp0index.html"

:: 1. 嘗試使用 Google Chrome
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo [系統] 偵測到 Google Chrome，正在開啟...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "%TARGET_URL%"
    goto :EOF
)
if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    echo [系統] 偵測到 Google Chrome (x86)，正在開啟...
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "%TARGET_URL%"
    goto :EOF
)

:: 2. 嘗試使用 Microsoft Edge
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo [系統] 偵測到 Microsoft Edge，正在開啟...
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "%TARGET_URL%"
    goto :EOF
)

:: 3. 如果都找不到，使用系統預設
echo [系統] 未偵測到指定瀏覽器，使用系統預設開啟...
start "" "%TARGET_URL%"
