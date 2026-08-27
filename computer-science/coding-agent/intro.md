---
sidebar_position: 1
---

# 0. Minimal Agent

在开始系统学习 agent 之前，我们先来写一个最小 agent，这只需要大概 60 行 python 代码。

### What is an Agent?

首先，需要先明白 agent 的概念。有一个很简单的公式说 Agent = Model + Harness。其中，Model 是指大语言模型，就是我们在网页端对话的那个模型，我们可以给它发送文字，然后模型会给我们回复文字。而 Harness 是指我们给模型提供的工作环境，用来扩展模型的能力，并且让我们更好地控制模型的行为。

大语言模型本身只有回复文字的能力，通过 Harness，我们可以让模型拥有更多的能力，比如访问互联网、访问本地文件、执行代码等。Harness 还可以帮助我们更好地控制模型的行为，比如规定它什么情况下可以使用工具、哪些操作必须经过我们的同意才能执行等。

### What does a Minimal Agent need?

我们接下来将会写一个最小 agent，为了写最小 agent，最关键的一点是需要扩展模型的能力，这里我们给模型提供在我们电脑上执行 shell 指令的能力，从而让模型能操纵我们的电脑。

我们需要完成的功能有：

1. 调用 api 连接到大语言模型。
2. 让模型能执行 shell 指令，而不仅仅是进行文字聊天。
3. 把 shell 指令的执行结果返回给模型，让模型能根据执行结果做出下一步决策。

还需要注意一点，模型只是一个根据输入文本来生成文字的函数，模型本身是没有记忆的，也就是说模型在每次对话中都不会记得之前的对话内容，所以我们需要在每次调用模型的时候，把之前的对话内容也完整的传给模型，这样模型才能根据之前的对话内容做出下一步决策。这要求我们实现第四个功能：

4. 拼接对话记录。

这就是我们本次要实现的最小 agent 的全部功能。我们还可以把以上四个功能进一步抽象为四个模块：

1. Api 模块：连接到大语言模型，并且支持切换不同的模型和厂商。
2. Tool 模块：给模型提供不同的工具，让模型能使用这些工具来扩展它的能力。
3. Loop 模块：实现让模型能根据对话内容做出下一步决策，并且把决策结果返回给模型的循环。
4. Context 模块：管理对话记录，工具列表，以及系统提示词。

### Let's start coding!

代码如下。函数 `query_lm` 接收对话记录，然后返回模型的文字回复。函数 `parse_action` 接收模型的文字回复，然后解析出模型想要执行的 shell 指令。函数 `execute_action` 接收 shell 指令，然后在本地执行，并返回执行结果。接着，我们通过系统提示词，告诉模型如何在文字里下达 shell 指令。最后，我们实现了一个循环，能把决策结果返回给模型，并且让模型能根据对话内容做出下一步决策。

````py title="Python"
import os
from openai import OpenAI
import re
import subprocess

client = OpenAI(
    api_key="YOUR_API_KEY",  # Replace with your API key
    base_url="https://api.yourbaseurl.com",  # Replace with your base URL
)

def query_lm(messages) -> str:
    response = client.chat.completions.create(
        model="model-name",  # Replace with your model name
        messages=messages,
    )
    return response.choices[0].message.content or ""

def parse_action(lm_output: str) -> str:
    matches = re.findall(r"```shell-action\s*\n(.*?)\n```", lm_output, re.DOTALL)
    return matches[0].strip() if matches else ""

def execute_action(command: str) -> str:
    result = subprocess.run(
        command,
        shell=True,
        text=True,
        env=os.environ,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=30,
    )
    return result.stdout

messages = [{"role": "system", "content": "You are a helpful assistant. When you want to run a command, wrap it in ```shell-action\n<command>\n```."}]

while True:
    user_input = input("User: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    messages.append({"role": "user", "content": user_input})

    while True:
        lm_output = query_lm(messages)
        print(f"Agent: {lm_output}")
        messages.append({"role": "assistant", "content": lm_output})

        action = parse_action(lm_output)
        if not action:
            break
        print(f"Command: {action}")
        action_result = execute_action(action)
        print(f"Result:\n{action_result}")
        messages.append({"role": "user", "content": f"Result:\n{action_result}"})
````

### References

- [Minimal AI agent tutorial](https://minimal-agent.com/)
- [What is a Harness?](https://earendil.com/posts/what-is-a-harness/)
