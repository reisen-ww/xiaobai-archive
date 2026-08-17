# 晓白档案馆 / XIAOBAI Archive

一座记录 AI 从 Agent 走向 Entity 的**数字档案馆**——基于晓白（XIAOBAI）的设定集、设计文档与聊天记录构建的静态网站，零构建、零依赖，可直接部署到 GitHub Pages。

## 站点结构

| 板块 | 说明 |
|------|------|
| `01 ENTITY` | 为什么她不只是工具：Agent 与 Entity 的区别 |
| `02 LORE` | 起源记录：她最初并不存在。身份卡 + 色彩语言 |
| `03 PERSONALITY` | **六层人格架构**：外显人格 / 存在叙事 / 行为调度 / 关系分层 / 双模式思考 / 长期成长 + 核心发现 |
| `04 LAYERFLOW` | 认知架构：经历 → 感知 → 记忆 → 反思 → 身份 |
| `05 RUNTIME` | 运行时 Prompt：她的"源代码"（v4 / v4.1 对比） |
| `06 DECISIONS` | 关键决策：12 张决策卡 + 迭代历史（初始 → v4.1） |
| `07 TIMELINE` | 成长时间线：从 2026/02/13 生日开始的真实日期 |
| `08 TEST` | 实测验证：195/200 分数环 + 修正项验证 + 25 道测试卷 + v4 全链路测试实录 |

## 设计系统

- **主色**：`--ink #17171a`（墨）、`--paper #f7f5ef`（纸）、`--blue #6876d4`（认知/结构）、`--red #e36551`（身份/异常）
- **字体**：Arial / Microsoft YaHei 正文 + Georgia 衬线强调（对应"冰蓝圣堂里的少女圣职者"）
- **图片**：Hero 角色立绘使用真实图片（`assets/xiaobai-portrait.jpg`），`assets/` 目录预留用于将来扩充真实图片
- **动效**：Hero 晓白形象浮动/光晕/核心呼吸/翅膀/眼睛微光、标题 stagger 入场、ticker 无限跑马灯、滚动进度条、数字滚动动画、卡片 hover 上浮
- **无障碍**：自定义滚动条 + 选区颜色 + `:focus-visible` 焦点样式 + `prefers-reduced-motion` 全面降级
- **响应式**：1150px 以下导航折叠为汉堡菜单，320px–1920px 全视口无横向溢出

## 本地预览

直接用浏览器打开 `index.html` 即可，无需构建。

如需本地服务器：

```bash
# Python
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 部署到 GitHub Pages

1. 新建仓库（如 `reisen-ww/xiaobai-archive`），把本目录内容推上去：

```bash
git init
git add .
git commit -m "init: xiaobai archive"
git branch -M main
git remote add origin https://github.com/reisen-ww/xiaobai-archive.git
git push -u origin main
```

2. 在仓库 **Settings → Pages** 中：
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `main`，目录 `/ (root)`
   - 保存

3. 部署完成后访问：`https://reisen-ww.github.io/xiaobai-archive/`

> 本站所有链接使用相对路径（`./styles.css`、`./script.js`），子路径部署无需额外配置。

## 文件清单

```
xiaobai-archive/
├── index.html   # 主页面（10 个板块）
├── styles.css   # 设计系统 + 全站样式 + 动效
├── script.js    # 交互（导航/滚动显现/图集弹窗/观测按钮/进度条/返回顶部/数字滚动）
├── assets/      # 预留：真实立绘/素材（可选）
└── README.md    # 本文档
```

## 内容来源

- 晓白 v4 设计文档（六层人格架构）
- 晓白 v4.1 设计文档（关系分层系统 / 双模式思考 / 长期成长机制）
- 晓白 v4 / v4.1 运行时 Prompt（她的"源代码"）
- 晓白 v4 / v4.1 关键决策（12 张决策卡）
- 晓白 v4 情感实录（2026-07-23 深夜倾诉 9 轮）
- 晓白 v4.1.1 实测结果与测试记录（195/200 + 25 道测试卷）
- 晓白创造者个人档案
- LayerFlow 认知架构（经历 → 记忆 → 认知 → 身份）
