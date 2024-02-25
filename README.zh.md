# autoGPTs Chrome插件
## 语言

- [English](README.md)
- [中文](README.zh.md)

## 简介

autoGPTs是一个为Chrome浏览器设计的插件，其目标是将GPTs变为能够自动执行任务的agent。通过自动化的交互和任务执行流程，此插件旨在提高用户使用GPTs进行自动化任务处理的效率和效果。

## 目录

- [简介](#简介)
- [安装](#安装)
- [使用](#使用)
- [功能](#功能)
- [待办事项](#待办事项)
- [依赖](#依赖)
- [配置](#配置)
- [文档](#文档)
- [示例](#示例)
- [故障排除](#故障排除)
- [贡献者](#贡献者)
- [许可证](#许可证)

## 安装

目前，autoGPTs插件尚未发布到Chrome Web Store。您可以通过以下步骤手动安装插件：

1. 克隆此仓库到您的本地机器。
2. 打开Chrome浏览器，进入`chrome://extensions/`页面。
3. 启用“开发者模式”。
4. 点击“加载已解压的扩展程序”，并选择克隆的仓库文件夹。

## 使用

安装插件后，它将自动在后台运行，无需手动启动。插件将自动执行以下任务：

- 当GPTs调用外部操作时，自动点击“允许”对话框按钮。
- 在执行任务时，自动输入“执行下一步”的文本直至任务结束。

## 功能

当前实现的功能包括：

1. **自动允许外部操作**：当GPTs尝试调用外部操作时，自动点击允许对话框，无需用户手动干预。
2. **自动任务执行**：自动输入执行下一步的指令，直至任务完成，从而实现流畅的自动化任务执行过程。

## 待办事项

- [ ] 调用LLM（大型语言模型），使用LLM来操控GPTs。
- [ ] 基于自动化动作功能，实现多GPTs之间的协同执行任务。

## 依赖

请列出运行此插件所需的任何外部依赖和库。

## 配置

如果此插件需要任何特殊配置，请在此部分提供详细说明。

## 文档

提供指向更详细文档的链接或说明，如果适用。

## 示例

提供一些如何使用此插件进行自动化任务处理的示例。

## 故障排除

解决常见问题和插件使用中可能遇到的错误。

## 贡献者

欢迎对此项目做出贡献！请查看贡献指南了解如何开始。

## 许可证

此项目采用[MIT许可证](LICENSE)。请查看LICENSE文件了解更多信息。