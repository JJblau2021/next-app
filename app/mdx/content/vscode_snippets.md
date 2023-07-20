# vscode snippets

To use snippets in Visual Studio Code (VSCode), follow these steps:

1. Open VSCode
2. Open the file you want to use the snippet in
3. Type the snippet prefix (the shortcut for the snippet)
4. Press "tab"
5. The snippet will be inserted into your code

You can also view available snippets for a specific programming language by opening the Command Palette (Ctrl+Shift+P on Windows, Cmd+Shift+P on Mac) and searching for "Configure User Snippets". This will open a dropdown menu where you can select the language you want to configure snippets for.

Once you select a language, VSCode will open the appropriate JSON file where you can add, remove, or modify snippets. The format for adding a new snippet is as follows:

```json
"snippet prefix": {
		"scope": "java", // 使用文件类型
    "prefix": "snippet prefix", // 关键字
    "body": [ // 代码段
        "snippet body"
    ],
    "description": "snippet description" // 描述
}

```

Replace "snippet prefix", "snippet body", and "snippet description" with the appropriate content for your snippet.

Happy coding!

## useStateSnippets

```json
"useStateSnippets": {
    "scope": "typescriptreact",
    "prefix": "useState",
    "body": [
      "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState<${2:string}>(${3:initialState});",
      "$0"
    ],
  }
```

## pseudo-element

```json
"pseudo-element": {
    "prefix": "pseudo",
    "scope": "css, less, scss, sass, stylus",
    "body": [
      "&::${1|after,before|}{",
      "  content: '';",
      "  display: block;",
      "}",
    ],
    "description": "伪元素",
    
  }
```