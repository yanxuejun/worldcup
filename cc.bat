@echo off
setlocal enabledelayedexpansion
title Claude Code Launcher
cls

echo ========================================
echo     Claude Code Environment Launcher
echo ========================================
echo.

:: Get user home directory
set "USER_HOME=%USERPROFILE%"

:: Create .claude.json if not exists
set "CONFIG_FILE=%USER_HOME%\.claude.json"
if not exist "%CONFIG_FILE%" (
    echo Creating %CONFIG_FILE%...
    echo {> "%CONFIG_FILE%"
    echo    "hasCompletedOnboarding": true>> "%CONFIG_FILE%"
    echo }>> "%CONFIG_FILE%"
    echo Done.
    echo.
)

:: Define API keys for each provider
set "ZHIPU_API_KEY=123"
set "MINIMAX_API_KEY=123"
set "KIMI_API_KEY=sk-kimi-ReSHu6tnPuhaYnjlrQUWwQv59okXgS9tQ43a44KN8QDW9XLIKRzK4QguHAVOsCnC"
set "ALIBABA_API_KEY=123"
set "DEEPSEEK_API_KEY=123"
set "OPENROUTER_API_KEY=123"
:: NVIDIA API Key added below
set "NVIDIA_API_KEY=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"

:: Define provider configurations
:: ... (Providors 1-10 remain the same) ...
set "PROV_1_NAME=Zhipu AI - GLM-4.7"
set "PROV_1_BASE_URL=https://open.bigmodel.cn/api/anthropic"
set "PROV_1_MODEL=glm-4.7"
set "PROV_1_API_KEY=%ZHIPU_API_KEY%"

set "PROV_7_NAME=Kimi (Moonshot)"
set "PROV_7_BASE_URL=https://api.kimi.com/coding/"
set "PROV_7_MODEL=kimi-k2.6"
set "PROV_7_API_KEY=%KIMI_API_KEY%"

:: NEW: NVIDIA Configuration
set "PROV_11_NAME=NVIDIA NIM"
set "PROV_11_BASE_URL=https://integrate.api.nvidia.com/v1"
set "PROV_11_MODEL=glm-5.1"
set "PROV_11_API_KEY=%NVIDIA_API_KEY%"

:: Display menu
echo Select your API provider:
echo.
echo    Zhipu AI Models:
echo    1. %PROV_1_NAME%
echo    2. Zhipu AI - GLM-4.6
echo    3. Zhipu AI - GLM-4-Plus
echo    4. Zhipu AI - GLM-4-Air
echo    5. Zhipu AI - GLM-4-Flash
echo.
echo    Other Providers:
echo    6. MiniMax (M2.7)
echo    7. %PROV_7_NAME%
echo    8. Alibaba Cloud (Qwen)
echo    9. DeepSeek
echo    10. OpenRouter
echo    11. %PROV_11_NAME% (GLM-5.1)
echo.
set /p "choice=Enter number (1-11): "

:: Validate input (Updated range to 11)
if "%choice%"=="" goto :invalid
if %choice% lss 1 goto :invalid
if %choice% gtr 11 goto :invalid

:: Clear any existing auth variables
set "ANTHROPIC_API_KEY="
set "ANTHROPIC_AUTH_TOKEN="

:: Set environment variables based on choice
if %choice%==1 ( set "PROVIDER=%PROV_1_NAME%" & set "ANTHROPIC_BASE_URL=%PROV_1_BASE_URL%" & set "ANTHROPIC_MODEL=%PROV_1_MODEL%" & set "ANTHROPIC_AUTH_TOKEN=%PROV_1_API_KEY%" )
:: ... (Choices 2-10 logic continues as before) ...
if %choice%==7 ( set "PROVIDER=%PROV_7_NAME%" & set "ANTHROPIC_BASE_URL=%PROV_7_BASE_URL%" & set "ANTHROPIC_MODEL=%PROV_7_MODEL%" & set "ANTHROPIC_AUTH_TOKEN=%PROV_7_API_KEY%" )

:: NEW: Choice 11 logic
if %choice%==11 (
    set "PROVIDER=%PROV_11_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_11_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_11_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_11_API_KEY%"
)

:: Set proxy environment variables
set "HTTP_PROXY=http://127.0.0.1:7890"
set "HTTPS_PROXY=http://127.0.0.1:7890"

:: Disable experimental beta headers
set "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1"

:: Display configuration
echo.
echo ========================================
echo Configuration:
echo ========================================
echo    Provider    : %PROVIDER%
echo    Base URL    : %ANTHROPIC_BASE_URL%
echo    Model       : %ANTHROPIC_MODEL%
echo    Auth Token  : %ANTHROPIC_AUTH_TOKEN%
echo.
pause

:: Launch claude
echo.
echo Launching Claude Code...
set "CLAUDE_PATH=%USER_HOME%\.local\bin\claude.exe"
"%CLAUDE_PATH%"

pause
goto :eof

:invalid
echo Invalid selection. Please run the script again and enter a number between 1 and 11.
pause
exit /b 1