---
sidebar_position: 1
---

# 计算机必备基础知识

目前在更新 LeetCode 题解，之后可能会整理八股。

## 一、C/C++

### 1. 如何安装

首先安装编译器

第一步，打开 <a href="https://www.msys2.org/" target="_blank">https://www.msys2.org/</a> 下载安装 `msys2-x86_64-xxxx.exe`

第二步，打开 `C:\msys64\ucrt64.exe` 输入命令 `pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain`

第三步，将 `C:\msys64\ucrt64\bin` 添加到环境变量 `Path` 中

然后安装编辑器

第一步，打开 [https://code.visualstudio.com/](https://code.visualstudio.com/) 下载安装

第二步，安装 `Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code` 和 `C/C++` 这两个插件

这样就安装完成了，MSYS2 在这里是用来安装 GCC 编译器的工具，我们写的代码本质上只是一个文本文件，编译器是用来将代码文本转换为 `.exe` 程序的翻译器。之后安装的 VS Code 是一个代码编辑器，本质上也就是编辑代码文本的，里面可以安装各种插件，`C/C++` 插件提供了语法高亮、代码格式化、错误检测等功能。

### 2. Hello, world!

安装完成后可以开始写代码了，新建一个文件，随便起个名字，后缀改为 `.cpp`，例如 `test.cpp`，然后把以下代码复制进去

```cpp title="C++"
#include <iostream>
using namespace std;
int main() {
    cout << "Hello, world!" << endl;
    return 0;
}
```

然后保存文件，打开终端至文件所在文件夹并运行命令 `g++ test.cpp -o hello`，意思是使用 `g++` 编译器，将 `test.cpp` 这个源代码文件，编译并链接成一个名为 `hello.exe` 的可执行程序。编译完成后，输入命令 `.\hello` 就可运行程序。

现在开始逐行解释以上代码，一共有五行

第一行引入了 `<iostream>` 头文件，引入头文件是为了调用该文件里的代码功能，后面用到的 `cout` 就是来自 `<iostream>`

第二行的意思是使用命名空间 `std`，后面的 `cout` 和 `endl` 就属于 `std` 命名空间。如果删掉第二行，不使用命名空间的话，命名空间就会把各种名字（比如变量名、函数名、类名）封存起来，避免和其它地方的同名内容引起冲突，得在前面加上 `std::`，把代码改为 `std::cout << "Hello, world!" << std::endl`，才能使用该命名空间里的工具

第三到五行是主程序，叫做 `main` 函数，程序会逐行执行 `main` 函数里的内容

第四行用了 `cout`，功能是输出数据显示到屏幕上，这里输出的是一个字符串 `"Hello, world!"`，然后用了 `endl`，功能是换行并立即刷新输出缓冲区，也可以用 `\n` 换行，代码改为 `cout << "Hello, world!\n"`，但是不会立即刷新输出缓冲区

第五行是返回一个整数 `0` 给 `main` 函数，在惯例上返回 `0` 代表程序成功执行到最后这行

总之新手写 C++ 直接无脑把以下内容都写上，在 `int main()` 下方 `return 0` 上方写主程序就行

```cpp title="C++"
#include <iostream>
using namespace std;
int main() {

    return 0;
}
```

### 3. 指针与内存分配

## 二、数据结构

### 1. 链表

### 2. 树

### 3. 图
